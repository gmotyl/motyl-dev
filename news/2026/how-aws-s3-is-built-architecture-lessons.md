---
title: "How AWS S3 Is Built: Lessons from the World's Largest Distributed System"
excerpt: "Inside S3's architecture: hundreds of millions of transactions per second, 500+ trillion objects, 11 nines of durability that's measured not promised, and why the team rewrote performance-critical code in Rust."
publishedAt: "2026-01-21"
slug: "how-aws-s3-is-built-architecture-lessons"
hashtags: "#substack #aws #architecture #distributed-systems #rust #performance #cloud #infrastructure #generated #en"
---

## How AWS S3 Is Built

**TLDR:** S3 handles hundreds of millions of transactions per second and stores over 500 trillion objects. The engineering team achieved strong consistency without compromising availability, rewrote performance-critical code in Rust, uses formal methods to verify correctness, and operates on the principle that scale must be an advantage — not a liability.

Gergely Orosz interviews Mai-Lan Tomsen Bukovec, VP of Data and Analytics at AWS, who has run S3 for more than a decade. The conversation reveals the architectural principles and engineering practices behind one of the largest distributed systems ever built.

The scale is genuinely mind-boggling. S3 stores over 500 trillion objects across hundreds of exabytes. If you stacked all of S3's tens of millions of hard drives on top of each other, they would reach the International Space Station and almost back. And this system handles hundreds of millions of transactions per second worldwide.

The strong consistency story is a significant engineering feat. When S3 launched in 2006, it used eventual consistency to optimize for high availability. The team later achieved strong consistency without compromising availability or increasing costs — a very difficult feat. A key innovation was a replicated journal, a distributed data structure where nodes are chained together so writes flow sequentially through all nodes. Combined with a new cache coherency protocol providing "failure allowances," multiple servers can receive requests while tolerating some failures.

The Rust migration deserves attention. S3 wasn't written in Rust in 2006, but the team has rewritten almost every performance-critical piece of code in the request path to Rust. The motivation: achieving the highest performance and lowest latency possible. S3 now has a significant team of Rust engineers focused on this ongoing optimization work.

The 11 nines of durability (99.999999999%) isn't just a marketing claim — it's measured continuously. Auditor microservices continuously inspect every single byte across the entire fleet. When signs of needed repair are detected, separate repair systems automatically kick in. At any given moment, servers are failing, and the system is designed with the assumption that failure is constant. The AWS team can answer "What is our actual durability this week/month/year?" at any time.

Formal methods are practice, not theory at S3. When engineers check in code to the index subsystem that handles consistency, the system automatically runs formal proofs to verify that the consistency model hasn't regressed. As Mai-Lan put it: "At a certain scale, math has to save you. Because at a certain scale, you can't do all the combinatorics of every single edge case, but math can."

The real threat at this scale is correlated failures — when multiple components fail together because they share a fault domain (same rack, same availability zone, same power source). S3's architecture is designed around preventing correlated failures: data replicated across multiple availability zones, quorum-based algorithms tolerating individual node failures, and physical/logical infrastructure designed to avoid correlation.

S3 operates on 200+ services — much smaller than Uber's 4,500+ microservices. This confirms there's no correlation between number of services and scale a system handles. A significant portion of these microservices are dedicated solely to durability — health checks, repair systems, and auditors. The philosophy: complexity must be managed through simplification, and each microservice must remain focused.

The "Scale Is to Your Advantage" design principle resonated strongly. Engineers at S3 cannot build something where performance degrades as the service grows. Systems must be designed so that increased scale improves attributes. For example: the larger S3 gets, the more de-correlated workloads become, which ends up improving reliability for all users.

S3 Vectors represents a new challenge: searching for nearest neighbors in high-dimensional vector space is expensive. The solution: precompute "vector neighborhoods" (clusters of similar vectors) asynchronously offline. When a new vector is inserted, it's added to one or more neighborhoods. Queries first find nearest neighborhoods, then load only those vectors for the nearest neighbor algorithm. Result: sub-100ms warm query times supporting 2 billion vectors per index and 20 trillion vectors per bucket.

**Key takeaways:**
- Strong consistency was achieved without compromising availability through replicated journals and cache coherency protocols
- Performance-critical code paths have been rewritten in Rust for maximum performance
- 11 nines durability is continuously measured by auditor microservices, not just promised
- Formal methods automatically verify consistency model hasn't regressed on code check-in
- The principle "Scale must be to your advantage" means systems improve with growth, not degrade
- ~200 microservices is sufficient for one of the world's largest systems

**Tradeoffs:**
- Strong consistency increases engineering complexity but enables simpler application logic
- Rewriting to Rust requires significant investment but delivers measurable performance gains
- Extensive microservice decomposition for durability adds operational overhead but enables targeted repairs

**Link:** [How AWS S3 Is Built](https://newsletter.pragmaticengineer.com/p/how-aws-s3-is-built)

---

*This article was compiled from the Substack newsletter. The opinions and summaries presented are interpretations of the original sources — always read the linked articles for complete context.*