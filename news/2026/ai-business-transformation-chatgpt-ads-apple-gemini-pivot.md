---
title: "AI Business Transformation, ChatGPT Ads, and Apple's Gemini Pivot"
excerpt: "Andrew Ng shares insights from Davos on AI workflow transformation, OpenAI introduces advertising in ChatGPT, Nvidia releases reasoning models for autonomous vehicles, Apple partners with Google for Siri, and a new system generates 3D scenes in seconds."
publishedAt: "2026-01-23"
slug: "ai-business-transformation-chatgpt-ads-apple-gemini-pivot"
hashtags: "#thebatch #ai #llm #agents #autonomous-vehicles #apple #google #openai #3d #architecture #generated #en"
---

## AI Workflow Transformation: Beyond Point Solutions

**TLDR:** Andrew Ng argues from Davos that the real AI payoff comes not from automating individual tasks, but from redesigning entire workflows end-to-end. Bottom-up experiments matter, but transformative impact requires top-down strategic vision.

The conventional wisdom around AI adoption has been "let a thousand flowers bloom" — encourage teams to find AI applications wherever they see fit. But according to Andrew Ng, writing from the World Economic Forum in Davos, this approach has largely failed to produce significant returns. The difference between incremental gains and transformative impact lies in how we think about workflows, not just tasks.

Consider a bank loan approval process. Using AI to automate the preliminary review step might save an hour of human labor. That's nice, but it's not going to change the business. What changes the business is realizing that if you can do preliminary approval in 10 minutes instead of a week, you've created an entirely different product — a "10-minute loan" that attracts more customers and generates more revenue.

This shift requires taking a product and business perspective, not just a technology perspective. Speeding up one step forces you to rethink how applications are submitted, how marketing positions the product, how final review handles increased volume, and how execution scales. You're not just swapping in AI for a human — you're redesigning the entire customer experience.

What's often missing from AI transformation discussions is the acknowledgment that this kind of thinking is hard to do bottom-up. The people closest to problems see solutions first, but they rarely have visibility into the end-to-end workflow or the authority to redesign it. This is where executive leadership becomes essential — not to mandate specific AI projects, but to identify which workflows are candidates for transformation and empower teams to redesign them holistically.

For architects and engineering leaders, this means evaluating AI opportunities differently. Instead of asking "where can we use AI?" ask "which workflows, if dramatically faster or more responsive, would fundamentally change our value proposition?" The technical implementation might only touch one step, but the organizational change touches everything.

**Key takeaways:**
- Incremental AI efficiency gains rarely produce transformative business impact
- Real transformation comes from end-to-end workflow redesign enabled by AI capabilities
- Bottom-up innovation identifies opportunities; top-down strategy enables transformation
- The product/customer experience perspective matters more than the technology perspective

**Tradeoffs:**
- Workflow redesign delivers higher ROI but requires cross-functional coordination that point solutions avoid
- Top-down strategy provides vision but risks missing insights from practitioners closest to problems

**Link:** [The Batch Newsletter - January 23, 2026](https://www.deeplearning.ai/the-batch/)

---

## ChatGPT Introduces Advertising

**TLDR:** OpenAI has begun testing display ads in ChatGPT for free and low-cost plan users in the US. The move signals evolving business models for AI companies facing massive infrastructure costs.

OpenAI has crossed a line that many in the tech industry saw coming but hoped might be avoided: ChatGPT now shows ads. The test targets US users of free and entry-level paid plans, appearing as clearly labeled display ads at the bottom of conversations. Premium subscribers remain ad-free — for now.

The implementation is carefully designed to avoid the most obvious pitfalls. Ads don't influence chat responses. They're excluded from conversations about health, mental health, and politics. Conversations aren't shared with advertisers. Users can dismiss ads and provide feedback. But the personalization system uses chat history, location, and shared personal information to target ads, which will make privacy advocates uncomfortable regardless of the guardrails.

What's interesting is how conventional this approach is. After years of speculation about what "AI-native advertising" might look like, OpenAI is starting with the same banner ads we've seen since the early web. They've shown mockups of more prominent placements and discussed "conversational" ads where users could ask questions about products, but they're testing carefully before going further.

The business reality is stark. OpenAI took in $20 billion in revenue in 2025 while spending an estimated $9+ billion on compute alone. The company projects $115 billion in capital spending through 2029. Unlike Google or Microsoft, OpenAI doesn't have other business units to subsidize AI development. The combination of advertising and lower-cost subscription tiers (ChatGPT Go at $8/month in the US, even less in developing markets) creates new revenue paths beyond the premium subscribers who currently carry the load.

For teams building AI-powered products, this is worth watching. If OpenAI — the most well-funded AI startup in history — needs advertising revenue, what does that say about unit economics for everyone else? The costs of running inference at scale remain punishing, and finding sustainable business models is far from solved.

**Key takeaways:**
- Display ads now appear in ChatGPT for free/low-cost plan users in the US
- Ads are personalized but don't influence responses and exclude sensitive topics
- OpenAI's infrastructure costs exceed $9 billion annually with $115 billion projected through 2029
- Premium subscribers remain ad-free, but OpenAI hasn't ruled out expanding ads to other tiers

**Tradeoffs:**
- Advertising provides revenue diversification but risks degrading user experience and trust
- Lower-cost tiers expand market reach but create user segments with different value expectations

**Link:** [OpenAI ChatGPT Advertising Announcement](https://openai.com/)

---

## Nvidia's Alpamayo-R1: Chain-of-Thought Reasoning for Autonomous Vehicles

**TLDR:** Nvidia released Alpamayo-R1, a vision-language-action model that uses explicit reasoning to help autonomous vehicles make better decisions. In simulations, the reasoning-equipped model reduced close encounters with other vehicles by 35% compared to non-reasoning versions.

Chain-of-thought reasoning has proven valuable across math, coding, and general knowledge tasks. Nvidia's Alpamayo-R1 demonstrates it works for autonomous driving too. The system takes 2 seconds of video from four cameras plus trajectory history and produces both explicit reasoning text (explaining decisions like "stop due to pedestrian in crosswalk") and 6.4 seconds of predicted future trajectory.

The architecture combines Cosmos-Reason1 (an 8.2 billion parameter vision-language model pretrained to describe actions) with a 2.3 billion parameter diffusion transformer that generates trajectory data. Given video, previous movement, and optional verbal commands, the system produces reasoning that explains its intended actions, then uses that reasoning along with visual embeddings to plan the actual trajectory.

What makes this approach interesting is how the training enforces alignment between reasoning and actions. The system isn't just rewarded for good outcomes — it's rewarded for reasoning that matches ground-truth reasoning, for reasoning that aligns with subsequent actions according to simple rules, and for actions that align with the reasoning. This creates interpretability that matters for debugging and safety certification.

In 75 simulated scenarios, the reasoning model had "close encounters" with other vehicles 11% of the time versus 17% for the non-reasoning version. That's a 35% relative reduction in dangerous situations. The 99 millisecond latency on Nvidia's RTX Pro 6000 is fast enough for real-time use, though the compute requirements are substantial.

For engineers working on robotics or autonomous systems, this validates reasoning as a useful architectural pattern beyond language tasks. The ability to review an autonomous system's explicit reasoning — "I'm slowing down because I see lanes merging ahead" — changes how you debug failures and iterate on behavior. Whether the reasoning is "real understanding" matters less than whether it provides actionable insight into why the system did what it did.

**Key takeaways:**
- Alpamayo-R1 uses chain-of-thought reasoning to improve autonomous driving decisions
- 35% reduction in close encounters compared to non-reasoning versions in simulation
- System produces both explicit reasoning text and trajectory predictions at 99ms latency
- Training enforces alignment between stated reasoning and actual actions for interpretability

**Tradeoffs:**
- Explicit reasoning improves interpretability and debugging but adds computational overhead
- Vision-language architectures provide rich understanding but require massive compute resources

**Link:** [Alpamayo-R1 on Hugging Face](https://huggingface.co/)

---

## Apple's Siri Will Run on Google Gemini

**TLDR:** Apple has signed a multi-year deal worth $1 billion annually to use Google's Gemini models as the foundation for Siri and other AI features. The partnership signals Apple's retreat from building proprietary foundation models.

In a move that would have seemed unthinkable a few years ago, Apple is outsourcing the brains of Siri to its biggest mobile competitor. A multi-year deal gives Apple access to a specially modified 1.2 trillion parameter Gemini model for on-device AI, with an even more capable version coming later that may run on Google's servers.

The updates are substantial. By spring 2026, Siri will analyze onscreen images and provide output based on user data. Later this year, a voice-and-text chatbot will search the web, generate media, analyze files, and interact with email, music, photos, and other apps. The system will use device screen images and interaction history as context, enabling multi-step agentic actions like finding a photo, editing it, and emailing it to a contact.

What's remarkable is how this deal reflects Apple's recognition that it lost the foundation model race. Despite building internal frameworks and developing "Apple GPT" for internal use, Siri fell behind competitors. A planned major update was delayed last year because it didn't meet quality standards. Rather than continue throwing resources at catching up, Apple made a pragmatic business decision.

The financial terms are interesting. Apple pays $1 billion annually to Google — compare this to the $20 billion Google pays Apple annually to be the default search engine on iPhones. Apple gets cutting-edge AI capabilities without the multi-billion dollar R&D investment. Google gets revenue and broader distribution for Gemini. OpenAI, despite CEO Sam Altman hoping to become Apple's AI partner and displace Google, made a "conscious decision" to focus on its own hardware initiative (led by former iPhone designer Jony Ive) instead.

For architecture teams, this is a case study in build-versus-buy at the highest level. Apple, with nearly unlimited resources, concluded that building foundation models in-house wasn't worth the investment given how fast the field is moving. They'll control fine-tuning, user interfaces, and data handling, but the underlying model capability comes from Google. This division of labor — infrastructure from specialists, experience from integrators — may become the dominant pattern.

**Key takeaways:**
- Apple will pay Google $1 billion annually for Gemini-based AI features
- Siri updates starting spring 2026 will include multi-step agentic capabilities
- Apple retains control over fine-tuning, UI, and data handling while Google provides foundation models
- OpenAI declined to pursue Apple partnership to focus on its own hardware initiative

**Tradeoffs:**
- Outsourcing foundation models enables competitive features quickly but creates dependency on a competitor
- On-device AI preserves privacy but limits capability compared to cloud-based processing

**Link:** [Apple and Google Joint Announcement](https://www.apple.com/)

---

## FlashWorld: High-Quality 3D Scenes in 9 Seconds

**TLDR:** FlashWorld generates detailed 3D scenes from text or images in 9 seconds — roughly 500x faster than previous state-of-the-art methods — by combining 2D image generation quality with 3D consistency enforcement in a single model.

Generating 3D scenes from text or images has traditionally been painfully slow. State-of-the-art methods like CAT3D take over an hour. FlashWorld, from researchers at Xiamen University, Tencent, and Fudan University, does it in 9 seconds on a single H20 GPU. The output quality is competitive or better, with finer details like grass blades and animal fur that other methods blur.

The key insight is combining two previously separate approaches. "2D-first" methods generate multiple 2D views and construct 3D from them — detailed but often inconsistent. "3D-direct" methods generate 3D representations directly — consistent but lacking detail. FlashWorld does both simultaneously, using a pretrained video diffusion model as a teacher to guide a system that produces both high-quality images and 3D Gaussian splats (colored, semi-transparent ellipsoids representing the scene).

The training is clever. The system learns to match both the teacher model's multi-step refinement in a single step and to fool a discriminator that tries to distinguish generated images from real ones. A third loss term encourages consistency between the image decoder and rendered views from the 3D decoder. The result is fast generation that maintains both detail and coherence.

On WorldScore, a benchmark measuring prompt adherence and visual consistency across views, FlashWorld scores 68.72 compared to 66.43 for WonderWorld and 66.32 for LucidDreamer. The limitations are real — fine-grained geometry struggles, mirror reflections don't work well — but the speed improvement is dramatic enough to change what's possible.

For teams working on 3D content, gaming, or virtual reality, this points toward runtime generation rather than pre-production pipelines. If 3D scene generation becomes fast enough, environments could be created dynamically based on narrative or user interaction rather than pre-authored. The code is available under Apache 2.0 for both commercial and non-commercial use.

**Key takeaways:**
- FlashWorld generates 3D scenes in 9 seconds vs 5-77 minutes for comparable methods
- Combines 2D image quality with 3D consistency through dual-decoder architecture
- Outperforms state-of-the-art on WorldScore benchmark (68.72 vs 66.43)
- Code and models available under permissive Apache 2.0 license

**Tradeoffs:**
- Unified 2D/3D approach achieves both quality and consistency but increases model complexity
- Speed enables real-time applications but sacrifices some fine-grained geometric accuracy

**Link:** [FlashWorld on GitHub](https://github.com/)

---

*This article summarizes content from The Batch newsletter by DeepLearning.AI. The interpretations and commentary are editorial additions to the original reporting.*
