---
title: "Gemini Flash Gets Pricey, EU Blinks on AI Rules, and Agents Are Flooding the Web"
excerpt: "Google's updated Gemini 3.5 Flash brings real agentic capability gains at three times the cost, the EU delays and softens its AI Act, AI-driven internet traffic nearly tripled in 2025, and researchers show staged image generation beats composing everything at once."
publishedAt: "2026-05-29"
slug: "gemini-flash-pricey-eu-ai-act-delays-agents-web-traffic"
hashtags: "#thebatch #ai #ml #agents #llm #regulation #research #imagegeneration #generated #en"
source_pattern: "The Batch"
---

## Gemini Flash Gets Pricey, EU Blinks on AI Rules, and Agents Are Flooding the Web

**TLDR:** Google launched Gemini 3.5 Flash with strong agentic performance benchmarks but at three times the price of its predecessor, the EU agreed to delay and soften key AI Act provisions, and a cybersecurity firm found that AI-driven internet traffic nearly tripled in 2025 driven by crawlers, scrapers, and a rapidly growing class of agentic browsers.

---

## The AI Engineer Role Is Growing Up, Just Not How You Think

**TLDR:** The rise of AI Forward Deployed Engineers is real, but Andrew Ng argues the bigger opportunity is in the much larger pool of AI Engineers who can build software using AI components and work effectively with AI coding tools.

**Summary:** The AI Forward Deployed Engineer has become a buzzy Silicon Valley job title, the kind of role that gets written up in profiles and shows up in pitch decks. The FDE concept is not new, Palantir pioneered it roughly two decades ago by embedding engineers inside government clients working on air-gapped networks. What's new is that OpenAI and Anthropic are both now building their own FDE teams to seat engineers directly inside client organizations, helping customize agentic workflows.

I think the appeal of the FDE narrative is obvious. It sounds like a high-touch, high-value role where the AI expertise goes directly to where decisions are made. And there's truth to that. But the framing misses something important about scale. A company might take on a handful of vendor FDEs, but it needs far more of its own people building things. The FDE is someone else's employee, with someone else's incentives, tightly coupled to a specific vendor's product. In an era where no one can confidently predict which AI provider will dominate in 18 months, that kind of lock-in is a real cost.

The argument for AI Engineers, by contrast, is that they can work across the full stack of AI components: prompts, agentic frameworks, evaluation pipelines, AI coding assistants. They build the software that wraps these components into products. And right now demand for those skills is outpacing supply. The role is still quite generalist. Over the coming decade, Ng expects it to fragment the way software engineering did, into specializations like LLMOps, Evals Engineering, AI Data Engineering, and others that don't have names yet.

Whether you're skeptical of the AI Engineer hype or fully bought in, the underlying point holds: the FDE model is a wedge, not the whole market. Most organizations will need to build internal capability, not just hire vendors to do it for them. That is where the actual volume of job growth lives.

**Key takeaways:**
- FDEs embed within client organizations to customize AI workflows, but they serve vendor interests and reduce technology optionality
- AI Engineers who can build with AI components and use AI coding tools are in higher demand at greater scale
- The AI Engineer role is expected to specialize further over the next decade, similar to how software engineering fragmented

**Why do I care:** As a frontend developer or architect, this framing is useful for career positioning. The coding tools named directly, including Claude Code, Codex, and others, are the ones you're likely already using or evaluating. The practical implication is that building literacy across the full AI-augmented development stack matters more than deep specialization in a single vendor's platform right now.

**Link:** [The Batch — May 29, 2026](https://www.deeplearning.ai/the-batch/)

---

## Gemini 3.5 Flash: Faster and Smarter, But No Longer Cheap

**TLDR:** Google's updated mid-tier multimodal model posts top results on several agentic and visual reasoning benchmarks, but at three times the price of its predecessor, the Flash tier no longer signals affordable inference.

**Summary:** Google announced Gemini 3.5 Flash at Google I/O 2026, and the benchmarks are genuinely strong in some areas. On APEX-Agents-AA, a benchmark built around long-running agentic tasks drawn from investment banking, legal work, and consulting, Gemini 3.5 Flash scored 47.1 percent accuracy, nearly 10 points ahead of GPT-5.5. On MMMU-Pro, which tests visual reasoning across academic disciplines, it hit 84 percent, the highest recorded at the time. On ARC-AGI-2, it reached 72.1 percent, behind Gemini 3.1 Pro Preview and GPT-5.5 on high reasoning but still competitive. Those are not incremental improvements. They represent a real step up in agentic capability and speed.

The pricing story is less flattering. Google marketed the model as often costing less than half of competing models. Independent testing by Artificial Analysis found that Gemini 3.5 Flash running agentic workloads actually costs more than Gemini 3.1 Pro, not less. The API rate is $1.50 per million input tokens and $9.00 per million output tokens. That is three times the cost of Gemini 3 Flash. This is not unique to Google. Anthropic, OpenAI, and Google have all raised per-token prices on their newer flagship and mid-tier models. The market is moving upmarket.

It is worth noting what "Flash" now means. When Flash launched, it was the budget tier below Pro and Ultra, a smaller and faster option for cost-sensitive workloads. Gemini 3.5 Flash is now positioned closer to Anthropic's Sonnet in capability and pricing. The light, cheap inference tier has effectively moved down to Nano. This is a meaningful rebrand, even if Google has not called it that.

The Google I/O announcements also included a revamped version of Antigravity, Google's AI coding tool, now focused on managing agents rather than mimicking a traditional IDE. Google also introduced Omni Flash, a lightweight model for generating video from multimodal inputs. And Gemini 3.5 Flash now powers a more conversational Search experience that surfaces AI-generated summaries with citations instead of ten blue links.

**Key takeaways:**
- Gemini 3.5 Flash leads several agentic and visual benchmarks but trails GPT-5.5 on ARC-AGI-2 and overall coding
- Its pricing is three times Gemini 3 Flash, and independent tests show it costs more than Gemini 3.1 Pro on agentic workloads
- Flash no longer means budget inference; the tier has shifted to mid-level capability and pricing

**Why do I care:** If you're building applications that call models in agentic loops or need fast multimodal inference, the Gemini 3.5 Flash benchmarks are worth taking seriously. The APEX-Agents-AA lead over GPT-5.5 is substantial. But pricing assumptions from a year ago no longer hold, and you should benchmark actual costs on your specific workload before treating any Flash-tier model as cheap.

**Link:** [Google launches Gemini 3.5 Flash](https://blog.google/technology/google-deepmind/gemini-3-5-flash/)

---

## Europe Delays and Softens Its AI Rules

**TLDR:** The European Parliament and member states agreed to delay several provisions of the AI Act and ease compliance burdens on developers, citing competitiveness concerns, though the core risk-based framework remains intact.

**Summary:** The EU's AI Act, passed in 2024 and widely described as the world's most stringent AI regulation, is being amended before much of it has even taken effect. The changes agreed by the European Parliament and member states push back deadlines for high-risk AI applications, extend compliance windows for AI-driven products like machinery and toys, and adjust how personal data can be used in training and deployment. Requirements for high-risk systems in law enforcement, critical infrastructure, and employment now have a deadline of December 2027, moved from August 2026.

The amendments have a clear political backstory. European businesses have been lobbying against the Act practically since it was drafted. In 2023, executives at 163 companies called it bureaucratic. In 2025, 110 companies pushed for postponement citing unclear and overlapping requirements. Major German firms including Siemens and SAP argued directly that the rules were holding them back. Two influential reports, one from Italy's former Prime Minister Enrico Letta and another framing Europe's stagnating growth as an existential challenge, built the intellectual case for a competitiveness-first approach.

There is a real argument on both sides here. The original Act contained provisions that were genuinely unclear and hard to comply with in practice, so some simplification is defensible. The concept of AI posing "systemic risks" in the financial or infrastructure sense is still mostly theoretical, and vague mandates tend to slow innovation without producing safety benefits anyone can measure. At the same time, consumer groups are not wrong to notice that these amendments arrived largely because business lobbies pressed for them, not because the law was proven to cause harm. The European Consumer Organization said the changes create dangerous loopholes. That concern is at least worth taking seriously rather than dismissing.

The amendments also include one strengthening move: they ban generation of sexually explicit images of children and non-consensual nude images. Separately, the European Commission withdrew a proposed AI Liability Directive earlier in 2026, removing the mechanism that would have created EU-wide standards for lawsuits over AI-caused harm.

**Key takeaways:**
- High-risk AI deadlines pushed from August 2026 to December 2027, giving developers more time to comply
- Smaller companies and "small mid-cap" firms get lighter compliance requirements
- The AI Liability Directive was withdrawn separately, removing EU-wide legal liability standards for AI harms

**Why do I care:** If your organization ships software that touches EU markets and falls into a high-risk category under the AI Act, the deadline extension is directly relevant and worth reviewing with your legal team. For most frontend and product developers the practical impact is still distant, but the direction of travel matters: the EU is pulling back from its most aggressive enforcement timeline, which reduces near-term compliance urgency without eliminating eventual requirements.

**Link:** [EU amends AI Act](https://www.europarl.europa.eu/news/en/press-room/20250101IPR20000/)

---

## AI Agents Are Flooding the Web, and Much of It Is Malicious

**TLDR:** AI-driven internet traffic nearly tripled in 2025 according to cybersecurity firm Human Security, with agentic browsers growing 80x year over year, and a significant share of automated traffic classified as malicious.

**Summary:** Human Security, a cybersecurity firm that monitors traffic across around 1,200 customers in more than 200 countries, published its 2026 State of AI Traffic and Cyberthreat Benchmark Report based on over one quadrillion internet interactions observed in 2025. The headline finding is stark: AI-driven traffic nearly tripled over the course of the year. Human traffic grew by about 3 percent. Conventional automated bot traffic grew 23 percent. AI-driven traffic was in a different category entirely.

The breakdown is worth examining. Crawlers collecting training data made up 68 percent of AI-driven traffic, more than double the prior year's volume. Scrapers harvesting data for immediate use accounted for 32 percent, a sevenfold increase. Agentic browsers, the ones executing actual browser-style tasks like navigating product pages, creating accounts, and completing transactions, were just 1.7 percent of AI-driven traffic by December. But that slice grew nearly 80 times year over year. That growth rate is the number to watch, because the base was small and the trajectory is steep.

OpenAI accounted for roughly 69 percent of automated traffic, including ChatGPT users, its OAI-SearchBot for crawling, and GPTBot. Meta accounted for 16 percent, and Anthropic around 11 percent. More than 95 percent of AI-driven traffic targeted retailing and ecommerce, streaming and media, or travel and hospitality.

The security implications are uncomfortable. Malicious scraping, defined as traffic that spoofed its identity, followed recognized attack patterns, or otherwise behaved suspiciously, rose nearly 47 percent. More than 60 percent of the 750,000 threat profiles the researchers identified involved malicious scraping. Account takeover attempts fell 30 percent overall, but attacks after an account was already logged in rose fourfold. The number of attacks where an agent created a new account rose 89 percent from the prior year. These are not theoretical risks anymore.

The report has an obvious caveat: it reflects only traffic Human Security observes on its own platform, and malicious traffic frequently misrepresents its origin. But the directional signal is consistent with what other sources are observing. Infrastructure, rate limiting, fraud detection, and bot mitigation systems designed for the pre-agent web need rethinking.

**Key takeaways:**
- AI-driven internet traffic nearly tripled in 2025; agentic browser traffic grew nearly 80x year over year
- OpenAI drove 69 percent of automated traffic, Meta 16 percent, Anthropic 11 percent
- Malicious scraping rose 47 percent; agent-initiated account creation attacks rose 89 percent

**Why do I care:** This one hits directly. If you build web applications with authentication, shopping flows, or content-heavy pages, the behavior of AI agents is no longer an edge case. Rate limiting that catches conventional bots will not necessarily catch agents that mimic human session patterns. The 80x growth in agentic browsing means this will get significantly worse before it gets better. Plan accordingly.

**Link:** [2026 State of AI Traffic and Cyberthreat Benchmark Report — Human Security](https://www.humansecurity.com/learn/reports/2026-state-of-ai-traffic-cyberthreat-benchmark-report)

---

## Staged Image Generation: Teaching Models to Build and Check Their Own Work

**TLDR:** Researchers from Meta and several universities fine-tuned an image generation model to compose images in discrete stages, planning each step, sketching it, inspecting the result, and correcting before continuing, with results that beat existing methods on spatial accuracy and real-world knowledge.

**Summary:** Text-to-image generators have a persistent problem: they look good but frequently get the details wrong. Ask for a bear hovering above a silver spoon and you might get a bear, a spoon, and a plausible-looking scene, but the spatial relationship between the two objects is often wrong. Fingers come out malformed, object counts drift, and attribute bindings break down. These are not edge cases. They are systematic failures in how diffusion and flow-matching models compose images, because the entire image is generated holistically, with no mechanism for checking whether intermediate states match the prompt.

Researchers at Meta, UC San Diego, Worcester Polytechnic Institute, and Northwestern University addressed this with a fine-tuning method that trains a model to build images in stages. Starting from a multimodal model called BAGEL-7B, which can take image and text inputs and produce image and text outputs, they created a loop: plan the next change, sketch an updated image, inspect whether the result matches the prompt, and refine if not. For a prompt like "a bear hovering above a silver spoon," the first iteration might add the bear, the second adds the spoon in the wrong position, then the inspect stage catches the error and the refine stage corrects it.

The training data was generated synthetically. For the plan and sketch stages, the authors generated 32,000 examples using GPT-4o to transform image prompts into scene graphs, then produced incremental images using FLUX.1 Kontext. For the inspect stage, they generated roughly 15,000 examples where GPT-4o evaluated whether intermediate descriptions conflicted with the original prompt and produced corrective instructions. For the refine stage, they used a dataset of flawed images paired with text reflections and improved versions.

The results on GenEval, which measures how many prompted details appear in the final image, improved from 77 percent to 83 percent with only 62,000 training examples and 131 flow-matching steps. PARM, a competing approach that critiques intermediate diffusion states, hit 77 percent but required 688,000 examples and 1,000 steps. The fine-tuned model also improved on real-world knowledge tasks, correctly placing scenes in historical eras and generating more chemically plausible laboratory images. The analogy the authors draw is a good one: this is to image generation what chain-of-thought reasoning is to language models.

**Key takeaways:**
- Staged image generation, with explicit plan, sketch, inspect, and refine steps, outperforms holistic generation on spatial accuracy and attribute binding
- The method achieves better results with far fewer training examples and fewer inference steps than competing approaches
- The approach generalizes to real-world knowledge tasks, not just spatial composition

**Why do I care:** This is primarily a research result and not something that shows up in the tools you use today. But it has practical downstream relevance: if this technique or variants of it make it into production image generators, prompt-to-image fidelity for complex spatial descriptions should improve meaningfully. For anyone building products that rely on image generation for UI mockups, asset creation, or content pipelines, that matters.

**Link:** [Planning Generated Images In Stages — research paper](https://arxiv.org/abs/2505.00000)
