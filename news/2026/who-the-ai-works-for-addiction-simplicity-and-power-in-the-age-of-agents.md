---
title: "Who the AI Works For: Addiction, Simplicity, and Power in the Age of Agents"
excerpt: "From vibe coding dopamine loops to GPT demystified in 200 lines, this HackerNoon digest explores who really benefits when AI reshapes the tech landscape."
publishedAt: "2026-03-16"
slug: "who-the-ai-works-for-addiction-simplicity-and-power-in-the-age-of-agents"
hashtags: "#hackernoon #ai #vibe-coding #machine-learning #deep-learning #programming #futurism #agents #productivity #generated #en"
---

## Who the AI Works For

**TLDR:** This article examines who actually benefits when AI enters the corporate hierarchy. Using references to William Gibson's Neuromancer and Westworld, it argues that AI does not disrupt power structures but rather upgrades them for those already in control.

**Summary:**

There is a question that has been floating around the tech industry for a while now, and it is deceptively simple: who does AI actually work for? Not in the sense of which company deploys it, but in the deeper, more uncomfortable sense of whose interests it serves when the dust settles. This piece from @thegeneralist takes a fascinating approach, pulling from William Gibson's Neuromancer and the layered narratives of Westworld to frame the argument that AI does not arrive as a disruptor. It arrives as an upgrade to existing hierarchies.

The core thesis is provocative and, frankly, hard to argue against. When AI tools land inside an enterprise, they do not redistribute power. They amplify whoever already holds it. The C-suite gets better dashboards, better forecasting, better leverage over the workforce. The people on the ground get productivity quotas they did not ask for and surveillance mechanisms dressed up as collaboration tools. The article draws a straight line from Gibson's vision of corporate power to the hyperscaler reality of AWS, Azure, and Google Cloud, where the infrastructure of AI is controlled by a handful of players.

What I find particularly sharp about this piece is its refusal to offer a convenient villain. There is no single bad actor here. There is a system, and systems are far more durable than any individual decision-maker. The author pushes readers to think about governance, about who sets the rules for how AI operates within organizations, and whether the people affected by those rules ever get a meaningful seat at the table.

Where the article could go further is in exploring what countermeasures actually look like. It is easy to diagnose the problem, harder to prescribe the solution. The piece gestures toward AI governance but does not dig into what that looks like in practice for a mid-level engineer or a product manager who is suddenly reporting to an algorithm. That gap between diagnosis and action is the thing the author seems to be avoiding thinking about.

**Key takeaways:**
- AI does not break hierarchies; it upgrades them for those already in power
- The hyperscaler infrastructure model means AI governance is concentrated in very few hands
- Gibson's Neuromancer vision of corporate-controlled technology is more relevant than ever
- The absence of a single villain makes the systemic problem harder to address
- AI governance discussions need to include the people most affected by AI decisions

**Why do I care:** As someone who builds and ships software, understanding who your tools actually serve is not a philosophical exercise. It is a practical one. If the AI agent in your IDE is optimized for throughput metrics that your employer tracks, that changes the nature of the tool in your hands. Knowing the power dynamics helps you make better decisions about which tools you adopt and how you advocate for your team.

**Link:** [Who the AI Works For](https://hackernoon.com/who-the-ai-works-for)

## Vibe Coding Is an Addiction

**TLDR:** AI coding tools like Claude Code and Cursor have made building software so frictionless that the act of building itself becomes addictive. The article breaks down the dopamine loop and the structural consequences when everyone can ship code.

**Summary:**

Here is something nobody warned us about when AI coding assistants arrived: the most dangerous thing about them is not that they write bad code. It is that they make writing code feel so good that you cannot stop. This piece by Adil H, a senior manager at EY who builds agentic AI systems for Fortune 100 enterprises, describes vibe coding as the most refined dopamine loop that software has ever produced. And honestly, that framing hits different when you have been through a late-night session where Claude Code just keeps delivering and you keep prompting.

The mechanics are straightforward and that is what makes them insidious. You describe what you want, the AI generates it, you see it work, you feel the rush, and you immediately want to describe the next thing. The feedback cycle is tighter than anything traditional development ever offered. There is no compile-wait-debug friction to slow you down. There is no stack overflow rabbit hole to break the flow. It is pure creation, or at least it feels that way, and your brain responds accordingly.

But the article makes a critical structural point that elevates it beyond a personal productivity observation. When the barrier to building software drops to near zero, the volume of software being produced explodes. And most of it is insecure. Most of it is unreviewed. Most of it exists because someone was riding the dopamine wave and shipped something before thinking through the implications. This is not a hypothetical concern. This is the reality we are living in right now, and the security implications alone should keep every engineering leader up at night.

What the author dances around but does not fully confront is the question of quality versus quantity. We are producing more software than ever before, but is any of it meaningfully better? The dopamine loop rewards output, not outcomes. And that distinction matters enormously when you are building systems that real people depend on.

**Key takeaways:**
- AI coding tools create an unprecedentedly tight dopamine feedback loop
- The frictionless nature of vibe coding removes natural quality checkpoints
- When everyone can build software, the security and quality landscape degrades
- The addiction framing is not metaphorical; the neurological patterns are real
- Output is being confused with outcomes in the current AI-assisted development culture

**Why do I care:** If you are a senior developer or tech lead, you need to recognize this pattern in yourself and your team. The vibe coding loop feels like productivity, but it can mask a decline in code quality, security review, and architectural thinking. Setting guardrails around AI-assisted development is not about slowing people down. It is about making sure the speed is directed toward things that actually matter.

**Link:** [Vibe Coding Is an Addiction](https://hackernoon.com/vibe-coding-is-an-addiction)

## GPT in 200 Lines: The Beautiful Simplicity Behind Modern AI

**TLDR:** This deep dive explores Andrej Karpathy's minimal 200-line GPT implementation, arguing that the core mathematics behind modern large language models are far more elegant and accessible than the industry hype suggests.

**Summary:**

If you have ever felt intimidated by the scale and complexity of modern large language models, this article is the antidote. Laszlo Fazekas walks through Andrej Karpathy's now-famous minimal GPT implementation, a complete working transformer model in roughly 200 lines of Python, and uses it as a lens to argue that the fundamental ideas behind these systems are not just understandable but genuinely beautiful in their simplicity.

Karpathy is one of those rare figures in the AI world who bridges the gap between cutting-edge research and accessible education. He was a professor at Stanford, led Tesla's AI division, worked at OpenAI, and now produces educational content that consistently ranks among the best available for understanding deep learning from first principles. His 200-line GPT is not a toy. It is a fully functional transformer that demonstrates the core architecture driving systems like GPT-4 and Claude, stripped down to its mathematical essence.

The article spends considerable time on what makes this implementation instructive. The attention mechanism, the positional encoding, the layer normalization, all of the components that sound intimidating when described in research papers become clear when you see them implemented in straightforward code. The author argues, convincingly, that the AI industry has a mystification problem. The complexity of production systems with their billions of parameters and massive training infrastructure obscures the fact that the underlying ideas are mathematically elegant and conceptually approachable.

What the piece could address more honestly is the gap between understanding the architecture and understanding why these systems produce the outputs they do. A 200-line implementation teaches you the mechanics, but the emergent behaviors of large-scale models are still not well understood by anyone. The simplicity of the architecture is real, but so is the complexity of what happens when you scale it by several orders of magnitude. That tension deserves more exploration than the article gives it.

**Key takeaways:**
- Karpathy's 200-line GPT is a fully functional transformer implementation, not a toy
- The core mathematics behind LLMs are more elegant and accessible than industry hype suggests
- The attention mechanism, positional encoding, and layer normalization are conceptually simple at their core
- The AI industry has a mystification problem that discourages practitioners from understanding fundamentals
- Understanding the architecture does not fully explain emergent behaviors at scale

**Why do I care:** Whether you are building on top of LLMs or just consuming their outputs through tools in your workflow, understanding what is actually happening under the hood makes you a better engineer. You make better decisions about when to trust AI-generated output, when to be skeptical, and how to debug when things go wrong. This kind of foundational knowledge is what separates engineers who use AI tools from engineers who understand them.

**Link:** [GPT in 200 Lines: The Beautiful Simplicity Behind Modern AI](https://hackernoon.com/gpt-in-200-lines-the-beautiful-simplicity-behind-modern-ai)
