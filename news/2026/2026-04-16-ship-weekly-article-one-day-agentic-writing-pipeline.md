---
title: "How to Ship a Weekly Technical Article in One Day With an Agentic Writing Pipeline"
excerpt: "A Substack writer explains how he automated 90% of his weekly article production using a multi-agent AI system while keeping himself as the irreplaceable creative seed."
publishedAt: "2026-04-15"
slug: "ship-weekly-article-one-day-agentic-writing-pipeline"
hashtags: "#decodingai #ai #agents #llm #architecture #devtools #open-source #generated #en"
source_pattern: "Substac"
---

## How to Ship a Weekly Technical Article in One Day With an Agentic Writing Pipeline

**TLDR:** The author of Decoding AI built a five-component agentic pipeline that handles 90% of his weekly article production, from deep research to HTML export, while he focuses on topic direction, brain dumps, and validation. The system costs between $1 and $6 per article to run.

**Summary:**

The core problem being solved here is real and uncomfortable to admit: writing weekly technical content is expensive, and the honest trade-off is between writing depth and building depth. When writing eats the week, the builder stops building, and without fresh experiences to draw from, the writing turns generic. The author ran this trap manually for a while, executing a nine-step workflow that could eat two to three days for a single 3,000-word article. Research, outline, diagrams, expanded bullet points, prose, editing, visuals, SEO, and finally copy-pasting into Substack. Each step by hand, every week.

The pipeline he built replaces everything except two steps with automated components. He still does the initial research and collects what he calls "golden source seeds," often pulled from a curated Readwise reading list spanning Substack, YouTube, LinkedIn, and X. He also writes a brain dump of everything he considers relevant, then refactors it into an outline. Those two steps form the human seed. Without them, everything downstream produces what he bluntly calls "generic AI mush."

Nova, the deep research agent, is an MCP server that takes the outline and golden sources, then runs a three-round gap analysis loop. Each round fans out concurrent Perplexity queries, filters the results through a four-dimensional rubric scoring trustworthiness, authority, relevance, and quality, and full-scrapes only the top five sources while keeping only summaries for the rest. For source ingestion it uses Firecrawl for web pages, gitingest for GitHub repos, and feeds YouTube URLs directly to Gemini Pro. The output is a structured, collapsible HTML research file that becomes the foundation for everything that follows.

Brown, the writing workflow, is implemented with LangGraph intentionally as a workflow rather than an agent, because prose generation rewards predictability over exploration. It controls voice through six profile classes: structure, mechanics, terminology, tonality, character, and article. The actual generation runs at 0.7 temperature to introduce some creative randomness, then passes the draft through an evaluator-optimizer loop where a Reviewer node at 0.0 temperature checks it against the guideline and research, and an Editor node at 0.1 temperature applies fixes. Critically, the loop runs for a fixed number of iterations rather than until a quality score is reached, because in creative work a single quality score becomes noisy and unpredictable. The pipeline also handles Mermaid diagram generation and then applies a style-transfer step using Gemini Nano to convert generic Mermaid output into branded PNGs using positive and negative few-shot examples.

Title and SEO generation uses an expand-and-narrow loop: nine candidate packages are produced from angles like personal transformation, curiosity-driven hooks, bold claims, and proof of work. A validator subagent, isolated from the generator to avoid self-confirmation bias, scores each on six rubric dimensions. The top four winners seed the next round. Three rounds later, those top four are used for A/B testing in Substack rather than picking a single winner, because the validator is good but not omniscient. The final step converts the article to platform-ready HTML using a CLI wrapper so it can be copy-pasted into Substack, Medium, X, or LinkedIn without reformatting.

**Key takeaways:**
- The human seed (research direction, brain dump, outline) is the non-negotiable input that prevents the pipeline from producing generic output.
- Five components handle the automation: Nova (deep research), Brown (writing with evaluator-optimizer), media style transfer, title and SEO generator, and HTML exporter.
- The evaluator-optimizer loop runs for a fixed iteration count rather than targeting a quality score to keep results predictable and costs controlled.
- Validator subagents are deliberately isolated from generator context windows to avoid self-confirmation bias.
- The full pipeline costs roughly $1 to $6 per article in API credits depending on image count.
- A/B testing with top four title candidates outperforms committing to the single highest-scored one.

**Why do I care:** This is one of the more honest descriptions of a working agentic writing pipeline I've come across, and what I respect most is the refusal to pretend the human is optional. Every architecture decision here comes back to the same principle: AI handles translation and distribution speed, the human handles taste and direction. From a systems design angle, the choice to use LangGraph as a deterministic workflow rather than an open-ended agent for prose generation is exactly right. Predictability matters when you're shipping on a cadence. The fixed-iteration evaluator-optimizer rather than score-gated termination is a detail that would take most people a few failed runs to arrive at. The isolated validator subagent preventing self-confirmation bias is also something I'd apply broadly to any agentic evaluation loop. If you're building any kind of content or documentation pipeline, the filesystem-as-contract pattern between components, where each stage reads and writes plain files, is worth stealing. It makes the whole thing debuggable and resumable without adding a message queue or orchestration layer.

**Link:** [How to Ship a Weekly Article in One Day](https://www.decodingai.com/p/how-i-automated-91-percent-of-my-business?publication_id=1526003&post_id=194297155&isFreemail=true&triedRedirect=true)
