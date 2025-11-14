"use client"

import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export default function VisitAllPage() {
  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    // Redirect to articles if not logged in
    if (status === "unauthenticated") {
      router.push("/articles")
    }
  }, [status, router])

  const handleMarkAllAsVisited = () => {
    // Get all article slugs from localStorage or mark all as visited
    const visitedArticles = localStorage.getItem("visitedArticles")
    const visited = visitedArticles ? JSON.parse(visitedArticles) : []

    // Fetch all articles and mark them as visited
    fetch("/api/articles")
      .then((res) => res.json())
      .then((data) => {
        const allSlugs = data.articles.map((article: { slug: string }) => article.slug)
        const uniqueSlugs = Array.from(new Set([...visited, ...allSlugs]))
        localStorage.setItem("visitedArticles", JSON.stringify(uniqueSlugs))
        router.push("/articles")
      })
      .catch((error) => {
        console.error("Error marking all articles as visited:", error)
        router.push("/articles")
      })
  }

  const handleCancel = () => {
    router.push("/articles")
  }

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-10 w-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
    )
  }

  // Don't render content if not authenticated (will redirect)
  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="h-6 w-6 text-primary" />
            <CardTitle>Mark All Articles as Visited</CardTitle>
          </div>
          <CardDescription>
            This action will mark all articles on the site as visited. This affects the "UNSEEN" filter on the articles page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to mark all articles as visited? This action will:
          </p>
          <ul className="list-disc list-inside mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Mark all current articles as read</li>
            <li>Hide all articles when using the "UNSEEN" filter</li>
            <li>This action cannot be undone (you'd need to manually clear your browser data)</li>
          </ul>
        </CardContent>
        <CardFooter className="flex gap-3">
          <Button variant="outline" onClick={handleCancel} className="flex-1">
            No, Go Back
          </Button>
          <Button onClick={handleMarkAllAsVisited} className="flex-1">
            Yes, Mark All as Visited
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
