import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getArticleBySlug, getAllArticles } from "@/lib/articles"
import Header from "@/components/header"
import Footer from "@/components/footer"
import components from "@/components/mdx-components"

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

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-10">
        <article className="max-w-3xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
            <p className="text-muted-foreground">Published on {new Date(article.publishedAt).toLocaleDateString()}</p>
          </header>

          <div className="prose prose-invert max-w-none">
            <MDXRemote source={article.content} components={components} />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
