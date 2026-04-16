---
title: 'Nicholas Carlini: LLMs Are Now Black-Hat Tools — And the Economics of Attacks Just Collapsed'
excerpt: 'A research scientist at Anthropic demonstrates how current LLMs can autonomously find zero-day vulnerabilities in production software, including a 23-year-old Linux kernel bug.'
publishedAt: '2026-04-16'
slug: 'nicholas-carlini-black-hat-llms-unprompted-2026'
hashtags: '#security #llm #ai #agents #unprompted2026 #generated #en'
---

### TLDR:

Nicholas Carlini from Anthropic showed at [un]prompted 2026 that today's LLMs can find real, exploitable zero-day vulnerabilities in hardened production systems — autonomously, at scale, using nothing more sophisticated than a bash loop. The demo included a SQL injection in Ghost CMS and a buffer overflow in the Linux kernel that went undetected for 23 years. The capabilities are doubling every four months.

---

## The Talk Nobody In Security Wanted to Happen

There's a category of conference talks you hope never get given, because once they exist, the genie doesn't go back in the bottle. Nicholas Carlini's presentation at [un]prompted 2026 is one of those talks. He's a Research Scientist at Anthropic, which means he spends his days thinking about how AI systems break and how they get weaponized. What he showed is not theoretical. It's not a proof-of-concept designed to impress conference audiences. It's a demonstration that the threat model for software security has fundamentally changed.

The core claim is simple to state and hard to accept: large language models are now capable of finding and confirming exploitable vulnerabilities in production software at a scale and speed that human security researchers cannot match. The "previously only possible by human adversaries" framing from the video description is actually underselling it. Most human adversaries couldn't find a buffer overflow in the hardened Linux kernel. The model did.

## Two Demos That Should Keep You Awake

The first demo involved Ghost, the Node.js-based CMS with a solid security track record. The model identified a blind SQL injection vulnerability and successfully extracted credential data. Blind SQL injection is not trivial to find — it requires probing database behavior without direct feedback, understanding what responses mean, and iterating. This is skilled attacker work. The LLM did it autonomously.

The second demo is the one that's been circulating. Carlini ran what he described as a trivial bash script across every source file in a Linux kernel repository, asked the model to identify potentially exploitable vulnerabilities, then ran a second pass to verify actual exploitability. The result was a remotely exploitable buffer overflow — in the hardened kernel — with a near-100% confirmation rate on the second pass. And buried in there was a bug introduced in 2003 that had survived two decades of human review, automated static analysis, and fuzzing. Twenty-three years of eyes missed it. The model found it in one pass.

## The Economics of Attacks Have Collapsed

Here's what Carlini is really saying beneath the demo theater: the barrier to sophisticated attacks used to be human capital. Finding a zero-day in a mature codebase required rare expertise, deep patience, and often weeks or months of work. That scarcity was a real constraint on adversaries. It kept the threat surface manageable.

That constraint is gone. The methodology Carlini described isn't sophisticated. It's a bash script and two prompts. Anyone who can run a terminal can now attempt the kind of vulnerability research that previously required senior security engineers. And the models are getting better — Carlini puts the capability improvement rate at doubling every four months. Whatever the current capability floor is, it will be significantly higher by the end of this year.

I keep thinking about what this means for the economics of targeted attacks specifically. Mass exploitation at scale via commodity vulnerabilities has always been relatively accessible. What's changed is targeted, novel exploitation. The 0-day market exists because finding new vulnerabilities in hardened software is expensive. If LLMs can produce that capability for effectively zero marginal cost, that market dynamic breaks.

## What the Security Community Needs to Do Differently

Carlini's conclusion is predictable but worth saying clearly: the security community needs to be using these same tools defensively before adversaries gain tactical advantage. That means running LLM-assisted vulnerability scanning on your own codebases now, not after the first incident. It means treating AI-assisted security review as a baseline requirement the way static analysis became baseline in the 2010s.

The uncomfortable part of this framing is that it implies most security programs are currently operating with a significant blind spot. If a model running a bash loop can find vulnerabilities that survived years of human review in the Linux kernel, what's sitting in your internal services that nobody has ever looked at with these tools?

The talk doesn't provide an easy answer to that question. There isn't one. What there is, is a clear signal that the window for getting ahead of this problem is closing fast. Models doubling capabilities every four months is not a gentle curve — it's a steep one, and the asymmetry between offense and defense only widens if defenders keep treating this as an emerging concern rather than a current operational reality.

**Link:** [Nicholas Carlini - Black-hat LLMs | [un]prompted 2026](https://www.youtube.com/watch?v=1sd26pWhfmg)
