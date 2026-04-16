---
title: "Google Bans Back Button Hijacking, MDN Goes Full Web Components, and AI Still Can't Do Frontend Right"
excerpt: "This week covers Google's new spam enforcement against navigation manipulation, the fascinating story of MDN's ground-up frontend rebuild using Lit and web components, why AI tools systematically produce inaccessible UI, the Intl API you should already be using, and a WordPress supply chain attack affecting 30+ plugins."
publishedAt: "2026-04-15"
slug: "frontend-focus-737-google-back-button-mdn-web-components-ai-accessibility"
hashtags: "#frontend #webdev #css #html #accessibility #webcomponents #wordpress #security #animation #svg #generated #en"
source_pattern: "Frontend Focus"
---

## Google Is Finally Cracking Down on Back Button Hijacking

**TLDR:** Google announced a new spam policy targeting sites that intercept the browser back button and redirect users somewhere unexpected. Enforcement starts June 15, 2026, and violations can result in manual spam actions or automated search ranking demotions.

**Summary:** If you've ever clicked the back button on a sketchy e-commerce or affiliate site and found yourself on a page you never visited before, you already know exactly what this policy is about. Back button hijacking is one of those patterns where a site pushes fake entries into the browser's history stack, or intercepts the popstate event, to trap users in a redirect loop or shove unsolicited content in their face when they try to leave. It's not a new trick, it's been around for years, but Google is now making it explicitly against their spam policies under the "malicious practices" category.

What I find interesting here is that Google is giving a two-month grace period before enforcement, which tells me they know this behavior is often baked into third-party ad platforms and widget libraries rather than implemented intentionally by site owners. The advice in the announcement is pretty clear: audit your dependencies, not just your own code. Your analytics vendor, your ad network, your chat widget - any of them could be doing this without you realizing it.

From a practical standpoint, the fix is straightforward if you control the code: stop manipulating history.pushState or history.replaceState in ways that deceive users. Don't intercept the popstate event to prevent legitimate backward navigation. If a library you're using is doing this, it's time to find an alternative or patch it out. The distinction between legitimate SPA navigation (which may use history manipulation for good reasons) and deceptive hijacking is really about intent and user expectation - are you helping users navigate your app, or trapping them?

**Key takeaways:**
- Effective June 15, 2026, sites engaging in back button hijacking face manual or automated demotion in Google Search results
- The behavior often originates from included third-party scripts and ad platforms, not first-party code
- Site owners need to audit their entire dependency tree, not just their own navigation logic
- Legitimate SPA-style history manipulation is not targeted - only deceptive redirection is

**Why do I care:** This finally gives us a concrete business argument when pushing back against product managers who want to implement "re-engagement" flows that abuse browser history. "It violates Google spam policy" is a lot cleaner than "it makes users feel manipulated." Add this to your list of things that kill SEO and site trust simultaneously.

**Link:** [Introducing a new spam policy for "back button hijacking"](https://developers.google.com/search/blog/2026/04/back-button-hijacking)

---

## MDN Rebuilt Its Frontend From Scratch and the Architecture Is Genuinely Interesting

**TLDR:** Mozilla's MDN team did a ground-up rewrite of their frontend, moving away from a Create React App SPA with Webpack to a system built on Lit web components, custom server components, and Rspack. The result cuts local development startup from two minutes to two seconds.

**Summary:** This is one of those deep-dive posts that I want to save and re-read every six months, because it illustrates a set of architectural decisions that I think more teams should be having conversations about. The MDN team had the classic problem: a React SPA that started life as Create React App, had to be ejected due to limitations, accumulated a massive complicated Webpack config, had CSS so entangled that any change risked unintended side effects elsewhere, and used dangerouslySetInnerHTML as the bridge between React and the actual documentation content. That last part is the kind of technical debt that accumulates silently until you realize the entire architecture is working against you.

The solution they landed on is fascinating because it's deliberately not framework-shaped. They built their own "server components" concept using Lit's html template literal - these run only on the server, produce static HTML, and have zero client-side cost. Interactive parts of the page are proper Lit web components that get lazy-loaded asynchronously based on which custom element tags are present in the DOM. There's no SPA. There's no hydration cost. The page loads static HTML fast, and web component JavaScript loads in parallel for exactly the elements that are actually on the page.

The component loading mechanism deserves special attention. Instead of a central import file that someone has to remember to update, the client-side code queries the DOM for any element whose tag name starts with "mdn-" and dynamically imports the corresponding element file. This is genuinely clever because it makes the system self-organizing - adding a new web component to a template just works, without any wiring step. Combined with Declarative Shadow DOM for server-side rendering of those components, the result is that components appear correctly before their JavaScript loads, and become interactive once it does, with no layout shift.

The CSS story is equally well thought through. Each component can have element-scoped CSS that only loads when that component is rendered, global CSS for fallback styles, and server component CSS that loads whenever the server component renders. Combined with HTTP/2 parallelism, the result is smaller cache footprints and more precise invalidation - a bugfix in one component doesn't bust the cache for everything else.

**Key takeaways:**
- Replaced a React SPA with a system built on Lit web components (client) and a custom server component layer (server side)
- Dynamic lazy-loading of web components based on DOM presence eliminates the need for a central import registry
- Declarative Shadow DOM enables server-rendered web components that are already visually correct before JS loads
- Build tool moved to Rspack (Webpack-compatible API, written in Rust) - local dev startup dropped from ~2 minutes to 2 seconds
- CSS is now scoped and lazy-loaded per component, eliminating the monolithic render-blocking CSS blob

**Why do I care:** The next time someone tells me React is the only serious option for a documentation or content site, I'm sending them this post. The MDN team essentially built what React Server Components are trying to solve, but with web standards, zero framework lock-in, and a local dev environment that doesn't make me want to quit. The fact that they're using Baseline Widely Available as a decision framework for what to use is also a model I want to adopt on my own teams.

**Link:** [Under the hood of MDN's new frontend](https://developer.mozilla.org/en-US/blog/mdn-front-end-deep-dive/)

---

## Agentic Engine Optimization: Your Docs Need to Work for AI Agents, Not Just Humans

**TLDR:** Addy Osmani coins the term "Agentic Engine Optimization" (AEO) and argues that developer documentation needs to be restructured for AI coding agents that fetch content programmatically, often consuming a single page in one HTTP request with no scroll events, no analytics, and no tolerance for bloated HTML.

**Summary:** I've been watching AI coding agents in my own server logs for a few months now and something is clearly happening that most teams haven't adapted to yet. Osmani's post articulates it well: an AI agent like Claude Code or Cursor fetches your documentation the same way a Googlebot would, but with much tighter token budget constraints and a behavioral pattern that collapses a multi-page human journey into one or two GET requests. Your entire analytics funnel - scroll depth, time on page, tutorial completions - records essentially nothing for this traffic. But the agent was absolutely there, and whether it succeeded or hallucinated a solution depends entirely on how well your content was structured.

The AEO framework he describes is layered. The foundation is making sure your robots.txt isn't accidentally blocking known AI agent user-agents. Above that is discoverability via llms.txt - a Markdown-formatted file at your domain root that functions like a sitemap for agents, with descriptions of what each section contains and ideally token count hints so agents can plan their context usage intelligently. Then there's capability signaling via skill.md files that tell an agent what your API can actually accomplish before it has to read all the prose. Finally, the actual content formatting needs to serve machine parsing: consistent heading hierarchies, code examples immediately following their prose descriptions, and clean Markdown available without the navigation chrome.

The token economics piece is something I hadn't fully internalized before reading this. A single API reference page that clocks in at 193,000 tokens can consume an agent's entire context window, forcing it to either silently truncate the content or fall back to parametric knowledge - which means making things up. Osmani suggests tracking token counts as a first-class documentation metric, which sounds unusual until you think about the fact that an agent is literally deciding whether to read your page based on how expensive it looks.

**Key takeaways:**
- AI coding agents compress multi-page documentation navigation into 1-2 HTTP requests - traditional analytics sees none of this traffic
- llms.txt is a structured Markdown index at your domain root that helps agents find relevant documentation without crawling
- Token count is a real constraint: pages over 30,000 tokens risk being skipped or truncated by agents
- skill.md files describe what an API can do (capabilities, inputs, constraints) before agents spend context budget on full docs
- AGENTS.md in repositories is becoming the standard entry point for AI coding agents, analogous to README.md for humans

**Why do I care:** I maintain documentation for a developer platform and we've already seen a measurable shift in traffic patterns toward server-side requests with AI agent fingerprints. AEO isn't a distant future concern - it's a present-day problem. The investment is also relatively low: a few hours to write llms.txt, a weekend to audit token counts, and some thought about skill.md files for your top APIs.

**Link:** [Agentic Engine Optimization (AEO)](https://addyosmani.com/blog/agentic-engine-optimization/)

---

## Why AI Is So Bad at Frontend Work

**TLDR:** Adam Argyle (aka @argyleink) published a sharp, opinionated breakdown of why LLMs systematically fail at frontend development: stale training data, no visual rendering capability, inability to reason about browser environmental variability, and fundamental unfamiliarity with modern CSS.

**Summary:** This one is a fun read because it's honest in a way that a lot of AI coverage isn't. The post doesn't argue that AI tools are useless for frontend work - they're clearly useful for scaffolding, token migration, and generating routine patterns. But the moment you step off the paved road of common patterns, the wheels fall off. Argyle's list of specific failure areas is precise: scroll-driven animations, intrinsic layout math, complex component state combinations, accessibility attributes thrown at the wall hoping they stick, and performance optimization that defaults to the heaviest possible solution unless explicitly prompted otherwise.

The deeper structural reasons he identifies are the ones that stick with me. AI models can't see - they're not rendering engines, and even when you paste a screenshot, they're pattern-matching against visual descriptions rather than truly understanding pixel geometry. They don't have environmental control: unlike backend code which runs in a predictable pinnable environment, HTML and CSS render in a browser that varies by version, viewport size, user preferences, input type, and operating system - all of which the model simply ignores until you explicitly make them relevant. And modern CSS is still dramatically underrepresented in training data, which means the model defaults to solutions that were idiomatic in 2019.

What this means practically is that AI-generated frontend code requires significantly more review than AI-generated backend code, and the failures tend to be subtle and visually plausible rather than obviously broken. The code compiles, runs without errors, and looks roughly right in one viewport at one browser version. The problems surface when a user shows up with a different setup.

**Key takeaways:**
- AI excels at scaffolding and common patterns but fails badly at bespoke layouts, intrinsic spacing math, and complex state combinations
- Models have no rendering engine - screenshots give them very little spatial reasoning capability
- Training data underrepresents modern CSS, resulting in solutions that default to older idioms
- Browser environment variability (viewport, user preferences, input method, browser version) is invisible to the model unless explicitly named in the prompt
- The more complex a component gets, the more the quality of AI-generated frontend code degrades

**Why do I care:** I've stopped being frustrated when AI tools fail at frontend tasks and started building that expectation into my workflow explicitly. For layout and accessibility work especially, AI output needs a review pass from someone who actually knows what they're looking at. Using it to move fast on structure and spending the saved time on careful review of the visual and accessible output is a reasonable split.

**Link:** [Why AI Sucks At Front End](https://nerdy.dev/why-ai-sucks-at-front-end)

---

## AI-Generated UI Is Inaccessible by Default - Here's the Five-Layer Fix

**TLDR:** A detailed Front End Masters post demonstrates that AI code generation tools consistently produce semantically broken UI - div soup with onClick handlers instead of buttons, missing ARIA states, no keyboard navigation - and proposes a five-layer enforcement system using prompt constraints, ESLint, runtime testing with jest-axe, CI integration, and accessible component libraries.

**Summary:** The article opens with a concrete demonstration that should make every frontend developer uncomfortable: a navigation sidebar generated by a general-purpose AI tool contains ten distinct accessibility failures in twenty-nine lines. No landmark, no heading structure, non-focusable interactive elements, missing aria-expanded, unlinked controls, unlabeled icons. And the author notes this pattern was consistent across multiple tools over two months of testing.

The explanation for why this happens is worth understanding rather than just accepting. LLMs optimize for visual output. The render tree and the accessibility tree are built from the same DOM, but AI training data heavily skews toward code that's been evaluated visually. RLHF evaluators assess outputs by looking at them, which reinforces visual fidelity without penalizing semantic failures. There's also a token economics argument: a semantically correct button with aria-expanded and aria-controls is simply more tokens than a div with an onClick, so absent explicit constraints, the model has no incentive to spend them. The model also has no internal representation of the accessibility tree - it models what code looks like, not what it means to assistive technologies.

The five-layer enforcement system is the practical heart of the post. Layer one is prompt constraints - baking accessibility rules into workspace configuration files like .cursorrules or copilot-instructions.md so they apply automatically to every generation. Layer two is eslint-plugin-jsx-a11y set to error, which catches structural issues like interactive divs and missing labels at the code level. Layer three is runtime testing with jest-axe and @axe-core/playwright, which tests the actual accessibility tree after rendering rather than static JSX. Layer four is CI integration making these checks required for merging. Layer five, and the deepest architectural solution, is simply using headless component libraries - Headless UI, Radix UI, or React Aria - for interactive primitives, so the accessibility contracts are built in and the AI's job shrinks to visual composition.

**Key takeaways:**
- AI tools consistently produce div soup with onClick handlers - test any generated interactive component against the accessibility tree, not just visually
- The problem stems from visual bias in training data and RLHF evaluation, plus no internal model of the accessibility tree
- Five layers of defense: prompt constraints, eslint-plugin-jsx-a11y (set to error), jest-axe runtime tests, CI enforcement, headless component libraries
- Automated tools catch 70-85% of real-world accessibility issues; screen reader testing is still necessary for the rest
- Using Radix/Headless UI/React Aria is the highest-leverage intervention because it works regardless of what tool generated the code

**Why do I care:** I've been recommending mandatory use of Radix or Headless UI primitives in AI-assisted codebases for a while now, and this post lays out the argument more rigorously than I could have. The five-layer system described here is essentially what a mature frontend CI pipeline should look like regardless of whether AI is involved - AI just makes the argument more urgent.

**Link:** [AI-Generated UI Is Inaccessible by Default](https://frontendmasters.com/blog/ai-generated-ui-is-inaccessible-by-default/)

---

## The Intl API: Stop Using Moment.js for Things the Browser Already Does

**TLDR:** A comprehensive Polypane guide walks through the full Intl API - DateTimeFormat, RelativeTimeFormat, NumberFormat, ListFormat, Segmenter, and Collator - making the case that most formatting needs can be handled natively in zero kilobytes of JavaScript.

**Summary:** I have a real affection for this API because I remember the specific moment I realized I could delete a Moment.js dependency from a project and replace its usage with about four lines of native code. The Polypane post is the best single reference I've seen for the full breadth of what Intl covers, and it's organized around the insight that these APIs all share the same shape: pick a locale, pick options, create a formatter, reuse the formatter with your data.

The coverage is genuinely comprehensive. Intl.DateTimeFormat handles dates and times with locale-aware formatting across cultures, so you don't need arrays of month names or day abbreviations. Intl.RelativeTimeFormat gives you "3 days ago" and "in 2 weeks" with correct localization. Intl.NumberFormat handles not just numbers but currencies with correct symbol placement per locale, compact notation for things like "1.5K" or "1M", and physical unit formatting with combined units like "km/h." Intl.ListFormat handles natural-language list serialization correctly, including the Oxford comma, which is apparently different between en-US and en-GB. Intl.Segmenter is the API most people don't know they need: it correctly counts words and graphemes across languages where splitting on spaces doesn't work, and handles composite emoji as single characters rather than as their underlying code point count.

The one performance note worth internalizing: creating the formatter is the expensive operation because it loads locale data. Calling format() on an existing formatter is cheap. So if you're processing a list of 10,000 dates, create one DateTimeFormat instance and reuse it - don't instantiate a new formatter in a loop.

**Key takeaways:**
- Replaces Moment.js (295kB), date-fns (77kB), Luxon (82kB), and numeral.js with zero additional JavaScript
- Intl.NumberFormat handles currencies with correct symbol position, grouping, and decimal conventions per locale
- Intl.Segmenter correctly splits text into words, sentences, and graphemes across all writing systems
- Create formatters once and reuse them - instantiation is expensive, calling format() is cheap
- All Intl formatters that have a .format() method also have a .formatToParts() method for wrapping individual parts in markup

**Why do I care:** Every project that pulls in a date or number formatting library should have someone ask "can Intl do this?" first. The answer is yes more often than most teams realize, and the savings in bundle size and parse time are real. The fact that Intl uses the user's actual locale preferences rather than a locale you configure is also a significant UX improvement for international audiences.

**Link:** [The Intl API: The best browser API you're not using](https://polypane.app/blog/the-intl-api-the-best-browser-api-youre-not-using/)

---

## Squash and Stretch: Bringing Disney Animation Principles to SVG Icons

**TLDR:** Josh Comeau walks through applying the "squash and stretch" principle from Disney's 12 principles of animation to SVG micro-interactions - specifically stretchy arrows that elongate and compress using CSS path transitions or the Motion library.

**Summary:** This is the kind of tutorial that reminds me why I still enjoy frontend work. Squash and stretch is the first of Disney's 12 animation principles, developed in 1981, and the core idea is that objects which deform during motion feel physically real and alive in a way that rigidly moving objects don't. Comeau applies this to something very practical: SVG icons with hover effects, particularly arrow icons that stretch toward their destination and then snap back.

The implementation has two paths depending on your browser support needs. The pure CSS version uses the path() function in CSS to override the d attribute on SVG path elements, combined with CSS transitions. This is elegant and works in Chrome and Firefox but not yet in Safari - about 79% coverage as of April 2026. The JavaScript approach uses the Motion library (formerly Framer Motion) to animate the d attribute directly, which gives you full cross-browser support and the ability to use spring physics instead of Bézier easing.

The spring physics argument is worth pausing on. Bézier easing is mathematically clean but spring physics are modeled on real-world mechanical behavior. For effects that are supposed to feel elastic or bouncy, the spring model produces motion that human perception reads as physically consistent in a way that even carefully tuned Bézier curves don't quite achieve. The other technique Comeau introduces is event-based rather than state-based hover: instead of keeping the arrow stretched while the cursor is over it, the stretch triggers briefly on pointer enter and then snaps back. This reads as playful and unexpected precisely because virtually every other hover effect on the web is state-based.

**Key takeaways:**
- Squash and stretch creates the perception of physical weight and elasticity in UI elements
- CSS path() transitions work in Chrome and Firefox but not yet in Safari (about 79% support as of April 2026)
- The Motion library provides cross-browser SVG path animation with spring physics support
- Event-based hover (trigger then snap back) is more distinctive than state-based hover (maintain while hovered)
- All examples correctly gate on prefers-reduced-motion for users who need reduced motion

**Why do I care:** Micro-interactions at this level of polish are one of the clearest differentiators between frontend work that feels professional and work that feels generic. Most developers I know avoid SVG animation because it feels complicated, but Comeau's tutorials consistently make the implementation approachable without sacrificing the craft. The spring physics point alone is worth the read.

**Link:** [Squash and Stretch](https://www.joshwcomeau.com/animation/squash-and-stretch/)

---

## SVG Filters: A Practical Introduction to the Stuff That Used to Be "Here Be Dragons"

**TLDR:** A Front End Masters guide demystifies SVG filter primitives for developers who've always avoided them, covering the filter element, the filter region, primitive inputs and outputs, and the colorspace gotcha that causes inconsistent results across browsers.

**Summary:** SVG filters are one of those areas of the web platform where most developers have a mental block that prevents them from even starting. The syntax looks strange, the documentation is scattered, and the visual effects they produce feel more like Photoshop than web development. This guide is good precisely because it doesn't try to cover everything - it establishes the structural vocabulary you need before you can make sense of anything else.

The basics are more systematic than they look. All filters live inside an SVG element that's zeroed out and removed from document flow. Each filter element gets an id so CSS can reference it with filter: url(#my-filter). Inside the filter, you place fe-prefixed primitives - feBlend, feGaussianBlur, feColorMatrix, feDisplacementMap, and about fifteen others - and they process in sequence with each primitive's output feeding the next as input by default. The result attribute lets you name a primitive's output to reference it later in the chain, and in/in2 attributes let you explicitly specify inputs instead of relying on the default chain.

Two things I didn't know before reading this: the filter region (the bounding area the effect renders into) defaults to a 10% buffer outside the element on all four sides, which is there to give overflow effects like blur and shadows room to breathe. And the color-interpolation-filters attribute needs to be explicitly set to sRGB on every filter element that touches RGB channels, because the default behavior is inconsistent between Safari (uses sRGB) and Chrome/Firefox (use linearRGB). Without it, the same filter produces visibly different results across browsers.

**Key takeaways:**
- SVG filter elements must live inside an svg that's zeroed and removed from document flow with position: fixed
- Primitives process in sequence with each output feeding the next by default - result/in attributes override this
- Always set color-interpolation-filters="sRGB" on any filter that operates on RGB channels to fix cross-browser inconsistency
- The default filter region extends 10% outside the element on all sides - expand it for effects that overflow, constrain it for contained noise effects
- There are roughly twenty fe-prefixed primitives covering blending, convolution, color manipulation, displacement, turbulence, and more

**Why do I care:** SVG filters are one of the few remaining areas of the web platform that give you effects impossible to achieve any other way - true gooey animations, custom lighting effects, per-pixel displacement. Every time I've actually sat down and worked through a filter implementation, the result justified the learning investment. This guide is the on-ramp I wish I'd had earlier.

**Link:** [SVG Filters Guide: Getting Started with the Basics](https://frontendmasters.com/blog/svg-filters-guide-getting-started-with-the-basics/)

---

## The Radio State Machine: Multi-State CSS Without JavaScript

**TLDR:** A CSS-Tricks post builds on the classic checkbox hack to create a "radio state machine" using radio button groups, CSS :has(), and custom properties - enabling three, four, or more mutually exclusive visual states in pure CSS with full accessibility.

**Summary:** The checkbox hack has been a useful CSS trick for years, but it's always been limited to binary state - checked or unchecked. The radio state machine extends the concept elegantly by using a group of radio inputs with the same name attribute, which enforces mutual exclusivity, and then styling the rest of the page based on which radio is checked via :has(). The result is CSS that can manage three, four, or seven distinct visual states with no JavaScript required.

The accessibility handling in this article is particularly thoughtful. Rather than hiding the radio inputs with the hidden attribute (which removes them from the accessibility tree), the technique uses appearance: none with cursor and custom text via pseudo-elements to make each radio button look and feel like a labeled interactive button. The buttons are real form controls, keyboard accessible, and correctly announced by screen readers. The only visible radio at any given time is the one for the next available state transition, which is shown using the adjacent sibling combinator targeting the input after the currently checked one.

The custom property angle is where the pattern becomes architecturally interesting. Instead of writing separate style blocks for every element in every state, you can assign numeric values to a --state variable per state and use CSS math to derive all visual properties from that single number. Position, scale, opacity, color - all calculated as functions of the current state index and the element's own index variable. One variable drives an entire visual system.

**Key takeaways:**
- Radio inputs with the same name attribute provide mutually exclusive multi-state toggles for CSS state management
- Use appearance: none on the radio inputs directly rather than hiding them with the hidden attribute, which preserves accessibility
- :has() allows placing the inputs anywhere in the document rather than requiring them at the top of the DOM
- CSS custom properties and calc() let you drive entire visual systems from a single --state numeric variable
- The pattern is appropriate for purely visual state; business logic, persistence, and async data still belong in JavaScript

**Why do I care:** I keep this trick in my mental toolkit specifically for UI demos, documentation examples, and interactive visualizations where I want rich state behavior without introducing JavaScript dependencies. The accessibility treatment here is better than most "CSS only" tutorials I've read, which tend to skip it entirely.

**Link:** [The Radio State Machine](https://css-tricks.com/the-radio-state-machine/)

---

## WordPress Supply Chain Attack: One Buyer, 30+ Plugins, Eight Months of Dormancy

**TLDR:** A detailed forensic post documents how someone purchased a portfolio of 30+ legitimate WordPress plugins on Flippa for six figures, planted a PHP deserialization backdoor in all of them in their very first commit, left it dormant for eight months, then activated it to inject SEO spam using a blockchain-based command-and-control system.

**Summary:** This is one of the most technically sophisticated supply chain attacks I've read about in the WordPress ecosystem, and the timeline is genuinely alarming. The buyer, identified only as "Kris," acquired the Essential Plugin portfolio of 30+ free WordPress plugins from a legitimate India-based development team in early 2025. Their very first SVN commit to WordPress.org added a PHP deserialization backdoor hidden inside what appeared to be analytics compatibility code. The changelog said "Check compatibility with WordPress version 6.8.2." What it actually did was add an unauthenticated REST endpoint that would execute arbitrary functions from attacker-controlled serialized data.

That backdoor sat dormant for eight months. Then on April 5-6, 2026, it was activated. The payload fetched a backdoor file designed to look like WordPress core, injected thousands of bytes of PHP into wp-config.php, and began serving SEO spam links to Googlebot specifically - invisible to site owners, visible to the crawler. The command-and-control domain was resolved through an Ethereum smart contract querying public blockchain RPC endpoints, making traditional domain takedown useless since the attacker could update the smart contract to point anywhere at any time.

WordPress.org responded quickly once the attack was discovered - all 31 Essential Plugin plugins were closed in a single day on April 7, and a forced update was pushed the next day. But that forced update only neutralized the phone-home mechanism in the plugin itself. It did not clean wp-config.php. Sites that had already been compromised needed manual remediation. The author of this post found the injection by comparing wp-config.php file sizes across eight backup snapshots using binary search - the infected files jumped from around 3,345 bytes to 9,540 bytes on April 7.

**Key takeaways:**
- 30+ plugins compromised via a single Flippa acquisition; backdoor planted in first SVN commit, dormant for 8 months before activation
- The payload used a blockchain smart contract for C2 domain resolution, making traditional takedown ineffective
- WordPress.org's forced update cleaned the plugin files but did NOT clean wp-config.php on already-compromised sites
- Check your wp-config.php file size - the injected payload adds approximately 6KB; it appears on the same line as the wp-settings require
- WordPress.org currently has no mechanism to flag or review plugin ownership transfers - this pattern has happened before and will happen again

**Why do I care:** If you maintain WordPress sites professionally, this needs to be on your radar right now. The plugin slugs are all listed in the post. Search your fleet, patch or remove any matches, and check wp-config.php on affected sites. More broadly, this illustrates exactly why supply chain security in any package ecosystem - npm included - requires ongoing vigilance and automated monitoring, not just one-time audits.

**Link:** [Someone Bought 30 WordPress Plugins and Planted a Backdoor in All of Them](https://anchor.host/someone-bought-30-wordpress-plugins-and-planted-a-backdoor-in-all-of-them/)

---

## Phaser 4.0.0: The HTML5 Game Engine Gets a Ground-Up WebGL Rebuild

**TLDR:** Phaser 4.0.0 is out, replacing the v3 pipeline system with a new node-based WebGL renderer, introducing GPU-driven sprite and tilemap layers that render millions of sprites in a single draw call, unifying the FX and masking systems, and shipping 28 AI agent skill files for the first time.

**Summary:** Phaser is one of those projects that has been the workhorse of browser-based game development for over a decade, and version 4 is described as the biggest release in the project's history. The headline change is the WebGL renderer rewrite: the v3 pipeline system - which required developers to understand the rendering pipeline to use it effectively - has been replaced with a node-based architecture where each render node handles a single task with fully managed WebGL state and built-in context restoration.

The performance numbers around SpriteGPULayer and TilemapGPULayer are the kind that make you do a double take. A million sprites in a single draw call. A 4096x4096 tilemap layer rendered as a single quad with per-pixel shader cost rather than per-tile cost. These are GPU-driven approaches that move the rendering bottleneck from the CPU draw call count to raw shader throughput, which is a fundamentally different performance profile than traditional sprite batching.

One detail I found genuinely interesting is the inclusion of 28 AI agent skill files covering every major Phaser subsystem, including a dedicated v3-to-v4 migration skill. This is exactly the kind of AEO investment Addy Osmani was writing about earlier in this issue. Rather than hoping that AI tools hallucinate the right API from training data, Phaser is explicitly providing structured skills that coding agents can load as context when working with the engine.

**Key takeaways:**
- Node-based WebGL renderer replaces the v3 pipeline system with cleaner architecture, managed state, and built-in context restoration
- SpriteGPULayer renders up to a million sprites in a single draw call - up to 100x faster than standard rendering
- TilemapGPULayer renders entire tilemap layers as single quads with no per-tile performance penalty up to 4096x4096 tiles
- Unified Filter system replaces separate FX and Mask systems, with Blur, Glow, Shadow, Bloom, Wipe, and many more built in
- Ships with 28 AI agent skill files covering all major subsystems, including a v3-to-v4 migration skill

**Why do I care:** I don't work on games primarily, but Phaser is also increasingly used for interactive data visualizations and browser-based creative tools. The GPU-driven rendering in v4 opens up use cases that were previously impractical in a browser context. The AI skill files are worth studying as a practical model for documentation-first AEO adoption.

**Link:** [Release Phaser v4.0.0](https://github.com/phaserjs/phaser/releases/tag/v4.0.0)

---

## Container Query Typography: Fix the Two-Column Layout Problem Once and For All

**TLDR:** A short but practical post by Matt Waler replaces viewport-breakpoint-based typography utility classes with container-query-based equivalents, solving the long-standing problem of headings that look too large when a column is narrower than the full viewport.

**Summary:** This is one of those posts where the idea is obvious in retrospect but I genuinely hadn't seen it articulated this cleanly before. The classic typography utility class approach - h1 is text-4xl on mobile, text-5xl on md, text-6xl on lg - works fine when the heading's column spans the full viewport width. The moment you put that heading inside a two-column layout, the breakpoints fire based on viewport width, not the available width for the content, and you get headings that are way too large for their container.

The fix uses :has() to automatically mark any element that contains a typography utility class as a container, then replaces the viewport-based responsive modifiers (md:) with container-query equivalents (@md:). The typography classes themselves look almost identical to the original Tailwind utilities - the only difference is the @-prefixed breakpoint syntax. But now the heading scales relative to its parent container, so it looks correct whether it's in a full-width layout or a half-width column.

It's a small post but it solves a real problem that I've worked around with custom font-size overrides dozens of times without ever thinking to solve it at the typography system level. Container queries have been in all major browsers for a while now and this is exactly the kind of practical application that justifies their use outside of explicit "adaptive components."

**Key takeaways:**
- Replace md:text-* viewport breakpoints with @md:text-* container query breakpoints in typography utilities
- Use :has() to automatically apply @container to any element that contains a typography class
- Headings and text now scale to their parent container width, not the full viewport
- Solves the two-column layout font size problem without one-off overrides
- Container queries are baseline widely available and safe to use in production today

**Why do I care:** This belongs in every design system that uses utility-class typography. It's one configuration change that eliminates a whole category of manual font-size patches that accumulate over the lifetime of a project. I'm going to be adding this to my Tailwind base config going forward.

**Link:** [Container Query Typography Systems](https://mattwaler.com/blog/container-query-typography-systems/)
