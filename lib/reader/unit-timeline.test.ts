import { describe, expect, it } from 'vitest'
import { createUnitTimeline } from '@/lib/reader/unit-timeline'

describe('createUnitTimeline', () => {
  it('starts the first span at zero and chains each start to the previous end', () => {
    const timeline = createUnitTimeline()

    const first = timeline.push(0, 12)
    const second = timeline.push(1, 7.5)
    const third = timeline.push(2, 20)

    expect(first).toEqual({ index: 0, start: 0, duration: 12 })
    expect(second).toEqual({ index: 1, start: 12, duration: 7.5 })
    expect(third).toEqual({ index: 2, start: 19.5, duration: 20 })
    expect(timeline.startOf(1)).toBeCloseTo(12, 6)
    expect(timeline.startOf(2)).toBeCloseTo(19.5, 6)
    expect(timeline.end()).toBeCloseTo(39.5, 6)
  })

  it('returns the span containing a time, and the later span at an exact boundary', () => {
    const timeline = createUnitTimeline()
    timeline.push(0, 12)
    timeline.push(1, 8)

    expect(timeline.unitAt(0)?.index).toBe(0)
    expect(timeline.unitAt(11.999)?.index).toBe(0)
    // The boundary belongs to the unit that BEGINS there: at 12 s the reader is
    // already reading unit 1, not finishing unit 0.
    expect(timeline.unitAt(12)?.index).toBe(1)
    expect(timeline.unitAt(19.999)?.index).toBe(1)
  })

  it('returns null past the end of the timeline', () => {
    const timeline = createUnitTimeline()
    timeline.push(0, 12)
    timeline.push(1, 8)

    // Positive control first: an implementation that answers null everywhere
    // would otherwise pass this test while resolving nothing at all.
    expect(timeline.unitAt(19.999)?.index).toBe(1)
    expect(timeline.unitAt(20)).toBeNull()
    expect(timeline.unitAt(100)).toBeNull()
  })

  it('never resolves to a zero-length span', () => {
    const timeline = createUnitTimeline()
    timeline.push(0, 10)
    // Unit 1's duration could not be measured; it must not poison the timeline.
    const unmeasurable = timeline.push(1, 0)
    timeline.push(2, 5)

    expect(unmeasurable).toEqual({ index: 1, start: 10, duration: 0 })
    expect(timeline.end()).toBeCloseTo(15, 6)
    // Unit 2 begins exactly where unit 1 does, and owns the instant.
    expect(timeline.unitAt(10)?.index).toBe(2)

    const sweep = [0, 5, 9.999, 10, 12, 14.999].map((time) => timeline.unitAt(time)?.index)
    expect(sweep).toEqual([0, 0, 0, 2, 2, 2])
  })

  it('keeps absolute starts after dropping early spans', () => {
    const timeline = createUnitTimeline()
    timeline.push(0, 10)
    timeline.push(1, 10)
    timeline.push(2, 10)

    // A span counts as "before" only when it ends at or before the cut, so the
    // cut at 10 takes unit 0 and leaves unit 1 whole.
    timeline.dropBefore(10)

    expect(timeline.startOf(1)).toBeCloseTo(10, 6)
    expect(timeline.startOf(2)).toBeCloseTo(20, 6)
    expect(timeline.end()).toBeCloseTo(30, 6)
    expect(timeline.unitAt(25)?.index).toBe(2)
    // The media behind unit 0 is gone, so nothing resolves there any more.
    expect(timeline.unitAt(5)).toBeNull()
  })

  it('forgets the start of a dropped index', () => {
    const timeline = createUnitTimeline()
    timeline.push(0, 10)
    timeline.push(1, 10)

    expect(timeline.startOf(0)).toBeCloseTo(0, 6)

    timeline.dropBefore(10)

    expect(timeline.startOf(0)).toBeNull()
    expect(timeline.startOf(1)).toBeCloseTo(10, 6)
  })

  it('reports the oldest retained span', () => {
    const timeline = createUnitTimeline()

    expect(timeline.oldest()).toBeNull()

    timeline.push(0, 10)
    timeline.push(1, 10)
    timeline.push(2, 10)

    expect(timeline.oldest()).toEqual({ index: 0, start: 0, duration: 10 })

    timeline.dropBefore(20)

    expect(timeline.oldest()).toEqual({ index: 2, start: 20, duration: 10 })
  })

  it('keeps a span whole when the cut lands inside it', () => {
    const timeline = createUnitTimeline()
    timeline.push(0, 10)
    timeline.push(1, 10)
    timeline.push(2, 10)

    // Retention cuts at `currentTime - RETAIN_SECONDS`, which practically never
    // lands on a unit boundary. Unit 1 still holds media at 15 s, so it survives
    // whole rather than being split at the cut.
    timeline.dropBefore(15)

    expect(timeline.oldest()).toEqual({ index: 1, start: 10, duration: 10 })
    expect(timeline.startOf(1)).toBeCloseTo(10, 6)
    // The retained span keeps its original start, so the stretch before the cut
    // still resolves to it.
    expect(timeline.unitAt(11)?.index).toBe(1)
    expect(timeline.unitAt(16)?.index).toBe(1)
    // Unit 0 ended before the cut and is gone.
    expect(timeline.unitAt(5)).toBeNull()
  })

  it('does not rewind the append point when a drop empties the timeline', () => {
    const timeline = createUnitTimeline()
    timeline.push(0, 10)
    timeline.push(1, 10)

    // Every span is evicted, but the media that was appended still occupied the
    // first 20 s of the buffer, so the next append has to land after it.
    timeline.dropBefore(100)

    expect(timeline.oldest()).toBeNull()
    expect(timeline.end()).toBeCloseTo(20, 6)
    expect(timeline.push(2, 10)).toEqual({ index: 2, start: 20, duration: 10 })
    expect(timeline.end()).toBeCloseTo(30, 6)
    expect(timeline.unitAt(25)?.index).toBe(2)
  })
})
