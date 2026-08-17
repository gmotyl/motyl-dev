import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import ReadAllNewsPage from './page.client'
import { ItemType } from '@/lib/types'

const mockUseContinuousReader = vi.fn()
let latestReaderItems: any[] = []
let latestReaderOptions: any
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
  useContinuousReader: (items: any[], options: any) => {
    latestReaderItems = items
    latestReaderOptions = options
    return mockUseContinuousReader(items, options)
  },
}))

vi.mock('@/components/continuous-reader-controls', () => ({
  ContinuousReaderControls: ({ onPlayPause, onNext, onMarkRead, canNext = true }: any) => (
    <div role="group" aria-label="Continuous reader controls">
      <button onClick={onMarkRead}>Mark read</button>
      <button onClick={onPlayPause}>Play</button>
      <button onClick={onNext} disabled={!canNext}>Next</button>
    </div>
  ),
}))

vi.mock('@/components/markdown-content', () => ({
  MarkdownContent: ({ content, reader }: any) => (
    <div>
      {Array.from(content.matchAll(/^##\s+(.+)$/gm)).map((match: RegExpMatchArray) => (
        <h2 key={match[1]} id={match[1].toLowerCase().replaceAll(' ', '-')}>
          {match[1]}
        </h2>
      ))}
      {reader && <button onClick={() => reader.onPlayFromHere(0)}>Play from here</button>}
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
    intersectionCallback = undefined
    mockUseContinuousReader.mockReset()
    mockUseContinuousReader.mockReturnValue({
      isPlaying: false,
      isBuffering: false,
      currentIndex: 0,
      play: vi.fn(),
      pause: vi.fn(),
      next: vi.fn(),
      playFromHere: vi.fn(),
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

  it('scrolls the selected section into view before playback', async () => {
    const scrollIntoView = vi.fn()
    HTMLElement.prototype.scrollIntoView = scrollIntoView

    render(<ReadAllNewsPage initialItems={items(1)} totalItems={1} />)

    act(() => latestReaderOptions.onItemChange(latestReaderItems[1], 1))

    await waitFor(() => expect(scrollIntoView).toHaveBeenCalled())
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
})
