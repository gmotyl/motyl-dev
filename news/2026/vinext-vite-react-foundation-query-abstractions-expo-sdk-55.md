---
title: "Cloudflare's Vinext Rewrites Next.js on Vite, React Foundation Goes Independent, Query Abstractions Done Right, and Expo SDK 55"
excerpt: "Cloudflare rebuilds the Next.js API surface on Vite in a week, React moves to the Linux Foundation, TkDodo explains why custom hooks are the wrong abstraction for React Query, Expo SDK 55 ships with Hermes v1, and async design components get practical patterns."
publishedAt: "2026-02-27"
slug: "vinext-vite-react-foundation-query-abstractions-expo-sdk-55"
hashtags: "#uidev #frontend #javascript #react #nextjs #vite #cloudflare #expo #react-native #typescript #architecture #performance #open-source #ai #generated #en"
---

## Cloudflare Rebuilt Next.js on Vite in One Week with AI

**TLDR:** Cloudflare released vinext, a drop-in reimplementation of the Next.js API surface built on Vite, created by one engineer directing AI over roughly a week for about $1,100 in tokens. Early benchmarks show up to 4.4x faster builds and 57% smaller client bundles compared to Next.js 16.

**Summary:**

Let me walk you through what is arguably the most provocative move in frontend infrastructure this year. Cloudflare has released vinext, pronounced "vee-next," and it is not an adapter, not a wrapper, not a compatibility layer. It is a clean reimplementation of the Next.js API surface built directly on top of Vite as a plugin. You run `npm install vinext`, swap your package scripts, and your existing App Router, Pages Router, and next.config.js are supposed to just work.

The performance story is compelling. In benchmarks against Next.js 16 using a shared 33-route App Router application, vinext on Vite 8 with Rolldown clocks in at 1.67 seconds for a production build versus Next.js's 7.38 seconds, a 4.4x improvement. Client bundles drop from 168.9 KB gzipped to 72.9 KB, a 57% reduction. Cloudflare attributes this to Rollup's more aggressive tree-shaking and a lighter client runtime compared to Next.js's router infrastructure. They are transparent about these being directional numbers from a single benchmark app, which I appreciate.

The development story is what really got people talking. One engineering manager at Cloudflare directed Claude through over 800 AI coding sessions. Almost every line of code was AI-generated, but every line passes the same quality gates you would expect: 1,700 Vitest tests, 380 Playwright E2E tests, full TypeScript checking, and linting. The human steered architecture, prioritization, and caught dead ends. The total cost was about $1,100 in API tokens. The project also includes an Agent Skill for migration, so you can install it and tell your AI coding tool to migrate your Next.js app.

Now, here is what the announcement dances around. This is experimental software that is less than a week old. It covers 94% of the Next.js 16 API surface, which means 6% is missing, and that 6% could be exactly the feature your app depends on. Static pre-rendering at build time is not yet supported. The maintenance story is completely unaddressed: who debugs AI-generated code when edge cases surface six months from now? They do introduce an interesting concept called Traffic-aware Pre-Rendering that uses Cloudflare analytics to pre-render only the pages that actually receive traffic rather than building everything upfront, but that is experimental and Cloudflare-specific. The honest assessment is that this proves a powerful pattern and represents genuine competition in the framework deployment space, but production adoption should proceed with significant caution.

What is also worth thinking about is the broader implication Cloudflare raises. Most software abstractions exist because humans need help managing complexity. AI does not have that limitation. Which of our framework layers are truly foundational and which were just crutches for human cognition? That question is going to reshape how we think about software architecture over the next few years.

**Key takeaways:**
- Vinext reimplements the Next.js API surface on Vite, not wrapping or adapting Next.js output
- Builds are up to 4.4x faster with Vite 8/Rolldown and bundles are 57% smaller
- 94% Next.js 16 API coverage with both App Router and Pages Router support
- Cloudflare Workers is the primary deployment target with a single-command deploy
- Experimental status: no static pre-rendering yet, less than a week old, and maintenance story is unclear

**Link:** [How we rebuilt Next.js with AI in one week](https://blog.cloudflare.com/vinext/)

## The React Foundation: React Moves to the Linux Foundation

**TLDR:** React, React Native, and JSX are no longer owned by Meta. They have been transferred to the React Foundation, an independent entity hosted by the Linux Foundation, with eight platinum founding members including Amazon, Microsoft, Vercel, and Meta itself.

**Summary:**

This is one of those announcements that sounds bigger than it might actually be in practice, but the symbolic weight is enormous. React, React Native, and supporting projects like JSX have been officially transferred from Meta to the React Foundation, an independent foundation hosted by the Linux Foundation. Meta announced the intent back in October, and now it is official.

The founding membership is impressive: Amazon, Callstack, Expo, Huawei, Meta, Microsoft, Software Mansion, and Vercel as platinum members. Seth Webster serves as executive director. The foundation will be governed by a board of directors from each member, but the announcement is very clear that technical governance stays independent from the board. A provisional leadership council has been formed to determine the technical governance structure, with updates promised in coming months.

What still needs to happen is substantial. Repositories, websites, and other infrastructure still need to be transferred. The technical governance structure needs to be finalized. Programs to support the ecosystem need to be explored. And the next React Conf needs planning.

Here is what I think the announcement is carefully avoiding: the real question is whether this changes anything about how React development actually works day to day. The same people will be writing the same code. The technical direction will still be set by the maintainers. The difference is governance risk mitigation. If Meta ever decided React was no longer strategically important, having it in a foundation ensures continuity. That is a meaningful insurance policy for the millions of developers and companies that depend on React, even if nothing changes operationally in the short term. The other thing worth watching is how the board dynamics play out between companies like Vercel and Cloudflare, which are in increasingly direct competition over how React apps get deployed.

**Key takeaways:**
- React, React Native, and JSX are now owned by the React Foundation, not Meta
- Eight platinum founding members: Amazon, Callstack, Expo, Huawei, Meta, Microsoft, Software Mansion, and Vercel
- Technical governance remains independent from the foundation board
- Infrastructure transfer is still in progress with updates coming in the months ahead
- This is primarily a governance and continuity play, not a change in technical direction

**Link:** [The React Foundation: A New Home for React Hosted by the Linux Foundation](https://react.dev/blog/2026/02/24/the-react-foundation)

## Creating Query Abstractions: Why Custom Hooks Are the Wrong Tool

**TLDR:** TkDodo argues that custom hooks wrapping useQuery are the wrong abstraction for sharing query configurations in TanStack Query, and that the queryOptions API introduced in v5 solves the type inference, composability, and interoperability problems that custom hooks cannot.

**Summary:**

Dominik, better known as TkDodo, has written what I think is the definitive piece on how to properly abstract TanStack Query configurations. And the core argument is going to challenge a lot of established patterns: custom hooks are simply the wrong abstraction here.

The typical pattern everyone reaches for is a custom hook like `useInvoice(id)` that wraps `useQuery` with a specific key and fetch function. This looks clean until you need to pass additional options. First someone needs `staleTime`. Then someone needs `throwOnError` for error boundaries. Before you know it, you are maintaining a growing parameter object and touching the abstraction every time a new use case comes up. The deeper problem is TypeScript. If you try to accept `UseQueryOptions` as a parameter type, the generics default to `unknown` and you lose all type inference. Even the naive fix of annotating the first type parameter falls apart when you need options like `select` that depend on other type parameters.

TkDodo identifies three fundamental problems with custom hooks as query abstractions. First, hooks can only be used in components or other hooks, but you increasingly need query configurations on the server, in route loaders, and for prefetching in event handlers. Second, you are not actually sharing logic between components; you are sharing configuration. Third, the custom hook ties you to a specific implementation. If you need to switch between `useQuery`, `useSuspenseQuery`, and `useQueries`, a hook abstraction cannot accommodate that.

The solution is the `queryOptions` API from v5. It is just a function that at runtime does nothing but return what you pass in. But on the type level, it is a powerhouse that preserves full type inference. You create an `invoiceOptions(id)` function, then spread it into whatever hook you need at the usage site, adding any additional options right there. Types flow perfectly, you get full composability, and the abstraction stays simple and unconfigurable. The best abstractions, TkDodo argues, are not configurable.

What I think is missing from the article is the organizational challenge. Teams have years of custom hooks already in place. The migration path from `useInvoice` to `invoiceOptions` across a large codebase is non-trivial, even if the target pattern is clearly better. He also does not address the discoverability problem: new developers on a team can find custom hooks easily through IDE tooling, but queryOptions factory functions require knowing the convention exists.

**Key takeaways:**
- Custom hooks wrapping useQuery break TypeScript inference and limit composability
- The queryOptions API returns configuration objects that preserve full type inference
- queryOptions works with useQuery, useSuspenseQuery, useQueries, and imperative APIs
- Keep query option factories simple and unconfigurable; add options at the usage site
- This pattern applies to any TypeScript library that relies heavily on generic inference

**Link:** [Creating Query Abstractions](https://tkdodo.eu/blog/creating-query-abstractions)

## Expo SDK 55: Hermes v1, Native Tabs, and the Brownfield Bridge

**TLDR:** Expo SDK 55 ships with React Native 0.83, React 19.2, Hermes v1 support, a revamped default template with native tabs, new brownfield integration options, major SwiftUI and Jetpack Compose improvements, and the final removal of Legacy Architecture support.

**Summary:**

Expo SDK 55 is a massive release that touches nearly every layer of the React Native development experience. Let me highlight what actually matters for production teams.

The headline feature is Hermes v1, which shows early signs of meaningful performance improvements and better support for modern JavaScript features like ES6 classes, const/let syntax, and async/await. The catch is that using Hermes v1 requires building React Native from source, which significantly increases native build times. That is a real tradeoff you need to evaluate for your specific app. There is also a new bytecode diffing feature for expo-updates that estimates approximately 75% reduction in download sizes for over-the-air updates, which could meaningfully improve update adoption rates.

The new default project template has been redesigned with native platform conventions. It uses the Native Tabs API for platform-native tab experiences and introduces a `/src` folder structure that separates application code from configuration. This is SDK 55 officially dropping Legacy Architecture support, as announced in SDK 54. The `newArchEnabled` config option has been removed entirely.

The brownfield story gets a significant upgrade with the new expo-brownfield package offering both integrated and isolated modes. The isolated mode packages your React Native app as a native library (AAR or XCFramework) that native developers can consume without needing Node.js. This addresses one of the biggest friction points in enterprise React Native adoption.

Expo UI continues maturing with both SwiftUI and Jetpack Compose improvements. Jetpack Compose moves from alpha to beta with a reworked functional DSL pattern, many new Material 3 components, and a modifiers system. SwiftUI gets API renames to match SwiftUI conventions more closely, new components like ConfirmationDialog and ScrollView, and support for custom views and modifiers. The new expo-widgets package enables iOS home screen widgets and Live Activities using Expo UI components without writing native code.

What I think is worth scrutinizing is the sheer scope of this release. The changelog reads like three SDKs worth of changes compressed into one. That is great for features but concerning for upgrade complexity. The Expo team has leaned into AI-assisted upgrades by providing dedicated skills for Claude Code, which is an interesting acknowledgment that their upgrade process is complex enough to warrant AI assistance. The minimum Xcode bump to 26 and the Node.js version requirements could also catch teams off guard if they are not paying attention to their CI infrastructure.

**Key takeaways:**
- Hermes v1 brings performance improvements but requires building React Native from source
- Legacy Architecture support is completely removed as of SDK 55
- New brownfield integration with isolated mode packages React Native as a native library
- Expo UI Jetpack Compose promoted to beta with functional DSL and Material 3 components
- Bytecode diffing for expo-updates estimates 75% smaller OTA update downloads

**Link:** [Expo SDK 55](https://expo.dev/changelog/sdk-55)

## Building Design Components with Action Props in Async React

**TLDR:** Aurora Scharff demonstrates how to build reusable design components using useTransition and useOptimistic that encapsulate async coordination internally, letting consumers simply pass values and action functions while getting instant optimistic updates and automatic rollback for free.

**Summary:**

Aurora Scharff has written an excellent practical guide to what I think is one of the most underappreciated patterns in modern React: the action props pattern for design components. The premise is straightforward but powerful. Components like tab lists and inline editable text fields should own their own async coordination. The consumer should just pass a value and an action function, and the component handles optimistic updates, pending states, and rollback internally.

The post walks through building two components from scratch. The first is a TabList where clicking a tab might trigger async work like a Next.js router push that re-renders a Server Component. Without the pattern, the user clicks a tab and sees nothing happen until the server responds. With the pattern, the component uses `useTransition` to track pending state and `useOptimistic` to immediately switch the active tab. The consumer code is dead simple: pass your tabs, the current value, and a `changeAction` function. The naming convention uses the "Action" suffix to signal the function runs inside a transition.

The second example is an EditableText component that adds a clever twist: a `displayValue` prop that accepts either a static ReactNode or a function that receives the optimistic value. This means formatted displays like currency can update immediately on commit without the consumer needing access to the optimistic state. It is a small but thoughtful API design detail.

What I find particularly valuable is the discussion of customizing the pending state. The component provides a `hideSpinner` prop so consumers can suppress the default loading indicator and drive their own pending UI. Combined with a `data-pending` attribute and CSS group selectors, you can cascade loading states through the DOM without any JavaScript plumbing. That is a genuinely elegant approach.

The pattern the article describes is not new in concept, but Async React finally gives it standardized primitives. What the article does not fully address is error handling beyond "errors bubble to error boundaries." Real applications often need to show contextual error messages rather than replacing the entire component tree with an error boundary fallback. The pattern also assumes your action function is idempotent enough for optimistic updates to make sense, which is not always the case with complex mutations.

**Key takeaways:**
- Design components should encapsulate async coordination using useTransition and useOptimistic
- The action props pattern: pass a value and an action function, the component handles the rest
- Use the "Action" suffix on props to signal they run inside transitions
- displayValue as a function enables formatted optimistic state without exposing internals
- data-pending attributes with CSS group selectors enable cascading loading states without JavaScript

**Link:** [Building Design Components with Action Props using Async React](https://aurorascharff.no/posts/building-design-components-with-action-props-using-async-react/)

## Angular Skills: AI Agent Knowledge for Angular v20+

**TLDR:** The AnalogJS team has released a collection of AI agent skills for Angular development, providing coding agents with up-to-date Angular v20+ patterns, best practices, and code examples covering components, signals, forms, routing, SSR, and testing.

**Summary:**

The AnalogJS team has released angular-skills, a collection of AI agent skills specifically designed for Angular v20+ development. This follows the growing trend of framework teams packaging their knowledge as structured context that AI coding agents can consume. You install them via `npx skills add analogjs/angular-skills` and they work with Claude Code, Cursor, Gemini, OpenCode, and other AI tools.

The collection covers ten skill areas: components with signal inputs and outputs, dependency injection with the `inject()` function, directives, the experimental Signal Forms, HTTP with `httpResource()`, routing with functional guards, signals and reactive state, server-side rendering with incremental hydration, testing with TestBed and component harnesses, and tooling with Angular CLI. Each skill follows a standard structure with a main skill file and a references directory containing advanced patterns.

What is interesting about this is the implicit admission that AI models struggle with modern Angular patterns because their training data is dominated by older decorator-based, NgModule-based Angular code. These skills explicitly target the modern defaults: standalone components without the `standalone: true` flag, signal-based inputs and outputs, native control flow with `@if` and `@for`, the `inject()` function for DI, and functional guards and interceptors.

The question I keep coming back to with all these agent skills is measurability. Do they actually produce meaningfully better code? The skills repo does not include any benchmarks or evaluation methodology. That does not mean they are not useful, but the field would benefit from rigor rather than just "install this and trust that it helps." That said, if you are doing Angular development with AI tools, having a curated set of modern patterns is almost certainly better than letting the model fall back to its training data defaults.

**Key takeaways:**
- Ten skills covering components, signals, DI, forms, HTTP, routing, SSR, testing, and tooling
- Targets Angular v20+ with modern standalone components and signal-based APIs
- Works with Claude Code, Cursor, Gemini, and other AI coding agents
- Addresses the gap between AI training data (older Angular) and current best practices
- Part of a broader trend of framework teams packaging knowledge as agent-consumable skills

**Link:** [Angular Skills - Agent Skills for Angular Developers](https://github.com/analogjs/angular-skills)