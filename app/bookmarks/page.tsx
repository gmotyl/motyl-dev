'use client';

import { useState, useMemo } from 'react';
import { useBookmarks } from '@/hooks/use-bookmarks';
import { BookmarkCard } from '@/components/bookmark-card';
import { BookmarksExport } from '@/components/bookmarks-export';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Hash, Search, X, Loader2 } from 'lucide-react';
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

  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate hashtag counts
  const hashtagCounts = useMemo(() => {
    const counts = new Map<string, number>();
    bookmarks.forEach((bookmark) => {
      bookmark.hashtags.forEach((tag) => {
        counts.set(tag, (counts.get(tag) || 0) + 1);
      });
    });
    return counts;
  }, [bookmarks]);

  // Get unique hashtags sorted by count
  const sortedHashtags = useMemo(() => {
    return Array.from(hashtagCounts.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([tag]) => tag);
  }, [hashtagCounts]);

  // Filter bookmarks
  const filteredBookmarks = useMemo(() => {
    let filtered = bookmarks;

    // Filter by hashtags
    if (selectedHashtags.length > 0) {
      filtered = filtered.filter((bookmark) =>
        selectedHashtags.every((tag) => bookmark.hashtags.includes(tag))
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (bookmark) =>
          bookmark.title.toLowerCase().includes(query) ||
          bookmark.url.toLowerCase().includes(query) ||
          bookmark.notes?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [bookmarks, selectedHashtags, searchQuery]);

  // Toggle hashtag filter
  const toggleHashtag = (tag: string) => {
    setSelectedHashtags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedHashtags([]);
    setSearchQuery('');
  };

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
                      {selectedHashtags.length > 0 || searchQuery ? ' (filtered)' : ''}
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
          {sortedHashtags.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">Filter by hashtags:</p>
                {selectedHashtags.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="h-6 px-2 text-xs"
                  >
                    Clear all
                  </Button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {sortedHashtags.map((tag) => {
                  const isSelected = selectedHashtags.includes(tag);
                  const count = hashtagCounts.get(tag) || 0;
                  return (
                    <Badge
                      key={tag}
                      variant={isSelected ? 'default' : 'outline'}
                      className={`cursor-pointer gap-1 ${
                        isSelected
                          ? 'bg-purple-600 hover:bg-purple-700 text-white'
                          : 'hover:bg-purple-600 hover:text-white'
                      } transition-colors`}
                      onClick={() => toggleHashtag(tag)}
                    >
                      <Hash className="h-3 w-3" />
                      {tag}
                      <span className="text-xs opacity-75">({count})</span>
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}
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
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters or search query.
            </p>
            <Button onClick={clearFilters} variant="outline">
              Clear Filters
            </Button>
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
                onHashtagClick={toggleHashtag}
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
