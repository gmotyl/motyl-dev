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
 * ## The spans telescope, so a mis-measured unit cannot compound
 *
 * That is the stronger half of the argument, and it is a property of the whole
 * module rather than of `spanFor` alone. Appends are STRICTLY SERIALISED — the
 * wrapped carrier serialises `appendBuffer`, `appendInOrder` awaits each append
 * before enqueuing the next, and `appendChain` serialises overlapping callers.
 * So the end read after unit k IS the end read before unit k+1, every span is
 * the difference between two adjacent ABSOLUTE readings, and the spans
 * telescope: their sum is the buffer's absolute end. `timeline.end()` is the
 * buffer's end at all times.
 *
 * The retention trim is the one other thing that touches the buffer, and it is
 * built so as not to disturb this. It removes a PREFIX, `[0, boundary)`, and a
 * front removal cannot move the last range's end — which is the only reading
 * `spanFor` takes. It cannot empty the buffer either: the boundary is behind
 * the playhead by `RETAIN_SECONDS`, so media after it always survives and
 * `bufferedEnd` never falls back from a reading to a silence. A removal in
 * flight while unit k+1 is measured therefore changes neither its `before` nor
 * its `after`, and `timeline.end()` stays the buffer's end across a trim.
 *
 * That is what makes each measurement self-correcting. A unit measured wrong is
 * wrong about ITSELF; the next unit re-anchors on an absolute position that owes
 * nothing to it. So a zero-span unit does NOT leave every later start short by
 * its length — the later units sit exactly where the buffer put them. The whole
 * defect is local to the zero-span unit: its own `startOf` points at where the
 * NEXT unit's media begins.
 *
 * The one thing that would break the property is putting a span on the timeline
 * that the buffer never reported, so `spanFor` never does:
 *
 * - When the buffer reports ranges, its answer is the only answer — including
 *   when that answer is a gain of zero. Such a unit contributes NO span and
 *   `reader-error` says so. Substituting a nominal duration here would push
 *   `end()` past the buffer's real end, and every later unit would be
 *   mis-placed by that much for the rest of the run: the one error mode in this
 *   module that would compound.
 * - The nominal duration is used only when the buffer reports no ranges AT ALL,
 *   i.e. when it told us nothing rather than when it told us zero. That
 *   substitution is logged too, so the one span on the timeline that was not
 *   measured is never a silent one.
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

/**
 * Seconds of played media kept behind the playhead, sized so previoustrack
 * still resolves.
 *
 * Ten minutes is not a memory figure, it is a REACHABILITY figure. The lock
 * screen's previoustrack goes back a section, so the window has to be longer
 * than a section is: anything shorter and the button seeks into media the
 * carrier evicted while the listener was still on the section after it. A
 * reading session runs for hours, so the buffer must be bounded — but it is
 * bounded at the first size that keeps the control working, not at the
 * smallest size that plays.
 */
export const RETAIN_SECONDS = 600

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
   *
   * Eviction does not change that, though it did change the argument. It used
   * to rest on this carrier removing nothing; what carries it now is that a
   * front removal only ever takes media from BELOW the last range's end, and
   * appended media still lands at or after that end — the source buffer places
   * a fragment by its presentation time, and dropping older media does not
   * rewind it. So no removal can make an append land before the last range, and
   * the last range is still where the next one will go.
   */
  const bufferedEnd = (carrier: MseCarrier): number | null => {
    const { ranges } = carrier.report()
    const last = ranges[ranges.length - 1]
    return last ? last[1] : null
  }

  /** The span to give a unit: the buffer's answer, the caller's, or none. */
  const spanFor = (unit: PreparedUnit, before: number | null, after: number | null): number => {
    if (after !== null) {
      // The buffer spoke, so it decides — this is what keeps the spans
      // telescoping onto the buffer's own absolute end. A null `before` means
      // it was empty, so the whole of `after` is this append's gain, which also
      // folds a non-zero buffer origin into the first unit's span rather than
      // leaving the timeline half an origin ahead of the element.
      const gained = after - (before ?? 0)
      if (isMeasurable(gained)) return gained

      // It answered ZERO (or went backwards under eviction). That is an answer,
      // not a silence: the nominal must NOT be substituted here, or `end()`
      // stops being the buffer's end and every later unit is mis-placed.
      logReaderEvent('reader-error', detailFor(unit.index, 'duration unmeasurable, counted as 0'))
      return 0
    }

    // No ranges at all — the buffer told us nothing, so the caller's number is
    // the only one there is. Never silently: this is the single span on the
    // timeline that was not measured, and it is the only way the telescoping
    // can be off, so it is recorded like any other reader fault.
    if (isMeasurable(unit.duration)) {
      logReaderEvent(
        'reader-error',
        detailFor(unit.index, `buffer reported no ranges, counted nominal ${unit.duration}`)
      )
      return unit.duration
    }

    logReaderEvent('reader-error', detailFor(unit.index, 'duration unmeasurable, counted as 0'))
    return 0
  }

  /**
   * Trims the buffer back to the retention window, once per `appendUnits` call.
   *
   * ## Why the append path
   *
   * `useTTS` offers a unit the moment its audio lands, so an append is the one
   * thing that happens regularly for as long as a reading session runs — and it
   * is also the only thing that makes the buffer grow. Tying the trim to it
   * means the buffer is measured exactly when it changed, with no timer of our
   * own to leak and no `timeupdate` handler competing with the boundary
   * tracker's.
   *
   * ## Why the cut lands on a unit boundary, not on the horizon
   *
   * `dropBefore` keeps a span that still holds media at the horizon, whole —
   * it will not invent a start in the middle of a unit. `SourceBuffer.remove`
   * has no such scruple: `remove(0, horizon)` takes the front off that same
   * unit. Pairing them literally would leave `oldest()` naming a position with
   * no media under it, and the seek-clamp in `seekToUnit` — whose whole job is
   * to land the playhead on media that is still there — would put the element
   * in a hole with `isPlaying` still true. So the cut is moved BACK to the
   * start of the unit that owns the horizon: both sides evict the same whole
   * units, `oldest().start` is the first buffered second, and the window kept
   * is at least `RETAIN_SECONDS`, never less.
   */
  const trimToRetentionWindow = (active: MseCarrier, target: HTMLAudioElement): void => {
    // `currentTime` is 0 before playback and NaN before metadata; `!(x > 0)`
    // refuses both without a separate guard.
    const horizon = target.currentTime - RETAIN_SECONDS
    if (!(horizon > 0)) return

    const oldestKept = timeline.unitAt(horizon)
    // Null means the horizon points into media this carrier no longer maps —
    // already evicted, or never appended. Either way there is nothing to line a
    // cut up with, and a cut we cannot describe is one the timeline could not
    // follow.
    if (oldestKept === null) return
    const boundary = oldestKept.start

    const { ranges } = active.report()
    const first = ranges[0]
    // Nothing buffered before the cut: either the buffer is empty or an earlier
    // trim already took it. Re-issuing the removal would be harmless but the
    // check keeps the common append — every unit of a long session — free of a
    // pointless turn through the buffer's queue.
    if (first === undefined || first[0] >= boundary) return

    // THE MAP GOES FIRST, and deliberately. Between the two the timeline is
    // conservative: it says media is gone a moment before it is, so a seek in
    // that window clamps to something still buffered. The other order is
    // conservative the wrong way — the map would promise media the buffer has
    // already dropped, and a seek there stalls the element silently, which is
    // the failure this whole carrier exists to remove. It is also what survives
    // a refused removal: forgetting media that is still there costs a clamp,
    // remembering media that is gone costs the session.
    timeline.dropBefore(boundary)

    // NOT awaited. The eviction shares the wrapped carrier's queue, so it is
    // already ordered against every append — and the next unit's audio should
    // not wait behind a memory optimisation to reach the buffer. A rejection
    // has been logged by the queue that owns it, exactly as a refused append
    // is; catching here is only to keep it from surfacing as an unhandled one.
    void active.evictBefore(boundary).catch(() => {})
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

    // After the units, never between them: a trim in the middle of a batch
    // would sit between one unit's `after` reading and the next unit's
    // `before`, and the whole span measurement rests on those being the same
    // reading of the same buffer.
    trimToRetentionWindow(active, target)
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
