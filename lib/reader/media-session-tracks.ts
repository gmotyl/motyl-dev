import type { SpeechSection } from '@/lib/tts/speech'

/**
 * The queue slice this module needs. The two INDEX resolvers deliberately ignore
 * `sourceSlug` — a track is a section, whatever file it came from — and the
 * multi-slug fixtures in the test are kept so that re-introducing a file-level
 * jump (the music-player analogy: album = md file, track = md file) breaks a test
 * instead of silently skipping a digest's unheard sections again.
 *
 * `resolveArticleTitle` is the one function here that genuinely reads the slug:
 * naming the ARTIST — the album is the constant `Motyl.dev` — is exactly
 * where the md file still matters, even though moving between tracks no longer
 * cares which file a track sits in.
 */
type QueueItem = Pick<SpeechSection, 'sourceSlug' | 'sourceTitle'>

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

/**
 * The article title to show under the section title — the media session's
 * `artist` line — for the section at `currentIndex`.
 *
 * It cannot simply be `items[currentIndex].sourceTitle`. `splitReviewedSections`
 * stamps `sourceTitle` on an article's FIRST section only (`ordinal === 0`), so
 * every later section of a digest carries `undefined`, and reading the current
 * item alone would blank the artist line on the majority of a digest's
 * sections — the very sections this whole track-is-a-section change exists to
 * make reachable.
 *
 * That field stays first-section-only on purpose: `splitIntoSpeechUnits` uses
 * `sourceTitle ?? title` as the unit that is SPOKEN, and `prepareSpeechSections`
 * folds it into `speechText`. Copying the article title onto every section would
 * have a head unit announce each section with the digest's name instead of its
 * own heading, and would rewrite every synthesis-cache key. So the title is
 * recovered here, at display time, instead of being denormalised there.
 *
 * The recovery leans on the invariant this module already owns: sections of one
 * article are CONTIGUOUS in the queue. So the answer is the `sourceTitle` of the
 * nearest preceding item sharing this item's `sourceSlug`, and the scan stops
 * dead at the first slug that differs — walking past that boundary would leave
 * the previous article's name on screen while the next article plays.
 *
 * Answers `''` — which the OS reads as "no artist line", the same absence the
 * metadata object already expresses — when the index is one this queue does not
 * have (out of range, negative, fractional, or an empty queue), or when no
 * section of this article carries a title at all, as happens for an md file with
 * no front-matter title.
 */
export function resolveArticleTitle(items: readonly QueueItem[], currentIndex: number): string {
  if (!inRange(items, currentIndex)) return ''

  const { sourceSlug } = items[currentIndex]

  for (let index = currentIndex; index >= 0; index -= 1) {
    const item = items[index]
    // The article boundary. Stopping here is what keeps the previous article's
    // title from leaking onto the section that follows it.
    if (item.sourceSlug !== sourceSlug) break
    if (item.sourceTitle) return item.sourceTitle
  }

  return ''
}
