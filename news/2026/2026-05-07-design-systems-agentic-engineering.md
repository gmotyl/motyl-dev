---
title: "Design Systems in the Age of Agentic Engineering"
excerpt: "A first designer at an AI-native company rethinks what design systems mean when AI agents and fast-moving engineers ship production code without waiting for specs."
publishedAt: "2026-05-06"
slug: "design-systems-agentic-engineering"
hashtags: "#kilo #designsystems #agents #agentic #devtools #generated #en"
source_pattern: "Kilo"
---

## Design Systems for Agentic Engineering

**TLDR:** When engineers and AI agents ship multiple times a day without waiting for mockups, traditional design systems built on human interpretation fail. One designer's answer is to treat design documentation as infrastructure, writing machine-actionable specs that agents and fast-moving humans can actually consume.

**Summary:** Ivan is the first designer at Kilo, an AI-native company where engineers ship features at what he calls "agent speed." There was no design function before him. Features landed anyway, PRs merged constantly, and nobody waited for a Figma file. He arrived into that reality with a stark choice: become a pixel janitor cleaning up after a firehose, or produce beautiful specs that are technically perfect and aesthetically impeccable but completely irrelevant because the feature shipped on Tuesday and everyone moved on.

He rejected both options and started asking a harder question: what does a design function actually look like when your colleagues include AI agents producing production code? The answer he's working toward is that documentation has to become infrastructure. The design system cannot be a reference document that a thoughtful human interpreter translates into good UI. When the humans are moving too fast to check a Figma file and the agents will ingest whatever text they're given, the system itself has to be specific enough to act on directly.

This means DESIGN.md becomes as important as README.md. Not "we value simplicity and human-centered design" but "form labels are sentence case, never title case" and "error states always include a suggested action, not just a description of what went wrong." The difference between those two kinds of sentences is the difference between a mood board and an executable specification. One can be ingested and acted on; the other just captures vibes.

The phased approach he's sketching out starts with an audit of what actually exists rather than what was intended. Inconsistent button styles across surfaces, spacing that varies by who wrote the component, color usage that drifted from the original intent. That baseline then feeds into a DESIGN.md written for agents as much as humans, then custom workflow skills that embed "the right way" into the tooling so engineers reach for the correct primitive by default. Eventually, he wants automated drift detection in PRs, the same way linters catch code style violations.

There are real open questions he hasn't solved. How much process can a velocity culture absorb before you kill the thing that makes it effective? How do you write design guidance that actually takes positions instead of flattening everything into useless generalities? At what level of abstraction should a "skill" operate? Component, flow, pattern, or taste? And how do you calibrate a drift linter so it doesn't cry wolf on every minor variation while still catching the problems that matter?

**Key takeaways:**
- Design documentation needs to be machine-actionable, not just human-readable, when AI agents are part of the build pipeline
- DESIGN.md should contain specific, opinionated rules that leave no room for interpretation, not brand philosophy statements
- The long-term goal is to set the policy, build the automated reviewers, then review the reviewers — not to personally inspect every shipped pixel
- Baseline audits of what actually shipped matter more than idealized specs of what should have been built
- Embedding design decisions into workflow tooling changes behavior without adding process friction

**Why do I care:** This resonates because frontend architects have always faced the gap between the design system you document and the design system that actually runs in production. What's genuinely new here is that the audience for your documentation has changed. You used to write for humans who bring judgment. Now you're writing for agents that bring compliance. An agent won't notice that your DESIGN.md is vague; it will just do something plausible and wrong at scale, across every component, every day. The implication is that design documentation has to achieve a level of precision we usually associate with type systems or API contracts. That's a higher bar, but also a clearer one. I'd argue most design systems fail not because engineers ignore them, but because the guidance was never precise enough to be followed in the first place. Agents just make that failure visible faster.

**Link:** [Design Systems for Agentic Engineering](https://blog.kilo.ai/p/design-systems-for-agentic-engineering)
