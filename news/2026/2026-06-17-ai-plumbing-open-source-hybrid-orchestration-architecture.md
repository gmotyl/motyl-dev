---
title: "AI Plumbing, Open Source Under Pressure, and the Hybrid Orchestration Architecture Worth Betting On"
excerpt: "Luca's Monday Ideas edition covers why AI shouldn't own your workflow skeleton, how AI is breaking open source review culture, and three sharp reads on what senior engineering actually means in the age of agents."
publishedAt: "2026-06-16"
slug: "ai-plumbing-open-source-hybrid-orchestration-architecture"
hashtags: "#refactoring #ai #opensource #softwareengineering #architecture #agenticai #generated #en"
source_pattern: "🌀 Refactoring"
---

## AI Plumbing: Why Agents Should Own the Messy Parts, Not the Skeleton

**TLDR:** The architecture pattern gaining traction for reliable AI workflows is hybrid: traditional orchestration owns the structure, scheduling, and failure recovery, while AI handles the parts that actually require judgment. Prototyping with a full-agent approach is fine; running recurring work that way is asking for trouble.

**Summary:** There's a tempting version of agentic AI where the agent owns everything. It understands the goal, decides the steps, calls the tools, handles the retries, and schedules the next run. That version looks great in a demo and works reasonably well when you're exploring a problem space. It falls apart when you need to debug why something failed three times last Tuesday at 2am and what state was left behind.

The distinction Luca draws is between the parts of a workflow that need to be dependable and the parts that need to be smart. Routing, retries, scheduling, validation: these are not problems that benefit from ambiguity or judgment. They're problems where you want deterministic behavior, good observability, and the ability to inspect inputs and outputs at every step. AI is genuinely not the right tool for this. Traditional orchestration, the kind that's been battle-tested in data engineering and workflow systems for decades, is better at exactly these things. AI belongs where ambiguity exists: classification, summarization, judgment calls, generating human-readable updates. Putting AI on the plumbing work doesn't make it smarter; it makes it harder to debug and less reliable.

The practical recommendation is to use agents to discover and prototype a workflow, then extract the stable pieces into code once the shape is known. This is genuinely good advice. The failure mode it prevents is the "autonomous agent loop" that breaks in novel ways each run, where you're never quite sure whether the tool calls happened, whether the state was updated, or whether the agent decided to do something creative that wasn't in the original plan. I keep coming back to the observability point: with traditional orchestration, you can see exactly what happened. With a full-agent approach, you're often reconstructing events from model outputs.

**Key takeaways:**
- Orchestration infrastructure should be traditional code: deterministic, observable, and inspectable at every step.
- AI should handle the genuinely ambiguous parts of a workflow where judgment, classification, or natural language processing add real value.
- Using an agent to prototype a workflow is valuable; running that same agent in production for recurring work without extracting the stable parts into code is a reliability risk.
- Observability is the practical argument: when a traditional orchestrated workflow fails, you can see exactly where. When an agentic workflow fails, reconstruction is much harder.

**Why do I care:** This architecture pattern matches what I've been converging on for any serious AI workflow work. The seductive thing about full-agent approaches is that they're fast to prototype and impressive to show. The problem reveals itself when you need to run something reliably every day and be able to explain what happened when it doesn't. Hybrid orchestration isn't a compromise, it's the right tool assignment.

**Link:** [AI plumbing, open source, and weekly readings!](https://refactoring.fm/p/ai-plumbing-open-source-and-weekly?publication_id=64099&post_id=201566545&isFreemail=true&triedRedirect=true)

---

## AI Is Breaking Open Source Review Culture

**TLDR:** AI tools make it cheap to generate contributions but don't reduce the review burden, which is creating a crisis for open source maintainers who are getting overrun, and Ladybird's decision to stop accepting public PRs is one of the first visible responses.

**Summary:** Ladybird, the independent browser project, has stopped accepting public pull requests and moved to maintainer-only code changes. The stated reason is that in the AI era, patch size is no longer a good proxy for effort or good faith. That's a measured way of describing a situation where maintainers are getting large volumes of AI-generated contributions that look superficially correct but require serious review effort to evaluate.

Chris Lattner's framing of this problem is the clearest I've seen: "With AI tools, what's happening is that a lot of maintainers are getting overrun. The contributor doesn't have to do nearly as much work, but the reviewer has to do the same, at a bigger scale." This is the asymmetry that breaks things. Open source has always had an asymmetric contribution model, but there was a natural governor on it: writing a contribution required enough effort that the volume was manageable. When that governor is removed, the review burden can grow without any corresponding increase in reviewer capacity.

The mentorship dimension is the part that usually gets skipped in these discussions. In healthy open source, patches were never just about the code; they were about trust building. A new contributor sends a small patch, gets feedback, learns the codebase, comes back with a better patch. Some of those contributors eventually become maintainers. That pipeline depends on maintainers having time to give real feedback to real people who are learning. If the review queue is dominated by AI-generated patches from people who just want code merged, the mentorship that produces future maintainers doesn't happen. Ladybird sees this clearly.

The intellectual property angle Luca mentions is interesting but underdeveloped. If AI agents can rewrite GPL code into MIT-licensed projects, licensing and copyright enforcement become much harder to reason about. That's a real problem that hasn't been resolved, but it's probably further out than the immediate review crisis.

**Key takeaways:**
- AI tools remove the effort governor on open source contributions without reducing the reviewer effort needed to evaluate each one, creating an unsustainable workload for maintainers.
- Ladybird's move to maintainer-only code changes is an early institutional response to the AI contribution problem, and more projects will likely follow.
- The mentorship pipeline that produces future open source maintainers depends on maintainers having time to engage with contributors, which the current dynamic actively prevents.
- Licensing and intellectual property in AI-assisted open source contributions remain unresolved and will likely require new legal and community frameworks.

**Why do I care:** This is going to get worse before frameworks emerge to address it. As a contributor and occasional maintainer, the problem is immediate and practical. The tools that make it easy to generate patches also make it easy to submit them without the context or commitment that made open source review sustainable. I don't think closing off contributions is the right long-term answer, but the communities that don't make any decision will just get overwhelmed until maintainers burn out.

**Link:** [AI plumbing, open source, and weekly readings!](https://refactoring.fm/p/ai-plumbing-open-source-and-weekly?publication_id=64099&post_id=201566545&isFreemail=true&triedRedirect=true)

---

## What AI Coding Gets Wrong About Senior Engineering

**TLDR:** Three short reads from this week's digest point at the same underlying truth: AI makes writing software cheaper but doesn't make knowing what "correct" means any cheaper, and that's where senior engineers still have an actual moat.

**Summary:** Three pieces from this week's readings converge on a point that deserves its own treatment. Aaron Brethorst's short piece makes it plainly: AI reduces the cost of producing code but not the cost of understanding a domain well enough to know what the code should do. The engineers who were always building a mental model of the problem, rather than just translating tickets into implementation, have the skill that matters. That part isn't cheaper.

Obie Fernandez's take is complementary: AI coding tools work best when you care about judgment, tradeoffs, and intent, and work worst when you care primarily about typing code. The reframe from "the machine writes code" to "the machine forces you to make senior thinking explicit" is worth sitting with. A good AI coding workflow actually requires more articulate problem specification than writing code yourself, because you can't rely on the implementation filling in gaps that you left in the requirements.

Andreas Kling's piece on Ladybird is the third thread, connecting the open source review crisis to the same underlying question. When patch size stops being a proxy for effort, project maintainers need new ways to evaluate contributions. The answer isn't a different metric; it's judgment. Which is exactly what AI can't provide and what experienced maintainers have.

**Key takeaways:**
- AI reduces the cost of code generation but not the cost of domain understanding or correctness reasoning.
- Senior engineering value is increasingly in problem specification, tradeoffs, and architectural judgment rather than implementation throughput.
- AI coding workflows that work well require more explicit articulation of requirements and intent, not less.

**Why do I care:** This is the argument I reach for when someone asks whether AI is going to replace senior engineers. The answer is that AI amplifies the work of people who already know what they're building and makes the work of people who were primarily converting specs to code more contestable. If your value was domain expertise and judgment, AI is mostly a productivity multiplier. If your value was writing code faster than the person next to you, the gap just closed significantly.

**Link:** [AI plumbing, open source, and weekly readings!](https://refactoring.fm/p/ai-plumbing-open-source-and-weekly?publication_id=64099&post_id=201566545&isFreemail=true&triedRedirect=true)
