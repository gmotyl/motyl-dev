---
issueNumber: 38
week: '2026-w48'
weekLabel: 'Week 48 (Nov 23 – Nov 29, 2026)'
image: 'https://img.motyl.dev/blog/motyl-dev-38.webp'
publishedAt: '2026-11-23'
---

# motyl.dev Weekly #38: Week 48 (Nov 23 – Nov 29, 2026)

> A curated digest of what I found worth reading this week.

Most of what I read this week assumes the agent writes the code and asks what's left for us. Harjot Gill says that's reviewing whole releases, not diffs. A two-day site rebuild says it's deciding what shouldn't exist. An overnight agent loop on Decoding AI says it's budgets and credentials the agent can't touch. Then there's the plumbing. Gateways, rule engines and a remote GPU all keep a model on a leash, and an FBI alert about ARTEX shows what attackers do with the same tools. I close with cost, jobs, and a method for writing requirements, because cheap code makes all three matter more. And at the very end, a desk robot that tells you when Claude Code is done.

## ✨ Featured

**[Software factories and code reviews with Harjot Gill](https://newsletter.pragmaticengineer.com/p/software-factories-and-code-reviews)**
The CodeRabbit founder pushed over 5,000 PRs last month and puts his personal AI bill at $250k to $275k, about $150 per PR. His line is that human code review is dead and human review is alive: engineers look at whole releases, plans and results, and the agent proves its own work with TLA+ models, deterministic simulations, cloud API emulators and flagged rollouts it watches itself. I don't buy the spend as a model for anyone else. CodeRabbit sells to AI-native teams, so its AI bill doubles as market research, and nobody in the interview asks who maintains code that no one reads. The verification stack is the part worth stealing, and you can add most of it to a normal frontend pipeline without the quarter-million.

## 🧪 Checks the agent can't skip

**[Top 10 things AI gets wrong in web development](https://developer.chrome.com/blog/top-10-things-ai-gets-wrong-in-web-dev?hl=en)**
Philip Walton at Google says frontier agents pass about half of the web best-practice checks on their own, and fail most on accessibility, performance and security. With Modern Web Guidance installed they reach about 90%. Those numbers come from Chrome's own tests, so take them as a pitch. The failure list matches what I see in agent-written components, and putting guidance in context is about the cheapest fix there is.

**[My Claude Code Workflow: Lessons From Rebuilding a Website in Two Days](https://hackernoon.com/my-claude-code-workflow-lessons-from-rebuilding-a-website-in-two-days)**
An Astro to Next.js 16 rebuild with 228 rewritten posts, 543 tests and a rule that every indexed URL keeps returning 200. The best part is a deletion. The agent built a versioned JSON API with OpenAPI docs, quickly and well, and the author removed all of it because it added about 500 static pages with no SEO value. The agent couldn't tell him the API shouldn't exist. I agree with his rule to write constraints down before the first prompt. It's much harder on a team, where nobody holds the full list of what's indexed.

**[Build Durable, Secure Long-Running Agents](https://www.decodingai.com/p/build-durable-secure-long-running-agents)**
His first run burned through $10 of OpenRouter credits in six rounds and lost the work. The rebuild, CodeClimb, puts the limits in a TypeScript orchestrator instead of the prompt. That means 26 rounds, 24 hours, $120 per night, $2.50 per experiment, and a metering proxy that holds the real keys while the sandbox gets a one-time token. A separate agent scores each experiment, because coding agents cheat on their own tests. This works because GraphRAG quality has numbers attached. In most frontend work I can't measure quality that cleanly, so I'd copy the budgets and the proxy first.

## 🔒 Fences around the agent

**[9 Best Agent Gateways](https://dev.to/hadil/9-best-agent-gateways-4hia?via=dailydev)**
Nine gateways for agent traffic over MCP and A2A, from open-source Bifrost to Kong, Bedrock AgentCore and Azure's preview. Bifrost gets the most space and claims 11 microseconds of overhead at 5,000 requests per second on one t3.xlarge. That number means nothing when the agent waits seconds for the model anyway. What I'd ask a vendor is who owns the policies, what the audit log looks like and what happens when the gateway goes down.

**[My Local AI Agent Needed a Bigger Brain, So I Gave It a Decentralized GPU](https://hackernoon.com/my-local-ai-agent-needed-a-bigger-brain-so-i-gave-it-a-decentralized-gpu)**
A LangGraph agent keeps a 2B model locally and rents a 27B one from Nosana for planning. Only model calls leave the laptop. The graph, routing, 25 tools and confirmation gates stay home, so the remote model can propose deleting a file but only the author's machine runs it. I like the split. But the shell command tool still has no confirmation gate, and a remote model choosing shell arguments is a hole, not a feature.

**[mozaik-rule-engine on GitHub](https://daily.dev/posts/smMoefadv)**
A TypeScript rule engine for changing what an agent does mid-loop. You define conditions and commands with standard decorators and combine them into prioritized rules. The example is a real problem: block an edit if another agent changed the file since it was read. Declarative rules are easier to review than ifs scattered through a loop. I'd want to see it with forty rules before I trusted it.

**[When Everything Goes Offline](https://techtiff.substack.com/p/fbi-artex-warning-ai-security-prompts)**
The FBI put out a FLASH alert on ARTEX, an open-source Go tool where a team of agents runs an intrusion from recon to data theft, mostly on DeepSeek Flash. The repo came down on October 8, but forks and a paid PRO version are still around, and the FBI counted over 1,600 exposed control panels. TechTiff's advice is practical: revoke stale OAuth grants, turn on passkeys, and ask your coding agent to scan for secrets and missing server-side auth. Just check what the agent reports, because it gets things wrong too.

## 🗂️ Agents with a desk job

**[How I Built an AI Executive Assistant That Does the Work of 2.3 People](https://hackernoon.com/how-i-built-an-ai-executive-assistant-that-does-the-work-of-23-people)**
123 scheduled automations for €464 a month. The savings are mostly estimated hours, and only three tasks have measured volume, so I'd skip the ROI table. The failure stories are better. One job reported success for 48 days while its key was rejected, and the day 70% of jobs went red was a laptop that wasn't plugged in. His fix is a cloud watchdog that treats silence as failure. Anyone running a handful of crons should do the same.

**[For us, AI is finally delivering](https://refactoring.fm/p/for-us-ai-is-finally-delivering)**
Luca Rossi says that for the first time, agents raised the quality of his small team's work without loading anyone more. Every person has a chief-of-staff bot, every business area has a manager bot, and every product has a PM bot, with a human owner above each area. He says he no longer reads the code because CodeScene and Codacy gate it, though several of those tools are partners. There are no defect numbers and nothing on token cost. I'd try one area bot on a design system before believing the whole setup.

**[Tutorial: build an AI agent that handles customer support](https://theaibreak.substack.com/p/tutorial-build-an-ai-agent-that-handles)**
A Claude Project with three files and four scheduled tasks reads the support inbox, drafts replies from your help notes, and puts anything about money, legal or angry customers in front of you. Each run ends with a report that names the email it's least sure about. That's the pattern I'd take for any agent: a fixed role, explicit escalation rules, and stated confidence. It drafts in Gmail and never sends, which is the right call, since the tutorial never says what happens when it files a refund under "done".

## 💸 Cost, roles and scope

**[Inference engineering for software engineers](https://newsletter.pragmaticengineer.com/p/inference-engineering-for-software-engineers)**
Uber cut cost per token about 50% by moving to open models, Pinterest 90%, AT&T 56%. Most teams rent from an inference provider rather than buy B200s like Revolut, and switching is often just a new base URL. Two numbers stuck with me. Anthropic's stated uptime is 99.5%, a long way from the four nines we expect from cloud, and an average task costs $5.46 on Sonnet 5.5 against about $2 on Kimi K3. You can't act on either without your own evals. The piece leans on three providers, so it tilts toward renting.

**[Is AI Really Creating New Jobs? Data From 12 Countries Suggests Otherwise](https://hackernoon.com/is-ai-really-creating-new-jobs-data-from-12-countries-suggests-otherwise)**
Job ads from 12 countries, July to October 2026. Outside engineering, an "AI" title usually means the old job plus one duty: bring AI into how the team works. Four months is too short to call it a trend, and job ads aren't hires. Still, next time someone offers you an AI title, ask what changes in your week.

**[▶️ Video: Functional Requirements in System Design Interviews: 5-Step Method](https://www.youtube.com/watch?v=2M-toJuKlYY)**
Sketch the screens, pull actions from them, chain the actions into flows, clean up the list, cut the scope. If you can't point at the screen or system step a requirement comes from, you guessed it. System Design Lab pitches it for interviews, but I'd read product specs this way, and it starts from screens, which is home turf for frontend people. It's also the skill the two-day rebuild says agents don't have.

## 🤖 Off the screen

**[Lamp by Autonomous](https://www.autonomous.ai/lamp?utm_source=motyl-dev&utm_medium=editorial&utm_campaign=lamp-indie-nov26)**
Autonomous got in touch after my Nov 8 post about giving Pavilio's Claude Code and Codex agents a voice. Nobody paid for this mention. Lamp is a $599 desk robot with a camera, microphones, a speaker and five motors, and it runs [lampOS](https://github.com/autonomous-ai/lampOS), which is Apache-2.0. You pick the agent, from Claude Code, Codex, Hermes, OpenCode and a few others, and lampOS gives it the hardware. What got my attention is the Harness bridge. It sends coding tasks to agents already running on your paired computer and reads the results back to you, and a stock skill tells you out loud when Claude Code or Codex finishes. I built exactly that for Pavilio with a speaker and a TTS model. I haven't had a Lamp on my desk yet. Inference can still go to remote services depending on your setup, so I'd check where the data from a camera that remembers faces ends up before putting one next to my monitor.

---

_Curated by [Grzegorz Motyl](https://motyl.dev). [Subscribe for weekly updates.](https://motyl.dev/#newsletter)_
