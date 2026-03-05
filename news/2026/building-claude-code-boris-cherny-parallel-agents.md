---
title: "Building Claude Code: How Boris Cherny Ships 30 PRs a Day With Parallel Agents"
excerpt: "Boris Cherny, creator and Head of Claude Code at Anthropic, shares how he ships 20-30 PRs daily using parallel AI agents, why glob and grep beat RAG for code search, and what the rise of AI-assisted coding means for the future of software engineering."
publishedAt: 2026-03-04
slug: building-claude-code-boris-cherny-parallel-agents
hashtags: "#pragmaticengineer #claudecode #aicoding #agenticworkflows #typescript #devproductivity #generated #en"
---

## Building Claude Code: From Side Project to Core Tool at Anthropic

**TLDR:** Boris Cherny, the creator of Claude Code and former Principal Engineer at Meta, walks through how Claude Code evolved from an internal side project into a core engineering tool at Anthropic. He reveals his workflow of running five parallel Claude instances to ship 20-30 PRs a day, and explains why plain glob and grep beat every fancy RAG approach for agentic code search.

**Summary:**

There is something refreshing about hearing someone who builds AI coding tools talk honestly about how they actually use them. Boris Cherny does not sugarcoat things. His workflow is not some polished demo -- it is five terminal tabs, each with a separate checkout, starting Claude in plan mode and iterating until the plan is solid enough for a one-shot implementation. That is how you get to 20-30 PRs a day, and honestly, it raises the bar for what we should all expect from our tooling.

What struck me most about this conversation is the story of agentic search. The Claude Code team tried everything the industry considers state of the art: local vector databases, recursive model-based indexing, the works. All of it had problems -- stale indexes, permission complexity, overhead that just was not worth it. What actually won? Glob and grep, driven by the model itself. This was directly inspired by how engineers at Instagram actually searched code when Meta's internal IDE broke its click-to-definition feature. Sometimes the best engineering solution is the one that already exists, and the lesson here is to be suspicious of complexity when simplicity works.

Boris also shared a fascinating detail about automating code reviews at Meta. Every time he left the same type of review comment, he logged it in a spreadsheet. Once a pattern showed up three or four times, he wrote a lint rule to handle it automatically. This is the kind of systematic thinking that makes someone effective, with or without AI. The principle applies directly to how teams should think about AI-generated code: if you are seeing the same issues repeatedly, automate the detection, do not just throw more reviewer hours at it.

The conversation also covered Claude Cowork, which was built in roughly ten days and is reportedly growing faster than Claude Code did at launch. The engineering complexity was not about the product logic -- it was safety. Building classifiers, a shipping VM, OS-level protections against accidental file deletion, and rethinking the permission model for non-technical users. This is an important point that gets lost in the hype: the hard problems in AI tooling are not the AI itself, they are the trust and safety infrastructure around it.

One of the most provocative ideas Boris floated was the medieval scribe analogy. Scribes were a tiny literate elite who technically lost their jobs when the printing press arrived. But many became writers and authors, and the market for written work expanded beyond anything anyone could have predicted. Boris wonders if software engineers today might be in a similar position -- coding is becoming accessible to everyone, and the engineers who embrace this shift might end up building systems with far broader reach than ever before.

**Key takeaways:**
- Running parallel Claude Code instances across separate checkouts is how Boris achieves 20-30 PRs per day, with the critical insight being that a solid plan leads to one-shot implementation almost every time
- Simple glob and grep outperformed RAG, vector databases, and recursive model indexing for agentic code search -- complexity is not always the answer
- Code quality has a measurable, double-digit-percent impact on engineering productivity, and this applies equally to AI-generated code
- Claude Cowork's biggest engineering challenge was not product logic but safety infrastructure: classifiers, sandboxed VMs, and permission models for non-technical users
- PRDs are dead on the Claude Code team -- they build hundreds of working prototypes before shipping a feature

**Tradeoffs:**
- The parallel agent workflow trades deep-focus single-threaded coding for rapid context switching across multiple agents, which may favor generalists over specialists
- Choosing glob and grep over RAG sacrifices potential semantic understanding for reliability and simplicity, which works today but may not scale as codebases and queries grow more complex
- Building hundreds of prototypes instead of PRDs increases speed but could make it harder to maintain institutional knowledge and alignment across larger teams

**Link:** [Building Claude Code with Boris Cherny](https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny)

## Lessons From Meta: Code Quality and Engineering Culture

**TLDR:** Boris Cherny spent five years at Meta as a Principal Engineer, where he led causal analysis proving that clean codebases have a measurable impact on engineering productivity. His experience at Instagram -- where the Python/Django stack was so broken that click-to-definition did not work -- shaped his philosophy of fixing infrastructure before building products.

**Summary:**

Before joining Anthropic, Boris spent five years at Meta, and his experiences there deeply inform how he approaches building Claude Code. One of his most significant contributions was leading causal analysis that demonstrated code quality has a measurable, double-digit-percent impact on engineering productivity. This is not a vague "clean code is nice to have" argument -- it is backed by data. And the implication for AI-generated code is direct: partially-migrated codebases with multiple frameworks confuse both humans and models.

When Boris moved to Instagram, he found the Python and Django stack in such poor shape that basic developer tooling was non-functional. The type checker was broken. Click-to-definition did not work. Rather than push through and try to build product features on a crumbling foundation, he abandoned his original team assignment and went straight to Developer Infrastructure. He led migrations from Python to the Facebook monolith and from REST to GraphQL. This is a level of pragmatism that most engineers talk about but few actually execute on. The highest-leverage move is sometimes fixing the platform rather than shipping features, and it takes real conviction to make that call.

This infrastructure-first mentality is visible in how Claude Code was built. The tool does not try to paper over bad codebases -- it performs better when the codebase is clean and consistent. Boris's advice is blunt: "always make sure that when you start a migration, you finish the migration." Half-done migrations are the enemy of both human and AI productivity.

The engineering culture at Anthropic also came up in the conversation. Everyone at Anthropic has the same title: "Member of Technical Staff." There are no role-specific titles by design, and the default assumption is that everyone does everything -- product, design, infrastructure, research. This inverts the typical relationship between people. Whether this scales to a larger organization is an open question, but it clearly works for Anthropic's current size and velocity.

**Key takeaways:**
- Code quality measurably impacts engineering productivity by double-digit percentages, based on causal analysis Boris led at Meta
- Half-finished migrations are the enemy of both human and AI-assisted development -- always finish what you start
- Sometimes the highest-leverage move is abandoning your assigned project to fix broken infrastructure
- Flat title structures like "Member of Technical Staff" can remove assumptions and encourage cross-functional ownership
- The infrastructure lessons from Meta directly influenced Claude Code's design philosophy

**Link:** [Inside Meta's Engineering Culture](https://newsletter.pragmaticengineer.com/p/facebook)

## The Shifting Role of Engineers in the Age of AI Coding

**TLDR:** As coding becomes more accessible through AI tools, Boris argues that the role of engineers shifts rather than shrinks. He compares today's software engineers to medieval scribes who became writers after the printing press, and suggests that generalists who can context-switch rapidly across parallel agents will thrive.

**Summary:**

The most thought-provoking part of this conversation was not about Claude Code's architecture -- it was about what happens to engineers when the nature of their work fundamentally changes. Boris observed that his own work has shifted from deep-focus, single-threaded coding to managing multiple parallel agents and context-switching rapidly. He even half-joked that this might be the year of the generalist, and maybe the year of those with ADHD. There is more truth in that joke than he might realize.

The medieval scribe analogy deserves serious consideration. Scribes were the tiny literate elite employed by often-illiterate kings. When the printing press arrived, scribes technically lost their jobs. But many became writers, editors, and publishers, and the total market for written work expanded beyond anyone's imagination. Boris wonders if we are seeing the same pattern with software engineers: coding is becoming accessible to everyone, and the engineers who adapt might end up building systems of far broader reach than anything possible today.

But here is what the analogy misses, and it is worth being honest about this: the transition for scribes was not painless. It took decades, and many scribes did not successfully make the jump. The engineers who will thrive are those who understand systems thinking, can evaluate AI-generated output critically, and know when the machine is wrong. Writing code is becoming less important. Understanding what code should do, why, and whether it actually does it correctly -- that is where the human value lies.

Boris also made a practical observation about prototyping replacing PRDs. The Claude Code team builds hundreds of working prototypes before shipping a feature. They do not start with static mocks or Figma designs. This only works because the cost of building a prototype has dropped so dramatically. It is a genuine shift in how product development can work, but it also means that the ability to evaluate prototypes quickly and make good product judgment calls becomes more important than the ability to write the code itself.

**Key takeaways:**
- The engineer's role is shifting from writing code to orchestrating AI agents, evaluating output, and making product judgment calls
- The printing press analogy for AI coding is compelling but incomplete -- the transition will not be painless for everyone
- Rapid context-switching and managing parallel workstreams is becoming a core engineering skill
- Prototyping is replacing PRDs because the cost of building working software has dropped dramatically
- Systems thinking and critical evaluation of AI output are the skills that will differentiate engineers going forward

**Link:** [How Claude Code is built](https://newsletter.pragmaticengineer.com/p/how-claude-code-is-built)
