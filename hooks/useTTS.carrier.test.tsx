import { act, cleanup, renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useTTS } from './useTTS'
import { synthesizeSpeech } from '@/lib/tts/client'
import { createSrcSwapCarrier } from '@/lib/reader/src-swap-carrier'

/**
 * What `useTTS` owes the CARRIER, as opposed to what it does with the audio.
 *
 * Three couplings live on this seam and none of them are visible from either
 * side alone: the reporter the carrier calls back into has to be the CURRENT
 * unit's (`reportStartRef`), the retention window handed to the carrier has to
 * be the hook's own prefetch depth, and the element source `rebuild()`
 * deliberately leaves alone has to be dropped by `stop()`. Each one can be
 * broken without a single assertion in `useTTS.test.tsx` moving.
 */

// Mock the synthesis client so no real network / edge-tts is touched.
vi.mock('@/lib/tts/client', () => ({
  synthesizeSpeech: vi.fn(async () => new ArrayBuffer(8)),
  prefetchSpeech: vi.fn(),
}))

// The real carrier, behind a spy — the options it is CONSTRUCTED with are half
// of what this file is about, and they are otherwise unobservable.
vi.mock('@/lib/reader/src-swap-carrier', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/reader/src-swap-carrier')>()
  return {
    createSrcSwapCarrier: vi.fn(actual.createSrcSwapCarrier),
  }
})

// Every value assigned to element.src, in order. One entry === one unit start.
let srcAssignments: string[] = []
let createdUrls: string[] = []
let audioPlay: ReturnType<typeof vi.fn>
let audioPause: ReturnType<typeof vi.fn>
let audioLoad: ReturnType<typeof vi.fn>
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

const flushMicrotasks = () => act(async () => { await Promise.resolve() })

const currentAudio = () => document.querySelectorAll('audio')[0] as HTMLAudioElement

/** The options the hook constructed its one carrier with. */
const carrierOptions = () =>
  vi.mocked(createSrcSwapCarrier).mock.calls[0][0]

/** Unit indices whose text has been handed to synthesis, in call order. */
const synthesisedIndices = (units: string[]) =>
  vi.mocked(synthesizeSpeech).mock.calls.map(([text]) => units.indexOf(text as string))

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
      mediaCurrentTime = 0
      this.setAttribute('src', value)
    },
  })

  URL.createObjectURL = vi.fn(() => {
    const url = `blob:mock/${createdUrls.length}`
    createdUrls.push(url)
    return url
  }) as unknown as typeof URL.createObjectURL
  URL.revokeObjectURL = vi.fn() as unknown as typeof URL.revokeObjectURL

  vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
    frameCallbacks.push(cb)
    return frameCallbacks.length
  })
  vi.stubGlobal('cancelAnimationFrame', vi.fn())

  vi.mocked(createSrcSwapCarrier).mockClear()
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

describe('useTTS carrier seam', () => {
  it('reports a refused start on a LATER unit through that unit\'s own guards', async () => {
    /**
     * The carrier is built once, at mount, so the reporter it calls back into
     * reaches the hook through a ref that every unit rebinds. What the ref buys
     * is freshness: the reporter carries the generation and the abort signal of
     * the call that installed it, and those decide whether a refusal is a real
     * failure or a leftover from a superseded session.
     *
     * Rebound only on the first unit, the reporter still fires — its `catch` is
     * still attached — but it judges unit 2's refusal against generation 1 and
     * an already-aborted signal, sees a superseded session, and suppresses it.
     * The user is then left with a silent reader still showing "playing", which
     * is the exact failure the report exists to prevent.
     *
     * `playFromUnit` is what makes the staleness observable at all: chaining on
     * `ended` reuses the same generation and signal, so a stale reporter and a
     * fresh one answer identically. An interrupting skip does not.
     */
    const units = ['a'.repeat(10), 'b'.repeat(10), 'c'.repeat(10)]
    const onError = vi.fn()
    const { result } = renderHook(() => useTTS('irrelevant content', { units, onError }))

    // Unit 0 starts cleanly — this is what binds the reporter under the FIRST
    // generation.
    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(srcAssignments).toHaveLength(1))
    expect(onError).not.toHaveBeenCalled()

    // An interrupting skip: a new generation, a new abort signal, a unit that
    // is not unit 0 — and an element that now refuses.
    const refusal = new DOMException('play() was not allowed', 'NotAllowedError')
    audioPlay.mockImplementation(() => Promise.reject(refusal))

    await act(async () => {
      await result.current.playFromUnit(2)
    })
    await waitFor(() => expect(srcAssignments).toHaveLength(2))

    await waitFor(() => expect(onError).toHaveBeenCalledTimes(1))
    expect(onError).toHaveBeenCalledWith(refusal)
    await waitFor(() => expect(result.current.isPlaying).toBe(false))
  })

  it('gives the carrier a retention window equal to its own prefetch depth', async () => {
    /**
     * The window and the prefetch depth are the same number (`BUFFER_AHEAD`) and
     * must stay that way: a shorter window revokes a unit the prefetcher warmed
     * moments ago, a longer one retains audio nobody will play. Asserting the
     * literal 3 would pin the constant and not the coupling, so the depth is
     * MEASURED from what the hook actually fetches ahead of the playhead and the
     * carrier's option is compared against that.
     */
    const units = Array.from({ length: 8 }, (_, i) => `unit ${i} text`)
    const { result } = renderHook(() => useTTS('irrelevant content', { units }))

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(srcAssignments).toHaveLength(1))
    // The prefetch loops are issued synchronously off play() and playChunk; one
    // settling turn is enough for every fetch to have been requested.
    await flushMicrotasks()
    await flushMicrotasks()

    const fetched = synthesisedIndices(units)
    expect(fetched).not.toContain(-1)
    // Unit 0 is playing, so the furthest unit fetched IS the depth kept ahead.
    const prefetchDepth = Math.max(...fetched)
    expect(prefetchDepth).toBeGreaterThan(0)
    expect(prefetchDepth).toBeLessThan(units.length - 1)

    expect(vi.mocked(createSrcSwapCarrier)).toHaveBeenCalledTimes(1)
    expect(carrierOptions().retainAhead).toBe(prefetchDepth)
  })

  it('clears the element source on stop, which the carrier rebuild never does', async () => {
    /**
     * The asymmetry the two halves of this design rest on. `rebuild()` leaves
     * `src` alone because completion and the give-up path rebuild too, with the
     * finished unit still loaded and its handlers still attached — clearing it
     * there would run the media load algorithm and fire `emptied`/`error` at
     * them. `stop()` is the one path that means it, and it has to do it itself:
     * the audio behind that URL is revoked a line later, and an element left
     * pointed at a dead blob keeps a source it can only fail on.
     */
    const { result } = renderHook(() => useTTS('Hello world.'))

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(srcAssignments).toHaveLength(1))
    const element = currentAudio()
    expect(element.getAttribute('src')).toMatch(/^blob:/)

    act(() => {
      result.current.stop()
    })

    expect(element.hasAttribute('src')).toBe(false)
    expect(element.src).toBe('')
  })
})
