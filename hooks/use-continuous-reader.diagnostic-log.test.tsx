import { act, cleanup, renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { sectionKey, type SpeechSection } from '@/lib/tts/speech'
import { TTS_VOICE_STORAGE_KEY } from '@/lib/tts/voices'
import {
  READER_LOG_FLAG,
  clearReaderLog,
  readReaderLog,
  type ReaderLogEntry,
} from '@/lib/reader/diagnostic-log'
import { useContinuousReader } from './use-continuous-reader'

/**
 * Diagnostic-log instrumentation for the continuous reader.
 *
 * Same harness shape as `use-continuous-reader.test.tsx` (mocked `useTTS`,
 * `useMediaSession`, `useWakeLock`, synthesis client) — trimmed to what these
 * assertions need. That file keeps the behavioural contract and must stay green
 * untouched; this one only asserts on what was recorded.
 */

const ttsMock = vi.hoisted(() => {
  let latestOptions: Record<string, unknown> | undefined
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
    playback,
    getLatestOptions: () => latestOptions,
    reset: () => {
      latestOptions = undefined
      playback.isPlaying = false
      playback.isBuffering = false
      playback.play.mockClear()
      playback.playFromUnit.mockClear()
      playback.pause.mockClear()
      playback.stop.mockClear()
      playback.resume.mockClear()
    },
    useTTS: vi.fn((_content: string, options: unknown) => {
      latestOptions = options as Record<string, unknown>
      return playback
    }),
  }
})

vi.mock('./useTTS', () => ({
  useTTS: (content: string, options: unknown) => ttsMock.useTTS(content, options),
}))

vi.mock('@/lib/tts/client', () => ({
  synthesizeSpeech: vi.fn(async () => new ArrayBuffer(8)),
  prefetchSpeech: vi.fn(),
}))

vi.mock('./use-media-session', () => ({
  useMediaSession: vi.fn(),
}))

// The wake lock itself is exercised in `useWakeLock.test.tsx`. Here the two
// callbacks keep a STABLE identity across renders, exactly as the real hook's
// `useCallback`-wrapped ones do — the reader hangs an effect off them, so a
// fresh function per render would re-request the lock on every progress tick.
// `isActive` is mutable so a test can hand the reader a *granted* lock.
const wakeLockMock = vi.hoisted(() => {
  const state = { isActive: false }
  const requestWakeLock = vi.fn().mockResolvedValue(undefined)
  const releaseWakeLock = vi.fn().mockResolvedValue(undefined)

  return {
    state,
    requestWakeLock,
    releaseWakeLock,
    reset: () => {
      state.isActive = false
      requestWakeLock.mockReset()
      requestWakeLock.mockResolvedValue(undefined)
      releaseWakeLock.mockClear()
    },
    useWakeLock: vi.fn(() => ({
      isSupported: true,
      isActive: state.isActive,
      requestWakeLock,
      releaseWakeLock,
    })),
  }
})

vi.mock('./useWakeLock', () => ({
  useWakeLock: wakeLockMock.useWakeLock,
}))

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

/**
 * The flag is a plain `localStorage` key. NOT `vi.spyOn(window.localStorage, …)`
 * — jsdom 27's `Storage` is a Proxy, so an instance spy stores an *item* named
 * after the method and the real method still runs.
 */
const enableLog = () => window.localStorage.setItem(READER_LOG_FLAG, '1')

const logged = () => readReaderLog()
const firstOfType = (type: ReaderLogEntry['type']) =>
  logged().find((entry) => entry.type === type)
const typesLogged = () => logged().map((entry) => entry.type)

// jsdom leaves `HTMLMediaElement.play()` / `.pause()` unimplemented; the reader
// never reaches them here (useTTS is mocked), so nothing to stub.

beforeEach(() => {
  window.localStorage.clear()
  window.localStorage.setItem(TTS_VOICE_STORAGE_KEY, 'pl-PL-ZofiaNeural')
  clearReaderLog()
  ttsMock.reset()
  ttsMock.useTTS.mockClear()
  wakeLockMock.reset()
  wakeLockMock.useWakeLock.mockClear()
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  window.localStorage.clear()
  clearReaderLog()
})

describe('useContinuousReader diagnostic log', () => {
  const setPlaying = (
    playing: boolean,
    rerender: (props: { items: SpeechSection[] }) => void,
    items: SpeechSection[]
  ) => {
    ttsMock.playback.isPlaying = playing
    act(() => rerender({ items }))
  }

  it('records reader-error when the reader stops with an error', async () => {
    enableLog()
    const { result } = renderReader([makeItem(0)])

    act(() => result.current.play())
    await waitFor(() => expect(ttsMock.playback.play).toHaveBeenCalledOnce())

    act(() =>
      (ttsMock.getLatestOptions()?.onError as (error: Error) => void)(
        new Error('synthesis failed')
      )
    )

    // The reader really did take the error path.
    expect(result.current.error?.message).toBe('synthesis failed')
    expect(firstOfType('reader-error')?.detail).toBe('synthesis failed')
  })

  it('records section-advance carrying the stable section key', async () => {
    enableLog()
    const items = [makeItem(0), makeItem(1)]
    const { result } = renderReader(items)

    act(() => result.current.play())
    await waitFor(() => expect(ttsMock.playback.play).toHaveBeenCalledOnce())

    act(() => (ttsMock.getLatestOptions()?.onComplete as () => void)())
    await waitFor(() => expect(ttsMock.playback.play).toHaveBeenCalledTimes(2))

    expect(result.current.currentIndex).toBe(1)
    const advance = firstOfType('section-advance')
    // The STABLE key (`<sourceSlug>#<ordinal>`), never a numeric index into the
    // queue: the queue mutates while the reader runs (mark-as-read, DOM
    // eviction), so an index would name a different section by the time the log
    // is read on the device.
    expect(advance?.detail).toBe(sectionKey('news-1', 1))
    expect(advance?.detail).not.toBe('1')
  })

  it('records wakelock-acquired on a granted lock', async () => {
    enableLog()
    const items = [makeItem(0)]
    const { result, rerender } = renderReader(items)

    act(() => result.current.play())
    await waitFor(() => expect(ttsMock.playback.play).toHaveBeenCalledOnce())
    setPlaying(true, rerender, items)

    expect(wakeLockMock.requestWakeLock).toHaveBeenCalledOnce()
    // Nothing is granted yet — a request is not an acquisition.
    expect(firstOfType('wakelock-acquired')).toBeUndefined()

    // The sentinel landed: `useWakeLock` reports the lock as active.
    wakeLockMock.state.isActive = true
    act(() => rerender({ items }))

    expect(firstOfType('wakelock-acquired')).toBeDefined()
  })

  // `wakelock-failed` is NOT asserted here. The real `useWakeLock.acquire()`
  // swallows the rejection — a refused lock is non-fatal by design — so
  // `requestWakeLock()` resolves and the reader's own `.catch` never runs in a
  // browser. A test here could only prove it by driving a MOCK that rejects,
  // i.e. by asserting against a hook contract the real one does not have. The
  // entry is recorded at the rejection, inside `useWakeLock`, and pinned by
  // `useWakeLock.test.tsx` — one source of truth. The reader's `.catch` stays
  // as a belt-and-braces net for a future hook that does propagate.

  it('records nothing while the flag is unset', async () => {
    const items = [makeItem(0), makeItem(1)]

    const { result, rerender } = renderReader(items)

    act(() => result.current.play())
    await waitFor(() => expect(ttsMock.playback.play).toHaveBeenCalledOnce())

    // Section advance.
    act(() => (ttsMock.getLatestOptions()?.onComplete as () => void)())
    await waitFor(() => expect(ttsMock.playback.play).toHaveBeenCalledTimes(2))

    // Wake-lock request, then a granted lock.
    setPlaying(true, rerender, items)
    wakeLockMock.state.isActive = true
    act(() => rerender({ items }))

    // Reader error.
    act(() =>
      (ttsMock.getLatestOptions()?.onError as (error: Error) => void)(
        new Error('synthesis failed')
      )
    )

    // Every instrumented path was actually walked…
    expect(result.current.currentIndex).toBe(1)
    expect(wakeLockMock.requestWakeLock).toHaveBeenCalled()
    expect(result.current.error?.message).toBe('synthesis failed')
    // …and with the flag unset none of it was recorded.
    await waitFor(() => expect(typesLogged()).toEqual([]))
  })
})
