---
title: "Processing 11 Million Rows in Seconds, Bun's New Markdown Parser, and Building Linters from Production Bugs"
excerpt: "A PHP performance journey from 50k to 1.7M events per second, Bun's built-in Markdown parser with LLM-friendly bundle analysis, and why shipping a transaction bug led to a custom Go linter."
publishedAt: "2026-01-30"
slug: "11-million-rows-bun-markdown-go-linter"
hashtags: "#dailydev #php #bun #go #performance #react #typescript #tailwind #devtools #generated #en"
---

## Once Again Processing 11 Million Rows, Now in Seconds

**TLDR:** A PHP developer optimized a script processing 11 million database events from 50k to 1.7M events per second through incremental changes - combining SQL inserts, moving calculations from MySQL to PHP, eliminating object instantiation, and removing JSON operations.

**Summary:**

Performance optimization stories are some of my favorite content because they show the real, messy process of making things faster. This isn't theoretical - it's a developer staring at 11 million rows and figuring out how to not wait all day.

The journey from 50k to 1.7M events per second didn't happen through one magic fix. It's a series of incremental improvements, each one teaching something about where time actually goes in data processing. Combined SQL inserts reduced database round trips. Moving calculations from MySQL to PHP sounds counterintuitive until you realize PHP can be faster than MySQL for certain operations when you eliminate the query overhead.

The object instantiation insight is particularly valuable. In hot loops processing millions of rows, the cost of creating objects adds up fast. Switching to raw arrays - less elegant, more performant. Sometimes the "right" architectural choice isn't the fast one.

Removing JSON operations is another lesson: serialization and deserialization are expensive. When you're processing millions of records, that cost multiplies unpleasantly. If you can avoid the JSON round-trip, do it.

For architects and teams dealing with batch processing or ETL pipelines, this ten-minute read is a practical guide to where performance typically hides. Profile, measure, and be willing to sacrifice some code elegance for genuine speed improvements.

**Key takeaways:**
- Combined SQL inserts dramatically reduce database round-trip overhead
- PHP can outperform MySQL for calculations when query overhead is eliminated
- Object instantiation costs compound in high-volume loops
- JSON serialization/deserialization adds significant processing time

**Tradeoffs:**
- Raw arrays provide better performance but sacrifice code readability and type safety
- Batching SQL operations improves throughput but increases memory usage

**Link:** [Once again processing 11 million rows, now in seconds](https://app.daily.dev/posts/oqF9cnFsn)

---

## Bun v1.3.8

**TLDR:** Bun introduces a built-in CommonMark-compliant Markdown parser written in Zig with HTML, callback, and React element rendering modes - plus LLM-friendly Markdown visualizations of module graphs for bundle analysis.

**Summary:**

Bun continues its strategy of building everything in Zig and making JavaScript developers' lives easier. This release brings a built-in Markdown parser that's notably not a JavaScript implementation - it's Zig all the way down.

The three rendering modes cover different use cases thoughtfully. HTML output is the standard approach most developers need. Custom callbacks enable terminal rendering and other specialized formatting. React elements let you render Markdown directly into your component tree without string manipulation. That last one is particularly interesting for documentation sites and content-heavy React applications.

But the feature that caught my attention is the `--metafile-md` flag. It generates LLM-friendly Markdown visualizations of your module graphs. Think about that: bundle analysis output specifically designed for AI tools to consume and explain. This is Bun anticipating a workflow where developers ask AI assistants to analyze their bundles.

The CommonMark compliance matters for interoperability - you're getting a spec-compliant parser, not some quirky custom implementation that breaks on edge cases. And being written in Zig means performance characteristics that JavaScript parsers can't match.

For teams using Bun, this eliminates another third-party dependency. For teams not using Bun, this might be another reason to evaluate it.

**Key takeaways:**
- Built-in Markdown parser written in Zig, CommonMark-compliant
- Three rendering modes: HTML, custom callbacks, React elements
- `--metafile-md` generates LLM-friendly bundle analysis
- Continues Bun's strategy of replacing npm dependencies with built-ins

**Link:** [Bun v1.3.8](https://app.daily.dev/posts/MQtYCZarF)

---

## Joly UI - Beautiful React Components

**TLDR:** Joly UI offers accessible React components built on shadcn/ui and Radix UI - fully typed with TypeScript, themeable with Tailwind CSS, and designed for copy-paste integration into React or Next.js projects.

**Summary:**

The shadcn/ui approach of "copy the code, own it yourself" has spawned an ecosystem of component collections, and Joly UI is a solid entry in this space. Built on Radix UI primitives, you get accessibility handled correctly from the start.

What makes these collections valuable isn't the code itself - it's the design decisions already made. Typography scales, color relationships, spacing systems, interaction patterns - someone thought through all of this so you don't have to. You copy the component, customize what needs customizing, and move on.

The TypeScript typing is complete, which matters when you're integrating into a typed codebase. No fighting with ambient declarations or missing types. The Tailwind theming means your existing design tokens integrate naturally.

For teams building products quickly, collections like Joly UI represent days of work you don't have to do. The accessibility built into Radix primitives means you're not shipping inaccessible components by default. Keyboard navigation, screen reader support, focus management - it's all handled.

The copy-paste model has an underappreciated benefit: you understand what you're shipping. There's no black-box component library to debug. The code is right there in your repository.

**Key takeaways:**
- Built on shadcn/ui and Radix UI for accessibility out of the box
- Fully typed TypeScript with Tailwind CSS theming
- Copy-paste model means you own and understand the code
- Accelerates UI development while maintaining customizability

**Link:** [Joly UI - Beautiful React Components](https://app.daily.dev/posts/QIsA9HPrY)

---

## I Shipped a Transaction Bug, So I Built a Linter

**TLDR:** After a production bug where database operations leaked outside transaction boundaries due to using the wrong repository reference, a developer built a custom Go linter using go/analysis to detect this pattern before it ships.

**Summary:**

This is the kind of post-mortem that actually helps other developers. A production bug occurred because code inside a transaction callback accidentally used an outer repository reference instead of the transactional one. The operations looked like they were in the transaction, but they weren't.

The failure mode is subtle and easy to miss in code review. You have a transaction callback, you have repository operations inside it, everything looks correct - except one of those operations is using a variable captured from the outer scope that bypasses the transaction entirely.

Instead of just fixing the bug and moving on, this developer built a linter. Using Go's go/analysis framework, they created a static analysis tool that detects when code inside transaction callbacks references outer repository instances. The bug becomes impossible to ship.

This is exactly the kind of tooling investment that pays dividends. The bug happened once, cost whatever it cost in production, and now it can never happen again. That's the dream of static analysis: encoding your hard-won lessons into automated checks.

For teams writing Go code with database transactions, this pattern and the linter approach are worth studying. Even if you don't use this specific linter, the methodology - "I shipped a bug, so I built a tool to prevent it" - is how you build robust systems over time.

**Key takeaways:**
- Transaction bugs can occur when callbacks reference outer-scope repositories
- Go's go/analysis framework enables custom static analysis tooling
- Encoding post-mortem lessons into linters prevents bug recurrence
- The pattern of building tools from production bugs improves system robustness

**Tradeoffs:**
- Custom linters prevent specific bugs but require maintenance investment
- Stricter static analysis catches errors but may produce false positives

**Link:** [I shipped a transaction bug, so I built a linter](https://app.daily.dev/posts/Lx23O016G)

---

*The summaries above are AI-generated interpretations and may not capture all nuances of the original articles. Always refer to the original sources for complete information.*