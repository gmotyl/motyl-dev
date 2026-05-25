---
title: "TanStack Query Deep Dive, AI CSS Linting, and Why Claude Shouldn't Be Your Architect"
excerpt: "Three stories from the frontend world: mastering TanStack Query patterns at scale, automating Tailwind cleanup after AI-generated code, and a sharp take on why AI agents make terrible software architects."
publishedAt: "2026-05-25"
slug: "tanstack-query-ai-css-linting-claude-not-architect"
hashtags: "#dailydev #frontend #webdev #react #typescript #css #ai #architecture #generated #en"
source_pattern: "daily.dev"
---

## A Gentle Introduction to TanStack Query

**TLDR:** This article walks through the real problems that TanStack Query solves, starting from the pain of manual data fetching with useState and useEffect, and builds all the way up to patterns you'd actually use in a production-scale React app. It covers caching, query keys, retries, cancellation, and strategies for organizing queries across a large codebase.

**Summary:** If you've spent any time wrestling with data fetching in React, you know the dance. You write a useEffect, set some loading state, catch an error, then six months later you have a dozen slightly different versions of that same pattern scattered across your codebase. TanStack Query doesn't just give you a nicer API, it reframes the problem entirely around a shared cache, and once that clicks, you start seeing your whole data layer differently.

The article does a great job building up from first principles. It starts with the raw useState and useEffect approach, shows exactly where it breaks down, and then introduces TanStack Query's abstraction piece by piece. The shared cache concept is the foundation everything else rests on. Query keys act as cache identifiers, and understanding how they work is the difference between a smooth experience and mysterious stale data bugs.

What I found genuinely useful is the coverage of the less-obvious features. Retries with exponential backoff are on by default, which is great, but knowing you can tie into AbortSignal for request cancellation is the kind of thing that saves you in production when users navigate away mid-request. The enabled flag and skipToken for conditional queries are also covered, which is something a lot of tutorials gloss over even though it comes up constantly in real apps.

The scaling section is where the article earns its place. The recommendation to use queryOptions functions over custom hooks, organizing queries into domain-grouped files, and even integrating OpenAPI code generation with Orval, these are the patterns that make TanStack Query work well at team scale rather than just personal project scale. The point about batching invalidations to prevent UI flicker during optimistic updates is the kind of hard-won lesson that usually lives only in Slack threads and pull request comments.

**Key takeaways:**
- The shared cache is the mental model that unlocks everything else in TanStack Query; query keys are how you control it
- Features like exponential backoff retries and AbortSignal cancellation are built in and worth understanding explicitly, not just benefiting from accidentally
- At scale, queryOptions functions over custom hooks, plus domain-grouped query files, keep things maintainable across large teams

**Why do I care:** TanStack Query has become the default answer to data fetching in React, but I see teams using it at 20% capacity because they learned just enough to get it working. The difference between someone who knows the basics and someone who understands staleTime versus gcTime, or when to reach for useInfiniteQuery versus a manual pagination approach, is real, measurable productivity. This article is the kind of thing I'd link a new team member to on day two.

**Link:** [A gentle introduction to TanStack Query](https://app.daily.dev/posts/E5yjmxKK9)

---

## Cleaning Up "Dirty" AI-Generated CSS: Why I Built My Own Autonomous Tailwind Linter

**TLDR:** AI tools regularly spit out Tailwind CSS with hardcoded pixel values and arbitrary hex colors that have nothing to do with your design system. The author got tired of it and built aura-lint, an open-source, zero-dependency linter that auto-fixes these issues without burning more AI tokens.

**Summary:** There's a specific kind of frustration that comes from using AI to generate UI components and then spending twenty minutes cleaning up the output. The AI doesn't know your design system. It reaches for p-[16px] and color: #3B82F6 because those are specific, confident answers, and confidence is what these models optimize for. The result is technically functional code that doesn't actually fit your project.

Aura-lint attacks this at the source. It converts pixel values to Tailwind's four-point grid system automatically, so p-[16px] becomes p-4, and it maps hex colors to design token names based on a configuration file. The zero-dependency angle matters because tool sprawl in frontend projects is real, and anything that doesn't require a lengthy install chain is more likely to actually get used.

What I appreciate about this approach is that it's an autonomous fix rather than a report. A lot of linters will tell you what's wrong and then leave you to fix it. Aura-lint makes the change. You could wire this into a pre-commit hook and just stop thinking about it. The custom plugin system via an auralint.json config file means teams can extend it with their own rules, which is how you actually get tool adoption beyond the person who built it.

The broader pattern here is interesting. As AI-generated code becomes a larger share of what gets merged, we need tooling that specifically targets the failure modes of AI output, not just the failure modes of human developers. This is an early example of that, and it's the kind of tooling investment that compounds over time.

**Key takeaways:**
- AI-generated Tailwind CSS consistently breaks design system constraints with hardcoded values; aura-lint auto-fixes these rather than just reporting them
- Zero dependencies and a simple config file lower the barrier to team adoption significantly
- Wiring this kind of autonomous fixer into a pre-commit hook removes a whole category of review feedback that doesn't need human attention

**Why do I care:** Every team using AI for UI generation has this problem. The code works but it doesn't fit. Reviewing AI-generated CSS for design token compliance is exactly the kind of tedious work that should be automated, and this tool points in the right direction. The fact that it's extensible with custom rules means you can tune it to your actual design system rather than a generic Tailwind convention.

**Link:** [Cleaning Up "Dirty" AI-Generated CSS: Why I Built My Own Autonomous Tailwind Linter](https://app.daily.dev/posts/wDLEafQ69)

---

## Claude Is Not Your Architect. Stop Letting It Pretend.

**TLDR:** A senior engineer makes a pointed argument that AI coding assistants are being misused when they're asked to design software architecture. AI agents are agreeable, lack organizational context, and produce generic solutions, and when they're in the driver's seat, experienced engineers get demoted to ticket implementers while accountability disappears.

**Summary:** This one landed with me. The core observation is that AI agents like Claude are pathologically agreeable. Ask one to design your system architecture and it will produce something that sounds reasonable, cites recognizable patterns, and avoids the messy debates that actually produce good architecture. That agreeableness is exactly the problem. Good architecture comes from people who push back, who know why the last approach failed, who understand the team's actual constraints.

The author describes what they call the "attaboy problem" and the "Jenga tower" dynamic, where AI-designed systems look structurally sound until someone with organizational memory points out that this component has historically been a nightmare to scale, or that the team doesn't have the skills to maintain this dependency, or that this decision conflicts with a commitment made two years ago. AI has none of that context. It produces best-practice generic solutions for a fictional average company.

The Jira ticket pipeline section is where the argument gets uncomfortable, because it describes something I've seen. When the AI designs the architecture and breaks it into tickets, and then engineers implement those tickets, the person with the most influence over the system has zero accountability. Something goes wrong, and there's no one whose name is on the decision. The author is clear: that's not a minor process concern, it's a structural failure in how responsibility gets distributed.

The recommended correction is simple to state but genuinely hard to do. Engineers design, agents implement. Human architects own the debate process, including the parts where people disagree and someone has to make a call they'll be accountable for. The craft of architecture isn't producing a diagram, it's knowing which trade-offs are acceptable for this specific team in this specific situation, and AI can't know that.

**Key takeaways:**
- AI agents produce generic architectures optimized for an average fictional company, not your specific team's constraints and history
- When AI designs and humans implement, accountability disappears from the system entirely, which is a structural problem not just a process one
- The right model is engineers designing and debating, with AI as an implementation tool, not a decision-maker

**Why do I care:** I've watched teams gradually let AI take over more and more architectural decisions because it's faster and avoids the friction of debate. The friction is the point. The debate is where you surface the assumptions that will bite you in eighteen months. Handing that to an AI because it's efficient is a short-term optimization with a long-term cost that shows up exactly when you can least afford it.

**Link:** [Claude Is Not Your Architect. Stop Letting It Pretend.](https://app.daily.dev/posts/gmyGx62wi)
