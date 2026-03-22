---
title: "Tailwind Weekly #209: z-index Chaos, CSS Alignment Mastery, and Error.isError() in JavaScript"
excerpt: "This week: tackling z-index chaos with token systems, deep-diving into CSS alignment fundamentals across Grid, Flexbox and Block layouts, and learning why Error.isError() beats instanceof for reliable error checking."
publishedAt: "2026-03-21"
slug: "tailwind-weekly-209-zindex-alignment-error-iserror"
hashtags: "#tailwind #css #javascript #frontend #webdev #zindex #alignment #error-handling #generated #en"
---

## The Value of z-index: Stop the Arms Race

**TLDR:** If your codebase has z-index values like 10001 or 9999 scattered everywhere, you have a systemic problem. The solution is surprisingly simple — tokenize your z-index values using CSS custom properties.

You know the drill. You join a new project, open the CSS, and find a battlefield of z-index values that look like lottery numbers. Someone picked 999, so the next dev went with 1000, and eventually someone landed on 10001 just to be safe. The article from CSS-Tricks nails this problem perfectly — it is not a technical issue, it is a visibility problem. In large teams, nobody knows what is already floating on the screen. There might be a toast from Team A, a cookie banner from Team B, and a modal from some marketing SDK. So every developer reaches for the nuclear option: the biggest number they can think of.

The fix is elegant. You define a small set of CSS custom properties at the root level — something like a base layer at zero, toasts at one hundred, popups at two hundred, and overlays at three hundred. Now every z-index in your project references one of these tokens. When you need to add a new layer, say a sidebar that sits between the base content and toasts, you just insert a new token and adjust the scale. No hunting through dozens of files. No guessing.

What I particularly like is the approach to internal layers. Inside a popup that has z-index 300, the actual value does not matter much because the popup creates its own stacking context. So instead of carrying around those big global numbers, you use local tokens like z-top and z-bottom for positioning within components. And using calc to keep related elements tethered together — like an overlay background that always sits one step behind its overlay — is a genuinely clever pattern. The article also points out that negative z-index values are not scary when used within a stacking context. They are perfect for decorative elements that should sit behind the main content of a component.

The author even built a Stylelint and ESLint plugin to enforce this system automatically. That is the kind of thinking that separates a quick fix from a real architectural improvement.

**Key takeaways:**
- Tokenize all z-index values using CSS custom properties instead of magic numbers
- Use local tokens (like z-top, z-bottom) for internal component layering within stacking contexts
- Use calc to maintain relative positioning between related elements
- Enforce the system with linting rules to prevent regression

**Why do I care:** As someone who has debugged enough z-index nightmares across large-scale applications, this article resonates deeply. The tokenization approach is exactly what mature design systems do, and the enforcement tooling makes it practical rather than aspirational. If you are working on a team of more than two developers, you need this yesterday.

**Link:** [The Value of z-index](https://css-tricks.com/the-value-of-z-index/)

## The Fundamentals of CSS Alignment: Finally, Clarity

**TLDR:** CSS alignment has about 10 properties and they behave differently in Grid, Flexbox, and Block layouts. This interactive guide breaks down exactly how content-level and item-level alignment work in each context.

This one is a deep dive, and I mean deep. The article from CSS-Tip tackles one of the most confusing areas of CSS: alignment. We all know the feeling — you try justify-content, then align-items, then you flip to align-content, and eventually you just start throwing combinations at the wall until something sticks. This article explains why that confusion exists and how to think about it systematically.

The key insight is that CSS has two levels of alignment: content level and item level. Content level aligns the grid cells or flex lines inside the container as a group. Item level aligns individual elements within their cells or lines. The reason alignment feels so different across layouts is that Grid always has both levels, Flexbox sometimes has both depending on the axis and wrapping configuration, and Block layout has only one level per axis.

The Flexbox section is where things get really interesting. In a row direction, justify-content aligns flex items horizontally as a group, but justify-self is completely ignored because individual items on a flex line are not independent. Vertically, you get item-level alignment with align-self, but align-content only works when flex-wrap is set to wrap. Without wrapping, there is just one flex line that fills all the vertical space, so there is nothing to align. That single fact — that align-content does nothing without flex-wrap — probably explains half the alignment bugs I have seen in production code.

The article also covers auto margins versus alignment properties, absolutely positioned elements, and a concept called safe alignment that prevents content from becoming unreachable when it overflows. The interactive demos make all of this tangible, which is exactly what CSS education needs.

**Key takeaways:**
- Content level alignment (place-content) aligns grid cells or flex lines as a group inside the container
- Item level alignment (place-self) aligns individual elements within their cells or lines
- flex-wrap: wrap is required for align-content to work in Flexbox
- fr units consume all free space, disabling content-level alignment in that axis
- Safe alignment prevents unreachable content when items overflow with scrollbars

**Why do I care:** If you write CSS professionally, understanding alignment at this level is not optional — it is foundational. The mental model of content versus item level alignment, and knowing exactly which properties are active in which layout contexts, will save you hours of trial and error. Bookmark this one.

**Link:** [The Fundamentals of CSS Alignment](https://css-tip.com/explore/alignment/)

## Error.isError(): A Better Way to Check Error Types in JavaScript

**TLDR:** The new Error.isError() static method fixes two major issues with instanceof Error: cross-realm errors from iframes or modules, and fake errors that manipulate the prototype chain. It uses an internal marker instead of prototype checking.

Here is a JavaScript API improvement that does not get enough attention. The traditional way to check if a value is an Error in JavaScript has been using instanceof, and it has been subtly broken in two important ways for years.

The first issue is cross-realm errors. Every JavaScript realm — an iframe, a web worker, a VM module — has its own set of global constructors. An Error created inside an iframe is an instance of that iframe's Error constructor, not the parent window's Error constructor. So instanceof Error returns false for errors that are clearly errors. This can silently break error handling in applications that use iframes or module federation.

The second issue is even sneakier. You can create a plain object that passes the instanceof Error check by simply setting Error.prototype in its prototype chain. It looks like an error, instanceof says it is an error, but it has none of the actual error characteristics. Error.isError() handles both cases by checking for an internal marker that gets attached to genuine Error objects at creation time — think of it as checking for a manufacturer's watermark rather than just reading the label.

The method is supported in Chrome, Edge, and Firefox, but not yet in Safari. So you will want a fallback or polyfill for production use today. But the direction is clear — this is the right way to check for errors, and instanceof will eventually be considered the legacy approach.

**Key takeaways:**
- instanceof Error fails for errors from iframes, workers, and different realms
- Objects with Error.prototype in their chain can fake being errors
- Error.isError() uses an internal marker for reliable identification
- Not yet supported in Safari — check browser compatibility before relying on it

**Why do I care:** Cross-realm error handling is one of those problems that bites you in production when you least expect it. If you are building anything with iframes, micro-frontends, or module federation, switching to Error.isError() will save you from silent error handling failures. The API is simple, the behavior is correct, and it is the kind of boring-but-important improvement that makes JavaScript better.

**Link:** [Error.isError(): A Better Way to Check Error Types in JavaScript](https://www.trevorlasn.com/blog/error-iserror-javascript)