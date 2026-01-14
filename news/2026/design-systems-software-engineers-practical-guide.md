---
title: "Design Systems for Software Engineers: Building Reusable Component Libraries"
excerpt: "A practical deep-dive into how Rubrik built their Aura Design System Library - from the 'college project' wake-up call to 90+ React components that won industry recognition."
publishedAt: "2026-01-13"
slug: "design-systems-software-engineers-practical-guide"
hashtags: "#substack #frontend #react #css #architecture #testing #dx #generated #en"
---

## Design Systems for Software Engineers

**TLDR:** A design system is more than a style guide - it's a unified source of truth for design and engineering that speeds delivery, raises quality, and lets more developers contribute to the frontend. Building one involves far more decisions than expected, even for simple components like buttons.

**Summary:**

This piece from Pragmatic Engineer, written by Michael Abernethy who has 25+ years of UI experience and leads Rubrik's design system engineering team, is one of the most practical guides to building design systems I've seen. It starts with a story that'll resonate with many teams: the CTO casually remarked that the product looked "like a college project" - and he was right.

The insight about why this matters is worth internalizing: if you want to charge enterprise prices, your software needs to look like an enterprise product. It would be hard to entice an enterprise to pay $1M/year for software that looks like it uses a free Bootstrap theme with default colors. That "premium feel" isn't just aesthetic preference - it's business reality.

The section on building a button component is eye-opening. Just the first six decisions - background color, text color, height, border radius, shadows, and font - can take an hour to discuss. But that barely scratches the surface. A proper button also needs decisions about: additional color options for less important actions, border thickness, icon placement and spacing, keyboard navigation appearance, hover and click states, loading animations, disabled states, mobile adaptations, accessibility for color blind users, and localization for different languages and right-to-left writing systems. All that for one component - and a simple design system has 15-20 components, while a complex one has 50-100.

The step-by-step process at Rubrik is instructive: UX researchers gather feedback and create requirements, designers translate that into Figma components, then design system engineers (DSEs) review from an engineering perspective before coding. The DSE review is particularly valuable - checking for CSS impossibilities, scalability issues, performance degradation, edge cases, accessibility, and localization.

The testing approach using Chromatic deserves special attention. It's a visual regression testing tool that takes screenshots of every component in every browser and theme combination, comparing against previous snapshots to flag pixel differences. At Rubrik, Chromatic runs on every PR that touches design system files and has prevented 100+ bugs from shipping to production. Without it, most of those changes would have slipped through and been discovered later.

The AI section is refreshingly honest: AI can write unit tests effectively (with high code coverage from short prompts), but generating a complete, well-designed, complex design system library from a single prompt isn't possible today. AI damages the work when asked to create consistent visual systems because it lacks the contextual understanding of brand identity and cross-component consistency.

**Key takeaways:**
- A design system is the unifying source of truth: rules, patterns, colors, fonts, reusable components, and documentation
- Building even a simple button component requires dozens of decisions across states, accessibility, and localization
- Design system libraries enable faster delivery, higher quality, and let more developers contribute to frontend work
- Visual regression testing with tools like Chromatic prevents bugs that would otherwise slip through code review

**Tradeoffs:**
- Upfront investment in design system engineering but faster feature delivery once established
- Standardized components enable consistency but reduce flexibility for one-off designs

**Link:** [Design Systems for Software Engineers](https://newsletter.pragmaticengineer.com/p/design-systems-for-software-engineers)

---

*The summaries provided are based on newsletter content and represent interpretations of the original articles. Readers should consult the original sources for complete technical details and authoritative information.*