"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useRouter } from "next/navigation"
import { db } from "@/lib/db"

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [articles, setArticles] = useState([])
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

    // Fetch articles
    const fetchArticles = async () => {
      const fetchedArticles = await db.article.findMany()
      setArticles(fetchedArticles)
      setIsLoading(false)
    }

    fetchArticles()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("admin-session")
    router.push("/login")
  }

  const handleDeleteArticle = async (id) => {
    await db.article.delete({ where: { id } })
    setArticles(articles.filter((article) => article.id !== id))
  }

  // If loading, show loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
          <p>Loading...</p>
        </main>
        <Footer />
      </div>
    )
  }

  // If not logged in, don't render anything (will redirect)
  if (!isLoggedIn) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button onClick={() => router.push("/admin/new-article")}>New Article</Button>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Articles</CardTitle>
              <CardDescription>Manage your published articles</CardDescription>
            </CardHeader>
            <CardContent>
              {articles.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No articles yet. Create your first one!</p>
              ) : (
                <div className="space-y-4">
                  {articles.map((article) => (
                    <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{article.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(article.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => router.push(`/admin/edit/${article.id}`)}>
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteArticle(article.id)}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
