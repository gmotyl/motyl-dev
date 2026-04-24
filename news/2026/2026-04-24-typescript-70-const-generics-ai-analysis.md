---
title: "TypeScript 7.0, const generics i software brain - co warto Wiedzieć"
excerpt: "Przegląd najciekawszych tematów z daily.dev: rewolucyjny TypeScript 7.0 w Go, nieznane funkcje TS, nowa biblioteka drzew React i filozoficzna analiza AI."
publishedAt: "2026-04-24"
slug: "typescript-70-const-generics-ai-analysis"
hashtags: "#dailydev #typescript #react #go #ai #generated #en"
source_pattern: "daily.dev"
---

## TypeScript 7.0 beta: the Go rewrite is here

**TLDR:** TypeScript 7.0 beta wprowadza pełny port kompilatora z TypeScript/JavaScript na Go, co daje około 10x przyspieszenie w porównaniu z wersją 6.0.

The TypeScript team has finally delivered what they've been teasing for months. The new compiler written in Go isn't just a side experiment, it's the real deal. The architecture takes advantage of native Go concurrency with parallel parsing, type-checking, and code generation happening simultaneously rather than sequentially.

For installation, you grab the beta package with `npm install -D @typescript/native-preview@beta` and then run `tsgo` instead of `tsc`. The experience should feel familiar to any TypeScript developer. Breaking changes are significant though, the team dropped deprecated options like `target: es5`, `moduleResolution: node`, and various module formats that nobody was using anyway.

Companies like Bloomberg, Vercel, and VoidZero are already running this in production. That's not a small thing. These organizations have massive TypeScript codebases, and they're trusting the new compiler with real projects. The two-month window to stable release seems aggressive but based on the production adoption, maybe the team knows something we don't.

**Key takeaways:**
- The new Go-based compiler delivers roughly 10x performance improvement over TypeScript 6.0
- Installation via `npm install -D @typescript/native-preview@beta`, run with `tsgo` command
- Breaking changes include removal of `target: es5`, `moduleResolution: node`, and AMD/UMD/SystemJS module formats
- Major companies including Bloomberg, Vercel, and VoidZero are already using it in production

**Why do I care:** This is massive for build times. Every senior developer knows the pain of waiting for TypeScript to compile a large monorepo. If the 10x speedup is real and holds up across real codebases, this changes daily development workflow dramatically. The removal of legacy module formats is also a breath of fresh air, it means less configuration overhead and cleaner project setups.

**Link:** [TypeScript 7.0 beta: the Go rewrite is here](https://app.daily.dev/posts/typescript-7-0-beta-the-go-rewrite-is-here-h5gaovps0)

---

## I Can't Believe This TS Feature Has No Documentation

**TLDR:** TypeScript posiada niez dokumentowaną funkcję zwaną const generics, która automatycznie stosuje semantykę `as const` do wartości przekazywanych do funkcji generycznych.

This feature has been hiding in TypeScript for years without proper documentation, and it's genuinely useful. By adding the `const` keyword before a generic type parameter, you get the strictest possible literal type inference automatically. Without this, callers would need to manually append `as const` to every argument, which is tedious and easy to forget.

The implications for library authors are significant. If you're building a type-safe API where you want to ensure exact literal types are preserved through the call chain, this eliminates boilerplate. Instead of forcing consumers to think about type assertion, the compiler handles it for you at the point of definition.

What's interesting is how this feature emerged organically from the TypeScript team's work on other features. It wasn't a planned addition, it grew out of the existing generics infrastructure and proved useful enough to keep around despite lacking official documentation. This happens more often than people realize in mature language implementations.

**Key takeaways:**
- Const generics automatically apply `as const` semantics to generic type parameters
- Eliminates need for manual `as const` assertions in type-safe APIs
- Feature has existed for years without official documentation
- Particularly valuable for library authors building type-safe abstractions

**Why do I care:** Writing type-safe APIs is something I think about constantly when designing library interfaces. The less I can demand from consumers in terms of correct usage patterns, the better. This undocumented feature lets me enforce literal type preservation at the compiler level rather than relying on documentation and conventions.

**Link:** [I Can't Believe This TS Feature Has No Documentation](https://app.daily.dev/posts/i-can-t-believe-this-ts-feature-has-no-documentation-sq9eyqvu1)

---

## BEWARE SOFTWARE BRAIN

**TLDR:** Nilay Patel wprowadza koncepcję "software brain" - światopoglądu redukującego wszystko do baz danych, algorytmów i automatyzowalnych pętli - i argumentuje, że wyjaśnia to rosnącą przepaść między entuzjazmem branży technologicznej dla AI a powszechną wrogością społeczeństwa.

The piece cuts through the typical tech-industry cheerleading to examine something fundamental about how we think about software and intelligence. Patel observes that when technologists describe AI capabilities, they inevitably frame everything in terms of data structures, algorithms, and optimization loops. This "software brain" perspective treats cognition as fundamentally computational, which makes AI seem more understandable and less threatening.

But here's what's interesting - the public doesn't share this framing. Polling data consistently shows majorities of Americans, especially Gen Z, viewing AI development with skepticism or outright hostility. Patel argues this gap exists because most people intuitively understand that intelligence, creativity, and judgment involve something more than pattern matching and database lookups.

The implications for how we communicate about AI technology are significant. When developers describe AI capabilities using purely computational metaphors, they may be accidentally obscuring real concerns that non-technical people have about these systems. If the industry wants public trust, maybe it needs to engage with the philosophical questions rather than just the technical ones.

**Key takeaways:**
- "Software brain" refers to reducing all cognition to databases, algorithms, and automatable processes
- Tech industry enthusiasm for AI differs sharply from public sentiment, especially among Gen Z
- Computational framing may inadvertently obscure legitimate public concerns about AI
- Building public trust requires engaging philosophical questions, not just technical capabilities

**Why do I care:** As someone who builds software professionally, I recognize this pattern in tech discussions. We often default to purely technical framings because that's our comfortable vocabulary. But if we're going to build tools that society accepts and trusts, we need to understand where non-technical people are coming from, not just explain away their concerns with technical jargon.

**Link:** [BEWARE SOFTWARE BRAIN](https://app.daily.dev/posts/beware-software-brain-yhjv0y3su)

---

## Learn Software System Design

**TLDR:** Darmowy dwugodzinny kurs freeCodeCamp obejmujący projektowanie systemów oprogramowania, od podstawowych koncepcji po gotowość produkcyjną.

This course covers the full spectrum of distributed systems fundamentals. Database theory gets proper treatment with SQL, NoSQL, and Graph databases explained not just in theory but with practical implications for real applications. The scaling discussion addresses both vertical and horizontal approaches, along with the tradeoffs each introduces.

Load balancing and health checks are covered with real architectural patterns rather than abstract theory. The course tackles single points of failure head-on, which is refreshing since these are exactly the things that bite you in production but rarely get addressed in academic treatments. API design spans REST and GraphQL with honest discussion of when each makes sense.

Transport layer details like TCP and UDP get explained in terms of practical application behavior rather than just protocol specifications. Security, authentication, and authorization receive appropriate attention as fundamental concerns rather than afterthoughts. This is the kind of material that usually requires reading multiple books to assemble into coherent understanding.

**Key takeaways:**
- Covers foundational to production-ready distributed systems concepts
- Includes database types (SQL, NoSQL, Graph), scaling strategies, and load balancing
- Addresses single points of failure, API design (REST, GraphQL), and security fundamentals
- Two-hour comprehensive overview consolidates what typically requires multiple resources

**Why do I care:** System design interviews aside, understanding these fundamentals makes me a better architect for any project of meaningful scale. The gap between writing code that works and understanding why systems fail is exactly this kind of knowledge. Even if I'm not actively designing distributed systems, this understanding shapes how I approach component boundaries and data modeling.

**Link:** [Learn Software System Design](https://app.daily.dev/posts/NqCzxBImL)

---

## @pierre/trees - React File Tree Rendering Library

**TLDR:** Biblioteka @pierre/trees to open-source rozwiązanie do renderowania drzew plików w React, oferujące wirtualizację dla dużych drzew, pełną dostępność WCAG 2.1 i wbudowane funkcje git status.

This library addresses a genuinely painful problem in React development. Building file tree components from scratch means dealing with virtualization for performance, keyboard navigation for accessibility, drag-and-drop for usability, and git status indicators for developer tooling. Reimplementing all of this for every project is wasteful.

The automatic virtualization handling tens of thousands of items is the headline feature. This isn't a demo number, it's what you'd need for monorepo structures with hundreds of packages. Built-in keyboard navigation following WCAG 2.1 standards means you get accessibility right without additional effort, which is increasingly non-negotiable in professional applications.

Drag-and-drop file and folder movement with git status indicators brings developer-tool-quality interactions to any React application. Search functionality with multiple modes rounds out the feature set in ways that users expect from modern file browsers. The beta status means there might be rough edges, but the feature completeness suggests this is production-ready for most use cases.

**Key takeaways:**
- React library for rendering file tree components with automatic virtualization
- Built-in keyboard navigation meeting WCAG 2.1 accessibility standards
- Features include drag-and-drop movement, git status indicators, and multi-mode search
- Currently in v1.0.0-beta.3, positioned for production use despite beta status

**Why do I care:** File tree components come up more often than you'd expect in internal tools, documentation viewers, and developer dashboards. Building these well is surprisingly time-consuming. Having a solid foundation that handles the hard parts means I can focus on domain-specific customization rather than reinventing the wheel.

**Link:** [Trees, from Pierre](https://app.daily.dev/posts/yTFPPWiFa)