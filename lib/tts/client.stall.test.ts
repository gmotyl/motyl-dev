import { beforeEach, describe, expect, it, vi } from 'vitest'

// Deadlines, stall detection and the restart itself are anytts's (configured
// with the reader's 8 s / 15 s in client.test.ts). The client only hands the
// wake-up restart through and reports anytts's answer.
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

let restartStalledSynthesis: typeof import('@/lib/tts/client').restartStalledSynthesis

beforeEach(async () => {
  vi.resetModules()
  anyttsMock.createTts.mockClear()
  anyttsMock.tts.restartStalled.mockReset()
  const mod = await import('@/lib/tts/client')
  restartStalledSynthesis = mod.restartStalledSynthesis
})

describe('restartStalledSynthesis', () => {
  it('restartStalledSynthesis delegates to restartStalled', () => {
    anyttsMock.tts.restartStalled.mockReturnValueOnce(true).mockReturnValueOnce(false)

    expect(restartStalledSynthesis()).toBe(true)
    expect(restartStalledSynthesis()).toBe(false)
    expect(anyttsMock.tts.restartStalled).toHaveBeenCalledTimes(2)
  })
})
