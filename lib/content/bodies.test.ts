import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { bodyAssetBaseUrl, getNewsBody } from '@/lib/content/bodies'

describe('bodyAssetBaseUrl', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('resolves the base URL as BASE_URL, then VERCEL_URL, then localhost', () => {
    vi.stubEnv('BASE_URL', 'https://base.example.com')
    vi.stubEnv('VERCEL_URL', 'vercel.example.com')
    expect(bodyAssetBaseUrl()).toBe('https://base.example.com')

    vi.stubEnv('BASE_URL', '')
    vi.stubEnv('VERCEL_URL', 'vercel.example.com')
    expect(bodyAssetBaseUrl()).toBe('https://vercel.example.com')

    vi.stubEnv('BASE_URL', '')
    vi.stubEnv('VERCEL_URL', '')
    expect(bodyAssetBaseUrl()).toBe('http://localhost:3000')
  })

  it('strips a trailing slash from BASE_URL', () => {
    vi.stubEnv('BASE_URL', 'https://base.example.com/')
    expect(bodyAssetBaseUrl()).toBe('https://base.example.com')
  })
})

describe('getNewsBody', () => {
  beforeEach(() => {
    vi.stubEnv('BASE_URL', 'https://base.example.com')
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
  })

  it('fetches the asset path with force-cache', async () => {
    const fetchMock = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ content: 'hello', externalLinks: [] }),
      })
    )
    vi.stubGlobal('fetch', fetchMock)

    await getNewsBody('some-slug')

    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock).toHaveBeenCalledWith(
      'https://base.example.com/data/items/some-slug.json',
      { cache: 'force-cache' }
    )
  })

  it('returns the parsed body on 200', async () => {
    const body = { content: 'hello world', externalLinks: [{ url: 'https://x.com', title: 'X', order: 1 }] }
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(body),
        })
      )
    )

    const result = await getNewsBody('some-slug')

    expect(result).toEqual(body)
  })

  it('returns null and logs on 404', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 404,
          json: () => Promise.resolve({}),
        })
      )
    )

    const result = await getNewsBody('missing-slug')

    expect(result).toBeNull()
    expect(consoleErrorSpy).toHaveBeenCalled()
    consoleErrorSpy.mockRestore()
  })

  it('returns null and logs when the fetch rejects', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.reject(new Error('network down')))
    )

    const result = await getNewsBody('some-slug')

    expect(result).toBeNull()
    expect(consoleErrorSpy).toHaveBeenCalled()
    consoleErrorSpy.mockRestore()
  })

  it('returns null and logs on malformed JSON', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.reject(new Error('Unexpected token')),
        })
      )
    )

    const result = await getNewsBody('some-slug')

    expect(result).toBeNull()
    expect(consoleErrorSpy).toHaveBeenCalled()
    consoleErrorSpy.mockRestore()
  })

  it('encodes the slug into the asset path', async () => {
    const fetchMock = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ content: 'hello' }),
      })
    )
    vi.stubGlobal('fetch', fetchMock)

    await getNewsBody('slug with spaces/&stuff')

    expect(fetchMock).toHaveBeenCalledWith(
      `https://base.example.com/data/items/${encodeURIComponent('slug with spaces/&stuff')}.json`,
      { cache: 'force-cache' }
    )
  })
})
