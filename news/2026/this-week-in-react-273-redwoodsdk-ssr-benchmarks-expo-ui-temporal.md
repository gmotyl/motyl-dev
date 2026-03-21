---
title: "This Week In React 273: RedwoodSDK 1.0, SSR Benchmarks, Expo UI Jetpack Compose, and Temporal Hits Stage 4"
excerpt: "RedwoodSDK ships its stable release on Cloudflare, React SSR frameworks race for throughput, Expo embraces native UI, and Temporal finally standardizes after nine years."
publishedAt: "2026-03-20"
slug: "this-week-in-react-273-redwoodsdk-ssr-benchmarks-expo-ui-temporal"
hashtags: "#thisweekinreact #react #frontend #react-native #expo #vite #performance #ssr #server-components #cloudflare #temporal #animation #generated #en"
---

## RedwoodSDK 1.0 Ships on Cloudflare

**TLDR:** The former RedwoodJS meta-framework has reinvented itself as RedwoodSDK 1.0, built on Vite and React Server Components with a tight coupling to Cloudflare. It offers explicit, composable APIs with no magic conventions and leverages Durable Objects for realtime state synchronization.

**Summary:**

RedwoodSDK marks a significant pivot from the original RedwoodJS philosophy. Rather than being a general-purpose full-stack framework, it now bets heavily on the Cloudflare ecosystem, using Vite as its build tool and React Server Components as its rendering model. The stable 1.0 release introduces a composable set of web-based primitives that favor explicitness over convention, which is a refreshing departure from the "magic" that plagues many modern meta-frameworks.

The most eyebrow-raising decision is the tight coupling to Cloudflare. The framework uses Cloudflare Bindings and Durable Objects directly, with the latter powering its useSyncedState realtime feature. The team argues they are building abstractions that could become service-agnostic while remaining platform-optimized, but that is a promise that remains unproven. This mirrors a broader trend in the ecosystem where platform lock-in is being reframed as a feature rather than a liability.

The timing is notable because Evan You recently announced Void.cloud, a Vite-native deployment platform also built on Cloudflare, and explicitly stated that "the lock-in is what makes the DX possible." Both projects are essentially arguing that the benefits of deep platform integration outweigh the risks of vendor dependency. Whether this philosophy holds up when Cloudflare changes pricing or APIs is the question nobody wants to answer right now.

**Key takeaways:**
- RedwoodSDK 1.0 is a complete reinvention built on Vite, React Server Components, and Cloudflare
- Durable Objects power the realtime useSyncedState feature
- The framework favors explicit, composable APIs over convention-based magic
- Cloudflare lock-in is positioned as a feature enabling better developer experience

**Why do I care:** If you are evaluating meta-frameworks for a new project, RedwoodSDK deserves a look, but go in with eyes open about the Cloudflare dependency. The explicit API design philosophy is genuinely appealing for teams that have been burned by framework magic in Next.js or Remix. However, as an architect, I would be cautious about building production systems on a framework that couples your infrastructure to a single provider's proprietary features like Durable Objects. The "we will abstract it later" argument has a poor track record in this industry.

**Link:** [RedwoodSDK 1.0](https://rwsdk.com)

## React SSR Benchmark: TanStack, React Router, Next.js

**TLDR:** A comprehensive stress-test of popular React meta-frameworks uncovered significant SSR performance bottlenecks across the board. The benchmark spurred framework authors to investigate and fix real issues, making the entire ecosystem faster.

**Summary:**

This benchmark takes a rigorous approach to measuring server-side rendering throughput across TanStack Start, React Router, and Next.js under heavy load conditions. Rather than the typical "time to first byte on localhost" benchmarks that tell you almost nothing about production performance, this one pushes frameworks to their breaking points with concurrent requests to expose real bottlenecks.

What makes this benchmark particularly valuable is what happened after it was published. Framework maintainers actually used the results to identify and fix performance problems in their codebases. This is benchmarking done right, serving as a diagnostic tool rather than a marketing weapon. The TanStack team published a detailed follow-up explaining their methodology for profiling SSR hot paths, which led to a 5x improvement in throughput.

The findings reveal that SSR performance in the React meta-framework space has been somewhat neglected as teams focused on features and developer experience. When you actually profile the server rendering pipeline under load, inefficiencies in streaming, serialization, and request handling become painfully obvious. The fact that a single round of focused profiling could yield a 5x improvement in TanStack Start suggests that most frameworks have significant low-hanging fruit in their SSR implementations.

**Key takeaways:**
- Stress-testing under concurrent load reveals bottlenecks that simple benchmarks miss
- TanStack Start achieved 5x SSR throughput improvement after profiling hot paths
- Framework authors actively used the results to fix real performance issues
- SSR performance has been underinvested across the React meta-framework ecosystem

**Why do I care:** If you are running React SSR in production at any meaningful scale, this benchmark and the subsequent fixes should prompt you to update your framework versions. More importantly, the TanStack team's write-up on profiling SSR hot paths is a masterclass in performance debugging methodology. As a consultant, I would recommend any team doing SSR to run similar stress tests against their own setup rather than relying on framework defaults being performant out of the box.

**Link:** [React SSR Benchmark](https://blog.platformatic.dev/react-ssr-benchmark-tanstack-react-router-nextjs)

## Why We Banned React's useEffect

**TLDR:** The Factory engineering team banned direct usage of useEffect through an ESLint rule, arguing that its usage often compensates for things React already provides better primitives for. The result was fewer bugs and reduced complexity across their codebase.

**Summary:**

This article tackles one of the most persistently misused APIs in React. The Factory team made the bold decision to create an ESLint rule that forbids direct usage of useEffect, and the results speak for themselves in terms of reduced bugs and simplified component logic. The core argument is that most useEffect calls are compensating for a lack of understanding about what React already provides.

The common patterns that useEffect gets misused for include synchronizing state derived from other state, which should just be computed during render, fetching data that should use a dedicated data fetching library, and responding to events that should be handled in event handlers. Each of these patterns introduces unnecessary complexity, potential race conditions, and makes components harder to reason about.

What the article does not fully address is the escape hatch story. There are legitimate use cases for useEffect, particularly around DOM measurements, third-party library integration, and subscription management. Banning it entirely requires having well-maintained custom hooks that wrap those legitimate use cases. The article implies they have these wrappers but does not go deep on how they manage the approved abstractions. A team adopting this approach needs discipline around maintaining those blessed hooks, or you just end up with the same complexity hidden one layer deeper.

**Key takeaways:**
- Most useEffect usage compensates for React primitives that handle the same concern better
- An ESLint rule enforcing the ban reduced bugs and simplified code
- Derived state, data fetching, and event responses are the most common misuse patterns
- Legitimate useEffect use cases should be wrapped in approved custom hooks

**Why do I care:** This resonates deeply with what I see in code reviews every week. Most useEffect calls I encounter in production codebases should not exist. If you are leading a frontend team, seriously consider implementing a similar ESLint rule, but invest the time to build well-documented custom hooks for the legitimate escape hatches first. The approach forces developers to think about what they actually need before reaching for the effect sledgehammer.

**Link:** [Why we banned React's useEffect](https://www.factorymind.com/blog/why-we-banned-reacts-useeffect)

## From Fiber to Async React

**TLDR:** An interactive deep dive that traces the evolution from React Fiber to modern async React features, explaining how the architecture enables concurrent rendering, Suspense, and transitions.

**Summary:**

This interactive article walks through the internal architecture of React, starting from the Fiber reconciler and building up to the async features that define modern React. It is the kind of educational content that helps developers build a mental model of what is actually happening beneath the JSX surface.

The journey begins with Fiber, the tree data structure React uses internally to represent the component hierarchy. Understanding that rendering is split into a render phase where a work-in-progress tree is built, and a commit phase where changes are flushed to the DOM, is foundational to understanding why concurrent features work the way they do. The article makes this tangible through interactive visualizations rather than abstract explanations.

From there, it builds up to how interruptible rendering enables concurrent features like startTransition and Suspense. The key insight is that by breaking rendering into units of work represented by Fiber nodes, React can pause, resume, and prioritize rendering work. This is what makes it possible to keep the UI responsive during expensive renders and to show loading states without blocking user interaction. What the article could push harder on is the practical implications of these internals for component design. Understanding Fiber is intellectually satisfying, but the actionable question is how it should influence the way you structure components and state.

**Key takeaways:**
- React Fiber splits rendering into a render phase and a commit phase using a tree data structure
- Interruptible rendering enables concurrent features like transitions and Suspense
- The work-in-progress tree model allows React to prioritize and pause rendering work
- Interactive visualizations make abstract internals more accessible

**Why do I care:** Understanding React internals at this level makes you a significantly better debugger of performance issues and helps you make better architectural decisions about component boundaries. When you understand why React batches certain updates or why a transition behaves differently from a regular state update, you stop fighting the framework and start working with it. This is essential reading for senior frontend developers, even if the day-to-day practical impact is indirect.

**Link:** [From Fiber to Async React](https://jser.dev/2026-03-18-fiber-to-async-react/)

## Expo UI in SDK 55 with Jetpack Compose

**TLDR:** Expo SDK 55 brings Jetpack Compose support to beta alongside refined SwiftUI APIs, allowing React Native developers to use native UI frameworks directly rather than JavaScript reimplementations. A full Wikipedia clone was built to validate the Compose component set.

**Summary:**

Expo SDK 55 represents a meaningful shift in how React Native approaches native UI. Rather than recreating native components in JavaScript, Expo UI now exposes Jetpack Compose on Android and SwiftUI on iOS directly, letting developers tap into the actual native UI toolkits through React Native's component model.

The Jetpack Compose support has reached a maturity milestone with enough Material Design 3 components, including LazyColumn, ModalBottomSheet, and DockedSearchBar, to build complete applications. The team validated this by constructing an entire Wikipedia clone, which is a much more convincing proof point than the typical counter-app demos. On the SwiftUI side, the APIs have been restructured to match Apple's official naming conventions, so DateTimePicker becomes DatePicker, Switch becomes Toggle, and CircularProgress becomes ProgressView.

The API design uses React's compound component pattern to express Compose's composable lambdas in JSX, which is a clever bridge between the two paradigms. There is also a practical AI angle here. Because the APIs intentionally mirror the native Compose and SwiftUI documentation, AI coding assistants can generate correct Expo UI code using their existing training data on native development. This is a thoughtful design decision that acknowledges the reality of how code gets written today.

**Key takeaways:**
- Jetpack Compose support is now in beta with enough Material Design 3 components for complete apps
- SwiftUI APIs have been renamed to match Apple's official conventions
- React's compound component pattern bridges JSX and Compose's composable lambdas
- API design intentionally mirrors native documentation for AI assistant compatibility

**Why do I care:** If you are building React Native applications and have been frustrated by the gap between native UI capabilities and what React Native components offer, this is a significant step forward. The fact that you can now use actual Jetpack Compose and SwiftUI components means your apps can look and feel truly native without dropping down to custom native modules for common UI patterns. For architects evaluating React Native versus native development, this narrows the gap considerably.

**Link:** [Expo UI in SDK 55](https://expo.dev/blog/expo-ui-jetpack-compose)

## React Native Ease: Lightweight Declarative Animations

**TLDR:** A new animation library called react-native-ease handles simple transitions by leveraging Core Animation on iOS and Animator on Android directly, eliminating JavaScript overhead entirely. It offers a CSS-like declarative API that is dramatically simpler than Reanimated for basic use cases.

**Summary:**

React Native Ease addresses a genuine pain point in the React Native animation story. While Reanimated is incredibly powerful, it runs JavaScript on every frame on the UI thread, which can be overkill for simple transitions and may cause flickering if the thread lags. This library takes a fundamentally different approach by delegating animations entirely to the native platform APIs.

The API is refreshingly simple. You wrap elements in an EaseView component and pass an animate prop, similar to how CSS transitions work on the web. It handles non-layout properties like opacity, transforms, background color, and border radius. For teams that have been creating hundreds of shared values just to animate press states in list items, this is a massive simplification.

There is an interesting AI integration angle as well. The library includes an agent skill that can scan your codebase, identify simple Animated and Reanimated implementations, and automatically migrate them to react-native-ease. This is a pragmatic approach to adoption, especially in large codebases where manually identifying migration candidates would be tedious. The limitation to non-layout properties is honest and well-scoped. This is not trying to replace Reanimated for complex gesture-driven animations. It is filling the gap for the 80% of animations that should be simple but currently require disproportionate complexity.

**Key takeaways:**
- Leverages Core Animation on iOS and Animator on Android for zero JavaScript overhead
- CSS-like declarative API via EaseView component with animate prop
- Designed for non-layout properties like opacity, transforms, and colors
- Includes an AI agent skill for automated migration from Reanimated for simple cases

**Why do I care:** If your React Native app has dozens of simple fade and scale animations that are all implemented with Reanimated shared values, this library could meaningfully reduce complexity and improve performance. The key insight is that not every animation needs to run in JavaScript. For senior developers and architects, this is a good reminder to match the tool to the complexity of the problem rather than reaching for the most powerful option every time.

**Link:** [React Native Ease](https://github.com/nicholasgasior/react-native-ease)

## TC39 Advances Temporal to Stage 4

**TLDR:** After nine years of development, the Temporal API has officially reached TC39 stage 4, meaning it will be part of ECMAScript 2026. This finally gives JavaScript a proper date and time API to replace the notoriously broken Date object.

**Summary:**

The standardization of Temporal is one of those milestones that feels both overdue and momentous. The Date API has been a source of bugs and developer frustration since the earliest days of JavaScript, with its mutable design, confusing month indexing, and inability to handle time zones properly. Temporal fixes all of this with an immutable, timezone-aware, calendar-aware API that covers the full spectrum of date and time manipulation.

The journey to stage 4 took nine years, which reflects the genuine complexity of getting date and time handling right. The proposal had to navigate an enormous design space covering different calendar systems, timezone edge cases, duration arithmetic, and the question of how precise time representations should be. The fact that it took this long is actually evidence of the TC39 process working correctly for something this foundational.

What remains to be defined is how Temporal will integrate with existing Web APIs, particularly date inputs in HTML forms. This is a meaningful gap because one of the biggest sources of date-related bugs is the boundary between user input and programmatic date handling. Until browsers ship Temporal support and the web platform APIs catch up, most production applications will still need a polyfill or a library like date-fns. But the direction is now locked in, and that matters for long-term planning.

Also worth noting from the same TC39 meeting, Import Text advanced to stage 3, which will let you import text files directly in JavaScript modules, a small but genuinely useful capability for configuration files and templates.

**Key takeaways:**
- Temporal reaches stage 4 and will be part of ECMAScript 2026
- Provides immutable, timezone-aware, calendar-aware date and time handling
- Integration with existing Web APIs like date inputs still needs to be defined
- Import Text also advanced to stage 3 for direct text file imports

**Why do I care:** You can finally start planning to remove moment.js, date-fns, or dayjs from your dependency tree, though not today. As an architect, this is a signal to start familiarizing your team with the Temporal API so you are ready when browser support reaches critical mass. For any new projects starting in late 2026 or 2027, Temporal should be the default assumption. The nine-year wait is over, and the result is genuinely well-designed.

**Link:** [TC39 Advances Temporal to Stage 4](https://www.infoq.com/news/2026/03/tc39-ecmascript-2026-temporal/)

## Vite 8.0 Ships with Rust-Based Rolldown Bundler

**TLDR:** Vite 8.0 is a major release that integrates the new Rust-based Rolldown bundler as its unified toolchain, alongside an updated React plugin and compatibility preset for the React Compiler.

**Summary:**

Vite 8.0 represents the culmination of the Rolldown effort, bringing a Rust-based bundler into the Vite core. This is the moment the Vite ecosystem has been building toward for the past couple of years, replacing the split between esbuild for development and Rollup for production with a single, fast, Rust-based toolchain.

The performance implications are significant, particularly for larger projects where build times have been creeping up. By unifying the bundler, Vite 8 also eliminates a category of bugs that arose from behavioral differences between the development and production build paths. The React plugin has been updated alongside, and there is a compatibility preset specifically for the React Compiler, which signals that the Vite team is taking React Compiler integration seriously.

Also announced alongside Vite 8 is Vite+ Alpha, described as "The Unified Toolchain for the Web" from the Void0 company. Importantly, they confirmed it will be free and MIT licensed, which removes the lingering concern about the commercialization of Vite's toolchain layer. For the ecosystem, this is reassuring because it means the core tool remains community-owned even as companies build businesses on top of it.

**Key takeaways:**
- Rolldown, the Rust-based bundler, is now integrated into Vite core
- Unified toolchain eliminates dev/production behavioral differences
- React plugin updated with React Compiler compatibility preset
- Vite+ Alpha announced as free and MIT licensed

**Why do I care:** If you are on Vite 7 or earlier, upgrading to Vite 8 should be a priority. The unified Rust-based toolchain is not just faster builds, it is fewer "works in dev but breaks in production" issues, which has been a legitimate pain point. For architects planning frontend build infrastructure, Vite 8 with Rolldown solidifies Vite's position as the default choice. The MIT licensing of Vite+ removes the last strategic concern about betting on this ecosystem.

**Link:** [Vite 8.0](https://vite.dev/blog/vite-8)
