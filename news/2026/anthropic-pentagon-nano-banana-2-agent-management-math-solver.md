---
title: "Anthropic vs. the Pentagon, Google's Nano Banana 2, and Why Your Agents Need an HR Department"
excerpt: "Andrew Ng's The Batch covers the Anthropic-DoD standoff, Google's faster image generation, OpenAI's agent management platform Frontier, and an AI system solving century-old math problems."
publishedAt: "2026-03-06"
slug: "anthropic-pentagon-nano-banana-2-agent-management-math-solver"
hashtags: "#the-batch #ai #ml #llm #agents #architecture #image-generation #anthropic #openai #google #gemini #national-security #generated #en"
---

## Context Hub: Because Your Coding Agent Is Living in the Past

**TLDR:** Andrew Ng announced Context Hub (chub), an open-source CLI tool that feeds your coding agents up-to-date API documentation so they stop hallucinating parameters and using deprecated endpoints. It is designed for the agent to consume, not for you.

**Summary:**

Let us talk about something that has probably bitten every single one of you building with AI coding assistants. You ask your agent to write some integration code, and it confidently produces something that looks correct but uses an API that was deprecated eight months ago. Andrew Ng opens this week's Batch by confronting this head-on with Context Hub.

The core problem is straightforward: even the best coding models have knowledge cutoff dates. Claude Opus 4.6, which Ng calls "possibly the best coding model currently," has a cutoff of May 2025. So when you ask it to call OpenAI's GPT-5.2, it reaches for the older chat completions API instead of the newer responses API. It has never heard of Nano Banana. It fumbles less common parameter choices for database services. This is not a hallucination problem per se -- it is a staleness problem, and that distinction matters.

Context Hub is a CLI tool you install via npm. You run commands like `chub search openai` to find available documentation, or `chub get openai/chat --lang py` to fetch current docs. The clever part is that you either prompt your coding agent to use chub itself, or you give it a SKILL.md file that teaches it to reach for chub automatically. For Claude Code users, you drop this into `~/.claude/skills/get-api-docs`.

There is an interesting social angle here too. Ng mentions that chub is designed so agents can save notes when they discover workarounds for incomplete documentation, building institutional knowledge over time. He even hints at a future where agents share discoveries with each other, inspired by what he calls "the remarkable rise of the social network Moltbook for agents."

What is missing from this picture? The elephant in the room is trust and verification. If agents are contributing documentation and sharing notes about API behaviors, who validates that information? We have already seen what happens when LLMs confidently state incorrect things. Building a system where agents teach each other without robust verification could amplify errors rather than correct them. Ng does not address this, and I think it deserves serious thought before the collaborative features go live.

**Key takeaways:**
- Coding agents frequently use outdated APIs because their training data lags behind rapidly evolving tools
- Context Hub (`chub`) provides a CLI-based solution where agents can fetch current API documentation on demand
- Agents can save notes about workarounds, building institutional knowledge across sessions
- Future plans include inter-agent knowledge sharing, though verification mechanisms are not yet discussed
- Available now via `npm install -g @aisuite/chub`

**Link:** [The Batch - Context Hub Announcement](https://www.deeplearning.ai/the-batch/)

---

## Nano Banana 2 Ups Performance/Price

**TLDR:** Google launched Nano Banana 2, a faster and cheaper successor to its image generator built on Gemini 3 Flash. It is roughly four times faster and half the price of Nano Banana Pro, while trading blows with GPT Image 1.5 at the top of image generation leaderboards.

**Summary:**

The image generation arms race continues, and Google just lobbed a significant volley. Nano Banana 2 -- formally Gemini 3.1 Flash Image -- is built on the Gemini 3 Flash architecture, which gives it a speed advantage that matters more than you might initially think.

Let me break down the numbers because they tell a compelling story. Nano Banana 2 generates images in four to six seconds across resolutions from 512x512 up to 4096x4096. It supports 14 aspect ratios, and can maintain consistency for up to five characters and 14 objects across multiple generated images. On the Arena.ai text-to-image leaderboard it leads with 1,280 Elo, edging out GPT Image 1.5 at 1,248. On image editing, it is essentially tied with GPT Image 1.5, though its score is based on only around 3,000 votes versus GPT Image 1.5's 50,000 -- a statistical detail that should make you cautious about declaring a winner.

The pricing is where it gets interesting for architects making platform decisions. API input costs $0.50 per million tokens, and output ranges from $0.045 per image at 512x512 to $0.151 at 4096x4096. That is roughly 60 percent cheaper than GPT Image 1.5 at high quality. For creative workflows that require many iterations -- marketing materials, product visualization, storyboards -- this cost difference compounds fast.

What nobody is talking about is the undisclosed architecture. Google reveals almost nothing about how Nano Banana 2 actually works beyond saying it is "based on" Gemini 3 Flash. Parameter count, training data, rendering model details -- all hidden. This is a trend across the industry, but it makes it genuinely difficult for teams to make informed decisions about which image generation pipeline to build around. You are choosing based on benchmark scores and pricing, without understanding the fundamental characteristics that might affect reliability, bias patterns, or failure modes in your specific use case.

The competitive timeline is worth noting: original Nano Banana in August 2025 pulled 10 million new users to Gemini. Nano Banana Pro topped leaderboards in November. OpenAI rushed GPT Image 1.5 out in December under a "code red" from Sam Altman. Now Nano Banana 2 answers at a lower price point. This cadence is unsustainable for smaller players and probably for some of the larger ones too.

**Key takeaways:**
- Four times faster than Nano Banana Pro at roughly half the cost per image
- Leads or ties for top positions on major image generation leaderboards
- Supports resolutions up to 4096x4096 with character/object consistency across multiple images
- Includes web search grounding and SynthID watermarking with C2PA Content Credentials
- Architecture details remain undisclosed, making informed platform decisions difficult

**Tradeoffs:** Gain significant cost and speed advantages but sacrifice transparency into the model architecture and training data

**Link:** [Nano Banana 2 Ups Performance/Price](https://www.deeplearning.ai/the-batch/)

---

## U.S. Department of War Dismisses Anthropic, Embraces OpenAI

**TLDR:** The U.S. military banned Anthropic after the company refused to remove restrictions on surveillance and autonomous weapons uses of Claude. OpenAI signed a contract allowing military use "for all lawful purposes," though Sam Altman later admitted the rushed deal was a mistake.

**Summary:**

This is the kind of story that will be studied in business schools and policy seminars for years. It reads like a thriller, with a ticking deadline, a presidential social media post, and a multi-billion-dollar industry navigating the tension between commercial interests and ethical commitments.

Here is the sequence. The U.S. military has been expanding AI use since early 2025. On January 3, it used Anthropic's technology via Palantir during an operation against Venezuela. Anthropic executives expressed concern to Palantir, who relayed it to the government. The Department of War then launched a program requiring AI companies to renegotiate contracts for combat, intelligence, and organizational uses.

Anthropic drew two lines: no surveillance of U.S. citizens, and no fully autonomous weapons. The Department of War said it would only accept limits required by law -- no external restrictions from technology vendors. xAI quickly signed an agreement for "all lawful uses." Then things escalated. Secretary of Defense Pete Hegseth gave Anthropic an ultimatum: relax restrictions by 5:01 p.m. Friday or be designated a "supply chain risk to national security" -- a designation previously applied only to foreign companies like Huawei and Kaspersky.

OpenAI signed its own "all lawful purposes" contract within hours. Four hours before Anthropic's deadline, President Trump posted on Truth Social directing all federal agencies to stop using Anthropic within six months, calling it an "out-of-control, Radical Left AI company." Hegseth then formally designated Anthropic a supply-chain risk, effectively forbidding military contractors from using its technology.

The aftermath is messy. OpenAI's Altman admitted the rushed contract was "opportunistic and sloppy." The revised OpenAI contract prohibits domestic surveillance of U.S. citizens via "commercially acquired personal or identifiable information" -- but notice the qualifier. It bars autonomous weapons only "in any case where law, regulation, or Department policy requires human control" -- leaving obvious gaps.

What is not being discussed enough is the structural incentive problem. Anthropic took an ethical stand and got punished. OpenAI rushed in and got the contract. Even after OpenAI walked back some of the terms, the message to the industry is clear: compliance gets rewarded, resistance gets penalized. The Batch's editorial rightly points out that Congress should be making these rules rather than leaving it to ad hoc power struggles between the Pentagon and tech companies. But Congress has shown little appetite for this kind of nuanced technology legislation, and there is no indication that will change soon.

Anthropic has vowed to sue, banking on courts invalidating the supply-chain designation. The legal theory is interesting -- this power was designed for foreign adversaries, not domestic companies exercising contractual discretion -- but the outcome is far from certain.

**Key takeaways:**
- Anthropic was designated a "supply chain risk to national security" for refusing to remove ethical restrictions from military contracts
- OpenAI signed a contract allowing "all lawful purposes" but later admitted the rush was a mistake
- The revised OpenAI contract contains carefully worded exceptions that leave significant room for interpretation
- The designation previously used only against foreign companies like Huawei and Kaspersky was applied to a U.S. company for the first time
- Congressional legislation on AI military use could prevent these ad hoc confrontations

**Tradeoffs:** Gain ethical consistency and brand integrity (Anthropic's position) but sacrifice government contracts and face potential business exclusion from the entire defense supply chain

**Link:** [U.S. Dept. of War Dismisses Anthropic, Embraces OpenAI](https://www.deeplearning.ai/the-batch/)

---

## Management for Agents: OpenAI's Frontier Platform

**TLDR:** OpenAI launched Frontier, a platform for managing corporate AI agent workforces -- building, sharing context, evaluating performance, and controlling access. Think of it as an HR system for your agents.

**Summary:**

Here is a question that sounds absurd until you think about it for thirty seconds: when your company deploys fifty AI agents across different teams, who manages them? Who knows which agents overlap in function? Who evaluates whether agent number thirty-seven is actually doing a good job? OpenAI is betting this becomes a real problem at scale, and Frontier is their answer.

Frontier provides a unified interface for managing agents regardless of the underlying frameworks and models. Each agent gets its own identity, permissions, and guardrails. Administrators can control which employees or groups can use specific agents, integrate data sources, and manage billing. Agents can share context -- access to data, tools, applications, and workflow information -- which starts to address the silos problem that plagued early enterprise AI deployments.

The evaluation features are particularly interesting for engineering teams. Based on what OpenAI has shown, you can set metrics grounded in truth data (like accuracy) or model-based assessments (like using an LLM to measure response quality). Agents can "build memories, turning past interactions into useful context," which implies they improve over time by recalling what worked in earlier interactions.

Cisco and T-Mobile are pilot customers, with HP, Intuit, and Uber in the pipeline. The limited rollout with dedicated engineering help tells you something important: this is early. OpenAI is essentially providing white-glove service to figure out what enterprise agent management actually needs to look like.

What is conspicuously absent from the announcement is any discussion of agent-to-agent conflicts. When you have multiple agents sharing context and building memories, what happens when Agent A's learned behavior contradicts Agent B's? What about cascading failures when shared context gets corrupted? Microsoft's competing product, Agent 365, focuses more on security and governance, which might be the more pragmatic starting point. OpenAI is emphasizing building and evaluation features, but in my experience, governance problems are what keep enterprise platform teams up at night.

The conceptual frame of "HR for agents" is cute, but it undersells the actual complexity. Human HR deals with people who can explain their reasoning. Agent management needs to handle entities that cannot always explain why they did what they did, operating in workflows where a single bad decision can cascade through automated systems at machine speed.

**Key takeaways:**
- Frontier provides unified management for enterprise AI agents across frameworks and models
- Each agent gets its own identity, permissions, guardrails, and evaluation metrics
- Agents can share context and build memories from past interactions
- Currently in limited pilot with Cisco and T-Mobile; broader rollout planned
- Competes with Microsoft's Agent 365, which focuses more on security and governance

**Tradeoffs:** Gain centralized visibility and control over agent deployments but accept vendor lock-in to OpenAI's management layer and early-stage platform risk

**Link:** [Management for Agents - OpenAI Frontier](https://www.deeplearning.ai/the-batch/)

---

## Agent Solves Stubborn Math Problems: Google's Aletheia

**TLDR:** Google researchers built Aletheia, an agentic system using Gemini 3 Deep Think that generated novel solutions to previously unsolved mathematical problems, including four new solutions to Erdos conjectures. Of 212 claimed solutions, only 13 were fully correct, and only four were genuinely novel.

**Summary:**

The headline sounds spectacular: AI solves previously unsolved math problems. But let us look at the actual numbers, because they tell a more nuanced and arguably more interesting story.

Aletheia is an agentic workflow with three components: a generator that produces initial solutions, a verifier that checks them, and a reviser that fixes flagged issues. All three are powered by Gemini 3 Deep Think, Google's most advanced reasoning mode. The workflow loops: generate, verify, revise or regenerate, until the verifier is satisfied or a call limit is reached. It is conceptually simple, which is part of what makes the results notable.

The researchers pointed Aletheia at 700 unsolved Erdos problems -- conjectures proposed by the prolific mathematician Paul Erdos between the 1930s and 1996. Aletheia claimed to solve 212 of them. Mathematicians then examined those claims. Of 200 cases where the problem and solution were unambiguous, 137 (68.5%) were wrong. 63 (31.5%) were technically correct under some interpretation. Only 13 (6.5%) were correct under the intended interpretation. Of those 13, nine had already been solved elsewhere. Four were genuinely novel.

So let us be honest about what happened: the system had a 2% success rate for novel contributions when measured against its total claims. That is not nothing -- four novel solutions to problems that stumped human mathematicians for decades is legitimately impressive. But framing this as "AI solves math problems" without the denominator is misleading.

What is genuinely valuable about this work is what it reveals about where agentic AI excels in research. The authors note that Aletheia works best when broad knowledge across mathematical subfields is helpful, but it lacks the depth of a human specialist. This is a pattern we see across AI applications: breadth over depth. For problems that sit at the intersection of multiple domains, these systems might genuinely accelerate discovery. For problems that require deep, creative insight within a single field, they remain limited.

The broader context adds weight: Google also released Gemini 3 Deep Think more broadly via API, and it achieves state-of-the-art results on multiple benchmarks including HLE (48.4%), ARC-AGI-2 (84.6%), and Codeforces (3455 Elo). The fact that fewer than 500 of Erdos's approximately 1,200 problems have been solved in total, but AI models have helped with around 100 in just the past six months, suggests we are in a period of rapid accumulation of low-hanging fruit. What happens when that fruit runs out will tell us more about the real capabilities of these systems.

**Key takeaways:**
- Aletheia uses a generate-verify-revise loop powered entirely by Gemini 3 Deep Think
- Of 212 claimed solutions to unsolved Erdos problems, only 4 were genuinely novel and correct (2% novel success rate)
- The system excels at problems requiring broad cross-domain knowledge but lacks specialist depth
- AI models have contributed to solving approximately 100 Erdos problems in the past six months
- Gemini 3 Deep Think achieves state-of-the-art results on HLE, ARC-AGI-2, and Codeforces benchmarks

**Tradeoffs:** Gain massive breadth of mathematical knowledge and tireless iteration but sacrifice the deep domain intuition and creative leaps that characterize breakthrough human mathematical research

**Link:** [Agent Solves Stubborn Math Problems - Google Aletheia](https://www.deeplearning.ai/the-batch/)