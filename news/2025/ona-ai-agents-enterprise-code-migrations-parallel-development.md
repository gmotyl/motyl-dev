---
title: "Ona: AI-Powered Code Migrations and Agent Orchestration at Enterprise Scale"
excerpt: "Exploring how Ona (formerly Gitpod) transforms enterprise software development through AI agents, parallel execution, and secure migration capabilities"
publishedAt: "2025-11-15"
slug: "ona-ai-agents-enterprise-code-migrations-parallel-development"
hashtags: "#generated #en #ai #devops #architecture #cloud #aws #gcp #security #enterprise #migration #agents #vscode #jetbrains #cicd #kubernetes #docker"
---

## Ona (formerly Gitpod): AI Software Engineers

**TLDR:** Ona is an enterprise AI software engineering platform that combines autonomous agents with secure, sandboxed development environments. It enables organizations to orchestrate large-scale code migrations, parallel agent execution, and standardized development workflows while maintaining strict security controls and compliance.

**Summary:**

Ona represents a fundamental shift in how enterprises approach software development at scale. The platform builds on three core pillars: Ona Environments (secure, ephemeral, pre-configured development spaces), Ona Agents (professional software engineering agents executing tasks autonomously), and Ona Guardrails (security, compliance, and governance controls). This architecture addresses a critical enterprise challenge: how to leverage AI coding capabilities without sacrificing security, auditability, or developer experience.

What makes Ona particularly compelling is its deployment flexibility. Organizations can run it in Ona's cloud or deploy entirely within their own VPC on AWS or Google Cloud. This matters tremendously for regulated industries where data residency and network isolation are non-negotiable. The platform integrates with existing AI providers—Anthropic, Google Vertex, AWS Bedrock—allowing enterprises to bring their own model relationships and run inference within their security perimeter.

The platform's approach to development environments deserves attention. Each environment is fully isolated with OS-level separation, automatically configured with all necessary tools, dependencies, and secrets. This isn't just convenient; it's a security architecture. When agents operate in ephemeral, sandboxed environments that are destroyed after task completion, the attack surface collapses. No persistent state, no cross-contamination between projects, no secret leakage between contexts.

For architects and teams, Ona's value proposition centers on eliminating environmental drift and accelerating time-to-productivity. New developers can start contributing immediately without spending days configuring local development environments. The same standardization applies to AI agents, which receive identical, compliant environments every time they execute. This consistency is what makes autonomous agent orchestration viable at enterprise scale.

**Key takeaways:**

- Enterprise-grade AI development platform combining autonomous agents with secure, isolated development environments
- Flexible deployment in Ona Cloud or customer VPC (AWS, GCP) with BYOM (Bring Your Own Model) inference
- Supports VS Code in browser, JetBrains IDEs, Cursor, Claude Code, and Windsurf for maximum developer choice
- Built-in compliance features: SSO/OIDC, audit logs, domain verification, and policy enforcement

**Tradeoffs:**

- Running in customer VPC provides maximum security but increases infrastructure management complexity
- Ephemeral environments eliminate persistent state issues but require discipline around secret management and configuration-as-code

**Link:** [Ona (formerly Gitpod) | AI software engineers](https://ona.com/)

---

## AI Coding in Production: Lessons from 18 Months at Axuall

**TLDR:** After 18 months of using AI coding tools in production, Axuall's CTO argues that AI-assisted development works when paired with strong engineering culture and modern SDLC. The biggest impact isn't speed—it's raising the baseline quality of what engineers deliver.

**Summary:**

Michael Hawkins, CTO at Axuall, delivers a refreshingly pragmatic take on AI coding in production environments. His thesis cuts through the hype and dismissiveness: AI-assisted development works, but only when treated as a force multiplier within a rigorous engineering process, not as a replacement for one.

The most insightful observation is that AI's primary value isn't velocity—it's raising the floor of engineering quality. AI consistently helps developers handle edge cases they might overlook, produce richer unit tests, follow architectural patterns more consistently, and navigate unfamiliar codebase areas without interrupting colleagues. These aren't flashy improvements, but they're the difference between good and excellent software.

Hawkins makes a crucial point about risk assessment. The common critique "I wouldn't put AI-generated code in production" reveals a fundamental misunderstanding. AI-written code flows through the same pipeline as human-written code: PR reviews, automated tests, CI/CD gates, and QA validation. If your SDLC can't catch flawed AI output, the problem isn't the AI—it's your development process. The SDLC is the great equalizer.

The article addresses a critical technical reality about prompting. Yes, AI can write an entire application from a single prompt. No, the result won't be good. But when scoped effectively—individual functions, complete features with clear requirements, large refactors in well-patterned codebases—AI performs exceptionally. This isn't a limitation; it's engineering discipline. Prompting has become the new "Google-Fu," requiring clarity and specificity to get quality results.

For architects and teams, the productivity story is nuanced. Axuall hasn't seen story cycle times cut in half, but they've seen meaningful gains in test coverage, edge case handling, fewer context switches, faster onboarding, and better PR conversations focused on design rather than syntax. AI raises both the floor and the ceiling of what teams can achieve.

The competitive angle is stark: teams that refuse to embrace AI are working with a deliberate handicap. It's analogous to insisting your team work in plain text editors without autocomplete while competitors use modern IDEs. The gap will compound quickly.

**Key takeaways:**

- AI raises the baseline quality of engineering output: better edge case handling, richer tests, consistent architectural patterns
- AI code should flow through the same SDLC gates as human code—if your pipeline can't validate it, that's a process problem
- Effective AI usage requires clear prompting and appropriate scoping: excellent for functions and features, poor for vague "build everything" requests
- Real productivity gains show in quality and completeness, not just raw speed

**Tradeoffs:**

- AI amplifies existing expertise but doesn't substitute for it—senior engineers get dramatically better results because they can evaluate and guide solutions effectively

**Link:** [AI Coding in Production: Lessons from 18 Months in the Real World](https://axuall.com/post/ai-coding-in-production-lessons-from-18-months-in-the-real-world/)

---

## The Future of Agentic Coding: Harness Optimizations

**TLDR:** A comprehensive roadmap of agentic coding improvements coming in 2026, arguing that context management—not raw model capability—is the primary unlock for AI coding agents. Plan mode, research, parallelization, and self-improvement are the key optimization vectors.

**Summary:**

This deep dive from the Seconds0 Substack articulates a critical insight about AI coding tools: there's "a billion dollars inside that model, and your job is to prompt it out." The burden isn't just providing coherent direction; it's managing context—getting the right information into the model and, crucially, keeping the wrong information out. Context management is everything, and harness improvements will extract massive value from existing models.

The article walks through the evolution and future of "plan mode," which has become table stakes since Chain of Thought proved that giving LLMs the ability to plan dramatically improves performance. Current plan modes are simplistic—decompose the prompt, make a basic plan, maybe ask a few questions. But sophisticated planning should involve multiple pages of documentation references, architecture diagrams, code snippets, and coding practices. The author expects the plan:execute ratio to flip from today's 20:80 to 80:20, with agents reliably one-shotting features because of superior upfront planning.

Search and context retrieval are undergoing a revolution. The industry started with RAG (which mostly sucked), discovered grep (which works well), and is now converging on a hybrid approach combining grep and embeddings search. Cursor's research validates this: the combination is meaningfully more effective and feeds into reinforcement learning data flywheels. This matters because anything that more reliably provides exact context just-in-time directly translates to model performance.

Documentation retrieval via tools like Context7 MCP represents another massive optimization opportunity. The ability to fetch current, indexed reference documentation on-demand provides material gains in coding accuracy. This scales in importance as you move away from the model's knowledge cutoff date. Future implementations will involve parallel agents fetching relevant docs just-in-time, equivalent to a human engineer opening the appropriate docs page before implementing.

The most provocative prediction is the "captain's chair" UX: a single, long-running chat with a project management-type agent that only dispatches subagents who do all actual coding and validation. The prime agent manages work trees, merge conflicts, and subagent coordination while the developer focuses on validation and course correction. This addresses the human cost of parallel agent management—context switching is expensive for humans, so give them one thing to focus on.

For architects and teams, the roadmap is clear: harnesses will manage context for users, leverage model intelligence to improve their own outputs, conform to users and their specific use cases, and scale development speed through parallelization. The gap between teams embracing these optimizations and teams waiting for "perfect" models will grow quickly.

**Key takeaways:**

- Context management—not just model capability—is the primary unlock for AI coding performance
- Plan mode will evolve from simple task decomposition to sophisticated 80:20 planning:execution ratios with research and requirements gathering
- Hybrid search (grep + embeddings) plus just-in-time documentation retrieval will become standard for accurate context provision
- "Captain's chair" UX will emerge: single PM agent managing parallel executor subagents to minimize human context switching
- Best of N sampling and Mix of Models (planning with expensive models, executing with fast ones) will optimize cost/speed/quality tradeoffs

**Tradeoffs:**

- Sophisticated planning increases upfront token cost but dramatically improves one-shot success rates, reducing total iteration cycles

**Link:** [Here's What's Next in Agentic Coding](https://seconds0.substack.com/p/heres-whats-next-in-agentic-coding)

---

## The Evolution from Rules-Based Migrations to AI Agents

**TLDR:** Enterprise code migrations are shifting from rigid, rules-based transformation systems like OpenRewrite to AI agent orchestration. Agents can handle context-dependent transformations and proprietary APIs that rule-based recipes cannot, with validation through actual compilation and testing.

**Summary:**

This article from Ona tackles a less glamorous but strategically vital enterprise challenge: large-scale code migrations across thousands of repositories. Before AI agents, the only viable approach was rules-based systems like OpenRewrite, which used deterministic "recipes" to apply transformations. While useful, these systems remained confined to large tech companies with Java-heavy codebases and dedicated engineering resources.

OpenRewrite emerged from Netflix's "freedom and responsibility" culture accumulating technical debt. When asked to clean up manually, developers responded: "I don't have time, but if you do it for me, I'll merge it." OpenRewrite automated this through Lossless Semantic Trees (LST), open-sourced in 2018. Its typical customers are large enterprises—particularly financial institutions—with aging Java systems creating security vulnerabilities and talent acquisition problems.

The fundamental limitations of rules-based approaches are structural: they work only with predetermined patterns requiring upfront scripting investment. No recipes exist for custom frameworks or proprietary APIs. Creating recipes requires deep Java AST knowledge. Tools are designed primarily for JVM languages. Most critically, rules operate on syntactic patterns without understanding business logic, potentially producing functionally inappropriate changes.

These gaps are precisely where AI agents add value: understanding context and business logic, adapting to unique codebase patterns, and validating that changes actually function through comprehensive testing. Unlike rules that operate on individual repositories, agent orchestration platforms can coordinate hundreds of simultaneous transformations across thousands of repositories using complete, isolated development environments with access to compilers, testing frameworks, and dependency management.

Ona's architecture demonstrates this practically. Each agent operates within an isolated development environment functioning as a secure sandbox. Agents don't just transform code—they validate it, run test suites, and iterate until migrations work. The platform orchestrates hundreds of environments simultaneously while operating entirely within customer VPCs, maintaining security perimeters and regulatory compliance.

For architects and teams, this represents infrastructure to shift from reactive, manual migration processes to strategic, automated, centrally-orchestrated capabilities. Organizations are moving from security vulnerability notifications to delegated auto-remediation with pull requests raised across multiple repositories. Language migrations like Java 8 upgrades become routine rather than year-long projects. Architectural standardization aligns continuously with ADRs and RFC implementations.

**Key takeaways:**

- Rules-based migration systems like OpenRewrite work well for predetermined patterns but struggle with custom frameworks, proprietary APIs, and context-dependent transformations
- AI agents can understand business logic context and validate changes through actual compilation and testing, not just syntactic pattern matching
- Agent orchestration enables parallel migrations across thousands of repositories with isolated, sandboxed environments
- Organizations shift from reactive, manual migrations to continuous, automated architectural standardization

**Tradeoffs:**

- Rules-based systems offer predictability and auditability preferred by compliance frameworks but lack flexibility for edge cases and custom codebases
- Agent-based approaches provide context-aware flexibility but require robust testing and validation infrastructure to ensure correctness

**Link:** [The evolution of code migrations from rules-based tools to agents](https://ona.com/stories/rules-based-migrations-to-agents)

---

## Turning Agent Autonomy into Productivity with Chris Weichel

**TLDR:** Interview with Ona's CTO covering the challenges of creating robust development environments for AI agents, managing permission controls and isolation, and the future of IDEs as agents become more autonomous.

**Summary:**

This Software Engineering Daily interview with Chris Weichel, CTO at Ona (formerly Gitpod), explores the infrastructure requirements for AI-native software development. Weichel brings over two decades of experience in software engineering and human-computer interaction, providing a grounded perspective on what's required to operationalize coding agents at enterprise scale.

The central challenge addressed is environment management for AI agents. As agents become more autonomous and handle longer-running tasks, the demands around permission controls, environment isolation, and resource management have amplified dramatically. It's not sufficient to give an agent access to a codebase; you need to provide complete development environments with proper boundaries, security controls, and validation capabilities.

Weichel discusses parallel agent execution—a paradigm shift in how developers work. Rather than sequential task completion, developers can orchestrate multiple agents working simultaneously on different aspects of a system. This requires sophisticated environment orchestration and conflict resolution, but the productivity multiplier is substantial. The developer's role evolves from coder to conductor, directing multiple specialized agents rather than writing every line of code personally.

An interesting topic is the future of IDEs in an agent-first world. As agents handle more of the direct code writing, IDE requirements shift. Developers need better tools for reviewing agent work, managing parallel agent execution, visualizing dependencies and changes, and maintaining architectural coherence across agent-generated code. The IDE becomes less about text editing and more about orchestration, validation, and design.

Code review emerges as a potential new bottleneck in the SDLC. When agents can generate code at 10x human speed, the review process becomes the constraint. This isn't necessarily bad—it shifts engineering focus toward design, architecture, and validation rather than implementation details. But it requires tooling and process adaptations to handle the increased review volume without sacrificing quality.

For architects and teams, the infrastructure takeaway is clear: AI-native development requires more than just API access to language models. It requires complete environment orchestration, security isolation, parallel execution capabilities, and sophisticated monitoring and governance. Organizations building internal AI coding platforms need to solve these infrastructure challenges, not just prompt engineering.

**Key takeaways:**

- AI agents require complete development environments with proper isolation, not just codebase access
- Parallel agent execution shifts developers from coders to conductors orchestrating multiple specialized agents
- IDE requirements evolve toward orchestration, review, and architecture rather than direct text editing
- Code review becomes the new SDLC bottleneck as agents generate code faster than humans can validate

**Link:** [Turning Agent Autonomy into Productivity with Chris Weichel](https://softwareengineeringdaily.com/2025/10/23/turning-agent-autonomy-into-productivity-with-chris-weichel/)

---

## A Developer's Guide to Background Agents

**TLDR:** Ona's whitepaper on parallel, async, and background agents, explaining how they shift engineers from coders to conductors by handling long-running tasks autonomously in isolated environments.

**Summary:**

This guide from Ona focuses on a specific operational pattern for AI agents: background and parallel execution. The fundamental insight is that not all coding tasks require human attention or synchronous execution. Many workflows—dependency updates, security patch applications, test suite runs, large refactors—can happen autonomously in the background while developers focus on higher-value work.

The "conductor" metaphor is apt. Rather than writing every line of code, developers define desired outcomes and constraints, then dispatch agents to execute. Multiple agents can work in parallel on different aspects of a system, each operating in its own isolated environment. The developer monitors progress, reviews results, and intervenes only when necessary.

This pattern addresses a critical limitation of current AI coding tools: most operate synchronously, requiring the developer to wait while the agent completes tasks. For long-running operations like comprehensive test generation or cross-repository refactors, this creates workflow bottlenecks. Background agents eliminate this constraint by operating asynchronously, reporting back when complete or encountering blockers.

The architecture enabling this pattern matters. Each background agent needs its own complete development environment with proper isolation, security boundaries, and access to necessary tools and credentials. Environments must be ephemeral—created for specific tasks and destroyed upon completion—to minimize attack surface. Orchestration systems must handle work tree management, merge conflict resolution, and result aggregation across multiple parallel agents.

For architects and teams, background agents represent a workflow evolution. Teams can maintain velocity on primary development tasks while background agents handle technical debt, security updates, documentation generation, and standardization efforts. This multiplies effective team capacity without adding headcount.

The guide emphasizes that background agents work best for well-defined, verifiable tasks: security patches with test suites, style guide enforcement with linters, documentation updates with validation checks. They're less suitable for ambiguous requirements or tasks requiring significant design decisions. Knowing when to use background agents versus interactive development is a skill teams will need to develop.

**Key takeaways:**

- Background agents handle long-running tasks asynchronously, freeing developers for higher-value work
- Parallel execution multiplies effective capacity: multiple agents work simultaneously on different system aspects
- Each agent requires isolated environment with complete dev tools, proper security boundaries, and ephemeral lifecycle
- Best for well-defined, verifiable tasks like security patches, standardization, and technical debt, not ambiguous requirements

**Link:** [A developers guide to background agents](https://ona.com/whitepapers/developers-guide-background-agents)

---

## Ona Changelog: Enterprise Features and Platform Evolution

**TLDR:** Comprehensive changelog showing Ona's rapid evolution: Claude Sonnet 4.5 support, slash commands for team standards, mobile development, AGENTS.md support, Dev Container sandboxing, and multi-region availability including AWS Mumbai and Google Cloud.

**Summary:**

Ona's changelog reveals the velocity of enterprise AI development platform evolution. Between June and November 2025, the platform shipped major features addressing developer experience, security, compliance, and global deployment—a cadence indicating serious product-market fit and engineering execution.

Claude Sonnet 4.5 integration (September 2025) brought enhanced reasoning and code generation to all tiers. Importantly, Enterprise customers can configure their own LLM providers on runners, choosing Sonnet 4.5 through Anthropic, AWS Bedrock, or Google Vertex AI. This "bring your own model" approach lets enterprises leverage existing AI relationships and run inference within their VPCs.

Slash commands (September 2025) encode team expertise into reusable commands across the organization. Teams can create `/review-like-sarah` to capture senior reviewer approaches, `/pr` to enforce consistent PR formats, or `/fix-ci-build` to automate common debugging workflows. Each command runs in fully-configured Ona environments with dependencies, authentication, and secrets configured. This isn't just convenience—it's institutional knowledge capture and enforcement.

Mobile and iPad support (September 2025) enables development from any device without tunnels or complex setups. Ideas can become reality during commutes or off-hours. Paired with ephemeral, cloud-based environments, this transforms when and where development happens.

AGENTS.md support (September 2025) adopts the emerging open standard used by thousands of projects and supported by OpenAI and Google. This provides consistent project conventions across all AI coding tools. Teams using AGENTS.md with other tools experience seamless migration to Ona.

Dev Container sandboxing (September 2025) delivers true environment isolation. Unlike AI tools running on shared infrastructure or developer machines, Ona provides OS-level isolation per agent. Each runs in its own Dev Container, preventing cross-contamination and secret leakage. Environments are ephemeral—created for each task and destroyed on completion—ensuring no persistent attack surface.

Geographic expansion includes AWS Mumbai (October 2025) for South Asia data residency and Google Cloud availability (October 2025) for GCP-committed enterprises. This multi-cloud strategy with VPC deployment addresses global compliance requirements.

For architects and teams, the changelog demonstrates Ona's enterprise-readiness. Features address real operational needs: LLM provider flexibility, institutional knowledge capture, mobile workflows, industry standards, security isolation, and global deployment. The platform isn't just enabling AI coding—it's building enterprise-grade infrastructure for AI-native development at scale.

**Key takeaways:**

- Claude Sonnet 4.5 support with bring-your-own-model flexibility (Anthropic, Bedrock, Vertex AI)
- Slash commands encode team expertise into reusable, organization-wide standards and automations
- Mobile/iPad development enables work from any device without local setup or tunnels
- Dev Container sandboxing provides OS-level isolation per agent with ephemeral, task-scoped lifecycles
- Multi-region expansion: AWS Mumbai for South Asia, Google Cloud for GCP customers

**Link:** [Changelog - Ona Documentation](https://ona.com/docs/changelog)

---

## Getting Started with Ona: Architecture and Modes

**TLDR:** Ona's getting started guide outlines the platform architecture: Ona Environments (secure, ephemeral dev spaces), Ona Agents (autonomous engineering agents), and Ona Guardrails (security/compliance controls), supporting both Craft Mode (direct IDE coding) and Autonomous Mode (delegated agent work).

**Summary:**

Ona's getting started documentation provides a clear mental model for the platform's architecture. The three-pillar approach—Environments, Agents, Guardrails—addresses the complete stack required for enterprise AI-native development.

Ona Environments are the foundation: secure, ephemeral, pre-configured development spaces. "Secure" means OS-level isolation with no cross-contamination. "Ephemeral" means created for specific tasks and destroyed afterward, eliminating persistent attack surfaces. "Pre-configured" means all tools, dependencies, and secrets are automatically provisioned according to Dev Container specifications. This ensures consistency—every developer and agent gets identical, compliant environments.

Ona Agents are professional software engineering agents executing tasks in parallel or autonomously with full environment context. These aren't simple code completion tools; they're autonomous workers handling complete features, migrations, testing, and documentation. They execute in the same secure environments as human developers, with access to compilers, test frameworks, and dependency management. This enables validation—agents don't just write code, they verify it works.

Ona Guardrails provide security, compliance, and governance for scaled deployment. This includes SSO/OIDC integration, audit logs for all agent actions, command deny lists preventing dangerous operations, and policy enforcement ensuring compliance. For regulated industries, these controls are non-negotiable for production deployment.

The platform supports two development modes. Craft Mode lets developers code directly in IDEs (VS Code, JetBrains, Cursor, Windsurf) while Ona provisions standardized environments. Autonomous Mode delegates long-running work—migrations, refactors, comprehensive testing—to agents running in isolated environments. Developers define desired outcomes, agents execute, and developers review results.

Setup involves choosing deployment location (Ona Cloud or customer AWS/GCP account), configuring Dev Containers and automations, optionally bringing your own AI provider (Enterprise only—Anthropic, Vertex, Bedrock, Portkey), enabling agents with AGENTS.md conventions and slash commands, and implementing guardrails with policies and audit logs.

For architects and teams, Ona represents a complete platform play rather than a point solution. It's infrastructure for AI-native development addressing environment management, agent orchestration, and enterprise governance in an integrated system. Teams can start with Craft Mode for standardized environments and progressively adopt Autonomous Mode as they develop agent workflow expertise.

**Key takeaways:**

- Three-pillar architecture: Environments (secure, ephemeral, pre-configured), Agents (autonomous with full context), Guardrails (security/compliance)
- Two development modes: Craft (direct IDE coding with standardized environments) and Autonomous (delegated agent work)
- Flexible deployment: Ona Cloud or customer VPC (AWS, GCP) with bring-your-own-model AI inference
- Comprehensive IDE support: VS Code (browser and desktop), JetBrains, Cursor, Claude Code, Windsurf

**Link:** [Getting started - Ona Documentation](https://ona.com/docs/ona/getting-started)

---

**Disclaimer:** This summary was generated from newsletter content featuring articles about Ona (formerly Gitpod) and enterprise AI coding practices. The analysis represents editorial interpretation of the source material and should not be considered investment or technical implementation advice.