---
title: "Open-Source Claude Design Rival, pnpm 11 Security Defaults, and Eight Weeks Across Two Companies"
excerpt: "Today's daily.dev picks: a local-first open-source design tool that auto-detects your AI CLI, pnpm getting serious about supply chain safety, a self-hosted GitHub dashboard, event-driven architecture done right with AWS EventBridge, and an engineering story about ordering biryani without pausing IPL."
publishedAt: "2026-05-05"
slug: "open-design-pnpm-11-github-dashboard-swiggy-jiohotstar-dailydev"
hashtags: ["#dailydev", "#webdev", "#security", "#architecture", "#tools"]
---

## TLDR

A five-story day from daily.dev. There's an open-source alternative to Claude Design that actually uses your existing AI CLI tools. pnpm 11 ships with supply chain protections on by default, which is long overdue. Someone built a proper self-hosted GitHub dashboard worth bookmarking. There's a solid piece on escaping the distributed monolith trap with event-driven architecture. And Swiggy's team writes up how they embedded food ordering inside JioHotstar in eight weeks across two companies, two tech stacks, and an IPL season's worth of traffic spikes.

---

## Open Design: The Open-Source Claude Design You Actually Control

I keep noticing a pattern where Anthropic ships something interesting and within weeks someone forks the idea with an open-source version. Open Design is that for Claude Artifacts / Claude Design. It's local-first, detects whatever AI CLI you already have on your PATH (Claude Code, Codex, Gemini CLI, Cursor Agent, and more), and uses it as the actual generation engine.

What makes this worth paying attention to is the structured prompt stack. It's not just "ask the AI to make a design." It runs a discovery question form, presents a visual direction picker, tracks progress in a live todo, sandboxes the output in an iframe, and exports to HTML, PDF, PPTX, or ZIP. There are 19 design skills and 72 brand-grade design systems baked in. The anti-slop mechanisms (a five-dimensional self-critique, brand-spec extraction, P0/P1/P2 checklists) suggest someone thought seriously about output quality, not just output speed.

The stack is Next.js 16 plus an Express backend and SQLite, deployable to Vercel, Apache-2.0 licensed. Worth forking just to see how the skill system works.

**Link:** [Open Design on GitHub](https://app.daily.dev/posts/6YZg6FTjN)

---

## pnpm 11 Treats Supply Chain Security as a Default, Not a Plugin

pnpm 11 is out and the headline is that Minimum Release Age is now on by default, blocking newly published packages for 24 hours. That one change alone would have caught a meaningful number of supply chain incidents from the last few years. Exotic subdependencies are also blocked by default now.

There's more in this release worth noting. Native publish commands mean you no longer need the npm CLI lurking around. Built-in SBOM generation in both CycloneDX 1.7 and SPDX 2.3 formats. A SQLite-backed store that makes installs faster. Isolated global installs. The minimum Node.js version jumps to 22.

Looking ahead, pnpm v12 plans to integrate Pacquet, a Rust-based install engine. Benchmarks show warm-cache install times dropping from 2.3 seconds to under one second. That matters a lot in CI where you're running installs constantly.

The security defaults shift is the real story here. Opt-in security is security theater for most projects. Opt-out security actually protects teams that never read the changelog.

**Link:** [pnpm 11 Supply Chain Protection Defaults](https://app.daily.dev/posts/wXGk3vhhU)

---

## A Self-Hosted GitHub Dashboard Worth Running Locally

gh-dashboard is an open-source, self-hosted dashboard that pulls from both GitHub's REST and GraphQL APIs and puts everything in one place: repositories, issues, pull requests, CI runs, traffic analytics, contributors, dependents, and a Kanban board view.

The architecture is straightforward: a Node.js/TypeScript backend handles GitHub OAuth via Device Flow and proxies API calls, paired with a React 19 + Vite frontend. There's optional OpenAI integration for AI-powered daily digest summaries.

If you're managing more than a handful of repos, especially a mix of public and private ones, the GitHub.com interface gets fragmented fast. A local dashboard that you control is genuinely useful. Setup needs a GitHub OAuth App with Device Flow enabled and a Client ID as an environment variable.

**Link:** [gh-dashboard on GitHub](https://app.daily.dev/posts/rOpzvbnMa)

---

## Escaping the Distributed Monolith with AWS EventBridge

This is a well-structured explainer on event-driven architecture that goes beyond the usual "decouple your services" platitudes. The core argument is that most microservice migrations just swap a local monolith for a distributed one because they keep synchronous HTTP calls between services. You haven't gained anything except network latency.

The alternative is choreography: services publish facts, not commands. Using AWS EventBridge as the event bus, each Spring Boot service only knows one endpoint. EventBridge handles routing to any number of consumers. The piece covers the production concerns you actually run into, including event schema versioning (treating events as immutable APIs), idempotency via tracked event IDs inside database transactions, and distributed tracing with OpenTelemetry or AWS X-Ray.

The idempotency section alone is worth reading carefully. At-least-once delivery is the default in most message systems, and getting that wrong leads to subtle bugs that only show up under load.

**Link:** [Event-Driven Architecture with Spring Boot and AWS EventBridge](https://app.daily.dev/posts/vUT2SyVqf)

---

## Swiggy Embedded Food Ordering Inside JioHotstar in Eight Weeks

This is the kind of engineering post-mortem I want to read more of. Swiggy's team describes how they built a food ordering experience embedded inside the JioHotstar streaming app in time for IPL cricket season. Users could order food without leaving the stream.

The technical problems were real. Cross-company authentication meant RSA-encrypted phone number sharing between two separate identity systems with coordinated SMS OTP auto-reading. The split-screen viewport constraint meant fitting six restaurants where two used to show. Different companies, different tech stacks, different deployment cycles.

A few decisions stand out. They built an integration playground before building the actual product, which let them catch contract mismatches early. Two-layer rate limiting with dedicated infrastructure handled the IPL traffic spikes. They used GTM for cross-company analytics but deliberately excluded it from payment pages.

Eight weeks. Two companies. One cricket season's worth of traffic. I find the scope and the timeline more interesting than any single technical choice in here.

**Link:** [Ordering Biryani Without Missing a Six: The Swiggy × JioHotstar Story](https://app.daily.dev/posts/P3qvhxjkh)

---

## Why I Care

The pnpm 11 story and the Open Design story both point at the same thing: the tooling ecosystem is maturing faster than most people realize. Security defaults that used to require careful configuration are shipping as opt-out rather than opt-in. Open-source alternatives to proprietary AI tools are appearing within weeks of the originals. The Swiggy story is a useful reminder that the hardest engineering problems are usually organizational, not technical.
