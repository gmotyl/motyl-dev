---
title: "How to Land a Job at a Frontier AI Lab (and What's Moving in the Stack This Week)"
excerpt: "Vlad Feinberg's pretraining job prep guide, Cursor's Composer 2.5 reveal, agent infrastructure maturing, and a week of quiet-before-Google-I/O momentum across the AI ecosystem."
publishedAt: "2026-05-19"
slug: "ainews-frontier-lab-jobs-pretraining-cursor-agents"
hashtags: "#ai #llm #ml #pretraining #agents #inference #generated #en"
source_pattern: "AINews"
---

## How to Land a Job at a Frontier AI Lab (and What's Moving in the Stack This Week)

**TLDR:** Vlad Feinberg's guide to getting hired at a frontier lab makes kernel-level performance work the clearest on-ramp, with practical exercises that are surprisingly doable. Meanwhile, Cursor disclosed it's training a much bigger model from scratch, agent infrastructure is hardening around observability and verification, and local inference on commodity hardware just got meaningfully faster.

**Summary:**

It was the day before Google I/O, which means the industry was doing its best impression of a calm sea while quietly churning underneath. Vlad Feinberg, who comes from Google and knows his way around TPUs, posted what turned out to be a remarkably direct guide on how to get hired at a frontier lab, specifically focused on pretraining. The core claim is one I find both practical and a little humbling: the biggest bottleneck in LLM work is performance work at the kernel level, and if you can tune models there, you have the most direct path into the labs. He references DeepMind's Scaling handbook from last year, nods to the recent proliferation of DSLs for kernel development, and then drops a set of exercises that amount to "derive Chinchilla laws, code the solution in JAX from scratch, then write a Pallas kernel that beats ragged_dot for MoE layers." That's not a typical job prep checklist. It's a full weekend project. But swyx pointed out it might fit into a two-to-three hour live workshop, and honestly that reframing makes it feel more approachable.

Cursor had the other major story of the week. They launched Composer 2.5, which the community immediately called a step up from Composer 2 in terms of sustained work on longer tasks and more reliable instruction following. But the more interesting disclosure was what came after: Cursor is training a much larger model from scratch using ten times more total compute, with access to Colossus 2's million H100-equivalents, in a partnership they're calling "SpaceXAI." That's not a product launch, it's a capability bet. The reactions focused less on benchmarks and more on the efficiency and collaboration behavior people noticed in the model's updates and messages. That's a good sign.

Agent infrastructure had a busy few days in a quieter, more infrastructure-y way. LangChain's LangSmith Engine is being positioned as the missing CI/CD loop for agents, automatically detecting failures from production traces and drafting fixes. Cognition launched Devin Auto-Triage as an always-on first responder for bugs and incidents. Anthropic published best practices for running Claude Code across multi-million-line monorepos. OpenAI expanded Codex workflows to mobile and desktop with remote execution. The common thread in all of this is that the product direction has shifted away from "chat with an agent" toward persistent background automation tied to traces, memory, and evals. François Chollet's framing of coding agents as "blind squirrels" that need carefully placed verifiable constraints fits this moment well. The practical consensus forming is that agent quality depends more on verification surfaces and feedback loops than on prompt cleverness.

On the inference side, Georgi Gerganov shipped MTP support for the Qwen3.6 family in llama.cpp, and the throughput gains were real: one report showed a Qwen3.6-27B dense jump from 25 tokens per second to 45 tokens per second on an A10G, a 78% improvement. That's not a rounding error. It meaningfully narrows the gap between local and hosted assistants on commodity hardware. Alibaba's Qwen line also landed strong positions in Arena rankings, with Qwen3.7 Max Preview at number 13 overall and top-ten finishes in Math, Expert, and Coding categories. Zyphra published end-to-end benchmarks on AMD Instinct MI355X claiming a narrowed gap to NVIDIA B200 when serving several major models. And Quentin Anthony posted a useful reminder that benchmarking needs to distinguish hardware ceilings from current software state, because conflating them produces misleading comparisons.

On the research side, several papers this week focused on better training signals rather than bigger models. Work on Pedagogical RL argued that even correct reasoning traces can be poor training data if they're too surprising relative to the student policy, which is a subtle but important point. Meta's AIRA work on agentic neural architecture discovery reportedly beats Llama 3.2 at 350M, 1B, and 3B scales within a 24-hour compute budget. And Anthropic announced the acquisition of Stainless, the SDK and MCP server platform that has powered Anthropic SDKs since early API days, which signals continued vertical integration around developer ergonomics rather than just model quality. Richard Sutton's 26-word compression of the Bitter Lesson circulated widely: focus on methods for creating knowledge that scale with compute. That line landed because it describes exactly what a lot of this week's work was pointing toward.

**Key takeaways:**

- Kernel-level performance work is the most direct path into frontier labs, according to Vlad Feinberg's pretraining job guide, which includes concrete JAX and Pallas exercises
- Cursor's Composer 2.5 launched with strong community reception, and Cursor disclosed a much larger model in training using 10x more compute with Colossus 2
- Agent infrastructure is converging on observability, background execution, and verification loops rather than interactive chat completions
- MTP support in llama.cpp delivered a 78% throughput boost for Qwen3.6-27B on an A10G, narrowing the gap between local and hosted inference
- Alibaba's Qwen3.7 is climbing Arena rankings steadily, reaching top-10 in Math, Expert, and Coding categories
- Anthropic acquired Stainless, signaling investment in SDK tooling and MCP server infrastructure beyond just model development
- Research is shifting focus toward better training signals, data selection methodology, and agent evaluation frameworks over raw scaling

**Why do I care:** The Vlad Feinberg hiring guide is the rare piece of career advice that's actually specific enough to act on. Most "how to get into AI" content is vague encouragement wrapped in buzzwords. This one says: learn to write Pallas kernels, understand MoE routing at the implementation level, and prove you can make things run faster. That's a skill tree, not a platitude. Combined with Cursor's disclosure that they're training a frontier-scale model from scratch, this week reinforces something I've been thinking about: the gap between "people who understand the stack deeply" and "people who use the stack" is widening, and the people who can sit at the kernel level while also thinking about agent verification loops are going to be genuinely rare and genuinely in demand.

**Link:** [[AINews] How to land a job at a frontier lab (on Pretraining)](https://www.latent.space/p/ainews-how-to-land-a-job-at-a-frontier?publication_id=1084089&post_id=198343451&isFreemail=true&triedRedirect=true)
