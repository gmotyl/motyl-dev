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
      windowStart: new Date(WINDOW_START),
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
    expect(edge).toMatchObject({ allowed: false, retryAfterSec: 1 })
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

  it('hit returns the window start it counted against', async () => {
    countIs(1)
    const result = await hit('subscribe:ip:1.2.3.4', 5, HOUR, NOW)
    expect(result.allowed).toBe(true)
    expect(result.windowStart).toEqual(new Date(Math.floor(NOW / HOUR) * HOUR))
  })

  it('a blocked hit still returns its window start', async () => {
    countIs(6)
    const result = await hit('subscribe:ip:1.2.3.4', 5, HOUR, NOW)
    expect(result.allowed).toBe(false)
    expect(result.windowStart).toEqual(new Date(WINDOW_START))
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
  const originalRandom = rateLimitDeps.random

  beforeEach(() => {
    updateMany.mockReset()
  })

  afterEach(() => {
    vi.useRealTimers()
    rateLimitDeps.random = originalRandom
  })

  it('release decrements exactly the given window', async () => {
    // Decades old, so recomputing a window from Date.now() (e.g. treating the Date as a
    // window length) can never land on it by coincidence.
    const windowStart = new Date(Date.UTC(1990, 0, 1))
    updateMany.mockResolvedValueOnce({ count: 1 })
    await release('subscribe:email:a@b.c', windowStart)
    expect(updateMany).toHaveBeenCalledTimes(1)
    expect(updateMany).toHaveBeenCalledWith({
      where: {
        key: 'subscribe:email:a@b.c',
        windowStart,
        count: { gt: 0 },
      },
      data: { count: { decrement: 1 } },
    })
  })

  it('a release after the boundary still targets the hit\'s window', async () => {
    const TEN_MIN = 10 * 60 * 1000
    // Not hour-aligned: a release that recomputed with a 1-hour window would hit 12:00,
    // and one that recomputed with the 10-minute window at release time would hit 12:20.
    const boundary = Date.UTC(2026, 10, 13, 12, 20, 0)
    upsert.mockReset()
    upsert.mockResolvedValueOnce({ key: 'k', windowStart: new Date(boundary - TEN_MIN), count: 1 } as never)
    updateMany.mockResolvedValueOnce({ count: 1 })
    rateLimitDeps.random = () => 0.5

    // Counted at 12:19:59.900, released at 12:20:00.100 (after the boundary).
    const counted = await hit('subscribe:email:a@b.c', 1, TEN_MIN, boundary - 100)
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(boundary + 100)
    await release('subscribe:email:a@b.c', counted.windowStart!)

    expect(counted.windowStart).toEqual(new Date(boundary - TEN_MIN))
    expect(updateMany).toHaveBeenCalledWith({
      where: {
        key: 'subscribe:email:a@b.c',
        windowStart: new Date(boundary - TEN_MIN),
        count: { gt: 0 },
      },
      data: { count: { decrement: 1 } },
    })
  })

  it('swallows and logs store errors', async () => {
    updateMany.mockRejectedValueOnce(new Error('db down'))
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    await expect(release('subscribe:email:a@b.c', new Date(WINDOW_START))).resolves.toBeUndefined()
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
