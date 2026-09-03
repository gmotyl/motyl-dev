import { act, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Mock } from 'vitest'
import ReadAllNewsPage from './page.client'
import { ItemType } from '@/lib/content/types'

// The reader no longer calls scrollIntoView; it delegates to this helper.
// Mock it so scroll-order tests can record which heading scrolled (el.id)
// and assert scroll fires before playback.
const { scrollHeadingIntoView } = vi.hoisted(() => ({ scrollHeadingIntoView: vi.fn() }))
vi.mock('@/lib/reader/scroll-heading', () => ({ scrollHeadingIntoView }))

const mockUseContinuousReader = vi.fn()
const playbackEvents: string[] = []
type ReaderItem = { sourceSlug: string; title: string }
type ReaderOptions = { onItemChange?: (item: ReaderItem, index: number) => void }
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
    latestReaderHarness = {
      isPlaying: false,
      isBuffering: false,
      currentIndex: readerIndex,
      currentItem: items[readerIndex],
      currentSlug: items[readerIndex]?.sourceSlug ?? null,
      play,
      pause: vi.fn(),
      next: vi.fn(() => selectAndPlay(readerIndex + 1)),
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

describe('ReadAllNewsPage continuous reader', () => {
  beforeEach(() => {
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
    latestReaderItems = []
    latestReaderOptions = undefined
    latestReaderHarness = undefined as unknown as ReaderHarness
    latestMarkReadDialogProps = undefined
    readerIndex = 0
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
})
