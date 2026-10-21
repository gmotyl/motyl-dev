import { beforeEach, describe, expect, it, vi } from 'vitest'

// The synthesis queue itself (one at a time, play before warm, promotion,
// callback timing) is anytts's scheduler and is tested there. What the client
// still owns is the mapping onto it: motyl's `priority` becomes the anytts
// tier, and the onStart/onFirstByte hooks reach the request untouched.
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
  vi.resetModules()
  anyttsMock.createTts.mockClear()
  anyttsMock.tts.synthesize.mockReset()
  anyttsMock.tts.synthesize.mockImplementation(async () => ({
    bytes: new ArrayBuffer(4),
    mime: 'audio/mpeg',
    engine: 'edge',
    voice: 'pl-PL-MarekNeural',
  }))
  anyttsMock.tts.prefetch.mockReset()
  const mod = await import('@/lib/tts/client')
  synthesizeSpeech = mod.synthesizeSpeech
  prefetchSpeech = mod.prefetchSpeech
})

describe('synthesis tiers', () => {
  it('synthesizeSpeech maps priority to the anytts tier, play by default', async () => {
    await synthesizeSpeech('Warm me', { voice: 'pl-PL-MarekNeural', priority: 'warm' })
    await synthesizeSpeech('Play me', { voice: 'pl-PL-MarekNeural', priority: 'play' })
    await synthesizeSpeech('Default me', { voice: 'pl-PL-MarekNeural' })

    const requests = anyttsMock.tts.synthesize.mock.calls.map(([req]) => req)
    expect(requests).toEqual([
      expect.objectContaining({ text: 'Warm me', voice: 'pl-PL-MarekNeural', engine: 'edge', tier: 'warm' }),
      expect.objectContaining({ text: 'Play me', voice: 'pl-PL-MarekNeural', engine: 'edge', tier: 'play' }),
      expect.objectContaining({ text: 'Default me', voice: 'pl-PL-MarekNeural', engine: 'edge', tier: 'play' }),
    ])
  })

  it('synthesizeSpeech forwards onStart and onFirstByte', async () => {
    const onStart = vi.fn()
    const onFirstByte = vi.fn()

    await synthesizeSpeech('Hello', {
      voice: 'pl-PL-ZofiaNeural',
      priority: 'warm',
      onStart,
      onFirstByte,
    })

    expect(anyttsMock.tts.synthesize).toHaveBeenCalledWith({
      text: 'Hello',
      voice: 'pl-PL-ZofiaNeural',
      engine: 'edge',
      tier: 'warm',
      onStart,
      onFirstByte,
    })
  })

  it('prefetchSpeech warms on the warm tier', () => {
    prefetchSpeech('Later', { voice: 'pl-PL-MarekNeural' })

    expect(anyttsMock.tts.prefetch).toHaveBeenCalledTimes(1)
    expect(anyttsMock.tts.prefetch).toHaveBeenCalledWith(
      expect.objectContaining({ text: 'Later', voice: 'pl-PL-MarekNeural', engine: 'edge', tier: 'warm' })
    )
    expect(anyttsMock.tts.synthesize).not.toHaveBeenCalled()
  })
})
