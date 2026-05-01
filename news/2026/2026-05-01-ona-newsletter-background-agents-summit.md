---
title: 'Background Agents Summit, Stripe Minions, and Harvey Spectre'
excerpt: 'The infrastructure behind autonomous coding agents is maturing fast. Here is what Stripe, Harvey, and the broader ecosystem are building.'
publishedAt: '2026-05-01'
slug: 'ona-newsletter-background-agents-summit'
hashtags: '#ona #backgroundagents #stripe #harvey #ai'
---

## TLDR

- The first Background Agents Summit happens May 6-7, 2026, bringing together engineers from Stripe, Harvey, Uber, Monzo, and others
- Stripe's Minions now ship over 1,000 agent PRs per week on a 30-million-line codebase
- Harvey built Spectre, a collaborative cloud agent platform that turns Slack requests into reviewable pull requests
- The shift from desktop agents to cloud-based runtime is about more than performance — it is about security, collaboration, and organizational scale

## The Big Picture

Every company building agent infrastructure is solving the same problems in isolation. That is the thesis behind the Background Agents Summit, a free virtual event on May 6-7, 2026.

The event brings together teams from Stripe, Harvey, Uber, Monzo, Cloudflare, AWS, GitHub, and Ona. The sessions cover infrastructure, agents on large codebases, sandboxes, harness engineering, security, identity, and adoption patterns.

What is interesting is how the problems cluster. Stripe is pushing on scale — over 1,000 PRs per week from agents. Uber is building internal platforms to make agents developer-friendly. Monzo is figuring out how to enable AI tools inside a regulated bank. Harvey is solving for collaboration — how agents and humans work together on the same code.

The summit is not about product announcements. It is about the emerging playbook for running autonomous coding agents inside a real engineering organization.

## Stripe's Minions: Agents at Scale

The Stripe team published part two of their Minions series, detailing how they run one-shot end-to-end coding agents on their massive codebase.

A few things stand out:

- The codebase is 30 million lines. Running agents at that scale requires a completely different architecture than a startup repo.
- "One-shot" means the agent completes the full cycle — understanding the task, writing code, running tests, creating a PR — without iteration.
- They ship 1,000+ PRs per week through these agents.

This is not a proof of concept. This is production infrastructure.

The challenge is not just making agents work. It is making them work reliably enough that humans can trust the output, measuring whether the agents are actually improving developer productivity, and keeping the system secure when agents have real credentials.

## Harvey's Spectre: Collaboration Across Boundaries

Harvey built Spectre to solve a different problem: how do agents work when the work crosses team boundaries?

Local coding agents live on one laptop, with one working directory, one set of credentials, and one engineer's private context. That works for individual tasks. But it breaks down when:

- An engineer investigates an incident in a public Slack thread
- Work needs to hand off to another engineer without re-explaining context
- Non-engineers (product managers, designers) need to collaborate on the same work

Spectre turns requests from Slack, web, or automation into a "durable run" — an isolated sandbox that connects to GitHub, Datadog, Linear, and other tools through explicit boundaries. The run produces reviewable artifacts: summaries, diffs, branches, and pull requests.

The architectural choices are worth understanding:

- The run is the durable object, not the worker process. If the worker dies, a new one resumes from archived session state.
- Sandboxes are ephemeral and strictly bounded. Workers see what they need, nothing more.
- The harness is not a thin SDK wrapper — it handles durability, retry semantics, cost accounting, multi-provider support, and collaboration surfaces.
- Scheduled runs use the same runtime as interactive work. Cleanup passes and verification loops are visible and resumable, not a parallel background-job world.

The security lesson is particularly relevant: desktop-first agents hit a hard wall in enterprise settings because their boundaries are implicit. Once agents do real work, security is part of the runtime design, not something added in review.

## Why This Matters

The common thread is that the infrastructure question is no longer "can agents write code?" It is "how do you run agents reliably, securely, and collaboratively inside a company?"

The answers are converging: cloud runtimes instead of desktop sessions, explicit boundaries instead of ambient access, durable runs instead of fragile processes, shared surfaces instead of private sessions.

The summit in May will be the first time many of these teams share their architectures publicly. If you are building or evaluating agent infrastructure, it is worth attending.

## Key Takeaways

- The Background Agents Summit (May 6-7, virtual, free) is the first event bringing together teams building agent infrastructure at scale
- Stripe ships 1,000+ agent PRs per week on a 30-million-line codebase
- Harvey's Spectre treats the "run" as a durable object that can be collaborated on, resumed, and inspected
- The security model for agents requires explicit boundaries from the start, not review after the fact
- Scheduled runs should use the same runtime as interactive work — not a separate background job system

**Link:** [Background Agents Summit](https://background-agents.com/summit)
**Link:** [Minions: Stripe's one-shot, end-to-end coding agents — Part 2](https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents-part-2)
**Link:** [Building Spectre: Internal Collaborative Cloud Agent Platform](https://www.harvey.ai/blog/building-spectre-internal-collaborative-cloud-agent-platform)