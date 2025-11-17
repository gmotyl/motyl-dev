'use client';

import { useEffect, useState } from 'react';
import { ScrollToSection } from './scroll-to-section';

/**
 * ArticleScrollHandler - Client component wrapper to handle URL hash changes
 *
 * This component reads the URL hash and passes it to ScrollToSection.
 * It's needed because we need client-side access to window.location.hash
 */
export function ArticleScrollHandler() {
  const [sectionId, setSectionId] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Get hash from URL (remove the # prefix)
    const hash = window.location.hash.slice(1);
    if (hash) {
      setSectionId(decodeURIComponent(hash));
    }

    // Listen for hash changes (e.g., when clicking internal links)
    const handleHashChange = () => {
      const newHash = window.location.hash.slice(1);
      setSectionId(newHash ? decodeURIComponent(newHash) : undefined);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return <ScrollToSection sectionId={sectionId} />;
}
