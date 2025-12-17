import { promises as fs } from 'fs'
import path from 'path'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { MarkdownContent } from '@/components/markdown-content'
import { WakeLockToggle } from '@/components/wake-lock-toggle'
import { ArticleExternalLinks } from '@/components/article-external-links'
import { HashtagsList } from '@/components/hashtags-list'
import { ArticleScrollHandler } from '@/components/article-scroll-handler'
import { Breadcrumb } from '@/components/breadcrumb'
import { ArticleViewTracker } from '@/components/article-view-tracker'
import { ShareAIButton } from '@/components/share-ai-button'
import { ArticleNavigation } from '@/components/article-navigation'
import { type ContentItem } from '@/lib/articles'

interface ContentPageProps {
  article: ContentItem;
  prevArticle: ContentItem | null;
  nextArticle: ContentItem | null;
}

export async function ContentPage({ article, prevArticle, nextArticle }: ContentPageProps) {
  const translatePromptPath = path.join(process.cwd(), 'public', 'SUMMARY_PROMPT.md');
  const translatePrompt = await fs.readFile(translatePromptPath, 'utf-8');

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

  const isNewsArticle = article.itemType === 'news';
  const parentSection = isNewsArticle ? 'News' : 'Articles';
  const parentPath = isNewsArticle ? '/news' : '/articles';

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
        item: `https://motyl.dev${parentPath}/${article.slug}`,
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
      <ArticleViewTracker slug={article.slug} />
      <ArticleScrollHandler />
      <main className="flex-1 container py-10">
        <article className="max-w-3xl mx-auto">
          <Breadcrumb
            items={[
              { label: parentSection, href: parentPath },
              { label: article.title, href: `${parentPath}/${article.slug}` },
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
}
