---
title: "Safari 27's 58 Features, CSS @function Deep Dive, and the HTML-First Renaissance"
excerpt: "A packed issue covering Safari 27 beta's massive release, the new CSS @function rule, grid lanes, gap decorations, view transitions without JavaScript, and the ongoing case for building simpler, more resilient web experiences."
publishedAt: "2026-06-10"
slug: "safari-27-css-function-html-first-frontend-focus-745"
hashtags: "#frontend #webdev #css #safari #progressiveenhancement #generated #en"
source_pattern: "Frontend Focus"
---

## WebKit in Safari 27 Beta: 58 New Features and a Focus on Correctness

**TLDR:** Safari 27 beta drops with 58 new features and 525 bug fixes, the most fixes in any Safari release ever. Customizable select elements, scroll anchoring, transform-aware anchor positioning, and WebAssembly JSPI are among the headline additions.

**Summary:** Let's start with the big one. The WebKit team dropped a comprehensive post covering what's coming in Safari 27, and the sheer volume is hard to ignore. Fifty-eight new features and five hundred and twenty-five fixes. That second number is worth sitting with for a moment. Five hundred and twenty-five fixes. The team is being transparent about something that often gets buried in release notes: most of this release is about existing features behaving more correctly.

Customizable select is the one developers have been waiting on for years. You can now style your form select elements to match your design without rebuilding them in JavaScript or sacrificing the built-in accessibility behavior. That is a genuinely big deal for anyone who has spent time fighting the unstyled select element. Scroll anchoring addresses that jarring visual jump when content loads above the viewport, which has quietly been annoying users forever. Transform-aware anchor positioning closes a real gap in the CSS anchoring story.

WebAssembly JavaScript Promise Integration, JSPI, lets Wasm code participate properly in JavaScript's async world. The subpixel inline layout improvement makes text rendering more precise. The revert-rule keyword and stretch keyword for box sizing both land. There is also the new :heading pseudo-class, which feeds into the broader heading structure work happening across browsers.

What I find interesting here is the editorial honesty. The Safari team is explicitly saying this release is mostly about reliability, not novelty. That takes discipline. It would be easy to ship flashy new stuff and leave the edge cases for later. Browser vendors doing the unsexy correctness work matters more than most people realize.

**Key takeaways:**
- Customizable select lands, finally allowing CSS styling without accessibility tradeoffs
- 525 bug fixes, the highest fix count in a Safari release
- Scroll anchoring, JSPI, transform-aware anchor positioning all ship
- The team's stated focus is on correctness and interoperability, not just new features
- Subpixel inline layout improves text rendering precision

**Why do I care:** Safari correctness improvements have outsized impact on production web development. When Safari fixes edge cases, it reduces the amount of browser-specific workaround code sitting in every codebase. The customizable select story alone will eliminate entire categories of JavaScript-heavy component libraries that exist purely because the native element was unstyleable. That is a net reduction in complexity.

**Link:** [News from WWDC26: WebKit in Safari 27 beta](https://webkit.org/blog/17967/news-from-wwdc26-webkit-in-safari-27-beta/)

---

## How Building HTML-First Doubled a Utility Company's Users Overnight

**TLDR:** A developer replaced a broken React form application with an Astro-based HTML-first solution that worked without JavaScript, on old browsers, and on poor connections. User completions doubled overnight. The lesson is not that React is bad, it's that the wrong tool was used for the job.

**Summary:** This is a story I want more developers to read. A utility company had failed twice to build an accessible public-facing form. The most recent attempt was a React app that lasted three days before being pulled due to customer complaints. It had loading spinners everywhere, global JavaScript state, and critically, it tried to store image uploads in localStorage, which has a five megabyte limit. Someone shipped that.

The author took a different approach. They built with Astro, making JavaScript optional and using web components purely for progressive enhancement. Each step in the form wizard was its own page, with form submissions and redirects handling navigation. This is not a new pattern, it is the pattern the web was built on, and it has had a small renaissance thanks to tools like Remix and Astro. The author built a custom validation web component that weighed under one kilobyte, wrapped native HTML validation, and fell back gracefully if anything failed.

The result: completions doubled overnight. Analytics that relied on JavaScript had no idea where these users were coming from because those analytics packages never even loaded for users who bounced due to JavaScript failures. In one case, someone completed the form a month after starting it, because backend session storage preserved every field.

The author quotes a story about a woman in a housing benefits office using a PlayStation Portable to access GOV.UK because the pages are lightweight enough to load on a pathetic browser. That image should be uncomfortable for anyone who ships twenty megabytes of JavaScript before rendering a form.

What the article is not wrestling with: this approach requires discipline from everyone on the team, and the author acknowledges that when they left, their replacement was appalled at the amount of work required to maintain a progressively enhanced site. That friction is real and should be discussed honestly rather than waved away.

**Key takeaways:**
- HTML-first forms with progressive enhancement outperformed a React-based replacement
- Backend session storage is underused for preserving form state across connections
- Native browser validation, wrapped thoughtfully, is more reliable than most JS validation libraries
- JavaScript analytics are blind to users who bounce before scripts load
- Progressive enhancement requires team-wide commitment, not just individual developer discipline

**Why do I care:** The industry keeps rediscovering this pattern and acting surprised. Resilient, HTML-first design is not a nostalgia trip, it is an engineering decision about who you are willing to exclude. For a regulated public utility, the answer should be nobody. The surprising thing here is not that it worked, it's that two expensive JavaScript-heavy attempts failed first.

**Link:** [How building an HTML-first site doubled our users overnight](https://mohkohn.co.uk/writing/html-first/)

---

## The Fundamentals and Dev Experience of CSS @function

**TLDR:** CSS custom functions via the new @function at-rule are powerful but riddled with surprising edge cases and silent failures. This deep-dive maps out eleven gotchas you will hit, ranging from no recursion to comma-separated argument spreading not working as expected.

**Summary:** CSS is getting custom functions, and this article from Frontend Masters does a thorough job of laying out both the potential and the frustrating current developer experience. The @function rule lets you define reusable, encapsulated property behaviors with private internal variables, typed arguments, typed return values, and even conditional logic. If you have spent time fighting against the limitations of custom properties, this feels like a genuinely useful addition.

The author walks through the basics: functions can only return a single value for now, internal variables are completely private and cannot be typed by the global registration system, and argument typing is possible but has a few sharp edges. Calling a function with too many or too few arguments fails silently, which is the kind of developer experience decision that makes debugging miserable. There is no friendly error, just unexpected initial values.

The comma-separated argument spreading issue is particularly worth knowing about. In every other context in CSS, a variable containing comma-separated values expands in place. Inside custom function calls, it does not. If you pass a variable containing three values expecting them to map to three arguments, all three get stuffed into the first argument. There is a workaround using curly brace wrapping, but it is the kind of thing you will spend an hour debugging before you know it exists.

Functions cannot currently call themselves, no recursion. And there is a spec-level bug where you cannot pass a function's return value back into the same function elsewhere in a declaration. Tab Atkins has acknowledged this as a spec bug and it is being fixed, but it is notable that these edge cases exist in what is being shipped today.

The honest takeaway from the article is that the current developer experience is not good. The potential is real, but the silent failure modes and missing capabilities make this something to learn carefully rather than reach for carelessly.

**Key takeaways:**
- CSS @function provides private variables, typed arguments, and typed return values
- Silent failure on wrong argument count is a significant developer experience problem
- Comma-separated variable expansion does not work in function call arguments, unlike everywhere else in CSS
- No recursion is allowed; CSS treats it as cyclic
- A spec-level bug prevents passing return values back into the same function; being fixed by Tab Atkins

**Why do I care:** Custom CSS functions could genuinely replace a lot of CSS-in-JS and preprocessor workarounds for complex property calculations. But the current silent failure modes are a trap. Teams adopting this now need clear documentation of all these edge cases, because the browser will not help you find them.

**Link:** [The Fundamentals and Dev Experience of CSS @function](https://frontendmasters.com/blog/the-fundamentals-and-dev-experience-of-css-function/)

---

## CSS Gap Decorations: Finally, Real Lines Between Grid and Flex Items

**TLDR:** CSS is extending column-rule to work in grid and flex containers, adding a new row-rule, and introducing a suite of properties for controlling intersection behavior, insets, visibility, and animation. No more fake borders or pseudo-element hacks for gap lines.

**Summary:** Every developer who has tried to draw a visible divider between grid or flex items has ended up doing something embarrassing. Borders on child elements that needed careful edge case handling. Background tricks. Extra pseudo-elements that were purely presentational. CSS is finally doing this properly with gap decorations.

The column-rule property, which already worked for multi-column layouts, has been extended to apply to grid and flex containers. A new row-rule counterpart handles horizontal gaps. Together they give you a clean API: draw a line in my column gaps, draw a line in my row gaps. The shorthand rule sets both axes at once.

The feature goes further than basic lines. The repeat() function works here for alternating rule styles, so you can cycle through solid and dashed lines or multiple colors without writing out explicit lists. The rule-break property controls what happens at intersections, whether rules run through each other or stop and break at crossing points. The rule-inset and related properties let you control how far each segment extends within its gap, creating breathing room around crossings or flush lines at container edges.

What I find particularly well-considered is that rule width, color, and insets are all animatable. You can transition gap decorations on hover or any state change with no JavaScript. The author demonstrates a scroll-driven animation where gap lines grow in width and shift colors as the page scrolls, which is the kind of thing that previously required significant scripting.

Support is landing in Chromium now and is available in Safari Technology Preview. The progressive enhancement story is clean: if the browser does not support gap decorations, the layout renders normally with empty gaps.

**Key takeaways:**
- column-rule extended to grid/flex, new row-rule property for horizontal gaps
- repeat() works for alternating styles and colors in gap rules
- rule-break controls intersection rendering behavior
- rule-inset properties control how far segments extend within gaps
- Gap decoration properties are animatable, enabling hover and scroll-driven effects

**Why do I care:** This eliminates a whole category of layout hacks that every CSS developer has written. The intersection control and inset properties make this more powerful than I expected. The fact that it is animatable opens up micro-interaction possibilities that would have required JavaScript before.

**Link:** [CSS is filling the gaps with rules](https://utilitybend.com/blog/css-is-filling-the-gaps-with-rules-a-way-to-style-gaps-in-grid-and-flex)

---

## CSS View Transitions Between Pages Without JavaScript

**TLDR:** Cross-document view transitions let a plain HTML anchor link feel like a single-page app transition using only CSS, with a single @view-transition at-rule to opt in. No router, no JavaScript, no library required.

**Summary:** The selling point of single-page applications has always included smooth page transitions as a bonus. Client-side routing was the price of admission. That price is now optional. Cross-document view transitions are shipping, and the entry cost is genuinely minimal.

You opt in by adding @view-transition with navigation: auto to every participating page. From that point, the browser crossfades old and new page snapshots on navigation. No JavaScript. Both pages need to be on the same origin and share the same CSS foundation, which makes this a natural fit for static sites and server-rendered applications that already ship a central stylesheet.

The article walks through customizing this with keyframe animations, showing how to create a slide transition where the old page exits left while the new page enters from the right. Named view-transition-name values let you anchor specific elements so they stay put during the transition, rather than sliding with the rest of the page. The navigation bar staying fixed while only the main content slides is exactly what you would want.

The image morph case is impressive: assign the same view-transition-name to a thumbnail and its corresponding hero image on the detail page, and the browser automatically animates the size and position change between navigations. The article notes this stutters in Safari specifically due to the image morph doing more work on the main thread, and offers workarounds including unified snapshot geometry and shorter durations.

Browser support is Chrome and Edge from 126, Safari from 18.2. Firefox is still behind a flag. The progressive enhancement story is correct: unsupported browsers just navigate normally.

What the article glosses over is the unique view-transition-name constraint. Each name can only appear once per page, which means a list of cards where each card links to a detail page requires unique names per card, dynamically generated. That coordination between server and CSS is non-trivial in real applications.

**Key takeaways:**
- @view-transition with navigation: auto is all you need for default crossfade between pages
- Named transition regions allow fine-grained control over which elements animate
- Image morphing between a card thumbnail and a detail hero image works with one CSS property
- Safari stutters on image morphs; unified snapshot geometry and shorter durations help
- Unique view-transition-name per page is required; dynamic lists need careful coordination

**Why do I care:** This changes the calculus for multi-page application design. The transition quality argument for SPAs has always been partly legitimate. Now it is significantly weaker. Server-rendered applications with proper progressive enhancement can deliver comparable visual experiences without the routing complexity.

**Link:** [CSS Can Now Animate Between Pages: View Transitions Without JavaScript](https://www.rotecodefraktion.de/en/blog/css-view-transitions-zwischen-seiten/)

---

## Scrubbable Staggered Animation with CSS @function

**TLDR:** A mathematical approach to staggered animation using a single progress value rather than individual delays, implemented in CSS using the new @function rule. The result is an animation you can scrub, tie to scroll, or drive from any external progress source.

**Summary:** Traditional staggered animation uses animation-delay with slightly increasing values for each element. This works, but it is fundamentally isolated. Each element runs its own independent timeline. You cannot scrub through the animation, tie it to scroll progress, or link it to any external value. The author from master.dev takes a completely different approach.

The core insight is to think about staggered animation as a relationship between progress values rather than a collection of independently timed objects. Define a single overall animation progress value, then derive each element's individual progress from that value using a mathematical formula. The formula, which the author calls the stagger formula, uses linear interpolation and clamping to produce animation progress per element from the master progress value.

What makes this compelling in practice is that once you have the master progress value, connecting it to any animation driver is straightforward. You can animate a custom property from zero to one using keyframes, tie it to scroll with scroll-driven animations, or drive it from any other input. The CSS @function rule makes this reusable by allowing the stagger formula to be defined once and called per element with sibling-index() and sibling-count() providing element-specific values.

The article is honest about browser support: this requires @function, if(), sibling-index(), and sibling-count(), all of which currently work best in Chrome and Edge as of mid-2026, with Firefox and Safari support limited or missing.

The mathematical derivation is thorough. It walks through why the gap between adjacent element progress values equals one divided by the number of simultaneously animating elements, and builds from that foundation. I appreciate that the author shows the work rather than just handing over a snippet.

**Key takeaways:**
- Stagger formula replaces delay-based stagger with a single scrubable progress value
- CSS @function, sibling-index(), and sibling-count() enable a reusable implementation
- The single progress value can be driven by keyframes, scroll timeline, or any other source
- Custom easing functions can be implemented using @function for smooth curves
- Currently best supported in Chrome and Edge; Safari and Firefox support is limited

**Why do I care:** This is one of those ideas that reframes something you thought you understood. Animation delay stagger has always been a poor approximation of what you actually want, which is a controllable wave effect. The progress-value approach is mathematically cleaner and opens up a whole class of interactions that delay-based stagger cannot provide.

**Link:** [Scrubbable Staggered Animation with CSS @function](https://master.dev/blog/scrubbable-staggered-animation-with-css-function/)

---

## A Front-End Developer's Guide to Hybrid Mobile App Development

**TLDR:** A practical overview of the hybrid mobile app landscape for web developers who have not spent time in the mobile world, covering WebViews, Cordova, Capacitor, and Ionic with honest notes on the accessibility tradeoffs.

**Summary:** If you are a front-end web developer who has never needed to build a mobile app, the terminology around hybrid frameworks can be confusing fast. This article from Piccalilli serves as a useful orientation guide. A hybrid mobile app, as defined here, is one that primarily features HTML rendered in WebViews alongside some native mobile content or functionality. That is distinct from cross-platform frameworks like React Native and Flutter, which generate native views or use their own rendering engine.

The history here matters. Apache Cordova, originally PhoneGap, has been around since 2009. It wraps your web app in a WebView inside an iOS or Android container. Capacitor is the modern successor, built by the Ionic team in 2018, offering better native SDK access and a more current architecture. Ionic itself is the UI framework layer, providing components that render with iOS aesthetics on Apple devices and Material Design on Android from a single codebase.

The article addresses the design tension directly. Mobile users who download your app from an app store likely want a native experience, and a screen reader user will literally hear "WebView" announced when they encounter one. The author is honest that most people probably cannot tell the difference visually, but the assistive technology experience is meaningfully different.

What is missing from this article is a frank discussion of performance. WebView-based apps have historically lagged behind native applications in scroll performance and animation smoothness. That gap has narrowed considerably, but it still exists and should be part of any decision about whether to build hybrid or native.

**Key takeaways:**
- Hybrid apps render HTML in WebViews; distinct from React Native and Flutter which use native rendering
- Cordova is the original hybrid framework from 2009; Capacitor is the modern alternative
- Ionic provides platform-adaptive UI components that match iOS and Android design systems
- Screen reader users will know they are in a WebView; "WebView" is announced by assistive technologies
- WCAG applies directly to WebView content, giving hybrid apps a compliance advantage

**Why do I care:** For teams with existing web skills considering a mobile presence, hybrid development is a legitimate path that does not require learning Kotlin or Swift. The accessibility considerations are real and often underemphasized in the sales pitch for these frameworks.

**Link:** [A Front-end developer's guide to the hybrid mobile app development landscape](https://piccalil.li/blog/a-front-end-developers-guide-to-the-hybrid-mobile-app-development-landscape/)

---

## Accessibility: 9 Myths and Pushbacks, and How to Answer Them

**TLDR:** Stephanie Walter catalogs the nine most common accessibility objections teams face, from "disabled people don't use our site" to "accessibility ruins creativity," and provides data-backed, reframed responses to each. This is the article to share before the next meeting where accessibility gets deprioritized.

**Summary:** Stephanie Walter presented this as a talk at axecon 2026, and the written version is dense with useful material. The framing is smart: you are not failing when your accessibility arguments do not land. You are having the wrong conversation. The article is essentially a practical communication guide for designers and developers who already care about accessibility but keep losing the internal argument.

The data points are solid. Sixteen percent of people worldwide experience significant disability. Twenty-three percent of e-commerce transactions are abandoned by blind users because of accessibility issues, representing $6.9 billion lost annually to competitors. The IBM study showing that fixing accessibility during development costs 6.5 times less than fixing it in testing, and 100 times less than fixing it post-launch, is exactly the kind of number that changes how engineering managers think about priority.

The legal section is timely. The European Accessibility Act came into force in June 2025, covering e-commerce, banking, telecom, streaming platforms, and more. If your service sells to European customers, it applies regardless of where you are based. The examples of lawsuits, including an overlay solution failing to prevent a lawsuit, should put to rest the idea that accessibility overlays are a compliance strategy.

What I find most useful is the reframing on brand constraints. When someone says accessibility means changing the brand colors, the suggested reframe is that you are improving the brand for digital use, not changing it. The Wise example of building an accessible color palette with bright greens and pastels demonstrates that accessibility does not mean gray everything. Small language changes actually move stakeholders more than hard data sometimes.

The grassroots movement section is pragmatic. You do not need a mandate or a budget to start. Pick one thing tomorrow. Show your team how a screen reader navigates your site. Fix one contrast issue in a mockup. Build momentum incrementally.

**Key takeaways:**
- 1.3 billion people worldwide have significant disability; your analytics are systematically undercounting them
- $6.9 billion lost annually to competitors because of accessibility failures by blind users alone
- Fixing accessibility post-launch costs 100x more than catching it in the design phase
- European Accessibility Act (June 2025) applies to any service selling to European customers
- Accessibility overlays do not prevent lawsuits; documented barriers defeat overlay claims in court

**Why do I care:** Every accessibility advocate I know has lost the same meetings repeatedly. This article gives you better ammunition than "it is the right thing to do," which is true but rarely sufficient in a room focused on delivery deadlines. The business case and risk framing are tools, not the reason accessibility matters, but they are the tools that move decisions.

**Link:** [Accessibility: 9 Myths and Pushbacks, And How to Answer Them](https://stephaniewalter.design/blog/9-accessibility-myths-and-pushbacks-and-how-to-answer-them/)

---

## How to Make Your Design System AI-Ready

**TLDR:** AI-generated prototypes fail not because AI is bad but because design systems are full of undocumented decisions, hard-coded values, and implicit rules that no one wrote down. Making a design system AI-ready means treating design decisions as infrastructure with structured Markdown spec files, a maintained token layer, and an audit script.

**Summary:** This is a brief but pointed article from Smashing Magazine summarizing a practical guide by Hardik Pandya from Atlassian. The core observation is one that people working with AI code generation are running into constantly: AI produces inconsistent output not because the model is inadequate but because the guidance it receives is full of gaps.

The three-layer approach proposed here is sensible. First, spec files: structured Markdown documents that codify spacing rules, color usage, component guidelines, and decision rationale. AI reads these instead of trying to infer patterns from screenshots or mockups. Second, a token layer: a maintained list of all design tokens so AI always chooses from a closed set of named variables instead of inventing plausible values. Third, an audit script that scans AI-generated output and flags hard-coded values.

The context engineering framing is interesting. The article cites a five-level context engineering model, and the argument is that AI needs explicit priorities and decision paths rather than an expectation that it will infer them from visual mocks. Extending code by describing constraints in text is more reliable than generating code from screenshots.

What the article is not grappling with directly: this approach requires significant documentation discipline that most design systems do not currently have. The spec files have to stay in sync with the actual design system as it evolves, which is ongoing maintenance work. The article acknowledges this with "we will be busy for years to come," but does not address who does this work or how it gets sustained.

The examples linked are instructive: Atlassian, IBM Carbon, CMS Design System, and Nordhealth have all published AI-ready design system examples worth examining.

**Key takeaways:**
- AI prototype quality is limited by design system documentation quality, not model capability
- Spec files in Markdown are more reliable guidance for AI than visual mockups
- A token layer prevents AI from inventing values outside the design system
- Audit scripts can detect hard-coded values in AI-generated output automatically
- Spec files require ongoing maintenance as the design system evolves

**Why do I care:** This is a practical answer to the question of why AI-assisted UI development produces inconsistent results. The answer is almost always missing or outdated context. Teams with well-documented design systems will get significantly better AI output, which creates a concrete business case for design system documentation investment.

**Link:** [How To Make Your Design System AI-Ready](https://www.smashingmagazine.com/2026/06/how-make-design-system-ai-ready/)

---

## CSS Grid Lanes: The Field Guide

**TLDR:** The WebKit team launched an interactive field guide for CSS Grid Lanes, the native masonry layout feature shipping in Safari 26.4+. Four lines of CSS. No JavaScript. No hacks. The guide covers all properties with live demos and a cheat sheet.

**Summary:** For anyone who has implemented a masonry layout on the web, you know the pain. JavaScript-based solutions are fragile and expensive at runtime. Multi-column CSS gets close but breaks when you need precise item ordering. CSS Grid Lanes is the answer that has been in development for years within the CSS Working Group, and it is now shipping in Safari 26.4 with other browsers watching.

The Field Guide launched by the WebKit team is built by the same people who shipped the feature, which means the documentation is authoritative rather than a community approximation. The interactive playground at the top lets you edit the CSS directly and see results without resizing your browser window. You can switch between waterfall and brick layout modes, experiment with flow-tolerance, and copy the generated code.

Display: grid-lanes works by packing each child item into whichever lane has the most empty space. The flow-tolerance property is the clever bit: it declares how close lane heights need to be before the browser considers them a tie and falls back to document order. Without flow-tolerance, a one-pixel difference between lanes could scramble the visual order. With it set to something like 4lh, items flow in reading order unless a lane is meaningfully shorter.

The progressive enhancement story is built into the guide: browsers without Grid Lanes support just show the fallback layout you define. Source order is preserved in the DOM regardless of visual reflow, which means keyboard navigation and screen readers follow the original HTML sequence.

The guide includes six categories of demos covering photos, recipe cards, newspaper layouts, mega menus, timelines, and pinboards. Each demo has a floating control panel for experimenting with layout variations.

**Key takeaways:**
- CSS Grid Lanes provides native masonry layout without JavaScript
- Display: grid-lanes packs items into whichever lane has the most empty space
- flow-tolerance controls when near-equal lane heights fall back to source order
- DOM order is preserved regardless of visual reflow; good for accessibility
- Progressive enhancement is built in; unsupported browsers render the fallback layout

**Why do I care:** Native masonry has been a long time coming and the implementation choices here are thoughtful. The flow-tolerance property shows real attention to the tab order problem that masonry layouts have always had. Shipping this in Safari first while other browsers catch up is a slightly frustrating situation, but the progressive enhancement path makes it safe to start using today.

**Link:** [Introducing the Field Guide to Grid Lanes](https://webkit.org/blog/18098/introducing-the-field-guide-to-grid-lanes/)

---

## Mozilla Intent to Prototype: headingoffset and headingreset Attributes

**TLDR:** Mozilla is prototyping two new HTML attributes, headingoffset and headingreset, that let developers create containers with dynamic heading structures. Users can always write their content starting at h1, and the surrounding page context handles the correct heading level automatically.

**Summary:** This is a brief but meaningful standards update from the Mozilla dev-platform list. The headingoffset and headingreset global attributes address a problem that anyone building user-generated content surfaces has encountered: heading levels in embedded content.

When users write a comment, a document, or a blog post, they should be able to start with an h1 and use h2, h3 logically within their content. But when that content is rendered inside a page that already has a heading structure, those headings collide. Today the options are rewriting the user's headings to start at the appropriate level, which is intrusive and fragile, or accepting broken heading hierarchy and the accessibility problems that come with it.

The headingoffset attribute gives developers a way to declare that headings within a container should be offset by a certain number of levels. A comment section sitting below a page's h2 could have headingoffset="2" so that user-written h1s render semantically as h3s. The headingreset attribute creates a fresh context. Users write their documents naturally. The developer handles the mapping at the container level.

This is exactly the kind of HTML primitive that makes complex multi-author content surfaces more accessible without requiring application-level heading rewriting logic.

**Key takeaways:**
- headingoffset and headingreset attributes address heading level conflicts in user-generated content
- Users can write content starting at h1; container attributes handle contextual mapping
- Mozilla is in the prototype phase; full browser support is not imminent
- W3C standards body backing; other browsers will likely follow

**Why do I care:** This is a quiet but important addition for anyone building collaborative or UGC platforms. The current state of heading management in those contexts is messy, and a declarative HTML solution is far preferable to the JavaScript or server-side heading rewriting that teams currently implement.

**Link:** [Intent to Prototype: headingoffset & headingreset attributes](https://groups.google.com/a/mozilla.org/g/dev-platform/c/rHK-dG4weS0/m/Xgaj7uCQAAAJ)

---

## Reduce the JS Workload with No- or Lo-JS Component Patterns

**TLDR:** An organic collection of common JavaScript UI patterns that can be replaced with HTML and CSS alone, from accordions to carousels to modals, with working demos for each variation. A practical reference for reducing unnecessary JavaScript from front-end codebases.

**Summary:** This is a catalog project from Aaron T. Grogg that does exactly what the name says: collects common JavaScript UI patterns that no longer require JavaScript. Accordions, carousels, expanding form fields, filters, image comparison sliders, lazy loading, modals, navigation menus, parallax, scroll-driven header effects, smooth scrolling, sticky content, tabs, video heroes. Each pattern has variations with working demos and notes on whether it is pure no-JS or lo-JS.

The project exists because HTML and CSS have genuinely gotten stronger. Details and summary handle disclosure patterns natively. Popover and dialog handle modal behavior with keyboard trapping built in. CSS scroll snap handles carousels without scroll event listeners. CSS animations handle enter and exit transitions without JavaScript animation libraries. The browser has already implemented much of what we used to reach for JavaScript to build.

The repository structure is well-considered: each variation gets a minimal index.html and styles.css with only the code needed to make the pattern work, plus comments explaining the relevant pieces. No unnecessary decorative styling. No font imports. Just the mechanism.

This is a good resource to bookmark and share with teams that are reaching for component libraries for things the browser can already do. The accordion examples alone would eliminate a significant number of dependencies in typical projects.

**Key takeaways:**
- Native details/summary, popover, dialog, scroll snap, and CSS animations cover most common JS pattern use cases
- Each pattern includes minimal working code and notes on lo-JS vs no-JS
- Progressive enhancement is the default; patterns work without JavaScript enhancements
- Reducing JS means faster initial load and fewer failure points on poor connections

**Why do I care:** JavaScript has better things to do than manage your accordions. That line from the project landing page is correct. Every kilobyte of JavaScript that manages a UI pattern the browser already handles natively is JavaScript that is blocking the main thread, introducing failure points, and adding to the maintenance surface. This collection is a practical checklist for eliminating that waste.

**Link:** [Reduce the JS Workload with No- or Lo-JS options](https://aarontgrogg.github.io/NoLoJS/)
