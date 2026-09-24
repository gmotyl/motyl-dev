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
    expect(report.expectedDuration).toBe(0)
    expect(report.drift).toBe(0)
    expect(report.gapsAtBoundaries).toEqual([])
  })
})
