---
title: "I Built a Self-Improving AI Agent: The Corrections Loop That Makes It Learn"
excerpt: "A deep dive into building an AI agent that actually improves from feedback, using a capture-classify-graduate pipeline and four distinct memory sinks."
publishedAt: "2026-05-13"
slug: "self-improving-ai-agent-corrections-loop"
hashtags: "#engineering #ai #agents #architecture #generated #en #llm #memory"
source_pattern: "PawelJozefiak"
---

## I Built a Self-Improving AI Agent: The Corrections Loop That Makes It Learn

**TLDR:** The author describes the architecture behind a personal AI agent that learns from corrections in real time, without requiring explicit documentation. The core is a three-stage pipeline called capture-classify-graduate, layered on top of four different memory sinks with distinct lifespans and purposes.

**Summary:**

The article opens with an honest admission: this setup only became visible once the rest of the tooling infrastructure had stabilized. The author spent months building and abandoning custom dashboards, kanban apps, and control panels before landing on Basecamp with its agent-friendly CLI. The real insight here is not "Basecamp is great" but rather that complexity in the supporting infrastructure masks the behavior you are actually trying to observe. You cannot tell if your agent is learning if you are also firefighting your task manager.

The core of the post is the corrections loop, a pipeline the author calls capture-classify-graduate. Capture writes a single JSONL entry when the agent spots a correction in chat, cheap by design, no model calls. Classify runs seven regex patterns against the text and assigns a type: rule, preference, behavioral, memory update, skill misuse, or unknown. Graduate is a nightly drain that takes each queued entry, writes the right artifact to the right place, and marks it resolved. The rule that makes the whole thing work is that a correction cannot silently age. It either gets addressed or stays pending with a note. That single constraint is the difference between a system that actually learns and one that just looks like it does.

The memory architecture is where things get genuinely interesting, and the author is right that no one writes about this honestly. There are four sinks: working memory for short-lived context this week, lessons for full incident postmortems, feedback memories for per-rule files that are individually linkable and deletable, and a small set of top-level RULE lines that load on every startup without exception. The Behavioral Learning card table in Basecamp is a fifth element, the human-in-the-loop surface that lets the author review, push back on, or trash any correction before it graduates into a rule. That card table is not optional. Without it, the model grades its own corrections in private and learns the wrong lessons with confidence.

The metrics section is admirably honest. Twenty-two corrections in thirty days, trending down. Task success rate sitting at 93.5 percent with a small dip in the last seven days. The author does not oversell this. Thirty days on one user on one machine is not proof of generalization. The bar being held is "fewer repeats of the same mistake," not a zero-defect agent. Two patterns emerged from the correction analyzer: incomplete tasks and repeated mistakes. Both generated top-level rules that are now loaded on every session startup. That is the loop actually closing, and it is satisfying to see it described in concrete terms rather than abstract diagrams.

The fragile part the author identifies is the regex classifier. Seven patterns cover most corrections but unknown shows up too often. Replacing regex with an LLM call would solve labeling but introduce latency, cost, and the much worse problem of the model hallucinating bad reflections and reinforcing them. Yohei Nakajima gets cited here for exactly that observation. The architecture is deliberately keeping humans in the review path to prevent that failure mode, which is the correct instinct even if it limits throughput.

**Key takeaways:**

- Build a corrections pipeline with a strict no-silent-aging rule, corrections must drain or escalate, never disappear
- Treat memory as four separate sinks with different lifespans: working memory, lessons, feedback memories, top-level rules
- A human-readable surface on top of the learning loop is not optional, it prevents the model from reinforcing bad reflections
- Regex classification is cheaper and more auditable than LLM classification for high-frequency, low-stakes labeling
- Measuring correction frequency and correction recurrence is more useful than measuring task success rate alone
- Stable tooling infrastructure is a prerequisite for observing agent behavior, you cannot see the corrections loop if the surrounding stack is noisy

**Why do I care:**

I find this genuinely useful to think about from an architecture perspective. The insight that "memory" is the wrong abstraction, that what you actually have is four different storage jobs with different decay curves and access patterns, maps cleanly onto how I think about state management in frontend systems. Working memory is component state. Lessons are event logs. Feedback memories are config files with schema. Top-level rules are environment variables. The human-review layer over the learning loop is exactly what code review does for pull requests. The failure mode the author describes, the model grading its own corrections privately, is just a self-merging PR policy and everyone knows that ends badly. What I am less convinced about is whether this architecture scales past one highly engaged operator. The nightly drain and card review require real attention. For teams or shared agents, the "human-in-the-loop" assumption breaks quickly.

**Link:** [I Built a Self-Improving AI Agent. Here Is What Made It Learn.](https://thoughts.jock.pl/p/i-built-a-self-improving-ai-agent)
