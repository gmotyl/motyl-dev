---
title: "Building a Mobile App Without Writing Code: Vibe Coding with Claude Opus 4.5"
excerpt: "A practical walkthrough of creating a React Native breathwork app using Claude Code and Anthropic's flagship model, plus analysis of what makes Opus 4.5 the current leader in AI coding."
publishedAt: "2026-01-08"
slug: "vibe-coding-mobile-app-claude-opus-45"
hashtags: "#substack #ai #claude #react-native #vibe-coding #anthropic #generated #en"
---

## Vibe Coding a Mobile App with Claude Opus 4.5

**TLDR:** Claude Opus 4.5 has emerged as the current leader in AI-assisted coding, and this hands-on tutorial demonstrates building a complete React Native breathwork app without writing a single line of code manually. The key insight is that while the model is slower than alternatives, its intelligence-speed tradeoff pays off in first-attempt accuracy.

**Summary:**

There is something genuinely fascinating happening in the AI coding space right now, and I want to walk you through a real-world example that demonstrates why this matters. Jeff Morhous, a senior software engineer who has become one of the more thoughtful voices on AI-augmented development, put together a comprehensive walkthrough of building a mobile app using Claude Code with the Opus 4.5 model. The results are instructive for anyone trying to understand where this technology actually stands versus the hype.

The app in question is a breathwork timer implementing the 4-7-8 breathing technique. Simple enough in concept: display a glowing circle on a dark screen, have the user tap to start, then guide them through a 4-second inhale where the circle grows, a 7-second hold with pulsing, and an 8-second exhale as it shrinks back down. Add haptic feedback and sound effects toggleable in settings. This is exactly the kind of small, self-contained project that either proves or disproves whether AI coding tools are ready for practical use.

The workflow starts by putting Claude Code into plan mode with SHIFT+TAB before providing a detailed prompt. This is a critical step that many people skip. Planning before implementation lets the model ask clarifying questions rather than making assumptions that lead to wasted iterations later. In this case, Claude asked about specific design preferences before generating any code. Once satisfied with the plan, enabling auto-accept edits lets the model work autonomously on a greenfield project. The author rightly notes this is not recommended for production codebases where version control and careful review matter.

The first attempt produced a working app with the exact design envisioned, though four bugs emerged: delayed text display, missing instructional copy on the start page, haptic feedback ignoring the disable setting, and non-functional sound effects. Each bug required iterative debugging, with the first one traced back to the original prompt specifying a countdown that introduced timing issues. One useful debugging technique mentioned is the "ultrathink" keyword, which triggers Claude Code to spend more time and tokens reasoning through complex issues.

What strikes me about this example is the honest assessment of tradeoffs. Opus 4.5 is slower than competing models. It is more expensive, so you hit usage limits faster. But the accuracy on first attempts and the depth of reasoning during debugging justify these costs for many use cases. The author concludes that small projects like this are now economically viable to build, not because AI writes perfect code, but because the iteration time from idea to working prototype has collapsed dramatically.

**Key takeaways:**
- Claude Code's plan mode with clarifying questions reduces wasted iterations compared to diving straight into code generation
- The speed-intelligence tradeoff with Opus 4.5 is real but worth it for complex autonomous tasks
- React Native and Expo are good framework choices because Claude has strong training data for them
- Auto-accept edits is fine for greenfield projects but risky for production codebases
- The "ultrathink" keyword can help with stubborn bugs by allocating more reasoning tokens
- Even successful first attempts typically have 3-5 bugs that require iterative fixing

**Link:** [Vibe coding a mobile app with Claude Opus 4.5](https://www.ai-supremacy.com/p/vibe-coding-a-mobile-app-with-claude-opus-4-5)

---

## Claude Opus 4.5: Technical Capabilities and Market Positioning

**TLDR:** Anthropic's flagship model leads SWE-bench and OSWorld benchmarks, introducing hierarchical attention for 500K+ token contexts and self-correcting execution loops. Pricing dropped to one-third of Opus 4.1 while adding hybrid reasoning modes.

**Summary:**

The newsletter opens with a market analysis of where Claude Opus 4.5 sits in the competitive landscape, and there are some claims here worth examining critically. The assertion that Opus 4.5 is state-of-the-art for coding is backed by benchmark leadership on SWE-bench and OSWorld. These are legitimate measures of coding ability. The claim that Anthropic will see revenue growth in 2026 that is "hard to fathom" is speculation, though reasonable given enterprise adoption trends.

The technical improvements mentioned include a hierarchical attention mechanism for tracking dependencies across 500K+ token contexts, self-correcting execution loops with sandboxed code execution during generation, and significantly expanded training on post-2023 open-source code in TypeScript, Python, and Go. The tool-use reliability is described as near-perfect for linters, type checkers, and test runners via function calling. These capabilities are important for agent workflows where the model needs to run tests, interpret failures, and fix code autonomously.

Pricing has been restructured at five dollars for input and twenty-five dollars for output per million tokens, which is one-third the cost of the previous Opus 4.1 model. This is significant because cost was previously a barrier to using frontier models for extended coding sessions. The 200K context window supports handling large codebases without losing coherence, though the newsletter notes that usage limits have appeared as adoption grows.

There is fair criticism here too. The CEO's claim that AI would write ninety percent of code within months is called out as misleading hype that did not align with reality. This kind of honest acknowledgment that leaders of AI companies sometimes overstate capabilities is refreshing. The prediction that Anthropic could go public at a valuation close to five hundred billion dollars seems optimistic even for a bullish analysis, but the author notes Google holds fifteen percent equity and Amazon between fifteen and twenty percent, which does suggest these companies see significant value.

What the analysis somewhat avoids is the question of what happens when the low-hanging fruit of coding automation is picked. Right now, AI coding tools shine on greenfield projects and well-scoped tasks. The harder question is how they perform on legacy codebases with decades of accumulated complexity, undocumented business logic, and technical debt. Benchmarks do not capture this, and neither does building a breathwork app from scratch.

**Key takeaways:**
- SWE-bench and OSWorld leadership supports claims of coding supremacy among current models
- Hierarchical attention for 500K+ token contexts enables working with large codebases
- Self-correcting execution loops allow autonomous debugging during code generation
- Pricing at one-third of predecessor makes frontier models more accessible for development work
- Usage limits are emerging as a pain point as adoption increases
- Leadership claims about AI writing ninety percent of code have not materialized

**Tradeoffs:**
- Opus 4.5 trades speed for intelligence, making it slower than competitors but more accurate on complex tasks
- The model requires paid accounts starting at twenty dollars monthly, with power users needing hundred-dollar tiers for adequate limits
- Extended thinking mode adds latency but improves problem-solving for difficult bugs

**Link:** [Claude Opus 4.5 on Anthropic](https://www.anthropic.com/claude/opus)

---

## The Economics of Small App Development in the AI Era

**TLDR:** The collapse of time-to-prototype for small applications changes what is economically viable to build, but the author's framing avoids discussing what happens when everyone can build apps this easily.

**Summary:**

The concluding section of the newsletter touches on a genuinely important point that deserves more attention than it receives. The author states that their favorite thing about the last year of AI is how easy it now is to tinker on small projects, and that you can make apps with little time and effort, making even small apps economically viable.

This is true as far as it goes. A breathwork app that might have taken a weekend to build can now be completed in hours. The gap between having an idea and having a working prototype has narrowed dramatically. For individual developers and small teams, this is transformative. Side projects that would never have justified the time investment can now be explored.

But there is an uncomfortable question being sidestepped here. If building apps becomes trivially easy, what happens to the economics of selling those apps? App stores are already flooded with millions of applications. If the barrier to entry drops further, competition intensifies. The breathwork app built in this tutorial competes against existing apps that "try to do too much and paywall everything." But it also competes against every other person who reads this newsletter and decides to build their own breathwork app in an afternoon.

The author maintains that software engineering is not going away, and that the profession is certainly changing. This seems right. The skills that matter are shifting from writing boilerplate code to understanding systems, debugging edge cases, and making architectural decisions that AI models do not yet handle well. The tutorial itself demonstrates this: four bugs in the first attempt required human judgment to identify and prioritize fixing.

What is missing from this analysis is any consideration of the intermediate zone. Not everyone will become a software engineer, but many people who would previously have hired developers may now build adequate solutions themselves. The impact on freelance developers and agencies that handle small projects could be significant. The newsletter is enthusiastic about democratization without examining who might be displaced in the process.

**Key takeaways:**
- Time-to-prototype collapse makes small projects economically viable that previously were not
- Competition in app markets intensifies when barrier to entry drops
- Human judgment remains essential for debugging and architectural decisions
- The intermediate zone of freelance development for small projects faces disruption
- Skills are shifting from code production to system understanding and edge case handling

**Link:** [The AI-Augmented Engineer Newsletter](https://theaiaugmentedengineer.substack.com/)
