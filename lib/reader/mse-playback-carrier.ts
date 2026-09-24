/**
 * The MSE carrier, as the reader sees it: one element, one source, many units.
 *
 * `lib/reader/mse-carrier.ts` already owns the hard part — creating the
 * `MediaSource`, serialising `appendBuffer` against `updating`, and refusing to
 * let an append fail silently. It is device-proven and is WRAPPED here, never
 * reimplemented. What this module adds is the half the spike did not need:
 *
 * 1. THE MAP FROM UNIT TO TIME. A unit stops being a file and becomes a range,
 *    so `seekToUnit` is `element.currentTime = timeline.startOf(i)` — no `src`
 *    assignment and no `play()`. That is the entire point of the strategy: the
 *    assignment is the moment at which a backgrounded phone revokes the page's
 *    media status, and this carrier has exactly one of them per timeline.
 *
 * 2. WHEN A NEW `MediaSource` MAY BE CREATED. Extending the timeline across a
 *    section handoff is what keeps that count at one for a whole reading
 *    session, so creation is gated in one place and `continueTimeline` is the
 *    only thing that opens the gate.
 *
 * ## Spans are measured from the buffer, not from the nominal duration
 *
 * `PreparedUnit.duration` is documented as "measured from decoded media; 0 when
 * unmeasurable" — and `useTTS` sends 0 for every unit, because nothing in the
 * reader decodes the media. Chaining those nominal numbers would give every
 * unit a zero-length span and the timeline would map nothing.
 *
 * So each span is sized from the `buffered` range the append ACTUALLY gained.
 * That is also the truer number even when a nominal duration exists:
 * `mse-carrier.ts` leaves `timestampOffset` at 0 and each independently-encoded
 * MP3 carries its own encoder delay and padding (~38–51 ms per fragment), so
 * the buffer does not advance by the sum of the fragments' own durations. A
 * timeline chained from nominal durations drifts from the buffer by roughly
 * that much per unit — ~3.8 s after 100 units — and every `startOf` after the
 * drift seeks to the wrong place. Measuring the gain removes that drift at the
 * source, because the number fed to the timeline IS the number the element's
 * `currentTime` uses.
 *
 * Two places the drift can still get in, both deliberate and both recorded:
 *
 * - A unit whose append gains the buffer nothing measurable contributes NO
 *   span (`reader-error` says so). If its media is nevertheless in the buffer,
 *   every later unit's start is short by its length. The alternative — guessing
 *   a length — shifts every later unit by the error of the guess instead, and
 *   silently. `UnitTimeline` chains starts and takes no explicit start, so a
 *   carrier cannot re-seat a span from the buffer without changing that
 *   interface.
 * - The nominal duration is used only when the buffer reports no ranges at all,
 *   i.e. when it told us nothing rather than when it told us zero.
 */

import type { Carrier, PreparedUnit } from '@/lib/reader/carrier'
import { detailFor, logReaderEvent } from '@/lib/reader/diagnostic-log'
import { createMseCarrier, type MseCarrier } from '@/lib/reader/mse-carrier'
import { createUnitTimeline, type UnitTimeline } from '@/lib/reader/unit-timeline'

/**
 * Whether a number of seconds can be used as a span.
 *
 * `HTMLMediaElement.duration` is `NaN` before metadata loads and `Infinity` for
 * an unbounded stream, and `UnitTimeline.push` clamps neither: one NaN poisons
 * the running append point and therefore EVERY later `startOf`, permanently and
 * with no way back. Normalising at this boundary is the only place that can be
 * done without changing the timeline's interface.
 */
const isMeasurable = (seconds: number): boolean => Number.isFinite(seconds) && seconds > 0

export function createMsePlaybackCarrier(): Carrier {
  let element: HTMLAudioElement | null = null
  /** The wrapped spike carrier: the live `MediaSource` and its append queue. */
  let source: MseCarrier | null = null
  let timeline = createUnitTimeline()
  /**
   * Units appended to the CURRENT source.
   *
   * Two jobs, and neither is served by the timeline alone. It makes appends
   * idempotent per index — the prefetch path and the play path both offer a
   * unit, and on one continuous buffer a second append is not a wasted object
   * URL but the same audio twice on the timeline. And it survives eviction, so
   * a seek to a unit whose media was REMOVED can be told apart from a seek to a
   * unit that was never prepared: the first clamps, the second is refused.
   */
  let appended = new Set<number>()
  /**
   * Serialises `appendUnits` calls against each other.
   *
   * The spike's queue serialises `appendBuffer`, but each unit's span has to be
   * measured between ITS own appends — so this module awaits one append before
   * enqueuing the next, and two overlapping callers would otherwise interleave
   * their units into the buffer in an order neither of them chose.
   */
  let appendChain: Promise<void> = Promise.resolve()

  /**
   * Where the next append will land, or null when the buffer has told us
   * nothing yet.
   *
   * `report()` is the wrapped carrier's only window onto `SourceBuffer.buffered`
   * and it is read AFTER an append resolves, which the spike carrier only does
   * on `updateend` — so the range already covers the media that just arrived.
   * The LAST range's end is the append point even on a gapped buffer.
   */
  const bufferedEnd = (carrier: MseCarrier): number | null => {
    const { ranges } = carrier.report()
    const last = ranges[ranges.length - 1]
    return last ? last[1] : null
  }

  /** The span to give a unit: the buffer's answer, the caller's, or none. */
  const spanFor = (unit: PreparedUnit, before: number | null, after: number | null): number => {
    // A null `before` means the buffer was empty, so the whole of `after` is
    // this append's gain — which also folds a non-zero buffer origin into the
    // first unit's span rather than leaving the timeline half an origin ahead
    // of the element.
    const gained = after === null ? null : after - (before ?? 0)
    if (gained !== null && isMeasurable(gained)) return gained
    if (isMeasurable(unit.duration)) return unit.duration

    logReaderEvent('reader-error', detailFor(unit.index, 'duration unmeasurable, counted as 0'))
    return 0
  }

  /** Drops the live source and everything mapped onto it. */
  const teardown = (): void => {
    source?.dispose()
    source = null
    timeline = createUnitTimeline()
    appended = new Set()
  }

  /**
   * Creates the `MediaSource` and hands the element its one object URL.
   *
   * The assignment is what makes the source open — `addSourceBuffer` is illegal
   * until it does — so it is not separable from the creation, and it is the
   * only `src` write on the playing path.
   */
  const openSource = (target: HTMLAudioElement): MseCarrier => {
    const opened = createMseCarrier()
    source = opened
    target.src = opened.src
    return opened
  }

  const appendInOrder = async (
    units: PreparedUnit[],
    continueTimeline: boolean
  ): Promise<void> => {
    const target = element
    if (target === null) {
      // Without an element the source can never open and every append would
      // wait on `sourceopen` forever — the silent hang the wrapped carrier
      // refuses to ship. Say so instead, and let the caller keep running.
      for (const unit of units) {
        logReaderEvent('append-failed', detailFor(unit.index, 'no element attached'))
      }
      return
    }

    // THE gate. A timeline is continued by default; `continueTimeline: false`
    // restarts it, but only once it actually holds something — a source opened
    // and never appended to is the one the caller asked for, and replacing it
    // would assign the element a second source for a single timeline.
    if (source === null || (!continueTimeline && appended.size > 0)) {
      teardown()
      openSource(target)
    }
    const active = source
    if (active === null) return

    for (const unit of units) {
      if (appended.has(unit.index)) continue

      const before = bufferedEnd(active)
      try {
        await active.append(unit.index, unit.data, unit.duration)
      } catch (error) {
        // A rebuild or a dispose while this append was in flight: the source it
        // was queued against is gone, it already logged, and nothing it carried
        // belongs on the timeline that replaced it.
        if (source !== active) return
        throw error
      }
      if (source !== active) return

      appended.add(unit.index)
      timeline.push(unit.index, spanFor(unit, before, bufferedEnd(active)))
    }
  }

  return {
    kind: 'mse',

    /**
     * Records the element. Nothing is assigned here: the source is created on
     * the first append, so that a carrier attached at mount and never played
     * holds no `MediaSource` at all.
     */
    attach(audioElement: HTMLAudioElement): void {
      element = audioElement
    },

    appendUnits(units: PreparedUnit[], options: { continueTimeline: boolean }): Promise<void> {
      const task = appendChain.then(() => appendInOrder(units, options.continueTimeline))
      // The chain must survive a failed append: a rejected tail would fail
      // every later call with an error that has nothing to do with it.
      appendChain = task.catch(() => {})
      return task
    },

    /**
     * THE unit advance: move the playhead, touch nothing else.
     *
     * No `src`, no `play()`, no `load()` — on one continuous buffer the element
     * is already playing and a unit change is a position change. Every one of
     * those calls is a boundary at which the OS can take the media session away,
     * which is the failure this carrier exists to remove.
     */
    seekToUnit(index: number): void {
      const target = element
      if (target === null) return

      const start = timeline.startOf(index)
      if (start !== null) {
        target.currentTime = start
        return
      }

      if (!appended.has(index)) {
        logReaderEvent('reader-error', detailFor(index, 'seek refused: unit not prepared'))
        return
      }

      // The unit was appended and its media has since been evicted. The oldest
      // span still retained is the earliest place the buffer can actually play
      // from.
      const oldest = timeline.oldest()
      if (oldest === null) {
        // Nothing is retained at all. `end()` does not rewind on a drop, so the
        // timeline still reports an append point — but there is no media under
        // it, and seeking into a hole would stall the element with `isPlaying`
        // still true. Leave the playhead where the caller can still observe it.
        logReaderEvent('reader-error', detailFor(index, 'seek refused: no media retained'))
        return
      }

      logReaderEvent('reader-error', detailFor(index, `seek clamped to unit ${oldest.index}`))
      target.currentTime = oldest.start
    },

    timeline(): UnitTimeline {
      return timeline
    },

    /**
     * Drop the timeline and start a fresh source under the same element.
     *
     * Unlike the src-swap carrier — which deliberately leaves `element.src`
     * alone — this one clears it. The difference is that the URL being dropped
     * here is the element's ONLY source and it has just been revoked: a
     * `MediaSource` cannot be handed back, and the element cannot be left
     * pointing at a dead one. Clearing first makes the teardown complete on its
     * own, independently of whether a fresh source is opened afterwards, so
     * there is no path that leaves the element holding a revoked object URL.
     */
    rebuild(): void {
      teardown()
      if (element === null) return
      element.src = ''
      openSource(element)
    },

    dispose(): void {
      teardown()
      if (element !== null) element.src = ''
      element = null
    },
  }
}
