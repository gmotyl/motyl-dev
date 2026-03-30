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

export async function getAllTimeStats() {
  const all: Array<{ patternName: string; date: Date; processed: number; extracted: number; included: number }> =
    await prisma.patternStats.findMany({
      orderBy: [{ date: 'asc' }],
    })

  const totalProcessed = all.reduce((s: number, r) => s + r.processed, 0)
  const totalExtracted = all.reduce((s: number, r) => s + r.extracted, 0)
  const totalIncluded = all.reduce((s: number, r) => s + r.included, 0)
  const conversionRate = totalExtracted > 0 ? (totalIncluded / totalExtracted) * 100 : 0
  const uniquePatterns = new Set(all.map((r) => r.patternName)).size
  const daysTracked = new Set(all.map((r) => new Date(r.date).toISOString().slice(0, 10))).size

  const monthMap: Record<string, { processed: number; extracted: number; included: number }> = {}
  for (const row of all) {
    const month = new Date(row.date).toISOString().slice(0, 7)
    if (!monthMap[month]) monthMap[month] = { processed: 0, extracted: 0, included: 0 }
    monthMap[month].processed += row.processed
    monthMap[month].extracted += row.extracted
    monthMap[month].included += row.included
  }

  const monthly = Object.entries(monthMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, data]) => ({ month, ...data }))

  return {
    totals: { totalProcessed, totalExtracted, totalIncluded, conversionRate, uniquePatterns, daysTracked },
    monthly,
  }
}
