import Link from 'next/link'
import { WifiOff } from 'lucide-react'

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="rounded-full bg-primary/10 p-6">
            <WifiOff className="h-16 w-16 text-primary" />
          </div>
        </div>

        <h1 className="text-3xl font-bold">You're Offline</h1>

        <p className="text-muted-foreground text-lg">
          No internet connection detected. Don't worry, you can still browse previously visited articles.
        </p>

        <div className="space-y-3 pt-4">
          <Link
            href="/articles"
            className="block w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Browse Cached Articles
          </Link>

          <Link
            href="/"
            className="block w-full border border-primary/20 py-3 px-6 rounded-lg font-medium hover:bg-primary/5 transition-colors"
          >
            Return Home
          </Link>
        </div>

        <p className="text-sm text-muted-foreground pt-4">
          You'll be back online once your connection is restored.
        </p>
      </div>
    </div>
  )
}
