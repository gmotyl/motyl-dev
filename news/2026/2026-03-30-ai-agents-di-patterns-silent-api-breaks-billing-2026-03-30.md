---
title: "AI Agents, DI Patterns, and the API That Broke Billing on a Friday Night"
excerpt: "Three production stories from daily.dev: building org-wide AI agents, getting dependency injection right in TypeScript, and surviving silent API schema drift."
publishedAt: "2026-03-30"
slug: "ai-agents-di-patterns-silent-api-breaks-billing-2026-03-30"
hashtags: "#dailydev #ai #agents #typescript #nodejs #architecture #security #generated #en"
source_pattern: "daily.dev"
---

## We built an org-wide AI agent in 4 days. Here's what broke in the weeks after.

**TLDR:** daily.dev shipped a 29,000-line TypeScript Slack AI agent in 4 days — and then spent weeks cleaning up credential leaks, token bleeding, and production incidents that the demo never mentioned.

**Summary:**

There is a particular kind of hubris that lives inside a four-day sprint. You move fast, the demo works, everyone cheers, and for a brief moment it feels like the future arrived early. daily.dev's "Smith" agent is a genuinely compelling story — 29,000 lines of TypeScript, wired into Slack, built with Codex in under a week. That headline is designed to make you feel behind. Don't.

What makes this post worth reading isn't the four-day part. It's everything that came after. The credential leaks in a shared runtime that required an ever-growing command sanitizer — a red flag masquerading as a pragmatic solution. Once your security model becomes "keep adding exceptions to a sanitizer list," you've already lost the architectural argument. The question is how long before you admit it.

The GitHub token bleeding between user sessions is particularly instructive. This is a class of bug that almost never shows up in demos because demos are inherently single-user, single-session affairs. The moment you put an AI agent into a shared runtime with real users doing real things simultaneously, you're in concurrency territory that most AI tooling has not been designed to handle. The Codex abstraction that made shipping fast becomes the thing that made debugging slow.

What the post admirably does is name the gap between demo optimism and production reality without softening it. Most AI agent post-mortems bury the failures in a paragraph of lessons-learned bullet points. This one puts the failures center stage. That's rare, and it's useful. The implicit argument is that four days to ship is not the same as four days to production-ready — a distinction the industry is still learning to make, loudly and expensively.

The uncomfortable question the post doesn't fully engage with is whether a shared runtime was the right architecture at all. The incidents described are not bugs in the implementation — they're consequences of the design. A growing sanitizer is a smell that the threat model was underspecified from day one.

**Key takeaways:**
- Shared runtimes for AI agents introduce concurrency and credential isolation problems that single-user demos never surface
- A growing sanitizer list is an architectural warning sign, not a solution
- Token bleeding between sessions is a class of bug specific to multi-user AI agent deployments
- Demo-to-production is a longer journey than four-day sprints suggest
- Candid post-mortems are more valuable than success stories for the industry's learning curve

**Why do I care:** From an architect's perspective, the scariest part of this story isn't the incidents — it's the timeline. Four days to a 29K-line production agent means there was no time for threat modeling, no time for architecture review, and no time to ask hard questions about runtime isolation. The incidents were not bad luck; they were scheduled. Every senior engineer who has ever inherited a "we built it fast" codebase knows exactly how this goes. The question worth asking before your team's next four-day sprint is: what does week five look like?

**Link:** [We built an org-wide AI agent in 4 days. Here's what broke in the weeks after.](https://app.daily.dev/posts/tdNgi1Q4D)

---

## Dependency Injection in Node.js & TypeScript. The Part Nobody Teaches You

**TLDR:** Most Node.js devs hardwire their dependencies with direct imports, which quietly destroys testability. This post explains the difference between Dependency Injection and Dependency Inversion — and shows how to implement DI manually in TypeScript without reaching for a framework.

**Summary:**

There is a tutorial gap in the Node.js ecosystem and it has existed for years. Beginners are taught to import modules. Intermediates are handed a framework with an IoC container and told to use decorators. Almost nobody stops to explain the conceptual layer in between — what Dependency Injection actually is as a technique, why it matters independent of any particular tool, and how it relates to the Dependency Inversion principle from SOLID. Petar Ivanov's post is a ten-minute attempt to fill that gap.

The distinction between DI and DIP is one that gets collapsed constantly, including by engineers who should know better. DIP is a principle — depend on abstractions, not concretions. DI is one technique for honoring that principle. You can do DIP without DI, and you can do DI without fully honoring DIP. They're related but not the same thing, and conflating them produces confused conversations about whether you "need" a framework to write SOLID code. You don't, and this post makes that case clearly.

The manual TypeScript approach the article demonstrates is the one that tends to get skipped in favor of frameworks like InversifyJS or TSyringe. The argument for going manual first is pedagogical — you understand what the container is doing for you only after you've done it yourself. Hidden magic in an IoC container is fine once you understand what it's hiding. Before that point, it's just another layer of indirection that breaks mysteriously when you misunderstand it.

The practical payoff is testability. When your module's dependencies are injected rather than imported, you can substitute test doubles without module-level mocking gymnastics. Anyone who has spent time fighting Jest's module mocking system — its hoisting behavior, its interaction with ESModules, its tendency to make test files feel like a different language — will immediately recognize the value of simply passing a mock into a constructor instead.

What the post perhaps underplays is that manual DI has a maintenance cost at scale. Wiring up a large application by hand produces a composition root that becomes a liability as the application grows. The framework isn't the enemy — the misunderstanding of why you'd use one is. Getting to frameworks through first principles rather than around them is the move.

**Key takeaways:**
- Dependency Injection (technique) and Dependency Inversion (SOLID principle) are related but distinct concepts
- Direct module imports create hidden, hard-to-test dependencies
- Manual DI in TypeScript uses interfaces to define contracts, injected at construction time
- Frameworks like InversifyJS automate what manual DI does by hand — understanding manual DI first makes frameworks less magical
- Testability is the primary practical payoff: inject mocks instead of fighting module-level mocking

**Why do I care:** This is the content I would have wanted three years into my Node.js career when I was writing "testable" code that was actually just tightly coupled code with a test file attached. The reason this part "nobody teaches" doesn't get taught is that it's awkward to teach — it sits between "here's how to use modules" and "here's your IoC framework" and it requires stopping to think about design before writing code. That's an uncomfortable place for tutorial culture to live. But it's exactly where senior engineers earn their keep: slowing down to ask why before reaching for the tool.

**Link:** [Dependency Injection in Node.js & TypeScript. The Part Nobody Teaches You](https://app.daily.dev/posts/pd57o0cEW)

---

## How a Silent API Update Broke Our Billing (And How to Prevent It)

**TLDR:** A silent Stripe API schema change caused 23 failed orders on a Friday night with no HTTP error. The author responded by building php-sentinel, a passive runtime API contract monitor that learns what APIs actually return and alerts when the shape drifts.

**Summary:**

Friday night is when the universe schedules its worst billing failures. A Stripe API schema change — not a breaking change by Stripe's definition, just a quiet field removal or type shift — propagated silently into production. Twenty-three orders failed. No HTTP error code, no webhook signal, no alarm triggered by anything in the standard observability stack. Just business logic downstream of the API response quietly computing wrong answers on missing data.

This is a category of failure that contract testing is supposed to prevent, and the honest conversation about why it didn't is buried in most incident post-mortems. Contract tests live in your test suite. They run against a mock or a sandbox. They test the shape of responses you've written assertions for — which means they only catch schema changes for fields you thought to test. The field that got removed was presumably not the field anyone thought to write an assertion about. That's how silent breakage works.

The response the author built, php-sentinel, takes a genuinely different approach. Rather than actively asserting a known-good schema in a test suite, it passively observes what production APIs actually return, builds a learned baseline over time, and alerts when the shape drifts from that baseline. This is runtime contract monitoring, not pre-deployment contract testing. Those are different tools for different threat models, and most teams have only one of them.

The appeal of the passive approach is that it catches the unknown unknowns — the fields you didn't think to test because they worked fine for two years until they didn't. The learned baseline doesn't require you to anticipate every possible change; it requires only that you define what "different from before" means, which is a much lower bar. The trade-off is that you're monitoring failures in production rather than preventing them in CI, which means your first alert is a production incident. Whether that's acceptable depends on your risk tolerance and your team's deployment pace.

The deeper architectural implication is about trust in third-party APIs. The industry has collectively decided that external APIs are stable because their vendors use semantic versioning or publish changelogs — and that assumption fails regularly and expensively. Schema drift monitoring is a reasonable defense layer, but the real answer is designing systems that degrade gracefully when upstream API responses don't match expectations, not just systems that alert when they don't.

**Key takeaways:**
- Silent API schema changes (field removal, type changes) cause production failures with no HTTP error signal
- Standard contract testing only catches schema changes for fields you explicitly asserted on
- php-sentinel takes a passive approach: learn the baseline in production, alert on drift
- Runtime contract monitoring catches unknown unknowns; pre-deployment contract testing catches known contracts
- The first alert from passive monitoring is still a production incident — graceful degradation is the complementary defense

**Why do I care:** This one lands differently if you've ever been the engineer who got paged on a Friday night because Stripe changed something and nobody noticed until orders failed. The php-sentinel approach is clever and the passive baseline idea is legitimately underused as a pattern. My reservation is that it's a PHP library solving a problem that exists in every language and every API integration, and the architectural lesson — design for schema drift, not just for happy-path responses — is language-agnostic. I'd love to see this pattern adopted as a first-class concern in API client design rather than a bolt-on monitoring tool. But bolt-on beats nothing, and this is a real solution to a real problem that most teams aren't solving at all.

**Link:** [How a Silent API Update Broke Our Billing (And How to Prevent It)](https://app.daily.dev/posts/FOQRR0WHe)
