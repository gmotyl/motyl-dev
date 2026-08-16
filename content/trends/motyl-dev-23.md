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
The observation that opens the piece runs against instinct. Look at what the frontier labs actually ship, and each model generation comes with fewer baked-in instructions, not more. They pull context in when it is needed instead of maintaining one large static rulebook.

The advice that follows is simple enough to use tomorrow. Let your code and your tests say how things are. Use your instructions file only to say where you want to go. And when you want the agent to follow a direction, change the structure rather than writing a paragraph about it. A new folder tells an agent which pattern is current far better than a sentence does.

## 🤖 AI

**[A Complete Guide To AGENTS.md](https://www.aihero.dev/s/S8IqdG)**
Matt Pocock looks at the same problem from the file's side. Every line in `AGENTS.md` is loaded on every single request, and a model can only follow so many instructions before it starts dropping them. So the file should be small, focused, and mostly point at other files.

The most useful tip is to describe what the project does, not where its files live. Domain terms like "organization" or "workspace" stay accurate for years. File paths go stale in a week, and a wrong path sends the agent looking somewhere that no longer exists.

**[Agentic Test Creation vs. AI Test Generation: What's the Difference?](https://hackernoon.com/agentic-test-creation-vs-ai-test-generation-whats-the-difference)**
John Vester tested the approach most of these tools use, where you paste in a ticket and get test cases back. He ran it against a mature e-commerce regression suite and counted what came out. Of the 12 cases it generated, seven already existed in the suite. Two of them tested an "Apply Discount" button that the product does not have. None were linked back to a requirement.

The model did exactly what it was asked to do. It simply had no idea what was already there.

## 🛠️ Tools

**[Introducing Kitesurf: the agent-first browser running in V8 isolates on Workers](https://blog.cloudflare.com/kitesurf/)**
Cloudflare had been asking itself whether to build a browser for years, and kept deciding against it. This time they went ahead, with a narrower goal: a browser for agents rather than for people.

It is twelve weeks old and already passes over 215,000 Web Platform Tests, with the best coverage in the areas agents actually touch, like DOM, CSS, selection and XHR. It speaks CDP, so Puppeteer, Playwright or any MCP client works once you add `browser=kitesurf` to the endpoint. It is free while in beta, and they plan to open source it.

**[use-webmcp-tool](https://github.com/GoogleChromeLabs/use-webmcp-tool)**
A React hook maintained by Chrome. It registers a WebMCP tool through `document.modelContext` and ties that tool's lifetime to the component, so the tool exists for exactly as long as the UI behind it.

What I like here is the direction. Instead of an agent reading your DOM and guessing what it can do, your page tells it directly which actions it offers. The spec is still experimental, but the hook checks whether the API exists and does nothing when it doesn't, so you can add it today without breaking anything.

## 🎨 Frontend

**[Why I don't recommend Tailwind CSS](https://en.andros.dev/blog/af3ee191/why-i-dont-recommend-tailwind-css/)**
Andros is fair to the other side, which is rare in this discussion. He gives Adam Wathan's defense its due: separation of concerns doesn't disappear when you use utility classes, it just changes direction. With semantic CSS, your stylesheet depends on your HTML. With utilities, your HTML depends on your stylesheet. Either way the two are coupled. Inside React or Vue that argument holds, because you already put markup and styles in the same file. In a server-rendered project with templates, it holds a lot less.

The conclusion is the part worth reading twice. The question is no longer utilities versus hand-written CSS. It is whether you need a utility layer at all, now that the browser gives you `@layer`, nesting, custom properties, `:has()`, container queries and `color-mix()`. Tailwind v4 is built on those same features.

**[React 19 useActionState Explained](https://hackernoon.com/p/8-5-2026-newsletter)**
A walkthrough of the hook that handles a form's pending flag, its error state and its result in a single call. It replaces the three `useState` calls and the `try/finally` that most of us have written over and over, a little differently every time. Read it together with `useFormStatus` if you still manage submission state by hand.

## 📰 Other

**[Building Your Own Things Is Cool Too](https://thoughts.jock.pl/p/building-your-own-things-is-cool-too-2026)**
An argument for building things yourself instead of assembling them from parts, and Pawel is honest about what that costs him in time.

His closing point is the one I would underline. You and I can ask Claude for the same fix, and the model will not care which of us is asking. But one of us can read that diff, judge it and push back on it. The other has to trust it. The same code comes out either way, and the two situations are not the same.

---

_Curated by [Grzegorz Motyl](https://motyl.dev). [Subscribe for weekly updates.](https://motyl.dev/#newsletter)_
