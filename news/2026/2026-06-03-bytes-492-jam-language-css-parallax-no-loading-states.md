---
title: "Bytes #492: A New Language Called Jam, CSS-Native Parallax, and the Case Against Loading States"
excerpt: "Raphael Amorim's hand-built Jam language, scroll-driven CSS parallax, XState Store v4, and why route transitions can make loading spinners disappear."
publishedAt: "2026-06-03"
slug: "bytes-492-jam-language-css-parallax-no-loading-states"
hashtags: "#uidev #typescript #css #react #xstate #performance #generated #en"
source_pattern: "ui.dev"
---

## Making Jam: A New Systems Language Built by Hand

**TLDR:** Raphael Amorim, the creator of Rio Terminal, announced Jam, a compiled systems language built on LLVM and written in C++. It tries to keep the C-like ergonomic feel while staying memory-safe without a garbage collector, borrowing ideas from Rust, Swift, Zig, and Elixir. It is not public yet and not production-ready, but the compiler runs today.

**Summary:** What I find refreshing about this one is the motivation. Amorim spent years championing Rust at companies, ran workshops, pulled teams up the learning curve, and then watched good engineers stall on the cliff between "I can write some Rust" and "I am actually productive in Rust." His diagnosis is that Rust keeps getting more complicated, and Zig, the obvious alternative, trades that complexity away by being unsafe by default. He points out that the verification work in unsafe languages does not vanish, it just gets pushed into Valgrind, AddressSanitizer, fuzzing, CI, and postmortems. That is a fair observation, and he leans on Jarred Sumner's decision to rewrite Bun from Zig to Rust as evidence the tax is real.

The technical heart of the post is how Jam achieves safety without a borrow checker and without a garbage collector. It uses mutable value semantics, where bindings own their values and parameter borrows live only for the duration of a single function call, so there are no first-class references and therefore no lifetimes to annotate. On top of that it adopts Rust's drop model, where a type declares a single cleanup function and the compiler synthesizes the call at every scope exit. He walks through the generated LLVM output to show the drop call appearing automatically, then contrasts it with Zig, where you must remember the cleanup yourself, and C++, which does the same automatic cleanup but drags along the rule of three or five, virtual destructors, and a pile of exception-safety footguns. Jam throws all of that out and keeps one drop function per type.

There are two claims here worth poking at. The compile-time argument is mostly a design argument, not a benchmark. Amorim is honest about this and says he does not have build-time numbers worth quoting yet, because the current compiler is the C++ bootstrap implementation. The performance claim is similar, close to Rust and Zig but not there, missing the years of intrinsics, auto-vectorization, and allocator tuning that mature languages accumulate. So the post is really selling the architecture, the idea that a pipeline with one intermediate representation and local dataflow passes has a structurally lower floor than Rust's multi-IR, monomorphizing, region-inferring pipeline. That may well be true, but a lower floor is not a shipped tool.

What the author mostly avoids thinking about is adoption. Building a language is one thing; getting normie devs, his own word, to contribute is the exact problem that drove him away from Rust, and a brand new language with no package manager, no LSP, and no formatter has a far steeper adoption wall than Rust ever did. The open-source plan, gated behind 108 distinct projects built in Jam, is charming but also a way of deferring the hardest question, which is whether anyone other than its creator will write real software in it.

**Key takeaways:**
- Jam uses mutable value semantics plus a Rust-style drop system to get memory safety with no garbage collector and no lifetime annotations.
- It compiles through a single typed intermediate representation, which is the structural bet behind its faster-build claims, though no benchmarks exist yet.
- The language is not public, not production-ready, and the creator is holding it back until the tooling around it exists.

**Why do I care:** As an architect I am not going to bet a project on a language one person is building in their spare time, and neither should you. But this post is a clear, honest tour of the tradeoffs between Rust, Zig, and C++ on safety, ergonomics, and compile time, and it is worth reading purely for that. The framing about AI shifting the bottleneck from writing code to reviewing it, so the compiler now has to catch the bugs the distracted human used to catch, is the part that actually applies to your day job today regardless of whether Jam ever ships.

**Link:** [Jam Programming Language](https://rapha.land/jam-programming-language/)

## XState Store v4: Simple State Management That Stays Type-Safe

**TLDR:** David K Piano shipped XState Store v4, a small event-driven state management library comparable to Zustand, Redux, or Pinia. It adds Standard Schema support, dedicated framework packages, atoms, selectors, and a clean upgrade path to full XState when you outgrow it.

**Summary:** The pitch for XState Store is that XState's actors are powerful but often too much for simple state, so this gives you the same event-driven mental model without the ceremony. You define an initial context and an object of transitions keyed by event type, and you send typed events through store.trigger. Transitions return the next context. The library is explicit that you return the complete context object, which keeps things predictable, and it adds a store.can check so you can ask whether an event is allowed without actually applying it.

Version 4 leans into schemas. You can describe context, event payloads, and emitted events using any Standard Schema compatible library like Zod, and by default those schemas are used only for type inference and runtime-readable metadata. Validation is opt-in through a separate validateSchemas extension, which is a sensible default because it keeps the happy path cheap and lets you pay for runtime checks only where you want them. Schemas are also exposed on the store instance, which opens the door to form generation and tooling that reads the contract at runtime.

The part I like most is the enqueue API for effects. Inside a transition you can enqueue an effect, emit an event, or trigger another event, and the library is strict that these must happen synchronously within the transition. For async work you fire the effect and then send an event back to the store when the promise resolves. That constraint is the whole point, because it keeps every state change a direct result of an event and preserves determinism, which is exactly what makes the store testable. There is a store.transition function that computes the next state and effects from a given state without mutating anything, which is a genuinely nice testing primitive.

V4 also adds atoms, which are lightweight reactive values you can read, write, subscribe to, and derive from. There are async atoms with pending, done, and error states, reducer atoms for event-driven updates, and selectors with custom equality functions so subscribers only fire when the slice they care about actually changes. One thing worth noting about the upgrade, framework bindings moved out of subpath imports like the react entry and into dedicated packages such as the xstate store react package, so if you are migrating you will be touching import paths.

**Key takeaways:**
- Schemas drive type inference and metadata by default; runtime validation is opt-in via a separate extension.
- The enqueue API forces effects, emits, and triggers to run synchronously inside transitions, which is what preserves determinism and testability.
- Atoms, selectors, and a convertible path to full XState give you room to grow without rewriting.

**Why do I care:** If your team reaches for Zustand or Redux Toolkit by reflex, this is worth a serious look, especially the deterministic transition model and the store.transition testing primitive. The honest tradeoff is conceptual weight, you are adopting an event-and-context model that is closer to a reducer than to mutable hooks, and not every team wants that discipline. But for anything with real business logic, the testability you get from pure transitions and the ability to graduate to full statecharts later is a strong architectural story.

**Link:** [XState Store v4](https://stately.ai/docs/xstate-store)

## CSS-Native Parallax With Scroll-Driven Animations

**TLDR:** Dan Depietri shows how to build a parallax effect entirely in CSS using scroll-driven animation timelines, no JavaScript scroll listeners required. The whole thing fits in one utility class plus a keyframe block, runs off the main thread, and respects reduced-motion preferences.

**Summary:** The old recipe for parallax was a scroll event listener that recalculated positions every frame and nudged elements up and down. Depietri's approach replaces all of that with a view progress timeline. You name a timeline on the parallax container, tell it to track the block axis, and then on the child element you swap the animation's clock from time to the scroll timeline. The timeline reads zero percent the moment the element starts entering the viewport and one hundred percent once it has fully left, so scroll progress maps directly onto movement.

The clever bit is the scaling. Because the child slides up and down by a percentage of its own height, a child the same size as its container would expose empty strips at the edges as it moves. So the child is scaled up by twice the offset, giving it surplus content above and below that gets clipped by overflow hidden on the container. Both the translate and the scale read the same custom property for the offset, so tuning a single value adjusts the strength of the effect and keeps the coverage correct automatically. That is a tidy design, one knob, no gaps.

There are a couple of practical gotchas the author flags. The animation-timeline property is not part of the animation shorthand and must be declared separately, and it has to come after the shorthand or the shorthand will reset it. And a will-change hint on translate lets the browser promote the element to its own layer ahead of time. The post closes responsibly by disabling the animation and resetting the scale under prefers-reduced-motion, which is the kind of thing too many parallax demos skip.

**Key takeaways:**
- Scroll-driven animation timelines move parallax off the main thread and into declarative CSS, applied with a single utility class.
- Scaling the child by twice the parallax offset prevents empty edges, and one custom property controls both the movement and the scale.
- Always pair scroll-driven motion with a prefers-reduced-motion fallback.

**Why do I care:** This is the kind of progressive-enhancement effect I am happy to ship because the failure mode is graceful, no parallax rather than a broken page. For frontend folks it is also a clean introduction to scroll-driven animations generally, which are useful well beyond parallax. Check your browser support targets before relying on it, but the technique deletes a whole category of janky scroll-listener code, and that alone makes it worth knowing.

**Link:** [CSS-native parallax effect](https://dan-webnotes.com/posts/2026-06-02-css-native-parallax-effect/)

## The Best Loading States Are No Loading States

**TLDR:** Jenna Smith argues that the right answer to skeletons, spinners, and shimmer effects is usually to not have them. Using route transitions and aggressive preloading, you can wait for data before committing a navigation, push loading back to the app level, and treat blank UI as a diagnostic signal rather than a bug.

**Summary:** Smith starts with a history lesson that lands. Before single-page apps, the browser handled waiting. You clicked a link, the server responded, and you never saw a half-rendered page because there was no such thing. Loading was coordinated at the app level, not scattered across components. SPAs made navigation instant, which felt great, but the tradeoff was that we started navigating before data was ready and had to fill the empty space with skeletons, spinners, and suspense fallbacks. We did not remove the waiting, we just moved it from before navigation to after.

Route transitions, in her framing, get us back closer to the old model without giving up client-side navigation. She is careful to say she does not mean animations. She means a router that begins a navigation, loads the data in the background, and delays committing the route change until everything the next screen needs is ready. The enabler is preloading. If a user is likely to need data soon, you start loading it on hover or when a link enters the viewport, which often gives you enough of a head start that the navigation feels instant. She uses TanStack Router loaders as the example because the loader and preloading APIs make the pattern easy, but says the idea applies to any router supporting React route transitions.

The most interesting argument is the inversion of how she treats empty UI. Most people see a blank section pop in after navigation and reach for a spinner. She treats it as feedback, a sign that something was not preloaded correctly, and instead of designing a loading state she fixes the preload strategy until the gap disappears. Queries become trivially simple, return data if it exists and render nothing if it does not, and that deliberate blankness amplifies the signal during development. When a wait is genuinely unavoidable she surfaces a single global indicator, like GitHub's loading bar, in the same place every time, and even delays showing it so quick transitions never flash it at all.

She is honest about the rough edges. Page refreshes have no hover and no preload, so she falls back to a fullscreen overlay tracked by a provider that watches mounted queries, and she debounces its removal to avoid content popping in from request waterfalls. She admits even the overlay feels like a compromise, and points at local persistence with something like TanStack DB or Zero as the real end state, where a second visit can render immediately from a populated cache. The thread I would tug on is that this whole approach demands real discipline about where data fetching lives, and it can hide latency problems behind preloading rather than fixing them. To her credit she addresses exactly that, treating a slow transition as a signal to investigate the performance issue rather than paper over it.

**Key takeaways:**
- Route transitions plus preloading let you wait for data before committing navigation, moving loading from the component level back to the app level.
- Returning null instead of a skeleton turns blank UI into a development-time diagnostic that tells you what you forgot to preload.
- Refreshes still need a fallback overlay, and local persistence is the longer-term path to making even that disappear.

**Why do I care:** This reframes a problem most of us have just accepted as the cost of SPAs, and it is genuinely useful for architecture decisions about where data fetching belongs. The discipline it requires is real, you are committing to route-loader-driven data and aggressive preloading across the app, and that is a team-wide pattern, not a per-component choice. But if you are tired of maintaining a dozen bespoke skeleton components, the payoff is a simpler codebase and a consistent loading experience users can actually learn. I would adopt the diagnostic mindset, return null, watch the gaps, even if you stop short of the full local-persistence end state.

**Link:** [The Best Loading States Are No Loading States](https://jjenzz.com/best-loading-states-are-no-loading-states/)

## On Rendering Diffs at Any Scale

**TLDR:** Amadeus Demarzi from Pierre details how their CodeView component renders arbitrarily large diffs in the browser without the page grinding to a halt. The work spans a new virtualization technique, cheap layout estimation, memory optimizations, DOM pooling, and deferred syntax highlighting.

**Summary:** The framing is one every reviewer recognizes. Small and medium diffs work fine, then you open something an agent generated with tests, fixtures, and snapshots, and the review surface degrades. It shows one file at a time, makes you load each file separately, or just feels sluggish. Pierre's goal with CodeView was a deliberately impossible one, that you should be able to just render any diff, and they break the problem into rendering, processing, and memory, treating them as connected rather than separate.

The centerpiece is what they call the Inverse Sticky Technique. Standard virtualization creates a full-height scrollable region and positions visible items inside it, which keeps native scrolling but lets the rendered window fall behind during fast scrolls and expose blank space. Other approaches use requestAnimationFrame or emulate scrolling entirely, each with its own costs, and Safari capping requestAnimationFrame at 60Hz makes some of those feel worse on high-refresh displays. Pierre's hybrid inverts normal sticky positioning so the bottom edge of the rendered region sticks to the bottom of the viewport when you scroll past it and the top edge sticks to the top when you scroll back. The effect is that if JavaScript falls behind, the content sticks to an edge instead of scrolling away into blankness, while native scrolling is preserved. Even then they admit Safari can still blank under sufficiently aggressive scrolling.

The rest of the post is a tour of scaling work that is honest about its messiness. Layout uses cheap first-pass estimates, line height times line count plus hunk separators, then corrects against measured DOM. They added a position-to-line checkpoint system with binary search because finding the render range from line zero became pathological on hunks with hundreds of thousands of lines. They handle scroll anchoring themselves by disabling the browser's built-in anchoring, since a constantly changing virtualized DOM makes the browser's version impossible. On memory, they found that parsed substrings can retain the entire giant source string, so forcing string copies actually saved memory, dropping a Linux v6-to-v7 diff from 2.4 gigabytes to about 1.15 and cutting parse time by roughly 80 percent. They pool DOM containers to cut allocation churn, share a single options object across tens of thousands of items instead of spreading a fresh config to each, and defer syntax highlighting to a worker pool with an LRU cache so code renders as plain text first and highlights progressively.

What I appreciate is the section admitting the rough edges. CSS layout and paint dominate during aggressive scrolling and agentic research loops have not cracked it. Serialization in the highlighting pipeline gets expensive for huge files. They do not virtualize horizontal scrolling or extremely long minified lines. And there is a closing plea to Apple about WebKit's sticky compositing performance, opaque frame timelines, and that 60Hz requestAnimationFrame cap, which doubles as a useful catalog of real cross-browser pain for anyone building performance-sensitive UI on Safari and Tauri.

**Key takeaways:**
- The Inverse Sticky Technique keeps native scrolling while making blank regions nearly impossible by sticking the rendered range to a viewport edge when JavaScript lags.
- Detaching parsed strings from the source patch cut a huge diff's memory roughly in half and parse time by about 80 percent, because substrings can retain the entire original input.
- Sharing one options object across all rendered items, pooling DOM containers, and deferring highlighting to workers are the unglamorous wins that make scale work.

**Why do I care:** Even if you never build a diff viewer, this is a master class in browser virtualization at the edge of what the platform allows, and the techniques transfer directly to any large virtualized list or table. The string-retention memory bug is the kind of thing that bites real production apps and almost nobody profiles for. And the Safari section is a sober reminder that if WebKit is a target, especially via Tauri, you will spend real time fighting compositing and observability gaps that Chrome and Firefox do not have.

**Link:** [On Rendering Diffs](https://pierre.computer/writing/on-rendering-diffs)

## A Platform-Agnostic Website Specification

**TLDR:** Joost de Valk built specification.website, an open, MIT-and-CC-licensed spec that collects the scattered standards behind a decent website, from HTML and WCAG to security headers, well-known URIs, and agent-readiness, with sources cited on every page. It even ships an MCP server so AI agents can read it.

**Summary:** The premise is that the web is a layer cake of standards owned by different bodies. WHATWG defines HTML, W3C ratifies WCAG, the IETF publishes the RFCs behind security headers and well-known URIs, IANA registers namespaces, search engines publish their own rules, and browsers add quirks. Almost nobody holds the whole picture in their head. This project collects the slices into one platform-agnostic specification, and it is careful about what it is not. It is not a framework, not a tutorial, and not opinion. Where there is no settled standard, it says so, and it explicitly refuses platform-specific advice like reach for this Next.js plugin, describing the outcome and leaving the implementation to you.

The content is organized into categories covering foundations, SEO, accessibility, security, well-known URIs, agent readiness, performance, privacy, resilience, and internationalization. Every page carries a status level, required, recommended, optional, or avoid, and cites at least one source from places like the WHATWG HTML Living Standard, MDN, WCAG 2.2, IETF RFCs, and Google Search Central. The build fails if a page's front matter schema is invalid, which is a nice way to enforce that every entry has a title, summary, status, and sources before it lands.

The agent-readiness angle is the part that feels current. The project auto-generates an llms.txt and a fuller llms-full.txt alongside the usual sitemap and RSS, and it runs a separate Cloudflare Worker that exposes the whole spec through MCP so an AI agent can query it directly. Whether you find that essential or premature, it is a clear signal of where documentation projects are heading, building for human readers and machine readers at the same time.

**Key takeaways:**
- The spec consolidates standards from many separate bodies into one sourced, platform-agnostic reference with explicit required, recommended, optional, and avoid status levels.
- It deliberately avoids framework-specific advice and refuses to state opinions where no standard exists.
- It ships machine-readable outputs including llms.txt and an MCP server, treating AI agents as first-class consumers of the spec.

**Why do I care:** This is a useful checklist to point a team at, particularly the security-headers and well-known-URI sections that developers routinely forget. I would treat it as a reference rather than gospel, since a community-maintained spec is only as current as its last pull request, but the source-on-every-page rule makes it easy to verify any claim. The agent-readiness category and the MCP server are worth a look if you are starting to think about how your own sites and docs get consumed by AI tools, which is a question more of us will be answering soon.

**Link:** [specification.website](https://github.com/jdevalk/specification.website)

## A Universal Chat App Template for Expo

**TLDR:** Evan Bacon released a chat app template built on Expo and Expo Router that runs on iOS, Android, and web from one codebase. It ships iOS 26 Liquid Glass effects, a desktop-grade web sidebar, streaming markdown messages, and an Anthropic-backed chat API route with a mock mode for UI work.

**Summary:** The selling point is genuinely universal code. One Expo Router codebase produces a native gesture-driven drawer on iOS and Android and a sidebar with inset content panel on web, using Radix context menus, dropdowns, and tooltips for a desktop experience. On iOS 26 it uses the glass effect API for a glassmorphic prompt composer, navigation bars, and toolbar buttons, and it leans on native controls like a SwiftUI model picker and haptics. Dark mode runs on OKLCH design tokens in Tailwind CSS v4 for perceptual consistency across themes.

On the chat mechanics, messages stream with throttled roughly 30fps updates, render markdown including code blocks and tables through a custom AST renderer, and show shimmer loading states. The chat list is virtualized with Legend List and uses Reanimated for a scroll-to-bottom button and keyboard-aware input. The backend is a server-side API route wired to Anthropic through the AI SDK, and there is a mock streaming mode you flip on with an environment variable so you can build UI without an API key. The tech stack is current across the board, Expo SDK 55, React Native 0.83, React 19, and Bun as the package manager.

The customization notes are practical. You edit a CSS file to retune the OKLCH design tokens, you swap the mock stream for your real LLM integration since the streaming store architecture is already in place, and the author recommends Convex for the database with a one-command setup plus better-auth for authentication. It is MIT licensed and was built for Expo's agent product, so it is a real starting point rather than a toy demo.

**Key takeaways:**
- One Expo Router codebase targets iOS, Android, and web with platform-adaptive layouts and native iOS 26 Liquid Glass UI.
- Streaming markdown messages, virtualized chat, and a mock AI mode make it a practical base for a real chatbot rather than a demo.
- It is MIT licensed and uses a current stack including Expo SDK 55, React 19, Tailwind v4, and the AI SDK with Anthropic.

**Why do I care:** If you are building anything chat-shaped across mobile and web, this saves you the unglamorous weeks of wiring up streaming, markdown rendering, virtualization, and keyboard handling. The genuinely cross-platform Expo Router approach is the interesting architectural bet, one codebase instead of separate native and web apps, and the Liquid Glass and native control integration shows it does not have to mean a lowest-common-denominator UI. Even if you do not ship it, it is a good reference for how a polished universal app is structured today.

**Link:** [chat-template](https://github.com/EvanBacon/chat-template)
