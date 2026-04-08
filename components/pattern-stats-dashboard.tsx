"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface PatternStatsData {
  allTime: {
    totals: {
      totalProcessed: number
      totalExtracted: number
      totalIncluded: number
      conversionRate: number
      uniquePatterns: number
      daysTracked: number
    }
    monthly: Array<{
      month: string
      processed: number
      extracted: number
      included: number
    }>
  }
  monthly: Array<{
    month: string
    patterns: Record<string, number>
  }>
}

const COLORS = ["#8B5CF6", "#A855F7", "#D946EF", "#C4B5FD", "#7C3AED", "#6D28D9"]

function formatMonth(month: string): string {
  const [year, m] = month.split("-")
  const date = new Date(parseInt(year), parseInt(m) - 1)
  return date.toLocaleDateString("en-US", { month: "short", year: "2-digit" })
}

export default function PatternStatsDashboard({ data }: { data: PatternStatsData }) {
  const [months, setMonths] = useState(6)

  const { totals, monthly } = data.allTime
  const filteredMonthly = monthly.slice(-months)

  // Build stacked data from monthly pattern data
  const allPatternNames = new Set<string>()
  data.monthly.forEach((m) => Object.keys(m.patterns).forEach((p) => allPatternNames.add(p)))
  const patternNames = Array.from(allPatternNames)

  const stackedData = data.monthly.map((m) => {
    const entry: Record<string, string | number> = { month: m.month }
    patternNames.forEach((name) => {
      entry[name] = m.patterns[name] || 0
    })
    return entry as any
  })

  // Ranking data (total by pattern)
  const rankingData = patternNames
    .map((name) => {
      const total = data.monthly.reduce((sum, m) => sum + (m.patterns[name] || 0), 0)
      return { name, total }
    })
    .sort((a, b) => b.total - a.total)

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Patterns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totals.uniquePatterns}</div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Days Tracked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totals.daysTracked}</div>
          </CardContent>
        </Card>

        <Card className="border-accent/20 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Processed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totals.totalProcessed.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card className="border-accent/20 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Extracted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totals.totalExtracted.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card className="border-highlight/20 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Included</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totals.totalIncluded.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conversion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totals.conversionRate.toFixed(1)}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Ranking Chart */}
      {rankingData.length > 0 && (
        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Pattern Ranking</CardTitle>
            <CardDescription>
              Total articles included per pattern
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {rankingData.map((item, i) => {
                const maxTotal = Math.max(...rankingData.map((r) => r.total), 1)
                const pct = (item.total / maxTotal) * 100
                return (
                  <div key={item.name} className="flex items-center gap-3">
                    <span className="text-sm font-mono w-6 text-muted-foreground">
                      #{i + 1}
                    </span>
                    <span className="text-sm w-32 truncate">{item.name}</span>
                    <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: COLORS[i % COLORS.length],
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium w-10 text-right">
                      {item.total}
                    </span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stacked Bar Chart */}
      {patternNames.length > 0 && (
        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Articles Included by Pattern</CardTitle>
            <CardDescription>Monthly breakdown per pattern</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stackedData}>
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
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                      color: "hsl(var(--foreground))",
                    }}
                  />
                  <Legend />
                  {patternNames.map((name, i) => (
                    <Bar
                      key={name}
                      dataKey={name}
                      stackId="a"
                      fill={COLORS[i % COLORS.length]}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Trend Line Chart */}
      {patternNames.length > 0 && (
        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Monthly Trend</CardTitle>
              <CardDescription>Articles included per pattern over time</CardDescription>
            </div>
            <div className="flex gap-1">
              {[2, 3, 6, 12].map((m) => (
                <button
                  key={m}
                  onClick={() => setMonths(m)}
                  className={`px-3 py-1 text-xs rounded-md transition-colors ${
                    months === m
                      ? "bg-primary text-white"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {m}m
                </button>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredMonthly}>
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
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                      color: "hsl(var(--foreground))",
                    }}
                  />
                  <Legend />
                  {patternNames.map((name, i) => (
                    <Line
                      key={name}
                      type="monotone"
                      dataKey={name}
                      stroke={COLORS[i % COLORS.length]}
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
