---
title: "AI Transforming Software Engineering - Martin Fowler on Non-Determinism and Refactoring"
excerpt: "Martin Fowler discusses how AI introduces non-determinism to software development, the importance of testing and refactoring in the LLM era, and timeless engineering skills."
publishedAt: "2025-11-19"
slug: "ai-transforming-software-engineering-martin-fowler-non-determinism-refactoring"
hashtags: "#generated #en #ai #llm #architecture #refactoring #testing #agile #thoughtworks #software-engineering"
---

## How AI Will Change Software Engineering – with Martin Fowler

**TLDR:** Martin Fowler, Chief Scientist at Thoughtworks, explores how AI introduces non-deterministic coding to software engineering, requiring new approaches to testing and quality assurance. He emphasizes that refactoring becomes more critical than ever, and while LLMs help with certain tasks, the core skills that define great engineers remain unchanged.

**Summary:**

Martin Fowler brings decades of architectural wisdom to the conversation about AI's impact on software development, and his perspective is refreshingly grounded. He frames the shift to LLM-assisted coding as fundamentally about moving from deterministic to non-deterministic programming—a paradigm shift that software engineers haven't really faced before at this scale. Unlike traditional tools where the same input always produces the same output, LLMs introduce variability that we must account for in our development practices.

Fowler draws an illuminating parallel to structural engineering, where his wife (a structural engineer) always thinks in terms of tolerances. You can't just build to the exact specifications the math gives you—you need safety margins because materials vary and conditions change. Software engineering with AI needs similar thinking. We can't "skate too close to the edge" with non-deterministic tools, especially in security-critical contexts. Fowler predicts we'll see some notable crashes before the industry learns this lesson properly.

The concept of "vibe coding" comes up—where you throw prompts at an LLM and see what sticks. Fowler acknowledges this has narrow utility for prototyping or exploration, but emphasizes it's not a replacement for rigorous engineering. The real value of LLMs, he argues, is in handling legacy code and boilerplate—the tedious work that experienced engineers know well but don't enjoy doing. Tools like Cursor and GitHub Copilot shine here, accelerating work that would otherwise be time-consuming but straightforward.

What's particularly interesting is Fowler's point about enterprise complexity. He shares an anecdote about someone joining an established bank who needed three years just to understand the problem space. Big companies aren't complicated because of technical debt alone—they're complicated because of human decisions, vendor relationships, organizational politics, and historical accidents. This is where Fowler sees LLMs struggling: understanding the "why" behind architectural decisions requires context that can't easily be encoded or retrieved.

This leads directly into why refactoring matters more than ever. His book *Refactoring* was written to help developers improve code incrementally and safely—and in the AI era, this skill becomes critical. LLM-generated code often works but isn't optimally structured. Engineers need to refactor AI output, applying architectural patterns and ensuring maintainability. Fowler advocates combining LLMs with deterministic tools like automated refactoring assistants (OpenRewrite gets mentioned) to get the best of both worlds: speed from AI, reliability from proven tools.

For architects and teams, the takeaway is clear: don't abandon the fundamentals. Rigorous testing becomes even more important when dealing with non-deterministic outputs. Code review standards need to adapt to catch subtle issues that LLMs might introduce. And team knowledge—understanding why the system is built a certain way—remains irreplaceable. Fowler's advice for junior engineers is timeless: learn to write clean code, understand testing deeply, and develop the judgment to know when to trust tools and when to question them.

**Key takeaways:**

- AI introduces non-determinism to software development, requiring engineers to think in terms of tolerances and safety margins like other engineering disciplines
- Refactoring skills are more important than ever for improving LLM-generated code and maintaining long-term code quality
- Testing becomes critical when using LLMs—non-deterministic outputs need rigorous validation to avoid security and reliability issues
- Enterprise complexity stems from human decisions and organizational history, context that LLMs struggle to grasp
- Core engineering skills (clean code, testing, architectural judgment) remain unchanged despite rapid tooling evolution

**Tradeoffs:**

- LLMs accelerate boilerplate and legacy code work but sacrifice deterministic predictability
- Vibe coding enables rapid prototyping but sacrifices code quality and maintainability
- AI-assisted development increases velocity but requires stronger testing and review processes to maintain safety

**Link:** [Martin Fowler](https://newsletter.pragmaticengineer.com/p/martin-fowler)
