import { describe, expect, it, vi, beforeEach } from 'vitest'
import { getAllContentMetadata, getContentItemBySlug, getAllHashtags } from './articles'
import { filterHiddenSections, type SectionType } from './section-filter'

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
    const nov30Articles = sorted.filter((a) => a.publishedAt === '2025-11-30')
    const nov29Articles = sorted.filter((a) => a.publishedAt === '2025-11-29')
    const nov27Articles = sorted.filter((a) => a.publishedAt === '2025-11-27')
    const noDateArticles = sorted.filter((a) => !a.publishedAt)

    expect(nov30Articles.length).toBe(3)
    expect(nov29Articles.length).toBe(1)
    expect(nov27Articles.length).toBe(1)
    expect(noDateArticles.length).toBe(1)

    // Check that articles are in correct date order (Nov 30 > Nov 29 > Nov 27 > no date)
    const nov30Index = sorted.findIndex((a) => a.publishedAt === '2025-11-30')
    const nov29Index = sorted.findIndex((a) => a.publishedAt === '2025-11-29')
    const nov27Index = sorted.findIndex((a) => a.publishedAt === '2025-11-27')
    const noDateIndex = sorted.findIndex((a) => !a.publishedAt)

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
    expect(sorted.slice(1).map((a) => a.slug)).toContain('no-date-1')
    expect(sorted.slice(1).map((a) => a.slug)).toContain('no-date-2')
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

describe('Content cache loading', () => {
  it('should load all content metadata from cache', async () => {
    const articles = await getAllContentMetadata()

    // Cache should have content
    expect(articles.length).toBeGreaterThan(0)

    // Each article should have required fields
    const first = articles[0]
    expect(first).toHaveProperty('slug')
    expect(first).toHaveProperty('title')
    expect(first).toHaveProperty('publishedAt')
    expect(first).toHaveProperty('hashtags')
    expect(first).toHaveProperty('itemType')
  }, 60000)

  it('should return articles sorted by publishedAt descending', async () => {
    const articles = await getAllContentMetadata()

    // Check that articles are sorted by date (newest first)
    for (let i = 0; i < articles.length - 1; i++) {
      const currentDate = new Date(articles[i].publishedAt).getTime()
      const nextDate = new Date(articles[i + 1].publishedAt).getTime()
      expect(currentDate).toBeGreaterThanOrEqual(nextDate)
    }
  })

  it('should have no duplicate slugs across all content', async () => {
    const articles = await getAllContentMetadata()
    const slugs = articles.map((a) => a.slug)
    const uniqueSlugs = new Set(slugs)

    // Find duplicates for better error reporting
    const slugCounts = slugs.reduce(
      (acc, slug) => {
        acc[slug] = (acc[slug] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )

    const duplicates = Object.entries(slugCounts)
      .filter(([, count]) => count > 1)
      .map(([slug]) => slug)

    if (duplicates.length > 0) {
      throw new Error(`Found duplicate slugs: ${duplicates.join(', ')}`)
    }

    expect(slugs.length).toBe(uniqueSlugs.size)
  })
})

describe('getContentItemBySlug', () => {
  it('should return an article by slug', async () => {
    const articles = await getAllContentMetadata()
    const firstSlug = articles[0].slug

    const article = await getContentItemBySlug(firstSlug)

    expect(article).not.toBeNull()
    expect(article?.slug).toBe(firstSlug)
    expect(article).toHaveProperty('content')
  })

  it('should return null for non-existent slug', async () => {
    const article = await getContentItemBySlug('definitely-does-not-exist-12345')
    expect(article).toBeNull()
  })
})

describe('getAllHashtags', () => {
  it('should return all unique hashtags', async () => {
    const hashtags = await getAllHashtags()

    expect(hashtags.length).toBeGreaterThan(0)
    // Check that hashtags are unique
    const uniqueHashtags = new Set(hashtags)
    expect(hashtags.length).toBe(uniqueHashtags.size)
  })

  it('should return hashtags sorted alphabetically (ASCII order)', async () => {
    const hashtags = await getAllHashtags()

    // The actual sort uses JavaScript's default sort() which is ASCII order
    // (uppercase letters before lowercase)
    const sorted = [...hashtags].sort()
    expect(hashtags).toEqual(sorted)
  })
})

describe('filterHiddenSections', () => {
  const sampleContent = `## Article Title

This is the TLDR content that should be hidden.

**Summary:** This is the summary content that should be hidden.

**Key takeaways:**
- First takeaway
- Second takeaway

**Tradeoffs:**
- First tradeoff
- Second tradeoff

More article content here.

---

## Another Section

More content after the sections.`

  it('should remove TLDR section when hidden (first paragraph after heading)', () => {
    const result = filterHiddenSections(sampleContent, new Set(['tldr']))
    expect(result).not.toContain('TLDR content')
    expect(result).toContain('**Summary:**')
    expect(result).toContain('**Key takeaways:**')
    expect(result).toContain('**Tradeoffs:**')
  })

  it('should remove TLDR with explicit prefix when hidden', () => {
    const contentWithPrefix = `## Article Title

**TLDR:** This is the TLDR with an explicit prefix.

**Summary:** Summary content here.`
    const result = filterHiddenSections(contentWithPrefix, new Set(['tldr']))
    expect(result).not.toContain('TLDR')
    expect(result).toContain('**Summary:**')
  })

  it('should remove Summary section when hidden', () => {
    const result = filterHiddenSections(sampleContent, new Set(['summary']))
    expect(result).not.toContain('**Summary:**')
    expect(result).toContain('TLDR content')
    expect(result).toContain('**Key takeaways:**')
    expect(result).toContain('**Tradeoffs:**')
  })

  it('should remove Key Takeaways section when hidden', () => {
    const result = filterHiddenSections(sampleContent, new Set(['keyTakeaways']))
    expect(result).not.toContain('**Key takeaways:**')
    expect(result).toContain('TLDR content')
    expect(result).toContain('**Summary:**')
    expect(result).toContain('**Tradeoffs:**')
  })

  it('should remove Tradeoffs section when hidden', () => {
    const result = filterHiddenSections(sampleContent, new Set(['tradeoffs']))
    expect(result).not.toContain('**Tradeoffs:**')
    expect(result).toContain('TLDR content')
    expect(result).toContain('**Summary:**')
    expect(result).toContain('**Key takeaways:**')
  })

  it('should remove Why Do I Care section when hidden (backward compat)', () => {
    const contentWithNewSection = `## Article Title

First paragraph TLDR.

**Summary:** Summary here.

**Why do I care:** This matters because of architecture decisions.

**Link:** [Title](url)`
    const result = filterHiddenSections(contentWithNewSection, new Set(['tradeoffs']))
    expect(result).not.toContain('**Why do I care:**')
    expect(result).toContain('**Summary:**')
  })

  it('should remove multiple sections when multiple are hidden', () => {
    const result = filterHiddenSections(sampleContent, new Set(['tldr', 'summary', 'tradeoffs']))
    expect(result).not.toContain('TLDR content')
    expect(result).not.toContain('**Summary:**')
    expect(result).not.toContain('**Tradeoffs:**')
    expect(result).toContain('**Key takeaways:**')
  })

  it('should keep all content when no sections are hidden', () => {
    const result = filterHiddenSections(sampleContent, new Set())
    expect(result).toContain('TLDR content')
    expect(result).toContain('**Summary:**')
    expect(result).toContain('**Key takeaways:**')
    expect(result).toContain('**Tradeoffs:**')
  })

  it('should handle content without any heading gracefully', () => {
    const contentWithoutHeading = `Just some regular content without special sections.`
    const result = filterHiddenSections(contentWithoutHeading, new Set(['tldr', 'summary']))
    expect(result).toContain('regular content')
  })

  it('should preserve content after removed sections', () => {
    const result = filterHiddenSections(sampleContent, new Set(['summary']))
    expect(result).toContain('More article content here.')
    expect(result).toContain('More content after the sections.')
  })
})
