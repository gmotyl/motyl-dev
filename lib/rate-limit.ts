import { prisma } from '@/lib/db/prisma'

export type RateLimitResult = { allowed: boolean; retryAfterSec: number }

const CLEANUP_PROBABILITY = 0.01
const CLEANUP_MAX_AGE_MS = 24 * 60 * 60 * 1000

// Randomness source for opportunistic cleanup; swappable in tests.
export const rateLimitDeps: { random: () => number } = {
  random: () => Math.random(),
}

// Fixed-window counter backed by Postgres: one atomic upsert per hit.
export async function hit(
  key: string,
  limit: number,
  windowMs: number,
  now: number = Date.now(),
): Promise<RateLimitResult> {
  const windowStartMs = Math.floor(now / windowMs) * windowMs
  const windowStart = new Date(windowStartMs)

  const row = await prisma.rateLimit.upsert({
    where: { key_windowStart: { key, windowStart } },
    create: { key, windowStart, count: 1 },
    update: { count: { increment: 1 } },
  })

  if (rateLimitDeps.random() < CLEANUP_PROBABILITY) {
    try {
      await prisma.rateLimit.deleteMany({
        where: { windowStart: { lt: new Date(now - CLEANUP_MAX_AGE_MS) } },
      })
    } catch (error) {
      // Cleanup is best effort; a failure must not block the request.
      console.error('Rate limit cleanup failed:', error)
    }
  }

  if (row.count <= limit) return { allowed: true, retryAfterSec: 0 }

  const retryAfterSec = Math.max(1, Math.ceil((windowStartMs + windowMs - now) / 1000))
  return { allowed: false, retryAfterSec }
}

// Gives back one hit in the current window, e.g. when the action it guarded failed.
// Best effort: errors are logged and swallowed.
export async function release(key: string, windowMs: number, now: number = Date.now()): Promise<void> {
  const windowStart = new Date(Math.floor(now / windowMs) * windowMs)
  try {
    await prisma.rateLimit.updateMany({
      where: { key, windowStart, count: { gt: 0 } },
      data: { count: { decrement: 1 } },
    })
  } catch (error) {
    console.error(`Rate limit release failed for ${key}:`, error)
  }
}

// First hop of x-forwarded-for (the original client as seen by the edge), else "unknown".
export function clientIp(request: Request): string {
  const first = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  return first || 'unknown'
}
