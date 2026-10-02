'use client'

import { useCallback, useEffect, useMemo, useSyncExternalStore } from 'react'
import { toast } from 'sonner'
import type { ContentCategory } from '@/lib/content/og'

/**
 * Minimal shared per-link vote state.
 *
 * Every `useLinkVote(linkUrl)` instance reads the same module-level entry, so a
 * vote cast from one surface (inline VoteButton, reader-bar vote strip, ...)
 * shows up in all of them and cannot be cast twice.
 *
 * Scope is deliberately small: counts are NOT fetched and `voted` is NOT
 * persisted — both reset on a full page load.
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
}

export interface UseLinkVoteResult {
  count: number
  voted: boolean
  pending: boolean
  superAdmin: boolean
  /** Resolves to the server count on success, `null` when skipped or failed (callers may ignore it). */
  vote: (payload: LinkVotePayload) => Promise<number | null>
}

const CONTRIBUTIONS_KEY = 'motyl:contributions'

const entries = new Map<string, LinkVoteEntry>()
const listeners = new Set<() => void>()

function emit() {
  for (const listener of listeners) listener()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function defaultEntry(count: number): LinkVoteEntry {
  return { count, voted: false, pending: false, superAdmin: false }
}

/** Entries are replaced immutably so useSyncExternalStore snapshots stay referentially stable. */
function setEntry(linkUrl: string, update: (prev: LinkVoteEntry) => LinkVoteEntry, fallbackCount = 0) {
  const prev = entries.get(linkUrl) ?? defaultEntry(fallbackCount)
  entries.set(linkUrl, update(prev))
  emit()
}

/** Seeds an entry only when the store has none yet — the first seed wins. */
function seedEntry(linkUrl: string, initialCount: number) {
  if (entries.has(linkUrl)) return
  entries.set(linkUrl, defaultEntry(initialCount))
  emit()
}

/** Test-only: clears all shared vote state. */
export function resetLinkVotesForTests() {
  entries.clear()
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
  const current = entries.get(linkUrl) ?? defaultEntry(fallbackCount)
  if ((current.voted && !current.superAdmin) || current.pending) return null

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

    const data = (await res.json()) as VoteResponse
    const serverCount = data.vote?.voteCount ?? optimisticCount
    setEntry(linkUrl, prev => ({
      ...prev,
      count: serverCount,
      pending: false,
      superAdmin: prev.superAdmin || Boolean(data.isSuperAdmin),
    }))

    showImpactToast(data, incrementContributions())
    return serverCount
  } catch {
    rollback()
    return null
  }
}

export function useLinkVote(linkUrl: string, initialCount = 0): UseLinkVoteResult {
  // Fallback used until the entry is seeded (and as the SSR snapshot). Memoised
  // so the snapshot reference is stable across renders.
  const fallback = useMemo(() => defaultEntry(initialCount), [initialCount])

  useEffect(() => {
    seedEntry(linkUrl, initialCount)
  }, [linkUrl, initialCount])

  const entry = useSyncExternalStore(
    subscribe,
    () => entries.get(linkUrl) ?? fallback,
    () => fallback,
  )

  const vote = useCallback(
    (payload: LinkVotePayload) => castLinkVote(payload, initialCount),
    [initialCount],
  )

  return {
    count: entry.count,
    voted: entry.voted,
    pending: entry.pending,
    superAdmin: entry.superAdmin,
    vote,
  }
}
