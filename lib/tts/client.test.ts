import { beforeEach, describe, expect, it, vi } from 'vitest'
import { TtsError } from 'anytts'
import { DEFAULT_TTS_VOICE } from '@/lib/tts/voices'

// The client is a thin seam over one anytts instance: queueing, caching,
// deadlines and retries all live in anytts and are tested there. These tests
// pin only what the seam owns — how it configures the instance and how it maps
// motyl's options onto anytts requests.
const anyttsMock = vi.hoisted(() => {
  const tts = {
    synthesize: vi.fn(),
    prefetch: vi.fn(),
    restartStalled: vi.fn(() => false),
  }
  return { tts, createTts: vi.fn(() => tts) }
})

vi.mock('anytts', async (importOriginal) => ({
  ...(await importOriginal<typeof import('anytts')>()),
  createTts: anyttsMock.createTts,
}))

let synthesizeSpeech: typeof import('@/lib/tts/client').synthesizeSpeech
let prefetchSpeech: typeof import('@/lib/tts/client').prefetchSpeech

beforeEach(async () => {
  // A fresh module per test, so the lazily created instance starts unset.
  vi.resetModules()
  anyttsMock.createTts.mockClear()
  anyttsMock.tts.synthesize.mockReset()
  anyttsMock.tts.synthesize.mockImplementation(async () => ({
    bytes: new Uint8Array([1, 2, 3]).buffer,
    mime: 'audio/mpeg',
    engine: 'edge',
    voice: DEFAULT_TTS_VOICE,
  }))
  anyttsMock.tts.prefetch.mockReset()
  const mod = await import('@/lib/tts/client')
  synthesizeSpeech = mod.synthesizeSpeech
  prefetchSpeech = mod.prefetchSpeech
})

describe('anytts instance', () => {
  it('importing the client creates no instance', () => {
    expect(anyttsMock.createTts).not.toHaveBeenCalled()
  })

  it("the instance is configured direct-only with the reader's deadlines", async () => {
    await synthesizeSpeech('Hello', { voice: 'pl-PL-MarekNeural' })
    await synthesizeSpeech('Again', { voice: 'pl-PL-MarekNeural' })

    // One instance per page, created on first use.
    expect(anyttsMock.createTts).toHaveBeenCalledTimes(1)
    const [config] = anyttsMock.createTts.mock.calls[0] as unknown as [
      import('anytts').TtsConfig,
    ]
    expect(config).toEqual({
      engines: {
        edge: {
          voices: { default: DEFAULT_TTS_VOICE },
          firstByteMs: 8000,
          stallMs: 15000,
          retries: 1,
        },
      },
      defaultEngine: 'edge',
      scheduler: { concurrency: 1, tiers: [{ name: 'play' }, { name: 'warm' }] },
      cache: { max: 200 },
    })
    // No relay: anytts picks direct mode when relayUrl is absent.
    expect(config.engines.edge).not.toHaveProperty('relayUrl')
    expect(config.engines.edge).not.toHaveProperty('mode')
  })
})

describe('synthesizeSpeech', () => {
  it('synthesizeSpeech returns a copy of the cached bytes', async () => {
    const bytes = new Uint8Array([7, 8, 9]).buffer
    anyttsMock.tts.synthesize.mockResolvedValue({
      bytes,
      mime: 'audio/mpeg',
      engine: 'edge',
      voice: DEFAULT_TTS_VOICE,
    })

    const result = await synthesizeSpeech('Hello')

    expect(result).not.toBe(bytes)
    expect(Array.from(new Uint8Array(result))).toEqual([7, 8, 9])
  })

  it('a TtsError passes through unchanged', async () => {
    const error = new TtsError('rejected', 'handshake refused', { status: 403 })
    anyttsMock.tts.synthesize.mockRejectedValue(error)

    await expect(synthesizeSpeech('Hello')).rejects.toBe(error)
  })

  it('rejects empty or whitespace text without asking anytts', async () => {
    await expect(synthesizeSpeech('   ')).rejects.toThrow(/empty text/)
    expect(anyttsMock.tts.synthesize).not.toHaveBeenCalled()
  })
})

describe('prefetchSpeech', () => {
  it('prefetchSpeech with empty/whitespace text does nothing', () => {
    prefetchSpeech('')
    prefetchSpeech('  \n ')
    expect(anyttsMock.tts.prefetch).not.toHaveBeenCalled()
    expect(anyttsMock.createTts).not.toHaveBeenCalled()
  })
})
