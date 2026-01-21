---
title: "Taming the Genie: What Happens When You Ask AI to 'Code Like Kent Beck'"
excerpt: "Kent Beck experiments with prompting AI coding assistants to adopt his style, discovering that personas drive micro-behavior while explicit constraints drive architecture."
publishedAt: "2026-01-20"
slug: "taming-the-genie-code-like-kent-beck"
hashtags: "#substack #ai #agents #refactoring #testing #architecture #dx #prompt-engineering #generated #en"
---

## Taming the Genie: "Like Kent Beck"

**TLDR:** Kent Beck ran an experiment asking AI coding assistants to "code like Kent Beck" and found that persona prompts improve micro-behaviors (naming, testing style) while explicit architectural constraints are needed for macro-level design decisions. The combination of both produces the best results.

We're in the "horseless carriage" stage of AI coding assistants. Kent Beck makes this observation as a frame for why we keep understanding new technology through old mental models: horseless carriage before automobile, wireless telegraph before radio, electronic mail before messaging. You can't rush the transition—you have to live with the technology long enough to grok the second-order implications, the reinforcing and inhibiting loops it creates.

So what can you do while you wait? Use the technology. Lots. And that's exactly what Beck has been doing with augmented coding.

His first goal is to get the AI to code like him, but better. Someone suggested adding "like Kent Beck would" to their programming prompts, reporting improved behavior. Does it actually work? Beck decided to test this systematically, using the Rope data structure as a sample project—big enough to require interesting coding and design decisions, but small and contained enough to validate with straightforward tests.

The results are educational. The "Code like Kent Beck" prompt did improve code quality, but not in the way he expected. Variable names got better, and the testing strategy shifted from monolithic scripts to modular, isolated unit tests in a TDD style. But here's the surprise: the architecture didn't change. The AI implemented Rope as a standard binary tree, ignoring the Composite pattern that Beck himself would use.

This led to a refined experiment. Beck couldn't just say "be me"—he had to tell the AI what he would actually do. He added explicit constraints: "Use the Composite pattern. Break behavior into small, specialized classes." The design he expected emerged: separate classes for Substring and Concatenation, each simpler than the single class that unguided development produced. Actually, the AI produced a *simpler* design than Beck typically creates—figuring out it could just use Substring from 0..size instead of the Null Object pattern Beck usually employs. Nice catch!

But which intervention made the difference? To find out, Beck tested the full 2x2 matrix: Control (standard assistant), Kent Beck (persona only), Composite (architectural constraints only), and Combined (persona plus constraints).

The findings are crisp: **Personas drive micro-behavior**—the "Kent Beck" prompt reliably improved testing style and naming, making code "feel" better without changing structural decisions. **Constraints drive macro-architecture**—the "Composite Pattern" prompt forced the class hierarchy and produced finer-grained design even without the persona. **The combination wins**—giving the best of both worlds with the right architecture and the right development habits.

Beck's secret agenda, he reveals, is getting AI to do a better job balancing features and futures (code tidying). He's tried meticulous prompting, paying excruciating attention to proposed changes, smaller steps, larger steps—everything he could think of. But Rich Sutton's "Bitter Lesson" keeps proving true: leveraging computation gives better results than encoding human expertise.

The proposed solution is elegant: take large repos, have a million AIs implement the next feature with each choosing how and how much to tidy first, select the ones that succeed at the lowest cost, and repeat across many repos and features. We're "wasting" all that coding—but not really. Jessica Kerr calls this a "Design Contest."

For architects and team leads, this has immediate implications for how you prompt AI assistants. Don't rely on persona prompts alone for architectural decisions. Be explicit about patterns and structural constraints. The AI will adopt the "vibe" of good code from persona prompts but needs concrete guidance for high-level design choices.

**Key takeaways:**
- Persona prompts ("code like X") improve micro-behaviors: naming, testing style, code feel
- Explicit architectural constraints are needed for macro-level design decisions
- Combining persona and constraints produces the best results
- The "Bitter Lesson" applies: leveraging computation beats encoding expertise
- "Design Contests"—having many AIs try different approaches and selecting winners—may be the path forward

**Tradeoffs:**
- Detailed persona prompts improve style but increase prompt complexity and token usage
- Explicit constraints ensure architecture but require you to already know what you want
- Design contests leverage computation but waste resources on losing approaches

**Link:** [Taming the Genie: "Like Kent Beck"](https://tidyfirst.substack.com/p/taming-the-genie-like-kent-beck)

---

*This article was generated from Kent Beck's Tidy First Substack newsletter. While I've done my best to capture the essence of this piece, I encourage you to read the original article for the complete experimental methodology and code examples.*
