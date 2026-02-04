---
title: "Behind the Scenes of AI Observability in Production"
excerpt: "A deep dive into practical AI observability frameworks for production agents, including common pitfalls, evaluation strategies, and lessons learned from implementing AI observability at scale."
publishedAt: "2026-02-03T12:00:34.000Z"
slug: "behind-the-scenes-ai-observability-production"
hashtags: ["#substack", "#aiobservability", "#agents", "#productionai"]
---

# Behind the Scenes of AI Observability in Production

## TLDR

AI agents in production face critical observability challenges that simple metrics alone can't solve. This article explores practical frameworks for implementing AI observability, including how to define meaningful evaluation criteria, leverage tools like Opik for tracing and evaluation, and treat AI agents as data products rather than just deployed features. The key insight: observability isn't just about metrics—it's about creating a continuous feedback loop that treats your AI system as a living product that evolves with real-world usage.

---

## The Hidden Problems with Production AI Agents

When giving AI agents too much power in production, nuanced problems emerge that typical testing doesn't catch:

- **Hallucination of documentation links**: Agents may format responses correctly but fabricate documentation URLs after fake searching
- **Incorrect user inference**: Agents may infer wrong user information and make incorrect tool calls, or claim no information exists
- **Out-of-scope suggestions**: Agents suggest follow-up actions outside their capability, recommending tool calls that don't actually exist

These issues persist even when metric scores look good, revealing a fundamental gap between synthetic testing and production reality. The challenge is that these problems are difficult to spot without dedicated observability frameworks.

**Link:** [Decoding AI - Behind the Scenes of AI Observability in Production](https://www.decodingai.com/p/behind-the-scenes-of-ai-observability)

---

## Problems with AI Observability Implementation

### Falling for Classic Metrics Without Context

Standard observability tools provide out-of-the-box metrics like Hallucination, AnswerRelevance, ContextPrecision, and ContextRecall. The problem: knowing your hallucination score is 1 tells you nothing about how to improve it. You need to find what specific aspects to evaluate for your use case.

### Dealing with Determinism and Evaluation Ambiguity

LLMs produce different outputs on repeated runs, and the same applies to LLM-as-judge evaluations. Running the same evaluation multiple times yields different results. The solution is to keep evaluation metrics lean and grounded—find metrics that are binary and unambiguous, testable by multiple evaluators independently.

Example: Instead of a fuzzy "hallucination" metric, define a specific, binary check: "Verify if the search_knowledge tool was called and if the URL in the output matches the tool's actual output."

### The Necessity of Manual Review

You cannot automate away all manual review without missing critical insights. LLMs evaluating other LLMs might hide important findings behind isolated prompts or poorly phrased conditions. Manual reviews surface patterns that automated metrics miss—like agents suggesting capabilities they don't have or answering questions outside their scope.

### Treating AI Agents as Data Products, Not Deployed Features

The worst mistake is treating observability as a one-time evaluation exercise with binary good/bad scores. Each conversation creates an invisible roadmap of improvements: bug fixes, new capabilities, refined prompts, or entirely new feature opportunities. Production data screams improvements that synthetic data never reveals.

---

## Implementing AI Observability: A Practical Framework

### Understanding Traces and Spans

AI observability tools like Opik follow familiar Software Engineering principles (like Sentry for error logging):

- **Trace**: Every LLM interaction, whether a simple call or complex agent workflow
- **Span**: Breakdown within a trace showing every component used (agent tools, RAG retrievals, etc.)
- **Thread**: Collection of traces grouped as a conversation, essential for understanding agent behavior in context

### Opik Overview and Capabilities

Opik is an open-source LLMOps platform used by Uber, Etsy, and Netflix. Key features include:

- **Visualization**: Complete traces with cost and latency breakdowns at each reasoning step
- **Optimization**: Custom LLM judge metrics, experiment comparison, configuration testing
- **Production Monitoring**: LLM judge metrics integrated into production traces with on-demand alarms
- **Prompt Versioning**: Track and improve systems automatically without manual prompt engineering

Opik offers both open-source and managed versions, with a generous free tier of 25K spans/month.

**Link:** [Try Opik for Free](https://www.comet.com/site/opik)

### Defining Evaluation Criteria Through Data-Driven Analysis

Before configuring evaluations, understand what your agent actually does through production traces. Use a reverse-engineering approach:

1. **Analyze production traces** to identify use cases
2. **Break down prompt behavior** based on actual usage patterns
3. **Propose evaluation metrics** aligned with these patterns (approximately 5 metrics for trace evaluation)
4. **Refine manually** since thread-level evaluation benefits from subjective judgment

Key principle: Each metric should focus on ONE thing with ONE clear score definition. Avoid subjective outcomes.

### Configuring Online Evaluations

Once you understand what to evaluate, configure online evaluations with:

- **Scope**: Trace or thread level
- **Model**: Your configured AI provider
- **Prompt type**: Custom evaluation prompts or Opik defaults
- **Variables**: Dynamic context insertion using {{variable}} syntax
- **Sampling**: Representative trace samples rather than evaluating everything

Example: A "Response Format Compliance" metric evaluates if agents follow prompt formatting standards. After manual review, you might refine the scoring criteria from "match at least 2 of 5 standards" to "match ALL standards."

### Managing Annotation Sessions Strategically

Manual annotation is necessary but can be exhausting. Use structured approaches:

1. **Prepare an annotation agenda** using tools like `opik-weekly` command to understand:
   - Feedback score overviews
   - Latency outliers and token usage
   - Week-over-week anomalies

2. **Use the annotation-review command** to:
   - See previous annotation patterns
   - Connect with ticket systems (JIRA, Confluence)
   - Validate if high-priority findings are in the backlog

3. **Document changes** to evaluation criteria in a version-controlled location (Google Docs, Notion, Confluence) since Opik doesn't version online evaluations

### Leveraging the Opik MCP Server

The Opik MCP Server (optional but powerful) enables:

- **Metric ideation** based on prompt and trace data
- **Quick documentation** generation from annotation comments
- **Product roadmap discovery** through automated analysis
- **Streamlined workflows** reducing weeks of manual work to automated processes

Available through [Github - opik-mcp](https://github.com/opik-ai/opik-mcp)

---

## A Real-World Journey: From Frustration to Framework

The author implemented AI agents at scale over nearly a year, initially using basic PostgreSQL analytics tracking ~100 messages daily. This approach provided no insight into agent improvement paths. After months of manual work—running local LLM-as-judge scripts, manually versioning prompts, guessing what to evaluate without observing real reactions, and burning out from endless annotation—a breakthrough came through discovery of Online Evaluations and Opik MCP.

The key lesson: Traditional AI observability tutorials show the 1% happy path, not the iterative, cyclical process of continuous evolution. Proper implementation requires:

1. **Reverse-engineer your prompts** using data-driven processes
2. **Create annotation agendas** to keep manual review focused and efficient
3. **Treat AI as a product** with a roadmap, not just a deployed feature
4. **Document metric evolution** as understanding improves

---

## Key Takeaways

1. **Metrics alone are insufficient**: Standard metrics need context-specific evaluation criteria tied to actual user behavior
2. **Manual review is essential**: Automated evaluation misses critical patterns that surface in production; combine automated and manual approaches
3. **Observability is iterative**: AI observability is a continuous cycle, not a one-time evaluation exercise
4. **Tool choice matters**: Opik and similar tools provide essential capabilities (tracing, online evaluation, prompt versioning) that save months of manual work
5. **Data drives decisions**: Treat observability insights as product roadmap inputs—each conversation reveals improvement opportunities
6. **Specificity beats generality**: Define evaluation metrics narrowly and unambiguously rather than trying to measure broad concepts

---

## Tradeoffs and Considerations

- **Manual vs. Automated Review**: While automated evaluation scales, it misses subjective insights; balance is key
- **Breadth vs. Depth**: Evaluating everything is exhausting; strategic sampling with clear criteria is more sustainable
- **Synthetic vs. Real Data**: Synthetic datasets don't reveal real-world agent behavior; prioritize production data
- **Tool Complexity**: Setting up proper observability requires upfront effort, but ROI compounds over time through better product decisions

---

**Link:** [Decoding AI Magazine - Observability for RAG Agents](https://www.decodingai.com/)

**Recommended Reading:**
- [The 5-Star Lie: You Are Doing AI Evals Wrong](https://www.decodingai.com/)
- [The Mirage of Generic AI Metrics](https://www.decodingai.com/)

