---
title: "Remix Newsletter #38: Security Patches, Open Governance, and the Road to Remix 3"
excerpt: "Critical security updates for React Router, the new open governance model, and a preview of Remix 3's ambitious departure from React."
publishedAt: "2026-01-10"
slug: "remix-newsletter-38-security-governance-remix-3-preview"
hashtags: "#remixrun #react #webdev #react-router #security #ssr #architecture #frontend #generated #en"
---

## Security Advisory: Multiple Vulnerabilities Patched in React Router 7.12.0

**TLDR:** React Router versions before 7.12.0 contain six security vulnerabilities including XSS, CSRF, and file access issues. If you're running Framework Mode, update immediately.

The Remix team dropped a significant security update with React Router 7.12.0, addressing six distinct vulnerabilities that range from moderate to high severity. Let's break these down because they matter, especially if you're running production applications.

The most concerning vulnerability involves XSS via the Meta component when generating `script:ld+json` tags. If your application accepts untrusted content for structured data generation during server-side rendering, attackers could inject arbitrary JavaScript. This affects versions 1.15.0 through 2.17.0 and 7.0.0 through 7.8.2. The fix is straightforward - upgrade to 2.17.1 or 7.9.0+.

Another critical issue is CSRF vulnerability in React Router's action and server action request processing. If you're using Framework Mode with server-side route action handlers, your application was vulnerable to cross-site request forgery attacks. Versions up to 7.11.0 are affected, so you need 7.12.0 or later.

The file session storage vulnerability is particularly sneaky. If you're using `createFileSessionStorage()` with unsigned cookies, attackers could potentially read files outside your session directory through path traversal. The success depends on your server's file permissions, but the risk is real.

For architects and teams: This is a good reminder that security is an ongoing process. If you're managing multiple applications, consider implementing automated dependency scanning that can flag these security advisories as they drop. The React Router team's quick turnaround on patches is commendable, but you need processes in place to consume them just as quickly.

**Key takeaways:**
- Update to React Router 7.12.0 immediately if using Framework Mode
- XSS, CSRF, file access, and open redirect vulnerabilities were patched
- Declarative Mode (`<BrowserRouter>`) users are not affected by most of these issues
- Always sign your cookies when using file-based session storage

**Link:** [Security Advisories on GitHub](https://github.com/remix-run/react-router/security)

---

## Error Reporting in React Router 7.11.0: Finally, a Sane Approach

**TLDR:** React Router now provides proper hooks for catching and reporting errors on both server and client sides, separate from error boundaries.

Error boundaries are great for showing fallback UI, but they've always been terrible for actually logging and tracking errors. React Router 7.11.0 finally addresses this gap with dedicated error handling APIs.

On the server side, you export a `handleError` function from your server entry module. If you don't see `entry.server.tsx` in your app directory, run `react-router reveal entry.server` to generate it. The handler receives the error and request context, letting you pipe errors to your monitoring service of choice - Sentry, Datadog, whatever you're using.

The clever bit here is the abort check. React Router may abort interrupted requests, and you probably don't want to flood your error logs with those. The pattern `if (!request.signal.aborted)` filters out the noise.

Client-side error handling follows a similar pattern through the `onError` prop on `HydratedRouter` or `RouterProvider`. You get the error plus rich context including location, params, route pattern, and React's errorInfo for the component stack.

For teams running production apps, this is the pattern you've been implementing manually for years, now standardized. The separation of concerns here is clean - error boundaries handle the user experience, error handlers handle the developer experience and observability.

**Key takeaways:**
- Use `handleError` export for server-side error reporting
- Use `onError` prop on router components for client-side reporting  
- Filter aborted requests to reduce noise in your logs
- Both APIs provide rich context for debugging

**Link:** [Error Reporting v7.11.0 Documentation](https://reactrouter.com/7.11.0/how-to/error-reporting)

---

## React Router Open Governance: Democratizing a Decade-Old Project

**TLDR:** React Router now has a formal governance model with a Steering Committee and a TC39-inspired proposal process for new features.

After ten years under Michael Jackson and Ryan Florence's leadership, React Router is opening up its decision-making process. This isn't just a PR move - it's a recognition that when 11 million GitHub projects depend on your library, you need transparent processes.

The new governance model introduces a six-stage proposal process loosely based on TC39's process for JavaScript. Anyone can write an RFC in GitHub Discussions. If two Steering Committee members show support, it becomes a GitHub issue eligible for implementation. Features then progress through alpha (with `unstable_` prefix), beta, stabilization, and finally stable release.

What's particularly interesting is the stated design goal of "Less is More." The team explicitly acknowledges that React Router has grown complex and wants to start shedding APIs. They're eyeing potential deprecations for things like the `meta` and `links` exports in favor of React 19's native capabilities like `<title>`, `<meta>`, and `<link>` components.

The regular release cadence goal of yearly major versions is ambitious but healthy. It gives teams predictable windows for planning upgrades and prevents the accumulation of breaking changes into painful mega-releases.

For teams evaluating framework longevity, this governance model is a positive signal. Open source projects with clear processes and multiple stakeholders tend to outlive founder-led projects. The commitment to future flags and proper deprecation warnings before removals shows maturity.

**Key takeaways:**
- New Steering Committee oversees feature development
- Six-stage proposal process from RFC to stable release
- Goal to simplify and reduce API surface area
- Yearly major release cadence planned
- Deprecations will use future flags with advance warning

**Link:** [React Router Open Governance](https://remix.run/blog/rr-governance)

---

## React Router Modes Explained: Declarative, Data, and Framework

**TLDR:** React Router offers three usage modes with additive features - pick based on how much control versus convenience you want.

The React Router documentation now clearly delineates three modes of operation, which has been a source of confusion for many developers. Understanding these modes is crucial because they determine which APIs are available and how much React Router will do for you.

Declarative Mode is the classic experience with `BrowserRouter`. You get URL matching, navigation, and active states. It's what Create React App users know and love. Use this if you have your own data layer or if you're using a local-first architecture with background sync.

Data Mode adds the router-integrated data loading that made Remix famous. By moving route configuration outside of React rendering with `createBrowserRouter`, you unlock loaders, actions, pending states, and `useFetcher`. This is where React Router starts feeling like a framework rather than just a router.

Framework Mode wraps everything in a Vite plugin and gives you the full experience: type-safe `href`, intelligent code splitting, and SPA/SSR/static rendering strategies. If you're starting fresh and want React Router's opinion on how to structure things, this is your mode.

The documentation now includes a comprehensive API availability table showing what works in each mode. This is explicitly called out as being "mostly for the LLMs" which is refreshingly pragmatic - AI assistants are now a legitimate audience for technical documentation.

**Key takeaways:**
- Declarative: Basic routing with `<BrowserRouter>`
- Data: Add loaders and actions with `createBrowserRouter`  
- Framework: Full Vite integration with type safety and code splitting
- Features are additive - higher modes include lower mode capabilities
- Mode choice is about control vs. convenience, not architecture

**Link:** [Picking a Mode - React Router Documentation](https://reactrouter.com/start/modes)

---

## Open Sourcing the Remix Store: A Real-World Hydrogen Reference

**TLDR:** The Remix team open-sourced their e-commerce store built on Hydrogen, complete with 3D scroll-synced animations and optimistic cart updates.

When the Remix team announced they were open-sourcing shop.remix.run, my first thought was "another demo app." But this is different - it's a production store that's processed over 200 orders and has real money flowing through it.

The technical implementation is genuinely impressive. The hero section features a 61-frame rotating hoodie that syncs with scroll position - a technique borrowed from Apple's product pages. They preload all images and swap visibility based on scroll percentage, which is simpler and more reliable than trying to render 3D in real-time.

The product image loading uses a blur-up technique where they request a 32px version for instant preview, then crossfade to the full image. Shopify's image CDN makes this trivial since you can request any size by appending `?width=32` to the URL.

The optimistic cart implementation using Hydrogen's `useOptimisticCart` hook is worth studying. Users can rapidly add and remove items while seeing predicted states, with visual indicators (shaded prices, "Updating cart..." button text) showing pending operations. This pattern is applicable to any application with latency between user actions and confirmed state.

The 404/500 error pages convert PNG sprites into matrices of hex characters that randomly flip for a glitch effect. It's pure visual flair, but it demonstrates that error pages don't have to be boring.

**Key takeaways:**
- Production e-commerce code with real transactions
- Scroll-synced 61-frame product rotation technique
- Blur-up image loading with 32px previews
- Optimistic cart with visual pending indicators
- Glitchy error pages using matrix character effects

**Tradeoffs:**
- Preloading 61 images increases initial bundle but ensures smooth scroll experience
- Optimistic updates provide snappy UX but require careful reconciliation with server state

**Link:** [Open Sourcing the Remix Store](https://remix.run/blog/oss-remix-store)

---

## Remix Jam 2025: MCP, Shopify Admin Insights, and the Remix 3 Preview

**TLDR:** Remix Jam showcased interactive MCP with React Router, architectural insights from Shopify's massive admin app, and the first public demos of Remix 3's new component model.

The Remix team hosted their first conference since 2023 in Toronto, and the content was substantial. Kent C. Dodds opened with a provocative thesis: stop adding chatbots to your apps and start adding your apps to the chatbot.

Kent demonstrated building an MCP (Model Context Protocol) server with React Router, wiring it up so that prompts in ChatGPT could directly contribute to a journaling app with custom UI rendered in the chat interface. This isn't theoretical - OpenAI now supports MCP-UI, making this pattern production-viable.

Craig Brunner's talk on Shopify Admin was a masterclass in operating at scale. We're talking 67 million daily page views, 3 million lines of TypeScript, 100+ contributing teams, and 1,000+ routes. The key architectural decisions: using route manifests as the source of truth, initializing data fetching in loaders as early as possible, and replacing skeleton screens with View Transitions for instant-feeling navigation.

The "Intents" feature Craig demoed is particularly clever - it lets you launch any page from anywhere as a new router instance that stacks on the current UI. This is how Shopify's AI assistant Sidekick navigates the admin, opens forms, fills them out, and submits them programmatically.

Felipe Leusin's talk on building Sidekick revealed that the DOM doesn't provide enough metadata for reliable AI agents - you need to operate at the framework layer with consistent schemas, loaders, and actions. This has profound implications for anyone building AI-enabled products.

**Key takeaways:**
- MCP enables adding your app to AI interfaces rather than embedding AI in your app
- Shopify Admin uses route manifests as the single source of routing truth
- View Transitions eliminate skeleton screen flicker
- AI agents need framework-level structure, not just DOM access
- "Intents" pattern enables any page to be launched and stacked from anywhere

**Link:** [Remix Jam 2025 Recap](https://remix.run/blog/remix-jam-2025-recap)

---

## Wake Up, Remix! The Framework Leaves React Behind

**TLDR:** Remix 3 will not be built on React. The team is forking Preact and building their own component model focused on simplicity and web platform alignment.

This is the big one. After years of being tightly coupled to React, Remix 3 is charting its own course. React Router v7 will continue supporting React (including RSC), but the Remix framework itself is diverging.

The reasoning is pragmatic rather than political. React Router v7 has become so capable - with RSC support nearly complete - that Remix as a React wrapper felt redundant. The team looked at the mountain they'd climbed with React and decided they saw a better mountain to climb.

The six principles guiding Remix 3 development are revealing:
1. Model-First Development - optimizing for LLMs, not just humans
2. Build on Web APIs - JavaScript is the only true full-stack ecosystem
3. Religiously Runtime - no bundler/compiler dependencies in API design
4. Avoid Dependencies - the goal is zero external dependencies
5. Demand Composition - every package must work independently
6. Distribute Cohesively - composable pieces wrapped into a single `remix` package

The demos from Remix Jam showed a new component model using `this.update()` for reactivity, an `on={}` attribute for event handling that feels like HTML, and a `hydrated()` function for selective client-side JavaScript. The `Frame` component handles async UI, inspired by iframes but built on HTML streaming and intelligent DOM morphing.

For teams currently on Remix v2 or React Router v7: don't panic. These projects have long-term support and continue evolving. But if you're starting something new in late 2026 or beyond, you'll have a genuine choice to make.

**Key takeaways:**
- Remix 3 is not built on React - uses a Preact fork as starting point
- React Router v7 continues as the React solution with full RSC support
- New component model with `this.update()`, `on={}` attributes, and `hydrated()`
- `Frame` component for async UI with HTML streaming and DOM morphing
- Target release: early 2026 for the full-stack `remix` package

**Tradeoffs:**
- Breaking from React ecosystem trades community and hiring pool for architectural freedom
- Zero dependencies goal maximizes control but increases maintenance burden
- Runtime-only design improves debuggability but may sacrifice some build-time optimizations

**Link:** [Wake up, Remix!](https://remix.run/blog/wake-up-remix)

---

## AT Garden Club and Style Stage: CSS Zen Garden Lives On

**TLDR:** The CSS Zen Garden spirit continues with decentralized stylesheet submissions via the AT Protocol.

Remember CSS Zen Garden? Dave Shea's legendary project that demonstrated CSS-only redesigns of the same HTML? It ran from 2003 to 2013, and Stephanie Eckles revived the concept with Style Stage. Now there's AT Garden Club, bringing the concept to the decentralized web.

The premise remains elegant: provide semantic, accessible HTML as a fixed constraint, then let designers compete purely on CSS skills. The HTML includes nested `.container` elements for styling hooks, proper IDs for accessibility, and minimal opinions beyond structure.

What makes AT Garden Club interesting is the AT Protocol integration. Your stylesheet submission lives on your personal data server (PDS), giving you full ownership and portability. This contrasts with traditional platforms where your contributions live on someone else's infrastructure.

The guidelines enforce modern CSS best practices: responsive design, accessible contrast verified with aXe, animations disabled via `prefers-reduced-motion`, sub-3-second page loads. It's a forcing function for writing CSS the way it should be written.

For teams wanting to level up their CSS skills, these projects offer a unique constraint-based learning environment. You can't fall back on changing the HTML or adding JavaScript - you must solve everything with CSS.

**Key takeaways:**
- CSS Zen Garden concept revived with modern CSS features
- AT Protocol enables decentralized stylesheet ownership
- Fixed HTML forces creative CSS solutions
- Accessibility and performance requirements enforced
- Great learning environment for CSS mastery

**Link:** [AT Garden Club](https://atgarden.club/)

---

*This newsletter summary was generated from the Remix Newsletter #38. The opinions expressed reflect analysis of the source material. Always refer to official documentation for implementation details.*