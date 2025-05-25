import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { db, generateSlug } from "@/lib/db"

export async function POST(request: Request) {
  try {
    // Check if user is logged in
    const cookieStore = cookies()
    const isLoggedIn = cookieStore.get("admin-session")?.value === "true"

    if (!isLoggedIn) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, content, excerpt, slug } = await request.json()

    // Validate input
    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    // Generate slug if not provided
    const articleSlug = slug || generateSlug(title)

    // Create article
    const article = await db.article.create({
      title,
      content,
      excerpt: excerpt || title,
      slug: articleSlug,
    })

    return NextResponse.json(article, { status: 201 })
  } catch (error) {
    console.error("Create article error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const articles = await db.article.findMany()
    return NextResponse.json(articles)
  } catch (error) {
    console.error("Get articles error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
