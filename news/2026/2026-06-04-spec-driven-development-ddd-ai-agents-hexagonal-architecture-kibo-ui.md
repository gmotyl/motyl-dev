---
title: "Spec-Driven Development, DDD for AI Agents, Hexagonal Architecture, and Kibo UI"
excerpt: "A look at how classic software engineering ideas are making a comeback in the AI era, plus a practical guide to ports and adapters and a new React component library."
publishedAt: "2026-06-04"
slug: "spec-driven-development-ddd-ai-agents-hexagonal-architecture-kibo-ui"
hashtags: "#dailydev #frontend #react #typescript #ai #architecture #ddd #hexagonal #generated #en"
source_pattern: "daily.dev"
---

## Spec-Driven Development: Why AI Is Bringing an Old Software Engineering Idea Back to Life

**TLDR:** Spec-Driven Development, the practice of writing a detailed specification before generating code, is experiencing a revival because AI has dramatically reduced the cost of turning specifications into working software. The better your spec, the better your AI output. This is not a new idea, but it has never been this practical.

**Summary:** I have to say, this article from The Serverless Edge hit me somewhere personal. We have all experienced the chaos of jumping straight into code without a clear picture of what we are building. The authors frame this moment really well: AI exposes weaknesses in organisational thinking. If your team cannot write a clear specification, it is often because the team never clearly defined its vision, its principles, or its architecture standards. The AI is not the problem. The fuzzy thinking is the problem, and AI just makes that visible faster.

The core argument is that Spec-Driven Development shifts the bottleneck away from implementation and toward clarity, intent, and context. AI agents can generate code, create tests, propose architectures, and automate implementation tasks, but only if the specification is solid. What feels new here is that AI has made the cost of turning a good spec into running software absurdly low. That changes the economics of the whole discipline.

What I find genuinely useful in this piece is the framing around small batches. Teams keep making the mistake of writing enormous specifications and expecting AI agents to build entire systems in one pass. That rarely works. The lesson is the same one we learned with Agile: small batches, fast feedback, iterative delivery. The specification evolves alongside the product, just as software does.

The article also makes a strong case for ownership. Someone has to be accountable for the quality of the specification. The tech lead and the team own it. Product managers contribute requirements, but engineering leaders remain accountable for ensuring specs are technically sound, implementable, and operationally viable. That is a healthy tension to name explicitly.

Perhaps the most interesting shift described here is the emergence of context as a first-class engineering artefact. Modern AI development requires providing architecture standards, security requirements, testing strategies, release processes, and operational constraints alongside the requirements themselves. Context is becoming the new source code.

**Key takeaways:**
- AI makes spec-driven development practical at scale by reducing the cost of turning specs into working software
- Small batches and iterative delivery still outperform large upfront design even in an AI-assisted workflow
- BDD, TDD, and DDD are more valuable now, not less, because better engineering discipline produces better AI-assisted outcomes
- Verification and validation matter more than code generation as generating software becomes cheaper
- The tech lead and team own the specification; product contributes but engineering stays accountable

**Why do I care:** As a senior frontend developer, I spend a non-trivial amount of time dealing with the fallout of under-specified features. When AI is in the loop, under-specification compounds fast. I have personally seen AI coding assistants produce technically correct but completely wrong implementations because the prompt was vague. The shift toward treating the specification as a first-class artefact, not an afterthought, is exactly the discipline we need to make AI tooling actually productive rather than just fast.

**Link:** [Spec-Driven Development: Why AI Is Bringing an Old Software Engineering Idea Back to Life](https://theserverlessedge.com/spec-driven-development-ai-software-engineering/)

---

## How Domain-Driven Design Changed My Approach to AI Agent Architecture

**TLDR:** A startup founder with six years of engineering experience picked up the "Blue Book" on Domain-Driven Design, and it transformed how he thought about building AI agent systems. The result was Mozaik, a TypeScript framework for orchestrating AI agents using event-driven, asynchronous communication patterns.

**Summary:** This is a remarkably honest piece. The author, Miodrag Vilotijević, admits that after six years as a software engineer he thought he already knew most of what mattered in programming. Reading Eric Evans' Domain-Driven Design proved him wrong in the best possible way. What makes the article work is that it is not a dry summary of DDD concepts. It is a personal account of using those concepts to solve a real problem: building a vibe coding platform as a solo developer where the codebase was becoming unmanageable.

The lesson that resonates most is domain distillation. The author split his platform into several subdomains but identified AI coding as the core domain, the area where the unfair advantage needs to live. Everything else, user accounts, billing, deployment, observability, gets treated as a supporting concern. This distinction sounds simple but most engineering teams never make it explicitly.

The trickiest part of the story is how to build a rich domain layer for AI agents without letting infrastructure leak into it. The author's answer was to model orchestration through events. Instead of having an agent directly call an LLM, he introduced an Inference Runner and a Function Call Runner that live in the infrastructure layer. The agent fires events, the runners execute the infrastructure-heavy work, and then notify the agent back with results. This keeps the domain layer clean while enabling agents to handle multiple requests without blocking each other.

The emergent benefit of this design is that asynchronous agents are fundamentally more capable than synchronous ones. A synchronous agent waits for the previous step to finish. An event-driven agent can react to user messages, function call outputs, inference results, and messages from other agents concurrently. The author calls this the first real insight from applying DDD to his startup, and it rings true.

The broader point is about what DDD forces you to do. It forces you to model domain concepts rather than technology. The domain layer contains real business logic, not just data structures. When you apply that discipline to AI agent systems, you end up with architectures that are genuinely easier to reason about and extend.

**Key takeaways:**
- Domain distillation means identifying and isolating the core domain from supporting concerns like billing, auth, and notifications
- The domain layer must not depend on infrastructure: no direct LLM calls, no HTTP requests, no file system access from within the domain
- Modeling agent orchestration through events eliminates blocking and enables truly concurrent, non-blocking AI agent workflows
- Asynchronous event-driven agents are more flexible and capable than synchronous request-response agents
- DDD forces you to model the domain rather than the technology, leading to architectures that reveal new design possibilities

**Why do I care:** The pattern the author describes, an event-driven domain layer where agents react to events rather than block on infrastructure calls, maps directly onto problems I see in frontend AI integrations. Most AI chat components are built as synchronous request-response UIs. Rethinking them as event-driven systems would make them more resilient and more capable. This article is worth reading even if you never touch a TypeScript agent framework.

**Link:** [How Domain-Driven Design Changed My Approach to AI Agent Architecture](https://www.jigjoy.ai/blog/ddd-applied-to-agent-orchestration)

---

## Ports and Adapters (Hexagonal Architecture), Explained with Two Real Codebases

**TLDR:** A developer walks through three real-world cases, two backend and one frontend, where the ports and adapters pattern eliminated painful vendor migrations and unblocked a frontend team from waiting on a backend that was not ready. The article is practical, concrete, and mercifully free of theory for its own sake.

**Summary:** I love articles that start with a standup meeting. This one opens with the scenario of finance deciding to switch email providers and the engineer searching the codebase to find twenty-eight files all calling the email SDK directly, each in its own way, with its own retry logic and its own quirks. That is not a rare situation. That is most codebases after two years of production.

The pattern the author describes is simple to state. Put an interface between your business logic and the outside world, and let the business logic depend only on that interface. The port is the interface defined in your domain language. The adapter wraps a specific provider and translates between your domain language and the provider's API. The registry decides which adapter is active at runtime. Three folders, one rule: code inside the application layer can import from ports, never from adapters.

The backend case study is the most satisfying. A marketplace in Bangladesh was running with bKash as the only payment provider. The product team wanted to add Stripe for international cards and SSLCommerz as a fallback. Before the refactor, every checkout route, webhook handler, and refund script imported the bKash SDK directly. After the refactor, adding Stripe meant writing one new adapter file and changing one line in the registry. Checkout did not move. Webhook handlers did not move. The refund flow did not move.

The frontend case is the one I think more developers need to hear. A frontend team had three weeks to ship a sports tracking dashboard. The backend team had six weeks of work ahead of them. Instead of using mocks that would need to be ripped out later, they used the ports and adapters pattern with static adapters returning the exact shape the real APIs would eventually return. When each backend endpoint shipped, flipping one toggle in the registry moved that page to real data. Not a single component file changed during the migration.

The author is also honest about when not to use this pattern. Most code does not have this problem. If a library is stable, will not be replaced, and lives in one or two files, just call the library. The rule of two is a good heuristic: one implementation with no real plan for a second, skip the port. Two implementations or a real conversation about adding one, build it.

**Key takeaways:**
- The port is an interface defined in your domain language, with no provider-specific terminology leaking into it
- Adapters wrap individual providers and translate between domain language and provider-specific APIs
- The rule of two: build the port when you have two implementations or a realistic plan for a second one
- Keeping static or fake adapters alive after real ones ship gives you deterministic test data without spinning up external services
- Design the port before writing the first adapter; writing the adapter first causes the port to be shaped like the provider rather than like your domain

**Why do I care:** The frontend case study describes exactly the situation I find myself in on projects where API contracts are still evolving. Building UI components against a well-defined port, backed by a static adapter, is a disciplined approach that I have seen done poorly with ad-hoc mocks many times. This article articulates the better way clearly and with actual production evidence.

**Link:** [Ports and Adapters (Hexagonal Architecture), Explained with Two Real Codebases](https://saadh393.github.io/blog/adapter-port-architecture-two-cases)

---

## Kibo UI: A Composable React Component Library Built on Shadcn

**TLDR:** Kibo UI is an open-source React component library that extends shadcn/ui with higher-level, production-ready components like rich text editors, Gantt charts, Kanban boards, file dropzones, and AI chat primitives. It is MIT licensed, built on Tailwind CSS and Radix UI, and was acquired by Shadcnblocks in October 2025.

**Summary:** If you have been using shadcn/ui and hitting the ceiling of its base primitives, Kibo UI is the natural next step. The pitch is straightforward: shadcn/ui gives you foundational components, and Kibo UI gives you the more complex, opinionated components that sit one level above those primitives. Tables with real sorting and pagination, Gantt charts, Kanban boards, color pickers, QR codes, file dropzones, calendar views. Things that would take days to build well from scratch.

What I appreciate about the approach is the philosophy of composability. Kibo components are not black boxes. They are built on the same Tailwind CSS variable theming as shadcn/ui, which means they integrate cleanly with any existing shadcn setup and can be restyled to match your design system. The components come with real functionality, not just pre-styled markup.

The library currently offers over 40 core production-ready components with more than 1,000 variants, plus a blocks layer that provides pre-built sections like login pages and dashboards. That blocks layer is the part I find most interesting for teams moving fast. Instead of assembling a login page from primitives, you drop in a block and customize it. The time saved compounds quickly across a real project.

The acquisition by Shadcnblocks in October 2025 is worth noting. Shadcnblocks operates what it calls the world's largest block library for shadcn/ui, so the combination of Kibo's component depth with Shadcnblocks' block breadth could make this a genuinely comprehensive solution for teams building on the shadcn/Tailwind/Radix stack.

**Key takeaways:**
- Kibo UI extends shadcn/ui with higher-level components including rich text editors, Gantt, Kanban, file dropzones, and AI chat primitives
- All components use the same Tailwind CSS variable theming as shadcn/ui, making integration seamless
- The library is MIT licensed, fully open source, and composable rather than opinionated about final styling
- The blocks layer provides pre-assembled page sections for common UI patterns like dashboards and login pages
- Kibo UI was acquired by Shadcnblocks in October 2025, combining deep component coverage with a large block library

**Why do I care:** shadcn/ui has become the de-facto starting point for React component libraries, but its scope is intentionally narrow. Every project ends up needing a rich text editor, a date range picker, or a file uploader at some point, and those are not trivial to build well. Kibo UI filling that gap with components that are stylistically compatible and composable is genuinely useful. I would reach for it before building these components from scratch on any production project.

**Link:** [Kibo UI Documentation](https://www.kibo-ui.com/docs)
