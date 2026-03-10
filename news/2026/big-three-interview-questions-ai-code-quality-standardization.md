---
title: "The Big Three Interview Questions, AI Code Quality Reality Check, and When Standardization Actually Matters"
excerpt: "Behavioral interview essentials, why AI might actually improve code quality if used intentionally, and the real cost of skipping early standardization."
publishedAt: "2026-03-09"
slug: "big-three-interview-questions-ai-code-quality-standardization"
hashtags: "#substack #interviews #ai #code-quality #engineering-management #standardization #generated #en"
---

## The Big Three Behavioral Interview Questions, AI Code Quality, and the Standardization Trap

**TLDR:** This edition of Refactoring covers three topics: the three behavioral interview questions you will almost certainly face, why AI might actually raise code quality rather than destroy it, and a former CTO's hard-won lessons about when to standardize and when to stay flexible.

**Summary:**

Let's start with the interview prep portion, because this is genuinely practical. Luca Rossi breaks down the three questions that show up in virtually every behavioral interview. The first one is so common it has its own acronym: TMAY, or "Tell Me About Yourself." The advice here is solid and refreshingly specific. Keep it to under two minutes, hit your personal summary, highlight two or three accomplishments, and end with a forward-looking statement that connects your experience to the role you are pursuing. It is a cold open, and you need to nail it because it sets the entire tone for the conversation.

The second question is some variation of "tell me about your biggest project," and the third is about navigating a difficult or high-stakes situation. For both of these, the advice boils down to: pick the story with the most impact and the highest personal involvement, structure your answer thematically so a complex narrative stays followable, and unless you are an exceptional storyteller, pick a story where you ended up being right. That last point is interesting because it implicitly acknowledges something most interview advice dances around — interviewers are human, and a story with a clean resolution lands better than one where you learned a lesson from failure, despite what everyone claims.

Now here is where I want to push back a little. The article frames behavioral interviews as almost entirely about presentation and story selection. What is missing is any discussion of how interviewers actually evaluate these responses. The assumption seems to be that if you prepare the right stories and deliver them well, you will succeed. But behavioral interviews are notoriously inconsistent in how they are scored across companies, and a great answer at one company can fall flat at another depending on the rubric. That nuance is absent here.

Moving on to AI and code quality, this is the most provocative section. The dominant narrative right now is that AI-generated code is fast but sloppy, full of bugs, and hard to control. Luca argues that this framing misses the bigger picture. AI is not just a code generator — it is also excellent at reasoning about existing code, catching code smells, identifying security vulnerabilities, and enforcing team-specific conventions. Tools like CodeScene, Codacy, and Packmind are already enabling quality standards that would be nearly impossible to maintain with a purely human team.

The claim that AI is "shifting code quality further left" is compelling. Static analysis checks that used to live in CI/CD pipelines are becoming real-time suggestions in the IDE, and some are now MCP servers that steer AI-generated code before you even save the file. Luca reports maintaining roughly 9.5 out of 10 code quality on his own projects using these tools.

But here is what the article skips over: who is measuring that quality, and by what standard? A CodeScene score is a useful signal, but it is not the same as code that is maintainable by a team over years, or code that handles edge cases gracefully under production load. The article treats AI code quality tools as if they are objective arbiters of quality, when in reality they are measuring adherence to patterns, which is a subset of what makes code genuinely good. The deeper question — whether AI-assisted code leads to better long-term system outcomes — remains unanswered and unasked here.

Finally, there is a solid segment on standardization, drawn from a conversation with Rob Zuber, former CTO of CircleCI. His biggest regret was not standardizing early enough, which became extremely expensive to fix later. He draws a useful distinction between decisions that are cheap early but expensive later — like programming language choices, core infrastructure patterns, and CI/CD processes — versus decisions that stay cheap throughout, like developer environment preferences and some agile practices.

The most insightful quote from Zuber is this: if you are good at giving stakeholders what they need before they know they need it, you will have all the freedom in the world. If you are not, people will come make choices for you. His argument is that excessive standardization is often a defensive reaction to poor communication between engineering and the rest of the business. The real fix is not more rules — it is better communication. That is a mature take, and it challenges the instinct many engineering leaders have to reach for process when relationships break down.

**Key takeaways:**

- The three most common behavioral interview questions are Tell Me About Yourself, describe your biggest project, and describe a high-stakes challenge — prepare specific stories for each
- Keep your TMAY response under two minutes with a clear structure: personal summary, accomplishments, forward-looking statement
- AI is not just a code generator — it is increasingly effective as a code quality enforcer through real-time static analysis and convention checking
- Code quality tools powered by AI are shifting checks further left, from CI/CD pipelines into the IDE and even into the code generation process itself
- Standardize early on programming languages, infrastructure patterns, and CI/CD — these decisions are cheap early and expensive to change later
- Keep flexibility on developer environments and team-specific agile practices
- Excessive standardization is usually a symptom of poor stakeholder communication, not a solution to engineering problems

**Tradeoffs:**

- Standardizing early locks in decisions when you have the least information about what your system will need, but waiting makes changes exponentially more expensive as the system grows
- Using AI for code quality enforcement can raise the baseline but may create a false sense of security if teams treat automated scores as a proxy for genuinely good software design
- Behavioral interview preparation optimizes for presentation over substance, which works within the current system but does not address the fundamental limitations of behavioral interviews as an evaluation method

**Link:** [The big three questions, AI code quality, and standardization](https://refactoring.fm/p/the-big-three-questions-ai-code-quality)
