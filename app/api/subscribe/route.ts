import { NextResponse } from 'next/server'
import { z } from 'zod'
import { clientIp, release } from '@/lib/rate-limit'
import { safeHit } from '@/lib/rate-limit-safe'
import { createSubscribeToken } from '@/lib/newsletter/subscribe-token'
import { sendConfirmationEmail } from '@/lib/newsletter/signup-emails'

const HOUR_MS = 60 * 60 * 1000
const TEN_MIN_MS = 10 * 60 * 1000

const bodySchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  articleSlug: z
    .string()
    .regex(/^[a-z0-9-]{1,120}$/)
    .optional(),
})

function tooManyRequests(retryAfterSec: number) {
  return NextResponse.json(
    { error: 'Too many attempts, try again later' },
    { status: 429, headers: { 'Retry-After': String(retryAfterSec) } },
  )
}

// Double opt-in step 1: validate, rate-limit, then email a signed confirmation link.
export async function POST(request: Request) {
  let raw: unknown
  try {
    raw = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const parsed = bodySchema.safeParse(raw)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid email address or article' }, { status: 400 })
  }
  const { email, articleSlug } = parsed.data

  if (!process.env.RESEND_API_KEY || !process.env.NEWSLETTER_TOKEN_SECRET) {
    console.error('Subscribe is not configured: RESEND_API_KEY or NEWSLETTER_TOKEN_SECRET missing')
    return NextResponse.json({ error: 'Subscriptions are temporarily unavailable' }, { status: 503 })
  }

  const ipLimit = await safeHit(`subscribe:ip:${clientIp(request)}`, 5, HOUR_MS)
  if (!ipLimit.allowed) return tooManyRequests(ipLimit.retryAfterSec)

  // Counted before the send so concurrent requests cannot both send; released if the send fails.
  const emailKey = `subscribe:email:${email}`
  const emailLimit = await safeHit(emailKey, 1, TEN_MIN_MS)
  if (!emailLimit.allowed) return tooManyRequests(emailLimit.retryAfterSec)

  try {
    const token = createSubscribeToken(email, articleSlug)
    await sendConfirmationEmail(email, token)
  } catch (error) {
    console.error('Failed to send confirmation email:', error)
    // A failed send must not lock the address out for the rest of the window.
    await release(emailKey, TEN_MIN_MS)
    return NextResponse.json({ error: 'Could not send the confirmation email' }, { status: 502 })
  }

  return NextResponse.json(
    { success: true, message: 'Check your inbox to confirm your subscription.' },
    { status: 200 },
  )
}
