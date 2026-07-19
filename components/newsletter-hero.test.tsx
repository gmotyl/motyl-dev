import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NewsletterHero } from './newsletter-hero'
import type { NewsletterMeta } from '@/lib/newsletter-issues'

vi.mock('next/image', () => ({
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}))

const issue: NewsletterMeta = {
  issueNumber: 20,
  week: '2026-W28',
  weekLabel: 'Week 28 (Jul 6 – Jul 12, 2026)',
  publishedAt: '2026-07-19',
  image: 'https://img.motyl.dev/blog/motyl-dev-20.webp',
}

describe('NewsletterHero', () => {
  it('links to the featured issue and shows title, number and week label', () => {
    render(<NewsletterHero issue={issue} />)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/newsletter/20')
    expect(screen.getByText('motyl.dev Weekly #20')).toBeInTheDocument()
    expect(screen.getByText(/Week 28/)).toBeInTheDocument()
  })

  it('uses the default "Latest issue" eyebrow and allows an override', () => {
    const { rerender } = render(<NewsletterHero issue={issue} />)
    expect(screen.getByText('Latest issue')).toBeInTheDocument()

    rerender(<NewsletterHero issue={issue} eyebrow="Featured" />)
    expect(screen.getByText('Featured')).toBeInTheDocument()
  })
})
