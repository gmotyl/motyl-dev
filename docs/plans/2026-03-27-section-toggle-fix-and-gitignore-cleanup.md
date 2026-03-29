# Section Toggle Fix & Gitignore Cleanup

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix mobile crash when toggling section visibility, and gitignore generated `hashtag-stats.json`.

**Architecture:** Remove dual-state pattern from section toggle — parent owns state via `useSectionVisibility()`, child is stateless dialog opener. Add hydration guard on read-all-news page. Gitignore `hashtag-stats.json` like `content-cache.json`.

**Tech Stack:** Next.js, React, TypeScript

---

### Task 1: Gitignore `hashtag-stats.json`

**Files:**
- Modify: `.gitignore`

**Step 1: Add hashtag-stats.json to .gitignore**

In `.gitignore`, after the existing `/data/content-cache.json` line, add:

```
/data/hashtag-stats.json
```

**Step 2: Remove from git tracking**

Run: `git rm --cached data/hashtag-stats.json`

**Step 3: Commit**

```bash
git add .gitignore
git commit -m "chore: gitignore hashtag-stats.json (generated file)"
```

---

### Task 2: Make `ArticleSectionToggle` stateless

**Files:**
- Modify: `components/article-section-toggle.tsx`
- Modify: `components/article-wrapper.tsx`

**Step 1: Refactor `ArticleSectionToggle` to accept state from parent**

Replace `components/article-section-toggle.tsx` — remove internal `useSectionVisibility()` call, accept `hiddenSections` + `onToggle` as props instead of `onChange`:

```tsx
'use client'

import { useState } from 'react'
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
import { ALL_SECTIONS } from '@/hooks/use-section-visibility'
import type { SectionType } from '@/lib/section-filter'

interface ArticleSectionToggleProps {
  hiddenSections: Set<SectionType>
  onToggle: (sectionId: SectionType, visible: boolean) => void
}

export function ArticleSectionToggle({
  hiddenSections,
  onToggle,
}: ArticleSectionToggleProps) {
  const [isOpen, setIsOpen] = useState(false)

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
        onToggle={onToggle}
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
```

**Step 2: Update `ArticleWrapper` to own state via hook**

Replace `components/article-wrapper.tsx` — use `useSectionVisibility()` directly, pass state down to `ArticleSectionToggle`:

```tsx
'use client'

import { useMemo } from 'react'
import { ArticleSectionToggle } from '@/components/article-section-toggle'
import { MarkdownWithCTA } from '@/components/markdown-with-cta'
import { ShareAIButton } from '@/components/share-ai-button'
import { TTSPlayer } from '@/components/tts-player'
import { filterHiddenSections, type SectionType } from '@/lib/section-filter'
import { ItemType } from '@/lib/types'
import { detectLanguageFromHashtags } from '@/lib/tts'
import { getContentCategory } from '@/lib/og'
import { useSectionVisibility } from '@/hooks/use-section-visibility'

interface ArticleWrapperProps {
  article: {
    slug: string
    content: string
    title: string
    itemType: ItemType
    hashtags?: string[]
  }
  translatePrompt: string
}

export function ArticleWrapper({ article, translatePrompt }: ArticleWrapperProps) {
  const isNews = article.itemType === ItemType.News
  const { hiddenSections, toggleSection, isHydrated } = useSectionVisibility(
    isNews ? ['summary', 'keyTakeaways', 'tradeoffs'] : []
  )

  const filteredContent = useMemo(() => {
    return isNews ? filterHiddenSections(article.content, hiddenSections) : article.content
  }, [article.content, hiddenSections, isNews])

  const voice = detectLanguageFromHashtags(article.hashtags)

  return (
    <>
      {isNews && isHydrated && (
        <ArticleSectionToggle hiddenSections={hiddenSections} onToggle={toggleSection} />
      )}

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <ShareAIButton
          prompt={translatePrompt}
          articleSlug={article.slug}
          articleContent={filteredContent}
          buttonLabel="AI Review"
          shareTitle="Review article with AI"
          successMessage="Shared successfully! Now send the message and tap Read Aloud"
          desktopSuccessMessage="Copied! Open ChatGPT or Gemini, paste, and use Read Aloud"
        />

        <TTSPlayer content={filteredContent} title={article.title} voice={voice} compact />
      </div>

      <MarkdownWithCTA
        content={filteredContent}
        itemType={article.itemType}
        articleSlug={article.slug}
        category={getContentCategory(article.hashtags ?? [])}
      />
    </>
  )
}
```

**Step 3: Run the dev server and verify single article page**

Run: `pnpm dev`
Navigate to any news article, toggle sections. Confirm no crash.

**Step 4: Commit**

```bash
git add components/article-section-toggle.tsx components/article-wrapper.tsx
git commit -m "fix: remove dual-state from section toggle to prevent mobile crash"
```

---

### Task 3: Add hydration guard to read-all-news page

**Files:**
- Modify: `app/read-all-news/page.client.tsx`

**Step 1: Add `isHydrated` guard**

In `app/read-all-news/page.client.tsx`, line 34 — destructure `isHydrated`:

```tsx
const { hiddenSections, toggleSection, isHydrated } = useSectionVisibility()
```

Then wrap the articles list (around line 203) with a hydration check. Replace:

```tsx
<div className="space-y-0">
  {items.map((item, index) => (
```

With:

```tsx
<div className="space-y-0">
  {isHydrated && items.map((item, index) => (
```

**Step 2: Verify read-all-news page**

Run: `pnpm dev`
Navigate to `/read-all-news`, toggle sections via the floating settings button. Confirm no crash on mobile viewport.

**Step 3: Commit**

```bash
git add app/read-all-news/page.client.tsx
git commit -m "fix: add hydration guard to read-all-news section toggle"
```

---

### Task 4: Run existing tests

**Step 1: Run section toggle tests**

Run: `pnpm test -- article-section-toggle`

If tests reference the old `onChange` prop, update them to use `hiddenSections` + `onToggle` props.

**Step 2: Commit any test fixes**

```bash
git add components/article-section-toggle.test.tsx
git commit -m "test: update section toggle tests for stateless component"
```
