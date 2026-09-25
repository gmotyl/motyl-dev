import { act, cleanup, renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { sectionKey, splitIntoSpeechUnits, type SpeechSection } from '@/lib/tts/speech'
import { synthesizeSpeech } from '@/lib/tts/client'
import { createMseCarrier } from '@/lib/reader/mse-carrier'
import type { SeamReport } from '@/lib/reader/seam-report'
import { useContinuousReader } from './use-continuous-reader'

/**
 * What the reader tells the OS about its POSITION, across a section handoff —
 * the two hooks and the real MSE playback carrier together.
 *
 * The bug this file pins: a track is a section, so the metadata changes at
 * every handoff, while the MSE timeline deliberately CONTINUES across one and
 * `element.currentTime` never resets. Nothing published a position, so Chrome
 * derived one from the element and forwarded it over AVRCP: "new track,
 * position 41 minutes, duration NaN". Fragile head units reboot on that (a
 * Nissan one, reproducibly).
 *
 * The handoff is the only place the two numbering schemes differ, which is why
 * this has to be a two-hook test — a section-relative position and an absolute
 * one are the same number until the first handoff, exactly as
 * `use-continuous-reader.handoff.test.tsx` says of the unit indices.
 */

vi.mock('@/lib/tts/client', () => ({
  synthesizeSpeech: vi.fn(async () => new ArrayBuffer(8)),
  prefetchSpeech: vi.fn(),
}))

/**
 * The fake `MediaSource` behind the real `createMsePlaybackCarrier`, matching
 * `use-continuous-reader.handoff.test.tsx`'s: every append gains exactly
 * `spanSeconds`, so unit k occupies [10k, 10k + 10) and a two-unit section is
 * 20 s long.
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

/**
 * `useMediaSession` as a spy: this file is about WHAT the reader hands it, not
 * about what reaches `navigator` — `use-media-session.test.tsx` owns that half,
 * including every state the API would reject.
 */
const mediaSessionMock = vi.hoisted(() => {
  const calls: Array<Record<string, unknown>> = []
  return {
    calls,
    useMediaSession: vi.fn((options: unknown) => {
      calls.push(options as Record<string, unknown>)
    }),
  }
})

vi.mock('./use-media-session', () => ({
  useMediaSession: mediaSessionMock.useMediaSession,
}))

vi.mock('./useWakeLock', () => ({
  useWakeLock: vi.fn(() => ({
    isSupported: true,
    isActive: false,
    requestWakeLock: vi.fn().mockResolvedValue(undefined),
    releaseWakeLock: vi.fn().mockResolvedValue(undefined),
  })),
}))

interface PublishedPosition {
  position: number
  duration: number
  playbackRate: number
}

/**
 * What the reader would publish right now.
 *
 * The reader hands `useMediaSession` the QUESTION, not an answer — the real
 * hook asks it once per commit, after the timeline behind it has settled — so
 * this asks it the same way, from the latest options the spy recorded.
 */
const latestPosition = (): PublishedPosition | null => {
  const read = mediaSessionMock.calls.at(-1)?.readPosition as
    | (() => PublishedPosition | null)
    | null
    | undefined
  return read?.() ?? null
}

const latestTitle = (): string | null => {
  const metadata = mediaSessionMock.calls.at(-1)?.metadata as { title: string } | null
  return metadata?.title ?? null
}

let mediaCurrentTime = 0
let mediaPaused = true

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

const settle = async (turns = 10) => {
  await act(async () => {
    for (let i = 0; i < turns; i += 1) await Promise.resolve()
  })
}

/** Move the playback clock and fire the ~4Hz clock a hidden page still gets. */
const emitTimeUpdate = async (currentTime: number) => {
  mediaCurrentTime = currentTime
  await act(async () => {
    currentAudio().dispatchEvent(new Event('timeupdate'))
    for (let i = 0; i < 6; i += 1) await Promise.resolve()
  })
}

/** A section of exactly two speech units (title, body), so it is 20 s long. */
const makeItem = (index: number): SpeechSection => ({
  sourceSlug: `news-${index}`,
  sourceTitle: `Article ${index}`,
  title: `Section ${index}`,
  markdown: `## Section ${index}\n\n${String.fromCharCode(97 + index)}${'x'.repeat(210)}`,
  ordinal: index,
  startLine: 1,
  speechText: `prepared speech ${index}`,
  key: sectionKey(`news-${index}`, index),
})

const unitCount = (item: SpeechSection) => splitIntoSpeechUnits(item).length

const renderReader = (items: SpeechSection[]) =>
  renderHook(({ items: current }: { items: SpeechSection[] }) => useContinuousReader(current), {
    initialProps: { items },
  })

const startFirstSection = async (
  result: { current: ReturnType<typeof useContinuousReader> },
  items: SpeechSection[]
) => {
  act(() => result.current.play())
  await waitFor(() => expect(mse.appended.length).toBe(unitCount(items[0])))
  await settle()
}

/** Play the first section to its last frame — the only way it completes here. */
const playOutOnMse = async (items: SpeechSection[]) => {
  const units = unitCount(items[0])
  for (let unit = 1; unit < units; unit += 1) {
    await emitTimeUpdate(unit * mse.spanSeconds + 2)
  }
  await emitTimeUpdate(units * mse.spanSeconds - 0.05)
}

beforeEach(() => {
  mediaCurrentTime = 0
  mediaPaused = true
  mse.available = true
  mse.spanSeconds = 10
  mse.created = 0
  mse.appended = []
  mse.start = 0
  mse.end = 0
  mediaSessionMock.calls.length = 0
  document.querySelectorAll('audio').forEach((el) => el.remove())
  window.localStorage.clear()

  vi.mocked(synthesizeSpeech).mockReset()
  vi.mocked(synthesizeSpeech).mockImplementation(async () => new ArrayBuffer(8))

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
  // NaN, as in production: nothing ever assigns `MediaSource.duration`, which
  // is half of why the position Chrome derives on its own is unusable.
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

  let nextUrl = 0
  URL.createObjectURL = vi.fn(
    () => `blob:mock/${(nextUrl += 1)}`
  ) as unknown as typeof URL.createObjectURL
  URL.revokeObjectURL = vi.fn() as unknown as typeof URL.revokeObjectURL

  vi.stubGlobal('requestAnimationFrame', () => 1)
  vi.stubGlobal('cancelAnimationFrame', vi.fn())

  vi.mocked(createMseCarrier).mockClear()
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

describe('media-session position across a section handoff', () => {
  it('reports the position inside the current section, not the buffer clock', async () => {
    /**
     * THE test this hotfix exists for, and it is paired: the same tick that
     * proves the track CHANGED (metadata names section 1) proves the position
     * was measured from that track's own start. The element's clock reads 24 —
     * publish that against a track the OS was just told is new and the head
     * unit is told the new song is already 24 s into a song of unknown length.
     */
    const items = [makeItem(0), makeItem(1)]
    const { result } = renderReader(items)
    await startFirstSection(result, items)

    const sectionSeconds = unitCount(items[0]) * mse.spanSeconds

    // Section 0 starts the timeline, so its own clock IS the buffer clock.
    await emitTimeUpdate(14)
    await waitFor(() => expect(latestPosition()?.position).toBeCloseTo(14, 5))
    expect(latestPosition()).toEqual({
      position: 14,
      duration: sectionSeconds,
      playbackRate: 1,
    })
    expect(latestTitle()).toBe('Section 0')

    // The handoff: one continuous buffer, so section 1's media sits at [20, 40)
    // and the element's clock keeps climbing through it.
    await playOutOnMse(items)
    await waitFor(() => expect(result.current.currentIndex).toBe(1))
    await waitFor(() =>
      expect(mse.appended.length).toBe(unitCount(items[0]) + unitCount(items[1]))
    )
    await waitFor(() => expect(result.current.isPlaying).toBe(true))

    await emitTimeUpdate(sectionSeconds + 4)

    // The track is new and it is 4 s in, not 24.
    await waitFor(() => expect(latestTitle()).toBe('Section 1'))
    expect(currentAudio().currentTime).toBe(sectionSeconds + 4)
    expect(latestPosition()).toEqual({
      position: 4,
      duration: sectionSeconds,
      playbackRate: 1,
    })
  })

  it('publishes no position before the reader has any media', async () => {
    // An idle reader has a queue (the OS controls are up) but no timeline, so
    // there is no track to be at a position in.
    const items = [makeItem(0), makeItem(1)]
    const { result } = renderReader(items)

    await waitFor(() => expect(mediaSessionMock.calls.length).toBeGreaterThan(0))
    expect(latestPosition()).toBeNull()
    // The controls are up — the session is active and named — so the absence is
    // about the TIMELINE, not about an idle hook.
    expect(latestTitle()).toBe('Section 0')

    // And the moment there is media, there is a position: the null above is a
    // state the reader leaves, not one it never leaves.
    await startFirstSection(result, items)
    await emitTimeUpdate(4)
    await waitFor(() => expect(latestPosition()).not.toBeNull())
  })

  it('drops the position when the reader stops, leaving nothing stale behind', async () => {
    const items = [makeItem(0), makeItem(1)]
    const { result } = renderReader(items)
    await startFirstSection(result, items)

    await emitTimeUpdate(14)
    await waitFor(() => expect(latestPosition()).not.toBeNull())

    await act(async () => {
      result.current.stop()
      await Promise.resolve()
    })

    await waitFor(() => expect(latestPosition()).toBeNull())
  })
})
