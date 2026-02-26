---
title: "GLM-5 vs MiniMax M2.5: Real Coding Benchmarks Beyond the Leaderboard Hype"
excerpt: "A hands-on benchmark of two new open-weight AI coding models across bug hunting, legacy refactoring, and API implementation reveals very different strengths."
publishedAt: "2026-02-25"
slug: "glm5-vs-minimax-m25-real-coding-benchmarks"
hashtags: "#kilo-code #ai #llm #typescript #architecture #testing #benchmarks #code-quality #performance #generated #en"
---

## MiniMax 2.5 vs. GLM-5 across 3 Coding Tasks: Who Wins When Models Actually Write Code?

**TLDR:** Kilo Code tested GLM-5 and MiniMax M2.5 on three real TypeScript coding tasks -- bug hunting, legacy refactoring, and building an API from spec. GLM-5 scored 90.5/100 with superior architecture and testing, while MiniMax M2.5 scored 88.5/100 but finished in half the time with better instruction adherence.

### Summary

The team at Kilo Code put two new open-weight models through something far more interesting than yet another synthetic benchmark leaderboard. They created three actual TypeScript codebases and let GLM-5 and MiniMax M2.5 work autonomously -- up to 23 minutes at a stretch -- without any human hand-holding. Both models score near GPT-5.2 and Claude Opus 4.6 on SWE-bench Verified, but the question is what happens when you stop measuring cherry-picked metrics and start measuring real engineering judgment.

The three tests were brilliantly designed. Test 1 planted 8 bugs across 11 files in a Hono/Prisma/SQLite task API -- race conditions, SQL injection, JWT vulnerabilities, memory leaks -- and told the models to find and fix them with minimal changes. Test 2 handed them callback-hell Express code and asked for modernization. Test 3 gave them a full OpenAPI 3.0 spec with 27 endpoints to implement from scratch. Both models found all 8 bugs, but the quality divergence was telling: MiniMax M2.5 followed the "minimal changes" instruction carefully, documented every fix, and preserved API contracts. GLM-5 went deeper on architecture, used industry-standard libraries like express-validator, created custom error classes, and wrote 94 test cases versus MiniMax's 13. But GLM-5 also broke an API endpoint path, demonstrating the classic over-engineering trap.

What the authors dance around but never quite say is this: the 2-point score difference is almost meaningless. What matters is the behavioral profile. GLM-5 is the architect who rewrites your module when you asked for a bug fix. MiniMax M2.5 is the careful maintainer who documents everything but skips edge cases. Neither profile is universally better -- it depends entirely on whether you are greenfielding or maintaining. The fact that MiniMax had a critical authorization bug in the from-scratch test (checking project membership against task IDs) while GLM-5 had zero bugs there tells you exactly which model to reach for when.

For architects and teams evaluating these models: the real insight is not the scores but the execution time and behavioral defaults. MiniMax finished in 21 minutes total versus GLM-5's 44 minutes. If you are running these models in CI pipelines or developer workflows, that time difference compounds fast. The article suggests you can override default behaviors with better prompts, which is true, but it also means your prompt engineering cost varies by model. A model that needs less steering for your use case is worth more than a model that scores 2 points higher on a test you will never run.

One thing notably absent from this analysis: cost per task. Both models are described as "a fraction of the cost" of frontier models, but the article never breaks down actual token usage or pricing. For a benchmark article published by the tool vendor itself, that omission is worth noticing. The test harness is also their own product, Kilo CLI, which makes this as much a product showcase as a benchmark. That does not invalidate the results, but it does mean you should weight the methodology with that context in mind.

### Key takeaways

- GLM-5 scored 90.5/100, excelling at greenfield implementation with comprehensive test coverage (94 tests vs 13) and standard architectural patterns
- MiniMax M2.5 scored 88.5/100, excelling at existing code maintenance with better instruction adherence and documentation, completing tasks in half the time
- Both models ran fully autonomously for extended periods without human intervention or course correction
- GLM-5 broke an API contract during refactoring by changing an endpoint path -- a reminder that "better architecture" and "safer changes" are different skills
- MiniMax M2.5 had a critical authorization bug in from-scratch implementation, suggesting it is weaker at building complex permission systems
- The behavioral defaults of models matter more than small score differences -- knowing whether a model tends to over-engineer or under-test helps you write better prompts
- SWE-bench scores (80.2% and 77.8%) do not predict which model will follow instructions more carefully or preserve API compatibility

### Tradeoffs

- **Thoroughness vs speed:** GLM-5 took twice as long but delivered shippable code with full test coverage; MiniMax M2.5 was faster but left gaps in testing and validation
- **Architectural ambition vs contract preservation:** GLM-5 builds better abstractions but risks breaking existing interfaces; MiniMax M2.5 preserves contracts but produces less maintainable patterns like inline authorization checks
- **Vendor benchmark bias vs real utility:** The test was run by Kilo Code using their own CLI tool, which provides useful data but should be weighed against independent benchmarks

**Link:** [MiniMax 2.5 vs. GLM-5 across 3 Coding Tasks](https://blog.kilo.ai/p/we-tested-glm-5-and-minimax-m25-across)
