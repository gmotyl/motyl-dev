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

  it('ignores a `ended` that reaches the element on this carrier', async () => {
    /**
     * There is no `ended` at a seam inside one buffer, so the handler the
     * src-swap path lives on is not merely idle here — it is a SECOND counter
     * for a crossing the boundary tracker already reports. Left assigned, an
     * `ended` arriving for any reason (a truncated append, a source some later
     * caller ends) would advance the unit a second time and add its characters
     * again. So the MSE path must not assign it at all.
     */
    const onComplete = vi.fn()
    const { result } = renderHook(() =>
      useTTS('irrelevant content', { units: UNITS, onComplete })
    )
    await startAllThree(result)
    await emitTimeUpdate(2.5)

    expect(currentAudio().onended).toBeNull()

    await act(async () => {
      currentAudio().dispatchEvent(new Event('ended'))
      for (let i = 0; i < 6; i += 1) await Promise.resolve()
    })

    // Nothing moved: not the unit, not the completed-character total behind
    // progress, not the article's completion.
    expect(result.current.currentChunkIndex).toBe(0)
    await emitTimeUpdate(5)
    expect(result.current.progress).toBeCloseTo((10 * 0.5) / 30 * 100, 4)
    expect(onComplete).not.toHaveBeenCalled()
  })
})

describe('useTTS completing an article on the MSE carrier', () => {
  it('completes the article when the playhead runs out of the last unit', async () => {
    /**
     * THE bug this file exists to close. `mse-carrier` calls `endOfStream()`
     * only in `dispose()` — deliberately, because a section handoff appends
     * MORE units to the same timeline and an ended `MediaSource` refuses them —
     * so `ended` can never fire and the tracker, which keeps its seat past the
     * final append, never reports the last unit either. Nothing else reaches
     * `playChunk(chunks.length)`, so without a completion signal of its own the
     * article stalls at ~99% with `isPlaying` still true and the whole
     * article's audio still retained. `use-continuous-reader` drives section
     * auto-advance from `onComplete`, so on every device that picks this
     * carrier "Read All News" would stop dead after the first section.
     */
    const onComplete = vi.fn()
    const { result } = renderHook(() =>
      useTTS('irrelevant content', { units: UNITS, onComplete })
    )
    await startAllThree(result)
    const sourcesAtStart = mse.created

    await emitTimeUpdate(12)
    await emitTimeUpdate(22)
    expect(result.current.currentChunkIndex).toBe(2)
    expect(onComplete).not.toHaveBeenCalled()

    // The playhead reaches the end of the last appended span. On a device this
    // is where the element runs out of media and stalls — there is no `ended`
    // behind it, and the position it reports is the last DECODED frame's, a
    // fraction of a second short of the buffer's end rather than exactly on it.
    // Requiring equality would leave every article hanging there.
    await emitTimeUpdate(29.95)

    expect(onComplete).toHaveBeenCalledTimes(1)
    expect(result.current.isPlaying).toBe(false)
    expect(result.current.progress).toBe(100)
    // The article is over, so nothing it prepared may outlive it: the carrier
    // is rebuilt, which is what releases every unit's audio.
    expect(mse.created).toBe(sourcesAtStart + 1)

    // Exactly once — the element keeps ticking at the end of a stalled buffer.
    await emitTimeUpdate(30)
    await emitTimeUpdate(30)
    expect(onComplete).toHaveBeenCalledTimes(1)
  })

  it('waits for a final unit that is still in synthesis', async () => {
    /**
     * Why "the playhead reached the end of the timeline" is NOT "the article
     * finished". `timeline.end()` is the BUFFER's end and grows with every
     * append, so a pipeline that outran the appender sits at it for as long as
     * the next unit takes to synthesise — the ordinary mid-article stall. The
     * end of CONTENT is a question only the hook can answer, and the answer
     * turns on the unit the hook is on being the last one there is.
     *
     * This is also the property Task 7 rests on: nothing here assumes the
     * timeline ever stops growing.
     */
    let releaseLast!: (audio: ArrayBuffer) => void
    const lastAudio = new Promise<ArrayBuffer>((resolve) => {
      releaseLast = resolve
    })
    vi.mocked(synthesizeSpeech).mockImplementation(async (text: string) =>
      text === UNITS[2] ? lastAudio : new ArrayBuffer(8)
    )

    const onComplete = vi.fn()
    const { result } = renderHook(() =>
      useTTS('irrelevant content', { units: UNITS, onComplete })
    )
    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(mse.appended).toEqual([0, 1]))
    await settle()

    await emitTimeUpdate(5)
    await emitTimeUpdate(15)
    expect(result.current.currentChunkIndex).toBe(1)

    // The playhead runs off the end of everything appended — with a unit still
    // to come.
    await emitTimeUpdate(20)
    expect(onComplete).not.toHaveBeenCalled()
    expect(result.current.isPlaying).toBe(true)

    await act(async () => {
      releaseLast(new ArrayBuffer(8))
    })
    await waitFor(() => expect(mse.appended).toEqual([0, 1, 2]))
    await settle()

    await emitTimeUpdate(25)
    expect(result.current.currentChunkIndex).toBe(2)
    await emitTimeUpdate(30)
    expect(onComplete).toHaveBeenCalledTimes(1)
  })

  it('waits for the last unit\'s media even when the hook is already on it', async () => {
    /**
     * The other half of the same race, and the one the unit index alone cannot
     * answer. A skipped unit moves the hook onto the LAST index while that
     * unit's audio is still being fetched, so `currentChunkIndex` says "last
     * unit" and the playhead is sitting at the buffer's end — the two halves of
     * a completion — with nothing of the article's final unit read at all.
     * Only the timeline can say whether that unit's media exists.
     */
    let releaseLast!: (audio: ArrayBuffer) => void
    const lastAudio = new Promise<ArrayBuffer>((resolve) => {
      releaseLast = resolve
    })
    vi.mocked(synthesizeSpeech).mockImplementation(async (text: string) => {
      if (text === UNITS[1]) throw new Error('stalled')
      return text === UNITS[2] ? lastAudio : new ArrayBuffer(8)
    })

    enableLog()
    const onComplete = vi.fn()
    const { result } = renderHook(() =>
      useTTS('irrelevant content', { units: UNITS, onComplete })
    )
    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(mse.appended).toEqual([0]))
    await settle()

    // Unit 0 is dropped by the element, unit 1 is unsynthesisable: the skip
    // chain lands the hook on unit 2 while unit 2's bytes are still pending.
    // The log is what says so — the STATE cannot, because `playChunk` publishes
    // the new index only on the far side of the fetch it is parked in.
    await failCurrentUnitInElement()
    expect(entriesOfType('unit-start').map((entry) => entry.detail)).toContain('2/3')
    expect(result.current.isBuffering).toBe(true)

    await emitTimeUpdate(10)
    expect(onComplete).not.toHaveBeenCalled()
    expect(result.current.isPlaying).toBe(true)

    await act(async () => {
      releaseLast(new ArrayBuffer(8))
    })
    await waitFor(() => expect(mse.appended).toEqual([0, 2]))
    await settle()

    await emitTimeUpdate(20)
    expect(onComplete).toHaveBeenCalledTimes(1)
    expect(result.current.progress).toBe(100)
  })

  it('completes when one tick skips the whole tail of the article', async () => {
    /**
     * The same throttling that makes a crossing several units wide can skip the
     * tail of an article outright: the last tick lands inside unit 0 and the
     * next one is already past the end of the buffer, so the tracker — whose
     * `unitAt` answers null there and which keeps its seat on purpose — reports
     * nothing at all. Every unit the tick flew over still has to be counted and
     * the article still has to finish, or the stall is back in the one place
     * the reader is least able to recover from it.
     */
    enableLog()
    const onComplete = vi.fn()
    const { result } = renderHook(() =>
      useTTS('irrelevant content', { units: UNITS, onComplete })
    )
    await startAllThree(result)

    await emitTimeUpdate(5)
    await emitTimeUpdate(30)

    expect(onComplete).toHaveBeenCalledTimes(1)
    expect(result.current.progress).toBe(100)
    // All three, in order — none of them silently dropped.
    expect(
      entriesOfType('unit-ended')
        .filter((entry) => !entry.suppressed)
        .map((entry) => entry.detail)
    ).toEqual(['0', '1', '2'])
  })

  it('does not complete while a unit behind the last one is still missing', async () => {
    /**
     * Prefetch resolves in whatever order the bytes arrive, so the buffer can
     * hold the FINAL unit while an earlier one is still in flight — and then
     * "the last unit is on the timeline and the playhead is at the buffer's
     * end" is true with a unit nobody has read. Asking about the last index
     * alone would end the article there; asking about every index from the one
     * being read through the last is what refuses to.
     */
    let releaseMiddle!: (audio: ArrayBuffer) => void
    const middleAudio = new Promise<ArrayBuffer>((resolve) => {
      releaseMiddle = resolve
    })
    vi.mocked(synthesizeSpeech).mockImplementation(async (text: string) =>
      text === UNITS[1] ? middleAudio : new ArrayBuffer(8)
    )

    const onComplete = vi.fn()
    const { result } = renderHook(() =>
      useTTS('irrelevant content', { units: UNITS, onComplete })
    )
    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(mse.appended).toEqual([0, 2]))
    await settle()

    await emitTimeUpdate(5)
    // The crossing puts the hook on unit 1, which is nowhere on the timeline.
    await emitTimeUpdate(15)
    // The playhead then runs off the end of everything the buffer holds.
    await emitTimeUpdate(20)

    expect(onComplete).not.toHaveBeenCalled()
    expect(result.current.isPlaying).toBe(true)

    await act(async () => {
      releaseMiddle(new ArrayBuffer(8))
    })
    await settle()
    await emitTimeUpdate(30)
    expect(onComplete).toHaveBeenCalledTimes(1)
  })

  it('completes through the CURRENT render\'s onComplete, not the one at mount', async () => {
    /**
     * The `reportStartRef` staleness class again, and live rather than
     * theoretical: `use-continuous-reader` builds `onComplete` over the section
     * key, so its identity changes on every handoff. The `timeupdate` listener
     * is attached once for the element's whole life, so an advance bound at
     * that moment — rather than reached through a ref every tick — would drive
     * completion into the PREVIOUS section's handler and auto-advance would
     * replay the section that just ended, or stop.
     *
     * Completion is what makes the staleness observable: a natural crossing
     * passes the session's own generation and signal through, so a stale
     * advance and a fresh one behave identically until a captured PROP is
     * reached.
     */
    const atMount = vi.fn()
    const afterRerender = vi.fn()
    const { result, rerender } = renderHook(
      ({ onComplete }: { onComplete: () => void }) =>
        useTTS('irrelevant content', { units: UNITS, onComplete }),
      { initialProps: { onComplete: atMount } }
    )
    await startAllThree(result)

    rerender({ onComplete: afterRerender })

    await emitTimeUpdate(12)
    await emitTimeUpdate(22)
    await emitTimeUpdate(30)

    expect(afterRerender).toHaveBeenCalledTimes(1)
    expect(atMount).not.toHaveBeenCalled()
  })
})

describe('useTTS advancing units on the MSE carrier', () => {
  it('counts every unit a single tick flew over', async () => {
    /**
     * THE scenario this whole change exists for: a hidden page is throttled
     * hard enough to skip `timeupdate`s outright, so one tick can land whole
     * units later. The tracker returns every span the playhead left behind, and
     * the advance has to resume from the LAST of them.
     *
     * Taking the first instead is not a cosmetic off-by-one. `playChunk` would
     * be entered for a unit the playhead has already left; `resuming` would be
     * true, so nothing would seek; and the progress span-guard — which refuses
     * to measure a span the current unit does not own — would then suppress
     * every emission for the rest of the article.
     */
    const progress: number[] = []
    const { result } = renderHook(() =>
      useTTS('irrelevant content', { units: UNITS, onProgress: (p) => progress.push(p) })
    )
    await startAllThree(result)
    enableLog()

    await emitTimeUpdate(5)
    // One tick, two spans: the playhead leaves unit 0 AND unit 1 behind.
    await emitTimeUpdate(25)

    // It landed on the unit it is actually inside...
    expect(result.current.currentChunkIndex).toBe(2)
    // ...counted BOTH skipped units' characters, not just the first...
    expect(progress.at(-1)).toBeCloseTo((20 + 10 * 0.5) / 30 * 100, 4)
    // ...and keeps measuring afterwards, which is what the span-guard would
    // have killed had the hook landed a unit short.
    await emitTimeUpdate(27)
    expect(progress.at(-1)).toBeCloseTo((20 + 10 * 0.7) / 30 * 100, 4)
  })

  it('does not measure progress against a span the current unit does not own', async () => {
    /**
     * Prefetch is parallel and resolves in whatever order the network hands the
     * bytes back, so the buffer can hold unit 2 while unit 1 is still in
     * flight — and on one continuous timeline the unit at a given second is
     * then NOT the unit whose index the hook is on. Measuring the current
     * unit's fraction against somebody else's span is the spike-then-fall the
     * emitter's guard exists to prevent.
     *
     * The same moment pins `resuming`: the hook is pointed at unit 1, the
     * element is carrying unit 2's media, and the carrier does not hold unit 1
     * at all. Only the `carrierHasUnit` half of `resuming` can tell those
     * apart — without it the advance would call this a resume, never fetch
     * unit 1, never seek, and leave the reader reading unit 2 under unit 1's
     * name.
     */
    let releaseMiddle!: (audio: ArrayBuffer) => void
    const middleAudio = new Promise<ArrayBuffer>((resolve) => {
      releaseMiddle = resolve
    })
    vi.mocked(synthesizeSpeech).mockImplementation(async (text: string) =>
      text === UNITS[1] ? middleAudio : new ArrayBuffer(8)
    )

    const progress: number[] = []
    const { result } = renderHook(() =>
      useTTS('irrelevant content', { units: UNITS, onProgress: (p) => progress.push(p) })
    )
    await act(async () => {
      await result.current.play()
    })
    // Unit 2's bytes overtook unit 1's, so the buffer is 0 then 2.
    await waitFor(() => expect(mse.appended).toEqual([0, 2]))
    await settle()

    await emitTimeUpdate(5)
    const emissionsBeforeCrossing = progress.length
    currentTimeWrites = []

    // The playhead crosses out of unit 0 and into the span unit 2 occupies.
    // The hook's next unit is 1 — which is nowhere on the timeline.
    await emitTimeUpdate(15)
    // The advance entered unit 1 as a JUMP and is now fetching it: `resuming`
    // cannot be true for media the element never held.
    expect(result.current.isBuffering).toBe(true)
    // ...and nothing may be emitted from a span unit 1 does not own.
    expect(progress).toHaveLength(emissionsBeforeCrossing)

    await act(async () => {
      releaseMiddle(new ArrayBuffer(8))
    })
    await settle()

    // Unit 1 was fetched, appended and SOUGHT — a resume would have done none
    // of it and left the element reading unit 2 under unit 1's name.
    expect(result.current.currentChunkIndex).toBe(1)
    expect(mse.appended).toEqual([0, 2, 1])
    expect(currentTimeWrites).toEqual([20])
  })

  it('ignores a tick that arrives after the session was torn down', async () => {
    /**
     * The window is `playFromUnit`: `interrupt` ends the session and — on this
     * carrier, deliberately — leaves the element RUNNING, so `timeupdate` keeps
     * arriving until the next session is seated. Every leg of the guard
     * describes that window: playback is no longer on, the session is gone, its
     * generation has been superseded and its signal aborted. A crossing counted
     * there adds a unit's characters to a session that is over.
     *
     * And it is recorded before it is dropped: a suppressed crossing that left
     * no entry would read, on a device, exactly like a page that never resumed
     * executing — the ambiguity the log exists to remove.
     */
    enableLog()
    const { result } = renderHook(() => useTTS('irrelevant content', { units: UNITS }))
    await startAllThree(result)

    await emitTimeUpdate(5)
    act(() => {
      result.current.pause()
    })
    const progressWhilePaused = result.current.progress

    await emitTimeUpdate(12)

    expect(result.current.currentChunkIndex).toBe(0)
    expect(result.current.progress).toBe(progressWhilePaused)

    const crossings = entriesOfType('unit-ended')
    expect(crossings).toHaveLength(1)
    expect(crossings[0].suppressed).toBe(true)
    expect(crossings[0].detail).toBe('0')
  })
})

describe('useTTS when the MSE buffer refuses an append', () => {
  it('counts a refused append against the failure streak and stops at the cap', async () => {
    /**
     * The src-swap carrier cannot refuse a unit; this one can — a `SourceBuffer`
     * that rejects an append poisons its own queue, and `appendUnits` rejects to
     * say so. Nothing awaits `playChunk`, so an unhandled refusal is silence
     * with `isPlaying` still true: the precise failure this change exists to
     * remove. A refusal is a unit failure of the same kind as synthesis never
     * producing bytes, and has to be treated as one — logged, counted, and
     * eventually fatal.
     */
    enableLog()
    // Unit 0 is buffered and played; every unit after it is refused by the
    // buffer, so the skip chain can never recover.
    mse.refuse = [1, 2, 3, 4]
    const units = Array.from({ length: 5 }, (_, i) => String.fromCharCode(97 + i).repeat(10))
    const onError = vi.fn()

    const { result } = renderHook(() => useTTS('irrelevant content', { units, onError }))
    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(mse.appended).toEqual([0]))
    await settle()

    // The element drops unit 0 — the one entry into the skip chain that does
    // not need a boundary crossing. Units 1..4 then each fail on the append.
    await failCurrentUnitInElement(12)
    await settle()

    await waitFor(() => expect(onError).toHaveBeenCalledTimes(1))
    expect(result.current.isPlaying).toBe(false)

    // Every refusal was recorded as the unit failure it is...
    const failures = entriesOfType('synthesis-failed').map((entry) => entry.detail)
    expect(failures).toEqual(
      expect.arrayContaining([
        expect.stringMatching(/^1: /),
        expect.stringMatching(/^2: /),
        expect.stringMatching(/^3: /),
      ])
    )
    // ...and the streak they built is what ended the session loudly.
    expect(firstOfType('stop-with-error')).toBeDefined()
  })
})
