import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ArticleWrapper } from './article-wrapper'
import { ItemType } from '@/lib/types'

const mockUseContinuousReader = vi.fn()
let latestReaderItems: any[] = []
let latestReaderOptions: any
let latestTTSProps: { voice?: string } | undefined

vi.mock('@/hooks/use-continuous-reader', () => ({
  useContinuousReader: (items: any[], options: any) => {
    latestReaderItems = items
    latestReaderOptions = options
    return mockUseContinuousReader(items, options)
  },
}))

vi.mock('@/hooks/use-section-visibility', () => ({
  useSectionVisibility: () => ({
    hiddenSections: new Set(),
    toggleSection: vi.fn(),
    isHydrated: true,
  }),
}))

vi.mock('@/components/article-section-toggle', () => ({
  ArticleSectionToggle: () => <div data-testid="section-toggle" />,
}))

vi.mock('@/components/share-ai-button', () => ({
  ShareAIButton: () => <div data-testid="share-ai" />,
}))

vi.mock('@/components/tts-player', () => ({
  TTSPlayer: (props: { voice?: string }) => {
    latestTTSProps = props
    return <div data-testid="compact-player" />
  },
}))

// Mock the inner controls only; the real ReaderControlBar wraps them in the
// floating panel (data-reader-floating), so its presence proves the bar mounts.
vi.mock('@/components/continuous-reader-controls', () => ({
  ContinuousReaderControls: ({ onPlayPause, onNext, onMarkRead, canNext = true, canPlay = true }: any) => (
    <div role="group" aria-label="Continuous reader controls">
      <button onClick={onMarkRead} disabled={!onMarkRead}>
        Mark read
      </button>
      <button onClick={onPlayPause} disabled={!canPlay}>Play</button>
      <button onClick={onNext} disabled={!canNext}>Next</button>
    </div>
  ),
}))

vi.mock('@/components/markdown-content', () => ({
  MarkdownContent: ({ content }: any) => <div data-testid="markdown-content">{content}</div>,
}))

vi.mock('@/components/markdown-with-cta', () => ({
  MarkdownWithCTA: () => <div data-testid="blog-markdown" />,
}))

const makeReaderState = () => ({
  isPlaying: false,
  isBuffering: false,
  currentIndex: 0,
  currentItem: undefined,
  canNext: true,
  play: vi.fn(),
  pause: vi.fn(),
  next: vi.fn(),
  playFromHere: vi.fn(),
})

const article = (itemType: ItemType, hashtags = ['#en'], content?: string) => ({
  slug: 'news-one',
  title: 'News One',
  content: content ?? '# News One\n\n## First section\n\nFirst text.\n\n## Second section\n\nSecond text.',
  itemType,
  hashtags,
})

describe('ArticleWrapper', () => {
  beforeEach(() => {
    latestReaderItems = []
    latestReaderOptions = undefined
    latestTTSProps = undefined
    mockUseContinuousReader.mockReset()
    mockUseContinuousReader.mockReturnValue(makeReaderState())
  })

  it('News Article renders the floating reader bar and no inline reader controls', async () => {
    const user = userEvent.setup()

    render(<ArticleWrapper article={article(ItemType.News)} translatePrompt="prompt" />)

    // Reader controls live only inside the floating bar.
    const floatingBar = document.querySelector('[data-reader-floating]')
    expect(floatingBar).not.toBeNull()
    const group = screen.getByRole('group', { name: 'Continuous reader controls' })
    expect(floatingBar).toContainElement(group)

    // ShareAIButton still renders in the inline action row; compact player gone.
    expect(screen.getByTestId('share-ai')).toBeInTheDocument()
    expect(screen.queryByTestId('compact-player')).not.toBeInTheDocument()

    // Reader still fed the reviewed sections and Next drives reader.next.
    expect(latestReaderItems.map((item) => item.title)).toEqual(['First section', 'Second section'])
    expect(latestReaderItems.map((item) => item.sourceSlug)).toEqual(['news-one', 'news-one'])

    await user.click(within(group).getByRole('button', { name: 'Next' }))
    expect(mockUseContinuousReader.mock.results[0].value.next).toHaveBeenCalledOnce()
  })

  it('News Article with no readable sections disables Play/Pause', () => {
    render(
      <ArticleWrapper
        article={article(ItemType.News, ['#en'], '# News One\n\nJust an intro paragraph, no reviewed sections.')}
        translatePrompt="prompt"
      />,
    )

    expect(latestReaderItems).toHaveLength(0)
    expect(screen.getByRole('button', { name: 'Play' })).toBeDisabled()
  })

  it('Blog Article still renders the compact TTSPlayer and no reader bar', () => {
    render(<ArticleWrapper article={article(ItemType.Article, ['pl'])} translatePrompt="prompt" />)

    expect(screen.queryByRole('group', { name: 'Continuous reader controls' })).not.toBeInTheDocument()
    expect(document.querySelector('[data-reader-floating]')).toBeNull()
    expect(screen.getByTestId('blog-markdown')).toBeInTheDocument()
    expect(screen.getByTestId('compact-player')).toBeInTheDocument()
    expect(latestTTSProps?.voice).toBe('pl-PL-MarekNeural')
  })
})
