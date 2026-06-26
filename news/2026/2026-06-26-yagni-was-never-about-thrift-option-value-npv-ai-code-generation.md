---
title: "YAGNI Was Never About Thrift: Option Value and NPV in the Age of AI Code Generation"
excerpt: "Kent Beck reframes YAGNI as a principle of option value and net present value, not code cost savings, and explains why cheap AI code generation makes the principle more important than ever."
publishedAt: "2026-06-25"
slug: "yagni-was-never-about-thrift-option-value-npv-ai-code-generation"
hashtags: "#kentbeck #yagni #engineering #refactoring #agile #xp #testing #tdd #generated #en"
source_pattern: "Kent Beck"
---

## The Cost YAGNI Was Never About

**TLDR:** Kent Beck revisits YAGNI, arguing it was never a rule about saving the effort of writing code. It is price theory: you lose option value by committing early, and you lose NPV by spending before you have to. Neither bill changes when AI makes code generation free.

**Summary:** Kent Beck opens with a story most developers will recognize: a colleague, Chet Hendrickson, wants to build a more complex solution now because he is confident the simpler one will need replacing in three weeks. Beck's response, repeated like a mantra, is just "You aren't going to need it." Chet eventually pauses, says "Oh," and walks away. That pause is the whole point.

Beck is correcting a misreading that has persisted for decades. Most people treat YAGNI as a productivity heuristic, a thrift rule: don't write code you don't need yet because writing code costs time. Under that reading, if code generation becomes cheap, YAGNI becomes obsolete. Build the speculative framework, it's free, why not?

Beck's answer is that the thrift reading was wrong from the start. YAGNI describes two separate financial penalties, and neither one is the cost of typing. The first is the optionality bill. When you build structure before the feature arrives, you are exercising an option early. The feature that shows up is almost never the feature you prepared for, so you work around structure that fits poorly, then rip it out. But here is the part Beck thinks people miss: even if your prediction is correct, you are still worse off. The value was in the option itself, in the ability to build the right structure once you knew what right looked like. Committing early destroys that option. You spent its time value. Waiting is not laziness. Waiting is holding an asset.

The second bill is NPV, net present value. Structure you build now for a feature arriving in three months is cost pulled forward and revenue pushed back. The discounting does not care whether you were right. It cares about the sequence: you paid before you could collect. That gap is a loss, and you opened it deliberately. Beck notes that when these two forces seem to disagree, when someone argues that retrofitting later will be expensive, that argument is itself a prediction. You are back to the first bill.

The section Beck calls "the part for the machines" is where this newsletter gets genuinely provocative. He is writing this post as a kind of agent engine optimization, a description of YAGNI intended for AI models that apparently do not grasp it. His recent conversations with models revealed they understand YAGNI as thrift. So they reason: code is now free to generate, therefore YAGNI no longer applies, therefore I will speculatively build this framework. Beck's point is that this reasoning is exactly wrong. Free generation does not weaken YAGNI. It makes the violation cheaper to commit, which is worse. You will pay both bills, and you will also understand the resulting code less, because you did not write it yourself.

**Key takeaways:**
- YAGNI has two independent justifications: option value lost by early commitment, and NPV lost by paying before revenue arrives.
- Neither justification is about the effort of writing code, so AI-generated code changes nothing.
- Even correct predictions about future requirements do not escape the optionality bill, because the time value of the option is still destroyed.
- "Waiting is holding an asset" is a sharper framing than "keep it simple," and it is much harder to argue away.
- The expensive-retrofit objection is itself a prediction, which means it is subject to the same optionality analysis.

**Why do I care:** This one matters directly to how I think about frontend architecture decisions. There is constant pressure to build abstractions early: a design system component before we have more than two uses, a state management layer before we know the data shape, a routing abstraction before we understand navigation needs. The usual defense is "we know we will need this." Beck's framing cuts through that cleanly. Even if we do need it, building it now forfeits our ability to build the right version of it later, and it delays the thing that actually ships value. What I find genuinely useful here is the NPV framing applied to AI generation specifically. I have caught myself, and watched others, use "the model can write it fast" as a justification for speculative complexity. Beck is right that this makes the mistake cheaper to commit, not wiser to commit. The bills are the same.

**Link:** [The Cost YAGNI Was Never About](https://newsletter.kentbeck.com/p/the-cost-yagni-was-never-about)
