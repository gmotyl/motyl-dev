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
 * persisted. An entry (and with it `voted`) lives only while at least one
 * surface for that link is mounted - the same lifetime a per-component
 * `useState` had before the shared store. Subscribers are reference-counted
 * per link; when the last one unmounts (client navigation, section unmount)
 * the entry is dropped, and a full page load clears everything. A vote still
 * in flight keeps its entry until it settles, then it is dropped if nothing
 * mounted it again.
 *
 * Why: the server has no weekly vote window (live votes sit under one active
 * bucket, reset manually by an admin) and sends no reset signal, so a tab-wide
 * `voted` would lock a user out after a reset until a full reload. Clearing
 * `voted` on a server-side reset signal (the "real vote counts" change) is
 * future work.
 *
 * While surfaces are mounted, seeds merge rather than "first wins": counts only
 * grow, so a 0 placeholder seed (inline vote on an article) never hides a real
 * count seeded by another mounted surface, and a fresher, higher count wins.
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
/** Number of mounted subscribers per link; an entry lives only while this is > 0 (or a vote is pending). */
const subscriberCounts = new Map<string, number>()

function emit() {
  for (const listener of listeners) listener()
}

/**
 * Drops the entry for `linkUrl` when no surface is subscribed and no vote is in
 * flight. Only called on unsubscribe and on vote settle - never on seed, so a
 * seed that runs before its own subscription is not deleted.
 */
function pruneIfUnwatched(linkUrl: string) {
  if ((subscriberCounts.get(linkUrl) ?? 0) > 0) return
  if (entries.get(linkUrl)?.pending) return
  entries.delete(linkUrl)
}

function subscribeToLink(linkUrl: string, listener: () => void) {
  listeners.add(listener)
  subscriberCounts.set(linkUrl, (subscriberCounts.get(linkUrl) ?? 0) + 1)
  return () => {
    listeners.delete(listener)
    const remaining = (subscriberCounts.get(linkUrl) ?? 1) - 1
    if (remaining > 0) {
      subscriberCounts.set(linkUrl, remaining)
      return
    }
    subscriberCounts.delete(linkUrl)
    // No listener is left for this link, so there is nobody to notify.
    pruneIfUnwatched(linkUrl)
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

/**
 * Merges a known count into the store. Counts only grow: the stored count
 * becomes `max(stored, seed)`, and a seed is ignored while a vote is pending so
 * it cannot clobber the optimistic +1. `voted` / `superAdmin` are never touched.
 */
function seedEntry(linkUrl: string, initialCount: number) {
  const prev = entries.get(linkUrl)
  if (!prev) {
    entries.set(linkUrl, defaultEntry(initialCount))
    emit()
    return
  }
  if (prev.pending || initialCount <= prev.count) return
  entries.set(linkUrl, { ...prev, count: initialCount })
  emit()
}

/** Test-only: clears all shared vote state (subscriber counts belong to live mounts and are kept). */
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

  const rollback = () => {
    setEntry(linkUrl, prev => ({
      ...prev,
      count: prev.count - 1,
      voted: prev.superAdmin ? prev.voted : false,
      pending: false,
    }))
    pruneIfUnwatched(linkUrl)
  }

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
  // Every surface may have unmounted while the request was in flight.
  pruneIfUnwatched(linkUrl)

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

  // Stable per link so React only resubscribes when the link changes.
  const subscribe = useCallback((listener: () => void) => subscribeToLink(linkUrl, listener), [linkUrl])

  const entry = useSyncExternalStore(
    subscribe,
    () => entries.get(linkUrl) ?? fallback,
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
