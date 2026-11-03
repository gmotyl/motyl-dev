import type { VoiceInfo } from 'anytts'
import {
  OMNIVOICE_ENABLED_KEY,
  OMNIVOICE_PROBE_MS,
  OMNIVOICE_RELAY_URL_KEY,
  OMNIVOICE_VOICE_KEY,
  fetchRelayVoices,
  isOmniVoiceConfigured,
  probeRelay,
  readOmniVoiceSettings,
  writeOmniVoiceSettings,
} from '@/lib/tts/omnivoice'

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}

describe('OmniVoice settings', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('round-trips OmniVoice settings through localStorage', () => {
    expect(readOmniVoiceSettings()).toEqual({ enabled: false, relayUrl: null, voice: null })

    const written = writeOmniVoiceSettings({
      enabled: true,
      relayUrl: 'https://spock.tail1234.ts.net',
      voice: 'krystyna1',
    })

    expect(written).toEqual({
      enabled: true,
      relayUrl: 'https://spock.tail1234.ts.net',
      voice: 'krystyna1',
    })
    expect(readOmniVoiceSettings()).toEqual(written)
    expect(localStorage.getItem(OMNIVOICE_ENABLED_KEY)).toBe('1')
    expect(localStorage.getItem(OMNIVOICE_RELAY_URL_KEY)).toBe('https://spock.tail1234.ts.net')
    expect(localStorage.getItem(OMNIVOICE_VOICE_KEY)).toBe('krystyna1')

    // A partial patch keeps the other fields; disabling removes the flag.
    expect(writeOmniVoiceSettings({ enabled: false })).toEqual({
      enabled: false,
      relayUrl: 'https://spock.tail1234.ts.net',
      voice: 'krystyna1',
    })
    expect(localStorage.getItem(OMNIVOICE_ENABLED_KEY)).toBeNull()

    // Null clears a stored value.
    expect(writeOmniVoiceSettings({ relayUrl: null, voice: null })).toEqual({
      enabled: false,
      relayUrl: null,
      voice: null,
    })
    expect(localStorage.getItem(OMNIVOICE_RELAY_URL_KEY)).toBeNull()
    expect(localStorage.getItem(OMNIVOICE_VOICE_KEY)).toBeNull()
  })

  it('trims a padded relay URL on write', () => {
    const written = writeOmniVoiceSettings({ relayUrl: '  https://spock.tail1234.ts.net/  \n' })

    expect(written.relayUrl).toBe('https://spock.tail1234.ts.net/')
    expect(localStorage.getItem(OMNIVOICE_RELAY_URL_KEY)).toBe('https://spock.tail1234.ts.net/')
    expect(readOmniVoiceSettings().relayUrl).toBe('https://spock.tail1234.ts.net/')
  })

  it('treats malformed stored values as not configured', () => {
    localStorage.setItem(OMNIVOICE_ENABLED_KEY, 'true')
    localStorage.setItem(OMNIVOICE_RELAY_URL_KEY, '   ')
    localStorage.setItem(OMNIVOICE_VOICE_KEY, '')

    const settings = readOmniVoiceSettings()
    expect(settings).toEqual({ enabled: false, relayUrl: null, voice: null })
    expect(isOmniVoiceConfigured(settings)).toBe(false)

    localStorage.setItem(OMNIVOICE_ENABLED_KEY, '1')
    localStorage.setItem(OMNIVOICE_RELAY_URL_KEY, 'not a url')
    expect(isOmniVoiceConfigured(readOmniVoiceSettings())).toBe(false)

    // Unavailable storage never throws: reads fall back, writes are dropped.
    const getItem = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('SecurityError')
    })
    const setItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError')
    })

    expect(() => readOmniVoiceSettings()).not.toThrow()
    expect(readOmniVoiceSettings()).toEqual({ enabled: false, relayUrl: null, voice: null })
    expect(() => writeOmniVoiceSettings({ enabled: true, relayUrl: 'https://x.ts.net' })).not.toThrow()
    expect(getItem).toHaveBeenCalled()
    expect(setItem).toHaveBeenCalled()
  })

  it('only https or localhost relay URLs count as configured', () => {
    const configured = (relayUrl: string | null, enabled = true) =>
      isOmniVoiceConfigured({ enabled, relayUrl, voice: null })

    expect(configured('http://100.106.176.55:8891')).toBe(false)
    expect(configured('https://spock.tail1234.ts.net')).toBe(true)
    expect(configured('http://localhost:8891')).toBe(true)
    expect(configured('http://127.0.0.1:8891')).toBe(true)
    expect(configured('ftp://spock.tail1234.ts.net')).toBe(false)
    expect(configured(null)).toBe(false)
    expect(configured('https://spock.tail1234.ts.net', false)).toBe(false)
  })
})

describe('OmniVoice relay calls', () => {
  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it('probe is true only for a 200 health within the timeout', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(jsonResponse({ ok: true }))
    vi.stubGlobal('fetch', fetchMock)

    await expect(probeRelay('https://spock.tail1234.ts.net/')).resolves.toBe(true)
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock.mock.calls[0][0]).toBe('https://spock.tail1234.ts.net/health')

    fetchMock.mockResolvedValueOnce(jsonResponse({ ok: false }, 503))
    await expect(probeRelay('https://spock.tail1234.ts.net')).resolves.toBe(false)

    fetchMock.mockRejectedValueOnce(new TypeError('Failed to fetch'))
    await expect(probeRelay('https://spock.tail1234.ts.net')).resolves.toBe(false)
    expect(fetchMock).toHaveBeenCalledTimes(3)
  })

  it('probe aborts and returns false after the timeout', async () => {
    vi.useFakeTimers()
    let signal: AbortSignal | undefined
    const fetchMock = vi.fn((_url: string, init?: RequestInit) => {
      signal = init?.signal ?? undefined
      return new Promise<Response>((_resolve, reject) => {
        signal?.addEventListener('abort', () => {
          reject(new DOMException('The operation was aborted.', 'AbortError'))
        })
      })
    })
    vi.stubGlobal('fetch', fetchMock)

    const result = probeRelay('https://spock.tail1234.ts.net')
    await vi.advanceTimersByTimeAsync(OMNIVOICE_PROBE_MS - 1)
    expect(signal?.aborted).toBe(false)
    await vi.advanceTimersByTimeAsync(1)

    await expect(result).resolves.toBe(false)
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(signal?.aborted).toBe(true)
  })

  it('fetches the relay voice catalog', async () => {
    const voices: VoiceInfo[] = [
      { id: 'krystyna1', label: 'Krystyna', locale: 'pl-PL', gender: 'female', multilingual: false },
    ]
    const fetchMock = vi.fn().mockResolvedValueOnce(jsonResponse(voices))
    vi.stubGlobal('fetch', fetchMock)

    await expect(fetchRelayVoices('https://spock.tail1234.ts.net//')).resolves.toEqual(voices)
    expect(fetchMock.mock.calls[0][0]).toBe('https://spock.tail1234.ts.net/voices')

    fetchMock.mockResolvedValueOnce(jsonResponse({ error: 'down' }, 502))
    await expect(fetchRelayVoices('https://spock.tail1234.ts.net')).rejects.toThrow()

    fetchMock.mockRejectedValueOnce(new TypeError('Failed to fetch'))
    await expect(fetchRelayVoices('https://spock.tail1234.ts.net')).rejects.toThrow()
  })

  it('the catalog request carries the caller signal and rejects on its abort', async () => {
    const fetchMock = vi.fn((_url: string, init?: RequestInit) => {
      const signal = init?.signal
      return new Promise<Response>((_resolve, reject) => {
        signal?.addEventListener('abort', () => {
          reject(new DOMException('The operation was aborted.', 'AbortError'))
        })
      })
    })
    vi.stubGlobal('fetch', fetchMock)
    const controller = new AbortController()

    const result = fetchRelayVoices('https://spock.tail1234.ts.net', controller.signal)
    expect(fetchMock.mock.calls[0][1]?.signal).toBe(controller.signal)
    controller.abort()

    await expect(result).rejects.toMatchObject({ name: 'AbortError' })
  })

  it('probe leaves no timer behind and wants exactly 200', async () => {
    vi.useFakeTimers()
    const fetchMock = vi.fn().mockResolvedValueOnce(jsonResponse({ ok: true }))
    vi.stubGlobal('fetch', fetchMock)

    await expect(probeRelay('https://spock.tail1234.ts.net')).resolves.toBe(true)
    expect(vi.getTimerCount()).toBe(0)

    // The relay contract says 200; another 2xx is not a healthy answer.
    fetchMock.mockResolvedValueOnce(new Response(null, { status: 204 }))
    await expect(probeRelay('https://spock.tail1234.ts.net')).resolves.toBe(false)
    expect(vi.getTimerCount()).toBe(0)
  })

  it('the catalog needs both a 2xx answer and a list', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    // A list behind an error status is still an error.
    fetchMock.mockResolvedValueOnce(jsonResponse([], 502))
    await expect(fetchRelayVoices('https://spock.tail1234.ts.net')).rejects.toThrow(/502/)

    // A 200 that is not a list is not a catalog.
    fetchMock.mockResolvedValueOnce(jsonResponse({ voices: [] }))
    await expect(fetchRelayVoices('https://spock.tail1234.ts.net')).rejects.toThrow(/list/)
  })

  it('joins endpoints onto a relay path prefix and keeps its query', async () => {
    const fetchMock = vi.fn(async () => jsonResponse([]))
    vi.stubGlobal('fetch', fetchMock)
    const voicesUrl = async (relayUrl: string) => {
      fetchMock.mockClear()
      await fetchRelayVoices(relayUrl)
      return (fetchMock.mock.calls[0] as unknown[])[0]
    }

    expect(await voicesUrl('https://spock.tail1234.ts.net')).toBe('https://spock.tail1234.ts.net/voices')
    expect(await voicesUrl('https://host.example/relay')).toBe('https://host.example/relay/voices')
    expect(await voicesUrl('https://host.example/relay/')).toBe('https://host.example/relay/voices')
    expect(await voicesUrl('https://host.example/relay//')).toBe('https://host.example/relay/voices')
    expect(await voicesUrl('  https://host.example/relay  ')).toBe('https://host.example/relay/voices')
    expect(await voicesUrl('https://host.example/relay?x=1')).toBe('https://host.example/relay/voices?x=1')

    fetchMock.mockResolvedValueOnce(jsonResponse({ ok: true }))
    await expect(probeRelay('https://host.example/relay?x=1')).resolves.toBe(true)
    expect((fetchMock.mock.calls.at(-1) as unknown[])[0]).toBe('https://host.example/relay/health?x=1')
  })
})
