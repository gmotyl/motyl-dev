---
title: "CSS Goes Native: @function Scope, field-sizing, Babel 8, and the Spatial Web"
excerpt: "A wide-ranging Frontend Focus edition covering CSS custom functions, form field auto-sizing, Babel's long-awaited v8 release, WASI 0.3 async, Apple's spatial HTML model element, and more."
publishedAt: "2026-06-18"
slug: "css-goes-native-function-scope-field-sizing-babel-8-spatial-web"
hashtags: "#frontend #webdev #css #javascript #webassembly #accessibility #performance #generated #en"
source_pattern: "Frontend Focus"
---

## The Scope Superpower Hiding in CSS @function

**TLDR:** CSS is getting native custom functions through the `@function` at-rule, and the scoping behavior that comes with it is turning out to be one of the most useful parts of the whole feature. This isn't just a syntax convenience — it changes how you think about reusable style logic.

**Summary:** For years, CSS custom properties gave us a way to parameterize styles, but they have always been global and inherited by default. The `@function` at-rule changes that fundamentally. When you define a function, the variables inside it are scoped to that function's body. They don't leak out. They don't inherit from the document tree. You get genuine encapsulation in CSS, which is something preprocessors like Sass have offered for a long time, but never natively in the browser.

What this means practically is that you can define a function that computes a value — say, a color mix, a fluid spacing step, or a easing curve — and the intermediate variables you use inside that computation stay invisible to the rest of your stylesheet. This matters enormously when you're building component libraries or design tokens, because right now any intermediate `--var` you use inside a complex calculation is technically accessible and overridable from anywhere in the DOM. The scope inside `@function` fixes that.

The feature is still at various stages of browser implementation, but it's worth understanding now because it's going to reshape how CSS architecture works. Think about all the patterns people have built with Sass mixins and functions specifically because CSS couldn't do it natively. Many of those patterns are about to become unnecessary. I find that genuinely exciting, even if it also means a bunch of existing tooling is going to feel redundant faster than people expect.

What the article avoids discussing is the performance story. Scope in CSS functions presumably means the browser can optimize function calls more aggressively than it can with inherited custom properties. That's worth watching as implementations mature.

**Key takeaways:**
- CSS `@function` introduces scoped variables that don't leak into the document's inheritance tree
- This enables true encapsulation in native CSS for the first time, similar to what Sass functions provide
- Intermediate computation variables stay private to the function body, making complex design token math safe to write

**Why do I care:** As someone who has watched the CSS preprocessor ecosystem evolve for over a decade, this is the moment where a significant chunk of Sass's function and mixin use cases evaporate. That's not a criticism of Sass — it's a sign the web platform is finally catching up. Any team building a design system should be tracking `@function` closely because the authoring model for reusable CSS logic is about to change in a meaningful way.

**Link:** [The scope superpower hiding in CSS @function](https://frontendfoc.us/issues/746)

---

## Introducing the MDN MCP Server

**TLDR:** Mozilla has launched an MCP server for MDN, letting AI coding tools like Claude Code pull up-to-date browser compatibility data and documentation on demand. The difference in accuracy compared to relying on a model's training data turns out to be substantial, especially for recently-shipped features.

**Summary:** The MDN MCP server is exactly the kind of infrastructure I've been wanting to see. AI coding assistants hallucinate browser support tables constantly. They get the big stuff right — yes, flexbox works everywhere — but ask about something that shipped in Firefox 151 or a CSS pseudo-class that just reached baseline, and you're in trouble. Mozilla ran a direct test: Claude Code with the MCP enabled versus without it, on four recently-shipped Firefox features. The results weren't even close. Without the MCP, Claude Code got browser support right in exactly one of four cases and, in one notable failure, confidently stated that Firefox had no plans to support the Web Serial API, citing an old "harmful" standards position, when in fact Firefox 151 had just shipped it.

The practical setup is simple. For Claude Code specifically, it's a single command to add the transport endpoint, and from that point your agent has live access to MDN's compatibility tables. The server is marked experimental, with a privacy notice covering the current phase. What struck me in the test results is that responses using the MCP were also roughly twice as fast, because the model didn't need to fetch and parse multiple HTML pages to triangulate current information — it just asked the MCP and got a structured answer back.

There's a broader point here worth sitting with. Language models trained on web content will always have a knowledge cutoff, and browser compatibility is one of the fastest-moving domains on the web. The MDN MCP is a practical fix for a real problem, not a demo. I'd argue this should be in every frontend developer's Claude Code setup by default.

What Mozilla isn't discussing directly is how this affects prompting discipline. If developers start assuming the MCP is always correct and always current, they may stop verifying things themselves. MDN is excellent but it has errors and lags occasionally. The MCP should make you more accurate, not more credulous.

**Key takeaways:**
- The MDN MCP server gives AI tools real-time access to browser compatibility data, fixing a major accuracy gap
- In Mozilla's own testing, Claude Code with the MCP got browser support right significantly more often than without it
- Setup for Claude Code is a single command; the server works with VS Code, Cursor, Zed, and other MCP-compatible clients

**Why do I care:** Browser compatibility mistakes are one of the most common sources of bugs in production frontend code, and they're notoriously hard to catch in code review. Having an agent that can check current baseline status inline while writing code is genuinely useful. This isn't about replacing MDN lookups — it's about making the lookup automatic and reliable.

**Link:** [Introducing the MDN MCP server | MDN Blog](https://developer.mozilla.org/en-US/blog/introducing-mdn-mcp-server/)

---

## Releasing Babel 8: ESM-Only, Drop ES5 Default, and a Smooth Migration Path

**TLDR:** Babel 8 is finally out after eight years, and it's not feature-packed — it's a deliberate modernization. ESM-only output, TypeScript types baked in, and evergreen browser targeting by default. The upgrade path is designed to be gentler than previous major versions.

**Summary:** Eight years is a long time to go without a major version, and Babel's team is very aware of the weight that carries. At 651 million weekly downloads, any breaking change they ship blocks hundreds of thousands of developers. That's not hyperbole, it's a reason for the extreme caution. Babel 8 ships no new features over Babel 7. What it does instead is clear technical debt: it's now ESM-only, it requires Node.js 22 or newer, it no longer compiles to ES5 by default, and every package now ships TypeScript types without needing separate `@types` packages.

The ES5 default change is the one most teams will actually notice. Before, `@babel/preset-env` would compile everything down to ES5 unless you explicitly told it otherwise. Now it defaults to Browserslist's defaults query, which currently means roughly ES2023 targets. The practical effect is smaller bundles and less unnecessary transpilation for the overwhelming majority of projects that haven't supported IE11 for years. If you're one of the rare cases that still needs ES5 output, you have to explicitly configure your targets — which is actually the right behavior.

The team is also being honest about their funding situation, which I respect. Donations have been declining while downloads have doubled in the last year. The Sovereign Tech Agency funded a significant chunk of this release, but that support ends soon. Open source infrastructure that serves 651 million downloads per week running on fumes is a systemic problem, not just a Babel problem.

One thing the announcement glosses over: removing `loose` and `spec` options in favor of `assumptions` is a conceptually better design, but the migration friction for large codebases with custom Babel configurations could be substantial. "Simpler than Babel 6 to 7" is a low bar given how painful that migration was.

**Key takeaways:**
- Babel 8 is ESM-only and requires Node.js 22+, with TypeScript types included in all packages
- The default compilation target changes from ES5 to evergreen browsers via Browserslist, reducing unnecessary transpilation
- No new features over Babel 7 — this is a modernization release, and security support for Babel 7 continues until June 2027

**Why do I care:** If you have a custom Babel setup — and most large projects do — the migration to Babel 8 requires deliberate attention, not just a version bump. The `loose`/`spec` removal and the polyfill injection changes are the most likely pain points. Build pipeline health is often neglected until it breaks, and a major Babel version is a good forcing function to audit what you're actually transpiling and why.

**Link:** [Releasing Babel 8 today: ESM-only, drop ES5 default, and a smooth migration path · Babel](https://babeljs.io/blog/2026/06/16/8.0.0/)

---

## Firefox 152 Developer Release Notes

**TLDR:** Firefox 152 ships the `field-sizing` CSS property for auto-sizing form controls, notification actions for service workers, and several new DOM conveniences. The experimental features list includes WebAssembly JS Promise Integration and a text module import proposal.

**Summary:** Firefox 152 is a solid release for frontend developers, headlined by `field-sizing: content` — a CSS property that lets form controls automatically resize to fit their content. This is huge for textarea and input elements where you've historically had to wire up JavaScript resize logic or use a library. It's joined by `SVGTextPathElement.side`, which exposes which side of a text path the text is drawn on, and new `AnimationEvent.animation` and `TransitionEvent.animation` properties that give you direct access to the associated animation object from within event handlers without having to call `getAnimations()` and filter manually.

On the DOM side, notification actions are now supported, meaning you can add interactive buttons to system notifications from a service worker without needing platform-specific native code. The `Element.getAnimations()` method also gains support for the `pseudoElement` option, so you can now target animations on a specific pseudo-element directly. And `Element.requestPointerLock()` adds `unadjustedMovement` for applications that need raw mouse input without OS-level acceleration, which is primarily a game development concern but useful in any precision-input context.

The experimental features are where things get interesting. WebAssembly JS Promise Integration is behind a flag, letting Wasm modules suspend and resume while waiting on JavaScript Promises. The TC39 Intl.Locale info proposal ships in nightly with the full set of locale instance methods. And `import ... with { type: "text" }` allows importing a module's source as a plain string, which opens up some interesting patterns for template authoring.

**Key takeaways:**
- `field-sizing: content` lets form controls auto-size to their content natively in CSS, removing common JavaScript resize workarounds
- `AnimationEvent.animation` and `TransitionEvent.animation` provide direct animation access in event handlers
- Notification actions support allows interactive buttons in service worker notifications

**Why do I care:** `field-sizing: content` is one of those properties that will quietly eliminate a category of JavaScript I've written dozens of times. Auto-expanding textareas are a solved problem in CSS now in Firefox 152, with Chrome support already in place. The main work is updating your mental model and removing the JavaScript you already have.

**Link:** [Firefox 152 release notes for developers (Stable) - Mozilla | MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/152)

---

## The CSS field-sizing Property

**TLDR:** `field-sizing: content` makes form controls shrink-wrap their content and grow dynamically as users type, without any JavaScript. It works on text inputs, textareas, file inputs, and select elements, each with nuanced behavior worth understanding.

**Summary:** The `field-sizing` property has two values: `fixed`, which is the default and preserves existing behavior, and `content`, which enables the auto-sizing behavior. When set to `content`, a text input starts at the width of its placeholder text (or just the cursor width if no placeholder exists), then expands as the user types, up to whatever maximum width constraints you define. A textarea grows in width until it hits a max-width, then starts adding rows. A file input shows just wide enough to display the current filename.

The `select` element behavior is slightly different. A dropdown adjusts its width to fit the currently-selected option rather than locking in the width of the longest option, which is the default. A multi-select listbox expands to show all options at once without requiring a scrollbar. These are subtle improvements to form UX that previously required JavaScript or careful manual sizing.

The important pairing is with `min-width` and `max-width`. If you set `field-sizing: content` with no minimum, the input shrinks to cursor width, which is nearly invisible. The right pattern is always to set both constraints alongside it. `maxlength` on the input also naturally caps the growth when the character limit is reached. The `size` attribute becomes irrelevant when `field-sizing: content` is active because content-based sizing takes over.

What the MDN documentation doesn't say explicitly is that this property is now supported in both Chrome and Firefox, making it effectively usable for most production contexts. Safari support is still coming, so a fallback to fixed sizing is important for any form that needs to work everywhere right now.

**Key takeaways:**
- `field-sizing: content` enables native auto-sizing for form controls with no JavaScript
- Always pair it with `min-width` and `max-width` to prevent invisible or unbounded inputs
- Browser support is strong in Chrome and Firefox; Safari support is still pending

**Why do I care:** Every time I've built a form with an auto-expanding textarea, I've written JavaScript to handle it. This property kills that pattern. It's not just a convenience, it also means the sizing behavior now works before JavaScript loads, which matters on slow connections and for progressive enhancement.

**Link:** [field-sizing CSS property - CSS | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/field-sizing)

---

## Localized Time Formatting Without JavaScript

**TLDR:** A proposal at WHATWG would extend the HTML `<time>` element to render localized, timezone-aware date and time displays natively in the browser, eliminating the need for JavaScript to handle the most common internationalization use case on the web.

**Summary:** The problem this proposal solves is one every server-side rendered application faces: you don't know the user's timezone at render time, so you either show a fixed timezone everyone has to mentally convert, use relative times that break with caching, guess from IP which is wildly imprecise, or ship synchronous JavaScript to replace the time after load — which creates a flash of wrong content. There has been wide consensus among browser vendors that this needs a native solution, and the proposed approach is to extend the `<time>` element with a `format` attribute and several supporting attributes for controlling precision, timezone display, calendar system, and 12/24-hour preferences.

The implementation strategy is clever. Rather than replacing the DOM content, which browser engineers flagged as problematic for performance and compatibility, the formatted time would be rendered through a UA shadow root. This keeps the visible text outside the normal DOM while still making it accessible to screen readers and other assistive technology. CSS pseudo-element selectors would allow styling individual parts of the date, like targeting just the month or weekday component separately.

The attribute names are drawn from Unicode MessageFormat 2, which is a thoughtful choice because it aligns with an emerging international standard rather than inventing new terminology. The locale is determined by walking the DOM to find the nearest `lang` attribute, so it integrates naturally with existing internationalization patterns. The feature would also handle Temporal types from the TC39 Temporal proposal for precise timezone-aware datetimes.

What the proposal doesn't yet address is live relative time formatting, the "2 minutes ago" pattern. That's acknowledged as important but left for future work. And there's no discussion of how this interacts with hydration in frameworks where the server-rendered fallback text and the browser-formatted text might differ visually during the transition.

**Key takeaways:**
- A `format` attribute on the `<time>` element would let browsers render localized, timezone-correct dates without JavaScript
- Formatting is rendered through a UA shadow root, avoiding DOM content replacement problems while remaining accessible
- Attribute names come from Unicode MessageFormat 2, aligning with international standards

**Why do I care:** This would make a real difference in server-rendered applications. The current solutions are all compromises. Having the browser handle timezone conversion natively, using the user's actual system locale and timezone, is the correct architecture. I'm keeping a close eye on how quickly browser vendors move on this after the WHATWG discussion.

**Link:** [Localized time formatting without JavaScript · Issue #12591 · whatwg/html](https://github.com/whatwg/html/issues/12591)

---

## WASI 0.3 Launched: Native Async for WebAssembly Components

**TLDR:** WASI 0.3 has been ratified with async as a first-class primitive in the WebAssembly Component Model, solving the coordination problem that made async Wasm components impossible to compose in WASI 0.2. The spec is stable and runtimes are landing support now.

**Summary:** The headline change in WASI 0.3 is that the host runtime, not each individual component, now owns the event loop. In WASI 0.2, every component that used async APIs had to bring its own event loop, and those event loops couldn't coordinate with each other. That made it impossible to compose two async components together. WASI 0.3 resolves this by adding `stream<T>`, `future<T>`, and `async` as first-class constructs in the Component Model's canonical ABI. The host manages scheduling, and components interact through streams and futures with clear ownership semantics.

The practical API simplification is dramatic. What used to require a three-step start/subscribe/finish dance in WASI 0.2 becomes a single async function call. The mapping is direct: `resource pollable` becomes `future<T>`, `resource input-stream` becomes `stream<u8>`, and the `poll()` function is replaced entirely by awaiting a future. This is how async systems should work — completion-based rather than readiness-based, which is how Linux's io_uring and Windows' IOCP work at the OS level.

For language bindings, this is transformative. Rust gets idiomatic async functions. Go's goroutines map naturally onto the async ABI because the Component Model supports both stackful and stackless coroutines. JavaScript, Python, and C# support is in progress. The HTTP interface gets a significant reorganization around two worlds — `wasi:http/service` for standard HTTP handlers and `wasi:http/middleware` for request forwarding chains. Service chaining between components can now bypass the network entirely, reducing inter-service call latency from milliseconds to nanoseconds.

The framing around "six orders of magnitude" performance improvement for co-located microservices is exciting but worth some skepticism. Real applications won't all collapse into single-process component compositions. Network boundaries serve purposes beyond just communication — they provide isolation, independent deployability, and fault containment. WASI 0.3 gives you a choice that didn't exist before, which is valuable even if most production systems won't use it everywhere.

**Key takeaways:**
- WASI 0.3 makes async native to the Component Model, allowing async components to be composed without event loop conflicts
- Wasmtime 46 will ship WASI 0.3 with Component Model Async enabled by default; Jco for JavaScript follows shortly
- Service chaining allows directly composed components to communicate without network overhead

**Why do I care:** WebAssembly on the server is approaching the point where it can replace entire categories of microservice infrastructure. The async story was the last major architectural gap. WASI 0.3 closing that gap means the "run any language in Wasm" promise is much closer to production-ready for real distributed systems work.

**Link:** [WASI 0.3 Launched](https://bytecodealliance.org/articles/WASI-0.3)

---

## Today, Frontend Masters Becomes Master.dev

**TLDR:** Frontend Masters is rebranding to Master.dev after customer feedback made clear the name no longer reflects what they actually teach, which now includes Go, Rust, Python, DevOps, databases, AI engineering, and much more.

**Summary:** This is a rebrand I've seen coming for a while. Frontend Masters has had a name problem for years — it says "frontend" but their most-watched courses include complete Go for professional developers, Rust, enterprise Java with Spring Boot, cloud infrastructure, Linux, Git, containers, and SQL. Four of their ten most popular courses right now are about AI: Claude Code, AI Engineering Fundamentals, AI Agents Fundamentals, and Practical Prompt Engineering. Calling yourself Frontend Masters when half your audience is there for backend and infrastructure skills is actively confusing to anyone who hasn't heard of you before.

The rebrand to Master.dev is straightforward in its logic. "Master your craft. All of it." The mission expands to match what they already do. The courses aren't going anywhere. The instructors aren't changing. Marc Grabanski is clear in the announcement that this came directly from member feedback in their most recent survey — not from internal strategy ambitions, but from customers telling them the name was getting in the way.

What I appreciate about how this is framed is the honesty about the risk they were accepting by keeping the old name. The concern with any rebrand is confusing people who already know you. But the larger risk, as they correctly identified, is failing to reach every developer who sees "Frontend Masters" and correctly concludes it's not for them. That's a much larger audience to miss.

What the announcement doesn't address at all is SEO and domain authority implications. "Frontend Masters" has enormous search recognition. How they manage that transition — particularly for search traffic that currently lands on courses via "frontend masters [topic]" queries — will be worth watching over the next year.

**Key takeaways:**
- Frontend Masters is rebranding to Master.dev to reflect a curriculum that spans frontend, backend, DevOps, AI, and systems programming
- The rebrand came from direct member feedback, not internal repositioning
- Course catalog and instructors remain unchanged; the name is the only thing that's different

**Why do I care:** As someone who has recommended Frontend Masters to developers at every stage of their career, the name confusion was always something I had to explain. "It's called Frontend Masters but it has great courses on systems programming and AI too, just ignore the name." I won't miss having that conversation.

**Link:** [Today, Frontend Masters becomes Master.dev](https://master.dev/blog/today-frontend-masters-becomes-master-dev/)

---

## The Golden Rule of Customizable Select

**TLDR:** Safari 27 brings customizable select elements — full visual control over `<select>` without JavaScript — and the WebKit team has one rule you must follow: always include text content or accessible text attributes on every option, no matter how you style it visually.

**Summary:** Customizable select is genuinely exciting. You get custom arrows, full option layout control, color swatches, icons, all the visual flexibility people have been building with div-based dropdown libraries for years, but backed by the browser's native accessibility semantics and keyboard navigation. No JavaScript required. The catch is that the whole thing depends on options having real text that assistive technology can read.

The WebKit team illustrates the problem clearly with a photographer's gallery filter example. Icon-only options look clean, but without text labels, a user who doesn't recognize what a hummingbird icon represents has no fallback. The closed select shows just an icon with no hint of what's selected. Add text labels alongside the icons and the experience becomes immediately scannable for everyone, sighted or not.

The three-way failure mode they describe is the one you need to internalize. Remove text from options and you break UX for users who don't recognize your icons, you break accessibility for screen reader users, and you break progressive enhancement for browsers that don't yet support customizable select, where the fallback native dropdown will show empty options. All three problems appear simultaneously from a single mistake. The fix is simple: keep the text. Hide it visually with a `.visually-hidden` class if the design requires it, but keep it in the DOM and in the accessibility tree.

The `@supports (appearance: base-select)` technique for wrapping enhancements is the right pattern here. You add swatches and icons as enhancements on top of a text baseline, and browsers that don't support customizable select fall back gracefully to the plain text options.

**Key takeaways:**
- Customizable select in Safari 27 enables full visual styling of `<select>` without JavaScript or div-based alternatives
- Every option must include text content or accessible text attributes — visual-only options break UX, accessibility, and progressive enhancement simultaneously
- Use `@supports (appearance: base-select)` to wrap enhancements while keeping plain text as the fallback

**Why do I care:** Every custom dropdown component I've ever built has been a compromise between visual flexibility and accessibility compliance. Customizable select eliminates that tradeoff for the vast majority of cases. But the accessibility requirement isn't optional — it's what makes the native implementation worth using over a custom component in the first place. The golden rule isn't a suggestion.

**Link:** [The golden rule of Customizable Select](https://webkit.org/blog/18117/the-golden-rule-of-customizable-select/)

---

## Why Isn't My 3D View Transition Working?

**TLDR:** If you've tried to apply 3D perspective transforms to cross-document view transitions and found they don't work, the fix is to use the `perspective()` transform function inside your keyframes instead of the `perspective` CSS property on a parent element — because view transition pseudo-elements don't have a true parent in the normal DOM flow.

**Summary:** This is one of those debugging discoveries that makes you feel like you've been fighting the browser for no reason, until you understand why the limitation exists. CSS 3D transforms using the `perspective` property require that property to be set on a parent element — it applies perspective to all children. But the view transition pseudo-element tree, the `::view-transition`, `::view-transition-group()`, `::view-transition-image-pair()`, and the old/new pseudo-elements, lives above the DOM in its own rendering layer. Setting `perspective` on `html`, `:root`, or any of the view transition pseudo-elements themselves doesn't work because there's no real parent relationship in the rendering model.

The solution is to use `perspective()` as a transform function value directly inside your `@keyframes` animation. Instead of relying on inherited perspective from a parent container, you embed the perspective into each step of the animation itself. This works because the function applies perspective directly to the element being transformed, without needing a parent context.

The author spent weeks struggling with this before finding the answer, which tells you something about how underdocumented this edge case is. The view transition spec is still relatively young, and the interaction between its pseudo-element tree and CSS 3D contexts is one of those areas where browser behavior and developer mental models diverge in ways that aren't obvious until you run into them.

The fix is small — add `perspective(1100px)` as the first function in each `transform` value inside your keyframes — but understanding *why* it works versus why setting it on a parent doesn't work is worth carrying forward for any future 3D animation work in view transitions.

**Key takeaways:**
- The `perspective` CSS property doesn't work on view transition pseudo-elements because they render outside the normal DOM parent hierarchy
- The fix is using the `perspective()` transform function inside `@keyframes` rather than the `perspective` property on any element
- This affects all cross-document 3D view transitions, not just flip animations

**Why do I care:** View transitions are one of the most impactful additions to CSS in recent years for perceived performance and user experience. The 3D case is a natural next step when you want page transitions to feel spatial, and hitting this invisible wall is genuinely frustrating. Now that the fix is documented clearly, I can use it without the multi-week detour the author went through.

**Link:** [Why Isn't My 3D View Transition Working? | CSS-Tricks](https://css-tricks.com/why-isnt-my-3d-view-transition-working/)

---

## A Step Into the Spatial Web: The HTML Model Element in Apple Vision Pro

**TLDR:** visionOS 26 enables the HTML `<model>` element by default, letting web pages display USDZ 3D models as stereoscopically-rendered spatial objects on Vision Pro without WebXR or JavaScript frameworks, through a simple API that mirrors the `<video>` and `<audio>` element patterns.

**Summary:** The `<model>` element proposal is trying to do for 3D content what `<img>` did for images — give the web a semantic, accessible, browser-managed way to embed spatial content without requiring developers to learn a graphics API. The API design reflects that goal. You point it at a USDZ file, optionally set `stagemode="orbit"` to enable pinch-and-drag rotation, and the browser handles the rendering, accessibility semantics, and privacy considerations that come with spatial content.

The more interesting technical details are in the `entityTransform` property, which uses `DOMMatrix` — the same object type CSS transforms produce — to translate, rotate, and scale the 3D scene. That's a deliberate choice: web developers already understand CSS transforms, and reusing that mental model for 3D scene manipulation lowers the learning curve considerably. The `ready` Promise pattern mirrors how you'd await a video before seeking into it. Animation playback uses `play()`, `pause()`, `currentTime`, and `loop` — all familiar from media elements.

The `environmentMap` attribute for image-based lighting is where production quality becomes achievable. A good HDR environment map is what separates a flat-looking model from one that looks like it belongs in the scene. The fact that you can supply your own equirectangular HDR image means you can match the lighting of your model to the context of your page, which matters when you're integrating 3D into a product detail page.

The web standards angle here is real — this is going through the W3C and WHATWG, not just a WebKit proprietary extension. But it's worth noting that practically speaking, the only platform where this is useful today is Vision Pro. That's a tiny hardware install base. The proposal's value depends on whether other spatial platforms adopt it, and whether Apple Vision Pro gains the adoption needed to make it worth building content for.

**Key takeaways:**
- The HTML `<model>` element embeds USDZ 3D models in web pages with a familiar API pattern modeled on `<video>` and `<audio>`
- `entityTransform` uses `DOMMatrix` for scene manipulation, reusing CSS transform concepts for 3D positioning
- The feature is enabled by default in visionOS 26 and is being proposed through W3C and WHATWG as an open web standard

**Why do I care:** Spatial computing is still very niche, but the `<model>` element's API design philosophy is interesting regardless of Vision Pro's adoption. The decision to mirror media element patterns shows good thinking about progressive disclosure of complexity — simple cases should be simple, and the advanced API shouldn't require learning an entirely new mental model.

**Link:** [A step into the spatial web: The HTML model element in Apple Vision Pro](https://webkit.org/blog/17118/a-step-into-the-spatial-web-the-html-model-element-in-apple-vision-pro/)

---

## Improvements to Web for AI Should Benefit All Users

**TLDR:** Cloud Four's Jason Grigsby argues, drawing on Safari's formal opposition to the WebMCP proposal, that any enhancements to the web for AI agents should be implemented through HTML and ARIA's shared semantic layers where users, assistive technology, and agents all benefit — not in a separate AI-only fast lane.

**Summary:** Safari's formal opposition to the WebMCP API landed with a quote that deserves to travel widely. Mike Wyrzykowski's statement from the WebKit team puts it plainly: when a site's actions are hard for an agent to use, that's a gap in the page's own semantics, and the fix belongs in the platform's shared layers where users, assistive technology, and agents all benefit. The alternative — building richer, more actionable semantics specifically for AI while screen reader and keyboard users receive less — is the exact architectural mistake the proposal risks making.

The post extends this to another proposal from the WICG mailing list, which would address AI systems misidentifying domain authority by adding a JSON-LD document to every website. The underlying problem — that people also have trouble telling legitimate websites from fraudulent ones — is real and worth solving. But if the solution only helps AI systems while doing nothing for human users trying to evaluate trustworthiness, that's a missed opportunity and potentially a bad precedent.

I think the rhetorical point about AI training wheels is underplayed here. There is something genuinely strange about building special semantic infrastructure for AI assistants that are simultaneously supposed to be replacing human judgment and cognitive labor. If the system can't navigate a well-structured website that humans and screen readers handle fine, that's a capability gap worth fixing in the AI system, not a reason to add a new semantic layer to every website on the web.

The W3C Priority of Constituencies, which puts user needs above author needs above implementor needs, doesn't mention AI agents at all. Where agents fit in that priority order is a question the web standards community needs to answer explicitly, before rather than after a series of AI-specific proposals accumulate.

**Key takeaways:**
- Safari opposes WebMCP on the grounds that semantic gaps for AI agents should be fixed in HTML and ARIA, benefiting all users and assistive technology
- Web improvements designed exclusively for AI agents risk creating a two-tier semantic web where humans and screen reader users get less
- The W3C Priority of Constituencies needs an explicit position on AI agent needs relative to human user needs

**Why do I care:** Accessibility and AI are going to collide repeatedly as browser vendors, standards bodies, and tool vendors all move quickly. The Safari team's framing — that AI agents are, in effect, assistive technology and should operate sites the way users would — is the principle I want to see guide this work. If a page works for a screen reader, it should work for an agent. Anything else is a regression.

**Link:** [Improvements to Web for AI Should Benefit All Users](https://cloudfour.com/thinks/improvements-to-web-for-ai-should-benefit-all-users/)

---

## Another Stab at the Perfect CSS Pie Chart, Sans JavaScript

**TLDR:** A developer forks an existing CSS-only pie chart implementation and removes the remaining JavaScript entirely, using a clever restructuring of HTML attributes to let CSS compute slice positions through accumulated custom property calculations at the parent element level.

**Summary:** The original challenge was that each pie slice needs to know the cumulative percentage of all previous slices to know where to start drawing — information that CSS cannot normally derive from sibling elements because of how inheritance works. The previous approach used a small JavaScript loop to set an `--accum` custom property on each list item. This fork eliminates that JavaScript by moving all the percentage values from individual `<li>` elements up to the parent `<ul>` as indexed data attributes.

Once the values are on the parent, CSS can read them through the upgraded `attr()` function with type syntax, then compute the accumulated values for each slice at the parent level using a cascade of `calc()` expressions. Each indexed accumulation variable feeds the next: `--accum-3` is `calc(var(--accum-2) + var(--p-100-2))`, and so on. Then `nth-child()` selectors assign the local `--accum` and `--p-100` variables to each slice. The pattern is repetitive and verbose, but it works in today's browsers without any JavaScript at all.

What's genuinely interesting here is the use of `sibling-index()` and `sibling-count()` for automatic color generation. These functions aren't yet in baseline, but they're close — and when they land, the pattern for distributing hue values evenly across an unknown number of slices becomes elegant. The CSS-only polyfill using `has(:nth-child(n))` and manual index assignment is a perfect example of writing the future-compatible version now and falling back to the current workaround.

The accessibility discussion is honest about the limits of the approach. The counter-based content generation that replaces percentage values in pseudo-elements may not be reliably read by all screen readers. The author acknowledges this and notes that if the data is critical, testing with real assistive technology is non-negotiable.

**Key takeaways:**
- Moving percentage data attributes from list items to the parent element enables CSS to compute pie slice positions without JavaScript
- The approach uses indexed custom properties and `calc()` cascades to replicate what JavaScript's loop was doing
- `sibling-index()` and `sibling-count()` are approaching baseline and will significantly simplify this pattern when available

**Why do I care:** Pure CSS charts are always going to be a niche use case — for anything serious I'd reach for a proper charting library. But the technique here is genuinely educational about what's possible with today's CSS. The insight about parent-level attribute indexing to work around sibling inheritance limits is useful well beyond pie charts. And the pattern of writing code that will improve automatically as `sibling-index()` ships is a smart way to prepare your codebase for near-future CSS.

**Link:** [Another Stab at the Perfect CSS Pie Chart... Sans JavaScript! | CSS-Tricks](https://css-tricks.com/another-stab-at-the-perfect-css-pie-chart-sans-javascript/)

---

## Prop For That: CSS Reacts, JS Just Listens

**TLDR:** Adam Argyle's `prop-for-that` library bridges the gap between JavaScript's runtime knowledge and CSS's reactive system by writing live CSS custom properties to elements declaratively, covering everything from pointer position and scrollbar size to battery level and image color extraction.

**Summary:** The library's premise is straightforward: there's a lot of information that JavaScript knows about at runtime — input values, pointer coordinates, viewport dimensions, element visibility, device orientation, network status — that CSS has no native way to access. The standard solution has been to write JavaScript event listeners that manually update custom properties on elements. `prop-for-that` packages all of those bridge patterns as a plugin system where you just add a `data-props-for` attribute to any element and the matching live props appear automatically.

The list of supported props is impressively broad. Pointer position, both global and local to an element. Viewport and visual viewport dimensions. Element size and visibility. Scrollbar sizes. Input element values with dirty/touched/pristine state. Select element value, index, and option count. Colors extracted from images or video frames, including average, accent, dominant light, and dominant dark values. Clock time, FPS, online/offline status, page focus and visibility, scroll velocity, device tilt, geolocation, device pixel ratio, CPU cores, and memory. Chromium-only props cover network type, battery status, and CPU pressure.

The combination with Style Queries is where this gets genuinely powerful. Style Queries are now in all major browsers, so you can write `@container style(--live-all-valid: 1)` to apply styles conditionally based on form validation state without a single JavaScript conditional. CSS is doing the conditional styling work; the library just ensures the custom property values are available.

A comment in the thread mentions the demo page causes Firefox to crash after 15-20 seconds, which Argyle acknowledges sounds like a memory leak. For a library that registers event listeners across a large range of live data sources, memory management is a real concern. I'd want to see explicit lifecycle management and cleanup APIs before using this in a production application at any scale.

**Key takeaways:**
- `prop-for-that` declaratively writes JavaScript runtime data as CSS custom properties, covering pointer position, input values, image colors, device sensors, and more
- Style Queries in all major browsers make the combination particularly powerful for purely CSS conditional styling
- Memory management and cleanup behavior in long-running sessions is worth evaluating carefully before production use

**Why do I care:** The pattern this library implements is one I've written fragments of many times. Having it as a composable, plugin-based system is useful. The image color extraction props alone open up component theming patterns that previously required meaningful JavaScript investment. My caution is around the performance implications of having this many live data sources updating custom properties simultaneously, particularly on lower-end hardware.

**Link:** [Prop For That · June 13, 2026](https://nerdy.dev/prop-for-that)

---

## Creating Memorable Web Experiences: A Modern CSS Toolkit

**TLDR:** A wide-ranging walkthrough of expressive CSS techniques — split text animations, masking, clip-path, scroll-driven animations, 3D transforms, and custom cursors — framed around a methodology of defining your animation intent before picking tools.

**Summary:** The article opens with a premise I agree with strongly: we should not move things just because we can. Motion communicates something, and that something needs to be intentional. The keyword list methodology — defining visual language, movement character, feeling, and style references before writing a single line of CSS — is a design thinking practice that most frontend developers skip entirely. The contrast between a psychedelic mushroom rave event (fast, frantic, hypnotic) and a spiritual retreat (slow, fluid, organic) illustrates why the same CSS technique, say a scroll-driven parallax, serves completely different communication goals depending on its implementation.

The split text animation section is technically sound and admirably honest about accessibility. The GSAP SplitText plugin approach, where each character gets its own `aria-hidden` span while a visually-hidden element holds the full text, only worked correctly in two of eight tested screen reader and browser combinations according to Adrian Roselli's research. That's an important data point. The letter-spacing alternative for reveal effects avoids DOM manipulation entirely, which is the right tradeoff when screen reader compatibility is non-negotiable.

The scroll-driven animation examples show the real power of `animation-timeline: view()` — tying multiple elements to scroll position with different offsets creates parallax depth with just a few CSS variables and no JavaScript at all. The 3D CSS carousel using `transform-style: preserve-3d` tied to a scroll timeline is the kind of effect that would have required a JavaScript scroll handler and significant frame budget in 2018.

One thing I wish the article addressed more directly: the performance cost of animating many elements simultaneously using scroll-driven animations. The article mentions `transform-style: preserve-3d` on a wrapper containing multiple images all rotating in 3D on scroll, which is the kind of pattern that needs GPU compositing to run smoothly. The browser can usually handle it, but the article doesn't tell you when to reach for `will-change` or how to profile if it's dropping frames.

**Key takeaways:**
- Define your animation intent through a keyword list methodology before picking CSS techniques to ensure motion serves communication
- Scroll-driven animations with `animation-timeline: view()` replace entire categories of JavaScript scroll handlers with GPU-composited CSS
- Split text animations have significant screen reader compatibility risks — test with real assistive technology before shipping

**Why do I care:** This article covers a lot of ground and the quality is high throughout. The framing around intent before implementation is genuinely useful for teams where developers make animation decisions without design direction. The accessibility warnings are honest rather than aspirational. And the range from split text to clip-path to 3D to anchor positioning shows how much of what we used to reach for a library to do is now native CSS territory.

**Link:** [Creating Memorable Web Experiences: A Modern CSS Toolkit | CSS-Tricks](https://css-tricks.com/creating-memorable-web-experiences-a-modern-css-toolkit/)
