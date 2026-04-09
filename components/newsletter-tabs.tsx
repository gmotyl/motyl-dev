'use client'

import { useState } from 'react'
import { TrendingList } from '@/components/trending-list'
import { cn } from '@/lib/utils'

interface TrendingItem {
  id: string
  title: string
  description: string | null
  linkUrl: string
  voteCount: number
  category: string
  sourceDomain: string | null
}

interface NewsletterTabsProps {
  archiveContent: React.ReactNode
  trendingItems: TrendingItem[]
}

export function NewsletterTabs({ archiveContent, trendingItems }: NewsletterTabsProps) {
  const [activeTab, setActiveTab] = useState<'newsletter' | 'trending'>('newsletter')

  return (
    <>
      <div className="flex gap-1 border-b border-border" role="tablist">
        <button
          role="tab"
          aria-selected={activeTab === 'newsletter'}
          onClick={() => setActiveTab('newsletter')}
          className={cn(
            'px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px',
            activeTab === 'newsletter'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          )}
        >
          Newsletter
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'trending'}
          onClick={() => setActiveTab('trending')}
          className={cn(
            'px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px',
            activeTab === 'trending'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          )}
        >
          Trending
        </button>
      </div>

      {activeTab === 'newsletter' ? (
        <div role="tabpanel">{archiveContent}</div>
      ) : (
        <div role="tabpanel" className="space-y-3">
          {trendingItems.length > 0 ? (
            <TrendingList items={trendingItems} />
          ) : (
            <p className="text-muted-foreground text-center py-8">
              No trending items yet this week. Vote on news articles to surface trends!
            </p>
          )}
        </div>
      )}
    </>
  )
}
