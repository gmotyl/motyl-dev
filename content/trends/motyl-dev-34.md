---
issueNumber: 34
week: '2026-w44'
weekLabel: 'Week 44 (Oct 26 – Nov 1, 2026)'
image: 'https://img.motyl.dev/blog/motyl-dev-34.webp'
publishedAt: '2026-10-26'
---

# motyl.dev Weekly #34: Week 44 (Oct 26 – Nov 1, 2026)

> A curated digest of what I found worth reading this week.

This week I kept reading about what we hand to agents and what we should keep. Kent Beck wants to give away the toil and keep the struggle. An infrastructure engineer worries about the day the model is down and nobody remembers how to do the work. The agent identity series makes the same point about credentials, because a shared bot token hands over more than anyone meant to. Then there's Anthropic replacing Git across its monorepo, which tells you how far the handover already goes at one company. I finish with the web platform, where Nolan Lawson asks whether web components matter if agents write all the code.

## ✨ Featured

**[Take my toil, leave me my struggle](https://newsletter.kentbeck.com/p/take-my-toil-leave-me-my-struggle)**
Beck splits work into toil, which you can give to AI and lose nothing, and struggle, which is how you learn. Reformatting an old essay is toil. Three hours on a train with a proof he couldn't crack is struggle, and he came out of it knowing he could handle harder problems. It's a short essay with two anecdotes and no rule for telling the two apart, and that's the hard part on a team with juniors. I lead with it anyway, because it's the question I now ask before automating anything a junior would otherwise learn from.

## 🧠 Keeping the skill

**[What Happens When AI Stops Working and We've Forgotten How to?](https://hackernoon.com/what-happens-when-ai-stops-working-and-weve-forgotten-how-to)**
An infrastructure engineer calls it comprehension debt. Spend half an hour prompting to save half an hour of coding often enough and you lose the ability to write that code. I agree you need a plan for the day the provider is down or the $30 seat turns into usage billing. I don't agree the problem is new, since every vendor dependency works this way. The pricing claims are anecdotes about unnamed "companies", so test the skill-loss argument on your own team before you believe it.

**[Making room for hard things](https://refactoring.fm/p/making-room-for-hard-things-stories)**
Luca Rossi says the appetite for hard problems isn't a personality trait. It shows up when the rest of your life is simple enough to leave room. His picture is a jar, where sand like small chores and a hundred open tabs crowds out the big rocks, and he wants at least half your time on the rocks. The runner data he leans on is correlation he treats as cause. Still, I see this with clients. Seniors don't dodge hard work out of laziness. They're buried in tickets and meetings.

## 🔐 Agents holding real keys

**[Agent Security & Identity, Part 1](https://hackernoon.com/agent-security-and-identity-part-1-who-are-you-whos-your-agent-and-what-should-they-be-allowed) and [Part 2](https://hackernoon.com/agent-security-and-identity-part-2-who-are-you-whos-your-agent-and-what-should-they-be-allowed)**
The series starts with the bot token in a Kubernetes secret that every demo uses. GitHub sees one identity, you can't cut off one user without breaking everyone, and a prompt injection can read the token. The fix separates the subject, the human the work is for, from the actor, the agent doing it, using Zalando's MIT-licensed identity broker so the agent never touches the user's tokens. Part 2 runs it on a cluster with two users in different groups and learns the most from the denied requests. The point I'd underline is the author's own. Correct authorization says nothing about whether a tool's output is trustworthy.

**[AI Agents Are Killing the Git Client, Not Git](https://hackernoon.com/ai-agents-are-killing-the-git-client-not-git-what-anthropics-scion-and-cursors-origin-show)**
Anthropic went from about 2,500 merges a day in May to over 30,000 in September and replaced Git in its monorepo with Scion, built by seven engineers in five months. The author's split between the Git protocol and the Git client is useful, since agents are always online and get nothing from full clones. I'm skeptical of the "custom VCS pays off above 2,000 engineers" threshold, which rests on one company that writes most of its code with agents. Nobody explains who reviews 30,000 merges a day either. The practical takeaway for me is to turn on partial clones and sparse checkout before CI agents start cloning your monorepo hundreds of times a day.

## 🛠️ Building with agents

**[TanStack AI 1.0](https://tanstack.com/blog/tanstack-ai-1-0)**
A year ago this was one chat function and four providers. Now it has 23 provider adapters and eight UI frameworks, and 1.0 removes every deprecated API from the 0.x line. The new agent harness package is openly experimental, and the codemod doesn't migrate stored threads or runs, so read the guide first. I like the swap-the-adapter story for React and Vue teams. I'd still weigh the fact that three maintainers carry it.

**[React DevTools for agents](https://react.dev/reference/dev-tools/react-devtools-cdt-mcp)**
`react-devtools-cdt-mcp` gives an agent driving Chrome DevTools MCP the component tree, props, hooks and per-commit render profiles. It's a library you import before `react-dom`, not an MCP server, and dev builds only. This moves agents from writing code to debugging performance, which is the part I want help with. Before you turn it on, check whether staging props carry real user data you'd rather the agent didn't see.

## 🎨 Back to the web platform

**[Do web components have a future if nobody is writing them?](https://nolanlawson.com/2026/10/19/do-web-components-have-a-future-if-nobody-is-writing-them/)**
Lawson spent years on a web components framework and admits agentic coding weakened their main pitch. Google's Modern Web Guidance barely mentions them, and reuse matters less when a rewrite is one prompt. He keeps two cases, micro-frontend isolation and self-contained widgets like his emoji picker. He also notes the standards win, with parts and slots feeding into customizable select and popovers. I half agree. Cheap code still costs something when you maintain a hundred generated copies of one component.

**[10 Best Open Source Design Systems for Developers in 2026](https://www.shadcndeck.com/blog/open-source-design-system)**
The list covers shadcn/ui, Ant Design, Fluent, Material 3, Carbon, Primer, Cloudscape, GOV.UK, Gestalt and PatternFly, ranked by stars and downloads. That measures popularity, and the publisher sells shadcn templates. The part worth keeping is the ownership comparison. If you copy components into your repo, every accessibility fix is yours to pull in by hand. A centrally versioned system ships it in one bump. Copying works for a small product team and rarely for a big org with many apps.

---

_Curated by [Grzegorz Motyl](https://motyl.dev). [Subscribe for weekly updates.](https://motyl.dev/#newsletter)_
