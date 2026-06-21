---
issueNumber: 16
week: '2026-w24'
weekLabel: 'Week 24 (Jun 8 – Jun 14, 2026)'
publishedAt: '2026-06-21'
image: 'https://img.motyl.dev/blog/motyl-dev-16.webp'
---

# motyl.dev Weekly #16: Week 24 (Jun 8 – Jun 14, 2026)

> A curated digest of what I found worth reading this week.

This week the conversation kept circling back to a single tension: AI accelerates the typing, but it does nothing for the thinking. From agentic code review to the architecture behind AI data centers, from model evaluations to contract-style comments that keep agents honest, the standout pieces all argue that human judgment is becoming more valuable, not less. Here's what I found worth your time.

## 🤖 AI

**[AI is code, and can't be prompted into being smarter](https://www.theregister.com/ai-and-ml/2026/06/14/ai-is-code-and-cant-be-prompted-into-being-smarter/5254141)**
A reminder that models are deterministic software, not magic, and that better prompts have limits. Real capability gains come from the system around the model, not incantations.

**[What is the A.G.E.N.T.I.C. Framework?](https://hackernoon.com/what-is-the-agentic-framework)**
A structured mnemonic for thinking about agentic system design, breaking the moving parts into something you can actually reason about and explain to a team.

**[The State of AI: Post-Training Agents](https://www.thoughtfullab.com/the-state-of-ai-post-training-agents.html)**
A survey of where post-training techniques and agent architectures stand right now, and what's driving the next wave of capability gains.

**[GLM-5.2 vs Kimi K2.7 Code: Which Model Is Better at Planning vs Building?](https://blog.kilo.ai/p/glm-52-vs-kimi-k27-code-which-model)**
A head-to-head of two open models on the split between planning and execution, useful if you're picking a model for an agentic coding pipeline.

## 💻 Coding

**[Agentic Code Review](https://addyosmani.com/blog/agentic-code-review/)**
How AI agents are reshaping the code review process, from triaging diffs to flagging subtle regressions, and where a human reviewer still needs to stay in the loop.

**[Contract-Style Comments (CSC) for the Agentic Epoch](https://hackernoon.com/contract-style-comments-csc-for-the-agentic-epoch)**
A proposal for writing comments as explicit contracts, intent, invariants, and constraints, so AI agents can edit code without breaking the assumptions a human held in their head.

**[Claude Code Works Better When You Let Sessions Die](https://hackernoon.com/claude-code-works-better-when-you-let-sessions-die)**
Counterintuitive but practical: long-running agent sessions accumulate context rot. Starting fresh often yields better results than fighting a degraded conversation.

## 🎨 Frontend

**[Creating Memorable Web Experiences: A Modern CSS Toolkit](https://css-tricks.com/creating-memorable-web-experiences-a-modern-css-toolkit/)**
A tour of the modern CSS features, scroll-driven animations, view transitions, and more, that let you build distinctive experiences without reaching for JavaScript.

## 🛠️ Tools

**[Introducing the MDN MCP server](https://developer.mozilla.org/en-US/blog/introducing-mdn-mcp-server/)**
MDN now ships an MCP server, letting your AI tools query authoritative web platform docs directly. A small but meaningful step toward agents that cite real references instead of hallucinating APIs.

**[Introducing eve](https://vercel.com/blog/introducing-eve)**
Vercel unveils eve, its latest addition to the AI-native developer tooling stack. Worth a look if you're building on the Vercel platform.

## 🏗️ Architecture

**[The Secret Architecture Behind AI Data Centers](https://newsletter.systemdesign.one/p/what-is-ai-infrastructure)**
A clear breakdown of what actually goes into AI infrastructure, the networking, power, and cooling that make large-scale training and inference possible.

## 📺 Watch

**[Kent C. Dodds interviews Grady Booch on software architecture, human judgment, and AI's limits](https://m.youtube.com/watch?v=oRjLzxg8q6A)**
This one's a treat: Kent C. Dodds sits down with Grady Booch, and it's not the easy, agreeable conversation you might expect. Grady pushes back hard, repeatedly landing on a different view than Kent, and the friction is exactly what makes it worth your time. The result is a genuinely interesting hour on where AI helps software design and where human judgment stays irreplaceable.

---

_Curated by [Grzegorz Motyl](https://motyl.dev). [Subscribe for weekly updates.](https://motyl.dev/#newsletter)_
