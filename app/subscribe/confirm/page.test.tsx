import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const { send, create } = vi.hoisted(() => ({ send: vi.fn(), create: vi.fn() }))

vi.mock('resend', () => ({
  Resend: class {
    emails = { send }
    contacts = { create }
  },
}))

// Header/Footer pull in auth and navigation hooks that are irrelevant here.
vi.mock('@/components/header', () => ({ default: () => <header /> }))
vi.mock('@/components/footer', () => ({ default: () => <footer /> }))

import ConfirmSubscriptionPage from './page'
import { createSubscribeToken } from '@/lib/newsletter/subscribe-token'

async function renderPage(searchParams: Record<string, string | string[] | undefined>) {
  const ui = await ConfirmSubscriptionPage({ searchParams: Promise.resolve(searchParams) })
  return render(ui)
}

describe('/subscribe/confirm page', () => {
  beforeEach(() => {
    send.mockReset()
    create.mockReset()
    vi.stubEnv('NEWSLETTER_TOKEN_SECRET', 'test-secret')
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
  })

  it('page renders a confirm button for a valid token without side effects', async () => {
    await renderPage({ token: createSubscribeToken('a@b.com', undefined) })

    expect(screen.getByRole('button', { name: 'Confirm subscription' })).toBeInTheDocument()
    expect(send).not.toHaveBeenCalled()
    expect(create).not.toHaveBeenCalled()
  })

  it('page renders the invalid-link message for a bad token', async () => {
    await renderPage({ token: 'garbage.token' })

    expect(screen.getByText(/This link is invalid or expired/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /subscribe again/i })).toHaveAttribute('href', '/newsletter')
    expect(screen.queryByRole('button', { name: 'Confirm subscription' })).toBeNull()
  })

  it('page renders the invalid-link message when the token is missing', async () => {
    await renderPage({})
    expect(screen.getByText(/This link is invalid or expired/)).toBeInTheDocument()
  })

  it('shows "You\'re subscribed" after the confirm POST succeeds', async () => {
    const token = createSubscribeToken('a@b.com', undefined)
    const fetchMock = vi.fn().mockResolvedValue(new Response('{"success":true}', { status: 200 }))
    vi.stubGlobal('fetch', fetchMock)

    await renderPage({ token })
    await userEvent.click(screen.getByRole('button', { name: 'Confirm subscription' }))

    await waitFor(() => expect(screen.getByText(/You're subscribed/)).toBeInTheDocument())
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/subscribe/confirm',
      expect.objectContaining({ method: 'POST', body: JSON.stringify({ token }) }),
    )
  })

  it('shows an error message when the confirm POST fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{}', { status: 400 })))

    await renderPage({ token: createSubscribeToken('a@b.com', undefined) })
    await userEvent.click(screen.getByRole('button', { name: 'Confirm subscription' }))

    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument())
    expect(screen.queryByText(/You're subscribed/)).toBeNull()
  })
})
