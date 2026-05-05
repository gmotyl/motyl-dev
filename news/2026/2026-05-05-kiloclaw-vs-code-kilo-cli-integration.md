---
title: "KiloClaw in VS Code: Your Autonomous Agent Gets a Seat Next to Your Code"
excerpt: "Kilo ships native KiloClaw chat inside VS Code and embeds the Kilo CLI into cloud agent instances, letting interactive coding and background automation share the same window."
publishedAt: "2026-05-05"
slug: "kiloclaw-vs-code-kilo-cli-integration"
hashtags: "#kilo #ai #aicoding #developertools #agenticai #generated #en"
source_pattern: "Kilo"
---

## KiloClaw in VS Code: Your Autonomous Agent Gets a Seat Next to Your Code

**TLDR:** Kilo Code v7.2.20 ships a native KiloClaw chat panel inside VS Code, and every KiloClaw cloud instance now includes the full Kilo CLI. The result is that your interactive coding assistant and your always-on autonomous agent now share the same editor window.

**Summary:**

There's a friction point that anyone who uses both an interactive coding assistant and a background autonomous agent knows well: you're deep in a file, you want to check what your agent found, and suddenly you're alt-tabbing to a browser or a separate app. That small interruption adds up. The Kilo team apparently heard this enough times in their Discord that they built directly at the problem.

The KiloClaw panel, available since v7.2.20 of the VS Code extension, appears alongside your Kilo Code sidebar. On one side you're writing code with an agent that sees your file tree, terminal output, and editor state. On the other side, KiloClaw is running on a remote server doing whatever you set it to do — monitoring a repo, processing requests, handling email checks, drafting that blog post. Both are in the same window. No tab switching.

What makes this more interesting than a simple chat widget is the second half: the Kilo CLI is now built into every KiloClaw instance. That means your cloud-hosted agent can invoke `kilo run` to spin up its own coding sessions, use `kilo pr` to check out and review pull requests, or reach any of the 500-plus supported models. So the agent isn't just watching and reporting back. It can actually do the work, open the PR, and let you know when it's ready for your eyes. The `/kiloclaw` command in the CLI also picks up organization context now, so if you've selected a team scope, it routes to that org's shared KiloClaw instance rather than your personal one.

There are honest rough edges here. The panel requires Kilo Gateway authentication — you can't get to it with a bare API key alone. The `/kiloclaw` CLI command has the same prerequisite. And documentation is still catching up to the feature, with an open PR to add a proper setup page that covers this in detail. WebSocket error handling did get fixed in the latest release, which means the panel no longer gets stuck in a broken state on connection failures. But I'd call this early access territory, not polished product.

The broader picture is that the line between "interactive agent" and "autonomous background agent" is getting blurry on purpose. Interactive agents work in your context. Autonomous agents work in their own context, on their own machines, on their own schedule. Having both in the same editor window means you can hand off a refactor to KiloClaw while you work on the interesting parts, check the results when they come in, and never leave the environment you're already in. That's a real workflow change, not just a UI convenience.

**Key takeaways:**
- KiloClaw now has a native chat panel inside VS Code (shipped in v7.2.20), running alongside Kilo Code for simultaneous interactive and autonomous agent access
- The Kilo CLI is built into every KiloClaw cloud instance, letting your background agent spin up coding sessions, review PRs, and use 500-plus models autonomously
- The `/kiloclaw` CLI command supports org-level context, routing to your team's shared agent when you have a team scope selected
- Both features require Kilo Gateway authentication — bare API key usage won't get you to the panel or the command

**Why do I care:**

Context switching is the real cost here, not keystrokes. Every time you leave your editor to check on what a background agent did, you pay a mental re-entry cost when you return. Putting the autonomous agent panel directly in VS Code is genuinely useful because it respects the fact that developers already live in their editor. The CLI-in-KiloClaw piece is the more technically interesting development to me though. An agent that can invoke other agents, check out PRs, run its own coding sessions — that starts to look less like a chatbot and more like a junior developer with server access. That's worth watching closely, and worth understanding before you grant it too much autonomy.

**Link:** [KiloClaw in VS Code, Kilo CLI in KiloClaw](https://blog.kilo.ai/p/kiloclaw-in-vs-code-kilo-cli-in-kiloclaw)
