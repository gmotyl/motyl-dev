/**
 * In-memory mock for trends data — used in local dev when no real DB is configured.
 * Activated automatically when DATABASE_URL contains "dummy".
 *
 * Voting works in-memory and persists for the lifetime of the dev server process.
 */

type MockVote = {
  id: string
  week: string
  linkUrl: string
  title: string
  description: string | null
  category: string
  voteCount: number
  sourceDomain: string | null
  createdAt: Date
  updatedAt: Date
}

// Seed data — realistic-looking trending items
const SEED: MockVote[] = [
  {
    id: 'mock-1',
    week: 'CURRENT',
    linkUrl: 'https://react.dev/blog/2025/02/14/react-19',
    title: 'React 19 — What\'s New and Why It Matters',
    description: 'Server Components, Actions, use() hook, and the new compiler. The biggest React release in years.',
    category: 'frontend',
    voteCount: 142,
    sourceDomain: 'react.dev',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'mock-2',
    week: 'CURRENT',
    linkUrl: 'https://vercel.com/blog/turbopack-for-development-stable',
    title: 'Turbopack for Development is Now Stable',
    description: '700ms cold starts, instant HMR. Finally replaces Webpack in Next.js dev mode.',
    category: 'tools',
    voteCount: 98,
    sourceDomain: 'vercel.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'mock-3',
    week: 'CURRENT',
    linkUrl: 'https://anthropic.com/claude-3-7',
    title: 'Claude 3.7 Sonnet — Extended Thinking Mode',
    description: 'Hybrid reasoning model with toggle between instant and extended thinking. Outperforms on coding benchmarks.',
    category: 'ai',
    voteCount: 203,
    sourceDomain: 'anthropic.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'mock-4',
    week: 'CURRENT',
    linkUrl: 'https://biomejs.dev/blog/biome-v2',
    title: 'Biome v2 — The Eslint + Prettier Replacement Is Here',
    description: 'Plugins, import sorting, CSS support, and a VS Code extension. Rust-powered, zero config.',
    category: 'tools',
    voteCount: 76,
    sourceDomain: 'biomejs.dev',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'mock-5',
    week: 'CURRENT',
    linkUrl: 'https://github.com/microsoft/typescript/releases/tag/v5.8',
    title: 'TypeScript 5.8 — Granular Checks for Conditional Returns',
    description: 'Narrowing improvements, require() calls in ESM, and declaration emit performance. ',
    category: 'frontend',
    voteCount: 87,
    sourceDomain: 'github.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'mock-6',
    week: 'CURRENT',
    linkUrl: 'https://openai.com/index/gpt-4o-improvements',
    title: 'GPT-4o Gets Smarter at Code and Math',
    description: 'Latest snapshot improves reasoning, reduces hallucinations in function calls, better long-context.',
    category: 'ai',
    voteCount: 119,
    sourceDomain: 'openai.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'mock-7',
    week: 'CURRENT',
    linkUrl: 'https://fp-ts.github.io/fp-ts/guides/migration-v3',
    title: 'fp-ts v3 Migration Guide — Leaner, Faster, Better Inference',
    description: 'Dropped io-ts coupling, tree-shakeable modules, improved TypeScript performance.',
    category: 'frontend',
    voteCount: 44,
    sourceDomain: 'fp-ts.github.io',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'mock-8',
    week: 'CURRENT',
    linkUrl: 'https://cursor.sh/blog/shadow-workspace',
    title: 'Cursor Shadow Workspace — AI Edits Without Touching Your Files',
    description: 'AI works in an invisible parallel workspace, only applies changes when you approve.',
    category: 'ai',
    voteCount: 167,
    sourceDomain: 'cursor.sh',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

// In-memory mutable vote store (module-level = persists across requests in dev)
const mockStore = new Map<string, MockVote>()

function initStore(week: string) {
  if (mockStore.size === 0) {
    for (const item of SEED) {
      const key = `${week}:${item.linkUrl}`
      mockStore.set(key, { ...item, week })
    }
  }
}

function getSortedVotes(week: string): MockVote[] {
  initStore(week)
  return Array.from(mockStore.values())
    .filter((v) => v.week === week)
    .sort((a, b) => b.voteCount - a.voteCount || a.createdAt.getTime() - b.createdAt.getTime())
}

// --- Mock implementations of lib/trends.ts public API ---

export function mockGetHomepageFeed(week: string) {
  const trendings = getSortedVotes(week).slice(0, 20)
  const lastWeekSummary = {
    id: 'mock-archive',
    week: 'prev',
    summaryMarkdown: `## Frontend & AI Trends: Last Week\n\n**Frontend:** React 18 concurrent features adoption hit mainstream, TanStack Router hit v1.\n\n**AI:** Claude 3.5 Sonnet benchmarks shocked the industry. Cursor crossed 500k users.\n\n**Tools:** Vite 6 released with Environment API. pnpm 10 drops Node 16 support.`,
    totalVotes: 892,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  return { trendings, lastWeekSummary }
}

export function mockCastVote(
  week: string,
  linkUrl: string,
  title: string,
  description: string,
  category: string,
  sourceDomain?: string
) {
  initStore(week)
  const key = `${week}:${linkUrl}`
  const existing = mockStore.get(key)

  if (existing) {
    existing.voteCount += 1
    existing.updatedAt = new Date()
    mockStore.set(key, existing)
    return existing
  }

  const newItem: MockVote = {
    id: `mock-${Date.now()}`,
    week,
    linkUrl,
    title,
    description,
    category,
    voteCount: 1,
    sourceDomain: sourceDomain ?? null,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  mockStore.set(key, newItem)
  return newItem
}
