import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { verifySubscribeToken } from '@/lib/newsletter/subscribe-token'
import { ConfirmButton } from './confirm-button'

// The token is per-request and must be verified at request time.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Confirm your subscription - motyl.dev Weekly',
  robots: { index: false },
}

// Verifies the token only; confirming is a POST from the button, so mail link
// scanners that prefetch GET links cannot subscribe anyone.
export default async function ConfirmSubscriptionPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const { token } = await searchParams
  const validToken = typeof token === 'string' && verifySubscribeToken(token) ? token : null

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container max-w-md mx-auto px-4 py-12 md:py-16 space-y-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight">motyl.dev Weekly</h1>
          {validToken ? (
            <>
              <p className="text-muted-foreground">
                One last step: confirm you want to receive the newsletter.
              </p>
              <ConfirmButton token={validToken} />
            </>
          ) : (
            <p className="text-muted-foreground">
              This link is invalid or expired —{' '}
              <Link href="/newsletter" className="text-primary hover:underline">
                subscribe again
              </Link>
              .
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
