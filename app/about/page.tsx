import Header from '@/components/header'
import Footer from '@/components/footer'
import NewsletterForm from '@/components/newsletter-form'
import { Code2, Layers, FlaskConical, Wrench } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Me — Grzegorz Motyl | motyl.dev',
  description:
    'Frontend & AI developer, architecture expert, FP advocate, and software craftsman. Learn more about Grzegorz Motyl and what drives motyl.dev.',
}

const EXPERTISE = [
  {
    icon: Layers,
    title: 'Architecture Expert',
    description:
      'Designing scalable, maintainable systems is where I thrive. From micro-frontends to modular monoliths, I focus on clear boundaries, well-defined contracts, and structures that let teams move fast without breaking things.',
    tags: ['System Design', 'Scalability', 'Micro-frontends', 'Domain Modeling'],
  },
  {
    icon: FlaskConical,
    title: 'FP Advocate',
    description:
      'Functional programming changed how I think about code. I use fp-ts daily — composing pipelines with pipe and flow, modeling errors with Either and TaskEither, and eliminating mutation wherever it causes pain.',
    tags: ['fp-ts', 'Immutable Data', 'Function Composition', 'Type-safe Errors'],
  },
  {
    icon: Wrench,
    title: 'Software Craftsman',
    description:
      'I care deeply about code quality: meaningful names, small functions, tests that document intent, and refactoring as a routine discipline — not a project. Good software is built incrementally, with intention.',
    tags: ['TDD', 'Clean Code', 'Refactoring', 'Code Review'],
  },
]

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Grzegorz Motyl',
    url: 'https://motyl.dev/about',
    jobTitle: 'Frontend & AI Developer',
    description:
      'Frontend & AI developer focused on architecture, functional programming, and software craftsmanship.',
    sameAs: ['https://github.com/gmotyl'],
  }

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-1">
        <div className="container max-w-3xl mx-auto px-4 py-12 md:py-16 space-y-14">

          {/* Motyl.dev Platform Description */}
          <section className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Curated trends. Honest takes.
            </h1>
            <p className="text-lg text-foreground/80 leading-relaxed">
              motyl.dev is a place for developers who care about quality. Weekly curated trends in Frontend &amp; AI, practical deep-dives on functional programming and architecture, and real-world perspectives on the tools we build with.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              No ads. No paywalls. No algorithm deciding what you see. Just thoughtful writing and community-voted trends that matter.
            </p>
          </section>

          {/* Expertise Cards */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">What I care about</h2>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
              {EXPERTISE.map(({ icon: Icon, title, description, tags }) => (
                <div
                  key={title}
                  className="rounded-lg border border-border bg-background/50 p-5 space-y-3 hover:border-primary/30 hover:shadow-sm transition-all duration-200"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center justify-center w-9 h-9 rounded-md bg-primary/10 shrink-0">
                      <Icon className="h-4.5 w-4.5 text-primary" aria-hidden="true" />
                    </div>
                    <h3 className="font-semibold text-sm leading-tight">{title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full border border-primary/20 text-primary/70 bg-primary/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* About Grzegorz — less prominent */}
          <section className="space-y-4 pt-4 border-t border-border/50">
            <h2 className="text-lg font-semibold text-foreground/80">About Grzegorz</h2>
            <div className="space-y-3 text-sm text-foreground/70 leading-relaxed">
              <p>
                I&apos;m Greg, a frontend developer with over a decade of experience in TypeScript and React. I care obsessively about architecture, functional programming, and clean code.
              </p>
              <p>
                Outside of coding, I&apos;m a father, occasional runner, and someone who takes coffee quality way too seriously.
              </p>
            </div>
          </section>

          {/* Support / Donation CTA */}
          <section className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-8 md:p-10 space-y-5 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold">Support the work</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Your support helps me keep sharing quality insights without ads or paywalls.
                Every coffee keeps the server running and the ideas flowing.
              </p>
            </div>
            <a
              href="https://www.buymeacoffee.com/motyl.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-amber-500 hover:bg-amber-400 active:scale-95 text-white px-8 py-3.5 text-base font-semibold transition-all duration-200 shadow-lg shadow-amber-500/25 hover:shadow-amber-400/30"
            >
              ☕ Buy Me a Coffee
            </a>
            <p className="text-xs text-muted-foreground pt-1">
              Opens buymeacoffee.com — no account needed
            </p>
          </section>

          {/* Newsletter */}
          <section id="newsletter" className="rounded-lg border border-primary/20 bg-primary/5 p-6 md:p-8 space-y-4 text-center">
            <h2 className="text-xl font-bold">Stay in the loop</h2>
            <p className="text-muted-foreground max-w-sm mx-auto text-sm">
              Get a weekly digest of the top Frontend &amp; AI trends, curated by me. No spam, unsubscribe any time.
            </p>
            <div className="max-w-sm mx-auto">
              <NewsletterForm />
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  )
}
