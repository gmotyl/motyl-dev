import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { sectionKey, type SpeechSection } from '@/lib/tts-speech'
import { DEFAULT_TTS_VOICE, setStoredTtsVoice, TTS_VOICE_STORAGE_KEY } from '@/lib/tts-voices'
import { useContinuousReader } from './use-continuous-reader'

const ttsMock = vi.hoisted(() => {
  let latestOptions: Record<string, unknown> | undefined
  let useActualTTS = false
  const calls: Array<{ content: string; options: Record<string, unknown> }> = []
  const playback = {
    isPlaying: false,
    isBuffering: false,
    progress: 0,
    currentTime: 0,
    totalEstimatedTime: 0,
    currentChunkIndex: 0,
    totalChunks: 0,
    play: vi.fn().mockResolvedValue(undefined),
    playFromUnit: vi.fn().mockResolvedValue(undefined),
    pause: vi.fn(),
    stop: vi.fn(),
    resume: vi.fn().mockResolvedValue(undefined),
  }

  return {
    calls,
    playback,
    getLatestOptions: () => latestOptions,
    reset: () => {
      latestOptions = undefined
      calls.length = 0
      playback.play.mockClear()
      playback.playFromUnit.mockClear()
      playback.pause.mockClear()
      playback.stop.mockClear()
      playback.resume.mockClear()
    },
    useTTS: vi.fn((content: string, options: unknown) => {
      const normalizedOptions = options as Record<string, unknown>
      latestOptions = normalizedOptions
      calls.push({ content, options: normalizedOptions })
      return playback
    }),
    get useActualTTS() {
      return useActualTTS
    },
    set useActualTTS(value: boolean) {
      useActualTTS = value
    },
  }
})

const ttsClientMock = vi.hoisted(() => ({
  synthesizeSpeech: vi.fn(),
  prefetchSpeech: vi.fn(),
}))

vi.mock('@/lib/tts-client', () => ({
  synthesizeSpeech: ttsClientMock.synthesizeSpeech,
  prefetchSpeech: ttsClientMock.prefetchSpeech,
}))

vi.mock('./useTTS', async () => {
  const actual = await vi.importActual<typeof import('./useTTS')>('./useTTS')

  return {
    ...actual,
    useTTS: (...args: Parameters<typeof actual.useTTS>) =>
      ttsMock.useActualTTS
        ? actual.useTTS(...args)
        : ttsMock.useTTS(args[0], args[1]),
  }
})

const deferred = <T,>() => {
  let resolve!: (value: T | PromiseLike<T>) => void
  const promise = new Promise<T>((promiseResolve) => {
    resolve = promiseResolve
  })

  return { promise, resolve }
}

// Pending-synthesis harness. Dedupes by text (mirroring the real synthesis
// cache) so the prebuffer scheduler and playback, which BOTH call
// synthesizeSpeech, share one never-resolving deferred per text. Exposes
// requests keyed by text so a test can resolve a specific (e.g. stale) one.
const setupPendingSynthesis = () => {
  const requestsByText = new Map<string, ReturnType<typeof deferred<ArrayBuffer>>>()
  const events: string[] = []
  const originalAbort = AbortController.prototype.abort

  vi.spyOn(AbortController.prototype, 'abort').mockImplementation(function (this: AbortController) {
    events.push('abort')
    return originalAbort.call(this)
  })
  ttsClientMock.synthesizeSpeech.mockImplementation((text: string) => {
    const existing = requestsByText.get(text)
    if (existing) return existing.promise
    events.push(`synthesize:${text}`)
    const request = deferred<ArrayBuffer>()
    requestsByText.set(text, request)
    return request.promise
  })

  return { events, requestsByText }
}

const makeItem = (index: number): SpeechSection => ({
  sourceSlug: `news-${index}`,
  sourceTitle: index === 0 ? 'News' : undefined,
  title: `Section ${index}`,
  markdown: `## Section ${index}\nVisible markdown ${index}`,
  ordinal: index,
  startLine: 1,
  speechText: `prepared speech ${index}`,
  key: sectionKey(`news-${index}`, index),
})

const renderReader = (items: SpeechSection[]) =>
  renderHook(({ items: current }: { items: SpeechSection[] }) => useContinuousReader(current), {
    initialProps: { items },
  })

// A paragraph long enough to be its own unit (>= UNIT_MIN_CHARS) and free of
// sentence punctuation, so the no-TLDR first-sentence split does not kick in and
// every body paragraph maps to exactly one unit with its own start line.
const LONG_PARAGRAPH = 'x'.repeat(210)

// Units: title [5,5], body [7,7], body [9,9] — three distinct start lines.
const lineItem: SpeechSection = {
  sourceSlug: 'lines',
  sourceTitle: 'Lines',
  title: 'Heading',
  markdown: ['## Heading', '', `a${LONG_PARAGRAPH}`, '', `b${LONG_PARAGRAPH}`].join('\n'),
  ordinal: 0,
  startLine: 5,
  speechText: 'prepared lines',
  key: sectionKey('lines', 0),
}

// Units: title [1,1], the body's first sentence [2,2], and the remainder merged
// with the next paragraph [2,4] — units 1 and 2 SHARE start line 2.
const sharedLineItem: SpeechSection = {
  sourceSlug: 'shared',
  sourceTitle: 'Shared',
  title: 'Heading',
  markdown: [
    '## Heading',
    'First sentence here. Second sentence follows.',
    '',
    'Third paragraph body.',
  ].join('\n'),
  ordinal: 0,
  startLine: 1,
  speechText: 'prepared shared',
  key: sectionKey('shared', 0),
}

describe('useContinuousReader', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  beforeEach(() => {
    localStorage.clear()
    localStorage.setItem(TTS_VOICE_STORAGE_KEY, 'pl-PL-ZofiaNeural')
    ttsMock.reset()
    ttsMock.useTTS.mockClear()
    ttsMock.useActualTTS = false
    ttsMock.playback.isPlaying = false
    ttsMock.playback.isBuffering = false
    ttsClientMock.synthesizeSpeech.mockReset()
    ttsClientMock.prefetchSpeech.mockReset()
  })

  it('starts a queue item with prepared speech text and selected voice', async () => {
    const { result } = renderHook(() => useContinuousReader([makeItem(0)]))

    act(() => result.current.play())

    await waitFor(() => expect(ttsMock.playback.play).toHaveBeenCalledOnce())

    const itemCall = ttsMock.calls.at(-1)
    expect(itemCall?.content).toBe('prepared speech 0')
    expect(itemCall?.options.voice).toBe('pl-PL-ZofiaNeural')
    expect(result.current.currentIndex).toBe(0)
  })

  it('uses a voice changed in the settings while the reader remains mounted', async () => {
    const { result } = renderHook(() => useContinuousReader([makeItem(0)]))

    act(() => setStoredTtsVoice('en-US-EmmaMultilingualNeural'))

    await waitFor(() => {
      expect(ttsMock.calls.at(-1)?.options.voice).toBe('en-US-EmmaMultilingualNeural')
    })
    expect(result.current.currentIndex).toBe(0)
  })

  it('passes the default voice to useTTS on the first render', () => {
    renderHook(() => useContinuousReader([makeItem(0)]))

    expect(ttsMock.calls[0]?.options.voice).toBe(DEFAULT_TTS_VOICE)
  })

  it('applies the stored voice to useTTS after mount', async () => {
    renderHook(() => useContinuousReader([makeItem(0)]))

    await waitFor(() => {
      expect(ttsMock.getLatestOptions()?.voice).toBe('pl-PL-ZofiaNeural')
    })
  })

  it('pauses and resumes the active item', async () => {
    const { result } = renderHook(() => useContinuousReader([makeItem(0)]))

    act(() => result.current.play())
    await waitFor(() => expect(ttsMock.playback.play).toHaveBeenCalledOnce())

    act(() => result.current.pause())
    act(() => result.current.play())

    expect(ttsMock.playback.pause).toHaveBeenCalledOnce()
    expect(ttsMock.playback.play).toHaveBeenCalledTimes(2)
  })

  it('next while playing scrolls to the next section without stopping or restarting audio', async () => {
    const onItemChange = vi.fn()
    const { result } = renderHook(() =>
      useContinuousReader([makeItem(0), makeItem(1), makeItem(2)], { onItemChange })
    )

    act(() => result.current.play())
    await waitFor(() => expect(ttsMock.playback.play).toHaveBeenCalledOnce())
    onItemChange.mockClear()

    ttsMock.playback.isPlaying = true
    act(() => result.current.next())

    expect(ttsMock.playback.stop).not.toHaveBeenCalled()
    expect(ttsMock.playback.play).toHaveBeenCalledOnce()
    expect(result.current.currentIndex).toBe(0)
    expect(onItemChange).toHaveBeenCalledTimes(1)
    expect(onItemChange).toHaveBeenLastCalledWith(makeItem(1), 1)
  })

  it('next while stopped selects the next section without starting playback', async () => {
    const onItemChange = vi.fn()
    const { result } = renderHook(() =>
      useContinuousReader([makeItem(0), makeItem(1)], { onItemChange })
    )

    act(() => result.current.next())

    expect(result.current.currentIndex).toBe(1)
    expect(ttsMock.playback.play).not.toHaveBeenCalled()
    expect(ttsMock.playback.stop).not.toHaveBeenCalled()
    expect(onItemChange).toHaveBeenLastCalledWith(makeItem(1), 1)
  })

  it('auto-advance still plays the next section when the current one completes', async () => {
    const onItemChange = vi.fn()
    const { result } = renderHook(() =>
      useContinuousReader([makeItem(0), makeItem(1)], { onItemChange })
    )

    act(() => result.current.play())
    await waitFor(() => expect(ttsMock.playback.play).toHaveBeenCalledOnce())

    act(() => (ttsMock.getLatestOptions()?.onComplete as () => void)())
    await waitFor(() => expect(ttsMock.playback.play).toHaveBeenCalledTimes(2))

    expect(result.current.currentIndex).toBe(1)
    expect(ttsMock.calls.at(-1)?.content).toBe('prepared speech 1')
    expect(onItemChange).toHaveBeenLastCalledWith(makeItem(1), 1)
  })

  it('playFrom still interrupts and starts immediately at the target section', async () => {
    const events: string[] = []
    ttsMock.playback.stop.mockImplementation(() => events.push('stop'))
    ttsMock.playback.play.mockImplementation(async () => {
      events.push('play')
    })
    const { result } = renderHook(() =>
      useContinuousReader([makeItem(0), makeItem(1), makeItem(2)])
    )

    act(() => result.current.play())
    await waitFor(() => expect(ttsMock.playback.play).toHaveBeenCalledOnce())

    act(() => result.current.playFrom(2))
    await waitFor(() => expect(ttsMock.playback.play).toHaveBeenCalledTimes(2))

    expect(events).toEqual(['play', 'stop', 'play'])
    expect(result.current.currentIndex).toBe(2)
    expect(ttsMock.calls.at(-1)?.content).toBe('prepared speech 2')
  })

  it('canNext is false at the last section and true otherwise', () => {
    const single = renderHook(() => useContinuousReader([makeItem(0)]))
    expect(single.result.current.canNext).toBe(false)

    const { result } = renderHook(() =>
      useContinuousReader([makeItem(0), makeItem(1)])
    )
    expect(result.current.canNext).toBe(true)

    act(() => result.current.playFrom(1))
    expect(result.current.canNext).toBe(false)
  })

  it('ignores a stale completion after playFrom starts the new item', async () => {
    const { result } = renderHook(() =>
      useContinuousReader([makeItem(0), makeItem(1), makeItem(2)])
    )

    act(() => result.current.play())
    await waitFor(() => expect(ttsMock.playback.play).toHaveBeenCalledOnce())

    const firstItemOptions = ttsMock.calls[0]?.options

    act(() => result.current.playFrom(1))
    await waitFor(() => expect(ttsMock.playback.play).toHaveBeenCalledTimes(2))

    act(() => (firstItemOptions?.onComplete as () => void)())

    expect(result.current.currentIndex).toBe(1)
    expect(ttsMock.playback.play).toHaveBeenCalledTimes(2)
  })

  it('interrupts the pending playback synthesis on play-from-here and ignores its stale resolution', async () => {
    ttsMock.useActualTTS = true
    const { events, requestsByText } = setupPendingSynthesis()
    const { result } = renderHook(() =>
      useContinuousReader([makeItem(0), makeItem(1), makeItem(2)])
    )

    // Section 0's first (title) unit is 'News' (its sourceTitle).
    act(() => result.current.play())
    await waitFor(() => expect(requestsByText.has('News')).toBe(true))

    act(() => result.current.playFrom(1))
    await waitFor(() => {
      expect(result.current.currentIndex).toBe(1)
      expect(result.current.isPlaying).toBe(true)
      expect(result.current.isBuffering).toBe(true)
    })
    // Section 1's title unit is now the one being synthesized, and the
    // interrupt aborted the in-flight (section-0) request.
    await waitFor(() => expect(requestsByText.has('Section 1')).toBe(true))
    expect(events).toContain('abort')

    // Resolving the STALE section-0 synthesis must not regress state.
    await act(async () => {
      requestsByText.get('News')!.resolve(new ArrayBuffer(0))
      await Promise.resolve()
    })

    expect(result.current.currentIndex).toBe(1)
    expect(result.current.isPlaying).toBe(true)
    expect(result.current.isBuffering).toBe(true)
  })

  it('interrupts the pending playback synthesis on play-from-here to a farther section', async () => {
    ttsMock.useActualTTS = true
    const { events, requestsByText } = setupPendingSynthesis()
    const { result } = renderHook(() =>
      useContinuousReader([makeItem(0), makeItem(1), makeItem(2)])
    )

    act(() => result.current.play())
    await waitFor(() => expect(requestsByText.has('News')).toBe(true))

    act(() => result.current.playFrom(2))
    await waitFor(() => {
      expect(result.current.currentIndex).toBe(2)
      expect(result.current.isPlaying).toBe(true)
      expect(result.current.isBuffering).toBe(true)
    })
    await waitFor(() => expect(requestsByText.has('Section 2')).toBe(true))
    expect(events).toContain('abort')

    await act(async () => {
      requestsByText.get('News')!.resolve(new ArrayBuffer(0))
      await Promise.resolve()
    })

    expect(result.current.currentIndex).toBe(2)
    expect(result.current.isPlaying).toBe(true)
    expect(result.current.isBuffering).toBe(true)
  })

  it('automatically advances on completion', async () => {
    const onItemChange = vi.fn()
    const { result } = renderHook(() =>
      useContinuousReader([makeItem(0), makeItem(1)], { onItemChange })
    )

    act(() => result.current.play())
    await waitFor(() => expect(ttsMock.playback.play).toHaveBeenCalledOnce())

    act(() => (ttsMock.getLatestOptions()?.onComplete as () => void)())
    await waitFor(() => expect(ttsMock.playback.play).toHaveBeenCalledTimes(2))

    expect(result.current.currentIndex).toBe(1)
    expect(onItemChange).toHaveBeenLastCalledWith(makeItem(1), 1)
  })

  it('prebuffer ladder warms all section titles, then all TLDRs', async () => {
    ttsClientMock.synthesizeSpeech.mockResolvedValue(new ArrayBuffer(0))
    renderHook(() => useContinuousReader([makeItem(0), makeItem(1), makeItem(2)]))

    const warmed = () =>
      ttsClientMock.synthesizeSpeech.mock.calls.map(([text]) => text as string)

    // Titles of every loaded section (s0 title = its sourceTitle 'News').
    await waitFor(() =>
      expect(warmed()).toEqual(expect.arrayContaining(['News', 'Section 1', 'Section 2']))
    )
    // Then every section's TLDR (here the no-TLDR fallback = body unit).
    await waitFor(() =>
      expect(warmed()).toEqual(
        expect.arrayContaining(['Visible markdown 0', 'Visible markdown 1', 'Visible markdown 2'])
      )
    )

    // Tier gate: OTHER sections' titles are warmed before their TLDRs. (The
    // CURRENT section's title+TLDR come first, in T1, to secure runway.)
    const calls = warmed()
    const lastOtherTitle = Math.max(calls.indexOf('Section 1'), calls.indexOf('Section 2'))
    const firstOtherTldr = Math.min(
      calls.indexOf('Visible markdown 1'),
      calls.indexOf('Visible markdown 2')
    )
    expect(lastOtherTitle).toBeGreaterThanOrEqual(0)
    expect(lastOtherTitle).toBeLessThan(firstOtherTldr)
  })

  it('prebuffer warms the current section title + TLDR first (runway)', async () => {
    ttsClientMock.synthesizeSpeech.mockResolvedValue(new ArrayBuffer(0))
    renderHook(() => useContinuousReader([makeItem(0), makeItem(1), makeItem(2)]))

    const warmed = () =>
      ttsClientMock.synthesizeSpeech.mock.calls.map(([text]) => text as string)

    await waitFor(() => expect(warmed()).toContain('News'))
    // Current section (index 0) title 'News' and its unit-2 'Visible markdown 0'
    // are the first two warmed, before other sections' titles.
    const calls = warmed()
    expect(calls.indexOf('News')).toBeLessThan(calls.indexOf('Section 1'))
    expect(calls.indexOf('Visible markdown 0')).toBeLessThan(calls.indexOf('Section 1'))
  })

  it("warms only the next section's first unit while playing", async () => {
    ttsClientMock.synthesizeSpeech.mockResolvedValue(new ArrayBuffer(0))
    ttsMock.playback.isPlaying = true
    renderReader([makeItem(0), makeItem(1), makeItem(2)])

    const warmed = () =>
      ttsClientMock.synthesizeSpeech.mock.calls.map(([text]) => text as string)

    await waitFor(() => expect(warmed()).toContain('Section 1'))
    await new Promise((resolve) => setTimeout(resolve, 20))

    // The wide tiers stay out of playback's way: no other section's title, no
    // TLDR tier, and not even the current section's own units (that runway
    // belongs to useTTS's BUFFER_AHEAD).
    expect(warmed()).toEqual(['Section 1'])
  })

  it('aborts in-flight warms when the player starts buffering', async () => {
    const { events } = setupPendingSynthesis()
    const items = [makeItem(0), makeItem(1), makeItem(2)]
    const { rerender } = renderReader(items)

    await waitFor(() => expect(events).toContain('synthesize:News'))
    events.length = 0

    // Same `items` identity, so only the buffering flag changes — an unrelated
    // re-render must not be what aborts.
    ttsMock.playback.isBuffering = true
    act(() => rerender({ items }))

    expect(events).toContain('abort')
  })

  it('runs the full title and TLDR tiers when the reader is idle', async () => {
    ttsClientMock.synthesizeSpeech.mockResolvedValue(new ArrayBuffer(0))
    ttsMock.playback.isPlaying = false
    ttsMock.playback.isBuffering = false
    renderReader([makeItem(0), makeItem(1), makeItem(2)])

    const warmed = () =>
      ttsClientMock.synthesizeSpeech.mock.calls.map(([text]) => text as string)

    await waitFor(() =>
      expect(warmed()).toEqual(
        expect.arrayContaining([
          'News',
          'Section 1',
          'Section 2',
          'Visible markdown 0',
          'Visible markdown 1',
          'Visible markdown 2',
        ])
      )
    )
  })

  it('swallows warm failures without surfacing an error', async () => {
    ttsClientMock.synthesizeSpeech.mockRejectedValue(new Error('warm failed'))
    const { result } = renderReader([makeItem(0), makeItem(1)])

    await waitFor(() => expect(ttsClientMock.synthesizeSpeech).toHaveBeenCalled())
    await new Promise((resolve) => setTimeout(resolve, 20))

    expect(result.current.error).toBeNull()
    expect(ttsMock.playback.stop).not.toHaveBeenCalled()
    // A rejecting tier does not stop the ladder: later tiers still run.
    const warmed = ttsClientMock.synthesizeSpeech.mock.calls.map(([text]) => text as string)
    expect(warmed).toEqual(expect.arrayContaining(['News', 'Section 1', 'Visible markdown 1']))
  })

  it('re-runs the ladder with the new voice when the voice changes', async () => {
    ttsClientMock.synthesizeSpeech.mockResolvedValue(new ArrayBuffer(0))
    renderHook(() => useContinuousReader([makeItem(0), makeItem(1)]))

    const warmedWith = (voice: string) =>
      ttsClientMock.synthesizeSpeech.mock.calls.some(
        ([text, opts]) => text === 'Section 1' && (opts as { voice?: string }).voice === voice
      )

    await waitFor(() => expect(warmedWith('pl-PL-ZofiaNeural')).toBe(true))

    ttsClientMock.synthesizeSpeech.mockClear()
    act(() => setStoredTtsVoice('en-US-EmmaMultilingualNeural'))

    await waitFor(() => expect(warmedWith('en-US-EmmaMultilingualNeural')).toBe(true))
  })

  it('does not prebuffer when there are no sections', async () => {
    ttsClientMock.synthesizeSpeech.mockResolvedValue(new ArrayBuffer(0))
    renderHook(() => useContinuousReader([]))

    await new Promise((resolve) => setTimeout(resolve, 10))
    expect(ttsClientMock.synthesizeSpeech).not.toHaveBeenCalled()
  })

  it('stops with a retryable error on synthesis failure', async () => {
    const { result } = renderHook(() => useContinuousReader([makeItem(0), makeItem(1)]))

    act(() => result.current.play())
    await waitFor(() => expect(ttsMock.playback.play).toHaveBeenCalledOnce())

    act(() =>
      (ttsMock.getLatestOptions()?.onError as (error: Error) => void)(new Error('synthesis failed'))
    )

    expect(result.current.error?.message).toBe('synthesis failed')
    expect(result.current.currentIndex).toBe(0)
    expect(ttsMock.playback.stop).toHaveBeenCalledOnce()
    expect(ttsMock.playback.play).toHaveBeenCalledOnce()

    act(() => result.current.retry())
    expect(ttsMock.playback.play).toHaveBeenCalledTimes(2)
  })

  it('keeps playing the same section when earlier articles are removed', async () => {
    const { result, rerender } = renderReader([makeItem(0), makeItem(1), makeItem(2)])

    act(() => result.current.playFromHere(2))
    await waitFor(() => expect(ttsMock.playback.play).toHaveBeenCalledOnce())
    ttsMock.playback.isPlaying = true
    ttsMock.playback.stop.mockClear()

    act(() => rerender({ items: [makeItem(2)] }))

    // The position key still resolves, so only the derived index moves: useTTS
    // keeps the same content and playback is neither stopped nor restarted.
    expect(result.current.currentIndex).toBe(0)
    expect(result.current.position).toEqual({
      sectionKey: sectionKey('news-2', 2),
      unitIndex: 0,
    })
    expect(result.current.currentSlug).toBe('news-2')
    expect(ttsMock.playback.stop).not.toHaveBeenCalled()
    expect(ttsMock.playback.play).toHaveBeenCalledOnce()
    expect(ttsMock.playback.playFromUnit).not.toHaveBeenCalled()
    expect(ttsMock.calls.at(-1)?.content).toBe('prepared speech 2')
  })

  it('resolves forward to the first surviving section when the played article is removed', async () => {
    const { result, rerender } = renderReader([makeItem(0), makeItem(1), makeItem(2)])

    act(() => result.current.playFromHere(1))
    await waitFor(() => expect(ttsMock.playback.play).toHaveBeenCalledOnce())
    ttsMock.playback.isPlaying = true

    act(() => rerender({ items: [makeItem(0), makeItem(2)] }))

    await waitFor(() =>
      expect(result.current.position).toEqual({
        sectionKey: sectionKey('news-2', 2),
        unitIndex: 0,
      })
    )
    expect(result.current.currentIndex).toBe(1)
    expect(result.current.currentSlug).toBe('news-2')
    expect(ttsMock.calls.at(-1)?.content).toBe('prepared speech 2')
    await waitFor(() => expect(ttsMock.playback.play).toHaveBeenCalledTimes(2))
    expect(result.current.error).toBeNull()
  })

  it('falls back to the last surviving section before it when nothing follows survives', async () => {
    const { result, rerender } = renderReader([makeItem(0), makeItem(1), makeItem(2)])

    act(() => result.current.playFromHere(2))
    await waitFor(() => expect(ttsMock.playback.play).toHaveBeenCalledOnce())
    ttsMock.playback.isPlaying = true

    act(() => rerender({ items: [makeItem(0)] }))

    await waitFor(() =>
      expect(result.current.position).toEqual({
        sectionKey: sectionKey('news-0', 0),
        unitIndex: 0,
      })
    )
    expect(result.current.currentIndex).toBe(0)
    expect(ttsMock.calls.at(-1)?.content).toBe('prepared speech 0')
    expect(result.current.error).toBeNull()
  })

  it('re-seats playback on the survivor when the read article is removed while paused', async () => {
    const onItemChange = vi.fn()
    const { result, rerender } = renderHook(
      ({ items }: { items: SpeechSection[] }) => useContinuousReader(items, { onItemChange }),
      { initialProps: { items: [makeItem(0), makeItem(1), makeItem(2)] } }
    )

    act(() => result.current.playFromHere(1))
    await waitFor(() => expect(ttsMock.playback.play).toHaveBeenCalledOnce())

    // Paused, not stopped: `useTTS` retains the removed section's chunks, so
    // moving the position alone would leave the next Play speaking the article
    // the user just marked read.
    act(() => result.current.pause())
    ttsMock.playback.isPlaying = false
    ttsMock.playback.isBuffering = false
    ttsMock.playback.play.mockClear()
    ttsMock.playback.stop.mockClear()
    onItemChange.mockClear()

    act(() => rerender({ items: [makeItem(0), makeItem(2)] }))

    await waitFor(() =>
      expect(result.current.position).toEqual({
        sectionKey: sectionKey('news-2', 2),
        unitIndex: 0,
      })
    )
    expect(result.current.currentIndex).toBe(1)
    // Re-seated on the survivor...
    expect(ttsMock.playback.stop).toHaveBeenCalled()
    expect(ttsMock.calls.at(-1)?.content).toBe('prepared speech 2')
    // ...the eye follows...
    expect(onItemChange).toHaveBeenLastCalledWith(makeItem(2), 1)
    // ...and a paused reader stays paused: no auto-resume.
    expect(ttsMock.playback.play).not.toHaveBeenCalled()
    expect(result.current.error).toBeNull()
  })

  it('does not auto-start playback when the queue first populates', async () => {
    const { result, rerender } = renderHook(
      ({ items }: { items: SpeechSection[] }) => useContinuousReader(items),
      { initialProps: { items: [] as SpeechSection[] } }
    )

    act(() => rerender({ items: [makeItem(0), makeItem(1)] }))

    await waitFor(() =>
      expect(result.current.position).toEqual({
        sectionKey: sectionKey('news-0', 0),
        unitIndex: 0,
      })
    )
    expect(ttsMock.playback.play).not.toHaveBeenCalled()
  })

  it('stops without error when the queue empties', async () => {
    const { result, rerender } = renderReader([makeItem(0), makeItem(1)])

    act(() => result.current.play())
    await waitFor(() => expect(ttsMock.playback.play).toHaveBeenCalledOnce())
    ttsMock.playback.isPlaying = true
    ttsMock.playback.stop.mockClear()

    act(() => rerender({ items: [] }))

    await waitFor(() => expect(ttsMock.playback.stop).toHaveBeenCalled())
    expect(result.current.position).toEqual({ sectionKey: '', unitIndex: 0 })
    expect(result.current.currentSlug).toBeNull()
    expect(result.current.currentItem).toBeUndefined()
    expect(result.current.error).toBeNull()
  })

  it('playFromHere defaults to unit zero', async () => {
    const { result } = renderReader([makeItem(0), makeItem(1)])

    act(() => result.current.playFromHere(1))
    await waitFor(() => expect(ttsMock.playback.play).toHaveBeenCalledOnce())

    expect(result.current.position).toEqual({
      sectionKey: sectionKey('news-1', 1),
      unitIndex: 0,
    })
    expect(ttsMock.playback.playFromUnit).not.toHaveBeenCalled()
  })

  it('playFromHere starts at the requested unit', async () => {
    const { result } = renderReader([makeItem(0), makeItem(1)])

    act(() => result.current.playFromHere(0, 2))

    await waitFor(() => expect(ttsMock.playback.playFromUnit).toHaveBeenCalledWith(2))
    expect(ttsMock.playback.stop).toHaveBeenCalledOnce()
    expect(result.current.position).toEqual({
      sectionKey: sectionKey('news-0', 0),
      unitIndex: 2,
    })
  })

  it('playFromLine picks the unit with the greatest startLine at or below the line', async () => {
    const { result } = renderReader([lineItem])

    act(() => result.current.playFromLine('lines', 8))

    await waitFor(() => expect(ttsMock.playback.playFromUnit).toHaveBeenCalledWith(1))
    expect(result.current.position).toEqual({
      sectionKey: sectionKey('lines', 0),
      unitIndex: 1,
    })

    ttsMock.playback.playFromUnit.mockClear()
    act(() => result.current.playFromLine('lines', 9))
    await waitFor(() => expect(ttsMock.playback.playFromUnit).toHaveBeenCalledWith(2))
  })

  it('playFromLine picks the first unit when several share the greatest startLine', async () => {
    const { result } = renderReader([sharedLineItem])

    // Units 1 and 2 both start on line 2 (first sentence + remainder): the click
    // must land on the paragraph's first unit, never mid-paragraph.
    act(() => result.current.playFromLine('shared', 3))

    await waitFor(() => expect(ttsMock.playback.playFromUnit).toHaveBeenCalledWith(1))
    expect(result.current.position).toEqual({
      sectionKey: sectionKey('shared', 0),
      unitIndex: 1,
    })
  })

  it('playFromLine is a no-op for an unknown slug', async () => {
    const { result } = renderReader([lineItem])

    act(() => result.current.playFromLine('missing', 8))
    // A line before the first unit resolves to nothing either.
    act(() => result.current.playFromLine('lines', 4))

    expect(ttsMock.playback.playFromUnit).not.toHaveBeenCalled()
    expect(ttsMock.playback.play).not.toHaveBeenCalled()
    expect(ttsMock.playback.stop).not.toHaveBeenCalled()
    expect(result.current.position).toEqual({
      sectionKey: sectionKey('lines', 0),
      unitIndex: 0,
    })
  })

  it('next remains a non-interrupting soft advance', async () => {
    const onItemChange = vi.fn()
    const { result } = renderHook(() =>
      useContinuousReader([makeItem(0), makeItem(1), makeItem(2)], { onItemChange })
    )

    act(() => result.current.play())
    await waitFor(() => expect(ttsMock.playback.play).toHaveBeenCalledOnce())
    onItemChange.mockClear()

    ttsMock.playback.isPlaying = true
    act(() => result.current.next())

    expect(ttsMock.playback.stop).not.toHaveBeenCalled()
    expect(ttsMock.playback.play).toHaveBeenCalledOnce()
    expect(ttsMock.playback.playFromUnit).not.toHaveBeenCalled()
    // The reading position does not move — only the eye does.
    expect(result.current.position).toEqual({
      sectionKey: sectionKey('news-0', 0),
      unitIndex: 0,
    })
    expect(result.current.currentIndex).toBe(0)
    expect(onItemChange).toHaveBeenCalledTimes(1)
    expect(onItemChange).toHaveBeenLastCalledWith(makeItem(1), 1)
  })
})
