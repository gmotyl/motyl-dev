// Pure, no Next/node-only imports — importable from tsx by relative path (../lib/content/retention).

export const RETENTION_MONTHS = 3

/** Cutoff date for the rolling window. `now` is injectable so tests need no clock mocking. */
export function retentionCutoff(now: Date = new Date(), months: number = RETENTION_MONTHS): Date {
  const cutoff = new Date(now.getTime())
  cutoff.setUTCMonth(cutoff.getUTCMonth() - months)
  return cutoff
}

/** True when an item is retained: every article, and news at/after the cutoff. */
export function isRetained(
  item: { publishedAt: string; itemType: 'article' | 'news' },
  cutoff: Date
): boolean {
  if (item.itemType === 'article') return true

  const published = new Date(item.publishedAt)
  if (Number.isNaN(published.getTime())) return true

  return published.getTime() >= cutoff.getTime()
}
