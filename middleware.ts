import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/**
 * Lightweight middleware for route protection
 *
 * Note: We don't use NextAuth's auth() middleware here to avoid
 * bundling Prisma into the Edge Runtime (1MB limit).
 *
 * Instead, we rely on:
 * 1. API routes checking auth via auth() server-side
 * 2. Client components checking session via useSession()
 * 3. This middleware just provides a UX hint by redirecting unauthenticated users
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Check for session token cookie
  const sessionToken = req.cookies.get('authjs.session-token') ||
                       req.cookies.get('__Secure-authjs.session-token')

  // Protect /bookmarks page - redirect to home if no session
  if (pathname.startsWith("/bookmarks") && !sessionToken) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  // Let API routes handle their own auth (they use auth() server-side)
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/bookmarks/:path*",
    // Don't match API routes - they handle auth themselves
  ],
}
