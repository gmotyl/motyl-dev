'use client'

import { useMemo, useState, ReactNode } from 'react'

const TREND_UP_THRESHOLD = 1.1
const TREND_DOWN_THRESHOLD = 0.9
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface PatternStatRow {
  id: string
  patternName: string
  date: Date | string
  processed: number
  extracted: number
  included: number
  updatedAt: Date
}

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

interface PatternStatsDashboardProps {
  stats: PatternStatRow[]
  allTime: AllTimeData
}

type SortKey = 'patternName' | 'processed' | 'extracted' | 'included' | 'conversion' | 'trend'
type SortDir = 'asc' | 'desc'

function toDateStr(d: string | Date): string {
  return new Date(d).toISOString().slice(0, 10)
}

function isToday(d: string | Date): boolean {
  return toDateStr(d) === toDateStr(new Date())
}

function daysAgo(n: number): Date {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d
}

export function PatternStatsDashboard({ stats, allTime }: PatternStatsDashboardProps) {
  const [sortKey, setSortKey] = useState<SortKey>('included')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [chartView, setChartView] = useState<'all' | 'per-pattern'>('all')
  const [view, setView] = useState<'today' | 'alltime'>('today')

  // Today's stats (summary cards + table)
  const todayStats = useMemo(
    () => stats.filter((s) => isToday(s.date)),
    [stats]
  )

  const summary = useMemo(() => {
    const totalPatterns = new Set(todayStats.map((s) => s.patternName)).size
    const totalProcessed = todayStats.reduce((sum, s) => sum + s.processed, 0)
    const totalExtracted = todayStats.reduce((sum, s) => sum + s.extracted, 0)
    const totalIncluded = todayStats.reduce((sum, s) => sum + s.included, 0)
    const conversionRate = totalExtracted > 0 ? (totalIncluded / totalExtracted) * 100 : 0
    return { totalPatterns, totalProcessed, totalExtracted, totalIncluded, conversionRate }
  }, [todayStats])

  // 7-day average per pattern (excluding today)
  const recentAvg = useMemo(() => {
    const cutoff = daysAgo(7)
    const past = stats.filter((s) => !isToday(s.date) && new Date(s.date) >= cutoff)
    const byPattern: Record<string, { total: number; days: Set<string> }> = {}
    for (const s of past) {
      if (!byPattern[s.patternName]) {
        byPattern[s.patternName] = { total: 0, days: new Set() }
      }
      byPattern[s.patternName].total += s.included
      byPattern[s.patternName].days.add(toDateStr(s.date))
    }
    const avg: Record<string, number> = {}
    for (const [name, data] of Object.entries(byPattern)) {
      avg[name] = data.days.size > 0 ? data.total / data.days.size : 0
    }
    return avg
  }, [stats])

  // Table rows with computed fields
  const tableRows = useMemo(() => {
    return todayStats.map((s) => {
      const conversion = s.extracted > 0 ? (s.included / s.extracted) * 100 : 0
      const avg = recentAvg[s.patternName] ?? 0
      let trend: 'up' | 'down' | 'flat' = 'flat'
      if (avg > 0) {
        if (s.included > avg * TREND_UP_THRESHOLD) trend = 'up'
        else if (s.included < avg * TREND_DOWN_THRESHOLD) trend = 'down'
      } else if (s.included > 0) {
        trend = 'up'
      }
      return { ...s, conversion, trend }
    })
  }, [todayStats, recentAvg])

  const sortedRows = useMemo(() => {
    const rows = [...tableRows]
    rows.sort((a, b) => {
      let cmp = 0
      switch (sortKey) {
        case 'patternName':
          cmp = a.patternName.localeCompare(b.patternName)
          break
        case 'processed':
          cmp = a.processed - b.processed
          break
        case 'extracted':
          cmp = a.extracted - b.extracted
          break
        case 'included':
          cmp = a.included - b.included
          break
        case 'conversion':
          cmp = a.conversion - b.conversion
          break
        case 'trend': {
          const order = { up: 2, flat: 1, down: 0 }
          cmp = order[a.trend] - order[b.trend]
          break
        }
      }
      return sortDir === 'asc' ? cmp : -cmp
    })
    return rows
  }, [tableRows, sortKey, sortDir])

  // Chart data — ranking (all patterns view) or per-date trend (per-pattern view)
  const patternRankingData = useMemo(() => {
    return [...todayStats]
      .sort((a, b) => b.included - a.included)
      .map((s) => ({ patternName: s.patternName, included: s.included }))
  }, [todayStats])

  const chartData = useMemo(() => {
    if (chartView === 'all') return patternRankingData

    const dates = [...new Set(stats.map((s) => toDateStr(s.date)))].sort()
    const patterns = [...new Set(stats.map((s) => s.patternName))].sort()
    return dates.map((date) => {
      const row: Record<string, string | number> = { date }
      for (const p of patterns) {
        const s = stats.find((s) => toDateStr(s.date) === date && s.patternName === p)
        row[`${p}_included`] = s?.included ?? 0
      }
      return row
    })
  }, [stats, chartView, patternRankingData])

  const patternNames = useMemo(
    () => [...new Set(stats.map((s) => s.patternName))].sort(),
    [stats]
  )

  const patternColors = useMemo(() => {
    const palette = [
      '#3b82f6', '#f59e0b', '#22c55e', '#ef4444', '#8b5cf6',
      '#06b6d4', '#ec4899', '#f97316', '#14b8a6', '#6366f1',
    ]
    const map: Record<string, string> = {}
    patternNames.forEach((name, i) => {
      map[name] = palette[i % palette.length]
    })
    return map
  }, [patternNames])

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  function sortIndicator(key: SortKey) {
    if (sortKey !== key) return ''
    return sortDir === 'asc' ? ' \u25B2' : ' \u25BC'
  }

  function conversionColor(rate: number) {
    if (rate > 15) return 'text-green-400'
    if (rate >= 5) return 'text-yellow-400'
    return 'text-red-400'
  }

  function trendArrow(trend: 'up' | 'down' | 'flat') {
    switch (trend) {
      case 'up':
        return <span className="text-green-400" title="Above 7-day average">{'\u2191'}</span>
      case 'down':
        return <span className="text-red-400" title="Below 7-day average">{'\u2193'}</span>
      default:
        return <span className="text-muted-foreground" title="Near 7-day average">{'\u2192'}</span>
    }
  }

  return (
    <div className="space-y-8">
      {/* View tabs */}
      <div className="flex gap-2">
        {(['today', 'alltime'] as const).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              view === v ? 'bg-primary text-primary-foreground' : 'bg-muted/50 hover:bg-muted'
            }`}
          >
            {v === 'today' ? 'Today' : 'All Time'}
          </button>
        ))}
      </div>

      {view === 'alltime' ? (
        <AllTimeView allTime={allTime} />
      ) : (
        <TodayView
          summary={summary}
          sortedRows={sortedRows}
          chartData={chartData}
          patternNames={patternNames}
          patternColors={patternColors}
          chartView={chartView}
          setChartView={setChartView}
          handleSort={handleSort}
          sortIndicator={sortIndicator}
          conversionColor={conversionColor}
          trendArrow={trendArrow}
        />
      )}
    </div>
  )
}

function SummaryCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-muted bg-background/50 p-4 space-y-1">
      <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}

function AllTimeView({ allTime }: { allTime: AllTimeData }) {
  const { totals, monthly } = allTime
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

      {/* Monthly trend chart */}
      <div className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Monthly Trends</h2>
        <div className="rounded-lg border border-muted bg-background/50 p-4">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--muted))',
                  borderRadius: '0.5rem',
                  color: 'hsl(var(--foreground))',
                }}
              />
              <Legend />
              <Bar dataKey="processed" fill="#3b82f6" name="Processed" />
              <Bar dataKey="included" fill="#22c55e" name="Included" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly table */}
      <div className="rounded-lg border border-muted overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-muted bg-muted/30">
              <th className="px-4 py-2 text-left font-medium">Month</th>
              <th className="px-4 py-2 text-left font-medium">Processed</th>
              <th className="px-4 py-2 text-left font-medium">Extracted</th>
              <th className="px-4 py-2 text-left font-medium">Included</th>
              <th className="px-4 py-2 text-left font-medium">Conversion %</th>
            </tr>
          </thead>
          <tbody>
            {monthly.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No data yet.</td>
              </tr>
            ) : (
              [...monthly].reverse().map((row) => {
                const conv = row.extracted > 0 ? (row.included / row.extracted) * 100 : 0
                return (
                  <tr key={row.month} className="border-b border-muted/50 hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-2 font-medium">{row.month}</td>
                    <td className="px-4 py-2">{row.processed.toLocaleString()}</td>
                    <td className="px-4 py-2">{row.extracted.toLocaleString()}</td>
                    <td className="px-4 py-2">{row.included.toLocaleString()}</td>
                    <td className={`px-4 py-2 ${conv > 15 ? 'text-green-400' : conv >= 5 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {conv.toFixed(1)}%
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function TodayView({
  summary, sortedRows, chartData, patternNames, patternColors, chartView, setChartView,
  handleSort, sortIndicator, conversionColor, trendArrow,
}: {
  summary: { totalPatterns: number; totalProcessed: number; totalExtracted: number; totalIncluded: number; conversionRate: number }
  sortedRows: Array<{ id: string; patternName: string; processed: number; extracted: number; included: number; conversion: number; trend: 'up' | 'down' | 'flat' }>
  chartData: Array<Record<string, string | number>>
  patternNames: string[]
  patternColors: Record<string, string>
  chartView: 'all' | 'per-pattern'
  setChartView: (v: 'all' | 'per-pattern') => void
  handleSort: (key: SortKey) => void
  sortIndicator: (key: SortKey) => string
  conversionColor: (rate: number) => string
  trendArrow: (trend: 'up' | 'down' | 'flat') => ReactNode
}) {
  return (
    <div className="space-y-8">
      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          { label: 'Active Patterns', value: summary.totalPatterns },
          { label: 'Processed', value: summary.totalProcessed },
          { label: 'Extracted', value: summary.totalExtracted },
          { label: 'Included', value: summary.totalIncluded },
          { label: 'Conversion', value: `${summary.conversionRate.toFixed(1)}%` },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-lg border border-muted bg-background/50 p-4 space-y-1"
          >
            <p className="text-xs text-muted-foreground uppercase tracking-wide">{card.label}</p>
            <p className="text-2xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Pattern table */}
      <div className="rounded-lg border border-muted overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-muted bg-muted/30">
              {(
                [
                  ['patternName', 'Pattern Name'],
                  ['processed', 'Processed'],
                  ['extracted', 'Extracted'],
                  ['included', 'Included'],
                  ['conversion', 'Conversion %'],
                  ['trend', 'Trend'],
                ] as const
              ).map(([key, label]) => (
                <th
                  key={key}
                  className="px-4 py-2 text-left font-medium cursor-pointer hover:text-primary transition-colors select-none"
                  onClick={() => handleSort(key)}
                >
                  {label}
                  {sortIndicator(key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedRows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                  No pattern data for today.
                </td>
              </tr>
            ) : (
              sortedRows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-muted/50 hover:bg-muted/20 transition-colors"
                >
                  <td className="px-4 py-2 font-medium">{row.patternName}</td>
                  <td className="px-4 py-2">{row.processed}</td>
                  <td className="px-4 py-2">{row.extracted}</td>
                  <td className="px-4 py-2">{row.included}</td>
                  <td className={`px-4 py-2 ${conversionColor(row.conversion)}`}>
                    {row.conversion.toFixed(1)}%
                  </td>
                  <td className="px-4 py-2 text-lg">{trendArrow(row.trend)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Trend chart */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">View:</span>
          <button
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              chartView === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted/50 hover:bg-muted'
            }`}
            onClick={() => setChartView('all')}
          >
            Ranking
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              chartView === 'per-pattern'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted/50 hover:bg-muted'
            }`}
            onClick={() => setChartView('per-pattern')}
          >
            Trend
          </button>
        </div>

        <div className="rounded-lg border border-muted bg-background/50 p-4">
          <ResponsiveContainer width="100%" height={300}>
            {chartView === 'all' ? (
              <BarChart data={chartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis type="category" dataKey="patternName" stroke="hsl(var(--muted-foreground))" fontSize={11} width={120} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--muted))',
                    borderRadius: '0.5rem',
                    color: 'hsl(var(--foreground))',
                  }}
                />
                <Bar dataKey="included" fill="#22c55e" name="Included" />
              </BarChart>
            ) : (
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--muted))',
                    borderRadius: '0.5rem',
                    color: 'hsl(var(--foreground))',
                  }}
                />
                <Legend />
                {patternNames.map((name) => (
                  <Bar
                    key={name}
                    dataKey={`${name}_included`}
                    stackId="a"
                    fill={patternColors[name]}
                    name={name}
                  />
                ))}
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
