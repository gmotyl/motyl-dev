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

const setupPendingSynthesis = () => {
  const requests: Array<ReturnType<typeof deferred<ArrayBuffer>>> = []
  const events: string[] = []
  const originalAbort = AbortController.prototype.abort

  vi.spyOn(AbortController.prototype, 'abort').mockImplementation(function (this: AbortController) {
    events.push('abort')
    return originalAbort.call(this)
  })
  ttsClientMock.synthesizeSpeech.mockImplementation((text: string) => {
    events.push(`synthesize:${text}`)
    const request = deferred<ArrayBuffer>()
    requests.push(request)
    return request.promise
  })

  return { events, requests }
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

  it('invalidates pending synthesis before direct playFrom during Next flow and ignores its stale resolution', async () => {
    ttsMock.useActualTTS = true
    const { events, requests } = setupPendingSynthesis()
    const { result } = renderHook(() =>
      useContinuousReader([makeItem(0), makeItem(1), makeItem(2)])
    )

    act(() => result.current.play())
    await waitFor(() => expect(requests).toHaveLength(1))

    act(() => result.current.playFrom(1))
    await waitFor(() => {
      expect(requests).toHaveLength(2)
      expect(result.current.isPlaying).toBe(true)
      expect(result.current.isBuffering).toBe(true)
    })

    expect(events).toEqual([
      'synthesize:prepared speech 0',
      'abort',
      'synthesize:prepared speech 1',
    ])
    expect(result.current.currentIndex).toBe(1)

    await act(async () => {
      requests[0].resolve(new ArrayBuffer(0))
      await Promise.resolve()
    })

    expect(result.current.currentIndex).toBe(1)
    expect(result.current.isPlaying).toBe(true)
    expect(result.current.isBuffering).toBe(true)
    expect(requests).toHaveLength(2)
  })

  it('invalidates pending synthesis before direct playFrom and ignores its stale resolution', async () => {
    ttsMock.useActualTTS = true
    const { events, requests } = setupPendingSynthesis()
    const { result } = renderHook(() =>
      useContinuousReader([makeItem(0), makeItem(1), makeItem(2)])
    )

    act(() => result.current.play())
    await waitFor(() => expect(requests).toHaveLength(1))

    act(() => result.current.playFrom(2))
    await waitFor(() => {
      expect(requests).toHaveLength(2)
      expect(result.current.isPlaying).toBe(true)
      expect(result.current.isBuffering).toBe(true)
    })

    expect(events).toEqual([
      'synthesize:prepared speech 0',
      'abort',
      'synthesize:prepared speech 2',
    ])
    expect(result.current.currentIndex).toBe(2)

    await act(async () => {
      requests[0].resolve(new ArrayBuffer(0))
      await Promise.resolve()
    })

    expect(result.current.currentIndex).toBe(2)
    expect(result.current.isPlaying).toBe(true)
    expect(result.current.isBuffering).toBe(true)
    expect(requests).toHaveLength(2)
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

  it('reader prefetches the next section\'s first chunk once when progress passes the threshold', async () => {
    const { result } = renderHook(() =>
      useContinuousReader([makeItem(0), makeItem(1)])
    )

    act(() => result.current.play())
    await waitFor(() => expect(ttsMock.playback.play).toHaveBeenCalledOnce())
    await waitFor(() => expect(ttsMock.getLatestOptions()?.voice).toBe('pl-PL-ZofiaNeural'))

    const onProgress = () => ttsMock.getLatestOptions()?.onProgress as (progress: number) => void

    // Below threshold: no prefetch yet.
    act(() => onProgress()(50))
    expect(ttsClientMock.prefetchSpeech).not.toHaveBeenCalled()

    // Crossing the threshold fires exactly once for this section...
    act(() => onProgress()(70))
    act(() => onProgress()(85))

    expect(ttsClientMock.prefetchSpeech).toHaveBeenCalledTimes(1)
    expect(ttsClientMock.prefetchSpeech).toHaveBeenCalledWith('prepared speech 1', {
      voice: 'pl-PL-ZofiaNeural',
    })
  })

  it('does not prefetch past the last section', async () => {
    const { result } = renderHook(() => useContinuousReader([makeItem(0)]))

    act(() => result.current.play())
    await waitFor(() => expect(ttsMock.playback.play).toHaveBeenCalledOnce())

    act(() => (ttsMock.getLatestOptions()?.onProgress as (progress: number) => void)(90))

    expect(ttsClientMock.prefetchSpeech).not.toHaveBeenCalled()
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
