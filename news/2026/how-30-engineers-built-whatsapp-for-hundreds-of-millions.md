---
title: "How 30 Engineers Built WhatsApp for Hundreds of Millions"
excerpt: "Jean Lee, engineer #19 at WhatsApp, reveals how a tiny team with zero formal processes outcompeted thousand-engineer rivals, why saying no was their superpower, and what the Facebook acquisition looked like from the inside."
publishedAt: 2026-03-18
slug: how-30-engineers-built-whatsapp-for-hundreds-of-millions
hashtags: "#substack #whatsapp #engineering-culture #scaling #team-management #erlang #generated #en"
---

## Building WhatsApp with Jean Lee

**TLDR:** Engineer #19 at WhatsApp, Jean Lee, shares the inside story of how 30 engineers served 450 million users with no Scrum, no code reviews after onboarding, and almost zero formal processes — and why that tiny, experienced team crushed competitors with thousands of engineers.

**Summary:**

This is a fascinating deep-dive conversation from The Pragmatic Engineer with Jean Lee, who joined WhatsApp when it was still a scrappy startup and helped scale it into one of the most widely used messaging platforms on the planet. Jean paints a picture of an engineering culture that flies in the face of everything modern tech organizations preach. There were no standups, no Agile ceremonies, no mandatory code reviews beyond your very first pull request. Cofounder Brian Acton would review your debut PR with surgical precision, set the bar impossibly high, and then trust you to maintain that standard on your own from that point forward. The entire philosophy boiled down to trust over process.

WhatsApp chose Erlang for its backend, a decision rooted in the language's strength at handling massive concurrent connections, originally developed by Ericsson for telecom systems. The team avoided cross-platform abstractions and instead wrote native code for each of their eight supported platforms. They deliberately kept growth slow by charging users one dollar per year, which was enough to pay salaries and avoid the ad-driven growth treadmill. CEO Jan Koum famously rejected 99 percent of feature requests, insisting that a grandmother in the countryside should be able to use the app without confusion. Video calling was held back for years until it met their quality bar, a stark contrast to the ship-fast-and-iterate mantra most startups live by.

The conversation also covers the Facebook acquisition, how Jean dealt with sudden personal wealth, her transition from individual contributor to engineering manager at Meta, and the realities of performance calibration meetings. Jean notes that at Meta, engineers who posted about their work on the internal social platform had a measurable advantage in performance reviews, which is a fascinating and slightly unsettling insight into big-tech career dynamics. On the topic of AI, Jean believes it can handle documentation, OKR management, and data gathering, but that the human element of understanding and unblocking engineers remains irreplaceable.

**Key takeaways:**

- WhatsApp served 450 million users with only 30 engineers and no AI tooling, proving that small, trusted teams can outperform massive organizations
- The only code review happened on your first PR — after that, you were trusted to maintain the standard independently
- Zero formal processes: no Scrum, no Agile, no TDD, yet WhatsApp outcompeted Skype which had 1,000 engineers and mandatory Scrum training
- A visible countdown display showing days since the last outage created accountability without bureaucracy
- Saying "no" to 99% of feature requests and prioritizing reliability over feature bloat was a genuine competitive advantage
- The team was unusually experienced — only 4 of 30 engineers were under 30 years old at the time of the Facebook acquisition
- Erlang was chosen for the backend due to its strength in handling massive concurrent connections

**Why do I care:**

If you have ever sat through a two-hour planning ceremony wondering whether any of this ritual actually makes your team ship better software, this episode is validation for that nagging feeling. WhatsApp is proof that process is often a substitute for trust, not a guarantee of quality. The bit about the single onboarding code review setting the bar for everything that follows is something every tech lead should internalize. And the observation that an experienced, senior-heavy team with high trust and low overhead can outship a team thirty times its size is a lesson that keeps repeating itself across the industry. The Erlang choice is also worth noting — picking the right tool for the actual problem, rather than the popular tool, paid off spectacularly at scale.

**Link:** [Building WhatsApp with Jean Lee](https://newsletter.pragmaticengineer.com/p/building-whatsapp-with-jean-lee?publication_id=458709&post_id=191213865&play_audio=true&triedRedirect=true)
