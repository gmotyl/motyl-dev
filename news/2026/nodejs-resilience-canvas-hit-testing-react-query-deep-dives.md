---
title: "Node.js Resilience, Canvas Hit Testing, and React Query Deep Dives"
excerpt: "Matteo Collina makes the case that Node.js is far from dead with 271 million downloads in a single month, Steve Ruiz reveals the geometry-based hit testing magic behind tldraw, and TanStack's React Query workshop pushes beyond the basics into prefetching and cache persistence."
publishedAt: "2026-03-20"
slug: "nodejs-resilience-canvas-hit-testing-react-query-deep-dives"
hashtags: ["#gitnation", "#nodejs", "#react", "#typescript", "#tldraw", "#react-query", "#canvas", "#performance", "#ai-agents", "#architecture", "#mastra", "#vercel-ai-sdk", "#generated", "#en"]
---

## The State of Node.js 2025

**TLDR:** Matteo Collina delivers a thorough reality check on Node.js, debunking the recurring "Node.js is dead" narrative with hard data. With 271 million downloads in December 2024 alone and NPM ecosystem growth of roughly 50 percent year over year, Node.js remains one of the most widely deployed runtimes in production. TypeScript support is now built in and expected to be stable by Node 24 LTS.

**Summary**

Every year, someone declares Node.js dead, and every year, the download numbers tell a completely different story. Matteo Collina opened his JSNation 2025 talk with a montage of "XYZ will destroy Node.js" predictions, then proceeded to methodically dismantle each one with data. The NPM ecosystem remains the largest open source package registry on the planet, with modular usage growing around 50 percent annually and doubling every two years. Half of all Node.js downloads turn out to be header files, pulled automatically whenever a binary addon needs to be compiled, which is a fascinating detail that explains the sheer volume of traffic hitting the registry.

Node.js now runs TypeScript natively, without any build step, and the feature is on track to become stable when Node 24 enters LTS. Performance improvements continue as well, with open telemetry tracing seeing roughly a 7 percent improvement thanks to V8 engine changes. The permission system has matured, allowing developers to constrain file system access for their processes, which is a meaningful security enhancement for production deployments.

One of the more sobering points was around version adoption. Node 18 is out of support, yet it was still being downloaded 50 million times in May. Node 12, which should have been retired long ago, is actually seeing rising download numbers. This suggests a significant portion of the ecosystem is running on unsupported, potentially vulnerable versions, which is a real problem that the community needs to address more aggressively.

**Key takeaways**

- Node.js hit 271 million downloads in December 2024, rising to 375 million per month by May
- NPM ecosystem doubles roughly every two years in modular usage
- Native TypeScript support is expected to stabilize in Node 24 LTS
- Open telemetry tracing improved by 7 percent due to V8 changes
- The Node.js permission system now constrains file system access for enhanced security
- A disturbingly large portion of users remain on unsupported versions like Node 12 and 18

**Why do I care?**

If you are running Node.js in production, and statistically you probably are, the version adoption data alone should give you pause. Running unsupported versions is not just a best-practice violation; it is a genuine security risk. On the positive side, native TypeScript support removes a significant source of build complexity, and the permission system gives you production hardening capabilities that did not exist a year ago. The "Node is dead" narrative is not just wrong, it is counterproductive, because it distracts from the real conversation about keeping deployments current and secure.

**Link:** [The State of Node.js 2025](https://gitnation.com/contents/the-state-of-nodejs-2025)

---

## Why Node.js Needs an Application Server

**TLDR:** Matteo Collina argues that the community has been deploying Node.js wrong for years by treating it as a simple runtime behind a reverse proxy. He introduces Watt, an application server that uses SO_REUSEPORT for kernel-level load distribution, achieves 93 percent faster median latency than PM2 clusters, and can orchestrate frontend frameworks alongside backend microservices in a single deployment unit.

**Summary**

This is a provocative talk that challenges a fundamental assumption most Node.js developers have internalized: start a process, put it behind nginx, scale horizontally, and call it a day. Matteo Collina makes the case that this approach papers over deep architectural problems, specifically the single-threaded event loop bottleneck, inefficient resource utilization, fragmented tooling, and the operational complexity of juggling multiple services.

The solution he proposes is Watt, a proper application server for Node.js. The architecture leverages SO_REUSEPORT, a socket option that enables kernel-level load distribution without the overhead of inter-process communication. Multiple workers within a single deployment unit can achieve near-linear scaling, which is a significant improvement over the traditional cluster module approach where the master process becomes a bottleneck.

The benchmark numbers are striking. Watt shows 93 percent faster median latency compared to PM2 clusters and 99.8 percent reliability under sustained load. These are not synthetic benchmarks either; they reflect the kind of real-world workloads you see with Next.js, Fastify, or any CPU-bound Node.js application. The unified runtime can orchestrate frontend frameworks like Next.js alongside backend microservices, which eliminates a lot of the Docker Compose complexity that teams currently deal with.

**Key takeaways**

- Traditional Node.js deployment patterns (process plus reverse proxy) ignore fundamental architectural bottlenecks
- SO_REUSEPORT enables kernel-level load distribution without IPC overhead
- Watt achieves 93 percent faster median latency compared to PM2 clusters
- 99.8 percent reliability under sustained load in benchmarks
- A unified runtime can run frontend frameworks and backend services together
- Near-linear scaling with multiple workers in a single deployment unit

**Why do I care?**

If you have ever fought with PM2, Docker Compose configurations, or nginx reverse proxy setups for Node.js, this talk directly addresses your pain. The claim of 93 percent latency improvement is bold, and it would be worth validating independently, but the architectural reasoning is sound. SO_REUSEPORT is a well-understood mechanism in the Linux kernel, and using it to replace IPC-based clustering is a genuinely clever approach. Whether or not you adopt Watt specifically, the mental model shift from "runtime behind a proxy" to "application server" is worth internalizing. It changes how you think about deployment topology, resource utilization, and operational complexity.

**Link:** [Why Node.js Needs an Application Server](https://gitnation.com/contents/why-nodejs-needs-an-application-server)

---

## What's Under the Pointer? Hit Testing in tldraw

**TLDR:** Steve Ruiz takes the audience on a deep dive into tldraw's hit testing system, revealing how the infinite canvas SDK determines which shape is beneath the user's cursor. Rather than relying on DOM events, tldraw uses a geometric system in JavaScript with bounding boxes and distance calculations in a two-phase approach, all while rendering everything as React components instead of a canvas element.

**Summary**

Hit testing sounds trivial until you have thousands of overlapping shapes on an infinite canvas and need to determine which one the user intends to interact with. Steve Ruiz's talk at React Advanced 2025 peels back the layers on what he calls "five hundred of the most confusing lines of code in tldraw," and the result is a fascinating exploration of computational geometry in a React context.

The original tldraw used DOM events for hit testing, with hidden SVG paths behind each shape to absorb pointer events. The visible shape had pointer-events set to none, while the hidden path behind it captured clicks. This gave the "close enough" hover behavior users expect, where you do not need to land exactly on a thin line to select it. But this approach required adjusting the size of the hidden path based on zoom level to maintain consistent behavior in screen space versus page space, and it simply did not scale.

The new approach abandons DOM-based hit testing entirely in favor of a geometric system written in JavaScript. It uses a two-phase approach: first, bounding box checks to quickly eliminate shapes that are obviously not under the pointer, and then distance calculations for the remaining candidates. This is essentially the broad phase and narrow phase pattern from game engine collision detection, applied to a productivity tool. The fact that tldraw renders everything as React components rather than using a canvas element makes this even more impressive, because it means they are doing custom geometry math on top of DOM elements, getting the best of both worlds: the flexibility of React's component model with the precision of geometric hit testing.

**Key takeaways**

- tldraw abandoned DOM-based hit testing in favor of a custom geometric system in JavaScript
- A two-phase approach uses bounding boxes for broad elimination, then distance calculations for precision
- The canvas is made entirely of React components, not a canvas element, enabling integration with videos, iframes, and standard web elements
- Hollow shapes need proximity-based selection near edges, while filled shapes respond anywhere inside
- Zoom level affects hit testing behavior and must be accounted for in screen space versus page space
- tldraw is introducing AI agents ("fairies") that operate directly on the canvas

**Why do I care?**

Even if you are not building an infinite canvas application, the patterns here are broadly applicable. The two-phase hit testing approach is a classic optimization pattern from game development that translates well to any application dealing with spatial queries, whether that is a drag-and-drop interface, a data visualization, or a map. The decision to use React components instead of a canvas element is particularly instructive. It shows that you can have high-performance spatial interactions without abandoning the React component model, which matters if you need to embed rich web content like videos or iframes alongside your custom graphics.

**Link:** [What's Under the Pointer?](https://gitnation.com/contents/whats-under-the-cursor)

---

## Agents on the Canvas With tldraw

**TLDR:** Steve Ruiz explores the infinite canvas as a surface for real-time collaboration between multiple AI agents and multiple users, tracing tldraw's AI journey from makereal (often cited as the first "vibe coding" tool) through drawing assistants, AI workflows, and ultimately spatialized agents operating directly on the canvas.

**Summary**

This talk represents a fascinating evolution from tldraw's core canvas technology into the AI agent space. The journey started with makereal.tldraw.com in November 2023, which is often credited as the first "vibe coding" tool to reach escape velocity. Users could draw UI mockups on the canvas and have them converted into working code in real time. From there, the team explored real-time drawing assistance with drawfast, autocomplete functionality, and a teaching interface at teach.tldraw.com.

The more recent work gets genuinely interesting. In 2024, tldraw shipped a canvas-based AI workflows application at tldraw.computer, essentially turning the infinite canvas into a visual programming environment for AI pipelines. They then released a public starter kit for building cursor-style AI agents that operate on the canvas, and most recently, the "fairies" experiment at fairies.tldraw.com, which places spatialized agents directly on the canvas where they can interact with user content in real time.

The core question the talk grapples with is whether the future of AI interaction lives on the canvas rather than in a chat window. When you give AI agents spatial awareness and the ability to manipulate objects on a shared surface, you get a fundamentally different interaction model than the sequential back-and-forth of a chat interface.

**Key takeaways**

- tldraw's AI journey spans from makereal (November 2023) through workflows, teaching tools, and spatialized agents
- makereal is frequently cited as the first "vibe coding" tool to achieve mainstream traction
- The infinite canvas provides a fundamentally different AI interaction surface compared to chat interfaces
- AI agents with spatial awareness can collaborate with users on shared visual surfaces in real time
- The starter kit at tldraw.dev enables developers to build their own canvas-based AI agent experiences
- The "fairies" experiment demonstrates multiple agents operating simultaneously on the same canvas

**Why do I care?**

The chat interface has dominated AI interaction design for the past few years, but it is not the only paradigm. tldraw's exploration of canvas-based AI agents opens up interaction models that are impossible in a linear chat format: spatial reasoning, simultaneous multi-agent collaboration, and direct manipulation of visual artifacts. If you are building AI-powered tools, especially anything involving visual content, spatial layouts, or collaborative workflows, the canvas metaphor may be a better fit than the chat window you are probably defaulting to. The public starter kit also means you can experiment with this approach without building a canvas from scratch.

**Link:** [Agents on the Canvas With tldraw](https://gitnation.com/contents/agents-on-the-canvas-with-tldraw)

---

## Build LLM Agents in TypeScript with Mastra and Vercel AI SDK

**TLDR:** This workshop introduces the TypeScript stack for building LLM-based agents, using the Vercel AI SDK for model connectivity and Mastra as a framework for turning code into production-ready AI agents. It positions TypeScript developers to enter the agentic AI space without switching to Python.

**Summary**

The AI agent ecosystem has been heavily dominated by Python, with frameworks like LangChain and CrewAI setting the tone. This workshop from Eric Burel at React Advanced 2025 makes the case that TypeScript developers do not need to abandon their language to build sophisticated AI agents. The stack consists of two primary components: the Vercel AI SDK handles the connection to language models, providing a clean abstraction over different providers, while Mastra provides the framework for structuring agents with tools, workflows, and a development environment.

The distinction the workshop draws between "traditional" AI development and what it calls "agentic AI" is important. Traditional AI development often involves Python, model training, and data science workflows. Agentic AI, by contrast, is a branch of software engineering where generative AI models are composed with regular code to create autonomous systems. This is fundamentally a software engineering problem, not a data science problem, which is why TypeScript is a natural fit.

Mastra provides the scaffolding for defining tools that agents can use, workflows that chain operations together, and a development environment for testing and iterating. The workshop recommends Google's Gemini as a free starting point for learning and OpenRouter as an alternative for accessing multiple model APIs through a single interface.

**Key takeaways**

- Agentic AI is a software engineering discipline, not a data science one, making TypeScript a natural fit
- The Vercel AI SDK provides model-agnostic connectivity to LLM providers
- Mastra offers a structured framework for building production-ready AI agents with tools and workflows
- Google Gemini is recommended as a free entry point for experimentation
- OpenRouter provides access to multiple model APIs through a single interface
- The workshop positions TypeScript developers to build AI agents without switching to Python

**Why do I care?**

If you are a TypeScript developer who has been watching the AI agent explosion from the sidelines because everything seems to require Python, this is your on-ramp. The Vercel AI SDK plus Mastra combination gives you a familiar development experience with proper TypeScript typing, and Mastra's structured approach to agents, tools, and workflows prevents the kind of spaghetti code that often results from ad-hoc LLM integration. That said, be realistic about the maturity of the TypeScript AI ecosystem compared to Python. The tooling is improving rapidly, but you will occasionally encounter gaps in documentation and community resources.

**Link:** [Build LLM Agents in TypeScript with Mastra and Vercel AI SDK](https://gitnation.com/contents/build-llm-agents-in-typescript-with-mastra-and-vercel-ai-sdk)

---

## React Query: Beyond the Basics

**TLDR:** This React Summit 2026 workshop goes deep on advanced React Query patterns including prefetching with route loader integration, query cache seeding, smooth pagination, and state persistence through full page reloads. The focus is on eliminating unnecessary loading spinners and minimizing layout shifts for the best possible user experience.

**Summary**

React Query has become the de facto standard for server state management in React applications, but most teams are only scratching the surface of what it can do. This workshop from React Summit 2026 targets developers who already understand the fundamentals and want to push into the patterns that separate adequate data fetching from genuinely excellent user experiences.

The workshop builds a sample application and incrementally enhances it with a single guiding principle: deliver the snappiest possible interactions with minimal layout shifts and zero unnecessary loading spinners. This means moving beyond simple useQuery calls and into the territory of prefetching, which includes integration with route loaders so data is ready before a component even mounts. Query cache seeding takes this further by pre-populating the cache with data you already have, avoiding redundant network requests entirely.

Pagination is another area where basic React Query usage often falls short. The naive approach results in loading states between every page transition, which creates a jarring experience. The advanced patterns covered here enable smooth transitions where the previous page remains visible while the next page loads in the background. Finally, persistence plugins allow query state to survive full page reloads, which is particularly valuable for applications where users might refresh the page or navigate away and return.

**Key takeaways**

- Prefetching with route loader integration ensures data is available before components mount
- Query cache seeding eliminates redundant network requests by pre-populating with existing data
- Advanced pagination patterns keep previous data visible while loading the next page in the background
- Persistence plugins allow query state to survive full page reloads
- The overarching goal is eliminating loading spinners and minimizing layout shifts
- Prior React Query knowledge is expected; this is not a beginner workshop

**Why do I care?**

Loading spinners are the enemy of perceived performance, and React Query gives you the tools to eliminate most of them if you know the advanced patterns. The route loader integration for prefetching is particularly powerful because it aligns data fetching with navigation intent, meaning the data starts loading the moment the user signals they want to go somewhere, not after the new route component mounts and triggers a useEffect. If you are already using React Query but your application still shows loading states on most navigation transitions, this workshop covers exactly the patterns you need to fix that.

**Link:** [React Query - Beyond the Basics](https://gitnation.com/contents/react-query-beyond-the-basic)
