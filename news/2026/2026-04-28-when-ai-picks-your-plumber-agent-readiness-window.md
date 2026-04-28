---
title: "When AI Picks Your Plumber: The Agent-Readiness Window Is Closing"
excerpt: "Search is turning into agent management. Your homepage stops mattering when ChatGPT, Perplexity, and Gemini scan structured data to build a shortlist before a human ever sees you."
publishedAt: "2026-04-28"
slug: "when-ai-picks-your-plumber-agent-readiness-window"
hashtags:
  - "#aiadopters"
  - "#ai"
  - "#agents"
  - "#seo"
  - "#localbusiness"
  - "#structureddata"
  - "#schemaorg"
  - "#generated"
  - "#en"
source_pattern: "AIAdopters"
---

## When AI Picks Your Plumber: The Agent-Readiness Window Is Closing

**TLDR:** Sundar Pichai called search "agent management" on a recent podcast with John Collison and Elad Gil. Customers no longer type a query and compare links. They ask an agent and get a shortlist. The agent reads structured data, not your hero image. Most local businesses have not noticed yet, which is exactly why the bar to land on those shortlists is, for now, embarrassingly low.

**Summary:**

The newsletter pulls a quote from Pichai that reframes the whole search business in one line. Search is becoming an agent manager. The work a human used to do, scanning ten blue links and weighing options, is being delegated to ChatGPT shopping, Perplexity recommendations, and Gemini in Chrome. The agent reads your data, ranks you against thirty competitors, and hands the human a tidy shortlist. The human picks one of three names, not one of thirty.

What gets read in that loop is not what business owners spent the last decade polishing. The homepage does not get visited. The hero image does not get rendered. The tagline that took six revisions does not get parsed. Agents look at the Google Business Profile, the service descriptions, the reviews, the structured data on your site, and the freshness signal that tells them whether any of it was touched recently. Vague or stale data drops you off the list before a human even knows you exist.

Gartner is quoted predicting that most B2B and B2C transactions will involve an agent in the decision loop by 2028. The author then makes a sharper point about timing. Mobile took five years to reach mainstream adoption. This shift is happening in twelve to eighteen months. The compounding part matters too. The businesses that won page one of Google in 2003 held it for a decade. The mobile-first winners from 2010 still own their share. Early positioning in agent-readable land is likely to compound the same way.

The closing argument is the most pragmatic part. Competitors have not started. A complete Google Business Profile, clean schema markup, fifty real reviews, and a consistent name and address across the major directories is enough to be in the top tier of agent-readable local businesses right now. The piece points to a paywalled 90 minute workflow with copy-paste prompts and a no-code schema fix, plus a weekly maintenance rhythm. The free portion is essentially a "wake up and ship the boring infrastructure" memo.

**Key takeaways:**

- Agents read structured data and reviews, not marketing copy or visual design.
- Google Business Profile, schema.org markup, and consistent NAP across directories are the new homepage.
- Freshness counts. Stale data signals an abandoned business to a ranking model.
- Gartner pegs 2028 as the year agents touch most transactions, but the positioning window is measured in months.
- The competitive bar in most local markets is currently low enough that boring hygiene work wins.

**Why do I care:**

I read this and immediately thought about every client site I have ever shipped where the schema was an afterthought. We obsessed over Lighthouse scores, Core Web Vitals, image LCP, and meanwhile the JSON-LD block was either missing, half-filled, or copy-pasted from a five year old Stack Overflow answer. That worked when the consumer of the page was a human with a browser. It stops working the moment the consumer is a model with a context window and zero patience for marketing fluff.

If you build for the web, this is a quiet but real shift in the contract. The renderer on the other end is no longer Chrome. It is some agent fetching your URL, parsing the DOM for facts, and discarding the rest. Server components, streaming, animation polish, none of it shows up in the agent's summary. What shows up is the data you put in `<script type="application/ld+json">`. I have started treating structured data the way I treat types in TypeScript. Not optional. Not "we will add it later." Part of the build.

There is also a developer-experience angle that gets glossed over. Most CMS templates ship with garbage schema or none at all. WordPress themes inject Article schema on a contact page. Shopify stores miss Product schema fields that GPT-shopping uses to rank. Headless setups where the marketing team writes copy in one tool and the schema lives in code tend to drift within a quarter. If you are an architect, that drift is your problem to solve, probably with a validation step in CI that fails the build when the schema does not match what the page claims to be.

I am skeptical of the "twelve to eighteen months" framing because urgency sells paywalled content, and I would not bet my roadmap on a Gartner number. But the underlying claim is sound. Agents are already routing real purchase decisions, and the businesses that show up cleanly in their context are the ones that will keep winning when the volume goes up. The work itself is unglamorous. Fill in the profile. Validate the schema. Get reviews. Keep them fresh. None of that is a moat individually. All of it together, done before your competitors notice, probably is.

**Link:** [Your customers are letting AI pick their plumber, lawyer and dentist now](https://aiadopters.club/p/your-customers-are-letting-ai-pick?publication_id=3593700&post_id=195661222&isFreemail=true&triedRedirect=true)
