---
title: "Passive-Aggressive Events: When Your Event Should Have Been a Command"
excerpt: "Architecture Weekly's Oskar Dudycz digs into one of the most common event-driven architecture anti-patterns — events that are really just disguised commands. The result is a system that talks past itself, obscures business intent, and fails silently in all the wrong places."
publishedAt: "2026-04-13"
slug: "passive-aggressive-events-command-vs-event-architecture"
hashtags: "#architectureweekly #substack #eventdrivenarchitecture #sofwarearchitecture #generated #en"
source_pattern: "Substac"
---

## Passive-Aggressive Events: When Your Event Should Have Been a Command

**TLDR:** When you publish an event but secretly expect exactly one consumer to react in exactly one way, you haven't designed an event — you've written a passive-aggressive command. This article from Architecture Weekly walks through how that confusion corrodes event-driven systems, why the fix involves embracing commands and even Documents as first-class message types, and how ignoring this leads to blocked flows, hidden coupling, and systems you can't observe or trust.

Oskar Dudycz opens with something everyone recognizes from everyday life: the passive-aggressive announcement. "Heads up: the coffee machine is empty again." That's not information sharing. That's a demand wearing an update's clothes. And as it turns out, we do this constantly in distributed systems too, we call something an event when what we actually mean is "go do this specific thing and tell me when you're done."

The distinction matters a lot more than it sounds. Commands can be rejected. Events can only be ignored. When you publish an `OrderConfirmed` event and silently expect the payment module to charge the card, the shipment module to reserve inventory, and the fraud module to run its checks, you have not loosened coupling — you have just hidden the coupling behind a veneer of async messaging. The coupling is still there. It's just now invisible, untraceable, and ready to bite you on Black Friday when the shipment module quietly declines because you're out of stock.

What Oskar is really getting at is that Event-Driven Architecture is a style of integration, not a philosophy requiring you to model everything as events. The physical transport layer — Kafka, RabbitMQ, plain HTTP webhooks — tells you nothing about whether something is truly an event or a command. A message sent over Kafka can still represent a direct command. An HTTP call can carry an event notification. The distinction lives in the business intent, not the wire protocol. This is a point that gets lost constantly in the "just put everything on the queue" crowd.

The e-commerce order example in the piece is where it clicks into place. There are two paths in a typical order flow: a blocking critical path (payment and shipment must succeed, and they can fail and need to respond with a rejection) and a non-blocking path (email notifications, data warehouse updates — you want them to happen, but order processing doesn't wait on them). The right architecture makes those two paths explicit. A coordinator — a saga, a process manager, a workflow — sends actual commands (`RecordPayment`, `InitiateShipment`) to the critical-path modules and publishes events to the non-critical ones. That coordinator becomes your observability anchor. You know where to look when things go wrong.

Oskar then goes one level deeper with Gregor Hohpe's third message type from Enterprise Integration Patterns: the Document. This is where Change Data Capture setups run into serious trouble. Connecting your messaging system to your database and publishing every state change — `OrderCreated`, `OrderUpdated`, `OrderDeleted` — is not event-driven design, it is state leakage. Consumers now have to reverse-engineer business intent from raw state transitions. `OrderUpdated` tells you nothing about what happened to the order. Did it get confirmed? Cancelled? Corrected? Every consumer becomes tightly coupled to the internal data model of the producer, and you end up with exactly the kind of hidden, fragile dependency that event-driven architecture is supposed to eliminate. Martin Fowler calls this pattern "Event-Carried State Transfer" — Oskar doesn't like the term, and I'm inclined to agree, because calling it an event when it carries no business fact is precisely the confusion the article is diagnosing.

**Key takeaways:**

- If your event always has exactly one consumer and you expect a specific event back from it, it should be a command, not an event
- Synchronous versus asynchronous is about blocking versus non-blocking behavior, not about whether you use HTTP or a messaging queue
- A process coordinator (saga/workflow) that issues explicit commands on the critical path and publishes events on the non-critical path makes both the business process and its failure modes visible
- Gregor Hohpe's three message types — Event, Command, Document — are all distinct and mixing them up creates hidden coupling and unobservable systems
- Change Data Capture publishing raw state changes as "events" forces every consumer to understand the producer's internals, which is the worst kind of coupling

**Why do I care:** Every large frontend or full-stack system I've worked in eventually accumulates a graveyard of "events" that are secretly commands. The symptoms are always the same: race conditions that only appear under load, business processes that silently stall when one consumer doesn't react as expected, and zero observability because there's no single place that knows the intended flow. The fix Oskar describes — making a process coordinator explicit, separating the critical path from the non-critical path, and treating commands as commands — is exactly what makes a system debuggable. As someone who has spent too many hours staring at Kafka consumer lag graphs trying to reconstruct what a distributed order flow was supposed to do, the idea of having an explicit coordinator that publishes intentional, named commands to critical participants is not just architecturally clean, it is the difference between a system you can reason about and one you can only guess at.

**Link:** [Passive-Aggressive Events: Anti-patterns in event modelling](https://www.architecture-weekly.com/p/passive-aggresive-event?publication_id=579466&post_id=194057953&action=share&triggerShare=true&isFreemail=true&triedRedirect=true)
