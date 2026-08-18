import { beforeEach, describe, expect, it, vi } from 'vitest'

// Fake `edge-tts-universal/browser` Communicate that counts instantiations and
// stream() invocations so we can assert the synthesis cache prevents rework.
const edgeMock = vi.hoisted(() => {
  let constructCount = 0
  let streamCount = 0
  let shouldReject = false

  class FakeCommunicate {
    text: string
    options: unknown

    constructor(text: string, options: unknown) {
      this.text = text
      this.options = options
      constructCount += 1
    }

    async *stream() {
      streamCount += 1
      if (shouldReject) throw new Error('synthesis boom')
      yield { type: 'audio', data: new Uint8Array([1, 2, 3]) }
    }
  }

  return {
    FakeCommunicate,
    get constructCount() {
      return constructCount
    },
    get streamCount() {
      return streamCount
    },
    setReject: (value: boolean) => {
      shouldReject = value
    },
    reset: () => {
      constructCount = 0
      streamCount = 0
      shouldReject = false
    },
  }
})

vi.mock('edge-tts-universal/browser', () => ({
  Communicate: edgeMock.FakeCommunicate,
}))

let synthesizeSpeech: typeof import('./tts-client').synthesizeSpeech
let prefetchSpeech: typeof import('./tts-client').prefetchSpeech

beforeEach(async () => {
  vi.resetModules()
  edgeMock.reset()
  const mod = await import('./tts-client')
  synthesizeSpeech = mod.synthesizeSpeech
  prefetchSpeech = mod.prefetchSpeech
})

describe('synthesizeSpeech cache', () => {
  it('synthesizeSpeech caches by voice+text and synthesizes once for repeat calls', async () => {
    const first = await synthesizeSpeech('hello', { voice: 'en-GB-RyanNeural' })
    const second = await synthesizeSpeech('hello', { voice: 'en-GB-RyanNeural' })

    expect(edgeMock.constructCount).toBe(1)
    expect(edgeMock.streamCount).toBe(1)
    expect(second).toBe(first)
  })

  it('prefetchSpeech warms the cache so a later synthesizeSpeech does not re-synthesize', async () => {
    prefetchSpeech('warm me', { voice: 'en-GB-RyanNeural' })
    const buffer = await synthesizeSpeech('warm me', { voice: 'en-GB-RyanNeural' })

    expect(buffer).toBeInstanceOf(ArrayBuffer)
    expect(edgeMock.constructCount).toBe(1)
    expect(edgeMock.streamCount).toBe(1)
  })

  it('prefetchSpeech with empty/whitespace text does nothing', async () => {
    prefetchSpeech('', { voice: 'en-GB-RyanNeural' })
    prefetchSpeech('   \n  ', { voice: 'en-GB-RyanNeural' })
    await Promise.resolve()

    expect(edgeMock.constructCount).toBe(0)
    expect(edgeMock.streamCount).toBe(0)
  })

  it('synthesizeSpeech keys on voice so a different voice re-synthesizes', async () => {
    await synthesizeSpeech('same text', { voice: 'en-GB-RyanNeural' })
    await synthesizeSpeech('same text', { voice: 'pl-PL-ZofiaNeural' })

    expect(edgeMock.constructCount).toBe(2)
    expect(edgeMock.streamCount).toBe(2)
  })

  it('a rejected synthesis is not cached and can be retried', async () => {
    edgeMock.setReject(true)
    await expect(synthesizeSpeech('retry me', { voice: 'en-GB-RyanNeural' })).rejects.toThrow()

    edgeMock.setReject(false)
    const buffer = await synthesizeSpeech('retry me', { voice: 'en-GB-RyanNeural' })

    expect(buffer).toBeInstanceOf(ArrayBuffer)
    // Second (successful) attempt re-ran the underlying stream: failure was not cached.
    expect(edgeMock.streamCount).toBe(2)
  })

  it('synthesis cache evicts oldest entries beyond the cap', async () => {
    const voice = 'en-GB-RyanNeural'

    for (let i = 0; i < 24; i += 1) {
      await synthesizeSpeech(`text-${i}`, { voice })
    }
    expect(edgeMock.constructCount).toBe(24)

    // 25th distinct key evicts the oldest inserted key (text-0).
    await synthesizeSpeech('text-24', { voice })
    expect(edgeMock.constructCount).toBe(25)

    // text-1 is still cached (a read does not re-synthesize).
    await synthesizeSpeech('text-1', { voice })
    expect(edgeMock.constructCount).toBe(25)

    // text-0 was evicted, so it must be synthesized again.
    await synthesizeSpeech('text-0', { voice })
    expect(edgeMock.constructCount).toBe(26)
  })
})
