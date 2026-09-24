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
 * The flag is read on EVERY call, never cached. A cache makes the instrument
 * lie: turning the log on mid-session would record nothing (an earlier disabled
 * read stuck at `false`), and `?readerlog=0` mid-session would keep recording.
 * It also forces `clearReaderLog()` to secretly double as a flag reset, so the
 * panel's Clear button could silently disable the instrument.
 *
 * The cost is one `getItem` of one short key per event — microseconds, a handful
 * of events per speech unit. The property that actually matters for the measured
 * path is that the disabled branch constructs nothing, and that still holds.
 */
export function isReaderLogEnabled(): boolean {
  // SSR: there is no localStorage on the server.
  if (typeof window === 'undefined') return false
  try {
    return window.localStorage.getItem(READER_LOG_FLAG) !== null
  } catch {
    // Private mode / storage denied: report disabled rather than propagate.
    return false
  }
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
}

const pad = (value: number, width = 2): string => String(value).padStart(width, '0')

/**
 * Local wall-clock time with an explicit UTC offset, e.g. `10:00:00.000+02:00`.
 *
 * The log is read on the device that produced it, against the clock the person
 * is looking at; a bare UTC time would silently sit an hour or two off their
 * wall clock in CET/CEST. The offset suffix keeps the line unambiguous once it
 * is copied out of the device and read somewhere else.
 */
const formatTime = (t: number): string => {
  const d = new Date(t)
  const offsetMinutes = -d.getTimezoneOffset()
  const sign = offsetMinutes < 0 ? '-' : '+'
  const abs = Math.abs(offsetMinutes)
  const clock = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}.${pad(d.getMilliseconds(), 3)}`
  return `${clock}${sign}${pad(Math.floor(abs / 60))}:${pad(abs % 60)}`
}

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
