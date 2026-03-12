---
title: "Focusgroup Lands in Browsers, Eleventy Becomes Build Awesome, and CSS Gets Random Values"
excerpt: "A packed week in frontend: the focusgroup HTML attribute ships for testing, Eleventy rebrands under Font Awesome's umbrella, CSS random functions arrive, Chrome 146 brings scroll-triggered animations, and Video.js v10 delivers an 88% smaller bundle."
publishedAt: "2026-03-11"
slug: "focusgroup-lands-eleventy-build-awesome-css-random-values"
hashtags: "#frontend-focus #css #html #accessibility #javascript #performance #animation #web-components #generated #en"
---

## The Focusgroup HTML Attribute Arrives for Testing

**TLDR:** Microsoft and Google have shipped the `focusgroup` HTML attribute in Chromium browsers, letting developers replace hundreds of lines of roving-tabindex JavaScript with a single HTML attribute for keyboard navigation in toolbars, menus, tabs, and other composite widgets.

If you have ever built a toolbar, a tab list, or a dropdown menu and tried to make it keyboard-accessible, you know the pain. You end up managing tabindex values, listening for arrow keys, handling right-to-left text directions, remembering which element was last focused, skipping over disabled items, and probably pulling in a JavaScript library to do it all. Every major UI framework ships its own version of this logic. React has one. Angular CDK has one. Fluent UI has one. It is an absurd amount of duplicated effort for something that really should be a platform primitive.

Well, now it is becoming one. The `focusgroup` attribute has been years in the making, originating from Microsoft in 2021, maturing through the OpenUI community group, and now shipping for early testing in Edge and other Chromium-based browsers. The concept is wonderfully simple: you add a `focusgroup` attribute to a container element with a behavior token like "toolbar", "tablist", "menu", or "radiogroup", and the browser handles arrow key navigation for you. No JavaScript for moving focus. No manual tabindex management. The browser even infers the correct ARIA roles automatically.

What makes this genuinely exciting is the depth of thought that has gone into it. The attribute supports axis restriction with inline and block modifiers, so a horizontal toolbar only responds to left and right arrows while a vertical menu only responds to up and down. It has wrap-around navigation, last-focused memory that restores your position when you tab back in, a `focusgroupstart` attribute for controlling the entry point, and it works across shadow DOM boundaries. There is even integration with the CSS `reading-flow` property so arrow navigation follows visual order rather than DOM order.

For architects and team leads, this is one of those platform features that could meaningfully reduce your accessibility code footprint. If your design system ships its own focus management utilities, keep an eye on browser support for `focusgroup` and plan for a future where those utilities become thin wrappers or go away entirely. The one thing the article does not address head-on is the elephant in the room: this is Chromium-only right now. Firefox and Safari adoption timelines are unclear, and until we get cross-browser support, you will still need that JavaScript fallback. Feature detection is straightforward though, so progressive enhancement is very much on the table.

**Key takeaways:**
- A single `focusgroup` HTML attribute replaces hundreds of lines of roving-tabindex JavaScript
- Supports toolbar, tablist, menu, menubar, radiogroup, and listbox patterns out of the box
- Handles arrow key navigation, last-focused memory, disabled element skipping, and writing direction automatically
- Currently available behind a flag in Chromium browsers with an origin trial option
- Browser automatically infers correct ARIA roles from the behavior token

**Tradeoffs:**
- Gain massive reduction in keyboard navigation code but sacrifice cross-browser support until Firefox and Safari implement the feature
- Declarative simplicity means less control over edge-case keyboard behaviors compared to fully custom JavaScript implementations

**Link:** [Making keyboard navigation effortless](https://blogs.windows.com/msedgedev/2026/03/05/making-keyboard-navigation-effortless/)

## CSS Animations as State Machines for Remembering Focus and Hover

**TLDR:** Patrick Brosset discovered that CSS animations can be used as state machines by pausing them initially and playing them on focus or hover, combined with `animation-fill-mode: forwards` to permanently retain the end state even after the trigger condition is removed.

This is one of those techniques that makes you say "wait, that is so obvious, why did I never think of that?" The trick exploits a fundamental characteristic of CSS animations: they have a play state and a fill mode. If you set an animation to paused by default, it sits there waiting. When you switch `animation-play-state` to running on focus or hover, the animation executes. And because you have set `animation-fill-mode: forwards`, the element stays in its final animated state permanently, even after losing focus.

The animation itself can be nearly instantaneous, just a few microseconds, effectively acting as a state toggle. You define a keyframes animation that changes any property you want, say from red background to blue, and the element remembers that it was focused. Each element with this class tracks its own state independently, which is elegant. Where it gets really powerful is when you combine it with CSS container style queries. You can animate a custom property like `--was-focused` from "false" to "true", and then use `@container style(--was-focused: true)` to conditionally style descendant elements. That is essentially an if-statement in CSS, driven by user interaction history, with zero JavaScript.

For teams building interactive components, this technique is worth filing away for specific use cases like progressive form validation indicators, first-interaction visual feedback, or any scenario where you need CSS to "remember" that something happened. The limitation that the author does not dwell on is that this is a one-way door. Once the animation fires, there is no CSS-only way to reset it without some creative workaround. It is a state machine with two states and one transition.

**Key takeaways:**
- CSS animations can function as state machines using `animation-play-state` and `animation-fill-mode: forwards`
- The technique works for both `:focus` and `:hover` pseudo-classes
- Combined with container style queries, it creates CSS-only conditional logic based on interaction history
- Each element independently tracks its own state
- Works with any animatable property including custom properties

**Link:** [Using CSS animations as state machines to remember focus and hover states with CSS only](https://patrickbrosset.com/articles/2026-03-09-using-css-animations-as-state-machines-to-remember-focus-and-hover-states-with-css-only/)

## Eleventy Rebrands to Build Awesome (and Not Everyone Is Thrilled)

**TLDR:** Eleventy, the beloved static site generator, is rebranding to "Build Awesome" under Font Awesome's umbrella, complete with a Kickstarter campaign that had to be paused due to Gmail deliverability issues that tanked their launch momentum.

This story has layers. When Eleventy joined Font Awesome back in September 2024, the writing was on the wall for some kind of deeper integration. Now it is official: Eleventy v4 will ship as Build Awesome v4. Zach Leatherman is still at the helm, the project remains open source, existing plugins will stay compatible, and even your build commands will continue to work. The business model follows the "Awesome" playbook: a free open source core with a Pro tier that funds development. Font Awesome Pro did not kill Font Awesome free, and Web Awesome Pro did not kill Web Awesome free, so the track record here is solid.

But then the Kickstarter launch happened, and it was a rough week. The campaign hit its funding goal on day one, which sounds great. Then it went quiet. The culprit was Gmail: their launch emails reached maybe five to ten percent of recipients. Kickstarter campaigns live and die by first-48-hour momentum, and theirs evaporated before most people even knew it existed. They made the tough call to cancel and plan a relaunch once their email infrastructure is sorted out.

The community reaction has been mixed. Some developers are enthusiastic about the sustainability model and the resources Font Awesome can bring to the project. Others are less thrilled about the name change and the commercial direction. A few blog posts popped up this week with titles like "The End of Eleventy" and "Au revoir, Eleventy", which are perhaps more dramatic than the situation warrants but reflect a genuine sentiment in the community. The thing nobody is really saying out loud is that static site generators are in a brutally competitive space right now, and Eleventy needs sustained investment to stay relevant against Astro, Next.js, and others. Whether "Build Awesome" is the right vehicle for that investment is the real question.

**Key takeaways:**
- Eleventy is rebranding to Build Awesome under the Font Awesome umbrella, following the same model as Web Awesome
- The open source project remains free, with a Pro tier funding development
- Full backward compatibility with existing Eleventy plugins and build commands is promised
- The Kickstarter campaign was paused due to Gmail deliverability issues that killed launch momentum
- Community reaction is divided between those who welcome the sustainability model and those who mourn the independent identity

**Link:** [Eleventy is now Build Awesome](https://www.11ty.dev/blog/build-awesome/)

## Chrome 146: Scroll-Triggered Animations, Scoped Registries, and the Sanitizer API

**TLDR:** Chrome 146 ships three significant features: declarative scroll-triggered animations in CSS, scoped custom element registries that solve naming conflicts, and an updated Sanitizer API for building XSS-free applications.

Chrome 146 is one of those releases where every headline feature actually matters for day-to-day frontend work. Scroll-triggered animations let you declaratively tie animation playback to scroll position using CSS alone. If you have ever wired up an Intersection Observer just to fade in elements as they scroll into view, this is the platform catching up to what JavaScript libraries have been doing for years. The common pattern of "start this animation when this element scrolls into view" can now be expressed without a single line of JavaScript.

Scoped custom element registries address a real pain point for anyone using web components at scale. Previously, custom element names were global, meaning if two libraries both tried to register a component with the same tag name, one of them would fail. Scoped registries let multiple definitions for the same tag name coexist by associating them with specific tree scopes. This is particularly relevant for micro-frontend architectures and any application that pulls in web components from multiple third-party sources.

The Sanitizer API is the sleeper hit of this release. Building applications that accept user-supplied HTML without opening yourself up to cross-site scripting attacks has always required either a third-party library or a lot of careful manual work. The browser-native Sanitizer API provides a standardized way to strip potentially dangerous content, and the fact that Firefox also supports this version signals genuine cross-browser momentum. For teams and architects, this is worth prioritizing in your security review process. A platform-native sanitizer that stays updated with new attack vectors is fundamentally more reliable than a library you have to remember to update.

**Key takeaways:**
- Scroll-triggered animations enable declarative, CSS-based control of animations tied to scroll position
- Scoped custom element registries prevent naming conflicts when multiple libraries define the same custom element tag
- The Sanitizer API provides browser-native HTML sanitization for XSS prevention, also supported in Firefox
- All three features reduce the need for JavaScript libraries that previously filled these gaps

**Link:** [New in Chrome 146](https://developer.chrome.com/blog/new-in-chrome-146?hl=en)

## The z-index Arms Race and Why Tokenization Is the Answer

**TLDR:** An article on CSS-Tricks makes the case that z-index values in large projects inevitably devolve into an arms race of magic numbers, and that the solution is a systematic tokenization approach using CSS custom properties and disciplined layering rules.

Anyone who has worked on a codebase with multiple teams has seen the line `z-index: 10001` in a pull request. The author nails the root cause: it is not a technical problem, it is a visibility problem. Developers cannot see what else is floating on the screen, so they pick a big number and hope it wins. This is how you end up with a stylesheet where z-index values are a chaotic collection of guesses made in isolation.

The proposed solution is refreshingly simple. Define a set of z-index tokens as CSS custom properties on the root element: base at 0, sidebar at 100, toast at 200, popup at 300, overlay at 400. When requirements change and you need to insert a new layer, you adjust the token values in one place. Use `calc()` to bind related elements together, like making an overlay background always sit exactly one step behind its overlay. For internal component layering, introduce local tokens like `--z-top` and `--z-bottom` that work within a component's own stacking context, keeping them completely separate from the global layer system.

What I appreciate about this article is that it goes beyond the theory and addresses enforcement. A token system only works if everyone uses it. The author built a library called z-index-token-enforcer that provides a Stylelint plugin, an ESLint plugin for CSS-in-JS, and a CLI scanner for CI/CD pipelines. That is the kind of practical tooling that turns a "good idea" into an actual standard. For architects, the key insight is that `isolation: isolate` on component containers is your friend here, as it creates a local stacking context that contains z-index values within the component. Think in layers, not in numbers.

**Key takeaways:**
- Define z-index values as CSS custom properties (tokens) on the root, with meaningful semantic names
- Use `calc()` to bind related layers together, like overlay backgrounds always being one step below their overlay
- Use local tokens (`--z-top`, `--z-bottom`) for within-component stacking, separate from global layers
- Create local stacking contexts with `isolation: isolate` on component containers
- Enforce the system with automated linting tools to prevent developers from introducing magic numbers

**Tradeoffs:**
- Gain systematic, maintainable layering but sacrifice the quick convenience of dropping in an arbitrary z-index value
- Tokenization adds upfront design effort but eliminates the ongoing debugging cost of magic number conflicts

**Link:** [The Value of z-index](https://css-tricks.com/the-value-of-z-index/)

## How Fast Is Fast Enough: Rethinking Web Performance in Pragmagical Terms

**TLDR:** Tammy Everts argues that the industry's focus on Core Web Vitals thresholds has inadvertently lowered our ambitions, and that true performance excellence lives at the intersection of business pragmatism and the "magical" feeling of sub-100-millisecond interactions.

This article challenges a comfortable assumption that many of us have settled into: if you are green on Core Web Vitals, you are fast enough. Everts introduces the concept of "pragmagical" performance, the sweet spot where business pragmatism meets user delight. She cites examples of applications like Raycast and Superhuman that serve content in under 100 milliseconds. Users of these tools do not praise them for being fast. They praise them for being great, for being delightful, for being amazing. Speed at that level becomes invisible, and that invisibility is what makes it powerful.

The data she presents is compelling. In an 18-week experiment, users who experienced artificially throttled pages by just 500 to 1000 milliseconds converted less. That is expected. What was unexpected is that after throttling was removed, those users returned at lower rates for six more weeks. Slow experiences create lasting damage to trust and return behavior. She also analyzed individual sites and found that peak conversion rates occurred at INP thresholds of 50 to 150 milliseconds, well below Google's 200-millisecond "good" benchmark. For those sites, Google's threshold was leaving money on the table.

The part that really lands is the distinction between engagement tasks and productivity tasks. The same user on the same website has completely different speed tolerance depending on whether they are dreamily browsing vacation destinations or frantically rebooking a canceled flight. Metrics alone cannot capture that emotional shift, which is why pairing performance analytics with usability research matters so much. For teams setting performance budgets, the message is clear: do not optimize to someone else's threshold. Find your own performance plateau by correlating your RUM data with your business metrics, and then aim well beyond it.

**Key takeaways:**
- Google's Core Web Vitals thresholds are useful starting points but should not be your ceiling
- Slow experiences cause lasting damage to user trust and return behavior, even after performance is restored
- Peak conversion rates on individual sites often occur at thresholds significantly below Google's "good" benchmarks
- The same user has radically different speed tolerance for browsing versus task-completion scenarios
- Aim for experiences that feel instantaneous (sub-100ms) rather than merely acceptable

**Link:** [How fast is fast enough? Rethinking web performance in pragmagical terms](https://www.speedcurve.com/blog/fast/)

## The Big Gotcha of CSS Anchor Positioning

**TLDR:** Chris Coyier warns that CSS anchor positioning has a significant and under-discussed limitation: the anchor element must be fully laid out before the positioned element, meaning DOM order and positioning context matter far more than you might expect.

Here is a case where the marketing for a CSS feature has gotten slightly ahead of the reality. Anchor positioning has been promoted, sometimes by yours truly in the broader community, as a way to position elements relative to other elements "regardless of where they are in the DOM." That italic "regardless" is doing a lot of heavy lifting, and it turns out it is wrong. There are real constraints around DOM order and positioning context that can silently break your anchored elements.

The core rule is straightforward once you know it: the anchor element must be fully laid out before the element that is anchored to it. If they are siblings and the anchor has any position value other than static, the anchor must come first in the DOM. If they are in different positions in the DOM, you need to ensure they share the same containing block or that the anchor parent has static positioning. This creates a new class of CSS debugging problem that we have not really had before. You can write what looks like perfectly valid CSS, and the anchor positioning simply will not work, with no obvious error or warning.

James Stuckey Weber's simplified advice is pragmatic: make the anchor and the positioned element siblings, and put the anchor first. But as Chris points out, that kind of defeats the promise of anchor positioning being free from DOM order constraints. This is the kind of specification rough edge that is hopefully going to get smoothed out over time. For teams adopting anchor positioning today, document these constraints clearly in your component guidelines, and expect some developer confusion when things silently fail.

**Key takeaways:**
- CSS anchor positioning does NOT work regardless of DOM order, contrary to popular belief
- The anchor element must be fully laid out before the anchored element for positioning to work
- If anchor and positioned element are siblings with non-static positioning, the anchor must come first in DOM order
- Silent failures make debugging anchor positioning issues particularly frustrating
- Practical advice: keep anchor and positioned element as siblings with the anchor first

**Link:** [The Big Gotcha of Anchor Positioning](https://frontendmasters.com/blog/the-big-gotcha-of-anchor-positioning/)

## Video.js v10 Beta: An 88% Smaller Bundle from a Four-Player Merger

**TLDR:** Video.js v10 is a ground-up rewrite that merges the efforts of Video.js, Plyr, Vidstack, and Media Chrome into a single project, delivering an 88% reduction in default bundle size, first-class React and TypeScript support, and a compositional architecture designed for the AI-assisted development era.

This is a big deal for anyone working with web video. Four of the most popular open source video players have essentially joined forces. The combined projects represent over 75,000 GitHub stars and tens of billions of monthly video plays. The rewrite was not a cosmetic refresh; it is a fundamentally different architecture built around composition rather than monolithic controllers.

The bundle size story is the headline. The default Video.js v10 player is 97 KB minified, down from the previous version's much larger footprint. A React video player comes in at 62 KB, an audio player at 49 KB, and a background video at just 10.7 KB. The real innovation is SPF, their new Streaming Processor Framework, which is built from functional components that compose into purpose-built streaming engines. If you only need simple HLS playback, you do not ship code for DRM and server-side ads. A simple HLS use case with SPF clocks in at just 145 KB compared to nearly 700 KB for the previous version with its bundled engine.

The UI philosophy borrows from the best of the modern React ecosystem. Components are unstyled primitives inspired by Radix and Base UI. You can eject any skin and get real component source code in your framework, inspired by shadcn/ui. Sam Potts, the creator of Plyr, designed the new skins, which is a meaningful upgrade in visual polish. The project also ships with a preset system for common use cases like video, audio, and background video, so you start with the right player for your job rather than stripping down a generic one.

For architects evaluating video player options, the compositional approach here is genuinely forward-thinking. The fact that state, UI, and media are split into separate components that communicate through API contracts means you can swap out pieces without touching others. The explicit design for AI-assisted development, with llms.txt files, markdown-served docs, and AI skills in the repo, signals where the maintainers think developer tooling is heading.

**Key takeaways:**
- Video.js v10 merges efforts from Video.js, Plyr, Vidstack, and Media Chrome into one project
- Default bundle size reduced by 88%, with a React video player at just 62 KB minified
- SPF (Streaming Processor Framework) enables purpose-built streaming engines that only include what you need
- UI primitives are unstyled and composable, with ejectable skins inspired by shadcn/ui
- Explicit design considerations for AI-assisted development including llms.txt and markdown doc serving

**Tradeoffs:**
- Gain dramatically smaller bundles and deep customization but sacrifice the API stability of the previous mature version during the beta period
- Compositional architecture enables tree-shaking and flexibility but requires more assembly effort compared to a batteries-included monolithic player

**Link:** [Video.js v10 Beta: Hello, World (again)](https://videojs.org/blog/videojs-v10-beta-hello-world-again)

## Native Random Values Coming to CSS

**TLDR:** The CSS specification is adding `random()` and `random-item()` functions that generate random values natively in CSS, with sophisticated sharing and scoping options, currently supported in Safari 26.2 with other browsers to follow.

CSS has always been deterministic: same input, same output, every time. That fundamental characteristic is about to change. The new `random()` function returns a random value within a specified range, with an optional step parameter so you can constrain results to whole numbers or specific increments. `random-item()` picks a random value from a discrete list, perfect for properties like display or named colors that cannot be expressed as a range.

What elevates this from a novelty to a serious design tool is the sharing mechanism. By default, each `random()` call produces an independent result. But you can use a dashed identifier to share the same random base value across multiple properties on the same element, useful for creating random squares where width and height must match. The `element-shared` keyword shares values across elements but not across properties, and the `fixed` keyword creates globally shared random values. This level of control means you can create coordinated randomness: think generative art, varied card layouts, natural-looking scatter effects, all without touching JavaScript.

From an architectural standpoint, the author makes a good case that randomness belongs in the layout layer. If you are adding visual variety to card grids, avatar rotations, or decorative spacing, that is fundamentally a presentation concern. Handling it in CSS rather than JavaScript means it works without hydration, it does not need a framework, and it follows the principle of keeping layout logic in the layout language. The caveat is that browser support is extremely limited right now, with only Safari 26.2 implementing `random()` and no browser yet supporting `random-item()`. This is one to watch and experiment with, not one to ship in production.

**Key takeaways:**
- `random()` generates random values within a range, with optional step increments for whole numbers
- `random-item()` selects randomly from a discrete list of values, useful for non-numeric properties
- Sophisticated sharing options let you coordinate random values across properties, elements, or globally
- Currently only Safari 26.2 supports `random()`, with `random-item()` not yet supported in any browser
- Positions randomness as a presentation concern that belongs in CSS rather than JavaScript

**Link:** [Native Random Values in CSS](https://alvaromontoro.com/blog/68092/native-random-values-in-css)

## The Enforced Accessibility of the Geolocation Element

**TLDR:** Chrome ships a new `<geolocation>` HTML element that is essentially a button with enforced design, enforced accessibility, and enforced security constraints, some CSS properties are simply ignored, others are capped, and some will disable the button entirely if they reduce visibility.

This is unlike anything we have seen in HTML before. The `<geolocation>` element is a button that triggers a geolocation request, but it comes with extraordinary restrictions designed to prevent developers from tricking users into sharing their location. You cannot change its text or icon. They live in a user-agent shadow root with no part attributes for styling access. The element does offer automatic localization, so the button text changes language based on the `lang` attribute in that area of the DOM.

The CSS restrictions are where it gets truly strange. Properties like `translate`, `transform`, `opacity`, `filter`, and `clip-path` are simply ignored. Letter spacing is capped between -0.65px and 2.6px. Word spacing is capped between 0 and 6.5px. Font size works down to 13px but stops functioning below that while still rendering at sizes as small as 1px. And here is the wildest part: some CSS that renders successfully will disable the button. Setting `color: orange` on a white background does not produce a warning or an error. The button renders, you can see it, you can click it, but it will not fire location events because the contrast is insufficient.

For teams building location-aware features, this element solves a genuine problem: it provides a clean way to recover from a denied-permission state, something that was previously impossible with the JavaScript Geolocation API. But the CSS behavior is going to confuse developers. The "issues" panel in Chrome DevTools will flag problems, but there is no console error and the element does not present itself as disabled in the accessibility tree. This is a fascinating experiment in the browser enforcing accessibility and security through CSS restrictions, and it will be interesting to see if this pattern extends to other sensitive APIs.

**Key takeaways:**
- The `<geolocation>` element is a button with enforced text, icon, and accessibility constraints
- Allows recovery from denied geolocation permissions, previously impossible with the JavaScript API
- Some CSS properties are silently ignored, others are capped to ranges, and some will disable the button if they reduce visibility
- Insufficient color contrast silently disables the button without any console error or disabled state in the accessibility tree
- Automatic localization changes button text based on the `lang` attribute

**Link:** [The Enforced Accessibility of the Geolocation Element](https://frontendmasters.com/blog/the-enforced-accessibility-of-the-geolocation-element/)

## Building Async Page Transitions in Vanilla JavaScript

**TLDR:** A detailed tutorial on building a lightweight single-page application router with crossfade page transitions using vanilla JavaScript, GSAP, and Vite, demonstrating the dual-container pattern where both pages coexist in the DOM during animation.

For anyone who has ever wondered what happens behind the scenes in libraries like Barba.js, this tutorial strips it down to the essentials. The core idea is elegant: instead of instantly swapping page content, you clone the page container, inject the new content into the clone, animate both containers simultaneously (old out, new in), and then remove the old one. During the transition, both pages genuinely coexist in the DOM.

The architecture is cleanly separated into a router that handles URL management and page loading, and a transition engine that handles the animation lifecycle. The router uses event delegation on the document for link clicks, lazy-loads page modules via dynamic imports, and manages a transition lock to prevent double-navigation. The transition engine clones the current container, sets the clone to `position: fixed` with a clip-path that hides it, and then animates the clip-path reveal while simultaneously translating the current page upward. The whole thing is maybe 200 lines of JavaScript.

What makes this valuable for teams is not just the tutorial itself but the pattern it teaches. The dual-container pattern with animation-then-cleanup is the foundation of every page transition library, and understanding it means you can debug those libraries effectively or build a custom solution tailored to your exact needs. The author acknowledges that a production implementation would need additional concerns like meta tag updates, prefetching, and abort handling, but the core mechanics are solid and extensible.

**Key takeaways:**
- The dual-container pattern keeps both old and new pages in the DOM during transitions for true crossfade effects
- Dynamic imports with lazy-loading ensure page modules are only fetched when navigated to
- A transition lock prevents race conditions from rapid clicking during animations
- Separating the router from the transition engine creates clean, extensible architecture
- The pattern underlies most page transition libraries and is worth understanding at the fundamental level

**Link:** [Building Async Page Transitions in Vanilla JavaScript](https://tympanus.net/codrops/2026/02/26/building-async-page-transitions-in-vanilla-javascript/)

## Improve Animation Performance with requestAnimationFrame

**TLDR:** A comprehensive guide to `requestAnimationFrame` explaining how it fits into the browser rendering pipeline, why it produces smoother animations than `setTimeout`, and how the rAF-then-setTimeout pattern can significantly improve Interaction to Next Paint scores.

If you are still using `setTimeout` for animations, this article makes a clear case for why you should stop. The fundamental difference is timing: `setTimeout` queues a task at the back of the task queue and fires whenever the browser gets around to it, which may not align with the display refresh rate. `requestAnimationFrame` runs its callback right before the next repaint, meaning your DOM updates happen at the optimal moment for the browser to batch style and layout work efficiently.

The real gem in this article is the rAF-then-setTimeout pattern for improving INP. When a user clicks a button and you need to do heavy work, wrapping it in `requestAnimationFrame(() => setTimeout(() => heavyWork()))` guarantees a paint between the interaction and the expensive logic. The rAF waits until the current frame is about to paint, the paint happens, and then setTimeout pushes the heavy work into the next frame. This means your visual response renders immediately while the expensive computation happens after. It is a simple pattern with a meaningful impact on perceived responsiveness.

The article also provides a useful comparison table of scheduling APIs: `requestAnimationFrame` for visual updates, `setTimeout` for basic deferral, `requestIdleCallback` for background work that may never run, `scheduler.yield` for breaking up heavy tasks with great developer experience, and `scheduler.postTask` for priority-based scheduling. For teams focused on Core Web Vitals, understanding where each of these APIs sits in the browser event loop is essential knowledge.

**Key takeaways:**
- `requestAnimationFrame` runs before paint, producing smoother animations than `setTimeout` which fires unpredictably
- The rAF-then-setTimeout pattern guarantees a paint between user interaction and heavy computation, improving INP
- `requestAnimationFrame` automatically pauses in background tabs, saving resources
- Use time-based animation deltas rather than frame-counting for consistent motion across different refresh rates
- Consider `scheduler.yield` for non-visual heavy tasks, though Safari support is lacking

**Link:** [Improve Animation Performance With requestAnimationFrame](https://www.debugbear.com/blog/requestanimationframe)

## Flappy Bird in Pure CSS: No JavaScript Allowed

**TLDR:** A developer built a fully functional Flappy Bird clone using only HTML and CSS, exploiting radio buttons as state machines, CSS animations for motion, trigonometric functions for pseudo-random pipe heights, and mathematical collision detection through CSS calculations.

This is the kind of project that makes you simultaneously admire the ingenuity and question the sanity. The developer imposed strict rules: only HTML and CSS, no preprocessors, no JavaScript, verified by running with JavaScript disabled. And yet the result is a playable game with a flapping bird, moving pipes with varying heights, collision detection, score counting, and a game-over screen.

The core trick for making the bird jump is brilliant. Two sets of radio button labels are stacked on top of each other and animated along with the bird. Only a small slit is visible, so the user sees what looks like a stationary button. Clicking it selects a radio button whose value corresponds to the bird's current vertical position, which CSS then uses to calculate the new starting position for the next jump animation. To restart the animation on each click, two identical keyframe animations are defined, and clicking alternates between them, tricking CSS into thinking it is a new animation each time.

The "random" pipe heights use CSS trigonometric functions applied to an incrementing pipe index, with a seed value that varies per game based on when the player dismisses the start screen. Collision detection is pure CSS math: two calculations check whether the bird and pipe overlap in the x dimension and y dimension independently, and their product is zero when there is no collision and positive when there is. That product controls whether the game-over screen appears. The author's deadpan FAQ answer about why the bird is square, "for ornithological accuracy and not because it made collision detection easier", is a perfect chef's kiss moment.

**Key takeaways:**
- Radio buttons serve as state machines in CSS, with the `:has()` selector enabling parent styling based on checked state
- Two identical keyframe animations alternated on each click trick CSS into restarting the animation
- CSS trigonometric functions generate pseudo-random pipe heights with a per-game seed
- Collision detection is implemented through pure CSS mathematical calculations checking x and y overlap
- The project demonstrates that modern CSS is computationally far more powerful than most developers realize

**Link:** [NoJS 3 - The dawn of Flappy Bird](https://blog.scottlogic.com/2026/03/09/noJS-3-flappy-bird.html)

## Adding Bluesky Likes to an Astro Blog with a 2KB Web Component

**TLDR:** A developer added Bluesky like counts and liker avatars to their Astro blog in about an hour using Lea Verou's `bluesky-likes` web component package, which is 2 KB gzipped, requires no API keys, and works through the public Bluesky API entirely client-side.

This is a nice case study in how web components shine for exactly this kind of use case: dropping a self-contained, framework-agnostic widget into any site with minimal integration effort. The `bluesky-likes` package provides two custom elements: `<bluesky-likes>` for the count and `<bluesky-likers>` for an avatar grid. You point the `src` attribute at a Bluesky post URL and the components handle everything. No API keys, no server-side code, no auth tokens, no CORS issues. It calls the public Bluesky API client-side.

The integration with Astro took three changes: one line adding a `bluesky_url` field to the Zod content schema, 46 lines for a dedicated Astro component, and three lines wiring it into the post page template. The component is conditionally rendered, so posts without a Bluesky URL do not load the script at all. CSS custom properties that penetrate the shadow DOM allow the widget to match the site's design tokens, automatically adapting to dark and light modes. The most tedious part was not the code but finding all existing Bluesky post URLs to add to frontmatter, which the developer automated with Claude Code and the `bsky` CLI.

For teams considering social engagement features, this is a template for how to do it right: progressive enhancement, no server dependencies, framework-agnostic components, and conditional loading. The web component approach means this same integration works on Next.js, Hugo, Eleventy, or a plain HTML page with the same two custom elements.

**Key takeaways:**
- The `bluesky-likes` package is 2 KB gzipped with zero dependencies and requires no API keys
- Integration with Astro required only one schema field, one component, and three lines in the page template
- CSS custom properties allow theming the shadow DOM components to match your site's design system
- Conditional rendering ensures the script only loads on posts that have a linked Bluesky URL
- The `bsky` CLI tool enables scripted discovery of existing Bluesky posts for backfilling frontmatter

**Link:** [How I added Bluesky likes to my Astro blog](https://loige.co/how-i-added-bluesky-likes-to-my-astro-blog/)

## Reveal.js 6.0: Now with an Official React Wrapper

**TLDR:** The HTML presentation framework reveal.js ships version 6.0 with an official React wrapper, a migration from Gulp to Vite, built-in TypeScript types, and accessibility improvements for screen readers.

Reveal.js has been one of those quiet workhorses of the web development world for over a decade, and version 6.0 brings it firmly into the modern era. The headline feature is `@revealjs/react`, an official React package that lets you build presentations with `Deck`, `Slide`, `Stack`, `Fragment`, and `Code` components. It is a natural progression for a framework whose users are overwhelmingly JavaScript developers who probably already think in components.

Under the hood, the build system has migrated from Gulp to Vite, which modernizes the developer experience and aligns with where the JavaScript ecosystem has landed. TypeScript types are now shipped as part of the package, so you can drop the `@types/reveal.js` community package. The breaking changes are mostly path-related: plugin paths, ES module file extensions changing from `.esm.js` to `.mjs`, and CSS import paths dropping the `dist/` prefix. There are also practical improvements like better video autoplay handling with an automatic unmute button, MathJax 4 support, and accessibility improvements where alt tags on images and videos are now properly announced by screen readers.

**Key takeaways:**
- Official `@revealjs/react` package provides first-class React support with Deck, Slide, Fragment, and Code components
- Build system migrated from Gulp to Vite, TypeScript types now bundled with the package
- Breaking changes primarily involve updated file paths for plugins, ES modules, and CSS
- Accessibility improvements include proper screen reader announcements for image and video alt text
- New `controls: 'speaker'` config option shows navigation controls only in the speaker view

**Link:** [Release 6.0.0 - reveal.js](https://github.com/hakimel/reveal.js/releases/tag/6.0.0)