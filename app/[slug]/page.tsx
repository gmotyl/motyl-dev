"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { db } from "@/lib/db"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ArticlePage() {
  const [article, setArticle] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const params = useParams()
  const router = useRouter()
  const slug = params?.slug as string

  useEffect(() => {
    const fetchArticle = async () => {
      if (slug) {
        const fetchedArticle = await db.article.findUnique({
          where: { slug },
        })

        if (fetchedArticle) {
          setArticle(fetchedArticle)
        } else {
          router.push("/")
        }
      }
      setIsLoading(false)
    }

    fetchArticle()
  }, [slug, router])

  // Function to render markdown with syntax highlighting
  function renderArticleContent(content: string) {
    // Replace code blocks with syntax highlighted versions
    const html = content
      .replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
        return `<pre class="bg-muted p-4 rounded-md overflow-x-auto"><code class="language-${lang || "text"}">${code}</code></pre>`
      })
      .replace(/`([^`]+)`/g, '<code class="bg-muted px-1 py-0.5 rounded">$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>")
      .replace(/#{6}\s+(.+)/g, '<h6 class="text-lg font-bold mt-6 mb-2">$1</h6>')
      .replace(/#{5}\s+(.+)/g, '<h5 class="text-xl font-bold mt-6 mb-2">$1</h5>')
      .replace(/#{4}\s+(.+)/g, '<h4 class="text-2xl font-bold mt-6 mb-2">$1</h4>')
      .replace(/#{3}\s+(.+)/g, '<h3 class="text-3xl font-bold mt-8 mb-4">$1</h3>')
      .replace(/#{2}\s+(.+)/g, '<h2 class="text-4xl font-bold mt-10 mb-4">$1</h2>')
      .replace(/#{1}\s+(.+)/g, '<h1 class="text-5xl font-bold mt-12 mb-6">$1</h1>')
      .replace(/\n\n/g, '</p><p class="my-4">')
      .replace(/\n/g, "<br />")

    return `<p class="my-4">${html}</p>`
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p>Loading...</p>
        </main>
        <Footer />
      </div>
    )
  }

  // If article not found, don't render the page content
  if (!article) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-10">
        <article className="max-w-3xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
            <p className="text-muted-foreground">Published on {new Date(article.createdAt).toLocaleDateString()}</p>
          </header>

          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: renderArticleContent(article.content) }}
          />
        </article>
      </main>
      <Footer />
    </div>
  )
}
