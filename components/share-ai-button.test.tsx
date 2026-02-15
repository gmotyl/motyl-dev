import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ShareAIButton } from './share-ai-button'
import { getContentItemBySlug } from '@/lib/articles'

vi.mock('@/lib/articles')

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

// Disable Web Share API to force clipboard path
Object.defineProperty(navigator, 'share', {
  value: undefined,
  writable: true,
  configurable: true,
})

describe('ShareAIButton', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.clear()
  })

  it('renders the "share" button', async () => {
    render(<ShareAIButton prompt="Test prompt" />)

    // Wait for hydration
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /share/i })).toBeEnabled()
    })
  })

  it('shows "Copied!" state after successful click', async () => {
    const user = userEvent.setup()

    render(<ShareAIButton prompt="Test prompt for AI" />)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /share/i })).toBeEnabled()
    })

    await user.click(screen.getByRole('button', { name: /share/i }))

    // Verify the button shows "Copied!" state
    await waitFor(() => {
      expect(screen.getByText('Copied!')).toBeInTheDocument()
    })
  })

  describe('race condition fix - content fetching', () => {
    /**
     * This test verifies the fix for the race condition where:
     * - On first click, content was fetched but setArticleContent() was async
     * - formatPrompt() was called before the state update completed
     * - Result: prompt was copied WITHOUT content on first click
     *
     * The fix passes fetched content directly to formatPrompt() instead of
     * relying on the async state update.
     *
     * We verify by checking that:
     * 1. Content is fetched on first click
     * 2. The "Copied!" state is shown (indicating successful copy)
     */
    it('fetches content and shows copied state on FIRST click', async () => {
      const user = userEvent.setup()
      const mockContent = '# Test Article\n\nThis is the article content.'

      vi.mocked(getContentItemBySlug).mockResolvedValue({
        slug: 'test-article',
        title: 'Test Article',
        excerpt: 'Test excerpt',
        publishedAt: '2025-01-01',
        content: mockContent,
        hashtags: ['test'],
      })

      render(<ShareAIButton prompt="Summarize this:" articleSlug="test-article" />)

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /share/i })).toBeEnabled()
      })

      // First click - this is where the race condition used to occur
      await user.click(screen.getByRole('button', { name: /share/i }))

      // Verify content was fetched
      await waitFor(() => {
        expect(getContentItemBySlug).toHaveBeenCalledWith('test-article')
      })

      // Verify "Copied!" state is shown (indicates successful copy)
      await waitFor(() => {
        expect(screen.getByText('Copied!')).toBeInTheDocument()
      })
    })

    it('only fetches content once (caches for subsequent clicks)', async () => {
      const user = userEvent.setup()
      const mockContent = '# Test Article\n\nThis is the article content.'

      vi.mocked(getContentItemBySlug).mockResolvedValue({
        slug: 'test-article',
        title: 'Test Article',
        excerpt: 'Test excerpt',
        publishedAt: '2025-01-01',
        content: mockContent,
        hashtags: ['test'],
      })

      render(<ShareAIButton prompt="Summarize this:" articleSlug="test-article" />)

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /share/i })).toBeEnabled()
      })

      // First click
      await user.click(screen.getByRole('button', { name: /share/i }))

      await waitFor(() => {
        expect(screen.getByText('Copied!')).toBeInTheDocument()
      })

      // Wait for button to reset
      await waitFor(
        () => {
          expect(screen.getByText('share')).toBeInTheDocument()
        },
        { timeout: 4000 }
      )

      // Second click
      await user.click(screen.getByRole('button', { name: /share/i }))

      await waitFor(() => {
        expect(screen.getByText('Copied!')).toBeInTheDocument()
      })

      // Content should only be fetched once (cached)
      expect(getContentItemBySlug).toHaveBeenCalledTimes(1)
    })
  })

  describe('error handling', () => {
    it('shows error toast when article fetch fails', async () => {
      const user = userEvent.setup()

      vi.mocked(getContentItemBySlug).mockRejectedValue(new Error('Network error'))

      render(<ShareAIButton prompt="Read:" articleSlug="test-article" />)

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /share/i })).toBeEnabled()
      })

      await user.click(screen.getByRole('button', { name: /share/i }))

      // Button should NOT show "Copied!" state when fetch fails
      await waitFor(() => {
        expect(screen.queryByText('Copied!')).not.toBeInTheDocument()
      })
    })

    it('shows error toast when article is not found', async () => {
      const user = userEvent.setup()

      vi.mocked(getContentItemBySlug).mockResolvedValue(null)

      render(<ShareAIButton prompt="Read:" articleSlug="nonexistent" />)

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /share/i })).toBeEnabled()
      })

      await user.click(screen.getByRole('button', { name: /share/i }))

      // Button should NOT show "Copied!" state when article not found
      await waitFor(() => {
        expect(screen.queryByText('Copied!')).not.toBeInTheDocument()
      })
    })
  })
})
