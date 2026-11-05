/**
 * Cycle Reset: archive the live Trending Links into TrendsArchive and clear TrendsVotes.
 * Run manually after the Newsletter Issue PR has been merged.
 *
 * Delegates to the same `resetWeeklyVotes()` the /me reset panel uses, so both paths
 * clear every live vote (sentinel week `current`, ADR 0004) and archive the total under
 * the real ISO week label.
 *
 * Run with: pnpm trends:reset
 */

import path from 'path'
import { pathToFileURL } from 'url'
import { prisma } from '@/lib/db/prisma'
import { resetWeeklyVotes } from '@/lib/trends/trends'

export async function runTrendsReset() {
  return resetWeeklyVotes()
}

async function main() {
  const { week, archivedCount, totalVotes } = await runTrendsReset()
  console.log(`✅ Reset complete. Week ${week} archived and votes cleared.`)
  console.log(`   Archived: ${archivedCount} items, ${totalVotes} total votes`)
}

const entryPoint = process.argv[1]
if (entryPoint && import.meta.url === pathToFileURL(path.resolve(entryPoint)).href) {
  main()
    .catch((err) => {
      console.error('Error resetting trends:', err)
      process.exit(1)
    })
    .finally(() => prisma.$disconnect())
}
