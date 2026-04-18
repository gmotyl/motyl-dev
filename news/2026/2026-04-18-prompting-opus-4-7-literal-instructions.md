---
title: "Prompting Opus 4.7: Literal Instructions and Adaptive Thinking"
excerpt: "How Anthropic's Opus 4.7 changed prompt engineering by following instructions literally and calibrating reasoning depth to the task."
publishedAt: "2026-04-18"
slug: "prompting-opus-4-7-literal-instructions"
hashtags: "#substack #techtiff #claude #opus #prompting #ai #generated #en"
source_pattern: "TechTiff"
---

## Claude Stopped Guessing What You Meant

**TLDR:** Opus 4.7 follows your prompts literally and scales its reasoning to match the task. That shift moves the burden of precision onto you. Vague prompts get vague results, and conflicting instructions now force the model to pick one and drop the rest.

**Summary:** The piece walks through two behavior changes in Claude Opus 4.7 and what they mean for anyone writing prompts every day. The first is adaptive thinking. Instead of a single extended-thinking toggle that treated a grocery list like a financial model, the model now reads the request and decides how deep to go. A light ask gets a light pass. A dense, outcome-loaded ask triggers more reasoning before the first token of output.

The second change is the one that rewires how people write prompts. Opus 4.7 honors instructions literally. Older Claude versions would soften sharp phrasing, fill in gaps with reasonable guesses, and quietly resolve contradictions by picking the friendlier option. The new model reads your words as written and executes exactly that. If two instructions conflict, one of them loses. The cleanup step is yours now.

The author lays out five practical moves: lead with the outcome before the task, close obvious gaps around audience and length and tone, write filter rules and exclusions directly into the prompt, invite pushback with phrases like "where does this fall apart", and paste a small reference doc at the top of a new chat that captures your voice and quality bar. The throughline is that Claude mirrors the effort you put in. A flimsy prompt gets a flimsy reply. A tight prompt pulls a tight pass.

The post also calls out that Opus 4.7 is now the default model in Claude Code, with a new slash command called /ultrareview for deeper code audits. CLAUDE.md files are honored more precisely, which means any vague or contradicting lines in your config are worth cleaning up. There is also a nod to Cowork, which runs Opus 4.7 for desktop file and task automation, where literal execution can either save hours or make a mess, depending on how explicit your instructions are.

**Key takeaways:**
- Opus 4.7 follows instructions literally and calibrates reasoning depth to the task, which puts more weight on how clearly you articulate the outcome.
- Five prompt patterns help: state the outcome first, close obvious gaps, write exclusion rules, invite pushback, and paste a personal context doc at the top of a chat.
- Claude Code now defaults to Opus 4.7 and ships /ultrareview for deeper reviews, and your CLAUDE.md file gets interpreted more strictly.

**Why do I care:** As a senior frontend dev who leans on Claude Code daily, this matters because my CLAUDE.md and my prompts are now load-bearing in a way they were not before. If I have vague lines like "write idiomatic React" sitting next to "use functional components only", the model used to smooth that over. Now it picks a lane. That is a good thing for reproducibility, but it means I have to treat my prompt files like actual specs and review them the same way I review code. The /ultrareview command is genuinely useful for architectural passes before merging, and the shift away from eager subagent spawning lines up with what I have been feeling in practice, where sessions feel more decisive and less tool-happy. The real lesson for me is to stop treating Claude as a fuzzy collaborator and start treating it like a very literal junior engineer who needs written acceptance criteria.

**Link:** [Claude Stopped Guessing What You Meant](https://techtiff.substack.com/p/how-to-prompt-opus-4-7)
