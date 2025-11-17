'use client';

import { useEffect } from 'react';

interface ScrollToSectionProps {
  sectionId?: string;
}

// Helper function to generate slug (same as in markdown-content.tsx)
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * ScrollToSection - Client component to handle scroll-to-section on page load
 *
 * Usage:
 * <ScrollToSection sectionId={hash} />
 *
 * Features:
 * - Scrolls to section with matching id from URL hash
 * - Finds headings that match the section title (including slugified versions)
 * - Smooth scroll animation
 * - Highlights the target section temporarily
 */
export function ScrollToSection({ sectionId }: ScrollToSectionProps) {
  useEffect(() => {
    if (!sectionId) return;

    // Wait for content to render
    const timer = setTimeout(() => {
      try {
        const decodedId = decodeURIComponent(sectionId);

        // Try to find element by ID first (exact match)
        let targetElement = document.getElementById(decodedId);

        // If not found, try slugified version
        if (!targetElement) {
          const slugifiedId = slugify(decodedId);
          targetElement = document.getElementById(slugifiedId);
        }

        // If still not found, try to find by matching text in headings
        if (!targetElement) {
          const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');

          for (const heading of headings) {
            const headingText = heading.textContent?.trim();
            if (headingText === decodedId || slugify(headingText || '') === slugify(decodedId)) {
              targetElement = heading as HTMLElement;
              break;
            }
          }
        }

        if (targetElement) {
          // Scroll to element with offset for header
          const offset = 100; // Adjust based on header height
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Highlight the section briefly
          targetElement.classList.add('highlight-section');
          setTimeout(() => {
            targetElement?.classList.remove('highlight-section');
          }, 2000);
        }
      } catch (error) {
        console.error('Error scrolling to section:', error);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [sectionId]);

  return null;
}
