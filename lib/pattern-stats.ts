import { prisma } from '@/lib/prisma'

function today(): Date {
  const now = new Date()
  return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()))
}

export async function recordProcessingStats(
  entries: { patternName: string; processed: number; extracted: number }[]
) {
  const date = today()

  const results = await Promise.all(
    entries.map((entry) =>
      prisma.patternStats.upsert({
        where: {
          patternName_date: { patternName: entry.patternName, date },
        },
        update: {
          processed: { increment: entry.processed },
          extracted: { increment: entry.extracted },
        },
        create: {
          patternName: entry.patternName,
          date,
          processed: entry.processed,
          extracted: entry.extracted,
        },
      })
    )
  )

  return results
}

export async function recordInclusion(patternName: string) {
  const date = today()

  return prisma.patternStats.upsert({
    where: {
      patternName_date: { patternName, date },
    },
    update: {
      included: { increment: 1 },
    },
    create: {
      patternName,
      date,
      included: 1,
    },
  })
}

export async function getPatternStats(days: number = 56) {
  const since = new Date()
  since.setDate(since.getDate() - days)
  const sinceDate = new Date(Date.UTC(since.getFullYear(), since.getMonth(), since.getDate()))

  return prisma.patternStats.findMany({
    where: { date: { gte: sinceDate } },
    orderBy: [{ date: 'desc' }, { patternName: 'asc' }],
  })
}
