import { act, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Mock } from 'vitest'
import ReadAllNewsPage, { READ_ALL_NEWS_CLOSING_LINE } from './page.client'
import { ItemType } from '@/lib/content/types'

// The reader no longer calls scrollIntoView; it delegates to this helper.
// Mock it so scroll-order tests can record which heading scrolled (el.id)
// and assert scroll fires before playback.
const { scrollHeadingIntoView } = vi.hoisted(() => ({ scrollHeadingIntoView: vi.fn() }))
vi.mock('@/lib/reader/scroll-heading', () => ({ scrollHeadingIntoView }))

const mockUseContinuousReader = vi.fn()
const playbackEvents: string[] = []
type ReaderItem = { sourceSlug: string; title: string }
type ReaderOptions = {
  onItemChange?: (item: ReaderItem, index: number) => void
  moreMayCome?: boolean
  requestMore?: () => Promise<'appended' | 'exhausted' | 'failed'>
  closingLine?: string
}
type ReaderAction = Mock<() => void>
type ReaderHarness = {
  isPlaying: boolean
  isBuffering: boolean
  currentIndex: number
  currentItem: ReaderItem | undefined
  currentSlug: string | null
  play: ReaderAction
  pause: ReaderAction
  next: ReaderAction
  playFromHere: Mock<(index: number) => void>
  playFromLine: Mock<(sourceSlug: string, line: number) => void>
  complete: ReaderAction
}
type MarkReadDialogProps = {
  items: Array<{ slug: string; title: string }>
  currentlyReadingSlug?: string | null
  onConfirm: (slugs: string[]) => void
  onCancel: () => void
}

let latestReaderItems: ReaderItem[] = []
let latestReaderOptions: ReaderOptions | undefined
let latestReaderHarness: ReaderHarness
let latestMarkReadDialogProps: MarkReadDialogProps | undefined
let readerIndex = 0
// Read by the harness: lets a test play the reader and make Next move only the
// eye (the real reader's non-interrupting Next while playing).
let readerPlaying = false
let readerBuffering = false
let nextMovesEyeOnly = false
let eyeIndex = 0
type VoteStripProps = {
  heading: string
  link: { url: string; title: string } | null
  category?: string
  patternName?: string
}
let latestStripProps: VoteStripProps | undefined
let intersectionCallback: ((entries: Array<{ isIntersecting: boolean }>) => void) | undefined

// Hoisted so the module factory below can read it without a TDZ crash.
const { sessionState } = vi.hoisted(() => ({
  sessionState: { current: null as { user?: { email: string } } | null },
}))

vi.mock('next-auth/react', () => ({
  useSession: () => ({ data: sessionState.current }),
}))

vi.mock('@/components/header', () => ({ default: () => <div data-testid="header" /> }))
vi.mock('@/components/footer', () => ({ default: () => <div data-testid="footer" /> }))
vi.mock('@/components/mark-read-dialog', () => ({
  MarkReadDialog: (props: MarkReadDialogProps) => {
    latestMarkReadDialogProps = props
    return null
  },
}))
vi.mock('@/components/article-section-toggle', () => ({ SectionVisibilityDialog: () => null }))
vi.mock('@/hooks/use-section-visibility', () => ({
  useSectionVisibility: () => ({
    hiddenSections: new Set(),
    toggleSection: vi.fn(),
    isHydrated: true,
  }),
}))

vi.mock('@/hooks/use-continuous-reader', () => ({
  useContinuousReader: (items: ReaderItem[], options: ReaderOptions) => {
    latestReaderItems = items
    latestReaderOptions = options
    const play = vi.fn(() => { playbackEvents.push('play') })
    const selectAndPlay = (index: number) => {
      const item = items[index]
      if (!item) return
      readerIndex = index
      options.onItemChange?.(item, index)
      play()
    }
    const moveEye = () => {
      eyeIndex += 1
      const item = items[eyeIndex]
      // The eye scrolls to its target through the same callback, while the
      // reading position (currentItem) stays put.
      if (item) options.onItemChange?.(item, eyeIndex)
    }
    latestReaderHarness = {
      isPlaying: readerPlaying,
      isBuffering: readerBuffering,
      currentIndex: readerIndex,
      currentItem: items[readerIndex],
      currentSlug: items[readerIndex]?.sourceSlug ?? null,
      play,
      pause: vi.fn(),
      next: vi.fn(() => (nextMovesEyeOnly ? moveEye() : selectAndPlay(readerIndex + 1))),
      playFromHere: vi.fn((index: number) => selectAndPlay(index)),
      playFromLine: vi.fn(),
      complete: vi.fn(() => selectAndPlay(readerIndex + 1)),
    }
    mockUseContinuousReader.mockReturnValue(latestReaderHarness)
    return mockUseContinuousReader(items, options)
  },
}))

vi.mock('@/components/continuous-reader-controls', () => ({
  ContinuousReaderControls: ({ onPlayPause, onNext, onMarkRead, canNext = true, canPlay = true, markReadDisabled = false }: {
    onPlayPause: () => void
    onNext: () => void
    onMarkRead?: () => void
    canNext?: boolean
    canPlay?: boolean
    markReadDisabled?: boolean
  }) => (
    <div role="group" aria-label="Continuous reader controls">
      <button onClick={onMarkRead} disabled={markReadDisabled}>Mark read</button>
      <button onClick={onPlayPause} disabled={!canPlay}>Play</button>
      <button onClick={onNext} disabled={!canNext}>Next</button>
    </div>
  ),
}))

// Stands in for the paragraph affordance: one synthetic markdown line per
// section, so a click can be attributed to the article that owns it.
const paragraphLine = (sectionIndex: number) => sectionIndex * 10 + 3

vi.mock('@/components/markdown-content', () => ({
  MarkdownContent: ({ content, reader }: {
    content: string
    reader?: {
      onPlayFromHere: (index: number) => void
      onPlayFromLine?: (line: number) => void
    }
  }) => (
    <div>
      {Array.from(content.matchAll(/^##\s+(.+)$/gm)).map((match, index) => (
        <div key={match[1]}>
          <h2 id={match[1].toLowerCase().replaceAll(' ', '-')}>{match[1]}</h2>
          {reader && (
            <button onClick={() => reader.onPlayFromHere(index)}>
              Play from here: {match[1]}
            </button>
          )}
          {reader?.onPlayFromLine && (
            <button onClick={() => reader.onPlayFromLine?.(paragraphLine(index))}>
              Play paragraph: {match[1]}
            </button>
          )}
        </div>
      ))}
    </div>
  ),
}))

// Records what the bar's strip is told to vote for; the strip itself (and its
// shared vote store) is covered by its own tests.
vi.mock('@/components/reader-vote-strip', () => ({
  ReaderVoteStrip: (props: VoteStripProps) => {
    latestStripProps = props
    return <div data-testid="reader-vote-strip" data-heading={props.heading} />
  },
}))

vi.mock('@/components/markdown-with-cta', () => ({
  MarkdownWithCTA: () => <div />,
}))

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}))

vi.mock('lucide-react', () => ({
  BookCheck: () => null,
  ChevronDown: () => null,
  Copy: () => null,
  Check: () => null,
  Settings: () => null,
}))

// The page runs one observer per article bottom-marker plus one for the
// infinite-scroll sentinel, so tests need to address a specific one. Track the
// observed elements to tell them apart.
type ObserverEntry = {
  callback: (entries: Array<{ isIntersecting: boolean }>) => void
  elements: Element[]
  disconnected: boolean
}
const observers: ObserverEntry[] = []

class MockIntersectionObserver {
  private entry: ObserverEntry

  constructor(callback: (entries: Array<{ isIntersecting: boolean }>) => void) {
    intersectionCallback = callback
    this.entry = { callback, elements: [], disconnected: false }
    observers.push(this.entry)
  }
  observe(element: Element) { this.entry.elements.push(element) }
  disconnect() { this.entry.disconnected = true }
}

const ownerSlug = (element: Element) =>
  element.closest('article[data-reader-article]')?.getAttribute('data-reader-article') ?? null

const live = () => observers.filter((entry) => !entry.disconnected)

const scrollPast = (slug: string) => {
  const entry = live().find((o) => o.elements.some((el) => ownerSlug(el) === slug))
  entry?.callback([{ isIntersecting: true }])
}

const reachLoadMoreSentinel = () => {
  const entry = live().reverse().find((o) => o.elements.some((el) => ownerSlug(el) === null))
  entry?.callback([{ isIntersecting: true }])
}

const items = (count: number, offset = 0) => Array.from({ length: count }, (_, index) => ({
  slug: `news-${offset + index + 1}`,
  title: `News ${offset + index + 1}`,
  content: `## Section ${offset + index + 1}A\n\nText.\n\n## Section ${offset + index + 1}B\n\nText.`,
  excerpt: '',
  publishedAt: '2026-08-17T00:00:00.000Z',
  hashtags: [],
  itemType: ItemType.News,
}))

// Every section carries its own first external link (plus a second one that
// must never win), and each article its own source pattern.
const linkedItems = (count: number) => items(count).map((item, index) => {
  const n = index + 1
  return {
    ...item,
    sourcePattern: `pattern-${n}`,
    content: [
      `## Section ${n}A`,
      '',
      `Read [Link ${n}A](https://example.com/${n}a) and [Other](https://other.dev/${n}a).`,
      '',
      `## Section ${n}B`,
      '',
      `Read [Link ${n}B](https://example.com/${n}b).`,
    ].join('\n'),
  }
})

describe('ReadAllNewsPage continuous reader', () => {
  beforeEach(() => {
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
    latestReaderItems = []
    latestReaderOptions = undefined
    latestReaderHarness = undefined as unknown as ReaderHarness
    latestMarkReadDialogProps = undefined
    readerIndex = 0
    readerPlaying = false
    readerBuffering = false
    nextMovesEyeOnly = false
    eyeIndex = 0
    latestStripProps = undefined
    playbackEvents.length = 0
    intersectionCallback = undefined
    observers.length = 0
    sessionState.current = null
    localStorage.clear()
    mockUseContinuousReader.mockReset()
    scrollHeadingIntoView.mockReset()
    scrollHeadingIntoView.mockImplementation((el?: HTMLElement | null) => {
      if (el) playbackEvents.push(`scroll:${el.id}`)
    })
  })

  it('queues Read All News sections in rendered order', () => {
    render(<ReadAllNewsPage initialItems={items(5)} totalItems={5} />)

    expect(latestReaderItems.map((item) => item.sourceSlug)).toEqual([
      'news-1', 'news-1', 'news-2', 'news-2', 'news-3', 'news-3',
      'news-4', 'news-4', 'news-5', 'news-5',
    ])
    expect(latestReaderItems.map((item) => item.title)).toEqual([
      'Section 1A', 'Section 1B', 'Section 2A', 'Section 2B', 'Section 3A', 'Section 3B',
      'Section 4A', 'Section 4B', 'Section 5A', 'Section 5B',
    ])
  })

  it('keeps one reader control group in a fixed floating panel', () => {
    render(<ReadAllNewsPage initialItems={items(1)} totalItems={1} />)

    const floatingPanel = document.querySelector('[data-reader-floating]')
    expect(floatingPanel).toHaveClass('fixed')
    expect(within(screen.getByRole('main')).queryByRole('group', {
      name: 'Continuous reader controls',
    })).not.toBeInTheDocument()
    expect(floatingPanel).toContainElement(screen.getByRole('group', {
      name: 'Continuous reader controls',
    }))
  })

  it('scrolls the selected section before direct playback', async () => {
    render(<ReadAllNewsPage initialItems={items(1)} totalItems={1} />)

    latestReaderHarness.play.mockImplementation(() => playbackEvents.push('play'))
    await userEvent.click(screen.getByRole('button', { name: 'Play' }))

    expect(playbackEvents).toEqual(['scroll:section-1a', 'play'])
  })

  it('scrolls the selected heading before direct section start', async () => {
    render(<ReadAllNewsPage initialItems={items(1)} totalItems={1} />)

    latestReaderHarness.play.mockImplementation(() => playbackEvents.push('play'))
    await userEvent.click(screen.getByRole('button', { name: 'Play from here: Section 1B' }))

    expect(playbackEvents).toEqual(['scroll:section-1b', 'play'])
    expect(document.getElementById('section-1b')).toBeInTheDocument()
  })

  it('scrolls the next heading before playback', async () => {
    render(<ReadAllNewsPage initialItems={items(1)} totalItems={1} />)

    latestReaderHarness.play.mockImplementation(() => playbackEvents.push('play'))
    await userEvent.click(within(screen.getByRole('group', { name: 'Continuous reader controls' })).getByRole('button', { name: 'Next' }))

    expect(playbackEvents).toEqual(['scroll:section-1b', 'play'])
    expect(document.getElementById('section-1b')).toBeInTheDocument()
  })

  it('scrolls the next heading before automatically advancing playback', async () => {
    render(<ReadAllNewsPage initialItems={items(1)} totalItems={1} />)

    latestReaderHarness.play.mockImplementation(() => playbackEvents.push('play'))
    act(() => latestReaderHarness.complete())

    await waitFor(() => expect(playbackEvents).toEqual(['scroll:section-1b', 'play']))
    expect(document.getElementById('section-1b')).toBeInTheDocument()
  })

  it('appends newly loaded Read All News sections to the reader queue', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ items: items(1, 1), currentPage: 1, totalPages: 1 }),
    })
    vi.stubGlobal('fetch', fetchMock)

    render(<ReadAllNewsPage initialItems={items(1)} totalItems={2} />)

    act(() => intersectionCallback?.([{ isIntersecting: true }]))

    await waitFor(() => expect(latestReaderItems.map((item) => item.sourceSlug)).toEqual([
      'news-1', 'news-1', 'news-2', 'news-2',
    ]))
    expect(screen.getByText('News 2')).toBeInTheDocument()
  })

  it('concurrent fetchMore calls share one request', async () => {
    let resolveFetch: (value: unknown) => void = () => {}
    const fetchMock = vi.fn().mockReturnValue(new Promise((resolve) => { resolveFetch = resolve }))
    vi.stubGlobal('fetch', fetchMock)

    render(<ReadAllNewsPage initialItems={items(1)} totalItems={2} />)

    // Two triggers before the first request settles (scroll now, the reader
    // later) must ride the same request.
    act(() => {
      reachLoadMoreSentinel()
      reachLoadMoreSentinel()
    })
    expect(fetchMock).toHaveBeenCalledTimes(1)

    await act(async () => {
      resolveFetch({
        ok: true,
        json: async () => ({ items: items(1, 1), currentPage: 1, totalPages: 1 }),
      })
    })

    await waitFor(() => expect(screen.getByText('News 2')).toBeInTheDocument())
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(screen.getAllByText('News 2')).toHaveLength(1)
  })

  it('non-OK response resolves failed and keeps hasMore', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ items: items(1, 1), currentPage: 1, totalPages: 1 }),
    })
    vi.stubGlobal('fetch', fetchMock)

    const { container } = render(<ReadAllNewsPage initialItems={items(1)} totalItems={2} />)

    await act(async () => { reachLoadMoreSentinel() })

    await waitFor(() => expect(screen.queryByText('Loading more...')).not.toBeInTheDocument())
    expect(screen.queryByText('News 2')).not.toBeInTheDocument()
    expect(latestReaderItems.map((item) => item.sourceSlug)).toEqual(['news-1', 'news-1'])
    // hasMore survives the failure: the sentinel stays and a later trigger retries.
    expect(container.querySelector('.h-10')).toBeInTheDocument()
    await act(async () => { reachLoadMoreSentinel() })
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('empty response resolves exhausted', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ items: [], currentPage: 1, totalPages: 1 }),
    })
    vi.stubGlobal('fetch', fetchMock)

    const { container } = render(<ReadAllNewsPage initialItems={items(1)} totalItems={2} />)

    await act(async () => { reachLoadMoreSentinel() })

    // hasMore turns false: the sentinel goes away and nothing fetches again.
    await waitFor(() => expect(container.querySelector('.h-10')).not.toBeInTheDocument())
    expect(screen.queryByText('Loading more...')).not.toBeInTheDocument()
    await act(async () => { reachLoadMoreSentinel() })
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('prefetches when the reader enters the last loaded article', async () => {
    const fetchMock = vi.fn().mockReturnValue(new Promise(() => {}))
    vi.stubGlobal('fetch', fetchMock)
    readerPlaying = true

    const { rerender } = render(<ReadAllNewsPage initialItems={items(2)} totalItems={4} />)
    expect(fetchMock).not.toHaveBeenCalled()

    // Section 2A: the reader is now in news-2, the last loaded article.
    readerIndex = 2
    rerender(<ReadAllNewsPage initialItems={items(2)} totalItems={4} />)

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1))
    expect(String(fetchMock.mock.calls[0][0])).toContain('/api/content?')
    // The harness never triggers an IntersectionObserver callback in this
    // test, so neither the scroll sentinel nor an article marker can have
    // made this request: it can only have come from the reader prefetch.
  })

  it('prefetches while the reader is buffering on the last loaded article', async () => {
    // "Active" is playing OR buffering: a reader waiting for audio — a cold
    // first unit, or the hold at the end of the queue — still counts.
    const fetchMock = vi.fn().mockReturnValue(new Promise(() => {}))
    vi.stubGlobal('fetch', fetchMock)
    readerPlaying = false
    readerBuffering = true
    readerIndex = 2

    render(<ReadAllNewsPage initialItems={items(2)} totalItems={4} />)

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1))
    expect(String(fetchMock.mock.calls[0][0])).toContain('/api/content?')
  })

  it('prefetches once per last article', async () => {
    // A failed load leaves items and hasMore as they were, so nothing but the
    // once-per-article guard stops a second prefetch.
    const fetchMock = vi.fn().mockResolvedValue({ ok: false, status: 500, json: async () => ({}) })
    vi.stubGlobal('fetch', fetchMock)
    readerPlaying = true
    readerIndex = 2

    const { rerender } = render(<ReadAllNewsPage initialItems={items(2)} totalItems={4} />)
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1))
    await waitFor(() => expect(screen.queryByText('Loading more...')).not.toBeInTheDocument())

    // Section 2B, then a pause and a resume, all inside news-2.
    readerIndex = 3
    rerender(<ReadAllNewsPage initialItems={items(2)} totalItems={4} />)
    readerPlaying = false
    rerender(<ReadAllNewsPage initialItems={items(2)} totalItems={4} />)
    readerPlaying = true
    rerender(<ReadAllNewsPage initialItems={items(2)} totalItems={4} />)

    await act(async () => {})
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('does not prefetch while idle or before the last article', async () => {
    const fetchMock = vi.fn().mockReturnValue(new Promise(() => {}))
    vi.stubGlobal('fetch', fetchMock)

    // Idle on the last article.
    readerIndex = 2
    readerPlaying = false
    const idle = render(<ReadAllNewsPage initialItems={items(2)} totalItems={4} />)
    await act(async () => {})
    idle.unmount()

    // Playing, but still in news-1.
    readerIndex = 1
    readerPlaying = true
    const early = render(<ReadAllNewsPage initialItems={items(2)} totalItems={4} />)
    await act(async () => {})
    early.unmount()

    // Playing on the last article, but nothing more exists.
    readerIndex = 2
    const done = render(<ReadAllNewsPage initialItems={items(2)} totalItems={2} />)
    await act(async () => {})
    done.unmount()

    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('an exhausted load stops the reader from fetching at the last article', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ items: [], currentPage: 1, totalPages: 1 }),
    })
    vi.stubGlobal('fetch', fetchMock)
    readerPlaying = true
    readerIndex = 2

    const { container, rerender } = render(<ReadAllNewsPage initialItems={items(3)} totalItems={10} />)

    // Scroll reaches the sentinel while the reader is still in news-2.
    await act(async () => { reachLoadMoreSentinel() })
    await waitFor(() => expect(container.querySelector('.h-10')).not.toBeInTheDocument())
    expect(fetchMock).toHaveBeenCalledTimes(1)

    // The reader then enters news-3, the last article: the server already said
    // there is nothing further, so no second request goes out.
    readerIndex = 4
    rerender(<ReadAllNewsPage initialItems={items(3)} totalItems={10} />)
    await act(async () => {})
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('re-arms a live sentinel observer after an append', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ items: items(1, 1), currentPage: 1, totalPages: 2 }),
    })
    vi.stubGlobal('fetch', fetchMock)

    render(<ReadAllNewsPage initialItems={items(1)} totalItems={3} />)

    const sentinelObservers = () => observers.filter((o) => o.elements.some((el) => ownerSlug(el) === null))
    const [first] = sentinelObservers()
    expect(first.disconnected).toBe(false)

    await act(async () => { reachLoadMoreSentinel() })
    await waitFor(() => expect(screen.getByText('News 2')).toBeInTheDocument())

    // hasMore stayed true, yet the observer was replaced: a sentinel still in
    // view after the append gets a fresh intersection and keeps loading.
    expect(first.disconnected).toBe(true)
    const rearmed = sentinelObservers().filter((o) => !o.disconnected)
    expect(rearmed).toHaveLength(1)
    expect(rearmed[0]).not.toBe(first)
    expect(rearmed[0].elements[0].isConnected).toBe(true)
  })

  it('Read All News renders a single floating reader bar whose Next calls reader.next', async () => {
    render(<ReadAllNewsPage initialItems={items(2)} totalItems={2} />)

    expect(document.querySelectorAll('[data-reader-floating]')).toHaveLength(1)

    await userEvent.click(
      within(screen.getByRole('group', { name: 'Continuous reader controls' }))
        .getByRole('button', { name: 'Next' }),
    )
    expect(latestReaderHarness.next).toHaveBeenCalled()
  })

  it('Read All News Mark read stays disabled until an article is scrolled past', () => {
    render(<ReadAllNewsPage initialItems={items(1)} totalItems={1} />)

    expect(screen.getByRole('button', { name: 'Mark read' })).toBeDisabled()

    act(() => intersectionCallback?.([{ isIntersecting: true }]))

    expect(screen.getByRole('button', { name: 'Mark read' })).toBeEnabled()
  })

  it('passes the currently-read slug to the mark-read dialog', () => {
    render(<ReadAllNewsPage initialItems={items(2)} totalItems={2} />)

    expect(latestMarkReadDialogProps?.currentlyReadingSlug).toBe('news-1')
  })

  it('never evicts the article the reader is currently on', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ items: items(5, 12), currentPage: 1, totalPages: 2 }),
    })
    vi.stubGlobal('fetch', fetchMock)

    render(<ReadAllNewsPage initialItems={items(12)} totalItems={17} />)

    // news-1 owns the reader's position; news-2..news-6 are equally old
    // scrolled-past candidates, so the trim can still reach its target without it.
    for (const slug of ['news-1', 'news-2', 'news-3', 'news-4', 'news-5', 'news-6']) {
      act(() => scrollPast(slug))
    }
    expect(latestReaderHarness.currentSlug).toBe('news-1')

    await act(async () => { reachLoadMoreSentinel() })

    await waitFor(() => expect(screen.getByText('News 17')).toBeInTheDocument())
    expect(screen.getByText('News 1')).toBeInTheDocument()
    for (const title of ['News 2', 'News 3', 'News 4', 'News 5', 'News 6']) {
      expect(screen.queryByText(title)).not.toBeInTheDocument()
    }
    expect(screen.getByText('News 7')).toBeInTheDocument()
  })

  it('resolves a paragraph line against the owning article when a paragraph is played', async () => {
    render(<ReadAllNewsPage initialItems={items(2)} totalItems={2} />)

    await userEvent.click(screen.getByRole('button', { name: 'Play paragraph: Section 2A' }))

    expect(latestReaderHarness.playFromLine).toHaveBeenCalledWith('news-2', paragraphLine(0))
  })

  it('still scrolls to top and persists the marked slugs on confirm', () => {
    sessionState.current = { user: { email: 'reader@motyl.dev' } }
    const fetchMock = vi.fn().mockResolvedValue({ json: async () => ({ items: [] }) })
    vi.stubGlobal('fetch', fetchMock)
    const scrollTo = vi.fn()
    vi.stubGlobal('scrollTo', scrollTo)

    render(<ReadAllNewsPage initialItems={items(3)} totalItems={3} />)

    act(() => latestMarkReadDialogProps?.onConfirm(['news-1']))

    expect(JSON.parse(localStorage.getItem('visitedArticles') ?? '[]')).toContain('news-1')
    expect(document.cookie).toContain('visitedArticles')
    expect(fetchMock).toHaveBeenCalledWith('/api/articles/news-1/view', { method: 'POST' })
    expect(scrollTo).toHaveBeenCalledWith({ top: 0 })
    expect(screen.queryByText('News 1')).not.toBeInTheDocument()
    expect(screen.getByText('News 2')).toBeInTheDocument()
  })

  it('read all news strip targets the section being read', () => {
    readerIndex = 1
    render(<ReadAllNewsPage initialItems={linkedItems(2)} totalItems={2} />)

    const bar = document.querySelector('[data-reader-floating]')
    expect(bar).toContainElement(screen.getByTestId('reader-vote-strip'))
    expect(latestStripProps).toEqual({
      heading: 'Section 1B',
      link: { url: 'https://example.com/1b', title: 'Link 1B' },
      // Same values the article's MarkdownContent gets: no category, its pattern.
      category: undefined,
      patternName: 'pattern-1',
    })
    // The taller bar reserves its strip (52px + 8px gap) on top of the old padding.
    expect(screen.getByRole('main')).toHaveClass('pb-[15.75rem]')
  })

  it('strip follows a section advance', async () => {
    readerIndex = 1
    const { rerender } = render(<ReadAllNewsPage initialItems={linkedItems(2)} totalItems={2} />)

    await userEvent.click(within(screen.getByRole('group', { name: 'Continuous reader controls' })).getByRole('button', { name: 'Next' }))
    rerender(<ReadAllNewsPage initialItems={linkedItems(2)} totalItems={2} />)

    expect(latestStripProps?.heading).toBe('Section 2A')
    expect(latestStripProps?.link).toEqual({ url: 'https://example.com/2a', title: 'Link 2A' })
    expect(latestStripProps?.patternName).toBe('pattern-2')
  })

  it('strip ignores the eye', async () => {
    readerPlaying = true
    nextMovesEyeOnly = true
    const { rerender } = render(<ReadAllNewsPage initialItems={linkedItems(2)} totalItems={2} />)

    const group = screen.getByRole('group', { name: 'Continuous reader controls' })
    await userEvent.click(within(group).getByRole('button', { name: 'Next' }))
    await userEvent.click(within(group).getByRole('button', { name: 'Next' }))
    rerender(<ReadAllNewsPage initialItems={linkedItems(2)} totalItems={2} />)

    // The eye moved two sections ahead; the strip stays on the section playing.
    expect(eyeIndex).toBe(2)
    expect(latestStripProps?.heading).toBe('Section 1A')
    expect(latestStripProps?.link).toEqual({ url: 'https://example.com/1a', title: 'Link 1A' })
  })

  it('passes load-more and the closing line to the reader', async () => {
    let resolveFetch: (value: unknown) => void = () => {}
    const fetchMock = vi.fn().mockReturnValue(new Promise((resolve) => { resolveFetch = resolve }))
    vi.stubGlobal('fetch', fetchMock)

    const { rerender } = render(<ReadAllNewsPage initialItems={items(1)} totalItems={3} />)

    expect(READ_ALL_NEWS_CLOSING_LINE).toBe('To już wszystkie nowe artykuły.')
    expect(latestReaderOptions?.closingLine).toBe(READ_ALL_NEWS_CLOSING_LINE)
    expect(latestReaderOptions?.moreMayCome).toBe(true)
    const requestMore = latestReaderOptions?.requestMore
    expect(requestMore).toBeTypeOf('function')
    // Stable across renders: the reader keeps one callback.
    rerender(<ReadAllNewsPage initialItems={items(1)} totalItems={3} />)
    expect(latestReaderOptions?.requestMore).toBe(requestMore)

    // It is fetchMore itself: the reader's request and a scroll trigger share one fetch.
    let pending!: Promise<'appended' | 'exhausted' | 'failed'>
    act(() => { pending = requestMore!() })
    act(() => reachLoadMoreSentinel())
    expect(fetchMock).toHaveBeenCalledTimes(1)

    await act(async () => {
      resolveFetch({ ok: true, json: async () => ({ items: items(1, 1), currentPage: 1, totalPages: 1 }) })
    })
    await expect(pending).resolves.toBe('appended')

    // moreMayCome follows hasMore once the server says there is nothing further.
    await waitFor(() => expect(latestReaderOptions?.moreMayCome).toBe(false))
  })

  describe('mark-read list', () => {
    const listed = () => latestMarkReadDialogProps?.items.map((item) => item.slug)
    let rerenderPage = () => {}
    const mount = (initial: ReturnType<typeof items>, total: number) => {
      const view = render(<ReadAllNewsPage initialItems={initial} totalItems={total} />)
      rerenderPage = () => view.rerender(<ReadAllNewsPage initialItems={initial} totalItems={total} />)
    }
    // Moves the reader onto a Section. The harness only picks the index up on
    // the next render, and has no re-seat of its own, so a test sets the
    // post-removal index the real reader would land on.
    const readSection = (index: number) => {
      act(() => latestReaderHarness.playFromHere(index))
      rerenderPage()
    }
    const confirm = (slugs: string[]) => act(() => latestMarkReadDialogProps?.onConfirm(slugs))

    beforeEach(() => {
      vi.stubGlobal('scrollTo', vi.fn())
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ items: [] }) }))
    })

    it('lists exactly the articles scrolled past, in page order', () => {
      mount(items(5), 5)

      act(() => scrollPast('news-2'))
      act(() => scrollPast('news-1'))
      readSection(4) // news-3

      expect(listed()).toEqual(['news-1', 'news-2'])
      expect(latestMarkReadDialogProps?.currentlyReadingSlug).toBe('news-3')
    })

    it('lists the reading article too, flagged so the dialog leaves it unchecked', () => {
      mount(items(5), 5)

      act(() => scrollPast('news-1'))
      act(() => scrollPast('news-2'))
      readSection(2) // news-2

      expect(listed()).toEqual(['news-1', 'news-2'])
      expect(latestMarkReadDialogProps?.currentlyReadingSlug).toBe('news-2')
    })

    it('empties the list on confirm and keeps the reader keyed by slug', () => {
      mount(items(5), 5)
      act(() => scrollPast('news-1'))
      act(() => scrollPast('news-2'))
      readSection(4) // news-3

      // news-3's first Section is index 0 once news-1 and news-2 are gone.
      readerIndex = 0
      confirm(['news-1', 'news-2'])

      expect(screen.queryByText('News 1')).not.toBeInTheDocument()
      expect(screen.queryByText('News 2')).not.toBeInTheDocument()
      expect(listed()).toEqual([])
      expect(latestMarkReadDialogProps?.currentlyReadingSlug).toBe('news-3')
      expect(screen.getByRole('button', { name: 'Mark read' })).toBeDisabled()
    })

    it('lists the next article read after a mid-session mark read', () => {
      mount(items(5), 5)
      act(() => scrollPast('news-1'))
      act(() => scrollPast('news-2'))
      readSection(4) // news-3
      readerIndex = 0
      confirm(['news-1', 'news-2'])

      act(() => scrollPast('news-3'))
      readSection(2) // news-4

      expect(listed()).toEqual(['news-3'])
      expect(latestMarkReadDialogProps?.currentlyReadingSlug).toBe('news-4')
    })

    // The reported bug: the article being read at mark-read time has usually
    // scrolled past already, so the dialog shows it unchecked and it survives.
    // It then sits at the top, and once the reader moves on and its bottom is
    // seen again it must rejoin the list.
    it('lists the article that was being read at mark-read time once it is passed again', () => {
      mount(items(5), 5)
      act(() => scrollPast('news-1'))
      act(() => scrollPast('news-2'))
      act(() => scrollPast('news-3'))
      readSection(4) // news-3
      expect(listed()).toEqual(['news-1', 'news-2', 'news-3'])

      readerIndex = 0
      confirm(['news-1', 'news-2'])
      expect(screen.getByText('News 3')).toBeInTheDocument()
      expect(listed()).toEqual([])

      readSection(2) // news-4
      act(() => scrollPast('news-3'))

      expect(listed()).toEqual(['news-3'])
    })

    it('lists a skipped (unchecked) article again once it is passed again', () => {
      mount(items(5), 5)
      act(() => scrollPast('news-1'))
      act(() => scrollPast('news-2'))
      readSection(4) // news-3

      confirm(['news-1'])
      expect(listed()).toEqual([])

      act(() => scrollPast('news-2'))

      expect(listed()).toEqual(['news-2'])
    })

    // A real IntersectionObserver reports the current state on observe, so a
    // re-armed survivor whose bottom is already on screen after the jump to
    // the top joins at once — no scroll that "leaves the viewport" is needed.
    it('re-arms scroll-past tracking for every surviving article after mark read', () => {
      mount(items(4), 4)
      for (const slug of ['news-1', 'news-2', 'news-3']) act(() => scrollPast(slug))
      readSection(4) // news-3

      readerIndex = 0
      confirm(['news-1'])

      const armed = (slug: string) =>
        live().some((o) => o.elements.some((el) => ownerSlug(el) === slug))
      expect(armed('news-2')).toBe(true)
      expect(armed('news-3')).toBe(true)
      expect(armed('news-4')).toBe(true)
    })

    it('tracks articles appended by a load-more after mark read', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ items: items(2, 3), currentPage: 1, totalPages: 1 }),
      }))
      mount(items(3), 5)
      act(() => scrollPast('news-1'))
      confirm(['news-1'])

      await act(async () => { reachLoadMoreSentinel() })
      await waitFor(() => expect(screen.getByText('News 5')).toBeInTheDocument())

      act(() => scrollPast('news-2'))
      act(() => scrollPast('news-4'))

      expect(listed()).toEqual(['news-2', 'news-4'])
    })

    it('evicts a survivor passed again after mark read, but never the reading article', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ items: items(5, 13), currentPage: 1, totalPages: 2 }),
      }))
      mount(items(13), 20)
      act(() => scrollPast('news-1'))
      act(() => scrollPast('news-2'))
      readSection(2) // news-2
      readerIndex = 0 // news-2 after news-1 goes
      confirm(['news-1'])

      // news-2 (reading) and news-3 survive and are passed again.
      act(() => scrollPast('news-2'))
      act(() => scrollPast('news-3'))
      readSection(2) // news-3 sits at index 2 now
      await act(async () => { reachLoadMoreSentinel() })
      await waitFor(() => expect(screen.getByText('News 18')).toBeInTheDocument())

      // 12 + 5 = 17 > 12: news-2 is evictable, news-3 is being read.
      expect(screen.queryByText('News 2')).not.toBeInTheDocument()
      expect(screen.getByText('News 3')).toBeInTheDocument()
      expect(JSON.parse(localStorage.getItem('visitedArticles') ?? '[]')).toContain('news-2')
      expect(listed()).toEqual(['news-3'])
    })
  })
})
