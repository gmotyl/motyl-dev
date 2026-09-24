import { describe, expect, it } from 'vitest'
import { createBoundaryTracker } from '@/lib/reader/boundary-tracker'
import { createUnitTimeline, type UnitSpan, type UnitTimeline } from '@/lib/reader/unit-timeline'

/**
 * A timeline with a hole in the middle: units 0 and 1 are contiguous, unit 3
 * sits ten seconds further on with nothing in between.
 *
 * `createUnitTimeline` cannot produce this — `dropBefore` only ever evicts a
 * prefix, so a walk over it always breaks on its first step. The tracker is
 * written against the interface, not that implementation, so the chain-break
 * rule needs a timeline that can actually break mid-walk.
 */
function gappedTimeline(): UnitTimeline {
  const spans: UnitSpan[] = [
    { index: 0, start: 0, duration: 10 },
    { index: 1, start: 10, duration: 10 },
    { index: 3, start: 30, duration: 10 },
  ]

  return {
    push: () => {
      throw new Error('gappedTimeline is read-only')
    },
    unitAt: (time) => spans.find((span) => time >= span.start && time < span.start + span.duration) ?? null,
    startOf: (index) => spans.find((span) => span.index === index)?.start ?? null,
    end: () => 40,
    dropBefore: () => {},
    oldest: () => spans[0] ?? null,
  }
}

/** Three ten-second units, the shape every test below reads through. */
function threeUnits() {
  const timeline = createUnitTimeline()
  timeline.push(0, 10)
  timeline.push(1, 10)
  timeline.push(2, 10)
  return timeline
}

describe('createBoundaryTracker', () => {
  it('reports nothing while the playhead stays inside a span', () => {
    const tracker = createBoundaryTracker(threeUnits())

    // The first tick only seats the tracker — nothing completed before it.
    expect(tracker.advance(0)).toEqual([])
    expect(tracker.advance(2.5)).toEqual([])
    expect(tracker.advance(9.75)).toEqual([])

    // Positive control: the tracker is seated in unit 0 and still reporting, so
    // the empty arrays above mean "no boundary", not "no implementation".
    expect(tracker.advance(10.25)).toEqual([0])
  })

  it('reports the previous index exactly once on crossing', () => {
    const tracker = createBoundaryTracker(threeUnits())

    tracker.advance(1)

    expect(tracker.advance(10.25)).toEqual([0])
    // Later ticks inside the same span must not repeat the completion.
    expect(tracker.advance(12)).toEqual([])
    expect(tracker.advance(19.9)).toEqual([])
    expect(tracker.advance(20)).toEqual([1])
  })

  it('reports nothing when the same time is fed twice', () => {
    const tracker = createBoundaryTracker(threeUnits())

    tracker.advance(1)

    expect(tracker.advance(11)).toEqual([0])
    // `timeupdate` can fire twice on an unchanged clock; the second one is not a
    // second crossing.
    expect(tracker.advance(11)).toEqual([])
    expect(tracker.advance(21)).toEqual([1])
  })

  it('reports every span skipped by a jumped tick, in order', () => {
    const tracker = createBoundaryTracker(threeUnits())

    tracker.advance(1)

    // A hidden page is throttled to ~4 Hz and may skip a tick outright, so one
    // tick can land two spans later. Both units finished, oldest first.
    expect(tracker.advance(25)).toEqual([0, 1])
    expect(tracker.advance(26)).toEqual([])
  })

  it('reports no completion for spans re-entered after a backward seek', () => {
    const tracker = createBoundaryTracker(threeUnits())

    tracker.advance(1)
    expect(tracker.advance(11)).toEqual([0])
    expect(tracker.advance(21)).toEqual([1])

    // The listener seeks back into unit 0 and re-seats the tracker there.
    tracker.reseat(2)

    // Re-entering units 0 and 1 is not progress — the seek moved the playhead,
    // it did not read them.
    expect(tracker.advance(3)).toEqual([])
    expect(tracker.advance(9.5)).toEqual([])

    // Positive control: reading unit 0 through a second time does complete it
    // again, so the empty arrays above are a seek being ignored, not a tracker
    // that stopped reporting.
    expect(tracker.advance(11)).toEqual([0])
  })

  it('reports no completion for spans jumped over by a forward seek', () => {
    const tracker = createBoundaryTracker(threeUnits())

    tracker.advance(1)

    // The listener seeks forward into unit 2 and re-seats the tracker there.
    // Units 0 and 1 were skipped, not read: without the re-seat the next tick
    // would walk the spans left behind and claim both of them.
    tracker.reseat(25)

    expect(tracker.advance(25.5)).toEqual([])

    // Positive control: re-seated at unit 0, a real crossing still completes it,
    // so the empty array above is the seek being ignored, not a dead tracker.
    tracker.reseat(1)
    expect(tracker.advance(11)).toEqual([0])
  })

  it('keeps its seat while the playhead outruns the appender', () => {
    const timeline = createUnitTimeline()
    timeline.push(0, 10)
    const tracker = createBoundaryTracker(timeline)

    tracker.advance(5)

    // The pipeline has run past the last append, so nothing resolves out there.
    expect(tracker.advance(10)).toEqual([])
    expect(tracker.advance(10.1)).toEqual([])

    timeline.push(1, 10)

    // The seat survived the gap, so entering unit 1 still reports unit 0.
    // Clearing it would lose that completion every time the appender fell behind.
    expect(tracker.advance(10.2)).toEqual([0])
  })

  it('reports no completion for a backward tick that beats the seek handler', () => {
    const tracker = createBoundaryTracker(threeUnits())

    tracker.advance(1)
    expect(tracker.advance(21)).toEqual([0, 1])

    // A `timeupdate` can fire at the new position before the `seeked` handler
    // calls `reseat`, so `advance` has to recognise the backward move itself
    // rather than walking forward from the stale span.
    expect(tracker.advance(3)).toEqual([])

    // Positive control: the tracker took the seat at unit 0 and still reports.
    expect(tracker.advance(11)).toEqual([0])
  })

  it('reports only the seated index when a drop breaks the chain behind the playhead', () => {
    const timeline = threeUnits()
    const tracker = createBoundaryTracker(timeline)

    tracker.advance(1)

    // Retention evicted unit 1 while the playhead was still inside unit 0. Unit
    // 0 was certainly read through; whether unit 1 was is a guess, so the walk
    // reports only the certain completion.
    timeline.dropBefore(20)

    expect(tracker.advance(25)).toEqual([0])
  })

  it('reports the whole crossing when a drop leaves the chain intact', () => {
    const timeline = threeUnits()
    const tracker = createBoundaryTracker(timeline)

    tracker.advance(1)

    // The cut lands inside unit 1, which survives whole, so the walk still
    // reaches the tick's span and both completions stand.
    timeline.dropBefore(15)

    expect(tracker.advance(25)).toEqual([0, 1])
  })

  it('skips an unmeasurable span while walking a jumped tick', () => {
    const timeline = createUnitTimeline()
    timeline.push(0, 10)
    // Unit 1's duration could not be measured, so it occupies no time: the
    // playhead never enters it and it never completes, exactly as `unitAt` sees
    // it.
    timeline.push(1, 0)
    timeline.push(2, 10)

    const tracker = createBoundaryTracker(timeline)

    tracker.advance(1)

    expect(tracker.advance(15)).toEqual([0])
  })

  it('reports only the seated index when the walk falls into a gap', () => {
    const tracker = createBoundaryTracker(gappedTimeline())

    tracker.advance(1)

    // The walk crosses unit 1 and then runs into the hole before it reaches the
    // tick's span. Only unit 0 is known to have been read through; unit 1 is a
    // guess, so it is not claimed.
    expect(tracker.advance(35)).toEqual([0])
  })
})
