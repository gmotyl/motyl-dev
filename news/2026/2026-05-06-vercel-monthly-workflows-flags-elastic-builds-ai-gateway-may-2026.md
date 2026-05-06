---
title: "Vercel Ships Workflows GA, Feature Flags, Elastic Builds, and AI Gateway Privacy Controls"
excerpt: "Vercel's May 2026 update brings general availability for Workflows, Flags, and Elastic Build Machines, plus new privacy and observability features for the AI Gateway."
publishedAt: "2026-05-06"
slug: "vercel-monthly-workflows-flags-elastic-builds-ai-gateway-may-2026"
hashtags: "#VercelMonthly #vercel #nextjs #frontend #architecture #ai #agents #performance #webdev #typescript #generated #en"
source_pattern: "VercelMonthly"
---

## A New Programming Model for Durable Execution: Vercel Workflows Goes GA

**TLDR:** Vercel Workflows is now generally available after processing over 100 million runs in beta. It's a programming model that puts orchestration directly in your application code, eliminating the need for separate queue workers and orchestration services.

**Summary:** The Workflows announcement is the most substantial thing Vercel has shipped this cycle, and it deserves real attention. The core idea is deceptively simple: what if your long-running orchestration logic lived in the same codebase as your application, instead of in a separate service? Instead of managing Kubernetes workers, external queue systems, and status tracking tables alongside your Next.js app, you write your workflow as a regular TypeScript function and let Vercel handle the durable execution infrastructure.

The programming model uses two directives: "use workflow" marks a function as a durable workflow, and "use step" isolates individual units of work with automatic retries, persistence, and observability. This is elegant because it doesn't require you to learn a new orchestration DSL or maintain a separate codebase. The orchestration is in your application code, and a coding agent or developer reading the file can reason about the full system in one place.

The beta numbers are real. Over 100 million runs, 500 million steps, 1,500 customers, 200,000 weekly npm downloads. Mux is using it for video AI pipelines. Durable, a company that builds websites for three million small businesses, replaced their self-hosted infrastructure entirely and rewrote on Workflows with a six-person engineering team. Flora runs 50-plus image models through it with no separate queue system. These aren't toy examples.

What I find genuinely interesting is the encryption story. All step inputs, outputs, and stream chunks are encrypted by default before they leave your deployment, and decryption only happens inside the deployment running the workflow. This is possible because Vercel owns both the orchestration layer and the execution environment. A third-party orchestration service can't offer this without adding significant complexity. For teams building agents that handle sensitive data, this matters.

The durable streams feature is also underrated. An agent can stream output to a client, the client can disconnect and reconnect later, and the stream resumes from where it left off. No Redis, no custom pub/sub, no "we need to store stream state somewhere." That kind of capability usually requires non-trivial infrastructure work, and here it's a single API call.

Workflows 5 is already in beta, promising native concurrency controls, globally deployed infrastructure, and a snapshot-based runtime to reduce replay overhead. The Python SDK is also in beta, which opens this to the broader AI and data science ecosystem that has been largely TypeScript-excluded until now.

**Key takeaways:**
- Vercel Workflows GA brings durable, retryable, observable long-running functions into your application code with no separate orchestration service.
- End-to-end encryption is on by default for all step data, a security advantage over external orchestration systems.
- Durable streams let agents maintain streaming output across client disconnects and reconnections without custom infrastructure.

**Why do I care:** This is a direct answer to a problem I see regularly: teams building AI-powered features get the model working in a weekend demo, and then spend the next two months figuring out how to make it reliable in production. Queues, retries, state management, and observability are all solved problems individually, but integrating them alongside a Next.js app without adding a whole new operational layer is genuinely hard. Workflows makes that tractable. I'd want to stress-test the limits and understand the cost model before going all-in, but the architecture is sound.

**Link:** [A new programming model for durable execution](https://vercel.com/blog/a-new-programming-model-for-durable-execution)

---

## Vercel Flags Is Now Generally Available

**TLDR:** Vercel Flags is a feature flag system built directly into the Vercel platform, now generally available with Next.js and SvelteKit framework integrations and OpenFeature standard support.

**Summary:** Feature flags have a long and slightly embarrassing history in the web development world. The concept is simple. Wrap new behavior in a conditional, control the conditional from outside your code, gradually roll out to users. But implementing a robust flag system with targeting rules, environment controls, and user segments is surprisingly involved, and most teams either over-engineer it or use a third-party service that adds another dependency and another billing relationship.

Vercel Flags tries to solve this by putting the flag infrastructure directly in the platform. Define a flag in a few lines using the Flags SDK, use the Vercel adapter, and you're connected to targeting rules and environment controls in the Vercel Dashboard without wiring up a separate service. The framework-native integration with Next.js means you can use flags in server components, edge middleware, and client code with consistent ergonomics.

The OpenFeature support is the detail I'd highlight for teams evaluating this. OpenFeature is a vendor-neutral standard for feature flag providers, which means Vercel Flags can plug into existing tooling that already uses the OpenFeature SDK. That's a meaningful commitment to interoperability rather than lock-in.

What the changelog doesn't discuss is the pricing model for flags at scale, the limits on targeting rule complexity, or the rollout strategies available. Those details determine whether this replaces LaunchDarkly or Statsig for production use cases, or whether it's a simpler tool for simpler scenarios. My guess is the latter, at least initially.

**Key takeaways:**
- Vercel Flags is now GA with native Next.js and SvelteKit integrations and a clean SDK for defining and consuming flags.
- OpenFeature standard support means Vercel Flags works with existing provider-agnostic tooling.
- Feature flag management lives in the Vercel Dashboard alongside deployments and environment variables, reducing the number of services in your stack.

**Why do I care:** Feature flags are table stakes for any team doing continuous deployment responsibly. If you're already on Vercel, having this built into the platform is genuinely convenient. I'd still want to understand the targeting capabilities before moving a complex rollout strategy off a dedicated flag service, but for new projects this removes a real setup burden.

**Link:** [Vercel Flags is now generally available](https://vercel.com/changelog/vercel-flags-ga)

---

## Elastic Build Machines Is Now GA

**TLDR:** Vercel's Elastic Build Machines assign the right compute size to each project individually rather than using a one-size-fits-all build configuration. 80% of projects see cost reductions, 20% get auto-upgraded for faster builds.

**Summary:** Build machines are one of those things that almost nobody thinks about until they get a bill that's too high or a build that takes too long. Vercel's approach with Elastic Build Machines is to make the compute allocation automatic: the platform evaluates each project's actual build requirements and assigns appropriately sized infrastructure rather than giving everyone the same machine.

The beta results are specific and interesting. Over 400 teams and 6,000 projects opted in. About 80% of projects were assigned smaller machines that cost less with no speed regression. The other 20% were auto-upgraded to machines with more CPUs and memory and actually built faster. That distribution makes intuitive sense: most projects are over-provisioned for their actual build complexity, and a few compute-intensive projects are under-provisioned.

This is now the default for all new Pro teams, which means the decision is opt-out rather than opt-in. The question I'd want answered is how often the automatic sizing gets it wrong and what the recourse is when it does. An 80% cost reduction for most projects is compelling, but the 20% of projects that needed to be upgraded suggests the system isn't perfect, and a team that gets auto-assigned a smaller machine and then sees build times spike has a debugging problem.

**Key takeaways:**
- Elastic Build Machines automatically right-size compute for each project, now GA for all Pro and Enterprise customers.
- Approximately 80% of projects see cost reductions on smaller machines, 20% get auto-upgraded for better performance.
- This is now the default for new Pro teams, making over-provisioning a thing you have to actively choose rather than the default state.

**Why do I care:** Build times and build costs are directly operational concerns. If this works as advertised, it's a straightforward win. The automatic right-sizing removes a configuration burden from teams who don't want to think about it and typically shouldn't have to.

**Link:** [Elastic Build Machines is now GA](https://vercel.com/changelog/elastic-build-machines-is-now-ga)

---

## Team-Wide Zero Data Retention and Prompt Training Controls on AI Gateway

**TLDR:** Vercel's AI Gateway now supports Zero Data Retention at the team level, enforcing that no request data is stored by any AI provider across your entire team's traffic without requiring per-request configuration.

**Summary:** Data retention and model training opt-outs have been a fragmented mess for teams using multiple AI providers. If you use OpenAI for some things, Anthropic for others, and Google for others, you've historically needed separate agreements and separate configuration with each provider to ensure your data isn't being retained or used for training. Vercel's AI Gateway addresses this by centralizing the policy: enable team-wide Zero Data Retention once in the dashboard, and every request your team makes routes only to providers where ZDR agreements are already in place.

The coverage is solid: Anthropic, OpenAI, Google, and more. The enforcement mechanism is automatic routing, not just a flag you set and hope providers honor. Requests that would go to a provider without a ZDR agreement are filtered out, and the response metadata tells you which providers were considered and which were excluded. That's a genuine audit trail.

The pricing structure is worth noting. Team-wide ZDR costs ten cents per thousand requests for Pro and Enterprise customers. Per-request ZDR is free, as is per-request prompt training opt-out. The team-wide option is a convenience and centralization feature, not a raw capability gate. If your team is making significant AI Gateway traffic and has compliance requirements, ten cents per thousand requests is extremely cheap. If you're just exploring, the per-request option covers you for free.

**Key takeaways:**
- Team-wide ZDR enforces Zero Data Retention across all providers for all team traffic from a single dashboard setting.
- Automatic routing ensures requests only reach providers where ZDR agreements are active, with metadata showing which providers were filtered.
- Per-request ZDR and prompt training opt-out remain free; the team-wide tier is a paid convenience feature at ten cents per thousand requests.

**Why do I care:** Compliance requirements around AI data retention are becoming standard in enterprise contracts. Having this enforced at the gateway level rather than requiring every developer to remember to set the right options on every request is exactly the right abstraction. This is the kind of feature that makes Vercel AI Gateway a serious option for organizations with legal or regulatory constraints.

**Link:** [Team-wide Zero Data Retention and prompt training controls now on AI Gateway](https://vercel.com/changelog/zero-data-retention-no-prompt-training-on-ai-gateway)

---

## Base Fee for Observability Plus Removed

**TLDR:** Vercel has dropped the $10 base fee for Observability Plus. You now pay only for the observability events you actually collect, with no floor charge.

**Summary:** This is a simple pricing change, but a meaningful one. Observability Plus gives you enhanced logs, extended metrics, anomaly alerts, 30-day log retention, and the debugging context you need to understand what's actually happening in production. The $10 base fee was a meaningful barrier for smaller teams or projects that wanted the enhanced visibility but couldn't justify a fixed monthly cost on top of their existing Vercel spend.

Removing the base fee and moving to pure consumption pricing means that teams can opt into Observability Plus, use it lightly when they need it, and pay proportionally. That's a sensible model for observability features where usage spikes naturally during incidents and debugging sessions.

The change also removes a mental accounting burden. With a fixed base fee, teams have to decide "is Observability Plus worth $10 per month to us?" That's a judgment call that often leads to not enabling it. With consumption-only pricing, the question becomes "does it cost more than it saves in debugging time?" which almost always resolves to yes.

**Key takeaways:**
- The $10 base fee for Observability Plus is gone. You now pay only for events collected.
- This removes the threshold decision about whether enhanced observability is "worth it" as a fixed cost.
- Observability Plus includes enhanced logs, metrics, anomaly alerts, and 30-day log retention.

**Why do I care:** Observability is one of those things where teams consistently under-invest until they're staring at a production incident at 2 AM with no useful signal. Removing the base fee makes it easier to default to "yes, enable it" rather than debate the value monthly. Good change.

**Link:** [Base fee for Observability Plus removed](https://vercel.com/changelog/no-base-fee-for-observability-plus)

---

## Logs Filtering for Vercel Workflows Now Available

**TLDR:** You can now filter Vercel logs by Workflow Run ID and Workflow Step ID, making it possible to see all logs for a specific workflow run in one view instead of hunting across individual request logs.

**Summary:** This is a small change that will feel enormous the first time you're debugging a multi-step workflow in production. Before this, finding all the logs related to a single workflow run meant piecing together logs across multiple individual function invocations, which is tedious and error-prone. With filtering by Run ID and Step ID, you jump directly from the workflow run detail view into a filtered log view that shows exactly the logs you need.

Workflow runs on Vercel already provided run-level observability: step progression, input/output payloads, and performance metrics. The logs integration closes the last gap, which was bridging between "I can see the workflow failed at step three" and "I can see exactly what was logged during step three." Now those two pieces of information are connected with a single click.

This is the kind of quality-of-life improvement that signals a product maturing. The core functionality of Workflows is the durable execution model. The logs filtering is what makes operating it in production feel like a first-class experience rather than a beta feature.

**Key takeaways:**
- Workflow logs can now be filtered by Run ID and Step ID directly from the run details page.
- This closes the gap between workflow-level observability and application log data.
- The "View Logs" button in the run details page jumps directly into a filtered log view.

**Why do I care:** I've spent enough time debugging distributed systems to know that the quality of your observability tooling directly affects how long incidents last. Anything that reduces the time from "something went wrong" to "I know exactly what went wrong" is worth shipping. This is a real improvement for Workflows operators.

**Link:** [Logs filtering for Vercel Workflows now available](https://vercel.com/changelog/logs-filtering-for-vercel-workflows-now-available)

---

## Vercel Sandbox Now Supports Up to 32 vCPU and 64 GB RAM

**TLDR:** Vercel Sandbox has expanded its resource ceiling to 32 vCPUs and 64 GB RAM for Enterprise customers, enabling resource-intensive workloads that weren't previously possible in sandboxed environments.

**Summary:** Vercel Sandbox is the isolated execution environment for running untrusted or resource-intensive code, the kind of thing you need when you're building an agent that executes user-supplied code or running large computations without wanting them to affect your main application. The previous resource limits were appropriate for lightweight tasks, but they created a ceiling for genuinely demanding workloads: image processing, heavy data transformations, large language model inference, or running real build systems.

The new limits, 32 vCPUs and 64 GB RAM for Enterprise customers, put Sandbox in a different category. You can now run meaningful compute-heavy tasks in a sandboxed environment without immediately hitting resource constraints. The configuration is straightforward: set the vcpus option in the SDK or pass the flag to the CLI.

What remains interesting is the pricing and the specific use cases that prompted this expansion. 32 vCPUs and 64 GB RAM is a lot of compute for a sandbox. My guess is this is being driven by agentic use cases where the agent itself needs to provision and run substantial workloads. A coding agent that compiles a large project or an image generation pipeline that needs GPU-adjacent memory headroom are both plausible drivers.

**Key takeaways:**
- Vercel Sandbox resource limits have expanded to 32 vCPUs and 64 GB RAM for Enterprise customers.
- Configuration is simple via the SDK or CLI with a single parameter.
- This opens Sandbox to CPU-bound and memory-intensive workloads that previously required external compute resources.

**Why do I care:** The ability to run arbitrary, resource-intensive code in a sandboxed environment with simple configuration is directly relevant to anyone building agents or platforms that execute user-submitted workloads. The security and isolation properties of Sandbox make it much more appealing than spinning up raw VMs, and the new resource headroom makes it viable for a broader set of tasks.

**Link:** [Vercel Sandbox now supports up to 32 vCPU + 64 GB RAM configurations](https://vercel.com/changelog/vercel-sandbox-now-supports-up-to-32-vcpu-64-gb-ram-configurations)
