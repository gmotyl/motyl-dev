import { NextResponse } from 'next/server'
import { z } from 'zod'
import { hit, clientIp, type RateLimitResult } from '@/lib/rate-limit'
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

// Fail open: a broken rate-limit store must not take signups down with it.
async function safeHit(key: string, limit: number, windowMs: number): Promise<RateLimitResult> {
  try {
    return await hit(key, limit, windowMs)
  } catch (error) {
    console.error(`Rate limiter failed for ${key}, allowing request:`, error)
    return { allowed: true, retryAfterSec: 0 }
  }
}

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

  const emailLimit = await safeHit(`subscribe:email:${email}`, 1, TEN_MIN_MS)
  if (!emailLimit.allowed) return tooManyRequests(emailLimit.retryAfterSec)

  try {
    const token = createSubscribeToken(email, articleSlug)
    await sendConfirmationEmail(email, token)
  } catch (error) {
    console.error('Failed to send confirmation email:', error)
    return NextResponse.json({ error: 'Could not send the confirmation email' }, { status: 502 })
  }

  return NextResponse.json(
    { success: true, message: 'Check your inbox to confirm your subscription.' },
    { status: 200 },
  )
}
