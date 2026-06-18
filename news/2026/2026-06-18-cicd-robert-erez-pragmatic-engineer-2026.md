---
title: "CI/CD in 2026: Roll Forward, Feature Flags, and the AI-Driven Deployment Shift"
excerpt: "A deep-dive conversation with Octopus Deploy's Robert Erez on modern CI/CD practices, GitOps tradeoffs, progressive delivery, and how AI is reshaping software deployment calculus."
publishedAt: "2026-06-18"
slug: "cicd-robert-erez-pragmatic-engineer-2026"
hashtags: "#pragmaticengineer #engineering #management #devops #cicd #kubernetes #gitops #featureflags #generated #en"
source_pattern: "Pragmatic engineer"
---

## CI/CD with Robert Erez

**TLDR:** Robert Erez, principal engineer at Octopus Deploy, joins Gergely Orosz to walk through the full sweep of modern CI/CD, from GitOps pitfalls and Kubernetes scale limits to feature flags and how AI agents are going to flip deployment priorities upside down.

**Summary:** This is one of those conversations where someone with real operational scars shares what actually works, and what the industry has gotten wrong. Rob and Gergely go way back, having worked together on the Skype web team, so there is a genuine candor here that you don't always get in polished podcast interviews. Rob is now a principal engineer at Octopus Deploy, which means he spends his days thinking about how organizations ship software safely, and he has opinions.

The most immediately practical insight is the "roll forward, never backwards" philosophy. When your system has a database, rolling back code often means your new code is now talking to an old schema. You've just swapped one broken state for a different broken state. Rob's framing is cleaner: a failure in version two is not a signal to retreat to version one, it's a signal to push version three with the fix in it. This sounds simple, but it requires that your deployment pipeline be fast and reliable enough that pushing another release is genuinely less painful than rolling back. That's a real infrastructure bet, and not every team has made it.

On GitOps, Rob makes a point that I find genuinely clarifying. None of the four pillars of GitOps, which are declarative, versioned and immutable, pulled rather than pushed, and continuously reconciled, actually require Git. Git happens to satisfy those constraints, but the industry has treated Git as definitionally central to the approach. The result is that teams cram things into Git repos that have no business being there, most obviously secrets. It is worth asking whether your team is doing GitOps because of the principles, or because someone told you to put everything in a repo.

The scale limitation of pull-based GitOps is something that rarely gets discussed in the tutorials. When you have thousands of independent Kubernetes clusters all pulling state from a single Git repository, that repository becomes a bottleneck. The clusters get throttled. Teams build workarounds. This is not a hypothetical future problem for some companies, it is a current operational reality. The pitch for GitOps often stops well short of this conversation.

Feature flags get a lot of attention in the episode, and Rob's gardening metaphor is exactly right. Flags are easy to add and satisfying to ship behind, but if you never remove them you end up with a codebase that has conditional branches for things that shipped two years ago. The cleanup is unglamorous work that nobody schedules, and over time it genuinely degrades your ability to reason about what the code does. Treating flag removal as a recurring maintenance task, the way you would treat dependency updates or test flakiness, is the discipline that separates teams that use feature flags well from teams that are buried by them.

The most forward-looking part of the conversation is about AI and CI/CD. Rob's observation is that the current obsession with build time optimization, shaving ten minutes off a pipeline to unblock a developer, will become much less important when AI agents are writing most of the code and can wait without losing context. The new priority will shift toward risk reduction, meaning more tests, slower tests where needed, and better safety nets before anything reaches production. That's a significant inversion. The question is not how fast we can ship, but how confident we can be in what we're shipping when the author of the change is a system we don't fully understand.

**Key takeaways:**
- Roll forward to a fix rather than rolling back to a previous version when stateful systems are involved, because schema drift makes rollbacks unreliable.
- GitOps principles don't require Git, and treating Git as mandatory leads to bad practices like storing secrets in repositories.
- Feature flag hygiene is as important as the flags themselves; treat cleanup as recurring maintenance, not optional debt.
- Pull-based GitOps has real scale limits that vendors underemphasize, and teams running large Kubernetes fleets will eventually hit them.
- AI agents will shift CI/CD priorities from build speed toward risk reduction, because agents don't lose context waiting for a slow pipeline.

**Why do I care:** From a frontend architecture perspective, the ephemeral environments point is the one I'd push hardest on my teams. Spinning up a full environment per feature branch sounds expensive until you compare it to the cost of three developers sharing one staging environment and scheduling around each other. The tooling is genuinely good now, and the feedback loop improvement is real. On the AI shift, I think Rob is right but slightly conservative in his timeline. If you're already using agents to write non-trivial code, the risk calculus has already changed, you just might not have updated your pipeline to reflect that yet.

**Link:** [CI/CD with Robert Erez](https://newsletter.pragmaticengineer.com/p/cicd-with-robert-erez?publication_id=458709&post_id=202192974&play_audio=true&triedRedirect=true)
