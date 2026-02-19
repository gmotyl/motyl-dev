---
title: "React Ecosystem in 2026: State of React Survey, WebStreams 10x Faster, TanStack Challenges Next.js, and the Tooling Revolution"
excerpt: "A deep dive into the State of React 2025 results, Vercel's WebStreams performance breakthrough, the Next.js vs TanStack Start showdown, and the new wave of faster frontend tooling."
publishedAt: "2026-02-18"
slug: "react-ecosystem-2026-state-survey-webstreams-tanstack-tooling"
hashtags: "#this-week-in-react #react #typescript #nextjs #performance #frontend #ai #architecture #css #testing #generated #en"
---

## Breaking Down State of React 2025 Results

**TLDR:** The annual State of React survey is out, revealing that nearly half of developers already use React 19 daily, SPAs dominate at 84%, and the React Compiler tops the excitement list at 62%. TanStack Query leads data fetching, Tailwind CSS owns styling at 78%, and AI tools have climbed to third place for learning resources.

**Summary:**

Let me tell you, this survey is a goldmine if you read between the lines. Nearly 48% of respondents are on React 19 daily, which is impressive adoption, but the pain points tell the real story. useEffect remains the most complained-about hook at 37%, and dependency array issues sit at 21%. After all these years, the reactivity model still trips people up with stale closures and effect cleanup. The React team knows this, and the React Compiler at 62% excitement is basically the community screaming "please fix memoization for us."

The Server Components story is complicated, and honestly, the survey confirms what many of us have felt. They are growing in popularity but simultaneously rank as the third and fourth most disliked features. That is a tension the React team needs to address more directly. You cannot have a core architectural bet that splits your community this sharply.

What the survey avoids confronting is the framework fragmentation question. Next.js is dominant but fears around lock-in are real: 36% negative sentiment toward Vercel involvement versus 25% positive. Meanwhile, TanStack Start is emerging as a client-first alternative, and Remix is moving away from React entirely for v3. The newly announced React Foundation gets overwhelmingly positive sentiment, which suggests developers want governance that is independent of any single company.

The learning section is fascinating. AI tools at third place (54%) for how developers learn is a seismic shift. Developers are increasingly interfacing with documentation through AI rather than reading it directly. If you are building a library and your docs are not AI-friendly, you are already behind. This Week in React hit number one for news sources, which, given the newsletter we are summarizing here, is rather meta.

One more thing the survey glosses over: 34% of respondents do not use any state management library. First-party APIs like useState and useContext are "often sufficient." That is a quiet vindication of React's built-in primitives and a warning shot to the state management ecosystem. The average happiness score is 3.6 out of 5, which is decent but not enthusiastic. React is comfortable, not inspiring.

**Key takeaways:**
- React 19 adoption at 48% daily use is strong; useEffect remains the top pain point
- Server Components are growing but polarizing, ranking among both used and disliked features
- Tailwind CSS dominates styling at 78%; shadcn/ui has strong positive sentiment
- AI tools are the third most popular learning method at 54%
- Vitest (60%) is catching up to Jest (62%); Playwright (52%) is overtaking Cypress (34%)
- React Compiler excitement at 62% signals developer fatigue with manual memoization

**Link:** [Breaking Down State of React 2025 Results](https://certificates.dev/blog/breaking-down-state-of-react-2025-results)

---

## We Ralph Wiggumed WebStreams to Make Them 10x Faster

**TLDR:** Vercel discovered that WebStreams were a major bottleneck in Next.js server rendering, built a library called fast-webstreams that achieves up to 14.6x faster throughput by routing operations through Node.js stream internals, and the improvements are already making their way upstream into Node.js itself.

**Summary:**

This is one of those articles that makes you realize how much invisible overhead sits between your code and the metal. Vercel profiled Next.js server rendering and found that WebStreams, not application code, were eating compute time. The WHATWG Streams API, the web standard powering fetch response bodies and server-side rendering, carries enormous per-chunk overhead: four allocations and a microtask hop just to return data that is already buffered. They benchmarked native WebStream pipeThrough at 630 MB/s versus Node.js pipeline at 7,900 MB/s. That is a 12x gap, and it is almost entirely Promise and object allocation overhead.

The solution is clever but raises questions about layering. fast-webstreams implements the WHATWG API but backs it with Node.js streams internally. When you pipe between fast streams, it collects upstream links and issues a single pipeline call: zero Promises per chunk. For the React Flight pattern specifically (the exact byte stream pattern used in React Server Components), they achieved 14.6x improvement: from 110 MB/s to 1,600 MB/s. That is not a small win.

What the article dances around is the philosophical tension here. The web standard is the right API to converge on, they say, but then they build a library that subverts its implementation because the standard's guarantees are too expensive on the server. The spec's Promise-per-read design exists for real reasons: cancellation during reads, error identity through locked streams, thenable interception. These matter in browsers. But on the server, you are paying for security guarantees you do not need.

The most encouraging part is that this is not meant to stay in userland. Matteo Collina already submitted an upstream PR to Node.js that applies two ideas from this project, showing 17-20% faster buffered reads and 11% faster pipeTo. The goal is explicitly stated: for fast-webstreams to not need to exist. That is the right attitude. Credit where it is due, they also acknowledge building most of it with AI, which worked because the Web Platform Tests gave them 1,116 machine-checkable tests as instant feedback.

**Key takeaways:**
- WebStreams carry massive per-chunk overhead from Promise chains and object allocations
- fast-webstreams achieves 10x faster pipeThrough and 14.6x faster React Flight pattern
- The library passes 1,100 out of 1,116 Web Platform Tests, more than Node.js native
- Improvements are being upstreamed to Node.js through Matteo Collina's PR
- Available as experimental-fast-webstreams on npm

**Tradeoffs:** The library patches global constructors, which is inherently risky for such a foundational primitive. Vercel is rolling it out carefully and incrementally, starting with patterns where the gap is largest.

**Link:** [We Ralph Wiggumed WebStreams to make them 10x faster](https://vercel.com/blog/we-ralph-wiggumed-webstreams-to-make-them-10x-faster)

---

## Building Next.js for an Agentic Future

**TLDR:** Next.js is evolving to treat AI agents as first-class users, having built and sunset an in-browser agent called Vector, shipped MCP integration for developer tooling, and is now embedding framework-specific knowledge directly into the development workflow.

**Summary:**

This piece from the Next.js team is interesting not for what it announces, but for the strategic direction it reveals. They noticed developers copying browser errors, pasting them into AI editors, and asking agents to fix them. The problem: agents cannot see the browser. Runtime errors, client-side warnings, rendered components are invisible to them.

Their first attempt was Vector, an in-browser chat agent that let you select elements, see source code, and prompt for changes. They sunset it because it overlapped with general coding agents like Cursor and Claude Code. That is a healthy decision, killing your own product because the market already has better general-purpose solutions.

The real substance is MCP (Model Context Protocol) integration. Next.js now exposes internal states like errors, routes, and rendered segments to agents. The framework surfaces browser errors in the terminal, embeds compressed docs indices as agents.md, and provides structured workflows as "Next.js skills." The vision is that agents get the right context automatically when you run next dev.

What is missing from this article is any honest assessment of whether the App Router's complexity is part of the problem agents struggle with. If your framework has invisible boundaries between server and client execution environments that trip up human developers, of course agents will struggle too. Making the framework more agent-friendly is good, but simplifying the mental model might be even more impactful.

**Key takeaways:**
- Agents cannot see browser state, making debugging via AI a copy-paste workflow
- Next.js MCP integration surfaces routes, errors, and rendered segments to agents
- agents.md provides compressed framework knowledge to AI tools
- npx @next/codemod generates up-to-date docs indices for projects
- Long-term goal: zero-setup agent context built into next dev

**Link:** [Building Next.js for an agentic future](https://nextjs.org/blog/agentic-future)

---

## Next.js Finally Has Competition: TanStack Start

**TLDR:** TanStack Start has matured into a legitimate full-stack React framework alternative to Next.js, offering superior type safety, lower memory usage, and deployment freedom, though it is still a Release Candidate and lacks Next.js's ecosystem depth and content-site optimizations.

**Summary:**

This is a thorough and opinionated comparison that does not pull punches. The core argument is that for interactive applications like dashboards, admin panels, and data-heavy apps, TanStack Start's architecture is fundamentally better. In Next.js, adding a single useState to a Server Component forces you into a separate file with "use client" and an understanding of serialization boundaries. In TanStack Start, the server function is explicitly declared, and the component is a normal React component.

The type safety argument is compelling. In Next.js, route params come as Promise<{ id: string }> since version 15. Search params are untyped strings. In TanStack Start, route params are inferred from file paths and validated at the route level with full Zod validation. The middleware story extends this: composable, typed middleware where auth validates a session, permissions check access, and logging receives both, all with full type inference. No any casts.

The performance data is striking if you trust it. Next.js dev server documented growing to 9-10GB in GitHub issues. TanStack Start sits at 200MB. Production memory leaks in Docker and Kubernetes are documented across six open GitHub discussions spanning 2021 to January 2026. The Inngest migration story shows local page loads dropping from 10-12 seconds to 2-3 seconds.

However, the article's framing has a clear bias. When covering security, it mentions the CVE-2025-55182 with a CVSS of 10.0 against RSC, which is fair, but then implies TanStack Start is inherently more secure by having less attack surface. Less surface area is true, but fewer production deployments also means fewer discovered vulnerabilities. The article acknowledges TanStack Start is still an RC but treats this as a minor concern. For teams that need to say "production-proven" to stakeholders, that distinction matters enormously.

The five decision questions at the end are genuinely useful. Content-heavy reading apps go to Next.js. Interactive apps go to TanStack Start. Small teams without DevOps go to Next.js plus Vercel. Teams managing infrastructure save real money with TanStack Start.

**Key takeaways:**
- TanStack Start offers superior type safety with validated route params and typed middleware
- Next.js dev server memory issues are well-documented; TanStack Start stays at ~200MB
- For interactive apps, "use client" on everything negates Server Components benefits
- TanStack Start deploys to any Node runtime; potential savings of $5,000-20,000/year
- Next.js wins for content sites, image pipeline, ecosystem depth, and production stability
- TanStack Start is still an RC; 1.0 is imminent with RSC support planned post-1.0

**Tradeoffs:** The fundamental tradeoff is architectural maturity versus architectural elegance. Next.js has years of battle scars. TanStack Start has a cleaner design for interactive apps but fewer production deployments to prove it.

**Link:** [Next.js Finally Has Competition](https://dev.to/elvissautet/nextjs-finally-has-competition-2lg7)

---

## The Journey to a Safer Frontend: Why Gusto Removed React.FC

**TLDR:** Gusto's engineering team discovered that React.FC silently suppresses TypeScript warnings for unused props and invalid defaults, leading them to migrate over 5,000 files away from it and enforce explicit prop types across their entire frontend codebase.

**Summary:**

This is a small but important story about technical debt hiding in plain sight. A developer noticed that typing a component with React.FC made TypeScript stop flagging unused props. With explicit typing, TypeScript correctly warns you. With React.FC, it silently swallows the error.

The discovery expanded into a codebase-wide migration touching thousands of files across dozens of packages. They wrote transformation scripts that extracted props types from React.FC<Props>, inlined them into component parameters, and added explicit React.ReactNode return types. The cleanup exposed dozens of hidden bugs: unused props surviving through multiple refactors, default values with invalid types, inconsistent component definitions.

What makes this article worth discussing is not the React.FC removal itself, which has been recommended for years, but the engineering culture that enabled it. A casual "today I learned" Slack post turned into a cross-team effort within days. Gusto credits their guilds, Architecture Decision Records, and open discussion channels. That organizational infrastructure matters as much as the technical insight.

The article does not address one important question: why was React.FC recommended in the first place, and what responsibility do TypeScript and React documentation bear for years of encouraging patterns that silently weakened type safety? The community has moved on, but thousands of codebases still use React.FC because it appeared in every early tutorial.

**Key takeaways:**
- React.FC hides unused props, allows invalid defaults, and breaks generic inference
- Gusto migrated 5,000+ files with automated transformation scripts
- Added ESLint rule to block React.FC from returning to the codebase
- Explicit prop types and return values give TypeScript stronger guarantees
- Engineering culture with open discussion channels enabled rapid cross-team adoption

**Link:** [The Journey to a Safer Frontend: Why We Removed React.FC](https://engineering.gusto.com/the-journey-to-a-safer-frontend-why-we-removed-react-fc-095ff0b3e2e4)

---

## Tailwind CSS v4.2.0

**TLDR:** Tailwind CSS v4.2.0 adds new color palettes, logical property utilities for block/inline sizing, a webpack plugin, and font-feature-settings support, while fixing several bugs and deprecating start/end utilities in favor of inline-s/inline-e.

**Summary:**

This is a feature-packed release that pushes Tailwind further into logical properties territory. The new utilities for padding-block-start/end, margin-block-start/end, inline-size, block-size, and inset variants signal a commitment to internationalization-friendly CSS. If you are building for right-to-left languages or vertical writing modes, these utilities matter.

The new color palettes (mauve, olive, mist, taupe) are nice additions, though the real story is the @tailwindcss/webpack package. While most new projects use Vite, the enterprise world still runs on webpack. This plugin keeps Tailwind accessible to those teams without requiring a bundler migration.

The deprecation of start-* and end-* utilities in favor of inline-s-* and inline-e-* deserves attention if you have a large codebase. Start planning your migration now, even if the old utilities still work.

**Key takeaways:**
- New logical property utilities for block/inline sizing, margin, padding, and inset
- Four new color palettes: mauve, olive, mist, taupe
- New @tailwindcss/webpack package for webpack users
- font-features-* utility for font-feature-settings
- Deprecation of start-*/end-* in favor of inline-s-*/inline-e-*

**Link:** [Tailwind CSS v4.2.0](https://github.com/tailwindlabs/tailwindcss/releases/tag/v4.2.0)

---

## Radix UI vs Base UI: A Detailed Comparison

**TLDR:** Radix UI provides structured, accessible components with strong defaults ideal for product development, while Base UI offers lower-level behavioral primitives with maximum flexibility ideal for component registries and custom design systems.

**Summary:**

This comparison from the Shadcn Space team explains their choice of Base UI over Radix UI, and while it is obviously biased toward their decision, the framework for thinking about the tradeoff is useful.

Radix UI gives you a predefined component tree: Root, Trigger, Content, Portal, Overlay. You style the provided parts and get correct behavior automatically. Base UI gives you behavior only, and you decide the structure. The difference shows up in real scenarios: placing a close button outside dialog content is trivial with Base UI and harder with Radix.

The accessibility models differ in who carries responsibility. Radix handles focus traps, ARIA attributes, and keyboard interactions internally. Base UI provides the same logic but expects you to apply it to your own structure. Both are accessible, but Radix requires less expertise.

Where the article gets interesting is the argument for component registries. If your platform ships copy-pasteable UI components that developers will customize, Base UI's lack of forced structure means the copied code is plain React that developers fully own. They are not "adopting Base UI" as a dependency; they are using well-structured code. That argument has real merit for the registry use case.

What is missing is performance benchmarking and a frank discussion of how much harder Base UI is when you need to get accessibility right in complex scenarios like nested dialogs or focus restoration across portals.

**Key takeaways:**
- Radix UI: best for product development with strong accessibility defaults
- Base UI: best for component registries and highly customizable design systems
- Both support Tailwind CSS and controlled/uncontrolled patterns
- Base UI offers smaller primitives with less overhead
- Radix has a gentler learning curve; Base UI pays off as complexity grows

**Link:** [Radix UI vs Base UI - Detailed Guide](https://shadcnspace.com/blog/radix-ui-vs-base-ui)

---

## Announcing Interop 2026

**TLDR:** For the fifth consecutive year, major browser vendors are collaborating on twenty focus areas for cross-browser interoperability, including anchor positioning, contrast-color(), view transitions, scroll-driven animations, WebTransport, and the Navigation API.

**Summary:**

Interop 2026 is arguably the most ambitious edition yet, with twenty focus areas and fifteen brand new ones. The features that excite me most are the ones developers have been waiting years for.

contrast-color() is deceptively simple but architecturally significant for design systems. The browser picks black or white based on whichever has higher contrast with your specified color. You no longer need to manually define every color pairing. Safari and Firefox already ship it; now Chrome needs to catch up.

Media pseudo-classes (:playing, :paused, :seeking, :buffering, :stalled, :muted, :volume-locked) have been in Safari for years but ignored by other browsers. Combined with :has(), you can style anything on the page based on playback state. No JavaScript needed. The fact that this has taken this long to reach interoperability is frankly embarrassing for the web platform.

The advanced attr() function deserves more attention than it gets. Pulling HTML attribute values into CSS as colors, lengths, or angles without JavaScript bridges a gap that has forced countless workarounds. Container style queries let CSS respond to theme values and state flags, which enables component-level theming without JavaScript.

Scoped custom element registries solve a real pain point for microfrontends: two libraries defining the same tag name causing conflicts. Safari shipped this first, and inclusion in Interop 2026 ensures it works everywhere.

What the announcement does not address is prioritization. Twenty focus areas is a lot. History shows that browsers make uneven progress, and some features inevitably lag. The investigation into JPEG XL testability is also worth watching, given the ongoing tension between browser vendors about next-generation image formats.

**Key takeaways:**
- 20 focus areas, 15 brand new, 5 carried over from Interop 2025
- contrast-color() lets browsers pick accessible text colors automatically
- Media pseudo-classes enable CSS-only media player state styling
- Advanced attr() bridges HTML attributes to CSS values across all properties
- Scoped custom element registries solve microfrontend tag name conflicts
- JSPI for Wasm enables porting synchronous C/C++/Rust apps to the web

**Link:** [Announcing Interop 2026](https://webkit.org/blog/17818/announcing-interop-2026/)

---

## Fun with TypeScript Generics

**TLDR:** A deep dive into TypeScript generics and conditional types through the lens of building a fully typed helper function for TanStack Start server functions, covering function overloading, inferred types, and generic constraints.

**Summary:**

This article from Frontend Masters takes the approach of teaching advanced TypeScript concepts through a real-world problem rather than contrived examples. The problem: building a refetchedQueryOptions helper for TanStack Start that properly types both the server function argument and the return type.

The initial version uses any for the server function and argument, which means every query hook returns any for its data. That is not just imperfect typing; it actively undermines the value of TypeScript in your application code. The iterative approach to solving this is instructive.

The first attempt adds a generic constrained to (arg: { data: any }) => Promise<any>, then uses Parameters<T>[0]["data"] to extract the argument type and Awaited<ReturnType<T>> for the return type. This works but requires passing undefined explicitly for server functions without arguments.

The final solution uses function overloading: one signature for server functions with arguments, another for those without. The conditional types ServerFnWithArgs and ServerFnWithoutArgs route to the correct overload. It is elegant, but the article honestly acknowledges that for most apps, simply passing undefined is fine and the overloading approach may not be worth the complexity.

What the article avoids discussing is whether this level of type gymnastics indicates a design smell. When your type system requires conditional types, inferred generics, and function overloads to express a simple concept like "this function may or may not take an argument," perhaps the API surface should be reconsidered. That said, the TypeScript techniques themselves are valuable and transferable.

**Key takeaways:**
- Generics combined with conditional types enable precise API typing
- Function overloading in TypeScript allows different signatures for different use cases
- ReturnType and Parameters built-in helpers extract function type information
- The extends keyword constrains generics and powers conditional type checks
- Practical typing prevents any from propagating through your application code

**Link:** [Fun with TypeScript Generics](https://frontendmasters.com/blog/fun-with-typescript-generics/)

---

## Module Federation 2.0 Stable Release

**TLDR:** Module Federation 2.0 reaches stable status with tree shaking for shared dependencies, SSR support, Rust-powered manifest generation, and a comprehensive debugging system including a side effect scanner and Chrome extension.

**Summary:**

Module Federation has been the micro-frontend solution that everyone knows about but few use well. This stable release addresses several pain points that kept teams from adopting it confidently.

Tree shaking for shared dependencies is the headline feature. Traditional shared deps avoid duplicate loading but bundle entire packages. MF 2.0's runtime-infer mode performs on-demand pruning at runtime: it tries tree-shaken bundles first and falls back to full dependencies if needed. For Ant Design, when using only Badge, Button, and List, shared bundle size drops from 1,404 KB to 344 KB, a 75.5% reduction.

SSR support eliminates a painful tradeoff. Previously, choosing module federation meant giving up server-side rendering. Now you get both, at least within the Modern.js ecosystem. The isomorphic data prefetching with built-in prefetch and cache APIs unifies CSR and SSR data handling.

The debugging system deserves attention. The side effect scanner statically analyzes build outputs for global variable mutations, event listeners, and CSS scope impacts before you consume a remote module. The upgraded Chrome extension visualizes shared dependency loading, dependency graphs, and sharing strategy effectiveness. These tools address the "black box" problem that made module federation debugging so painful.

What is not addressed is the elephant in the room: does module federation still make sense when server components, edge computing, and streaming architectures are changing how we think about code distribution? The "What's Next" section mentions React Server Components, which suggests the team recognizes this tension. The AI-friendly design mention feels like checkbox marketing rather than a concrete capability.

**Key takeaways:**
- Tree shaking shared dependencies reduces bundle sizes by up to 75%
- SSR support via Modern.js eliminates the micro-frontend vs performance tradeoff
- Side effect scanner identifies global variable mutations before module consumption
- Rust-powered manifest generation and AsyncStartUp improve build performance
- Supports Webpack, Rspack, Rollup, Rolldown, and frameworks including Next.js
- RSC integration is the next strategic focus

**Link:** [MF 2.0 Stable Release](https://module-federation.io/blog/v2-stable-version.html)

---

## Electrobun v1: Cross-Platform Desktop Apps with TypeScript

**TLDR:** Electrobun reaches v1 as a cross-platform desktop application framework built on Bun and Zig, offering automatic installers, differential updates, and a true out-of-process iframe replacement for Electron's deprecated webview tag.

**Summary:**

This is a passion project that filled a gap its creator experienced firsthand while building a hybrid web browser and code editor. The frustrations with Electron's code signing, notarization, and distribution workflows, combined with Tauri requiring Rust, led to building something new on Bun and Zig.

Electrobun now supports macOS, Windows, and Ubuntu with automatic installers and differential update artifacts. The differential updates use zig-bsdiff, ported from C to Zig with SIMD and zstd optimization. Bring your own static host (R2, S3, GitHub Releases) and distribution is handled.

The OOPIF (out-of-process iframe) story is the most technically interesting part. Electron's webview tag was deprecated from Chromium and they still have not fixed it. Electrobun's electrobun-webview provides DOM positioning, process isolation, and proper layering without patching browser engines. That is a meaningful differentiation for applications that embed multiple web views.

The framework is still early. The community is small, the ecosystem is nascent, and betting a production application on it requires significant confidence. But for developers building desktop applications who want the web's deployment model with Electron's rendering capabilities minus its baggage, this is worth watching.

**Key takeaways:**
- Cross-platform support for macOS, Windows, and Ubuntu with automatic installers
- Differential updates via zig-bsdiff with SIMD and zstd optimization
- electrobun-webview replaces Electron's deprecated webview with proper process isolation
- Built on Bun's FFI layer and shared memory for efficient multi-process architecture
- Still early; small community but growing

**Link:** [Electrobun v1](https://blackboard.sh/blog/electrobun-v1/)

---

## Biome v2.4: Embedded Snippets, HTML Accessibility, and Better Framework Support

**TLDR:** Biome v2.4 ships embedded CSS and GraphQL formatting in JavaScript files, 15 HTML accessibility lint rules, a rule execution profiler, improved Vue/Svelte/Astro support, and promotes 24 nursery rules to stable status.

**Summary:**

Biome continues its march toward replacing the entire Prettier plus ESLint toolchain with a single, fast tool. The embedded snippets feature is particularly interesting: Biome can now format and lint CSS within styled-components or Emotion template literals, and GraphQL within gql tags, directly inside JavaScript files. This eliminates the need for separate Prettier plugins for these use cases.

The 15 HTML accessibility rules are a smart strategic move. As Biome expands to HTML-ish languages like Vue, Svelte, and Astro, having built-in accessibility linting makes it immediately useful for teams working in these frameworks. The rules work seamlessly across all three frameworks, which is a strong differentiator.

The rule profiler is a developer tool for Biome itself, but the concept is valuable. Being able to see that noUnusedVariables takes 42ms total across 41,633 invocations versus noFocusedTests taking 23ms across 51,096 helps identify optimization opportunities in your lint pipeline.

The configuration improvements matter for adoption. Hidden .biome.json files, platform-specific config directories, and the editor inline configuration that overrides project settings without affecting CI builds show a maturing understanding of real-world development workflows.

Promoting 24 nursery rules to stable is significant momentum. Rules like noImportCycles, noDeprecatedImports, and noUnusedExpressions are the kind of checks that catch real bugs in production codebases. The new types domain for type-aware rules, powered by the module graph and type inference engine, is the most architecturally important addition for long-term competitiveness with TypeScript-ESLint.

**Key takeaways:**
- Embedded CSS and GraphQL formatting/linting in JavaScript template literals
- 15 new HTML accessibility rules working across Vue, Svelte, and Astro
- Rule execution profiler for identifying lint performance bottlenecks
- 24 nursery rules promoted to stable production-ready groups
- New types domain for granular control over type-aware linting
- SARIF reporter for security and code quality platform integration

**Link:** [Biome v2.4](https://biomejs.dev/blog/biome-v2-4/)

---

## Fastest Frontend Tooling for Humans and AI

**TLDR:** A practical guide to the fastest JavaScript toolchain in 2026, recommending tsgo for type checking, Oxfmt over Prettier, Oxlint over ESLint, and strict linting configurations that help both human developers and AI coding agents write better code.

**Summary:**

This is the kind of opinionated guide that saves teams weeks of tooling research. The author has been running tsgo (TypeScript's Go rewrite) for six months across 20+ projects ranging from 1,000 to 1,000,000 lines of code. The 10x faster type checking is real, and notably, tsgo caught type errors the JavaScript implementation missed. That is confidence-building.

The Oxfmt recommendation is interesting because it finally addresses Prettier's long-standing performance issues while maintaining feature parity through built-in plugins for import sorting and Tailwind CSS class ordering. For the long tail of languages Oxfmt does not cover, it falls back to Prettier, which is pragmatic.

Oxlint is the first new linter that can run ESLint plugins directly through a shim layer. This solves the ecosystem problem that killed every previous ESLint competitor. If you need the React Compiler ESLint plugin, Oxlint can run it. The combination of oxlint --type-aware --type-check powered by TypeScript Go is the endgame for fast, comprehensive linting.

The @nkzw/oxlint-config philosophy is worth adopting regardless of tooling: errors not warnings, strict consistent style, prevent bugs through disallowing problematic patterns like instanceof, and prefer autofixable rules. The observation that LLMs perform significantly better in codebases with strict guardrails and fast feedback loops is an underappreciated insight. Your tooling configuration is now part of your AI strategy.

The admission that ts-node with nodemon and swc is still the fastest dev server restart solution is refreshingly honest. Sometimes the best tools are not the newest ones.

**Key takeaways:**
- tsgo provides 10x faster type checking and catches errors tsc misses
- Oxfmt replaces Prettier with built-in import and Tailwind class sorting
- Oxlint can run ESLint plugins directly, solving the ecosystem compatibility problem
- Strict linting configurations improve both human and AI code quality
- oxlint --type-aware --type-check combines linting and type checking via TypeScript Go
- Fast feedback loops matter for AI coding agents, not just humans

**Link:** [Fastest Frontend Tooling for Humans & AI](https://cpojer.net/posts/fastest-frontend-tooling)