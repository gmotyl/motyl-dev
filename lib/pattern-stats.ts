import { prisma } from '@/lib/prisma'
import { getCurrentWeek } from '@/lib/trends'

export async function recordProcessingStats(
  entries: { patternName: string; processed: number; extracted: number }[]
) {
  const week = await getCurrentWeek()

  const results = await Promise.all(
    entries.map((entry) =>
      prisma.patternStats.upsert({
        where: {
          patternName_week: { patternName: entry.patternName, week },
        },
        update: {
          processed: { increment: entry.processed },
          extracted: { increment: entry.extracted },
        },
        create: {
          patternName: entry.patternName,
          week,
          processed: entry.processed,
          extracted: entry.extracted,
        },
      })
    )
  )

  return results
}

export async function recordInclusion(patternName: string) {
  const week = await getCurrentWeek()

  return prisma.patternStats.upsert({
    where: {
      patternName_week: { patternName, week },
    },
    update: {
      included: { increment: 1 },
    },
    create: {
      patternName,
      week,
      included: 1,
    },
  })
}

export async function getPatternStats(weeks: number = 8) {
  const currentWeek = await getCurrentWeek()

  const weekList: string[] = []
  let week = currentWeek
  for (let i = 0; i < weeks; i++) {
    weekList.push(week)
    week = getPreviousWeekString(week)
  }

  return prisma.patternStats.findMany({
    where: { week: { in: weekList } },
    orderBy: [{ week: 'desc' }, { patternName: 'asc' }],
  })
}

function getPreviousWeekString(week: string): string {
  const [yearStr, weekStr] = week.split('-w')
  const year = parseInt(yearStr)
  const weekNum = parseInt(weekStr)
  if (weekNum === 1) {
    return `${year - 1}-w52`
  }
  return `${year}-w${String(weekNum - 1).padStart(2, '0')}`
}
