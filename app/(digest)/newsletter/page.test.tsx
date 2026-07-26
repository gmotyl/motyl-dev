import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('@/lib/newsletter-issues', () => ({
  getAllNewsletterMeta: vi.fn(async () => [
    { issueNumber: 21, title: 'Issue 21', slug: 'motyl-dev-21', date: '2026-07-19', image: 'https://img.motyl.dev/21.jpg', excerpt: 'x' },
    { issueNumber: 20, title: 'Issue 20', slug: 'motyl-dev-20', date: '2026-07-12', image: 'https://img.motyl.dev/20.jpg', excerpt: 'y' },
  ]),
}))
vi.mock('@/lib/trends', () => ({ getHomepageFeed: vi.fn(async () => ({ trendings: [], lastWeekSummary: null })) }))
vi.mock('@/components/newsletter-form', () => ({ default: () => <div /> }))
vi.mock('@/components/newsletter-hero', () => ({ NewsletterHero: () => <div data-testid="hero" /> }))
vi.mock('@/components/newsletter-issue-card', () => ({ NewsletterIssueCard: () => <div data-testid="issue-card" /> }))

import NewsletterArchive from './page'
import { getHomepageFeed } from '@/lib/trends'

describe('NewsletterArchive — no trending data on the cached page', () => {
  beforeEach(() => vi.clearAllMocks())

  it('never fetches the trends feed', async () => {
    const ui = await NewsletterArchive({ searchParams: Promise.resolve({}) })
    render(ui)

    expect(getHomepageFeed).not.toHaveBeenCalled()
  })

  it('renders the archive without any tab UI', async () => {
    const ui = await NewsletterArchive({ searchParams: Promise.resolve({}) })
    render(ui)

    expect(screen.getByRole('heading', { name: 'Newsletter', level: 1 })).toBeInTheDocument()
    expect(screen.getByTestId('hero')).toBeInTheDocument()
    expect(screen.queryByRole('tablist')).not.toBeInTheDocument()
    expect(screen.queryByRole('tab')).not.toBeInTheDocument()
  })
})
