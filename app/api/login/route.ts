import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    // In a real app, you would:
    // 1. Validate the input
    // 2. Check the credentials against a database
    // 3. Hash the password and compare it securely

    const user = await db.user.findUnique({ where: { username } })

    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Set a cookie to maintain the session
    // In a real app, you would use a more secure session mechanism
    cookies().set("admin-session", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
