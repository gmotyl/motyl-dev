---
title: "Drone Strikes on Data Centers, Qwen3.5 Punches Above Its Weight, DeepSeek Goes Huawei, and Apple Unifies Visual Tokenization"
excerpt: "AI-enabled warfare targets cloud infrastructure in the Persian Gulf, Alibaba ships vision-language models that embarrass rivals ten times their size, DeepSeek freezes out Nvidia before its V4 launch, and Apple builds one tokenizer to rule images, video, and 3D."
publishedAt: "2026-03-20"
slug: "drone-strikes-data-centers-qwen35-deepseek-huawei-apple-atoken"
hashtags: "#the-batch #ai #ml #llm #qwen #deepseek #apple #multimodal #vision #geopolitics #infrastructure #generated #en"
---

## Drones Hit Persian Gulf Data Centers

**TLDR:** Iranian drones struck at least three Amazon Web Services data centers in Bahrain and the UAE, disrupting banking, payments, and business software across the region. The attacks mark the first known military strikes against cloud infrastructure and put trillions of dollars of AI data center investments at risk.

**Summary:**

Let me set the stage here because this is a genuinely unprecedented event. Early on March 1st, Iranian drones hit two AWS data centers in the United Arab Emirates and one in Bahrain, causing structural damage, power disruptions, and water damage from firefighting. Services went down or experienced elevated error rates. Amazon recommended its cloud customers back up their data and move workloads out of the Middle East region entirely, shifting to the US, Europe, or Asia Pacific. Iran stated through its state-controlled Fars News Agency that it targeted these facilities "to identify the role of these centers in supporting the enemy's military and intelligence activities." That statement alone should tell you something about where we are headed with the intersection of cloud computing and military operations.

The broader context is what makes this story land hard. The Persian Gulf region hosts about 2 gigawatts of data center capacity with another 0.4 gigawatts planned, and Amazon, Google, OpenAI, Microsoft, and xAI have each announced multibillion-dollar commitments there. Those investments just got significantly riskier. Meanwhile, the US military runs the unclassified version of Anthropic's Claude through AWS, and Claude is integrated with Palantir's Maven Smart System for targeting and logistics. In exercises, that system reduced targeting timelines from 12 hours to under a minute and achieved with 20 staff what previously required 2,000. It played a role in over 1,000 target selections during the initial 24 hours of the US-Israel war on Iran.

Here is the part that should trouble everyone regardless of where they sit on the political spectrum. As AI accelerates the pace of military decision-making, it also accelerates the pace of mistakes. During the initial wave of air strikes on Iran, a bomb destroyed a school, killing more than 170 people, mostly children. Preliminary findings indicate US forces likely dropped the bomb, and out-of-date target data may have been a contributing factor, since the school was part of a nearby naval base roughly 15 years ago. The newsletter correctly notes that AI-generated recommendations do not remove the need to verify intelligence, question assumptions, and weigh moral consequences. But what nobody is saying clearly enough is that a system designed to compress 12 hours of human deliberation into less than one minute is a system designed to reduce deliberation time. That is the whole point. You cannot simultaneously celebrate the speed and then act surprised when the speed produces catastrophic errors.

What is also missing from this analysis is the second-order effect on the cloud industry. Every enterprise customer running production workloads in the Gulf region just watched their "availability zone" get redefined from "redundant power and cooling" to "within drone range of an active military conflict." That changes the risk calculus for every CTO making infrastructure decisions in the region.

**Key takeaways:**
- Iranian drone strikes on three AWS data centers in Bahrain and the UAE mark the first known military targeting of cloud infrastructure
- Amazon recommended customers move workloads out of the Middle East, putting trillions in regional AI investment at risk
- Claude, integrated with Palantir's Maven Smart System, compressed targeting operations from 12 hours to under one minute and reduced staffing from 2,000 to 20
- A school bombing killing 170+ people, mostly children, was likely caused by out-of-date target data, illustrating the lethal risk of accelerated AI-driven decision-making
- Gulf Cooperation Council nations host 2.0 gigawatts of data center capacity with 0.4 gigawatts more planned

**Why do I care:** If you build software that runs in the cloud, this story is directly relevant to your infrastructure planning. Multi-region redundancy just stopped being an optimization conversation and became a risk-of-military-strike conversation. Any team with production workloads in the Gulf or considering expansion there needs to revisit their disaster recovery architecture immediately. Beyond infrastructure, the integration of AI into targeting systems raises questions that every developer building AI-powered tools should be thinking about: the systems we build do not exist in a vacuum, and the line between "software tool" and "weapon system" is thinner than most of us would like to admit.

**Link:** [Drones Hit Persian Gulf Data Centers](https://www.deeplearning.ai/the-batch/drones-hit-persian-gulf-data-centers/)

## Qwen3.5 Outperforms Bigger Models, Leads Vision Benchmarks

**TLDR:** Alibaba released the Qwen3.5 family of eight open-weights vision-language models, with the 9-billion parameter version outperforming OpenAI's 120-billion parameter gpt-oss-120b on most language benchmarks. The largest model, Qwen3.5-397B, beats GPT-5.2, Claude 4.5 Opus, and Gemini-3 Pro on 28 of 44 vision benchmarks.

**Summary:**

This is one of those releases where the headline numbers genuinely do not seem plausible until you look at the benchmarks. Alibaba shipped eight models in the Qwen3.5 family, ranging from 0.8 billion to 397 billion parameters, and the performance-per-parameter ratios are extraordinary. The family includes open-weights models and hosted versions with agentic capabilities like built-in tool use, web search, and chain-of-thought reasoning across more than 200 natural languages. The models accept text, image, and video input with context windows up to 1 million tokens and can produce up to 64,000 output tokens.

The standout performer is Qwen3.5-9B. This is a 9-billion parameter model that outperforms OpenAI's gpt-oss-120b, a model more than 10 times its size, on most language benchmarks tested, with the exception of reasoning and coding tasks. Similarly, Qwen3.5-4B beats OpenAI's gpt-oss-20b on most language benchmarks. On vision tasks, both the 9B and 4B models outperform GPT-5-nano and Gemini-2.5-Flash-Lite. At the top end, Qwen3.5-397B-A17B, a mixture-of-experts model that activates only 17 billion parameters per token, outperformed GPT-5.2, Claude 4.5 Opus, and Gemini-3 Pro on 28 of 44 vision benchmarks. On language tasks, the largest model beat individual frontier models on specific benchmarks but did not consistently dominate all three.

The architecture is built on Qwen3-Next, a modified version of the Qwen3 training approach designed for greater efficiency and stability. It uses a mixture-of-experts or dense transformer architecture with mixed attention and Gated DeltaNet layers, plus an unspecified vision encoder. Alibaba shared remarkably little about training data and methods, which is becoming a frustrating pattern across the industry. We are told it was trained on a "significantly larger scale of visual-text tokens" than Qwen3, but that is about all we get. The practical implication is that the 9B model is small enough to run on consumer laptops while delivering performance that previously required an 80-gigabyte GPU like the Nvidia H100.

There is also some organizational drama worth noting. Shortly after the Qwen3 rollout, Lin Junyang, the team's technical lead and a key architect of the models, resigned with a one-line X post reading "Bye my beloved qwen." Four other team members reportedly resigned in his wake. In January, Lin had said publicly that the team was "stretched thin, just meeting delivery demands consumes most of our resources." Alibaba responded by putting the Qwen project under tighter supervision by senior leadership. What nobody is asking here is whether the departures are correlated with the team's extraordinary output or despite it. Burnout at the pace of frontier model development is a systemic problem that every AI lab is experiencing, and losing your lead architect mid-cycle is not a minor organizational blip.

**Key takeaways:**
- Qwen3.5-9B outperforms OpenAI's gpt-oss-120b on most language benchmarks despite being over 10x smaller
- Qwen3.5-397B-A17B beats GPT-5.2, Claude 4.5 Opus, and Gemini-3 Pro on 28 of 44 vision benchmarks
- All models are released under Apache 2.0 with API pricing from $0.01 to $3.60 per million tokens
- The 9B model runs on consumer laptops, making frontier-class vision-language performance accessible without enterprise GPU hardware
- The team lost its lead architect and four engineers to resignations, reportedly due to unsustainable workload pressure

**Why do I care:** If you are building applications that need vision-language capabilities, the Qwen3.5-9B is a game changer for local inference. Running a model this capable on a laptop without cloud API costs or data privacy concerns opens up product categories that were not economically viable six months ago. For frontend developers specifically, think about what local vision-language models mean for accessibility tooling, design-to-code workflows, and real-time visual analysis in browser-adjacent applications. The Apache 2.0 license means you can actually ship this in production without legal anxiety.

**Link:** [Qwen3.5 Outperforms Bigger Models, Leads Vision Benchmarks](https://www.deeplearning.ai/the-batch/qwen3-5-outperforms-bigger-models-leads-vision-benchmarks/)

## DeepSeek Snubs Nvidia for Huawei

**TLDR:** DeepSeek withheld a prerelease version of its upcoming V4 flagship model from Nvidia and AMD, instead sharing it exclusively with Huawei for hardware optimization. The move signals an accelerating decoupling of the US and Chinese AI ecosystems.

**Summary:**

DeepSeek, the Chinese developer behind some of the most impressive open-weights models in the world, has made a pointed decision: it gave Huawei several weeks of early access to optimize DeepSeek-V4 for Huawei's chips, while not giving Nvidia or AMD the same opportunity. This is a departure from standard industry practice, where chip makers typically receive prerelease models to ensure efficient inference on their hardware. DeepSeek previously worked closely with Nvidia to train earlier models, making this shift all the more conspicuous.

The geopolitical context here is thick. An unnamed senior Trump administration official claimed DeepSeek-V4 was trained in China using Nvidia's most advanced chips despite US export controls, although the official did not explain how they obtained this information. Separately, the chairman of the US House Select Committee on China stated that Nvidia provided "extensive technical assistance" to DeepSeek when it trained DeepSeek-V3, achieving "major training efficiency gains." After progressively tightening restrictions since 2022, the US government began permitting exports of top-of-the-line AI chips on a case-by-case basis in January, subject to a 25 percent surcharge, while officials consider new export limits. China's government, for its part, has mandated security reviews of Nvidia's H20 chip and asked Chinese AI companies to buy foreign chips only when necessary.

The newsletter frames this as "more symbolic than significant," but I think that understates the situation. Yes, DeepSeek could still release V4 binaries that Nvidia can optimize after the fact. But the signal matters enormously. DeepSeek is the organization that proved you could train frontier-class models at a fraction of the assumed cost, and it just chose to give Huawei a head start over the company that dominates the global GPU market. That is a deliberate statement about where DeepSeek sees the future of its hardware partnerships. The US export control strategy of restricting chip access to slow China's AI progress has backfired by accelerating China's domestic chip industry. Chinese chips do not yet rival Nvidia's best, but "not yet" is doing a lot of work in that sentence given how quickly the gap has been closing.

What the analysis does not adequately explore is the downstream impact on the open-source and open-weights ecosystem. DeepSeek's models are used globally. If V4 runs meaningfully better on Huawei hardware than on Nvidia hardware at launch, that creates an awkward dynamic for Western developers and companies who rely on DeepSeek models but run exclusively on Nvidia infrastructure. The world benefits more from negotiated limits, mutual cooperation, and free exchange of ideas, but that is not the world we are currently building.

**Key takeaways:**
- DeepSeek gave Huawei exclusive early access to DeepSeek-V4 for hardware optimization, departing from its previous close collaboration with Nvidia
- A Trump administration official claims V4 was trained on Nvidia's most advanced chips despite US export controls
- US export restrictions have backfired by accelerating China's domestic chip development, particularly at Huawei
- China mandated security reviews of Nvidia's H20 chip and encouraged domestic chip purchasing
- The move aligns with China's long-term goal of technological self-sufficiency in critical AI infrastructure

**Why do I care:** The decoupling of US and Chinese AI ecosystems is not some abstract geopolitical story. If you depend on open-weights models for your applications, the hardware optimization choices made by labs like DeepSeek directly affect your inference performance and cost. If DeepSeek-V4 ships with Huawei-first optimization, you will either pay a performance penalty on Nvidia hardware or wait for community-contributed optimizations. Start thinking about hardware-model coupling as a real dependency in your architecture decisions.

**Link:** [DeepSeek Snubs Nvidia for Huawei](https://www.deeplearning.ai/the-batch/deepseek-snubs-nvidia-for-huawei/)

## A Single Tokenizer for Visual Media (Apple's AToken)

**TLDR:** Apple researchers built AToken, a unified visual tokenizer that maps images, videos, and 3D objects into a single shared token space with four-dimensional coordinates. The system approaches specialized model performance across all three media types for both generation and classification tasks.

**Summary:**

This is the kind of foundational research that does not make headlines but quietly reshapes what is possible. Apple's team, led by Jiasen Lu and Liangchen Song, built AToken around a deceptively simple insight: if you map images, videos, and 3D objects into a shared four-dimensional coordinate system using time, height, width, and depth, you can process all of them with a single transformer encoder instead of needing separate tokenizers and encoders for each media type. Images use x and y coordinates with time and depth set to zero. Videos add the time dimension. 3D objects use x, y, and z with time set to zero. One linear layer turns each token into an embedding, and four-dimensional Rotary Position Embeddings encode position along all four axes.

The architecture uses a pretrained SigLIP2 vision encoder extended from two dimensions to four, paired with a decoder of the same size. Training happens in three stages: first images, then videos, and finally 3D objects. The reconstruction pipeline generates RGB pixels for images and videos and Gaussian splats for 3D objects, which are small colored blobs that render together to form coherent shapes. The model learns through four loss functions that together preserve both fine visual details and semantic understanding. It also aligns visual embeddings with text descriptions using contrastive loss, which increases similarity between matching visual-text pairs while decreasing it for mismatched ones.

The results are remarkably strong for a generalist system. AToken reached 82.2 percent ImageNet classification accuracy, close to the standalone SigLIP2 encoder at 83.4 percent. On image reconstruction quality, it achieved 0.21 rFID, outperforming previous unified tokenizers like UniTok and approaching specialized models like FLUX.1 dev at 0.18 rFID. For video reconstruction, it outperformed specialized models like Wan2.2 and HunyuanVideo on quality metrics while slightly underperforming on pixel-level similarity. For 3D reconstruction, it exceeded the specialized Trellis-SLAT tokenizer. Video classification remains its weakest area, finding the correct video from a text prompt 40.2 percent of the time compared to VideoPrism-g at 52.7 percent, but that is a specialized video-focused encoder built specifically for that task.

The real significance here is the same principle that made large language models so powerful: a single tokenizer for all language inputs, whether code, dialogue, or tables, allows knowledge transfer between domains during training. Getting better at text means getting better at code. AToken offers the same generality for vision. Improvements from one modality carry over to others. The team notes this could prove particularly valuable for generating synthetic 3D and video data for robotics applications, where high-quality labeled data is scarce compared to the abundance of two-dimensional image data. What they do not say but is clearly implied is that this architecture is a stepping stone toward truly unified multimodal foundation models where visual understanding is not bolted on as a separate system but woven into the same representational fabric as language.

**Key takeaways:**
- AToken uses a 4D coordinate system (time, x, y, z) to map images, video, and 3D objects into a single shared token space
- The system approaches specialized model performance across all three media types for both generation and classification
- Image classification reaches 82.2 percent on ImageNet, close to standalone SigLIP2 at 83.4 percent
- 3D reconstruction outperforms the specialized Trellis-SLAT tokenizer (28.28 vs 26.97 PSNR)
- The unified approach enables knowledge transfer across visual modalities, similar to how unified language tokenizers improved LLMs

**Why do I care:** If you work anywhere near the visual web, pay attention to this. Unified visual tokenization means future foundation models will not treat images, videos, and 3D as separate problems requiring separate pipelines. For frontend developers, this has direct implications for component libraries, media processing workflows, and generative UI tooling. A single model that understands all visual media types at once simplifies integration architectures dramatically. The 3D angle is especially relevant as spatial computing and WebXR move from novelty to real product surface area.

**Link:** [A Single Tokenizer for Visual Media](https://www.deeplearning.ai/the-batch/a-single-tokenizer-for-visual-media/)