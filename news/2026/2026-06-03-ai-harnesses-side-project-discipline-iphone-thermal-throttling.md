---
title: "AI Harnesses, Side Project Discipline, and the iPhone That Melts Mid-Scan"
excerpt: "Three HackerNoon pieces on giving AI coding agents guardrails, keeping AI-assisted side projects alive past week one, and surviving thermal throttling in real-time AR."
publishedAt: "2026-06-03"
slug: "ai-harnesses-side-project-discipline-iphone-thermal-throttling"
hashtags: "#hackernoon #ai #agents #ios #performance #architecture #generated #en"
source_pattern: "HackerNoon"
---

## AI Coding Tip 022: Give AI a Harness to Work With

**TLDR:** The argument is that you should install a harness before you prompt, not after. The structure you put in place first, a committed baseline, a stated test requirement, clear boundaries, is what turns an impulsive AI into something steerable. Skip it and you get plausible code with no way to tell whether it broke anything.

**Summary:** This one opens on a scene every one of us recognizes by now. You open a fresh chat, type a bare prompt, and let the model go. No committed baseline, so you have nothing to diff against. No test requirement stated, so the AI optimizes for looking finished rather than being correct. The author's point is that the failure happens before the first token, not in the generation itself. You set the AI up to fail by giving it no walls to work inside.

The harness idea is borrowed straight from how we already think about test harnesses and CI. You decide up front what "done" means, you pin a known-good state in version control, and you tell the agent the constraints it must respect. Then the prompt becomes a request to operate inside boundaries rather than an open invitation to rewrite whatever it feels like touching. It reframes the model from a creative free agent into a collaborator that has to stay in bounds. That framing matters because the most expensive AI mistakes are not the obvious broken builds, they are the quiet behavioral changes that pass review because nobody had a baseline to compare against.

I like the discipline here, but I want to push on what the author skips over. A harness is only as good as the tests and the baseline behind it, and most teams adopting AI coding tools have neither in good shape. If your test suite is thin, the harness gives you a false sense of safety, the AI stays inside walls that do not actually catch regressions. The piece treats the harness as a setup ritual, but the real work is the unglamorous part nobody wants to do, writing the tests and curating the baseline first. There is also no discussion of cost. Forcing every AI interaction through a full harness slows the fast iterative loop that made people reach for these tools in the first place, and the article does not weigh that tradeoff.

**Key takeaways:**
- Set the structure before prompting: committed baseline, stated test requirement, explicit boundaries.
- A bare prompt with no baseline means you cannot tell whether the AI broke something.
- The harness reframes the agent as a constrained collaborator rather than a free rewriter.

**Why do I care:** As an architect, this maps directly onto how I want AI agents wired into a team's workflow. The lesson is not "prompt better," it is "make your repo enforce correctness so the agent physically cannot ship a silent regression." That means CI gates, a green baseline, and test requirements expressed as constraints the agent reads. If your codebase already has that, AI tooling slots in cleanly. If it does not, the harness conversation is really a prompt to fix your test discipline first, and that is a more honest takeaway than the article quite admits.

**Link:** [AI Coding Tip 022 - Give AI a Harness to Work With](https://hackernoon.com/ai-coding-tip-022-give-ai-a-harness-to-work-with)

## How to Keep Massive AI-Assisted Side Projects on Track

**TLDR:** The author argues that with AI coding tools, writing code is the easy part. What kills side projects is losing direction across context gaps between sessions. The fix proposed is a repo-native coordination layer that preserves intent and state so you can pick up where you left off without re-explaining everything.

**Summary:** The honest confession up top is that most of this author's side projects die in a week. Not because the code was hard, AI handles that, but because the thread of what they were actually building snapped the moment they stepped away. That is the real problem with AI-assisted building. Each new session starts cold, the model has forgotten the plan, and you have forgotten which decisions were deliberate versus accidental. The cost is not writing code, it is preserving direction across context loss.

The solution is described as a coordination layer that lives inside the repository itself, not in your head and not in a chat history that scrolls away. Keeping the plan, the open decisions, and the current state as committed files means the project's memory survives between sessions and survives the AI's amnesia. When you come back after a gap, you and the agent both read the same source of truth instead of reconstructing it. The author is careful to say what it is not before explaining what it is, which suggests this is a lightweight convention rather than a heavyweight framework. I did not get the full mechanics from the newsletter blurb, but the shape is clear, treat project context as a first-class artifact you version alongside the code.

What the piece seems to underweight is that this is an old idea wearing new clothes. We have called it design docs, ADRs, README-driven development, and running notes for decades. What is genuinely new is that the AI is now a consumer of those documents, not just future-you. That changes the incentive, suddenly the discipline pays off on the very next prompt instead of six months later when someone asks why a decision was made. The author leans on personal anecdote, my projects die in a week, which is relatable but thin as evidence. I would want to see whether this survives a project with more than one contributor, because a repo-native coordination layer that one person maintains by hand tends to rot the moment a second person stops updating it.

**Key takeaways:**
- The hard part of AI-assisted building is preserving direction across sessions, not generating code.
- A repo-native coordination layer keeps plan, decisions, and state as committed files.
- Both you and the AI read the same source of truth on resuming, instead of reconstructing context.

**Why do I care:** This is the side-project version of something I push on real teams, write your context down where the tools can see it. For frontend and full-stack work especially, where an AI agent might touch routing, state, and styling in one go, having committed decision records means the agent stops re-litigating choices you already made. The practical move is to keep a short, living document of intent and constraints in the repo and point your agent at it every session. It is cheap, it survives context windows, and it is the difference between a side project that ships and one that dies on Tuesday.

**Link:** [How to Keep Massive AI-Assisted Side Projects on Track](https://hackernoon.com/how-to-keep-massive-ai-assisted-side-projects-on-track)

## What Happens When You Max Out an iPhone: Thermal Throttling in Real-Time AR

**TLDR:** A lead iOS engineer explains how thermal throttling quietly breaks real-time AR on iPhones, why the ProcessInfo.thermalState API is the signal you must watch, and the graceful-degradation ladder built to keep a scanning app usable as the phone heats up.

**Summary:** A real-time AR scan is one of the most thermally hostile workloads you can hand a phone. The author works on an app that, at any given second, is running the camera, LiDAR depth capture, Metal rendering, and the AR tracking pipeline all at once. That combination pushes the silicon hard, and the phone responds the only way it can, by getting hot and then throttling itself. The insidious part is that throttling is silent. Your frame rate sags, tracking drifts, and the scan quality degrades, but nothing throws an error. The user just thinks your app is bad.

The hero of the piece is an API that reports the device's thermal state across four levels, from nominal up through serious and critical. Treating that signal as a real input rather than a curiosity is the whole game. Instead of pretending the phone has infinite headroom, the author built what he calls a graceful-degradation ladder. As the thermal state climbs, the app steps down its own ambition, dialing back capture frequency, rendering detail, or processing load at each rung so it stays usable and responsive instead of stuttering into uselessness or triggering an OS-level shutdown. Each rung does something specific, the system reads the current thermal state and matches it to a level of fidelity the hardware can actually sustain.

The broader lesson reaches well past AR. Any compute-heavy mobile experience, on-device machine learning, video processing, games, eventually hits the same wall, and most apps ignore it until users complain about heat and battery. The discipline of reading the platform's own throttling signals and adapting proactively is rare and valuable. Where I would challenge the author is on the user experience of degradation itself. Stepping down fidelity keeps the app running, but it silently changes what the user gets, and the piece does not say much about how you communicate that, or whether scan results captured in a throttled state are still trustworthy. There is a real product question hiding under the engineering one, a half-quality scan that completes might be worse than an honest "let your phone cool down" prompt.

**Key takeaways:**
- Real-time AR stacks camera, LiDAR, Metal, and tracking simultaneously, which makes the device throttle.
- Throttling is silent: it degrades frame rate and tracking with no error to catch.
- Reading the device thermal state and stepping fidelity down a degradation ladder keeps the app usable.

**Why do I care:** The transferable idea for any frontend or app engineer is that the platform tells you when it is in trouble if you bother to listen. We do the same thing on the web with the Network Information API, reduced-motion preferences, and battery hints, then mostly ignore them. This is a clean reminder that performance is not just "make it fast on my test device," it is "degrade gracefully when the real device is hot, throttled, or on a bad connection." Architecting for adaptive fidelity, rather than a single fixed target, is the part most teams skip and then pay for in support tickets.

**Link:** [What Happens When You Max Out an iPhone: Thermal Throttling in Real-Time AR](https://hackernoon.com/what-happens-when-you-max-out-an-iphone-thermal-throttling-in-real-time-ar)
