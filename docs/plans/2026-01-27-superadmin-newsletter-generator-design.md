# Superadmin & Newsletter Generator Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add superadmin role (env-based) and a newsletter generator page that lets superadmin select bookmarked links, generate structured markdown with AI prompt, and clean up used bookmarks.

**Architecture:** NextAuth session extended with `isSuperAdmin` boolean. New `/newsletter-generator` page fetches bookmarks client-side, groups by hashtag. Server-side API extracts TLDR/takeaways from linked news articles. Client assembles final prompt+content markdown for clipboard/download.

**Tech Stack:** Next.js 15 App Router, NextAuth v5, React 19, Tailwind CSS, Radix UI, Prisma/PostgreSQL

---

### Task 1: Add SUPERADMIN_EMAIL env variable

**Files:**
- Modify: `.env`

**Step 1: Add env var**

Add to `.env` after the `NARRATOR_PERSONA` line:

```
SUPERADMIN_EMAIL=
```

**Step 2: Commit**

```bash
git add .env
git commit -m "feat: add SUPERADMIN_EMAIL env variable"
```

---

### Task 2: Add isSuperAdmin to auth session

**Files:**
- Modify: `lib/auth.ts`

**Step 1: Extend the Session type declaration**

In `lib/auth.ts`, update the `declare module "next-auth"` block to add `isSuperAdmin`:

```typescript
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      githubId?: string
      isSuperAdmin?: boolean
    } & DefaultSession["user"]
  }
}
```

**Step 2: Update the session callback**

In the `session` callback (around line 77), add `isSuperAdmin` computation:

```typescript
async session({ session, user, token }) {
  if (session.user) {
    // Handle both JWT (dev) and database (prod) sessions
    if (token) {
      session.user.id = token.id as string
      session.user.githubId = token.githubId as string
    } else if (user) {
      session.user.id = user.id
      session.user.githubId = (user as any).githubId
    }
    // Superadmin check
    session.user.isSuperAdmin =
      !!process.env.SUPERADMIN_EMAIL &&
      session.user.email === process.env.SUPERADMIN_EMAIL
  }
  return session
},
```

**Step 3: Verify build**

```bash
pnpm build
```

Expected: Build passes. No runtime test needed — this is a session extension.

**Step 4: Commit**

```bash
git add lib/auth.ts
git commit -m "feat: add isSuperAdmin to NextAuth session"
```

---

### Task 3: Add "Generate Newsletter" CTA to me page

**Files:**
- Modify: `app/me/page.tsx`

**Step 1: Add import**

Add `Newspaper` to the lucide-react import:

```typescript
import {
  Bookmark,
  CheckCircle2,
  LogOut,
  Download,
  User,
  ChevronRight,
  Github,
  Newspaper,
} from "lucide-react"
```

**Step 2: Add superadmin section**

After the "Your Content" section (after the closing `</section>` at around line 161), add:

```tsx
{/* Superadmin Section */}
{session?.user?.isSuperAdmin && (
  <section className="space-y-3 mb-8">
    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider px-1">
      Admin
    </h3>
    <div className="space-y-2">
      <MenuLink
        href="/newsletter-generator"
        icon={Newspaper}
        label="Generate Newsletter"
        description="Create newsletter from bookmarked links"
      />
    </div>
  </section>
)}
```

Note: TypeScript may complain about `isSuperAdmin` not existing on `session.user`. Since we extended the Session type in `lib/auth.ts`, this should resolve. If it doesn't, cast: `(session?.user as any)?.isSuperAdmin`.

**Step 3: Verify visually**

Set `SUPERADMIN_EMAIL` in `.env` to your dev email, run `pnpm dev`, sign in, visit `/me`. The "Admin" section should appear with "Generate Newsletter".

**Step 4: Commit**

```bash
git add app/me/page.tsx
git commit -m "feat: add Generate Newsletter CTA for superadmin on me page"
```

---

### Task 4: Create newsletter content extraction API

**Files:**
- Create: `app/api/newsletter/content/route.ts`
- Create: `lib/newsletter.ts`

**Step 1: Create `lib/newsletter.ts`**

This file extracts TLDR and Key Takeaways from article markdown content:

```typescript
'use server'

import { getContentItemBySlug } from './articles'

export interface ArticleExtract {
  slug: string
  title: string
  tldr: string | null
  keyTakeaways: string[] | null
}

/**
 * Extract TLDR section from article markdown.
 * Handles patterns: "**TLDR:**", "### TLDR:", "## TLDR:"
 */
function extractTldr(content: string): string | null {
  // Match **TLDR:** or ### TLDR: or ## TLDR: followed by content until next section
  const patterns = [
    /\*\*TLDR:\*\*\s*([\s\S]*?)(?=\n\n(?:\*\*|##|---|$))/i,
    /^###?\s+TLDR:?\s*\n\n([\s\S]*?)(?=\n\n(?:\*\*|##|---|$))/im,
  ]

  for (const pattern of patterns) {
    const match = content.match(pattern)
    if (match?.[1]?.trim()) {
      return match[1].trim()
    }
  }
  return null
}

/**
 * Extract Key Takeaways bullet list from article markdown.
 * Handles patterns: "**Key takeaways:**" followed by bullet list
 */
function extractKeyTakeaways(content: string): string[] | null {
  // Match **Key takeaways:** or ## Key ... followed by bullet list
  const patterns = [
    /\*\*Key takeaways:\*\*\s*\n([\s\S]*?)(?=\n\n(?:\*\*|##|---|$))/i,
    /^##\s+Key [A-Za-z\s]+\n\n([\s\S]*?)(?=\n\n(?:\*\*|##|---|$))/im,
  ]

  for (const pattern of patterns) {
    const match = content.match(pattern)
    if (match?.[1]?.trim()) {
      const bullets = match[1]
        .split('\n')
        .map(line => line.replace(/^[-*]\s+/, '').trim())
        .filter(line => line.length > 0)
      if (bullets.length > 0) return bullets
    }
  }
  return null
}

/**
 * Extract TLDR and Key Takeaways from articles by their slugs.
 */
export async function extractArticleContent(slugs: string[]): Promise<ArticleExtract[]> {
  const results: ArticleExtract[] = []

  for (const slug of slugs) {
    const article = await getContentItemBySlug(slug)
    if (!article) {
      results.push({ slug, title: slug, tldr: null, keyTakeaways: null })
      continue
    }

    results.push({
      slug,
      title: article.title,
      tldr: extractTldr(article.content),
      keyTakeaways: extractKeyTakeaways(article.content),
    })
  }

  return results
}
```

**Step 2: Create `app/api/newsletter/content/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { extractArticleContent } from '@/lib/newsletter'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Superadmin check
    if (!session.user.isSuperAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const slugs = request.nextUrl.searchParams.get('slugs')
    if (!slugs) {
      return NextResponse.json({ error: 'slugs parameter required' }, { status: 400 })
    }

    const slugList = slugs.split(',').filter(Boolean)
    if (slugList.length === 0) {
      return NextResponse.json({ error: 'At least one slug required' }, { status: 400 })
    }

    const extracts = await extractArticleContent(slugList)

    return NextResponse.json({ success: true, extracts })
  } catch (error) {
    console.error('Newsletter content extraction error:', error)
    return NextResponse.json({ error: 'Failed to extract content' }, { status: 500 })
  }
}
```

**Step 3: Verify build**

```bash
pnpm build
```

**Step 4: Commit**

```bash
git add lib/newsletter.ts app/api/newsletter/content/route.ts
git commit -m "feat: add newsletter content extraction API"
```

---

### Task 5: Create newsletter prompt template

**Files:**
- Create: `public/NEWSLETTER_PROMPT.md`

**Step 1: Create the prompt file**

```markdown
You are a tech newsletter writer channeling the style of {NARRATOR_PERSONA}.
Below is curated content from recent tech articles, grouped by topic.

Write an engaging newsletter that:
- Opens with a brief editorial intro connecting the themes
- Covers each topic with natural transitions between sections
- Uses the TLDR and Key Takeaways as source material — rephrase, don't copy-paste
- Includes the original links so readers can dive deeper
- Keeps a conversational but knowledgeable tone
- Ends with a short sign-off

Output format: Markdown

--- CURATED CONTENT BELOW ---
```

**Step 2: Commit**

```bash
git add public/NEWSLETTER_PROMPT.md
git commit -m "feat: add newsletter AI prompt template"
```

---

### Task 6: Create newsletter generator page

**Files:**
- Create: `app/newsletter-generator/page.tsx`

This is the largest task. The page is a `"use client"` component with these sections:

1. **Auth guard** — uses `useSession()`, redirects non-superadmin to `/me`
2. **Bookmark list** — fetches via `useBookmarks()`, groups by hashtag, checkboxes
3. **Generate** — calls `/api/newsletter/content` for selected slugs, assembles markdown
4. **Output** — textarea preview + Copy/Download/Remove Selected buttons

**Step 1: Create the page**

```tsx
'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useMemo, useCallback } from 'react'
import { useBookmarks, type Bookmark } from '@/hooks/use-bookmarks'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { toast } from 'sonner'
import {
  Copy,
  Download,
  Trash2,
  ChevronDown,
  FileText,
  Loader2,
} from 'lucide-react'

interface ArticleExtract {
  slug: string
  title: string
  tldr: string | null
  keyTakeaways: string[] | null
}

export default function NewsletterGeneratorPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { bookmarks, isLoading: bookmarksLoading, removeBookmark } = useBookmarks()

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [generatedMarkdown, setGeneratedMarkdown] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [hasExported, setHasExported] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [promptTemplate, setPromptTemplate] = useState<string>('')

  // Load prompt template
  useEffect(() => {
    fetch('/NEWSLETTER_PROMPT.md')
      .then(res => res.text())
      .then(setPromptTemplate)
      .catch(err => console.error('Failed to load prompt template:', err))
  }, [])

  // Auth guard
  useEffect(() => {
    if (status === 'loading') return
    if (!session?.user?.isSuperAdmin) {
      router.replace('/me')
    }
  }, [session, status, router])

  // Group bookmarks by hashtag
  const groupedBookmarks = useMemo(() => {
    const groups: Record<string, Bookmark[]> = {}
    bookmarks.forEach(bookmark => {
      if (bookmark.hashtags.length === 0) {
        if (!groups['Uncategorized']) groups['Uncategorized'] = []
        groups['Uncategorized'].push(bookmark)
      } else {
        bookmark.hashtags.forEach(tag => {
          if (!groups[tag]) groups[tag] = []
          if (!groups[tag].some(b => b.id === bookmark.id)) {
            groups[tag].push(bookmark)
          }
        })
      }
    })
    return groups
  }, [bookmarks])

  const sortedHashtags = useMemo(
    () => Object.keys(groupedBookmarks).sort(),
    [groupedBookmarks]
  )

  // Selection handlers
  const toggleSelection = useCallback((id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const selectAll = useCallback(() => {
    setSelectedIds(new Set(bookmarks.map(b => b.id)))
  }, [bookmarks])

  const deselectAll = useCallback(() => {
    setSelectedIds(new Set())
  }, [])

  // Generate markdown
  const handleGenerate = useCallback(async () => {
    if (selectedIds.size === 0) return

    setIsGenerating(true)
    setHasExported(false)

    try {
      const selected = bookmarks.filter(b => selectedIds.has(b.id))

      // Get unique article slugs from selected bookmarks
      const slugs = [...new Set(
        selected
          .map(b => b.articleSlug)
          .filter((s): s is string => !!s)
      )]

      // Fetch article extracts from API
      let extracts: ArticleExtract[] = []
      if (slugs.length > 0) {
        const res = await fetch(
          `/api/newsletter/content?slugs=${slugs.join(',')}`
        )
        if (res.ok) {
          const data = await res.json()
          extracts = data.extracts || []
        }
      }

      // Build extract lookup by slug
      const extractMap = new Map(extracts.map(e => [e.slug, e]))

      // Group selected bookmarks by hashtag for output
      const outputGroups: Record<string, Bookmark[]> = {}
      selected.forEach(bookmark => {
        const tag = bookmark.hashtags[0] || 'Uncategorized'
        if (!outputGroups[tag]) outputGroups[tag] = []
        outputGroups[tag].push(bookmark)
      })

      // Assemble prompt
      let prompt = promptTemplate.replace(
        /\{NARRATOR_PERSONA\}/g,
        process.env.NEXT_PUBLIC_NARRATOR_PERSONA || 'a knowledgeable tech writer'
      )

      // Assemble content sections
      let content = ''
      Object.keys(outputGroups)
        .sort()
        .forEach(tag => {
          content += `\n## ${tag}\n\n`
          outputGroups[tag].forEach(bookmark => {
            content += `### ${bookmark.title}\n`
            content += `**Link:** ${bookmark.url}\n\n`

            const extract = bookmark.articleSlug
              ? extractMap.get(bookmark.articleSlug)
              : null

            if (extract?.tldr) {
              content += `**TLDR:** ${extract.tldr}\n\n`
            }
            if (extract?.keyTakeaways && extract.keyTakeaways.length > 0) {
              content += `**Key takeaways:**\n`
              extract.keyTakeaways.forEach(t => {
                content += `- ${t}\n`
              })
              content += '\n'
            }
            if (!extract?.tldr && !extract?.keyTakeaways) {
              if (bookmark.notes) {
                content += `**Notes:** ${bookmark.notes}\n\n`
              }
            }
          })
        })

      setGeneratedMarkdown(`${prompt}\n${content}`)
    } catch (error) {
      console.error('Generation failed:', error)
      toast.error('Failed to generate newsletter content')
    } finally {
      setIsGenerating(false)
    }
  }, [selectedIds, bookmarks, promptTemplate])

  // Copy to clipboard
  const handleCopy = useCallback(async () => {
    if (!generatedMarkdown) return
    try {
      await navigator.clipboard.writeText(generatedMarkdown)
      toast.success('Copied to clipboard')
      setHasExported(true)
    } catch {
      toast.error('Failed to copy')
    }
  }, [generatedMarkdown])

  // Download as .md file
  const handleDownload = useCallback(() => {
    if (!generatedMarkdown) return
    const blob = new Blob([generatedMarkdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `newsletter-${new Date().toISOString().split('T')[0]}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Downloaded')
    setHasExported(true)
  }, [generatedMarkdown])

  // Delete selected bookmarks
  const handleDeleteSelected = useCallback(async () => {
    setIsDeleting(true)
    try {
      const ids = [...selectedIds]
      for (const id of ids) {
        await removeBookmark(id)
      }
      setSelectedIds(new Set())
      setGeneratedMarkdown(null)
      setHasExported(false)
      setShowDeleteDialog(false)
      toast.success(`Removed ${ids.length} bookmarks`)
    } catch (error) {
      console.error('Delete failed:', error)
      toast.error('Failed to remove some bookmarks')
    } finally {
      setIsDeleting(false)
    }
  }, [selectedIds, removeBookmark])

  // Loading / auth states
  if (status === 'loading' || bookmarksLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 container py-8 px-4 max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-64 bg-muted rounded" />
            <div className="h-4 w-96 bg-muted rounded" />
            <div className="space-y-3 mt-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-16 bg-muted rounded" />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!session?.user?.isSuperAdmin) return null

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-8 px-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Newsletter Generator</h1>
        <p className="text-muted-foreground mb-6">
          Select bookmarked links to include in the newsletter
        </p>

        {/* Selection controls */}
        <div className="flex items-center gap-3 mb-4">
          <Button variant="outline" size="sm" onClick={selectAll}>
            Select All
          </Button>
          <Button variant="outline" size="sm" onClick={deselectAll}>
            Deselect All
          </Button>
          <span className="text-sm text-muted-foreground">
            {selectedIds.size} of {bookmarks.length} selected
          </span>
        </div>

        {/* Bookmarks grouped by hashtag */}
        {bookmarks.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No bookmarks found. Save some links first.
          </div>
        ) : (
          <div className="space-y-2 mb-8">
            {sortedHashtags.map(tag => (
              <Collapsible key={tag} defaultOpen>
                <CollapsibleTrigger className="flex items-center gap-2 w-full p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors text-left font-medium">
                  <ChevronDown className="h-4 w-4 transition-transform [[data-state=closed]>&]:rotate-[-90deg]" />
                  <span>{tag}</span>
                  <span className="text-sm text-muted-foreground ml-auto">
                    {groupedBookmarks[tag].length}
                  </span>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="ml-2 mt-1 space-y-1">
                    {groupedBookmarks[tag].map(bookmark => (
                      <label
                        key={`${tag}-${bookmark.id}`}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/20 transition-colors cursor-pointer"
                      >
                        <Checkbox
                          checked={selectedIds.has(bookmark.id)}
                          onCheckedChange={() => toggleSelection(bookmark.id)}
                          className="mt-0.5"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">
                            {bookmark.title}
                          </div>
                          <div className="text-xs text-muted-foreground truncate">
                            {bookmark.url}
                          </div>
                          {bookmark.articleSlug && (
                            <div className="text-xs text-primary/70 mt-0.5">
                              Source: {bookmark.articleSlug}
                            </div>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        )}

        {/* Generate button */}
        <Button
          onClick={handleGenerate}
          disabled={selectedIds.size === 0 || isGenerating}
          className="mb-6 gap-2"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <FileText className="h-4 w-4" />
              Generate Newsletter ({selectedIds.size})
            </>
          )}
        </Button>

        {/* Generated output */}
        {generatedMarkdown && (
          <div className="space-y-4">
            <textarea
              readOnly
              value={generatedMarkdown}
              className="w-full h-96 p-4 rounded-lg border bg-muted/20 font-mono text-sm resize-y"
            />
            <div className="flex gap-3">
              <Button onClick={handleCopy} variant="outline" className="gap-2">
                <Copy className="h-4 w-4" />
                Copy to Clipboard
              </Button>
              <Button onClick={handleDownload} variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Download .md
              </Button>
              <Button
                onClick={() => setShowDeleteDialog(true)}
                variant="destructive"
                disabled={!hasExported}
                className="gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Remove Selected
              </Button>
            </div>
          </div>
        )}

        {/* Delete confirmation dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Remove selected bookmarks?</DialogTitle>
              <DialogDescription>
                This will permanently remove {selectedIds.size} bookmark{selectedIds.size !== 1 ? 's' : ''} used in this newsletter.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowDeleteDialog(false)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteSelected}
                disabled={isDeleting}
                className="gap-2"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Removing...
                  </>
                ) : (
                  'Remove'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  )
}
```

**Step 2: Expose NARRATOR_PERSONA to client**

The prompt template uses `{NARRATOR_PERSONA}` which is a server env var. We need to expose it as `NEXT_PUBLIC_NARRATOR_PERSONA` for client-side access. Add to `.env`:

```
NEXT_PUBLIC_NARRATOR_PERSONA=Scott Hanselman
```

**Step 3: Verify build**

```bash
pnpm build
```

**Step 4: Verify manually**

1. Set `SUPERADMIN_EMAIL` to your dev email in `.env`
2. Run `pnpm dev`
3. Sign in, go to `/me` — see "Generate Newsletter" link
4. Go to `/newsletter-generator`
5. Bookmarks should load grouped by hashtag
6. Select some, click "Generate Newsletter"
7. Preview shows prompt + structured content
8. "Copy to Clipboard" copies it
9. "Download .md" downloads file
10. "Remove Selected" enables after copy/download, opens dialog

**Step 5: Commit**

```bash
git add app/newsletter-generator/page.tsx .env
git commit -m "feat: add newsletter generator page"
```

---

### Task 7: Check Collapsible component exists

**Files:**
- Possibly create: `components/ui/collapsible.tsx`

**Step 1: Check if Collapsible exists**

```bash
ls components/ui/collapsible.tsx 2>/dev/null || echo "MISSING"
```

If missing, install and create it:

```bash
pnpm dlx shadcn@latest add collapsible
```

**Step 2: Commit if created**

```bash
git add components/ui/collapsible.tsx
git commit -m "chore: add collapsible component"
```

---

### Task 8: Final build and test

**Step 1: Run build**

```bash
pnpm build
```

Expected: Clean build.

**Step 2: Run tests**

```bash
pnpm test --run
```

Expected: All existing tests pass.

**Step 3: Manual smoke test**

Full flow: `/me` → "Generate Newsletter" → select bookmarks → generate → copy → download → remove selected → confirm → bookmarks deleted.

**Step 4: Final commit if any fixes needed**

---

## File Summary

| Action | File |
|--------|------|
| Modify | `.env` — add `SUPERADMIN_EMAIL`, `NEXT_PUBLIC_NARRATOR_PERSONA` |
| Modify | `lib/auth.ts` — extend Session type, add `isSuperAdmin` to callback |
| Modify | `app/me/page.tsx` — add Admin section with "Generate Newsletter" link |
| Create | `lib/newsletter.ts` — TLDR/takeaways extraction helpers |
| Create | `app/api/newsletter/content/route.ts` — content extraction API |
| Create | `public/NEWSLETTER_PROMPT.md` — AI prompt template |
| Create | `app/newsletter-generator/page.tsx` — full generator page |
| Maybe  | `components/ui/collapsible.tsx` — if not already present |
