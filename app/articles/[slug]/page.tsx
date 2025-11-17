import { notFound } from 'next/navigation'
import { getArticleBySlug, getAllArticles } from '@/lib/articles'
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

export async function generateStaticParams() {
  const articles = await getAllArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
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
      authors: [{ name: 'Motyl.dev' }],
      creator: 'Motyl.dev',
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
        authors: ['Motyl.dev'],
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

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const article = await getArticleBySlug(slug)

    if (!article) {
      notFound()
    }

    // Get all articles for navigation
    const allArticles = await getAllArticles()

    // Load the summary prompt
    const translatePromptPath = path.join(process.cwd(), 'public', 'SUMMARY_PROMPT.md')
    const translatePrompt = await fs.readFile(translatePromptPath, 'utf-8')

    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <ArticleScrollHandler />
        <main className="flex-1 container py-10">
          <article className="max-w-3xl mx-auto">
            <header className="mb-8">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-4xl font-bold flex-1">{article.title}</h1>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-muted-foreground">
                  Published on {new Date(article.publishedAt).toLocaleDateString('pl-PL', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
                </p>
                <div className="flex gap-2">
                  <WakeLockToggle />
                  <ReadAloudButton hashtags={article.hashtags} />
                  <ShareAIButton
                    prompt={translatePrompt}
                    content={article.content}
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

            {/* External Links with Bookmark Functionality */}
            {article.externalLinks && article.externalLinks.length > 0 && (
              <ArticleExternalLinks
                links={article.externalLinks}
                articleHashtags={article.hashtags}
                articleSlug={article.slug}
              />
            )}

            <ArticleNavigation currentSlug={slug} allArticles={allArticles} />
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
