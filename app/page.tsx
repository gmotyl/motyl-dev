"use client"

import { useEffect, useState } from "react"
import { Code, Zap, Sparkles, Building, Users } from "lucide-react"
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
          {/* Purple gradient background */}
          <div className="absolute inset-0 bg-gradient-purple-soft opacity-30"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Ready to level up your{" "}
                    <span className="text-primary bg-gradient-purple bg-clip-text text-transparent">
                      frontend skills
                    </span>
                    ?
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    You've found the right place. I make mastering modern frontend development practical, engaging, and
                    straightforward. Learn from 20+ years of hands-on experience building scalable applications.
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
                <div className="relative w-full max-w-sm overflow-hidden rounded-lg border border-primary/20 bg-background/50 backdrop-blur-sm p-6 shadow-lg hover:shadow-primary/20 transition-all duration-300">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-gradient-purple flex items-center justify-center shadow-lg">
                        <Code className="h-8 w-8 text-white" />
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
                        <div className="rounded-full bg-primary/20 border border-primary/30 px-3 py-1 text-xs text-primary font-medium">
                          Architecture
                        </div>
                        <div className="rounded-full bg-accent/20 border border-accent/30 px-3 py-1 text-xs text-accent font-medium">
                          Best Practices
                        </div>
                        <div className="rounded-full bg-highlight/20 border border-highlight/30 px-3 py-1 text-xs text-highlight font-medium">
                          Craftsmanship
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-muted relative">
          <div className="absolute inset-0 bg-gradient-purple-soft opacity-10"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">About Me</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  I'm Grzegorz Motyl, a Principal Software Developer and Architect with over 20 years of experience. I
                  focus on continuous growth of both technical and soft skills with a business-oriented mindset.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <div className="grid gap-4 text-center group">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-purple mx-auto shadow-lg group-hover:animate-glow transition-all duration-300">
                  <Building className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">Architecture Expert</h3>
                <p className="text-muted-foreground">
                  I design scalable frontend architectures that grow with your business and stand the test of time.
                </p>
              </div>
              <div className="grid gap-4 text-center group">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-accent to-primary mx-auto shadow-lg group-hover:animate-glow transition-all duration-300">
                  <Code className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold group-hover:text-accent transition-colors">
                  Functional Programming Advocate
                </h3>
                <p className="text-muted-foreground">
                  I explore how functional paradigms lead to more maintainable, testable, and robust frontend systems.
                </p>
              </div>
              <div className="grid gap-4 text-center group">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-highlight to-accent mx-auto shadow-lg group-hover:animate-glow transition-all duration-300">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold group-hover:text-highlight transition-colors">Software Craftsman</h3>
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
                <div className="inline-block rounded-lg bg-gradient-purple px-4 py-2 text-sm text-white font-medium shadow-lg">
                  The Newsletter
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What You'll Learn From Me</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  My newsletter delivers practical insights from over 20 years of building production applications as a
                  Principal Developer and Architect.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <div className="rounded-lg border border-primary/20 bg-background/50 backdrop-blur-sm p-6 h-full flex flex-col hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group">
                <div className="h-12 w-12 rounded-lg bg-gradient-purple flex items-center justify-center mb-4 group-hover:animate-glow">
                  <Building className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-primary">Frontend Architecture</h3>
                <p className="mt-2 text-muted-foreground">
                  Learn how to design scalable, maintainable frontend architectures that evolve with your product.
                </p>
                <ul className="mt-4 space-y-2 text-sm flex-grow">
                  <li className="flex items-center">
                    <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></div>
                    Component design patterns
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></div>
                    State management strategies
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></div>
                    Micro-frontend approaches
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border border-accent/20 bg-background/50 backdrop-blur-sm p-6 h-full flex flex-col hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 group">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center mb-4 group-hover:animate-glow">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-accent">Modern Development Practices</h3>
                <p className="mt-2 text-muted-foreground">
                  Discover battle-tested techniques that make your code more reliable and your team more productive.
                </p>
                <ul className="mt-4 space-y-2 text-sm flex-grow">
                  <li className="flex items-center">
                    <div className="mr-2 h-1.5 w-1.5 rounded-full bg-accent"></div>
                    Testing strategies that work
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-1.5 w-1.5 rounded-full bg-accent"></div>
                    Performance optimization
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-1.5 w-1.5 rounded-full bg-accent"></div>
                    Code review best practices
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border border-highlight/20 bg-background/50 backdrop-blur-sm p-6 h-full flex flex-col hover:border-highlight/40 hover:shadow-lg hover:shadow-highlight/10 transition-all duration-300 group">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-highlight to-accent flex items-center justify-center mb-4 group-hover:animate-glow">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-highlight">Professional Growth</h3>
                <p className="mt-2 text-muted-foreground">
                  Advance your career with insights on technical leadership and building software that delivers business
                  value.
                </p>
                <ul className="mt-4 space-y-2 text-sm flex-grow">
                  <li className="flex items-center">
                    <div className="mr-2 h-1.5 w-1.5 rounded-full bg-highlight"></div>
                    Technical leadership skills
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-1.5 w-1.5 rounded-full bg-highlight"></div>
                    Business-oriented development
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-1.5 w-1.5 rounded-full bg-highlight"></div>
                    Team collaboration strategies
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {!isLoading && latestArticles.length > 0 && (
          <section id="articles" className="w-full py-12 md:py-24 lg:py-32 bg-muted relative">
            <div className="absolute inset-0 bg-gradient-purple-soft opacity-10"></div>
            <div className="container px-4 md:px-6 relative z-10">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Latest Articles</h2>
                  <p className="max-w-[700px] text-muted-foreground md:text-xl">
                    Explore my latest thoughts and tutorials on frontend development and software craftsmanship.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
                {latestArticles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/${article.slug}`}
                    className="rounded-lg border border-primary/20 bg-background/50 backdrop-blur-sm p-6 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 hover:scale-105 duration-300"
                  >
                    <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">{article.title}</h3>
                    <p className="text-muted-foreground line-clamp-3">{article.excerpt}</p>
                    <p className="text-xs text-primary/70 mt-4 font-medium">
                      {new Date(article.createdAt).toLocaleDateString()}
                    </p>
                  </Link>
                ))}
              </div>
              <div className="text-center">
                <Button
                  asChild
                  variant="outline"
                  className="border-primary/30 hover:bg-primary/10 hover:border-primary/50"
                >
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
              <div className="rounded-lg border border-accent/20 bg-background/50 backdrop-blur-sm p-6 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold">Marta Kowalska</h3>
                    <p className="text-sm text-muted-foreground">Senior Frontend Developer at TechCorp</p>
                  </div>
                </div>
                <p className="mt-4">
                  "Grzegorz's insights on frontend architecture transformed how our team approaches complex
                  applications. His newsletter provides practical wisdom that you can apply immediately to real
                  projects."
                </p>
              </div>
              <div className="rounded-lg border border-highlight/20 bg-background/50 backdrop-blur-sm p-6 hover:border-highlight/40 hover:shadow-lg hover:shadow-highlight/10 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-highlight to-accent flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold">Jan Nowak</h3>
                    <p className="text-sm text-muted-foreground">Tech Lead at Enterprise Systems</p>
                  </div>
                </div>
                <p className="mt-4">
                  "As someone who values craftsmanship in software, I find Grzegorz's newsletter to be a goldmine of
                  architectural patterns and best practices. His business-oriented mindset helps bridge the gap between
                  technical excellence and delivering value."
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-md text-center bg-gradient-purple-soft backdrop-blur-sm rounded-lg border border-primary/30 p-6 hover:border-primary/50 transition-all duration-300">
              <h3 className="text-xl font-bold">Join a community of craftsmen dedicated to professional growth</h3>
              <p className="mt-2 text-muted-foreground">
                I share what I've learned from over 20 years as a Principal Developer and Architect to help you grow
                both technically and professionally.
              </p>
              <div className="mt-4">
                <a href="#top">
                  <Button
                    size="lg"
                    className="bg-gradient-purple hover:opacity-90 text-white shadow-lg hover:shadow-primary/30 transition-all duration-300"
                  >
                    Subscribe to My Newsletter
                  </Button>
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
