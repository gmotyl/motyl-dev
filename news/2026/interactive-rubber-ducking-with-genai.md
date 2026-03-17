---
title: "Interactive Rubber Ducking with GenAI"
excerpt: "A thoughtful approach to using AI as a Socratic sparring partner — not to generate solutions, but to ask the hard questions that expose the blind spots in your own thinking."
publishedAt: "2026-03-16"
slug: "interactive-rubber-ducking-with-genai"
hashtags: ["#ai", "#architecture", "#softwaredesign", "#typescript", "#generated", "#en", "#substack"]
---

## Interactive Rubber Ducking with GenAI

**TLDR:** Instead of asking AI to generate solutions, use it as an interactive questioner that forces you to articulate and stress-test your own ideas through structured back-and-forth dialogue.

**Summary:**

There is a specific kind of loneliness that comes with being the primary decision-maker on a technical project. When you are an architect or technical lead working in a niche domain, finding another human who can meaningfully challenge your design thinking is hard. They are busy, need context, and you need to have something coherent to show them in the first place. You end up validating your own ideas inside your own head, which is precisely the worst way to find blind spots.

The pattern described here — called Interactive Rubber Ducking — reframes what AI is good for in a way that feels genuinely honest about its limitations. AI tools are sycophantic by training. Ask them to evaluate your idea and they will agree with it. The trick is to set up the AI in a mode where it cannot say yes or no — it can only ask questions. One question at a time, building on previous answers, with the explicit goal of producing a thorough specification that came from you, not the model. The AI is the prompter; you are the source of truth.

The concrete example in this piece is a second-level cache implementation for Pongo, a MongoDB-compatible layer on top of PostgreSQL. What starts as "I want to use lru-cache or keyv" becomes a fully articulated design covering pluggable cache providers, cascading configuration from client down to per-operation options, transaction semantics, key prefixing strategies, error handling philosophy, and batch loading patterns. None of that design came from the AI. It came from the author being forced to answer increasingly specific questions. The spec is the artifact, but the thinking is the product.

What makes this work better than just brainstorming with a language model is the structure. Storing each Q&A pair in `qa.md` as it happens and then producing a `spec.md` summary means nothing is lost and the design rationale is preserved alongside the outcome. Running this in Claude Code rather than Claude Chat also matters — the model can reference actual codebase context, check existing APIs, and ground its questions in real constraints rather than hypotheticals. The recommendation to use larger, more capable models for this task is important: cheaper models ask shallower questions, and shallow questions produce shallow thinking.

The intellectual honesty here is worth noting. This is a GenAI skeptic describing a use case where AI adds genuine value — not by being smart, but by being relentless. It is not doing the creative work; it is creating the pressure under which you do the creative work yourself. That is a meaningful distinction, and one that most AI productivity discourse completely ignores. The question worth asking is whether the same discipline could be achieved with a good checklist or a structured design doc template. The answer is probably: sometimes, but not as dynamically, and not at the cost of zero scheduling friction.

**Key takeaways:**

- Use a single-question-at-a-time prompt to force iterative specification — the structure prevents the AI from overwhelming you with a wall of suggestions
- Store Q&A pairs incrementally (`qa.md`) and generate a summary spec (`spec.md`) — preserves design rationale alongside conclusions
- Use a capable model (Opus-class) in an agentic coding environment with codebase access — lower models and chat interfaces produce noticeably weaker questions
- The goal is not an AI-generated spec you hand to a developer; the goal is a human-refined spec that the AI forced you to articulate
- The cascading config pattern (`client → db → collection → session → per-operation`) illustrated in the Pongo cache design is a solid general model for layered configuration in TypeScript libraries

**Why do I care:**

If you are building TypeScript libraries or frameworks — even frontend ones — the cascading configuration pattern demonstrated here is worth stealing directly. The `CacheConfig | 'disabled' | undefined` discriminated union with three states (inherit, off, explicit) maps perfectly to any context-sensitive options system: think query clients, fetch wrappers, or state manager middleware chains. The broader rubber ducking technique also applies outside backend work — trying to nail down a component API, a data-fetching strategy, or an architecture decision before bringing it to team review follows exactly the same shape. The AI is not your reviewer; it is your warm-up before the real conversation.

**Link:** [Interactive Rubber Ducking with GenAI](https://www.architecture-weekly.com/p/interactive-rubber-ducking-with-genai?publication_id=579466&post_id=191127846&isFreemail=true&triedRedirect=true)
