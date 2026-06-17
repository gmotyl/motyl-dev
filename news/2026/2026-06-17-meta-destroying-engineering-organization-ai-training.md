---
title: "Why Meta Is Dismantling Its Engineering Culture for AI Training Data"
excerpt: "A deep look at how Meta's leadership turned one of Silicon Valley's most respected engineering organizations into a data labeling operation, and the consequences that followed."
publishedAt: "2026-06-16"
slug: "meta-destroying-engineering-organization-ai-training"
hashtags: "#pragmaticengineer #meta #engineeringculture #ai #softwareengineering #generated #en"
source_pattern: "Pragmatic engineer"
---

## Why Meta Is Destroying Its Engineering Organization

**TLDR:** Meta has forcibly reassigned 30-50% of its engineers to AI data labeling work, deployed keystroke tracking software with no opt-out, and measured token usage as a performance metric. The result: a major security breach, a wave of senior engineers looking to leave, and a cultural collapse that took twenty years to build and apparently just weeks to destroy.

**Summary:** For two decades, Meta built something genuinely unusual in Silicon Valley. An engineering culture that actually gave people autonomy. New hires went through a six-week bootcamp and chose their own teams. Internal transfers were common, initiated by engineers themselves. The company had a culture of impact-driven work, loose processes, and a founder-engineer CEO who understood and valued what software people did. I keep thinking about how rare that actually was, and how fast it was dismantled.

Starting around April of this year, Meta's leadership began rolling out a series of decisions that collectively constitute one of the most aggressive de-engineering moves any major tech company has attempted. The first was mandatory keystroke and mouse tracking across the engineering workforce, with no option to opt out and no prior consultation. If you logged into your bank account on your work machine, that was tracked. The stated purpose was generating training data for an internal AI coding model. The actual result was immediate, intense backlash, and some partial rollbacks only after "weeks of angry pushback."

Then came the forced reassignments. Between 30 and 50 percent of engineers on core product teams were pulled off their work and placed into a new org called ADO, Agent Data Optimisation, to do human feedback and data labeling for AI model training. About 6,500 people are now in this org, more than the entire headcount at OpenAI or Anthropic. Infrastructure and security teams were hit especially hard. And it was often the strongest engineers who got moved. Meanwhile, performance reviews began tracking AI token usage, which created a straightforward incentive: generate as many tokens as possible, regardless of whether that work was actually useful.

The predictable result was an engineering culture where people started optimizing for looking productive with AI rather than actually being productive. Nobody was checking whether AI-reviewed, AI-generated code was any good. The security consequences were not long in coming. On May 30th, a zero-authentication vulnerability in Instagram allowed attackers to reset account passwords and take over accounts, including high-profile ones, by simply claiming the account was hacked and asking Meta's support AI to send a verification code to an attacker-controlled email. No additional verification. No check that the email was ever associated with the account. The Trust and Safety team had lost roughly half its staff to data labeling and layoffs before this happened. The CISO resigned the following day. Instagram had another full outage on June 12th.

What Meta's leadership has engineered here is a system that produces all the metrics of AI adoption while removing the engineering judgment needed to catch the failures that AI adoption creates. Mitchell Hashimoto's description of "AI psychosis" is apt: when founders convince themselves that AI will fix its own bugs fast enough that quality doesn't matter, they are repeating the same mistake the infrastructure world made with "MTTR is all you need" before the cloud era taught everyone that resilient systems and fast recovery are not substitutes. Meta is learning this the hard way, and in public.

**Key takeaways:**
- Forced reassignment of 30-50% of engineers to AI data labeling destroyed the trust and autonomy that made Meta's engineering culture valuable in the first place.
- Measuring AI token usage in performance reviews created perverse incentives that pushed engineers toward performative AI use rather than thoughtful engineering.
- Gutting security and infrastructure teams contributed directly to a major account takeover vulnerability that affected high-profile Instagram accounts.
- The CISO resigned the day after the breach, suggesting internal warnings about security org cuts were ignored at the leadership level.
- Strong engineers are actively interviewing elsewhere, and Meta's talent loss will benefit startups and other Big Tech companies that treat engineers as a profit center rather than a cost center.

**Why do I care:** I find this story genuinely frightening, not because it's unique to Meta but because the pattern it represents could happen anywhere right now. When a company decides that AI token generation is a proxy for engineering value, it breaks the feedback loop that keeps software trustworthy. The Instagram breach wasn't a mysterious failure; it was the logical result of removing the humans who would have caught it. As an architect, the thing I keep coming back to is this: AI makes generating code cheaper, but it does not make knowing whether that code is correct any cheaper. The engineers who understood what "correct" meant at Meta's scale were exactly the ones who got reassigned or left. That's not a productivity gain, that's a slow-motion structural failure.

**Link:** [Why is Meta destroying its engineering organization?](https://newsletter.pragmaticengineer.com/p/why-is-meta-destroying-its-engineering?publication_id=458709&post_id=202307236&isFreemail=true&triedRedirect=true)
