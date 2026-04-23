---
title: "font-family Fallbacks, Breakpoint-Free Layouts, and HTML in Canvas"
excerpt: "This week's Frontend Focus covers a CSS font fallback quirk that causes layout shifts, a modern breakpoint-free responsive design approach, the exciting HTML-in-Canvas API, accessibility pitfalls with box-shadow, and how to make your site visible to AI agents."
publishedAt: "2026-04-23"
slug: "frontend-focus-font-fallbacks-breakpoint-free-layouts-html-in-canvas"
hashtags: "#frontendfocus #css #html #javascript #frontend #performance #accessibility #animation #webdev #generated #en"
source_pattern: "Frontend Focus"
---

# font-family Doesn't Fall Back the Way You Think

**TLDR:** When you declare `font-family` on a child element with only a single custom font value, the browser does not walk up the DOM to inherit your body's fallback stack. It exhausts the declaration's own options, then falls back to the browser default, which is typically Times New Roman. The fix is dead simple: always declare a full font stack on every element.

**Summary:** Harry Roberts at CSS Wizardry has a short, precise post that I think every developer should read once and then immediately go audit their codebase. The misunderstanding is understandable: `font-family` is an inherited property, so you might assume that if your custom web font isn't available yet, the browser will politely walk up to `body` and grab `system-ui, sans-serif`. It does not work that way. The moment you write `font-family: "Open Sans"` on an `h1`, that declaration is self-contained. The browser resolves fallbacks entirely from within that single declaration. No custom font available? That's it: Times New Roman, the browser default, shows up instead.

The real-world consequence is a flash of inappropriate serif text during font loading, which is ugly but survivable. The more serious consequence is CLS impact on your Core Web Vitals scores. A serif fallback has completely different metrics than your intended sans-serif custom font, so when the web font finally loads and swaps in, the layout can visibly shift. Roberts shows a real client with multiple heading and body font CSS custom properties, all of them defined as single-value declarations, all of them vulnerable to exactly this bug.

The fix is so simple it almost feels embarrassing: add a generic family keyword to every font-family declaration. At minimum, `"My Font", sans-serif`. Ideally, something thoughtfully chosen that approximates the proportions of your web font. If you're maintaining a design system, this is one of those silent time bombs that can cost you significant CLS score before you track down the cause.

I've reviewed enough design system codebases to know this specific pattern is genuinely common. Developers set up CSS custom properties for their type scale, write the font name, ship it, and never realize they just removed all the fallback logic in one move.

**Key takeaways:**
- `font-family` fallbacks are scoped to the element's own declaration, not the parent's
- A single-value custom font declaration falls back to the browser default (Times New Roman in most browsers), not the inherited stack
- Always include a complete font stack on every `font-family` declaration, even if it's just a generic family keyword
- CLS scores can be meaningfully affected by the width difference between a serif fallback and your intended sans-serif web font

**Why do I care:** This is the kind of bug that hides in production forever because it only manifests during font loading, which you stop noticing after working on the site long enough. If your team has CSS custom properties defining individual font names for a type scale, go check every single one of them right now. The fix is three extra characters. The cost of not fixing it is your CLS score suffering on slow connections or first visits.

**Link:** [font-family Doesn't Fall Back the Way You Think](https://csswizardry.com/2026/04/font-family-doesnt-fall-back-the-way-you-think/)

---

# Building a UI Without Breakpoints

**TLDR:** A detailed Frontend Masters article proposes shifting responsive design from viewport-breakpoint orchestration to a system of intrinsic layouts, fluid values, container units, and container queries. Breakpoints don't disappear, but they stop being the primary layout engine and become a narrow tool for device capability detection and user preferences.

**Summary:** This article is one of the most thorough practical treatments of modern CSS responsive design I've read in a while. The author makes a clear, well-argued case: the classic breakpoint model was the right answer to a real problem in the era of page-first design, but in component-first systems where the same card or sidebar appears in wildly different containers across the same app, viewport width is frequently the wrong input for layout decisions.

The approach breaks down into four complementary methods. Intrinsic layouts with `auto-fit` and `minmax()` let grids define themselves without media queries. Fluid values via `clamp()`, `min()`, and `max()` replace stepped typography and spacing with continuously scaling rules. Container units tie component sizing to the actual space available rather than the screen. And container queries handle the cases that genuinely require a structural layout shift, but scoped to the component rather than the page.

What I find compelling is the migration framing. This is not a rewrite manifesto. The author gives you a concrete checklist: audit your existing media queries, separate scalar changes from structural ones, replace scalar branches with `clamp()` tokens, shift layout to intrinsic primitives, add container queries only where real structure changes. Start with one component and let the approach compound.

The piece also resists the temptation to fully exile media queries. They remain valuable and irreplaceable for detecting hover support, pointer accuracy, display mode, reduced motion preferences, and update rate. The shift is that media queries stop being the engine of every layout decision and become a focused tool for understanding the user's device and preferences. That's a better division of responsibility than what most codebases have today.

**Key takeaways:**
- Replace scalar responsive changes (spacing, typography) with `clamp()` fluid values
- Use `auto-fit` and `minmax()` to remove column-count breakpoints from grid layouts
- Scope structural behavior with container queries rather than global viewport breakpoints
- Reserve `@media` queries for device capabilities and user preferences, not pixel-counting layout
- Container units (`cqi`) let components size themselves relative to their actual rendered container

**Why do I care:** I still review codebases with dozens of media query blocks that are really just step functions for font-size and padding. Every one of those is a maintenance liability. The intrinsic layout model the author describes produces less CSS, fewer regressions when components move between contexts, and behavior that's genuinely easier to reason about. Container queries have wide enough support now that there's no excuse for building new component layouts with viewport breakpoints.

**Link:** [Building a UI Without Breakpoints](https://frontendmasters.com/blog/building-a-ui-without-breakpoints/)

---

# Firefox 150: Media Pseudo-Classes, animation-range, and More

**TLDR:** Firefox 150 ships a collection of notable CSS and API additions including media-state pseudo-classes for audio and video elements, the `animation-range` properties for scroll-driven animations, the `revert-rule` keyword, and expanded `color-mix()` support. Also notable: `ariaNotify()` as a screen reader announcement API.

**Summary:** Firefox 150 is a solid release without a single headline-grabbing feature, which is actually my favorite kind of browser release. The useful things are widely distributed across the platform. The media-based pseudo-classes -- `:buffering`, `:muted`, `:paused`, `:playing`, `:seeking`, `:stalled`, and `:volume-locked` -- finally land in Firefox, meaning you can now style audio and video elements based on their playback state in CSS across all major browsers. This is genuinely useful for custom media player UI work.

The `animation-range-start` and `animation-range-end` properties for scroll-driven animations also arrive, giving you fine-grained control over where along a scroll timeline an animation attaches and detaches. The `revert-rule` keyword is a thoughtful addition that lets a property value fall through to the next matching rule as if the current rule didn't exist, which is useful for overriding design system components without resorting to specificity tricks.

On the HTML side, the `auto` keyword for `img` `sizes` attribute enables lazy-loaded images to calculate their own layout size after CSS applies, which reduces the amount of duplicated media condition logic you need to write. The `ariaNotify()` method on both `Document` and `Element` is worth attention from an accessibility standpoint. Queuing a string to be announced by a screen reader through a proper API is considerably more ergonomic and reliable than maintaining ARIA live regions.

Color-mix getting support for more than two colors is a nice quality-of-life improvement for design token work, and `light-dark()` accepting image values opens up some interesting theming patterns for gradients and decorative backgrounds.

**Key takeaways:**
- Media-state pseudo-classes (`:paused`, `:playing`, `:muted`, etc.) now work cross-browser for styling audio/video elements
- `animation-range-start` and `animation-range-end` enable precise scroll-driven animation control
- `revert-rule` provides a clean way to step back through the cascade without specificity games
- `ariaNotify()` is a more reliable alternative to ARIA live regions for screen reader announcements
- `color-mix()` now supports more than two input colors

**Why do I care:** The media pseudo-classes alone are worth a look if you're building any kind of custom video or podcast player UI. Styling a paused state or a muted indicator in pure CSS, without JavaScript event listeners toggling class names, is a meaningful simplification. And `ariaNotify()` is the kind of accessibility primitive that should have existed years ago.

**Link:** [Firefox 150 Release Notes for Developers](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/150)

---

# Chrome's Soft Navigations API Enters Final Origin Trial

**TLDR:** Chrome is preparing to ship the Soft Navigations API, with a final origin trial running from Chrome 147 to 149. The API enables accurate Core Web Vitals measurement for Single Page Applications by detecting client-side navigations that update content and URL without a real page load.

**Summary:** The Soft Navigations problem is one of those situations where the web platform took years to get to a solution that should have existed from the start. SPAs have been the dominant architecture for a decade, yet Core Web Vitals metrics like LCP were never really designed for them. When a user navigates inside a React or Vue app, the browser sees the original page load and nothing after. Your analytics and CrUX data have been showing you performance numbers for pages that users never experience in the way being measured.

The API's design is careful about what counts as a soft navigation: a user interaction must occur, followed by a visible paint of new content, and a URL update. This is deliberately conservative because the alternative, letting frameworks self-report navigations, would give every SPA framework license to define "navigation" however was most flattering. Browser-detected navigations are comparable across sites and frameworks, which matters for CrUX data to be useful.

The new `SoftNavigationEntry` performance entry and `InteractionContentfulPaint` type give you the primitives to measure LCP, CLS, INP, and FCP for every soft navigation. The `navigationId` on performance entries lets you correctly attribute layout shifts and interaction timing to the right navigation even when the observer fires late on a busy page. Chrome DevTools already shows soft navigations in performance traces as of Chrome 145 without needing the flag enabled.

The main change from the previous origin trial is decoupling `InteractionContentfulPaint` from soft navigations specifically, making it available for broader use cases, and adding a `largestInteractionContentfulPaint` attribute to `SoftNavigationEntry`. If you maintain a SPA, this is worth testing during the origin trial window before it ships.

**Key takeaways:**
- The Soft Navigations API enables real Core Web Vitals measurement for client-side routed SPAs
- A soft navigation requires user interaction, a visible content paint, and a URL update
- New `SoftNavigationEntry` and `InteractionContentfulPaint` performance entries cover LCP, CLS, INP, and FCP
- `navigationId` attributes help attribute performance entries to the correct navigation in busy apps
- Chrome DevTools performance panel already shows soft navigations in traces (Chrome 145+)

**Why do I care:** If your team's CWV dashboard shows your SPA performing reasonably well on initial load but you suspect real-world navigation performance is getting missed, you're probably right. This API finally gives us the measurement primitives to know. Test it during the origin trial, because once it ships, CrUX data for SPAs will change and you want to have already wired up your RUM solution before that happens.

**Link:** [Final Soft Navigations Origin Trial in Chrome 147](https://developer.chrome.com/blog/final-soft-navigations-origin-trial?hl=en)

---

# Thoughts on Claude Design and the Source-of-Truth Shift

**TLDR:** Designer Sam Henri Gold argues that Claude Design's bet on HTML and JS as the native medium is structurally sound because Figma's decade of proprietary primitives excluded it from LLM training data, positioning code as the inevitable source of truth for design.

**Summary:** This is a genuinely fun piece of industry commentary that says out loud what I think a lot of designers and engineers have been thinking quietly. Figma won its battle with Sketch in part by positioning design files as the canonical source of truth, which was a reasonable bet at the time. The hidden cost of that victory was building a proprietary, largely undocumented format that nobody was feeding into LLM training data. Code was being trained on constantly. Figma files essentially were not.

The author's reading of Claude Design is interesting: it's "truth to materials," to borrow an Arts and Crafts phrase. HTML and JavaScript all the way down, no lossy approximation of UI living in a parallel universe of Figma components and variable aliases. The structural advantage the author identifies is that Claude Design's sibling is Claude Code. Eventually they should be able to exchange work directly, collapsing the back-and-forth translation cycle between design and implementation that has been a source of friction since the beginning.

The description of Figma's own design system file is genuinely funny in a painful way. Hundreds of aliased variables, component variants with names like "DS Library Swap," and a single drop shadow that exists as a named style purely to document which CSS variable it corresponds to. The author is not wrong that nobody would design this system from scratch today.

Where I'd push back slightly: the author predicts a fork between tools like Claude Design and a pure exploration environment with no code expectations. That's probably right as a long-term arc, but Claude Design in its current state is still quite rough, and the gap between "can generate a UI" and "can participate in a real design system workflow" is large. The feedback loop advantage is real though, and it's the kind of compounding structural advantage that tends to matter more than early capability gaps.

**Key takeaways:**
- Figma's proprietary format excluded it from LLM training data, giving code-native tools a structural advantage in the agentic era
- Claude Design bets on HTML/JS as the canonical medium rather than maintaining a parallel design file layer
- The design-to-code translation friction could collapse as Claude Design and Claude Code share context directly
- Figma Make remains committed to the design-file-as-canonical-source position, which the author sees as the losing bet
- The design tooling space may fork between code-native tools and pure exploration/sketching environments

**Why do I care:** I've spent time in meetings debating whether Figma or code should be the source of truth. It's a genuinely costly organizational friction that produces real bugs when design changes don't make it back to implementation or vice versa. If tools like Claude Design can make that question irrelevant by just working directly in the medium where things will actually live, that's worth watching closely.

**Link:** [Thoughts and Feelings around Claude Design](https://samhenri.gold/blog/20260418-claude-design/)

---

# Delivering a Dynamic Hexagonal World Map in 10kb

**TLDR:** The Calibre team built a hex cartogram world map for their RUM Audience report as a single 144kb SVG file that compresses to 10kb over the wire, using Node.js, Turf.js for geospatial simplification, d3-geo for projection, and SVG's `symbol` and `use` elements to avoid redrawing the hex shape thousands of times.

**Summary:** This is one of those "how we built it" posts that I find genuinely instructive because the constraints were real and the solutions were creative rather than reaching for the nearest heavy library. The author wanted a world map that was fast, visually low-fi, worked on all browsers, and supported light and dark themes, all without a full mapping stack including pan, zoom, tiling, and internalization.

The pipeline is elegant in its specificity. Start with 10-meter accuracy country boundaries in GeoJSON, run them through Turf's simplify function to reduce resolution while keeping countries recognizable at four pixels wide, use d3-geo to project with equirectangular projection, render a hexagon grid over the result, use point-in-polygon to assign each hex to a country, and output a static SVG. No client-side data fetches, no runtime calculations, just a file cached at the CDN.

The SVG optimization trick with `<symbol>` and `<use>` is worth noting independently of the map context. Defining the hex shape once and referencing it with `<use>` throughout the file prevents the SVG from being bloated by thousands of redrawn paths. The resulting 144kb SVG compresses to 10kb with GZip. Country theming for performance ratings and light/dark mode is handled with CSS custom properties directly on the SVG, making the in-app JavaScript very thin.

The honest account of what didn't make the cut, Tasmania too small for a four-pixel dot, the US wrapping across both edges of the map, disputed territory gaps, is a good reminder that purposeful constraints are a feature of this kind of work, not a failure.

**Key takeaways:**
- Turf.js's geospatial simplification lets you reduce GeoJSON resolution while keeping shapes recognizable
- d3-geo's equirectangular projection and point-in-polygon APIs handle country boundary detection
- SVG `<symbol>` and `<use>` elements enable massive size savings when repeating a shape thousands of times
- Static SVG generation at build time with CDN caching is often the right call over client-side mapping libraries
- CSS custom properties make SVG light/dark theming and dynamic state (performance grades) clean and simple

**Why do I care:** The 10kb delivery number is impressive, but what I actually find useful here is the architectural decision to generate at build time and serve static. A lot of teams reach for a full mapping library when what they actually need is a visual indicator of geographic distribution, which is a much smaller problem. The Turf.js and d3-geo combination for offline SVG generation is a pattern worth keeping in mind.

**Link:** [Delivering a Dynamic Hexagonal World Map in Just 10kb](https://calibreapp.com/blog/building-our-beloved-hex-map)

---

# The Web Is Fun Again: HTML in Canvas

**TLDR:** The experimental HTML-in-Canvas API, available behind a flag in Chromium 146+, lets you render real DOM elements into a canvas context and then apply 2D canvas effects, pixel manipulation, or WebGL shaders to the output while preserving full interactivity of the original HTML elements.

**Summary:** This is the kind of thing that makes me want to open a code editor at midnight. The HTML-in-Canvas API is still experimental and flag-gated, so you shouldn't ship it in production yet, but the concept it unlocks has been a missing piece for years: take real semantic HTML with working forms, inputs, and accessibility, render it into canvas pixels, and then apply any visual effect from simple CSS-style transforms all the way to full GLSL shaders, while the original elements remain interactive.

The article walks through the API surface methodically. You wrap your HTML in a `<canvas>` element with the `layoutsubtree` attribute, call `canvas.requestPaint()` to kick off the rendering pipeline, and then in the `paint` event listener you call `ctx.drawElementImage(element, x, y)` to copy the rendered DOM content into canvas pixels. The content is genuinely interactive, the canvas pixels just represent what the elements look like at that moment.

What gets wild is pixel manipulation. You can iterate the canvas pixel buffer, find specific colors or shapes, replace them, distort them with wave functions, or drive displacement maps from mouse position. Then you layer on WebGL via `gl.texElementImage2D()` instead of `ctx.drawElementImage()`, and suddenly you're running fragment shaders over a live form with a working text input. The demos shown, a fire effect on a text input, cursor ripple distortion, drag-tension physics, content with tilt-mapped homography, range from technically impressive to genuinely beautiful.

The sizing story is the roughest part of the API in its current state, because canvas doesn't behave like a block container, but a ResizeObserver that forwards device-pixel dimensions to the canvas attributes handles it adequately. Interactivity alignment between DOM hit testing and canvas transforms requires synchronizing `ctx.translate()` with `content.style.transform` using the return value of `drawElementImage()`, which is a reasonable constraint given what the API is doing.

**Key takeaways:**
- The `layoutsubtree` attribute on a canvas element opts its children into layout and hit testing while keeping them invisible until explicitly drawn
- `ctx.drawElementImage()` copies the current rendered output of a DOM element into the canvas at specified coordinates
- HTML elements inside a canvas remain fully interactive; the canvas pixels are just their visual representation
- WebGL path uses `gl.texElementImage2D()` to upload DOM content as a GPU texture for shader processing
- Sizing requires a ResizeObserver to synchronize the canvas drawing surface with its CSS-rendered dimensions

**Why do I care:** I care because this API, when it ships, makes an entire category of previously impractical UI effects buildable with real HTML rather than CSS hacks or pure canvas reimplementations. Interactive cards with liquid distortion, form elements with pixel-shader depth effects, rich visual transitions between content states, all while keeping the underlying content accessible and crawlable. It's early, but this is worth experimenting with now.

**Link:** [The Web Is Fun Again: First Experiments with HTML in Canvas](https://frontendmasters.com/blog/the-web-is-fun-again-first-experiments-with-html-in-canvas/)

---

# Details That Make Interfaces Feel Better

**TLDR:** A compact, interactive reference covering a dozen small CSS and animation details that compound into noticeably higher quality interfaces, including `text-wrap: balance`, concentric radius math, interruptible transitions, staggered enter animations, and tabular number sizing.

**Summary:** I appreciate this kind of post because it doesn't try to change how you think about architecture. It just hands you a set of specific, actionable details you can apply today and see the difference immediately. The author has packaged these as an actual Claude Code skill as well, which is a clever delivery mechanism for this type of practical knowledge.

The concentric radius rule is the one I see violated most often in design systems. When you nest an element inside a rounded container and both have border radii, the inner radius should equal the outer radius minus the padding. Outer radius 20px, padding 8px, inner radius should be 12px. It's a simple formula but the visual difference between getting it right and getting it wrong is significant, and most production UIs get it wrong.

The discussion of interruptible animations is worth reading carefully. CSS transitions can be interrupted and will smoothly retarget to the new state. CSS keyframe animations run on a fixed timeline and do not. Users change their intent mid-interaction constantly, and nothing makes an interface feel cheaper than an animation that has to finish playing before it responds to the next input. The rule of thumb offered is clean: transitions for interactions, keyframe animations for staged sequences that run once.

Staggered enter animations applying per-element delays with CSS custom properties and a `--stagger` variable rather than animating one large container block is a genuinely useful pattern. The difference between animating a container and animating its title, description, and buttons individually with 100ms stagger delays is the difference between "this page loaded" and "this page feels alive."

**Key takeaways:**
- `text-wrap: balance` for headings, `text-wrap: pretty` for paragraphs to eliminate typographic awkwardness
- Concentric radius: outer radius = inner radius + padding (apply consistently to avoid visual inconsistency in nested rounded elements)
- CSS transitions are interruptible and retarget to new state; keyframe animations run to completion (prefer transitions for user interactions)
- Stagger enter animations per element using `animation-delay: calc(var(--delay) * var(--stagger))` rather than animating a whole container
- Exit animations should be more subtle than enter animations; reduce the y-translation and keep them fast

**Why do I care:** The concentric radius detail alone is worth bookmarking this post. I've reviewed enough Figma files and codebases to know that mismatched nested radii are everywhere, and they communicate "something is slightly wrong here" to users even if they can't articulate what. Most of these details are one-line fixes. The aggregate effect of applying them across a product is measurable.

**Link:** [Details That Make Interfaces Feel Better](https://jakub.kr/writing/details-that-make-interfaces-feel-better)

---

# Making Your Site Visible to LLMs: What Works and What Doesn't

**TLDR:** Evil Martians tested and evaluated every "AI SEO" technique available, concluding that six approaches have genuine value (llms.txt, .md routes, `<link>` and HTTP Link headers, a hidden hint div, llms-full.txt, and HTTP content negotiation) while eight widely promoted techniques have no evidence behind them and several are actively misleading.

**Summary:** This is the most honest piece of writing on LLM visibility I've read. The authors are direct about what the data actually shows: major LLM crawlers don't fetch `/llms.txt` unprompted, major LLM crawlers rarely request `.md` files on their own, and most of the "AI SEO" techniques circulating on the web are one person publishing a blog post that other blogs cite as evidence without anyone checking whether any AI system actually reads the thing.

The practical value of llms.txt and .md routes isn't automated crawl indexing. It's what happens in the use case that actually matters: a human or a coding tool points an LLM at your URL, the LLM follows links, and clean Markdown is what it finds. An HTML page is typically 80% navigation, scripts, and boilerplate. A Markdown version of the same page might be 80% smaller in token count. For an LLM working within a context window, that difference is the gap between understanding your content and ignoring it.

The section on what doesn't work is worth reading in full. `<meta name="ai-content-url">` has no specification and no origin. HTML comments don't work because LLM parsers strip them. User-Agent sniffing to serve Markdown is cloaking and Google penalizes it. Schema.org and JSON-LD in a controlled experiment were missed entirely by ChatGPT, Claude, Perplexity, Gemini, and Copilot. The Princeton/IIT Delhi study's findings are sobering: what actually improved AI visibility was enriching the visible text itself, direct quotations increased it 43%, statistics by 33%, authoritative citations by 115%.

The HTTP content negotiation technique is the one I'd bet on long-term. Any agent that sends `Accept: text/markdown` gets Markdown automatically from any conforming server. It's standard HTTP doing what it was designed to do, not a new convention waiting for adoption.

**Key takeaways:**
- llms.txt and .md routes add value primarily for human-initiated LLM interactions (URL pasting, tool fetches), not automated crawling
- Major LLM crawlers don't consistently fetch llms.txt or .md files unprompted based on current log analysis
- Eight commonly promoted AI SEO techniques have no evidence: `<meta name="ai-content-url">`, HTML comments, AI toggle buttons, User-Agent sniffing, dedicated AI pages, and schema.org-exclusive content
- `Accept: text/markdown` HTTP content negotiation is the standards-based approach with the best long-term outlook
- Content quality improvements (statistics, citations, direct quotations) outperform metadata tricks in actual AI visibility experiments

**Why do I care:** My own interest is in the measurement angle. Most teams implementing any of these techniques have no idea if they're working because AI crawlers don't execute JavaScript and won't show up in client-side analytics. Server-side request logs with User-Agent headers are the only way to know what's actually being fetched. If you're going to invest engineering time here, instrument it first so you can learn something.

**Link:** [Making Your Site Visible to LLMs: 6 Techniques That Work, 8 That Don't](https://evilmartians.com/chronicles/how-to-make-your-website-visible-to-llms)

---

# Why Some Images Look Brighter Than Your Screen

**TLDR:** HDR images using either the Ultra HDR JPEG extension or an HDR color profile (Rec.2100 PQ) can render selected highlights physically brighter than the SDR white ceiling on supported displays, a capability that marketers are beginning to use for logo and product images on platforms that allow custom uploads.

**Summary:** I'll be honest, the first time I saw the effect described in this post, I thought I was imagining it too. The author was scrolling LinkedIn, noticed a logo that was brighter than anything else on their screen including the display's maximum SDR white, and set out to understand how it worked. The answer is HDR image support in modern displays and browsers.

The two practical approaches are Ultra HDR and HDR color profiles. Ultra HDR is an extension of JPEG that embeds a gain map alongside the SDR image. The gain map is a grayscale mask indicating which regions should be made brighter and by how much. It's backwards compatible, the base JPEG displays fine on SDR devices, and you have explicit control over the intensity. The limitation found in testing is that LinkedIn doesn't preserve the HDR metadata on image uploads.

The Rec.2100 PQ color profile approach remaps pixel values into an HDR color space with Perceptual Quantizer transfer function. Less backwards compatible on SDR screens but more likely to survive platform image processing pipelines. The author provides tooling for both approaches, and the resulting images genuinely work on recent iPhones, Pixels, and MacBook Pros in Chrome or Safari.

The interesting question this raises for frontend work is how display-p3 and HDR-capable displays should inform UI design over the next few years. We've had access to wider color gamuts through CSS `color()` and `display-p3` for a while now. The HDR image trick just makes the magnitude of the difference viscerally obvious in a way that talking about color gamuts abstractly doesn't.

**Key takeaways:**
- Ultra HDR extends JPEG with a gain map that tells HDR displays which pixels to render brighter than SDR white
- Rec.2100 PQ color profile is an alternative approach that remaps pixel values into HDR color space
- The effect is visible on recent iPhones, Pixels, and MacBook Pros in Chrome or Safari
- Ultra HDR is backwards compatible; HDR profile images may display poorly on SDR screens
- Platform CDNs and image processing pipelines often strip HDR metadata, limiting the technique on user-upload-based platforms

**Why do I care:** This is a genuinely new capability that most frontend developers haven't thought about yet. As HDR display penetration grows and browsers continue expanding their color management, understanding the full brightness range available to images and eventually UI elements becomes part of the craft. The marketing abuse angle is entertaining, but the underlying capability is legitimate and worth understanding now.

**Link:** [Why Some Images Look Brighter Than Your Screen](https://tn1ck.com/blog/abuse-hdr-images-for-marketing)

---

# box-shadow Is No Alternative to outline

**TLDR:** Using `box-shadow` to style focus indicators and setting `outline: none` breaks focus visibility in Forced Colors mode because `box-shadow` computes to `none` in that mode. The fix is to set `outline: 2px solid transparent` instead, which becomes visible in Forced Colors while remaining invisible in the default color mode.

**Summary:** Manuel Matuzovic's accessibility audit series consistently catches the kinds of issues that are invisible in normal browser testing but obvious to people who actually rely on the features being broken. This particular post documents a pattern I've seen in dozens of codebases: developers dislike the default focus ring aesthetics, discover that `box-shadow` gives them much more visual control than `outline`, and promptly zero out the outline to remove the "double ring" appearance.

The problem is that Forced Colors mode, the accessibility feature that constrains page colors to a restricted user-chosen palette for users with visual impairments, explicitly removes `box-shadow` from the rendered output. The property computes to `none`. A focus indicator built entirely on `box-shadow` with `outline: none` becomes a focus indicator that doesn't exist for people using this mode.

The fix is elegant. Instead of `outline: none`, write `outline: 2px solid transparent`. In normal color mode, transparent is invisible and your `box-shadow` design carries the visual. In Forced Colors mode, the browser replaces `transparent` with a visible color from the forced palette, making the outline appear for users who need it. One property change restores accessibility for an entire class of users without affecting the visual design at all.

Testing this yourself takes thirty seconds: open a Chromium browser, find the Rendering tab in DevTools, and set forced-colors to active. If your focus indicators disappear on interactive elements, you have this bug.

**Key takeaways:**
- `box-shadow` computes to `none` in Forced Colors mode, breaking focus indicators that rely on it exclusively
- Never set `outline: none` on focused elements; use `outline: 2px solid transparent` instead
- A `transparent` outline is invisible in normal mode but becomes visible in Forced Colors mode
- Test Forced Colors behavior in Chrome DevTools under Rendering panel by setting forced-colors to active
- This affects users with visual impairments who rely on high contrast or forced color accessibility settings

**Why do I care:** I find forced colors testing missing from the accessibility test checklist of almost every team I work with. Developers test keyboard navigation and screen reader semantics but rarely simulate how the page looks with forced colors active. This specific box-shadow pattern is extremely common in design systems that care about polished focus ring aesthetics, which means it's likely breaking focus visibility for the users who need it most in exactly the products that seem most visually refined.

**Link:** [box-shadow is no alternative to outline](https://www.matuzo.at/blog/2026/box-shadow-no-alternative-to-outline)

---

# MJML 5.0.0 Released

**TLDR:** MJML 5.0.0 ships with a modernized toolchain replacing legacy `html-minifier` and `js-beautify` with `htmlnano` and `cssnano`, stricter and more secure handling of `mj-include`, a restructured outer HTML skeleton tied to `mj-body`, Node.js 20/22/24 support, and a smaller browser bundle.

**Summary:** Email HTML is still one of the most painful corners of frontend development, and MJML has been the most reasonable way to handle it for years. Version 5 is a breaking change release but a relatively contained one if you haven't been doing anything too unusual with the toolchain.

The headline change is swapping the legacy minifiers. `html-minifier` and `js-beautify` are out; `htmlnano` and `cssnano` are in. The generated output will look different, more aggressively minified, so any CI tests that do exact snapshot comparisons on the HTML output will need updating. More importantly, teams using template syntax like Handlebars or Liquid on top of MJML templates need to test carefully because the CSS minification pass now sanitizes template tokens before running PostCSS and restores them afterward, and some patterns may behave differently.

The `mj-include` changes deserve attention if you're using modular email template composition. Includes are now ignored by default and require explicit configuration with a new `includePath` option. This is a security improvement for containerized and hosted environments, but it's a meaningful behavioral change if your build system relied on implicit include loading.

The `mj-body` restructuring means the `<body>` HTML tag is now generated from the component rather than the global skeleton. The `class` attribute on `mj-body` now applies to the `<body>` tag instead of the inner div, and `background-color` applies to the child div only. If you have external CSS targeting those specific structures, test carefully.

**Key takeaways:**
- `html-minifier` and `js-beautify` replaced with `htmlnano` and `cssnano`; snapshot tests on raw HTML output will need updating
- `mj-include` is now ignored by default; use `includePath` in `.mjmlconfig` to explicitly allow includes
- `mj-body`'s `class` attribute now applies to `<body>` directly; `background-color` applies to the child div
- Node.js 16 and 18 are no longer supported; CI should target Node 20, 22, or 24
- Browser bundle shrunk from 1.22MB to 1.04MB

**Why do I care:** Email tooling upgrades are tedious but MJML 5 is addressing genuine technical debt, particularly the security hardening around includes and the move away from abandoned minifier libraries. If your organization sends transactional or marketing email through an MJML-based template system, plan the upgrade now rather than being stuck on Node 18 when it goes end of life.

**Link:** [MJML v5.0.0 Release Notes](https://github.com/mjmlio/mjml/releases/tag/v5.0.0)

---

# LiquidGlass: WebGL Glass Refraction for HTML Elements

**TLDR:** LiquidGlass is a TypeScript library that applies realistic glass refraction, blur, chromatic aberration, and lighting effects to HTML elements using a multi-pass WebGL shader pipeline that captures DOM content as a texture behind each glass element and composites the result in real time.

**Summary:** Apple's visionOS UI language made glass effects fashionable again, and this library is a serious implementation of the idea for web interfaces. The technical approach is interesting: LiquidGlass captures the DOM content behind each glass element, feeds it into a WebGL pipeline with configurable refraction, blur, chromatic aberration, edge highlight, specular lighting, and Fresnel reflection parameters, and composites the result back in real time. Glass-on-glass layering is supported.

The configuration model is flexible. Individual glass elements can be configured via `data-config` JSON attributes or globally via the init options. Button mode adds hover and press shader feedback. Dome bevel mode creates a half-sphere lens effect. A floating mode makes panels draggable. The whole thing is available as an npm package or importable from a CDN.

The limitations section is honest and worth reading before you decide to use this in production. DOM-to-canvas capture is expensive. Every non-glass element in the root is rasterized via `html-to-image` on a per-frame basis for dynamic content. Browsers cap WebGL contexts (typically 16 system-wide), so you can't spawn dozens of instances. Window resize re-captures everything. Cross-origin images need `crossorigin="anonymous"` or they taint the canvas and disable the effect. Init is async and can take 100-500ms on slow connections.

This is best suited for showcase interfaces, interactive portfolios, and UI components where the visual effect is worth the performance budget. For the right use case it's quite striking.

**Key takeaways:**
- Uses multi-pass WebGL shaders to apply refraction, blur, chromatic aberration, specular, and Fresnel effects to DOM-captured textures
- Glass elements must be direct children of the root; nested glass requires a separate `LiquidGlass.init()` call
- DOM rasterization is expensive; avoid large or deeply nested wrapper elements in the root
- Browsers cap concurrent WebGL contexts; don't instantiate many LiquidGlass roots on one page
- Dynamic content should use `data-dynamic` attribute or `instance.markChanged()` to avoid unnecessary full re-captures

**Why do I care:** I'd use this carefully and only where the effect meaningfully contributes to the experience rather than just because it's possible. But for landing pages, portfolio work, or UI components where glass depth is part of the visual identity, having a library that does this properly rather than faking it with CSS `backdrop-filter` and accepting its limitations is genuinely useful.

**Link:** [LiquidGlass](https://liquid-glass.ybouane.com/)

---

# TypeGPU: Type-Safe WebGPU Toolkit

**TLDR:** TypeGPU is a TypeScript-first library that wraps WebGPU's raw API with a typed schema layer, enabling IDE-level type safety and inference across both JavaScript/TypeScript and WGSL shader code, reducing the mental overhead of maintaining consistency between the CPU and GPU sides of a WebGPU application.

**Summary:** WebGPU is one of the more exciting platform additions of recent years, but its raw API surface is deliberately low-level, and the gap between "what TypeScript knows about" and "what the GPU actually receives" has always been managed manually by developers. TypeGPU is an attempt to bridge that gap by defining typed schemas for buffers, textures, and bindings, and generating the corresponding WGSL code from those definitions.

The core value proposition is eliminating a whole class of runtime errors that come from CPU-GPU interface mismatches. If your TypeScript says a buffer contains arrays of 32-bit floats with a specific struct layout, TypeGPU can verify that your shader accesses it accordingly. The type system extends into the shader code itself through a typed WGSL abstraction, so you get IDE completions and type errors crossing the traditionally opaque CPU-GPU boundary.

For anyone building data visualizations, game mechanics, simulation tools, or the kinds of shader-heavy UI effects discussed in the HTML-in-Canvas article above, WebGPU is increasingly the right tool. TypeGPU makes it significantly more approachable for TypeScript developers who are comfortable with strong types but unfamiliar with GPU programming conventions. The examples available in the documentation range from basic rendering to fluid simulation and caustics effects.

**Key takeaways:**
- Typed schemas for WebGPU buffers, textures, and bindings provide compile-time verification of CPU-GPU interface consistency
- Type safety extends into WGSL shader code, enabling IDE completions and cross-boundary type errors
- Reduces the runtime debugging burden of buffer layout mismatches between JavaScript and shaders
- Available as a TypeScript library with detailed documentation and runnable examples
- Pairs well with the growing interest in WebGPU for high-performance frontend graphics

**Why do I care:** Raw WebGPU is powerful but punishing for developers used to TypeScript's safety guarantees. TypeGPU addresses the exact friction point that makes GPU programming feel alien to web developers. If you've wanted to explore WebGPU for data visualization or interactive effects but found the API too low-level, this is worth a look.

**Link:** [TypeGPU: Type-Safe WebGPU Toolkit](https://docs.swmansion.com/TypeGPU/)
