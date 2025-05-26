import Header from "@/components/header"
import Footer from "@/components/footer"
import { getAllArticles } from "@/lib/articles"
import Link from "next/link"

export default function ArticlesPage() {
  const articles = getAllArticles()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-10">
        <h1 className="text-3xl font-bold mb-8">All Articles</h1>

        {articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No articles published yet.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="rounded-lg border bg-background/50 backdrop-blur-sm p-6 transition-all hover:border-primary/50 hover:shadow-md flex flex-col"
              >
                <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                <p className="text-muted-foreground flex-grow line-clamp-3">{article.excerpt}</p>
                <p className="text-xs text-muted-foreground mt-4">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </p>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
