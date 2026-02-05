---
title: "When AI Ships Code and Incentives Backfire: Lessons in Systems Thinking"
excerpt: "From vibe engineering workflows to perverse incentives, this roundup explores the evolving landscape of AI-assisted development and product discovery."
publishedAt: "2026-02-04"
slug: "ai-ships-code-incentives-backfire-systems-thinking"
hashtags: "#unicorn-club #ai #ux #product-discovery #architecture #testing #generated #en"
---

## If You're Struggling to Write the Content, You Probably Have an Interaction Problem

**TLDR:** When content design feels impossible, the real issue is usually a flawed interaction design. Simplifying the user journey often makes the content write itself.

Adam Silver shares a fascinating case study from a LinkedIn UX challenge about labeling delivery options. The challenge seemed simple: what label works best for choosing between "delivery" and "collection"? But here is where it gets interesting. When you select "delivery," the next screen shows three radio buttons for standard, next day, and evening delivery. Those also need a group label, and you cannot use the same one twice.

Silver went through multiple iterations. "Delivery method" seemed clearest but creates confusion when it appears on two consecutive screens. "How would you like to receive your order?" is clearer but wordy. "Delivery option" versus "delivery method" feels like semantic gymnastics since both words mean the same thing.

The winning solution came from Joyce, a self-proclaimed non-designer. Her insight was brilliantly simple: why not combine all delivery choices plus pickup into a single screen? Standard delivery, next day delivery, evening delivery, and pickup at store. One question, one screen, problem solved.

This is the kind of insight that separates mediocre design from great design. Silver was so focused on finding the perfect label that he missed the opportunity to eliminate the need for two questions entirely. The lesson here extends far beyond form design. When you are wrestling with copy, step back and ask whether the interaction itself is unnecessarily complex. Sometimes the best content strategy is removing the need for content altogether.

What is missing from this analysis? The article does not address edge cases where simplification might backfire. What if there are twelve delivery options? What if collection requires additional information like which store location? The principle is sound, but real-world complexity often resists elegant simplification.

**Key takeaways:**
- Content struggles often signal interaction design problems
- Fresh perspectives from non-designers can reveal blind spots
- The best solution sometimes eliminates the question entirely
- Collaboration and external feedback accelerate problem-solving

**Link:** [If you're struggling to write the content, you probably have an interaction problem](https://adamsilver.io/blog/if-youre-struggling-to-write-the-content-you-probably-have-an-interaction-problem/)

---

## What the Vibe Engineering Workflow Tells Us About the Future of UX Roles

**TLDR:** AI coding agents work best on small, well-defined tasks with tight feedback loops. This means the bottleneck shifts from implementation to defining what to build, making UX skills more valuable than ever.

Phil Morton offers a practitioner's perspective on vibe engineering after six weeks of building a real web application with Claude Code. His central thesis: the gravitational pull of AI's impact on software engineering will reshape how UX professionals work more than any other factor.

The constraints of current AI coding agents define the workflow. They have no long-term memory, limited short-term memory that fills up fast when reading files and documentation, and they work best on tightly constrained tasks. This is why the flashy demos of "one prompt to build an app" are misleading. Production software requires disciplined, incremental work.

Morton's workflow breaks into four phases: breakdown, planning, coding, and reviewing. The breakdown phase is critical. One feature for email forwarding in his project generated over forty sub-issues on GitHub. Before any code gets written, you need extensive planning. Morton emphasizes never trusting the initial plan and always pushing back on assumptions. For complex features, an entire context window might be spent purely on planning.

The actual coding happens relatively quickly once planning is solid. But then comes mandatory review. Morton created a slash command that prompts Claude to check its work across security, scalability, and engineering best practices. Hour by hour, this feels slow. Week by week, it feels like ten times normal velocity.

Here is the critical insight for UX professionals: the bottleneck is now what to build, not how to build it. AI agents can only move as fast as humans can provide direction. Well-planned work flies by, but figuring out how something should work still requires slowing down and thinking deeply. This means teams might need more UX capacity to keep engineering velocity high.

What Morton does not fully address: the economic implications. If one person with AI can do the work of a team, will companies hire more UX people or simply expect existing UX people to support more AI-assisted engineers? The optimistic scenario where UX becomes more valuable assumes companies will invest in quality rather than speed.

**Key takeaways:**
- AI coding agents require breaking work into small, well-defined tasks
- Never trust the initial plan; always challenge AI assumptions
- The coding phase is the fastest part; planning and review take more time
- UX skills become more valuable when implementation is no longer the bottleneck
- Handoffs to AI require more detailed written specifications than human developers

**Link:** [What the vibe engineering workflow tells us about the future of UX roles](https://www.philmorton.co/what-the-vibe-engineering-workflow-tells-us-about-the-future-of-ux-roles/)

---

## The Creator of Clawd: "I Ship Code I Don't Read"

**TLDR:** Peter Steinberger runs five to ten AI agents simultaneously, views pull requests as "prompt requests," and argues that software engineering is not dead but transformed into architecture and systems design.

This interview with Peter Steinberger, creator of OpenClaw (formerly Clawd) and founder of PSPDFKit, provides a window into extreme AI-assisted development. In January alone, Steinberger made over sixty-six hundred commits. As he puts it, from the commits it might appear like a company, but it is one person at home having fun.

OpenClaw has become the fastest-growing repository on GitHub by stars, outpacing even Tailwind CSS. It gets more Google searches than Claude Code or Codex combined. The project shows what the future of voice assistants like Siri could look like.

Steinberger's workflow is radically different from traditional development. He runs five to ten agents simultaneously, staying in a flow state by queuing up multiple features at once. He spends considerable time planning with an agent before kicking off work, challenging assumptions and pushing back until the plan is solid. Then he moves on while the agent executes.

Perhaps the most provocative claim: pull requests are dead, replaced by "prompt requests." Steinberger cares more about the prompts that generated code than the code itself. Code reviews have been replaced by architecture discussions. His team only talks about architecture and big decisions, never code.

He runs tests locally through his agents rather than waiting for remote CI pipelines. Most code, he argues, is boring data transformation that does not warrant obsessive attention. The energy should go to system design instead.

But here is what the article reveals without explicitly stating: Steinberger is essentially a software architect who keeps the high-level structure in his head and cares deeply about architecture, tech debt, extensibility, and modularity. OpenClaw succeeds because it is so extensible, and Steinberger acts as the benevolent dictator ensuring consistent direction and style.

The uncomfortable truth the article dances around: this workflow works for experimental projects where moving fast and breaking things is acceptable. It is unclear how well it scales to systems where reliability matters more than velocity, or where multiple humans need to collaborate on architectural decisions.

**Key takeaways:**
- Managing human teams teaches the letting-go-of-perfectionism skill needed for AI agents
- Close the loop: AI agents must verify their own work through compilation, linting, and tests
- Engineers who love shipping products thrive with AI; puzzle-solvers struggle
- Under-prompting intentionally can discover unexpected solutions
- Software engineering evolves into architecture and systems design, not disappears

**Tradeoffs:** This approach works for experimental, fast-moving projects but may not translate to regulated industries or systems requiring high reliability.

**Link:** [The creator of Clawd: "I ship code I don't read"](https://newsletter.pragmaticengineer.com/p/the-creator-of-clawd-i-ship-code)

---

## How Product Discovery Changes with AI

**TLDR:** Three of four product risks (feasibility, viability, usability) become dramatically cheaper to address with AI. Desirability remains unchanged and becomes the key differentiator.

This piece from Proof of Concept reexamines product discovery through the lens of AI capabilities. The traditional framework addresses four risks: desirability (do customers want it), viability (does it work for the business), feasibility (can we build it), and usability (can customers use it).

AI transforms three of these dramatically. Feasibility is dramatically reduced since features that took two sprints can now be prototyped in an afternoon. Viability becomes easier to test because you can deploy working prototypes to production cheaply and get real market signals. Usability improves through faster iteration with multiple UI variations generated and tested quickly.

But desirability remains unchanged. No synthetic personas or simulated user research replaces watching a real person struggle with your product or hearing them describe unexpected problems. When three of four risks become cheaper, the remaining one becomes the differentiator.

The practical workflow has evolved interestingly. The author still starts with pen and paper but no longer puts paper sketches in front of users. Instead, sketches happen at various code fidelities. A low-fidelity code sketch might be a simple HTML page with hardcoded data. A high-fidelity sketch connects to real APIs and handles edge cases.

The Tapestry project illustrates this new approach. Built as a Replit app and deployed to production in a few hours, it started as a traditional CRM with AI capabilities. Real users in a production environment provided feedback with real data and usage patterns. Based on insights, the project pivoted to become an MCP server letting people use their preferred LLM for relationship management.

Important distinction the author makes: production does not mean launched. It can remain a closed beta. Production is simply a better testing environment than staging. In AI-era product discovery, you can pivot dozens of times before launch rather than after.

What is the article avoiding? The assumption that everyone can code, even with AI assistance. The workflow described still requires technical fluency that many product people lack. The gap between sketching ideas and deploying functional prototypes remains significant for non-technical practitioners.

**Key takeaways:**
- Feasibility, viability, and usability risks compress dramatically with AI
- Desirability (customer insight) becomes the primary differentiator
- Production environments provide better testing than staging
- Code sketches at various fidelities replace paper prototypes
- Spend the majority of time understanding desirability through human conversations

**Link:** [How Product Discovery changes with AI](https://www.proofofconcept.pub/p/how-product-discovery-changes-with)

---

## The Cobra Effect: When Good Incentives Go Bad

**TLDR:** Perverse incentives emerge when metrics become targets. Second-order thinking helps predict how people will game systems before implementing incentive structures.

This piece explores a fascinating and underappreciated phenomenon: well-intentioned incentives that produce the opposite of their intended effect. The name comes from a likely apocryphal story about British India offering bounties for cobra kills, which led to cobra farming.

The Hanoi rat tale is better documented. French colonists paid for rat tails to reduce the population. Initially it worked, but then officials noticed rats running around without tails. People had figured out they could cut off tails and release rats back into sewers to breed. Tails were paying bonuses. When the program was cancelled, the rat population was higher than when they started.

Modern examples abound. Enron executives rewarded on reported profits created complex financial instruments to inflate results. Wells Fargo employees rewarded for new accounts opened millions of fake ones using customer data. The pattern is consistent: when a measure becomes a target, it ceases to be a good measure, as Goodhart's law states.

The author shares a personal example that hits close to home for anyone managing engineering teams. Facing a recruitment shortage, he offered gift cards for the most active recruiters. It seemed to work until engineers already busy with critical projects started spending hours on recruitment to win gift cards. A rushed incentive system worked short-term but created new problems.

The solution involves second-order thinking before implementing incentives. First-order consequence: more people helping recruitment. Second-order consequence: engineers sacrificing projects for gift cards. Third-order: too many people helping recruitment, nobody focused on products.

The key mental shift is perceiving situations as systems rather than disconnected events operating in a vacuum. Before implementing any incentive, run a thought experiment: if people optimize solely for this metric, what will they sacrifice and what happens next?

What the article correctly identifies but could explore deeper: we cannot predict all the ways people will game incentives because they are smarter than our metrics. The Hanoi officials could not predict rat farming. The author could not predict engineers abandoning projects. Humility about our predictive abilities should inform how we design feedback loops and exit criteria for incentive programs.

**Key takeaways:**
- Perverse incentives emerge from well-intentioned systems when metrics become gaming targets
- Second-order thinking helps anticipate unintended consequences
- People find the path of least resistance to win the game we create
- Design incentives as systems, not isolated interventions
- Build in monitoring and exit criteria for when incentives backfire

**Link:** [The Cobra Effect: When Good Incentives Go Bad](https://read.perspectiveship.com/p/the-cobra-effect)