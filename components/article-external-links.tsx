'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { ExternalLink as ExternalLinkIcon, Link as LinkIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookmarkButton } from '@/components/bookmark-button';
import { BookmarkDialog } from '@/components/bookmark-dialog';
import { useBookmarks } from '@/hooks/use-bookmarks';
import type { ExternalLink } from '@/lib/types';

interface ArticleExternalLinksProps {
  links: ExternalLink[];
  articleHashtags: string[];
  articleSlug: string;
}

/**
 * ArticleExternalLinks - Display external links from article with bookmark functionality
 *
 * Features:
 * - List all external links found in article
 * - Bookmark button for authenticated users
 * - Quick bookmark with dialog for hashtags
 * - Suggest article hashtags for new bookmarks
 */
export function ArticleExternalLinks({ links, articleHashtags, articleSlug }: ArticleExternalLinksProps) {
  const { data: session } = useSession();
  const { bookmarks, addBookmark, removeBookmark, isLoading } = useBookmarks();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState<ExternalLink | null>(null);

  if (links.length === 0) {
    return null;
  }

  const handleToggleBookmark = (link: ExternalLink) => {
    if (!session) {
      // Not authenticated - show sign in message
      return;
    }

    const existingBookmark = bookmarks.find((b) => b.url === link.url);

    if (existingBookmark) {
      // Remove bookmark
      removeBookmark(existingBookmark.id);
    } else {
      // Show dialog to add bookmark
      setSelectedLink(link);
      setDialogOpen(true);
    }
  };

  const handleAddBookmark = async (data: {
    url: string;
    title: string;
    hashtags?: string[];
    notes?: string;
  }) => {
    await addBookmark({
      ...data,
      articleSlug,
      sectionTitle: selectedLink?.title, // Use the link title as section reference
    });
    setDialogOpen(false);
    setSelectedLink(null);
  };

  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return url;
    }
  };

  return (
    <>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <LinkIcon className="h-5 w-5" />
            External Links ({links.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {links.map((link, index) => {
              const isBookmarked = bookmarks.some((b) => b.url === link.url);

              return (
                <div
                  key={`${link.url}-${index}`}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex-1 min-w-0">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-2 hover:text-purple-600 transition-colors"
                    >
                      <ExternalLinkIcon className="h-4 w-4 mt-1 flex-shrink-0 opacity-60" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium line-clamp-2">{link.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {getDomain(link.url)}
                        </p>
                      </div>
                    </a>
                  </div>

                  {session && (
                    <div className="md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                      <BookmarkButton
                        url={link.url}
                        title={link.title}
                        isBookmarked={isBookmarked}
                        onToggle={() => handleToggleBookmark(link)}
                        loading={isLoading}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!session && links.length > 0 && (
            <div className="mt-4 p-3 bg-muted/50 rounded-lg text-sm text-muted-foreground text-center">
              <a href="/api/auth/signin" className="text-purple-600 hover:underline">
                Sign in
              </a>{' '}
              to bookmark these links
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bookmark Dialog */}
      {selectedLink && (
        <BookmarkDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSubmit={handleAddBookmark}
          initialData={{
            url: selectedLink.url,
            title: selectedLink.title,
          }}
          suggestedHashtags={articleHashtags}
          mode="create"
        />
      )}
    </>
  );
}
