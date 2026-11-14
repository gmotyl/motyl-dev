// @vitest-environment node
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

vi.mock('@/lib/db/prisma', () => ({
  prisma: {
    rateLimit: {
      upsert: vi.fn(),
      deleteMany: vi.fn(),
      updateMany: vi.fn(),
    },
  },
}))

import { prisma } from '@/lib/db/prisma'
import { hit, release, clientIp, rateLimitDeps } from './rate-limit'

const upsert = vi.mocked(prisma.rateLimit.upsert)
const deleteMany = vi.mocked(prisma.rateLimit.deleteMany)
const updateMany = vi.mocked(prisma.rateLimit.updateMany)

const HOUR = 60 * 60 * 1000
// 2026-11-13T10:00:00.000Z plus 15 minutes and 30 seconds into the window.
const WINDOW_START = Date.UTC(2026, 10, 13, 10, 0, 0)
const NOW = WINDOW_START + 15 * 60 * 1000 + 30 * 1000

function countIs(count: number) {
  upsert.mockResolvedValueOnce({ key: 'k', windowStart: new Date(WINDOW_START), count } as never)
}

describe('hit', () => {
  const originalRandom = rateLimitDeps.random

  beforeEach(() => {
    upsert.mockReset()
    deleteMany.mockReset()
    // Cleanup off by default; individual tests opt in.
    rateLimitDeps.random = () => 0.5
  })

  afterEach(() => {
    rateLimitDeps.random = originalRandom
  })

  it('allows requests up to the limit within a window', async () => {
    countIs(1)
    await expect(hit('subscribe:ip:1.2.3.4', 5, HOUR, NOW)).resolves.toEqual({
      allowed: true,
      retryAfterSec: 0,
    })
    countIs(5)
    await expect(hit('subscribe:ip:1.2.3.4', 5, HOUR, NOW)).resolves.toMatchObject({
      allowed: true,
    })
    expect(upsert).toHaveBeenCalledTimes(2)
    expect(deleteMany).not.toHaveBeenCalled()
  })

  it('blocks the request over the limit with retryAfterSec', async () => {
    countIs(6)
    const result = await hit('subscribe:ip:1.2.3.4', 5, HOUR, NOW)
    expect(result.allowed).toBe(false)
    // 44 minutes 30 seconds remain in the window.
    expect(result.retryAfterSec).toBe(44 * 60 + 30)

    // Never below one second, even at the very end of a window.
    countIs(2)
    const edge = await hit('subscribe:email:a@b.c', 1, HOUR, WINDOW_START + HOUR - 1)
    expect(edge).toEqual({ allowed: false, retryAfterSec: 1 })
  })

  it('uses the floored window start as the key', async () => {
    countIs(1)
    await hit('subscribe:ip:1.2.3.4', 5, HOUR, NOW)
    expect(upsert).toHaveBeenCalledTimes(1)
    expect(upsert).toHaveBeenCalledWith({
      where: {
        key_windowStart: { key: 'subscribe:ip:1.2.3.4', windowStart: new Date(WINDOW_START) },
      },
      create: { key: 'subscribe:ip:1.2.3.4', windowStart: new Date(WINDOW_START), count: 1 },
      update: { count: { increment: 1 } },
    })
  })

  it('runs cleanup without failing the hit', async () => {
    rateLimitDeps.random = () => 0.001
    deleteMany.mockRejectedValueOnce(new Error('db down'))
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    countIs(1)

    await expect(hit('subscribe:ip:1.2.3.4', 5, HOUR, NOW)).resolves.toMatchObject({
      allowed: true,
    })
    expect(deleteMany).toHaveBeenCalledWith({
      where: { windowStart: { lt: new Date(NOW - 24 * HOUR) } },
    })
    consoleError.mockRestore()
  })
})

describe('release', () => {
  beforeEach(() => {
    updateMany.mockReset()
  })

  it('a failed confirmation send releases the email limit', async () => {
    updateMany.mockResolvedValueOnce({ count: 1 })
    await release('subscribe:email:a@b.c', HOUR, NOW)
    expect(updateMany).toHaveBeenCalledWith({
      where: {
        key: 'subscribe:email:a@b.c',
        windowStart: new Date(WINDOW_START),
        count: { gt: 0 },
      },
      data: { count: { decrement: 1 } },
    })
  })

  it('swallows and logs store errors', async () => {
    updateMany.mockRejectedValueOnce(new Error('db down'))
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    await expect(release('subscribe:email:a@b.c', HOUR, NOW)).resolves.toBeUndefined()
    expect(consoleError).toHaveBeenCalled()
    consoleError.mockRestore()
  })
})

describe('clientIp', () => {
  it('clientIp takes the first forwarded hop', () => {
    const forwarded = new Request('https://motyl.dev/api/subscribe', {
      headers: { 'x-forwarded-for': '1.2.3.4, 10.0.0.1' },
    })
    expect(clientIp(forwarded)).toBe('1.2.3.4')
    expect(clientIp(new Request('https://motyl.dev/api/subscribe'))).toBe('unknown')
  })
})
