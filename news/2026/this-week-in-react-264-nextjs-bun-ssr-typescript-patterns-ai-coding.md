---
title: "This Week In React #264: Next.js 16.1, Bun SSR Revolution, Type-Safe Patterns, AI Coding Reality Check"
excerpt: "A packed week featuring Next.js 16.1's Turbopack improvements, Bun's production SSR breakthrough at Bol, compound component patterns, Chrome 144's Temporal API, and more."
publishedAt: "2026-01-14"
slug: "this-week-in-react-264-nextjs-bun-ssr-typescript-patterns-ai-coding"
hashtags: "#thisweekinreact #react #reactnative #nextjs #bun #typescript #performance #ai #testing #turbopack #immer #astro #rspack #turborepo #chrome #temporal #generated #en"
---

## Next.js 16.1: Turbopack File System Caching Goes Stable

**TLDR:** Next.js 16.1 makes Turbopack's file system caching stable and enabled by default, introduces an experimental bundle analyzer, and adds easier debugging capabilities with `--inspect`.

The Next.js team has shipped version 16.1 with a focus on faster development workflows and improved stability. The headline feature is that Turbopack file system caching for `next dev` is now stable and on by default. Compiler artifacts get stored on disk, leading to significantly faster compile times when restarting your development server - especially noticeable in large projects.

Internal applications at Vercel have been dogfooding this for the past year. Following this release, they're working on stabilizing file system caching for `next build` as well.

A new experimental Bundle Analyzer works with Turbopack and makes it easier to optimize bundle sizes for both server and client code. It helps improve Core Web Vitals, reduce lambda cold start times, and identify bloated dependencies. The tool launches an interactive UI to inspect production bundles, identify large modules, and see why they're included. You can filter bundles by route, view full import chains, trace imports across server-to-client component boundaries, and switch between client and server views.

Other improvements include easier debugging with `next dev --inspect`, better handling of transitive dependencies in `serverExternalPackages` for Turbopack, 20MB smaller installs, a new `next upgrade` command, and timing logs for `generateStaticParams`.

**Key takeaways:**
- Turbopack file system caching now stable and on by default for development
- New experimental bundle analyzer for production optimization
- Node.js debugger now attachable via simple `--inspect` flag
- Turbopack properly resolves transitive external dependencies

**Tradeoffs:**
- Gain faster development restarts but sacrifice some disk space for caching artifacts
- Experimental bundle analyzer provides deep insights but adds build-time overhead when used

**Link:** [Next.js 16.1](https://nextjs.org/blog/next-16-1)

---

## Bun SSR at Bol: From Experiment to Production in a Week

**TLDR:** Bol replaced Node.js with Bun for React SSR workloads, achieving 50-80% performance improvements, lower memory usage, and significantly faster pod startup times in Kubernetes.

This is the kind of real-world performance analysis that makes you sit up and pay attention. A team at Bol (a major e-commerce platform) ran a careful experiment replacing Node.js with Bun for their React SSR workloads, and the results are genuinely impressive.

The problem they faced: Node.js handled SSR by maxing out at around 8-9 requests per second per pod, requiring aggressive horizontal scaling during peak traffic like Black Friday. The React render loop is CPU-bound and blocking, causing event loop lag issues.

Their experiment setup was clever: same codebase, same Kubernetes environment, just switching the runtime via a ConfigMap. The only code change was adapting to Bun's slightly different streaming API.

The benchmark results were striking. In single-pod tests, Node.js handled around 16 requests per second with ~1100ms latency, while Bun achieved 23 requests per second with ~800ms latency. At scale with mirrored production traffic, Bun required roughly 30% fewer pods and significantly less memory to handle the same load.

Memory usage dropped from ~807 MiB (Node) to ~447 MiB (Bun). Event loop lag dropped from 10-14ms to ~3ms. The p99 latency improved by 200-300ms. Pod startup times dropped from 30-32 seconds to just 7 seconds - a game-changer for autoscaling responsiveness.

The team was careful to note this is not magic - they haven't profiled garbage collection behavior under complex render trees, and tooling for deep profiling is less mature than Node's ecosystem. But for SSR workloads specifically, the results speak for themselves.

For architects considering this move: the key insight is that Bun's faster startup times fundamentally change how you can configure HPA policies. You can be more aggressive with scaling because pods are ready almost instantly. The estimated cost reduction was around 22% in monthly scalable infrastructure costs.

**Key takeaways:**
- Bun achieves 50-80% performance improvement over Node.js for SSR workloads
- Memory usage roughly halved, event loop lag reduced by 70-80%
- Pod startup time dropped from 30+ seconds to 7 seconds
- Same codebase works with minimal changes

**Tradeoffs:**
- Gain significant performance improvements but sacrifice mature debugging tooling
- Faster pod scaling comes at cost of less ecosystem maturity

**Link:** [Experimenting with Bun: From Idea to Production in a Week](https://www.tbeeren.com/post/experimenting-with-bun-from-idea-to-production-in-a-week)

---

## Building Type-Safe Compound Components

**TLDR:** TkDodo explains when compound components make sense (flexible layouts, static content) versus when they don't (dynamic content, fixed layouts), and introduces a component factory pattern for achieving type safety.

TkDodo (Dominik Dorfmeister) has written another thoughtful piece on API design, this time tackling compound components in React. He argues that the common Select/Option example often used to teach compound components is actually a poor use case.

His core insight: compound components excel when you need flexible layout of children (users can arrange them however they want) and mostly static content. They're less suitable for dynamic content that comes from API calls or when layout is fixed and shouldn't be rearranged.

For dynamic content like user lists from an API, you end up writing mapping code everywhere, which defeats the purpose. A props-based API with an `options` array is often cleaner. For fixed layouts like modals where you don't want the footer above the header, slots (passing components as props) are usually better than compound components.

The type safety challenge with compound components is that JSX children don't inherit type parameters from parent components. If you have a generic `RadioGroup<ThemeValue>`, each `RadioGroupItem` still needs its own type annotation.

His solution is a component factory pattern: instead of exporting components directly, export a `createRadioGroup<T>()` function that returns typed components tied together. Users call it once with their type parameter, and the returned components are properly typed.

For teams building design systems, this is a nuanced take that goes against the "compound components everywhere" mindset. The factory pattern does add a small learning curve, but the type safety payoff is significant for library consumers.

**Key takeaways:**
- Compound components work best for flexible layouts with static content
- Slots are often better for fixed-layout components like modals
- Props-based APIs are often cleaner for dynamic data
- Component factory pattern achieves type safety across compound components

**Link:** [Building Type-Safe Compound Components](https://tkdodo.eu/blog/building-type-safe-compound-components)

---

## How Good Is AI at Coding React (Really)?

**TLDR:** AI excels at isolated React tasks (~40% success) but drops to ~25% on multi-step integrations. The gap between "AI helped me ship" and "AI gave me a mess" comes down to context engineering and explicit constraints.

Addy Osmani's React Summit closing keynote provides the most data-driven analysis I've seen of AI coding capabilities for React developers. He draws on benchmarks like Design Arena, Web Dev Arena, SWE-Bench, and Web-Bench to paint a realistic picture.

The key finding: there's a "complexity cliff." AI handles simple tasks well - form components, utility functions, isolated widgets. But performance drops significantly for multi-step work across real codebases. Next.js eval tasks show best models at ~42% success rate. Web-Bench multi-step full-stack tasks hit around 25%.

The capability divide is crucial to understand: AI is strong at logic, data flow, and implementing explicit requirements, but weak at taste, usability awareness, and aesthetic judgment. Design Arena found that general agents are more variable than specialists, and the scaffolding/workflow around the base model drives much of the performance spread.

This leads to his core insight: you have far more control over outcomes than you think. The difference between "AI helped me ship" and "AI gave me a mess" almost never comes down to model selection - it comes down to context engineering, prompt specificity, workflow structure, and guardrails.

His practical tips: start prompts with the component API (props, variants, states), name interactive states explicitly, ask for a plan before generating, codify your design system in Tailwind config, bake conventions into the repo. Treat AI like a junior hire - give written task briefs, acceptance criteria, constraints, and require tests.

For architects: consider this a force multiplier that amplifies both good and bad. Give it a weak brief and you get a 10,000-line maze. Give it explicit requirements and you might ship faster than ever.

**Key takeaways:**
- AI excels at isolated components and scaffolding, struggles with multi-step integration
- Aesthetic and design taste remains weak despite strong logic capabilities
- Context engineering and explicit constraints matter more than model selection
- Use AI for boilerplate, keep design intent and architecture human-led

**Link:** [How Good Is AI at Coding React (Really)?](https://addyo.substack.com/p/how-good-is-ai-at-coding-react-really)

---

## Using React Transitions for Low-Priority Editor Updates

**TLDR:** React's useDeferredValue lets you deprioritize expensive re-renders (like preview panels) while keeping primary UI responsive - perfect for rich text editors with multiple view modes.

Shane Friedman from Handle with Care shares a elegant pattern for React ProseMirror performance optimization that applies broadly to any "primary + preview" UI pattern.

The problem: when you share EditorState between a main editor and a preview panel, every change re-renders both. For rich text editors with complex node types, this can tank performance.

The solution uses React's Transition APIs (`useDeferredValue`, `startTransition`). By creating a deferred version of the editor state for the preview panel, React prioritizes the main editor updates while allowing preview updates to be interrupted if the user keeps typing.

The implementation is straightforward: wrap the state with `useDeferredValue` and pass that to the preview component. The preview effectively gets a "render-aware debounce" - if it manages to complete before getting interrupted, users see the result; if not, the render cancels and tries again after the high-priority render finishes.

The critical safety note: when using deferred values, you must never produce transactions from the stale state. It may be arbitrarily behind, so any data used as input to transactions must come from the current EditorState via hooks like `useEditorEventCallback`.

For React developers: this pattern extends beyond editors. Any UI with expensive secondary views (dashboards with charts, forms with live previews, tables with filter panels) can benefit from this approach.

**Key takeaways:**
- useDeferredValue creates low-priority "lagging" copies of state
- Preview panels can update independently without blocking main UI
- Deferred values are effectively "render-aware debouncing"
- Never use deferred state to create transactions or mutations

**Link:** [Using React Transitions for low priority text editor updates](https://handlewithcare.dev/blog/transition_low_priority_editor_updates/)

---

## Sharing Data with Client Components via Promises

**TLDR:** Pass promises (not resolved values) from Server Components to Client Components, then unwrap with React's `use()` hook. This unblocks page rendering while maintaining convenient data access patterns.

This Next.js 16 recipe demonstrates a powerful pattern for solving the "global data in Server Components" problem. Server Components don't support Context, so how do you avoid prop drilling for things like current user data?

The naive approach - awaiting data in a Server Component provider - blocks your entire application from rendering until that promise resolves. The solution: don't await the promise, just pass it to the Client Component.

The pattern has three parts: create the promise without awaiting in the Server Component, pass it as context value, and in the consuming hook use React's `use()` API to both unwrap the context and then unwrap the promise.

When a component calls the hook, it will suspend if the data isn't ready. You wrap consumers in Suspense with appropriate fallback UI.

This is particularly elegant because you get to use Server Components to marshal all the data needed for a page during the initial request, while unblocking components that don't depend on that data from rendering early - potentially even at build time if you're prerendering.

For architects: this pattern works beautifully for current user, feature flags, or any dynamic data that many components need. The combination of React's `cache` on the server (for request-scoped memoization) and Context with `use` on the client eliminates prop drilling across both server and client trees.

**Key takeaways:**
- Pass promises, not resolved values, from Server to Client Components
- Use React's `use()` hook to unwrap both context and promises
- Components suspend if data isn't ready, handled by Suspense boundaries
- Unblocks page rendering while maintaining convenient data access

**Link:** [Sharing data with Client Components](https://next-16-recipes.vercel.app/sharing-data-with-client-components)

---

## Understanding React's useEffectEvent

**TLDR:** useEffectEvent creates stable callbacks that always read latest state values without adding them to effect dependencies - solving the stale closure problem elegantly in React 19.2+.

Peter Kellner provides a comprehensive guide to one of React 19.2's most practical new hooks. If you've battled with effects that need current state values but shouldn't re-run when those values change, this is your solution.

The classic problem: you set up a subscription or timer in useEffect, and the callback needs to read the latest state. Add that state to the dependency array, and your effect re-runs (re-subscribes) every time state changes. The traditional workaround mirrors state into a useRef, which works but adds boilerplate.

`useEffectEvent` returns a stable function that always reads the latest values when called - without requiring those values in your effect's dependencies. The function identity stays the same across renders, but the closure is always fresh when invoked.

Under the hood, it's doing what you'd do manually with refs: maintaining a stable wrapper that delegates to an always-updated internal callback. But React handles the synchronization.

Important rules: only call Effect Events from inside Effects (not event handlers or during render), don't pass them to other components as props, and declare them right before the Effect that uses them. They're not a general-purpose stable callback solution - they're specifically for escaping dependency hell in Effects.

For teams still on React 18: the article shows the manual useRef pattern you need. But if you're on React 19.2+, this hook eliminates that boilerplate elegantly.

**Key takeaways:**
- useEffectEvent solves the stale closure problem in effects
- Returns stable function identity that reads fresh values when called
- Only call from inside Effects, not event handlers or render
- Available in React 19.2+, use useRef pattern on older versions

**Link:** [Understanding React's useEffectEvent](https://peterkellner.net/2026/01/09/understanding-react-useeffectevent-vs-useeffect/)

---

## Immer 11.1.0: Array Method Plugin for Massive Performance Gains

**TLDR:** New optional plugin overrides draft array methods to bypass proxy creation, delivering 50-80% faster array operations at the cost of slightly changed mutation semantics.

Immer 11.1.0 introduces a genuinely interesting performance optimization. The problem: when you call array methods like `filter()` on an Immer draft, the Proxy's `get` trap fires for every single item, forcing creation of new Proxies and metadata even for pure read operations.

The new `enableArrayMethods` plugin overrides draft array methods to directly operate on the underlying wrapped array instance. The benchmarks show 50-80% improvement combined with other recent optimizations.

The semantic tradeoff is important: any array item received as a callback argument in these overridden methods won't be automatically wrapped in a Proxy. If you try to mutate an argument in methods like `filter()`, you'll mutate the real underlying object. This is intentional - these methods imply read-only access.

Methods like `map`, `flatMap`, `forEach`, and `reduce` are not overridden because they do imply potential mutations or side effects. The plugin adds about 1.5-2KB minified to bundle size.

For teams heavily using Immer with large arrays: this is worth investigating. The performance gains are substantial, but you need to verify your code doesn't accidentally mutate items in read callbacks.

**Key takeaways:**
- New plugin provides 50-80% faster array operations on Immer drafts
- Works by bypassing proxy creation for read-only array methods
- Important: callback arguments in filter/find/etc are NOT wrapped as drafts
- Adds ~1.5-2KB to bundle size

**Link:** [Release v11.1.0 · immerjs/immer](https://github.com/immerjs/immer/releases/tag/v11.1.0)

---

## require(esm) Now Stable Across Node.js LTS

**TLDR:** After years of ecosystem fragmentation, require(esm) is now stable in Node.js 20.19.0+ and 22.12.0+, letting packages ship ESM directly without transpilation or dual-package complexity.

Joyee Cheung reflects on the journey from experimental implementation to stability for one of Node.js's most requested features. The key insight: getting the initial implementation landed was the easy part. Reaching stability required dealing with interop edge cases, backports, impact investigations, consensus building, and ecosystem collaboration.

The analysis of why require(esm) matters is particularly compelling. Without it, ESM was actually an inferior shipping format on Node.js - CommonJS could be imported by ESM and required by CommonJS, making it the common denominator. This led to the proliferation of "faux ESM" (ESM in src/, transpiled CommonJS in dist/) and dual packages with their infamous hazards.

What about top-level await? Investigation of top 5000 high-impact npm packages found only ~0.02% might have irreplaceable TLA use cases. Most usage shows up in scripts and app code, rarely in modules loaded by others.

For package maintainers: if you don't support EOL Node.js versions, you can now simplify from dual-package exports to a simple ESM-only package.json with `"type": "module"` and `"engines": { "node": "^20.19.0 || >=22.12.0" }`.

This represents a genuine turning point for the JavaScript ecosystem. Many popular packages have already started transitioning since require(esm) landed across LTS lines.

**Key takeaways:**
- require(esm) now stable in Node.js 20.19.0+ and 22.12.0+
- Packages can ship ESM directly without transpilation or dual packages
- Top-level await rarely needed in library code (~0.02% of packages)
- Simplifies package.json significantly for modern-only packages

**Link:** [require(esm) in Node.js: from experiment to stability](https://joyeecheung.github.io/blog/2025/12/30/require-esm-in-node-js-from-experiment-to-stability/)

---

## 37 Tips for Writing Good Frontend Tests

**TLDR:** A comprehensive collection of testing best practices covering test organization, query selection, mocking strategies, snapshot usage, and accessibility testing.

This extensive guide from HowToTestFrontend collects practical wisdom for frontend testing that's worth bookmarking. A few highlights that stood out:

On test structure: separate test() calls for unrelated assertions make failures easier to diagnose. When tests fail, you want to know immediately what behavior is broken.

On query selection: use RTL's queries in priority order - getByRole for buttons/headings, getByLabelText for inputs, getByTestId only as last resort. This encourages semantically correct HTML and makes tests more realistic.

On mocking: avoid over-mocking. Tests that mock every child component are just testing your mocks. Mock API responses and third-party libraries, but let your own components render. If AI generated your tests, audit carefully - AI loves to over-mock.

On snapshots: inline snapshots are great for development, but massive serialized objects or DOM snapshots quickly become unreadable. Test specific properties that matter for the behavior under test.

On state management: don't test Redux/Zustand internals - test what components render. If you're asserting that specific actions were dispatched, you're testing implementation details.

One particularly sharp point: flaky tests are almost as important as production bugs. If engineers learn to just re-run failing CI, you've lost the trust that makes tests valuable.

For teams establishing testing standards: this is a solid reference. Many points seem obvious individually, but having them collected and articulated makes it easier to maintain consistency across a team.

**Key takeaways:**
- Separate tests for separate assertions, avoid if/else in test code
- Use semantic queries (getByRole, getByLabelText) over getByTestId
- Mock external APIs, not your own components
- Prioritize fixing flaky tests - they erode test suite trust

**Link:** [How to write good frontend tests: 37 tips and tricks](https://howtotestfrontend.com/resources/how-to-write-good-frontend-tests)

---

## Chrome 144: Temporal API, Search Text Styling, Geolocation Element

**TLDR:** Chrome 144 brings the long-awaited Temporal API for modern date/time handling, ::search-text pseudo-element for find-in-page styling, and a declarative <geolocation> element.

Three significant additions to the web platform landed in Chrome 144.

The Temporal API is finally here as a global object providing modern date and time functionality. Date has been a long-standing pain point in JavaScript - Temporal addresses timezone handling, duration arithmetic, and calendar systems properly. This is a massive improvement for anyone who's fought with Date objects or reached for moment/date-fns.

The `::search-text` pseudo-element exposes find-in-page search result styling. You can now change foreground/background colors or add text decorations to how browsers highlight search matches. Particularly useful when default browser highlighting has insufficient contrast with your page colors.

The `<geolocation>` element introduces a declarative, user-activated control for location access. It streamlines the permission flow by embedding a browser-controlled element in the page - the user's click provides clear intent. This addresses the long-standing problem of permission prompts triggered from JavaScript without strong user intent signals.

For frontend developers: Temporal is the big one. Start learning the API now - it will fundamentally change how we handle dates in JavaScript, making many date library dependencies unnecessary.

**Key takeaways:**
- Temporal API provides modern date/time handling as a native JavaScript object
- ::search-text pseudo-element enables styling of find-in-page highlights
- <geolocation> element provides declarative location permission flow
- All features rolling out in Chrome 144

**Link:** [New in Chrome 144](https://developer.chrome.com/blog/new-in-chrome-144?hl=en)

---

## Astro 6 Beta: Redesigned Dev Server, Cloudflare Workers Support

**TLDR:** Astro 6 completely redesigns the development server to run against real runtimes like Cloudflare Workers, stabilizes live content collections, and makes CSP support production-ready.

The Astro team has shipped a beta with a completely redesigned `astro dev` that closes the gap between development and production environments. The internal refactor leverages Vite's Environment API to run your web application inside the same runtime you deploy to - same JavaScript engine, same globals, same platform APIs.

For Cloudflare Workers specifically, this is transformative. Previously you worked against simulated APIs like `Astro.locals.runtime` providing polyfills. Now `astro dev` runs your entire application using workerd (Cloudflare's open-source runtime). You get real access to Durable Objects, KV Namespaces, R2 Storage, and other Cloudflare primitives during development, with HMR support.

Live Collections are now stable - the missing piece for content that updates in real time without rebuilds. Think live stock prices, inventory counts, or any frequently updating data source. The API uses explicit error handling since network issues are now possible.

Content Security Policy support (previously experimental in Astro 5.9) is now stable. Astro generates CSP headers or meta elements automatically, including hashes of scripts and styles even for dynamically loaded ones. Works across all render modes and official adapters.

Breaking changes include Node 22+ requirement, removal of deprecated APIs like `Astro.glob()` and legacy content collections, and Zod 4 upgrade.

**Key takeaways:**
- Development server now runs against real runtimes like Cloudflare Workers
- Live content collections stable for real-time updating data
- CSP support stable with automatic script/style hashing
- Breaking: Node 22+ required, many deprecated APIs removed

**Link:** [Astro 6 Beta](https://astro.build/blog/astro-6-beta/)

---

## Turborepo 2.7: Devtools, Composable Config, Biome Integration

**TLDR:** New visual devtools for exploring package and task graphs, composable configuration that extends from any package, and Biome integration for environment variable linting.

Turborepo 2.7 ships with a new visual experience at `turborepo.dev/devtools`. Running `turbo devtools` lets you explore your Package Graph and Task Graph visually, with hot-reload as you make changes.

This solves questions that were previously hard to answer: Which packages will miss cache when I change my utilities package? What tasks does this task depend on transitively? The graphs help debug cache miss patterns and understand complex monorepo relationships.

Package Configurations got more powerful with the ability to extend from any package's turbo.json (not just root). A new `$TURBO_EXTENDS$` keyword lets you append to array configurations rather than completely overwriting them - useful for adding outputs without losing inherited ones.

Biome 2.3.10+ now includes a Turborepo domain with the `noUndeclaredEnvVars` rule. Biome reads your dependencies and activates the domain automatically, helping find environment variables that could cause unexpected cache hits. Currently in nursery group requiring manual activation.

Yarn 4.10.0's "catalogs" feature (for centralized dependency version definitions) is now properly supported in Turborepo's lockfile parsing, ensuring smart cache invalidation.

**Key takeaways:**
- New visual devtools for exploring package and task graphs
- Configuration can now extend from any package, not just root
- Biome integration detects undeclared environment variables
- Yarn 4 catalogs properly handled for cache invalidation

**Link:** [Turborepo 2.7](https://turborepo.dev/blog/turbo-2-7)

---

## Rspack 1.7: SWC Plugin Compatibility, Import Bytes, Lazy Compilation

**TLDR:** Final 1.x release improves SWC Wasm plugin compatibility, adds native import-as-bytes support, enables lazy compilation by default, and stabilizes several experimental features.

Rspack 1.7 marks the final minor release in the 1.x series before moving toward Rspack 2.0. The focus is on stabilization and compatibility improvements.

The SWC plugin compatibility story is significantly better. Previously, SWC AST structure changes across versions would break existing plugins. Through contributions to the SWC community, Rspack now uses cbor serialization instead of version-sensitive rkyv, with Unknown variants for new enum fields. Most SWC upgrades won't break older plugins anymore.

Native support for the Import Bytes proposal lets you import assets as Uint8Array and decode with TextDecoder - useful for binary file handling without Base64 overhead.

Lazy compilation is now enabled by default in the Rspack CLI for dynamically imported modules, reducing initial build module count and speeding up dev server startup.

Several experimental features are now stable and enabled by default: constant inlining optimization, TypeScript enum inlining, and type re-export checking. The experimental flags are deprecated.

The Rstack ecosystem updates include Rsbuild 1.7 with runtime error overlay and asset size diff reporting, Rstest 0.7 with configuration adapters, and Rspress 2.0 RC with SSG-MD for AI-friendly documentation output.

**Key takeaways:**
- SWC Wasm plugin compatibility improved significantly
- Import assets as bytes natively supported
- Lazy compilation on by default for dev server
- Multiple experimental optimizations now stable

**Link:** [Announcing Rspack 1.7](https://rspack.rs/blog/announcing-1-7)

---

## React Native Wrapped 2025: The Year of Polishing

**TLDR:** React Native's tenth year saw seven releases, New Architecture becoming default, Legacy Architecture removal, and continued ecosystem maturation with performance as the dominant theme.

Two comprehensive year-in-review posts from Callstack and Infinite Red capture React Native's remarkable 2025.

The major milestones: React Native turned 10 in March, the New Architecture became default in May (Expo SDK 53), Legacy Architecture was frozen in June (0.80), removed in October (0.82), and React Native 1.0 was announced as being on the horizon at React Universe Conf.

Performance was the year's defining theme. The Nitro modules ecosystem exploded (react-native-nitro-image, react-native-nitro-fetch, video, HealthKit). The list virtualization race heated up between Legend List and FlashList v2. Styling performance pushed forward with Unistyles 3.0 and Uniwind. React Compiler landed in 0.78. RNRepo launched for pre-built Android artifacts.

AI adoption was notable: Mistral, v0, Replit, vibecode, and Rork all chose React Native. Vercel published a detailed case study on building v0's iOS app with Expo.

For developers: React Native 0.83 closed the year perfectly - zero breaking changes, React 19.2 with new Activity component and useEffectEvent, enhanced DevTools with Network panel, Performance panel, and a standalone desktop app.

The ecosystem maturity is evident: seven major releases, Legacy Architecture completely removed, stable New Architecture, and a clear path to 1.0.

**Key takeaways:**
- New Architecture now the only option, Legacy completely removed
- Performance tooling and libraries dominated the year
- AI companies choosing React Native validates the platform
- React Native 1.0 on the horizon after ten years

**Link:** [React Native Wrapped 2025: A Month-by-Month Recap](https://www.callstack.com/blog/react-native-wrapped-2025-a-month-by-month-recap-of-the-year)

---

## Quick Bits

**Waku 1.0 Alpha** - The minimal React framework reaches 1.0-alpha with stable public API surface. Waku shines for mostly-static sites with some dynamic routes - marketing sites, blogs, docs, light ecommerce. Entry files renamed to `waku.server.tsx` and `waku.client.tsx`.

**Ant Design 6.2.0** - Batch CSS variable improvements, QRCode margin support, Tour keyboard navigation, Modal focus trapping, and various bug fixes.

**Voltra** - New library for building iOS Live Activities and Widgets using React. No Swift required. JSX gets converted to SwiftUI view hierarchies. Supports remote updates via push notifications to change UI without app updates.

**2025 JavaScript Rising Stars** - n8n led overall with 112k+ stars. In React ecosystem, React Bits and shadcn/ui topped the charts. Bun led build tools, Expo led mobile.

**Signals vs Query-Based Compilers** - Marvin Hagemeister explores how modern LSP-powered compilers use query-based architectures similar to Signals, but with different tradeoffs - demand-driven rather than push-pull.

---

*This newsletter summary covers This Week In React #264. For the full newsletter with additional links and resources, visit [thisweekinreact.com](https://thisweekinreact.com/newsletter).*

*Note: Article summaries are generated based on scraped content and may not capture every nuance of the original articles. Always refer to the linked sources for complete context.*
