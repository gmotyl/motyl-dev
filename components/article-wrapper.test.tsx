import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ArticleWrapper } from './article-wrapper'
import { ItemType } from '@/lib/types'

const mockUseContinuousReader = vi.fn()
let latestReaderItems: any[] = []
let latestReaderOptions: any

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
  TTSPlayer: () => <div data-testid="compact-player" />,
}))

vi.mock('@/components/continuous-reader-controls', () => ({
  ContinuousReaderControls: ({ onPlayPause, onNext, onMarkRead, canNext = true }: any) => (
    <div role="group" aria-label="Continuous reader controls">
      <button onClick={onMarkRead} disabled={!onMarkRead}>
        Mark read
      </button>
      <button onClick={onPlayPause}>Play</button>
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
  play: vi.fn(),
  pause: vi.fn(),
  next: vi.fn(),
  playFromHere: vi.fn(),
})

const article = (itemType: ItemType) => ({
  slug: 'news-one',
  title: 'News One',
  content: '# News One\n\n## First section\n\nFirst text.\n\n## Second section\n\nSecond text.',
  itemType,
  hashtags: ['#en'],
})

describe('ArticleWrapper', () => {
  beforeEach(() => {
    latestReaderItems = []
    latestReaderOptions = undefined
    mockUseContinuousReader.mockReset()
    mockUseContinuousReader.mockReturnValue(makeReaderState())
  })

  it('replaces the normal News Article compact player with continuous reader controls', async () => {
    const user = userEvent.setup()

    render(<ArticleWrapper article={article(ItemType.News)} translatePrompt="prompt" />)

    expect(screen.getByRole('group', { name: 'Continuous reader controls' })).toBeInTheDocument()
    expect(screen.queryByTestId('compact-player')).not.toBeInTheDocument()
    expect(latestReaderItems.map((item) => item.title)).toEqual(['First section', 'Second section'])
    expect(latestReaderItems.map((item) => item.sourceSlug)).toEqual(['news-one', 'news-one'])

    await user.click(screen.getByRole('button', { name: 'Next' }))
    expect(mockUseContinuousReader.mock.results[0].value.next).toHaveBeenCalledOnce()
  })

  it('does not add continuous reader controls to a Blog Article', () => {
    render(<ArticleWrapper article={article(ItemType.Article)} translatePrompt="prompt" />)

    expect(screen.queryByRole('group', { name: 'Continuous reader controls' })).not.toBeInTheDocument()
    expect(screen.getByTestId('blog-markdown')).toBeInTheDocument()
    expect(screen.getByTestId('compact-player')).toBeInTheDocument()
  })
})
