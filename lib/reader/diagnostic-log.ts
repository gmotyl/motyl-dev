/**
 * Flag-gated diagnostic log for the continuous reader.
 *
 * The buffer is MODULE-LEVEL state, never React state: a `setState` per event
 * would re-render the reader at every speech-unit boundary — the exact timing
 * this instrument exists to measure. Nothing here imports React and nothing
 * here notifies anybody; the panel pulls a snapshot on demand.
 *
 * Entries are in-memory only. Only the enable flag lives in `localStorage`;
 * writing entries there would put synchronous main-thread I/O into the measured
 * path, for a durability guarantee the observed failure (page stays alive) does
 * not need.
 */

export type ReaderLogEventType =
  | 'unit-start'
  | 'play-called'
  | 'play-rejected'
  | 'unit-ended'
  | 'element-error'
  | 'synthesis-failed'
  | 'stop-with-error'
  | 'section-advance'
  | 'reader-error'
  | 'wakelock-acquired'
  | 'wakelock-failed'
  | 'visibility-hidden'
  | 'visibility-visible'
  | 'freeze'
  | 'resume'
  | 'pagehide'

export type ReaderLogEntry = {
  /** `Date.now()` when the event was recorded. */
  t: number
  /** ms since the previous entry; 0 for the first of a session. */
  since: number
  type: ReaderLogEventType
  detail?: string
  /** The event fired but useTTS's early-return guard ate it. */
  suppressed?: true
}

export const READER_LOG_FLAG = 'motyl:readerlog'
export const READER_LOG_CAPACITY = 200

const entries: ReaderLogEntry[] = []

/** `Date.now()` of the last recorded entry, or null when the session is fresh. */
let lastAt: number | null = null

/**
 * Cached flag read. Re-reading `localStorage` on every event is itself I/O in
 * the measured path, so the answer is resolved once and kept. `clearReaderLog()`
 * drops the cache — that is the single reset the tests (and the URL switch in
 * the next task) need, so no extra export is required.
 */
let enabledCache: boolean | null = null

function readFlag(): boolean {
  // SSR: there is no localStorage on the server.
  if (typeof window === 'undefined') return false
  try {
    return window.localStorage.getItem(READER_LOG_FLAG) !== null
  } catch {
    // Private mode / storage denied: report disabled rather than propagate.
    return false
  }
}

export function isReaderLogEnabled(): boolean {
  if (enabledCache === null) enabledCache = readFlag()
  return enabledCache
}

export function logReaderEvent(
  type: ReaderLogEventType,
  detail?: string,
  options?: { suppressed?: boolean },
): void {
  // The disabled path returns before anything is constructed.
  if (!isReaderLogEnabled()) return

  const t = Date.now()
  // `since` is computed at WRITE time, so a gap survives eviction of the entry
  // it was measured against.
  const entry: ReaderLogEntry = { t, since: lastAt === null ? 0 : t - lastAt, type }
  if (detail !== undefined) entry.detail = detail
  if (options?.suppressed) entry.suppressed = true

  lastAt = t
  entries.push(entry)
  if (entries.length > READER_LOG_CAPACITY) entries.shift()
}

export function readReaderLog(): readonly ReaderLogEntry[] {
  return entries.slice()
}

export function clearReaderLog(): void {
  entries.length = 0
  lastAt = null
  enabledCache = null
}

const formatTime = (t: number): string => new Date(t).toISOString().slice(11, 23)

export function formatReaderLog(list: readonly ReaderLogEntry[]): string {
  return list
    .map((entry) => {
      const parts = [formatTime(entry.t), `+${entry.since}ms`, entry.type]
      if (entry.suppressed) parts.push('[suppressed]')
      if (entry.detail !== undefined) parts.push(entry.detail)
      return parts.join(' ')
    })
    .join('\n')
}
