'use client';

import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BookmarkButtonProps {
  url: string;
  title: string;
  isBookmarked: boolean;
  onToggle: () => void;
  loading?: boolean;
  className?: string;
  showLabel?: boolean;
}

/**
 * BookmarkButton - Toggle bookmark with star icon
 *
 * Usage:
 * <BookmarkButton
 *   url="https://example.com"
 *   title="Example Article"
 *   isBookmarked={true}
 *   onToggle={() => handleToggle()}
 *   loading={false}
 * />
 */
export function BookmarkButton({
  url,
  title,
  isBookmarked,
  onToggle,
  loading = false,
  className,
  showLabel = false,
}: BookmarkButtonProps) {
  return (
    <Button
      variant={isBookmarked ? 'default' : 'outline'}
      size="sm"
      onClick={onToggle}
      disabled={loading}
      className={cn(
        'gap-2 transition-all',
        isBookmarked && 'bg-purple-600 hover:bg-purple-700 text-white',
        className
      )}
      title={isBookmarked ? `Remove bookmark: ${title}` : `Bookmark: ${title}`}
    >
      <Star
        className={cn(
          'h-4 w-4 transition-all',
          isBookmarked && 'fill-current',
          loading && 'animate-pulse'
        )}
      />
      {showLabel && (
        <span className="text-xs">
          {loading ? 'Saving...' : isBookmarked ? 'Bookmarked' : 'Bookmark'}
        </span>
      )}
    </Button>
  );
}
