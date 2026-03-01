import { prisma } from '@/lib/prisma'

export async function getCurrentWeek(): Promise<string> {
  const now = new Date()

  // Get Thursday of the current week
  const dayOfWeek = now.getDay()
  const thursdayOffset = 4 - dayOfWeek
  const thursday = new Date(now)
  thursday.setDate(now.getDate() + thursdayOffset)

  // The week belongs to the year of that Thursday
  const weekYear = thursday.getFullYear()

  // Find January 4 of the week's year (guaranteed to be in week 1)
  const jan4 = new Date(weekYear, 0, 4)
  const jan4DayOfWeek = jan4.getDay()

  // Find Monday of the week containing January 4
  // If Jan 4 is Sunday (0), Monday is Jan 5
  // If Jan 4 is Monday (1), Monday is Jan 4
  // If Jan 4 is Tuesday (2), Monday is Jan 3
  const jan4MonthDate = jan4.getDate()
  const daysToMonday = jan4DayOfWeek === 0 ? 1 : jan4DayOfWeek - 1
  const week1MondayDate = jan4MonthDate - daysToMonday

  const week1Monday = new Date(weekYear, 0, week1MondayDate)

  // Calculate week number
  const timeDiff = thursday.getTime() - week1Monday.getTime()
  const msPerWeek = 7 * 24 * 60 * 60 * 1000
  let weekNum = Math.floor(timeDiff / msPerWeek) + 1

  // If week number is <= 0, the date belongs to the last week of the previous year
  if (weekNum <= 0) {
    const prevYear = weekYear - 1
    const prevYearJan4 = new Date(prevYear, 0, 4)
    const prevYearJan4DayOfWeek = prevYearJan4.getDay()
    const prevWeek1MondayDate =
      prevYearJan4.getDate() - (prevYearJan4DayOfWeek === 0 ? 1 : prevYearJan4DayOfWeek - 1)
    const prevWeek1Monday = new Date(prevYear, 0, prevWeek1MondayDate)

    const prevTimeDiff = thursday.getTime() - prevWeek1Monday.getTime()
    weekNum = Math.floor(prevTimeDiff / msPerWeek) + 1
    return `${prevYear}-w${String(weekNum).padStart(2, '0')}`
  }

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
