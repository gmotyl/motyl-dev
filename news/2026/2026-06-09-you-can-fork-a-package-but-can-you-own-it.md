---
title: "You Can Fork a Package, But Can You Own It?"
excerpt: "Oskar Dudycz unpacks Mitchell Hashimoto's \"fork your dependencies\" philosophy and argues that the real problem isn't updating — it's the absence of intentional decision-making when we install software."
publishedAt: "2026-06-09"
slug: "you-can-fork-a-package-but-can-you-own-it"
hashtags: "#OskarDudycz #architecture #open-source #security #generated #en"
source_pattern: "OskarDudycz"
---

## You Can Fork a Package, But Can You Own It?

**TLDR:** Mitchell Hashimoto's advice to fork your dependencies and never update unless something breaks is compelling but breaks down the moment your dependency is too large to realistically maintain. Oskar Dudycz argues that the real issue isn't updating strategy — it's that most teams install dependencies without ever consciously deciding to take them on. That gap between reaching and deciding is where supply chain attacks live.

**Summary:** I found myself nodding along to Mitchell Hashimoto's position almost immediately. He's been saying for over a decade that updating dependencies is riskier than sitting with known latent bugs, that you should only update when you can point to a specific commit you actually need, and that forking small libraries and trimming them to your use case is perfectly reasonable. And honestly, most of that is solid. I've forked a small utility library before. It's fine. You know exactly what you have.

The problem Oskar spots — and I think he's right — is that the advice quietly falls apart at scale. Could you fork React? Could your team fork webpack or Babel and maintain it long-term? I couldn't, and I've been doing this a while. So "fork your dependencies" is advice that only applies to a specific slice of your dependency tree, and most people who repeat it don't have that caveat attached. When the framing generalizes, it gives people permission to feel like they've solved something when they've mostly just renamed the problem.

What Oskar is really getting at is ownership. Not forking as a tactic, but the question of whether you actually understand what you've taken on. And he draws a distinction I think is worth sitting with: there's a difference between deciding to take a dependency and just installing one. We do the second one constantly. Someone is in a hurry, they reach for a package, and from that moment forward the package is in their graph indefinitely. There's no policy, no exit condition, no understanding of what it does internally. And that's where supply chain attacks find their opening — not in the big, well-watched packages, but in the little unattended ones nobody thinks about.

The Left-pad incident is still the canonical example, and it's still the right one. A tiny, trivial utility with no active oversight gets pulled from npm and breaks thousands of builds. The package wasn't dangerous because it was complicated — it was dangerous because it was invisible. Nobody was watching it because nobody thought there was anything to watch. That's the pattern that keeps repeating: small, low-level helpers, trusted simply because they're old and quiet.

Oskar makes a personal call here that I respect: for small things, he writes his own code. During a live Q&A about his TypeScript work, people kept asking why he implemented his own deepEquals instead of pulling a package. His answer was that it's the kind of thing you write once and then forget about — and it's also the exact category of thing that gets exploited. I think his reception was mixed because that kind of intentionality reads as contrarian in a culture where installing a package is the default. But there's something real in it. Twenty lines you wrote and understand are twenty lines you own.

**Key takeaways:**
- Forking dependencies is only practical advice for small, bounded libraries — for larger dependencies it becomes unfeasible and the advice needs a hard asterisk
- Most dependency-related security incidents trace back to packages that were installed without a conscious decision, policy, or plan for ongoing review
- Intentionality is the actual mitigation: read the code before you depend on it, set a policy for when you'll update, and for small utilities consider writing it yourself

**Why do I care:** As someone thinking about frontend architecture, this hits close. The JavaScript ecosystem in particular has a culture of reaching — for small utilities, for wrappers, for one-liners that save five minutes and then live in your package.json for five years. I've watched teams accumulate hundreds of direct dependencies without a single written policy about how they manage them. This piece doesn't give you a checklist, but it gives you a better question to ask before the next install: am I making a decision here, or just reaching?

**Link:** [You can fork a package, but can you own it?](https://www.architecture-weekly.com/p/you-can-fork-a-package-but-can-you)
