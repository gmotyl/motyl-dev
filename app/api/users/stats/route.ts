import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Total user count
    const totalUsers = await prisma.user.count()

    // Users registered in the last 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const recentUsers = await prisma.user.count({
      where: { createdAt: { gte: thirtyDaysAgo } },
    })

    // Monthly registration trend (last 12 months)
    const twelveMonthsAgo = new Date()
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12)
    const monthlyRegistrations = await prisma.user.groupBy({
      by: ["createdAt"],
      _count: true,
      where: { createdAt: { gte: twelveMonthsAgo } },
    })

    // Aggregate by month
    const monthMap: Record<string, number> = {}
    for (const entry of monthlyRegistrations) {
      const month = new Date(entry.createdAt)
        .toISOString()
        .slice(0, 7) // YYYY-MM
      monthMap[month] = (monthMap[month] || 0) + entry._count
    }

    const monthlyTrend = Object.entries(monthMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, count]) => ({ month, count }))

    // Recent registrations (last 10)
    const recentRegistrations = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
      take: 10,
    })

    return NextResponse.json({
      totalUsers,
      recentUsers,
      monthlyTrend,
      recentRegistrations,
    })
  } catch (error) {
    console.error("Failed to fetch user stats:", error)
    return NextResponse.json(
      { error: "Failed to fetch user stats" },
      { status: 500 }
    )
  }
}
