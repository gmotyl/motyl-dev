'use server'

import { getContentItemBySlug } from './articles'

export interface ArticleExtract {
  slug: string
  title: string
  tldr: string | null
  keyTakeaways: string[] | null
}

export function extractTldr(content: string): string | null {
  const patterns = [
    /\*\*TLDR:\*\*\s*([\s\S]*?)(?=\n\n(?:\*\*|##|---|$))/i,
    /^###?\s+TLDR:?\s*\n\n([\s\S]*?)(?=\n\n(?:\*\*|##|---|$))/im,
  ]

  for (const pattern of patterns) {
    const match = content.match(pattern)
    if (match?.[1]?.trim()) {
      return match[1].trim()
    }
  }
  return null
}

export function extractKeyTakeaways(content: string): string[] | null {
  const patterns = [
    /\*\*Key takeaways:\*\*\s*\n([\s\S]*?)(?=\n\n(?:\*\*|##|---|$))/i,
    /^##\s+Key [A-Za-z\s]+\n\n([\s\S]*?)(?=\n\n(?:\*\*|##|---|$))/im,
  ]

  for (const pattern of patterns) {
    const match = content.match(pattern)
    if (match?.[1]?.trim()) {
      const bullets = match[1]
        .split('\n')
        .map(line => line.replace(/^[-*]\s+/, '').trim())
        .filter(line => line.length > 0)
      if (bullets.length > 0) return bullets
    }
  }
  return null
}

export async function extractArticleContent(slugs: string[]): Promise<ArticleExtract[]> {
  const results: ArticleExtract[] = []

  for (const slug of slugs) {
    const article = await getContentItemBySlug(slug)
    if (!article) {
      results.push({ slug, title: slug, tldr: null, keyTakeaways: null })
      continue
    }

    results.push({
      slug,
      title: article.title,
      tldr: extractTldr(article.content),
      keyTakeaways: extractKeyTakeaways(article.content),
    })
  }

  return results
}
