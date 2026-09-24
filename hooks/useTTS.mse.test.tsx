import { act, cleanup, renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useTTS } from './useTTS'
import { synthesizeSpeech } from '@/lib/tts/client'
import { createSrcSwapCarrier } from '@/lib/reader/src-swap-carrier'
import { createMseCarrier } from '@/lib/reader/mse-carrier'
import {
  READER_LOG_FLAG,
  clearReaderLog,
  readReaderLog,
  type ReaderLogEntry,
} from '@/lib/reader/diagnostic-log'
import type { SeamReport } from '@/lib/reader/seam-report'

/**
 * What `useTTS` does once the carrier under it is the MSE one.
 *
 * The whole point of that carrier is what it does NOT do: on one continuous
 * timeline a unit change is a position change, so no unit may cost a `src`
 * assignment, a `play()` or a rewind — each of those is a boundary at which a
 * backgrounded phone can take the media session away. Every assertion here is
 * therefore paired: something observable must have happened (the unit advanced,
 * the jump landed, playback resumed) AND the element must not have been
 * restarted to make it happen. A test that only checked the second half would
 * stay green against a hook that does nothing at all.
 *
 * jsdom has no `MediaSource`, so `isMseAudioSupported()` answers false here and
 * the three unedited suites (`useTTS.test.tsx`,
 * `useTTS.diagnostic-log.test.tsx`, `use-continuous-reader.test.tsx`) keep
 * exercising the src-swap path. This file mocks the SOURCE — the spike carrier
 * that owns the real `MediaSource` — and leaves `createMsePlaybackCarrier`
 * itself real, so the timeline the hook seeks against is the one the production
 * carrier measures from the buffer.
 */

// Mock the synthesis client so no real network / edge-tts is touched.
vi.mock('@/lib/tts/client', () => ({
  synthesizeSpeech: vi.fn(async () => new ArrayBuffer(8)),
  prefetchSpeech: vi.fn(),
}))

/**
 * The fake `MediaSource` behind `createMsePlaybackCarrier`.
 *
 * `available` drives the carrier choice; the rest models the one thing the
 * playback carrier reads back — `report().ranges` — so that every append gains
 * exactly `spanSeconds` of buffer and the timeline it builds is predictable:
 * unit 0 is [0, 10), unit 1 is [10, 20), unit 2 is [20, 30).
 */
const mse = vi.hoisted(() => ({
  available: true,
  spanSeconds: 10,
  created: 0,
  appended: [] as number[],
  start: 0,
  end: 0,
}))

vi.mock('@/lib/reader/mse-carrier', () => ({
  isMseAudioSupported: vi.fn(() => mse.available),
  createMseCarrier: vi.fn(() => {
    mse.created += 1
    mse.appended = []
    mse.start = 0
    mse.end = 0
    return {
      src: `mse:mock/${mse.created}`,
      append: async (index: number) => {
        mse.appended.push(index)
        mse.end += mse.spanSeconds
      },
      evictBefore: async (time: number) => {
        mse.start = time
      },
      report: (): SeamReport => ({
        contiguous: true,
        ranges: mse.appended.length === 0 ? [] : [[mse.start, mse.end] as const],
        bufferedDuration: mse.end - mse.start,
        contentDuration: mse.end - mse.start,
        expectedDuration: 0,
        drift: 0,
        gapsAtBoundaries: [],
      }),
      dispose: () => {},
    }
  }),
}))

// The real src-swap carrier behind a spy: which factory the hook reaches for is
// the carrier choice, and it is otherwise unobservable.
vi.mock('@/lib/reader/src-swap-carrier', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/reader/src-swap-carrier')>()
  return {
    createSrcSwapCarrier: vi.fn(actual.createSrcSwapCarrier),
  }
})

// Every value assigned to element.src, in order. On the MSE carrier there must
// be exactly one per timeline, never one per unit.
let srcAssignments: string[] = []
// Every value WRITTEN to element.currentTime, in order — a seek, whoever asked
// for it. Reads are invisible here on purpose: the question these tests ask is
// whether the hook moved the playhead, not where it is.
let currentTimeWrites: number[] = []
let audioPlay: ReturnType<typeof vi.fn>
let audioPause: ReturnType<typeof vi.fn>
let audioLoad: ReturnType<typeof vi.fn>
let mediaCurrentTime = 0
// The element's own clock state, which jsdom does not model at all: `play()`
// clears it and `pause()` sets it, exactly as the spec says.
let mediaPaused = true
let frameCallbacks: FrameRequestCallback[] = []

const mediaProto = HTMLMediaElement.prototype
let patchedDescriptors: Array<[string, PropertyDescriptor | undefined]> = []

const patchProto = (name: string, descriptor: PropertyDescriptor) => {
  patchedDescriptors.push([name, Object.getOwnPropertyDescriptor(mediaProto, name)])
  Object.defineProperty(mediaProto, name, { configurable: true, ...descriptor })
}

const restoreProto = () => {
  for (const [name, descriptor] of patchedDescriptors) {
    if (descriptor) Object.defineProperty(mediaProto, name, descriptor)
    else delete (mediaProto as unknown as Record<string, unknown>)[name]
  }
  patchedDescriptors = []
}

const originalCreateObjectURL = URL.createObjectURL
const originalRevokeObjectURL = URL.revokeObjectURL

const currentAudio = () => document.querySelectorAll('audio')[0] as HTMLAudioElement

const settle = async (turns = 8) => {
  await act(async () => {
    for (let i = 0; i < turns; i += 1) await Promise.resolve()
  })
}

/**
 * Move the playback clock and fire `timeupdate` — the ~4Hz clock that survives
 * a hidden page, and the ONLY thing that can report a unit boundary on one
 * continuous timeline. The position is written to the backing variable rather
 * than through the setter: the media pipeline advancing is not a seek, and
 * recording it as one would make `currentTimeWrites` useless.
 */
const emitTimeUpdate = async (currentTime: number) => {
  mediaCurrentTime = currentTime
  await act(async () => {
    currentAudio().dispatchEvent(new Event('timeupdate'))
    for (let i = 0; i < 4; i += 1) await Promise.resolve()
  })
}

const enableLog = () => window.localStorage.setItem(READER_LOG_FLAG, '1')
const firstOfType = (type: ReaderLogEntry['type']) =>
  readReaderLog().find((entry) => entry.type === type)

/** Three units of ten characters each — so a unit is exactly a third of the article. */
const UNITS = ['a'.repeat(10), 'b'.repeat(10), 'c'.repeat(10)]

/** Start a session and wait until all three units are on the timeline. */
const startAllThree = async (result: { current: ReturnType<typeof useTTS> }) => {
  await act(async () => {
    await result.current.play()
  })
  await waitFor(() => expect(mse.appended).toEqual([0, 1, 2]))
  await settle()
}

beforeEach(() => {
  srcAssignments = []
  currentTimeWrites = []
  frameCallbacks = []
  mediaCurrentTime = 0
  mediaPaused = true
  mse.available = true
  mse.spanSeconds = 10
  mse.created = 0
  mse.appended = []
  mse.start = 0
  mse.end = 0
  document.querySelectorAll('audio').forEach((el) => el.remove())
  window.localStorage.clear()
  clearReaderLog()

  audioPlay = vi.fn(() => {
    mediaPaused = false
    return Promise.resolve()
  })
  audioPause = vi.fn(() => {
    mediaPaused = true
  })
  audioLoad = vi.fn()
  patchProto('play', { value: audioPlay, writable: true })
  patchProto('pause', { value: audioPause, writable: true })
  patchProto('load', { value: audioLoad, writable: true })
  patchProto('paused', { get: () => mediaPaused })
  patchProto('currentTime', {
    get: () => mediaCurrentTime,
    set: (value: number) => {
      currentTimeWrites.push(value)
      mediaCurrentTime = value
    },
  })
  // On one continuous timeline the element's own `duration` is the WHOLE
  // buffer, not the unit being read — which is exactly why per-unit progress
  // cannot be derived from it.
  patchProto('duration', { get: () => mse.end })
  patchProto('src', {
    get(this: HTMLElement) {
      return this.getAttribute('src') ?? ''
    },
    set(this: HTMLElement, value: string) {
      srcAssignments.push(value)
      mediaCurrentTime = 0
      this.setAttribute('src', value)
    },
  })

  URL.createObjectURL = vi.fn(() => 'blob:mock/0') as unknown as typeof URL.createObjectURL
  URL.revokeObjectURL = vi.fn() as unknown as typeof URL.revokeObjectURL

  vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
    frameCallbacks.push(cb)
    return frameCallbacks.length
  })
  vi.stubGlobal('cancelAnimationFrame', vi.fn())

  vi.mocked(createSrcSwapCarrier).mockClear()
  vi.mocked(createMseCarrier).mockClear()
  vi.mocked(synthesizeSpeech).mockReset()
  vi.mocked(synthesizeSpeech).mockImplementation(async () => new ArrayBuffer(8))
})

afterEach(() => {
  // Unmount BEFORE restoring the prototype: the hook's teardown pauses the
  // element, and jsdom's own pause() is an unimplemented stub that logs.
  cleanup()
  restoreProto()
  URL.createObjectURL = originalCreateObjectURL
  URL.revokeObjectURL = originalRevokeObjectURL
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
  vi.clearAllMocks()
  window.localStorage.clear()
  clearReaderLog()
  document.querySelectorAll('audio').forEach((el) => el.remove())
})

describe('useTTS carrier selection', () => {
  it('uses the src-swap carrier when MSE is unavailable', async () => {
    /**
     * iPhone Safari has no MediaSource, so this is a live path and not a legacy
     * branch — and it is what keeps the three unedited suites honest.
     *
     * Both directions are asserted in one test on purpose. "Constructs the
     * src-swap carrier" alone is satisfied by a hook that has no choice in it
     * at all, which is precisely the state this task starts from; what makes it
     * a CHOICE is that the same hook reaches for the other carrier when the
     * browser can carry one.
     */
    mse.available = false
    const first = renderHook(() => useTTS('Hello world.'))

    await act(async () => {
      await first.result.current.play()
    })
    await waitFor(() => expect(srcAssignments).toHaveLength(1))

    // A per-unit blob: URL is the src-swap carrier's signature; the MSE carrier
    // has no object URL per unit at all.
    expect(srcAssignments[0]).toMatch(/^blob:/)
    expect(vi.mocked(createSrcSwapCarrier)).toHaveBeenCalledTimes(1)
    expect(vi.mocked(createMseCarrier)).not.toHaveBeenCalled()

    first.unmount()
    vi.mocked(createSrcSwapCarrier).mockClear()
    vi.mocked(createMseCarrier).mockClear()
    document.querySelectorAll('audio').forEach((el) => el.remove())

    mse.available = true
    const second = renderHook(() => useTTS('Hello world.'))

    await act(async () => {
      await second.result.current.play()
    })
    await waitFor(() => expect(vi.mocked(createMseCarrier)).toHaveBeenCalled())
    expect(vi.mocked(createSrcSwapCarrier)).not.toHaveBeenCalled()
  })
})

describe('useTTS on the MSE carrier', () => {
  it('advances a unit without calling play or assigning src', async () => {
    /**
     * THE property the whole change exists for. A unit boundary on one
     * continuous timeline is a `timeupdate` crossing, not an `ended` — and
     * crossing it must cost the element nothing: no second source, no second
     * start. Both are boundaries at which a backgrounded phone revokes the
     * media exemption, which is the silence this carrier removes.
     */
    const { result } = renderHook(() => useTTS('irrelevant content', { units: UNITS }))
    await startAllThree(result)

    expect(result.current.currentChunkIndex).toBe(0)
    const playsAtStart = audioPlay.mock.calls.length
    const srcAtStart = srcAssignments.length
    expect(playsAtStart).toBeGreaterThan(0)
    currentTimeWrites = []

    // The playhead walks out of unit 0's span [0, 10) and into unit 1's.
    await emitTimeUpdate(12)

    // It advanced — without this the assertions below are vacuous.
    expect(result.current.currentChunkIndex).toBe(1)
    expect(audioPlay.mock.calls).toHaveLength(playsAtStart)
    expect(srcAssignments).toHaveLength(srcAtStart)
    // Not even a seek: the playhead is already where unit 1 is being read, and
    // re-pointing it at the span's start could only rewind by the crossing.
    expect(currentTimeWrites).toEqual([])
  })

  it('seeks without a second play when already running', async () => {
    /**
     * "Play from here" while the reader is already reading. On the src-swap
     * carrier that is a pause, a new source and a fresh `play()`; here it is a
     * single write to `currentTime`, because the element never stopped.
     */
    const { result } = renderHook(() => useTTS('irrelevant content', { units: UNITS }))
    await startAllThree(result)

    // Baselined, not asserted at zero: the in-gesture unlock poke of the FIRST
    // play() spends a play()/pause() pair on the element before any unit does.
    const playsAtStart = audioPlay.mock.calls.length
    const pausesAtStart = audioPause.mock.calls.length
    const srcAtStart = srcAssignments.length
    currentTimeWrites = []

    await act(async () => {
      await result.current.playFromUnit(2)
    })
    await settle()

    // The jump landed: unit 2 begins at 20 s on a timeline of ten-second spans.
    expect(result.current.currentChunkIndex).toBe(2)
    expect(currentTimeWrites).toEqual([20])
    // ...and it cost the element neither a restart nor a second source. The
    // element was never stopped, so there was nothing to start again.
    expect(audioPlay.mock.calls).toHaveLength(playsAtStart)
    expect(audioPause.mock.calls).toHaveLength(pausesAtStart)
    expect(srcAssignments).toHaveLength(srcAtStart)
  })

  it('resumes from the stop point without an offset', async () => {
    /**
     * `pauseOffset` exists on the src-swap path only because a `src`
     * assignment rewinds the element to 0. There is no assignment here, so the
     * element keeps its own `currentTime` across the pause and `play()` picks
     * it up unaided — and an offset restored by a seek could only overwrite a
     * position the element already had right.
     */
    const { result } = renderHook(() => useTTS('irrelevant content', { units: UNITS }))
    await startAllThree(result)

    await emitTimeUpdate(4.5)

    // Baselined past the in-gesture unlock poke, which spends a play()/pause()
    // pair of its own on the first play().
    const pausesBefore = audioPause.mock.calls.length
    act(() => {
      result.current.pause()
    })
    expect(audioPause.mock.calls).toHaveLength(pausesBefore + 1)
    expect(result.current.isPlaying).toBe(false)

    const playsWhilePaused = audioPlay.mock.calls.length
    const srcWhilePaused = srcAssignments.length
    currentTimeWrites = []

    await act(async () => {
      await result.current.play()
    })
    await settle()

    // Playback really came back...
    expect(result.current.isPlaying).toBe(true)
    expect(audioPlay.mock.calls.length).toBe(playsWhilePaused + 1)
    // ...from where it stopped, with nothing written to the playhead: no offset
    // was recorded, so none could be restored.
    expect(currentTimeWrites).toEqual([])
    expect(mediaCurrentTime).toBe(4.5)
    expect(srcAssignments).toHaveLength(srcWhilePaused)
  })

  it('reports progress within the current span', async () => {
    /**
     * `element.duration` is the whole buffer here, so the src-swap formula
     * (`currentTime / duration`) answers a different question entirely. Unit
     * progress is `(currentTime - span.start) / span.duration`, and the second
     * reading below is the one that pins the subtraction: at 12.5 s the element
     * is a quarter of the way into unit 1, not past the end of it.
     */
    const progress: number[] = []
    const { result } = renderHook(() =>
      useTTS('irrelevant content', { units: UNITS, onProgress: (p) => progress.push(p) })
    )
    await startAllThree(result)

    // A quarter into unit 0, which is a third of the article: 25% of 33.3%.
    await emitTimeUpdate(2.5)
    expect(progress.at(-1)).toBeCloseTo((10 * 0.25) / 30 * 100, 4)

    // A quarter into unit 1, with unit 0 complete behind it.
    await emitTimeUpdate(12.5)
    expect(result.current.currentChunkIndex).toBe(1)
    expect(progress.at(-1)).toBeCloseTo((10 + 10 * 0.25) / 30 * 100, 4)
  })

  it('still logs above the suppression guard', async () => {
    /**
     * The ordering rule the device log rests on: `play-rejected` is recorded
     * BEFORE the shared guard is applied and carries `suppressed` when the
     * guard then rejects the event. Recorded below the guard instead, a
     * suppressed refusal leaves no trace at all — and on a device that reads
     * byte-for-byte identically to a page that never resumed executing.
     */
    enableLog()
    let rejectUnitPlay: ((reason: unknown) => void) | undefined
    let playCalls = 0
    audioPlay.mockImplementation(() => {
      playCalls += 1
      mediaPaused = false
      // Call 1 is the in-gesture unlock poke; the unit start is the one parked
      // so it can reject AFTER the user pauses.
      if (playCalls === 1) return Promise.resolve()
      return new Promise<void>((_resolve, reject) => {
        rejectUnitPlay = reject
      })
    })
    const onError = vi.fn()

    const { result } = renderHook(() =>
      useTTS('irrelevant content', { units: UNITS, onError })
    )
    await startAllThree(result)

    // The entries the playing path writes are still written.
    expect(firstOfType('unit-start')?.detail).toBe('0/3')
    expect(firstOfType('play-called')?.detail).toBe('0')

    act(() => {
      result.current.pause()
    })

    await act(async () => {
      rejectUnitPlay?.(new DOMException('The play() request was interrupted', 'AbortError'))
      await Promise.resolve()
    })
    await settle()

    const rejected = firstOfType('play-rejected')
    expect(rejected).toBeDefined()
    expect(rejected?.suppressed).toBe(true)
    expect(rejected?.detail).toContain('AbortError')
    // The guard still did its job — nothing was reported and nothing stopped.
    expect(onError).not.toHaveBeenCalled()
    expect(firstOfType('stop-with-error')).toBeUndefined()
  })
})
