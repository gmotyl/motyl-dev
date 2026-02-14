import { notFound } from 'next/navigation'
import { getContentItemBySlug, getAllContentMetadata } from '@/lib/articles'
import ContentPage from '@/components/content-page'
import { ItemType } from '@/lib/types'
import { getContentUrl } from '@/lib/urls'

// Force static generation at build time
export const dynamic = 'force-static'
export const dynamicParams = false // Return 404 for unknown slugs (don't generate on-demand)

export async function generateStaticParams() {
  const articles = (await getAllContentMetadata()).filter(p => p.itemType === ItemType.News);
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params: paramsPromise }: { params: Promise<{ slug: string }> }) {
  try {
    const params = await paramsPromise
    const { slug } = params
    const article = await getContentItemBySlug(slug)

    if (!article) {
      return {
        title: 'News Item Not Found',
      }
    }

    const articleUrl = getContentUrl(article, true)
    const keywords = article.hashtags.join(', ')

    return {
      title: article.title,
      description: article.excerpt,
      keywords: keywords,
      authors: [{ name: 'Grzegorz Motyl' }],
      creator: 'Grzegorz Motyl',
      publisher: 'Motyl.dev',
      alternates: {
        canonical: articleUrl,
      },
      openGraph: {
        type: 'article',
        title: article.title,
        description: article.excerpt,
        url: articleUrl,
        siteName: 'Motyl.dev',
        publishedTime: article.publishedAt,
        authors: ['Grzegorz Motyl'],
        tags: article.hashtags,
        locale: 'en_US',
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.excerpt,
        creator: '@motyldev',
        site: '@motyldev',
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    }
  } catch (error) {
    console.error('Error in generateMetadata:', error)
    return {
      title: 'Error Loading News Item',
    }
  }
}

export default async function NewsItemPage({ params: paramsPromise }: { params: Promise<{ slug: string }> }) {
  try {
    const params = await paramsPromise;
    const { slug } = params
    const article = await getContentItemBySlug(slug)

    if (!article) {
      notFound()
    }

    // Get all article metadata for navigation
    const allContent = await getAllContentMetadata()
    const allNews = allContent.filter(item => item.itemType === ItemType.News);

    // Find the current article's index
    const currentIndex = allNews.findIndex((a) => a.slug === slug)

    // Determine previous and next articles
    const prevArticle = currentIndex > 0 ? allNews[currentIndex - 1] : null
    const nextArticle = currentIndex < allNews.length - 1 ? allNews[currentIndex + 1] : null

    return <ContentPage article={article} prevArticle={prevArticle} nextArticle={nextArticle} />
  } catch (error) {
    console.error('Error in NewsItemPage:', error)
    throw error
  }
}
