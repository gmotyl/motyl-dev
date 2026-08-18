import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import type { SpeechSection } from '@/lib/tts-speech'
import { setStoredTtsVoice, TTS_VOICE_STORAGE_KEY } from '@/lib/tts-voices'
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
}))

vi.mock('@/lib/tts-client', () => ({
  synthesizeSpeech: ttsClientMock.synthesizeSpeech,
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
    ttsClientMock.synthesizeSpeech.mockReset()
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

  it('pauses and resumes the active item', async () => {
    const { result } = renderHook(() => useContinuousReader([makeItem(0)]))

    act(() => result.current.play())
    await waitFor(() => expect(ttsMock.playback.play).toHaveBeenCalledOnce())

    act(() => result.current.pause())
    act(() => result.current.play())

    expect(ttsMock.playback.pause).toHaveBeenCalledOnce()
    expect(ttsMock.playback.play).toHaveBeenCalledTimes(2)
  })

  it('cancels active playback before starting Next', async () => {
    const events: string[] = []
    ttsMock.playback.stop.mockImplementation(() => events.push('stop'))
    ttsMock.playback.play.mockImplementation(async () => {
      events.push('play')
    })
    const { result } = renderHook(() => useContinuousReader([makeItem(0), makeItem(1)]))

    act(() => result.current.play())
    await waitFor(() => expect(ttsMock.playback.play).toHaveBeenCalledOnce())

    act(() => result.current.next())
    await waitFor(() => expect(ttsMock.playback.play).toHaveBeenCalledTimes(2))

    expect(events).toEqual(['play', 'stop', 'play'])
    expect(result.current.currentIndex).toBe(1)
    expect(ttsMock.calls.at(-1)?.content).toBe('prepared speech 1')
  })

  it('ignores a stale completion after Next starts the new item', async () => {
    const { result } = renderHook(() =>
      useContinuousReader([makeItem(0), makeItem(1), makeItem(2)])
    )

    act(() => result.current.play())
    await waitFor(() => expect(ttsMock.playback.play).toHaveBeenCalledOnce())

    const firstItemOptions = ttsMock.calls[0]?.options

    act(() => result.current.next())
    await waitFor(() => expect(ttsMock.playback.play).toHaveBeenCalledTimes(2))

    act(() => (firstItemOptions?.onComplete as () => void)())

    expect(result.current.currentIndex).toBe(1)
    expect(ttsMock.playback.play).toHaveBeenCalledTimes(2)
  })

  it('invalidates pending synthesis before Next and ignores its stale resolution', async () => {
    ttsMock.useActualTTS = true
    const { events, requests } = setupPendingSynthesis()
    const { result } = renderHook(() =>
      useContinuousReader([makeItem(0), makeItem(1), makeItem(2)])
    )

    act(() => result.current.play())
    await waitFor(() => expect(requests).toHaveLength(1))

    act(() => result.current.next())
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
