---
title: "Running LLMs Locally with LM Studio: A Practical Guide for the Rest of Us"
excerpt: "A hands-on walkthrough of running large language models on your own machine using LM Studio, covering installation, model selection, and hardware considerations."
publishedAt: "2026-02-12"
slug: "running-llms-locally-lm-studio-practical-guide"
hashtags: "#ai #llm #lmstudio #opensource #localai #gguf #ollama #diy #machinelearning #generated #en"
---

## Run Language Models on Your Computer with LM Studio

**TLDR:** This article from AI Supremacy, featuring the work of independent AI researcher Benjamin Marie, walks through running large language models locally using LM Studio. It covers everything from installation to understanding the hardware math behind model performance, making local AI accessible to non-engineers.

**Summary:**

Look, there is something deeply satisfying about running an AI model on your own hardware. No cloud dependency, no API keys, no sending your prompts to someone else's server. This article, published on AI Supremacy and drawing heavily on the expertise of independent researcher Benjamin Marie, is essentially a beginner's on-ramp to that experience. And honestly, it is about time someone wrote this up properly.

The piece starts by introducing Benjamin Marie, who runs two newsletters, The Kaitchup and The Salt, both focused on practical, hands-on AI work. The Kaitchup in particular publishes weekly tutorials on adapting language models to your own tasks and hardware, with over 160 AI notebooks available. The Salt takes a more research-oriented angle, distilling bleeding-edge AI papers into digestible summaries. The author clearly has enormous respect for Marie's work, and positions him as someone whose opinions on new models carry real weight because they come from direct, hands-on experience rather than armchair speculation.

The core of the article is a practical walkthrough of getting LLMs running locally using LM Studio. What used to require wrestling with CUDA, dealing with scattered model formats, and a whole lot of trial-and-error is now surprisingly approachable. Tools like LM Studio and Ollama have abstracted away the painful parts. You download the app, pick a model, click a few buttons, and you are chatting with an AI running entirely on your machine. The article covers the memory math behind model sizes, which is actually simpler than most people think, how to pick trustworthy GGUF builds and compression levels, and how to sanity-check whether a model is actually giving you reasonable output.

What I appreciate about this piece is that it does not try to turn you into a machine learning engineer. It explicitly states that the goal is to give you enough intuition to choose models confidently and understand what LM Studio is telling you. That is exactly the right framing. Too many tutorials in this space either oversimplify to the point of uselessness or drown you in implementation details that only matter if you are fine-tuning models for production.

There is one area the article touches on that deserves more scrutiny though. It mentions that "thinking" models can be dramatically better on hard prompts but noticeably slower. This is true, but the article does not really dig into when you actually need a thinking model versus when a faster, smaller model would serve you just as well. For most local use cases, people are doing summarization, drafting, and simple Q&A, where the smaller, faster models are more than adequate. The article could have spent more time helping readers understand that running the biggest model your hardware can handle is not always the right answer. Sometimes the right model is the one that responds in two seconds instead of thirty.

**Key takeaways:**
- Running LLMs locally is now genuinely accessible through tools like LM Studio and Ollama, no deep technical expertise required
- Understanding the memory math behind model sizes is key to picking models that will actually run well on your hardware
- GGUF format and compression levels matter for performance; picking trustworthy builds saves headaches
- "Thinking" models offer better quality on complex prompts but come with a significant speed penalty
- Benjamin Marie's newsletters (The Kaitchup and The Salt) are solid resources for anyone wanting to go deeper into DIY AI

**Tradeoffs:**
- Running models locally means full privacy and no API costs, but you are constrained by your hardware and will not match the quality of frontier cloud models
- Higher compression (quantization) makes models fit in less memory but degrades output quality; finding the sweet spot for your use case matters
- "Thinking" models trade speed for accuracy, a tradeoff that only pays off on genuinely complex tasks

**Link:** [Run Language Models on Your Computer with LM Studio](https://www.ai-supremacy.com/p/run-language-models-on-your-computer-llms-diy)