import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { describe, expect, it } from 'vitest'
import { prepareSpeechText } from '@/lib/tts/speech'

// Migration guard for the anytts swap: the prepared speech text of every
// corpus file must stay byte-for-byte what it was before the swap.
// Regenerate (on the pre-swap code only) with `UPDATE_GOLDEN=1`.
const REPO_ROOT = process.cwd()
const CORPUS_DIRS = ['news', 'articles', 'content']
const FIXTURE_PATH = join(REPO_ROOT, 'lib/tts/__fixtures__/prepared-speech-golden.json')

function listCorpusFiles(): string[] {
  const files: string[] = []
  for (const dir of CORPUS_DIRS) {
    const absDir = join(REPO_ROOT, dir)
    if (!existsSync(absDir)) continue
    for (const entry of readdirSync(absDir, { recursive: true, withFileTypes: true })) {
      if (!entry.isFile() || !/\.mdx?$/.test(entry.name)) continue
      // Repo-relative POSIX path, so the fixture keys are platform-independent.
      files.push(relative(REPO_ROOT, join(entry.parentPath, entry.name)).split(sep).join('/'))
    }
  }
  return files.sort()
}

function prepareCorpus(): Record<string, string> {
  const prepared: Record<string, string> = {}
  for (const file of listCorpusFiles()) {
    prepared[file] = prepareSpeechText(readFileSync(join(REPO_ROOT, file), 'utf8'))
  }
  return prepared
}

describe('prepareSpeechText golden', () => {
  it('prepareSpeechText output matches the pre-anytts golden for every corpus file', () => {
    const actual = prepareCorpus()
    expect(Object.keys(actual).length).toBeGreaterThan(0)

    if (process.env.UPDATE_GOLDEN === '1') {
      writeFileSync(FIXTURE_PATH, `${JSON.stringify(actual, null, 2)}\n`)
      return
    }

    const golden = JSON.parse(readFileSync(FIXTURE_PATH, 'utf8')) as Record<string, string>
    // Compare path lists and per-file mismatches instead of the whole map, so
    // a failure names the offending files rather than diffing megabytes.
    expect(Object.keys(actual)).toEqual(Object.keys(golden).sort())
    const mismatched = Object.keys(actual).filter((file) => actual[file] !== golden[file])
    expect(mismatched).toEqual([])
  })
})
