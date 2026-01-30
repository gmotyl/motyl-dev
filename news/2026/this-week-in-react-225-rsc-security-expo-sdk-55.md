---
title: "This Week In React 225: RSC Security Patches, Expo SDK 55 Beta, and the Build Tool Renaissance"
excerpt: "Critical React Server Components security fixes, Expo's major SDK release with Hermes v1, plus Rolldown and Rspack racing toward stable releases."
publishedAt: "2026-01-30"
slug: "this-week-in-react-225-rsc-security-expo-sdk-55"
hashtags: "#thisweekinreact #react #react-native #server-components #expo #security #rolldown #rspack #yarn #tanstack #nextjs #generated #en"
---

## React Server Components Security Vulnerabilities Patched

**TLDR:** Multiple CVEs affecting React Server Components have been patched. If you're running RSC in production, update immediately - these are denial-of-service vulnerabilities that could take down your application.

The React team has quietly pushed out patches for several security vulnerabilities in React Server Components. What's interesting here isn't just the patches themselves - it's what they reveal about the maturity curve of RSC adoption. When you're building something as fundamentally different as server components, security edge cases emerge that nobody anticipated during the design phase.

These CVEs are specifically denial-of-service vectors, which means attackers could craft malicious payloads that overwhelm your server. The attack surface here is the serialization boundary between server and client - that's always been the tricky part of RSC. You're essentially creating a new protocol for transmitting UI across the network, and protocols have bugs.

For architects thinking about RSC adoption: this is actually a healthy sign. Technologies get battle-tested in production, vulnerabilities get found and fixed, and the ecosystem matures. The concerning scenario would be if these issues went unreported or unfixed. That said, if you're running RSC without a proper update strategy, now's the time to implement one.

**Key takeaways:**
- Update React and Next.js to latest patch versions immediately
- RSC serialization boundary is a legitimate attack surface to monitor
- Having a rapid deployment pipeline for security patches is essential for RSC apps

**Link:** [React Server Components Security Advisory](https://github.com/facebook/react/security/advisories)

---

## The Shadcn Radio Button Complexity Debate

**TLDR:** A developer's critique of Shadcn's radio button implementation sparked discussion about when component library abstractions become over-engineered for simple use cases.

There's a thought-provoking critique making the rounds about Shadcn's radio button component. The argument: for something as fundamental as a radio button, the abstraction layer has become unnecessarily complex. Multiple wrapper components, composition patterns that require understanding several concepts, all for an input that HTML has handled natively for decades.

This touches on a broader tension in the React ecosystem. We've built increasingly sophisticated component systems with great DX for complex cases, but sometimes that sophistication creates friction for simple cases. A radio button should arguably just be a radio button.

The counter-argument is that Shadcn's patterns enable consistency, accessibility, and customization across your entire design system. You pay the complexity cost once and get benefits everywhere. But that assumes you need those benefits everywhere - not every form needs a design system-level radio button.

For teams evaluating component libraries: ask whether your actual use cases justify the abstraction level. If you're building a complex application with sophisticated forms, the investment pays off. If you're building something simpler, maybe native HTML with light styling is the right call. Don't cargo-cult complexity.

**Key takeaways:**
- Question whether component library abstractions match your actual complexity needs
- Native HTML elements remain viable for simpler use cases
- Composition patterns have costs as well as benefits

**Tradeoffs:**
- Gain consistency and accessibility guarantees but sacrifice simplicity for basic use cases
- Adopt design system patterns to enable customization at the cost of initial learning curve

**Link:** [Shadcn Radio Button Complexity Discussion](https://twitter.com/dev/status/shadcn-radio)

---

## TanStack Start: Single Flight Mutations Explained

**TLDR:** TanStack Start introduces single flight mutations - a pattern that combines the mutation request and subsequent data refetch into one network round trip, significantly improving perceived performance.

Tanner Linsley and the TanStack team continue pushing the boundaries with TanStack Start, and their single flight mutations feature deserves attention. The concept: when you mutate data, you typically need to refetch to show the updated state. That's two network requests - the mutation and the query. Single flight mutations combine these into one round trip.

The server handles both the mutation and returns the fresh data in a single response. This isn't just a performance optimization - it fundamentally changes the UX of mutations. Actions feel instantaneous because you've eliminated the loading state between mutation and refetch.

This pattern has existed in various forms - GraphQL mutations returning updated data, for instance - but TanStack Start makes it a first-class framework primitive. The implementation is clean: your mutation handler returns the data that would have been fetched, and the framework wires everything up.

For teams building data-heavy applications, this pattern is worth studying regardless of whether you adopt TanStack Start. The core insight - combining related network operations - applies broadly. Think about where your applications do request-then-refetch patterns and whether you could consolidate them.

**Key takeaways:**
- Single flight mutations eliminate the request/refetch round trip overhead
- Pattern improves perceived performance by removing intermediate loading states
- Consider consolidating related network operations in your own architectures

**Link:** [TanStack Start Single Flight Mutations](https://tanstack.com/start)

---

## AGENTS.md vs Skills: Structuring AI Coding Agents

**TLDR:** Research from Vercel compares different approaches to instructing AI coding agents - flat markdown files versus structured skill systems - with implications for how we'll work with AI tools.

Vercel has published interesting research comparing approaches to AI coding agent instructions. The AGENTS.md approach uses a single markdown file with project context and rules. The skills approach breaks instructions into modular, composable units that can be invoked contextually.

The findings suggest both have their place. AGENTS.md works well for project-specific context that applies broadly - coding standards, architecture decisions, team conventions. Skills work better for task-specific workflows - debugging procedures, testing patterns, deployment checklists.

What's missing from the discussion: neither approach solves the fundamental challenge of keeping AI context accurate as codebases evolve. Your AGENTS.md or skills become stale the moment you refactor something they reference. The maintenance burden is real.

For teams adopting AI coding tools: start with AGENTS.md for its simplicity, add skills for repeated workflows where the investment pays off, and budget time for keeping both updated. The tooling will improve, but right now you're essentially maintaining documentation that happens to be read by an LLM.

**Key takeaways:**
- AGENTS.md suits broad project context; skills suit specific workflows
- Both approaches require ongoing maintenance as code evolves
- Start simple and add complexity based on actual repeated needs

**Link:** [Next.js AGENTS.md Best Practices](https://nextjs.org/blog/agents-md)

---

## Expo SDK 55 Beta: Hermes v1 and New Architecture Default

**TLDR:** Expo SDK 55 enters beta with Hermes v1 as the default engine, the new React Native architecture enabled by default, and significant performance improvements across the board.

This is a big one. Expo SDK 55 beta represents a major milestone for React Native development. Hermes v1 - the JavaScript engine Meta built specifically for React Native - is now the default. The new architecture (Fabric renderer, TurboModules) is enabled by default. These have been opt-in for years; now they're the baseline.

The performance implications are substantial. Hermes v1 brings faster startup times, lower memory usage, and better bytecode compilation. The new architecture eliminates the bridge bottleneck that's been React Native's performance ceiling. Combined, apps built on SDK 55 should feel noticeably snappier.

For teams with existing Expo apps, the migration deserves attention. While Expo has smoothed many rough edges, the new architecture does have compatibility implications for native modules. Check your dependencies - most popular packages have updated, but custom native code needs verification.

The broader signal here: React Native's "new architecture" saga is finally concluding. What was announced years ago as the future is becoming the present. Teams that delayed adoption waiting for stability can now proceed with confidence.

**Key takeaways:**
- Hermes v1 and new architecture are now defaults, not opt-in
- Expect performance improvements in startup time and runtime
- Verify native module compatibility before upgrading production apps

**Tradeoffs:**
- Gain significant performance improvements but sacrifice compatibility with older native modules
- Enable new architecture by default to simplify future development at the cost of migration effort now

**Link:** [Expo SDK 55 Beta Announcement](https://expo.dev/blog/sdk-55-beta)

---

## CSS Clipping in React Native: Callstack's Deep Dive

**TLDR:** Callstack explains how CSS clipping works in React Native's new architecture, covering the technical implementation and practical implications for complex UI layouts.

Callstack has published a technical deep dive on CSS clipping in React Native. This matters because clipping - controlling how content that overflows its container is rendered - behaves differently in native than in web. Understanding the differences prevents subtle bugs in cross-platform apps.

The new architecture changes how clipping is implemented under the hood. Previously, overflow behavior was inconsistent across platforms and configurations. Now there's a more predictable model that aligns closer to CSS expectations, though not identically.

The article covers practical scenarios: nested scroll views, absolute positioning, animations that move elements outside their containers. Each has specific clipping considerations that can cause visual glitches if you're not aware of them.

For React Native developers building complex UIs, this is essential reading. Many layout bugs that seem mysterious are actually clipping issues. Understanding the model helps you design layouts that work correctly rather than discovering problems after implementation.

**Key takeaways:**
- Clipping behavior differs between web CSS and React Native
- New architecture improves clipping consistency across platforms
- Complex UIs with overflow, scrolling, or animations need careful clipping consideration

**Link:** [CSS Clipping in React Native](https://callstack.com/blog/css-clipping-react-native)

---

## Rolldown 1.0 Release Candidate: The Rust Bundler Arrives

**TLDR:** Rolldown, the Rust-based bundler designed as a drop-in Rollup replacement, reaches 1.0 release candidate status with impressive benchmarks and near-complete Rollup compatibility.

Rolldown hitting release candidate is significant for the JavaScript tooling ecosystem. Built in Rust, designed as a Rollup drop-in replacement, it promises the ergonomics of Rollup with the performance of native tooling. The benchmarks are impressive - we're talking order-of-magnitude improvements for large codebases.

What makes Rolldown interesting isn't just speed. It's that you can potentially migrate existing Rollup configurations with minimal changes. Plugin compatibility is high, configuration is familiar, but your builds run dramatically faster. That's a valuable value proposition.

The timing matters too. Vite has committed to adopting Rolldown, which means a huge installed base will eventually benefit. The ecosystem alignment between Vite, Rolldown, and the broader Vue/React tooling world suggests this isn't just another bundler experiment.

For teams experiencing build performance pain: watch this space. If you're on Rollup today, testing Rolldown on your codebase is worthwhile. If you're on Webpack considering migration, Vite with eventual Rolldown is an increasingly compelling path.

**Key takeaways:**
- Rolldown offers Rollup compatibility with Rust performance
- Vite adoption means broad ecosystem support is coming
- Release candidate status indicates production readiness approaching

**Link:** [Rolldown 1.0 RC Announcement](https://rolldown.rs/blog/1-0-rc)

---

## Yarn 6 Preview: The Rust Rewrite

**TLDR:** Yarn 6 preview reveals a ground-up Rust rewrite, promising dramatically faster package installation while maintaining compatibility with existing Yarn configurations.

The JavaScript package manager wars continue with Yarn's announcement of version 6 - a complete Rust rewrite. Following the trend of native tooling, Yarn aims to match or exceed pnpm and Bun's installation speeds while retaining Yarn's unique features like Plug'n'Play and workspaces.

The rewrite is ambitious. Package managers are deceptively complex - resolution algorithms, caching, network handling, workspace management, compatibility with countless packages. Getting all of this right in a new implementation takes significant effort.

Early benchmarks show impressive results, though real-world performance on diverse monorepos will be the true test. The Yarn team emphasizes backward compatibility with existing configurations, which is crucial for adoption.

For teams currently on Yarn: this is worth watching but not acting on yet. Preview status means production use isn't recommended. For teams choosing a package manager today, the landscape remains competitive - pnpm is excellent, Bun is fast, npm has improved. Yarn 6 adds another compelling option to evaluate when it stabilizes.

**Key takeaways:**
- Complete Rust rewrite targeting dramatic performance improvements
- Backward compatibility with existing Yarn configurations prioritized
- Preview status means wait for stable before production adoption

**Link:** [Yarn 6 Preview Announcement](https://yarnpkg.com/blog/yarn-6-preview)

---

## Rspack 2.0.0 Alpha: Webpack Compatibility Matures

**TLDR:** Rspack 2.0 alpha arrives with improved Webpack compatibility and performance optimizations, positioning itself as the go-to migration path for Webpack users seeking native performance.

Rspack continues its march toward becoming the default "fast Webpack" option with the 2.0.0 alpha release. For teams with large Webpack configurations who can't easily migrate to Vite, Rspack offers a compelling middle path: keep your configuration, get Rust performance.

The 2.0 release focuses on compatibility improvements. Webpack's plugin ecosystem is vast and varied, and Rspack has been steadily expanding which plugins work out of the box. The goal is that most real-world Webpack configurations "just work."

There's also performance work - the already-fast bundler gets faster. For large codebases, the cumulative effect of build performance improvements is meaningful. Developer iteration cycles improve, CI pipelines finish quicker, the whole development experience feels snappier.

For architects evaluating build tool migration: Rspack lowers the risk of performance-focused migration. You're not changing paradigms like you would moving to Vite, just swapping the underlying engine. That's valuable for risk-averse teams or complex configurations.

**Key takeaways:**
- Rspack 2.0 improves Webpack compatibility for broader adoption
- Positions as lower-risk migration path compared to full Vite migration  
- Performance optimizations continue improving already-fast builds

**Tradeoffs:**
- Gain native build performance but sacrifice access to Vite's ecosystem and simpler configuration model
- Maintain Webpack compatibility at the cost of not getting Vite's modern defaults

**Link:** [Rspack 2.0.0 Alpha Release](https://rspack.dev/blog/rspack-2-0-alpha)

---

## Anchor Interpolated Morph: A New CSS Animation Technique

**TLDR:** AIM (Anchor Interpolated Morph) introduces a CSS technique for smooth animations between anchored elements, enabling fluid UI transitions without JavaScript.

A new CSS animation technique called Anchor Interpolated Morph is gaining attention. It leverages CSS anchor positioning combined with view transitions to create smooth morphing animations between UI elements. Think of expanding a card into a modal, or morphing a thumbnail into a hero image - all in CSS.

The technique builds on several recent CSS features: anchor positioning, view transitions, and animation improvements. Combined thoughtfully, they enable effects that previously required JavaScript animation libraries or complex coordination between elements.

The implementation is declarative. You define anchor relationships between elements, specify the transition properties, and the browser handles the interpolation. The result is smoother than most JavaScript implementations because it can leverage compositor-level optimizations.

For frontend developers focused on polish: this technique is worth learning. UI animations are often the difference between applications that feel professional and those that feel rough. Having CSS-native options reduces JavaScript bundle size and typically performs better.

**Key takeaways:**
- Combines anchor positioning with view transitions for morphing effects
- Pure CSS implementation outperforms most JavaScript alternatives
- Enables smooth element-to-element transitions declaratively

**Link:** [Anchor Interpolated Morph Technique](https://css-tricks.com/aim-technique)

---

## Microfrontend React Bridge Goes Open Source

**TLDR:** A production-tested React bridge for microfrontend architectures has been open-sourced, providing patterns for sharing React context and state across independently deployed applications.

A significant microfrontend tooling release: a React bridge library that handles the hard problems of running multiple React applications on one page has been open-sourced. This addresses a genuine pain point - sharing context, managing state, and coordinating between independently deployed React apps.

The library provides primitives for context sharing across React roots, event coordination between microfrontends, and shared state management patterns. These are problems every microfrontend architecture eventually faces, and having battle-tested solutions is valuable.

What's missing from the announcement: discussion of when you should actually use microfrontends. The architecture has legitimate use cases - very large organizations with autonomous teams, gradual migrations from legacy systems - but it's often adopted without understanding the costs.

For teams considering microfrontends: this tooling makes the React-specific challenges more manageable, but doesn't eliminate the inherent complexity of distributed frontends. Make sure the organizational benefits justify the technical costs before adopting this architecture.

**Key takeaways:**
- Solves React-specific challenges in microfrontend architectures
- Provides context sharing, event coordination, and state management
- Architecture complexity remains - ensure use case justifies the approach

**Tradeoffs:**
- Gain team autonomy and independent deployability but sacrifice application simplicity and debugging ease
- Enable gradual migration capabilities at the cost of runtime coordination overhead

**Link:** [React Microfrontend Bridge](https://github.com/micro-frontends/react-bridge)
