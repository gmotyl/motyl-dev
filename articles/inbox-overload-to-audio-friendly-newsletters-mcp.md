---
title: 'From Inbox Overload to Audio-Friendly Insights: Building the motyl.dev News Engine'
excerpt: 'How I transformed a crushing backlog of technical newsletters into a seamless, audio-first experience using LLMs, MCP, and custom automation.'
publishedAt: '2026-01-08'
slug: 'inbox-overload-to-audio-friendly-newsletters-mcp'
hashtags: '#AI #Productivity #LLM #MCP #Automation #TechnicalWriting'
---

### TLDR:

Tired of "walls of text" and the frustration of TTS engines choking on code listings, I built a custom pipeline to process technical newsletters. By leveraging Gemini, Claude, and an MCP server, I now turn my Gmail backlog into audio-friendly Markdown articles for my site, perfect for listening during my morning coffee.

---

## The Problem: Newsletter Fatigue and the "Wall of Text"

The "News" section on [motyl.dev](https://motyl.dev/news?unseen=true) didn't start as a grand design; it was a desperate solution to a very specific problem. Like many in tech, I subscribe to numerous newsletters. But technical content is demanding. It’s full of code snippets, complex listings, and dense "walls of text" that require significant mental energy to process.

I am someone who consumes knowledge primarily through audiobooks. I prefer that flow. However, my inbox was becoming a graveyard of unread technical articles. Even though the content was interesting, I felt a massive mental resistance to sitting down and scrolling through it all. My frustration grew as the pile of unread mail got higher and higher.

## The Tooling Dilemma: Edge vs. ElevenReader

I’ve long been a user of [Microsoft Edge](https://www.microsoft.com/edge), which might not be the most popular browser, but it has one "killer feature": a brilliantly executed Text-to-Speech (TTS) engine. It reads articles in almost any language using incredibly natural-sounding voices—and it does it for free.

I looked into alternatives like [ElevenReader](https://elevenlabs.io/text-to-speech-app) by ElevenLabs. While the quality is top-tier, the pricing model felt like a disaster for my needs. When a TTS service costs as much as a [Storytel](https://www.storytel.com) subscription (which includes the actual content/books), it feels overpriced. We are living in an era of "Subscription Fatigue" where everything is a "SaaS" or an "as-a-service" model. Whenever possible, I look for ways to achieve similar quality using existing or free services rather than adding another $20/month to the pile.

## The Disaster of Raw TTS on Technical Content

The real breaking point was trying to use standard TTS on raw technical newsletters. It was a catastrophe. The automated voice would try to read every single character in a code listing—hashes, brackets, obscure syntax. It was unintelligible and mentally exhausting.

I found myself procrastinating even more. I didn't want to unsubscribe because I wanted to stay up-to-date, but I couldn't bear to read or listen to them in their raw form. The "pile" kept growing along with my frustration.

## Enter AI: From Manual Prompts to Automated Flow

I started experimenting with AI to bridge the gap. Initially, I created a prompt for [ChatGPT](https://chatgpt.com), [Google Gemini](https://gemini.google.com), and [Claude](https://claude.ai). The goal was to have the AI "look" at the newsletter and rewrite it in an "audio-friendly" format—skipping the code listings but describing what they did.

Interestingly, I noticed that **Gemini handled paywalls much better than Claude**. While Claude would sometimes refuse to access a [Substack](https://substack.com) link due to a paywall, Gemini had no such qualms.

However, manually copying and pasting text on a phone was clunky. I needed a system.

### Evolution 1: The GitHub Repository

I first built a system called [newsletter-ai](https://github.com/gmotyl/newsletter-ai). It used LLMs to connect to my [Gmail](https://mail.google.com) (keeping credentials secure, of course) and generated Markdown files. Suddenly, I realized: _My blog, motyl.dev, is already built on Markdown._ If I pushed these generated summaries to my site, I could use the Edge "Read Aloud" feature to listen to them perfectly.

### Evolution 2: The MCP Server and CLI

The API costs were roughly $1 per newsletter. That’s both cheap and expensive; over a year, it adds up. To optimize, I started using tools like [Claude Code](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code) and Gemini CLI.

The final piece of the puzzle was creating a local **[MCP (Model Context Protocol)](https://modelcontextprotocol.io/) server**. This server runs locally, connects to my Gmail, finds newsletters based on specific patterns, and feeds the content directly to the LLM. Additionaly it saves some tokens by using node [article-extractor](https://github.com/extractus/article-extractor) library to scrape content of articles. MCP is able to provide extracted content, number of newsletters in mailbox, list of newsletters, and more. This MCP is part of [newsletter-ai](https://github.com/gmotyl/newsletter-ai) project now.

## The New Workflow: Morning Coffee and Curation

Now, my morning routine is simple:

1. I run a single command in my CLI.
2. The system fetches new newsletters, generates audio-friendly summaries, and deletes the original emails from my inbox.
3. I listen to the generated articles while drinking my morning coffee.

I even added a "bookmarking" feature for the most interesting articles. This is the "Aha!" moment: this filtered list of high-value, front-end, and productivity insights isn't just for me. This curated stream will eventually become the basis for my _own_ newsletter, which you can subscribe to for the "best of the best" technical content.

#newsletter-cta('Want to build your own newsletter-to-audio pipeline?', 'Subscribe and get a free step-by-step guide to setting up newsletter-ai.')

The system I described isn't just about saving money; it's about reclaiming time and turning a source of frustration into a streamlined source of knowledge. It is example of leverage of AI and automation to improve quality of life.
