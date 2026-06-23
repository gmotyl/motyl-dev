---
title: "Follow the Money to Get a Better Design"
excerpt: "Understanding who pays you is one of the most underrated design tools in software architecture. Oskar Dudycz makes the case that distinguishing clients from users — and optimizing for the right one — is what separates good design from over-engineered noise."
publishedAt: "2026-06-22"
slug: "follow-the-money-better-design"
hashtags: "#architecture #engineering #backend #systemdesign #productthinking #softwaredevelopment #generated #en"
source_pattern: "OskarDudycz"
---

## Follow the Money to Get a Better Design

**TLDR:** Most developers optimize for users when they should optimize for clients — the people actually paying for the system. Understanding this distinction is foundational to making sound design tradeoffs. Empathy for the business model is not cynicism; it's good engineering.

**Summary:**

There's a question that should sit at the heart of every system design conversation, and almost nobody asks it: who is actually paying for this thing to exist? Oskar Dudycz revisits a piece he wrote some time ago on exactly this tension, prompted by a recurring conversation he keeps having with developers who design for the wrong stakeholder.

The distinction between client and user is deceptively simple. Take a platform like Shopify: the users are shoppers, but the clients — the ones cutting the checks — are the merchants. This isn't a subtle semantic difference; it's the axis around which every meaningful tradeoff rotates. If you optimize for shoppers at the expense of merchant satisfaction, you lose the revenue stream that keeps the lights on. Google's search is a textbook reinforcement loop here: you need users to attract advertisers, but users alone don't pay the bills. Conflating the two leads to product decisions that feel user-centric but are economically fragile.

Dudycz isn't advocating for ignoring user needs — far from it. His argument is more nuanced: user satisfaction and client satisfaction often overlap, and when they do, that's your sweet spot. But when they diverge, you need a framework for prioritization, and "follow the money" is a surprisingly effective heuristic. Ask yourself: when will my client be disappointed? When will my user be disappointed? And critically — will user disappointment cascade into client disappointment? That chain of causality is your design compass.

What makes this framing valuable beyond budgeting is that it's actually an empathy exercise. When you trace the business model, you start seeing real people and real stakes behind abstract requirements. That visibility tends to produce more resilient, appropriately-scoped systems — ones that aren't over-engineered because someone wanted to use a cool tech stack, but designed around actual business survival. Boring tech, as Dudycz notes, tends to win precisely because it emerged from this kind of constraint-aware thinking.

There's also a forward-looking dimension here. As AI tools commoditize the ability to "just write code," the developers who understand business context — who can trace the money and reason about tradeoffs at the product level — will have durably differentiated value. Empathy for business models may turn out to be the career moat that pure technical skill is not.

**Key takeaways:**
- Distinguish between **clients** (who pay) and **users** (who interact) — they are rarely the same stakeholder
- Optimize for client satisfaction first; include user needs to the extent they reinforce client value
- Use "follow the money" as a structured risk-finding technique, not just a business platitude
- Understanding business models leads to better-scoped, less over-engineered systems
- Boring, constraint-aware tech tends to outlast clever, user-delighting tech that has no business model backing it
- Empathy for clients and business context is an increasingly scarce skill as AI handles routine coding

**Why do I care:** This is a piece I wish I'd read earlier in my career and still think about regularly. The failure mode Dudycz is describing — designing for users while ignoring clients — is everywhere, and it's responsible for a staggering amount of complexity that gets built for the wrong reasons. When you don't know who's paying, you end up building for everyone, which means you're actually building for no one in particular. The architecture becomes a referendum on preferences rather than a solution to a business problem. Tracing the money isn't cynical engineering; it's honest engineering. And yes, in a world where Copilot can write your CRUD layer, being able to ask "but why are we building this and for whom?" is exactly the kind of thinking that keeps a senior engineer relevant.

**Link:** [Follow the money to get a better design](https://substack.com/redirect/416a8f20-727f-41aa-81e1-9616a0650543?j=eyJ1IjoidGIyeHgifQ.cAeV0Wf58qGhizTnFG9XUT1f_ZzTflR8ugMcaWDmXpc)
