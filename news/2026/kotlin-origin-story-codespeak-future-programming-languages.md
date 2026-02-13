---
title: "Kotlin's Origin Story and the Future of Programming Languages in the AI Era"
excerpt: "Andrey Breslav, the creator of Kotlin, shares the untold history of the language and introduces CodeSpeak, a new language designed for LLM-driven development."
publishedAt: "2026-02-12"
slug: "kotlin-origin-story-codespeak-future-programming-languages"
hashtags: "#kotlin #programming-languages #android #codespeak #ai-coding #developer-tools #language-design #jvm #ide #llm #generated #en"
---

## The Programming Language After Kotlin -- With the Creator of Kotlin

**TLDR:** Andrey Breslav, creator of Kotlin, sits down to discuss the surprisingly scrappy origins of Kotlin, the design decisions he still regrets, and his new venture CodeSpeak -- a programming language that uses concise English descriptions to replace boilerplate code in the age of AI agents.

**Summary:**

This is one of those conversations where you walk away seeing an entire technology ecosystem differently. Andrey Breslav created Kotlin, a language that now sits at the heart of Android development and has carved out serious territory on the JVM. But the story of how it got there is far messier and more human than you might expect.

Let us start with the origin. Kotlin was born because Java just stopped moving. Between 2004 and 2014, Java essentially stagnated on language features. No lambdas, no properties, nothing that made developers' daily lives easier. Meanwhile, C# was lapping it with modern conveniences. Andrey saw that gap and went for it. But here is the part that surprised me: the very first version of Kotlin was not even a compiler. It was an IDE plugin. He built it on top of IntelliJ's parsing infrastructure so he could demo the language interactively before it could compile a single line of code. That is a brilliant product move -- showing the experience of using a language before the language actually works. And the initial team? Mostly recent graduates, many of whom were Andrey's former university students. That is a powerful reminder that you do not need decades of experience to build something foundational. You need curiosity, speed, and the willingness to learn.

The technical design decisions are fascinating, especially when Andrey gets honest about the tradeoffs. Kotlin borrowed the angle-bracket hack from C# to keep generics looking familiar, even though the grammar ambiguity is technically unresolvable -- they just handle it ad hoc in the parser. Smart casts, one of Kotlin's most beloved features, were inspired by an obscure language called Gosu. After you check `if (x is String)`, Kotlin just treats `x` as a `String` inside that branch. No redundant cast. Under the hood, the algorithm is complicated, but the result is enormous noise reduction. And then there is Andrey's biggest regret: removing the ternary operator. He dropped it because `if` was already an expression, which freed up `?` and `:` for nullable types. But `if` as an expression turns out to be verbose in practice, and by the time he agreed it was a mistake, it was too late to retrofit. That is the kind of honest reflection you rarely hear from language designers.

The Android story is almost comically accidental. An Android developer simply asked, "Does Kotlin work on Android?" The team checked, and their toolchain crashed. It turned out the Android JVM was stricter than standard JVM because, as Andrey put it, Android developers "actually read the spec." Fixing those issues made Kotlin's bytecode more correct overall, and Android became a natural proving ground.

Now Andrey is building CodeSpeak, and this is where things get really interesting for anyone thinking about the future of programming. CodeSpeak is not a formal language, and it is not just prompting. It is designed for engineers and aims to shrink typical application code by roughly ten times. The idea is that what remains is "the essence of software engineering" -- only the things the human uniquely knows, because everything else, the machine already knows. He is betting that keeping humans in control of the development lifecycle matters even more as AI becomes more capable. Andrey also predicts 2026 will be the year IDEs make a comeback against terminal-based tools, arguing that while Claude Code is "a complete breakthrough," developers ultimately work better inside specialized, agent-first environments.

What is missing from this conversation, though, is a hard look at CodeSpeak's actual adoption path. Language creation is one of the hardest things in software -- Kotlin succeeded largely because of JetBrains' distribution muscle and the fortunate Android partnership. CodeSpeak does not have that kind of built-in ecosystem yet. Andrey also waves away some of the real concerns about AI coding tools with "just learn to use them better," which underestimates the structural changes happening in how engineering teams are organized and valued. The question is not just whether individual engineers can be productive with AI tools, but what happens to the profession's knowledge pipeline when junior roles shrink.

**Key takeaways:**
- Kotlin was created because Java stagnated for six years between 2004 and 2010, leaving a clear opening for a modern JVM language
- The first Kotlin prototype was an IDE plugin, not a compiler -- a clever product strategy that let the team demo the language before it could compile anything
- Smart casts, one of Kotlin's most popular features, were inspired by the obscure language Gosu
- Removing the ternary operator is Andrey's biggest language design regret -- it was too late to add back once the syntax was established
- Kotlin's Android support happened by accident when a developer asked if it worked and the toolchain crashed, revealing stricter JVM compliance requirements
- CodeSpeak aims to reduce application code by roughly ten times by replacing boilerplate with concise English descriptions
- Andrey predicts 2026 will see IDEs stage a comeback against terminal-based AI coding tools, with new environments built for agent-first workflows

**Link:** [The programming language after Kotlin -- with the creator of Kotlin](https://newsletter.pragmaticengineer.com/p/the-programming-language-after-kotlin)