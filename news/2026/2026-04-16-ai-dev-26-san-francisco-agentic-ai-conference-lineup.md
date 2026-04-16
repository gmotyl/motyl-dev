---
title: "AI Dev 26 San Francisco: What the Conference Lineup Tells Us About Where Agentic AI Is Heading"
excerpt: "DeepLearning.AI brings together builders from LangChain, LlamaIndex, CrewAI, Replit, and others for a two-day developer conference in San Francisco focused on agentic AI, observability, and production-grade systems."
publishedAt: "2026-04-16"
slug: "ai-dev-26-san-francisco-agentic-ai-conference-lineup"
hashtags: "#deeplearning-ai #ai #ml #llm #agents #architecture #open-source #performance #research #generated #en"
source_pattern: "DeepLearning.AI"
---

## AI Dev 26 San Francisco: Reading the Room From the Speaker Lineup

**TLDR:** DeepLearning.AI is hosting AI Dev 26 in San Francisco on April 28-29 at Pier 48, bringing together 3,000+ developers and speakers from LangChain, LlamaIndex, CrewAI, Replit, Snowflake, LandingAI, and Oracle. The conference covers agentic AI, software engineering transformation, observability, memory systems, and enterprise deployment, hosted by Andrew Ng.

**Summary:** Every conference lineup is a kind of editorial statement. When you look at who DeepLearning.AI chose to put on stage at AI Dev 26, a pretty clear picture emerges: the field has moved well past "can we build agents?" and is now wrestling with "how do we make them reliable, observable, and actually useful in production?" That shift is more significant than it sounds.

Harrison Chase from LangChain is presenting on what he calls the "observability flywheel," the idea that tracing your agents' behavior feeds back into continuously improving them. That's not a flashy demo topic. That's the kind of thing you care about when you have real workloads running and you're tired of not knowing why your agent did something wrong last Tuesday. I find it encouraging that observability is getting a main stage slot rather than being buried in a breakout room.

Jerry Liu from LlamaIndex has a talk with the quietly devastating title "My agent can't read a PDF?" which cuts right to one of the most frustrating gaps between AI demos and real work. Organizations run on PDFs: contracts, reports, invoices, technical specs. The gap between "GPT can summarize text" and "my agent correctly extracts the right clause from a 200-page legal document" is enormous, and a lot of teams have discovered this the hard way. David Park from LandingAI is covering production-grade agentic systems with something called ADE (presumably Agentic Document Engine or similar), which fits the same theme: documents are the actual interface between AI and enterprise knowledge, and that problem is harder than it looks.

João Moura from CrewAI is talking about "recurring, governed, and embedded enterprise workflows," which is where multi-agent orchestration meets the reality of compliance departments, IT governance, and the question of who signs off when an AI system makes a decision that affects real money. Anupam Datta from Snowflake has a session framed around optimizing an agent's "GPA" using coding agents, which sounds like a clever angle on agent self-improvement and evaluation. Michele Catasta from Replit is running a vibe coding master class, which is the more accessible end of the spectrum but still relevant because a lot of developers are learning to let AI write first drafts of code and need to develop taste for when to trust that output.

Richmond Alake from Oracle rounds out the speaker list with a panel on the future of software engineering. That's the existential conversation that every developer conference feels obligated to have right now, and honestly it's worth having. The question is not whether AI changes software engineering. It will. The question is whether the change looks more like "AI handles the boring parts" or "the role fundamentally restructures." I don't think anyone has a confident answer to that yet, which is why it keeps being the panel topic.

**Key takeaways:**
- The conference centers on production-grade agent systems: observability, reliability, document understanding, and enterprise governance rather than prototype demos
- Speaker lineup spans the full agent stack from orchestration frameworks (LangChain, LlamaIndex, CrewAI) to platform providers (Snowflake, Oracle, Replit, LandingAI)
- Observability and tracing are now treated as first-class concerns, not afterthoughts, signaling maturation of the agentic AI space
- Document understanding remains a genuine unsolved challenge in enterprise AI deployments
- The conference is April 28-29 at Pier 48 in San Francisco, with a 30% discount for DeepLearning.AI learners

**Why do I care:** From where I sit, the most interesting signal here is the observability talk from Harrison Chase. When I look at teams actually shipping agent systems to users, the ones who are struggling most are not the ones who can't build agents. They're the ones who can't tell what their agents are doing, can't reproduce failures, and can't explain to a product manager or a customer why something went wrong. The "observability flywheel" framing is smart because it connects tracing to improvement, not just debugging. That's the mindset shift I'd want anyone building production AI systems to internalize: observability is not a debugging tool you reach for when something breaks. It's a continuous improvement mechanism that should be on from day one. The rest of the lineup confirms that the serious work in agentic AI right now is at the intersection of reliability engineering and domain knowledge, not at the frontier of model capabilities.

**Link:** [AI Dev 26 x SF - The AI Developer Conference](https://info.deeplearning.ai/e3t/Ctc/LX+113/cJhC404/VVtmF_8Ld7ZYW4hWgsV4dYYc7W5BVC1m5MXgzvN8Qx57W3qgz0W8wLKSR6lZ3kPN97HrYpl1pqsN5Br9V7_HzzVW7-vpFg7nd822W68gbGf4BMlZbW2_H6JH43hQW2W43LDfZ95ZB55W6RqsQv37bRgBVsmxw58ZHfBSW1FTBS063j3zGW3kmvBn97Z-ttW3swvRN2gH72RW10sqV099qvjnN4Rcg-djFkqXW6_V5t57QV7zqN67-RKdhYpCsW6pkX4_4J5vTbW6_R0mR8jhwcQVWYFNY6pYm8_W269LMl5mbNcjW9fxl_j41Tl7WW4wxprD36MNMwW8-w4wg2gxR_qW1lrLVF2CHGZcW8_0ldP1KLQDQW6XFYDR6FmLnYW7w4--K7k8HD9W7yzMqQ8KD4QlN86qkZg6nkRsf81V8tF04)
