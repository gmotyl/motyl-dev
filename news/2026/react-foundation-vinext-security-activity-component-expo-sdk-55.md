---
title: "React Foundation Launch, Vinext Security Teardown, Activity Component, and Expo SDK 55"
excerpt: "React gets a foundation under the Linux Foundation umbrella, vibe-coded Next.js replacement vinext exposes critical security flaws, React's Activity component transforms streaming apps, and Expo SDK 55 ships with React Native 0.83."
publishedAt: "2026-03-04"
slug: "react-foundation-vinext-security-activity-component-expo-sdk-55"
hashtags: "#thisweekinreact #react #frontend #react-native #expo #security #server-components #view-transitions #solidjs #performance #nextjs #generated #en"
---

## Linux Foundation Announces the Formation of the React Foundation

**TLDR:** Meta has contributed the React project to the Linux Foundation, establishing the React Foundation with open governance. Initial Platinum members include Amazon, Callstack, Expo, Huawei, Meta, Microsoft, Software Mansion, and Vercel.

**Summary:** This is one of those announcements that sounds like a press release but actually carries enormous weight for anyone building on React today. Meta has officially handed the React project -- including React, React Native, and supporting components -- to the Linux Foundation. A new React Foundation now governs the project under neutral, open stewardship. Seth Webster serves as executive director.

Let me be direct about what this means and what it does not mean. On the positive side, having neutral governance removes the "single vendor risk" that has always lingered over React. When one company controls a technology used by millions of developers, there is an inherent tension between corporate priorities and community needs. The Linux Foundation model has worked well for Kubernetes, Node.js, and many other critical projects. Having Amazon, Microsoft, Vercel, and the React Native ecosystem players like Callstack, Expo, and Software Mansion all sitting at the same governance table is a strong signal of collective investment.

What is missing from this announcement, however, is any concrete detail about how governance will actually function day-to-day. Will there be a Technical Steering Committee? How will decisions about React's roadmap be made? The press release is heavy on quotes from corporate leaders and light on mechanics. The Linux Foundation model varies significantly between projects -- some have thriving open governance, others are essentially pay-to-play marketing exercises. We will need to see the charter and governance documents to know which category the React Foundation falls into.

For architects and teams, this should reduce long-term risk assessment concerns about React adoption. If your organization has ever hesitated about React because of Meta's central role, this moves the needle significantly. It also suggests that React Native will continue to receive serious investment from multiple major companies, not just Meta.

**Key takeaways:**
- React project now under neutral governance via the Linux Foundation
- Eight Platinum members including Amazon, Microsoft, Meta, and Vercel
- Covers both React and React Native under one foundation
- Governance details and operational mechanics still need to be disclosed

**Link:** [Linux Foundation Announces the Formation of the React Foundation](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-react-foundation)

## Vinext: Vibe-Hacking Cloudflare's Vibe-Coded Next.js Replacement

**TLDR:** Cloudflare's AI-built Next.js replacement, vinext, was found to contain 24 validated security vulnerabilities including critical cross-request state pollution and session hijacking. The analysis reveals structural risks inherent in AI-generated code that lacks adversarial security testing.

**Summary:** This article should be mandatory reading for anyone shipping AI-generated code to production. Cloudflare built vinext -- a Next.js replacement -- in a week with one engineer and about $1,100 in AI inference costs. An impressive showcase of what current models can do. Then Hacktron ran their security scanner against it and found 45 findings, of which 24 were manually validated, including four critical vulnerabilities.

The most devastating bug is a cross-request state pollution issue. Vinext used Node's AsyncLocalStorage to pass request data between RSC and SSR sandboxes, but chose enterWith() instead of run() because it was simpler and all tests passed. On Cloudflare Workers, where enterWith() is unavailable, every request falls back to a shared global state object. When concurrent requests hit the server, User A literally gets User B's session cookie. This is not a theoretical vulnerability -- it is an authentication bypass that happens by default on every Cloudflare Workers deployment.

The second critical issue is equally elegant in its simplicity. Vinext's fetch caching builds cache keys from the URL, HTTP method, and request body -- but not from Authorization or Cookie headers. The first authenticated user's response gets served to everyone. Next.js handles this with an undocumented heuristic: if a request contains auth headers, it automatically opts out of shared caching. This invisible invariant evolved from production incidents over years. An AI reimplementation has no access to that institutional knowledge.

The article's core insight is profound: security lives in the negative space. The model's objective is "pass the tests," and nobody writes test cases for parser differentials between middleware and the router. Building software is constraint solving. Breaking software requires exploring a vast space of broken assumptions. The first is well-specified; the second is fundamentally more inference-intensive. This has deep implications for every team using AI code generation. Your CI passes? Great. But your security surface area just expanded by everything nobody thought to test.

For architects, the lesson is not "do not use AI for code generation." It is that AI-generated code needs proportionally more security review, not less. Every abstraction layer that gets reimplemented is an opportunity for a parser differential vulnerability. The vinext middleware bypass via double-encoded URLs is a textbook example -- each layer decoded correctly in isolation, but they disagreed on what the URL actually was.

**Key takeaways:**
- AI-generated code passes functional tests but lacks adversarial security hardening
- Cross-request state pollution is the most dangerous class of bugs in server-side code
- Undocumented security heuristics in established frameworks do not transfer to reimplementations
- Parser differentials between layers are a structural vulnerability in any multi-layer system
- Traditional 90-day disclosure timelines cannot keep up with AI-speed shipping

**Tradeoffs:**
- AI code generation delivers extreme speed but sacrifices the institutional security knowledge accumulated through years of production incidents
- Passing all functional tests provides confidence in positive behavior but reveals nothing about negative-space vulnerabilities

**Link:** [vinext: Vibe-Hacking Cloudflare's Vibe-Coded Next.js Replacement](https://www.hacktron.ai/blog/hacking-cloudflare-vinext)

## React's Activity Component Changes the Game for Streaming Apps

**TLDR:** React 19.2's Activity component preserves component state when hiding and showing UI elements, solving the long-standing problem of video players restarting when users navigate away. Combined with useLayoutEffect, it provides a complete solution for stateful media applications.

**Summary:** If you have ever built a video player, a music player, or any media-heavy application in React, you know the pain. User is watching a video, switches to a notes tab, comes back, and the video has restarted from the beginning. React unmounts components when they are hidden, destroying all state. The Activity component, shipping in React 19.2, changes this fundamentally.

The Mux team walks through three progressive scenarios that illustrate the evolution clearly. The first is traditional conditional rendering: video tab disappears, Player unmounts, state is gone. The second wraps the player in Activity with visible and hidden modes. The player stays mounted, state is preserved, but there is a catch -- the video keeps playing in the background. Audio bleeds through to whatever tab the user switched to. The third scenario combines Activity with a useLayoutEffect hook that pauses the player when hidden, giving you state preservation with controlled playback behavior.

What is worth highlighting is the choice of useLayoutEffect over useEffect. Layout effects run synchronously before the browser paints, ensuring the video pauses before the user perceives any tab transition. With useEffect, there would be a brief moment where audio plays from the hidden tab -- a subtle but real UX degradation.

The article somewhat undersells the broader implications. Activity is not just for media players. Think about forms with unsaved data, data tables with complex filter states, canvas applications, or any component where reconstruction cost is high. The pattern essentially gives React the ability to "park" expensive component trees without destroying them. For architects building complex single-page applications with many views, this changes how you think about navigation architecture. Instead of debating between keeping everything mounted versus aggressive unmounting, you now have a middle path with explicit lifecycle control.

What is missing from the discussion is the memory implications. Keeping hidden components mounted means they still consume memory. For applications with many potential views, you need to think about which ones deserve Activity wrapping and which can be safely unmounted and reconstructed.

**Key takeaways:**
- Activity component preserves state by keeping components mounted but hidden
- Use useLayoutEffect (not useEffect) for cleanup actions like pausing media
- The ref forwarding pattern is essential for controlling underlying media elements
- Consider memory implications when deciding which components to wrap with Activity
- Pattern applies to any stateful UI, not just media players

**Link:** [React is changing the game for streaming apps with the Activity component](https://www.mux.com/blog/react-is-changing-the-game-for-streaming-apps-with-the-activity-component)

## ViewTransition in React: Animating Enter, Exit, and Shared Elements

**TLDR:** React now has built-in ViewTransition support that handles enter, exit, update, and shared element animations through CSS view transition classes and JavaScript Web Animations API callbacks, all coordinated automatically with React's rendering lifecycle.

**Summary:** The React team has shipped comprehensive documentation for the ViewTransition component, and the API surface is more thoughtful than I expected. Instead of just wrapping the browser's View Transition API, React has built a layer that automatically decides which type of animation to trigger -- enter, exit, update, or shared element -- based on what actually changed in the component tree during a transition.

The design makes several opinionated choices worth noting. First, React automatically generates unique view-transition-name values for each ViewTransition boundary, which prevents the accidental name collisions that plague manual view transition implementations. You only assign a name explicitly when you want shared element transitions between completely different components. Second, animations only activate during React Transitions (startTransition), Suspense reveals, or useDeferredValue updates. Plain setState calls bypass ViewTransition entirely. This is deliberate -- it prevents every tiny state update from triggering animations.

The CSS class-based approach is elegant. Instead of writing complex view-transition-name selectors, you assign class names to enter, exit, update, and share props, then style them using standard view transition pseudo-selectors with those class names. You can even provide objects that map transition types to different class names, enabling direction-aware animations like forward and backward navigation with different slide directions.

For teams building router-level transitions, there is an important caveat. React will skip animations from the legacy popstate event (back button navigation) because scroll and form restoration require synchronous completion. If you want back-button animations, you need to upgrade your router to use the Navigation API. This constraint pushes the ecosystem toward the new Navigation API, which is now Baseline across browsers.

What the documentation does not fully address is the performance envelope. View transitions create bitmap snapshots of old and new states, which means large component trees could create large bitmaps. The documentation mentions that ViewTransition waits up to 500 milliseconds for fonts to load and also waits for images to load, which could introduce noticeable delays on slow connections. Teams should test with realistic content and network conditions.

**Key takeaways:**
- React automatically determines animation type (enter, exit, update, share) based on component tree changes
- Only Transitions, Suspense, and useDeferredValue activate ViewTransition -- regular setState does not
- CSS class-based approach enables reusable, type-aware animations
- Back-button animations require the Navigation API instead of popstate
- ViewTransition currently works only in the DOM; React Native support is planned

**Link:** [ViewTransition - React](https://react.dev/reference/react/ViewTransition#animating-enter-exit-with-activity)

## Error Rendering with React Server Components

**TLDR:** RSC errors flow through three distinct rendering environments -- RSC, SSR, and Browser -- each handling errors differently. The key insight is that Error Boundaries only work in the browser, so RSC frameworks must route errors to the client as quickly as possible.

**Summary:** This deep dive from the Twofold framework team is the kind of content that separates developers who use React Server Components from developers who understand them. The article traces an error thrown in a Server Component through its entire journey across three rendering environments, and the mechanics are genuinely surprising.

When a Server Component throws an error, the RSC render does not crash. Instead, the error gets serialized into the RSC stream as data. The stream is perfectly valid -- it just contains an error object instead of a component tree. This is a crucial design decision: it means the RSC rendering process is resilient by default. The error only materializes as an actual exception when a downstream consumer tries to render that stream.

The SSR environment is where things get interesting. If you try to turn an RSC stream containing an error into HTML, react-dom's renderToReadableStream throws. Your try-catch catches it, and you are left deciding what to send to the browser. But here is the critical point: Error Boundaries do not work in SSR. The only option is to crash gracefully and return a fallback response.

Suspense boundaries change the calculus significantly. If an error happens inside a Suspense boundary during SSR and the SSR process has already started producing HTML, React cannot throw -- it has already committed to output. Instead, it leaves the fallback rendered and emits a script tag that tells the browser "this boundary errored, try client-side rendering instead." This is React gracefully degrading from SSR to CSR for a specific subtree, not the whole page.

For teams building RSC applications, the practical implication is clear: your architecture needs a fast path from RSC errors to browser Error Boundaries. The browser is the only environment with proper error display capabilities. Every layer between the error source and the browser should be optimized for transparency, not interception.

**Key takeaways:**
- RSC errors are serialized as data in the stream, not thrown as exceptions
- Error Boundaries only work in the browser rendering environment
- Suspense boundaries in SSR convert errors into client-side rendering fallbacks
- Framework authors should prioritize getting errors to the browser quickly
- The three-environment model (RSC, SSR, Browser) requires different error strategies at each layer

**Link:** [Error rendering with RSC](https://twofoldframework.com/blog/error-rendering-with-rsc)

## Understanding Why React Fiber Exists

**TLDR:** React Fiber replaced recursive rendering with an iterative, pausable work loop built on a linked-list data structure, enabling time-slicing that yields control to the browser every few milliseconds and supports priority-based scheduling.

**Summary:** This article does an excellent job of explaining the problem that Fiber solves by starting from first principles. JavaScript is single-threaded. The call stack processes code synchronously. You cannot pause a recursive function in the middle, handle a user input, and resume where you left off. That is not a limitation of React -- it is a fundamental constraint of the JavaScript execution model.

React 15 used recursive function calls for reconciliation. A component tree with 1,000 components meant 1,000 stack frames, all nested. Once rendering started, it ran to completion. If a user typed a character while React was halfway through processing the previous keystroke, that input piled up in the event queue. The browser could not handle it because the call stack was never empty long enough. Everything was equally important because everything blocked everything else.

Fiber's solution is elegant: instead of using the JavaScript call stack to track rendering progress, React builds its own data structure -- a linked list of fiber nodes connected by child, sibling, and return pointers. Each fiber represents one piece of the UI. React processes one fiber, checks the clock (roughly 5 milliseconds in the modern scheduler, though this is now frame-aligned and dynamic), and if time is up, it saves a pointer to where it was and returns control to the browser. The browser handles pending events, repaints, and calls React back for another time slice.

What the article could explore more deeply is the cost of this abstraction. Fiber adds overhead to every render -- there is a fiber node for every component, and the traversal logic is more complex than simple recursion. For small, fast renders, this overhead is pure cost with no benefit. The time-slicing advantage only manifests when renders take longer than a frame. This is why React's scheduler is now frame-aligned rather than using the fixed 5 millisecond heuristic: it dynamically decides whether yielding is necessary based on pending work and available time.

For teams evaluating framework choices, the article correctly notes that Vue and Solid take fundamentally different approaches with reactive signals and fine-grained tracking. These approaches avoid the "render everything, diff everything" model entirely. Fiber is React's answer to a problem that other frameworks sidestep by design. Neither approach is universally better -- they represent different tradeoff profiles around flexibility, predictability, and raw performance.

**Key takeaways:**
- JavaScript's call stack is fundamentally non-interruptible, requiring React to build its own scheduling abstraction
- Fiber converts recursive tree traversal into iterative linked-list walking that can pause and resume
- Modern React scheduler is frame-aligned and dynamic, not the fixed 5 millisecond heuristic
- The overhead of Fiber is only justified for renders that exceed a single frame budget
- Other frameworks avoid this problem entirely with reactive/signal-based approaches

**Link:** [Understanding Why React Fiber Exists](https://inside-react.vercel.app/blog/understanding-why-react-fiber-exists)

## Frontend Memory Leaks: A 500-Repository Study

**TLDR:** An analysis of 500 public repositories found that 86% have at least one missing-cleanup pattern, with 55,864 potential leak instances. Controlled benchmarks show each unhandled pattern retains approximately 8 KB per component mount/unmount cycle, compounding linearly.

**Summary:** This is the kind of empirical research that the frontend community desperately needs. Instead of saying "clean up your effects," this study attaches concrete numbers to the cost of not doing so. The methodology is rigorous: AST-based detectors for React, Vue, and Angular scanned 714,217 files across 500 well-known repositories, while controlled benchmarks measured retained heap growth across 50 independent runs with forced garbage collection.

The headline finding is sobering: 86% of repositories have at least one missing-cleanup pattern. Timers are the number one offender at 43.9% of all findings -- setTimeout without clearTimeout in component code. Event listeners are second at 19%. The most common anti-pattern in React is useEffect with addEventListener but no cleanup return. The linting tools we all rely on do not catch this. The react-hooks/exhaustive-deps rule catches missing dependencies but not missing cleanup returns. A useEffect that adds an event listener without removing it passes linting without warnings.

The benchmark results are remarkably consistent across all five scenarios and frameworks. Every pattern leaks at approximately 8 KB per cycle, regardless of the mechanism -- event listener, timer, subscription, watcher, or animation frame. The cost is determined by payload size, not mechanism. After 100 mount/unmount cycles with a single leaking pattern, the bad variant accumulated roughly 800 KB of retained heap. The good variant: 2.4 KB total. The effect sizes are enormous -- Cohen's d values above 20 mean the distributions have zero overlap.

What makes this particularly insidious for real-world applications is the compounding effect. A dashboard component with three unhandled patterns -- a resize listener, a polling timer, and a store subscription -- leaks 24 KB per navigation. Over 200 view switches in a monitoring session, that is 4.8 MB retained. On mobile devices where iOS Safari kills tabs at 80-120 MB, this trajectory reaches tab-kill territory within a moderate session.

For engineering leads, the action plan is straightforward. Audit the big three first: useEffect without cleanup returns, subscribe without unsubscribe, and addEventListener without removeEventListener. Together these account for 42% of all findings. The fixes are genuinely one-line additions. The study provides grep-based heuristics for a quick first pass and recommends AST-based analysis for accuracy.

**Key takeaways:**
- 86% of 500 well-known repositories have at least one missing-cleanup pattern
- Every missing-cleanup pattern leaks approximately 8 KB per component mount/unmount cycle
- Timers (setTimeout/setInterval) are the most common offender at 43.9% of findings
- Current linting tools do not catch the most common leak patterns
- Fixes are consistently one-line additions -- return cleanup functions from effects

**Tradeoffs:**
- Explicit cleanup model in React/Vue/Angular gives developers flexibility but sacrifices safety-by-default
- Static analysis catches structural patterns with high precision but cannot determine runtime frequency or actual impact

**Link:** [Frontend Memory Leaks: A 500-Repository Static Analysis and Five-Scenario Benchmark Study](https://stackinsight.dev/blog/memory-leak-empirical-study/)

## Expo SDK 55

**TLDR:** Expo SDK 55 ships with React Native 0.83 and React 19.2, removes Legacy Architecture support entirely, introduces Hermes v1 with early performance improvements, and significantly advances Expo UI for both SwiftUI and Jetpack Compose.

**Summary:** This is a massive release. Expo SDK 55 draws a line in the sand on several fronts. Legacy Architecture support is gone -- if you have not migrated to the New Architecture, this is your forcing function. The newArchEnabled config option has been removed from app.json entirely. This is not a deprecation warning; it is a hard break.

Hermes v1 is the most technically significant addition. The new engine shows early signs of meaningful performance improvements and ships better support for modern JavaScript features including ES6 classes, const/let syntax, and async/await. The catch is that using Hermes v1 in SDK 55 requires building React Native from source, which significantly increases native build times. This is opt-in for now, with the expectation that it becomes default in a future SDK.

The Hermes bytecode diffing feature for OTA updates is a practical win that will affect every team using EAS Update. Instead of downloading complete bytecode files for each update, the client can apply binary diffs to previously installed files. Expo estimates an approximately 75% reduction in download sizes. For apps with large JavaScript bundles, this translates directly to faster update adoption rates and reduced bandwidth costs.

Expo UI has matured significantly. The Jetpack Compose API has been promoted from alpha to beta with a reworked functional DSL pattern and many new Material3 components. SwiftUI APIs have been renamed to match SwiftUI conventions more closely. The new expo-widgets package enables iOS home screen widgets and Live Activities using Expo UI components without writing native code. For teams building cross-platform apps, the convergence of SwiftUI and Jetpack Compose APIs under a single Expo abstraction is a compelling story.

The brownfield integration story is also noteworthy. SDK 55 introduces two approaches: integrated (React Native code inside your existing native project) and isolated (packaged as a native library that native developers can consume without Node.js). This directly addresses one of the biggest barriers to React Native adoption in enterprise environments where native teams cannot or will not install a JavaScript toolchain.

For teams planning upgrades, be aware of several breaking changes: Expo Go no longer supports expo-av (replaced by expo-video and expo-audio), edge-to-edge is mandatory on Android 16+, and eas update now requires the --environment flag. The Expo team recommends using their upgrade skills with Claude Code to automate the migration process.

**Key takeaways:**
- Legacy Architecture support is completely removed -- New Architecture is mandatory
- Hermes v1 offers performance improvements but requires building React Native from source
- Bytecode diffing reduces OTA update download sizes by approximately 75%
- Expo UI promotes Jetpack Compose to beta with functional DSL and Material3 components
- Brownfield support now offers both integrated and isolated packaging approaches
- Minimum Xcode bumped to 26, minimum iOS remains 15.1 (16.4 planned for SDK 56)

**Link:** [Expo SDK 55 - Expo Changelog](https://expo.dev/changelog/sdk-55)

## Sparkling: The Missing App Layer for Lynx.js

**TLDR:** Sparkling, built by the TikTok infrastructure team, provides Lynx.js with a CLI, native navigation, typed bridge APIs, and platform-specific SDKs -- functioning as Lynx's equivalent of what Expo is to React Native. It is early-stage and publicly available.

**Summary:** Lynx.js has been an interesting technology to watch since its release in March 2025, but the developer experience story was incomplete. You could embed Lynx into existing native apps or use a shell app, but there was no clean greenfield path and no native navigation system. Sparkling fills both gaps.

The architecture is worth understanding because it originates from TikTok's production infrastructure, not from a greenfield experiment. Each page runs in its own native container, opened through deeplink-like schemes. Navigation is container-based -- when you navigate to a new page, Sparkling opens a native container and loads a separate Lynx bundle into it. This is fundamentally different from web-style routing where everything runs in one JavaScript context. The container model maps more naturally to mobile platform conventions around transitions, lifecycle, and back-button behavior.

The Callstack team's honest assessment of the current state is refreshing. The dev server story is not fully resolved -- the workflow currently centers around build, copy, run rather than a live dev server loop. The Sparkling team confirmed they have this solved internally but it has not been exposed publicly yet. DevTools are not wired up by default in the template. Passing parameters between pages is not clearly documented. The iOS template has visual rough edges. This is an early public beta of internal tooling, and setting expectations correctly matters.

For architects evaluating cross-platform options, Sparkling is worth tracking but not yet ready for production adoption. The underlying architecture is proven at TikTok's scale, which is a strong signal. But the public-facing tooling, documentation, and developer experience need significant iteration before it can compete with established ecosystems like React Native with Expo. The team's transparency about the project's maturity level is a good sign for its long-term trajectory.

**Key takeaways:**
- Sparkling provides Lynx.js with an application layer including CLI, native navigation, and bridge APIs
- Architecture is based on TikTok's production infrastructure with per-page native containers
- Navigation uses a scheme-driven container model rather than web-style routing
- Developer experience is still early-stage: no integrated dev server, minimal documentation
- Worth tracking for the architecture but not production-ready for most teams

**Link:** [Sparkling: The Missing App Layer for Lynx.js](https://www.callstack.com/blog/sparkling-the-missing-app-layer-for-lynx-js)

## Navigation API Reaches Baseline Across All Major Browsers

**TLDR:** The Navigation API is now Baseline Newly Available across Chrome, Firefox, and Safari as of early 2026, replacing the History API with a single centralized event handler for all navigation types in SPAs.

**Summary:** After over a decade of fighting with window.history for SPA routing, the Navigation API has finally landed across all major browsers. This is one of those web platform improvements that seems incremental but has the potential to simplify an enormous amount of framework code.

The core improvement is architectural: instead of juggling pushState calls, popstate listeners, link click interception, and form submission handling separately, the Navigation API gives you a single navigate event that fires for everything -- link clicks, form submissions, back/forward buttons, and programmatic navigation. The event.intercept() method handles URL updates, history stack management, and accessibility primitives like focus restoration automatically.

The async scrolling support deserves attention. The Navigation API provides event.scroll() for manual control over when the browser restores scroll position. In modern SPAs where content is loaded asynchronously, the browser's default scroll restoration fires before content is ready, landing the scroll in the wrong position. With event.scroll(), you fetch your data, render it, and then tell the browser to restore the scroll position -- in that order.

For React teams, this has direct implications for view transitions and router architecture. React's ViewTransition documentation explicitly states that animations from popstate events are skipped because scroll restoration requires synchronous completion. Upgrading to the Navigation API unblocks those animations. Framework authors for React Router, TanStack Router, and others will likely adopt this API to enable richer transition support.

**Key takeaways:**
- Single navigate event replaces pushState, popstate, and click interception
- event.intercept() handles URL updates, history, and accessibility automatically
- Manual scroll restoration via event.scroll() fixes async content rendering issues
- Designed to work seamlessly with the View Transitions API
- React ViewTransition requires the Navigation API for back-button animations

**Link:** [Navigation API - a better way to navigate, is now Baseline Newly Available](https://web.dev/blog/baseline-navigation-api)

## Goodbye innerHTML, Hello setHTML: XSS Protection in Firefox 148

**TLDR:** Firefox 148 ships the standardized Sanitizer API with setHTML(), providing built-in XSS protection by sanitizing untrusted HTML before DOM insertion. It is the first browser to implement this standard.

**Summary:** Cross-site scripting remains one of the most prevalent web vulnerabilities, and the new Sanitizer API takes a fundamentally different approach to prevention compared to Content Security Policy. Where CSP requires significant architectural changes and continuous security review, setHTML() provides safety by default with minimal code changes -- essentially a drop-in replacement for innerHTML assignments.

The API is straightforward. Instead of assigning untrusted HTML through innerHTML, you call element.setHTML() with the same string. The method automatically strips dangerous elements and attributes -- script tags, onclick handlers, event attributes -- while preserving safe structural HTML. Developers can provide custom configurations to adjust the sanitization strictness for specific use cases.

The combination with Trusted Types is where this gets architecturally interesting. Trusted Types centralize control over HTML parsing and injection. Once setHTML() is adopted, sites can enable Trusted Types enforcement to block all other unsafe HTML insertion methods. This creates a defense-in-depth strategy where setHTML() is the only sanctioned path for dynamic HTML insertion, and Trusted Types ensure nothing else slips through.

Firefox 148 is the first browser to ship this API, and other browsers are expected to follow. For frontend teams, this is worth adding to your security roadmap now. The migration path from innerHTML to setHTML() is mechanical and can be largely automated. The harder question is identifying all the places where untrusted HTML enters the DOM -- through third-party libraries, legacy code, and edge cases that nobody remembers writing.

**Key takeaways:**
- setHTML() sanitizes HTML automatically, removing XSS attack vectors before DOM insertion
- Minimal code change required: replace innerHTML assignments with setHTML() calls
- Customizable sanitization configuration for different security requirements
- Combines with Trusted Types for defense-in-depth against XSS
- Firefox 148 is first to ship; other browsers expected to follow

**Link:** [Goodbye innerHTML, Hello setHTML: Stronger XSS Protection in Firefox 148](https://hacks.mozilla.org/2026/02/goodbye-innerhtml-hello-sethtml-stronger-xss-protection-in-firefox-148/)

## Solid 2.0 Beta: The Suspense is Over

**TLDR:** Solid 2.0 enters beta with first-class async support, a new Loading component for initial readiness, action-based mutations with optimistic UI primitives, and deterministic microtask-based batching. Major breaking changes to effects, stores, and control flow.

**Summary:** SolidJS 2.0 entering beta is significant for the broader frontend ecosystem even if you are not using Solid. The design decisions here represent Ryan Carniato's distillation of years of thinking about reactivity, async data flow, and UI state management -- and many of these ideas will influence other frameworks.

The async model is the headline feature. Computations can now return Promises, and the reactive graph knows how to suspend and resume work. The new Loading component handles initial readiness -- showing a fallback while a subtree cannot produce UI yet -- while isPending() provides a reactive expression for background refresh states. This distinction between "not ready yet" and "refreshing" is a design insight that React's Suspense model has struggled to communicate clearly.

The action system with optimistic primitives is the most practical addition for application developers. The pattern of optimistic UI update, await server write, then refresh derived reads is captured as a single coherent flow using action() generators combined with createOptimistic and createOptimisticStore. This is the kind of ergonomic improvement that reduces the boilerplate that typically surrounds optimistic UI patterns in any framework.

The batching model change is worth understanding even if you do not use Solid. Updates are now microtask-batched, and reads do not update until the batch flushes. This means setCount(1) followed immediately by count() still returns 0 until flush() is called. This is more predictable than React's batching behavior and eliminates an entire category of subtle timing bugs, but it requires developers to be explicit about when they need settled state.

For teams evaluating frontend frameworks, Solid 2.0 beta represents a mature alternative to React that makes fundamentally different architectural choices. The reactive signal model avoids the reconciliation overhead that React Fiber exists to manage. The tradeoff is a more constrained component model where you cannot treat components as pure functions of props in the same way.

**Key takeaways:**
- Async is first-class: computations can return Promises and the graph suspends/resumes
- Loading component separates initial readiness from background refresh states
- Actions with optimistic primitives provide a coherent mutation flow
- Deterministic microtask batching requires explicit flush() for settled state reads
- Major breaking changes: For/Index merged, effects split, stores reworked, directives removed

**Link:** [Release v2.0.0 Beta - The Suspense is Over - solidjs/solid](https://github.com/solidjs/solid/releases/tag/v2.0.0-beta.0)

## React Native Brownfield v3 with Expo Config Plugin

**TLDR:** Callstack's React Native Brownfield v3 simplifies incremental React Native adoption with a single Expo config plugin line, plus CLI tooling to package your Expo app as an XCFramework or AAR for consumption by native teams.

**Summary:** The brownfield integration story for React Native has historically been painful. Native teams need to install Node.js, understand the Metro bundler, and wrestle with build configuration. React Native Brownfield v3 attacks this problem from a practical angle: package your entire Expo app as a single native artifact that native developers can drop into their existing projects.

The workflow is clean. Add the config plugin with one line in app.json, run a CLI command to produce an XCFramework for iOS or AAR for Android, and hand it off to the native team. The native integration requires about three lines of code for initialization and one view component to present the React Native UI. Native developers never need to touch Node.js, npm, or Metro.

The choice between integrated and isolated approaches is architecturally significant. Integrated mode keeps React Native code inside the existing native project, which works well for teams that iterate on both native and React Native code. Isolated mode packages everything as a standalone library, which is better for organizations where native and React Native teams operate independently. The isolated approach particularly benefits enterprise environments where the native team may not want (or be allowed) to add JavaScript toolchain dependencies to their build pipeline.

For teams considering incremental migration to React Native, this lowers the adoption barrier significantly. The technology for brownfield integration is solved. What remains challenging is the organizational and strategic aspects: choosing which screens to migrate first, maintaining bidirectional navigation, sharing state between native and React Native, and establishing performance metrics.

**Key takeaways:**
- Single config plugin line enables brownfield packaging
- CLI produces XCFramework (iOS) and AAR (Android) artifacts
- Native teams can consume React Native UI without JavaScript toolchain
- Integrated vs isolated modes serve different team structures
- Ecosystem includes shared state management and navigation helpers

**Link:** [React Native Brownfield v3 with Expo Config Plugin](https://www.callstack.com/blog/announcing-react-native-brownfield-v3-with-expo-config-plugin)

## Introducing Visual Testing in Maestro

**TLDR:** Maestro adds assertScreenshot and cropOn for screenshot-based visual regression testing, enabling pixel-level comparison against baselines with configurable thresholds and element-level cropping.

**Summary:** Functional tests verify that buttons respond and screens load, but they are blind to visual regressions. Maestro's new visual testing capabilities close that gap with two additions: assertScreenshot for baseline comparison and cropOn for isolating specific UI elements.

The cropOn feature is the practical enabler. Real mobile apps have dynamic elements that change between runs -- status bar clocks, timestamps, user avatars. Without the ability to crop to specific containers, screenshot testing produces constant false failures. By targeting specific elements via Maestro selectors, you can validate the parts of the UI you care about while ignoring natural variance.

The threshold system is pragmatic. The default 95% pixel match requirement means up to 5% of pixels can differ before failure. For most screens, this absorbs anti-aliasing differences and minor rendering variations. For pixel-sensitive components like charts or custom illustrations, you can raise it to 98 or 99 percent. When tests fail, Maestro generates a visual diff highlighting exactly what changed.

For mobile teams, this fills a real gap in the testing pyramid. After major dependency upgrades -- React Native versions, UI library updates -- subtle layout shifts are common and difficult to catch with functional assertions. Design system component testing is another strong use case: one visual test on a shared button component catches regressions across every screen that uses it.

**Key takeaways:**
- assertScreenshot compares current screen against saved baselines
- cropOn isolates specific elements using Maestro selectors
- Default 95% threshold absorbs rendering variance; raise for pixel-sensitive content
- Particularly valuable after dependency upgrades and for design system components
- Visual diffs generated on failure for quick debugging

**Link:** [Introducing Visual Testing in Maestro](https://maestro.dev/blog/visual-testing)