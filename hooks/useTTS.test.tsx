import { act, cleanup, renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useTTS } from './useTTS'
import { synthesizeSpeech } from '@/lib/tts/client'

// Mock the synthesis client so no real network / edge-tts is touched.
vi.mock('@/lib/tts/client', () => ({
  synthesizeSpeech: vi.fn(async () => new ArrayBuffer(8)),
  prefetchSpeech: vi.fn(),
}))

/**
 * Fake `HTMLMediaElement` harness.
 *
 * `useTTS` plays each speech unit by pointing ONE real `<audio>` element at a
 * `blob:` object URL, so the tests keep jsdom's actual element (appendChild,
 * remove, querySelector, event dispatch all behave) and only replace the bits
 * jsdom leaves unimplemented or inert:
 *
 * - `play` / `pause` / `load` — jsdom's are "not implemented" stubs that log to
 *   the virtual console and return `undefined` instead of a promise.
 * - `currentTime` / `duration` — jsdom never advances a playback position, so
 *   the clock is a module-level variable a test can move by hand.
 * - `src` — recorded on assignment (that IS the unit swap, so tests count these
 *   the way the old Web Audio harness counted `source.start()` calls), and
 *   assigning it resets `currentTime` to 0 exactly as a browser does when the
 *   media source changes.
 * - `URL.createObjectURL` / `revokeObjectURL` — stubbed so every created URL is
 *   observable and can be paired against its revocation.
 */

// Every value assigned to element.src, in order. One entry === one unit start.
let srcAssignments: string[] = []
// Every object URL handed out by the stubbed URL.createObjectURL, in order.
let createdUrls: string[] = []
let audioPlay: ReturnType<typeof vi.fn>
let audioPause: ReturnType<typeof vi.fn>
let audioLoad: ReturnType<typeof vi.fn>
let createObjectURL: ReturnType<typeof vi.fn>
let revokeObjectURL: ReturnType<typeof vi.fn>
let cancelFrame: ReturnType<typeof vi.fn>
// Constructing one is a hard failure: the whole point of this change is that the
// playback path never touches Web Audio again.
let audioContextCtor: ReturnType<typeof vi.fn>
// Playback clock the hook reads for progress and for the pause offset.
let mediaCurrentTime = 0
let mediaDuration = 1
// Pending rAF callbacks; `flushFrame()` runs exactly one round of them so the
// progress loop can be stepped deterministically instead of free-running.
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

const flushMicrotasks = () => act(async () => { await Promise.resolve() })

const audioElements = () => Array.from(document.querySelectorAll('audio'))
const currentAudio = () => audioElements()[0] as HTMLAudioElement

// Run one round of scheduled animation frames. The array is swapped out first so
// updateProgress's self-reschedule does not spin forever.
const flushFrame = async () => {
  const pending = frameCallbacks
  frameCallbacks = []
  await act(async () => {
    pending.forEach((cb) => cb(0))
  })
}

// Move the playback clock and fire the element's `timeupdate` — the clock that
// keeps ticking (~4Hz) while the page is hidden and rAF is frozen.
const emitTimeUpdate = async (currentTime: number) => {
  mediaCurrentTime = currentTime
  await act(async () => {
    currentAudio().dispatchEvent(new Event('timeupdate'))
  })
}

// Put the element back in the state a real one is in immediately after a `src`
// swap: `duration` is NaN until `loadedmetadata` arrives, which happens once per
// UNIT, not just once at startup. The harness otherwise pins a duration forever,
// which no real element ever does.
const clearDurationMetadata = () => {
  mediaDuration = Number.NaN
}

// Fire the element's `error` event — the browser saying "these bytes are
// unusable" (undecodable MP3, dead object URL). There is no second output path
// to retry on, so the hook must treat it as a unit failure, and the skip chain
// it starts needs the same settling turns as `endCurrentUnit`.
const failCurrentUnitInElement = async (turns = 6) => {
  await act(async () => {
    currentAudio().dispatchEvent(new Event('error'))
    for (let i = 0; i < turns; i += 1) await Promise.resolve()
  })
}

// Fire the element's `ended` event — the hook's unit-advance trigger — and let
// the follow-on synthesis/skip chain settle.
const endCurrentUnit = async (turns = 6) => {
  await act(async () => {
    currentAudio().dispatchEvent(new Event('ended'))
    for (let i = 0; i < turns; i += 1) await Promise.resolve()
  })
}

beforeEach(() => {
  srcAssignments = []
  createdUrls = []
  frameCallbacks = []
  mediaCurrentTime = 0
  mediaDuration = 1
  document.querySelectorAll('audio').forEach((el) => el.remove())

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
      // A real element rewinds when the media source changes.
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

  audioContextCtor = vi.fn(() => {
    throw new Error('AudioContext must never be constructed by useTTS')
  })
  vi.stubGlobal('AudioContext', audioContextCtor)
  vi.stubGlobal('webkitAudioContext', audioContextCtor)

  vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
    frameCallbacks.push(cb)
    return frameCallbacks.length
  })
  cancelFrame = vi.fn()
  vi.stubGlobal('cancelAnimationFrame', cancelFrame)

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
  vi.clearAllMocks()
  document.querySelectorAll('audio').forEach((el) => el.remove())
})

describe('useTTS media-element playback', () => {
  it('plays a unit from a blob: object URL on a single audio element', async () => {
    const { result } = renderHook(() => useTTS('Hello world.'))

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(srcAssignments).toHaveLength(1))

    // Exactly one element per hook instance, with its src swapped per unit —
    // not a pair of ping-ponged elements (see design.md).
    expect(audioElements()).toHaveLength(1)

    const element = currentAudio() as HTMLAudioElement & { playsInline: boolean }
    expect(element.getAttribute('src')).toMatch(/^blob:/)
    expect(element.playsInline).toBe(true)
    expect(element.controls).toBe(false)
    expect(element.preload).toBe('auto')

    // The MP3 the synthesis client already returns is played as-is.
    const blob = createObjectURL.mock.calls[0][0] as Blob
    expect(blob).toBeInstanceOf(Blob)
    expect(blob.type).toBe('audio/mpeg')
    expect(audioPlay).toHaveBeenCalled()
  })

  it('never constructs an AudioContext', async () => {
    const units = ['unit one', 'unit two']
    const { result } = renderHook(() => useTTS('irrelevant content', { units }))

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(srcAssignments).toHaveLength(1))
    await endCurrentUnit()
    await waitFor(() => expect(srcAssignments).toHaveLength(2))

    // Chrome for Android gives a MediaStream-backed element no media treatment,
    // so the Web Audio carrier is gone entirely — not merely bypassed.
    expect(audioContextCtor).not.toHaveBeenCalled()
  })

  it('chains to the next unit when the element fires ended', async () => {
    const units = ['a'.repeat(10), 'b'.repeat(30)]
    const onProgress = vi.fn()
    const { result } = renderHook(() =>
      useTTS('irrelevant content', { units, onProgress })
    )

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(srcAssignments).toHaveLength(1))

    await endCurrentUnit()

    await waitFor(() => expect(srcAssignments).toHaveLength(2))
    expect(srcAssignments[1]).not.toBe(srcAssignments[0])
    await waitFor(() => expect(result.current.currentChunkIndex).toBe(1))

    // Unit 0's 10 characters are counted complete; unit 1 has just started
    // (currentTime 0), so progress is exactly 10/40.
    onProgress.mockClear()
    await flushFrame()
    expect(onProgress).toHaveBeenCalledWith(25)
  })

  it('prepares the next unit\'s object URL before the current unit ends', async () => {
    const units = ['unit one', 'unit two']
    const { result } = renderHook(() => useTTS('irrelevant content', { units }))

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(srcAssignments).toHaveLength(1))

    // The buffered-ahead unit already has its object URL while unit 0 is still
    // playing, so the swap at `ended` is a local assignment.
    await waitFor(() => expect(createObjectURL).toHaveBeenCalledTimes(2))
    expect(srcAssignments).toHaveLength(1)

    const preparedUrl = createdUrls[1]
    await endCurrentUnit()

    expect(srcAssignments[1]).toBe(preparedUrl)
  })

  it('pauses the element and resumes mid-unit from the same currentTime', async () => {
    const { result } = renderHook(() => useTTS('Hello world.'))

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(srcAssignments).toHaveLength(1))

    mediaCurrentTime = 0.4
    act(() => {
      result.current.pause()
    })

    expect(audioPause).toHaveBeenCalled()
    expect(currentAudio().currentTime).toBe(0.4)

    audioPlay.mockClear()
    await act(async () => {
      await result.current.play()
    })
    await flushMicrotasks()

    await waitFor(() => expect(audioPlay).toHaveBeenCalled())
    // Same unit, same source: no re-assignment of src (which would rewind).
    expect(srcAssignments).toHaveLength(1)
    expect(currentAudio().currentTime).toBe(0.4)
  })

  it('revokes every object URL it created on stop', async () => {
    const units = ['unit one', 'unit two', 'unit three']
    const { result } = renderHook(() => useTTS('irrelevant content', { units }))

    await act(async () => {
      await result.current.play()
    })
    // BUFFER_AHEAD prepares all three units up front.
    await waitFor(() => expect(createObjectURL).toHaveBeenCalledTimes(3))

    act(() => {
      result.current.stop()
    })

    const revoked = revokeObjectURL.mock.calls.map(([url]) => url as string)
    expect([...new Set(revoked)].sort()).toEqual([...createdUrls].sort())
  })

  it('tears the element down and revokes URLs on unmount', async () => {
    const { result, unmount } = renderHook(() => useTTS('Hello world.'))

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(srcAssignments).toHaveLength(1))
    audioPause.mockClear()

    unmount()

    expect(audioPause).toHaveBeenCalled()
    expect(document.querySelector('audio')).toBeNull()
    const revoked = revokeObjectURL.mock.calls.map(([url]) => url as string)
    expect([...new Set(revoked)].sort()).toEqual([...createdUrls].sort())
  })
})

/**
 * Progress has two clocks (see design.md, "Progress has two clocks now"):
 *
 * - `timeupdate` — the AUTHORITATIVE one. It keeps firing while the page is
 *   hidden, which is exactly the scenario this whole change exists for (screen
 *   off, reader playing in the background). `use-continuous-reader` drives its
 *   prefetch threshold off `onProgress`, so if progress died with the page the
 *   prefetch ladder would stop evaluating and the reader would starve at a
 *   section boundary.
 * - `requestAnimationFrame` — cosmetic only. It does NOT tick while hidden; it
 *   exists so the reader bar moves smoothly at 60Hz while the screen is on.
 *
 * Both must read the same `element.currentTime` through the same emitter, or
 * they drift apart.
 */
describe('useTTS progress clocks', () => {
  it('emits progress from timeupdate when no animation frame runs', async () => {
    const units = ['a'.repeat(10), 'b'.repeat(30)]
    const onProgress = vi.fn()
    const { result } = renderHook(() =>
      useTTS('irrelevant content', { units, onProgress })
    )

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(srcAssignments).toHaveLength(1))

    // Simulate a hidden page: drop every frame the hook has scheduled and never
    // run one. Nothing but `timeupdate` may move progress from here on.
    frameCallbacks = []
    onProgress.mockClear()

    mediaDuration = 2
    await emitTimeUpdate(1)

    // Halfway through unit 0 (10 of 40 total chars): 10 * 0.5 / 40 = 12.5%.
    expect(onProgress).toHaveBeenCalledWith(12.5)
    // No frame ran, and none was scheduled by the timeupdate path.
    expect(frameCallbacks).toHaveLength(0)
    await waitFor(() => expect(result.current.progress).toBeCloseTo(12.5))
  })

  it('still emits progress every animation frame while visible', async () => {
    const units = ['a'.repeat(10), 'b'.repeat(30)]
    const onProgress = vi.fn()
    const { result } = renderHook(() =>
      useTTS('irrelevant content', { units, onProgress })
    )

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(srcAssignments).toHaveLength(1))

    onProgress.mockClear()
    mediaDuration = 4

    // The rAF loop is self-rescheduling: one emission per frame, forever, so the
    // bar stays smooth between the ~4Hz timeupdates.
    mediaCurrentTime = 1
    await flushFrame()
    expect(onProgress).toHaveBeenCalledTimes(1)
    expect(onProgress).toHaveBeenLastCalledWith(6.25)

    mediaCurrentTime = 2
    await flushFrame()
    expect(onProgress).toHaveBeenCalledTimes(2)
    expect(onProgress).toHaveBeenLastCalledWith(12.5)
  })

  it('throttles setState to whole percents while onProgress stays unthrottled', async () => {
    // One 100-char unit, so the percentage is just `currentTime / duration`.
    const units = ['x'.repeat(100)]
    const onProgress = vi.fn()
    let renderCount = 0
    const { result } = renderHook(() => {
      renderCount += 1
      return useTTS('irrelevant content', { units, onProgress })
    })

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(srcAssignments).toHaveLength(1))

    mediaDuration = 1000
    onProgress.mockClear()

    // 3.00% — the first whole percent, so this one DOES re-render.
    await emitTimeUpdate(30)
    const rendersAtThreePercent = renderCount

    // 3.02% / 3.04% and one rAF tick at the same position: all still "3", so the
    // backdrop-blur reader bar must not re-render again (hover flicker fix) —
    // including across the clock boundary, since both share one throttle.
    await emitTimeUpdate(30.2)
    await emitTimeUpdate(30.4)
    await flushFrame()

    expect(renderCount).toBe(rendersAtThreePercent)
    // onProgress, however, fired for every single tick: the reader's prefetch
    // threshold needs continuous progress, not one sample per percent.
    expect(onProgress).toHaveBeenCalledTimes(4)
    expect(onProgress.mock.calls.map(([p]) => Math.round((p as number) * 100) / 100))
      .toEqual([3, 3.02, 3.04, 3.04])

    // 4.00% — a new whole percent, so exactly one more re-render.
    await emitTimeUpdate(40)
    expect(renderCount).toBe(rendersAtThreePercent + 1)
    expect(result.current.progress).toBeCloseTo(4)
  })

  it('stops emitting after playback ends', async () => {
    const units = ['a'.repeat(10)]
    const onProgress = vi.fn()
    const onComplete = vi.fn()
    const { result } = renderHook(() =>
      useTTS('irrelevant content', { units, onProgress, onComplete })
    )

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(srcAssignments).toHaveLength(1))

    cancelFrame.mockClear()
    await endCurrentUnit()
    await waitFor(() => expect(onComplete).toHaveBeenCalledTimes(1))
    expect(result.current.isPlaying).toBe(false)
    // The rAF loop is cancelled, not merely left to no-op.
    expect(cancelFrame).toHaveBeenCalled()

    onProgress.mockClear()
    mediaDuration = 2
    // Both clocks are dead: a stray timeupdate from the paused element and any
    // frame still queued must emit nothing.
    await emitTimeUpdate(1)
    await flushFrame()
    await flushFrame()

    expect(onProgress).not.toHaveBeenCalled()
  })
})

describe('useTTS replay with a cached (shared) synthesis buffer', () => {
  it('reuses the cached synthesis ArrayBuffer on replay without detaching it', async () => {
    // Model lib/tts/client's synthesis cache: the SAME ArrayBuffer instance is
    // handed to every caller for a given voice+text. `new Blob([buffer])`
    // COPIES, so — unlike the old decodeAudioData path, which detached its input
    // and needed a slice(0) dance — the cached buffer stays usable forever.
    const shared = new ArrayBuffer(8)
    vi.mocked(synthesizeSpeech).mockResolvedValue(shared)

    const { result } = renderHook(() => useTTS('Hello world.'))

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(srcAssignments).toHaveLength(1))

    // Replay (the play-from-here shape): stop() drops the blob cache, so play()
    // wraps the very same cached ArrayBuffer in a fresh Blob.
    await act(async () => {
      result.current.stop()
      await result.current.play()
    })
    await flushMicrotasks()
    await waitFor(() => expect(srcAssignments).toHaveLength(2))

    // byteLength 0 would mean the buffer had been detached.
    expect(shared.byteLength).toBe(8)
    expect(result.current.isPlaying).toBe(true)
  })
})

describe('useTTS units option', () => {
  it('plays the provided units in order instead of length-chunking the content', async () => {
    const units = ['Title unit', 'TLDR unit here.', 'Body chunk text.']

    const { result } = renderHook(() =>
      useTTS('prepared flattened content that would otherwise be one chunk', { units })
    )

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(srcAssignments).toHaveLength(1))

    // First synthesis is the tiny title unit, not the whole content.
    expect(vi.mocked(synthesizeSpeech).mock.calls[0][0]).toBe('Title unit')
    expect(result.current.totalChunks).toBe(3)
  })

  it('falls back to length-chunking when units is empty or omitted', async () => {
    const { result } = renderHook(() => useTTS('Just one sentence.', { units: [] }))

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(srcAssignments).toHaveLength(1))

    expect(vi.mocked(synthesizeSpeech).mock.calls[0][0]).toBe('Just one sentence.')
  })
})

describe('useTTS playFromUnit', () => {
  const units = ['a'.repeat(10), 'b'.repeat(20), 'c'.repeat(30)]

  it('starts playback at the requested unit index', async () => {
    const { result } = renderHook(() => useTTS('irrelevant content', { units }))

    await act(async () => {
      await result.current.playFromUnit(2)
    })
    await waitFor(() => expect(srcAssignments).toHaveLength(1))

    // The chunk list is initialised even though play() was never called, and the
    // first synthesis is the requested unit -- not unit 0.
    expect(vi.mocked(synthesizeSpeech).mock.calls[0][0]).toBe(units[2])
    expect(result.current.totalChunks).toBe(3)
    await waitFor(() => expect(result.current.currentChunkIndex).toBe(2))
  })

  it('seeds progress with the characters of the units it skipped', async () => {
    const onProgress = vi.fn()
    const { result } = renderHook(() => useTTS('irrelevant content', { units, onProgress }))

    await act(async () => {
      await result.current.playFromUnit(2)
    })
    await waitFor(() => expect(srcAssignments).toHaveLength(1))
    await flushFrame()

    // Units 0+1 = 30 of 60 total chars already behind us, unit 2 just started.
    expect(onProgress).toHaveBeenCalledWith(50)
  })

  it('clamps an out-of-range unit index instead of throwing', async () => {
    const { result } = renderHook(() => useTTS('irrelevant content', { units }))

    await act(async () => {
      await result.current.playFromUnit(99)
    })
    await waitFor(() => expect(srcAssignments).toHaveLength(1))
    expect(vi.mocked(synthesizeSpeech).mock.calls[0][0]).toBe(units[2])

    await act(async () => {
      result.current.stop()
      vi.mocked(synthesizeSpeech).mockClear()
      await result.current.playFromUnit(-5)
    })
    await waitFor(() => expect(srcAssignments).toHaveLength(2))
    expect(vi.mocked(synthesizeSpeech).mock.calls[0][0]).toBe(units[0])

    // Nothing to play at all: must resolve, not throw.
    const empty = renderHook(() => useTTS('', { units: [] }))
    await act(async () => {
      await expect(empty.result.current.playFromUnit(0)).resolves.toBeUndefined()
    })
  })

  it('clamps positive infinity to the last unit', async () => {
    const { result } = renderHook(() => useTTS('irrelevant content', { units }))

    await act(async () => {
      await result.current.playFromUnit(Number.POSITIVE_INFINITY)
    })
    await waitFor(() => expect(srcAssignments).toHaveLength(1))

    // +Infinity reads as "past the end", so it clamps to the LAST unit.
    expect(vi.mocked(synthesizeSpeech).mock.calls[0][0]).toBe(units[2])
    await waitFor(() => expect(result.current.currentChunkIndex).toBe(2))
  })

  it('treats NaN as the first unit', async () => {
    const { result } = renderHook(() => useTTS('irrelevant content', { units }))

    await act(async () => {
      await result.current.playFromUnit(Number.NaN)
    })
    await waitFor(() => expect(srcAssignments).toHaveLength(1))

    // NaN carries no position at all: fall back to unit 0.
    expect(vi.mocked(synthesizeSpeech).mock.calls[0][0]).toBe(units[0])
    await waitFor(() => expect(result.current.currentChunkIndex).toBe(0))
  })

  it('ignores a stale pause offset when jumping to a different unit', async () => {
    const { result } = renderHook(() => useTTS('irrelevant content', { units }))

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(srcAssignments).toHaveLength(1))

    // Pause mid-unit so pauseOffsetRef holds an offset into unit 0.
    mediaCurrentTime = 0.5
    act(() => {
      result.current.pause()
    })

    await act(async () => {
      await result.current.playFromUnit(2)
    })
    await flushMicrotasks()
    await waitFor(() => expect(srcAssignments).toHaveLength(2))

    // The new unit starts from its beginning, not 0.5s into the old one — a
    // resume would have reused the same src instead of assigning a new one.
    expect(currentAudio().currentTime).toBe(0)
    await waitFor(() => expect(result.current.currentChunkIndex).toBe(2))
  })
})

describe('useTTS chunk-synthesis failure recovery', () => {
  // Regression test: a stalled/failed chunk (edge-tts stream stall surviving
  // tts-client's own retry) used to stop playback outright via onError,
  // stranding the reader until the user manually pressed Play again. It must
  // now skip the unreadable chunk and continue automatically.
  it('skips a single failed chunk and continues playing the next one, without erroring', async () => {
    const units = ['ok-1', 'fail-2', 'ok-3']
    vi.mocked(synthesizeSpeech).mockImplementation(async (text: string) => {
      if (text === 'fail-2') throw new Error('stalled')
      return new ArrayBuffer(8)
    })
    const onError = vi.fn()
    const onComplete = vi.fn()

    const { result } = renderHook(() =>
      useTTS('irrelevant content', { units, onError, onComplete })
    )

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(srcAssignments).toHaveLength(1))
    expect(result.current.currentChunkIndex).toBe(0)

    // Unit 0 finishes: unit 1 fetches 'fail-2', fails, and — instead of
    // stopping — skips straight to unit 2 without the user doing anything.
    await endCurrentUnit()

    expect(onError).not.toHaveBeenCalled()
    await waitFor(() => expect(srcAssignments).toHaveLength(2))
    await waitFor(() => expect(result.current.currentChunkIndex).toBe(2))
    expect(result.current.isPlaying).toBe(true)

    // Unit 2 finishes normally: playback completes as if nothing failed.
    await endCurrentUnit()
    expect(onComplete).toHaveBeenCalledTimes(1)
    expect(result.current.isPlaying).toBe(false)
  })

  it('stops and reports onError once too many consecutive chunks fail in a row', async () => {
    const units = ['ok-1', 'fail-2', 'fail-3', 'fail-4', 'fail-5']
    vi.mocked(synthesizeSpeech).mockImplementation(async (text: string) => {
      if (text.startsWith('fail-')) throw new Error('stalled')
      return new ArrayBuffer(8)
    })
    const onError = vi.fn()

    const { result } = renderHook(() => useTTS('irrelevant content', { units, onError }))

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(srcAssignments).toHaveLength(1))

    // Unit 0 finishes; units 1-4 all fail. The first 3 failures skip
    // (consecutive count 1, 2, 3), the 4th exceeds the cap and stops instead
    // of silently skipping through every remaining unit.
    await endCurrentUnit()

    await waitFor(() => expect(onError).toHaveBeenCalledTimes(1))
    expect(result.current.isPlaying).toBe(false)
    // Never reached a unit that could actually play after unit 0.
    expect(srcAssignments).toHaveLength(1)
  })
})

/**
 * With one output path there is nothing left to silently fall back to, so every
 * way the element can refuse to produce sound has to reach the user. The failure
 * mode this whole suite guards against is silence with `isPlaying` stuck true.
 */
describe('useTTS media-element failure paths', () => {
  it('stops and reports onError when the element refuses to play', async () => {
    // What Safari/Chrome throw at an un-gestured start; also what a broken
    // element gives back once it has a source it cannot open.
    const refusal = new DOMException('play() was not allowed', 'NotAllowedError')
    audioPlay.mockImplementation(() => Promise.reject(refusal))
    const onError = vi.fn()

    const { result } = renderHook(() => useTTS('Hello world.', { onError }))

    await act(async () => {
      await result.current.play()
    })

    await waitFor(() => expect(onError).toHaveBeenCalledTimes(1))
    expect(onError).toHaveBeenCalledWith(refusal)
    // The rejection must clear the playing flag, or the UI shows a playing
    // reader over silence with no way to notice.
    await waitFor(() => expect(result.current.isPlaying).toBe(false))
    // The gesture-unlock poke at the top of play() rejects on this mock too; it
    // is a different call and must not be reported as a refused unit start.
    expect(onError).toHaveBeenCalledTimes(1)
  })

  it('treats an element error as a unit failure and continues with the next unit', async () => {
    const units = ['a'.repeat(10), 'b'.repeat(20), 'c'.repeat(30)]
    const onError = vi.fn()
    const onProgress = vi.fn()
    const { result } = renderHook(() =>
      useTTS('irrelevant content', { units, onError, onProgress })
    )

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(srcAssignments).toHaveLength(1))
    const failedUrl = srcAssignments[0]

    // Undecodable MP3 for unit 0: same treatment as a synthesis failure — skip
    // it, count it complete, keep playing.
    await failCurrentUnitInElement()

    expect(onError).not.toHaveBeenCalled()
    await waitFor(() => expect(srcAssignments).toHaveLength(2))
    await waitFor(() => expect(result.current.currentChunkIndex).toBe(1))
    expect(result.current.isPlaying).toBe(true)

    // The abandoned unit's object URL is released before moving on; the one the
    // element is now reading obviously is not.
    expect(revokeObjectURL).toHaveBeenCalledWith(failedUrl)
    expect(revokeObjectURL).not.toHaveBeenCalledWith(srcAssignments[1])

    // Unit 0's 10 of 60 characters are counted complete, so progress advances
    // past the unreadable unit instead of stalling on it.
    onProgress.mockClear()
    await flushFrame()
    expect(onProgress.mock.calls.at(-1)?.[0] as number).toBeCloseTo(100 / 6, 5)
  })

  it('stops and reports onError after too many consecutive element errors', async () => {
    const units = ['u0', 'u1', 'u2', 'u3', 'u4']
    const onError = vi.fn()
    const { result } = renderHook(() => useTTS('irrelevant content', { units, onError }))

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(srcAssignments).toHaveLength(1))

    // Every unit synthesizes fine but the element rejects all of them — a
    // systemic decode failure, not one bad paragraph. Skips 1, 2 and 3 are
    // tolerated; the 4th exceeds MAX_CONSECUTIVE_CHUNK_FAILURES and stops.
    for (let i = 0; i < 4; i += 1) await failCurrentUnitInElement()

    await waitFor(() => expect(onError).toHaveBeenCalledTimes(1))
    expect(result.current.isPlaying).toBe(false)
    // Units 0-3 were attempted; unit 4 was never reached.
    expect(srcAssignments).toHaveLength(4)

    // Giving up ends the session, so nothing it created may outlive it.
    const revoked = new Set(revokeObjectURL.mock.calls.map(([url]) => url as string))
    expect([...revoked].sort()).toEqual([...new Set(createdUrls)].sort())
  })

  /**
   * iOS/WebKit gates `play()` on the user-gesture task itself (Chrome for
   * Android does not: its gate is sticky user activation, which survives for the
   * document's lifetime). The first per-unit `play()` happens after
   * `await fetchAudioBlob(...)`, i.e. in a later task, so without an in-gesture
   * poke at the element it would reject with NotAllowedError — and the spec
   * delta's claim that Apple browsers are no longer carved out would be false.
   */
  it('unlocks the element inside the user gesture before awaiting synthesis', async () => {
    let resolveSynthesis: ((buffer: ArrayBuffer) => void) | undefined
    vi.mocked(synthesizeSpeech).mockImplementation(
      () => new Promise<ArrayBuffer>((resolve) => { resolveSynthesis = resolve })
    )

    const { result } = renderHook(() => useTTS('Hello world.'))

    let started: Promise<void> | undefined
    act(() => {
      started = result.current.play()
    })

    // Still inside the gesture task: nothing has been synthesized or assigned
    // yet, but the element has already been played (and left silent).
    expect(audioPlay).toHaveBeenCalledTimes(1)
    expect(audioPause).toHaveBeenCalledTimes(1)
    expect(currentAudio().getAttribute('src')).toBeNull()
    expect(srcAssignments).toHaveLength(0)

    await act(async () => {
      resolveSynthesis?.(new ArrayBuffer(8))
      await started
    })
    await waitFor(() => expect(srcAssignments).toHaveLength(1))

    // The real unit start is a separate call, on an element the gesture already
    // unlocked.
    expect(audioPlay.mock.calls.length).toBeGreaterThan(1)
  })

  it('does not count a unit as complete when ended fires after pause', async () => {
    const units = ['a'.repeat(10), 'b'.repeat(30)]
    const onProgress = vi.fn()
    const { result } = renderHook(() =>
      useTTS('irrelevant content', { units, onProgress })
    )

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(srcAssignments).toHaveLength(1))

    mediaCurrentTime = 0.5
    act(() => {
      result.current.pause()
    })

    // Structural, not merely guarded: an abandoned unit's handler is detached,
    // so a late `ended` cannot run at all.
    expect(currentAudio().onended).toBeNull()

    await endCurrentUnit()
    expect(srcAssignments).toHaveLength(1)

    // Resume mid-unit: progress is half of unit 0 (10 chars of 40) = 12.5%. If
    // the stale `ended` had counted unit 0 complete it would read 37.5%.
    onProgress.mockClear()
    await act(async () => {
      await result.current.play()
    })
    await flushFrame()
    expect(onProgress.mock.calls.at(-1)?.[0] as number).toBeCloseTo(12.5, 5)
  })

  it('restarts the progress loop after recovering from the failure cap', async () => {
    const units = ['ok-1', 'fail-2', 'fail-3', 'fail-4', 'fail-5']
    vi.mocked(synthesizeSpeech).mockImplementation(async (text: string) => {
      if (text.startsWith('fail-')) throw new Error('stalled')
      return new ArrayBuffer(8)
    })
    const onError = vi.fn()
    const onProgress = vi.fn()
    const { result } = renderHook(() =>
      useTTS('irrelevant content', { units, onError, onProgress })
    )

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(srcAssignments).toHaveLength(1))

    await endCurrentUnit()
    await waitFor(() => expect(onError).toHaveBeenCalledTimes(1))
    expect(result.current.isPlaying).toBe(false)

    // The outage clears and the user presses Play again.
    vi.mocked(synthesizeSpeech).mockImplementation(async () => new ArrayBuffer(8))
    frameCallbacks = []
    onProgress.mockClear()

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(srcAssignments).toHaveLength(2))

    // A frame handle left behind by the give-up path would make playChunk's
    // `if (!animationFrameRef.current)` skip re-arming the loop, killing
    // onProgress — and with it the reader's prefetch threshold — for the rest
    // of the session.
    expect(frameCallbacks).not.toHaveLength(0)
    await flushFrame()
    expect(onProgress).toHaveBeenCalled()
  })
})

/**
 * Behaviors that were already correct but that nothing pinned — a reviewer's
 * mutants survived the whole suite. Each test below is the mutation-kill for one
 * of them.
 */
describe('useTTS object-URL lifecycle and progress accumulation', () => {
  it('revokes each consumed unit\'s object URL and never the one now playing', async () => {
    const units = ['a'.repeat(10), 'b'.repeat(10), 'c'.repeat(10)]
    const { result } = renderHook(() => useTTS('irrelevant content', { units }))

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(srcAssignments).toHaveLength(1))

    await endCurrentUnit()
    await waitFor(() => expect(srcAssignments).toHaveLength(2))
    await endCurrentUnit()
    await waitFor(() => expect(srcAssignments).toHaveLength(3))

    // Units 0 and 1 are behind the playhead: their URLs are released as the
    // element moves on, which is the only thing keeping a Read All News session
    // from retaining every paragraph's audio for the whole article.
    expect(revokeObjectURL).toHaveBeenCalledWith(srcAssignments[0])
    expect(revokeObjectURL).toHaveBeenCalledWith(srcAssignments[1])
    // The URL the element is reading right now must survive — revoking it would
    // pull the media out from under the current unit.
    expect(revokeObjectURL).not.toHaveBeenCalledWith(srcAssignments[2])
    expect(currentAudio().getAttribute('src')).toBe(srcAssignments[2])
  })

  it('reads an unknown (NaN) duration as "just started" instead of emitting NaN', async () => {
    const units = ['a'.repeat(10), 'b'.repeat(30)]
    const onProgress = vi.fn()
    const { result } = renderHook(() =>
      useTTS('irrelevant content', { units, onProgress })
    )

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(srcAssignments).toHaveLength(1))

    await endCurrentUnit()
    await waitFor(() => expect(srcAssignments).toHaveLength(2))

    // Unit 1 has just been assigned and has no metadata yet — the real state of
    // the element for a beat after EVERY swap.
    onProgress.mockClear()
    clearDurationMetadata()
    await emitTimeUpdate(0.4)

    // 10 of 40 characters are behind us and the new unit counts as 0% until its
    // duration is known. A NaN here would poison the continuous reader's
    // prefetch threshold (every comparison against it is false), silently
    // stopping the prefetch ladder.
    const emitted = onProgress.mock.calls.at(-1)?.[0] as number
    expect(Number.isNaN(emitted)).toBe(false)
    expect(emitted).toBeCloseTo(25, 5)
    expect(Number.isNaN(result.current.progress)).toBe(false)
    expect(result.current.progress).toBeCloseTo(25, 5)
  })

  it('accumulates completed characters across units as each one finishes', async () => {
    // 10 + 20 + 70 = 100 characters, so progress reads directly as a percentage.
    const units = ['a'.repeat(10), 'b'.repeat(20), 'c'.repeat(70)]
    const onProgress = vi.fn()
    const { result } = renderHook(() =>
      useTTS('irrelevant content', { units, onProgress })
    )

    const progressNow = async () => {
      onProgress.mockClear()
      await flushFrame()
      return onProgress.mock.calls.at(-1)?.[0] as number
    }

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(srcAssignments).toHaveLength(1))

    // Nothing finished yet.
    expect(await progressNow()).toBeCloseTo(0, 5)

    await endCurrentUnit()
    await waitFor(() => expect(result.current.currentChunkIndex).toBe(1))
    expect(await progressNow()).toBeCloseTo(10, 5)

    // The second unit ADDS to the first — a per-unit assignment instead of an
    // accumulation would read 20 here and the bar would jump backwards.
    await endCurrentUnit()
    await waitFor(() => expect(result.current.currentChunkIndex).toBe(2))
    expect(await progressNow()).toBeCloseTo(30, 5)
  })

  it('leaves the element src in place when paused', async () => {
    const { result } = renderHook(() => useTTS('Hello world.'))

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(srcAssignments).toHaveLength(1))

    mediaCurrentTime = 0.4
    act(() => {
      result.current.pause()
    })

    // A pause must not drop the source: clearing it would rewind the unit, throw
    // away the buffered media and tear down the OS media session the notification
    // and car head unit are attached to.
    expect(currentAudio().getAttribute('src')).toBe(srcAssignments[0])
    expect(currentAudio().getAttribute('src')).toMatch(/^blob:/)
  })
})
