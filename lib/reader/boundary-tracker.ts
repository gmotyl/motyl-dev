/**
 * Turns the element's clock into unit completions.
 *
 * One continuous MSE timeline has no `ended` event at a seam, so "unit 4 has
 * been read" can only be observed by noticing that `currentTime` has moved into
 * a different span. `timeupdate` is the clock to notice it on: it is driven by
 * the media pipeline, which a backgrounded page keeps running (~4 Hz while
 * hidden) long after rAF and timers have been throttled to a crawl.
 *
 * That throttling is also why a crossing cannot be assumed to be one span wide.
 * A hidden page can skip ticks outright, so a single tick may land two or more
 * spans later — every span it flew over was read and every one of them has to
 * be reported, in order, or the reader silently loses units.
 */

import type { UnitSpan, UnitTimeline } from '@/lib/reader/unit-timeline'

export interface BoundaryTracker {
  /** Feed the element's currentTime; returns the indices completed by this tick, in order. */
  advance(currentTime: number): number[]
  /** Re-seat after a seek so the next tick does not report a bogus completion. */
  reseat(currentTime: number): void
}

export function createBoundaryTracker(timeline: UnitTimeline): BoundaryTracker {
  /**
   * The span the playhead was last seen in, or null before the first tick.
   *
   * Null means "nowhere yet", never "at the start": the tracker cannot know
   * where playback began, so the first tick only seats this and reports
   * nothing. Claiming unit 0 finished because the first tick arrived inside
   * unit 1 would invent a unit that was never read.
   */
  let seated: UnitSpan | null = null

  return {
    advance(currentTime) {
      const span = timeline.unitAt(currentTime)

      // Null is a gap, dropped media, or a playhead past the last append. The
      // seat is deliberately KEPT: when the next unit is appended and the
      // playhead enters it, the crossing still reports the unit that just
      // finished. Clearing here would swallow the completion of the last unit
      // every time the pipeline outran the appender.
      if (span === null) return []

      if (seated === null) {
        seated = span
        return []
      }

      if (span.index === seated.index) return []

      // A backward move is a seek, not reading. It normally arrives via
      // `reseat`, but a `timeupdate` can fire at the new position before the
      // `seeked` handler runs, so take the seat silently either way rather
      // than walking forward from a stale span and reporting the whole tail.
      if (span.start < seated.start) {
        seated = span
        return []
      }

      // Walk the spans the playhead left behind. Stepping by
      // `start + duration` follows the timeline itself rather than assuming
      // unit indices are contiguous, and it skips unmeasurable (zero-length)
      // spans exactly as `unitAt` does — a span that occupies no time is never
      // entered, so it never completes.
      const completed: number[] = []
      let cursor: UnitSpan | null = seated
      while (cursor !== null && cursor.index !== span.index) {
        completed.push(cursor.index)
        cursor = timeline.unitAt(cursor.start + cursor.duration)
      }

      seated = span

      // The walk ran off the end without meeting the tick's span — a drop or a
      // gap broke the chain. Only the seated span is known to have been read
      // through, so report just that one instead of the guesses behind it.
      return cursor === null ? completed.slice(0, 1) : completed
    },

    reseat(currentTime) {
      // Same in both directions: a seek MOVED the playhead, it did not read
      // anything, so whatever lies between the old and new position is not a
      // completion. A null here leaves the tracker unseated and the next tick
      // re-seats it.
      seated = timeline.unitAt(currentTime)
    },
  }
}
