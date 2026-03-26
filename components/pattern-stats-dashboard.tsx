'use client'

import { useMemo, useState } from 'react'
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
  week: string
  processed: number
  extracted: number
  included: number
  updatedAt: Date
}

interface PatternStatsDashboardProps {
  stats: PatternStatRow[]
  currentWeek: string
}

type SortKey = 'patternName' | 'processed' | 'extracted' | 'included' | 'conversion' | 'trend'
type SortDir = 'asc' | 'desc'

export function PatternStatsDashboard({ stats, currentWeek }: PatternStatsDashboardProps) {
  const [sortKey, setSortKey] = useState<SortKey>('included')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [chartView, setChartView] = useState<'all' | 'per-pattern'>('all')

  // Current week stats
  const currentWeekStats = useMemo(
    () => stats.filter((s) => s.week === currentWeek),
    [stats, currentWeek]
  )

  // Summary cards
  const summary = useMemo(() => {
    const totalPatterns = new Set(currentWeekStats.map((s) => s.patternName)).size
    const totalProcessed = currentWeekStats.reduce((sum, s) => sum + s.processed, 0)
    const totalExtracted = currentWeekStats.reduce((sum, s) => sum + s.extracted, 0)
    const totalIncluded = currentWeekStats.reduce((sum, s) => sum + s.included, 0)
    const conversionRate = totalExtracted > 0 ? (totalIncluded / totalExtracted) * 100 : 0
    return { totalPatterns, totalProcessed, totalExtracted, totalIncluded, conversionRate }
  }, [currentWeekStats])

  // 4-week average per pattern (excluding current week)
  const fourWeekAvg = useMemo(() => {
    const past = stats.filter((s) => s.week !== currentWeek)
    const byPattern: Record<string, { total: number; weeks: Set<string> }> = {}
    for (const s of past) {
      if (!byPattern[s.patternName]) {
        byPattern[s.patternName] = { total: 0, weeks: new Set() }
      }
      byPattern[s.patternName].total += s.included
      byPattern[s.patternName].weeks.add(s.week)
    }
    const avg: Record<string, number> = {}
    for (const [name, data] of Object.entries(byPattern)) {
      avg[name] = data.weeks.size > 0 ? data.total / data.weeks.size : 0
    }
    return avg
  }, [stats, currentWeek])

  // Table rows with computed fields
  const tableRows = useMemo(() => {
    return currentWeekStats.map((s) => {
      const conversion = s.extracted > 0 ? (s.included / s.extracted) * 100 : 0
      const avg = fourWeekAvg[s.patternName] ?? 0
      let trend: 'up' | 'down' | 'flat' = 'flat'
      if (avg > 0) {
        if (s.included > avg * 1.1) trend = 'up'
        else if (s.included < avg * 0.9) trend = 'down'
      } else if (s.included > 0) {
        trend = 'up'
      }
      return { ...s, conversion, trend }
    })
  }, [currentWeekStats, fourWeekAvg])

  // Sorted rows
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

  // Chart data
  const chartData = useMemo(() => {
    const weeks = [...new Set(stats.map((s) => s.week))].sort()

    if (chartView === 'all') {
      return weeks.map((week) => {
        const weekStats = stats.filter((s) => s.week === week)
        return {
          week,
          processed: weekStats.reduce((sum, s) => sum + s.processed, 0),
          extracted: weekStats.reduce((sum, s) => sum + s.extracted, 0),
          included: weekStats.reduce((sum, s) => sum + s.included, 0),
        }
      })
    }

    // Per-pattern: one series per pattern
    const patterns = [...new Set(stats.map((s) => s.patternName))].sort()
    return weeks.map((week) => {
      const row: Record<string, string | number> = { week }
      for (const p of patterns) {
        const s = stats.find((s) => s.week === week && s.patternName === p)
        row[`${p}_included`] = s?.included ?? 0
      }
      return row
    })
  }, [stats, chartView])

  const patternNames = useMemo(
    () => [...new Set(stats.map((s) => s.patternName))].sort(),
    [stats]
  )

  // Per-pattern color palette
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
        return <span className="text-green-400" title="Above 4-week average">{'\u2191'}</span>
      case 'down':
        return <span className="text-red-400" title="Below 4-week average">{'\u2193'}</span>
      default:
        return <span className="text-muted-foreground" title="Near 4-week average">{'\u2192'}</span>
    }
  }

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
                  No pattern data for the current week.
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
            All Patterns
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              chartView === 'per-pattern'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted/50 hover:bg-muted'
            }`}
            onClick={() => setChartView('per-pattern')}
          >
            Per Pattern
          </button>
        </div>

        <div className="rounded-lg border border-muted bg-background/50 p-4">
          <ResponsiveContainer width="100%" height={300}>
            {chartView === 'all' ? (
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={12} />
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
                <Bar dataKey="processed" stackId="a" fill="#3b82f6" name="Processed" />
                <Bar dataKey="extracted" stackId="a" fill="#f59e0b" name="Extracted" />
                <Bar dataKey="included" stackId="a" fill="#22c55e" name="Included" />
              </BarChart>
            ) : (
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={12} />
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
