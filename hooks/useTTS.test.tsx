import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useTTS } from './useTTS'

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
  start = vi.fn(() => {
    sequence.push('start')
  })
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

  // Callback form, matching useTTS's usage.
  decodeAudioData(
    _buffer: ArrayBuffer,
    onSuccess: (b: AudioBuffer) => void,
    _onError?: (e: unknown) => void
  ) {
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
