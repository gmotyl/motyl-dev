"use client"

import { Users, UserPlus, Calendar, TrendingUp } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface UserStatsData {
  totalUsers: number
  recentUsers: number
  monthlyTrend: Array<{ month: string; count: number }>
  recentRegistrations: Array<{
    id: string
    name: string | null
    email: string
    image: string | null
    createdAt: Date
  }>
}

function getInitials(name: string | null): string {
  if (!name) return "?"
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

function formatMonth(month: string): string {
  const [year, m] = month.split("-")
  const date = new Date(parseInt(year), parseInt(m) - 1)
  return date.toLocaleDateString("en-US", { month: "short", year: "2-digit" })
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export default function UserStatsDashboard({ data }: { data: UserStatsData }) {
  const { totalUsers, recentUsers, monthlyTrend, recentRegistrations } = data

  // Calculate growth rate
  const growthRate =
    monthlyTrend.length >= 2
      ? ((monthlyTrend[monthlyTrend.length - 1].count -
          monthlyTrend[monthlyTrend.length - 2].count) /
          Math.max(monthlyTrend[monthlyTrend.length - 2].count, 1)) *
        100
      : 0

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              Registered since launch
            </p>
          </CardContent>
        </Card>

        <Card className="border-accent/20 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              This Month
            </CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentUsers}</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card className="border-highlight/20 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Growth
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {growthRate > 0 ? "+" : ""}
              {growthRate.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Month over month
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg / Month
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {monthlyTrend.length > 0
                ? Math.round(
                    monthlyTrend.reduce((s, m) => s + m.count, 0) /
                      monthlyTrend.length
                  )
                : 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Registrations per month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Registration Trend Chart */}
      {monthlyTrend.length > 0 && (
        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Registration Trend</CardTitle>
            <CardDescription>
              Monthly user registrations over the past year
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrend}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                    opacity={0.3}
                  />
                  <XAxis
                    dataKey="month"
                    tickFormatter={formatMonth}
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    allowDecimals={false}
                  />
                  <Tooltip
                    formatter={(value: number) => [`${value} users`, "Registrations"]}
                    labelFormatter={formatMonth}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                      color: "hsl(var(--foreground))",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#8B5CF6"
                    strokeWidth={2}
                    dot={{ fill: "#8B5CF6", r: 4 }}
                    activeDot={{ r: 6, stroke: "#8B5CF6", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Registrations */}
      <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Recent Registrations</CardTitle>
          <CardDescription>
            The last 10 users who joined the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentRegistrations.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-4 py-2 border-b border-border/40 last:border-0"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.image ?? undefined} />
                  <AvatarFallback className="bg-gradient-purple text-white text-xs font-bold">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">
                    {user.name || "Anonymous"}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">
                    {user.email}
                  </p>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  {formatDate(user.createdAt)}
                </div>
              </div>
            ))}
            {recentRegistrations.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p>No registered users yet</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
