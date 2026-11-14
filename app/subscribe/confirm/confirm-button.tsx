'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function ConfirmButton({ token }: { token: string }) {
  const [status, setStatus] = useState<Status>('idle')

  const confirm = async () => {
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="space-y-2">
        <p className="text-lg font-semibold">You&apos;re subscribed</p>
        <p className="text-muted-foreground">See you in your inbox on Sunday.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Button onClick={confirm} disabled={status === 'loading'} size="lg">
        Confirm subscription
      </Button>
      {status === 'error' && (
        <p role="alert" className="text-sm text-red-400">
          Something went wrong. Please try again, or subscribe again from the newsletter page.
        </p>
      )}
    </div>
  )
}
