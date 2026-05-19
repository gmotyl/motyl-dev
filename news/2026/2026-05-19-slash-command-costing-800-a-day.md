---
title: "The Slash Command That Was Quietly Burning Through $800 a Day"
excerpt: "A developer discovers that a custom AI slash command was compounding token costs through in-context polling loops, turning a simple CI watcher into a runaway expense."
publishedAt: "2026-05-19"
slug: "slash-command-costing-800-a-day"
hashtags: "#ai #agents #engineering #llmcosts #tokenbudget #cicd #generated #en"
source_pattern: "Kilo"
---

## This Slash Command Was Quietly Costing Me $800 a Day

**TLDR:** A custom `/ship` slash command that watched CI pipelines and Slack PR reviews was silently compounding token costs through in-context polling loops. Each poll appended more output to the growing context window, making every subsequent call more expensive than the last. The author traced three sessions with peak contexts of up to 1.3 million tokens before finding the culprit.

**Summary:**

There's a class of bugs that only shows up when you look at the full picture, not any individual piece of it. This story is one of those. The author was running the same models, on the same projects, doing the same work they'd been doing for weeks. Per-session costs looked fine. And yet, somehow, they crossed $800 in agent spend in a single day.

The slash command in question was `/ship`, a four-word prompt turned automation: commit, push, PR, babysit. It handled the tail end of the dev loop that nobody enjoys, watching CI status, monitoring Slack for review bot comments, working through the ones that blocked the merge. On paper, that's the perfect job for an agent. It's repetitive, interrupt-driven, and full of waiting. The trap was hiding inside that last word.

An agent does not wait the way a human does. You get coffee while CI runs. An agent polls. And each poll pulls its output back into the model context. The next poll then has to reason over a context that includes the previous poll's output. The one after that includes both. The transcript grows on every loop iteration, and you're paying for every token in that transcript on every call. If CI passes quickly, no problem. If it retries twice and then fails and tries again, you're now in a loop where each iteration is more expensive than the last, not because the token price changed, but because you're buying more tokens per call every time around.

The author pulled the three most expensive sessions they could find. One hit 496 requests and a peak context of 1.3 million tokens, nearly double the others. The long tail was almost entirely CI status checks, stretching across eighty minutes after `/ship` fired. That's not work being done, that's an agent paying full price to wait. Two things made it worse: Claude Opus has a prompt cache window of about five minutes, so polls spaced wider than that lose the cache discount entirely. And flaky tests mean retries, each of which restarts the cost curve on top of an already-accumulated context, adding compounding steps rather than a smooth climb.

The fix is conceptually simple: stop letting agents wait in-context. Use webhooks where possible. Space out polls and use a cheaper model to summarize state between checks. The context window doesn't care what you're waiting for, it charges you for everything it's holding while it does so. The author shared this pattern with a teammate who recognized it in their own slash commands within about a minute. That's the sign of a broadly under-noticed problem. No single call looks expensive. You have to trace the full session curve to see what's happening.

**Key takeaways:**

- In-context polling loops grow the context window with every iteration, making each subsequent call more expensive than the previous one
- The cost damage is in the total integral of the loop, not the peak of any single call
- Claude Opus cache windows are about five minutes; polls wider than that lose cache discounts entirely
- Flaky tests that cause retries compound the problem by restarting the cost arc on top of already-accumulated context
- The fix: replace in-context polling with webhooks, longer poll intervals, or a cheap summarizer model between checks

**Why do I care:** As a senior frontend developer who increasingly reaches for agent tooling to handle the boring tail of a PR workflow, this one genuinely stings. I've probably written something like `/ship` myself and never thought to trace the full session curve. The insight here isn't that agents are expensive, it's that the shape of how you use them matters enormously. Polling is so natural when you're thinking procedurally that it's easy to forget you're not writing a bash script anymore. You're feeding a context window that never forgets what it's already seen. That mental model shift is worth internalizing before you see the bill.

**Link:** [This Slash Command Was Quietly Costing Me $800 a Day](https://blog.kilo.ai/p/slash-command?publication_id=4363009&post_id=198325937&isFreemail=true&triedRedirect=true)
