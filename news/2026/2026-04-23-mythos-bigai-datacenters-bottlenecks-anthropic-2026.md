---
title: "Mythos, BigAI, Datacenters and Bottlenecks: The Physical Limits of the AI Boom"
excerpt: "Anthropic's Claude Mythos model signals a new capability tier while the AI industry quietly collides with power grids, helium shortages, and geopolitical friction that no amount of venture capital can simply buy away."
publishedAt: "2026-04-23"
slug: "mythos-bigai-datacenters-bottlenecks-anthropic-2026"
hashtags: "#substack #AI #infrastructure #datacenters #Anthropic #generated #en"
source_pattern: "Substac"
---

## Claude Mythos, $30B ARR, and the Datacenter Crisis Nobody Wants to Talk About

**TLDR:** Anthropic's new Claude Mythos model is being withheld from general release due to its capabilities, while the company's ARR has hit $30 billion and overtaken OpenAI in enterprise demand. Meanwhile, half of planned US data centers are delayed or canceled due to power constraints, equipment shortages, and geopolitical disruption -- a slow-moving crisis that is getting suspiciously little media coverage.

**Summary:**

The headline from this newsletter is Anthropic's Claude Mythos, a model so capable that Anthropic apparently decided it needed a 40-company pre-release coalition -- Project Glasswing -- to give cybersecurity defenders a head start before the model goes public. That is a genuinely interesting move. It is easy to be cynical about "responsible release" theater, but the framing here is specific: give defenders time to harden infrastructure before offensive capabilities become broadly accessible. Whether it works is another question, but the reasoning at least is coherent rather than vague.

The revenue numbers around Anthropic are frankly hard to process at normal scale. Going from $19B ARR in February to $30B in March, adding what Palantir took 15 years to build in a single month, is the kind of growth that makes traditional SaaS benchmarks feel quaint. The author ties this directly to Claude's coding performance, and I think that connection is right. Claude 3.5 Sonnet changed how developers actually worked, and Claude Code turned that into a product with a recurring revenue hook. When you have 1,000 companies each spending over a million dollars per year, and that number doubled in under two months, you are not talking about a niche developer tool anymore.

But the more interesting half of this newsletter is the infrastructure story, and it deserves more attention than it typically gets. Bloomberg reported that roughly half of planned US data centers are now delayed or canceled. The author lists the compounding constraints: power grid interconnection queues stretching to five years, high-power transformer lead times that went from 24 months pre-2020 to five years today, helium prices doubling since Qatar's production disruptions from the Iran conflict, and community opposition causing moratoriums and rezoning denials across multiple states. These are not software problems. They cannot be resolved with a product update or a round of fundraising.

The helium angle is one I had not thought about carefully before reading this. Helium is used in semiconductor fabrication and in the supercooling of MRI machines and other precision hardware. Qatar supplies around 34% of the global supply, and production disruptions there have already driven a 50%+ price spike with some estimates saying it has now doubled. This is the kind of second-order supply chain effect that gets lost in coverage that focuses entirely on GPU production or model benchmarks. The author makes the point that electrical infrastructure represents less than 10% of total data center cost, but a single bottleneck in the power chain stops the entire project. That asymmetry matters.

China's position in this story is complicated. GLM-5.1 from Zhipu AI (now Z.ai after their January 2026 IPO) is a 754-billion parameter Mixture-of-Experts model claiming to be trained entirely on domestic Huawei Ascend hardware rather than Nvidia GPUs. The author is appropriately skeptical about verification. But the broader point about the competitive gap closing is worth sitting with: in 2025 China was roughly nine months behind US frontier models; now the estimate is three months behind closed models and potentially ahead on open-weight models. When you compound that with China's energy grid investment trajectory -- the newsletter notes the US needs to roughly 7x its power grid output in 15 years while China is building at a pace that already outpaces the US -- the long-term picture is not comfortable.

**Key takeaways:**

- Anthropic's Claude Mythos is being released first to a 40-company cybersecurity coalition (Project Glasswing) rather than the general public
- Anthropic ARR hit $30B in March 2026, up from $19B in February, with 1,000+ companies spending $1M+ annually
- Half of planned US data centers are delayed or canceled due to power constraints, equipment shortages, and geopolitical disruption
- High-power transformer lead times in the US have stretched from 24 months pre-2020 to five years today
- Qatar helium production disruption has caused prices to double, affecting semiconductor and HBM supply chains
- China's GLM-5.1 (Z.ai) is a 754B parameter MoE model claimed to be trained on domestic Huawei hardware, not Nvidia
- The AI industry gap between the US and China has narrowed from ~9 months in 2025 to ~3 months behind on closed models
- Hyperscalers are increasingly moving to on-site natural gas power generation to bypass years-long grid interconnection queues
- OpenAI investor confidence is declining, while secondary market demand for Anthropic shares has moved to the top spot

**Why do I care:**

I work in frontend and the temptation is to treat all of this as "infrastructure layer" stuff that does not affect my daily work. That is wrong. The compute constraints described here -- if they are even half as severe as the author suggests -- directly affect API availability, pricing, and the rate at which new model capabilities become accessible to developers building products. If data center buildout is running at 30-50% of its planned capacity through 2029, the era of abundant cheap inference we have been promised is going to be delayed. That matters for every team right now budgeting around AI-assisted development tools, and it matters for every product that is betting its architecture on inference costs continuing to fall. The helium and transformer bottlenecks are not the kind of thing that gets solved by a startup with good vibes and a term sheet. I think we should all be paying closer attention to the physical constraints column and less to the benchmark leaderboard column.

**Link:** [Mythos, BigAI, Datacenters and Bottlenecks](https://www.ai-supremacy.com/p/mythos-bigai-datacenters-and-bottlenecks-anthropic-2026)
