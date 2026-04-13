---
title: "Asking Engineers, Signal Areas, and Weekly Readings"
excerpt: "Refactoring.fm's Luca shares how qualitative listening tours complement engineering metrics, breaks down behavioral interview signal areas from a former Meta hiring chair, and rounds up three sharp reads on git history mining, AI feedback loops, and AI coaching."
publishedAt: "2026-04-13"
slug: "asking-engineers-signal-areas-weekly-readings"
hashtags: "#refactoring #engineeringmanagement #devex #generated #en"
source_pattern: "Substac"
---

## Asking Engineers Where the Friction Is

**TLDR:** Metrics tell you something is broken but not what. Luca from Refactoring.fm argues that actually talking to engineers — a structured "Listening Tour" — is the missing half of developer experience diagnostics. Most managers find that qualitative work harder than wiring up dashboards, which is exactly why it stays undone.

There is a funny irony in how engineering teams approach their own problems. We are a profession that defaults to instrumentation. We want dashboards, percentiles, DORA metrics, throughput numbers. And those things are genuinely useful — I am not dismissing them. Accelerate showed us that measurement matters. But here is the thing: a metric is a cue, not a diagnosis. When your cycle time spikes, the metric is just waving its arms at you. It does not tell you whether the problem is flaky tests, unclear requirements, a slow review culture, or the fact that one person on the team is a bottleneck for three different systems.

The answer, Luca argues, is deceptively obvious: ask the engineers. They already know where the friction is. They experience it every single day. The Listening Tour — a deliberate practice of structured one-on-one and group conversations designed to surface blockers — is what bridges the gap between your quantitative data and the actual lived experience of your team. Luca's framing here is worth sitting with: combining qualitative signal with quantitative data makes you "unstoppable," but most managers find the conversations harder than the dashboards. That asymmetry explains a lot about why devex programs stall.

I think this is right, and I would add one thing the article gestures at but does not fully develop: the listening tour only works if engineers trust that what they say will lead to action. Psychological safety is not just a nice-to-have for performance — it is the precondition for honest signal collection. If engineers suspect their feedback will be ignored or, worse, used against them, you will get polished non-answers. The infrastructure for honest conversation has to come before the conversation itself.

**Key takeaways:**
- Quantitative metrics identify that something is wrong but rarely explain why — they are lagging indicators.
- Direct conversation with engineers (a "Listening Tour") surfaces blockers that automated tooling cannot detect.
- Most managers underinvest in qualitative signal because it feels harder and less scientific than metrics.
- The combination of both — numbers and conversations — is more powerful than either alone.
- Trust and psychological safety are prerequisites for honest feedback; without them, listening tours collect noise.

**Why do I care:** As a senior frontend dev who has watched teams drown in sprint velocity charts while shipping gets slower, this framing resonates hard. Metrics are seductive because they feel objective and safe. But the bugs in your process are not always in the code paths your metrics measure. The "ask engineers" advice sounds trivially simple, and that simplicity is exactly what makes it easy to skip. If you are a tech lead or staff engineer trying to improve your team's flow, the listening tour is a concrete, low-overhead practice worth actually running.

**Link:** [Asking engineers, signal areas, and weekly readings](https://refactoring.fm/p/asking-engineers-signal-areas-and?publication_id=64099&post_id=193797604&isFreemail=true&triedRedirect=true)

---

## Behavioral Interviews as Signal Area Forecasting

**TLDR:** Austin McDonald, former hiring committee chair at Meta, breaks down behavioral interviews into three signal areas: scope and ownership, ambiguity and perseverance, and conflict resolution plus leadership. The insight that interviewers are essentially forecasters — studying past behavior to predict future performance — reframes how candidates should think about their answers.

Behavioral interviews have always been important, but the argument in this issue is that AI's effect on coding interviews has pushed them to the front of the line. When a language model can pass your LeetCode filter, the question of "how does this person actually work" becomes the load-bearing part of the process. Austin McDonald's framework is practical and worth understanding whether you are interviewing or running interviews.

The three signal areas — scope and ownership, ambiguity and perseverance, conflict resolution and leadership — map to what companies actually care about at a structural level. Scope and ownership is about whether you drive things forward without needing to be managed. Ambiguity and perseverance is about whether you can make progress when the path is unclear. The third cluster is about whether you can operate effectively inside a human system, which is to say, the actual job. These are not arbitrary categories. They reflect what goes wrong when senior engineers fail in roles: they either stop at their stated scope, freeze in ambiguous situations, or generate friction in the team.

Austin's point about follow-up questions is the sharpest observation in the piece. When an interviewer asks a follow-up, most candidates assume they want more detail. The better read is to ask yourself what signal the interviewer is probing for. Are they checking scope? Ownership? How you handled a difficult person? That metacognitive layer — thinking about what the interviewer is trying to measure, not just what they are asking — is the difference between a competent answer and a strong one. Amazon with 16 leadership principles and Meta with five structured areas represent different ends of a spectrum, but the underlying logic is the same: they are trying to predict how you will behave before they have seen you behave.

**Key takeaways:**
- Behavioral interviewers function as forecasters: past behavior is the primary signal for predicting future performance.
- Three core signal areas cover most behavioral interviews: scope and ownership, ambiguity and perseverance, conflict and leadership.
- Company-specific values (Amazon's 16 principles, Anthropic's safety orientation) layer on top of these general areas.
- Follow-up questions are probes for specific signal — treat them as diagnostic, not just as requests for more detail.
- AI's effect on coding assessments makes behavioral interviews more important, not less.

**Why do I care:** Whether you are interviewing for a staff role or helping your team prep for their next move, understanding the forecasting model behind behavioral interviews changes how you approach them. I have been on both sides of these conversations and the candidates who do well are the ones who have genuine, specific stories — not rehearsed frameworks. The signal areas give you a map for which stories to have ready, which is actually useful prep work rather than the usual "practice the STAR method" advice.

**Link:** [Asking engineers, signal areas, and weekly readings](https://refactoring.fm/p/asking-engineers-signal-areas-and?publication_id=64099&post_id=193797604&isFreemail=true&triedRedirect=true)

---

## Weekly Reads: Git History, AI Feedback Loops, and Coaching

**TLDR:** Three short reads from Luca's roundup: mining git history for team health signals, building a structured practice to feed AI session learnings back into shared team artifacts, and a thoughtful experiment in using AI for coaching versus human coaches. All three are worth your time.

The weekly reads section from this Refactoring issue is unusually strong and I want to give each piece its due rather than collapsing them into a list.

The git history piece by Ally Piechowski makes the point that version control is not just a backup system — it is a record of how your team actually works. Hotspots, bus factor, bug clusters, patterns that appear during crunch time: all of this is readable from git history with commands that are not particularly exotic. This is the kind of observability work that rarely makes it onto a roadmap but pays back in understanding your system's actual weak points.

Rahul Garg's piece on AI feedback is something I have been thinking about independently: every interaction with an AI coding tool generates signal about what the tool handles well, what context was missing, what prompts succeeded. Most teams let that signal evaporate. Rahul proposes feeding those learnings back into shared team artifacts — effectively closing the loop so the team gets better at using AI, not just the individual who happened to be in that session. This is the kind of practice that distinguishes teams that genuinely improve their AI-assisted workflows from teams that just have AI tools installed.

Cate Huston's piece on AI coaching is honest in a way that a lot of the "AI replaces X" content is not. She found that AI is genuinely useful for structured issues where you need a thinking partner or validation. But for the messy, identity-level stuff — the kind of thing where you need to feel that another person believes in you — the AI does not land the same way. That is not a failure of the AI. It is a description of what coaching actually is. The piece does not make a sweeping claim; it describes a specific experiment with specific results, which is exactly the right epistemic posture for this moment.

**Key takeaways:**
- Git history is a rich, underused source of team health signal: hotspots, bus factor, and crisis patterns are all legible from standard git commands.
- AI interaction sessions generate learnings that should be captured and fed back into team artifacts rather than staying siloed with one engineer.
- AI coaching works well for structured problems and validation; it falls short when the core need is feeling seen by another person.
- All three pieces share a common thread: structured practices for capturing signal that would otherwise disappear.

**Why do I care:** These three reads represent the kind of engineering culture work that does not show up in your framework changelog but compounds over time. The git history angle is immediately actionable — you can run those commands today. The AI feedback loop practice is something I want to formalize on any team I work with. And Cate's coaching piece is a useful corrective to the maximalist claims about what AI can replace.

**Link:** [Asking engineers, signal areas, and weekly readings](https://refactoring.fm/p/asking-engineers-signal-areas-and?publication_id=64099&post_id=193797604&isFreemail=true&triedRedirect=true)
