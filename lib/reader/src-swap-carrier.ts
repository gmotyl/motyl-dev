/**
 * Today's carrier, moved behind the `Carrier` interface and not rewritten.
 *
 * One `<audio>` element, its `src` swapped per speech unit to a `blob:` object
 * URL wrapping the MP3 `lib/tts/client` already returns. That is what earns
 * Chrome for Android the media treatment — notification, lockscreen, AVRCP
 * metadata in the car — and it is the only carrier iPhone Safari can use at
 * all, because WebKit there has no MediaSource.
 *
 * Three properties came across with the code and are load-bearing:
 *
 * 1. ONE ELEMENT, ITS SRC SWAPPED — never two ping-ponged. A second element
 *    would force an autoplay re-check on an element the user never gestured at
 *    and make media-session ownership flap between the two (a flickering car
 *    display).
 *
 * 2. THE BYTES ARE WRAPPED, NEVER DECODED. `lib/tts/client`'s synthesis cache
 *    hands the SAME `ArrayBuffer` instance to every caller, and `new Blob([…])`
 *    COPIES it — so replay, play-from-here and prefetch-then-play can each wrap
 *    it again. The old Web Audio path decoded in place and detached it, which
 *    is why a replay used to throw `Cannot decode detached ArrayBuffer`. Any
 *    future code that decodes the cached buffer here brings that straight back.
 *
 * 3. EVERY URL IS REVOKED. One per unit, released as the playhead leaves the
 *    retention window and at `rebuild()` / `dispose()`, or a Read All News
 *    session retains the whole article's audio.
 *
 * The one thing it does NOT own is the element's handlers: `onended`,
 * `onerror`, the suppression guard and the failure streak stay in `useTTS`,
 * because they are about the reader's session rather than about the element.
 */

import type { Carrier, PreparedUnit } from '@/lib/reader/carrier'
import { createUnitTimeline, type UnitTimeline } from '@/lib/reader/unit-timeline'

/**
 * `lib/tts/client` returns MP3 bytes straight from edge-tts. Nothing in the
 * reader needs decoded samples, so the bytes are handed to the media element
 * as-is, correctly typed, and the browser decodes them on its own audio thread.
 */
const AUDIO_MIME_TYPE = 'audio/mpeg'

export interface SrcSwapCarrierOptions {
  /**
   * Units kept AHEAD of the one being played. Everything outside
   * `[index, index + retainAhead]` is revoked at the swap — the caller states
   * the window because it is the caller's prefetch depth, and a carrier that
   * guessed it would either drop a unit the prefetcher just warmed or retain
   * one nobody will play.
   */
  retainAhead: number
  /**
   * Handed whatever `element.play()` returned, immediately, for every seek.
   *
   * A refused start is the one failure that must never be swallowed: there is
   * no second output path, so the alternative is silence with the reader still
   * showing "playing". The carrier does not know what a refusal means for the
   * session — that judgement needs the generation, the abort signal and the
   * failure streak — so it reports the attempt and leaves the decision to the
   * caller.
   */
  onStarted?: (index: number, started: Promise<void> | undefined) => void
}

export function createSrcSwapCarrier(options: SrcSwapCarrierOptions): Carrier {
  const { retainAhead, onStarted } = options

  /** Live `blob:` object URLs keyed by unit index. */
  const urls = new Map<number, string>()

  let element: HTMLAudioElement | null = null
  let timeline = createUnitTimeline()

  /**
   * Rebuild the timeline from the units still held.
   *
   * A src-swap carrier has no real timeline: units are separate files, each one
   * starting the element over at 0, so nothing here is measured and every span
   * has duration 0. What the timeline still answers truthfully is WHICH units
   * this carrier holds, which is the only question the reader asks it.
   */
  const resetTimeline = (): void => {
    timeline = createUnitTimeline()
    for (const index of [...urls.keys()].sort((a, b) => a - b)) timeline.push(index, 0)
  }

  const revoke = (index: number): void => {
    const url = urls.get(index)
    if (url === undefined) return
    urls.delete(index)
    URL.revokeObjectURL(url)
  }

  const revokeAll = (): void => {
    for (const index of [...urls.keys()]) revoke(index)
    resetTimeline()
  }

  return {
    kind: 'src-swap',

    attach(audioElement: HTMLAudioElement): void {
      element = audioElement
    },

    /**
     * Records units for a later `src` assignment. The element is not touched:
     * this runs on the prefetch path while the PREVIOUS unit is still playing,
     * so anything it did to the element would interrupt it.
     *
     * The options argument is accepted and ignored — deliberately not even
     * named. `continueTimeline` says nothing here: a src-swap carrier has no
     * timeline to extend or restart, and a section handoff is just more units
     * keyed by index. It is the MSE carrier that acts on it.
     *
     * Idempotent per index: a unit that already has a URL keeps it, so the play
     * path can append what the prefetch path already appended without leaking
     * the first URL or rewinding the element to a different source for the same
     * unit.
     */
    appendUnits(units: PreparedUnit[]): Promise<void> {
      for (const { index, data } of units) {
        if (urls.has(index)) continue
        urls.set(index, URL.createObjectURL(new Blob([data], { type: AUDIO_MIME_TYPE })))
        timeline.push(index, 0)
      }
      return Promise.resolve()
    },

    /**
     * THE unit swap: point the element at unit `index` and start it.
     *
     * The prune runs after the assignment and before the start, exactly as it
     * did in `useTTS`: the URL being dropped is then never the one the element
     * has just been pointed at.
     */
    seekToUnit(index: number): void {
      const url = urls.get(index)
      if (element === null || url === undefined) return

      element.src = url

      const keepUntil = index + retainAhead
      for (const held of [...urls.keys()]) {
        if (held >= index && held <= keepUntil) continue
        revoke(held)
      }
      resetTimeline()

      // Started FIRST, reported second: an optional call short-circuits its
      // arguments, so `onStarted?.(index, element.play?.())` would never start
      // the element at all when nobody is listening for the result.
      const started = element.play?.()
      onStarted?.(index, started)
    },

    timeline(): UnitTimeline {
      return timeline
    },

    /**
     * Drop every unit. The next `appendUnits` starts a fresh set.
     *
     * The element's source is deliberately LEFT ALONE. The reader rebuilds on
     * completion and on the give-up path as well as on `stop()`, and on those
     * first two the finished unit is still loaded with handlers the hook has
     * not detached yet — clearing `src` there would run the media load
     * algorithm and fire `emptied`/`error` at them. The caller clears the
     * source where it means to; `stop()` does.
     */
    rebuild(): void {
      revokeAll()
    },

    dispose(): void {
      revokeAll()
      element = null
    },
  }
}
