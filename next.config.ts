import type { NextConfig } from 'next'
import { getAllContent } from './lib/content/articles'
import { ItemType } from './lib/content/types'

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  serverExternalPackages: ['edge-tts'],
  async redirects() {
    // Legacy /articles/<news-slug> URLs have to land on /news/<slug>. Emitting one
    // redirect per news item pushed the build past Vercel's 2048-route limit, so
    // match everything that is *not* a real article slug in a single rule instead.
    const allContent = await getAllContent()
    const articleSlugs = allContent
      .filter((item) => item.itemType === ItemType.Article)
      .map((item) => item.slug)

    if (articleSlugs.length === 0) return []

    const escaped = articleSlugs.map((slug) => slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    const notAnArticle = escaped.map((slug) => `${slug}$`).join('|')

    return [
      {
        source: `/articles/:slug((?!${notAnArticle}).*)`,
        destination: '/news/:slug',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/',
          },
        ],
      },
    ]
  },
}

export default nextConfig
