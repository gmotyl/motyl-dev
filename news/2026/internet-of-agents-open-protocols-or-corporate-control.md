---
title: "The Internet of Agents: Open Protocols or Corporate Control?"
excerpt: "A deep dive into why the infrastructure decisions being made right now around AI agents will determine economic autonomy, democracy, and whether billions of people remain in control of their digital futures."
publishedAt: "2026-02-23"
slug: "internet-of-agents-open-protocols-or-corporate-control"
hashtags: "#metacircuits #ai-agents #open-protocols #agentic-ai #democracy #infrastructure #generated #en"
---

## The Internet of Agents Will Make or Break Democracy

**TLDR:** The infrastructure being built right now for AI agents -- identity, trust, and payment systems -- will determine whether we end up in a dystopia of platform-controlled agents or a thriving ecosystem of individually owned micro-assistants. The technology is the same in both scenarios; only the governance and protocol decisions differ.

**Summary:**

Here is a piece that cuts right to the bone of something most people in tech are not paying enough attention to. The author lays out a framework borrowed from MIT's Prof. Ramesh Raskar: two curves diverging from the same starting point. The red curve leads to a handful of corporations running an "agent store" where everyone uses the same accounting agent, the same legal agent, the same shopping agent. Consolidation crushes the middle class. The green curve is the opposite -- billions of individually owned micro-assistants forming a bustling marketplace. Same models, same agents, radically different outcomes. The variable? Infrastructure. The plumbing.

And that plumbing is being designed as we speak. The article highlights that MCP (Model Context Protocol) and A2A (Agent-to-Agent) are now de-facto standards under the Linux Foundation's Agentic AI Foundation -- which is genuinely encouraging. But the author is honest about the gaping holes. Identity is a mess: agents currently authenticate with passwords stored in plain text files. Research shows AI models cannot be trusted to handle their own security -- they skip verification steps and leak private keys. Trust is nonexistent: there is no credit score for agents, no portable reputation system. Google's A2A protocol has a literal empty placeholder for "reputation signals." And commerce is broken at the micro-transaction level -- traditional card payments charge a minimum of $0.30 per transaction, while agent work often costs fractions of a cent. The math simply does not work.

What I find most compelling -- and what the author deserves credit for articulating clearly -- is the DNS analogy. The decision to keep DNS under neutral, public governance through ICANN is arguably what prevented the early web from becoming a collection of corporate walled gardens. The same kind of decision is being made right now for AI agent protocols. Neutral governance of trust, discovery, and payment mechanisms is the only path to preserving individual economic agency. Without it, you become what the author calls an "economic NPC" -- a non-player character in your own financial life.

Now, here is where I would push back. The article strongly advocates for "local, personal, privacy-first AI agents" and building your own AI workspaces. That is a beautiful vision, but it sidesteps a brutal reality: the overwhelming majority of people do not have the technical skills or inclination to run their own agents. The article acknowledges that over 80% of the world has never interacted with an AI agent as of February 2026, then immediately pivots to "go build your own AI workspaces." There is a massive gap between those two statements. Who bridges that gap? If the answer is "platforms," then we are back on the red curve regardless of protocol neutrality. The piece is also missing a serious discussion of regulatory frameworks -- the EU AI Act, emerging US policy, and how governments (not just standards bodies) will shape this landscape.

For architects and teams, the practical takeaway is this: if you are building agent-based systems today, design for protocol portability from day one. Do not hard-wire to a single identity provider or payment rail. The standards are still settling, and being locked into one ecosystem's approach to agent identity or commerce could be an architectural dead end within 18 months.

**Key takeaways:**
- MCP and A2A are now governed by the Linux Foundation's Agentic AI Foundation, establishing them as neutral, open standards
- Three critical missing layers for the agent internet: identity, trust/reputation, and micropayment infrastructure
- AI models cannot be trusted to manage their own security -- agent identity must live in a separate tamper-proof layer
- Microsoft Research found agents exhibit severe "first-proposal bias," choosing the first response regardless of quality
- OpenAI and Stripe's Agentic Commerce Protocol only handles single purchases with human oversight -- far from sufficient
- Google and Sea Limited's partnership around the Agent Payments Protocol (AP2) will be one of the first large-scale agentic commerce deployments
- The DNS governance analogy is the key frame: neutral infrastructure governance prevented web monopolization and must do the same for agents

**Tradeoffs:**
- Gain individual economic autonomy through open protocols but sacrifice the convenience and polish of integrated platform experiences
- Gain privacy and control with local agents but sacrifice accessibility for non-technical users who need managed solutions
- Gain protocol neutrality through standards bodies but sacrifice speed of iteration that commercial players can deliver

**Link:** [The internet of agents will make or break democracy](https://metacircuits.substack.com/p/the-internet-of-agents-will-make?publication_id=4089894&post_id=188834414&isFreemail=true&triedRedirect=true)