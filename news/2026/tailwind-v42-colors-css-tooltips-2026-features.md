---
title: "Tailwind CSS v4.2 Color Palettes, CSS-Only Tooltips, and the Future of CSS in 2026"
excerpt: "New neutral color palettes land in Tailwind v4.2, anchor positioning makes JavaScript-free tooltips a reality, and ten CSS features are reshaping frontend development."
publishedAt: "2026-03-07"
slug: "tailwind-v42-colors-css-tooltips-2026-features"
hashtags: "#tailwind #css #frontend #webdev #ui #generated #en"
---

## The Four New Color Palettes in Tailwind CSS v4.2

**TLDR:** Tailwind CSS v4.2 ships four new neutral-ish color palettes -- mauve, olive, mist, and taupe -- all defined in oklch. They fill the gap between bold primaries and flat grays, giving you subtle, earthy tones for more refined UI work.

Chris Brandrick wrote a solid breakdown of these new additions, and honestly, it is about time. If you have ever built a dashboard or a content-heavy app and found yourself stuck between "too colorful" and "boring gray," these palettes are your answer.

Mauve brings a subtle violet-pink undertone, anchored around 322-326 degrees on the hue wheel. It is the most purple-adjacent of the four and works beautifully for interfaces that need warmth without screaming for attention. Olive leans into yellow-green territory at about 106-107 degrees -- think military meets nature, as Brandrick puts it. Mist sits in the cooler blue-teal range, drifting from 197 to 229 degrees through the scale, making it perfect for professional or coastal-feeling designs. And taupe rounds things out with a warm brownish-gray that feels classic and grounded.

Now here is the interesting technical detail that often gets glossed over: all four palettes are defined in oklch, just like every other Tailwind color. The key advantage is that lightness steps feel visually even as you move through the scale. The chroma across all four peaks around 0.031-0.034, which is barely above zero. That is what keeps them firmly in neutral territory despite having a distinct hue. This is not a random choice -- it is a deliberate design decision rooted in perceptual uniformity. Evil Martians published an excellent piece on why oklch makes color feel "predictable, expressive, and safe to use."

What the article does not really dig into, and I wish it had, is the practical migration story. If you are already using slate or zinc throughout a large codebase, what is the decision framework for switching? When do you pick mist over slate? The visual examples with cards, badges, buttons, and typography help, but a side-by-side comparison with the existing neutrals would have been the cherry on top.

Each palette ships with the full ramp from 50 to 950, complete with hex and oklch values. They are ready to use today if you are on v4.2.

**Key takeaways:**
- Four new palettes: mauve (violet-gray), olive (yellow-green), mist (blue-teal), taupe (brownish-gray)
- All defined in oklch for perceptually uniform lightness steps
- Chroma values are intentionally low (0.031-0.034), keeping them neutral with just a hint of personality
- Full color ramps from 50 to 950 are available immediately in v4.2
- These complement existing neutrals like slate and zinc rather than replacing them

**Link:** [The Four New Color Palettes added to Tailwind CSS v4.2](https://superhighway.dev/tailwind-v4-2-new-palettes)

## Perfectly Pointed Tooltips with Pure CSS

**TLDR:** Temani Afif demonstrates how to build fully repositioning tooltips using nothing but CSS and the Anchor Positioning API. No JavaScript for positioning, barely 20 declarations total, and the tooltip flips, shifts, and moves its tail automatically.

This one is genuinely impressive. Temani Afif over at Frontend Masters walked through building tooltips that automatically reposition themselves -- flipping from top to bottom, shifting left and right to avoid overflow, and even moving the little arrow tail to follow the anchor -- all with pure CSS. Zero JavaScript for positioning logic.

The foundation is the Anchor Positioning API, which is still relatively new (Chrome and Edge only at the time of writing, which is worth noting). You start by naming an anchor with `anchor-name`, linking a tooltip to it with `position-anchor`, and placing it with `position-area`. Three properties and you have basic positioning. But the real magic is in how the browser handles overflow.

Using `position-try-fallbacks: flip-block`, you tell the browser to mirror the tooltip position across the vertical axis when it would overflow its containing block. And here is the clever part: when it flips, it does not just change position-area -- it also flips your margins, offsets, everything. So if you defined a gap at the bottom for the arrow tail, that gap automatically moves to the top when the tooltip flips. The browser handles this symmetry for you.

The tail implementation is where things get genuinely tricky, and Afif does not shy away from the complexity. The pseudo-element creating the tail needs to reference both the tooltip (for vertical positioning) and the anchor (for horizontal centering). But here is the catch: because the tooltip is absolutely positioned, it becomes the containing block for its pseudo-element, which prevents the pseudo-element from seeing external anchors. The workaround is to set the pseudo-element to `position: fixed` and make the tooltip itself an anchor too. Two anchors, one pseudo-element, and suddenly everything works.

What I appreciate about this article is the honesty about limitations. Anchor Positioning has some genuinely confusing containing block rules -- Afif even links to a separate post titled "Why is Anchor Positioning not working?" because the edge cases are that common. The comparison to z-index and stacking context complexity is apt and should give you a sense of what you are getting into.

The elephant in the room, though, is browser support. Chrome and Edge only is a hard sell for production use today. This is absolutely the future, but if you need to ship something cross-browser right now, you are still reaching for Floating UI or Popper. That said, learning this API now puts you ahead of the curve.

**Key takeaways:**
- The CSS Anchor Positioning API enables JavaScript-free tooltip positioning
- `position-try-fallbacks: flip-block` handles automatic repositioning on overflow
- The entire tooltip including dynamic tail requires roughly 20 CSS declarations
- Browser support is currently limited to Chrome and Edge
- Containing block rules create surprising gotchas -- pseudo-elements may need `position: fixed` to reference external anchors
- This is part one of a three-part series covering all positioning scenarios

**Tradeoffs:** Pure CSS tooltips eliminate JavaScript positioning overhead and bundle size, but you trade browser compatibility. The Anchor Positioning API has genuinely confusing containing block interactions that can make debugging harder than the equivalent JavaScript solution. For production apps needing cross-browser support today, JavaScript libraries remain the pragmatic choice.

**Link:** [Perfectly Pointed Tooltips: A Foundation](https://frontendmasters.com/blog/perfectly-pointed-tooltips-a-foundation/)

## 10 CSS Features Coming in 2026

**TLDR:** A roundup of ten CSS features that are either shipping now or arriving soon, including squircles, styleable select elements, scroll markers, container scroll state queries, inline if(), and custom CSS functions via @function.

The newsletter highlighted a rundown of CSS features landing in 2026, and honestly, several of these are going to fundamentally change how we build interfaces. Let me hit the ones that matter most.

Squircles are finally coming to the web. If you have ever wondered why Apple's icons look so much smoother than a simple `border-radius`, this is why -- squircles use a continuous curvature that avoids the abrupt transition between flat and curved edges. The new `shape()` function takes this further, essentially giving you `path()` on steroids with responsive units and better ergonomics.

Styleable `<select>` elements might be the single most impactful change. For years we have been wrapping selects in custom divs, hiding the native element, and rebuilding everything from scratch. The amount of JavaScript and accessibility work that goes into a custom dropdown is staggering. Native styling support eliminates entire categories of third-party dependencies.

Scroll markers and scroll buttons enable JavaScript-free carousels. Let that sink in. One of the most common reasons teams reach for a carousel library is the prev/next navigation and indicator dots. CSS is absorbing that capability natively. Container scroll state queries extend this further by letting you style elements based on whether a scroll container has reached its start, end, or is somewhere in the middle.

The `sibling-index()` function enables staggered animations without JavaScript, which is a small thing that eliminates a surprisingly common pattern of assigning inline styles or classes with incrementing animation delays.

And then there are the two big architectural ones: `if()` conditionals and `@function`. Inline `if()` lets you make decisions directly in your CSS values. And `@function` lets you define reusable CSS functions, which is essentially bringing programming constructs into the style layer. These two together could reduce the need for preprocessors significantly.

What is missing from these discussions, though, is the migration story. How do you progressively adopt these features? What does your fallback strategy look like for a feature like styleable selects where the old approach is fundamentally different? These are the questions teams will actually face.

**Key takeaways:**
- Squircles and `shape()` bring smooth, continuous curvature to web elements
- Native styleable `<select>` elements will eliminate entire categories of custom dropdown libraries
- Scroll markers and buttons enable JavaScript-free carousel navigation
- `sibling-index()` removes the need for JavaScript-assigned staggered animation delays
- `if()` conditionals and `@function` bring real programming constructs to CSS
- Progressive enhancement strategies will be critical during the adoption period

**Link:** [Tailwind Weekly #207](https://tailwindweekly.com/issue-207/)

## ui.sh Invites Are Rolling Out

**TLDR:** Adam Wathan has started sending invites to the ui.sh waitlist. If you signed up, check your inbox. If you did not, now is the time.

The newsletter opens with news that ui.sh invites are going out. For those unfamiliar, ui.sh is the next big thing from the Tailwind CSS team, and the anticipation has been building for months. Details are still sparse since the product is in early access, but given Adam Wathan's track record with Tailwind CSS and Tailwind UI, this is worth paying attention to.

What is interesting here is the timing. With Tailwind CSS v4.2 shipping new features and ui.sh entering early access simultaneously, the Tailwind ecosystem is clearly accelerating. The fact that Apple featured Tailwind CSS code on the new MacBook Pro landing page -- yes, really -- suggests the framework has crossed from "popular tool" to "industry standard" territory.

The newsletter does not reveal much about what ui.sh actually does, which is both frustrating and smart marketing. But if the waitlist approach and gradual rollout are any indication, they are being deliberate about the launch rather than rushing it out.

**Key takeaways:**
- ui.sh invites are actively being sent to waitlist subscribers
- Apple featured Tailwind CSS code on the new MacBook Pro landing page
- The Tailwind ecosystem is expanding with both framework updates and new tooling
- Early access means limited information, but the pedigree suggests it will be significant

**Link:** [ui.sh](https://ui.sh/)

## Basecoat: shadcn/ui for Every Web Stack

**TLDR:** Basecoat is a component library that brings the shadcn/ui experience beyond React, built entirely with Tailwind CSS so it works with plain HTML, Laravel, Django, Rails, or any framework.

This is a gap that has needed filling for a while. If you have worked with shadcn/ui, you know how good that developer experience is -- copy-paste components, full ownership of the code, beautiful defaults. But it has been locked to the React ecosystem. Basecoat breaks that constraint by building everything purely with Tailwind CSS.

The library ships with over 40 components, from the basics like buttons and inputs up to more complex elements like comboboxes, sidebars, and command palettes. The theming system works out of the box with presets, including -- and I have to mention this -- a Doom 64 theme, which tells you the maintainers have a sense of humor.

The real value proposition here is for teams running Laravel, Django, Rails, or even static HTML. These stacks have historically been underserved by the modern component library ecosystem, which tends to assume you are running React or at least a JavaScript framework. Basecoat says you do not need a JavaScript runtime to have beautiful, consistent components.

What I would want to know more about is the JavaScript story for interactive components. Comboboxes and command palettes inherently need JavaScript behavior. How does Basecoat handle that in a framework-agnostic way? Is it Alpine.js under the hood? Vanilla JS? The architecture choices there will determine whether this is truly universal or just "works with most stacks."

**Key takeaways:**
- Brings shadcn/ui-style component experience to non-React stacks
- 40+ components built entirely with Tailwind CSS
- Works with plain HTML, Laravel, Django, Rails, and more
- Includes theming with presets out of the box
- Fills a genuine gap for server-rendered framework ecosystems

**Link:** [Basecoat](https://basecoatui.com/)

## Slowmo: Debug Animations by Controlling Time

**TLDR:** Slowmo is a tiny JavaScript utility that lets you slow down, pause, or speed up time for animations and web content, making it dead simple to debug and tweak motion.

This is one of those tools where you wonder why it did not exist sooner. Slowmo gives you a simple API to control the speed of time on any web page. Call `slowmo(0.5)` and everything runs at half speed. Call `slowmo(0)` and everything pauses. It works with CSS animations, requestAnimationFrame loops, the Web Animations API, and even HTML5 video.

For anyone who has tried to debug a subtle easing issue or fine-tune a staggered animation sequence, the value is immediately obvious. You no longer need to change duration values, reload, squint at the screen, and repeat. Just slow everything down, see exactly what is happening, and adjust.

The API is minimal and sensible: `slowmo.pause()`, `slowmo.play()`, `slowmo.reset()`, `slowmo.getSpeed()`. It is inspired by the "agentation" concept from Benji Taylor, which is a nice acknowledgment of prior art.

The thing the page does not address is how it hooks into the various timing mechanisms. Overriding `requestAnimationFrame` is straightforward, but intercepting CSS animations and the Web Animations API at the JavaScript level implies some clever monkey-patching. Understanding the implementation would help you know when it might interfere with your application's own timing logic.

**Key takeaways:**
- Simple one-line API to control animation speed across your entire page
- Works with CSS animations, requestAnimationFrame, Web Animations API, and video
- Essential debugging tool for motion-heavy interfaces
- Minimal footprint with a clean, predictable API

**Link:** [Slowmo](https://slowmo.dev/)
