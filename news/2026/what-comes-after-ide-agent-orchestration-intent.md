---
title: "What Comes After the IDE: Rethinking Developer Tools for the Age of AI Agents"
excerpt: "Amelia Wattenberger discusses Intent, Augment Code's post-IDE workspace that replaces traditional code editing with agent orchestration, living specs, and isolated workspaces for parallel AI-driven development."
publishedAt: "2026-03-20"
slug: "what-comes-after-ide-agent-orchestration-intent"
hashtags: "#refactoring #ai #agents #dx #tooling #architecture #ide #generated #en"
---

## What Comes After the IDE — with Amelia Wattenberger

**TLDR:** Amelia Wattenberger, formerly a principal research engineer at GitHub and now at Augment Code, argues that the traditional IDE is fundamentally misaligned with how developers work in an AI-first world. Her team built Intent, a workspace that replaces the code-centric IDE with isolated environments centered on agent orchestration, living specs, and parallel task execution.

The premise here is provocative but grounded in a real observation: every single pixel in the IDE is devoted to reading and understanding code. That made sense when developers spent most of their time doing exactly that. But as AI agents become increasingly capable of handling the granular work of code comprehension, writing, and modification, the developer's role is shifting toward higher-level abstraction, planning, and intent specification. The tools, however, have not kept up. We have essentially hacked AI into existing primitives by bolting chat windows onto IDEs, command lines, and GitHub, without asking what the interface should actually look like when developers spend more time directing work than doing it line by line.

Intent is Augment Code's exploration of that question. The fundamental primitive is the workspace, not the file or the tab. For any piece of work, you spin up an isolated environment that bundles a copy of your codebase with its own branch and Git worktree, a set of agents, rich markdown notes, terminals, and a spec. You can run multiple workspaces simultaneously, switching between tasks without the cognitive overhead of juggling Git branches or trying to reconstruct context from scattered chat conversations. This is a meaningful departure from the traditional model where your IDE is essentially a glorified text editor with some debugging bolted on.

One of Intent's most opinionated design choices is how it handles agent orchestration. By default, the app ships with specialist personas. There is a coordinator that delegates work to implementers and verifiers, creating a natural separation of concerns in the AI workflow itself. But everything is configurable through natural language settings, which means teams can adapt the orchestration model to their own preferences and workflows. The decision to split agents into focused roles rather than having one monolithic assistant reflects a real insight about how complex work gets done: specialization produces better outcomes, even in AI systems.

The concept of the "living spec" as a control plane is perhaps the most interesting architectural decision. Instead of treating the plan as a static document that gets abandoned once coding begins, Intent makes the spec a first-class, continuously updated artifact that both humans and agents reference throughout the development process. This addresses a genuine pain point in AI-assisted development: context drift. When you have a long conversation with a coding assistant, the context window fills up, earlier decisions get forgotten, and the work gradually loses coherence. A persistent, editable spec that serves as the source of truth is a pragmatic solution.

Wattenberger also raises an important point about how AI multiplies different types of engineers unequally. Experienced developers who already think architecturally and can decompose problems effectively get enormous leverage from agent orchestration. They know what to ask for, can evaluate the output, and can course-correct when things go wrong. Less experienced developers, however, may find that AI amplifies their gaps rather than filling them, because they lack the judgment to know whether the generated output is correct or the plan is sound. This is not an indictment of junior developers. It is a recognition that the skills that matter most in an AI-augmented workflow are precisely the ones that take years to develop: system thinking, decomposition, taste, and the ability to evaluate tradeoffs.

The broader thesis about the changing shape of roles and specialization deserves scrutiny. Wattenberger suggests that as AI handles more implementation work, the value shifts toward people who can define intent clearly, orchestrate complex workflows, and maintain quality standards across multiple parallel workstreams. This is essentially the "Architect Mode" argument we have been hearing from multiple sources, but Intent actually builds tooling around it rather than just describing a mindset shift.

However, it is worth challenging the assumption that the IDE is truly obsolete. For many workflows, especially debugging, performance profiling, and working with complex type systems, the code-centric view remains essential. The question is not whether we should abandon the IDE entirely but whether it should remain the primary interface for all development work. Intent seems to understand this nuance by including terminals and code access within workspaces rather than eliminating them entirely.

**Key takeaways:**
- The traditional IDE's every-pixel-for-code design is misaligned with AI-augmented workflows where developers operate at higher abstraction levels
- Workspace isolation with dedicated branches, agents, and specs per task eliminates context switching overhead
- Agent orchestration with specialized roles (coordinator, implementer, verifier) produces better results than monolithic AI assistants
- The "living spec" as a persistent control plane solves the context drift problem in long AI coding sessions
- AI multiplies experienced developers more than junior ones, because architectural judgment and decomposition skills become the primary value drivers

**Why do I care?** If you are building or leading frontend teams, this conversation forces you to think critically about your tooling investment. The shift from code-centric to intent-centric workflows has direct implications for how you structure projects, onboard new team members, and evaluate developer productivity. The workspace-per-task model maps well to how complex frontend work actually happens, where you are often juggling multiple feature branches, design iterations, and integration work simultaneously. And the agent orchestration pattern, with specialized roles for different phases of work, mirrors the kind of architectural thinking that separates effective teams from ones that just throw code at problems. Whether or not Intent itself becomes your tool of choice, the patterns it introduces around spec-driven development and parallel agent execution are worth incorporating into your workflow now.

**Link:** [What Comes After the IDE — with Amelia Wattenberger](https://refactoring.fm/p/what-comes-after-the-ide-with-amelia)

---

*The content above is AI-generated based on newsletter sources. While I strive for accuracy, please verify critical information from original sources.*