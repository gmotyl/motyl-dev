import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NewsletterIssueCard } from './newsletter-issue-card'
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

describe('NewsletterIssueCard', () => {
  it('links to the issue and shows the mono issue number, title and week label', () => {
    render(<NewsletterIssueCard issue={issue} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/newsletter/20')
    expect(screen.getByText('№20')).toBeInTheDocument()
    expect(screen.getByText('Weekly #20')).toBeInTheDocument()
    expect(screen.getByText(issue.weekLabel)).toBeInTheDocument()
  })

  it('renders the issue art with a descriptive alt', () => {
    render(<NewsletterIssueCard issue={issue} />)
    expect(screen.getByAltText('motyl.dev Weekly #20')).toBeInTheDocument()
  })
})
