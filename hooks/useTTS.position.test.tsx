import { act, cleanup, renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { sectionRelativePosition, useTTS } from './useTTS'
import { synthesizeSpeech } from '@/lib/tts/client'
import { createMseCarrier } from '@/lib/reader/mse-carrier'
import type { SeamReport } from '@/lib/reader/seam-report'

/**
 * What the reader tells the OS about WHERE IT IS — the number a car head unit
 * forwards over AVRCP.
 *
 * On one continuous timeline `element.currentTime` climbs for a whole reading
 * session and `element.duration` is NaN (nothing ever assigns
 * `MediaSource.duration`). A section, however, is a TRACK: it is what the
 * metadata names and what `nexttrack` steps between. So a position reported
 * straight off the element says "new track, position 41 minutes, duration
 * unknown" at every section boundary — the shape that reboots a Nissan head
 * unit.
 *
 * Two levels are covered here, because the arithmetic and the wiring fail
 * differently:
 *   - `sectionRelativePosition` is the arithmetic, and every clamp it owes the
 *     `setPositionState` contract is pinned on its own (a throw there is worse
 *     than the bug being fixed).
 *   - `readMediaPosition` is the hook answering from the LIVE carrier, so the
 *     tests below pin which timeline it reads and when it refuses to answer.
 *
 * A section start other than 0 needs a handoff. The READER's handoff is a
 * two-hook affair — `use-continuous-reader.media-position.test.tsx` owns that,
 * exactly as `use-continuous-reader.handoff.test.tsx` owns the handoff itself.
 * The `remembered section start` block below drives one from a single hook
 * through `continueTimeline` instead, because what it pins is this hook's own
 * state: the start it remembers once retention has evicted unit 0, and every
 * moment it must forget it again.
 */

vi.mock('@/lib/tts/client', () => ({
  synthesizeSpeech: vi.fn(async () => new ArrayBuffer(8)),
  prefetchSpeech: vi.fn(),
}))

/**
 * The fake `MediaSource` behind the real `createMsePlaybackCarrier`, matching
 * `useTTS.mse.test.tsx`'s: every append gains exactly `spanSeconds` of buffer,
 * so unit k occupies [10k, 10k + 10).
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

let mediaCurrentTime = 0
let mediaPaused = true
let mediaPlaybackRate = 1

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

/**
 * Move the playback clock WITHOUT firing `timeupdate`.
 *
 * `readMediaPosition` is a question, not a subscription: it reads the element
 * when asked. Driving the clock silently is what keeps these tests off the
 * boundary tracker and the end-of-content branch, which own their own suites.
 */
const setClock = (seconds: number) => {
  mediaCurrentTime = seconds
}

/** Three units of ten characters each. */
const UNITS = ['a'.repeat(10), 'b'.repeat(10), 'c'.repeat(10)]
/** The section after it: three more, distinguishable by their letters. */
const NEXT_UNITS = ['d'.repeat(10), 'e'.repeat(10), 'f'.repeat(10)]

/** Let the queued appends and the position read that follows them settle. */
const settle = async () => {
  await act(async () => {
    for (let i = 0; i < 8; i += 1) await Promise.resolve()
  })
}

/** Start a session and wait until all three units are on the timeline. */
const startAllThree = async (result: { current: ReturnType<typeof useTTS> }) => {
  await act(async () => {
    await result.current.play()
  })
  await waitFor(() => expect(mse.appended).toEqual([0, 1, 2]))
  await act(async () => {
    for (let i = 0; i < 8; i += 1) await Promise.resolve()
  })
}

beforeEach(() => {
  mediaCurrentTime = 0
  mediaPaused = true
  mediaPlaybackRate = 1
  mse.available = true
  mse.spanSeconds = 10
  mse.created = 0
  mse.appended = []
  mse.start = 0
  mse.end = 0
  document.querySelectorAll('audio').forEach((el) => el.remove())
  window.localStorage.clear()

  patchProto('play', {
    value: vi.fn(() => {
      mediaPaused = false
      return Promise.resolve()
    }),
    writable: true,
  })
  patchProto('pause', {
    value: vi.fn(() => {
      mediaPaused = true
    }),
    writable: true,
  })
  patchProto('load', { value: vi.fn(), writable: true })
  patchProto('paused', { get: () => mediaPaused })
  patchProto('currentTime', {
    get: () => mediaCurrentTime,
    set: (value: number) => {
      mediaCurrentTime = value
    },
  })
  patchProto('playbackRate', {
    get: () => mediaPlaybackRate,
    set: (value: number) => {
      mediaPlaybackRate = value
    },
  })
  // The element's own `duration` on one continuous timeline: the WHOLE buffer —
  // and NaN in production, because nothing assigns `MediaSource.duration`.
  patchProto('duration', { get: () => Number.NaN })
  patchProto('src', {
    get(this: HTMLElement) {
      return this.getAttribute('src') ?? ''
    },
    set(this: HTMLElement, value: string) {
      mediaCurrentTime = 0
      this.setAttribute('src', value)
    },
  })

  URL.createObjectURL = vi.fn(() => 'blob:mock/0') as unknown as typeof URL.createObjectURL
  URL.revokeObjectURL = vi.fn() as unknown as typeof URL.revokeObjectURL

  vi.stubGlobal('requestAnimationFrame', () => 1)
  vi.stubGlobal('cancelAnimationFrame', vi.fn())

  vi.mocked(createMseCarrier).mockClear()
  vi.mocked(synthesizeSpeech).mockReset()
  vi.mocked(synthesizeSpeech).mockImplementation(async () => new ArrayBuffer(8))
})

afterEach(() => {
  cleanup()
  restoreProto()
  URL.createObjectURL = originalCreateObjectURL
  URL.revokeObjectURL = originalRevokeObjectURL
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
  vi.clearAllMocks()
  window.localStorage.clear()
  document.querySelectorAll('audio').forEach((el) => el.remove())
})

describe('sectionRelativePosition', () => {
  it('measures the position from the section start, not from the buffer origin', () => {
    /**
     * THE regression, in one line of arithmetic. Section two begins 30 s into
     * the buffer; the element's clock says 34. The track is 4 s in and 30 s
     * long — not 34 s into a 60 s one, which is what a head unit is told when
     * the subtraction is missing.
     */
    expect(sectionRelativePosition(34, 30, 60, 1)).toEqual({
      position: 4,
      duration: 30,
      playbackRate: 1,
    })
  })

  it('never reports a negative position, so a clock behind the section start is 0', () => {
    // The handoff window: the section is current but its first unit has not
    // been appended yet, so its start is the buffer's end and the playhead is
    // still a fraction behind it. A negative position is a `TypeError` out of
    // `setPositionState`, which is worse than the bug being fixed.
    expect(sectionRelativePosition(29.9, 30, 30, 1)).toEqual({
      position: 0,
      duration: 0,
      playbackRate: 1,
    })
  })

  it('never reports a duration shorter than the position', () => {
    // The playhead runs to the last decoded frame while `end()` is the last
    // APPEND — and on a stall it sits past it. `position > duration` throws.
    expect(sectionRelativePosition(31, 0, 30, 1)).toEqual({
      position: 31,
      duration: 31,
      playbackRate: 1,
    })
  })

  it('reports the section length known so far while the section is still being appended', () => {
    // Only two of the section's units have landed: the track is as long as the
    // media that exists, and grows as the rest arrives.
    expect(sectionRelativePosition(35, 30, 50, 1)).toEqual({
      position: 5,
      duration: 20,
      playbackRate: 1,
    })
  })

  it('refuses to answer at all when any input is not a finite number', () => {
    // `element.currentTime` is NaN before metadata and a timeline that never
    // measured is Infinity away from one that did. Every one of these is a
    // `TypeError` at the call site, so none of them may reach it.
    expect(sectionRelativePosition(Number.NaN, 0, 30, 1)).toBeNull()
    expect(sectionRelativePosition(10, Number.NaN, 30, 1)).toBeNull()
    expect(sectionRelativePosition(10, 0, Number.NaN, 1)).toBeNull()
    expect(sectionRelativePosition(Number.POSITIVE_INFINITY, 0, 30, 1)).toBeNull()
    expect(sectionRelativePosition(10, 0, Number.POSITIVE_INFINITY, 1)).toBeNull()

    // The same call with all three finite DOES answer: refusing is a decision
    // about the inputs, not a function that never answers.
    expect(sectionRelativePosition(10, 0, 30, 1)).toEqual({
      position: 10,
      duration: 30,
      playbackRate: 1,
    })
  })

  it('falls back to a rate of 1 rather than publishing one the API rejects', () => {
    // `playbackRate: 0` is a `TypeError`; so is NaN. A paused reader keeps its
    // rate, it does not acquire one of 0 — the state says paused.
    expect(sectionRelativePosition(10, 0, 30, 0)?.playbackRate).toBe(1)
    expect(sectionRelativePosition(10, 0, 30, Number.NaN)?.playbackRate).toBe(1)
    expect(sectionRelativePosition(10, 0, 30, -1)?.playbackRate).toBe(1)
    // A real rate survives untouched.
    expect(sectionRelativePosition(10, 0, 30, 1.5)?.playbackRate).toBe(1.5)
  })
})

describe('useTTS.readMediaPosition', () => {
  it('answers from the live timeline, not from the element duration', async () => {
    /**
     * Paired on purpose. The element's `duration` is NaN here — exactly as in
     * production, where nothing assigns `MediaSource.duration` — so an answer
     * that came off the element would be unusable; the number that IS usable
     * comes from the timeline the carrier measured.
     */
    const { result } = renderHook(() => useTTS('irrelevant content', { units: UNITS }))
    await startAllThree(result)

    setClock(14)

    expect(result.current.readMediaPosition()).toEqual({
      position: 14,
      duration: 30,
      playbackRate: 1,
    })
    expect(Number.isNaN(document.querySelector('audio')!.duration)).toBe(true)
  })

  it('reports nothing before any unit has been appended', async () => {
    // An empty timeline maps no media at all, and "position 0 of 0" on a track
    // nothing is playing is a lock-screen scrubber that lies. Say nothing.
    const { result } = renderHook(() => useTTS('irrelevant content', { units: UNITS }))

    expect(result.current.readMediaPosition()).toBeNull()

    await startAllThree(result)
    // ...and once there IS media, it answers — so "reports nothing" is a state,
    // not a hook that never answers.
    expect(result.current.readMediaPosition()).not.toBeNull()
  })

  it('reports nothing on the src-swap carrier', async () => {
    /**
     * iPhone Safari has no MediaSource, and that path has always been coherent:
     * one unit per `src`, so the element's own clock and duration describe the
     * media it is playing and Chrome derives a sane position from them. There
     * is nothing to correct, and a timeline of zero-length spans would only
     * publish a worse answer.
     */
    mse.available = false
    const swap = renderHook(() => useTTS('irrelevant content', { units: UNITS }))

    await act(async () => {
      await swap.result.current.play()
    })
    // A per-unit blob: URL is the src-swap carrier's signature.
    await waitFor(() => expect(document.querySelector('audio')?.src).toMatch(/^blob:/))

    setClock(5)
    expect(swap.result.current.readMediaPosition()).toBeNull()

    // The other direction, same content and same clock: silence is a property
    // of the CARRIER, not of a hook that never answers.
    swap.unmount()
    document.querySelectorAll('audio').forEach((el) => el.remove())
    mse.available = true

    const continuous = renderHook(() => useTTS('irrelevant content', { units: UNITS }))
    await startAllThree(continuous.result)

    setClock(5)
    expect(continuous.result.current.readMediaPosition()).toEqual({
      position: 5,
      duration: 30,
      playbackRate: 1,
    })
  })

  it('reports nothing once the reader has stopped', async () => {
    // Stop drops the timeline with the audio, so there is no track to be at a
    // position in — which is what clears the stale one off the lock screen.
    const { result } = renderHook(() => useTTS('irrelevant content', { units: UNITS }))
    await startAllThree(result)

    setClock(14)
    expect(result.current.readMediaPosition()).not.toBeNull()

    await act(async () => {
      result.current.stop()
    })

    expect(result.current.readMediaPosition()).toBeNull()
  })
})

/**
 * Props for a hook that is asked to hand its timeline on. `continueTimeline`
 * is read at the end of the commit that decides a release, so it has to be
 * true BEFORE `stop()` — the way the reader sets it inside `onComplete`.
 */
type HandoffProps = { units: string[]; continueTimeline: boolean }

const renderHandoffHook = () =>
  renderHook(
    ({ units, continueTimeline }: HandoffProps) =>
      useTTS('irrelevant content', { units, continueTimeline }),
    { initialProps: { units: UNITS, continueTimeline: false } as HandoffProps }
  )

/**
 * Section one ends and section two continues the same timeline: units 3..5
 * land at 30..60 s, so section two STARTS at 30 on a timeline that began at 0.
 */
const handOffToNextSection = async (hook: ReturnType<typeof renderHandoffHook>) => {
  hook.rerender({ units: UNITS, continueTimeline: true })
  await act(async () => {
    hook.result.current.stop()
  })
  // THE HANDOFF WINDOW: the section is over, the next one's first unit has not
  // landed, and the timeline is alive. What is published here is 0 s of 0 s —
  // the next section, at its start — never the previous section's minutes,
  // which is what a start still remembered from it would report.
  expect(hook.result.current.readMediaPosition()).toEqual({
    position: 0,
    duration: 0,
    playbackRate: 1,
  })
  hook.rerender({ units: NEXT_UNITS, continueTimeline: true })
  await act(async () => {
    await hook.result.current.play()
  })
  await waitFor(() => expect(mse.appended).toEqual([0, 1, 2, 3, 4, 5]))
  await settle()
}

describe('useTTS.readMediaPosition — remembered section start', () => {
  it('keeps the section start after retention evicts unit 0', async () => {
    /**
     * THE DEVICE LOG. Eleven minutes in, `currentTime` crossed the retention
     * window, the next append trimmed the buffer, and the lock screen went to
     * 0:00 of 0:00 for the rest of the section: `dropBefore` had taken unit 0
     * off the timeline, `startOf(0)` answered null, and the fallback meant for
     * the handoff window — `end()` — became the section start.
     *
     * The setup makes the trim reachable with three units: each is 400 s, and
     * the third is held back until the clock is past the window, so ITS append
     * is the one that runs the trim. Horizon 1050 − 600 = 450 lies in unit 1,
     * the cut goes to unit 1's start, and unit 0 is gone from the map.
     */
    mse.spanSeconds = 400
    let releaseThird!: () => void
    const thirdGate = new Promise<void>((resolve) => {
      releaseThird = resolve
    })
    vi.mocked(synthesizeSpeech).mockImplementation(async (text: string) => {
      if (text.startsWith('c')) await thirdGate
      return new ArrayBuffer(8)
    })

    const { result } = renderHook(() => useTTS('irrelevant content', { units: UNITS }))
    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(mse.appended).toEqual([0, 1]))

    setClock(1050)
    releaseThird()
    await waitFor(() => expect(mse.appended).toEqual([0, 1, 2]))
    // The eviction really ran: the fake buffer now starts at unit 1.
    await waitFor(() => expect(mse.start).toBe(400))
    await settle()

    // Section-relative and non-zero: still 1050 s into a section that began at
    // 0 and has 1200 s of media so far. `end() − end()` is what the bug said.
    expect(result.current.readMediaPosition()).toEqual({
      position: 1050,
      duration: 1200,
      playbackRate: 1,
    })
  })

  it('forgets the section start on a handoff', async () => {
    /**
     * The mirror bug. A start remembered for section one is a fact about
     * section one; carried into section two it would report 34 s into a 60 s
     * track for a section that is 4 s into 30. The base re-seats in
     * `ensureChunks`, and the memory has to go with it.
     */
    const hook = renderHandoffHook()
    await startAllThree(hook.result)
    setClock(14)
    // Remembered here: the answer that puts a start into memory.
    expect(hook.result.current.readMediaPosition()).toEqual({
      position: 14,
      duration: 30,
      playbackRate: 1,
    })

    await handOffToNextSection(hook)

    setClock(34)
    expect(hook.result.current.readMediaPosition()).toEqual({
      position: 4,
      duration: 30,
      playbackRate: 1,
    })
  })

  it('forgets the section start on stop / rebuild', async () => {
    /**
     * After a handoff the remembered start is 30 — a value that is WRONG for
     * any fresh timeline, which is what a stop without a handoff leaves behind.
     * The next session starts at 0 again, and 5 s in must read as 5 s in, not
     * as a clock 25 s behind a start that no longer exists.
     */
    const hook = renderHandoffHook()
    await startAllThree(hook.result)
    await handOffToNextSection(hook)
    setClock(34)
    expect(hook.result.current.readMediaPosition()?.position).toBe(4)

    hook.rerender({ units: NEXT_UNITS, continueTimeline: false })
    await act(async () => {
      hook.result.current.stop()
    })
    expect(hook.result.current.readMediaPosition()).toBeNull()

    hook.rerender({ units: UNITS, continueTimeline: false })
    await act(async () => {
      await hook.result.current.play()
    })
    // A fresh carrier, a fresh timeline: the mock counts a second creation and
    // numbers the appends from 0 again.
    await waitFor(() => expect(mse.created).toBe(2))
    await waitFor(() => expect(mse.appended).toEqual([0, 1, 2]))
    await settle()

    setClock(5)
    expect(hook.result.current.readMediaPosition()).toEqual({
      position: 5,
      duration: 30,
      playbackRate: 1,
    })
  })

  it('forgets the section start when a completed section releases the timeline', async () => {
    /**
     * The release that `stop()` does NOT precede. Completion leaves the unit
     * list in place — a replay starts from it — so the next `play()` never
     * re-bases, and the only thing between a start remembered at 30 and a
     * fresh timeline that begins at 0 is the rebuild itself. This is the one
     * test in the suite that drives the clock with `timeupdate`: completion is
     * the boundary tracker's to declare, and it is the event under test.
     */
    const hook = renderHandoffHook()
    await startAllThree(hook.result)
    await handOffToNextSection(hook)
    hook.rerender({ units: NEXT_UNITS, continueTimeline: false })

    // Section two runs to its end: 30..60 on the shared timeline.
    for (const time of [42, 52, 60]) {
      mediaCurrentTime = time
      await act(async () => {
        document.querySelector('audio')!.dispatchEvent(new Event('timeupdate'))
        for (let i = 0; i < 4; i += 1) await Promise.resolve()
      })
    }
    await waitFor(() => expect(hook.result.current.isPlaying).toBe(false))
    // Released: the timeline is gone, and a position on it with it.
    expect(hook.result.current.readMediaPosition()).toBeNull()

    await act(async () => {
      await hook.result.current.play()
    })
    await waitFor(() => expect(mse.created).toBe(2))
    await waitFor(() => expect(mse.appended).toHaveLength(3))
    await settle()

    setClock(5)
    expect(hook.result.current.readMediaPosition()).toEqual({
      position: 5,
      duration: 30,
      playbackRate: 1,
    })
  })
})
