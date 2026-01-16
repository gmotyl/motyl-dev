---
title: "Frontend Forward London: Next.js 16 Caching, AI Agents in Production, and Performance Economics"
excerpt: "Blazity's London meetup features talks on AI agent architecture from Vercel, Next.js 16 caching changes, and why performance directly drives revenue."
publishedAt: "2026-01-16"
slug: "frontend-forward-london-nextjs-ai-agents"
hashtags: "#frontendforward #frontend #nextjs #ai #agents #performance #vercel #react #generated #en"
---

## Frontend Forward London: February 10 Meetup

**TLDR:** Blazity is hosting a Frontend Forward meetup in London covering three topics: shipping AI agents to production with Vercel's Workflow Development Kit, Next.js 16's new caching paradigm, and the direct connection between performance metrics and revenue.

Next.js 16 changes how caching works. AI agents are moving from demos to production systems. Performance still determines whether users convert or bounce. Three engineers working on these problems daily will explain what's actually changing and what it means for how you build.

---

## You Can Just Ship Agents: Architecting for the Agentic Era

**TLDR:** Dom Sipowicz from Vercel shows how enterprises are moving from AI prototypes to production-ready agent systems using the Vercel AI Cloud and Workflow Development Kit.

Dom Sipowicz, a solutions architect at Vercel, addresses a real gap in the current AI landscape: enterprises have demos, but getting agents into production reliably is a different problem entirely. His talk focuses on building reliable, long-running, and observable agents without reinventing orchestration.

The Vercel AI Cloud and Workflow Development Kit make durability, retries, and human-in-the-loop approvals first-class features of your architecture. This matters because agents that run for extended periods will fail—network issues, external API problems, edge cases in reasoning. The question is whether your system recovers gracefully or requires manual intervention.

For architects, the key insight is that agent systems need the same operational maturity as any production system: observability, retry logic, checkpointing, and approval workflows. The talk argues you can build this with the same patterns used for modern web applications rather than creating bespoke infrastructure.

**Link:** [Frontend Forward: Next.js & AI Agents Meetup](https://blazity.com/event/frontend-forward-london-meetup)

---

## Performance as Revenue Foundation

**TLDR:** Jakub Jabłoński from Blazity presents the case that web performance directly drives revenue, not just user experience, with data connecting frontend metrics to business outcomes.

Jakub Jabłoński, a staff engineer at Blazity with deep Next.js performance expertise, makes the argument that performance is a revenue problem, not a technical problem. The framing matters because it changes who cares and what resources get allocated.

The presentation starts with relatable problems: peak traffic failures during Black Friday, the gap between what Lighthouse tells executives and what real users actually experience, and how most performance issues come from a small subset of dynamic pages. These are the scenarios where engineering teams get urgent Slack messages from leadership.

Blazity is also premiering a whitepaper called "The Revenue Cost of Slow: Why Performance Determines Profitability" at the event. It's a technical analysis with data from ecommerce, SaaS, and media publishing companies connecting page load times to conversion rates, user retention, and revenue.

For teams struggling to get performance prioritized, this kind of business-case framing can be more effective than technical arguments about render times.

---

## Cache Components and Partial Pre-Rendering in Next.js 16

**TLDR:** The new caching paradigm in Next.js 16 changes fundamental assumptions about how applications handle static and dynamic content.

The caching model in Next.js has been a source of confusion and frustration. Next.js 16 brings a new approach with cache components and partial pre-rendering that changes how you think about static versus dynamic content.

The presentation will cover the practical implications: what breaks, what gets easier, and how to migrate existing applications. For teams maintaining Next.js applications, understanding these changes before upgrading is essential.

---

## This Is What Broke Cookie Banners

**TLDR:** Christopher Burns, author of c15t, argues that making consent a first-class part of your stack improves speed and turns compliance into a feature rather than an afterthought.

Cookie banners frustrate users and erode trust. Christopher Burns takes the position that the problem isn't consent itself but how it's typically implemented—bolted on as an afterthought that slows everything down.

The c15t framework focuses on lightweight, performance-first web applications. Making consent first-class gives teams control, improves speed, and reframes compliance as something that can actually benefit users rather than annoy them.

For teams dealing with GDPR, CCPA, and similar regulations, the architecture of consent management matters more than most realize. A poorly implemented consent layer can add significant latency to every page load.

---

## Event Details

**Location:** Nags Head, 10 James St, London WC2E 8BT (Covent Garden, near tube station)

**Date:** February 10, 2026

**Agenda:**
- 6:30 PM - Doors open
- 7:00 PM - Christopher Burns: This Is What Broke Cookie Banners
- 7:45 PM - Dom Sipowicz: You Can Just Ship Agents
- 8:30 PM - Jakub Jabłoński: Cache Components and Partial Pre-Rendering in Next.js 16
- 9:15 PM - Whitepaper premiere
- 9:30 PM - Networking

**Link:** [Frontend Forward: Next.js & AI Agents Meetup](https://blazity.com/event/frontend-forward-london-meetup)

---

*This article was generated from newsletter content. For the original source and to subscribe, visit the links above.*