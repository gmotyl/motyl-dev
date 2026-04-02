'use client'

import { useState, useRef, useEffect } from 'react'
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
  const listRef = useRef<HTMLDivElement>(null)
  const prevPositions = useRef<Map<string, number>>(new Map())

  const handleRemoved = (linkUrl: string) => {
    setItems(prev => prev.filter(item => item.linkUrl !== linkUrl))
  }

  const handleCategoryChanged = (linkUrl: string, category: ContentCategory) => {
    setItems(prev => prev.map(item =>
      item.linkUrl === linkUrl ? { ...item, category } : item
    ))
  }

  const handleVote = (linkUrl: string, newCount: number) => {
    // Record positions before state update (FLIP: First)
    if (listRef.current) {
      const els = listRef.current.querySelectorAll('[data-flip-id]')
      const snapshot = new Map<string, number>()
      els.forEach(el => {
        const id = el.getAttribute('data-flip-id')!
        snapshot.set(id, el.getBoundingClientRect().top)
      })
      prevPositions.current = snapshot
    }

    setItems(prev => {
      const updated = prev.map(item =>
        item.linkUrl === linkUrl ? { ...item, voteCount: newCount } : item
      )
      return [...updated].sort((a, b) => b.voteCount - a.voteCount)
    })
  }

  // Apply FLIP animation after re-render (Last → Invert → Play)
  useEffect(() => {
    if (!listRef.current || prevPositions.current.size === 0) return

    const els = listRef.current.querySelectorAll('[data-flip-id]')
    els.forEach(el => {
      const id = el.getAttribute('data-flip-id')!
      const oldTop = prevPositions.current.get(id)
      if (oldTop === undefined) return

      const newTop = el.getBoundingClientRect().top
      const delta = oldTop - newTop
      if (delta === 0) return

      const htmlEl = el as HTMLElement
      // Invert: snap back to old position
      htmlEl.style.transform = `translateY(${delta}px)`
      htmlEl.style.transition = 'none'

      // Play: animate to new position
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          htmlEl.style.transform = ''
          htmlEl.style.transition = 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        })
      })
    })

    prevPositions.current = new Map()
  }, [items])

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
