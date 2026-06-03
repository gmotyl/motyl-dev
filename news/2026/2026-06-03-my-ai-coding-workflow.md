---
title: "My AI Coding Workflow"
excerpt: "One developer, two hours a day, a 150K LOC codebase, and 28 commits. The 3G mental model behind an AI workflow that actually holds up in production."
publishedAt: "2026-06-03"
slug: "my-ai-coding-workflow"
hashtags: "#refactoring #ai #agents #engineering #productivity #generated #en"
source_pattern: "Refactoring"
---

## My AI Coding Workflow

**TLDR:** Luca from Refactoring runs a production app with thousands of daily users, ~250K LOC total, and a 99.1% crash-free rate, spending roughly two hours a day writing code. His framework, built around Guides, Gates, and Guards, is one of the more honest accounts of what sustainable AI-assisted development actually looks like in practice.

**Summary:**

There is a specific kind of skepticism I bring to "look how productive I am with AI" posts. The metrics are almost always cherry-picked, the codebase is almost always a toy, and the timeline is always suspiciously short. So when Luca from [Refactoring](https://refactoring.fm) shows up with a production project called Tolaria, thousands of daily users, 6 open issues versus 417 closed, 14 open PRs versus 306 closed, a 1-day average bug fix time, and a 99.1% crash-free rate -- all since April 22nd -- I sat up.

That is about a month of real-world data. Roughly 1,000 commits in a month. About 28 commits per day. And the velocity has not decreased. I find that more interesting than any benchmark.

The framework he describes is built around three concepts he calls the 3Gs. The first is Guides, which are rules and explainers that stay loaded in the AI context at all times. His AGENTS.md covers test-driven development, the Boy Scout Rule measured with CodeScene and Codacy, UI conventions built around shadcn/ui, and localization handled through Lara CLI. The idea is that you teach the AI the same things you would teach a junior developer on day one, and you do it in writing, not just through example or correction.

This matters because most people using AI for coding have no equivalent of AGENTS.md. They are implicitly trusting the model to guess their conventions, testing philosophy, and quality bar. That is a reasonable bet for a one-off script and a bad bet for a production system with a year of accumulated decisions.

The second G is Gates, which are deterministic checks that block bad output while work is in progress. I want to say more about this but the article is paywalled past the Guides section, so I am working from what was available. The concept is sound: you cannot rely on the AI to self-police everything, so you use automated checks as guardrails that force correction before the output lands somewhere it can cause damage.

The third G is Guards, described as a last line of defense against enshittification. Again, the detail is behind the paywall, but the framing tells you something. Enshittification is a specific failure mode where a system gradually degrades because no single commit is obviously bad, just directionally wrong. The fact that Luca names this as something worth defending against explicitly suggests his workflow includes some form of drift detection or quality floor, not just per-commit checks.

There is one finding I want to call out directly: he moved from Claude to OpenAI Codex and says he is not going back, at least for now. His monthly cost dropped over 90%. I do not know the specifics because that section is paywalled, but a 90% cost reduction is not a rounding error. That is a different class of tool economics, and it is worth taking seriously even without the details.

He also notes that the boundary between AGENTS.md and separate skills files is blurry and that benchmarks are inconclusive on which approach works better. This is honest in a way I appreciate. A lot of AI workflow advice is presented with more certainty than the evidence supports. For his particular project, the codebase is simple enough to keep everything in one file without separate skills, so that is what he does. That is a pragmatic answer, not a universal law.

**Key takeaways:**
- A structured AGENTS.md or CLAUDE.md is not optional overhead, it is the mechanism by which your conventions survive across AI sessions and across team members
- Gates (deterministic checks) and Guards (fallback procedures) are the parts most people skip, which is also why most AI workflows degrade over time
- A 90% monthly cost reduction by switching from Claude to Codex is worth investigating, even without the full breakdown
- Velocity at 28 commits per day sustained for a month is a more useful data point than any sprint velocity number, because it includes the maintenance cost
- The Boy Scout Rule measured with static analysis tools before and after is a concrete way to prevent quality drift that most teams would benefit from adopting

**Why do I care:** I keep seeing teams adopt AI coding tools and then spend the next quarter unwinding the mess the AI made because they had no Guides, no Gates, and no Guards. The 3G model is a useful vocabulary for a conversation that most engineering teams are not having yet. The cost comparison between Claude and Codex is also something I want to follow more carefully, because the economics of AI-assisted development are moving fast and a 90% cost difference changes the calculus on what is worth automating. I am frustrated that the most interesting parts of this article, the Gates, Guards, and Codex comparison, are behind the paywall, but the framing alone is worth thinking through.

**Link:** [My AI Coding Workflow](https://refactoring.fm/p/my-ai-coding-workflow-b09)

#newsletter-cta('Build Workflows That Hold Up', 'The 3G framework for AI-assisted development: Guides, Gates, and Guards for production codebases.')
