---
title: "AI Regulation, Voice Models, Geopolitics, and Mammograms: The Batch May 15, 2026"
excerpt: "U.S. government moves to pre-screen AI models, OpenAI launches configurable voice AI, China blocks Meta's Manus acquisition, and Google's breast cancer detection system passes real-world NHS tests."
publishedAt: "2026-05-15"
slug: "the-batch-may-15-2026-ai-regulation-voice-models-geopolitics-mammograms"
hashtags: "#thebatch #ai #ml #agents #security #llm #generated #en"
source_pattern: "The Batch"
---

## U.S. to Evaluate Upcoming Models Before Release

**TLDR:** The National Institute of Standards and Technology announced a new multi-agency task force called TRAINS that will assess national security risks from AI models before they go public. Major AI companies have voluntarily agreed to submit models for review, and the White House is weighing an executive order to make this mandatory.

**Summary:** Something interesting happened in Washington that's worth paying attention to. The Trump administration, which came into office explicitly focused on dismantling Biden-era AI regulations, has now done a fairly sharp reversal. NIST has set up TRAINS, which stands for Testing Risks of AI for National Security, a group that pulls in personnel from the Departments of Commerce, Defense, Energy, and Homeland Security, as well as the NSA and NIH. The mandate is to evaluate frontier AI models for risks in cybersecurity, biosecurity, and chemical weapons before those models reach the general public.

The backdrop here matters a lot. About a month before this announcement, Anthropic had disclosed that its Claude Mythos Preview model could autonomously exploit vulnerabilities in major operating systems and applications. That apparently got people's attention in a way that general policy arguments hadn't. The model had been shared with 50 organizations for defensive security purposes, but then the White House blocked plans to expand that to 70 more organizations, citing both national security concerns and questions about whether Anthropic had enough compute to serve existing users alongside the government.

What triggered the policy shift is not subtle: a concrete demonstration of a model that can break software. Before that, you had an administration philosophically committed to deregulation. After that, you have a multi-agency task force with teeth. The irony is that Google, Microsoft, and xAI have agreed to provide model versions with reduced or absent safety guardrails for testing, while Anthropic and OpenAI had already agreed to similar terms back in 2024. So we now have a situation where companies are voluntarily handing over the most capable and least constrained versions of their models to a government body whose benchmarks and evaluation criteria have not been publicly disclosed.

CAISI, the parent body for TRAINS, has previously used an aggregate of nine public benchmarks covering cybersecurity, coding, mathematics, natural sciences, and abstract reasoning, plus an internal test called PortBench that evaluates porting command-line tools across programming languages. Whether TRAINS will use the same rubric, something narrower, or something entirely new is unknown.

**Key takeaways:**
- TRAINS is a new multi-agency task force under NIST designed for rapid response, not the slower standards-setting that NIST typically does
- Anthropic's announcement that Claude Mythos Preview could exploit software vulnerabilities appears to have directly catalyzed this policy shift
- Companies are voluntarily submitting models now; a mandatory executive order is being discussed
- Neither the evaluation benchmarks nor the consequences for models that fail review have been publicly disclosed

**Why do I care:** The part that I think gets underweighted in coverage of this is the competitive angle. If you require pre-release government approval in the U.S. but not elsewhere, you are handing a timing advantage to anyone outside that regulatory perimeter. DeepSeek, Mistral, whoever comes next from a country with no such requirement can ship while U.S. labs are in a review queue. That said, the alternative, frontier models that can autonomously exploit production software shipped with no evaluation whatsoever, is not obviously better. I don't think there's a clean answer here, but I'd push hard for the benchmark methodology to be public, the review timelines to be bounded, and the criteria to be developed with industry input rather than imposed unilaterally.

---

## OpenAI Challenges Speech-to-Speech Leaders

**TLDR:** OpenAI introduced three new audio models including GPT-Realtime-2, a speech-to-speech model with five configurable levels of reasoning effort. The tradeoff between speed and quality is now explicit and tunable, which is a meaningful design shift for voice AI applications.

**Summary:** OpenAI has released GPT-Realtime-2 along with two companion models, GPT-Realtime-Translate and GPT-Realtime-Whisper, all available through the Realtime API. The design philosophy behind GPT-Realtime-2 is the most interesting part. Rather than picking a fixed point on the speed-versus-reasoning tradeoff, the model exposes five levels, from minimal through xhigh, and lets the application developer choose. At minimal reasoning you get audio back in about 1.12 seconds. At high reasoning that climbs to 2.33 seconds.

The end-to-end architecture matters here. GPT-Realtime-2 processes audio in and audio out as a single unified process, including the reasoning step, rather than chaining together separate speech-to-text, text generation, and text-to-speech components. That pipeline approach adds latency at every seam, and eliminating those seams is what makes the lower latency figures possible.

There are some genuinely nice UX details in how the model handles tool calls. It can narrate its own work in progress, saying things like "checking your calendar" or "looking that up now" while it processes. It can also issue optional preambles before responding. These are not just surface features. They address a real problem in voice interfaces, which is that silence while a model reasons feels like failure to most users. Having the model speak during its own processing keeps the interaction feeling live.

The benchmark picture is mixed in an instructive way. On Scale AI's Audio MultiChallenge with xhigh reasoning, GPT-Realtime-2 placed first with a 48.45 percent average pass rate, a significant jump from its predecessor's 34.73 percent. But the two models ahead of it on the Artificial Analysis Speech Reasoning leaderboard, Step-Audio R1.1 Realtime and Grok Voice Think Fast 1.0, are also faster. Step-Audio takes 1.51 seconds to first audio, Grok takes 1.25 seconds, both beating GPT-Realtime-2's 2.33 seconds at high reasoning. And that overall pass rate below 50 percent on Scale AI's multi-turn benchmark, even at xhigh reasoning, is a useful reminder that reliable multi-turn spoken dialogue remains genuinely hard.

**Key takeaways:**
- Five reasoning levels (minimal through xhigh) allow explicit tuning of the speed-accuracy tradeoff per application
- End-to-end audio processing eliminates pipeline latency from chained speech-to-text plus text generation plus text-to-speech architectures
- The model narrates tool calls aloud during processing, addressing the silence problem in voice UX
- Competing models from Step and Grok are faster while still topping speech reasoning benchmarks
- Overall pass rate under 50 percent on multi-turn spoken dialogue suggests this remains an unsolved problem

**Why do I care:** The configurable reasoning effort is the right abstraction. A voice interface for a customer service agent handling airline rebooking needs different tradeoffs than a real-time conversational companion. Baking that choice into the API rather than training separate model variants for different use cases is a sensible engineering decision. What I'd want to understand better is how the latency figures hold up under real network conditions and server load, not just controlled benchmark environments. The 1.12-second minimum is promising, but 500 milliseconds is where voice interactions start feeling natural, and nobody is there yet.

**Link:** [OpenAI Realtime API announcement](https://openai.com/blog/realtime-api)

---

## China Nixes Meta-Manus Tie-Up

**TLDR:** China's National Development and Reform Commission blocked Meta's proposed $2.5 billion acquisition of Manus, an AI agent startup that was founded in China and relocated to Singapore. The decision has sent a chill through Chinese tech founders who had been using the "Singapore strategy" to access Western capital.

**Summary:** This story is about more than one blocked deal. Manus is a general-purpose AI agent built by Butterfly Effect, a company founded in China. The agent handles long-running tasks with minimal user input and had reached $100 million in annual recurring revenue growing at 20 percent monthly by end of 2025. The company relocated to Singapore in July 2025, which was widely understood as a move to position itself outside Beijing's direct regulatory authority.

Meta announced in December that it was acquiring Manus for as much as $2.5 billion and planned to integrate the technology into Facebook, Instagram, and WhatsApp while continuing to operate Manus independently. That announcement apparently triggered scrutiny from China's NDRC, which opened a security review in January citing concerns about data transfers and foreign ownership of services operating in China. In April, the agency blocked the deal entirely.

The NDRC's decision signals something with broader implications than the specific acquisition. It establishes that Beijing considers technology developed by Chinese engineers in China to be strategically important Chinese technology, regardless of where the company subsequently incorporated. The "Singapore strategy" assumed that relocation gave founders freedom to raise from foreign investors and pursue international partnerships. The NDRC's position is that this assumption was wrong.

The consequences are rippling through Chinese tech's founding community. Founders who had plans to incorporate abroad, pursue acquisitions, or raise from U.S. and European sources are cancelling those plans. The strategic optionality that Singapore incorporation provided is now much more limited. Meanwhile, leaders of the U.S. and China were meeting this week to discuss geopolitical concerns including AI, and there's a possibility an agreement could ease technology flows. But given the escalating pattern of export controls, blacklistings, and now this acquisition block, hoping for a negotiated thaw seems optimistic.

**Key takeaways:**
- China's NDRC asserted authority over technology developed by Chinese engineers regardless of where the company subsequently relocated
- The "Singapore strategy" of relocating to Singapore to access Western capital has effectively been invalidated for strategically important technology
- Chinese tech founders are cancelling plans to move abroad or raise from Western sources
- The geopolitical backdrop includes escalating U.S. semiconductor export controls and Chinese rules reducing reliance on Western technology

**Why do I care:** From a technology product perspective, this matters because it changes the market structure for agentic AI. Meta was going to absorb one of the more capable and well-validated general-purpose agent systems into its platform of three billion users. That integration is now off the table. For anyone building on top of or competing with Meta's AI product suite, the absence of Manus technology is a meaningful variable. More broadly, this is an example of how geopolitical decisions directly shape the competitive landscape of AI products and platforms, not through technical factors but through regulatory ones.

---

## AI Mammogram Diagnosis Under Real-World Conditions

**TLDR:** Two studies evaluated Google's breast cancer detection AI system, first introduced in 2020, against real NHS patient data. The system identified more cancers with fewer missed cases than the first of two human evaluators, and caught a quarter of cancers that were initially missed by doctors but became apparent three years later.

**Summary:** Google's AI system for breast cancer screening has been around since 2020 and was licensed to iCAD in 2022, with a 20-year worldwide commercialization agreement signed in 2023. Despite all that, it still hasn't been used to diagnose actual current patients. These two studies, conducted by researchers at Google, Imperial College London, University of Surrey, and several NHS Breast Screening Centres, are the most thorough real-world evaluation of how the system would actually integrate with UK clinical workflows.

The system uses three convolutional neural networks trained on a large mammography database. The networks handle three distinct functions: generating embeddings from mammogram images, identifying potentially cancerous regions, and classifying the probability of cancer. This isn't a single monolithic classifier; it's a pipeline of specialized components.

The retrospective study looked at 116,000 mammograms from women aged 50 to 70 taken at five hospitals in 2016. The AI achieved a sensitivity of 0.541, meaning it correctly identified 54.1 percent of actual cancer cases, compared to 0.437 for the first human evaluator. Its specificity was 0.943 versus the human's 0.952, lower but statistically indistinguishable. The most striking result was that the system identified 25 percent of cases that human doctors had initially missed but that became apparent as cancer three years later. Catching cancers before they become clinically obvious is where the clinical value concentrates.

The simulation of replacing the second human reader with the AI system showed better sensitivity and specificity, and despite the AI routing more cases to an arbitration panel (5,300 total, about 1,800 more than baseline), the authors calculated a roughly 40 percent reduction in overall human effort, because the AI processed the majority of cases without requiring additional human review.

The live study used 9,250 fresh scans across 12 clinics during a few months in 2023 and 2024. Critically, neither patients nor doctors were told what the AI system found, so patient care was not affected. The AI's median processing time was 17.7 minutes from scan to interpretation. The first human evaluation took more than two days. The accuracy results were consistent with the retrospective study.

The trust problem is real and worth taking seriously. Some doctors in the study reported distrust of the AI's output. This isn't irrational conservatism. Doctors have legal and professional accountability for their diagnoses. Accepting an AI recommendation without fully understanding how it reached that recommendation creates accountability ambiguity that any reasonable clinician would find uncomfortable.

**Key takeaways:**
- The system's sensitivity (54.1 percent) significantly exceeded the first human evaluator (43.7 percent) in the retrospective study
- It identified 25 percent of cancers that humans initially missed but became apparent three years later
- Processing time of 17.7 minutes versus two-plus days for the first human evaluation
- Simulated use as second reader could reduce human effort by roughly 40 percent while improving accuracy
- Some clinicians reported distrust of the system's output, pointing to a gap between technical performance and clinical adoption

**Why do I care:** The trust gap is the interesting problem here, not the accuracy. The numbers are good and getting better. But healthcare adoption of AI is stuck at the interface between demonstrated statistical performance and individual clinical accountability. A doctor who accepts an AI recommendation and the patient later has a bad outcome faces very different professional consequences than a doctor who followed standard protocol and had the same outcome. Until that accountability structure is addressed, either through regulation, liability reform, or interface design that makes the AI's reasoning more transparent, performance improvements alone won't drive adoption. This is fundamentally a systems design problem, not a model quality problem.

**Link:** [Google breast cancer detection study](https://www.nature.com/articles/s41591-025-03584-3)
