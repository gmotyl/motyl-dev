---
title: "Next.js 16.2, TypeScript 6.0, and the Post-Compiler React World"
excerpt: "A massive week with Next.js 16.2 bringing AI agent tooling and Turbopack improvements, TypeScript 6.0 bridging to the native Go compiler, plus supply chain attacks and the death of manual memoization."
publishedAt: "2026-03-25"
slug: "nextjs-16-2-typescript-6-react-compiler-guide"
hashtags: "#thisweekinreact #react #reactnative #nextjs #typescript #turbopack #security #testing #signals #performance #generated #en"
---

## Next.js 16.2

**TLDR:** Next.js 16.2 delivers a roughly four-hundred percent faster dev startup, fifty percent faster rendering through a React core contribution, and a redesigned error experience with hydration diffs, server function logging, and a new default error page.

**Summary:**

Let me tell you, this is one of those releases that makes you sit up and pay attention. The headline number is that dev startup is about eighty-seven percent faster compared to 16.1 on the same machine, same project. That means your localhost is ready almost instantly. But the rendering story is arguably even more impressive. The Vercel team contributed a change directly to React that makes Server Components payload deserialization up to three hundred and fifty percent faster. The old implementation used a JSON.parse reviver callback that crossed the C++ and JavaScript boundary in V8 for every single key-value pair. The new approach does a plain JSON.parse followed by a recursive walk in pure JavaScript, which eliminates that overhead entirely. In real-world apps, that translates to twenty-five to sixty percent faster HTML rendering depending on payload size.

Beyond raw performance, the developer experience improvements are substantial. Server Functions now log their execution in the terminal during development, showing the function name, arguments, execution time, and source file. Hydration mismatches get a proper diff indicator in the error overlay with a clear plus-Client minus-Server legend. You can now attach the Node.js debugger to your production server with the inspect flag on next start, not just in dev mode. The Link component picks up a transitionTypes prop for controlling View Transitions during navigation.

There is also a batch of experimental features worth watching. The unstable catchError function provides component-level error boundaries that understand framework internals like redirect and notFound. The unstable retry function in error.tsx re-fetches data from the server instead of just clearing client error state. And the experimental prefetchInlining option bundles all segment data for a route into a single response, reducing prefetch request volume. Adapters are now stable too, giving deployment platforms a proper API to customize the build process.

One thing the post avoids discussing is the growing complexity cost of all these experimental APIs. We now have unstable_catchError, unstable_retry, experimental.prefetchInlining, experimental.cachedNavigations, and experimental.appNewScrollHandler all in a single release. The naming convention with "unstable" is honest, but the sheer volume of half-baked APIs that developers need to track is becoming a cognitive burden in itself.

**Key takeaways:**
- Dev startup is roughly 87% faster, rendering is 25-60% faster through a React core optimization
- Server Function logging, hydration diff indicators, and debugger support for production servers are now available
- Experimental catchError and retry APIs offer framework-aware error boundaries that handle redirect and notFound correctly

**Why do I care:** If you are running Next.js in production, the rendering improvements alone justify the upgrade. The Server Components deserialization fix is a React-level change that benefits everyone, and the new debugging tools close real gaps in the developer workflow.

**Link:** [Next.js 16.2](https://nextjs.org/blog/next-16-2)

## Next.js 16.2: AI Improvements

**TLDR:** Next.js 16.2 treats AI coding agents as first-class development tools, adding AGENTS.md to create-next-app, browser log forwarding to the terminal, and an experimental CLI that gives agents access to React DevTools without a browser.

**Summary:**

This is where things get philosophically interesting. The Next.js team ran research comparing how AI agents perform with bundled documentation versus skill-based retrieval approaches. The bundled docs achieved a one hundred percent pass rate on their evals, while skill-based approaches maxed out at seventy-nine percent. Their conclusion is that always-available context beats on-demand retrieval because agents often fail to recognize when they should search for documentation. So now create-next-app ships an AGENTS.md file by default that tells agents to read docs bundled at node_modules/next/dist/docs before writing any code.

Browser log forwarding is pragmatic and well-motivated. During development, client-side errors now appear in the terminal by default because AI agents operate primarily through the terminal and cannot access a browser console. You can control the verbosity through a logging.browserToTerminal config option. The dev server lock file is another agent-friendly addition. When a second dev server tries to start, it reads the lock file and prints a structured error with the PID and URL, so an agent can decide to kill the existing process or connect to it without human intervention.

The most ambitious piece is the experimental next-browser CLI from Vercel. It exposes screenshots, network requests, console logs, component trees, props, hooks, and Partial Prerendering shell analysis as structured text via shell commands. An agent can run next-browser tree, parse the output, and decide what to inspect next. The PPR analysis is particularly clever, it can tell the agent exactly which component is blocking the static shell and suggest wrapping it in a Suspense boundary.

What the post does not address is the feedback loop risk. If agents are generating Next.js code and Next.js is optimizing for agent-generated code, we could end up in a world where the framework becomes increasingly opaque to human developers. The AGENTS.md approach also assumes the documentation is correct and complete, which is a significant assumption for a framework that ships experimental APIs at this pace.

**Key takeaways:**
- Bundled documentation outperformed skill-based retrieval for AI agents with a 100% vs 79% pass rate
- Browser errors now forward to the terminal by default for agent-powered debugging
- The experimental next-browser CLI gives agents structured access to React DevTools and PPR analysis

**Why do I care:** Whether you use AI agents or not, these changes signal where framework design is heading. The AGENTS.md pattern and structured CLI output are ideas that other frameworks will likely adopt, and understanding the agent-first development model is becoming a professional necessity.

**Link:** [Next.js 16.2: AI Improvements](https://nextjs.org/blog/next-16-2-ai)

## Turbopack: What's New in Next.js 16.2

**TLDR:** Turbopack ships Server Fast Refresh with sixty-seven to one hundred percent faster application refresh, Subresource Integrity support, tree shaking for dynamic imports, and over two hundred bug fixes.

**Summary:**

Two releases after becoming the default bundler, Turbopack is making a serious push on the fundamentals. The headliner is Server Fast Refresh, which reworks how server-side code is reloaded during development. The previous system cleared the require cache for the changed module and everything in its import chain, which often meant reloading unchanged node_modules. The new system brings the same Fast Refresh approach from the browser to server code. Because Turbopack knows the full module graph, only the module that actually changed gets reloaded. The result is sixty-seven to one hundred percent faster application refresh and four hundred to nine hundred percent faster compile times inside Next.js.

Subresource Integrity is a welcome addition for security-conscious teams. It generates cryptographic hashes of your JavaScript files at build time, letting browsers verify that files have not been modified. This matters because Content Security Policy with nonce-based methods requires dynamic rendering for every page. SRI provides an alternative that computes hashes ahead of time and only allows the browser to execute scripts with approved hashes, which works with static rendering.

Tree shaking now applies to destructured dynamic imports the same way it does to static imports, removing unused exports from the bundle. Web Workers got a fix for their origin URL, which was previously set to an empty string because workers were bootstrapped through blob URLs. The updated bootstrap code correctly points to your domain, unblocking WASM code that uses importScripts or fetch inside workers.

The article is honest about the current focus being on stability and parity rather than bleeding-edge features. They mention that the next release will focus on compiler performance and memory usage, which suggests those are still pain points. With over two hundred changes and bug fixes, it is clear that the Turbopack team is working through a long tail of compatibility issues that come with replacing a mature tool like webpack.

**Key takeaways:**
- Server Fast Refresh brings fine-grained hot reloading to server code with dramatic compile time improvements
- Subresource Integrity support enables Content Security Policy without sacrificing static rendering
- Dynamic import tree shaking and Web Worker origin fixes close real-world compatibility gaps

**Why do I care:** If you were holding off on Turbopack due to compatibility concerns, this release addresses a significant chunk of those issues. The Server Fast Refresh improvement alone can meaningfully change your development feedback loop.

**Link:** [Turbopack: What's New in Next.js 16.2](https://nextjs.org/blog/next-16-2-turbopack)

## Implementing Next.js 16 'use cache' with next-intl Internationalization

**TLDR:** The new use cache directive in Next.js 16 conflicts with next-intl because the library reads locale from headers, but Next.js 16.2 ships root params that solve this without prop drilling.

**Summary:**

Aurora Scharff dives into a real compatibility pain point that anyone using internationalization with Next.js 16 will hit. When you enable cacheComponents and try to use the use cache directive alongside next-intl, things break because getTranslations reads from headers internally, and cached components cannot depend on request-time information. The article walks through why next-intl uses headers in the first place: to avoid manually threading the locale prop through deeply nested component trees. The library passes the locale as a request header from middleware to Server Components behind the scenes.

The workaround before Next.js 16.2 involved accepting the locale as a prop in cached components and passing it explicitly to getTranslations. This works but requires careful prop drilling from page components that have access to params. The article then provides an update for Next.js 16.2 which ships the root params API. With experimental rootParams enabled, you can import locale from next/root-params and call it as an async function anywhere, including inside use cache functions. The locale value automatically becomes a cache key.

The practical detail that the article handles well is the requirement that the locale segment must be a root parameter with no app/layout.tsx file above it. The root layout needs to live inside the locale directory. This is the kind of structural constraint that trips people up when migrating. The article also notes that setRequestLocale is still needed in layouts and pages, and you still need to pass locale explicitly to getTranslations inside use cache until next-intl integrates root params internally.

**Key takeaways:**
- The use cache directive conflicts with next-intl because getTranslations reads headers at request time
- Next.js 16.2 root params API eliminates prop drilling by making locale available anywhere, including cached components
- The locale segment must be a root parameter with the root layout inside it for this to work

**Why do I care:** If you maintain an internationalized Next.js app, this article saves you hours of debugging. The root params pattern is also relevant beyond i18n, it represents a general solution for accessing route parameters deep in the component tree without breaking caching.

**Link:** [Implementing Next.js 16 'use cache' with next-intl](https://aurorascharff.no/posts/implementing-nextjs-16-use-cache-with-next-intl-internationalization/)

## Error Handling in Next.js with catchError

**TLDR:** The new unstable_catchError from Next.js 16.2 replaces the workarounds needed for react-error-boundary in Server Components, correctly propagating framework errors and providing a retry function that re-fetches server data.

**Summary:**

Aurora Scharff does an excellent job cataloging the two fundamental problems with using react-error-boundary in Server Components. First, Next.js throws for control flow through notFound, redirect, unauthorized, and forbidden, using special digests that react-error-boundary cannot distinguish from real errors. Your generic fallback fires when you should be getting a 404 or a redirect. Second, the recovery mechanism calls resetErrorBoundary, which clears client error state and re-renders the children, but does not re-fetch server data. The component renders again with the same stale state.

The article walks through the workaround that existed before: a custom boundary that checks error digests for known prefixes like NEXT_REDIRECT and NEXT_NOT_FOUND, re-throws framework errors, and combines router.refresh with a key bump wrapped in startTransition for recovery. This works but requires maintaining a digest allowlist and wiring up the refresh-and-key mechanism yourself. The unstable_rethrow function from next/navigation simplifies the server-side half but does not address recovery.

The new catchError API solves both problems in a single function call. You define a fallback function that receives props and an ErrorInfo object with the error and a retry callback. Framework errors propagate correctly without being caught. The retry function re-fetches and re-renders the error boundary contents on the server. The same retry pattern works at the route level in error.tsx through the unstable_retry prop. The article includes the component hierarchy that Next.js creates for each route segment, which is genuinely useful for understanding where each boundary sits.

What is missing from the discussion is any consideration of the migration path for teams that have already built custom error boundary infrastructure. The "unstable" prefix suggests the API could change, and investing in adoption now carries some risk.

**Key takeaways:**
- react-error-boundary catches framework control flow errors and cannot re-fetch server data on recovery
- catchError correctly propagates notFound, redirect, and auth interrupts while providing server-aware retry
- The same retry pattern works at both component level with catchError and route level in error.tsx

**Why do I care:** Error handling in Server Components has been a genuine pain point. If you have been maintaining custom error boundary workarounds with digest checks and refresh-plus-key mechanisms, catchError replaces all of that with a cleaner abstraction.

**Link:** [Error Handling in Next.js with catchError](https://aurorascharff.no/posts/error-handling-in-nextjs-with-catch-error)

## Start Naming Your useEffect Functions

**TLDR:** Replacing anonymous arrow functions in useEffect with named function expressions makes components scannable, improves stack traces, and often reveals effects that do too much or should not exist at all.

**Summary:**

Neciu Dan makes a deceptively simple argument that lands with real force. The core observation is that useEffect with an anonymous arrow function tells you when code runs but not why. When a component has four effects, you need to read every line of every one to understand the data flow. Replace those anonymous arrows with named function expressions like connectToInventoryWebSocket, fetchInitialStock, resetStockOnLocationChange, and notifyParentOfStockUpdate, and suddenly you can skim four function names and understand the entire component.

The debugging payoff is concrete. An anonymous arrow that throws gives you "at anonymous at InventorySync.tsx line 14", which is useless when you have four effects. A named function gives you "at connectToInventoryWebSocket at InventorySync.tsx line 14", which tells you exactly which effect broke without opening the file. This matters in monitoring tools when you are triaging errors on your phone, and it matters in React DevTools profiling where named functions appear with their names.

But the most interesting insight is that naming reveals design problems. When you struggle to name an effect without using "and" or "also", the effect is doing two unrelated things and should be split. When the best name sounds like internal state shuffling, like syncDerivedValue or updateStateBasedOnOtherState, the code probably does not belong in an effect at all. The author shares a story about a Mapbox component with five effects that became three after naming revealed that two effects were really one concern and two others always ran together. The article correctly notes that AI code generation tools make the over-use of effects worse because they reproduce anti-patterns confidently from training data.

**Key takeaways:**
- Named function expressions in useEffect make components scannable and improve error stack traces
- Struggling to name an effect without "and" signals it should be split into separate effects
- If the best name sounds like state-to-state synchronization, the code probably does not belong in an effect

**Why do I care:** This is one of those rare pieces of advice that costs nothing to adopt and pays off immediately. The naming discipline forces better effect design, and the debugging improvements are real for anyone maintaining production React applications.

**Link:** [Start naming your useEffect functions](https://neciudan.dev/name-your-effects)

## use(): The Hook That Breaks the Rules (On Purpose)

**TLDR:** React 19's use hook eliminates the useState-useEffect-loading-error boilerplate for data fetching by integrating directly with Suspense and Error Boundaries, and it is the first hook that can be called conditionally.

**Summary:**

This article by Sasch provides a thorough walkthrough of the use hook and its implications for how we structure data fetching in React. The core value proposition is replacing the three-state-variable, cleanup-flag, dependency-array pattern that every data-fetching component has reinvented for years. With use, you pass a Promise and the component suspends while it is pending. Suspense shows the fallback, Error Boundary catches rejections, and the component itself only contains the happy path.

The article handles the caching problem honestly, which is where most tutorials stop. If you create a promise inside a Client Component, it returns a new Promise object on every render, React sees a new promise, suspends again, re-renders, creates another promise, and you get an infinite loop. The solutions range from creating the promise in a parent Server Component, to using a module-level cache map, to using data fetching libraries like TanStack Query. The article provides a clear decision matrix for when each approach is appropriate.

The conditional calling capability is genuinely novel. Unlike every other hook, use can be called inside if statements, loops, and after early returns. When used with Context, this means a component can skip subscribing to a context when the condition is false, which is a real performance improvement for components that only need context in certain code paths. The migration path from existing useEffect-based fetching is practical: encapsulate in a custom hook, add Suspense boundaries, swap internals, then push promise creation up to Server Components.

What the article underplays is the mental model shift required. The promise stability requirement is subtle and will catch teams off guard. The fact that you cannot use try-catch with use because it throws a Suspense Exception is another footgun that needs more emphasis.

**Key takeaways:**
- use replaces the useState-useEffect-loading-error pattern with a single line that integrates with Suspense
- Promise stability is critical: creating a new promise on every render causes infinite loops
- use is the first hook that can be called conditionally, enabling performance gains with Context

**Why do I care:** This is the most significant change to data fetching patterns in React since hooks were introduced. Understanding when to use use versus useEffect versus a data fetching library is becoming essential knowledge for React developers.

**Link:** [use(): The Hook That Breaks the Rules (On Purpose)](https://saschb2b.com/blog/use-hook-react)

## Test IDs Are an a11y Smell

**TLDR:** Using data-testid for element selection in tests hides accessibility problems because users cannot see test IDs. Role-based selectors simultaneously make tests more readable and enforce accessible markup.

**Summary:**

TkDodo makes a sharp argument against the data-testid pattern that is still surprisingly common in React codebases. The fundamental insight is that when you use a test ID to query an element, you are interacting with it in a way that no user ever would. You can replace a button with a clickable div and your test still passes, but that div is not keyboard accessible and screen readers will not announce it properly. Role-based selectors like getByRole button with name "Open Widget" would catch this immediately because a div does not have the button role.

The practical examples are compelling. Instead of screen.getByTestId, you write queries that read like natural descriptions: "I am clicking the Dashboards Link in the Sidebar" becomes within the navigation, getByRole link with name Dashboards. "Let me click the Confirm Button in the Save Dialog" becomes within the dialog named Save, getByRole button with name Confirm. These read better, test more, and enforce that your markup has proper semantic structure.

The article acknowledges that this requires accessible markup in the first place, which is the whole point. If your tests cannot find an element with a role-based selector, some of your users probably cannot either. The European Accessibility Act and the Americans with Disabilities Act require WCAG 2.1 AA compatibility, so this is not optional anymore. The tips for getting there are practical: use semantic HTML for implicit ARIA roles, associate form controls with labels, use the keyboard to navigate your app, and leverage Testing Playground to find the best accessible selector.

The article could benefit from addressing the counterargument more directly. There are legitimate cases where test IDs are useful, such as testing implementation-specific behavior that is not user-facing. But for the vast majority of interaction tests, the role-based approach is strictly better.

**Key takeaways:**
- data-testid hides accessibility problems because it allows tests to pass on inaccessible markup
- Role-based selectors enforce semantic HTML and provide free accessibility testing as a side effect
- If a role-based selector cannot find your element, your users with assistive technology probably cannot either

**Why do I care:** With accessibility legislation becoming enforceable globally, writing tests that enforce accessible markup is not just good practice but a legal requirement. Switching to role-based selectors costs little and provides dual value as both tests and accessibility audits.

**Link:** [Test IDs are an a11y smell](https://tkdodo.eu/blog/test-ids-are-an-a11y-smell)

## Type Safety in React Router

**TLDR:** React Router now generates route types automatically, introduces the useRoute hook for type-safe loader data anywhere in the tree, and provides an href function that breaks at compile time when routes change.

**Summary:**

Raphael Bronsveld makes a case that React Router deserves more credit in the type safety conversation that is often dominated by TanStack Start. The improvements are real and practical. With type generation enabled, your route modules get fully typed params from route definitions, typed data from loaders, and typed component props. You no longer need the manual typeof cast on useLoaderData that was previously required.

The useRoute hook is the more interesting addition. It takes a route ID matching the path from your routes.ts and returns type-safe loaderData and actionData. Passing no argument returns the current route. If you access a route you are not currently on, it returns undefined, which forces you to handle that case. This solves the problem of needing loader data in deeply nested components without manually threading types through the component tree. The hook is marked as unstable but the author considers it fairly safe to use given the API is unlikely to change significantly.

The href function completes the type safety picture for navigation. It validates route paths and parameters at compile time, so if you rename or remove a route, TypeScript flags every broken href call. This eliminates an entire category of runtime errors where link destinations silently break during refactoring.

The author correctly notes that all of this is specific to framework mode and requires the React Router Vite plugin. Library mode users do not get type generation. This is worth emphasizing more because many existing React Router projects are still in library mode and would need to migrate to benefit.

**Key takeaways:**
- Route type generation eliminates manual type casting for params, loader data, and component props
- The useRoute hook provides type-safe access to any route's loader data from anywhere in the component tree
- The href function validates routes and parameters at compile time, catching broken links during refactoring

**Why do I care:** If you are already using React Router and have been eyeing TanStack Start for type safety, these additions close much of the gap. The compile-time route validation alone can prevent a significant class of bugs.

**Link:** [Type Safety in React Router](https://raphaelbronsveld.com/blog/type-safety-in-react-router)

## Post-React Compiler Coding Guide

**TLDR:** With React Compiler handling memoization automatically, the new coding standard is to write components as pure functions, derive values inline, avoid manual useMemo and useCallback, and trust the compiler to optimize.

**Summary:**

This guide by Pavi is explicitly written for AI agents generating React code, but it is equally valuable as a mental model for human developers. The core thesis is that React Compiler v1.0 fundamentally shifts the performance optimization responsibility from the developer to the compiler. The pre-compiler model had developers manually controlling re-renders through useMemo, useCallback, and memo. The post-compiler model says write for clarity and correctness, not render avoidance.

The practical guidelines are concrete. Use normal variables, functions, and expressions instead of wrapping logic in hooks. Do not introduce useMemo, useCallback, or React.memo unless you are integrating with non-React systems or need referential stability for correctness. Derive values inline during render instead of storing derived data in state. Inline callbacks in JSX are fine because the compiler handles them. The article also covers the different compilation modes, with infer being the default where the compiler heuristically detects components and hooks based on naming conventions.

The section on compiler directives is important for team adoption. The use memo directive explicitly opts a function into compilation and is required in annotation mode. The use no memo directive opts out and takes precedence over all compilation modes. The guidance for AI agents is to never introduce directives automatically and to always document why an opt-out exists.

What is missing is any discussion of the debugging story when the compiler gets it wrong. If the compiler incorrectly memoizes something or fails to memoize something it should, how do you diagnose that? The guide treats the compiler as infallible, which it is not. There should be guidance on recognizing when compiler behavior is causing bugs and how to work around them.

**Key takeaways:**
- React Compiler makes manual memoization with useMemo, useCallback, and memo unnecessary by default
- Components should be pure functions that derive values inline and avoid storing derived state
- Manual optimization is only acceptable when profiling shows a real bottleneck or for non-React system integration

**Why do I care:** Whether you are adopting the React Compiler today or planning to, this guide represents the new baseline for how React code should be written. The mental model shift from defensive memoization to trusting the compiler is one of the most significant changes in React development practices in years.

**Link:** [Post-React Compiler Coding Guide](https://pavi2410.com/blog/post-react-compiler-coding-guide/)

## TypeScript 6.0

**TLDR:** TypeScript 6.0 is the bridge release to TypeScript 7.0's native Go compiler, introducing strict-by-default, ES2025 target defaults, Temporal types, and deprecating ES5, AMD, UMD, baseUrl, and moduleResolution node.

**Summary:**

This is a landmark release, not because of new features, but because of what it deprecates and what it prepares you for. TypeScript 6.0 is explicitly designed as the last release based on the current JavaScript codebase. TypeScript 7.0, written in Go for native code speed and shared-memory multi-threading, is described as "extremely close to completion." Every major change in 6.0 is about alignment with that future.

The default changes are aggressive and opinionated. strict is now true by default. module defaults to esnext. target defaults to the current-year ES version, which right now is es2025. The types field defaults to an empty array instead of enumerating everything in node_modules/@types, which the team says improves build time by twenty to fifty percent for many projects. rootDir defaults to the directory containing tsconfig.json instead of being inferred. These defaults reflect the reality that most developers ship to evergreen runtimes and use ESM.

The deprecation list is extensive: target es5, moduleResolution node (the old node10 behavior), module amd/umd/systemjs, baseUrl as a module resolution root, the module keyword for namespaces, import assertions with asserts instead of with, and more. The stableTypeOrdering flag is a pragmatic addition for migration, making 6.0's type ordering match 7.0's deterministic algorithm, though it can add up to twenty-five percent slowdown.

New language features include proper Temporal types, Map.getOrInsert and getOrInsertComputed from the upsert proposal, RegExp.escape, and a subtle but useful improvement to context sensitivity for methods without this usage. The dom lib now includes dom.iterable and dom.asynciterable by default.

The article does not dwell on the disruption this will cause. Many projects will need to update tsconfig.json significantly. The types default change alone will produce confusing "Cannot find module" errors for anyone who does not explicitly add node to their types array.

**Key takeaways:**
- TypeScript 6.0 is the final JavaScript-based release, bridging to TypeScript 7.0's native Go compiler
- strict, esnext module, and es2025 target are now defaults, with types defaulting to an empty array for performance
- ES5 target, AMD/UMD modules, baseUrl, and moduleResolution node are all deprecated

**Why do I care:** This release requires active migration work for most projects. The default changes and deprecations are not cosmetic. If you plan to adopt TypeScript 7.0 when it ships in a few months, starting the migration now with 6.0 will save significant pain later.

**Link:** [Announcing TypeScript 6.0](https://devblogs.microsoft.com/typescript/announcing-typescript-6-0/)

## Glassworm Strikes React Native Phone Number Packages

**TLDR:** Two popular React Native npm packages were backdoored on March 16 with identical install-time malware that fetches a multi-stage Windows credential and crypto stealer via Solana blockchain memos and Google Calendar indirection.

**Summary:**

This is a sobering supply chain attack report from Aikido Security. On March 16, two React Native packages from the same publisher, react-native-country-select and react-native-international-phone-number, were compromised with identical preinstall hooks. The combined weekly downloads were nearly thirty thousand, with over one hundred thirty thousand monthly downloads. The malicious code runs before npm installation completes, meaning developers, CI runners, and build agents trigger it just by installing the package.

The attack chain is sophisticated. The installer queries a Solana blockchain account to retrieve a base64-encoded URL from a transaction memo, which it then fetches to get the second stage payload. That payload is AES-encrypted and decrypts into a Windows-focused stealer that sets up persistence through Windows Task Scheduler and the Run registry key. The third stage uses Google Calendar as an indirection layer, fetching a base64-encoded slug from a calendar URL before requesting additional scripts from attacker infrastructure. This indirection gives the operators a flexible control point without republishing the npm package.

The recovered payload targets browser extensions and desktop wallets including MetaMask, Exodus, Atomic, Coinbase, and Trust Wallet. It also steals npm and GitHub credentials by running npm config get for auth tokens and git credential fill for GitHub. The malware downloads its own Node.js runtime into AppData to ensure it has an execution environment even if Node is not installed. There is a Russian locale check that skips execution for Russian language and timezone environments, a pattern common in criminal malware from Russian-speaking threat actors.

What makes this attack particularly concerning is the version numbering. react-native-country-select jumped from 0.3.9 to 0.3.91, not 0.3.10, which is the kind of detail that could slip past casual review. The second package depends on the clean version of the first, suggesting both were directly backdoored rather than one inheriting the compromise through a dependency bump.

**Key takeaways:**
- Two React Native packages with 130K monthly downloads were backdoored with identical install-time malware
- The attack chain uses Solana blockchain memos and Google Calendar as indirection layers for payload delivery
- The recovered payload steals crypto wallets, npm auth tokens, and GitHub credentials on Windows

**Why do I care:** This is a concrete reminder that npm install is code execution. Review your lockfiles, audit package updates especially minor version bumps, and consider tools that detect supply chain malware before it enters your environment.

**Link:** [Glassworm Strikes React Native Phone Number Packages](https://www.aikido.dev/blog/glassworm-strikes-react-packages-phone-numbers)

## Storybook MCP for React

**TLDR:** Storybook 10.3 ships an MCP server that gives AI coding agents access to component metadata, live story previews in chat, and self-healing test loops where the agent runs tests and fixes its own issues.

**Summary:**

Storybook is making a bet that MCP, the Model Context Protocol, is the right interface between AI agents and component libraries. The pitch is straightforward: agents do not know your components so they make up patterns that do not match your coding standards. Storybook MCP gives them component metadata like stories, API docs, and source code so they reuse existing components instead of inventing new ones. The benchmarks show fewer tokens and faster generation compared to working without MCP.

The more interesting capability is the self-healing test loop. The MCP server gives agents tools to run component and accessibility tests. The agent selectively tests what it considers relevant, and when tests fail, it applies fixes itself or alerts the developer when human judgment is needed. The live story previews are embedded directly in the chat UI through MCP Apps, so you can verify hover states and interactions without leaving the agent interface.

For teams with separate app and design system Storybooks, the MCP server works with composition so agents can read data from multiple Storybooks through a single endpoint. You can also publish your MCP server through Chromatic to share component context with teammates who do not run Storybook locally.

The limitation worth noting is that this is React-only for now, with other framework support coming later this year. The value proposition also depends heavily on having well-maintained stories, which is a significant assumption for many teams.

**Key takeaways:**
- Storybook MCP gives AI agents structured access to component metadata, reducing hallucinated patterns
- Agents can run component and accessibility tests through MCP and self-heal failing tests
- Live story previews are embedded directly in the agent chat interface for visual verification

**Why do I care:** If your team uses Storybook and AI agents, this is the bridge between them. The self-healing test loop is particularly compelling because it closes the feedback loop that currently requires developer intervention.

**Link:** [Storybook MCP for React](https://storybook.js.org/blog/storybook-mcp-for-react/)

## Bridging the Server-Client Boundary with Signals

**TLDR:** The mixed-signals library extends Preact Signals across network boundaries, letting you define reactive models on the server that automatically synchronize to client-side proxy signals over any transport.

**Summary:**

Jovi De Croock presents an idea that feels obvious in hindsight but has not been seriously attempted before. Signals already decouple where state is created from where it is consumed within a client application. mixed-signals extends that decoupling across the network. You define models on the server using regular Preact Signals and plain functions. On the client, you create reflected versions that produce local proxy signals mirroring the server state. Method calls go over the wire as RPC, signal updates come back. No manual fetch, no deserialization glue, no polling.

The nested model composition is where this gets powerful. A TodoList model contains an array signal of Todo models. When you call add from any client, a new Todo is created on the server, added to the array, and reflected to every connected client as a local signal graph with its own text and done signals. The transport uses delta compression for arrays, objects, and strings, so you are not sending the full state on every update.

The Cloudflare Durable Objects example makes the architecture concrete. The Durable Object provides identity, persistence, and single-threaded consistency. The mixed-signals layer provides the reactive synchronization. Multiple browser tabs open to the same URL see state changes in real time because they share the same server-side signal graph.

The author is honest about limitations. Offline support requires client-side state that can diverge and reconcile. Optimistic updates are tricky when the server owns the truth. Large-scale fan-out has limits. And you are coupling your client to a specific wire protocol rather than REST or GraphQL. These are real constraints that limit the use cases, but for collaborative applications with shared mutable state, this removes a remarkable amount of accidental complexity.

**Key takeaways:**
- mixed-signals synchronizes Preact Signals across network boundaries with automatic RPC and delta compression
- Models are written once as signals and functions, then reflected to clients as local proxy signal graphs
- The transport is pluggable, working over WebSockets, SSE, postMessage, or Durable Objects

**Why do I care:** Even if you do not use Preact, the pattern of extending reactive primitives across the network boundary is an architectural idea worth understanding. As signals become more prevalent across frameworks, this kind of server-client synchronization may become a standard approach for real-time collaborative applications.

**Link:** [Bridging the Server-Client Boundary with Signals](https://jovidecroock.com/blog/mixed-signals/)

## The Three Pillars of JavaScript Bloat

**TLDR:** JavaScript dependency bloat comes from three sources: older runtime support with realm safety, atomic package architecture, and ponyfills that overstayed their welcome. The e18e community provides tools and data to systematically address all three.

**Summary:**

This article provides the clearest taxonomy of JavaScript dependency bloat that I have seen. The first pillar is older runtime support combined with realm safety and protection against global namespace mutation. This explains why packages like is-string exist instead of using typeof, and why math-intrinsics re-exports Math functions. These serve a vanishingly small group of people supporting ES3 environments or passing values across iframe boundaries, but the cost is paid by everyone.

The second pillar is atomic package architecture, where code is split to an almost molecular level. The author gives perfect examples: shebang-regex is literally one line exporting a regex. arrify is Array.isArray with a fallback. The theory was reusable building blocks, but in practice most are either single-use packages consumed by one other package from the same maintainer, or duplicated across multiple versions in dependency trees. Inlining makes duplication almost free, while packaging makes it expensive. The supply chain surface area argument is compelling too: a maintainer of many atomic packages was compromised last year, which meant hundreds of building blocks were affected at once.

The third pillar is ponyfills that outlived their usefulness. globalThis has been widely supported since 2019 but still gets forty-nine million weekly downloads. Object.entries has been available since 2017 but gets thirty-five million downloads. These packages did their job at the time but nobody removed them when the features became universally available.

The article offers practical remediation through tools like knip for finding unused dependencies, the e18e CLI for detecting replaceable packages and automatically migrating them, npmgraph for visualizing dependency trees, and the module-replacements project as a community data set. The closing argument is sharp: this small group of people who need these unusual architectures should pay the cost themselves rather than everyone paying it by default.

**Key takeaways:**
- Three types of bloat: ancient runtime support, atomic package architecture, and expired ponyfills
- Atomic packages create supply chain risk and duplicate more expensively than inlined code
- Tools like knip, e18e CLI, and module-replacements provide practical paths to reducing bloat

**Why do I care:** Every frontend project inherits this bloat through transitive dependencies. Understanding the three pillars helps you evaluate your dependency tree critically, and the tools mentioned provide actionable ways to reduce bundle size, install time, and supply chain surface area.

**Link:** [The Three Pillars of JavaScript Bloat](https://43081j.com/2026/03/three-pillars-of-javascript-bloat)