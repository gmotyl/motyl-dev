'use client'

import { useMemo, useState } from 'react'

const PATTERN_PALETTE = [
  '#3b82f6', '#f59e0b', '#22c55e', '#ef4444', '#8b5cf6',
  '#06b6d4', '#ec4899', '#f97316', '#14b8a6', '#6366f1',
  '#a3e635', '#fb7185', '#38bdf8', '#fbbf24', '#a78bfa',
  '#34d399', '#f43f5e', '#60a5fa', '#fb923c', '#4ade80',
]
import {
  BarChart,
  Bar,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface AllTimeData {
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

interface MonthlyPatternEntry {
  month: string
  patterns: Record<string, number>
}

interface PatternStatsDashboardProps {
  allTime: AllTimeData
  monthlyPatterns: MonthlyPatternEntry[]
}

type MonthRange = 2 | 3 | 6 | 12

function SummaryCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-muted bg-background/50 p-4 space-y-1">
      <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}

export function PatternStatsDashboard({ allTime, monthlyPatterns }: PatternStatsDashboardProps) {
  const { totals } = allTime
  const [monthRange, setMonthRange] = useState<MonthRange>(6)

  const tooltipStyle = {
    backgroundColor: 'hsl(var(--background))',
    border: '1px solid hsl(var(--muted))',
    borderRadius: '0.5rem',
    color: 'hsl(var(--foreground))',
  }

  const filteredMonths = useMemo(() => {
    const cutoff = new Date()
    cutoff.setDate(1)
    cutoff.setMonth(cutoff.getMonth() - (monthRange - 1))
    const cutoffStr = cutoff.toISOString().slice(0, 7)
    return monthlyPatterns.filter((m) => m.month >= cutoffStr)
  }, [monthlyPatterns, monthRange])

  const activePatterns = useMemo(() => {
    const names = new Set<string>()
    for (const m of filteredMonths) {
      for (const [name, count] of Object.entries(m.patterns)) {
        if (count > 0) names.add(name)
      }
    }
    return [...names].sort()
  }, [filteredMonths])

  const patternColors = useMemo(() => {
    const allNames = [...new Set(monthlyPatterns.flatMap((m) => Object.keys(m.patterns)))].sort()
    const map: Record<string, string> = {}
    allNames.forEach((name, i) => {
      map[name] = PATTERN_PALETTE[i % PATTERN_PALETTE.length]
    })
    return map
  }, [monthlyPatterns])

  const trendChartData = useMemo(() => {
    return filteredMonths.map((m) => {
      const row: Record<string, string | number> = { month: m.month }
      for (const name of activePatterns) {
        row[name] = m.patterns[name] ?? 0
      }
      return row
    })
  }, [filteredMonths, activePatterns])

  // Ranking: aggregate totals per pattern over filtered period
  const rankingData = useMemo(() => {
    const totalsMap: Record<string, number> = {}
    for (const m of filteredMonths) {
      for (const [name, count] of Object.entries(m.patterns)) {
        totalsMap[name] = (totalsMap[name] ?? 0) + count
      }
    }
    return Object.entries(totalsMap)
      .map(([patternName, included]) => ({ patternName, included }))
      .sort((a, b) => b.included - a.included)
  }, [filteredMonths])

  const rangeButtons = (
    <div className="flex gap-1">
      {([2, 3, 6, 12] as MonthRange[]).map((r) => (
        <button
          key={r}
          onClick={() => setMonthRange(r)}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            monthRange === r ? 'bg-primary text-primary-foreground' : 'bg-muted/50 hover:bg-muted'
          }`}
        >
          {r}m
        </button>
      ))}
    </div>
  )

  return (
    <div className="space-y-8">
      {/* Global summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <SummaryCard label="Patterns" value={totals.uniquePatterns} />
        <SummaryCard label="Days Tracked" value={totals.daysTracked} />
        <SummaryCard label="Total Processed" value={totals.totalProcessed.toLocaleString()} />
        <SummaryCard label="Total Extracted" value={totals.totalExtracted.toLocaleString()} />
        <SummaryCard label="Total Included" value={totals.totalIncluded.toLocaleString()} />
        <SummaryCard label="Avg Conversion" value={`${totals.conversionRate.toFixed(1)}%`} />
      </div>

      {/* Range selector (shared) */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Pattern Stats — Last {monthRange} months
        </h2>
        {rangeButtons}
      </div>

      {/* Ranking — horizontal bar, sorted by total included */}
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Pattern ranking — total articles included</p>
        <div className="rounded-lg border border-muted bg-background/50 p-4">
          <ResponsiveContainer width="100%" height={Math.max(240, rankingData.length * 28)}>
            <BarChart data={rankingData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis
                type="category"
                dataKey="patternName"
                stroke="hsl(var(--muted-foreground))"
                fontSize={11}
                width={130}
              />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="included" name="Included" radius={[0, 4, 4, 0]}>
                {rankingData.map((entry, i) => (
                  <Cell
                    key={entry.patternName}
                    fill={patternColors[entry.patternName] ?? PATTERN_PALETTE[i % PATTERN_PALETTE.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly trends — stacked bar */}
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Articles included per month by pattern</p>
        <div className="rounded-lg border border-muted bg-background/50 p-4">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={trendChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              {activePatterns.map((name) => (
                <Bar key={name} dataKey={name} stackId="a" fill={patternColors[name]} name={name} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Line chart — trend per pattern */}
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Trend per pattern over time</p>
        <div className="rounded-lg border border-muted bg-background/50 p-4">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={trendChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              {activePatterns.map((name) => (
                <Line
                  key={name}
                  type="monotone"
                  dataKey={name}
                  stroke={patternColors[name]}
                  dot={false}
                  strokeWidth={2}
                  name={name}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
