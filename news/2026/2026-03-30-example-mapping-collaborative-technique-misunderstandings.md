---
title: "Example Mapping: The Collaborative Technique That Catches Misunderstandings Before They Cost You"
excerpt: "Oskar Dudycz walks us through Example Mapping — a structured 25-minute conversation format that turns vague business requirements into concrete, testable examples before a single line of code is written."
publishedAt: "2026-03-30"
slug: "example-mapping-collaborative-technique-misunderstandings"
hashtags: "#substack #architecture #bdd #eventstorming #ddd #generated #en"
source_pattern: "Substac"
---

## The One Where Oskar Explains Example Mapping

**TLDR:** Example Mapping is a lightweight, structured conversation technique created by Matt Wynne that helps small cross-functional teams break down user stories into concrete examples, business rules, and open questions in under 30 minutes. Oskar Dudycz walks us through the technique using a hotel checkout scenario, revealing how quickly hidden requirements and edge cases emerge when you anchor discussion in real examples rather than abstract descriptions.

**Summary:**

Oskar opens with a disarming observation about cultural references aging out — his Friends-based workshop analogies no longer land with younger attendees — and uses that moment of awkwardness to introduce the topic. It is a clever rhetorical device, but it is worth noting that the self-deprecating opener takes up a non-trivial amount of space before the actual content begins. That said, the hotel checkout walkthrough that follows is genuinely instructive.

The scenario starts simply enough: a guest approaches the desk, the clerk checks whether the balance is settled, and checkout proceeds. But the moment Oskar starts asking what "balance settled" actually means, the story begins to unravel productively. The answer — "the difference between all charges and payments equals zero" — immediately surfaces a hidden assumption: what if the guest never paid upfront? That single question spawns an entirely new feature: payment registration during checkout. This is the core insight of Example Mapping. Abstract language in requirements hides complexity. Concrete examples expose it.

As the walkthrough continues, each new example generates more questions. Business rules emerge about credit card validity and cash-first policies. Edge cases appear around payment gateway failures, offline scenarios, and what happens when the guest has no cash at all. By the end, the shift manager authorization flow and delayed charge registration have appeared — none of which were visible in the original requirement. The technique's power is precisely this: it makes implicit knowledge explicit by forcing everyone in the room to think through what actually happens in a specific situation, not what theoretically should happen in the general case.

Oskar is careful to point out that Example Mapping does not require elaborate tooling or ceremony. You do not need sticky notes or a facilitation kit. A plain text Given/When/Then structure is sufficient, and the business does not even need to provide examples in that format — you can derive it yourself during conversation. What matters is the multi-perspective discussion itself. When a developer, a tester, and someone from the business side each bring their own mental model to a single concrete example, the gaps become visible almost immediately.

One thing the article is somewhat quiet about is failure modes. What happens when the business stakeholder cannot articulate rules clearly, or when examples keep multiplying without converging? Oskar mentions that too many open questions (red cards in the original color scheme) signals the story is not ready, and too many examples (blue cards) suggests the story is too large — but these are heuristics, not strategies. How you recover a session that has gone off the rails is left as an exercise for the reader. There is also an implicit assumption that you have access to a business stakeholder who can answer questions in real time. In many organizations, that access is the actual bottleneck, and Example Mapping cannot solve that organizational problem for you.

**Key takeaways:**

- Example Mapping surfaces hidden business rules, edge cases, and unknown features through structured conversation around concrete examples, not abstract descriptions
- A session requires only a developer, a tester, and a business representative — 25 to 30 minutes, no elaborate tooling
- The Given/When/Then format (familiar from BDD) maps naturally onto Example Mapping outputs, making the transition to executable specifications straightforward
- The technique serves as a readiness signal: if examples are not flowing easily or questions pile up unresolved, the story is not ready for development
- Example Mapping integrates well with Event Storming — Oskar deliberately aligned the color schemes to reduce cognitive friction when combining both techniques
- It can be used beyond requirements gathering: as a brainstorming tool, a model-challenging exercise, or a facilitation aid within the team itself

**Why do I care:**

From a senior frontend developer and architect perspective, the value here is not just in catching requirements bugs early — it is in the forcing function it creates for cross-functional communication. Too often, frontend teams receive designs and specifications that have never been stress-tested against real edge cases. Example Mapping is a practical mechanism to demand that rigor before implementation begins. The BDD alignment is also directly actionable: examples produced in these sessions can feed directly into acceptance test definitions, which means the investment in the conversation pays dividends in test coverage as well. The integration with Event Storming is worth exploring seriously if your team already uses that technique — having a shared color vocabulary across modelling sessions reduces the translation overhead that typically slows down collaborative design work.

**Link:** [The one where Oskar explains Example Mapping](https://www.architecture-weekly.com/p/the-one-where-oskar-explains-example)
