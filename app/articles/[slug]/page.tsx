import { notFound } from 'next/navigation'
import { getArticleBySlug, getAllArticleMetadata } from '@/lib/articles' // Use getAllArticleMetadata
import Header from '@/components/header'
import Footer from '@/components/footer'
import { ReadAloudButton } from '@/components/read-aloud-button'
import { ShareAIButton } from '@/components/share-ai-button'
import { ArticleNavigation } from '@/components/article-navigation'
import { promises as fs } from 'fs'
import path from 'path'
import { MarkdownContent } from '@/components/markdown-content'
import { WakeLockToggle } from '@/components/wake-lock-toggle'
import { ArticleExternalLinks } from '@/components/article-external-links'
import { HashtagsList } from '@/components/hashtags-list'
import { ArticleScrollHandler } from '@/components/article-scroll-handler'
import { Breadcrumb } from '@/components/breadcrumb'
import { ArticleViewTracker } from '@/components/article-view-tracker'

// Force static generation at build time
export const dynamic = 'force-static'
export const dynamicParams = false // Return 404 for unknown slugs (don't generate on-demand)

export async function generateStaticParams() {
  // Use metadata to generate static params, faster and more efficient
  const articles = await getAllArticleMetadata()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const { slug } = params
    const article = await getArticleBySlug(slug)

    if (!article) {
      return {
        title: 'Article Not Found',
      }
    }

    const baseUrl = 'https://motyl.dev'
    const articleUrl = `${baseUrl}/articles/${article.slug}`
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
      title: 'Error Loading Article',
    }
  }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  try {
    const { slug } = params
    const article = await getArticleBySlug(slug)

    if (!article) {
      notFound()
    }

    // Get all article metadata for navigation
    const allArticles = await getAllArticleMetadata()

    // Find the current article's index
    const currentIndex = allArticles.findIndex((a) => a.slug === slug)

    // Determine previous and next articles
    const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null
    const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null

    // Load the summary prompt
    const translatePromptPath = path.join(process.cwd(), 'public', 'SUMMARY_PROMPT.md')
    const translatePrompt = await fs.readFile(translatePromptPath, 'utf-8')

    // JSON-LD structured data for SEO
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.excerpt,
      author: {
        '@type': 'Person',
        name: 'Grzegorz Motyl',
        url: 'https://motyl.dev',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Motyl.dev',
        url: 'https://motyl.dev',
      },
      datePublished: article.publishedAt,
      dateModified: article.publishedAt,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://motyl.dev/articles/${article.slug}`,
      },
      keywords: article.hashtags.join(', '),
    }

    const isNewsArticle = article.hashtags.includes('generated')
    const parentSection = isNewsArticle ? 'News' : 'Articles'
    const parentPath = isNewsArticle ? '/news' : '/articles'

    const breadcrumbJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://motyl.dev',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: parentSection,
          item: `https://motyl.dev${parentPath}`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: article.title,
          item: `https://motyl.dev/articles/${article.slug}`,
        },
      ],
    }

    return (
      <div className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <Header />
        <ArticleViewTracker slug={slug} />
        <ArticleScrollHandler />
        <main className="flex-1 container py-10">
          <article className="max-w-3xl mx-auto">
            <Breadcrumb
              items={[
                { label: parentSection, href: parentPath },
                { label: article.title, href: `/articles/${article.slug}` },
              ]}
            />
            <header className="mb-8">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-4xl font-bold flex-1">{article.title}</h1>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-muted-foreground">
                  Published on{' '}
                  {new Date(article.publishedAt).toLocaleDateString('pl-PL', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </p>
                <div className="flex gap-2">
                  <WakeLockToggle />
                  {/* <ReadAloudButton hashtags={article.hashtags} /> */}
                  <ShareAIButton
                    prompt={translatePrompt}
                    articleSlug={article.slug}
                    buttonLabel="AI Review"
                    shareTitle="Review article with AI"
                    successMessage="Shared successfully! Now send the message and tap Read Aloud 🔊"
                    desktopSuccessMessage="Copied! Open ChatGPT or Gemini, paste, and use Read Aloud 🔊"
                  />
                </div>
              </div>
              <HashtagsList
                hashtags={article.hashtags}
                maxVisible={3}
                linkToArticles={true}
                className="mt-2"
              />
            </header>

            <MarkdownContent content={article.content} />

            {article.externalLinks && article.externalLinks.length > 0 && (
              <ArticleExternalLinks
                links={article.externalLinks}
                articleHashtags={article.hashtags}
                articleSlug={article.slug}
              />
            )}

            <ArticleNavigation prevArticle={prevArticle} nextArticle={nextArticle} />
          </article>
        </main>
        <Footer />
      </div>
    )
  } catch (error) {
    console.error('Error in ArticlePage:', error)
    throw error
  }
}
