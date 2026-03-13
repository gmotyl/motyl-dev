---
title: "AI Goes Mobile, Data Centers Break Free, and Diffusion Learning Gets Lightning Fast"
excerpt: "Global AI app revenue triples to $5B as mobile dominates adoption, tech giants build private power grids for insatiable AI demands, and Apple's FAE trains diffusion models 7x faster."
publishedAt: "2026-03-13"
slug: "ai-mobile-skyrockets-data-centers-off-grid-apple-diffusion-fae"
hashtags: "#thebatch #ai #mobile #infrastructure #ml #apple #openai #meta #energy #diffusion #generated #en"
---

## GPT-5.4's Higher Performance, Higher Price

**TLDR:** OpenAI released GPT-5.4 in Thinking and Pro variants just two days after GPT-5.3, bringing an expanded context window and mixture-of-experts architecture. The Pro tier costs $30 per million input tokens and $180 per million output tokens.

**Summary:**

OpenAI's cadence is accelerating to the point where it is hard to keep up. GPT-5.4 dropped just 48 hours after GPT-5.3, and the focus is clearly on pushing the absolute performance ceiling regardless of cost. The Pro variant, priced at $30 for input and $180 for output per million tokens, nearly matched Gemini 3.1 Pro Preview on the Intelligence Index with a score of 57 versus 57.2. That performance comes at a dramatically different price point: $2,950 versus $892 for equivalent processing. GPT-5.4 outperformed Claude Opus 4.6 and topped both the coding and agentic benchmark indices, which is where OpenAI is positioning this model.

The mixture-of-experts transformer architecture means you are paying for routing intelligence as well as raw parameter count. The expanded context window is useful, but the real story here is the pricing signal. OpenAI is betting that there is a tier of customers for whom performance matters more than cost optimization, and they are willing to charge accordingly. For teams evaluating this, the question is simple: does the marginal gain over cheaper alternatives justify the 3x cost difference on your specific workloads?

**Key takeaways:**
- GPT-5.4 Pro costs $30/$180 per million input/output tokens, roughly 3x more expensive than Gemini 3.1 Pro Preview for similar intelligence scores
- Released only 2 days after GPT-5.3, signaling OpenAI's accelerated release cadence
- Topped coding and agentic benchmarks, reinforcing OpenAI's positioning as the developer-focused frontier model provider

**Link:** [GPT-5.4's Higher Performance, Higher Price](https://www.deeplearning.ai/the-batch/gpt-5-4s-higher-performance-higher-price/)

## AI on Mobile Skyrockets

**TLDR:** The State of Mobile 2026 report reveals that global AI app revenue tripled to over $5 billion, downloads doubled to 3.8 billion, and users spent 48 billion hours in AI apps, representing a roughly 3.6x increase over 2024 and 10x over 2023.

**Summary:**

The mobile AI explosion is here, and the numbers are staggering. According to Sensor Tower's State of Mobile 2026 report, global revenue from AI apps has tripled to exceed $5 billion, while downloads doubled to surpass 3.8 billion. Users collectively spent 48 billion hours inside AI applications, which is approximately 3.6 times the 2024 figure and roughly 10 times the 2023 number. The growth trajectory is not linear; it is exponential, and mobile is clearly the battleground where AI adoption is being won or lost.

ChatGPT dominates the download rankings, followed by Gemini, DeepSeek, ByteDance's Doubao, and Perplexity. OpenAI and DeepSeek together accounted for roughly half of all global AI app downloads, which speaks to the concentration of mindshare around just a few brands despite the proliferation of AI tools. The fact that around 110 million U.S. chatbot users now access AI exclusively through mobile apps, up from just 13 million in early 2024, is a profound shift. These users are not supplementing desktop workflows with mobile access; they are mobile-native AI users from the start.

Perhaps the most telling signal is that non-game app revenue exceeded gaming revenue for the first time. Gaming has been the revenue king of mobile app ecosystems since the iPhone launched, and the fact that AI apps have crossed that threshold suggests we are seeing a genuine category shift, not just a hype cycle. People are paying for AI tools on mobile at scale, and they are using them for hours every day.

What is missing from this rosy narrative is any discussion of retention and churn. Downloads and revenue are lagging indicators. The critical question is whether users who download ChatGPT or Gemini are still actively using it three months later, or whether we are seeing a pattern of experimentation followed by abandonment. The data does not break out monthly active users or cohort retention curves, which would tell a much more honest story about whether this growth is sustainable or speculative.

For product teams and architects, the strategic takeaway is clear: if your AI product does not have a mobile-first experience, you are missing the majority of the market. Desktop-centric AI tools are increasingly niche. The 48 billion hours of mobile usage also suggests that context switching between apps is becoming the norm. Users are not staying inside a single AI assistant; they are bouncing between tools depending on the task. This creates both a retention challenge and an interoperability opportunity.

**Key takeaways:**
- AI app revenue tripled to over $5 billion globally, with downloads doubling to 3.8 billion
- Users spent 48 billion hours in AI apps, roughly 3.6x the 2024 figure and 10x the 2023 number
- OpenAI and DeepSeek combined for approximately 50% of global AI app downloads
- 110 million U.S. users access chatbots exclusively via mobile, up from 13 million in early 2024
- Non-game app revenue surpassed gaming revenue for the first time, signaling a fundamental category shift in mobile ecosystems

**Tradeoffs:**
- Mobile-first AI tools gain massive reach and usage hours but face higher churn and retention challenges compared to desktop productivity integrations
- Concentration around a few dominant apps simplifies user acquisition but makes differentiation harder for new entrants

**Link:** [AI on Mobile Skyrockets](https://www.deeplearning.ai/the-batch/ai-on-mobile-skyrockets/)

## AI Data Centers Go Off the Grid

**TLDR:** Meta, OpenAI, and other tech giants are building private power plants independent of regional electrical grids to fuel AI data centers. A Cleanview study found 46 off-grid projects accounting for 30% of all planned U.S. data center capacity, with 90% announced in 2025 and equipment being "almost entirely gas-fired" despite public emphasis on renewables.

**Summary:**

The AI infrastructure story is taking a darker, more pragmatic turn. Meta, OpenAI, and other hyperscalers are not just building data centers; they are building private power plants that operate independently of regional electrical grids. According to a Cleanview study, 46 off-grid power projects have been announced, with 90% of them coming in 2025 alone. These projects represent 30% of all planned U.S. data center capacity, which is a staggering concentration of new energy infrastructure tied directly to AI workloads.

Meta's "Project Socrates" in Ohio is building gas-fired plants capable of delivering 400 megawatts to support a 1-gigawatt data center. In Texas, Meta is deploying over 800 small gas generators in a distributed configuration. OpenAI and Oracle's "Jupiter" project in New Mexico, part of the larger Stargate initiative, is also powered by natural gas. In Wyoming, a project is using modified jet engines supplied by Boom Supersonic, a company partly owned by Sam Altman, which is an interesting vertical integration play. xAI famously built an off-grid facility in Memphis despite an EPA ruling that such facilities were illegal, which tells you how aggressively these companies are willing to push regulatory boundaries when the stakes are high enough.

The gap between public messaging and operational reality is stark. While companies emphasize their commitments to renewable energy and carbon neutrality, the equipment actually being installed is "almost entirely gas-fired," according to the Cleanview report. Meta is pursuing nuclear power for the early 2030s with plans for over 6 gigawatts of capacity, but that is years away, and the immediate need is being met with fossil fuels. The projected AI electricity demand is $5.2 trillion and 156 gigawatts by 2030, which is roughly equivalent to adding the entire electrical consumption of a mid-sized developed country just to power machine learning workloads.

The economic and environmental implications are profound. Electricity prices are rising at more than double the rate of inflation, which is a direct consequence of this infrastructure buildout straining existing grids and driving companies to go off-grid entirely. For regions hosting these facilities, the promise of jobs and tax revenue is real, but so is the environmental cost. The narrative that AI will help solve climate change rings hollow when the infrastructure required to train and run these models is being built on natural gas and jet fuel.

For engineering teams and architects, the subtext here is that energy is becoming a first-order constraint in AI development. If your organization is planning to train or deploy large models, the cost and availability of power is something you need to factor into infrastructure planning at the same level as compute and memory. The era of assuming abundant, cheap, clean energy for AI workloads is over. The companies with the deepest pockets are locking in private energy sources, which creates a structural moat that smaller organizations cannot replicate.

What the newsletter does not discuss, and what deserves scrutiny, is the regulatory capture at play. When a company can build an off-grid power plant that the EPA has ruled illegal and face no meaningful consequences, that signals a breakdown in governance. The same lobbying muscle that is shaping AI regulation is being applied to energy and environmental policy, and the results are playing out in real time.

**Key takeaways:**
- 46 off-grid power projects announced, 90% in 2025, accounting for 30% of all planned U.S. data center capacity
- Meta building 400MW gas-fired plants in Ohio for 1GW data center, 800+ small generators in Texas
- OpenAI/Oracle "Jupiter" in New Mexico and Wyoming jet-engine project both rely on natural gas
- Equipment being installed is "almost entirely gas-fired" despite public commitments to renewables
- AI electricity demand projected at $5.2T and 156GW by 2030
- Electricity prices rising at more than double the rate of inflation

**Tradeoffs:**
- Off-grid power plants provide independence from regional grid constraints but lock in fossil fuel dependency for the next decade
- Vertical integration of energy and compute infrastructure creates competitive moats for hyperscalers but raises environmental and regulatory concerns

**Link:** [AI Data Centers Go Off the Grid](https://www.deeplearning.ai/the-batch/ai-data-centers-go-off-the-grid/)

## Lightning-Fast Diffusion Learning

**TLDR:** Apple researchers proposed Feature Auto-Encoder (FAE), a diffusion image generator that learns to reconstruct embeddings from DINOv2. By shrinking embeddings before reconstructing them, FAE trains roughly 7x faster than prior approaches while achieving better image quality.

**Summary:**

Apple's research team has published a genuinely clever approach to speeding up diffusion model training. The Feature Auto-Encoder, or FAE, learns to reconstruct embeddings from DINOv2, a widely used vision foundation model, rather than reconstructing raw pixels. The key innovation is deceptively simple: shrinking the DINOv2 embeddings before trying to reconstruct them dramatically accelerates training. The architecture uses a small encoder with a single attention layer to compress the embeddings, a SiT denoising transformer to process them, and decoders that expand the compressed representations back out and produce the final images.

On ImageNet, FAE with 675 million parameters achieved a Frechet Inception Distance of 1.29 after 800 epochs, compared to the previous state-of-the-art RAE at 1.41 FID. More importantly, FAE reached RAE's quality level roughly 7 times faster, which is the kind of efficiency gain that changes the economics of model development. On text-to-image generation using the CC12M dataset, FAE with 1.1 billion parameters achieved 6.9 FID on MS COCO, matching the performance of Re-Imagen, which has 3.2 billion parameters and was trained on approximately 4 times more data.

The underlying insight is that not all information in a high-dimensional embedding is equally useful for reconstruction. By learning to compress embeddings intelligently before denoising them, FAE focuses computational effort where it matters most. This is conceptually similar to how mixture-of-experts architectures route only relevant parameters for each input, but applied to the embedding space rather than the model parameters themselves.

For teams building or fine-tuning diffusion models, this approach offers a concrete path to reducing training time and cost without sacrificing quality. The fact that a 1.1 billion-parameter model can match a 3.2 billion-parameter model trained on 4x more data suggests that the bottleneck in diffusion training is not just parameter count or data volume, but how efficiently the model learns to represent the underlying signal.

What is missing from the paper, and what would be valuable for practitioners, is a clear breakdown of the compute cost savings in absolute terms. Saying "7x faster" is meaningful, but knowing whether that translates to training in days instead of weeks or hours instead of days would help teams assess whether this technique is worth integrating into their pipelines. The other unanswered question is how well this approach generalizes beyond natural images to other modalities like medical imaging, satellite imagery, or scientific visualization, where the embedding space characteristics might differ significantly.

**Key takeaways:**
- FAE achieves 1.29 FID on ImageNet with 675M parameters, beating RAE's 1.41 FID
- Reaches equivalent quality roughly 7x faster than prior state-of-the-art approaches
- On text-to-image, FAE (1.1B params) matches Re-Imagen (3.2B params) trained on 4x more data
- Key innovation is shrinking embeddings before denoising, focusing compute where it matters most
- Compression-then-denoise pattern is broadly applicable to other diffusion training pipelines

**Tradeoffs:**
- Embedding compression speeds up training dramatically but introduces an additional architectural component to tune and maintain
- Smaller model size with equivalent performance reduces deployment cost but may sacrifice some edge-case quality in domains with very high diversity

**Link:** [Lightning-Fast Diffusion Learning](https://www.deeplearning.ai/the-batch/lightning-fast-diffusion-learning/)

## Editorial: Stack Overflow for AI Coding Agents

**TLDR:** Andrew Ng discusses the vision for a Stack Overflow-like platform designed specifically for AI coding agents, referencing Context Hub (a CLI tool with over 5,000 GitHub stars that provides API documentation to agents) and Moltbook, a Reddit-like social network for agents acquired by Meta.

**Summary:**

Andrew Ng is thinking ahead to infrastructure for AI agents, not just AI models. The vision he outlines is a Stack Overflow equivalent where AI coding agents contribute and consume documentation, much like human developers do today. He references Context Hub, known as "chub," a command-line tool that has already garnered over 5,000 GitHub stars by providing API documentation in formats optimized for coding agents. The idea is that agents should not just passively consume documentation; they should contribute feedback, report issues, and improve the knowledge base for other agents.

This is an interesting evolution of the collaborative development model. Stack Overflow works because it aligns individual incentives — reputation, recognition — with collective benefit in the form of high-quality answers. Designing a similar system for agents raises fascinating questions. What is the incentive structure for an agent to contribute? How do you establish trust and quality control when the contributors are not human? How do you prevent spam, gaming, or adversarial contributions in a system where participants have no intrinsic motivation beyond their programmed objectives?

Ng also mentions Moltbook, a Reddit-like social network for agents that Meta acquired. The concept of agents having a social network is both compelling and slightly dystopian. If agents are learning from each other's experiences and recommendations, they are collectively building a shared intelligence that no single organization controls. That could accelerate capability development dramatically, but it also introduces risks around echo chambers, misinformation propagation, and emergent behaviors that are difficult to predict or audit.

For engineering leaders, the practical implication is that the tools and platforms agents use will become as important as the agents themselves. Just as developer productivity is shaped by the quality of documentation, IDEs, and collaboration platforms, agent productivity will be shaped by the infrastructure we build for them. Investing early in agent-friendly tooling, standards, and platforms could provide significant leverage as agents become more prevalent in software development workflows.

What the editorial does not address is the governance question. Who decides what counts as good documentation for agents? Who moderates disputes or enforces quality standards? If these platforms are operated by companies like Meta, how do we ensure they remain open and neutral rather than becoming walled gardens that favor certain agents or providers?

**Key takeaways:**
- Context Hub ("chub") provides API documentation optimized for coding agents and has over 5,000 GitHub stars
- Vision includes agents contributing documentation feedback, not just consuming it
- Moltbook, a Reddit-like social network for agents, was acquired by Meta
- Agent-focused infrastructure and platforms will become as critical as the agents themselves

**Link:** [Editorial: Issue 295](https://www.deeplearning.ai/the-batch/issue-295/)