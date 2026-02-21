import type { NextConfig } from 'next'
import { getAllContent } from './lib/articles'
import { ItemType } from './lib/types'

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  serverExternalPackages: ['edge-tts'],
  async redirects() {
    const allContent = await getAllContent()
    const newsItems = allContent.filter((item) => item.itemType === ItemType.News)

    return newsItems.map((item) => ({
      source: `/articles/${item.slug}`,
      destination: `/news/${item.slug}`,
      permanent: true,
    }))
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
