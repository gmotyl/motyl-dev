'use client';

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Hash } from 'lucide-react';
import { getAllHashtags } from '@/lib/articles';

const bookmarkSchema = z.object({
  url: z.string().url('Invalid URL format'),
  title: z.string().min(1, 'Title is required'),
  hashtags: z.array(z.string()).optional(),
  notes: z.string().optional(),
});

type BookmarkFormData = z.infer<typeof bookmarkSchema>;

interface BookmarkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: BookmarkFormData) => Promise<void>;
  initialData?: Partial<BookmarkFormData>;
  mode?: 'create' | 'edit';
  suggestedHashtags?: string[];
}

/**
 * BookmarkDialog - Form dialog for creating/editing bookmarks
 *
 * Usage:
 * <BookmarkDialog
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   onSubmit={handleSubmit}
 *   initialData={{ url, title }}
 *   suggestedHashtags={['react', 'nextjs']}
 * />
 */
export function BookmarkDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  mode = 'create',
  suggestedHashtags = [],
}: BookmarkDialogProps) {
  const [hashtags, setHashtags] = useState<string[]>(
    initialData?.hashtags || []
  );
  const [hashtagInput, setHashtagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [allHashtags, setAllHashtags] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const hashtagInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      const fetchHashtags = async () => {
        const tags = await getAllHashtags();
        setAllHashtags(tags);
      };
      fetchHashtags();
    }
  }, [open]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookmarkFormData>({
    resolver: zodResolver(bookmarkSchema),
    defaultValues: {
      url: initialData?.url || '',
      title: initialData?.title || '',
      notes: initialData?.notes || '',
    },
  });

  const handleAddHashtag = (tag: string) => {
    const cleanTag = tag.trim().toLowerCase().replace(/^#/, '');
    if (cleanTag && !hashtags.includes(cleanTag)) {
      setHashtags([...hashtags, cleanTag]);
    }
    setHashtagInput('');
    setShowSuggestions(false);
  };

  const handleRemoveHashtag = (tag: string) => {
    setHashtags(hashtags.filter((t) => t !== tag));
  };

  const handleFormSubmit = async (data: BookmarkFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit({
        ...data,
        hashtags,
      });
      reset();
      setHashtags([]);
      setHashtagInput('');
      hashtagInputRef.current?.blur();
      onOpenChange(false);
    } catch (error) {
      console.error('Error submitting bookmark:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Add Bookmark' : 'Edit Bookmark'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'create'
              ? 'Save this link to your bookmarks collection.'
              : 'Update your bookmark details.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* URL Field */}
          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://example.com/article"
              {...register('url')}
              disabled={mode === 'edit'}
              className={errors.url ? 'border-red-500' : ''}
            />
            {errors.url && (
              <p className="text-sm text-red-500">{errors.url.message}</p>
            )}
          </div>

          {/* Title Field */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="Article title"
              {...register('title')}
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* Hashtags Field */}
          <div className="space-y-2">
            <Label htmlFor="hashtags">Hashtags</Label>
            <div className="flex gap-2">
              <Command className="relative">
                <CommandInput
                  ref={hashtagInputRef}
                  placeholder="Add hashtag (e.g., react)"
                  value={hashtagInput}
                  onValueChange={setHashtagInput}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                />
                {showSuggestions && (
                  <CommandList className="absolute top-10 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md">
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                      {allHashtags
                        .filter((tag) =>
                          tag.toLowerCase().includes(hashtagInput.toLowerCase())
                        )
                        .slice(0, 5)
                        .map((tag) => (
                          <CommandItem
                            key={tag}
                            onSelect={() => handleAddHashtag(tag)}
                          >
                            {tag}
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </CommandList>
                )}
              </Command>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleAddHashtag(hashtagInput)}
                disabled={!hashtagInput.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Selected Hashtags */}
            {hashtags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {hashtags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="gap-1 pl-2 pr-1"
                  >
                    <Hash className="h-3 w-3" />
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveHashtag(tag)}
                      className="ml-1 hover:bg-muted rounded-sm"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            {/* Suggested Hashtags */}
            {suggestedHashtags.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Suggestions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedHashtags
                    .filter((tag) => !hashtags.includes(tag))
                    .slice(0, 8)
                    .map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="cursor-pointer hover:bg-purple-600 hover:text-white transition-colors"
                        onClick={() => handleAddHashtag(tag)}
                      >
                        <Hash className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Notes Field */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any notes about this bookmark..."
              rows={3}
              {...register('notes')}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? 'Saving...'
                : mode === 'create'
                ? 'Add Bookmark'
                : 'Update Bookmark'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
