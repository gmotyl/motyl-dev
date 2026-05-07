---
title: "TanStack Under Attack, RSC Rethought, and React Native Gets Serious About Performance"
excerpt: "This week covers a malicious npm brandsquat targeting TanStack, a thoughtful rethink of RSC ownership models, React Native animation deep dives, Node.js 26 landing with Temporal, and a Rust-powered TypeScript compiler that's already faster than tsgo."
publishedAt: "2026-05-06"
slug: "tanstack-attack-rsc-rethought-react-native-performance-node26"
hashtags: "#thisweekinreact #react #reactnative #typescript #nodejs #tanstack #expo #javascript #performance #security #ssr #tanstack-router #react-router #generated #en"
source_pattern: "This Week In React"
---

## Malicious npm Package Brand-Squats TanStack to Steal Environment Files

**TLDR:** An unscoped npm package called `tanstack` pushed four malicious versions that silently exfiltrated `.env` files from developers' machines at install time. The attacker had previously tried to extort TanStack's creator for $10,000, and this appears to be deliberate retaliation or escalation.

**Summary:** The Socket Research Team caught something genuinely nasty this week: an active supply-chain attack hiding behind the TanStack name. The unscoped `tanstack` package, which has absolutely no connection to the legitimate `@tanstack/*` organization, published versions 2.0.4 through 2.0.7 within a 27-minute window, each containing postinstall scripts designed to collect your `.env`, `.env.local`, and `.env.production` files and POST them to an attacker-controlled Svix endpoint.

What makes this particularly grim is the escalation pattern. Tanner Linsley, who created TanStack, confirmed that the maintainer of the unscoped package previously demanded $10,000 to transfer the name. When that didn't work, the maintainer apparently decided to weaponize the squatted package instead. The claim that it was all an accident from "random testing with an AI agent" is hard to take seriously given that four successive versions over 27 minutes all contained the same exfiltration infrastructure pointing to the same endpoint.

The technical approach was clever in a depressing way. The most aggressive version, 2.0.6, globbed the entire install root for any file matching `.env.*`, including production secrets. Later versions reverted to a narrower target but removed all logging, making detection harder. The malicious code disguised the exfiltration function as `sendReadme()` to look innocuous in a casual code review.

The bigger story here is one that plays out repeatedly: npm's namespace model creates a permanent brand-confusion attack surface. The legitimate TanStack libraries all live under `@tanstack/*` with the `@` scope, but nothing stops someone from registering `tanstack` unscoped and waiting for a typo or an AI agent to suggest the wrong package name.

**Key takeaways:**
- If `tanstack` (unscoped) appears anywhere in your `package.json`, `package-lock.json`, or `yarn.lock`, remove it immediately and rotate any secrets in `.env` files present during install.
- The legitimate TanStack libraries are all under the `@tanstack/*` scope, always with the `@` prefix.
- Socket's automated threat detection caught this, which is worth noting: static analysis of postinstall scripts works.

**Why do I care:** This is a supply chain attack that required zero vulnerability in any framework or build tool. It exploited human trust in a familiar name. The fact that npm still hasn't resolved a brand-squatting dispute despite legal filings and repeated requests tells you something important about how the ecosystem prioritizes these issues. As a senior developer, I'd be adding automated scanning for unscoped variants of my organization's commonly used scoped packages to my CI pipeline today.

**Link:** [Malicious npm Package Brand-Squats TanStack to Exfiltrate Environment Files](https://socket.dev/blog/tanstack-brandsquat-compromise)

---

## Who Owns the Tree? TanStack Start's RSC Model Is Different, On Purpose

**TLDR:** Tanner Linsley argues that RSC is a protocol, not an architecture, and that TanStack Start supports both server-owned and client-owned composition models. The piece is a thoughtful pushback against the assumption that "RSC support" means "Next.js-style server-first tree."

**Summary:** This is the kind of blog post I wish showed up more often in the React ecosystem: one that actually challenges a framing rather than just announcing a feature. Linsley's core argument is that when people say a framework "supports RSC," they usually mean one specific architecture where the server owns the component tree and `use client` marks the interactive islands. But RSC is actually a serialization protocol, and nothing in the protocol requires the server to own the root.

TanStack Start supports what Linsley calls Composite Components: server functions that return rendered React fragments as Flight data, which the client can then drop into a client-owned tree wherever it wants. Think of it as the inverse of the standard model. Instead of marking client components inside a server tree with `use client`, you fetch server-rendered output and slot it into a tree the client already owns. The practical example he gives is a dashboard that's almost entirely client-controlled, where one slow analytics chart benefits from server rendering. In the standard model, you'd have to invert the whole route to the server just for that one chart.

What I find genuinely interesting here is that Linsley traces this model back to the original RSC RFC, which described Client Components as already-rendered output from the server's perspective and mentioned granular refetching from multiple entry points. So this isn't TanStack inventing something foreign. It's TanStack taking the protocol seriously in a direction Next.js chose not to.

The section on caching is equally worth reading. Start deliberately doesn't ship a `use cache` directive because that directive assumes a framework-owned persistence layer, and Start is designed to run on Cloudflare, Netlify, Vercel, plain Node, Bun, and anywhere Nitro targets. A transparent approach using bytes you can cache at any layer you control is more honest than a magic directive that means something different on each host.

Does this mean Linsley is right that client-owned trees are strictly better? Not necessarily. For content-heavy sites where the server should own most of the UI, the standard model has real advantages. But the framing that there's one blessed way to use RSC has been getting too much air, and this post is a useful correction.

**Key takeaways:**
- RSC is a wire protocol for serializing React output, not a mandate that the server must own the component tree.
- TanStack Start's Composite Components let you embed server-rendered fragments inside client-owned trees, using TanStack Query as the fetch mechanism.
- The absence of a `use cache` directive in Start is a deliberate portability decision, not a missing feature.

**Why do I care:** The "RSC support" conversation in the ecosystem has been muddied by conflating Next.js's specific architectural choices with the protocol itself. If you're building something where the client owns most of the interaction surface, having a clear primitive for fetching and dropping in server-rendered fragments is genuinely useful. I'd be skeptical of any team adopting a server-first architecture just because that's what the framework documentation defaults to.

**Link:** [Who Owns the Tree? RSC as a Protocol, Not an Architecture](https://tanstack.com/blog/who-owns-the-tree)

---

## Introducing TanStack Form: A Deep Dive Into the API

**TLDR:** Frontend Masters published a thorough walkthrough of TanStack Form, covering field management, validation timing, array fields, cross-field reactivity, and the composition patterns that make large forms manageable. It's a good reference if you've been curious about the library but not ready to dive into the docs directly.

**Summary:** Forms in React are one of those problems that always looks simpler than it is. You start with some state, add validation, realize you need to handle touched and dirty states separately, discover that splitting the form into multiple components means passing state around, and eventually end up with something fragile. TanStack Form's answer is a strongly-typed, headless form library that takes all those edge cases seriously from the start.

The API centers on a `useForm` hook that takes your default values and an `onSubmit` handler. Because the shape of `defaultValues` becomes the type of everything downstream, the `name` prop on each `Field` component is statically checked and autocompleted. That's the kind of thing that sounds like a small convenience until you're three months into a project and TypeScript catches a rename that broke six field references.

The validation model is worth understanding. You can attach validators to `onSubmit`, `onChange`, or `onBlur` events per field, and the field's `state.meta` object tracks `isPristine`, `isTouched`, `isDirty`, and `isValid` separately. This lets you show errors only after a submit attempt, clear them as the user types, or show a "pristine" indicator on untouched fields, all without writing that logic yourself.

For array fields, the library provides `pushValue` and `removeValue` methods, and the nested field names like `metadata[0].name` are fully type-checked against the original shape. For cross-field reactivity, you have `useStore` for subscribing to slices of form state outside a field's render prop, or the `Subscribe` component for doing the same thing declaratively inside JSX.

The composition story is the most practical part. Rather than exporting generic field types, TanStack Form lets you create a `useAppForm` hook via `createFormHook` that registers your custom components. Those components call `useFieldContext` internally, so the field prop is implicit. The result is that you can write `<form.AppField name="email" children={field => <field.EmailInput />}` and your custom component has full typed access to the field without receiving it as a prop.

**Key takeaways:**
- TanStack Form is headless: it manages state and validation but renders nothing on its own.
- Field names are type-checked based on `defaultValues`, including nested paths and array entries.
- The `createFormHook` pattern lets you register custom field components that access field context implicitly, making composition much cleaner.

**Why do I care:** I've seen teams build form abstractions that are harder to maintain than the forms they wrap. TanStack Form's approach of encoding the form's data structure in the type system and providing explicit validation timing hooks covers most real-world cases without requiring a custom abstraction on top. The render-prop pattern for headless fields feels slightly verbose, but the `useFieldContext` composition pattern largely addresses that.

**Link:** [Introducing TanStack Form](https://frontendmasters.com/blog/introducing-tanstack-form/)

---

## Time to Yield: A Brutal SSG Benchmark That Exposes Next.js's Static Export Ceiling

**TLDR:** A developer built a benchmark comparing five SSG frameworks across up to 500,000 static pages and found that Next.js crashes with a stack overflow at 200,000 pages, while a streaming-path approach completes 500,000 pages in 155 seconds. The decisive variable is whether your path source returns an array or yields from an async generator.

**Summary:** I love a good benchmark that's honest about its limitations and still has a genuinely important finding. This one does both. The author, who wrote `@lazarv/react-server`, discloses that upfront and still produces a comparison that holds up to scrutiny because the methodology is sound: same content, idiomatic config per framework, pure static HTML output required, and failed builds reported as failed rather than quietly dropped.

The main finding is architectural, not incremental. Every framework except react-server asks you for a list of paths as an array. The runtime then materializes that entire array in memory before any rendering begins, which means the first page of HTML can't be written until the last entry in the path list has been allocated. At 1,000 pages, this is invisible. At 100,000 pages, Next.js takes four and a half minutes and emits 1.84 gigabytes of output. At 200,000 pages, it crashes with `RangeError: Maximum call stack size exceeded` because something in its page-data collection walks the params array with recursion depth proportional to array length.

react-server's path source is an async generator. The router pulls one descriptor at a time when a worker is free. The path list is never in memory all at once. At 500,000 pages, it finishes in 155 seconds with the first HTML on disk in under 3 seconds.

The response to this finding will inevitably be "just use ISR." The author addresses that directly and correctly. ISR isn't a static site. It's a serverless function that generates HTML on request and caches the result. If your deployment target is a CDN that serves files, GitHub Pages, S3, or any static-file host, ISR isn't available. It's a different product answering a different question, and substituting it when you actually need static generation is a deployment model swap, not a performance tuning.

The Astro result is worth noting too. Astro finishes 100,000 pages in 22.6 seconds and is the fastest overall. But Astro isn't running React. It's using its own template language with a fast static optimizer. The real headline is that react-server, running actual React Server Components end to end, finishes in 26 seconds, within 15% of a non-React static generator.

**Key takeaways:**
- Next.js's static export crashes with a stack overflow above ~150,000 pages due to recursive traversal of the params array. This is not fixable with memory flags.
- The difference between fast and slow SSG pipelines is whether the path source returns (array) or yields (async generator).
- ISR is not a substitute for static generation when your hosting environment doesn't support a Node runtime.

**Why do I care:** Most teams never hit this ceiling, but the benchmark exposes something important about how much performance is determined by API design choices made at the framework level, not by optimization passes. If you're building anything that could grow into a large static catalog, you should know your framework's ceiling before you hit it in production. The fact that a RangeError from an array recursion depth is the failure mode, not a timeout or an OOM, is a design issue worth tracking.

**Link:** [Time to Yield](https://dev.to/lazarv/time-to-yield-20m8)

---

## Next.js Link as a Button: The Accessibility-Correct Solution

**TLDR:** When you want a third-party button component to trigger Next.js router navigation instead of a full page reload, the combination of `passHref` and `legacyBehavior` on the Link component is the right answer. Using `onClick` with `router.push` renders a `button` element where a link semantics are needed.

**Summary:** This is a short, practical post that solves a real problem cleanly. The scenario is common: you have a design system or UI library component, in this case Ant Design's Button, that can render as an `<a>` element when given an `href` prop. You want router-driven navigation, not a full page reload. What's the right approach?

The imperative approach using `useRouter` and `onClick` works visually but fails on semantics. You end up with a `<button>` element that navigates to another page, which is the wrong element for that action. Screen readers announce it as a button, keyboard navigation behaves differently, and users who open links in new tabs can't do so. These aren't theoretical concerns.

The correct answer turns out to be `legacyBehavior` and `passHref` used together on the Next.js Link component. `legacyBehavior` makes Link clone its child element instead of rendering its own `<a>`. `passHref` assigns the resolved `href` to that child. Together, they let Ant's Button component render an actual `<a>` element with Next's routing logic attached. The author wraps this into a `RouterButton` component with typed props that split cleanly between Link props and Button props.

It's a small thing, but the number of apps I've seen with links implemented as buttons is high enough that this deserves a clear write-up.

**Key takeaways:**
- Using `onClick={() => router.push(...)}` on a button component is semantically incorrect for navigation; use `<a>` elements for links.
- Combining `passHref` and `legacyBehavior` on Next.js's Link component lets third-party components render their own anchor element with router navigation.
- Wrapping this in a typed `RouterButton` component keeps the calling code clean.

**Why do I care:** Accessibility regressions that stem from reaching for the convenient API instead of the correct one are frustrating because they're easy to miss in code review. Knowing this combination exists means you don't have to choose between router navigation and semantic HTML.

**Link:** [Next.js Link as a Button](https://kittygiraudel.com/2026/05/02/nextjs-link-as-a-button/)

---

## Remix 3 Beta Preview: A Full-Stack Rethink With Frames, Unbundling, and a New Component Model

**TLDR:** Remix 3 is in beta preview and it's a significant departure. The team has moved toward building the full stack, including routing, sessions, auth, uploads, and UI, as composable packages under one umbrella. The component model is explicitly procedural, and assets are served without a traditional bundler dependency.

**Summary:** The Remix 3 beta is out, and it's clear the team has been doing serious thinking rather than just iterating on the existing model. The pitch is straightforward: most frameworks leave too many decisions to you before you can actually build. Remix 3 wants you to install one thing and start building, with routing, sessions, auth, forms, uploads, and UI available as composable packages that work together by default.

The most interesting concept is Frames. A frame is server-rendered UI with a `src`, similar to an iframe in concept but integrated with the Remix router. The client can load, navigate, or reload a frame independently while the server keeps rendering HTML. The result is server-client communication that uses URLs, requests, responses, and markup rather than a separate RPC layer. You can see this in the bookstore demo, where the cart updates independently from the rest of the page.

The component model is also changed. Instead of hooks and state management conventions, Remix 3 components use plain JavaScript variables for state and explicit update calls. Event handling is composed directly on elements using a `mix` prop. The example in the post shows a copy-to-clipboard button with state, async behavior, and abort handling all visible in about 30 lines of straightforward code. I have mixed feelings about this. The explicitness is nice. The departure from React's model is significant enough that I'd want to understand the migration story before committing to it.

The "unbundling" approach to assets is notable. Remix 3 doesn't want your app model to depend on what the bundler can understand. Routes go in one place, controllers return responses, middleware owns the request lifecycle, and tables handle data. The claim is that these are durable concepts that are also easier for AI coding agents to work with. That last bit feels like a sycophantic feature pitch, but the underlying point about clear shapes being good for both humans and tools is real.

**Key takeaways:**
- Remix 3 is a significant redesign, not an incremental update. The component model, asset serving, and full-stack scope have all changed.
- Frames are a new primitive: server-rendered UI with a URL that the client can navigate and reload independently.
- The beta is available via `npx remix@next new my-remix-app`, but it's explicitly pre-production.

**Why do I care:** Remix has always had interesting ideas about web fundamentals, and this release doubles down on that instinct. Whether the procedural component model and unbundled asset serving turn out to be better or just different will depend on how the ecosystem adopts it. I'd experiment with it on a side project before drawing conclusions, but the Frame primitive alone is worth understanding.

**Link:** [Remix 3 Beta Preview](https://remix.run/blog/remix-3-beta-preview)

---

## shadcn/ui Gets Package Import Aliases and Portable Registry Targets

**TLDR:** shadcn CLI 4.7.0 adds support for `package.json#imports` as an alias source, replacing the `tsconfig.json` `compilerOptions.paths` dependency. Registry items can now also use target aliases to install files into user-configured directories.

**Summary:** This is a focused quality-of-life improvement that matters most for monorepos and teams who've been fighting with TypeScript path aliases in their component setup. The shadcn CLI now reads `package.json#imports` for installing components and resolving third-party registries. This means you can define `#components/*` as an import alias in `package.json` and reference it in `components.json` without needing matching entries in `tsconfig.json`.

The `package.json#imports` field is a Node.js standard feature that was stabilized in Node 12, so this isn't adding new infrastructure. It's using something that already exists. In a monorepo setup, app-local files can use package imports while shared UI files are imported from workspace package exports, and the shadcn CLI handles both.

The target aliases feature solves a related problem on the registry side. A registry item can now specify a `files[].target` path using shadcn's configured directory aliases rather than hardcoded paths. This makes registry items portable across projects with different directory structures.

Neither change is dramatic, but the compound effect of making the CLI less opinionated about your project layout is valuable. The more the tooling adapts to your structure rather than imposing its own, the easier it is to adopt incrementally.

**Key takeaways:**
- shadcn CLI 4.7.0 supports `package.json#imports` for alias resolution, reducing the `tsconfig.json` path dependency.
- Registry items can use target aliases like `@ui/ai/prompt-input.tsx` to install into user-configured directories.
- Both features improve monorepo compatibility.

**Why do I care:** The friction of getting shadcn set up correctly in a monorepo has been a common pain point. Using `package.json#imports` is the right call, both because it's a standard and because it doesn't force a `tsconfig.json` coupling that breaks in environments that don't process TypeScript paths the same way.

**Link:** [May 2026 - Package Imports and Target Aliases](https://ui.shadcn.com/docs/changelog/2026-05-package-imports-target-aliases)

---

## Expo Go and the App Store: What's Actually Happening in May 2026

**TLDR:** Expo Go for SDK 55 is still pending Apple App Store approval as of May 4th. The team is redirecting developers toward development builds and introducing `eas go` for creating personal Expo Go builds through your own Apple Developer account.

**Summary:** If you've been wondering why the latest Expo Go hasn't appeared on the App Store, the answer is Apple's review process. SDK 55 has been waiting since before May 4th with no timeline provided. SDK 54 continues to work, but the situation has prompted Expo to articulate something they've probably wanted to say for a while: Expo Go is an educational tool for beginners, and if you're doing serious development, you should be using a development build.

The distinction matters. Expo Go runs inside a fixed native runtime that Expo controls. A development build is your own app with your own native dependencies and configuration. The development experience is similar, but the build has no artificial constraints on which native modules you can use.

The path forward Expo is offering has two parts. First, `eas go` creates your own build of Expo Go through your Apple Developer account, uploaded to TestFlight. This requires an Apple Developer Program membership but solves the App Store dependency. Second, starting with SDK 56, `create-expo-app` will ask whether you want to target the App Store version of Expo Go or the latest SDK, making the distinction visible at project creation time.

I think this is the right direction. Expo Go has always been a slightly awkward hybrid of "quick start tool" and "development environment," and the App Store dependency creates a fragility that doesn't exist with development builds. The sooner teams graduate from Expo Go to development builds, the more predictable their environment becomes.

**Key takeaways:**
- Expo Go SDK 55 is pending App Store approval with no timeline. SDK 54 remains available.
- `eas go` lets you create your own Expo Go build via TestFlight using your Apple Developer account.
- SDK 56 onwards, `create-expo-app` will prompt you to choose between App Store Expo Go compatibility or the latest SDK.

**Why do I care:** If your team is still using Expo Go for anything beyond initial experimentation, this is a good moment to migrate to development builds. The tooling has matured to the point where the setup cost is low and the reliability gain is significant. Don't build a dependency on a binary you don't control.

**Link:** [Expo Go and the App Store in May 2026](https://expo.dev/changelog/expo-go-and-app-store-may-2026)

---

## Expo Gradle Cache Cuts Android Build Times by 50%

**TLDR:** EAS now supports Gradle build caching for Android, using task output hashing to skip recompilation when inputs haven't changed. The team reports around a 50% reduction in build times, with the cache keyed to your package manager lock file.

**Summary:** Build times on Android have been a chronic pain point for React Native teams, particularly for projects with many native modules. Each native module typically requires its own Gradle tasks, and without caching those tasks re-run from scratch on every build even when nothing has changed.

The EAS Gradle cache stores task outputs and reuses them when inputs are identical. Cached tasks appear with a `FROM CACHE` annotation in the `Run Gradle` step of your build logs. The cache key is derived from a hash of your package manager lock file, so it's automatically invalidated when dependencies change.

Enabling it is straightforward: set the `EAS_GRADLE_CACHE` environment variable to `1` either in your EAS account environment variables or in `eas.json`. The first build after enabling it generates the cache. Subsequent builds restore from it.

Combined with the compiler cache using `ccache` for C/C++ recompilation that Expo already ships, these caching layers can meaningfully reduce the time between code change and installable build. A 50% reduction on a 10-minute build is 5 minutes back per developer per build. That compounds quickly across a team.

**Key takeaways:**
- Enable with `EAS_GRADLE_CACHE=1` in your environment variables or `eas.json`.
- Cache is keyed to your lock file hash, so dependency changes automatically invalidate it.
- Combined with the existing C/C++ compiler cache, Android build times can drop substantially.

**Why do I care:** Build time is developer time. Any reduction that's opt-in and has zero risk of producing incorrect builds is worth enabling immediately. The fact that this is a server-side cache on EAS rather than a local cache means the benefit accumulates across the team and across CI runs, not just on one machine.

**Link:** [Gradle Cache for Android Builds](https://expo.dev/changelog/gradle-cache)

---

## Making JSI 30x Faster: Data Shape Is More Important Than Algorithms

**TLDR:** Margelo's part 2 JSI performance post shows that choosing ArrayBuffer over an array of objects for numeric data produces a 30x speedup in benchmarks. The decisive factor is reducing JSI boundary crossings and GC pressure, not algorithmic cleverness.

**Summary:** This is one of those posts that changes how you think about a problem category. The Margelo team is benchmarking JSI performance at the data representation level, and the numbers are stark. A function that returns 50 points as an array of `{x, y}` objects takes 1036ms across 100,000 calls. Return a flat array of numbers and that drops to 311ms. Return an ArrayBuffer backed by a `MutableBuffer` with zero copies and it drops to 34ms. That's roughly 30x faster than the naive approach, with no change to the algorithm.

The reason is boundary crossings. Every `jsi::Object` is a separate allocation on the JS heap. Every `setProperty` call crosses into the JSI layer. With 50 points and an array of objects approach, each function call involves 100 property writes and 50 object allocations that the garbage collector has to track. The ArrayBuffer approach hands JavaScript a pointer to native memory with no per-element JSI calls and no GC pressure from individual values.

The `MutableBuffer` contract is clean: you subclass it, back it with whatever storage you want (a `std::vector`, a `malloc`, a memory-mapped file), and JSI exposes that memory as an ArrayBuffer in JavaScript with zero intermediate copies. The key detail is that the vector's data pointer is returned directly, so the data is never copied.

Beyond data shape, the post also covers API shape (pass numeric indices instead of strings to avoid heap allocation on type comparisons) and string building (a stack char buffer is 2.7x faster than `std::format` on hot paths). The pattern across all three sections is the same: the bottleneck is almost never the algorithm, it's the unnecessary allocations and boundary crossings that accumulate.

**Key takeaways:**
- Prefer ArrayBuffer backed by MutableBuffer for numeric data crossing from C++ to JS. It's 30x faster than an array of objects.
- Pass numeric indices instead of string types to native functions on hot paths: string conversion allocates on every call.
- On string-building hot paths, a stack char buffer with known max size outperforms `std::format` by 2.7x.

**Why do I care:** If you're writing or maintaining a JSI module, these are not micro-optimizations. A 30x difference in data transfer speed can be the difference between a feature that stays within the frame budget and one that drops frames. Understanding which side of the JSI boundary owns memory and how GC pressure accumulates should be part of every JSI module review.

**Link:** [Part 2: Making JSI Faster with more Efficient Data Structures](https://blog.margelo.com/make-jsi-run-faster-2)

---

## How react-native-ease Runs Animations with Zero JavaScript per Frame

**TLDR:** react-native-ease hands animation control entirely to the native side after the initial prop change. On iOS it uses Core Animation key-path animations; on Android it uses ObjectAnimator and SpringAnimation. JavaScript is not involved for individual frames.

**Summary:** Most React Native animation libraries keep JavaScript in the loop. A JS timer drives a value, that value crosses the JSI boundary every frame, and the native view updates. It works until the JS thread gets busy, at which point your animation stutters. react-native-ease takes a different approach: once you describe a prop change, JavaScript is done until the next interaction.

The architecture is elegant. The EaseView component's only job in JavaScript is flattening your structured `animate` and `transition` props into scalar native props and a bitmask integer that flags which properties are being animated. Native checks the bitmask before touching any property, so properties not in the `animate` object are left alone and React Native's normal style system handles them. This lets both systems coexist on the same view without conflict.

On iOS, the native side uses Core Animation key-path animations (`transform.rotation.z`, `transform.scale.x`, etc.) rather than combining transforms into a single matrix. This is a deliberate choice: matrix interpolation is ambiguous for certain transforms, and individual key-paths animate as plain scalars with no decomposition ambiguity. The interruption handling reads from the presentation layer (the current visual position) rather than the model layer (the final target), so a new animation always starts from where the view actually appears, making interruptions seamless.

On Android, the physics matching is careful. iOS's CASpringAnimation takes raw physical parameters (damping, stiffness, mass). Android's SpringForce takes a dimensionless damping ratio. The conversion formula `dampingRatio = damping / (2 * sqrt(stiffness * mass))` comes from classical harmonic oscillator mechanics, and using it means the same spring parameters produce visually identical behavior on both platforms.

The tradeoff is a fixed set of animatable properties. You can only animate what the native layer understands natively. For opacity, transform, color, and border radius, that covers the majority of animation use cases.

**Key takeaways:**
- react-native-ease delegates animation control to Core Animation (iOS) and ObjectAnimator/SpringAnimation (Android) after the initial prop change. No JS loop per frame.
- A bitmask prop lets native know which properties are actively animated, allowing the two systems to share a view without conflict.
- Individual transform key-paths avoid the matrix decomposition ambiguity that causes rotation and scale animations to misbehave when combined.

**Why do I care:** The JS-thread independence of this approach is the right model for any animation that needs to stay smooth under load. Reanimated worklets solve the same problem differently (running on a separate JS thread via JSI). react-native-ease goes further by delegating to platform APIs that were designed specifically for this job. The tradeoff of a fixed property set is real but acceptable for the common cases.

**Link:** [How react-native-ease Runs Animations with No JavaScript Loop](https://www.peterp.me/articles/how-react-native-ease-runs-animations-with-no-javascript-loop/)

---

## Building Custom Screen Transitions in React Navigation with navigation.zoom()

**TLDR:** react-native-screen-transitions v3.4 ships a `navigation.zoom()` helper that recreates iOS's bounds-driven navigation zoom transition in pure JavaScript, using component measurements and Reanimated worklets.

**Summary:** Screen transitions are one of those places where React Native apps often feel slightly off compared to their native counterparts. The native stack gives you a few preset animations. If you need anything custom, you're usually reaching for complex Reanimated code that's hard to maintain. react-native-screen-transitions is trying to change that.

The library ships a `createBlankStackNavigator` that comes with no built-in animations. You define every transition yourself via `screenStyleInterpolator`, a worklet function that receives progress values and screen dimensions and returns animated styles. The iOS card stack example in the post shows how a single `progress` value from 0 to 2 can describe both sides of a transition: 0 to 1 brings the incoming screen in from the right, and 1 to 2 shifts the previous screen slightly left, all with device corner radius rounding that clears once the screen settles.

The more interesting feature is `navigation.zoom()`, which measures a source element on one screen and an equivalent element on the destination screen using the `Bounds` API, then animates between them. This is not a traditional shared-element transition. It's a bounds-driven animation that knows where elements actually sit on screen. For gallery-style navigation where you open an image from a grid, the system can track which image is currently visible and return to the right thumbnail even if the user swipes to a different image before dismissing.

The `gestureDrivesProgress: false` option for the zoom transition is a subtle but important detail. It means the dismiss gesture doesn't directly scrub the transition progress the way a normal interactive pop would. The zoom helper stays in control of the animation curve, which is what makes the return feel natural rather than like you're dragging a frame.

**Key takeaways:**
- `createBlankStackNavigator` gives you a navigator with no default animations, letting you define every transition from scratch via worklets.
- `navigation.zoom()` implements a bounds-driven zoom transition that measures source and destination elements and animates between their measured positions.
- Boundary groups let you track the active item in gallery-style navigation, so the return transition goes back to the image the user is actually viewing.

**Why do I care:** Good transitions make apps feel intentional. The tooling for building them in React Native has historically required either accepting the presets or writing substantial Reanimated code. This library sits at a useful level of abstraction: it gives you the measurement and interpolation primitives without hiding how they work.

**Link:** [Building Custom Transitions with react-native-screen-transitions](https://reactnavigation.org/blog/2026/04/27/building-custom-screen-transitions/)

---

## React Native at Scale: Production Lessons from Zalando and Others

**TLDR:** Four talks from the React Universe Meetup x Zalando cover measuring performance in brownfield migrations, managing video feeds, using React Native to access HealthKit from a web-first product, and running on-device LLMs with wildly variable initialization times across Android hardware.

**Summary:** Production React Native war stories are more useful than framework overviews, and this post delivers four of them. The Zalando brownfield performance talk is the most transferable. When you're migrating a screen from native to React Native, TTI (time to interactive) becomes less useful because the delivery model changes. Zalando replaced a single large GraphQL request with a streaming, module-based model where modules resolve sequentially. The screen that users see is superficially the same, but the render path is completely different. Their answer was "Meaningful Render": each screen identifies which module is the most important, and performance measurement completes when that module's `onLayout` fires, not when the whole screen finishes.

The video feed work is a good example of correct sequencing. The team tried the usual profiling approaches first and got modest gains. Then they tried lazy player creation, only instantiating a native player when a tile reaches 75% visibility. Jank dropped from 25% to 3%. The cost was that time to first frame became 2.5x slower. Then they attacked that separately with MP4 variants for quick loading, request prioritization, player pooling to reuse ExoPlayer instances, and pre-warming based on inferred user intent. The lesson isn't the specific techniques, it's the order: stabilize scroll performance before optimizing autoplay, not both at once.

The on-device LLM section is worth reading carefully if you're exploring that space. The same model initialized in 1 second on some Android devices and 47 seconds on others, not because of the model itself but because of a memory layout that certain GPUs handled poorly through OpenCL. Switching to a transposed weights matrix format fixed it. The abstraction layer that's supposed to smooth over hardware differences can also make hardware-specific issues harder to trace.

**Key takeaways:**
- In brownfield migrations, measure the handoff from native navigation trigger to React Native surface mount, not only what happens inside the React Native screen.
- For video feeds: fix scroll jank first, then optimize time to first frame separately.
- On-device LLM initialization time can vary 47x across Android devices due to memory layout mismatches with specific GPU OpenCL kernels, not model size.

**Why do I care:** These are the kinds of issues that don't show up in tutorials and aren't covered in framework docs. The Meaningful Render metric for brownfield migrations is something I'd want to implement immediately on any migration project. The on-device LLM hardware variability point is a real warning: don't benchmark on your one test device and assume it generalizes.

**Link:** [React Native Production Lessons from React Universe Meetup x Zalando](https://www.callstack.com/blog/react-native-production-lessons-from-react-universe-meetup-x-zalando)

---

## Node.js 26 Ships with Temporal API, V8 14.6, and a New Release Schedule

**TLDR:** Node.js 26 is the new Current release, bringing the Temporal date/time API enabled by default, V8 14.6 with new iterator and map primitives, and a major announcement: starting with Node.js 27, the project moves to one major release per year with every release becoming LTS.

**Summary:** Node.js 26 landed on May 5th and it's a meaningful release. The headline feature is the Temporal API, now enabled by default. Temporal is the long-overdue replacement for the `Date` object, providing distinct types for date-only, time-only, datetime, time zone, duration, and instant values. If you've ever been burned by `Date`'s timezone ambiguity or its mutable design, Temporal is what you've been waiting for.

V8 14.6 brings two useful JavaScript features. `[Weak]Map.prototype.getOrInsert()` and `getOrInsertComputed()` address the common pattern of checking if a map has a key and setting a default if not, which currently requires a conditional and a set call. `Iterator.concat()` lets you sequence multiple iterators without materializing intermediate arrays, which pairs well with the streaming architecture discussions elsewhere in this newsletter.

The release schedule change is arguably the bigger news for teams doing long-term planning. Starting with Node.js 27 (releasing in April 2027), the project moves from two major releases per year to one. Every release will become LTS, eliminating the odd/even distinction that confused newcomers and that most organizations ignored anyway by only upgrading to LTS versions. The new Alpha channel fills the early-testing role that odd-numbered releases served, but with a quality gate: signed releases tested through CITGM rather than nightly builds.

The total support window stays at 36 months, and LTS duration stays at 30 months. If you already only upgrade on LTS versions, your actual behavior barely changes. But library authors should note the recommendation to integrate Alpha releases into CI as early as possible, since that's where breaking changes will land going forward.

**Key takeaways:**
- Node.js 26 ships with Temporal API enabled by default, V8 14.6, and Undici 8.
- Starting with Node.js 27, one major release per year with every release becoming LTS. No more odd/even skip-release pattern.
- An Alpha channel replaces odd-numbered releases for early testing of breaking changes.

**Why do I care:** Temporal has been in proposal status long enough that most JavaScript developers have a polyfill or a date library in their projects. Having it in Node.js by default changes the calculus on whether to use the native API or continue depending on a third-party library. I'd start evaluating migration paths now, particularly for server-side code where the timezone handling improvements matter most.

**Link:** [Node.js 26.0.0](https://nodejs.org/en/blog/release/v26.0.0)

---

## tsz: A TypeScript Compiler in Rust That's Already Faster Than tsgo

**TLDR:** tsz is a TypeScript type checker and language service written in Rust, targeting TypeScript 6.0.3, and currently benchmarking 1.73x faster than tsgo across 63 test cases. It claims 99% conformance on TypeScript's own test suite and 100% language service conformance.

**Summary:** The TypeScript compiler speed race is getting interesting. Microsoft's tsgo is the official Go-based rewrite of the TypeScript compiler, aiming for significant speed improvements over the existing tsc. Now tsz enters the race, a Rust-based implementation written as a drop-in replacement, and in early benchmarks it's already 1.73x faster than tsgo on a sum of 63 successful test cases.

The conformance numbers are what matter for a drop-in replacement claim: 99% on TypeScript's diagnostics test suite, 93.6% on JavaScript emit, 82% on declaration emit, and 100% on language service behavior. The declaration emit gap is the most notable. If you're building a library that relies on TypeScript to generate `.d.ts` files, 82% conformance means there are cases where tsz's output differs from tsc's. That's a real concern for library authors.

The project is described as "nearly complete" with remaining work focused on performance tuning and LSP (Language Server Protocol) support in WebAssembly. The WASM target is significant because it would enable tsz to run in editors and in browser-based tooling without a native binary.

I'm cautiously optimistic but want to see the declaration emit gap close before recommending this for anything serious. A TypeScript checker that's faster but produces different `.d.ts` output for edge cases is not a drop-in replacement yet. That said, 1,011,850 lines of Rust across 14 crates is not a toy project, and the trajectory is worth watching.

**Key takeaways:**
- tsz is 1.73x faster than tsgo in current benchmarks, built in Rust with 99% test suite conformance.
- Declaration emit is at 82% conformance, which is a gap for library authors who depend on TypeScript's `.d.ts` generation.
- Language service conformance is 100%, which is the most important metric for editor integration.

**Why do I care:** TypeScript compilation speed directly affects developer feedback loops. If tsz can achieve full conformance while maintaining its speed advantage, it would be the most impactful toolchain improvement for TypeScript developers since SWC became mainstream. The declaration emit gap is a real caveat, but the project is moving fast.

**Link:** [tsz - A TypeScript Compiler in Rust](https://tsz.dev/)

---

## Why "Trusted Publishing" Can't Protect You When the Maintainer Is Compromised

**TLDR:** The Axios supply chain attack exploited a social engineering compromise of the maintainer's live browser session, not a stolen password or API key. Provenance attestation would have signed the malicious package as legitimate because the attacker was operating as the maintainer. This is a different threat model than trusted publishing addresses.

**Summary:** Matteo Collina's post is one of the clearest articulations of a supply chain security gap I've read this year. The core observation: npm's trusted publishing via Sigstore and OIDC answers "did this come from who it says it came from?" It cannot answer "was the person who published this in control of their own machine?"

The Axios attack exploited exactly that gap. The attacker used a social engineering campaign involving a fake Slack workspace and a request to install "review software." Jason Saayman installed it, the malware captured his active browser sessions including cookies and tokens, and the attacker used those sessions to publish a malicious version. npm saw a valid publish from the legitimate maintainer's authenticated account. Provenance attestation, if Axios had used it, would have signed the malicious package as coming from the real maintainer, because from npm's perspective, it did.

Collina discloses that the same campaign targeted him and many other high-impact Node.js maintainers. The list he provides reads like a conference speaker lineup. This wasn't random. These were targeted attacks on the specific people who maintain packages with hundreds of millions of weekly downloads.

The remedies Collina proposes are practical and worth reading in full. A minimum release age window (npm 11.11.0 already supports `minimumReleaseAge`) gives automated scanners time to catch malicious versions before they reach production. Machine compromise detection, flagging publishes from new devices or unusual sessions, is standard in enterprise fraud detection and should apply here. Dual-control publishing for high-impact packages would have stopped the Axios incident: one maintainer cannot publish alone, a second must approve via signed attestation.

**Key takeaways:**
- Trusted publishing and provenance attestation verify identity, not whether that identity is under the maintainer's control. They don't help against social engineering attacks.
- The `minimumReleaseAge` option in npm lets organizations configure a waiting period before new versions are installable, giving scanners time to catch malicious releases.
- Pinning dependencies to commit hashes rather than floating tags and using `minimumReleaseAge` would have protected OpenAI from the Axios compromise.

**Why do I care:** Every project I've worked on has transitive dependencies on packages maintained by one or two people. The assumption that "this was published by the right person" is equivalent to "this is safe" is broken. The immediate actionable thing here is checking your CI for floating version dependencies on high-impact packages and adding `minimumReleaseAge` to your npm configuration.

**Link:** [Why "Trusted Publishing" Can't Save Us from Social Engineering](https://adventures.nodeland.dev/archive/why-trusted-publishing-can-t-save-us/)
