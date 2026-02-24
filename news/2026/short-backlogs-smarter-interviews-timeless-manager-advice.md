---
title: "Short Backlogs, Smarter Interviews, and Timeless Manager Advice"
excerpt: "A deep dive into why burning your backlog boosts velocity, how AI is reshaping engineering interviews, and evergreen leadership advice from Camille Fournier."
publishedAt: "2026-02-23"
slug: "short-backlogs-smarter-interviews-timeless-manager-advice"
hashtags: "#refactoring #backlogs #engineering-interviews #engineering-management #ai #career #generated #en"
---

## Keep Your Backlog Ruthlessly Short

**TLDR:** Long backlogs are a hidden anti-pattern that kills team morale, obscures priorities, and makes it psychologically harder to say no. The fix is radical: burn the backlog and only accept work you can ship in the next two to four weeks.

**Summary:**

Here is something most product teams get wrong, and they get it wrong in slow motion so nobody notices until it is too late. The backlog. That ever-growing, meticulously groomed, carefully prioritized list of things you will never build. It sits there like a graveyard of good intentions, and it is actively making your team worse.

Think about it from three angles. First, morale. When your backlog has two hundred items and you ship ten a month, the math is demoralizing. Your team never feels like they are making progress because the list never shrinks. Second, priorities rot. An item that made perfect sense six months ago is quietly obsolete today, but nobody goes back to check. Third, and this is the sneaky one, a long backlog actually makes it harder to say no. When someone requests a feature and you already have a hundred items queued up, what is one more? You slap a P3 on it, the requester feels dismissed, and six months later when you finally delete it, they feel dismissed again. You have managed to disappoint the same person twice.

Mary Poppendieck, who has been thinking about lean software development longer than most of us have been writing code, keeps saying the same thing: burn your backlog. Figure out your throughput, only accept that much work, and reject everything else. If you can do ten things a month, you accept ten things a month. Period.

The practical implementation here is keeping only two to four weeks of committed work. That means product managers and engineers are saying no constantly. Small feature with unclear impact? No. Hard-to-reproduce bug on a niche device? No. This is not about being dismissive. It is about being honest. Most of those rejected items either come back with better justification or turn out to have never mattered.

What the article does not address, and what I think deserves more scrutiny, is the political cost of constant rejection. Saying no is easy in a blog post. Saying no to a VP who wants their pet feature is a different conversation entirely. The discipline of short backlogs requires organizational air cover, and without that, the people doing the rejecting burn out fast.

**Key takeaways:**
- Long backlogs create an illusion of planning while actually destroying focus and morale
- Only commit to two to four weeks of work at a time — reject everything else
- Saying no to feature requests is easier when the backlog is small, not when it is large
- Items that sit in a backlog for months are almost always obsolete by the time you reach them
- The hard part is not the method; it is getting organizational buy-in for the discipline

**Link:** [Short backlogs, interview methods, and evergreen manager advice](https://refactoring.fm/p/short-backlogs-interview-methods)

---

## Engineering Interviews in the Age of AI

**TLDR:** AI has broken LeetCode and take-home assignments as reliable interview signals. The community is converging on case studies and code reviews as replacements, shifting the emphasis from raw coding to system design and collaboration.

**Summary:**

Let us be honest about the state of technical interviewing: it was already a mess before AI, and now it is a mess with an accelerant poured on top. The fundamental problem is that the things we historically tested — can you reverse a binary tree on a whiteboard, can you build a CRUD app over a weekend — are exactly the things large language models do effortlessly. Over ninety percent of LeetCode-style problems can be solved by AI tools. Take-home assignments, especially open-ended greenfield ones, have the same vulnerability.

So what actually works now? The survey and mastermind sessions with engineering managers surfaced a useful framework. Any engineering interview needs to test three things: coding skill, system design ability, and collaboration. The weights shift depending on the role, but the trend is unmistakable — pure coding is losing ground to design thinking and the ability to work with other humans.

Two methods are emerging as the strongest replacements. Case studies, where you present a real problem your team actually solved and ask the candidate to design a solution live. This is powerful because it tests system design, trade-off reasoning, and communication simultaneously. You get to see how someone thinks under realistic constraints, not artificial ones. The second is code review exercises, where you hand the candidate a pull request and ask them to review it. It is faster than a take-home, generates rich technical discussion, and reveals taste and judgment in a way that writing code from scratch does not.

What I find missing from this analysis is the acknowledgment that these newer methods have their own failure modes. Case studies can be gamed by experienced candidates who pattern-match against common architectures. Code reviews test a specific skill that not every great engineer excels at. And both methods are heavily biased toward candidates who communicate well in English (or whatever the working language is), which may filter out brilliant engineers who are simply quieter or less practiced at verbal reasoning.

The career highlight story as a closing technique is a nice touch though. Letting candidates narrate their best work gives them agency and surfaces qualities that structured exercises miss.

**Key takeaways:**
- LeetCode and take-home assignments are no longer reliable signals due to AI capabilities
- Case studies using real team problems test design, trade-offs, and communication simultaneously
- Code review exercises reveal engineering judgment faster than building from scratch
- The weight is shifting from "can you code" to "can you design and collaborate"
- Career highlight stories give candidates a chance to show depth that structured formats miss

**Tradeoffs:** Replacing coding exercises with case studies and code reviews trades one set of biases for another. You gain better signal on system thinking but may lose signal on hands-on implementation skill. The interview process needs to be calibrated for the specific role — a senior architect benefits from case studies, but a junior developer still needs to demonstrate they can write working code.

**Link:** [Short backlogs, interview methods, and evergreen manager advice](https://refactoring.fm/p/short-backlogs-interview-methods)

---

## Camille Fournier's Evergreen Advice for Engineering Managers

**TLDR:** Camille Fournier, author of The Manager's Path, distills engineering management down to four pillars: build relationships at every level, stay technical enough to ask sharp questions, remember you represent the company, and never stop being curious.

**Summary:**

There is a reason The Manager's Path remains one of the most recommended books in engineering management years after publication. Camille Fournier has a way of cutting through the noise and getting to what actually matters, and her four pieces of advice here are deceptively simple.

The first pillar is relationships, and she breaks it into three directions. Downward: your reports have to want to work for you. Laterally: your peers and other teams have to want to work with you. Upward: your superiors have to want you working for them. This sounds obvious, but most managers optimize for only one direction. The ones who focus exclusively on keeping their team happy often struggle with cross-team alignment. The ones who focus on managing up lose the trust of their reports. The magic, and the difficulty, is doing all three simultaneously.

The second pillar is staying technical. Not writing code every day, but maintaining enough depth to ask good questions and understand the answers. This is the perennial debate in engineering management — how technical should a manager be? — and Fournier's framing is pragmatic. You do not need to be the best engineer in the room. You need to be able to follow what the best engineer in the room is telling you and push back intelligently when something does not add up.

The third pillar is the one most managers resist: you are a representative of the company. When leadership decides something needs to happen, your job is to drive it. This does not mean being a mindless executor, but it does mean that chronic resistance to organizational direction is a career-limiting move.

The fourth pillar is curiosity. Talk to managers at other companies. Build external networks. Challenge your own assumptions. This is the one that atrophies fastest as people get busy and comfortable, and it is arguably the one that matters most for long-term growth.

What I think is understated here is the tension between pillar three (represent the company) and pillar one (build trust with your reports). Sometimes the company makes decisions your team disagrees with. How you navigate that tension — being honest with your team while still driving execution — is where management becomes genuinely hard.

**Key takeaways:**
- Invest in relationships in all three directions: reports, peers, and superiors
- Stay technical enough to ask sharp questions, not necessarily to write production code
- Accept that you represent the company and your job includes driving organizational priorities
- Build external networks and stay curious to avoid stagnation
- The hardest part of management is navigating the tension between company loyalty and team trust

**Link:** [Short backlogs, interview methods, and evergreen manager advice](https://refactoring.fm/p/short-backlogs-interview-methods)