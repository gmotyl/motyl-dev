import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useWakeLock } from './useWakeLock'

type ReleaseListener = () => void

interface SentinelStub {
  released: boolean
  release: ReturnType<typeof vi.fn>
  addEventListener: (type: string, listener: ReleaseListener) => void
  /** Fire `release` the way the browser does when the page is hidden. */
  emitRelease: () => void
}

let wakeLockRequest: ReturnType<typeof vi.fn>
/** Every sentinel handed out by `navigator.wakeLock.request`, in order. */
let sentinels: SentinelStub[]

const makeSentinel = (): SentinelStub => {
  const listeners = new Set<ReleaseListener>()
  const sentinel: SentinelStub = {
    released: false,
    release: vi.fn(async () => {
      sentinel.released = true
      sentinel.emitRelease()
    }),
    addEventListener: (type: string, listener: ReleaseListener) => {
      if (type === 'release') listeners.add(listener)
    },
    emitRelease: () => {
      for (const listener of [...listeners]) listener()
    },
  }
  return sentinel
}

const installWakeLock = () => {
  sentinels = []
  wakeLockRequest = vi.fn(async (type: string) => {
    expect(type).toBe('screen')
    const sentinel = makeSentinel()
    sentinels.push(sentinel)
    return sentinel
  })

  Object.defineProperty(navigator, 'wakeLock', {
    value: { request: wakeLockRequest },
    configurable: true,
    writable: true,
  })
}

/** Resolvers for grants parked by `installDeferredWakeLock`, in request order. */
let parkedGrants: Array<() => void>

/**
 * Swap in a `request('screen')` that parks every grant until the test resolves
 * it. Concurrency defects only exist inside the window between the request and
 * its grant, so these tests have to hold that window open deliberately — the
 * default stub resolves too fast for anything to overlap.
 */
const installDeferredWakeLock = () => {
  sentinels = []
  parkedGrants = []
  wakeLockRequest = vi.fn((type: string) => {
    expect(type).toBe('screen')
    return new Promise<SentinelStub>((resolve) => {
      parkedGrants.push(() => {
        // Created on grant, so `sentinels` order matches resolution order.
        const sentinel = makeSentinel()
        sentinels.push(sentinel)
        resolve(sentinel)
      })
    })
  })

  Object.defineProperty(navigator, 'wakeLock', {
    value: { request: wakeLockRequest },
    configurable: true,
    writable: true,
  })
}

/** Hand out every parked sentinel and let the hook's continuations run. */
const settleGrants = async () => {
  await act(async () => {
    for (const grant of parkedGrants.splice(0)) grant()
  })
}

/** A sentinel nobody released still holds the screen on for the page's life. */
const leakedSentinels = () => sentinels.filter((sentinel) => !sentinel.released)

const removeWakeLock = () => {
  delete (navigator as unknown as Record<string, unknown>).wakeLock
}

/** jsdom's `visibilityState` is a prototype getter, so shadow it on the instance. */
const setVisibility = (state: 'visible' | 'hidden') => {
  Object.defineProperty(document, 'visibilityState', {
    value: state,
    configurable: true,
  })
}

/** The browser hides the page: it auto-releases the sentinel it granted. */
const hidePage = async () => {
  setVisibility('hidden')
  await act(async () => {
    sentinels.at(-1)?.emitRelease()
    document.dispatchEvent(new Event('visibilitychange'))
  })
}

const showPage = async () => {
  setVisibility('visible')
  await act(async () => {
    document.dispatchEvent(new Event('visibilitychange'))
  })
}

describe('useWakeLock', () => {
  beforeEach(() => {
    installWakeLock()
    setVisibility('visible')
  })

  afterEach(() => {
    removeWakeLock()
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('re-requests the lock when the page becomes visible again after a hide released it', async () => {
    const { result } = renderHook(() => useWakeLock())

    await act(async () => {
      await result.current.requestWakeLock()
    })
    expect(wakeLockRequest).toHaveBeenCalledTimes(1)
    expect(result.current.isActive).toBe(true)

    await hidePage()
    expect(result.current.isActive).toBe(false)

    await showPage()

    expect(wakeLockRequest).toHaveBeenCalledTimes(2)
    expect(result.current.isActive).toBe(true)
  })

  it('does not re-request after an explicit release', async () => {
    const { result } = renderHook(() => useWakeLock())

    await act(async () => {
      await result.current.requestWakeLock()
    })
    await act(async () => {
      await result.current.releaseWakeLock()
    })
    expect(sentinels[0].release).toHaveBeenCalledTimes(1)
    expect(result.current.isActive).toBe(false)

    await hidePage()
    await showPage()

    expect(wakeLockRequest).toHaveBeenCalledTimes(1)
    expect(result.current.isActive).toBe(false)
  })

  it('reports unsupported and stays silent when navigator.wakeLock is missing', async () => {
    removeWakeLock()
    const error = vi.spyOn(console, 'error').mockImplementation(() => {})
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const log = vi.spyOn(console, 'log').mockImplementation(() => {})

    const { result } = renderHook(() => useWakeLock())
    expect(result.current.isSupported).toBe(false)

    await act(async () => {
      await expect(result.current.requestWakeLock()).resolves.toBeUndefined()
      await expect(result.current.releaseWakeLock()).resolves.toBeUndefined()
    })

    expect(result.current.isActive).toBe(false)
    expect(error).not.toHaveBeenCalled()
    expect(warn).not.toHaveBeenCalled()
    expect(log).not.toHaveBeenCalled()
  })

  it('releases the sentinel and removes the visibility listener on unmount', async () => {
    const addListener = vi.spyOn(document, 'addEventListener')
    const removeListener = vi.spyOn(document, 'removeEventListener')

    const { result, unmount } = renderHook(() => useWakeLock())
    await act(async () => {
      await result.current.requestWakeLock()
    })
    expect(
      addListener.mock.calls.filter(([type]) => type === 'visibilitychange'),
    ).toHaveLength(1)

    await act(async () => {
      unmount()
    })

    expect(sentinels[0].release).toHaveBeenCalledTimes(1)
    expect(sentinels[0].released).toBe(true)
    expect(
      removeListener.mock.calls.filter(([type]) => type === 'visibilitychange'),
    ).toHaveLength(1)

    // A late visibility flip must not resurrect the lock after teardown.
    await showPage()
    expect(wakeLockRequest).toHaveBeenCalledTimes(1)
  })

  it('keeps requestWakeLock and releaseWakeLock identities stable across renders', async () => {
    const { result, rerender } = renderHook(() => useWakeLock())
    const firstRequest = result.current.requestWakeLock
    const firstRelease = result.current.releaseWakeLock

    rerender()
    // `isSupported` and `isActive` both flip after mount — neither may re-create
    // the callbacks, or the consumers' effects would loop on them.
    await act(async () => {
      await result.current.requestWakeLock()
    })
    rerender()

    expect(result.current.isSupported).toBe(true)
    expect(result.current.isActive).toBe(true)
    expect(result.current.requestWakeLock).toBe(firstRequest)
    expect(result.current.releaseWakeLock).toBe(firstRelease)
  })

  it('does not issue a second request while one is already in flight', async () => {
    installDeferredWakeLock()
    const { result, unmount } = renderHook(() => useWakeLock())

    let pending: Promise<void> | undefined
    await act(async () => {
      // `requestWakeLock` flips the intent flag synchronously, then parks on the
      // grant — so the hook is now "wants a lock, holds nothing".
      pending = result.current.requestWakeLock()
    })

    // A visibility flip landing in that window re-enters `acquire()`. The
    // settled-ref guard is still empty, so only an in-flight guard stops it.
    await showPage()
    expect(wakeLockRequest).toHaveBeenCalledTimes(1)

    await settleGrants()
    await act(async () => {
      await pending
    })

    expect(sentinels).toHaveLength(1)
    expect(result.current.isActive).toBe(true)

    await act(async () => {
      unmount()
    })
    expect(leakedSentinels()).toHaveLength(0)
  })

  it('does not issue a second request when the lock is already held', async () => {
    const { result } = renderHook(() => useWakeLock())

    await act(async () => {
      await result.current.requestWakeLock()
    })
    expect(wakeLockRequest).toHaveBeenCalledTimes(1)

    // Both re-entry paths — an explicit re-request and a visibility flip while
    // the page never actually hid — must no-op on the held sentinel.
    await act(async () => {
      await result.current.requestWakeLock()
    })
    await showPage()

    expect(wakeLockRequest).toHaveBeenCalledTimes(1)
    expect(sentinels).toHaveLength(1)
    expect(result.current.isActive).toBe(true)
  })

  it('releases a sentinel granted after intent was withdrawn', async () => {
    installDeferredWakeLock()
    const { result } = renderHook(() => useWakeLock())

    let pending: Promise<void> | undefined
    await act(async () => {
      pending = result.current.requestWakeLock()
    })

    // The reader pauses (or the user toggles off) while the grant is in flight.
    // `releaseWakeLock` has nothing to release yet, so the arriving sentinel is
    // the only thing that can still keep the screen lit.
    await act(async () => {
      await result.current.releaseWakeLock()
    })

    await settleGrants()
    await act(async () => {
      await pending
    })

    expect(sentinels).toHaveLength(1)
    expect(sentinels[0].release).toHaveBeenCalledTimes(1)
    expect(leakedSentinels()).toHaveLength(0)
    expect(result.current.isActive).toBe(false)
  })

  it('issues one request for two synchronous requestWakeLock calls', async () => {
    installDeferredWakeLock()
    const { result, unmount } = renderHook(() => useWakeLock())

    // What StrictMode's double-invoked effect does to the toggle in Next dev.
    let first: Promise<void> | undefined
    let second: Promise<void> | undefined
    await act(async () => {
      first = result.current.requestWakeLock()
      second = result.current.requestWakeLock()
    })
    expect(wakeLockRequest).toHaveBeenCalledTimes(1)

    await settleGrants()
    await act(async () => {
      await Promise.all([first, second])
    })

    expect(sentinels).toHaveLength(1)
    expect(result.current.isActive).toBe(true)

    await act(async () => {
      unmount()
    })
    expect(leakedSentinels()).toHaveLength(0)
  })
})
