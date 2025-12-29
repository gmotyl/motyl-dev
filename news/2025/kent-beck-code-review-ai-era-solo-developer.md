---
title: "Kent Beck on Code Review in the AI Era: Party of One"
excerpt: "Kent Beck explores how AI-assisted coding breaks traditional code review economics and what solo developers actually need from review in 2025"
publishedAt: "2025-12-26"
slug: "kent-beck-code-review-ai-era-solo-developer"
hashtags: "#tidyfirst #code-review #ai #architecture #dx #generated #en"
---

## Party of One for Code Review

**TLDR:** Kent Beck examines how traditional code review—already strained before AI acceleration—completely breaks when a developer works solo with AI coding assistants. He identifies two things that still matter: sanity checks on intent versus implementation, and maintaining structural integrity for both human and AI comprehension.

The history Kent traces here is worth understanding. Michael Fagan's 1976 formal inspection process was meticulous: formal roles, checklists, metrics. Almost nobody actually did it because it felt like a tax audit. What emerged instead was looser code review—borrowing the insight that other humans catch what you miss, while dropping the formality.

Open source strengthened the case for review. You couldn't trust anonymous contributors not to break things or damage design. You couldn't count on synchronous availability. Code review became a signal of maturity. Skipping it marked you as irresponsible.

But here's the uncomfortable truth Kent surfaces: even this lighter-weight approach was already failing before AI accelerated everything. The theory was synchronous collaboration. The reality was PRs sitting for days while context decayed. Reviewers skimming because they had their own work. "LGTM" culture—rubber stamping dressed as process. The feedback loop got too slow to catch structural problems, and by the time someone noticed, three features had been built on top of the rot.

Now Kent works on a beach with what he calls "a genie." The economics don't just strain—they break completely. AI produces code at a pace no human reviewer can match. Coding isn't the bottleneck. He can explore three implementations before lunch. Who reviews all this? Not former colleagues with their own work. Not himself in a reviewer role when he's already the author.

What actually matters in this new situation? Two things. First, a sanity check: does this change do what I intended? When generating code fast, it's easy to lose track of what you asked for versus what you got. The AI is helpful and confident. It produces things that look right. But "looks right" and "is right" aren't the same.

Second, and more interesting: structural drift. Is the codebase staying manipulable? This matters in a new way. When working with AI assistance, code needs to stay in a form the AI can understand and modify. For that to be true, it needs to stay in a form the human can understand. If structure tangles, if coupling tightens, the AI starts making mistakes. It loses context. It suggests changes that break things in ways it can't see.

Kent frames this beautifully: "I'm not just maintaining the code for future human me. I'm maintaining it for future augmented me. The codebase is a shared resource between human and genie, and it needs to stay healthy for both of us."

He's experimenting with CodeRabbit (disclosed as a sponsor) for automated review. Two features align with actual needs: summaries and architectural diagrams for sanity checking, and learning from feedback to flag structural drift. He's clear about limitations—it's not pairing, it's more like a very thorough checklist that can read code.

For architects and team leads, this piece raises fundamental questions. If your team adopts AI coding assistants heavily, what happens to your review process? The traditional model assumes reviewer availability and attention that may not exist at AI-assisted development pace. Perhaps code review needs to shift from "another human looks at this" to "something helps maintain awareness of what you're building and whether structure is staying healthy."

What's missing from Kent's analysis? He focuses on solo work, but many teams will face hybrid situations—some developers AI-augmented, others not, review processes designed for neither. The organizational dynamics of code quality when different team members operate at different velocities remains unexplored. Also unaddressed: whether AI-assisted code has different defect profiles than human-written code, which would suggest different review emphases.

**Key takeaways:**
- Traditional code review economics were already strained before AI; "LGTM" culture masked shallow review
- Solo AI-assisted development breaks the reviewer availability assumption entirely
- Two review purposes still matter: intent verification and structural health maintenance
- Code structure now serves two readers: future human you and future AI-assisted you
- Automated review tools aren't pairing, but may be better than nothing in constrained situations

**Tradeoffs:**
- AI-assisted velocity enables rapid exploration but outpaces human review capacity
- Automated review catches checklist items but lacks the pushback and surprise of human pairing
- Maintaining AI-friendly code structure benefits tooling productivity but adds a new constraint on design decisions

**Link:** [Party of One for Code Review!](https://tidyfirst.substack.com/p/party-of-one-for-code-review)

---

*This summary was generated based on content from Kent Beck's Tidy First newsletter.*