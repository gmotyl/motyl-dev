---
title: "Example Mapping: The Structured Conversation That Saves You Weeks of Rework"
excerpt: "Oskar from Architecture Weekly walks through Example Mapping — a lightweight, 25-minute collaborative technique that surfaces missing business rules, hidden features, and assumption gaps before a single line of code is written."
publishedAt: "2026-03-30"
slug: "example-mapping-structured-conversation-saves-rework"
hashtags: "#ArchitectureWeekly #ExampleMapping #BDD #EventStorming #DomainDrivenDesign #generated #en"
source_pattern: "Substac"
---

## Example Mapping: The Structured Conversation Technique That Surfaces What You Don't Know Yet

**TLDR:** Example Mapping is a structured, time-boxed collaboration format where a developer, tester, and business stakeholder spend 25–30 minutes breaking down a user story through concrete examples. It was created by Matt Wynne and integrates naturally with BDD and Event Storming. The technique turns vague business descriptions into precise, testable scenarios — and it consistently reveals features and rules no one knew were missing.

**Summary:** There is a particular category of expensive software failure that does not come from bad code or poor architecture — it comes from building the wrong thing with total confidence. You coded exactly what was asked for, passed all the tests, and shipped on time, only to discover that the business rule you missed in week one has now caused a two-week rework in week four. This is the gap that Example Mapping is designed to close, and it does so with almost comical simplicity.

The technique works by taking a single user story and gathering a small group — typically one developer, one tester, and one person from the business side — and spending no more than 25 to 30 minutes walking through it using concrete examples. You do not need sticky notes, elaborate tooling, or a workshop room. Plain text following the Given/When/Then pattern is sufficient. What matters is the conversation itself, and specifically the moments where the conversation breaks down. Those breakdowns are the signal.

Oskar demonstrates this with a hotel checkout scenario that looks trivially simple on its surface: a guest approaches the desk, the clerk checks whether the balance is settled, and if it is, checkout proceeds. Within minutes of probing with concrete examples, the team uncovers that "balance settled" requires defining a payment registration flow that did not exist in the original story. Then, when they ask what happens if payment fails, they discover that network unavailability requires a cash fallback, and that if the guest has no cash, a shift manager can authorise an unsettled balance checkout with a delayed charge — which itself requires double-entry bookkeeping logic. None of this was in the original spec. All of it was always true.

This is where the challenge to the technique's framing is worth raising: Oskar presents Example Mapping as a discovery tool, which is accurate, but it is also worth being direct about what it is discovering. It is not discovering new requirements — it is discovering requirements that were always there and were simply never articulated. The business knew the shift manager could authorise unsettled checkouts. The business knew about the payment gateway failure scenario. The technique's value is not that it generates knowledge; it is that it forces the transfer of tacit knowledge into explicit, shared form before it causes damage.

The colour scheme Oskar uses is deliberately aligned with Event Storming notation, which is a thoughtful practical choice rather than just aesthetic preference. If your team already uses Event Storming for domain modelling, aligning the visual language means the outputs from an Example Mapping session slot directly into your broader modelling work without translation overhead. The Given/When/Then structure also maps cleanly onto BDD tooling, meaning that a well-run Example Mapping session can produce the raw material for executable specifications — not just documentation that drifts from reality the moment it is written.

**Key takeaways:**
- Example Mapping is a 25–30 minute, three-role structured conversation (developer, tester, business) over a single user story
- It uses concrete examples in Given/When/Then format to surface hidden business rules, missing features, and conflicting assumptions
- Too many unresolved questions (red cards) means the story is not ready; too many examples means it is too large to tackle as one story
- It integrates naturally with Event Storming and BDD, making it a useful bridge between domain discovery and test specification
- The technique works just as well as a solo brainstorming tool before a stakeholder conversation as it does in a group session

**Why do I care:** As a senior developer or architect, you have almost certainly shipped something that was technically correct but behaviourally wrong — and you probably found out about it at the worst possible moment. Example Mapping does not promise to eliminate that problem, but it does move the discovery cost from post-deployment to pre-implementation, which is roughly a ten-to-one improvement in remediation cost depending on your codebase. What makes it worth taking seriously is that it requires no process overhead to adopt. You do not need buy-in from a department, a new tool license, or a two-day workshop to run it. You need thirty minutes, three people, and the discipline to ask "can you give me a concrete example of that?" every time someone uses an abstract term. The catch — and Oskar does not emphasise this enough — is that it only works if the business representative in the room actually has the authority or knowledge to answer the questions you surface. Many teams will run this session and generate a pile of red cards that then sit unanswered for a sprint. The technique surfaces the gaps; closing them still requires organisational will.

**Link:** [The one where Oskar explains Example Mapping](https://www.architecture-weekly.com/p/the-one-where-oskar-explains-example)
