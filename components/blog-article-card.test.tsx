import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BlogArticleCard } from './blog-article-card'
import { ItemType } from '@/lib/types'
import type { ContentItemMetadata } from '@/lib/articles'

vi.mock('next/image', () => ({
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}))

const article: ContentItemMetadata = {
  slug: 'pavilio-mission-control-ai-agents',
  title: 'Pavilio: My Mission Control for Parallel AI Coding Agents',
  excerpt: 'How I built an open-source dashboard to keep AI coding agents under control.',
  publishedAt: '2026-07-17',
  hashtags: ['ai-agents'],
  itemType: ItemType.Article,
  image: 'https://img.motyl.dev/blog/pavilio-mission-control-ai-agents.webp',
}

describe('BlogArticleCard', () => {
  it('links to the article page and shows title and excerpt', () => {
    render(<BlogArticleCard article={article} />)
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      '/articles/pavilio-mission-control-ai-agents'
    )
    expect(screen.getByText(article.title)).toBeInTheDocument()
    expect(screen.getByText(article.excerpt)).toBeInTheDocument()
  })

  it('labels the card as an Article with a formatted date', () => {
    render(<BlogArticleCard article={article} />)
    expect(screen.getByText(/^Article ·/)).toBeInTheDocument()
  })
})
