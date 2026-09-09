---
title: "The agent harness is dissolving into the model, and other Latent Space reading"
excerpt: "Six posts on planning skills, why agents suddenly started working last Christmas, physics foundation models, Lovable's capability pivot, five days with Grok Bot, and which products LLMs recommend."
publishedAt: "2026-09-09"
slug: "latent-space-agent-harness-wayfinder-lovable-aeo"
hashtags: "#latentspace #ai #agents #llm #architecture #engineering #ml #saas #devtools #generated #en"
source_pattern: "Latent.Space"
---

## The evolution of the agent harness

**TLDR:** An argument that agents started working around Christmas 2025 because model capability and harness design finally crossed, and that models are now absorbing harness features into their weights. What is left when that finishes is an interface to human attention rather than to the model.

**Summary:** The framing is two curves. One is what the harness asks of the model, the other is what the model can actually deliver, and the gap between them is how effective your agent is. ReAct in October 2022 defined the reason, act, observe loop as a prompting technique with both curves near zero. AutoGPT and BabyAGI in spring 2023 sent the harness curve sprinting ahead, handing full autonomy to models that were still brittle next token predictors. The arithmetic here is the part people skip: 95% reliability per step across a 20 step task averages roughly 36% success. A loop does not add capability, it amplifies whatever capability exists, and below a threshold it amplifies errors.

Cursor and Copilot then did the correct thing, which was to pull the harness curve back below the model curve. Do not give the model the loop, give the human the loop and let the model make the human faster. The first Devin tried to hand autonomy back and Answer.AI measured roughly a 15% success rate, which the post reads as evidence that the IDEs were right rather than timid. Then o1 arrived at the end of 2024, the gap inverted, and there was suddenly capability sitting unused.

Claude Code is presented as the product that seized that inversion at the right moment. Terminal instead of IDE, bash and file access instead of approval on every change, permission rules instead of a human confirming each step. Built for the next model rather than the current one. Roughly $1B ARR within six months, and the argument is that this happened not because it was first to give the model autonomy but because it was first to do so after the crossover.

The present era is where it gets interesting. Harness-Bench ran one model across 106 tasks in different harnesses and got scores from 52.4 to 76.2, a 23.8 point spread with zero model change. OpenAI tripled an ARC-AGI-3 score with two API settings. Half the agent is the harness. Meanwhile reinforcement learning moved inside the harness, with codex-1 trained on real coding tasks in real environments, so models started absorbing harness capabilities into their weights. GPT-5.1-Codex-Max was described as the first model natively trained to operate across multiple context windows through compaction. Once absorbed, the scaffolding can be deleted. Thariq Shihipar said Anthropic recently removed 80% of Claude Code's system prompt. The post proposes that as the metric: how much of your harness can you delete while keeping the same capability.

The prediction at the end is the part I would bet on. If the model absorbs everything computer facing, what remains is everything human facing. Permissions, identity, trust, legibility. The harness stops being the human's interface to the model and becomes the model's interface to human attention. Ryan Lopopolo's line, that the only fundamentally scarce thing is the synchronous attention of his team, is the whole thesis in one sentence. The concrete forecast is that within a year every company building agentic AI ships a human attention policy file the way everyone shipped AGENTS.md. AGENTS.md tells the agent how to work with your codebase. This would tell it how to work with you: when it may interrupt, when to keep going, which decisions it can make alone.

**Key takeaways:**
- 95% per step reliability across 20 steps averages roughly 36% success, which is why early autonomous agents failed
- Harness-Bench found a 23.8 point spread across harnesses with an identical model on identical tasks
- Models are absorbing harness features into their weights, so the metric is how much scaffolding you can delete
- Anthropic removed 80% of Claude Code's system prompt after absorption
- What no model absorbs is the human facing part, which is where the next design work is

**Why do I care:** The deletion metric is the most useful idea here for anyone maintaining agent tooling. If your prompt and scaffolding have only grown since you wrote them, you are carrying workarounds for model limitations that were fixed two releases ago, and that dead weight costs you tokens and behavior every single call. Go delete some and measure. The attention policy prediction is also worth taking seriously ahead of time, because interrupt policy is a product decision and right now most teams are making it by accident.

**Link:** [The Evolution of the Agent Harness](https://www.latent.space/p/attention-interface)

## The wayfinder skill and naming things for agents

**TLDR:** Matt Pocock built a planning skill for projects where you cannot see the end state. The interesting part is not the workflow, it is his claim that agents respond to precise, consistent vocabulary, and that he built an entire AI coding dictionary to enforce it.

**Summary:** The problem wayfinder solves is one anyone doing long agent runs recognizes. Pocock was scheduling a lot of overnight work, planning, writing a spec, turning the spec into tickets. The planning stage became the bottleneck because he was constantly managing his own session, watching how many tokens into the context window he was and how deep the thread had gone. He wanted an orchestrator layer that would handle the planning sessions themselves, splitting work into threads, prototyping, researching, then pulling it back together.

The design method he describes is more transferable than the skill. Start from the information flow, because a skill is fundamentally context management. Ask what a managed sub session needs, and the answer is a rough overview of everything else happening plus its own specific task. That gives you two documents. A map holding all the decisions already made, and a ticket holding the one task. Then the session. Three words, each precise.

That precision is the actual thesis. If you call everything a ticket, or refer to the same thing differently in different places, the agent gets confused and you get strange behavior. Pocock calls them leading words, terms chosen to lead the agent to the correct understanding of what each part is. He has been obsessed enough with this to build an AI coding dictionary covering every term in AI coding as a navigable graph, and rebuilt all his courses and skills to use it consistently. His framing is that there is a communication barrier between him and the agent, and what he is doing is finding a ubiquitous language. Anyone who has done domain driven design will recognize exactly what that is, applied to a new counterparty.

The fog of war concept is the organizing metaphor. You cannot decide everything at the start. You make the decisions you can, and those push further into the unexplored map, Warcraft III style. Ticket types cover grilling sessions, prototypes, research and plain human tasks. Pocock uses it for course planning as much as engineering, which suggests the structure generalizes. His rule for choosing between skills is clean: use grill-me when you can plan the whole thing in one session and just need alignment before starting, use wayfinder when you cannot see the path.

**Key takeaways:**
- Wayfinder exists to remove session management from the planning stage by orchestrating sub sessions
- The design starts from information flow, which produces a map, a ticket and a session as distinct things
- Inconsistent vocabulary produces inconsistent agent behavior, which is why he built a dictionary
- Grill-me for a path you can see, wayfinder for one you cannot

**Why do I care:** The vocabulary argument is the takeaway and it costs nothing to apply today. If your AGENTS.md calls the same thing a component in one paragraph and a widget in another, you are paying for that in every session. Pick the word, use it everywhere, and treat your instruction files the way you would treat a shared domain model with another team. The bit I would genuinely try is asking the agent to propose the terminology, since Pocock's claim that they are good at domain modeling matches what I have seen and is easy to test on an afternoon.

**Link:** [The /wayfinder Skill: Navigating the Fog of War of Planning](https://www.latent.space/p/wayfinder-skill)

## Physics does not scale like language

**TLDR:** Anima Anandkumar built the first open source AI weather model against expert skepticism and it now matches physics based simulation. Her point is that scaling laws do not transfer to continuous physical systems, because the data does not exist and the context lengths would be absurd.

**Summary:** The origin is a good story. Anandkumar set out to build an open source AI weather model and was told weather is chaotic, physics simulations require supercomputers, the field has decades of head start and the data is not there. Within a year her team shipped FourCastNet, competitive with the best physics based simulations available, and now anyone can produce accurate short timescale weather predictions on consumer GPUs.

The argument for why this needed a different approach is precise rather than hand waved. Open source datasets in these domains hold tens or hundreds of thousands of examples, nowhere near what token hungry transformers want. Worse, the resolution physics demands pushes context length into absurd territory. Her own number: if each dimension is a few hundred grid points, which is where industrial scale starts, you are looking at hundreds of billions to a trillion tokens of context, and all the world's compute will not be enough for a transformer at that scale.

Neural operators are her answer, and they are elegant. Instead of modeling a grid, you model a function that evolves across scales, which lets you combine data with physical laws and handle multi scale inputs and outputs. The weather example makes it concrete. The Earth is a sphere, so the right basis is spherical harmonics. Run a weather model on a flat grid and it blows up quickly. Move to the natural basis for the problem and it stays stable long enough to roll out months instead of days. The Fourier Neural Operator learns directly in the frequency domain and its spherical variant powers FourCastNet 3.

The observation I did not expect is that the physical world turns out to be forgiving. In fusion, a few thousand samples are enough to predict plasma disruptions, and to do it a million times faster than traditional simulation. So this is not a rejection of scale, it is a different route to it. Anandkumar still wants a foundation model for physics spanning many phenomena and doing both simulation and design. You get there by building in the structure the physical world already has, rather than waiting for data that will never exist.

The rest of the episode covers TorchLean, a framework for writing PyTorch style networks inside the Lean proof assistant and formally verifying them, which matters if you want a neural network inside a fusion reactor control loop. She was also appointed to the United Nations Scientific Advisory Board.

**Key takeaways:**
- Industrial scale physics simulation would need hundreds of billions to a trillion tokens of context, so transformers are out
- Neural operators model a function evolving across scales rather than a fixed grid
- Choosing spherical harmonics as the basis is what keeps global weather models stable for months instead of days
- A few thousand samples predict plasma disruptions a million times faster than traditional simulation
- TorchLean lets you write PyTorch style networks in Lean and formally verify them
- Open datasets in these domains hold tens or hundreds of thousands of examples, not the volumes transformers want

**Why do I care:** This is a corrective to the assumption that more data and more parameters is the answer to every modeling problem, and that assumption has quietly leaked into ordinary engineering thinking. The transferable lesson is that choosing the right representation beat throwing compute at the wrong one, by a margin that no amount of scaling would have closed. If you are building anything that models a system with known structure, look for the equivalent of spherical harmonics before you look for more training data.

**Link:** [We have foundation models for language, not for physics](https://www.latent.space/p/anima)

## Lovable thinks apps become capabilities

**TLDR:** Lovable is moving from building applications to building what it calls capabilities, meaning functions from your app exposed as tools through a hosted MCP server. One application, two interfaces: a human UI and an agent interface reachable from ChatGPT, Claude and anything MCP compatible.

**Summary:** The pitch is a digital brain for your team connecting your daily tools, and CTO Fabian Hedin describes the goal as one entry point to all the work you are doing. Lovable still wants to be where you build apps, and increasingly it also wants those apps to expose selected functions as agent callable tools so nobody has to open the app at all.

The company history explains why this is a plausible move rather than a pivot. Lovable came out of GPT Engineer, an open source coding tool from 2023 aimed at prototyping. It went commercial in November 2024 and was renamed the following month. Then they noticed users building not prototypes but real products serving real customers, and after that building internal software, CRMs, admin panels, support consoles. So in under three years they became a software creation and hosting company competing with Vercel and Cloudflare, with more emphasis on generation than infrastructure. The numbers backing this: over $500M annualized revenue run rate, more than 60 million projects created, over 900 million monthly visits to Lovable built apps, and a $400M Series C at a $13.3B valuation led by Menlo Ventures.

Hedin's description of the company brain is careful in a way I appreciate. It needs as much context as possible about you, your company and the world around you, plus capabilities to perform both general tasks and organization specific actions. Their internal credit granting tool is now available through the Lovable agent rather than as a page someone opens. He is deliberate about avoiding the word agent, saying it suggests an employee performing a task when the reality is connecting the right context and capabilities. He also claims orchestrating capabilities is the easy part and making them well connected, correctly built and reliable is the hard part, which is either genuine insight or a very convenient framing for a company that sells capability building.

The security section is the substantive one. If an employee builds an app that connects to company Slack, you need to be sure that person does not accidentally expose their own messages to the company brain. Lovable's answer is connectors with a permissioning graph. One type, called an app user connector, preserves each user's identity and source system permissions. Credentials are stored server side in encrypted form and handled by a connector gateway, never exposed to the generated application, which instead gets a short lived key bound to the relevant user. Separating credentials from application code is the right structure and it is also the part that is hard to verify from outside.

On what happens to SaaS, Hedin thinks people will keep far fewer tabs open, the interaction consolidates behind an AI layer, and the vertical capabilities those tools provide stay valuable. Some vendors will fight it by not adapting. His closing advice is that SaaS businesses will have to focus on providing the shovel for AI to use their capabilities.

**Key takeaways:**
- A capability is a function from your published app exposed as a tool through a hosted MCP server
- The same application ends up with a human UI and an agent interface without a rewrite
- App user connectors preserve each user's identity and source system permissions, with credentials never reaching the generated app
- Lovable reports over $500M run rate revenue and raised $400M at a $13.3B valuation
- Vercel is building the same thing internally with an agent called @v

**Why do I care:** The design question this raises is real regardless of whether you use Lovable. If your app is going to be called by an agent, which of your functions are safe to expose, and does your permission model work when the caller is a tool call rather than a session? Most frontend applications answer that badly, because permissions live in the UI layer where they were never meant to be the only enforcement. That is worth auditing before someone puts an MCP server in front of your API. The consolidation claim I would treat as a vendor's roadmap rather than a forecast.

**Link:** [The Future of SaaS Is Apps That Agents Can Use](https://www.latent.space/p/lovable-future-of-saas)

## Five days with Grok Bot

**TLDR:** A hands on review arguing Grok Bot is to OpenClaw what a MacBook is to Linux. Setup is a browser login instead of an MCP server config, the Bot itself is the unit you program, and the tradeoff is that you lose the levers you would use to control cost and context.

**Summary:** The setup story is the whole argument. You open the plugin catalog, search for a service, click it, a login screen opens in your local browser, you sign in, done. No MCP server JSON, no API credentials pasted anywhere. The author connected it to X for a daily brief of relevant news, then to Freshdesk through his work account to build a support bot that polls every fifteen minutes for new tickets. That second one was not even a native connector. He opened Freshdesk in the virtual browser, moved his login over from 1Password, authenticated, and an ordinary website became a recurring automated workflow. xAI warns that browser workflows break on interface changes, expired sessions and CAPTCHAs, and recommends a connector where one exists, which is fair.

The comparison to OpenClaw is drawn carefully rather than as a dunk. OpenClaw 2.0 narrowed the gap substantially, reusing an existing Claude Code or Codex login in its quick start and moving setup and plugin management into a graphical interface. The remaining distinction is real: OpenClaw gives you a Gateway you own and choose where to run, Grok Bot supplies and operates the computer as part of the product. Managed agent computer versus user owned agent platform.

The idea worth stealing is that the Bot is the atomic unit of the program. With OpenClaw, customizing means getting closer to code, config, tools and infrastructure. In Grok Bot you give Bots roles, connect them to tools, and compose them into group chats. The author frames this as the next step in the long move up the abstraction ladder from machine code to assembly to C to Python, where the interface is now English and the thing being programmed is a Bot. His Agentic Engineer Bot routes visual and frontend work to Claude Code, debugging and careful code reading to Codex, and simple tasks to the Grok Build CLI. He does not decide which CLI to use, he delegates to the role, exactly as he would with a team of people.

The critique is where the review earns its keep. There is no model picker, which is convenient until a task does not need frontier intelligence and you would rather spend less. Grok Bot routes behind the scenes and you cannot see or influence it. You also lose the ability to start a fresh thread, compact deliberately, or manage how much context you carry, which reduces cognitive overhead and removes your ways to control consumption. He names a subtler cost too: less required of you means less mental presence in the work. And one line deserves highlighting because it is a security statement, not a UX one. Every Bot shares the same computer, files, browser sessions and logins. Separate Bots are organizational boundaries, not security boundaries.

His verdict after a week is honest. He uses it daily and it is not his main interface. It earns its place on administration, summarizing, news, project and task management, the shallow work that gets in the way of deep technical work. A digital chief of staff that needs no training. He also doubts it will be writing the majority of your pull requests any time soon.

**Key takeaways:**
- Connecting a service is a browser login, not an MCP config, and that difference is the product
- The Bot is what you program, with roles, tools and routing rules, composed into group chats
- The virtual browser turns any website with a login into an automatable recurring workflow
- Separate Bots share one computer, files and sessions, so they are organizational boundaries and not security ones
- No model picker and no context controls means less overhead and no way to manage spend

**Why do I care:** The abstraction argument is the interesting one for architects. Moving the unit of composition from a tool call to a named role with routing rules is a legitimately different way to structure agent work, and you can copy it without using this product. The security caveat is the thing to internalize before anyone on your team gets excited: an organizational boundary that looks like an isolation boundary is exactly how credentials leak between contexts. And the observation that removing all the levers also removes your mental presence in the work is worth sitting with, because it applies to more tools than this one.

**Link:** [OpenClaw Power, MacBook Simplicity: Five Days With Grok Bot](https://www.latent.space/p/grok-bot)

## What frontier models recommend, measured

**TLDR:** Latent Space built an answer engine optimization tracker running 6 prompt variations across 7 models with search on, over 161 product categories. The finding that matters is that models recommend their own lab's products, and that Astra changes its mind far less when you rephrase.

**Summary:** The methodology extends AmplifyingAI's work and is at least published, which is more than most rankings offer. Six prompt variations, seven models with search enabled, 161 categories running from coding agents and AI sandboxes to managed databases, ASR models and oddities like angel investors and payroll software. Astra did the answer extraction. The scoring weights first choices, alternative choices and mentions, and applies negative weight to mild and strong anti recommendations, which do occur. Every prompt and answer pair is inspectable, which is the right call given the obvious contamination question.

The self preference finding is stated plainly and is not surprising, which does not make it less important. Ask for coding agent recommendations and Fable and Opus like Claude Code, Sol and Astra like Codex, Grok likes Cursor, Muse likes Muse Code, SWE-1.7 likes Devin. The post notes counterexamples where GPT models recommend Claude, calling it a laudable nonbias, and the honest read is that self preference is the default and the exceptions are worth noting precisely because they are exceptions. Out of 161 categories, 28 have a single dominant primary choice across every model surveyed. The rest are close contests, which is where any of this actually matters.

The generational comparison is the part with a practical consequence. Anthropic appears to bias its models toward searching more sources, with Sol at a median of 9 and Astra at 5, against Opus at 11 and Fable at 15. Astra is far less likely to change its recommendation when you lightly rephrase the question. Whether you call that confidence or efficiency depends on your mood. The consequence is unambiguous either way. As randomness in model choices declines, the value of influencing those choices goes up, because a stable recommendation is a durable one.

They also confirmed something checkable rather than merely observed. Answer engine optimization practices measured by Ora and Vercel, such as markdown content negotiation, are real, and failing at them discourages models from reading your content. That is the one actionable line in the whole post. The rest, including the family feud style guessing game and the ranking of angel investors, is entertainment, and the sample size on the source analysis is small and reflects only scraped tool calls rather than pretraining data.

**Key takeaways:**
- 6 prompt variations across 7 models with search on, over 161 categories, with every prompt and answer inspectable
- Models systematically prefer their own lab's products when recommending tools
- 28 of 161 categories have one universally dominant choice, and the close contests are where the effort belongs
- Astra searches fewer sources than Sol and is far more stable under paraphrase
- Markdown content negotiation is a verified factor in whether models read your content

**Why do I care:** If your team ships a developer tool or a library, models are now a discovery channel and this is the first tracker I have seen that publishes its prompts. The concrete action is the markdown content negotiation finding, which is a docs infrastructure change your team can make in a sprint and which is measurable. The self preference result is also worth knowing before you cite a model's recommendation in a technology evaluation, because asking Claude which coding agent to use is not a neutral question and you should say so in the doc.

**Link:** [The Frontier AEO Tracker: What Astra Chooses](https://www.latent.space/p/aeo)
