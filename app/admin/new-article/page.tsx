"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ArticleEditor from "@/components/article-editor"

export default function NewArticlePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const adminSession = localStorage.getItem("admin-session")

    if (adminSession !== "true") {
      // Redirect to login page if not logged in
      router.push("/login")
      return
    }

    setIsLoggedIn(true)
    setIsLoading(false)
  }, [router])

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

  // If not logged in, don't render the page content
  if (!isLoggedIn) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-10">
        <h1 className="text-3xl font-bold mb-8">Create New Article</h1>
        <ArticleEditor />
      </main>
      <Footer />
    </div>
  )
}
