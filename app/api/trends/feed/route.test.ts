import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ItemType } from '@/lib/types'

vi.mock('@/lib/trends', () => ({
  getHomepageFeed: vi.fn(async () => ({
    trendings: [],
    lastWeekSummary: null,
  })),
}))

vi.mock('@/lib/articles', () => ({
  getAllContentMetadata: vi.fn(async () => [
    { slug: 'article-1', title: 'Article 1', itemType: ItemType.Article, hashtags: [], publishedAt: '2024-01-03', excerpt: '' },
    { slug: 'news-1', title: 'News 1', itemType: ItemType.News, hashtags: [], publishedAt: '2024-01-04', excerpt: '' },
    { slug: 'article-2', title: 'Article 2', itemType: ItemType.Article, hashtags: [], publishedAt: '2024-01-02', excerpt: '' },
    { slug: 'news-2', title: 'News 2', itemType: ItemType.News, hashtags: [], publishedAt: '2024-01-01', excerpt: '' },
    { slug: 'article-3', title: 'Article 3', itemType: ItemType.Article, hashtags: [], publishedAt: '2024-01-05', excerpt: '' },
    { slug: 'article-4', title: 'Article 4', itemType: ItemType.Article, hashtags: [], publishedAt: '2024-01-06', excerpt: '' },
  ]),
}))

import { GET } from './route'

describe('GET /api/trends/feed — news excluded from articles list', () => {
  beforeEach(() => vi.clearAllMocks())

  it('returns 200', async () => {
    const res = await GET()
    expect(res.status).toBe(200)
  })

  it('articles list contains no news items', async () => {
    const res = await GET()
    const body = await res.json()
    const newsItems = body.articles.filter((a: { itemType: string }) => a.itemType === ItemType.News)
    expect(newsItems).toHaveLength(0)
  })

  it('articles list contains at most 5 items', async () => {
    const res = await GET()
    const body = await res.json()
    expect(body.articles.length).toBeLessThanOrEqual(5)
  })

  it('articles list contains only article-type items', async () => {
    const res = await GET()
    const body = await res.json()
    body.articles.forEach((a: { itemType: string }) => {
      expect(a.itemType).toBe(ItemType.Article)
    })
  })
})
