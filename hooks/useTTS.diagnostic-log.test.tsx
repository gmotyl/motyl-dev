import { act, cleanup, renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useTTS } from './useTTS'
import { synthesizeSpeech } from '@/lib/tts/client'
import {
  READER_LOG_FLAG,
  clearReaderLog,
  readReaderLog,
  type ReaderLogEntry,
} from '@/lib/reader/diagnostic-log'

// Mock the synthesis client so no real network / edge-tts is touched.
vi.mock('@/lib/tts/client', () => ({
  synthesizeSpeech: vi.fn(async () => new ArrayBuffer(8)),
  prefetchSpeech: vi.fn(),
}))

/**
 * The same fake `HTMLMediaElement` harness `useTTS.test.tsx` uses — jsdom's real
 * `<audio>` element with only the unimplemented/inert bits replaced (`play`,
 * `pause`, `currentTime`, `duration`, `src`, the object-URL factory, rAF).
 *
 * This file only asserts on what the diagnostic log recorded; the behavioural
 * contract stays in `useTTS.test.tsx`, which must remain green untouched.
 */

// Every value assigned to element.src, in order. One entry === one unit start.
let srcAssignments: string[] = []
let createdUrls: string[] = []
let audioPlay: ReturnType<typeof vi.fn>
let audioPause: ReturnType<typeof vi.fn>
let audioLoad: ReturnType<typeof vi.fn>
let createObjectURL: ReturnType<typeof vi.fn>
let revokeObjectURL: ReturnType<typeof vi.fn>
let cancelFrame: ReturnType<typeof vi.fn>
let mediaCurrentTime = 0
let mediaDuration = 1
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

const audioElements = () => Array.from(document.querySelectorAll('audio'))
const currentAudio = () => audioElements()[0] as HTMLAudioElement

// Fire the element's `ended` event — the hook's unit-advance trigger — and let
// the follow-on synthesis/skip chain settle.
const endCurrentUnit = async (turns = 6) => {
  await act(async () => {
    currentAudio().dispatchEvent(new Event('ended'))
    for (let i = 0; i < turns; i += 1) await Promise.resolve()
  })
}

const settle = async (turns = 6) => {
  await act(async () => {
    for (let i = 0; i < turns; i += 1) await Promise.resolve()
  })
}

/**
 * The flag is a plain `localStorage` key. NOT `vi.spyOn(window.localStorage, …)`
 * — jsdom 27's `Storage` is a Proxy, so an instance spy stores an *item* named
 * after the method and the real method still runs (see the plan's note).
 */
const enableLog = () => window.localStorage.setItem(READER_LOG_FLAG, '1')

const logged = () => readReaderLog()
const loggedLines = () =>
  logged().map((entry) =>
    [entry.type, entry.detail, entry.suppressed ? '[suppressed]' : null]
      .filter((part) => part !== undefined && part !== null)
      .join(' ')
  )
const firstOfType = (type: ReaderLogEntry['type']) =>
  logged().find((entry) => entry.type === type)

beforeEach(() => {
  srcAssignments = []
  createdUrls = []
  frameCallbacks = []
  mediaCurrentTime = 0
  mediaDuration = 1
  document.querySelectorAll('audio').forEach((el) => el.remove())

  window.localStorage.clear()
  clearReaderLog()

  audioPlay = vi.fn(() => Promise.resolve())
  audioPause = vi.fn()
  audioLoad = vi.fn()
  patchProto('play', { value: audioPlay, writable: true })
  patchProto('pause', { value: audioPause, writable: true })
  patchProto('load', { value: audioLoad, writable: true })
  patchProto('currentTime', {
    get: () => mediaCurrentTime,
    set: (value: number) => { mediaCurrentTime = value },
  })
  patchProto('duration', { get: () => mediaDuration })
  patchProto('src', {
    get(this: HTMLElement) { return this.getAttribute('src') ?? '' },
    set(this: HTMLElement, value: string) {
      srcAssignments.push(value)
      mediaCurrentTime = 0
      this.setAttribute('src', value)
    },
  })

  createObjectURL = vi.fn(() => {
    const url = `blob:mock/${createdUrls.length}`
    createdUrls.push(url)
    return url
  })
  revokeObjectURL = vi.fn()
  URL.createObjectURL = createObjectURL as unknown as typeof URL.createObjectURL
  URL.revokeObjectURL = revokeObjectURL as unknown as typeof URL.revokeObjectURL

  vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
    frameCallbacks.push(cb)
    return frameCallbacks.length
  })
  cancelFrame = vi.fn()
  vi.stubGlobal('cancelAnimationFrame', cancelFrame)
  // The error paths under test console.warn on purpose; keep the run readable
  // without swallowing the call itself (asserted where it matters).
  vi.spyOn(console, 'warn').mockImplementation(() => {})

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

describe('useTTS diagnostic log — playback path', () => {
  it('records unit-start and play-called for each unit it plays', async () => {
    enableLog()
    const units = ['unit one', 'unit two']
    const { result } = renderHook(() => useTTS('irrelevant content', { units }))

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(srcAssignments).toHaveLength(1))

    expect(loggedLines()).toEqual(['unit-start 0/2', 'play-called 0'])

    await endCurrentUnit()
    await waitFor(() => expect(srcAssignments).toHaveLength(2))

    // The whole chain is visible: the unit that finished, the unit that was
    // entered next, and the start it asked the element for.
    expect(loggedLines()).toEqual([
      'unit-start 0/2',
      'play-called 0',
      'unit-ended 0',
      'unit-start 1/2',
      'play-called 1',
    ])
    // `play-called` records the intent to start, so it must precede the
    // element's answer — a log written after `play()` resolved would go missing
    // for exactly the refusal it exists to catch.
    expect(audioPlay).toHaveBeenCalled()
  })

  it('records the completion entry as M/M so a finished article is unambiguous', async () => {
    enableLog()
    const units = ['unit one', 'unit two']
    const onComplete = vi.fn()
    const { result } = renderHook(() =>
      useTTS('irrelevant content', { units, onComplete })
    )

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(srcAssignments).toHaveLength(1))

    await endCurrentUnit()
    await waitFor(() => expect(srcAssignments).toHaveLength(2))

    await endCurrentUnit()
    await waitFor(() => expect(onComplete).toHaveBeenCalledTimes(1))

    // The completion path enters `playChunk` once more, for a unit that does
    // not exist. `M/M` is what tells the operator "past the last unit" — a bare
    // index there reads exactly like a real next unit that died before
    // `element.play()`, which is the failure this log exists to find.
    expect(loggedLines().at(-1)).toBe('unit-start 2/2')
    // …and nothing was asked of the element for it.
    expect(loggedLines().filter((line) => line.startsWith('play-called'))).toEqual([
      'play-called 0',
      'play-called 1',
    ])
  })

  it('records a play rejection with the error name', async () => {
    enableLog()
    // What Safari/Chrome throw at an un-gestured start — the hidden-page refusal
    // this instrument is hunting.
    const refusal = new DOMException('play() was not allowed', 'NotAllowedError')
    audioPlay.mockImplementation(() => Promise.reject(refusal))
    const onError = vi.fn()

    const { result } = renderHook(() => useTTS('Hello world.', { onError }))

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(onError).toHaveBeenCalledTimes(1))

    const rejected = firstOfType('play-rejected')
    expect(rejected).toBeDefined()
    expect(rejected?.detail).toContain('NotAllowedError')
    expect(rejected?.detail).toContain('play() was not allowed')
    // The guard let this one through, so it is a real refusal — not a
    // guard-suppressed one. Marking it suppressed would invert the diagnosis.
    expect(rejected?.suppressed).toBeUndefined()
  })
})

/**
 * The point of the whole change.
 *
 * All three error paths open with the SAME early-return guard
 * (`!isPlayingRef.current || generation !== requestGenerationRef.current ||
 * signal.aborted`). A guard hit is otherwise silent: the handler fired and
 * vanished, which on a device reads byte-for-byte identically to a page that
 * never resumed executing at all — the exact ambiguity this log exists to
 * remove. So the log call goes ABOVE the guard and marks the entry suppressed
 * when the guard then rejects the event.
 *
 * Each test below drives the guard through the hook's real API (`pause()`,
 * `playFromUnit()`), then invokes the handler the hook itself installed on the
 * element — which is what a late-delivered media event does. The hook detaches
 * a stale unit's handlers structurally (`detachUnitHandlers`), so re-dispatching
 * the DOM event would reach nothing and prove nothing; the captured handler is
 * the only way to observe what the guard does when it does run.
 */
describe('useTTS diagnostic log — guard-suppressed events', () => {
  it('records a play rejection that the shared guard suppresses, marked suppressed', async () => {
    enableLog()
    let rejectUnitPlay: ((reason: unknown) => void) | undefined
    let playCalls = 0
    audioPlay.mockImplementation(() => {
      playCalls += 1
      // Call 1 is the in-gesture unlock poke (no source yet); the unit start is
      // the one we park so it can reject AFTER the user pauses.
      if (playCalls === 1) return Promise.resolve()
      return new Promise<void>((_resolve, reject) => { rejectUnitPlay = reject })
    })
    const onError = vi.fn()

    const { result } = renderHook(() => useTTS('Hello world.', { onError }))

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(srcAssignments).toHaveLength(1))

    // The real API for "isPlayingRef.current is false": a pause. (It aborts the
    // controller too, so every leg of the shared guard is true here — a pause is
    // exactly how that happens in production.)
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

  it('records an element error that the shared guard suppresses, marked suppressed', async () => {
    enableLog()
    const units = ['a'.repeat(10), 'b'.repeat(20)]
    const { result } = renderHook(() => useTTS('irrelevant content', { units }))

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(srcAssignments).toHaveLength(1))

    // Unit 0's handler, closing over generation 1 and generation 1's signal.
    const staleOnError = currentAudio().onerror
    expect(staleOnError).toBeTypeOf('function')

    // A "play from here" jump moves the generation on. Playback is LIVE again
    // afterwards, so `isPlayingRef.current` is true: the generation leg is what
    // suppresses the stale handler, not the isPlaying leg.
    await act(async () => {
      await result.current.playFromUnit(1)
    })
    await waitFor(() => expect(srcAssignments).toHaveLength(2))
    expect(result.current.isPlaying).toBe(true)

    await act(async () => {
      staleOnError?.call(currentAudio(), new Event('error'))
      await Promise.resolve()
    })
    await settle()

    const elementError = firstOfType('element-error')
    expect(elementError).toBeDefined()
    expect(elementError?.suppressed).toBe(true)
    // The unit it fired for, not the one now playing.
    expect(elementError?.detail).toBe('0')
    // The guard ate it: no skip, no extra unit start, no failure recorded.
    expect(srcAssignments).toHaveLength(2)
    expect(firstOfType('synthesis-failed')).toBeUndefined()
  })

  it('records an ended event that the abort guard suppresses, marked suppressed', async () => {
    enableLog()
    const units = ['a'.repeat(10), 'b'.repeat(30)]
    const { result } = renderHook(() => useTTS('irrelevant content', { units }))

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(srcAssignments).toHaveLength(1))

    const staleOnEnded = currentAudio().onended
    expect(staleOnEnded).toBeTypeOf('function')

    // pause() aborts the generation's AbortController (and detaches the
    // handlers — which is why this has to be the captured one).
    mediaCurrentTime = 0.4
    act(() => {
      result.current.pause()
    })
    expect(currentAudio().onended).toBeNull()

    await act(async () => {
      staleOnEnded?.call(currentAudio(), new Event('ended'))
      await Promise.resolve()
    })
    await settle()

    const ended = logged().find((entry) => entry.type === 'unit-ended')
    expect(ended).toBeDefined()
    expect(ended?.suppressed).toBe(true)
    expect(ended?.detail).toBe('0')
    // The guard ate it: the unit was not counted complete and nothing advanced.
    expect(srcAssignments).toHaveLength(1)
    expect(firstOfType('unit-start')?.detail).toBe('0/2')
    expect(logged().filter((entry) => entry.type === 'unit-start')).toHaveLength(1)
  })

  it('records a unit-start that the entry guard suppresses, marked suppressed', async () => {
    enableLog()
    const units = ['unit one', 'unit two']
    let pauseDuringPrebuffer: (() => void) | undefined
    let synthCalls = 0
    vi.mocked(synthesizeSpeech).mockImplementation(async () => {
      synthCalls += 1
      // Call 1 is the blocking fetch for unit 0; call 2 is the prefetch the
      // pre-buffer loop kicks off AFTER `play()` has already passed its own
      // generation check but BEFORE it hands control to `playChunk`. A user tap
      // landing in that window is the real-world shape of the entry guard
      // firing — and an async mock body runs synchronously up to its first
      // await, so this lands inside exactly that window.
      if (synthCalls === 2) pauseDuringPrebuffer?.()
      return new ArrayBuffer(8)
    })

    const { result } = renderHook(() => useTTS('irrelevant content', { units }))
    pauseDuringPrebuffer = () => result.current.pause()

    await act(async () => {
      await result.current.play()
    })
    await settle()

    expect(synthCalls).toBeGreaterThanOrEqual(2)
    // `playChunk` was entered and turned away at the door: without the entry
    // log that is byte-for-byte identical, on a device, to a chain that never
    // reached `playChunk` at all.
    const start = firstOfType('unit-start')
    expect(start).toBeDefined()
    expect(start?.suppressed).toBe(true)
    expect(start?.detail).toBe('0/2')
    // The guard did its job: no source swap, nothing asked of the element.
    expect(srcAssignments).toHaveLength(0)
    expect(firstOfType('play-called')).toBeUndefined()
    expect(audioPlay).toHaveBeenCalledTimes(1) // the gesture-unlock poke only
  })
})

describe('useTTS diagnostic log — failure paths', () => {
  it('records stop-with-error carrying the message', async () => {
    enableLog()
    const refusal = new Error('element refused the unit')
    audioPlay.mockImplementation(() => Promise.reject(refusal))
    const onError = vi.fn()

    const { result } = renderHook(() => useTTS('Hello world.', { onError }))

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(onError).toHaveBeenCalledTimes(1))

    const stopped = firstOfType('stop-with-error')
    expect(stopped).toBeDefined()
    expect(stopped?.detail).toBe('element refused the unit')
    // Cause before effect: the refusal that triggered the stop is above it.
    const types = logged().map((entry) => entry.type)
    expect(types.indexOf('play-rejected')).toBeLessThan(types.indexOf('stop-with-error'))
  })

  it('records synthesis-failed carrying the unit index', async () => {
    enableLog()
    const units = ['ok-1', 'fail-2', 'ok-3']
    vi.mocked(synthesizeSpeech).mockImplementation(async (text: string) => {
      if (text === 'fail-2') throw new Error('stalled')
      return new ArrayBuffer(8)
    })
    const onError = vi.fn()
    const { result } = renderHook(() =>
      useTTS('irrelevant content', { units, onError })
    )

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(srcAssignments).toHaveLength(1))

    // Unit 0 ends, unit 1's synthesis fails and is skipped.
    await endCurrentUnit()
    await waitFor(() => expect(srcAssignments).toHaveLength(2))

    const failed = firstOfType('synthesis-failed')
    expect(failed).toBeDefined()
    // The index of the unit that failed — unit 1, not the unit now playing.
    expect(failed?.detail).toMatch(/^1\b/)
    expect(failed?.detail).toContain('stalled')
    // A skip is not a stop.
    expect(onError).not.toHaveBeenCalled()
    expect(firstOfType('stop-with-error')).toBeUndefined()
  })
})

describe('useTTS diagnostic log — disabled', () => {
  it('records nothing while the flag is unset', async () => {
    // No enableLog() — the store is the single gate, and every call site must
    // go through it.
    const units = ['a'.repeat(10), 'b'.repeat(20)]
    const onError = vi.fn()
    const { result } = renderHook(() =>
      useTTS('irrelevant content', { units, onError })
    )

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(srcAssignments).toHaveLength(1))

    const staleOnEnded = currentAudio().onended
    await endCurrentUnit()
    await waitFor(() => expect(srcAssignments).toHaveLength(2))

    // A guard-suppressed event too: the suppressed branch must be just as silent.
    act(() => {
      result.current.pause()
    })
    await act(async () => {
      staleOnEnded?.call(currentAudio(), new Event('ended'))
      await Promise.resolve()
    })

    expect(logged()).toHaveLength(0)
    // …and the playback the instrument observes is untouched: both units started.
    expect(srcAssignments).toHaveLength(2)
    expect(onError).not.toHaveBeenCalled()
  })
})
