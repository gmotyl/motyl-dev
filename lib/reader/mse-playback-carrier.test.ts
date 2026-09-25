import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  READER_LOG_FLAG,
  clearReaderLog,
  readReaderLog,
  type ReaderLogEntry,
  type ReaderLogEventType,
} from '@/lib/reader/diagnostic-log'
import { createMsePlaybackCarrier } from '@/lib/reader/mse-playback-carrier'

/**
 * jsdom has no MediaSource, no SourceBuffer and no TimeRanges, so the whole MSE
 * surface is faked here — the same strictness `mse-carrier.test.ts` uses, plus
 * the one thing that file did not need: a buffer whose `buffered` range GROWS
 * as appends land.
 *
 * That growth is load-bearing for this suite. The carrier sizes each unit's
 * span from the range the append actually gained, not from the nominal duration
 * it was handed, so the fake's gains are set to numbers the nominal durations
 * never mention — an implementation that chains nominal durations produces a
 * different timeline and fails here instead of passing against a fake that
 * never contradicts it.
 */
function fakeTimeRanges(ranges: ReadonlyArray<readonly [number, number]>): TimeRanges {
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
/** Used once `appendGains` runs out, so a test that does not care need not care. */
const DEFAULT_APPEND_GAIN = 10
/**
 * Whole `buffered` layouts for the next appends, consumed in order; `null`
 * defers to the growing-single-range model above.
 *
 * A real `SourceBuffer` is GAPPED whenever eviction takes a bite out of the
 * middle or the front, and then "where the next append landed" is the LAST
 * range's end, not the first's. The gain model can never produce that shape, so
 * an entry here states the layout the append leaves behind directly.
 */
let appendRanges: (ReadonlyArray<readonly [number, number]> | null)[] = []

class FakeSourceBuffer extends EventTarget {
  updating = false
  timestampOffset = 0
  buffered: TimeRanges = fakeTimeRanges([])
  /** Byte lengths reaching the buffer, in the order they arrived. */
  readonly accepted: number[] = []
  /** End of the single buffered range; 0 means nothing has been ingested. */
  private bufferedEnd = 0

  appendBuffer = vi.fn((data: BufferSource) => {
    if (this.updating) {
      throw new DOMException('appendBuffer called while updating', 'InvalidStateError')
    }
    this.accepted.push(data.byteLength)
    this.updating = true

    const layout = appendRanges.length > 0 ? appendRanges.shift()! : null
    const gain =
      layout !== null
        ? 0
        : appendGains.length > 0
          ? (appendGains.shift() as number)
          : DEFAULT_APPEND_GAIN
    // A real buffer ingests asynchronously and its `buffered` range only covers
    // the new media once `updateend` fires. Growing it here, on the same tick as
    // the event, is what lets the carrier measure the append.
    setTimeout(() => {
      if (layout !== null) {
        this.bufferedEnd = layout.length > 0 ? layout[layout.length - 1][1] : 0
        this.buffered = fakeTimeRanges(layout)
      } else {
        this.bufferedEnd += gain
        this.buffered = fakeTimeRanges(this.bufferedEnd > 0 ? [[0, this.bufferedEnd]] : [])
      }
      this.updating = false
      this.dispatchEvent(new Event('updateend'))
    }, 0)
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
let revokedUrls: string[] = []
/** Which MediaSource each object URL wraps, so the element can open the right one. */
let sourceOfUrl = new Map<string, FakeMediaSource>()

const originalCreateObjectURL = URL.createObjectURL
const originalRevokeObjectURL = URL.revokeObjectURL

/**
 * The element is a RECORDING fake, as in `src-swap-carrier.test.ts`.
 *
 * Every criterion here is about what the carrier does *to* the element, and the
 * ones that matter most are "does not happen" criteria — no `src`, no `play()`
 * at a seek. Those can only be asserted against something that records every
 * touch; a real element would answer "src is unchanged" for an implementation
 * that called `load()` or `pause()` on the way past.
 *
 * Assigning a `blob:` URL that wraps a MediaSource OPENS that source on the next
 * tick, which is what a browser does when it loads the object URL. Without that
 * the carrier's appends would wait on `sourceopen` forever — so an
 * implementation that never assigns the element's source hangs here rather than
 * quietly passing.
 */
interface RecordingElement {
  node: HTMLAudioElement
  /** Every interaction the carrier had with the element, in order. */
  touches: string[]
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
  return { node: node as unknown as HTMLAudioElement, touches }
}

/**
 * A prepared unit with recognisable bytes and NO measurable duration.
 *
 * `useTTS` hands every unit `duration: 0` — nothing in the reader decodes the
 * media — so this is the production shape, and a carrier that leaned on the
 * nominal duration would give every unit a zero-length span in real use.
 */
const unit = (index: number, duration = 0) => ({
  index,
  data: new Uint8Array([index, index, index]).buffer,
  duration,
})

const entriesOfType = (type: ReaderLogEventType): ReaderLogEntry[] =>
  readReaderLog().filter((entry) => entry.type === type)

const detailsOfType = (type: ReaderLogEventType): string[] =>
  entriesOfType(type).map((entry) => entry.detail ?? '')

beforeEach(() => {
  created = []
  createdUrls = []
  revokedUrls = []
  sourceOfUrl = new Map()
  appendGains = []
  appendRanges = []
  FakeMediaSource.isTypeSupported.mockClear().mockReturnValue(true)
  URL.createObjectURL = vi.fn((object: MediaSource | Blob) => {
    const url = `blob:mse-playback/${createdUrls.length}`
    createdUrls.push(url)
    if (object instanceof FakeMediaSource) sourceOfUrl.set(url, object)
    return url
  }) as unknown as typeof URL.createObjectURL
  URL.revokeObjectURL = vi.fn((url: string) => {
    revokedUrls.push(url)
  }) as unknown as typeof URL.revokeObjectURL
  vi.stubGlobal('MediaSource', FakeMediaSource)
  window.localStorage.clear()
  // The log is flag-gated like every other reader event; without this the
  // "the reason is recorded" assertions would pass vacuously against an empty
  // buffer.
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

/** Carrier attached to a recording element — the only configuration there is. */
const attached = () => {
  const element = createRecordingElement()
  const carrier = createMsePlaybackCarrier()
  carrier.attach(element.node)
  return { carrier, element }
}

const srcTouches = (element: RecordingElement): string[] =>
  element.touches.filter((touch) => touch.startsWith('src='))

describe('mse playback carrier', () => {
  it('assigns the element source exactly once for a timeline', async () => {
    const { carrier, element } = attached()
    appendGains = [4, 5, 6]

    await carrier.appendUnits([unit(0), unit(1)], { continueTimeline: false })
    await carrier.appendUnits([unit(2)], { continueTimeline: true })

    // ONE MediaSource, ONE assignment. The assignment is the only moment at
    // which the OS can revoke the page's media status, so a second one for the
    // same timeline is the whole bug this carrier exists to remove.
    expect(created).toHaveLength(1)
    expect(srcTouches(element)).toEqual([`src=${createdUrls[0]}`])
    expect(element.touches).not.toContain('play')

    // The positive control: the bytes really reached the buffer, and the spans
    // follow the range the buffer GAINED — not the nominal durations, which are
    // all 0 here exactly as `useTTS` sends them.
    expect(created[0].sourceBuffer.accepted).toEqual([3, 3, 3])
    expect(carrier.timeline().startOf(0)).toBe(0)
    expect(carrier.timeline().startOf(1)).toBe(4)
    expect(carrier.timeline().startOf(2)).toBe(9)
    expect(carrier.timeline().end()).toBe(15)
  })

  it('creates no new MediaSource when continuing a timeline', async () => {
    const { carrier } = attached()
    appendGains = [4, 5, 6]

    await carrier.appendUnits([unit(0)], { continueTimeline: false })
    await carrier.appendUnits([unit(1)], { continueTimeline: true })

    expect(created).toHaveLength(1)
    // …and it really EXTENDED: a continuation that dropped the unit on the
    // floor would also create no MediaSource.
    expect(carrier.timeline().startOf(0)).toBe(0)
    expect(carrier.timeline().startOf(1)).toBe(4)

    // The control in the other direction. Without it an implementation that
    // ignores the flag entirely — one source, always — passes the assertions
    // above. `continueTimeline: false` on a timeline that already holds units
    // is a restart, and a restart needs its own MediaSource.
    await carrier.appendUnits([unit(2)], { continueTimeline: false })
    expect(created).toHaveLength(2)
    expect(carrier.timeline().startOf(0)).toBeNull()
    expect(carrier.timeline().startOf(2)).toBe(0)
  })

  it('seeks without assigning src or calling play', async () => {
    const { carrier, element } = attached()
    appendGains = [4, 5]

    await carrier.appendUnits([unit(0), unit(1)], { continueTimeline: false })
    element.touches.length = 0

    carrier.seekToUnit(1)

    // The playhead moved to where unit 1 begins, and NOTHING else happened.
    // Both halves matter: the move is what advances the reader, and the silence
    // around it is what keeps the OS media exemption — a `src` assignment or a
    // `play()` here is the boundary the whole design removes.
    expect(element.node.currentTime).toBe(4)
    expect(element.node.currentTime).toBe(carrier.timeline().startOf(1))
    expect(element.touches).toEqual(['currentTime=4'])
    expect(element.node.play).not.toHaveBeenCalled()
    expect(element.node.src).toBe(createdUrls[0])
  })

  it('clamps a seek into removed media to the oldest retained unit', async () => {
    const { carrier, element } = attached()
    appendGains = [4, 5, 6]

    await carrier.appendUnits([unit(0), unit(1), unit(2)], { continueTimeline: false })
    // What `SourceBuffer.remove` leaves behind: unit 0's media is gone, and the
    // survivors keep their absolute starts.
    carrier.timeline().dropBefore(4)
    element.touches.length = 0

    carrier.seekToUnit(0)

    expect(carrier.timeline().oldest()?.index).toBe(1)
    expect(element.node.currentTime).toBe(4)
    expect(element.touches).toEqual(['currentTime=4'])

    // The control: a unit that is still there is seeked to on its own terms,
    // not clamped. An implementation that always clamps passes the assertions
    // above.
    carrier.seekToUnit(2)
    expect(element.node.currentTime).toBe(9)
  })

  it('refuses a seek when nothing is retained', async () => {
    const { carrier, element } = attached()
    appendGains = [4, 5]

    await carrier.appendUnits([unit(0), unit(1)], { continueTimeline: false })
    carrier.seekToUnit(1)
    element.touches.length = 0
    clearReaderLog()

    // Everything evicted. `end()` does NOT rewind — it is a monotonic append
    // point — so the timeline reports a non-empty span with no span left in it,
    // and `oldest()` has no answer to clamp to.
    carrier.timeline().dropBefore(1_000)
    expect(carrier.timeline().oldest()).toBeNull()
    expect(carrier.timeline().end()).toBe(9)

    carrier.seekToUnit(0)

    // The playhead stays where it is and the refusal is recorded. Any invented
    // target here is a seek into a hole; `currentTime = null` would be worse
    // still, since the element coerces it to 0 and starts reading media that
    // was evicted.
    expect(element.touches).toEqual([])
    expect(element.node.currentTime).toBe(4)
    expect(detailsOfType('reader-error')).toEqual(['0: seek refused: no media retained'])
  })

  it('clears the element src and rebuilds on rebuild()', async () => {
    const { carrier, element } = attached()
    appendGains = [4, 5]

    await carrier.appendUnits([unit(0), unit(1)], { continueTimeline: false })
    element.touches.length = 0

    carrier.rebuild()

    // The old source is DEAD — its object URL is revoked — so unlike the
    // src-swap carrier the element cannot be left pointing at it. Clearing and
    // re-pointing is the only honest teardown.
    expect(revokedUrls).toEqual([createdUrls[0]])
    expect(element.touches).toEqual(['src=', `src=${createdUrls[1]}`])
    expect(created).toHaveLength(2)
    expect(carrier.timeline().startOf(0)).toBeNull()
    expect(carrier.timeline().end()).toBe(0)

    // …and the fresh source is usable: the next timeline starts at zero on it.
    appendGains = [7]
    await carrier.appendUnits([unit(5)], { continueTimeline: true })
    expect(created).toHaveLength(2)
    expect(created[1].sourceBuffer.accepted).toEqual([3])
    expect(carrier.timeline().startOf(5)).toBe(0)
  })

  it('appends an unmeasurable unit without giving it a span', async () => {
    const { carrier, element } = attached()
    // The middle append lands in the buffer but gains it nothing.
    appendGains = [4, 0, 6]

    await carrier.appendUnits([unit(0), unit(1), unit(2)], { continueTimeline: false })

    // Appended — the bytes went to the buffer like any other unit.
    expect(created[0].sourceBuffer.accepted).toEqual([3, 3, 3])
    // …but it occupies no time, so the unit after it starts where it does and
    // no lookup ever resolves to it. A guessed span would shift every later
    // unit by its error for the rest of the run.
    expect(carrier.timeline().startOf(1)).toBe(4)
    expect(carrier.timeline().startOf(2)).toBe(4)
    expect(carrier.timeline().unitAt(4)?.index).toBe(2)
    expect(carrier.timeline().end()).toBe(10)

    // And the reason is recorded rather than lost: a zero-length unit is the
    // one thing in this carrier that silently mis-seats every later position.
    expect(detailsOfType('reader-error')).toEqual(['1: duration unmeasurable, counted as 0'])
    expect(element.touches).not.toContain('play')
  })

  it('normalises an unmeasurable nominal duration instead of poisoning the timeline', async () => {
    const { carrier } = attached()
    // The buffer never grows, so every span falls back to the nominal duration
    // the caller supplied — which is where NaN and Infinity get in.
    appendGains = [0, 0, 0]

    await carrier.appendUnits(
      [unit(0, Number.NaN), unit(1, Number.POSITIVE_INFINITY), unit(2, 5)],
      { continueTimeline: false }
    )

    // `HTMLMediaElement.duration` is NaN before metadata loads and Infinity for
    // an unbounded stream. Either one reaches `UnitTimeline.push` unclamped and
    // poisons `end()` — and therefore every later `startOf` — permanently.
    expect(carrier.timeline().end()).toBe(5)
    expect(carrier.timeline().startOf(0)).toBe(0)
    expect(carrier.timeline().startOf(1)).toBe(0)
    expect(carrier.timeline().startOf(2)).toBe(0)
    expect(detailsOfType('reader-error')).toEqual([
      '0: duration unmeasurable, counted as 0',
      '1: duration unmeasurable, counted as 0',
      // Unit 2's span is the ONE number on this timeline that the buffer never
      // reported, so the substitution is recorded as loudly as a failure is.
      '2: buffer reported no ranges, counted nominal 5',
    ])
  })

  it('trusts a measured gain of zero over a non-zero nominal duration', async () => {
    const { carrier } = attached()
    // Unit 1's append lands in a buffer that ALREADY has ranges and gains it
    // nothing. The buffer has spoken — and it said zero.
    appendGains = [10, 0, 6]

    await carrier.appendUnits([unit(0), unit(1, 3), unit(2)], { continueTimeline: false })

    // The nominal 3 is NOT substituted. Substituting it would seat unit 2 at 13
    // and leave `end()` at 19 while the buffer really ends at 16 — a permanent
    // three-second mis-location of every later unit, and the only error in this
    // module that compounds instead of being re-anchored by the next append.
    expect(carrier.timeline().startOf(0)).toBe(0)
    expect(carrier.timeline().startOf(1)).toBe(10)
    expect(carrier.timeline().startOf(2)).toBe(10)
    expect(carrier.timeline().end()).toBe(16)
    // The telescoping property itself: the spans sum to the buffer's real end.
    expect(created[0].sourceBuffer.buffered.end(0)).toBe(carrier.timeline().end())

    // And it is not silent — a unit that was counted as 0 says so.
    expect(detailsOfType('reader-error')).toEqual(['1: duration unmeasurable, counted as 0'])
  })

  it('measures the gain from the last buffered range, not the first', async () => {
    const { carrier } = attached()
    // Unit 0 fills [0, 10]. Unit 1's append evicts the middle and lands after
    // the hole; unit 2 extends the tail. The FIRST range shrinks while the
    // append point only ever moves forward.
    appendGains = [10]
    appendRanges = [
      null,
      [
        [0, 6],
        [10, 16],
      ],
      [
        [0, 6],
        [10, 22],
      ],
    ]

    await carrier.appendUnits([unit(0), unit(1), unit(2)], { continueTimeline: false })

    // Reading `ranges[0]` instead would measure unit 1's gain as 6 − 10 = −4 and
    // unit 2's as 0, seating unit 2 at 10 with `end()` stuck at 10.
    expect(carrier.timeline().startOf(0)).toBe(0)
    expect(carrier.timeline().startOf(1)).toBe(10)
    expect(carrier.timeline().startOf(2)).toBe(16)
    expect(carrier.timeline().end()).toBe(22)
    expect(detailsOfType('reader-error')).toEqual([])
  })

  it('serialises overlapping appendUnits calls into the order the callers chose', async () => {
    const { carrier } = attached()
    appendGains = [4, 5, 6, 7]

    // The production shape: `prepareUnit` is async and fires per prefetch, so a
    // second batch is offered while the first is still in flight. Both promises
    // are started before either is awaited.
    const first = carrier.appendUnits([unit(0), unit(1)], { continueTimeline: false })
    const second = carrier.appendUnits([unit(2), unit(3)], { continueTimeline: true })
    await Promise.all([first, second])

    // Caller order, not interleaved arrival order — and the spans telescope onto
    // the buffer's absolute end, which only holds if each unit's `before` was
    // the previous unit's `after`.
    expect(carrier.timeline().startOf(0)).toBe(0)
    expect(carrier.timeline().startOf(1)).toBe(4)
    expect(carrier.timeline().startOf(2)).toBe(9)
    expect(carrier.timeline().startOf(3)).toBe(15)
    expect(carrier.timeline().end()).toBe(22)
    expect(created[0].sourceBuffer.buffered.end(0)).toBe(22)
    expect(created).toHaveLength(1)
  })

  it('refuses a seek to a unit that was never prepared', async () => {
    const { carrier, element } = attached()
    appendGains = [4, 5]

    await carrier.appendUnits([unit(0), unit(1)], { continueTimeline: false })
    carrier.seekToUnit(1)
    element.touches.length = 0
    clearReaderLog()

    carrier.seekToUnit(7)

    // A never-appended index is not an eviction, so clamping it would be an
    // invention: the reader would play unit 0's section while believing it is
    // reading unit 7. Refusing leaves the playhead where the caller can see it.
    expect(element.touches).toEqual([])
    expect(element.node.currentTime).toBe(4)
    expect(detailsOfType('reader-error')).toEqual(['7: seek refused: unit not prepared'])
  })

  it('reports every unit as failed when no element is attached', async () => {
    const carrier = createMsePlaybackCarrier()
    appendGains = [4, 5]

    // No `attach`: the source could never open, so every append would wait on
    // `sourceopen` forever. The call resolves instead, and says why per unit.
    await expect(
      carrier.appendUnits([unit(0), unit(1)], { continueTimeline: false })
    ).resolves.toBeUndefined()

    expect(created).toEqual([])
    expect(detailsOfType('append-failed')).toEqual([
      '0: no element attached',
      '1: no element attached',
    ])
    expect(carrier.timeline().end()).toBe(0)
  })

  it('revokes the URL and clears src on dispose', async () => {
    const { carrier, element } = attached()
    appendGains = [4]

    await carrier.appendUnits([unit(0)], { continueTimeline: false })
    expect(createdUrls).toHaveLength(1)

    carrier.dispose()

    // One element, one object URL, and a session that ends must not retain the
    // whole article's audio behind a URL nobody revoked.
    expect(revokedUrls).toEqual([createdUrls[0]])
    expect(element.node.src).toBe('')
    expect(element.touches.at(-1)).toBe('src=')
    expect(carrier.timeline().startOf(0)).toBeNull()
  })

  it('reports its kind as mse', async () => {
    const { carrier, element } = attached()
    appendGains = [4]

    expect(carrier.kind).toBe('mse')

    // And it means it. The kind is how the reader tells the two strategies
    // apart, so it is only worth anything if the carrier behind it really does
    // advance by moving the playhead — the one thing the src-swap kind cannot
    // do.
    await carrier.appendUnits([unit(0)], { continueTimeline: false })
    element.touches.length = 0
    carrier.seekToUnit(0)
    expect(element.touches).toEqual(['currentTime=0'])
  })

  it('appends a unit only once however often it is offered', async () => {
    const { carrier } = attached()
    appendGains = [4, 5]

    // The prefetch path appends a unit that the play path may append again. On
    // one continuous buffer a second append is not a wasted URL, it is the same
    // audio twice in the timeline.
    await carrier.appendUnits([unit(0)], { continueTimeline: false })
    await carrier.appendUnits([unit(0), unit(1)], { continueTimeline: true })

    expect(created[0].sourceBuffer.accepted).toEqual([3, 3])
    expect(carrier.timeline().startOf(0)).toBe(0)
    expect(carrier.timeline().startOf(1)).toBe(4)
    expect(carrier.timeline().end()).toBe(9)
  })
})
