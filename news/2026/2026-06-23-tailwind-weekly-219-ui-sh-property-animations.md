---
title: "Tailwind Weekly #219: ui.sh goes local-first, mastering @property, and animations that actually feel good"
excerpt: "This week: the Tailwind CSS team ships a curated prompt toolkit for UI builders, CSS @property finally gets its moment in the sun, and we get a masterclass in what separates good animations from great ones."
publishedAt: "2026-06-20"
slug: "tailwind-weekly-219-ui-sh-property-animations"
hashtags: "#tailwind #css #frontend #animations #designsystems #webcomponents #shadcn #cssanimations #generated #en"
source_pattern: "Tailwind Weekly"
---

## ui.sh — Agent Skills for Interface Builders

**TLDR:** The team behind Tailwind CSS and Refactoring UI launched ui.sh, a curated collection of task-oriented AI prompts and workflows specifically for UI development. It's invite-only for now, but the skill list reveals a thoughtful approach to AI-assisted design work. This isn't another generic "generate a component" tool — it's opinionated, structured, and built by people who clearly know what bad AI-generated UI looks like.

**Summary:** When the Tailwind CSS creators ship something, it's worth paying attention. ui.sh frames itself as "agent skills for interface builders" and that framing matters — these aren't open-ended prompts, they're task-scoped workflows designed to produce results that don't embarrass you. Skills like "Canonicalize Tailwind" (sort, normalize, deduplicate, and resolve conflicting classes) and "Add Dark Mode" (ship dark mode that looks thoughtfully designed, not just inverted) tell you immediately that this was built by people who've seen what happens when you let a model loose on a UI without guardrails.

The "Markup From Image" and "Make Responsive" skills address two of the most tedious, error-prone parts of frontend work. Converting a screenshot into semantic markup is something every developer has done manually a hundred times. Having a purpose-built prompt workflow that understands the constraints of Tailwind and semantic HTML is meaningfully different from asking a general-purpose chat model to do the same thing.

What's interesting here is the product philosophy: rather than building a design tool or an IDE plugin, they're shipping reusable cognitive scaffolding. The skills are the product. That's a bet on AI as infrastructure rather than AI as application, and it's a bet that's much harder to compete with once the quality bar is established.

The invite-only gate is either a quality control mechanism or a demand signal — probably both. Either way, this is worth watching. The Refactoring UI team has a track record of shipping things that quietly reshape how frontend developers think about their work.

**Key takeaways:**
- Built by the Tailwind CSS and Refactoring UI team — pedigree matters here
- Skills include: dark mode, responsive adaptation, Tailwind canonicalization, component refactoring, and markup-from-image
- Invite-only at launch, suggesting controlled rollout for quality
- Framing as "agent skills" rather than "AI features" signals a thoughtful product philosophy

**Why do I care:** The frontend AI tooling space is littered with demos that look impressive until you try to use them on a real codebase. What makes ui.sh credible before it even ships is the team's demonstrated understanding of the specific failure modes in AI-generated UI — class conflicts, dark mode afterthoughts, unsemantic markup. If the skills match the promise, this could be the first AI tool that actually fits into a professional Tailwind workflow rather than creating cleanup work.

**Link:** [ui.sh — Agent skills for interface builders](https://ui.sh/)

---

## Framework-Agnostic Design Systems: A Practical Approach to Web Components

**TLDR:** Andy Bell at Piccalilli makes the case for building design systems on web components rather than framework-specific component libraries, walking through the practical steps of managing, building, and packaging truly portable components. It's a long read that earns every word, treating the reader like a professional rather than a tutorial consumer. The core argument is deceptively simple: your design system shouldn't be held hostage by your JavaScript framework choice.

**Summary:** The design systems boom produced a lot of good ideas and one persistent bad one: that a design system should be built as a React component library (or Vue, or Angular, or whatever framework your team is currently enthusiastic about). Bell calls this out directly and doesn't soften the critique. Framework-specific component libraries create coupling at exactly the layer where you want independence — the layer where design decisions live.

Web components have had a complicated reputation. Early adopters dealt with real browser inconsistencies, the ergonomics were rough compared to framework components, and the tooling ecosystem was sparse. But browser support has matured dramatically, and the core proposition — write once, use anywhere — has never been more relevant as teams increasingly run multiple frontend frameworks in the same organization.

Bell's practical approach is what distinguishes this from most web components advocacy. He covers the actual mechanics: how to structure and package components, what tooling to use, how to handle the gap between what web components offer natively and what teams have come to expect from framework components. The acknowledgment that some baseline knowledge is assumed (HTML, CSS, Node.js, terminal navigation) is refreshingly honest — this isn't a post trying to convince skeptics with oversimplified examples.

The post frames every major heading as "an invitation to go make a brew and touch some grass," which tells you something about the author's relationship with the reader. This is the kind of long-form technical writing that's becoming rare: specific, opinionated, and written by someone who has clearly hit the problems they're describing.

**Key takeaways:**
- Framework-specific component libraries create design system lock-in at the wrong layer
- Web components offer true portability — write once, use in React, Vue, Angular, or vanilla HTML
- Covers packaging and distribution, not just "how to write a web component"
- Assumes working knowledge of HTML, CSS, and Node — written for practitioners, not beginners

**Why do I care:** Every organization I've seen with more than two frontend teams eventually hits the "which framework do we standardize on" conversation, and it's always more political than technical. A design system built on web components sidesteps the politics entirely. The cost is real — you give up some of the ergonomics that framework components provide — but the portability dividend compounds over time. This post gives you the actual roadmap for making that trade-off work.

**Link:** [Framework-agnostic design systems: a practical approach to web components](https://piccalil.li/blog/framework-agnostic-design-systems-part-1/)

---

## Good vs Great Animations

**TLDR:** Emil Kowalski breaks down the specific technical decisions that separate animations users barely notice (in a good way) from animations that feel off without users being able to articulate why. The piece covers origin-aware animations, easing curve selection, spring-based interactions, and knowing which CSS properties to reach for in specific situations. It's the kind of practical detail that you only learn after shipping a lot of animations and noticing what doesn't feel right.

**Summary:** Most developers learn CSS animations from documentation or tutorials that show you the syntax without explaining the craft. You learn that `transition-timing-function: ease-in-out` exists, but not why ease-out is the better default for most UI interactions, or why ease-in feels wrong for elements that are already on screen and moving. Kowalski's post fills exactly that gap, and it does so with interactive examples that let you feel the difference rather than just read about it.

The origin-aware animation section is immediately actionable. When a dropdown opens, users expect it to animate from the trigger element — not from the center of the screen, not from some arbitrary edge. Setting `transform-origin` to match the trigger location sounds obvious once stated, but it's the kind of detail that gets skipped in tutorials. The Radix UI integration tip (using `--radix-popover-content-transform-origin`) shows this applied to a real production scenario.

The section on spring-based interactions addresses something that's genuinely hard to teach: why tying a visual change directly to mouse position feels artificial, and how introducing spring physics via Framer Motion's `useSpring` hook makes the same interaction feel natural. The observation that "nothing in the real world changes instantly" is the conceptual frame that makes the technical choice legible.

Perhaps most useful is the closing point about knowing your tools. The tabs example — where clip-path produces a color transition that feels right in ways that other approaches don't — illustrates that great animation isn't just about adding motion, it's about understanding which CSS properties produce the perceptual result you're after. That level of tool fluency takes time to develop, and posts like this accelerate the curve.

**Key takeaways:**
- `transform-origin` should match the trigger location for contextually correct animations
- Default to `ease-out` for most UI interactions; `ease-in-out` for elements moving across the screen
- Custom easing curves (via easing.dev or easings.co) almost always feel better than built-in CSS curves
- Spring physics (`useSpring` from Framer Motion) makes mouse-position interactions feel natural rather than mechanical
- `clip-path` can solve color transition problems that other approaches can't

**Why do I care:** Animation quality is one of those things where the gap between "acceptable" and "feels great" is entirely in the details, and the details are almost never documented. This post doesn't just tell you what to do — it explains the perceptual reasoning behind each decision. That's the difference between following a recipe and understanding why the recipe works, which is what you need to make good decisions on animations you haven't seen before.

**Link:** [Good vs Great Animations](https://emilkowal.ski/ui/good-vs-great-animations)

---

## Taking a Closer Look at @property in CSS

**TLDR:** With full browser support for CSS `@property` finally within reach, utilitybend takes a thorough look at what it actually enables: typed custom properties, explicit inheritance control, default values, and — crucially — the ability to animate things that were previously unanimatable. The post is part tutorial, part practical exploration, written by someone who admits they're learning alongside the reader. That honesty makes it more useful, not less.

**Summary:** CSS custom properties (variables) have been around long enough that we take them for granted, but they've always had a fundamental limitation: the browser treats them as untyped strings. You can set `--color: red` or `--color: 4` and the browser will faithfully substitute either value without complaint. `@property` changes this by letting you declare the type, inheritance behavior, and initial value of a custom property explicitly, turning what was an untyped substitution mechanism into something much closer to a typed CSS API.

The practical benefits for design systems are significant. Type checking means that invalid values fall back to the declared initial value rather than producing invisible failures. Chrome DevTools now shows warnings for type violations and links directly to the property declaration — the kind of debugging ergonomics that make design system maintenance dramatically less frustrating. When you're shipping a component library consumed by third-party developers, this is the difference between "something looks wrong and I can't tell why" and "DevTools is telling me exactly what the problem is."

The animation section is where `@property` gets genuinely exciting. Animating a CSS gradient has been impossible by default because the browser has no way to interpolate between gradient color values — it treats the entire value as a string and snaps between start and end states. By declaring gradient color values as typed `<color>` properties via `@property`, you give the browser enough information to interpolate smoothly. The same technique applies to `clip-path` animations, `hsl()` hue rotation, and any other case where you're animating a value embedded inside a more complex CSS expression.

The inheritance control feature is more nuanced but equally important for component-based architectures. Being able to set `inherits: false` on a custom property means that each element manages its own value rather than inheriting from the cascade — useful in web components and design systems where you want explicit, predictable behavior rather than cascade-driven defaults.

**Key takeaways:**
- `@property` enables typed CSS custom properties with syntax validation, default values, and inheritance control
- Chrome DevTools 118+ shows type violation warnings directly in the inspector
- Typed custom properties unlock animation of previously unanimatable values: gradient colors, `clip-path` dimensions, `hsl()` hue rotation
- `inherits: false` is useful for web components and design systems where cascade predictability matters
- Full browser support (Chrome, Edge, Safari, Firefox) makes this production-ready in 2026

**Why do I care:** This is one of those CSS features where the surface area looks small and the actual impact is large. The animation use cases alone — gradient transitions, clip-path animations — solve problems that previously required JavaScript or SVG workarounds. For design system authors, typed custom properties change the error model from "silent failure" to "explicit validation," which is a meaningful quality-of-life improvement. This should be in your toolkit now.

**Link:** [Taking a closer look at @property in CSS](https://utilitybend.com/blog/taking-a-closer-look-at-property-in-css/)

---

## ReUI — Shadcn UI Components and Blocks

**TLDR:** ReUI is a free, open-source extension to the shadcn/ui ecosystem offering 1,000+ components and blocks, with compatibility across all five shadcn create styles and support for both Base UI and Radix UI library variants. It's positioned as the component library for teams that want to go further than what the default shadcn setup provides without switching to a paid tier. The community response visible on the site suggests it's found genuine product-market fit.

**Summary:** The shadcn/ui ecosystem has grown into something nobody entirely anticipated — a "copy-paste" component system that became the default starting point for a significant portion of React/Tailwind projects. ReUI sits on top of that foundation and extends it substantially: 1,000+ components covering real-world product flows (data grids with TanStack Table integration, advanced filters, virtualized tables, file uploaders) rather than just design primitives.

What distinguishes ReUI from other shadcn extensions is the dual library support — all components are available in both Radix UI and Base UI variants. This matters because the shadcn ecosystem is in the middle of a transition, and teams making architectural decisions today need flexibility on which underlying primitive library to commit to. Offering both without requiring a fork or a separate installation path is a meaningful quality-of-life decision.

The community testimonials on the landing page are unusually specific and credible. Users mention particular components (data grids, filters, file uploaders, DnD), specific integrations (nuqs, TanStack Table), and concrete time savings on real projects. One comment mentions using it in a "$1B+ app" — the kind of detail that suggests this is being used in production at scale, not just in side projects.

The Shadcn Create compatibility claim means ReUI components should drop into any existing shadcn project without theming conflicts, which removes the biggest barrier to adoption for existing projects. Free and open-source with a potential Pro tier in the pipeline — the pricing model is clear and the community seems to be converting into contributors.

**Key takeaways:**
- 1,000+ components built on shadcn/ui primitives, covering real product flows not just design atoms
- Supports both Base UI and Radix UI variants — future-proofs your primitive library choice
- Compatible with all five shadcn create styles for drop-in adoption on existing projects
- Free and open-source core with active community contributions
- Strong TanStack Table integration for data grid use cases

**Why do I care:** Shadcn/ui solved the "how do I own my components" problem. ReUI solves the follow-up problem: "I own my components, but now I have to build 1,000 of them from scratch." The quality bar implied by the community testimonials and the specificity of the integrations (nuqs, TanStack Table) suggests this is built by people who ship real products, not just demos. If you're starting a shadcn project in 2026, this belongs in your initial setup.

**Link:** [ReUI – Shadcn UI Components and Blocks](https://reui.io/)
