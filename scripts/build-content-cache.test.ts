import { execFileSync } from 'node:child_process'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { afterAll, describe, expect, it } from 'vitest'

const REPO_ROOT = path.resolve(__dirname, '..')
const SCRIPT_PATH = path.join(REPO_ROOT, 'scripts', 'build-content-cache.ts')

// --- Date helpers — always relative to "now" so the fixture never rots ---

function daysAgoISODate(days: number): string {
  const date = new Date()
  date.setUTCDate(date.getUTCDate() - days)
  return date.toISOString().slice(0, 10)
}

// --- Fixture slugs, reused by assertions across this file (and Task 3's harness) ---

export const FIXTURE_SLUGS = {
  inWindowNews1: 'in-window-news-1',
  inWindowNews2: 'in-window-news-2',
  outOfWindowNews: 'out-of-window-news',
  oldArticle: 'old-article',
}

const SHARED_NEWS_TAG = 'shared'

export function newsFrontmatter(slug: string, publishedAt: string, hashtags: string): string {
  return `---
title: "${slug}"
slug: "${slug}"
publishedAt: "${publishedAt}"
hashtags: "${hashtags}"
excerpt: "excerpt for ${slug}"
---

Body content for ${slug}.

[an external link](https://example.com/${slug})
`
}

/**
 * Builds a temp fixture dir under os.tmpdir() with:
 * - one news item well inside the 3-month retention window
 * - a second news item inside the window (keeps the "shared" tag page alive post-filter)
 * - one news item ~a year old, outside the window
 * - one blog article dated years back (articles are never pruned)
 *
 * Structured as a standalone export so a second describe block (Task 3) can reuse it.
 */
export async function createFixture(): Promise<{ dir: string }> {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'motyl-content-cache-'))

  const articlesDir = path.join(dir, 'articles')
  const newsYearDir = path.join(dir, 'news', '2026')
  await fs.mkdir(articlesDir, { recursive: true })
  await fs.mkdir(newsYearDir, { recursive: true })

  // `pnpm exec tsx` refuses to run outside a pnpm workspace — a bare package.json satisfies it
  // without pulling this fixture into the real workspace (no pnpm-lock.yaml here).
  await fs.writeFile(
    path.join(dir, 'package.json'),
    JSON.stringify({ name: 'build-content-cache-fixture', private: true })
  )

  await fs.writeFile(
    path.join(newsYearDir, `${FIXTURE_SLUGS.inWindowNews1}.md`),
    newsFrontmatter(FIXTURE_SLUGS.inWindowNews1, daysAgoISODate(10), `#${SHARED_NEWS_TAG}`)
  )
  await fs.writeFile(
    path.join(newsYearDir, `${FIXTURE_SLUGS.inWindowNews2}.md`),
    newsFrontmatter(FIXTURE_SLUGS.inWindowNews2, daysAgoISODate(20), `#${SHARED_NEWS_TAG}`)
  )
  await fs.writeFile(
    path.join(newsYearDir, `${FIXTURE_SLUGS.outOfWindowNews}.md`),
    newsFrontmatter(FIXTURE_SLUGS.outOfWindowNews, daysAgoISODate(400), `#${SHARED_NEWS_TAG}`)
  )
  await fs.writeFile(
    path.join(articlesDir, `${FIXTURE_SLUGS.oldArticle}.md`),
    newsFrontmatter(FIXTURE_SLUGS.oldArticle, daysAgoISODate(365 * 5), '#blogtag')
  )

  return { dir }
}

export function runPrebuild(fixtureDir: string): string {
  return execFileSync('pnpm', ['exec', 'tsx', SCRIPT_PATH], {
    cwd: fixtureDir,
    encoding: 'utf8',
  })
}

async function readJSON(filePath: string): Promise<any> {
  return JSON.parse(await fs.readFile(filePath, 'utf8'))
}

async function readJSONDir(dirPath: string): Promise<Record<string, any>> {
  const files = await fs.readdir(dirPath)
  const entries = await Promise.all(
    files.map(async (name) => [name, await readJSON(path.join(dirPath, name))] as const)
  )
  return Object.fromEntries(entries)
}

async function cleanupFixture(dir: string): Promise<void> {
  await fs.rm(dir, { recursive: true, force: true })
}

describe('build-content-cache retention window', () => {
  const fixtures: string[] = []

  afterAll(async () => {
    await Promise.all(fixtures.map((dir) => cleanupFixture(dir)))
  })

  async function setupAndRun(): Promise<{ dir: string; output: string }> {
    const { dir } = await createFixture()
    fixtures.push(dir)
    const output = runPrebuild(dir)
    return { dir, output }
  }

  it('keeps in-window news and drops out-of-window news from the module cache', async () => {
    const { dir } = await setupAndRun()

    const cache = await readJSON(path.join(dir, 'data', 'content-cache.json'))
    const slugs = cache.items.map((item: any) => item.slug)

    expect(slugs).toContain(FIXTURE_SLUGS.inWindowNews1)
    expect(slugs).toContain(FIXTURE_SLUGS.inWindowNews2)
    expect(slugs).not.toContain(FIXTURE_SLUGS.outOfWindowNews)
  })

  it('keeps blog articles no matter how old they are', async () => {
    const { dir } = await setupAndRun()

    const cache = await readJSON(path.join(dir, 'data', 'content-cache.json'))
    const slugs = cache.items.map((item: any) => item.slug)

    expect(slugs).toContain(FIXTURE_SLUGS.oldArticle)
  })

  it('warns with a count of skipped out-of-window items and still exits 0', async () => {
    // execFileSync throws if the process exits non-zero, so a successful call already proves exit 0.
    const { output } = await setupAndRun()

    expect(output).toMatch(/skipped 1 news item/i)
  })

  it('excludes pruned slugs from batches, tag pages, manifest and hashtag stats', async () => {
    const { dir } = await setupAndRun()

    const batches = await readJSONDir(path.join(dir, 'public', 'data', 'batches'))
    const tags = await readJSONDir(path.join(dir, 'public', 'data', 'tags'))
    const manifest = await readJSON(path.join(dir, 'public', 'data', 'manifest.json'))
    const hashtagStats = await readJSON(path.join(dir, 'data', 'hashtag-stats.json'))

    const serializedBatches = JSON.stringify(batches)
    const serializedTags = JSON.stringify(tags)

    expect(serializedBatches).not.toContain(FIXTURE_SLUGS.outOfWindowNews)
    expect(serializedTags).not.toContain(FIXTURE_SLUGS.outOfWindowNews)
    expect(JSON.stringify(manifest)).not.toContain(FIXTURE_SLUGS.outOfWindowNews)

    // The "shared" tag page must exist (2 retained news items still share it) and must not
    // count/carry the pruned item.
    expect(tags['news-shared.json']).toBeDefined()
    expect(tags['news-shared.json']).toHaveLength(2)

    expect(manifest.news.total).toBe(2)
    expect(manifest.tags[SHARED_NEWS_TAG].news).toBe(2)

    expect(hashtagStats.frequency[SHARED_NEWS_TAG]).toBe(2)
  })
})
