/**
 * Programmatic seam report over a MediaSource buffer.
 *
 * The spike appends eight independently-synthesized MP3 fragments — each with
 * its own header, possible ID3 tag, and encoder delay/padding — into one
 * SourceBuffer. The question this module answers, with the screen on and in
 * seconds, is whether they fused into a SINGLE buffered range. If they did not,
 * the seams are gaps and MSE reintroduces the micro-gap it was chosen to remove.
 *
 * Pure: it reads the TimeRanges it is handed and nothing else. The carrier does
 * the logging.
 */

export interface SeamReport {
  /** True when the appended fragments fused into a single buffered range. */
  contiguous: boolean
  /** Buffered ranges as [start, end] pairs, in order. */
  ranges: ReadonlyArray<readonly [number, number]>
  /** buffered.end(last) - buffered.start(0). */
  bufferedDuration: number
  /** Sum of the fragments' own durations, as measured individually. */
  expectedDuration: number
  /** bufferedDuration - expectedDuration; accumulated encoder delay/padding. */
  drift: number
  /** For a gapped buffer, the 1-based fragment boundaries the gaps fall at. */
  gapsAtBoundaries: readonly number[]
}

/**
 * How far a gap may sit from a fragment boundary and still be attributed to it.
 *
 * Mapping a gap to a boundary is a JUDGEMENT, not a fact: real drift means a
 * gap never opens exactly on a cumulative sum of the fragment durations. MP3
 * encoder delay plus padding runs to roughly 1100 + 576 samples per fragment —
 * about 38 ms at 44.1 kHz — so across all eight fragments the accumulated skew
 * stays well under half a second, while the fragments themselves run about
 * twenty seconds each. A 0.5 s window therefore covers every plausible drift
 * and can never reach the NEXT boundary, which sits ~20 s away; there is no
 * ambiguous case in between.
 *
 * A gap landing outside the window of every boundary is deliberately left
 * UNNAMED rather than snapped to the nearest one — naming a boundary ten
 * seconds away would invent a fact. `ranges` still carries every gap verbatim,
 * so nothing is lost: when `gapsAtBoundaries.length < ranges.length - 1`, some
 * gap could not be attributed and `ranges` is the ground truth to read.
 */
const GAP_BOUNDARY_TOLERANCE_SECONDS = 0.5

const EMPTY_RANGES: ReadonlyArray<readonly [number, number]> = []

export function buildSeamReport(
  buffered: TimeRanges,
  fragmentDurations: readonly number[],
): SeamReport {
  const expectedDuration = fragmentDurations.reduce((total, duration) => total + duration, 0)

  // `length` is read before any index: a real TimeRanges throws IndexSizeError
  // outside [0, length), and an empty buffer is a normal state here (nothing
  // appended yet), not an error.
  const rangeCount = buffered?.length ?? 0
  if (rangeCount === 0) {
    return {
      contiguous: false,
      ranges: EMPTY_RANGES,
      bufferedDuration: 0,
      expectedDuration,
      drift: 0 - expectedDuration,
      gapsAtBoundaries: [],
    }
  }

  const ranges: Array<readonly [number, number]> = []
  for (let index = 0; index < rangeCount; index += 1) {
    ranges.push([buffered.start(index), buffered.end(index)] as const)
  }

  const origin = ranges[0][0]
  const bufferedDuration = ranges[ranges.length - 1][1] - origin

  return {
    contiguous: ranges.length === 1,
    ranges,
    bufferedDuration,
    expectedDuration,
    drift: bufferedDuration - expectedDuration,
    gapsAtBoundaries: findGapBoundaries(ranges, fragmentDurations, origin),
  }
}

/**
 * Names the 1-based fragment boundary each gap falls at.
 *
 * A gap between range i and range i+1 opens where playback would stop, at
 * `end(i)`. Boundary k is the join after fragment k, at the cumulative duration
 * of the first k fragments — measured from the buffer's own origin, since a
 * SourceBuffer need not start at zero. Only boundaries 1..n-1 are joins; the
 * end of the last fragment is the end of the buffer, not a seam.
 */
function findGapBoundaries(
  ranges: ReadonlyArray<readonly [number, number]>,
  fragmentDurations: readonly number[],
  origin: number,
): readonly number[] {
  const cumulative: number[] = []
  let running = 0
  for (let index = 0; index < fragmentDurations.length - 1; index += 1) {
    running += fragmentDurations[index]
    cumulative.push(running)
  }
  if (cumulative.length === 0) return []

  const boundaries: number[] = []
  for (let index = 0; index < ranges.length - 1; index += 1) {
    const gapStart = ranges[index][1] - origin

    let nearest = -1
    let nearestDistance = Number.POSITIVE_INFINITY
    for (let k = 0; k < cumulative.length; k += 1) {
      const distance = Math.abs(gapStart - cumulative[k])
      if (distance < nearestDistance) {
        nearestDistance = distance
        nearest = k + 1
      }
    }

    // Outside the window the gap stays unnamed; see the tolerance comment.
    if (nearest > 0 && nearestDistance <= GAP_BOUNDARY_TOLERANCE_SECONDS) {
      if (!boundaries.includes(nearest)) boundaries.push(nearest)
    }
  }

  return boundaries
}
