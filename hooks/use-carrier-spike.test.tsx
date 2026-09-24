import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { READER_LOG_FLAG, clearReaderLog, readReaderLog } from '@/lib/reader/diagnostic-log'
import type { SeamReport } from '@/lib/reader/seam-report'
import { SPIKE_FRAGMENTS } from '@/lib/reader/spike-fragments'

import { MSE_PLAY_RUNWAY, useCarrierSpike } from './use-carrier-spike'

/**
 * Every observable the acceptance criteria are written against, in the order it
 * happened. `play()` exactly once and `src` assigned once are ORDERING claims as
 * much as counting ones — "all eight appended BEFORE play" cannot be checked
 * from two separate counters — so one shared timeline carries them all.
 */
let timeline: string[] = []

/**
 * Fragment N synthesizes to `FRAGMENT_BASE_BYTES + N` bytes and speaks for
 * `FRAGMENT_BASE_SECONDS + N` seconds.
 *
 * The byte length is the fragment's IDENTITY through the parts of the code that
 * only ever see bytes: the blob the element is handed in `src-swap` names its
 * fragment, and so does the blob the duration probe loads. Distinct sizes are
 * what let the test say "this src is fragment 0 again" rather than "this is the
 * ninth src".
 */
const FRAGMENT_BASE_BYTES = 100
const FRAGMENT_BASE_SECONDS = 20

const fragmentCount = SPIKE_FRAGMENTS.length

const bytesFor = (index: number) => FRAGMENT_BASE_BYTES + index
const secondsFor = (index: number) => FRAGMENT_BASE_SECONDS + index

/** Inverse of `bytesFor`, for reading a fragment's identity back out of a blob URL. */
const fragmentOfSize = (size: number) => size - FRAGMENT_BASE_BYTES

/** Cumulative start time of fragment `n` of an endlessly repeating 0..7 run. */
const startOfNthAppend = (n: number): number => {
  let total = 0
  for (let i = 0; i < n; i += 1) total += secondsFor(i % fragmentCount)
  return total
}

const TOTAL_RUN_SECONDS = startOfNthAppend(fragmentCount)

// --- the synthesis pipeline ------------------------------------------------

const synthesizeSpeech = vi.fn(async (text: string, _options?: unknown) => {
  const index = SPIKE_FRAGMENTS.findIndex((fragment) => fragment.text === text)
  if (index < 0) throw new Error(`unexpected text handed to synthesizeSpeech: ${text.slice(0, 24)}`)
  return new ArrayBuffer(bytesFor(index))
})

vi.mock('@/lib/tts/client', () => ({
  synthesizeSpeech: (text: string, options?: unknown) => synthesizeSpeech(text, options),
}))

// --- the MSE carrier -------------------------------------------------------

interface RecordedAppend {
  index: number
  byteLength: number
  duration: number
}

let appends: RecordedAppend[] = []
let disposeCalls = 0
let carrierCount = 0

const CARRIER_SRC = 'blob:mse-carrier'

/**
 * The real carrier is committed and covered next door; here it is a spy that
 * records what the hook asked for. `report()` answers over exactly the appends
 * it accepted, so the upfront loop bounds the hook reads back are the ones this
 * test handed it.
 */
const makeCarrier = () => {
  carrierCount += 1
  return {
    src: CARRIER_SRC,
    append: vi.fn(async (index: number, data: ArrayBuffer, duration: number) => {
      appends.push({ index, byteLength: data.byteLength, duration })
      timeline.push(`append:${index}`)
    }),
    report: vi.fn((): SeamReport => {
      const expected = appends.reduce((total, entry) => total + entry.duration, 0)
      return {
        contiguous: true,
        ranges: appends.length > 0 ? [[0, expected] as const] : [],
        bufferedDuration: expected,
        contentDuration: expected,
        expectedDuration: expected,
        drift: 0,
        gapsAtBoundaries: [],
      }
    }),
    dispose: vi.fn(() => {
      disposeCalls += 1
    }),
  }
}

const isMseAudioSupported = vi.fn(() => true)
const createMseCarrier = vi.fn(makeCarrier)

vi.mock('@/lib/reader/mse-carrier', () => ({
  isMseAudioSupported: () => isMseAudioSupported(),
  createMseCarrier: () => createMseCarrier(),
}))

// --- the element -----------------------------------------------------------

/**
 * jsdom's HTMLMediaElement refuses playback and pins `currentTime`, so — as in
 * `use-playback-diagnostics.test.tsx` — the element is a bare EventTarget
 * carrying only what the hook touches. Everything the hook does with it is real:
 * listeners, dispatch, `paused`, `currentTime`, and a `src` setter that records
 * every assignment.
 */
class FakeAudioElement extends EventTarget {
  paused = true
  currentTime = 0
  duration = Number.NaN
  preload = ''
  readonly assignments: string[] = []

  private value = ''

  get src(): string {
    return this.value
  }

  set src(next: string) {
    this.value = next
    this.assignments.push(next)
    // Only the PLAYBACK element's sources belong on the timeline; the duration
    // probes are throwaway elements and their loads are not under test.
    if (elements[0] === this) timeline.push(`src:${next}`)
    // A real element reads the blob's metadata; the size encodes the fragment,
    // so the probe under test gets a real duration back through a real event.
    const match = /^blob:(\d+):/.exec(next)
    if (match) {
      this.duration = secondsFor(fragmentOfSize(Number(match[1])))
      queueMicrotask(() => this.dispatchEvent(new Event('loadedmetadata')))
    }
  }

  play = vi.fn(async () => {
    this.paused = false
    // Every duration probe is a media element, and the claim under test is that
    // none is built once a run is playing — so the population is frozen at the
    // first play() and compared against it afterwards.
    if (elementsAtPlay < 0) elementsAtPlay = elements.length
    timeline.push('play')
  })

  pause = vi.fn(() => {
    this.paused = true
  })

  load = vi.fn()
}

let elements: FakeAudioElement[] = []

/** How many `Audio` elements existed when `play()` was first called; -1 before that. */
let elementsAtPlay = -1

/**
 * The hook owns its element, so the first one constructed is the one it plays
 * through; later ones are the throwaway duration probes.
 */
const playbackElement = () => elements[0]

/** Moves playback to `seconds` and lets the element announce it, as a real one does. */
const playTo = async (seconds: number) => {
  const element = playbackElement()
  await act(async () => {
    element.currentTime = seconds
    element.dispatchEvent(new Event('timeupdate'))
  })
}

/** Ends the current fragment, the `src-swap` carrier's advance trigger. */
const endFragment = async () => {
  await act(async () => {
    playbackElement().dispatchEvent(new Event('ended'))
  })
}

// --- object URLs -----------------------------------------------------------

const originalCreateObjectURL = URL.createObjectURL
const originalRevokeObjectURL = URL.revokeObjectURL
const originalAudio = globalThis.Audio

let urlCounter = 0
const createObjectURL = vi.fn((object: Blob | MediaSource) => {
  const size = (object as Blob).size ?? 0
  urlCounter += 1
  return `blob:${size}:${urlCounter}`
})
const revokeObjectURL = vi.fn()

// --- log helpers -----------------------------------------------------------

const enable = () => window.localStorage.setItem(READER_LOG_FLAG, '1')

const entriesOfType = (type: string) => readReaderLog().filter((entry) => entry.type === type)

const playCalls = () => timeline.filter((step) => step === 'play').length

/** Every `src` the hook assigned to the PLAYBACK element, probes excluded. */
const playbackSrcAssignments = () => playbackElement().assignments

beforeEach(() => {
  timeline = []
  appends = []
  elements = []
  elementsAtPlay = -1
  disposeCalls = 0
  carrierCount = 0
  urlCounter = 0

  synthesizeSpeech.mockClear()
  createMseCarrier.mockClear().mockImplementation(makeCarrier)
  isMseAudioSupported.mockClear().mockReturnValue(true)
  createObjectURL.mockClear()
  revokeObjectURL.mockClear()

  URL.createObjectURL = createObjectURL as unknown as typeof URL.createObjectURL
  URL.revokeObjectURL = revokeObjectURL as unknown as typeof URL.revokeObjectURL

  // Replaced by assignment rather than vi.stubGlobal: the matching
  // vi.unstubAllGlobals() would also wipe vitest.setup.ts's ResizeObserver stub
  // for every later test in the run.
  ;(globalThis as unknown as { Audio: unknown }).Audio = class extends FakeAudioElement {
    constructor() {
      super()
      elements.push(this)
    }
  }

  window.localStorage.clear()
  clearReaderLog()
  enable()
})

afterEach(() => {
  URL.createObjectURL = originalCreateObjectURL
  URL.revokeObjectURL = originalRevokeObjectURL
  ;(globalThis as unknown as { Audio: unknown }).Audio = originalAudio
  vi.restoreAllMocks()
})

/** Renders the hook and selects `mode` before anything starts. */
const mount = async (mode: 'src-swap' | 'mse-upfront' | 'mse-progressive') => {
  const view = renderHook(() => useCarrierSpike())
  await act(async () => {
    view.result.current.setMode(mode)
  })
  return view
}

const start = async (view: Awaited<ReturnType<typeof mount>>) => {
  await act(async () => {
    await view.result.current.start()
  })
}

describe('useCarrierSpike', () => {
  it('calls play exactly once across a full mse-upfront run', async () => {
    const view = await mount('mse-upfront')
    await start(view)

    expect(playCalls()).toBe(1)

    // Walk the whole buffer, past its end, and round again. A carrier that
    // "nudges" a stalled element with a second play() dies right here.
    for (let n = 1; n <= fragmentCount; n += 1) {
      await playTo(startOfNthAppend(n))
    }
    await playTo(TOTAL_RUN_SECONDS)
    for (let n = 1; n <= fragmentCount; n += 1) {
      await playTo(startOfNthAppend(n))
    }

    // Guards the count above against passing because playback never advanced:
    // the buffer's end was actually reached, more than once, and each time the
    // run continued by seeking rather than by playing again.
    expect(
      entriesOfType('section-advance').filter((entry) => /loop/.test(entry.detail ?? '')).length,
    ).toBeGreaterThanOrEqual(2)
    expect(playCalls()).toBe(1)
  })

  it('calls play exactly once across a full mse-progressive run', async () => {
    const view = await mount('mse-progressive')
    await start(view)

    expect(playCalls()).toBe(1)

    // Two full passes of eight, so the fragment-0 seam is crossed for real.
    for (let n = 1; n <= fragmentCount * 2; n += 1) {
      await playTo(startOfNthAppend(n))
    }

    // Guards the count above against passing because the run stopped early.
    expect(appends.length).toBeGreaterThan(fragmentCount)
    expect(playCalls()).toBe(1)
  })

  it('never reassigns src in an MSE mode', async () => {
    for (const mode of ['mse-upfront', 'mse-progressive'] as const) {
      timeline = []
      appends = []
      elements = []

      const view = await mount(mode)
      await start(view)

      for (let n = 1; n <= fragmentCount * 2; n += 1) {
        await playTo(startOfNthAppend(n))
      }

      // One object URL, assigned once, for the whole run — the element is never
      // left holding no media, which is the entire hypothesis under test.
      expect(playbackSrcAssignments()).toEqual([CARRIER_SRC])

      view.unmount()
    }
  })

  it('swaps src and calls play per fragment in src-swap', async () => {
    const view = await mount('src-swap')
    await start(view)

    await endFragment()
    await endFragment()

    // Three fragments, three sources, three play() calls — the control's shape.
    expect(playCalls()).toBe(3)
    expect(playbackSrcAssignments()).toHaveLength(3)
    expect(
      playbackSrcAssignments().map((url) => fragmentOfSize(Number(/^blob:(\d+):/.exec(url)?.[1]))),
    ).toEqual([0, 1, 2])
    // And each play followed its own src, rather than three plays after three swaps.
    expect(timeline.filter((step) => step.startsWith('src:') || step === 'play')).toEqual([
      expect.stringContaining('blob:'),
      'play',
      expect.stringContaining('blob:'),
      'play',
      expect.stringContaining('blob:'),
      'play',
    ])
  })

  it('appends all eight fragments before playing in mse-upfront', async () => {
    const view = await mount('mse-upfront')
    await start(view)

    expect(appends.map((entry) => entry.index)).toEqual([0, 1, 2, 3, 4, 5, 6, 7])
    // Ordering, not just counting: the single play() comes last.
    expect(timeline).toEqual([
      `src:${CARRIER_SRC}`,
      ...SPIKE_FRAGMENTS.map((fragment) => `append:${fragment.index}`),
      'play',
    ])
  })

  it('starts mse-progressive after three appends and appends the rest during playback', async () => {
    expect(MSE_PLAY_RUNWAY).toBe(3)

    const view = await mount('mse-progressive')
    await start(view)

    // Exactly the reader's own runway is buffered before the gesture's play().
    expect(timeline).toEqual([`src:${CARRIER_SRC}`, 'append:0', 'append:1', 'append:2', 'play'])

    // Fragment 0 finishes: 3 is appended while 1 plays.
    await playTo(startOfNthAppend(1))
    expect(appends.map((entry) => entry.index)).toEqual([0, 1, 2, 3])
    expect(timeline.indexOf('append:3')).toBeGreaterThan(timeline.indexOf('play'))

    // And it keeps exactly that runway as playback walks on.
    await playTo(startOfNthAppend(2))
    expect(appends.map((entry) => entry.index)).toEqual([0, 1, 2, 3, 4])
    await playTo(startOfNthAppend(3))
    expect(appends.map((entry) => entry.index)).toEqual([0, 1, 2, 3, 4, 5])
  })

  it('loops back to the first fragment after the last', async () => {
    // src-swap: fragment 0 is loaded into the element a second time.
    const swap = await mount('src-swap')
    await start(swap)
    for (let n = 0; n < fragmentCount; n += 1) await endFragment()

    const swapped = playbackSrcAssignments().map((url) =>
      fragmentOfSize(Number(/^blob:(\d+):/.exec(url)?.[1])),
    )
    expect(swapped).toHaveLength(fragmentCount + 1)
    expect(swapped[fragmentCount]).toBe(0)
    swap.unmount()

    // mse-progressive: fragment 0 is appended again, onto the SAME buffer.
    timeline = []
    appends = []
    elements = []
    carrierCount = 0
    const progressive = await mount('mse-progressive')
    await start(progressive)
    for (let n = 1; n <= fragmentCount; n += 1) await playTo(startOfNthAppend(n))

    expect(appends.map((entry) => entry.index).filter((index) => index === 0).length).toBe(2)
    // Looping did NOT mean a new MediaSource — that would reintroduce the very
    // boundary this mode exists to remove.
    expect(carrierCount).toBe(1)
    progressive.unmount()

    // mse-upfront: nothing is appended after play(), so the loop is a seek back
    // to the start of the one buffer.
    timeline = []
    appends = []
    elements = []
    carrierCount = 0
    const upfront = await mount('mse-upfront')
    await start(upfront)
    const appendsAtPlay = appends.length
    await playTo(TOTAL_RUN_SECONDS)

    expect(playbackElement().currentTime).toBe(0)
    expect(appends.length).toBe(appendsAtPlay)
    expect(carrierCount).toBe(1)
    upfront.unmount()
  })

  it('constructs no duration probe after playback starts', async () => {
    // `mse-progressive` is the mode that used to measure mid-run: only three
    // fragments are appended before the gesture's play() and the other five
    // arrive on `timeupdate`, possibly with the page hidden.
    const view = await mount('mse-progressive')
    await start(view)

    // One playback element plus one probe per fragment: every duration was
    // measured up front, while the page is still visible.
    expect(elementsAtPlay).toBe(1 + fragmentCount)

    // Two full passes, so the five late fragments and a whole repeat are
    // appended with playback under way.
    for (let n = 1; n <= fragmentCount * 2; n += 1) {
      await playTo(startOfNthAppend(n))
    }

    // Guards against passing because the run stalled and appended nothing.
    expect(appends.length).toBeGreaterThan(fragmentCount)
    // CONTEXT.md: a second media element makes media-session ownership flap,
    // and the media session is what the OS is revoking in the failure under
    // investigation. The measurement window must never see one appear.
    expect(elements.length).toBe(elementsAtPlay)

    // And the durations still reached the carrier — the appends carry the real
    // measured lengths, not zeros from a probe that never ran.
    expect(appends.map((entry) => entry.duration).slice(0, fragmentCount)).toEqual(
      SPIKE_FRAGMENTS.map((fragment) => secondsFor(fragment.index)),
    )
  })

  it('measures every duration before playing in src-swap and mse-upfront too', async () => {
    for (const mode of ['src-swap', 'mse-upfront'] as const) {
      timeline = []
      appends = []
      elements = []
      elementsAtPlay = -1

      const view = await mount(mode)
      await start(view)

      // The three modes are compared against each other, so each must reach
      // play() having done the same pre-play work.
      expect(elementsAtPlay).toBe(1 + fragmentCount)

      for (let n = 0; n < fragmentCount; n += 1) await endFragment()
      await playTo(TOTAL_RUN_SECONDS)

      expect(elements.length).toBe(elementsAtPlay)
      view.unmount()
    }
  })

  it('records the selected mode at start', async () => {
    const view = await mount('mse-progressive')
    await start(view)

    expect(entriesOfType('spike-mode').map((entry) => entry.detail)).toEqual(['mse-progressive'])
  })

  it('refuses an MSE mode when MSE is unsupported', async () => {
    isMseAudioSupported.mockReturnValue(false)

    const view = await mount('mse-upfront')
    expect(view.result.current.mseSupported).toBe(false)

    await start(view)

    // Refused up front, not partway: no carrier, no appends, no playback.
    expect(createMseCarrier).not.toHaveBeenCalled()
    expect(appends).toEqual([])
    expect(playCalls()).toBe(0)
    expect(view.result.current.isRunning).toBe(false)
    // And it says why, rather than going quiet.
    expect(readReaderLog().some((entry) => /unsupported|cannot carry/i.test(entry.detail ?? ''))).toBe(
      true,
    )

    // Positive control: the four assertions above would all hold for a hook
    // that never starts anything at all, so prove the same mode DOES run when
    // MSE is available.
    view.unmount()
    isMseAudioSupported.mockReturnValue(true)
    const supported = await mount('mse-upfront')
    await start(supported)
    expect(createMseCarrier).toHaveBeenCalledTimes(1)
    expect(supported.result.current.isRunning).toBe(true)
    expect(playCalls()).toBe(1)
  })

  it('disposes the carrier on stop', async () => {
    const view = await mount('mse-progressive')
    await start(view)
    expect(disposeCalls).toBe(0)

    await act(async () => {
      view.result.current.stop()
    })

    expect(disposeCalls).toBe(1)
    expect(view.result.current.isRunning).toBe(false)
    expect(playbackElement().pause).toHaveBeenCalled()

    // A stopped run appends nothing more, however the element keeps ticking.
    const appended = appends.length
    await playTo(TOTAL_RUN_SECONDS)
    expect(appends.length).toBe(appended)
  })

  it('clears the element src on stop', async () => {
    const view = await mount('mse-upfront')
    await start(view)

    await act(async () => {
      view.result.current.stop()
    })

    // `MseCarrier.dispose()` revokes the object URL but does NOT detach the
    // element, so the hook has to. Without this the next run's load() would hit
    // a dangling blob: URL.
    expect(playbackElement().src).toBe('')
    expect(playbackElement().load).toHaveBeenCalled()
  })
})
