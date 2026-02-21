import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const requestHeaders = new Headers(req.headers)

  // Pass visitedArticles cookie as a header to Server Components
  const visitedCookie = req.cookies.get('visitedArticles')
  requestHeaders.set('x-visited-articles', visitedCookie?.value || '[]')

  // Check for session token cookie for auth
  const sessionToken = req.cookies.get('authjs.session-token') ||
                       req.cookies.get('__Secure-authjs.session-token')

  // Protect /bookmarks page - redirect to home if no session
  if (pathname.startsWith("/bookmarks") && !sessionToken) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  // Continue the request with the new headers
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: [
    '/articles/:path*',
    '/news/:path*',
    '/bookmarks/:path*',
    '/read-all-news/:path*',
    '/api/content',
  ],
}
