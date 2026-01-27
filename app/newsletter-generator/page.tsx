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
      const prompt = promptTemplate.replace(
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
