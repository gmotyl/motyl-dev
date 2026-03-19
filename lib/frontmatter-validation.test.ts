// @vitest-environment node
import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import yaml from 'js-yaml'

const matterOptions = {
  engines: {
    yaml: (s: string) => yaml.load(s) as object,
  },
}

function collectMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const files: string[] = []
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...collectMarkdownFiles(fullPath))
    } else if (entry.name.endsWith('.md')) {
      files.push(fullPath)
    }
  }
  return files
}

const root = path.resolve(__dirname, '..')
const allFiles = [
  ...collectMarkdownFiles(path.join(root, 'articles')),
  ...collectMarkdownFiles(path.join(root, 'news')),
]

describe('Markdown frontmatter validation', () => {
  it('should parse every markdown file without YAML errors', () => {
    const failures: string[] = []
    for (const filePath of allFiles) {
      try {
        const contents = fs.readFileSync(filePath, 'utf8')
        matter(contents, matterOptions)
      } catch (err) {
        const rel = path.relative(root, filePath)
        failures.push(`${rel}: ${(err as Error).message.split('\n')[0]}`)
      }
    }
    if (failures.length > 0) {
      throw new Error(
        `${failures.length} file(s) have invalid YAML frontmatter:\n${failures.join('\n')}`
      )
    }
  })

  it('should have required fields (title, slug, publishedAt) in every markdown file', () => {
    const failures: string[] = []
    for (const filePath of allFiles) {
      try {
        const contents = fs.readFileSync(filePath, 'utf8')
        const { data } = matter(contents, matterOptions)
        const rel = path.relative(root, filePath)
        if (!data.title) failures.push(`${rel}: missing "title"`)
        if (!data.slug) failures.push(`${rel}: missing "slug"`)
        if (!data.publishedAt) failures.push(`${rel}: missing "publishedAt"`)
      } catch {
        // YAML parse errors are reported by the previous test
      }
    }
    if (failures.length > 0) {
      throw new Error(
        `${failures.length} file(s) are missing required frontmatter fields:\n${failures.join('\n')}`
      )
    }
  })
})
