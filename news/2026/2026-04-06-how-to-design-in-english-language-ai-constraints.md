---
title: "How to Design in English: The Language Behind Every AI Output"
excerpt: "English isn't just the language you prompt in — it's a design tool with architectural constraints that shape every AI-generated image, video, app, and music track you produce."
publishedAt: "2026-04-06"
slug: "how-to-design-in-english-language-ai-constraints"
hashtags: "#substack #ai #prompt-engineering #architecture #ux #performance #generated #en"
source_pattern: "Substac"
---

## How to Design in English

**TLDR:** English's Subject-Verb-Object grammar maps directly to AI prompt structure and OOP notation. With 50-90% of AI training data in English and 90% of the world's code in English, the language's strengths and blind spots directly constrain what AI models can generate across code, images, video, and music.

**Summary:** This is one of the most comprehensive analyses I have seen of English as an actual design tool — not just a communication medium, but a structural constraint on every AI output. The core thesis is deceptively simple: English's grammar, vocabulary, and blind spots are not just the interface to AI models, they are the architecture that shapes what those models can and cannot produce.

The evidence is striking across domains. For code, the alignment between English SVO (Subject-Verb-Object) grammar and OOP notation is nearly perfect — user.submits(form) reads naturally as "the user submits the form." A native Japanese programming language would probably lean toward user.form.submit (Subject-Object-Verb). Research shows that models pre-trained on code reason better in natural language, and since ninety percent of the world's code ecosystem is English, this creates a reinforcing loop. Non-native English speakers face a measured fifteen to thirty percent accuracy penalty and up to fifty-five percent slower task completion when prompting code assistants in other languages.

For image generation, the constraints become sharper. The first twenty tokens (roughly fifteen words) dominate the output in diffusion models. Negation fails catastrophically — "a picture of something that is NOT a potato" gets below fifty percent human agreement scores. English's strict adjective ordering (opinion-size-age-shape-color-origin-material-purpose) is not just a grammar quirk; it is a fidelity parameter. Reversing "red sports car" to "car sports red" drops output fidelity by roughly twenty-five percent. Spatial prepositions are unreliable — "on" achieves only about fifty-one percent accuracy because it can mean "on top of," "on the surface of," or "attached to."

Music generation is where English fails hardest. Ninety-four percent of training data is Western in origin. Indian ragas need twenty-two microtonal intervals per octave, but current models use twelve. Japanese has over forty-five hundred onomatopoeic terms across five categories — three of which have no English equivalent at all. The result is that AI "rounds off the microtones to the nearest Western equivalent," effectively erasing non-Western musical traditions.

The practical advice is domain-specific and immediately actionable. For code: start from visual designs, not language descriptions, and fight "generism" — the IKEA LACK table of software that emerges when you accept the first AI output. For images: front-load the subject in the first ten to fifteen words, never negate, and use fewer constraints (three clear ones beat seven competing ones). For video: use cinematic vocabulary as your control language and treat models as actors, not engineers.

**Key takeaways:**
- English SVO grammar maps directly to OOP and AI prompt structure
- Non-native speakers face 15-30% accuracy penalty in AI coding tasks
- First ~15 words dominate image generation output
- Negation fails at near-chance levels in diffusion models
- 94% of music training data is Western — non-Western traditions are structurally excluded
- "Easy to generate" should be a red flag when building products with AI

**Why do I care:** This reframes the entire prompt engineering conversation. We have been treating English as a transparent medium for communicating intent to AI, but it is actually an opinionated design tool with architectural biases. The practical implication for frontend developers is the "generism" problem — twenty-five percent of Y Combinator W25 startups running on ninety-five percent AI-generated codebases means a wave of identical-looking products. The antidote is deliberate design systems and explicit aesthetic choices, not better prompting.

**Link:** [How to Design in English](https://metacircuits.substack.com/p/how-to-design-in-english)