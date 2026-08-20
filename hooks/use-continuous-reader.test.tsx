import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import type { SpeechSection } from '@/lib/tts-speech'
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
  speechText: `prepared speech ${index}`,
})

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
})
