/**
 * Fetch current week's trend votes from production API and write to .trends-input.json.
 *
 * Standalone script — no database or server-side imports needed.
 * Run with: tsx scripts/trends-fetch-input.ts
 */

import path from 'node:path'
import fs from 'node:fs/promises'

const PRODUCTION_API = 'https://motyl.dev/api/trends/votes'

// --- ISO 8601 week logic (copied inline to avoid server imports) ---

function getCurrentWeek(): string {
  const date = new Date()

  // Find Thursday of the current week (ISO 8601: week belongs to the year of its Thursday)
  const day = date.getDay()
  const diff = date.getDate() - day + (day === 0 ? -3 : 4)
  const thursday = new Date(date.getFullYear(), date.getMonth(), diff)

  const year = thursday.getFullYear()

  // Find Thursday of week 1 (Jan 4 is always in week 1)
  const jan4 = new Date(year, 0, 4)
  const jan4Day = jan4.getDay()
  const jan4Diff = jan4.getDate() - jan4Day + (jan4Day === 0 ? -3 : 4)
  const weekOneThursday = new Date(year, 0, jan4Diff)

  const msPerWeek = 7 * 24 * 60 * 60 * 1000
  const weekNum =
    Math.floor((thursday.getTime() - weekOneThursday.getTime()) / msPerWeek) + 1

  return `${year}-w${String(weekNum).padStart(2, '0')}`
}

// --- Week label helper ---

function getWeekLabel(week: string): string {
  const [yearStr, weekStr] = week.split('-w')
  const year = parseInt(yearStr)
  const weekNum = parseInt(weekStr)

  // Compute Monday of that ISO week
  const jan4 = new Date(year, 0, 4)
  const jan4Day = jan4.getDay() === 0 ? 7 : jan4.getDay() // Mon=1..Sun=7
  const monday = new Date(jan4.getTime() - (jan4Day - 1) * 86400_000 + (weekNum - 1) * 7 * 86400_000)
  const sunday = new Date(monday.getTime() + 6 * 86400_000)

  const fmt = (d: Date) =>
    d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

  return `Week ${weekNum} (${fmt(monday)} – ${fmt(sunday)}, ${year})`
}

// --- Main ---

async function main() {
  const week = getCurrentWeek()
  const weekLabel = getWeekLabel(week)

  // Ensure content/trends/ directory exists
  const trendsDir = path.join(process.cwd(), 'content', 'trends')
  await fs.mkdir(trendsDir, { recursive: true })

  // Fetch votes from production API
  const res = await fetch(`${PRODUCTION_API}?week=${week}`)
  if (!res.ok) {
    throw new Error(`API request failed: ${res.status} ${res.statusText}`)
  }

  const data = await res.json()
  const votes: Array<{
    title: string
    linkUrl: string
    description: string
    category: string
    voteCount: number
    sourceDomain?: string | null
  }> = data.votes ?? []

  if (votes.length === 0) {
    console.log(`No votes found for ${week}. Nothing to generate.`)
    process.exit(0)
  }

  const totalVotes = votes.reduce((sum, v) => sum + v.voteCount, 0)

  // Build flat items array
  const items = votes.map((v) => ({
    title: v.title,
    linkUrl: v.linkUrl,
    description: v.description,
    category: v.category,
    voteCount: v.voteCount,
    sourceDomain: v.sourceDomain ?? null,
  }))

  // Group by category
  const byCategory: Record<string, typeof items> = {}
  for (const item of items) {
    const cat = item.category || 'other'
    if (!byCategory[cat]) byCategory[cat] = []
    byCategory[cat].push(item)
  }

  const output = {
    week,
    weekLabel,
    generatedAt: new Date().toISOString(),
    totalVotes,
    items,
    byCategory,
  }

  const outputPath = path.join(process.cwd(), '.trends-input.json')
  await fs.writeFile(outputPath, JSON.stringify(output, null, 2), 'utf8')

  console.log(`✅ Fetched ${totalVotes} votes for ${week}. Input saved to .trends-input.json`)
}

main().catch((err) => {
  console.error('Error fetching trends input:', err)
  process.exit(1)
})
