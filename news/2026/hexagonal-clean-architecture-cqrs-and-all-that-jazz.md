---
title: "Hexagonal, Clean Architecture, CQRS and All That Jazz"
excerpt: "Oskar Dudycz challenges the ceremony of Clean Architecture and Hexagonal patterns, arguing that CQRS offers a simpler, more business-focused alternative -- especially in the age of AI coding agents."
publishedAt: "2026-02-09"
slug: "hexagonal-clean-architecture-cqrs-and-all-that-jazz"
hashtags: "#substack #architecture #cqrs #clean-architecture #ai #dx #backend #generated #en"
---

## Hexagonal, Clean Architecture, CQRS and All That Jazz

**TLDR:** Oskar Dudycz shares his Devoxx Poland 2023 talk where he critiques Clean Architecture and Hexagonal Architecture, arguing their ceremonial overhead actively hurts productivity. He makes the case that CQRS, in its simplest form, provides a better alternative -- and that this matters even more now that AI coding agents are part of the picture.

**Summary:**

Oskar Dudycz, the author behind Architecture Weekly, opens with a candid note: he is under the weather this week, so instead of a regular newsletter release, he is sending along a conference talk he gave at Devoxx Poland in 2023. But do not let the casual framing fool you -- the content lands some serious punches on patterns many teams treat as gospel.

The talk covers the well-trodden ground of Hexagonal Architecture, Clean Architecture, and CQRS, but with a contrarian twist. Dudycz goes after the ceremony baked into Clean Architecture and, to a lesser extent, Hexagonal patterns. He shows code examples from the conference stage that look deliberately absurd and over-engineered -- except, as he notes, he has seen exactly this kind of code repeatedly in his consulting work. That is the devastating part. What looks like a strawman on stage turns out to be a faithful mirror of real production codebases. The talk is polarizing: viewers rate it either five stars or one star, with very little in between. That kind of bimodal reaction usually means someone is saying something uncomfortably true.

His core argument is that CQRS, stripped down to its essence, offers a cleaner separation of concerns without all the indirection layers that Clean Architecture demands. Instead of mapping through ports, adapters, use cases, and entities in their prescribed layers, you split your system along command and query responsibilities. The business intent becomes the organizing principle rather than technical abstraction layers. That is a meaningful philosophical shift: organizing by what the system does rather than by what kind of code it is.

Where things get particularly interesting is Dudycz's observation about the GenAI era. He argues that the simplicity and reduced cognitive load he advocated in 2023 matter even more now. When AI coding agents are writing and modifying code, fewer moving parts and a business-oriented split (rather than technical layers) let teams iterate faster. This is an insight many architecture discussions are still catching up to. If your architecture requires understanding five layers of indirection to make a change, your coding agent is going to struggle just as much as a junior developer would. The code structure becomes the bottleneck for both human and machine comprehension.

What Dudycz does not fully address -- and this is worth thinking about -- is the specific scenarios where the layering of Clean Architecture genuinely pays off: large teams with strict boundary enforcement needs, or systems where swapping infrastructure components is a regular occurrence. CQRS solves a different set of problems, and the choice between them is not always straightforward. He also sidesteps the question of how CQRS handles the eventual consistency trade-offs that come with separating reads and writes at scale. The talk is clearly meant to provoke, and it succeeds, but the "when to use what" nuance could use more airtime.

**Key takeaways:**

- Clean Architecture and Hexagonal patterns often introduce ceremony that does not translate into real business value, especially in smaller to mid-sized systems
- CQRS, in its simplest form, organizes code by business intent (commands vs. queries) rather than technical layers, reducing cognitive load
- In the era of AI coding agents, architecture simplicity is not just a developer experience issue -- it directly affects how well automated tools can navigate and modify your codebase
- Polarizing reactions (five stars or one star) to architecture critiques usually signal the argument is hitting a nerve worth examining

**Tradeoffs:**

- Adopting CQRS gains business-aligned code organization but sacrifices the infrastructure swappability that layered architectures provide
- Reducing architectural ceremony gains iteration speed but sacrifices the explicit boundary enforcement that large teams may need
- Simplifying for AI agent comprehension gains automation velocity but may sacrifice architectural patterns that protect against certain classes of errors

**Link:** [Hexagonal, Clean Architecture, CQRS and all that jazz - Devoxx Poland 2023](https://www.youtube.com/watch?v=9COWKz1E32w)
