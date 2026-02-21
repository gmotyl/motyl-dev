---
title: "Identity Resolution at Kilo Speed: How AI Agents Became the Data Quality Layer"
excerpt: "A deep dive into how a one-person data team shipped an identity resolution system using AI agents as quality reviewers, not just code generators."
publishedAt: "2026-02-20"
slug: "identity-resolution-kilo-speed-ai-agents-data-quality"
hashtags: "#substack #ai #agents #architecture #data #engineering #productivity #generated #en"
---

## Inside Kilo Speed: How a Head of Data Shipped an Identity Resolution System Before His First Full Day

**TLDR:** Pedro Heyerdahl, Head of Data at Kilo, used AI agents not just to write code but as a full quality layer to ship a seven-tiered identity resolution system before his first official day. The key insight is that giving agents deep, durable context about how data is produced -- not just how it is stored -- transforms them from unreliable code generators into effective peer reviewers for data work.

**Summary:**

Identity resolution is one of those problems that sounds straightforward until you actually try to do it. You have telemetry systems, backend databases, payment platforms, and marketing forms, each with their own notion of what a "user" is. Stitch them together incorrectly and you end up silently overcounting users, inflating metrics, or generating revenue reports that do not match reality. The terrifying part is that you might not discover the problem for weeks, until a stakeholder notices a number that does not add up and triggers a multi-day forensic investigation. This is the kind of problem where AI can be genuinely dangerous if applied naively -- a query can compile, CI can go green, and everything looks fine while your downstream KPIs quietly drift by five percent.

What makes Pedro's approach at Kilo interesting is a fundamental reframing of the AI agent's role. Rather than treating agents as code generators that produce SQL scripts for a human to review and debug, he positioned them as a quality layer. He built a seven-tiered matching system that checks for perfect ID matches first, then falls back through email hashes, session tokens, and other identifiers. But the real breakthrough was not the matching logic itself -- it was how he bootstrapped context for the agents. He gathered transcripts from every relevant meeting, dumped them into a folder, and told the agent to build a memory bank. Crucially, he gave the AI access to the backend application code that generates telemetry, not just the dbt modeling layer. This meant the agents understood how data was being produced, not merely how it was being stored. That distinction is everything in data work.

The review process deserves particular attention. Pedro leans on Kilo's Review Agent, which does not just check syntax -- it checks for data impact. He writes PR descriptions that cover what changed, why it changed, what could move downstream, and what to sanity check. In one case, the review agent pulled context from the memory bank and flagged a contradiction during a deduplication refactor: the system relied on semantic deduplication because network retries create duplicates with different IDs. Had that change shipped, duplicate events would have leaked into usage models and inflated counts. That is the kind of catch that typically requires a seasoned data engineer who remembers obscure edge cases discussed months ago in a meeting.

For architects and team leads, there is a pattern here worth extracting. The approach of treating your documentation and context repositories as the "source of truth" for AI agents is applicable far beyond data work. If you have a codebase where critical business rules are scattered across meeting notes, Slack threads, and tribal knowledge, the act of consolidating that context into a durable, agent-accessible format pays dividends regardless of whether you are doing identity resolution or building microservices. The PR description discipline -- explaining blast radius and downstream impact, not just the code diff -- is something every team should adopt, with or without AI reviewers.

One thing the article does not deeply explore is the failure modes when context drifts. Memory banks are only as good as their maintenance. If meeting transcripts stop being added, or if the production code changes without the context being updated, the agents will develop blind spots. Pedro's approach works beautifully as a one-person team where he controls the entire pipeline, but scaling this to a larger data organization introduces coordination challenges that deserve honest examination. The article also sidesteps the question of how much of this velocity comes from the AI tooling versus Kilo's organizational culture that mandates AI usage for everything -- disentangling those factors would be valuable for teams trying to replicate these results.

**Key takeaways:**

- Identity resolution is a domain where AI can cause silent downstream damage if agents lack deep context about data production, not just data storage
- Giving AI agents access to the backend application code that generates telemetry, not just the transformation layer, is what enables them to make correct joins across fragmented data systems
- Consolidating meeting transcripts, business rules, and domain knowledge into a durable memory bank transforms AI agents from code generators into effective peer reviewers
- PR descriptions that explain blast radius and downstream data impact are essential for meaningful AI-assisted code review in data work
- A one-person data team can operate at high velocity by building self-service agents that let stakeholders query data directly through tools like Slack

**Tradeoffs:**

- Treating AI agents as a quality layer gains velocity for a solo practitioner but sacrifices the shared human understanding that comes from collaborative code review with other engineers
- Consolidating context into a memory bank gains deep agent reasoning but requires ongoing maintenance to prevent context drift as systems evolve
- Building self-service Slack agents for stakeholders reduces ad-hoc query load but shifts the risk surface to agent-generated answers that may lack nuance

**Link:** [Inside Kilo Speed: How Our Head of Data Shipped an Identity Resolution System Before His First Full Day](https://blog.kilo.ai/p/inside-kilo-speed-how-our-head-of)
