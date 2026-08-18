import { act, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Mock } from 'vitest'
import ReadAllNewsPage from './page.client'
import { ItemType } from '@/lib/types'

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
  play: ReaderAction
  pause: ReaderAction
  next: ReaderAction
  playFromHere: Mock<(index: number) => void>
  complete: ReaderAction
}

let latestReaderItems: ReaderItem[] = []
let latestReaderOptions: ReaderOptions | undefined
let latestReaderHarness: ReaderHarness
let readerIndex = 0
let intersectionCallback: ((entries: Array<{ isIntersecting: boolean }>) => void) | undefined

vi.mock('next-auth/react', () => ({
  useSession: () => ({ data: null }),
}))

vi.mock('@/components/header', () => ({ default: () => <div data-testid="header" /> }))
vi.mock('@/components/footer', () => ({ default: () => <div data-testid="footer" /> }))
vi.mock('@/components/mark-read-dialog', () => ({ MarkReadDialog: () => null }))
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
      play,
      pause: vi.fn(),
      next: vi.fn(() => selectAndPlay(readerIndex + 1)),
      playFromHere: vi.fn((index: number) => selectAndPlay(index)),
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

vi.mock('@/components/markdown-content', () => ({
  MarkdownContent: ({ content, reader }: {
    content: string
    reader?: { onPlayFromHere: (index: number) => void }
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

class MockIntersectionObserver {
  constructor(callback: (entries: Array<{ isIntersecting: boolean }>) => void) {
    intersectionCallback = callback
  }
  observe() {}
  disconnect() {}
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
    readerIndex = 0
    playbackEvents.length = 0
    intersectionCallback = undefined
    mockUseContinuousReader.mockReset()
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
    HTMLElement.prototype.scrollIntoView = function (this: HTMLElement) {
      playbackEvents.push(`scroll:${this.id}`)
    }

    render(<ReadAllNewsPage initialItems={items(1)} totalItems={1} />)

    latestReaderHarness.play.mockImplementation(() => playbackEvents.push('play'))
    await userEvent.click(screen.getByRole('button', { name: 'Play' }))

    expect(playbackEvents).toEqual(['scroll:section-1a', 'play'])
  })

  it('scrolls the selected heading before direct section start', async () => {
    HTMLElement.prototype.scrollIntoView = function (this: HTMLElement) {
      playbackEvents.push(`scroll:${this.id}`)
    }

    render(<ReadAllNewsPage initialItems={items(1)} totalItems={1} />)

    latestReaderHarness.play.mockImplementation(() => playbackEvents.push('play'))
    await userEvent.click(screen.getByRole('button', { name: 'Play from here: Section 1B' }))

    expect(playbackEvents).toEqual(['scroll:section-1b', 'play'])
    expect(document.getElementById('section-1b')).toBeInTheDocument()
  })

  it('scrolls the next heading before playback', async () => {
    HTMLElement.prototype.scrollIntoView = function (this: HTMLElement) {
      playbackEvents.push(`scroll:${this.id}`)
    }

    render(<ReadAllNewsPage initialItems={items(1)} totalItems={1} />)

    latestReaderHarness.play.mockImplementation(() => playbackEvents.push('play'))
    await userEvent.click(within(screen.getByRole('group', { name: 'Continuous reader controls' })).getByRole('button', { name: 'Next' }))

    expect(playbackEvents).toEqual(['scroll:section-1b', 'play'])
    expect(document.getElementById('section-1b')).toBeInTheDocument()
  })

  it('scrolls the next heading before automatically advancing playback', async () => {
    HTMLElement.prototype.scrollIntoView = function (this: HTMLElement) {
      playbackEvents.push(`scroll:${this.id}`)
    }

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
})
