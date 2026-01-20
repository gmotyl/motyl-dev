---
title: "Rebuilding Read Models: Dead-Letter Queues and Accepting Distributed System Realities"
excerpt: "A deep dive into an edge case in event-driven read model rebuilding reveals fundamental truths about distributed systems—sometimes accepting failure and making it recoverable is better than preventing it."
publishedAt: "2026-01-20"
slug: "rebuilding-read-models-dead-letter-queues-distributed-systems"
hashtags: "#substack #architecture #event-sourcing #postgresql #distributed-systems #cqrs #database #backend #generated #en"
---

## On Rebuilding Read Models, Dead-Letter Queues and Why Letting Go is Sometimes the Answer

**TLDR:** When rebuilding event-driven read models, a race condition exists where events can be skipped during the transition from "rebuilding" to "active" status. After exploring multiple failed solutions, the author concludes that recording skips as system messages (a Dead Letter Queue pattern) and processing them later is more reliable than trying to prevent the failure entirely.

**Summary:**

This is one of those articles that starts with a specific technical problem and evolves into something more profound about how we think about distributed systems. The author identified a blind spot in their previous design for rebuilding event-driven read models in PostgreSQL.

The scenario involves hybrid projections—read models updated both inline (in the same transaction as event appends) and asynchronously (during rebuilds). During a rebuild, inline projections skip processing because the rebuild will catch up. The race condition emerges in the transition: what happens when an append transaction has already decided to skip the inline projection, but the rebuild processor declares victory and marks the projection as active before that transaction commits?

The first attempt involved waiting for running transactions to complete using PostgreSQL's snapshot functions. This fails because new transactions start while waiting—the target keeps moving. The second attempt used transaction IDs as a coordination boundary, but transaction ID order doesn't equal commit order. A transaction that started earlier might commit later, creating the same invisible window. The third attempt used advisory locks to block appends entirely during the status flip, but the skip decision happens inside the transaction before the lock point.

Here's the uncomfortable realization: every "fix" follows the same pattern—identify a coordination point, discover a window before that point you cannot see, try to close that window, create a new window somewhere else. The problem isn't being solved; it's being relocated.

The breakthrough came from changing the question. Instead of asking "how do I prevent events from being skipped?" the author asked "how do I know when an event was skipped, and how do I ensure it gets processed eventually?" The first question has no good answer without blocking appends. The second is straightforward.

The solution: when an inline projection skips, record that skip as a system message in the same transaction as the event append. If the transaction rolls back, the skip record rolls back too. If it commits, you have a durable record of what was skipped. After the rebuild completes, drain these skip records by processing the referenced events and archiving the records.

This is essentially a Dead Letter Queue—a pattern that exists in Kafka, RabbitMQ, SQS, and every serious messaging system for the same reason: sometimes messages cannot be processed immediately, and you need a place to store them without blocking everything else.

For architects, the deeper lesson resonates: a system isn't trustworthy because it never fails. That's impossible for anything sufficiently complex. A system is trustworthy because you know when it can fail, how it will fail, and how to recover. The skip tracking approach doesn't prevent failures during the transition period. It makes them visible and recoverable. That's a stronger guarantee than complex coordination machinery with hidden edge cases.

**Key takeaways:**
- Race conditions in distributed systems often can't be "fixed"—they can only be relocated
- PostgreSQL's transaction isolation means uncommitted transactions are invisible, creating unavoidable coordination windows
- Recording failures (skip events) in the same transaction as the operation provides atomic visibility guarantees
- Dead Letter Queues are valuable only when actively monitored and processed—otherwise they become data loss with extra steps
- Accepting what you can't control and focusing on recoverability often produces more reliable systems than preventing all failures

**Tradeoffs:**
- Gain explicit failure tracking and recovery but accept brief inconsistency during transitions
- Skip-tracking adds storage overhead but provides audit trail and debugging capability
- DLQ patterns enable non-blocking operations but require operational discipline to process accumulated items
- Simpler coordination logic reduces hidden edge cases but requires accepting visible, recoverable failures

**Link:** [On rebuilding read models, Dead-Letter Queues and Why Letting Go is Sometimes the Answer](https://www.architecture-weekly.com/p/on-rebuilding-read-models-dead-letter)

---

*This article was automatically generated from the Architecture Weekly newsletter. The summaries reflect the key insights from each featured article while providing additional context for practical application.*