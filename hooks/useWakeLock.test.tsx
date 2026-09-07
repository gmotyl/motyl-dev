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
})
