import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('@/lib/auth/require-super-admin', () => ({ requireSuperAdmin: vi.fn(async () => undefined) }))
vi.mock('@/lib/trends/trends', () => ({ getHomepageFeed: vi.fn(async () => ({ trendings: [], lastWeekSummary: null })) }))
vi.mock('@/components/trending-list', () => ({ TrendingList: () => <div data-testid="trending-list" /> }))

import TrendingPage, { dynamic } from './page'
import { requireSuperAdmin } from '@/lib/auth/require-super-admin'
import { getHomepageFeed } from '@/lib/trends/trends'

const item = {
  id: '1',
  title: 'Some trend',
  description: null,
  linkUrl: 'https://example.com',
  voteCount: 3,
  category: 'ai',
  sourceDomain: 'example.com',
}

describe('TrendingPage', () => {
  beforeEach(() => vi.clearAllMocks())

  it('is never statically cached', () => {
    expect(dynamic).toBe('force-dynamic')
  })

  it('guards with requireSuperAdmin before fetching the feed', async () => {
    vi.mocked(requireSuperAdmin).mockRejectedValueOnce(new Error('REDIRECT'))

    await expect(TrendingPage()).rejects.toThrow('REDIRECT')
    expect(requireSuperAdmin).toHaveBeenCalledWith('/trending')
    expect(getHomepageFeed).not.toHaveBeenCalled()
  })

  it('renders the trending list when the feed has items', async () => {
    vi.mocked(getHomepageFeed).mockResolvedValueOnce({ trendings: [item], lastWeekSummary: null } as never)

    render(await TrendingPage())

    expect(screen.getByTestId('trending-list')).toBeInTheDocument()
  })

  it('renders the empty state when the feed is empty', async () => {
    render(await TrendingPage())

    expect(screen.queryByTestId('trending-list')).not.toBeInTheDocument()
    expect(
      screen.getByText('No trending items yet this week. Vote on news articles to surface trends!')
    ).toBeInTheDocument()
  })
})
