---
title: "Why We're Making Kilo's Gateway and Cloud Backend Source-Available"
excerpt: "Kilo announces plans to release source code for its Gateway and Cloud backend infrastructure on GitHub, embracing transparency and community-driven development in AI infrastructure."
publishedAt: 2026-02-02
slug: kilo-gateway-cloud-source-available
hashtags:
  - "#substack"
  - "#opensource"
  - "#aiinfrastructure"
  - "#developertrust"
---

## TLDR

Kilo is releasing source code for its Gateway and Cloud backend infrastructure on February 6, 2026, under a source-available license. This move prioritizes developer transparency and trust while maintaining protection for the hosted service. The company is backing this commitment with a $150-per-PR incentive program in February and flying up to five major contributors to Amsterdam for an in-person building session. Existing components like their VS Code extension and CLI remain under irrevocable Apache 2.0 licenses.

## The Philosophy Behind Transparency

Most AI coding platforms operate as black boxes—you send a prompt, receive code back, and everything in between remains hidden. Kilo is taking a different approach rooted in the belief that **transparency matters, especially for infrastructure developers**. When developers can read, audit, and understand how systems make decisions, trust follows naturally.

The reasoning is straightforward: when developers see how a system works, they make better decisions, contribute improvements, and feel confident building on it long-term. For an agentic engineering platform, this foundation is essential. Kilo's leadership, particularly co-founder Sid Sijbrandij (who co-founded GitLab 11 years ago), understands that open core models succeed when core functionality stays open and the community never experiences a bait-and-switch. Features that start open stay open—the foundation remains available to the community.

## Understanding Source-Available vs. Open Source

Source-available software occupies a middle ground between fully proprietary systems and traditional open source licenses. Here's what you get:

**With Source-Available Code:**
- Read and audit the code for security and compliance
- Learn from the architecture and design patterns
- Contribute improvements directly
- **Cannot:** Use it outside development or offer a competing hosted service

**With Open Source (Apache 2.0/MIT):**
- All the above benefits
- Plus broader commercial redistribution rights

Kilo's approach: some code already uses irrevocable Apache 2.0 licenses (VS Code extension, JetBrains plugin, CLI). This code stays permanently open regardless of what happens to the company. The Gateway and Cloud infrastructure will be source-available, providing visibility and contribution rights while protecting the hosted service itself.

## What's Being Released

Starting February 6, 2026, the following will become source-available:

- **Kilo Gateway** - the infrastructure connecting to 500+ models
- **Kilo Cloud components:**
  - Session management
  - Cloud Agents
  - Code Reviewer
  - Kilo for Slack
  - And more

**What remains private:** Only the abuse-protection system, which ensures Kilo remains safe and available for everyone.

## Community Incentive Program

Kilo is putting real money behind community participation:

- **$150 per PR merged** in February (no cap on how many you can merge)
- **Expenses-paid trip to Amsterdam** for up to five major contributors to attend the Quarterly Focus Week for in-person collaboration

This isn't about volume or speed—it's about rewarding thoughtful contributions as more of the stack becomes open and collaborative. The Kilo Champion program recognizes active contributors, and developers from other AI coding projects are welcome to explore and contribute.

## Benefits for Different Audiences

**For Developers Building:**
- Production architecture becomes educational material
- Fork, modify, and learn by building
- Contribute and shape the future of the platform

**For Enterprise Teams:**
- Audit source code for security and compliance requirements
- Extend with internal tooling
- Verify absence of black-box risks in critical infrastructure

**For the Community:**
- Transparency builds trust in AI tools
- Collaborative development drives innovation
- Open contributions stay open permanently

## The Broader Vision

The underlying philosophy reflects a conviction that AI is too important to lock behind proprietary walls. An agentic engineering platform should be something developers can trust, inspect, and help improve. With an existing community of 11,000+ developers, Kilo is positioning itself as a platform built on open foundations—not as a marketing strategy, but as a genuine commitment to building software that lasts.

February 6th marks a milestone in a long-term roadmap focused on transparency. The initiative invites developers to join the Discord, star the GitHub repos, and start contributing—particularly by looking for issues tagged "good first issue" for entry points into the codebase.

**Link:** [Why We're Making Kilo's Gateway and Cloud Backend Source-Available](https://blog.kilo.ai/p/kilo-cloud-source-available?publication_id=4363009&post_id=186623954&isFreemail=true&triedRedirect=true)