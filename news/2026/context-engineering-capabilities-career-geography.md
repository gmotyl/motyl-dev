---
title: "Context Engineering, Technical Capabilities, and Career Geography"
excerpt: "Exploring what good context really means for both AI and humans, the Accelerate capabilities that drive delivery performance, and wisdom from Redis creator on career choices"
publishedAt: "2026-01-19"
slug: "context-engineering-capabilities-career-geography"
hashtags: "#substack #refactoring #architecture #ai #engineering #devops #cicd #testing #teams #productivity #generated #en"
---

## Context, Capabilities, and Tech Hubs

**TLDR:** Good context engineering isn't just about AI - it's about creating systems where developers (and AI) succeed with minimal explicit instructions. The key is nurturing feedback loops that continuously improve inputs, not outputs.

Let me tell you something that's been on my mind lately. Everyone's talking about context engineering for AI - RAG, MCPs, context windows, all that jazz. But here's the thing: we're asking the wrong question. Instead of asking how to stuff more context into our AI systems, we should be asking: what does good context actually look like?

Think about bringing a contractor onto your team. They need the obvious stuff - product specs, UI designs, technical requirements. But they also need the implicit knowledge: Do you require tests? How do you instrument features? What about feature flags? Naming conventions? This is exactly the position AI is in, and frankly, it's the position every new team member is in too.

There's a useful mental model here that separates two types of context: task-specific instructions (the what needs to be done) and procedures and principles (the how it should be done). The north star for any team should be continuously shrinking the what and growing the how. You don't want to say "write tests" in every prompt or ticket - you want it to be standard practice that everyone, including AI, already knows.

The real insight is this: when something turns out wrong, most people focus on the output. Was the developer sloppy? Was the AI hallucinating? In my experience, the answer is almost always simpler - context was missing. So fix the output, sure, but then go back and fix the inputs. That feedback loop is the actual context engineering.

For architects and team leads, this has profound implications. Your documentation, your ADRs, your coding standards - these aren't bureaucratic overhead. They're literally the context that makes your team (human and AI) capable of performing. Invest in them accordingly.

**Key takeaways:**
- Good context separates task-specific instructions (what) from procedures and principles (how)
- The goal is systems where developers succeed with minimal explicit instructions
- When outputs fail, usually context was missing - fix inputs, not just outputs
- Context engineering is about nurturing feedback loops, not just defining context

**Link:** [Context, capabilities, and tech hubs](https://refactoring.fm/p/context-capabilities-and-tech-hubs?publication_id=64099&post_id=184642054&isFreemail=true&triedRedirect=true)

---

## The Accelerate Technical Capabilities Greatest Hits

**TLDR:** The research-backed technical capabilities from Accelerate remain the definitive checklist for delivery performance - from version control and automated testing through continuous deployment and empowered teams.

Luca went back to his notes on Accelerate, and honestly, this list of technical capabilities is something you should print out and hang on your wall. These aren't opinions - this is research-proven stuff about what actually impacts delivery performance.

**Version Control** for all production artifacts. Not just code - configs, infrastructure, everything. Reproducibility and traceability are non-negotiable foundations.

**Automated Testing** - reliable unit, integration, and acceptance tests. This gives teams confidence to deploy frequently and correlates directly with lower failure rates and faster recovery.

**Test Data Management** is consistently the bottleneck everyone underestimates. Reliable testing requires intentional investment in test data.

**Continuous Integration** - developers merge work into a central repository triggering automated builds and tests. Catch integration issues early, not at release time.

**Trunk-Based Development** - short-lived branches, integrate at least daily. Avoid the integration hell of long-lived feature branches. I know some of you love your two-week feature branches. Stop it.

**Continuous Delivery** - main branch code is always deployable, passes CI, gets deployed to staging. Manual approval for production.

**Continuous Deployment** - the aspirational goal where every change passing tests automatically deploys to production. Remember: deploying doesn't mean releasing. Decouple these with canary releases and feature flags.

**Shift Left on Security** - integrate security checks early in the delivery pipeline, not as a gate at the end.

**Loosely Coupled Architecture** - components can change and deploy independently. This reduces coordination overhead and blast radius when things go wrong.

**Empowered Teams** - autonomy to design, build, test, and deploy without excessive dependencies. As Team Topologies taught us, this is how high-performing organizations work.

For teams evaluating their practices, use this as a checklist. Score yourself honestly on each dimension. The gaps you find are where your delivery performance is leaking.

**Key takeaways:**
- Version control everything - code, configs, infrastructure
- Trunk-based development with daily integration beats long-lived branches
- Continuous delivery means main is always deployable
- Test data management is usually the hidden bottleneck
- Empowered teams with loose coupling enable independent deployment

**Tradeoffs:**
- Trunk-based development requires strong CI discipline but eliminates integration hell
- Continuous deployment demands mature testing but enables rapid iteration
- Loosely coupled architecture increases initial complexity but reduces coordination costs

---

## Salvatore Sanfilippo on Building a Career Outside Tech Hubs

**TLDR:** The creator of Redis deliberately chose to build his career from Sicily rather than Silicon Valley, arguing that while tech hubs might lead to greater wealth, they're not necessary for engineering excellence.

This is wisdom worth hearing. Salvatore Sanfilippo - Antirez - created Redis. He's unquestionably one of the most gifted engineers on the planet. And he made a deliberate choice to stay in Sicily rather than relocate to Silicon Valley.

His perspective is refreshingly contrarian: "To be a successful software engineer, you can be everywhere, but to make a lot of money, it is much better to stay in the center of things. For me, it was not a problem of performance, but how much money you want to make."

There's a threshold argument here that I find compelling. Salvatore mentions around €4,000/month in Italy as a comfort threshold beyond which additional money contributes minimally to wellbeing. Past that point, you're optimizing for something that doesn't actually make your life better.

His decision to remain in Sicily was driven by personal values (preferring Europe's balance of capitalism and social services), community connections (maintaining important relationships in his hometown), and quality of life (prioritizing wellbeing over wealth accumulation).

Here's the part that really stuck with me: he's observed many young people in the US who "become rich too fast" and experience a lack of purpose as a result. There's something there about the relationship between struggle, achievement, and meaning that's worth contemplating.

For architects and senior engineers thinking about career moves, this is valuable perspective. The industry's default assumption is that career advancement means moving to where the money is. Salvatore's example shows that technical excellence and meaningful contribution don't require geographic relocation - but you do need clarity on what you're actually optimizing for.

**Key takeaways:**
- Engineering excellence doesn't require being in tech hubs
- Beyond a comfort threshold, additional wealth contributes minimally to wellbeing
- Community connections and quality of life are valid optimization targets
- Getting rich too fast can create its own problems around purpose and meaning

**Tradeoffs:**
- Staying in lower cost-of-living areas maintains community connections but may limit wealth accumulation
- Prioritizing wellbeing over wealth requires clarity about what "enough" means for you

---

*This article was generated from the Refactoring newsletter. The summaries above are based on the newsletter content. Always refer to the original sources for complete information.*