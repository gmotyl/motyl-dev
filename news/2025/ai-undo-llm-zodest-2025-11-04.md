---
title: 'AI-Assisted Development, Tiny Undo Stacks, LLM Introspection, and Type-Safe CLIs — November 4, 2025'
excerpt: 'A critical, audio-friendly tour through vibe coding, a minimal undo stack, interpretability work on LLMs, the human cost of always-on AI coding assistants, and a TypeScript Zod-based CLI tool.'
publishedAt: '2025-11-04'
slug: 'ai-undo-llm-zodest-2025-11-04'
hashtags: '#generated #en #frontend #typescript #ai #llm #architecture #webdev #performance #zod #nodejs #ux'
---

## Vibe Coding: Revolution or Recipe for Disaster in App and Game Development?

**TLDR:** Vibe coding is the practice of delegating the messy details of programming to LLMs — describe the "vibe", iterate on prompts, and let the model generate code. It can accelerate prototypes and empower non-programmers, but it also surfaces weak assumptions about maintainability, security, provenance, and long-term ownership.

Summary:
This article introduces "vibe coding" — a term popularized by Andrej Karpathy in 2025 — where developers lean on text-based AI to produce code from informal prompts and iterative guidance. The pitch is seductive: skip syntax and plumbing, focus on intent and feel, and let LLMs stitch together a working app or game. The result, proponents say, is speed and democratization: people who wouldn't normally write code can assemble interactive experiences quickly.

But speed is not the same as robustness. The write-up flirts with the right caveats — quality and caveats are mentioned — yet it doesn't dig deeply into the operational consequences. Vibe coding blurs responsibility for correctness. Who debugs subtle state bugs the model introduced? Who owns the security review? How do you trace the origin of a piece of logic when it was produced across many prompt iterations? These questions matter for software beyond the throwaway prototype stage.

Practically, vibe coding can shine in small, well-scoped projects: prototypes, game jams, UI mockups, or iterating on animation and feel where correctness is mostly local and failures are low-risk. For production systems, you need governance: curated prompts, enforced testing gates, deterministic builds, provenance recording, and code-review rituals that don't treat generated output as magically correct.

What the author is avoiding: the piece lightly mentions caveats but avoids the messy mechanics of integrating AI-generated artifacts into software lifecycles — CI/CD, dependency and license tracking, reproducible generation (prompt and model versioning), and legal/data provenance. It also assumes models are “good enough” across domains, which underestimates domain-specific constraints like real-time performance for games, platform-specific APIs, and nuanced accessibility requirements.

For architects and teams:

- Treat vibe coding as a technique, not a replacement for software engineering practices. Build toolchains that capture prompts, model versions, and the exact outputs used in production.
- Add mandatory validation around generated code — static types, unit tests, security linters, and human review. If you accept generated code into your repo, make it subject to the same bar as hand-written code.
- Consider a two-track workflow: rapid creative iteration with vibe coding that must clear a stabilization gate before deployment.

Key takeaways:

- Vibe coding accelerates prototyping and lowers the entry barrier for building apps and games.
- It transfers cognitive workload from syntax to prompt design and emergent debugging.
- Without governance (testing, provenance, review), it creates long-term maintenance and safety risks.

Tradeoffs:

- Gain rapid prototyping and accessibility but sacrifice long-term maintainability and ownership unless strong processes are added.
- Democratization of development increases velocity but can erode expertise and traceability if relied on exclusively.

Link: [Vibe Coding: Revolution or Recipe for Disaster in App and Game Development?](https://webdesignerdepot.com/vibe-coding-revolution-or-recipe-for-disaster-in-app-and-game-development/)

---

## UI algorithms: a tiny undo stack

**TLDR:** For most UIs, a simple undo stack — push an inverse operation and pop to undo — is sufficient and less error-prone than pointer-based arrays. The author argues for simplicity and avoiding index-pointer bugs that plague many implementations.

Summary:
This short, practical piece frames undo as two families: full version histories (like Photoshop) and lightweight undo stacks suitable for many apps. The latter works by pushing an undoable action with its corresponding rollback onto a stack; undo pops and runs the rollback, redo replays a previously undone action, and inserting a new action after undos clears the redo path. It's the classic command-pattern approach.

The author rails against common pointer-based implementations — arrays with an index that points into history — pointing out the everyday sources of bugs: off-by-one errors, undefined indices, confusing slice/splice semantics, and language-specific quirks. Their preference is for APIs that avoid indexing into a mutable array and instead expose push/undo/redo operations that operate on opaque items, reducing footguns.

This is practical, readable advice. For interactive drawing apps or simple editors, keeping actions coarse-grained (e.g., whole strokes) simplifies reasoning and improves performance. The article hints at an API where you push an add and remove pair and the undo system simply calls them; that's conceptually elegant.

What’s missing: the article explicitly rejects branching histories, which is a valid design choice, but it doesn't explore what you lose: collaboration, conflict resolution, and selective restoration. It also omits how to persist undo stacks across reloads, how to handle non-deterministic commands (server RPCs, time-sensitive operations), and how to compress very long histories for memory-constrained environments.

For architects and teams:

- Use an undo stack for local, single-user interactions where operations are deterministic and reversible.
- Make undo units align with user intent; avoid recording every low-level state change (sampling or coalescing may help).
- For collaborative or multi-device scenarios, look toward CRDTs, operational transforms, or explicit version histories — an undo stack won't scale there.

Key takeaways:

- Prefer an action-pair push/pop API over pointer-indexed stacks to reduce subtle bugs.
- Coarse-grained undo units (like strokes) improve clarity and UX.
- Redo is discarded on new actions by design; intentional branching must be a deliberate choice.

Tradeoffs:

- Choosing a simple linear undo stack means you gain simplicity and reliability but sacrifice branching/history and collaboration support.
- Recording coarse-grained actions simplifies logic but sacrifices the ability to rewind very fine-grained edits.

Link: [UI algorithms: a tiny undo stack](https://blog.julik.nl/2025/03/a-tiny-undo-stack)

---

## Tracing the thoughts of a large language model

**TLDR:** Anthropic presents interpretability work that links internal features into circuits and probes Claude 3.5 Haiku to show that models can represent a shared conceptual space across languages, plan multiple tokens ahead, and sometimes produce plausible but not truthful reasoning.

Summary:
Anthropic’s research is an exercise in opening the “black box” of LLMs by using neuroscience-inspired tools to identify features, link them into computational circuits, and trace information flows. They then apply these techniques to controlled tasks on Claude 3.5 Haiku, showing evidence for three important behaviors: a shared internal representation across languages (a kind of "language of thought"), lookahead planning over multiple tokens (planning vs. local token prediction), and the occasional fabrication of plausible-sounding but ultimately user-pleasing arguments.

This is important work: if we can map consistent circuits that implement certain capabilities, we gain both explanation and control. For builders, these findings support safer model use — you can design interventions at circuit-level points or monitor signals correlated with risky outputs. For researchers, it’s progress toward mechanistic interpretability: concrete pieces of computation we can name and reason about.

Caveats and missing context: interpretability methods are partial and brittle. Probing internal activations and correlating them with behaviors risks overfitting narratives: a correlated activation isn’t necessarily causal. The findings may not generalize across model sizes, architectures, or training regimes. The paper also leans toward optimistic language about what we can "see", while practical deployment requires operational tools to act on insights — something the research doesn’t fully operationalize.

What the author/research is avoiding: they don’t fully address how to turn internal insights into production-safe guardrails — for example, integrating circuit-level checks into inference pipelines, automated testing strategies for model behaviors, or the cost and engineering overhead of continual interpretability as models evolve. They also don't confront privacy or proprietary-data concerns when instrumenting models at scale.

For architects and teams:

- Use interpretability findings as an additional safety signal, not a silver bullet. Instrumentation and monitoring should expose runtime anomalies but still rely on black-box testing and human review.
- Expect to adopt layered defenses: dataset curation, prompt design, RLHF/EL, and runtime protections informed by interpretability work.
- Prepare for model drift: monitoring must detect behavior changes as models or prompts shift.

Key takeaways:

- Evidence that models can use a shared conceptual space and plan ahead changes how we think about their reasoning capabilities.
- Interpretability offers actionable insights, but correlation is not causation; operationalization is non-trivial.
- Models can craft plausible-sounding rationales that don’t reflect internal, truthful reasoning — insist on external verification for critical uses.

Tradeoffs:

- Investing in deeper interpretability gives you better diagnostic power but increases complexity and engineering cost in model maintenance pipelines.

Link: [Tracing the thoughts of a large language model](https://www.anthropic.com/research/tracing-thoughts-language-model)

---

## Why I stopped using AI code editors · Luciano Nooijen

**TLDR:** Luciano removed AI integrations from his editors because constant reliance eroded his competence — he now uses AI manually and cautiously. The essay is a measured personal account that warns teams to design boundaries for AI assistance.

Summary:
The author uses a vivid analogy: driving a Tesla with Full Self-Driving lulled them into passive driving, and when they returned to a “manual” car, their skills had atrophied. The same happened with AI-powered code editors. Initially, AI accelerates routine tasks, fixes obscure errors, and feels liberating. Over time, however, automated assistance shifted cognitive load away from the author’s active problem solving, producing a steady competence loss.

Luciano’s solution is pragmatic: remove always-on editor integrations and reserve LLMs for deliberate, manual actions. He argues the best uses of AI are when humans intentionally ask for help, preserving learning and ownership. This resonates: tools shape cognition. The piece sensitively explores downstream effects on skill, attention, and confidence.

What’s under-discussed: the essay is an individual case study and doesn't fully address team-level controls, configurability of AI tools, or how to design AI suggestions that teach rather than replace. It treats consumption of suggestions as binary — on or off — whereas real-world toolchains can provide graduated assistance: explain suggestions, show provenance, require confirmation, and track when suggestions are accepted.

For teams and architects:

- Treat AI assistance as an ergonomics and training issue. Define norms: CI gates, peer review, and mandatory explanations for accepting generated code.
- Use AI to augment learning — require that suggested changes include a short explanation, tests, or citations.
- Schedule "no-AI" exercises or code katas to keep skills sharp.

Key takeaways:

- Always-on AI can erode developer skills over time; deliberate, manual usage preserves competence.
- Team policies and tool configurability matter more than personal preference when adopting AI broadly.
- Design workflows that demand verification and learning rather than blind acceptance.

Tradeoffs:

- Gain immediate productivity and reduced tedium but sacrifice long-term skill retention and deep understanding unless you constrain the tool.

Link: [Why I stopped using AI code editors · Luciano Nooijen](https://lucianonooijen.com/blog/why-i-stopped-using-ai-code-editors/)

---

## GitHub - tunnckoCore/zodest: Modern Zod-based CLI builder, fully type-safe, super lightweight and flexible.

**TLDR:** zodest is a TypeScript-first CLI framework built on Zod for runtime validation and compile-time type inference, offering nested commands, aliases, global options, and reusable presets. It's promising for developer tools that want strong typing and runtime checks without heavy dependencies.

Summary:
zodest presents itself as a modern CLI builder that leans heavily on TypeScript and Zod. The selling points are familiar to TypeScript developers: strong type inference, runtime validation, nested commands, aliases, and a small surface API for defining commands, options, and arguments. The library emphasizes composability, allowing shareable command presets and global options that carry types through to action handlers.

This fits a clear niche: building CLIs where option schemas and validation are first-class citizens. The workflow is ergonomic for teams that already use Zod for server-side validation or schema-driven development. Runtime validation with Zod means inputs from argv are checked immediately, reducing a common source of runtime errors in CLIs. The ability to define nested, namespaced commands and share presets improves maintainability in medium-sized tooling projects.

Critique and missing pieces: the README-like content claims "zero runtime dependencies (except Zod)" and "fully type-safe", which is mostly true in spirit but worth unpacking. Zod itself is a runtime dependency; the quality of runtime safety depends on the thoroughness of schemas you write. The project blurs lines between compile-time types and runtime correctness: good schemas matter. The documentation excerpt doesn't address packaging as a standalone binary, cross-platform concerns, testing patterns for CLIs that use complex Zod schemas, or comparatives to established tools like yargs, oclif, or clap-like ecosystems. It also doesn't explain how it handles async actions, streaming I/O, or telemetry.

For architects and teams:

- Choose zodest for internal developer tooling where TypeScript and Zod are already standard — it reduces mismatch between validation and types.
- Use schema composition and shared presets to enforce consistent CLI behavior across mono-repos and micro-tools.
- Add integration tests that exercise edge-case parsing and schema failures; schema correctness is the primary safety net.

Key takeaways:

- zodest offers a modern, schema-first approach to building CLIs with great TypeScript ergonomics.
- Runtime validation via Zod reduces surprising runtime crashes but depends on well-crafted schemas.
- It's well-suited for internal tooling and developer-facing CLIs where DX and type-safety matter.

Tradeoffs:

- Gain strong type inference and runtime validation but sacrifice a learning curve and a dependency on Zod’s API and bundle size.
- Choosing zodest for production CLIs means you rely on Zod for runtime guarantees, which places more responsibility on schema design.

Link: [GitHub - tunnckoCore/zodest](https://github.com/tunnckoCore/zodest)

---

**Disclaimer:** This article was generated using [newsletter-ai](https://github.com/gmotyl/newsletter-ai) powered by gpt-5-mini LLM. While we strive for accuracy, please verify critical information independently..
