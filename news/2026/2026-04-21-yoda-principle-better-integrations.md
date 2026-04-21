---
title: "The Yoda Principle: Name Your Integration Commands Like You Mean Them"
excerpt: "Naming integration commands with Verify/Check/Validate prefixes pushes you into query thinking and exposes your system to race conditions and hidden complexity."
publishedAt: "2026-04-21"
slug: "yoda-principle-better-integrations"
hashtags: "#substack #architecture #ddd #integration #distributed-systems #generated #en"
source_pattern: "Substac"
---

## The Yoda Principle: Name Your Integration Commands Like You Mean Them

**TLDR:** When you name integration commands with prefixes like Verify, Check, or Validate, you are writing queries dressed up as commands, and that mental model leaks into your design. The Yoda Principle says: do or do not, there is no try. Name commands by what you actually intend to happen, not by what you hope to confirm first.

**Summary:**

Oskar Dudycz opens with a Star Wars quote and manages to make it stick. The idea is simple on the surface but cuts deep once you sit with it. In an e-commerce order fulfilment scenario, the instinct is to name a command something like `VerifyProductExists` before proceeding with a reservation. That sounds reasonable. You want to know if you can proceed. But the moment you frame your integration that way, you have already made a mistake, and it is a conceptual one before it becomes a technical one.

The problem is not just naming. It is what the name implies about your system's responsibility and contract. A command named `VerifyProductExists` is really a query. It returns data about a state that is only accurate at the instant you asked. On a normal Tuesday that might be fine. On Black Friday, when two hundred orders are checking the same SKU simultaneously, you have a race condition sitting right there in your method name. The check says "yes" and by the time you act on it, the answer is already "no."

The fix is to rename `VerifyProductExists` to `ReserveProducts` or `LockProducts`, because that is what you actually want. You do not want to know whether something exists in the abstract. You want to claim it, hold it, and ship it. The handling module now owns the responsibility to check internally whether the product is available, and it signals back whether the reservation succeeded, failed, or timed out. That is a real business action with a real outcome, and it forces you to think about the async nature of the process, including the timeout case you absolutely need to handle if you do not want products locked forever.

Oskar points out something I find genuinely useful here: if you always require a `VerifyProductExists` call before `LockProducts`, you have introduced chatty communication and a mental burden on every caller to remember the correct sequence. Locking should already do the verification internally. Why are you asking callers to know that? The same pattern shows up in checking whether payment was made, whether an order was already fulfilled, or whether a shipment was completed. In each case, those checks either mask a missing domain concept or belong inside the relevant action as a business rule.

I have seen this exact pattern in codebases across different companies and it always causes the same downstream pain. The names signal a passive, observational stance toward the system rather than an intentional one. When you train yourself and your team to think in terms of intentions and outcomes, `ReserveProducts` versus `VerifyProductExists`, the design starts to tighten naturally. Boundaries clarify. Race conditions shrink. The code starts to say what the business actually does.

**Key takeaways:**

- Commands should express intention and trigger business logic, not ask questions about current state
- Verify/Check/Validate prefixes are query thinking disguised as command naming
- Stale-read race conditions are a direct consequence of ask-then-act patterns
- The handling module should encapsulate its own precondition checks internally
- Async responses (success, failure, timeout) are the natural contract for real business commands
- Chatty pre-flight checks are a design smell that forces callers to memorize sequences

**Why do I care:**

As someone who has spent time building and reviewing distributed frontend architectures that talk to microservices, this resonates hard. The frontend and BFF layer are often the first place where these poorly-named commands surface as confusing API contracts. When a backend integration is named `CheckOrderStatus` instead of `ConfirmOrderFulfilled`, the frontend ends up writing polling loops and conditional chains that should not exist. The name telegraphs uncertainty and the client code absorbs that uncertainty as complexity. Getting the command naming right upstream means the contracts I consume downstream are cleaner, the state machines I build are simpler, and the edge cases I have to handle are ones the domain actually has, not ones introduced by vague naming.

**Link:** [Yoda Principle for better integrations](https://www.architecture-weekly.com/p/yoda-principle-for-better-integrations?publication_id=579466&post_id=194795296&isFreemail=true&triedRedirect=true)
