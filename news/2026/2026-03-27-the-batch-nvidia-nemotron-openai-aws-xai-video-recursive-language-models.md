---
title: "Nvidia's Open-Weights Power Play, OpenAI's AWS Marriage, xAI's Budget Video Generator, and Recursive Language Models"
excerpt: "Nvidia drops a 120B open-weights speed demon for agentic tasks, OpenAI parks its agents on AWS, xAI undercuts everyone on video generation, and MIT researchers teach language models to call themselves recursively."
publishedAt: "2026-03-27"
slug: "the-batch-nvidia-nemotron-openai-aws-xai-video-recursive-language-models"
hashtags: "#the-batch #ai #llm #open-source #video-generation #agents #architecture #generated #en"
---

## Nvidia Nemotron 3 Super 120B - Open-Source Speed Demon

**TLDR:** Nvidia released Nemotron 3 Super 120B-A12B, a fully open-weights language model with a hybrid mamba-2/transformer/mixture-of-experts architecture that pushes 442 output tokens per second, making it the fastest open-weights model in its class and a clear play to keep the developer ecosystem locked to Nvidia hardware.

**Summary:**

Nvidia has been telegraphing this move for a while, and now the card is on the table. Nemotron 3 Super 120B-A12B is a large language model purpose-built for agentic applications, and Nvidia is giving away not just the weights but the training data and the recipes too. That last part is important. Most "open" models hand you the artifact and wish you luck. Nvidia is handing you the blueprint. The architecture itself is a fascinating hybrid: mamba-2 layers for efficient sequence processing, transformer layers for attention, and mixture-of-experts routing so that only 12 billion of the 120 billion total parameters are active for any given token. That active-parameter ratio is what makes the speed possible.

And the speed is genuinely impressive. At 442 output tokens per second, this is the fastest open-weights model in its performance class. It leads on PinchBench for agentic tasks, which is exactly the benchmark you care about if you are building systems where language models need to take actions, use tools, and maintain multi-step plans. The model ships pretrained in Nvidia's NVFP4 format, optimized specifically for Blackwell GPUs, and fine-tuned on over 7 million sequences. It is free to download, and Nvidia has committed 26 billion dollars over five years to open-weights model development.

Now here is the part the newsletter flags but does not dig into deeply enough. This generosity is strategic, and understanding the strategy matters more than the benchmarks. Chinese companies are building credible alternatives to Nvidia GPUs. The open-weights investment is Nvidia's moat-building exercise: if the best free models are optimized for Nvidia hardware, developers build on Nvidia hardware, and switching costs compound over time. The NVFP4 format for Blackwell is not just a technical convenience, it is a lock-in mechanism wrapped in a gift. That does not make the model less useful. It means you should understand exactly why it is free before you build your entire agent infrastructure on top of it.

What I would have liked to see discussed more is what happens when you try to run this model on non-Nvidia hardware. The NVFP4 pretrained format is Blackwell-specific. Can you quantize it differently for other accelerators? How much performance do you lose? Those are the questions that determine whether this is truly open or open-with-an-asterisk.

**Key takeaways:**
- 120B total parameters with only 12B active per token via mixture-of-experts routing
- 442 output tokens per second, fastest in its open-weights class
- Fully open: weights, training data, and recipes all available for download
- Pretrained in NVFP4 format optimized for Nvidia Blackwell GPUs
- Part of Nvidia's $26B five-year investment in open-weights models, a strategic counter to Chinese GPU alternatives

**Why do I care:** If you are building agentic systems today, this model deserves serious evaluation. The speed advantage alone matters enormously for multi-step agent workflows where latency compounds with each tool call. But go in with your eyes open about the hardware dependency. Test on your target infrastructure, measure the performance gap on non-Blackwell hardware, and make sure your architecture does not become so Nvidia-specific that you lose optionality down the road.

**Link:** [The Batch - Nvidia Nemotron 3 Super 120B](https://www.deeplearning.ai/the-batch/)

---

## OpenAI Tracks Agent States on AWS

**TLDR:** OpenAI and Amazon announced a stateful runtime environment for AI agents on AWS, giving Amazon exclusive third-party cloud hosting rights for OpenAI's frontier models and further unwinding the once-central Microsoft partnership.

**Summary:**

This announcement is less about technology and more about the tectonic plates of the cloud industry shifting. OpenAI and Amazon have built what they call a "stateful runtime environment" for AI agents on AWS. The system manages agents' working states including memories, tool connections, and permissions, essentially giving agents a persistent home rather than treating each API call as a fresh conversation. Amazon has invested 15 billion dollars in OpenAI with commitments for up to 35 billion more, and AWS becomes the exclusive third-party cloud for OpenAI's frontier models.

The business dynamics here are fascinating and a little uncomfortable. This deal required a legal carve-out from the Microsoft relationship. The distinction is that Microsoft retains exclusivity over stateless API access, while the new Amazon deal covers stateful runtime environments. That is the kind of legal hair-splitting that tells you the original Microsoft agreement was not designed to accommodate OpenAI becoming a 730 billion dollar company with its own cloud strategy. This deal was part of a 110 billion dollar funding round, and the Amazon relationship gives OpenAI both the capital and the infrastructure diversification it needs to reduce its dependence on any single cloud partner.

For developers and architects, the stateful runtime concept is genuinely interesting even if the business maneuvering is the bigger story. Today, most agent frameworks manage state in application code, storing conversation history, tool configurations, and permissions in databases or memory stores that you build and maintain yourself. A cloud-native stateful environment that handles this at the platform level could dramatically simplify agent deployment. But the details matter: what is the state management model, how do you migrate between environments, and what are the lock-in implications of having your agent state deeply embedded in AWS infrastructure?

What the newsletter does not address, and what I think matters most, is what this means for the thousands of companies already running OpenAI workloads on Azure. The message from OpenAI is that the Microsoft relationship remains strong for API access, but actions speak louder than press releases. When your most important new capability launches exclusively on a competitor's cloud, that sends a signal. Engineering teams should be thinking about multi-cloud agent architectures now, because the partnerships that determine where frontier AI runs are clearly still in flux.

**Key takeaways:**
- AWS becomes the exclusive third-party cloud for OpenAI's frontier models
- The stateful runtime manages agent memories, tool connections, and permissions at the platform level
- Legal distinction between stateless APIs (Microsoft exclusive) and stateful runtime (Amazon exclusive) enables the deal
- Part of a $110B funding round valuing OpenAI at $730B
- Signals further diversification of OpenAI away from its original Microsoft-centric cloud strategy

**Why do I care:** If you are building AI agents in production, pay close attention to how cloud-native state management evolves. The ability to persist agent state, tool connections, and permissions at the infrastructure level could eliminate a lot of custom plumbing. But be cautious about coupling your agent architecture too tightly to any single cloud provider when the competitive landscape is shifting this rapidly.

**Link:** [The Batch - OpenAI Agent States on AWS](https://www.deeplearning.ai/the-batch/)

---

## xAI's Cost-Effective Video Generator - Grok Imagine 1.0

**TLDR:** xAI launched Grok Imagine 1.0, a text/image/video-to-video generator that topped Artificial Analysis Video Arena while costing roughly a third of Google Veo 3.1 and a seventh of Sora 2 Pro per minute of generated video.

**Summary:**

The pricing on this one is the headline, and it should be. xAI launched Grok Imagine 1.0, which generates video with dialogue, sound effects, and music from text, image, or video inputs. It topped the Artificial Analysis Video Arena leaderboard in both text-to-video and image-to-video categories. And then comes the price: 4 dollars and 20 cents per minute of generated video. For context, Google Veo 3.1 costs 12 dollars per minute and Sora 2 Pro charges 30 dollars per minute. That is not a marginal cost advantage, it is a fundamentally different pricing tier that could reshape which applications are economically viable.

The capabilities are reasonable for the current generation: up to 15 seconds of video at 720p resolution via API, with the model integrated directly into the X social network. The ability to generate video with synchronized dialogue, sound effects, and music from a single prompt is notable. Most video generation models handle visual output only, with audio being a separate pipeline. Consolidating this into one model, assuming the quality holds up, removes a significant integration headache for developers building content creation tools.

Here is where I have to be direct about what is missing. xAI has disclosed essentially zero technical details about how this model works. No architecture description, no training data information, no technical report. For a model that topped a competitive leaderboard, that opacity is frustrating. And the elephant in the room that the newsletter rightly mentions: there is ongoing controversy about the generation of nonconsensual content. Video generation models that can produce realistic human likenesses with sound raise serious safety questions, and xAI's track record on content moderation has been, shall we say, inconsistent. The price advantage means more people will use this, which amplifies both the legitimate use cases and the potential for harm.

**Key takeaways:**
- Topped Artificial Analysis Video Arena in both text-to-video and image-to-video categories
- $4.20 per minute versus $12 for Google Veo 3.1 and $30 for Sora 2 Pro
- Generates video with synchronized dialogue, sound effects, and music
- Up to 15 seconds at 720p via API, integrated with the X social network
- No technical details disclosed, and content safety concerns remain unaddressed

**Why do I care:** If you are building applications that involve video generation, the pricing delta here is large enough to change your product economics. A feature that was cost-prohibitive at 30 dollars per minute becomes exploratory at 4 dollars. But the lack of technical transparency and the unresolved content safety issues mean you should evaluate this carefully before integrating it into customer-facing products. Your brand is on the line for whatever it generates.

**Link:** [The Batch - xAI Grok Imagine 1.0](https://www.deeplearning.ai/the-batch/)

---

## Recursive Language Models (RLMs)

**TLDR:** MIT researchers developed Recursive Language Models that process long contexts by treating input text as a persistent variable in an external Python environment, recursively breaking tasks into sub-tasks and achieving 91.3 percent on BrowseComp+ where GPT-5 alone could not answer.

**Summary:**

This is the kind of research that makes me genuinely excited, because it attacks one of the most fundamental limitations of language models in a way that is elegant and practical. MIT researchers developed Recursive Language Models, or RLMs, that handle long contexts not by brute-forcing attention over millions of tokens but by treating the input text as a persistent variable in an external Python environment. The model writes code to fetch the specific chunks it needs, breaking what would be a single overwhelming long-context task into a series of manageable sub-tasks. Each sub-task is handled by a recursive call to a submodel that processes just one chunk.

The results speak for themselves. RLM-GPT-5, which wraps GPT-5 with this recursive framework, achieved 91.3 percent on BrowseComp+, a benchmark where GPT-5 by itself was unable to answer at all. The approach maintained approximately 50 percent accuracy at 1 million tokens, which is a context length that causes most models to degrade catastrophically. The researchers built implementations on top of Qwen3-8B with its 32K context window, GPT-5 with 400K context, and Qwen3-Coder-480B with 256K context, demonstrating that the technique works across different model sizes and architectures.

What makes this approach intellectually satisfying is that it mirrors how humans actually handle large documents. You do not read a thousand-page report from start to finish when answering a specific question. You skim for structure, identify the relevant sections, and then read those carefully. RLMs formalize this intuition by having the model generate code that implements exactly this kind of targeted retrieval. The external Python environment provides the persistent state, and the recursive calling pattern provides the decomposition strategy. It is retrieval-augmented generation taken to its logical conclusion, where the model itself designs the retrieval strategy in real time.

The limitation worth noting is that this adds latency. Each recursive call is a separate inference pass, and for deeply nested decompositions, the total wall-clock time could be significantly longer than a single long-context inference. The paper also does not deeply explore failure modes: what happens when the model's code for fetching chunks is wrong, or when the recursive decomposition misidentifies which sections are relevant? These edge cases matter for production deployment. But as a research direction, the idea that you can dramatically extend effective context length by teaching models to program their own retrieval is powerful and likely to influence how production systems handle long documents.

**Key takeaways:**
- RLMs treat input text as a persistent variable in an external Python environment, recursively breaking long-context tasks into sub-tasks
- RLM-GPT-5 achieved 91.3 percent on BrowseComp+ where GPT-5 alone could not answer
- Maintained approximately 50 percent accuracy at 1 million tokens
- Works across multiple base models: Qwen3-8B, GPT-5, and Qwen3-Coder-480B
- Adds latency due to multiple recursive inference passes, but dramatically extends effective context handling

**Why do I care:** If you are working with applications that need to reason over very long documents, legal contracts, codebases, research corpora, this approach is worth studying closely. The insight that a model can write its own retrieval code to decompose a long-context problem is more robust and flexible than fixed chunking strategies. Watch for this pattern to show up in production RAG systems and agentic document analysis tools over the next year.

**Link:** [The Batch - Recursive Language Models](https://www.deeplearning.ai/the-batch/)