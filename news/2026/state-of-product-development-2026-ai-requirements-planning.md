---
title: "The State of Product Development 2026: Why Your AI Tools Can't Fix Bad Requirements"
excerpt: "A deep-dive into a 340-team survey revealing that AI adoption is near-universal but most teams are using it in the wrong places, while upstream planning problems go untouched."
publishedAt: "2026-03-11"
slug: "state-of-product-development-2026-ai-requirements-planning"
hashtags: "#substack #refactoring #ai #architecture #teams #productivity #management #dx #generated #en"
---

## The State of Product Development 2026

**TLDR:** A survey of 340 engineering teams reveals that while 95% have adopted AI, almost nobody is using it where it matters most: upstream product requirements. The biggest bottleneck isn't code — it's unclear specs, tribal knowledge, and fragile planning that AI is just accelerating in the wrong direction.

Look, I've been in this industry long enough to know that every year somebody publishes a survey claiming to have discovered The Real Problem with software development. And every year it's basically the same problem wearing a different hat. But this one from Luca Rossi's Refactoring newsletter actually has teeth, because it quantifies something we've all felt but couldn't put a number on: teams are throwing AI at coding while the actual bottleneck sits untouched upstream.

The survey hit 340 engineering professionals — individual contributors, tech leads, managers, senior leaders — across companies from 10-person startups to thousand-plus engineer organizations. And the headline finding is both obvious and devastating: 59% of teams discover missing tasks, stories, or dependencies mid-cycle. Every. Single. Cycle. That number barely moves whether you're a scrappy startup or a massive enterprise. Scale doesn't fix it, which means this isn't a tooling problem or a headcount problem. It's a clarity problem.

Here's where it gets interesting: 60% of engineers say they need clarifying questions "often" or "almost always" before they can even start working on a ticket. Only 8% — eight percent! — say tickets give them everything they need. And when you dig into what causes the most delays and rework, the top answer is ambiguous or missing acceptance criteria at 50%, followed by edge cases discovered too late at 40%. The counterintuitive finding is that engineers are actually more likely to understand why something is being built than what "done" looks like. We share the intent, but we fail at defining the finish line. That's a subtle but critical distinction.

Now, you'd think with AI being everywhere — 95% adoption, 80% substantial use — teams would be directing it at this problem. But no. The survey found that only 9% of teams use AI to generate or help with product requirements. Nine percent. Meanwhile, everyone's using it for code generation, code review, and documentation. Teams are essentially using AI to run faster on a treadmill that's pointed at a wall. Garbage in, garbage out — and with AI, it's more garbage, faster. That's not my quip, that's basically what the data says.

The knowledge management picture is equally grim. Two-thirds of teams store critical knowledge primarily in people's heads. One in eight say institutional knowledge simply disappears when someone leaves. And here's a kicker: 54% of teams have zero shared AI context. Each developer manages their own prompts, their own assumptions, their own product definitions. So the same AI tools are operating with different understandings of the product on the same team. At larger companies with 500 to 1,000-plus engineers, over 75% of developers are managing AI context individually. More resources, somehow fewer shared practices. It's almost impressive how badly that scales.

What I think the article doesn't fully wrestle with — and I wish it did — is the chicken-and-egg problem here. Teams with good processes before AI are compounding their advantage. Teams with bad processes are just failing faster. But who's actually building the bridges between those two camps? The article says the gap is "closable" and then basically says "write things down and experiment with AI sometimes." That's like telling someone to lose weight by eating less and exercising more. Technically correct, practically useless without addressing the organizational incentives that got you here. Why aren't requirements clear? Because writing good acceptance criteria is hard, unglamorous work that nobody gets promoted for. Until that incentive structure changes, surveys like this will keep finding the same results.

The one genuinely actionable finding is about experimentation time. Teams that dedicate explicit time for AI experimentation — even just 10% of capacity — are significantly more optimistic and report better results. Only 17% of teams do this. The rest squeeze it in between deadlines, which means they default to what already works and never discover workflows that could fundamentally change their output. This is the compounding effect in action: small investments in learning create exponential returns, while no investment keeps you stuck in local optima.

For architects and team leads, the message here is clear: before you invest in another AI coding tool or another pair-programming agent, audit your upstream process. How clear are your acceptance criteria? Where does institutional knowledge live? Does your team have shared AI context, or is every developer reinventing their own prompt strategy? The survey suggests that the highest-leverage thing you can do isn't adopt more AI — it's make the inputs to your AI actually worth processing.

**Key takeaways:**
- 59% of teams discover missing work mid-cycle regardless of company size — this is a clarity problem, not a scale problem
- Only 9% of teams use AI for product requirements, the use case most directly tied to their biggest bottleneck
- 54% of teams have zero shared AI context — each developer manages prompts and product knowledge individually
- Teams with dedicated AI experimentation time (even 10% of capacity) are significantly more optimistic and effective
- Knowledge management remains broken: 64% store critical context in people's heads, and 1 in 8 lose it when someone leaves

**Tradeoffs:**
- Investing time in upstream requirements clarity slows initial ticket creation but dramatically reduces mid-cycle rework and discovery
- Shared AI context infrastructure requires team coordination overhead but prevents fragile individual-level workflows from becoming team bottlenecks
- Dedicating 10% capacity to AI experimentation reduces short-term throughput but compounds into significantly better tooling leverage over time

**Link:** [The State of Product Development 2026](https://refactoring.fm/p/the-state-of-product-development)