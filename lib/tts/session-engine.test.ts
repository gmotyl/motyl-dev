import { afterEach, describe, expect, it, vi } from 'vitest'
import { TtsError } from 'anytts'

import { OMNIVOICE_PROBE_MS, type OmniVoiceSettings } from './omnivoice'
import { afterFailure, chooseSessionEngine, type SessionEngine } from './session-engine'

const configured: OmniVoiceSettings = {
  enabled: true,
  relayUrl: 'https://spock.example.ts.net',
  voice: 'krystyna1',
}

afterEach(() => {
  vi.useRealTimers()
})

describe('chooseSessionEngine', () => {
  it('chooses openai when configured and the probe succeeds', async () => {
    const probe = vi.fn(async () => true)

    await expect(chooseSessionEngine(configured, probe)).resolves.toEqual({
      engine: 'openai',
      fallback: false,
    })
    expect(probe).toHaveBeenCalledWith('https://spock.example.ts.net')
  })

  it('falls back to edge when the probe fails or times out', async () => {
    // Fails: the relay answered with something other than 200.
    await expect(chooseSessionEngine(configured, async () => false)).resolves.toEqual({
      engine: 'edge',
      fallback: true,
    })
    // Rejects: a network error is a failed probe, not an exception out of Play.
    await expect(
      chooseSessionEngine(configured, async () => {
        throw new TypeError('Failed to fetch')
      })
    ).resolves.toEqual({ engine: 'edge', fallback: true })

    // Times out: a probe that never settles still lets Play go on after the budget.
    vi.useFakeTimers()
    const choice = chooseSessionEngine(configured, () => new Promise<boolean>(() => {}))
    let settled: SessionEngine | null = null
    void choice.then((value) => {
      settled = value
    })
    await vi.advanceTimersByTimeAsync(OMNIVOICE_PROBE_MS - 1)
    expect(settled).toBeNull()
    await vi.advanceTimersByTimeAsync(1)
    expect(settled).toEqual({ engine: 'edge', fallback: true })
  })

  it('skips the probe when OmniVoice is not configured', async () => {
    const probe = vi.fn(async () => true)
    const unconfigured: OmniVoiceSettings[] = [
      { ...configured, enabled: false },
      { ...configured, relayUrl: null },
      // A page served over https cannot reach a plain-http relay.
      { ...configured, relayUrl: 'http://spock.example.ts.net' },
    ]

    for (const settings of unconfigured) {
      await expect(chooseSessionEngine(settings, probe)).resolves.toEqual({
        engine: 'edge',
        fallback: false,
      })
    }
    expect(probe).not.toHaveBeenCalled()
  })
})

describe('afterFailure', () => {
  it('afterFailure keeps the engine for an abort', () => {
    const openai: SessionEngine = { engine: 'openai', fallback: false }
    const edge: SessionEngine = { engine: 'edge', fallback: false }

    expect(afterFailure(openai, new DOMException('Aborted', 'AbortError'))).toBe(openai)
    // Any other rejection moves OmniVoice to Edge, marked as a fallback.
    expect(afterFailure(openai, new TtsError('network', 'relay gone'))).toEqual({
      engine: 'edge',
      fallback: true,
    })
    expect(afterFailure(openai, new Error('boom'))).toEqual({ engine: 'edge', fallback: true })
    // Already on Edge: nothing to move to.
    expect(afterFailure(edge, new TtsError('network', 'edge gone'))).toBe(edge)
  })
})
