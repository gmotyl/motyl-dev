'use client';

import { useEffect } from 'react';
import { useVisitedArticles } from '@/hooks/use-visited-articles';

interface ArticleViewTrackerProps {
  slug: string;
}

export function ArticleViewTracker({ slug }: ArticleViewTrackerProps) {
  const { markAsVisited } = useVisitedArticles();

  useEffect(() => {
    markAsVisited(slug);
  }, [slug, markAsVisited]);

  return null;
}
