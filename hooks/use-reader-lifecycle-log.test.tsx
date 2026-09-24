import { renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { READER_LOG_FLAG, clearReaderLog, readReaderLog } from '@/lib/reader/diagnostic-log'

import { useReaderLifecycleLog } from './use-reader-lifecycle-log'

const enable = () => window.localStorage.setItem(READER_LOG_FLAG, '1')

const recordedTypes = () => readReaderLog().map((entry) => entry.type)

/**
 * `document.visibilityState` is a prototype getter in jsdom, so it cannot be
 * assigned. Shadow it with an own accessor and drop that own property again in
 * `afterEach` to restore jsdom's behaviour.
 */
const setVisibility = (state: 'hidden' | 'visible') => {
  Object.defineProperty(document, 'visibilityState', {
    configurable: true,
    get: () => state,
  })
}

/** The four lifecycle events the hook is responsible for. */
const fireAllLifecycleEvents = () => {
  document.dispatchEvent(new Event('freeze'))
  document.dispatchEvent(new Event('resume'))
  setVisibility('hidden')
  document.dispatchEvent(new Event('visibilitychange'))
  window.dispatchEvent(new Event('pagehide'))
}

beforeEach(() => {
  window.localStorage.clear()
  // clearReaderLog also drops the store's cached flag read, so every test
  // starts from an empty buffer AND a cold flag.
  clearReaderLog()
})

afterEach(() => {
  delete (document as unknown as Record<string, unknown>).visibilityState
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('useReaderLifecycleLog', () => {
  it('records freeze and resume from the document', () => {
    enable()
    renderHook(() => useReaderLifecycleLog())

    // jsdom never synthesises these — the Page Lifecycle API is not implemented.
    document.dispatchEvent(new Event('freeze'))
    document.dispatchEvent(new Event('resume'))

    expect(recordedTypes()).toEqual(['freeze', 'resume'])
  })

  it('records hidden and visible from visibilitychange', () => {
    enable()
    renderHook(() => useReaderLifecycleLog())

    setVisibility('hidden')
    document.dispatchEvent(new Event('visibilitychange'))
    setVisibility('visible')
    document.dispatchEvent(new Event('visibilitychange'))

    expect(recordedTypes()).toEqual(['visibility-hidden', 'visibility-visible'])
  })

  it('records pagehide', () => {
    enable()
    renderHook(() => useReaderLifecycleLog())

    // pagehide is fired at the Window, never at the document.
    window.dispatchEvent(new Event('pagehide'))

    expect(recordedTypes()).toEqual(['pagehide'])
  })

  it('removes every listener on unmount', () => {
    enable()
    const documentAdd = vi.spyOn(document, 'addEventListener')
    const documentRemove = vi.spyOn(document, 'removeEventListener')
    const windowAdd = vi.spyOn(window, 'addEventListener')
    const windowRemove = vi.spyOn(window, 'removeEventListener')

    const { unmount } = renderHook(() => useReaderLifecycleLog())

    const lifecycleTypes = new Set(['freeze', 'resume', 'visibilitychange', 'pagehide'])
    const registrations = [...documentAdd.mock.calls, ...windowAdd.mock.calls].filter(([type]) =>
      lifecycleTypes.has(type as string),
    )
    // Guards the assertion below against passing vacuously.
    expect(registrations.length).toBeGreaterThan(0)

    unmount()

    // Mechanism: every registration was withdrawn with the same handler identity.
    const removals = [...documentRemove.mock.calls, ...windowRemove.mock.calls]
    for (const [type, handler] of registrations) {
      expect(
        removals.some(([removedType, removedHandler]) => removedType === type && removedHandler === handler),
      ).toBe(true)
    }

    // Behaviour: nothing reaches the log once the hook is gone.
    fireAllLifecycleEvents()
    expect(readReaderLog()).toHaveLength(0)
  })

  it('records nothing while the flag is unset', () => {
    const documentAdd = vi.spyOn(document, 'addEventListener')
    const windowAdd = vi.spyOn(window, 'addEventListener')

    renderHook(() => useReaderLifecycleLog())

    // The store is the single gate: the hook still attaches its listeners.
    const registeredTypes = [...documentAdd.mock.calls, ...windowAdd.mock.calls].map(([type]) => type)
    expect(registeredTypes).toEqual(
      expect.arrayContaining(['freeze', 'resume', 'visibilitychange', 'pagehide']),
    )

    fireAllLifecycleEvents()

    expect(readReaderLog()).toHaveLength(0)
  })
})
