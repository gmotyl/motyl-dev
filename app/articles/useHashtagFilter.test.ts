import { describe, expect, it } from 'vitest'
import { applyBaseFilters } from './useHashtagFilter'

const sampleArticles = [
  { slug: 'article-1', hashtags: ['react', 'generated'] },
  { slug: 'article-2', hashtags: ['react'] },
  { slug: 'article-3', hashtags: ['news', 'generated'] },
  { slug: 'article-4', hashtags: ['news'] },
]

describe('applyBaseFilters', () => {
  it('excludes articles with generated hashtag', () => {
    const filtered = applyBaseFilters(sampleArticles, {
      excludeHashtags: ['generated'],
      requireHashtags: [],
    })
    const slugs = filtered.map((a) => a.slug)
    expect(slugs).toEqual(['article-2', 'article-4'])
  })

  it('requires all specified hashtags', () => {
    const filtered = applyBaseFilters(sampleArticles, {
      excludeHashtags: [],
      requireHashtags: ['react'],
    })
    const slugs = filtered.map((a) => a.slug)
    expect(slugs).toEqual(['article-1', 'article-2'])
  })

  it('applies both exclude and require together', () => {
    const filtered = applyBaseFilters(sampleArticles, {
      excludeHashtags: ['generated'],
      requireHashtags: ['news'],
    })
    const slugs = filtered.map((a) => a.slug)
    expect(slugs).toEqual(['article-4'])
  })
})
