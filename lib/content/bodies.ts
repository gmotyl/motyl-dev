import type { ExternalLink } from '@/lib/content/types'

export interface NewsBody {
  content: string
  externalLinks?: ExternalLink[]
}

/** Base URL for body assets: BASE_URL → https://${VERCEL_URL} → http://localhost:3000 */
export function bodyAssetBaseUrl(): string {
  const base = process.env.BASE_URL
  if (base) {
    return base.replace(/\/+$/, '')
  }

  const vercelUrl = process.env.VERCEL_URL
  if (vercelUrl) {
    return `https://${vercelUrl}`.replace(/\/+$/, '')
  }

  return 'http://localhost:3000'
}

/** Fetches <base>/data/items/<slug>.json. Returns null on 404 / network error / bad JSON, after logging. */
export async function getNewsBody(slug: string): Promise<NewsBody | null> {
  const url = `${bodyAssetBaseUrl()}/data/items/${encodeURIComponent(slug)}.json`

  try {
    const response = await fetch(url, { cache: 'force-cache' })

    if (!response.ok) {
      console.error(`getNewsBody: failed to fetch ${url} (status ${response.status})`)
      return null
    }

    const data = await response.json()

    if (!data || typeof data.content !== 'string') {
      console.error(`getNewsBody: malformed body payload at ${url}`)
      return null
    }

    return data as NewsBody
  } catch (error) {
    console.error(`getNewsBody: error fetching ${url}`, error)
    return null
  }
}
