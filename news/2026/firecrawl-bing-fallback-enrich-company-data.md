---
title: 'Firecrawl First, Bing Second: Building a Research Pipeline That Admits When It Is Wrong'
excerpt: 'A practical architecture for company data enrichment that treats uncertainty as a first-class state, with Firecrawl as the investigator and Bing as the fallback.'
publishedAt: '2026-03-19'
slug: 'firecrawl-bing-fallback-enrich-company-data'
hashtags: '#hackernoon #ai #agents #architecture #engineering #generated #en'
---

## Firecrawl First, Bing Second: A Safer Way to Enrich Company Data

**TLDR:** Daniel Romitelli built a multi-agent company research pipeline that uses Firecrawl for enrichment and falls back to Bing when Firecrawl fails or has low confidence. The key architectural insight is separating evidence gathering from identity decisions and making uncertainty a first-class state rather than a failure mode.

Most enrichment systems fail the same way. They ask one source, get one answer, and call it truth. Daniel Romitelli learned this the hard way when a recruiter asked for a company called Cedrus and the internet returned three different Cedruses, two dead domains, and a LinkedIn vanity URL that did not match the legal name. If your pipeline collapses all of that into a single confident paragraph, you have created the worst kind of bug: one that looks correct.

The architecture he built treats research like a courtroom. Firecrawl is the investigator that gathers documents and extracts text. Bing is the tip line that gets called when the investigator comes back empty-handed or shaky. A company name resolver acts as the clerk, reconciling what the user typed with what the entity actually is. And a workflow tracer serves as the court reporter, recording every step so the pipeline is debuggable when it misbehaves.

The key insight is separating evidence gathering from identity decisions. The naive approach treats enrichment as a single call: fetch content from the web, summarize it, store it as a company profile. That fails because the web is ambiguous, names collide, sites redirect, and about pages are marketing fiction. A single step cannot express partial failure. If the fetch is weak, the summary becomes guesswork. By splitting research and enrichment into separate modules, failures become diagnosable rather than mysterious.

The Bing fallback is explicitly conditional. The codebase describes it as providing fallback enrichment when Firecrawl fails or has low confidence. That encoding matters. Bing is not the primary source. The fallback is conditional on failure or low confidence. And caching is part of the contract, with Redis sitting in front of the Bing Search API client. This pattern is honest about the reality that web enrichment is probabilistic. If your first source is weak, you do not fabricate. You corroborate.

The most interesting design decision is treating low confidence as a first-class state rather than a binary success or failure. Most systems mishandle this state by either treating it as success and publishing nonsense, or treating it as failure and throwing away useful leads. A fallback chain lets you keep the weak signal while still searching for corroboration.

Identity resolution being part of research rather than a cleanup step is another critical detail. The company name resolver exists because domain names and legal names diverge. If you postpone resolution until the end, you end up merging evidence across different entities. Doing it early is like labeling test tubes before you start pipetting. You can be a genius chemist and still ruin the experiment if you mix up the tubes.

The presence of a V2 adapter tells a familiar production story. The upstream API changed and the rest of the codebase should not care. Adapters are how you keep systems sane when external dependencies evolve. The separation of research from enrichment also exists because the author could not tell whether data was missing or the parser was wrong, and that ambiguity made debugging take three hours instead of five minutes.

Every module in this pipeline is scar tissue from a real failure turned into a guard rail. The company name resolver exists because profiles were merged for two different companies named Cedrus. The Bing fallback exists because even the best scraper cannot fetch a site that blocks bots. The tracer exists because debugging an enrichment failure without step logs was painful.

The trick with multi-agent research is not the web scraping. It is building a system where I am not sure yet is a first-class state. Observable, testable, and cheaper than a confident lie.

**Key takeaways:**

- Separate evidence gathering from identity decisions to make failures diagnosable
- Treat low confidence as a first-class state, not a binary success or failure
- Use a conditional fallback chain rather than relying on a single data source
- Trace every stage boundary with inputs, outputs, and the chosen evidence source for auditability

**Why do I care:** This is a pattern that applies well beyond company enrichment. Any system that gathers information from the web and needs to make decisions based on that information faces the same ambiguity problems. The three-state model of success, failure, and low confidence is more useful than binary thinking. The workflow tracer pattern is something I would recommend for any multi-step data pipeline. If you are building anything that scrapes, enriches, or resolves entities from web data, the architectural principles here are directly transferable.

**Link:** [Firecrawl First, Bing Second: A Safer Way to Enrich Company Data](https://hackernoon.com/firecrawl-first-bing-second-a-safer-way-to-enrich-company-data)
