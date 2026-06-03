---
title: "Kent Beck and Randy Shoup on Making Things, Jevons Paradox, and AI's Effect on Distributed Systems"
excerpt: "A Tidy First conversation about the urge to build, why distributed systems veterans aren't panicking about AI, and what happens when cognition gets cheap."
publishedAt: "2026-06-03"
slug: "kent-beck-randy-shoup-create-anything-jevons-paradox-ai"
hashtags: "#kentbeck #ai #architecture #engineering #career #generated #en"
source_pattern: "Kent Beck"
---

## You Don't Get to Create Anything

**TLDR:** Kent Beck sits down with Randy Shoup, one of the people who helped write the original distributed systems playbook, to talk about the compulsion to build things and what cheap cognition does to software work. The hook is Jevons paradox: when something gets cheaper, we tend to use far more of it, not less. The framing suggests that AI making thinking cheap might expand the work rather than erase it.

**Summary:** The story opens with Randy Shoup's origin, and it is a good one. He was on track to become an international lawyer. He studied in West Berlin while the wall was still standing, did a year at Stanford Law, and landed what looked like the dream summer internship on Sand Hill Road, the venture capital row that bankrolls Silicon Valley. The catch was that he spent that summer watching inventors fill whiteboards with brilliant ideas while his actual job was to write those ideas down rather than make them. Something about that arrangement didn't sit right. He went back to Oracle that fall and never returned to law. The thread Kent pulls on here is the difference between being near creation and actually doing it. Some people can sit in the room and document. Others have to be the one holding the marker.

That personal angle sets up the bigger conversation, which is about AI and the work of building software. Randy is not some bystander reacting to the latest model release. He is one of the engineers who helped establish how large distributed systems are designed and operated, the kind of patterns that ran eBay and Google and a generation of scaled services. So when Kent notes that the people who wrote that original playbook aren't panicking about AI wiping it clean, that carries weight. The people closest to the foundations of how we build systems seem to be the calmest in the room. That is worth sitting with, because the loudest AI anxiety usually comes from further away from the actual engineering.

The intellectual core of the episode is Jevons paradox. It comes from nineteenth century economics, where William Stanley Jevons observed that more efficient coal use led to more coal consumption, not less, because efficiency made coal useful for more things. Apply that to cognition. If AI makes a certain kind of thinking cheap, the naive prediction is that we need fewer people doing that thinking. The Jevons reading says the opposite can happen. Cheap cognition gets applied to problems that were never worth the effort before, and total demand for thinking work goes up. I find this a more honest frame than either the doom narrative or the everything-is-fine narrative, because it doesn't promise the work stays the same. It says the work expands and shifts, which means your skills have to move with it.

There is something Kent and Randy circle that the framing doesn't fully resolve, and it's worth naming. Jevons paradox describes aggregate demand. It says nothing about who captures the value. More total cognition work does not guarantee that the same individuals keep their jobs at the same wages. A coal miner in 1865 might have been cold comfort to hear that coal consumption was rising while their specific labor got automated. The episode leans optimistic on the macro story, which is probably right, but the distribution question, who wins and who gets displaced, is the part that actually keeps engineers up at night, and the cheap cognition framing tends to glide past it.

The other thing left mostly implicit is what "the playbook won't be wiped clean" really rests on. Distributed systems veterans may be calm because the hard parts of their domain, consistency, partition tolerance, failure modes, are grounded in physics and math that no model rewrites. AI can generate the boilerplate around those constraints faster than ever, but the constraints themselves don't move. That is the actual reason for the calm, and it's a useful filter. Wherever your expertise rests on something AI can't relax, you're on solid ground. Wherever it rests on volume of typing, less so.

**Key takeaways:**

- The pull to build, rather than just describe what others build, is presented as a real personality split, and Randy Shoup's pivot from law to engineering is the case study.
- Jevons paradox is the central lens: making cognition cheap may grow total demand for thinking work instead of shrinking it.
- Engineers who wrote the foundational distributed systems patterns are notably calm about AI, which says something about where durable value sits.
- The framing is strong on aggregate demand but quiet on distribution, meaning it doesn't address who specifically benefits or gets displaced.
- Expertise grounded in hard constraints like consistency and failure handling survives AI better than expertise grounded in producing volume.

**Why do I care:** This lands squarely on the question every senior frontend developer and architect is sitting with right now, which is what AI actually does to the value of what we know. The Jevons framing is the most useful mental model I've heard for it, because it reframes the worry from "will there be work" to "what work moves to me when the cheap stuff gets cheaper." For architects specifically, the distributed systems angle is the practical signal: the parts of our craft tied to real constraints, system boundaries, data consistency, failure handling, hold their value, while the parts that were mostly typing get commoditized. My only caution is to not swallow the optimism whole. Jevons explains why total demand grows, not whether your particular role survives the transition, and pretending those are the same question is exactly the comfortable thing this conversation almost lets you do.

**Link:** [You Don't Get to Create Anything](https://tidyfirst.substack.com/p/you-dont-get-to-create-anything-6cb)
