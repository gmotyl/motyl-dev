---
title: "Node.js Resilience, React Query Trade-offs, and the AI-Powered Developer"
excerpt: "From React Query's honest self-assessment to TanStack Start's client-first revolution, Kent C. Dodds building apps with AI agents, MCP servers on Cloudflare Workers, and the real challenge of scaling AI coding assistants across engineering teams."
publishedAt: "2026-03-20"
slug: "gitnation-react-query-tanstack-ai-development-2026-03-20"
hashtags: "#gitnation #react #tanstack #reactquery #typescript #ai #mcp #cloudflare #cursor #devtools #architecture #generated #en"
---

## React Query - The Bad Parts

**TLDR:** Dominik Dorfmeister, the maintainer of React Query, delivers a refreshingly honest talk about the library's trade-offs and limitations. Despite being used in roughly 20 percent of all React applications and enjoying overwhelmingly positive developer sentiment, React Query is not without its rough edges, and Dominik wants you to know about them before you commit.

React Query has had a remarkable run. Weekly downloads on npm have surged from nearly four million to six million, and surveys consistently show that fewer than three percent of developers who use it report dissatisfaction. That is an astonishing approval rating for any library, let alone one that handles something as notoriously tricky as asynchronous state management. But Dominik is not here to give you the marketing pitch. He wants to talk about the elephant in the room, starting with bundle size.

The bundle size myth is one worth dismantling. Yes, the npm package weighs in at over 700 kilobytes, but that number includes source maps and source files for debugging. The actual payload shipped to end users is substantially smaller, and with tree-shaking and selective imports, teams can pare it down even further. The real trade-offs are more nuanced. React Query does not support normalized caching, which means if you have deeply interconnected data models where the same entity appears in multiple queries, you are going to be refetching more than you might with a normalized cache like Apollo Client provides. Dominik argues that refetching after invalidation works perfectly fine for most use cases, and the simplicity you gain is worth the occasional extra network request. The library's declarative approach eliminates the need for hand-rolled data fetching solutions and gives you caching, request deduplication, and background updates essentially for free.

There is also the question of where React Query fits in the evolving React ecosystem. With suspense architecture and server components becoming more prominent, the landscape is shifting. The documentation could use a more structured flow to help newcomers navigate these decisions. And while TanStack Query can be a solid choice for Next.js applications, it is not always necessary when you are working with a mature framework that already handles data fetching patterns well. The honest conclusion is that React Query remains a compelling choice for the vast majority of React applications, but understanding where it falls short helps you make better architectural decisions.

**Key takeaways:**
- React Query's npm bundle size is misleading; the actual shipped size is much smaller thanks to tree-shaking
- The library does not support normalized caching, but refetching after invalidation works well for most scenarios
- React Query is used in approximately 20 percent of React applications with under 3 percent dissatisfaction
- The evolving React ecosystem with suspense and server components changes when and whether you need React Query
- Combining React Query with HTTP caching creates a robust multi-layer caching strategy

**Why do I care?** If you are already using React Query, this talk validates your choice while making you smarter about its boundaries. If you are evaluating it, this is the kind of honest assessment you rarely get from a library maintainer. Understanding that normalized caching is not on the table and that mature full-stack frameworks might not need it at all saves you from making architectural decisions you will regret later.

**Link:** [React Query - The Bad Parts](https://gitnation.com/contents/react-query-the-bad-parts)

---

## TanStack Start - A Client-Side First Full-Stack React Framework

**TLDR:** Tanner Linsley introduces TanStack Start, a new meta-framework for React that unapologetically puts the client first while layering on powerful server-side capabilities. Built on top of TanStack Router, it brings unmatched type safety, URL state management, and isomorphic data loading to a framework landscape that has been increasingly obsessed with the server.

There is a tension in the React ecosystem right now that nobody really talks about honestly. The industry has been sprinting toward server-first architectures for the past few years, and while that has delivered genuine improvements in full-stack capabilities, something has been lost along the way. The client-side experience, the thing that made building web applications exciting in the first place, has been deprioritized in favor of server rendering, server components, and server functions. Tanner Linsley felt that loss acutely, and TanStack Start is his answer.

The foundation is TanStack Router, which brings a level of type safety that goes beyond simply being written in TypeScript. Everything is fully inferred, meaning you can write a completely type-safe routing layer without ever writing a single type annotation. Links, search parameters, route middleware, relative navigation: all of it is checked at compile time. The team has also solved the performance scaling problem that plagues many TypeScript-heavy routing solutions. Whether you have ten routes or ten thousand, IDE performance remains consistent, and that is a genuinely impressive engineering achievement.

URL state management is another area where TanStack Start takes a strong position. The framework treats the URL as a first-class state container, with deeply integrated search parameter validation that allows nested routes to stack validation schemas. You get shareable, bookmarkable application state with built-in undo and redo through browser history, and you can even store JSON in the URL. The isomorphic loaders run on both the server during SSR and the client before navigation, and they integrate seamlessly with TanStack Query for features like polling and offline support. Server-side features include API routes, server functions, and middleware, with plans for React Server Components, websockets, and real-time primitives on the roadmap.

**Key takeaways:**
- TanStack Start is a client-first meta-framework that adds server capabilities without sacrificing the client-side developer experience
- Type safety is fully inferred, requiring zero type annotations for a completely type-safe routing layer
- URL state management supports JSON storage, nested validation schemas, and built-in undo/redo through browser history
- Isomorphic loaders run on both server and client, integrating with TanStack Query for polling and offline support
- The framework is currently in beta with plans for RSC support, websockets, and static pre-rendering

**Why do I care?** If you have been feeling like the server-first movement has been slowly eroding the joy of client-side development, TanStack Start is speaking directly to you. The type safety story alone is worth paying attention to, but the real value proposition is a framework that respects the client as a first-class citizen while still giving you the server-side tools you need. Whether it can compete with Next.js and Remix in the long run remains to be seen, but the architectural philosophy is sound and the technical execution is impressive.

**Link:** [TanStack Start - A Client-Side First Full-Stack React Framework](https://gitnation.com/contents/tanstack-start-a-client-side-first-full-stack-react-framework)

---

## How I Build Web Applications in 2026

**TLDR:** Kent C. Dodds shares his current workflow for building web applications, which has fundamentally shifted toward managing AI agents rather than writing code directly. Using Cursor and a disciplined approach to agent management, he demonstrates how deep web expertise combined with AI tools lets him ship features that would have previously required weeks of work.

Kent C. Dodds has been teaching people to build quality web applications for over a decade, and he is the first to tell you that the game has changed dramatically. His talk opens with a concrete example: a feature request for offline video downloads in his Epic Workshop app that had been sitting in the backlog because it represented a massive amount of work. In early 2026, thanks to rapid advances in AI tooling, he was able to build the entire feature in a matter of weeks, including bulk downloads, quality controls, and a seamless user experience.

The core insight of the talk is not that AI writes code for you. It is that your role as a developer has fundamentally shifted. You are now a project manager, product manager, and team lead for a squad of AI agents that have infinite stamina and zero context. That last part is critical. An AI agent is like a junior teammate who is incredibly fast but knows absolutely nothing about your codebase, your architecture, or your intentions until you tell it. This means that architecture becomes part of the prompt. The way you structure your code, your documentation, your conventions, all of it feeds into how effectively AI agents can operate in your codebase.

Kent emphasizes clear task scoping and iterative planning as essential skills in this new paradigm. You do not hand an AI agent a vague feature request and hope for the best. You break work into well-defined chunks, provide context through documentation and architecture decisions, and use tools like MCP servers to give agents access to the right information at the right time. He also uses BugBot for automated code review, closing the agent loop so that AI-generated code gets reviewed by another AI before human review. The workflow is not about replacing developer expertise. It is about amplifying it by letting AI handle implementation details while you focus on architecture, product decisions, and user experience.

**Key takeaways:**
- The developer role has shifted from writing code to managing AI agents that implement your architectural vision
- AI agents are like junior teammates with infinite stamina but zero context, making architecture and documentation critical
- Clear task scoping and iterative planning are essential skills for effective AI-assisted development
- MCP tools provide agents with contextual access to project information, improving output quality
- The workflow amplifies existing expertise rather than replacing it, with AI handling implementation while developers focus on architecture

**Why do I care?** This is not a theoretical talk about the future of development. Kent is describing workflows he uses right now, shipping real features to real users. The framing of developer-as-agent-manager is practical and actionable, and it challenges the notion that AI coding tools are just fancy autocomplete. If you are not already thinking about how your codebase architecture affects AI agent effectiveness, you are leaving significant productivity gains on the table.

**Link:** [How I Build Web Applications in 2026](https://gitnation.com/contents/how-i-build-web-applications-in-2026)

---

## From Experiment to Enterprise: Scaling AI Coding Assistants Across Engineering Teams

**TLDR:** Maxim Salnikov from Microsoft tackles the uncomfortable truth about AI coding assistant adoption: it is not a technology problem, it is a change management problem. Drawing on GitHub's Well-Architected framework and his daily interactions with engineering leaders, he lays out a tactical three-phase approach to making AI-powered development scale with intent and trust.

There is a gap, and it is growing. Companies are buying licenses for AI coding assistants at an accelerating pace, but the distance between purchasing seats and seeing return on investment is often enormous. Maxim has seen this pattern repeatedly in his work helping engineering leaders navigate adoption, and his diagnosis is blunt: we keep treating this as a technology problem when it is fundamentally about changing how people work.

The framework he presents has three phases: onboard, adopt, and succeed. Onboarding sounds simple, ensure developers have access to licenses, but the devil is in the details. You need clear policies distinguishing vetted from unvetted tools, because without them you end up with shadow AI, which is significantly worse than shadow IT. Developers who are not using the tools you have provided are not sitting idle. They are pasting code into ChatGPT, connecting to random MCP servers, and doing things that would give your security team nightmares. Self-service provisioning and granular security guardrails are non-negotiable at this stage.

The concept Maxim wants you to remember is human infrastructure. You cannot succeed with AI developer tool adoption without building three pillars: AI advocates who are naturally ahead of the curve and willing to share both successes and failures, communities of practice that go beyond a Slack channel and require active nurturing, and executive sponsorship that involves genuine leadership commitment rather than just buying pizza for an occasional event. On the measurement side, he warns against the trap of optimizing a single metric like code review speed without considering the broader impact on code quality and developer happiness. The metrics need to be interconnected and segmented, distinguishing between dedicated users, occasional users, and tire kickers rather than looking at averages that obscure what is actually happening.

**Key takeaways:**
- AI coding assistant adoption is a change management problem, not a technology problem
- Shadow AI, where developers use unvetted tools, is a serious security and consistency risk
- Human infrastructure consisting of AI advocates, communities of practice, and executive sponsorship is essential
- Single-metric optimization like code review speed can be misleading without considering code quality and developer satisfaction
- Segment usage data into dedicated users, occasional users, and tire kickers rather than relying on averages

**Why do I care?** If you are in any kind of leadership position at an engineering organization, this talk is a reality check. The gap between buying AI tool licenses and seeing meaningful returns is real, and most organizations are not addressing the human side of the equation. The shadow AI warning alone should be enough to make you audit what your developers are actually using versus what you think they are using.

**Link:** [From Experiment to Enterprise: Scaling AI Coding Assistants Across Engineering Teams](https://gitnation.com/contents/from-experiment-to-enterprise-scaling-ai-coding-assistants-across-engineering-teams)

---

## Building MCP Tools for AI Agents with Cloudflare Workers

**TLDR:** This hands-on workshop teaches participants how to build a production-ready Model Context Protocol server on Cloudflare Workers, covering tool endpoint definition, external API integration, KV state persistence, and global deployment for real-time AI agent invocation.

The Model Context Protocol has quickly become one of the most important standards in the AI tooling ecosystem, and this workshop focuses on the practical side of building MCP servers that AI agents can actually use in production. Running on Cloudflare Workers means these servers deploy globally with minimal latency, which matters when AI assistants are invoking your tools in real time during conversations and coding sessions.

The workshop walks through the full lifecycle of an MCP server: defining tool endpoints that AI agents can discover and invoke, integrating with external APIs to give agents access to real-world data and services, using Cloudflare KV storage for state persistence across invocations, and deploying everything to Cloudflare's global edge network. By the end, participants have a live MCP server they can extend and secure for their own projects.

What makes this particularly relevant right now is the convergence of several trends. AI coding assistants like Cursor and Claude are increasingly relying on MCP for tool integration, Cloudflare Workers provide a cost-effective and performant deployment target, and the demand for custom AI agent tooling is growing rapidly as teams move beyond generic assistant capabilities toward domain-specific AI workflows.

**Key takeaways:**
- MCP servers on Cloudflare Workers deploy globally with low latency for real-time AI agent tool invocation
- The workshop covers the full lifecycle from tool definition to external API integration and state persistence
- Cloudflare KV storage enables stateful MCP tools that maintain context across agent invocations
- Building custom MCP tools is becoming essential as AI assistants move toward domain-specific workflows

**Why do I care?** MCP is rapidly becoming the standard protocol for extending AI assistants with custom capabilities, and knowing how to build production-ready MCP servers is a skill that will only increase in value. Cloudflare Workers as a deployment target is a smart choice for the latency and cost characteristics that AI agent tooling demands. If you are building AI-powered developer tools or integrating AI into your product, understanding MCP server architecture is no longer optional.

**Link:** [Building MCP Tools for AI Agents with Cloudflare Workers](https://gitnation.com/contents/building-model-context-protocol-mcp-tools-for-ai-agents-with-cloudflare-workers)
