import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ItemType } from '@/lib/content/types'

vi.mock('@/lib/content/articles', () => ({
  getAllContentMetadata: vi.fn(async () => []),
}))

vi.mock('@/lib/content/urls', () => ({
  getContentUrl: vi.fn((item: { slug: string; itemType: string }, absolute: boolean) => {
    const base = absolute ? 'https://motyl.dev' : ''
    const prefix = item.itemType === 'news' ? '/news' : '/articles'
    return `${base}${prefix}/${item.slug}`
  }),
}))

import sitemap from './sitemap'
import { getAllContentMetadata } from '@/lib/content/articles'

const mockNews = { slug: 'secret-news', itemType: ItemType.News, publishedAt: '2024-01-01', title: '', excerpt: '', hashtags: [], content: '' }
const mockArticle = { slug: 'public-article', itemType: ItemType.Article, publishedAt: '2024-01-01', title: '', excerpt: '', hashtags: [], content: '' }

describe('sitemap — news items excluded', () => {
  beforeEach(() => vi.clearAllMocks())

  it('includes article URLs but no news URLs', async () => {
    vi.mocked(getAllContentMetadata).mockResolvedValue([mockNews, mockArticle] as never)

    const result = await sitemap()
    const urls = result.map((e) => e.url)

    expect(urls.some((u) => u.includes('/articles/public-article'))).toBe(true)
    expect(urls.some((u) => u.includes('/news/'))).toBe(false)
  })

  it('does not contain a static /news entry', async () => {
    vi.mocked(getAllContentMetadata).mockResolvedValue([])

    const result = await sitemap()
    const urls = result.map((e) => e.url)

    expect(urls.some((u) => u.endsWith('/news'))).toBe(false)
  })
})
