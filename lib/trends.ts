import { prisma } from '@/lib/prisma'

export async function getCurrentWeek(): Promise<string> {
  const now = new Date()
  const year = now.getFullYear()
  const weekNum = Math.ceil(
    (now.getTime() - new Date(year, 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000)
  )
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

  // Check if this link already has votes this week
  const existing = await prisma.trendsVotes.findFirst({
    where: {
      week,
      linkUrl,
    },
  })

  if (existing) {
    // Increment vote count
    return await prisma.trendsVotes.update({
      where: { id: existing.id },
      data: { voteCount: existing.voteCount + 1 },
    })
  } else {
    // Create new vote entry
    return await prisma.trendsVotes.create({
      data: {
        week,
        linkUrl,
        title,
        description,
        category,
        sourceDomain,
      },
    })
  }
}

export async function getWeekVotes(week: string) {
  return await prisma.trendsVotes.findMany({
    where: { week },
    orderBy: [{ voteCount: 'desc' }, { createdAt: 'asc' }],
  })
}
