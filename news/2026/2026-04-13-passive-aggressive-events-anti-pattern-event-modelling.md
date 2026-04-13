---
title: "Stop Lying to Yourself: When Your Event Should Be a Command"
excerpt: "Architecture Weekly digs into a sneaky anti-pattern in event-driven systems where events masquerade as commands, and why that passive-aggressive style of messaging will make your distributed system a noisy, unreliable mess."
publishedAt: "2026-04-13"
slug: "passive-aggressive-events-anti-pattern-event-modelling"
hashtags: "#architectureweekly #eventdriven #distributedsystems #generated #en"
source_pattern: "Substac"
---

## Anti-Patterns in Event Modelling: Passive Aggressive Events

**TLDR:** Oskar Dudycz of Architecture Weekly names a real problem in event-driven design: events that are really just disguised commands. When you publish an event but you absolutely need a specific consumer to do a specific thing in response, you are not broadcasting a fact. You are being passive-aggressive. The fix is to be honest about what message type you actually need.

You have heard these before. "Just so everyone's aware, the milk ran out." "Heads up, the coffee machine is empty again." We all know those are not updates. They are commands wearing event clothes. The person saying them wants someone to act, but they are wrapping that expectation in plausible deniability. Oskar makes the case that event-driven architectures fall into the exact same trap all the time.

The distinction matters a lot once you spell it out. Commands have a handler that can accept or reject them. Events get broadcast to whoever is listening, and if nobody acts on them, that is fine by the contract. The moment you publish an event but your system actually cannot proceed unless a specific consumer responds with a specific follow-up, you have not made your communication non-blocking. You have made it sequential with extra steps and none of the visibility that explicit commands would give you.

The e-commerce order scenario Oskar walks through is a good one. You confirm an order and broadcast an OrderConfirmed event, then passively expect payment, shipment, fraud detection, and notifications to all pick it up and do their thing. Two of those are actually on the critical path: if payment fails or shipment is out of stock, the order cannot complete. Those are not events. They are request-response flows disguised as events. Calling them events makes you forget to model the rejection paths. Black Friday arrives, inventory runs out, and suddenly your system is stuck because nobody designed for the "no" response.

There is also a third message type that tends to get trampled in these discussions: the Document. Gregor Hohpe defined it in Enterprise Integration Patterns as self-contained state at a point in time. Martin Fowler calls it Event-Carried State Transfer, though Oskar is not fond of that term. His criticism lands well. When teams wire up Change Data Capture to a message bus and start publishing OrderCreated, OrderUpdated, OrderDeleted, they think they are doing event-driven architecture. What they are actually doing is making every consumer reverse-engineer the internal state machine of the producer to figure out what actually happened. That is hidden coupling, and it is the worst kind because it does not surface until something breaks in production.

The article does not dwell enough on tooling or how to practically introduce commands into a system that has gone all-in on events, and I think that is a real gap. If your entire Kafka topology is built around event streams, adding explicit command channels is not just a naming change. But what Oskar does nail is the modeling conversation: use Example Mapping during event storming sessions to force the team to articulate negative scenarios explicitly. If you cannot describe what "no" looks like for a given flow, you have probably modelled a command as an event.

The CQRS and saga angles are implied but not fully drawn out. A coordinator, workflow, saga, or process manager that owns the critical path and explicitly commands the payment and shipment modules gives you observability and failure handling you simply cannot get when everything is a broadcast event. The ordering module stops being a passive broadcaster and starts being an honest participant in a conversation.

**Key takeaways:**
- Events, commands, and documents are three distinct message types with different semantics; conflating them causes real architectural problems.
- A command can be rejected; an event can only be ignored. If your "event" must produce a specific outcome, it is a command.
- Blocking vs non-blocking is about your business process logic, not about whether you use HTTP or a message queue.
- Change Data Capture publishing raw state transitions creates hidden consumer coupling and strips out business meaning.
- Critical-path flows need explicit coordinators like sagas or process managers, not passive event broadcasts hoping someone will react.

**Why do I care:** As someone who has wired up Kafka topics and called it "event-driven," this article puts a name on something I have watched teams get wrong repeatedly. The moment your on-call runbook includes the phrase "if you see event X without a follow-up event Y, check if service Z crashed," you have secretly built a command-response flow disguised as pub-sub. The explicit coordinator pattern is more code, more ceremony, but it is honest. And honest systems are debuggable systems. The taxonomy alone, events versus commands versus documents, is worth pinning somewhere visible during your next event storming session.

**Link:** [Anti-patterns in event modelling - Passive Aggressive Events](https://www.architecture-weekly.com/p/anti-patterns-in-event-modelling)
