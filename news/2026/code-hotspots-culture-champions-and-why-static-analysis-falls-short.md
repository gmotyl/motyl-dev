---
title: "Code Hotspots, Culture Champions, and Why Static Analysis Falls Short"
excerpt: "Version control history reveals that only 2-3% of your codebase drives most development work, reframing how teams should prioritize technical debt."
publishedAt: "2026-03-02"
slug: "code-hotspots-culture-champions-and-why-static-analysis-falls-short"
hashtags: "#substac #architecture #performance #engineering #frontend #backend #ai #quality #culture #teamwork #techdebt #generated #en"
---

## Code Quality Through the Lens of Version Control History

**TLDR:** Adam Tornhill, author of *Your Code as a Crime Scene*, argues that static analysis alone is fundamentally insufficient for understanding code quality. By analyzing version control history instead, teams discover that development work concentrates in just 2-3% of the total codebase, which means technical debt should be prioritized by activity, not complexity.

**Summary:**

There is a deeply ingrained habit in our industry: we fire up a static analysis tool, point it at our codebase, and let it spit out a list of problems sorted by severity. Then we dutifully start fixing things from the top. Adam Tornhill thinks we have been doing it wrong for years, and frankly, his argument is hard to argue with.

The core insight is deceptively simple. Static analysis examines code at a single point in time, like taking a photograph of a highway and trying to figure out where the traffic jams are. You cannot. You need to watch the flow. Tornhill's approach uses version control history to understand developer behavior patterns, tracking which files change most often, who touches them, and how they evolve. The findings are remarkably consistent across hundreds of codebases: the vast majority of development work concentrates in just 2-3% of the total codebase.

This changes everything about how you should think about technical debt. That gnarly, over-abstracted utility module that nobody has touched in five years? Leave it alone. It is stable. It works. The file that three teams modify every sprint and that causes merge conflicts every other day? That is where your engineering hours are actually burning. The intersection of complexity and high activity is where technical debt becomes exponentially more expensive, and that is where you should focus your limited refactoring budget.

What Tornhill is less explicit about, though, is the organizational friction this creates. Hotspot analysis often reveals uncomfortable truths about team boundaries and ownership gaps. The most-changed files frequently sit at the boundaries between teams, and fixing them requires cross-team coordination that nobody wants to initiate. The tooling gives you the diagnosis, but the treatment is a people problem, not a code problem.

There is also a subtle trap here that teams should watch for. Once you start optimizing for hotspot metrics, you risk creating an incentive to avoid changing certain files rather than improving them. Metrics shape behavior, and if the metric says "this file changes too often," the lazy response is to stop changing it rather than to make it easier to change. The real goal is reducing the cost of change, not the frequency of it.

**Key takeaways:**
- Static analysis alone misses the most critical dimension of code quality: how code evolves over time
- Development work concentrates in roughly 2-3% of any codebase, making targeted improvement vastly more efficient than blanket cleanup
- Technical debt should be prioritized by the intersection of complexity and change frequency, not complexity alone
- Stable complex code that nobody touches is a low priority, regardless of how ugly it looks
- Hotspot analysis often exposes organizational issues at team boundaries, not just technical ones

**Tradeoffs:** Gain laser-focused technical debt prioritization but sacrifice the comfort of treating all code quality issues equally. Gain data-driven refactoring decisions but risk creating incentives to avoid modifying hotspot files rather than improving them.

**Link:** [Sharing your culture, finding your allies, and reliable code quality](https://refactoring.fm/p/sharing-your-culture-finding-your)

---

## Finding Allies: The Real Mechanics of Engineering Culture Change

**TLDR:** Improving engineering culture or quality is a two-part problem: identifying what needs to change and actually making change happen. The second part requires finding champions who drive a progression from lone crusader to coach to system-wide adoption.

**Summary:**

Luca Rossi surfaces a model from Christine Pinto that maps how quality improvements actually propagate through engineering teams, and it is refreshingly honest about how messy the process is. There are three stages: the Crusader (one engineer acts as a hero, pushing change mostly alone), the Coach (the hero teaches others and establishes principles), and the System (individual efforts reach critical mass and become team-wide processes).

What is worth calling out here is the uncomfortable truth hiding in this model. Most organizations want to skip straight to the System stage. They write a policy, announce it in an all-hands meeting, and wonder why nothing changes six months later. The model makes clear that you cannot get to System without first going through Crusader and Coach. You need a person who cares enough to fight the uphill battle against tight roadmaps and stressed-out colleagues. That is not something you can mandate from the top.

The article also touches on demonstrating culture to candidates rather than just describing it. Engineering blogs, public post-mortems, and behind-the-scenes content reveal how a team actually operates. Shopify sends candidates a culture handbook upfront and requires explicit acceptance before moving forward, which is an interesting forcing function. The advice to document observable behaviors instead of aspirational statements is solid: "our best engineers seek feedback early and take ownership end-to-end" is infinitely more useful than "we value excellence."

But here is what the article dances around without fully committing to: the Crusader stage is personally expensive. The person who spearheads change largely on their own often burns out before reaching the Coach stage. Organizations that depend on individual heroism for quality improvements are essentially borrowing against someone's motivation and goodwill. If you are a leader reading this, the real takeaway is not just "find your allies" but "actively protect and support your allies so they survive long enough to reach the Coach stage."

The blend of top-down support and bottom-up energy is where lasting change actually lives. Neither alone is sufficient. Top-down without champions creates policies nobody follows. Bottom-up without leadership support creates frustrated engineers who eventually leave.

**Key takeaways:**
- Culture change follows a predictable progression: Crusader to Coach to System, and you cannot skip stages
- The bottom-up part of change needs champions, especially at the start, but those champions need organizational protection
- Demonstrating culture through real stories, engineering blogs, and post-mortems is more effective than listing abstract values
- Document observable behaviors of your best engineers rather than writing aspirational value statements
- Lasting change requires both top-down support and bottom-up energy working in concert

**Link:** [Sharing your culture, finding your allies, and reliable code quality](https://refactoring.fm/p/sharing-your-culture-finding-your)
