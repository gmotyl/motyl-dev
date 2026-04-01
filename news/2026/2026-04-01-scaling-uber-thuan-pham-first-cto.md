---
title: "Scaling Uber from 40 Engineers to Thousands: Lessons from Thuan Pham"
excerpt: "Uber's first CTO shares hard-won lessons on monolith decomposition, org structure, the program/platform split, and how AI is changing engineering today."
publishedAt: "2026-04-01"
slug: "scaling-uber-thuan-pham-first-cto"
hashtags: "#substack #engineering #scalability #uber #architecture #leadership #ai #podcast #en"
source_pattern: "Substac"
---

## Scaling Uber with Thuan Pham, Uber's First CTO

**TLDR:** Thuan Pham was Uber's first and longest-serving CTO, overseeing the company's growth from 40 engineers and a system that crashed weekly to one of the most complex distributed systems in the world. He covers the org decisions, architecture rewrites, and lessons from seven years at Uber, plus his current work at Faire and what he sees AI doing to software engineering.

**Summary:**

This is a long one, and it's worth every minute. Thuan Pham joined Uber when it had roughly 40 engineers and 30,000 rides per day. The system was fragile, crashing multiple times a week. What followed over the next seven years was a story of repeated reinvention, org redesign, and a company growing so fast that each architecture decision was already obsolete before it was finished.

One of the more underrated points Thuan makes is about the program-and-platform split. Before Uber had microservices, before it had the sprawling distributed system people think of today, it had an org structure problem. When the company hit around 100 engineers, shipping a feature required negotiating bandwidth across mobile, backend, and dispatch teams. Every launch became a coordination tax. Thuan, Travis Kalanick, and Jeff Holden literally took color-coded sticky notes with engineers' names and physically reorganized people into self-sufficient cross-functional "program" teams, alongside dedicated "platform" teams. This happened before microservices were even a priority. The org structure change came first, and the technical architecture followed. That ordering matters more than people realize.

The microservices conversation at Uber is also more nuanced than the typical conference talk version. Thuan is clear that microservices at Uber were not a result of engineers reading Martin Fowler papers and making an ideological choice. They were a survival mechanism. The monolith, called "API," was strangling the company. The rule they adopted was simple: anything new had to be built outside the monolith. No exceptions. But here is the part that catches most people off guard: the monolith actually got bigger for a while before it started shrinking. The business kept adding features while the decomposition work was happening in parallel. If you are planning a monolith decomposition and expecting a clean linear reduction, adjust your expectations now.

The China launch story is genuinely wild. Uber's original estimate for launching in China was 18 months. Travis pushed to launch in Chengdu first, the most complex city, not one of the easier ones. The actual launch happened in five months. Thuan's framing is that starting with the hardest problem first built team confidence that made everything after it feel manageable. That is counterintuitive advice, and I think it is right more often than people want to admit.

On AI, Thuan's perspective at Faire is worth separating from the usual hype. His team is using what he calls "swarm coding," which involves orchestrated AI agents working in parallel, and some engineers have reportedly doubled their output in three months. But his honest assessment is that generating greenfield code is the easy part. The hard part is AI working on legacy codebases with millions of lines of code and deep dependency chains. That is where the real capability gap still exists. And his take on what makes engineers great has not changed: curiosity, fearlessness, and the willingness to keep learning. AI raises the floor for everyone, but the ceiling is still set by the same qualities it always was.

**Key takeaways:**

- The program/platform org split at Uber predated microservices and was driven by execution speed, not architectural ideology
- When decomposing a monolith, expect it to grow larger before it shrinks, because the business does not pause while you refactor
- Microservices at Uber were a hypergrowth survival decision, not a technical philosophy
- Launching in the hardest market first (Chengdu for China) built team confidence and compressed a planned 18-month rollout into five months
- A CTO's most important job is building high-talent-density teams and seeing 18 to 24 months ahead, not solving the six-month problems
- AI excels at greenfield code generation but still struggles with legacy codebases; the real productivity challenge is there
- Thuan's career framework: first decade is about maximum learning, mid-career is about outsized impact, leadership phase is about coaching others

**Why do I care:** The program/platform split story is a reminder that org design and technical architecture are not separate concerns. The architecture your team ships reflects the communication structure of the team that built it. Conway's Law is not a law you can break, it is a constraint you have to design around deliberately. The insight that microservices were born from hypergrowth necessity rather than engineering best practice also deserves more airtime. A lot of teams are adopting microservices for the wrong reasons, at the wrong scale, with the wrong tooling. Understanding that Uber needed them because 5,000 engineers could not coordinate through a single codebase is context that changes how you think about when the pattern actually applies. For architects and senior engineers today, the AI-in-legacy-codebases problem Thuan describes is probably the most honest framing of where current AI coding tools fall short.

**Link:** [Scaling Uber with Thuan Pham (Uber's first CTO)](https://newsletter.pragmaticengineer.com/p/scaling-uber-with-thuan-pham-ubers?publication_id=458709&post_id=192665750&play_audio=true&triedRedirect=true)
