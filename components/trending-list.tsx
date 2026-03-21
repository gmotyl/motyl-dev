'use client'

import { useState } from 'react'
import { TrendingCard } from '@/components/trending-card'
import type { ContentCategory } from '@/lib/og'

interface TrendingItem {
  id: string
  title: string
  description: string | null
  linkUrl: string
  voteCount: number
  category: string
  sourceDomain: string | null
}

interface TrendingListProps {
  items: TrendingItem[]
  isSuperAdmin: boolean
}

export function TrendingList({ items: initialItems, isSuperAdmin }: TrendingListProps) {
  const [items, setItems] = useState(initialItems)

  const handleRemoved = (linkUrl: string) => {
    setItems(prev => prev.filter(item => item.linkUrl !== linkUrl))
  }

  const handleCategoryChanged = (linkUrl: string, category: ContentCategory) => {
    setItems(prev => prev.map(item =>
      item.linkUrl === linkUrl ? { ...item, category } : item
    ))
  }

  if (items.length === 0) return null

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <TrendingCard
          key={item.id}
          title={item.title}
          description={item.description ?? undefined}
          linkUrl={item.linkUrl}
          voteCount={item.voteCount}
          category={item.category as ContentCategory}
          sourceDomain={item.sourceDomain ?? undefined}
          isSuperAdmin={isSuperAdmin}
          onRemoved={handleRemoved}
          onCategoryChanged={handleCategoryChanged}
        />
      ))}
    </div>
  )
}
