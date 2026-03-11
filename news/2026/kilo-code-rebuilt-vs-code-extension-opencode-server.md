---
title: "Kilo Code Rebuilt Their VS Code Extension From Scratch on a Portable Open-Source Core"
excerpt: "Kilo Code ships a completely rebuilt VS Code extension powered by OpenCode server, bringing parallel subagents, git worktrees for multi-agent workflows, and inline diff review to AI-assisted development."
publishedAt: "2026-03-10"
slug: "kilo-code-rebuilt-vs-code-extension-opencode-server"
hashtags: "#kilo-code #ai #vscode #developer-tools #generated #en"
---

## Kilo Code Rebuilds Their VS Code Extension on a Portable, Open-Source Foundation

**TLDR:** Kilo Code has completely rebuilt their VS Code extension on top of OpenCode server, an MIT-licensed portable core that replaces the old VS Code internals dependency. The new architecture enables parallel tool calls, subagent delegation, git worktrees for multi-agent isolation, and inline diff review -- all sharing the same engine as the Kilo CLI.

**Summary:**

Let's cut to the chase here. Kilo Code had a problem that many developer tools eventually hit: they built everything on VS Code internals, and then tried to ship that same foundation everywhere else. JetBrains, CLI, cloud agents -- all of them were dragging along VS Code dependencies whether they needed them or not. The most painful example was running VS Code internals inside JetBrains. That is exactly the kind of architectural debt that makes you stop and rethink everything.

So they did. They rebuilt the CLI on OpenCode server, an MIT-licensed open-source core, and now they have brought that same engine to the VS Code extension. One portable foundation across every surface. This is the right move architecturally, but let's be honest about what it means in practice: this is a pre-release, not everything has been migrated yet, and provider configuration currently requires going through the CLI. They are being upfront about shipping early and iterating with community feedback, which is refreshing, but it also means early adopters are going to hit rough edges.

The parallelism story is genuinely interesting. The extension now supports parallel tool calls -- file reads, terminal commands, and searches running concurrently instead of sequentially. On top of that, you get parallel subagents: spin up an implementation agent, a test-writing agent, and a documentation agent all working simultaneously, with an orchestrator mode coordinating the delegation. You can even define custom subagents for security review, migration, or linting. This is where the real productivity multiplier lives, though the article does not address how you handle conflicting changes when multiple subagents touch overlapping code.

The Agent Manager with git worktree support is the feature that deserves the most attention. Each agent tab is fully independent, and worktrees give each agent its own copy of the repository. One agent adds an API endpoint, another refactors auth, a third writes tests -- all simultaneously without merge conflicts during execution. When they finish, you merge the results like branches from different developers. The built-in diff reviewer with line-level review comments that get sent back to the agent as structured context is a thoughtful design choice. It turns the agent interaction into something closer to a pull request workflow rather than a black-box approval process.

What the article skips over is the cognitive overhead of managing multiple parallel agents. Orchestrating eight agents simultaneously sounds powerful on paper, but the mental model required to track what each one is doing, review their outputs, and merge coherently is nontrivial. There is also no discussion of token costs -- running parallel subagents on complex tasks with models like Claude Opus 4.6 or GPT-5.3 is going to burn through API credits fast. The multi-model comparison feature, where you run the same prompt through different models side by side, is clever for decision-making but doubles or triples your cost per task. The article frames this purely as a capability win without acknowledging the economic tradeoff.

**Key takeaways:**

- The new extension is built on OpenCode server (MIT-licensed), sharing the same portable core as the Kilo CLI, eliminating the VS Code internals dependency across all surfaces
- Parallel tool calls and parallel subagent delegation are the primary performance improvements, with customizable subagents for team-specific workflows
- Git worktrees in the Agent Manager let multiple agents work on the same codebase simultaneously without conflicts, with merge handled like standard branch workflows
- The inline diff reviewer with line-level comments sent as structured context to the agent creates a code review workflow for AI-assisted development
- Session continuity between CLI and VS Code is native to the architecture, not bolted on
- This is a pre-release: provider configuration is CLI-only for now, migration tooling is still being built, and they are offering a $100 bug bounty in Kilo Credits for merged PRs

**Tradeoffs:**

- Shipping as a pre-release means early adopters trade stability and feature completeness for influence over the product direction. Provider setup through CLI only is a real friction point for VS Code-first users.
- Parallel agent workflows multiply throughput but also multiply token costs and cognitive overhead. The article does not discuss the economics of running multiple subagents or multi-model comparisons on large tasks.
- The git worktree approach to agent isolation is sound engineering but adds repository management complexity. For smaller projects or quick tasks, the overhead of worktree creation and merge may not justify the parallelism gains.
- Custom subagents offer flexibility but require upfront investment in defining delegation patterns. Teams need to figure out the right granularity of agent responsibilities, which is a new design problem most teams have not encountered before.

**Link:** [We've completely rebuilt the Kilo Code extension for VS Code](https://blog.kilo.ai/p/we-completely-rebuilt-the-kilo-vs-code-extension?publication_id=4363009&post_id=190122610&isFreemail=true&triedRedirect=true)