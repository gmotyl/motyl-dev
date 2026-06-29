---
title: "LinkedOut: What LinkedIn Actually Knows About You"
excerpt: "Alex Ewerlöf built an open-source Chrome extension to visualize 16 years of LinkedIn data exports, and the findings are unsettling."
publishedAt: "2026-06-28"
slug: "linkedout-linkedin-data-privacy"
hashtags: "#engineering #architecture #privacy #data #openSource #GDPR #generated #en"
source_pattern: "AlexEwerlöf"
---

## LinkedOut: Visualizing Your LinkedIn Data Export

**TLDR:** Alex Ewerlöf built a free, open-source Chrome extension called LinkedOut that lets you browse the data LinkedIn has collected on you. He spent 50+ hours and $120 in LLM tokens building it, discovered LinkedIn stored over 54,000 data points about him, and found the data export is a mess of inconsistencies.

**Summary:** So here's a project I find genuinely interesting, and a bit disturbing. Alex has been on LinkedIn since October 2010, and he decided to actually look at what the platform has been collecting. Through GDPR's Article 20, the right to data portability, you can request a full export of your LinkedIn data. It's free. It takes up to 24 hours and the link expires after 72 hours, but you can get it.

What he found in that export for himself was staggering: over 54,000 data points spanning 16 years. Twenty thousand messages, eleven thousand reactions, four thousand connections, nearly four thousand comments, two thousand searches, and 421 ad clicks. He also found that twelve years ago he'd allowed LinkedIn to sync contacts, which leaked 3,800 personal contact records including emails, phone numbers, and addresses. That's data about other people, not just him, sitting in LinkedIn's hands.

The interesting part of this project isn't just the data revelation, it's the technical approach. Alex built an entirely offline single-page application, packaged as a Chrome Extension, that reads the ZIP export into IndexedDB. No server, no data transmission, no third party involvement. He reconstructed a functional replica of LinkedIn's interface: profile page, messages, activity feed, network view, and jobs tab. The whole app runs locally in your browser.

He used a hybrid AI coding setup to build this: DeepSeek V4 Pro via direct API for reasoning and code generation, and Gemma 4 12B running locally on a Mac Mini M4 for vision tasks. The vision model was needed because UI-heavy iteration requires attaching screenshots, and DeepSeek lacks that capability. This is a pragmatic and cost-conscious setup, and he documents it clearly.

Where I have to push back a little is on the data quality problem Alex describes. LinkedIn's export is inconsistent. Dates come in at least three different formats. CSVs are malformed with extra lines that break standard parsers. Files are named inconsistently across exports. Duplicates are everywhere. Alex frames this as a resourcing or incentives problem, no Staff+ engineer owning the export pipeline across teams. That might be true, but it's also worth asking whether it's intentional friction. Making the export hard to use without building tooling first is a convenient way to reduce actual data portability in practice while remaining technically compliant.

**Key takeaways:**
- You can request a full LinkedIn data export under GDPR (Article 20) or equivalent laws in California, Brazil, Canada, and others
- LinkedOut is a free, open-source Chrome Extension that renders your LinkedIn export locally, with no data transmission
- LinkedIn's data export is poorly formatted: inconsistent dates, broken CSV, duplicates, and missing data like post images
- Some data appears to be withheld entirely, and some older data disappears between export snapshots
- A hybrid local/cloud AI coding setup (DeepSeek for code, local Gemma for vision) can be a cost-effective alternative to GitHub Copilot Pro Plus

**Why do I care:** From an architecture perspective, this is a clean demonstration of what "offline-first" and "privacy by design" actually look like in practice. No backend, no auth, no telemetry, just a local SPA reading from IndexedDB. The trade-off Alex makes is explicit: because there's no server and no paid SLA, he doesn't stress about code quality the way he would for a commercial product. That's an honest acknowledgment that most developers should internalize. The data portability angle matters too. GDPR compliance in form but not in spirit is a real pattern, and this project makes it visible. If you work on data pipelines or export features, look at how LinkedIn exports data and ask yourself if you'd want your users to experience that.

**Link:** [LinkedOut](https://blog.alexewerlof.com/p/linkedout)
