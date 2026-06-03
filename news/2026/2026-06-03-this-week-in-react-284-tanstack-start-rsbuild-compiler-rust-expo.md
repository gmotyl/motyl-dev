---
title: "This Week In React #284: TanStack Start Goes Rsbuild, the Compiler Learns Rust, and Expo Says Goodbye to Evan Bacon"
excerpt: "TanStack Start picks up Rsbuild, React Compiler gets a Rust port, and a deep tour through performance rewrites, Node stream backpressure, and the React Native runtime split."
publishedAt: "2026-06-03"
slug: "this-week-in-react-284-tanstack-start-rsbuild-compiler-rust-expo"
hashtags: "#thisweekinreact #react #reactnative #tanstack-router #react-compiler #rsbuild #performance #nodejs #generated #en"
source_pattern: "This Week In React"
---

## TanStack Start Adds First-Class Rsbuild Support

**TLDR:** TanStack Start now builds on Rsbuild in addition to Vite, so teams who live in the Webpack and Rspack world get a native integration instead of a fork in the road. The work also sharpened the boundary between Start's shared build core and the tool-specific adapters.

**Summary:** TanStack keeps shipping in a way that quietly tells you something about how they think. Start began life on Vite, and Vite is still there, but as of June 2nd you can run the exact same Start app on Rsbuild, which is built on top of Rspack. The pitch is straightforward. Some teams prefer Vite, some prefer Rspack because it feels like home after years of Webpack, or because the rest of their infrastructure already speaks that language. The new adapter makes the choice explicit rather than forcing a migration of both framework and build tool at the same time.

What I find more interesting than the feature itself is the design lesson the team called out. The first adapter proves a thing can work. The second adapter shows you which parts actually belong in the core. They went through this once already at the UI framework layer, where adding Solid alongside React exposed all the quiet React assumptions baked into the shared code. Adding Rsbuild did the same thing at the build layer, pushing Vite-specific logic out of the core and into a proper Vite adapter sitting next to the new Rsbuild one. That is the kind of refactoring you only get from being forced to support a genuinely different second implementation.

The practical payoff is for migration. One large company is already using the adapter to move several apps off a Webpack setup and onto Start running on Rsbuild, and they get the full feature set on the way: Server Functions, SSR and streaming SSR, hot module replacement, import protection, and React Server Components for React apps. React and Solid are both supported today, and because the work lives at the shared build layer, future framework adapters inherit the same path.

**Key takeaways:**
- TanStack Start now supports Rsbuild (Rspack-based) alongside Vite through its plugin system.
- The full Start feature set is available on Rsbuild, including Server Functions, streaming SSR, HMR, and RSC.
- Adding a second build adapter forced a cleaner separation between Start's shared build core and tool-specific adapters.

**Why do I care:** If you have a big Webpack codebase you have been afraid to touch, this lowers the activation energy considerably. You can adopt Start's routing and server functions without throwing out the build pipeline your CI, your team, and your muscle memory all depend on. I would not migrate a working Vite app just to get here, but for the Webpack shops eyeing a modern full-stack React story, removing the "change everything at once" tax is the difference between a project that gets approved and one that stays a wishlist item.

**Link:** [TanStack Start Adds First-Class Rsbuild Support](https://tanstack.com/blog/start-adds-rsbuild-support)

## The Conductor Rewrite: What They Changed to Make It Fast

**TLDR:** A teardown of how the Conductor desktop app got roughly twice as fast, mostly by swapping React Router for TanStack Router to kill cascading re-renders, virtualizing chat with react-virtuoso, and moving agent processes onto Bun. The recurring theme is that the bottleneck never disappears, it just moves.

**Summary:** Conductor is a local-first React app wrapped in Tauri, running Claude Code agents as child processes. The stack did not change much in the rewrite. The discipline did. Because everything runs locally with SQLite as the source of truth, the network bottleneck was already gone, which meant every dropped frame and janky scroll became the slowest thing the user could feel. The friction moved up into React itself.

The single biggest win came from migrating off React Router and onto TanStack Router. Conductor keeps several heavy panes mounted at once: sidebar, nav, chat, terminal, editor. With React Router, every navigation produced fresh references for params and search, so every component reading them re-rendered even when nothing meaningful had changed, and those re-renders cascaded through the whole app. You can paper over that with useMemo in fifty places, and anyone who has tried knows how that ends. TanStack Router's structural sharing hands back the same reference unless a value actually changes, so navigating around no longer triggers a full re-render. That one change made creating tabs, switching workspaces, and rendering files about fifty percent faster.

The chat got the classic treatment for an unbounded streaming list. They virtualized it with react-virtuoso so a five-hundred-message session keeps maybe fifteen message components in the DOM, then wrapped each message in a memo with a stable key so a token landing in the streaming message re-renders only that one row. There is a nice detail buried in the profiling story too. Tauri renders in the OS webview, which on macOS is WebKit, and the React DevTools extension cannot load there. So they shimmed Tauri's invoke bridge and booted the exact same client in plain Chrome, where both the Chrome profiler and React DevTools work. That is how the bottleneck stopped being a guess.

On the process side, idle agents get shut down and resumed on demand, since every session launches with a resume flag and lives on disk by uuid. The runtime moved from Node to Bun, which trimmed 150MB from the bundle and shaved startup time. And the start checkpoint, which used to walk the whole repo synchronously before the agent could respond, got moved off the critical path so the model starts talking the instant you hit enter.

**Key takeaways:**
- Migrating from React Router to TanStack Router gave stable references via structural sharing, eliminating cascading re-renders across mounted panes.
- Streaming chat needs both virtualization and per-row memoization, not one or the other.
- Profiling a Tauri WebKit app meant shimming the native bridge to run the same client in Chrome where real React DevTools work.

**Why do I care:** This is the most useful kind of performance writeup because it names the actual fixes instead of hand-waving about "optimization." The React Router versus TanStack Router point is the one to internalize: unstable references from your router are an invisible tax that grows with how many panes you keep mounted. If you run a workspace-style UI with persistent sidebars and editors, this is probably your problem too, and reaching for the library that fixes the root cause beats sprinkling useMemo until the warnings stop. The Tauri profiling trick alone is worth bookmarking if you ship a desktop app.

**Link:** [The Conductor Rewrite: What They Changed to Make It Fast](https://performance.dev/the-conductor-rewrite)

## TanStack Start Authentication: A Developer's Guide for 2026

**TLDR:** TanStack Start treats server functions, not routes, as the security boundary, which trips up people coming from Next.js or React Router. The guide lays out a double-guard pattern: beforeLoad protects the page experience, and middleware on each server function protects the data.

**Summary:** The core idea here is worth stating plainly because it is the most common security mistake people make in Start apps. Every server function you create is an HTTP endpoint. Anyone who knows the URL can POST to it directly, regardless of which route rendered the UI that normally calls it. So a beforeLoad guard on a route protects the page, but it does nothing to stop a request hitting the server function directly. If your auth logic lives only in beforeLoad, your data is exposed, full stop.

That leads to a pattern the guide names the double guard. Level one is the route guard via beforeLoad, which redirects unauthenticated users before they see protected content. That is purely about user experience. Level two is the server function guard, usually via middleware, which verifies the session inside the function itself because it can be called as a raw endpoint. Omit the route guard and unauthenticated users see protected UI flash before getting rejected. Omit the server function guard and you have a real vulnerability. You need both. The pleasant part is that Start's type system carries the authenticated user through route context with full inference, so refactoring your auth shape makes TypeScript flag every dependent file, which kills an entire class of runtime auth bugs.

The piece walks through three implementation approaches: roll your own with session cookies and bcrypt, lean on Better Auth or Auth.js, or hand it to a managed provider. It is published by WorkOS and the third approach is a pitch for their TanStack Start SDK, so read that section with the appropriate skepticism. The build-versus-buy time estimates are honest enough though: a few days for an MVP, four to eight weeks for production-ready with MFA and OAuth, three to six months for enterprise SSO and SCIM. The security checklist is the part I would actually keep, covering input validation with Zod on every function, constant-time comparison, generic error messages to prevent user enumeration, and testing that direct calls to protected functions return 401.

**Key takeaways:**
- Server functions are public HTTP endpoints, so authentication must be enforced inside each one, not just at the route level.
- The double-guard pattern pairs a beforeLoad route guard for UX with server-function middleware for actual data security.
- Always validate server function input with Zod, and test that unauthenticated direct calls to protected functions are rejected.

**Why do I care:** This is the mental-model adjustment that matters most when a team moves to Start from Next.js, where the route and the data fetch feel more fused. If you are an architect setting conventions, the double guard is the rule to write down before anyone ships their first protected route, because the failure mode is silent and only an attacker finds it. The vendor framing aside, the security boundary insight applies no matter which auth approach you pick. Treat every createServerFn as an endpoint someone will hit directly, because eventually someone will.

**Link:** [TanStack Start authentication: A developer's guide for 2026](https://workos.com/blog/tanstack-start-authentication-guide)

## Porting the React Compiler to Rust

**TLDR:** Joseph Savona's pull request ports the React Compiler from TypeScript to Rust, and the commit history reads like a months-long grind toward test parity, ending around 99.8 percent of fixtures passing. Much of it was driven by AI subagents doing pass-by-pass porting and failure analysis.

**Summary:** This is one of those pull requests where the diff is less interesting than the commit log, which tells the story of a faithful, painstaking reimplementation. The compiler is a pipeline of transformation and validation passes, and each commit ports another pass, watching the failure count tick down. You can see passes like ValidateNoSetStateInEffects, ValidateNoDerivedComputationsInEffects, PropagateScopeDependenciesHIR, and OutlineFunctions get ported one at a time, with the test count climbing from the 1600s toward 1709 out of 1717, then 1715, then settling with a handful of remaining failures blocked on reactive passes that had not been ported yet.

What stands out is how many bugs came from subtle semantic differences between TypeScript and Rust. In one case a guard condition was always true in JavaScript because the string "off" is truthy, while the Rust port explicitly checked for a value and skipped validation for fifty-seven fixtures as a result. In another, the TypeScript compiler relied on shared object reference identity to distinguish two ranges with the same start and end values, so the Rust port had to introduce a unique range id to match that behavior exactly. There is even a determinism fix where a Rust HashSet had to become a BTreeSet because the TypeScript Set preserved insertion order and that order determined which scope won during a union operation. These are the kinds of details that make a "faithful port" genuinely hard.

The workflow itself is a sign of where things are heading. The orchestrator launches subagents in parallel, one doing compiler review and one doing failure analysis, then synthesizes their findings before dispatching a fix subagent. There is a skill file and a pass-mapping table guiding the agents through the port. So this is partly a Rust port and partly a case study in driving a large mechanical reimplementation with coding agents, where the human sets up the harness and the validation and the agents grind through the passes.

**Key takeaways:**
- The React Compiler is being ported to Rust pass by pass, reaching near-complete test parity (around 99.8 percent of fixtures).
- Many bugs traced to TypeScript-versus-Rust semantic gaps: truthiness, reference identity, and collection ordering.
- The port leaned heavily on AI subagents for porting, review, and failure analysis, with humans owning the test harness.

**Why do I care:** A Rust compiler means the React Compiler can plug into Rust-based toolchains like oxc and run far faster than the Babel-based version, which matters once you turn the compiler on for a large codebase and start paying its cost on every build. For most of us this is infrastructure we will benefit from without touching, but the porting methodology is the part worth watching. Driving a mechanical reimplementation with agents against a strong test suite is a pattern we are going to see again, and the lesson is that the test fixtures, not the agents, are what make it safe.

**Link:** [Port React Compiler to Rust by josephsavona](https://github.com/facebook/react/pull/36173)

## Deprecating a React Component Using TypeScript Overload

**TLDR:** A narrow trick for introducing a breaking change to a shared component in a monorepo without renaming it: use TypeScript function overloads so the old signature is marked deprecated and a new "new" prop opts into the updated implementation. The author is upfront that this is not the recommended general approach.

**Summary:** The situation is specific. You have a monorepo with a shared components package that every app consumes via a workspace dependency, so everyone always gets the current local implementation. You want to change a component, say a Card's border radius and shadow, but a breaking change could break every consumer at once. The usual answer is to create a new component and deprecate the old one, but that means consumers change the name they import and you end up with two components in two directories and more noise overall.

The author wanted something quieter: keep the same name, make the deprecation visible in the editor, and give an easy switch between old and new. Since a React component is just a function, TypeScript overloading does the job. You write the old implementation as LegacyCard and the new one as NewCard, then declare three overload signatures for a single Card function. The first signature takes the old props and is marked with a deprecated annotation, the second takes a new props type that includes a required "new" flag, and the implementation signature branches on whether that flag is present. Consumers using the old signature see a strikethrough in their editor, and adding the new prop opts into the updated look while clearing the deprecation warning.

The honest disclaimer at the top matters. This is not a replacement for package versioning, and the author warns against extending it into a homegrown versioning scheme with v1, v2 props. It is a pragmatic bridge for a particular monorepo pain point, where you want the type system to nudge consumers toward the new behavior without a disruptive rename.

**Key takeaways:**
- TypeScript function overloads let a single component expose a deprecated old signature and a new opt-in signature under the same name.
- A required discriminant prop like "new" picks the implementation at the type level and clears the deprecation strikethrough.
- This is a narrow monorepo bridge, not a substitute for proper package versioning.

**Why do I care:** The deprecated-annotation-with-editor-strikethrough effect is genuinely useful for any shared component library where you cannot force consumers to migrate on your schedule. It turns a migration into something developers discover in their editor rather than in a changelog nobody reads. I would heed the author's warning and keep it to a single legacy-to-new transition, because the moment you start encoding versions in props you have reinvented package versioning, badly. As a soft migration nudge inside one repo, though, it is a clean little pattern.

**Link:** [Deprecating a React component using TypeScript Overload](https://dev.to/mbarzeev/deprecating-a-react-component-using-typescript-overload-2ka)

## Farewell Expo

**TLDR:** Evan Bacon's goodbye post after nine years at Expo, framed as the lessons he learned watching the project grow from 25,000 weekly npm downloads to 5.6 million. The throughline is relentless dogfooding and the idea that most "irreversible" decisions are just reversible ones that take too long to undo.

**Summary:** This one is more reflection than technical writeup, but it is a good read from someone who shaped a tool a large chunk of the React Native world depends on. Bacon joined Expo at nineteen and is leaving as the project hits the top ten on the app stores and turned cash-flow positive with a Series B. His first lesson is the obvious-but-hard one: be your product's biggest fan, and pay attention to the moments you avoid using your own tool, because that avoidance is where the subtle problems hide.

The lesson I keep thinking about is reframing irreversible decisions. He uses the iOS bundle identifier as an example, the thing Xcode makes you choose up front and warns you can never change. His point is that most irreversible decisions are really reversible ones that just take an inconvenient amount of time to undo, so the fix is to make undoing them cheap. They made creating a new app nearly instant, which turns a scary permanent choice into something you redo in seconds. That principle generalizes well beyond mobile tooling.

He also tells the story behind one of Expo's biggest architectural shifts. For years Expo gave everyone the same fixed runtime, and every requested library got forced into every app whether they wanted it or not, which produced a terrifying backlog. The realization was that everyone asking to "add more" actually wanted a runtime that was theirs, not Expo's. So they stopped growing the fixed runtime and made it generate itself per project from whatever you installed, and most of the backlog evaporated. The other lessons cover building developer trust by showing up release after release, and the surprisingly mundane discovery that the features doing the most work were the boring ones nobody posts about, which they only learned by building a system to detect what the top apps were actually shipping with.

**Key takeaways:**
- The strongest product signal is noticing when you avoid using your own tool, then asking why.
- Most "irreversible" decisions are reversible ones that take too long to undo, so make undoing them cheap.
- Expo's per-project generated runtime solved a years-long backlog by giving developers a runtime that was theirs, not a fixed one.

**Why do I care:** Even if you never write a line of React Native, the decision-making here is relevant to anyone who maintains a library or platform that others build on. The "give them a runtime that is theirs" insight is exactly the tension every framework author feels between a curated default and unbounded extensibility, and the resolution is a good template. From a purely practical angle, the post confirms SDK 56 is out and faster, which matters if you are planning an Expo upgrade. Mostly though, this is a reminder that the durable wins come from staying with a frustrated user base release after release, which no competitor can copy.

**Link:** [Farewell Expo](https://evanbacon.dev/blog/expo)

## react-native-runtimes: Heavy Work in Isolated Hermes Runtimes

**TLDR:** A new library from Margelo and Callstack adds a multi-runtime layer to React Native New Architecture apps, letting you mount selected components or run business logic in named secondary Hermes runtimes so a heavy feed or chat screen stops competing with navigation and input on the main thread.

**Summary:** React Native gives your app one main JavaScript runtime, and when a feed, chat screen, editor, or hydration job monopolizes it, everything else competes for the same VM. This library adds the ability to spin up named secondary Hermes runtimes and move work onto them. The headline API is a component you wrap around an expensive subtree, which a Metro transform rewrites at build time into a threaded boundary, so that component renders in its own Hermes instance with no manual registration. There is also a threaded screen variant for whole navigation flows that should live entirely off the main runtime.

The capabilities go beyond just moving components. You can run headless tasks on a named runtime to pre-hydrate stores or decode data without mounting a view, call typed functions on a specific runtime and await the result, and prewarm a runtime before the user navigates so an expensive surface is ready when they arrive instead of cold-starting. State sharing across these isolated JavaScript heaps goes through a native C++ singleton, exposed as a Zustand-style store with synchronous reads and no bridge round-trip, with optional native persistence. There is also a notion of a long-lived business runtime that sees the same native modules as the main one.

The honesty about when not to use it is welcome. If memoization, virtualization, or moving work off render already fixes your problem, you do not need this. It requires New Architecture and Hermes, and you should pass ids and keys between runtimes rather than large mutable objects, reading shared data from the native-backed store instead. This is a sharp tool for the one or two features in an app that genuinely saturate the main thread, not a default architecture.

**Key takeaways:**
- Mount components, whole screens, or headless tasks in named secondary Hermes runtimes to keep the main thread free for navigation and input.
- Cross-runtime state shares through a native C++ singleton with synchronous reads and an optional persistence layer.
- Requires New Architecture and Hermes, and is meant for the few features that truly monopolize the main runtime, not everything.

**Why do I care:** This is the React Native answer to a problem the web has chipped at with web workers for years, and it is more ergonomic than I expected given the build-time component rewriting. If you maintain an app with a genuinely heavy surface, a chat with live streaming, a media-rich feed, a complex editor, this is a tool worth evaluating before you resort to rewriting that surface in native. The discipline it demands matters: serializable boundaries and shared native state, not passing live objects around. Used surgically, it could fix the kind of jank that no amount of memoization touches because the work itself is just too big for one thread.

**Link:** [react-native-runtimes](https://github.com/margelo/react-native-runtimes)

## Your Node.js Streams Aren't Backpressuring

**TLDR:** A clear, slightly alarming explanation of why streaming code that passes review and tests can still OOM in production: highWaterMark is an advisory threshold, not a limit, and if you ignore the boolean that write returns, Node will buffer without bound until the process dies. The fix is a few lines, but it exposes a connection-starvation problem underneath.

**Summary:** The setup is a familiar production horror story. A clean export service pipes a database cursor through a CSV transform into an HTTP response, passes review, runs fine for months, then gets OOM-killed when a customer exports two million rows. The heap does not spike, it climbs slowly, because the stream was never actually backpressuring. The code called write for every row and ignored the false return value that was begging the producer to slow down, and Node did exactly what it was told: buffer until V8 runs out of space.

The article systematically dismantles the comfortable mental model. Streams do not protect you from memory exhaustion, they give you the tools to protect yourself, and backpressure is a cooperative protocol that nobody is forced to honor. highWaterMark is not a memory limit; when the buffer crosses it, write returns false, and that is the entire mechanism. The fix is to check that boolean and await the drain event before writing more. Node 22 made this more dangerous by bumping the default highWaterMark from 16KB to 64KB, so in constrained containers you burn more of your memory ceiling before getting the first hint to slow down. There is a related trap in object mode, where the threshold counts objects rather than bytes, so a default of sixteen large rows can mean far more memory than the number suggests.

It goes further into Transform streams having independent thresholds on each side, the pipe method silently swallowing errors and leaking file descriptors where pipeline cleans everything up, and the surprise that async iteration paces your reads but does nothing about your writes. The most valuable part is the ending, where it points out that fixing the memory leak just moves the bottleneck: a paused stream holds its database connection and cursor open, so a handful of users on slow connections can starve a connection pool of twenty while memory stays perfectly flat. The real production answer combines backpressure with query timeouts, dedicated worker pools, and offloading huge exports to a background job that writes to object storage and emails a link.

**Key takeaways:**
- highWaterMark is an advisory threshold that makes write return false; ignore that boolean and Node buffers without limit until it crashes.
- Prefer pipeline over pipe, since pipe does not propagate errors and leaks resources when a stream in the chain throws.
- Fixing stream memory often shifts pressure to your database connection pool, which needs its own timeouts, isolation, and offloading defenses.

**Why do I care:** Anyone shipping Node services that stream large payloads should read this, because the failure mode is exactly the kind that survives review and tests and only shows up when a big customer signs. The connection-starvation point is the senior-level insight: it is easy to feel done once memory flatlines, but you have just traded a loud failure for a quiet one where p99 latency creeps up and nobody connects it to that export endpoint. The four-line drain fix is table stakes; the architectural defenses around the connection pool are what actually keep the service alive under real load.

**Link:** [Your Node.js Streams Aren't Backpressuring. They're Silently Eating Your Memory.](https://frontendmasters.com/blog/your-node-js-streams-arent-backpressuring-theyre-silently-eating-your-memory/)

## On Rendering Diffs

**TLDR:** Pierre's deep dive into building CodeView, a virtualization-first React component for rendering arbitrarily large code diffs in the browser, including a novel "inverse sticky" technique that makes blanking during fast scrolls nearly impossible. Also a pointed plea to Apple about Safari and WebKit.

**Summary:** The premise is that diff rendering should just work, so product teams can spend their time on the review workflow around the code rather than rebuilding the rendering layer from scratch. Pierre started with basic File and FileDiff components, hit performance walls, added a simple virtualizer and worker-thread syntax highlighting as stopgaps, and eventually built CodeView to treat rendering, processing, and memory as one connected problem at scale.

The centerpiece is the virtualization technique. The common approaches all have a flaw: a real scrollable region with positioned items can blank during fast scrolls when JavaScript falls behind, while a requestAnimationFrame-driven sticky container avoids blanking but can stutter and is capped at 60Hz on Safari even on high-refresh displays. Pierre's hybrid, which they call the inverse sticky technique, pins the bottom edge of the rendered region to the bottom of the viewport when you scroll past it and the top edge to the top when you scroll back up, using negative sticky offsets. The result keeps native scrolling, decouples positioning from frame-perfect rendering, and makes blanking effectively impossible, though they admit Safari can still break it under aggressive scrolling.

The memory work is the other highlight. Rendering the Linux v6-to-v7 diff meant parsing over 700MB of patch content, and they found that parsed substrings can keep the entire original giant input string alive depending on how the engine represents them, so deliberately copying strings to detach them actually cut memory roughly in half and dropped parse time by about eighty percent. They added DOM element pooling to reuse Shadow DOM wrappers instead of rebuilding them on every scroll, moved options state to a single shared source of truth instead of giving every file its own config object, and deferred syntax highlighting to a worker pool with an LRU cache so code renders as plain text first and gets highlighted progressively. The post closes with a genuinely detailed list of WebKit pain points and an open invitation to Apple to talk.

**Key takeaways:**
- The inverse sticky technique pins the rendered region's edges to the viewport so fast scrolls cannot expose blank space, while keeping native scrolling.
- Parsed substrings can retain the entire source string, so copying to detach them cut memory and parse time dramatically on a 700MB diff.
- DOM pooling, shared options state, and deferred worker-thread highlighting were all needed to scale rendering to the largest diffs.

**Why do I care:** This is a masterclass in browser performance engineering, and the techniques transfer well beyond diff viewers to any large virtualized surface like logs, tables, or chat. The substring-retention memory trap is the kind of thing that bites you once and then you remember forever, and it applies anywhere you parse a huge string and keep small slices. If you build developer tools targeting Tauri, the Safari and WebKit section is essential reading, because it documents real compositing and requestAnimationFrame limitations you will hit and that Chrome will not warn you about. Even the inverse sticky idea is clever enough to steal for your own virtualizer.

**Link:** [On Rendering Diffs](https://pierre.computer/writing/on-rendering-diffs)

## Astro 6.4: A Pluggable Markdown Pipeline and a Rust Processor

**TLDR:** Astro 6.4 makes the Markdown pipeline pluggable via a new markdown.processor option, ships an experimental Rust-based processor called Sätteri that can shave a minute off large doc-site builds, and adds Cloudflare helpers for the new advanced routing.

**Summary:** Astro's Markdown handling has always been built on the unified ecosystem of remark and rehype, which is powerful but not to everyone's taste. The headline change in 6.4 is a markdown.processor configuration option that lets you swap that entire pipeline out. The default stays unified, so existing projects keep working, but your remark and rehype plugins now get configured directly on the processor rather than in the top-level Markdown config. The old top-level options still work but are deprecated and slated for removal in Astro 8.

The more interesting part is what the pluggable API enables: a new processor based on Sätteri, a Markdown and MDX pipeline written in Rust. It is much faster than the unified-based default and implements many Markdown features natively that previously needed plugins. In Astro's own testing, switching the Astro and Cloudflare docs sites to Sätteri cut over a minute off each build. The catch is that Sätteri does not run remark or rehype plugins, so if you depend on the unified ecosystem you either stay on unified for now or port your plugins to Sätteri's own plugin model. The team hopes to make it the default in a future major version.

The release also adds Cloudflare helpers for the experimental advanced routing introduced in 6.3. A new helper wires up the Cloudflare-specific pieces for you: session KV binding injection, static asset serving, the client address from the connecting-ip header, waitUntil, and prerendered error pages, usable either with a custom fetch handler or as Hono middleware.

**Key takeaways:**
- A new markdown.processor option makes Astro's Markdown pipeline pluggable, with the existing unified-based pipeline as the default.
- The experimental Sätteri processor, written in Rust, is much faster but does not run remark or rehype plugins.
- Cloudflare helpers now wire up the bindings and request plumbing for Astro's experimental advanced routing.

**Why do I care:** The Rust-processor trend is showing up everywhere now, and Astro making the Markdown pipeline swappable is the pragmatic way to introduce it without breaking the plugin ecosystem people depend on. If you run a large content site on Astro and your builds are slow, a minute off a doc-site build is meaningful for CI feedback loops, and it is worth trialing Sätteri on a branch to see whether you actually lean on remark plugins it cannot run. The deprecation of the top-level Markdown options is the kind of thing to note now so the eventual Astro 8 migration is not a surprise.

**Link:** [Astro 6.4](https://astro.build/blog/astro-640/)

## React Native Gesture Handler 3.0

**TLDR:** Gesture Handler 3.0 from Software Mansion is a ground-up rebuild for the New Architecture, dropping old-architecture support and introducing a hook-based API, a new Touchable component, and deeper Reanimated integration.

**Summary:** This is a major version that drops the legacy Paper architecture entirely and rebuilds around the New Architecture. The most visible change for developers is a shift toward a hook-based gesture API, with gesture hooks renamed to carry a Gesture suffix and composition hooks reorganized. The callback vocabulary changed too, with onStart and onEnd becoming onActivate and onDeactivate, which is the kind of rename that signals a real rethink of the model rather than a cosmetic bump.

There is a new unified detector underneath, described in the changelog as "one detector to rule them all," along with a virtual detector that became part of the public API, and a new Touchable component built on native primitives. The Reanimated integration got deeper, with shared values bindable directly in the gesture config and the ability to listen for Reanimated events without always wrapping things in an animated component. A huge amount of the work, visible across hundreds of merged pull requests, went into memoization, batching native operations, reducing render counts, and fixing the long tail of platform-specific behavior across iOS, Android, and web.

Because this is a New-Architecture-only release that removes deprecated components and renames core callbacks, it is a migration, not a drop-in upgrade. Software Mansion shipped a migration guide and even an LLM skill to help automate the move, which tells you they expect the rename churn to be real for existing apps.

**Key takeaways:**
- Gesture Handler 3.0 is New Architecture only and drops legacy Paper support entirely.
- The API moved toward hooks, with renamed callbacks (onActivate/onDeactivate) and a new native-primitive Touchable component.
- Migration is non-trivial, so the team shipped both a migration guide and an LLM skill to assist.

**Why do I care:** Gesture Handler sits under a large fraction of React Native apps, often transitively through navigation and UI libraries, so a major version with renamed callbacks is something to plan for rather than stumble into. If you are already on the New Architecture, the hook-based API and tighter Reanimated integration are a real ergonomics win, and the performance work on render counts and native batching should help touch-heavy screens. If you are still on the old architecture, this release is a clear signal that the ecosystem has moved on, and the LLM-assisted migration is a small sign of how library maintainers are starting to ship upgrade tooling alongside breaking changes.

**Link:** [React Native Gesture Handler 3.0.0](https://github.com/software-mansion/react-native-gesture-handler/releases/tag/v3.0.0)

## EAS Observe: Production Performance Monitoring for React Native

**TLDR:** Expo launched EAS Observe in open beta, a performance monitoring service that tracks real-world startup, render, and bundle-load times from production sessions across real devices, with release comparison and per-session drill-down.

**Summary:** Performance debugging in React Native has traditionally lived in development tools, which show how your app runs on your machine rather than on the range of real devices and network conditions your users actually have. EAS Observe is Expo's answer, focused squarely on production. You install a library, wrap your root layout with the appropriate root component depending on your SDK version, and call a markInteractive function when your app is ready for user input, and it starts collecting metrics from real sessions.

What it gives you is production performance data on startup times, render performance, and bundle load times across a spread of devices, the ability to compare metrics across app versions and over-the-air updates to catch regressions early, and the ability to drill into individual slow sessions to understand why a particular device or condition is dragging. You can query the metrics from the terminal with eas observe commands or view them in the dashboard. The first ten thousand monthly active users are free during the open beta.

The docs are honest about scope. This is not a development-time profiler, for which they still point you at React Native DevTools and Expo Atlas. It is not crash reporting or custom analytics either, both of which are noted as planned future additions, with Sentry, BugSnag, PostHog, and others recommended in the meantime. So today it is specifically about production performance visibility, which is a real gap given how different production behavior is from what you see on a fast dev device.

**Key takeaways:**
- EAS Observe tracks production startup, render, and bundle-load metrics from real user sessions across devices and conditions.
- Release comparison highlights regressions across app versions and OTA updates, with per-session drill-down for slow cases.
- It is scoped to production performance only, not dev-time profiling, crash reporting, or analytics, which are separate or future.

**Why do I care:** The honest truth of mobile is that you have almost no visibility into how your app performs on the long tail of cheap Android devices your users actually carry, and dev-machine profiling lies to you about it. A first-party Expo service that surfaces production startup and render metrics, and crucially compares them across releases and OTA updates, fills a gap that has historically required cobbling together custom instrumentation. If you ship with Expo, this is worth wiring up early specifically for the regression-catching, because the alternative is finding out about a slow release from user complaints. Keep in mind it does not replace your crash and analytics stack yet.

**Link:** [Introduction to EAS Observe](https://docs.expo.dev/eas/observe/introduction/)

## pnpm 11.5

**TLDR:** pnpm 11.5 adds a hoistingLimits setting for controlling how far dependencies hoist in hoisted installs, swaps its interactive prompt library to fix scrolling in long lists, and recognizes staged publishes as strong trust evidence in its trust scale.

**Summary:** The headline addition is a hoistingLimits setting that controls how far dependencies hoist when you use the hoisted node linker. It mirrors yarn's equivalent and accepts three values: hoist as far as possible, which is the default, hoist only as far as each workspace package, or hoist only up to each workspace package's direct dependencies. This is useful in monorepos where aggressive hoisting can let packages accidentally import things they never declared.

pnpm also replaced its interactive prompt library, moving from enquirer to inquirer's prompts, which fixes a long-standing bug where long choice lists got clipped in the terminal during interactive update. The new library uses visual-line-aware pagination so scrolling works correctly, and the vim-style j and k navigation keys still work. This affects a bunch of interactive commands including interactive update, audit fix, approve-builds, patch, publish, and login.

On the supply-chain side, staged publishes are now recognized in the trust scale. When a package version's registry metadata carries an approver field, pnpm treats it as the strongest trust evidence, ranked above trusted publishers and provenance attestations, since staged publishes require two-factor publish approvals. This prevents false-positive trust downgrade errors when moving from a staged publish to a lower trust level. The release also fixes several install edge cases, including a hang during peer resolution with mutual peer cycles and a dropped integrity field for remote tarball dependencies.

**Key takeaways:**
- A new hoistingLimits setting controls hoisting depth for the hoisted node linker, matching yarn's behavior.
- The interactive prompt library was replaced to fix clipped scrolling in long choice lists across many pnpm commands.
- Staged publishes are now the strongest trust signal in pnpm's trust scale, preventing false-positive downgrade errors.

**Why do I care:** The hoistingLimits setting is the one to know about if you run a monorepo and have ever been bitten by phantom dependencies, where code imports a package it never listed and works only because hoisting put it in reach. Being able to cap hoisting at the workspace or direct-dependency boundary makes those mistakes fail loudly at install time instead of silently in production. The trust-scale change is part of the broader industry response to npm supply-chain attacks, and treating staged publishes with 2FA approval as top-tier evidence is a sensible default that most teams will benefit from without thinking about it.

**Link:** [pnpm 11.5](https://pnpm.io/blog/releases/11.5)
