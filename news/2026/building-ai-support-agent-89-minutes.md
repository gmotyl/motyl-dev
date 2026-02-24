---
title: "Building Your Own AI Support Agent in 89 Minutes"
excerpt: "Why vendor AI add-ons are overpriced black boxes, and how you can build a better solution using Val Town and the Kilo Gateway."
publishedAt: "2026-02-24"
slug: "building-ai-support-agent-89-minutes"
hashtags: "#substac #ai #agents #typescript #infrastructure #devops #architecture #cost-optimization #generated #en"
---

## We Wasted 4 Weeks on a $1,000/Month AI Agent

**TLDR:** A SaaS platform's $1,000/month AI agent add-on frustrated a small team for weeks because it was a complete black box with no control over models, prompts, or behavior. They built their own from scratch in 89 minutes using Val Town and the Kilo Gateway, achieving the same functionality for $40–80/month.

**Summary:**

The modern SaaS landscape has become a minefield of expensive AI agent add-ons. Every support tool, CRM, and project management platform now ships its own AI agent subscription, typically costing between $500 and $1,000 per month. These add-ons share a fundamental problem: they're black boxes. Vendors have zero incentive to use anything but the cheapest model available since they're capturing a fixed monthly fee while minimizing inference costs. You can't see which model powers the system, you can't control the prompts, you can't adjust when or how the agent responds, and when it inevitably gets something wrong, you have no way to fix it. This creates a particularly insidious type of technical debt—the tool isn't broken enough to reject immediately, but it's consistently frustrating in small ways that accumulate over weeks and months.

This was exactly what happened when Alex Gold's team at Kilo spent four weeks evaluating their support ticketing platform's AI agent add-on. Four weeks of tweaking invisible settings, watching generated responses they couldn't actually tune, relying on a mystery model they couldn't identify or swap. The experience crystallized a key insight: paying for someone else's guesses about what your support team needs isn't a tool—it's a subscription to technical helplessness. What they wanted was model flexibility, prompt control, full visibility into decision-making, and the ability to swap models as better options emerged. None of that existed in the vendor's offering.

So they built their own. What makes this story worth examining isn't just the outcome—though 89 minutes to production is remarkable—but the specific technical choices that made it possible. The combination of Val Town, a platform for instantly deploying TypeScript without infrastructure overhead, and the Kilo Code Gateway, an OpenAI-compatible inference API that routes to 500+ models through a single endpoint, eliminated the traditional barriers that would have forced weeks of backend engineering. For teams wrestling with expensive, inflexible vendor solutions, understanding this architecture reveals something crucial about the cost of technical abstraction: when platforms black-box important decisions, they're not just charging you money—they're preventing you from making better choices about your own systems.

The implementation itself followed a clean, methodical progression: receive webhook events from the ticketing platform, fetch full issue context via API, route that context plus a custom prompt to the inference API, and post the generated response back as an internal note on the original ticket. No backend infrastructure. No DevOps. Just TypeScript, saved directly to a URL, running in production. The total cost structure tells the real story—approximately 10–20 cents per ticket response using Claude Opus 4.5, which scales to $40–80 per month for their actual usage, compared to the $1,000/month they were paying before. Add Val Town's free tier for light usage, and infrastructure costs become genuinely negligible.

For architecture teams evaluating build-versus-buy decisions, this experience offers a clear lesson: when a vendor solution is expensive, opaque, and prevents you from controlling the technical levers that matter to your business, the "buy" option isn't actually cheaper in ways that matter. It's more expensive in flexibility, control, and your team's ability to optimize for your actual needs rather than the vendor's margin requirements.

**Key takeaways:**

- Vendor AI agent add-ons prioritize vendor margin over your control, resulting in expensive black boxes where you cannot adjust models, prompts, or behavior
- Modern infrastructure platforms like Val Town plus inference APIs like Kilo Gateway have made custom solutions faster and cheaper to build than licensing vendor solutions
- The 89-minute build demonstrates that with proper tooling, teams can achieve 10x cost reduction while gaining full control over model selection and prompt engineering

**Tradeoffs:**

- Gain full control over models, prompts, and behavior but sacrifice the support relationship with a vendor platform
- Gain 10x cost savings but accept responsibility for maintaining and improving your own integration
- Gain the ability to swap models instantly but must invest time in understanding API contracts of your dependent systems

**Link:** [We Wasted 4 Weeks on a $1,000/Month AI Agent](https://blog.kilo.ai/p/we-wasted-4-weeks-on-a-1000month)