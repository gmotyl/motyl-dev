import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NewsletterTabs } from './newsletter-tabs'

const mockUseSession = vi.fn()
vi.mock('next-auth/react', () => ({
  useSession: () => mockUseSession(),
}))
vi.mock('@/components/trending-list', () => ({
  TrendingList: () => <div>trending-list</div>,
}))

const trendingItems = [
  {
    id: '1',
    title: 'Some trend',
    description: null,
    linkUrl: 'https://example.com',
    voteCount: 3,
    category: 'ai',
    sourceDomain: 'example.com',
  },
]

describe('NewsletterTabs — Trending is SuperAdmin-only', () => {
  it('hides the Trending tab for anonymous visitors and shows only the archive', () => {
    mockUseSession.mockReturnValue({ data: null })
    render(<NewsletterTabs archiveContent={<div>archive</div>} trendingItems={trendingItems} />)

    expect(screen.getByText('archive')).toBeInTheDocument()
    expect(screen.queryByRole('tab', { name: 'Trending' })).not.toBeInTheDocument()
  })

  it('hides the Trending tab for signed-in non-admins', () => {
    mockUseSession.mockReturnValue({ data: { user: { isSuperAdmin: false } } })
    render(<NewsletterTabs archiveContent={<div>archive</div>} trendingItems={trendingItems} />)

    expect(screen.queryByRole('tab', { name: 'Trending' })).not.toBeInTheDocument()
  })

  it('shows the Trending tab for SuperAdmins', () => {
    mockUseSession.mockReturnValue({ data: { user: { isSuperAdmin: true } } })
    render(<NewsletterTabs archiveContent={<div>archive</div>} trendingItems={trendingItems} />)

    expect(screen.getByRole('tab', { name: 'Trending' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Newsletter' })).toBeInTheDocument()
  })
})
