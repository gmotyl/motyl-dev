---
title: "How to Design Python AI Projects That Don't Fall Apart"
excerpt: "A pragmatic approach to Clean Architecture for AI projects that provides structure without becoming a rigid filing system - treat layers as virtual concepts, not physical folders."
publishedAt: "2026-01-13"
slug: "python-ai-projects-clean-architecture-pragmatic"
hashtags: "#substack #python #ai #architecture #llm #agents #generated #en"
---

## How to Design Python AI Projects That Don't Fall Apart

**TLDR:** Clean Architecture's four layers (Domain, Application, Infrastructure, Serving) should be virtual concepts for managing dependencies, not rigid folder structures. Organize by actionability, not by type, and only decouple what you actually plan to swap.

**Summary:**

This article addresses a real pain point in AI development: Python's flexibility is both a blessing and a curse. You can build anything, but that freedom often leads to spaghetti code when building complex agents and workflows. Most guidance falls into two extremes - either highly specific to a framework like FastAPI or LangGraph, or too rigidly following Clean Architecture patterns designed for Java.

The author proposes a "pragmatic clean architecture" that inherits only the principles that make code modular, flexible, testable, and maintainable. The four layers remain: Domain (the "what" - your entities and nodes), Application (the "how" - orchestration and workflows), Infrastructure (external dependencies like LLMs and databases), and Serving (how the outside world interacts with your app).

The critical insight is the Dependency Rule: dependencies must always point inward. The outer layers know about inner layers, but Domain and Application must never be aware of Infrastructure and Serving. This isolation lets you reuse the exact same AI agent across different platforms - CLI, web app, VS Code extension - and swap infrastructure components without changing business logic.

The kitchen analogy makes this concrete: Domain is your ingredients, Application is the recipe, Infrastructure is your equipment (stove, blender), and Serving is how the customer gets the food. You can swap a gas stove for electric without changing the recipe, or switch from dine-in to takeout without changing how you cook.

For architects and teams building AI applications, the three biggest mistakes to avoid are illuminating. First, don't interpret layers as physical folders - this leads to circular imports and confusion about where files belong. Keep a flatter hierarchy. Second, don't organize by type (all prompts in one folder, all nodes in another). Instead, organize by actionability - keep everything related to a specific task together so you can copy-paste a module into another project and have it still work. Third, don't over-engineer. If you never plan to swap a piece of infrastructure, don't bother decoupling it.

The sanity check is simple: Can you copy-paste this module into another project and have it make sense? If your component is self-contained, you've designed it well. This modularity lets you treat code like LEGO bricks reusable across different agents.

**Key takeaways:**
- Clean Architecture layers are virtual concepts for dependency management, not physical folder structures
- The Dependency Rule (inward-only dependencies) enables component swapping and multi-platform deployment
- Organize by actionability (feature-scoped modules) rather than type (all prompts together, all nodes together)
- Only decouple what you actually plan to swap - abstractions without value add complexity

**Tradeoffs:**
- Polymorphism and interfaces enable flexibility but add indirection
- Flat folder structures improve clarity but require discipline to maintain virtual layer boundaries

**Link:** [How to Design Python AI Projects That Don't Fall Apart](https://www.decodingai.com/p/how-to-design-python-ai-projects)

---

*The summaries provided are based on newsletter content and represent interpretations of the original articles. Readers should consult the original sources for complete technical details and authoritative information.*