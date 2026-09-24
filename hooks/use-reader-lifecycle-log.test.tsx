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
  window.dispatchEvent(new PageTransitionEvent('pagehide', { persisted: false }))
}

beforeEach(() => {
  // The buffer is module-level and survives between tests; the flag lives in
  // localStorage and is read per event, so clearing both is what gives each
  // test an empty log and a disabled instrument to start from.
  window.localStorage.clear()
  clearReaderLog()
})

afterEach(() => {
  delete (document as unknown as Record<string, unknown>).visibilityState
  vi.restoreAllMocks()
  // No vi.unstubAllGlobals() here: nothing in this file stubs a global, and it
  // would wipe vitest.setup.ts's ResizeObserver stub for every later test.
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

  it('records pagehide with the bfcache outcome', () => {
    enable()
    renderHook(() => useReaderLifecycleLog())

    // pagehide is fired at the Window, never at the document.
    // `persisted` separates "frozen into the bfcache" from a real unload, and
    // those two read very differently when the reader dies with the screen off.
    window.dispatchEvent(new PageTransitionEvent('pagehide', { persisted: true }))
    window.dispatchEvent(new PageTransitionEvent('pagehide', { persisted: false }))

    expect(readReaderLog().map((entry) => [entry.type, entry.detail])).toEqual([
      ['pagehide', 'persisted=true'],
      ['pagehide', 'persisted=false'],
    ])
  })

  it('attaches its listeners once, not per render', () => {
    // Without the effect's empty dependency array every render re-attaches, and
    // the churn lands in exactly the path whose timing is under investigation.
    const documentAdd = vi.spyOn(document, 'addEventListener')

    const { rerender } = renderHook(() => useReaderLifecycleLog())
    rerender()
    rerender()

    const freezeRegistrations = documentAdd.mock.calls.filter(([type]) => type === 'freeze')
    expect(freezeRegistrations).toHaveLength(1)
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
