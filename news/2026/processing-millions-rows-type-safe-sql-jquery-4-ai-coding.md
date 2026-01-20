---
title: "Processing Millions of Rows, Type-Safe SQL, jQuery 4.0, and AI Coding Reality Check"
excerpt: "From optimizing analytics to process 14,000 events per second, to Kysely's type-safe SQL, jQuery's major comeback, Shadcn's overcomplexity debate, and a sobering look at AI coding tools."
publishedAt: "2026-01-20"
slug: "processing-millions-rows-type-safe-sql-jquery-4-ai-coding"
hashtags: "#dailydev #frontend #backend #typescript #performance #database #jquery #shadcn #ai #react-native #spring-boot #generated #en"
---

## Processing 11 Million Rows in Minutes Instead of Hours

**TLDR:** A developer transformed their blog analytics from processing 30 events per second to 14,000 by systematically eliminating common performance bottlenecks. The fixes ranged from obvious optimizations to deep framework-level changes that most developers overlook.

**Summary:**

This is the kind of war story that makes you question every assumption about your own codebase. A developer faced the task of processing 11 million analytics events and discovered their system was crawling at a pathetic 30 events per second. Through methodical investigation and a willingness to challenge conventional wisdom, they achieved a 466x performance improvement.

The optimizations read like a checklist of "things we tell ourselves don't matter that much." First, they removed unnecessary database sorting—a classic case of the ORM adding operations you never explicitly requested. Then came the revelation about nested loops: reversing the loop order dramatically reduced iterations. It's the kind of optimization that seems obvious in hindsight but hides in plain sight during development.

But here's where it gets interesting: they ditched the ORM entirely for raw queries. ORMs provide convenience and safety, but that abstraction has a cost. When you're processing millions of rows, those milliseconds of overhead compound into hours. Similarly, replacing closures with while loops—a micro-optimization that most tutorials would dismiss—yielded measurable gains at scale.

The framework-level fixes reveal something architects need to internalize: your tools make assumptions about your use case. When those assumptions don't match reality, performance suffers. The article doesn't just list fixes; it demonstrates the mindset required to find them.

For teams dealing with batch processing or analytics workloads, this is essential reading. It challenges the comfortable notion that "the framework handles it" and reminds us that understanding what happens beneath our abstractions remains a critical skill.

**Key takeaways:**
- Database sorting operations you didn't request can hide in ORM queries
- Loop order matters significantly at scale—analyze your actual iteration patterns
- Raw SQL outperforms ORMs for high-volume batch operations
- Micro-optimizations like avoiding closures compound when processing millions of records
- Framework defaults optimize for common cases, not necessarily your case

**Tradeoffs:**
- Gain raw performance but sacrifice ORM's type safety and maintainability
- Raw queries are faster but require more careful testing and migration handling
- While loops may be faster but closures offer better code organization and scope management

**Link:** [Processing 11 million rows in minutes instead of hours](https://app.daily.dev/posts/JGaGDggzi)

---

## Kysely: Type-Safe SQL Without ORM Overhead

**TLDR:** Kysely is a TypeScript SQL query builder that delivers compile-time type checking for database operations without the complexity and performance overhead of a full ORM. It catches typos and type mismatches before your code ever runs.

**Summary:**

The debate between ORMs and raw SQL has a new contender that refuses to pick a side. Kysely positions itself as a query builder that gives you the type safety developers crave without wrapping your database in layers of abstraction that hide what's actually happening.

The core value proposition is elegant: write SQL-like queries in TypeScript, and the compiler catches mistakes before runtime. Mistype a column name? Compilation error. Return a string where you expected a number? The type system screams at you. This is the kind of safety net that prevents entire categories of bugs from reaching production.

What makes Kysely interesting is its philosophical stance on abstraction. Full ORMs like Prisma or TypeORM create their own query languages and concepts—entities, relations, migrations, and hooks. Kysely stays closer to SQL itself, using readable method chaining that any developer familiar with SQL can understand immediately. You're not learning a new paradigm; you're writing SQL with guardrails.

For architects evaluating database tooling, this represents a meaningful middle ground. Teams can maintain direct control over their queries—essential for performance tuning and complex operations—while still benefiting from TypeScript's ability to catch errors at compile time. The thin abstraction means fewer surprises when you need to debug performance issues or write that one complex query your ORM can't express.

The trade-off is clear: you give up some of the convenience features ORMs provide—automatic migrations, relation handling, and the illusion that you're not dealing with a database. What you get is predictability and transparency.

**Key takeaways:**
- Compile-time type checking catches column name typos and type mismatches before runtime
- Stays close to SQL syntax, making queries readable for SQL-familiar developers
- Thinner abstraction than full ORMs means easier debugging and performance optimization
- TypeScript inference handles return types without manual annotations

**Tradeoffs:**
- Gain SQL-level control and type safety but sacrifice ORM conveniences like automatic migrations
- Transparent abstraction enables debugging but requires more SQL knowledge from the team
- Compile-time safety catches errors early but requires stricter development discipline

**Link:** [Kysely: Type-Safe SQL Without ORM Overhead](https://app.daily.dev/posts/jBJyZRFQY)

---

## jQuery 4.0 Released, First Major Version Since 2016

**TLDR:** jQuery 4.0 drops Internet Explorer support, adopts ES modules, and reduces its size by over 3kb. After nearly a decade, the library that defined frontend development is modernizing for a world that arguably moved on.

**Summary:**

There's something almost nostalgic about a jQuery release in 2026. This library shaped how an entire generation thinks about DOM manipulation, event handling, and AJAX. And now, nearly ten years after version 3.0, we have jQuery 4.0—leaner, meaner, and finally free from the shackles of Internet Explorer.

The headline change is dropping IE10 and older browser support. This isn't just symbolic; it enables real improvements. The library can now use modern JavaScript features natively instead of polyfilling them, which contributes to the 3kb size reduction. In an era of JavaScript bundle anxiety, every kilobyte matters.

ES modules adoption is the modernization story. jQuery can now integrate with standard JavaScript tooling—tree-shaking, proper imports, and better build system compatibility. It's the library acknowledging that the ecosystem evolved around it.

The breaking changes reveal careful stewardship. APIs with native browser equivalents have been removed, which is honest housekeeping. Focus and blur events now align with W3C specifications, fixing long-standing behavior quirks. These are the unglamorous changes that make library maintenance sustainable.

Here's the thing architects need to consider: jQuery still powers an enormous portion of the web. Legacy systems, WordPress sites, enterprise applications—jQuery isn't going anywhere soon. This release ensures those systems can continue receiving security updates and bug fixes on a modern foundation. For teams maintaining jQuery codebases, version 4.0 offers a path forward without demanding a complete rewrite.

Is jQuery the right choice for new projects in 2026? Probably not. But that's not really the point. jQuery 4.0 is about responsible stewardship of infrastructure that millions of sites depend on.

**Key takeaways:**
- Drops Internet Explorer 10 and legacy browser support entirely
- Adopts ES modules for modern build system compatibility
- Library size reduced by over 3kb through removing legacy code
- Breaking changes include removal of APIs with native browser equivalents
- Focus/blur events realigned with W3C specifications

**Tradeoffs:**
- Gain modern JavaScript features and smaller bundle but lose IE10 compatibility
- ES modules enable tree-shaking but may require build pipeline updates
- Removing deprecated APIs improves maintainability but breaks existing code relying on them

**Link:** [jQuery 4.0 released, first major version since 2016](https://app.daily.dev/posts/dThF1vPz2)

---

## The Incredible Overcomplexity of the Shadcn Radio Button

**TLDR:** A developer examined how Shadcn and Radix implement radio buttons and found hundreds of lines of React code, multiple dependencies, and several kilobytes of JavaScript to recreate what HTML provides natively in a few lines.

**Summary:**

This article is going to make some people uncomfortable, and that's exactly why you should read it. The author dissects a simple UI pattern—radio buttons—and reveals the staggering complexity modern component libraries introduce to solve problems that barely exist.

Shadcn and Radix rebuild radio buttons from scratch using button elements with ARIA attributes instead of native HTML inputs. This requires React code, state management, keyboard handling, focus management, and accessibility attributes that browsers provide automatically with native elements. The result? Multiple dependencies, hundreds of lines of code, and several kilobytes of JavaScript.

The uncomfortable question lurking beneath this analysis: are we solving real problems or creating full employment for React developers? Native HTML radio buttons are accessible by default. They handle keyboard navigation. They work without JavaScript. They're battle-tested across every browser combination imaginable.

The counter-argument, which the article addresses, is that these libraries provide consistency and customization. Fair enough. But there's a hidden cost in complexity—more code means more potential bugs, more bundle size, and more cognitive overhead for developers. When your radio button implementation requires understanding Radix primitives, React state, and custom ARIA patterns, something has gone sideways.

For architects and team leads, this is a calibration moment. Component libraries offer real value for complex UI patterns—modals, dropdowns, date pickers. But applying the same heavyweight approach to elements that HTML handles elegantly is architectural malpractice. Sometimes the best component is no component at all.

**Key takeaways:**
- Modern UI libraries rebuild native HTML elements with significant additional complexity
- Native radio buttons provide accessibility, keyboard navigation, and cross-browser support automatically
- Shadcn/Radix radio buttons require multiple dependencies and hundreds of lines of React code
- The customization benefits must be weighed against complexity and bundle size costs

**Tradeoffs:**
- Component libraries offer visual consistency but sacrifice simplicity and native browser optimization
- Custom implementations enable precise styling but add maintenance burden and potential accessibility gaps
- Abstraction layers provide developer convenience but hide behavior that teams need to understand

**Link:** [The Incredible Overcomplexity of the Shadcn Radio Button](https://app.daily.dev/posts/cuZVekEgv)

---

## I Actually Tried AI Coding and It's Worse Than I Thought

**TLDR:** A developer spent two days testing OpenAI's Codex agent and GPT-5 by building a gym management app from scratch. The AI handled backend scaffolding well but produced poor-quality React Native code requiring extensive manual intervention.

**Summary:**

Hype cycles need reality checks, and this article delivers one for AI coding tools. A developer committed to actually using OpenAI's latest—Codex agent and GPT-5—to build a real application: a Brazilian jiu-jitsu gym management system. The results are illuminating and frustrating in equal measure.

The good news: AI successfully scaffolded a Spring Boot backend with minimal issues. For boilerplate generation and standard patterns, the tools delivered. This confirms what many developers have observed—AI excels at repetitive, well-documented tasks where the pattern is clear.

The bad news: React Native code quality was poor enough to require extensive rework. This is the part that should concern anyone betting their productivity on AI coding assistants. Frontend development involves nuanced decisions about component structure, state management, styling approaches, and user experience details that current AI struggles to navigate. The AI made choices, but they weren't good choices.

Here's what the article doesn't say directly but clearly implies: AI coding tools are amplifiers, not replacements. They amplify the productivity of developers who can recognize quality code and correct mistakes quickly. For inexperienced developers, these tools might amplify bad habits and technical debt just as effectively.

The two-day experiment timeline is significant. That's enough time to push past the initial "wow, it generated something" phase into the grinding reality of making that something actually work. Teams evaluating AI tools should adopt similar extended testing approaches rather than relying on demo impressions.

For architects setting tool policies, the takeaway is nuanced. AI assistants have legitimate value for specific tasks—scaffolding, boilerplate, documentation, test generation. But positioning them as replacements for developer judgment invites disappointment.

**Key takeaways:**
- AI tools excel at scaffolding and boilerplate generation for well-documented patterns
- Complex frontend code with nuanced decisions remains challenging for current AI
- Extensive manual intervention was required to make AI-generated React Native code usable
- Extended testing reveals limitations that brief demos conceal

**Tradeoffs:**
- AI tools accelerate boilerplate generation but require experienced developers to validate output
- Automation reduces initial development time but may increase debugging and refactoring time
- Lower barriers to scaffolding enable faster starts but risk accumulating technical debt from poor AI decisions

**Link:** [I actually tried AI coding and it's worse than I thought](https://app.daily.dev/posts/DdiXGTqPN)

---

*This article was automatically generated from the daily.dev newsletter. The summaries reflect the key insights from each featured article while providing additional context for practical application.*