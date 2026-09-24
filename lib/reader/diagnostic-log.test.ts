import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  READER_LOG_CAPACITY,
  READER_LOG_FLAG,
  clearReaderLog,
  formatReaderLog,
  isReaderLogEnabled,
  logReaderEvent,
  readReaderLog,
} from '@/lib/reader/diagnostic-log'

const enable = () => window.localStorage.setItem(READER_LOG_FLAG, '1')

beforeEach(() => {
  window.localStorage.clear()
  // clearReaderLog also drops the cached flag read, so each test starts from a
  // clean buffer AND a cold flag.
  clearReaderLog()
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  vi.useRealTimers()
})

describe('logReaderEvent', () => {
  it('records nothing and allocates nothing while the flag is unset', () => {
    // Date.now() is the first thing an entry needs; if it is never reached, no
    // entry object was constructed.
    const now = vi.spyOn(Date, 'now')

    logReaderEvent('unit-start', '0')

    expect(now).not.toHaveBeenCalled()
    expect(readReaderLog()).toHaveLength(0)
  })

  it('records an entry with the current time once the flag is set', () => {
    enable()
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-09-24T08:00:00.000Z'))

    logReaderEvent('play-called', '3')

    const entries = readReaderLog()
    expect(entries).toHaveLength(1)
    expect(entries[0]).toMatchObject({
      t: Date.parse('2026-09-24T08:00:00.000Z'),
      type: 'play-called',
      detail: '3',
    })
  })

  it('computes since as the delta from the previous entry', () => {
    enable()
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-09-24T08:00:00.000Z'))
    logReaderEvent('unit-start', '0')

    vi.setSystemTime(new Date('2026-09-24T08:00:00.500Z'))
    logReaderEvent('play-called', '0')

    expect(readReaderLog()[1].since).toBe(500)
  })

  it('gives the first entry of a session a since of 0', () => {
    enable()
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-09-24T08:00:00.000Z'))

    logReaderEvent('freeze')

    expect(readReaderLog()[0].since).toBe(0)
  })

  it('evicts the oldest entry past capacity', () => {
    enable()

    for (let i = 0; i < READER_LOG_CAPACITY + 1; i += 1) {
      logReaderEvent('unit-start', String(i))
    }

    const entries = readReaderLog()
    expect(entries).toHaveLength(READER_LOG_CAPACITY)
    // entry 0 is gone; the window now opens at 1 and ends at CAPACITY.
    expect(entries[0].detail).toBe('1')
    expect(entries[entries.length - 1].detail).toBe(String(READER_LOG_CAPACITY))
  })

  it('marks an entry suppressed when told to', () => {
    enable()

    logReaderEvent('element-error', 'MEDIA_ERR_DECODE', { suppressed: true })
    logReaderEvent('unit-ended', '1', { suppressed: false })

    const entries = readReaderLog()
    expect(entries[0].suppressed).toBe(true)
    expect(entries[1].suppressed).toBeUndefined()
  })
})

describe('formatReaderLog', () => {
  it('formats a line carrying time, delta, type, suppression and detail', () => {
    enable()
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-09-24T08:00:00.000Z'))
    logReaderEvent('unit-start', '7')
    vi.setSystemTime(new Date('2026-09-24T08:00:00.500Z'))
    logReaderEvent('play-rejected', 'NotAllowedError', { suppressed: true })

    const lines = formatReaderLog(readReaderLog()).split('\n')

    expect(lines).toHaveLength(2)
    expect(lines[0]).toContain('08:00:00.000')
    expect(lines[0]).toContain('+0')
    expect(lines[0]).toContain('unit-start')
    expect(lines[0]).toContain('7')
    expect(lines[0]).not.toContain('suppressed')

    expect(lines[1]).toContain('08:00:00.500')
    expect(lines[1]).toContain('+500')
    expect(lines[1]).toContain('play-rejected')
    expect(lines[1]).toContain('suppressed')
    expect(lines[1]).toContain('NotAllowedError')
  })
})

describe('clearReaderLog', () => {
  it('resets the since baseline after clearReaderLog', () => {
    enable()
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-09-24T08:00:00.000Z'))
    logReaderEvent('unit-start', '0')

    clearReaderLog()
    expect(readReaderLog()).toHaveLength(0)

    vi.setSystemTime(new Date('2026-09-24T08:00:10.000Z'))
    logReaderEvent('unit-start', '1')

    expect(readReaderLog()[0].since).toBe(0)
  })
})

describe('isReaderLogEnabled', () => {
  it('reports disabled when localStorage access throws', () => {
    // jsdom gotcha: a spy is inert on Storage.prototype AND on the localStorage
    // instance — jsdom's Storage is a Proxy, so `vi.spyOn(window.localStorage,
    // 'getItem')` writes a stored ITEM instead of replacing the method and the
    // throwing path is never exercised. Replacing the whole global does work.
    // The call assertion below is what proves that: without it this test passes
    // vacuously.
    const getItem = vi.fn(() => {
      throw new Error('denied')
    })
    vi.stubGlobal('localStorage', {
      getItem,
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    })

    expect(isReaderLogEnabled()).toBe(false)
    expect(getItem).toHaveBeenCalledWith(READER_LOG_FLAG)
  })
})
