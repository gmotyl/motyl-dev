/**
 * The map between a reader unit and its place on the MSE buffer timeline.
 *
 * With one element and one `src`, units stop being separate files and become
 * RANGES on a single timeline: unit 3 is not "the third source" any more, it is
 * "the stretch from 41.2 s to 58.9 s". This module is the only thing that knows
 * that correspondence, and it replaces the per-unit `onended` the swapping
 * carrier relied on — there is no `ended` event at a seam inside one buffer, so
 * "which unit is being read now" has to be answered from `currentTime`.
 *
 * Two rules the rest of the carrier depends on:
 *
 * 1. DURATIONS ARE MEASURED, NEVER DERIVED. Every duration handed to `push`
 *    comes from the decoded media. A unit whose duration could not be measured
 *    arrives as 0 and is recorded, but it occupies no time: it never wins a
 *    `unitAt` lookup, and the next unit starts where it does. A guessed
 *    duration (bytes × bitrate) would shift every later span by its error and
 *    silently misreport the read position for the rest of the run.
 *
 * 2. REMOVAL NEVER RENUMBERS. `dropBefore` follows `SourceBuffer.remove`, which
 *    evicts media without moving what stays: the surviving spans keep their
 *    absolute start times, so `currentTime` keeps meaning what it meant. What a
 *    drop does destroy is the ability to seek into the evicted stretch, and
 *    `oldest()` exists so the caller can clamp such a seek to the earliest
 *    media still there.
 */

export interface UnitSpan {
  index: number
  /** Seconds into the buffer timeline where this unit begins. */
  start: number
  /** Measured duration of the appended media; 0 when unmeasurable. */
  duration: number
}

export interface UnitTimeline {
  push(index: number, duration: number): UnitSpan
  unitAt(time: number): UnitSpan | null
  startOf(index: number): number | null
  end(): number
  /** Drops spans entirely before `time`. Remaining spans keep their absolute starts. */
  dropBefore(time: number): void
  /** The oldest span still retained, for clamping a seek into dropped media. */
  oldest(): UnitSpan | null
}

export function createUnitTimeline(): UnitTimeline {
  const spans: UnitSpan[] = []

  /**
   * Where the next span begins — kept apart from `spans` on purpose.
   *
   * It is a running total of everything ever pushed, not `spans.at(-1)` plus a
   * duration, so that a drop cannot rewind it. Dropping every span still leaves
   * the next append landing after the media that was evicted, which is what the
   * buffer itself does.
   */
  let nextStart = 0

  return {
    push(index, duration) {
      const span: UnitSpan = { index, start: nextStart, duration }
      spans.push(span)
      nextStart += duration
      return span
    },

    unitAt(time) {
      // Half-open [start, start + duration): a boundary belongs to the unit
      // that BEGINS there, and a zero-duration span spans nothing at all, so it
      // can never match.
      return spans.find((span) => time >= span.start && time < span.start + span.duration) ?? null
    },

    startOf(index) {
      return spans.find((span) => span.index === index)?.start ?? null
    },

    end() {
      return nextStart
    },

    dropBefore(time) {
      // "Entirely before" — a span still holding media at `time` survives whole.
      // Splitting it would invent a start that no longer matches the unit.
      const retained = spans.filter((span) => span.start + span.duration > time)
      spans.length = 0
      spans.push(...retained)
    },

    oldest() {
      return spans[0] ?? null
    },
  }
}
