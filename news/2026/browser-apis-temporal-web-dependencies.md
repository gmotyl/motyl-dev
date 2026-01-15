---
title: "Browser APIs Aren't Always Web APIs, Temporal Replaces Date, and Web Dependencies Need Fixing"
excerpt: "A deep dive into why browser APIs often depend on vendor services, JavaScript's long-awaited Temporal replacement for Date, and Lea Verou's call to fix the web's broken dependency management."
publishedAt: "2026-01-15"
slug: "browser-apis-temporal-web-dependencies"
hashtags: "#frontendfocus #css #html #javascript #temporal #webassembly #astro #architecture #security #generated #en"
---

## Not All Browser APIs Are "Web" APIs

**TLDR:** Many browser APIs we assume are standardized web platform features actually depend on vendor-specific services—geolocation uses Google or Apple location servers, speech recognition streams audio to cloud services, and push notifications route through vendor networks. The standard defines the interface, not the implementation.

This Polypane article delivers a sobering reality check about what "web standards" actually means. When you call `navigator.geolocation.getCurrentPosition()`, you're not just using a W3C-standardized API—you're potentially sending your users' location data to Google, Apple, or Mozilla's servers depending on which browser they use.

The mechanism is insidious in its invisibility. The Geolocation API looks clean and standardized. The specification is W3C-maintained. The MDN docs are excellent. But the actual implementation? That's entirely up to the browser vendor. Chrome uses Google Location Services. Safari uses Apple's servers. Firefox retired Mozilla Location Service in 2024 and now also uses Google.

This pattern repeats across multiple APIs. Speech Recognition streams audio to vendor cloud services in real-time. The Speech Synthesis API's voices depend on browser, OS, and device combinations—and some "good" voices only work online because they're processed on vendor servers. Your supposedly local speech synthesis might be sending private messages to third-party servers.

The security implications deserve attention from architects. Passkeys aren't part of the web stack—they're part of each browser's password manager infrastructure. Payment Request API functionality depends entirely on browser vendor partnerships with payment providers. Web Push notifications route through Firebase Cloud Messaging, Apple Push Notification service, or Mozilla's infrastructure depending on browser.

The article doesn't argue these APIs are bad or unusable. They're incredibly useful. But we need to understand they're abstractions over vendor services, not truly portable web standards. When designing systems, this means planning for graceful degradation, being transparent about privacy implications, and recognizing that code working perfectly in Chrome might fail silently in Safari because the underlying service infrastructure differs.

**Key takeaways:**
- Browser APIs often wrap vendor-specific services, not platform-neutral implementations
- Geolocation, speech, push notifications, and payments all depend on vendor infrastructure
- Privacy implications exist that users don't see—speech APIs may stream audio to cloud services
- Big players can afford to offer services free; smaller browsers face feature parity gaps

**Tradeoffs:**
- Standardized interfaces provide developer convenience but obscure privacy and reliability differences
- Using these APIs means implicit dependency on vendor infrastructure availability

**Link:** [Not All Browser APIs Are "Web" APIs](https://polypane.app/blog/not-all-browser-apis-are-web-apis/)

---

## Chrome Introduces the `<geolocation>` HTML Element

**TLDR:** Chrome 144 introduces a declarative `<geolocation>` HTML element that replaces script-triggered permission prompts with user-action-oriented buttons. It reduces boilerplate, provides stronger user intent signals, and includes built-in recovery flows for previously blocked permissions.

This represents a significant shift in how browsers handle capability requests. Instead of JavaScript triggering permission prompts that interrupt users, the `<geolocation>` element ensures requests are strictly user-initiated through visible, clickable interface elements.

The origin trial results support the approach: Zoom reported 46.9% fewer camera/microphone capture errors, Immobiliare.it saw 20% more successful geolocation flows, and ZapImóveis observed 54.4% success in users recovering from "previously blocked" states.

Implementation is notably simpler than the JavaScript API. Instead of managing callbacks and error states manually, developers add the element and listen for the `onlocation` event. The element supports `autolocate` for automatic retrieval when permission is already granted, `accuracymode` for precision control, and `watch` for continuous updates.

What makes this architecturally interesting is the evolution from the original generic `<permission>` element proposal. Feedback from Safari and Firefox teams indicated that a one-size-fits-all element introduced complexity around unique capability behaviors. The result is capability-specific elements—`<geolocation>` first, with `<usermedia>` for camera/microphone following.

For progressive enhancement, the element degrades gracefully. Browsers that don't support it treat it as `HTMLUnknownElement`, and child elements (like fallback buttons with traditional JS geolocation) render instead.

**Key takeaways:**
- Declarative element ensures location requests are user-initiated, reducing reflexive blocks
- Significantly less boilerplate than JavaScript Geolocation API
- Built-in recovery flows help users re-enable previously blocked permissions
- Polyfill available for cross-browser compatibility

**Link:** [Introducing the `<geolocation>` HTML element](https://developer.chrome.com/blog/geolocation-html-element)

---

## How Markdown Took Over the World

**TLDR:** Twenty years after its creation, Markdown—a plain text format created by John Gruber to solve a personal blogging problem—now controls every frontier AI system, powers documentation across GitHub, and runs on devices from phones to gaming consoles. It was given away freely and never monetized.

Anil Dash's retrospective on Markdown arrives at a poignant moment. The format that John Gruber created in 2004 to help bloggers avoid arcane HTML formatting now underlies every major AI system. When you prompt ChatGPT or Claude with complex instructions, you're using Markdown. The trillion-dollar AI industry's control mechanism for their most advanced platforms is a plain text format one person created for his blog.

The origin story matters because it illustrates how the internet actually works. Gruber was writing Daring Fireball, covering Apple when few believed in the company, and found HTML formatting too cumbersome for rapid blogging. The late Aaron Swartz, then seventeen, served as a brilliant (and reportedly difficult) beta tester who helped hone the format before its quiet debut in March 2004.

What's remarkable is the non-commercial nature of its creation. In 2004, people made open standards and shared them freely. If they unlocked billions in value for others, great. If they got credit, nice. But mostly you solved problems for yourself and like-minded people—and maybe prevented some corporation from creating a terrible proprietary alternative.

The ten technical reasons for Markdown's success deserve study: great branding (mark*down* vs mark*up*), solving real problems, building on existing email formatting behaviors, being unencumbered by IP, and working with "view source" culture. These principles apply far beyond text formatting.

**Key takeaways:**
- Markdown now controls AI systems, GitHub documentation, and countless applications
- Created by one person, tested by a teenager, given away freely
- Success came from solving real problems and building on existing behaviors
- The non-commercial, open-source ethos enabled ubiquitous adoption

**Link:** [How Markdown Took Over the World](https://www.anildash.com/2026/01/09/how-markdown-took-over-the-world/)

---

## Web Dependencies Are Broken. Can We Fix Them?

**TLDR:** Lea Verou argues that JavaScript's dependency management for web applications is fundamentally broken. While Node, Python, and Rust have first-class package management, the web requires bundlers for basic dependency resolution—an advanced tool for a basic need that creates massive usability cliffs.

This is a comprehensive critique that deserves wide reading. In healthy ecosystems, you don't ponder whether to use dependencies. You install them, use them, move on. "Dependency-free" isn't a badge of honor. But on the web, the moment you add your first dependency, everything changes—which bundler, how to configure it, how to deploy with it.

Verou catalogs the current workarounds and their failures: raw `node_modules` imports (wasteful, insecure, breaks encapsulation), public CDN imports (security risk, additional point of failure), copy-to-local scripts (no awareness of transitive dependencies). All approaches fail catastrophically when dependencies themselves use dependencies.

Import maps looked promising but violate three invariants: locality (declarations live in HTML, not JS), composability (they don't compose across dependencies), and scalability (mapping every transitive dependency isn't viable without tooling). Import maps don't eliminate bundlers—they recreate them in JSON form while adding HTML dependency and worse latency.

The proposed solutions are radical but intellectually honest. External import maps (removed from spec due to lack of implementer interest despite overwhelming demand). Import maps via JavaScript imports. Import maps via HTTP headers. And most radically: treating specifiers as a type of URL with a `specifier:` protocol that can be routed by servers.

For architects, the implications are clear: the current state is unsustainable. As AI introduces less technical developers to web development, their confusion forces us to examine an ecosystem that normalized immense complexity as "just how things are."

**Key takeaways:**
- Web dependency management requires advanced tools (bundlers) for basic needs
- All current workarounds fail when dependencies have their own dependencies
- Import maps don't solve the problem—they recreate it in JSON form
- Fundamental platform changes may be necessary to fix this properly

**Tradeoffs:**
- Bundlers provide working dependency management but create massive complexity overhead
- Simpler approaches sacrifice security, encapsulation, or break with transitive dependencies

**Link:** [Web Dependencies Are Broken. Can We Fix Them?](https://lea.verou.me/blog/2026/web-deps/)

---

## Date is Out, Temporal is In

**TLDR:** JavaScript's `Date` constructor—hastily copied from Java in 1995 and deprecated by Java in 1997—is finally getting replaced by `Temporal`, a modern API that treats dates as immutable values. Temporal operations return new objects rather than mutating existing ones.

This piccalilli article captures why Date inspires such visceral dislike among developers. Month 10 is November. Two-digit year strings between 33-99 become 1900s dates but 32-49 become 2000s. String dates with hyphens vs. slashes parse differently. It's consistently inconsistent.

But the deeper problem isn't syntax—it's mutability. Despite representing immutable real-world concepts like "January 1st, 2026," JavaScript dates are mutable objects. When you pass a Date to a function that modifies it, you've modified the original. This leads to subtle bugs where reordering output can change results.

Temporal addresses this fundamentally. Instead of a constructor, it's a namespace object containing classes like `Instant`, `PlainDate`, `PlainDateTime`, and `ZonedDateTime`. The critical difference is that Temporal methods return new objects rather than mutating existing ones. You can chain operations like `today.add({ months: 1, days: 1 }).subtract({ years: 2 })` without affecting the original.

The API is immediately understandable: `Temporal.Now.plainDateISO()` gives today's date. `today.add({ days: 1 })` adds a day. Time zones work properly. Daylight savings exists as a concept. Formatting stays consistent across operations.

Temporal reached stage three of standardization and landed in Chrome and Firefox. Now is the time to experiment before final implementations.

**Key takeaways:**
- Temporal treats dates as immutable—operations return new objects
- API is intuitive: `Temporal.Now.plainDateISO()`, `date.add({ days: 1 })`
- Proper time zone support and calendar system awareness
- Available in Chrome and Firefox; stage 3 standardization

**Link:** [Date is out, Temporal is in](https://piccalil.li/blog/date-is-out-and-temporal-is-in/)

---

## What Happened to WebAssembly?

**TLDR:** WebAssembly sees extensive real-world use in Godot games, Figma's C++ conversion, Stackblitz containers, and Flash emulation—but mostly invisibly to application developers. Its primary value is bridging language gaps and enabling strong security isolation, not replacing JavaScript.

The article tackles the common perception that WebAssembly was oversold. Was it another JVM applet scenario? The answer requires understanding what WebAssembly actually is: a language, not magic performance pixie dust.

WebAssembly is a close approximation of assembly language—close enough to compile to most assembly languages without significant speed tradeoffs. You can compile many languages to Wasm (Rust, C, Zig, Go, Kotlin, even Python and Ruby via their runtimes). Your browser includes a Wasm engine, making it an attractive compilation target.

The security story differentiates Wasm from JVM. Its "deny-by-default" architecture, minimal instruction set, and linear memory create process-like isolation within a single process. Cloudflare uses this for V8 isolates—running untrusted code efficiently. Fermyon advertises sub-millisecond spinup times for Wasm programs.

But why don't we see major websites built entirely with Wasm frameworks? Because Wasm's primary use is bridging language gaps. Squoosh uses image libraries that don't exist in JavaScript. Figma converts C++ to browser-runnable code. Library authors use it; application developers mostly don't notice.

Standards development continues with significant internal controversy. There's desire for advancement but fear of irreversible missteps. For now, Wasm remains a powerful tool for specific use cases rather than a JavaScript replacement.

**Key takeaways:**
- WebAssembly excels at language bridging and security isolation
- Real-world use is often invisible—in dependency trees, not application code
- Security guarantees enable efficient untrusted code execution
- Won't replace JavaScript; will continue enabling capabilities JavaScript can't provide

**Link:** [What Happened To WebAssembly](https://emnudge.dev/blog/what-happened-to-webassembly/)

---

## Astro's 2025 Year in Review

**TLDR:** Astro reached 55,000 GitHub stars (top 300 repos globally), grew npm downloads from 360K to 900K weekly, and shipped live content collections, responsive images, fonts API, sessions, and CSP support. Astro v6 launches early 2026.

The numbers tell a compelling story: 2.5x growth in weekly downloads, 113 releases in 2025, and recognition in GitHub Octoverse as one of the fastest-growing languages. Starlight (Astro's documentation theme) now powers docs for Cloudflare, Google, Microsoft, Netlify, OpenAI, and WPEngine.

Key features landed throughout 2025. Live content collections enable runtime data fetching with type safety—no rebuilds needed for content updates. Responsive images handle srcset and sizes automatically. The Fonts API manages preload links and fallbacks. Sessions provide server-side state storage. CSP support uses hash-based approaches working across all rendering modes.

The sustainability story is notable: Mux, Webflow, Cloudflare, and Stainless all became sponsors, with Webflow and Cloudflare each contributing $150,000. Cloudflare and Netlify even collaborated on open source support—competitors uniting for the web ecosystem.

Looking ahead, v6 brings workerd support for Cloudflare dev mode, Zod 4 updates, and stabilization of experimental features. Route caching will provide declarative cache control, and tracing hooks will enable observability integration.

**Key takeaways:**
- 2.5x growth in npm downloads; 55K GitHub stars
- Live content collections enable runtime type-safe data fetching
- Major sponsors include Cloudflare, Webflow, Mux, and Stainless
- v6 launches early 2026 with route caching and observability hooks

**Link:** [2025 Year in Review](https://astro.build/blog/year-in-review-2025/)

---

*This article was generated from the Frontend Focus newsletter. The summaries reflect interpretations of the original content and may not capture every nuance from the source materials.*