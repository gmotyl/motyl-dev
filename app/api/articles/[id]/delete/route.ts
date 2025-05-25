import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"

export async function POST(_request: Request, { params }: { params: { id: string } }) {
  try {
    // Check if user is logged in
    const cookieStore = cookies()
    const isLoggedIn = cookieStore.get("admin-session")?.value === "true"

    if (!isLoggedIn) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Delete article
    await db.article.delete({
      where: { id: params.id },
    })

    // Redirect to admin page
    redirect("/admin")
  } catch (error) {
    console.error("Delete article error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
