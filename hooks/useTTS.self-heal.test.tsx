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
 * How `useTTS` recovers when the MSE carrier's buffer runs dry mid-article —
 * and the session bookkeeping that recovery depends on.
 *
 * The harness is the mocked-`MediaSource` one from `useTTS.mse.test.tsx`
 * (unit k occupies [10k, 10k + 10)); synthesis is held per call so each test
 * decides exactly when — and in which session — a unit's bytes arrive.
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
 *
 * `refuse` models the one failure only this carrier has: a `SourceBuffer` that
 * rejects an append and poisons its own queue. The real one rejects the promise
 * `appendUnits` returns, which is exactly what this does.
 */
const mse = vi.hoisted(() => ({
  available: true,
  spanSeconds: 10,
  created: 0,
  appended: [] as number[],
  refuse: [] as number[],
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
        if (mse.refuse.includes(index)) {
          throw new Error(`[mock] SourceBuffer refused unit ${index}`)
        }
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

/**
 * Fire `waiting` with the playhead at `currentTime` — the element saying it ran
 * out of decodable data THERE. No `timeupdate` accompanies it, and that is the
 * point: a starved element's clock stops, and this is the last thing it says.
 */
const emitWaiting = async (currentTime: number) => {
  mediaCurrentTime = currentTime
  await act(async () => {
    currentAudio().dispatchEvent(new Event('waiting'))
    for (let i = 0; i < 6; i += 1) await Promise.resolve()
  })
}

/**
 * Fire the element's `error` event — the browser saying "these bytes are
 * unusable". It is the one way into the hook's unit-failure chain that does not
 * need a boundary crossing, and therefore the only way to reach `playChunk` for
 * a unit the MSE buffer does not hold.
 */
const failCurrentUnitInElement = async (turns = 8) => {
  await act(async () => {
    currentAudio().dispatchEvent(new Event('error'))
    for (let i = 0; i < turns; i += 1) await Promise.resolve()
  })
}

const enableLog = () => window.localStorage.setItem(READER_LOG_FLAG, '1')
const firstOfType = (type: ReaderLogEntry['type']) =>
  readReaderLog().find((entry) => entry.type === type)
const entriesOfType = (type: ReaderLogEntry['type']) =>
  readReaderLog().filter((entry) => entry.type === type)

/** Three units of ten characters each — so a unit is exactly a third of the article. */
/** Five units of ten characters each — enough to leave a window beyond BUFFER_AHEAD. */
const UNITS = ['a', 'b', 'c', 'd', 'e'].map((ch) => ch.repeat(10))

/**
 * Synthesis held per CALL, not per text. The real client dedupes identical
 * text onto one in-flight promise; what these tests care about is how many
 * times the hook ASKED, and which request's settlement it acts on, so every
 * call gets its own deferred. Texts not in `held` resolve at once.
 */
const holdSynthesis = (held: string[]) => {
  const pending = new Map<string, Array<{ resolve: (audio: ArrayBuffer) => void }>>()
  vi.mocked(synthesizeSpeech).mockImplementation(async (text: string) => {
    if (!held.includes(text)) return new ArrayBuffer(8)
    return new Promise<ArrayBuffer>((resolve) => {
      const list = pending.get(text) ?? []
      list.push({ resolve })
      pending.set(text, list)
    })
  })
  return {
    /** How many times synthesis was asked for `text`. */
    calls: (text: string) =>
      vi.mocked(synthesizeSpeech).mock.calls.filter(([t]) => t === text).length,
    /** Settle the `nth` (0-based) request for `text`. */
    release: async (text: string, nth: number) => {
      const entry = pending.get(text)?.[nth]
      if (!entry) throw new Error(`[test] no request #${nth} for ${text}`)
      entry.resolve(new ArrayBuffer(8))
      await settle()
    },
  }
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
  mse.refuse = []
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

describe('useTTS in-flight synthesis across sessions', () => {
  it('re-requests units that were in flight across a pause and appends each once', async () => {
    /**
     * A pause aborts the session's signal, so every request still in flight is
     * dropped when it settles. If the resumed session still took those units
     * for "already coming", nobody would ever append them: the buffer would
     * run dry at the first of them, silently.
     */
    const synth = holdSynthesis([UNITS[2], UNITS[3]])
    const { result } = renderHook(() => useTTS('irrelevant content', { units: UNITS }))

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(mse.appended).toEqual([0, 1]))
    await settle()
    expect(synth.calls(UNITS[2])).toBe(1)
    expect(synth.calls(UNITS[3])).toBe(1)

    act(() => {
      result.current.pause()
    })
    await act(async () => {
      await result.current.play()
    })
    await settle()

    // The resumed session asked again for both units it did not have.
    expect(synth.calls(UNITS[2])).toBe(2)
    expect(synth.calls(UNITS[3])).toBe(2)

    // Old requests settle first: they belong to an aborted session and are
    // dropped. The new ones then carry the bytes, each appended exactly once.
    await synth.release(UNITS[2], 0)
    await synth.release(UNITS[3], 0)
    expect(mse.appended).toEqual([0, 1])
    await synth.release(UNITS[2], 1)
    await synth.release(UNITS[3], 1)
    await waitFor(() => expect(mse.appended).toEqual([0, 1, 2, 3]))
  })

  it("an old session's settling request does not clear the new session's in-flight marker", async () => {
    /**
     * The old request settling must only ever touch the set it registered in.
     * Were it to delete from whatever set is current, the next fillBuffer pass
     * would see unit k as neither held nor coming and request it a third time.
     */
    const synth = holdSynthesis([UNITS[2], UNITS[3]])
    const { result } = renderHook(() => useTTS('irrelevant content', { units: UNITS }))

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(mse.appended).toEqual([0, 1]))
    await settle()

    act(() => {
      result.current.pause()
    })
    await act(async () => {
      await result.current.play()
    })
    await settle()
    expect(synth.calls(UNITS[2])).toBe(2)

    // The previous session's requests settle while the new ones are in flight.
    await synth.release(UNITS[2], 0)
    await synth.release(UNITS[3], 0)

    // Crossing into unit 1 runs fillBuffer over [2, 5).
    await emitTimeUpdate(12)
    expect(result.current.currentChunkIndex).toBe(1)
    expect(synth.calls(UNITS[4])).toBe(1)
    expect(synth.calls(UNITS[2])).toBe(2)
    expect(synth.calls(UNITS[3])).toBe(2)
  })
})
