'use client'

import { useState } from 'react'
import { TrendingCard } from '@/components/trending-card'
import type { ContentCategory } from '@/lib/og'
import { useFLIP } from '@/hooks/use-flip'

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
  const { listRef, snapshot } = useFLIP(items)

  const handleRemoved = (linkUrl: string) => {
    snapshot()
    setItems(prev => prev.filter(item => item.linkUrl !== linkUrl))
  }

  const handleCategoryChanged = (linkUrl: string, category: ContentCategory) => {
    setItems(prev => prev.map(item =>
      item.linkUrl === linkUrl ? { ...item, category } : item
    ))
  }

  const handleVote = (linkUrl: string, newCount: number) => {
    snapshot()
    setItems(prev => {
      const updated = prev.map(item =>
        item.linkUrl === linkUrl ? { ...item, voteCount: newCount } : item
      )
      return [...updated].sort((a, b) => b.voteCount - a.voteCount)
    })
  }

  if (items.length === 0) return null

  return (
    <div ref={listRef} className="space-y-3">
      {items.map((item) => (
        <div key={item.id} data-flip-id={item.id}>
          <TrendingCard
            title={item.title}
            description={item.description ?? undefined}
            linkUrl={item.linkUrl}
            voteCount={item.voteCount}
            category={item.category as ContentCategory}
            sourceDomain={item.sourceDomain ?? undefined}
            isSuperAdmin={isSuperAdmin}
            onRemoved={handleRemoved}
            onCategoryChanged={handleCategoryChanged}
            onVote={handleVote}
          />
        </div>
      ))}
    </div>
  )
}
