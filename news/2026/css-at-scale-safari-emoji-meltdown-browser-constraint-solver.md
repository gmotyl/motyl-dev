---
title: "CSS at Scale, Safari's Emoji Meltdown, and the Browser as Constraint Solver"
excerpt: "A deep dive into how 100,000 websites use CSS, a heart emoji that broke Safari, browser interop victories, and why your browser hates surprises."
publishedAt: "2026-02-12"
slug: "css-at-scale-safari-emoji-meltdown-browser-constraint-solver"
hashtags: "#frontend-focus #frontend #webdev #generated #en #css #safari #performance #accessibility #interop #react #devtools"
---

## The CSS Selection - 2026 Edition

**TLDR:** Project Wallace analyzed CSS across 100,000+ websites and found the median site ships 309 KB of CSS with 2,802 rules. New features like `:has()` and `:where()` show impressive adoption, but `@supports` and `@layer` remain criminally underused.

**Summary:**

Alright folks, this is one of those articles that makes you simultaneously proud and embarrassed to be a web developer. Bart Veneman over at Project Wallace scraped over 100,000 websites and ran them through a CSS analyzer, giving us the first comprehensive look at how the world actually writes CSS in 2026. And the results are fascinating.

Let's start with the headline numbers. The median website ships 309 KB of uncompressed CSS. That is a lot of design system declarations and third-party widget styling. The 90th percentile hits 1.12 MB, which is just bonkers. In terms of rules, the median site has 2,802 CSS rules, with the most extreme outlier clocking in at 210,695 rules on a single page. Someone out there is having a very bad day.

The adoption numbers for newer CSS features are genuinely encouraging. `:where()` has made it into the top three pseudo-classes at 90.56%, sitting right between `:hover` and `:focus`. And `:has()` is used on 41% of websites, which is remarkable for a feature that only became baseline in December 2023. But here is the thing that nags at me: `@supports` is only used on 44% of sites, and `@layer` sits at a paltry 2.71%. These are tools that exist to manage complexity, and the data suggests most teams are not even reaching for them. The `@layer` adoption is almost entirely driven by TailwindCSS, and `@property` adoption is similarly framework-driven. So the question is: are developers actually learning these features, or are their tools using them on their behalf?

What is missing from this analysis, and Bart admits this openly, is correlation data. Does heavy `!important` usage correlate with specificity problems? Do sites with lots of embedded content have proportionally larger file sizes? That would tell a much richer story. Also, the scraping methodology used static HTML, not a headless browser, which means JavaScript-injected styles are invisible. That is a significant blind spot in 2026.

The browser hack data is the part that should make us all wince. Nearly 19% of websites still use the `*property` hack targeting IE 6 and 7. In 2026. Let that sink in.

**Key takeaways:**
- Median web CSS: 309 KB uncompressed, 2,802 rules
- `:has()` adoption at 41% is remarkably fast for a feature this new
- `@supports` and `@layer` are underutilized relative to their value
- Nearly 19% of sites still carry IE 6/7 CSS hacks
- `px` remains king of units at 98.28% adoption

**Link:** [The CSS Selection - 2026 Edition](https://www.projectwallace.com/the-css-selection/2026)

---

## A Broken Heart: Getting a 100x Speedup with One Dumb Line of Code

**TLDR:** A heart emoji caused Safari to spend 1,600ms per layout pass because Noto Color Emoji falls back to SVG rendering in WebKit, creating a 100x slowdown. The fix was one line: list "Apple Color Emoji" before "Noto Color Emoji" in your font stack.

**Summary:**

This is one of those war stories that is both hilarious and terrifying. Allen Pike was debugging a dashboard that had gone from loading in one second to taking ten. He did what many of us would do: he blamed React, had Claude investigate, fixed some memoization issues and unnecessary re-renders, and... nothing changed. Classic.

So he actually dug into the performance timeline and discovered something wild. Safari was spending 94% of an M1 Max CPU on Layout. Not JavaScript parsing, not network, not style calculation. Layout. Multiple passes taking over 1,600 milliseconds each. For a web app dashboard. Something was very wrong.

Using binary search, systematically removing code until the problem disappeared, he narrowed it down to a heart emoji in a "Send Feedback" button. Remove the emoji: 2ms layout. Add it back: 1,600ms. One hundred times slower because of a single character.

The root cause turned out to be Noto Color Emoji, a Google font they had included for consistent emoji rendering on Linux. The font uses COLRv1, and when Safari encounters this, it falls back to SVG rendering for each glyph. And apparently, that SVG rendering path through CoreSVG is catastrophically slow for certain glyphs. Not all glyphs either, which is the maddening part. The heart and mind-blown emoji take 1,600ms, but the basket emoji takes 0.2ms.

Here is the part that Allen is honest about but that deserves more scrutiny: it was Claude that suggested using Noto Color Emoji in the first place. The AI coding assistant both created the problem and helped solve it. That is a pattern we are going to see more and more. These tools are incredibly productive but they introduce dependencies and choices that the developer might never have made themselves, and when things go sideways, the debugging surface area is larger because you did not author those decisions yourself.

The practical takeaway is dead simple: if you use Noto Color Emoji, put "Apple Color Emoji" first in your font-family stack on Apple platforms. But the deeper lesson is about the fragility hiding in our font stacks and how a single font declaration can create performance cliffs that no amount of React optimization will fix.

**Key takeaways:**
- Noto Color Emoji + Safari can cause 100x layout slowdowns for specific glyphs
- Always list platform-native emoji fonts first in your font stack
- AI coding assistants can both introduce and solve obscure problems
- When React optimization does not help, look at layout and fonts
- Binary search remains one of the most powerful debugging techniques

**Link:** [A Broken Heart](https://allenpike.com/2026/a-broken-heart/)

---

## Interop 2025: A Year of Convergence

**TLDR:** The Interop 2025 project brought browser pass rates from 29% to 97% across 19 focus areas. Safari made the largest jump, climbing from 43 to 99, and anchor positioning, view transitions, and the Navigation API are now interoperable across all browsers.

**Summary:**

This is the kind of article that restores your faith in the web platform. The Interop project, now in its fourth year, selected 19 focus areas and 5 investigation areas spanning CSS, JavaScript, Web APIs, and performance. At the start of 2025, only 29% of the selected tests passed across all browsers. By year end: 97%. All four experimental browsers hit 99%.

The three standout features are anchor positioning, same-document view transitions, and the Navigation API. Anchor positioning lets you position tooltips and popovers relative to any element purely in CSS, no JavaScript positioning libraries required. That alone should make a lot of developers very happy. View transitions provide native animated transitions between UI states, and the Navigation API is a modern replacement for `history.pushState()` that gives single-page apps proper navigation handling.

What the article does not discuss, and what I think matters, is the sustainability question. Each year the Interop project gets more ambitious. Nineteen focus areas is a lot. The engineering investment required from each browser vendor is enormous. At some point, do we hit a ceiling where the project cannot keep scaling? And what happens to the features that do not make the cut? There is a selection bias here: the areas that get chosen converge beautifully, but the areas that do not get chosen remain fragmented.

Safari making the largest jump is worth noting because it has historically been the browser that web developers complained about most in terms of feature support. Whether that narrative was always fair is debatable, but the numbers here speak clearly.

**Key takeaways:**
- Browser interop went from 29% to 97% pass rate in 2025
- Anchor positioning is now fully interoperable, no more JavaScript positioning libraries
- View transitions and Navigation API are production-ready across browsers
- Safari made the biggest improvement of any browser

**Link:** [Interop 2025: A year of convergence](https://webkit.org/blog/17808/interop-2025-review/)

---

## The Browser Hates Surprises

**TLDR:** Layout shifts happen because we surprise the browser with information it needed upfront. Four specific CSS and JavaScript techniques can eliminate jank by reserving space, orchestrating loads, and negotiating with the rendering engine.

**Summary:**

This piece from Frontend Masters reframes Cumulative Layout Shift in a way that actually sticks: the browser is not a canvas, it is a constraint solver. Every time you force it to recalculate geometry mid-stream because an image loaded late, a scrollbar appeared, or a font swapped, you are breaking a contract.

The article walks through four specific negotiation strategies. First, use `scroll-margin-top` so that anchor links do not land behind sticky headers. Second, use `scrollbar-gutter: stable` to reserve space for scrollbars before they appear, preventing that annoying 17px shift on Windows and Linux. Third, set `aspect-ratio` on images so the browser can calculate the bounding box during CSS parsing, before the network request even completes. Fourth, use `Promise.all` to batch your data fetching so you update state once instead of triggering multiple reflows.

What I appreciate is the mental model shift: stop thinking about "making things load faster" and start thinking about "making things load calmer." That framing is more useful because it focuses on the user's perceptual experience rather than raw milliseconds.

What the article avoids thinking about is the systemic reason this keeps happening. It is not that developers do not know about `aspect-ratio` or `scrollbar-gutter`. It is that the default path in every framework and tutorial is the "hostile" path. You have to opt in to stability. The browser's defaults are unstable by design because they prioritize progressive rendering over layout stability. Until frameworks make the stable path the default path, we will keep writing articles like this.

**Key takeaways:**
- Use `scroll-margin-top` for anchor links with sticky headers
- `scrollbar-gutter: stable` prevents the 17px shift on Windows/Linux
- `aspect-ratio` on images prevents layout shift before images load
- Batch state updates with `Promise.all` to minimize reflows
- Optimization is about calm loading, not fast loading

**Link:** [The Browser Hates Surprises](https://frontendmasters.com/blog/the-browser-hates-surprises/)

---

## How Browsers Work: An Interactive Guide

**TLDR:** A new interactive guide walks through the entire browser pipeline, from URL to pixels, with live examples covering DNS resolution, TCP handshakes, HTML parsing, DOM construction, and the rendering pipeline.

**Summary:**

This is one of those resources that makes you wonder why it did not exist sooner. The guide takes you through the entire browser lifecycle with interactive examples at every step. You type a URL and see it transformed into an HTTP request. You watch a TCP three-way handshake with the ability to disrupt the network and see retransmission. You parse HTML into a DOM tree in real time. You trigger layout, paint, and composite passes and see which stages rerun for different types of changes.

The approach is deliberately different from most browser internals guides. It is not trying to be comprehensive. It explicitly omits SSL/TLS details, HTTP protocol versions, and DNS nuances. Instead, it focuses on building an intuition. And honestly, that is what most developers need. You do not need to know every detail of the HTTP/2 multiplexing spec. You need to understand that changing a color triggers paint but not layout, while changing a width triggers both.

The one thing I would push back on is the omission of JavaScript's role in the rendering pipeline. The guide covers `<script>` tags pausing HTML parsing, but the real-world complexity of how JavaScript interacts with layout and paint, especially with frameworks that batch DOM updates, is where most developers actually get confused. That is the next level up from this guide, and I hope it gets added.

The guide is open source, which means the community can contribute improvements. That is the right call for educational content like this.

**Key takeaways:**
- Interactive examples make browser internals far more intuitive than static diagrams
- Layout changes are more expensive than paint changes, which are more expensive than composite changes
- TCP retransmission can be visualized to understand reliability
- Understanding the rendering pipeline helps you write faster CSS and JavaScript

**Link:** [How Browsers Work](https://howbrowserswork.com/)

---

## WCAG 3.0 Overview and Update 2026

**TLDR:** WCAG 3.0, now standing for "W3C Accessibility Guidelines," expands beyond web content to cover VR, mobile apps, and operating systems. It introduces tiered conformance levels and will not be finalized before 2028.

**Summary:**

The naming change alone tells you the scope of this update. WCAG used to stand for "Web Content Accessibility Guidelines." Now it is "W3C Accessibility Guidelines." The word "web" is gone, and so is "content." This is a set of guidelines that wants to cover augmented reality, virtual reality, mobile apps, authoring tools, and operating systems.

The conformance model is fundamentally different from WCAG 2.2. Instead of binary pass/fail on individual success criteria, WCAG 3.0 introduces three tiers: foundational requirements, supplemental requirements, and assertions. Foundational requirements are roughly equivalent to current WCAG 2.2 AA. Supplemental requirements let organizations demonstrate higher conformance. Assertions cover organizational processes like accessibility training and testing with assistive technology.

This is a significant philosophical shift. WCAG 2.2 measured compliance through technical audits. WCAG 3.0 acknowledges that real accessibility requires cultural and process commitments, not just code-level checks. That mirrors the European Accessibility Act's approach.

Here is what the article dances around: WCAG 3.0 has been in development since 2016, and the current timeline says it will not be finalized before 2028. That is twelve years of development. The web has changed enormously since 2016. AI-generated interfaces, dynamic server-rendered content, single-page applications, all of these patterns have evolved dramatically during the development period. There is a real risk that by the time WCAG 3.0 ships, it will already need updating.

The practical advice is sound: keep conforming to WCAG 2.2 AA, adopt inclusive design practices, and do not try to prematurely conform to a draft that will change significantly before finalization.

**Key takeaways:**
- WCAG 3.0 expands scope beyond web to VR, mobile apps, and operating systems
- New tiered conformance model replaces binary pass/fail
- Organizational process assertions are part of conformance for the first time
- Finalization not expected before 2028
- Continue targeting WCAG 2.2 AA for now

**Link:** [WCAG 3.0 overview and update 2026](https://abilitynet.org.uk/resources/digital-accessibility/what-expect-wcag-30-web-content-accessibility-guidelines)

---

## How an Accessibility Designer Adds Keyboard Shortcuts to a Web App

**TLDR:** Adding keyboard shortcuts to web apps requires navigating a minefield of OS, browser, extension, and assistive technology key conflicts. A detailed support table for Home, End, Page Up, and Page Down reveals just how inconsistent the landscape really is.

**Summary:**

Eric Bailey's piece is one of those articles that makes you realize how little you know about a space you thought you understood. The task sounds simple: add keyboard shortcuts for Home, End, Page Up, and Page Down to a web feature. The execution is anything but.

The core problem is that keyboard shortcuts exist in layers: operating system, applications, browser, extensions, assistive technology, and plugins on assistive technology. Every one of these layers can claim the same key combination, and they often do. And users can customize bindings at every level through both official and unofficial means. Finding a key combination that does not collide with something important for someone is an exercise in navigating impossibility.

The support table Eric built is a beast. It covers Windows and macOS, Chrome, Edge, Firefox, and Safari, with JAWS, NVDA, and VoiceOver. The findings are fascinating. Screen readers do not have parity across manufacturers. Browsers have consistent behavior across operating systems, until they do not. Two browsers can share the same rendering engine yet have completely different keyboard behaviors.

The part that deserves the most attention is Eric's point about availability bias. Most web developers use macOS, where there are no physical Home, End, Page Up, and Page Down keys on laptops. This leads to those keys being forgotten entirely. And VoiceOver, the screen reader macOS developers are most likely to encounter, has a fundamentally different interaction paradigm than JAWS and NVDA, which are far more popular on Windows.

Eric explicitly notes that using an LLM to generate the support table from screen reader manuals produced hallucinations and was net-less-efficient than manual testing. When the stakes involve breaking someone's assistive technology, there is no shortcut to hands-on verification.

**Key takeaways:**
- Keyboard shortcuts exist in six overlapping layers from OS to AT plugins
- There is no truly "safe" key combination that collides with nothing
- macOS developers have blind spots around Home, End, Page Up, Page Down
- VoiceOver behavior differs significantly from JAWS and NVDA
- LLMs are unreliable for assistive technology compatibility research

**Link:** [How an accessibility designer adds keyboard shortcuts to a web app](https://ericwbailey.website/published/how-an-accessibility-designer-adds-keyboard-shortcuts-to-a-web-app/)

---

## A New Meta Tag for Respecting Text Scaling on Mobile

**TLDR:** A proposed `<meta name="text-scale" content="scale">` tag enables browsers to respect system font size settings on websites. Currently only works in Chrome Canary, and only scales text in relative units like rem and em.

**Summary:**

Manuel Matuzovic highlights an important gap in mobile web development. When you increase the system font size on your phone for accessibility reasons, most mobile browsers completely ignore that preference for web content. Firefox on Android is the exception, but it performs a full-page zoom rather than text-only scaling, which triggers different layout breakpoints and is not really the same thing.

The proposed meta tag `<meta name="text-scale" content="scale">` tells the browser to respect text size settings, but only for text using relative units. Text sized in `px` stays fixed, while `rem` and `em` scale with the system setting. This distinction is important and actually gives developers control: you can use `px` for things that genuinely should not scale and relative units for everything else.

The author makes an astute observation about why this is opt-in rather than default: changing the default behavior would break too many existing websites. Which is true, but also reveals a deeper problem. The web has been built for decades assuming that font sizes are fixed at what the developer specifies. Making text scaling work retroactively would require most sites to do responsive layout testing they have never done.

What is missing from the discussion is whether this meta tag approach is the right long-term solution. A meta tag is a blunt instrument. You either opt in for the whole page or you do not. There is no middle ground for progressive adoption or per-component control. And the reliance on relative units means sites that have been using `px` for years would need to refactor their entire CSS to benefit.

**Key takeaways:**
- Most mobile browsers ignore system font size settings for web content
- New `text-scale` meta tag enables opt-in text scaling in Chrome Canary
- Only text in relative units (rem, em) gets scaled; px stays fixed
- Opt-in approach avoids breaking existing sites but limits adoption
- Firefox does full-page zoom instead, which is a different behavior entirely

**Link:** [A new meta tag for respecting text scaling on mobile](https://www.matuzo.at/blog/2026/text-scaling-meta-tag)

---

## A Polyfill for the HTML Switch Element

**TLDR:** A new polyfill brings the Safari-only HTML switch element to all browsers, using progressive enhancement from `<input type="checkbox" switch>` with full accessibility, internationalization, and high-contrast mode support.

**Summary:**

Thomas Steiner has built a polyfill for the HTML switch element that Safari shipped natively in version 17.4. The core idea is beautiful in its simplicity: you add a `switch` attribute to a checkbox, and browsers that support it render a toggle switch, while browsers that do not silently fall back to a regular checkbox. This is progressive enhancement at its finest.

The polyfill handles the details that matter. It automatically applies the ARIA switch role, supports `prefers-contrast` for high-contrast modes, works with different `writing-mode` options, respects text directionality, and handles both tap and slide interactions. The macOS "Differentiate without color" accessibility setting gets visual on/off indicators. These are the kinds of details that separate a polyfill that is ready for production from one that is a toy.

There is a tension here that the article acknowledges without fully resolving. The HTML spec PR for the switch element, filed in 2018 and opened for review in 2023, is still open with concerns from several stakeholders, including Google. So we have one browser shipping it, a polyfill for other browsers, and no consensus on whether this is even the right approach. That is an awkward position for anyone building production software.

The progressive enhancement pattern is what I find most compelling. If the spec is abandoned, you still have functional checkboxes. If it is adopted, you get native switches. The investment in the markup is minimal and reversible, which is exactly what you want when building on unstable ground.

**Key takeaways:**
- HTML switch element uses progressive enhancement: `<input type="checkbox" switch>`
- Polyfill supports accessibility, internationalization, and high-contrast modes
- The HTML spec PR remains open with unresolved concerns since 2023
- The pattern degrades gracefully to regular checkboxes in unsupporting browsers
- Both tap and slide interactions are supported

**Link:** [A polyfill for the HTML switch element](https://blog.tomayac.com/2026/01/12/a-polyfill-for-the-html-switch-element/)

---

## The Logo Soup Problem (and How to Solve It)

**TLDR:** A new React library called LogoSoup uses the Proportional Image Normalization Formula to automatically size and balance logos in cloud layouts, handling aspect ratios, pixel density, padding detection, and optical alignment.

**Summary:**

This is one of those problems that every frontend developer has encountered but nobody talks about at conferences. You get a folder of partner logos in mixed formats, sizes, and visual weights, and you need to make them look balanced in a row. Make them all the same width and square logos tower over everything. Make them the same height and wide wordmarks dominate.

The solution is surprisingly mathematical. The Proportional Image Normalization Formula takes a logo's aspect ratio, raises it to a power called the scale factor, and multiplies by a base size. When the scale factor is 0, all logos are the same width. When it is 1, same height. At 0.5, you hit a sweet spot where the power function dampens the extremes.

But aspect ratio is just the beginning. The library also measures pixel density to handle visual weight differences between dense logos and thin wordmarks. It detects content boundaries to crop out whitespace baked into image files. And it calculates optical alignment by finding the visual center of mass using weighted pixel analysis, because the geometric center is not always the perceptual center.

What I find refreshing is that this is a genuine "small problem, elegant solution" situation. No AI, no complex build pipeline, just math that models how human vision perceives balance. The integration with Sanity CMS is an obvious plug, but the library works independently and the approach would work with any CMS or data source.

What the article does not address is performance. Analyzing pixel density and content boundaries means loading and processing every logo image in the browser. For a grid of 20+ logos, that is a lot of canvas operations. It would be interesting to know if there is a server-side or build-time option.

**Key takeaways:**
- Proportional Image Normalization Formula solves logo sizing with grade-school math
- Pixel density analysis handles visual weight differences between dense and thin logos
- Content boundary detection crops invisible padding from logo files
- Optical alignment uses weighted pixel analysis for perceptual centering
- The library is framework-agnostic despite being a React component

**Link:** [The logo soup problem (and how to solve it)](https://www.sanity.io/blog/the-logo-soup-problem)

---

## What's Missing From the Web Platform? - Syntax #975

**TLDR:** Scott Tolinski and Wes Bos discuss their web platform wishlist, covering native multi-select/combobox components, date pickers, drag-and-drop that works, type annotations in JavaScript, and the question of whether Safari should move to Chromium.

**Summary:**

This episode of Syntax is a wide-ranging wish list for the web platform, and what makes it interesting is how many of these gaps have existed for years or decades. Multi-select and combobox are still not native primitives. Date pickers are still terrible. Drag and drop still sucks. These are not new complaints, and the fact that they are still on the list in 2026 says something about the pace of platform evolution.

The more forward-looking items are more interesting. Type annotations in JavaScript would bring TypeScript-level safety to vanilla JS. The pipe operator would dramatically improve code readability for data transformation chains. Native reactive DOM and JavaScript templating would reduce or eliminate the need for frameworks like React for many use cases.

The brief mention of Safari moving to Chromium is worth pausing on. Scott and Wes quickly pivot to defending browser engine diversity, which is the right position. A Chromium monoculture would be worse for the web than Safari's occasionally frustrating feature gaps. Competition drives innovation, and the Interop project shows that convergence does not require monoculture.

The AI access discussion is timely but underdeveloped. What would a browser-native AI API even look like? Would it use on-device models or cloud services? Who pays for the compute? These are questions that need much more exploration.

**Key takeaways:**
- Multi-select, combobox, and date picker remain missing native primitives
- Type annotations and pipe operator could transform vanilla JavaScript
- Browser engine diversity is worth preserving despite Safari frustrations
- Native virtualization would be a massive win for performance
- PUT, PATCH, and DELETE on HTML forms is long overdue

**Link:** [What's Missing From the Web Platform? - Syntax #975](https://syntax.fm/show/975/what-s-missing-from-the-web-platform)

---

## A Guide to Browser DevTools: The Network Monitor

**TLDR:** The fourth installment of a DevTools series covers the Network tab, walking through request monitoring, response inspection, error debugging, caching, and filtering with practical examples.

**Summary:**

This is a solid introductory guide to the Network tab in browser DevTools, aimed at developers who know the basics of the Inspector and Console but have not spent much time in the Network panel. It covers the essential workflow: open DevTools, navigate to the Network tab, make a request, inspect the headers, status codes, and response body.

The article walks through both success and error scenarios, showing how a 200 OK response displays JSON data and how a 404 Not Found helps you diagnose incorrect URLs. The tips section covers the recording toggle, clear button, filter input, search functionality, persistent logs, and cache disabling.

Where this falls short is in the intermediate and advanced territory. There is no mention of the Waterfall view for understanding request sequencing and parallelism. No discussion of CORS preflight requests, which are one of the most common sources of confusion. No coverage of WebSocket connections, Service Worker interception, or the difference between memory cache and disk cache. These are the things developers actually struggle with when they open the Network tab.

That said, everyone starts somewhere, and having a clear, well-structured introduction is valuable. The series format, building from Inspector to Console to Debugger to Network, is a logical progression.

**Key takeaways:**
- The Network tab shows every conversation between browser and server
- Filter by URL, file type, or search within response bodies
- Disable cache during development to ensure fresh data
- 404 errors in the Network tab quickly reveal incorrect API URLs
- Persistent logs help debug across page reloads

**Link:** [A Guide to Browser DevTools - The Network Monitor](https://spin.atomicobject.com/devtools-network-monitor/)

---

## How (and Why) to Stop Users from Selecting Text on Your Website

**TLDR:** The CSS property `user-select: none` provides a simple way to prevent text selection, useful for kiosk modes and interactive interfaces, but should never be used as a content protection measure.

**Summary:**

Rachel's quick post covers `user-select: none`, a CSS property with a turbulent specification history. It was in the CSS3 spec, removed, then added back, and is now supported by all major browsers except Safari. The property does exactly what it says: prevents users from selecting text on elements where it is applied.

The author is upfront about the ethical dimension: do not use this to prevent people from copying your content. That is not how the internet works, and it is trivially bypassed by viewing the page source or disabling CSS. The legitimate use cases are narrow but real: kiosk-mode applications on touch screens where accidental text selection creates a bad experience, interactive UI elements where selection creates visual noise, and potentially excluding non-text elements like code line numbers from selection.

What the article does not mention is that `user-select: none` has real accessibility implications. Screen reader users navigate by selecting and reading text. Preventing selection can interfere with that workflow. If you are going to use this property, you need to think carefully about whether the element contains meaningful content that assistive technology users need to access.

**Key takeaways:**
- `user-select: none` prevents text selection with pure CSS
- Never use it as a content protection measure
- Legitimate uses include kiosk modes and touch-screen interfaces
- Consider accessibility implications for screen reader users
- Supported in all major browsers except Safari

**Link:** [How (and Why) to Stop Users from Selecting Text on Your Website](https://www.readwriterachel.com/things-i-learned/2026/02/06/user-select.html)

---

## Measuring SVG Rendering Time

**TLDR:** Benchmarks across 199 test SVGs show that rendering time has a curious stepped progression, with files under 400 KB rendering in about the same time regardless of size. Above 1 MB, PNGs render faster than SVGs.

**Summary:**

Stoyan Stefanov set up a rigorous benchmark to answer a simple question: how does SVG file size affect rendering time, and when should you switch to PNG? He generated 199 SVG files from 1 KB to 10 MB, converted them to PNGs, and measured INP (Interaction to Next Paint) using both a PerformanceObserver and DevTools traces.

The results reveal something counterintuitive. SVG rendering time does not increase linearly with file size. Instead, it follows a stepped pattern. Files under 400 KB all render in roughly the same time. Then there is a jump, another plateau, and another jump around 1.2 MB. This suggests the browser's SVG renderer has internal thresholds or buffer sizes that create discrete performance tiers rather than smooth degradation.

For PNGs, the pattern is different. There appears to be a similar step, but the data is less clear because the PNG file sizes do not map linearly to the SVG sizes. However, the key finding is that above certain file sizes, especially over 1 MB, PNGs render meaningfully faster than SVGs.

What I wish the article explored is why the stepped pattern exists. Is it related to GPU texture upload sizes? Memory page boundaries? SVG DOM complexity thresholds? Understanding the mechanism would help developers make more informed decisions rather than relying on empirical cutoffs that might differ across browsers and hardware.

**Key takeaways:**
- SVG rendering time follows a stepped pattern, not linear growth
- Files under 400 KB render in roughly the same time regardless of format
- Above 1 MB, PNGs render faster than equivalent SVGs
- INP measurements from PerformanceObserver and DevTools traces are consistent
- The "presentation delay" component of INP captures rendering cost

**Link:** [Measuring SVG rendering time](https://www.phpied.com/measuring-svg-rendering-time/)

---

## Polypane 28: Environments, Faster Elements Panel, and Chromium 146

**TLDR:** Polypane 28 introduces project environments with color-coded indicators, significantly faster element inspection, CSS selector editing, and console.group support, all built on Chromium 146.

**Summary:**

The Polypane team continues to ship features that solve real developer workflow problems. The headline feature is project environments, which lets you define localhost, staging, and production URLs for each project and switch between them with color-coded indicators. If you have never accidentally refreshed production while waiting for localhost changes to appear, congratulations on your superhuman attention span. For the rest of us, this is a genuine quality-of-life improvement.

The Elements panel performance improvements are noteworthy. What took hundreds of milliseconds now takes under 50ms for most pages. For a tool where you are constantly inspecting and switching between elements, that kind of speedup compounds throughout a workday. The ability to edit CSS selectors directly in the Styles pane is a welcome addition that other DevTools have had for a while.

The `console.group` support is interesting because Polypane had to build it from scratch. Their console collects messages from all panes and shares no code with Chrome DevTools, so every feature requires original implementation. The cache disabling improvement, applying to individual panes rather than sessions, fixes a real inconsistency issue.

The security.txt expiration warning is a thoughtful touch. It is the kind of feature that nobody asks for but everyone benefits from, because expired security.txt files are one of those things that silently go wrong.

**Key takeaways:**
- Project environments with color indicators prevent production/localhost confusion
- Elements panel inspection now under 50ms for most pages
- CSS selectors are now directly editable in the Styles pane
- Cache disabling now applies per-pane for more predictable behavior
- Security.txt expiration warnings catch a common oversight

**Link:** [Polypane 28](https://polypane.app/blog/polypane-28-project-improvements-elements-panel-updates-and-chromium-146/)