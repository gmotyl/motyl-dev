---
title: "Automating the Writing Pipeline Without Losing the Human Signal"
excerpt: "A deep dive into how one technical writer built an agentic AI workflow that handles 90% of the weekly publishing grind, while keeping the irreplaceable human seed at the center of every article."
publishedAt: "2026-04-15"
slug: "automating-writing-pipeline-agentic-ai-workflow"
hashtags: "#substack #ai #agents #llm #automation #writing #langgraph #mcp #generated #en"
source_pattern: "Substac"
---

## How to Ship a Weekly Article in One Day

**TLDR:** A technical writer who publishes weekly built an agentic AI pipeline that automates roughly 90% of the manual writing process, from deep research to HTML export, while keeping the human in the loop for research direction, outline structure, and final validation. The system uses two MCP servers, a LangGraph-based evaluator-optimizer, image style transfer with Gemini, and a multi-round title and SEO generator. The cost per article runs between one and six dollars depending on the number of diagrams.

**Summary:**

There is a trap that every serious weekly writer falls into, and it has nothing to do with discipline. The problem is that the writing itself eats the time you should be spending building and researching. When that happens, the next article has nothing real underneath it, and you end up filling the gap with surface-level observations and invented examples. The internet already has plenty of that.

The obvious fix most people reach for is to hand the whole thing to an AI and let it write. That fails for the opposite reason. If you put zero thinking into the process, AI industrializes the noise. The whole point of publishing something is that you actually thought it through, built it, and learned something. Both ends of the spectrum, writing everything by hand or outsourcing everything to the model, starve the loop that actually feeds the work.

The author built a pipeline with five main components: Nova, a deep research agent that takes a topic and golden source URLs and returns a ranked structured research file; Brown, a LangGraph-based writing workflow with a generator-reviewer-editor loop; a media style transfer step that applies brand styling on top of raw Mermaid diagrams using Gemini; a title and SEO generator using an expand-and-narrow loop over three rounds; and an HTML exporter that converts the final markdown into platform-ready output for Substack, Medium, or LinkedIn. The handoff contract between all components is the filesystem, which makes the whole thing debuggable, resumable, and editable at any stage.

Nova is an MCP server exposing ten specialized tools and uses a three-round gap-analysis loop, fanning out concurrent Perplexity queries and filtering results through a four-dimensional rubric covering trustworthiness, authority, relevance, and quality. Brown, on the other hand, is deliberately a workflow rather than an agent, because prose generation rewards predictability. It uses six composable profiles, four generic ones covering structure, mechanics, terminology, and tonality, plus two customizable ones for character and article format. The evaluator-optimizer loop runs for a fixed number of iterations rather than until a quality score is reached, which the author notes yields better results and more predictable cost.

The part I find worth sitting with is the title and SEO generator. Nine candidate packages per round, each from a different angle, scored by an isolated validator subagent that does not share the generator's context window to prevent self-confirmation bias. Top four winners seed the next round. After three rounds, you have four strong candidates for A/B testing in Substack's scheduling tool, because the validator is good but not omniscient and real readers should settle close calls. That framing of fresh eyes preventing bias carries through the whole architecture, from Nova's filter step to Brown's reviewer node.

**Key takeaways:**

- The human-in-the-loop at the top of the pipeline (research direction, brain dump, outline) is what makes downstream AI output non-generic
- Nova uses concurrent Perplexity queries with a two-stage filter: summary-only for lower-ranked sources, full scrape for the top five
- Brown's writing loop uses six composable system prompt profiles and a fixed-iteration evaluator-optimizer rather than a quality-score threshold
- Mermaid diagrams get styled into branded PNGs using Gemini with positive and negative few-shot examples in the prompt
- The title and SEO generator uses an isolated validator subagent to prevent self-confirmation bias
- Total pipeline cost is roughly one to six dollars per article depending on image count
- The filesystem as handoff contract between components makes the pipeline human-in-the-loop friendly at every stage

**Why do I care:**

From an architecture standpoint, this is one of the cleaner examples of using the filesystem as an integration layer between autonomous components. Most people reach for message queues or shared databases as the contract between agents. Using plain files on disk is boring in the best possible way: it is inspectable, editable mid-run, and does not require any orchestration infrastructure. The evaluator-optimizer decision to run for a fixed number of iterations rather than chasing a quality score is also the kind of pragmatic call that gets ignored in most agent architecture writeups. Subjective quality scores in creative work are noisy and expensive to converge on. Fixed iterations give you cost predictability, which matters when you are running this weekly. The part worth stealing immediately is the isolated validator subagent pattern, keeping the reviewer completely separate from the generator context to avoid sycophancy and self-confirmation. That applies well beyond writing pipelines.

**Link:** [How to Ship a Weekly Article in One Day](https://www.decodingai.com/p/how-i-automated-91-percent-of-my-business?publication_id=1526003&post_id=194297155&isFreemail=true&triedRedirect=true)
