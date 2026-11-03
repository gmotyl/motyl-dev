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
let configureOmniVoice: typeof import('@/lib/tts/client').configureOmniVoice

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
  configureOmniVoice = mod.configureOmniVoice
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

describe('engine per call', () => {
  const RELAY = 'https://spock.tailnet.example:8891/tts'
  const catalog: import('anytts').VoiceInfo[] = [
    { id: 'krystyna', label: 'Krystyna', locale: 'pl-PL', gender: 'female', multilingual: false },
    { id: 'gomes', label: 'Gomes', locale: 'en-US', gender: 'male', multilingual: false },
  ]
  const edgeConfig = {
    voices: { default: DEFAULT_TTS_VOICE },
    firstByteMs: 8000,
    stallMs: 15000,
    retries: 1,
  }
  // One long try: the relay waits 60 s on OmniVoice, so 65 s lets its own error
  // kind arrive; no retry, since a retry would double the GPU work.
  const openaiConfig = (relayUrl: string, voices: import('anytts').VoiceInfo[]) => ({
    relayUrl,
    catalog: voices,
    firstByteMs: 65_000,
    retries: 0,
  })

  function lastConfig(): import('anytts').TtsConfig {
    const calls = anyttsMock.createTts.mock.calls as unknown as [import('anytts').TtsConfig][]
    return calls[calls.length - 1][0]
  }

  it('synthesizes with the openai engine after configureOmniVoice', async () => {
    configureOmniVoice({ relayUrl: RELAY, catalog })
    await synthesizeSpeech('Cześć', { engine: 'openai', voice: 'krystyna' })

    expect(anyttsMock.createTts).toHaveBeenCalledTimes(1)
    const config = lastConfig()
    expect(config.engines.openai).toEqual(openaiConfig(RELAY, catalog))
    // Edge keeps its own options untouched next to the relay client.
    expect(config.engines.edge).toEqual(edgeConfig)
    expect(config.defaultEngine).toBe('edge')
    expect(config.scheduler).toEqual({
      concurrency: 1,
      tiers: [{ name: 'play' }, { name: 'warm' }],
    })
    expect(config.cache).toEqual({ max: 200 })

    const [request] = anyttsMock.tts.synthesize.mock.calls[0] as unknown as [
      import('anytts').SynthesisRequest,
    ]
    expect(request).toMatchObject({ text: 'Cześć', engine: 'openai', voice: 'krystyna' })
    // motyl respells in prepareSpeechText: no `lang`, so anytts never respells again.
    expect(request).not.toHaveProperty('lang')

    prefetchSpeech('Dalej', { engine: 'openai', voice: 'krystyna' })
    expect(anyttsMock.tts.prefetch).toHaveBeenCalledWith(
      expect.objectContaining({ engine: 'openai', voice: 'krystyna', tier: 'warm' })
    )
  })

  it('omitting engine keeps edge with its options', async () => {
    await synthesizeSpeech('Hello', { voice: 'pl-PL-MarekNeural' })
    prefetchSpeech('Next', { voice: 'pl-PL-MarekNeural' })

    expect(lastConfig().engines).toEqual({ edge: edgeConfig })
    expect(anyttsMock.tts.synthesize).toHaveBeenCalledWith(
      expect.objectContaining({ engine: 'edge', voice: 'pl-PL-MarekNeural', tier: 'play' })
    )
    expect(anyttsMock.tts.prefetch).toHaveBeenCalledWith(
      expect.objectContaining({ engine: 'edge', tier: 'warm' })
    )

    // Also with OmniVoice configured: no engine still means Edge.
    configureOmniVoice({ relayUrl: RELAY, catalog })
    await synthesizeSpeech('Again', { voice: 'pl-PL-MarekNeural' })
    expect(anyttsMock.tts.synthesize).toHaveBeenLastCalledWith(
      expect.objectContaining({ engine: 'edge' })
    )
  })

  it('reconfiguring with the same relay keeps the instance', async () => {
    configureOmniVoice({ relayUrl: RELAY, catalog })
    await synthesizeSpeech('One', { engine: 'openai', voice: 'krystyna' })
    expect(anyttsMock.createTts).toHaveBeenCalledTimes(1)

    // Same URL, equal catalog (a fresh fetch of the same /voices): kept.
    configureOmniVoice({ relayUrl: RELAY, catalog: catalog.map((v) => ({ ...v })) })
    await synthesizeSpeech('Two', { engine: 'openai', voice: 'krystyna' })
    expect(anyttsMock.createTts).toHaveBeenCalledTimes(1)

    // A different URL rebuilds it.
    const other = 'https://other.tailnet.example/tts'
    configureOmniVoice({ relayUrl: other, catalog })
    await synthesizeSpeech('Three', { engine: 'openai', voice: 'krystyna' })
    expect(anyttsMock.createTts).toHaveBeenCalledTimes(2)
    expect(lastConfig().engines.openai).toEqual(openaiConfig(other, catalog))

    // A changed catalog rebuilds it too.
    configureOmniVoice({ relayUrl: other, catalog: catalog.slice(0, 1) })
    await synthesizeSpeech('Four', { engine: 'openai', voice: 'krystyna' })
    expect(anyttsMock.createTts).toHaveBeenCalledTimes(3)

    // null removes the relay client.
    configureOmniVoice(null)
    await synthesizeSpeech('Five')
    expect(anyttsMock.createTts).toHaveBeenCalledTimes(4)
    expect(lastConfig().engines).toEqual({ edge: edgeConfig })
  })

  async function expectOpenaiRejected(): Promise<void> {
    const error = await synthesizeSpeech('Hello', { engine: 'openai', voice: 'krystyna' }).then(
      () => null,
      (e: unknown) => e
    )
    expect(error).toBeInstanceOf(TtsError)
    expect((error as TtsError).kind).toBe('rejected')
    expect((error as TtsError).message).toMatch(/OmniVoice is not configured/)
  }

  it('openai without configuration rejects', async () => {
    await expectOpenaiRejected()
    expect(anyttsMock.tts.synthesize).not.toHaveBeenCalled()

    // Removing the configuration brings the rejection back.
    configureOmniVoice({ relayUrl: RELAY, catalog })
    configureOmniVoice(null)
    await expect(synthesizeSpeech('Hello', { engine: 'openai' })).rejects.toThrow(
      /OmniVoice is not configured/
    )
    expect(anyttsMock.tts.synthesize).not.toHaveBeenCalled()
  })

  it('prefetch of openai without configuration neither throws nor calls anytts', () => {
    expect(() => prefetchSpeech('Hello', { engine: 'openai', voice: 'krystyna' })).not.toThrow()
    expect(anyttsMock.tts.prefetch).not.toHaveBeenCalled()
    expect(anyttsMock.createTts).not.toHaveBeenCalled()
  })

  async function expectEdgeOnlyAfter(config: import('@/lib/tts/client').OmniVoiceConfig) {
    // A valid relay first, so the bad one has to drop it, not just keep nothing.
    configureOmniVoice({ relayUrl: RELAY, catalog })
    await synthesizeSpeech('One', { engine: 'openai', voice: 'krystyna' })

    configureOmniVoice(config)
    await expect(synthesizeSpeech('Hello', { voice: 'pl-PL-MarekNeural' })).resolves.toBeInstanceOf(
      ArrayBuffer
    )
    // anytts would throw RangeError building an openai engine from this config,
    // so the instance must be Edge only.
    expect(lastConfig().engines).toEqual({ edge: edgeConfig })
    expect(() => prefetchSpeech('Next', { voice: 'pl-PL-MarekNeural' })).not.toThrow()
    expect(anyttsMock.tts.prefetch).toHaveBeenLastCalledWith(
      expect.objectContaining({ engine: 'edge' })
    )
    await expectOpenaiRejected()
  }

  it('an empty catalog leaves edge working', async () => {
    await expectEdgeOnlyAfter({ relayUrl: RELAY, catalog: [] })
  })

  it('an empty relay url leaves edge working', async () => {
    await expectEdgeOnlyAfter({ relayUrl: '', catalog })
    configureOmniVoice({ relayUrl: RELAY, catalog })
    await expectEdgeOnlyAfter({ relayUrl: '   ', catalog })
  })

  it('prefetchSpeech never throws synchronously', () => {
    anyttsMock.createTts.mockImplementationOnce(() => {
      throw new RangeError('openai: catalog must be non-empty')
    })
    expect(() => prefetchSpeech('Hello', { voice: 'pl-PL-MarekNeural' })).not.toThrow()
  })
})
