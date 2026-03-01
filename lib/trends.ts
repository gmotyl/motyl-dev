import { prisma } from '@/lib/prisma'

export async function getCurrentWeek(): Promise<string> {
  const now = new Date()

  // Get the day of the week (0=Sunday, 1=Monday, ..., 6=Saturday)
  const dayOfWeek = now.getDay()

  // Calculate the date of the Thursday in this week
  // If today is Thursday (4), offset is 0
  // If today is Friday (5), offset is -1
  // If today is Sunday (0), offset is 4
  // If today is Monday (1), offset is 3
  const thursOffset = 4 - dayOfWeek
  const thursday = new Date(now)
  thursday.setDate(now.getDate() + thursOffset)

  // The week belongs to the year of that Thursday
  const weekYear = thursday.getFullYear()

  // Find the date of Monday of week 1 in this year
  // Week 1 is the first week with a Thursday (or equivalently, contains Jan 4)
  const jan4 = new Date(weekYear, 0, 4)
  const jan4DayOfWeek = jan4.getDay()
  const week1Monday = new Date(jan4)
  week1Monday.setDate(jan4.getDate() - jan4DayOfWeek + 1) // +1 to get Monday (1)

  // Calculate the week number
  const timeDiff = thursday.getTime() - week1Monday.getTime()
  const weekNumber = Math.floor(timeDiff / (7 * 24 * 60 * 60 * 1000)) + 1

  return `${weekYear}-w${String(weekNumber).padStart(2, '0')}`
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
