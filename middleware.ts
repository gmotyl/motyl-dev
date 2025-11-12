import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { pathname } = req.nextUrl

  // Protect /bookmarks page and /api/bookmarks routes
  if (pathname.startsWith("/bookmarks") || pathname.startsWith("/api/bookmarks")) {
    if (!req.auth) {
      // Redirect to home page if not authenticated
      return NextResponse.redirect(new URL("/", req.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/bookmarks/:path*", "/api/bookmarks/:path*"],
}
