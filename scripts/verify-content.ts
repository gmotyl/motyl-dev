/**
 * Content verification script - validates markdown files have valid YAML frontmatter.
 * Run with: pnpm verify
 * Used by pre-commit hook to prevent invalid content from being committed.
 */

import { execSync } from 'node:child_process'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'
import yaml from 'js-yaml'

const ROOT_DIR = process.cwd()
const ARTICLES_DIR = join(ROOT_DIR, 'articles')
const NEWS_DIR = join(ROOT_DIR, 'news')

const matterOptions = {
  engines: {
    yaml: (s: string) => yaml.load(s) as object,
  },
}

interface ValidationError {
  file: string
  error: string
}

function getChangedFiles(): string[] {
  // Check for staged files first (pre-commit scenario)
  try {
    const staged = execSync('git diff --cached --name-only --diff-filter=ACM', {
      encoding: 'utf8',
    }).trim()
    if (staged) {
      return staged.split('\n').filter(
        (f) => f.endsWith('.md') && (f.startsWith('articles/') || f.startsWith('news/'))
      )
    }
  } catch {
    // Not in a git repo or no staged files
  }

  // Fall back to checking all content files
  return []
}

function getAllContentFiles(): string[] {
  const files: string[] = []

  // Articles
  try {
    const articleFiles = readdirSync(ARTICLES_DIR)
      .filter((f) => f.endsWith('.md'))
      .map((f) => join('articles', f))
    files.push(...articleFiles)
  } catch {
    // Directory doesn't exist
  }

  // News (year subdirectories)
  try {
    const years = readdirSync(NEWS_DIR, { withFileTypes: true })
      .filter((d) => d.isDirectory() && /^\d{4}$/.test(d.name))
      .map((d) => d.name)

    for (const year of years) {
      const yearDir = join(NEWS_DIR, year)
      const newsFiles = readdirSync(yearDir)
        .filter((f) => f.endsWith('.md'))
        .map((f) => join('news', year, f))
      files.push(...newsFiles)
    }
  } catch {
    // Directory doesn't exist
  }

  return files
}

function validateFile(filePath: string): ValidationError | null {
  const fullPath = join(ROOT_DIR, filePath)

  try {
    const content = readFileSync(fullPath, 'utf8')
    const { data } = matter(content, matterOptions)

    // Check required fields
    const requiredFields = ['title', 'slug', 'publishedAt']
    const missingFields = requiredFields.filter((f) => !data[f])

    if (missingFields.length > 0) {
      return {
        file: filePath,
        error: `Missing required fields: ${missingFields.join(', ')}`,
      }
    }

    return null
  } catch (error) {
    return {
      file: filePath,
      error: (error as Error).message.split('\n')[0], // First line of error
    }
  }
}

function main(): void {
  const args = process.argv.slice(2)
  const checkAll = args.includes('--all')

  let files: string[]

  if (checkAll) {
    console.log('Verifying all content files...\n')
    files = getAllContentFiles()
  } else {
    files = getChangedFiles()
    if (files.length === 0) {
      console.log('No staged .md files to verify. Use --all to check all files.\n')
      files = getAllContentFiles()
      console.log(`Verifying all ${files.length} content files...\n`)
    } else {
      console.log(`Verifying ${files.length} staged file(s)...\n`)
    }
  }

  const errors: ValidationError[] = []

  for (const file of files) {
    const error = validateFile(file)
    if (error) {
      errors.push(error)
      console.log(`✗ ${file}`)
      console.log(`  ${error.error}\n`)
    } else {
      console.log(`✓ ${file}`)
    }
  }

  console.log('')

  if (errors.length > 0) {
    console.error(`\n❌ ${errors.length} file(s) failed validation`)
    process.exit(1)
  } else {
    console.log(`✅ All ${files.length} file(s) passed validation`)
  }
}

main()
