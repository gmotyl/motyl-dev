---
title: "OpenAuth, Visual Form Builders, and LinkedIn's Service Discovery Revolution"
excerpt: "From self-hosted authentication to drag-and-drop form design and LinkedIn's massive infrastructure overhaul replacing Zookeeper with Kafka and gRPC."
publishedAt: "2026-02-11"
slug: "openauth-form-builders-linkedin-service-discovery"
hashtags: "#dailydev #frontend #webdev #typescript #react #architecture #ai #oauth #infrastructure #microservices #performance #generated #en"
---

## OpenAuth: A Universal, Self-Hosted Authentication Provider

**TLDR:** OpenAuth is a self-hosted, standards-based authentication provider implementing OAuth 2.0. It deploys anywhere -- Node.js, Bun, AWS Lambda, Cloudflare Workers -- and works with any framework through standard OAuth clients.

**Summary:**

Let me talk about something that gets my blood pumping: authentication that you actually own. OpenAuth is a self-hosted, universal auth provider built on OAuth 2.0. And I want you to sit with that word -- *universal* -- because it means you can drop this into a standalone service or bolt it onto whatever you already have running.

Here is what matters. You deploy it on your infrastructure. Node.js, Bun, AWS Lambda, Cloudflare Workers -- pick your runtime, it does not care. Because it implements the actual OAuth 2.0 specification, any OAuth client already knows how to talk to it. No proprietary SDKs, no vendor lock-in gymnastics. It ships with prebuilt, themeable UI that you can customize or throw away entirely.

Now, what the project page does not shout loudly enough is the operational complexity you are taking on. Self-hosting auth is not a weekend project. You need to think about key rotation, session storage durability, rate limiting, and what happens when your Lambda cold-starts during a login surge. The "deploy anywhere" promise is real, but "operate anywhere reliably" is a different conversation. If you are currently paying for Auth0 or Clerk and everything works, you need to honestly weigh the engineering hours of migration against the monthly bill. But if you are building something new and want to avoid the auth vendor treadmill from day one, this is a genuinely compelling option.

What is missing from the conversation? Compliance. If you are in healthcare, finance, or any regulated space, self-hosting auth means you own the audit trail, the penetration testing, and the incident response. The project does not address this, and it should.

**Key takeaways:**
- Self-hosted OAuth 2.0 provider that runs on multiple runtimes including serverless
- Standards-based approach means no vendor lock-in and universal framework compatibility
- Includes customizable prebuilt UI for login flows
- Operational burden of self-hosting auth should not be underestimated
- Best suited for new projects or teams with strong infrastructure discipline

**Link:** [OpenAuth](https://openauth.js.org)

## FormSCN: Visual Form Builder for shadcn/ui

**TLDR:** FormSCN lets you design shadcn/ui forms with drag-and-drop, preview them live, and export production-ready TypeScript with auto-generated Zod validation schemas. Supports both React Hook Form and TanStack Form.

**Summary:**

Alright, form builders. I know, I know -- every few months someone ships a visual form builder and promises it will change your life. But FormSCN is interesting because it targets a very specific ecosystem: shadcn/ui. And if you are already in that world, this one deserves a look.

The pitch is straightforward. You drag and drop components to design your form, you see a live preview, and then you export production-ready TypeScript. It auto-generates Zod schemas for validation, which is genuinely useful because writing Zod schemas by hand for complex forms is tedious work that adds up fast. The dual library support -- React Hook Form and TanStack Form -- is a smart move since the community is split between these two, and forcing a choice would cut the audience in half.

Here is where I push back. "Stop copying form code" is the tagline, and sure, that resonates. But the real question is what happens three months after you export that code. Does it stay maintainable? Can your team modify the generated output without the tool? Because if the generated TypeScript is clean and idiomatic, this is a productivity multiplier. If it is generated spaghetti that only makes sense inside the builder, you have traded one problem for another. The article does not address the quality of the generated code, and that is the most important thing.

Multi-step forms with state management are supported, which is where form builders usually fall apart. That is a promising sign. But I would want to see how it handles conditional logic, dynamic field arrays, and form-level validation that depends on multiple fields before committing to it for anything complex.

**Key takeaways:**
- Visual drag-and-drop form builder specifically targeting shadcn/ui ecosystem
- Exports TypeScript with auto-generated Zod validation schemas
- Supports both React Hook Form and TanStack Form
- Handles multi-step forms with built-in state management
- Quality and maintainability of generated code is the key question to evaluate

**Link:** [FormSCN - shadcn/ui Form Builder](https://app.daily.dev/posts/stop-copying-form-code-design-shadcn-ui-forms-visually-with-drag-and-drop-see-live-preview-and-ex-zlqmbgjdz)

## Driver-Based Architecture in Spatie's Laravel PDF v2

**TLDR:** Spatie's laravel-pdf v2 introduces a driver-based architecture supporting multiple PDF generation backends -- Browsershot, Cloudflare Browser Rendering, DomPdf, and Gotenberg -- plus queued generation with callbacks and metadata support.

**Summary:**

This one is Laravel-specific, but the architectural pattern is universally instructive. Spatie's laravel-pdf package has been the go-to PDF generation tool in the Laravel ecosystem, and v2 introduces a driver-based architecture. Instead of being locked into one PDF engine, you now choose from four backends: Browsershot (Chromium via Puppeteer), Cloudflare Browser Rendering API, DomPdf (pure PHP, no external dependencies), and Gotenberg (Docker-based).

Why does this matter beyond Laravel? Because the driver pattern itself is an architectural lesson worth studying. Each backend has radically different tradeoffs. Browsershot gives you pixel-perfect rendering but requires a headless Chromium process. DomPdf is pure PHP so deployment is trivial, but rendering fidelity is limited. Gotenberg runs in Docker, which is great for isolation but adds container orchestration to your stack. Cloudflare's option is interesting for serverless deployments but ties you to their platform.

The addition of queued PDF generation with callbacks is the real operational win here. PDF generation is inherently slow -- you do not want it blocking a web request. Moving it to a queue with callbacks means your users get a responsive experience and the PDF arrives when it is ready. This is table stakes for production systems, and it is good to see it baked into the library.

What I wish the article explored more is guidance on when to pick which driver. A comparison matrix of rendering quality, memory usage, cold start time, and cost per document would be incredibly valuable. The flexibility of four backends is great, but choice without guidance is just confusion.

**Key takeaways:**
- Driver-based architecture allows swapping PDF backends without code changes
- Four backends available: Browsershot, Cloudflare Browser Rendering, DomPdf, Gotenberg
- Queued PDF generation with callbacks prevents blocking web requests
- Each backend has distinct deployment and rendering tradeoffs
- The driver pattern is a broadly applicable architectural lesson for any extensible system

**Link:** [Driver-Based Architecture in Spatie's Laravel PDF v2](https://app.daily.dev/posts/driver-based-architecture-in-spatie-s-laravel-pdf-v2-vrcqzpunq)

## Claude Code Training Resources

**TLDR:** Claude Code is Anthropic's agentic coding tool that works across terminal, VS Code, JetBrains, desktop, web, and mobile -- reading codebases, editing files, and running commands with deep IDE integration.

**Summary:**

Claude Code has matured into something genuinely interesting. It is an agentic coding tool -- meaning it does not just suggest completions, it reads your entire codebase, edits files, runs commands, and operates across your terminal, VS Code, JetBrains IDEs, a standalone desktop app, and even in the browser at claude.ai/code. The fact that it shares configuration, CLAUDE.md files, and MCP servers across all these surfaces is a design decision that shows they are thinking about real workflows, not just demos.

The installation story is clean. A one-liner curl on macOS and Linux, Homebrew, WinGet, and a PowerShell script for Windows. You cd into your project, run claude, and you are working. The VS Code extension adds inline diffs, at-mentions, plan review, and conversation history directly in the editor. The JetBrains plugin brings interactive diff viewing and selection context sharing. And the web version lets you kick off long-running tasks and check back later, which is a genuinely useful pattern for large refactors or test suite runs.

What I want to challenge here is the "agentic" framing. The tool clearly has real capabilities -- file editing, command execution, multi-surface presence. But the training resources linked in this post are primarily getting-started material. The interesting questions are downstream. How does it handle conflicting instructions in CLAUDE.md files? What happens when it makes a bad edit to a critical file? How do you establish trust boundaries for a tool that can run arbitrary commands? These are the training resources engineers actually need, and they are not prominently featured yet.

The CI/CD integration path through GitHub Actions and GitLab CI/CD for automated PR reviews is where this gets powerful for teams. But again, the governance model -- who reviews the AI reviewer's decisions? -- is the conversation that needs to happen alongside adoption.

**Key takeaways:**
- Agentic coding tool that works across terminal, IDE, desktop, web, and mobile
- Shared configuration via CLAUDE.md and MCP servers across all surfaces
- CI/CD integration enables automated PR reviews and issue triage
- Trust boundaries and governance models need attention before team-wide adoption
- Getting-started resources are solid but advanced operational guidance is still emerging

**Link:** [Claude Code Overview](https://docs.anthropic.com/en/docs/claude-code)

## How LinkedIn Built a Next-Gen Service Discovery for 1000s of Services

**TLDR:** LinkedIn replaced its decade-old Zookeeper-based service discovery with a Kafka-and-gRPC/xDS architecture, achieving 10x better median latency and 6x better P99 latency while supporting hundreds of thousands of service instances.

**Summary:**

This is infrastructure engineering at a scale that most of us will never personally encounter, but the lessons are universal. LinkedIn's service discovery system -- the thing that lets tens of thousands of microservices find each other -- was built on Apache Zookeeper. And it was hitting the wall. Hard.

The core problem was architectural. Zookeeper is a strong consistency system where reads, writes, and session health checks all go through the same request queue. During deployments of large applications, D2 URI ephemeral nodes changed frequently, triggering read storms from all the watching clients. The queue would back up, writes would stall, health checks would time out, sessions would drop, ephemeral nodes would vanish, and suddenly you have capacity loss across the platform. They projected running out of capacity in early 2025 with 50 to 100 percent yearly growth in cluster size.

The replacement architecture is elegantly separated. Kafka handles writes -- application servers register themselves by publishing Service Discovery URI events. A Service Discovery Observer service (written in Go for concurrency) consumes those events and serves them to clients via bidirectional gRPC streams using the xDS protocol. This is a fundamental shift: instead of clients polling Zookeeper, the Observer pushes changes as they happen. One Observer handles 40,000 client streams while processing 10,000 updates per second and consuming 11,000 Kafka events per second. With projections of 3 million instances, they will need roughly 100 Observers.

The most instructive part of this article is the migration strategy. They implemented a dual-mode approach where applications run both old and new systems simultaneously. Dual Read mode has clients read from both systems but keep Zookeeper as the source of truth while validating Next-Gen data in a background thread. Dual Write mode has servers announce to both systems while they monitor URI Similarity Scores to ensure data consistency. They built cron jobs to analyze Zookeeper watchers and identify which reader applications were blocking server migrations, then published weekly reports on top blockers. This is what disciplined infrastructure migration looks like.

The critical design decision was choosing availability over consistency. Service discovery data only needs to eventually converge -- some short-term inconsistency is acceptable, but the data must be highly available. This is a deliberate reversal of Zookeeper's consistency-first model. When Kafka experiences lag or goes down, Observer continues serving cached data. No cascading failures. The results are dramatic: P50 latency dropped from 10 seconds to under 1 second, and P99 from 30 seconds to under 5 seconds.

What the article somewhat glosses over is the operational cost of running this during the transition period. Dual mode means double the infrastructure, double the monitoring, and teams need to understand two systems simultaneously. The migration is not free, and the engineering investment to build all those comparison metrics, cron jobs, and migration readiness dashboards is substantial. This approach only makes sense at LinkedIn's scale where Zookeeper was genuinely approaching failure. For most organizations, Zookeeper or etcd is perfectly adequate.

**Key takeaways:**
- Zookeeper's strong consistency model became a liability at LinkedIn's scale due to read storms and queue contention
- New architecture separates writes (Kafka) from reads (gRPC/xDS via Observer service)
- Single Observer handles 40,000 client streams with 10,000 updates per second
- Choosing availability over consistency was the key architectural decision
- Dual-mode migration with comprehensive metrics prevented site-wide incidents during rollout
- P50 latency improved 10x (10s to under 1s), P99 improved 6x (30s to under 5s)

**Tradeoffs:**
- Strong consistency (Zookeeper) vs eventual consistency (Kafka + Observer) -- acceptable because service discovery data tolerates short-term inconsistency
- Centralized control plane adds a new dependency but enables modern service mesh features
- Dual-mode migration doubles infrastructure cost temporarily but prevents catastrophic failures
- Go-based Observer is horizontally scalable but requires operational investment in a new technology stack

**Link:** [How LinkedIn Built a Next-Gen Service Discovery for 1000s of Services](https://blog.bytebytego.com/p/how-linkedin-built-a-next-gen-service)