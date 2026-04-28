---
title: "Vibing, Harness and OODA loop"
excerpt: "Why LLM-assisted coding feels like a superpower until you realize the Act phase got faster but the Observe phase didn't, and what to do about it."
publishedAt: "2026-04-28"
slug: "vibing-harness-and-ooda-loop"
hashtags: ["#OskarDudycz", "#architecture", "#OODA", "#vibecoding", "#observability", "#engineering", "#generated", "#en"]
source_pattern: "OskarDudycz"
---

## Vibing, Harness and OODA loop

**TLDR:** LLMs make the Act phase of the OODA loop nearly instantaneous, but Observe and Orient still take as long as they ever did. Without a harness of tests, automation, and traces, vibe coding is just generating piles of code you haven't actually verified. Oskar walks through wiring OpenTelemetry into Emmett to show what a real harness looks like in practice.

**Summary:**

Oskar opens with a familiar archetype, the founder who codes a feature over the weekend with a beer and then asks the team why their version takes two weeks. The answer he proposes is structural rather than personal. The founder skipped Observe and Orient and went straight to Act. The team is not slow because they are bad. They are building the infrastructure that makes the Decide and Act phases sustainable, which is the part nobody tweets about.

The frame he reaches for is John Boyd's OODA loop, originally a fighter pilot model but generic enough to map onto software delivery. Observe means actually looking at the state of the system through tests, traces, and integration runs. Orient is filtering those observations through experience and technical knowledge. Decide is forming a hypothesis. Act is executing. LLM tools have collapsed Act into seconds, and that asymmetry is what makes vibe coding feel magical and dangerous at the same time. If your Observe phase still requires manual clicking and gut feel, your loop is broken regardless of how fast the keyboard is moving.

What I found genuinely useful is that he does not stop at the metaphor. He shows the actual harness he built while adding observability to Emmett. He vibed the initial Grafana plus Docker Compose config on purpose, just to see the typical configuration people use, and then ran into the predictable consequence. It worked once, then stopped working when he tried to repeat it without the same Linux command voodoo. So he asked the LLM to take notes on what failed, then drove it toward TypeScript automation using execa, native fetch, and Node's built-in test runner.

The harness itself is not pretty and he says so directly. Diagnostic helpers that pull a few emmett_ metric lines out of the collector, label dumps from Loki, last ten lines of docker logs, a setup hook that checks if Prometheus is ready, decides whether to reuse a running app or start a fresh one, and tears it all down if you ask it to. None of it is exotic. The test that asserts an x-trace-id header is exactly 32 hex characters is the kind of thing you write because once it lies to you, it lies forever. The point is that this scaffolding is the difference between a PoC and something a team can iterate on without losing the thread.

The closing argument lands well. Vibe coding is high-frequency steering, and high-frequency steering only works if you have something mechanical observing the road for you. Otherwise you are not going faster, you are just generating more stuff you haven't checked. Humility helps but humility fails under deadline pressure. The harness does not.

**Key takeaways:**

- LLMs accelerate Act dramatically while leaving Observe and Orient unchanged, which silently breaks the feedback loop unless you compensate.
- A harness is the boring scaffolding that lets you keep vibing without lying to yourself: tests, traces, reproducible setup scripts, health probes.
- Vibing the first config on purpose can be a useful research move, as long as you treat the result as raw data and immediately codify what worked into automation.
- The first iteration of the harness does not need to be pretty. It needs to be runnable, repeatable, and honest about what it actually checked.
- The team's "two weeks" is usually not fine-tuning the founder's masterpiece. It is building the conditions under which the loop can keep running.

**Why do I care:**

This one hit a nerve because I keep watching senior people fall into the same trap from the opposite direction. We used to be the ones cautioning juniors not to copy-paste from Stack Overflow without understanding it. Now I see architects shipping LLM output with the same shrug, because the diff looks plausible and the tests they wrote are the tests the model suggested. That is not engineering. That is a confidence trick we are running on ourselves.

The OODA framing is useful precisely because it forces you to ask which phase you actually sped up. In my own work, the wins from LLMs are real but lopsided. I can scaffold a route handler, wire up a queue consumer, or stub out a migration in a fraction of the time it used to take. The Observe phase is unchanged. If anything, it got harder, because more code per hour means more surface area to instrument. So the harness work matters more now, not less. I want my CI to tell me the truth quickly. I want traces I can grep. I want a reproducible local stack that boots from zero with one command, because if it does not, I will eventually lie to a stakeholder about whether something was tested.

The other piece worth sitting with is the dig at solitary self-high fives. Frontend and platform work especially benefits from another set of eyes catching the thing your model happily glossed over. The model will not tell you that the dashboard you vibed has a 30-second resolution that hides the bug. A teammate will. Keep the loop wide enough to include them.

**Link:** [Vibing, Harness and OODA loop](https://www.architecture-weekly.com/p/vibing-harness-and-ooda-loop?publication_id=579466&post_id=195546923&isFreemail=true&triedRedirect=true)
