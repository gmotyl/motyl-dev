import { getAllContent } from './lib/articles.ts';

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    const allContent = await getAllContent();
    const newsItems = allContent.filter((item) => item.itemType === 'news');

    return newsItems.map((item) => ({
      source: `/articles/${item.slug}`,
      destination: `/news/${item.slug}`,
      permanent: true,
    }));
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
    ];
  },
};

export default nextConfig;