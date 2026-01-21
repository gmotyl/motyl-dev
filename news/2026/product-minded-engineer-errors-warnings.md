---
title: "The Product-Minded Engineer: Why Good Errors and Warnings Matter More Than You Think"
excerpt: "An interview with Drew Hoskins about his new O'Reilly book, plus an exclusive excerpt on crafting diagnostics as a primary product interface—increasingly critical in the age of AI agents."
publishedAt: "2026-01-20"
slug: "product-minded-engineer-errors-warnings"
hashtags: "#substack #dx #product #architecture #engineering #api #agents #generated #en"
---

## The Product-Minded Engineer: The Importance of Good Errors and Warnings

**TLDR:** Drew Hoskins' new O'Reilly book "The Product-Minded Engineer" arrives at a timely moment when AI tools are making product thinking increasingly essential. An exclusive excerpt from Chapter 3 argues that diagnostics—errors and warnings—may be your product's most important interface, especially as AI agents now regularly interact with error messages.

Gergely Orosz from The Pragmatic Engineer introduces Drew Hoskins' new book with context that feels urgent: more startups are hiring for "product engineers" who can implement products *and* come up with strong product and feature ideas. This trend of engineers being involved from the ideas stage through to shipping is accelerating with AI tools generating more code. Being product-minded may become a baseline expectation at startups because specifying what an AI tool should build requires product thinking.

Drew's background makes him well-suited to write this book: twenty years as a software engineer at Microsoft (C++ compiler, static analysis tools), Facebook (Platform/product infra, including the foundational EntSchema that led to the open-source Ent framework in Go), Oculus (Senior Staff engineer leading the platform SDK), and Stripe (Staff+ engineer on Connect and Workflow Engine built on Temporal). He's now a Staff Product Manager at Temporal working on developer experience and agentic orchestration.

The interview yields several practical insights for engineers wanting to be more product-minded:
- **Ask "why" a lot** — don't expect clear answers even from EMs and PMs
- **Switch your viewpoint** — move from system level to user lens and back
- **Use scenarios** — simulate and sequence user interactions until it becomes routine; writing scenario tests is a good start
- **Do customer support** — spend time on user support and think about permanent fixes while engaging users

Drew's tip for using AI tools to be more product-minded is particularly interesting: his team at Temporal has a Claude Code skill that searches internal Slack, community Slack, Miro Insights, GitHub issues, and Gong, aggregating everything into a report with links to chase down customers and requests.

The excerpt from Chapter 3 on "Errors and Warnings" makes a compelling argument that for many applications with complex inputs, **diagnostics are the primary interface**. Most user time is spent dealing with errors and progressing to the next one. Form filling, coding, even word processing—it's all about responding to diagnostic feedback. Yet because errors don't appear in screenshots or marketing materials, they're out of sight and out of mind during design.

Here's where it gets interesting for 2026: **AI agents shine a bright light on this problem**. Agents are regularly presented with error messages resulting from their actions and instructed to correct mistakes based on them. If the message isn't sufficiently helpful, they fail at their task. And because agents are billed based on usage, the costs of poor error messages are directly measured.

The framework for categorizing error scenarios is genuinely useful:
- **Assertion** — internal sanity check for developers
- **Input validation** — bad data from upstream
- **Preconditions not met** — missing prerequisites  
- **Logic error** — bug in the system
- **External service failure** — dependency problems

Each category reveals different audiences (your team, other developers, users) and timing (runtime vs development). This determines vocabulary and actionable suggestions. The "PC Load Letter" example is a classic—actionable instruction speaking to the wrong persona. "PC" meant "paper cassette" and "Letter" was a paper size, but users had no context for this ontology.

For architects and senior engineers, the implications are significant. If you're building APIs or platforms, your error messages aren't just helpful additions—they're likely the most-used part of your interface. And with AI agents increasingly consuming your APIs, poor diagnostics directly translate to failed operations and wasted compute costs. The investment in crafting good errors pays dividends both for human developers and for the AI systems that increasingly work alongside them.

**Key takeaways:**
- Diagnostics may be your product's most important interface—users spend most time dealing with errors
- AI agents make error quality measurable: poor messages cause failures with directly measurable costs
- Categorize errors by audience (team, developers, users) and timing (runtime vs development)
- Match error vocabulary to persona ontology—actionable advice is useless if the user lacks context
- Use scenarios to develop product intuition: simulate user interactions until it becomes routine

**Link:** [The Product-Minded Engineer: The importance of good errors and warnings](https://blog.pragmaticengineer.com/the-product-minded-engineer-book/)

---

*This article was generated from The Pragmatic Engineer Substack newsletter. While I've done my best to capture the essence of this piece, I encourage you to read the original article for the full interview and complete chapter excerpt.*
