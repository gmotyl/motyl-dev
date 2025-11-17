---
title: "Requeuing Roulette: The Hidden Dangers of Message Ordering in Event-Driven Systems"
excerpt: "An exploration of the 'Requeuing Roulette' anti-pattern in messaging systems and why trying to maintain strict ordering in distributed systems often backfires."
publishedAt: "2025-11-17"
slug: "requeuing-roulette-event-driven-messaging"
hashtags: "#generated #en #architecture #messaging #event-driven #distributed-systems #rabbitmq #kafka #aws #sqs #microservices #concurrency #performance"
---

## Requeuing Roulette in Event-Driven Architecture and Messaging

**TLDR:** The "Requeuing Roulette" pattern involves putting messages back into a queue when they arrive out of order, hoping they'll be redelivered in the correct sequence. While tempting as a solution to ordering problems in distributed systems, this approach often creates more problems than it solves, leading to cascading failures and performance degradation under load.

**Summary:**

Oskar Dudycz introduces us to what he calls "Requeuing Roulette," a pattern that sits on the knife's edge between clever solution and architectural disaster. The fundamental tension here is one we've seen repeatedly in distributed systems: the desire for both parallelism and ordering guarantees. These goals are fundamentally at odds with each other, yet developers keep reaching for technical solutions that promise to deliver both.

The core issue emerges when you have multiple consumers processing messages from the same queue. While a single consumer can maintain ordering trivially, adding more consumers for throughput destroys ordering guarantees. The article introduces the concept of "causal correlation" to describe which messages must be processed in sequence. Bank account operations provide an elegant example: deposits to different accounts can happen in any order, but operations on the same account must maintain their sequence. When messages arrive out of order, the temptation is to simply requeue them and hope they land in the right position next time. This is where the roulette wheel starts spinning.

What makes this pattern particularly insidious is that it appears to work under normal conditions. RabbitMQ documentation even suggests messages will be requeued "to their original position" in the queue, which sounds promising. But the documentation continues with a crucial caveat: if that's not possible due to concurrent operations, messages will be placed "closer to queue head." That innocent phrase masks a world of potential chaos. Under high load, a single out-of-order message can create a cascade: it gets requeued, arrives out of order again, gets requeued again, and suddenly your consumer is spending all its cycles processing and rejecting the same handful of messages while thousands of valid messages pile up behind them. The CPU burn becomes particularly acute when a downstream service failure causes repeated immediate redelivery and rejection.

The comparison with Kafka reveals the fundamental trade-off more clearly. Kafka "solves" this problem by eliminating the possibility of requeuing within a partition—only one consumer from a consumer group handles each partition, removing parallelism within that ordering boundary. Messages remain in the log, and you manage ordering by controlling offset positions rather than physical message movement. This isn't magic; it's a deliberate architectural choice that accepts constraints on parallelism in exchange for ordering guarantees. The article's conclusion is sobering: requeuing roulette is seductive because it promises something impossible—strict ordering in a distributed, concurrent system without sacrificing throughput. It's attempting to cheat the fundamental trade-offs of distributed systems.

For architects and teams, the lesson here is about honest trade-off analysis. Rather than reaching for clever technical workarounds that appear to eliminate architectural constraints, accept that distributed systems force choices between consistency, availability, and partition tolerance (and by extension, ordering versus parallelism). Design your system's boundaries so that causally related operations naturally flow through the same processing path, whether that's a RabbitMQ routing key, an SQS message group ID, or a Kafka partition. More importantly, question whether you actually need strict ordering at all. Many systems adopt ordering requirements by default when eventual consistency with idempotency would serve just as well. The real skill lies not in making requeuing work through increasingly complex retry logic, but in understanding your actual ordering requirements and choosing the simplest solution that meets them. Often that means accepting that perfect ordering is neither necessary nor worth its cost, especially when the alternative is a system that works smoothly under normal load but collapses spectacularly under stress.

**Key takeaways:**

- Requeuing messages to achieve ordering creates a fragile system that appears to work under normal conditions but fails catastrophically under load
- The desire for both parallelism and strict ordering in distributed systems represents a fundamental trade-off that cannot be eliminated through clever technical solutions
- Different messaging systems (RabbitMQ vs. Kafka) handle this trade-off explicitly: RabbitMQ allows requeuing but provides only best-effort ordering, while Kafka removes requeuing and constrains parallelism within partitions
- Most systems don't actually need strict ordering; careful analysis often reveals that idempotency with eventual consistency is sufficient and far more robust

**Tradeoffs:**

- Gain parallelism and throughput with multiple consumers but sacrifice ordering guarantees across those consumers
- Use requeuing to handle out-of-order messages but risk cascading failures and CPU burn when messages repeatedly fail and are immediately redelivered
- Kafka's partition-based approach maintains strict ordering within partitions but sacrifices parallelism within those ordering boundaries
- Accept eventual consistency with idempotency and gain system robustness but sacrifice real-time ordering guarantees

**Link:** [Requeuing Roulette in Event-Driven Architecture and Messaging](https://www.architecture-weekly.com/p/requeuing-roulette-in-event-driven)
