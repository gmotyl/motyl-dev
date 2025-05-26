import { notFound } from "next/navigation"
import { getArticleBySlug, getAllArticles } from "@/lib/articles"
import Header from "@/components/header"
import Footer from "@/components/footer"

export async function generateStaticParams() {
  const articles = getAllArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug)

  if (!article) {
    return {
      title: "Article Not Found",
    }
  }

  return {
    title: article.title,
    description: article.excerpt,
  }
}

function renderMarkdown(content: string) {
  // Simple markdown to HTML conversion for basic content
  return content
    .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold mt-8 mb-4">$1</h1>')
    .replace(/^## (.*$)/gim, '<h2 class="text-3xl font-bold mt-6 mb-3">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="text-2xl font-bold mt-4 mb-2">$1</h3>')
    .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
    .replace(/\*(.*)\*/gim, "<em>$1</em>")
    .replace(
      /```([^`]+)```/gim,
      '<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg my-4 overflow-x-auto"><code>$1</code></pre>',
    )
    .replace(/`([^`]+)`/gim, '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>')
    .replace(/\n\n/gim, '</p><p class="my-4 leading-7">')
    .replace(/^(?!<[h|p|c])/gim, '<p class="my-4 leading-7">')
    .replace(/(?<!>)$/gim, "</p>")
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  const htmlContent = renderMarkdown(article.content)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-10">
        <article className="max-w-3xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
            <p className="text-muted-foreground">Published on {new Date(article.publishedAt).toLocaleDateString()}</p>
          </header>

          <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </article>
      </main>
      <Footer />
    </div>
  )
}
