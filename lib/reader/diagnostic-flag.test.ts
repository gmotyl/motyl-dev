import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { READER_LOG_FLAG } from '@/lib/reader/diagnostic-log'
import { applyReaderLogParam } from '@/lib/reader/diagnostic-flag'

/**
 * Replaces the whole `localStorage` global with plain mocks.
 *
 * jsdom gotcha (vitest 4.0.18 / jsdom 27 in this repo): a spy on the
 * localStorage INSTANCE is inert — jsdom's Storage is a Proxy, so
 * `vi.spyOn(window.localStorage, 'setItem')` stores an ITEM under the key
 * "setItem" while the real method still runs, and the spy records nothing.
 * Replacing the global is explicit about what the code under test sees.
 *
 * Every test using this MUST assert one of these mocks was actually called —
 * that assertion is the only thing separating a real test from a vacuous one.
 */
const stubStorage = (overrides: Partial<Record<'getItem' | 'setItem' | 'removeItem', unknown>>) => {
  const mocks = {
    getItem: vi.fn(() => null),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
    ...overrides,
  }
  vi.stubGlobal('localStorage', mocks)
  return mocks
}

beforeEach(() => {
  window.localStorage.clear()
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('applyReaderLogParam', () => {
  it('persists the flag for readerlog=1', () => {
    // Real storage: proves the flag genuinely survives the call, which is what
    // the device test depends on across reloads and PWA launches.
    expect(applyReaderLogParam('?readerlog=1')).toBe(true)

    expect(window.localStorage.getItem(READER_LOG_FLAG)).not.toBeNull()
  })

  it('clears the flag for readerlog=0', () => {
    window.localStorage.setItem(READER_LOG_FLAG, '1')

    expect(applyReaderLogParam('?readerlog=0')).toBe(false)

    expect(window.localStorage.getItem(READER_LOG_FLAG)).toBeNull()
  })

  it('leaves a stored flag untouched when the parameter is absent', () => {
    // Asserting the final VALUE cannot tell "left alone" from "rewritten with
    // the same value", so this asserts the writers were never reached at all.
    const { getItem, setItem, removeItem } = stubStorage({ getItem: vi.fn(() => '1') })

    expect(applyReaderLogParam('?page=2')).toBe(true)

    expect(getItem).toHaveBeenCalledWith(READER_LOG_FLAG)
    expect(setItem).not.toHaveBeenCalled()
    expect(removeItem).not.toHaveBeenCalled()
  })

  it('reports the already-stored state when the parameter is absent', () => {
    // A PWA launch from start_url: '/' carries no query string; the return
    // value must still reflect the persisted flag.
    expect(applyReaderLogParam('')).toBe(false)

    window.localStorage.setItem(READER_LOG_FLAG, '1')
    expect(applyReaderLogParam('')).toBe(true)
    expect(applyReaderLogParam('?utm_source=phone')).toBe(true)
  })

  it('ignores a readerlog value that is neither 1 nor 0', () => {
    const { getItem, setItem, removeItem } = stubStorage({ getItem: vi.fn(() => '1') })

    expect(applyReaderLogParam('?readerlog=yes')).toBe(true)
    expect(applyReaderLogParam('?readerlog=')).toBe(true)
    expect(applyReaderLogParam('?readerlog=2')).toBe(true)

    expect(getItem).toHaveBeenCalledWith(READER_LOG_FLAG)
    expect(setItem).not.toHaveBeenCalled()
    expect(removeItem).not.toHaveBeenCalled()
  })

  it('swallows a localStorage write failure', () => {
    // Private mode / storage denied: the switch must degrade to "off" rather
    // than throw out of whatever component applied the URL.
    const setItem = vi.fn(() => {
      throw new Error('denied')
    })
    stubStorage({ setItem })

    expect(applyReaderLogParam('?readerlog=1')).toBe(false)
    expect(setItem).toHaveBeenCalledWith(READER_LOG_FLAG, expect.anything())

    const removeItem = vi.fn(() => {
      throw new Error('denied')
    })
    stubStorage({ removeItem })

    expect(applyReaderLogParam('?readerlog=0')).toBe(false)
    expect(removeItem).toHaveBeenCalledWith(READER_LOG_FLAG)
  })

  it('reports disabled and does not throw during SSR', () => {
    vi.stubGlobal('window', undefined)

    expect(() => applyReaderLogParam('?readerlog=1')).not.toThrow()
    expect(applyReaderLogParam('?readerlog=1')).toBe(false)
  })
})
