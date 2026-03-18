---
title: "Frontend Focus #733: Vite 8, Astro 6, Memory Leaks at Scale, and the 49MB Web Page"
excerpt: "Vite 8 ships Rolldown as its unified Rust bundler, Astro 6 brings a Fonts API and live content collections, a 500-repo study exposes the silent epidemic of frontend memory leaks, and a teardown of news sites reveals the 49MB page load problem."
publishedAt: 2026-03-18
slug: frontend-focus-733-vite-8-astro-6-memory-leaks-49mb-web-page
hashtags: "#frontend-focus #frontend #webdev #vite #astro #css #memory-leaks #performance #tooling #contrast-color #json-modules #generated #en"
---

# Frontend Focus #733: Vite 8, Astro 6, Memory Leaks at Scale, and the 49MB Web Page

This week's Frontend Focus is absolutely packed. We have two massive framework releases in Vite 8 and Astro 6, a research study that will make you audit every useEffect in your codebase, and a rant about news websites that will have you nodding your head so hard you might need a chiropractor. Let's dig in.

## Vite 8.0 Is Out

**TLDR:** Vite 8 replaces its dual-bundler architecture (esbuild + Rollup) with Rolldown, a single Rust-based bundler delivering 10-30x faster builds while maintaining full plugin compatibility.

**Summary:** This is the most significant architectural change since Vite 2, and it has been a long time coming. Since its earliest versions, Vite relied on esbuild for fast development compilation and Rollup for production bundling. That dual-bundler approach worked well but introduced two separate transformation pipelines, two plugin systems, and an ever-growing pile of glue code to keep them in sync. Rolldown, built by the VoidZero team in Rust, resolves this into a single unified bundler that matches esbuild's speed while supporting the same plugin API as Rollup. The migration was deliberate and community-driven, starting with a separate rolldown-vite preview package before landing in the Vite 8 beta. Real-world results are impressive: Linear saw production builds drop from 46 seconds to 6 seconds, Ramp reported a 57% reduction, and Beehiiv saw 64% faster builds. Beyond Rolldown, Vite 8 ships integrated devtools, built-in tsconfig paths support, Wasm SSR support, and browser console forwarding that automatically activates when a coding agent is detected. The new plugin-react v6 uses Oxc instead of Babel, shrinking installation size. Looking ahead, the team is working on a Full Bundle Mode that could deliver 3x faster dev server startup and 10x fewer network requests.

**Key takeaways:**
- Rolldown replaces both esbuild and Rollup as a single Rust-based bundler with 10-30x faster builds
- Most existing Vite plugins work out of the box without changes
- Linear went from 46s to 6s production builds; other companies report 38-64% reductions
- Requires Node.js 20.19+ or 22.12+
- Install size is approximately 15 MB larger due to bundled lightningcss and the Rolldown binary

**Why do I care:** If you ship anything with Vite, this is the upgrade you have been waiting for. The unified pipeline eliminates an entire class of "works in dev, breaks in prod" bugs, and the build speed improvements are not incremental, they are generational. The migration path is well-documented, and the compatibility layer auto-converts existing config. Do it this sprint.

**Link:** [Vite 8.0 is out!](https://vite.dev/blog/announcing-vite8)

---

## Astro 6.0

**TLDR:** Astro 6 introduces a built-in Fonts API, Content Security Policy support, live content collections, a redesigned dev server powered by Vite's Environment API, and an experimental Rust compiler.

**Summary:** Astro 6 is a broad release that touches nearly every layer of the framework. The headline feature for most teams will be the redesigned dev server, which now runs your actual production runtime during development via Vite's Environment API. For Cloudflare users, this is transformative: the rebuilt adapter runs workerd at every stage, so you develop directly against Cloudflare's platform APIs with full access to KV, D1, R2, and Durable Objects locally. No more simulation layers or "works in dev, breaks on deploy" surprises. The built-in Fonts API handles the surprisingly complicated work of self-hosting, generating optimized fallbacks, and adding preload links from a simple config declaration. Live Content Collections are now stable, fetching content at request time using the same APIs as build-time collections, which means CMS content and editorial updates go live instantly without rebuilds. The Content Security Policy API is a genuine first among JavaScript meta-frameworks, automatically hashing scripts and styles and generating CSP headers for both static and dynamic pages. On the experimental front, there is a new Rust compiler that started as an AI experiment and quickly proved faster and more reliable than the existing Go-based compiler. Queued rendering shows early benchmarks of 2x faster rendering, and route caching provides a platform-agnostic way to cache server-rendered responses. Astro 6 requires Node 22 or later and upgrades to Vite 7, Shiki 4, and Zod 4.

**Key takeaways:**
- Dev server now runs your actual production runtime, eliminating dev/prod behavior mismatches
- Cloudflare adapter runs workerd at all stages with full bindings access
- Built-in Fonts API handles self-hosting, fallbacks, and preload with minimal config
- Live Content Collections fetch at request time with no rebuild required
- First meta-framework with built-in CSP for both static and dynamic pages
- Experimental Rust compiler already outperforms the Go compiler in some cases

**Why do I care:** The dev server redesign alone justifies the upgrade for anyone deploying to non-Node runtimes. The Fonts API and CSP support eliminate two categories of "I always meant to set that up properly" tech debt. If you are on Astro, upgrade now. If you are evaluating frameworks, this release makes a strong case.

**Link:** [Astro 6.0](https://astro.build/blog/astro-6/)

---

## Frontend Memory Leaks: A 500-Repository Study

**TLDR:** An empirical study scanning 500 public repos found that 86% have at least one missing-cleanup pattern, with 55,864 potential leak instances. Benchmarks confirm each unhandled pattern leaks approximately 8 KB per mount/unmount cycle.

**Summary:** This is one of the most thorough pieces of frontend research published this year. The author built AST-based detectors for React, Vue, and Angular, pointed them at 500 well-maintained open-source repositories including Next.js, Kibana, and Element Plus, and scanned 714,217 files. The results are sobering: 430 of 500 repos had at least one missing-cleanup pattern. Timers account for 43.9% of all findings, event listeners 19%, and subscriptions 13.9%. The controlled benchmarks are where it gets really interesting. Five scenarios across all three frameworks, each run 50 times with forced garbage collection, show remarkably consistent results: approximately 8 KB of retained heap growth per cycle when cleanup is missing, versus near-zero when it is handled properly. The effect sizes are enormous, with Cohen's d values above 20 meaning the distributions have zero overlap. The study maps these findings to real-world scenarios: a dashboard user switching views 60 times during an incident accumulates nearly 1 MB of retained memory from just two unhandled patterns per view. On mobile, where iOS Safari kills tabs at 80-120 MB, this trajectory reaches tab-kill territory within a moderate session. The fixes are consistently one-line additions: a cleanup return in useEffect, an onUnmounted companion to onMounted, a takeUntil in Angular subscriptions. The tooling gap is real. ESLint catches missing dependencies but not missing cleanup returns. Vue has no official rule for unstored watch stop handles. Angular warns about missing ngOnDestroy but cannot detect incomplete unsubscription.

**Key takeaways:**
- 86% of 500 well-maintained repos have at least one missing-cleanup pattern
- All five benchmark scenarios leak at approximately 8 KB per cycle, regardless of mechanism
- Timers are the number one offender at 43.9% of all findings
- Mobile browsers kill tabs at 80-120 MB, reachable within moderate sessions with stacked leaks
- The fixes are one-line additions: cleanup returns, stop handles, unsubscribe calls

**Why do I care:** This study converts "you should clean up your subscriptions" from general advice into a quantifiable engineering decision. If you lead a frontend team, the 30-minute action plan at the top of the article is worth your time today. Start with timers, then event listeners, then subscriptions. The fact that existing linting tools miss these patterns means you need deliberate auditing.

**Link:** [Frontend Memory Leaks: A 500-Repository Static Analysis and Five-Scenario Benchmark Study](https://stackinsight.dev/blog/memory-leak-empirical-study/)

---

## The 49MB Web Page

**TLDR:** A teardown of modern news websites reveals that a single New York Times article page makes 422 network requests, downloads 49 MB of data, and delivers actual content in roughly 11-15% of the viewport.

**Summary:** This article is a cathartic read for anyone who has ever opened a news site and felt their laptop fan spin up. The author went to the New York Times for four headlines and was greeted with 49 megabytes of data and a two-minute page settle time. To put that in perspective, that single page load exceeds the size of Windows 95 and represents roughly 10 to 12 full-length MP3 songs from 2006. The teardown goes beyond raw size into the mechanics of what is happening: a sprawling programmatic ad auction running entirely in the client browser, with dozens of concurrent bidding requests to exchanges firing before the user finishes reading the headline. The browser downloads and compiles megabytes of JavaScript to facilitate real-time bidding, all while a parallel surveillance apparatus fires POST beacons to tracking endpoints and drops invisible pixels for cross-site identity stitching. The teardown of Economic Times is particularly damning: double simultaneous Google sign-in prompts, viewport suffocation where ads consume 85% of the screen, and an unacceptable interaction cost requiring multiple dismiss actions before a single sentence is readable. The author proposes concrete fixes: zero pop-ups before 60 seconds of dwell time, serialized onboarding queues triggered by behavior rather than page load, reserved space for async content to prevent CLS, and non-intrusive newsletter signups injected between paragraphs for engaged readers. The piece closes with a reminder that text-only alternatives like text.npr.org and lite.cnn.com still exist, proving that audiences long for content-first experiences.

**Key takeaways:**
- A single NYT article page: 422 requests, 49 MB, two-minute settle time
- The ad auction runs client-side, downloading megabytes of JS before content renders
- Actual article content occupies 11-15% of viewport on many news sites
- CLS from late-loading ads destroys spatial memory and reading flow
- Google penalizes these patterns for SEO while Google Ads enables them

**Why do I care:** Beyond the entertainment value, this is a masterclass in UX anti-patterns to avoid. If you are building anything that embeds third-party content or ads, the specific fixes proposed here are worth implementing: reserve ad slot dimensions, serialize overlays, and respect the reader's cognitive budget before asking for anything.

**Link:** [The 49MB Web Page](https://thatshubham.com/blog/news-audit)

---

## Monitor and Improve Your Web App's Load Performance with Network Efficiency Guardrails

**TLDR:** Microsoft Edge introduces Network Efficiency Guardrails, a browser feature that monitors your app's network resource usage and reports inefficient loading patterns like uncompressed text, oversized images, and large data URLs.

**Summary:** When large web applications assemble content from many independent sources, all competing for the same network connection, congestion builds up and user experience suffers. Microsoft's new Network Efficiency Guardrails feature addresses this by letting developers opt in to browser-level monitoring of resource loading patterns. Once enabled via a Document Policy header, the browser automatically identifies inefficient patterns and reports them through the standard Reporting API. The initial criteria flag three specific issues: text-based resources that are not HTTP-compressed, images larger than 200 KB, and data URLs larger than 100 KB. These thresholds were chosen from aggregate real-world data and Web Almanac findings. Violations appear in the DevTools Console as error messages and in the Application tool under the Reporting API section. For production monitoring, you configure a reporting endpoint on your server to collect reports from real user devices. The feature is available in Edge 146 behind the Experimental Web Platform features flag. The team is exploring fine-tuning thresholds, adding new guardrails, and cross-frame reporting for embedded content monitoring.

**Key takeaways:**
- Opt in via Document-Policy header, violations reported through standard Reporting API
- Flags uncompressed text, images over 200 KB, and data URLs over 100 KB
- Available in Edge 146 behind experimental flag
- Works in both DevTools and production with a server reporting endpoint
- Actively seeking feedback on thresholds and new guardrail categories

**Why do I care:** This is genuinely useful for teams managing complex applications with embedded third-party content where you cannot control every resource. Rather than auditing manually, the browser tells you what is dragging performance down. Even if you are not on Edge, the thresholds themselves are good benchmarks to enforce in your build pipeline.

**Link:** [Monitor and improve your web app's load performance](https://blogs.windows.com/msedgedev/2026/03/17/monitor-and-improve-your-web-apps-load-performance/)

---

## contrast-color() Beyond Black and White

**TLDR:** Two techniques extend CSS contrast-color() beyond its default black-or-white output: tinting with color-mix() and building custom color palettes via style queries and the if() function.

**Summary:** The contrast-color() function landed in Chrome 147 and is already in Firefox and Safari. It takes any color and returns black or white based on which provides highest contrast. The original spec included testing against a list of color options, but that did not make the v1 cut. Una Kravets demonstrates two workarounds. The first method mixes a brand color into the contrast-color result using color-mix() in oklch, producing tinted variants rather than stark black or white. A 10-25% mix for light colors and 30-40% for dark colors keeps things accessible while adding personality, though manual contrast checking is still required. The second method uses registered custom properties, style queries, and the new if() function to build entirely custom palettes. By registering a --contrast-color property and setting it to contrast-color() of the background, descendant elements can query whether they are on a light or dark surface and select from predefined color pairs. This treats contrast-color() as a light-versus-dark detector rather than a final color value, unlocking dynamic theming possibilities. The if() function is Chrome 137+ only, but the same logic works with container style query blocks for broader support, and style queries are an Interop 2026 feature expected to land in Firefox soon.

**Key takeaways:**
- contrast-color() is now in Chrome 147, Firefox, and Safari
- color-mix() can tint the black/white result with brand colors at controlled percentages
- Style queries plus if() enable fully custom light/dark palettes keyed off contrast-color()
- Both approaches require manual contrast accessibility validation
- Style queries are an Interop 2026 focus, expanding cross-browser support

**Why do I care:** If you are building design systems or component libraries with theming, this is the pattern to watch. Using contrast-color() as a detector rather than a final value is a clever architectural decision that will age well as browser support expands. Start experimenting now in progressive enhancement layers.

**Link:** [contrast-color() beyond black and white](https://una.im/advanced-contrast-color/)

---

## Native JSON Modules Are Finally Real

**TLDR:** Import attributes make JSON a first-class module type in JavaScript runtimes, replacing bundler-simulated imports with a platform-native mechanism that works in browsers, Node, Deno, and Bun.

**Summary:** For years, writing import config from "./config.json" looked like native JavaScript but was entirely a bundler illusion. The bundler read the JSON at build time, converted it to a JavaScript module, and made it feel native. With import attributes, the platform handles JSON modules directly using the syntax import config from "./config.json" with { type: "json" }. The with clause is not redundant verbosity; it is an explicit contract with the runtime that eliminates ambiguity about whether a file should be executed or parsed as data. The imported JSON becomes a default export that is parsed once, cached like any ES module, added to the module graph, and shared across every import site. In browsers, the server still needs to send the correct Content-Type header, and normal CORS rules apply. The key shift is from build-time convenience to a runtime primitive. Bundlers are not obsolete, as they still handle inlining, asset hashing, code splitting, and optimization pipelines, but for the act of importing JSON as a module the platform has caught up. This pattern extends beyond JSON: CSS module scripts already use the same import attribute syntax, and more structured module types are expected to follow.

**Key takeaways:**
- JSON modules now work natively in all major runtimes with import attributes
- The with { type: "json" } clause provides an explicit type contract for security
- Imported JSON is parsed once, cached, and shared via standard ESM semantics
- Bundlers remain useful for optimization but are no longer required for JSON imports
- The import attributes pattern is extensible to CSS modules and future structured types

**Why do I care:** If you maintain any library or application that imports JSON, this is worth understanding even if you are not changing anything today. The shift from bundler-simulated to platform-native imports reduces build complexity and aligns your mental model with what the runtime actually does. For new projects, you can start using this syntax immediately.

**Link:** [Native JSON modules are finally real](https://allthingssmitty.com/2026/03/16/native-json-modules-are-finally-real/)

---

## Too Much Color: How Much Precision Do CSS Colors Actually Need?

**TLDR:** Through rigorous perceptual analysis using Delta-E formulas, Keith Cirkel demonstrates that 3 decimal places is sufficient for oklch/oklab channels, 1 decimal place for lab/lch, and integers for sRGB notations, with interactive demos proving the point.

**Summary:** While working on color minification for csskit, Keith Cirkel dove deep into the question of how much decimal precision CSS colors actually need. The answer comes from Delta-E, the CIE formula for measuring perceptual color difference, where a Just Noticeable Difference is 2.0 for dE00 and 0.02 for dEOk. Through brute-force testing and interactive demos, the article establishes that 2 decimal places is the perceptual limit for static colors in oklch, but falls apart when colors are chained through calculations. Repeatedly scaling chroma by 0.9 causes 2dp values to get stuck due to rounding, while 3dp never exceeds 0.001 dEOk even after hundreds of iterations. The analysis maps precision requirements across every CSS color space: oklch and oklab need 3dp for L, C, a, and b channels (0-1 range), 1dp for hue (0-360 range). Lab and lch operate on larger scales and need only 1dp for all channels. sRGB notations quantize to 8-bit internally so extra precision evaporates. The article also covers cross-space conversions, alpha precision, and how browsers store colors internally (spoiler: they use f32 and do nothing clever). The final implementation for csskit is just a static lookup table from color space to per-channel decimal places, no runtime dE computation needed.

**Key takeaways:**
- 3 decimal places is the safe ceiling for oklch/oklab (0-1 range channels)
- 1 decimal place suffices for lab/lch (0-100 range channels) and hue
- 2dp works for static colors but fails when colors are chained through calculations
- sRGB is quantized to 8-bit internally, making extra precision pointless
- Browsers store colors as f32 with no internal rounding optimization

**Why do I care:** If you are building a design system, writing a CSS minifier, or just hand-tuning color values, this gives you a principled answer instead of guesswork. Stop copying 6-decimal oklch values from your color picker. Round to 3 and move on. If you maintain CSS tooling, the static lookup table approach is elegant and worth adopting.

**Link:** [Too Much Color](https://www.keithcirkel.co.uk/too-much-color/)

---

## Building Dynamic Toggletips Using Anchored Container Queries

**TLDR:** A tutorial demonstrating how to build toggletips with dynamically positioned carets using CSS anchored container queries, popovers, anchor positioning, modern attr(), and corner-shape as progressive enhancements.

**Summary:** Anchored container queries, available from Chrome 143, add another dimension to the container query family alongside size, style, and scroll-state queries. This tutorial uses them to build toggletips where a caret arrow flips to the appropriate side depending on available space. The implementation starts with popover markup for semantic toggletip behavior and anchor positioning for spatial relationships. The modern attr() function allows reusing popovertarget values as anchor names without manual per-element CSS, with a fallback block for browsers without support. The toggletips use position-area for placement, position-try: flip-inline for overflow handling, and container-type: anchored to enable querying the active fallback position. The caret itself is a CSS-generated pseudo-element anchored to the toggletip, with anchored container queries determining which side to render on. The query syntax is intuitive: @container anchored(fallback: none) matches when no fallback is active, and @container anchored(fallback: flip-inline) matches when the toggletip has flipped. Progressive enhancement is layered throughout. Without anchored container query support, toggletips work but without carets. The corner-shape: squircle property adds subtle rounded corners where supported, and corner-shape: scoop creates organic caret shapes. The whole approach degrades gracefully, and as features become baseline, cleanup is straightforward.

**Key takeaways:**
- Anchored container queries (Chrome 143+) can query the active fallback position of anchor-positioned elements
- container-type: anchored is a new container type for this purpose
- Modern attr() eliminates per-element anchor naming boilerplate
- Progressive enhancement ensures functionality across support levels
- corner-shape: squircle and scoop add visual polish where available

**Why do I care:** Anchor positioning and popovers are already baseline. Anchored container queries add the missing piece for context-aware positioned elements. If you build UI component libraries, this pattern solves the "which side is my tooltip on" problem without JavaScript. Start building with progressive enhancement now.

**Link:** [Building dynamic toggletips using anchored container queries](https://piccalil.li/blog/building-dynamic-toggletips-using-anchored-container-queries/)

---

## 4 Reasons That Make Tailwind Great for Building Layouts

**TLDR:** Tailwind shines for layouts because layout styles are inherently HTML-structure-dependent, layouts are hard to name, context changes require inline flexibility, and responsive variants can be created on the fly.

**Summary:** Zell Liew makes a focused case for Tailwind specifically in the context of layouts, not general styling. The argument centers on four observations. First, layout styles are deeply coupled to HTML structure, and separating them into CSS files forces you to mentally reconstruct that structure when reading the code. A grid definition in HTML with Tailwind utilities or CSS variables makes the layout immediately visible. Second, layouts are genuinely hard to name well. A class like .two-columns could mean a dozen different configurations, and the ambiguity costs more than it saves. Letting numbers describe the layout directly eliminates that naming tax. Third, identical layout patterns often need contextual adjustments like different gap values, and creating modifier classes for one-off variations adds unnecessary CSS. Fourth, responsive variants can be declared inline for unique layouts without polluting your stylesheet with single-use breakpoint rules. The article advocates for a specific approach: using CSS custom properties within Tailwind's arbitrary value syntax to make layouts crystal clear, as in grid-simple with --cols:3 and --span:2, rather than littering HTML with dozens of utility classes. This is presented as a sample from a course on using Tailwind and CSS synergistically rather than as opposing forces.

**Key takeaways:**
- Layout CSS is inherently coupled to HTML structure; colocating them reduces cognitive overhead
- CSS variables in Tailwind arbitrary values produce highly readable layout declarations
- One-off contextual adjustments avoid unnecessary modifier classes
- Responsive variants inline keep CSS focused on reusable patterns
- The approach advocates synergy between Tailwind utilities and CSS, not Tailwind-everything

**Why do I care:** This is a measured take that sidesteps the usual Tailwind debates. Even if you are not a Tailwind user, the argument about layout-structure coupling is sound. The CSS variable approach demonstrated here is worth considering for any utility-first setup, as it makes layout intent visible at the HTML level without the typical wall-of-classes problem.

**Link:** [4 Reasons That Make Tailwind Great for Building Layouts](https://css-tricks.com/4-reasons-that-make-tailwind-great-for-building-layouts/)

---

## Astro HTML Minification with HTML Minifier Next

**TLDR:** A two-step setup to replace Astro's built-in HTML minification with HTML Minifier Next for more aggressive output optimization.

**Summary:** Jens Oliver Meiert demonstrates a quick integration of HTML Minifier Next into Astro projects for more effective HTML minification than what Astro ships with by default. The setup involves installing the package as a dev dependency and adding a custom Astro integration that hooks into astro:build:done, recursively finding all HTML files in the output directory and running them through the minifier with its comprehensive preset. The integration is straightforward: a function that returns a named integration object with a single hook, using standard Node.js file system operations to read, minify, and write each file. The comprehensive preset provides competitive results out of the box, but you can switch to the conservative preset or fully customize the options. Jonas Geiler also provides a wrapper package called astro-html-minifier-next for those who prefer a pre-built integration.

**Key takeaways:**
- HTML Minifier Next produces more effective minification than Astro's default
- Setup is a single integration hook in astro.config.js
- The comprehensive preset handles inline CSS, JS, and SVG minification
- A community wrapper package is available for simpler setup

**Why do I care:** If you are shipping a static Astro site at scale, every byte counts. This is a five-minute optimization that requires no ongoing maintenance. The pattern of hooking into astro:build:done for post-processing is also useful for other build-time optimizations.

**Link:** [Astro: How to Set Up More Powerful HTML Minification](https://meiert.com/blog/astro-html-minification/)

---

## Building a Scroll-Reactive 3D Gallery with Three.js

**TLDR:** A creative coding tutorial building a depth-based image gallery where scroll drives camera movement through Z-space, each image carries a color palette that shifts the background, and velocity becomes a reusable motion signal.

**Summary:** Houmahani Kane walks through building a gallery that feels less like a slideshow and more like walking through a mood. The system is built on three core ideas: depth where each image lives on its own Z-layer, mood where every image defines a palette driving the background gradient, and motion where scroll speed becomes a signal that lifts or calms the scene. The implementation starts with a clean class-based architecture where Engine owns the scene, Gallery owns the planes, Scroll owns camera movement, and Background owns the mood. Planes are spaced along the negative Z axis, and smooth scroll interpolation using lerp gives the camera a cinematic following quality. A velocity system captures how fast the user scrolls, separating raw input from smoothed output to create a "breath" effect that persists after the user stops. The mood system drives a fragment shader with two soft gradient blobs per image palette, blending between palettes as the camera moves through depth. Velocity modulates brightness and plane tilt, while mouse position adds subtle parallax. A trail system using Catmull-Rom splines creates a tapered line that winds ahead of the camera like wind through the gallery. The result is an editorial presentation format suitable for product collections, campaigns, or visual archives.

**Key takeaways:**
- Scroll velocity as a reusable signal is an underexplored creative coding pattern
- Lerp-based camera smoothing with clamped bounds creates a contained spatial experience
- Per-image color palettes driving background gradients add editorial intentionality
- The class-based architecture keeps each concern under a few hundred lines
- The pattern is adaptable for product showcases, campaigns, and portfolios

**Why do I care:** Even if you never build a 3D gallery, the scroll velocity abstraction is a pattern worth stealing. Treating how fast someone scrolls as a first-class signal that drives multiple visual layers is applicable to any scroll-driven experience. The architectural decisions around separation of concerns are also solid.

**Link:** [Building a Scroll-Reactive 3D Gallery with Three.js](https://tympanus.net/codrops/2026/03/09/building-a-scroll-reactive-3d-gallery-with-three-js-velocity-and-mood-based-backgrounds/)
