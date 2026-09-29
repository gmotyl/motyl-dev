---
issueNumber: 30
week: '2026-w39'
weekLabel: 'Week 39 (Sep 21 – Sep 27, 2026)'
image: 'https://img.motyl.dev/blog/motyl-dev-30.webp'
publishedAt: '2026-09-29'
---

# motyl.dev Weekly #30: Week 39 (Sep 21 – Sep 27, 2026)

> A curated digest of what I found worth reading this week.

Nine links came through the votes and eight made the issue. Most of them argue about size. The featured benchmark is the cleanest case, where a model that cannot write a word beat four that can, and then a small model nobody was watching beat both of them. I found the same argument in two other articles, one about open weights being good enough rather than better, one about a 4.4 KB library standing in for an entire upload pipeline. The last three links are about the things no benchmark scores, which is why an essay on engineering judgment sits next to a podcast about genome models. Capability is easy to measure. Fit is not, and fit is what most of these are actually about.

## ✨ Featured

**[Jev Cannot Write a Word. I Ran 40 Tickets Through It and Four Models That Can. It Won.](https://thoughts.jock.pl/p/jev-typesafe-system-one-model-benchmark-2026)**
Jozefiak wrote 40 support tickets, labelled every one himself for team, urgency and anger on a 0 to 4 scale, then sent the identical three questions to five models through OpenRouter with a strict JSON schema so nothing was handicapped by parsing. Jev answered in 370 milliseconds for two hundredths of a cent, ten times faster than Claude Fable 5.1 and 329 times cheaper, and it read anger better than Fable did. The headline result is not the one worth keeping. Haiku 4.5 tied Jev on anger and beat it on routing in 1.2 seconds, and GPT-6 Astra, the most expensive model in the table, finished last on both judgement questions after burning 400 output tokens on a two-line complaint. He is upfront that 40 tickets labelled by one opinionated human in Katowice measures agreement, not ground truth. The framing I will keep is the Kahneman one. Whether someone is annoyed is a System 1 question, and thinking harder about it makes you worse.

## 🧮 Good enough, priced honestly

**[Teams Are Moving from Closed-Source APIs to Open-Source Models in 2026](https://hackernoon.com/teams-are-moving-from-closed-source-apis-to-open-source-models-in-2026)**
The rare version of this argument that includes the bill. Nobody here claims open weights caught up on raw capability. The narrower claim is that they are already fine for the high-volume work agents actually do, which is retrieval, extraction, classification and routine generation. What makes it worth reading is the caveat sitting next to every benefit. Cost control only pays off when the GPU stays busy, and below high sustained utilization a hosted API is cheaper once you count engineering and operations. Data residency arrives with security, uptime and incidents attached. Dropping vendor lock-in means you now run your own evals. None of that kills the case. It prices it.

**[You don't need profile pictures anymore!](https://blobatar.dev/?via=motyldev)**
Blobatar is 4.4 KB, has no dependencies, and turns any string into a deterministic geometric avatar. A username goes in, the same blob comes out every time. It ships a React component with an optional hover animation, an editor for tuning how the traits generate, and a wall where visitors claim a cell with their own name. I am including something this small because of what it deletes. An upload endpoint, a storage bucket, a moderation policy and a fallback image all collapse into one pure function, and unlike most identicon libraries the output does not look like a QR code had an accident.

## 🧱 Layers, in two different senses

**[Using CSS Cascade Layers With Tailwind Utilities](https://css-tricks.com/using-css-cascade-layers-with-tailwind-utilities/)**
Tailwind is built on cascade layers, which most people who use it daily never touch. The default order puts utilities last so they win every fight, which means your own component CSS lives inside `@layer components` and agrees to be overridden. Zell Liew inverts it. Write your styles in an unnamed layer, or any layer declared after utilities, and your stylesheet beats the utility classes without a single `!important`. His reasons are fewer keystrokes, no bookkeeping about which layer a rule went into, and being good enough with specificity that a single flat layer does not scare him. Fair if you are the one typing. Less obviously fair on a team where half the markup arrives from an agent trained on a thousand codebases where Tailwind wins last.

**[Make a dedicated Wake-on-LAN server with Tailscale](https://hackernoon.com/make-a-dedicated-wake-on-lan-server-with-tailscale)**
The clearest explanation I have read of why the obvious thing does not work. Wake-on-LAN lives at Layer 2, a magic packet broadcast to one specific MAC address that a sleeping network card listens for. Tailscale runs at Layer 3, so it reaches your home network and still cannot speak the one language that wakes a machine sitting on it. You need something always-on and wired into that LAN which is also on your tailnet, and a Raspberry Pi over ethernet is the cheap answer because it sips power while it waits. After that it is a terminal command over Tailscale SSH, or UpSnap in a Tailscale-enabled container if you want a button you can press from a phone.

## 🧭 The part no benchmark scores

**[Why the Best Software Advice Is the Hardest to Follow](https://dev.to/remojansen/why-the-best-software-advice-is-the-hardest-to-follow-4kg8?via=motyldev)**
Two kinds of advice. Practical rules like small functions, meaningful names and no magic numbers, which are easy to teach, easy to check and easy to roll out across a company. Then judgment principles like preferring duplication over the wrong abstraction, which need experience to read and routinely contradict each other. Organisations drift toward the rules because the rules are measurable, and the measurable half is the less valuable half. Scrum against the Agile Manifesto is the comparison that will annoy people, and it is also the right one.

**[What Would You Do If You Had A Computer](https://blog.alexewerlof.com/p/what-would-you-do-if-you-had-a-computer)**
Ewerlöf ran Gemma 4 12B on a Raspberry Pi 1 with half a gigabyte of RAM, through a Go harness he wrote himself because nothing else runs on a 32-bit arm6 processor, and asked what it would do with a computer of its own. Empty system prompt, fresh session, nothing telling it to be helpful. It opened with a plan to ingest and cross-reference every scientific paper, every line of code and every historical diary, then finished on wanting to help a million people at once as a force multiplier for human potential. Nothing in the prompt asked for the assistant persona, so it came out of the weights. Worth remembering the next time you assume a bare model is a neutral one.

**[Bio-security is an AI Arms Race — Eric Nguyen (CEO, Radical Numerics)](https://www.latent.space/p/bio-security-is-an-ai-arms-race-eric)**
The setup is the OpenAI to Hugging Face attack, plus the observation that Anthropic's filters flag exactly two domains, cyber-security and biology. Nguyen's lab builds genome language models in the Evo and Evo 2 line, and the episode is about what long context, chain of thought and multimodal perception do once the tokens are DNA instead of English. He thinks defence is currently losing, and his answer is to push the frontier harder rather than slower. That is the part I am not sold on, especially when Clem Delangue is arguing in the same piece that defensive capability has to be open to keep pace. I do not think those two positions fit together as neatly as the episode suggests.

---

_Curated by [Grzegorz Motyl](https://motyl.dev). [Subscribe for weekly updates.](https://motyl.dev/#newsletter)_
