---
title: "Ant Group Reveals the Model Behind Kilo's 'Elephant': Ling-2.6-flash"
excerpt: "Kilo's stealth AI model 'Elephant' is officially unmasked as Ant Group's Ling-2.6-flash, a 104B-parameter mixture-of-experts model built for agentic workflows."
publishedAt: "2026-04-22"
slug: "ant-group-ling-2-6-flash-elephant-unmasked"
hashtags: "#substack #ai #llm #agents #openmodel #en"
source_pattern: "Substac"
---

## The Elephant is Out of the Bag: Meet Ant Group's Ling-2.6-flash

**TLDR:** Kilo's mystery "Elephant" model was actually Ant Group's Ling-2.6-flash, a 104B-parameter mixture-of-experts model with only 7.4B active parameters. It was released under a pseudonym to get unbiased community feedback, and the results were overwhelmingly positive. It's now free to use on Kilo for one week with no limits.

**Summary:**

A little while back, Kilo introduced a stealth model they called "Elephant" — a 100B-parameter model from an unnamed open model lab, released without any branding or identity. The point was simple: let the model prove itself without any hype, baggage, or brand recognition getting in the way. And that's exactly what happened. Across coding tasks, document parsing, and agentic workflows, the Kilo community consistently praised how fast and capable it was. Speculation ran wild — was it from a major tech company? A heavily tuned open-source fork? Something entirely new?

Today, Kilo pulled off the mask. The model is Ant Group's Ling-2.6-flash, built by inclusionAI, which is Ant Group's AGI initiative. The name "Elephant" was a clever nod all along — you can't spell "Elephant" without "ant." The architecture is a mixture-of-experts setup, with 104 billion total parameters but only 7.4 billion active during any given inference call. That ratio is what makes it so fast. You get reasoning depth from a massive model, but the latency and cost profile of a much smaller one.

What's particularly interesting about how Ling-2.6-flash was built is its training approach. Ant engineered the Ling model family from the ground up with Agentic Reinforcement Learning. That's not just fine-tuning for chat — it's training the model specifically to handle multi-step autonomous tasks: terminal commands, GUI interactions, coordinated tool calls, the whole pipeline. Because of this, the model integrates naturally with OpenClaw and Kilo's hosted KiloClaw product.

The community didn't just passively use Elephant — they actively shaped it. During the stealth period, users contributed pull requests improving system prompts and fine-tuning the integration. That kind of collaborative refinement pushed the model's instruction adherence and contextual reasoning even further. It's a good reminder that the line between "using" a model and "improving" it can be surprisingly thin when the tooling is open enough to allow it.

Ant Group is no stranger to large-scale model work. Their Ling-1T model, a trillion-parameter behemoth released at the end of 2025, was clearly aiming at the same space as DeepSeek-V3. Ling-2.6-flash looks like a more pragmatic refinement of those lessons — smaller active parameter count, faster inference via Novita, and a clearer target use case in agentic development. To mark the reveal, Kilo is making Ling-2.6-flash completely free on their platform for a full week, with no rate limits, no token caps, and no paywalls.

**Key takeaways:**

- Kilo's mystery model "Elephant" is Ant Group's Ling-2.6-flash, built by the inclusionAI AGI initiative
- It uses a mixture-of-experts architecture: 104B total parameters, 7.4B active — high capability with low latency
- The model was trained with Agentic Reinforcement Learning, making it well-suited for autonomous multi-step workflows
- Community feedback during the stealth phase directly shaped system prompt improvements and integration refinements
- Ling-2.6-flash is natively compatible with OpenClaw/KiloClaw for agentic tool use
- The model is free to use on Kilo with no limits for one week starting now

**Why do I care:**

The blind test approach here is actually smart product research. By stripping away the name, Kilo forced the community to evaluate purely on performance — and the results validated the model before anyone could form an opinion based on "Ant Group AI" vs. some more recognized brand. That matters because brand bias in model selection is real and underappreciated. The other thing worth noting is the mixture-of-experts efficiency story: 7.4B active parameters on a 104B model means you get a lot of capability for a fraction of the inference cost. For teams building agent loops that run thousands of calls a day, that ratio is the whole ballgame. I'd want to benchmark this against Gemini Flash and GPT-4o mini on real agentic workloads before drawing firm conclusions, but the community response so far is credible signal.

**Link:** [The Elephant is Out of the Bag: Meet Ant Group's Ling-2.6-flash](https://blog.kilo.ai/p/the-elephant-is-out-of-the-bag-meet?publication_id=4363009&post_id=194927472&isFreemail=true&triedRedirect=true)
