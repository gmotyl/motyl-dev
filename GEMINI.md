# Gemini Code Assistant Context

This document provides context for the Gemini Code Assistant to understand the Motyl.dev project.

## Project Overview

**Motyl.dev** is a personal blog and portfolio website for Grzegorz Motyl, a Senior Software Developer and Solution Architect with over 20 years of experience. The site focuses on frontend development, software craftsmanship, and professional growth. It features articles, a newsletter, and information about Grzegorz's experience.

The project is built with the following technologies:

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with shadcn/ui and Radix UI components
- **Database:** Prisma (for potential future features, as content is currently local)
- **Authentication:** NextAuth.js
- **Testing:** Vitest
- **Deployment:** Vercel
- **Package Manager:** pnpm

The content for the blog is managed as local Markdown files in the `articles` and `news` directories.

## Building and Running

### Development

To run the project in development mode:

```bash
pnpm install
pnpm dev
```

This will start the Next.js development server on `http://localhost:3000`.

### Building for Production

To create a production build:

```bash
pnpm build
```

This will generate an optimized build in the `.next` directory.

### Running in Production

To run the production build locally:

```bash
pnpm start
```

## Testing

To run the test suite:

```bash
pnpm test
```

The project aims to follow a Test-Driven Development (TDD) approach. When fixing bugs, a failing test should be added to demonstrate the bug before applying the fix.

## Development Conventions

- **Code Style:** The project uses Prettier for code formatting. Commits should follow the Conventional Commits specification.
- **Components:** Reusable UI components are located in the `components` directory. shadcn/ui and Radix UI are used for the base component library.
- **Content:** Blog articles are written in Markdown and stored in the `articles` and `news` directories. Frontmatter is used for metadata like title, excerpt, and publication date.
- **PWA:** The application is configured as a Progressive Web App (PWA) with a service worker and manifest file.

### Verification Steps After Refactoring

When performing a refactor, always ensure the following steps are completed:

- **TDD:** If applicable, add a failing test to demonstrate the bug/issue before applying the fix.
- **Verify Tests:** Run `pnpm test --run` to ensure all tests pass.
- **Lint:** Run `pnpm lint` to check for any linting errors.
- **Build:** Run `pnpm build` to ensure the project builds successfully for production.

Important rule: After fix is applied, I stash fix and I expect test to fail without the fix, adjust the test to fail without the fix and pass after stashed fix is re-applied. Confirm test fails without fix, then apply fix and confirm test passes.

## Key Features

- **Articles System:** Articles are stored as Markdown files and parsed at build time. The system supports filtering by hashtags and tracking visited articles.
- **Newsletter System:** A newsletter subscription form is integrated with Resend for email notifications.
- **SEO:** The project has a strong focus on SEO with comprehensive metadata, dynamic sitemap and robots.txt generation, and JSON-LD structured data.
- **Styling:** The project uses a purple-based color scheme with gradient backgrounds and glassmorphism effects.

## Adding a New Article

1.  Create a new Markdown file in the `articles` directory (e.g., `my-new-article.md`).
2.  Add frontmatter to the file:

```yaml
---
'title': 'Your Article Title'
'excerpt': 'Brief description for previews'
'publishedAt': '2025-11-02'
'slug': 'my-new-article'
'hashtags': '#react #nextjs #typescript'
---
# Article content here
```

The article will then automatically appear on the `/articles` page.
