---
issueNumber: 23
week: '2026-w31'
weekLabel: 'Week 31 (Jul 27 – Aug 2, 2026)'
image: 'https://img.motyl.dev/blog/motyl-dev-23.webp'
publishedAt: '2026-08-09'
---

# motyl.dev Weekly #23: Week 31 (Jul 27 – Aug 2, 2026)

> A curated digest of what I found worth reading this week.

If you are using AI for a while and I know that you do, then you know how important is the context that we give to the agent. The better context, the better results. First article goes into details on how important this is. This week, also a complete guide to Agents.md This is the default context file that your agent will read, and it's better to keep it short as Matt Pocock describes in his article. I myself have to admit that I haven't reviewed my agentsmd for a while, and I think this is a good opportunity to do this now, while my memory is fresh after lecture.
This week, finally, I saw some interesting articles worth reading in the front-end domain. One is controversial, I guess. I'm refering to the one about Tailwind. I myself am a huge Tailwind fan, but it's worth seeing the other point of view. I never liked styling, I have to admit, and Tailwind was a relief that I don't have to learn all those CSS tricks. But maybe indeed modern CSS is capable of handling edge cases a lot better... and we don't need tools like Tailwind any more. What do you think? 


## ✨ Featured

**[Your Agent Has Too Much Context](https://blog.kilo.ai/p/your-agent-has-too-much-context)**
The counterintuitive observation up front: look at what the frontier labs actually ship, and each model generation carries _fewer_ baked-in instructions, not more — context pulled in deliberately beats a giant static rulebook. The practical split is the part worth stealing: let code and tests be the source of truth for how things _are_, and use instructions only for where you want to go. And enforce direction with structure rather than prose — a new folder tells an agent which pattern is current far more reliably than a paragraph saying so.

## 🤖 AI

**[A Complete Guide To AGENTS.md](https://www.aihero.dev/s/S8IqdG)**
Matt Pocock on the same problem from the file's side. The instruction budget is real and it's spent on every request, so the ideal `AGENTS.md` is small, focused, and mostly points elsewhere. Best specific advice: describe capabilities, not file structure. Domain concepts ("organization" vs. "workspace") stay true for years; file paths are stale by Thursday, and a confidently wrong path sends the agent somewhere that doesn't exist.

**[Agentic Test Creation vs. AI Test Generation: What's the Difference?](https://hackernoon.com/agentic-test-creation-vs-ai-test-generation-whats-the-difference)**
John Vester ran the first-wave approach — paste the ticket, get test cases, essentially ChatGPT with a QA skin — against a mature e-commerce regression suite and counted. Of 12 generated cases, seven already existed in the suite, two exercised an "Apply Discount" button that isn't in the product, and none linked back to a requirement. The model did exactly what it was asked. It just had no idea what was already there.

## 🛠️ Tools

**[Introducing Kitesurf: the agent-first browser running in V8 isolates on Workers](https://blog.cloudflare.com/kitesurf/)**
Cloudflare shelved "should we build a browser?" for years and finally said yes, with a narrower target: not humans, agents. Twelve weeks from first commit, it already passes 215,000+ Web Platform Tests, with the agent-relevant surface — DOM, CSS, selection, XHR — covered best. It speaks CDP, so Puppeteer, Playwright, or any MCP client works by adding `browser=kitesurf` to the endpoint. Free during beta, and they intend to open source it.

**[use-webmcp-tool](https://github.com/GoogleChromeLabs/use-webmcp-tool)**
A Chrome-maintained React hook that registers a WebMCP tool via `document.modelContext` and ties its lifetime to the component — the tool exists exactly as long as the UI that backs it. The inversion is the interesting bit: instead of an agent scraping your DOM and guessing, your page hands it typed actions. Spec is still experimental, and the hook feature-detects and no-ops everywhere the API is missing, so it's safe to try now.

## 🎨 Frontend

**[Why I don't recommend Tailwind CSS](https://en.andros.dev/blog/af3ee191/why-i-dont-recommend-tailwind-css/)**
Unusually fair for the genre — it gives Wathan's defense its due (separation of concerns doesn't vanish, the arrow just reverses: your CSS depends on HTML, or your HTML depends on CSS) and concedes it holds inside component frameworks, where you'd already merged the layers yourself. The real argument lands in the conclusion: the live debate is no longer utilities vs. hand-written CSS, it's a utility layer vs. what the platform now ships — `@layer`, nesting, custom properties, `:has()`, container queries, `color-mix()`. The uncomfortable part being that Tailwind v4 is built on those same primitives.

**[React 19 useActionState Explained](https://hackernoon.com/p/8-5-2026-newsletter)**
A walkthrough of the hook that folds a form's pending flag, its error state, and its result into one call — the boilerplate three `useState`s and a `try/finally` that every form in every codebase had reimplemented slightly differently. Worth reading alongside `useFormStatus` if you're still hand-rolling submission state.

## 📰 Other

**[Building Your Own Things Is Cool Too](https://thoughts.jock.pl/p/building-your-own-things-is-cool-too-2026)**
The argument for building rather than assembling, made without romanticism — he's clear about the cost he's paying. The closing observation is the one I'd underline: you and I can both ask Claude for the same fix, and the model won't care which of us it's talking to. But one of us can read that diff, judge it, and push back; the other has to trust it. Same output, different category.

---

_Curated by [Grzegorz Motyl](https://motyl.dev). [Subscribe for weekly updates.](https://motyl.dev/#newsletter)_
