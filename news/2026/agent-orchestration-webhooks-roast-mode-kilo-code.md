---
title: "Agent Orchestration Goes Managed, Webhooks Turn AI Into Event-Driven Teammates, and Roast Mode Ships Zero False Positives"
excerpt: "Kilo Code's newsletter covers Gas Town's managed agent orchestration, webhook-triggered Cloud Agents for automated development workflows, and a brutally honest code review mode that prioritizes real bugs over easy jokes."
publishedAt: "2026-03-05"
slug: "agent-orchestration-webhooks-roast-mode-kilo-code"
hashtags: "#kilo-code #agents #ai #vscode #typescript #automation #code-review #cloud #devops #generated #en"
---

## Gas Town by Kilo: Managed Agent Orchestration for Multi-Agent Coding Workflows

**TLDR:** Steve Yegge's Gas Town agent orchestrator -- which coordinates 20-30 AI coding agents simultaneously with roles, merge queues, and patrol loops -- is getting a fully managed version on Kilo's cloud infrastructure. It removes the ops overhead of self-hosting while providing elastic scaling and access to 500+ models through a single gateway.

**Summary:**

Gas Town is genuinely one of the more interesting developments in the AI coding space right now because it tackles a problem most people haven't even gotten to yet: what happens when you're running enough AI agents that managing them becomes its own full-time job. Steve Yegge's original implementation coordinates dozens of agents with distinct roles -- Mayor, Deacon, Witness, Refinery, Polecats -- in a system he openly compares to both Kubernetes and a Victorian-era factory that can injure you. That honesty about complexity is refreshing in a space drowning in hand-wavy "AI orchestration" marketing.

The managed version solves the real operational headache. Self-hosting Gas Town means wrangling tmux sessions, provisioning compute, juggling API keys across multiple providers (Steve reportedly needs multiple Claude accounts just to keep up with token consumption), and building your own monitoring and recovery. That's a lot of infrastructure babysitting for a system whose entire value proposition is freeing you from manual work. Kilo's managed version deploys the full environment in seconds, scales Polecats elastically from 5 to 50 agents, and handles auto-recovery when sessions fail.

The Kilo Gateway integration is arguably the most pragmatic piece of this. When you're burning tokens at the rate Gas Town demands, managing separate billing and API keys across OpenAI, Anthropic, Google, and open-source providers is genuinely painful. A single API with 500+ models, consolidated billing, and no token markup removes real friction. Whether that gateway becomes a single point of failure worth worrying about is a question for teams to evaluate based on their risk tolerance.

Here's the thing worth being honest about: Gas Town is explicitly not for everyone, and Kilo doesn't pretend otherwise. The target user is someone already running 5+ CLI agent sessions daily and comfortable with things going sideways. If you're still figuring out how to use a single AI coding assistant effectively, jumping to a 30-agent orchestration system is going to create more problems than it solves. The value curve here is steep -- it's transformative for the right team and completely overkill for everyone else.

The open-source momentum is real though. Over 100 PRs from nearly 50 contributors in the first 12 days after launch. That pace of evolution is exactly why a managed version makes sense -- keeping up with upstream changes manually is unsustainable for most teams.

**Key takeaways:**
- Gas Town coordinates 20-30 AI agents with defined roles, workflow management, and merge queues -- think Kubernetes for coding agents
- The managed version removes ops overhead: no tmux management, no server provisioning, elastic scaling of agent count
- Kilo Gateway provides 500+ models through a single API with consolidated billing, solving the multi-provider API key sprawl
- Target audience is explicitly developers already running 5+ parallel AI coding sessions -- this is not a beginner tool
- Beta access is rolling out in waves starting with teams already deep in multi-agent workflows

**Tradeoffs:** Managed hosting trades operational control for convenience. Teams in regulated environments may need the self-hosted version for data sovereignty reasons. The single-gateway approach consolidates billing but also consolidates risk -- an outage at the gateway level affects all your agents simultaneously.

**Link:** [Gas Town by Kilo](https://blog.kilo.ai/p/gas-town-by-kilo)

---

## Cloud Agents + Webhooks: Turning AI Coding Assistants Into Event-Driven Automation

**TLDR:** Kilo's Cloud Agents now support webhook triggers, allowing external systems to kick off AI coding sessions via HTTP requests. This enables automated workflows like issue-to-PR pipelines, dependency updates, documentation sync, security patching, and tech debt cleanup -- all triggered by events in your development ecosystem.

**Summary:**

This is the kind of feature that shifts AI coding tools from "thing I interact with" to "thing that works alongside my infrastructure." Webhook triggers let external systems -- GitHub, CI pipelines, alerting tools, scheduled jobs -- initiate Cloud Agent sessions via HTTP POST. The agent clones your repo, receives the webhook payload as context, and executes based on a prompt template. It's event-driven architecture applied to AI-assisted development, and the use cases they outline are genuinely practical.

The most compelling workflow is issue-to-implementation. A GitHub issue gets labeled `ai-implement`, a webhook fires, and a Cloud Agent creates a branch, writes a plan, implements the feature, adds tests, and pushes commits referencing the issue. You come back to a PR ready for review instead of a ticket in your backlog. The dependency update workflow is similarly well-thought-out: hook into Dependabot notifications, let the agent update packages, run tests, fix breaking changes from major version bumps, and generate changelogs. For organizations managing dozens of repos, this turns quarterly maintenance marathons into continuous automated upkeep.

The security response use case deserves particular attention. When a CVE drops for a dependency you're using, the webhook can trigger an agent that updates the package, runs your test suite, fixes breaking changes, and documents the remediation for compliance purposes. In regulated industries where you need to demonstrate rapid response, having an automated audit trail of remediation attempts is genuinely valuable.

That said, it's worth noting the constraints. Payloads are capped at 256KB, no binary data, max 20 concurrent requests per trigger, and session data is retained for only 7 days during beta. More importantly, Kilo explicitly warns about prompt injection risk: webhook payloads containing untrusted input can manipulate what the agent does. During beta, they recommend using webhooks only with trusted sources -- internal systems, your own CI, first-party integrations. This is responsible disclosure, but it also means the most interesting use cases (public issue tracking, external contributor workflows) carry real risk until hardening is in place.

The architectural pattern here matters more than any single use case. We're moving from a pull model (developer opens a dashboard, starts a session) to a push model (events trigger automated work). That's a fundamental shift in how AI coding assistants integrate into development workflows. The teams that figure out the right boundaries -- which work needs human judgment and which can be safely automated -- will have a significant velocity advantage.

**Key takeaways:**
- Webhook triggers turn Cloud Agents from interactive tools into event-driven automation, initiated by GitHub events, CI pipelines, alerts, or scheduled jobs
- Prompt templates can reference webhook payloads dynamically using placeholders like `{{bodyJson}}`, making agent behavior context-aware
- Seven concrete use cases: issue-to-PR, dependency updates, documentation sync, tech debt cleanup, security patching, incident analysis, and CI failure auto-fixes
- Prompt injection is a real concern -- webhooks should only be connected to trusted sources during beta
- Organization webhooks run on dedicated compute as a bot user, with sessions available to share or fork

**Tradeoffs:** Automation reduces friction but also reduces oversight. An agent that automatically implements issues based on descriptions can produce technically correct but architecturally wrong solutions if the issue description is ambiguous. Teams need clear standards for what gets auto-implemented versus what requires human planning. The 256KB payload limit may also constrain complex workflows that need rich context.

**Link:** [Cloud Agents + Webhooks](https://blog.kilo.ai/p/cloud-agents-webhooks)

---

## Will It Roast? Testing AI Code Review's Brutal Honesty Mode on 5 Levels of Terrible Code

**TLDR:** Kilo tested its Code Reviewer's Roast Mode on five PRs of escalating code horror -- from sloppy variable names to eval() on user input. It found 39 real issues with zero false positives, escalated severity appropriately from "address before merge" to "do NOT merge," and consistently prioritized real bugs over easy jokes.

**Summary:**

The methodology here is solid and worth replicating for anyone evaluating AI code review tools. They built a clean TypeScript bookstore API with Hono, Prisma, and SQLite as the baseline, then created five PRs with systematically worsening code quality. Level 1 was sloppy code (var, any types, console.log debugging). Level 2 added dead code and duplicate functions. Level 3 was architecture astronaut territory (8 design patterns for a notification system that console.logs). Level 4 introduced a 200-line function with hardcoded passwords and eval(). Level 5 was the full catastrophe: command injection, plaintext password files, Math.random() session IDs, and memory leaks.

The most interesting finding isn't that Roast Mode is funny -- it's that it behaves like a sharp senior engineer rather than a comedian. It skipped the easy roast targets: console.log("here"), // HACK comments, doStuff() function names, and AbstractNotificationFactoryProvider naming. Instead, it focused on the things that actually break production: missing input validation, loose equality operators, memory leaks in caches that grow forever, command injection vulnerabilities, and auth bypasses. That prioritization is more useful than it might seem at first glance. A code review tool that flags everything is just noise; one that knows the difference between ugly and dangerous is actually worth integrating into your workflow.

The severity escalation was calibrated correctly. Levels 1-3 got "address before merge" with constructive sarcasm. The moment real security vulnerabilities appeared at Level 4 -- hardcoded passwords, eval() on user input, data export without field filtering -- the verdict switched to "Do NOT merge" and the tone shifted from witty to genuinely urgent. That's the right behavior. You want your review tool to be entertaining about style issues but dead serious about security holes.

Zero false positives across 39 findings is a strong result, though it's worth noting this was tested against a single model (Claude Opus 4.6) on intentionally bad code. Real-world codebases have subtler issues where false positive rates matter more. The question isn't whether Roast Mode catches obvious eval() calls -- it's whether it correctly identifies race conditions in concurrent code or subtle state management bugs in complex React components. Still, as a proof of concept for tone-calibrated AI code review, this is convincing work.

One detail that speaks well for the tool's design: every roast included a specific line reference, an explanation of the actual problem, and a code fix recommendation. The humor is layered on top of substantive feedback, not substituted for it. That's the difference between a useful tool and a novelty.

**Key takeaways:**
- 39 issues found across 5 PRs with zero false positives, tested with Claude Opus 4.6
- Roast Mode prioritized real bugs (missing validation, memory leaks, injection vulnerabilities) over easy targets (bad variable names, console.log debugging)
- Severity ratings escalated appropriately: "address before merge" for code quality issues, "Do NOT merge" when security vulnerabilities appeared
- Every finding included a specific line reference, technical explanation, and fix recommendation alongside the roast
- Roast Mode produced the same issue types and severity ratings as the standard Balanced review mode -- only the delivery changed
- Each review still acknowledged what was done well, even in the worst PRs

**Link:** [Will It Roast? 5 Levels of Terrible Code](https://blog.kilo.ai/p/will-it-roast-we-tested-kilo-code)

---

## Community and Ecosystem Notes

The newsletter highlights 35+ community contributions merged in a single week from 27 contributors, spanning new providers, model support, bug fixes, and UX improvements. The one-click review suggestion feature -- where Kilo suggests starting a review after completing a task in Code or Orchestrator mode -- is a small but thoughtful workflow optimization. Reducing the friction between "I finished writing code" and "I should review what I wrote" catches more issues at the point where developers still have full context. The Slack integration for editing code directly from chat conversations is worth watching, though the practical value will depend heavily on how well it handles the inevitable context limitations of chat-based interfaces.