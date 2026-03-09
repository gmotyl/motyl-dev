import { prisma } from '@/lib/prisma'
import { mockGetHomepageFeed, mockCastVote } from '@/lib/trends-mock'

const isDevMock = process.env.DATABASE_URL?.includes('dummy') ?? false

export async function getCurrentWeek(): Promise<string> {
  const date = new Date()

  // Step 1: Find Thursday of the current week
  // If today is Thursday (4), offset is 0
  // If today is Monday (1), offset is +3
  // If today is Sunday (0), offset is +4
  const day = date.getDay()
  const diff = date.getDate() - day + (day === 0 ? -3 : 4)
  const thursday = new Date(date.getFullYear(), date.getMonth(), diff)

  // Step 2: Thursday determines the week's year (ISO 8601 standard)
  const year = thursday.getFullYear()

  // Step 3: Find Thursday of week 1 (use Jan 4 as reference - always in week 1)
  const jan4 = new Date(year, 0, 4)
  const jan4Day = jan4.getDay()
  const jan4Diff = jan4.getDate() - jan4Day + (jan4Day === 0 ? -3 : 4)
  const weekOneThursday = new Date(year, 0, jan4Diff)

  // Step 4: Count weeks between Thursday of week 1 and current Thursday
  const msPerWeek = 7 * 24 * 60 * 60 * 1000
  const weekNum = Math.floor((thursday.getTime() - weekOneThursday.getTime()) / msPerWeek) + 1

  return `${year}-w${String(weekNum).padStart(2, '0')}`
}

const ACTIVE_WEEK = 'current'

export async function castVote(
  linkUrl: string,
  title: string,
  description: string,
  category: string,
  sourceDomain?: string
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
