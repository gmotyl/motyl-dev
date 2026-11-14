import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { verifySubscribeToken } from '@/lib/newsletter/subscribe-token'
import { sendAdminNotification, sendWelcomeEmail } from '@/lib/newsletter/signup-emails'

type ContactOutcome = 'created' | 'exists'

// The Resend audience is the replay marker: a token whose contact already exists was confirmed
// before, so nothing is created or mailed again. Failures throw so the caller can answer 502 and
// the user can retry; nothing is consumed before the contact exists.
async function addContact(email: string): Promise<ContactOutcome> {
  const apiKey = process.env.RESEND_API_KEY
  const audienceId = process.env.RESEND_AUDIENCE_ID
  if (!apiKey || !audienceId) throw new Error('RESEND_API_KEY or RESEND_AUDIENCE_ID missing')

  const resend = new Resend(apiKey)
  const existing = await resend.contacts.get({ audienceId, email })
  if (!existing.error) return 'exists'
  if (existing.error.statusCode !== 404 && existing.error.name !== 'not_found') {
    throw new Error(`Contact lookup error: ${existing.error.message}`)
  }

  const { error } = await resend.contacts.create({ audienceId, email })
  if (error) throw new Error(`Contact create error: ${error.message}`)
  return 'created'
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

  let outcome: ContactOutcome
  try {
    outcome = await addContact(email)
  } catch (error) {
    console.error('Subscribe confirm: contact step failed:', error)
    return NextResponse.json({ error: 'Could not complete your subscription, please try again' }, { status: 502 })
  }
  if (outcome === 'exists') {
    return NextResponse.json({ success: true, alreadyConfirmed: true }, { status: 200 })
  }

  await step('welcome', () => sendWelcomeEmail(email))
  await step('admin', () => sendAdminNotification(email, articleSlug))

  console.log(`New subscriber confirmed: ${email}${articleSlug ? ` from article: ${articleSlug}` : ''}`)
  return NextResponse.json({ success: true }, { status: 200 })
}
