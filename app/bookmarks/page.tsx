'use client';

import { Suspense, useState, useMemo } from 'react';
import { useBookmarks } from '@/hooks/use-bookmarks';
import { BookmarkCard } from '@/components/bookmark-card';
import { BookmarksExport } from '@/components/bookmarks-export';
import { HashtagFilters } from '@/components/hashtag-filters';
import { Input } from '@/components/ui/input';
import { Search, X, Loader2 } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';

/**
 * Bookmarks Page - Display user's bookmarks with filtering
 *
 * Features:
 * - List all bookmarks
 * - Filter by hashtags
 * - Search by title/URL
 * - Export to markdown
 * - Hashtag statistics
 */
export default function BookmarksPage() {
  const {
    bookmarks,
    isLoading,
    error,
    updateBookmark,
    removeBookmark,
  } = useBookmarks();

  const [searchQuery, setSearchQuery] = useState('');
  const [hashtagFilteredBookmarks, setHashtagFilteredBookmarks] = useState(bookmarks);

  // Apply search filter on top of hashtag filtering
  const filteredBookmarks = useMemo(() => {
    if (!searchQuery.trim()) {
      return hashtagFilteredBookmarks;
    }

    const query = searchQuery.toLowerCase();
    return hashtagFilteredBookmarks.filter(
      (bookmark) =>
        bookmark.title.toLowerCase().includes(query) ||
        bookmark.url.toLowerCase().includes(query) ||
        bookmark.notes?.toLowerCase().includes(query)
    );
  }, [hashtagFilteredBookmarks, searchQuery]);

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
              <p className="text-red-600 dark:text-red-400">
                Error loading bookmarks: {error.message}
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">My Bookmarks</h1>
                <p className="text-muted-foreground">
                  {isLoading ? (
                    'Loading...'
                  ) : (
                    <>
                      {filteredBookmarks.length} of {bookmarks.length} bookmarks
                      {searchQuery ? ' (filtered)' : ''}
                    </>
                  )}
                </p>
              </div>
              <BookmarksExport />
            </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search bookmarks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Hashtag Filters */}
          <Suspense fallback={<div className="mb-8 text-sm text-muted-foreground">Loading filters...</div>}>
            <HashtagFilters
              items={bookmarks}
              onFilteredItemsChange={setHashtagFilteredBookmarks}
            />
          </Suspense>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
          </div>
        )}

        {/* Empty State */}
        {!isLoading && bookmarks.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <Hash className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">No bookmarks yet</h2>
            <p className="text-muted-foreground mb-6">
              Start bookmarking external links from articles to build your collection.
            </p>
            <Button asChild>
              <a href="/articles">Browse Articles</a>
            </Button>
          </div>
        )}

        {/* No Results State */}
        {!isLoading && bookmarks.length > 0 && filteredBookmarks.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">No matching bookmarks</h2>
            <p className="text-muted-foreground">
              Try adjusting your filters or search query.
            </p>
          </div>
        )}

        {/* Bookmarks Grid */}
        {!isLoading && filteredBookmarks.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredBookmarks.map((bookmark) => (
              <BookmarkCard
                key={bookmark.id}
                bookmark={bookmark}
                onUpdate={updateBookmark}
                onDelete={removeBookmark}
              />
            ))}
          </div>
        )}
        </div>
      </div>
      <Footer />
    </>
  );
}
