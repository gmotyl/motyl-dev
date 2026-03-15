---
issueNumber: 2
week: '2026-w11'
weekLabel: 'Week 11 (Mar 9 – Mar 15, 2026)'
publishedAt: '2026-03-15'
---

# motyl.dev Weekly #2: Week 11 (Mar 9 – Mar 15, 2026)

> A curated digest of what the community found worth reading this week.

This week most intresting link I share is the VIDEO **[How Uber uses AI for development: inside look](https://www.youtube.com/watch?v=i1tZN41VKcE&list=PLzwJJv8h-icjtYA5oHmc7g6qU1t4OqDqb&index=4)** there are more talks in the playlist, I havent watched them all yet ;) so I will get back to my own newsletter to catch up. I remember time when I was attending backend conferences reguallry (over ten years ago) I often found myself feeling like I had already seen it all. The conferences I attended were filled with topics that were already part of my daily work. It was so monotonous that I eventually transitioned to frontend development (where as you know we have new framework every day ;) ). Now, in the era of AI, there's an incredible amount of exciting things happening everywhere. Pragmatic Summit is something I can recommend and even old engineers like me will find tons of interesting content.
There are two articles below regarding claudflare Next.js rewrite that I found very interesting.

- **[hacktron](https://www.hacktron.ai/blog/hacking-cloudflare-vinext)** looks at what the authors call "vibe-hacking." from security point of view, It's a reminder that speed-to-market and security are often in tension.
- **[The Pragmatic Engineer](https://newsletter.pragmaticengineer.com/p/the-pulse-cloudflare-rewrites-nextjs)** loks at it from diffrent angle, It's a great read for anyone interested in the inner workings of Next.js and how Cloudflare is approaching the problem.

Okay enough with the introduction. Let's dive in!

## AI

VIDEO: **[How Uber uses AI for development: inside look](https://www.youtube.com/watch?v=i1tZN41VKcE&list=PLzwJJv8h-icjtYA5oHmc7g6qU1t4OqDqb&index=4)**
Uber pulled the curtain back on their entire AI development stack at the Pragmatic Summit. The numbers are striking: 92% of devs use agents monthly, 31% of code is now AI-authored, and costs have grown 6x since 2024. What makes this valuable is the honesty — they talk about the MCP gateway, the background agent infra called Minion, and what actually went wrong along the way.

**[Amazon's AI coding tools broke production, and now engineers need permission to ship](https://aiadopters.club/p/amazons-ai-coding-tools-broke-production)**
Amazon mandated its internal AI tool Kiro company-wide, tracked adoption like a sales quota, and pushed 80% weekly usage targets. Then an AI agent autonomously deleted and recreated an entire AWS environment in production. The result: senior engineer sign-off is now required on all AI-assisted code changes.

**[From IDEs to AI Agents with Steve Yegge](https://newsletter.pragmaticengineer.com/p/from-ides-to-ai-agents-with-steve)**
Steve Yegge lays out an eight-level framework for AI adoption among engineers and argues the IDE is evolving into a conversation interface for orchestrating agents. His warning about the "Dracula Effect" — that AI-augmented work drains engineers faster than traditional coding — is the kind of insight that only comes from someone shipping with these tools daily at Anthropic.

**[Checking an LLM's work is a systemic, not an individual, problem](https://productpicnic.beehiiv.com/p/checking-an-llm-s-work-is-a-systemic-not-an-individual-problem)**
A sharp argument that code review for AI output can't rely on individual vigilance alone — it needs organizational structures and tooling to work at scale.

## Frontend

**[Linux Foundation Announces the Formation of the React Foundation](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-react-foundation)**
Meta handed React, React Native, and supporting projects to the Linux Foundation under neutral governance. Platinum members include Amazon, Microsoft, Vercel, and Expo. This removes the single-vendor risk that has always lingered over React, though the real test will be whether governance stays lightweight.

**[vinext: Vibe-Hacking Cloudflare's Vibe-Coded Next.js Replacement](https://www.hacktron.ai/blog/hacking-cloudflare-vinext)**
A security deep dive into Cloudflare's new Next.js replacement that found real vulnerabilities through what the authors call "vibe-hacking." A reminder that speed-to-market and security are often in tension.

Here's another article about Cloudflare's Next.js rewrite, but this one focuses on the technical details of how they're handling the rewrite:

**[Cloudflare rewrites Next.js](https://newsletter.pragmaticengineer.com/p/the-pulse-cloudflare-rewrites-nextjs)**
The Pragmatic Engineer covers Cloudflare's decision to rewrite Next.js internals for their platform rather than keep patching around Vercel's assumptions. A significant move that signals the growing tension between framework authors and deployment platforms.

**[Migrating to Workspaces and Nx](https://kentcdodds.com/blog/migrating-to-workspaces-and-nx)**
Kent C. Dodds documents his migration to a monorepo with Nx and npm workspaces, covering the practical tradeoffs and lessons learned. Useful if you're considering consolidating scattered repos.

## Tools

**[Introducing TanStack Intent: Ship Agent Skills with your npm Packages](https://tanstack.com/blog/from-docs-to-agents)**
TanStack Intent lets library authors ship agent-readable skill definitions alongside their npm packages. Instead of relying on docs or RAG, AI agents can discover capabilities directly from package metadata. This could fundamentally change how agents interact with the JavaScript ecosystem.

**[Oxfmt Beta](https://oxc.rs/blog/2026-02-24-oxfmt-beta.html)**
Prettier is de facto the standard for JS/TS formatting, but there are new faster tools on the horizon. The Oxc toolchain's formatter ships its first beta with 100% Prettier conformance for JS/TS, 30x speed improvement, and built-in Tailwind class sorting. The zero-diff migration path is what sets it apart from Biome's 97% compatibility — no one wants to review thousands of formatting changes across a codebase.

**[Announcing TypeScript 6.0 RC](https://devblogs.microsoft.com/typescript/announcing-typescript-6-0-rc/)**
The TypeScript 6.0 release candidate lands with performance improvements and new type-level features that continue pushing the language's type system forward.

## Coding

**[The End of Coding? Wrong Question](https://www.architecture-weekly.com/p/the-end-of-coding-wrong-question)**
Oskar Dudycz argues that people proudly showing off what they "built with Claude" are mostly showcasing PoCs, not production software. He draws parallels to Joel Spolsky's JavaSchools critique: every new abstraction triggers the same panic, and what we need is a mature conversation about restructuring the SDLC, not more hot takes about the death of programming.

**[AI should help us produce better code - Agentic Engineering Patterns](https://simonwillison.net/guides/agentic-engineering-patterns/better-code/)**
Simon Willison's guide to patterns that make AI-assisted coding actually produce better output — not just faster output. Practical and opinionated.

## LLMs

**[Introducing GPT-5.4](https://openai.com/index/introducing-gpt-5-4/)**
OpenAI's latest frontier model ships with a 1M token context window and native computer use. The Pro tier costs $30/$180 per million tokens for input/output — nearly matching Gemini 3.1 Pro Preview's performance at over 3x the price.

**[Gemini 3.1 Flash-Lite](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-flash-lite/)**
Google's response to the pricing war: a lightweight model optimized for cost-sensitive workloads while maintaining competitive quality.

**[Benchmarking the Benchmarks: New GPT and Claude Releases Continue to One-Up Themselves](https://blog.kilo.ai/p/benchmarking-the-benchmarks-new-gpt)**
Opus 4.6 and GPT-5.3-Codex launched minutes apart, followed by Sonnet 4.6 and GPT-5.4 within two weeks. The uncomfortable conclusion: neither lab wins everything. Opus is the "staff engineer" archetype with its 1M context window; GPT-5.4 tops coding and agentic benchmarks but at eye-watering prices. The one-model era is over.

**[Anthropic Turns Claude Code Into a Background Worker](https://the-decoder.com/anthropic-turns-claude-code-into-a-background-worker-with-local-scheduled-tasks/)**
Claude Code can now run as a background agent with local scheduled tasks, pushing the CLI tool further toward autonomous development workflows.

## Other

**[You're Not Paid to Write Code](https://newsletter.techworld-with-milan.com/p/youre-not-paid-to-write-code?ref=motyl-dev)**
A timely reminder that engineering value comes from solving problems, not producing lines of code — especially relevant as AI makes raw code generation trivially cheap.

---

_Curated by [Grzegorz Motyl](https://motyl.dev). [Subscribe for weekly updates.](https://motyl.dev/#newsletter)_
