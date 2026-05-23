---
title: "Grok Build 0.1 in the Wild: Eight More Website Experiments Worth Watching"
excerpt: "Kilo Code's team ran another round of website-building tests with xAI's Grok Build 0.1, this time focusing on interactivity, design quality, and whether the generated code actually holds up."
publishedAt: "2026-05-22"
slug: "grok-build-01-website-experiments-round-two"
hashtags: "#ai #devtools #grok #llmcoding #websitegeneration #generated #en"
source_pattern: "Kilo"
---

## Grok Build 0.1 Builds Eight More Websites — And Most of Them Actually Work

**TLDR:** The Kilo Code team ran a second round of website experiments using Grok Build 0.1, generating eight different sites from scratch. The model handled interactivity, animations, multi-step workflows, and live API calls with a surprising degree of correctness. This is a follow-up to their first batch of five experiments.

**Summary:**

Round two of Kilo's Grok Build 0.1 experiments covers a wider range of complexity than the first batch. The team wanted to see how the model handles real interactivity — not just static HTML with some CSS — and they looked at the generated source code to verify things were actually wired up correctly, not just faked.

The parrot website is probably my favorite of the bunch. On click, the parrot animates, a speech bubble appears and fades out cleanly, copy-to-clipboard works with a graceful fallback for older browsers, and the speech synthesis fires with tweaked pitch and rate to sound actually parrot-ish. That last detail is the kind of thing you don't expect from a single prompt. Someone — or something — thought about that.

The Pomodoro timer is the kind of thing that's easy to get 80% right and hard to get the rest of the way. Grok got it all: start, pause, resume, reset, completion chime, and auto-advance to the next phase, including the long break after every fourth focus session. That's a real state machine, not a setTimeout that increments a number. There's a meaningful difference, and it matters for usability.

What stands out across all eight examples is that the model went beyond the literal prompt in several places. The moon hotel website got a headline the team didn't ask for: "view of forever." The model decided a moon hotel needed that. I actually love this. It's the difference between a tool that fills in blanks and one that has some sense of the thing you're building. Whether that's taste or statistical pattern matching, the output is better for it.

The weather app is a nice technical win too. It hit Open-Meteo's free forecast endpoint with correct coordinates and a sensible parameter list, mapped WMO weather codes into three distinct states with separate icons, and set the timezone correctly. That's not trivial to get right in a single pass — I've seen experienced developers botch the WMO code mapping.

**Key takeaways:**

- Grok Build 0.1 correctly implemented a full Pomodoro state machine including long-break logic after four sessions
- The moon hotel site featured an uninstructed marketing headline, showing the model adds contextual creative choices beyond the literal prompt
- CRT effect implementation used real CSS techniques: phosphor glow via text-shadow, repeating scanlines, a sweeping highlight band on CSS animation, opacity flicker, and a radial vignette
- A fake GitHub profile page correctly toggled follower counts up and down when follow/unfollow was clicked, and the sponsor modal handled tier selection with a thank-you state
- A live weather app hit a real API endpoint, parsed WMO weather codes, and mapped them to icons correctly
- A dashboard with Chart.js rebuilt the graph dynamically on time-range changes, and filter pills correctly narrowed a payments table

**Why do I care:**

What I'm watching here isn't the demo quality — it's the correctness rate. Most AI-generated UI demos look fine on the surface and fall apart when you click anything. This batch is different. The team explicitly looked at the source code and tested every interactive piece, and most things held up. For a senior frontend developer evaluating whether to add Grok Build 0.1 to a workflow, that matters far more than screenshots. If the model can reliably implement a Pomodoro state machine from scratch — including the edge cases — and correctly call an external API with proper parameters, it starts to feel like a genuine pair programmer rather than an autocomplete system. I'm not throwing away my judgment, but I am paying attention.

**Link:** [Grok Build 0.1 Website Experiments: Round Two](https://blog.kilo.ai/p/grok-build-01-website-experiments?publication_id=4363009&post_id=198842545&isFreemail=true&triedRedirect=true)
