---
title: "Distributed Systems, Tradeoffs, and the Second Edition of DDIA with Martin Kleppmann"
excerpt: "Martin Kleppmann discusses the newly updated second edition of Designing Data-Intensive Applications, lessons from building startups, and how LLMs might finally make formal verification practical."
publishedAt: "2026-04-23"
slug: "distributed-systems-tradeoffs-ddia-martin-kleppmann"
hashtags: "#substack #distributedsystems #softwareengineering #architecture #generated #en"
source_pattern: "Substac"
---

## Designing Data-Intensive Applications with Martin Kleppmann

**TLDR:** Martin Kleppmann, author of the widely-read Designing Data-Intensive Applications, joined The Pragmatic Engineer podcast to talk about the second edition of his book, how the cloud has changed distributed systems thinking, and why formal verification might finally get its moment in the sun thanks to LLMs. It is a broad, honest conversation that covers everything from startup war stories to the strange tension between academia and industry.

**Summary:**

The conversation opens with Martin's backstory, which is worth understanding because it shapes everything else he says. He built Rapportive, a Gmail plugin that showed social profile data inline in emails, eventually sold it to LinkedIn, and then spent time inside LinkedIn watching Kafka get built from scratch. That proximity to a real large-scale data infrastructure system gave him the mental models he later structured into the book. He did not start writing from theory. He started writing because he and his team at Rapportive were "drowning" in database performance decisions with no vocabulary to reason about them, no map of the territory. The book became the map he wished he had had.

What I find most useful about his framing is the distinction between books written for people who build databases versus books written for people who use them. DDIA is firmly in the second camp. It is not trying to turn you into a database internals engineer. It is trying to give application developers enough intuition about what is happening under the hood that they can make better decisions and debug problems faster. That is a genuinely different goal, and it is why the book works across so many experience levels.

On the cloud and scaling, Martin makes a point that deserves more attention than it typically gets: sharding, which the first edition covered extensively, is increasingly a specialist concern. Modern machines are bigger, managed databases handle a lot of what used to require manual partitioning, and most teams never need to think about it. Replication for fault tolerance, on the other hand, is still very much everyone's problem at every scale. He also makes the point that scaling down, building a system that gracefully sheds capacity when traffic drops, is genuinely as hard as scaling up and gets far less attention in the engineering conversation.

The part of the conversation I found most interesting was on formal verification. Martin spent his industry career never using it because it was simply too expensive in time and attention. His recent writing argues that two things happening simultaneously change that calculus: LLMs are generating so much code that human review is becoming the bottleneck, and LLMs are getting increasingly capable at writing formal proofs. If both trends continue, we get a world where the bottleneck is not writing the proof but deciding which properties are worth proving. That is a genuinely different future for software correctness, and it is worth taking seriously rather than dismissing as academic.

There is also a thread through the whole conversation about the relationship between industry and academia that Martin is unusually well-positioned to comment on. He has worked seriously in both. His observation that each field tends to dismiss the other, industry calling academic work theoretical and academia calling industry work mere engineering, is accurate and frustrating. The best engineers he knows have done both. The best researchers have shipped real software. The gap is artificial and costs both sides.

**Key takeaways:**

- The second edition of DDIA cuts most MapReduce coverage because practically nobody uses it anymore; Spark and Flink have replaced it, though MapReduce is kept as a conceptual reference for understanding partitioned batch systems.
- Multi-region and multi-cloud are risk versus cost tradeoffs, not universal best practices; the right answer depends on your business, not on what someone put in a blog post about resilience.
- Sharding is increasingly a specialist concern on modern cloud infrastructure; replication for fault tolerance is still relevant at every scale.
- LLMs may accelerate adoption of formal verification by reducing the cost of writing proofs, particularly as AI-generated code outpaces human review capacity.
- Local-first software is technically fascinating and genuinely hard: decentralized access control without a central server to arbitrate produces edge cases like concurrent edits from revoked users that are surprisingly difficult to resolve correctly.
- Engineers need to surface societal and reputational risks to decision-makers, not just technical tradeoffs.

**Why do I care:** I have been recommending the first edition of DDIA for years to every developer who asks me what they should read to get better at systems thinking. The fact that the second edition is out and updated for a world where most teams run on managed cloud services matters. The sharding caveat alone, the acknowledgment that most developers do not need to think about it anymore, is an honest update that a lot of older systems content refuses to make. What I appreciate most about Martin's approach is that he refuses to turn engineering decisions into best practices. Multi-region is not a best practice. Replication is not a best practice. They are tradeoffs, and the engineer's job is to give business leaders the vocabulary to make the call, not to make it for them. That is a more honest and more useful framing than most of what gets written about distributed systems.

**Link:** [Designing Data-Intensive Applications with Martin Kleppmann](https://newsletter.pragmaticengineer.com/p/designing-data-intensive-applications?publication_id=458709&post_id=194990093&play_audio=true&triedRedirect=true)
