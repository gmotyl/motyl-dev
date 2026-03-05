---
title: "CSS Shapes Get Real, Engineering Eats Everything, and the Death of Lock-In"
excerpt: "A packed edition covering the game-changing border-shape CSS property, why every role is becoming an engineering role, the shift from lock-in to interoperability, and how visually-hidden has been a hack for twenty years running."
publishedAt: 2026-03-04
slug: css-shapes-get-real-engineering-eats-everything-and-the-death-of-lock-in
hashtags: ["#unicornclub", "#css", "#frontend", "#design-systems", "#ai", "#interoperability", "#accessibility", "#ux", "#startup", "#tech-industry", "#generated", "#en"]
---

## border-shape: The Future of the Non-Rectangular Web

**TLDR:** CSS is getting a powerful new primitive called `border-shape` that lets you define custom shapes for element borders, and unlike `clip-path`, it actually redefines the box itself so backgrounds, shadows, and outlines all follow the new geometry. It is currently available for testing in Chrome Canary 146+.

**Summary:**

For years, creating non-rectangular shapes on the web has been a exercise in creative hackery. You would reach for `clip-path` to mask off parts of elements, abuse pseudo-elements for tooltip arrows, or resort to SVG for anything remotely complex. The new `border-shape` property, part of CSS Borders and Box Decorations Module Level 4, changes the game entirely.

What makes this fundamentally different from `clip-path` is that `border-shape` redefines the element's actual box geometry. When you apply a shape, the background, border-image, focus outline, and box-shadow all follow that new geometry. This is not a visual mask sitting on top of your element. It is the element.

The property accepts basic shapes like `circle()`, `ellipse()`, and `polygon()`, but the real power comes from the `shape()` function, which lets you draw complex paths directly in CSS using the same flexible syntax available for paths. Una Kravets from Google has built some compelling demos including proper tooltips with arrows that support borders and shadows, chevron navigation where gap and geometry just work without z-index hacking, and scalloped borders using arcs.

The tooltip use case alone is worth the price of admission. For years, developers have been layering pseudo-elements or clipping borders to fake tooltip arrows. With `border-shape`, you define the tooltip shape including its arrow as actual geometry, and everything from borders to shadows to focus rings follows naturally. Combined with anchored container queries, you can even animate the arrow position based on where the tooltip is anchored.

This is early days -- you need Chrome Canary with the Experimental Web Platform Features flag enabled -- but this is a fundamental shift in how we think about element geometry on the web platform.

**Key takeaways:**
- `border-shape` redefines the box itself, unlike `clip-path` which only masks
- Backgrounds, borders, box-shadows, and focus outlines all follow the new geometry
- The `shape()` function enables complex paths directly in CSS
- Real tooltips with proper borders and shadows are finally possible without hacks
- Currently Chrome Canary 146+ only with experimental flags

**Link:** [border-shape: the future of the non-rectangular web](https://una.im/border-shape/)

## Understanding CSS corner-shape and the Power of the Superellipse

**TLDR:** The new CSS `corner-shape` property extends `border-radius` with keywords like `squircle`, `scoop`, `bevel`, and `notch`, plus a `superellipse()` function that gives you continuous mathematical control over corner curvature. It turns what used to require SVG or images into a few lines of CSS.

**Summary:**

While `border-shape` handles full element geometry, `corner-shape` is its companion for fine-tuning how corners look. The property works alongside `border-radius`, where the radius determines the size of the curve and `corner-shape` defines how that curve renders. Think of it as going from a single brush to a full palette.

The predefined keywords are immediately useful. `bevel` gives you straight-line cuts for creating hexagons and octagons with pure CSS. `notch` creates inward corners for plus-sign shapes. `scoop` produces concave curves. And `squircle` gives you that smooth Apple-style blend between square and circle that designers have been requesting for years.

But the real depth here is the `superellipse()` function, which maps to a mathematical concept that has existed for over a century. The CSS implementation is elegantly simplified: zero gives you a straight line (like `bevel`), positive numbers curve outward with `1` being a regular circle and `2` being a squircle, and negative numbers produce concave shapes. As the number increases toward infinity, you approach a perfect square. It is continuous control over corner geometry expressed as a single parameter.

The property also supports per-corner values and smooth transitions between shapes. You can animate from one corner shape to another, which opens up interaction possibilities that previously required JavaScript shape morphing libraries. The `square` value, which seems pointless at first, turns out to be essential for clean animations when transitioning to a square shape.

Currently this is limited to Chrome M139 and above, with the specification still potentially subject to changes. But together with `border-shape`, these properties represent a genuine expansion of CSS's geometric vocabulary.

**Key takeaways:**
- `corner-shape` is a companion to `border-radius`, controlling curve appearance rather than size
- Predefined keywords: `round`, `squircle`, `scoop`, `bevel`, `notch`, `square`
- The `superellipse()` function provides continuous mathematical control over curvature
- Supports per-corner values and smooth CSS transitions between shapes
- Currently Chrome-only (M139+), specification still evolving

**Link:** [Understanding CSS corner-shape and the Power of the Superellipse](https://frontendmasters.com/blog/understanding-css-corner-shape-and-the-power-of-the-superellipse/)

## The Engineeringification of Everything

**TLDR:** Every professional role is absorbing engineering tools, skills, and identity, driven by a feedback loop of increasingly powerful tools, LLMs lowering the learning curve, and new identities crystallizing around the results. PostHog argues this is where B2B SaaS is heading.

**Summary:**

There is a pattern playing out across the tech industry that deserves attention: the systematic absorption of engineering practices into every other role. Design engineers, GTM engineers, sales engineers -- the "engineer" suffix is proliferating, and PostHog makes a compelling case that this is not just title inflation. It is a structural shift driven by a self-reinforcing feedback loop.

The loop works like this: tools get more powerful, using them becomes complex enough to require engineering-style thinking, non-technical people learn anyway because iteration speed demands it, skills accumulate until the old title no longer fits, and a new identity emerges. LLMs are the accelerant. When seemingly every tool has an AI assistant or an MCP server, the barrier between "technical" and "non-technical" drops dramatically. People who would never have written code are now generating apps with Lovable, automating workflows with n8n, and building prototypes with Claude Code.

The business implications are significant. Capital is flooding into AI-powered B2B SaaS targeting these newly-technical users. Companies like Sierra, Lovable, and Clay are growing on the premise that non-engineers want engineering-grade tools. The investment improves the tools, which creates more engineeringified users, which attracts more investment. It is a flywheel.

What is worth pushing back on is whether this expansion of the "engineer" label actually serves anyone. The article acknowledges this is legally sensitive in some jurisdictions. More practically, there is a risk of diluting the deep technical expertise that distinguishes actual engineering work. The counter-argument, and it is a strong one, is that the defining line is shifting from "who is allowed to build" to "who has the ideas and dedication to actually build it." Whether that is ultimately a gain or loss depends heavily on the domain and the stakes involved.

The practical advice here is sound: for non-technical people, lean into the tools; for engineers, use the same tools to become full-stack shipping machines; for startups, build for these new types of engineers by having APIs, machine-readable docs, MCP servers, and integrations with the broader ecosystem.

**Key takeaways:**
- Engineering tools, skills, and identity are spreading to every professional role
- LLMs are the primary accelerant, making complex domain-specific tools accessible to non-engineers
- This is a self-reinforcing loop: tools create skills, skills reshape identity, identity demands new tools
- Significant capital is flowing into B2B SaaS serving these newly-technical users
- The practical advice: ship APIs, machine-readable docs, and MCP servers

**Link:** [The Engineeringification of Everything](https://newsletter.posthog.com/p/the-engineeringification-of-everything)

## Software Interoperability: The Moat Is Now a Bridge

**TLDR:** The winning strategy in software is shifting from lock-in to interoperability. Open protocols like MCP are becoming industry foundations, and the defensible position is no longer keeping users trapped but being the thing everything else connects to.

**Summary:**

For years, the playbook was consolidation: build the suite, own the workflow end-to-end, make it painful to leave. That model is cracking, and this piece from Proof of Concept makes a tight argument for why interoperability is now the winning strategy.

The shift is driven by three forces. First, software pricing is moving toward usage and outcomes, which means your tool needs to integrate deeply with everything the customer already uses. You cannot charge for value delivered if your product is an island. Second, AI agents are accelerating the need for open protocols. A coding agent that can only talk to one editor or one version control system is not very useful. The agents people actually rely on push code, trigger reviews, run tests, and update documentation across whatever stack is in place. They need to cross ecosystem boundaries, not respect them. Third, users now expect to swap parts. The expectation has shifted from "learn our way" to "work with my setup."

The evidence is compelling. MCP has gone from a side project to an industry foundation in under a year. The Linux Foundation has launched the Agentic AI Foundation with Anthropic, OpenAI, Google, Microsoft, and AWS all under one governance umbrella. NIST is publishing frameworks for agent interoperability. JetBrains has shipped editor-agnostic agent registries. These are companies that spent decades building competing ecosystems now sitting at the same table. That does not happen because interoperability is a nice idea. It happens because the alternative is irrelevance.

The paradox at the heart of this piece is worth sitting with: your product moat is now the bridges you build for people to come through. The defensible position is not making it hard to leave -- it is being the thing everything connects to. If your platform is where value gets exchanged between tools, removing you breaks the whole workflow.

**Key takeaways:**
- Lock-in is becoming a liability; customers actively avoid single-vendor dependencies
- AI agents need open protocols to cross ecosystem boundaries
- MCP has become the de facto standard with major industry backing
- The defensible position is being the hub everything connects to, not the walled garden
- Partnerships and integration catalogs are becoming as important as feature lists

**Link:** [Software Interoperability](https://www.proofofconcept.pub/p/software-interoperability)

## Everything You Never Wanted to Know About visually-hidden

**TLDR:** The `visually-hidden` CSS class has been a hack for over twenty years, and David Bushell traced its complete history from 2003 to today, raising the question of whether a minimum viable two-property version is sufficient in 2026 or whether the web platform has simply failed us on accessibility.

**Summary:**

This is one of those deep-dive pieces that makes you question how much of what we accept as "best practice" is actually well-understood. The `visually-hidden` class -- that block of CSS properties used to hide content visually while keeping it accessible to screen readers -- has accumulated properties over two decades, and many of them were added for reasons that may no longer apply.

David Bushell traced the lineage back to 2003-2004, when the need to visually hide "skip navigation" links drove early experiments. Bob Easton proposed off-screen positioning, WCAG drafts included zero-dimension techniques, and Paul Bohman discovered the first zero-width bug where Window Eyes could not read elements with zero pixel dimensions. From there, each year brought new browser bugs and new properties thrown in as safeguards: `clip` in 2010, `white-space: nowrap` in 2016 to fix text smushing, and `clip-path` around 2020 as `clip` became deprecated.

The provocative question posed by Ana Tudor is whether just `position: absolute` and `clip-path: circle(0)` is enough in 2026. Scott O'Hara proposed `position: absolute` with `transform: scale(0)` as another minimal alternative. Both show promise in limited testing, but no one has done the comprehensive cross-browser, cross-assistive-technology testing needed to make a definitive recommendation.

What makes this piece particularly valuable is the section on whether a native `visually-hidden` should be built into the web platform. The accessibility community is divided. Some argue it would be pragmatic. Others, including Scott O'Hara, Sara Soueidan, and Adrian Roselli, argue that standardizing the technique would further entrench its overuse while failing to address the underlying design problems that create the need for hidden content in the first place. As Bob Easton put it from his 40 years of experience: "You can't go wrong with well crafted, semantically accurate structure."

**Key takeaways:**
- The visually-hidden class has accumulated properties over 20+ years, many for reasons no longer relevant
- Minimal alternatives exist but lack comprehensive cross-browser testing
- The web standards community is divided on whether a native solution should exist
- Most uses of visually-hidden are symptoms of design problems, not fixes for them
- The NVDA 2026.1 beta now handles zero-width controls, potentially simplifying things further

**Link:** [Everything you never wanted to know about visually-hidden](https://dbushell.com/2026/02/20/visually-hidden/)

## Typographic Scales in CSS with :heading(), sibling-index(), and pow()

**TLDR:** Three new CSS features -- the `:heading()` pseudo-class, `sibling-index()`, and `pow()` -- combine to let you define an entire typographic scale as a single mathematical expression instead of six separate declarations.

**Summary:**

Traditional typographic scales in CSS are tedious. You calculate each heading size manually based on a ratio, write six separate declarations, and if you want to try a different scale, you recalculate everything. This article shows how three emerging CSS features eliminate that entire workflow.

The core insight is that typographic scales are exponential: each heading level multiplies the previous by a ratio. So the formula is simply `base-size * ratio ^ (6 - level)`. With `pow()` for exponentiation, `sibling-index()` to determine which heading you are looking at, and `:heading()` to select all headings at once, the entire scale collapses to a single `font-size` declaration with custom properties for the base size and ratio.

Want to switch from a Major Third (1.25) to a Perfect Fourth (1.333)? Change one custom property. Want a tighter scale on mobile and a more dramatic one on desktop? A media query swapping the ratio variable handles it. The mathematical relationships are expressed in the code itself rather than pre-computed and hardcoded.

The important caveat is that `sibling-index()` counts sibling position, not heading level. So this only works perfectly when headings appear in clean sequential order. For real-world layouts where headings repeat or appear out of order, the article provides a fallback approach using explicit `--heading-level` custom properties per heading level. It is a few more lines but works regardless of markup structure. Currently only Safari Technology Preview supports all three features, so this is firmly future-facing -- but it is a compelling glimpse of CSS as a system-definition language rather than a property-declaration language.

**Key takeaways:**
- `:heading()`, `sibling-index()`, and `pow()` combine to express typographic scales as math
- A single `font-size` rule with custom properties replaces six separate declarations
- Responsive typography becomes trivial: swap the ratio variable per breakpoint
- `sibling-index()` has a real limitation with non-sequential headings; explicit level variables are the safe fallback
- Currently Safari Technology Preview only

**Link:** [Typographic Scales in CSS with :heading(), sibling-index(), and pow()](https://www.alwaystwisted.com/articles/building-typographic-scales-with-headings-sibling-index-and-pow)

## Sprites on the Web in 2026

**TLDR:** Josh Comeau walks through the best modern CSS approach to sprite animations using `object-fit`, `object-position`, and the `steps()` timing function, while making the case that sprites are best reserved for actual sprite-style artwork rather than performance optimization.

**Summary:**

Sprite-based animation is a technique borrowed from video games that packages multiple animation frames into a single image strip. Josh Comeau's piece is both a technical tutorial and a thoughtful examination of when you should and should not use this approach in 2026.

The modern implementation is cleaner than the old `background-position` approach. You use an `img` tag with `object-fit: cover` to display one frame at a time, `object-position` to slide between frames, and a CSS keyframe animation with the `steps()` timing function to flip discretely rather than smoothly. The deep dive into `steps()` and its step position argument (particularly `jump-none` for looping animations) is genuinely useful knowledge that applies well beyond sprites.

The more interesting argument is about when not to use sprites. Twitter famously used this technique for their heart animation in 2015 due to performance constraints on low-end mobile devices. Comeau pushes back on that reasoning in 2026: devices and browsers have improved dramatically, and procedurally generated animations are both more dynamic and more delightful. His "Like" button example uses trigonometry and randomness to produce a slightly different animation every click, versus a sprite which replays identically every time.

The sweet spot for sprites in 2026 is content that genuinely looks like sprite art -- pixel-art characters, retro game aesthetics, hand-drawn frame animations. For those use cases, sprites are not a performance compromise but the authentic medium.

**Key takeaways:**
- Modern sprite implementation uses `object-fit`, `object-position`, and `steps()` timing function
- The `steps()` function's `jump-none` argument is critical for smooth looping
- Performance is no longer a valid reason for sprites on modern devices
- Procedural animations are more dynamic and delightful than fixed sprite replays
- Sprites shine when the content genuinely calls for frame-by-frame artwork

**Link:** [Sprites on the Web](https://www.joshwcomeau.com/animation/sprites/)

## GenAI for Complex Questions, Search for Critical Facts

**TLDR:** Nielsen Norman Group observed how users choose between AI chatbots and traditional search for real tasks, finding that people turn to AI for exploration and synthesis but fall back to search when accuracy, trust, and high stakes matter.

**Summary:**

This research from NN/g provides empirical data for something many of us have intuited: AI and traditional search serve complementary roles, and users are developing sophisticated strategies for when to use each. The study observed participants with real tasks, not lab scenarios, which gives the findings more weight.

Users gravitated toward AI when starting with vague ideas, juggling multiple constraints, or needing to synthesize across many sources. The bachelor golf trip example is illustrative: the participant had four simultaneous constraints (duration, number of rounds, budget, geography) that would be nearly impossible to express in a single search query. AI handled that naturally. Users also valued AI for reducing working-memory load during comparison tasks, asking chatbots to present information in tables or consolidate options that would otherwise require keeping multiple browser tabs open and taking manual notes.

But the trust boundary is clear and consistent. Users ping-ponged between AI and search, using search as a validation mechanism for specific facts, pricing, and high-stakes decisions. Multiple participants explicitly said they would not trust pricing information from AI. One participant watched ChatGPT list a New York resort when asked for Midwest options, remarking "this is where ChatGPT can begin to lose its charm." Citations do not fully solve the trust problem either -- participants struggled to understand which claims were backed by named sources versus uncited synthesis.

What is missing from this study, and it is worth noting, is any examination of how these patterns might shift as AI accuracy improves and users build calibrated trust over time. The current snapshot shows a rational division of labor, but the equilibrium point is almost certainly moving.

**Key takeaways:**
- Users choose AI for exploration, multi-constraint queries, and information synthesis
- Traditional search wins for accuracy-critical facts, pricing, and high-stakes decisions
- 6 out of 9 participants ping-ponged between AI and search within the same task
- Citations do not fully resolve trust issues; users cannot tell which claims are sourced
- AI particularly excels at reducing working-memory load during comparison tasks

**Link:** [GenAI for Complex Questions, Search for Critical Facts](https://www.nngroup.com/articles/ai-search-infoseeking/)

## Honoring Mobile OS Text Size on the Web

**TLDR:** When users set a larger text size in their mobile OS, that setting does not always affect web content. Adrian Roselli documents the fragmented state of browser support and provides a combined solution using Apple's font declaration and Chrome's new meta tag.

**Summary:**

This is one of those accessibility topics that seems like it should have been solved a decade ago. When a user goes into their Android or iOS settings and increases the system font size, they reasonably expect that change to apply everywhere, including web pages. It does not, and the reasons are a tangle of browser-specific behaviors.

Firefox on Android just handles it. It scales web page text based on system font size regardless of whether you use `px` units. No author intervention needed. Safari requires the author to opt in by referencing the system font with `font: -apple-system-body` and then resetting the root font size. Chrome has taken a standards-track approach with a new meta tag (`<meta name="text-scale" content="scale">`) being discussed in the CSSWG, but it requires the author to avoid setting a fixed base font size.

Roselli provides a combined "Frankenstyle" approach that works across all three browsers: add the Chrome meta tag to your HTML head, add Apple's font declaration and feature query to your CSS, and make sure you are using relative units throughout. Firefox just works without intervention. The catch, and it is a significant one, is that your entire site needs to use relative units. If you have hard-coded pixel values sprinkled through your stylesheets, this will break down.

The deeper point here is that respecting user preferences is an accessibility fundamental that should not require author opt-in at all. Firefox got this right years ago. The fact that Chrome and Safari require explicit developer action means the vast majority of websites will never honor these settings.

**Key takeaways:**
- Firefox on Android honors system text size by default; Chrome and Safari require author opt-in
- Chrome is proposing a `<meta name="text-scale" content="scale">` tag via the CSSWG
- Safari requires `font: -apple-system-body` with a feature query
- The combined solution works but requires consistent use of relative units
- No browser reload is needed when users change their OS text size

**Link:** [Honoring Mobile OS Text Size](https://adrianroselli.com/2026/02/honoring-mobile-os-text-size.html)

## Design System Contributions Work Better When Everyone Knows Your Name

**TLDR:** PJ Onori argues that design system contribution models only work well on teams small enough for everyone to know each other, and proposes a lightweight "recipe" system that gives contributors a useful artifact regardless of whether their work graduates into the system.

**Summary:**

This is a refreshingly honest take on a problem that design system teams often struggle with quietly. Contribution models at large organizations tend to become bureaucratic nightmares. PJ Onori has seen some that rival tax codes in complexity, and his core argument is simple: contributions require trust, trust requires relationships, and relationships do not scale.

The proposed alternative is a three-step process built around "recipes" -- distinct compositions of existing design system components. Step one: add a recipe to a shared library, with as much or as little detail as you want. Step two, optional: review the recipe with the design system team to see if it should graduate to the system. Step three, if everyone agrees: define what needs to change, write a spec, document usage, and assign owners.

The key design decision is that the design system team does not own recipes. No policing, no oversight. Designers can build whatever they think makes sense, even if it diverges from the system. This means there is always a payoff for contributing -- at minimum, you get a usable recipe. The worst outcome in traditional contribution models is putting in significant work and having it rejected with nothing to show for it.

What is left unsaid is how recipe libraries avoid becoming dumping grounds of inconsistent, unmaintained patterns. Onori acknowledges that recipe libraries need care and maintenance, but the question of who does that work when the design system team explicitly does not own it is left open. In practice, someone has to curate, and if that person does not exist, you end up with a different problem than the one you solved.

**Key takeaways:**
- Contribution models are inversely effective to their complexity
- Trust and relationships are prerequisites; these do not scale to large organizations
- "Recipes" provide a low-stakes way to contribute without full system integration
- The design system team does not own recipes, reducing gatekeeping friction
- Contributors always get a usable artifact, even if it never enters the system

**Link:** [Design system contributions work better when everyone knows your name](https://pjonori.blog/posts/design-system-contributions/)

## Keeping Community Human While Scaling with Agents

**TLDR:** Vercel built an agent system called Community Guardian that handles triage, routing, and follow-ups for their developer community, freeing their human team to focus on complex debugging and relationship building. The interesting part: the person who built it is not an engineer.

**Summary:**

Vercel's community team faced a scaling problem familiar to any growing developer-facing company: questions getting lost, routing taking time, and context switching pulling people away from the work that actually required human expertise. Their solution splits into two layers: an operations agent (Community Guardian) and a research agent (c0).

The Guardian handles the logistics that do not need a human brain. When a new post arrives, it analyzes the content, checks for duplicates using vector similarity, and assigns it to the team member with the right specialty and bandwidth. There is a cap of 10 questions per person before new ones route elsewhere, and stale threads get reassigned after 48 hours. It runs on Vercel Workflows, checking in every 10 minutes and sleeping between cycles.

The research agent, c0, lives in Slack and assembles context packages by searching documentation, GitHub issues, knowledge bases, and past discussions. Instead of a team member relying on memory to answer a question, they get a pre-assembled context package. Beyond individual threads, c0 tracks community sentiment and recurring technical hurdles, providing data for product conversations.

The numbers after 23 days: 4,716 first responses for triage, 1 in 8 ghosted threads revived with 23 confirmed solutions, and 4 duplicate threads detected and auto-closed. But the more interesting story is that the person who built this is a community manager, not an engineer. They described the system to a coding agent in plain English and iterated from there. It is a concrete example of the engineeringification thesis from the PostHog article playing out in practice.

**Key takeaways:**
- Split architecture: operations agent for triage/routing, research agent for context assembly
- 4,716 automated first responses and 23 confirmed solutions from revived threads in 23 days
- Duplicate detection via vector similarity with auto-closing at 95%+ confidence
- Built by a community manager using a coding agent, not by an engineering team
- Every substantial answer still comes from a human; agents handle everything around those answers

**Link:** [Keeping community human while scaling with agents](https://vercel.com/blog/keeping-community-human-while-scaling-with-agents)
