---
title: "Prose as a Programming Language: What OpenProse Got Right"
excerpt: "Kent Beck's live session with Dan Barrett explores OpenProse, a framework that lets you write programs in structured English and run them with an AI agent."
publishedAt: "2026-05-27"
slug: "prose-as-a-programming-language-openprose"
hashtags: "#kentbeck #openprose #llm #agentarchitecture #programminglanguages #generated #en"
source_pattern: "Kent Beck"
---

## Prose as a Programming Language: What OpenProse Got Right

**TLDR:** Dan Barrett built OpenProse, a framework that lets you write programs in structured English and execute them via an AI agent like Claude Code. Kent Beck and Barrett built a working coastal conditions service live during the session. The architecture underneath turns out to be more principled than it sounds.

Here's what gets me: when Kent Beck told Barrett that writing programs in prose sounded impossible, Barrett replied, "People were shocked that it works." That's the right reaction to have in 2026. We've been trained by 70 years of programming language theory to dismiss natural language as too ambiguous to compute with, and then someone actually ships it and it runs.

The architecture is where I started paying attention. Each OpenProse component has a requires block and an ensures block. Requires is what the component expects from its caller, ensures is what it promises to produce. Beck's first instinct was to call it a function, domain and range. Barrett corrected him: think more like a service. That distinction is load-bearing. When you have many components, an inversion-of-control container wires them together by matching ensures blocks to requires blocks, exactly the way Spring wires Java beans, except the whole thing is structured English interpreted by a language model. The ensures block is a postcondition. It's what every sibling component can rely on.

The Dijkstra objection shows up immediately, and Barrett's answer is the honest one: we don't know where the edges are until we walk toward them. Plenty of people would have said nothing is possible with prose. That's clearly not true anymore. The only way to find the limits is to keep building and see where things break. That's empiricism, not hand-waving.

One specific engineering decision I keep thinking about: sub-agents pass pointers instead of data. Variable bindings are files. When a sub-agent produces a large context block, a full PDF analysis or a research output or in this demo an hourly tide chart, it writes to disk and hands back the file path. The main thread stays clean. This is context management done at the file system level, and it's elegant in a way that feels obvious in hindsight. You're not stuffing gigantic outputs into a shared memory model. You're doing what Unix did: pass small handles that point to big things.

Beck is building a Smalltalk VM from scratch at the same time, literally writing a virtual machine, and he made a point that stuck with me. His VM is 1000x faster than LLM-based primitives. But the primitives in OpenProse are so much larger in capability that on the right class of problems, the performance difference evaporates. This is the real tradeoff question for the next few years: raw throughput versus the semantic weight of each operation. OpenProse bets on heavier primitives. For a lot of problems, that's the right bet.

Barrett's thesis is that the whole industry is moving toward declaring outcomes and letting agents figure out the path. Codex has a /goal feature. Anthropic shipped something called Outcomes in their API. OpenProse is an early, working articulation of that idea at the framework level. Specify what you want to be true, not how to make it true. That pattern is showing up everywhere now.

**Key takeaways:**
- OpenProse uses requires/ensures blocks that an inversion-of-control container wires together, giving prose-based programs real compositional structure
- Sub-agents pass file paths instead of data blobs, keeping the main execution thread clean and solving context management at the file system level
- The outcome-declaration pattern is converging across the industry: specify the postcondition, let the agent find the path

**Why do I care:** From a frontend architecture standpoint, the requires/ensures contract model is something I want to steal directly. We spend enormous energy on component contracts in TypeScript, prop types, and API schemas. A framework that makes postconditions explicit and uses them for automatic wiring is solving a real problem. The file-path-as-variable trick is also immediately applicable anywhere you're orchestrating multi-step agent pipelines and fighting context window limits. OpenProse is early and it's a sponsored session so take the enthusiasm with some salt, but the underlying patterns are sound.

**Link:** [Genie Lessons from Genie Sessions: Prose as a Programming Language](https://tidyfirst.substack.com/p/genie-lessons-from-genie-sessions)
