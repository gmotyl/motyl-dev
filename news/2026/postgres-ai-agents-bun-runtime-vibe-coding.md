---
title: "Postgres Best Practices for AI Agents, Bun Runtime Deep Dive, and the Rise of Vibe Coding"
excerpt: "Supabase releases AI-focused Postgres guidelines, a look at Bun's all-in-one JavaScript approach, and how AI coding assistants are enabling developers to replace subscription apps with weekend projects."
publishedAt: "2026-01-23"
slug: "postgres-ai-agents-bun-runtime-vibe-coding"
hashtags: "#dailydev #postgresql #ai #agents #bun #javascript #typescript #productivity #swift #generated #en"
---

## Introducing: Postgres Best Practices for AI Coding Agents

**TLDR:** Supabase released a collection of 30 rules across 8 categories to help AI coding agents write correct, performant Postgres code, following the Agent Skills open standard.

Here's something that perfectly captures where we are in the AI-assisted development era: Supabase isn't just building tools for developers anymore, they're building tools for the AI agents that help developers. Their new Agent Skills for Postgres Best Practices is essentially a rulebook that AI coding assistants can follow.

The collection covers 30 rules across 8 critical categories: query performance, connection management, Row Level Security, schema design, and more. This is smart on multiple levels. First, it addresses a real problem: AI coding assistants are great at generating plausible code but often miss database-specific nuances that can tank performance or create security vulnerabilities.

The use of the Agent Skills open standard is particularly interesting. This suggests a future where we have standardized ways to give AI assistants domain expertise. Instead of hoping the model learned good Postgres practices during training, you can explicitly provide the rules. It's like giving a junior developer a comprehensive style guide, except this junior developer is an LLM.

For architects and teams using AI coding assistants, this should change how you think about AI integration. Don't just turn on Copilot or Claude and hope for the best. Curate the context. Provide explicit rules. The quality of AI-generated code is directly proportional to the quality of guidance you give it.

The categories covered, especially Row Level Security and connection management, are exactly where developers most often make mistakes with Postgres. These aren't syntax errors that fail fast; they're subtle issues that cause problems in production under load.

**Key takeaways:**
- AI coding agents need explicit guidance for database-specific best practices
- The Agent Skills standard provides a structured way to give AI assistants domain expertise
- Areas like RLS, connection pooling, and query performance require specialized knowledge that general-purpose AI models often lack

**Tradeoffs:**
- Standardized AI rules enable consistency but may not cover all edge cases in complex schemas
- Explicit rule enforcement improves code quality but adds another layer to maintain as Postgres evolves

**Link:** [Introducing: Postgres Best Practices](https://app.daily.dev/posts/oIEBoE2RS)

---

## Bun in 100 Seconds

**TLDR:** Bun is an all-in-one JavaScript runtime that aims to replace Node.js, npm, bundlers, testing frameworks, and transpilers with a single, significantly faster tool built on Zig and JavaScriptCore.

The JavaScript ecosystem has a tooling problem. To build a modern application, you need Node.js for runtime, npm or pnpm for packages, TypeScript for types, a bundler like Vite or webpack, a test framework like Jest or Vitest, and probably a few more tools I'm forgetting. Bun's pitch is: what if one tool did all of that?

Built with Zig instead of C++ and using JavaScriptCore instead of V8, Bun takes a different approach than Node.js from the ground up. The architectural choices aren't just for novelty; they enable some impressive performance characteristics. Package installation is dramatically faster. Server startup is nearly instant. TypeScript runs without a separate compilation step.

The built-in capabilities are comprehensive: TypeScript support out of the box, database drivers for SQLite and Redis, an HTTP server, package management, bundling, and a test runner. For many projects, this truly could replace your entire toolchain.

But let's be honest about the tradeoffs. Node.js has a massive ecosystem and battle-tested stability across every possible use case. The npm registry has packages for everything, and they're all tested against Node. Bun compatibility is good and improving, but "almost compatible" can be frustrating when you hit edge cases.

For teams evaluating Bun, the sweet spot might be new projects where you can commit fully to the Bun ecosystem, or internal tools where compatibility with every npm package isn't critical. For existing Node.js applications, the migration path exists but requires testing.

**Key takeaways:**
- Bun consolidates the JavaScript toolchain into a single, fast runtime
- Zig and JavaScriptCore provide performance benefits over the traditional Node.js architecture
- Built-in TypeScript, testing, and bundling eliminate configuration overhead

**Tradeoffs:**
- Unified toolchain simplifies setup but creates vendor lock-in to Bun's ecosystem
- Faster performance and better DX but less mature ecosystem and potential npm compatibility gaps

**Link:** [Bun in 100 Seconds](https://app.daily.dev/posts/ZmCcenhQj)

---

## CTOs on "Claude Code"

**TLDR:** A satirical piece contrasting AI coding assistants with human developers, highlighting AI's tireless work ethic while implicitly questioning the future role of human engineers.

This one's a satirical take that's making the rounds, and while it's meant to be humorous, it touches on real anxieties in the industry. The piece contrasts AI coding assistants with human developers: AI doesn't need meetings, doesn't take vacation, doesn't complain about technical debt, doesn't have workplace conflicts.

The humor works precisely because it captures a certain CTO fantasy of frictionless productivity. No standups, no sprint planning, no performance reviews, just code output. It's a caricature, but caricatures work by exaggerating real tendencies.

Here's what the satire misses, though, and this is worth saying clearly: software development isn't just about producing code. It's about understanding problems, making judgment calls, navigating ambiguity, collaborating with stakeholders, and maintaining systems over years. AI assistants are genuinely transformative tools for accelerating development, but they're tools, not replacements for thinking.

The more interesting question is how the role of developers evolves. We're moving from writing every line to reviewing and directing AI-generated code. That's a skill shift, not a job elimination. The developers who thrive will be those who can effectively collaborate with AI tools, providing the judgment, context, and direction that the tools can't generate themselves.

For teams, this is a moment to invest in understanding these tools deeply rather than either dismissing them or fearing them.

**Key takeaways:**
- The satirical framing reveals real anxieties about AI's impact on software roles
- AI tools excel at code generation but lack judgment, context, and strategic thinking
- The developer role is evolving toward AI collaboration rather than replacement

**Link:** [CTOs on "Claude Code"](https://app.daily.dev/posts/NXb0ibFlj)

---

## Your App Subscription Is Now My Weekend Project

**TLDR:** AI-assisted "vibe coding" is enabling developers to replace paid subscription apps with custom weekend projects, as one developer built three macOS tools to replace $29/month in subscriptions despite no prior Swift experience.

This article might be the most practically significant piece in today's newsletter. Developer Roberto Selbach built three personal tools, a dictation app, a screen recorder, and a Hugo blog editor, to replace $29/month in subscriptions. The kicker: he had no prior macOS or Swift experience.

This is what "vibe coding" looks like in practice. You describe what you want to an AI assistant, iterate on the results, and end up with working software. For personal tools where you're the only user, the bar for "good enough" is much lower than commercial software. You don't need polish, documentation, or edge case handling. You need it to work for your specific workflow.

The economics are fascinating. At $29/month, those subscriptions would cost $348/year. Even valuing weekend time highly, building replacements that work for your specific needs can be economically rational. But more importantly, you end up with tools that do exactly what you want, nothing more, nothing less.

This trend has implications for the SaaS market. The long tail of simple utility apps faces pressure when developers can build bespoke alternatives in a weekend. Apps that survive will need to provide value that's harder to replicate: data syncing across devices, team collaboration, ongoing maintenance and updates, or capabilities that require significant infrastructure.

For developers, this is liberating. That app idea you shelved because learning a new platform seemed daunting? AI assistance changes that calculation dramatically. You can prototype in unfamiliar territory without the steep learning curve.

**Key takeaways:**
- AI-assisted coding lowers the barrier to building personal tools in unfamiliar languages and platforms
- Simple subscription apps are vulnerable to "good enough" weekend replacements
- The value proposition shifts to features that are hard to replicate: sync, collaboration, and ongoing maintenance

**Tradeoffs:**
- Custom tools match your exact workflow but require ongoing maintenance when dependencies update
- Building replaces subscription costs but trades money for time investment

**Link:** [Your App Subscription Is Now My Weekend Project](https://app.daily.dev/posts/VnW9u36zE)

---

*This article was generated from the daily.dev newsletter. The summaries are based on the original content and include editorial commentary and analysis.*