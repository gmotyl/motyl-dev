---
title: "Augment Sunsets IDE Extensions: What It Means and Where to Go Next"
excerpt: "Augment is shutting down its IDE extensions with about a month's notice, moving upmarket to enterprise and its Cosmos agent platform — leaving individual developers and small teams to find alternatives."
publishedAt: "2026-06-22"
slug: "augment-sunsetting-ide-extensions-kilo-code-alternative"
hashtags: "#ai #productivity #engineering #kilo #jetbrains #vscode #developertools #generated #en"
source_pattern: "Kilo"
---

## Is Augment Sunsetting Its IDE Extensions? Why Switch to Kilo Code?

**TLDR:** Augment Code is shutting down its IDE extensions with roughly a month's notice, citing a strategic pivot to enterprise customers and its Cosmos agent platform. Individual developers and small teams — especially JetBrains users — are left searching for alternatives, and Kilo Code is positioning itself as the drop-in replacement.

**Summary:**

The AI coding tools space keeps reminding us that "free" or "affordable" today doesn't mean the same thing tomorrow. Augment Code sent emails to its IDE extension users announcing the sunset of those extensions — this isn't a soft deprecation or a feature trim, it's a full shutdown. JetBrains users are particularly affected, and the community reaction has been blunt: people paid for credits through July 1 just to squeeze out the last bit of value from something they liked.

What's driving this? Augment is making a clear strategic choice. The individual developer and small team market is expensive to serve at low margins, and Augment is going where enterprise contracts live. Their Cosmos agent platform and Augie CLI are the future they're betting on, but those tools have a fundamentally different workflow — less IDE-native, more terminal-centric. The complaints are predictable: developers who loved having autocomplete and an agent panel directly in PyCharm don't want to switch to a CLI that "feels clunky."

The pricing move underscores the direction. The free Community plan is gone. Their Business plan starts at $100/month for up to 50 seats, with no lower entry point. For solo developers or small teams, that's a hard no. And when a company restricts its subreddit and closes its Discord at the same time it changes pricing and sunsets products, the signal is clear: they're not interested in that community anymore.

Kilo Code steps into this gap with a story that speaks directly to the displaced Augment user. Their JetBrains plugin — rebuilt from scratch as a native JetBrains plugin in Version 7 — ditches the WebView approach that caused friction, bundles its own CLI runtime (eliminating Node detection issues), and adds features like Next Edit mode and a checkpoint tracker for reviewing and rolling back agent changes. The open-source Apache-2.0 license and bring-your-own-key pricing model with no markup on provider rates is a pointed contrast to Augment's opaque credit system and $100 floor.

Is Kilo Code perfect? The early reviews for their JetBrains extension were mixed — they admit as much. But "Version 7 is the answer to most of those complaints" is a specific, verifiable claim. Having an ex-JetBrains engineer (10 years at the company) on the team building a native plugin is exactly the kind of hire that matters here. Connecting to 500+ models through one gateway with transparent per-request context window and prompt visibility is genuinely valuable for developers who want to understand what they're paying for.

**Key takeaways:**

- Augment is sunsetting its IDE extensions (~1 month notice), pivoting fully to enterprise/Cosmos platform
- Free Community plan eliminated; $100/month minimum for any access
- JetBrains users most impacted — Augie CLI seen as poor replacement for native IDE experience
- Kilo Code Version 7 is a native JetBrains plugin (not WebView), with Tab autocomplete, Next Edit mode, agent panel, and checkpoint rollback
- Kilo uses bring-your-own-key with no markup; supports 500+ models; Apache-2.0 open source
- Built partly by an engineer with ~10 years at JetBrains itself

**Why do I care:** The Augment story is a cautionary tale about building workflow dependency on a startup's free or low-cost tier — and it's not unique to Augment. The tools that win long-term are the ones where the pricing model aligns with how developers actually work: pay-as-you-go, no surprise floors, no expiring credit pools. From an architect's perspective, the more interesting signal here is the native IDE integration battle. A WebView-based plugin is a shortcut that accumulates debt; a truly native plugin that understands the IDE's own tool windows and lifecycle is the right investment. If Kilo's Version 7 delivers on that promise, it's not just a replacement for Augment — it's a more defensible product category than most AI coding tools currently occupy.

**Link:** [Is Augment sunsetting its IDE extensions? Why switch to Kilo Code?](https://blog.kilo.ai/p/is-augment-sunsetting-its-ide-extensions?publication_id=4363009&post_id=202708478&isFreemail=true&triedRedirect=true)
