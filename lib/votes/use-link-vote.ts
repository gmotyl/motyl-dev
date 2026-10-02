'use client'

import { useCallback, useEffect, useMemo, useSyncExternalStore } from 'react'
import { toast } from 'sonner'
import type { ContentCategory } from '@/lib/content/og'
import { isoWeekKey, msUntilNextIsoWeek } from '@/lib/trends/iso-week'

/**
 * Minimal shared per-link vote state.
 *
 * Every `useLinkVote(linkUrl)` instance reads the same module-level entry, so a
 * vote cast from one surface (inline VoteButton, reader-bar vote strip, ...)
 * shows up in all of them and cannot be cast twice.
 *
 * Scope is deliberately small: counts are NOT fetched and `voted` is NOT
 * persisted — both reset on a full page load.
 *
 * Entries are also scoped to the ISO week they were written in: the weekly
 * trends reset clears every server vote row, so an entry from a previous week
 * reads as fresh (not voted, count 0 until re-seeded). A timer re-renders
 * subscribers at the week boundary so a disabled "voted" button re-enables.
 *
 * Module state survives client navigation, so seeds merge rather than "first
 * wins": counts only grow, so a 0 placeholder seed (article pages) never hides a
 * real count seeded later (/trending), and a fresher, higher server count wins.
 */

export interface LinkVotePayload {
  linkUrl: string
  title: string
  description?: string
  category?: ContentCategory
  /** Full URL of the source (e.g. "https://example.com"). */
  sourceDomain?: string
  patternName?: string
}

interface LinkVoteEntry {
  count: number
  voted: boolean
  pending: boolean
  /** Set once the server reports a super admin; such a user may vote repeatedly. */
  superAdmin: boolean
  /** ISO week key (see isoWeekKey) the entry belongs to. */
  week: string
}

export interface UseLinkVoteResult {
  count: number
  voted: boolean
  pending: boolean
  superAdmin: boolean
  /**
   * Votes for the hook's own `linkUrl` (any `linkUrl` in the payload is ignored).
   * Resolves to the server count on success, `null` when skipped or failed (callers may ignore it).
   */
  vote: (payload: HookVotePayload) => Promise<number | null>
}

/** Payload for the hook's `vote`; `linkUrl` is optional because the hook always uses its own. */
export type HookVotePayload = Omit<LinkVotePayload, 'linkUrl'> & { linkUrl?: string }

const CONTRIBUTIONS_KEY = 'motyl:contributions'

const entries = new Map<string, LinkVoteEntry>()
const listeners = new Set<() => void>()
let weekTimer: ReturnType<typeof setTimeout> | null = null

function emit() {
  for (const listener of listeners) listener()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function currentWeek(): string {
  return isoWeekKey(new Date())
}

function defaultEntry(count: number): LinkVoteEntry {
  return { count, voted: false, pending: false, superAdmin: false, week: currentWeek() }
}

/**
 * The stored entry, with an entry from a previous week swapped (once) for a
 * fresh one. The replacement is stored, so repeated reads return the same
 * object and useSyncExternalStore snapshots stay stable. A pending entry is
 * left alone until its request settles.
 */
function readEntry(linkUrl: string): LinkVoteEntry | undefined {
  const entry = entries.get(linkUrl)
  if (!entry || entry.pending) return entry
  const week = currentWeek()
  if (entry.week === week) return entry
  const fresh: LinkVoteEntry = { count: 0, voted: false, pending: false, superAdmin: entry.superAdmin, week }
  entries.set(linkUrl, fresh)
  return fresh
}

/** Re-renders subscribers when the ISO week changes, so stale entries expire on screen. */
function scheduleWeekRollover() {
  if (weekTimer !== null) return
  weekTimer = setTimeout(() => {
    weekTimer = null
    emit()
  }, msUntilNextIsoWeek(new Date()))
}

/** Entries are replaced immutably so useSyncExternalStore snapshots stay referentially stable. */
function setEntry(linkUrl: string, update: (prev: LinkVoteEntry) => LinkVoteEntry, fallbackCount = 0) {
  const prev = readEntry(linkUrl) ?? defaultEntry(fallbackCount)
  entries.set(linkUrl, update(prev))
  emit()
}

/**
 * Merges a known count into the store. Counts only grow: the stored count
 * becomes `max(stored, seed)`, and a seed is ignored while a vote is pending so
 * it cannot clobber the optimistic +1. `voted` / `superAdmin` are never touched.
 */
function seedEntry(linkUrl: string, initialCount: number) {
  const prev = readEntry(linkUrl)
  if (!prev) {
    entries.set(linkUrl, defaultEntry(initialCount))
    emit()
    return
  }
  if (prev.pending || initialCount <= prev.count) return
  entries.set(linkUrl, { ...prev, count: initialCount })
  emit()
}

/** Test-only: clears all shared vote state. */
export function resetLinkVotesForTests() {
  entries.clear()
  if (weekTimer !== null) clearTimeout(weekTimer)
  weekTimer = null
  emit()
}

function incrementContributions(): number {
  if (typeof window === 'undefined') return 0
  const count = parseInt(localStorage.getItem(CONTRIBUTIONS_KEY) || '0', 10) + 1
  localStorage.setItem(CONTRIBUTIONS_KEY, String(count))
  return count
}

interface VoteResponse {
  vote?: { voteCount?: number }
  isNew?: boolean
  newRank?: number
  isSuperAdmin?: boolean
}

function showImpactToast(data: VoteResponse, contributions: number) {
  if (data.isNew) {
    toast.success('🎯 Added to trending!', {
      description: `You've contributed ${contributions} time${contributions !== 1 ? 's' : ''}`,
    })
  } else if ((data.newRank ?? Infinity) <= 3) {
    toast.success(`🔥 Now #${data.newRank}!`, {
      description: `${contributions} contribution${contributions !== 1 ? 's' : ''} from this browser`,
    })
  } else {
    toast.success('👍 Vote counted!', {
      description: `#${data.newRank} this week · ${contributions} total`,
    })
  }
}

/**
 * Casts a vote for `payload.linkUrl`. Resolves to the server count on success,
 * or `null` when the vote was skipped (already voted / in flight) or failed.
 */
export async function castLinkVote(payload: LinkVotePayload, fallbackCount = 0): Promise<number | null> {
  const { linkUrl } = payload
  const current = readEntry(linkUrl) ?? defaultEntry(fallbackCount)
  if ((current.voted && !current.superAdmin) || current.pending) return null
  scheduleWeekRollover()

  // Optimistic update
  const optimisticCount = current.count + 1
  setEntry(
    linkUrl,
    prev => ({
      ...prev,
      count: prev.count + 1,
      voted: prev.superAdmin ? prev.voted : true,
      pending: true,
    }),
    fallbackCount,
  )

  const rollback = () =>
    setEntry(linkUrl, prev => ({
      ...prev,
      count: prev.count - 1,
      voted: prev.superAdmin ? prev.voted : false,
      pending: false,
    }))

  let data: VoteResponse
  try {
    const res = await fetch('/api/trends/votes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        linkUrl,
        title: payload.title,
        description: payload.description ?? '',
        category: payload.category ?? 'general',
        sourceDomain: payload.sourceDomain,
        patternName: payload.patternName,
      }),
    })

    if (!res.ok) {
      rollback()
      return null
    }

    data = (await res.json()) as VoteResponse
  } catch {
    rollback()
    return null
  }

  // The server recorded the vote: from here on nothing may roll it back.
  const serverCount = data.vote?.voteCount ?? optimisticCount
  setEntry(linkUrl, prev => ({
    ...prev,
    count: serverCount,
    pending: false,
    superAdmin: prev.superAdmin || Boolean(data.isSuperAdmin),
  }))

  // Cosmetic side effects (localStorage may throw, e.g. quota / privacy mode).
  try {
    showImpactToast(data, incrementContributions())
  } catch {
    // ignore
  }
  return serverCount
}

/**
 * @param initialCount - Known server count for the link. Omit when unknown (the
 *   count then shows 0 until some surface seeds it or a vote lands).
 */
export function useLinkVote(linkUrl: string, initialCount?: number): UseLinkVoteResult {
  const fallbackCount = initialCount ?? 0
  // Fallback used until the entry is seeded (and as the SSR snapshot). Memoised
  // so the snapshot reference is stable across renders.
  const fallback = useMemo(() => defaultEntry(fallbackCount), [fallbackCount])

  useEffect(() => {
    if (initialCount !== undefined) seedEntry(linkUrl, initialCount)
  }, [linkUrl, initialCount])

  const entry = useSyncExternalStore(
    subscribe,
    () => readEntry(linkUrl) ?? fallback,
    () => fallback,
  )

  const vote = useCallback(
    (payload: HookVotePayload) => castLinkVote({ ...payload, linkUrl }, fallbackCount),
    [linkUrl, fallbackCount],
  )

  return {
    count: entry.count,
    voted: entry.voted,
    pending: entry.pending,
    superAdmin: entry.superAdmin,
    vote,
  }
}
