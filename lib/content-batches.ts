import { promises as fs } from 'fs'
import path from 'path'
import { cache } from 'react'

export interface TrimmedItem {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  hashtags: string[]
  itemType: string
  image?: string
  sourcePattern?: string
}

export interface ContentManifest {
  generatedAt: string
  news: { batches: number; total: number }
  articles: { batches: number; total: number }
  tags: Record<string, { news: number; articles: number }>
}

const dataDir = path.join(process.cwd(), 'public', 'data')

export const readManifest = cache(async (): Promise<ContentManifest> => {
  const raw = await fs.readFile(path.join(dataDir, 'manifest.json'), 'utf8')
  return JSON.parse(raw)
})

export const readBatch = cache(async (contentType: string, index: number): Promise<TrimmedItem[]> => {
  const filePath = path.join(dataDir, 'batches', `${contentType}-${index}.json`)
  const raw = await fs.readFile(filePath, 'utf8')
  return JSON.parse(raw)
})
