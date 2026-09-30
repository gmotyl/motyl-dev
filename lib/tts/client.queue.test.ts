import { beforeEach, describe, expect, it, vi } from 'vitest'

// Fake `edge-tts-universal/browser` Communicate whose every stream() waits on
// its own deferred, so a test decides exactly when each synthesis settles and
// can observe which syntheses have started (i.e. left the queue) in between.
const edgeMock = vi.hoisted(() => {
  type Deferred = { resolve: () => void; reject: (error: Error) => void }
  let started: string[] = []
  let pending = new Map<string, Deferred>()

  class FakeCommunicate {
    text: string

    constructor(text: string) {
      this.text = text
    }

    async *stream() {
      started.push(this.text)
      await new Promise<void>((resolve, reject) => {
        pending.set(this.text, { resolve, reject })
      })
      yield { type: 'audio', data: new Uint8Array([1, 2, 3]) }
    }
  }

  return {
    FakeCommunicate,
    get started() {
      return started
    },
    settle(text: string, error?: Error) {
      const deferred = pending.get(text)
      if (!deferred) throw new Error(`no synthesis running for "${text}"`)
      pending.delete(text)
      if (error) deferred.reject(error)
      else deferred.resolve()
    },
    reset() {
      started = []
      pending = new Map()
    },
  }
})

vi.mock('edge-tts-universal/browser', () => ({
  Communicate: edgeMock.FakeCommunicate,
}))

let synthesizeSpeech: typeof import('@/lib/tts/client').synthesizeSpeech
let prefetchSpeech: typeof import('@/lib/tts/client').prefetchSpeech

// The client awaits a dynamic import before opening the stream, so a job that
// has left the queue needs a few macrotask turns before the mock records it.
async function flush(): Promise<void> {
  for (let i = 0; i < 5; i += 1) {
    await new Promise((resolve) => setTimeout(resolve, 0))
  }
}

// Wait for exactly `expected` to have started, then let a few more turns pass
// and check again, so a job that should still be waiting has had every chance
// to start (under a loaded parallel run the first import can take a while).
async function expectStarted(expected: string[]): Promise<void> {
  await vi.waitFor(() => expect(edgeMock.started).toEqual(expected))
  await flush()
  expect(edgeMock.started).toEqual(expected)
}

const voice = 'en-GB-RyanNeural'

beforeEach(async () => {
  // Fresh module per test: the queue and cache are module-level state.
  vi.resetModules()
  edgeMock.reset()
  vi.spyOn(console, 'log').mockImplementation(() => {})
  vi.spyOn(console, 'error').mockImplementation(() => {})
  const mod = await import('@/lib/tts/client')
  synthesizeSpeech = mod.synthesizeSpeech
  prefetchSpeech = mod.prefetchSpeech
})

describe('synthesis queue', () => {
  it('runs one synthesis at a time', async () => {
    const a = synthesizeSpeech('a', { voice })
    const b = synthesizeSpeech('b', { voice })
    const c = synthesizeSpeech('c', { voice })
    await expectStarted(['a'])

    edgeMock.settle('a')
    await a
    await expectStarted(['a', 'b'])

    edgeMock.settle('b')
    await b
    await expectStarted(['a', 'b', 'c'])

    edgeMock.settle('c')
    await expect(c).resolves.toBeInstanceOf(ArrayBuffer)
  })

  it('serves a play request before waiting warm requests', async () => {
    const running = synthesizeSpeech('running', { voice, priority: 'warm' })
    prefetchSpeech('warm-1', { voice })
    const warm2 = synthesizeSpeech('warm-2', { voice, priority: 'warm' })
    await expectStarted(['running'])

    const play = synthesizeSpeech('play', { voice })
    await flush()
    // The running job is not interrupted by the play arrival.
    expect(edgeMock.started).toEqual(['running'])

    edgeMock.settle('running')
    await running
    await expectStarted(['running', 'play'])

    edgeMock.settle('play')
    await play
    await expectStarted(['running', 'play', 'warm-1'])

    edgeMock.settle('warm-1')
    await expectStarted(['running', 'play', 'warm-1', 'warm-2'])
    edgeMock.settle('warm-2')
    await warm2
  })

  it('promotes a waiting warm request when play asks for the same text', async () => {
    const running = synthesizeSpeech('running', { voice })
    const warmA = synthesizeSpeech('warm-a', { voice, priority: 'warm' })
    const warmB = synthesizeSpeech('warm-b', { voice, priority: 'warm' })
    await expectStarted(['running'])

    // Play asks for warm-b, which is queued behind warm-a: it jumps the lane.
    const playB = synthesizeSpeech('warm-b', { voice })
    expect(playB).toBe(warmB)

    edgeMock.settle('running')
    await running
    await expectStarted(['running', 'warm-b'])

    edgeMock.settle('warm-b')
    const [fromWarm, fromPlay] = await Promise.all([warmB, playB])
    expect(fromPlay).toBe(fromWarm)
    // One synthesis served both callers.
    expect(edgeMock.started.filter((text) => text === 'warm-b')).toHaveLength(1)

    await expectStarted(['running', 'warm-b', 'warm-a'])
    edgeMock.settle('warm-a')
    await warmA
  })

  it('a failed synthesis frees the slot for the next job', async () => {
    const failing = synthesizeSpeech('fails', { voice })
    const next = synthesizeSpeech('next', { voice })
    await expectStarted(['fails'])

    edgeMock.settle('fails', new Error('synthesis boom'))
    await expect(failing).rejects.toThrow('synthesis boom')
    await expectStarted(['fails', 'next'])
    edgeMock.settle('next')
    await next

    // The failure was evicted: asking again runs a fresh synthesis.
    const retry = synthesizeSpeech('fails', { voice })
    expect(retry).not.toBe(failing)
    await expectStarted(['fails', 'next', 'fails'])
    edgeMock.settle('fails')
    await expect(retry).resolves.toBeInstanceOf(ArrayBuffer)
  })

  it('a cache hit never enters the queue', async () => {
    const running = synthesizeSpeech('running', { voice })
    const queued = synthesizeSpeech('queued', { voice, priority: 'warm' })
    await expectStarted(['running'])

    // Cached while running, while queued: callers dedupe onto the same promise.
    expect(synthesizeSpeech('running', { voice })).toBe(running)
    expect(synthesizeSpeech('queued', { voice, priority: 'warm' })).toBe(queued)

    edgeMock.settle('running')
    const first = await running
    await expectStarted(['running', 'queued'])
    edgeMock.settle('queued')
    await queued

    // Cached once resolved: no new synthesis and the same buffer.
    await expect(synthesizeSpeech('running', { voice })).resolves.toBe(first)
    await expectStarted(['running', 'queued'])
  })

  it('calls onStart when the job leaves the queue', async () => {
    const onRunningStart = vi.fn()
    const onQueuedStart = vi.fn()
    const onRunningHit = vi.fn()
    const onQueuedHit = vi.fn()
    const onResolvedHit = vi.fn()

    const running = synthesizeSpeech('running', { voice, onStart: onRunningStart })
    const queued = synthesizeSpeech('queued', { voice, onStart: onQueuedStart })
    await expectStarted(['running'])
    expect(onRunningStart).toHaveBeenCalledTimes(1)
    expect(onQueuedStart).not.toHaveBeenCalled()

    // A cache hit on a job that already started is told at once.
    void synthesizeSpeech('running', { voice, onStart: onRunningHit })
    expect(onRunningHit).toHaveBeenCalledTimes(1)
    // A cache hit on a job still waiting is told when that job starts.
    void synthesizeSpeech('queued', { voice, onStart: onQueuedHit })
    expect(onQueuedHit).not.toHaveBeenCalled()

    edgeMock.settle('running')
    await running
    await expectStarted(['running', 'queued'])
    expect(onQueuedStart).toHaveBeenCalledTimes(1)
    expect(onQueuedHit).toHaveBeenCalledTimes(1)

    edgeMock.settle('queued')
    await queued

    // A cache hit on a resolved job is told at once.
    void synthesizeSpeech('queued', { voice, onStart: onResolvedHit })
    expect(onResolvedHit).toHaveBeenCalledTimes(1)

    // Exactly once each, even after everything settled.
    await flush()
    for (const spy of [onRunningStart, onQueuedStart, onRunningHit, onQueuedHit, onResolvedHit]) {
      expect(spy).toHaveBeenCalledTimes(1)
    }
  })

  it('a throwing onStart does not stall the queue', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const boom = () => {
      throw new Error('onStart boom')
    }
    const onLaterStart = vi.fn()

    // The enqueuing caller's onStart throws as its job starts at once: the
    // caller still gets its promise, never a synchronous throw.
    let first!: Promise<ArrayBuffer>
    expect(() => {
      first = synthesizeSpeech('first', { voice, onStart: boom })
    }).not.toThrow()
    // A queued caller's onStart and a deduped caller's onStart both throw.
    const queued = synthesizeSpeech('queued', { voice, onStart: boom })
    let deduped!: Promise<ArrayBuffer>
    expect(() => {
      deduped = synthesizeSpeech('queued', { voice, onStart: boom })
    }).not.toThrow()
    // A cache hit on the running job is told at once; its throw is contained too.
    let runningHit!: Promise<ArrayBuffer>
    expect(() => {
      runningHit = synthesizeSpeech('first', { voice, onStart: boom })
    }).not.toThrow()
    const later = synthesizeSpeech('later', { voice, onStart: onLaterStart })
    await expectStarted(['first'])

    edgeMock.settle('first')
    await expect(first).resolves.toBeInstanceOf(ArrayBuffer)
    await expect(runningHit).resolves.toBeInstanceOf(ArrayBuffer)
    await expectStarted(['first', 'queued'])

    edgeMock.settle('queued')
    await expect(queued).resolves.toBeInstanceOf(ArrayBuffer)
    await expect(deduped).resolves.toBe(await queued)
    await expectStarted(['first', 'queued', 'later'])
    expect(onLaterStart).toHaveBeenCalledTimes(1)

    edgeMock.settle('later')
    await expect(later).resolves.toBeInstanceOf(ArrayBuffer)
    expect(warn).toHaveBeenCalled()
  })
})
