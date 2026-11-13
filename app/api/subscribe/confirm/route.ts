import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { verifySubscribeToken } from '@/lib/newsletter/subscribe-token'
import { sendAdminNotification, sendWelcomeEmail } from '@/lib/newsletter/signup-emails'

async function addContact(email: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const audienceId = process.env.RESEND_AUDIENCE_ID
  if (!apiKey || !audienceId) {
    console.error('RESEND_API_KEY or RESEND_AUDIENCE_ID missing, contact not created')
    return
  }
  const { error } = await new Resend(apiKey).contacts.create({ audienceId, email })
  if (error) throw new Error(`Contact create error: ${error.message}`)
}

// Runs one best-effort step; a failure is logged and never stops the others.
async function step(name: string, run: () => Promise<unknown>): Promise<void> {
  try {
    await run()
  } catch (error) {
    console.error(`Subscribe confirm step "${name}" failed:`, error)
  }
}

// Double opt-in step 2: the confirm page POSTs the signed token back here.
export async function POST(request: Request) {
  let token: unknown
  try {
    token = ((await request.json()) as { token?: unknown })?.token
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const payload = typeof token === 'string' ? verifySubscribeToken(token) : null
  if (!payload) {
    return NextResponse.json({ error: 'This link is invalid or expired' }, { status: 400 })
  }

  const { email, articleSlug } = payload
  await step('contact', () => addContact(email))
  await step('welcome', () => sendWelcomeEmail(email))
  await step('admin', () => sendAdminNotification(email, articleSlug))

  console.log(`New subscriber confirmed: ${email}${articleSlug ? ` from article: ${articleSlug}` : ''}`)
  return NextResponse.json({ success: true }, { status: 200 })
}
