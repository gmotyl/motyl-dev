---
title: "Ona's Software Factory Experiment and Auto-Approving Low-Risk PRs"
excerpt: "Ona spins up a public 10-day experiment where agents ship a real product with zero human-written code, alongside a policy-driven auto-approve system that cut lead time by 74%."
publishedAt: "2026-04-18"
slug: "ona-software-factory-auto-approving-prs"
hashtags: "#ona #newsletter #ai #agents #automation #ci-cd #devex #background-agents #governance #architecture #generated #en"
source_pattern: "Ona newsletter"
---

## Software Factory: Ten Days of Agents Shipping a Real Product

**TLDR:** Ona started a public experiment called Software Factory where a small army of background agents builds Memo, a Notion-style note app, with zero human-written code. By day three the agents had already closed 50 PRs and shipped auth, workspaces, a Lexical editor, and full-text search. The site captures each day's milestone, and day four opened the automations dashboard to show the 14 chained agents doing the work.

**Summary:** I love this kind of radical transparency. Ona did not write a whitepaper about what agents might do someday. They pointed a webcam at an empty repo, set up Next.js 16, Supabase, Sentry, and Vercel, and let the agents drive. Day one was rules and stack decisions. Day two was a live scaffold with an AGENTS.md file and a PR Reviewer automation already running. By Wednesday they had gone from empty shell to a functional product faster than most teams get through sprint planning.

What makes the setup interesting is not the speed. It is the pattern underneath. Plan mode takes a short brief and expands it into a product spec. A Feature Planner automation cuts that spec into sequential GitHub issues. A Feature Builder picks them up. Other agents review each other, shepherd PRs, verify outcomes, and respond to incidents. Fourteen automations chained together, each doing a narrow job, with progressive risk escalation so that the riskier actions land on a human's desk.

Day five was the most honest part. Ona's COO stress-tested the app and filed twelve bugs. The factory had been fixing bugs too, but not the same ones. Sentry caught runtime errors autonomously. Visual bugs and weird interaction states still needed a human to say "this feels wrong." That gap between what agents catch and what they miss is where the actual engineering judgment lives right now.

The framing Ona uses is "in the loop to on the loop." You start inside every PR, reviewing line by line. Then you move above the loop, watching the system and stepping in only when something is off. That shift is what most teams are trying to figure out, and watching a real team do it in public beats a conference talk.

**Key takeaways:**
- Breaking a big agent workflow into 14 narrow, chained automations is easier to trust than one giant agent loop.
- Progressive risk escalation lets you automate safe actions while keeping humans on the risky ones.
- Runtime observability catches a different class of bugs than visual QA, and you still need both.

**Why do I care:** I have seen a lot of demos where an agent writes one function and we all clap. This is a multi-week public build with a real stack, real bug triage, and a real answer to "what happens when the agent is wrong." If I am planning agent adoption for a frontend platform team, the two-loop pattern and progressive risk escalation are the shapes I want to copy. It also sets a floor for honest reporting. If you cannot show the bugs the agents missed, your pilot is marketing, not engineering.

**Link:** [Software Factory](https://www.software-factory.dev/)

## Auto-Approving Low-Risk PRs Cut Lead Time by 74%

**TLDR:** Ona's internal team was producing PRs faster than humans could review them, with a median 2 hour 49 minute wait for first approval. They wrote a Low-Risk Change Policy, let an AI agent auto-approve PRs that meet six objective criteria, and watched time to first approval drop to 3.8 minutes, lead time drop 74%, and weekly deploys triple.

**Summary:** This is one of the most concrete AI-in-CI writeups I have read in a while, because they lead with the bottleneck instead of the tech. Their engineers were shipping 10.8 PRs per engineer per week, which is 2.5x the 90th percentile. That kind of throughput breaks the review queue. A senior reviewer gets to a one-word "LGTM" change hours later, the author has already context-switched, and the round trip dwarfs the actual work.

The policy has two principles that I think matter more than the model choice. First, engineers cannot self-classify a change as low-risk. An automation evaluates every PR against objective criteria, which removes the gaming incentive and makes the boundary auditable. Second, the AI agent reviews every PR regardless. The question is never whether the agent reviews, only whether a human also needs to.

The six criteria are refreshingly specific. Fewer than 1,000 lines changed. No protobuf. No database migrations. No infrastructure or CI config. No auth or authz logic. No audit logging or monitoring changes. Miss any one and you go to human review. The agent posts a structured comment explaining either the approval or the escalation reason. A human always clicks merge, which keeps the SOC 2 trail clean. The agent reviews, the human ships.

The numbers are wild. Median lead time went from 4.1 hours to 1.1 hours. Time to first approval dropped 98%. PRs merged per four weeks went from 1,316 to 4,149. Per-developer throughput went from 34 PRs a month to 96. Same team size, no new headcount, mostly the same model as before. The step change happened on March 13 when the bot approved its first PR, and the effect was a cliff, not a slope.

The second-order effect is the one I would steal. Because large PRs trip the criteria and get routed to humans, engineers naturally start writing smaller, focused PRs. Smaller PRs are easier for humans to review, easier for the agent to review, and faster to ship. DORA has been telling us this for years, but most teams fight batch size directly. Ona got there by removing the approval wait.

**Key takeaways:**
- Automate the review, keep merge authority with a human, and the SOC 2 story stays clean.
- Objective automated classification beats self-classification, because it removes the incentive to game the policy.
- If your engineers produce PRs faster than they can review them, adding more AI coding tools makes the bottleneck worse, not better.

**Why do I care:** As a senior frontend engineer working across monorepos, I live in the review queue. Dependency bumps, small copy changes, a test-covered bug fix in an isolated component. All of these sit for hours while a reviewer does something more important. The six criteria here map almost perfectly onto the frontend work I would be comfortable auto-approving, and the governance pattern is something a staff engineer can actually sell to security. The cleanest signal is the one that is hardest to fake: developer throughput tripled without hiring anyone. If you are only measuring the number of AI suggestions accepted, you are measuring the wrong thing.

**Link:** [How auto-approving low-risk PRs with AI cut our lead time by 74%](https://ona.com/stories/auto-approving-low-risk-prs)

## Redesigning Ona Conversations as a Shared Workspace

**TLDR:** Ona rebuilt the core conversation UI so the agent and the developer feel like they are looking at the same screen. The old layout had a chat on the left fighting a utility panel on the right that tried to do environments, diffs, and an editor at once. The new layout anchors output next to dialogue, moves runtime into a bottom drawer, and pulls PR review inline.

**Summary:** The honest admission in this writeup is that Ona outgrew its origin. It started as a dev environment product and now it is a background agent platform. The UI was still shaped like the old mission, with the environment panel competing for attention every time you just wanted to read a diff or check a preview. That mismatch becomes a tax on working memory, and the author is right that working memory is the resource you actually have to budget.

The redesign makes three moves I like. Reviews happen inline with a searchable file tree and real diffs, so you stop bouncing to GitHub to rebuild context. Inline comments flow back into the conversation, which turns review into a continuation of the plan instead of a separate ritual. Ports, services, and tasks move into a bottom drawer where they stay anchored without competing with the main thread of work.

The other shift is decoupling conversation history from runtime. Environments are ephemeral. If your UI ties the chat to the running environment, closing the environment feels like losing context. The new design lets you step away, come back, and find the agent where you left it, with or without a live runtime attached. That sounds small and it is not. It is the difference between a chat app and a workspace.

They also teased what this unlocks. Integrated terminals. Multi-agent coordination in one environment. Managed sub-sessions. And the ability to bring in Claude Code as an external agent inside the same governed shell. That last one is the tell. Ona is positioning as the substrate for whichever agent you want, not a single-vendor bet.

**Key takeaways:**
- If your tool keeps forcing context switches, you are spending users' working memory on navigation instead of problems.
- Decoupling conversation state from runtime state lets users step away without losing the thread.
- Treating review as part of the dialogue, not a separate ritual, keeps the why and the what tethered.

**Why do I care:** I spend a lot of time in split-pane AI tools where the chat and the code are fighting for screen real estate. The pattern Ona is describing matches where I think the whole category is heading. The agent is not a chatbot on the side, it is a second pair of hands in the same workspace. As someone who advocates for frontend design systems, I also appreciate that they framed the redesign around calm and focus rather than feature density. That is the right instinct when your product surface is growing fast.

**Link:** [Designing for Collaboration: How we rethought Ona conversations](https://ona.com/stories/redesigning-ona-conversations)

## Ona Changelog: Inline Review, Org Skills, Automations, and Claude Opus 4.6

**TLDR:** A dense changelog covering inline code review inside Ona sessions, organization-level Agent Skills, a full Automations system with templates and guardrails, SCIM provisioning for Entra ID, new MCP integrations for Atlassian, Notion, and Sentry, and an upgrade to Claude Opus 4.6 at the same price as 4.5.

**Summary:** The code review additions are the headline for me. You can leave inline comments on an agent's changes the same way you would on a teammate's PR. You can ask Ona to review the current diff before you merge, and the agent leaves suggestions without waiting for a human. You can open a PR directly from the session without bouncing to your Git provider. The round trip between "agent wrote it" and "it is on main" shrinks noticeably.

Organization Skills is the piece I want to plug into right now. Skills are reusable prompts with a name, a description, and an optional slash command. The description tells the agent when to apply the skill automatically, which means you can bake a team's code review checklist, test strategy, or deployment steps into something the agent picks up on its own. You can also migrate existing slash commands to skills with one click, which is a polite way to handle the upgrade path.

Automations is where Ona turns into a real platform. You chain prompts, shell scripts, PR creation, and report extraction into multi-step flows. Triggers are manual, webhook-driven on PR events, or on a schedule. Each action runs in its own isolated environment. Templates include Sentry error triage and fix, a "10x engineer" that picks up your top Linear issue and opens a PR, and the code review flow they showed in the earlier post. Guardrails include concurrency limits, total action caps, deny lists, and audit logging, which is the kind of ops surface that lets a platform team actually adopt it.

On the enterprise plumbing side, SCIM provisioning for Microsoft Entra ID is a real unlock. You link SCIM to an existing SSO setup and directory changes in the IdP flow into Ona automatically. Three MCP integrations land: Atlassian for Jira and Confluence, Notion for docs, and Sentry for errors. Secrets are now usable during Dev Container builds via secret mounts, which avoids baking credentials into shared images. AWS eu-south-2 joins the supported regions. And Opus 4.6 is live with adaptive thinking, double the output tokens, and better tool use at the same credit rate.

**Key takeaways:**
- Treating Skills as first-class org resources makes team conventions portable across agents.
- Automations with role-based sharing, service accounts, and audit logging is the shape platform teams need to actually deploy agents at scale.
- The Opus 4.6 upgrade at unchanged pricing is the quiet kind of improvement that matters.

**Why do I care:** As someone who would be buying or integrating this kind of platform, the governance features are where I look first. Organization roles per resource type, service accounts with their own tokens and secrets, webhooks scoped to repos or orgs. This is the difference between a demo and something I can get past security. And the "skills as shared team knowledge" model is a cleaner abstraction than stuffing everything into one AGENTS.md file per repo.

**Link:** [Ona Changelog](https://ona.com/docs/changelog)

## Background Agents Virtual Summit: Call for Speakers

**TLDR:** Ona is running the first virtual summit focused on background agents and opened a call for speakers. The event brings together engineers, leaders, and vendors building autonomous software development. Details are light, registration is open.

**Summary:** Not much to unpack yet beyond the signal itself, which is that someone thinks the category is big enough for a dedicated summit. Background agents, meaning agents that run without you holding their hand, are a different shape of problem from chat-style assistants. They need triggers, guardrails, isolated environments, review automation, and some notion of shared team skills. Most of the Ona changelog above is infrastructure for exactly that shape.

If you are working on any of this, the call for speakers is worth a look. I would expect talks on policy design, failure modes, observability for agent runs, and the squishier human-process questions around approving agent work at scale.

**Key takeaways:**
- Background agents are getting their own conference, which tells you where the vendor conversation is heading.
- Good talk topics probably sit at the intersection of policy, observability, and review flows, not just model choice.
- Submitting a talk is a cheap way to force yourself to articulate what you actually learned.

**Why do I care:** I keep telling teams that the model layer is not the interesting part. The governance, the harness, the review loop, the failure-mode catalog, these are where real engineering happens. A summit dedicated to this slice of the problem is a nice forcing function for the industry to stop benchmarking generic chat and start sharing operational playbooks.

**Link:** [Background Agents Virtual Summit: Call for Speakers](https://sessionize.com/background-agents-virtual-summit-2026)
