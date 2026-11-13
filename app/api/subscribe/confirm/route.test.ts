// @vitest-environment node
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

const { send, create } = vi.hoisted(() => ({ send: vi.fn(), create: vi.fn() }))

vi.mock('resend', () => ({
  Resend: class {
    emails = { send }
    contacts = { create }
  },
}))

import { POST } from './route'
import { createSubscribeToken, SUBSCRIBE_TOKEN_TTL_MS } from '@/lib/newsletter/subscribe-token'

function post(body: unknown) {
  return new Request('http://localhost/api/subscribe/confirm', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
}

describe('POST /api/subscribe/confirm', () => {
  beforeEach(() => {
    send.mockReset().mockResolvedValue({ data: { id: 'x' }, error: null })
    create.mockReset().mockResolvedValue({ data: { id: 'c' }, error: null })
    vi.stubEnv('RESEND_API_KEY', 're_test')
    vi.stubEnv('RESEND_AUDIENCE_ID', 'aud_1')
    vi.stubEnv('NEWSLETTER_TOKEN_SECRET', 'test-secret')
    vi.stubEnv('NEWSLETTER_ADMIN_EMAIL', 'admin@example.com')
    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
  })

  it('confirm runs contact, welcome and admin steps for a valid token', async () => {
    const token = createSubscribeToken('a@b.com', 'my-post')
    const res = await POST(post({ token }))

    expect(res.status).toBe(200)
    expect(create).toHaveBeenCalledWith({ audienceId: 'aud_1', email: 'a@b.com' })
    const subjects = send.mock.calls.map((c) => c[0].subject)
    expect(subjects).toContain('Welcome to motyl.dev Weekly!')
    expect(send.mock.calls.some((c) => c[0].to === 'admin@example.com')).toBe(true)
    expect(send).toHaveBeenCalledTimes(2)
  })

  it('confirm still returns 200 when one step fails', async () => {
    create.mockRejectedValueOnce(new Error('contacts down'))
    const token = createSubscribeToken('a@b.com', undefined)
    const res = await POST(post({ token }))

    expect(res.status).toBe(200)
    expect(send).toHaveBeenCalledTimes(2)
  })

  it('confirm returns 400 for an expired token', async () => {
    const token = createSubscribeToken('a@b.com', undefined, Date.now() - SUBSCRIBE_TOKEN_TTL_MS - 1000)
    const res = await POST(post({ token }))

    expect(res.status).toBe(400)
    expect(create).not.toHaveBeenCalled()
    expect(send).not.toHaveBeenCalled()
  })

  it('confirm returns 400 for a tampered token', async () => {
    const token = createSubscribeToken('a@b.com', undefined)
    const tampered = (token[0] === 'A' ? 'B' : 'A') + token.slice(1)
    const res = await POST(post({ token: tampered }))

    expect(res.status).toBe(400)
    expect(create).not.toHaveBeenCalled()
    expect(send).not.toHaveBeenCalled()
  })

  it('confirm returns 400 for a missing token or bad body', async () => {
    expect((await POST(post({}))).status).toBe(400)
    const bad = new Request('http://localhost/api/subscribe/confirm', { method: 'POST', body: 'nope' })
    expect((await POST(bad)).status).toBe(400)
    expect(send).not.toHaveBeenCalled()
  })
})
