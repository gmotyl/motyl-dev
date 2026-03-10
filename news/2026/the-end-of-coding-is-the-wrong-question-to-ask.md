---
title: "The End of Coding Is the Wrong Question to Ask"
excerpt: "Oskar Dudycz argues that the industry's obsession with whether LLMs will replace coding misses the real challenge: how to reshape the software development lifecycle for a world with AI assistants."
publishedAt: "2026-03-09"
slug: "the-end-of-coding-is-the-wrong-question-to-ask"
hashtags: "#substack #ai #architecture #software-engineering #llm #generated #en"
---

## The End of Coding? Wrong Question

**TLDR:** Oskar Dudycz challenges the tech industry's shallow "end of coding" debate, arguing that generating code with LLMs is just a PoC-level trick, not real engineering. He draws historical parallels to Java's introduction and Joel Spolsky's JavaSchools critique to show that every new abstraction layer triggers the same panic, and what we actually need is a mature conversation about restructuring the entire SDLC.

**Summary:**

The essay opens with a sharp observation: the rise of LLMs has revealed how many people in the software industry never actually liked coding in the first place. The people proudly showing off what they "built with Claude" are mostly showcasing proofs of concept, not production-grade software. And the industry conversation remains stuck on the mechanics of how we build rather than what we are building and why. If we keep sending the message that LLMs are already better than "average coder Joe," the inevitable next question from business stakeholders is: why keep paying for humans at all?

Dudycz argues that chat-based, "stringly-typed" development is a transitional phase, not the endgame. Natural language prompting is imprecise, verbose, and adds a wasteful translation layer between intent and executable code. He speculates that the future likely involves new programming languages or structured input formats designed specifically for LLM collaboration, along with new tools for evaluating and making LLM output deterministic. But he laments that nobody seems to be having these conversations. Instead, the discourse is dominated by celebrities who do not code doing mic drops about the death of coding, as if a proof of concept represents the entire software development lifecycle.

The essay includes a clever rhetorical move: two passages that sound like they are about LLMs are actually modified quotes. The first is from Sun Microsystems' 1995 Java whitepaper, promising a world where development is "dead simple" and applications run across multiple platforms. The second is from Joel Spolsky's 2005 "The Perils of JavaSchools" essay, with "Java" swapped for "LLM." The point is not that history repeats identically, but that every new abstraction layer triggers the same cycle of utopian promises and fears about deskilling. Java itself was once dismissed as something that would make developers dumber, and now it is treated as "the enterprisy complex environment" that requires craftsmanship.

For architects and team leads, there is a particularly important thread here about the relationship between code and design. Dudycz cites Alberto Brandolini's famous line that "it's developers' misunderstanding, not domain experts' knowledge, that gets released in production," and extends it: now it is the developers' AND LLMs' misunderstandings being deployed. He also references Simon Wardley's point about the Roman Empire -- practical engineering knowledge was embedded in chains of practice, not in transferable documents. When those chains broke, the knowledge evaporated. If we stop coding, how do we maintain the mechanical sympathy needed to evaluate whether LLM output is correct? How do newcomers from "LLMSchools" develop the judgment to distinguish right from wrong?

The essay closes with a call for maturity. Stop bragging about generating code and then claiming code does not matter. Start thinking about what tools, languages, and processes need to change. If you call yourself an engineer, put structure and determinism into the process. The current state of "Spec-Driven Design" via markdown prompts is not going to cut it, given the industry's track record with breaking down tasks precisely, writing clear specifications, and thinking before doing. There is genuine skepticism here, but also pragmatism -- Dudycz mentions he is building an agent with Emmett to understand these tools firsthand rather than criticizing from the sidelines.

**Key takeaways:**

- The "end of coding" framing is wrong. The real question is how the SDLC needs to change, not whether we will type code into editors.
- Chat-based, natural-language-only development is a transition phase, not the destination. LLMs work better with structured input, which suggests we may need new programming languages or specification formats.
- Every major abstraction layer (assembly to C, C to Java, Java to cloud-native) triggered the same fear cycle. The pattern is real, but the conclusion "this time it is the same old thing" is too simplistic -- each transition did genuinely change what engineers needed to know.
- Generating tons of code is not sustainable any more than reviewing all generated code is sustainable. Both extremes are traps.
- Knowledge embedded in practice, not documentation, is the most vulnerable to being lost. If developers stop coding, they lose the mechanical sympathy needed to evaluate AI output.
- The industry needs to stop treating PoCs as proof that the SDLC is solved and start having serious conversations about tooling, determinism, and process.

**Tradeoffs:**

- Abstraction vs. understanding: Higher abstractions reduce cognitive load and increase accessibility, but they erode the deep understanding needed to debug, optimize, and make architectural decisions. Every layer we add makes more people productive but makes fewer people capable of working at the lower levels when things go wrong.
- Speed of generation vs. quality of output: LLMs can produce code fast, but speed of generation is orthogonal to correctness, maintainability, and fitness for purpose. Optimizing for output volume may actively work against outcome quality.
- Democratization vs. engineering discipline: Making software creation more accessible is good, but if "engineering" stops meaning structured thinking, tradeoff analysis, and deterministic processes, then we have lost something that the word was supposed to represent.

**What is missing from this argument:** Dudycz does not engage with the possibility that LLMs might improve faster than his "transition phase" framing suggests. He also sidesteps the economic pressure angle -- even if chat-based development is suboptimal from an engineering perspective, if it is cheap enough and fast enough, businesses may not care about the quality gap. The essay also does not address the middle ground seriously: hybrid workflows where LLMs handle boilerplate and well-understood patterns while humans focus on novel architecture and business logic. This is arguably already happening at scale, and it is neither the "end of coding" nor business as usual. Finally, the Roman Empire analogy, while evocative, conflates two very different knowledge preservation contexts -- we have version control, documentation tooling, and searchable codebases that the Romans did not have.

**Link:** [The End of Coding? Wrong Question](https://www.architecture-weekly.com/p/the-end-of-coding-wrong-question)

**Referenced:**
- [The Java Language Environment - Sun Microsystems (1995)](https://www.stroustrup.com/1995_Java_whitepaper.pdf)
- [The Perils of JavaSchools - Joel Spolsky](https://www.joelonsoftware.com/2005/12/29/the-perils-of-javaschools-2/)
