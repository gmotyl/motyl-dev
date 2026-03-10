---
title: "The End of Coding Is the Wrong Question - What We Should Actually Be Discussing"
excerpt: "Oskar Dudycz challenges the 'end of coding' narrative, arguing we need mature conversations about reshaping our SDLC rather than bragging about generated PoCs."
publishedAt: "2026-03-09"
slug: "the-end-of-coding-wrong-question-what-we-should-discuss"
hashtags: "#substack #ai #architecture #software-engineering #llm #generated #en"
---

## The End of Coding? Wrong Question

**TLDR:** Oskar Dudycz argues that the "end of coding" debate misses the point entirely. Instead of celebrating LLM-generated prototypes and declaring coding dead, the industry needs structured, mature discussions about how to reshape the software development lifecycle, what new abstractions we need, and how to preserve the engineering discipline that keeps production systems reliable.

**Summary:**

The piece opens with a sharp observation: what LLMs have actually revealed is how many people in the software industry never really liked coding in the first place. Now these same people are proudly showcasing what they "built with Claude," when what they actually did was generate a proof of concept. Dudycz draws a hard line between OUTPUT, the code that gets generated, and OUTCOME, the working, reliable system that actually matters. He positions himself as someone who uses AI tools for research and generation, but insists on staying responsible for the outcome.

Here is where it gets genuinely interesting. Dudycz argues that the current chat-based, "stringly-typed" way of working with LLMs is fundamentally not scalable. Natural language is imprecise and verbose, and adding a translation layer between freeform prompts and programming languages is wasteful. His prediction is that we will still code, but we will need new programming languages or structured input formats that play to LLMs' actual strengths, which is processing structured data, not interpreting ambiguous human prose. This is a perspective that cuts against both the "coding is dead" camp and the "nothing will change" camp.

The most clever move in the article is a bait-and-switch: Dudycz quotes what appears to be commentary about LLMs but is actually Sun Microsystems' 1995 Java introduction and Joel Spolsky's 2001 "Perils of JavaSchools" article with "Java" swapped for "LLM." The point lands well. Every new abstraction layer in our industry's history, from assembler to C++ to Java to cloud-native, was met with the same promises: it will make everything simpler, faster, more accessible. And every time, the complexity did not disappear; it shifted. The question is not whether LLMs change things (they do), but whether we are being honest about where the complexity is moving to.

Dudycz references Simon Wardley's point about the Roman Empire, which is genuinely thought-provoking. Roman practical engineering knowledge was procedural, embedded in chains of practice rather than recorded as transferable understanding. When those chains broke, the knowledge vanished. If we stop coding and rely entirely on LLM generation, we risk a similar loss. How do newcomers from "LLM Schools" learn to distinguish good solutions from bad ones? You cannot develop judgment about something you never practice. This is not nostalgia; it is a real pedagogical and institutional concern.

For architects and team leads, the core challenge here is this: code is simultaneously a liability (more code equals more maintenance) and the source of truth for what runs in production. Alberto Brandolini's famous observation, that it is developers' misunderstanding that gets released to production, now extends to LLMs' misunderstandings as well. If your team is generating volumes of code without understanding it, you have not reduced risk; you have obscured it. The article implicitly calls for new review processes, new tooling for evaluating LLM output deterministically, and fundamentally rethinking what "engineering" means in this new context.

**Key takeaways:**

- The "end of coding" debate is a distraction. The real question is how the SDLC needs to change and what new tools and abstractions we need.
- Chat-based, natural-language prompting is a transition phase, not the end state. Structured input will likely replace freeform prompting.
- Every major abstraction shift in software history (assembler to C++, C++ to Java, on-prem to cloud) shifted complexity rather than eliminating it. LLMs are no different.
- Procedural knowledge embedded in practice is fragile. If we stop coding, we risk losing the judgment that only comes from doing it.
- Generating tons of code is not inherently sustainable. Volume of output is not a measure of engineering quality.
- LLMs are "statistical parrots" producing the most probable (i.e., mediocre) answer. That may be fine for commodity work but is dangerous for differentiated, high-stakes systems.

**Tradeoffs:**

- **Accessibility vs. depth:** LLMs lower the barrier to producing working code, which democratizes software creation. But the tradeoff is that fewer people develop the deep understanding needed to debug, optimize, and maintain systems at scale. The author is right to flag this, but could go further: there is a real benefit to more people being able to prototype and validate ideas quickly, even if production-grade engineering remains a specialist skill.
- **Speed vs. understanding:** Generating code faster means shipping faster, but Dudycz's Roman Empire analogy highlights the risk: speed without understanding creates fragile systems and fragile institutions. Teams need to decide deliberately where they want LLM-generated output and where they need human-driven design.
- **What the author avoids thinking about:** Dudycz does not address the economic pressure that will drive adoption regardless of engineering ideals. Companies will choose "good enough" LLM output over expensive human engineering in many cases, not because it is better, but because it is cheaper. The article also sidesteps the question of what happens to junior developers specifically. If entry-level coding tasks get automated, where do juniors build the foundational skills Dudycz himself says are essential? He raises the question but does not wrestle with practical answers. Finally, the "Spec-Driven Design" concept gets a sarcastic dismissal ("It's going to be great. Not.") without offering a concrete alternative, which weakens an otherwise strong argument.

**Link:** [The End of Coding? Wrong Question](https://www.architecture-weekly.com/p/the-end-of-coding-wrong-question)