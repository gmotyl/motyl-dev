---
title: "The Real Bottleneck Is Everything Around the Code"
excerpt: "Andrew Murphy makes a blunt point: faster code generation does not matter when review queues, bad requirements, and deployment friction still choke delivery."
publishedAt: "2026-04-17"
slug: "the-real-bottleneck-is-everything-around-the-code"
hashtags: "#motyldev #curated #ai #engineering #architecture #productivity #generated #en"
source_pattern: "Motyl.dev"
---

## If you thought the speed of writing code was your problem, you have bigger problems

**TLDR:** Murphy argues that AI coding tools are being used to accelerate the wrong part of software delivery. If your real bottlenecks are review, product clarity, release process, or decision-making, more code just creates a bigger mess.

**Summary:** This piece lands because it refuses to celebrate output for its own sake. Murphy takes the Theory of Constraints and drags it straight into modern engineering orgs that are suddenly obsessed with AI-assisted velocity. His point is simple: if code writing was already one of the faster parts of the pipeline, making it even faster does not improve delivery. It just piles unfinished work into every queue that comes next.

He is especially sharp on what happens after the code exists. Pull requests stack up, reviewers get overloaded, context evaporates, flaky CI keeps burning time, and deploy approvals turn into calendar theater. I liked that he stayed grounded in the ugly details here. This is not abstract systems thinking. It is the lived experience of teams where everyone is busy, nothing ships cleanly, and the dashboard still claims productivity is rising.

The strongest section is the one about building the wrong thing faster. If product discovery is weak, if requirements are vague, or if teams are guessing through edge cases, AI makes the guessing loop more efficient. That is not progress. That is just a faster route to waste. He also calls out a quieter risk: teams are increasing the amount of code in the system while reducing the number of people who truly understand it.

What stays with me is how unglamorous the proposed fix is. Measure cycle time, map the value stream, reduce waits, limit work in progress, and fix the places where work sits still. None of that will sell conference tickets. It will, however, help teams deliver software that reaches users instead of aging in staging.

**Key takeaways:**
- More code output is meaningless when review, CI, approvals, and deploy flow remain the real constraints.
- AI can accelerate waste if teams still do weak discovery and vague product definition.
- Throughput improves when teams reduce waiting and finish work, not when they optimize vanity metrics.

**Why do I care:** This is the kind of article I want engineering leaders to read before they buy another shiny assistant and call it transformation. Frontend teams feel this pain early because we sit close to product churn, handoff churn, and release friction. If we do not fix the system around the code, AI just helps us arrive at the same broken destination sooner.

**Link:** [If you thought the speed of writing code was your problem - you have bigger problems](https://andrewmurphy.io/blog/if-you-thought-the-speed-of-writing-code-was-your-problem-you-have-bigger-problems)