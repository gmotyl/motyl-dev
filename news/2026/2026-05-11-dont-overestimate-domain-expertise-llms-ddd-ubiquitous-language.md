---
title: "Don't Overestimate Domain Expertise: LLMs, DDD, and the Limits of Ubiquitous Language"
excerpt: "Oskar Dudycz explores how both domain experts and LLMs share the same fundamental problem: they describe how things are done, not how systems should work."
publishedAt: "2026-05-11"
slug: "dont-overestimate-domain-expertise-llms-ddd-ubiquitous-language"
hashtags: "#architecture #ddd #llm #domaindrivendesign #generated #en"
source_pattern: "OskarDudycz"
---

## Don't Overestimate Domain Expertise: LLMs, DDD, and the Limits of Ubiquitous Language

**TLDR:** Using Claude Opus to research the hospitality domain for a workshop, Oskar Dudycz ran into the same trap engineers hit with domain experts: getting flooded with implementation details and inherited jargon instead of clear process understanding. The core insight is that ubiquitous language is a cognitive tool, not a source of truth, and LLMs compound rather than solve this problem.

**Summary:**

The whole thing started with a workshop preparation exercise. Dudycz asked an LLM to help him revisit the hospitality management domain he had worked in before. He wanted to check if anything had changed in guest checkout flows. Instead, he got buried. Marketing consent, loyalty timing, inventory management, revenue posting, regulatory submissions, all served up at the same level of detail, with no sense of what actually mattered. Sound familiar? Because it should. That is exactly what happens in the first sessions with domain experts.

The terminology that came back was telling. Words like "Folio," "Drain Pending Postings," and "Settle the folio" are real phrases real cashiers use. They come directly from Oracle Opera, a system that has dominated hospitality for thirty years, and its vocabulary has baked itself into how thousands of people in that industry talk about their work. The LLM did not reason about whether those terms made sense in a modern system. It just repeated them, confidently, because they are everywhere in its training data. When pushed back on the terminology, the model swapped in different Oracle jargon rather than actually thinking about what a checkout process should look like today.

There is something important here worth sitting with. The idea in DDD that "ubiquitous language is the most important thing" is often taken too far. What ubiquitous language actually does is reduce cognitive overhead. It helps teams stop constantly translating between technical and business worlds. But the language itself is not describing ground truth. It describes current practice, which is a sediment of decades of habit, tool constraints, tribal shortcuts, and legacy tradeoffs. "Drain the interfaces" is a phrase that exists because cashiers once had to manually pull charges from integrated systems before checkout. Modern systems post those charges continuously. The phrase stuck, the practice did not. An LLM will reproduce that phrase and the mental model behind it, and you will have no idea you have been led astray.

What I find most useful in Dudycz's framing is the distinction between "how people do things" and "how a system should work." Domain experts bring you their current process, which includes good habits, bad habits, workarounds, pet peeves, and tribal knowledge in no particular order. LLMs do the same, but worse, because they blend vocabularies from multiple competing systems invisibly, and they have no internal sense of why any of those systems got to where they are. At least with a human expert you can probe the origin of a bias. With an LLM you get a confidence-weighted average of whatever documentation was most prevalent in training data.

The answer is not to throw out domain experts or LLMs, but to stop outsourcing thinking to either of them. LLMs are genuinely useful for getting a rough map of a domain, identifying terminology worth asking about, and handling the tedious work of formatting and organizing findings. But the actual domain discovery, the work of figuring out what to build and why, still requires engineers who know how to ask the right questions and who are willing to push back when an expert brings them a solution instead of a problem.

**Key takeaways:**
- Ubiquitous language is a tool for reducing cognitive load, not a specification for how software should work.
- LLMs reproduce industry jargon and legacy practices from their training data without understanding the historical reasons behind them.
- Domain experts and LLMs share the same root problem: they describe current practice, which includes decades of accumulated habit and workaround.
- The work of translating domain discovery into software design cannot be outsourced. It requires engineering judgment and active collaboration.
- LLMs are useful as accelerators for known tasks, not as replacements for domain reasoning.

**Why do I care:** As someone who has sat through many event storming sessions and DDD workshops, the trap Dudycz describes is one I have stepped in personally. The moment you accept ubiquitous language as authoritative rather than descriptive, you start modeling the past instead of designing for the future. This applies just as much to AI-assisted research as it does to sessions with business stakeholders. The practical implication for architects is clear: any domain model you produce, whether with human help or LLM help, needs explicit validation of the "why" behind each concept, not just confirmation that the terms are recognizable to experts.

**Link:** [Don't overestimate domain expertise](https://www.architecture-weekly.com/p/dont-overestimate-domain-expertise)
