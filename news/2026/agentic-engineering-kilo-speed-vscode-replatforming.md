---
title: "Agentic Engineering at Kilo Speed: One Engineer Replatforms a VS Code Extension in a Month"
excerpt: "How a senior engineer uses tiered agent workflows to turn a six-month replatforming project into a one-month sprint, reshaping what it means to be an individual contributor."
publishedAt: "2026-03-11"
slug: "agentic-engineering-kilo-speed-vscode-replatforming"
hashtags: "#kilo-code #vscode #agents #ai #engineering #architecture #productivity #dx #workflow #generated #en"
---

## Inside Kilo Speed: How One Engineer is Replatforming a VS Code Extension in a Month

**TLDR:** A senior engineer at Kilo Code is single-handedly migrating their VS Code extension to a new CLI-based architecture in roughly a month, a project that would traditionally take a team six months to a year. He does it by running multiple AI agents in parallel using a tiered interaction model, from fire-and-forget tasks to deep pair programming sessions.

Let me paint you a picture. It is a Wednesday morning somewhere in the Netherlands. Mark IJbema sits down, opens a pull request he did not write. An AI cloud agent wrote it overnight. Before he went to bed, he told the agent to find the most critical components in a new VS Code extension that were missing screenshot tests, add them, and open a PR. That is how his day starts -- reviewing code that was produced while he slept.

This is not some hypothetical future-of-work think piece. This is how a real engineer at Kilo Code is operating right now, and the implications are worth unpacking carefully.

The project itself is a classic replatforming effort. Kilo Code has a VS Code extension that needs to be migrated from its original codebase to a new CLI built on the OpenCode server. If you have ever been through a replatforming, you know the drill. Nothing changes from the user's perspective, but everything changes underneath. The features stay the same, the behavior stays the same, but the backend, frontend code, and processing pipeline are completely different. In a traditional engineering context, you would hand this to a team and pencil in six months to a year.

Mark is about a month in, and almost done. Working solo.

Here is where it gets interesting. The reason agents are well-suited to this kind of work is that replatforming is fundamentally a mapping problem. You have a feature that works a certain way in codebase A, and you need it to work the same way in codebase B. Mark's process is disciplined: he copies the relevant files from the old codebase, has the agent describe a specific feature in extensive detail, then feeds that description into the new codebase context and says "implement this, and ask me if anything is unclear." When there are no more questions, the agent goes for it. His best example is replatforming Kilo's autocomplete suite, which was originally transplanted from the open-source project Continue. That integration originally took two months. Mark replatformed the entire thing in approximately four hours, most of which was the agent running while he worked on something else.

Now, what I find genuinely worth paying attention to here is the tiered approach to agent interaction. Mark breaks his work into three tiers based on how much attention a task needs. Tier one is fire and forget -- straightforward tasks where he sets the job running and reviews the result on GitHub later. He noticed a directory was accidentally being committed to a PR, told the agent to remove it, add it to gitignore, and create a new PR. One prompt, no attention required. He describes it as something he would have given to an intern a year ago. Tier two is check in occasionally -- more complex background tasks where he steers every half hour or so, like work he would assign to a junior engineer. Tier three is pair with the agent -- the hardest work where he is conversational rather than directive, iterating together rather than trying to one-shot it. Like pairing with a senior engineer. This is not a taxonomy someone invented in a blog post. This is a working mental model from someone who is shipping production code this way every day.

One thing the article surfaces that I think many teams are sleeping on is configuration work. You know, the fiddly kind with a lot of sequential steps, often waiting two minutes between each one. Setting up an S3 clone locally, for example. Mark finds agents excel at this because they can just iterate until it works. The agent runs a command, reads the output, adjusts, tries again. It does not get distracted, it does not check its phone, it does not wander off to Slack. What makes this work is any feedback mechanism the agent can use to detect and correct its own errors -- a linter, a compiler, a test runner. If you have tight feedback loops in your development environment, you have an environment that agents can navigate.

But here is the part the article somewhat glosses over, and I want to push on it. Mark says he does not think there are any tasks he would not do with an LLM. The question is not whether a task belongs to a human by default, but rather finding the right scope. Some complex work requires more guidance and smaller steps. Some easy work you can just let go. That is a reasonable position, but what is missing from this picture is the failure mode discussion. What happens when the agent confidently ships something that is subtly wrong in a way the test suite does not catch? When you are running five agents in parallel and reviewing their output, your review quality necessarily decreases compared to reviewing one colleague's work. The article presents a success story, and it is a genuine one, but I would love to hear more about the times things went sideways.

What I do find compelling is the idea of encoding preferences into agent behavior. Mark builds up an AGENTS.md file over time. Any time he corrects the agent for the same thing twice, he writes a rule. Always create a draft pull request for a new commit. Create a new commit rather than amending, so the full history is visible on GitHub. Do not claim you are absolutely right about something. These rules serve to make the agent's work resemble collaboration with a teammate, so the version history is captured in Git rather than trapped on Mark's local machine. This is essentially building institutional knowledge into your agent configuration, and it is the kind of practice that will separate teams who use agents effectively from those who just throw prompts at them.

The broader implication here is about how the role of the individual contributor is changing. Mark describes his typical workday as running a team: one or two harder tasks that need his attention, three or four running in the background, a Slack message to an agent when something comes in that would have previously required a full context switch. He has moved from being an individual contributor to effectively being a team lead of multiple agents. And this changes the nature of discussions among teammates, because standups are now concentrated on work at a much higher level than before.

Mark puts it well when he compares software engineering to gardening rather than building. You can say take care of that, remove that weed. That is much closer to how it feels to interact with an agent. It is a good metaphor, but I would add that gardens also need someone who understands the soil composition, the seasonal patterns, and which plants are going to crowd each other out. The gardener's knowledge matters more, not less, when you have automated tools doing the weeding.

**Key takeaways:**
- Replatforming is an ideal use case for agentic engineering because it is fundamentally a mapping problem -- same features, different implementation context
- A tiered interaction model (fire-and-forget, check-in occasionally, pair closely) helps calibrate the right level of attention per task
- Configuration and sequential setup tasks are a surprisingly strong fit for agents because tight feedback loops enable self-correction
- Encoding preferences and corrections into persistent rule files like AGENTS.md builds institutional knowledge that compounds over time
- The role of individual contributor is shifting toward team lead of agents, changing the altitude of team discussions and standups

**Tradeoffs:**
- Running multiple agents in parallel increases throughput but reduces review depth per task
- Delegating more to agents increases velocity but requires clear articulation of intent -- ambiguous prompts produce ambiguous results
- Encoding agent rules builds consistency but creates maintenance overhead as the rule set grows

**Link:** [Inside Kilo Speed: How One Engineer is Replatforming Our VS Code Extension in a Month](https://blog.kilo.ai/p/inside-kilo-speed-how-one-engineer-52c)
