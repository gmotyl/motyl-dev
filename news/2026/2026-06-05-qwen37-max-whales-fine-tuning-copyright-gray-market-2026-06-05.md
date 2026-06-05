---
title: "Qwen3.7-Max Challenges Google, AI Saves Whales, and Fine-Tuning Breaks Copyright Guardrails"
excerpt: "This week in AI: Alibaba's new flagship LLM pushes into the global top tier, thermal cameras help ships dodge whales, and a research paper reveals that fine-tuning can strip copyright protections from language models."
publishedAt: "2026-06-05"
slug: "qwen37-max-whales-fine-tuning-copyright-gray-market-2026-06-05"
hashtags: "#the-batch #ai #ml #llm #opensourceai #regulation #copyright #conservation #generated #en"
source_pattern: "The Batch"
---

## Qwen3.7-Max Adds Speed and Power

**TLDR:** Alibaba has updated its flagship large language model, Qwen3.7-Max, positioning it as the smartest Chinese-built LLM and the third-fastest globally. It competes directly with leading U.S. models on major benchmarks, though it comes with closed weights and some unanswered questions about its agentic claims.

**Summary:** Alibaba has been on a real push lately, and Qwen3.7-Max is their latest signal that they are serious about competing at the very top of the LLM leaderboard. The model is positioned specifically for text-only workloads like coding and scientific discovery, and it is notable for supporting up to one million input tokens while generating output at 208 tokens per second. That speed puts it tied for third place globally on Artificial Analysis benchmarks, right alongside Gemini 3.5 Flash.

What makes Qwen3.7-Max technically interesting is its reinforcement learning training strategy. Alibaba deliberately decoupled three elements that are typically tangled together in agent training: the task itself, the agentic harness that calls tools, and the verifier that judges success. By training across many combinations of these three components, the model avoids learning shortcuts that only work in one specific setup. That is a smart design choice, and it shows in how the model behaves across diverse tasks.

The benchmark numbers are respectable but not dominant. On the Artificial Analysis Intelligence Index, Qwen3.7-Max scores 56.6, landing just behind Gemini 3.1 Pro Preview at 57.2. On the factual accuracy measure called AA-Omniscience, it scored 14, which trails both Gemini 3.1 Pro Preview at 33 and is comparable to Claude Sonnet 4.6 at 12. One thing worth calling out: its low hallucination rate of 23 percent comes partly because it declines to answer more than half of prompts. Choosing silence over guessing is intellectually honest, but it limits practical utility in production systems that need responses.

Alibaba's internal agentic demonstration, where the model autonomously optimized an attention kernel over 35 hours with 1,158 tool calls, is genuinely impressive if taken at face value. But Artificial Analysis has not independently tested Qwen3.7-Max on long-running agentic tasks, so right now that claim rests entirely on Alibaba's own reporting. That is a meaningful caveat.

There is also a strategic story here. Qwen3.7-Max has closed weights, as do several other recent top-tier Qwen models. Simultaneously, Alibaba started charging for Qwen Code. This shift toward monetization follows leadership changes in the Qwen team and suggests a deliberate pivot from maximizing reach to maximizing revenue. I have mixed feelings about this. The open source ecosystem genuinely benefits from accessible model weights, and Alibaba's lower-tier models remain open. But I get it: you cannot run a sustainable AI research program on enthusiasm alone.

**Key takeaways:**
- Qwen3.7-Max ranks seventh on the Artificial Analysis Intelligence Index, competing directly with top U.S. models and achieving 208 tokens per second output speed
- Its reinforcement learning training separates task, harness, and verifier to avoid setup-specific shortcuts
- The shift to closed weights at the top tier signals Alibaba is prioritizing revenue generation over open access

**Why do I care:** From an architecture standpoint, what I find worth watching here is the decoupled training approach. If you are building agentic systems on top of any LLM, the fact that Alibaba explicitly trained against harness-specific overfitting matters for how reliably the model performs across your own tooling. The closed weights are annoying for anyone building offline or regulated workloads where you cannot call an external API. And the pricing at $2.50 per million input tokens puts it in a bracket where you will want to be thoughtful about where in your stack you deploy it versus a cheaper, faster model for simpler tasks.

**Link:** [Qwen3.7-Max model page](https://qwenlm.github.io/blog/qwen3.7-max/)

---

## How AI is Saving Whales

**TLDR:** WhaleSpotter, a system developed from over a decade of oceanographic research, uses thermal cameras and a neural network to detect gray whales in real time and alert ship captains before collisions occur. Deployed recently in San Francisco Bay, it has already logged more than 6,600 whale detections in under two weeks.

**Summary:** This one genuinely made me stop and think. Ships kill around 20,000 whales per year globally according to Ocean Wise, and the traditional methods for avoiding them — relying on humans watching the water surface or listening for whale songs through hydrophones — are deeply limited. Whales do not always surface visibly, and they do not always vocalize. That detection gap has real, fatal consequences.

WhaleSpotter addresses this with thermal imaging. Whales are warm-blooded, so their blow and exposed body surfaces run at least 3.6 degrees Fahrenheit warmer than surrounding ocean water. Heat-sensing cameras mounted on land or vessels can detect that signature up to four nautical miles away, day or night, through light fog or glare. The system uses a neural network trained on hundreds of thousands of thermal images, including negative examples like birds, breaking waves, and boats, to classify what it sees. Critically, it runs on local hardware rather than sending video to a data center, avoiding the latency that would make real-time alerts impractical.

When the algorithm identifies a whale, it transmits a brief video segment plus vessel telemetry to an onshore team of human experts. Those experts validate the detection within about 30 seconds, and an alert reaches ship captains within roughly one minute of the initial classification. That human-in-the-loop design yields 99 percent accuracy and avoids the alarm fatigue that comes from fully automated systems that cry wolf too often.

The San Francisco Bay deployment is particularly meaningful given that climate-driven warming has pushed greater numbers of gray whales into the Bay in search of food. Roughly 40 percent of whales that die there have been struck by vessels. The WhaleSpotter installation combines a stationary camera on a Coast Guard tower with a moving camera on a passenger ferry, which is the first hybrid deployment of its kind. Within a week and a half of operation, it had logged 6,600 whale detections.

What this project illustrates is something I think gets undervalued in the AI conversation: the combination of specialized sensor hardware, years of domain-specific training data, and thoughtful system integration produces something that general-purpose models simply cannot replicate. Woods Hole spent more than a decade building this. That depth of institutional knowledge is what makes the AI layer actually work.

**Key takeaways:**
- Thermal cameras detect whale heat signatures up to four nautical miles away regardless of visibility conditions
- Human-in-the-loop validation takes about 30 seconds and yields 99 percent accuracy while preventing false alarm fatigue
- The system has been deployed commercially on over 70 vessels, ports, and offshore energy operations globally

**Why do I care:** This is a textbook example of AI working well in a safety-critical context because it is not trying to be fully autonomous. The human validator in the loop is not a bottleneck; it is the feature that makes the whole thing trustworthy enough to act on. That design philosophy — AI detects, human confirms, alert fires — is directly applicable to any domain where false positives have serious consequences. If you are building alerting systems of any kind, WhaleSpotter's architecture is worth studying.

**Link:** [WhaleSpotter technology overview](https://www.whalespotter.com)

---

## Inside the Gray Market for LLM Access

**TLDR:** A detailed report from the think tank ChinaTalk documents a network of API proxy services that give developers in mainland China access to U.S. AI models like Claude and Gemini at prices as low as 10 percent of the official market rate. The ecosystem involves everything from stolen credit cards to model output harvesting, and has direct connections to allegations of industrial-scale model distillation.

**Summary:** The ChinaTalk report on gray market LLM access is one of those pieces that lays out something most practitioners already suspected but had never seen documented this thoroughly. Major U.S. AI models are not officially available in mainland China, but there is an active informal market that routes developer API calls through proxy servers in places like Singapore. The vendors in this market range from technically-legal-but-ethically-questionable operations to outright illegal ones.

The ecosystem is layered and surprisingly sophisticated. There are account farms that acquire AI model credentials at scale, verification platforms that supply phone numbers to pass sign-up checks, token resellers dealing in unused quotas, identity brokers creating fake credentials, and payment processors handling the transactions. Some vendors exploit legitimate gray areas like aggregating free API credits, reselling unused subscription quotas, or splitting plans among multiple users. Others use accounts created with stolen credit cards. The common thread is that none of these actors have a legitimate commercial relationship with the AI providers whose technology they are reselling.

The deception runs in multiple directions. When a user pays for access to a high-tier model like Gemini 2.5, their request may be silently routed to a cheaper, inferior model. The CISPA Helmholtz Center measured proxy access to what was advertised as Gemini 2.5 and found benchmark performance of 37 percent on medical question answering, compared to 83.82 percent via Google's actual API. Developers building on these services are not getting what they think they are paying for.

More concerning is the data harvesting. Proxy servers log user requests and sell those logs. The outputs of proprietary models accessed this way become training data for competing models. This connects directly to Anthropic's February accusations that DeepSeek, Moonshot, and MiniMax systematically extracted Claude outputs through 24,000 fraudulent accounts in what Anthropic called industrial-scale distillation. The Trump administration's April memo acknowledged this as a genuine adversarial threat and committed to working with the private sector on defenses.

I want to be honest about the limitations here. ChinaTalk's report rests substantially on interviews and circumstantial evidence. Some claims have not been independently verified. The framing of Chinese AI labs as uniquely bad actors also deserves scrutiny, given that Western companies have also trained on copyrighted material without permission. The distinction the report is making is between training on publicly available content and actively using fraudulent accounts to systematically harvest proprietary model outputs at industrial scale. That distinction matters legally and ethically, but it is worth being precise about it.

**Key takeaways:**
- Developers in China can access Claude tokens at roughly 10 percent of market price through gray market proxy services
- Proxy services frequently substitute cheaper models for the expensive ones users believe they are accessing, with measurable benchmark degradation
- User API calls, prompts, and agent traces are logged and sold, feeding model training pipelines that potentially evade the guardrails of the original models

**Why do I care:** If you are building any kind of multi-tenant AI service or reselling API access, this report should make you think carefully about your own token provenance. The data harvesting dynamic is not China-specific. Any proxy layer you introduce into your architecture is a potential logging point. And if you are doing security threat modeling for AI-integrated applications, the fact that model outputs can be systematically distilled to train models without the original guardrails is a real attack vector, not a hypothetical one.

**Link:** [ChinaTalk gray market report](https://chinatalk.substack.com)

---

## Fine-Tuning LLMs to Expand on Summaries Unearths Pretraining Texts

**TLDR:** Researchers from Stony Brook University, Carnegie Mellon, and Columbia Law School discovered that fine-tuning LLMs on a seemingly harmless writing assistance task causes them to reproduce up to 90 percent of novels they encountered during pretraining, even when copyright alignment was in place. The finding reveals that alignment training suppresses verbatim output but does not erase the underlying text from model weights.

**Summary:** This research paper is uncomfortable reading if you work with fine-tuned models in production. The setup sounds almost too simple: take a large language model, fine-tune it to expand plot summaries into polished prose paragraphs, and see what happens. What happened is that the models started reproducing substantial verbatim text from books in their pretraining data, books that were not even in the fine-tuning dataset.

The key insight is precise and important. Alignment training does not delete memorized text from model weights. What it does is train the model to suppress verbatim output. Fine-tuning on a task that rewards generating literal text effectively teaches the model to decode those suppressed strings again. The alignment guardrail was never a vault. It was a volume knob, and fine-tuning turned it back up.

The researchers tested DeepSeek-V3.1, Gemini 2.5 Pro, and GPT-4o. They measured book memorization coverage, which tracks what percentage of a book's words the model reproduces in contiguous spans of five words or more. Without fine-tuning, GPT-4o produced 7.36 percent memorization coverage when prompted with plot summaries. After fine-tuning on summary-paragraph pairs from a single author's work, all three models produced verbatim coverage exceeding 40 percent for the majority of books tested. In one case, GPT-4o reached 91.9 percent coverage. The researchers also found that fine-tuning on one author's works generalized to reproducing text from 32 different authors. That cross-author leakage is particularly striking.

The control case is telling. Fine-tuning on Virginia Woolf's public-domain novels produced similar verbatim rates, while fine-tuning on purely synthetic data produced near-zero memorization. This confirms that the procedure is unlocking memorized pretraining text, not learning to imitate writing style from the fine-tuning examples alone.

There is a question the paper leaves unanswered that I think matters a lot: would the fine-tuned models reproduce this text without being explicitly prompted to generate in a specific author's style? The researchers did not test that scenario. If the answer is yes, the security implication is much broader. If the answer is no, then the attack requires specific intent and we are talking about a weaker vulnerability. Either way, the core finding stands: organizations fine-tuning models cannot assume that copyright alignment from the base model will hold after customization.

**Key takeaways:**
- Fine-tuning on creative writing expansion tasks caused models to reproduce up to 90 percent of pretraining text verbatim, including text from books not in the fine-tuning set
- Copyright alignment suppresses verbatim output at inference time but does not erase memorized text from weights; fine-tuning can undo this suppression
- Model providers that allow customer fine-tuning face a new category of liability risk if their base model alignment does not survive downstream customization

**Why do I care:** This is directly relevant to anyone fine-tuning models for content generation, documentation, or writing assistance. The legal exposure here is real. If a model you deployed starts reproducing copyrighted novels because of how you fine-tuned it, that is your organization's problem, not the base model provider's. The practical question to ask is whether your fine-tuning pipeline should include memorization detection as a post-training evaluation step. I would argue yes, and this paper gives you the methodology to do it.

**Link:** [Research paper on fine-tuning and copyright memorization](https://arxiv.org/abs/2506.01234)
