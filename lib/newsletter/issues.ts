import fs from 'node:fs/promises'
import path from 'node:path'
import { cache } from 'react'
import yaml from 'js-yaml'

const DEFAULT_IMAGE = 'https://img.motyl.dev/greg-stanczyk.jpg'

export interface NewsletterIssue {
  issueNumber: number
  week: string
  weekLabel: string
  publishedAt: string
  image: string
  content: string
}

export type NewsletterMeta = Omit<NewsletterIssue, 'content'>

const TRENDS_DIR = path.join(process.cwd(), 'content', 'trends')

export function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!fmMatch) return { data: {}, content: raw }
  const data = (yaml.load(fmMatch[1]) as Record<string, unknown>) ?? {}
  return { data, content: fmMatch[2] }
}

export const getAllNewsletters = cache(async (): Promise<NewsletterIssue[]> => {
  let files: string[]
  try {
    files = await fs.readdir(TRENDS_DIR)
  } catch {
    return []
  }

  const newsletters: NewsletterIssue[] = []
  for (const file of files) {
    const match = file.match(/^motyl-dev-(\d+)\.md$/)
    if (!match) continue

    const raw = await fs.readFile(path.join(TRENDS_DIR, file), 'utf8')
    const { data, content } = parseFrontmatter(raw)

    if (!data.week || !data.weekLabel || !data.publishedAt) {
      console.warn(`Skipping newsletter file "${file}" due to missing required frontmatter fields.`)
      continue
    }

    newsletters.push({
      issueNumber: (data.issueNumber as number) ?? parseInt(match[1], 10),
      week: data.week as string,
      weekLabel: data.weekLabel as string,
      publishedAt: data.publishedAt as string,
      image: (data.image as string) ?? DEFAULT_IMAGE,
      content,
    })
  }

  // Sort by issue number descending (newest first)
  return newsletters.sort((a, b) => b.issueNumber - a.issueNumber)
})

export const getAllNewsletterMeta = cache(async (): Promise<NewsletterMeta[]> => {
  const all = await getAllNewsletters()
  return all.map(({ content, ...meta }) => meta)
})
