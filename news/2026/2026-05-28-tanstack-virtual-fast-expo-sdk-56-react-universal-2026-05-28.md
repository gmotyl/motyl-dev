---
title: "TanStack Virtual Goes Blazing Fast, Expo SDK 56 Lands, and React Goes Truly Universal"
excerpt: "This week brings major performance wins in TanStack Virtual, Expo SDK 56 with stable native UI, a React Strict DOM vision for truly unified cross-platform development, and a flurry of library updates across the ecosystem."
publishedAt: "2026-05-28"
slug: "tanstack-virtual-fast-expo-sdk-56-react-universal-2026-05-28"
hashtags: "#thisweekinreact #react #reactnative #tanstack #expo #reactstrictdom #graphql #generated #en"
source_pattern: "This Week In React"
---

## Component Architecture for React Server Components

**TLDR:** Aurora Scharff walks through the progression from `useEffect` to React Query to route loaders to RSCs, showing how RSCs allow you to describe a loading experience rather than manually orchestrate data fetching. The key insight is that components can own their data on the server, eliminating the classic prop-drilling waterfall.

**Summary:** For most of React's history, the standard move was to fetch at the top of a route and pass data down. Most React developers still reach for that pattern automatically, even in the Next.js App Router. The problem is that it creates tightly coupled components and awkward loading states, because you end up writing components that depend on their parents knowing what they need.

The fundamental issue with client-side fetching is timing. You wait for JavaScript to download, parse, and execute before the first network request even fires. Components mount, trigger their own fetches, and you end up with waterfalls where requests that could run in parallel are instead waiting on each other. Server-side fetching sidesteps all of that.

Aurora's article traces the evolution clearly. `useEffect` fetching is the baseline everyone knows. React Query is a big improvement for caching and synchronization, but it still runs on the client. Route-level loaders in frameworks like Next.js push the fetch earlier, before the component renders. React Server Components go further still: the component itself becomes async, it runs on the server, and data fetching is just part of what it does.

The practical architecture shift is that you stop thinking about "where should I fetch this and how do I pass it down" and start thinking about "which components actually need this data." Components that need data fetch their own data. Parallel fetches happen naturally when sibling server components each initiate their own requests. Suspense boundaries let you describe the loading structure explicitly instead of building it out of conditional checks and early returns.

There's also good discussion in the article about avoiding blocking renders with careful placement of Suspense boundaries, and how to build skeleton states that stay in sync with real content structure.

**Key takeaways:**
- RSCs let components own their data fetching, removing the prop-drilling waterfall
- Data fetched on the server starts earlier and runs in parallel more naturally than client-side waterfall fetching
- Suspense boundaries are how you describe loading structure, not `isLoading` booleans
- Route loaders are a stepping stone; RSCs go further by making the component itself the fetch boundary

**Why do I care:** This is the mental model shift I think a lot of React developers are still working through. The App Router has been out for a while now, but the instinct to lift state and fetch at the top doesn't die easily. Aurora's post gives a clear progression that explains why the old pattern breaks down and why RSCs are a better fit. Worth reading if you're still sometimes unsure where to put a fetch.

**Link:** [Component Architecture for React Server Components | Aurora Scharff](https://76518bdd.click.convertkit-mail4.com/d0um55pwvdf0ho94lzxamhz9q3w07ilh037zx/wnh2h6uqpq577xul/aHR0cHM6Ly9hdXJvcmFzY2hhcmZmLm5vL3Bvc3RzL2NvbXBvbmVudC1hcmNoaXRlY3R1cmUtZm9yLXJlYWN0LXNlcnZlci1jb21wb25lbnRzLw==)

---

## TanStack Router and Query: Treating Loaders as Event Handlers

**TLDR:** TkDodo's latest post in the TanStack series explains how to combine TanStack Router's loaders with TanStack Query for the best of both worlds: early data initiation from loaders and proper cache management from Query.

**Summary:** TanStack Router has its own built-in caching, which works great for route-specific data. But the moment you need the same data across multiple routes, the per-route cache becomes limiting. TanStack Query's global cache solves that problem. The question is how to use both together without fighting yourself.

The core pattern TkDodo recommends is using route loaders purely as a signal to start fetching, not as the place that owns the data. Call `prefetchQuery` or `ensureQueryData` in the loader, then use `useSuspenseQuery` in the component. The loader kicks things off as early as possible, sometimes even before the JavaScript bundle for the route is downloaded. The component then reads from the cache. TanStack Router's `prefetch: 'intent'` feature means loaders can fire on hover, before the user even clicks. That's prefetch-on-hover basically for free.

The mental model TkDodo settles on is clean: treat the loader as a fire-and-forget event handler. It primes the cache. It doesn't return anything useful. `useLoaderData` would give you undefined, which is the point because you should be using `useSuspenseQuery` instead. Queries that aren't actively observed by hooks don't benefit from automatic refetching on window focus or network reconnection, and they're eligible for garbage collection. So even if `useLoaderData` worked at first, it would create subtle bugs over time.

One configuration detail matters: turn off `defaultPreloadStaleTime` in the router when using TanStack Query. The router has its own stale-while-revalidate logic, and you want Query to be the only thing controlling caching. Otherwise they'll conflict.

For SSR with TanStack Start, almost nothing changes. The loaders run on the server during the first load, seeding the query cache, and then the app transitions to client-side navigation. Server-fetched data gets dehydrated and streamed to the client automatically.

**Key takeaways:**
- Use loaders to initiate fetches early, but read data with `useSuspenseQuery` in components
- The loader is an event handler that primes the cache, not a data source
- Set `defaultPreloadStaleTime: 0` to let Query control caching exclusively
- `useSuspenseQuery` integrates with router boundaries, eliminating manual `isPending` checks

**Why do I care:** The "loader as event handler" framing clicked for me. It clarifies a confusion I've seen in teams where people mix `useLoaderData` and `useQuery` on the same data and end up with cache inconsistencies. This article has the right level of specificity to be actionable.

**Link:** [TanStack Router and Query](https://76518bdd.click.convertkit-mail4.com/d0um55pwvdf0ho94lzxamhz9q3w07ilh037zx/reh8h9umrm2ddxu6/aHR0cHM6Ly90a2RvZG8uZXUvYmxvZy90YW4tc3RhY2stcm91dGVyLWFuZC1xdWVyeQ==)

---

## GitHub Modernized Issues Navigation and Made It Instant

**TLDR:** The GitHub Issues team built a client-side IndexedDB cache, a preheating strategy, and a service worker to make issue navigation feel instant, dropping median HPC from 1,200ms to 700ms and getting 70% of React navigations under 200ms.

**Summary:** The GitHub Issues team started from an honest diagnosis: too many navigations were paying the full cost of server rendering and network fetches, even for pages the user had essentially seen before. Their solution wasn't to optimize the backend further. It was to change how data flows end-to-end.

The first piece was a persistent client-side cache backed by IndexedDB, with stale-while-revalidate semantics. When a user navigates to an issue, the app tries to render from cache first, then revalidates in the background. This alone moved roughly 22% of React navigations into the "instant" bucket (under 200ms), up from 4%. Cache hit rate landed around 33%.

The second piece was preheating. A 33% cache hit rate means 67% of navigations still miss, because the data isn't there yet when the user clicks. Preheating proactively walks high-intent issue references on surfaces like issue lists and dashboards, and pre-populates the cache for likely next navigations. But crucially, it only fetches when the issue isn't already cached. This makes it fundamentally different from eager prefetching. The team added rate limiting, circuit breakers, and low-priority workers so background preheating never competes with user-initiated work. After preheating rolled out, instant navigations reached roughly 30% overall, and cache hit rate jumped to 96%.

The third piece was a service worker. Service workers sit outside the page runtime and can intercept even hard navigations. When a user does a full browser load for an issue page, the service worker checks the local cache first. If the data is there, it sends a header to the server signaling it can return a thin HTML shell instead of a full server-rendered response. React then renders from the cached data on the client. This helped Turbo navigations especially, since those were still dependent on server response time.

The results across all navigation types: P10 went from 600ms to 70ms. P50 crossed below one second for the first time. P25 is now 120ms.

**Key takeaways:**
- IndexedDB-backed stale-while-revalidate can push a large share of soft navigations into the "instant" category
- Preheating is cache-population logic, not prefetch logic: it only fires when data is absent
- Service workers extend the local-first model to hard navigations by intercepting before the page runtime exists
- Measuring distribution quality (how many navigations are fast) matters more than optimizing the slowest tail

**Why do I care:** This is an excellent systems architecture post. The layered approach, caching first, then preheating to improve hit rates, then service workers to extend coverage to hard navigations, is a transferable pattern. If you're building a data-heavy React app where users revisit the same content, there's a real playbook here.

**Link:** [From latency to instant: Modernizing GitHub Issues navigation performance](https://76518bdd.click.convertkit-mail4.com/d0um55pwvdf0ho94lzxamhz9q3w07ilh037zx/08hwhgu252oeeqbp/aHR0cHM6Ly9naXRodWIuYmxvZy9lbmdpbmVlcmluZy9hcmNoaXRlY3R1cmUtb3B0aW1pemF0aW9uL2Zyb20tbGF0ZW5jeS10by1pbnN0YW50LW1vZGVybml6aW5nLWdpdGh1Yi1pc3N1ZXMtbmF2aWdhdGlvbi1wZXJmb3JtYW5jZS8=)

---

## TanStack Virtual Just Got 1382x Faster on One Critical Path

**TLDR:** Tanner Linsley audited TanStack Virtual end-to-end and shipped the biggest performance release the library has had in years: cold mount on a 100k-item list dropped from 6.1ms to 4.5ms, a 10k-item resize storm went from 1.9 seconds to 1.3 milliseconds, and iOS Safari momentum scroll finally works.

**Summary:** The headline number is wild. A Map clone bug in the `resizeItem` function was copying the entire size cache on every call. On a 10k-item list where every item resizes once on mount, that's 50 million wasted operations, which explains why `resizeItem` storms could take nearly two seconds. The fix was four lines, and it dropped that case to 1.3 milliseconds. One thousand three hundred and eighty-two times faster.

That wasn't the only thing found in the audit. There was an `Object.entries` plus delete pattern that triggered V8's dictionary-mode deoptimization on every render. A `Math.min(...arr)` spread that could blow the argument list limit at 125k items. An element cache leak. A `useReducer(() => ({}), {})` pattern allocating on every scroll event. None catastrophic alone, but collectively they explained why the issue tracker had persistent scroll stutter reports.

After fixing those, Tanner went further. The library was still allocating a `VirtualItem` object for every index even though only around 50 items are ever visible. The fix was to switch to a flat `Float64Array` for single-lane lists, and expose items lazily via a Proxy that materializes objects only when something actually reads them. Public API didn't change, internal hot paths got faster.

iOS Safari momentum scroll has been broken for years on dynamic-height lists. The cause is that WebKit treats any programmatic `scrollTop` write during a touch-driven scroll as a cancel instruction. The fix defers the write while a finger is on screen and during the 150ms post-touch momentum window, then flushes a single accumulated adjustment once the scroll settles. 370 bytes of iOS-specific code.

Backward scroll jank with dynamic heights is also gone. The library was adjusting `scrollTop` on every above-viewport resize to keep the visible window stable, which is what you want going forward but actively works against backward scrolling. The fix is to gate the adjustment on scroll direction.

**Key takeaways:**
- A Map clone on every `resizeItem` call was causing 1.9s mount times; a version counter counter fixed it in four lines
- Lazy `Float64Array`-backed virtual items cut cold mount at 100k from 6.1ms to 4.5ms
- iOS momentum scroll is now handled via deferred scroll adjustments
- Backward scroll jank with dynamic heights is gone by default

**Why do I care:** This is what a proper performance audit looks like. Not micro-benchmarks, not profiling one happy path. Reading the entire source looking for quantifiably bad patterns, measuring before and after, shipping a release that's immediately better for every framework adapter. The benchmark suite committed alongside it is also genuinely useful.

**Link:** [TanStack Virtual just got a lot faster, and finally handles iOS | TanStack Blog](https://76518bdd.click.convertkit-mail4.com/d0um55pwvdf0ho94lzxamhz9q3w07ilh037zx/7qh7h2u979kllru9/aHR0cHM6Ly90YW5zdGFjay5jb20vYmxvZy90YW5zdGFjay12aXJ0dWFsLXBlcmYtYW5kLWlvcw==)

---

## TanStack Virtual Adds First-Class Chat UI Support

**TLDR:** TanStack Virtual now has native support for chat UI patterns through `anchorTo: 'end'`, `followOnAppend`, and stable-keyed prepend handling, making the common scroll behaviors in chat applications not a userland problem anymore.

**Summary:** Chat UIs look like lists. They're not quite lists. Normal lists are start-anchored: you scroll down, append content at the end, and everything works. Chat inverts that. Older history loads by prepending items at the top. The last message can grow token by token while a model streams. Users should stay pinned to the bottom unless they've scrolled up to read history, in which case new messages shouldn't drag them back down.

Every team building a chat UI has rediscovered the same scroll math and written their own version. TanStack Virtual has now made those patterns first-class.

`anchorTo: 'end'` tells the virtualizer that the end of the list is the stable edge. When you prepend older messages, the virtualizer captures the currently visible item, finds the same keyed item after data changes, and adjusts scroll offset to keep it in the same visual position. No `column-reverse`, no inverted CSS transforms, no manual `scrollTop += delta`. Stable keys on messages are required because index-based keys can't survive a prepend.

`followOnAppend` implements the "stay at latest unless reading history" rule. If the user is near the bottom, new messages keep the viewport pinned. If they've scrolled up, new output arrives without stealing focus. This also works with streaming: when the last message grows token by token, `anchorTo: 'end'` keeps the viewport pinned if the user was already at the bottom.

There's also `scrollToEnd()` for building "jump to latest" buttons, and threshold configuration for what counts as "near the bottom."

**Key takeaways:**
- `anchorTo: 'end'` makes prepend-stable scroll work without CSS hacks
- `followOnAppend` handles the conditional "stay pinned unless reading history" rule
- Stable message keys are required for prepend stability to work
- Streaming token growth works with end-anchoring to keep the viewport pinned automatically

**Why do I care:** This is genuinely one of those problems that every team building a chat or activity feed reimplements from scratch. The fact that it's now handled in a performant virtualization library rather than in userland means fewer scroll bugs and less code. Worth upgrading just for this.

**Link:** [Chat UIs Are Lists Until They Aren't | TanStack Blog](https://76518bdd.click.convertkit-mail4.com/d0um55pwvdf0ho94lzxamhz9q3w07ilh037zx/owhkhwuwvwk99qiq/aHR0cHM6Ly90YW5zdGFjay5jb20vYmxvZy90YW5zdGFjay12aXJ0dWFsLWNoYXQ=)

---

## Expo SDK 56: React Native 0.85, Stable Native UI, and Expo UI in the Default Template

**TLDR:** Expo SDK 56 ships with React Native 0.85 and React 19.2, marks the Jetpack Compose and SwiftUI APIs in Expo UI as stable, adds Expo UI to the default `create-expo-app` template, and introduces universal components that work across Android, iOS, and web from a single import.

**Summary:** Three SDK cycles of iteration landed on stable ground. The Jetpack Compose APIs for Android and the SwiftUI APIs for iOS, which have been maturing since SDK 53, are now officially stable in SDK 56. That matters because it's the first time you can build truly native-feeling UI components in an Expo app without either rolling your own native modules or relying on community libraries that might lag behind OS updates.

The bigger story for new projects is that Expo UI is now in the default `create-expo-app` template. When you start a new Expo app today, you immediately have access to native UI primitives without any extra setup. Layout primitives, text, inputs, controls like switch and slider, and sheets like BottomSheet are all available from `@expo/ui`.

Universal components are a significant addition. Previously, building cross-platform UI with Expo UI meant splitting code into `.android.tsx` and `.ios.tsx` files for anything involving native primitives. Universal components bridge that gap: they render to Jetpack Compose on Android, SwiftUI on iOS, and standard React DOM or react-native-web on the web, all from a single import. The web APIs are still marked experimental and subject to change, but the Android and iOS sides are stable.

SDK 56 also lands drop-in replacements for popular React Native community libraries. The release notes point to specific replacements without requiring migration cost for common patterns. React Native 0.85 itself brings a range of improvements, and React 19.2 refines concurrent features that Expo UI depends on.

**Key takeaways:**
- Expo UI SwiftUI and Jetpack Compose APIs are now stable
- New `create-expo-app` projects include Expo UI by default
- Universal components work across Android, iOS, and web from a single import
- Expo UI is now available in Expo Go for quick prototyping

**Why do I care:** The "native UI in the default template" change is a bigger deal than it might look. It normalizes reaching for SwiftUI and Compose components as the default instead of JavaScript-rendered alternatives. If you're starting a new Expo project, you have a different starting point than you did a year ago.

**Link:** [Expo SDK 56 - Expo Changelog](https://76518bdd.click.convertkit-mail4.com/d0um55pwvdf0ho94lzxamhz9q3w07ilh037zx/wnh2h6uqpq576xal/aHR0cHM6Ly9leHBvLmRldi9jaGFuZ2Vsb2cvc2RrLTU2)

---

## One React for Web and Native: The Case for React Strict DOM

**TLDR:** Nicolas Gallagher, creator of React Strict DOM, makes the full case for why standardizing cross-platform React on web APIs is the right long-term bet, backed by Meta's production use in Facebook and Instagram VR apps and Zalando's adoption for their retail platform.

**Summary:** The fragmentation between React DOM and React Native has been a persistent tax on developers for over a decade. The first decision you make, web or native, locks you into a different set of primitives, different styling approaches, and a different mental model. Nicolas Gallagher's post is an honest and thorough argument for why that should end, and how React Strict DOM is the mechanism to do it.

The argument isn't just aesthetic. It's practical. Most React code in the world was written for React DOM using standard web APIs. Millions of components across thousands of codebases. Getting those components to run on native has historically meant rewriting them for React Native's View, Text, and StyleSheet primitives. React Strict DOM inverts that: it provides a strict subset of HTML elements and a CSS API that works on both platforms, so existing web code becomes a candidate for cross-platform use without rewriting.

Meta's production experience is the proof point. The Facebook and Instagram VR apps, shipped at Meta Connect 2024, shared over 60% of their files with facebook.com. Complex features like the news feed, commenting systems, and routing all ran on both platforms. Those features weren't simplified versions. They were the same battle-tested code. Zalando, the European retailer, adopted React Strict DOM for similar reasons: they wanted to stop building the same features twice for separate web and native teams.

The technical underpinning is React Native's JSI (JavaScript Interface), which replaced the old asynchronous JSON bridge. The bridge made DOM emulation impossible because synchronous operations like `getBoundingClientRect()` couldn't work across an async boundary. With JSI, JavaScript can call C++ native functions synchronously. React Native is now implementing `MutationObserver`, `IntersectionObserver`, synchronous layout APIs, and a browser-compatible event loop. React Strict DOM isn't faking the DOM. It's running on a React Native that is actively implementing the relevant parts of the DOM specification.

The migration story is also well thought out. Babel codemods can transform React DOM components to React Strict DOM components, and can also migrate React Native components in the other direction. Bidirectional, automated migration means adoption can be incremental.

**Key takeaways:**
- React Strict DOM uses web APIs as the cross-platform interface, making existing web code reusable on native
- Meta runs React Strict DOM in production Facebook and Instagram VR apps with 60%+ file sharing with the web versions
- JSI enables the synchronous APIs (layout measurement, event handling) that make DOM emulation viable on native
- Codemods enable incremental, automated migration from both React DOM and React Native codebases

**Why do I care:** I've been watching the "write once, run everywhere" promises cycle through the industry for years. This one is different because it's built on the right foundation: web standards rather than a proprietary abstraction, and it's backed by actual production deployments at scale. The AI coding angle is also real: when an LLM needs to understand one set of APIs instead of two, the output quality improves. I'm paying attention to React Strict DOM more than I was a year ago.

**Link:** [One React for Web and Native – Notes by Nicolas Gallagher](https://76518bdd.click.convertkit-mail4.com/d0um55pwvdf0ho94lzxamhz9q3w07ilh037zx/owhkhwuwvwk9dqbq/aHR0cHM6Ly9uaWNvbGFzZ2FsbGFnaGVyLmNvbS9vbmUtcmVhY3QtZm9yLXdlYi1hbmQtbmF0aXZlLw==)

---

## Apollo Client 4.2: Type-Safe Default Options and Window Focus Refetching

**TLDR:** Apollo Client 4.2 adds two long-requested features: type-safe default options via TypeScript module augmentation, and a `RefetchEventManager` that handles automatic refetches on window focus or network reconnection without manual `useEffect` wiring.

**Summary:** The type safety problem in Apollo was subtle but real. You could set `errorPolicy: "all"` in `defaultOptions` to make your application behavior consistent, but TypeScript wouldn't know about it. The `useSuspenseQuery` return type would stay as `TData` instead of `TData | undefined`, which meant TypeScript couldn't warn you about accessing properties on potentially undefined data. The mismatch between runtime behavior and types created a category of production crashes that the type system theoretically should have caught.

Version 4.2 fixes this with TypeScript module augmentation. You declare your default options in a `.d.ts` file by augmenting the `ApolloClient` namespace, and Apollo Client forces you to also provide matching `defaultOptions` in the constructor. Once both are in place, the hook return types reflect the runtime behavior. `useSuspenseQuery` returns `TData | undefined` when `errorPolicy: "all"` is the default, because that's what it actually returns at runtime.

As a side effect of this design, passing generic type arguments to hooks is now deprecated. Apollo recommends using `TypedDocumentNode` instead, which carries the types in the document itself rather than as call-site annotations.

The second feature is `RefetchEventManager`. TanStack Query has had window focus refetching for years, and it's one of those features you don't know you need until you notice users seeing stale data after switching tabs. Building it yourself in Apollo required a mess of `useEffect` hooks or wrapper abstractions. `RefetchEventManager` handles it at the client level. You configure it once with the events you want to respond to, like `windowFocusSource`, and active queries automatically refetch on those events. Individual queries can opt out with `refetchOn: { windowFocus: false }`.

**Key takeaways:**
- Type-safe default options require both a TypeScript module augmentation declaration and matching runtime `defaultOptions`
- Hook generic arguments are now deprecated in favor of `TypedDocumentNode`
- `RefetchEventManager` adds window focus and network reconnection refetching at the client level
- Queries can opt out of specific refetch events individually

**Why do I care:** The type-safe default options fix is the kind of improvement that prevents a category of runtime errors. It's also a clever use of module augmentation to bridge the gap between configuration and types. The window focus refetching is honestly table stakes at this point, and I'm glad Apollo added it natively rather than leaving it to userland.

**Link:** [What's New in Apollo Client 4.2 - Apollo GraphQL Blog](https://76518bdd.click.convertkit-mail4.com/d0um55pwvdf0ho94lzxamhz9q3w07ilh037zx/6qhehoulglkrevs9/aHR0cHM6Ly93d3cuYXBvbGxvZ3JhcGhxbC5jb20vYmxvZy93aGF0cy1uZXctaW4tYXBvbGxvLWNsaWVudC40LTI=)

---

## Lingui Context Directives: Set Translation Context Once Per Block

**TLDR:** Lingui adds `lingui-set` and `lingui-reset` comment directives that let you declare `context`, `comment`, and `idPrefix` once for an entire block of macro calls, fixing the ergonomic friction of adding the same `context:` prop to every single string in a file.

**Summary:** Lingui's keyless translations are one of its best features. You write the source string directly in code, and Lingui generates a stable ID automatically. No separate key files, no key naming conventions to debate. The problem surfaces when two files have the same source string but different intended meanings. "Save" in a settings panel, "Save" in a payment flow, and "Save" on a destructive action confirmation can all have different correct translations in many languages. Context is how you tell translators which "Save" they're looking at.

The existing solution was to add `context: "checkout"` to every macro call in a file. That's the kind of repetition that makes people skip adding context at all, which is exactly what hurts translation quality. Context isn't just about preventing ID collisions. It's about giving translators enough information to produce accurate output without guessing from a three-character string.

The new directives solve this by letting you declare context once. Drop `// lingui-set context="checkout"` above a block of strings and every macro call below inherits that context until you change or reset it. Directives accumulate: each `lingui-set` merges with whatever was set before. Explicit props on individual macro calls always override directive values. `lingui-reset` clears everything. The directives work with both line comments and block comments, and they work with JSX macros too.

The `idPrefix` parameter adds namespace support for teams using explicit IDs. Combined with the optional `idPrefixLeader` config, you can namespace a whole group of IDs with a shared prefix without repeating it manually.

**Key takeaways:**
- `// lingui-set context="name"` applies to all macro calls below it in the file
- Directives accumulate and can be overridden per-call with explicit props
- `// lingui-reset` clears all inherited directive values
- Context improves translation quality, not just ID deduplication

**Why do I care:** The ergonomics matter here. Adding context to every string in a file is friction that real developers skip, which leads to translation quality problems that are invisible in code review and show up only when a French or German user reports a confusing string. This feature removes the friction while keeping the benefit.

**Link:** [Introducing Context Directives | Lingui](https://76518bdd.click.convertkit-mail4.com/d0um55pwvdf0ho94lzxamhz9q3w07ilh037zx/kkhmh2unqndwvdik/aHR0cHM6Ly9saW5ndWkuZGV2L2Jsb2cvMjAyNi8wNS8yMi9saW5ndWktY29udGV4dC1kaXJlY3RpdmVz)

---

## How Linear Is So Fast: A Technical Breakdown

**TLDR:** Linear inverts the traditional client-server relationship by keeping a local IndexedDB database in the browser, applying mutations locally first, then syncing to the server via WebSocket deltas. A deep dive explains the sync engine, optimistic UI, animation design, and first-load strategies that combine to make the app feel instant.

**Summary:** Most web apps run in the same loop: user clicks, browser fires HTTP request, server queries database, response comes back, browser repaints. Linear breaks that loop at the foundation. The database the UI reads from lives in the browser, in IndexedDB. When you update an issue, the change applies locally in a few milliseconds. The server learns about it asynchronously and broadcasts deltas to other clients via WebSocket.

The sync engine is where this gets interesting. It has to handle offline mutations, concurrent edits from multiple clients, and conflict resolution when changes arrive out of order. Linear uses a variant of operational transformation similar to what collaborative text editors use. Mutations carry a lamport timestamp so the system can order them consistently even when network delays scramble arrival order.

The first load experience is handled separately. Loading a full local database on initial visit would be slow, so Linear fetches a critical subset of data required for the initial view and progressively hydrates the rest in the background. Once the local database is populated, subsequent loads can read from IndexedDB immediately while the sync engine catches up on any deltas that arrived since the last session.

Animations are treated as a first-class performance concern. Linear runs animations at 60fps by avoiding layout-triggering CSS properties and using GPU-composited transforms. Transitions are implemented with physics-based springs rather than fixed duration easing, which makes interactions feel responsive to input speed rather than playing out a canned animation.

The article also covers the developer experience of building on this architecture: the tradeoffs around conflict resolution, the complexity of keeping local and remote state consistent, and where optimistic UI can fail in ways that are hard to debug.

**Key takeaways:**
- Local IndexedDB database means UI reads are synchronous, not network-bound
- Sync engine uses lamport timestamps and operational transformation for conflict-free concurrent edits
- First load fetches a critical subset; full database hydration happens progressively in background
- Animations use GPU-composited transforms and physics springs to stay out of the layout reflow path

**Why do I care:** The local-first architecture pattern keeps coming up. GitHub's IndexedDB cache, Linear's full local database. The performance improvements are real and significant. The complexity cost is also real. Linear built this from scratch. The GitHub team extended existing infrastructure. Understanding both approaches is useful when the conversation about "why is our app slow" comes up.

**Link:** [How's Linear so fast? A technical breakdown](https://76518bdd.click.convertkit-mail4.com/d0um55pwvdf0ho94lzxamhz9q3w07ilh037zx/8ghqh3uovo0ddwal/aHR0cHM6Ly9wZXJmb3JtYW5jZS5kZXYvaG93LWlzLWxpbmVhci1zby1mYXN0LWEtdGVjaG5pY2FsLWJyZWFrZG93bg==)

---

## Formisch: One Core, Six Frameworks, No Runtime Abstraction

**TLDR:** Formisch is a schema-first form library for React, Solid, Vue, Svelte, Preact, and Qwik that achieves zero-cost framework integration by swapping in each framework's native reactive primitive at build time rather than shipping its own runtime reactivity layer.

**Summary:** Most "framework-agnostic" libraries solve the portability problem at runtime. They ship their own reactivity primitive, something like a custom store or subscription bus, and then bridge it into whatever framework the consumer uses. That bridge costs bytes in the bundle, adds an adapter layer the framework has to drive, and loses integration with the framework's own batching and scheduling.

Formisch takes a different approach. The core library only ever imports four functions: `createSignal`, `batch`, `untrack`, and `createId`. These are declared abstractly. At build time, a Rolldown plugin swaps in the framework-specific implementation. In Solid, `createSignal` is a real Solid signal. In Vue, it's a `shallowRef`. In Svelte, it's a `$state` cell. The same form core code compiles differently for each framework, and each bundle carries only the framework's own primitive.

The consequence is that form state participates in the framework's own reactivity without any adapter in the path. In Solid, form state works with `createMemo` and `untrack` natively. In Vue, it slots into `computed` and `watch`. In Svelte, it's available in `$derived`. Batching, fine-grained tracking, and scheduling all come from the framework, not from Formisch.

React is the exception because React doesn't have a native signal primitive. The React adapter implements a minimal pub/sub, around a hundred lines including batching, and a `useSignals` hook that registers components as listeners. It's the smallest possible reactive layer that React needs, not a full Formisch reactivity system.

Tree-shaking works per-operation: validation, reset, insert, and move each live in their own modules. A form that only renders fields doesn't ship validation. The schema, based on Valibot, drives both runtime parsing and TypeScript types from one source.

**Key takeaways:**
- Build-time framework switching means zero runtime adapter cost and full framework-native reactivity
- React gets a minimal pub/sub adapter; all other supported frameworks use their native signal primitives
- Valibot schema drives both runtime validation and TypeScript types from one declaration
- Operations like reset, validate, and insert are separately tree-shakeable

**Why do I care:** The architecture is clever and the motivation is sound. I've worked with enough "universal" libraries that secretly carry their own reactive system and create subtle issues with batching or subscription cleanup. Doing the swap at build time is the right call. Worth watching if you want a form library that doesn't fight your framework of choice.

**Link:** [One core, six frameworks, zero runtime abstraction](https://76518bdd.click.convertkit-mail4.com/d0um55pwvdf0ho94lzxamhz9q3w07ilh037zx/vqh3hmuo7ox00lbw/aHR0cHM6Ly9mb3JtaXNjaC5kZXYvYmxvZy9vbmUtY29yZS1zaXgtZnJhbWV3b3Jrcy8=)

---

## Lynx UI Is Now Generally Available

**TLDR:** Lynx's unstyled component library, lynx-ui, is now generally available on iOS, Android, and HarmonyOS, featuring composable headless primitives, a dual-thread model for frame-accurate gesture interactions, and a reference design system called LUNA built on top.

**Summary:** Lynx has been building toward this since the React Advanced London preview last December. The library is now out of early access with a full documentation site and examples. The positioning is clear: native foundations, web-inspired composition model.

The component philosophy is headless and composable. Lynx doesn't want components to be opaque black boxes with growing prop surfaces. Instead, each component is a set of behavior primitives that you compose yourself. The Popover example illustrates this: `PopoverRoot` owns state, `PopoverTrigger` defines intent, `PopoverPositioner` handles placement, and `PopoverContent` is structurally independent. You render and style each part separately. This is the same approach that Radix UI and Ark UI popularized on the web, applied to native.

The dual-thread model is where things get technically interesting. Lynx defaults JavaScript to a background thread to keep the main thread free for rendering. When you need per-frame interaction logic, like a swipe gesture updating a transform on every frame, you can opt that specific logic into the main thread with Main-Thread Script. This means drag, resistance, release, and settle physics can all run at full frame rate without crossing thread boundaries. The Swiper and Sheet components in the library use this for their gesture animations.

For animation, Lynx adapted the Motion library as `@lynx-js/motion`, a thin wrapper that reuses Motion's source directly. If you already know Motion on the web, the mental model transfers.

LUNA is a reference design language built on top of the headless primitives. Teams can either use LUNA's visual design directly or follow the shadcn/ui-style pattern of composing themed wrappers on top of the primitives.

**Key takeaways:**
- Headless composable primitives with separate concerns for state, trigger, positioning, and content
- Main-Thread Script moves gesture interaction logic to the main thread for frame-accurate response
- Motion library adapted for Lynx as `@lynx-js/motion`
- Available on iOS, Android, and HarmonyOS; web and desktop support is partial and upcoming

**Why do I care:** The cross-platform native UI component space is getting genuinely interesting. Between Expo UI going stable, Lynx UI going GA, and React Strict DOM's momentum, there are now multiple credible options with different tradeoffs. Lynx's dual-thread gesture model is its most distinctive technical feature and it solves a real problem: gesture-driven animations that feel truly native without JavaScript-thread overhead.

**Link:** [Announcing lynx-ui - Lynx](https://76518bdd.click.convertkit-mail4.com/d0um55pwvdf0ho94lzxamhz9q3w07ilh037zx/p8hehqu40436oeir/aHR0cHM6Ly9seW54anMub3JnL25leHQvYmxvZy9seW54LXVp)

---

## Apex: A Specialized AI Model for React Native, Built by Callstack

**TLDR:** Callstack released Apex, an AI coding model fine-tuned specifically for React Native development on Gemma 4, running at 2,000-4,000+ tokens per second on dedicated GPU infrastructure, with a private beta now open for selected teams.

**Summary:** The AI coding model market is shifting. The subsidization phase, where inference was priced below cost to capture market share, is ending. GitHub's move to usage-based billing for Copilot is the clearest signal. Running multi-step agentic workflows on large frontier models at scale is expensive, and the economics don't hold at flat rates.

The counter-trend is smaller, specialized models. Cursor's Composer 2 and Windsurf's SWE-1 demonstrated that a heavily optimized smaller model can outperform a large general model on a specific task at much lower inference cost. Callstack is applying this logic to React Native.

Apex is based on Gemma 4 and trained using Supervised Fine-Tuning and GRPO (Group Relative Policy Optimization). The training data was hand-curated from recent GitHub repositories and React Native ecosystem code rather than a broad web scrape. The team's reasoning is that React Native development involves specific library conventions, native module constraints, and cross-platform nuances that general coding benchmarks don't reflect. A model can improve on general benchmarks and still produce React Native answers that miss the important details.

Callstack started experiments in February, ran multiple training variants through March, began internal testing in April, and prepared roughly 50 different model configurations. It runs on dedicated NVIDIA RTX PRO 6000 Blackwell Server Edition GPUs via Vast.ai Secure Cloud, producing 2,000 to 4,000+ tokens per second in production tests. The speed comes from the model carrying more React Native knowledge directly in its weights, requiring less tool calling, prompt scaffolding, and external context retrieval before producing an answer.

The practical claim is better React Native answers faster, at lower compute cost than frontier models. It's still in private beta while Callstack works through the legal and operational details for broader public access.

**Key takeaways:**
- Apex is fine-tuned on Gemma 4 specifically for React Native development
- Training data was hand-curated from React Native ecosystem code, not a broad web scrape
- 2,000-4,000+ tokens per second on dedicated Blackwell GPU hardware
- Private beta is open; broader public access pending legal and operational preparation

**Why do I care:** Domain-specific models are a real trend, and React Native is a credible domain for one. The platform-specific constraints, library ecosystem quirks, and native module knowledge make general models noticeably weaker at React Native than at generic TypeScript or web React. If Callstack's training data quality is as careful as described, this could be worth testing on complex React Native problems.

**Link:** [Introducing Apex: A Fast, Specialized Model for React Native](https://76518bdd.click.convertkit-mail4.com/d0um55pwvdf0ho94lzxamhz9q3w07ilh037zx/58hvh8ug8gvx8gb7/aHR0cHM6Ly93d3cuY2FsbHN0YWNrLmNvbS9ibG9nL2ludHJvZHVjaW5nLWFwZXgtYS1mYXN0LXNwZWNpYWxpemVkLW1vZGVsLWZvci1yZWFjdC1uYXRpdmU=)

---

## shadcn/ui Registry Gets Composition and Validation Support

**TLDR:** The May 2026 shadcn/ui update adds `include` for composing large source registries from multiple `registry.json` files, and `shadcn registry validate` for checking source registries before publishing.

**Summary:** Registry authors managing large component collections have had to maintain one monolithic `registry.json` file or build their own tooling to split it up. The new `include` field changes that. You can now organize a source registry across multiple `registry.json` files in a directory structure that mirrors your component organization, then compose them from a root registry file using an `include` array.

When `shadcn build` runs, it resolves all included registries and writes a single flattened `registry.json` as output. Item file paths are preserved from the root registry, so a file declared in `components/ui/registry.json` ends up at `components/ui/button.tsx` in the built output. Included files are valid registry files and can omit the `name` and `homepage` fields, which only the root registry needs.

The `shadcn registry validate` command runs before building and checks everything: the root registry, included files, schema errors in items, duplicate item names, include rules, and local file path references. It reports all actionable errors in one pass, so you don't fix one issue and discover another on the next run.

For dynamic registry routes, the `shadcn/registry` package now exports `loadRegistry` and `loadRegistryItem` functions that you can use in Next.js API routes or similar server handlers to serve registry data dynamically.

**Key takeaways:**
- `include` in `registry.json` composes multiple registry files into one build output
- Included files can omit root-level metadata; only the root needs `name` and `homepage`
- `shadcn registry validate` checks all sources and reports all errors in one pass
- `loadRegistry` and `loadRegistryItem` support dynamic registry API routes

**Why do I care:** Registry-driven component distribution is becoming a standard pattern in the React ecosystem. The composition feature is the kind of structural improvement that makes large design systems maintainable. Validation before publish prevents broken registries from reaching consumers. Small improvements, but they address real friction for teams running sizeable component registries.

**Link:** [May 2026 - Registry Include and Validate](https://76518bdd.click.convertkit-mail4.com/d0um55pwvdf0ho94lzxamhz9q3w07ilh037zx/z2hgh7ueve466muz/aHR0cHM6Ly91aS5zaGFkY24uY29tL2RvY3MvY2hhbmdlbG9nLzIwMjYtMDUtcmVnaXN0cnktaW5jbHVkZQ==)
