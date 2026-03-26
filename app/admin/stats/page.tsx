import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { getPatternStats } from '@/lib/pattern-stats'
import { getCurrentWeek } from '@/lib/trends'
import { PatternStatsDashboard } from '@/components/pattern-stats-dashboard'

export default async function StatsPage() {
  const session = await auth()
  if (!session?.user?.isSuperAdmin) {
    redirect('/')
  }

  const [stats, currentWeek] = await Promise.all([
    getPatternStats(8),
    getCurrentWeek(),
  ])

  return (
    <main className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-2xl font-bold mb-6">Newsletter Pattern Stats</h1>
      <PatternStatsDashboard stats={stats} currentWeek={currentWeek} />
    </main>
  )
}
