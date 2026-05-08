---
title: "No AI Jobpocalypse, Smarter Chips, Video Wars, and Robots That Remember"
excerpt: "The Batch covers Andrew Ng's pushback on AI job doom narratives, ByteDance flooding CapCut with video AI, Nvidia using reinforcement learning to design its own GPUs, and a neat trick for teaching robots new tasks without forgetting old ones."
publishedAt: "2026-05-08"
slug: "the-batch-ai-jobs-chips-video-robots"
hashtags: "#the-batch #ai #ml #robotics #video-generation #engineering #agents #generated #en"
source_pattern: "The Batch"
---

## There Will Be No AI Jobpocalypse

**TLDR:** Andrew Ng argues the AI job apocalypse narrative is overblown and irresponsible, driven by incentives from companies who profit from making AI sound more powerful. He predicts an "AI jobapalooza" instead, with net job creation outpacing destruction — just like every prior technology wave.

**Summary:**

Andrew's framing here is refreshingly blunt: the jobpocalypse story is good for business. Frontier AI labs have every reason to make their systems sound like they can replace entire departments — it justifies enterprise pricing that anchors to salaries rather than typical SaaS rates. If your tool can replace a $100,000 employee, charging $10,000 suddenly looks like a discount. That's a clever pricing play dressed up as existential concern.

He also calls out businesses that have been attributing layoffs to AI when the real story is more mundane — they overhired during the pandemic when interest rates were near zero and stimulus money was everywhere. Blaming AI sounds like strategic efficiency. Admitting you over-staffed during a capital party sounds like a mistake. Companies are understandably choosing the former narrative.

Andrew's argument draws on historical parallels that are genuinely useful. The nuclear power underinvestment triggered by safety fears. The "population bomb" scare that led to harmful demographic policies. The dietary fat panic that pushed governments toward high-sugar diets for decades. In each case, a bad story became institutionalized and caused real damage. He's suggesting we're in the early innings of a similar dynamic with AI employment fears.

The data point he leans on is that software engineering hiring remains strong despite being the sector most affected by coding agents. U.S. unemployment sits at 4.3%. That's not what a jobpocalypse looks like. He's not saying AI doesn't change work — he's saying changing work is different from destroying it.

Where I'd push back: Ng is right that net job creation has historically outpaced destruction across technology waves, but the transition period can be genuinely brutal for specific groups of workers. "The long run works out" is cold comfort if you're a mid-career software engineer whose workflow just shifted under you. He acknowledges this briefly but doesn't dwell on it. The jobapalooza prediction is optimistic and probably correct over a decade, but the path there is not smooth for everyone.

**Key takeaways:**

- AI job doom narratives serve financial incentives of labs and companies deflecting from pandemic overhiring
- Historical technology waves created more jobs than they destroyed — AI is likely no different
- Software engineering hiring remains robust despite coding agents racing ahead
- U.S. unemployment at 4.3% is inconsistent with the jobpocalypse story
- The real challenge is the transition period, which matters even if the long-run outcome is positive

**Why do I care:** From a software developer's perspective, this is somewhat reassuring, but I'd rather be clear-eyed than comforted. The skill shift is real even if the job numbers hold up. The developers who thrive in the next five years will likely be the ones who stopped treating AI as a tool layered on top of the same workflow and started treating it as a collaborator that changes what the job actually is. Ng is making a macro-level economic argument that's probably correct. The practical question for any individual developer is whether they're adapting fast enough to stay on the right side of that transition.

**Link:** [Why there will be no AI jobpocalypse](https://info.deeplearning.ai/e3t/Ctc/LX+113/cJhC404/VWWt2T85KsmfW482gcj6QYvTtW6mk3Cf5NPKpxN2SX2465m_5PW7lCGcx6lZ3nbW81VzBt1-0lMWW2p_06b4fY2wtW6G-yhy32wmXDW2W9NYJ8_tNnBW1CR9s_8ydLnjW7wkvym8jPFf6W57dnmj2nC80nW5K9MTM5dmTMBW1ywzcC1RzLxKW9dk9bC1TvCLRW3ZQPPv43H9DnV28RZN5YY1GZW5cmlgw4sqXKrW6_2Gt63fPWyGW35lQ915WqgdtW84X4zC2t0bP8W6zTBZH1gRq-4W4xs89W6-DTtbW8khsgm3Pzx2nN89lYS01QXs3W1pzH5m72sX9cW8Jt69Z7Nzhz5W1VnntD1KV8ypW5M89R04N16BMW6FprlC3MtfWKW5PKQwY7JXfdrW6BsrbM5vBDkhW2Gs9rs6VjWkvW1x05gQ3zqklvW9g8ndC4jql0PW4sfVSm2zs25qW3XSSWK2199qDW5ggPZM1rjbL7W4glWST53jLWmN91rbbd7n39yW9jTY7q93CFtCW1Dq_Sg3gbXkVW3563FL266xl8W39swn06BztpDW6ZxRbd13r5PLf73tbfY04)

---

## ByteDance Bids for Video Leadership

**TLDR:** ByteDance launched Seedance 2.0 to hundreds of millions of CapCut users worldwide, ranking in the top two on independent video leaderboards, while OpenAI quietly backed away from Sora after the service reportedly cost $1 million a day to run with declining user numbers.

**Summary:**

The video generation story here is really two stories happening simultaneously. On one side, OpenAI is winding down Sora — a product that launched with enormous fanfare and a claimed 1 million daily active users that apparently dropped below 500,000 while costing around $1 million daily to operate. That math never worked, and no amount of product polish was going to fix it. Shifting that compute to coding and business products is the rational move, but it's also an admission that consumer video generation at current costs doesn't have a viable unit economics model.

On the other side, ByteDance is doing something strategically different. Seedance 2.0 is genuinely competitive — first or second on both the Arena AI and Artificial Analysis leaderboards in blind human preference voting — but the real play is distribution. CapCut reportedly has 736 million monthly active users on mobile, making it the second-largest consumer AI product behind only ChatGPT. When you slot a competitive video generation model directly into an editing app that hundreds of millions of people already have on their phones, you're not launching a product. You're flipping a switch.

The technical architecture is interesting. Seedance 2.0 generates video and audio simultaneously rather than as separate passes, which helps maintain consistency within a clip. It handles multiple camera shots and cuts in a single generation pass — so you're not stitching together separate clips but getting a coherent sequence in one go. The model accepts up to three video clips, nine images, and three audio clips as inputs, and it can generate lip-synced dialogue in multiple languages, which is a significant capability for the global reach CapCut has.

There's an unresolved intellectual property problem sitting in the background. Six major Hollywood studios demanded ByteDance stop training on copyrighted material after a Seedance 2.0 clip surfaced featuring recognizable likenesses of Tom Cruise and Brad Pitt. The dispute is unresolved, and it's unclear whether the safeguards ByteDance added to CapCut extend to third-party API access. That's a live legal exposure.

The broader pattern in the video generation market is striking. Chinese developers — ByteDance, Alibaba with HappyHorse-1.0 and HappyOyster — are releasing models at an accelerating pace and building distribution channels simultaneously. U.S. developers are retreating from the consumer space. That's not just a competitive shift; it's a signal about where the commercial model for generative video is viable right now.

**Key takeaways:**

- Sora's retreat from consumer video points to unsustainable unit economics at current compute costs
- Seedance 2.0 reaches 736M CapCut users — distribution advantage may matter more than model quality alone
- Joint video-audio generation in a single pass improves scene and character consistency
- Hollywood IP dispute over likeness generation remains unresolved
- Chinese labs are accelerating consumer AI video releases while U.S. labs shift focus elsewhere

**Why do I care:** This isn't directly a frontend story, but it's a clear illustration of how distribution beats raw model quality in consumer AI. For anyone building on generative video APIs, the retreat of Sora is a reminder to be cautious about building on products that don't have sustainable economics. ByteDance's model of integrating AI into a product with existing massive distribution is the safer long-term bet — and it's a pattern worth thinking about when evaluating which AI capabilities to build on.

**Link:** [ByteDance Bids for Video Leadership](https://info.deeplearning.ai/e3t/Ctc/LX+113/cJhC404/VWWt2T85KsmfW482gcj6QYvTtW6mk3Cf5NPKpxN2SX2463prCCW7lCdLW6lZ3lrW4rYGDx3PSryvW7Ym3g08ddlLrW97dLQd2zJGdGW3_r_pz5ffDPXVZrCjZ8p_N3HW6zJnPJ1-gbdpW1hXw3Z25GF5-W7wrxpJ66g8YYW2_tQvX88-WG_N34FrGFhTMtrW8RtvFh9b3dcMW2_BRY36p9pX8VYWRvg6xKShwW3FvhNX1-9WfkW2yFfc64h5-kyW3dMxKK3PGYfKW2PZ46-1hX_bGW8stq1D3k7cbXW7cvGM-7J13M9W88DMd86QptZ3W6vzxR06FhjktW2r1WRK4nFS8lW29BKMk4dMRx8N5qjgvq5ryVmf8235q004)

---

## How Nvidia Uses AI to Design Chips

**TLDR:** Nvidia's chief scientist Bill Dally described how the company applies AI at five distinct stages of GPU chip design, with reinforcement learning agents producing circuits that are measurably better than what human engineers would design — while being honest that full AI-driven chip design from a prompt remains a distant goal.

**Summary:**

There's a slide that gets shown a lot about AI taking over creative work, and it usually lumps together "code," "design," and "engineering" as things AI will handle by some near future date. What Dally described at GTC is something more specific and, I'd argue, more interesting: AI solving a very particular class of engineering problems where the search space is genuinely enormous and human intuition runs out quickly.

The clearest example is NVCell, which handles the layout of roughly 2,500 to 3,000 small reusable circuit blocks every time Nvidia moves to a new semiconductor manufacturing process. Previously, this work occupied eight engineers for about ten months. NVCell — a combination of a genetic algorithm that proposes layouts and a reinforcement learning agent that incrementally fixes rule violations — now completes equivalent work overnight on a single GPU. And the results match or exceed human designs on area, power consumption, and signal propagation speed. That's not AI assisting engineers. That's AI doing the job.

PrefixRL is even more striking. It designs the arithmetic circuits at the heart of GPU computing units — adders, counters, the components that actually do the math. The reinforcement learning agent optimized for timing, area, and power and produced what Dally called "bizarre" configurations: a 64-bit adder that uses 25% less chip area than what industry-standard design tools produce. The agent isn't following human engineering conventions because no one told it about those conventions. It found solutions in the space that human intuition would never explore.

The ChipNeMo and BugNeMo models are a different kind of interesting. Nvidia fine-tuned LLaMA 2 models (7 billion and 13 billion parameters) on decades of internal documentation — every GPU design, hardware spec, and bug report the company has produced. The result is a domain expert that can answer engineers' questions about Nvidia hardware, help with specialized chip-design languages, and summarize bug reports. A 7-billion-parameter model beating a general-purpose model five times its size on domain tasks is a useful data point about what fine-tuning on high-quality proprietary data can accomplish.

Verification — confirming a finished design actually behaves as specified — is still the longest stage and an open problem. Dally acknowledged that end-to-end AI-designed chips from a text prompt are far away. But the direction is clear: AI is taking over well-defined subtasks with enormous search spaces where correctness can be verified. That's a pattern that extends well beyond chip design.

**Key takeaways:**

- NVCell reduces 10-person-months of layout work to an overnight GPU run, matching human quality
- PrefixRL produces arithmetic circuits 20-30% better than human designs using approaches engineers wouldn't consider
- Domain-adapted LLMs on proprietary data outperform general models five times their size on specialized tasks
- Each GPU generation produces chips better suited to training the AI systems that designed it — a compounding loop
- Full prompt-to-chip AI design is explicitly described as a distant goal, not an imminent capability

**Why do I care:** The software analog to NVCell and PrefixRL is the part of the AI coding narrative people don't talk about clearly: not AI helping you write code faster, but AI taking on entire engineering subtasks that were previously manual, time-consuming, and bottlenecked by human attention. The chip design case is advanced because the verification step is rigorous — you can actually check if a circuit meets spec. Software is harder because "correct" is fuzzier. But the pattern of AI finding solutions in large search spaces that humans would never explore is real, and thinking about where that applies in software architecture and systems design is worthwhile.

**Link:** [How Nvidia Uses AI to Design Chips](https://info.deeplearning.ai/e3t/Ctc/LX+113/cJhC404/VWWt2T85KsmfW482gcj6QYvTtW6mk3Cf5NPKpxN2SX2463prCCW7lCdLW6lZ3lrW4rYGDx3PSryvW7Ym3g08ddlLrW97dLQd2zJGdGW3_r_pz5ffDPXVZrCjZ8p_N3HW6zJnPJ1-gbdpW1hXw3Z25GF5-W7wrxpJ66g8YYW2_tQvX88-WG_N34FrGFhTMtrW8RtvFh9b3dcMW2_BRY36p9pX8VYWRvg6xKShwW3FvhNX1-9WfkW2yFfc64h5-kyW3dMxKK3PGYfKW2PZ46-1hX_bGW8stq1D3k7cbXW7cvGM-7J13M9W88DMd86QptZ3W6vzxR06FhjktW2r1WRK4nFS8lW29BKMk4dMRx8N5qjgvq5ryVmf8235q004)

---

## AI at Work, Quantified

**TLDR:** A Gallup survey of 23,700 U.S. workers found that about half used AI at work at least a few times last year, daily AI use tripled since 2023, and most users report productivity gains — but meaningful adoption is concentrated in companies that actively support it with tools and managerial buy-in.

**Summary:**

The Gallup numbers are useful precisely because they're not from a company that sells AI tools. It's genuinely hard to get reliable data on how much AI is being used at work versus claimed to be used, so a polling organization with methodology credibility is worth paying attention to.

The headline numbers: 13% of respondents used AI daily, 28% a few times a week. Those figures are up from 4% and 11% in 2023 — roughly tripling in two years. About half of U.S. workers touched AI at work at least a few times in the past year. That's a real and significant shift in how work gets done for a large portion of the workforce.

The productivity story is more nuanced. Within companies where AI was actually deployed, 65% of employees said it improved their productivity, and 31% said it changed how they worked. That's meaningfully different from universal AI adoption — it suggests that the productivity gains are real but heavily concentrated in environments where the organization is actively supporting the technology. The contrast between "we use AI" and "we have an AI strategy plus tools plus managerial support" seems to be the difference between marginal tinkering and genuine workflow change.

The managerial support finding is particularly interesting. Employees with strongly supportive managers were more likely to use AI and to report that it had transformed their work. This isn't surprising — the same pattern holds for most organizational changes — but it's a useful reminder that AI adoption is not primarily a technical problem. It's a management and organizational design problem dressed up in a technology costume.

The pushback cases are equally worth understanding. Workers who weren't using AI commonly cited a desire to keep doing their current work, ethical concerns, data privacy worries, and a belief or experience that AI simply wasn't useful. The last one is critical — if someone tried AI tools, found them unhelpful, and stopped, that's a product and tooling problem, not a resistance problem. Lumping "doesn't want to change" with "tried it and it didn't work" obscures what actually needs to be addressed.

**Key takeaways:**

- Daily AI use at work tripled from 2023 to 2025, from 4% to 13% of workers
- 65% of AI users in AI-adopting companies report productivity improvements
- Managerial support is a significant predictor of how transformatively employees use AI
- Non-users cite job preference, ethics, privacy, and genuine dissatisfaction with AI usefulness
- Only one in four companies has a clear AI strategy — organizational readiness lags adoption intent

**Why do I care:** For teams building software products, this data shapes what your users are actually experiencing when they use AI features. The finding that support and context drive adoption is directly applicable to product design — AI features that require configuration, context-setting, or organizational scaffolding will underperform compared to ones that fit naturally into existing workflows. The gap between "AI available" and "AI transformative" is an organizational problem that product teams can either ignore or design around. The smart teams are designing around it.

**Link:** [AI at Work, Quantified](https://info.deeplearning.ai/e3t/Ctc/LX+113/cJhC404/VWWt2T85KsmfW482gcj6QYvTtW6mk3Cf5NPKpxN2SX24q3prCCW7Y8-PT6lZ3p9W5yJKCr8jlrsLW6MXkDD5_YLlrW1kj93V6PHCjsW6_6T9D7Kzj5qW18V6vG5xL6K9W3Bj0XM3kqktjW5_WLbD2kMFH1W25-kc03BS_zPW25JT_n8tL8ccW38-3hV3LxGFxW6h8zd28y594RW2FFKNQ8dl4QDW8nCXTG3ZRjTVW3T2_bC31yhclW6jzw228skQrSN1qwhyfQk7M3W36_HPH2yG_GwVX5tX18jvlMtW1KTGc38_32_vW4FJS822VYjZzW40XhYf2lB7kZN1l9hWQ1b6W_W6bMHy2738xh5N46LSJDFfjRLW91VV1f24wFjfW5KvLcz3jpQYMf7K0RCj04)

---

## Robots That Adapt to New Tasks

**TLDR:** Researchers from UT Austin, UCLA, and Sony found that combining large pretrained vision-language-action models with LoRA fine-tuning and on-policy reinforcement learning (GRPO) effectively prevents robots from forgetting previously learned tasks while acquiring new ones, outperforming established methods without needing to replay old training data.

**Summary:**

Catastrophic forgetting is one of the more frustrating problems in continual learning. You train a model to do task A, then train it to do task B, and it promptly forgets how to do task A. The standard remedies — replaying old training data, regularization penalties on weights that were important for previous tasks — all have tradeoffs in terms of data storage, compute, and complexity.

What the researchers found is that three properties of modern training setups essentially provide forgetting resistance for free, as a side effect of decisions made for other reasons. First, large pretrained models are naturally resistant to forgetting because they have so many parameters that small updates don't disrupt the bulk of learned knowledge. Second, LoRA — which adapts a model by learning two small matrices that modify the weights rather than changing the weights directly — constrains how much the model can change in the first place. Third, on-policy reinforcement learning like GRPO only updates the model based on actions it would have taken anyway, so it doesn't force large weight changes when a new task is introduced.

The experimental setup used a simulated robot arm working through LIBERO benchmark task suites — opening drawers, moving objects to target locations, that kind of thing. The model learned five tasks sequentially without seeing earlier training data again. The result was near-zero forgetting (0.3 percentage points average drop on previous tasks) and some generalization to tasks it had never seen during training (57% success rate on novel libero-spatial tasks, compared to 52.6% for Elastic Weight Consolidation and 55.2% for Dark Experience Replay).

There's a legitimate methodological caveat in the paper: the comparison methods weren't designed to be combined with LoRA and GRPO, and adding those techniques may have affected how the baselines performed. This is honest of the authors to flag, but it does mean the headline numbers come with an asterisk. The comparison against these methods "as adapted" rather than "as intended" may not perfectly reflect what those methods would do in their native configurations.

The broader point is more durable than any specific benchmark number. Sequential task learning — teaching a robot new tasks after deployment without retraining from scratch — is practically important as robots enter dynamic environments. The finding that you can get this largely for free by choosing the right training setup, rather than adding explicit anti-forgetting mechanisms, is genuinely useful guidance for anyone working on this problem.

**Key takeaways:**

- Large pretrained models, LoRA, and on-policy RL each independently reduce forgetting as a side effect of their design
- The combination achieved 0.3 percentage point average performance drop on prior tasks — effectively no forgetting
- No replay of old task data was needed, simplifying the training pipeline
- The approach also improved generalization to completely unseen tasks
- Limitations: evaluation was in simulation only; comparison baselines were adapted rather than used as originally designed

**Why do I care:** This is primarily a robotics and ML research story, but the underlying pattern — that properties of large pretrained models plus constrained fine-tuning methods naturally resist catastrophic forgetting — applies to any fine-tuning scenario. If you're fine-tuning language models for specialized tasks in a pipeline where the task distribution changes over time, these mechanisms are relevant. The takeaway for practitioners is to look carefully at what your fine-tuning method is already doing to the weights before layering on explicit continual-learning techniques.

**Link:** [Robots That Adapt to New Tasks](https://info.deeplearning.ai/e3t/Ctc/LX+113/cJhC404/VWWt2T85KsmfW482gcj6QYvTtW6mk3Cf5NPKpxN2SX23x3prCCW69sMD-6lZ3nQVbLqhl6mLcYZW2HWdBr8bBxJbW3S6_L48LlNdwW7LKXb35nrSDhW5fGw0v67yZ-3W5kyywZ2ZY0-WW4hKdhp358Nr5W5YpgXs5bPc_TV85NZD11gxz7W2hgFM92R8s3qW2jD2Jp5y0sctW5zklXf1cpvWNW3qVg626tYq1nW2nHKhF3Gv3nMW3Q4tN67xBRJZW5_btf84MYcpLVqTvmj5yH4szW8T958W28W1m8VwgyxC4pzVd4N5yH3RF9YR6Jf2KhDY804)
