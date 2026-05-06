---
title: "Stop Bolting AI onto Broken Workflows: The Case for End-to-End Redesign"
excerpt: "Only 6% of teams pull real profit from AI, and the difference is whether they redesigned their workflows end-to-end or just bolted models onto existing processes."
publishedAt: "2026-05-06"
slug: "ai-adopters-stop-bolting-ai-broken-workflows-may-2026"
hashtags: "#AIAdopters #ai #agents #architecture #llm #frontend #webdev #generated #en"
source_pattern: "AIAdopters"
---

## Stop Bolting AI onto Broken Workflows

**TLDR:** McKinsey data shows only 6% of organizations pull at least 5% EBIT impact from AI. The difference between them and everyone else isn't better models or bigger budgets. It's whether they rebuilt their workflows end-to-end or just attached AI to the same broken processes they had before.

**Summary:** This is one of the more data-grounded arguments I've seen for why most AI deployments underperform, and it's uncomfortable in the right way. The central claim, backed by McKinsey's 2025 research, is that only 21% of organizations have actually rebuilt workflows around AI. The other 79% have done the software equivalent of bolting a jet engine onto a bicycle: the bicycle gets faster, briefly, and then the frame fails. Half of all AI initiatives sit in pilot purgatory. Organizational maturity across the board sits at one percent.

The INSEAD and Harvard Business School randomized field experiment is the most compelling evidence in the piece. 515 startups, equal AI access and training across all of them, but one group also received training on workflow reorganization. That group generated 90% higher revenue, found 44% more use cases, won 18% more paying customers, and needed 40% less capital. Same tools. Same models. The redesign was the variable that mattered.

The five-stage DGRI method from the California Management Review gives the argument some structure. The stages move from mapping decision flows and surfacing root inefficiencies, through assigning data and model owners with real accountability, into the multiplier stage where manual chains get replaced with AI-orchestrated sequences and exceptions get routed to humans. The remaining stages focus on shared infrastructure to prevent teams from rebuilding the same prompts from scratch, and treating pilots as minimum viable transformations rather than proof-of-concept demonstrations you never actually scale.

The case studies are worth taking seriously. A global manufacturer cut a 12-day financial close cycle to six days, dropped manual adjustments 40%, and reduced audit fees 15%. Not from buying better software. From redesigning the reconciliation process and embedding alerts where humans used to chase reports manually. JPMorgan's COiN platform saved 360,000 legal hours annually. PwC reported 20% to 50% productivity gains across audit, tax, marketing, and IT after resequencing workflows around human judgment. These are operating model wins.

What I'd push back on is the framing that the failures are 70% organizational and only 30% technical. That's probably directionally true, but it's a little too clean. In practice, the organizational failures and technical failures are deeply entangled. A team that bolted an agent onto a process that was designed for email chains will hit technical problems immediately, specifically because agents need clean inputs and outcome ownership, and email chains produce neither. The causality runs both ways.

Satya Nadella's design principle gets a mention, and it's a good one: AI works when human agency stays at the center, not when it gets pushed aside. The article is clear that the goal is not to automate humans out of workflows but to give humans the high-judgment work and give AI the orchestration, parallelization, and grunt analysis. That's the right framing, and it's different from the way a lot of teams approach the problem, which is to find the most repetitive task and automate it first, regardless of whether automating that task actually changes the outcome.

The list of anti-patterns is useful. Treating AI as an IT procurement project. Rewarding tool usage instead of outcome metrics, so engineers get credit for how many AI prompts they send rather than whether the workflow actually got faster. Bolting agents onto processes designed for humans, where agents sit idle or produce noise because the inputs are dirty and the ownership is unclear. Each of these is a real failure mode I've seen in teams trying to move fast on AI adoption.

The practical playbook at the end is sound: pick one workflow with a clear outcome metric, form a team with domain and tech co-ownership, map the decision flow explicitly, set three metrics and tie incentives to workflow outcomes rather than tool usage. The emphasis on investing more than 20% of digital budgets in redesign, citing three to five times the returns of teams that don't, is a strong argument for taking the organizational work as seriously as the technical work.

**Key takeaways:**
- Teams that redesign workflows end-to-end around AI consistently outperform teams that attach AI to existing processes, with 90% higher revenue in controlled research.
- The five-stage DGRI method provides a structured approach: map decision flows, assign ownership, replace manual chains with AI orchestration, build shared infrastructure, and treat pilots as minimum viable transformations.
- Measuring AI success by tool usage rather than workflow outcomes is a predictable path to pilot purgatory.

**Why do I care:** Every frontend team I've worked with in the last two years has at least one AI feature in production or in progress. Most of them were built by identifying a task, dropping a model into it, and measuring token throughput or response quality rather than whether the workflow outcome actually changed. The argument here maps directly to that problem. If you're building AI-powered features without first asking "what does the end-to-end workflow look like after this, and how do we measure whether it's better," you're probably building a demo, not a product.

**Link:** [Stop bolting AI onto broken workflows](https://aiadopters.club/p/ai-on-human-workflows)
