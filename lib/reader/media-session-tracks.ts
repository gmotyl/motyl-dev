import type { SpeechSection } from '@/lib/tts/speech'

/**
 * What one OS media-session "track" maps to in the reader's flat section queue.
 * A single-article page has nothing to skip between, so its tracks are sections;
 * a multi-article queue (read-all) skips whole articles.
 */
export type TrackGranularity = 'section' | 'article'

/** The queue slice this module needs: sections of one article are contiguous. */
type QueueItem = Pick<SpeechSection, 'sourceSlug'>

/**
 * Elapsed time in the current track above which `previoustrack` restarts that
 * track instead of stepping back — the convention every music player uses.
 */
export const RESTART_THRESHOLD_SECONDS = 3

const inRange = (items: readonly QueueItem[], index: number): boolean =>
  Number.isInteger(index) && index >= 0 && index < items.length

/** One distinct `sourceSlug` in the queue → a track is a section; more → an article. */
export function resolveTrackGranularity(items: readonly QueueItem[]): TrackGranularity {
  return new Set(items.map((item) => item.sourceSlug)).size > 1 ? 'article' : 'section'
}

/** First index of the track holding `currentIndex` (caller guarantees it is in range). */
function trackStartIndex(
  items: readonly QueueItem[],
  currentIndex: number,
  granularity: TrackGranularity
): number {
  if (granularity === 'section') return currentIndex

  const slug = items[currentIndex].sourceSlug
  let start = currentIndex
  while (start > 0 && items[start - 1].sourceSlug === slug) start -= 1
  return start
}

/**
 * Index of the first section of the next track, or `null` at the end of the queue.
 * For 'article' granularity that is the first section of the next `sourceSlug`;
 * for 'section' granularity it is simply `currentIndex + 1`.
 */
export function resolveNextTrackIndex(
  items: readonly QueueItem[],
  currentIndex: number,
  granularity: TrackGranularity
): number | null {
  if (!inRange(items, currentIndex)) return null

  if (granularity === 'section') {
    const next = currentIndex + 1
    return next < items.length ? next : null
  }

  const slug = items[currentIndex].sourceSlug
  for (let index = currentIndex + 1; index < items.length; index += 1) {
    if (items[index].sourceSlug !== slug) return index
  }
  return null
}

/**
 * Target of `previoustrack`, always a section index (never null — the first track
 * restarts rather than doing nothing).
 *
 * Elapsed-in-track is `currentTimeInSection` when the current section IS the
 * track's first section, and `Infinity` otherwise (deeper into a multi-section
 * article always counts as "past the threshold"). When elapsed exceeds
 * `RESTART_THRESHOLD_SECONDS` the current track restarts from its own first
 * section; otherwise the previous track's first section is returned.
 */
export function resolvePreviousTrackIndex(
  items: readonly QueueItem[],
  currentIndex: number,
  granularity: TrackGranularity,
  currentTimeInSection: number
): number {
  if (!inRange(items, currentIndex)) return 0

  const start = trackStartIndex(items, currentIndex, granularity)
  const elapsed = currentIndex === start ? currentTimeInSection : Infinity
  if (elapsed > RESTART_THRESHOLD_SECONDS) return start
  if (start === 0) return 0

  return trackStartIndex(items, start - 1, granularity)
}
