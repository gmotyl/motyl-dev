---
title: "Messaging Architecture in Emmett: Consumers, Projectors, Reactors and the Art of Message Processing"
excerpt: "Oskar Dudycz explains the architectural decisions behind Emmett's messaging system, separating consumers from processors and introducing specialized archetypes for different processing needs."
publishedAt: "2025-12-01"
slug: "emmett-messaging-consumers-projectors-reactors-architecture"
hashtags: "#architecture-weekly #event-sourcing #messaging #architecture #typescript #nodejs #cqrs #generated #en"
---

## Consumers, Projectors, Reactors and All That Messaging Jazz in Emmett

**TLDR:** Oskar Dudycz shares the architectural decisions behind Emmett's message processing system, explaining why separating consumers (message delivery) from processors (message handling) follows Unix philosophy and enables independent scaling, testing, and evolution of each component.

**Summary:**

This is a masterclass in messaging system design from someone who has clearly thought deeply about the problem space. Oskar's key insight is deceptively simple: the source of messages and what you do with them are orthogonal concerns that shouldn't be coupled together.

When building an event store, the write side gets most of the attention - commands, deciders, optimistic concurrency. You can build a working event store in 25 minutes (Oskar has done it on stage). The challenge lies in the processing side, where Event Sourcing becomes Event-Driven Messaging. How do you reliably build read models? How do you trigger side effects without losing messages? How do you scale processing independently?

The solution Emmett adopts is to separate **Consumers** from **Processors**. Consumers are deliberately "dumb" - they connect to a message source (PostgreSQL event store, EventStoreDB, Kafka), poll or subscribe for messages, and forward them to all registered processors. That's it. No business logic, no complex state management. When message delivery breaks, you know exactly where to look.

Processors are where the interesting work happens. They handle processing logic, checkpointing (tracking which messages have been processed), error handling, idempotency, and backpressure. But Oskar takes this further by recognizing that different processing needs require different approaches. He introduces **archetypes**: Projectors (for building read models), Reactors (for triggering side effects), and Workflows (for coordinating multi-step processes).

Each archetype has specific implementations for different storage targets - PostgreSQL, MongoDB, EventStoreDB - because getting proper guarantees involves deep knowledge of each system's quirks. PostgreSQL sequence issues can impact messaging guarantees in ways test environments might not catch until production.

For architects and teams, this design offers several practical benefits. First, processors own their checkpoints independently, meaning each can move at different speeds and failures are isolated. When a consumer starts, it asks all processors for their last processed position and starts from the earliest one. Second, you can test processors in isolation with fake event streams. Third, you can redistribute load by deploying slow processors to separate consumers without code changes.

The article also discusses resilience patterns. When a processor fails, only that processor stops - the consumer keeps pushing to others. Failure behavior is configurable: ACK (success), Skip (move to dead letter queue), or Stop (halt processing). The "Skip" option is particularly important for poison messages that would otherwise block all processing.

Backpressure strategies present classic tradeoffs: ignore it (simple but risky), stop on any slowdown (safe but slowest processor determines throughput), force synchronized pace (predictable but bottlenecked), or adaptive approaches with bounded buffers. Different systems need different strategies - real-time dashboards might drop messages rather than lag, while financial transactions need consistency over throughput.

**Key takeaways:**

- Message source and message processing are orthogonal concerns that should be separated into Consumers and Processors
- Consumers should be deliberately simple "routers" with no business logic - this makes debugging straightforward
- Processors own their checkpoints independently, enabling isolated failures and easy replay/rebuild
- Different processing needs (projections, reactions, workflows) deserve specialized archetypes with storage-specific implementations
- Backpressure strategy should be configurable per consumer based on use case requirements
- You can scale horizontally by running consumers as separate services and grouping processors by processing pace

**Tradeoffs:**

- Processor-owned checkpoints enable independent progress but may cause redundant message delivery when processors are at different positions
- Separating consumers and processors adds architectural complexity but provides flexibility and testability
- Storage-specific processor implementations avoid lowest-common-denominator but require more code to support each target

**Link:** [Consumers, projectors, reactors and all that messaging jazz in Emmett](https://www.architecture-weekly.com/p/consumers-projectors-reactors-and)

---

*The content above is an AI-generated summary based on newsletter sources. While I strive for accuracy, I recommend following the original links for complete context and nuance.*
