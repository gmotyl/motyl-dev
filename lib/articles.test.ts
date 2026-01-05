import { afterAll, afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import fs from 'node:fs/promises'
import fsSync from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { parseArticleFile, getAllContentMetadata } from './articles'

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

describe('Article parsing', () => {
  const tmpDirs: string[] = []

  afterAll(async () => {
    await Promise.all(tmpDirs.map((dir) => fs.rm(dir, { recursive: true, force: true })))
  })

  async function createTempArticle({
    frontmatter,
    mtime,
    slug,
  }: {
    frontmatter: string
    mtime: Date
    slug: string
  }) {
    const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'articles-'))
    tmpDirs.push(dir)
    const filePath = path.join(dir, `${slug}.md`)
    await fs.writeFile(filePath, `---\n${frontmatter}\n---\n\nContent for ${slug}\n`)
    await fs.utimes(filePath, mtime, mtime)
    return filePath
  }

  it('normalizes missing publishedAt to file mtime (ISO date)', async () => {
    const fallbackDate = new Date('2025-01-02T12:00:00Z')
    const filePath = await createTempArticle({
      frontmatter: [
        'title: "No date article"',
        'excerpt: "Missing date"',
        'hashtags: "#demo"',
        'slug: "no-date-article"',
      ].join('\n'),
      mtime: fallbackDate,
      slug: 'no-date-article',
    })

    const article = await parseArticleFile(filePath, 'no-date-article')
    expect(article.publishedAt).toBe('2025-01-02')
  })

  it('normalizes invalid publishedAt string to file mtime', async () => {
    const fallbackDate = new Date('2024-12-24T08:00:00Z')
    const filePath = await createTempArticle({
      frontmatter: [
        'title: "Invalid date article"',
        'excerpt: "Invalid date"',
        'publishedAt: "not-a-date"',
        'hashtags: "#demo"',
        'slug: "invalid-date-article"',
      ].join('\n'),
      mtime: fallbackDate,
      slug: 'invalid-date-article',
    })

    const article = await parseArticleFile(filePath, 'invalid-date-article')
    expect(article.publishedAt).toBe('2024-12-24')
  })
});

describe('getAllContentMetadata date normalization (integration)', () => {
  const tmpDirs: string[] = []
  const originalCwd = process.cwd()

  beforeEach(() => {
    vi.resetModules()
  })

  afterEach(async () => {
    process.chdir(originalCwd)
    await Promise.all(tmpDirs.map((dir) => fs.rm(dir, { recursive: true, force: true })))
    tmpDirs.length = 0
  })

  async function setupTempRepo({
    frontmatter,
    mtime,
    filename,
  }: {
    frontmatter: string
    mtime: Date
    filename: string
  }) {
    const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'articles-repo-'))
    tmpDirs.push(dir)
    const articlesDir = path.join(dir, 'articles')
    await fs.mkdir(articlesDir, { recursive: true })
    await fs.mkdir(path.join(dir, 'news'), { recursive: true })
    const filePath = path.join(articlesDir, filename)
    await fs.writeFile(filePath, `---\n${frontmatter}\n---\n\nContent`)
    await fs.utimes(filePath, mtime, mtime)
    return dir
  }

  it('falls back to file mtime when publishedAt is missing', async () => {
    const mtime = new Date('2025-02-03T10:00:00Z')
    const dir = await setupTempRepo({
      frontmatter: [
        'title: "Missing date"',
        'excerpt: "No date field"',
        'hashtags: "#demo"',
        'slug: "missing-date"',
      ].join('\n'),
      mtime,
      filename: 'missing-date.md',
    })

    process.chdir(dir)
    const { getAllContentMetadata } = await import('./articles')
    const articles = await getAllContentMetadata()
    expect(articles[0]?.publishedAt).toBe('2025-02-03')
  })

  it('falls back to file mtime when publishedAt is invalid', async () => {
    const mtime = new Date('2024-11-11T05:00:00Z')
    const dir = await setupTempRepo({
      frontmatter: [
        'title: "Invalid date field"',
        'excerpt: "Bad date"',
        'publishedAt: "not-a-date"',
        'hashtags: "#demo"',
        'slug: "invalid-date"',
      ].join('\n'),
      mtime,
      filename: 'invalid-date.md',
    })

    process.chdir(dir)
    const { getAllContentMetadata } = await import('./articles')
    const articles = await getAllContentMetadata()
    expect(articles[0]?.publishedAt).toBe('2024-11-11')
  })
})

describe('getContentItemBySlug integration', () => {
  const tmpDirs: string[] = []
  const originalCwd = process.cwd()

  beforeEach(() => {
    vi.resetModules()
  })

  afterEach(async () => {
    process.chdir(originalCwd)
    await Promise.all(tmpDirs.map((dir) => fs.rm(dir, { recursive: true, force: true })))
    tmpDirs.length = 0
  })

  async function setupNewsRepo({
    frontmatter,
    mtime,
    filename,
    year = '2025',
  }: {
    frontmatter: string
    mtime: Date
    filename: string
    year?: string
  }) {
    const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'articles-news-'))
    tmpDirs.push(dir)
    const newsDir = path.join(dir, 'news', year)
    await fs.mkdir(newsDir, { recursive: true })
    await fs.mkdir(path.join(dir, 'articles'), { recursive: true })
    const filePath = path.join(newsDir, filename)
    await fs.writeFile(filePath, `---\n${frontmatter}\n---\n\nContent`)
    await fs.utimes(filePath, mtime, mtime)
    return dir
  }

  it('finds an article in a news year directory', async () => {
    const mtime = new Date('2025-03-04T09:00:00Z')
    const dir = await setupNewsRepo({
      frontmatter: [
        'title: "News article"',
        'excerpt: "From news folder"',
        'hashtags: "#generated #news"',
        'slug: "news-article"',
      ].join('\n'),
      mtime,
      filename: 'news-article.md',
    })

    process.chdir(dir)
    const { getContentItemBySlug } = await import('./articles')
    const article = await getContentItemBySlug('news-article')

    expect(article?.title).toBe('News article')
    expect(article?.publishedAt).toBe('2025-03-04')
    expect(article?.hashtags).toContain('generated')
    expect(article?.itemType).toBe('news')
  })

  it('returns null when the slug does not exist in any directory', async () => {
    const dir = await setupNewsRepo({
      frontmatter: [
        'title: "Existing news"',
        'excerpt: "Only article present"',
        'hashtags: "#generated"',
        'slug: "existing-news"',
      ].join('\n'),
      mtime: new Date('2025-01-01T00:00:00Z'),
      filename: 'existing-news.md',
    })

    process.chdir(dir)
    const { getContentItemBySlug } = await import('./articles')
    const article = await getContentItemBySlug('missing-slug')

    expect(article).toBeNull()
  })
})

describe('Article file count integrity', () => {
  function countMdFilesInDir(dir: string): number {
    if (!fsSync.existsSync(dir)) return 0
    return fsSync.readdirSync(dir).filter((f) => f.endsWith('.md')).length
  }

  function countMdFilesRecursive(baseDir: string): number {
    if (!fsSync.existsSync(baseDir)) return 0

    let count = countMdFilesInDir(baseDir)

    const entries = fsSync.readdirSync(baseDir, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.isDirectory() && /^\d{4}$/.test(entry.name)) {
        count += countMdFilesInDir(path.join(baseDir, entry.name))
      }
    }

    return count
  }

  it('should load ALL markdown files without silent failures', async () => {
    const projectRoot = process.cwd()
    const articlesDir = path.join(projectRoot, 'articles')
    const newsDir = path.join(projectRoot, 'news')

    const articlesOnDisk = countMdFilesInDir(articlesDir)
    const newsOnDisk = countMdFilesRecursive(newsDir)
    const totalOnDisk = articlesOnDisk + newsOnDisk

    const loadedArticles = await getAllContentMetadata()

    expect(loadedArticles.length).toBe(totalOnDisk)
  })

  it('should have no duplicate slugs across all content', async () => {
    const loadedArticles = await getAllContentMetadata()
    const slugs = loadedArticles.map((a) => a.slug)
    const uniqueSlugs = new Set(slugs)

    expect(slugs.length).toBe(uniqueSlugs.size)
  })
})
