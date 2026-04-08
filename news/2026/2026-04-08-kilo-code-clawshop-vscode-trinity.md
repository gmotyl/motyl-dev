---
title: "Kilo Code Weekly: ClawShop, VS Code GA, and Trinity-Large-Thinking"
excerpt: "Kilo released a rebuilt VS Code extension with community feedback, announced Trinity-Large-Thinking free model, and provided guidance for users after Claude banned OpenClaw integration."
publishedAt: "2026-04-07"
slug: "kilo-code-clawshop-vscode-trinity"
hashtags: "#kilocode #ai #vscode #agents #development #generated #en"
source_pattern: "Kilo Code"
---

## Kilo Code Weekly: ClawShop, VS Code GA, and Trinity-Large-Thinking

**TLDR:** Kilo released a completely rebuilt VS Code extension based on its CLI engine, announced the free Trinity-Large-Thinking model for one week, and provided migration paths for users affected by Claude's OpenClaw ban. ClawShop, their largest OpenClaw event, is happening April 8th.

## New VS Code Extension: A Week One Update

Last week Kilo shipped the completely rebuilt Kilo Code extension for VS Code. It's the same portable OpenCode server-based engine from the CLI, now integrated directly into your editor. The extension uses a single codebase rather than the previous approach of maintaining separate implementations, which means fixes and improvements ship everywhere at once.

The rollout to the full user base surfaced issues that a 20% pre-release group didn't catch. The team received direct feedback through GitHub issues, Discord, and pull requests, and they've been transparent about what they're prioritizing this week.

Rate limit errors are being addressed with improved backoff and the ability to cancel future attempts, so Kilo recovers gracefully or allows you to switch models and keep working. The Plan and Ask agents weren't strict enough about preventing write operations without permission, so the team is tightening permission enforcement and improving the handoff between agents.

Many users treat Kilo as a close collaborator, not an autonomous tool. They want to review changes before they land and stay in control. The team opened a tracking issue for diff review before approval, checkpoint improvements, permission flow challenges, per-agent tool controls, and an onboarding flow that configures the extension to match how you work.

Invalid or incomplete configuration was leaving the extension in broken states with no error messages. Startup validation will now catch bad configs and surface them clearly.

Some users on large monorepos or Windows noticed performance regressions in memory utilization compared to the previous extension. One fix shipped Monday, but this remains the focus for the week.

If you prefer the prior version while issues are resolved, you can downgrade to version 5.x through your editor marketplace.

## Claude Banned OpenClaw: Here's What to Do

As of April 4th, Claude Max subscriptions no longer work with OpenClaw or any third-party agent. The HackerNews thread was full of people in the same boat.

But your OpenClaw setup still works. Your workflows, skills, and automations are intact. You just need a different way to access models. Kilo provided three paths forward.

First, bring your own API keys. If you have keys from OpenAI, Anthropic, or other providers, your OpenClaw setup continues to work exactly as before. Your infrastructure is unchanged.

Second, use Kilo Gateway with 500+ models at zero markup. Kilo provides a unified interface to multiple models without adding cost on top.

Third, try KiloClaw and skip the infrastructure entirely. KiloClaw handles model access, infrastructure management, and agent orchestration in one unified product.

The key point is that nothing breaks. The tools and workflows people built still exist. Only the model access changed. Kilo's stance is pragmatic: users built on OpenClaw deserve options, not abandoned infrastructure.

## Trinity-Large-Thinking: Free for One Week

Arcee AI released Trinity-Large-Thinking, a 398B-parameter sparse mixture-of-experts reasoning model built for complex, long-horizon agent work. The key innovation is that it activates only 13B parameters per token, running 2-3x faster than peers at the same scale.

It's purpose-built for tool calling and multi-step planning, exactly the kind of work KiloClaw agents do all day. The preview version has been a top-20 model on OpenRouter for two months.

The full release is completely free in Kilo Code and KiloClaw for one week starting April 6th. That's an opportunity to test it on your workloads without cost. After the promotion ends, it will be available through standard pricing.

## KiloClaw for Organizations

Your developers are already running personal AI agents. Now you can manage them at scale. KiloClaw for Organizations adds SSO, SCIM provisioning, centralized billing, usage analytics, and admin controls.

Most security teams have been saying "no" to agents because they can't see or control them. KiloClaw lets them say yes instead. Developers get their agents, security gets visibility and control.

## Recognizing Contributors

The open-source community is crucial to Kilo's development. This week's contributors addressed bugs, performance issues, and configuration problems: IamCoder18, Varuu-0, armaniacs, cyphercodes, halaxa, so-nerdyy, theQuert, wiliyam, and zerone0x.

The $100 bug bounty for finding and fixing issues is real. If you're interested in improving the extension, that's an opportunity.

## Key Takeaways

- Kilo's rebuilt VS Code extension is shipping with community-driven fixes, prioritizing user experience and control
- OpenClaw workflows survive Claude's integration ban; three migration paths are available (bring your own keys, Kilo Gateway, KiloClaw)
- Trinity-Large-Thinking is free for one week, offering a high-performance reasoning model optimized for agent work
- KiloClaw for Organizations gives security teams visibility and control over agent deployments

## Why Do I Care

If you've been using OpenClaw and Claude Max stopped working, Kilo's pragmatic response is worth noting. They didn't leave users hanging. They provided multiple paths forward. That's the opposite of the abandonment you see with some integrations.

The VS Code extension rebuild is significant because it demonstrates Kilo's commitment to a single, portable codebase. Maintenance burden decreases, velocity increases, and fixes reach users faster. That's a smart architectural decision that pays off.

Trinity-Large-Thinking being free for a week is a genuine opportunity to evaluate a reasoning model on production workloads before committing. If you're building agents, this is worth a test run.

**Link:** [Kilo Newsletter: ClawShop Tomorrow & VS Code Update](https://blog.kilo.ai/p/new-vs-code-extension-week-one-what)
