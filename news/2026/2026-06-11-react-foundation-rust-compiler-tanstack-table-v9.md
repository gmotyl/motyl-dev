---
title: "React Foundation Launches, Compiler Goes Rust, and TanStack Table V9 Arrives"
excerpt: "This week React gets a proper foundation and vendor-neutral governance, the compiler gets ported to Rust and integrated everywhere, TanStack Table V9 enters beta, and VoidZero joins Cloudflare."
publishedAt: "2026-06-10"
slug: "react-foundation-rust-compiler-tanstack-table-v9"
hashtags: "#react #frontend #javascript #reactnative #typescript #generated #en"
source_pattern: "This Week In React"
---

## Introducing the React Foundation

**TLDR:** React and React Native are moving from Meta to a new independent React Foundation with vendor-neutral governance. Amazon, Callstack, Expo, Meta, Microsoft, Software Mansion, and Vercel are founding corporate members.

**Summary:** After more than a decade, React has simply outgrown any one company. The React Foundation announcement formalizes what was already becoming obvious: this is an ecosystem project, not a Meta project. The foundation will own infrastructure like GitHub and CI, organize React Conf, and fund ecosystem work through grants and programs. Seth Webster steps in as executive director, with a board directing funds and resources.

The technical governance piece is separate and arguably more interesting. The intent is for React's technical direction to be set by the people who actually contribute to and maintain it, with no single company overrepresented. Details are being finalized with community input before a future post.

What the announcement does not address is how this plays out in practice. Meta still employs most of the core team. The founding member list is made up of companies that already have significant commercial stakes in React. Vendor-neutral governance and vendor-neutral funding are different things, and the announcement conflates them somewhat. The real test will be whether the technical governance structure has genuine veto power over decisions that affect those founding members' products.

Still, moving React to a foundation is the right call, and the fact that this is happening at all is a meaningful signal about how seriously the ecosystem is being taken.

**Key takeaways:**
- React and React Native move to a new independent foundation
- Amazon, Callstack, Expo, Meta, Microsoft, Software Mansion, and Vercel are founding corporate members
- Foundation handles infrastructure, React Conf, and ecosystem grants
- Technical governance is being designed separately, with community input
- Meta still employs most contributors — actual neutrality remains to be demonstrated

**Why do I care:** For senior frontend architects, this changes how you should think about betting on React long-term. Foundation status means stability in governance, which matters for enterprise adoption decisions. Watch the technical governance structure carefully — that's where the real power sits.

**Link:** [Introducing the React Foundation](https://react.dev/blog/2025/10/07/introducing-the-react-foundation)

---

## React Compiler Ports to Rust, Lands in OXC, Rolldown, SWC, and Bun

**TLDR:** The React Compiler is being ported from TypeScript to Rust, and the Rust port is already being integrated into OXC, Rolldown, SWC, and Bun. With 1800+ test fixtures passing at near-perfect parity, this is no longer a prototype.

**Summary:** The pull request porting the React Compiler to Rust is one of the most technically substantial things to land in the React repo in recent memory. At the time of writing, the Rust port passes 1801 out of 1803 test fixtures, with full codegen parity. That is not a rough approximation — it is the TypeScript compiler's behavior faithfully reproduced in Rust, including edge cases around function declaration shadowing, JSX intrinsic tag captures, and Hermes-specific component syntax desugaring.

The downstream integrations are moving fast in parallel. OXC has a pull request integrating the Rust compiler as a transform pass. Rolldown is running it as a pre-transform. SWC has its own integration. Bun ships it behind a flag. This coordination across the JavaScript toolchain is unusual and suggests the ecosystem is treating the Rust port as the canonical future path, not as an experiment running alongside the TypeScript version.

What the PR description mostly does not discuss is the migration story for the existing babel plugin users. The Rust port will presumably ship through these bundler integrations rather than as a drop-in babel replacement, which has implications for any project not already on Vite or Bun. The TypeScript compiler also still exists and will presumably need to stay maintained in parallel until the Rust port is considered complete.

**Key takeaways:**
- React Compiler Rust port achieves 1801/1803 test fixture parity with the TypeScript compiler
- Already integrated into OXC, Rolldown, SWC, and Bun
- Will significantly improve compile-time performance for large codebases
- Babel plugin users will need a migration path not yet fully defined
- Coordinated ecosystem adoption signals this is the long-term direction

**Why do I care:** If you're running React Compiler today on babel, watch the Rolldown and Vite integration timelines closely. The performance gains from native Rust compilation will matter at scale, but so will the migration friction.

**Link:** [[compiler] Port React Compiler to Rust](https://github.com/react/react/pull/36173)

---

## Flow for TypeScript Users in 2026

**TLDR:** Flow has converged its syntax with TypeScript, but adds match expressions, first-class component and hook types, and catches four categories of runtime crashes that TypeScript accepts in strict mode.

**Summary:** The headline of this article is that Flow now looks enough like TypeScript that you often cannot tell them apart at a glance. Keyof, readonly, unknown, indexed access types, conditional types, mapped types — all present. But the article's real argument is about the cases where they diverge, and those cases are genuinely interesting.

Four runtime crash patterns make it through TypeScript's strict mode that Flow catches. Extracting an unbound method from a class instance loses the this binding — TypeScript waves it through, Flow rejects it at the extraction site. Indirect object assignment bypasses TypeScript's excess property checks — Flow's exact-by-default object types block it. Mutable array covariance lets you push a wider type into a narrower array — TypeScript's mutable arrays are covariant, Flow's are invariant. Type guard bodies are not validated in TypeScript — you can write a guard that lies about what it checks and TypeScript will not notice.

Match expressions and first-class hook and component types are interesting additions that TypeScript does not have. The practical question is whether these justify maintaining a separate type system for a React codebase. Flow's industrial use at Meta is not in question, but the ecosystem tooling gap versus TypeScript is enormous in 2026. The article also does not address the cost of migrating between the two, or whether Flow's additional safety catches bugs that good test coverage would catch anyway.

**Key takeaways:**
- Flow syntax now closely mirrors TypeScript, lowering the learning curve
- Match expressions provide exhaustive pattern matching TypeScript lacks
- First-class component, hook, and renders types add React-specific correctness
- Four runtime crash patterns pass TypeScript strict mode but fail Flow
- Ecosystem tooling (IDE support, library types) still significantly favors TypeScript

**Why do I care:** As someone who ships TypeScript, the four crash patterns Flow catches are real. But they're also catchable through ESLint rules and careful code review. Flow's React-specific type features are compelling, but the tooling ecosystem gap makes switching hard to justify for most teams.

**Link:** [Flow for TypeScript Users in 2026](https://medium.com/flow-type/flow-for-typescript-users-in-2026-ad07ac0a2d92)

---

## Building an Active NavLink Component in Next.js

**TLDR:** A thorough walkthrough of building a production-grade NavLink for Next.js App Router, covering render props, pending states, prefix matching, aria-current, TypeScript types, flicker prevention, and cacheComponents compatibility.

**Summary:** Aurora Scharff's post covers what sounds like a small problem — highlight the current nav link — and turns it into a genuinely instructive tour of the App Router's primitives. The final component handles usePathname for active detection, useLinkStatus for pending states, render props that expose both isActive and isPending to className and children, proper aria-current attribution, TypeScript generics that preserve Next.js typed routes, an inline script to prevent the hydration flash on first paint, and Suspense boundary ownership for cacheComponents compatibility.

The render prop pattern is the interesting design choice here. React Router uses it because loaders blocked navigation and pending state was essential. In App Router, Suspense handles that, so isPending is less central. But exposing it through the same function shape creates a consistent mental model, and the article is honest about when you actually need it versus when a plain className string is enough.

The cacheComponents section is forward-looking and useful. Under the experimental cacheComponents flag, usePathname becomes a dynamic API on routes with dynamic params, which means it needs a Suspense boundary. The solution of owning the boundary inside NavLink and rendering the same inactive Link as the fallback is clean — no layout shift, no flash, no external Suspense required.

One thing the article does not fully address is the performance cost of embedding a Suspense boundary in every nav link. For most nav bars with three to eight links, it is invisible. For a sidebar with hundreds of items, it would matter.

**Key takeaways:**
- Render prop pattern exposes isActive and isPending to both className and children
- useLinkStatus reads pending state inside Link without intercepting click handlers
- aria-current attribute keeps visual state and assistive-tech state in sync
- Inline script prevents hydration flash before active class resolves
- cacheComponents requires Suspense around any component reading usePathname on dynamic routes

**Why do I care:** This is the NavLink I would write for a new Next.js project. The aria-current plus Tailwind aria-variant approach is cleaner than juggling className strings, and the cacheComponents compatibility section is exactly the kind of forward-planning that prevents a painful refactor later.

**Link:** [Building an Active NavLink Component in Next.js](https://aurorascharff.no/posts/building-an-active-navlink-component-in-nextjs/)

---

## The Best Loading States Are No Loading States

**TLDR:** Skeletons and spinners are a symptom, not a solution. Route transitions with aggressive preloading move loading back to the app level and largely eliminate component-level loading states.

**Summary:** This article makes an argument I find persuasive: the proliferation of skeletons and shimmer effects in modern React apps is not a solved problem, it is a symptom of the wrong architecture. When navigation is instant and data loads after the fact, you get N loading states to build and maintain, one per data-fetching component. The original web model had one: the browser's loading bar.

Route transitions — specifically the ability for a router to start loading data, wait for it, and then commit the navigation — move loading back to the app level. The article uses TanStack Router's loader and preloading APIs to demonstrate, but the pattern applies to any router supporting React transitions. When links preload on hover or intersection, the data often arrives before the click happens, and navigation feels instant without any loading state at all.

The diagnostic framing is sharp. Instead of reaching for a skeleton when data is missing, return null. The blank UI becomes a signal that something was not preloaded correctly. Fix the preload strategy, not the loading state.

The article is honest about the limits. Refreshes start from scratch and still need a fullscreen overlay. Local persistence through something like TanStack DB or Zero is the next step, letting most navigations — even refreshes — skip loading entirely on second visit.

What the article somewhat glosses over is that aggressive route-level data fetching can create its own problems. Overfetching data for routes the user never reaches, cache invalidation complexity, and the learning curve of thinking in loaders rather than component hooks are real tradeoffs. Suspense and React Server Components handle many of these cases differently, and the article does not engage with that alternative model.

**Key takeaways:**
- Component-level loading states are an architectural symptom, not a design requirement
- Route transitions with preloading can eliminate most loading states
- Blank UI during development is diagnostic feedback, not a UX bug
- One global loading indicator beats N component-level skeletons
- Local data persistence is the final step to making refreshes loading-free

**Why do I care:** Every React app I have worked on has a loading state problem. This is the clearest articulation I have seen of why, and the route-loader pattern is worth adopting even if you never eliminate the last loading state.

**Link:** [The Best Loading States Are No Loading States](https://jjenzz.com/best-loading-states-are-no-loading-states/)

---

## How React Server Components Integrate with Bundler

**TLDR:** A clear explanation of how RSC splits a codebase into server and client builds, how the Flight protocol represents client component references, and how bundler manifests wire them together at runtime.

**Summary:** This is the kind of deep-dive that fills in the gaps left by the official RSC docs. The Flight protocol is not JSON — it is a streaming wire format that can represent async boundaries, promises, and server-side computations incrementally. Server components render to finished elements in the stream. Client components become opaque references (like dollar-sign-L-one) that the browser fills in using separately bundled code.

The bundler split is the key insight. Under the react-server export condition, the server build replaces any file marked with use client with a stub created by registerClientReference. The stub records the component's identity without including any of its code. The client build then compiles the real implementation normally. A manifest file maps the reference identifiers in the Flight stream to actual browser chunks, giving React what it needs to hydrate client components on demand.

The article explicitly sets aside SSR and server actions for a follow-up, which means the current post is about the pure RSC rendering path without covering how the initial HTML gets generated or how mutations flow back to the server.

The explanation is clear and grounded in actual bundler mechanics, which makes it more useful than most RSC overviews that stay at the conceptual level. The missing piece is the code examples being truncated, but the prose carries the explanation without them.

**Key takeaways:**
- RSC uses a custom Flight protocol, not plain JSON, to support streaming async boundaries
- Server build replaces client component modules with reference stubs
- Client build compiles real component implementations against the browser React runtime
- A bundler-generated manifest maps Flight references to actual browser chunks
- The react-server export condition is how React ships different internals to each build target

**Why do I care:** Understanding this split at the bundler level is essential for diagnosing RSC integration bugs and for evaluating framework choices. If you're building your own RSC integration or debugging a Webpack-based setup, this is the article to read.

**Link:** [How React Server Components Integrate with Bundler](https://reactjs-maxxing.vercel.app/blog/how-react-server-component-integrate-with-bundler)

---

## When React Parent Components Need to Know Their Children

**TLDR:** A survey of patterns for child-to-parent data flow in React: Children.toArray for direct children, fake DOM portals for deep trees, shared external state for head tags, and useMatches for route-based composition.

**Summary:** The article is honest upfront: usually you should just pass data down. But the cases where you genuinely need to go the other direction are real, and the options are worth understanding.

Children.toArray works for direct children and lets a parent extract props to build its own state. It falls down completely for nested children — wrap a List.Item in a div and the parent cannot see it. React ARIA's solution to this is remarkable: a first-pass render into a fake mini-DOM that implements just enough of the DOM API for React to run, mounted via a portal, giving the parent an accurate structural picture without any real DOM cost.

For head tag management, the pattern is shared external state with a context provider. The hook updates the shared state synchronously during initialization so SSR sees the right tags, then a useEffect keeps changes in sync on the client. Unhead handles this today.

Route composition via useMatches is probably the most practical pattern for most teams. You put metadata on route handle, read it from parent routes, and get breadcrumbs, layout overrides, or any other cross-route communication without prop drilling.

The article could go further into the tradeoffs of each pattern. The fake DOM portal approach is clever but reads like a footgun if you don't understand what it's doing. The shared external state approach works but breaks React's unidirectional data flow in ways that can surprise people.

**Key takeaways:**
- Children.toArray extracts props from direct children but fails for nested children
- React ARIA renders into a fake mini-DOM via portal to handle arbitrary nesting
- Head tag libraries use shared external state updated synchronously during initialization
- React Router's useMatches enables route handle metadata for breadcrumbs and layout control
- Most of the time, passing data down is the right answer

**Why do I care:** The fake DOM portal pattern from React ARIA is one of those implementation details worth knowing even if you never write it yourself. It explains why compound components in design systems often behave correctly even with wrapper elements in between.

**Link:** [When React parent components need to know their children](https://www.jayfreestone.com/writing/updating-react-parents-in-response-to-changes-in-children/)

---

## The Problem with useEffect

**TLDR:** Almost every useEffect bug is a render loop in disguise, caused by the dependency array running more often than expected due to unstable object or function references.

**Summary:** This is a compact and accurate diagnosis of the most common useEffect failure mode. The obvious render loop — effect sets state, state triggers render, render runs effect — is easy to spot. The disguised loop is the one that survives code review: a dependency array exists, looks correct, but contains an object or array or function that gets a fresh reference on every render. React compares by reference identity, not by content, so same-value-different-reference triggers the effect on every cycle.

The fix is either stabilizing the reference with useMemo or useCallback, or depending on primitive values directly rather than wrapping them in objects. The article also correctly identifies the ESLint exhaustive-deps rule as the practical way to catch this before it ships.

The article does lean into a product pitch for React Doctor, which is a tool that analyzes useEffect usage and scores it. That part is easy to skip, but the underlying advice is sound.

What the article does not address is the broader question of whether useEffect was the right abstraction in the first place. React 19 has use for promises, server components handle most data fetching, and useSyncExternalStore handles subscriptions better than useEffect ever did. The best fix for a useEffect bug is often deleting the useEffect entirely, and the article only gestures at this at the end.

**Key takeaways:**
- Object and array dependencies get new references every render, causing hidden loops
- useMemo and useCallback stabilize references; depending on primitives avoids the problem entirely
- The react-hooks/exhaustive-deps ESLint rule catches unstable dependencies at author time
- The best fix for many useEffect bugs is removing the effect entirely
- React 19 primitives and server components eliminate many historical useEffect use cases

**Why do I care:** This is still the most common React bug I see in code review, years after the hooks introduction. The reference identity point is worth repeating until every React developer has internalized it.

**Link:** [The problem with useEffect](https://www.react.doctor/blog/the-problem-with-useeffect)

---

## TanStack Table V9: Taking Form

**TLDR:** TanStack Table V9 enters beta after a multi-year rewrite, bringing React Compiler compatibility, granular re-rendering via selectors, tree-shakable feature registration, custom extension points, and a real devtools integration.

**Summary:** Kevin Van Cott's writeup on V9 is unusually candid about what went wrong during development. The rewrite took over a year longer than expected, largely because the initial focus was on tree-shakability when the React Compiler — which shipped during development — made the existing state management model unworkable. That forced a fundamental rethink, which was ultimately solved by borrowing the signals-style store approach from TanStack Form.

The V9 state model is the most significant change. Tables now use TanStack Store under the hood, with selector-based subscriptions that let you subscribe a component to only the state slice it actually needs. Row selection changes no longer trigger re-renders in pagination controls. The API mirrors TanStack Form's Subscribe pattern deliberately.

Tree-shakable features are registered like plugins. If you don't register rowSortingFeature, you don't get sorting code and TypeScript does not expose sorting APIs. The generics for this took most of the extra year to get right, and there are still known limitations around custom feature generics that rely on declaration merging for now.

Custom features use the same system as built-in features, which means design-system table wrappers and enterprise grid packages finally have a first-class extension path. createTableHook enables reusable table configuration that mirrors createFormHook from TanStack Form.

The honest admission that tackling all problems simultaneously was a mistake is worth noting. V9 is good, but the lesson about shipping smaller improvements more frequently applies broadly.

**Key takeaways:**
- React Compiler compatibility required a complete state management rewrite using TanStack Store
- Selector-based subscriptions prevent unnecessary re-renders in large tables
- Tree-shakable feature registration means bundle size reflects what you actually use
- Custom features use the same extension API as built-in features
- createTableHook enables reusable table configuration across an app
- stockFeatures provides a V8-style migration bridge

**Why do I care:** If you're running a large data table in React, V9's selector-based rendering is the feature that matters most. Granular subscriptions at the component level can cut re-renders dramatically on tables with complex state like row selection plus pagination plus filtering.

**Link:** [TanStack Table V9: Taking Form](https://tanstack.com/blog/tanstack-table-v9-taking-form)

---

## Sätteri: Markdown Pipeline in Rust with JavaScript Plugins

**TLDR:** Sätteri is a Markdown and MDX processing pipeline with a fast Rust core and a JavaScript plugin layer, targeting the gap between raw speed and ecosystem flexibility.

**Summary:** Sätteri positions itself as the best-of-both-worlds answer to a real tension in the Markdown tooling space. Rust-based parsers are fast, sometimes dramatically so, but they cannot use the JavaScript plugin ecosystem that has grown up around remark, rehype, and the unified pipeline. Pure JavaScript pipelines are flexible but slow at scale. Sätteri puts JavaScript plugins on top of a Rust engine, with WASM for browser use.

The project is early — the website is essentially a live playground with a brief description. It is listed alongside Astro's native Markdown parsing RFC in the same newsletter context, which suggests it is part of a broader movement toward Rust-backed Markdown pipelines in the JavaScript ecosystem.

What is not yet clear is the plugin compatibility story. Whether existing remark or rehype plugins work unmodified, need adapters, or are simply not supported is a significant factor in adoption. The performance numbers advertised on the site are impressive, but the real question is whether the JavaScript plugin layer adds enough overhead to narrow the gap with pure Rust solutions.

**Key takeaways:**
- Rust Markdown and MDX engine with a JavaScript plugin layer on top
- WASM build enables browser-side processing
- Targets the gap between fast-but-inflexible Rust and slow-but-flexible JavaScript pipelines
- Plugin compatibility with existing remark/rehype ecosystem is not yet clearly documented
- Part of a broader trend toward Rust-backed tooling in the JavaScript content pipeline

**Why do I care:** For documentation sites and content-heavy applications processing large volumes of Markdown, a Rust-backed pipeline with JavaScript plugin compatibility would be a meaningful improvement. Worth watching as the ecosystem compatibility story develops.

**Link:** [Sätteri](https://satteri.bruits.org/)

---

## Motion arc(): Animate Along a Curved Path

**TLDR:** Motion's new arc() function bends element translations into curved arcs, works with layout animations and shared element transitions, and supports spring-driven bounce along the curve.

**Summary:** arc() is a small, well-scoped addition to Motion that solves a specific visual problem. When you animate an element's x and y position, it travels in a straight line. That is geometrically correct but often visually unnatural, especially for UI elements that are supposed to feel physical. arc() replaces the straight line with a configurable curve.

The API is clean. You pass arc() to transition.path alongside your normal transition configuration. The curve shape is controlled by strength, the position of peak curvature, and direction. Direction defaults to automatic — Motion picks a stable screen-space side and keeps the bulge consistent even when travel direction reverses between animation calls.

The layout animation integration is where arc() does work straight-line interpolation cannot. When elements move because of layout changes rather than explicit keyframes, the start and end points are not known in advance. arc() handles this correctly because it operates on the interpolated progress, not on fixed coordinates.

Springs work too. A spring drives the progress value past 1 and oscillates back, which means the element samples past the arc's endpoint and bounces along the curve. That is a nice interaction between the path modifier and the driving function.

**Key takeaways:**
- arc() curves element translation paths between x/y keyframes
- Works with layout animations and layoutId shared element transitions
- strength, peak, and direction options control curve shape
- Springs drive bouncy oscillation along the curved path
- rotate: true follows the arc tangent for natural element tilting during motion

**Why do I care:** Curved motion paths are the difference between UI animation that feels engineered and animation that feels considered. This is a small feature with meaningful visual impact, and the layout animation integration makes it practical for real component transitions.

**Link:** [arc() — Animate along a curved path](https://motion.dev/docs/arc)

---

## VoidZero is Joining Cloudflare

**TLDR:** VoidZero — the company behind Vite, Vitest, Rolldown, Oxc, and Vite+ — is being acquired by Cloudflare. All tools remain open-source and MIT-licensed, with the team continuing to lead development.

**Summary:** This is a significant infrastructure consolidation. VoidZero was building Void, a Vite-native deployment platform on Cloudflare, when it became clear that splitting an already small team between tooling and platform work was not sustainable. Cloudflare acquiring the team lets VoidZero focus on what it does well while Cloudflare benefits from tighter integration with the tools that now dominate modern JavaScript development.

The numbers are staggering. Vite is downloaded more than 100 million times a week. Rolldown is now the default bundler in Vite 8. Oxc powers the full toolchain including parsing, transforms, a Babel-equivalent transform layer, a minifier, Oxlint with type-aware linting, and Oxfmt with Prettier-compatible formatting. This is not a small acquisition of a peripheral tool.

Evan You is direct about the monetization problem: tooling is hard to monetize, the mixed licensing experiment with Vite+ did not feel right, and building a cloud platform alongside tooling was splitting the team unsustainably. The solution — sell Cloudflare tighter Vite ecosystem integration, maintain open source under MIT — is pragmatic.

What this means practically is that Cloudflare now has a structural incentive to make Vite deployment to their platform as smooth as possible. That is good for teams already on Cloudflare Workers or Pages. Whether it creates friction for teams on competing platforms long-term is a question worth watching.

**Key takeaways:**
- VoidZero acquired by Cloudflare; Vite, Vitest, Rolldown, Oxc, Vite+ remain MIT-licensed
- Evan You and the full team continue leading open-source projects under Cloudflare
- Vite downloads exceed 100 million per week; Rolldown is now the default Vite 8 bundler
- Acquisition ends the unsustainable split between tooling and platform development
- Cloudflare gains structural incentive to optimize for Vite ecosystem deployment

**Why do I care:** Vite is in your build pipeline. This acquisition determines who has commercial interest in Vite's direction for the foreseeable future. MIT license commitment is reassuring, but incentives matter over time. Monitor whether Cloudflare-specific optimizations start flowing faster than cross-platform improvements.

**Link:** [VoidZero is Joining Cloudflare](https://voidzero.dev/posts/voidzero-cloudflare)

---

## react-native-runtimes: Isolated Hermes Runtimes for React Native

**TLDR:** Margelo's react-native-runtimes lets you mount React components and run business logic in secondary Hermes runtimes, keeping the main JS thread free for navigation, gestures, and input.

**Summary:** React Native gives you one JavaScript runtime. When a heavy screen, a large reducer, or a data hydration job monopolizes that runtime, input and animations compete for time with rendering. react-native-runtimes adds a multi-runtime layer that lets you move expensive work to isolated secondary Hermes instances while the main runtime stays free.

The API is minimal. You wrap a component in OnRuntime with a runtime name, and Metro rewrites the JSX boundary at build time. No manual runtime registration. For full-screen routes, ThreadedScreen and threadedComponent handle the navigation integration. Runtimes can be prewarmed before navigation so there is no cold-start cost when the user arrives.

The shared state layer is the piece that makes this practical. Cross-runtime state sharing uses a Zustand-style API backed by a native C++ process-wide singleton. Reads are synchronous with no bridge round-trip. Path handles enable fine-grained subscriptions so you are not subscribing to the entire store when you only need a message count.

The requirements are strict: New Architecture, Hermes, React Native 0.76 or later. This is not a retrofit for legacy apps. The use case is also specific: you need one or two expensive features repeatedly monopolizing the main runtime. If memoization and virtualization solve the problem, they are the right answer first.

**Key takeaways:**
- Mounts React components in secondary isolated Hermes runtimes, freeing the main JS thread
- OnRuntime wrapper is transformed by Metro at build time — no manual registration
- Runtime prewarming eliminates cold-start lag for expensive screens
- Shared state uses a native C++ singleton with synchronous reads across all runtimes
- Requires New Architecture, Hermes, and React Native 0.76+

**Why do I care:** The main JS thread bottleneck is real in complex React Native apps. This is the first library I have seen that approaches the problem at the runtime level rather than the memoization level. If you have a chat screen or a media-heavy feed that jank on mount, this is worth evaluating.

**Link:** [react-native-runtimes](https://github.com/margelo/react-native-runtimes)
