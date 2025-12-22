import { MetadataRoute } from 'next';
import { getAllContentMetadata } from '@/lib/articles';
import { getContentUrl } from '@/lib/urls';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.BASE_URL || 'https://motyl.dev';

  const content = await getAllContentMetadata();

  const contentEntries: MetadataRoute.Sitemap = content.map((item) => {
    let lastModified: Date;
    try {
      lastModified = new Date(item.publishedAt);
      if (isNaN(lastModified.getTime())) {
        lastModified = new Date();
      }
    } catch {
      lastModified = new Date();
    }

    return {
      url: getContentUrl(item, true),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    };
  });

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  return [...staticPages, ...contentEntries];
}
