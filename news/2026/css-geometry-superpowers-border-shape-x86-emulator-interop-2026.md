---
title: "CSS Gets Geometry Superpowers: border-shape, corner-shape, x86 Emulators, and Interop 2026"
excerpt: "From non-rectangular borders and superellipses to a working x86 CPU built entirely in CSS, this week's frontend highlights redefine what the platform can do."
publishedAt: "2026-02-25"
slug: "css-geometry-superpowers-border-shape-x86-emulator-interop-2026"
hashtags: "#frontend-focus #frontend #webdev #css #performance #architecture #accessibility #animation #navigation #typography #browser-compat #generated #en"
---

## border-shape: The Future of Non-Rectangular Web Design

**TLDR:** CSS is getting `border-shape`, a new property that redefines an element's entire box geometry -- not just its corners. Unlike `clip-path`, backgrounds, borders, outlines, and shadows all follow the new shape automatically.

Una Kravets walks us through what might be the most significant geometric leap CSS has taken in years. The `border-shape` property, currently testable in Chrome Canary 146+, accepts basic shapes like `circle()` and `ellipse()`, the new `shape()` function, and SVG-like `path()` strings. The critical difference from `clip-path` is architectural: `border-shape` redefines the box model itself, meaning everything -- background, border-image, focus outlines, box-shadows -- conforms to the new geometry without additional hacks.

The practical implications are immediate. Tooltips, for instance, have been a persistent pain point. Developers have been hacking together pseudo-elements and clip-paths for years to get that little arrow on a speech bubble. With `border-shape`, you define the tooltip geometry once, and borders and shadows just work. The chevron navigation demo is equally compelling -- no z-index gymnastics, no layering tricks, just real geometry with proper gap support.

What the article doesn't dwell on enough is the performance story. Every time we add geometric complexity to the rendering pipeline, we're asking the browser to do more work during paint. The fact that this is behind an experimental flag suggests the Chrome team is still working through those implications. For architects evaluating this, the question isn't whether `border-shape` is powerful -- it clearly is -- but whether the rendering cost scales linearly with shape complexity or whether certain patterns (like the scalloped border demo) could become performance traps.

The `shape()` function syntax is also worth watching closely since it's part of Interop 2026, which means cross-browser support is being actively coordinated. That said, the current Chrome-only availability means this is firmly in the "experiment and learn" category for production work.

**Key takeaways:**
- `border-shape` redefines the box itself, unlike `clip-path` which only masks
- Backgrounds, borders, outlines, and shadows all follow the new shape
- Currently requires Chrome Canary 146+ with experimental flags enabled
- The `shape()` function used within `border-shape` is part of Interop 2026
- Tooltips and non-rectangular UI elements become dramatically simpler

**Link:** [border-shape: the future of the non-rectangular web](https://una.im/border-shape)

## Implementing CSS corner-shape in Blink: The Math Behind the Magic

**TLDR:** A Chrome developer reveals the surprising mathematical complexity behind `corner-shape` -- from symbolic regression for Bezier curve approximation to handling non-uniform borders on concave superellipses. What looks like a simple CSS property hides serious computational challenges.

Noam Rosenthal's deep dive into the Blink implementation of `corner-shape` is the kind of article that makes you appreciate what browser engineers actually do. The property takes a single value -- a superellipse exponent -- but the implementation requires solving several non-trivial graphics problems that most frontend developers never think about.

The symmetry problem is fascinating. Mathematically, the inverse formula for concave superellipses doesn't produce visually symmetrical curves relative to their convex counterparts. The CSS spec chose visual symmetry over mathematical purity, which is the right call for a design-facing API but means the implementation needs to transform coordinates under the hood. This is a recurring pattern in browser engineering: the spec prioritizes developer intuition, and the engine absorbs the complexity.

The Bezier curve approximation is where it gets genuinely clever. Superellipses aren't natively understood by graphics engines like Skia -- those engines work with Bezier curves. So the implementation uses symbolic regression to find a formula that maps a superellipse to a single cubic Bezier curve per half-corner. The resulting formula involves logarithms, hyperbolic tangents, and logistic functions -- all to make `corner-shape: squircle` render efficiently.

The border and shadow rendering challenges are where things get gnarly for team leads evaluating this feature. Non-uniform borders (different widths per side) on concave superellipses create a "belly" effect where naive offset calculations produce visually uneven widths. The solution involves computing normals of quadratic curve approximations -- a level of mathematical sophistication that underscores why browser features take years to ship.

For architects, the takeaway is that `corner-shape` is not a thin CSS veneer. The rendering pipeline changes are substantial, and understanding that complexity helps explain why certain edge cases (like concave corners with multi-color borders) might render slightly differently across engines.

**Key takeaways:**
- The CSS superellipse function maps values differently than the mathematical definition for visual symmetry
- Each superellipse half-corner is approximated as a single cubic Bezier curve using symbolic regression
- Non-uniform borders on concave shapes require normal vector computation to avoid visual artifacts
- Color joins (where different border colors meet at corners) are unspecified in CSS yet browsers render them consistently
- The implementation handles convex shapes natively and transforms for concave equivalents

**Link:** [The corner cases of implementing CSS corner-shape in Blink](https://developer.chrome.com/blog/implementing-corner-shape)

## Someone Built an x86 Emulator in Pure CSS

**TLDR:** A working x86 CPU emulator running compiled C programs, implemented entirely in CSS with no JavaScript. It uses CSS `if()` statements, style queries, and custom `@functions` to achieve Turing completeness.

This is the kind of project that makes you question everything you thought you knew about CSS. The x86CSS project is a functioning 8086 emulator that executes real compiled C programs -- GCC output, running in Cascading Style Sheets. No JavaScript. The author explicitly states they do not use AI to build it, adding: "I don't think you can build a project like this with an LLM."

Let's be honest about what this is and isn't. It's not practical. The author admits you'd get better performance writing logic directly in CSS rather than emulating an entire CPU architecture. But that misses the point entirely. This project is a proof of concept that CSS, with its newer features like `if()` statements, style container queries, and custom `@functions`, has crossed a computational threshold. The clock mechanism is particularly interesting -- it uses an animation combined with style container queries to advance state without any user interaction, making it genuinely autonomous.

The implementation only works in Chromium-based browsers because it relies on CSS features that haven't landed elsewhere yet. That's a telling detail about the state of CSS evolution -- the language is gaining capabilities faster than cross-browser implementations can keep up. The author has implemented most of the 8086 instruction set, enough to run GCC-compiled C programs, though some flag behaviors are deliberately omitted.

What should make architects and framework developers think is the trajectory this represents. If CSS can emulate an x86 CPU today, the argument that "CSS isn't a programming language" is definitively over. The more interesting question is what this means for the boundary between styling and logic in component architectures. We keep drawing that line, and CSS keeps stepping over it.

**Key takeaways:**
- Fully functional 8086 CPU emulator running in CSS only, executing GCC-compiled C programs
- Uses CSS `if()`, style container queries, and custom `@functions` -- all cutting-edge features
- Currently Chromium-only due to feature dependencies
- You can compile and run your own C programs in it
- A definitive answer to "Is CSS a programming language?"

**Link:** [x86CSS](https://lyra.horse/x86css/)

## Navigation API is Now Baseline: The Router We Always Wanted

**TLDR:** The Navigation API has reached Baseline Newly Available status across all major browsers, replacing the decade-old History API with a centralized, event-driven approach to SPA navigation that handles URL updates, accessibility, and back/forward buttons automatically.

After more than a decade of wrestling with `history.pushState()` and the `popstate` event, the web platform finally has a proper navigation primitive. The Navigation API provides a single `navigate` event that catches everything -- link clicks, form submissions, back/forward buttons, and programmatic navigation -- in one centralized handler. The `event.intercept()` method handles URL updates, history stack management, and focus restoration automatically.

The architectural improvement is substantial. With the History API, building a client-side router meant intercepting anchor clicks globally, calling `preventDefault()`, manually calling `pushState()`, separately listening for `popstate`, and hoping you didn't forget an edge case. The Navigation API collapses all of that into a single event listener. The API also integrates cleanly with View Transitions, which means you can wrap DOM updates in `document.startViewTransition()` during navigation intercept for app-like page transitions.

The form submission handling deserves attention from teams building SPAs. The `NavigateEvent.formData` property lets you intercept standard HTML form POSTs and process them asynchronously without any `onsubmit` handlers. This is a meaningful step toward the "HTML-first, enhance with JS" philosophy that the platform has been slowly embracing.

What the article doesn't adequately address is the migration story. If you're using React Router, Next.js, or any other routing library, the Navigation API doesn't replace those overnight. These libraries provide route matching, code splitting, data loading patterns, and other higher-level abstractions that the raw Navigation API doesn't. The real impact will be felt in how these libraries rewrite their internals to use the Navigation API instead of the History API, which should eliminate entire categories of edge-case bugs.

**Key takeaways:**
- Single `navigate` event replaces the fragmented History API approach
- `event.intercept()` handles URL updates, history management, and focus restoration automatically
- Built-in support for form submission interception via `NavigateEvent.formData`
- Manual scroll timing with `event.scroll()` solves the SPA scroll restoration problem
- Integrates naturally with View Transitions for animated page changes
- Framework routing libraries will benefit most by rebuilding on this foundation

**Link:** [Navigation API - a better way to navigate, is now Baseline Newly Available](https://web.dev/blog/baseline-navigation-api?hl=en)

## HTML Video and Audio Lazy-Loading is Coming to Browsers

**TLDR:** The `loading="lazy"` attribute is being standardized for `<video>` and `<audio>` elements, following the same pattern as images and iframes. Already available behind a flag in Chrome Canary, with spec proposals and browser patches in active review.

Scott Jehl and his team at Squarespace have been driving this standardization effort, and the progress since December has been remarkable. The feature works exactly as you'd expect if you've used `loading="lazy"` on images: add the attribute to a video or audio element, and the browser defers loading assets (including poster images) and delays autoplay until the element is visible in the viewport.

The HTTP Archive data makes the case clearly -- video and audio files are among the heaviest resources on web pages. A declarative HTML attribute that eliminates unnecessary media loading without any JavaScript is exactly the kind of platform improvement that has outsized impact. No IntersectionObserver setup, no lazy-loading libraries, no framework-specific solutions. Just an HTML attribute.

The performance guidance is worth internalizing early: don't use `loading="lazy"` on media that's visible when the page first loads. The attribute naturally delays resource requests until layout determines visibility, which means above-the-fold video will load later than it would without the attribute. This is the same guidance that applies to lazy-loaded images, but it bears repeating because video tends to be placed prominently.

What's particularly encouraging about this effort is the standards-first approach. The HTML spec proposal, Web Platform Tests, and browser patches for Firefox, WebKit, and Chromium are all progressing in parallel. The attribute gracefully degrades -- browsers that don't support it simply ignore it -- so there's no risk in adding it to your markup today.

**Key takeaways:**
- `loading="lazy"` for `<video>` and `<audio>` follows the same pattern as images and iframes
- Available now in Chrome Canary behind the `LazyLoadVideoAndAudio` flag
- Defers all asset loading including poster images and delays autoplay until visibility
- Don't use on above-the-fold media -- it will delay loading of immediately visible content
- The attribute is safely ignored by browsers that don't support it yet

**Link:** [Standard HTML Video & Audio Lazy-loading is Coming!](https://scottjehl.com/posts/lazy-media/)

## Announcing Interop 2026: Twenty Focus Areas for Browser Consistency

**TLDR:** The fifth annual Interop project brings together Apple, Google, Igalia, Microsoft, and Mozilla around twenty focus areas including anchor positioning, Navigation API, View Transitions, scroll-driven animations, and the new `contrast-color()` function.

The Interop 2026 announcement is dense, covering twenty focus areas and four investigation efforts. The most impactful items for frontend teams are the ones that unlock capabilities currently stuck behind single-browser implementations. `contrast-color()` is a standout -- it lets the browser choose black or white text based on which has higher contrast with a given background color. Safari and Firefox shipped it in 2025, and Interop 2026 will push it across all engines.

Container style queries making the list is significant for design system architects. The ability to conditionally apply styles based on custom property values at a container level -- `@container style(--theme: dark)` -- fundamentally changes how theming can be implemented. It moves theme switching from a global concern to a component-scoped one, which aligns with how modern component architectures actually work.

The investigation efforts are worth tracking too. JPEG XL getting investigation status means the format could become a focus area in future years. Mobile testing infrastructure improvements directly affect whether features work reliably on the devices most people actually use. The WebVTT investigation addresses a real pain point -- inconsistent subtitle and captioning behavior has been pushing developers toward custom solutions for years.

For teams making technology decisions, the Interop list serves as a reliable signal of what will reach cross-browser stability within the year. Features on this list have committed engineering resources from all major browser vendors, which dramatically reduces the risk of adopting them.

**Key takeaways:**
- Twenty focus areas including fifteen new ones and five carried over from 2025
- `contrast-color()` automates text color selection for accessibility
- Container style queries enable component-scoped theming
- `shape()`, scroll-driven animations, and view transitions are being standardized cross-browser
- Scoped custom element registries solve the web component naming collision problem
- JSPI for Wasm bridges the sync/async gap for porting native applications to the web
- Media pseudo-classes (`:playing`, `:paused`, `:buffering`, etc.) finally getting cross-browser attention

**Link:** [Announcing Interop 2026](https://webkit.org/blog/17818/announcing-interop-2026/)

## Everything You Never Wanted to Know About visually-hidden

**TLDR:** A comprehensive archaeological dig into the visually-hidden CSS class, tracing its origins from 2003 skip-navigation hacks through two decades of browser bugs, revealing that the modern web still doesn't have a native solution -- and many experts argue it shouldn't.

David Bushell's deep dive into the visually-hidden pattern is part history lesson, part cautionary tale. The class that most developers copy without thinking has a lineage stretching back to 2003, when Bob Easton and others were trying to solve skip-navigation accessibility for the then-new CSS-based layouts replacing table soup. What started as `position: absolute; width: 0; height: 0; overflow: hidden` has accumulated properties over two decades, each one patching a specific browser bug or screen reader quirk.

The archaeological trail is genuinely fascinating. The 1px dimensions exist because Window-Eyes didn't read zero-sized elements (2004). The `white-space: nowrap` was added because text wrapping inside a 1px box caused screen readers to read words as individual characters (2016). The `margin: -1px` appears and disappears from implementations because it simultaneously fixes one bug and introduces another. Each property in the kitchen-sink version is a fossilized bugfix, and nobody is entirely sure which ones are still necessary.

Ana Tudor's provocative question -- "Is `position: absolute; clip-path: circle(0);` enough in 2026?" -- doesn't have a clean answer. Several reduced implementations have been proposed and tested, but none have been validated across every combination of browser and assistive technology. The NVDA 2026.1 release notes mention that zero-width elements are no longer treated as invisible in browse mode, which potentially invalidates one of the oldest assumptions in the pattern.

The most thought-provoking section is the debate about whether a native `visually-hidden` should exist. Scott O'Hara and Sara Soueidan argue convincingly that standardizing the hack would enshrine bad design practices -- developers would lean on it instead of fixing the underlying information architecture. Adrian Roselli's priority of methods for labeling controls reinforces this: hidden text should be a last resort, not a first instinct. Bob Easton himself, reached for comment, emphasized that good semantic structure eliminates most needs for hidden content.

**Key takeaways:**
- The visually-hidden class has accumulated properties over 20+ years, each fixing a specific bug
- No one has comprehensively tested whether a minimal two-property version works across all assistive technology
- NVDA 2026.1 changed how it handles zero-width elements, potentially affecting existing implementations
- Many accessibility experts argue against a native `visually-hidden` standard, viewing it as enshrining a hack
- The real solution is better semantic HTML and design that doesn't require hidden text

**Link:** [Everything you never wanted to know about visually-hidden](https://dbushell.com/2026/02/20/visually-hidden/)

## Typographic Scales in CSS with :heading(), sibling-index(), and pow()

**TLDR:** Three new CSS features -- the `:heading()` pseudo-class, `sibling-index()`, and `pow()` -- combine to let you define an entire typographic scale in a single rule, replacing six separate heading declarations with one mathematical expression.

Stuart Robson demonstrates what happens when CSS gets proper mathematical functions. Instead of manually calculating and declaring font sizes for each heading level, you define a scale ratio and base size, then let `pow()` compute the exponential progression: `font-size: calc(var(--base) * pow(var(--ratio), 6 - sibling-index()))`. Change the ratio from Major Third (1.25) to Perfect Fourth (1.333), and every heading on your site updates instantly.

The elegance is real, but the limitations matter. The `sibling-index()` approach only works when headings appear in strict h1-through-h6 order as siblings. Repeat an h3 and the second one gets sized like an h4 because its sibling index is higher. The article provides a fallback using explicit `--heading-level` custom properties per heading level, which works regardless of document order but requires six additional declarations -- still fewer than the traditional approach.

The responsive typography angle is where this becomes architecturally interesting. By changing a single `--typographic-scale` custom property at different breakpoints, you can use a tighter Minor Third (1.2) scale on mobile and a more dramatic Perfect Fourth (1.333) on large screens. The entire heading hierarchy adjusts proportionally. Combine this with the `:heading(1, 2, 3)` selector for tiered font weights, and you have a complete heading design system in roughly 30 lines of CSS.

The browser support caveat is significant: only Safari Technology Preview currently supports all three features together. Chrome has `:heading()` in development, Firefox is working on `sibling-index()`. This is firmly experimental territory, but the pattern it establishes -- expressing design systems as mathematical relationships rather than exhaustive declarations -- points to where CSS is heading.

**Key takeaways:**
- `pow()` enables exponential typographic scales directly in CSS
- `sibling-index()` provides the element's position among siblings for dynamic computation
- `:heading()` pseudo-class simplifies targeting heading groups
- The sibling-index approach breaks with non-sequential heading order; explicit level variables are the robust alternative
- Currently only works in Safari Technology Preview
- Responsive scales become trivial: change one variable at a breakpoint

**Link:** [Typographic Scales in CSS with :heading(), sibling-index(), and pow()](https://www.alwaystwisted.com/articles/building-typographic-scales-with-headings-sibling-index-and-pow)

## Honoring Mobile OS Text Size on the Web

**TLDR:** When users adjust text size in Android or iOS accessibility settings, web pages don't consistently respond. Each browser engine has a different approach, and Adrian Roselli shows how to combine them into a cross-browser solution using two lines of code.

This is one of those accessibility issues that hides in plain sight. Users who need larger text set their OS-level font size preference, expecting it to affect everything on their device. Web pages often ignore it entirely. The fragmentation across rendering engines makes this worse: Firefox on Android just works (it scales text regardless of CSS units), Safari requires an Apple-specific `font: -apple-system-body` declaration, and Chrome is introducing a new `<meta name="text-scale" content="scale">` tag via the CSSWG.

The "Frankenstyle" solution Roselli presents combines the Safari and Chrome approaches: add the meta tag to your HTML head, add the Apple font declaration with a feature query to your CSS, and Firefox handles itself. It's pragmatic but ugly -- two different platform-specific mechanisms duct-taped together to achieve what should be default browser behavior.

The deeper issue Roselli is circling around is that Chrome's approach requires authors to opt in and avoid fixed font-size units. If you set `font-size: 16px` on your body, the text-scale meta tag won't help. You need percentages or no explicit base size at all. This is the same relative-units argument accessibility advocates have been making for over a decade, now backed by a concrete browser feature that rewards the practice.

For teams and architects, this is a concrete accessibility requirement that's easy to test and fix. Visit your site on a mobile device with the largest text size setting, and see what happens. If your text doesn't scale, you're failing a significant portion of users who have explicitly told their device they need larger text.

**Key takeaways:**
- Firefox on Android respects OS text size by default, regardless of CSS units
- Safari requires `font: -apple-system-body` and a feature query
- Chrome is introducing `<meta name="text-scale" content="scale">` (currently in Canary)
- All approaches require relative font-size units to work properly
- The combined solution is two declarations: one HTML meta tag and one CSS block
- This is a testable accessibility requirement: check your site with max OS text size

**Link:** [Honoring Mobile OS Text Size](https://adrianroselli.com/2026/02/honoring-mobile-os-text-size.html)

## Sprites on the Web: When and Why to Use Them in 2026

**TLDR:** Josh Comeau demonstrates CSS sprite animation using `object-fit`, `object-position`, and the `steps()` timing function, arguing that while sprites are no longer necessary for performance, they excel at creating pixel-art-style character animations.

The article opens with Twitter's 2015 "Like" button animation -- 14 particles, a popping circle, and a heart, all rendered as a sprite strip because low-end mobile devices couldn't handle that many simultaneous DOM animations. Comeau's key insight is that this rationale no longer holds in 2026. Modern devices and browsers can easily handle procedural animations with that level of complexity, and procedural approaches offer something sprites can't: randomness. A procedurally generated burst of particles looks slightly different every time, while a sprite replays identically.

The technical implementation is clean: use `object-fit: cover` on an `<img>` to show one frame of a spritesheet, `object-position` to select which frame, and a `steps()` timing function to flip between frames discretely instead of smoothly. The `jump-none` step position is a detail that trips people up -- by default, `steps()` excludes the final value, which works for non-looping animations but creates a visual gap in loops.

The real argument for sprites in 2026 is aesthetic, not performance. They look like sprites -- pixel art characters, retro game animations, illustrated mascots. The sleeping cat example that slows its breathing animation when idle demonstrates how sprites can be more dynamic than animated GIFs while maintaining that hand-drawn quality. You can change animation duration, swap spritesheets based on state, and compose multiple sprites together, all with CSS.

**Key takeaways:**
- Sprites are no longer needed for performance; procedural animations are fine on modern devices
- Use `object-fit: cover` and `object-position` to display individual sprite frames
- The `steps(n, jump-none)` timing function prevents frame skipping in looped animations
- Sprites excel at pixel-art-style animations where the hand-drawn aesthetic is the point
- Procedural animations offer randomness that sprites can't match

**Link:** [Sprites on the Web](https://www.joshwcomeau.com/animation/sprites/)

## An In-Depth Guide to Customising Lists with CSS

**TLDR:** A comprehensive guide covering everything from `::marker` pseudo-elements and `@counter-style` rules to fully custom marker boxes using `::before` pseudo-elements, with clear guidance on which technique to use for each use case.

This article from Piccalilli is the kind of reference you bookmark and come back to. It methodically covers every CSS technique for styling lists, from the basics (`list-style-type`, `list-style-image`) through the intermediate (`::marker` pseudo-element, `@counter-style`) to the advanced (removing markers entirely and building custom ones with `::before` and CSS counters).

The `@counter-style` rule is the underappreciated hero here. It lets you define custom numbering sequences with specific systems (cyclic, symbolic, alphabetic, additive), custom symbols, prefixes, suffixes, padding, ranges, and even `speak-as` for screen readers. It became Baseline Newly Available in September 2023, meaning it works across all modern browsers -- yet most developers still don't know it exists. The `extends` system is particularly useful: instead of defining decimal counting from scratch, you extend the existing `decimal` style and just change the suffix.

The `::marker` limitations are honestly presented. You can only change color and `font-` properties -- no background, no positioning, no layout. And `content` generation on markers isn't supported in Safari with no support in sight. For anything beyond basic color and font changes, you need the `::before` technique with `list-style: none` and explicit ARIA `role="list"` to maintain accessibility in Safari.

The practical summary table at the end is exactly what you need for decision-making: `list-style` for basic changes, `::marker` for color and font, `@counter-style` for custom sequences, `extends` for modifying existing systems, and `::before` for full positioning control.

**Key takeaways:**
- `@counter-style` is Baseline Newly Available and supports custom symbol sequences cross-browser
- `::marker` content generation works in Chrome and Firefox but not Safari
- Removing list markers with `list-style: none` requires `role="list"` for Safari accessibility
- The `extends` system lets you modify existing counter styles without redefining them
- Use `::before` pseudo-elements when you need full control over marker positioning and size
- `symbols()` function is Firefox-only; use `@counter-style` instead

**Link:** [An in-depth guide to customising lists with CSS](https://piccalil.li/blog/an-in-depth-guide-to-customising-lists-with-css/)

## CSS Proposal: :near() Pseudo-Class for Pointer Proximity

**TLDR:** A new CSS Working Group proposal for a `:near(<length>)` pseudo-class that would match elements when a pointing device is within a specified distance, enabling "pre-hover" effects without JavaScript.

This CSSWG proposal tackles a pattern that currently requires JavaScript `pointermove` handlers and custom geometry calculations: detecting when a pointer approaches an element before actually hovering over it. The syntax is intentionally simple -- `button:near(200px) { outline: 1px solid; }` -- providing a boolean threshold rather than continuous pointer coordinates.

The use cases are practical: revealing toolbars as users approach them, increasing contrast on small icon buttons as the pointer nears, or showing contextual hints before hover. These are all patterns that exist in production today, implemented with JavaScript event handlers and bounding rect calculations. A CSS-native solution would be both more performant and more maintainable.

The open questions in the proposal reveal the real complexity. Which geometry should the distance be measured from -- border box, painted geometry, or post-transform shape? Should it consider stacking context and only match topmost elements? How should it interact with `pointer-events: none`? The performance implications of `*:near(999999px)` -- effectively a global proximity listener -- are acknowledged, with UAs expected to clamp large values.

The privacy considerations are subtle and important. Even without JavaScript, `:near()` could enable tracking through conditional resource loads (changing a `background-image` based on proximity). This is a vector that CSS-based fingerprinting has exploited before, and the proposal acknowledges it needs mitigation.

**Key takeaways:**
- Boolean threshold pseudo-class for pointer proximity, not continuous coordinates
- Would replace JavaScript `pointermove` patterns for common "pre-hover" UI effects
- Open questions remain about geometry reference, stacking context interaction, and performance
- Privacy implications through conditional resource loading need mitigation
- Currently at proposal stage in CSSWG

**Link:** [:near() pseudo-class proposal](https://github.com/w3c/csswg-drafts/issues/13271)
