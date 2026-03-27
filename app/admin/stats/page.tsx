import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { getPatternStats } from '@/lib/pattern-stats'
import { PatternStatsDashboard } from '@/components/pattern-stats-dashboard'
import Header from '@/components/header'
import Footer from '@/components/footer'

export default async function StatsPage() {
  const session = await auth()
  if (!session?.user?.isSuperAdmin) {
    redirect('/')
  }

  const stats = await getPatternStats(56)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-2xl font-bold mb-6">Newsletter Pattern Stats</h1>
        <PatternStatsDashboard stats={stats} />
      </main>
      <Footer />
    </div>
  )
}
