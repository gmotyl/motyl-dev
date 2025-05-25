"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ArticleEditor from "@/components/article-editor"
import { db } from "@/lib/db"

export default function EditArticlePage() {
  const [article, setArticle] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string

  useEffect(() => {
    // Check if user is logged in
    const adminSession = localStorage.getItem("admin-session")

    if (adminSession !== "true") {
      // Redirect to login page if not logged in
      router.push("/login")
      return
    }

    setIsLoggedIn(true)

    // Fetch the article
    const fetchArticle = async () => {
      if (id) {
        const fetchedArticle = await db.article.findUnique({
          where: { id },
        })

        if (fetchedArticle) {
          setArticle(fetchedArticle)
        } else {
          router.push("/admin")
        }
      }
      setIsLoading(false)
    }

    fetchArticle()
  }, [id, router])

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

  // If not logged in or no article found, don't render the page content
  if (!isLoggedIn || !article) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-10">
        <h1 className="text-3xl font-bold mb-8">Edit Article</h1>
        <ArticleEditor article={article} />
      </main>
      <Footer />
    </div>
  )
}
