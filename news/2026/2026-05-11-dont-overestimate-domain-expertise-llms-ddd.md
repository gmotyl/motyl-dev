---
title: "Don't Overestimate Domain Expertise, and Don't Outsource Thinking to LLMs"
excerpt: "A critical look at how LLMs fail at domain research and DDD modeling, and why engineering judgment and human collaboration remain irreplaceable."
publishedAt: "2026-05-11"
slug: "dont-overestimate-domain-expertise-llms-ddd"
hashtags: "#architecture #generated #en #DDD #LLM #softwaredesign #domaindrivendesign #OskarDudycz"
source_pattern: "OskarDudycz"
---

## Don't Overestimate Domain Expertise, and Don't Outsource Thinking to LLMs

**TLDR:** Oskar Dudycz used an LLM to research hospitality management domain concepts and found it produced the same problems as working with domain experts, only worse. The model mixed vocabulary from competing systems, invented coordination commands, and delivered everything with equal confidence. The real lesson is that domain language is a cognitive tool, not gospel, and using LLMs without engineering judgment just replaces one source of bias with a noisier one.

**Summary:**

Oskar started with a reasonable experiment: use Claude Opus as a sparring partner to refresh his knowledge of hotel checkout flows before running a workshop. He knew the domain from past work, so he had a baseline. What he got back was an avalanche. The LLM modelled marketing consent, loyalty timing, inventory management, regulatory submissions, and data retention policies, all at the same level of detail, burying the core checkout flow he actually asked about. Sound familiar? That's exactly what happens when you sit down with a domain expert for the first time. They give you their pet peeves wrapped inside process descriptions.

The deeper problem surfaced when the LLM started throwing around jargon like "Folio," "Drain Pending Postings," and "Account Receivables." These are real terms used by real cashiers in real hotels. The catch is that most of them trace directly back to Oracle Opera, a system that has dominated hospitality management for thirty years. Its vocabulary baked itself into how thousands of hoteliers talk about their work. So when you ask an LLM to describe modern checkout processes, it goes into its training data, finds OPERA documentation everywhere, and hands you OPERA jargon dressed up as industry standard. When Oskar pushed back on the terminology, the model didn't reconsider the concepts, it just swapped in different OPERA jargon. The reasoning never changed. Only the surface words did.

There's a specific failure mode Oskar identifies: the LLM invented a coordination command called "Drain Pending Postings" to match a phrase real cashiers use as shorthand. "Drain the interfaces" is something people say in hotels. It doesn't represent a discrete system function in any modern architecture. But the model materialized it as one anyway, blending vocabulary from one system with mechanics from another, delivered with complete confidence. In modern payment systems, financial charges are recorded continuously throughout a stay. There is no separate draining moment. The LLM manufactured one because it was statistically plausible from its training data.

This is where Oskar makes his sharpest point. Domain experts also bring you solutions instead of problems. They explain how things work right now, loaded with tribal knowledge, habits, and jargon they've never had to examine critically. The difference is that with a domain expert, you can trace the origin of their bias. You can ask follow-up questions. You can push back and watch how they respond. With an LLM, the bias is invisible and the model will eventually agree with whatever you already believe, making you feel validated while potentially steering you wrong. He calls this "Artificial Reality," and it's a more dangerous failure mode than the skewed reality a domain expert gives you, because at least the expert's skew has a knowable origin.

The article closes with a nuanced position that I find more honest than most takes on this topic. LLMs are genuinely useful for getting a quick overview of an unfamiliar domain, identifying known unknowns, and organizing structured outputs from findings you already have. They should not be used to replace the discovery process, the modeling work, or the iterative feedback loop with real stakeholders. Outsourcing domain modeling to an LLM because you want to avoid the hard conversations with business people doesn't eliminate those conversations. It just means you show up to them with a model that's already wrong in ways you can't see.

**Key takeaways:**
- LLMs trained on public documentation inherit the vocabulary and mechanics of dominant systems, often without understanding why those systems made the choices they did.
- Domain language in DDD is a cognitive tool to reduce translation overhead, not a source of truth about how your software should work.
- "LLMs are great at research" often means "I already knew enough to evaluate and correct the output," which is a skill projection problem, not a capability statement about the LLM.
- The yes-man problem is real: LLMs will eventually align with whatever the prompter believes, which makes them actively misleading in domains where you already have strong priors.
- Use LLMs to speed up work you already know how to do, not to replace the judgment needed to do that work in the first place.

**Why do I care:** As someone who has spent years navigating the gap between what business stakeholders say they want and what software should actually do, this resonates hard. The DDD community sometimes treats ubiquitous language as sacred text when it's really a team coordination mechanism. If your team starts adopting vocabulary that describes how Oracle Opera stores data rather than how your business process actually works, you've imported thirty years of someone else's technical debt into your model. The LLM problem is a sharper version of a mistake developers have always made: accepting the first plausible-sounding answer and building on top of it. The answer to that was never "ask fewer questions." It was always "get better at asking them."

**Link:** [Don't overestimate domain expertise](https://www.architecture-weekly.com/p/dont-overestimate-domain-expertise)
