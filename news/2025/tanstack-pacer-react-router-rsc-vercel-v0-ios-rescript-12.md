---
title: "TanStack Pacer, React Router RSC, Vercel v0 iOS App Deep Dive, and ReScript 12"
excerpt: "This week brings TanStack's new rate-limiting library, React Router's RSC implementation, a detailed breakdown of how Vercel built their native iOS app with React Native, and major releases across the ecosystem."
publishedAt: "2025-11-30"
slug: "tanstack-pacer-react-router-rsc-vercel-v0-ios-rescript-12"
hashtags: "#thisweekinreact #react #tanstack #react-native #expo #server-components #typescript #nextjs #kubernetes #performance #testing #css #generated #en"
---

## TanStack Pacer: Framework-Agnostic Rate Limiting Utilities

**TLDR:** TanStack releases Pacer, a new library providing debouncing, throttling, rate limiting, queuing, and batching utilities that work across any JavaScript framework with full type safety.

The TanStack ecosystem continues its expansion with Pacer, a collection of performance optimization primitives that address a surprisingly underserved area. While debouncing and throttling are concepts every developer encounters, having a well-designed, framework-agnostic solution with proper TypeScript support has been lacking.

What makes Pacer interesting is its layered approach to abstraction. You can use low-level functions directly or tap into reactive adapters that integrate with your state management of choice. The library supports both synchronous and asynchronous execution patterns, with built-in error handling, retries, and abort controller support for complex async workflows.

The feature set goes beyond simple debouncing. Pacer includes queue prioritization, LIFO/FIFO/dequeue ordering, concurrency control, and pause/resume capabilities. For teams building applications with frequent user interactions or API calls that need careful orchestration, these primitives can replace a lot of custom code.

From an architectural perspective, having these utilities as standalone, tested primitives rather than inline implementations scattered across components represents a maturity in how we approach frontend infrastructure. Teams should evaluate whether their current debounce implementations could benefit from the additional features like flush controls and cancellation that Pacer provides out of the box.

**Key takeaways:**
- Pacer provides debouncing, throttling, rate limiting, queuing, and batching in one package
- Framework-agnostic design with reactive adapters for React and other frameworks
- Includes advanced features like concurrency control, queue prioritization, and abort support

**Link:** [TanStack Pacer](https://tanstack.com/pacer/latest)

---

## TanStack Router Achieves 20,000x Performance Improvement Through Correctness-First Rewrite

**TLDR:** By rewriting their route matching algorithm from a flat sorted list to a segment trie, TanStack Router accidentally achieved massive performance gains while fixing correctness issues that had plagued the previous implementation.

This is a masterclass in how pursuing correctness can yield unexpected performance benefits. The TanStack Router team was receiving reports of incorrect route matches because their sorting algorithm didn't adhere to strict weak ordering and behaved differently across browsers. Rather than patching the existing system, they opted for a complete architectural rewrite.

The new approach parses the route tree into a segment trie, where each node represents a URL pathname segment. This fundamentally changes the algorithmic complexity from O(N) where N is the number of routes, to O(M) where M is the number of segments in the pathname. For a 450-route application, this means matching can complete in roughly 9 checks instead of potentially 225.

The implementation details reveal thoughtful optimization work. They use backwards stack processing to achieve depth-first search in priority order, bitmasking for tracking optional segments without array allocations, reusable typed arrays to avoid allocations during parsing, and LRU caching since route trees are static after initialization.

What's particularly instructive here is the humility in the conclusion: they acknowledge the benchmark numbers are cherry-picked from large applications, and that route matching is just one part of overall router performance. The honest reporting of both the wins and the limitations builds trust in the TanStack team's engineering culture.

For architects, this story reinforces that data structure choices matter enormously. A trie is a well-known structure, but applying it to route matching wasn't obvious until the team stepped back from incremental fixes to rethink the problem from first principles.

**Key takeaways:**
- Segment trie replaces flat sorted list, changing complexity from route-count-dependent to path-length-dependent
- Small apps see 60x improvement, large apps see 10,000x or more
- The project started as a correctness fix, not a performance optimization
- Implementation uses bitmasking, LRU caching, and typed arrays to minimize allocations

**Tradeoffs:**
- Simpler data structure might be easier to understand but sacrifices performance at scale
- LRU caching improves repeated lookups but adds memory overhead proportional to unique paths visited

**Link:** [How we accidentally made route matching more performant by aiming for correctness](https://tanstack.com/blog/tanstack-router-route-matching-tree-rewrite)

---

## Two Years of Full-Time Open Source: The State of TanStack

**TLDR:** Tanner Linsley reflects on two years of running TanStack as a full-time open source endeavor, sharing the challenges, growth metrics, and the human side of sustainable OSS development.

This retrospective offers a rare honest look at what it takes to run open source at a professional level without traditional venture capital. Tanner explicitly notes that most successful full-stack frameworks had capital backing, something TanStack lacked when starting the journey.

The numbers are impressive: 16 partners funding the operation, 13 active projects, 36 core contributors, over 4 billion downloads, and more than 9,000 companies in their usage funnel. But what stands out is the emphasis on sustainability over growth at all costs. Monthly sponsorships for core contributors, a rainy-day fund, and short-term contracts for additional help paint a picture of thoughtful resource management.

The philosophical underpinning is worth noting: TanStack has been built on kindness. Tanner mentions contributors turning down money out of principle, which speaks to the culture they've cultivated. This isn't just feel-good messaging; it's a competitive advantage when building complex software that requires deep collaboration.

Looking forward, TanStack Start is approaching 1.0 with React Server Component support designed to treat RSCs as another stream of server-side state rather than requiring a complete worldview change. There's also mention of a "massive new library" that will take most of next year, suggesting the ecosystem will continue expanding.

For teams evaluating TanStack libraries, this transparency about organizational health and long-term thinking should factor into the decision. Open source dependencies are only as reliable as the communities maintaining them.

**Key takeaways:**
- 16 partners enable sustainable funding for core contributors and operations
- TanStack Start approaching 1.0 with pragmatic RSC support
- Culture of kindness and long-term thinking distinguishes the project
- Major new library planned for 2026

**Link:** [The State of TanStack, Two Years of Full-Time OSS](https://tanstack.com/blog/tanstack-2-years)

---

## Building Reusable Components with React 19 Actions

**TLDR:** A practical guide to using React 19's useTransition and useOptimistic hooks to build components that track pending states, provide immediate feedback, and expose action properties for parent component customization.

This article addresses a common pain point in React applications: building select components that update URL parameters while providing good user feedback. The naive approach leaves users confused because the select value doesn't update until the router push completes.

The solution layers multiple React 19 features. First, useTransition wraps the router push to track pending state, enabling loading indicators. Then useOptimistic provides immediate visual feedback by temporarily updating the displayed value while the transition is in progress.

What elevates this from a simple tutorial is the discussion of exposing action properties. By creating a setValueAction prop that accepts both synchronous and asynchronous functions, components become truly reusable. Parent components can hook into the action lifecycle without modifying the core component logic.

The naming convention guidance is particularly valuable: action functions should be named to indicate their behavior, making it clear to consumers what execution model they're opting into. This is the kind of API design thinking that separates well-architected component libraries from ad-hoc implementations.

For teams building design systems or shared component libraries, this pattern of exposing action callbacks while handling optimistic updates internally provides a clean separation of concerns. The component manages the complex state coordination; consumers just pass their business logic.

**Key takeaways:**
- useTransition provides pending state for tracking async operations
- useOptimistic enables immediate UI updates during transitions
- Exposing action properties allows parent components to inject custom logic
- Naming conventions should clearly indicate action behavior

**Link:** [Building Reusable Components with React 19 Actions](https://certificates.dev/blog/building-reusable-components-with-react-19-actions?friend=TWIR)

---

## Watt: 93% Faster Next.js in Kubernetes Through SO_REUSEPORT

**TLDR:** Platformatic's Watt application server achieves 93% faster median latency and 99.8% reliability for Next.js in Kubernetes by using Linux kernel's SO_REUSEPORT for zero-overhead load balancing instead of PM2's cluster module.

This is a deep technical dive into why scaling Node.js in containers is harder than it appears. The fundamental problem is that frameworks like Next.js cannot implement early request rejection because they need full request context before knowing what to do. By the time Next.js knows it's overloaded, requests are already queued and consuming resources.

The traditional approaches both have issues. PM2's cluster module adds approximately 30% overhead because every request passes through a master process that coordinates workers via IPC. Single-CPU pods create isolated queues where load imbalances compound because Kubernetes distributes connections via round-robin without visibility into actual pod load.

Watt solves this by using SO_REUSEPORT, a Linux kernel feature that allows multiple processes to listen on the same port with the kernel handling distribution via hash-based selection. This eliminates coordination overhead entirely. Workers accept connections directly from the OS, and the kernel's distribution provides better statistical multiplexing than round-robin to isolated pods.

The benchmark results are striking: 11.6ms median latency versus 182ms for PM2, with 99.8% success rate versus 91.9%. These were tested on AWS EKS with identical total CPU resources across configurations.

What makes this valuable for architects is the layered analysis. The article explains why self-monitoring doesn't work for blocked Node.js processes, why external health monitoring combined with SO_REUSEPORT is the right architecture, and how the two-layer load balancing with Kubernetes services plus kernel distribution provides resilience.

**Key takeaways:**
- SO_REUSEPORT enables kernel-level load distribution with zero coordination overhead
- PM2's cluster module adds ~30% IPC overhead that compounds under load
- External health monitoring can detect blocked event loops unlike self-monitoring
- 93% median latency improvement and near-perfect reliability compared to traditional approaches

**Tradeoffs:**
- Multi-worker pods improve statistical distribution but require right-sizing worker counts per pod
- External health monitoring adds complexity but enables detection of blocked event loops

**Link:** [Accelerate Next.js in Kubernetes](https://blog.platformatic.dev/93-faster-nextjs-in-your-kubernetes)

---

## The Browser Has Everything You Need: Preload Hints for Data

**TLDR:** A compelling argument that the false dichotomy between SPAs and SSR can be resolved by using the browser's built-in resource preloading capabilities for data fetching, not just scripts and stylesheets.

This piece challenges the assumption that fast initial loads and fast client-side navigation require different architectural choices. The insight is straightforward but underutilized: if you know what data a page needs based on the URL, you can tell the browser to start fetching it during HTML parsing using preload hints.

The technique uses standard link rel="preload" tags with as="fetch" for API endpoints. When the JavaScript bundle loads and makes its fetch call, the response may already be in the browser's cache. No waterfalls, no sequential loading, no choosing between data and code.

The caveat is important: this works for data dependencies derivable from request context—URL parameters, cookies, headers. Variables that depend on client-side state cannot be preloaded. But for initial page loads, this covers most cases.

For GraphQL, the article recommends persisted operations (trusted documents) which convert POST requests into GET requests with predictable URL structures that can be preloaded. This is a practical bridge between GraphQL's typical usage patterns and browser resource loading capabilities.

The mental model shift is from "components fetch their data at runtime" to "routes declare their data dependencies statically." This aligns with how Relay works at a philosophical level, but without requiring Relay's full architecture.

For architects evaluating SSR versus SPA decisions, this presents a third path: use the platform's built-in capabilities before reaching for more complex solutions.

**Key takeaways:**
- Preload hints work for data fetching, not just scripts and stylesheets
- URL-derivable data dependencies can be preloaded during HTML parsing
- GraphQL requires persisted operations to enable GET-based preloading
- This approach bridges SSR fast initial loads with SPA-style architecture

**Link:** [The Browser Has Everything You Need](https://jovidecroock.com/blog/platform/)

---

## DistributiveOmit: Fixing TypeScript's Omit for Discriminated Unions

**TLDR:** TypeScript's built-in Omit utility type destroys discriminated unions by expanding all members; a custom DistributiveOmit using conditional types preserves the union structure.

This article addresses a subtle but important TypeScript gotcha. When you use Omit on a discriminated union type, the result loses its discriminating property because Omit processes the union as a whole rather than each member individually.

The scenario is common: you have a component with clearable and non-clearable variants, each with different onChange signatures. When wrapping this component and using Omit to remove certain props, the discrimination disappears, and TypeScript complains about incompatible types.

The solution leverages TypeScript's distributive conditional types. By wrapping Omit in a conditional that always matches (T extends any), the operation distributes across union members, applying Omit to each one separately and preserving the union structure.

A bonus benefit of the custom DistributiveOmit is the stricter key constraint. The built-in Omit allows omitting keys that don't exist on the type, which can leave dead code after refactoring. DistributiveOmit with K extends keyof T catches these cases.

For teams maintaining component libraries with complex prop types involving discriminated unions, this pattern should become standard. The alternative is either avoiding Omit entirely or accepting degraded type inference for wrapper components.

**Key takeaways:**
- Built-in Omit expands discriminated unions, losing type discrimination
- Distributive conditional types (T extends any ? ... : never) preserve union structure
- Stricter key constraints catch omitted keys that no longer exist after refactoring
- The same pattern applies to Pick and other utility types

**Link:** [Omit for Discriminated Unions in TypeScript](https://tkdodo.eu/blog/omit-for-discriminated-unions-in-type-script)

---

## How Vercel Built the v0 iOS App with React Native

**TLDR:** A comprehensive technical breakdown of how Vercel built their first native iOS app using React Native and Expo, achieving native feel through careful attention to keyboard handling, animations, and platform-specific patches.

This is perhaps the most detailed React Native case study published recently. Vercel set out to build an app worthy of an Apple Design Award, and the article explains exactly how they approached each challenge in building a sophisticated AI chat interface.

The chat implementation is structured as composable plugins, each with its own hook. This modularity enables features like keyboard-aware scrolling, dynamic blank size calculation for floating content to the top, and staggered fade-in animations for streaming messages. The use of React Native Reanimated's shared values enables updates without re-renders, which is critical for the frequent updates during message streaming.

The keyboard handling section reveals the complexity hidden behind "native feel." iOS 26 releases repeatedly broke their implementation, requiring cat-and-mouse fixes with the react-native-keyboard-controller maintainer. Custom hooks manage keyboard events, interactive dismissal, and the many edge cases like app backgrounding while the keyboard is open.

Perhaps most interesting is their willingness to patch React Native directly. They modified RCTUITextView to disable scroll indicators, remove bounce effects, enable interactive keyboard dismissal, and add swipe-up-to-focus gestures. These patches also contributed fixes back to React Native core for modal dragging and Yoga flickering issues.

The floating composer implementation uses contentInset on ScrollView with Reanimated's useAnimatedProps for jitter-free updates—a technique they arrived at after trying many alternatives that all had performance issues.

For teams considering React Native for sophisticated applications, this article demonstrates both what's possible and what effort is required. The message is clear: native feel is achievable, but it demands deep platform knowledge and willingness to patch where necessary.

**Key takeaways:**
- Composable hook architecture enables modular feature development for complex UIs
- Reanimated shared values enable smooth animations without re-render overhead
- contentInset with useAnimatedProps solved blank size calculations without jitter
- Native patches were necessary for truly native keyboard and input behavior
- Liquid Glass support through @callstack/liquid-glass for iOS 26

**Tradeoffs:**
- React Native enables code sharing but requires native patches for truly native feel
- Reanimated complexity enables smooth animations but has steep learning curve
- Composable hooks improve modularity but require careful context provider architecture

**Link:** [How we built the v0 iOS app](https://vercel.com/blog/how-we-built-the-v0-ios-app)

---

## React Router's Take on React Server Components

**TLDR:** React Router is adding experimental RSC support that allows returning UI from loaders, creating full RSC routes, and using server functions tied to components rather than routes.

This preview of React Router's RSC implementation reveals a pragmatic approach that extends rather than replaces existing patterns. The key insight is that RSCs can be adopted incrementally—child routes can be RSC routes while parents remain client routes, enabling gradual migration.

The first pattern is returning UI from loaders instead of data. This is particularly powerful for CMS-driven content where you don't know what components you need until you have the data. Instead of dynamically loading components or loading all possibilities upfront, you can make that determination in the loader and send the resulting UI.

Full RSC routes export a ServerComponent function that can directly fetch data without loader indirection. The entire UI is rendered on the server and sent without hydration since there's no interactivity. This simplifies types considerably since there's no loader data to thread through.

Server functions with the 'use server' directive enable component-level mutations rather than route-level actions. This is a significant change: previously, reusable components that needed mutations required actions on every route they appeared in. Now a component can encapsulate its own data loading and mutation logic, potentially even for npm distribution.

The article also notes that static builds work with RSC—the "server" can be the build server, enabling deployment to static hosting while still benefiting from RSC's model.

For architects planning React Router migrations or evaluating RSC adoption, this incremental path is compelling. Teams don't need to commit to a complete rewrite to start gaining RSC benefits in specific routes.

**Key takeaways:**
- RSC in loaders enables returning UI instead of data, avoiding unnecessary hydration
- Full RSC routes skip loaders entirely, simplifying types and data flow
- Server functions enable component-level mutations, not just route-level actions
- Incremental migration is possible—RSC and client routes can coexist in the same app
- Static builds are supported; the build server can be the "server"

**Link:** [React Router's take on React Server Components](https://www.epicreact.dev/react-routers-take-on-react-server-components-4bj7q)

---

## HubSpot's Migration from Enzyme to React Testing Library: 76,000 Tests

**TLDR:** HubSpot migrated over 76,000 tests from Enzyme to React Testing Library over two and a half years through education, planning, cross-team embeds, and persistence—without automation but with lessons for the AI era.

This is a war story about large-scale migration in a complex organization. When Enzyme's maintainer announced no React 18 adapter would be provided, HubSpot knew they needed to move, but the scale was daunting: more than 500 packages with Enzyme tests at the start, growing to 1,500 by the end.

The planning phase is instructive. They used runtime instrumentation rather than static analysis to count Enzyme usage, reasoning that programmatically generated tests would underrepresent effort needed. Packages were bucketed by Enzyme call count and tackled from smallest to largest, concentrating tech debt into the smallest number of packages.

Education played a central role. An internal conference talk on "How to Rethink your Testing Strategy" helped teams understand the philosophical shift from testing internals to testing user interactions. This wasn't just a code migration; it was a mindset migration.

Execution involved automated PR comments calling attention to Enzyme additions, quarterly progress updates, and an internal system called Monarch for coordinating migrations across teams. Cross-team embeds provided white-glove service for the largest migrations, often completing a quarter's worth of tests in weeks.

The reflection on AI is honest: they chose not to pivot mid-migration when AI tools became available because they wanted to rethink testing strategy holistically, not just convert tests. For subsequent migrations, they've invested heavily in AI agents and found migrations to be a good use case.

For engineering leaders facing similar migrations, the key lesson is that tooling and automation are necessary but insufficient. Cultural change, education, and sustained attention over years are what actually move the needle.

**Key takeaways:**
- Runtime instrumentation provided more accurate effort estimates than static analysis
- Smallest-to-largest migration order concentrated tech debt effectively
- Cross-team embeds accelerated the largest, most complex migrations
- AI-assisted migration was considered but rejected to preserve strategic rethinking
- The final tests were removed in February 2025, completing a 2.5-year journey

**Link:** [Moving Mountains: How We Migrated from Enzyme to React Testing Library](https://product.hubspot.com/blog/migrated-from-enzyme-to-react-testing-library)

---

## Why Judging APIs by Syntax is Misleading You

**TLDR:** APIs that look syntactically similar often operate at different abstraction layers with fundamentally different capabilities and constraints; understanding the layer matters more than surface syntax.

This philosophical piece uses styling libraries as a lens for understanding API design more broadly. Restyle, Vanilla Extract, and Tokenami all have similar object-based syntax for declaring styles, but they operate at completely different layers.

Restyle integrates directly with React's rendering model—it can't run outside React 19 but offers maximum convenience. Vanilla Extract assumes a bundler and relies on static extraction—it's framework-agnostic for consumers but requires build-time processing. Tokenami runs below the bundler as a CLI tool, requiring only Node and TypeScript.

The insight extends to React's 'use client' directive. Initial reactions were "I already have client/SSR features in my framework." But the directive operates at the React layer, not the framework layer. It's a primitive that enables frameworks to build consistent behavior on top, rather than each implementing their own conventions.

Lower-level primitives often feel inconvenient because they make fewer assumptions. Higher-level abstractions smooth things over but limit portability. Neither is inherently better; they serve different purposes.

For architects evaluating tools and making technology decisions, this framework of asking "what layer does this operate at?" can cut through surface-level comparisons. Two tools that look identical might serve completely different roles once you understand their assumptions and constraints.

**Key takeaways:**
- Syntactic similarity doesn't imply behavioral similarity
- Higher-level abstractions offer convenience but limit portability
- Lower-level primitives feel inconvenient but impose fewer assumptions
- The 'use client' directive is a primitive, not a framework feature
- Understanding the abstraction layer clarifies appropriate use cases

**Link:** [Why Judging APIs by Syntax is Misleading You](https://jjenzz.com/judging-apis-by-syntax-is-misleading/)

---

## ReScript 12: New Build System, Unified Operators, and Modern JavaScript Output

**TLDR:** ReScript 12 completes a multi-year effort to separate from OCaml legacy constraints, delivering a rewritten build system, standalone runtime package, unified arithmetic operators, and numerous syntax improvements.

This is a landmark release for the ReScript community. The new build system tracks dependencies more precisely, avoids unnecessary recompilations, and works across monorepo packages. The standard library is now included in the compiler runtime, eliminating the separate dependency.

The operator unification is particularly welcome. Arithmetic operators now work consistently for int, float, and bigint, with the compiler inferring specialization from the left operand. No more remembering +. for float addition. Bitwise operators get F#-style syntax, and shift operators match JavaScript conventions.

Dict literals and pattern matching bring significant ergonomic improvements for working with JSON and configuration objects. Nested record types eliminate auxiliary type declarations for complex domain models. Variant pattern spreads enable reusing handlers for subsets of constructors.

JSX preserve mode outputs JSX syntax directly rather than transforming to react/jsx-runtime calls, enabling downstream tooling like the React Compiler to process the output. Function-level directives with @directive enable clean integration with React Server Components without raw blocks.

The distribution changes are substantial: ESM-first with platform-specific binaries that reduce installation footprint. The rename from *Exn to *OrThrow functions clarifies that these throw JavaScript exceptions.

For teams using ReScript, this release removes many friction points that made the language feel dated compared to TypeScript. The continued investment in making ReScript a viable alternative for teams wanting stronger guarantees than TypeScript provides is encouraging.

**Key takeaways:**
- New build system with precise dependency tracking and monorepo support
- Unified arithmetic operators work across int, float, and bigint
- Dict literals and pattern matching reduce boilerplate for JSON handling
- JSX preserve mode enables React Compiler integration
- ESM-first distribution with platform-specific binaries

**Link:** [Announcing ReScript 12](https://rescript-lang.org/blog/release-12-0-0/)

---

## CSS Subgrid: New Layout Possibilities Beyond Convenience

**TLDR:** CSS Subgrid isn't just an escape hatch for nested HTML elements; it enables siblings to be responsive to each other in ways that weren't possible before, opening genuinely new layout possibilities.

Josh Comeau's tutorial starts with the basic use case—allowing nested elements like ul/li or figure/figcaption to participate in parent grids—but quickly moves to the more interesting territory of sibling-aware layouts.

The portfolio card example illustrates the power. When cards with image and text columns are independent grids, different content lengths cause images to be different widths. With subgrid, the parent grid can dynamically react to content changes, finding the optimal column widths across all cards simultaneously.

The gotchas section is essential reading. Subgrids only occupy a single grid cell by default; you must explicitly reserve space with grid-row: span N for row-based layouts. Line numbers get reset in subgrids rather than inheriting from the parent. And subgrid doesn't work with fluid grids using auto-fill or auto-fit.

For browser support, the article suggests creative fallbacks rather than identical experiences. A card layout might use vertical stacking on older browsers instead of the horizontal subgrid layout—the goal being the best possible experience for each capability level.

The Stripe developer site example shows maximalist subgrid usage with the entire layout as one grid passed through multiple layers. But the article wisely suggests starting with incremental adoption for specific problems rather than re-architecting entire projects.

For architects, subgrid represents a genuine capability expansion, not just convenience. The ability to have siblings coordinate their internal layouts opens design possibilities that previously required JavaScript or careful manual coordination.

**Key takeaways:**
- Subgrid enables siblings to be responsive to each other's content
- Explicit row reservation is required; subgrids don't automatically expand
- Line numbers reset in subgrids rather than inheriting from parent
- Incompatible with auto-fill/auto-fit fluid grids
- Feature queries enable creative fallbacks for older browsers

**Link:** [Brand New Layouts with CSS Subgrid](https://www.joshwcomeau.com/css/subgrid/)

---

## The Performance Inequality Gap 2026: Updated Budgets and Sobering Trends

**TLDR:** Alex Russell's annual performance budget update shows network improvements but warns that page weight bloat continues to outpace device and network gains, with median SPAs generating only one soft navigation per page load.

This comprehensive analysis updates performance budget recommendations to 9Mbps down, 3Mbps up, 100ms RTT for the 75th percentile connection. The recommended test device is now the Samsung Galaxy A24 4G, a mid-2023 release that most readers haven't used a phone as slow as in at least a decade.

The numbers paint a concerning picture. Median mobile pages are now 2.6 MiB, larger than DOOM. JavaScript payloads have doubled since 2015, reaching 680 KiB at the median. Not even half of origins have passing Core Web Vitals scores for mobile users, and progress is plateauing.

The most devastating finding is about SPA effectiveness. RUM Archive data shows SPAs are generating only one soft navigation per hard navigation on average. This undermines the entire justification for SPA architecture—the idea that heavier upfront JavaScript pays off through faster subsequent navigations. With N≈2 for session length, the math doesn't work.

The iPhone cache analysis is illuminating. The A19 Pro has roughly 50 MiB of cache providing 8.3 MiB per core—more than double Intel's latest high-end desktop part. This explains the performance gap that has the low-end Android segment running 9x slower than contemporary iPhones.

The prescription is clear: developers need to apply considerably more restraint, browsers and search engines need stronger nudges, and the industry needs to stop venerating failure as success. The web is losing the battle for relevance, and continued bloat will accelerate that decline.

**Key takeaways:**
- Updated network budget: 9Mbps down, 3Mbps up, 100ms RTT
- Test device: Samsung Galaxy A24 4G or equivalent
- Median pages exceed 2.6 MiB; JavaScript doubled since 2015
- SPAs average only one soft navigation per hard navigation, undermining the architecture's justification
- Low-end Android devices remain 9x slower than iPhones; the gap is growing

**Link:** [The Performance Inequality Gap, 2026](https://infrequently.org/2025/11/performance-inequality-gap-2026/)

---

## Playwright 1.57: Speedboard and Chrome for Testing

**TLDR:** Playwright switches from Chromium to Chrome for Testing builds and adds a "Speedboard" view in the HTML reporter showing tests sorted by slowness.

The Chrome for Testing switch is notable because it's the same browser binary as what users actually run, potentially catching issues that only appear in the production Chrome build rather than Chromium. Tests should continue passing, but the team asks users to file issues for unexpected behavior changes.

The Speedboard feature addresses a common pain point: identifying which tests are taking longer than they should. By showing all executed tests sorted by slowness, teams can quickly find candidates for optimization or investigation.

The webserver wait configuration is a welcome addition. Previously, determining when a development server was ready required workarounds. Now you can specify a regex pattern, and Playwright will wait until the server logs match it. Named capture groups can even extract values like port numbers into environment variables.

The breaking change removes Page#accessibility after three years of deprecation, pointing users to libraries like Axe for accessibility testing instead.

**Key takeaways:**
- Chrome for Testing replaces Chromium for more production-accurate testing
- Speedboard in HTML reporter shows tests sorted by slowness
- Webserver wait configuration supports regex patterns with capture groups
- Page#accessibility removed after deprecation period

**Link:** [Playwright v1.57.0](https://github.com/microsoft/playwright/releases/tag/v1.57.0)

---

## Bun v1.3.3: CompressionStream, Test Retries, and SQLite 3.51

**TLDR:** Bun adds standard CompressionStream/DecompressionStream APIs with Brotli and Zstd support beyond the spec, plus retry and repeats options for handling flaky tests.

The CompressionStream implementation is notable for extending beyond the standard "gzip", "deflate", and "deflate-raw" formats to include "brotli" and "zstd". This makes Bun more capable for compression-heavy workloads without additional dependencies.

The test retry and repeats options address the reality of flaky tests. The retry option runs a test up to N times, passing if any attempt succeeds. The repeats option runs a test up to N times, failing if any attempt fails—useful for verifying a test is truly stable.

Standalone executables get new flags to disable automatic .env and bunfig.toml loading, enabling deterministic behavior regardless of the user's working directory configuration.

SQLite has been updated to 3.51.0, and Bun itself is now built with Zig 0.15.2, reducing binary size by 0.8MB. Various fixes address Windows issues including process.stdout 'resize' events that fix terminal resizing in Claude Code and OpenCode.

**Key takeaways:**
- CompressionStream supports brotli and zstd beyond the standard
- Test retry and repeats options handle flaky test scenarios
- Standalone executables can disable automatic config file loading
- SQLite updated to 3.51.0; Bun built with Zig 0.15.2
- Windows terminal resize events now work correctly

**Link:** [Bun v1.3.3](https://bun.com/blog/bun-v1.3.3)

---

## Better Auth 1.4: Stateless Auth, SCIM, and Database Joins

**TLDR:** Better Auth adds stateless session management without a database, SCIM provisioning for enterprise identity management, and experimental database joins improving over 50 endpoints by 2-3x in latency.

Stateless auth enables running without any database by omitting the database option. This is useful for simple applications or edge deployments where database connectivity is problematic. The implementation still supports getting access tokens, account info, and refresh tokens.

SCIM (System for Cross-domain Identity Management) support addresses enterprise requirements for standardized identity provisioning. This is increasingly important for B2B SaaS applications where customers expect integration with their identity providers.

The database joins optimization is marked experimental but represents significant performance improvement. By using joins under the hood, over 50 endpoints see 2-3x latency reduction. Teams need to re-run migrations to get the updated schema, but joins will become default in the next release.

Other notable additions include custom OAuth state for passing additional data through the flow, SSO domain verification for automatically trusting providers based on domain ownership, JWT key rotation support, and CLI database index support.

**Key takeaways:**
- Stateless auth runs without database configuration
- SCIM provisioning supports enterprise identity requirements
- Database joins improve 50+ endpoints by 2-3x latency
- Custom OAuth state passes additional data through the flow
- Breaking changes in several plugin APIs move from request to ctx parameter

**Link:** [Better Auth 1.4](https://www.better-auth.com/blog/1-4)

---

*Disclaimer: This newsletter summary was generated with AI assistance. While I strive for accuracy, please refer to the original articles for complete context and verify any technical details before implementation.*
