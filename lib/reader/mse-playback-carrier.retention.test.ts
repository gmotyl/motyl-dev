import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  READER_LOG_FLAG,
  clearReaderLog,
  readReaderLog,
  type ReaderLogEntry,
  type ReaderLogEventType,
} from '@/lib/reader/diagnostic-log'
import { RETAIN_SECONDS, createMsePlaybackCarrier } from '@/lib/reader/mse-playback-carrier'

/**
 * The retention window: what the carrier REMOVES from the buffer, and what it
 * must still be able to play afterwards.
 *
 * It sits beside `mse-playback-carrier.test.ts` rather than inside it because
 * the fake it needs is a different fake. That suite's `SourceBuffer` only ever
 * grows — it was built for a carrier that removed nothing — and every
 * criterion here is about a buffer that SHRINKS between appends: the ranges
 * move, `updating` goes true for a reason other than an append, and the
 * timeline has to stay in step with both.
 *
 * ## The fake is strict in the direction of the hazard
 *
 * `remove()` sets `updating` exactly as `appendBuffer` does, and calling either
 * while the buffer is updating is an `InvalidStateError`. So the fake throws on
 * both, and records `updating` as each `remove` FOUND it — an implementation
 * that issues a removal beside the append queue is then caught by evidence the
 * test can print, not merely by an absence.
 */
type Range = [number, number]

function fakeTimeRanges(ranges: ReadonlyArray<Range>): TimeRanges {
  const guard = (index: number) => {
    if (!Number.isInteger(index) || index < 0 || index >= ranges.length) {
      throw new DOMException(`Index ${index} is out of range`, 'IndexSizeError')
    }
  }
  return {
    get length() {
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
  } as TimeRanges
}

/** Seconds the next appends add to the buffered range, consumed in order. */
let appendGains: number[] = []
/**
 * One unit of speech, as this suite counts it.
 *
 * A hundred seconds is nothing like a real speech unit — but the retention
 * window is 600 REAL seconds and the tests may not shrink it, so the units have
 * to be big enough that a handful of them carry the playhead past it. Six units
 * is one window exactly, which keeps every expected boundary in the tests a
 * number a reader can check by hand.
 */
const DEFAULT_APPEND_GAIN = 100
/**
 * How many of the next `remove` calls are refused before one is let through.
 *
 * A real buffer refuses synchronously — `remove` throws and no update ever
 * begins — so a refusal is indistinguishable from the InvalidStateError the
 * fake already models, except that the test chooses when it happens.
 */
let removeFailures = 0

class FakeSourceBuffer extends EventTarget {
  updating = false
  timestampOffset = 0
  buffered: TimeRanges = fakeTimeRanges([])
  /** Byte lengths reaching the buffer, in the order they arrived. */
  readonly accepted: number[] = []
  /** `updating` as each `remove` call found it — the AC-3 evidence. */
  readonly updatingAtRemove: boolean[] = []
  /** The model `buffered` is published from. */
  private ranges: Range[] = []

  /** The buffered ranges as the element would see them. */
  rangesNow(): Range[] {
    return this.ranges.map(([start, end]): Range => [start, end])
  }

  /**
   * Applies an update on the next tick, as a real buffer does: `updating` stays
   * true until `updateend`, which is the only moment `buffered` may be read as
   * covering the change.
   */
  private settle(apply: () => void): void {
    setTimeout(() => {
      apply()
      this.buffered = fakeTimeRanges(this.rangesNow())
      this.updating = false
      this.dispatchEvent(new Event('updateend'))
    }, 0)
  }

  appendBuffer = vi.fn((data: BufferSource) => {
    if (this.updating) {
      throw new DOMException('appendBuffer called while updating', 'InvalidStateError')
    }
    this.accepted.push(data.byteLength)
    this.updating = true

    const gain = appendGains.length > 0 ? (appendGains.shift() as number) : DEFAULT_APPEND_GAIN
    this.settle(() => {
      // Contiguous, as the spike measured on a device: consecutive MP3
      // fragments fuse into ONE range, so an append extends the tail and never
      // rewinds it — which is exactly what a front removal must not disturb.
      if (this.ranges.length === 0) this.ranges = [[0, gain]]
      else this.ranges[this.ranges.length - 1][1] += gain
    })
  })

  remove = vi.fn((start: number, end: number) => {
    this.updatingAtRemove.push(this.updating)
    if (this.updating) {
      throw new DOMException('remove called while updating', 'InvalidStateError')
    }
    if (removeFailures > 0) {
      removeFailures -= 1
      // Nothing is set updating and nothing is scheduled: a synchronous refusal
      // means no update began, so no `updateend` is ever coming for this call.
      throw new DOMException('remove refused', 'InvalidStateError')
    }
    this.updating = true

    this.settle(() => {
      const kept: Range[] = []
      for (const [rangeStart, rangeEnd] of this.ranges) {
        // Wholly inside the removed span: gone.
        if (rangeStart >= start && rangeEnd <= end) continue
        // Straddling the cut: the front goes, the END STAYS — the property the
        // carrier's span measurement rests on.
        if (rangeStart < end && rangeEnd > end) kept.push([end, rangeEnd])
        else kept.push([rangeStart, rangeEnd])
      }
      this.ranges = kept
    })
  })
}

class FakeMediaSource extends EventTarget {
  static isTypeSupported = vi.fn(() => true)

  readyState: 'closed' | 'open' | 'ended' = 'closed'
  readonly sourceBuffer = new FakeSourceBuffer()
  addSourceBuffer = vi.fn(() => {
    if (this.readyState !== 'open') {
      throw new DOMException('addSourceBuffer before sourceopen', 'InvalidStateError')
    }
    return this.sourceBuffer as unknown as SourceBuffer
  })
  endOfStream = vi.fn(() => {
    this.readyState = 'ended'
  })

  /** What the element does once the object URL is attached. */
  open(): void {
    if (this.readyState !== 'closed') return
    this.readyState = 'open'
    this.dispatchEvent(new Event('sourceopen'))
  }

  constructor() {
    super()
    created.push(this)
  }
}

let created: FakeMediaSource[] = []
let createdUrls: string[] = []
/** Which MediaSource each object URL wraps, so the element can open the right one. */
let sourceOfUrl = new Map<string, FakeMediaSource>()

const originalCreateObjectURL = URL.createObjectURL
const originalRevokeObjectURL = URL.revokeObjectURL

interface RecordingElement {
  node: HTMLAudioElement
  /** Every interaction the carrier had with the element, in order. */
  touches: string[]
  /** Moves the playhead the way playback would, without recording a touch. */
  playTo(time: number): void
}

const createRecordingElement = (): RecordingElement => {
  const touches: string[] = []
  let src = ''
  let currentTime = 0
  const node = {
    get src() {
      return src
    },
    set src(value: string) {
      src = value
      touches.push(`src=${value}`)
      const source = sourceOfUrl.get(value)
      if (source) setTimeout(() => source.open(), 0)
    },
    get currentTime() {
      return currentTime
    },
    set currentTime(value: number) {
      currentTime = value
      touches.push(`currentTime=${value}`)
    },
    play: vi.fn(() => {
      touches.push('play')
      return Promise.resolve()
    }),
    pause: vi.fn(() => {
      touches.push('pause')
    }),
    load: vi.fn(() => {
      touches.push('load')
    }),
    removeAttribute: vi.fn((name: string) => {
      touches.push(`removeAttribute(${name})`)
    }),
  }
  return {
    node: node as unknown as HTMLAudioElement,
    touches,
    // The element advances its own `currentTime` while it plays, and nothing in
    // the carrier sees that as a touch. Going through the setter here would put
    // `currentTime=` lines in `touches` that the carrier never wrote, and the
    // seek assertions read that list.
    playTo: (time: number) => {
      currentTime = time
    },
  }
}

/** A prepared unit with recognisable bytes and NO measurable duration. */
const unit = (index: number, duration = 0) => ({
  index,
  data: new Uint8Array([index, index, index]).buffer,
  duration,
})

const entriesOfType = (type: ReaderLogEventType): ReaderLogEntry[] =>
  readReaderLog().filter((entry) => entry.type === type)

const detailsOfType = (type: ReaderLogEventType): string[] =>
  entriesOfType(type).map((entry) => entry.detail ?? '')

/**
 * Runs the macrotask queue out.
 *
 * A removal issued from the append path is deliberately NOT awaited by
 * `appendUnits` — see the carrier — so `await appendUnits(...)` can return
 * while `remove` is still in flight. Everything the buffer does lands on a
 * `setTimeout(…, 0)`, so a few turns of the macrotask queue settle all of it.
 */
const settle = async (): Promise<void> => {
  for (let turn = 0; turn < 5; turn += 1) {
    await new Promise((resolve) => setTimeout(resolve, 0))
  }
}

beforeEach(() => {
  created = []
  createdUrls = []
  sourceOfUrl = new Map()
  appendGains = []
  removeFailures = 0
  FakeMediaSource.isTypeSupported.mockClear().mockReturnValue(true)
  URL.createObjectURL = vi.fn((object: MediaSource | Blob) => {
    const url = `blob:mse-retention/${createdUrls.length}`
    createdUrls.push(url)
    if (object instanceof FakeMediaSource) sourceOfUrl.set(url, object)
    return url
  }) as unknown as typeof URL.createObjectURL
  URL.revokeObjectURL = vi.fn(() => {}) as unknown as typeof URL.revokeObjectURL
  vi.stubGlobal('MediaSource', FakeMediaSource)
  window.localStorage.clear()
  window.localStorage.setItem(READER_LOG_FLAG, '1')
  clearReaderLog()
})

afterEach(() => {
  URL.createObjectURL = originalCreateObjectURL
  URL.revokeObjectURL = originalRevokeObjectURL
  window.localStorage.clear()
  clearReaderLog()
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

const attached = () => {
  const element = createRecordingElement()
  const carrier = createMsePlaybackCarrier()
  carrier.attach(element.node)
  return { carrier, element, buffer: () => created[0].sourceBuffer }
}

/** Units 0..count-1, each one `DEFAULT_APPEND_GAIN` long. */
const units = (count: number, from = 0) =>
  Array.from({ length: count }, (_, offset) => unit(from + offset))

describe('mse playback carrier retention', () => {
  it('removes media older than the retention window', async () => {
    const { carrier, element, buffer } = attached()

    // Six units is exactly one window, so nothing is behind it yet.
    await carrier.appendUnits(units(6), { continueTimeline: false })
    await settle()
    expect(RETAIN_SECONDS).toBe(600)
    expect(buffer().rangesNow()).toEqual([[0, 600]])
    // The control that matters most: a carrier that trims on every append —
    // or one that trims from `currentTime` rather than from the window — has
    // already called `remove` by here.
    expect(buffer().remove).not.toHaveBeenCalled()

    element.playTo(750)
    await carrier.appendUnits([unit(6)], { continueTimeline: true })
    await settle()

    // 750 − 600 = 150 falls inside unit 1, so the cut goes to unit 1's START.
    // Trimming at 150 would leave the oldest RETAINED unit half-evicted and
    // `oldest()` would name a position with no media under it.
    expect(buffer().remove.mock.calls).toEqual([[0, 100]])
    expect(buffer().rangesNow()).toEqual([[100, 700]])
    // …and it kept at least the window: 700 − 100 ≥ RETAIN_SECONDS.
    expect(buffer().rangesNow()[0][1] - buffer().rangesNow()[0][0]).toBeGreaterThanOrEqual(
      RETAIN_SECONDS
    )

    // THE TELESCOPING INVARIANT, under removal. A front eviction leaves the
    // LAST range's end alone, which is the only reading `spanFor` takes — so
    // the spans still sum to the buffer's absolute end and `timeline.end()` is
    // still the append point.
    expect(buffer().buffered.end(0)).toBe(carrier.timeline().end())
    expect(carrier.timeline().startOf(6)).toBe(600)
    expect(detailsOfType('append-failed')).toEqual([])
  })

  it('drops the same boundary from the timeline', async () => {
    const { carrier, element, buffer } = attached()

    await carrier.appendUnits(units(6), { continueTimeline: false })
    element.playTo(750)
    await carrier.appendUnits([unit(6)], { continueTimeline: true })
    await settle()

    // The map lost exactly what the buffer lost. Unit 0 is gone from both; unit
    // 1 is the oldest thing either of them still holds, and they agree on where
    // it begins — map and buffer in step is the whole point of pairing
    // `dropBefore` with `remove`.
    expect(carrier.timeline().startOf(0)).toBeNull()
    expect(carrier.timeline().startOf(1)).toBe(100)
    expect(carrier.timeline().oldest()?.index).toBe(1)
    expect(carrier.timeline().oldest()?.start).toBe(buffer().rangesNow()[0][0])
    expect(buffer().remove.mock.calls).toEqual([[0, 100]])

    // The append point does NOT rewind on a drop: unit 7 lands after everything
    // ever appended, not after everything still retained.
    expect(carrier.timeline().end()).toBe(700)
    await carrier.appendUnits([unit(7)], { continueTimeline: true })
    await settle()
    expect(carrier.timeline().startOf(7)).toBe(700)
    expect(buffer().rangesNow()).toEqual([[100, 800]])
  })

  it('never calls remove while the buffer is updating', async () => {
    const { carrier, element, buffer } = attached()

    await carrier.appendUnits(units(6), { continueTimeline: false })
    await settle()
    element.playTo(750)

    // The production shape of the hazard. `appendUnits` re-offers units the
    // prefetch path already appended, so a call can reach the retention step
    // with no append of its own to wait for — twice in a row, before the first
    // removal's `updateend` has fired. The second removal therefore meets a
    // buffer that is ALREADY updating, and only a queue can save it.
    const first = carrier.appendUnits([unit(0)], { continueTimeline: true })
    const second = carrier.appendUnits([unit(1)], { continueTimeline: true })
    await Promise.all([first, second])
    await settle()

    // Both removals really happened — without this the assertion below passes
    // against a carrier that removes nothing at all.
    expect(buffer().remove.mock.calls).toEqual([
      [0, 100],
      [0, 100],
    ])
    // …and neither found the buffer busy. A removal issued beside the append
    // queue reaches the second call with `updating` true, which is the
    // InvalidStateError that stops a real SourceBuffer for good.
    expect(buffer().updatingAtRemove).toEqual([false, false])
    expect(detailsOfType('reader-error')).toEqual([])
    expect(buffer().rangesNow()).toEqual([[100, 600]])

    // The appends are the other half of the same guarantee: a removal in flight
    // must not let the next append through either.
    await carrier.appendUnits([unit(6)], { continueTimeline: true })
    await settle()
    expect(buffer().accepted).toEqual([3, 3, 3, 3, 3, 3, 3])
    expect(carrier.timeline().startOf(6)).toBe(600)
  })

  it('keeps the previous section reachable', async () => {
    const { carrier, element, buffer } = attached()

    // A section handoff: three units of the previous section, then three of the
    // new one on the SAME timeline.
    await carrier.appendUnits(units(3), { continueTimeline: false })
    await carrier.appendUnits(units(3, 3), { continueTimeline: true })
    element.playTo(550)
    await carrier.appendUnits([unit(5)], { continueTimeline: true })
    await settle()

    // `previoustrack` from the lock screen lands on the previous section, and
    // the window is sized so that unit is still THERE: seeked to exactly, not
    // clamped, with media under the position.
    element.touches.length = 0
    carrier.seekToUnit(0)
    expect(carrier.timeline().startOf(0)).toBe(0)
    expect(element.touches).toEqual(['currentTime=0'])
    expect(buffer().rangesNow()[0][0]).toBe(0)
    expect(buffer().remove).not.toHaveBeenCalled()
    expect(detailsOfType('reader-error')).toEqual([])

    // The control, one window further on: what falls out of the window really
    // does go, and the clamp target is still playable. Without this half, a
    // carrier that never removes anything passes everything above.
    await carrier.appendUnits(units(6, 6), { continueTimeline: true })
    await settle()
    element.playTo(1150)
    clearReaderLog()
    await carrier.appendUnits([unit(11)], { continueTimeline: true })
    await settle()

    expect(buffer().remove.mock.calls).toEqual([[0, 500]])
    element.touches.length = 0
    carrier.seekToUnit(0)

    // Clamped — and clamped ONTO MEDIA. `oldest()` names the start of a unit
    // that is still whole in the buffer, so the element plays instead of
    // stalling in a hole with `isPlaying` still true.
    expect(carrier.timeline().oldest()?.index).toBe(5)
    expect(carrier.timeline().oldest()?.start).toBe(buffer().rangesNow()[0][0])
    expect(element.touches).toEqual(['currentTime=500'])
    expect(detailsOfType('reader-error')).toEqual(['0: seek clamped to unit 5'])
  })

  it('logs a refused eviction as a reader error and keeps the session running', async () => {
    const { carrier, element, buffer } = attached()

    await carrier.appendUnits(units(6), { continueTimeline: false })
    await settle()
    element.playTo(750)

    removeFailures = 1
    await carrier.appendUnits([unit(6)], { continueTimeline: true })
    await settle()

    // The removal really was attempted and really was refused, so the media
    // that should have gone is simply still there.
    expect(buffer().remove.mock.calls).toEqual([[0, 100]])
    expect(buffer().rangesNow()).toEqual([[0, 700]])

    // THE DISCRIMINATION. A refused eviction is not a unit's failure: no audio
    // is missing, only memory that could not be reclaimed. Recording it as
    // `append-failed` would send a later reader hunting for a fragment that
    // arrived perfectly well — so it is a `reader-error`, and the unit's own
    // channel stays empty.
    expect(detailsOfType('reader-error')).toEqual([
      'eviction before 100 failed: InvalidStateError: remove refused',
    ])
    expect(detailsOfType('append-failed')).toEqual([])

    // …and the queue is still open. Unlike a refused append — which leaves the
    // buffer's contents unknowable and therefore stops the queue for good — a
    // failed memory reclaim must not cost the reading session: the next unit
    // still reaches the buffer and the timeline keeps growing past it.
    await carrier.appendUnits([unit(7)], { continueTimeline: true })
    await settle()
    expect(buffer().accepted).toEqual([3, 3, 3, 3, 3, 3, 3, 3])
    expect(carrier.timeline().startOf(7)).toBe(700)
    expect(detailsOfType('append-failed')).toEqual([])
  })

  it('re-issues a refused trim on the next append', async () => {
    const { carrier, element, buffer } = attached()

    await carrier.appendUnits(units(6), { continueTimeline: false })
    await settle()
    element.playTo(750)

    removeFailures = 1
    await carrier.appendUnits([unit(6)], { continueTimeline: true })
    await settle()
    expect(buffer().rangesNow()).toEqual([[0, 700]])

    // The trim is tied to the append, and appends keep coming for as long as
    // the session runs — so a transient refusal costs one append's worth of
    // retention and nothing more. The next append measures the buffer again,
    // finds the same media still in front of the boundary, and re-issues.
    clearReaderLog()
    await carrier.appendUnits([unit(7)], { continueTimeline: true })
    await settle()

    expect(buffer().remove.mock.calls).toEqual([
      [0, 100],
      [0, 100],
    ])
    // This time it landed: the buffer really is trimmed.
    expect(buffer().rangesNow()).toEqual([[100, 800]])
    expect(buffer().updatingAtRemove).toEqual([false, false])
    expect(detailsOfType('reader-error')).toEqual([])
    expect(detailsOfType('append-failed')).toEqual([])

    // Map and buffer are back in step — the drop that ran ahead of the refused
    // removal is exactly the one the successful removal caught up with.
    expect(carrier.timeline().oldest()?.index).toBe(1)
    expect(carrier.timeline().oldest()?.start).toBe(buffer().rangesNow()[0][0])
    expect(carrier.timeline().startOf(7)).toBe(700)
  })
})
