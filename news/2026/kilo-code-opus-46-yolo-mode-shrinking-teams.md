---
title: "Kilo Code Weekly: Opus 4.6, YOLO Mode, and Why Your Team Might Be Too Big"
excerpt: "Kilo Code ships Opus 4.6 with adaptive thinking, introduces YOLO mode for autonomous agents, and argues that AI is shrinking engineering teams from two-pizza to one-pizza size."
publishedAt: "2026-02-12"
slug: "kilo-code-opus-46-yolo-mode-shrinking-teams"
hashtags: "#kilo-code #opus-4-6 #adaptive-thinking #ai-coding #vscode #slack #code-review #agentic-engineering #team-productivity #open-source #generated #en"
---

## Opus 4.6 Lands in Kilo Code with Adaptive Thinking

**TLDR:** Anthropic's latest flagship model, Opus 4.6, dynamically scales its reasoning depth based on question complexity. Kilo Code is shipping it across VS Code and Slack integrations at no additional cost to users.

**Summary:**

Here is something genuinely interesting: Anthropic has released Opus 4.6, and its headline feature is what they call "adaptive thinking." Instead of applying the same level of computational effort to every prompt, the model dynamically calibrates how hard it thinks. Simple questions get fast answers. Complex, multi-step problems trigger deeper reasoning chains. This is the kind of architectural choice that sounds obvious in retrospect but is actually a meaningful step forward for practical usability.

Kilo Code is making this available immediately in both their VS Code extension and their Slack integration, and they are not charging extra for it. That last part matters. The AI tooling market has been a mess of per-token pricing and premium model paywalls, so offering the most capable model at no markup is a competitive statement worth paying attention to.

What I find worth scrutinizing, though, is the claim that adaptive thinking will always get the calibration right. Any system that decides on your behalf how hard to think about something will occasionally misjudge. The question is whether the default behavior is conservative enough that it errs on the side of deeper reasoning when uncertain, or whether it optimizes for speed and occasionally gives you a shallow answer when you needed depth. We do not know yet, and Kilo is not saying.

The Slack integration is notable because it puts Opus 4.6 where most teams already spend their day. You do not have to switch contexts into a coding IDE to get access to the most capable model. For teams that use Slack as their nervous system, this removes a real friction point.

**Key takeaways:**
- Opus 4.6 uses adaptive thinking to scale reasoning depth dynamically
- Available in Kilo's VS Code extension and Slack integration at no extra cost
- The auto-calibration of reasoning depth is powerful but its failure modes are still unclear
- Putting top-tier AI models directly into Slack is a smart distribution play

**Link:** [Try Opus 4.6 in Kilo Code](https://kilo.ai)

## VS Code Extension Gets YOLO Mode and Quality-of-Life Upgrades

**TLDR:** Kilo's VS Code extension now includes a "YOLO mode" for auto-approving tool operations, batch task deletion, image persistence through edits, and React Compiler-powered UI improvements.

**Summary:**

The VS Code extension update is a mixed bag of genuinely useful features and one that deserves a raised eyebrow. Let us start with the eyebrow: YOLO mode. This feature auto-approves tool operations before sessions start, with visual indicators showing when autonomous agents are running. The name tells you everything about the design philosophy here -- move fast, skip the confirmation dialogs, let the agent do its thing.

On one hand, this is exactly what power users have been begging for. If you trust the AI agent, the constant "are you sure?" dialogs are just friction. On the other hand, automatically approving tool operations in a coding environment is the kind of thing that works great until it does not. There is a reason those confirmation dialogs existed. The feature includes visual indicators so you know when agents are operating autonomously, which is the minimum viable safety measure but probably not sufficient for production codebases.

The batch delete feature for task history is straightforward quality-of-life work. You can now select multiple tasks with checkboxes and clean them up in one go. Attached images persisting through message edits fixes a legitimate bug that was probably annoying people. And the React Compiler integration for UI responsiveness is a behind-the-scenes improvement that you will feel but not see.

What is missing from this update is any mention of guardrails for YOLO mode. Can you scope it? Can you whitelist certain operations while blocking others? The newsletter does not say, and that gap is worth noting.

**Key takeaways:**
- YOLO mode removes confirmation dialogs for autonomous agent operations
- Batch delete lets you clean up task history with checkbox selection
- Image persistence through message edits fixes a real usability gap
- React Compiler integration improves UI responsiveness under the hood
- No mention of granular controls or guardrails for YOLO mode

**Link:** [Kilo Code VS Code Extension](https://kilo.ai)

## Code Reviewer Gets a Faster Review Scope Dialog

**TLDR:** Kilo's Code Reviewer now shows a loading spinner immediately when computing review scope, improving perceived performance for repositories with many changes.

**Summary:**

This is a small but telling update. The Code Reviewer's scope dialog -- where you choose what parts of your codebase to review -- now shows a loading spinner immediately rather than appearing to freeze while it computes scope information. For large repositories with many changes, this was apparently a noticeable UX problem.

It is a perceived performance improvement, not an actual performance improvement, and I want to be clear about that distinction. The computation takes the same amount of time. You just get visual feedback that something is happening. But in user experience, perceived performance matters enormously. A spinner that says "I am working on it" is dramatically better than a dialog that appears broken.

The broader Kilo Code Reviewer product is an AI-powered review tool that supports GitHub and GitLab, lets you choose between different AI models for analysis, and offers local in-IDE reviews before you even commit. The interesting tension here is between the AI review and human review. Kilo positions it as complementary, but as these tools get better, the pressure on the human review step will only increase. At some point teams will need to decide whether AI review is a gate or just a suggestion.

**Key takeaways:**
- Loading spinner for review scope dialog improves perceived performance
- The actual computation speed is unchanged -- this is a UX fix, not a performance fix
- Kilo Code Reviewer supports GitHub, GitLab, and multiple AI models
- The relationship between AI review and human review will evolve as these tools mature

**Link:** [Kilo Code Reviewer](https://kilo.ai/code-reviewer)

## New Model Support: GPT-5.3 Codex, GLM-5, and More

**TLDR:** Kilo Code adds support for GPT-5.3 Codex, GLM-5, MiniMax M2.1, GLM-4.7, Devstral 2512, and two new providers -- Zenmux and Corethink. Most of these came from community contributions.

**Summary:**

The model roster expansion here is worth paying attention to for what it signals about the market, not just the individual models. GPT-5.3 Codex is OpenAI's latest code-focused model. GLM-5 and GLM-4.7 come from Zhipu AI in China. MiniMax M2.1 is from another Chinese AI lab. Devstral 2512 is Mistral's developer-focused model. The geographic diversity of competitive AI models is increasing fast.

Two new providers -- Zenmux and Corethink -- have been added, expanding the infrastructure layer that connects Kilo Code to these models. Both were contributed by community members, which speaks to the open-source model working as intended.

What the newsletter does not address, and what I think matters, is how users should choose between all of these options. When you have access to Opus 4.6, GPT-5.3 Codex, GLM-5, and a half-dozen other models, the paradox of choice becomes real. Are there guidelines? Benchmarks? Recommended models for specific tasks? The newsletter announces availability but does not help with the decision that follows.

**Key takeaways:**
- Six new models and two new providers added in a single week
- Chinese AI models (GLM-5, GLM-4.7, MiniMax M2.1) are increasingly competitive
- Community contributors drove much of this expansion
- Model selection guidance for users is conspicuously absent

**Link:** [Kilo Code on GitHub](https://github.com/Kilo-Org/kilocode)

## From the Blog: 2-Pizza Teams Are Becoming 1-Pizza Teams

**TLDR:** A Kilo blog post argues that AI-augmented engineers are so productive that Amazon's classic "two-pizza team" rule is shrinking to one-pizza teams, backed by research from Harvard, Wharton, and Anthropic's own internal data.

**Summary:**

This blog post makes a bold claim backed by some genuinely interesting data. The argument is straightforward: AI tools have made individual engineers so much more productive that optimal team sizes are shrinking. Amazon's famous two-pizza rule -- if you need more than two pizzas to feed the team, the team is too big -- is becoming a one-pizza rule.

The evidence cited is worth examining. A Harvard and Wharton field study at Procter and Gamble found that individuals using AI performed as well as teams without it. Teams with AI significantly outperformed teams without AI in producing top-tier ideas. Anthropic's internal data shows their engineers use Claude in 60 percent of their work, reporting a 50 percent productivity boost. And 27 percent of Claude-assisted work involves tasks that would not have been done at all otherwise.

That last number is the most provocative one. It is not just that existing work gets done faster -- it is that entirely new categories of work become economically viable. The blog author mentions writing throwaway scripts for data analysis that they would not have bothered with before. When code is cheap to produce, personalized software solutions start making sense.

But there is a significant gap in this analysis. The blog acknowledges that "nobody has figured out the right ratios yet" between human and AI work, but then the framing still assumes that smaller teams are definitively better. What about the work that requires deep human collaboration, debate, and diverse perspectives? There are real coordination costs to large teams, yes, but there are also real benefits to having more humans in the room for certain kinds of decisions. The blog does not seriously engage with that counterargument.

The concept of an "agent boss" -- borrowed from Microsoft's WorkLab -- describes the new role of engineers: decomposing work into agent-appropriate chunks, reviewing agent output, orchestrating parallel workstreams, making judgment calls, and maintaining context. The blog compares this to managing "very fast, occasionally confused interns who never get tired." That is honestly a pretty accurate description.

**Key takeaways:**
- Harvard/Wharton research shows individuals with AI match team performance without AI
- Anthropic reports 50 percent productivity boost with 60 percent of work being AI-assisted
- 27 percent of AI-assisted work represents entirely new tasks that were previously too expensive
- The "agent boss" model redefines engineering as orchestration of AI workstreams
- The analysis undersells the value of human collaboration for certain decision types
- Nobody has figured out optimal human-to-agent ratios yet

**Link:** [2-Pizza Teams Are Becoming 1-Pizza Teams](https://blog.kilo.ai/p/1-pizza-teams)

## Kilo Claw: Hosted OpenClaw Coming Soon

**TLDR:** Kilo is building a hosted version of OpenClaw with one-click deployment, access to 500+ models, zero token markup, and background automations.

**Summary:**

Kilo Claw is the upcoming hosted version of OpenClaw, and the feature list reads like a wishlist from every developer who has tried to self-host AI infrastructure: one-click deployment, over 500 models, zero token markup, and automations that run while you sleep.

The "zero token markup" claim is interesting. Most hosted AI platforms add a margin on top of the underlying model provider's per-token cost. If Kilo is genuinely passing through token costs at zero markup, the business model has to come from somewhere else -- presumably subscriptions, premium features, or enterprise contracts. That is not a bad model, but it is worth understanding what you are actually paying for.

The automation angle is the piece I am most curious about. "Automations that run while you sleep" suggests background agents that can execute multi-step workflows without human oversight. That could be incredibly powerful for things like nightly code reviews, dependency updates, or test generation. But the details are thin. What kinds of automations? What guardrails? How do you monitor what ran overnight? These are the questions that separate a useful product from a demo.

This is currently in waitlist mode, so there is not much more to evaluate. But the direction is clear: Kilo wants to be the platform that makes AI-powered development infrastructure trivially easy to deploy and operate.

**Key takeaways:**
- Hosted version of OpenClaw with one-click deployment
- Claims zero token markup on 500+ models
- Background automations suggest agent-driven workflows
- Currently waitlist-only with limited detail on automation capabilities

**Link:** [Join the Kilo Claw Waitlist](https://kilo.ai/kiloclaw)

## Community Contributions: 19 Contributors in One Week

**TLDR:** Nineteen community members contributed to Kilo Code this week, shipping new model integrations, provider support, bug fixes, translations, and UX improvements across the open-source project.

**Summary:**

The contributor list this week is genuinely impressive in its breadth. Nineteen contributors shipped changes spanning new model integrations, entirely new providers, bug fixes, UX improvements, and internationalization work. This is open source working the way it is supposed to work.

A few standout contributions: otterDeveloper added Fireworks.ai model support for MiniMax 2.1 and GLM 4.7. Neonsy contributed GLM-5 support along with Kimi reliability fixes. hsp-sz and luthraansh each contributed entirely new providers -- Zenmux and Corethink respectively. On the UX side, Drilmo shipped both the Agent Manager scrollbar fix and YOLO mode, which is a significant feature to come from a community contributor. skaldamramra added Slovak translation, continuing the internationalization effort.

What strikes me about this list is how many of the headline features in this newsletter were community-contributed rather than coming from Kilo's internal team. YOLO mode, the review scope loading spinner, image preservation through edits, multiple new models -- these are all community PRs. That says something positive about the project's contributor experience and review process.

**Key takeaways:**
- 19 contributors in a single week across models, providers, bug fixes, UX, and i18n
- Several headline newsletter features originated from community contributions
- New providers and model integrations are largely community-driven
- The breadth of contributions suggests a healthy open-source ecosystem

**Link:** [Kilo Code GitHub Repository](https://github.com/Kilo-Org/kilocode)