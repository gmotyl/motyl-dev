/**
 * Archive current week's votes and clear the trendsVotes table.
 * Run manually after the weekly trends PR has been merged.
 *
 * Run with: tsx scripts/trends-reset.ts
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// --- ISO 8601 week logic (copied inline to avoid server imports) ---

function getCurrentWeek(): string {
  const date = new Date()

  const day = date.getDay()
  const diff = date.getDate() - day + (day === 0 ? -3 : 4)
  const thursday = new Date(date.getFullYear(), date.getMonth(), diff)

  const year = thursday.getFullYear()

  const jan4 = new Date(year, 0, 4)
  const jan4Day = jan4.getDay()
  const jan4Diff = jan4.getDate() - jan4Day + (jan4Day === 0 ? -3 : 4)
  const weekOneThursday = new Date(year, 0, jan4Diff)

  const msPerWeek = 7 * 24 * 60 * 60 * 1000
  const weekNum =
    Math.floor((thursday.getTime() - weekOneThursday.getTime()) / msPerWeek) + 1

  return `${year}-w${String(weekNum).padStart(2, '0')}`
}

// --- Main ---

async function main() {
  const week = getCurrentWeek()

  // Fetch votes to calculate total
  const votes = await prisma.trendsVotes.findMany({
    where: { week },
    orderBy: [{ voteCount: 'desc' }, { createdAt: 'asc' }],
  })

  const totalVotes = votes.reduce((sum, v) => sum + v.voteCount, 0)

  // Upsert archive record
  await prisma.trendsArchive.upsert({
    where: { week },
    update: { totalVotes },
    create: {
      week,
      summaryMarkdown: '',
      totalVotes,
    },
  })

  // Delete all votes for this week
  await prisma.trendsVotes.deleteMany({ where: { week } })

  console.log(`✅ Reset complete. Week ${week} archived and votes cleared.`)
  console.log(`   Archived: ${votes.length} items, ${totalVotes} total votes`)
}

main()
  .catch((err) => {
    console.error('Error resetting trends:', err)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
