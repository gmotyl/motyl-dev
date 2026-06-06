---
title: "Vercel May 2026: Flat Rate CDN, Sandbox Docker Support, and AI Gateway Data"
excerpt: "Vercel's May newsletter covers sandbox persistence going GA, Docker containers inside sandboxes, flat rate CDN in beta, AI gateway production token data, and new per-unit function billing."
publishedAt: "2026-06-05"
slug: "vercel-may-2026-flat-rate-cdn-sandbox-docker-ai-gateway"
hashtags: "#VercelMonthly #vercel #edge #ai #agents #security #nodejs #docker #generated #en"
source_pattern: "VercelMonthly"
---

## Sandbox Persistence Is Now GA

**TLDR:** Vercel Sandboxes now automatically save and restore filesystem state between sessions by default. Each sandbox gets a durable name that serves as its unique reference, so you can create, retrieve, or resume by name without managing snapshots manually.

Sandbox persistence closing the gap between sandbox-as-ephemeral-container and sandbox-as-durable-dev-environment. Before this, anything you installed or configured in a sandbox was gone when the session ended. Every restart meant reinstalling dependencies, reconfiguring tools, rebuilding state. That's fine for quick throwaway experiments but terrible for iterative agent workflows.

The implementation is straightforward. Sandbox.create() now enables persistence by default when you provide a name. The filesystem is snapshotted automatically. Vercel handles spin-up and spin-down without interrupting whatever the agent or user is doing. If you want an ephemeral sandbox you can still opt out, but the default is now persistent.

For agentic workflows specifically, this changes what's practical. An agent that needs to install a specific set of tools, configure an environment, and then run multiple tasks over time no longer has to rebuild that environment from scratch each iteration. The durable name makes it trivial to resume a specific context from code.

**Key takeaways:**
- Sandbox persistence is now on by default; filesystem state survives between sessions
- Each sandbox gets a durable name for reliable retrieval and resumption
- Vercel manages spin-up and spin-down automatically without state loss
- Opt out explicitly if you need ephemeral sandbox behavior

**Why do I care:** For teams building AI-powered developer tools or coding assistants on Vercel, this removes a significant friction point. The pattern of "start a sandbox, install things, do work, throw it away, repeat" was a real cost driver and latency problem. Persistent named sandboxes make it feasible to treat sandboxes as lightweight, reusable environments rather than single-use compute. This is the right default behavior.

**Link:** [Sandbox persistence is now GA](https://vercel.com/changelog/sandbox-persistence-is-now-ga)

---

## Run Docker Containers Inside Vercel Sandbox

**TLDR:** Vercel Sandbox now supports installing and running Docker inside a sandbox environment. An agent can build containers, install system packages, and run containerized applications without touching the host system.

This is a meaningful capability expansion. The ability to run Docker inside a sandbox means agent workflows can now include anything that runs in a container, which covers an enormous range of existing tools, databases, and services. Need a Redis instance for your agent's test run? Spin one up inside the sandbox. Need to build and test a Docker image as part of a CI-like workflow? Do it inside the sandbox without provisioning separate infrastructure.

The practical pattern shown in the documentation is clean: install Docker via dnf, start the daemon, wait for it to be ready with a simple polling loop, then run containers normally. The agent workflow treats the sandbox as a full Linux environment with superuser access where needed.

There are interesting implications for security and isolation here. The sandbox boundary now contains not just code execution but full Docker operations. That's powerful for agent-driven workflows and potentially concerning from a blast radius perspective if an agent is compromised. Vercel's sandbox isolation presumably handles the outer boundary, but the inner Docker access is fairly permissive.

**Key takeaways:**
- Docker can now be installed and run inside Vercel Sandbox environments
- Agents can build, configure, and run containers without touching host infrastructure
- The pattern requires starting the Docker daemon and waiting for readiness before using it
- This enables containerized services, database instances, and container image builds inside sandboxes

**Why do I care:** For teams building development automation tools, CI-like agent workflows, or any system that needs to interact with containerized services in a controlled environment, this removes a major limitation. The previous workaround was spinning up separate container infrastructure, which added latency, cost, and complexity. Running Docker inside the sandbox keeps everything contained and disposable. Worth evaluating for agent-driven testing and code review tools.

**Link:** [Run Docker containers inside Vercel Sandbox](https://vercel.com/changelog/run-docker-containers-inside-vercel-sandbox)

---

## Flat Rate CDN in Limited Beta

**TLDR:** Vercel is offering a fixed monthly price for CDN usage as an alternative to usage-based pricing for Pro teams. Viral traffic spikes, bot traffic, and misconfigured routes won't result in surprise bills.

This is a direct response to a real pain point. Usage-based CDN pricing has created genuinely unpleasant surprises for developers and small teams. A post going viral, a bot deciding to hammer your endpoints, or a misconfigured route generating massive request volume can turn a predictable monthly bill into a crisis. Several developers have shared stories of unexpected four-figure Vercel bills from situations like this.

Flat Rate CDN removes that risk for teams that want predictability over optimization. You pay a fixed amount for Vercel CDN including Edge Requests, Fast Data Transfer, and related products, with no overages. If your traffic spikes from a viral post, your bill doesn't change.

The tradeoff is that teams with low or very predictable CDN usage probably get a better deal with usage-based pricing. Flat rate makes sense for teams where the variance in potential bills is more costly than any savings from low-usage months. The positioning for "individual builders who don't want a usage spike to break the bank" is accurate.

**Key takeaways:**
- Flat Rate CDN replaces usage-based pricing with a fixed monthly fee for Pro teams
- Covers Edge Requests, Fast Data Transfer, and related CDN products with no overages
- Currently in Limited Beta; Pro teams can request early access
- Best suited for teams with unpredictable traffic or risk-averse billing requirements

**Why do I care:** The surprise bill problem has been one of the biggest complaints about Vercel's pricing model and has driven some teams to competitors. For side projects and individual developers especially, the exposure to unlimited downside on CDN costs is a real deterrent. Flat Rate CDN in beta is a promising signal that Vercel is taking this seriously. Whether the pricing is competitive at scale will matter when it comes out of beta.

**Link:** [Flat Rate CDN in Limited Beta](https://vercel.com/changelog/flat-rate-cdn-in-limited-beta)

---

## Protecting Against Token Theft in AI Applications

**TLDR:** AI endpoint security requires verification on every request, not per-session. Rate limits and auth walls aren't enough when a single compromised credential can be amortized across thousands of stolen AI calls at $2+ per prompt.

The economics Vercel lays out here are stark and worth internalizing. An HTTP request costs roughly $2 per million. A single frontier model prompt can cost $2. AI is a million times more expensive per call, which makes stolen AI credentials worth stealing at scale. This isn't theoretical; Vercel has seen these attacks against their own APIs.

The key insight is that session-level authentication doesn't protect against this. If you authenticate once per session and then make unlimited AI calls, an attacker who steals one token can make thousands of calls before expiration. The check-once model, which is fine for regular web requests, fails completely for AI workloads where each call is expensive.

Vercel's approach gates every AI request through bot detection and rate limiting at the individual call level. The practical implementation uses bot ID verification that runs on every request rather than every session. This is more expensive computationally than session-level checks, but the alternative is treating AI inference as essentially free to attackers who get one valid credential.

For anyone building AI endpoints exposed to the internet, this is a concrete security architecture to think about. The threat model is real and the attack surface is larger than most developers have considered.

**Key takeaways:**
- AI inference costs make stolen credentials dramatically more valuable than regular web endpoint abuse
- Session-level authentication is insufficient; per-request verification is necessary for AI endpoints
- Rate limits alone don't protect when checks are amortized across many stolen calls
- Bot detection and request-level verification are practical mitigations for public AI endpoints

**Why do I care:** Every team building AI-powered features with publicly accessible endpoints needs to think about this. The attack surface is obvious in retrospect but easy to miss when you're focused on building features. If you're using Vercel's AI Gateway, the protection is built in. If you're rolling your own AI endpoint infrastructure, the per-request verification approach described here should be in your security checklist.

**Link:** [Protecting against token theft](https://vercel.com/blog/protecting-against-token-theft)

---

## AI Gateway Production Index

**TLDR:** Vercel's AI Gateway, which routes tokens across hundreds of models for real production workloads, shows that Anthropic leads in spend, Google leads in volume, and agentic workloads now carry 59% of all token volume.

Production data on AI model usage is rare and valuable, and Vercel has a genuinely interesting vantage point here. Tens of trillions of tokens across real applications and agents gives you signal that no benchmark can replicate.

Several findings stand out. Anthropic leads in spend despite higher unit prices, which suggests that developers deploying Anthropic models are using them for higher-value tasks where the quality premium justifies the cost. Google leads in raw volume, which likely reflects cheaper models doing high-frequency tasks. The two metrics measuring different things is itself informative.

The agentic workload share is the most striking number. 59% of all token volume from agentic workloads, up 2x over six months. That's a fast shift in how AI tokens are being consumed. Multi-turn agent conversations, tool-calling loops, and orchestration overhead explain the growth. Individual human-AI conversations generate far less token volume per session than agent loops do.

High-volume workloads routing across 30+ distinct models on average also says something about how sophisticated production AI infrastructure has become. The era of "pick one model and use it everywhere" is clearly over for serious deployments.

**Key takeaways:**
- Anthropic leads in AI Gateway spend; Google leads in request volume
- Agentic workloads now account for 59% of total token volume, up 2x in six months
- High-volume production workloads route across 30+ distinct models on average
- OSS models are gaining traction but without strong provider loyalty

**Why do I care:** For anyone making decisions about AI infrastructure, this data is useful grounding. The agentic workload share trend matters most. If you're building systems that will scale, you're building agentic systems, and the cost model for agentic token consumption is very different from simple chat interfaces. Anthropic leading in spend despite price premiums also suggests that model quality differences are still significant enough that teams pay for them in production, not just benchmarks.

**Link:** [AI Gateway production index](https://vercel.com/blog/ai-gateway-production-index)
