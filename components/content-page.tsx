import { promises as fs } from 'fs'
import path from 'path'
import Footer from '@/components/footer'
import { WakeLockToggle } from '@/components/wake-lock-toggle'
import { ArticleExternalLinks } from '@/components/article-external-links'
import { HashtagsList } from '@/components/hashtags-list'
import { ArticleScrollHandler } from '@/components/article-scroll-handler'
import { Breadcrumb } from '@/components/breadcrumb'
import { ArticleViewTracker } from '@/components/article-view-tracker'
import { ArticleNavigation } from '@/components/article-navigation'
import { BuyMeACoffeeButton } from '@/components/buy-me-a-coffee-button'
import { ArticleWrapper } from '@/components/article-wrapper'
import AdUnit from '@/components/ad-unit'
import { type Content, ItemType } from '@/lib/types'
import { getContentUrl } from '@/lib/urls'
import { ContentItemMetadata } from '@/lib/articles'
import { HeroImage } from '@/components/hero-image'

interface ContentPageProps {
  article: Content
  prevArticle: ContentItemMetadata | null
  nextArticle: ContentItemMetadata | null
}

export default async function ContentPage({ article, prevArticle, nextArticle }: ContentPageProps) {
  const translatePromptPath = path.join(process.cwd(), 'public', 'SUMMARY_PROMPT.md')
  const translatePrompt = await fs.readFile(translatePromptPath, 'utf-8')

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
      '@id': getContentUrl(article, true),
    },
    keywords: article.hashtags.join(', '),
  }

  const isNewsArticle = article.itemType === ItemType.News
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
        item: getContentUrl(article, true),
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
      <ArticleViewTracker slug={article.slug} />
      <ArticleScrollHandler />
      <main className="flex-1 container py-10">
        <article className="max-w-3xl mx-auto">
          <Breadcrumb
            items={[
              { label: parentSection, href: parentPath },
              { label: article.title, href: getContentUrl(article) },
            ]}
          />
          <header className="mb-8">
            <div className="mb-4">
              <h1 className="text-4xl font-bold leading-tight">{article.title}</h1>
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
              <WakeLockToggle />
            </div>
            <HashtagsList
              hashtags={article.hashtags}
              maxVisible={3}
              basePath={parentPath}
              className="mt-2"
            />
          </header>

          <HeroImage article={article} />

          <ArticleWrapper article={article} translatePrompt={translatePrompt} />

          <BuyMeACoffeeButton itemType={article.itemType} />

          <div className="my-6">
            <AdUnit
              pId="5937972178718571"
              adSlot="9945496480"
              adFormat="fluid"
              adLayout="in-article"
              style={{ display: 'block', textAlign: 'center' }}
            />
          </div>

          <ArticleExternalLinks article={article} />

          <div className="my-6">
            <AdUnit
              pId="5937972178718571"
              adSlot="3059705694"
              adFormat="autorelaxed"
              adLayout="in-article"
              style={{ display: 'block' }}
            />
          </div>

          <ArticleNavigation prevArticle={prevArticle} nextArticle={nextArticle} />
        </article>
      </main>
      <Footer />
    </div>
  )
}
