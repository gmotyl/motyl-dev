---
title: "Cloudflare Outage: Postmortem Lessons and CDN Dependency Risks"
excerpt: "Analysis of Cloudflare's 6-hour outage that took down major services, examining the root cause, incident response challenges, and the cost of CDN dependencies."
publishedAt: "2025-11-20"
slug: "cloudflare-outage-postmortem-lessons-cdn-dependency"
hashtags: "#generated #en #cloudflare #devops #incident #infrastructure #cdn #monitoring #reliability"
---

## Cloudflare's 6-Hour Outage: When Database Permissions Break the Internet

**TLDR:** Cloudflare's 6-hour outage affecting ChatGPT, Claude, Spotify, Uber, and thousands of other sites was caused by a database permissions change that doubled a Bot Management configuration file size, exceeding hard-coded limits and crashing the proxy layer.

**Summary:**

Cloudflare's November outage is a textbook case of how seemingly innocuous infrastructure changes can cascade into catastrophic failures. A database permissions change in ClickHouse caused a query to return duplicate results, doubling a configuration file from 60 features to 120+. The Bot Management module had a hard limit of 200 features with preallocated memory for performance. When the file exceeded expectations, the code called `unwrap()` on a Result type in Rust, which panics on errors. No graceful degradation, no logging, just instant crash.

What makes this incident particularly instructive is the incident response timeline. It took 2.5 hours to identify that incorrect configuration files were the root cause, and another hour to stop propagation and deploy a fix. The total outage lasted 6 hours from start to full resolution. For a company with Cloudflare's engineering maturity, this seems unusually long. The explanation reveals a critical incident response lesson: unrelated failures can send you down the wrong investigative path.

When edge nodes started crashing, Cloudflare's status page went offline simultaneously. This was pure coincidence—the status page is hosted completely separately with no dependencies on Cloudflare's infrastructure. But in the heat of the moment, with edge nodes going down and the status page unreachable, the natural assumption was a coordinated DDoS attack. Cloudflare faces constant attacks, so this hypothesis was entirely reasonable. The team spent time gathering attack details, analyzing traffic patterns, looking for malicious signatures. There was no attack. The status page coincidence cost them hours of investigation time.

The database permissions change itself is a case study in implicit dependencies becoming explicit. Before the change, queries against `system.columns` only returned tables from the `default` database because that's all users could see. Cloudflare wanted to improve security by moving from shared system accounts to individual user accounts. Individual users already had access to the `r0` database, so the team made that access explicit. Now the same query—unchanged—returned columns from both `default` and `r0` databases. The query never filtered by database name because it assumed only one database would be visible. Classic broken assumption.

What makes the failure mode particularly nasty is the gradual rollout. The configuration file was regenerated every 5 minutes by queries running across a ClickHouse cluster. As nodes were gradually updated with new permissions, some queries returned good data (60 features) and some returned bad data (120+ features). Edge servers receiving good files worked fine. Edge servers receiving bad files crashed. This created an oscillating failure pattern where the system would work, then fail, then work again. For incident responders, this behavior strongly suggests external attack or network instability, not internal configuration issues.

The code that panicked is instructive. The `append_with_names()` function likely checked for a 200-feature limit and returned an error when exceeded. But the calling code used `unwrap()`, which panics on errors. This pattern suggests the original developer never expected `append_with_names()` to fail. The 200-feature limit was so far above production usage (60 features) that failure seemed impossible. This is a common failure in error handling: treating "should never happen" scenarios as actual "can never happen" guarantees. In production systems at scale, everything that can happen eventually will.

What Cloudflare could have done differently: explicit error logging before panicking. If the line that returned an error also logged "Bot Management feature limit exceeded: got 120, max 200", the root cause would have been obvious in seconds. Instead, the team saw panics without context and had to work backward through the entire system to find the trigger. This is why defensive logging matters—not for the happy path, but for the moment when your assumptions break.

The global database change lesson is that there's no good way to test the impact of schema or permissions changes at scale. You can test queries in staging, but you can't test "what queries might this change affect that I don't know about?" The only way to discover that is production deployment, which is exactly what happened here. This doesn't mean you shouldn't make these changes—improving security by removing global system accounts is absolutely the right direction. It means you need circuit breakers, feature flags, and gradual rollouts with automatic rollback on error rate spikes.

Cloudflare's postmortem speed is remarkable. CEO Matthew Prince wrote the initial version at home in Lisbon hours after the incident was resolved. The team circulated a Google Doc with questions, got answers within hours, the SF team did a final review, and it was published within 24 hours of resolution. Compare this to AWS, which took three days to release a high-level postmortem without root cause details. Cloudflare's transparency here is exceptional and valuable for the industry.

The CDN dependency question is the uncomfortable reality this outage exposes. When you use a CDN, you take on a hard dependency to reduce traffic on your origin servers and serve users faster. When the CDN goes down, your options are limited. You can redirect to origin servers, but that requires suddenly scaling backend infrastructure to handle 10-100x normal traffic. You can maintain a backup CDN, but that means paying for a service that sits idle, with cache warming and contract complexity. Both options are expensive. Most companies accept the CDN dependency as an acceptable risk. Outages like this test that assumption.

Downdetector's story during the outage is particularly ironic. The service that reports when other services are down was itself down because of a hard Cloudflare dependency. Their team acknowledges this won't change anytime soon because the alternatives (handling traffic spikes without a CDN, maintaining backup CDNs) are prohibitively expensive for their scale. This is the calculation most companies make: CDN outages are rare enough that the cost of mitigation exceeds the cost of occasional downtime.

For architects and teams, the lessons are clear. Error handling should assume impossible scenarios will happen and log accordingly. Global infrastructure changes need circuit breakers and gradual rollouts with automatic rollback. Unrelated failures during incidents can mislead investigation—discipline around gathering data before jumping to conclusions is critical. And CDN dependencies are real, expensive to mitigate, and ultimately an accepted risk for most organizations.

**Key takeaways:**
- Database permissions change caused queries to return duplicate results, doubling configuration file size beyond hard-coded limits
- Unwrap() on error results caused immediate panics instead of graceful degradation with logging
- Unrelated status page failure suggested DDoS attack, sending incident response down wrong path for hours
- Gradual rollout of bad configuration created oscillating failures that mimicked external attack patterns
- Explicit error logging before panics enables rapid root cause identification compared to silent failures
- CDN dependencies are expensive to mitigate with backup infrastructure, making outages an accepted risk

**Tradeoffs:**
- Gain security improvements by removing shared system accounts but introduce risk of breaking implicit query dependencies
- Achieve performance through memory preallocation with hard limits but create catastrophic failure modes when limits exceeded
- Reduce origin server load and improve latency with CDN but accept hard dependency with limited mitigation options

**Link:** [The Pulse: Cloudflare takes down half the internet – but shares a great postmortem](https://newsletter.pragmaticengineer.com/p/the-pulse-cloudflare-takes-down-half?publication_id=458709&post_id=179493354&isFreemail=true&triedRedirect=true)

---

*This summary was generated from newsletter content and focuses on technical insights for experienced developers. Always verify critical information against official documentation.*