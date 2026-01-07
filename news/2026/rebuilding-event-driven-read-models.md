---
title: 'Rebuilding Event-Driven Read Models: The Architecture of Resilience'
excerpt: 'A deep dive into safe and resilient event-driven architecture, exploring inline vs async projections, distributed coordination strategies, and practical implementation patterns for handling eventual consistency during read model rebuilds.'
publishedAt: '2026-01-05'
slug: 'rebuilding-event-driven-read-models'
hashtags: '#substack #architecture #event-sourcing #postgresql #distributed-systems #database-design #resilience #generated #en'
---

# Rebuilding Event-Driven Read Models: The Architecture of Resilience

## TLDR

When building event-driven systems with read models, you face a fundamental choice: keep projections simple and fast with inline updates, or go async and handle the complexity of eventual consistency. When things break and you need to rebuild, you're looking at distributed coordination challenges that most teams underestimate. PostgreSQL advisory locks combined with status tracking tables can give you crash recovery and race condition prevention without spinning up additional infrastructure.

## Summary

Let me paint a picture that I think resonates with a lot of teams I talk to. You've built an event-driven architecture. Your domain model is clean, your event store is the single source of truth, and then you've got these read models—these denormalized, optimized views of your data that make your queries scream. Everything's working beautifully until the day something goes wrong. Maybe a bug in your projection logic, maybe external data corruption, maybe you just changed how you want to organize your read model entirely. Now you're staring at the question: how do I safely rebuild this thing without breaking production?

This is where a lot of teams hit the wall. They've figured out the happy path of event sourcing, but the operational complexity of maintaining and rebuilding those read models becomes the tax they didn't budget for. The challenge isn't really technical—it's architectural. It's about understanding the tradeoffs you've made and then building safety mechanisms around them.

Here's what I think people miss when they start down this road: the decision between inline and async projections isn't just a performance knob. It's a fundamental architectural choice that cascades through your entire system. When you choose inline projections, your read models get updated in the same transaction as your events. It's fast, it's immediate, there's no eventual consistency window to worry about. But you're coupling your business logic to your read model implementation. Your event handler now needs to know about every read model that might care about that event. That's a smell, right? It breaks the loose coupling that event-driven architecture is supposed to give you.

Async projections decouple things beautifully. Your event handlers fire events and go home. Separate processes pick up those events and build out the read models. Multiple subscribers can exist without the event handler knowing or caring. But now you've introduced eventual consistency as a permanent feature of your system. Your queries might return stale data. Your users might see inconsistent views depending on timing. And when something goes wrong with your projections, rebuilding becomes this complex dance of coordination.

The resilience question really comes down to this: how do you handle rebuilds safely in a system where multiple async processors might be running at the same time? How do you prevent two rebuilds from stepping on each other? How do you handle crashes in the middle of a rebuild and resume from where you left off? This is where I see teams either over-engineer massive orchestration solutions or under-engineer and live with the occasional data corruption.

## Key Takeaways

**The Inline vs Async Tradeoff**: Inline projections are faster and simpler, with immediate consistency, but they couple your business logic to read model concerns. Async projections are loosely coupled and allow multiple subscribers, but they introduce eventual consistency as a permanent characteristic you need to manage and communicate to users. Neither is universally better—it depends on whether your consistency requirements can tolerate staleness.

**Rebuild Strategies Matter**: When you need to rebuild, you have essentially two approaches. You can do an in-place rebuild where you truncate your read model and reproject from the event stream, hoping nothing breaks during the process. Or you can do a blue-green rebuild where you create a parallel new read model, project everything into it while the old one stays live, and then switch. Blue-green is safer but requires double the resources temporarily.

**PostgreSQL Advisory Locks Are Your Friend**: You can coordinate between multiple async processors using exclusive locks during rebuilds and shared locks during normal operation. This prevents race conditions without requiring external coordination infrastructure like Zookeeper or Consul. It's elegant because the lock is tied to the same database that holds your events and read models.

**Status Tracking for Crash Recovery**: A simple status table tracking what projection is being rebuilt, which checkpoint we're at, and what the state is lets you resume after failures. If a process crashes mid-rebuild, the next process that comes online can see the incomplete rebuild, clean up, and start over. This is low-tech and highly reliable.

**Eventual Consistency Isn't Just Async**: Even with inline projections, you need to think about eventual consistency during rebuilds. When you're rebuilding a read model, there's a window where your queries are returning incomplete or incorrect data. For async projections, there's always a window. The question is how wide that window is and whether your system and your users can handle it.

## Tradeoffs

Here's what I want you to think about: every safety mechanism you add has a cost. Using advisory locks means contention during high concurrency—all those processes waiting for each other. Status tracking tables mean additional database operations and more schema to maintain. Blue-green rebuilds mean you're holding onto two copies of your data at once, which can be expensive for large read models.

Then there's the organizational tradeoff. Simple in-place rebuilds are something one person can reason about. Blue-green with coordinated async rebuilds across multiple processors? You need documentation, you need operational runbooks, you need people who understand the architecture well enough to troubleshoot it when something goes sideways at 3 AM.

And here's something I don't think gets talked about enough: the eventual consistency window during rebuilds is a user experience problem, not just a technical problem. If your read model is stale during the rebuild, what happens? Do your queries fail gracefully? Do users see empty results? Do they see old data that might be incorrect? The answer matters, and it should be designed intentionally, not discovered in production.

There's also the question of whether you actually need async projections for most of your use cases. Many teams I talk to use async because it's the pattern they learned, not because they actually need the loose coupling. For systems with a few read models that don't change often, inline projections are simpler, faster, and easier to reason about. The operational burden of async might not be worth it.

## Link

For deeper exploration of event-driven architecture patterns, PostgreSQL coordination mechanisms, and rebuild strategies, check out the original discussion on event sourcing communities and database-specific coordination patterns.

---

**Reflection**: What's your approach to read model consistency? Are you optimizing for fast rebuilds or loose coupling? How are you handling the operational complexity of keeping your projections in sync?
