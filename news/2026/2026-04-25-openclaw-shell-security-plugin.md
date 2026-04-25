---
title: "OpenClaw Shell Security Plugin Brings Clarity to Security Audits"
excerpt: "A new plugin that takes OpenClaw security audit output and transforms it into actionable remediation steps through KiloCode's Security Advisor API."
publishedAt: "2026-04-24"
slug: "openclaw-shell-security-plugin"
hashtags: "#substack #security #ai #agents #devtools #open-source #generated #en"
source_pattern: "Substac"
---

If you've ever run `openclaw security audit` and gotten back a wall of JSON, you know the feeling. Six findings, one critical, three warnings, two informational. You stare at it, scroll through the nested objects, and think: "Okay, but what should I actually do about this?"

That's exactly the gap the new Shell Security plugin fills. It takes that same audit output and sends it to the KiloCode Security Advisor API. What comes back is a prioritized report with specific remediation steps, all happening right in your chat interface whether that's Telegram, Slack, or the Control UI.

The plugin is a thin bridge between two things that already exist. First, there's the built-in `openclaw security audit` command that checks your local config for common security foot-guns: weak models without sandboxing, exposed runtime tools, missing trusted proxies, multi-user setups without isolation. Second, KiloCode's Security Advisor API takes those findings and returns expert analysis with context-specific guidance.

It works like this. You run the audit locally, the JSON output gets packaged and sent off, and a markdown report comes back covering what was found, why it matters, and what to do about it, all organized by priority. Currently dev-only but coming soon.

**Why developers should care:** If you're running OpenClaw as a personal assistant, the security surface is real. Your agent has shell access, filesystem access, web browsing. A misconfigured model fallback or unintended multi-user exposure means your agent could be manipulated by untrusted input. Having something that checks this and explains the results in plain language saves you from interpreting JSON and guessing at severity.

The npm package is live and the source is on GitHub under MIT license. Install it with `openclaw plugins install @kilocode/shell-security`, enable it, restart the gateway, and you're ready to run `/shell-security` whenever you need a checkup.

**Link:** [Shell Security Plugin](https://blog.kilo.ai/p/openclaw-shell-security-plugin)