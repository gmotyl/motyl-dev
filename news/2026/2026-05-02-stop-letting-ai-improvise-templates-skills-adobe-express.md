---
title: "Stop Letting AI Improvise: Templates, Skills, and the Discipline of Pre-Made Decisions"
excerpt: "TechTiff argues that consistent AI output comes from locking design decisions into templates and behavior into Skills, leaving AI to execute rather than guess."
publishedAt: "2026-05-01"
slug: "stop-letting-ai-improvise-templates-skills-adobe-express"
hashtags: "#techtiff #ai #agents #dx #architecture #templates #adobe #claude-skills #generated #en"
source_pattern: "TechTiff"
---

## Stop Letting AI Improvise

**TLDR:** If your AI output keeps drifting off brand, the problem usually is not the model. It is that you are asking it to make decisions you never actually made yourself. TechTiff's piece, drawing on a conversation with Adobe Express SVP Govind Balakrishnan at Adobe Summit, makes the case for templates with locked fields plus reusable Claude Skills as the structure that turns AI from an improviser into an executor.

**Summary:** The article opens with a familiar pain. Every new social asset starts as a five-minute task and turns into a two-hour scroll through options, because every time you open a blank canvas you rebuild the same decisions about layout, typography, color, and tone. The author's fix is to stop treating designs as one-off graphics and start treating them as production assets, with the design system encoded into the file itself.

In Adobe Express, that means a template where the locked parts carry the brand and only a few fields stay editable: title, description, date, background image. When AI is invited into that file, it does not redesign anything. It fills the fields and returns a finished asset. The same idea then gets lifted to behavior with Claude's Skill Creator. A Skill says which template to use, what inputs it needs, which fields it can touch, what to leave alone, and where the human review step happens. Template holds the design. Skill holds the job description.

The piece then zooms out. ChatGPT's workspace agents move the same way, starting from a defined workflow rather than a blank prompt, and connectors let those agents run real processes in tools like Adobe instead of guessing at them. Govind frames this as weaving generative AI into the product where you already work, with brand kits, brand checks, accessibility feedback, and conversational controls that step aside for precise manual editing when the moment calls for it.

The thesis is simple and a little uncomfortable for anyone who likes the freeform prompt box. AI gets useful when the repeatable parts stop depending on your mood, your calendar, or how much coffee you have had that morning. You make the decisions once, lock them in, and let the AI execute inside the lane you built.

**Key takeaways:**
- Inconsistency in AI output usually means you handed the model decisions that should have been settled in a template or a Skill.
- Templates encode design decisions and locked fields, while Skills encode behavior, allowed inputs, and review steps. They work as a pair.
- The trend across Adobe Express, Claude Skills, and ChatGPT workspace agents is the same: workflows you can run, not rebuild.

**Why do I care:** As a senior frontend engineer or architect, this is design system thinking dressed up for the AI era, and it maps directly onto how I want agents to behave inside a product codebase. Replace "template" with a typed component, a route handler scaffold, a code mod, or a generator, and replace "Skill" with an internal agent contract that says which scaffold to invoke, which props or files are open for change, and where review happens. The lesson is that prompt quality is a property of the surrounding system, not the prompt. If your team's AI keeps producing off-style React components, drift-prone API clients, or inconsistent migrations, the answer is not better wording. It is investing in the same boring artifacts we already preach about: design tokens, generators, code owners, and review gates, exposed to agents through Skills or MCP tools so they execute inside guardrails instead of improvising over them. That is the difference between AI as a junior who keeps reinventing your conventions and AI as a teammate who finally respects them.

**Link:** https://techtiff.substack.com/p/adobe-express-ai-templates
