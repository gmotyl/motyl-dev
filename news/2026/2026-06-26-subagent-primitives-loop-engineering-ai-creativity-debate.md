---
title: "Subagent Primitives, Loop Engineering, and the AI Creativity Debate"
excerpt: "A roundup of ideas from HackerNoon covering AI agent architecture, the death of prompt engineering, focus as environment design, PowerShell and Markdown as unlikely friends, and a sharp look at the A24 AI controversy."
publishedAt: "2026-06-25"
slug: "subagent-primitives-loop-engineering-ai-creativity-debate"
hashtags: "#HackerNoon #agents #architecture #typescript #powershell #productivity #llm-ops #generated #en"
source_pattern: "HackerNoon"
---

## The Race to Build the Right Subagent Primitive

**TLDR:** Subagents are becoming one of the most important primitives in agentic systems, but there is no consensus yet on how to implement them correctly. Everyone is building them differently, and that fragmentation is the real story.

**Summary:** When you start building agents that do real work, you quickly realize that a single agent looping through tasks is not the architecture you want. You want composable, specialized subagents that a coordinator can dispatch. That idea sounds clean on paper. The reality is that every major framework, every agentic harness, approaches this differently. Claude Code does it one way. LangGraph does it another. CrewAI has its own take. There is no shared primitive, no standard interface, no agreed-upon handshake between a parent agent and its children.

The author, writing under the handle @anson, makes a point that I think is genuinely important: because subagent tooling is so fragmented, orchestrators cannot assume anything about how their subagents behave. You cannot rely on a consistent context window handoff, consistent error reporting, or consistent cancellation semantics. This is not just a developer experience problem. It is an architecture problem, and it compounds badly at scale.

What is being avoided here, though, is the harder question of whether standardization is even desirable at this stage. The diversity of implementations might actually be healthy. Different use cases have radically different latency tolerances, context requirements, and failure modes. A one-size-fits-all subagent primitive could calcify the wrong abstraction early. That said, the lack of any interoperability story is a real cost, and the industry is going to have to reckon with it.

The framing of "harness engineering" as its own discipline is worth noting. We spent years talking about prompt engineering as a standalone skill. Now we are already past that, talking about the structural engineering of the systems that run prompts. That is progress, even if it comes with new complexity.

**Key takeaways:**
- Subagent implementations vary widely across frameworks, making interoperability nearly impossible today
- The absence of a standard primitive means orchestrators must defensively account for different agent behaviors
- Harness engineering, the discipline of designing the scaffolding around LLM calls, is becoming its own specialty
- Fragmentation may be premature to fix, but the cost of ignoring it grows with system complexity

**Why do I care:** As someone who thinks a lot about system architecture, this is the conversation I want the industry to be having. We spent 18 months obsessing over which model to call. The real leverage now is in how you structure the calls, how you route failures, how you chain context across agents without blowing your token budget. Subagent design is where agentic systems either become reliable or become a mess of retry logic and silent failures.

**Link:** [The Race to Build the Right Subagent Primitive](https://hackernoon.com/the-race-to-build-the-right-subagent-primitive)

---

## Prompt Engineering Is Dead. Long Live Loop Engineering

**TLDR:** Prompt engineering as a standalone skill is being replaced by loop engineering, the practice of designing the control flow, feedback loops, and retry strategies that surround LLM calls. The author argues this is where the real leverage lives now.

**Summary:** Roma Armstrong, writing from the perspective of an AI architect, makes a claim that will irritate some people: the era of carefully crafted one-shot prompts is over. Not because prompts do not matter, but because prompts are now just one node in a larger system. What matters is how you structure the loop around that node.

The argument is that agentic systems are feedback systems. You send a prompt, you get a response, you evaluate that response, you decide what to do next. The quality of that decision logic, the conditions under which you retry, reroute, escalate, or terminate, determines the reliability of your system far more than the wording of any individual prompt. Armstrong calls this loop engineering, and I think the framing is accurate even if the name is a bit fresh.

What the article does not say loudly enough is that loop engineering is just control flow engineering applied to probabilistic systems. Developers who have written retry logic, circuit breakers, or state machines already know most of what loop engineering requires. The novel parts are handling the inherent non-determinism of LLM outputs and managing context across iterations without letting the prompt balloon.

The piece is honest about one uncomfortable truth: most people building agentic systems today are not doing loop engineering deliberately. They are doing it accidentally, adding retries and conditional branches as they go, without a principled framework. That produces systems that work in demos and fall apart in production.

**Key takeaways:**
- Prompt quality matters less than the control flow that surrounds your LLM calls
- Loop engineering means designing explicit feedback, evaluation, and branching logic for agentic systems
- Most developers are already doing ad-hoc loop engineering without realizing it
- Non-determinism is the fundamental challenge that separates loop engineering from classical control flow

**Why do I care:** This maps directly to how I think about building reliable tooling. The systems that have survived production are not the ones with the best prompts. They are the ones where someone thought carefully about what happens when the model gives you something unexpected, which it will. If you are building anything agentic, read this, then go look at your retry logic and ask yourself if you designed it or just accumulated it.

**Link:** [Prompt Engineering Is Dead. Long Live Loop Engineering](https://hackernoon.com/prompt-engineering-is-dead-long-live-loop-engineering-or-fractera-blog)

---

## There Are Two Ways To Make Something Better

**TLDR:** Every improvement strategy falls into one of two camps: incremental iteration or radical replacement. Matt Trifiro argues these are not just different speeds, they are fundamentally incompatible approaches that require different organizational commitments.

**Summary:** Matt Trifiro, editor of The Intent Layer, opens with a deceptively simple observation: there are two ways to make something better, and they do not get along. One is to iterate, to take what exists and improve it step by step. The other is to replace, to start from different assumptions and build something new. Both cost more than doing nothing. But they carry entirely different risk profiles, and treating them as interchangeable is an expensive mistake.

The iteration path is safe in the sense that you always have a working system. You are never starting from zero. The feedback loops are tight. But iteration is also constrained by the original design decisions baked into whatever you started with. You can optimize a horse-drawn carriage indefinitely and never get a car. The replacement path breaks that constraint. It lets you rethink assumptions. But it introduces the very real risk that you build something that does not work, does not get adopted, or solves the wrong problem.

What I find sharp about this piece is the organizational implication. Companies default to iteration because it feels responsible. It is measurable, it is reversible, and it does not require admitting that the current thing is fundamentally limited. Replacement requires someone with enough authority to say the current direction is a ceiling, not a floor. That conversation is politically harder than any technical challenge.

The article does not spend enough time on the third option, which is knowing when to do neither. Sometimes the right move is to stop improving something and let it die. But the two-path framework is still a useful forcing function for teams that are stuck.

**Key takeaways:**
- Iteration and replacement are not the same kind of bet, and confusing them leads to misallocated effort
- Iteration is bounded by original design assumptions, replacement removes those bounds but adds execution risk
- Organizations default to iteration because it is politically safer, not because it is strategically correct
- Choosing between them requires honest assessment of whether existing assumptions are a ceiling

**Why do I care:** Every large frontend codebase I have worked with eventually hits this exact decision. Do you migrate the component library incrementally, or do you blow it up and rebuild with current patterns? The teams that got this right were the ones who named the decision explicitly and chose deliberately. The ones that got it wrong were the ones who kept iterating past the point where iteration could still help.

**Link:** [There Are Two Ways To Make Something Better](https://hackernoon.com/there-are-two-ways-to-make-something-better)

---

## A24's AI Backlash Is an Old Creative Argument in New Clothes

**TLDR:** When A24 used AI to assist with storyboarding, the creative community pushed back hard. Vanna W argues this reaction is not new, it is the same argument that appeared when photography threatened painting, when digital editing threatened film, and when sampling threatened composition.

**Summary:** Vanna W, a Developer Relations Engineer at IBM, takes a deliberately historical lens to the A24 controversy. The film studio reportedly used AI-generated storyboards in its production process, and the response from parts of the creative community was sharp. The author's point is that the emotional structure of this backlash is identical to dozens of previous creative technology disputes.

Photography did not kill painting. It changed what painting was for. Digital audio workstations did not kill musicians. They changed what musicianship looked like. Each time, the initial reaction was that machines were replacing human judgment, that the thing being automated was the thing that carried the real value. And each time, the argument eventually resolved not by one side winning, but by the definition of craft shifting.

What I think the article handles well is the distinction between using AI as a tool within a creative process versus using AI to replace the judgment that makes creative decisions meaningful. Storyboarding is a specific skill, but it is also a thinking tool. A storyboard is how a director externalizes their spatial reasoning about a scene. If AI can generate a rough storyboard faster than a human, the question is not whether that is cheating. The question is whether the director is still doing the thinking, or whether they are accepting AI output as a substitute for it.

The author does not fully resolve this, and I am not sure it is resolvable in the abstract. Context matters. Who is making the creative decisions, and what are they outsourcing? Those are the real questions, and they do not have universal answers.

**Key takeaways:**
- Creative backlash to AI follows a well-established historical pattern seen with every major creative technology
- The meaningful question is not whether AI is used, but whether human creative judgment remains in the loop
- Craft definitions shift over time in response to new tools, this is not a failure of the field
- A24's situation highlights how process transparency matters as much as the tools themselves

**Why do I care:** As someone who builds tools for developers, I think about this constantly. There is a version of AI-assisted coding where the developer is still thinking, still making architectural decisions, still understanding what the code does. And there is a version where the developer is a prompt writer who ships output they do not fully understand. One of those is using AI to do your work better. The other is something I am less comfortable calling engineering.

**Link:** [A24's AI Backlash Is an Old Creative Argument in New Clothes](https://hackernoon.com/a24s-ai-backlash-is-an-old-creative-argument-in-new-clothes)

---

## Markdown and PowerShell Are a Surprisingly Good Match

**TLDR:** PowerShell has a built-in Markdown parser that makes it straightforward to build a tiny static site generator in just a few lines of script. The author MrPowerShell walks through the combination and why it works better than you would expect.

**Summary:** MrPowerShell, a self-described platform engineer and polymath, opens with a statement I agree with completely: Markdown is everywhere, and it is everywhere because it is simple and it works. Plain text, minimal syntax, readable even before rendering. What the piece argues is that PowerShell is an underrated companion for working with Markdown files, partly because the language has native Markdown parsing built in via the ConvertFrom-Markdown cmdlet, and partly because PowerShell's pipeline model maps naturally onto the kind of file-processing work that static site generation requires.

The walkthrough is practical. You loop over a directory of Markdown files, convert each one to HTML, write the output to a corresponding file, and you have a static site generator. No Node runtime, no build toolchain, no npm install. Just PowerShell and the file system. For documentation sites, internal wikis, or any context where you want to turn a folder of Markdown into browsable HTML without pulling in a full framework, this is a legitimate option.

Where the article falls a little short is in not addressing the limitations head-on. ConvertFrom-Markdown does not support frontmatter, does not handle relative link rewriting, and does not have a templating story out of the box. For a real static site generator you need all of those things. What you get here is the core rendering loop, which is a fine foundation, but the gap between that and a usable tool is real work.

That said, the broader point about PowerShell as a general-purpose scripting environment for text and file processing deserves more attention than it gets. PowerShell runs on Linux and Mac now. It is not just a Windows administration tool. If you are already running scripts in PowerShell, adding Markdown processing to that workflow is genuinely low friction.

**Key takeaways:**
- PowerShell includes a native ConvertFrom-Markdown cmdlet that handles basic HTML conversion without external dependencies
- Building a minimal static site generator in PowerShell requires very little code if you only need core rendering
- The approach has real limits: no frontmatter parsing, no link rewriting, no templating out of the box
- PowerShell is cross-platform now and more capable as a general scripting environment than its reputation suggests

**Why do I care:** I have a soft spot for tools that do one thing with minimal ceremony. The best internal documentation tooling I have seen is often the kind that runs without a build step. If your team writes Markdown and you need to publish it somewhere, a 20-line PowerShell script that converts and copies files is a perfectly reasonable solution. You do not always need Astro.

**Link:** [Markdown and PowerShell Are a Surprisingly Good Match](https://hackernoon.com/markdown-and-powershell-are-a-surprisingly-good-match)

---

## Focus Is Not Willpower. It's Environment Design

**TLDR:** Matt Trifiro argues that the ability to focus deeply is not a character trait you either have or lack. It is an outcome of the environment you work in, and environments are designable.

**Summary:** This is the second piece from Matt Trifiro in this newsletter, which tells you something about his output rate. The focus article tackles a problem that most knowledge workers have internalized as a personal failing: the inability to do deep work for sustained periods. Trifiro's reframe is that if you are unable to focus, the problem is probably not your discipline. It is your environment, and unlike discipline, environments can be engineered.

The argument draws on some familiar territory. The Eisenhower Matrix gets a mention. Meeting fatigue comes up. AI burnout, the specific exhaustion that comes from working in a context where tools are changing faster than you can learn them, gets named as a distinct phenomenon worth accounting for. None of this is new ground, but the synthesis is clean.

What I find genuinely useful in the piece is the framing around defaults. Most work environments are designed for availability, not for focus. They optimize for response time. Slack, email, open-plan offices, meetings scheduled in 30-minute fragments, these are all environment features, and they all work against sustained attention. Changing them requires treating your working conditions as a system with intentional design choices, not as a neutral backdrop you have to overcome through willpower.

The article is light on specifics for actually redesigning your environment, which is where most of these pieces run out of useful advice. It diagnoses well and prescribes vaguely. But the core reframe, from personal failure to system design problem, is one that I think a lot of developers in high-interruption environments genuinely need to hear.

**Key takeaways:**
- Inability to focus is more often a system problem than a character flaw
- Environments that optimize for availability actively work against deep work
- AI burnout is a real and distinct form of cognitive overload worth naming separately
- Improving focus requires intentional redesign of working conditions, not more willpower

**Why do I care:** I have watched very capable engineers get steadily less productive as their communication load increased and their uninterrupted work time shrank. The answer is never to tell them to focus harder. It is to protect the conditions that make focus possible. That is a management and architecture decision, not a personal one.

**Link:** [Focus Is Not Willpower. It's Environment Design](https://hackernoon.com/focus-is-not-willpower-its-environment-design)

---

## Augmented Reality and Web3: The Infrastructure Waiting for Its Moment

**TLDR:** The first wave of AR-Web3 convergence failed not because the vision was wrong but because the infrastructure was not ready. The author argues the infrastructure has now caught up, and a second wave is forming.

**Summary:** This piece, written by @quinnhillerich and featuring OVR as a case study, takes a revisionist look at the AR-Web3 space. The first wave of companies trying to build at this intersection ran into a consistent set of problems: hardware was too expensive and too limited, latency was too high for real-time spatial experiences, and blockchain transaction costs made micro-interactions economically impractical. The vision of persistent, user-owned digital overlays on physical space was coherent. The execution environment was not ready for it.

The author points to OVR as an example of a company that survived the first wave by building a working business model rather than relying purely on speculative infrastructure. That distinction matters. Companies that bet everything on infrastructure being ready by a certain date largely did not make it. Companies that found near-term utility while the infrastructure caught up had a better survival rate.

The core claim is that compute, connectivity, and hardware have all improved enough that a second attempt is viable. Spatial computing hardware from Apple and others, lower latency networks, and more mature smart contract tooling have removed some of the blockers that killed first-wave companies. Whether that is enough is genuinely unclear, but the analysis of why the first wave failed is solid.

What the article avoids is engaging with the user adoption problem, which is not primarily an infrastructure problem. People need compelling reasons to wear or carry AR hardware in daily life. The infrastructure being better does not automatically create those reasons.

**Key takeaways:**
- The first AR-Web3 wave failed on infrastructure, not vision, hardware, latency, and costs were all limiting factors
- OVR stands out as a survivor by building a real business model rather than waiting for infrastructure to mature
- Improved spatial computing hardware and networks have removed some first-wave blockers
- User adoption remains a separate, unsolved problem that better infrastructure alone does not address

**Why do I care:** From a web architecture perspective, the question of what spatial computing does to the frontend stack is interesting and underexplored. If persistent AR overlays become real, the rendering and state management problems are genuinely novel. But I am skeptical of timelines here. The infrastructure argument has been made before, and the missing piece has never been just the infrastructure.

**Link:** [Augmented Reality and Web3: The Infrastructure Waiting for Its Moment](https://hackernoon.com/augmented-reality-and-web3-the-infrastructure-waiting-for-its-moment)
