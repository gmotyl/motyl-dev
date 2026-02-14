---
title: "Background Agents Are Killing Localhost and Nobody Is Ready"
excerpt: "Stripe, Ramp, and Spotify are shipping thousands of agent-authored PRs per week -- the secret ingredient is not a smarter model, it is standardized cloud development environments."
publishedAt: "2026-02-13"
slug: "background-agents-killing-localhost"
hashtags: "#ona-newsletter #background-agents #cloud-development-environments #ai-coding-agents #developer-productivity #devcontainers #generated #en"
---

## The Last Year of Localhost

**TLDR:** Ona (formerly Gitpod) argues that background coding agents are finally forcing software development off localhost and into the cloud -- not because cloud IDEs got better, but because fleets of autonomous agents physically cannot run on a laptop. The companies leading the agent revolution already had standardized cloud development environments years before agents existed.

**Summary:**

This is the kind of piece where you have to separate the genuinely insightful observation from the company selling you the solution. And credit where it is due -- the core observation is sharp. Johannes Landgraf, CEO of Ona, lays out a compelling case: the companies crushing it with background agents -- Stripe, Ramp, Spotify -- did not get there by finding a better model or building a smarter agent harness. They got there because they already had standardized, reproducible, cloud-based development environments. The agent layer was thin. The environment layer was years of accumulated investment.

The piece walks through a progression that anyone running a platform engineering team should internalize. You start with git worktrees because your CEO saw a demo and wants 57% of PRs authored by agents by next quarter. Three worktrees in a monorepo, each needing its own dependency install, its own database, its own running services. Your laptop catches fire. Port conflicts, cache corruption, the whole circus. The article argues this is not a hardware problem you can throw money at -- you cannot buy a laptop big enough to run five full monorepo environments simultaneously.

Here is the part that lands hardest: the gap between "generates a diff" and "opens a merge-ready PR" is the development environment. An agent that can read your code but cannot run your application, execute your tests against real services, or validate its own work is producing code that *looks* right but has not been tested. That is a meaningful distinction that a lot of AI coding hype conveniently glosses over.

Now, what the article avoids thinking about. First, there is a massive selection bias here. Stripe and Ramp are among the most well-resourced engineering organizations on the planet. They had the luxury of investing in cloud dev environments years before the payoff was clear. For a 50-person startup, "just standardize your development environments" is not a weekend project -- it is a multi-quarter infrastructure overhaul. The article hand-waves past the adoption cost. Second, the 88.5% stat for Ona's own merged PRs is doing a lot of heavy lifting without much context. What kinds of PRs? What is the review burden? What is the defect rate? A PR count is a vanity metric if the complexity distribution is skewed toward trivial changes.

The technical recommendations are solid though: VMs over containers for agent isolation (because container escapes give access to everything on the shared kernel), Dev Container spec as the declarative environment definition, automated environment lifecycle with explicit triggers, and running environments inside the customer's own VPC for native network access. The security stance of "assume compromise, enforce at the kernel" is refreshingly honest compared to vendors who claim they have solved prompt injection.

**Key takeaways:**
- Companies leading in background agents (Stripe, Ramp, Spotify) already had standardized cloud dev environments years before agents existed -- the agent layer was thin on top of deep infrastructure investment
- Git worktrees break immediately in monorepo environments when running multiple agents in parallel due to port conflicts, cache corruption, and resource exhaustion
- The real gap in AI coding is not model capability but environment capability -- agents need to run applications, execute tests, and validate their own work
- VMs provide the correct isolation boundary for agents, not containers, because a container escape compromises everything on the shared kernel
- The Dev Container spec is positioned as the universal, vendor-neutral environment definition format that enables reproducibility across human and agent workflows

**Tradeoffs:**
- Cloud development environments add infrastructure complexity and cost versus local development, but enable parallel agent execution that localhost physically cannot support
- Running environments inside your own VPC gives agents full network access to internal services, which maximizes capability but also maximizes blast radius if security controls fail
- Standardizing environments is a major infrastructure project before you deploy your first agent -- you are trading short-term velocity for long-term scalability

**Link:** [The last year of localhost](https://ona.com/stories/the-last-year-of-localhost)

---

## Minions: Stripe's One-Shot End-to-End Coding Agents

**TLDR:** Stripe built custom coding agents called Minions that now author over a thousand merged pull requests per week. They run on isolated cloud devboxes, leverage 400+ internal MCP tools, and operate from Slack message to merged PR with zero human interaction in between -- though humans still review every line.

**Summary:**

Let me just sit with this number for a second: over a thousand pull requests merged per week, completely authored by agents. At Stripe. Processing over a trillion dollars in payment volume. That is not a hackathon demo -- that is production infrastructure at one of the most security-conscious fintech companies on the planet.

The architecture is what makes this interesting, not the headline number. Minions run on a fork of Block's open-source coding agent Goose, customized with what Stripe calls an "opinionated" orchestration flow that interleaves agent creativity with deterministic operations like linting and testing. Each Minion runs on an isolated devbox -- a cloud developer machine that spins up in 10 seconds with pre-loaded Stripe code and services. These environments are isolated from production and the internet, which is exactly the kind of security boundary you want when agents are writing code that touches financial infrastructure.

The tool integration story is staggering. Minions connect to more than 400 MCP tools spanning internal systems and SaaS platforms through an internal "Toolshed" server. Documentation, ticket details, build statuses, code intelligence -- the agents have access to the same context a human engineer would. And here is the kicker that validates the Ona newsletter's thesis: Minions read the same coding agent rule files that human-operated tools like Cursor and Claude Code do. If it is good for humans, it is good for LLMs.

What the article does not dig into enough is the failure modes. There is a maximum of two CI rounds before a Minion gives up. What happens to those failed attempts? What percentage of Minion runs actually succeed end-to-end? A thousand merged PRs per week sounds incredible, but if ten thousand were attempted, that is a 10% success rate and a lot of wasted compute. The article also does not address the review burden. Every Minion PR still requires human review. At a thousand per week, that is a significant load on human reviewers. Are they rubber-stamping because the tests passed, or genuinely reviewing? The quality of human review under that kind of volume pressure is a question worth asking.

Also worth noting: Stripe built Minions because off-the-shelf tools could not handle their scale -- hundreds of millions of lines of code, primarily Ruby with Sorbet typing, plus extensive proprietary libraries that standard LLMs have never seen. This is not a generalizable playbook for most companies. It is a story about what a company with essentially unlimited engineering resources can build when they have the right infrastructure foundations.

**Key takeaways:**
- Minions operate from Slack message to merged PR with zero human interaction, running on isolated devboxes that spin up in 10 seconds
- The system leverages 400+ MCP tools through an internal Toolshed server, giving agents the same context and tooling as human engineers
- Built on a fork of Block's open-source Goose agent with an opinionated orchestration layer that alternates between agent creativity and deterministic operations
- Human code review remains mandatory for all agent-authored PRs
- The breakthrough was not model capability but infrastructure readiness -- Stripe's cloud devbox system predated their agent ambitions by years

**Tradeoffs:**
- Building a custom agent system versus using off-the-shelf tools gives maximum control and integration but requires massive engineering investment that only makes sense at Stripe's scale
- Isolating devboxes from production and the internet improves security but limits the agent's ability to validate against real production conditions
- Capping CI rounds at two prevents runaway compute costs but means some tasks that a human could debug through will be abandoned

**Link:** [Minions: Stripe's one-shot, end-to-end coding agents](https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents)

---

## Why Ramp Built Their Own Background Agent

**TLDR:** Ramp's internal coding agent "Inspect" now accounts for roughly 30% of all merged PRs across frontend and backend repos, achieved without mandatory adoption policies. The key differentiator is that Inspect can visually verify frontend changes and run full backend test suites, closing the verification loop that most coding agents leave open.

**Summary:**

Ramp's story is in some ways more instructive than Stripe's because it is more accessible. They did not build on hundreds of millions of lines of legacy Ruby code. They built a background agent that works across both frontend and backend, handles visual verification through screenshots and live previews, and runs in sandboxed VMs on Modal with the complete engineering toolchain -- Vite, Postgres, Temporal, the works.

The integration surface is impressively broad. Sentry, Datadog, LaunchDarkly, GitHub, Slack, Buildkite -- Inspect plugs into the full operational stack. Users can interact through Slack, a web interface, a Chrome extension, pull request discussions, or embedded VS Code. That multi-interface approach is clever because it meets engineers where they already work instead of forcing them into a new workflow. The Chrome extension is particularly interesting -- it enables visual editing of React applications through DOM introspection rather than image processing, which is a meaningfully different approach to frontend agent work.

The infrastructure choices are worth studying. Repository images are rebuilt every 30 minutes with clones and dependencies pre-installed. File system snapshots enable instant restoration. Sessions are cheap enough to start that teams can try different approaches or swap models without resource anxiety. Cloudflare Durable Objects powers the backend, with each session getting its own SQLite database for isolation and performance at scale.

What I find most honest about Ramp's framing is the explicit statement that "owning the tooling lets you build something significantly more powerful than an off-the-shelf tool will ever be." That is a bet not every company should make. The build-versus-buy decision for agent infrastructure is a genuine strategic question. Ramp's advantage is that their agent only needs to work on their specific codebase. That is a dramatically simpler problem than building a general-purpose coding agent.

What is missing from the picture: the 30% figure is not directly comparable to Ramp's newsletter-quoted 57% "of all merged PRs." Either the numbers evolved over time, the newsletter reflects more recent data, or we are comparing different scopes. Either way, the trajectory is clear -- agent-authored code is becoming a majority of the merged output at these companies. The question nobody is asking loudly enough: what does the engineering org chart look like in two years if agents are authoring 70% of PRs?

**Key takeaways:**
- Inspect runs in sandboxed VMs on Modal with full engineering toolchain access, including visual verification capabilities for frontend changes
- The Chrome extension uses DOM introspection rather than image processing for visual editing of React applications
- Repository images rebuild every 30 minutes to balance code freshness with startup speed
- Sessions use Cloudflare Durable Objects with per-session SQLite databases for isolation at scale
- Adoption reached 30% of merged PRs without mandatory policies, suggesting genuine developer value rather than top-down mandate

**Tradeoffs:**
- Building custom agent infrastructure versus buying off-the-shelf gives deeper integration with your specific codebase but requires ongoing maintenance investment
- Rebuilding repo images every 30 minutes balances freshness against snapshot performance but introduces a potential 30-minute staleness window
- Multi-interface access (Slack, web, Chrome extension, VS Code) increases adoption surface but multiplies the maintenance and testing burden

**Link:** [Why we built our background agent](https://builders.ramp.com/post/why-we-built-our-background-agent)

---

## Spotify Says Its Best Developers Have Not Written a Line of Code Since December

**TLDR:** Spotify Co-CEO Gustav Soderstrm revealed on the Q4 2025 earnings call that the company's top developers have not manually written code since December, using Claude Code and an internal AI platform called Honk to ship over 50 new features in 2025.

**Summary:**

This is the kind of headline that makes you do a double-take, and it should. Spotify's Co-CEO going on an earnings call and saying the best developers have not written a single line of code since December is either a watershed moment or an extraordinary piece of corporate narrative management. Possibly both.

The internal system, called Honk, apparently lets engineers fix bugs from Slack on their phone during their morning commute and merge to production before arriving at the office. Combined with Claude Code, the claim is that these tools have fundamentally changed how Spotify's most skilled engineers spend their time. They shipped over 50 new features in 2025, which is presented as evidence of the productivity lift.

Let us think critically about what is actually being said here. "Best developers" is doing a lot of work in that sentence. Best by what measure? If your best developers are not writing code, what are they doing? Presumably reviewing agent output, architecting systems, making design decisions, and managing the AI-driven development pipeline. That is a meaningful and potentially valuable shift in how senior engineering time is allocated. But framing it as "not writing code" on an earnings call is clearly designed for investor impact, not technical precision.

Fifty new features in 2025 is hard to evaluate without knowing Spotify's baseline shipping velocity. Is that a 2x improvement? 5x? Or roughly what they would have shipped anyway with their headcount? The number is presented without context, which is a red flag for anyone trying to extract actual signal from this.

What is genuinely missing from this story is any discussion of quality, maintenance burden, or technical debt. If your best developers are not writing code, who understands the code that is being shipped? Agent-authored code that nobody fully understands is a maintenance time bomb. The organizational knowledge problem compounds over time -- every month of agent-authored code is another month of codebase that no human has deeply internalized.

**Key takeaways:**
- Spotify leverages Claude Code and an internal platform called Honk to enable developers to operate primarily through AI-assisted workflows
- Engineers can reportedly fix bugs from Slack on mobile devices and merge to production without manually writing code
- The company shipped over 50 new features in 2025, attributed partly to AI-driven development acceleration
- This was disclosed on an earnings call, meaning the framing is optimized for investor narrative rather than technical accuracy

**Link:** [Spotify says its best developers haven't written a line of code since December, thanks to AI](https://techcrunch.com/2026/02/12/spotify-says-its-best-developers-havent-written-a-line-of-code-since-december-thanks-to-ai/)
