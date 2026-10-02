import { prisma } from '@/lib/db/prisma'
import { mockGetHomepageFeed, mockCastVote } from '@/lib/trends/mock'
import { recordInclusion } from '@/lib/trends/pattern-stats'
import { isoWeekKey } from '@/lib/trends/iso-week'

const isDevMock = process.env.DATABASE_URL?.includes('dummy') ?? false

export async function getCurrentWeek(): Promise<string> {
  return isoWeekKey(new Date())
}

const ACTIVE_WEEK = 'current'

export async function castVote(
  linkUrl: string,
  title: string,
  description: string,
  category: string,
  sourceDomain?: string,
  patternName?: string
) {
  if (isDevMock) {
    const vote = await mockCastVote(ACTIVE_WEEK, linkUrl, title, description, category, sourceDomain)
    return { vote, isNew: vote.voteCount === 1, newRank: 1 }
  }

  const existing = await prisma.trendsVotes.findUnique({
    where: { week_linkUrl: { week: ACTIVE_WEEK, linkUrl } },
  })
  const isNew = !existing

  const vote = await prisma.trendsVotes.upsert({
    where: {
      week_linkUrl: { week: ACTIVE_WEEK, linkUrl },
    },
    update: {
      voteCount: { increment: 1 },
    },
    create: {
      week: ACTIVE_WEEK,
      linkUrl,
      title,
      description,
      category,
      sourceDomain,
      voteCount: 1,
    },
  })

  // Calculate new rank (1-based position by vote count)
  const higherCount = await prisma.trendsVotes.count({
    where: { voteCount: { gt: vote.voteCount } },
  })
  const newRank = higherCount + 1

  // Record pattern inclusion stat if pattern is known
  if (patternName) {
    await recordInclusion(patternName).catch((err) =>
      console.error('Failed to record pattern stat:', err)
    )
  }

  return { vote, isNew, newRank }
}

export async function getWeekVotes(week: string) {
  return await prisma.trendsVotes.findMany({
    where: { week },
    orderBy: [{ voteCount: 'desc' }, { createdAt: 'asc' }],
  })
}

export function getPreviousWeek(week: string): string {
  const [yearStr, weekStr] = week.split('-w')
  const year = parseInt(yearStr)
  const weekNum = parseInt(weekStr)
  if (weekNum === 1) {
    return `${year - 1}-w52`
  }
  return `${year}-w${String(weekNum - 1).padStart(2, '0')}`
}

export async function resetWeeklyVotes() {
  const week = await getCurrentWeek()
  const allVotes = await prisma.trendsVotes.findMany({
    orderBy: [{ voteCount: 'desc' }, { createdAt: 'asc' }],
  })
  const totalVotes = allVotes.reduce((sum, v) => sum + v.voteCount, 0)

  // Upsert archive record for this week (may already exist if trends:generate ran first)
  await prisma.trendsArchive.upsert({
    where: { week },
    update: { totalVotes },
    create: {
      week,
      summaryMarkdown: '',
      totalVotes,
    },
  })

  // Delete all current votes (period length varies between resets)
  await prisma.trendsVotes.deleteMany({})

  return { week, archivedCount: allVotes.length, totalVotes }
}

export async function deleteTrendingItem(linkUrl: string) {
  return await prisma.trendsVotes.delete({
    where: { week_linkUrl: { week: ACTIVE_WEEK, linkUrl } },
  })
}

export async function updateTrendingCategory(linkUrl: string, category: string) {
  return await prisma.trendsVotes.update({
    where: { week_linkUrl: { week: ACTIVE_WEEK, linkUrl } },
    data: { category },
  })
}

export async function getHomepageFeed() {
  if (isDevMock) return mockGetHomepageFeed(ACTIVE_WEEK)

  const [trendings, lastWeekArchive] = await Promise.all([
    prisma.trendsVotes.findMany({
      orderBy: [{ voteCount: 'desc' }, { createdAt: 'asc' }],
      take: 20,
    }),
    prisma.trendsArchive.findFirst({
      orderBy: { createdAt: 'desc' },
    }),
  ])

  return {
    trendings,
    lastWeekSummary: lastWeekArchive ?? null,
  }
}
