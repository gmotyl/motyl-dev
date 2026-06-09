---
title: "When a Product Owner Becomes a Developer: AI's Role in Closing the Gap"
excerpt: "How Robert Lindgren, a non-engineer product owner at IntraPhone, used AI coding tools to build production features, shift team culture, and redefine what his role means."
publishedAt: "2026-06-09"
slug: "ai-champion-product-owner-engineer"
hashtags: "#kilo #ai #agents #engineering #generated #en"
source_pattern: "Kilo"
---

## When a Product Owner Becomes a Developer: AI's Role in Closing the Gap

**TLDR:** Robert Lindgren is a product owner at IntraPhone, a Swedish home care software company, who used Kilo to build a proof-of-concept replacement system solo over a few weeks. His demonstration converted a skeptical tech lead and kicked off a cultural shift. He's now shipping production features and generating sales documentation directly from the codebase.

**Summary:**

The usual story of AI adoption inside an engineering org goes like this: developers are either the skeptics or the early converts, leadership sets the mandate, and product managers wait to see what shakes out. IntraPhone's story went differently, and the difference came down to one product owner who decided to stop making the case in a meeting and just build the thing.

Robert Lindgren has been at IntraPhone for nearly a decade. The company writes every line of its own software, serving 80 of Sweden's 260 municipalities with home care tooling, and that in-house culture is a genuine competitive edge. It also means the codebase is old, dense, and full of accumulated decisions that made sense at the time. Feature requests were piling up faster than the team could work through them, and Robert knew that no amount of process improvement was going to change the fundamental math.

So he got approval from the CEO to run a solo experiment over a few weeks in late 2025. He used Kilo to build a proof-of-concept replacement: new backend, new web application, route optimization, and mobile apps for iOS and Android. All of it, by himself, without writing production code as part of his day job. He showed it to the team just before Christmas. The tech lead, described as the most skeptical person on the team, was impressed enough that he spent the holiday break rewriting a companion product using the same tools. That rewrite shipped to production in January.

What I find genuinely interesting here is how Robert handled the legacy codebase, which everyone assumed would be the obstacle. It turned out to be an advantage. The AI tools recognized existing patterns in the code and offered to apply them rather than inventing new ones, which meant the output actually fit the codebase rather than introducing inconsistencies a human reviewer would have to catch. He also integrated CodeScene as an MCP to quality-gate everything generated, which is the kind of discipline that separates a credible adoption story from a demo that never makes it to production.

Robert shipped seven features in a recent release cycle, including Android dark mode in roughly four hours, and none of those seven features came back with review comments. He generated a 14-page sales specification directly from the codebase in a single session. He built two company websites from Figma designs. His background is real (Unix since 1995, database administration, infrastructure) but he had not been writing production code in his product owner role until now. That changed. And his read on what this means is straightforward: the role itself is changing because the tools changed what is possible for someone in that role.

**Key takeaways:**
- A non-engineer with a technical background but no active coding role can ship production-quality features when given the right AI tooling and proper quality gates.
- Demonstrating change through working software is more effective than arguing for it in meetings, especially with skeptical senior engineers.
- Legacy codebases are not automatically a liability with AI coding tools; pattern recognition can make existing conventions a guide rather than an obstacle.
- Integrating code quality tools as part of the AI workflow (not as an afterthought) is what makes the output trustworthy enough to pass review.
- The product owner role is expanding in scope because the cost of contributing code directly has dropped significantly.

**Why do I care:**

As a senior frontend developer or architect, the thing worth paying attention to here is not the technology itself but the org structure implication. If your product owners can start shipping code directly, your review pipeline and your definition of who is on the team changes. That is not inherently a threat; Robert's features passed review without comments, which means the quality bar held. But it does mean the boundaries between roles are getting fuzzier, and the teams that figure out how to structure that, who reviews what, how quality gates get enforced, how responsibilities shift, are going to move faster than the teams that treat it as an edge case. The CodeScene integration detail is the one I would pull on. Shipping fast matters. Shipping fast without introducing technical debt is the actual goal.

**Link:** [Your AI Champion Doesn't Have To Be an Engineer](https://blog.kilo.ai/p/your-ai-champion-doesnt-have-to-be)
