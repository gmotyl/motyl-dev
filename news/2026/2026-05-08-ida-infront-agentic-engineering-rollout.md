---
title: "Inside Ida Infront's Structured Rollout of Agentic Engineering"
excerpt: "A 40-year-old Swedish government software company is using Kilo Code to double development speed, with a deliberate, workshop-driven adoption process instead of leaving developers to experiment alone."
publishedAt: "2026-05-08"
slug: "ida-infront-agentic-engineering-rollout"
hashtags: ["#kilo", "#ai", "#devtools", "#agents", "#productivity", "#architecture", "#legacy", "#generated", "#en"]
source_pattern: "Kilo"
---

## One Company's Blueprint for Taking a Whole Engineering Org Agentic

**TLDR:** Ida Infront, a Swedish government software firm running on a 25-year-old platform, picked Kilo Code as its single agentic coding tool and rolled it out through three structured workshops per team. The CTO argues that telling developers to "use whatever AI you want" produces no measurable progression, while standardizing on one tool plus a real onboarding curriculum is what moves an organization forward.

**Summary:** The setup here is interesting because it pushes against the usual narrative around AI tooling. Ida Infront builds case management, secure communications, and digital archiving for Nordic government agencies, which means compliance, long retention horizons, and a platform older than most of its current developers. Their CTO Magnus Grimsell saw the strategic risk early. If smaller competitors can rebuild equivalent products faster and cheaper with AI, the value of a long-running platform actually goes down over time. So the company committed to a structured AI journey starting with Sourcegraph's Cody, then moved to evaluating agentic tools after about six months, eventually choosing Kilo Code over Cline and Roo Code, and rolling it out in January with three pilot teams and 70 seats.

What I find genuinely useful in this story is the rollout shape. Each pilot team goes through three workshops developed jointly with Kilo. The first one is hands-on mob programming on a real backlog item, with an internal AI champion preparing the repo ahead of time with an AGENTS.md file and relevant MCP tools. The second workshop happens one to two weeks later and is essentially a retro on what broke, what worked, what new MCP servers should be wired up, and how the team's workflow needs to change. The third is non-technical and walks through the four phases of their adoption framework: AI Assistant, AI Agents, Multi-agent, and Software Factory. That last session has a structured exercise for surfacing fears and hopes, which sounds soft but matters in practice.

Magnus is direct about the emotional reality of this shift. There are developers who are on board with agentic engineering but feel grief about it, because the craft they spent years building looks different now. He calls that a legitimate response that needed space, and the third workshop is where it gets one. Reactions across teams range from excitement to skepticism to that quiet sadness, and refusing to acknowledge any of those tends to slow adoption rather than speed it up. The teams that had been using Cody heavily expected another incremental boost when they first saw Kilo Code, and the article notes some dropped jaws. The framing Magnus uses is sharp: with an assistant you work the same way, just faster. With agents, the role itself starts to change.

The downstream effects are already visible in their roadmap. Specialized agents for performance work or domain-specific tasks are being planned, designed to fill skill gaps inside teams instead of routing escalations to a small group of in-house experts. AI is also moving into the products they ship. The Swedish National Board for Consumer Disputes deployed an Ida Infront classifier in 2025 that automatically categorizes case documents like receipts and correspondence, and reportedly cut processing times meaningfully. Other companies in Ida Infront's parent group are now looking to copy the playbook. Magnus compares the moment to the shift from waterfall to agile, which changed not just how code was written but how teams were organized and what roles existed. He'd rather shape that change than wait for it.

**Key takeaways:**
- Standardizing on one agentic coding tool with a real onboarding curriculum produces measurable adoption, while a "use whatever you want" policy tends to stall.
- A staggered rollout creates internal trainers. Pilot teams become coaches for the next wave, which scales without bringing in external consultants for every cohort.
- Naming the four phases of adoption (Assistant, Agents, Multi-agent, Software Factory) gives teams a shared map for where they are and where they're heading.
- Acknowledging developer grief about the craft changing is part of the rollout, not an afterthought.
- Specialized agents for performance and domain work are how Ida Infront plans to fill team-level skill gaps without escalating to central experts.
- Legacy platform companies have a real strategic incentive to move first, because the moat of a long-running codebase shrinks as greenfield rebuilds get cheaper.

**Why do I care:** As a senior frontend dev or consultant working with established clients, I keep seeing the same failure pattern Magnus describes: management says "try the AI tools, see what works," nothing happens, and a year later they conclude AI doesn't help their teams. The actual problem is the absence of a chosen direction and a curriculum. What Ida Infront is doing is closer to how good agile rollouts worked, with a defined practice, internal champions, and structured retros. The other thing worth borrowing is the AGENTS.md plus MCP setup as a precondition for the first workshop. Treating repo-level agent context as deliberate infrastructure, not a side artifact, is what separates teams that get real value from agents from teams that abandon them after a month of friction. If you're consulting on AI adoption right now, this rollout is a better reference than most vendor case studies.

**Link:** [One Company's Blueprint for Taking a Whole Engineering Org Agentic](https://blog.kilo.ai/p/one-companys-blueprint-for-taking?publication_id=4363009&post_id=196557035&isFreemail=true&triedRedirect=true)
