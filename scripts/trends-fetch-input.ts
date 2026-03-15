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

// --- URL normalization ---

function normalizeUrl(url: string): string {
  try {
    const u = new URL(url)
    u.search = ''
    u.hash = ''
    const pathname = u.pathname.replace(/\/+$/, '') || '/'
    return `${u.protocol}//${u.hostname.toLowerCase()}${pathname}`
  } catch {
    return url.toLowerCase().replace(/[?#].*$/, '').replace(/\/+$/, '')
  }
}

// --- Issue numbering ---

async function getNextIssueNumber(): Promise<number> {
  const trendsDir = path.join(process.cwd(), 'content', 'trends')
  let files: string[]
  try {
    files = await fs.readdir(trendsDir)
  } catch {
    return 1
  }

  const numbers = files
    .map((f) => {
      const match = f.match(/motyl-dev-(\d+)\.md/)
      return match ? parseInt(match[1]) : 0
    })
    .filter((n) => n > 0)

  if (numbers.length === 0) return 1
  return Math.max(...numbers) + 1
}

// --- Content cache loading ---

interface ContentCacheItem {
  slug: string
  title: string
  content: string
  publishedAt: string
  itemType: string
  externalLinks: Array<{ title: string; url: string; order: number }>
}

async function loadContentUrlMap(): Promise<Map<string, { slug: string; itemType: string; publishedAt: string }>> {
  const cachePath = path.join(process.cwd(), 'data', 'content-cache.json')
  const raw = await fs.readFile(cachePath, 'utf8')
  const cache = JSON.parse(raw) as { items: ContentCacheItem[] }

  const map = new Map<string, { slug: string; itemType: string; publishedAt: string }>()
  for (const item of cache.items) {
    for (const link of item.externalLinks ?? []) {
      const normalized = normalizeUrl(link.url)
      // First match wins (don't overwrite)
      if (!map.has(normalized)) {
        map.set(normalized, {
          slug: item.slug,
          itemType: item.itemType,
          publishedAt: item.publishedAt,
        })
      }
    }
  }
  return map
}

// --- Main ---

async function main() {
  const week = getCurrentWeek()
  const weekLabel = getWeekLabel(week)

  // Ensure content/trends/ directory exists
  const trendsDir = path.join(process.cwd(), 'content', 'trends')
  await fs.mkdir(trendsDir, { recursive: true })

  // Load content cache URL map
  const urlMap = await loadContentUrlMap()

  // Determine next issue number
  const issueNumber = await getNextIssueNumber()

  // Fetch all active votes (stored with week='current', reset manually)
  const res = await fetch(`${PRODUCTION_API}?week=current`)
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
    console.log(`No active votes found. Nothing to generate.`)
    process.exit(0)
  }

  // Build flat items array — match URLs to content cache
  const items = votes.map((v) => {
    const normalized = normalizeUrl(v.linkUrl)
    const match = urlMap.get(normalized)
    return {
      title: v.title,
      linkUrl: v.linkUrl,
      category: v.category,
      contentSlug: match?.slug ?? null,
    }
  })

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
    issueNumber,
    generatedAt: new Date().toISOString(),
    items,
    byCategory,
  }

  const outputPath = path.join(process.cwd(), '.trends-input.json')
  await fs.writeFile(outputPath, JSON.stringify(output, null, 2), 'utf8')

  const matched = items.filter((i) => i.contentSlug).length
  console.log(`✅ Fetched ${items.length} items for ${week} (issue #${issueNumber}). ${matched}/${items.length} matched to content cache. Input saved to .trends-input.json`)
}

main().catch((err) => {
  console.error('Error fetching trends input:', err)
  process.exit(1)
})
