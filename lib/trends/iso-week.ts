/**
 * ISO 8601 week key ("YYYY-wWW") for a date, in local time. Pure and free of
 * server imports so client code can share it with `getCurrentWeek()`.
 */
export function isoWeekKey(date: Date): string {
  // Thursday of the date's week (weeks start on Monday) decides the ISO year.
  const day = date.getDay()
  const thursday = new Date(date.getFullYear(), date.getMonth(), date.getDate() - day + (day === 0 ? -3 : 4))
  const year = thursday.getFullYear()

  // Jan 4 is always in week 1; find that week's Thursday.
  const jan4 = new Date(year, 0, 4)
  const jan4Day = jan4.getDay()
  const weekOneThursday = new Date(year, 0, 4 - jan4Day + (jan4Day === 0 ? -3 : 4))

  // Round, not floor: a DST shift between the two local midnights makes the
  // span an hour short or long of a whole number of weeks.
  const msPerWeek = 7 * 24 * 60 * 60 * 1000
  const weekNum = Math.round((thursday.getTime() - weekOneThursday.getTime()) / msPerWeek) + 1

  return `${year}-w${String(weekNum).padStart(2, '0')}`
}

/** Milliseconds from `date` until the next local Monday 00:00, when the ISO week changes. */
export function msUntilNextIsoWeek(date: Date): number {
  const daysAhead = (8 - date.getDay()) % 7 || 7
  const nextMonday = new Date(date.getFullYear(), date.getMonth(), date.getDate() + daysAhead)
  return nextMonday.getTime() - date.getTime()
}
