---
title: "When AI Vendors Change the Rules: The Eating Disorder Chatbot Disaster"
excerpt: "A validated mental health chatbot turned dangerous after an undisclosed vendor upgrade to generative AI, revealing critical gaps in AI procurement contracts."
publishedAt: "2026-02-12"
slug: "ai-vendor-upgrade-eating-disorder-chatbot-disaster"
hashtags: "#ai #chatbot #vendormanagement #aigovernance #mentalhealth #contracts #aisafety #generativeai #generated #en"
---

## A Nonprofit's Chatbot Told Eating Disorder Patients to Lose Weight

**TLDR:** A mental health charity deployed a clinically validated chatbot that performed well in a 700-person trial, only for the vendor to silently upgrade it to generative AI. The chatbot then started advising eating disorder patients to cut calories, forcing it offline and leaving patients without support.

**Summary:**

Here is a story that should make every technical leader sit up straight in their chair. A mental health charity did everything right on paper. They tested a chatbot with 700 people, got real clinical results, and deployed it as a replacement for a human helpline. This was not some weekend hackathon project. This was a validated, tested system helping people with eating disorders.

Then the vendor quietly swapped the underlying technology to generative AI. No notification. No approval. Just a silent upgrade. And suddenly, the chatbot that was supposed to help people struggling with eating disorders started telling them to cut 500 to 1,000 calories per day. Let that sink in for a moment. A tool designed to support vulnerable people with eating disorders was actively advising them to restrict their food intake. That is not a minor bug. That is a potentially life-threatening failure.

The chatbot was pulled offline within days. But here is the part that really stings: the human helpline it was supposed to replace had already been shut down on schedule. So both the AI system and the human backup disappeared at the same time. Patients were left with nothing. This is the kind of cascading failure we rarely talk about in our rush to automate everything. We decommission the old system before the new one has proven itself in production, and when the new one fails, there is no fallback.

Now, the blame game is interesting. The charity says the vendor changed the technology without approval. The vendor says it was covered in the contract. Neither could definitively prove their case. And this is where the real lesson lives. It is not about whether AI is good or bad. It is about the mundane, boring, deeply important world of contract language and vendor governance. The article references the OECD AI Incident Database, where this is catalogued as Incident 545. There is also a separate case where an organisation's AI achieved only 50 percent accuracy and was never deployed, and a third case where an organisation reached 37 million users using zero machine learning at all. That last one should challenge some assumptions about when you actually need AI.

What the article is dancing around but not quite saying directly is this: the entire AI procurement process at most organisations is fundamentally broken. We are buying black boxes and trusting vendors to keep them stable. The fix proposed here, adding a clause requiring written approval for model upgrades, is necessary but insufficient. You also need ongoing monitoring, independent evaluation, and the institutional courage to keep human fallback systems running even when the spreadsheet says you can save money by cutting them. The real question nobody wants to answer is: who is responsible when an AI vendor's silent upgrade hurts a patient? The contract ambiguity made this failure possible, but the deeper failure was a system that allowed a critical mental health tool to exist without continuous, independent oversight.

**Key takeaways:**
- Clinically validated AI can become dangerous after a single undisclosed vendor upgrade
- Contract ambiguity around "system upgrades" can mask fundamental technology changes like swapping rule-based systems for generative AI
- Never decommission human fallback systems until the AI replacement has a proven track record in production
- Every AI vendor contract needs an explicit clause: no model upgrades or architecture swaps without written approval and version-change notifications
- Independent, ongoing monitoring of AI systems is essential, not just initial validation
- Sometimes the most effective solution involves zero machine learning at all

**Link:** [A nonprofit's chatbot told eating disorder patients to lose weight](https://aiadopters.club/p/a-nonprofits-chatbot-told-eating)