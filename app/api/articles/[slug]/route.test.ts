import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ItemType } from '@/lib/types'

vi.mock('@/lib/articles', () => ({
  getAllContentMetadata: vi.fn(async () => [
    { slug: 'my-article', title: 'My Article', itemType: ItemType.Article, hashtags: [], publishedAt: '2024-01-01', excerpt: '' },
    { slug: 'breaking-news', title: 'Breaking News', itemType: ItemType.News, hashtags: [], publishedAt: '2024-01-02', excerpt: '' },
  ]),
  getContentItemBySlug: vi.fn(async () => null),
}))

import { generateStaticParams } from './route'
import { getAllContentMetadata } from '@/lib/articles'

describe('generateStaticParams — excludes news slugs', () => {
  beforeEach(() => vi.clearAllMocks())

  it('includes article slugs', async () => {
    const params = await generateStaticParams()
    expect(params.map((p) => p.slug)).toContain('my-article')
  })

  it('excludes news slugs', async () => {
    const params = await generateStaticParams()
    expect(params.map((p) => p.slug)).not.toContain('breaking-news')
  })

  it('returns only non-news items', async () => {
    const params = await generateStaticParams()
    expect(params).toHaveLength(1)
    expect(params[0].slug).toBe('my-article')
  })
})
