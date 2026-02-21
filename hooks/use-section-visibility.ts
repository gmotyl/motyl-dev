'use client'

import { useState, useEffect, useCallback } from 'react'
import type { SectionType } from '@/lib/section-filter'

const STORAGE_KEY = 'article-hidden-sections'

const ALL_SECTIONS: { id: SectionType; label: string }[] = [
  { id: 'tldr', label: 'TLDR' },
  { id: 'summary', label: 'Summary' },
  { id: 'keyTakeaways', label: 'Key Takeaways' },
  { id: 'tradeoffs', label: 'Tradeoffs' },
]

const DEFAULT_HIDDEN: SectionType[] = ['summary', 'keyTakeaways', 'tradeoffs']

export { ALL_SECTIONS }

export function useSectionVisibility(defaultHidden: SectionType[] = DEFAULT_HIDDEN) {
  const [hiddenSections, setHiddenSections] = useState<Set<SectionType>>(new Set(defaultHidden))
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Record<SectionType, boolean>
        const hidden = new Set<SectionType>()
        Object.entries(parsed).forEach(([k, v]) => {
          if (!v) hidden.add(k as SectionType)
        })
        setHiddenSections(hidden)
      } catch {
        // use defaults
      }
    }
    setIsHydrated(true)
  }, [])

  const toggleSection = useCallback((sectionId: SectionType, visible: boolean) => {
    setHiddenSections(prev => {
      const next = new Set(prev)
      if (visible) {
        next.delete(sectionId)
      } else {
        next.add(sectionId)
      }
      const record = Object.fromEntries(
        ALL_SECTIONS.map(s => [s.id, !next.has(s.id)])
      )
      localStorage.setItem(STORAGE_KEY, JSON.stringify(record))
      return next
    })
  }, [])

  return { hiddenSections, toggleSection, isHydrated }
}
