"use client"

import { useEffect, useState } from "react"
import { Code, Zap, Sparkles, Building, Users, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import NewsletterForm from "@/components/newsletter-form"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { db } from "@/lib/db"
import Link from "next/link"

export default function Home() {
  const [latestArticles, setLatestArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      const articles = await db.article.findMany({ take: 3 })
      setLatestArticles(articles)
      setIsLoading(false)
    }

    fetchArticles()
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Elevate Your Craft with <span className="text-primary">Agentic AI</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Join my newsletter where I share insights on Agentic AI, Functional Programming, and Software
                    Craftsmanship from my experience as a Principal Software Developer and Architect.
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-2">
                  <NewsletterForm />
                </div>
                <p className="text-xs text-muted-foreground">
                  No spam. Unsubscribe anytime. I respect your inbox as much as I respect clean code.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-sm overflow-hidden rounded-lg border bg-background/50 backdrop-blur-sm p-6 shadow-lg">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Code className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl">Grzegorz Motyl</h3>
                        <p className="text-sm text-muted-foreground">Principal Software Developer & Architect</p>
                      </div>
                    </div>
                    <div className="space-y-2 pt-2">
                      <p className="text-sm">
                        "As aspiring Software Craftsmen, we must raise the bar of professional software development by
                        practicing it and helping others learn the craft."
                      </p>
                      <div className="flex gap-2 pt-2 flex-wrap">
                        <div className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">Agentic AI</div>
                        <div className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                          Functional Programming
                        </div>
                        <div className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">Craftsmanship</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">About Me</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  I'm Grzegorz Motyl, a Principal Software Developer and Architect focused on the permanent growth of
                  both soft and technical skills with a business-oriented mindset.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <div className="grid gap-4 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-background mx-auto">
                  <Bot className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold">AI Enthusiast</h3>
                <p className="text-muted-foreground">
                  I explore the new possibilities that agentic AI brings to software development and business solutions.
                </p>
              </div>
              <div className="grid gap-4 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-background mx-auto">
                  <Code className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Functional Programming Enthusiast</h3>
                <p className="text-muted-foreground">
                  I explore how functional paradigms lead to more maintainable, testable, and robust software systems.
                </p>
              </div>
              <div className="grid gap-4 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-background mx-auto">
                  <Building className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Software Craftsman</h3>
                <p className="text-muted-foreground">
                  I'm dedicated to raising the bar of professional software development through disciplined practice and
                  mentorship.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="newsletter" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  The Newsletter
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What You'll Learn From Me</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  My newsletter delivers practical insights from years of experience as a Principal Developer and
                  Architect.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <div className="rounded-lg border bg-background/50 backdrop-blur-sm p-6 h-full flex flex-col">
                <Sparkles className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold">Agentic AI in Practice</h3>
                <p className="mt-2 text-muted-foreground">
                  Learn how to leverage agentic AI to build intelligent, autonomous software solutions.
                </p>
                <ul className="mt-4 space-y-2 text-sm flex-grow">
                  <li className="flex items-center">
                    <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></div>
                    Autonomous agent architectures
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></div>
                    AI-powered decision making
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></div>
                    Multi-agent systems
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border bg-background/50 backdrop-blur-sm p-6 h-full flex flex-col">
                <Zap className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold">Functional Programming with AI</h3>
                <p className="mt-2 text-muted-foreground">
                  Discover how functional programming principles enhance AI system development.
                </p>
                <ul className="mt-4 space-y-2 text-sm flex-grow">
                  <li className="flex items-center">
                    <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></div>
                    Immutable data in AI pipelines
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></div>
                    Pure functions & AI predictability
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></div>
                    Composition for complex AI workflows
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border bg-background/50 backdrop-blur-sm p-6 h-full flex flex-col">
                <Users className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold">AI-Enhanced Software Craftsmanship</h3>
                <p className="mt-2 text-muted-foreground">
                  Elevate your development practices with AI-powered techniques that improve code quality.
                </p>
                <ul className="mt-4 space-y-2 text-sm flex-grow">
                  <li className="flex items-center">
                    <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></div>
                    AI-assisted code reviews
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></div>
                    Intelligent refactoring strategies
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></div>
                    AI pair programming techniques
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {!isLoading && latestArticles.length > 0 && (
          <section id="articles" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Latest Articles</h2>
                  <p className="max-w-[700px] text-muted-foreground md:text-xl">
                    Explore my latest thoughts and tutorials on Agentic AI and software development.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
                {latestArticles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/${article.slug}`}
                    className="rounded-lg border bg-background/50 backdrop-blur-sm p-6 transition-all hover:border-primary/50 hover:shadow-md"
                  >
                    <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                    <p className="text-muted-foreground line-clamp-3">{article.excerpt}</p>
                    <p className="text-xs text-muted-foreground mt-4">
                      {new Date(article.createdAt).toLocaleDateString()}
                    </p>
                  </Link>
                ))}
              </div>
              <div className="text-center">
                <Button asChild variant="outline">
                  <Link href="/articles">View All Articles</Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">From Fellow Developers</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Here's what other professionals say about my insights and mentorship.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
              <div className="rounded-lg border bg-background/50 backdrop-blur-sm p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Marta Kowalska</h3>
                    <p className="text-sm text-muted-foreground">Senior Developer at AI Solutions</p>
                  </div>
                </div>
                <p className="mt-4">
                  "Grzegorz's insights on combining Agentic AI with Functional Programming transformed how our team
                  approaches complex business problems. His newsletter provides practical wisdom that you can apply
                  immediately."
                </p>
              </div>
              <div className="rounded-lg border bg-background/50 backdrop-blur-sm p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Jan Nowak</h3>
                    <p className="text-sm text-muted-foreground">Tech Lead at Enterprise Systems</p>
                  </div>
                </div>
                <p className="mt-4">
                  "As someone who values craftsmanship in software, I find Grzegorz's newsletter to be a goldmine of AI
                  architectural patterns and best practices. His business-oriented mindset helps bridge the gap between
                  technical excellence and delivering value."
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-md text-center bg-background/50 backdrop-blur-sm rounded-lg border p-6">
              <h3 className="text-xl font-bold">Join a community of craftsmen dedicated to professional growth</h3>
              <p className="mt-2 text-muted-foreground">
                I share what I've learned from years as a Principal Developer and Architect to help you grow both
                technically and professionally.
              </p>
              <div className="mt-4">
                <a href="#top">
                  <Button size="lg">Subscribe to My Newsletter</Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
