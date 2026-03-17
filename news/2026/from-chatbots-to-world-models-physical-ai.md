---
title: "From Chatbots to World Models: The Push for Physical AI"
excerpt: "The AI industry is making a $6 billion bet that the next frontier isn't smarter chatbots — it's machines that actually understand physics. Yann LeCun's AMI Labs, Fei-Fei Li's World Labs, and DeepMind are all racing to build AI that grasps the consequences of its actions in the real world."
publishedAt: "2026-03-16"
slug: "from-chatbots-to-world-models-physical-ai"
hashtags: ["#AI", "#MachineLearning", "#Robotics", "#WorldModels", "#PhysicalAI", "#generated", "#en"]
---

## From Chatbots to World Models: The Push for Physical AI

**TLDR:** The AI industry is pivoting from systems that understand human language and intent to systems that understand physical reality. AMI Labs — Yann LeCun's new Paris-based startup — just raised a $1.03 billion seed round at a $3.5 billion valuation, the largest seed round in European history, to build world models based on his Joint Embedding Predictive Architecture (JEPA). The goal: AI that doesn't just know what you mean, but knows what happens next.

**Summary:**

There's a gap between what current AI systems are good at and what the world actually needs them to do, and that gap is roughly the size of a mining rig. Every frontier model you interact with today — GPT, Gemini, Claude — lives in a world of bits, not atoms. They're trained to understand and generate human meaning, operating within the comfortable abstractions of finance, literature, product strategy, and code. But when you need an autonomous system to navigate a self-driving truck through a construction zone, or manipulate heavy machinery in a zero-g mining environment, the ability to eloquently summarize a paragraph becomes completely irrelevant. What you need is physics.

This is why nearly $6 billion in funding has flowed toward physical AI in the past twelve months alone. SSI raised $2 billion, Skild AI pulled in $1.4 billion, AMI Labs just closed $1.03 billion, World Labs secured $1 billion, and Runway and Decart are also in the mix — and that's before you count the internal investments at DeepMind, OpenAI, NVIDIA, and Meta. The numbers represent a genuine paradigm shift, not just another hype wave. The argument is that LLMs solved the interface between humans and computers at the level of language, but physical AI solves the interface between machines and reality itself.

Three competing approaches are emerging. DeepMind, OpenAI, NVIDIA, and Runway are generating interactive worlds frame by frame from video — visually impressive, but still prone to physics violations like balls passing through walls. LeCun's AMI Labs is taking a different path with JEPA, working in abstract latent spaces rather than pixel prediction, using 50% fewer parameters in a bet that abstract representation beats perceptual generation for genuine physical understanding. Fei-Fei Li's World Labs takes a third route, generating true 3D geometry using Gaussian splatting — persistent and exportable, ideal for simulation engines, though less suited to real-time autonomous decision-making. Nobody knows yet which architecture wins, and the honest answer is probably that the final answer borrows from all three.

The Waymo versus Tesla divide is a clean illustration of the underlying philosophical tension. Waymo built meticulous LiDAR maps of every city they operate in — the map is the territory, literally. Tesla bet on cheap sensors and general computer vision, letting the car build its world model on the fly from what it currently sees. Both approaches have merit, and both have killed people. The framing matters enormously: how a system represents the world shapes the quality of its planning, the reliability of its predictions, and ultimately whether it takes actions with acceptable consequences. Alfred Korzybski warned that the map is not the territory; with autonomous systems, the fidelity of the map is the whole game.

The near-term economic case is clearer than the technology roadmap. Self-driving trucks, autonomous mining systems, agricultural robots — these aren't science fiction sideshows. They represent industries with chronic labor shortages, aging workforces, and environments hostile to human biology. Waymo and Tesla data suggests that most of the approximately 30,000 annual US traffic deaths could be prevented by autonomous systems. You don't need to be a techno-optimist to see why $6 billion is a reasonable wager.

**Key takeaways:**

- AMI Labs (Yann LeCun, ex-Meta) raised $1.03B at a $3.5B valuation — Europe's largest-ever seed round — to build JEPA-based world models that work in abstract latent space rather than pixel prediction.
- Physical AI is distinct from current generative AI: it requires understanding consequences and physical causality, not just human intent and language patterns.
- Three competing world model architectures are emerging: video-to-video generation (DeepMind, Runway), latent space prediction (AMI Labs/JEPA), and native 3D geometry (World Labs/Gaussian splatting).
- Near $6B was invested in physical AI companies in 2025 alone, not counting the enormous internal investments at the major AI labs.
- Microsoft's Copilot Cowork is now built on Anthropic's Claude technology — effectively an acknowledgment that Microsoft's original in-house approach wasn't working.
- Andrej Karpathy released autoresearch, a 630-line PyTorch system where AI agents autonomously run ML experiments overnight on a single GPU.
- NVIDIA's GTC 2026 kicked off with the Rubin GPU architecture promising 5x dense floating-point performance over Blackwell and 288GB of HBM4 memory.
- OpenAI acquired Promptfoo, an open-source AI security startup, to integrate automated red-teaming and jailbreak detection into its enterprise agent platform.

**Why do I care:**

Physical AI isn't a problem that software engineers are going to solve from a laptop — but the ripple effects matter enormously for anyone building systems that sit adjacent to autonomous decision-making. The move from intent-based to consequence-aware AI changes what it means to build reliable, safe software at every layer of the stack. Right now you can ship a feature that "mostly works" and tolerate some edge cases. When your software is a co-pilot to an autonomous system operating in the physical world, "mostly works" becomes genuinely unacceptable. The standards for correctness, observability, and failure isolation are going to climb steeply, and the engineers who understand that shift early will have a significant advantage over those still optimizing for demo-quality AI interactions.

**Link:** [From Chatbots to World Models: The Push for Physical AI](https://metacircuits.substack.com/p/from-chatbots-to-world-models)
