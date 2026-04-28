---
title: "The IDE Is Not Dead, It Is Where the Agentic Stack Begins"
excerpt: "Kilo argues the IDE is still the gravitational center of agentic coding, and that the real leverage is parallel agents, model neutrality, and sessions that follow you across surfaces."
publishedAt: "2026-04-28"
slug: "kilo-the-ide-isnt-dead-agentic-stack-2026-04-28"
hashtags: ["#kilo", "#ide", "#agenticcoding", "#vscode", "#aitools", "#developertools", "#orchestration", "#generated", "#en"]
source_pattern: "Kilo"
---

## The IDE Is Not Dead, It Is Where the Agentic Stack Begins

**TLDR:** Every few months somebody declares the IDE obsolete. Kilo pushes back and argues the editor is still the core of the agentic coding loop, and that the interesting work is making the IDE, the CLI, the browser, and cloud agents behave like one platform. The piece also doubles as a roadmap pitch: parallel agents in worktrees, native orchestration across Code, Debug, Plan, and Ask roles, sessions that travel across interfaces, a 24/7 background agent called KiloClaw, and aggressive model neutrality with pay-per-token pricing.

**Summary:**

The post opens with a familiar pattern. Cursor launched and people buried the classic editor. Claude Code arrived and people buried Cursor. The author is tired of the cycle and points at the actual numbers, which still show that something like half of developers do not use AI in their daily work. If you want adoption you have to meet those people where they already live, and that is the IDE. Treating the editor as a relic does not help anyone ship faster today.

The argument then moves to leverage. The author is bullish on parallel execution and describes Kilo's Agent Manager, which spawns multiple agents across separate git worktrees, groups them, and gives you inline diffs, per-file reverts, and PR status without leaving VS Code. On top of that there is a built-in orchestrator that decomposes a task and routes subtasks to specialized agents like Code, Debug, Plan, and Ask. The mental model is less single-threaded autocomplete and more a small team of specialists you can supervise from one screen.

A second theme is portability. The author calls out vendor lock-in by name, mentions Cursor's SpaceX deal and Anthropic's API pricing changes, and pitches Kilo as model-agnostic by design with 500+ models, no markup, and the ability to swap models mid-session. The wider claim is that real developer workflows are not single-surface. You start something in the editor, review a PR from your phone, kick off a long task from the web, finish it in the CLI. Kilo Sessions are framed as the connective tissue that lets state follow the developer across all of those moments. KiloClaw extends that further into background automation that runs while you sleep.

The closing point is the one that hit hardest for me. Developers who churn out of a tool rarely cite missing features. They cite friction. Setup that takes too long, pricing you cannot predict, an extension that snaps in half the next time the model provider tweaks an API. The article frames the entire product as a friction-reduction exercise across every surface, with a deliberately boring pricing story to back it up.

**Key takeaways:**

- The IDE is not going away. It is the default surface for the majority of code that gets written, including by AI-skeptical developers.
- Parallel agents in separate worktrees, with inline diffs and per-file revert, are framed as the real productivity unlock, not faster single-threaded autocomplete.
- Native orchestration with role-specialized agents (Code, Debug, Plan, Ask) is positioned as the path beyond chat-driven coding.
- Sessions and context need to be portable across IDE, CLI, web, and background agents, otherwise developers feel the seams every time they switch.
- Model neutrality, transparent per-token pricing, and a single credit pool across surfaces are pitched as the antidotes to vendor lock-in.
- KiloClaw is described as ambient automation, closer to a personal ops layer than a coding agent.

**Why do I care:**

I have lived through enough editor wars to be skeptical of any "X is dead" headline, and this piece scratches an itch I have had for a while. The honest version of my workflow is messy. I plan in one tool, code in another, review PRs on my phone, and ask an agent to do the boring refactor while I am in a meeting. The thing I actually want is not a smarter chat box, it is a platform where state and context follow me without me curating it by hand. Parallel agents in worktrees feel like the obvious next step, because anyone who has tried to keep three Claude Code sessions alive in separate terminals knows how quickly that turns into accidental rebases at 11pm.

The vendor neutrality argument also lands. As an architect I have been burned by tools that quietly couple themselves to a single provider, and the cost of that lock-in shows up six months later, usually right when a better model drops from somewhere else. I am not ready to declare a winner in this space, and frankly I think anyone who is, is selling something. But the framing here is right. The interesting work is not the next flashy feature, it is closing the gaps between IDE, CLI, web, and background agents so that switching surfaces stops feeling like starting over. That is the part of the agentic stack I will keep watching, and I will be running my own bake-off on the worktree-based parallel agent flow before I commit to anything.

**Link:** [The IDE Isn't Dead. It's Where the Agentic Stack Starts.](https://blog.kilo.ai/p/the-ide-isnt-dead?publication_id=4363009&post_id=195635290&isFreemail=true&triedRedirect=true)
