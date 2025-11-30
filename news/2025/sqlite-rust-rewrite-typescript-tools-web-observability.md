---
title: "SQLite Rewritten in Rust, TypeScript Build Tools, and Web Observability"
excerpt: "Turso releases alpha of SQLite rewrite in Rust, new TypeScript tooling emerges, and frontend observability gets a major upgrade."
publishedAt: "2025-07-11"
slug: "sqlite-rust-rewrite-typescript-tools-web-observability"
hashtags: "#generated #en #rust #typescript #sqlite #database #frontend #observability #react #javascript #webdev #performance"
---

## The great SQLite rewrite

**TLDR:** Turso releases the first alpha of their ambitious SQLite rewrite in Rust, promising async APIs, concurrent writes, and native vector search while maintaining SQLite's legendary reliability.

**Summary:**

This is either one of the most ambitious database projects of our time or complete madness - Turso has released the first alpha of their SQLite rewrite in Rust. The motivation is compelling: SQLite is arguably the most reliable software on the planet, but it wasn't built for modern application demands like concurrent writes, real-time streaming, or browser environments.

The core problem Turso is solving is architectural. SQLite's synchronous API creates friction in modern async environments, its single-writer model limits throughput for data collection workloads, and the closed development model makes evolution painfully slow. While SQLite could theoretically evolve to address these issues, the project prioritizes stability above all else and maintains a famously closed contribution process.

Turso's approach is fascinating from an engineering perspective. They're using deterministic simulation testing combined with autonomous testing platforms to match SQLite's reliability standards. The fact that they're offering a thousand-dollar bounty for corruption bugs shows serious confidence in their testing methodology. The alpha includes async APIs throughout, native vector search capabilities, and support for concurrent writes - all while maintaining SQLite compatibility.

For architects and teams, this represents a potential paradigm shift in how we think about embedded databases. If Turso succeeds, we could see SQLite-class reliability with modern concurrency patterns, opening up new architectural possibilities for real-time applications, AI workloads, and edge computing scenarios. However, the risk is substantial - rewriting foundational infrastructure is notoriously difficult, and SQLite's reputation was built over decades of battle-testing.

**Key takeaways:**
- First alpha of Rust-based SQLite rewrite focuses on async APIs and concurrent writes
- Uses advanced testing methodologies to match SQLite's legendary reliability standards
- Open development model contrasts sharply with SQLite's closed contribution process

**Tradeoffs:**
- Gain modern async capabilities and concurrent writes but sacrifice decades of proven stability
- Open development enables faster feature evolution but introduces potential quality risks from distributed contributions

**Link:** [Introducing the first alpha of Turso: The next evolution of SQLite](https://turso.tech/blog/turso-the-next-evolution-of-sqlite)

## zshy: Bundler-free TypeScript builds

**TLDR:** Colin Hacks releases zshy, a zero-config build tool that uses TypeScript compiler directly instead of bundlers, focusing on dual-module output and declarative package.json configuration.

**Summary:**

This is a refreshingly pragmatic approach to the TypeScript build tool chaos. Colin Hacks, creator of Zod, has released zshy - a build tool that deliberately avoids bundlers and relies entirely on the TypeScript compiler. The philosophy is compelling: why add complexity when tsc is the gold standard for TypeScript transpilation?

The tool addresses a real pain point in the ecosystem. Vanilla tsc doesn't handle extension rewriting for dual-module builds, forcing library authors into complex bundler configurations. zshy solves this by orchestrating multiple tsc passes with different configurations, automatically generating package.json exports maps, and handling the tedious details of ESM/CJS dual publishing.

What's particularly clever is the declarative approach to entry points. Instead of complex build configurations, you specify your library's public API directly in package.json, and zshy figures out the rest. The wildcard support for plugin-style architectures shows thoughtful design for real-world library patterns.

The "blazing fast - just kidding, it's slow" honesty is refreshing in a space full of performance marketing. This tool prioritizes correctness and simplicity over speed, which makes sense for library builds where reliability matters more than milliseconds. The fact that it's battle-tested on Zod gives it credibility.

For teams building TypeScript libraries, this represents a return to simplicity. Instead of wrestling with bundler configurations, you get a tool that understands TypeScript's native compilation model and works with it rather than around it. The zero-config approach means less maintenance overhead and fewer opportunities for build configuration drift across projects.

**Key takeaways:**
- Uses TypeScript compiler directly instead of bundlers for maximum compatibility
- Declarative entry point configuration in package.json eliminates complex build configs
- Prioritizes correctness and simplicity over build performance

**Link:** [GitHub - colinhacks/zshy: Bundler-free build tool for TypeScript libraries](https://github.com/colinhacks/zshy)

## valtio-reactive: Bridging state management and reactivity

**TLDR:** Daishi Kato introduces valtio-reactive, adding effect and computed primitives to Valtio's proxy-based state management, bringing reactive programming patterns to JavaScript.

**Summary:**

This is an interesting evolution in the JavaScript reactivity space. Daishi Kato has extended Valtio beyond React state management into general-purpose reactive programming with effect and computed primitives. The approach builds on Valtio's existing proxy-based change detection but adds automatic dependency tracking.

The key insight here is recognizing that Valtio's vanilla JavaScript capabilities were underutilized. While primarily positioned as a React state library, its proxy-based change detection and snapshot system work well outside React contexts. The missing pieces were the reactive patterns developers expect from frameworks like MobX or Vue's reactivity system.

The automatic dependency tracking is particularly elegant. Instead of manually subscribing to specific state objects, effects automatically track which properties they access during execution. This reduces boilerplate and makes reactive code more maintainable. The computed values work similarly, creating derived state that updates automatically when dependencies change.

The batching requirement reveals an important architectural consideration. Unlike React's async batching, reactive effects need synchronous batching to avoid intermediate state inconsistencies. This creates different mental models for state updates depending on your execution context.

For teams working with complex state interactions outside React, this fills a genuine gap. You get reactive programming patterns without the overhead of a full framework. However, the performance characteristics are unclear, and the synchronous batching requirements could create subtle bugs if not properly understood.

**Key takeaways:**
- Extends Valtio's proxy-based state management with effect and computed primitives
- Automatic dependency tracking eliminates manual subscription management
- Requires synchronous batching for consistency in reactive updates

**Link:** [Introducing valtio-reactive: a Reactive Library Built on Valtio](https://newsletter.daishikato.com/p/introducing-valtio-reactive-a-reactive-library-built-on-valtio)

## jsonrepair: Fixing broken JSON automatically

**TLDR:** Jos de Jong releases jsonrepair, a library that automatically fixes common JSON syntax errors, from missing quotes to Python-style constants, with streaming support for large documents.

**Summary:**

This solves a genuinely annoying problem that every developer has encountered - dealing with malformed JSON from various sources. Jos de Jong's jsonrepair library tackles the surprisingly complex task of automatically fixing broken JSON syntax, and the scope of repairs it handles is impressive.

The range of fixes reveals how messy real-world data can be. Beyond basic syntax errors like missing quotes or commas, it handles Python constants, MongoDB data types, JSONP notation, and even concatenated strings across lines. The fact that it can parse newline-delimited JSON into proper arrays shows thoughtful consideration of common data formats.

The streaming API is particularly valuable for production systems. Being able to repair infinitely large JSON documents without loading them entirely into memory opens up possibilities for processing large data dumps or log files. This architectural decision shows understanding of real-world constraints.

What's missing from the discussion is error handling strategy. While the library can fix many syntax issues, there's always the question of semantic correctness. Automatically "fixing" JSON might mask underlying data quality issues that should be addressed at the source. The library seems designed for pragmatic data processing scenarios where getting parseable JSON is more important than perfect data hygiene.

For teams dealing with diverse data sources - APIs, user uploads, legacy systems - this could significantly reduce error handling complexity. However, it's worth considering whether automatic repair is masking systemic data quality issues that need addressing upstream.

**Key takeaways:**
- Automatically fixes wide range of JSON syntax errors from missing quotes to format-specific constants
- Streaming support enables processing of arbitrarily large documents
- Handles diverse input formats including Python constants, MongoDB types, and JSONP

**Link:** [GitHub - josdejong/jsonrepair: Repair invalid JSON documents](https://github.com/josdejong/jsonrepair)

## Promise.allSettled for better async state management

**TLDR:** Article explores using Promise.allSettled instead of Promise.all to track individual promise outcomes rather than failing fast, providing better visibility into concurrent async operations.

**Summary:**

This is a practical exploration of JavaScript's Promise.allSettled method, which deserves more attention in async programming discussions. The author makes a compelling case for choosing allSettled over Promise.all when you need visibility into individual operation outcomes rather than fast-fail behavior.

The key insight is about error handling strategy. Promise.all implements fail-fast semantics - if any promise rejects, the entire operation fails immediately. This works well for operations where all steps must succeed, but many real-world scenarios need more nuanced handling. You might want to know which specific operations failed and continue processing successful ones.

Promise.allSettled provides exactly this visibility. It waits for all promises to complete and returns status information for each one. This enables more sophisticated error handling strategies where you can process partial successes, retry specific failures, or provide detailed feedback about what went wrong.

The practical example of running different promise scenarios and tracking their individual outcomes illustrates a common pattern in data processing pipelines. You might have multiple data sources, some of which are more reliable than others, and you want to use whatever data you can get rather than failing entirely when one source is unavailable.

However, the article doesn't address the complexity cost of this approach. Using allSettled often means more complex result processing logic, and you need to be careful about how you handle partial failures in your application logic. It's a more powerful tool but requires more thoughtful error handling design.

**Key takeaways:**
- Promise.allSettled provides visibility into individual promise outcomes rather than fail-fast behavior
- Enables sophisticated error handling for scenarios requiring partial success processing
- Returns status and result/reason for each promise regardless of individual outcomes

**Link:** [Managing the State of Your Promises](https://spin.atomicobject.com/managing-the-state-of-your-promises/)

## Unistyles 3.0: Performance-focused React Native styling

**TLDR:** Unistyles 3.0 launches with C++ integration and selective updates, promising zero re-renders for style changes by building dependency graphs at the native level.

**Summary:**

This represents a fascinating approach to React Native performance optimization. Unistyles 3.0 moves styling logic into C++ and integrates directly with Fabric renderer, creating a system that can update styles without triggering React re-renders. The selective update mechanism is particularly innovative.

The core architectural insight is treating styles as a dependency graph. By analyzing StyleSheets and their dependencies at build time, Unistyles can track which styles depend on which runtime values - theme, breakpoints, device orientation, etc. When these values change, only the affected styles update, bypassing React's reconciliation entirely.

The Babel plugin tracking 16 different dependency types shows the complexity involved in this approach. Theme, breakpoints, device characteristics, and runtime state all become trackable dependencies. This level of granularity enables precise updates but also introduces significant complexity in the build and runtime systems.

The performance implications could be substantial for apps with complex styling needs. Traditional React Native styling triggers re-renders when theme or responsive values change, potentially affecting large component trees. If Unistyles can truly update styles without re-renders, it could unlock new possibilities for dynamic theming and responsive design.

However, the complexity cost is significant. Moving styling logic into native code creates new debugging challenges, platform-specific behavior, and build-time dependencies. The integration with react-native-nitro-modules shows how cutting-edge this approach is, but also suggests potential stability risks for production applications.

**Key takeaways:**
- C++ integration enables style updates without React re-renders through selective dependency tracking
- Build-time analysis creates dependency graphs linking styles to runtime values
- Supports 16 different dependency types from themes to device characteristics

**Tradeoffs:**
- Gain significant performance improvements for dynamic styling but sacrifice simplicity and debugging ease
- Native code integration provides powerful capabilities but increases platform complexity and potential stability risks

**Link:** [Introducing Unistyles 3.0!](https://www.reactnativecrossroads.com/posts/introducing-unistyles-3)

---

**Disclaimer:** This article was generated using [newsletter-ai](https://github.com/gmotyl/newsletter-ai) powered by claude-sonnet-4-20250514 LLM. While we strive for accuracy, please verify critical information independently.
