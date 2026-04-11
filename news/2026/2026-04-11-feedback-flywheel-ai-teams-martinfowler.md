---
title: "Your AI Feedback Loop Is Broken — Here's How to Fix It"
excerpt: "Rahul Garg lays out a four-signal, four-cadence system for turning individual AI session experiences into shared team muscle."
publishedAt: "2026-04-11"
slug: "feedback-flywheel-ai-teams-martinfowler"
hashtags: "#ai #softwareengineering #teamwork #devtools #llm #EN"
source_pattern: "url-to-news"
---

## The Feedback Flywheel: Turning AI Sessions Into Shared Team Knowledge

**TLDR:** Most teams using AI tools hit a plateau because they have no system to capture what works. Rahul Garg's "feedback flywheel" is a structured practice for routing individual AI session insights back into shared team artifacts like priming documents, shared commands, and playbooks.

**Summary:**

There is something that happens to almost every team that picks up AI coding tools. In the beginning, things feel fast. Then, a few months in, nothing changes anymore. The same prompts, the same frustrations, the same results. Not because the tools stopped improving, but because the way the team uses them stopped improving.

Rahul Garg, writing in the "Reduce Friction AI" series on Martin Fowler's site, calls this the accumulation problem. Without a feedback loop, AI effectiveness flatlines. Teams use the tools, the tools are useful enough, but the practice around them never evolves. The same gaps in the priming document cause the same manual corrections. The same ambiguous instructions produce the same mediocre outputs. The same error patterns reappear without anyone connecting the dots.

The feedback flywheel is a practice for fixing this. The core idea is simple: after a session with AI, ask whether anything that happened should change a shared artifact. If yes, update it immediately while the lesson is still fresh. Garg identifies four types of signal to watch for. A context signal tells you something is missing from your priming document — when the AI keeps defaulting to an outdated API, that is not a model failure, that is a gap in what you told it. An instruction signal is when a particular phrasing consistently produces better results, which means that phrasing belongs in shared commands rather than in one developer's head. A workflow signal is when a specific sequence of interactions reliably produces good outcomes. And a failure signal is when something goes wrong, with the most important part being understanding why: was it missing context, a bad instruction, or an actual model limitation?

The practice runs at four cadences, and Garg is deliberate about keeping them all light. After each session, one question: should anything change? At the standup, one question: did anyone learn something yesterday that others should know? At the retrospective, a fixed agenda item for deciding which observations become actual changes to shared artifacts. And quarterly, a review of whether the artifacts are still being used and still accurate. The heaviest of these is a five-minute block in an existing meeting. If the practice needs its own meeting, Garg writes, it will be the first thing cut when the team gets busy, which is exactly when learning matters most.

What I find genuinely interesting here, and a bit uncomfortable, is the measurement section. Garg says most teams measure the wrong things — lines generated, time to first output. These measure volume, not value. What actually matters is whether the first-pass output is usable without major revisions, how many rounds of back-and-forth a task requires, how much post-merge rework happens, and whether outputs follow the team's architectural standards. He is honest that these are hard to track rigorously and often qualitative. The most reliable signal, he suggests, is the decreasing frequency of "why did AI do that?" conversations.

There is a structural urgency buried in the article that deserves more attention than it gets. AI ecosystems evolve faster than any documentation system was ever designed for. A priming document written when you adopted one model version can actively mislead you when a newer version handles context windows differently. Commands designed around one tool's strengths may miss capabilities added in the next release. Garg compares this to dependency management: a lockfile that never gets updated does not stay stable, it becomes a liability. These artifacts need the same treatment as test suites, not the same treatment as onboarding checklists written once and forgotten.

**Key takeaways:**

- Capture four types of signal from each AI session: context, instruction, workflow, and failure signals, each mapping to a specific artifact type
- Use four lightweight cadences: per-session reflection, standup share, retrospective agenda item, and periodic review
- Measure iteration cycles, first-pass acceptance rate, and post-merge rework rather than raw output volume
- Treat AI artifacts like test suites: living infrastructure requiring regular maintenance, not one-time documentation

**Why do I care:** I have spent years watching teams adopt new tools the same way they adopt meeting apps — enthusiastically at first, then statically. What Garg is describing is not a new idea in software (we have always known retrospectives work) but the application of that idea to a domain where most teams are flying blind. The part that sticks with me is the concrete mapping: context signal goes to priming docs, instruction signal goes to shared commands, workflow signal goes to playbooks, failure signal goes to guardrails. That specificity is what separates advice you can act on from advice that sounds good but dissolves in practice. One thing Garg does not fully address is ownership. He mentions a tech lead or designated owner making final decisions on what goes into shared artifacts, but in most teams I have seen, ownership like that needs to be explicit and deliberately rotated or it silently falls to whoever cares most that week.

**Link:** [Feedback Flywheel](https://martinfowler.com/articles/reduce-friction-ai/feedback-flywheel.html)
