/**
 * Move news/**\/*.md files older than 3 months (publishedAt frontmatter)
 * into the motyl-dev-archive repo, then commit + push the archive.
 *
 * Run with: pnpm archive
 *
 * Env:
 *   MOTYL_ARCHIVE_PATH  override path to the archive repo
 *                       (default: ../motyl-dev-archive)
 *   MOTYL_ARCHIVE_MONTHS override the age cutoff in months (default: 3)
 */

import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'

const REPO_ROOT = process.cwd()
const SOURCE_NEWS = path.join(REPO_ROOT, 'news')
const ARCHIVE_REPO =
  process.env.MOTYL_ARCHIVE_PATH ||
  path.resolve(REPO_ROOT, '..', 'motyl-dev-archive')
const ARCHIVE_NEWS = path.join(ARCHIVE_REPO, 'news')
const MONTHS = Number(process.env.MOTYL_ARCHIVE_MONTHS ?? 3)

function fail(msg: string): never {
  console.error(`✘ ${msg}`)
  process.exit(1)
}

if (!fs.existsSync(SOURCE_NEWS)) fail(`No news folder at ${SOURCE_NEWS}`)
if (!fs.existsSync(path.join(ARCHIVE_REPO, '.git')))
  fail(`Archive repo not found at ${ARCHIVE_REPO} (set MOTYL_ARCHIVE_PATH)`)

const cutoff = new Date()
cutoff.setMonth(cutoff.getMonth() - MONTHS)
const cutoffStr = cutoff.toISOString().slice(0, 10)

function walk(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) return walk(full)
    if (e.isFile() && e.name.endsWith('.md')) return [full]
    return []
  })
}

function readPublishedAt(file: string): Date | null {
  const raw = fs.readFileSync(file, 'utf8')
  if (!raw.startsWith('---')) return null
  const end = raw.indexOf('\n---', 3)
  if (end < 0) return null
  const fm = raw.slice(3, end)
  const m = fm.match(/^publishedAt:\s*['"]?([0-9]{4}-[0-9]{2}-[0-9]{2})/m)
  if (!m) return null
  const d = new Date(m[1])
  return isNaN(d.getTime()) ? null : d
}

const moved: string[] = []
const skipped: string[] = []

for (const file of walk(SOURCE_NEWS)) {
  const pub = readPublishedAt(file)
  if (!pub) {
    skipped.push(path.relative(SOURCE_NEWS, file))
    continue
  }
  if (pub >= cutoff) continue

  const rel = path.relative(SOURCE_NEWS, file)
  const dest = path.join(ARCHIVE_NEWS, rel)
  fs.mkdirSync(path.dirname(dest), { recursive: true })
  fs.renameSync(file, dest)
  moved.push(rel)
}

if (skipped.length)
  console.warn(`! Skipped ${skipped.length} file(s) without a parseable publishedAt`)

if (moved.length === 0) {
  console.log(`Nothing to archive (cutoff: ${cutoffStr})`)
  process.exit(0)
}

console.log(`Archiving ${moved.length} file(s) older than ${cutoffStr}…`)

const sh = (cmd: string) =>
  execSync(cmd, { cwd: ARCHIVE_REPO, stdio: 'inherit' })

sh('git add -A')
sh(
  `git commit -m "archive: ${moved.length} files older than ${cutoffStr}"`
)
sh('git push')

console.log(`✓ Archived ${moved.length} file(s) to ${ARCHIVE_REPO}`)
console.log(
  '! Source files removed from motyl-dev/news — review and commit the deletions in motyl-dev when you are happy.'
)
