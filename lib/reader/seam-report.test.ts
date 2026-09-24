import { describe, expect, it } from 'vitest'
import { buildSeamReport } from '@/lib/reader/seam-report'

/**
 * jsdom provides no `TimeRanges`, so the tests build one.
 *
 * The fake THROWS outside `[0, length)` exactly as the DOM does
 * (`IndexSizeError`), which is what makes the empty-buffer test bite: an
 * implementation that reads `start(0)` before checking `length` fails here
 * instead of quietly returning NaN.
 */
interface TimeRangesProbe {
  /** How often `length` was read. */
  lengthReads: number
  /** How often `start()` or `end()` was called, at any index. */
  indexReads: number
}

function fakeTimeRanges(
  ranges: ReadonlyArray<readonly [number, number]>,
  probe?: TimeRangesProbe,
): TimeRanges {
  const guard = (index: number) => {
    if (probe) probe.indexReads += 1
    if (!Number.isInteger(index) || index < 0 || index >= ranges.length) {
      throw new DOMException(`Index ${index} is out of range`, 'IndexSizeError')
    }
  }

  const fake = {
    get length() {
      if (probe) probe.lengthReads += 1
      return ranges.length
    },
    start: (index: number) => {
      guard(index)
      return ranges[index][0]
    },
    end: (index: number) => {
      guard(index)
      return ranges[index][1]
    },
  }

  return fake as TimeRanges
}

describe('buildSeamReport', () => {
  it('reports a single range as contiguous', () => {
    const report = buildSeamReport(fakeTimeRanges([[0, 60]]), [20, 20, 20])

    expect(report.contiguous).toBe(true)
    expect(report.gapsAtBoundaries).toEqual([])
    expect(report.ranges).toEqual([[0, 60]])
    expect(report.bufferedDuration).toBeCloseTo(60, 6)
    expect(report.expectedDuration).toBeCloseTo(60, 6)
    expect(report.drift).toBeCloseTo(0, 6)
    // With no gaps there is nothing for the span to over-count, so the two
    // duration readings must agree exactly.
    expect(report.contentDuration).toBeCloseTo(60, 6)
    expect(report.contentDuration).toBeCloseTo(report.bufferedDuration, 6)
  })

  it('reports every range of a gapped buffer, in order', () => {
    const report = buildSeamReport(
      fakeTimeRanges([
        [0, 20],
        [20.4, 40.4],
        [40.9, 60.9],
      ]),
      [20, 20, 20],
    )

    expect(report.contiguous).toBe(false)
    expect(report.ranges).toEqual([
      [0, 20],
      [20.4, 40.4],
      [40.9, 60.9],
    ])
    // Ordered, not merely present: the second range must be the middle one.
    expect(report.ranges[1][0]).toBeCloseTo(20.4, 6)
    expect(report.bufferedDuration).toBeCloseTo(60.9, 6)
  })

  it('names the fragment boundary a gap falls at', () => {
    // One gap, opening just after the first two fragments have played
    // (20 + 20 = 40 s), so it belongs to boundary 2 and to no other.
    const report = buildSeamReport(
      fakeTimeRanges([
        [0, 40.03],
        [40.31, 60.31],
      ]),
      [20, 20, 20],
    )

    expect(report.contiguous).toBe(false)
    expect(report.gapsAtBoundaries).toEqual([2])
  })

  it('quantifies drift against the summed fragment durations', () => {
    // Every fragment lost a little to encoder delay on append.
    const report = buildSeamReport(fakeTimeRanges([[0, 59.4]]), [20, 20, 20])

    expect(report.expectedDuration).toBeCloseTo(60, 6)
    expect(report.bufferedDuration).toBeCloseTo(59.4, 6)
    expect(report.drift).toBeLessThan(0)
    expect(report.drift).toBeCloseTo(-0.6, 6)
  })

  it('reports a negative drift on a gapped buffer whose gaps cancel the shortfall', () => {
    // The fixture that made a span-derived drift lie. Each fragment lost 0.3 s
    // of content to encoder padding (0.6 s over the three) and 0.3 s of gap
    // opened at each of two boundaries (0.6 s again), so the span comes back to
    // exactly 60 s and `bufferedDuration - expectedDuration` is 0.000 — on a
    // buffer gapped twice. Derived from the content, drift stays negative.
    const report = buildSeamReport(
      fakeTimeRanges([
        [0, 19.7],
        [20, 39.7],
        [40, 60],
      ]),
      [20, 20, 20],
    )

    expect(report.contiguous).toBe(false)
    expect(report.gapsAtBoundaries).toEqual([1, 2])
    expect(report.expectedDuration).toBeCloseTo(60, 6)
    // The span is exactly the expected duration — which is why it must not be
    // what drift is measured against.
    expect(report.bufferedDuration).toBeCloseTo(60, 6)
    expect(report.contentDuration).toBeCloseTo(59.4, 6)
    expect(report.drift).toBeLessThan(0)
    expect(report.drift).toBeCloseTo(-0.6, 6)
  })

  it('separates the gap time from the content by exactly the gaps', () => {
    const report = buildSeamReport(
      fakeTimeRanges([
        [0, 19.7],
        [20, 39.7],
        [40, 60],
      ]),
      [20, 20, 20],
    )

    // Two gaps of 0.3 s each; the span over-counts the content by precisely
    // that, which is the whole relationship between the two numbers.
    expect(report.bufferedDuration - report.contentDuration).toBeCloseTo(0.6, 6)
  })

  it('leaves a gap it cannot attribute unnamed', () => {
    // The gap opens at 9 s; the nearest boundary is the 20 s join, 11 s away.
    // Snapping to the nearest boundary regardless of distance would name
    // boundary 1 here and invent a fact — `ranges` already carries the gap.
    const report = buildSeamReport(
      fakeTimeRanges([
        [0, 9],
        [9.3, 60],
      ]),
      [20, 20, 20],
    )

    expect(report.contiguous).toBe(false)
    expect(report.gapsAtBoundaries).toEqual([])
    // And the gap is not lost: the ranges still show it verbatim.
    expect(report.ranges).toEqual([
      [0, 9],
      [9.3, 60],
    ])
  })

  it('measures the boundary from the buffer origin, not from absolute zero', () => {
    // A SourceBuffer need not start at zero. The gap sits 40.02 s into the
    // buffer — boundary 2 — but 50.02 s into the timeline, so an implementation
    // that forgets the origin finds nothing within the tolerance window.
    const report = buildSeamReport(
      fakeTimeRanges([
        [10, 50.02],
        [50.3, 70.3],
      ]),
      [20, 20, 20],
    )

    expect(report.contiguous).toBe(false)
    expect(report.gapsAtBoundaries).toEqual([2])
    expect(report.bufferedDuration).toBeCloseTo(60.3, 6)
    expect(report.contentDuration).toBeCloseTo(60.02, 6)
  })

  it('reports the whole expected duration as drift when nothing was buffered', () => {
    // Deliberately NOT clamped to zero: fragments were expected and the buffer
    // holds none of them, so the shortfall is all of it. A later refactor that
    // floors drift at zero would print the most reassuring number available
    // over the emptiest possible buffer.
    const report = buildSeamReport(fakeTimeRanges([]), [20, 20, 20])

    expect(report.contiguous).toBe(false)
    expect(report.ranges).toEqual([])
    expect(report.bufferedDuration).toBe(0)
    expect(report.contentDuration).toBe(0)
    expect(report.expectedDuration).toBeCloseTo(60, 6)
    expect(report.drift).toBeCloseTo(-60, 6)
  })

  it('returns an empty report rather than throwing on an empty buffer', () => {
    // The fake throws on any index, so this only passes if nothing is indexed.
    const probe: TimeRangesProbe = { lengthReads: 0, indexReads: 0 }
    const report = buildSeamReport(fakeTimeRanges([], probe), [])

    // The zero-valued report must be a reading of the buffer, not a canned
    // object: the buffer's length was consulted and no range was indexed.
    expect(probe.lengthReads).toBeGreaterThan(0)
    expect(probe.indexReads).toBe(0)

    expect(report.contiguous).toBe(false)
    expect(report.ranges).toEqual([])
    expect(report.bufferedDuration).toBe(0)
    expect(report.contentDuration).toBe(0)
    expect(report.expectedDuration).toBe(0)
    expect(report.drift).toBe(0)
    expect(report.gapsAtBoundaries).toEqual([])
  })
})
