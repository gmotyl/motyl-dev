import { act, cleanup, renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { TtsError } from 'anytts'

import { useTTS } from './useTTS'
import { useContinuousReader } from './use-continuous-reader'
import { configureOmniVoice, synthesizeSpeech } from '@/lib/tts/client'
import {
  OMNIVOICE_PROBE_MS,
  fetchRelayVoices,
  probeRelay,
  writeOmniVoiceSettings,
} from '@/lib/tts/omnivoice'
import { sectionKey, splitIntoSpeechUnits, type SpeechSection } from '@/lib/tts/speech'
import { DEFAULT_TTS_VOICE } from '@/lib/tts/voices'
import { READER_LOG_FLAG, clearReaderLog, readReaderLog } from '@/lib/reader/diagnostic-log'
import type { SeamReport } from '@/lib/reader/seam-report'

/**
 * The session engine inside the reader: chosen at Play by probing the
 * OmniVoice relay, and moved OmniVoice -> Edge for the rest of the session when
 * a unit fails. Synthesis and the relay calls are mocked; the settings are the
 * real localStorage-backed ones. The carrier is the mocked-`MediaSource` one
 * from `useTTS.mse.test.tsx`, whose append order is the play order.
 */

vi.mock('@/lib/tts/client', () => ({
  synthesizeSpeech: vi.fn(async () => new ArrayBuffer(8)),
  prefetchSpeech: vi.fn(),
  restartStalledSynthesis: vi.fn(() => false),
  configureOmniVoice: vi.fn(),
}))

const relay = vi.hoisted(() => ({
  url: 'https://spock.example.ts.net',
  catalog: [
    { id: 'krystyna1', label: 'Krystyna', locale: 'pl-PL', gender: 'female' as const, multilingual: false },
    { id: 'marek2', label: 'Marek', locale: 'pl-PL', gender: 'male' as const, multilingual: false },
  ],
}))

// Only the network calls are faked; settings and `isOmniVoiceConfigured` are real.
vi.mock('@/lib/tts/omnivoice', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/tts/omnivoice')>()
  return {
    ...actual,
    probeRelay: vi.fn(async () => true),
    fetchRelayVoices: vi.fn(async () => relay.catalog),
  }
})

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

const emitTimeUpdate = async (currentTime: number) => {
  mediaCurrentTime = currentTime
  await act(async () => {
    currentAudio().dispatchEvent(new Event('timeupdate'))
    for (let i = 0; i < 6; i += 1) await Promise.resolve()
  })
}

const EDGE_VOICE = 'pl-PL-MarekNeural'
const UNITS = ['unit zero', 'unit one', 'unit two', 'unit three']

const configureRelay = () =>
  writeOmniVoiceSettings({ enabled: true, relayUrl: relay.url, voice: 'krystyna1' })

/** Every synthesis request so far as `[text, engine, voice, priority]`. */
const requests = () =>
  vi
    .mocked(synthesizeSpeech)
    .mock.calls.map(([text, options]) => [
      text,
      options?.engine ?? 'edge',
      options?.voice,
      options?.priority ?? 'play',
    ])

/** OmniVoice synthesizes only `texts`; every other OmniVoice request fails. */
const omniVoiceServes = (texts: readonly string[]) => {
  vi.mocked(synthesizeSpeech).mockImplementation(async (text, options) => {
    if (options?.engine === 'openai' && !texts.includes(text)) {
      throw new TtsError('network', 'relay connection lost')
    }
    return new ArrayBuffer(8)
  })
}

beforeEach(() => {
  mediaCurrentTime = 0
  mediaPaused = true
  mse.available = true
  mse.created = 0
  mse.appended = []
  mse.start = 0
  mse.end = 0
  document.querySelectorAll('audio').forEach((el) => el.remove())
  window.localStorage.clear()
  window.localStorage.setItem(READER_LOG_FLAG, '1')
  clearReaderLog()

  vi.mocked(synthesizeSpeech).mockReset()
  vi.mocked(synthesizeSpeech).mockImplementation(async () => new ArrayBuffer(8))
  vi.mocked(probeRelay).mockReset()
  vi.mocked(probeRelay).mockImplementation(async () => true)
  vi.mocked(fetchRelayVoices).mockReset()
  vi.mocked(fetchRelayVoices).mockImplementation(async () => relay.catalog)

  patchProto('play', {
    value: vi.fn(() => {
      mediaPaused = false
      return Promise.resolve()
    }),
    writable: true,
  })
  patchProto('pause', {
    value: vi.fn(() => {
      mediaPaused = true
    }),
    writable: true,
  })
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
      mediaCurrentTime = 0
      this.setAttribute('src', value)
    },
  })

  let nextUrl = 0
  URL.createObjectURL = vi.fn(() => `blob:mock/${(nextUrl += 1)}`) as unknown as typeof URL.createObjectURL
  URL.revokeObjectURL = vi.fn() as unknown as typeof URL.revokeObjectURL

  vi.stubGlobal('requestAnimationFrame', () => 1)
  vi.stubGlobal('cancelAnimationFrame', vi.fn())
})

afterEach(() => {
  cleanup()
  restoreProto()
  URL.createObjectURL = originalCreateObjectURL
  URL.revokeObjectURL = originalRevokeObjectURL
  vi.unstubAllGlobals()
  vi.clearAllMocks()
  window.localStorage.clear()
  clearReaderLog()
  document.querySelectorAll('audio').forEach((el) => el.remove())
})

describe('session engine in useTTS', () => {
  it('a failed OmniVoice unit is replayed on edge without counting a failure', async () => {
    configureRelay()
    omniVoiceServes([UNITS[0]])
    const onError = vi.fn()

    const { result } = renderHook(() =>
      useTTS(UNITS.join(' '), { voice: EDGE_VOICE, units: UNITS, onError })
    )
    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(mse.appended).toEqual([0, 1, 2, 3]))
    await settle()

    // The session started on OmniVoice with its stored voice, and the relay
    // client was configured with the catalog the relay served at Play.
    expect(configureOmniVoice).toHaveBeenCalledWith({ relayUrl: relay.url, catalog: relay.catalog })
    expect(requests()[0]).toEqual([UNITS[0], 'openai', 'krystyna1', 'play'])

    // Unit 1 failed on OmniVoice and was asked of Edge at once, with the Edge voice.
    const unitOne = requests().filter(([text]) => text === UNITS[1])
    expect(unitOne[0]).toEqual([UNITS[1], 'openai', 'krystyna1', 'play'])
    expect(unitOne[unitOne.length - 1]).toEqual([UNITS[1], 'edge', EDGE_VOICE, 'play'])
    // Everything that settled after the switch is Edge.
    const lastOpenAi = requests().map(([, engine]) => engine).lastIndexOf('openai')
    expect(requests().slice(lastOpenAi + 1).every(([, engine]) => engine === 'edge')).toBe(true)

    // The switch is logged, and no unit counted as failed: nothing was
    // skipped, nothing was given up on, and playback runs on in order.
    const log = readReaderLog()
    expect(log.filter((entry) => entry.type === 'engine-fallback').map((entry) => entry.detail))
      .toEqual(['1: network'])
    expect(log.some((entry) => entry.type === 'synthesis-failed')).toBe(false)
    expect(onError).not.toHaveBeenCalled()
    expect(result.current.isPlaying).toBe(true)
    expect(result.current.engine).toBe('edge')
    expect(result.current.engineFallback).toBe(true)
  })

  it('the next Play probes again and clears the fallback', async () => {
    const { result } = renderHook(() =>
      useTTS(UNITS.join(' '), { voice: EDGE_VOICE, units: UNITS })
    )

    // Session 1, OmniVoice not configured: no probe, plain Edge, no marker.
    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(mse.appended.length).toBeGreaterThan(0))
    expect(probeRelay).not.toHaveBeenCalled()
    expect(requests()[0]).toEqual([UNITS[0], 'edge', EDGE_VOICE, 'play'])
    expect(result.current.engineFallback).toBe(false)
    act(() => result.current.stop())

    // Session 2, configured but the relay does not answer: Edge, marked.
    configureRelay()
    vi.mocked(probeRelay).mockImplementation(async () => false)
    vi.mocked(synthesizeSpeech).mockClear()
    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(result.current.engineFallback).toBe(true))
    expect(probeRelay).toHaveBeenCalledTimes(1)
    expect(configureOmniVoice).not.toHaveBeenCalled()
    expect(requests()[0]).toEqual([UNITS[0], 'edge', EDGE_VOICE, 'play'])
    expect(result.current.engine).toBe('edge')
    act(() => result.current.stop())

    // Session 3, the relay is back: a new probe, OmniVoice, marker gone.
    vi.mocked(probeRelay).mockImplementation(async () => true)
    vi.mocked(synthesizeSpeech).mockClear()
    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(result.current.engine).toBe('openai'))
    expect(probeRelay).toHaveBeenCalledTimes(2)
    expect(result.current.engineFallback).toBe(false)
    expect(requests()[0]).toEqual([UNITS[0], 'openai', 'krystyna1', 'play'])
    expect(requests().every(([, engine]) => engine === 'openai')).toBe(true)
  })
})

/** A promise settled from the test, to hold a relay call or a synthesis open. */
const deferred = <T,>() => {
  let resolve!: (value: T) => void
  let reject!: (error: unknown) => void
  const promise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  })
  return { promise, resolve, reject }
}

const fallbackLog = () => readReaderLog().filter((entry) => entry.type === 'engine-fallback')
const sessionEngineLog = () =>
  readReaderLog()
    .filter((entry) => entry.type === 'session-engine')
    .map((entry) => entry.detail)

describe('session engine edges in useTTS', () => {
  it('a pause during an OmniVoice synthesis that then aborts keeps the engine', async () => {
    configureRelay()
    const held = deferred<ArrayBuffer>()
    vi.mocked(synthesizeSpeech).mockImplementation(async (text, options) => {
      if (options?.engine === 'openai' && text === UNITS[0] && held) {
        return held.promise
      }
      return new ArrayBuffer(8)
    })

    const { result } = renderHook(() =>
      useTTS(UNITS.join(' '), { voice: EDGE_VOICE, units: UNITS })
    )
    act(() => {
      void result.current.play()
    })
    await waitFor(() => expect(requests()[0]).toEqual([UNITS[0], 'openai', 'krystyna1', 'play']))

    // Paused while unit 0 is on the relay; the synthesis then rejects with the abort.
    act(() => result.current.pause())
    await act(async () => {
      held.reject(new DOMException('Aborted', 'AbortError'))
      for (let i = 0; i < 10; i += 1) await Promise.resolve()
    })

    // The abort said nothing about the relay: no switch, nothing logged.
    expect(result.current.engine).toBe('openai')
    expect(result.current.engineVoice).toBe('krystyna1')
    expect(result.current.engineFallback).toBe(false)
    expect(fallbackLog()).toEqual([])
    expect(requests().some(([, engine]) => engine === 'edge')).toBe(false)

    // Resumed, the units are still asked of OmniVoice with its voice.
    vi.mocked(synthesizeSpeech).mockClear()
    vi.mocked(synthesizeSpeech).mockImplementation(async () => new ArrayBuffer(8))
    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(mse.appended.length).toBeGreaterThan(0))
    await settle()
    expect(requests().length).toBeGreaterThan(0)
    expect(requests().every(([, engine, voice]) => engine === 'openai' && voice === 'krystyna1'))
      .toBe(true)
    expect(fallbackLog()).toEqual([])
  })

  it('OmniVoice disabled after an openai or fallback session: plain edge, no probe', async () => {
    configureRelay()
    const { result } = renderHook(() =>
      useTTS(UNITS.join(' '), { voice: EDGE_VOICE, units: UNITS })
    )

    // Session 1 on OmniVoice.
    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(result.current.engine).toBe('openai'))
    act(() => result.current.stop())

    // Session 2 falls back: the relay does not answer.
    vi.mocked(probeRelay).mockImplementation(async () => false)
    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(result.current.engineFallback).toBe(true))
    act(() => result.current.stop())
    expect(probeRelay).toHaveBeenCalledTimes(2)

    // OmniVoice switched off in the settings: Play is plain Edge, unmarked, unprobed.
    writeOmniVoiceSettings({ enabled: false })
    vi.mocked(synthesizeSpeech).mockClear()
    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(requests().length).toBeGreaterThan(0))
    expect(probeRelay).toHaveBeenCalledTimes(2)
    expect(fetchRelayVoices).toHaveBeenCalledTimes(2)
    expect(result.current.engine).toBe('edge')
    expect(result.current.engineVoice).toBeNull()
    expect(result.current.engineFallback).toBe(false)
    expect(requests().every(([, engine, voice]) => engine === 'edge' && voice === EDGE_VOICE))
      .toBe(true)
  })

  it('a probe that answers after Pause configures and plays nothing', async () => {
    configureRelay()
    const health = deferred<boolean>()
    vi.mocked(probeRelay).mockImplementation(() => health.promise)

    const { result } = renderHook(() =>
      useTTS(UNITS.join(' '), { voice: EDGE_VOICE, units: UNITS })
    )
    act(() => {
      void result.current.play()
    })
    await waitFor(() => expect(probeRelay).toHaveBeenCalledTimes(1))
    expect(result.current.isBuffering).toBe(true)

    act(() => result.current.pause())
    await act(async () => {
      health.resolve(true)
      for (let i = 0; i < 10; i += 1) await Promise.resolve()
    })
    await settle()

    expect(configureOmniVoice).not.toHaveBeenCalled()
    expect(synthesizeSpeech).not.toHaveBeenCalled()
    expect(sessionEngineLog()).toEqual([])
    expect(result.current.engine).toBe('edge')
    expect(result.current.isPlaying).toBe(false)
    expect(result.current.isBuffering).toBe(false)
  })

  it('a stale probe that answers after a new Play leaves the new session alone', async () => {
    configureRelay()
    const stale = deferred<boolean>()
    vi.mocked(probeRelay).mockImplementationOnce(() => stale.promise)

    const { result } = renderHook(() =>
      useTTS(UNITS.join(' '), { voice: EDGE_VOICE, units: UNITS })
    )
    act(() => {
      void result.current.play()
    })
    await waitFor(() => expect(probeRelay).toHaveBeenCalledTimes(1))
    act(() => result.current.pause())

    // A new Play probes afresh and gets OmniVoice.
    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(result.current.engine).toBe('openai'))
    expect(configureOmniVoice).toHaveBeenCalledTimes(1)

    // The first probe now answers "unhealthy": it belongs to a session that is over.
    await act(async () => {
      stale.resolve(false)
      for (let i = 0; i < 10; i += 1) await Promise.resolve()
    })
    await settle()

    expect(sessionEngineLog()).toEqual(['openai krystyna1'])
    expect(configureOmniVoice).toHaveBeenCalledTimes(1)
    expect(result.current.engine).toBe('openai')
    expect(result.current.engineFallback).toBe(false)
    expect(result.current.isPlaying).toBe(true)
    expect(requests().every(([, engine]) => engine === 'openai')).toBe(true)
  })

  it('an empty relay catalog falls back to edge', async () => {
    configureRelay()
    vi.mocked(fetchRelayVoices).mockImplementation(async () => [])

    const { result } = renderHook(() =>
      useTTS(UNITS.join(' '), { voice: EDGE_VOICE, units: UNITS })
    )
    await act(async () => {
      await result.current.play()
    })
    await waitFor(() => expect(requests().length).toBeGreaterThan(0))

    expect(configureOmniVoice).not.toHaveBeenCalled()
    expect(sessionEngineLog()).toEqual(['edge (fallback)'])
    expect(result.current.engine).toBe('edge')
    expect(result.current.engineFallback).toBe(true)
    expect(requests().every(([, engine, voice]) => engine === 'edge' && voice === EDGE_VOICE))
      .toBe(true)
  })

  it('the /voices fetch is aborted at the probe budget', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
    try {
      configureRelay()
      let voicesSignal: AbortSignal | undefined
      vi.mocked(fetchRelayVoices).mockImplementation((_url, signal) => {
        voicesSignal = signal
        return new Promise((_resolve, reject) => {
          signal?.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')))
        })
      })

      const { result } = renderHook(() =>
        useTTS(UNITS.join(' '), { voice: EDGE_VOICE, units: UNITS })
      )
      act(() => {
        void result.current.play()
      })
      await act(async () => {
        await vi.advanceTimersByTimeAsync(0)
      })
      expect(fetchRelayVoices).toHaveBeenCalledWith(relay.url, expect.any(AbortSignal))
      expect(voicesSignal?.aborted).toBe(false)

      await act(async () => {
        await vi.advanceTimersByTimeAsync(OMNIVOICE_PROBE_MS - 1)
      })
      expect(voicesSignal?.aborted).toBe(false)
      await act(async () => {
        await vi.advanceTimersByTimeAsync(1)
      })
      expect(voicesSignal?.aborted).toBe(true)

      await act(async () => {
        await vi.advanceTimersByTimeAsync(0)
      })
      expect(result.current.engine).toBe('edge')
      expect(result.current.engineFallback).toBe(true)
      expect(sessionEngineLog()).toEqual(['edge (fallback)'])
    } finally {
      vi.useRealTimers()
    }
  })
})

/** Two speech units per section (title, one punctuation-free paragraph). */
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

const unitTexts = (item: SpeechSection) => splitIntoSpeechUnits(item).map((unit) => unit.text)

describe('session engine in the continuous reader', () => {
  it('warm-ahead of an openai session speaks with the OmniVoice voice', async () => {
    configureRelay()
    const items = [makeItem(0), makeItem(1)]
    const section1 = unitTexts(items[1])

    const { result } = renderHook(() => useContinuousReader(items))
    act(() => result.current.play())
    await waitFor(() => expect(mse.appended).toEqual([0, 1]))
    await settle()
    expect(result.current.engineFallback).toBe(false)

    const warms = () => requests().filter(([, , , priority]) => priority === 'warm')
    await waitFor(() => expect(warms().map(([text]) => text)).toEqual(section1))
    expect(warms().every(([, engine, voice]) => engine === 'openai' && voice === 'krystyna1'))
      .toBe(true)
    expect(warms().some(([, , voice]) => voice === DEFAULT_TTS_VOICE)).toBe(false)
  })

  it('warm-ahead follows the session engine after a switch', async () => {
    configureRelay()
    const items = [makeItem(0), makeItem(1)]
    const [title0, body0] = unitTexts(items[0])
    const section1 = unitTexts(items[1])
    // OmniVoice reads the first title and then dies.
    omniVoiceServes([title0])

    const { result } = renderHook(() => useContinuousReader(items))
    act(() => result.current.play())
    await waitFor(() => expect(mse.appended).toEqual([0, 1]))
    await settle()

    expect(requests()[0]).toEqual([title0, 'openai', 'krystyna1', 'play'])
    expect(requests().filter(([text]) => text === body0).at(-1)).toEqual([
      body0,
      'edge',
      DEFAULT_TTS_VOICE,
      'play',
    ])
    expect(result.current.engineFallback).toBe(true)

    // Section 0 is fully buffered, so warm-ahead warms section 1 — on Edge.
    const warms = () => requests().filter(([, , , priority]) => priority === 'warm')
    await waitFor(() => expect(warms().map(([text]) => text)).toEqual(section1))
    expect(warms().every(([, engine, voice]) => engine === 'edge' && voice === DEFAULT_TTS_VOICE))
      .toBe(true)

    // The handoff keeps the session's engine: section 1 is read on Edge, with
    // no new probe and the marker still up.
    await emitTimeUpdate(12)
    await emitTimeUpdate(2 * mse.spanSeconds - 0.05)
    await waitFor(() => expect(result.current.currentIndex).toBe(1))
    await waitFor(() => expect(mse.appended).toEqual([0, 1, 2, 3]))
    expect(probeRelay).toHaveBeenCalledTimes(1)
    expect(result.current.engineFallback).toBe(true)
    expect(
      requests()
        .filter(([text, , , priority]) => section1.includes(text as string) && priority === 'play')
        .every(([, engine]) => engine === 'edge')
    ).toBe(true)
  })
})
