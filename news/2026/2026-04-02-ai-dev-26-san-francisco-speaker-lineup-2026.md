---
title: "AI Dev 26 San Francisco: What the Speaker Lineup Tells Us About Where the Industry Is Heading"
excerpt: "DeepLearning.AI's developer conference in late April brings together engineers and leaders to talk agents, observability, memory, and what comes next."
publishedAt: "2026-04-02"
slug: "ai-dev-26-san-francisco-speaker-lineup-2026"
hashtags: "#deeplearning #ai #ml #aidev26 #llmops #agentmemory #conference #generated #en"
source_pattern: "DeepLearning.AI"
---

## AI Dev 26 San Francisco: What the Speaker Lineup Tells Us About Where the Industry Is Heading

**TLDR:** AI Dev 26 is coming to Pier 48 in San Francisco on April 28 and 29, with a speaker lineup that reads like a snapshot of what the industry is actually wrestling with right now. From agent observability to vector databases to memory in agentic systems, the topics on the agenda are practical and pointed.

**Summary:** There is something telling about what a conference chooses to put on its main stage. For AI Dev 26, the choices are revealing. Harrison Chase from LangChain is talking about the observability flywheel, which I find particularly interesting. Observability in LLM-powered systems is genuinely hard, and most teams are still flying blind when something goes wrong in a multi-step agent pipeline. The fact that it gets top billing says something about where the pain is.

Richmond Alake from Oracle is covering agent memory, which is another area that gets glossed over in tutorials but becomes a real engineering problem the moment you try to build something that persists context across sessions or across users. Memory isn't just "store the chat history," and anyone who has tried to build it properly knows that. It touches retrieval strategies, storage backends, staleness, and what you decide to forget intentionally.

Paige Bailey from Google DeepMind is slotted for a broader view of what's new and what's next, which is almost always the crowd-pleaser session but also the one you need to take notes on because the delta between what's publicly known and what insiders see coming is often larger than expected. Emma McGrattan from Actian rounds things out with a talk on vector databases, a topic that has matured considerably from the hype peak but still has sharp edges in production at scale.

Andrew Ng himself is talking about the future of software development. That framing, rather than "the future of AI," is interesting on its own. Software development as the lens through which to understand where AI is going is a bet on the practitioner audience, and it suggests the conference is pitched squarely at people who build things rather than people who watch things get built. The event runs two days at Pier 48 in San Francisco, April 28 to 29.

**Key takeaways:**
- The conference agenda is focused on production-grade concerns: observability, memory, and vector databases rather than raw model capabilities.
- Harrison Chase's talk on the observability flywheel is one to watch, given how underserved that problem space still is for most teams.
- Andrew Ng framing his talk around software development rather than AI broadly signals this is a practitioner-first event.

**Why do I care:** As someone who thinks about systems and developer experience, the observability angle is the one I'd make time for. LLM systems are notoriously opaque when they fail, and building feedback loops that actually help you improve model behavior in production is not a solved problem. If LangChain has a coherent story around that flywheel concept, I want to hear it. Agent memory is the other topic I'd prioritize, because it is one of those areas where the gap between demo quality and production quality is still enormous, and any concrete patterns or architecture advice is worth collecting.

**Link:** [AI Dev 26 x San Francisco](https://aidev.deeplearning.ai) — Conference homepage (tracking URL in source, direct domain inferred)

---
