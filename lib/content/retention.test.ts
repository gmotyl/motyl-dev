import { describe, expect, it } from 'vitest'
import { RETENTION_MONTHS, isRetained, retentionCutoff } from '@/lib/content/retention'

describe('retentionCutoff', () => {
  it('cutoff is exactly RETENTION_MONTHS before the given now', () => {
    const cutoff = retentionCutoff(new Date('2026-09-10'))
    expect(cutoff.toISOString().slice(0, 10)).toBe('2026-06-10')
    expect(RETENTION_MONTHS).toBe(3)
  })
})

describe('isRetained', () => {
  const cutoff = retentionCutoff(new Date('2026-09-10'))

  it('retains news published on the cutoff day', () => {
    const item = { publishedAt: '2026-06-10', itemType: 'news' as const }
    expect(isRetained(item, cutoff)).toBe(true)
  })

  it('drops news published before the cutoff', () => {
    const item = { publishedAt: '2026-06-09', itemType: 'news' as const }
    expect(isRetained(item, cutoff)).toBe(false)
  })

  it('retains blog articles regardless of publishedAt', () => {
    const item = { publishedAt: '2019-01-01', itemType: 'article' as const }
    expect(isRetained(item, cutoff)).toBe(true)
  })

  it('retains news with an unparseable publishedAt rather than dropping it', () => {
    const unparseable = { publishedAt: 'not-a-date', itemType: 'news' as const }
    const empty = { publishedAt: '', itemType: 'news' as const }
    expect(isRetained(unparseable, cutoff)).toBe(true)
    expect(isRetained(empty, cutoff)).toBe(true)
  })
})
