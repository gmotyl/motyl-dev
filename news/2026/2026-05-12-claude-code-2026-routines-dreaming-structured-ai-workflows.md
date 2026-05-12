---
title: "Claude Code 2026: Routines, Dreaming, and the End of One-Shot Prompting"
excerpt: "A firsthand look at Code with Claude Extended in San Francisco, where Anthropic revealed structured agent workflows, scheduled Routines, and a memory system called Dreaming."
publishedAt: "2026-05-12"
slug: "claude-code-2026-routines-dreaming-structured-ai-workflows"
hashtags: "#techtiff #Claude #AIAgents #LLM #DeveloperTools #generated #en"
source_pattern: "TechTiff"
---

## Claude Code 2026: Routines, Dreaming, and Why the One-Shot Era Is Over

**TLDR:** Anthropic's Code with Claude Extended event in San Francisco showcased a clear shift from individual prompts toward structured, long-running agent systems. New features like Routines and Dreaming signal that the model is now just one layer in a much larger infrastructure. If your AI workflow keeps breaking, the missing piece is almost certainly structure, not a better prompt.

The event opened with a photo booth that built a live pixel-art portrait while you watched. SVG shapes assembled in real time, code rendered to geometry, geometry rendered to face, then a printer kicked out a trading card sticker. It was a neat trick, but it was also the thesis of the entire conference: reliable output comes from structure around the model, not from the model alone. I find this framing more honest than the usual "just prompt better" advice, and it's long overdue.

Anthropic's big announcement was Routines, and it's a more significant idea than it might sound. A Routine packages a Claude Code configuration, your prompt, one or more repositories, and whatever tools the job depends on, and runs it continuously on Anthropic-managed cloud. You hand Claude a defined working environment, close your laptop, and the work keeps moving. Routines can be scheduled on a recurring cadence, fired on demand, or triggered by GitHub events like pull requests or releases. One Routine can combine all three. That's a genuinely useful design. The problem with most AI automation today is that you have to babysit it. A system that wakes up on a cron schedule, also responds to a deploy script, and also reacts to every incoming pull request, all from a single configuration, starts to look like real infrastructure rather than a fancy macro.

The second announcement was Dreaming, a scheduled process for agent memory management. Memory accumulates fast, and a long history of agent sessions doesn't automatically become useful context. It becomes noise. Dreaming reviews your agent sessions and memory stores, identifies patterns, catches recurring mistakes, and rewrites your memory store to stay high-signal as it grows. You choose whether it applies updates automatically or queues them for review. This is the unglamorous part of building with agents that almost nobody talks about: your context degrades over time if you don't actively maintain it. Dreaming automates that maintenance. It's in research preview, which means it's not ready to trust blindly, but the thinking behind it is correct.

The multi-agent sessions at the event converged on a few principles that I think are worth taking seriously. Keep your context windows clean. Separate your understanding agents from your writing agents. Read source material in one context window, produce output in another. A lot of the conversations weren't about adding more agents, they were about reducing coordination failures between agents. Fewer agents with more tools is almost always the cleaner starting point. Split out a new agent only when the workload actually demands it. When your multi-agent system is misbehaving, the fix is usually fewer agents and better tool definitions, not more orchestration.

The eval discussion was one of the more grounded parts of the day. Without evals, prompt engineering is just changing wording and hoping the output improved. With evals, you define actual tasks upfront, real inputs paired with acceptable outputs, run your prompt against them, see where it failed, and refine. Each failure points to a specific change. The loop has a stopping condition. CodeRabbit's pipeline, issue to plan to review to code to validate, explicitly puts planning and review before any code gets written. The point they closed on was blunt and right: ship the agent, not the loop. Time goes into the prompt and the plan, not the runtime.

**Key takeaways:**
- Anthropic Routines let you schedule and trigger Claude Code agents continuously on managed cloud infrastructure, combining cron, on-demand, and GitHub event triggers in one configuration
- Dreaming is a scheduled memory-curation system that keeps agent context high-signal over time, catching recurring mistakes and compressing old sessions
- Reliable multi-agent systems separate understanding agents from writing agents, minimize coordination overhead, and use evals to give prompt refinement a defined stopping condition

**Why do I care:** From an architecture standpoint, the Routines model is the first Anthropic offering that maps cleanly onto how you'd actually build a production automation pipeline. The scheduling, event triggering, and managed execution environment together reduce the gap between "AI experiment" and "thing we can rely on in CI." Dreaming is a bet on the idea that memory management is a first-class engineering problem, not something you solve by prompting harder. If that bet pays off, it changes how you design long-running agent systems. Both are worth watching closely, and I'd start experimenting with Routines as soon as they're generally available.

**Link:** [Claude is Done With Your One-Shot Prompts](https://techtiff.substack.com/p/code-with-claude-2026?publication_id=4799331&post_id=196949706&isFreemail=true&triedRedirect=true)
