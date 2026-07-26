import Header from '@/components/header'
import Footer from '@/components/footer'

// Chrome only. This layout is rendered into the publicly edge-cached /newsletter
// HTML, so it must never fetch session-specific data, and must not declare
// route segment config (e.g. `dynamic`) — that would cascade to /newsletter.
export default function DigestLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container max-w-6xl mx-auto px-4 py-10 md:py-14">{children}</div>
      </main>
      <Footer />
    </div>
  )
}
