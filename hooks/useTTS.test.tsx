import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useTTS } from './useTTS'
import { synthesizeSpeech } from '@/lib/tts/client'

// Mock the synthesis client so no real network / edge-tts is touched.
vi.mock('@/lib/tts/client', () => ({
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
// Separate ordering log for "who ran first" assertions. Kept out of `sequence`
// because that array's adjacency (resume immediately before start) is itself
// asserted by the play-from-here regression test.
let order: string[] = []
let contexts: FakeAudioContext[] = []
// `offset` argument of every source.start() call, in order.
let startOffsets: number[] = []
// Every FakeBufferSource created, in order, so tests can fire its `onended`
// to simulate a chunk finishing playback.
let sources: FakeBufferSource[] = []
// Every MediaStreamAudioDestinationNode handed out by the fake context.
let streamDestinations: FakeStreamDestination[] = []
// Flips off to model a browser without createMediaStreamDestination.
let supportsStreamDestination = true
// Stubs for HTMLMediaElement.play/pause — jsdom leaves both unimplemented and
// play() throws, so the hook's calls are stubbed to stay observable.
let audioPlay: ReturnType<typeof vi.fn>
let audioPause: ReturnType<typeof vi.fn>
let originalPlay: HTMLMediaElement['play']
let originalPause: HTMLMediaElement['pause']

class FakeStreamDestination {
  stream: { id: string }
  connect = vi.fn()
  disconnect = vi.fn()

  constructor() {
    this.stream = { id: `stream-${streamDestinations.length}` }
    streamDestinations.push(this)
  }
}

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
    order.push('source-start')
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
    // Assigned per instance (not on the prototype) so a test can model a
    // browser lacking the API by clearing the flag.
    if (supportsStreamDestination) {
      ;(this as any).createMediaStreamDestination = () =>
        new FakeStreamDestination() as unknown as MediaStreamAudioDestinationNode
    }
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

// The hook detects Apple/WebKit browsers via navigator.vendor and deliberately
// keeps them off the media-element path (see isWebKitBrowser in useTTS.ts).
// jsdom reports the APPLE vendor by default, so every test that exercises the
// streaming path has to declare a non-WebKit browser explicitly.
const WEBKIT_VENDOR = 'Apple Computer, Inc.'
const NON_WEBKIT_VENDOR = 'Google Inc.'
const setNavigatorVendor = (vendor: string) => {
  Object.defineProperty(window.navigator, 'vendor', { value: vendor, configurable: true })
}

beforeEach(() => {
  sequence = []
  order = []
  contexts = []
  startOffsets = []
  sources = []
  streamDestinations = []
  supportsStreamDestination = true
  setNavigatorVendor(NON_WEBKIT_VENDOR)
  document.querySelectorAll('audio').forEach((el) => el.remove())
  originalPlay = HTMLMediaElement.prototype.play
  originalPause = HTMLMediaElement.prototype.pause
  audioPlay = vi.fn(() => {
    order.push('element-play')
    return Promise.resolve()
  })
  audioPause = vi.fn()
  HTMLMediaElement.prototype.play = audioPlay as unknown as HTMLMediaElement['play']
  HTMLMediaElement.prototype.pause = audioPause as unknown as HTMLMediaElement['pause']
  vi.stubGlobal('AudioContext', FakeAudioContext as unknown as typeof AudioContext)
  vi.stubGlobal('webkitAudioContext', FakeAudioContext as unknown as typeof AudioContext)
  // Keep the rAF progress loop from actually running in jsdom.
  vi.stubGlobal('requestAnimationFrame', () => 1)
  vi.stubGlobal('cancelAnimationFrame', () => {})
})

afterEach(() => {
  HTMLMediaElement.prototype.play = originalPlay
  HTMLMediaElement.prototype.pause = originalPause
  // Own property only; deleting restores jsdom's prototype getter.
  delete (window.navigator as unknown as Record<string, unknown>).vendor
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

describe('useTTS media-element playback routing', () => {
  // Mobile browsers exempt a backgrounded page from tab freezing and
  // timer/network throttling on the basis of MEDIA ELEMENT playback, not on a
  // running AudioContext. Playback is therefore routed
  // source -> MediaStreamAudioDestinationNode -> <audio srcObject> so the
  // synthesis socket and chunk-advance chain survive a screen-off phone.
  beforeEach(() => {
    vi.mocked(synthesizeSpeech).mockImplementation(async () => new ArrayBuffer(8))
  })

  const playOnce = async (content = 'Hello world.', options?: Parameters<typeof useTTS>[1]) => {
    const rendered = renderHook(() => useTTS(content, options))
    await act(async () => {
      await rendered.result.current.play()
    })
    await waitFor(() => expect(sequence).toContain('start'))
    return rendered
  }

  it('connects playback to the stream destination when the API is available', async () => {
    await playOnce()

    expect(streamDestinations).toHaveLength(1)
    expect(sources[0].connect).toHaveBeenCalledWith(streamDestinations[0])
  })

  it('does not also connect to audioContext.destination when streaming', async () => {
    await playOnce()

    expect(sources[0].connect).toHaveBeenCalledTimes(1)
    expect(sources[0].connect).not.toHaveBeenCalledWith(contexts[0].destination)
  })

  it('falls back to audioContext.destination when createMediaStreamDestination is missing', async () => {
    supportsStreamDestination = false

    await playOnce()

    expect(streamDestinations).toHaveLength(0)
    expect(sources[0].connect).toHaveBeenCalledWith(contexts[0].destination)
    // No element is needed for audio to reach the output on this path.
    expect(document.querySelector('audio')).toBeNull()
  })

  it('assigns the destination stream to the audio element', async () => {
    await playOnce()

    const element = document.querySelector('audio') as HTMLAudioElement & {
      srcObject: unknown
      playsInline: boolean
    }
    expect(element).toBeTruthy()
    expect(element.srcObject).toBe(streamDestinations[0].stream)
    expect(element.playsInline).toBe(true)
    expect(element.controls).toBe(false)
    expect(element.preload).toBe('none')
  })

  it('plays the audio element when playback starts', async () => {
    await playOnce()

    expect(audioPlay).toHaveBeenCalled()
  })

  it('pauses the audio element on pause and stop', async () => {
    const { result } = await playOnce()

    act(() => {
      result.current.pause()
    })
    expect(audioPause).toHaveBeenCalled()

    audioPause.mockClear()
    act(() => {
      result.current.stop()
    })
    expect(audioPause).toHaveBeenCalled()
  })

  it('plays the audio element again on resume', async () => {
    const { result } = await playOnce()

    act(() => {
      result.current.pause()
    })
    audioPlay.mockClear()

    await act(async () => {
      await result.current.resume()
    })
    await flushMicrotasks()

    await waitFor(() => expect(audioPlay).toHaveBeenCalled())
  })

  it('tears the audio element down on unmount', async () => {
    const { unmount } = await playOnce()

    const element = document.querySelector('audio') as HTMLAudioElement & { srcObject: unknown }
    expect(element).toBeTruthy()
    audioPause.mockClear()

    unmount()

    expect(audioPause).toHaveBeenCalled()
    expect(element.srcObject).toBeNull()
    expect(element.isConnected).toBe(false)
    expect(document.querySelector('audio')).toBeNull()
  })

  it('still chains to the next chunk on ended while streaming', async () => {
    const units = ['unit one', 'unit two']
    const { result } = await playOnce('irrelevant content', { units })

    await act(async () => {
      sources[0].onended?.()
      await Promise.resolve()
      await Promise.resolve()
    })

    await waitFor(() => expect(sequence.filter((e) => e === 'start').length).toBe(2))
    expect(sources[1].connect).toHaveBeenCalledWith(streamDestinations[0])
    await waitFor(() => expect(result.current.currentChunkIndex).toBe(1))
  })

  it('starts the element before starting the source, so no head of the live stream is clipped', async () => {
    await playOnce()

    // A MediaStreamAudioDestinationNode is a LIVE stream: the element plays
    // from "now", so it must be running before the source produces samples.
    expect(order.indexOf('element-play')).toBeGreaterThanOrEqual(0)
    expect(order.indexOf('element-play')).toBeLessThan(order.indexOf('source-start'))
  })
})

describe('useTTS WebKit carve-out', () => {
  // createMediaStreamDestination EXISTS in Safari, so feature detection alone
  // would route iOS into <audio srcObject=MediaStream> — a path that has a long
  // history of producing no sound for Web-Audio-originated MediaStreams on iOS.
  // Since the routing is exclusive, that would be silence where direct output
  // works today. WebKit therefore deliberately keeps audioContext.destination.
  beforeEach(() => {
    vi.mocked(synthesizeSpeech).mockImplementation(async () => new ArrayBuffer(8))
  })

  const playOnce = async () => {
    const rendered = renderHook(() => useTTS('Hello world.'))
    await act(async () => {
      await rendered.result.current.play()
    })
    await waitFor(() => expect(sequence).toContain('start'))
    return rendered
  }

  it('keeps an Apple/WebKit browser on audioContext.destination and creates no element', async () => {
    setNavigatorVendor(WEBKIT_VENDOR)

    await playOnce()

    // The API is available on this fake context, so only the vendor check can
    // have kept us off the streaming path.
    expect(supportsStreamDestination).toBe(true)
    expect(streamDestinations).toHaveLength(0)
    expect(document.querySelector('audio')).toBeNull()
    expect(audioPlay).not.toHaveBeenCalled()
    expect(sources[0].connect).toHaveBeenCalledTimes(1)
    expect(sources[0].connect).toHaveBeenCalledWith(contexts[0].destination)
  })

  it('catches Chrome/Firefox on iOS, which report the Apple vendor too', async () => {
    setNavigatorVendor(WEBKIT_VENDOR)
    Object.defineProperty(window.navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 CriOS/120.0',
      configurable: true,
    })

    await playOnce()

    expect(streamDestinations).toHaveLength(0)
    expect(sources[0].connect).toHaveBeenCalledWith(contexts[0].destination)

    delete (window.navigator as unknown as Record<string, unknown>).userAgent
  })

  it('keeps the streaming behaviour on a non-WebKit browser', async () => {
    setNavigatorVendor(NON_WEBKIT_VENDOR)

    await playOnce()

    expect(streamDestinations).toHaveLength(1)
    expect(document.querySelector('audio')).toBeTruthy()
    expect(sources[0].connect).toHaveBeenCalledWith(streamDestinations[0])
    expect(sources[0].connect).not.toHaveBeenCalledWith(contexts[0].destination)
  })
})

describe('useTTS media element that refuses to play', () => {
  // Routing is EXCLUSIVE: the source is connected to the stream destination
  // INSTEAD of audioContext.destination. So a rejected element play() (autoplay
  // policy, no gesture, a stream the platform will not render) would otherwise
  // mean the graph renders into a MediaStream nobody consumes — total silence
  // while isPlaying stays true, progress advances and chunks keep chaining, with
  // nothing surfaced to the UI. Recovery must make the audio audible again.
  beforeEach(() => {
    vi.mocked(synthesizeSpeech).mockImplementation(async () => new ArrayBuffer(8))
    audioPlay = vi.fn(() => {
      order.push('element-play')
      return Promise.reject(new DOMException('play() blocked', 'NotAllowedError'))
    })
    HTMLMediaElement.prototype.play = audioPlay as unknown as HTMLMediaElement['play']
  })

  it('re-routes the playing source to audioContext.destination so audio still reaches the output', async () => {
    const { result } = renderHook(() => useTTS('Hello world.'))

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(sequence).toContain('start'))
    // Let the rejected play() promise settle.
    await flushMicrotasks()

    expect(audioPlay).toHaveBeenCalled()
    // The element was tried first (streaming path), then abandoned.
    expect(sources[0].connect).toHaveBeenCalledWith(streamDestinations[0])
    await waitFor(() =>
      expect(sources[0].connect).toHaveBeenCalledWith(contexts[0].destination)
    )
    expect(sources[0].disconnect).toHaveBeenCalledWith(streamDestinations[0])
    expect(result.current.isPlaying).toBe(true)
  })

  it('does not strand the rest of the article: later chunks go straight to the context destination', async () => {
    const units = ['unit one', 'unit two']
    const onComplete = vi.fn()
    const onError = vi.fn()

    const { result } = renderHook(() =>
      useTTS('irrelevant content', { units, onComplete, onError })
    )

    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(sequence).toContain('start'))
    await flushMicrotasks()

    await act(async () => {
      sources[0].onended?.()
      await Promise.resolve()
      await Promise.resolve()
    })

    await waitFor(() => expect(sequence.filter((e) => e === 'start').length).toBe(2))
    // Chunk 2 is wired for audibility from the start — never to the dead stream.
    expect(sources[1].connect).toHaveBeenCalledWith(contexts[0].destination)
    expect(sources[1].connect).not.toHaveBeenCalledWith(streamDestinations[0])
    // The element is not driven again once it has refused.
    expect(audioPlay).toHaveBeenCalledTimes(1)

    await act(async () => {
      sources[1].onended?.()
      await Promise.resolve()
    })
    expect(onError).not.toHaveBeenCalled()
    expect(onComplete).toHaveBeenCalledTimes(1)
    expect(result.current.isPlaying).toBe(false)
  })
})
