import Header from '@/components/header'
import Footer from '@/components/footer'

export default function UnsubscribePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container max-w-md mx-auto px-4 py-12 md:py-16 space-y-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Unsubscribe</h1>
          <div className="space-y-3">
            <p className="text-muted-foreground">
              Every issue of motyl.dev Weekly carries its own link: click the Unsubscribe link at
              the bottom of any issue and you are removed from the list immediately.
            </p>
            <p className="text-sm text-muted-foreground">
              Having trouble? Just reply to any issue and I&apos;ll take care of it.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
