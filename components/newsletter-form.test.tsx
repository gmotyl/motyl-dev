import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

const mockToast = vi.fn()
vi.mock('@/hooks/use-toast', () => ({ useToast: () => ({ toast: mockToast }) }))

const mockQueue = vi.fn()
vi.mock('@/lib/newsletter/queue', () => ({
  queueNewsletterSubscription: (email: string) => mockQueue(email),
}))

import NewsletterForm from './newsletter-form'

function jsonResponse(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

function submit(email = 'reader@example.com') {
  render(<NewsletterForm />)
  fireEvent.change(screen.getByPlaceholderText('Your email address'), { target: { value: email } })
  fireEvent.click(screen.getByRole('button', { name: 'Join' }))
}

function setOnline(value: boolean) {
  vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(value)
}

describe('NewsletterForm — double opt-in copy', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockQueue.mockResolvedValue(undefined)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('shows check-your-inbox toast on success', async () => {
    setOnline(true)
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse(200, { success: true })))

    submit()

    await waitFor(() => expect(mockToast).toHaveBeenCalled())
    const arg = mockToast.mock.calls[0][0]
    expect(arg.title).toMatch(/check your inbox/i)
    expect(arg.description).toMatch(/confirm/i)
    expect(JSON.stringify(arg)).not.toMatch(/welcome aboard/i)
    expect(mockQueue).not.toHaveBeenCalled()
  })

  it('shows too-many-attempts toast on 429 without queueing', async () => {
    // Even if the browser reports offline, a 429 proves the server answered:
    // it must never fall through to the offline queue.
    setOnline(false)
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(jsonResponse(429, { error: 'Too many requests' })),
    )

    submit()

    await waitFor(() => expect(mockToast).toHaveBeenCalled())
    expect(mockToast).toHaveBeenCalledTimes(1)
    expect(mockToast.mock.calls[0][0].title).toBe('Too many attempts — try again later')
    expect(mockQueue).not.toHaveBeenCalled()
  })

  it('queues the subscription when offline', async () => {
    setOnline(false)
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')))

    submit('offline@example.com')

    await waitFor(() => expect(mockQueue).toHaveBeenCalledWith('offline@example.com'))
    await waitFor(() =>
      expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({ title: "You're offline" })),
    )
  })
})
