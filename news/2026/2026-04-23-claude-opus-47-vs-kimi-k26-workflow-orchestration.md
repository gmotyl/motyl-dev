---
title: "Claude Opus 4.7 vs Kimi K2.6: A Real Workflow Orchestration Shootout"
excerpt: "Two frontier models got the same 1,042-line workflow orchestration spec — here's what the code review actually found."
publishedAt: "2026-04-23"
slug: "claude-opus-47-vs-kimi-k26-workflow-orchestration"
hashtags: "#substack #ai #llm #coding-agents #backend #generated #en"
source_pattern: "Substac"
---

## We Gave Claude Opus 4.7 and Kimi K2.6 the Same Workflow Orchestration Spec

**TLDR:** Kilo AI gave both Claude Opus 4.7 and Kimi K2.6 an identical 1,042-line spec for a persistent workflow orchestration system and scored the results. Claude Opus 4.7 scored 91/100 while Kimi K2.6 scored 68/100 — a 23-point gap that lives almost entirely in lease handling, cross-run scheduling, and SSE streaming. Kimi K2.6 runs at roughly 19% of Claude Opus 4.7's cost per token.

**Summary:**

The test is a workflow engine — something like a nightly payment settlement job: fetch, charge, send receipts, publish analytics. Steps with dependencies, retries when things fail, recovery when a worker crashes mid-step. Think Temporal or Airflow at a smaller scale. The spec called for Prisma with SQLite, Hono routes, conditional atomic step claiming, lease expiry recovery, retry scheduling, pause/resume/cancel semantics, and SSE event streaming. Both models worked autonomously from the same prompt in isolated directories.

Both models passed their own test suites. Kimi K2.6 ran 20 tests, Claude Opus 4.7 ran 31 tests across 6 files. Every test passed. And that is where the story gets interesting, because a subsequent human code review plus targeted reproductions against isolated SQLite databases found one real bug in Claude Opus 4.7 and six in Kimi K2.6.

Claude Opus 4.7's worst issue is a subtle multi-lease expiry interaction. When two steps expire in the same recovery pass, the recovery loop correctly fails the run and blocks all other steps on the first iteration — then overwrites that block status back to `waiting_retry` on the second iteration because the update-by-id call has no status guard. The model's own test suite never exercised two concurrent expired leases, so the bug sat invisible. The kilo team also found a bounded claim scan that could miss valid work if many candidates are skipped at the front of the queue, and an SSE cursor fallback that treats unknown cursors as "replay everything" rather than erroring.

Kimi K2.6's bugs are more varied and more fundamental. Its global step scheduling only orders within a single run, not across runs — so a priority-100 step in one run can lose a worker claim to a priority-10 step in a different run, which directly violates the spec. Its SSE stream replays stored events and then goes silent; the code actually defines an `emitAndBroadcast` function and a subscriber map but never wires them to the stream route. Expired leases are rejected at the heartbeat endpoint but not at the complete or fail endpoints, meaning a crashed worker can phone in a late "success" after recovery has already scheduled a retry. There's also a 409/404 status code mismatch, a Zod schema that rejects valid string or number payloads, and a broken build step that means `npm start` fails on a clean checkout.

What I find genuinely worth sitting with here is the closing observation: both models reported they were done and all tests passed. Both were technically correct. Neither model wrote the tests that would have caught its own worst behavior. That's not a gotcha — it's the normal state of software. The difference is that with AI-generated code, the surface area you need to review is enormous and the model has no embarrassment incentive to look harder for its own mistakes. "Tests pass" is a starting point, not a finish line, and that is truer here than it is with most human-written code.

**Key takeaways:**

- Claude Opus 4.7 scored 91/100 vs Kimi K2.6's 68/100 on the same workflow orchestration spec, with the gap concentrated in lease recovery, cross-run scheduling, and SSE streaming
- Both models passed their own test suites; human code review and targeted reproductions were needed to surface the real bugs
- Kimi K2.6 costs roughly 5-6x less per token and is open-weight, meaning it can be self-hosted, fine-tuned, or run through competing providers as availability expands
- Kimi K2.6's bugs are in the correctness-sensitive code paths that only show up under contention or mid-crash conditions — the parts that are hardest to catch in a quick review
- Claude Opus 4.7's one reproduced bug (multi-expired lease interaction) is real but narrower in scope
- For scaffold and prototype work where you'll review carefully, Kimi K2.6 at $0.67 per run is a reasonable trade; for correctness-critical state machine code in production, Claude Opus 4.7 at $3.56 is the safer call

**Why do I care:**

This test is doing something genuinely useful that most AI benchmark posts don't bother with: it goes past the test suite and actually reproduces the bugs. That's the work. I've seen dozens of "we compared Model A and Model B" posts that stop at "both built the thing" — and this one doesn't. What sticks with me is that the correctness gap between frontier proprietary and open-weight models is now mostly hiding in the hard-to-test corners: lease expiry interactions, cross-entity scheduling, live event delivery. Those are not exotic features. They're the exact code paths that fail at 3am under load. If your team is using open-weight models to generate backend code today, build a review checklist specifically for the areas these models consistently miss — concurrent state transitions, event delivery guarantees, and anything that looks correct when you test it in isolation but breaks when two processes race. The open-weight models are genuinely good now. They're just not done yet.

**Link:** [We Gave Claude Opus 4.7 and Kimi K2.6 the Same Workflow Orchestration Spec](https://blog.kilo.ai/p/we-gave-claude-opus-47-and-kimi-k26?publication_id=4363009&post_id=195025557&isFreemail=true&triedRedirect=true)
