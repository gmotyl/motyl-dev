---
title: "The Batch: OpenAI's GPT-5.2, Runway's Interactive Worlds, and Disney's AI Alliance"
excerpt: "This week's edition of The Batch covers OpenAI's response to Gemini 3 with GPT-5.2, Runway's new GWM-1 family of world models, Disney's partnership with OpenAI, and a new method for adapting LLMs to new data types with few examples."
publishedAt: "2025-12-18"
slug: "the-batch-openai-gpt-5-2-runway-interactive-worlds-disney-ai-alliance"
hashtags: "#thebatch #ai #llm #openai #gpt5 #disney #runway #generated #en"
---

## OpenAI’s Answer to Gemini 3: GPT-5.2

**TLDR:** OpenAI has launched GPT-5.2, a new suite of models, just weeks after Google's Gemini 3 announcement. GPT-5.2 boasts significant improvements in reasoning and cost-efficiency.

**Summary:**
In a clear response to the competitive pressure from Google's Gemini 3, OpenAI has released GPT-5.2. This new family of models includes GPT-5.2 Pro, GPT-5.2 Thinking, and GPT-5.2 Instant, each tailored for different tasks from high-accuracy reasoning to fast, multi-step planning. The new models are not just more capable but also dramatically more cost-effective. For example, a task on the ARC-AGI-1 benchmark that cost $4,500 a year ago can now be solved for about $12 with GPT-5.2 Pro.

This rapid improvement and cost reduction in AI capabilities has significant implications for architects and teams. High-level reasoning tasks that were once prohibitively expensive are becoming accessible, opening up new possibilities for AI-powered applications and agents. The ability to adjust the reasoning level via the API also provides a new layer of control for developers to balance performance and cost. The "code red" at OpenAI, though denied, seems to have spurred a significant leap forward.

**Key takeaways:**
- GPT-5.2 comes in three versions: Pro, Thinking, and Instant.
- Significant improvements in reasoning and performance on benchmarks.
- Drastic reduction in the cost of high-level reasoning tasks.
- New features include adjustable reasoning levels and context summarization.

**Link:** [Introducing GPT-5.2](https://openai.com/blog/gpt-5-2)

## Coherent, Interactive Worlds with Runway's GWM-1

**TLDR:** Runway has introduced GWM-1, a family of "general world models" that can generate coherent, interactive video scenes in real time.

**Summary:**
Runway is pushing the boundaries of video generation with its new GWM-1 models. Unlike traditional video generation models that create a whole clip at once, GWM-1 is autoregressive, generating one frame at a time. This allows for real-time user interaction and control. The family includes GWM Worlds for creating consistent scenes, GWM Robotics for generating synthetic training data for robots, and GWM Avatars for creating conversational characters.

For developers and creators, this represents a shift from static video generation to dynamic, interactive world simulation. The ability to maintain spatial consistency and respond to user input in real-time opens up new applications in gaming, robotics, and augmented reality. The distinction between models that generate real-time controllable videos and those that export 3D assets is becoming a key differentiator in the world-model landscape.

**Key takeaways:**
- GWM-1 is a family of autoregressive world models for real-time video generation.
- Includes models for scenes (Worlds), robotics (Robotics), and conversational characters (Avatars).
- Enables real-time user interaction and maintains scene consistency.
- Aims at applications beyond entertainment, including industrial and scientific use cases.

**Link:** [Introducing GWM-1](https://runwayml.com/blog/introducing-gwm-1/)

## Disney Teams Up With OpenAI

**TLDR:** Disney has entered into a 3-year exclusive agreement with OpenAI to license its characters for use in the Sora video generation app, and has taken a $1 billion stake in the company.

**Summary:**
In a landmark deal, Disney is embracing generative AI by allowing OpenAI to train its Sora video generation app on over 200 of its iconic characters, from Mickey Mouse to Darth Vader. Starting in 2026, Sora users will be able to create 30-second clips featuring these characters. Disney will also stream a selection of these user-generated videos on Disney+ and will become a major customer of OpenAI, providing ChatGPT to its employees.

This partnership is a significant move for both companies. For Disney, it's a way to engage with a new generation of creators and potentially create a new revenue stream, while also hedging against the rise of AI-generated content. For OpenAI, it's a major win, providing access to a treasure trove of valuable intellectual property. The deal also highlights a growing trend of major media companies partnering with AI startups to gain a foothold in the rapidly evolving world of generative media.

**Key takeaways:**
- Disney characters will be available in OpenAI's Sora video generation app.
- Disney has invested $1 billion in OpenAI.
- User-generated videos featuring Disney characters will be streamed on Disney+.
- The deal is part of a broader trend of media companies partnering with AI startups.

**Link:** [Disney, in a First, Lets OpenAI Use Its Characters in Sora Videos](https://www.nytimes.com/2025/12/11/business/media/disney-openai-sora-deal.html)

## Adapting LLMs to Any Sort of Data with SEMI

**TLDR:** Researchers have developed a new method called Sample-Efficient Modality Integration (SEMI) that allows a large language model to process new data types, even in specialized domains, with as few as 32 examples.

**Summary:**
A major challenge in applying LLMs to specialized fields like radiology or astronomy is the lack of large, text-paired datasets. SEMI offers a solution by enabling an LLM to learn to process new data modalities with a very small number of examples. The key idea is to train a projector on data-rich domains to learn the general skill of adapting to new data types. Then, a LoRA generator can create a specific adapter for a new, data-poor domain using only a handful of examples.

This is a significant breakthrough for the adoption of AI in technical and scientific fields. It dramatically lowers the barrier to entry for using LLMs with specialized data, as it removes the need to create massive, expensive datasets. For architects and researchers, this means that the power of large language models can be brought to bear on a much wider range of problems, accelerating research and development in fields that have so far been underserved by the AI revolution.

**Key takeaways:**
- SEMI allows LLMs to process new data types with very few examples.
- It uses a general projector trained on data-rich domains and a LoRA adapter for new domains.
- It significantly lowers the cost and effort of adapting LLMs to specialized fields.
- Could accelerate the adoption of AI in science and technology.

**Link:** [Sample-Efficient Modality Integration](https://arxiv.org/abs/2512.08588)
