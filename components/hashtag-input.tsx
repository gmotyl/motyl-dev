'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { Hash, X, Plus, Search, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useIsMobile } from '@/components/ui/use-mobile'
import { useHashtagSuggestions } from '@/hooks/use-hashtag-suggestions'
import { useRecentHashtags } from '@/hooks/use-recent-hashtags'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'

export interface HashtagInputProps {
  selectedHashtags: string[]
  onHashtagAdd: (hashtag: string) => void
  onHashtagRemove: (hashtag: string) => void
  placeholder?: string
  allowNewHashtags?: boolean
  showSelectedBadges?: boolean
  className?: string
  triggerClassName?: string
}

export function HashtagInput({
  selectedHashtags,
  onHashtagAdd,
  onHashtagRemove,
  placeholder = 'Search hashtags...',
  allowNewHashtags = true,
  showSelectedBadges = true,
  className,
  triggerClassName,
}: HashtagInputProps) {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const isMobile = useIsMobile()
  const { addRecent } = useRecentHashtags()

  const { suggestions, isLoading, isNewHashtag } = useHashtagSuggestions({
    inputValue,
    selectedHashtags,
    maxSuggestions: 10,
    enabled: open,
  })

  // Pre-compute Set for O(1) lookup
  const selectedHashtagsSet = useMemo(
    () => new Set(selectedHashtags.map((t) => t.toLowerCase())),
    [selectedHashtags]
  )

  // Pre-group suggestions to avoid filtering twice in render
  const { recentSuggestions, otherSuggestions } = useMemo(() => {
    const recent: typeof suggestions = []
    const other: typeof suggestions = []
    for (const s of suggestions) {
      if (s.source === 'recent') {
        recent.push(s)
      } else {
        other.push(s)
      }
    }
    return { recentSuggestions: recent, otherSuggestions: other }
  }, [suggestions])

  // Focus input when opened (with delay for mobile drawer animation)
  useEffect(() => {
    if (open) {
      const delay = isMobile ? 300 : 100
      const timer = setTimeout(() => {
        inputRef.current?.focus()
      }, delay)
      return () => clearTimeout(timer)
    }
  }, [open, isMobile])

  const handleSelectHashtag = (hashtag: string) => {
    const normalized = hashtag.toLowerCase().trim().replace(/^#/, '')
    if (normalized && !selectedHashtagsSet.has(normalized)) {
      onHashtagAdd(normalized)
      addRecent(normalized)
    }
    setInputValue('')
    // Keep open for multi-select, but close on mobile for better UX
    if (isMobile) {
      setOpen(false)
    }
  }

  const handleCreateNew = () => {
    const normalized = inputValue.toLowerCase().trim().replace(/^#/, '')
    if (normalized && allowNewHashtags) {
      handleSelectHashtag(normalized)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim() && isNewHashtag && allowNewHashtags) {
      e.preventDefault()
      handleCreateNew()
    }
    if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  const triggerButton = (
    <Button
      variant="outline"
      size="sm"
      className={cn('gap-2', triggerClassName)}
    >
      <Search className="h-4 w-4" />
      <span className="hidden sm:inline">{placeholder}</span>
      <span className="sm:hidden">Search</span>
    </Button>
  )

  const suggestionContent = (
    <Command shouldFilter={false} className="border-0">
      <div className="flex items-center border-b px-3">
        <Hash className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex h-11 w-full border-0 bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        {isLoading && <Loader2 className="h-4 w-4 animate-spin opacity-50" />}
      </div>
      <CommandList className="max-h-[300px]">
        {!isLoading && suggestions.length === 0 && !isNewHashtag && (
          <CommandEmpty>No hashtags found.</CommandEmpty>
        )}

        {/* Create new hashtag option */}
        {allowNewHashtags && isNewHashtag && inputValue.trim() && (
          <CommandGroup heading="Create new">
            <CommandItem
              onSelect={handleCreateNew}
              className="gap-2 border-l-2 border-purple-500 bg-purple-500/10"
            >
              <Plus className="h-4 w-4" />
              <span>#{inputValue.trim().toLowerCase()}</span>
              <Badge
                variant="outline"
                className="ml-auto text-xs bg-purple-500/20 border-purple-500/50"
              >
                New
              </Badge>
            </CommandItem>
          </CommandGroup>
        )}

        {/* Recent suggestions */}
        {recentSuggestions.length > 0 && (
          <CommandGroup heading="Recent">
            {recentSuggestions.map((suggestion) => (
              <CommandItem
                key={suggestion.hashtag}
                value={suggestion.hashtag}
                onSelect={() => handleSelectHashtag(suggestion.hashtag)}
                className="gap-2"
              >
                <Hash className="h-3 w-3 opacity-50" />
                <span>{suggestion.hashtag}</span>
                <span className="ml-auto text-xs text-muted-foreground">
                  Recent
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {/* Matching/Popular suggestions */}
        {otherSuggestions.length > 0 && (
          <CommandGroup
            heading={inputValue.trim() ? 'Matching' : 'Popular'}
          >
            {otherSuggestions.map((suggestion) => (
              <CommandItem
                key={suggestion.hashtag}
                value={suggestion.hashtag}
                onSelect={() => handleSelectHashtag(suggestion.hashtag)}
                className="gap-2"
              >
                <Hash className="h-3 w-3 opacity-50" />
                <span>{suggestion.hashtag}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  )

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {/* Trigger and popover/drawer */}
      {isMobile ? (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>{triggerButton}</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Add Hashtag</DrawerTitle>
            </DrawerHeader>
            <div className="px-4 pb-4">{suggestionContent}</div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>{triggerButton}</PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="start">
            {suggestionContent}
          </PopoverContent>
        </Popover>
      )}

      {/* Selected hashtags badges */}
      {showSelectedBadges && selectedHashtags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedHashtags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="gap-1 pl-2 pr-1 py-1"
            >
              <Hash className="h-3 w-3" />
              {tag}
              <button
                type="button"
                onClick={() => onHashtagRemove(tag)}
                className="ml-1 rounded-sm hover:bg-muted p-0.5"
                aria-label={`Remove ${tag}`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
