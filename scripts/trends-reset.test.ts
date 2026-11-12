import { beforeEach, describe, expect, it, vi } from 'vitest'

const { prismaMock } = vi.hoisted(() => ({
  prismaMock: {
    trendsVotes: {
      findMany: vi.fn(),
      deleteMany: vi.fn(),
    },
    trendsArchive: {
      upsert: vi.fn(),
    },
    $disconnect: vi.fn(),
  },
}))

vi.mock('@/lib/db/prisma', () => ({ prisma: prismaMock }))

import { runTrendsReset } from './trends-reset'

describe('trends-reset script', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Live votes are stored under the sentinel week key `current` (ADR 0004).
    prismaMock.trendsVotes.findMany.mockResolvedValue([
      { week: 'current', voteCount: 3 },
      { week: 'current', voteCount: 2 },
    ])
  })

  it('deletes every live vote, not only rows keyed by the ISO week', async () => {
    const result = await runTrendsReset()

    expect(prismaMock.trendsVotes.deleteMany).toHaveBeenCalledWith({})
    expect(result).toMatchObject({ archivedCount: 2, totalVotes: 5 })
  })

  it('archives the total under a real ISO week label', async () => {
    await runTrendsReset()

    const { where } = prismaMock.trendsArchive.upsert.mock.calls[0][0]
    expect(where.week).toMatch(/^\d{4}-w\d{2}$/)
  })
})
