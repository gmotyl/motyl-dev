
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BookmarkDialog } from './bookmark-dialog';
import { getAllHashtags } from '@/lib/articles';

// Mock the getAllHashtags function using Vitest's mocking API.
vi.mock('@/lib/articles', () => ({
  getAllHashtags: vi.fn(),
}));

const mockedGetAllHashtags = vi.mocked(getAllHashtags);

describe('BookmarkDialog', () => {
  const mockOnOpenChange = vi.fn();
  // Mock the onSubmit function to resolve immediately.
  const mockOnSubmit = vi.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    // Clear all mocks and set a default empty array for hashtags before each test.
    vi.clearAllMocks();
    mockedGetAllHashtags.mockResolvedValue([]);
  });

  // Test case 1: Renders correctly in "create" mode and ensures fields are accessible.
  it('renders correctly in "create" mode and has accessible fields', () => {
    render(
      <BookmarkDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        onSubmit={mockOnSubmit}
        mode="create"
      />
    );

    // Check for the correct dialog title and accessible form fields.
    // Check for the correct dialog title and accessible form fields.
    expect(screen.getByRole('heading', { name: 'Add Bookmark' })).toBeInTheDocument();
    expect(screen.getByLabelText(/URL/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    // The Hashtags label isn't directly associated with the input, so we check for text presence.
    expect(screen.getByText(/Hashtags/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Add hashtag/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Bookmark' })).toBeInTheDocument();
  });

  // Test case 3: Shows validation errors for invalid URL and empty title.
  it('shows validation errors for invalid URL and empty title', async () => {
    const user = userEvent.setup();
    render(
      <BookmarkDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        onSubmit={mockOnSubmit}
        mode="create"
      />
    );

    // Submit the form without filling in required fields.
    await user.click(screen.getByRole('button', { name: 'Add Bookmark' }));

    // Expect validation error messages to appear.
    expect(await screen.findByText('Invalid URL format')).toBeInTheDocument();
    expect(await screen.findByText('Title is required')).toBeInTheDocument();
    // Ensure the submit handler was not called.
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  // Test case 4: Allows a user to add and remove hashtags.
  it('allows a user to add and remove hashtags', async () => {
    const user = userEvent.setup();
    render(
      <BookmarkDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        onSubmit={mockOnSubmit}
      />
    );

    const hashtagInput = screen.getByPlaceholderText(/Add hashtag/i);
    // Find the add button, which has a Plus icon and no text.
    const addButton = screen.getByRole('button', { name: '' });
    expect(addButton).toBeInTheDocument();
    
    // Add a hashtag.
    await user.type(hashtagInput, 'react');
    await user.click(addButton!);
    const badge = await screen.findByText('react');
    const badgeElement = badge.parentElement;
    expect(badgeElement).toBeInTheDocument();

    // Remove the hashtag.
    const removeButton = within(badgeElement!).getByRole('button');
    await user.click(removeButton);
    expect(screen.queryByText('react')).not.toBeInTheDocument();
  });

  // Test case 9: Prevents adding duplicate or empty hashtags.
  it('prevents adding duplicate or empty hashtags', async () => {
    const user = userEvent.setup();
    render(
      <BookmarkDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        onSubmit={mockOnSubmit}
      />
    );

    const hashtagInput = screen.getByPlaceholderText(/Add hashtag/i);
    const addButton = screen.getByRole('button', { name: '' });
    expect(addButton).toBeInTheDocument();
    // The add button should be disabled for empty input.
    expect(addButton).toBeDisabled();

    // Attempt to add a hashtag with only whitespace.
    await user.type(hashtagInput, '   ');
    expect(addButton).toBeDisabled();

    // Add a valid hashtag.
    await user.clear(hashtagInput);
    await user.type(hashtagInput, 'testing');
    expect(addButton).not.toBeDisabled();
    await user.click(addButton!);
    // Check that one hashtag badge is present.
    expect(await screen.findByText('testing')).toBeInTheDocument();
    expect(screen.getAllByText(/testing/i)[0].parentElement?.querySelectorAll('button')).toHaveLength(1);

    // Attempt to add the same hashtag again.
    await user.clear(hashtagInput);
    await user.type(hashtagInput, 'testing');
    await user.click(addButton!);
    // Verify that still only one badge exists.
    expect(screen.getAllByText(/testing/i)[0].parentElement?.querySelectorAll('button')).toHaveLength(1);

  });

  // Test case 8: Fetches and shows autocomplete suggestions for hashtags.
  it('fetches and shows autocomplete suggestions', async () => {
    const user = userEvent.setup();
    mockedGetAllHashtags.mockResolvedValue(['react', 'nextjs', 'typescript']);

    render(
      <BookmarkDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        onSubmit={mockOnSubmit}
      />
    );

    const hashtagInput = screen.getByPlaceholderText(/Add hashtag/i);
    await user.click(hashtagInput);

    // Check that hashtags were fetched when the input was focused.
    await waitFor(() => {
        expect(mockedGetAllHashtags).toHaveBeenCalledTimes(1);
    });
    
    // Filter suggestions by typing.
    await user.type(hashtagInput, 't');
    expect(await screen.findByText('react')).toBeVisible();
    expect(await screen.findByText('typescript')).toBeVisible();
    
    // Select a suggestion.
    await user.click(screen.getByText('typescript'));

    // Verify the suggestion was added as a badge and the input was cleared.
    // We specifically look for the badge, which has a remove button, to distinguish it from the suggestion item.
    await waitFor(() => {
      const badge = screen.getByText('typescript').closest('div');
      const removeButton = within(badge).getByRole('button');
      expect(removeButton).toBeInTheDocument();
    });
    expect(hashtagInput).toHaveValue('');
  });
});
