import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { UseLinkVoteResult } from '@/lib/votes/use-link-vote'
import { ReaderVoteStrip } from './reader-vote-strip'

const useLinkVoteMock = vi.fn<(linkUrl: string, initialCount?: number) => UseLinkVoteResult>()

vi.mock('@/lib/votes/use-link-vote', () => ({
  useLinkVote: (linkUrl: string, initialCount?: number) => useLinkVoteMock(linkUrl, initialCount),
}))

const link = { url: 'https://example.com/post', title: 'Example post' }
const heading = 'Nowe funkcje w React 20'

function mockVoteState(overrides: Partial<UseLinkVoteResult> = {}) {
  const vote = vi.fn<UseLinkVoteResult['vote']>().mockResolvedValue(8)
  useLinkVoteMock.mockReturnValue({
    count: 7,
    voted: false,
    pending: false,
    superAdmin: false,
    vote,
    ...overrides,
  })
  return vote
}

describe('ReaderVoteStrip', () => {
  beforeEach(() => {
    useLinkVoteMock.mockReset()
  })

  it("shows the heading and the link's count", () => {
    mockVoteState()
    render(<ReaderVoteStrip heading={heading} link={link} category="frontend" />)

    expect(useLinkVoteMock).toHaveBeenCalledWith(link.url, undefined)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('w-full', 'min-h-[52px]')
    expect(button).toHaveAttribute('aria-pressed', 'false')
    expect(button.getAttribute('aria-label')).toContain(heading)
    expect(button.getAttribute('aria-label')).toContain('7')
    expect(screen.getByText(heading)).toHaveClass('truncate')
    expect(screen.getByText('7')).toBeInTheDocument()
    expect(button).toBeEnabled()
  })

  it("votes with the inline button's payload", async () => {
    const vote = mockVoteState()
    render(
      <ReaderVoteStrip heading={heading} link={link} category="frontend" patternName="weekly-digest" />
    )

    await userEvent.click(screen.getByRole('button'))

    expect(vote).toHaveBeenCalledTimes(1)
    expect(vote).toHaveBeenCalledWith({
      linkUrl: link.url,
      title: link.title,
      category: 'frontend',
      sourceDomain: link.url,
      patternName: 'weekly-digest',
    })
  })

  it('renders the voted state', async () => {
    const vote = mockVoteState({ voted: true, count: 8 })
    render(<ReaderVoteStrip heading={heading} link={link} />)

    const button = screen.getByRole('button')
    expect(useLinkVoteMock).toHaveBeenCalled()
    expect(button).toHaveAttribute('aria-pressed', 'true')
    expect(button).toHaveClass('bg-green-500/10', 'text-green-600')
    expect(button.querySelector('svg')).toHaveClass('fill-current')
    expect(button.getAttribute('aria-label')).toContain('8')

    await userEvent.click(button)
    expect(vote).not.toHaveBeenCalled()
  })

  it('is disabled while a vote is pending', () => {
    mockVoteState({ pending: true })
    render(<ReaderVoteStrip heading={heading} link={link} />)

    expect(useLinkVoteMock).toHaveBeenCalled()
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveClass('cursor-wait')
  })

  it('renders an inert strip without a link', () => {
    render(<ReaderVoteStrip heading={heading} link={null} />)

    expect(useLinkVoteMock).not.toHaveBeenCalled()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    const strip = screen.getByText('This section has no link to vote for')
    const container = strip.closest('[data-reader-vote-strip]')
    expect(container).toHaveClass('min-h-[52px]', 'border-dashed')
  })
})
