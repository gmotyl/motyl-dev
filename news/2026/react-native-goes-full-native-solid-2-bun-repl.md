---
title: "React Native Goes Full Native, Solid 2.0 Enters Beta, and Bun Gets a Zig-Powered REPL"
excerpt: "Expo SDK 55 closes the gap between React Native and truly native apps, Solid.js makes async a first-class citizen, Bun 1.3.10 ships a blazing fast REPL and TC39 decorators, PlanetScale acquires Drizzle, and a deep dive into sandbox isolation for the AI agent era."
publishedAt: 2026-03-04
slug: react-native-goes-full-native-solid-2-bun-repl
hashtags: ["#react-native", "#expo", "#solidjs", "#bun", "#javascript", "#typescript", "#frontend", "#webdev", "#security", "#sandbox", "#orm", "#npm", "#generated", "#en"]
---

Well folks, this is one of those weeks where the JavaScript ecosystem decides to ship everything at once. We have got a massive Expo SDK release that is basically daring Swift developers to tell the difference, Solid.js finally dropping its 2.0 beta, Bun rewriting its REPL from scratch in Zig because of course they did, and PlanetScale buying Drizzle. Let us dig in.

## Expo SDK 55: Making React Native Actually Native

**TLDR:** Expo SDK 55, built on React Native 0.83 and React 19.2, introduces real SwiftUI and Jetpack Compose components usable directly from JavaScript, iOS home screen widgets without native code, and a completely reworked navigation system that makes React Native apps genuinely indistinguishable from fully native ones.

**Summary:**

For years, the highest praise for a React Native app was "it feels basically native," which eventually became a backhanded compliment from the platform purists. Expo SDK 55 takes direct aim at that gap. The headline feature is the @expo/ui library, which now lets you use actual SwiftUI and Jetpack Compose components directly from JavaScript. This is not some approximation or wrapper that kind of looks right. These are real platform components, and the Jetpack Compose API has graduated from alpha to beta with a functional DSL pattern and a pile of Material 3 components.

The navigation story gets a serious upgrade too. Expo Router v55 introduces a new declarative Stack API where you compose native headers, search bars, and toolbars using React components right inside your screen. There is a new Apple Zoom transition that brings gesture-driven shared element transitions using the native iOS zoom gesture, a Colors API for dynamic Material 3 styles on Android and adaptive colors on iOS, and experimental SplitView support for iPad. On the web side, they have added experimental server-side rendering, data loaders with a useLoaderData hook, and the renamed expo-server package with deployment adapters for multiple hosting providers.

Perhaps the most ambitious addition is expo-widgets, which lets you build iOS home screen widgets and Live Activities using just Expo UI components with zero native code. They also shipped Hermes v1 with early performance improvements and better modern JavaScript support, a Hermes bytecode diffing feature for roughly 75 percent smaller update downloads, and MCP integration that lets AI agents query EAS build failures and TestFlight crash reports. The sheer scope of this release is staggering.

One thing worth noting: they are pushing hard for developers to move from Expo Go to development builds, and the minimum Xcode has been bumped to 26. The Legacy Architecture support is officially gone. If you have been putting off the New Architecture migration, that procrastination window just closed.

**Key takeaways:**
- Real SwiftUI and Jetpack Compose components are now usable directly from JavaScript via @expo/ui
- Expo Router v55 brings declarative native headers, toolbars, zoom transitions, and a Colors API
- expo-widgets enables iOS home screen widgets and Live Activities without native code
- Hermes bytecode diffing reduces update download sizes by approximately 75 percent
- Legacy Architecture support has been removed entirely in SDK 55
- Experimental SSR, data loaders, and expo-server expand web capabilities significantly

**Link:** [Expo SDK 55](https://expo.dev/changelog/sdk-55)

## Expo Router v55: Navigation That Feels Like It Belongs

**TLDR:** Expo Router v55 rethinks navigation as composable React components with native platform primitives, while simultaneously expanding web support with experimental server-side rendering and data loaders.

**Summary:**

The Expo Router changes deserve their own spotlight because they represent a fundamental shift in how you think about navigation in React Native. Instead of passing options objects to configure screens, you now compose native UI elements as React components directly inside your screen. Need a search bar? Drop a Stack.SearchBar component. Need toolbar buttons? Use Stack.Toolbar with a placement prop. It is declarative, composable, and feels like writing React rather than fighting a configuration API.

The Native Tabs component is particularly noteworthy. On Android, it automatically uses Material Design 3 dynamic colors that adapt to the user's wallpaper. Safe area handling is built in by default, so you can stop manually wrestling with insets. There is even a bottom accessory API for iOS 26 that lets you add floating views above the tab bar, which is exactly the kind of native platform feature that used to require ejecting and writing Swift.

On the web side, the experimental additions are significant even if they are not production-ready yet. Server-side rendering support means you can generate HTML dynamically per request instead of only at build time. Data loaders let you co-locate server-side data fetching with route components, keeping secrets like API keys server-side while the client only sees the result. If this sounds a lot like Remix or Next.js patterns, that is exactly the point. The difference is that the same code also runs natively on iOS and Android.

The new Color API is a small but important detail. It gives you direct access to platform-specific colors, including Material Dynamic colors on Android that adapt to the user's wallpaper. This is the kind of thing that separates an app that looks fine from one that looks like it belongs on the platform.

**Key takeaways:**
- Navigation UI is now composed as React components rather than configured through options objects
- Native Tabs support Material Design 3 dynamic colors and built-in safe area handling
- Experimental SSR and data loaders bring Remix-like patterns to Expo with cross-platform support
- The Color API provides direct access to platform-specific colors including wallpaper-adaptive ones
- Experimental SplitView support targets iPad and larger screens

**Link:** [Expo Router v55: More Native Navigation, More Powerful Web](https://expo.dev/blog/expo-router-v55-more-native-navigation-more-powerful-web)

## Solid.js 2.0 Beta: The Suspense Is Over

**TLDR:** Solid 2.0 enters beta with async as a first-class citizen, a new Loading component for initial readiness, pending UI as an expression rather than a flag, and built-in mutation primitives with optimistic updates.

**Summary:**

Ryan Carniato and the Solid.js team skipped the alpha phase entirely and jumped straight to beta, which tells you how much iteration happened during the experimental phase. The big conceptual shift in Solid 2.0 is that async is no longer something you bolt on. Computations can return Promises or async iterables, and the reactive graph knows how to suspend and resume work. This is not just sugar over existing patterns. It changes how you think about loading states and data flow.

The new Loading component replaces Suspense for showing fallbacks while a subtree is not ready yet. But here is the interesting part: once the UI is up, it stays stable while background work happens. If you need to show a "refreshing" indicator during revalidation, you use isPending as an expression rather than swapping out the entire UI. This separation between initial readiness and ongoing updates is something that has been a pain point in React's Suspense model, and Solid is making a clear architectural choice here.

Mutations get their own primitives too. The action function combined with createOptimistic and createOptimisticStore lets you write the entire optimistic update, server write, and refresh cycle as one coherent flow. The scheduler has been reworked so updates are microtask-batched, and reads do not update until the batch flushes. This means if you set a signal and immediately read it, you get the old value until you explicitly flush. It is more predictable, even if it requires a mental model adjustment.

The breaking changes are real. List rendering changes from Index to For with a keyed flag. createEffect is split into compute and apply phases. Store setters are draft-first by default. The use directive is gone, replaced by ref directive factories. If you have a production Solid app, budget time for migration. But the team has published seven detailed RFCs covering every area of change, which is exactly the kind of thorough documentation a major version deserves.

**Key takeaways:**
- Async is now first-class in the reactive graph with automatic suspend and resume
- Loading component handles initial readiness while isPending handles revalidation without tearing down UI
- Built-in action, createOptimistic, and createOptimisticStore primitives for mutation flows
- Updates are microtask-batched with explicit flush for deterministic behavior
- Significant breaking changes in list rendering, effects, stores, and DOM directives
- Seven detailed RFCs provide comprehensive migration documentation

**Link:** [Solid.js v2.0 Beta](https://github.com/solidjs/solid/releases/tag/v2.0.0-beta.0)

## Bun 1.3.10: A New REPL, TC39 Decorators, and Performance Everywhere

**TLDR:** Bun 1.3.10 ships a completely rewritten REPL in Zig, full TC39 standard ES decorators support, self-contained HTML output via compile target, Windows ARM64 support, barrel import optimization, and a long list of performance improvements including 25x faster structuredClone for arrays.

**Summary:**

The Bun team continues its pattern of shipping releases that read like three releases from any other runtime. The new REPL is entirely rewritten in Zig, replacing a third-party npm package. It starts instantly with no package downloads, includes syntax highlighting, persistent history, tab completion, multi-line input, and top-level await. Small thing, huge quality of life improvement for anyone who uses REPLs regularly.

The TC39 standard ES decorators support is one of the most requested features since 2023. This is the non-legacy variant, the one with the accessor keyword, Symbol.metadata, and proper evaluation ordering. If you have been stuck on legacy decorators because your runtime did not support the standard ones, that blocker is gone. Method, getter, setter, field, auto-accessor, and class decorators all work correctly, including on private fields.

The compile target for browsers is a clever addition. You can now use bun build with compile and target browser to produce self-contained HTML files with all JavaScript, CSS, and assets inlined. Script tags become inline, stylesheets become inline style tags, and asset references become data URIs. This is useful for distributing standalone HTML files that work via file protocol without a web server.

The performance improvements are where things get almost absurd. structuredClone is up to 25x faster for numeric arrays. Buffer.slice is 1.8x faster by moving from JS to native C++. path.parse is 2 to 7x faster. String.prototype.endsWith is up to 10.5x faster when constant-folded. The barrel import optimization detects pure re-export index files and only parses the submodules you actually use, which can make libraries like lucide-react build up to 2x faster.

The bug fix list is equally impressive, including fixes for Python MCP servers breaking due to stdio pipe shutdown behavior, a memory leak of 260KB per request when cancelling streaming HTTP responses, and multiple security fixes including HTTP header injection in the S3 client and a path traversal vulnerability in tarball extraction.

**Key takeaways:**
- New REPL written in Zig starts instantly with syntax highlighting, history, and top-level await
- Full TC39 standard ES decorators support including accessor keyword and Symbol.metadata
- Self-contained HTML output via bun build compile with target browser
- Windows ARM64 native support
- structuredClone up to 25x faster for arrays, Buffer.slice 1.8x faster, path.parse up to 7x faster
- Barrel import optimization only parses the submodules you actually import
- Fixed Python MCP server stdio pipe issues that broke asyncio-based servers

**Link:** [Bun v1.3.10](https://bun.com/blog/bun-v1.3.10)

## Let's Discuss Sandbox Isolation

**TLDR:** A comprehensive breakdown of sandbox isolation techniques from Linux namespaces through gVisor, microVMs, and WebAssembly, with practical guidance on choosing the right boundary for your threat model, especially relevant as AI agents generate and execute untrusted code.

**Summary:**

Shayon Mukherjee wrote what might be the definitive guide to understanding sandbox isolation, and the timing could not be better given how many AI agents are now generating and executing code. The core insight is that isolation is not binary, and the word gets used loosely to describe fundamentally different things with different attack surfaces and failure modes.

The piece walks through the spectrum methodically. Linux namespaces, which Docker uses, are visibility walls that prevent processes from seeing things outside their namespace but do not prevent kernel exploitation. Seccomp filters reduce the number of allowed syscalls but the remaining ones still enter the same kernel code paths. gVisor changes the game qualitatively by interposing a user-space kernel written in Go between untrusted code and the host, reducing the host syscall surface from roughly 340 to about 70. MicroVMs use hardware virtualization to give each workload its own kernel with a hardware-enforced boundary. WebAssembly takes the most radical approach with no kernel access at all, requiring explicit capability imports for any host interaction.

The practical sections are where this article really shines. The defense-in-depth pattern on top of gVisor shows how to layer per-job namespaces, seccomp filters, privilege dropping, ephemeral tmpfs, and network egress control. The fork server pattern for creating child sandboxes from async runtimes addresses a real-world footgun that many developers hit. And the section on local sandboxing for developer machines covers how tools like Cursor, Codex CLI, and Claude Code approach the problem of AI agents running on your laptop.

What I appreciate most is the honesty about tradeoffs. The article does not declare a winner. It maps each approach to its appropriate threat model and acknowledges that compute isolation means nothing if the sandbox has unrestricted network egress. That last point about network policy being the other half of the isolation story is something that gets overlooked constantly.

**Key takeaways:**
- Linux namespaces are visibility walls, not security boundaries. Same kernel, same attack surface.
- gVisor interposes a user-space kernel that reduces host syscall surface from approximately 340 to 70
- MicroVMs provide hardware-enforced isolation with VM snapshots enabling millisecond-level cold starts
- WebAssembly provides the strongest isolation model but is limited by language support constraints
- Network egress control is equally important as compute isolation but frequently overlooked
- AI coding agents on developer machines use OS-level permission scoping rather than kernel boundaries

**Link:** [Let's Discuss Sandbox Isolation](https://www.shayon.dev/post/2026/52/lets-discuss-sandbox-isolation/)

## Drizzle Joins PlanetScale

**TLDR:** PlanetScale has acquired the Drizzle ORM team, with Drizzle remaining an independent open-source project with its own roadmap while gaining the backing and resources of PlanetScale's infrastructure.

**Summary:**

In what might be the most significant acquisition in the JavaScript ORM space, PlanetScale announced that the Drizzle team is joining the company. Drizzle has risen to become the default TypeScript ORM for many teams thanks to its obsession with performance, type safety, and developer experience. The alignment with PlanetScale, which shares that same focus on performance and developer experience from the database infrastructure side, makes strategic sense.

The key detail here is the commitment to keeping Drizzle as an independent open-source project with its own roadmap and goals. This is the kind of promise that gets made during every acquisition, and the real test will be whether it holds over time. The optimistic read is that PlanetScale gives the Drizzle team financial stability and focus, letting them invest in the project without the distraction of figuring out how to sustain it independently. The cautious read is that acquisitions inevitably create gravitational pull toward the acquirer's priorities.

What is worth watching is whether Drizzle starts getting deeper PlanetScale-specific optimizations or whether it genuinely maintains its database-agnostic stance. The project's value has always been that it works beautifully with PostgreSQL, MySQL, SQLite, and others. If that changes, the community will notice quickly. For now, though, this looks like good news for the project's sustainability.

**Key takeaways:**
- PlanetScale acquires the Drizzle ORM team
- Drizzle will remain an independent open-source project with its own roadmap
- The acquisition provides financial stability for the team to focus on core project priorities
- Worth watching whether database-agnostic stance is maintained over time

**Link:** [Drizzle Joins PlanetScale](https://planetscale.com/blog/drizzle-joins-planetscale)

## npmx: A New Browser for the npm Registry

**TLDR:** Daniel Roe and over 105 contributors launched the alpha of npmx.dev, a fast, community-driven alternative to the npm registry browser with social features, install size data, module format information, and support for 19 languages.

**Summary:**

The npm registry web experience has been a pain point for years. You go to npmjs.com to look up a package, and you get a README and some download numbers. That is about it. npmx.dev, launched by Daniel Roe of Nuxt fame, aims to fix that by building a modern registry browser that surfaces the data developers actually need when evaluating packages.

The alpha already includes download statistics, outdated dependency warnings, module format detection for ESM and CJS, install size information, JSR cross-reference, version range resolution, and the ability to launch StackBlitz or CodeSandbox environments directly from package READMEs. The social features, including package likes, are an interesting experiment in bringing community signal to package discovery.

The velocity of the project is remarkable. Within 24 hours of Daniel posting about it on Bluesky, 49 pull requests were opened. Two weeks later, the community had contributed 1000 issues and PRs, roughly one every 20 minutes around the clock. Over 105 contributors and 1500 stars in 16 days. The project prioritizes accessibility and internationalization from day one, with support for 19 languages. Whether this becomes the default way people browse npm remains to be seen, but the community energy is real.

**Key takeaways:**
- Fast, modern alternative to the npm registry browser with useful metadata surfaced upfront
- Install size, module format, outdated dependency warnings, and JSR cross-reference built in
- Social features including package likes aim to add community signal to package discovery
- 105 contributors and 1500 stars in the first 16 days
- Available in 19 languages with accessibility prioritized from the start

**Link:** [Announcing npmx](https://npmx.dev/blog/alpha-release)
