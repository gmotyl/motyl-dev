---
title: "Strictland: A Simpler Approach to Message Contract Testing"
excerpt: "Oskar Dudycz announces Strictland, a lightweight JVM contract testing library that uses snapshot files instead of brokers to catch message format drift."
publishedAt: "2026-06-15"
slug: "strictland-contract-testing-message-compatibility"
hashtags: "#eventdriven #architecture #dotnet #contracttesting #jvm #testing #generated #en"
source_pattern: "OskarDudycz"
---

## Announcing Strictland: New Contract Testing Library for Message Compatibility

**TLDR:** Oskar Dudycz released Strictland, a JVM library for contract testing that skips brokers and registries entirely, committing serialized message snapshots to your repo instead. It catches format drift in the same pull request that introduced the change. Simpler than Pact, deliberately so.

**Summary:**

Let me be upfront: I find this genuinely interesting, and not just because the name is a Back to the Future pun. Oskar built Strictland because the teams he consults with kept tripping over the operational weight of tools like Pact or Confluent Schema Registry. Those tools are real, proven, and powerful. They also demand a broker, a mock service, Docker, and a non-trivial setup ceremony before you get your first test passing. For many teams, that upfront investment never pays off because they abandon the practice halfway through.

Strictland takes a radically different approach: write an ordinary unit test, let the library serialize your message to a file, commit that file next to your test. From that point forward, any format change makes the test fail. You review the diff in your normal pull request workflow. There is no separate system to run, no schema registry to authenticate against, no broker URL to configure. The feedback loop is as fast as the rest of your unit tests because it is your unit tests.

The backward and forward compatibility checks are the part that earns this tool its keep. Backward compatibility confirms that newer code can still read messages written by older code, which matters enormously if you are storing events. Forward compatibility confirms that older readers survive messages produced by newer writers, which is the guarantee you need when deploying producer and consumer at different times. Both checks compare shared fields and fail if a required field went missing or a value type shifted. That is exactly the breakage that sneaks through in distributed systems and only surfaces in production at the worst possible moment.

What Oskar is not hiding is the trade-off: Strictland does not exercise a live message exchange. It serializes to a file. You do not get the protocol-level guarantees Pact gives you, and you will not auto-generate consumer stubs. If you are running microservices at scale with multiple language ecosystems and dedicated platform teams, you probably still want the heavier tooling. But Oskar's observation rings true from my own experience: most teams at most stages of their journey are not there yet, and giving them something they will actually use beats giving them the right tool they never configure.

**Key takeaways:**

- Strictland is a JVM (Java, Scala, Kotlin) contract testing library, with .NET and TypeScript support planned
- It uses snapshot files committed to the repo rather than brokers or schema registries
- Snapshot checks catch accidental format changes; compatibility checks validate intentional message evolution
- `thenBackwardCompatible()` and `thenForwardCompatible()` give you precise control over which direction of compatibility to enforce
- The library uses your application's own serializer, so the snapshot reflects the exact bytes you ship, not a test approximation
- Pre-1.0, so the API may shift, but the snapshot files themselves are just text in your repo

**Why do I care:**

As someone who has watched contract testing adoption fail on team after team not because the concept is wrong but because the tooling is too heavy to adopt incrementally, Strictland is the kind of pragmatic bet I respect. It will not replace Pact for teams that need Pact. But it will catch the field rename that breaks consumers before it hits production, which is often all you actually needed. The one thing I want to see Oskar address soon is the snapshot file organization, because a test suite with hundreds of approved files in a flat directory is going to get messy fast. He's already thinking about it, which is a good sign.

**Link:** [Announcing Strictland - new contract testing library for message compatibility](https://www.architecture-weekly.com/p/announcing-strictland-new-contract?publication_id=579466&post_id=202156132&isFreemail=true&triedRedirect=true)
