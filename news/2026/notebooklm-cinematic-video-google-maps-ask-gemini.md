---
title: "NotebookLM Goes Full Hollywood and Google Maps Gets a Brain"
excerpt: "Google turns NotebookLM into a cinematic content machine with Gemini 3 and Veo 3, while Maps gets a conversational AI upgrade that actually understands what you're asking."
publishedAt: 2026-03-18
slug: notebooklm-cinematic-video-google-maps-ask-gemini
hashtags: "#substack #notebooklm #gemini #googlemaps #ai #embeddings #generated #en"
---

## Using NotebookLM with Gemini

**TLDR:** Google has transformed NotebookLM from a research assistant into a full research-to-content pipeline with cinematic video generation, while simultaneously giving Google Maps its biggest AI upgrade in over a decade with conversational search and immersive 3D navigation.

**Summary:**

Google has been quietly assembling something impressive, and this roundup from AI Supremacy pulls together the key pieces. NotebookLM now leverages Gemini 3, Nano Banana Pro, and Veo 3 to offer Cinematic Video Overviews, which means users with a Google AI Ultra subscription can turn their notes into fully animated, personalized videos. The cap sits at 20 cinematic overviews per day, which feels generous for most workflows. Google is explicitly positioning NotebookLM as a "Research-to-Content" pipeline rather than just another note-taking AI, and honestly, that framing makes a lot of sense given where this tool has been heading.

On the Maps front, the "Ask Maps" feature is the headline act. Instead of the old keyword-based search, you can now ask natural language questions like "Find a restaurant with vegan options and easy parking along my route." The underlying Gemini models combine with Google's deep geographic data to parse these complex queries. But the navigation improvements might be even more impressive in practice. Immersive Navigation replaces flat 2D maps with AI-stitched 3D views using Street View and aerial imagery. Buildings can go translucent as you approach tricky turns, lane markings and traffic lights get highlighted during navigation, and voice guidance now uses landmarks instead of raw distances. Route comparisons explain trade-offs in plain language rather than just showing time differences.

Google also shipped its first multimodal embedding model based on Gemini, capable of mapping text, images, video, audio, and PDFs into a single unified vector space. This is a significant development for anyone building search or RAG systems, supporting up to 8192 input tokens for text, multiple images per request, 120 seconds of video, native audio embedding without transcription, and PDF documents up to 6 pages. The article also notes that according to Similarweb data, Gemini continues to grow in worldwide traffic, and as the major AI assistants reach near parity, differentiation increasingly comes down to ecosystem integration, tone, and brand personality rather than raw capability.

**Key takeaways:**

- NotebookLM now generates cinematic animated videos from notes using Gemini 3 and Veo 3, capped at 20 per day for AI Ultra subscribers
- Google Maps "Ask Maps" feature enables complex natural language queries powered by Gemini
- Immersive Navigation brings 3D route visualization with transparent buildings, lane-level details, and landmark-based voice guidance
- Google's new multimodal embedding model unifies text, images, video, audio, and PDFs into a single vector space for search and RAG applications
- Gemini's worldwide traffic continues to grow as major AI chatbots reach near feature parity

**Why do I care:**

If you're building anything that touches search, content generation, or retrieval-augmented generation, that multimodal embedding model is the real story here. A single unified embedding space across text, images, video, audio, and PDFs dramatically simplifies architecture for multi-modal search systems. On the tooling side, NotebookLM's evolution into a content pipeline is worth watching because it signals where AI-assisted developer documentation and knowledge management is heading. And the Maps improvements? They're a masterclass in how to layer AI into an existing product without breaking the core experience, which is something every frontend team should study.

**Link:** [Using NotebookLM with Gemini](https://www.ai-supremacy.com/p/using-notebooklm-with-gemini-2026?publication_id=396235&post_id=191344461&isFreemail=true&triedRedirect=true)
