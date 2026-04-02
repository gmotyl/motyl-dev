---
title: "React Compiler Goes Rust, Next.js Gets Universal Adapters, and TanStack Doubles Down on Local-First"
excerpt: "This week in React: the compiler is getting a Rust rewrite, Next.js ships a stable adapter API for any platform, TanStack Router moves to signals, TanStack DB adds persistence, and the axios supply chain attack is a wake-up call for everyone."
publishedAt: "2026-04-01"
slug: "react-compiler-rust-nextjs-adapters-tanstack-local-first"
hashtags: "#react #javascript #typescript #frontend #reactnative #tanstack #nextjs #security #generated #en"
source_pattern: "This Week In React"
---

## React Compiler Is Being Ported to Rust

**TLDR:** The React team has an active work-in-progress pull request porting the React Compiler from TypeScript to Rust. All 1717 test fixtures now pass, with both SWC and OXC frontends fully supported.

**Summary:** This is one of those PRs that deserves your full attention, even if it is still marked as work-in-progress. The React Compiler, which automatically handles memoization so you don't have to sprinkle `useMemo` and `useCallback` across your codebase, is being rewritten in Rust by Joseph Savona. The motivation is predictable: speed. Rust is dramatically faster than TypeScript for compute-heavy compilation tasks, and if you've ever felt the compiler slowing down your builds on a large project, this rewrite is the long-term fix.

What's technically interesting here is the scope of the port. This isn't just translating code from one language to another. The team rebuilt the entire High-level Intermediate Representation lowering pipeline, the SSA pass using the Braun et al. algorithm, type inference, sparse conditional constant propagation, and even the validation passes. The architecture is split into clean, separate crates, each handling a distinct compilation concern, which is a solid design.

The pull request also supports two alternative JavaScript parsers beyond Babel: SWC and OXC. Both now pass all 1717 end-to-end test fixtures. That's not a small accomplishment. The test normalization work to make the Rust output match the TypeScript output exactly, accounting for things like Unicode escaping, blank line formatting, and flow type handling, was substantial. There's also a genuinely useful architectural choice here: the Rust core now handles error formatting itself, eliminating a `@babel/code-frame` dependency from the JavaScript layer.

One aspect worth noting is that the team moved error formatting from JavaScript into Rust, which simplifies the boundary between the two worlds. The stated principle is to keep the JS-Rust serialization layer thin, only passing core data structures from Babel and letting the Rust side derive everything else. This is good systems thinking.

I'll be honest, the number of commits in this PR is staggering, and reading through the test progression from 772 passing to 1724 is almost like watching a speedrun. The engineering rigor here is impressive.

**Key takeaways:**
- The React Compiler is being rewritten in Rust for dramatically better build performance
- All 1717 test fixtures pass with both SWC and OXC frontend parsers
- The Rust core handles all compilation, SSA, type inference, and validation
- Error formatting has been moved from JS into Rust, simplifying the boundary layer
- This is still WIP, but the test parity is essentially complete

**Why do I care:** If you're building or maintaining a large React codebase, the compiler is one of those things that either works invisibly or becomes a build-time bottleneck. A Rust-powered compiler means we can realistically expect compilation to be fast enough to run on every file, every build, without the current performance trade-offs. It also signals that the React team is investing seriously in the compiler as a long-term tool, not an experiment.

**Link:** [[compiler] WIP port of React Compiler to Rust](https://github.com/facebook/react/pull/36173)

---

## Next.js Ships a Stable Adapter API for Every Platform

**TLDR:** Next.js 16.2 includes a stable, versioned Adapter API built with OpenNext, Netlify, Cloudflare, AWS Amplify, and Google Cloud. Vercel's own adapter uses the same public contract, with no private hooks.

**Summary:** This is a genuinely significant moment for the Next.js ecosystem, and I think it deserves more attention than it's been getting. For years, deploying Next.js anywhere other than Vercel involved a patchwork of community tools, OpenNext being the most prominent, because there was no official, documented contract between Next.js build output and the infrastructure that would run it. That gap is now closed.

The Adapter API works like this: when you build a Next.js app, it produces a typed, versioned description of your application covering routes, prerenders, static assets, runtime targets, caching rules, and routing decisions. Any platform can consume this output and map it to their own infrastructure. Adapter authors implement two hooks, one that fires when configuration loads and one when the build completes. Breaking changes require a new major version of Next.js, which gives adapter authors the stability guarantee they've been asking for.

What makes this more than a press release is the governance around it. The Next.js team has published the same test suite they use for Vercel's adapter, and any verified adapter must pass all of it. The correctness bar is shared. When Netlify's engineer said that 90% of their pain came from the lack of a stable, documented mechanism to read build output, that's exactly the problem this solves. The fact that Vercel's own adapter now uses this public API and is open source removes the "Vercel has a secret advantage" concern that's always lurked under the surface.

The working group model, with public meeting notes and engineers from Netlify, Cloudflare, Google Cloud, AWS Amplify, and OpenNext all at the table, is the right way to evolve a framework that millions of teams rely on. I'm genuinely pleased to see this. OpenNext didn't just inspire this, it proved the concept in production and directly shaped the API design.

There are caveats worth naming. The Netlify, Cloudflare, and AWS adapters aren't fully verified yet, just in active development. And the test suite covers streaming, caching, and client navigation, but real-world edge cases always surface after release. Still, the direction is exactly right.

**Key takeaways:**
- Next.js 16.2 ships a stable, public Adapter API that any platform can build against
- Vercel's own adapter uses the same API, no private hooks or special path
- A shared test suite defines the correctness bar across all providers
- Verified adapters must be open source and pass the full test suite
- An Ecosystem Working Group with public meeting notes coordinates changes across providers

**Why do I care:** For teams running Next.js on non-Vercel infrastructure, this is the difference between relying on an unofficial compatibility layer and building on a stable contract. For platform engineers, it's the foundation they've been asking for. The fact that the entire working group includes engineers from competing platforms, all working in the open, is the kind of infrastructure collaboration that benefits the whole ecosystem.

**Link:** [Next.js Across Platforms: Adapters, OpenNext, and Our Commitments](https://nextjs.org/blog/nextjs-across-platforms)

---

## React Gets Native Trusted Types Support

**TLDR:** React has landed support for the browser Trusted Types API, which helps prevent DOM-based XSS attacks. Previously, React's string coercion broke Trusted Types enforcement entirely. This is a non-breaking change.

**Summary:** The Trusted Types API is a browser security feature that most developers know exists but few have actually integrated, in part because frameworks that coerce everything to strings before touching the DOM made it nearly impossible to use. React was one of those frameworks. When you passed a `TrustedHTML` object through `dangerouslySetInnerHTML`, React would call string coercion on it, converting the typed object back into a plain string, which the browser would then reject under Trusted Types enforcement. The result was a broken integration that forced teams to choose between using React and using Trusted Types.

The fix is straightforward in concept: React now passes values directly to DOM APIs without string coercion. This preserves `TrustedHTML`, `TrustedScript`, and `TrustedScriptURL` objects so the browser can validate them. This applies to `dangerouslySetInnerHTML`, all HTML and SVG attributes, and URL attributes like `href` and `action`.

The non-breaking aspect is worth emphasizing. DOM APIs accept both strings and Trusted Types objects. Removing the explicit string coercion is functionally identical for sites not using Trusted Types. For sites that are trying to adopt Trusted Types, or that want to enforce a Content Security Policy requiring trusted types for script, this unlocks that integration without any workarounds.

This is the kind of unglamorous but important security work that makes a framework more suitable for enterprise and high-security environments. If you're in financial services, healthcare, or anywhere that runs a strict CSP, this matters a lot.

**Key takeaways:**
- React now passes DOM values directly without string coercion, preserving Trusted Types objects
- Applies to `dangerouslySetInnerHTML`, all HTML/SVG attributes, and URL attributes
- Non-breaking: sites not using Trusted Types see no behavior change
- Enables proper integration with `Content-Security-Policy: require-trusted-types-for 'script'`

**Why do I care:** Security CSP compliance in large React apps has always required careful workarounds or third-party sanitization libraries that then fought with React's rendering. Having this baked into the framework removes a class of XSS-related problems at the source and makes React applications more suitable for strict security environments without configuration gymnastics.

**Link:** [[flags] land enableTrustedTypesIntegration](https://github.com/facebook/react/pull/35816)

---

## TanStack Router Switches to a Signal Graph for Reactivity

**TLDR:** TanStack Router has replaced its single broad `router.state` reactive object with a graph of smaller, purpose-built stores backed by alien-signals. The result is more targeted updates, fewer re-renders during navigation, and native Solid signals in the Solid adapter.

**Summary:** This is a refactor that sounds academic until you look at the benchmark numbers, and then it stops sounding academic. The old TanStack Router kept all reactive state in one large object called `router.state`. Every subscription started from that top-level object, which meant that during a navigation, a component subscribed to location data and a component subscribed to match lifecycle data both received notifications from the same store update, even if only one of them actually needed to re-render.

The new model flips this around. Smaller stores are the source of truth, and `router.state` is derived from them. The router now keeps separate stores for location, navigation status, transitions, redirects, and per-match state, with active, pending, and cached matches modeled separately because they have genuinely different lifecycles. The `useMatch` hook, instead of subscribing to the big router store and then searching for the relevant match, now resolves the relevant store directly and subscribes to it.

The benchmark numbers are concrete: React navigation time went from 7ms to 4.5ms, Solid from 12ms to 8ms, and Vue from 7.5ms to 6ms. These are synthetic benchmarks on intentionally render-heavy pages designed to amplify propagation costs, so real-world gains will vary, but the direction is clear. The Solid adapter is especially interesting because it now uses native Solid signals internally instead of TanStack Store, which is both faster and reduces the bundle size for Solid users.

There is a bundle size trade-off. React and Vue builds increased by about 1 kilobyte gzipped because representing the router as several stores takes more code than one state object. Solid decreased by about 1 kilobyte. This is an honest trade and the team documented it transparently in the post.

The public API has not changed. `useMatch`, `useLocation`, and `Link` work exactly as before. This is all internal plumbing.

**Key takeaways:**
- `router.state` is now derived from smaller stores rather than being the source of truth
- `useMatch` now subscribes directly to the relevant per-match store
- Navigation benchmarks improved 35-40% across React, Solid, and Vue
- Solid adapter now uses native Solid signals, reducing its bundle size
- React and Vue bundles increased by ~1KB gzipped as a trade-off
- Public API is unchanged

**Why do I care:** Routing is one of the most frequently-triggered code paths in any React application. Shaving 2-4ms off every navigation event compounds across the lifetime of a session. More importantly, the design principle here, subscribing to the smallest possible reactive surface rather than a broad shared object, is a pattern worth studying and applying to your own state management architecture.

**Link:** [TanStack Router's New Reactive Core: A Signal Graph](https://tanstack.com/blog/tanstack-router-signal-graph)

---

## TanStack DB 0.6 Adds SQLite Persistence, Offline Support, and Hierarchical Queries

**TLDR:** TanStack DB 0.6 ships SQLite-backed persistence across browser, React Native, Expo, Node, Electron, and more. It also adds hierarchical `includes` for querying normalized data in UI-shaped trees, reactive side effects via `createEffect`, and virtual props for outbox and sync state.

**Summary:** TanStack DB has been building toward something genuinely ambitious, and version 0.6 is the release where it starts to feel like a complete client-side data layer rather than an interesting prototype. The headline feature is persistence, and the team chose SQLite as the backing store. This might seem heavyweight at first, but the reasoning is sound: a single persistence model that works across browser via WASM, React Native, Expo, Node, Electron, Tauri, Capacitor, and Cloudflare Durable Objects beats building per-environment storage adapters with divergent behavior.

The `includes` feature is the other major addition, and it's genuinely clever. All UIs are hierarchical, but most data systems hand you flat relational data and expect you to reshape it yourself. TanStack DB now lets you express hierarchical queries directly, with nested subqueries that build a single incremental query graph rather than issuing one request per row. This avoids the N+1 problem at the query layer, not through database magic, but through the client-side query engine's incremental update model. Fine-grained reactivity is preserved: the parent row doesn't re-render when child data changes, because each included field materializes as a child collection that components can subscribe to independently.

The `createEffect` primitive behaves like a database trigger operating on the result of an arbitrary live query rather than writes to a single table. Effects run incrementally on query-result deltas, which keeps memory usage low. Combined with persistence in environments like Cloudflare Durable Objects, this starts to look like a durable state engine for agent workflows. That's not hyperbole, it's a practical configuration the team explicitly describes.

Virtual props are a small feature with outsized utility. Being able to query whether a row is confirmed by sync (`$synced`) or whether the last change came from this client (`$origin`) directly in the query layer unlocks outbox views, delivery indicators, and WhatsApp-style double-tick patterns without custom state management.

One practical note: 0.6 changes how indexes work, moving from implicit to opt-in, and removes "magic return" behavior from mutation handlers in favor of explicit sync coordination. Read the migration notes before upgrading.

**Key takeaways:**
- SQLite persistence across browser, React Native, Node, Electron, Cloudflare, and more
- `includes` enables hierarchical queries with fine-grained reactivity, avoiding N+1 at the client layer
- `createEffect` is a reactive trigger that runs on query-result deltas, not raw mutations
- Virtual props (`$synced`, `$origin`) expose sync state directly in queries
- `queryOnce` adds one-shot query execution using the same API as live queries
- Indexes are now opt-in; mutation handlers require explicit sync coordination

**Why do I care:** The combination of persistence, hierarchical queries, and reactive side effects makes TanStack DB a serious candidate for local-first application architecture. The fact that it runs the same model across mobile, browser, and edge runtimes without per-environment divergence is the kind of architectural consistency that pays off when you need to debug a sync problem at 2am.

**Link:** [TanStack DB 0.6 Now Includes Persistence, Offline Support, and Hierarchical Data](https://tanstack.com/blog/tanstack-db-0.6-app-ready-with-persistence-and-includes)

---

## Next.js Experiments With a useOffline Hook

**TLDR:** A Next.js experimental pull request adds a `useOffline` hook that returns true when the app is offline, paired with automatic navigation retry when connectivity is restored.

**Summary:** This is a small but thoughtful addition to the App Router's capabilities. The offline handling behavior works by treating any `fetch()` rejection as a network error, then blocking the navigation or server action until connectivity is restored and retrying automatically. Browser `offline` and `online` events feed into a polling loop with exponential backoff. Successful fetches from other code paths can short-circuit the loop.

The `useOffline` hook is the user-facing piece of this. It returns `true` when the app is currently offline. The state is owned by a provider component in the app router, using `useState` plus `useOptimistic` so the value can update even during blocked transitions, specifically a navigation that's waiting for connectivity to return. That detail matters: showing an offline indicator while a navigation is frozen requires being able to update state outside the normal transition flow.

This is gated behind `experimental.useOffline`, so it's opt-in and not production-ready. Follow-up work is planned to allow navigations to read from stale cache entries while offline, which would be the more significant capability.

What I find interesting here is the implicit commitment to treating offline as a first-class concern in the App Router. Most web frameworks treat offline as an afterthought that service workers are supposed to solve. Handling it at the routing and data-fetching layer is a more integrated approach.

**Key takeaways:**
- Experimental `useOffline` hook returns `true` when the app detects no connectivity
- Network errors trigger automatic retry with exponential backoff polling
- Uses `useOptimistic` so the offline state can update during blocked transitions
- Gated behind `experimental.useOffline`, still in early development
- Future work will enable reading from stale cache entries while offline

**Why do I care:** Offline resilience in single-page apps has always been solved at the service worker layer, which sits outside the component model entirely. If Next.js can expose offline state directly to components, it becomes trivial to show user-facing indicators and gracefully queue actions. This is the kind of integration that makes users feel like an app works instead of wondering why their click disappeared.

**Link:** [[experiment] Add useOffline hook](https://github.com/vercel/next.js/pull/92012)

---

## How Signals Actually Work: The Push-Pull Algorithm Explained

**TLDR:** A detailed, implementation-driven explanation of how signals achieve fine-grained reactivity using a combination of eager push-based invalidation and lazy pull-based re-evaluation.

**Summary:** Signals are everywhere in frontend frameworks right now: Solid, Vue, Preact, Angular with its signals-based model, and the TC39 proposal that may bring them natively to JavaScript. Most developers can describe what signals do, but the internal mechanism is less well understood. This article fills that gap with genuine depth.

The core insight is that signals combine two complementary mechanisms. The push-based side handles invalidation eagerly: when a signal changes, it immediately notifies all downstream computed values that they are now stale. This notification is not the new value, it's just a flag saying "your cache is dirty." The pull-based side handles re-evaluation lazily: computed values only recalculate when something actually reads them, and only if they've been marked dirty first.

The auto-tracking of dependencies is the part people find most magical, and the article demystifies it clearly. When a computed function runs, it uses a global stack to record which signals and other computed values it accessed. Those become its dependencies. This is how frameworks like Solid can know exactly which signals a component depends on without you writing a dependency array, the way React requires for `useEffect` and `useMemo`.

The article connects this to a real-world trajectory: from Knockout.js in 2010 through RxJS to today's fine-grained reactive frameworks, and onward to the TC39 proposal that could standardize signals natively in JavaScript. If that proposal advances, multiple frameworks could share a common reactive primitive while retaining their own API layer.

I think the piece is honest about the limitations of the basic implementation shown, acknowledging it's naive compared to production libraries like alien-signals or preact-signals. That honesty makes it more trustworthy, not less.

**Key takeaways:**
- Signals use push (eager invalidation) combined with pull (lazy re-evaluation)
- The dirty flag cache system prevents redundant computation
- Dependency auto-tracking uses a global stack populated during computed execution
- This eliminates the need for manual dependency arrays like React's `useEffect` deps
- TC39 is working on a native Signals proposal currently at Stage 1
- alien-signals, preact-signals, and solidjs each implement this same algorithm

**Why do I care:** Understanding how signals work internally changes how you reason about performance in reactive systems. It also makes it much easier to evaluate framework trade-offs. When TanStack Router moves to alien-signals, or when Vue 3's reactivity is described as signal-based, you now know exactly what that means and why it leads to more targeted updates than subscription-based systems.

**Link:** [Signals, the push-pull based algorithm](https://willybrauner.com/journal/signal-the-push-pull-based-algorithm)

---

## Hoistable SVG Defs in React Using Portals and Context

**TLDR:** A deep-dive into colocating SVG `<defs>` elements with the React components that depend on them, using portals, context, and a shared registry to deduplicate definitions and clean up on unmount.

**Summary:** SVG definitions like `<linearGradient>`, `<marker>`, `<clipPath>`, and `<filter>` have to live in a `<defs>` element somewhere in the SVG, but they're referenced by other elements anywhere else in the document via `url(#id)`. This creates an implicit coupling that fights against React's component encapsulation model: a component can't own its own definitions because those definitions have to live in a different part of the tree.

React 19 solved an analogous problem for HTML head metadata by hoisting `<link>` and `<meta>` tags from wherever they're rendered in the component tree to the `<head>` element. This article asks: can we do the same thing for SVG defs?

The answer is yes, but it requires several React primitives working together in slightly unusual ways. A `DefsProvider` creates the context. A `Defs` component renders the actual `<defs>` DOM element and stores a ref to it in state, not a plain ref, because a plain ref doesn't trigger re-renders when set. A `DefsPortal` component portals its children into that `<defs>` DOM element using `createPortal`. The instance ID from `useId` prevents duplicate definitions when multiple instances of the same component render.

The registry piece is where it gets interesting. Because React siblings can't coordinate with each other through the component model, the solution uses a `useEffect` to register and deregister each component instance with a shared Map. The first instance of a definition wins; subsequent instances render nothing. When the last instance unmounts, the definition is removed. This is acknowledged as an abuse of `useEffect`, which is meant for synchronizing with external systems, not for observing mount/unmount as a coordination mechanism. But there's no public API into React Fiber's internal component tracking, so this is what's available.

The article offers two architectural configurations: per-SVG scoped defs for isolated SVGs, and a single global hidden SVG at the app root for maximum deduplication across all SVGs on the page.

**Key takeaways:**
- SVG `<defs>` create coupling that fights React's encapsulation model
- Portals can route definition elements into a shared `<defs>` DOM node
- A ref stored in state (not plain `useRef`) is needed to trigger consumer re-renders when the portal target mounts
- A shared registry using `useEffect` deduplicates definitions across component instances
- Two modes: per-SVG scoped defs, or a global hidden SVG for app-wide sharing

**Why do I care:** Anyone building data visualization, icon systems, or complex SVG-heavy components in React has hit this problem. The article doesn't just solve it, it walks through why each step is necessary, making it useful for understanding how React's lower-level APIs compose in non-obvious situations.

**Link:** [Hoistable SVG Defs in React](https://julesblom.com/writing/colocated-svg-defs)

---

## Making React ProseMirror Handle the Second Harry Potter Book

**TLDR:** A detailed engineering story about reducing React ProseMirror's per-keypress render cost from 15,000 React elements to 6, by eliminating position-based props and using stable ref-based position tracking with careful memoization.

**Summary:** This is one of those performance engineering articles that's honest about the compromises required, and that honesty is what makes it worth reading. React ProseMirror takes an unusual approach to integrating these two systems: instead of using ProseMirror's native view for rendering, it reimplements the rendering engine entirely in React. This gives you React state management and rendering throughout, avoiding state tearing between the two systems. It also means React is responsible for rendering potentially thousands of nodes on every keypress.

The core problem was that ProseMirror models positions as integers. Every character and node boundary increments the position by one. Type a character at the beginning of a 500-paragraph document and every subsequent paragraph gets a new position value. If those positions are props, every component after the insertion point re-renders, even with `React.memo`. With Moby Dick in the editor, that was 15,000 React elements per keypress.

The solution was to stop passing position as a prop and instead use a ref that gets mutated during render. Yes, mutated during render. The article is upfront about this being a rules violation, walks through exactly why it's dangerous in concurrent mode (an abandoned render could leave the ref in a modified state), and then explains why it's safe in this specific case: `getPos` should never be called during render in a node view context, only in event callbacks and effects, both of which run after React commits.

Combined with a key-based identity system that tracks nodes across document changes without relying on their positions, this reduces the per-keypress render cost to just the affected node and its ancestors. In practice, that's about 6 React elements instead of 15,000, and the resulting editor handles Moby Dick without perceptible lag. There's even a claim that on Firefox, this React-based implementation beats ProseMirror's native view for the same document.

**Key takeaways:**
- Passing position as a prop causes thousands of re-renders per keypress in large documents
- Replacing position props with a ref mutated during render is technically a rules violation but safe given how `getPos` is used
- A key-based identity system (React keys plugin) tracks nodes across document changes
- The final implementation renders 6 elements per keypress instead of 15,000
- Fine-grained memoization requires a stable key system to avoid unnecessary React reconciliation

**Why do I care:** Rich text editing is one of the hardest problems in frontend engineering. The solutions described here, specifically the trade-offs around ref mutation, stable keys, and the limits of `React.memo`, are applicable well beyond rich text. If you've ever hit a performance wall with deeply nested memoized components, this article gives you a real example of what breaking through that wall actually looks like.

**Link:** [Making React ProseMirror really, really fast](https://handlewithcare.dev/blog/making_react_prosemirror_really_really_fast/)

---

## How React Fiber Actually Renders Your UI

**TLDR:** A technical walkthrough of React Fiber's four-phase rendering model: Trigger, Schedule, Render, and Commit, with clear explanations of lanes, work-stealing, and how bail-out optimizations work.

**Summary:** React Fiber is one of those things that every experienced React developer knows is important but that few can explain with any precision. This article is a solid, accessible deep-dive that doesn't oversimplify the interesting parts.

The historical context helps: the pre-Fiber reconciler was recursive and synchronous. Once it started, it couldn't stop until it finished. On a 60fps display, you have 16 milliseconds per frame. If React's work takes longer than that, the frame drops and the UI feels janky. Fiber exists to solve this by breaking rendering into small units of work that can be paused, abandoned, or reprioritized.

The lane system is where things get interesting. Lanes are a 32-bit integer priority system. When you click a button and `setCount` fires, React marks that fiber with a high-priority lane and propagates that lane upward through `childLanes` to the root. During rendering, React starts at the root and uses `lanes` and `childLanes` to decide which fibers to visit and which subtrees to skip entirely. A fiber with no pending work in itself or its descendants can be skipped without traversal. This is how React achieves efficient targeted updates in deep component trees.

The priority inversion problem, where low-priority updates could theoretically starve forever if high-priority updates keep arriving, is handled through expiration times. Once an update has been delayed long enough, it gets promoted to a higher-priority lane so it eventually executes.

The distinction between the interruptible Render phase and the uninterruptible Commit phase is important and often confused. The Render phase can be paused, abandoned, and restarted. The Commit phase, where actual DOM changes happen, cannot be paused. All DOM mutations happen in one synchronous pass, which is why you never see half-applied UI updates.

**Key takeaways:**
- React Fiber implements its own stack as a linked list of fiber objects, enabling pause and resume
- The lane system is a 32-bit priority system; updates propagate lanes upward via `childLanes`
- React can skip entire subtrees where `lanes` and `childLanes` are both empty
- Low-priority updates have expiration times to prevent starvation
- The Render phase is interruptible; the Commit phase is always synchronous and uninterruptible
- Fibers store `child`, `sibling`, and `return` pointers, forming a linked traversal graph

**Why do I care:** Understanding Fiber's scheduling model explains why `startTransition` works the way it does, why `useDeferredValue` can help UI responsiveness, and how `React.memo` fits into the optimization picture. Without this foundation, you're tuning React performance by instinct rather than understanding. With it, you can make informed decisions about where to apply optimizations and why.

**Link:** [How Does React Fiber Render Your UI](https://inside-react.vercel.app/blog/how-does-react-fiber-render-your-ui)

---

## Astro 6.1 Ships Global Image Encoding Defaults and Other Polish

**TLDR:** Astro 6.1 adds codec-specific image encoding defaults for Sharp so you can configure JPEG, WebP, AVIF, and PNG settings once in your config. Also includes SmartyPants customization, React hydration fixes, and smoother mobile view transitions.

**Summary:** Astro 6.1 is a polish release more than a features release, which is exactly what you want from a framework that's trying to be stable. The image encoding defaults are the headlining addition, and they solve a real annoyance. If you're running a content-heavy site and you want consistent WebP quality settings across every image, previously you had to set those parameters on every individual `<Image />` component. Now you set them once in your Astro config and they apply globally. Per-image overrides still work and take precedence.

The SmartyPants configuration is a smaller but meaningful improvement for internationalized content. SmartyPants converts ASCII punctuation into typographic equivalents, but its defaults assume English conventions. French guillemets and German quotation marks weren't supported without disabling the whole system. Now you can configure each transformation individually.

The mobile view transitions fix is one I'm glad to see. The client router was playing its transition animations even when the browser was already providing a native visual transition, like a swipe gesture on iOS Safari. The result was a double-animation flicker on navigation. The fix detects when the browser is handling the transition natively and skips the JavaScript animation.

The React hydration fixes address conditional slot rendering and `experimentalReactChildren` mismatches. These are the kinds of bugs that show up in production in ways that are very hard to reproduce reliably, so getting them fixed in a point release matters.

Vite 8 is getting a compatibility warning now, which is the right move. Vite version conflicts are a common source of confusing build failures, and surfacing them early beats debugging them after the fact.

**Key takeaways:**
- `image.service.config` in Astro config sets global encoding defaults for JPEG, WebP, AVIF, and PNG
- SmartyPants now supports custom quote characters and dash handling for non-English content
- Mobile view transitions no longer double-animate when the browser provides its own navigation gesture
- Multiple React hydration fixes landed for conditional slots and `experimentalReactChildren`
- Vite 8 compatibility warning added at dev server startup

**Why do I care:** Astro is increasingly the go-to choice for content sites, documentation, and marketing pages in the React ecosystem. Each of these fixes and improvements directly affects production deployments. The image encoding defaults alone will save real time for teams managing large media libraries, and the hydration fixes prevent the kind of subtle client-server mismatch bugs that erode user trust silently.

**Link:** [Astro 6.1](https://astro.build/blog/astro-610/)

---

## Inertia v3 Simplifies Layout Props and Drops Lodash

**TLDR:** Inertia v3 has simplified layout props by removing the `useLayoutProps` hook in favor of direct component props, added a `withApp` callback for global plugin registration, and migrated from lodash-es to es-toolkit.

**Summary:** Inertia occupies an interesting position in the full-stack ecosystem: it lets you build Laravel or Rails backends while using React or Vue for your front-end components, without building a JSON API. Version 3 has been in beta and this post covers what's changed since the first beta based on real usage feedback.

The layout props simplification is a good call. The original beta introduced a `useLayoutProps` hook that layouts would call to declare defaults, which added indirection without much benefit. The new model passes layout props directly as component props, which is how React components normally work. Pages declare their layout and its props as a tuple, and dynamic updates still use `setLayoutProps()` for when you need to override layout state from server data.

The `withApp` callback in `createInertiaApp` gives you a hook to register global plugins or provide values before the app renders, which works in both client-side and SSR contexts. This replaces various workarounds people were using to wire up Vue or React plugins globally.

The lodash to es-toolkit migration is a welcome sign of maturity in the JavaScript ecosystem. es-toolkit is modern, properly tree-shakable, and more actively maintained. The trade-off is a raised minimum JavaScript target from ES2020 to ES2022, which should be a non-issue for any project targeting modern browsers.

Vite 8 support is included, and Vite 6 support is dropped. If you're still on Vite 6, this is another nudge to upgrade.

**Key takeaways:**
- Layout props are now direct component props, not declared via a `useLayoutProps` hook
- `setLayoutProps()` accepts an optional layout name as its first argument, replacing `setLayoutPropsFor()`
- `withApp` callback in `createInertiaApp` enables global plugin registration for both client and SSR
- Migrated from lodash-es to es-toolkit; minimum JS target raised to ES2022
- Vite 8 supported, Vite 6 dropped; new Blade components as alternatives to `@inertia` directives

**Why do I care:** Inertia is the most pragmatic way to build full-stack React apps backed by traditional server frameworks like Laravel. If your team's strength is backend development but you want React for the front-end, Inertia gets you there without maintaining a separate API contract. These v3 improvements make the developer experience more conventional and less framework-specific.

**Link:** [Inertia v3: What's Changed Since the First Beta](https://laravel.com/blog/inertia-v3-whats-changed-since-the-first-beta)

---

## Axios Was Compromised on npm: A Supply Chain Attack That Should Keep You Up at Night

**TLDR:** On March 30, 2026, two malicious versions of axios were published to npm (1.14.1 and 0.30.4), injecting a fake dependency that installed a cross-platform remote access trojan. If you installed these versions, assume your system is compromised.

**Summary:** This is the kind of incident that reminds you that the npm supply chain is a massive shared attack surface and that popularity does not equal safety. Axios has over 100 million weekly downloads. It is in the dependency tree of a substantial fraction of all JavaScript projects. Compromising even one published version for a short window reaches an enormous number of developers.

The attack was precise and well-designed. Neither malicious version contained any malicious code inside axios itself. The poisoned releases injected a fake dependency, `plain-crypto-js@4.2.1`, a package that doesn't appear anywhere in the axios source. This package's sole purpose was to run a `postinstall` script that deployed a cross-platform remote access trojan targeting macOS, Windows, and Linux. The dropper contacted a live command-and-control server, delivered platform-specific payloads, then deleted itself and replaced its own `package.json` with a clean decoy. A developer inspecting their `node_modules` after the fact would find no obvious evidence of compromise.

The staging was deliberate: the malicious dependency was created 18 hours before the poisoned axios versions were published, which suggests planning rather than opportunism. This wasn't a confused maintainer mistake. It was a targeted supply chain attack against one of JavaScript's most trusted dependencies.

The immediate action is clear: if you ran `npm install` or any package manager install that could have resolved to `axios@1.14.1` or `axios@0.30.4` between March 30 and when the packages were pulled, you need to treat your environment as compromised. Rotate credentials, audit your systems, and re-image affected machines.

The broader takeaway is less comfortable. The JavaScript ecosystem's reliance on postinstall scripts is a structural vulnerability. Packages can run arbitrary code at install time, and developers rarely audit what those scripts do. Tools like `socket.dev` and StepSecurity's own npm monitoring exist precisely to catch this class of attack, but they require opt-in that most teams haven't done.

**Key takeaways:**
- `axios@1.14.1` and `axios@0.30.4` were compromised on npm on March 30, 2026
- The malicious code was entirely in a fake injected dependency, not in axios itself
- The dependency ran a postinstall script that installed a cross-platform RAT
- The dropper deleted itself after execution, leaving no obvious forensic traces
- If you installed these versions, assume your system is compromised and rotate all credentials
- npm `postinstall` scripts represent a structural attack vector in the JavaScript ecosystem

**Why do I care:** This isn't a hypothetical. This happened. Axios is in almost every JavaScript project built in the last decade. The fact that the malicious code lived entirely in a transitive dependency that no one would think to audit makes this attack sophisticated enough to be educational. Every team should review their approach to lockfiles, automated dependency updates, and postinstall script policies.

**Link:** [axios Compromised on npm - Malicious Versions Drop Remote Access Trojan](https://www.stepsecurity.io/blog/axios-compromised-on-npm-malicious-versions-drop-remote-access-trojan)

---

## Making Turborepo 96% Faster With AI Agents, Sandboxes, and Engineering Discipline

**TLDR:** The Turborepo team reduced Time to First Task by 81-96% across repositories in eight days by combining AI coding agents with Markdown-formatted profiles, Vercel Sandboxes for clean benchmarking, and conventional engineering practices.

**Summary:** This is an honest account of what AI-assisted performance engineering actually looks like right now, including where the agents helped, where they failed, and what the human engineer had to supply that the agents couldn't.

The starting point was that building the task graph on a 1,000-package monorepo was taking around 10 seconds before any actual work started. The team's goal was a 95% reduction. They used coding agents running against a Rust codebase, which is already interesting because Rust is less common in AI training data than JavaScript or Python.

The initial unattended agents, running overnight with minimal guidance, found some real wins. They replaced an unnecessary Floyd-Warshall algorithm with a multi-source DFS, swapped a hashing library for a faster one, and reduced allocation pressure by hashing by reference instead of cloning. But they also chased microbenchmark wins that didn't translate to real-world improvements, never wrote regression tests, and never thought to benchmark Turborepo against its own source code.

The insight that changed the approach was profiling format. Chrome Trace Event Format JSON is machine-generated and hostile to both human and AI readers. The engineer added a `--profile-md` flag that generates Markdown profiles with hot functions sorted by self-time and call trees sorted by total time, all on single lines. The agent's output quality improved dramatically with the same model and same codebase. The format mattered more than the model.

The third piece was benchmarking infrastructure. As Turborepo got faster, measurement noise on a developer laptop started drowning real signal. Vercel Sandboxes, ephemeral Linux containers with no background processes, gave the team a quiet environment where benchmark-to-benchmark comparisons were reliable. A bash script automated the entire workflow: cross-compile, upload both binaries, run hyperfine, download Markdown profiles.

The resulting wins were entirely conventional engineering: parallelizing sequential I/O operations, eliminating redundant allocations, reducing syscalls, and replacing a three-syscall cache fetch with a single open call. Stack-allocated SHA-1 hashes instead of heap-allocated strings. None of these are exotic. The agents helped find them faster, but a human was evaluating proposals, writing regression tests, and deciding which changes were shippable.

**Key takeaways:**
- Turborepo 2.9 is 81-96% faster to compute its task graph, with Time to First Task dropping from 8.1s to 716ms on large repos
- AI agents found real wins unattended, but also chased meaningless microbenchmarks and never wrote tests
- Switching profiles from Chrome Trace JSON to Markdown dramatically improved agent output quality
- Vercel Sandboxes provided a low-noise benchmarking environment critical for validating small gains
- The actual optimizations were conventional: parallelization, allocation reduction, syscall elimination
- Agents improve in a codebase that already has good code; merged improvements raised the baseline for future agent sessions

**Why do I care:** This is the most realistic account of AI-assisted engineering I've read. It doesn't overclaim. The engineer was in control the entire time, choosing what to profile, which proposals to pursue, and when to change strategy. The lesson isn't "agents do the work" but "agents can help you move faster if you give them good tooling and maintain quality standards." That's a replicable workflow.

**Link:** [Making Turborepo 96% faster with agents, sandboxes, and humans](https://vercel.com/blog/making-turborepo-ninety-six-percent-faster-with-agents-sandboxes-and-humans)
