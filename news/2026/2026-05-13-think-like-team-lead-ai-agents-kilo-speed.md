---
title: "How to Think Like an Engineering Team Lead in the Age of AI Agents"
excerpt: "Marius Wichtner's mental model for agentic engineering treats the developer as a team lead who delegates execution to agents, maintains judgment, and scales work across parallel workstreams."
publishedAt: "2026-05-13"
slug: "think-like-team-lead-ai-agents-kilo-speed"
hashtags: "#ai #engineering #architecture #generated #en #agents #llm #workflow"
source_pattern: "Kilo"
---

## Inside Kilo Speed: The Engineer Who Teaches Teams How to Think in Agents

**TLDR:** Marius Wichtner, an engineer at Kilo Code, trains enterprise teams on agentic software development using a team lead mental model. He argues that understanding the conceptual foundation of agentic work, not just the tools, is what makes the practice actually stick.

**Summary:**

The central metaphor Marius uses is one most senior engineers will recognize immediately: the team lead who stopped writing most of the code years ago. That person spent their days in pairing sessions, answering questions, reviewing pull requests, and deciding what was safe to merge. They were handling the last 20% of every problem, the judgment work, while execution happened around them. Marius argues this is exactly the role engineers should step into when working with AI agents. The agent handles code generation, boilerplate, and well-scoped subtasks. The engineer handles architectural decisions, merge calls, and recognizing when the agent has drifted somewhere it shouldn't be.

One of the most practically useful ideas in Marius's approach is the distinction between a specification and a plan. A specification is what the user actually wants, and it doesn't change. A plan is how you intend to build the thing given the current state of the codebase, and plans get thrown away constantly. Before any complex task begins, Marius asks the agent to write its plan to a markdown file for review. This sounds simple, but it forces a shared understanding before execution starts. You surface problems during refinement, not after the agent has spent an hour heading in the wrong direction. The plan also becomes a contract you can reference later: when the agent does something unexpected, there's a document that says what it agreed to do.

Context rot is the other phenomenon Marius takes seriously, and I think it's one of the least-discussed failure modes in agentic development. As a session grows, accumulating history and intermediate states, the agent starts losing coherence. Decisions made early in the session compound in ways that become hard to untangle. Marius's response is to treat this not as a nuisance to work around, but as a signal that the work hasn't been decomposed correctly. Long features get broken into sub-problems, each handled in a short, focused context window. This is where parallelism enters: multiple agents, running simultaneously, each working in an isolated environment, each tackling a specific sub-problem. The engineer reviews diffs as they come in and merges what's good.

He routes tasks across three categories based on complexity. Straightforward, well-scoped tasks like documentation or unit tests go to a fully autonomous cloud workflow with no supervision. Complex features with architectural decisions get handled locally using Kilo's Agent Manager, with the engineer staying close and making judgment calls across parallel workstreams. Tasks where the outcome itself isn't well-defined get run as a competition: multiple agents working against the same spec, generating variants, with the engineer choosing the best result. The routing decision itself is engineering judgment.

The piece ends with something worth sitting with. Marius points out that code and prompts are always an approximation. There are causal relationships in a codebase that are hard to capture anywhere: architectural decisions from another team that create a dependency you didn't know about, behaviors that only surface at scale. An agent can't know what hasn't surfaced yet. That's still the engineer's job. The easy mistake with agentic work is treating it as a handoff. The harder, more honest version is maintaining engineering judgment across multiple concurrent threads, rather than sequentially inside a single one.

**Key takeaways:**

- Use the team lead mental model: delegate execution to agents, retain judgment on architecture and what to merge
- Always ask the agent to write its plan to a file before execution begins; review it, then use it as a contract
- Context rot is a decomposition problem, not a tooling problem; break large features into sub-problems handled in short sessions
- Run parallel agents in isolated environments to scale across concurrent workstreams
- Route tasks by complexity: autonomous for simple, supervised parallel for complex, competitive variants for unclear outcomes
- The engineer's irreplaceable contribution is the context that hasn't been captured anywhere yet

**Why do I care:**

From a frontend architect's perspective, this is the most grounded framing of agentic development I've seen. Most of what gets written about AI coding tools focuses on prompting techniques or tool comparisons, which is roughly equivalent to discussing keyboard shortcuts while ignoring software design. The team lead model is useful precisely because it maps onto how senior engineers already operate. What's missing from this piece, and I think Marius is deliberately not addressing it, is the question of how you build and maintain the specification layer over time. In a real codebase, specs live in Jira tickets, Slack threads, and people's heads. The gap between what's captured and what's actually true about the system is where agents fail most spectacularly, and that's a knowledge management problem that parallelism and context engineering don't solve.

**Link:** [Inside Kilo Speed: The Engineer Who Teaches Teams How to Think in Agents](https://blog.kilo.ai/p/inside-kilo-speed-the-engineer-who)
