'use client'

import { useState, useEffect } from 'react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Settings } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useSectionVisibility, ALL_SECTIONS } from '@/hooks/use-section-visibility'
import type { SectionType } from '@/lib/section-filter'

interface ArticleSectionToggleProps {
  onChange: (hiddenTypes: Set<SectionType>) => void
  defaultHidden?: SectionType[]
}

export function ArticleSectionToggle({
  onChange,
  defaultHidden = ['summary', 'keyTakeaways', 'tradeoffs']
}: ArticleSectionToggleProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { hiddenSections, toggleSection, isHydrated } = useSectionVisibility(defaultHidden)

  // Sync to parent whenever hiddenSections changes
  useEffect(() => {
    if (isHydrated) {
      onChange(hiddenSections)
    }
  }, [hiddenSections, isHydrated, onChange])

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

      <SectionVisibilityDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        hiddenSections={hiddenSections}
        onToggle={toggleSection}
      />
    </div>
  )
}

// Shared dialog component used by both ArticleSectionToggle and read-all-news page
export function SectionVisibilityDialog({
  open,
  onOpenChange,
  hiddenSections,
  onToggle,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  hiddenSections: Set<SectionType>
  onToggle: (sectionId: SectionType, visible: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Show Sections</DialogTitle>
        </DialogHeader>
        <div className="space-y-1">
          {ALL_SECTIONS.map((section) => (
            <div key={section.id} className="flex items-center justify-between gap-3 py-2">
              <Label htmlFor={`section-${section.id}`} className="text-sm cursor-pointer">
                {section.label}
              </Label>
              <Switch
                id={`section-${section.id}`}
                checked={!hiddenSections.has(section.id)}
                onCheckedChange={(checked) => onToggle(section.id, checked)}
                className="data-[state=checked]:bg-purple-500 data-[state=unchecked]:bg-gray-600"
              />
            </div>
          ))}
        </div>
        <Button onClick={() => onOpenChange(false)} className="w-full mt-2">
          Done
        </Button>
      </DialogContent>
    </Dialog>
  )
}
