---
title: "AI in the Workplace: Architecture Still Matters, Universities Adapt, and One Developer's LLM Reckoning"
excerpt: "Three pointed takes from daily.dev on what AI is actually doing to codebases, computer science education, and workplace sanity."
publishedAt: "2026-06-12"
slug: "ai-architecture-universities-workplace-llm-delusion"
hashtags: "#dailydev #ai #architecture #engineering #agents #career #generated #en"
---

## Using AI Doesn't Mean You Can Slack on Architecture

**TLDR:** AI agents reproduce whatever patterns already live in your codebase, so messy architecture now compounds faster than it ever did with humans. Good boundaries and consistent naming become a standing instruction set that makes the agent's output better by default.

**Summary:** Matt Soto's argument here is refreshingly unglamorous. Everyone is busy talking about spec-based development and how much faster agents make us, and his point is that none of that saves you from the boring work of keeping a codebase coherent. We already knew messy architecture slows human teams down. It makes changes harder, reviews slower, bugs stranger, and onboarding miserable. What changes with AI is the speed of propagation. A bad pattern that used to spread through five separate human decisions can now get copied across an entire project in one fast agentic pass. The mess doesn't just sit there anymore, it replicates.

The core mechanism is context. A seasoned human engineer brings a lot of invisible knowledge to a project. They can look at a pattern that appears everywhere and think, this is probably accidental, or this abstraction works today but extending it is going to hurt us. They use memory, team history, and product knowledge to decide when not to follow what they see in front of them. Agents don't work that way. They produce reasoning-shaped text, they compare options, they explain tradeoffs, but they don't understand your project the way a person does. They work from the context you hand them: the prompt, the files they inspect, the tool output they read, the specs you write, and the patterns already sitting in the code. If those patterns are bad, that's the lesson the agent learns.

So architecture becomes leverage rather than overhead. A well-structured project gives AI better defaults. Clear module boundaries mean the agent is more likely to put new code in the right place. Consistent naming means it's more likely to name new things sensibly. Focused, readable tests mean it's more likely to write useful tests. Soto frames good architecture as embedded instruction: the spec explains the destination, the architecture explains which roads are safe to drive on. Pair the two and you get a genuinely stronger workflow.

What I appreciate is that this dodges the usual false binary. He isn't anti-AI. He's saying speed needs direction, and direction comes from structure you maintain on purpose. What the piece avoids confronting head-on is the political reality that "we'll clean up the architecture later" is exactly the corner teams cut when shipping pressure is high, and AI makes shipping feel cheaper than ever. The discipline he's asking for runs directly against the incentive the tools create.

**Key takeaways:**
- AI agents copy existing patterns fast, so architectural debt now compounds across a codebase in a single pass rather than slowly through human decisions.
- Agents work only from the context they're given; they lack the human judgment to ignore accidental or bad patterns.
- Clean boundaries, consistent naming, and readable tests act as an implicit instruction set that improves agent output.
- Specs describe intent, architecture describes safe paths; you need both for a strong agentic workflow.

**Why do I care:** If you lead a team or own a codebase, this is the most practical AI argument going right now. The temptation is to treat agents as a way to skip the parts of the job we find tedious, and the uncomfortable truth is that they raise the value of those tedious parts. Your architecture is now a prompt that runs on every single generation, whether you wrote it down or not. I'd push it one step further than the author: invest in the machine-readable scaffolding too, the lint rules, the directory conventions, the example-rich READMEs, because that's the context agents actually read. Sloppy structure used to cost you future velocity. Now it costs you on every commit.

**Link:** [Using AI Doesn't Mean You Can Slack on Architecture](https://spin.atomicobject.com/using-ai-architecture)

## The University In The AI Era

**TLDR:** Carson Gross, who teaches CS at Montana State, argues universities may become more relevant in the AI era, not less, because they can still credibly signal competence through in-person proctored testing. His proposed fix is to double down on supervised hand-coding while companies stop letting juniors write code at all.

**Summary:** This is a long, thoughtful essay from the creator of htmx, and it lands on a counterintuitive conclusion: the antiquated infrastructure of the university, the lecture halls, the testing centers, the printers, the in-person proctored exams, is suddenly an asset. Gross noticed the problem firsthand. The last semester he offered online tests, which he liked because they're convenient for working students, the scores went through the roof. AI has made remote assessment essentially meaningless. Students can and do use AI to complete code-heavy assignments, learn very little, and still get good grades, because AI performs at or above the level of most reasonable undergraduate projects.

His response is in-person, on-paper quizzes with one page of handwritten notes and no digital equipment, roughly every three weeks. Students can still cheat, but now they have to work for it, and the proctored setting lets him establish actual competence in a way that's hard to game. That signaling function, vouching to the outside world that this person can really do the thing, is where he thinks universities hold a structural advantage that almost no other institution can match anymore.

The deeper thread is about writing code versus reading it. CS departments have historically treated coding as a secondary skill students pick up on their own, while the department focuses on theoretical foundations. Gross has always thought that's backwards. You need to write code to appreciate the theory; if you can't implement a linked list or use a hash table, the big-O analysis stays abstract. The bitter irony of the AI era is that professional environments are now making the same mistake, sometimes insisting engineers not write code at all but generate it with agents. That might be fine for seniors who already know what good code looks like, but it traps juniors. They have no pre-AI coding experience, and they're walking into workplaces where nobody writes code. So where do they learn to read code, which you can only do by having written it?

His answer is that universities can be the place where young engineers actually write code, by refocusing the curriculum on practical hand-coding that's becoming unavailable after graduation. He also plans to spend more class time honestly communicating the dangers of AI, citing research suggesting it dulls thinking and homogenizes creativity, and he frames resisting the temptation to auto-cheat as a genuine act of character. He notes, pointedly, that no AI was used to write the essay beyond fixing typos and generating the table of contents.

Where I'd push back: the signaling argument assumes employers still value the signal a degree provides, and plenty of them are loudly questioning exactly that. There's also a tension he doesn't fully resolve. If industry stops hiring people to write code, then training students to write code by hand preserves a skill the market may not be paying for. The essay is strongest as a defense of pedagogy and weakest on the labor-market question of whether the thing he's teaching will still be demanded.

**Key takeaways:**
- AI has made online and take-home assessment unreliable; in-person proctored testing is now a rare credible competence signal.
- Writing code by hand is what builds the ability to read code, a skill juniors can't develop in workplaces that ban human coding.
- Universities have an opportunity to become the place where young engineers learn to actually write code.
- Gross plans to teach the documented downsides of AI directly, framing resistance to automated cheating as a virtue.

**Why do I care:** Even if you never set foot in a classroom, this is your future hiring pipeline. The "juniors can't learn to read code if they never write it" problem is going to land on senior engineers' desks within a couple of years as a mentorship and code-review crisis. If teams genuinely stop letting juniors write code, we're manufacturing a generation that can prompt but can't evaluate, and someone senior will be on the hook for every agent-generated PR they merge without understanding. I think the practical lesson for engineering managers is the inverse of what some companies are doing: deliberately reserve hand-coding work for your juniors, treat it as training, and accept it's slower in the short term. The university can't be the only place that still teaches this.

**Link:** [The University In The AI Era](https://htmx.org/essays/universities-and-ai)

## Our Workplace LLM Mass Delusion

**TLDR:** A raw, frustrated account of mandated AI adoption at a cash-strapped workplace, where every pilot project failed and the showcase use cases were absurd, like asking ChatGPT what's for lunch from a one-page menu. The author argues AI is amplifying the Dunning-Kruger effect and turning capable colleagues into unpaid evangelists.

**Summary:** This is a personal essay rather than a study, and it reads like someone finally saying out loud what a lot of people are muttering at their desks. Ava sets the scene with the financial backdrop: open positions left unfilled, employee bonuses cancelled two years ago, departments overworked and told to find a way to deal with it, important licenses and databases dropped to save money. Against all that, there is somehow enough budget to hire consultants advising the company to go all in on AI, to pay external firms for years of LLM workshops, and to license both ChatGPT and Copilot. The bonus money that should have gone to staff is funding the hype.

The part that stings is the track record. She's attended every one of these AI adoption meetings, across hundreds of people, different teams, all kinds of projects, including ones run by people enthusiastic about the technology. Not a single one worked out. Every project ended with the same conclusion: it isn't workable, it doesn't save time, it over-complicates things. And then the showcase examples. The big presented use case was downloading the cafeteria menu, a nicely designed one-page Excel sheet, uploading it to ChatGPT, and asking what's for lunch on Wednesday. The bot's answer was longer than the sheet, and the whole download-upload-prompt dance took longer than a single glance at the menu. Another official suggestion, from the head of IT no less, was that unsure whether an email is phishing, employees should save the suspicious attachment to their desktop and upload it to ChatGPT, which is roughly the opposite of sane security advice.

Her sharpest observation is psychological. AI is unusually good at amplifying the Dunning-Kruger effect, making whatever someone attempts feel smarter and more justified, packaging mundane tasks in a bow that makes them seem deep. People convince themselves they're doing something groundbreaking while using the tool for worthless busywork that other methods handle better. She describes watching smart, capable colleagues with real responsibility turn into shills, presenting summarizing a one-page lunch table to a company-wide meeting as a meaningful win. The emotional core is the gaslighting: when every pilot fails but leadership keeps insisting it's transformative, you start to wonder if you're the crazy one. She calls it her second Covid, and closes generously, saying if none of this is happening where you work, genuinely good for you, and she's happy for people who use the tools wisely where they actually fit.

What the piece deliberately doesn't do is pretend to be balanced, and it's honest about that. It's a vent, scoped to one dysfunctional organization, and she says as much. The weakness is that the failures she describes are at least partly organizational, top-down mandates, no real problem to solve, consultants steering the ship, rather than proof the technology is worthless. But the critique of mandate-driven adoption is real and underdiscussed: rolling out a tool because you've decided it's the future, then hunting for use cases afterward, is exactly backwards, and it produces precisely the cafeteria-menu theatre she's describing.

**Key takeaways:**
- Mandated, top-down AI adoption with no concrete problem to solve tends to produce showcase use cases that are slower than the manual approach.
- Across hundreds of people and many pilot projects, the author saw zero genuine successes, every one concluded AI didn't save time.
- AI can amplify overconfidence, making trivial tasks feel important and turning skeptics into unpaid evangelists.
- Spending heavily on AI tooling and consultants while cutting staff bonuses and licenses signals misaligned priorities.

**Why do I care:** This is the qualitative counterweight to every productivity-uplift slide deck, and as a developer you should read it precisely because it isn't about coding. It's about how AI gets adopted in organizations, and that pattern will reach your engineering org if it hasn't already: a mandate from above, a vendor relationship, a hunt for use cases, and pressure to report wins. The defensive move for technical leaders is to insist on real baselines and honest measurement before declaring victory, and to protect the team from performative adoption that burns time. The author's failed pilots weren't failures of the model, they were failures of process, and process is something engineers can actually push back on. Worth bookmarking for the next time someone presents "summarize this short document" as a transformation.

**Link:** [Our Workplace LLM Mass Delusion](https://blog.avas.space/llm-circus)
