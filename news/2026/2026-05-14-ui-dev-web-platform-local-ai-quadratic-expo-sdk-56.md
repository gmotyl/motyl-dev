---
title: "Web Platform Lineage, Local AI, Quadratic Traps, and Expo SDK 56"
excerpt: "Four editorial reads from ui.dev: how libraries shape the web platform, why local AI deserves the default slot, the O(n^2) bug that survives review, and what ships in Expo SDK 56."
publishedAt: "2026-05-13"
slug: "ui-dev-web-platform-local-ai-quadratic-expo-sdk-56"
hashtags: "#uidev #webplatform #javascript #performance #local-ai #apple #expo #react-native #big-o #generated #en"
source_pattern: "ui.dev"
---

## 9 Times the Web Platform Was Influenced by Libraries

**TLDR:** Jad Joubran walks through nine platform APIs that started life in userland libraries: from querySelector and classList to structuredClone, Promises, ES Modules, Temporal, and Element.closest. The argument is that the healthiest standardisation path is "library proves the pattern, browsers absorb it."

**Summary:** The piece reframes a familiar arc. We tend to talk about jQuery, Lodash, Moment, RequireJS, Bluebird, and Dojo as historical curiosities, things that "got replaced." Joubran flips that, pointing out the platform didn't invent its best APIs, it caught up to them. Each library was a multi-year experiment running in thousands of production codebases, generating feedback no spec committee could simulate. That's how the survivors became defaults.

Some of the examples are genuinely fun to revisit. The note that Array.prototype.flatten was renamed to flat because MooTools had monkey-patched the prototype with different semantics (the so-called SmooshGate) is a reminder that web compatibility is a hard constraint, not a polite preference. The structuredClone story is even better: the deep-clone algorithm was already inside browsers, used silently by postMessage and IndexedDB for years. Exposing it as a callable global was the change, not implementing it.

The declarative UI section is the one I'd point juniors at. The popovertarget attribute and the new command attribute let you wire a button to a target element without a single addEventListener, and you inherit focus management, Escape-to-close, and light-dismiss for free. Bootstrap proved that pattern with data-toggle a decade ago. The platform absorbed the idea minus the jQuery dependency.

The closing question is the one worth sitting with. Which of today's libraries are tomorrow's standards? With Baseline Newly Available landing features in the same year they ship, the userland-to-platform timeline is compressing.

**Key takeaways:**
- The web platform's best APIs were prototyped in userland, then standardised once the patterns stabilised.
- structuredClone exposed a deep-clone algorithm browsers had already been running internally for years via postMessage and IndexedDB.
- Declarative attributes like popovertarget and command replace hand-rolled JavaScript wiring and bring accessibility behaviours by default.

**Why do I care:** As an architect, the lesson here is about where to invest. Building on platform primitives that absorbed library patterns means you inherit the lessons learned from years of bug reports. When you reach for popover and dialog instead of a custom modal, you also get focus management and dismiss behaviour that took the industry a decade to get right. The corollary is to watch what's emerging in libraries today, because that's the leading indicator for what your stack will simplify around in two years.

**Link:** [9 Times the Web Platform Was Influenced by Libraries](https://jadjoubran.io/blog/web-platform-influenced-by-libraries)

## Local AI Needs to be the Norm

**TLDR:** The author argues that slapping an OpenAI or Anthropic API call onto every app is creating a generation of fragile, privacy-hostile software. For features that transform user-owned data, on-device models running through Apple's FoundationModels and typed Generable structs are already a better default.

**Summary:** The framing is sharp. Every time a developer streams user content to a third-party AI provider, the product changes shape. A feature becomes a distributed system with data retention questions, audit obligations, breach exposure, government requests, rate limits, vendor uptime dependencies, and billing edge cases. The author puts it bluntly: you took a UX feature and turned it into a distributed system that costs you money.

The case study is The Brutalist Report's iOS client. Article summaries are generated on-device using Apple's local model APIs. No server detour, no prompt logs, no "we store your content for 30 days" footnote. The technical pattern is straightforward. Initialise a SystemLanguageModel.default session, give it instructions, pass the article text, receive Markdown. For longer content, chunk into roughly 10k character segments, produce facts-only notes per chunk, then run a second pass to merge them. This is the kind of workload local models are perfect for, because the input data is already on the device and the output is lightweight.

The structured output pattern with @Generable is the part I found most interesting. You define a Swift struct, annotate each field with a natural-language @Guide describing what it represents, and ask the model to generate an instance of that type. Instead of asking for JSON and praying, you get typed data you can render directly. That's an engineering improvement, not just a developer experience nicety.

The author concedes that some use cases genuinely need cloud-scale intelligence. The point is that not every use case does. Summarise, classify, extract, rewrite, normalise. Local models can do these reliably. The trust dividend is real too: you don't build trust with a 2,000 word privacy policy, you build it by not needing one.

**Key takeaways:**
- Cloud AI calls convert local UX features into distributed systems with billing, uptime, retention, and rate limit baggage.
- Apple's FoundationModels with @Generable structs return typed data instead of unstructured text, removing the JSON-parsing-and-praying step.
- Local models excel at transforming user-owned data; they don't need to be a search engine for the universe.

**Why do I care:** I keep seeing teams reach for a cloud LLM as the default because it's what the tutorials show. As a senior frontend developer, the architectural question I'm asking is: which AI features in my app are actually transforming data the user already has on their device? Those are the ones that should run locally. The Neural Engine in modern phones is mostly idle while we wait for a JSON response from Virginia. There's a real product moat in shipping features that work offline, respect privacy by construction, and have predictable latency. Cloud is the escape hatch for genuinely cloud-scale problems, not the default.

**Link:** [Local AI Needs to be the Norm](https://unix.foo/posts/local-ai-needs-to-be-norm/)

## The O(n^2) Bug That Looked Like Clean Code

**TLDR:** A clean three-line functional snippet shipped on Tuesday, the API was timing out by Thursday. The root cause was Array.prototype.find inside Array.prototype.map, producing O(n*m) where the test data hid the quadratic growth. The fix was a one-line Map lookup, but the more interesting part is why nobody caught it in review.

**Summary:** The opening anecdote is one almost every team has lived through. p99 latency climbing from 80ms to 14 seconds over 48 hours, nothing changed except the user count. The offending code was idiomatic: a map over users, with a find on a permissions array inside the callback. At 200 users, 40,000 comparisons. At 20,000 users, 400,000,000. The fix is to build a Map first, then look up in O(1).

The deeper point is that quadratic complexity is the most dangerous performance class in production, not because it's the slowest, but because it looks fine. It passes review. It works in development. It works in staging if the dataset is small. Then it hits real volumes and everything melts. JavaScript's expressive array methods make this especially easy to miss because the code reads like English instead of looking like nested for loops.

The article catalogues five patterns I've seen in production. The .includes inside .filter, where converting one array to a Set drops the comparisons by orders of magnitude. The classic deduplication via findIndex, which scans from the start for every element. The cascading .map().filter().map() pipeline that hides a nested find inside one of the maps. The recursive tree flattener whose spread operator inside reduce copies the accumulator on every recursive call. And of course the N+1 SQL pattern, where an ORM's lazy loading turns 1 query into 1,001.

The defensive practices section is worth printing out. Profile with realistic data sizes, because the difference between O(n) and O(n^2) is invisible at n=10. Grep for .find, .includes, .indexOf inside .map, .filter, .reduce. Add complexity annotations to code reviews: what is n, how big can it get. Set latency budget alerts at p95, because quadratic complexity manifests as gradual degradation, not sudden failure. Know your standard library well enough that reaching for Map and Set is muscle memory.

**Key takeaways:**
- Quadratic complexity hides because the code looks idiomatic and passes review with small datasets.
- Replacing Array.find or Array.includes inside a loop with a pre-built Map or Set lookup typically drops complexity from O(n*m) to O(n+m).
- Profile with production-sized fixtures; ten-record test suites can't distinguish between linear and quadratic algorithms.

**Why do I care:** This is the kind of bug that does real damage to senior engineering credibility. It ships, it works fine for weeks, then your on-call rotation owns the incident. The mechanical grep for lookup methods nested inside iteration methods is a cheap CI check I'd genuinely add to a codebase. The mindset shift the author closes with is the load-bearing part: performance complexity isn't something you optimise later, it's a design decision you make when you write the code. Asking "what is n, and how big can it get" should be as automatic as asking "what happens when this is null."

**Link:** [The O(n^2) Bug That Looked Like Clean Code](https://kitmul.com/en/blog/hidden-quadratic-complexity-production-code)

## Expo SDK 56 Beta is Now Available

**TLDR:** SDK 56 ships React Native 0.85.2 and React 19.2.3, but the headline is that Expo UI's Jetpack Compose and SwiftUI APIs are now stable with new universal cross-platform components. Other big items include inline native modules, a Kotlin compiler plugin that delivers roughly 40% faster Android cold starts, a new Swift-to-JSI layer on iOS, and Expo Router forking off React Navigation.

**Summary:** The Expo UI stabilisation is the maturity moment. After three SDK cycles of iteration, the Jetpack Compose and SwiftUI APIs are stable, included in the default create-expo-app template, and available in Expo Go. The new universal components like Host, Row, Column, ScrollView, Text, TextInput, Button, Switch, Slider, Checkbox, and BottomSheet are backed by jetpack-compose on Android, swift-ui on iOS, and react-dom or react-native-web on web. The web layer is still experimental, but the cross-platform story is real. Drop-in replacements for popular community libraries like segmented-control, picker, datetimepicker, masked-view, and gorhom/bottom-sheet make migration mostly an import change.

The performance work in expo-modules-core is the technical highlight. A new Kotlin compiler plugin replaces runtime reflection with build-time code generation, producing roughly 40% faster cold starts and 33% faster first render on Android. On iOS, the team removed the Objective-C++ middle layer entirely by adopting Swift and C++ interop to talk to JSI directly. Fewer language hops, less overhead, and the codebase is now Swift all the way down. Both wins come with no app-side changes required.

Inline modules are the developer experience pitch. You can now define Expo modules directly within your project structure, alongside your JavaScript and TypeScript code. Write Swift and Kotlin files in place, and during prebuild the iOS Xcode project and Android project get updated and autolinked automatically. With the new type generation CLI watcher, you get a TypeScript interface regenerated beside the Swift file. This lowers the barrier to "I need a tiny native module" considerably.

The bundler and runtime improvements stack up: faster bundler warmup with up to 30% reduction in load time for monorepos with isolated dependencies, watchFolders-free Metro experiment that enables package manager global stores like pnpm and bun, a native Node.js watcher replacing Watchman as the default, TypeScript 6 support and TypeScript 7 readiness, faster module resolution, and import.meta enabled automatically. Hermes V1 is now the default JavaScript engine.

The navigation news is structural. Expo Router has forked the parts of React Navigation it builds around, so the two libraries are now independent. There's a codemod to handle most migrations automatically. React Navigation continues under Satya's stewardship, and both libraries can push each other forward. Brownfield support also gets meaningful additions: multiple isolated Expo apps in one host, custom Turbo Modules from the host app, and iOS prebuilds by default. Minimum Xcode bumps to 26.4, minimum iOS to 16.4.

**Key takeaways:**
- Expo UI's Jetpack Compose and SwiftUI APIs are stable, with universal components covering layout, text, inputs, controls, and sheets across platforms.
- Roughly 40% faster Android cold starts via a Kotlin compiler plugin, and a new Swift-to-JSI layer on iOS removes the Objective-C++ middle layer.
- Expo Router has forked from React Navigation, with a codemod to migrate existing apps.

**Why do I care:** For teams running React Native at scale, the cold-start and bundling improvements alone justify upgrading. The inline modules story is the one I find most interesting strategically, because it dramatically lowers the cost of "we need a tiny bit of native code." That changes the calculus for whether a feature stays a JavaScript shim or becomes a properly integrated native capability. The Expo UI stabilisation also makes it easier to argue against pulling in a half-maintained community library when a first-party drop-in exists. The Expo Router and React Navigation split is the one to read carefully if you're on the upgrade path, because it's the breaking change most likely to bite.

**Link:** [Expo SDK 56 Beta is now available](https://expo.dev/changelog/sdk-56-beta)
