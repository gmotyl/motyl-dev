import { act, cleanup, renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useTTS } from './useTTS'
import { restartStalledSynthesis, synthesizeSpeech } from '@/lib/tts/client'
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
  restartStalledSynthesis: vi.fn(() => false),
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
  const pending = new Map<
    string,
    Array<{ resolve: (audio: ArrayBuffer) => void; reject: (error: Error) => void }>
  >()
  vi.mocked(synthesizeSpeech).mockImplementation(async (text: string) => {
    if (!held.includes(text)) return new ArrayBuffer(8)
    return new Promise<ArrayBuffer>((resolve, reject) => {
      const list = pending.get(text) ?? []
      list.push({ resolve, reject })
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
    /**
     * Reject the `nth` (0-based) request for `text` with a real synthesis
     * error — not an abort. `synthesizeSpeech` is never handed the session's
     * signal, so a request outliving its session can still end this way.
     */
    fail: async (text: string, nth: number) => {
      const entry = pending.get(text)?.[nth]
      if (!entry) throw new Error(`[test] no request #${nth} for ${text}`)
      entry.reject(new Error(`[test] synthesis failed for ${text}`))
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

/**
 * The production shape of a starve: a unit's prefetch failed while the element
 * was still playing buffered media, so it only warned and held its place —
 * nothing asks for it again until the playhead reaches it, and on one
 * continuous timeline the playhead never does: the element runs out of data at
 * the end of what was appended and says `waiting`, once.
 *
 * `failFirst` texts reject on their FIRST request only; every later request
 * follows `held` (deferred) or resolves at once.
 */
const starveSetup = (options: { failFirst: string[]; held: string[] }) => {
  const synth = holdSynthesis(options.held)
  const heldImpl = vi.mocked(synthesizeSpeech).getMockImplementation()!
  const failed = new Set<string>()
  vi.mocked(synthesizeSpeech).mockImplementation(async (text: string, opts) => {
    if (options.failFirst.includes(text) && !failed.has(text)) {
      failed.add(text)
      throw new Error(`[test] synthesis failed for ${text}`)
    }
    return heldImpl(text, opts)
  })
  return synth
}

const synthStartLines = () =>
  entriesOfType('synth-start').map((entry) => entry.detail)

describe('useTTS starved state — refill on entry', () => {
  it('a mid-article waiting after a live tick refills the read-ahead window', async () => {
    enableLog()
    // Unit 1's prefetch fails; 2 and 3 stay in flight. Only unit 0 is appended.
    const synth = starveSetup({ failFirst: [UNITS[1]], held: [UNITS[1], UNITS[2], UNITS[3]] })
    const { result } = renderHook(() => useTTS('irrelevant content', { units: UNITS }))

    await act(async () => {
      await result.current.play()
    })
    await settle()
    expect(mse.appended).toEqual([0])
    expect(synth.calls(UNITS[1])).toBe(1)

    await emitTimeUpdate(5)
    await emitWaiting(10)

    expect(entriesOfType('starved').map((entry) => entry.detail)).toEqual(['0'])
    // The unit nobody was going to ask for again is asked for; the ones still
    // in flight are not asked for twice.
    expect(synth.calls(UNITS[1])).toBe(2)
    expect(synth.calls(UNITS[2])).toBe(1)
    expect(synth.calls(UNITS[3])).toBe(1)
    expect(result.current.isPlaying).toBe(true)

    await synth.release(UNITS[1], 0)
    await waitFor(() => expect(mse.appended).toEqual([0, 1]))
  })

  it('marks a self-heal synthesis request as a retry', async () => {
    enableLog()
    starveSetup({ failFirst: [UNITS[1]], held: [UNITS[1], UNITS[2], UNITS[3]] })
    const { result } = renderHook(() => useTTS('irrelevant content', { units: UNITS }))

    await act(async () => {
      await result.current.play()
    })
    await settle()
    // The ordinary read-ahead is unmarked.
    expect(synthStartLines()).toEqual([
      '0: visible',
      '1: visible',
      '2: visible',
      '3: visible',
    ])

    await emitTimeUpdate(5)
    await emitWaiting(10)

    expect(synthStartLines().slice(4)).toEqual(['1: visible (retry)'])
  })

  it('a second waiting while starved requests nothing twice', async () => {
    enableLog()
    const synth = starveSetup({ failFirst: [UNITS[1]], held: [UNITS[1], UNITS[2], UNITS[3]] })
    const { result } = renderHook(() => useTTS('irrelevant content', { units: UNITS }))

    await act(async () => {
      await result.current.play()
    })
    await settle()
    await emitTimeUpdate(5)
    await emitWaiting(10)
    await emitWaiting(10)

    expect(entriesOfType('starved')).toHaveLength(1)
    expect(synth.calls(UNITS[1])).toBe(2)
    expect(synthStartLines().filter((line) => line?.endsWith('(retry)'))).toHaveLength(1)

    // The refill lands and the playhead moves on past where it starved: the
    // state is over, so the next dry buffer is a starvation of its own.
    await synth.release(UNITS[1], 0)
    await waitFor(() => expect(mse.appended).toEqual([0, 1]))
    await emitTimeUpdate(12)
    expect(result.current.currentChunkIndex).toBe(1)
    await emitWaiting(20)

    expect(entriesOfType('starved').map((entry) => entry.detail)).toEqual(['0', '1'])
  })

  it('the start-up waiting is not a starvation', async () => {
    enableLog()
    const synth = starveSetup({ failFirst: [UNITS[1]], held: [UNITS[1], UNITS[2], UNITS[3]] })
    const { result } = renderHook(() => useTTS('irrelevant content', { units: UNITS }))

    await act(async () => {
      await result.current.play()
    })
    await settle()
    // Every start produces one, before the element has played a frame.
    await emitWaiting(0)

    expect(entriesOfType('starved')).toHaveLength(0)
    expect(synth.calls(UNITS[1])).toBe(1)
    expect(synthStartLines().filter((line) => line?.endsWith('(retry)'))).toHaveLength(0)
  })

  it('a session that ended in an error does not hand its starvation to the next one', async () => {
    enableLog()
    // Synthesis fails for every text in `failing`, on every request, until the
    // test takes it out.
    const failing = new Set([UNITS[1], UNITS[2], UNITS[3], UNITS[4]])
    vi.mocked(synthesizeSpeech).mockImplementation(async (text: string) => {
      if (failing.has(text)) throw new Error(`[test] synthesis failed for ${text}`)
      return new ArrayBuffer(8)
    })
    const { result } = renderHook(() => useTTS('irrelevant content', { units: UNITS }))

    await act(async () => {
      await result.current.play()
    })
    await settle()
    expect(mse.appended).toEqual([0])

    // Session 1 starves at 10 s, and its refill fails too — and every retry
    // of it: the failure streak passes its cap and the session ends in an
    // error, still starved.
    await emitTimeUpdate(5)
    await emitWaiting(10)
    expect(entriesOfType('starved').map((entry) => entry.detail)).toEqual(['0'])
    await settle(20)
    expect(entriesOfType('stop-with-error')).toHaveLength(1)
    expect(result.current.isPlaying).toBe(false)

    // The outage is over — except for one prefetch of the new session. Units
    // 2 and 3 stay in flight, so the timeline ends with the resumed unit.
    failing.clear()
    let unit1Failures = 1
    vi.mocked(synthesizeSpeech).mockImplementation(async (text: string) => {
      if (text === UNITS[1] && unit1Failures > 0) {
        unit1Failures -= 1
        throw new Error(`[test] synthesis failed for ${text}`)
      }
      if (text === UNITS[2] || text === UNITS[3]) return new Promise<ArrayBuffer>(() => {})
      return new ArrayBuffer(8)
    })
    const retriesBefore = synthStartLines().filter((line) => line?.endsWith('(retry)')).length

    await act(async () => {
      await result.current.play()
    })
    await settle()
    const resumedAt = result.current.currentChunkIndex
    expect(mse.appended).toEqual([resumedAt])

    // Session 2 plays, but never past where session 1 starved — and then it
    // starves on its own account. That is a starvation, and the unit nobody
    // will ask for again is asked for.
    await emitTimeUpdate(5)
    await emitWaiting(10)

    expect(entriesOfType('starved').map((entry) => entry.detail)).toEqual([
      '0',
      String(resumedAt),
    ])
    expect(synthStartLines().filter((line) => line?.endsWith('(retry)')).length).toBe(
      retriesBefore + 1
    )
    expect(synthStartLines().at(-1)).toBe(`${resumedAt + 1}: visible (retry)`)
  })

  it('waiting at the end of the article still completes it without a retry', async () => {
    enableLog()
    const units = UNITS.slice(0, 3)
    const onComplete = vi.fn()
    const { result } = renderHook(() =>
      useTTS('irrelevant content', { units, onComplete })
    )

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(mse.appended).toEqual([0, 1, 2]))
    await emitTimeUpdate(5)
    await emitTimeUpdate(15)
    await emitTimeUpdate(25)
    await emitWaiting(30)

    expect(onComplete).toHaveBeenCalledTimes(1)
    expect(result.current.isPlaying).toBe(false)
    expect(entriesOfType('unit-ended').map((entry) => entry.detail)).toContain('2: starved')
    // THIS is the assertion that does the work. A retry assertion would be
    // vacuous here: a misread starvation at the end refills from the unit past
    // the last one, and `fillBuffer` has nothing to request there, so no
    // `(retry)` line could appear whatever the hook did.
    expect(entriesOfType('starved')).toHaveLength(0)
  })

  it('pausing ends the starved state', async () => {
    enableLog()
    starveSetup({ failFirst: [UNITS[1]], held: [UNITS[1], UNITS[2], UNITS[3]] })
    const { result } = renderHook(() => useTTS('irrelevant content', { units: UNITS }))

    await act(async () => {
      await result.current.play()
    })
    await settle()
    await emitTimeUpdate(5)
    await emitWaiting(10)
    expect(entriesOfType('starved').map((entry) => entry.detail)).toEqual(['0'])

    act(() => {
      result.current.pause()
    })
    await act(async () => {
      await result.current.play()
    })
    await settle()

    // The resumed session plays, never past where the paused one starved, and
    // runs dry again: that is its own starvation, not the old one continuing.
    await emitTimeUpdate(9.5)
    await emitWaiting(10)

    expect(entriesOfType('starved').map((entry) => entry.detail)).toEqual(['0', '0'])
  })

  it('a completed section does not carry its starvation into the next', async () => {
    /**
     * The next session here is a replay of the same section: the hand-off to a
     * NEW section goes through `stop()`, which clears the state on its own, so
     * only a replay leaves completion (and the session seat in `play()`) as
     * the one thing between the old starvation and the new session.
     */
    enableLog()
    const units = UNITS.slice(0, 3)
    const synth = starveSetup({ failFirst: [units[2]], held: [units[2]] })
    const { result } = renderHook(() => useTTS('irrelevant content', { units }))

    await act(async () => {
      await result.current.play()
    })
    await settle()
    expect(mse.appended).toEqual([0, 1])

    // Starves at 20 s on the last unit; the refill lands, and the element runs
    // straight through to the end of the section without a tick past 20 — the
    // hidden page that skips ticks is exactly this.
    await emitTimeUpdate(5)
    await emitTimeUpdate(15)
    await emitWaiting(20)
    expect(entriesOfType('starved').map((entry) => entry.detail)).toEqual(['1'])
    await synth.release(units[2], 0)
    await waitFor(() => expect(mse.appended).toEqual([0, 1, 2]))
    await emitWaiting(30)
    expect(result.current.isPlaying).toBe(false)
    expect(result.current.progress).toBe(100)

    // The replay loses unit 1's prefetch once (unit 2 stays in flight, so the
    // timeline ends with unit 0), and starves short of 20 s: a starvation of
    // its own.
    let unit1Failures = 1
    vi.mocked(synthesizeSpeech).mockImplementation(async (text: string) => {
      if (text === units[1] && unit1Failures > 0) {
        unit1Failures -= 1
        throw new Error(`[test] synthesis failed for ${text}`)
      }
      if (text === units[2]) return new Promise<ArrayBuffer>(() => {})
      return new ArrayBuffer(8)
    })
    await act(async () => {
      await result.current.play()
    })
    await settle()
    expect(mse.appended).toEqual([0])
    await emitTimeUpdate(5)
    await emitWaiting(10)

    expect(entriesOfType('starved').map((entry) => entry.detail)).toEqual(['1', '0'])
    expect(synthStartLines().at(-1)).toBe('1: visible (retry)')
  })
})

/** The page turning visible (screen on): the state flips, then the event fires. */
const emitVisible = async () => {
  vi.spyOn(document, 'visibilityState', 'get').mockReturnValue('visible')
  await act(async () => {
    document.dispatchEvent(new Event('visibilitychange'))
    for (let i = 0; i < 4; i += 1) await Promise.resolve()
  })
}

describe('useTTS starved state — restart on wake', () => {
  it('waking the screen while starved restarts a dead synthesis', async () => {
    enableLog()
    starveSetup({ failFirst: [UNITS[1]], held: [UNITS[1], UNITS[2], UNITS[3]] })
    const { result } = renderHook(() => useTTS('irrelevant content', { units: UNITS }))

    await act(async () => {
      await result.current.play()
    })
    await settle()
    await emitTimeUpdate(5)
    await emitWaiting(10)
    expect(entriesOfType('starved').map((entry) => entry.detail)).toEqual(['0'])

    // The running attempt had no first byte: the client expired it.
    vi.mocked(restartStalledSynthesis).mockReturnValueOnce(true)
    await emitVisible()
    expect(restartStalledSynthesis).toHaveBeenCalledTimes(1)
    expect(entriesOfType('restart-on-wake').map((entry) => entry.detail)).toEqual(['0'])

    // Still starved, but the running attempt already streams: nothing to restart.
    vi.mocked(restartStalledSynthesis).mockReturnValueOnce(false)
    await emitVisible()
    expect(restartStalledSynthesis).toHaveBeenCalledTimes(2)
    expect(entriesOfType('restart-on-wake').map((entry) => entry.detail)).toEqual([
      '0',
      'none',
    ])
  })

  it('waking the screen while playing buffered audio restarts nothing', async () => {
    enableLog()
    starveSetup({ failFirst: [], held: [UNITS[2], UNITS[3]] })
    const { result, unmount } = renderHook(() => useTTS('irrelevant content', { units: UNITS }))

    await act(async () => {
      await result.current.play()
    })
    await settle()
    await emitTimeUpdate(5)

    await emitVisible()
    expect(restartStalledSynthesis).not.toHaveBeenCalled()
    expect(entriesOfType('restart-on-wake')).toEqual([])

    // Unmounted, the hook listens to nothing.
    unmount()
    await emitVisible()
    expect(restartStalledSynthesis).not.toHaveBeenCalled()
  })

  it('unmounting removes the wake listener it added', async () => {
    // Neither behaviour test can see a leaked listener: unmount runs `stop()`,
    // which clears the starved state, so a leaked handler returns early just
    // like a removed one. The removal itself is what is pinned here.
    const added = vi.spyOn(document, 'addEventListener')
    const removed = vi.spyOn(document, 'removeEventListener')
    starveSetup({ failFirst: [UNITS[1]], held: [UNITS[1], UNITS[2], UNITS[3]] })
    const { result, unmount } = renderHook(() => useTTS('irrelevant content', { units: UNITS }))

    await act(async () => {
      await result.current.play()
    })
    await settle()
    await emitTimeUpdate(5)
    await emitWaiting(10)

    const listeners = added.mock.calls
      .filter(([type]) => type === 'visibilitychange')
      .map(([, listener]) => listener)
    expect(listeners.length).toBeGreaterThan(0)

    unmount()
    const removedListeners = removed.mock.calls
      .filter(([type]) => type === 'visibilitychange')
      .map(([, listener]) => listener)
    for (const listener of listeners) expect(removedListeners).toContain(listener)

    vi.mocked(restartStalledSynthesis).mockReturnValue(true)
    await emitVisible()
    expect(restartStalledSynthesis).not.toHaveBeenCalled()
  })
})

describe('useTTS starved state — retry within the failure cap', () => {
  it('a background synthesis that fails while starved is retried and playback continues', async () => {
    enableLog()
    // Units 1-3 are all in flight when the element runs dry at the end of 0.
    const synth = holdSynthesis([UNITS[1], UNITS[2], UNITS[3]])
    const onError = vi.fn()
    const { result } = renderHook(() =>
      useTTS('irrelevant content', { units: UNITS, onError })
    )

    await act(async () => {
      await result.current.play()
    })
    await settle()
    expect(mse.appended).toEqual([0])

    await emitTimeUpdate(5)
    await emitWaiting(10)
    expect(entriesOfType('starved').map((entry) => entry.detail)).toEqual(['0'])
    // Everything it waits for is already coming: the refill asks for nothing.
    expect(synth.calls(UNITS[1])).toBe(1)

    // The unit it waits for fails. Nothing else would ever ask for it again.
    await synth.fail(UNITS[1], 0)
    expect(synth.calls(UNITS[1])).toBe(2)
    expect(synthStartLines().at(-1)).toBe('1: visible (retry)')
    expect(result.current.isPlaying).toBe(true)

    await synth.release(UNITS[1], 1)
    await waitFor(() => expect(mse.appended).toEqual([0, 1]))

    // The element moves again, past where it waited: the state is over, so a
    // later failure only warns.
    await emitTimeUpdate(12)
    expect(result.current.currentChunkIndex).toBe(1)
    await synth.fail(UNITS[2], 0)
    expect(synth.calls(UNITS[2])).toBe(1)
    expect(result.current.isPlaying).toBe(true)
    expect(onError).not.toHaveBeenCalled()
  })

  it('failures while starved end in an error after the cap, not silence', async () => {
    enableLog()
    const synth = holdSynthesis([UNITS[2], UNITS[3]])
    const heldImpl = vi.mocked(synthesizeSpeech).getMockImplementation()!
    // The voice service is down for unit 1, on every request.
    vi.mocked(synthesizeSpeech).mockImplementation(async (text: string, opts) => {
      if (text === UNITS[1]) throw new Error(`[test] synthesis failed for ${text}`)
      return heldImpl(text, opts)
    })
    const onError = vi.fn()
    const { result } = renderHook(() =>
      useTTS('irrelevant content', { units: UNITS, onError })
    )

    await act(async () => {
      await result.current.play()
    })
    await settle()
    expect(mse.appended).toEqual([0])
    // Not starved yet: the prefetch failure only warned.
    expect(synth.calls(UNITS[1])).toBe(1)

    await emitTimeUpdate(5)
    await emitWaiting(10)
    await settle(20)

    // The refill's request and three retries, each counted: the fourth
    // failure in a row is past MAX_CONSECUTIVE_CHUNK_FAILURES.
    expect(synth.calls(UNITS[1])).toBe(5)
    expect(entriesOfType('stop-with-error')).toHaveLength(1)
    expect(onError).toHaveBeenCalledTimes(1)
    expect(result.current.isPlaying).toBe(false)

    // The session is over: nothing asks again.
    await settle(20)
    expect(synth.calls(UNITS[1])).toBe(5)
    expect(onError).toHaveBeenCalledTimes(1)
  })

  it('a prefetch failure while playing buffered media is not retried or counted', async () => {
    enableLog()
    // Every read-ahead request fails once; unit 1 fails a second time too.
    const failures = new Map([
      [UNITS[1], 2],
      [UNITS[2], 1],
      [UNITS[3], 1],
    ])
    vi.mocked(synthesizeSpeech).mockImplementation(async (text: string) => {
      const left = failures.get(text) ?? 0
      if (left > 0) {
        failures.set(text, left - 1)
        throw new Error(`[test] synthesis failed for ${text}`)
      }
      return new ArrayBuffer(8)
    })
    const callsFor = (text: string) =>
      vi.mocked(synthesizeSpeech).mock.calls.filter(([t]) => t === text).length
    const onError = vi.fn()
    const { result } = renderHook(() =>
      useTTS('irrelevant content', { units: UNITS, onError })
    )

    await act(async () => {
      await result.current.play()
    })
    await settle()
    await emitTimeUpdate(5)

    // Three prefetch failures while unit 0 still plays: warned, not retried.
    expect(callsFor(UNITS[1])).toBe(1)
    expect(callsFor(UNITS[2])).toBe(1)
    expect(callsFor(UNITS[3])).toBe(1)
    expect(synthStartLines().filter((line) => line?.endsWith('(retry)'))).toHaveLength(0)

    // Nor counted: one more failure, while starved, is the first of a streak —
    // had those three counted, it would be the fourth and end the session.
    await emitWaiting(10)
    await settle(20)
    expect(callsFor(UNITS[1])).toBe(3)
    expect(entriesOfType('stop-with-error')).toHaveLength(0)
    expect(onError).not.toHaveBeenCalled()
    expect(result.current.isPlaying).toBe(true)
    // All of it lands, in order: 2 and 3 arrived while unit 1 was still
    // failing, and waited for it — a background failure holds its place.
    await waitFor(() => expect(mse.appended).toEqual([0, 1, 2, 3]))
  })
})

/**
 * The element reports it cannot play what it holds — the entry into
 * `failUnit` for the CURRENT unit that needs no boundary crossing.
 */
const failCurrentUnitInElement = async (turns = 12) => {
  await act(async () => {
    currentAudio().dispatchEvent(new Event('error'))
    for (let i = 0; i < turns; i += 1) await Promise.resolve()
  })
}

describe('useTTS append order — a failed unit holds its place', () => {
  it('a background failure holds its place in the append order', async () => {
    enableLog()
    // Unit 1's prefetch fails while unit 0 still plays; 2 and 3 resolve at once.
    const synth = starveSetup({ failFirst: [UNITS[1]], held: [UNITS[1]] })
    const { result } = renderHook(() => useTTS('irrelevant content', { units: UNITS }))

    await act(async () => {
      await result.current.play()
    })
    await settle(16)
    // 2 and 3 have their bytes — and wait behind the unit that failed.
    expect(synth.calls(UNITS[2])).toBe(1)
    expect(synth.calls(UNITS[3])).toBe(1)
    expect(mse.appended).toEqual([0])

    // The playhead reaches the gap: the starved refill asks for 1 again, and
    // only 1 — the units behind it are held, not lost.
    await emitTimeUpdate(5)
    await emitWaiting(10)
    expect(synth.calls(UNITS[1])).toBe(2)
    expect(synth.calls(UNITS[2])).toBe(1)
    expect(synth.calls(UNITS[3])).toBe(1)
    expect(mse.appended).toEqual([0])

    await synth.release(UNITS[1], 0)
    await waitFor(() => expect(mse.appended).toEqual([0, 1, 2, 3]))
    expect(result.current.isPlaying).toBe(true)
  })

  it('units that failed before the starve are appended in order after recovery', async () => {
    // The 2026-09-30 20:18 device shape: two consecutive units fail in the
    // background, the one after them arrives and must not jump the queue.
    enableLog()
    const synth = starveSetup({
      failFirst: [UNITS[1], UNITS[2]],
      held: [UNITS[1], UNITS[2]],
    })
    const { result } = renderHook(() => useTTS('irrelevant content', { units: UNITS }))

    await act(async () => {
      await result.current.play()
    })
    await settle(16)
    expect(synth.calls(UNITS[3])).toBe(1)
    expect(mse.appended).toEqual([0])

    await emitTimeUpdate(5)
    await emitWaiting(10)
    expect(synth.calls(UNITS[1])).toBe(2)
    expect(synth.calls(UNITS[2])).toBe(2)
    expect(synth.calls(UNITS[3])).toBe(1)

    // The retries come back out of order: 2 first. It waits for 1 as well.
    await synth.release(UNITS[2], 0)
    expect(mse.appended).toEqual([0])
    await synth.release(UNITS[1], 0)
    await waitFor(() => expect(mse.appended).toEqual([0, 1, 2, 3]))
    expect(result.current.isPlaying).toBe(true)
  })

  it('a unit that fails as the current unit is still skipped', async () => {
    enableLog()
    // Unit 1's read-ahead request stays in flight; 2 and 3 wait behind it.
    const synth = holdSynthesis([UNITS[1]])
    const onError = vi.fn()
    const { result } = renderHook(() =>
      useTTS('irrelevant content', { units: UNITS, onError })
    )

    await act(async () => {
      await result.current.play()
    })
    await settle(16)
    expect(mse.appended).toEqual([0])

    // The element drops unit 0, so the hook moves on to unit 1 and asks for it
    // itself; that request fails as the CURRENT unit's.
    await failCurrentUnitInElement()
    expect(synth.calls(UNITS[1])).toBe(2)
    await synth.fail(UNITS[1], 1)

    // The playhead has moved past it: counted, skipped, and the next unit is
    // appended in its turn (and the read-ahead from unit 2 brings 4).
    await waitFor(() => expect(mse.appended).toEqual([0, 2, 3, 4]))
    expect(entriesOfType('synthesis-failed').map((entry) => entry.detail)).toEqual([
      expect.stringMatching(/^0: /),
      expect.stringMatching(/^1: /),
    ])
    expect(result.current.currentChunkIndex).toBe(2)
    expect(result.current.isPlaying).toBe(true)
    expect(onError).not.toHaveBeenCalled()
  })
})

describe('useTTS session end — in-flight bookkeeping', () => {
  it('a session that ended in an error does not leave its in-flight units marked for the next one', async () => {
    /**
     * An error stop ends the session exactly like a pause does, so what it had
     * in flight is no longer coming for anyone. Left marked, the next session
     * would take those units for "already coming" and never append them.
     */
    enableLog()
    const synth = holdSynthesis([UNITS[2], UNITS[3]])
    // The element refuses its first start — the call after the gesture-unlock
    // poke: the session ends through `stopWithError` with units 2 and 3 still
    // in flight.
    const unlock = audioPlay.getMockImplementation()!
    audioPlay
      .mockImplementationOnce(unlock)
      .mockImplementationOnce(() => Promise.reject(new Error('[test] refused')))
    const onError = vi.fn()
    const { result } = renderHook(() =>
      useTTS('irrelevant content', { units: UNITS, onError })
    )

    await act(async () => {
      await result.current.play()
    })
    await settle()
    expect(entriesOfType('stop-with-error')).toHaveLength(1)
    expect(onError).toHaveBeenCalledTimes(1)
    expect(result.current.isPlaying).toBe(false)
    expect(synth.calls(UNITS[2])).toBe(1)
    expect(synth.calls(UNITS[3])).toBe(1)

    await act(async () => {
      await result.current.play()
    })
    await settle()

    expect(result.current.isPlaying).toBe(true)
    expect(synth.calls(UNITS[2])).toBe(2)
    expect(synth.calls(UNITS[3])).toBe(2)
    await synth.release(UNITS[2], 1)
    await synth.release(UNITS[3], 1)
    await waitFor(() => expect(mse.appended).toEqual([0, 1, 2, 3]))
  })

  it('a failure from a superseded session is not retried', async () => {
    /**
     * A request of the paused session can still reject with a real error
     * after the resume. It belongs to that session: it may not give a unit
     * up in the NEW session's append queue — the new session's own request
     * for that unit is still coming — nor count against its failure streak.
     */
    enableLog()
    const synth = holdSynthesis([UNITS[2], UNITS[3]])
    const onError = vi.fn()
    const { result } = renderHook(() =>
      useTTS('irrelevant content', { units: UNITS, onError })
    )

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
    expect(synth.calls(UNITS[3])).toBe(2)

    // The resumed session plays and starves at the end of unit 1; its refill
    // brings unit 4, which queues behind the in-flight 2 and 3.
    await emitTimeUpdate(15)
    await emitWaiting(20)
    expect(entriesOfType('starved')).toHaveLength(1)
    await settle()
    expect(mse.appended).toEqual([0, 1])

    // The paused session's request for unit 2 (its `play()` prefetch) fails.
    // Unit 3 arriving for THIS session still waits for 2: the new session's
    // own request for 2 is still coming, so 2 was never given up.
    await synth.fail(UNITS[2], 0)
    await synth.release(UNITS[3], 1)
    expect(mse.appended).toEqual([0, 1])

    // Then the one for unit 3 (its `fillBuffer` read-ahead) fails, after the
    // new session's 3 is already queued. Giving 3 up now would make the
    // cursor walk past the queued unit and read 4 in its place.
    await synth.fail(UNITS[3], 0)
    expect(synth.calls(UNITS[2])).toBe(2)
    expect(synth.calls(UNITS[3])).toBe(2)
    expect(entriesOfType('stop-with-error')).toHaveLength(0)

    await synth.release(UNITS[2], 1)
    await waitFor(() => expect(mse.appended).toEqual([0, 1, 2, 3, 4]))
    expect(result.current.isPlaying).toBe(true)
    expect(onError).not.toHaveBeenCalled()
  })
})

/**
 * Reviewer probe A. A resume clears the live tick along with the starved
 * state, so a session seated AT the gap has nothing played behind it — and the
 * element, already at the end of what was appended, never ticks again. The
 * starved state has to be entered from where the element stands, or the unit
 * it waits on is asked for by nobody.
 */
describe('useTTS starved state — a resume at the gap', () => {
  it('pausing and playing at a gap still recovers the held unit', async () => {
    enableLog()
    // Unit 1's requests are held so each can be settled on its own; 2 and 3
    // resolve at once and wait behind it.
    const synth = holdSynthesis([UNITS[1]])
    const onError = vi.fn()
    const { result } = renderHook(() =>
      useTTS('irrelevant content', { units: UNITS, onError })
    )

    await act(async () => {
      await result.current.play()
    })
    await settle(16)
    // The prefetch of 1 fails while 0 still plays: warned, held in place.
    await synth.fail(UNITS[1], 0)
    expect(mse.appended).toEqual([0])

    // The element starves at the gap; the refill asks for 1 again.
    await emitTimeUpdate(5)
    await emitWaiting(10)
    expect(synth.calls(UNITS[1])).toBe(2)

    // Pause and play, with the element sitting at the end of unit 0.
    act(() => {
      result.current.pause()
    })
    await act(async () => {
      await result.current.play()
    })
    await settle()
    // The resumed session's own prefetch of 1.
    expect(synth.calls(UNITS[1])).toBe(3)

    // The resumed element has nothing to play and says so — with no tick, and
    // with its clock stopped a little short of the buffer's end, as a real
    // sink's does.
    await emitWaiting(9.8)
    expect(entriesOfType('starved').map((entry) => entry.detail)).toEqual(['0', '0'])

    // Starved again, so waking the screen restarts a dead attempt.
    vi.mocked(restartStalledSynthesis).mockReturnValueOnce(true)
    await emitVisible()
    expect(entriesOfType('restart-on-wake').map((entry) => entry.detail)).toEqual(['0'])

    // The resumed prefetch dies (dead connection). Starved: it is retried.
    await synth.fail(UNITS[1], 2)
    expect(synth.calls(UNITS[1])).toBe(4)
    expect(synthStartLines().at(-1)).toBe('1: visible (retry)')

    await synth.release(UNITS[1], 3)
    await waitFor(() => expect(mse.appended).toEqual([0, 1, 2, 3]))
    expect(result.current.isPlaying).toBe(true)
    expect(onError).not.toHaveBeenCalled()
  })

  it('pausing and playing at a gap still ends in an error when the unit never comes', async () => {
    enableLog()
    // Unit 1: the first request fails, the starved refill hangs, and from the
    // resume on every request fails.
    let unit1Requests = 0
    let unit1Down = false
    vi.mocked(synthesizeSpeech).mockImplementation(async (text: string) => {
      if (text !== UNITS[1]) return new ArrayBuffer(8)
      unit1Requests += 1
      if (unit1Requests === 1 || unit1Down) {
        throw new Error(`[test] synthesis failed for ${text}`)
      }
      return new Promise<ArrayBuffer>(() => {})
    })
    const onError = vi.fn()
    const { result } = renderHook(() =>
      useTTS('irrelevant content', { units: UNITS, onError })
    )

    await act(async () => {
      await result.current.play()
    })
    await settle(16)
    expect(mse.appended).toEqual([0])
    await emitTimeUpdate(5)
    await emitWaiting(10)
    expect(unit1Requests).toBe(2)

    act(() => {
      result.current.pause()
    })
    unit1Down = true
    await act(async () => {
      await result.current.play()
    })
    await settle()
    // The resumed prefetch failed before the element said anything.
    expect(unit1Requests).toBe(3)
    expect(entriesOfType('stop-with-error')).toHaveLength(0)

    await emitWaiting(10)
    await settle(20)

    expect(entriesOfType('stop-with-error')).toHaveLength(1)
    expect(onError).toHaveBeenCalledTimes(1)
    expect(result.current.isPlaying).toBe(false)
  })
  it('a waiting at the end of the appended timeline with nothing still to come is not a starvation', async () => {
    enableLog()
    const units = UNITS.slice(0, 3)
    const { result } = renderHook(() => useTTS('irrelevant content', { units }))

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(mse.appended).toEqual([0, 1, 2]))
    await emitTimeUpdate(5)
    await emitTimeUpdate(15)
    await emitTimeUpdate(25)
    await emitTimeUpdate(29.7)

    act(() => {
      result.current.pause()
    })
    await act(async () => {
      await result.current.play()
    })
    await settle()
    // Near the end of the timeline, but every unit is on it: nothing to wait for.
    await emitWaiting(29.7)

    expect(entriesOfType('starved')).toHaveLength(0)
  })
})
