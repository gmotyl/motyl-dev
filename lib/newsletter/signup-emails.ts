import fs from 'node:fs/promises'
import path from 'node:path'
import { Resend } from 'resend'
import { buildEmailMarkdownRenderer, wrapInEmailShell } from '@/lib/newsletter/email-markdown'
import { escapeHtml } from '@/lib/newsletter/escape-html'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://motyl.dev'
const SENDER = 'Greg from motyl.dev <greg@motyl.dev>'

function getResend(): Resend {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY is not set')
  return new Resend(apiKey)
}

async function renderEmailMarkdown(name: string, vars: Record<string, string> = {}): Promise<string> {
  let source = await fs.readFile(path.join(process.cwd(), 'content', 'emails', name), 'utf8')
  for (const [key, value] of Object.entries(vars)) {
    source = source.split(`{{${key}}}`).join(value)
  }
  return wrapInEmailShell(buildEmailMarkdownRenderer().render(source))
}

export function confirmUrl(token: string): string {
  return `${SITE_URL}/subscribe/confirm?token=${encodeURIComponent(token)}`
}

// The only email /api/subscribe sends: a link carrying the signed subscribe token.
export async function sendConfirmationEmail(email: string, token: string): Promise<void> {
  const resend = getResend()
  const html = await renderEmailMarkdown('confirm.md', { confirmUrl: confirmUrl(token) })

  const { error } = await resend.emails.send({
    from: SENDER,
    to: email,
    subject: 'Confirm your motyl.dev Weekly subscription',
    html,
  })
  if (error) throw new Error(`Confirmation email error: ${error.message}`)
}

export async function sendWelcomeEmail(email: string): Promise<void> {
  const resend = getResend()
  const html = await renderEmailMarkdown('welcome.md')

  const { error } = await resend.emails.send({
    from: SENDER,
    to: email,
    subject: 'Welcome to motyl.dev Weekly!',
    html,
  })
  if (error) throw new Error(`Welcome email error: ${error.message}`)

  console.log(`Welcome email sent to ${email}`)
}

export async function sendAdminNotification(email: string, articleSlug?: string): Promise<void> {
  const adminEmail = process.env.NEWSLETTER_ADMIN_EMAIL
  if (!adminEmail) {
    console.log(`NEWSLETTER_ADMIN_EMAIL not set, skipping admin notification for ${email}`)
    return
  }

  const timestamp = new Date().toISOString()
  // articleSlug is validated upstream, but every interpolated value is escaped regardless.
  const articleUrl = articleSlug ? `${SITE_URL}/articles/${articleSlug}` : null
  const sourceHtml = articleUrl
    ? `Article: <a href="${escapeHtml(articleUrl)}">${escapeHtml(articleSlug!)}</a>`
    : 'Newsletter form'
  const sourceText = articleUrl ? `Article: ${articleUrl}` : 'Newsletter form'

  const resend = getResend()
  const { error } = await resend.emails.send({
    from: 'Newsletter <greg@motyl.dev>',
    to: adminEmail,
    subject: 'New motyl.dev Weekly subscriber',
    html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="margin-top: 0;">New newsletter subscriber</h2>
  <p><strong>Email:</strong> ${escapeHtml(email)}</p>
  <p><strong>Subscribed at:</strong> ${escapeHtml(timestamp)}</p>
  <p><strong>Source:</strong> ${sourceHtml}</p>
</div>`,
    text: `New newsletter subscriber

Email: ${email}
Subscribed at: ${timestamp}
Source: ${sourceText}
`,
  })
  if (error) throw new Error(`Admin notification error: ${error.message}`)
}
