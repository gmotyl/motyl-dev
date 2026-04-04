---
title: "Pretext Fixed Text Measurement, EmDash Wants to Replace WordPress, and More"
excerpt: "A pure TypeScript library achieves 500x faster text measurement than the browser, Cloudflare ships a serverless WordPress successor built on Astro, and we dig into shimmer skeletons, image preloading options, and Inertia.js v3."
publishedAt: "2026-04-04"
slug: "pretext-fixed-web-emdash-wordpress-successor"
hashtags: "#uidev #javascript #typescript #react #webdev #frontend #css #performance #generated #en"
source_pattern: "ui.dev"
---

## Pretext: A TypeScript Library That Outperforms the Browser at Text Measurement

**TLDR:** Former React Core team member Cheng Lou released Pretext, a pure TypeScript library that measures multiline text layout without touching the DOM. It achieves roughly 500x faster performance than browser-native layout operations for scenarios like virtualized lists and masonry grids.

**Summary:** The problem Pretext solves has existed since the early days of the web. Whenever a browser needs to determine how tall a paragraph is or where to break a line, it triggers a layout reflow, recalculating the position and geometry of potentially every element on the page. For 30 years, this has been one of the most expensive operations a browser can perform, and it has been essentially unavoidable when building things like virtualized lists, masonry layouts, or anything that needs to ask about text height before rendering.

Cheng Lou's solution involves a two-step API that sidesteps the DOM entirely. The first function, called prepare, splits text into segments, measures each segment's pixel width using the Canvas API which avoids triggering reflow, and caches the results. The second function, called layout, then computes line breaks and total height through pure arithmetic at any container width with no browser involvement required. The result is that processing 1,000 items drops from roughly 94 milliseconds with several dropped frames down to about 0.05 milliseconds. That is not a rounding error.

What makes this technically interesting is that Cheng calibrated the line-break algorithm by running AI coding agents against real browser outputs continuously for weeks. The library supports all languages including emojis and mixed bidirectional text, handles browser quirks, and offers a second API surface for manually laying out paragraph lines, enabling rendering to Canvas, SVG, WebGL, and eventually server-side. There is also an experimental inline-flow sidecar for mixed inline runs with atomic pills like chips or tags.

The caveats are worth noting. Pretext currently targets the common text setup with standard word-break and white-space behaviors. The system-ui font is unsafe for layout accuracy on macOS, so you need a named font. And of course, you need to keep the font configuration in sync between your CSS declarations and what you pass to the library. These are real constraints, not deal-breakers.

What I find genuinely fascinating here is not just the performance number. It is the philosophical point it makes. The browser's text measurement API was built for rendering, not querying. When you separate the concerns, pure math beats a layout engine by two orders of magnitude. Sebastian Markbage apparently planted the seed for this architecture a decade ago. It took this long to ship because it is genuinely hard to get right across all languages and edge cases.

**Key takeaways:**
- Pretext uses Canvas measureText for segment widths and then pure arithmetic for layout, completely avoiding DOM reflow
- The prepare/layout split means you only pay the measurement cost once and can reuse it across container width changes (e.g., window resize)
- 500x performance improvement for text-heavy virtualized lists is a real number, not a marketing figure
- The library supports bidirectional text, emoji, and complex scripts, not just ASCII
- Available on npm as @chenglou/pretext

**Why do I care:** If you are building virtualized lists, you already know the pain. Every library in this space has hacks around text height estimation. Pretext removes the guesswork entirely. The fact that it came from someone who crawled through the layout engine specs and used AI iteration against real browser outputs to get the algorithm right is the kind of foundational work that tends to outlive frameworks. I would pay close attention to how quickly this gets adopted by virtualization libraries.

**Link:** [GitHub - chenglou/pretext](https://github.com/chenglou/pretext)

---

## EmDash: Cloudflare's Serverless Spiritual Successor to WordPress

**TLDR:** Cloudflare released EmDash, a serverless CMS built entirely in TypeScript on top of Astro, designed as a modern replacement for WordPress. The headline feature is a plugin security model where each plugin runs in an isolated Cloudflare Worker with explicitly declared capabilities, eliminating the fundamental security problems of the WordPress plugin architecture.

**Summary:** WordPress powers over 40 percent of the internet and will turn 24 years old this year. That is both a testament to open source resilience and a description of a system architected before AWS EC2 existed, let alone serverless compute. Cloudflare spent two months having AI coding agents rebuild it from scratch, and the result is EmDash, now available as an MIT-licensed v0.1.0 preview on GitHub.

The security story is the most substantive argument for EmDash's existence. The WordPress plugin architecture gives every plugin direct access to the database and filesystem. Ninety-six percent of security issues for WordPress sites originate in plugins, and 2025 saw more high-severity vulnerabilities in the WordPress ecosystem than the previous two years combined. EmDash addresses this at the architecture level: each plugin runs in its own Dynamic Worker isolate and communicates with the CMS only through explicitly declared capabilities. A plugin that wants to send an email after a post is published must declare the specific hooks and permissions it needs in its manifest. It cannot talk to external networks unless it also declares the exact hostname. The platform can enforce rules about what permission scopes are allowed before installation even happens, which is closer to an OAuth flow than to the current WordPress "trust and pray" model.

This security model has a structural side effect that matters for the marketplace ecosystem. Because plugin code runs independently in a secure sandbox, a plugin author can distribute closed-source plugins without sharing code. The current WordPress GPL licensing situation, where plugins must carry the GPL because they are so intertwined with WordPress core, creates the centralized marketplace dependency that makes plugin businesses difficult. EmDash plugins can carry any license, which opens the ecosystem to different commercial models.

Under the hood, EmDash is powered by Astro for theming, uses passkey-based authentication by default, includes a built-in MCP server for AI agent management, supports the x402 payment protocol for content monetization, and can import existing WordPress sites via WXR export. The CLI, MCP server, and Agent Skills are clearly designed with AI-driven workflows in mind. Whether that is a strength or a liability depends on how you feel about AI agents managing your CMS.

The things to be skeptical about: this is a v0.1.0 preview built by AI agents over two months. That is fast, and fast carries risk. The Astro dependency means your theming story is tied to Astro's trajectory. The serverless-first architecture is great for Cloudflare's platform business and genuine for scale-to-zero use cases, but it also means you are reasoning about cold starts and isolate lifecycle in a way WordPress never required. The WordPress import path is promising but real content migrations are never as clean as the demo.

**Key takeaways:**
- EmDash plugins run in isolated Dynamic Workers with capability-based permissions, not shared execution contexts
- MIT licensed, no WordPress code used in its construction
- Built on Astro for theming, TypeScript throughout
- Includes x402 support for per-request content monetization aimed at AI agent clients
- v0.1.0 preview; deploy to Cloudflare or any Node.js server

**Why do I care:** The WordPress plugin security crisis is real and has been for years. A CMS that bakes capability isolation into the plugin model at the architecture level rather than bolting it on after the fact is worth taking seriously, even at v0.1.0. I am more cautious about the "rebuilt by AI agents in two months" part of the story. That framing is a marketing angle, but it is also a description of a codebase that needs significant real-world hardening. Follow it, contribute if you care about open CMS tooling, but do not migrate a production site until it has more mileage.

**Link:** [Introducing EmDash — the spiritual successor to WordPress that solves plugin security](https://blog.cloudflare.com/emdash-wordpress/)

---

## Build Your Own Shimmer Skeleton That Never Goes Out of Sync

**TLDR:** Neciu Dan walks through building a shimmer skeleton loader that derives its layout from the real component at runtime rather than maintaining a separate hand-crafted skeleton component. The approach uses DOM measurement via getBoundingClientRect and React's useLayoutEffect to generate perfectly synced shimmer blocks automatically.

**Summary:** The standard approach to skeleton loaders is creating a parallel component for every real component you build. A UserCard gets a UserCardSkeleton. You hardcode widths, heights, and border radii as approximations of the real layout. Then six months later someone adds a badge to the card and the skeleton is quietly wrong until someone notices. This is the maintenance trap that the article is trying to escape.

The alternative explored here starts with a simple insight: the browser already knows the exact dimensions of every DOM element. Instead of describing what the skeleton should look like, you render the real component with mock data, hide the text using color transparent rather than opacity or visibility hidden, measure the leaf elements using getBoundingClientRect, and overlay absolutely positioned shimmer blocks at those exact coordinates. Color transparent is important because it preserves the component's background, border, and shadow while hiding text, so the container styling renders correctly. Opacity zero would kill everything.

The measurement step targets leaf elements: images, headings, paragraphs, buttons. Container divs are deliberately excluded because they are structural, not visual. The computed border-radius is stolen from each element via getComputedStyle so circular avatars get circular shimmer blocks. Text elements without an explicit border-radius get a subtle 4px fallback to avoid harsh rectangles. The whole measurement runs inside useLayoutEffect so it fires synchronously after DOM updates but before the browser paints, preventing any flash of the invisible-text version.

The article is honest about the tradeoffs. Block-level elements stretch to full width inside flex containers, so text elements may need width: fit-content in the component CSS. Images without explicit dimensions collapse to zero before load. Async components like those using Recharts ResponsiveContainer may not be fully laid out when the measurement fires. Window resize during loading can leave shimmer blocks at stale positions. None of these are fatal, but they require attention.

The thing the article underweights is that "the real component is the skeleton" only works cleanly when your component accepts data as props. Components that fetch their own data need an additional guard against making API calls during the measurement phase. That is a non-trivial constraint in a world where component-level data fetching is common. The mock data design also requires ongoing thought: if your name field typically holds 10-20 characters, your mock should too, or the shimmer block will be the wrong width.

**Key takeaways:**
- Measure the real component's DOM elements instead of maintaining a separate skeleton component
- Use color: transparent (not opacity: 0 or visibility: hidden) to hide text while preserving container styling
- useLayoutEffect prevents the flash of invisible-text content before shimmer blocks appear
- getBoundingClientRect gives exact pixel positions; subtract container rect for correct absolute positioning
- The shimmer-from-structure library implements this pattern with configurable colors and a provider API

**Why do I care:** Every team I have worked with has the out-of-sync skeleton problem. The insight that the browser already knows the layout is obvious in retrospect and genuinely useful. The implementation is approachable enough to drop into a project in an afternoon. My reservation is that this works best for prop-driven components, and modern React apps increasingly reach for data-fetching hooks inside components. Worth understanding the constraints before adopting it wholesale.

**Link:** [Build your own shimmer skeleton that never goes out of sync](https://neciudan.dev/lets-build-dynamic-shimmer-skeletons)

---

## Your Options for Preloading Images with JavaScript

**TLDR:** Alex MacArthur surveys five different approaches to preloading images in JavaScript, from the classic new Image() technique to the Cache API and fetch(), explaining where each one succeeds and where it quietly fails depending on server caching headers.

**Summary:** The article begins with a concrete scenario: a comment box that supports image drag-and-paste, where the uploaded image should be preloaded immediately so it snaps in instantly when the comment is submitted rather than loading visibly after mount. Simple enough problem, but the solution space turns out to be surprisingly nuanced.

The most common advice is to instantiate a new Image object and set its src, which triggers an immediate download and caches the result. This works reliably when the server allows caching, but falls apart when the image comes back with a Cache-Control no-store header. In that case, two requests go out to the same URL and the rendering lags visibly. This is not a contrived edge case; it depends entirely on what the server sends.

The more reliable approach is injecting a link element with rel="preload" and the appropriate as attribute into the document head. This bypasses the HTTP cache entirely and stores the resource in the browser's dedicated preload cache, which is checked first when the image element eventually needs to render. One quirk: link elements injected via JavaScript get low fetch priority by default, so you need to explicitly set fetchPriority to high to match the behavior of a declarative preload in the HTML head. The browser is also smart enough that if the image is requested before preloading finishes, it waits for the existing request rather than firing a new one.

The remaining three approaches, a hidden div with a CSS background image, the Cache API, and the Fetch API, each have niche use cases. The hidden div trick works but only if you use visibility hidden rather than display none, since display none removes the element from document flow and the browser never fetches the background image. The Cache API gives you explicit control over storage and cleanup but requires managing cache lifecycle yourself. The Fetch API provides response access and control without cache management responsibility but is still subject to the server's Cache-Control headers.

What the article leaves unaddressed is the interaction between preloading and responsive images. The moment you introduce srcset and sizes, the calculation of which image to preload becomes dependent on viewport dimensions and device pixel ratio, which the link element supports via the imagesrcset and imagesizes attributes. If you are preloading responsive images, the naive new Image approach will likely fetch the wrong variant.

**Key takeaways:**
- new Image() works well when the server allows caching; fails silently when Cache-Control is no-store
- link rel="preload" uses a separate preload cache that is immune to no-store headers; set fetchPriority="high" when injecting via JavaScript
- Hidden div with backgroundImage works, but only with visibility: hidden, not display: none
- Cache API provides the most explicit control but requires manual cleanup
- fetch() is convenient for short-term in-memory use but inherits the server's caching constraints

**Why do I care:** This is one of those areas where the obvious approach works 95 percent of the time and fails in ways that are hard to reproduce in development. Understanding that link rel="preload" uses a separate cache from the HTTP cache is the kind of detail that saves you from a confusing bug in production. The article is practical and honest about the tradeoffs.

**Link:** [Your options for preloading images with JavaScript](https://macarthur.me/posts/preloading-images/)

---

## Inertia.js 3.0: Simpler SSR, No More Axios, and React 19 Required

**TLDR:** Inertia.js 3.0 is a major release that removes Axios in favor of a built-in XHR client, makes SSR work out of the box during development without a separate Node.js server, and introduces optimistic updates, standalone HTTP requests via useHttp, and layout props. React 19 and Svelte 5 are now required.

**Summary:** Inertia.js has always occupied an interesting architectural space: it lets you build single-page application experiences in Laravel without writing a separate API, using server-side routing with client-side rendering. Version 3.0 is described as a focus on simplicity and developer experience, and the most visible simplification is around SSR setup.

Previously, running SSR in development meant separately building the SSR bundle and starting a Node.js server alongside your Laravel process. With the new optional Vite plugin, running the standard dev command handles everything automatically. The separate server is only required for production deployments. This is a genuine quality-of-life improvement for anyone who has wrestled with the two-process development workflow.

Dropping Axios is the other headline change. Inertia now ships its own built-in XHR client, which reduces bundle size and removes a dependency. For most applications this requires no changes because Inertia's HTTP layer was always an implementation detail. If you were using Axios interceptors in Inertia's configuration, those can be migrated directly to the built-in interceptor API. If your application code imports Axios as a standalone dependency, you just install it separately. The qs and lodash-es packages were also removed from the core bundle; same story, install them directly if you use them.

The new features are worth enumerating. The useHttp hook enables standalone HTTP requests that participate in Inertia's request lifecycle, which is useful for non-navigation requests that still need Inertia's error handling. Optimistic updates now work with automatic rollback, which reduces the boilerplate for optimistic UI significantly. Layout props let you share data between pages and layouts without duplicating it in every page component. Nested prop types work inside closures and nested arrays, and partial reloads support dot-notation for targeting nested props.

The breaking changes to watch for: React 19 and Svelte 5 are now required. The router.cancel() method is replaced by router.cancelAll(). The future configuration namespace is removed because all four options from v2 are now always enabled. The inertia attribute on head elements becomes data-inertia. The Inertia::lazy() method is gone, replaced by Inertia::optional(). PHP 8.2 and Laravel 11 are the minimum requirements on the server side. All packages are now ESM-only, so any CommonJS require() calls need to become imports.

The instant visits feature, which swaps to the target component before the server responds, is the kind of thing that sounds great until you realize it requires your components to render gracefully with incomplete or absent data. That is not a free lunch.

**Key takeaways:**
- Axios removed; built-in XHR client handles interceptors and most use cases without changes
- SSR now works in development with a single npm run dev command via the new Vite plugin
- React 19+ and Svelte 5+ are required; upgrade paths from older versions are breaking
- New features: useHttp hook, optimistic updates with rollback, layout props, nested prop types with dot-notation
- PHP 8.2 and Laravel 11 minimum on the server; all packages are now ESM-only

**Why do I care:** If you are on Inertia v2 and using React, the React 19 requirement is the thing to plan around. React 19 has real migration considerations, particularly around refs, concurrent features, and third-party library compatibility. The simplifications in v3 are genuine improvements, but "upgrade to React 19 and Inertia v3 simultaneously" is not a small weekend task for a production application. Do them in sequence, not parallel.

**Link:** [Upgrade Guide for v3.0 - Inertia.js Documentation](https://inertiajs.com/docs/v3/getting-started/upgrade-guide)

---

## TanStack Router Ships a New Signal Graph

**TLDR:** TanStack Router replaced its broad router.state object with a signal graph where smaller stores are the source of truth, leading to faster client-side navigation and a smoother update process.

**Summary:** TanStack Router's latest release moves away from a single broad state object and toward a graph of smaller, targeted stores. This is a pattern the React and signals community has been pushing for some time: coarse-grained state objects cause components to re-render even when the specific slice of state they care about has not changed. A signal graph inverts this, making each piece of state independently observable so that updates only propagate to the subscribers that actually care.

The practical result is faster client-side navigation, because a route change no longer needs to trigger reconciliation across the entire router state tree. Components that depend only on query params do not re-render when the route path changes and vice versa. This is the same principle behind libraries like Jotai, Zustand slices, and MobX observables, applied to the router layer specifically.

What is underexplored in the announcement is the migration story. If you were reading from router.state directly in your application code, the API surface has changed. The documentation presumably covers this, but "replace router.state" is not a zero-friction upgrade for codebases that have coupled themselves to the old shape.

**Key takeaways:**
- Signal graph replaces single router.state object for more granular reactivity
- Smaller stores as source of truth means fewer unnecessary re-renders on navigation
- Improves client-side navigation performance and update granularity

**Why do I care:** Reactivity at the router level has been an underserved problem. Most router state implementations have been blunt instruments. Signals-based granularity here is the right architectural direction, and TanStack Router being early to adopt it at the routing layer is meaningful.

**Link:** [TanStack | High Quality Open-Source Software for Web Developers](https://tanstack.com/)
