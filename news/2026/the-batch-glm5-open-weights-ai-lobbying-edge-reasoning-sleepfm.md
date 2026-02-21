---
title: "The New Open-Weights Leader, AI Lobbying, On-Device Reasoning, and Sleep-Based Disease Prediction"
excerpt: "GLM-5 takes the open-weights crown, Big Tech spends over $100M on lobbying, Liquid AI squeezes reasoning into 900MB, and SleepFM predicts illness years before symptoms appear."
publishedAt: "2026-02-20"
slug: "the-batch-glm5-open-weights-ai-lobbying-edge-reasoning-sleepfm"
hashtags: "#the-batch #ai #ml #llm #open-source #architecture #performance #agents #generated #en"
---

## GLM-5 Scales Up

**TLDR:** Z.ai released GLM-5, a 744 billion-parameter mixture-of-experts model that now leads the open-weights leaderboard on Artificial Analysis' Intelligence Index. It nearly matches proprietary models like Claude Opus 4.6 and GPT-5.2 while remaining open under an MIT license.

**Summary:**

Z.ai, the company formerly known as Zhipu AI, has more than doubled the size of its flagship model to deliver GLM-5, which now sits at the top of the open-weights rankings. The model is a mixture-of-experts transformer with 744 billion total parameters but only 40 billion active per token, which keeps inference costs manageable. It supports up to 200,000 input tokens and 128,000 output tokens, and it is specifically designed for long-running agentic tasks. The model is available through a free web interface, on Hugging Face under the MIT license, and via API at a dollar per million input tokens.

The training story is notable. Z.ai pretrained GLM-5 on 28.5 trillion tokens, up from 23 trillion for the previous generation. For post-training, they used an open-source reinforcement learning framework called slime, which decouples data generation from the training loop itself. This reportedly improved throughput and allowed more reinforcement learning iterations. The model also adopts DeepSeek sparse attention for long contexts, processing only the most relevant portions of long inputs rather than attending to every single token.

On benchmarks, GLM-5 scores 50 on the Artificial Analysis Intelligence Index with reasoning enabled, surpassing the previous open-weights leader Kimi K2.5 at 47, though it still trails Claude Opus 4.6 at 53 and GPT-5.2 at 51. In agentic tasks, GLM-5 achieved 98 percent on the telecom support benchmark and substantially outperformed other open-weights models on Vending Bench 2, a simulated business scenario. On Chatbot Code Arena, GLM-5 at 1449 Elo ranks first among open-weights models and sixth overall.

For architects and engineering teams, the shrinking gap between open-weights and proprietary models means you have increasingly viable options to self-host and customize. An MIT-licensed model that nearly matches the proprietary frontier gives organizations real leverage in negotiations and genuine optionality in deployment strategies. The mixture-of-experts architecture also means you can run this on more modest hardware than a dense model of equivalent intelligence would require.

What the newsletter does not discuss, and what matters enormously, is the question of reproducibility. Z.ai disclosed very few details about the specific architecture, training data composition, and methods. The weights are open, but the recipe is not. This is the ongoing tension in "open-weights" versus truly open-source AI: you get the artifact but not the ability to understand or replicate how it was made. Teams relying on these models should keep that gap in mind.

**Key takeaways:**
- GLM-5 leads open-weights models on multiple benchmarks and nearly matches proprietary frontier models
- The model uses mixture-of-experts with 744B total parameters but only 40B active, keeping inference efficient
- Available under MIT license with free web access and affordable API pricing
- The center of gravity in open-weights AI continues to shift toward Chinese developers, with GLM-5 following a succession of leaders including DeepSeek, Kimi K2, and Qwen3

**Tradeoffs:**
- Open weights under MIT license provide maximum deployment flexibility but sacrifice transparency about training data and methods
- Mixture-of-experts reduces per-token computation but increases total model size and memory requirements for hosting

**Link:** [GLM-5 on Artificial Analysis](https://artificialanalysis.ai/)

---

## Big AI Spends Big on Lobbying

**TLDR:** Top tech and AI companies spent more than $100 million on political lobbying in 2025, with Meta leading at $26.29 million. The spending appears to be paying off through favorable policy outcomes including relaxed chip export bans, limits on state AI regulation, and support for massive infrastructure projects.

**Summary:**

Meta became the single largest corporate spender on political lobbying in any industry last year, pouring $26.29 million into influencing government policy. Amazon followed at $17.89 million, Alphabet at $13.10 million, and Microsoft at $9.36 million. The standout growth came from Nvidia, which increased its lobbying budget sevenfold to $4.9 million, reflecting just how much the regulatory environment matters to the chip business. Collectively, the top tech and AI companies crossed the $100 million lobbying threshold for the first time.

The returns on that investment have been substantial and concrete. The federal government shifted toward tech-friendly policies across multiple fronts. President Trump issued an executive order aimed at limiting the patchwork of state-level AI regulations that companies like Meta, OpenAI, and Andreessen Horowitz had opposed. Nvidia's chip export restrictions to China were first relaxed and then lifted entirely, restoring access to an estimated $50 billion market. OpenAI received White House support for its Stargate data center initiative. Apple secured an exemption from tariffs on Chinese-assembled products before committing $600 billion in domestic manufacturing spending over four years.

The lobbying goes beyond just writing checks. Companies hired individuals with close ties to the Trump administration, had executives attend White House events, and donated to favored presidential projects like the White House ballroom renovation. Meta recruited a former Trump adviser as president and vice chairman. OpenAI hired another former adviser to lead global energy policy. The blending of political access and corporate strategy is thorough and deliberate.

For engineering leaders and architects, this matters because the regulatory landscape directly shapes what you can build and deploy. The push toward federal preemption of state AI laws simplifies compliance but consolidates rule-making power where large companies have the most influence. The infrastructure spending boom driven by these lobbying efforts will increase available compute capacity, but the benefits may flow disproportionately to companies that are already at the table. Smaller organizations and startups should pay attention to how these dynamics might create structural advantages for incumbents.

What the newsletter presents factually but does not challenge enough is the assumption that these outcomes are broadly positive for the developer community. Yes, fewer state regulations reduce compliance headaches. But the absence of meaningful regulation also means there are fewer guardrails, and the companies writing the rules through lobbying are the same ones who benefit from lighter oversight. The transition from technical meritocracy to political arena is a real concern the newsletter rightly flags.

**Key takeaways:**
- Meta led all companies across all industries in lobbying spending at $26.29 million in 2025
- Nvidia's lobbying budget grew 7x to $4.9 million, correlating with the eventual lifting of chip export bans to China
- Federal policies now actively limit state-level AI regulation, simplifying compliance but concentrating power
- The line between corporate lobbying and direct political engagement is increasingly blurred

**Link:** [Bloomberg report on tech lobbying](https://www.bloomberg.com/news/articles/2026-02-19/big-tech-ai-lobbying-spending)

---

## Faster Reasoning at the Edge

**TLDR:** Liquid AI released LFM2.5-1.2B-Thinking, a reasoning model that runs in under 900 megabytes of RAM and generates tokens roughly twice as fast as similarly sized competitors. It matches or beats Qwen3-1.7B on most reasoning benchmarks while requiring significantly less memory.

**Summary:**

The race to put capable AI models on edge devices just got more interesting. Liquid AI released LFM2.5-1.2B-Thinking, a 1.17 billion-parameter model designed to run on phones and small devices. What makes it notable is not raw intelligence but the combination of reasoning ability, speed, and a tiny memory footprint. Running on a Samsung Galaxy S25 Ultra or AMD Ryzen AI Max+ CPU, it generates tokens roughly twice as fast as Qwen3-1.7B while using around 45 percent less memory. The total RAM requirement stays under 900 megabytes, which is a meaningful threshold for mobile applications that need to share resources with other running apps.

The architecture is a hybrid of transformer and convolutional layers. The convolutional layers process only adjacent groups of tokens rather than the entire input sequence, which is where the speed and memory savings come from. The training pipeline is equally thoughtful. The team pretrained on 28 trillion tokens, introduced reasoning data during mid-training rather than waiting for fine-tuning, and then used a creative reinforcement learning approach. They produced 25 specialized versions of the model for different domains and merged them into a single model, restoring any capacity lost during specialization. This merge-after-specialization approach is an interesting alternative to multi-task training.

The results are compelling within its weight class. LFM2.5-1.2B-Thinking matched or outperformed Qwen3-1.7B in thinking mode on benchmarks including GPQA Diamond, IFEval, GSM8K, and MATH-500. It also beat Google Gemma 3 1B, IBM Granite 4.0 1B, and Meta Llama 3.2 1B Instruct across the board. However, there is an important caveat: the model struggles significantly with hallucinations. On Artificial Analysis' AA-Omniscience test, it scored minus 83, behind Qwen3-1.7B at minus 78. Liquid AI themselves recommend using it for agentic tasks, data extraction, and retrieval-augmented generation rather than knowledge-intensive tasks or programming.

For architects designing on-device agent systems, this model fills a specific niche well. An agent that orchestrates tool calls, extracts structured data, or queries local databases needs instruction-following ability and speed more than encyclopedic knowledge, since it will fetch external information anyway. The small memory footprint means you can run this alongside your actual application without starving other processes. The hybrid transformer-convolutional architecture is worth watching as a pattern for edge-optimized models.

The honest limitation here is hallucination. A score of minus 83 on factual accuracy is genuinely poor, and while the recommended use cases sidestep this weakness, any production deployment needs robust guardrails. The model is free for organizations under $10 million annual revenue, which makes it accessible, but commercial licensing above that threshold is something to plan for.

**Key takeaways:**
- Runs in under 900MB RAM, roughly half the memory of comparable models
- Generates tokens twice as fast as Qwen3-1.7B on mobile and desktop CPUs
- Matches or exceeds Qwen3-1.7B on most reasoning benchmarks despite being smaller
- Struggles with hallucinations, making it best suited for agentic and retrieval tasks rather than knowledge-intensive work
- Free for organizations under $10M revenue, with commercial licensing above that

**Tradeoffs:**
- Hybrid transformer-convolutional architecture gains speed and memory efficiency but sacrifices factual recall accuracy
- Model merging from 25 specialized variants recovers breadth of capability but may introduce inconsistencies across domains

**Link:** [Liquid AI LFM2.5-1.2B-Thinking](https://www.liquid.ai/liquid-foundation-models)

---

## Sleep Signals Predict Illness

**TLDR:** SleepFM, developed by researchers at Stanford, Harvard, and several European institutions, can classify over 130 medical conditions from a single night of sleep data, detecting conditions like congestive heart failure and stroke up to six years before symptoms appear.

**Summary:**

This is one of those papers that makes you stop and think about what pattern recognition at scale can actually do. SleepFM is a system that takes recordings from a single night of sleep, including brain activity, heart signals, respiratory data, blood oxygen levels, and leg muscle activity, and classifies more than 130 diseases. The truly remarkable part is the time horizon: it can detect conditions like congestive heart failure and stroke up to six years before a patient shows symptoms. The system was trained on approximately 585,000 hours of sleep-study recordings, a massive dataset combining proprietary clinical data with public sleep research datasets.

The architecture combines three components: a convolutional neural network to encode patterns in each signal type, a transformer to capture relationships across time within those signals, and an LSTM for the final disease classification. Training happened in two stages. First, the CNN and transformer learned together to produce meaningful embeddings of sleep data, trained to recognize that recordings from the same time period should look similar while recordings from different periods should look different. Then the LSTM was added and trained separately on nine-hour sleep sessions along with age and sex to classify over 1,000 diseases.

The results show meaningful improvement over baselines. Across 14 general disease categories, SleepFM achieved higher area-under-the-curve scores than the same system without pretraining and a vanilla neural network trained on demographics alone. For post-traumatic stress disorder classification, SleepFM hit 0.75 AUC compared to 0.64 without pretraining. For predicting atrial fibrillation on the public SHHS dataset, it achieved 0.81 AUC, nearly matching a purpose-built system at 0.82. The weights, training code, and inference code are all available for download, which is excellent for reproducibility.

For teams working at the intersection of AI and healthcare, or anyone building foundation models for time-series data, the two-stage training approach is instructive. The contrastive pretraining on multi-modal time-series data creates generally useful representations that transfer well to downstream classification tasks. This pattern of learning good embeddings first and then specializing is well-established in natural language processing and computer vision, but seeing it work effectively on physiological signals across such a long predictive horizon is powerful validation.

What the paper does not fully address, and what would matter enormously in practice, is the deployment question. Sleep studies are expensive, specialized procedures that most people undergo only when they already have symptoms. The real transformative potential would come from adapting this approach to consumer wearable data, which is noisier and less comprehensive but dramatically more accessible. The gap between clinical sleep polysomnography and what a smartwatch can record is significant, and bridging it would be the true unlock.

**Key takeaways:**
- Classifies over 130 conditions from a single night of sleep data, up to 6 years before symptoms
- Trained on 585,000 hours of sleep study recordings combining proprietary and public data
- Three-stage architecture: CNN for signal encoding, transformer for temporal relationships, LSTM for classification
- Weights and code are publicly available for both commercial and noncommercial use
- Nearly matches purpose-built systems for specific conditions like atrial fibrillation prediction

**Link:** [SleepFM on GitHub](https://github.com/rthapa84/sleepfm-codebase)
