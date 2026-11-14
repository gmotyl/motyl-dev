// @vitest-environment node
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

const { send, create, hit, release } = vi.hoisted(() => ({
  send: vi.fn(),
  create: vi.fn(),
  hit: vi.fn(),
  release: vi.fn(),
}))

vi.mock('resend', () => ({
  Resend: class {
    emails = { send }
    contacts = { create }
  },
}))

vi.mock('@/lib/rate-limit', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/rate-limit')>()
  return { ...actual, hit, release }
})

import { POST } from './route'
import { verifySubscribeToken } from '@/lib/newsletter/subscribe-token'

function post(body: unknown, ip = '1.2.3.4') {
  return new Request('http://localhost/api/subscribe', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': ip },
    body: JSON.stringify(body),
  })
}

describe('POST /api/subscribe', () => {
  beforeEach(() => {
    send.mockReset().mockResolvedValue({ data: { id: 'x' }, error: null })
    create.mockReset()
    hit.mockReset().mockResolvedValue({ allowed: true, retryAfterSec: 0 })
    release.mockReset().mockResolvedValue(undefined)
    vi.stubEnv('RESEND_API_KEY', 're_test')
    vi.stubEnv('NEWSLETTER_TOKEN_SECRET', 'test-secret')
    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
  })

  it('returns 400 for an invalid email', async () => {
    const res = await POST(post({ email: 'not-an-email' }))
    expect(res.status).toBe(400)
    expect(send).not.toHaveBeenCalled()
    expect(hit).not.toHaveBeenCalled()
  })

  it('returns 400 for an invalid articleSlug', async () => {
    const res = await POST(post({ email: 'a@b.com', articleSlug: '<script>' }))
    expect(res.status).toBe(400)
    expect(send).not.toHaveBeenCalled()
  })

  it('returns 429 when the IP limit is exceeded', async () => {
    hit.mockImplementation(async (key: string) =>
      key.startsWith('subscribe:ip:')
        ? { allowed: false, retryAfterSec: 120 }
        : { allowed: true, retryAfterSec: 0 },
    )
    const res = await POST(post({ email: 'a@b.com' }))
    expect(res.status).toBe(429)
    expect(res.headers.get('Retry-After')).toBe('120')
    expect(hit).toHaveBeenCalledWith('subscribe:ip:1.2.3.4', 5, 60 * 60 * 1000)
    expect(hit).not.toHaveBeenCalledWith(expect.stringMatching(/^subscribe:email:/), expect.anything(), expect.anything())
    expect(hit).toHaveBeenCalledTimes(1)
    expect(send).not.toHaveBeenCalled()
  })

  it('returns 429 when the same email was requested within 10 minutes', async () => {
    hit.mockImplementation(async (key: string) =>
      key.startsWith('subscribe:email:')
        ? { allowed: false, retryAfterSec: 300 }
        : { allowed: true, retryAfterSec: 0 },
    )
    const res = await POST(post({ email: '  A@B.com ' }))
    expect(res.status).toBe(429)
    expect(res.headers.get('Retry-After')).toBe('300')
    expect(hit).toHaveBeenCalledWith('subscribe:email:a@b.com', 1, 10 * 60 * 1000)
    expect(send).not.toHaveBeenCalled()
  })

  it('returns 503 when the token secret is missing', async () => {
    vi.stubEnv('NEWSLETTER_TOKEN_SECRET', '')
    const res = await POST(post({ email: 'a@b.com' }))
    expect(res.status).toBe(503)
    expect(send).not.toHaveBeenCalled()
  })

  it('returns 503 when the Resend API key is missing', async () => {
    vi.stubEnv('RESEND_API_KEY', '')
    const res = await POST(post({ email: 'a@b.com' }))
    expect(res.status).toBe(503)
    expect(send).not.toHaveBeenCalled()
  })

  it('sends only a confirmation email with a confirm link', async () => {
    const res = await POST(post({ email: 'A@b.com', articleSlug: 'my-post' }))

    expect(res.status).toBe(200)
    expect(create).not.toHaveBeenCalled()
    expect(send).toHaveBeenCalledTimes(1)
    const args = send.mock.calls[0][0]
    expect(args.subject).toBe('Confirm your motyl.dev Weekly subscription')
    expect(args.from).toContain('greg@motyl.dev')
    expect(args.to).toBe('a@b.com')

    const match = (args.html as string).match(
      /https:\/\/motyl\.dev\/subscribe\/confirm\?token=([A-Za-z0-9_.%-]+)/,
    )
    expect(match).not.toBeNull()
    const payload = verifySubscribeToken(decodeURIComponent(match![1]))
    expect(payload).toMatchObject({ email: 'a@b.com', articleSlug: 'my-post' })
  })

  it('returns 502 when the confirmation email fails', async () => {
    send.mockResolvedValueOnce({ data: null, error: { message: 'boom' } })
    const res = await POST(post({ email: 'a@b.com' }))
    expect(res.status).toBe(502)
  })

  it('a failed confirmation send releases the email limit', async () => {
    send.mockResolvedValueOnce({ data: null, error: { message: 'boom' } })
    const res = await POST(post({ email: 'A@b.com' }))
    expect(res.status).toBe(502)
    expect(release).toHaveBeenCalledTimes(1)
    expect(release).toHaveBeenCalledWith('subscribe:email:a@b.com', 10 * 60 * 1000)
  })

  it('does not release the email limit after a successful send', async () => {
    const res = await POST(post({ email: 'a@b.com' }))
    expect(res.status).toBe(200)
    expect(release).not.toHaveBeenCalled()
  })

  it('allows the request when the rate limiter errors', async () => {
    hit.mockRejectedValue(new Error('db down'))
    const res = await POST(post({ email: 'a@b.com' }))
    expect(res.status).toBe(200)
    expect(send).toHaveBeenCalledTimes(1)
    expect(console.error).toHaveBeenCalled()
  })
})
