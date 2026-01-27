import { Skeleton } from '@/components/ui/skeleton'

export function ContentListingSkeleton() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container py-10">
        {/* Title */}
        <Skeleton className="h-9 w-32 mb-2" />
        {/* Description */}
        <Skeleton className="h-5 w-80 max-w-full mb-8" />

        {/* Filter bar */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-9 w-48" />
          </div>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-20 rounded-md" />
            ))}
          </div>
        </div>

        {/* Item count */}
        <Skeleton className="h-4 w-44 mb-6" />

        {/* Card grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-lg border p-6 flex flex-col gap-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-24 mt-auto" />
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
