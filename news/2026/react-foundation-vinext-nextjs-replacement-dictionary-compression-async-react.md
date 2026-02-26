---
title: "React Foundation Launches, Cloudflare Rebuilds Next.js with AI, and Dictionary Compression Changes the Web"
excerpt: "A packed week featuring the React Foundation under Linux Foundation, Cloudflare's vinext drop-in Next.js replacement, async React design patterns, query abstractions, AI-assisted framework migrations, and dictionary compression arriving in browsers."
publishedAt: "2026-02-25"
slug: "react-foundation-vinext-nextjs-replacement-dictionary-compression-async-react"
hashtags: "#this-week-in-react #react #frontend #nextjs #typescript #ai #architecture #performance #react-native #css #tooling #open-source #testing #generated #en"
---

## The React Foundation: A New Home for React Under the Linux Foundation

**TLDR:** React, React Native, and JSX are no longer owned by Meta. The React Foundation has officially launched under the Linux Foundation with eight platinum founding members including Amazon, Microsoft, Vercel, and Meta itself.

**Summary:**

This is one of those moments that looks ceremonial on the surface but has deep structural implications. The React Foundation officially launched on February 24, transferring ownership of React, React Native, and JSX from Meta to an independent foundation hosted by the Linux Foundation. The eight platinum founding members are Amazon, Callstack, Expo, Huawei, Meta, Microsoft, Software Mansion, and Vercel. Seth Webster will serve as executive director.

What matters here is the governance model. React's technical direction will remain independent from the foundation board, governed by a provisional leadership council composed of actual contributors and maintainers. This is the right call. Technical governance by committee of corporate representatives is how projects lose their soul. The fact that they separated these concerns from day one is encouraging.

The transition is not yet complete. Repositories, websites, and infrastructure still need to be transferred. A technical governance structure is being finalized. And they are kicking off planning for the next React Conf. The pragmatic question every architect should be asking is whether this changes anything about React's trajectory or stability. In the near term, no. In the long term, it provides a succession plan that does not depend on any single company's priorities. That is valuable insurance.

What nobody is talking about is the timing. This happens in the same week Cloudflare rebuilds the Next.js API surface from scratch. Having React under a neutral foundation makes it easier for the ecosystem to fragment at the framework layer while maintaining a stable core. Whether that is intentional signaling or coincidence, the effect is the same.

**Key takeaways:**
- React, React Native, and JSX ownership transferred from Meta to the Linux Foundation
- Technical governance remains independent from corporate board representation
- Repository and infrastructure transfer still in progress
- Provides long-term ecosystem stability independent of any single company's priorities

**Link:** [The React Foundation: A New Home for React](https://react.dev/blog/2026/02/24/the-react-foundation)

---

## Cloudflare Rebuilds Next.js with AI in One Week: Introducing vinext

**TLDR:** One Cloudflare engineer directed AI to build vinext, a drop-in Next.js replacement built on Vite, in under a week for about $1,100 in tokens. It builds up to 4.4x faster and produces bundles 57% smaller than Next.js 16.

**Summary:**

This is the story that will define the discourse for the next several months. A single engineer at Cloudflare, working with Claude, reimplemented the Next.js API surface as a Vite plugin in under a week. The result, vinext (pronounced "vee-next"), is not a wrapper or adapter. It is a clean reimplementation of routing, server rendering, React Server Components, server actions, caching, and middleware, all built on Vite. You run `npm install vinext`, replace `next` with `vinext` in your scripts, and your existing App Router code works.

The benchmarks are directional but striking. Against Next.js 16 with Turbopack on a 33-route app, vinext with Vite 7 and Rollup builds 1.6x faster, and with Vite 8 and Rolldown, 4.4x faster. Client bundles are 56-57% smaller. They have 1,700 Vitest tests, 380 Playwright E2E tests, and claim 94% coverage of the Next.js 16 API surface. It is already running on CIO.gov in production.

The most interesting technical contribution is Traffic-aware Pre-Rendering. Instead of pre-rendering every page at build time (the approach that gives large Next.js sites 30-minute builds), vinext queries Cloudflare zone analytics and pre-renders only the pages that cover 90% of traffic. For a 100,000-page site, that might be 200 pages rendered in seconds, with everything else handled by on-demand SSR and ISR.

But let us be honest about what this is. Cloudflare built a compelling alternative that deploys to Cloudflare Workers as a first-class target. Roughly 95% of vinext is pure Vite, and they claim other hosting providers could adopt it easily. But the strategic motivation is clear: reduce dependency on Vercel's toolchain for deploying React applications. The "we got it working on Vercel in 30 minutes" line is almost too perfectly positioned.

For architects, the question is not whether vinext is production-ready today (it is explicitly experimental). The question is what it means that the Next.js API surface can be cleanly reimplemented on a different build tool in a week. It suggests that the value in Next.js was always the API contract and the ecosystem, not the implementation.

**Key takeaways:**
- Drop-in replacement for Next.js built on Vite, not a wrapper or adapter
- 4.4x faster builds with Vite 8/Rolldown, 57% smaller client bundles
- Traffic-aware Pre-Rendering only builds pages that matter based on actual traffic data
- 94% API surface coverage with extensive test suite
- Experimental status, but already deployed in production on a government site
- Entire project cost approximately $1,100 in AI tokens

**Tradeoffs:**
- No static pre-rendering at build time yet
- Cloudflare Workers is the only deployment target currently
- Experimental, less than one week old, not battle-tested at scale
- Locks you into Cloudflare's ecosystem unless other providers adopt the toolchain

**Link:** [How we rebuilt Next.js with AI in one week](https://blog.cloudflare.com/vinext/)

---

## Tests Are The New Moat

**TLDR:** Daniel Saewitz argues that in the AI era, comprehensive test suites and well-documented APIs, once hallmarks of quality open source, now make it trivially easy for competitors to clone your work. Tests have become the new competitive moat.

**Summary:**

This essay arrives at exactly the right moment, written in direct response to Cloudflare's vinext project. The thesis is sharp: open-source projects that invest heavily in documentation, API contracts, and comprehensive test suites are inadvertently creating the perfect blueprint for AI-powered cloning. Cloudflare did not just read Next.js documentation. They ported tests directly from the Next.js test suite to validate their reimplementation.

The author draws a compelling parallel to SQLite, which keeps its core open source but maintains 92 million lines of closed-source tests (592x the amount of core source code). Whether you view that as hostile to open source norms or shrewd business strategy, it is a data point about where commercial open source may be heading.

The tension the author identifies is real but not new. It is the classic open-source commoditization problem, accelerated by AI. What has changed is the cost function. Before, reimplementing a framework required months of engineering effort, which served as a natural moat. Now that cost has collapsed to $1,100 in API tokens. The barriers that remain are adoption, ecosystem, community, and trust, not implementation difficulty.

What the author avoids confronting directly is the end-user perspective. If Cloudflare can build a faster, smaller Next.js alternative using Vercel's own tests as a specification, users benefit. The question is whether this dynamic, repeated across the ecosystem, creates enough financial pressure on maintainers to change how they license and distribute their work. The SQLite model might look prescient in retrospect.

**Key takeaways:**
- Well-documented APIs and comprehensive tests now serve as blueprints for AI-powered cloning
- The cost of reimplementing open-source projects has collapsed dramatically
- SQLite's closed-source test suite may become a model for commercial open source
- The remaining moats are adoption, ecosystem, and trust, not technical implementation
- Tension between open-source ideals and commercial sustainability is intensifying

**Link:** [Tests Are The New Moat](https://saewitz.com/tests-are-the-new-moat)

---

## Building Design Components with Action Props Using Async React

**TLDR:** Aurora Scharff demonstrates how to build reusable UI components (TabList, EditableText) that internalize async coordination using useTransition and useOptimistic, so consumers just pass a value and an action prop.

**Summary:**

This is a practical deep dive into what React Conf 2025 called "Async React," specifically the design layer. The core pattern is straightforward: design components accept action functions as props and run them inside transitions internally. The component owns the transition, the optimistic state, and the pending UI. The consumer passes a value and an action, and everything else is handled.

The article walks through two progressively complex examples. The TabList component starts as a basic controlled component, then gains pending state tracking via useTransition, then adds optimistic updates via useOptimistic. The EditableText component follows the same progression but adds a clever displayValue prop that can accept a function, allowing formatted display of optimistic state without the consumer needing access to internals.

What makes this valuable for teams is the naming convention: props suffixed with "Action" signal that they will run inside a transition. This is an emerging convention from the Async React Working Group, and adopting it early means your component APIs will align with where the ecosystem is heading.

The article does not address the elephant in the room, which is error handling beyond "errors bubble to error boundaries." In real applications, you often need granular error handling at the component level (showing inline validation errors, retry logic, partial failure states). The error boundary model works for catastrophic failures but can feel coarse for interactive components.

For architects evaluating React Server Components adoption, this pattern is essential. It bridges the gap between server-side data mutations and client-side optimistic UI in a way that keeps component consumers blissfully unaware of the async complexity underneath.

**Key takeaways:**
- Action props pattern: components accept async functions and run them inside transitions
- useTransition provides isPending, useOptimistic provides instant visual feedback
- Optimistic state reverts automatically on failure
- "Action" suffix naming convention signals transition-wrapped behavior
- Pattern applies to any interactive component: selects, toggles, search inputs

**Link:** [Building Design Components with Action Props using Async React](https://aurorascharff.no/posts/building-design-components-with-action-props-using-async-react/)

---

## Creating Query Abstractions with TanStack Query

**TLDR:** TkDodo explains why custom hooks are the wrong abstraction for TanStack Query configurations, and why queryOptions combined with simple object spreading is the correct, type-safe, composable approach.

**Summary:**

This is TkDodo at his best, taking a widespread pattern that everybody uses and methodically showing why it breaks down. The common approach is wrapping useQuery in a custom hook like useInvoice. It starts clean, but the moment you need to pass additional options (staleTime, throwOnError, select), you end up fighting TypeScript generics and losing type inference.

The root problem is that custom hooks tie you to a specific implementation. You cannot use a useInvoice hook with useSuspenseQuery, useQueries, or server-side prefetching. They force you to create increasingly configurable wrappers that fight against the library's type system rather than working with it.

The solution is queryOptions, a function that does nothing at runtime but provides powerful type inference. You create an invoiceOptions function that returns the shared configuration (queryKey and queryFn), and then spread it directly into whatever hook or function you need. Additional options like throwOnError or select are passed at the usage site with full type inference intact.

The insight that transforms this from a "nice tip" into an architectural principle is this: the best abstractions are not configurable. They capture the invariant parts (key and fetch function) and leave everything else to composition at the call site. This is fundamentally different from the instinct to build a single, highly configurable wrapper.

For teams with large TanStack Query codebases, this is a migration worth doing. The before-and-after difference in TypeScript ergonomics is substantial, and it eliminates an entire class of generic parameter bookkeeping that makes query code harder to maintain.

**Key takeaways:**
- Custom hooks are the wrong abstraction for sharing query configurations
- queryOptions provides full type inference without manual generic annotations
- The best abstractions capture invariants and leave configuration to composition
- queryOptions works across useQuery, useSuspenseQuery, useQueries, and imperative functions
- Object spreading at the call site is simpler and more type-safe than parameterized wrappers

**Link:** [Creating Query Abstractions](https://tkdodo.eu/blog/creating-query-abstractions)

---

## How I Used Cursor to Migrate Frameworks

**TLDR:** Kent C. Dodds migrated his 42,000-line, 330,000-word website from Remix v2 to React Router v7, along with dozens of other dependency upgrades, using Cursor's AI agents with background processing and overnight runs.

**Summary:**

This is less of a tutorial and more of a field report from someone operating at the bleeding edge of AI-assisted development. Kent had Cursor categorize his outdated dependencies by upgrade difficulty (19 easy, 42 medium, 14 hard), then systematically worked through each tier. The easy ones were trivial. The medium ones had a few hiccups. The hard ones, including Vite 5 to 7, Vitest 1 to 4, and xstate 4 to 5, each got their own focused conversation.

The most interesting part is the Remix v2 to React Router v7 migration, which he ran as a background agent overnight. He gave the agent a clear prompt, answered a couple of architectural questions, then went to sleep. The agent ran for 21 minutes, iterated with automated code review bots (BugBot and CodeRabbit), and had the migration substantially complete by morning.

What makes this credible rather than aspirational is that Kent acknowledges the prerequisites: "This only really works because I have some pretty good tests and documentation that I made when I was actively developing the project (with my bare hands, like some kind of caveman)." The tests and documentation are not optional. They are the foundation that makes AI migration possible.

The darker undercurrent is Kent's honest admission about the addictive quality of this workflow. He describes difficulty taking lunch breaks, stopping at the end of the day, or not picking up his phone during family time. "I am now always in the middle of something and it's very difficult to force myself to stop to do anything but send another prompt." This is a real occupational hazard that the industry needs to talk about more seriously.

**Key takeaways:**
- AI agents can handle major framework migrations with proper test coverage
- Background agents enable overnight, unattended migration work
- Good tests and documentation are prerequisites, not optional
- Giving agents a way to verify their own work dramatically improves results
- The addictive quality of AI-assisted development is a real occupational hazard

**Link:** [How I used Cursor to Migrate Frameworks](https://kentcdodds.com/blog/how-i-used-cursor-to-migrate-frameworks)

---

## React Router Loaders and Actions as Integration Points

**TLDR:** Sergio Xalambri argues that React Router loaders and actions should be treated as integration points, not units to test in isolation. Test your business logic separately and use E2E tests for the full flow.

**Summary:**

This is a concise but important piece about testing philosophy in React Router applications. The argument is that loaders and actions sit at the boundary between the HTTP layer and your application logic. Testing them in isolation means mocking authentication, database access, validation, and external APIs, which quickly becomes a maintenance nightmare.

The alternative is to test business logic (your User model, validation functions, auth helpers) in isolation where they are easy to test, and use Playwright E2E tests for the integration of the HTTP layer with those components. The loaders and actions themselves become thin integration glue that is implicitly tested through both layers.

This aligns with a broader principle in software architecture: test at the boundaries where your code meets external systems, and test your domain logic in isolation. The glue code in between is verified by both sets of tests. For teams drowning in mocked-up loader tests that break every time they refactor, this reframing could save significant maintenance overhead.

**Key takeaways:**
- Loaders and actions are integration points, not isolated units
- Test business logic (models, validation, auth) in isolation
- Use E2E tests (Playwright) for full HTTP-to-response flow verification
- Avoid mocking HTTP layer dependencies in loader/action tests
- Thin integration glue is implicitly tested by both layers

**Link:** [React Router Loaders and Actions as Integration Points](https://sergiodxa.com/articles/react-router-loaders-and-actions-as-integration-points)

---

## Removing Next.js Taught Me Why Frameworks Are Still Essential Even for AI

**TLDR:** A developer stripped Next.js from a project and rewrote it in plain HTML/JS with AI assistance, only to discover that framework conventions serve as critical "instructions for AI" that prevent code organization drift.

**Summary:**

This article provides the perfect counterpoint to the "AI makes frameworks unnecessary" argument. The author experimentally de-frameworked a Next.js project, replacing its router, image optimization, server-side rendering, and routing with plain HTML/JS. Claude Code handled the conversion smoothly. But by day three, the problems started: routing definitions appeared in inconsistent locations, API client code was scattered, and file organization drifted every time the agent generated new code.

The core insight is that framework conventions serve a dual purpose. For humans, they reduce cognitive load. For AI agents, they provide explicit, enforceable rules about where code goes. Without the constraint that "pages live in app/[name]/page.tsx," the agent makes its own judgment about file placement every time, and that judgment varies across sessions.

The author tried using .cursorrules and CLAUDE.md to encode these conventions, but found they lack the "enforcement power" of actual framework conventions. The agent refers to them but does not follow them 100% of the time. Framework conventions baked into the toolchain provide a structural constraint that custom documentation cannot match.

This reframes the value proposition of frameworks entirely. In the AI era, frameworks are not primarily about providing routing or state management utilities (AI can write those). They are about providing a shared structural language that both humans and AI agents can follow consistently. The more AI agents participate in development, the more valuable explicit, enforceable conventions become.

**Key takeaways:**
- Framework conventions function as "instructions for AI," not just human cognitive aids
- Without structural constraints, AI agents produce inconsistent file organization across sessions
- Custom rules in CLAUDE.md lack the enforcement power of framework conventions
- The value of frameworks is shifting from utility provision to convention enforcement
- Hybrid human-AI teams need explicit, structural rules more than all-human teams did

**Link:** [Removing Next.js Taught Me Why Frameworks Are Still Essential Even for AI](https://zenn.dev/smartvain/articles/coding-agent-kills-framework-nextjs-reverse-truth?locale=en)

---

## React's useTransition: The Hook You're Probably Using Wrong

**TLDR:** useTransition causes two renders (one immediate with isPending=true, one deferred), is designed for CPU-bound work not network requests, and should never wrap the input state itself, only the expensive derived state.

**Summary:**

This guide from Nutrient clears up the most common misconceptions about useTransition. The key mechanism people miss is that it causes a double rerender: an immediate high-priority render where isPending becomes true, followed by a deferred lower-priority render where your actual state updates land. React's lane scheduling system can interrupt the deferred work if higher-priority updates arrive (like another keystroke).

The classic pattern is search-as-you-type: setQuery(value) runs immediately outside the transition to keep the input responsive, while setResults() inside the transition handles the expensive filtering. If the user types again before filtering completes, React abandons the in-progress transition and starts fresh. This is fundamentally different from debouncing, which adds an artificial delay before any work starts.

The article draws a clear line between useTransition and useDeferredValue. Use useTransition when you control the state setter and need isPending. Use useDeferredValue when the value comes from props you do not control. The advanced pattern of placing useTransition in a Context provider to centralize transition logic across multiple consumers is particularly useful for applications with global filter state.

The critical anti-pattern: do not use useTransition for network requests. It does not wait for promises. The transition completes immediately while the fetch is still in flight, making isPending meaningless. For async operations, use Suspense with data fetching libraries.

**Key takeaways:**
- useTransition produces two renders: immediate (isPending=true) and deferred
- Use for CPU-bound work only, never for network requests
- Keep input state outside the transition, wrap only derived/filtered state
- useDeferredValue is the right choice when you do not control the state setter
- Measure with React DevTools Profiler before adding transitions (they have overhead)

**Link:** [React's useTransition: The hook you're probably using wrong](https://www.nutrient.io/blog/react-usetransition-guide/)

---

## Next.js Guides: AI Coding Agents

**TLDR:** Next.js now ships version-matched documentation inside the next package at node_modules/next/dist/docs/, and generates AGENTS.md and CLAUDE.md files to direct AI coding agents to accurate, up-to-date API references.

**Summary:**

This is a quiet but significant move in the developer tooling space. Starting with Next.js v16.2.0, the framework bundles its own documentation inside the npm package. AI coding agents (Claude Code, Cursor, GitHub Copilot) automatically read the generated AGENTS.md file, which directs them to these bundled docs instead of relying on potentially stale training data.

The practical benefit is version accuracy. When an agent writes Next.js code, it references documentation that matches your installed version exactly. No network request, no external lookup, no risk of the agent hallucinating APIs from a different version. The AGENTS.md file is intentionally minimal: one instruction to read the bundled docs before writing code.

This sets a precedent that other frameworks will likely follow. The pattern of shipping machine-readable documentation alongside your library, specifically formatted for AI agents, is going to become standard practice. It also validates the AGENTS.md convention that has emerged across the ecosystem. Vercel has published benchmark results showing how bundled docs and AGENTS.md improve agent performance on real-world Next.js tasks.

**Key takeaways:**
- Next.js bundles version-matched docs inside node_modules/next/dist/docs/
- AGENTS.md and CLAUDE.md are auto-generated by create-next-app
- Agents read bundled docs instead of relying on training data
- Sets a precedent for frameworks shipping AI-readable documentation
- Available in Next.js v16.2.0-canary.37 and later

**Link:** [Guides: AI Coding Agents](https://nextjs.org/docs/app/guides/ai-agents)

---

## Dictionary Compression Is Finally Here, and It's Ridiculously Good

**TLDR:** Dictionary compression with Zstandard and Brotli is now shipping in Chrome and Node.js, enabling up to 90% reduction in JavaScript bundle transfer sizes for returning users by using previous responses as compression dictionaries.

**Summary:**

This might be the most consequential infrastructure article of the week. Dictionary compression allows the server to compress data using a dictionary known to both sides, meaning the compressed output references the dictionary rather than including the original data. For JavaScript bundles that change incrementally between deployments, this means you are effectively transmitting only the diff.

The numbers are staggering. YouTube's 10MB JavaScript bundle, normally compressed to 1.8MB with Brotli, drops to 172KB (90% smaller) when using the previous week's version as a dictionary. Google search results HTML shrinks 50% for returning users. Amazon product listings compress 60-70% better than plain Brotli with a custom dictionary.

The implementation uses HTTP headers for coordination. The server sends `Use-As-Dictionary: match="/js/bundle.js"` to tell the browser to save the response as a dictionary. On the next visit, the browser sends an `Available-Dictionary` header with the SHA-256 hash. If the server has a matching version, it compresses against that dictionary and sends the tiny result. The whole thing is opt-in, backward-compatible, and same-origin only (solving the privacy concerns that killed the earlier SDCH effort).

Currently supported in Chrome 130+ (about 70% of web clients), with Safari and Firefox having public plans to implement. Node.js v24.6+ and v22.19+ include built-in Zstandard support. The article includes a complete Express.js implementation that architects can use as a starting point.

The important caveat the author raises: this only reduces network transfer size. Parse and execution time for your enormous JavaScript bundle remains unchanged. This is not a license to ship more JavaScript.

**Key takeaways:**
- Dictionary compression reduces JS bundle transfer by up to 90% for returning users
- Uses HTTP headers (Use-As-Dictionary, Available-Dictionary) for automatic coordination
- Same-origin only, backward-compatible, opt-in on both sides
- Supported in Chrome 130+, Node.js v24.6+, with Safari and Firefox support incoming
- Does not reduce parse/execution time, only network transfer size
- Google, Pinterest, Notion, and Shopify already deploying in production

**Tradeoffs:**
- Only Chrome-based browsers currently (approximately 70% of web traffic)
- Requires storing old bundle versions for dictionary lookup
- Custom dictionary training adds complexity for non-delta use cases
- Additional server processing time for dictionary-based compression

**Link:** [Dictionary Compression is finally here, and it's ridiculously good](https://httptoolkit.com/blog/dictionary-compression-performance-zstd-brotli/)

---

## Oxfmt Beta: Prettier-Compatible Formatter at 30x Speed

**TLDR:** Oxfmt, the Rust-powered code formatter from the OXC project, has reached beta with 100% Prettier JavaScript/TypeScript conformance, 30x faster performance, and support for 20+ file formats including built-in Tailwind CSS class sorting.

**Summary:**

The OXC toolchain continues its systematic campaign to replace JavaScript tooling with Rust-powered alternatives. Oxfmt has reached beta with a claim that would have seemed absurd two years ago: 100% compatibility with Prettier's JavaScript and TypeScript conformance tests, at 30x the speed and 3x faster than Biome.

Since the December alpha, the feature list has expanded considerably. Oxfmt now formats 20+ file types (JS, TS, JSON, YAML, TOML, HTML, Vue, CSS, SCSS, Markdown, MDX, GraphQL, and more), has built-in Tailwind CSS class sorting (eliminating the need for prettier-plugin-tailwindcss), built-in import sorting with configurable groups, and automatic package.json field sorting. It also handles embedded language formatting in template literals, covering styled-components, styled-jsx, and Angular component templates.

The migration path from Prettier is designed to be frictionless: `pnpm add -D oxfmt && pnpm oxfmt --migrate prettier && pnpm oxfmt`. One command to install, migrate config, and reformat. They even provide a copy-paste prompt for AI coding assistants to handle the migration.

The adoption list is notable: Vue.js core, Vercel Turborepo, Hugging Face, Sentry JavaScript SDK. These are not experimental projects. For teams still running Prettier, the question is becoming less "should we switch" and more "when should we switch." The 100% conformance claim removes the main barrier, which was formatting differences during migration.

**Key takeaways:**
- 100% Prettier JS/TS conformance, 30x faster, 3x faster than Biome
- Formats 20+ file types with a single tool
- Built-in Tailwind CSS class sorting, import sorting, and package.json sorting
- One-command migration from Prettier
- Already adopted by Vue.js core, Vercel Turborepo, Sentry, and others
- Node.js API available for programmatic usage

**Link:** [Oxfmt Beta](https://oxc.rs/blog/2026-02-24-oxfmt-beta)

---

## CSS border-shape: The Future of Non-Rectangular Web Elements

**TLDR:** A new CSS property, border-shape, redefines the geometry of an element's border box so that backgrounds, borders, outlines, and box shadows all follow custom shapes. Currently testable in Chrome Canary 146+.

**Summary:**

Una Kravets walks through border-shape, an upcoming CSS primitive from the CSS Borders and Box Decorations Module Level 4. Unlike clip-path which masks content, border-shape actually redefines the element's box. Background, border-image, focus outline, and box-shadow all follow the new geometry. This is the difference between cutting a shape out of cardboard and actually building a shaped box.

The practical implications are immediate. Tooltips with real borders and shadows (not the pseudo-element triangle hack), chevron navigation with actual geometry instead of z-index layering, and scalloped borders that were previously only possible with Houdini paint worklets. The article includes interactive demos for each use case, including a tooltip builder with configurable arrow position, height, width, and border radius.

The property accepts basic shapes (circle, ellipse, polygon), the shape() function (part of Interop 2026), and SVG-style path strings. Combined with anchored container queries, border-shape enables tooltips that dynamically adjust their arrow position based on their anchor element.

This is currently Chrome Canary only behind a flag. But given its inclusion in the CSS Level 4 spec and Interop 2026, broader browser support is on the roadmap. For teams building design systems, this is worth tracking as it will eventually eliminate a significant amount of hack-based shape implementation.

**Key takeaways:**
- border-shape redefines the element's box, not just a mask
- Backgrounds, borders, outlines, and shadows all follow the custom shape
- Eliminates pseudo-element hacks for tooltips, chevrons, and decorative borders
- Works with shape(), path(), and basic shape functions
- Currently Chrome Canary 146+ with experimental flag

**Link:** [border-shape: the future of the non-rectangular web](https://una.im/border-shape/)

---

## Sprites on the Web: A CSS-Only Animation Technique

**TLDR:** Josh Comeau explains how to implement sprite-based animations using CSS object-fit, object-position, and the steps() timing function, showing when sprites are the right choice over procedural animations.

**Summary:**

Josh Comeau delivers a characteristically thorough walkthrough of sprite-based animation on the web. The technique uses a single image containing all animation frames in a strip, displayed through an img tag with object-fit: cover and object-position to control which frame is visible. The CSS steps() timing function with jump-none flips between frames discretely rather than sliding smoothly.

The article goes beyond the mechanical "how" to address the critical "when." The Twitter like-button story from 2015 is presented as context, but Comeau pushes back on using sprites for performance reasons in 2026. Modern devices can handle procedural animations with 14+ elements without breaking a sweat. The real value of procedural animation is variety: particles can be randomly generated, making each interaction feel different. A sprite replays the same video every time.

Where sprites genuinely shine is for pixel-art-style animations: characters walking, items bouncing, decorative elements with hand-drawn frames. Comeau's cat sprite from a generative art project demonstrates how sprites can be made dynamic by switching between different sprite sheets (walking, sleeping) and varying animation-duration for breathing effects.

The step-position detail (jump-none vs. the default jump-end) is a subtle but important CSS concept that affects whether your animation includes the final frame. For looping sprite animations, jump-none is what you want.

**Key takeaways:**
- CSS sprites use object-fit, object-position, and steps() timing function
- steps(N, jump-none) includes the final frame in looping animations
- Sprites are best for pixel-art and hand-drawn frame animations
- Procedural animations are preferable when variety and randomness matter
- Modern devices no longer need sprites for performance optimization

**Link:** [Sprites on the Web](https://www.joshwcomeau.com/animation/sprites/)

---

## React Native Comes to Meta Quest

**TLDR:** React Native now officially supports Meta Quest VR devices, running on Meta Horizon OS (an Android-based OS) with Expo Go available on the Meta Horizon Store for rapid development iteration.

**Summary:**

React Native's platform expansion continues with official support for Meta Quest devices. Since Meta Horizon OS is Android-based, existing Android tooling, build systems, and debugging workflows work with minimal changes. The development workflow is familiar: create an Expo project, start the dev server, open Expo Go on the headset, scan the QR code, and iterate with live reloading.

The expo-horizon-core plugin handles Meta Quest-specific configuration: Horizon app ID, default panel dimensions, supported devices (Quest 2, Quest 3, Quest 3S), and head tracking settings. Product flavors in build.gradle separate mobile and Quest builds, so you can maintain a single codebase targeting both.

The key differences from mobile development are input-related. Quest uses controllers and hand tracking instead of touch, making interactions more like pointer/hover desktop interactions. UI elements need larger hit targets, increased spacing, and clear focus states. Libraries that assume touch-only input or depend on Google Mobile Services need adaptation.

For teams already building React Native apps, the barrier to entry is remarkably low. The development model is nearly identical to Android. The bigger question for architects is whether VR application demand justifies the platform-specific UX work needed to make mobile-designed interfaces comfortable in a head-mounted display.

**Key takeaways:**
- React Native on Meta Quest uses existing Android tooling with minimal changes
- Expo Go available on Meta Horizon Store for rapid development
- expo-horizon-core plugin handles platform-specific configuration
- Input model is pointer-based (controllers/hand tracking), not touch
- Most React Native libraries work if they do not assume mobile-only hardware
- Single codebase can target both mobile and Quest via product flavors

**Link:** [React Native Comes to Meta Quest](https://reactnative.dev/blog/2026/02/24/react-native-comes-to-meta-quest)
