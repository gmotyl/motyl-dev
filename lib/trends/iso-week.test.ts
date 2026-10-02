import { describe, it, expect, afterEach, vi } from 'vitest'
import { isoWeekKey } from './iso-week'

describe('isoWeekKey', () => {
  it.each([
    [new Date(2026, 0, 1), '2026-w01'], // Thursday: week 1 of its own year
    [new Date(2027, 0, 1), '2026-w53'], // Friday: still the last week of 2026
    [new Date(2025, 11, 29), '2026-w01'], // Monday: first week of the next ISO year
    [new Date(2026, 9, 4, 23, 59), '2026-w40'], // Sunday closes the week
    [new Date(2026, 9, 5, 0, 0), '2026-w41'], // Monday opens the next one
  ])('%s -> %s', (date, key) => {
    expect(isoWeekKey(date)).toBe(key)
  })

  describe('in a DST time zone', () => {
    afterEach(() => {
      vi.unstubAllEnvs()
    })

    it('summer time does not drop a week', () => {
      // Pin a zone with DST so the Jan -> Jul span between local midnights is an
      // hour short of whole weeks; in UTC this case would prove nothing.
      vi.stubEnv('TZ', 'Europe/Warsaw')
      const date = new Date(2026, 6, 1, 12) // built after the stub: local to Warsaw
      expect(date.getTimezoneOffset()).toBe(-120) // guard: the zone really switched
      expect(isoWeekKey(date)).toBe('2026-w27')
    })
  })
})
