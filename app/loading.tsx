import { Skeleton } from '@/components/ui/skeleton'
import Header from '@/components/header'
import Footer from '@/components/footer'

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container max-w-3xl mx-auto px-4 py-12 md:py-16 space-y-12">

          {/* Newsletter */}
          <section className="rounded-lg border border-primary/20 bg-primary/5 p-6 md:p-8 space-y-4 text-center">
            <Skeleton className="h-8 w-56 mx-auto" />
            <Skeleton className="h-4 w-72 max-w-full mx-auto" />
            <Skeleton className="h-10 w-full max-w-sm mx-auto rounded-md" />
          </section>

          {/* Hero */}
          <section className="space-y-3">
            <Skeleton className="h-10 w-80 max-w-full" />
            <Skeleton className="h-5 w-40" />
          </section>

          {/* Trending */}
          <section className="space-y-3">
            <Skeleton className="h-7 w-44" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-lg border p-4 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-24" />
                </div>
              ))}
            </div>
          </section>

          {/* Blog articles */}
          <section className="space-y-3">
            <Skeleton className="h-7 w-40" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-lg border border-muted bg-background/50 p-4 space-y-2">
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-28" />
                </div>
              ))}
            </div>
          </section>

          {/* Support CTA */}
          <section className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-6 md:p-8 space-y-4 text-center">
            <Skeleton className="h-8 w-52 mx-auto" />
            <Skeleton className="h-4 w-72 max-w-full mx-auto" />
            <Skeleton className="h-10 w-40 mx-auto rounded-full" />
          </section>

        </div>
      </main>
      <Footer />
    </div>
  )
}
