# CLAUDE.md - Project Documentation

## Project Overview

**motyl.dev** - A Next.js 15-based newsletter landing page and tech blog focused on frontend development, architecture, and software craftsmanship. The site serves as a personal brand for Grzegorz Motyl, a Senior Software Developer and Solution Architect with 20+ years of experience.

**Live URL**: https://motyl.dev
**Tech Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS, Radix UI
**Deployment**: Vercel
**Package Manager**: pnpm

## Project Architecture

### Directory Structure

```
/motyl-dev
├── app/                      # Next.js App Router
│   ├── page.tsx             # Landing page (hero, about, newsletter, testimonials)
│   ├── layout.tsx           # Root layout with dark theme, SEO metadata
│   ├── globals.css          # Global styles with custom Tailwind utilities
│   ├── articles/            # Articles listing and detail pages
│   │   ├── page.tsx         # Articles listing with hashtag filters
│   │   ├── [slug]/page.tsx  # Individual article page
│   │   └── useHashtagFilter.ts # Client-side filtering logic
│   ├── api/
│   │   ├── subscribe/route.ts   # Newsletter subscription endpoint
│   │   └── articles/
│   │       ├── route.ts         # Get all articles API
│   │       └── [slug]/route.ts  # Get single article API
│   ├── robots.ts            # Dynamic robots.txt
│   └── sitemap.ts           # Dynamic sitemap generation
├── articles/                 # Markdown articles (100+ files)
│   └── *.md                 # Format: frontmatter + markdown content
├── components/              # React components
│   ├── header.tsx           # Navigation header
│   ├── footer.tsx           # Footer with links
│   ├── newsletter-form.tsx  # Newsletter subscription form
│   ├── theme-provider.tsx   # Dark theme provider
│   └── ui/                  # Radix UI components (50+ components)
├── lib/
│   ├── articles.ts          # Article CRUD and hashtag filtering logic
│   └── utils.ts             # Utility functions (cn, etc.)
├── hooks/                   # Custom React hooks
├── public/                  # Static assets
├── styles/                  # Additional stylesheets
└── vercel.json             # Vercel deployment config
```

## Key Features

### 1. Landing Page ([app/page.tsx](app/page.tsx))
- **Hero Section**: Gradient background, value proposition, newsletter signup
- **About Section**: Three-column grid showcasing expertise (Architecture, FP, Craftsmanship)
- **Newsletter Section**: Detailed feature breakdown (3 pillars)
- **Latest Articles**: Dynamic display of 3 most recent articles
- **Testimonials**: Social proof from colleagues

**Design System**:
- Purple-based color scheme (`#8B5CF6`, `#D946EF`, `#A855F7`)
- Gradient backgrounds with opacity layers
- Hover effects with glow animations
- Dark theme with butterfly pattern background

### 2. Articles System

**Content Management**:
- Articles stored as Markdown files in `/articles` directory
- Frontmatter format:
  ```yaml
  ---
  title: "Article Title"
  excerpt: "Brief summary"
  publishedAt: "2025-05-09"
  slug: "article-slug"
  hashtags: "#generated #pl #ai #architecture"
  ---
  ```

**Article Library** ([lib/articles.ts](lib/articles.ts)):
- `getAllArticles()`: Returns all articles sorted by publishedAt (newest first)
- `getArticleBySlug(slug)`: Fetches single article
- `getAllHashtags()`: Returns unique hashtags sorted alphabetically
- `getHashtagCounts()`: Returns hashtag → count mapping
- `getArticlesByHashtag(hashtag)`: Filters articles by hashtag
- **Hashtag Index**: Build-time optimization for fast filtering

**Articles Page** ([app/articles/page.tsx](app/articles/page.tsx)):
- Client-side filtering with hashtag selection
- Three filter modes: HAS (AND), ANY (OR), EXCLUDE
- "UNSEEN" filter tracking visited articles via localStorage
- Dynamic hashtag counts based on current filters
- URL state synchronization (`?hashtags=ai,react&mode=AND&unseen=true`)

**Features**:
- Hashtag filtering with multiple selection modes
- Visited article tracking (localStorage)
- Responsive grid layout (1/2/3 columns)
- Clickable hashtag badges within article cards

### 3. Newsletter System

**Frontend** ([components/newsletter-form.tsx](components/newsletter-form.tsx)):
- Email validation with react-hook-form + zod
- Toast notifications on success/error
- Accessible form with proper labels

**Backend** ([app/api/subscribe/route.ts](app/api/subscribe/route.ts)):
- POST endpoint for email subscriptions
- Resend integration for email notifications
- Sends notification to `gmotyl@gmail.com` on new subscriber
- HTML + plain text email templates
- Graceful fallback if RESEND_API_KEY missing

**TODO for Newsletter**:
1. Integrate with actual newsletter platform (Mailchimp, ConvertKit, etc.)
2. Store emails in database
3. Send welcome email to subscribers
4. Verify `motyl.dev` domain in Resend to use `greg@motyl.dev` sender

### 4. SEO & Metadata

**Implementation** ([app/layout.tsx](app/layout.tsx)):
- Comprehensive metadata with Open Graph and Twitter cards
- Google verification token included
- Canonical URLs configured
- Sitemap: [app/sitemap.ts](app/sitemap.ts) - Dynamic generation from articles
- Robots.txt: [app/robots.ts](app/robots.ts) - Allows all crawlers

**Metadata Structure**:
```typescript
{
  title: 'Motyl.dev - Tech News & Insights',
  description: 'Stay up to date with the latest tech news...',
  keywords: ['tech news', 'web development', ...],
  metadataBase: new URL('https://motyl.dev'),
  openGraph: { ... },
  twitter: { card: 'summary_large_image', ... },
  robots: { index: true, follow: true, ... }
}
```

### 5. Styling System

**Tailwind Configuration** ([tailwind.config.ts](tailwind.config.ts)):
- **Primary Colors**: Purple gradients (`#8B5CF6` to `#D946EF`)
- **Custom Animations**: `float`, `glow`, `accordion-down/up`
- **Background Images**:
  - `butterfly-pattern`: Subtle brand element
  - `gradient-purple`: Main brand gradient
  - `gradient-purple-soft`: Overlay effects
- **Typography Plugin**: For markdown rendering (@tailwindcss/typography)

**Design Patterns**:
- Glassmorphism: `backdrop-blur-sm` + `bg-background/50`
- Border glow effects on hover
- Consistent spacing and rounded corners
- Dark theme with high contrast

## Technical Decisions

### Next.js 15 Configuration ([next.config.mjs](next.config.mjs))
```javascript
{
  eslint: { ignoreDuringBuilds: true },    // Speed up builds
  typescript: { ignoreBuildErrors: true },  // Speed up builds
  images: { unoptimized: true }            // Simpler deployment
}
```

**Note**: For production improvements, consider:
- Removing `ignoreBuildErrors` to catch type issues
- Enabling image optimization for better performance
- Adding proper ESLint rules

### State Management
- **No global state library**: React hooks + URL state sufficient
- **localStorage**: Used for visited articles tracking
- **URL params**: Hashtag filters, mode, unseen state

### Rendering Strategy
- **Landing page**: Client-side rendering (`'use client'`) for interactivity
- **Articles pages**: Client-side rendering for filtering
- **APIs**: Server-side route handlers
- **Article content**: Server-side utilities with client hydration

## Common Development Tasks

### Adding a New Article

1. Create markdown file in `/articles` directory:
   ```bash
   touch articles/my-new-article.md
   ```

2. Add frontmatter:
   ```yaml
   ---
   title: "Your Article Title"
   excerpt: "Brief description for previews"
   publishedAt: "2025-11-02"
   slug: "my-new-article"
   hashtags: "#react #nextjs #typescript"
   ---

   # Article content here
   ```

3. Article automatically appears on `/articles` page (sorted by date)

**Hashtag Format**: Space-separated with `#` prefix OR array format
**Slug**: Should match filename (without .md)

### Modifying Landing Page Sections

**Hero Section** ([app/page.tsx:45-109](app/page.tsx#L45-L109)):
- Update heading, description, or newsletter CTA
- Modify gradient backgrounds via Tailwind classes

**About Section** ([app/page.tsx:111-163](app/page.tsx#L111-L163)):
- Three-column grid showcasing expertise areas
- Update icons from `lucide-react`

**Newsletter Features** ([app/page.tsx:165-256](app/page.tsx#L165-L256)):
- Three-pillar approach to value proposition
- Each card has icon, title, description, bullet points

**Testimonials** ([app/page.tsx:303-378](app/page.tsx#L303-L378)):
- Update testimonial text and attributions
- Add new testimonials by duplicating card structure

### Updating UI Components

**Component Library**: Radix UI primitives in `/components/ui/`
- All components use Tailwind for styling
- Consistent color system via CSS variables
- Dark theme support built-in

**Key Components**:
- `<Button>`: Multiple variants (default, outline, destructive, ghost)
- `<Badge>`: For hashtag display
- `<Toaster>`: Notification system (Sonner)
- `<Card>`: Content containers

### Modifying Color Scheme

1. Update Tailwind config ([tailwind.config.ts:28-53](tailwind.config.ts#L28-L53))
2. Update gradient backgrounds ([tailwind.config.ts:102-104](tailwind.config.ts#L102-L104))
3. Test dark theme compatibility

**Current Brand Colors**:
- Primary: `#8B5CF6` (Deep Purple)
- Accent: `#A855F7` (Bright Purple)
- Highlight: `#D946EF` (Electric Purple)
- Secondary: `#C4B5FD` (Lavender)

### Newsletter Integration

**Current**: Resend for notifications only
**To integrate newsletter platform**:

1. Sign up for service (Mailchimp, ConvertKit, Beehiiv, etc.)
2. Get API key and add to `.env`:
   ```
   NEWSLETTER_API_KEY=your_key
   ```
3. Update [app/api/subscribe/route.ts](app/api/subscribe/route.ts):
   ```typescript
   // After line 25, add integration:
   await newsletterService.addSubscriber(email)
   ```

## API Endpoints

### GET /api/articles
Returns all articles sorted by date (newest first).

**Response**:
```json
{
  "articles": [
    {
      "slug": "article-slug",
      "title": "Article Title",
      "excerpt": "Brief description",
      "publishedAt": "2025-11-02",
      "content": "Full markdown content",
      "hashtags": ["react", "nextjs"]
    }
  ]
}
```

### GET /api/articles/[slug]
Returns single article by slug.

**Response**: Same as single article object above, or 404 if not found.

### POST /api/subscribe
Newsletter subscription endpoint.

**Request Body**:
```json
{
  "email": "user@example.com"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Successfully subscribed!"
}
```

**Side Effects**:
- Sends notification email to gmotyl@gmail.com via Resend
- Logs subscription to console

## Environment Variables

Required:
- `RESEND_API_KEY`: For sending email notifications (optional but recommended)

Not required but useful:
- `NEWSLETTER_API_KEY`: For newsletter platform integration (future)
- `DATABASE_URL`: If adding database for subscriber management (future)

## Build & Deploy

### Local Development
```bash
pnpm install
pnpm dev          # http://localhost:3000
```

### Build for Production
```bash
pnpm build        # Creates .next directory
pnpm start        # Serves production build
```

### Deployment
- **Platform**: Vercel (automatic deployments on push to main)
- **Domain**: motyl.dev
- **Config**: [vercel.json](vercel.json) - GitHub integration silent mode

**Vercel Environment Variables**: Add RESEND_API_KEY in dashboard

## Git Workflow

**Main Branch**: `main` (production)
**Recent Commits**:
- 54068c7: Fix redirect loop issue
- 66a61cd: Fix duplicate content - canonical URL enforcement
- df5a143: Google verification token
- 6630135: SEO improvements, sitemap generation

**Commit Pattern**: Conventional commits (`feat:`, `fix:`, `chore:`)

## Performance Considerations

**Current Status**:
- Images unoptimized (consider enabling Next.js image optimization)
- No code splitting beyond Next.js defaults
- Client-side rendering for main pages (consider SSR/SSG where appropriate)

**Optimization Opportunities**:
1. Enable TypeScript strict mode and fix type errors
2. Enable ESLint and address warnings
3. Optimize images with Next.js Image component
4. Add caching headers for articles API
5. Consider ISR (Incremental Static Regeneration) for articles
6. Add loading states and suspense boundaries
7. Implement article pagination (currently 100+ articles load at once)

## Known Issues & TODOs

1. **Newsletter**: Not integrated with actual newsletter platform yet
2. **Type Safety**: TypeScript build errors ignored in production
3. **Image Optimization**: Disabled for simplicity
4. **ESLint**: Disabled during builds
5. **Article Pagination**: All articles load at once (consider lazy loading)
6. **Database**: No persistent storage for subscribers
7. **Analytics**: No analytics tracking implemented
8. **Search**: No article search functionality
9. **RSS Feed**: No RSS/Atom feed for articles
10. **Comments**: No comment system for articles

## Testing

**Current State**: No test suite implemented

**Recommendations**:
- Add Vitest for unit tests
- Add Playwright for E2E tests
- Test critical flows:
  - Newsletter subscription
  - Article filtering
  - Hashtag selection
  - Visited articles tracking

## Accessibility

**Current Implementation**:
- Semantic HTML structure
- Dark theme with high contrast
- Keyboard navigation support (via Radix UI)
- Proper heading hierarchy
- Alt text needed for images

**Improvements Needed**:
- Add ARIA labels where appropriate
- Test with screen readers
- Ensure color contrast meets WCAG AAA
- Add skip navigation link

## Content Strategy

**Articles**:
- 100+ Polish-language tech articles
- Topics: AI, architecture, cloud, frontend, DevOps
- Auto-generated from newsletter content (see `#generated` hashtag)
- Regular cadence of new articles

**Hashtag Categories**:
Common hashtags include: `#ai`, `#architecture`, `#frontend`, `#react`, `#nextjs`, `#typescript`, `#cloud`, `#devops`, `#performance`, `#security`

## Design System Reference

**Typography**:
- Headings: Bold, tight tracking
- Body: Sans-serif, antialiased
- Accent font: Default system font stack

**Spacing Scale**: Tailwind default (4px base unit)

**Breakpoints**:
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1400px (custom container max-width)

**Shadows**: Subtle, purple-tinted for brand consistency

## External Dependencies

**Key Libraries**:
- `next`: 15.2.4 - Framework
- `react`: 19 - UI library
- `tailwindcss`: ^3.4.17 - Styling
- `@radix-ui/*`: Component primitives
- `lucide-react`: Icon library
- `react-hook-form`: Form management
- `zod`: Schema validation
- `gray-matter`: Markdown frontmatter parsing
- `marked`: Markdown parsing
- `resend`: Email service
- `date-fns`: Date utilities
- `sonner`: Toast notifications

**Dev Dependencies**:
- TypeScript 5
- PostCSS 8
- Prettier 3

## Quick Reference Commands

```bash
# Development
pnpm dev                    # Start dev server
pnpm build                  # Production build
pnpm start                  # Start production server
pnpm lint                   # Run ESLint (if enabled)

# File Operations
find articles -name "*.md"  # List all articles
grep -r "#react" articles   # Search articles by hashtag

# Git
git log --oneline -5        # Recent commits
git status                  # Check status
```

## Support & Contact

**Author**: Grzegorz Motyl
**Email**: gmotyl@gmail.com
**Website**: https://motyl.dev
**Twitter**: @motyldev

---

**Last Updated**: 2025-11-02
**Version**: 0.1.0
**Claude Code**: This document was generated to assist AI assistants in understanding and modifying the project efficiently.
