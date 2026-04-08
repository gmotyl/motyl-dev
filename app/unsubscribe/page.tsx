'use client'

import { useState } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'

export default function UnsubscribePage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container max-w-md mx-auto px-4 py-12 md:py-16 space-y-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Unsubscribe</h1>

          {status === 'success' ? (
            <div className="space-y-3">
              <p className="text-muted-foreground">
                You have been unsubscribed from motyl.dev Weekly.
              </p>
              <p className="text-sm text-muted-foreground">
                Sorry to see you go. You can always resubscribe from the{' '}
                <a href="/newsletter" className="text-primary hover:underline">newsletter page</a>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-muted-foreground">
                Enter your email to unsubscribe from the motyl.dev Weekly newsletter.
              </p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {status === 'loading' ? 'Unsubscribing...' : 'Unsubscribe'}
              </button>
              {status === 'error' && (
                <p className="text-sm text-red-400">Something went wrong. Please try again or email greg@motyl.dev.</p>
              )}
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}