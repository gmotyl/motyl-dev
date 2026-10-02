import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { act, renderHook, render, screen, fireEvent, waitFor } from '@testing-library/react'

vi.mock('sonner', () => ({ toast: { success: vi.fn() } }))

import { useLinkVote, resetLinkVotesForTests } from './use-link-vote'
import { VoteButton } from '@/components/vote-button'

const URL_A = 'https://example.com/a'
const URL_B = 'https://example.com/b'

function okResponse(body: Record<string, unknown>) {
  return { ok: true, json: async () => body } as Response
}

function payload(linkUrl: string) {
  return { linkUrl, title: 'Title' }
}

describe('useLinkVote', () => {
  let fetchMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    resetLinkVotesForTests()
    localStorage.clear()
    fetchMock = vi.fn(async () => okResponse({ vote: { voteCount: 6 }, isNew: false, newRank: 5 }))
    vi.stubGlobal('fetch', fetchMock)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('seeds count from initialCount', () => {
    const { result } = renderHook(() => useLinkVote(URL_A, 5))
    expect(result.current).toMatchObject({ count: 5, voted: false, pending: false })
  })

  it('shares count and voted between two instances for the same URL', async () => {
    const first = renderHook(() => useLinkVote(URL_A, 5))
    const second = renderHook(() => useLinkVote(URL_A, 5))

    await act(async () => {
      await first.result.current.vote(payload(URL_A))
    })

    expect(second.result.current.count).toBe(6)
    expect(second.result.current.voted).toBe(true)
    expect(first.result.current.count).toBe(6)
  })

  it('keeps different URLs independent', async () => {
    const a = renderHook(() => useLinkVote(URL_A, 5))
    const b = renderHook(() => useLinkVote(URL_B, 2))

    await act(async () => {
      await a.result.current.vote(payload(URL_A))
    })

    expect(b.result.current).toMatchObject({ count: 2, voted: false })
  })

  it('makes a second vote by a non-admin a no-op', async () => {
    const { result } = renderHook(() => useLinkVote(URL_A, 5))

    await act(async () => {
      await result.current.vote(payload(URL_A))
    })
    await act(async () => {
      await result.current.vote(payload(URL_A))
    })

    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(result.current.count).toBe(6)
  })

  it('lets a super admin vote repeatedly', async () => {
    fetchMock
      .mockResolvedValueOnce(okResponse({ vote: { voteCount: 6 }, isSuperAdmin: true, newRank: 5 }))
      .mockResolvedValueOnce(okResponse({ vote: { voteCount: 7 }, isSuperAdmin: true, newRank: 5 }))
    const { result } = renderHook(() => useLinkVote(URL_A, 5))

    await act(async () => {
      await result.current.vote(payload(URL_A))
    })
    await act(async () => {
      await result.current.vote(payload(URL_A))
    })

    expect(fetchMock).toHaveBeenCalledTimes(2)
    expect(result.current.count).toBe(7)
  })

  it('is pending while the request is in flight, optimistically +1', async () => {
    let resolve!: (r: Response) => void
    fetchMock.mockImplementationOnce(() => new Promise<Response>(r => { resolve = r }))
    const { result } = renderHook(() => useLinkVote(URL_A, 5))

    let promise!: Promise<unknown>
    act(() => {
      promise = result.current.vote(payload(URL_A))
    })

    expect(result.current).toMatchObject({ pending: true, count: 6, voted: true })

    // A concurrent vote while pending is ignored
    await act(async () => {
      await result.current.vote(payload(URL_A))
    })
    expect(fetchMock).toHaveBeenCalledTimes(1)

    await act(async () => {
      resolve(okResponse({ vote: { voteCount: 9 }, newRank: 5 }))
      await promise
    })

    expect(result.current).toMatchObject({ pending: false, count: 9, voted: true })
  })

  it('rolls back on a failed response', async () => {
    fetchMock.mockResolvedValueOnce({ ok: false, json: async () => ({}) } as Response)
    const { result } = renderHook(() => useLinkVote(URL_A, 5))

    await act(async () => {
      await result.current.vote(payload(URL_A))
    })

    expect(result.current).toMatchObject({ count: 5, voted: false, pending: false })
  })

  it('rolls back when fetch throws', async () => {
    fetchMock.mockRejectedValueOnce(new Error('network'))
    const { result } = renderHook(() => useLinkVote(URL_A, 5))

    await act(async () => {
      await result.current.vote(payload(URL_A))
    })

    expect(result.current).toMatchObject({ count: 5, voted: false, pending: false })
  })

  it('increments the contributions counter on success', async () => {
    const { result } = renderHook(() => useLinkVote(URL_A, 5))

    await act(async () => {
      await result.current.vote(payload(URL_A))
    })

    expect(localStorage.getItem('motyl:contributions')).toBe('1')
  })

  it('posts the full payload to the votes API', async () => {
    const { result } = renderHook(() => useLinkVote(URL_A, 5))

    await act(async () => {
      await result.current.vote({
        linkUrl: URL_A,
        title: 'T',
        description: 'D',
        category: 'general',
        sourceDomain: 'https://example.com',
        patternName: 'P',
      })
    })

    expect(fetchMock).toHaveBeenCalledWith('/api/trends/votes', expect.objectContaining({ method: 'POST' }))
    const body = JSON.parse(fetchMock.mock.calls[0][1].body)
    expect(body).toEqual({
      linkUrl: URL_A,
      title: 'T',
      description: 'D',
      category: 'general',
      sourceDomain: 'https://example.com',
      patternName: 'P',
    })
  })
})

describe('VoteButton on shared state', () => {
  beforeEach(() => {
    resetLinkVotesForTests()
    localStorage.clear()
    vi.stubGlobal('fetch', vi.fn(async () => okResponse({ vote: { voteCount: 4 }, newRank: 5 })))
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('shows the other button voted with the same count after one is clicked', async () => {
    const onVote = vi.fn()
    render(
      <>
        <VoteButton linkUrl={URL_A} title="T" initialVoteCount={3} onVote={onVote} />
        <VoteButton linkUrl={URL_A} title="T" initialVoteCount={3} />
      </>,
    )
    const [first, second] = screen.getAllByRole('button')

    fireEvent.click(first)

    await waitFor(() => expect(second).toHaveAttribute('aria-pressed', 'true'))
    await waitFor(() => expect(onVote).toHaveBeenCalledWith(4))
    expect(second).toHaveTextContent('4')
    expect(first).toHaveTextContent('4')
    expect(second).toBeDisabled()
  })
})
