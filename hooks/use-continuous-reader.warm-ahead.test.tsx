import { act, cleanup, renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { sectionKey, splitIntoSpeechUnits, type SpeechSection } from '@/lib/tts/speech'
import { synthesizeSpeech } from '@/lib/tts/client'
import { createMseCarrier } from '@/lib/reader/mse-carrier'
import type { SeamReport } from '@/lib/reader/seam-report'
import { READER_LOG_FLAG, clearReaderLog, readReaderLog } from '@/lib/reader/diagnostic-log'
import { useContinuousReader } from './use-continuous-reader'

/**
 * WARM-AHEAD across a continued-timeline handoff — the reader's prebuffer
 * ladder and the real `useTTS` together, on the MSE carrier.
 *
 * While audio is running the ladder warms nothing until `useTTS` reports the
 * current section fully buffered; then it warms the next section's first
 * `BUFFER_AHEAD` unit texts at `priority: 'warm'`, one at a time. The handoff
 * extends the SAME timeline, so the "fully buffered" record must be reset for
 * the new section: if it carried over, the section after next would be warmed
 * while the section being read still has units to fetch — warms competing with
 * the playback they are meant to serve.
 *
 * Harness copied from `use-continuous-reader.handoff.test.tsx` (kept unedited).
 */

vi.mock('@/lib/tts/client', () => ({
  synthesizeSpeech: vi.fn(async () => new ArrayBuffer(8)),
  prefetchSpeech: vi.fn(),
}))

/**
 * The fake `MediaSource` behind the real `createMsePlaybackCarrier`, matching
 * `useTTS.mse.test.tsx`'s: every append gains exactly `spanSeconds` of buffer,
 * so unit k occupies [10k, 10k + 10).
 *
 * `created` is THE counter this file is about, and `appended` is its partner:
 * the mock clears `appended` whenever a source is created, so "the next
 * section's units are on the same buffer as the previous section's" is a fact
 * about one list.
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

// Exercised in their own suites; spies here so nothing reaches navigator.
vi.mock('./use-media-session', () => ({ useMediaSession: vi.fn() }))
vi.mock('./useWakeLock', () => ({
  useWakeLock: vi.fn(() => ({
    isSupported: true,
    isActive: false,
    requestWakeLock: vi.fn().mockResolvedValue(undefined),
    releaseWakeLock: vi.fn().mockResolvedValue(undefined),
  })),
}))

let srcAssignments: string[] = []
let revokedUrls: string[] = []
/**
 * Source assignments and object-URL revocations in ONE ordered list.
 *
 * On the src-swap carrier the two counts alone say nothing: a finished
 * section's URL is revoked either way, at the rebuild the handoff should
 * perform or — a whole section later — by the carrier's own prune. Only the
 * ORDER tells those apart, so the two streams are recorded against one clock.
 */
let carrierEvents: string[] = []
let audioPlay: ReturnType<typeof vi.fn>
let audioPause: ReturnType<typeof vi.fn>
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

/**
 * A section whose body is one punctuation-free paragraph, so it splits into
 * exactly two speech units (title, body) and the whole section fits inside
 * `BUFFER_AHEAD` — every unit is on the timeline before the first boundary.
 */
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

/** Paragraph n of a `makeLongItem` section starts with this. */
const STALL_MARKER = 'q'

/**
 * A section of `paragraphs + 1` speech units (the title, then one unit per
 * paragraph), so a section can be made LONGER than `BUFFER_AHEAD` and therefore
 * stall mid-section with units of its own still unappended.
 *
 * Each paragraph is its own unit because it clears `UNIT_MIN_CHARS` on its own
 * and carries no punctuation to merge across, exactly as `makeItem`'s single
 * paragraph does.
 */
const makeLongItem = (index: number, paragraphs: number): SpeechSection => {
  const body = Array.from(
    { length: paragraphs },
    (_, p) => `${STALL_MARKER}${p}${'x'.repeat(208)}`
  ).join('\n\n')
  return { ...makeItem(index), markdown: `## Section ${index}\n\n${body}` }
}

const unitCount = (item: SpeechSection) => splitIntoSpeechUnits(item).length

const renderReader = (items: SpeechSection[]) =>
  renderHook(({ items: current }: { items: SpeechSection[] }) => useContinuousReader(current), {
    initialProps: { items },
  })

/** Start the reader and wait until the first section's units are all appended. */
const startFirstSection = async (
  result: { current: ReturnType<typeof useContinuousReader> },
  items: SpeechSection[]
) => {
  act(() => result.current.play())
  await waitFor(() => expect(mse.appended.length).toBe(unitCount(items[0])))
  await settle()
}

/**
 * Play the first section to its last frame, which is the ONLY way an article
 * completes on this carrier: no `endOfStream()` is ever called, so there is no
 * `ended` event — the element simply runs out of media.
 */
const playOutOnMse = async (items: SpeechSection[]) => {
  const units = unitCount(items[0])
  for (let unit = 1; unit < units; unit += 1) {
    await emitTimeUpdate(unit * mse.spanSeconds + 2)
  }
  await emitTimeUpdate(units * mse.spanSeconds - 0.05)
}

beforeEach(() => {
  srcAssignments = []
  revokedUrls = []
  carrierEvents = []
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

  // Re-armed per test: a test may replace it, and the shared mock survives
  // `restoreAllMocks` with whatever the last test left on it.
  vi.mocked(synthesizeSpeech).mockReset()
  vi.mocked(synthesizeSpeech).mockImplementation(async () => new ArrayBuffer(8))

  audioPlay = vi.fn(() => {
    mediaPaused = false
    return Promise.resolve()
  })
  audioPause = vi.fn(() => {
    mediaPaused = true
  })
  patchProto('play', { value: audioPlay, writable: true })
  patchProto('pause', { value: audioPause, writable: true })
  patchProto('load', { value: vi.fn(), writable: true })
  patchProto('paused', { get: () => mediaPaused })
  patchProto('currentTime', {
    get: () => mediaCurrentTime,
    set: (value: number) => {
      mediaCurrentTime = value
    },
  })
  patchProto('duration', { get: () => mse.end })
  patchProto('src', {
    get(this: HTMLElement) {
      return this.getAttribute('src') ?? ''
    },
    set(this: HTMLElement, value: string) {
      srcAssignments.push(value)
      carrierEvents.push(`src:${value}`)
      mediaCurrentTime = 0
      this.setAttribute('src', value)
    },
  })

  let nextUrl = 0
  URL.createObjectURL = vi.fn(() => `blob:mock/${(nextUrl += 1)}`) as unknown as typeof URL.createObjectURL
  URL.revokeObjectURL = vi.fn((url: string) => {
    revokedUrls.push(url)
    carrierEvents.push(`revoke:${url}`)
  }) as unknown as typeof URL.revokeObjectURL

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

/** The texts of every `priority: 'warm'` synthesis request made so far, in order. */
const warmedTexts = (): string[] =>
  vi
    .mocked(synthesizeSpeech)
    .mock.calls.filter(([, options]) => options?.priority === 'warm')
    .map(([text]) => text)

const unitTexts = (item: SpeechSection) => splitIntoSpeechUnits(item).map((unit) => unit.text)

describe('warm-ahead on the MSE carrier', () => {
  it('warms the next section before the handoff, and not the one after until the new section is fully buffered', async () => {
    /**
     * Three sections: [2 units, 6 units, 2 units]. The middle one is longer
     * than `BUFFER_AHEAD`, so right after the handoff it is NOT fully buffered
     * — only its first units are on the timeline — and section 2 must wait.
     *
     * Paired, because "section 2 is never warmed" is satisfied by a ladder that
     * does nothing: section 1 IS warmed while section 0 plays, and section 2 IS
     * warmed once the playhead has pulled all of section 1 onto the timeline.
     */
    const items = [makeItem(0), makeLongItem(1, 5), makeItem(2)]
    expect(unitCount(items[0])).toBe(2)
    expect(unitCount(items[1])).toBe(6)
    expect(unitCount(items[2])).toBe(2)
    const section1 = unitTexts(items[1])
    const section2 = unitTexts(items[2])

    const { result } = renderReader(items)
    await startFirstSection(result, items)

    // 1. Section 0 is fully appended: the ladder warms section 1's first
    // BUFFER_AHEAD units, in order — and nothing else at 'warm'.
    await waitFor(() => expect(warmedTexts()).toEqual(section1.slice(0, 3)))
    await settle()
    expect(warmedTexts()).toEqual(section1.slice(0, 3))

    // 2. Hand off to section 1 on the same timeline.
    const sourcesAtStart = mse.created
    await playOutOnMse(items)
    await waitFor(() => expect(result.current.currentIndex).toBe(1))
    await waitFor(() => expect(mse.appended.length).toBeGreaterThan(unitCount(items[0])))
    await settle()
    expect(mse.created).toBe(sourcesAtStart)

    // Section 1 still has units off the timeline, so it is not fully buffered
    // and section 2 gets no warm at all.
    expect(mse.appended.length).toBeLessThan(unitCount(items[0]) + unitCount(items[1]))
    expect(warmedTexts()).toEqual(section1.slice(0, 3))

    // 3. Walk section 1 forward until every one of its units is appended.
    const base = unitCount(items[0])
    const total = base + unitCount(items[1])
    for (let unit = 1; unit < unitCount(items[1]) && mse.appended.length < total; unit += 1) {
      // Section 2 stays cold for as long as section 1 is incomplete.
      expect(warmedTexts()).toEqual(section1.slice(0, 3))
      await emitTimeUpdate((base + unit) * mse.spanSeconds + 2)
      await settle()
    }
    await waitFor(() => expect(mse.appended.length).toBe(total))
    expect(mse.appended).toEqual([0, 1, 2, 3, 4, 5, 6, 7])
    expect(result.current.currentIndex).toBe(1)

    // ...and only now is section 2 warmed, both of its units, in order.
    await waitFor(() => expect(warmedTexts()).toEqual([...section1.slice(0, 3), ...section2]))
  })

  it('does not carry the finished section’s appended record into a shorter-buffered next section', async () => {
    /**
     * The test above cannot see a "fully buffered" record that outlives its
     * section: the record is kept in the section's OWN unit numbering, and a
     * two-unit section 0 leaves {0, 1} behind, which section 1's own first
     * appends cover anyway. Only a finished section with MORE units than the
     * next one has on the timeline at the handoff tells the two apart — a
     * leftover {0..5} would call section 1 fully buffered at its first commit
     * and warm section 2 while section 1 still has units to fetch.
     */
    const items = [makeLongItem(0, 5), makeLongItem(1, 5), makeItem(2)]
    expect(unitCount(items[0])).toBe(6)
    expect(unitCount(items[1])).toBe(6)
    const section1 = unitTexts(items[1])
    const section2 = unitTexts(items[2])

    const { result } = renderReader(items)
    act(() => result.current.play())
    await waitFor(() => expect(mse.appended.length).toBeGreaterThan(0))
    await settle()

    // Walk section 0 until all six of its units are on the timeline.
    for (let unit = 1; unit < 6 && mse.appended.length < 6; unit += 1) {
      await emitTimeUpdate(unit * mse.spanSeconds + 2)
      await settle()
    }
    await waitFor(() => expect(mse.appended.length).toBe(6))
    await waitFor(() => expect(warmedTexts()).toEqual(section1.slice(0, 3)))

    // Play section 0 out and hand off on the same timeline.
    const sourcesAtStart = mse.created
    await emitTimeUpdate(6 * mse.spanSeconds - 0.05)
    await waitFor(() => expect(result.current.currentIndex).toBe(1))
    await waitFor(() => expect(mse.appended.length).toBeGreaterThan(6))
    await settle()
    expect(mse.created).toBe(sourcesAtStart)

    // Section 1 is only partly on the timeline: section 2 stays cold.
    expect(mse.appended.length).toBeLessThan(12)
    expect(warmedTexts()).toEqual(section1.slice(0, 3))

    // Pull the rest of section 1 onto the timeline; only then is section 2 warmed.
    for (let unit = 1; unit < 6 && mse.appended.length < 12; unit += 1) {
      expect(warmedTexts()).toEqual(section1.slice(0, 3))
      await emitTimeUpdate((6 + unit) * mse.spanSeconds + 2)
      await settle()
    }
    await waitFor(() => expect(mse.appended.length).toBe(12))
    expect(result.current.currentIndex).toBe(1)
    await waitFor(() => expect(warmedTexts()).toEqual([...section1.slice(0, 3), ...section2]))
  })
})

describe('warm-ahead diagnostic log', () => {
  /**
   * The 2026-09-30 device log showed a handoff whose next title was NOT warm,
   * with 80 s of runway, and nothing in the log to say whether warm-ahead was
   * scheduled, ran late, found no next section, or ran and missed. These lines
   * are what tell those apart; the per-unit ones carry how long each took.
   */
  beforeEach(() => {
    window.localStorage.setItem(READER_LOG_FLAG, '1')
    clearReaderLog()
  })
  afterEach(() => clearReaderLog())

  const warmLines = () =>
    readReaderLog()
      .filter((entry) => entry.type === 'warm-ahead')
      .map((entry) => entry.detail ?? '')

  it('records warm-ahead being scheduled, started and each unit it warmed', async () => {
    const items = [makeItem(0), makeLongItem(1, 5)]
    const nextKey = items[1].key
    const { result } = renderReader(items)
    await startFirstSection(result, items)
    await waitFor(() => expect(warmedTexts()).toHaveLength(3))
    await settle()

    const lines = warmLines()
    expect(lines[0]).toBe(`scheduled ${nextKey}`)
    expect(lines[1]).toMatch(new RegExp(`^start ${nextKey}: 3 units, \\d+ms after scheduled$`))
    expect(lines.slice(2)).toEqual([
      expect.stringMatching(/^unit 0: \d+ms$/),
      expect.stringMatching(/^unit 1: \d+ms$/),
      expect.stringMatching(/^unit 2: \d+ms$/),
    ])
  })

  it('warm-ahead starts even when idle callbacks never fire', async () => {
    /**
     * The 2026-09-30 19:41 device log (Edge Android, screen off) logged
     * `warm-ahead scheduled` and then nothing for 50 s until the handoff: a
     * hidden page never fires `requestIdleCallback`. This stub is that page —
     * it accepts the callback and never calls it back.
     */
    vi.stubGlobal('requestIdleCallback', vi.fn(() => 1))
    vi.stubGlobal('cancelIdleCallback', vi.fn())

    const items = [makeItem(0), makeLongItem(1, 5)]
    const nextKey = items[1].key
    const { result } = renderReader(items)
    await startFirstSection(result, items)

    await waitFor(() =>
      expect(warmLines()).toContainEqual(expect.stringMatching(new RegExp(`^start ${nextKey}: 3 units`)))
    )
    await waitFor(() => expect(warmedTexts()).toEqual(unitTexts(items[1]).slice(0, 3)))
  })

  it('records that there was no next section to warm', async () => {
    const items = [makeItem(0)]
    const { result } = renderReader(items)
    await startFirstSection(result, items)
    await waitFor(() => expect(warmLines()).toContain('scheduled none'))
    await settle()
    expect(warmLines()).toEqual(['scheduled none'])
  })
})
