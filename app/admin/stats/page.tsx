import { redirect } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, UserPlus, TrendingUp, Calendar } from "lucide-react"
import UserStatsDashboard from "@/components/user-stats-dashboard"
import PatternStatsDashboard from "@/components/pattern-stats-dashboard"

async function getAllTimeStats() {
  const all = await prisma.patternStats.findMany({
    orderBy: [{ date: "asc" }],
  })

  const totalProcessed = all.reduce((s: number, r) => s + r.processed, 0)
  const totalExtracted = all.reduce((s: number, r) => s + r.extracted, 0)
  const totalIncluded = all.reduce((s: number, r) => s + r.included, 0)
  const conversionRate = totalExtracted > 0 ? (totalIncluded / totalExtracted) * 100 : 0
  const uniquePatterns = new Set(all.map((r) => r.patternName)).size
  const daysTracked = new Set(all.map((r) => new Date(r.date).toISOString().slice(0, 10))).size

  const monthMap: Record<string, { processed: number; extracted: number; included: number }> = {}
  for (const row of all) {
    const month = new Date(row.date).toISOString().slice(0, 7)
    if (!monthMap[month]) monthMap[month] = { processed: 0, extracted: 0, included: 0 }
    monthMap[month].processed += row.processed
    monthMap[month].extracted += row.extracted
    monthMap[month].included += row.included
  }

  const monthly = Object.entries(monthMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, data]) => ({ month, ...data }))

  return {
    totals: { totalProcessed, totalExtracted, totalIncluded, conversionRate, uniquePatterns, daysTracked },
    monthly,
  }
}

async function getMonthlyPatternStats(months: number = 12) {
  const since = new Date()
  since.setMonth(since.getMonth() - months)
  const sinceDate = new Date(Date.UTC(since.getFullYear(), since.getMonth(), 1))

  const rows = await prisma.patternStats.findMany({
    where: { date: { gte: sinceDate } },
    orderBy: [{ date: "asc" }],
    select: { patternName: true, date: true, included: true },
  })

  const monthMap: Record<string, Record<string, number>> = {}
  for (const row of rows) {
    const month = row.date.toISOString().slice(0, 7)
    if (!monthMap[month]) monthMap[month] = {}
    monthMap[month][row.patternName] = (monthMap[month][row.patternName] ?? 0) + row.included
  }

  return Object.entries(monthMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, patterns]) => ({ month, patterns }))
}

export default async function AdminStatsPage() {
  const session = await auth()

  if (!(session?.user as any)?.isSuperAdmin) {
    redirect("/")
  }

  const [userStats, patternStats] = await Promise.all([
    (async () => {
      const totalUsers = await prisma.user.count()

      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      const recentUsers = await prisma.user.count({
        where: { createdAt: { gte: thirtyDaysAgo } },
      })

      const twelveMonthsAgo = new Date()
      twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12)
      const monthlyData = await prisma.user.groupBy({
        by: ["createdAt"],
        _count: true,
        where: { createdAt: { gte: twelveMonthsAgo } },
      })

      const monthMap: Record<string, number> = {}
      for (const entry of monthlyData) {
        const month = new Date(entry.createdAt).toISOString().slice(0, 7)
        monthMap[month] = (monthMap[month] || 0) + entry._count
      }

      const monthlyTrend = Object.entries(monthMap)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([month, count]) => ({ month, count }))

      const recentRegistrations = await prisma.user.findMany({
        select: { id: true, name: true, email: true, image: true, createdAt: true },
        orderBy: { createdAt: "desc" },
        take: 10,
      })

      return { totalUsers, recentUsers, monthlyTrend, recentRegistrations }
    })(),
    (async () => {
      const [allTime, monthly] = await Promise.all([
        getAllTimeStats(),
        getMonthlyPatternStats(12),
      ])
      return { allTime, monthly }
    })(),
  ])

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tighter">
          <span className="text-primary bg-gradient-purple bg-clip-text text-transparent">
            Admin Dashboard
          </span>
        </h1>
        <p className="text-muted-foreground mt-2">
          User registration statistics and newsletter pattern analytics
        </p>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="patterns" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Patterns
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <UserStatsDashboard data={userStats} />
        </TabsContent>

        <TabsContent value="patterns" className="space-y-6">
          <PatternStatsDashboard data={patternStats} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
