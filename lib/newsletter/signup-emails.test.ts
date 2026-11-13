// @vitest-environment node
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

const { send, create } = vi.hoisted(() => ({ send: vi.fn(), create: vi.fn() }))

vi.mock('resend', () => ({
  Resend: class {
    emails = { send }
    contacts = { create }
  },
}))

import { sendAdminNotification, sendConfirmationEmail, sendWelcomeEmail } from './signup-emails'

describe('signup emails', () => {
  beforeEach(() => {
    send.mockReset().mockResolvedValue({ data: { id: 'x' }, error: null })
    create.mockReset()
    vi.stubEnv('RESEND_API_KEY', 're_test')
    vi.stubEnv('NEWSLETTER_ADMIN_EMAIL', 'admin@example.com')
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
  })

  it('admin notification escapes the email and article slug', async () => {
    await sendAdminNotification('<b>evil</b>@x.com', 'a"><script>')

    expect(send).toHaveBeenCalledTimes(1)
    const args = send.mock.calls[0][0]
    expect(args.from).toBe('Newsletter <greg@motyl.dev>')
    expect(args.to).toBe('admin@example.com')
    expect(args.html).toContain('&lt;b&gt;evil&lt;/b&gt;@x.com')
    expect(args.html).toContain('a&quot;&gt;&lt;script&gt;')
    expect(args.html).not.toContain('<b>evil')
    expect(args.html).not.toContain('<script>')
    expect(args.html).not.toMatch(/Next steps/i)
    expect(args.html).not.toMatch(/domain isn.t verified/i)
    expect(args.text).not.toMatch(/Next steps/i)
    expect(args.text).toContain('<b>evil</b>@x.com')
  })

  it('admin notification is skipped when NEWSLETTER_ADMIN_EMAIL is unset', async () => {
    vi.stubEnv('NEWSLETTER_ADMIN_EMAIL', '')
    const log = vi.spyOn(console, 'log').mockImplementation(() => {})

    await expect(sendAdminNotification('a@b.com', undefined)).resolves.toBeUndefined()

    expect(send).not.toHaveBeenCalled()
    expect(log).toHaveBeenCalledWith(expect.stringMatching(/NEWSLETTER_ADMIN_EMAIL/))
  })

  it('admin notification names the newsletter form when there is no article', async () => {
    await sendAdminNotification('a@b.com', undefined)
    expect(send.mock.calls[0][0].html).toContain('Newsletter form')
  })

  it('confirmation email carries the confirm link and 48 hour note', async () => {
    await sendConfirmationEmail('a@b.com', 'abc.def')

    const args = send.mock.calls[0][0]
    expect(args.from).toBe('Greg from motyl.dev <greg@motyl.dev>')
    expect(args.to).toBe('a@b.com')
    expect(args.subject).toBe('Confirm your motyl.dev Weekly subscription')
    expect(args.html).toContain('https://motyl.dev/subscribe/confirm?token=abc.def')
    expect(args.html).toContain('48 hours')
    expect(args.html).not.toContain('{{confirmUrl}}')
  })

  it('confirmation email throws when Resend reports an error', async () => {
    send.mockResolvedValueOnce({ data: null, error: { message: 'boom' } })
    await expect(sendConfirmationEmail('a@b.com', 't.t')).rejects.toThrow(/boom/)
  })

  it('welcome email keeps the welcome copy, sender and subject', async () => {
    await sendWelcomeEmail('a@b.com')

    const args = send.mock.calls[0][0]
    expect(args.from).toBe('Greg from motyl.dev <greg@motyl.dev>')
    expect(args.to).toBe('a@b.com')
    expect(args.subject).toBe('Welcome to motyl.dev Weekly!')
    expect(args.html).toContain('welcome aboard')
  })
})
