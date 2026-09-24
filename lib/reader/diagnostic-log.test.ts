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
const disable = () => window.localStorage.removeItem(READER_LOG_FLAG)

const originalTz = process.env.TZ

beforeEach(() => {
  // The formatter emits LOCAL wall-clock time, so the suite pins a zone rather
  // than inheriting the machine's (CI is UTC, this laptop is CEST). Node re-reads
  // process.env.TZ on assignment, so this takes effect for subsequent Dates.
  process.env.TZ = 'Europe/Warsaw'
  window.localStorage.clear()
  clearReaderLog()
})

afterEach(() => {
  if (originalTz === undefined) delete process.env.TZ
  else process.env.TZ = originalTz
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  vi.useRealTimers()
})

describe('logReaderEvent', () => {
  it('records nothing and allocates nothing while the flag is unset', () => {
    // Date.now() is the first thing an entry needs, so an unreached spy means
    // the guard returned before any entry was built.
    //
    // BLIND SPOT: this proves only that Date.now() was not reached. A refactor
    // that builds part of an entry BEFORE the guard — or timestamps it from
    // something other than Date.now() (performance.now(), a passed-in `t`) —
    // would allocate and still pass this. If the timestamp source changes, this
    // assertion stops protecting anything; re-point it at the new source.
    const now = vi.spyOn(Date, 'now')

    logReaderEvent('unit-start', '0')

    expect(now).not.toHaveBeenCalled()
    expect(readReaderLog()).toHaveLength(0)
  })

  it('reflects a flag change made after the first read', () => {
    // No cached flag read: the instrument must be switchable mid-session, which
    // is what `?readerlog=1` / `?readerlog=0` do without a reload.
    logReaderEvent('unit-start', 'while-disabled')
    expect(readReaderLog()).toHaveLength(0)

    enable()
    logReaderEvent('play-called', 'after-enable')

    const afterEnable = readReaderLog()
    expect(afterEnable).toHaveLength(1)
    expect(afterEnable[0].detail).toBe('after-enable')

    disable()
    logReaderEvent('unit-ended', 'after-disable')

    expect(readReaderLog()).toHaveLength(1)
    expect(readReaderLog()[0].detail).toBe('after-enable')
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

  it('keeps the write-time since of an entry whose predecessor was evicted', () => {
    // The design constraint: `since` is computed at WRITE time, so a gap
    // survives eviction of the entry it was measured against. A read-time
    // implementation (deriving deltas from neighbours in the snapshot) would
    // hand the first SURVIVING entry a `since` of 0, because the entry it was
    // measured against is no longer in the buffer.
    enable()
    vi.useFakeTimers()
    const base = Date.parse('2026-09-24T08:00:00.000Z')

    for (let i = 0; i < READER_LOG_CAPACITY + 1; i += 1) {
      vi.setSystemTime(new Date(base + i * 100))
      logReaderEvent('unit-start', String(i))
    }

    const entries = readReaderLog()
    expect(entries).toHaveLength(READER_LOG_CAPACITY)
    // Entry 0 was evicted; entry 1 survives and must still carry the 100ms gap
    // it measured against the entry that is now gone.
    expect(entries[0].detail).toBe('1')
    expect(entries[0].since).toBe(100)
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

    // Exact lines, not `toContain`: the format IS the contract — this text is
    // what gets pasted out of a phone into a bug report. 08:00 UTC is 10:00 in
    // Europe/Warsaw (CEST, +02:00), which the suite pins in beforeEach.
    expect(lines).toHaveLength(2)
    expect(lines[0]).toBe('10:00:00.000+02:00 +0ms unit-start 7')
    expect(lines[1]).toBe('10:00:00.500+02:00 +500ms play-rejected [suppressed] NotAllowedError')
  })

  it('emits the winter offset when the event falls outside DST', () => {
    // The offset is per-entry, not a constant: the same machine logs +01:00 in
    // January. A reader comparing the log against their wall clock depends on it.
    enable()
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-15T08:00:00.000Z'))
    logReaderEvent('freeze')

    expect(formatReaderLog(readReaderLog())).toBe('09:00:00.000+01:00 +0ms freeze')
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
    // jsdom gotcha (vitest 4.0.18 / jsdom 27 in this repo): a spy on the
    // localStorage INSTANCE is inert — jsdom's Storage is a Proxy, so
    // `vi.spyOn(window.localStorage, 'getItem')` stores an ITEM under the key
    // "getItem" instead of replacing the method, and the throwing path is never
    // exercised. A spy on Storage.prototype DOES work here. Prefer the form
    // below anyway: replacing the whole global is explicit about what the code
    // under test sees and does not depend on that Proxy detail. The call
    // assertion is what proves the throw was reached — without it this test
    // would pass vacuously.
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

  it('reports disabled and does not throw during SSR', () => {
    vi.stubGlobal('window', undefined)

    expect(isReaderLogEnabled()).toBe(false)
    expect(() => logReaderEvent('unit-start', '0')).not.toThrow()
  })
})
