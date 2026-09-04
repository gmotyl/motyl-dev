import { beforeEach, describe, expect, it, vi } from 'vitest'

// Fake `edge-tts-universal/browser` Communicate that counts instantiations and
// stream() invocations so we can assert the synthesis cache prevents rework.
const edgeMock = vi.hoisted(() => {
  let constructCount = 0
  let streamCount = 0
  let shouldReject = false
  let stallOnce = false

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
      if (stallOnce) {
        stallOnce = false
        yield { type: 'audio', data: new Uint8Array([1, 2, 3]) }
        // Simulate a WebSocket that neither sends the next frame nor closes —
        // the real-world "stalled stream" failure this mock stands in for.
        await new Promise(() => {})
        return
      }
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
    setStallOnce: (value: boolean) => {
      stallOnce = value
    },
    reset: () => {
      constructCount = 0
      streamCount = 0
      shouldReject = false
      stallOnce = false
    },
  }
})

vi.mock('edge-tts-universal/browser', () => ({
  Communicate: edgeMock.FakeCommunicate,
}))

let synthesizeSpeech: typeof import('@/lib/tts/client').synthesizeSpeech
let prefetchSpeech: typeof import('@/lib/tts/client').prefetchSpeech

beforeEach(async () => {
  vi.resetModules()
  edgeMock.reset()
  const mod = await import('@/lib/tts/client')
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

  it('retries once with a fresh connection after a stalled stream, and succeeds', async () => {
    vi.useFakeTimers()
    try {
      edgeMock.setStallOnce(true)

      const promise = synthesizeSpeech('stalls then recovers', { voice: 'en-GB-RyanNeural' })
      // Let the stalled first attempt's watchdog fire (15s inactivity timeout).
      await vi.advanceTimersByTimeAsync(15000)
      const buffer = await promise

      expect(buffer).toBeInstanceOf(ArrayBuffer)
      // First attempt stalled (connection 1), retry succeeded (connection 2).
      expect(edgeMock.constructCount).toBe(2)
    } finally {
      vi.useRealTimers()
    }
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

  it('synthesis cache evicts the least-recently-used entry beyond the cap (200)', async () => {
    const voice = 'en-GB-RyanNeural'
    const CAP = 200

    // Fill the cache exactly to the cap.
    for (let i = 0; i < CAP; i += 1) {
      await synthesizeSpeech(`text-${i}`, { voice })
    }
    expect(edgeMock.constructCount).toBe(CAP)

    // One more distinct key overflows and evicts the LRU (text-0, untouched).
    await synthesizeSpeech(`text-${CAP}`, { voice })
    expect(edgeMock.constructCount).toBe(CAP + 1)

    // text-0 was evicted, so it must be synthesized again.
    await synthesizeSpeech('text-0', { voice })
    expect(edgeMock.constructCount).toBe(CAP + 2)
  })

  it('LRU: reading an entry protects it from eviction (touch on read)', async () => {
    const voice = 'en-GB-RyanNeural'
    const CAP = 200

    for (let i = 0; i < CAP; i += 1) {
      await synthesizeSpeech(`k-${i}`, { voice })
    }
    expect(edgeMock.constructCount).toBe(CAP)

    // Touch the oldest entry (k-0) so it becomes most-recently-used; now k-1 is
    // the LRU. Reading must NOT re-synthesize.
    await synthesizeSpeech('k-0', { voice })
    expect(edgeMock.constructCount).toBe(CAP)

    // Overflow: the new LRU (k-1) is evicted, not the just-touched k-0.
    await synthesizeSpeech(`k-${CAP}`, { voice })
    expect(edgeMock.constructCount).toBe(CAP + 1)

    // k-0 survived (still cached, no re-synthesis)...
    await synthesizeSpeech('k-0', { voice })
    expect(edgeMock.constructCount).toBe(CAP + 1)

    // ...while k-1 was evicted and must re-synthesize.
    await synthesizeSpeech('k-1', { voice })
    expect(edgeMock.constructCount).toBe(CAP + 2)
  })
})
