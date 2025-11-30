---
title: "Building an AI-Powered Content Repurposing System That Actually Works"
excerpt: "How to automate newsletter-to-social content adaptation while preserving voice and platform-specific optimization."
publishedAt: "2025-11-13"
slug: "ai-powered-content-repurposing-system"
hashtags: "#generated #en #ai #automation #content-marketing #make #openai #workflow #productivity"
---

## How I Finally Solved the Content Repurposing Problem With AI Automation

**TLDR:** The author built an automated content repurposing system using Make.com, OpenAI, and Firecrawl that transforms newsletter URLs into 18 platform-optimized social posts (5 LinkedIn, 10 Substack Notes, 3 Twitter threads) in 30 minutes instead of 5 hours. The key insight: content repurposing isn't copy-paste—each platform has distinct language, rhythm, and audience expectations requiring specific adaptation rules.

**Summary:**

The irony is brutal: a writer covering AI automation spent 5 hours weekly doing manual copy-paste work to repurpose newsletters. The weekly grind involved pre-drafting LinkedIn posts with strategic line breaks, crafting 200-character Substack Notes with mic-drop endings, outlining Twitter threads with curiosity gaps—all before finalizing the Thursday newsletter. Some weeks, burnout won and content never got repurposed at all, leaving reach on the table.

The core problem isn't just tedium—it's that effective repurposing demands platform-specific adaptation. LinkedIn wants thought leadership with declarative hooks. Substack Notes needs tight 200-character insights. Twitter threads require conversational flow with curiosity-driven pacing. Generic copy-paste gets zero engagement. Rewriting from scratch defeats the purpose of repurposing. The author needed automation that understood platform rules, preserved conversational voice, ran without manual ChatGPT prompts, and delivered 80% ready content needing only final polish.

The solution is a Make.com workflow triggered from Google Sheets. Add a newsletter URL, flip status from "Live" to "Repurpose," and the automation runs: Firecrawl scrapes the content, three routers with platform-specific OpenAI prompts generate 5 LinkedIn posts (adapted to different content styles: steps, lessons, examples, stats, mistakes), 10 Substack Notes with bold formatting, and 3 Twitter threads with conversational hooks. Output lands in Google Docs ready for 30 minutes of final polish.

The architecture is straightforward but elegant. Google Sheets integration with Make.com webhook watches for status changes. When "Repurpose" triggers, Google Sheets Search Rows module fetches the URL and channel selection. Firecrawl scrapes the newsletter content. Three routers filter by channel (Substack, LinkedIn, Twitter, or All), each feeding platform-specific OpenAI prompts. The prompts encode adaptation rules—voice preservation frameworks, platform formatting conventions, engagement patterns. Google Docs modules deliver outputs per channel.

For architects and teams building content operations, this highlights a critical pattern: automation value comes from encoding domain knowledge (platform adaptation rules), not just orchestrating API calls. The system works because prompts capture what makes content feel native to each platform. The tooling (Make.com, Firecrawl, OpenAI) is commodity; the differentiation is in the rules. The tradeoff: building this requires upfront investment in prompt engineering and workflow design, but eliminates ongoing manual labor. The 30-minute polish time suggests the system achieves genuine 80/20 automation rather than creating more work to fix AI outputs.

**Key takeaways:**
- Content repurposing requires platform-specific adaptation, not copy-paste—LinkedIn, Substack Notes, and Twitter have distinct languages and rhythms
- The automation architecture uses Google Sheets as trigger, Make.com for orchestration, Firecrawl for scraping, OpenAI for generation, Google Docs for delivery
- Three routers with channel-specific filtering and platform-specific prompts enable parallel generation of 18 optimized pieces from one newsletter URL
- Voice preservation and platform adaptation rules encoded in prompts are the key differentiator, not the tooling
- The system reduces 5 hours of manual work to 30 minutes of final polish by delivering 80% ready content

**Tradeoffs:**
- Automated repurposing delivers 80% ready content requiring 30-minute polish but sacrifices the 100% custom crafting that manual rewriting provides
- Using Make.com workflow orchestration increases setup complexity but eliminates ongoing manual prompt entry and copy-paste work
- Platform-specific prompts improve content quality but require upfront investment in encoding adaptation rules and maintaining them as platforms evolve

**Link:** [How I Finally Solved the Content Repurposing Problem With AI Automation](https://aimaker.substack.com/p/ai-content-repurposing-automation-system-guide-linkedin-twitter-substack-notes)
