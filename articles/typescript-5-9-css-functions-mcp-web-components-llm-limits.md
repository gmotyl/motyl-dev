---
title: "TypeScript 5.9, new CSS primitives, MCP, Web Components, and why LLMs still struggle to build software"
excerpt: "A roundup of TypeScript 5.9's ergonomics and perf wins, new browser-level CSS functions, Svelte-compiled Web Components, Model Context Protocol on Cloudflare Workers, and a skeptical take on LLMs for software engineering."
publishedAt: "2025-08-15"
slug: "typescript-5-9-css-functions-mcp-web-components-llm-limits"
hashtags: "#generated #en #typescript #frontend #css #svelte #web-components #ai #llm #architecture #performance #mcp #testing"
---

## Bytes #416 — TypeScript gets lean
**TLDR:** A short, informal newsletter note celebrating TypeScript 5.9’s smaller, smarter defaults and a handful of editor and performance improvements. It’s conversational and links to the release notes and related pieces, but it glosses over migration pain and long-term ecosystem impacts.

Summary:
This newsletter blurb highlights the most pleasant things about TypeScript 5.9: a far leaner tsc --init, an "import defer" execution model, richer editor hovers and DOM summaries, and a set of performance tweaks that matter in large codebases. The tone is light and personal, which makes it entertaining to read, but that same breeziness hides details commuting teams will care about when upgrading at scale.

The useful bits are obvious: smaller generated tsconfig.json files reduce noise for newcomers and teams that keep configs minimal; import defer can lower startup costs and separate module evaluation from loading; expandable hovers and MDN-sourced DOM summaries are the kind of quality-of-life editor features that actually change day-to-day productivity; and caching/perf improvements matter if you’ve got heavy type-level libraries like Zod or tRPC. The newsletter also mixes in links to other pieces, but many of those are promotional and not editorial — worth skipping if you're curating technical reading for a team.

What the author avoids or misses: there’s almost no discussion of migration or compatibility gotchas for large monorepos, nor about how import defer might interact with side-effectful modules, bundlers, or non-JS runtimes. There’s also little nuance about tradeoffs of being more opinionated in defaults — it helps beginners but can impose assumptions on projects that intentionally diverge.

For teams and architects: treat 5.9 as an incremental ergonomics and perf upgrade. Try the new tsc --init in a sandboxed repo, audit modules that depend on top-level side effects before adopting import defer, and measure type-check times before and after in CI. Make a plan for educating the team about hover configuration and DOM summaries so these features become part of your dev environment checklist.

Key takeaways:
- TypeScript 5.9 tightens defaults and reduces generated config noise.
- import defer separates importing from execution, useful for expensive initializers.
- Editor hovers and DOM summaries improve discoverability and reduce context switching.

Tradeoffs:
- More opinionated defaults mean faster onboarding but could hide nuanced config choices for specialized environments.

Link: [Bytes — TypeScript gets lean](https://bytes.dev/archives/416)

---

## Announcing TypeScript 5.9 — TypeScript (Microsoft Dev Blog)
**TLDR:** The official 5.9 release bundles a compact tsc --init, import defer, module support for node20, improved DOM API descriptions, expandable hover previews, and a batch of optimizations — a pragmatic release focused on developer experience and compile-time performance.

Summary:
The release notes lay out a tidy set of improvements aimed at two goals: reduce developer friction, and speed up type-checking in real-world codebases. The new tsc --init moves away from verbose, commented config templates toward sensible, opinionated defaults like moduleDetection: "force" and target: "esnext". That’s an explicit bet that most modern users want module semantics and modern targets by default.

Import defer is the marquee language feature for practitioners: it separates textual import from module initialization so a module’s expensive startup logic is only run when one of its exports is accessed. Conceptually it’s similar to lazy evaluation and dynamic imports, but with a statically analyzable syntax. This is powerful for reducing cold-start costs in apps with large dependency graphs, and for platform-specific code that must not run on certain hosts.

On tooling, the team added expandable hover previews and MDN-sourced DOM summaries in VS Code hovers, plus a configurable maximum hover length. On the performance side, TypeScript caches more intermediate type work and reduces redundant file existence checks — exactly the kinds of targeted wins that compound on monorepos or with heavy type-level libraries.

What the author avoids or misses: the notes are light on the behavioral edge-cases of import defer (e.g., interactions with module side effects, initialization ordering, circular dependencies) and don’t wrestle with how these features affect bundlers, SSR, or polyfilled runtimes. The announcement also assumes editor integration is uniformly available — in reality, teams using alternate editors or CI-only tooling may see less benefit.

For architects and teams: adopt conservatively. Run import defer behind feature flags and observability to ensure initialization semantics remain correct. Use the lean tsc --init for greenfield projects, but for existing apps, do a migration pass to ensure that any implicit assumptions about module initialization are explicit. Measure type-check duration in CI before and after the upgrade; caching improvements are helpful but not a substitute for targeted refactors in huge codebases.

Key takeaways:
- TypeScript 5.9 favors opinionated, compact defaults to reduce friction.
- import defer lets you import without triggering module evaluation, reducing startup cost for modules with heavy init.
- Editor hover improvements and DOM summaries cut down context switching.

Tradeoffs:
- Adopting import defer means you gain deferred initialization and faster cold-starts but sacrifice predictable module side-effect ordering unless you audit modules carefully.
- Opinionated defaults simplify new projects but can hide needed config for atypical environments.

Link: [Announcing TypeScript 5.9](https://devblogs.microsoft.com/typescript/announcing-typescript-5-9/)

---

## Better CSS layouts: Time.com Hero Section — Ahmad Shadeed
**TLDR:** A pragmatic walkthrough rebuilding the Time.com hero layout with more flexible, content-driven CSS. The article emphasizes letting content dictate layout choices and demonstrates progressive responsiveness without forcing awkward large-featured images to dominate small viewports.

Summary:
This is a methodical, design-first teardown. The author inspects Time.com's breakpoints, notices an early collapse from a three-column to a one-column layout that makes the featured article visually oversized on small viewports, and proposes a content-aware approach instead. The premise is clear: layout should adapt to content and available space, not just a handful of rigid breakpoints.

The work is practical: start with an unopinionated base, wrap cards in layout items for flexibility, and incrementally introduce responsive rules so components change from stacked to multi-column in a way that preserves visual hierarchy. The article shows the thought process — not just the code — so readers learn how to reason about when the featured item should be full-width versus part of a multi-column grid.

What’s missing or under-explored: performance and image delivery strategy get little attention. When a featured image suddenly occupies nearly the whole viewport, we should also consider lazy-loading priorities, responsive image sizes, and CLS impacts. The author focuses on layout mechanics, which is useful, but in a production redesign you must consider art direction, image optimization, and A/B testing to validate the UX tradeoffs.

For teams and architects: use this as a pattern for component-driven layout work. Break layouts into small, testable CSS rules that respond to content size rather than only viewport width. Add metrics to measure layout-driven UX regressions (CLS, first contentful paint) and coordinate with the design team to agree on when the featured item should dominate the viewport.

Key takeaways:
- Let content and composition determine layout transitions, not just hard breakpoints.
- Wrap content items for flexible placement; avoid brittle markup assumptions.
- Validate visual changes with performance and UX metrics, especially for image-heavy sections.

Tradeoffs:
- Make featured content dominant for emphasis but accept larger image payloads and potential layout shift unless you manage image delivery carefully.

Link: [Better CSS layouts: Time.com Hero Section](https://ishadeed.com/article/time-layout/)

---

## Why LLMs Can't Really Build Software — zed.dev
**TLDR:** A candid critique: LLMs are good at code generation tasks but lack the persistent, context-rich mental models that humans use to design, debug, and iteratively refine complex systems. Without that, they make plausible-sounding mistakes, hallucinate context, and often restart rather than iterate thoughtfully.

Summary:
This piece breaks software engineering down into a loop: form a mental model of requirements, write code to satisfy it, model what the code actually does, and then reconcile differences. The author argues that LLMs can mimic many of these steps — they can write tests, add logging, and update code — but they struggle with maintaining robust, persistent mental models across a complex problem-solving session.

The essay lists concrete failure modes: context omission (models miss implicit assumptions), recency bias (overweight the most recent tokens), and hallucination (inventing facts). Those traits explain why LLM-driven agents often delete and restart rather than iteratively refine, which contrasts with how experienced engineers manage a "mental stack": stashing context, zooming in and out of detail, and methodically probing behavior.

What the author avoids or misses: while rightly skeptical, the piece underestimates how systems engineering around models — memory subsystems, tool orchestration, grounding with deterministic checks — can mitigate many of these issues. It acknowledges work on memory and tooling, but doesn't deeply explore hybrid designs where humans and models share responsibilities with enforced verification layers.

For architects and teams: treat LLMs as powerful assistants for drafting, brainstorming, and routine edits, not as autonomous engineers. Invest in deterministic verification: unit and integration tests, reproducible environments, and human-in-the-loop checkpoints. When designing agentic systems, prefer architectures that make the model’s assumptions explicit and auditable, and create mechanisms for the model to stash and restore structured context rather than hoping for long token windows to save the day.

Key takeaways:
- LLMs are strong at surface-level code generation but weak at maintaining complex, persistent mental models.
- The failure modes (hallucination, recency bias, context omission) explain why models often restart rather than iterate.
- The practical approach is hybrid: models assist, humans verify and own the mental models.

Tradeoffs:
- Relying on LLMs accelerates prototyping but sacrifices deep system understanding and reliable iterative problem-solving unless you add strict verification.

Link: [Why LLMs Can't Really Build Software](https://zed.dev/blog/why-llms-cant-build-software)

---

## Svelte, Markdown, and the Magic of Web Components — Shajid Hasan
**TLDR:** A clear, pragmatic example of using Svelte to compile a component into a Web Component for use inside statically generated HTML from Markdown. It’s a small, practical pattern that reclaims interactive behavior for content pipelines that otherwise output inert HTML.

Summary:
The author describes a common problem: Markdown processors turn content into static HTML strings before your front-end framework ever runs. That makes it hard to inject framework-specific interactive widgets into content generated at build time. The elegant solution here is to export a Svelte component as a web component — a framework-agnostic custom element the browser can instantiate — and then adjust the Markdown pipeline to emit that custom tag.

This pattern leverages Svelte's ability to compile to custom elements, and the author chooses shadow: 'none' to reuse global styling. The advantage is clear: you write the component in Svelte, but the output behaves like plain HTML to the rest of your pipeline. It’s a tidy interoperability trick for blogs, CMS content, and any scenario where templating and component systems are in different compilation phases.

What’s missing or worth questioning: the article downplays the encapsulation and style isolation benefits of shadow DOM. Choosing shadow: 'none' trades away encapsulation for CSS simplicity — which is often pragmatic, but opens you to style collisions. There's also limited discussion of SSR hydration implications, SEO, and progressive enhancement for users with JS disabled. Finally, author doesn't explore lifecycle and accessibility concerns that can surface when custom elements are instantiated late.

For teams and architects: this is a practical pattern for integrating interactive widgets into static content. Use it when your content pipeline is fixed and you need interactivity without reworking the processor. Be deliberate about shadow DOM choices: prefer shadow DOM where you want strong encapsulation, or pick shadow: none only when you can control global styles. Add tests for accessibility and hydration behavior to ensure elements behave consistently across environments.

Key takeaways:
- Web Components are a pragmatic bridge between static HTML from Markdown and interactive framework components.
- Svelte can compile components into custom elements, enabling reuse without full framework wiring.
- Shadow DOM choice is a real design decision — shadow: none is convenient but sacrifices encapsulation.

Tradeoffs:
- Compile-to-web-component gains interoperability but may sacrifice style encapsulation and complicate accessibility/hydration unless you plan for it.

Link: [Svelte, Markdown, and the Magic of Web Components](https://sh4jid.me/blog/svelte-markdown-and-the-magic-of-web-components/)

---

## Learn MCP — Build a Model Context Protocol server with Cloudflare Workers
**TLDR:** A step-by-step guide for building a Model Context Protocol (MCP) server on Cloudflare Workers, exposing discoverable tools over Streamable HTTP for AI assistants to call. It’s a practical primer for making tools accessible to agents globally.

Summary:
MCP is an open standard for letting AI assistants discover and call external tools in a consistent way. The article walks through creating a Cloudflare Workers-based MCP server, serving a /mcp endpoint, defining tools (e.g., a simple "add" tool), and testing with an MCP inspector. The emphasis is on real-time, bidirectional communication via Streamable HTTP and on global deployment characteristics that Workers provide.

This is a useful how-to if you’re experimenting with agents that need deterministic, auditable tool access. The guide covers the basics — templates, inspector tooling, CORS and error handling, and how to present tool metadata so an assistant can introspect parameters and capabilities. The practical upshot: you can make a set of deterministic actions available to a model and constrain or log what it does, which is a useful safety and observability pattern.

What’s missing or underplayed: security and access control are only lightly mentioned. Exposing tools to an agent ecosystem is a design surface packed with risk: injection attacks, privilege escalation, rate limiting, and auditing are non-trivial to get right. Operational concerns such as versioning tool definitions, schema evolution, and governance of who can publish MCP tools are also not covered.

For architects and teams: treat MCP servers as first-class services that require the same lifecycle controls as any API: authentication, authorization, throttling, detailed logging, and backward-compatible versioning of tool schemas. Cloudflare Workers give global low-latency access, but ensure your critical tools have sensible rate limits and a fail-closed posture when the inspector or agent behaves unexpectedly.

Key takeaways:
- MCP standardizes how AI assistants discover and invoke deterministic tools.
- Cloudflare Workers are a sensible host for global, low-latency MCP endpoints.
- Inspector tooling helps validate tool manifests and interactions.

Tradeoffs:
- Exposing tools via MCP gains discoverability and deterministic agent behavior but increases attack surface and operational complexity, requiring hardened auth and governance.

Link: [Learn MCP — Build a Model Context Protocol server with Cloudflare Workers](https://learnmcp.examples.workers.dev/)

---

## 5 Useful CSS functions using the new @function rule — Una Kravets (una.im)
**TLDR:** Chrome 139 introduces @function — custom CSS functions that run browser-side logic within stylesheet context. This unlocks clearer, reusable primitives for things like negation, opacity variants, and fluid typography, improving design-system expressiveness.

Summary:
The article celebrates a browser-level capability: custom CSS functions declared with @function that accept arguments and return computed values. Unlike custom properties that only hold values, functions can run logic and simplify repetitive patterns across a design system. The author presents pragmatic examples — a negate function, an opacity generator, and a fluid typography helper using clamp-style scaling — that make stylesheets more declarative and maintainable.

This is exciting for teams building robust design systems: you can parameterize patterns like responsive font scaling or color opacity in one canonical place and then call them consistently. The examples show how these functions can take default arguments and combine with existing custom properties to produce readable, reusable rules — a big win for maintainability and author ergonomics.

What’s glossed over: runtime performance characteristics and cross-browser compatibility. While Chrome supports the feature, broader adoption across browser engines takes time. Debugging and tooling support in linters and style editors will also lag, and build-time static analysis of CSS may not understand these functions yet. The article is optimistic, but teams should weigh how quickly they adopt features tied to specific browser versions.

For architects and teams: start experimenting with CSS functions for internal design systems and non-critical UI where you control the browser matrix. Use them to centralize complex calculations, reduce duplication, and document intent. Keep progressive fallbacks for environments that lack support, and monitor browser uptake before moving mission-critical visuals behind @function.

Key takeaways:
- @function lets stylesheets run small pieces of logic to compute values, improving expressiveness.
- Good use cases include opacity helpers, negation, and readable fluid typography helpers.
- Early adoption should be cautious due to browser support and tooling limitations.

Tradeoffs:
- Using CSS functions gains expressiveness and reduced duplication but sacrifices immediate cross-browser compatibility and tooling support until adoption broadens.

Link: [5 Useful CSS functions using the new @function rule](https://una.im/5-css-functions/)



---

**Disclaimer:** This article was generated using [newsletter-ai](https://github.com/gmotyl/newsletter-ai) powered by gpt-5-mini LLM. While we strive for accuracy, please verify critical information independently.
