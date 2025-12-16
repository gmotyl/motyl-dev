---
title: "Inside the Storm: How AWS Manages a Major Outage"
excerpt: "A deep dive into the 15-hour AWS outage in us-east-1, revealing the intricate details of the incident response, the surprising root cause involving a DNS race condition, and the structured process AWS uses to restore service."
publishedAt: "2025-12-16"
slug: "how-aws-deals-with-a-major-outage"
hashtags: "#substack #aws #outage #incidentresponse #dns #dynamodb #architecture #cloud #generated #en"
---

## How AWS deals with a major outage

**TLDR:** An insider from the AWS Incident Response team provides a detailed account of the recent 15-hour outage in us-east-1. The incident was a complex cascade failure initiated by an unexpected race condition in DynamoDB's internal DNS system, compounded by a separate, simultaneous networking issue.

**Summary:**
This article by Gergely Orosz, featuring insights from AWS Senior Principal Engineer Gavin McCullagh, offers a rare, behind-the-scenes look at how Amazon handles a massive, global-impact outage. The October incident in the us-east-1 region, which affected services like Signal, Snapchat, and even Amazon's own retail site, was not caused by a "brain drain" as some media suggested, but by the immense complexity of operating distributed systems at scale.

The response process was a methodical, high-stakes debugging effort. The incident began with two simultaneous problems: a network packet loss event and a more severe degradation in DynamoDB. The initial triage was a red herring, as the networking issue seemed to be the root cause. However, the team quickly realized a more profound problem was at play when they discovered DynamoDB was failing to resolve in DNS.

The core of the outage was a bug in a service called DNS Enactor, which manages DNS records for DynamoDB. A clever but ultimately flawed optimistic locking mechanism, which used Route 53 TXT records to prevent circular dependencies, led to a race condition. An "unlucky" Enactor instance, after failing to acquire a lock multiple times, held onto a very old DNS plan. When it finally executed, a cleanup process in a more up-to-date Enactor mistakenly deleted critical records, causing the service to go dark.

Restoration involved multiple parallel efforts. A partial mitigation was deployed within an hour by forcing DNS overrides for internal AWS services, restoring critical dependencies like IAM and STS. The full public fix required the team to manually reconstruct and deploy the correct DNS zone files, a process complicated by the fact that the highly reliable automation it replaced had never required manual intervention before.

**Key takeaways:**
-   Major outages are rarely caused by a single failure but are often a cascade of interconnected, sometimes coincidental, events.
-   AWS has a dedicated, 24/7 global Incident Response team that follows a systematic, bottom-up debugging process during major events.
-   The root cause was a subtle race condition in an internal DNS management service, highlighting the fragility that can exist even in hyper-scale systems.
-   The team used clever engineering (using Route 53 for locking) to avoid circular dependencies, but this introduced its own unforeseen failure mode.
-   Mitigation is often phased, with initial steps focused on restoring core internal services to enable further recovery, followed by a full public fix.

**Tradeoffs:**
-   **Automation vs. Manual Recovery:** The highly reliable DNS automation meant the team had no muscle memory for manual intervention, which slowed down the full recovery. This is a classic tradeoff: high reliability of automated systems can lead to a lack of practice with manual recovery procedures, which are critical when automation fails in unexpected ways.

**Link:** [How AWS deals with a major outage](https://newsletter.pragmaticengineer.com/p/how-aws-deals-with-a-major-outage)
