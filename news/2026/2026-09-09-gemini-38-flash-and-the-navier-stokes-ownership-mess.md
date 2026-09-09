---
title: "Gemini 3.8 Flash landed quietly, and a math proof got messy"
excerpt: "Google shipped a Flash model fast enough to change what you run in a loop, and a Navier-Stokes proof turned into an argument about who owns your unpublished drafts."
publishedAt: "2026-09-09"
slug: "gemini-38-flash-and-the-navier-stokes-ownership-mess"
hashtags: "#kilo #ai #llm #agents #gemini #openai #engineering #devtools #generated #en"
source_pattern: "Kilo"
---

## Gemini 3.8 Flash and the quiet launch that mattered

**TLDR:** Google shipped Gemini 3.8 Flash with a blog post and no keynote, during a week when Anthropic and Meta were both launching flagships. It runs at 352 output tokens per second, which is roughly four times GLM-5.3 and five times Grok 4.6 at the same tier of intelligence.

**Summary:** The intelligence numbers are the boring part, and that is exactly the point. On the Artificial Analysis Intelligence Index, Grok 4.6 sits at 61, GLM-5.3 at 60 and Gemini 3.8 Flash at 59. Two points across a composite of nine benchmarks is noise. Nobody is choosing between these three on intelligence, which means the choice has moved somewhere else.

That somewhere else is throughput. Artificial Analysis clocks Gemini 3.8 Flash at 352 output tokens per second. GLM-5.3 manages 80 and Grok 4.6 manages 65. That is not a margin, it is a different category of experience. An agentic loop is dozens of model calls stacked on each other, each waiting on the one before it, so the per token speed compounds across the whole run. At 65 tokens per second a 40 step task is long enough to go make coffee. At 352 it is something you sit through.

The pricing is $0.75 per million input tokens and $3.75 output, introductory through the end of December, then doubling to $1.50 and $7.50. Cached input is $0.075. The context window is a million tokens with no long context surcharge, and effort levels are adjustable, so you can dial spend down for boilerplate. The Kilo team measured 75.3% on their own KiloBench, ahead of GPT-5.5 at higher cost, and Google's DeepSWE v1.1 results show it closing long horizon software engineering tasks end to end above most larger models.

The caveat the post makes and then somewhat glosses over is the one that matters for your bill. Cost per token is not cost per task. At higher effort levels 3.8 Flash takes extra reasoning steps and calls tools more iteratively than 3.7 Flash did, so it can burn more tokens on the same job. The claim that the extra diligence pays for itself comes from early runs rather than published numbers, and I would want to see my own before believing it.

Google also shipped a defenders only variant called Gemini 3.8 Flash Cyber, tuned for vulnerability discovery and automated patching and gated behind a program for governments, critical infrastructure operators and software maintainers. The Chrome Security team reports it produced 2.6 times more correct vulnerability patches than much larger commercial models. That is a narrow, verifiable claim from a team with no reason to inflate it, and it is more interesting than most of the benchmark table.

The cadence is the real story. Gemini 3.5 Flash in May, then 3.6, then 3.7 three weeks ago, now 3.8. A new Flash model roughly every month, each a meaningful step on coding and agentic work rather than a version bump. Frontier intelligence has become table stakes and the competition moved to cost per task, throughput, and whether a model stays on the rails through 40 tool calls.

**Key takeaways:**
- Gemini 3.8 Flash, GLM-5.3 and Grok 4.6 sit within two points of each other on the Artificial Analysis index
- 352 output tokens per second against 80 for GLM-5.3 and 65 for Grok 4.6 is the actual differentiator
- $0.75 input and $3.75 output through December, then double, with cached input at $0.075
- Higher effort levels burn more tokens per task than 3.7 Flash did, so cost per token is not cost per task

**Why do I care:** This is the model you point your background loops at, not the one you use for an architecture call. For frontend work that means test generation, refactors across a lot of files, migration passes and anything else you kick off and check later. The 352 tokens per second number is the one that changes how it feels to work, because a 40 step agent run stops being something you context switch away from. Do measure cost per task rather than cost per token before you move real spend, since the post admits the model works harder and the pricing doubles in January.

**Link:** [The Quiet Launch of Gemini 3.8 Flash](https://blog.kilo.ai/p/the-quiet-launch-of-gemini-38-flash)

## Who owns the drafts in your agent session

**TLDR:** Three mathematicians published Lean verified proofs of finite time blowup for forced Navier-Stokes after a year of work, using Codex sessions throughout. Days later OpenAI produced a proof by the same narrow route, and the author could not find out whether his own unpublished drafts had been used.

**Summary:** The mathematics first, because it is real. On September 8, Tristan Buckmaster, Levent Alpoge and Matei Coiculescu published proofs showing that several closely related equations, including 3D incompressible Euler, can blow up in finite time under a smooth external force. Blowup means a quantity in the solution runs off to infinity after a finite time rather than staying bounded forever, which is precisely the behavior the $1m Clay Millennium problem asks about. They verified the proofs in Lean, so the argument is machine checked rather than resting on a referee's reading, and Terence Tao wrote them up on his blog. That last detail is the closest thing to a field wide signal you get before formal review.

The work took about a year and most of it was slow. According to Buckmaster's account the breakthrough came on August 15 and Lean confirmed it on August 22. They paid out of pocket and used several models throughout: Claude, Codex with GPT-5.6 Sol, and more recently Astra for writeups and auditing. Every draft of the project went through their Codex sessions.

Then the timeline gets uncomfortable. Buckmaster says he emailed OpenAI privately on September 3, having heard his work had reached the company, hoping to avoid a collision. On September 6 he spoke twice with Sebastien Bubeck, who leads OpenAI's math team, and was told an internal model had produced a roughly 100 page proof of finite time blowup for forced Navier-Stokes using smooth forcing under options c and d in Fefferman's formulation. That is the same narrow route Buckmaster and Alpoge had chosen. It is not the route you land on in a few days by handing a model the problem statement.

The account of how the story changed within a single phone call is the part worth reading carefully. He was first told the model had received very little human input. By the end of the same call the description had become an entire team working on it, the model warmed up on easier equations first, and a prompt that had itself been written by prompting Codex. He asked when the first prompt went out and the answer, eventually, was the past few days, after information about his work reached OpenAI. He asked whether the internal model had been trained on or had access to the Codex sessions holding every draft. He was told the model does not look up user data. When he asked again about training specifically, he got nothing.

Both sides are being careful in public, and the Kilo post is careful about that too. Bubeck calls the circulating allegations false and inflammatory, says he followed academic norms, and has promised a fuller response. Buckmaster states that he has not seen OpenAI's proof, does not know whether his data was used, and is not accusing anyone of anything. Those qualifications are doing real work and most of the commentary has thrown them away.

The durable point has nothing to do with who was rude on a phone call. Two people spent a year on an obscure program, and when they needed to know what had happened to their own unpublished drafts, they had to ask a vendor and hope for a straight answer. There was no log to read and no way to reconstruct what left their machines. Nobody signs a document forfeiting ownership of their work. It accumulates. An architecture decision goes in a chat because that is where you were thinking, a model reads the whole repo to answer a question about one function, and a month of design work on an unreleased feature ends up as conversation history inside a product owned by a company that might compete with you next quarter.

The recommendations at the end are where the vendor pitch shows, and it is worth naming that. Kilo makes a router, so "spread the work across providers" and "use tooling whose source you can read" are conveniently also its product description. That does not make the advice wrong. The distinction it draws is genuinely useful: Buckmaster and Alpoge queried at least three model families and it did not protect them, because the project still accumulated inside one product's sessions. Using several models is not the same as spreading the work. What matters is where the working state lands.

**Key takeaways:**
- The proofs are Lean verified and Terence Tao wrote them up, so the mathematics is not the contested part
- OpenAI's internal effort took the same narrow route under options c and d in Fefferman's formulation
- The account of human involvement changed within one phone call, from very little input to a full team
- Buckmaster got no answer on whether an internal model was trained on his Codex sessions
- Querying multiple model families does not help if all the drafts still accumulate in one product's session history

**Why do I care:** Most of us will never be in a race where three groups worldwide are chasing the same result, and the exposure is still real if your advantage is a specific approach rather than an existing business. The concrete question to ask is not which model you use but where your working state lives, and for most teams the honest answer is that a single vendor holds the full design history of everything unreleased. Go look at where your unpublished work currently sits and count how many companies can see all of it at once. That is a ten minute exercise and I suspect the answer will annoy you.

**Link:** [Mathematicians, OpenAI, and a $1m Problem](https://blog.kilo.ai/p/math-problem)
