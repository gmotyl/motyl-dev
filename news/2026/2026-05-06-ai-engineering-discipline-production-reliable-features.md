---
title: "AI Engineering Is Its Own Discipline: Building Reliable AI Features in Production"
excerpt: "Scott Moss from Netflix introduces AI Engineering Fundamentals, a course on building production-grade AI agents with evaluation harnesses, context engineering, and systematic improvement loops."
publishedAt: "2026-05-06"
slug: "ai-engineering-discipline-production-reliable-features"
hashtags: "#frontendmasters #frontend #ai #engineering #architecture #fullstack #devtools #generated #en"
source_pattern: "Frontend Masters"
---

## AI Engineering Fundamentals

**TLDR:** Scott Moss, Senior Dev at Netflix, has released "AI Engineering Fundamentals" through Frontend Masters, a course that treats AI feature development as a proper engineering discipline with evals, context engineering, and structured improvement loops. The course is built around a real AI-assisted Excalidraw diagram app running on Cloudflare's edge.

**Summary:** I've been watching the AI tooling conversation long enough to notice a pattern. Most of what gets called "AI engineering" is really just API integration with some retry logic and a hope that the model does something useful. What Scott Moss is describing with this course is something different, and I think the framing matters: AI Engineering as a discipline, not a feature toggle.

The course centers on building a real AI agent into a working application, specifically an AI-assisted version of Excalidraw, the diagramming tool, deployed on Cloudflare's edge. That choice of project is deliberate and smart. Canvas state is complex, the tool use requirements are non-trivial, and streaming chat with client-side CRUD operations against a live canvas is exactly the kind of integration problem that breaks naive implementations. You're not learning to call an API in a toy demo; you're learning to build something that actually works in a real product.

The part of this course that I find genuinely interesting is the emphasis on eval harnesses. The course teaches you to set up evaluation infrastructure that catches regressions before users do. That means golden datasets, code-based scorers, and Braintrust for observability. This is the testing culture that backend engineers have had for decades applied to the inherently probabilistic output of language models. The fact that this needs to be taught explicitly tells you something about where the industry is right now.

Context engineering is the other through-line. Moss's argument is that the model only knows what you give it each turn, so the work of an AI engineer is largely the work of information architecture: writing tight system prompts, serializing canvas state using a format called TOON, and selecting few-shot examples that justify their token cost. This is not glamorous work. It's the kind of careful, deliberate thinking about data representation that good engineers have always done, just applied to a new substrate.

The improvement loop Moss describes is what I'd call the real discipline: run evals, form one theory about what's wrong, change one thing, rerun. That scientific method approach applied to AI feature development is obvious once you hear it, but I've watched teams spend months thrashing on prompts without any systematic feedback mechanism. Having that loop in place is the difference between engineering and guessing.

What the course description doesn't address, and what I'd push back on, is the organizational context. Eval infrastructure takes time to build and maintain. In many product teams, the pressure to ship means that "run evals before deploying" competes with "just ship it and see." The course can give you the technical skills; it can't change your team's deployment culture. That's a management and process problem, not an engineering one, and it's often the actual bottleneck.

There's also a YouTube fireside chat with Scott on AI and where software engineering is heading, which is worth pulling up alongside the course material. Marc Grabanski, the CEO of Frontend Masters, specifically calls it out as context for understanding the broader trajectory of the discipline.

**Key takeaways:**
- AI Engineering is a distinct discipline focused on building reliable, production-grade AI features, not just integrating model APIs
- Eval harnesses with golden datasets and code-based scorers are the testing infrastructure for probabilistic AI outputs
- Context engineering, writing system prompts and serializing state effectively, is a core skill that determines AI feature quality
- The systematic improvement loop (run evals, one theory, one change, rerun) is the actual practice of AI engineering
- The course uses a real Excalidraw-based app on Cloudflare's edge, so techniques are validated against genuine product complexity

**Why do I care:** Frontend engineers are increasingly being asked to own AI features end to end. That includes the eval story, the context design, and the observability layer. Most of the existing resources treat these as ML concerns, but Moss is approaching them from a product engineering angle, which is exactly the right framing for frontend and full-stack teams shipping AI-assisted features. The Cloudflare edge deployment adds a practical constraint that makes the architecture decisions more realistic than the average tutorial.

**Link:** [AI Engineering Fundamentals](https://frontendmasters.com/courses/ai-engineering/)
