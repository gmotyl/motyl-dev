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

  // Logged-out gating: bookmarks + SuperAdmin-only news routes
  const needsSession =
    pathname.startsWith('/bookmarks') ||
    pathname.startsWith('/news') ||
    pathname.startsWith('/read-all-news')
  if (needsSession && !sessionToken) {
    const target = pathname.startsWith('/bookmarks')
      ? new URL('/', req.url)
      : new URL(`/api/auth/signin?callbackUrl=${encodeURIComponent(pathname)}`, req.url)
    return NextResponse.redirect(target)
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
    '/news/:path*',
    '/bookmarks/:path*',
    '/read-all-news/:path*',
    '/api/content',
  ],
}
