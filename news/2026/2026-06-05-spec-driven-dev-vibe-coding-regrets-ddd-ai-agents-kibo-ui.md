---
title: "Spec-Driven Dev, Vibe-Coding Regrets, DDD Meets AI Agents, and Kibo UI"
excerpt: "This week's developer digest covers why AI is making spec-driven development mainstream, a hard-won lesson about vibe-coding architecture debt, applying Domain-Driven Design to AI agent orchestration, and Kibo UI as the component library that picks up where shadcn/ui leaves off."
publishedAt: "2026-06-05"
slug: "spec-driven-dev-vibe-coding-regrets-ddd-ai-agents-kibo-ui"
hashtags: "#dailydev #frontend #webdev #typescript #react #architecture #ai #ddd #vibe-coding #ui-components #generated #en"
source_pattern: "daily.dev"
---

## Spec-Driven Development: Why AI Is Bringing an Old Software Engineering Idea Back to Life

**TLDR:** Spec-Driven Development is the practice of writing clear, detailed specifications before generating code, and AI has suddenly made this economically viable at scale. The quality of the spec now directly determines the quality of the software, which means fuzzy thinking produces broken systems faster than ever.

**Summary:** There is something almost poetic about watching the software industry rediscover ideas it abandoned twenty years ago. Executable specifications, model-driven development, and spec-first workflows all had their moment in the sun and faded because the tooling made them painful and the ROI was dubious. AI has changed the denominator completely. When the cost of turning a detailed spec into working code drops dramatically, suddenly investing serious time in the specification makes obvious sense.

The article from The Serverless Edge makes this argument well. The core claim is that better specifications produce better software outcomes, and AI does not remove the need for incremental delivery. This second point matters more than the headline, because a lot of teams are making the mistake of writing enormous "build the entire system" specs and then being surprised when agents produce incoherent messes. Small batches still win. The spec evolves alongside the product.

What I find genuinely interesting is the observation that AI exposes organizational weaknesses in thinking. If your team cannot write a clear specification, it often means nobody has actually articulated the vision, the architectural standards, or the operating model in concrete terms. AI just makes this visible faster and more brutally. Teams that have their thinking sorted will thrive. Teams with vague strategies will produce vague software, just faster.

The article outlines four emerging models: Spec-First (create before code), Spec-Driven (AI continuously refines the spec alongside you), Spec-Source (the spec is the primary source of truth), and Spec-Aligned (spec and code evolve together). Most organizations will land on a hybrid. The article also correctly notes that verification is becoming more important than generation. Generating code is easy now. Verifying that it does what you intended is still hard.

What the author is not fully confronting: writing good specifications is genuinely difficult. The premise assumes teams can get better at writing specs, but most organizations have deeply ingrained habits of "figure it out as we go." Changing that culture takes longer than buying a new AI tool. The article also does not discuss what happens when specs are ambiguous or contradictory at scale, which is the real failure mode. BDD, TDD, and DDD returning to relevance is real and I agree with it, but the author is somewhat optimistic about adoption speed.

**Key takeaways:**
- AI has reduced the cost of turning specifications into working software, making spec-first development practical
- Small batch delivery and fast feedback loops remain essential even with AI assistance
- Teams with clear organizational thinking and well-defined standards will get dramatically better AI outcomes
- Verification and validation of AI-generated code matters more than generation speed
- Context is now a first-class engineering artifact alongside code

**Why do I care:** As someone thinking about how to build software with AI at scale, this maps directly to what I see in production. The teams getting good results from agents are the ones with tight feedback loops, clear architectural constraints written down somewhere the AI can read, and a habit of breaking work into small verified slices. The teams complaining about agents are the ones who want to prompt once and walk away. Spec-driven development is not a new methodology. It is basic engineering discipline with better tooling.

**Link:** [Spec-Driven Development: Why AI Is Bringing an Old Software Engineering Idea Back to Life](https://theserverlessedge.com/spec-driven-development-ai-software-engineering)

---

## I'm Going Back to Writing Code by Hand

**TLDR:** A developer spent seven months building a Kubernetes TUI tool entirely through vibe-coding sessions with Claude, then had to scrap the whole codebase because AI-generated architecture debt accumulated invisibly until everything collapsed. The post is a specific, honest account of exactly what went wrong and how to prevent it.

**Summary:** This is the most technically honest post-mortem on vibe-coding I have read. The developer behind k10s, a GPU-aware Kubernetes dashboard, archived seven months of work and is starting over, not because the features did not work, but because the architecture became unmaintainable. The detail here is unusually good, which makes it worth reading even if you have seen a dozen "AI coding is not all it seems" takes.

The central problem was a god object: one massive struct holding everything, a five-hundred-line Update function, and no view isolation. The author identified five specific patterns that led to this state. AI builds features, not architecture. Every prompt delivers the feature by taking the shortest path, and that path always leads through the existing monolith. The result is a single struct with ninety-plus fields, magic number array indexing, and key bindings that do three different things depending on which string comparison the dispatch function hits first.

The velocity illusion is the most psychologically acute observation in the piece. When each feature feels free to add, you expand scope without realizing you are spending against a fixed complexity budget. The developer started building a GPU-focused tool for a niche audience and ended up building a general-purpose Kubernetes TUI because the AI made each addition feel cheap. The complexity was invisible right up until everything stopped working simultaneously.

The concurrency issue is worth calling out specifically. Bubble Tea, the Go TUI framework, expects Update to be the only place state mutates. But the AI generated closures that mutated model fields from goroutines without locks, because "mutate it in the closure" is the shortest path to working code. This produced data races that appeared maybe one percent of the time, in ways that looked like display glitches rather than bugs.

The solutions are concrete: write the architecture yourself before any code, put ownership rules and invariants in your CLAUDE.md so the AI reads them on every prompt, define typed structs instead of positional string arrays, and keep background tasks from ever mutating UI state directly. The author is rewriting in Rust, partly for the type system guarantees that make "impossible states impossible." Whether that specific choice is right for you is secondary to the principle: the AI will follow your rules if you write them down. It just will not invent them.

What the author is somewhat avoiding: the tool he was building already exists as k9s, and a significant portion of the architectural debt came from building a general-purpose tool that duplicated an established project. The DDD framing of "find your core domain and protect it" would have helped here. The author acknowledges the scope creep but frames it as a velocity illusion trap, when it is also just a product strategy mistake. The rewrite in Rust will face the same pressures unless the scope is locked from day one.

**Key takeaways:**
- AI generates features, not architecture; you must define the architecture yourself before the first prompt
- Put concrete invariants, state ownership rules, and scope limits in your CLAUDE.md or AGENTS.md
- Typed data structures beat positional arrays; let the compiler enforce column identity
- Background workers must never mutate UI state directly; all mutations go through the main event loop
- Vibe-coding creates a velocity illusion that expands scope without revealing the growing complexity budget

**Why do I care:** This post is the counterweight to every demo video showing AI building an app in fifteen minutes. The fifteen minutes is real. The seven months of debt that follows is also real. The takeaway for me is not "stop using AI" but "treat CLAUDE.md as the architectural contract between you and your agent." Every project using AI assistance should have explicit invariants written down before a single line of implementation is generated. The author learned this through pain. You do not have to.

**Link:** [I'm Going Back to Writing Code by Hand](https://blog.k10s.dev/im-going-back-to-writing-code-by-hand)

---

## How Domain-Driven Design Changed My Approach to AI Agent Architecture

**TLDR:** A startup founder building a vibe-coding platform read Eric Evans's Domain-Driven Design book and realized it solved the architectural problems he was facing with AI agent orchestration, specifically how to keep infrastructure out of the domain layer while still giving agents rich behavior.

**Summary:** This is a personal essay more than a technical tutorial, but the technical insight at the center is genuinely interesting. The author was building Mozaik, a TypeScript framework for AI agent orchestration, and ran into the classic DDD tension: how do you build a rich domain model for agents when the agents need to call LLMs, and LLM calls are obviously infrastructure?

His solution was to remove async calls from the domain layer entirely by modeling orchestration through events. Rather than letting an agent send an inference request directly, an Inference Runner sits in the application layer. The agent receives a message, notifies runners via an observer pattern, and the runners execute the infrastructure actions. When done, they notify the agent back. The domain layer has no LLM calls, no HTTP requests, nothing infrastructure-flavored. It reacts to events and models the business logic of orchestration.

This is a clean solution to a real problem. Synchronous agent architectures are rigid: one agent waits for another to finish. Event-driven agents can handle multiple requests and agent-to-agent communication flows without blocking. The author notes this opened architectural possibilities he did not anticipate, which is the hallmark of a good domain model: it reveals new opportunities rather than just organizing existing ones.

The broader arc of the post is about rediscovering that software engineering fundamentals matter more than ever in an era of AI-assisted coding. The author ran a team that split a monolith into microservices incorrectly, left the job knowing the product domain barely at all, and resolved to do it right the next time. Reading Evans cover to cover twice is what got him there. The lesson about core domain isolation, separating the unique competitive advantage from commodity infrastructure like billing and auth, is particularly relevant for anyone building AI-native products where the core domain is genuinely novel.

What the author is not fully wrestling with: event-driven architectures have their own failure modes, and the observer pattern he describes can become difficult to trace and debug at scale. The article also conflates two different things: DDD as a design methodology and DDD as a microservice splitting heuristic. Evans himself was skeptical about the microservice framing that got attached to his work. The insight about "core domain" is valuable, but the article presents it as a clean answer when it is more of a useful lens that still requires hard judgment calls.

**Key takeaways:**
- Event-driven agent architectures enable non-blocking, parallel agent execution where synchronous ones cannot
- Keep infrastructure out of the domain layer by modeling orchestration through events and runners
- Domain distillation: identify your core domain (where your competitive advantage lives) and isolate it from supporting services like auth and billing
- Rich domain models have behavior, not just data structures; anemic models are a warning sign
- Domain insight, the kind that changes how you think about the product, comes from modeling deeply, not moving fast

**Why do I care:** The intersection of DDD and AI agent design is underexplored. Most agent frameworks I see treat agents as imperative pipelines with no real domain model underneath. The author's observation that async agents open more opportunities than sync agents is practically useful, and the pattern of separating inference runners from domain logic maps cleanly onto how I think about agentic systems. If you are building anything beyond a simple single-agent flow, this framing is worth your time.

**Link:** [How Domain-Driven Design Changed My Approach to AI Agent Architecture](https://www.jigjoy.ai/blog/ddd-applied-to-agent-orchestration)

---

## Kibo UI

**TLDR:** Kibo UI is a React component library positioned as the complement to shadcn/ui, adding the more complex, opinionated components that shadcn deliberately leaves out. Think rich editors, calendars, data grids, and similar heavy-lifting pieces.

**Summary:** The framing on the Kibo UI homepage is direct: shadcn/ui wraps Radix UI primitives and stays intentionally minimal. Kibo UI fills the gap with components that are more complete out of the box. This is a real gap. Anyone who has shipped a production shadcn/ui app has run into the point where the primitive-based approach requires significant assembly work for things like rich text editing or complex data tables. Kibo UI is betting that there is a market for pre-assembled, styled, copy-paste-ready versions of those harder components.

The positioning is smart because it does not compete with shadcn/ui directly. It extends it. You can use both: shadcn for your foundational buttons, inputs, and layout primitives, Kibo for the heavy specialized components where you do not want to build from scratch. The community reception has been warm, with developers describing it as "the missing parts of shadcn/ui."

What I would want to know before adopting Kibo in a production project: how stable is the API, what is the maintenance trajectory, and are the dependencies reasonable. A library that fills gaps in shadcn/ui needs to stay current as shadcn evolves. The shadcn ecosystem moves quickly. The available content on Kibo UI is still thin enough that it is hard to fully evaluate this from public information alone, but the approach is sound.

What the project is not addressing: the fundamental question of whether copy-paste component libraries are the right model at this complexity level. shadcn's copy-paste approach works well for simple components because the code is understandable. Richer, more complex components become harder to own after copying. The more complex a component is, the more you want it versioned and maintained by someone else. Kibo UI's model will face this tension as its components grow in complexity.

**Key takeaways:**
- Kibo UI complements rather than replaces shadcn/ui, targeting the complex components shadcn intentionally omits
- The copy-paste model extends to heavier components like rich text editors and data tables
- Community reception has been positive among developers already using shadcn/ui
- The library is early-stage and worth watching but evaluate stability before production adoption

**Why do I care:** The shadcn/ui ecosystem has a real gap in complex, opinionated components. If Kibo UI fills it with the same quality and ownership model that shadcn established, that is genuinely useful. I would explore it for any new project where I need a rich editor or complex data grid and do not want to integrate a full third-party library with its own design system. The risk is ecosystem fragmentation: too many complementary shadcn libraries makes the "pick your own stack" promise harder to execute.

**Link:** [Kibo UI](https://www.kibo-ui.com/)
