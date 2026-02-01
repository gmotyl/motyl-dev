import { Skeleton } from '@/components/ui/skeleton'

export function ContentPageSkeleton() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container py-10">
        <article className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-4 w-16" />
            <span className="text-muted-foreground">/</span>
            <Skeleton className="h-4 w-48" />
          </div>

          {/* Header */}
          <header className="mb-8">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-10 w-full max-w-lg" />
                <Skeleton className="h-10 w-3/4 max-w-md" />
              </div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <Skeleton className="h-4 w-36" />
              <div className="flex gap-2">
                <Skeleton className="h-9 w-9 rounded-md" />
                <Skeleton className="h-9 w-24 rounded-md" />
              </div>
            </div>
            {/* Hashtags */}
            <div className="flex flex-wrap gap-2 mt-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-14 rounded-full" />
            </div>
          </header>

          {/* Content paragraphs */}
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />

            <div className="py-2" />

            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />

            <div className="py-2" />

            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-12 pt-6 border-t">
            <Skeleton className="h-10 w-32 rounded-md" />
            <Skeleton className="h-10 w-32 rounded-md" />
          </div>
        </article>
      </main>
    </div>
  )
}
