# Motyl.dev - Personal Tech Blog & Newsletter

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/greg-motyls-projects/v0-frontend-newsletter-landing)
[![Next.js 15](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![React 19](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev)

**Live at: [motyl.dev](https://motyl.dev)**

## About This Project

A personal tech blog and newsletter platform focused on helping developers stay current with modern software engineering trends and practices. Built by [Grzegorz Motyl](https://motyl.dev), a Senior Software Developer and Solution Architect with 20+ years of experience.

### Mission

This blog serves as a curated source for developers who want to:

- **Stay informed** about recent trends in software engineering
- **Master frontend architecture** and modern development patterns
- **Grow professionally** through actionable insights and battle-tested practices
- **Navigate the AI era** with practical guidance on tools and workflows

### Focus Areas

#### 🏗️ **Architecture & System Design**

- Frontend architecture patterns and best practices
- Scalable system design approaches
- Micro-frontend strategies
- Cloud architecture and infrastructure

#### ⚛️ **Frontend Engineering**

- React, Next.js, and modern JavaScript frameworks
- State management and component design
- Performance optimization techniques
- Developer experience (DX) improvements

#### 📈 **Professional Growth**

- Technical leadership and mentorship
- Software craftsmanship principles
- Business-oriented development
- Team collaboration strategies

#### 🤖 **AI & Modern Tools**

- AI-powered development workflows
- Integration of AI tools in daily development
- Emerging technologies and their practical applications
- Tool evaluations and recommendations

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **UI**: React 19, TypeScript, Tailwind CSS
- **Components**: Radix UI primitives
- **Content**: Markdown-based articles
- **Deployment**: Vercel
- **Email**: Resend for newsletter notifications

## Features

- **📰 Newsletter Landing Page**: Subscribe to weekly insights on frontend development and software craftsmanship
- **📚 Article System**: Browse curated tech articles with intelligent hashtag filtering
- **🏷️ Smart Filtering**: Advanced filtering with AND/OR/EXCLUDE modes and "unseen" tracking
- **🎨 Modern Design**: Purple-branded design system with glassmorphism and smooth animations
- **🌙 Dark Theme**: Eye-friendly dark mode by default
- **📱 Responsive**: Mobile-first design that works beautifully on all devices
- **🔍 SEO Optimized**: Dynamic sitemap, robots.txt, and comprehensive metadata

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/motyl-dev.git
cd motyl-dev

# Install dependencies
pnpm install

# Set up environment variables (optional)
cp .env.example .env
# Add your RESEND_API_KEY if you want email notifications

# Start development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the site.

### Build for Production

```bash
pnpm build
pnpm start
```

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── page.tsx           # Landing page
│   ├── articles/          # Articles listing & details
│   └── api/               # API routes (subscribe, articles)
├── articles/              # Markdown articles (content)
├── components/            # React components
│   ├── header.tsx        # Navigation
│   ├── footer.tsx        # Footer
│   ├── newsletter-form.tsx
│   └── ui/               # Radix UI components
├── lib/                   # Utilities and business logic
│   └── articles.ts       # Article management & filtering
└── public/               # Static assets
```

## Content Management

### Adding a New Article

Create a markdown file in the `articles/` directory:

```markdown
---
title: 'Your Article Title'
excerpt: 'A brief description of the article'
publishedAt: '2025-11-02'
slug: 'your-article-slug'
hashtags: '#react #nextjs #architecture'
---

# Your Article Content

Write your article content here using markdown...
```

Articles automatically appear on the `/articles` page, sorted by publication date.

### Supported Hashtags

Common categories: `#ai`, `#architecture`, `#frontend`, `#react`, `#nextjs`, `#typescript`, `#cloud`, `#devops`, `#performance`, `#security`, `#testing`, `#design`

## Configuration

### Environment Variables

```bash
# Optional - for email notifications
RESEND_API_KEY=your_resend_api_key_here
```

### Customization

- **Colors**: Edit [tailwind.config.ts](tailwind.config.ts)
- **Content**: Edit landing page sections in [app/page.tsx](app/page.tsx)
- **Metadata**: Update SEO in [app/layout.tsx](app/layout.tsx)
- **Styling**: Global styles in [app/globals.css](app/globals.css)

## Documentation

For detailed technical documentation, architecture decisions, and development guides, see [CLAUDE.md](CLAUDE.md).

## Deployment

This project is configured for seamless deployment on Vercel:

1. Push to your GitHub repository
2. Import project in Vercel
3. Add environment variables
4. Deploy

Automatic deployments are triggered on every push to the main branch.

## Roadmap

- [ ] Newsletter platform integration (Mailchimp/ConvertKit)
- [ ] Database for subscriber management
- [ ] Article search functionality
- [ ] RSS/Atom feed
- [ ] Comments system
- [ ] Analytics integration
- [ ] Article pagination
- [ ] Related articles recommendations
- [ ] Reading time estimates
- [ ] Code syntax highlighting improvements

## Contributing

This is a personal blog project, but suggestions and bug reports are welcome! Feel free to open an issue.

## Philosophy

> "As aspiring Software Craftsmen, we must raise the bar of professional software development by practicing it and helping others learn the craft."

This blog embodies the principles of software craftsmanship:

- Continuous learning and improvement
- Sharing knowledge generously
- Writing clean, maintainable code
- Building with purpose and integrity

## Connect

- **Website**: [motyl.dev](https://motyl.dev)
- **Twitter**: [@motyldev](https://twitter.com/motyldev)
- **Email**: gmotyl@gmail.com

## License

[MIT License](LICENSE)

---

Built with ❤️ by [Grzegorz Motyl](https://motyl.dev) | Powered by [Next.js](https://nextjs.org) and deployed on [Vercel](https://vercel.com)
