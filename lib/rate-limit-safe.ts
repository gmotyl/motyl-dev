import { hit, type RateLimitResult } from '@/lib/rate-limit'

// Fail open: a broken rate-limit store must not take the guarded endpoint down with it.
// Lives apart from lib/rate-limit.ts so tests that mock `hit` also govern this wrapper.
export async function safeHit(key: string, limit: number, windowMs: number): Promise<RateLimitResult> {
  try {
    return await hit(key, limit, windowMs)
  } catch (error) {
    console.error(`Rate limiter failed for ${key}, allowing request:`, error)
    return { allowed: true, retryAfterSec: 0 }
  }
}
