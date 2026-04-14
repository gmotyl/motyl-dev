---
title: "TanStack Start Gets RSC, Bun v1.3.12, Caveman Mode for AI Agents, and Next.js Logging"
excerpt: "TanStack Start introduces experimental React Server Components as client-fetched streams, Bun 1.3.12 brings markdown rendering and cron scheduling, a caveman prompt plugin slashes LLM token usage by 65 percent, and a deep dive into why Next.js logging is harder than it should be."
publishedAt: "2026-04-14"
slug: "tanstack-start-rsc-bun-caveman-nextjs-logging"
hashtags: "#uidev #frontend #react #server-components #bun #javascript #performance #architecture #generated #en"
source_pattern: "ui.dev"
---

## TanStack Start Gets React Server Components Your Way

**TLDR:** TanStack Start treats RSCs as fetchable, cacheable data streams instead of a server-owned component tree. You decide when and where to render them, not the framework.

The TanStack team published a detailed breakdown of their experimental React Server Components implementation, and it takes a fundamentally different approach from what Next.js does. Instead of making the server own the entire component tree, TanStack treats RSCs as React Flight streams that the client can fetch, cache, and render on its own terms. This is a significant philosophical shift.

In Next.js, your app orbits around the server. The framework decides how RSCs are created, where they render, and how interactive boundaries are defined. TanStack Start flips this: RSCs become just another piece of async data, like JSON from an API endpoint. You can create them anywhere on the server, decode them wherever you want, and cache them however you like using existing tools like TanStack Query or TanStack Router.

The implementation introduces something called Composite Components, which lets the server render UI while exposing slots for client content. The server positions opaque placeholders but cannot inspect or transform what the client puts in those slots. This means the client owns the final tree assembly, which most RSC systems do not attempt.

They also measured real performance on their own site. Blog pages dropped about 153 KB gzipped from the client bundle, and Total Blocking Time went from 1,200 milliseconds down to 260 milliseconds on one page. But they are honest about the limits: pages dominated by interactive UI shells barely moved. RSCs help when pages are content-heavy or dependency-heavy, not when the page is already mostly client state.

One thing the article glosses over is the migration cost. Moving from a traditional SPA to any RSC-based architecture requires rethinking data fetching, caching boundaries, and error handling. The fact that TanStack intentionally does not support "use server" actions is a security-conscious choice, but it also means you lose the convenience of implicit RPCs that other RSC frameworks offer.

**Key takeaways:**
- TanStack Start treats RSCs as client-fetched Flight streams, not server-owned trees
- Composite Components let the client decide what fills server-defined slots
- Measurable performance gains on content-heavy pages, minimal on interactive ones
- No "use server" actions, explicit RPCs only via createServerFn

**Why do I care:** This is the first serious alternative to the Next.js App Router monopoly on RSCs. If you have been frustrated by the server-first mental model that Next.js forces on you, TanStack Start offers a client-first approach where RSCs are an optimization you add when helpful, not a paradigm you must build around. The experimental status means you should not use it in production yet, but the architectural thinking behind it is worth studying.

**Link:** [React Server Components Your Way](https://tanstack.com/blog/react-server-components)

## Logging in Next.js Is Hard Because It Runs in Three Runtimes

**TLDR:** A typical Next.js app executes in Node.js, Edge, and the browser simultaneously. Most logging libraries only target Node, leaving Edge middleware and client-side code in the dark.

The Sentry team wrote a thorough analysis of why logging in Next.js is genuinely difficult. The core problem is runtime fragmentation. Your "frontend code" is actually a mix of Server Components running on Node, middleware possibly running on Edge, and Client Components running in the browser. Most JavaScript loggers assume Node.js and rely on APIs like AsyncLocalStorage or the filesystem module that simply do not exist in the browser or Edge runtimes.

The article walks through two practical solutions. LogTape is a newer logging library built from scratch with no dependencies that runs natively in all three runtimes. You configure categories and a Sentry sink, and each logger can be filtered independently in Sentry. The alternative is using Sentry's built-in logger from the Sentry Next.js SDK, which is also runtime-agnostic and requires no additional dependencies if you already use Sentry for error tracking and tracing.

What makes this piece valuable is the tracing integration. Both approaches connect logs to a unique trace ID per request, so you can query all logs from a single request across all three runtimes. When something breaks in production, you do not need to guess whether the error came from middleware, server rendering, or client-side code. The trace ID ties it all together.

The article misses an important discussion about cost. Structured logging at scale, especially when sent to an external service like Sentry, can get expensive fast. Every interactive component logging its mount state, every middleware call, every server-side data fetch all producing structured log entries adds up. The article mentions filtering for noise reduction but does not go deep enough into what a reasonable sampling strategy looks like for a production Next.js app.

**Key takeaways:**
- Next.js runs across Node, Edge, and browser runtimes simultaneously
- Most loggers only support Node, leaving Edge and browser code invisible
- LogTape and Sentry.logger both provide runtime-agnostic logging
- Trace-connected logs let you query all entries from a single request

**Why do I care:** If you are running Next.js in production and only logging from server-side code, you are blind to half of what your app is doing. The moment you add "use client" boundaries, your frontend code logs to two different places by default. Connecting these with trace IDs is not optional for production debugging, it is essential. I would start with Sentry's built-in logger if you already use Sentry, or LogTape if you need a standalone solution.

**Link:** [Logging in Next.js is Hard](https://blog.sentry.io/logging-in-next-js-is-hard-but-it-doesnt-have-to-be/)

## Caveman Mode Cuts LLM Token Usage by 65 Percent

**TLDR:** A Claude Code skill plugin makes AI agents respond in caveman-speak, cutting output tokens by an average of 65 percent while preserving full technical accuracy.

This is one of those ideas that sounds like a joke until you look at the numbers. The Caveman plugin strips articles, filler words, pleasantries, and hedging from AI agent responses. Instead of getting a paragraph explaining why your React component re-renders, you get "New object ref each render. Inline object prop equals new ref equals re-render. Wrap in useMemo." Same fix, 75 percent fewer words.

The benchmark data is compelling. Across ten tasks, the average token savings was 65 percent, ranging from 22 percent for architecture discussions to 87 percent for bug explanations. The plugin works across Claude Code, Codex, Gemini CLI, Cursor, Windsurf, Cline, and GitHub Copilot. It even has a Classical Chinese mode for maximum compression.

What interests me most is the research paper cited in the README. A March 2026 study found that constraining large language models to brief responses improved accuracy by 26 percentage points on certain benchmarks and completely reversed performance hierarchies. Verbose models are not necessarily more correct. The constraint forces the model to focus on substance over style.

The plugin also includes a caveman-compress feature that rewrites your CLAUDE.md and other memory files into caveman-speak, saving an average of 46 percent on input tokens per session. This matters because context window usage directly affects cost and speed.

**Key takeaways:**
- Caveman mode averages 65 percent output token savings across tasks
- Works across all major AI coding agents
- A research paper shows brevity constraints improve accuracy by 26 points
- Input compression saves 46 percent on context loading

**Why do I care:** If you are paying for API tokens or waiting on slow agent responses, this is free performance. The biggest win is readability, not cost savings. A response that fits in one line is faster to scan than five paragraphs of polite hedging. I would install it just for the caveman-commit skill alone, which produces terse conventional commit messages.

**Link:** [GitHub: JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman)

## Bun v1.3.12 Adds Markdown Rendering, Cron Scheduling, and JSC Upgrades

**TLDR:** Bun 1.3.12 brings a built-in markdown-to-ANSI renderer, an in-process cron scheduler, async stack traces for native APIs, and a major JavaScriptCore engine upgrade with using declarations and JIT improvements.

This release is packed. Bun now has Bun.markdown.ansi for rendering markdown directly to colored terminal output, complete with Kitty graphics protocol support for inline images in compatible terminals. The in-process Bun.cron scheduler lets you run cron jobs that share state with the rest of your application, with no overlap protection and UTC scheduling.

The JavaScriptCore upgrade includes over 1,650 upstream commits. Native using and await using declarations for explicit resource management are now supported. Array.isArray got a JIT intrinsic boost, String.includes has a faster single-character search path, and promise resolution got micro-optimized. URLPattern.test and exec are up to 2.3 times faster by eliminating temporary object allocations.

On the bugfix side, there are dozens of fixes covering Node.js compatibility, memory leaks, Web API edge cases, and the JavaScript bundler. Notable fixes include process.env being empty when the CWD is in a directory without read permission, a memory leak in vm.Script calls, and fs.statSync returning wrong inode numbers on NFS mounts.

The TCP_DEFER_ACCEPT optimization for Bun.serve on Linux is a nice touch. It defers connection acceptance until the client has actually sent data, collapsing two event loop wake-ups into one. This is the same optimization nginx uses.

**Key takeaways:**
- Built-in markdown-to-ANSI rendering with Kitty graphics support
- In-process Bun.cron with no-overlap scheduling
- JavaScriptCore upgrade brings using declarations and JIT improvements
- URLPattern up to 2.3x faster, TCP_DEFER_ACCEPT for Bun.serve on Linux

**Why do I care:** Bun continues to close the gap with Node.js on compatibility while adding genuinely useful built-in features. The markdown renderer alone is worth noting if you build CLI tools. The JSC upgrade with using declarations means you can start writing resource management code without polyfills. The sheer volume of bug fixes suggests Bun is maturing from "fast runtime" to "reliable runtime."

**Link:** [Bun v1.3.12](https://bun.com/blog/bun-v1.3.12)

## Uses for Nested Promises in Concurrency Control

**TLDR:** Nested promises are useful when one async function invokes another but should not block on the inner function's completion. A readers-writer lock implementation demonstrates why promise flattening can be a problem.

This is a rare deep dive into JavaScript concurrency primitives. The author was building a readers-writer lock for an encrypted document store and discovered that JavaScript's automatic promise flattening in then and await was actively working against them. The RWLock needs to check if a queue is empty and then push a function into another queue atomically, but the microtask delay introduced by await means all concurrent calls see the queue as empty and execute immediately.

The solution uses a nested promise pattern: the inbox queue returns Promise of an object containing a Promise, and the outer wrapper prevents automatic flattening. This lets the function advance through already-completed steps without blocking the inbox on the result of executing those steps. It is a way of making one promise not wait on another.

The article explains why the Promises/A spec authors chose implicit flattening: convenience. Nested arrays are useful data structures, but nested promises just represent how many async operations were needed, which is rarely useful for normal code. However, when you are actively managing concurrency, you sometimes need one async operation to trigger another without blocking on it.

What the author avoids discussing is how this pattern interacts with error handling. If the inner promise rejects, does the outer promise catch it? The article focuses on the happy path, which is typical for concurrency writing but leaves a gap for production use.

**Key takeaways:**
- Promise.then flattens all nested promises automatically for convenience
- A readers-writer lock needs nested promises to avoid blocking on inner execution
- The inbox queue pattern uses Promise wrapping Promise to prevent flattening
- This is useful when managing concurrency, not for normal async code

**Why do I care:** Most frontend developers will never need this. But if you are building shared state management, optimistic updates, or concurrent data synchronization in a complex SPA, understanding why promise flattening exists and when you might need to work around it is valuable. The pattern of using a limit-one queue as a mutex around async decision-making is transferable to many concurrency problems.

**Link:** [Uses for nested promises](https://blog.jcoglan.com/2026/03/23/uses-for-nested-promises/)

## The Intl API Is the Best Browser API You Are Not Using

**TLDR:** The Intl family of APIs handles dates, numbers, currencies, lists, plurals, text segmentation, and locale-aware sorting, all built into every modern browser with no dependencies.

This is an exhaustive guide to the Intl APIs that covers far more than most developers know exists. RelativeTimeFormat gives you "in 3 days" or "2 hours ago" with proper locale grammar. DurationFormat handles everything from "2 hours, 45 minutes" to digital clock format. NumberFormat handles currencies with correct symbol placement, decimal separators, and accounting notation for negative values.

The ListFormat API turns arrays into natural-language lists with proper conjunction or disjunction connectors, handling the Oxford comma debate by letting you pick en-US or en-GB. PluralRules gives you the correct plural form for any number in any language, from English's simple one/other to Arabic's six forms. Segmenter breaks text into words, sentences, or graphemes correctly for languages like Japanese that do not use spaces. Collator sorts strings in locale-aware order, with numeric sorting that puts chapter9 before chapter10.

The article makes a good point about the shared foundation: pick a locale, pick some options, create a formatter, reuse it with your data. Whether formatting dates, numbers, currencies, lists, plurals, words, or sorted strings, the API shape stays similar. This consistency makes the whole family easier to learn than it first appears.

What is missing is a frank discussion about browser support gaps. While most Intl APIs are well-supported, some like DurationFormat are newer and may need polyfills for older browsers. The article also does not address the performance cost of creating formatters, which matters in tight loops.

**Key takeaways:**
- Intl handles dates, numbers, currencies, lists, plurals, text segmentation, and sorting
- All built into browsers with zero dependencies
- Consistent API pattern across all formatters: locale, options, create, reuse
- ListFormat resolves the Oxford comma by locale, PluralRules handles Arabic's six forms

**Why do I care:** I still see teams installing date-fns, numeral, or custom sorting libraries when the browser already does this. The Intl APIs are faster, smaller, and more correct than most npm alternatives because they use the ICU data that ships with the browser engine. For any app that serves users in multiple locales, Intl is not optional, it is the baseline.

**Link:** [The Intl API](https://polypane.app/blog/the-intl-api-the-best-browser-api-youre-not-using/)

## You Cannot Cancel a JavaScript Promise Except Sometimes You Can

**TLDR:** You can interrupt async functions by returning a promise that never resolves. The garbage collector cleans up the suspended function when nothing references it anymore.

The Inngest team wrote a clever piece about how their SDK interrupts workflow functions on serverless infrastructure. Since each invocation has a hard timeout, the runtime needs to stop the function, save progress, and resume later. Throwing an exception does not work because user try-catch blocks swallow the interruption. Generators give clean interruption but force unfamiliar syntax on users.

The solution: return a promise that never resolves. When the workflow function awaits this promise at a step boundary, it hangs. The runtime detects the hang via a setTimeout macrotask, saves the step result, and exits. On the next invocation, the function re-executes from the top, memoized steps return instantly, and it advances to the next new step.

The garbage collection story is the surprising part. An unsettled promise is just an object in memory. If nothing references it and the suspended function's call stack becomes unreachable, the garbage collector cleans everything up. The article demonstrates this with FinalizationRegistry, showing that even promises that hang forever get collected when their references are severed.

The catch is reference chains. If anything holds a reference to the hanging promise or the suspended function's closure, the garbage collector cannot touch it. The pattern only works when you intentionally sever all references, which requires careful design.

**Key takeaways:**
- A never-resolving promise lets you interrupt async functions without throwing
- The garbage collector cleans up suspended functions when unreferenced
- Inngest uses this for step-by-step workflow execution across serverless invocations
- Reference chains are the footgun: anything holding a reference prevents cleanup

**Why do I care:** This is primarily useful for runtime authors and framework builders. Most application developers will never need to cancel a promise this way. But understanding why it works reveals how JavaScript's event loop, microtask queue, and garbage collector interact. The insight that promises alone do not keep the event loop alive is something every Node.js developer should know.

**Link:** [You can't cancel a JavaScript promise](https://www.inngest.com/blog/hanging-promises-for-control-flow)
