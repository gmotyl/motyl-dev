import { describe, it, expect, vi } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { runInNewContext } from 'node:vm'

// Routing tests for the fetch handler in public/sw.js. The worker script is
// evaluated in a sandbox with a fake `self` so we can capture the registered
// 'fetch' listener and observe whether it calls event.respondWith().

const swSource = readFileSync(join(__dirname, '..', 'public', 'sw.js'), 'utf8')

const ORIGIN = 'https://motyl.dev'

type FetchListener = (event: unknown) => void

function loadFetchListener(): FetchListener {
  const listeners: Record<string, FetchListener> = {}
  const fakeSelf = {
    location: new URL(`${ORIGIN}/sw.js`),
    addEventListener: (type: string, fn: FetchListener) => {
      listeners[type] = fn
    },
    skipWaiting: vi.fn(),
    clients: { claim: vi.fn() },
  }
  const pendingFetch = () => new Promise<never>(() => {})
  runInNewContext(swSource, {
    self: fakeSelf,
    URL,
    console: { log() {}, warn() {}, error() {} },
    caches: {
      open: () => Promise.resolve({ match: pendingFetch, put() {}, keys: () => Promise.resolve([]) }),
      match: pendingFetch,
      keys: () => Promise.resolve([]),
    },
    fetch: pendingFetch,
  })
  if (!listeners.fetch) throw new Error('sw.js registered no fetch listener')
  return listeners.fetch
}

function dispatch(url: string, destination = '', mode = 'cors') {
  const respondWith = vi.fn()
  loadFetchListener()({ request: { url, method: 'GET', destination, mode }, respondWith })
  return respondWith
}

describe('public/sw.js fetch routing', () => {
  it('a cross-origin relay request is not intercepted by the service worker', () => {
    // Chromium's Local Network Access check blocks private-network (tailnet)
    // fetches issued from a SW → net::ERR_FAILED. The page must fetch directly.
    expect(dispatch('https://spock-wsl.tail469d05.ts.net:8443/health')).not.toHaveBeenCalled()
    expect(dispatch('https://spock-wsl.tail469d05.ts.net:8443/voices')).not.toHaveBeenCalled()
  })

  it('cross-origin images are still served cache-first', () => {
    expect(
      dispatch('https://pub-0123456789abcdef.r2.dev/articles/cover.webp', 'image'),
    ).toHaveBeenCalledTimes(1)
  })

  it('same-origin /api/ requests are still handled (network-first)', () => {
    expect(dispatch(`${ORIGIN}/api/articles`)).toHaveBeenCalledTimes(1)
  })
})
