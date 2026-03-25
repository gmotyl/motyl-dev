---
title: "CSS Is Eating JavaScript: The Great Platform Expansion of 2026"
excerpt: "From anchor positioning to TypeScript 6.0, this week's Frontend Focus covers the massive shift of UI patterns from JavaScript libraries to native CSS and browser APIs."
publishedAt: "2026-03-25"
slug: "css-eating-javascript-great-platform-expansion-2026"
hashtags: "#frontend-focus #frontend #css #html #typescript #javascript #performance #accessibility #webdev #react #browser #generated #en"
---

## The Great CSS Expansion

**TLDR:** A comprehensive audit reveals that roughly 322 kB of common JavaScript UI libraries can now be replaced by native CSS and HTML features. Anchor positioning, the Popover API, scroll-driven animations, view transitions, customizable selects, and more are shipping or nearly shipping across browsers.

**Summary:** This is one of those articles that makes you stop and really reconsider your dependency tree. Pavel Laptev at GitButler has put together an extraordinarily thorough accounting of what the browser platform now handles natively versus what we have been shipping JavaScript for. The numbers are not abstract. We are talking about Floating UI for tooltips, Radix for popovers and dialogs, GSAP for scroll animations, Framer Motion for page transitions, react-select for dropdowns, and Masonry.js for grid layouts. Add them all up and you get over 322 kilobytes of minified, gzipped JavaScript that the platform is actively replacing.

The article walks through each category methodically. CSS Anchor Positioning eliminates the need for Floating UI and Popper by letting you declare one element as an anchor and position another relative to it, with the browser handling overflow and repositioning automatically. The Popover API and the native dialog element together replace the entire modal and popover ecosystem that libraries like Radix and Headless UI were built to solve. Scroll-driven animations let you tie CSS keyframes to scroll progress on the compositor thread, meaning no more JavaScript scroll listeners competing with your main thread. View Transitions handle same-document and cross-document page transitions with a few lines of code. And the long-awaited customizable select element finally lets you style native dropdowns with CSS.

What really landed for me was the performance argument beyond bundle size. Every kilobyte of JavaScript has to be parsed and executed on the main thread. CSS runs on a separate thread and is cheaper to apply. Libraries like GSAP ScrollTrigger and Masonry.js block the main thread while they work. Replacing them with native equivalents directly improves Interaction to Next Paint, Largest Contentful Paint, and Cumulative Layout Shift. That is not theoretical. That is measurable in Core Web Vitals.

The article is honest about what remains firmly in JavaScript territory. Drag and drop is still genuinely hard to abstract declaratively, and overlay scrollbars on Windows still cannot be requested with CSS. But the direction is unmistakable. If you are reaching for a library to solve a UI pattern, check whether the platform caught up while you were not looking.

**Key takeaways:**
- CSS Anchor Positioning replaces Floating UI, Popper, and tippy.js for tooltip and dropdown positioning
- The Popover API and native dialog element replace Radix, Headless UI, and focus-trap libraries
- Scroll-driven animations run on the compositor thread, eliminating main-thread scroll listeners
- View Transitions API handles page transitions that previously required Framer Motion or react-transition-group
- Customizable select elements are finally arriving, potentially replacing react-select, Radix Select, and Downshift
- CSS Grid Lanes (formerly masonry proposal) will eliminate the need for Masonry.js and Isotope

**Why do I care:** If you maintain a design system or any medium-to-large frontend application, this article is your migration roadmap for the next two years. Every library you can drop is one fewer peer dependency conflict, one fewer breaking change in a major release, and measurably less JavaScript competing for your users' main thread. The conservative scenario alone removes 44 kB from a typical app. Start with anchor positioning and the Popover API since those have the broadest browser support today.

**Link:** [The Great CSS Expansion](https://blog.gitbutler.com/the-great-css-expansion)

---

## Announcing TypeScript 6.0

**TLDR:** TypeScript 6.0 is the bridge release before the native Go-based TypeScript 7.0. It changes major defaults like strict mode being on by default, deprecates ES5 and AMD targets, and introduces a stable type ordering flag to prepare for parallel type checking.

**Summary:** This is a big one and I want to be direct about what it actually means. TypeScript 6.0 is explicitly designed as a transition release. The team says it will be the last release based on the current JavaScript codebase. TypeScript 7.0, written in Go with shared-memory multi-threading, is coming within months. So everything in 6.0 is about getting your codebase ready for that jump.

The default changes are significant. Strict mode is now on by default. The default module is esnext. The default target floats to the current ES spec year, which right now means es2025. The types array now defaults to empty instead of enumerating everything in node_modules/@types, which means many projects will need to explicitly add "types": ["node"] or similar entries. The rootDir default changed from inferred to the tsconfig.json directory, which will break projects that relied on inference. These are not subtle changes. If you upgrade without reading the release notes, you will see errors.

The deprecations tell you where the JavaScript ecosystem has moved. ES5 target is gone. AMD, UMD, and SystemJS module targets are gone. The classic module resolution is gone. The baseUrl option is deprecated because it created confusing module resolution behavior. Import assertions using the asserts keyword are deprecated in favor of import attributes using with. The outFile option is removed entirely in favor of external bundlers. Each of these reflects the reality that virtually every runtime is now evergreen, ESM is dominant, and bundlers handle concatenation better than the compiler.

On the feature side, there is built-in support for the Temporal API, Map.getOrInsert and getOrInsertComputed methods, RegExp.escape, and a quality-of-life fix where dom.iterable is now included in the dom lib by default. The stableTypeOrdering flag helps diagnose ordering differences between 6.0 and 7.0 for teams doing migration testing.

**Key takeaways:**
- TypeScript 6.0 is the last JavaScript-based release before the Go-native TypeScript 7.0
- Strict mode, esnext module, and es2025 target are now defaults
- The types array defaults to empty, potentially requiring explicit "types": ["node"] in tsconfig
- ES5 target, AMD/UMD/SystemJS modules, classic resolution, baseUrl, and outFile are all deprecated
- Built-in types for Temporal API, Map upsert methods, and RegExp.escape are included
- The stableTypeOrdering flag helps prepare for TypeScript 7.0's parallel type checking

**Why do I care:** This is not a release you can casually npm update into. The default changes alone will break most projects that do not have every tsconfig option explicitly set. But the migration is worth doing now because TypeScript 7.0 will remove all deprecated options entirely. Start by adding ignoreDeprecations: "6.0" to your tsconfig, fix things incrementally, and then remove that escape hatch before 7.0 lands. The ts5to6 codemod tool can handle the mechanical baseUrl and rootDir adjustments automatically.

**Link:** [Announcing TypeScript 6.0](https://devblogs.microsoft.com/typescript/announcing-typescript-6-0/)

---

## WebKit Features for Safari 26.4

**TLDR:** Safari 26.4 ships 44 features and 191 fixes, headlined by CSS Grid Lanes for masonry layouts, WebTransport for low-latency communication, and the Keyboard Lock API. The release focuses heavily on spec compliance and bug fixes rather than flashy new features.

**Summary:** Apple is clearly listening to developer survey feedback here, and the result is a release that prioritizes consistency over novelty. The headline feature is CSS Grid Lanes, which brings masonry-style layouts to Safari as a native CSS feature. This is significant because it means masonry layouts are now available in both Safari and Firefox experimentally, with Chrome actively working on it. The spec debate between a grid-based approach and a standalone display type appears to be resolving in favor of keeping it within the CSS Grid specification.

WebTransport arrives as a modern alternative to WebSocket, enabling low-latency bidirectional communication for multiplayer games, live collaboration, and video conferencing. The Keyboard Lock API gives web apps better control over keyboard shortcuts, which is particularly important for productivity tools and games that need to capture system-level key combinations.

But the real story of this release is the 191 fixes. The WebKit team specifically called out that developer surveys showed people want existing features to work consistently across browsers more than they want new features. So they focused on closing gaps in spec coverage. For example, you can now use min, max, and clamp functions inside the HTML sizes attribute, something that required combining features that had each been supported for years but never worked together. That kind of fix does not make headlines but it removes real friction from production code.

**Key takeaways:**
- CSS Grid Lanes brings native masonry layouts to Safari
- WebTransport provides a modern, low-latency alternative to WebSocket
- Keyboard Lock API allows web apps to capture system-level keyboard shortcuts
- 191 bug fixes prioritize spec compliance and cross-browser consistency
- The min/max/clamp functions now work inside the HTML sizes attribute

**Why do I care:** The Grid Lanes support in Safari means you can start planning masonry layout migrations from JavaScript libraries with more confidence. And the sheer volume of spec compliance fixes means fewer browser-specific workarounds in your CSS. If you have been holding off on certain CSS features because of Safari edge cases, it is worth retesting against 26.4.

**Link:** [WebKit Features for Safari 26.4](https://webkit.org/blog/17862/webkit-features-for-safari-26-4/)

---

## CSS Refactoring with an AI Safety Net

**TLDR:** A developer used Claude Code to plan and execute a seven-phase CSS refactoring, using Playwright screenshots compared by AI to catch visual regressions. The technique caught a subtle line-height change that would have been missed by manual review.

**Summary:** Daniel Baron describes a technique that I think is genuinely clever and worth stealing. She had a breathing meditation app with CSS that had grown into an unmaintainable tangle through vibe coding. The solution was to use Claude Code to plan a structured refactoring toward a cascade-layers architecture, then verify each phase produced zero visual changes by having the AI compare before-and-after screenshots.

The workflow has three parts. First, a Playwright script navigates through every meaningful app state, not just page routes but transient interactive states like open drawers, populated versus empty lists, and revealed form fields, and captures a screenshot of each. Second, the CSS changes are made for one phase at a time. Third, the AI reads both sets of screenshots and describes any differences in plain English. The key insight is that because each phase is a single conceptual change, when a regression appears the cause is immediately obvious.

The technique proved itself in Phase 5 when replacing an old CSS reset with a modern one introduced a different default line-height that subtly changed body text rendering. The AI flagged it immediately with a specific diagnosis: the new reset was setting line-height to 1.5 on the body element. A dedicated visual regression tool like Playwright's built-in screenshot comparison would have told you that some pixels differed, but not why. The AI gave an immediately actionable explanation.

The article honestly addresses when this approach makes sense versus dedicated tooling. For a one-off refactor, having the AI do the diffing is practical. For CI on every push, the token costs would add up and a proper visual regression tool with baseline management makes more sense.

**Key takeaways:**
- Enumerate every meaningful app state before starting, including transient interactive states
- Keep refactoring phases small so regressions have an obvious single cause
- AI screenshot comparison provides actionable explanations of what changed and why, not just pixel diffs
- The entire seven-phase refactor with analysis, planning, and execution took about three hours
- Dedicated visual regression tools are better for CI; AI diffing is better for one-off refactors

**Why do I care:** CSS refactoring is one of the highest-risk, lowest-reward tasks in frontend development. This technique fundamentally changes the risk calculus by providing automated visual verification at each step. Even if you never use AI for the diffing, the discipline of capturing every meaningful state before starting and verifying after each phase is something every team should adopt for CSS changes.

**Link:** [CSS Refactoring with an AI Safety Net](https://danielabaron.me/blog/css-refactoring-with-an-ai-safety-net/)

---

## More Easy Light-Dark Mode Switching: light-dark() Is About to Support Images

**TLDR:** The CSS light-dark() function is being extended to accept image values, not just colors. Firefox 150 ships it in April, Chromium has it behind a flag, and Safari has no support yet.

**Summary:** Bramus Van Damme brings us an update on one of those CSS features that started as a nice convenience and is becoming genuinely powerful. The light-dark() function originally only accepted color values, which meant that swapping background images or logos between light and dark mode still required the old media query approach with all its limitations, including scattered code and no respect for local color-scheme overrides.

The updated spec lets you write something like background-image: light-dark(url(light-pattern.png), url(dark-pattern.png)) as a single declaration. This is cleaner than the media query approach, and critically it respects local color-scheme overrides set via the CSS color-scheme property, not just the global user preference. That distinction matters for components that need to force a specific color scheme regardless of the user's system setting.

The implementation uses two internal variants of light-dark(), one for colors and one for images, which is why you cannot mix types in the arguments. Bramus explains the technical reason clearly: if you could mix a color and an image, you would end up with invalid declarations in one of the two modes. Looking ahead, CSS Custom Functions combined with a color-scheme() function will eventually let you create light-dark switching for any value type in just three lines of code.

**Key takeaways:**
- light-dark() now accepts image values in addition to colors
- Firefox 150 ships support in April 2026, Chromium has it behind an experimental flag
- You cannot mix color and image types in the same light-dark() call
- Feature detection is possible via @supports with a linear-gradient test
- CSS Custom Functions with color-scheme() will eventually enable light-dark switching for any value type

**Why do I care:** If you have been maintaining separate media queries for image swaps between light and dark mode, this is a significant simplification. The Firefox release in April makes it practical to start using with a fallback. The feature detection approach using @supports means you can progressively enhance without breaking anything.

**Link:** [More Easy Light-Dark Mode Switching: light-dark() is about to support images!](https://www.bram.us/2026/03/19/more-easy-light-dark-mode-switching-light-dark-is-about-to-support-images/)

---

## Sneaky Header Blocker Trick

**TLDR:** Josh Comeau reveals how his blog's header appears to change background color as you scroll, using sticky "blocker" elements color-matched to each section rather than any JavaScript scroll detection.

**Summary:** Josh Comeau walks us through one of those delightful CSS-only techniques that looks like it must involve JavaScript but absolutely does not. The site header on his blog has a transparent background that never changes. The illusion of a changing background is created by sticky blocker elements, one in the hero section and one in the main content area, each color-matched to their respective backgrounds.

The key insight is about how sticky positioning actually works. When a sticky element reaches the end of its container, it becomes unstuck and scrolls out of view. So the blue blocker in the hero section follows you as you scroll through the hero, but once you scroll past the hero it disappears. At the same time, a white blocker in the main content section takes over. The transition between the two creates a smooth handoff effect that looks intentional and polished.

The implementation is remarkably simple. The header uses position fixed with a transparent background. Each blocker uses position sticky, top zero, and a height matching the header. The only real constraint is that you need enough empty space above the main content to hide the blocker when the user is at the top of the page. Josh acknowledges this constrained his cloud design slightly and explains that on his homepage, where the design is too aggressive to hide a blocker, he falls back to a more traditional JavaScript-based approach.

The article includes interactive playgrounds that let you adjust a "reveal" slider to see exactly what is happening under the hood, which is the kind of teaching approach that makes CSS techniques click instantly.

**Key takeaways:**
- The header itself has a transparent background and position fixed
- Sticky blocker elements color-matched to each section create the illusion of background changes
- Sticky elements automatically unstick when they reach the end of their container
- The technique requires enough space above content to hide the blocker at scroll position zero
- No JavaScript is involved in the scrolling behavior

**Why do I care:** This is a clean, performant technique that eliminates a scroll listener for a common design pattern. If your site has a sticky header over sections with different background colors, this approach gives you a smooth transition effect with zero JavaScript and zero jank. The constraint about needing space for the blocker is worth knowing upfront when designing the layout.

**Link:** [Sneaky Header Blocker Trick](https://www.joshwcomeau.com/css/header-blockers/)

---

## The Color System I Wish I Understood Sooner

**TLDR:** A two-layer color system using primitive tokens for palette values and semantic tokens for usage context solves the maintenance problems that either approach alone creates.

**Summary:** This article from The Admin Bar articulates something that experienced frontend developers know intuitively but rarely explain well. The primitive approach, naming colors by their visual properties like blue-600, gives you a curated organized palette but tells you nothing about where colors are used. The semantic approach, naming by purpose like button-background, makes usage intuitive but scatters identical hex values across disconnected variables with no way to make a global change.

The solution is to use both layers together. Primitives define the palette with each variable pointing to a hex value. Semantics define usage with each variable pointing to a primitive, not a hex value. So button-background, link-color, and cta-background all point to blue-600. When the client says the blue is too bright, you change blue-600 once and everything updates. When the client says buttons should be orange, you change button-background to orange-600 and nothing else moves.

The article walks through why each approach fails on its own with concrete examples. Six months into a project, primitives leave you guessing whether buttons use blue-600 or blue-700. Semantics leave you hunting for every variable that happens to contain the same hex value. The two-layer approach eliminates both failure modes. It is essentially the same pattern that mature design systems like Material Design and Lightning Design System use, but explained in a way that makes the reasoning transparent rather than just prescriptive.

**Key takeaways:**
- Primitives define what colors exist but not where they are used
- Semantics define where colors are used but create disconnected duplicate values
- The two-layer approach connects semantics to primitives, enabling both global and targeted changes
- Semantic variables should always reference primitives, never raw hex values
- This pattern scales from small projects to full design systems

**Why do I care:** If you have ever changed a hex value in one place and then spent twenty minutes hunting for the other four places that used the same color, this is the architecture that prevents that. It is simple enough to adopt on any project, even retroactively, and it is the foundation that makes dark mode, theming, and brand updates manageable at scale.

**Link:** [The Color System I Wish I Understood Sooner](https://theadminbar.com/semantics-and-primitives-color-system/)

---

## Experimenting With Scroll-Driven corner-shape Animations

**TLDR:** The new CSS corner-shape property combined with scroll-driven animations creates dynamic viewport-level shape effects. The superellipse() function makes corner shapes animatable, enabling notch-to-square transitions tied to scroll position.

**Summary:** This CSS-Tricks article by Daniel Schwarz explores the intersection of two cutting-edge CSS features: the corner-shape property and scroll-driven animations. The corner-shape property, currently Chrome 139+ only, lets you create corners that go beyond simple rounding. Using the superellipse() function, you can specify values from negative infinity, which creates notch or inset shapes, through zero for bevels, to positive infinity for perfectly squared corners. The key insight is that because these shapes are mathematically defined, they animate smoothly.

The main demo creates a pseudo-element fixed to the viewport that uses mix-blend-mode difference to invert the underlying content. As you scroll, the corner shape animates from a notch shape to a square shape, creating a dramatic visual effect. The article walks through practical refinements like extending the shape beyond the viewport with negative inset values and constraining the superellipse range to avoid harsh curvature at the extremes.

The author then explores additional applications: using corner-shape as a mask to create a border reveal effect where a notched shape rotates to expose decorative corners as you scroll, and animating multiple nested diamond shapes using corner-shape bevel with increasing padding. Each technique combines scroll-driven animations with scroll snapping, scroll markers, and simple JavaScript scroll methods, showing how these features compose naturally.

**Key takeaways:**
- corner-shape with superellipse() creates animatable corner shapes from notches to squares
- Scroll-driven animations tie corner-shape changes to scroll position without JavaScript
- mix-blend-mode difference with the technique creates an invertible viewport overlay
- Extending shapes beyond the viewport with negative inset avoids harsh edge effects
- The feature currently requires Chrome 139+ but is part of Interop 2026

**Why do I care:** This is more experimental than production-ready, but it demonstrates where CSS is heading. The ability to animate mathematical shape functions tied to scroll position opens up effects that previously required complex canvas or WebGL implementations. When Firefox support lands through Interop 2026, these techniques become viable for progressive enhancement on marketing and portfolio sites.

**Link:** [Experimenting With Scroll-Driven corner-shape Animations](https://css-tricks.com/experimenting-with-scroll-driven-corner-shape-animations/)

---

## Split View in Firefox

**TLDR:** Firefox 149 introduces Split View, letting you place two tabs side by side in the same window. Right-click a tab and choose Add Split View to compare, reference, or work across two pages simultaneously.

**Summary:** Mozilla has shipped a feature in Firefox 149 that addresses one of the most common browsing workflows: needing to see two things at once. Split View lets you place two tabs next to each other within a single Firefox window without needing to manage multiple windows or use third-party window management tools. You activate it by right-clicking a tab and selecting Add Split View, or by selecting two tabs and choosing Open in Split View.

The article includes examples from the team who built it. Planning trips with a map on one side and booking pages on the other. Filing taxes with documents on one side and the tax filing site on the other. Reading articles on one side while taking notes on the other. These are all workflows that previously meant either constant tab switching or arranging multiple browser windows manually.

This is not a revolutionary feature in the sense that other browsers and operating systems have had split views for years. But it is a meaningful quality-of-life improvement for Firefox users who have been asking for it. The implementation is straightforward and does not require any extensions or configuration. Mozilla says this is the first version with the most common workflows covered and they are looking for feedback on what to build next.

**Key takeaways:**
- Available in Firefox 149, rolling out March 24, 2026
- Activated via right-click on a tab or selecting two tabs
- Both tabs remain fully interactive within the same window
- First version focuses on common side-by-side workflows

**Why do I care:** If Firefox is your development browser, this eliminates the need for window management tools when you need to compare layouts, reference documentation while coding, or test responsive designs side by side. It is a small feature that removes a surprising amount of friction from daily development workflows.

**Link:** [Split View in Firefox](https://blog.mozilla.org/en/firefox/split-view/)

---

## Highlighting Footnotes with CSS

**TLDR:** Using the :target pseudo-class with a carefully positioned pseudo-element, you can highlight linked footnotes with a fading squircle animation, all in pure CSS with no JavaScript.

**Summary:** Kitty Giraudel, who has written extensively about accessible footnotes, shares a small but satisfying improvement. When you click a footnote reference link and jump to the footnote at the bottom of the page, there is typically no visual indication of which footnote you landed on. With one or two footnotes this is fine. With many, it becomes confusing.

The simplest approach uses the :target pseudo-class to apply a background color to the targeted list item. But the basic version has problems: the highlight does not encompass the footnote number, and it sticks too close to the text edges. The refined version uses a pseudo-element with absolute positioning and negative left margin to extend the highlight into the list gutter, covering the number. It applies rounded corners using the new corner-shape squircle property for a softer visual feel.

The final touch is a CSS animation that fades the highlight out after five seconds. The reasoning is that you need the highlight when you first follow the footnote reference, but not when scrolling around the page later. The animation uses animation-fill-mode forwards to ensure the final transparent state persists. Combined with scroll-margin-top on the list items to prevent the targeted footnote from sticking to the very top edge of the viewport, the result is a polished, entirely CSS-driven footnote experience.

**Key takeaways:**
- The :target pseudo-class styles the footnote that was just navigated to
- A pseudo-element extends the highlight to cover the footnote number
- corner-shape: squircle creates softer highlight corners
- A CSS animation fades the highlight after five seconds
- scroll-margin-top prevents the footnote from sitting flush against the viewport edge

**Why do I care:** This is the kind of micro-interaction that separates a polished reading experience from a functional one. It takes maybe fifteen minutes to implement and requires zero JavaScript. If your site has content with footnotes, this is a quick win that improves usability without adding any dependencies.

**Link:** [Highlighting Footnotes](https://kittygiraudel.com/2026/03/18/highlighting-footnotes/)

---

## Progressive Web Components with Elena

**TLDR:** Elena is a 2.6 kB library for building Progressive Web Components that render HTML and CSS first, then hydrate with JavaScript. It targets design system teams who need cross-framework portability without the typical web component pain points.

**Summary:** Ariel Salminen has been working with web components for nearly a decade building enterprise design systems, and this library is his response to the pain points that keep coming back: layout shifts, flash of unstyled content, poor server-side rendering support, too much reliance on client-side JavaScript, and poor integration with frameworks like React Server Components. Elena takes the position that web components are the right foundation for cross-framework design systems, but the way we have been building them is the problem.

The core philosophy is Progressive Web Components, designed in two layers. A base layer of HTML and CSS renders immediately without JavaScript. An enhancement layer of JavaScript adds reactivity, event handling, and advanced templating. The library distinguishes between three types: Composite Components that wrap and enhance composed HTML in the Light DOM, Primitive Components that are self-contained with Light DOM CSS, and Declarative Components that use Declarative Shadow DOM.

The SSR story is straightforward. Components without a render method are fully SSR-compatible by default because they are just HTML and CSS. Components with render provide partial support with client-side hydration. Elena also supports Declarative Shadow DOM for cases requiring stronger isolation while maintaining server-side rendering capability. The library ships at 2.6 kB minified and compressed with zero runtime dependencies.

The release candidate comes with over 1000 tests across 57 test files including unit, integration, visual diff, and benchmark tests. It is still young and the API may evolve, but the testing discipline suggests it is being built for production use.

**Key takeaways:**
- 2.6 kB library with zero runtime dependencies for building web components
- Progressive enhancement: HTML and CSS render first, JavaScript hydrates after
- Three component types: Composite (Light DOM wrappers), Primitive (self-contained), and Declarative (Shadow DOM)
- SSR works by default for components without a render method
- Over 1000 tests with 100% code coverage across the core library

**Why do I care:** If your team maintains a design system that needs to work across React, Vue, Angular, or no framework at all, web components are the only technology that provides true portability. Elena's progressive enhancement approach directly addresses the biggest objections to web components: the FOUC, the SSR story, and the JavaScript dependency for initial render. At 2.6 kB it is worth evaluating against whatever you are currently using.

**Link:** [Progressive Web Components](https://arielsalminen.com/2026/progressive-web-components/)

---

## SVG Favicons That Respect Theme Preference

**TLDR:** SVG favicons can use embedded CSS with prefers-color-scheme media queries to adapt to light and dark mode, but Safari currently ignores the media queries while Chrome requires a refresh to update.

**Summary:** Pawel Grzybek reminds us of a technique that has been available for years but remains underused. SVG favicons solve the resolution problem permanently since they are vector, and they can embed CSS including media queries. This means you can have a single favicon file that adapts its colors based on the user's color scheme preference, using prefers-color-scheme inside a style element within the SVG.

The implementation is minimal. A link element with rel icon pointing to an SVG file, and inside that SVG a style block with a media query that changes fill colors between light and dark mode. In theory this gives you theme-adaptive favicons with zero JavaScript and a single file.

In practice, browser support is inconsistent. Firefox handles it best, updating the favicon dynamically when the color scheme changes. Chrome respects the media queries but requires a page refresh for the new styles to take effect, which Pawel correctly notes is acceptable since normal users do not toggle their theme constantly. Safari ignores the media query overrides entirely and renders only the base styles. Pawel filed a WebKit bug and makes the excellent point that complaining about browser bugs to your colleagues does not fix anything, but reporting them and blogging about them does.

**Key takeaways:**
- SVG favicons support embedded CSS with prefers-color-scheme media queries
- Firefox updates favicon theme dynamically, Chrome requires a refresh, Safari ignores it
- A single SVG file replaces multiple favicon sizes and theme variants
- WebKit bug has been filed for Safari's lack of media query support in SVG favicons

**Why do I care:** This is a progressive enhancement with zero downside. Your favicon works everywhere. In Firefox and Chrome it also adapts to the user's theme. One file, no build step, no JavaScript. If you are still shipping multiple PNG favicons in various sizes, the combination of an SVG favicon with a PNG fallback is the modern approach and takes about five minutes to implement.

**Link:** [SVG favicons that respect theme preference](https://pawelgrzybek.com/svg-favicons-that-respect-theme-preference/)

---

## Structure Revealer: A New A11y Bookmarklet

**TLDR:** A new bookmarklet from A11y Tools lets you visualize page structure by selectively highlighting semantic HTML elements, with the ability to add custom CSS selectors and persist your preferences across sessions.

**Summary:** The A11y Tools project has released Structure Revealer, a bookmarklet that sits in a useful middle ground between full diagnostic CSS files and browser DevTools. The creator notes that existing diagnostic CSS tools can be too noisy, showing everything at once when you might only need to verify specific structural elements. Structure Revealer addresses this by letting you selectively toggle which elements are highlighted.

The tool shows checkboxes for different categories of structural elements. You can deselect things you know are correct and focus only on what you are investigating. More interesting is the ability to add custom CSS selectors for patterns specific to the site you are assessing. If you notice a repeated component pattern and want to verify its usage across the page, you add a CSS selector and it becomes a toggleable checkbox alongside the built-in categories.

Each highlighted category shows a count of matching elements on the page. Clicking that count reveals details about each element, and clicking individual entries scrolls that element into view. Selections, deselections, and custom selectors all persist across sessions, which means you can build up a custom inspection profile for a site you audit regularly without reconfiguring each time.

**Key takeaways:**
- Selectively highlight structural HTML elements without the noise of full diagnostic CSS
- Custom CSS selectors let you target site-specific patterns
- Element counts with click-to-scroll-into-view for each match
- Preferences persist across sessions including custom selectors
- Also available as a browser extension

**Why do I care:** Accessibility auditing often starts with verifying that the right semantic elements are used in the right places. This tool makes that visual verification faster and more focused than either DevTools inspection or full-page diagnostic overlays. The custom selector feature is particularly useful for design system work where you need to verify consistent component usage across a site.

**Link:** [New bookmarklet – Structure Revealer](https://a11y-tools.com/blog/2026/03/new-bookmarklet-structure-revealer/)

---

## Expo UI in SDK 55: Jetpack Compose for React Native

**TLDR:** Expo UI SDK 55 brings Jetpack Compose support to beta with enough Material Design 3 components to build complete apps, and aligns SwiftUI APIs with Apple's conventions so native framework knowledge transfers directly.

**Summary:** The Expo team has been working on something genuinely interesting with Expo UI: instead of reimplementing native components in JavaScript, they expose SwiftUI and Jetpack Compose directly in React Native apps. SDK 55 brings the Jetpack Compose side to beta after validating it by building a complete WikiReader app using only Expo UI components.

The API design is deliberate. Component names, modifier chains, and structural patterns mirror their native counterparts. If you know Jetpack Compose, you know that LazyColumn takes arrangement and padding, and that ListItem has leading and trailing content slots. In Expo UI, this maps to JSX using React's compound component pattern with ListItem.Leading and ListItem.Trailing. Scoped modifiers work the same way, with Row and Column getting their own specific options like weight and matchParentSize.

The SwiftUI side got reworked in SDK 55 to match Apple's naming conventions. DateTimePicker became DatePicker, Switch became Toggle, CircularProgress became ProgressView. The reasoning is that when you look something up in Apple's documentation, it should map directly to the Expo UI API without a translation layer. This also means AI tools can generate correct Expo UI code from their existing training data on native framework documentation.

The AI integration angle is explicitly part of the strategy. Because the APIs follow established native conventions, AI assistants that know SwiftUI or Jetpack Compose can write Expo UI code without special training. Expo has added skills and an MCP integration to make this workflow smoother. The team is working toward universal components that share an API across both platforms and potentially web.

**Key takeaways:**
- Jetpack Compose support is now beta with Material Design 3 components
- SwiftUI APIs renamed to match Apple's conventions exactly
- Modifier system works consistently across both platforms
- Native framework knowledge transfers directly to Expo UI code
- AI integration is explicitly part of the design strategy

**Why do I care:** If you are building React Native apps that need to feel truly native on both platforms, Expo UI is taking a fundamentally different approach from the typical JavaScript reimplementation. The alignment with native framework conventions means your native iOS and Android developers can review and contribute to Expo UI code without learning a translation layer. The beta status for Compose means it is worth evaluating for new projects now.

**Link:** [Expo UI in SDK 55: Jetpack Compose now available for React Native apps](https://expo.dev/blog/expo-ui-in-sdk-55-jetpack-compose-now-available-for-react-native-apps)

---

## Building a Dual-Scene Fluid X-Ray Reveal Effect in Three.js

**TLDR:** A detailed tutorial on creating a fluid X-ray reveal effect using Three.js with TSL and WebGPU, combining a ping-pong fluid simulation, instanced dual scenes, and a multi-pass post-processing pipeline.

**Summary:** Cullen Webber walks through building one of those effects that makes you stop scrolling. A grid of human figures rendered in Three.js, with a fluid mouse trail that reveals an X-ray skeleton underneath the solid body. The implementation is a five-stage render pipeline: a 2D canvas mouse trail, a ping-pong fluid simulation, two instanced Three.js scenes, and a post-processing compositor.

The fluid simulation is the most interesting technical piece. It uses ping-pong rendering where two render targets alternate each frame because the GPU cannot read and write the same texture simultaneously. Each frame samples the previous frame at five positions offset by FBM noise, keeping the darkest values to create a spreading effect that looks organic rather than like a uniform blur. A small amount of white is added each frame so the fluid fades when the cursor stops.

The instanced scenes use Three.js Shading Language for a Fresnel material that makes edges glow while surfaces facing the camera stay dark. Twelve copies of each model render in just two draw calls thanks to InstancedMesh, arranged in a hexagonal-staggered grid. The post-processing pipeline composites the two scenes using the fluid mask, adds bloom only to the solid scene, layers scan lines, applies film grain, slight desaturation, and a color grade that pushes blue into the shadows.

The tutorial is thoroughly explained with code samples at each stage, and both WebGPU and WebGL versions are available in the GitHub repository.

**Key takeaways:**
- Ping-pong rendering enables frame-to-frame fluid simulation on the GPU
- FBM noise applied to UV offsets creates organic-looking fluid spread
- Fresnel materials with smoothstep height fade create the X-ray aesthetic
- InstancedMesh renders twelve model copies in just two draw calls
- The post-processing chain composites two scenes using the fluid simulation as a mask

**Why do I care:** Even if you never build this specific effect, the techniques are broadly applicable. Ping-pong rendering for any frame-dependent simulation, Fresnel materials for holographic effects, instanced meshes for performant repeated geometry, and multi-pass post-processing pipelines are all patterns that appear across creative web development. The TSL shader language approach is also worth learning as WebGPU adoption grows.

**Link:** [Building a Dual-Scene Fluid X-Ray Reveal Effect in Three.js](https://tympanus.net/codrops/2026/03/23/building-a-dual-scene-fluid-x-ray-reveal-effect-in-three-js/)