---
title: "Designing AI Evaluators That Actually Catch What Breaks"
excerpt: "Stop vibe-checking your AI apps. Learn how to build evaluators grounded in business outcomes — from code-based checks to LLM judges, multi-turn conversations, and agentic workflows."
publishedAt: 2026-03-03
slug: designing-ai-evaluators-that-actually-catch-what-breaks
hashtags: "#substack #ai #llm #testing #architecture #generated #en"
---

# Designing AI Evaluators That Actually Catch What Breaks

**TLDR:** Generic NLP metrics like ROUGE and BLEU give perfect scores to outputs that are factually wrong and miss the user's actual question. The key is designing evaluators grounded in your specific business outcomes — using code-based checks for deterministic criteria and LLM judges with detailed rubrics for subjective quality, then layering multi-turn and agentic evaluation strategies on top.

---

## The Evaluation Illusion: Why Your Metrics Are Lying to You

Here is something that will sound painfully familiar to anyone who has shipped an AI-powered feature: you build what you think is a comprehensive evaluation suite. You have ROUGE scores, BLEU scores, semantic similarity metrics — the full NLP textbook. Then you run it against production traces and discover something deeply unsettling. The evaluators give perfect scores to responses that are factually wrong, miss the customer's actual question, and use completely the wrong tone. Meanwhile, they penalize perfectly valid responses simply for using different words than the reference answer.

This is the core tension in AI evaluation today, and Paolo Perrone's article from the Decoding AI series tackles it head-on. The fundamental insight is that generic metrics optimize for academic benchmarks, not business outcomes. A high MMLU score does not mean your AI handles your refund policy correctly. Benchmarks test general capability — you need to test your specific use case.

The article lays out a structured framework starting with the evaluation harness — the infrastructure that runs evals end-to-end. Think of it like pytest for AI apps. It loads your dataset, executes your agent on each test case, captures outputs and traces, runs your graders, and aggregates scores. The critical point here is that the harness is separate from the evaluators themselves. The evaluators decide what "good" means; the harness handles running everything at scale. Popular options include Opik, Braintrust, LangSmith, and Promptfoo, but the author argues you can build a minimal harness in about 100 lines of Python. The hard part is not the infrastructure — it is assembling the right context for each task.

From there, the article walks through three grading strategies: direct scoring (evaluating a single output in isolation), pairwise comparison (picking which of two outputs is better), and reference-based evaluation (comparing against a gold standard answer). Each has its sweet spot. Direct scoring works when you have clear absolute quality criteria. Pairwise comparison is powerful because LLMs are genuinely better at ranking than absolute scoring — but watch out for position bias, verbosity bias, and self-enhancement bias. Reference-based evaluation is ideal when you have ground truth answers, but the trap is that exact match metrics penalize valid variations.

What I find most valuable here is the practical honesty. The author does not just present these approaches as equally valid options. He is clear that you should always try code-based checks first — they are fast, cheap, deterministic, and easy to debug. Only reach for LLM judges when code cannot capture what you need to measure. That is a refreshingly pragmatic stance in a space that loves to over-engineer things.

**Key Takeaways:**
- Generic NLP metrics (ROUGE, BLEU) often do not correlate with actual user satisfaction — validate any metric against human judgment before optimizing for it
- Always prefer code-based evaluators for deterministic criteria (tool calls, format checks, required elements, prohibited content) before reaching for LLM judges
- Three grading strategies serve different needs: direct scoring for absolute quality bars, pairwise for model comparison, reference-based for ground truth validation
- The evaluation harness is separate from evaluators — get the infrastructure in place first, then focus on what "good" means

**Link:** [How to Design Evaluators That Catch What Actually Breaks](https://www.decodingai.com/p/how-to-design-ai-evaluators-that-catch-failures)

---

## LLM Judges: Powerful but Requiring Calibration

The section on LLM judges is where the article gets really interesting. An LLM judge is essentially an LLM grading another LLM's output — you provide the task, the output, evaluation criteria, and few-shot examples, and it returns a score with reasoning. They work in two modes: evaluating against absolute criteria or comparing outputs to reference answers when you need semantic understanding rather than string matching.

The author makes a crucial design point that too many teams get wrong: critiques are not optional. Simply outputting "Score: 1" tells you nothing useful. A proper evaluation needs to say something like "Response correctly identified the refund request but did not provide a timeline. Customer left without expectations." This level of detail is how you debug failures and train better evaluators over time. The critique should be detailed enough to serve as a few-shot example later — that is the flywheel that makes your evaluation system improve.

There is something the article touches on but could go deeper with: the cost-reliability tradeoff of LLM judges. The recommendation to use the most capable model (Claude Opus, GPT-4o) makes sense for accuracy, but at scale this gets expensive fast. If you are running thousands of evaluations per day, you need to think carefully about which evaluations genuinely need the most powerful model and which can use a smaller, cheaper one. The article mentions running multiple trials and averaging scores for critical evals, which further multiplies cost. A tiered approach — fast cheap model for initial screening, expensive model for borderline cases — would be worth exploring.

The practical advice on rubric design is excellent. "Was the response helpful?" is too vague. "Did the response: (1) correctly identify the user's request, (2) provide a specific action or next step, (3) include a timeline or expectation, and (4) maintain professional tone?" — that is actionable. Rubrics force precision and make subjective judgments repeatable. They become part of your LLM judge's system prompt, essentially encoding your domain expert's judgment in a reusable format.

One thing the author is avoiding thinking about: what happens when your LLM judge disagrees with human evaluators on edge cases? The article promises this will be covered in Article 5 ("How to Evaluate the Evaluator"), but it is a significant gap. Without knowing your evaluator's alignment with human judgment, you are essentially replacing one form of vibe-checking with a more expensive, automated form of vibe-checking.

**Key Takeaways:**
- Always require detailed critiques from LLM judges, not just scores — critiques are your debugging interface and future training data
- Use chain-of-thought reasoning before scoring to improve judge accuracy
- Provide full context to evaluators: conversation history, retrieved documents, system prompts, and tool call results
- Prefer binary pass/fail over float scales — a score of 3.2 out of 5 is ambiguous, while pass/fail forces clarity about your quality bar
- Cover diverse failure modes in few-shot examples, not just the most common pattern

**Link:** [How to Design Evaluators That Catch What Actually Breaks](https://www.decodingai.com/p/how-to-design-ai-evaluators-that-catch-failures)

---

## Multi-Turn and Agentic Evaluation: Where Things Get Hard

The most architecturally interesting part of the article covers evaluating multi-turn conversations and agentic workflows. This is where evaluation goes from "check if this output is good" to "understand if this entire system is working," and the complexity ramps up significantly.

For multi-turn conversations, the key challenge is that errors compound. One bad response in turn 2 can derail everything that follows. The article introduces the concept of "first upstream failure attribution" — when something breaks, find the first turn where it went wrong, not the downstream symptoms. This is analogous to how we think about root cause analysis in traditional systems, and it is the right mental model. The practical implication is that you need turn-by-turn evaluation with full conversation history provided at each step, plus an end-to-end task success check.

For agentic workflows, the article presents a two-phase approach attributed to Hamel Husain. Phase one treats the agent as a black box — did it meet the user's goal? Phase two, only triggered when phase one fails, diagnoses why by examining tool choice, parameter extraction, error handling, context retention, and plan quality. This is smart architecture because it avoids the overhead of detailed step-level analysis when things are working fine.

The transition matrix analysis from Bryan Bischof is a particularly powerful idea that deserves more attention. By tracking which state transitions cause failures (e.g., "GenSQL to ExecSQL: 12 failures" vs. "DecideTool to PlanCal: 2 failures"), you get a data-driven view of where to focus debugging effort. This transforms evaluation from a binary "did it work?" into actionable engineering intelligence about your system's weak points.

What is missing from this section is a discussion of evaluation drift. As your agent evolves, the evaluators themselves need to evolve. The failure modes you see in production will change as you fix old bugs and introduce new features. The article treats evaluation as something you design once, but in practice it is an ongoing process that requires continuous maintenance — much like the production systems being evaluated. The dataset and few-shot examples need regular refreshing based on new production traces, and the rubrics need updating as your product's definition of "good" evolves.

The layered metrics approach — system efficiency for scalability, session-level for goal achievement, node-level for root causes — is a solid framework. But it would benefit from guidance on prioritization. When you are just starting with evals, you cannot instrument everything at once. Starting with end-to-end task success and then drilling down based on failure patterns is likely the most practical path, and the article could be more explicit about this recommended progression.

**Key Takeaways:**
- For multi-turn conversations, always identify the "first upstream failure" rather than evaluating downstream symptoms
- Use a two-phase approach for agentic workflows: black-box task success first, detailed step-level diagnostics only when failures occur
- Transition matrix analysis reveals which state transitions in your agent are the most fragile — focus debugging effort there
- Layer your metrics: system efficiency, session-level task completion, and node-level tool correctness each answer different questions
- Always provide full conversation history when evaluating any turn in a multi-turn interaction

**Link:** [How to Design Evaluators That Catch What Actually Breaks](https://www.decodingai.com/p/how-to-design-ai-evaluators-that-catch-failures)

---

## Tradeoffs

There are real architectural tradeoffs to consider when designing your evaluation strategy:

**Code-based checks vs. LLM judges:** Code-based evaluators are fast, cheap, and deterministic — but they cannot handle nuance. LLM judges handle subjective criteria well but are non-deterministic, expensive, and need calibration against human judgment. The pragmatic answer is to use both: code for everything deterministic, LLM judges only for what code cannot capture.

**Direct scoring vs. pairwise comparison:** Direct scoring gives you absolute quality tracking over time but is harder for LLMs to do well. Pairwise comparison leverages LLMs' natural strength at ranking but only tells you relative quality — you still need to know if either option meets your bar.

**Binary pass/fail vs. continuous scores:** Binary forces clarity and eliminates ambiguous "is 3.2 good enough?" discussions, but you lose granularity. Continuous scores let you track gradual improvement but create interpretation problems. The article strongly advocates for binary, and for most production use cases that is the right call.

**Evaluation depth vs. cost:** Running the most capable model with multiple trials and chain-of-thought reasoning gives you the most reliable evaluations, but at significant API cost. At scale, you need to be strategic about which evaluations get the full treatment and which can use lighter-weight approaches.
