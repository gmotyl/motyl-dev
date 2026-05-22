---
title: "AI Agents, Undefined Behavior, and Civic Hacking: HackerNoon's Best from May 21"
excerpt: "A roundup of the most thought-provoking stories from HackerNoon, covering AI's takeover of financial markets, the philosophy of undefined behavior in C, a civic hacking experiment that worked, and academia's uncomfortable reckoning with AI-assisted writing."
publishedAt: "2026-05-21"
slug: "ai-agents-undefined-behavior-civic-hacking-hackernoon-may-21-2026"
hashtags: "#hackernoon #webdev #ai #programming #machinelearning #generated #en"
source_pattern: "HackerNoon"
---

## The Death of the 2-Way Quote

**TLDR:** AI agents are moving so fast in establishing decentralized trading ecosystems that regulators will not know where to start. The traditional two-way quote — a buyer and seller agreeing on a price — is becoming a relic of a slower age.

Right now, the majority of trading volume is already machine-driven, with algorithms executing trades in microseconds. High-frequency systems arbitrage microscopic inefficiencies faster than human perception can register them. They see opportunities that no human could manually compute. Liquidity engines rebalance positions automatically across markets and asset classes, and the whole thing hums along without a human hand in the loop.

Benny Doda's argument is that independent AI agents are the next step in this progression. We are not talking about algorithms that follow predefined rules. We are talking about agents that negotiate, adapt, and form what amount to emergent coordination structures with other agents. The two-way quote — one entity offering, another accepting — assumes two parties with interests and the time to express them. Agents operating at this speed make that model look quaint.

What the article does not quite grapple with is the question of who gets hurt when this goes wrong. Flash crashes, liquidity evaporation, and cascading margin calls are not hypothetical. They have happened. The argument that regulators will be too slow to intervene is probably right, but "regulators can't keep up" is not the same as "this is fine." The author is a bit too breezy about the downside scenarios. The optimism about decentralized ecosystems also glosses over the fact that decentralization does not eliminate systemic risk — it just makes it harder to see where it came from.

**Key takeaways:**
- AI-driven trading already dominates volume; autonomous agents are the next phase, operating at speeds and coordination levels humans cannot match.
- The traditional two-way quote model breaks down when participants are agents that can negotiate and adapt in real time.
- Regulatory frameworks are not designed for emergent AI coordination, and that gap is widening fast.

**Why do I care:** If you build financial tooling, data pipelines, or anything that touches market infrastructure, the shift from rule-based algorithms to adaptive agents changes your assumptions about latency, correctness, and failure modes. The architecture of systems that interact with these agents will need to be fundamentally different — not just faster, but capable of reasoning about adversarial and unpredictable counterparties.

**Link:** [The Death of the 2-Way Quote](https://hackernoon.com/the-death-of-the-2-way-quote)

---

## Undefined Behavior: Ghosts in the Fog, or Boundaries of a Model?

**TLDR:** Undefined behavior in C is not a dark corner of the language — it is what happens when a program steps outside its computational model, and the compiler, as a perfect executor of that model, follows the math right off a cliff with you.

Arthur Lazdin, a C/C++ and compilers lecturer, takes on one of the most misunderstood concepts in systems programming. The common framing is that undefined behavior is a bug in the spec, or a nasty trick the compiler plays on you. Lazdin's reframing is sharper: UB is the formal acknowledgment that the C abstract machine has boundaries, and when you cross them, you are no longer running a C program. You are running something that looks like one.

This matters more than most people realize. Compilers like GCC and Clang use undefined behavior as a license for optimization. If you dereference a null pointer, the compiler is allowed to assume you never will — and optimize away the code path that would have caught it. Signed integer overflow is undefined, so the compiler assumes it never happens, and eliminates checks that depend on it. These are not bugs in the compiler. They are the logical consequence of a model that says "if you go here, all bets are off."

What the article opens up, but does not fully develop, is the philosophical question underneath: what does it mean for behavior to be "undefined" versus "implementation-defined"? The distinction matters enormously in practice. Implementation-defined behavior is something you can reason about if you know your platform. Undefined behavior is a contract violation that can manifest as anything — including code that appears to work until a compiler update changes the optimization assumptions. The missing piece here is a discussion of sanitizers and formal verification tools, which are the practical answer to this problem in 2026. Lazdin frames the problem well but stops short of telling you what to do about it.

**Key takeaways:**
- Undefined behavior is not a language defect — it is the formal boundary of the C abstract machine.
- Compilers use UB as proof that certain states cannot be reached, enabling optimizations that can silently break code in surprising ways.
- The distinction between undefined and implementation-defined behavior is critical for writing portable, safe systems code.

**Why do I care:** Anyone writing performance-sensitive code in C, C++, or even Rust (which has its own UB rules) needs to understand this at a deep level. More immediately relevant: if you are writing WebAssembly, calling into native modules, or working with FFI boundaries in JavaScript, you are interacting with systems where these rules apply. The mental model of "the compiler is not your friend, it is a formal system" is one that pays dividends across the stack.

**Link:** [Undefined Behavior: Ghosts in the Fog, or Boundaries of a Model?](https://hackernoon.com/undefined-behavior-ghosts-in-the-fog-or-boundaries-of-a-model)

---

## We Treated Potholes Like Software Bugs and Accidentally Built a Civic Hacking Playbook

**TLDR:** A group of people frustrated with potholes decided to treat civic problems the way engineers treat bugs — with tracking, visibility, and public accountability — and it worked in ways they did not expect, spreading as a replicable pattern.

Bogomil Shopov's story starts with a frustrating but familiar situation: a problem everyone sees, everyone complains about, and nobody fixes. Potholes. Drivers swerved around them. People complained. Nothing changed. The author and collaborators decided to stop waiting for the system to fix itself and instead apply software engineering thinking to the problem.

The core insight is about visibility and accountability, not technology. Software bugs get fixed because they are tracked, assigned, and publicly visible in a way that creates social pressure to resolve them. Potholes are not tracked that way. By creating a public, trackable record — essentially a bug tracker for road defects — the group changed the information structure around the problem. Suddenly, ignoring it had a cost that it did not have before.

What makes this more than a feel-good story is the "forking" concept Shopov invokes. The playbook they built was not tied to their specific city or their specific problem. It was a pattern that others could copy, adapt, and deploy in different contexts. That is genuinely interesting from a systems design perspective: the artifact was not the pothole fix, it was the replicable process.

What the article does not tackle directly is why this approach fails in most places it gets tried. Visibility and tracking are necessary but not sufficient. You also need someone with authority and motivation to act on the information. The framing of "we hacked the visibility layer instead of the asphalt" is clever, but it papers over the cases where better visibility just means more documented frustration. The playbook works when it intersects with political will or institutional incentives that were already there. It does not create that will from scratch.

**Key takeaways:**
- Treating civic problems like software bugs — trackable, assignable, publicly visible — can change the social dynamics around them.
- The most valuable output was a replicable playbook, not a one-off fix.
- Visibility is necessary but not sufficient; the approach works best when it amplifies existing institutional motivation to act.

**Why do I care:** The pattern here — changing behavior by changing information structure — is directly applicable to engineering organizations. Incident tracking, public postmortems, visible error budgets: these work for the same reason the pothole tracker worked. Making a problem visible and attributable changes the incentive structure around it. That is a design principle worth carrying into how you build systems and teams, not just civic infrastructure.

**Link:** [We Treated Potholes Like Software Bugs and Accidentally Built a Civic Hacking Playbook](https://hackernoon.com/we-treated-potholes-like-software-bugs-and-accidentally-built-a-civic-hacking-playbook)

---

## Where Should Academia Draw the Line on AI-Assisted Writing?

**TLDR:** arXiv is moving to suspend authors for up to a year if they submit papers largely generated by AI without meaningful human oversight, targeting hallucinated citations, fabricated references, and leftover AI prompts as evidence. Academia is trying to draw a line, but the line keeps moving.

The poll framing is simple, but the underlying question is not. AI has been adopted at wildly different rates across industries. Silicon Valley treats it as infrastructure. The film industry is in active revolt. Healthcare is cautious for reasons that are obvious once someone dies. Academia has been split since the beginning, and the arXiv enforcement announcement makes that split concrete in a way that a policy statement does not.

The interesting part is what arXiv chose as its evidentiary standard: incontrovertible evidence of careless AI use. Hallucinated citations. Fabricated references. Nonsensical passages. Leftover prompts. That is a much higher bar than "this was probably written by AI." It is targeting specific failure modes — the ones where AI use is detectable because the model got something demonstrably wrong or left traces. The policy is less "no AI" and more "if you use AI, clean up after it."

What this conversation consistently avoids is the harder question: what is academic writing actually for? If the purpose is to demonstrate that a human understood and reasoned through a problem, then AI-assisted writing that obscures that process undermines the point. If the purpose is to communicate research findings clearly, then the tool used to achieve clarity is less relevant. Most academic institutions are answering a question about integrity without first agreeing on a question about purpose.

The four poll options — judge by quality not AI use, reject AI entirely, allow only editing and formatting, or some other position — each assume a different answer to that underlying question. None of them are obviously wrong. What is missing from this conversation is a serious engagement with the fact that AI assistance exists on a spectrum that includes spell checkers, grammar tools, translation aids, and full text generation, and drawing a principled line anywhere on that spectrum requires an argument about what you are trying to protect.

**Key takeaways:**
- arXiv's enforcement targets specific evidence of careless AI use — hallucinated citations, fabricated references, leftover prompts — rather than AI use in general.
- The debate about AI in academia is fundamentally a debate about what academic writing is supposed to demonstrate.
- Drawing a principled line requires agreement on what integrity means in a world where AI assistance exists on a continuous spectrum.

**Why do I care:** This is not just an academic problem. Every engineering organization is navigating the same question about AI-assisted code, documentation, and design. The arXiv approach — focus on verifiable failure modes rather than trying to detect AI use categorically — is probably the right pragmatic answer for most contexts. What it does not solve is the deeper question of what you are trying to evaluate when you review a pull request or a design document written with substantial AI assistance.

**Link:** [Where Should Academia Draw the Line on AI-Assisted Writing?](https://hackernoon.com/polls/where-should-academia-draw-the-line-on-ai-assisted-writing)
