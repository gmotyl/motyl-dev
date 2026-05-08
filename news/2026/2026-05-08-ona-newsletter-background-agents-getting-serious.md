---
title: "Background Agents Get Serious: What Ona's Newsletter Reveals About the Shift from Assistants to Delegated Engineering"
excerpt: "Ona's latest newsletter rounds up a virtual summit on background agents, with talks from Stripe, Cloudflare, Genentech, and others showing how delegated AI engineering is moving from demo to production."
publishedAt: "2026-05-08"
slug: "ona-newsletter-background-agents-getting-serious"
hashtags: ["#ona", "#ai", "#agents", "#devtools", "#architecture", "#productivity", "#llm", "#frontend", "#generated", "#en"]
source_pattern: "Ona newsletter"
---

## Background Agents Virtual Summit Recording

**TLDR:** Ona hosted a virtual summit where engineering teams from Stripe, Cloudflare, Genentech, Open Inspect, nono, and Tessl shared how they run background agents in production. The talks cover everything from operating on a 30-million-line codebase to runtime security layers and a "data wall" for autonomous agents. It's a useful snapshot of where serious teams actually are with delegated AI engineering.

**Summary:** The summit lineup reads like a who's who of teams that have moved past the proof-of-concept phase. Alistair Gray from Stripe spoke about Minions, the agent system Stripe built to operate on a 30-million-line codebase, which is exactly the kind of scale where a naive agent loop falls over. Rajesh Bhatia from Cloudflare described the shift from assisted engineering, where humans stay in the loop on every change, to delegated engineering, where agents own outcomes. That's a meaningful distinction, and it changes how you think about review, observability, and trust.

Stephen Parkinson from nono presented a three-layer model for runtime security: enforce, attest, decide. Cole Murray from Open Inspect showed how to build a company-internal background agent system, which is the path most enterprises will probably take rather than handing the keys to an external SaaS. Xiucheng Quek from Genentech walked through agents operating across science and cloud infrastructure for genomics work, where the cost of a wrong answer is not a flaky test but real research drift.

Ona's own contribution, Veto, was framed as a data wall for autonomous agents, which I read as a guardrail layer that sits between agents and the systems they touch. Patrick Debois from Tessl closed with a thesis I keep hearing in different forms: context is the new code. The interesting work is no longer just writing prompts or even tools, it's curating what the agent sees and can do.

If you watch one talk, the Stripe and Cloudflare ones are probably the most useful for engineering leaders trying to figure out their own roadmap. The full recording is on Ona's site.

**Key takeaways:**
- Serious teams are running agents on massive codebases, not toy repos
- The shift is from "assisted" to "delegated" engineering, with different review and trust models
- Runtime security for agents needs its own architecture, not just IAM bolted on
- Internal agent platforms are common at scale; few teams are pure SaaS consumers
- Context curation is becoming the dominant lever, more than prompt engineering

**Why do I care:** As a frontend architect, I spent the last year watching agent capability outrun our ability to govern it. The summit lineup tells me the conversation has matured. We're past "can it write a component" and into "how do we let it ship without breaking the system." For anyone consulting on AI adoption, the patterns from Stripe and Cloudflare are reusable, and the security model from nono is the kind of thing I'd reference in a discovery doc tomorrow.

**Link:** [Watch recording · Ona](https://ona.com/videos/background-agents-summit)

## How Serious Engineering Teams Use Background Agents (Podcast Recap)

**TLDR:** This Spotify episode is a 40-minute audio recap of the Background Agents Virtual Summit, condensing the main ideas from the talks into one focused listen. It's the right format if you want the gist on a commute without committing to the full video session.

**Summary:** The podcast version is a smart move on Ona's part. Conference recordings tend to die in browser tabs nobody opens. A focused audio recap, properly produced, lives in your podcast app and gets played while you walk the dog. The episode pulls the throughlines from the summit, which means you get the patterns without the individual demos. That's usually what you want when you're trying to figure out whether to invest in a particular approach.

For people new to the space, this is probably a better starting point than the full recording. You hear the same teams referenced, you get the security and architecture themes, and you don't have to sit through every slide. For people already deep in agent infrastructure, the value is in the framing, hearing how multiple companies converged on similar answers without coordinating.

The format also signals that Ona sees this as ongoing content, not a one-off event. A newsletter and a recap podcast suggest they want to be the place teams go to figure out background agents, not just the platform that runs them.

**Key takeaways:**
- 40-minute audio recap is a good format for engineering leaders short on time
- Pulls common themes from the summit talks rather than recapping each one
- Signals Ona is investing in being a content hub, not just a vendor
- Useful for sharing with teammates who won't watch a multi-hour recording

**Why do I care:** I share newsletters and articles with clients constantly, and a 40-minute podcast lands better than a recording link in most cases. It's the artifact I'd send to a CTO who's curious about agents but hasn't blocked time to dig in. I also pay attention when a vendor invests in this kind of secondary content, because it tells me they're thinking about the buyer's journey, not just the demo.

**Link:** [How Serious Engineering Teams Use Background Agents - Ona Newsletter](https://open.spotify.com/episode/7d1XM5M5JpDKvLIW9DBmZk?si=HP7uRXQqTYGT_29bjo5RsA)

## Ona Platform Overview and Getting Started

**TLDR:** Ona positions itself as the platform for background agents, with reproducible dev container environments, kernel-level security, and the option to run in Ona Cloud or your own VPC on AWS or GCP. You can start a single interactive session or run fleets of agents on schedules, pull request events, or issue tracker triggers.

**Summary:** The getting-started page lays out the core promise clearly. Define your environment as code with Dev Containers and automations, so every agent starts from a known state. No more "works on my machine" reproducing itself in agent runs, which is a real failure mode I've seen when teams try to roll their own setup. Bring an AGENTS.md and skills to make the agent more productive, which mirrors the pattern Claude Code and Cursor are converging on.

The integration story is what most enterprises will care about. Source control, IDEs, Jira, Notion, plus assignment of issues from Linear and triggers on pull request events. That maps directly to the way real engineering organizations already work, which is the bare minimum for adoption. The governance pitch, policies, audit, guardrails, SSO, OIDC, SCIM, is aimed squarely at the procurement conversation, not the developer experience. Both have to land for a platform like this to get past pilot.

The five-minute setup claim is worth checking, but the deployment flexibility, cloud or VPC, is genuinely differentiated. A lot of agent platforms force you onto their cloud, which is a non-starter for regulated industries.

**Key takeaways:**
- Dev Containers plus automations give you reproducible agent environments
- AGENTS.md and skills carry over from Claude Code and Cursor patterns
- Integrations with Linear, Jira, Notion, and pull request events are first-class
- Cloud or VPC deployment matters for regulated workloads
- Governance features (SSO, OIDC, SCIM, audit) are positioned for enterprise procurement

**Why do I care:** When I evaluate agent platforms for clients, the first question is always "can it run in our VPC and connect to our existing tools." Ona answers both before you ask. The AGENTS.md pattern is also worth borrowing even if you don't use Ona, because it's becoming the de facto way to give agents project-specific context. I've started recommending it as a baseline for any team adopting agentic workflows.

**Link:** [Overview - Ona Documentation](https://ona.com/docs/ona/getting-started)

## How Auto-Approving Low-Risk PRs with AI Cut Lead Time by 74%

**TLDR:** Ona's engineering team wrote up how they used AI to auto-approve low-risk pull requests, cutting time to first approval from 2 hours 49 minutes down to 3.8 minutes. They didn't try to replace human review, they removed it from the cases where it added no value. The post is from their stories page and is a useful concrete example of agent-assisted process improvement.

**Summary:** The framing here is the part I want to highlight. They didn't auto-approve all PRs, they auto-approved the ones that didn't need human eyes. That's a meaningful distinction, and it's the difference between a thoughtful rollout and a reckless one. Anyone who has worked in a codebase with a healthy review culture knows that 60 to 80 percent of PR reviews are pattern-matching on small changes, and only the remaining 20 to 40 percent need a human's attention.

A 74% reduction in lead time on the auto-approved subset is the kind of number that gets attention from engineering leaders. The real question is what counts as low-risk, and how confident the classifier is. Without seeing the criteria, I'd guess they look at things like change size, file types, test coverage on touched files, history of the author and area, and whether the PR is part of a known automation pattern. The post probably explains it; this is the kind of thing I'd want to read in full before applying the pattern at a client.

The other piece worth noting is that this is Ona using its own platform to ship process improvements internally, which is a good signal. Vendors that don't dogfood tend to have weird gaps in their products.

**Key takeaways:**
- Auto-approval works when scoped to low-risk PRs, not as a blanket policy
- Time to first approval dropped from 2h 49m to 3.8m on the targeted set
- The classifier definition of "low-risk" is the part worth scrutinizing
- Vendor dogfooding is a good trust signal when evaluating agent platforms

**Why do I care:** I've watched teams add review-bottleneck dashboards and complain about them for years without changing the process. This is a different lever, removing review from the cases that don't need it, and it's the kind of structural change agents make possible. For consulting work, this is a pattern I'd benchmark against on any platform engineering engagement, regardless of which vendor the client picks.

**Link:** [How auto-approving low-risk PRs with AI cut our lead time by 74%](https://ona.com/stories)

## Ona Stories: Spec-Driven Design and the Background Agents Landscape

**TLDR:** Ona's blog index also surfaces a piece on spec-driven design, where 30 minutes of spec writing plus 10 minutes of agent execution produced a PSX-styled 3D world using real Google city data, and a landscape post mapping the agent infrastructure that Stripe, Ramp, and Spotify built from scratch. Both are worth reading if you're thinking about how agents change developer workflows.

**Summary:** The spec-driven design post lands on something I've been arguing for a while. When agents are doing the typing, the design phase becomes the bottleneck and the leverage point. Thirty minutes of spec writing and ten minutes of execution is not a typo; that's the actual ratio when the agent is competent and the spec is good. It inverts the traditional ratio where coding takes most of the time and design takes whatever's left over. Senior engineers who have been undervaluing planning time will need to update their mental model.

The landscape post is the kind of analysis I wish more vendors published. Stripe's Minions, Ramp's hand-rolled stack on Modal and Cloudflare, Spotify's internal infrastructure: all built before the current vendor ecosystem existed. The implication is that if you're starting now, you don't have to. The build versus buy question on agent platforms is genuinely live, and seeing the cost of building it yourself laid out concretely makes that conversation cleaner. I'd recommend the post to any engineering leader thinking about whether to staff an agent platform team.

The Tackling Agent Reliability post about replacing seven agent tools with one is also worth reading if you're designing your own agent surface. The shift from edge-triggered to level-triggered state is a software design pattern that maps cleanly from systems engineering to agent runtime, and it's a good example of mature thinking applied to a new domain.

**Key takeaways:**
- Spec-driven design inverts the traditional design-to-implementation time ratio
- The agent infrastructure landscape gives you the cost of building it yourself
- Tool consolidation (seven to one) and level-triggered state are reliability patterns worth borrowing
- These posts are useful inputs for build-versus-buy conversations on agent platforms

**Why do I care:** Build versus buy on agent infrastructure is a question I expect to field constantly over the next year. Having a written breakdown of what Stripe, Ramp, and Spotify each built makes that conversation faster and better grounded. The spec-driven design framing is also the right thing to push on with senior engineers who still treat planning as overhead. If your team's bottleneck moves to the spec phase, that's a sign your agent setup is actually working.

**Link:** [AI software engineers for enterprise · Ona Stories](https://ona.com/stories)
