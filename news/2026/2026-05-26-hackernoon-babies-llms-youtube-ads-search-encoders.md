---
title: "Babies Beat LLMs, YouTube's Ad Racket, and Why Your Search Results Are Almost Right"
excerpt: "From infant physics intuition to China's Nvidia-free AI ambitions, this week's HackerNoon covers the ideas that actually matter."
publishedAt: "2026-05-25"
slug: "hackernoon-babies-llms-youtube-ads-search-encoders"
hashtags: "#hackernoon #webdev #ai #machinelearning #architecture #generated #en"
source_pattern: "HackerNoon"
---

## Why Your Newborn Already Knows Physics (And Why LLMs Still Can't)

**TLDR:** A newborn baby arrives with built-in intuitions about object permanence, causality, and physical laws that no one explicitly taught her. LLMs, trained on trillions of tokens, still lack these grounding assumptions. The gap between biological and artificial learning might be more fundamental than we want to admit.

There is something deeply uncomfortable about the fact that a three-day-old infant can be surprised when a ball rolls behind a screen and doesn't come out the other side, but a state-of-the-art language model cannot reliably reason about why that should happen. The baby's brain isn't bigger, faster, or better-connected. What she has is a prior — a set of assumptions baked in by evolution over hundreds of millions of years that says "objects persist, causes precede effects, and physical laws are consistent."

This is what Bruce Li is getting at in his essay, and it is a point I find genuinely unsettling when I think about AI system design. We've been measuring intelligence in terms of pattern matching on text, and babies don't do that. They do something closer to Bayesian inference over a structured world model, and they arrive with the structure pre-loaded. No training run gives you that for free.

The practical implication is that the "just scale it" approach to AI reasoning has a ceiling that we may already be approaching. The architectures trying to close this gap, things like world models, structured state representations, and neurosymbolic hybrids, are genuinely interesting research directions. Whether any of them will give us the equivalent of that infant's two-millisecond surprise response is an open question I don't expect to be answered soon.

What I do know is that if you're building AI-assisted applications right now, you should be skeptical of any reasoning that crosses domain boundaries or requires implicit physical grounding. The model may generate a fluent answer. That doesn't mean it understood the question the way you meant it.

**Key takeaways:**
- Infants come pre-wired with physical intuitions that LLMs cannot replicate through text training alone
- The gap is architectural, not just a matter of scale or data volume
- World models and neurosymbolic approaches are the most credible paths forward, but none are production-ready

**Why do I care:** As someone who builds systems that increasingly rely on LLM reasoning, this is a useful corrective. The fluency of outputs can mask shallow grounding. Any task that requires stable physical or causal reasoning should be treated with extra skepticism and tested with edge cases that probe those assumptions directly.

**Link:** [Why Your Newborn Already Knows Physics (And Why LLMs Still Can't)](https://hackernoon.com/why-your-newborn-already-knows-physics-and-why-llms-still-cant)

---

## Companies Pay YouTube to Show Ads While Users Pay to Escape Them

**TLDR:** YouTube has constructed an economy where advertisers pay to force their messages in front of viewers, and those same viewers pay a monthly subscription fee to avoid seeing those messages. Both transactions happen simultaneously, and YouTube profits from both sides.

The author's framing here is blunt and accurate: YouTube Premium isn't a product feature, it's a ransom payment. You're paying to restore the baseline experience that existed before the platform decided your attention was a commodity to be auctioned. The absurdity is that this model is now so normalized that most people don't even register how strange it is.

What makes this interesting from a tech industry perspective is that it's not a bug or an oversight. It's a deliberately engineered outcome. The ad experience was allowed to degrade because every additional forced pre-roll is revenue, and users who find it intolerable are monetizable in a different way through subscriptions. The platform benefits from making the free tier worse.

This is a pattern worth watching as it spreads. More services are discovering that a deliberately degraded free tier is not just acceptable but financially optimal. The ad-supported version exists to make the paid version feel necessary, not as a genuine alternative. I find this depressing but also useful to understand when evaluating any platform's pricing strategy.

The practical question for developers and architects is whether the applications we build are heading in the same direction. Every time we add "friction" to a free tier to push conversions, we're running a version of this playbook. There's a point where the trade-off works for the business and breaks trust with users, and it's worth thinking about where that line is before you cross it.

**Key takeaways:**
- YouTube monetizes both the ad viewer and the person paying to avoid ads — the same user population, twice
- The deliberate degradation of free tiers to drive paid conversions is a replicable and spreading business pattern
- Platform trust erodes when users recognize the manipulation, even if they continue paying

**Why do I care:** The subscription-plus-ads model is relevant to any developer building consumer software with a freemium component. Understanding why this works financially, and why users hate it but accept it, is useful context for product decisions around monetization.

**Link:** [Companies Pay YouTube to Show Ads While Users Pay to Escape Them](https://hackernoon.com/companies-pay-youtube-to-show-ads-while-users-pay-to-escape-them)

---

## U.S. Export Controls May Be Training China's AI Stack to Survive Without Nvidia

**TLDR:** By blocking Nvidia GPU exports, U.S. policy may be inadvertently forcing Huawei, DeepSeek, and Chinese cloud providers to build a self-sufficient AI infrastructure stack. The result could be an AI ecosystem that doesn't need Nvidia at all, which is the opposite of the intended outcome.

Tassos argues, and I think he's right, that export controls as a technology containment strategy have a fundamental flaw: they create the pressure that motivates the target to eliminate the dependency. Nvidia's H100 and A100 chips are extraordinary, but they are not magic. Given enough economic necessity and engineering talent, alternatives get built. Huawei's Ascend chips exist precisely because there was no other option.

The deeper point is about infrastructure sovereignty. China is not just building chips — it's building the entire stack, from silicon to training frameworks to cloud APIs. DeepSeek demonstrated that you can train competitive frontier models on constrained hardware if you're willing to optimize aggressively. That optimization pressure, perversely, makes the resulting systems more efficient and more adaptable than ones built on the assumption of abundant high-end compute.

For architects and engineers outside China, this matters because it changes the competitive landscape assumptions. If you're designing systems that assume Nvidia hardware dominance and CUDA as the de facto compute substrate, you should start thinking about what a world with serious Ascend and homegrown framework alternatives looks like. It's not here yet, but the trajectory is clear.

**Key takeaways:**
- Export controls are accelerating Chinese investment in domestic AI hardware and software stacks
- Huawei's Ascend and DeepSeek-style efficiency optimizations are the practical outcomes
- Long-term, this may produce a fully parallel AI infrastructure ecosystem rather than dependency reduction

**Why do I care:** The assumption that "AI infrastructure means CUDA and Nvidia" is worth revisiting for any long-term architecture work. Not because Chinese hardware is ready to replace Nvidia today, but because planning for a more fragmented hardware landscape is just prudent engineering.

**Link:** [U.S. Export Controls May Be Training China's AI Stack to Survive Without Nvidia](https://hackernoon.com/us-export-controls-may-be-training-chinas-ai-stack-to-survive-without-nvidia)

---

## Why Modern Search Systems Use Both Dual-Encoders and Cross-Encoders

**TLDR:** Vector search with dual-encoders is fast but often returns results that are semantically close but contextually wrong. Cross-encoders fix the relevance problem but are too slow to run at retrieval time. Production search systems use both in a two-stage pipeline: retrieve with dual-encoders, then rerank with cross-encoders.

This is one of those articles that explains something I've seen work in practice but never had a clean mental model for. Abhina Bohra, a Senior Applied Scientist at Amazon, walks through exactly why you can't just pick one approach. Dual-encoders compute query and document embeddings independently, which means you can pre-compute document embeddings and do fast approximate nearest-neighbor search at query time. The trade-off is that the encoder has no way to model the interaction between the specific query and the specific document — it compresses each into a fixed vector and hopes the geometry does the work.

Cross-encoders solve this by taking the query and document together as input, so they can model fine-grained relevance signals. The catch is that you can't pre-compute anything — you have to run the cross-encoder on every query-document pair at query time, which is orders of magnitude slower. You can't run this over a million documents in a search system with reasonable latency.

The two-stage solution is elegant: use the dual-encoder to get a candidate set of maybe 100-200 documents quickly, then use the cross-encoder to rerank only those. You get the speed of approximate retrieval with the precision of full interaction scoring for the final results. If you've been frustrated with RAG pipelines that return documents that seem related but miss the actual point of the query, adding a cross-encoder reranking step is often the fix.

**Key takeaways:**
- Dual-encoders are fast but miss query-document interaction signals; cross-encoders are accurate but slow
- Two-stage pipelines (retrieve then rerank) combine the strengths of both approaches
- This architecture is directly applicable to RAG systems where retrieval precision affects generation quality

**Why do I care:** If you're building any kind of semantic search or RAG system and wondering why your retrieval quality is disappointing, this is the most likely architectural explanation and the most practical fix. The reranking step is often underimplemented because it feels like an optimization, but in practice it's the difference between a system that works and one that doesn't.

**Link:** [Why Modern Search Systems Use Both Dual-Encoders and Cross-Encoders](https://hackernoon.com/why-modern-search-systems-use-both-dual-encoders-and-cross-encoders)
