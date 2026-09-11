import type { SpeechSection } from '@/lib/tts/speech'

/**
 * The queue slice this module needs. The resolvers no longer read `sourceSlug` —
 * a track is a section, whatever file it came from — but the type and the
 * multi-slug fixtures in the test are kept so that re-introducing a file-level
 * jump (the music-player analogy: album = md file, track = md file) breaks a test
 * instead of silently skipping a digest's unheard sections again.
 */
type QueueItem = Pick<SpeechSection, 'sourceSlug'>

/**
 * Elapsed time in the current section above which `previoustrack` restarts that
 * section instead of stepping back — the convention every music player uses.
 * The one rule in this module that is a decision rather than arithmetic.
 */
export const RESTART_THRESHOLD_SECONDS = 3

/**
 * Is `index` a position this queue actually has? The single guard both resolvers
 * fall back on, which is why they each have a defensive answer for a queue that
 * emptied or an index that outlived it — an OS transport button can fire at any
 * moment, including one where the reader has nothing sensible to skip to.
 *
 * Fractional indexes are rejected alongside the out-of-range and negative ones:
 * they would otherwise point between two sections, and every caller here means a
 * whole queue position.
 */
const inRange = (items: readonly QueueItem[], index: number): boolean =>
  Number.isInteger(index) && index >= 0 && index < items.length

/**
 * Index of the next section, or `null` at the end of the queue.
 *
 * Also `null` for an index this queue does not have — out of range, negative or
 * fractional, an empty queue included. `null` means "leave playback alone", so a
 * nonsense index cannot silently restart the queue from somewhere.
 */
export function resolveNextTrackIndex(
  items: readonly QueueItem[],
  currentIndex: number
): number | null {
  if (!inRange(items, currentIndex)) return null

  const next = currentIndex + 1
  return next < items.length ? next : null
}

/**
 * Target of `previoustrack`, always a section index (never null — the first
 * section restarts rather than doing nothing).
 *
 * An index this queue does not have — out of range, negative or fractional, an
 * empty queue included — resolves defensively to `0`: skipping back has to name
 * some section, and the head of the queue is the only one always safe to name.
 *
 * Because a track is a section, the caller's time-in-section IS elapsed-in-track,
 * so the threshold can be applied directly: past it the current section restarts,
 * at or below it the previous section plays, crossing article boundaries like any
 * other step back.
 */
export function resolvePreviousTrackIndex(
  items: readonly QueueItem[],
  currentIndex: number,
  elapsedSeconds: number
): number {
  if (!inRange(items, currentIndex)) return 0

  if (elapsedSeconds > RESTART_THRESHOLD_SECONDS) return currentIndex

  return currentIndex > 0 ? currentIndex - 1 : 0
}
