import { prisma } from '@/lib/prisma'

export async function getCurrentWeek(): Promise<string> {
  const now = new Date()

  // ISO 8601 week calculation
  const weekDate = new Date(now.getTime() + (4 - now.getDay()) * 24 * 60 * 60 * 1000)
  const weekYear = weekDate.getFullYear()
  const weekNum = Math.ceil(
    (weekDate.getTime() - new Date(weekYear, 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000)
  )

  return `${weekYear}-w${String(weekNum).padStart(2, '0')}`
}

export async function castVote(
  linkUrl: string,
  title: string,
  description: string,
  category: string,
  sourceDomain?: string
) {
  const week = await getCurrentWeek()

  return await prisma.trendsVotes.upsert({
    where: {
      week_linkUrl: { week, linkUrl },
    },
    update: {
      voteCount: { increment: 1 },
    },
    create: {
      week,
      linkUrl,
      title,
      description,
      category,
      sourceDomain,
      voteCount: 1,
    },
  })
}

export async function getWeekVotes(week: string) {
  return await prisma.trendsVotes.findMany({
    where: { week },
    orderBy: [{ voteCount: 'desc' }, { createdAt: 'asc' }],
  })
}
