---
title: "A Pragmatic Guide to LLM Evals for Developers"
excerpt: "An expert-led guide on moving beyond 'vibe-check development' to a systematic, data-driven approach for evaluating and improving LLM applications."
publishedAt: "2025-12-02"
slug: "a-pragmatic-guide-to-llm-evals-for-devs"
hashtags: "#pragmaticengineer #substack #ai #llm #evals #testing #engineering #cicd #generated #en"
---

## A pragmatic guide to LLM evals for devs

**TLDR:** This article provides a developer-focused guide to Large Language Model (LLM) evaluations, arguing against "vibes-based development" in favor of a rigorous, data-driven workflow. It introduces a flywheel of improvement: analyze, measure, improve, and automate, using techniques like error analysis, code-based evals, and the "LLM-as-judge" pattern.

**Summary:**
The article tackles a critical challenge in AI engineering: how to reliably test and verify non-deterministic LLM-based applications. The author, in collaboration with ML expert Hamel Husain, deconstructs the common but flawed practice of "vibe-check development," where developers ship changes based on a few successful-looking manual tests (LGTM or "looks good to me"). This approach is fragile because it fails to systematically measure quality or prevent regressions. The core problem is framed by three "gulfs": the Gulf of Comprehension (understanding model behavior at scale), the Gulf of Specification (aligning prompts with intent), and the Gulf of Generalization (ensuring reliability on new data).

To bridge these gulfs, the article advocates for a battle-tested workflow rooted in **error analysis**. Instead of starting with generic metrics like "helpfulness," teams should begin by systematically reviewing their own interaction traces. This involves a bottom-up process of "open coding" (writing descriptive notes on failures) and "axial coding" (grouping those notes into themes). By building a simple custom data viewer, teams can efficiently annotate hundreds of traces, identify the most frequent failure modes with a pivot table, and create a data-driven roadmap for improvements. This ensures engineering efforts are focused on real, high-impact user problems, not abstract or unactionable scores.

Once failure modes are identified, the guide distinguishes between two types of evaluators. For objective, deterministic tasks (like extracting a date from a sentence), it recommends **code-based evals**. These function like traditional unit tests, asserting that the LLM's output for a given input matches an expected value in a "golden dataset." They are cheap, fast, and ideal for CI/CD pipelines to catch regressions. For more subjective, nuanced problems (like deciding when to hand off a conversation to a human), the article introduces the **LLM-as-judge** pattern. This involves creating a dataset where a human domain expert provides a binary PASS/FAIL judgment and, crucially, a detailed critique explaining their reasoning. This dataset then becomes the raw material for training an AI evaluator that can automate the expert's judgment at scale.

For engineering leaders and architects, this pragmatic guide provides a clear methodology for instilling rigor into the AI development lifecycle. It emphasizes that building a simple, custom internal tool for data viewing is often the highest-ROI investment a team can make. The "flywheel of improvement"—Analyze, Measure, Improve, Automate—offers a repeatable loop that transforms LLM development from guesswork into a disciplined engineering practice. By starting with error analysis on their own data, teams can build meaningful evaluations that directly correlate with user satisfaction and drive a continuous cycle of quality improvement. The article makes a strong case that evals are not just a testing mechanism, but a core component of the entire development and production monitoring pipeline.

**Key takeaways:**
- "Vibes-based development" is a trap; a systematic evaluation process is necessary for building reliable LLM applications.
- Error analysis (open and axial coding) is a high-ROI activity to discover and prioritize real failure modes from your own data.
- Use code-based evals for objective, deterministic failures and integrate them into your CI/CD pipeline.
- Use an "LLM-as-judge," trained on expert-labeled data with binary PASS/FAIL judgments, for subjective and nuanced evaluations.
- A custom data viewer is a critical internal tool that dramatically speeds up the error analysis process.

**Link:** [A pragmatic guide to LLM evals for devs](https://newsletter.pragmaticengineer.com/p/evals?publication_id=458709&post_id=180519145&isFreemail=true&triedRedirect=true)
