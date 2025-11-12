'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

export interface Bookmark {
  id: string;
  url: string;
  title: string;
  hashtags: string[];
  notes?: string;
  bookmarkedAt: Date;
  userId: string;
}

interface UseBookmarksReturn {
  bookmarks: Bookmark[];
  isLoading: boolean;
  error: Error | null;
  addBookmark: (data: {
    url: string;
    title: string;
    hashtags?: string[];
    notes?: string;
  }) => Promise<void>;
  removeBookmark: (id: string) => Promise<void>;
  updateBookmark: (
    id: string,
    data: { hashtags?: string[]; notes?: string }
  ) => Promise<void>;
  isBookmarked: (url: string) => boolean;
  refresh: () => Promise<void>;
}

/**
 * useBookmarks - Custom hook for managing bookmarks
 *
 * Handles:
 * - Fetching all bookmarks
 * - Adding new bookmarks
 * - Removing bookmarks
 * - Updating bookmarks
 * - Checking bookmark status
 * - Client-side state management
 * - Error handling and toast notifications
 *
 * Usage:
 * const {
 *   bookmarks,
 *   isLoading,
 *   addBookmark,
 *   removeBookmark,
 *   isBookmarked
 * } = useBookmarks();
 */
export function useBookmarks(): UseBookmarksReturn {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch all bookmarks
  const fetchBookmarks = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/bookmarks');

      if (!response.ok) {
        throw new Error('Failed to fetch bookmarks');
      }

      const data = await response.json();
      setBookmarks(data.bookmarks || []);
      setError(null);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      console.error('Error fetching bookmarks:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  // Add bookmark
  const addBookmark = useCallback(
    async (data: {
      url: string;
      title: string;
      hashtags?: string[];
      notes?: string;
    }) => {
      try {
        const response = await fetch('/api/bookmarks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to add bookmark');
        }

        const result = await response.json();

        // Add to local state
        setBookmarks((prev) => [result.bookmark, ...prev]);

        toast.success('Bookmark added successfully');
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        console.error('Error adding bookmark:', error);
        toast.error(error.message);
        throw error;
      }
    },
    []
  );

  // Remove bookmark
  const removeBookmark = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/bookmarks/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to remove bookmark');
      }

      // Remove from local state
      setBookmarks((prev) => prev.filter((b) => b.id !== id));

      toast.success('Bookmark removed');
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      console.error('Error removing bookmark:', error);
      toast.error(error.message);
      throw error;
    }
  }, []);

  // Update bookmark
  const updateBookmark = useCallback(
    async (id: string, data: { hashtags?: string[]; notes?: string }) => {
      try {
        const response = await fetch(`/api/bookmarks/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to update bookmark');
        }

        const result = await response.json();

        // Update local state
        setBookmarks((prev) =>
          prev.map((b) => (b.id === id ? result.bookmark : b))
        );

        toast.success('Bookmark updated');
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        console.error('Error updating bookmark:', error);
        toast.error(error.message);
        throw error;
      }
    },
    []
  );

  // Check if URL is bookmarked
  const isBookmarked = useCallback(
    (url: string) => {
      return bookmarks.some((b) => b.url === url);
    },
    [bookmarks]
  );

  // Refresh bookmarks
  const refresh = useCallback(async () => {
    await fetchBookmarks();
  }, [fetchBookmarks]);

  return {
    bookmarks,
    isLoading,
    error,
    addBookmark,
    removeBookmark,
    updateBookmark,
    isBookmarked,
    refresh,
  };
}
