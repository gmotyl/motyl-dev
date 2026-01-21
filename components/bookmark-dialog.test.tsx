import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BookmarkDialog } from './bookmark-dialog'

// Mock hooks that HashtagInput depends on
vi.mock('@/hooks/use-hashtag-suggestions', () => ({
  useHashtagSuggestions: () => ({
    suggestions: [],
    isLoading: false,
    isNewHashtag: true,
  }),
}))

vi.mock('@/hooks/use-recent-hashtags', () => ({
  useRecentHashtags: () => ({
    recentHashtags: [],
    addRecent: vi.fn(),
  }),
}))

describe('BookmarkDialog', () => {
  const mockOnOpenChange = vi.fn()
  const mockOnSubmit = vi.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    vi.clearAllMocks()

    // Mock window.matchMedia for use-mobile hook
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })
  })

  it('renders correctly in "create" mode and has accessible fields', () => {
    render(
      <BookmarkDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        onSubmit={mockOnSubmit}
        mode="create"
      />
    )

    // Check for the correct dialog title and accessible form fields
    expect(screen.getByRole('heading', { name: 'Add Bookmark' })).toBeInTheDocument()
    expect(screen.getByLabelText(/URL/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument()
    expect(screen.getByText(/Hashtags/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add Bookmark' })).toBeInTheDocument()
  })

  it('shows validation errors for invalid URL and empty title', async () => {
    const user = userEvent.setup()
    render(
      <BookmarkDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        onSubmit={mockOnSubmit}
        mode="create"
      />
    )

    // Submit the form without filling in required fields
    await user.click(screen.getByRole('button', { name: 'Add Bookmark' }))

    // Expect validation error messages to appear
    expect(await screen.findByText('Invalid URL format')).toBeInTheDocument()
    expect(await screen.findByText('Title is required')).toBeInTheDocument()
    // Ensure the submit handler was not called
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('renders in edit mode with correct title', () => {
    render(
      <BookmarkDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        onSubmit={mockOnSubmit}
        mode="edit"
        initialData={{ url: 'https://example.com', title: 'Test' }}
      />
    )

    expect(screen.getByRole('heading', { name: 'Edit Bookmark' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Update Bookmark' })).toBeInTheDocument()
  })

  it('displays suggested hashtags when provided', () => {
    render(
      <BookmarkDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        onSubmit={mockOnSubmit}
        suggestedHashtags={['react', 'nextjs', 'typescript']}
      />
    )

    expect(screen.getByText('Suggestions from article:')).toBeInTheDocument()
    expect(screen.getByText('react')).toBeInTheDocument()
    expect(screen.getByText('nextjs')).toBeInTheDocument()
    expect(screen.getByText('typescript')).toBeInTheDocument()
  })

  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    render(
      <BookmarkDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        onSubmit={mockOnSubmit}
        mode="create"
      />
    )

    // Fill in valid URL and title
    await user.type(screen.getByLabelText(/URL/i), 'https://example.com/article')
    await user.type(screen.getByLabelText(/Title/i), 'Test Article')

    // Submit the form
    await user.click(screen.getByRole('button', { name: 'Add Bookmark' }))

    // Wait for form submission
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          url: 'https://example.com/article',
          title: 'Test Article',
        })
      )
    })
  })
})
