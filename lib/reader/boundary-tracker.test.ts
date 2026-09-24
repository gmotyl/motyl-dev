import { describe, expect, it } from 'vitest'
import { createBoundaryTracker } from '@/lib/reader/boundary-tracker'
import { createUnitTimeline } from '@/lib/reader/unit-timeline'

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
})
