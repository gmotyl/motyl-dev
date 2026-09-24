import { act, cleanup, renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { sectionKey, splitIntoSpeechUnits, type SpeechSection } from '@/lib/tts/speech'
import { synthesizeSpeech } from '@/lib/tts/client'
import { createMseCarrier } from '@/lib/reader/mse-carrier'
import type { SeamReport } from '@/lib/reader/seam-report'
import { useContinuousReader } from './use-continuous-reader'

/**
 * What a SECTION HANDOFF costs, end to end — the reader, `useTTS` and the real
 * MSE playback carrier together.
 *
 * The risk the whole carrier change turns on. A `MediaSource` created mid-run
 * is a `src` assignment, and a `src` assignment is the moment a backgrounded
 * phone revokes the page's media exemption — the spike's control died at its
 * third one, 38 seconds in. Per-unit boundaries are gone by construction (one
 * continuous timeline), so the only ones left are the per-SECTION ones, and
 * roughly five of those per ten minutes is not "safe", it is the same failure
 * made rarer and harder to reproduce.
 *
 * So the auto-advance handoff must extend the timeline the carrier already
 * holds, and every other way into a new section must NOT — those are user
 * actions taken with the screen on, where a boundary is free.
 *
 * Every assertion here is therefore PAIRED, because "no new MediaSource" is
 * satisfied by a reader that does nothing at all:
 *   - the handoff test asserts the source count did not move AND that the next
 *     section's units actually landed on the SAME buffer (the mock empties its
 *     appended list per source, so a rebuild is visible in it too), and
 *   - the play-from-here and re-seat tests are the inverse control: they assert
 *     the same counter DOES move, so an implementation that continued the
 *     timeline everywhere fails them.
 *
 * And the pairing has a second axis, because a continued timeline is numbered
 * in ABSOLUTE indices while everything downstream of it — the boundary tracker,
 * the end-of-content question, the seek — is written in the hook's own
 * per-section indices. "What was appended, and where" cannot see a translation
 * that has been dropped: the appends are identical either way and the damage is
 * entirely in WHAT PLAYS AFTERWARDS. So the tests below also pin the playback
 * that follows a handoff — the crossing inside the new section, the stall in
 * the middle of it, and the second the playhead is moved to when it begins.
 *
 * `useTTS` is deliberately NOT mocked here — this file exists to test the two
 * hooks against each other. `use-continuous-reader.test.tsx` keeps its mock and
 * stays unedited.
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

/** The src-swap carrier's per-unit completion — its answer to a boundary. */
const endCurrentUnit = async () => {
  await act(async () => {
    currentAudio().dispatchEvent(new Event('ended'))
    for (let i = 0; i < 8; i += 1) await Promise.resolve()
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

/** Paragraph n of a `makeLongItem` section starts with this; see `stallUnit`. */
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

/** Make one unit's synthesis hang forever — the buffer stops there. */
const stallUnit = (item: SpeechSection, unitIndex: number) => {
  const text = splitIntoSpeechUnits(item)[unitIndex].text
  vi.mocked(synthesizeSpeech).mockImplementation(
    async (candidate: string) =>
      candidate === text ? new Promise<ArrayBuffer>(() => {}) : new ArrayBuffer(8)
  )
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

  // Re-armed per test: `stallUnit` replaces it, and the shared mock survives
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

describe('section handoffs on the MSE carrier', () => {
  it('creates no new MediaSource on an auto-advance handoff', async () => {
    /**
     * THE test this task exists for. A section ending and the reader moving on
     * by itself is the one boundary a ten-minute screen-off run still has, and
     * it has to cost nothing: the next section's units are appended to the
     * buffer that is already playing.
     *
     * Three things are asserted together, and dropping any one of them leaves a
     * test that a no-op passes:
     *   1. the source count did not move,
     *   2. the next section's units are on the SAME source (the mock clears its
     *      appended list whenever one is created, so a rebuild shows up here as
     *      the list restarting at 0), and
     *   3. the reader actually got to the next section and is playing it.
     */
    const items = [makeItem(0), makeItem(1)]
    const { result } = renderReader(items)
    await startFirstSection(result, items)

    const sourcesAtStart = mse.created
    const firstSectionUnits = unitCount(items[0])
    const srcAtStart = srcAssignments.length

    await playOutOnMse(items)

    // The handoff lands a commit later: the reader queues the next section and
    // the effect behind it starts playback.
    await waitFor(() => expect(result.current.currentIndex).toBe(1))
    await waitFor(() =>
      expect(mse.appended.length).toBe(firstSectionUnits + unitCount(items[1]))
    )

    // 1. No boundary was paid for the handoff.
    expect(mse.created).toBe(sourcesAtStart)
    expect(srcAssignments).toHaveLength(srcAtStart)

    // 2. ONE buffer holds both sections, and the second section's units were
    // appended under indices of their own — a timeline that reused the first
    // section's indices would have been deduplicated away instead.
    expect(mse.appended).toEqual([0, 1, 2, 3])

    // 3. The reader is reading the next section, not merely quiet.
    await waitFor(() => expect(result.current.isPlaying).toBe(true))

    // 3b. ...and it is reading the next section's MEDIA. On one continuous
    // timeline a unit is a POSITION, so the handoff's only way to start the new
    // section is to move the playhead onto it — and the finished section is
    // still sitting on that timeline under indices of its own. A seek that
    // asked for "unit 0" in the hook's numbering rather than the carrier's
    // lands on the FIRST unit of the article instead, which is second 0: every
    // handoff would quietly restart the whole article's audio while the UI
    // showed the new section. The seat has to be inside the new section's span.
    const newSectionStart = firstSectionUnits * mse.spanSeconds
    const newSectionEnd = (firstSectionUnits + unitCount(items[1])) * mse.spanSeconds
    await waitFor(() =>
      expect(currentAudio().currentTime).toBeGreaterThanOrEqual(newSectionStart)
    )
    expect(currentAudio().currentTime).toBeLessThan(newSectionEnd)

    // 4. And the completion it came through did not follow it across. The
    // playhead is now inside the new section's first unit on a timeline that
    // still holds the finished section, at a position that was the END of
    // everything appended one commit ago — the exact shape that would complete
    // the article a second time if "every unit is on the timeline" were asked
    // of the previous section's numbering.
    await emitTimeUpdate(firstSectionUnits * mse.spanSeconds + 2)
    expect(result.current.currentIndex).toBe(1)
    expect(result.current.isPlaying).toBe(true)
  })

  it('reads the new section unit by unit instead of jumping at its first boundary', async () => {
    /**
     * What the handoff test above cannot see: the boundary tracker runs on the
     * continued timeline, which is numbered ABSOLUTELY, while every index the
     * tracker hands back is used as an index into THIS section's chunk list.
     * The subtraction that turns one into the other has no effect at all before
     * the first handoff (the base is 0) and no effect on what gets appended
     * after one — so dropping it leaves every append, every source count and
     * every "is the reader playing?" answer exactly as they are.
     *
     * What it does instead is make the first crossing INSIDE a continued
     * section report an index past the end of the section's chunk list, which
     * is the completion branch: every section after the first would play its
     * unit 0 and jump. Three sections and one crossing in the middle of the
     * second is what tells the two apart.
     */
    const items = [makeItem(0), makeItem(1), makeItem(2)]
    const { result } = renderReader(items)
    await startFirstSection(result, items)

    const sourcesAtStart = mse.created
    await playOutOnMse(items)

    await waitFor(() => expect(result.current.currentIndex).toBe(1))
    await waitFor(() => expect(mse.appended).toEqual([0, 1, 2, 3]))

    // A boundary INSIDE section 1: absolute unit 2 → 3, which is that section's
    // own unit 0 → 1. The reader must still be on section 1, one unit further
    // in — not already on section 2.
    await emitTimeUpdate(2 * mse.spanSeconds + 12)
    expect(result.current.currentIndex).toBe(1)
    expect(result.current.currentChunkIndex).toBe(1)

    // And section 1's REAL end still hands off, on the same timeline.
    await emitTimeUpdate(4 * mse.spanSeconds - 0.05)
    await waitFor(() => expect(result.current.currentIndex).toBe(2))
    await waitFor(() => expect(mse.appended).toEqual([0, 1, 2, 3, 4, 5]))
    expect(mse.created).toBe(sourcesAtStart)
  })

  it('does not complete the article at a buffer stall inside a continued section', async () => {
    /**
     * The other half of what the absolute numbering protects, and the one the
     * handoff test's assertion 4 only LOOKS like it covers.
     *
     * `reachedEndOfContent` asks two questions — "is every remaining unit of
     * this section on the timeline?" and "is the playhead at its end?" — and
     * completing the article needs both. Assertion 4 parks the playhead well
     * short of the end, so question 2 answers no and question 1 is never
     * reached; an untranslated lookup survives it untouched.
     *
     * Discriminating needs a section that the buffer cannot finish: four units
     * against a `BUFFER_AHEAD` of three, with the fourth one's synthesis never
     * arriving. Five units are then on the timeline (0–4 absolute), the
     * playhead parks at its very end — and asked in the section's own numbering
     * the answer is "unit 3 has no media, keep reading", while asked in the
     * carrier's it is "units 0–3 all have media, the article is over".
     */
    const items = [makeItem(0), makeLongItem(1, 3)]
    expect(unitCount(items[0])).toBe(2)
    expect(unitCount(items[1])).toBe(4)
    stallUnit(items[1], 3)

    const { result } = renderReader(items)
    await startFirstSection(result, items)

    const sourcesAtStart = mse.created
    await playOutOnMse(items)

    // Five units on one timeline: the finished section's two, plus the three
    // of the new one the buffer got to before the stall.
    await waitFor(() => expect(result.current.currentIndex).toBe(1))
    await waitFor(() => expect(mse.appended).toEqual([0, 1, 2, 3, 4]))

    // Walk to the last second of everything that is buffered, crossing this
    // section's own boundaries on the way.
    await emitTimeUpdate(2 * mse.spanSeconds + 12)
    await emitTimeUpdate(4 * mse.spanSeconds + 2)
    await emitTimeUpdate(5 * mse.spanSeconds - 0.02)

    // The article is NOT over — the section has a fourth unit that is merely
    // late. The reader waits for it, still on this section, still playing.
    expect(result.current.isPlaying).toBe(true)
    expect(result.current.currentIndex).toBe(1)
    expect(result.current.currentChunkIndex).toBe(2)
    expect(mse.appended).toEqual([0, 1, 2, 3, 4])
    expect(mse.created).toBe(sourcesAtStart)
  })

  it('rebuilds the timeline on play-from-here', async () => {
    /**
     * The inverse control, and the reason the test above cannot be passed by an
     * implementation that continues the timeline unconditionally. Play-from-here
     * is a tap: the screen is on, a boundary is free, and the timeline must
     * start over so the jump does not carry the abandoned section's audio.
     */
    const items = [makeItem(0), makeItem(1)]
    const { result } = renderReader(items)
    await startFirstSection(result, items)

    const sourcesAtStart = mse.created

    act(() => result.current.playFrom(1))
    await waitFor(() => expect(result.current.currentIndex).toBe(1))
    await waitFor(() => expect(mse.appended.length).toBe(unitCount(items[1])))

    expect(mse.created).toBe(sourcesAtStart + 1)
    // A fresh timeline, numbered from the start — not an extension of the one
    // the abandoned section was on.
    expect(mse.appended).toEqual([0, 1])
  })

  it('rebuilds the timeline on a queue re-seat', async () => {
    /**
     * The other inverse control. Mark-as-read and DOM eviction remove the
     * section being read out from under the reader; it re-seats on the survivor
     * and keeps going. That is a queue mutation rather than a handoff, the
     * abandoned section's audio must go with it, and the screen is on.
     */
    const items = [makeItem(0), makeItem(1)]
    const { result, rerender } = renderReader(items)
    await startFirstSection(result, items)

    const sourcesAtStart = mse.created

    rerender({ items: [items[1]] })
    await waitFor(() => expect(result.current.currentIndex).toBe(0))
    await waitFor(() => expect(mse.appended.length).toBe(unitCount(items[1])))

    expect(mse.created).toBe(sourcesAtStart + 1)
    expect(mse.appended).toEqual([0, 1])
  })

  it('rebuilds the timeline on play-from-here taken AFTER a handoff', async () => {
    /**
     * Both inverse controls above start from a virgin timeline, where "do not
     * continue" and "there is nothing to continue" are the same state — so
     * neither of them actually tests the invariant they document, which is that
     * continuation is claimed per BOUNDARY and not once per session. Taken
     * after a handoff, a tap must still drop the timeline the handoff built,
     * and the new section's units must be numbered from 0 again: a base left
     * where the continuation put it would offer the carrier indices the
     * abandoned timeline already used.
     */
    const items = [makeItem(0), makeItem(1), makeItem(2)]
    const { result } = renderReader(items)
    await startFirstSection(result, items)

    await playOutOnMse(items)
    await waitFor(() => expect(result.current.currentIndex).toBe(1))
    await waitFor(() => expect(mse.appended).toEqual([0, 1, 2, 3]))

    const sourcesAfterHandoff = mse.created

    act(() => result.current.playFrom(2))
    await waitFor(() => expect(result.current.currentIndex).toBe(2))
    await waitFor(() => expect(mse.appended.length).toBe(unitCount(items[2])))

    expect(mse.created).toBe(sourcesAfterHandoff + 1)
    expect(mse.appended).toEqual([0, 1])
  })

  it('rebuilds the timeline on a queue re-seat taken AFTER a handoff', async () => {
    /** The same point for the other inverse control. */
    const items = [makeItem(0), makeItem(1), makeItem(2)]
    const { result, rerender } = renderReader(items)
    await startFirstSection(result, items)

    await playOutOnMse(items)
    await waitFor(() => expect(result.current.currentIndex).toBe(1))
    await waitFor(() => expect(mse.appended).toEqual([0, 1, 2, 3]))

    const sourcesAfterHandoff = mse.created

    // The section being read is marked read and evicted; the reader re-seats.
    rerender({ items: [items[0], items[2]] })
    await waitFor(() => expect(result.current.currentSlug).toBe('news-2'))
    await waitFor(() => expect(mse.appended.length).toBe(unitCount(items[2])))

    expect(mse.created).toBe(sourcesAfterHandoff + 1)
    expect(mse.appended).toEqual([0, 1])
  })
})

describe('section handoffs on the src-swap carrier', () => {
  it('ignores continueTimeline on the src-swap carrier', async () => {
    /**
     * iPhone Safari has no MediaSource at all, so this is a live path. A unit
     * there IS a file and there is no timeline to extend, so a handoff must
     * behave exactly as it always has: the finished section's object URLs are
     * released and the next section's units get their own.
     *
     * The failure this guards is a continuation check written without asking
     * WHICH carrier is underneath — the release would then be skipped here too,
     * and the finished section's audio would stay alive through the next one.
     *
     * "It was revoked" is NOT the assertion, because it is revoked either way:
     * the carrier's own prune drops it a whole section later, when the playhead
     * has moved past its retention window. What separates a released timeline
     * from a continued one is WHEN — before the next section's first source is
     * assigned, or after it.
     */
    mse.available = false
    const items = [makeItem(0), makeItem(1)]
    const { result } = renderReader(items)

    act(() => result.current.play())
    await waitFor(() => expect(srcAssignments.length).toBeGreaterThan(0))
    await settle()

    // Every unit of the first section but its last.
    const units = unitCount(items[0])
    for (let unit = 0; unit < units - 1; unit += 1) await endCurrentUnit()

    const lastSourceOfFirstSection = srcAssignments[srcAssignments.length - 1]
    const sourcesAtHandoff = srcAssignments.length

    // The last unit ends: the section is over and the reader advances by itself.
    await endCurrentUnit()
    await waitFor(() => expect(result.current.currentIndex).toBe(1))
    await waitFor(() => expect(srcAssignments.length).toBeGreaterThan(sourcesAtHandoff))

    const firstSourceOfNextSection = srcAssignments[sourcesAtHandoff]
    const released = carrierEvents.indexOf(`revoke:${lastSourceOfFirstSection}`)
    const nextSectionStarted = carrierEvents.indexOf(`src:${firstSourceOfNextSection}`)

    // No MediaSource was ever built — there is none to build on this carrier.
    expect(vi.mocked(createMseCarrier)).not.toHaveBeenCalled()
    // The finished section was released AT the handoff, exactly as it is when
    // no continuation is claimed at all.
    expect(released).toBeGreaterThan(-1)
    expect(nextSectionStarted).toBeGreaterThan(-1)
    expect(released).toBeLessThan(nextSectionStarted)
    // A unit here is still a file: every one of them costs its own src.
    expect(srcAssignments.every((src) => src.startsWith('blob:'))).toBe(true)
  })
})
