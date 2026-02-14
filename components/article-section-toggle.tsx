'use client'

import { useState, useEffect, useCallback } from 'react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Settings } from 'lucide-react'
import type { SectionType } from '@/lib/articles'

interface SectionToggleProps {
  section: SectionType
  label: string
  checked: boolean
  onChange: (section: SectionType, checked: boolean) => void
}

function SectionToggle({ section, label, checked, onChange }: SectionToggleProps) {
  return (
    <div className="flex items-center justify-between gap-3 py-2">
      <Label 
        htmlFor={section} 
        className="text-sm text-gray-300 cursor-pointer"
      >
        {label}
      </Label>
      <Switch
        id={section}
        checked={checked}
        onCheckedChange={(checked) => onChange(section, checked)}
        className="data-[state=checked]:bg-purple-500 data-[state=unchecked]:bg-gray-600"
      />
    </div>
  )
}

const STORAGE_KEY = 'article-hidden-sections'

interface ArticleSectionToggleProps {
  onChange: (hiddenTypes: Set<SectionType>) => void
  defaultHidden?: SectionType[]
}

export function ArticleSectionToggle({ 
  onChange, 
  defaultHidden = ['summary', 'keyTakeaways', 'tradeoffs'] 
}: ArticleSectionToggleProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)
  const [sections, setSections] = useState<Record<SectionType, boolean>>(() => {
    const initial: Record<SectionType, boolean> = {
      tldr: !defaultHidden.includes('tldr'),
      summary: !defaultHidden.includes('summary'),
      keyTakeaways: !defaultHidden.includes('keyTakeaways'),
      tradeoffs: !defaultHidden.includes('tradeoffs'),
    }
    return initial
  })

  useEffect(() => {
    setIsHydrated(true)
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Record<SectionType, boolean>
        setSections(parsed)
      } catch {
        // Use defaults
      }
    }
  }, [])

  const handleChange = useCallback((section: SectionType, checked: boolean) => {
    setSections(prev => {
      const newSections = { ...prev, [section]: checked }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSections))
      const hidden = new Set<SectionType>()
      Object.entries(newSections).forEach(([k, v]) => {
        if (!v) hidden.add(k as SectionType)
      })
      onChange(hidden)
      return newSections
    })
  }, [onChange])

  if (!isHydrated) {
    return null
  }

  return (
    <div className="my-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="gap-2"
      >
        <Settings className="h-4 w-4" />
        Customize Sections
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/60" 
            onClick={() => setIsOpen(false)}
          />
          <div className="relative z-10 w-full max-w-sm p-5 rounded-lg bg-gray-900 border border-gray-800 shadow-xl">
            <h3 className="text-base font-medium text-white mb-4">
              Show Sections
            </h3>
            <div className="space-y-1">
              <SectionToggle
                section="tldr"
                label="TLDR"
                checked={sections.tldr}
                onChange={handleChange}
              />
              <SectionToggle
                section="summary"
                label="Summary"
                checked={sections.summary}
                onChange={handleChange}
              />
              <SectionToggle
                section="keyTakeaways"
                label="Key Takeaways"
                checked={sections.keyTakeaways}
                onChange={handleChange}
              />
              <SectionToggle
                section="tradeoffs"
                label="Tradeoffs"
                checked={sections.tradeoffs}
                onChange={handleChange}
              />
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              className="w-full mt-5"
            >
              Done
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
