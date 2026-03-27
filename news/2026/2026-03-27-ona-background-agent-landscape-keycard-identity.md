---
title: "Background Agent Infrastructure Has 103 Tools and Zero Identity Standards"
excerpt: "Ona's new landscape maps 103 tools across 11 layers of background agent infrastructure, while Keycard tackles the elephant in the room: agents borrowing human credentials is a security disaster waiting to happen."
publishedAt: "2026-03-27"
slug: ona-background-agent-landscape-keycard-identity
hashtags: "#ona #ai #agents #security #devtools #infrastructure #identity #sdlc #generated #en"
---

## Announcing the Background Agents Landscape

**TLDR:** Ona published an interactive landscape mapping 103 tools across 11 layers of background agent infrastructure, documenting how companies like Stripe, Ramp, and Spotify are shipping hundreds to thousands of agent-authored changes per week, while identifying orchestration and security as the biggest unsolved gaps.

**Summary:**

This is the kind of resource the industry desperately needs right now, because the background agent space is moving so fast that even people building in it are losing track of who does what. Ona has mapped 103 tools across 11 layers, from the agent harnesses themselves down to sandboxes, orchestration, security, and coordination. The numbers they cite from production deployments are staggering and worth sitting with for a moment. Stripe is merging over 1,000 agent-authored pull requests per week. Ramp attributes more than 50% of their PRs to agents. Spotify has shipped 1,500-plus agent-generated changes. These are not demos. These are not hackathon projects. This is production code at scale, and it changes the conversation about whether agents are ready for real engineering work.

What I find most valuable about this landscape is not the map itself but the observations that come with it. The first one is critical: the agent layer is well understood, but orchestration is not. The industry is converging on Claude Code and Cursor as the base harnesses, which makes sense because they have the best tool-calling and context management right now. But the layer above that — how do you coordinate multiple agents working on related tasks, how do you handle conflicts, how do you route work — is still basically duct tape and good intentions. GitHub webhooks and git events are the current coordination mechanism, and if that does not make you a little nervous, you have not tried to build a reliable system on webhook delivery guarantees.

The sandbox versus dev environment distinction is one that needed to be called out explicitly. There is real category confusion happening right now where code-execution sandboxes are being marketed as development environments. They are not the same thing. A sandbox lets you run untrusted code safely. A dev environment gives you the full context of your project — dependencies, services, databases, configuration. Conflating them leads to agents that can execute code but cannot actually develop software, which is a subtle but important distinction that a lot of teams are learning the hard way.

The biggest gap they identify is security and identity, which is exactly right and leads directly into the second article. Right now, most agent setups either give agents full access to developer credentials or force humans to click approval dialogs every thirty seconds. Neither approach scales. The landscape notes tools like Keycard emerging to solve this, and it is telling that this is where the most whitespace exists. We have solved "how do agents write code" faster than we have solved "how do agents prove who they are and what they are allowed to do." That ordering is going to cause problems.

One thing I wish this landscape addressed more directly is failure rates. We get the impressive throughput numbers from Stripe and Spotify, but what percentage of agent-authored PRs get rejected? What is the review burden on human engineers? A thousand PRs per week is great if they are high quality, and it is a nightmare if reviewers are spending all day fixing agent mistakes. The landscape maps the tools but not the outcomes, and that is where the next version of this resource could add real value.

**Key takeaways:**

- 103 tools mapped across 11 layers of background agent infrastructure, providing the first comprehensive view of this rapidly growing space
- Stripe merges 1,000+ agent-authored PRs per week, Ramp attributes 50%+ of PRs to agents, and Spotify has shipped 1,500+ agent-generated changes
- The industry is converging on Claude Code and Cursor as base agent harnesses, but orchestration above that layer remains unsolved
- Code-execution sandboxes and development environments are being conflated, causing real confusion for teams adopting agent infrastructure
- Security and identity is the single biggest gap holding back mass adoption of background agents
- GitHub webhooks and git events serve as the current coordination mechanism, but purpose-built coordination layers from Linear and JetBrains are emerging

**Why do I care:** If you are building software in a team of any meaningful size, background agents are coming to your workflow whether you plan for them or not. This landscape gives you a map of the terrain before you start making vendor decisions. The key insight is that the easy parts — getting an agent to write code — are largely solved, and the hard parts — orchestration, security, coordination — are where your team will spend most of its integration effort. Plan for that, not for the demo.

**Link:** [Announcing the Background Agents Landscape](https://ona.com/stories/background-agent-landscape)

---

## Announcing Keycard for Coding Agents

**TLDR:** Keycard provides identity, access management, and governance for coding agents like Claude Code, OpenAI Codex, and Cursor, replacing borrowed human credentials with scoped, just-in-time credential injection that integrates into agent lifecycle hooks.

**Summary:**

This product addresses what I consider one of the most underappreciated risks in the current wave of AI-assisted development. Right now, when you run Claude Code or Cursor with access to your codebase, those agents are operating with your credentials. Your GitHub token. Your AWS keys. Your database access. Everything in your environment that you can reach, the agent can reach. And the workaround most teams have landed on is a terrible binary choice: either run with the dangerously-skip-permissions flag and hope for the best, or sit there clicking "approve" on every single tool call until your finger cramps and you start approving things on autopilot. Neither of these is security. One is the absence of security and the other is security theater.

Keycard's core insight is that agents are a fundamentally new category of principal. They are not humans and they are not traditional workloads like a CI runner or a cron job. They reason across execution paths, they invoke tools dynamically based on context, and they make decisions about what to access at runtime rather than at deploy time. That means the existing IAM models — whether you are talking about OAuth scopes, service accounts, or role-based access — do not map cleanly onto agent behavior. Keycard addresses this by integrating into the agent lifecycle through hook and tool approval APIs, injecting scoped credentials just in time for each operation, and ensuring those credentials never touch disk. The credentials are tied to a specific task, user, and environment, which means an agent working on a frontend task cannot accidentally access production database credentials even if those credentials exist somewhere in the broader system.

The delegation chaining concept is particularly important and worth understanding. When an agent spawns sub-agents — which is increasingly common in complex workflows — those child agents cannot exceed the privileges of the parent. This is hierarchical access control applied to agent trees, and it solves a problem that most teams have not even realized they have yet. Without this, a top-level agent with modest permissions could spawn a sub-agent that requests elevated access through a different path, creating a privilege escalation vector that no human is monitoring in real time.

The practical implication is that teams can stop using .env files stuffed with overscoped API keys. If you have ever audited a development team's .env files and found production credentials sitting alongside test tokens on developer laptops, you know how common and how dangerous this pattern is. Keycard replaces that with credential injection that is scoped, temporary, and auditable. They support OAuth 2.1, OIDC, and workload identity protocols, which means this is not a proprietary island — it plugs into the identity infrastructure you probably already have. The fact that Chime is already running this in production suggests it is past the "interesting idea" stage.

What I want to see next is how this handles the edge cases. What happens when an agent needs access to something that was not anticipated in the initial scope? Does it fail closed and block the agent, or is there a mechanism for dynamic elevation with human approval? The consent dialog problem they correctly identify — clicking yes on autopilot is not security — could just reappear at a different layer if the scope management is too restrictive and developers start granting maximally broad scopes to avoid friction.

**Key takeaways:**

- Agents are a new category of security principal that does not fit cleanly into existing human or workload IAM models
- Just-in-time credential injection scoped per task, user, and environment replaces overscoped .env files and borrowed developer credentials
- Delegation chaining ensures sub-agents cannot exceed parent agent privileges, preventing privilege escalation in multi-agent workflows
- Supports Claude Code, OpenAI Codex, OpenCode, Cursor, and other coding agents through hook and tool approval API integration
- Built on OAuth 2.1, OIDC, and workload identity protocols for compatibility with existing infrastructure
- Already in production at Chime, indicating real-world validation beyond proof of concept

**Why do I care:** If your team is using coding agents — and statistically, your team probably is — your agents are currently operating with borrowed human credentials that have far more access than any single task requires. That is a security incident waiting for an opportunity. Keycard represents the first serious attempt to solve agent identity as a distinct problem rather than bolting agent access onto existing human or service account models. Even if you do not adopt Keycard specifically, the concepts it introduces — scoped credential injection, delegation chaining, agent-specific identity — are patterns every engineering team will need to implement as agent usage scales. Start thinking about this now, not after the incident.

**Link:** [Announcing Keycard for Coding Agents](https://www.keycard.ai/blog/announcing-keycard-for-coding-agents)