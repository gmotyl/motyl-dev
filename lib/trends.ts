import { prisma } from '@/lib/prisma'

export async function getCurrentWeek(): Promise<string> {
  const now = new Date()

  // Get the Thursday of this week
  const thursday = new Date(now)
  thursday.setDate(now.getDate() - now.getDay() + 4)

  // Get the year of that Thursday (determines which year owns this week)
  const year = thursday.getFullYear()

  // Find Thursday of week 1
  const jan4 = new Date(year, 0, 4)
  const thu1 = new Date(jan4)
  thu1.setDate(jan4.getDate() - jan4.getDay() + 4)

  // Calculate week number
  const msPerWeek = 7 * 24 * 60 * 60 * 1000
  const weekNum = Math.floor((thursday.getTime() - thu1.getTime()) / msPerWeek) + 1

  return `${year}-w${String(weekNum).padStart(2, '0')}`
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
