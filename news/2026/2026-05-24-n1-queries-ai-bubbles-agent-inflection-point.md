---
title: "N+1 Queries, AI Bubbles, and the Agent Inflection Point"
excerpt: "From Doctrine fetch strategies to the third LLM paradigm shift, this week's HackerNoon covers database performance fundamentals and a compelling argument that the AI bubble narrative is missing the point entirely."
publishedAt: "2026-05-23"
slug: "n1-queries-ai-bubbles-agent-inflection-point"
hashtags: "#hackernoon #ai #database #performance #architecture #agentic-ai #backend #generated #en"
source_pattern: "HackerNoon"
---

## Here's How You Can Stop N+1 Queries Forever

**TLDR:** The N+1 query problem quietly destroys database performance in ORM-heavy applications. When you load a collection and then fetch related data for each item individually, you end up with a wall of near-identical SELECT statements. The fix involves understanding your ORM's fetch strategies and applying them deliberately.

**Summary:** If you have ever opened the Symfony Web Profiler and been confronted by dozens of identical SELECT statements that differ only by an ID value, you have been bitten by the N+1 problem. It is one of those issues that feels almost embarrassing once you understand it, because the solution is usually right there in your ORM's documentation, and yet it catches developers at every experience level.

The core of the problem is simple: you load a list of, say, blog posts, and then for each post you access a related author or category, triggering a fresh database query each time. One query to get N posts, then N queries to get the associated data. Your database is doing more work than it needs to, and the overhead compounds fast once you move beyond toy datasets.

Doctrine, the ORM that powers Symfony applications, gives you three fetch modes to work with, and the choice between them is not trivial. Lazy loading, which is the default, is what causes N+1 in the first place. It defers loading associated data until you actually access it, which sounds efficient but falls apart the moment you iterate over a collection. Eager loading solves this by joining related tables upfront, trading a larger initial query for the elimination of subsequent ones. Doctrine's extra-lazy fetch mode is a middle ground for very large collections where you want to count or check membership without pulling everything into memory.

The article frames this as something you need to address proactively rather than reactively. The Web Profiler is a good diagnostic tool, but by the time you are checking query counts in production, the damage is already done. The real discipline is building an awareness of when your code will access associated data and structuring your repository queries accordingly from the start.

I find this kind of article useful precisely because it treats the N+1 problem as something worth genuinely understanding rather than just pattern-matching a fix. That said, the article is light on the nuances of when eager loading itself becomes a problem. Joining everything upfront is not always faster, especially when you are loading wide rows or deeply nested relationships across tables with millions of records. There is also a whole conversation missing around query caching, second-level cache in Doctrine, and the cases where you might reach past the ORM entirely and write a custom DQL or native SQL query. The "stop N+1 forever" framing is a bit optimistic.

**Key takeaways:**
- N+1 occurs when you access related entities in a loop after an initial collection query
- Doctrine's default lazy loading is the usual culprit
- Eager loading (join fetch) solves N+1 by consolidating queries upfront
- Use the Symfony Web Profiler to detect and count query repetition
- Extra-lazy fetch mode helps with very large collections where you only need counts or checks

**Why do I care:** In frontend work you might not be writing Doctrine queries directly, but if you are calling APIs backed by Symfony or any ORM-heavy stack, understanding this problem helps you design better data-fetching contracts. The patterns here also map directly to what you see with GraphQL resolver waterfalls, or badly designed REST endpoints that require cascading calls. The database is almost never the bottleneck people think it is until they introduce N+1, at which point it becomes the only bottleneck.

**Link:** [Here's How You Can Stop N+1 Queries Forever](https://hackernoon.com/heres-how-you-can-stop-n1-queries-forever)

---

## What Stratechery Gets Wrong About The AI Bubble

**TLDR:** A HackerNoon writer pushes back on Ben Thompson's Stratechery analysis of the AI market, arguing that the "agents over bubbles" framing misses or glosses over important counterarguments. The piece takes issue with how Thompson handles the commoditization question and the enterprise AI narrative.

**Summary:** Ben Thompson's Stratechery has become one of the most influential voices in tech analysis, and that influence means his arguments get stress-tested in public. This response from Elhadj_C is part of that tradition, engaging with Thompson's "Agents Over Bubbles" piece and questioning some of its underlying assumptions.

The core of the critique seems to be that Thompson is too comfortable dismissing the bubble concern once he has identified the agent paradigm as transformative. The author's position is that identifying a genuine technological shift does not automatically justify the current scale of capex spending or the valuations attached to AI companies. History is full of genuinely transformative technologies that still went through devastating bubble corrections, and the transformative nature of the technology did not protect early investors.

There is also a thread here about the commoditization argument. Thompson makes the case that because agents require tight integration between model and harness, model companies like Anthropic and OpenAI are harder to commodify than the first wave of AI skeptics believed. The counter-position would be that harnesses themselves can be commodified, or that the advantage is more fragile than it appears, particularly as open-source models and tooling close the gap.

I think what makes this kind of pushback valuable is not necessarily that it is right where Thompson is wrong, but that it forces the underlying assumptions into the open. Thompson is a brilliant analyst, and the Stratechery piece is genuinely worth reading in full. But there is a reasonable argument that he spent most of that piece building the case for why agents are transformative, and less time genuinely grappling with what would have to be true for the bubble scenario to still be correct even given that transformative potential. The counter-article is raising that flag.

**Key takeaways:**
- Strong technology theses do not automatically rule out bubble dynamics
- The integration-as-moat argument for model companies has weaknesses worth examining
- Stratechery's influence means its positions deserve serious scrutiny, not just agreement
- The AI investment cycle has historical parallels that are being underweighted in optimistic analyses

**Why do I care:** As someone building on AI tooling, I want the analysis around this market to be as sharp as possible. If there are real risks in the current investment cycle, understanding them matters for how we think about which platforms to build on, which dependencies to take, and how much we trust the roadmaps of the companies whose APIs we use. Uncritical optimism from influential analysts is more dangerous than pessimism, because it shapes decisions at scale.

**Link:** [What Stratechery Gets Wrong About The AI Bubble](https://hackernoon.com/what-stratchery-gets-wrong-about-the-ai-bubble)

---

## Agents Over Bubbles (Stratechery)

**TLDR:** Ben Thompson argues that the third major LLM paradigm shift, from chatbots to reasoning models to functional agents, fundamentally changes the economics of AI in ways that justify current capex spending and make the bubble narrative look wrong. The key insight is that agents reduce the need for widespread human adoption to generate enormous compute demand.

**Summary:** Thompson opens with a paradox that feels very real if you follow tech commentary closely. There are two kinds of social pressure working on anyone who analyzes AI: one pushes you to take doomsday scenarios seriously so you do not look naively optimistic, and the other pushes you to take the bubble scenario seriously so you do not look like a hype merchant. His position, stated from Nvidia's GTC in March 2026, is that he has moved away from the bubble camp.

The framework he builds around three LLM inflection points is the strongest part of the piece. ChatGPT was the first: it made LLMs visible and accessible, but the underlying model was unreliable in ways that limited serious adoption. You could use it, but you had to babysit it. The o1 release in September 2024 was the second: reasoning models began to verify their own outputs internally, shifting some of the quality-management burden off the user. The third and most consequential is the agentic shift that Thompson dates to the Opus 4.5 release in late 2025, when Claude Code and OpenAI's Codex suddenly began completing multi-hour tasks correctly and without hand-holding.

What Thompson identifies here, and it is a genuinely important observation, is that what changed with Opus 4.5 was not just the model. It was the harness. Claude Code is a piece of software that controls the model, routes tasks, uses deterministic tools, and verifies its own results. This distinction matters because it means model performance alone is not the axis of competition. The integration between model and the software wrapping it is where differentiation lives. That is the argument against model commoditization, and it is more coherent than most versions of that argument I have seen.

The compute demand argument follows logically from this. Agents generate multiple model calls per task rather than one. They use CPU-based tooling alongside GPU-based inference. And because a single human with agency can direct multiple agents simultaneously, you do not need mass consumer adoption to generate enormous aggregate demand. A relatively small number of enterprise operators wielding agents can consume compute at a scale that justifies hyperscaler capex. Thompson does not shy away from the labor implications: he expects companies to use AI as an accelerant for workforce reduction, not just augmentation, and thinks the economic incentives make this outcome hard to avoid.

The section on Apple is interesting but I am not fully convinced. Thompson uses Microsoft's pivot away from model-agnosticism, and their launch of Copilot Cowork as an integrated agent product, to argue that Dediu's "Apple will just license models and own the customer" thesis is flawed. The reasoning is that compelling agents require model-harness integration, which means you cannot just swap models in and out. That might be true today. It is less obvious that it stays true as the tooling matures and standardizes. Apple has surprised people before by entering late and winning on distribution and hardware integration. Writing off that possibility feels premature.

Where I think the piece is most vulnerable is in the confidence of the conclusion. Thompson acknowledges at the end that declaring there is no bubble is classically what happens just before there is one. Then he declares there is no bubble anyway. The argument is internally consistent, but it rests heavily on the assumption that current agent capabilities represent a durable moat rather than a lead that can be closed. Open source is not mentioned seriously. The geopolitical and regulatory risks to hyperscaler capex plans are not mentioned at all. The piece is smart, but it is also optimistic in a way that closes off some important lines of inquiry.

**Key takeaways:**
- Three LLM paradigm shifts: ChatGPT (visibility), o1 (reasoning), Opus 4.5 / agentic harnesses (autonomous task completion)
- The harness, not just the model, is where agent differentiation is found
- Agents allow one human to direct multiple parallel workstreams, concentrating compute demand without requiring mass adoption
- Enterprise customers, not consumers, will drive AI monetization because they pay for productivity
- Model-harness integration weakens the commoditization argument for Anthropic and OpenAI
- Microsoft's Copilot Cowork launch signals that even model-agnostic strategies buckle under agentic requirements

**Why do I care:** This piece directly affects how I think about the platforms and tools I bet on for the next few years. If Thompson is right that model-harness integration is the moat, then being deeply embedded in Claude Code or a specific agent framework is less risky than I might have assumed, because those platforms are not going to be easily replaced by a cheaper commodity alternative. If he is wrong, the calculus reverses. Either way, this is the most important question in the tooling space right now.

**Link:** [Agents Over Bubbles](https://stratechery.com/2026/agents-over-bubbles/)
