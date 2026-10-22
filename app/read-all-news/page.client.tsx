'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { ReaderControlBar } from '@/components/reader-control-bar'
import { MarkdownContent } from '@/components/markdown-content'
import { filterHiddenSections, type SectionType } from '@/lib/content/section-filter'
import { ItemType } from '@/lib/content/types'
import { ContentItem } from '@/lib/content/articles'
import { useContinuousReader, type ScrollHint } from '@/hooks/use-continuous-reader'
import { MarkReadDialog } from '@/components/mark-read-dialog'
import { SectionVisibilityDialog } from '@/components/article-section-toggle'
import { useSectionVisibility } from '@/hooks/use-section-visibility'
import { Copy, Check, Settings } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { prepareSpeechSections, stripMarkdown, type SpeechSection } from '@/lib/tts/speech'
import { headingToId } from '@/lib/content/heading-slug'
import { scrollHeadingIntoView } from '@/lib/reader/scroll-heading'
import { resolveScrollTarget } from '@/lib/reader/scroll-target'
import { firstExternalLink } from '@/lib/reader/section-link'
import type { ReaderVoteStripProps } from '@/components/reader-vote-strip'

interface ReadAllNewsPageProps {
  initialItems: ContentItem[]
  totalItems: number
}

const MAX_DOM_ARTICLES = 12

/** How a load-more ended: new items arrived, the server has nothing further, or the request failed. */
type LoadMoreResult = 'appended' | 'exhausted' | 'failed'

/** Spoken once the reader has read everything and the server has nothing further. */
export const READ_ALL_NEWS_CLOSING_LINE = 'To już wszystkie nowe artykuły.'

export default function ReadAllNewsPage({ initialItems, totalItems }: ReadAllNewsPageProps) {
  const { data: session } = useSession()
  const [items, setItems] = useState<ContentItem[]>(initialItems)
  const [scrolledPastSlugs, setScrolledPastSlugs] = useState<Set<string>>(new Set())
  // Bumped on every mark read. Clearing scrolledPastSlugs also drops the
  // articles that survive (the one being read, any the user unchecked), and
  // each FullArticle reports its scroll-past only once — so the survivors
  // re-arm their observer on this bump, or they could never rejoin the list.
  const [scrollPastEpoch, setScrollPastEpoch] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(initialItems.length < totalItems)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [pendingNavUrl, setPendingNavUrl] = useState<string | null>(null)
  const [sectionToggleOpen, setSectionToggleOpen] = useState(false)
  const [exportState, setExportState] = useState<'idle' | 'working' | 'done' | 'error'>('idle')

  const { hiddenSections, toggleSection, isHydrated } = useSectionVisibility()

  const speechSections = useMemo(
    () => prepareSpeechSections(items.map((item) => ({
      slug: item.slug,
      title: item.title,
      content: filterHiddenSections(item.content, hiddenSections),
    }))),
    [items, hiddenSections]
  )

  const scrollToSection = useCallback((section: SpeechSection, index: number, scroll?: ScrollHint) => {
    const article = Array.from(document.querySelectorAll<HTMLElement>('article[data-reader-article]'))
      .find((candidate) => candidate.dataset.readerArticle === section.sourceSlug)
    scrollHeadingIntoView(resolveScrollTarget(article, speechSections, section, index, scroll))
  }, [speechSections])

  const loadMoreRef = useRef<HTMLDivElement>(null)
  // Refs so fetchMore can read current values without stale closures or extra deps
  const itemsRef = useRef<ContentItem[]>(initialItems)
  const scrolledPastSlugsRef = useRef<Set<string>>(new Set())
  const sessionRef = useRef(session)
  // The article the reader is on. Read as a ref so the eviction guard sees the
  // live value without adding a per-tick dep to fetchMore. Synced right after
  // the reader is created below (fetchMore has to exist before the reader).
  const readerSlugRef = useRef<string | null>(null)
  // Every slug we have ever fetched, including those evicted from the DOM.
  // Sent as excludeSlugs so the server doesn't return them again, regardless
  // of how the visited cookie shifts mid-session.
  const loadedSlugsRef = useRef<Set<string>>(new Set(initialItems.map((i) => i.slug)))
  useEffect(() => { itemsRef.current = items }, [items])
  useEffect(() => { scrolledPastSlugsRef.current = scrolledPastSlugs }, [scrolledPastSlugs])
  useEffect(() => { sessionRef.current = session }, [session])

  // Mirrors hasMore so fetchMore stays stable and never reads a stale closure.
  const hasMoreRef = useRef(hasMore)
  // The running load-more, shared by every caller (scroll now, the reader at
  // the queue end later) so concurrent triggers ride one request.
  const inFlightRef = useRef<Promise<LoadMoreResult> | null>(null)

  // One request against /api/content; fetchMore below owns the sharing.
  const loadMore = useCallback(async (): Promise<LoadMoreResult> => {
    try {
      const exclude = Array.from(loadedSlugsRef.current)
      const params = new URLSearchParams({
        page: '1',
        limit: '5',
        unseen: 'true',
        contentType: 'news',
        includeContent: 'true',
      })
      if (exclude.length) params.set('excludeSlugs', exclude.join(','))

      const res = await fetch(`/api/content?${params}`)
      if (!res.ok) throw new Error(`Load more failed: ${res.status}`)
      const data = await res.json()

      if (data.items?.length > 0) {
        const prevItems = itemsRef.current
        const scrolled = scrolledPastSlugsRef.current
        const sess = sessionRef.current
        const newItems = (data.items as ContentItem[]).filter(
          (i) => !loadedSlugsRef.current.has(i.slug),
        )
        for (const i of newItems) loadedSlugsRef.current.add(i.slug)
        const combined = [...prevItems, ...newItems]

        // Evict oldest scrolled-past articles to keep DOM manageable on mobile.
        // The article being read is never a candidate, however old or however
        // long ago it scrolled past — unmounting it would move the reading
        // position off the audio the listener is hearing.
        const readingSlug = readerSlugRef.current
        let finalItems = combined
        if (combined.length > MAX_DOM_ARTICLES && scrolled.size > 0) {
          const toEvict = combined
            .filter(i => scrolled.has(i.slug) && i.slug !== readingSlug)
            .slice(0, combined.length - MAX_DOM_ARTICLES)

          if (toEvict.length > 0) {
            const evictSlugs = toEvict.map(i => i.slug)
            finalItems = combined.filter(i => !evictSlugs.includes(i.slug))

            // Mark evicted articles as read in storage — user scrolled past them
            const stored = localStorage.getItem('visitedArticles')
            let existing: string[] = []
            try { existing = stored ? JSON.parse(stored) : [] } catch { /* ignore */ }
            const merged = [...new Set([...existing, ...evictSlugs])]
            localStorage.setItem('visitedArticles', JSON.stringify(merged))
            document.cookie = `visitedArticles=${JSON.stringify(merged)};path=/;max-age=31536000;samesite=lax`
            if (sess?.user) {
              evictSlugs.forEach(slug =>
                fetch(`/api/articles/${slug}/view`, { method: 'POST' }).catch(console.error)
              )
            }
            setScrolledPastSlugs(prev => {
              const next = new Set(prev)
              evictSlugs.forEach(s => next.delete(s))
              return next
            })
          }
        }

        setItems(finalItems)
        hasMoreRef.current = data.currentPage < data.totalPages
        setHasMore(hasMoreRef.current)
        return 'appended'
      }
      hasMoreRef.current = false
      setHasMore(false)
      return 'exhausted'
    } catch (error) {
      // Items and hasMore stay as they were, so a later trigger can retry.
      console.error('Failed to fetch more items:', error)
      return 'failed'
    }
  }, [])

  const fetchMore = useCallback((): Promise<LoadMoreResult> => {
    if (inFlightRef.current) return inFlightRef.current
    if (!hasMoreRef.current) return Promise.resolve('exhausted')
    setLoading(true)

    const request = loadMore().finally(() => {
      inFlightRef.current = null
      setLoading(false)
    })
    inFlightRef.current = request
    return request
  }, [loadMore])

  const reader = useContinuousReader(speechSections, {
    onItemChange: scrollToSection,
    moreMayCome: hasMore,
    requestMore: fetchMore,
    closingLine: READ_ALL_NEWS_CLOSING_LINE,
  })
  useEffect(() => { readerSlugRef.current = reader.currentSlug }, [reader.currentSlug])

  // The bar's vote strip targets the Section being READ (`currentItem`) —
  // playing, paused or not yet started — never the eye Next cascades while
  // playing. `firstExternalLink` parses markdown, so it runs once per Section,
  // not on every progress tick.
  const currentSection = reader.currentItem
  const currentMarkdown = currentSection?.markdown
  const currentLink = useMemo(
    () => (currentMarkdown == null ? null : firstExternalLink(currentMarkdown)),
    [currentMarkdown]
  )
  const currentTitle = currentSection?.title
  // Same values the owning article's MarkdownContent gets (patternName only,
  // no category), so a strip vote and an inline vote send the same payload.
  const currentPattern = currentSection
    ? items.find((item) => item.slug === currentSection.sourceSlug)?.sourcePattern
    : undefined
  const vote = useMemo<ReaderVoteStripProps | undefined>(
    () => (currentTitle == null
      ? undefined
      : { heading: currentTitle, link: currentLink, category: undefined, patternName: currentPattern }),
    [currentTitle, currentLink, currentPattern]
  )

  const handlePlayPause = useCallback(() => {
    if (reader.isPlaying) {
      reader.pause()
      return
    }

    if (reader.currentItem) scrollToSection(reader.currentItem, reader.currentIndex)
    reader.play()
  }, [reader, scrollToSection])


  // Infinite scroll observer. Re-armed when items change, so a sentinel still
  // in view after an append keeps loading; a failure leaves items unchanged and
  // waits for the next scroll instead of retrying in a loop.
  useEffect(() => {
    if (!loadMoreRef.current || !hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchMore()
      },
      { rootMargin: '200px' }
    )

    observer.observe(loadMoreRef.current)
    return () => observer.disconnect()
  }, [hasMore, items, fetchMore])

  // Position-driven prefetch: a reader entering the last loaded article asks for
  // more without waiting for a scroll, so a hidden page keeps its queue topped
  // up. Once per article; fetchMore owns the hasMore check and the sharing.
  const prefetchedSlugsRef = useRef<Set<string>>(new Set())
  const readerActive = reader.isPlaying || reader.isBuffering
  useEffect(() => {
    const slug = reader.currentSlug
    if (!readerActive || slug == null || slug !== items.at(-1)?.slug) return
    if (prefetchedSlugsRef.current.has(slug)) return
    prefetchedSlugsRef.current.add(slug)
    fetchMore()
  }, [reader.currentSlug, readerActive, items, fetchMore])

  // Track scrolled-past articles
  const handleScrolledPast = useCallback((slug: string) => {
    setScrolledPastSlugs(prev => {
      if (prev.has(slug)) return prev
      const next = new Set(prev)
      next.add(slug)
      return next
    })
  }, [])

  // Mark selected articles as visited
  const handleMarkRead = useCallback((slugs: string[]) => {
    // Update localStorage
    const stored = localStorage.getItem('visitedArticles')
    let existing: string[] = []
    try {
      existing = stored ? JSON.parse(stored) : []
    } catch {
      // ignore corrupt localStorage
    }
    const merged = [...new Set([...existing, ...slugs])]
    localStorage.setItem('visitedArticles', JSON.stringify(merged))
    document.cookie = `visitedArticles=${JSON.stringify(merged)};path=/;max-age=31536000;samesite=lax`

    // Sync to DB if logged in
    if (session?.user) {
      for (const slug of slugs) {
        fetch(`/api/articles/${slug}/view`, { method: 'POST' }).catch(console.error)
      }
    }

    // Scroll to top instantly FIRST — prevents IntersectionObservers
    // from firing on articles we'd pass during an animated scroll
    if (!pendingNavUrl) {
      window.scrollTo({ top: 0 })
    }

    // Remove marked articles and reset counter
    setItems(prev => prev.filter(item => !slugs.includes(item.slug)))
    setScrolledPastSlugs(new Set())
    setScrollPastEpoch(epoch => epoch + 1)

    // Navigate if there was a pending URL
    if (pendingNavUrl) {
      window.location.href = pendingNavUrl
    }
  }, [session, pendingNavUrl])

  const handleExport = useCallback(async () => {
    if (exportState === 'working') return
    setExportState('working')
    try {
      const PAGE_SIZE = 50
      const all: ContentItem[] = []
      for (let p = 1; p <= 40; p++) {
        const params = new URLSearchParams({
          page: String(p),
          limit: String(PAGE_SIZE),
          unseen: 'true',
          contentType: 'news',
          includeContent: 'true',
        })
        const res = await fetch(`/api/content?${params}`)
        if (!res.ok) throw new Error(`status ${res.status}`)
        const data = await res.json()
        const items: ContentItem[] = data.items ?? []
        all.push(...items)
        if (items.length < PAGE_SIZE) break
      }

      const text = all
        .map((it) => {
          const body = filterHiddenSections(it.content ?? '', hiddenSections).trim()
          const date = formatDate(it.publishedAt)
          return `# ${it.title}\n${date}\n\n${body}`
        })
        .join('\n\n---\n\n')

      const header = `Motyl.dev — unread news (${all.length} items, exported ${new Date().toISOString().slice(0, 10)})\n\n`
      await navigator.clipboard.writeText(header + text)
      setExportState('done')
      setTimeout(() => setExportState('idle'), 2000)
    } catch {
      setExportState('error')
      setTimeout(() => setExportState('idle'), 2500)
    }
  }, [exportState, hiddenSections])

  const handleDialogCancel = useCallback(() => {
    setDialogOpen(false)
    if (pendingNavUrl) {
      window.location.href = pendingNavUrl
    }
    setPendingNavUrl(null)
  }, [pendingNavUrl])

  const handleDialogConfirm = useCallback((selectedSlugs: string[]) => {
    setDialogOpen(false)
    if (selectedSlugs.length > 0) {
      handleMarkRead(selectedSlugs)
    } else if (pendingNavUrl) {
      window.location.href = pendingNavUrl
    }
    setPendingNavUrl(null)
  }, [handleMarkRead, pendingNavUrl])

  // Intercept navigation clicks
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (scrolledPastSlugs.size === 0) return

      const anchor = (e.target as HTMLElement).closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href || href.startsWith('#') || href === window.location.pathname) return

      // Only intercept internal navigation links
      const isInternal = href.startsWith('/') || href.startsWith(window.location.origin)
      if (!isInternal) return

      e.preventDefault()
      e.stopPropagation()
      setPendingNavUrl(href)
      setDialogOpen(true)
    }

    // Capture phase to intercept before Next.js router
    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [scrolledPastSlugs])

  // Memoised: a fresh array every render resets the mark-read dialog's snapshot
  const scrolledPastItems = useMemo(
    () => items.filter(item => scrolledPastSlugs.has(item.slug)),
    [items, scrolledPastSlugs]
  )

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {/* Bottom padding reserves the floating bar; with the vote strip the bar
          is 60px taller (min-h-[52px] strip + mb-2 gap). */}
      <main className={`flex-1 container py-8 px-4 ${vote ? 'pb-[15.75rem] sm:pb-[5.75rem]' : 'pb-48 sm:pb-8'} max-w-2xl mx-auto`}>
        <h1 className="text-3xl font-bold mb-2">Read all news</h1>
        <p className="text-muted-foreground mb-8">
          Scroll through unvisited articles. Mark them as read when you're done.
        </p>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              All caught up! No unvisited news articles.
            </p>
            <Button asChild className="mt-4">
              <Link href="/news">Browse all news</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="text-sm text-muted-foreground mb-6">
              {items.length} articles to read
            </div>

            <div className="space-y-0">
              {items.map((item, index) => (
                <FullArticle
                  key={item.slug}
                  item={item}
                  onScrolledPast={handleScrolledPast}
                  scrollPastEpoch={scrollPastEpoch}
                  isLast={index === items.length - 1}
                  hiddenSections={hiddenSections}
                  reader={reader}
                  speechSections={speechSections}
                />
              ))}
            </div>

            {hasMore && (
              <div ref={loadMoreRef} className="flex justify-center py-8">
                {loading ? (
                  <div className="text-muted-foreground">Loading more...</div>
                ) : (
                  <div className="h-10" />
                )}
              </div>
            )}
          </>
        )}
      </main>
      <Footer />

      {/* Floating utility buttons */}
      {/* Kept clear of the floating bar, which grows 60px with the vote strip. */}
      <div className={`fixed ${vote ? 'bottom-[14.75rem] sm:bottom-[10.75rem]' : 'bottom-[11rem] sm:bottom-[7rem]'} right-4 z-40 flex flex-col items-end gap-3`}>
        {/* Settings button — wait for hydration so toggle has localStorage state */}
        {isHydrated && (
          <button
            onClick={() => setSectionToggleOpen(true)}
            className="flex items-center justify-center w-12 h-12 bg-muted text-muted-foreground rounded-full shadow-lg hover:bg-muted/80 transition-colors"
          >
            <Settings className="h-5 w-5" />
          </button>
        )}

        {/* Export-to-clipboard button */}
        {items.length > 0 && (
          <button
            onClick={handleExport}
            disabled={exportState === 'working'}
            title="Copy all unread news as plaintext"
            className="flex items-center justify-center w-12 h-12 bg-muted text-muted-foreground rounded-full shadow-lg hover:bg-muted/80 transition-colors disabled:opacity-50"
          >
            {exportState === 'done' ? (
              <Check className="h-5 w-5 text-primary" />
            ) : (
              <Copy className="h-5 w-5" />
            )}
          </button>
        )}

      </div>

      {items.length > 0 && (
        <ReaderControlBar
          isPlaying={reader.isPlaying}
          isBuffering={reader.isBuffering}
          markReadDisabled={scrolledPastSlugs.size === 0}
          canPlay={speechSections.length > 0}
          canNext={reader.canNext}
          onMarkRead={() => { setPendingNavUrl(null); setDialogOpen(true) }}
          onPlayPause={handlePlayPause}
          onNext={reader.next}
          error={reader.error}
          vote={vote}
        />
      )}

      {/* Section visibility dialog */}
      <SectionVisibilityDialog
        open={sectionToggleOpen}
        onOpenChange={setSectionToggleOpen}
        hiddenSections={hiddenSections}
        onToggle={toggleSection}
      />

      {/* Mark-read dialog */}
      <MarkReadDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        items={scrolledPastItems}
        currentlyReadingSlug={reader.currentSlug}
        onConfirm={handleDialogConfirm}
        onCancel={handleDialogCancel}
      />
    </div>
  )
}

// Full article component with scroll-past detection
function FullArticle({
  item,
  onScrolledPast,
  scrollPastEpoch,
  isLast,
  hiddenSections,
  reader,
  speechSections,
}: {
  item: ContentItem
  onScrolledPast: (slug: string) => void
  scrollPastEpoch: number
  isLast: boolean
  hiddenSections: Set<SectionType>
  reader: ReturnType<typeof useContinuousReader>
  speechSections: ReturnType<typeof prepareSpeechSections>
}) {
  const bottomRef = useRef<HTMLDivElement>(null)

  const filteredContent = useMemo(
    () => filterHiddenSections(item.content, hiddenSections),
    [item.content, hiddenSections]
  )

  // Section-stable: only changes on section advance / play / pause, NOT on the
  // ~60fps progress ticks. reader.currentIndex uses the same global section
  // scheme as getSectionIndex below.
  const readingActive = reader.isPlaying || reader.isBuffering || (reader.progress > 0 && reader.progress < 100)
  const activeSectionIndex = readingActive ? reader.currentIndex : null

  // Highlight by heading id (mirrors the working scroll, which matches by
  // element id). Only highlight when the active section belongs to this article.
  // Section-stable: changes only on section advance, not on 60fps progress ticks.
  const activeSection = activeSectionIndex != null ? speechSections[activeSectionIndex] : undefined
  const currentSectionId = activeSection && activeSection.sourceSlug === item.slug
    ? headingToId(stripMarkdown(activeSection.title))
    : null

  // Stable identity so the memoized MarkdownContent is not re-rendered by the
  // reader's ~60fps progress ticks. Highlight is keyed ONLY by `currentSectionId`
  // (null for every article except the one owning the active section), NOT by the
  // global `activeSectionIndex`. This is deliberate: depending on activeSectionIndex
  // would change this memo for EVERY article on every section advance, forcing all
  // articles' react-markdown to re-render synchronously (a ~278ms main-thread block
  // on read-all-news that instantly follows "Play from here"). Keyed on
  // currentSectionId, only the owning article re-renders.
  const markdownReader = useMemo(
    () => ({
      onPlayFromHere: reader.playFromHere,
      // Lines are article-local, so the owning slug disambiguates them.
      onPlayFromLine: (line: number) => reader.playFromLine(item.slug, line),
      getSectionIndex: (heading: string) => {
        const index = speechSections.findIndex(
          (section) => section.sourceSlug === item.slug
            && stripMarkdown(section.title) === stripMarkdown(heading)
        )
        return index < 0 ? null : index
      },
      currentSectionId,
    }),
    [reader.playFromHere, reader.playFromLine, speechSections, item.slug, currentSectionId]
  )

  // Reports once per mark-read epoch: a new epoch re-arms the observer, which
  // reports the current state on observe, so a survivor whose bottom is
  // already on screen rejoins at once instead of waiting for another scroll.
  useEffect(() => {
    if (!bottomRef.current) return

    let triggered = false
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !triggered) {
          triggered = true
          onScrolledPast(item.slug)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(bottomRef.current)
    return () => observer.disconnect()
  }, [item.slug, onScrolledPast, scrollPastEpoch])

  return (
    <article className="py-8" data-reader-article={item.slug}>
      {/* Article header */}
      <div className="mb-4">
        <Link href={`/news/${item.slug}`} prefetch={false}>
          <h2 className="text-2xl font-bold hover:text-primary transition-colors">{item.title}</h2>
        </Link>
        <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-muted-foreground">
          <time>
            {formatDate(item.publishedAt)}
          </time>
          {item.hashtags?.slice(0, 5).map((tag: string) => (
            <span key={tag} className="text-xs bg-muted px-2 py-0.5 rounded">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Full article content */}
      <MarkdownContent
        content={filteredContent}
        itemType={ItemType.News}
        patternName={item.sourcePattern}
        reader={markdownReader}
      />

      {/* Bottom boundary marker for scroll tracking */}
      <div ref={bottomRef} className="h-px" />

      {/* Divider between articles */}
      {!isLast && (
        <div className="mt-8 border-t border-border/60" />
      )}
    </article>
  )
}
