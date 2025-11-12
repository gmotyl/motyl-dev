'use client';

import { useState } from 'react';
import { ExternalLink, Trash2, Edit, Hash } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { BookmarkDialog } from '@/components/bookmark-dialog';
import { formatDistanceToNow } from 'date-fns';

interface Bookmark {
  id: string;
  url: string;
  title: string;
  hashtags: string[];
  notes?: string;
  bookmarkedAt: Date;
}

interface BookmarkCardProps {
  bookmark: Bookmark;
  onUpdate: (id: string, data: { hashtags?: string[]; notes?: string }) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onHashtagClick?: (hashtag: string) => void;
}

/**
 * BookmarkCard - Display a bookmark with actions
 *
 * Usage:
 * <BookmarkCard
 *   bookmark={bookmark}
 *   onUpdate={handleUpdate}
 *   onDelete={handleDelete}
 *   onHashtagClick={handleHashtagClick}
 * />
 */
export function BookmarkCard({
  bookmark,
  onUpdate,
  onDelete,
  onHashtagClick,
}: BookmarkCardProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUpdate = async (data: { hashtags?: string[]; notes?: string }) => {
    await onUpdate(bookmark.id, data);
    setShowEditDialog(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(bookmark.id);
      setShowDeleteDialog(false);
    } catch (error) {
      console.error('Error deleting bookmark:', error);
      setIsDeleting(false);
    }
  };

  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return url;
    }
  };

  const timeAgo = formatDistanceToNow(new Date(bookmark.bookmarkedAt), {
    addSuffix: true,
  });

  return (
    <>
      <Card className="group hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg line-clamp-2">
              <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-600 transition-colors flex items-start gap-2"
              >
                {bookmark.title}
                <ExternalLink className="h-4 w-4 mt-1 flex-shrink-0 opacity-60" />
              </a>
            </CardTitle>
            <div className="flex gap-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowEditDialog(true)}
                title="Edit bookmark"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDeleteDialog(true)}
                title="Delete bookmark"
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </div>

          <CardDescription className="flex items-center gap-2 text-xs">
            <span>{getDomain(bookmark.url)}</span>
            <span>•</span>
            <span>{timeAgo}</span>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-3">
          {/* Hashtags */}
          {bookmark.hashtags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {bookmark.hashtags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className={`gap-1 ${
                    onHashtagClick
                      ? 'cursor-pointer hover:bg-purple-600 hover:text-white transition-colors'
                      : ''
                  }`}
                  onClick={() => onHashtagClick?.(tag)}
                >
                  <Hash className="h-3 w-3" />
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Notes */}
          {bookmark.notes && (
            <div className="text-sm text-muted-foreground bg-muted/50 rounded-md p-3">
              <p className="whitespace-pre-wrap">{bookmark.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <BookmarkDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        onSubmit={handleUpdate}
        initialData={{
          url: bookmark.url,
          title: bookmark.title,
          hashtags: bookmark.hashtags,
          notes: bookmark.notes || '',
        }}
        mode="edit"
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Bookmark?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this bookmark? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="bg-muted/50 rounded-md p-3 my-2">
            <p className="text-sm font-medium">{bookmark.title}</p>
            <p className="text-xs text-muted-foreground mt-1">{bookmark.url}</p>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
