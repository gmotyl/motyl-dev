---
title: "Cloud Trade-offs, Data Ethics, and Surveillance Capitalism in Distributed Systems"
excerpt: "An excerpt from the second edition of Designing Data-Intensive Applications covers when cloud beats self-hosting, and why engineers must reckon with the societal weight of the systems they build."
publishedAt: "2026-05-06"
slug: "cloud-tradeoffs-data-ethics-distributed-systems"
hashtags: "#pragmaticengineer #backend #architecture #engineering #distributed-systems #ai #devops #generated #en"
source_pattern: "Pragmatic engineer"
---

## Designing Data-Intensive Applications: Cloud Trade-offs and Doing the Right Thing

**TLDR:** Martin Kleppmann and Chris Riccomini's second edition of "Designing Data-Intensive Applications" includes an excerpt on cloud versus self-hosting decisions and a final chapter on engineering ethics. The book arrives nine years after the first edition, updated for a world reshaped by cloud-native infrastructure and AI.

**Summary:** Let me tell you something that doesn't get said enough: the decision to use a cloud service is fundamentally a business decision dressed up as a technical one. Kleppmann and Riccomini lay this out plainly in the excerpt from Chapter 1 of the new edition. Build-versus-buy is a question about competitive advantage. Things that differentiate your business stay in-house; commodity work gets outsourced. Simple enough in theory, genuinely messy in practice.

The chapter walks through the full spectrum: bespoke in-house software on one end, full SaaS on the other, and a big fat middle ground of self-hosted open-source running on virtual machines. Cloud services, the authors argue, are best suited to variable workloads. If your load is predictable and your team already knows the software, buying your own hardware often wins on cost. That's a claim you won't hear from a cloud provider's sales deck, and I appreciate the authors saying it directly.

What really grabbed me is the section on cloud-native architecture. The shift from treating local disks as durable storage to treating them as ephemeral cache is not just an operational detail; it's a fundamental rethinking of where data lives and who is responsible for it. Object storage services like S3 separate the concern of data persistence from computation entirely. That disaggregation is the whole cloud-native thesis. And it comes with genuine trade-offs, particularly around latency and the sensitivity to network conditions when every I/O operation becomes a network call.

The book also covers multitenancy, the DevOps and SRE evolution, and how "capacity planning" in the cloud age becomes cost optimization rather than rack-and-stack decisions. All of that is solid foundational stuff, well articulated.

But the part I find most thought-provoking is the excerpt from Chapter 14, "Doing the Right Thing." The authors make a pointed argument: software engineers have been building the largest mass surveillance infrastructure in human history, and most of us are doing it while telling ourselves we're just improving recommendations. The thought experiment of replacing "data" with "surveillance" everywhere is genuinely uncomfortable. "Our surveillance warehouse." "Surveillance-driven organization." It lands differently.

The section on predictive analytics is where the ethical weight accumulates. Algorithmic decision-making in lending, hiring, insurance, and criminal justice encodes historical bias into permanent infrastructure. The authors do not shy away from this: if past data is discriminatory, the model trained on it will codify and amplify that discrimination. They call out the concept of "algorithmic prison" explicitly, the idea that someone systematically excluded by automated systems across jobs, housing, and financial services has effectively lost access to society with no clear appeals process.

What the authors don't fully grapple with, in my reading, is the organizational incentive problem. They describe what should happen: engineers should reason about ethics, apply frameworks like the ACM Code of Ethics, consider feedback loops and unintended consequences. But the question of why individual engineers, working inside product teams with quarterly targets, would or could exercise that kind of restraint is largely left unanswered. The ethical argument is made at the level of the individual engineer when the problem is fundamentally structural.

There's also an implicit optimism in the framing that better awareness leads to better outcomes. History suggests that's not the mechanism by which these things get fixed. Regulation and legal accountability, which the book does briefly mention in the context of GDPR, are what actually moves organizations. That said, the authors are writing a technical book, not a policy paper, and the fact that this chapter exists at all in a data systems book is something to appreciate.

**Key takeaways:**
- Cloud services win on variable workloads; predictable, high-volume workloads often favor self-hosting when you have the team expertise
- Cloud-native architecture disaggregates compute from storage, with object storage (S3-style) as the foundational primitive
- Predictive analytics systems trained on biased historical data will amplify that bias, and the people harmed often have no recourse
- Engineers have ethical responsibilities for the systems they build, but those responsibilities are rarely discussed or enforced in practice
- The "surveillance" framing of data collection is a useful lens for evaluating whether a system's data practices are genuinely benign

**Why do I care:** This matters because so much frontend and full-stack work today feeds data into the exact systems the book describes. Every analytics event, every behavioral signal, every conversion funnel feeds models making decisions about people. As architects we decide what gets collected, how long it's retained, and what gets passed downstream. The cloud trade-off analysis is directly applicable to any team evaluating managed services versus self-hosted infrastructure. And the ethics chapter is the kind of thing I wish every engineering onboarding included, not as a compliance checkbox but as an actual engineering design constraint.

**Link:** [Designing Data-Intensive Applications: The Cloud & Doing the Right Thing](https://newsletter.pragmaticengineer.com/p/designing-data-intensive-applications-book-excerpt?publication_id=458709&post_id=196562143&isFreemail=true&triedRedirect=true)
