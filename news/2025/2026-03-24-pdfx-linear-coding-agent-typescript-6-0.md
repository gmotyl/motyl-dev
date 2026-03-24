---
title: "PDFx, Linear's Coding Agent, and TypeScript 6.0"
excerpt: "Shadcn/ui for PDFs, building AI agents that ship code, and the final JavaScript-based TypeScript release"
publishedAt: "2026-03-24"
slug: "pdfx-linear-coding-agent-typescript-6-0"
hashtags: "#dailydev #frontend #react #typescript #ai #webdev #architecture #generated #en"
---

## PDF Component Library - PDFx

**TLDR:** PDFx is an open-source React PDF component library inspired by shadcn/ui, built on @react-pdf/renderer with 20 components, CLI tooling, theme support, and TypeScript safety.

**Summary:**

PDFx takes the shadcn/ui philosophy and applies it to PDF generation. Instead of installing a monolithic library, you copy-paste components directly into your codebase. Tables, charts, headers, footers, signatures. Twenty components total, all built on top of @react-pdf/renderer. The components are yours to modify, extend, and own.

There's a CLI tool for scaffolding, theme support for consistent styling, and full TypeScript safety throughout. This approach solves a real problem with PDF libraries. Most are black boxes. You import them, hope they do what you need, and when they don't, you're stuck. PDFx flips that. The code is in your repo. You can fix bugs. You can add features. You're not waiting on maintainers.

The shadcn/ui model has proven itself for UI components. Applying it to PDFs makes sense. PDFs are often an afterthought in React apps. Reports, invoices, receipts. They need to look professional, but you don't want to spend weeks building a PDF engine. PDFx gives you the building blocks without the baggage.

**Key takeaways:**

- Open-source, copy-paste React PDF component library
- Built on @react-pdf/renderer with 20 components
- CLI tool, theme support, TypeScript safety included
- Components copied into codebase, not installed as dependency
- Inspired by shadcn/ui's ownership model

**Why do I care:**

As a frontend architect, I've seen teams struggle with PDF generation. It's always a side concern until it's a blocking issue. PDFx offers a pragmatic middle ground. You're not building from scratch, but you're not locked into a black box either. The copy-paste model means you own the code. That matters for long-term maintenance. I'd recommend this for any React team that needs PDF output without the complexity of a full PDF service. It's practical, well-typed, and follows a proven pattern.

**Link:** [PDF Component Library - PDFx](https://app.daily.dev/posts/6RvXJKqLE)

---

## How we built a Linear coding agent: the hard parts

**TLDR:** daily.dev built Huginn, a coding agent integrated into Linear that automates the full workflow from ticket to PR, tackling challenges like wrapping Claude Code, building fallback parsers, and handling LLM output parsing.

**Summary:**

This is a deep dive into building Huginn, a coding agent that lives inside Linear and automates the entire workflow from ticket to pull request. The hard parts weren't the obvious ones. It wasn't about prompting the LLM correctly. It was the engineering around the LLM.

They wrapped Claude Code and Codex as child processes, dealing with undocumented streaming formats. Think about that. You're building production software on top of tools that don't have stable APIs. Every update could break your parsing. They built a three-tier fallback parser for structured LLM output. When the first parser fails, the second tries. When that fails, the third attempts recovery. This is the unglamorous work that makes AI agents actually usable.

The post covers the real engineering challenges. Not "how do we prompt better," but "how do we build reliable systems around unreliable components." That's the difference between a demo and a product. Anyone can prompt an LLM. Building a system that survives edge cases, network failures, and model updates. That's engineering.

**Key takeaways:**

- Huginn automates full workflow from Linear ticket to PR
- Wrapped Claude Code and Codex as child processes
- Built three-tier fallback parser for LLM output
- Dealt with undocumented streaming formats
- Focus on engineering reliability, not just prompting

**Why do I care:**

This is the kind of post I wish more teams would write. Anyone can build a demo. Building production software around LLMs requires handling failure modes, edge cases, and undocumented APIs. As a senior architect, I care deeply about reliability. Huginn's three-tier fallback parser is the kind of defensive engineering that separates hobby projects from production systems. If you're building AI agents, read this. Not for the prompts, but for the engineering patterns around handling uncertainty. That's where the real work is.

**Link:** [How we built a Linear coding agent: the hard parts](https://app.daily.dev/posts/kaAWQy79n)

---

## Structure Shapes Success: Conway's Law, AI Teams & Hexagonal Architecture

**TLDR:** Conway's Law states that system design mirrors team communication structure. Using hexagonal architecture as a metaphor, this post argues intentional team organization is critical to product quality.

**Summary:**

Conway's Law is one of those truths that seems obvious once you hear it. Systems end up reflecting the communication structures of the teams that build them. This post connects that law to hexagonal architecture, also known as ports-and-adapters. The hexagon isn't just a shape. It's a pattern from nature. Beehives use hexagons because they're efficient. Each cell connects cleanly to its neighbors, with clear boundaries.

Hexagonal architecture applies that same principle to software. Your core business logic sits in the center. Adapters connect it to the outside world. Databases, APIs, UIs. Each adapter has a clear boundary. Change one without affecting the others. The post draws parallels to team organization. Tesla vs. GM. AWS microservices. When teams are organized around clear boundaries, the software reflects that clarity.

The argument is that intentional team organization isn't just about productivity. It's about architecture. If you want clean modular systems, you need clean modular teams. You can't refactor your way out of organizational dysfunction. The structure shapes the success.

**Key takeaways:**

- Conway's Law: system design mirrors team communication structure
- Hexagonal architecture provides clear boundaries like beehive cells
- Intentional team organization critical to product quality
- Examples include Tesla vs. GM and AWS microservices
- Clean modular systems require clean modular teams

**Why do I care:**

As an architect and consultant, I've seen this pattern repeatedly. Teams organized around features build modular systems. Teams organized around layers build layered monoliths. The org chart becomes the architecture diagram. This matters for AI teams too. If you're building AI agents, how you organize the team determines how the agents integrate. Hexagonal architecture isn't just a technical pattern. It's an organizational one. I'd recommend this post to any leader designing teams. The technical architecture will follow the social architecture. Make sure the social architecture is intentional.

**Link:** [Structure Shapes Success: Conway's Law, AI Teams & Hexagonal Architecture](https://app.daily.dev/posts/2j3xyCMC0)

---

## GitHub - open-gitagent/gitagent: A framework-agnostic, git-native standard for defining AI agents

**TLDR:** gitagent is an open-source standard for defining AI agents using git repositories, with agent.yaml manifests, SOUL.md identity files, and directories for skills, tools, workflows, memory, and compliance.

**Summary:**

gitagent proposes a fascinating standard for AI agents. Instead of framework-specific configurations, your agent lives in a git repository. Add an agent.yaml manifest file. Add a SOUL.md file that defines the agent's identity. Optionally include directories for skills, tools, workflows, memory, and compliance. The repository becomes a portable agent definition.

This is framework-agnostic by design. You're not locked into a specific AI platform. The agent definition is just files in version control. You can review changes. You can branch agents. You can merge improvements. It treats agent development like software development, because it is software development.

The git-native approach solves real problems. Agents need versioning. They need collaboration. They need audit trails. Git provides all of that. By making the repository the unit of agent definition, gitagent leverages decades of tooling and best practices. CI/CD for agents. Code review for prompts. Branching for experiments.

**Key takeaways:**

- Framework-agnostic standard for AI agent definition
- Uses git repositories as portable agent containers
- agent.yaml manifest, SOUL.md identity file
- Optional directories for skills, tools, workflows, memory
- Leverages git for versioning, collaboration, audit trails

**Why do I care:**

This is a pragmatic approach to agent development. Too many AI tools create proprietary formats. Your agents are locked into their platform. gitagent says: use git. It's already on your machine. Your team already knows it. The learning curve is zero. As an architect, I appreciate this restraint. Not everything needs a new framework. Sometimes the best tool is the one you already have. For teams building multiple agents, this standardization could be valuable. Agents become composable. You can share skills across agents. You can audit changes over time. I'd watch this space. If it gains traction, it could become the standard way to organize agent code.

**Link:** [GitHub - open-gitagent/gitagent](https://app.daily.dev/posts/IvWrMeLCM)

---

## TypeScript 6.0 release notes: what changed and what's deprecated before 7.0

**TLDR:** TypeScript 6.0 is the final JavaScript-based version, introducing Temporal API types, strict mode by default, and deprecating legacy options before the Go-native compiler in 7.0.

**Summary:**

TypeScript 6.0 marks an endpoint. It's the final version built on the JavaScript codebase. After this comes 7.0, which uses a Go-native compiler. This release is a bridge. It adds new standard library types for TC39 Stage 4 proposals. Temporal API, Map upsert methods, RegExp.escape. These are the APIs coming to JavaScript, and TypeScript is ready with types.

The breaking changes are significant. Strict mode is now on by default. The types array in tsconfig is empty by default, which can cut build times up to 50%. Module defaults to esnext. Target defaults to es2025. These defaults reflect modern JavaScript. If you're still targeting ES5, you're in the minority.

Then there are the deprecations. baseUrl is out. ES5 target support is ending. Module namespaces are deprecated. outFile is going. moduleResolution:node is being replaced. These aren't random changes. They're clearing legacy options before 7.0 arrives. TypeScript 7.0 is already available in VS Code preview and on npm. Full release expected within months. The JavaScript-based compiler is reaching end of life.

**Key takeaways:**

- Final JavaScript-based TypeScript version before Go-native 7.0
- New types for Temporal API, Map upsert, RegExp.escape
- Strict mode on by default, types:[] empty by default
- Build times can drop up to 50% with new defaults
- Deprecations: baseUrl, ES5, module namespaces, outFile, moduleResolution:node
- TypeScript 7.0 available in VS Code preview now

**Why do I care:**

If you're maintaining TypeScript projects, this release demands attention. The defaults have changed. Your tsconfig might need updates. If you're using any deprecated features, now's the time to migrate. The 50% build time improvement from types:[] empty is significant for large codebases. As a senior developer, I'd recommend updating to 6.0 soon, but testing thoroughly. The strict mode default could break existing code. Better to find those issues now than when 7.0 forces the change. And start planning for 7.0. The Go-native compiler will be faster, but there might be edge cases. Test early, test often.

**Link:** [TypeScript 6.0 release notes](https://app.daily.dev/posts/kynZFJI6r)

---

## Structure Shapes Success: Conway's Law, AI Teams & Hexagonal Architecture

**TLDR:** Conway's Law states that system design mirrors team communication structure. Using hexagonal architecture as a metaphor, this post argues intentional team organization is critical to product quality.

**Summary:**

Conway's Law is one of those truths that seems obvious once you hear it. Systems end up reflecting the communication structures of the teams that build them. This post connects that law to hexagonal architecture, also known as ports-and-adapters. The hexagon isn't just a shape. It's a pattern from nature. Beehives use hexagons because they're efficient. Each cell connects cleanly to its neighbors, with clear boundaries.

Hexagonal architecture applies that same principle to software. Your core business logic sits in the center. Adapters connect it to the outside world. Databases, APIs, UIs. Each adapter has a clear boundary. Change one without affecting the others. The post draws parallels to team organization. Tesla vs. GM. AWS microservices. When teams are organized around clear boundaries, the software reflects that clarity.

The argument is that intentional team organization isn't just about productivity. It's about architecture. If you want clean modular systems, you need clean modular teams. You can't refactor your way out of organizational dysfunction. The structure shapes the success.

**Key takeaways:**

- Conway's Law: system design mirrors team communication structure
- Hexagonal architecture provides clear boundaries like beehive cells
- Intentional team organization critical to product quality
- Examples include Tesla vs. GM and AWS microservices
- Clean modular systems require clean modular teams

**Why do I care:**

As an architect and consultant, I've seen this pattern repeatedly. Teams organized around features build modular systems. Teams organized around layers build layered monoliths. The org chart becomes the architecture diagram. This matters for AI teams too. If you're building AI agents, how you organize the team determines how the agents integrate. Hexagonal architecture isn't just a technical pattern. It's an organizational one. I'd recommend this post to any leader designing teams. The technical architecture will follow the social architecture. Make sure the social architecture is intentional.

**Link:** [Structure Shapes Success: Conway's Law, AI Teams & Hexagonal Architecture](https://app.daily.dev/posts/2j3xyCMC0)