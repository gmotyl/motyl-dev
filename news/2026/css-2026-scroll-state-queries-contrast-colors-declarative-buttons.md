---
title: "CSS in 2026: Scroll State Queries, Contrast Colors, and Declarative Buttons"
excerpt: "This week's Tailwind Weekly highlights powerful new CSS features including scroll-state queries, contrast-color(), sibling-index(), and the new command/commandfor attributes for declarative button behavior."
publishedAt: "2026-01-25"
slug: "css-2026-scroll-state-queries-contrast-colors-declarative-buttons"
hashtags: "#tailwindweekly #tailwindcss #css #frontend #webdev #accessibility #chrome #safari #generated #en"
---

## 4 CSS Features Every Front-End Developer Should Know In 2026

**TLDR:** CSS shipped major features in 2025 that are now stable in Chrome and Safari: sibling-index() for staggered animations, scroll-state queries for detecting stuck/snapped/scrollable elements, text-box for precise typographic control, and typed attr() for type-safe HTML-to-CSS bridging.

**Summary:**

Adam Argyle has put together another excellent roundup of CSS features that shipped in 2025 and are now ready for production use. These aren't experimental features hidden behind flags—they're available in stable Chrome and Safari today.

The `sibling-index()` and `sibling-count()` functions finally give CSS the ability to know an element's position among its siblings. This opens up elegant solutions for staggered animations without JavaScript. The classic pattern of delaying each list item's entrance animation by a progressively larger amount can now be done in pure CSS with `transition-delay: calc((sibling-index() - 1) * 100ms)`. Combined with `@starting-style`, you can create smooth entrance animations that feel polished and intentional.

Scroll state queries represent a paradigm shift in how we think about scroll-related styling. Instead of relying on Intersection Observer or scroll event listeners to detect when a sticky header is stuck, you can now use `@container scroll-state(stuck)` to apply styles declaratively. The same applies to scroll-snap states—knowing exactly when an element has snapped into position lets you highlight the active item or dim surrounding content. The `scrollable` and `scrolled` states are equally powerful for showing scroll hints or hiding navigation bars based on scroll direction.

The `text-box` property addresses a long-standing frustration for designers who care about pixel-perfect typography. Web fonts include "half-leading" space above and below glyphs for safe spacing, but sometimes you need precise alignment to baselines or cap heights. With `text-box: trim-both cap alphabetic`, you can slice off that whitespace and achieve the tight layouts that print designers have always expected.

For architects building component libraries, typed `attr()` deserves special attention. It creates a genuine bridge between HTML attributes and CSS values with type checking and fallbacks. You can pass colors, numbers, or even enumerated values from HTML into CSS calculations. This enables patterns where HTML defines the "what" and CSS enforces valid options—like scroll-snap alignment where the CSS defines `type(start | center | end)` and HTML must pass one of those valid values.

**Key takeaways:**
- `sibling-index()` and `sibling-count()` are stable in Chrome and Safari for staggered animations without JavaScript
- Scroll state queries (`stuck`, `snapped`, `scrollable`, `scrolled`) replace JavaScript-based scroll detection
- `text-box` trims typographic whitespace for pixel-perfect alignment
- Typed `attr()` provides type-safe HTML-to-CSS data passing with validation

**Tradeoffs:**
- Modern CSS features provide cleaner solutions but sacrifice browser support for older browsers
- Declarative scroll state queries improve performance but limit fine-grained control over timing

**Link:** [4 CSS Features Every Front-End Developer Should Know In 2026](https://nerdy.dev/4-css-features-every-front-end-developer-should-know-in-2026)

---

## How to Have the Browser Pick a Contrasting Color in CSS

**TLDR:** The new `contrast-color()` CSS function automatically chooses black or white text based on which provides better contrast with a given background color, though it currently uses the WCAG 2 algorithm which has known limitations with mid-tone colors.

**Summary:**

Jen Simmons from the WebKit team has written an essential deep-dive into `contrast-color()`, a feature that solves a common styling challenge: automatically choosing readable text colors for dynamic backgrounds. Instead of managing paired color variables across your design system, you can write `color: contrast-color(var(--button-color))` and let the browser pick black or white.

The elegance of this approach becomes apparent when you combine it with other modern CSS features. Using Relative Color Syntax, a single `--button-color` variable can generate four colors: the default background, its contrasting text, a hover state (perhaps 20% lighter), and that hover state's contrasting text. Your theming code shrinks dramatically while maintaining accessibility.

But here's the critical caveat that every developer needs to understand: `contrast-color()` does not guarantee accessible contrast. It chooses the option with more contrast, but if neither black nor white provides sufficient contrast with your chosen background, you still have an accessibility problem. The function uses the WCAG 2 algorithm, which calculates contrast mathematically rather than perceptually—and this leads to counterintuitive results with mid-tone colors.

The article provides a fascinating comparison between WCAG 2 and the proposed APCA (Accessible Perceptual Contrast Algorithm) for WCAG 3. A medium blue like #317CFF mathematically scores higher contrast with black under WCAG 2, but any human looking at it would clearly see that white is more readable. APCA correctly identifies white as the better choice because it models human perception rather than simple mathematical ratios.

For teams building design systems, the practical guidance is clear: `contrast-color()` works well for clearly light or clearly dark background colors. For mid-tones, you still need human judgment. The article demonstrates combining `contrast-color()` with `@media (prefers-contrast: more)` to offer high-contrast alternatives for users who need them—a pattern that respects both automation and accessibility.

**Key takeaways:**
- `contrast-color(purple)` returns black or white, whichever contrasts better with purple
- Combine with CSS variables and Relative Color Syntax for powerful theming with minimal code
- The WCAG 2 algorithm has known flaws—it may choose perceptually worse options for mid-tones
- Always test with real users; this function helps but doesn't guarantee accessibility
- Use `prefers-contrast: more` media query to offer high-contrast alternatives

**Tradeoffs:**
- Automatic color selection saves development time but relies on an imperfect contrast algorithm
- Using a single color variable simplifies theming but requires careful selection of that base color

**Link:** [How to have the browser pick a contrasting color in CSS](https://webkit.org/blog/16929/contrast-color/)

---

## The command and commandfor Attributes: Declarative Button Behavior

**TLDR:** Chrome 135 introduces `command` and `commandfor` attributes that let buttons declaratively control other elements (popovers, dialogs) without JavaScript, replacing the older `popovertarget` and `popovertargetaction` attributes with a more powerful and extensible system.

**Summary:**

The Chrome team has shipped a feature that fundamentally changes how we think about button interactions. The new `command` and `commandfor` attributes allow buttons to control other elements declaratively—opening popovers, showing modals, closing dialogs—all without writing JavaScript or managing state.

Consider the traditional pattern for a menu button: you need an event listener, you need to find the target element in the DOM, you need to manage `aria-expanded`, and you need to handle the toggle event to reset state when the popover closes. Frameworks like React, Vue, or Svelte help with the ergonomics, but you're still writing significant coordination code. With the new attributes, that entire dance becomes `<button commandfor="my-menu" command="show-popover">`.

The built-in commands cover common patterns: `show-popover`, `hide-popover`, `toggle-popover` for popovers, and `show-modal` and `close` for dialogs. The dialog integration is particularly elegant—the close button's `value` attribute becomes the dialog's `returnValue`, so you can distinguish between Cancel, Delete, and Close actions with a single event listener on the dialog itself.

What makes this extensible is the custom command syntax. Prefix any command with `--` and it becomes a custom event. `command="--rotate-landscape"` will fire a command event on the target element, which you can handle however you like. This creates an HTML-based API for your components—buttons declare their intent, elements respond accordingly.

For architects building component libraries, this pattern offers cleaner separation of concerns. The HTML declares relationships between interactive elements. The browser handles accessibility attributes automatically. Your JavaScript focuses on business logic rather than DOM coordination. Shadow DOM is supported through the `commandForElement` property, though crossing shadow boundaries requires that JavaScript bridge.

**Key takeaways:**
- `command` and `commandfor` replace `popovertargetaction` and `popovertarget` with expanded capabilities
- Built-in commands handle popovers (`show-popover`, `hide-popover`, `toggle-popover`) and dialogs (`show-modal`, `close`)
- Custom commands (prefixed with `--`) enable extensible, declarative component APIs
- Accessibility attributes like `aria-expanded` are managed automatically by the browser
- Dialog close buttons can set `returnValue` through their `value` attribute

**Tradeoffs:**
- Declarative attributes simplify code but are currently Chrome-only (requires polyfills for cross-browser)
- Built-in commands reduce JavaScript but limit customization compared to full programmatic control

**Link:** [The command and commandfor Attributes](https://developer.chrome.com/blog/command-and-commandfor)

---

## Tools & Resources Roundup

### Tail Lens - Chrome Extension for Tailwind CSS

A Chrome extension that brings visual Tailwind CSS editing directly into your browser. Inspect elements, see class alternatives, search any Tailwind class with live preview, and apply changes with a single click. Notably, it supports custom `tailwind.config.js` including themes and breakpoints, and works with both Tailwind v3 and v4 (including v4's new CSS-based configuration). At $29 for a lifetime license, it's positioned as a productivity tool for developers who iterate heavily on UI.

**Link:** [Tail Lens](https://www.taillens.io/)

### TailwindSQL - A Satirical Take on Utility Classes

Someone created TailwindSQL, a satirical project that applies Tailwind's utility-class philosophy to SQL queries. Write `className="db-users-name-where-id-1"` and get back database results. It's a React Server Component, supports SQLite, and is somehow type-safe. Whether this is genius or an abomination depends entirely on your sense of humor about where utility classes should and shouldn't go.

**Link:** [TailwindSQL](https://tailwindsql.xyz/)

### Heynote - A Scratchpad for Developers

Heynote is a persistent text buffer divided into blocks—each block can have its own language for syntax highlighting and auto-formatting. It's the perfect place for that Slack message you don't want to accidentally send, a JSON response you're debugging, meeting notes, or quick calculations (Math blocks act as calculator scratchpads with variable and unit support). Multiple buffers, inline images, and file-based storage make it a genuine daily-driver scratchpad.

**Link:** [Heynote](https://heynote.com/)

### Hopp - Open Source Remote Pair Programming

Hopp positions itself as the pair programming tool that Slack Huddles and Google Meet should have been. Built specifically for developers, it offers full keyboard and mouse control for both participants, crystal-clear screen sharing (they fine-tuned libwebrtc for low latency), and support for up to 10 participants. It's open source, self-hostable, and offers free licenses for OSS contributors.

**Link:** [Hopp](https://www.gethopp.app/)

### Leonardo Trapani - Developer Portfolio

A clean, Tailwind-styled portfolio from a 19-year-old developer who's already shipped products with real users: Rediredge (a self-hostable domain redirector), Hyprvoice (voice-powered typing for Linux with 1k+ users), and Nutrivetpet (a pet nutrition platform with 3k+ paying users). Worth bookmarking as an example of how to present technical work effectively.

**Link:** [Leonardo Trapani](https://leotrapani.com/)

---

*This newsletter summary is provided for informational purposes. Always verify claims and conduct your own research before making technology decisions.*
