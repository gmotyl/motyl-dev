import { notFound } from 'next/navigation'
import { getArticleBySlug, getAllArticles } from '@/lib/articles'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { marked } from 'marked'
import * as emoji from 'node-emoji'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ReadAloudButton } from '@/components/read-aloud-button'
import { ArticleNavigation } from '@/components/article-navigation'

// Configure marked for better markdown rendering
marked.setOptions({
  gfm: true,
  breaks: true,
})

// Simple markdown content renderer with emoji support
function MarkdownContent({ content }: { content: string }) {
  // First, process emoji shortcodes like :rocket: -> 🚀
  const contentWithEmojis = emoji.emojify(content)

  // Then process markdown
  const htmlContent = marked.parse(contentWithEmojis)

  // Handle both sync and async cases
  if (typeof htmlContent === 'string') {
    return (
      <div
        className="prose prose-lg prose-invert max-w-none
                   prose-headings:text-white prose-headings:font-bold
                   prose-p:text-gray-300 prose-p:leading-relaxed
                   prose-strong:text-white prose-strong:font-semibold
                   prose-code:text-purple-300 prose-code:bg-gray-800 prose-code:px-1 prose-code:rounded
                   prose-pre:bg-gray-800 prose-pre:border prose-pre:border-gray-700
                   prose-blockquote:border-l-purple-500 prose-blockquote:text-gray-300
                   prose-a:text-purple-400 prose-a:no-underline hover:prose-a:underline
                   prose-ul:text-gray-300 prose-ol:text-gray-300
                   prose-li:text-gray-300"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    )
  }

  // Fallback for async case
  return (
    <div className="prose prose-lg prose-invert max-w-none">
      <p className="text-gray-300">Loading content...</p>
    </div>
  )
}

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

    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 container py-10">
          <article className="max-w-3xl mx-auto">
            <header className="mb-8">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-4xl font-bold flex-1">{article.title}</h1>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-muted-foreground">
                  Published on {new Date(article.publishedAt).toLocaleDateString()}
                </p>
                <ReadAloudButton />
              </div>
              {article.hashtags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {article.hashtags.map((hashtag) => (
                    <Link href={`/articles?hashtags=${hashtag}&mode=AND`} key={hashtag}>
                      <Badge
                        variant="secondary"
                        className="text-gray-900 font-medium bg-purple-200 hover:bg-purple-300 cursor-pointer transition-colors"
                      >
                        #{hashtag}
                      </Badge>
                    </Link>
                  ))}
                </div>
              )}
            </header>

            <MarkdownContent content={article.content} />

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
