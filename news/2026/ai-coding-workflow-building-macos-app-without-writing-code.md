---
title: "AI Coding Workflow: Building a Full macOS App Without Writing a Single Line of Code"
excerpt: "A deep dive into a real-world AI-driven development workflow that produced 20,000 lines of code in 17 days with 90% test coverage."
publishedAt: "2026-02-25"
slug: "ai-coding-workflow-building-macos-app-without-writing-code"
hashtags: "#refactoring #ai #architecture #developer-experience #testing #generated #en"
---

## My AI Coding Workflow: 772 Commits in 17 Days Without Writing Code

**TLDR:** A senior engineering leader documents building a full macOS note-taking app using Claude Code and an AI orchestration layer, producing 20,000 lines of code with 90% test coverage in 17 days. The workflow mirrors how CTOs delegate to engineering teams, not how individual developers write code.

**Summary:**

This is one of those pieces that actually puts skin in the game. Instead of yet another opinion piece about AI coding, the author built a real macOS application called Laputa -- an offline-first note-taking app designed to replace Notion, built with Tauri, React, and Rust. The numbers are striking: 772 commits, 20,000 lines of code, 500+ tests achieving 90% coverage, and a 9.3/10 code health score from CodeScene. All in 17 days. And the author claims to have written zero lines of code and read roughly 5% of it.

The workflow architecture is genuinely interesting. Rather than sitting in a terminal babysitting Claude Code, the author uses a custom AI agent called "OpenClaw" (Brian) as an orchestration layer. Tasks flow through a shared Todoist board with states from Open through In Progress, In Review, and Done. The orchestrator runs on a 30-minute cron job, picks up tasks, spawns Claude Code subagents, manages conflicts between concurrent tasks, and even sends Telegram notifications when features need review. Feature requests come in as voice notes that get transformed into lightweight PRDs with acceptance criteria. UI design is done in Pencil (a lightweight Figma alternative) that outputs JSON files Claude Code can consume directly.

What the author is somewhat dancing around is the cost reality. Claude Code Max at $200/month covers the actual coding. But OpenClaw, the orchestration layer, runs about $100/day on Anthropic API keys for the product development portion alone. That is roughly $3,000/month just for orchestration -- approaching a full-time junior developer salary in many markets. The author acknowledges this but frames it as acceptable because of the async workflow benefits. This is an important honesty moment, but it also raises a question the piece avoids: at what scale does this workflow actually become economically superior to hiring humans? For a solo side project by someone who clearly has deep technical expertise, it works. For a team? The economics shift dramatically.

The most insightful framework in the piece is the distinction between "bad code" and "misaligned code" as two categories of technical debt. Bad code -- high complexity, low test coverage, coupling issues -- is now essentially a solved problem. You enforce standards in CLAUDE.md, back them up with CI/CD gates, and the AI complies. Misaligned code is the hard problem: architecturally sound code that does not match the product intent or future direction living in the author's head. This is where human review still matters, focused on architecture docs and abstraction decisions rather than line-by-line code review. This framing is genuinely useful for teams trying to figure out where to spend their review energy in an AI-assisted world.

For architects and teams considering this approach, the honest assessment of bottlenecks matters most. The author reports that frontend UI/UX bugs are the primary pain point -- corner cases, cosmetic issues, and macOS-specific behaviors that differ from the web version used in testing. Backend logic and state management work correctly on the first try, but the visual/interactive layer still demands human eyes. This aligns with what many teams are finding: AI is excellent at logic and terrible at taste. The Chrome MCP for automated UI testing helps but is insufficient. If your product is UI-heavy, expect to remain deeply involved in that layer regardless of how good your AI coding pipeline becomes.

**Key takeaways:**

- AI can reliably produce high-quality code with enforced testing coverage (90%+) and code health metrics, making "bad code" a solved problem if you invest in guardrails
- The real remaining challenge is "misaligned code" -- architecturally sound code that does not match product intent, which still requires human architectural review
- Async AI workflows using orchestration layers enable true delegation, but at significant API cost ($100+/day for orchestration alone)
- Frontend UI/UX remains the primary bottleneck where AI coding fails most often, particularly visual polish, corner cases, and platform-specific behavior
- The spec-driven development approach may be counterproductive when implementation is fast and cheap -- working prototypes followed by iteration can be more efficient
- The progression mirrors the CTO growth path: writing code, reviewing code, managing managers -- AI is compressing this journey for individual developers

**Tradeoffs:**

- **Cost vs. autonomy:** Full async orchestration costs $3,000+/month in API fees versus sitting in terminal with Claude Code at $200/month, but frees human time significantly
- **Spec depth vs. iteration speed:** Light PRDs with quick prototypes versus detailed specifications upfront -- cheap implementation favors the former, but risks accumulating misaligned code
- **Review depth vs. velocity:** Reading 5% of code enables high throughput but increases risk of architectural drift that documentation alone may not catch
- **Frontier models vs. cost optimization:** Using the best available model provides clearer signal on AI capabilities but at premium cost; cheaper models introduce ambiguity about whether failures are model or task limitations

**Link:** [My AI Coding Workflow](https://refactoring.fm/p/my-ai-coding-workflow)