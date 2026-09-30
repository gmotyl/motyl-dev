import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// Fake `edge-tts-universal/browser` Communicate driven by a per-attempt script:
// each stream() takes the next script queued for its text and emits its
// messages at the given offsets from the attempt's start (fake time), then
// either ends or hangs forever like a dead WebSocket that never closes.
const edgeMock = vi.hoisted(() => {
  type Step = { at: number; type: 'audio' | 'metadata' }
  type Script = { steps: Step[]; hang: boolean }
  let scripts = new Map<string, Script[]>()
  let starts: Array<{ text: string; at: number }> = []

  class FakeCommunicate {
    text: string

    constructor(text: string) {
      this.text = text
    }

    async *stream() {
      const begin = Date.now()
      starts.push({ text: this.text, at: begin })
      const script = scripts.get(this.text)?.shift() ?? { steps: [], hang: true }
      for (const step of script.steps) {
        const wait = begin + step.at - Date.now()
        if (wait > 0) await new Promise((resolve) => setTimeout(resolve, wait))
        yield step.type === 'audio'
          ? { type: 'audio', data: new Uint8Array([1, 2, 3]) }
          : { type: 'WordBoundary', offset: 0, duration: 0, text: 'x' }
      }
      if (script.hang) await new Promise(() => {})
    }
  }

  return {
    FakeCommunicate,
    get starts() {
      return starts
    },
    script(text: string, ...attempts: Script[]) {
      scripts.set(text, attempts)
    },
    reset() {
      scripts = new Map()
      starts = []
    },
  }
})

vi.mock('edge-tts-universal/browser', () => ({
  Communicate: edgeMock.FakeCommunicate,
}))

type Client = typeof import('@/lib/tts/client')
let synthesizeSpeech: Client['synthesizeSpeech']

const voice = 'en-GB-RyanNeural'
const dead = { steps: [], hang: true }

// Settle outcome without an unhandled rejection while fake time runs.
function outcome(promise: Promise<ArrayBuffer>): { value?: ArrayBuffer; error?: Error; done: boolean } {
  const state: { value?: ArrayBuffer; error?: Error; done: boolean } = { done: false }
  promise.then(
    (value) => Object.assign(state, { value, done: true }),
    (error: Error) => Object.assign(state, { error, done: true })
  )
  return state
}

beforeEach(async () => {
  // Fresh module per test: the queue and cache are module-level state.
  vi.resetModules()
  edgeMock.reset()
  vi.spyOn(console, 'log').mockImplementation(() => {})
  vi.spyOn(console, 'warn').mockImplementation(() => {})
  vi.spyOn(console, 'error').mockImplementation(() => {})
  const mod = await import('@/lib/tts/client')
  synthesizeSpeech = mod.synthesizeSpeech
  // Load the mocked library on real timers, so the client's dynamic import of
  // it resolves from the module cache (microtasks only) under fake timers.
  await import('edge-tts-universal/browser')
  vi.useFakeTimers({ now: 0 })
})

afterEach(() => {
  vi.useRealTimers()
})

describe('first-byte deadline', () => {
  it('a dead attempt is declared after 8 s without audio', async () => {
    edgeMock.script('a', dead, dead)
    const result = outcome(synthesizeSpeech('a', { voice }))

    await vi.advanceTimersByTimeAsync(7999)
    expect(edgeMock.starts).toHaveLength(1)

    // The deadline fires: exactly one fresh attempt starts at once.
    await vi.advanceTimersByTimeAsync(1)
    expect(edgeMock.starts.map((s) => s.at)).toEqual([0, 8000])
    expect(result.done).toBe(false)

    // The retry is dead too: the job fails as a stall ~16 s in.
    await vi.advanceTimersByTimeAsync(8000)
    expect(result.done).toBe(true)
    expect(result.error?.name).toBe('TTSStreamStallError')
    expect(result.error?.message).toContain('no audio within 8000ms')
    expect(edgeMock.starts).toHaveLength(2)
  })

  it('a first byte at 6 s is not a stall', async () => {
    edgeMock.script('a', {
      steps: [
        { at: 6000, type: 'audio' },
        { at: 6500, type: 'audio' },
      ],
      hang: false,
    })
    const result = outcome(synthesizeSpeech('a', { voice }))

    await vi.advanceTimersByTimeAsync(7000)
    expect(result.done).toBe(true)
    expect(result.value).toBeInstanceOf(ArrayBuffer)
    expect(result.value?.byteLength).toBe(6)

    await vi.advanceTimersByTimeAsync(20000)
    expect(edgeMock.starts).toHaveLength(1)
  })

  it('metadata alone does not keep an attempt alive', async () => {
    const chatter = Array.from({ length: 20 }, (_, i) => ({
      at: (i + 1) * 1000,
      type: 'metadata' as const,
    }))
    edgeMock.script('a', { steps: chatter, hang: true }, dead)
    const result = outcome(synthesizeSpeech('a', { voice }))

    await vi.advanceTimersByTimeAsync(8000)
    expect(edgeMock.starts.map((s) => s.at)).toEqual([0, 8000])

    await vi.advanceTimersByTimeAsync(8000)
    expect(result.error?.name).toBe('TTSStreamStallError')
  })

  it('after the first byte the 15 s inactivity rule applies', async () => {
    edgeMock.script('a', {
      steps: [
        { at: 1000, type: 'audio' },
        { at: 11000, type: 'audio' },
      ],
      hang: false,
    })
    const result = outcome(synthesizeSpeech('a', { voice }))

    await vi.advanceTimersByTimeAsync(11000)
    expect(result.done).toBe(true)
    expect(result.value?.byteLength).toBe(6)
    expect(edgeMock.starts).toHaveLength(1)
  })
})
