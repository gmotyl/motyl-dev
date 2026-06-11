---
title: "Kilo Console Beta Brings a Local Browser UI to Your AI Coding Workflow"
excerpt: "Kilo Console is a local, browser-based interface for managing Kilo CLI projects, sessions, git worktrees, and agent settings without touching JSON files."
publishedAt: "2026-06-11"
slug: "kilo-console-beta-local-browser-ui-ai-coding"
hashtags: "#ai #productivity #tools #devtools #cli #generated #en"
source_pattern: "Kilo"
---

## Kilo Console (Beta) is Live

**TLDR:** Kilo has launched a browser-based console for its CLI tool, currently in beta. It centralizes project management, git worktrees, agent configuration, and model provider settings into one local UI.

**Summary:**

So Kilo shipped a console. And honestly, this is the kind of thing that happens when a CLI tool grows up: at some point, hand-editing JSON config files stops being acceptable and someone builds a UI. That is exactly what Kilo Console is. You spin it up from your terminal with a Release Candidate package, it starts a local daemon, and opens a browser window. From there, you get a project list, git worktree management, session launching, and settings management all in one place.

The settings panel is a thoughtful touch. Each setting shows you where its value comes from, whether inherited from global config or set at the project level. That kind of layered configuration visibility is something developers have needed for years in tools like this, and most tooling ignores it entirely. Here it is front and center, which tells you something about how the team thinks about user experience.

The agents section is where things get interesting for anyone building on top of Kilo. You can review the built-in agents the Kilo team ships, inspect what tools they have access to, and control permissions on a per-agent basis. You can also create your own custom agents from here. That is a meaningful amount of control over what AI is allowed to do on your machine, and it is good to see it surfaced in a UI rather than buried in documentation.

Model provider setup lives in global settings. Out of the box you get Kilo Gateway, and from there you can browse dozens of additional providers. The live theme switching, where you pick a theme and it applies to your running terminal session without a restart, is a small quality-of-life feature that signals the team is paying attention to the little things. These details matter more than people admit.

**Key takeaways:**
- Install via `npm -g install @kilocode/cli@rc` then run `kilo console` to start
- Manages projects, git worktrees, and sessions from a local browser UI
- Per-project and global settings with clear inheritance visibility
- Agent permission controls let you define what AI tools are allowed to do
- Model provider configuration supports dozens of providers beyond Kilo Gateway
- Still in beta; team is actively seeking feedback via Discord

**Why do I care:**

From an architect's perspective, the agent permission model is the most consequential feature here. Giving developers explicit, UI-driven control over what tools and file system operations an AI agent can perform is the right direction. Most AI coding tools treat permissions as an afterthought. If Kilo's permission system is as granular as the announcement implies, this could set a useful precedent for how we think about AI agent security in local development environments. The local-first architecture is also worth noting: no data leaves your machine for the console to function, which matters for teams working on proprietary code.

**Link:** [Kilo Console (Beta) is live!](https://blog.kilo.ai/p/kilo-console-beta-is-live)
