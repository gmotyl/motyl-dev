import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useTTS } from './useTTS'
import { synthesizeSpeech } from '@/lib/tts-client'

// Mock the synthesis client so no real network / edge-tts is touched.
vi.mock('@/lib/tts-client', () => ({
  synthesizeSpeech: vi.fn(async () => new ArrayBuffer(8)),
  prefetchSpeech: vi.fn(),
}))

/**
 * Regression test for "Play from here" while a section is actively PLAYING.
 *
 * The reader's play-from-here path is: stop() -> play(). stop() -> pause()
 * calls AudioContext.suspend(), which is ASYNC: the promise resolves and the
 * context state flips to 'suspended' on a later task, NOT synchronously. So the
 * immediately-following play() -> playChunk() runs while a suspend is still
 * in flight and audioContext.state is still 'running'.
 *
 * The OLD code only resumed the context when state === 'suspended', so from
 * that in-flight window it SKIPPED resume, started the source, and then the
 * pending suspend landed -> context suspended -> audio frozen.
 *
 * The fix resumes UNCONDITIONALLY before starting the source. WebAudio
 * processes suspend/resume control messages in call order, so a resume queued
 * after an in-flight suspend leaves the context running.
 *
 * We model the in-flight-suspend window by making the fake suspend() flip the
 * state on a macrotask (setTimeout) while its promise resolves immediately.
 * resume() (a synchronous control message) cancels that pending suspend, which
 * models "resume after suspend leaves the context running".
 */

// Sequence of relevant control events across the fake context's lifetime.
let sequence: string[] = []
let contexts: FakeAudioContext[] = []
// `offset` argument of every source.start() call, in order.
let startOffsets: number[] = []
// Every FakeBufferSource created, in order, so tests can fire its `onended`
// to simulate a chunk finishing playback.
let sources: FakeBufferSource[] = []

class FakeAudioBuffer {
  duration = 1
  numberOfChannels = 1
  length = 1
  sampleRate = 48000
}

class FakeBufferSource {
  buffer: FakeAudioBuffer | null = null
  onended: (() => void) | null = null
  connect = vi.fn()
  disconnect = vi.fn()
  stop = vi.fn()
  start = vi.fn((_when = 0, offset = 0) => {
    sequence.push('start')
    startOffsets.push(offset)
  })

  constructor() {
    sources.push(this)
  }
}

class FakeAudioContext {
  state: 'running' | 'suspended' | 'closed' = 'running'
  currentTime = 0
  destination = {}
  private pendingSuspend: ReturnType<typeof setTimeout> | null = null

  constructor() {
    contexts.push(this)
  }

  createBufferSource() {
    return new FakeBufferSource() as unknown as AudioBufferSourceNode
  }

  // Tracks buffers already handed to decodeAudioData. The real WebAudio
  // decodeAudioData DETACHES its input, so decoding the same instance again
  // throws DataCloneError. We model that: a second decode of the same
  // ArrayBuffer instance throws synchronously, exactly like the browser.
  private decodedBuffers = new WeakSet<ArrayBuffer>()

  // Callback form, matching useTTS's usage.
  decodeAudioData(
    buffer: ArrayBuffer,
    onSuccess: (b: AudioBuffer) => void,
    _onError?: (e: unknown) => void
  ) {
    if (this.decodedBuffers.has(buffer)) {
      throw new DOMException('Cannot decode detached ArrayBuffer', 'DataCloneError')
    }
    this.decodedBuffers.add(buffer)
    // Resolve on a microtask so play()'s fetch chain completes before any
    // macrotask (the pending suspend) fires.
    Promise.resolve().then(() => onSuccess(new FakeAudioBuffer() as unknown as AudioBuffer))
    return Promise.resolve(new FakeAudioBuffer() as unknown as AudioBuffer)
  }

  suspend() {
    // Async: state flips on a later task, NOT synchronously. This recreates the
    // in-flight window where state is still 'running' right after the call.
    this.pendingSuspend = setTimeout(() => {
      this.state = 'suspended'
      this.pendingSuspend = null
    }, 0)
    return Promise.resolve()
  }

  resume() {
    sequence.push('resume')
    // A resume control message queued after an in-flight suspend wins: the net
    // effect is a running context.
    if (this.pendingSuspend) {
      clearTimeout(this.pendingSuspend)
      this.pendingSuspend = null
    }
    this.state = 'running'
    return Promise.resolve()
  }

  close() {
    this.state = 'closed'
    return Promise.resolve()
  }
}

const flushMicrotasks = () => act(async () => { await Promise.resolve() })

beforeEach(() => {
  sequence = []
  contexts = []
  startOffsets = []
  sources = []
  vi.stubGlobal('AudioContext', FakeAudioContext as unknown as typeof AudioContext)
  vi.stubGlobal('webkitAudioContext', FakeAudioContext as unknown as typeof AudioContext)
  // Keep the rAF progress loop from actually running in jsdom.
  vi.stubGlobal('requestAnimationFrame', () => 1)
  vi.stubGlobal('cancelAnimationFrame', () => {})
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.clearAllMocks()
})

describe('useTTS play-from-here interruption', () => {
  it('resumes the audio context unconditionally so a new source starts while running, even when the previous suspend is still in flight', async () => {
    const { result } = renderHook(() => useTTS('Hello world. This is a test.'))

    // First play: start a source.
    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(sequence).toContain('start'))

    const ctx = contexts[0]
    expect(ctx).toBeTruthy()

    // "Play from here" while playing: stop() (async suspend in flight) then
    // immediately play() again -- this is the exact reader sequence.
    await act(async () => {
      result.current.stop()
      await result.current.play()
    })

    // Let playChunk's (awaited) resume + synchronous start run.
    await flushMicrotasks()
    await waitFor(() => expect(sequence.filter((e) => e === 'start').length).toBe(2))

    // Contract: resume() must be called (unconditionally) immediately before the
    // second source.start(). OLD conditional-resume code never resumes here
    // (state was still 'running'), so this is 'start' and the test fails.
    expect(sequence[sequence.length - 2]).toBe('resume')

    // Let the previously in-flight suspend land. Under the fix, resume already
    // cancelled it, so the context stays running. Under the old code, no resume
    // ran and the context flips to 'suspended' -> frozen audio.
    await act(async () => {
      await new Promise((r) => setTimeout(r, 5))
    })
    expect(ctx.state).toBe('running')
  })
})

describe('useTTS replay with a cached (shared) synthesis buffer', () => {
  it('decodes a copy so a replayed chunk does not fail with detached ArrayBuffer', async () => {
    // Model lib/tts-client's synthesis cache: the SAME ArrayBuffer instance is
    // returned to every caller for a given voice+text. decodeAudioData detaches
    // its input, so useTTS must decode a COPY or the second play (play-from-here
    // clears the decoded-buffer cache and re-fetches the same cached buffer)
    // throws "Cannot decode detached ArrayBuffer".
    const shared = new ArrayBuffer(8)
    vi.mocked(synthesizeSpeech).mockResolvedValue(shared)

    const { result } = renderHook(() => useTTS('Hello world.'))

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(sequence.filter((e) => e === 'start').length).toBe(1))

    // Replay the same content (as play-from-here does): stop() clears the
    // decoded-buffer cache, so play() re-fetches the same cached `shared` buffer
    // and decodes it again. With slice(0) this succeeds; without it, throws.
    await act(async () => {
      result.current.stop()
      await result.current.play()
    })
    await flushMicrotasks()

    await waitFor(() => expect(sequence.filter((e) => e === 'start').length).toBe(2))
    expect(result.current.isPlaying).toBe(true)
  })
})

describe('useTTS units option', () => {
  it('plays the provided units in order instead of length-chunking the content', async () => {
    vi.mocked(synthesizeSpeech).mockClear()
    const units = ['Title unit', 'TLDR unit here.', 'Body chunk text.']

    const { result } = renderHook(() =>
      useTTS('prepared flattened content that would otherwise be one chunk', { units })
    )

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(sequence).toContain('start'))

    // First synthesis is the tiny title unit, not the whole content.
    expect(vi.mocked(synthesizeSpeech).mock.calls[0][0]).toBe('Title unit')
    expect(result.current.totalChunks).toBe(3)
  })

  it('falls back to length-chunking when units is empty or omitted', async () => {
    vi.mocked(synthesizeSpeech).mockClear()

    const { result } = renderHook(() => useTTS('Just one sentence.', { units: [] }))

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(sequence).toContain('start'))

    expect(vi.mocked(synthesizeSpeech).mock.calls[0][0]).toBe('Just one sentence.')
  })
})

describe('useTTS playFromUnit', () => {
  const units = ['a'.repeat(10), 'b'.repeat(20), 'c'.repeat(30)]

  it('starts playback at the requested unit index', async () => {
    vi.mocked(synthesizeSpeech).mockClear()

    const { result } = renderHook(() => useTTS('irrelevant content', { units }))

    await act(async () => {
      await result.current.playFromUnit(2)
    })
    await waitFor(() => expect(sequence).toContain('start'))

    // The chunk list is initialised even though play() was never called, and the
    // first synthesis is the requested unit -- not unit 0.
    expect(vi.mocked(synthesizeSpeech).mock.calls[0][0]).toBe(units[2])
    expect(result.current.totalChunks).toBe(3)
    await waitFor(() => expect(result.current.currentChunkIndex).toBe(2))
  })

  it('seeds progress with the characters of the units it skipped', async () => {
    // One-shot rAF: run the progress loop exactly once, then stop rescheduling.
    let rafCalls = 0
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
      rafCalls += 1
      if (rafCalls === 1) cb(0)
      return 1
    })

    const onProgress = vi.fn()
    const { result } = renderHook(() => useTTS('irrelevant content', { units, onProgress }))

    await act(async () => {
      await result.current.playFromUnit(2)
    })
    await waitFor(() => expect(onProgress).toHaveBeenCalled())

    // Units 0+1 = 30 of 60 total chars already behind us, unit 2 just started.
    expect(onProgress).toHaveBeenCalledWith(50)
  })

  it('clamps an out-of-range unit index instead of throwing', async () => {
    vi.mocked(synthesizeSpeech).mockClear()

    const { result } = renderHook(() => useTTS('irrelevant content', { units }))

    await act(async () => {
      await result.current.playFromUnit(99)
    })
    await waitFor(() => expect(sequence).toContain('start'))
    expect(vi.mocked(synthesizeSpeech).mock.calls[0][0]).toBe(units[2])

    await act(async () => {
      result.current.stop()
      vi.mocked(synthesizeSpeech).mockClear()
      await result.current.playFromUnit(-5)
    })
    await waitFor(() => expect(sequence.filter((e) => e === 'start').length).toBe(2))
    expect(vi.mocked(synthesizeSpeech).mock.calls[0][0]).toBe(units[0])

    // Nothing to play at all: must resolve, not throw.
    const empty = renderHook(() => useTTS('', { units: [] }))
    await act(async () => {
      await expect(empty.result.current.playFromUnit(0)).resolves.toBeUndefined()
    })
  })

  it('clamps positive infinity to the last unit', async () => {
    vi.mocked(synthesizeSpeech).mockClear()

    const { result } = renderHook(() => useTTS('irrelevant content', { units }))

    await act(async () => {
      await result.current.playFromUnit(Number.POSITIVE_INFINITY)
    })
    await waitFor(() => expect(sequence).toContain('start'))

    // +Infinity reads as "past the end", so it clamps to the LAST unit.
    expect(vi.mocked(synthesizeSpeech).mock.calls[0][0]).toBe(units[2])
    await waitFor(() => expect(result.current.currentChunkIndex).toBe(2))
  })

  it('treats NaN as the first unit', async () => {
    vi.mocked(synthesizeSpeech).mockClear()

    const { result } = renderHook(() => useTTS('irrelevant content', { units }))

    await act(async () => {
      await result.current.playFromUnit(Number.NaN)
    })
    await waitFor(() => expect(sequence).toContain('start'))

    // NaN carries no position at all: fall back to unit 0.
    expect(vi.mocked(synthesizeSpeech).mock.calls[0][0]).toBe(units[0])
    await waitFor(() => expect(result.current.currentChunkIndex).toBe(0))
  })

  it('ignores a stale pause offset when jumping to a different unit', async () => {
    const { result } = renderHook(() => useTTS('irrelevant content', { units }))

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(sequence).toContain('start'))

    // Pause mid-chunk so pauseOffsetRef holds an offset into unit 0.
    contexts[0].currentTime = 0.5
    act(() => {
      result.current.pause()
    })

    await act(async () => {
      await result.current.playFromUnit(2)
    })
    await flushMicrotasks()
    await waitFor(() => expect(sequence.filter((e) => e === 'start').length).toBe(2))

    // The new unit starts from its beginning, not 0.5s into the old one.
    expect(startOffsets[startOffsets.length - 1]).toBe(0)
    await waitFor(() => expect(result.current.currentChunkIndex).toBe(2))
  })
})

describe('useTTS chunk-synthesis failure recovery', () => {
  // Regression test: a stalled/failed chunk (edge-tts stream stall surviving
  // tts-client's own retry) used to stop playback outright via onError,
  // stranding the reader until the user manually pressed Play again. It must
  // now skip the unreadable chunk and continue automatically.
  it('skips a single failed chunk and continues playing the next one, without erroring', async () => {
    const units = ['ok-1', 'fail-2', 'ok-3']
    vi.mocked(synthesizeSpeech).mockImplementation(async (text: string) => {
      if (text === 'fail-2') throw new Error('stalled')
      return new ArrayBuffer(8)
    })
    const onError = vi.fn()
    const onComplete = vi.fn()

    const { result } = renderHook(() => useTTS('irrelevant content', { units, onError, onComplete }))

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(sequence).toContain('start'))
    expect(result.current.currentChunkIndex).toBe(0)

    // Chunk 0 finishes: playChunk(1) fetches 'fail-2', fails, and — instead of
    // stopping — skips straight to chunk 2 without the user doing anything.
    await act(async () => {
      sources[0].onended?.()
      await Promise.resolve()
      await Promise.resolve()
      await Promise.resolve()
    })

    expect(onError).not.toHaveBeenCalled()
    await waitFor(() => expect(sequence.filter((e) => e === 'start').length).toBe(2))
    await waitFor(() => expect(result.current.currentChunkIndex).toBe(2))
    expect(result.current.isPlaying).toBe(true)

    // Chunk 2 finishes normally: playback completes as if nothing failed.
    await act(async () => {
      sources[1].onended?.()
      await Promise.resolve()
    })
    expect(onComplete).toHaveBeenCalledTimes(1)
    expect(result.current.isPlaying).toBe(false)
  })

  it('stops and reports onError once too many consecutive chunks fail in a row', async () => {
    const units = ['ok-1', 'fail-2', 'fail-3', 'fail-4', 'fail-5']
    vi.mocked(synthesizeSpeech).mockImplementation(async (text: string) => {
      if (text.startsWith('fail-')) throw new Error('stalled')
      return new ArrayBuffer(8)
    })
    const onError = vi.fn()

    const { result } = renderHook(() => useTTS('irrelevant content', { units, onError }))

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(sequence).toContain('start'))

    // Chunk 0 finishes; chunks 1-4 all fail. The first 3 failures skip
    // (consecutive count 1, 2, 3), the 4th exceeds the cap and stops instead
    // of silently skipping through every remaining chunk.
    await act(async () => {
      sources[0].onended?.()
      for (let i = 0; i < 6; i += 1) await Promise.resolve()
    })

    await waitFor(() => expect(onError).toHaveBeenCalledTimes(1))
    expect(result.current.isPlaying).toBe(false)
    // Never reached a chunk that could actually play after chunk 0.
    expect(sequence.filter((e) => e === 'start').length).toBe(1)
  })
})
