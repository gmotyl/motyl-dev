---
title: "Daily.dev Weekly: Toast Libraries, Vue Skills, Query Patterns, AI & Open Source, and the Future of Agent Tools"
excerpt: "A curated selection of frontend and architecture insights from daily.dev covering React toast notifications, Vue ecosystem AI skills, TanStack Query patterns, the impact of AI on open source, and the evolution of AI agent tooling."
publishedAt: "2026-02-24"
slug: "dailydev-weekly-toast-vue-query-ai-agents"
hashtags: "#dailydev #frontend #webdev #react #vue #ai #architecture #open-source #agents #generated #en"
---

## Goey-Toast: Morphing Blob Toast Notifications

**TLDR:** Goey-toast is a React library that brings delight to notifications through organic blob animations, built on framer-motion, with promise tracking and full customization capabilities out of the box.

**Summary:**

User feedback and toast notifications are the bread and butter of modern web applications, yet they're often overlooked as an opportunity for meaningful design. Goey-toast takes a fresh approach by combining blob morphing animations with practical notification functionality. The library uses framer-motion under the hood to deliver smooth, organic animations that feel natural rather than jarring.

From an implementation perspective, goey-toast keeps things simple: you wrap your application with the GoeyToaster provider and call goeyToast from anywhere to trigger notifications. This contextual access pattern is elegant because it avoids the typical prop-drilling nightmare that plagues notification systems. The library handles promise tracking natively, meaning you can show loading states, success states, and error states without additional orchestration logic.

What makes goey-toast interesting from an architectural standpoint is how it prioritizes developer experience without sacrificing visual polish. Teams adopting this library get customization hooks that allow fine-tuning colors, animations, and positioning while maintaining sensible defaults. The promise-tracking feature is particularly valuable in modern async workflows where you're juggling multiple API calls and need feedback mechanisms that don't require manual state management.

**Key takeaways:**

- Blob morphing animations provide delight without sacrificing performance through framer-motion integration
- Promise tracking eliminates boilerplate for async operation feedback
- Contextual API design removes prop-drilling complexity in notification systems

**Link:** [goey-toast](https://app.daily.dev/posts/DmY4xhWBK)

---

## Vue Ecosystem Skills: AI Agent Knowledge for Bleeding-Edge Vue

**TLDR:** Vue-ecosystem-skills provides AI agent skills built from actual Vue documentation, GitHub issues, and recent releases, solving the critical problem of AI coding assistants lacking current knowledge about latest Vue API changes.

**Summary:**

The problem this addresses is genuinely frustrating for teams using Vue: AI assistants hallucinate outdated patterns or suggest approaches that no longer apply. Vue moves quickly, with recent major releases bringing significant API changes across Vue 3.6, Pinia v3, Vue Router v5, Reka UI v2, and VueUse v14. By the time these changes permeate traditional LLM training data, developers have already moved forward with newer patterns.

Vue-ecosystem-skills tackles this by generating AI agent skills from authoritative sources: official documentation, real issues from the Vue repository, and release notes. This is a smart pattern that goes beyond simple documentation dumps. Skills provide structured knowledge that modern AI agents can reason about and apply contextually. Rather than trying to make the AI "know" everything about Vue, this approach gives the agent knowledge about what questions to ask and how Vue's ecosystem actually behaves.

For teams building internal AI tooling or working with Claude, Cursor, or other AI coding assistants, this pattern is a template worth studying. The skills approach is emerging as superior to context-dumping solutions because it's selective and actionable. Your team could apply this pattern to your own proprietary libraries or domain-specific knowledge: generate structured skill definitions from your actual codebase, issues, and decisions, then feed those to your AI assistants. This means your custom framework knowledge stays current and actionable.

**Key takeaways:**

- Skills generated from actual documentation and issues outperform static knowledge dumps
- Current API knowledge is critical for effective AI-assisted development in fast-moving ecosystems
- Teams can adopt this pattern for internal libraries and proprietary domain knowledge

**Link:** [harlan-zw/vue-ecosystem-skills](https://app.daily.dev/posts/rV2zAtzZP)

---

## Creating Query Abstractions: Beyond Custom Hooks

**TLDR:** Custom hooks wrapping TanStack Query break TypeScript type inference and limit flexibility, while the queryOptions API provides a cleaner abstraction pattern that preserves type safety and works across contexts.

**Summary:**

This is the kind of pattern shift that separates teams with good developer experience from teams with mediocre ones. The pattern we're discussing is ubiquitous: wrap useQuery in a custom hook to abstract common logic. It feels right—you're following composition principles, right? But TypeScript tells a different story.

When you wrap useQuery in a custom hook without explicit generics, the type system loses track of what you're querying. Pass UseQueryOptions as a parameter? TypeScript can't infer the types properly, forcing developers to manually specify generics everywhere. This defeats the purpose of using TypeScript in the first place.

The queryOptions API, introduced in TanStack Query v5, solves this elegantly. Instead of wrapping hooks, you create query option builders that return properly typed configuration objects. This approach has multiple advantages: it preserves TypeScript's type inference, it works outside React components (useful for server code, tests, or other contexts), and it's composable in ways that hook wrapping simply isn't.

From an architecture perspective, this is about recognizing when a pattern is fighting against your tools instead of working with them. React hooks are fantastic for component-level concerns, but data-fetching abstractions often need to live in a different layer. Teams adopting queryOptions report fewer type errors, better IDE autocomplete, and easier testing. The pattern shift also makes your code more portable—query definitions become configuration that could theoretically be used in different frameworks or contexts without modification.

**Key takeaways:**

- Custom hook wrappers around useQuery sacrifice TypeScript type safety and framework flexibility
- The queryOptions API preserves type inference and enables reusable patterns across contexts
- Moving query abstraction outside hooks aligns with modern architecture thinking around data layer separation

**Link:** [Creating Query Abstractions](https://app.daily.dev/posts/FqwkcNdj0)

---

## Will AI Kill Open Source?

**TLDR:** An opinion piece arguing that AI won't kill open source because established libraries provide verified, stable building blocks that AI systems should leverage rather than replace, and AI benefits from well-defined specifications and test suites.

**Summary:**

This article makes a counter-narrative argument worth examining. The concern that AI will make open source irrelevant comes from a misunderstanding of what AI actually does well and what open source libraries actually provide. Yes, AI can generate code. No, that doesn't mean every developer will ignore battle-tested libraries in favor of AI-generated implementations.

The author's core point has merit: open source libraries succeed because they've been used, debugged, and refined across thousands of projects. They have test suites, documentation, and community support. An AI generating code from scratch provides none of these things. Enterprise teams aren't going to replace their PostgreSQL driver with GPT-generated database connection code—that's not how risk-averse organizations work.

However, there's something the author might be missing or avoiding: the nature of open source contribution itself will probably shift. If AI makes it easier to scaffold boilerplate and implement standard patterns, we might see fewer maintenance contributions from developers who previously felt obligated to understand the codebase deeply. Meanwhile, the developers who do contribute might be more strategic, focusing on architectural decisions and novel solutions rather than routine implementation.

The open source ecosystem will likely not "die," but it may consolidate. We'll see fewer small single-purpose libraries and more robust, well-maintained reference implementations that become de facto standards because AI can reason about them effectively. Teams considering open source strategy shouldn't fear AI—they should see it as an opportunity to make their libraries more discoverable and essential by having excellent test suites, clear specifications, and comprehensive documentation that AI systems can leverage.

**Key takeaways:**

- Established open source libraries provide verified stability that AI-generated code cannot match
- Test suites and specifications are becoming more valuable, not less, in an AI-assisted development world
- The open source landscape will evolve but consolidate around well-documented, battle-tested libraries

**Tradeoffs:**

- Using established open source libraries gains stability and community support but sacrifices the possibility of AI-generated custom implementations
- Investing heavily in comprehensive documentation and specifications provides AI usability but requires ongoing maintenance effort

**Link:** [Will AI Kill Open Source?](https://app.daily.dev/posts/Jg2l9foWw)

---

## The Shift from MCPs to Agent Skills: Why Nx Deleted Most of Their MCP Tools

**TLDR:** Nx moved from Model Context Protocol (MCP) tools to AI agent skills after recognizing that modern agentic workflows make context-dumping MCPs token-inefficient, as agents can now execute CLI commands directly and process outputs themselves.

**Summary:**

This article documents a significant shift in how teams are architecting AI tooling, and it deserves attention because it reflects broader changes in the AI-assisted development landscape. Model Context Protocol tools were supposed to be the standard interface: define what an AI assistant can do, and the assistant would call those tools intelligently. In practice, many MCPs became context-dumping mechanisms—basically "here's everything about our system, search it."

The insight Nx discovered is fundamental: modern AI agents are sophisticated enough to execute CLI commands and interpret their output directly. If you have a well-designed CLI tool, an AI agent can learn to use it. You don't need an MCP intermediary that prepares data in a specific format. This realization cascades into architecture changes: instead of building MCPs that expose curated subsets of knowledge, teams should focus on building excellent CLI tools and then documenting patterns for agents.

Skills, in this emerging model, are domain-specific knowledge packages that teach agents when and how to use available tools. A skill for your build system isn't a tool that dumps dependency information—it's a pattern that says "when the developer asks about performance optimization, here's how our build system can help and what CLI commands will provide meaningful output." This is fundamentally different because it's about strategy and context, not raw data exposure.

For teams building internal development tooling, this is a critical pattern shift. The implication is that your investment should be in CLI excellence and clear mental models of what your tools do, rather than in building MCPs or extensive context-dumping integrations. Teams with well-structured CLIs, clear documentation, and regular updates to their tool behavior will find AI assistants far more effective partners than teams that build elaborate MCP interfaces to compensate for poor CLI design.

**Key takeaways:**

- CLI excellence and clear tooling design are more valuable than custom MCP implementations for AI agent integration
- Skills-based patterns focus on teaching agents strategy and context rather than context-dumping
- Modern agentic workflows leverage tool composition and output interpretation rather than pre-fetched context

**Tradeoffs:**

- Using CLI commands directly gains flexibility and agent autonomy but sacrifices the control and predictability of structured MCP interfaces
- Skills-based knowledge gains strategic reasoning capability but requires careful design to remain maintainable and avoid ambiguity

**Link:** [Trend is to move over to skills over MCPs](https://app.daily.dev/posts/9TN1fkg8L)

