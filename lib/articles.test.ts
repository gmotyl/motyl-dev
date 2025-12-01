import { describe, it, expect } from 'vitest'

// Extract the sorting logic to test it in isolation
function sortArticlesByDate<T extends { publishedAt?: string }>(articles: T[]): T[] {
  return articles.sort((a, b) => {
    const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
    const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
    return dateB - dateA
  })
}

describe('Article sorting', () => {
  it('should sort articles by publishedAt date in descending order', () => {
    const articles = [
      { slug: 'old', publishedAt: '2024-01-01' },
      { slug: 'newest', publishedAt: '2025-11-30' },
      { slug: 'middle', publishedAt: '2025-06-15' },
    ]

    const sorted = sortArticlesByDate(articles)

    expect(sorted[0].slug).toBe('newest')
    expect(sorted[1].slug).toBe('middle')
    expect(sorted[2].slug).toBe('old')
  })

  it('should handle articles with missing publishedAt by placing them at the end', () => {
    const articles = [
      { slug: 'no-date' }, // Missing publishedAt
      { slug: 'newest', publishedAt: '2025-11-30' },
      { slug: 'old', publishedAt: '2024-01-01' },
    ]

    const sorted = sortArticlesByDate(articles)

    expect(sorted[0].slug).toBe('newest')
    expect(sorted[1].slug).toBe('old')
    expect(sorted[2].slug).toBe('no-date') // Should be at the end
  })

  it('should handle articles with undefined publishedAt by placing them at the end', () => {
    const articles = [
      { slug: 'undefined-date', publishedAt: undefined },
      { slug: 'newest', publishedAt: '2025-11-30' },
      { slug: 'old', publishedAt: '2024-01-01' },
    ]

    const sorted = sortArticlesByDate(articles)

    expect(sorted[0].slug).toBe('newest')
    expect(sorted[1].slug).toBe('old')
    expect(sorted[2].slug).toBe('undefined-date') // Should be at the end
  })

  it('should not corrupt sort order when one article has missing date (the original bug)', () => {
    // This test recreates the original bug scenario:
    // Articles with valid dates should remain sorted correctly
    // even when there's an article with missing publishedAt in the mix
    const articles = [
      { slug: 'multimodal', publishedAt: '2025-11-30' },
      { slug: 'bubble', publishedAt: '2025-11-29' },
      { slug: 'automation', publishedAt: '2025-11-27' },
      { slug: 'broken-frontmatter' }, // This was the problematic article
      { slug: 'tanstack', publishedAt: '2025-11-30' },
      { slug: 'negative', publishedAt: '2025-11-30' },
    ]

    const sorted = sortArticlesByDate(articles)

    // All articles with 2025-11-30 should be at the top (order among same dates is stable)
    const nov30Articles = sorted.filter(a => a.publishedAt === '2025-11-30')
    const nov29Articles = sorted.filter(a => a.publishedAt === '2025-11-29')
    const nov27Articles = sorted.filter(a => a.publishedAt === '2025-11-27')
    const noDateArticles = sorted.filter(a => !a.publishedAt)

    expect(nov30Articles.length).toBe(3)
    expect(nov29Articles.length).toBe(1)
    expect(nov27Articles.length).toBe(1)
    expect(noDateArticles.length).toBe(1)

    // Check that articles are in correct date order (Nov 30 > Nov 29 > Nov 27 > no date)
    const nov30Index = sorted.findIndex(a => a.publishedAt === '2025-11-30')
    const nov29Index = sorted.findIndex(a => a.publishedAt === '2025-11-29')
    const nov27Index = sorted.findIndex(a => a.publishedAt === '2025-11-27')
    const noDateIndex = sorted.findIndex(a => !a.publishedAt)

    expect(nov30Index).toBeLessThan(nov29Index)
    expect(nov29Index).toBeLessThan(nov27Index)
    expect(nov27Index).toBeLessThan(noDateIndex)
  })

  it('should handle multiple articles with missing dates', () => {
    const articles = [
      { slug: 'no-date-1' },
      { slug: 'valid', publishedAt: '2025-11-30' },
      { slug: 'no-date-2' },
    ]

    const sorted = sortArticlesByDate(articles)

    expect(sorted[0].slug).toBe('valid')
    // Both no-date articles should be after the valid one
    expect(sorted.slice(1).map(a => a.slug)).toContain('no-date-1')
    expect(sorted.slice(1).map(a => a.slug)).toContain('no-date-2')
  })

  it('should handle empty array', () => {
    const sorted = sortArticlesByDate([])
    expect(sorted).toEqual([])
  })

  it('should handle array with single article', () => {
    const articles = [{ slug: 'single', publishedAt: '2025-11-30' }]
    const sorted = sortArticlesByDate(articles)
    expect(sorted[0].slug).toBe('single')
  })
})
