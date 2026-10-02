import { describe, it, expect } from 'vitest'
import { isoWeekKey, msUntilNextIsoWeek } from './iso-week'

describe('isoWeekKey', () => {
  it.each([
    [new Date(2026, 0, 1), '2026-w01'], // Thursday: week 1 of its own year
    [new Date(2027, 0, 1), '2026-w53'], // Friday: still the last week of 2026
    [new Date(2025, 11, 29), '2026-w01'], // Monday: first week of the next ISO year
    [new Date(2026, 6, 1, 12), '2026-w27'], // summer: DST must not drop a week
    [new Date(2026, 9, 4, 23, 59), '2026-w40'], // Sunday closes the week
    [new Date(2026, 9, 5, 0, 0), '2026-w41'], // Monday opens the next one
  ])('%s -> %s', (date, key) => {
    expect(isoWeekKey(date)).toBe(key)
  })
})

describe('msUntilNextIsoWeek', () => {
  it('counts to the next local Monday midnight', () => {
    const sunday = new Date(2026, 9, 4, 23, 0)
    expect(new Date(sunday.getTime() + msUntilNextIsoWeek(sunday))).toEqual(new Date(2026, 9, 5))
  })

  it('counts a full week from Monday midnight', () => {
    const monday = new Date(2026, 9, 5)
    expect(new Date(monday.getTime() + msUntilNextIsoWeek(monday))).toEqual(new Date(2026, 9, 12))
  })
})
