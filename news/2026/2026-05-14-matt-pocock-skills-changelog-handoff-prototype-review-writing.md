---
title: "Matt Pocock's New Agent Skills: Handoff, Prototype, and a Writing Workflow"
excerpt: "Matt Pocock ships /handoff and /prototype skills for Claude agents, fixes /grill-with-docs, and previews a tri-part writing flow plus a parallel code review skill."
publishedAt: 2026-05-14
slug: matt-pocock-skills-changelog-handoff-prototype-review-writing
hashtags:
  - "#matt-pocock"
  - "#ai"
  - "#typescript"
  - "#generated"
  - "#en"
  - "#claude-code"
  - "#agents"
  - "#ai-engineering"
  - "#prompt-engineering"
  - "#developer-tools"
source_pattern: "Matt Pocock (AI Hero)"
---

## Skills Changelog: /handoff, /prototype, /review and /writing

**TLDR:** Matt Pocock pushed two new skills to his Claude Code skills repo: /handoff for transferring agent context to a fresh session, and /prototype for building throwaway spikes before committing to a design. He also patched /grill-with-docs, /to-prd, and /to-issues, and previewed a writing skill split into fragments, beats, and shape plus a parallel review skill.

**Summary:** The /handoff skill addresses something I run into constantly. You're 60K tokens into a planning session, your agent is in flow, and now you need to fix a bug or prototype a side experiment. Stuffing that work into the same context window pollutes both tasks. Handoff compacts the current conversation into a temporary file that captures intent and vibe, suggests which skills the next agent should pull in, and lets you spin up a fresh session with full context. You can also hand back when the side quest finishes, which is the part I find most interesting because it turns context windows into something you can pass like a baton.

There are two patterns Pocock calls out. Fire-and-forget spawns an agent to handle one well-scoped task mid-session. DIY sub-agent is more interesting: you hand off during planning, do focused work in a clean session, then hand back what you learned. This is basically manual sub-agent orchestration without giving up control of the parent thread. The skill lives in the productivity section because it works for any knowledge work, not just engineering.

The /prototype skill is more opinionated. The argument is that AI engineering forces you to confront unknown unknowns you can only see by looking at running code. Prototypes are research, not deliverables. Pocock splits this into two modes. The first is UI prototyping where the skill generates several radically different variations with a floating toggle button so you can A/B them in the browser, walk down a design tree, mix elements, and throw away the rest. The second is business logic prototyping where you get a tiny interactive terminal app that lets you push a state machine through edge cases that are hard to reason about on paper.

The UI side connects to a broader point about AFK agents and frontend work. AI agents often cannot see what they are building, so visual taste has to come from a human in the loop. A toggle-between-variations workflow is a clever way to bottle that step. The /grill-with-docs fix is a small but instructive prompt engineering moment. Pocock wrapped supporting context in XML tags so the LLM treats it as lower priority than the core instructions. That stopped the skill from being too eager to implement when it should still be asking questions.

The writing skill in development is split into three passes: fragments where you dictate ideas into a journal, beats where you draft a path through the story, and shape where you do a final rewrite to scrub AI cadence. The review skill kicks off two parallel sub-agents, one checking the diff against repo coding standards and one checking faithfulness to the original PRD or issue. A separate skill extracts those coding standards from the repo so the check is grounded in your conventions instead of generic best practices.

**Key takeaways:**
- /handoff turns a saturated context window into a clean baton you can pass to a fresh agent and optionally take back
- /prototype treats prototypes as research spikes, with separate flows for UI variations and interactive terminal apps for state machines
- AFK frontend agents need a human-in-the-loop step because models cannot reliably evaluate what they render
- Wrapping supporting context in XML tags is a working trick to lower its priority relative to core instructions
- Parallel sub-agents for code review (standards check plus PRD faithfulness check) is a more useful split than a single monolithic reviewer

**Why do I care:** I spend a lot of time in agent-driven workflows on frontend code, and context window management is the single biggest constraint on quality output. The handoff pattern matches how I already work informally, opening a second terminal to keep one session focused. Codifying that with a skill that captures vibe and suggests next skills is the kind of small lever that compounds. The prototype split between UI variations and terminal state-machine apps also matches my experience. Most agent failures on TypeScript-heavy frontends come from the model not knowing what edge cases the state shape actually hits at runtime, and a five-minute terminal harness exposes that faster than any amount of type gymnastics. The XML-tagging fix for prompt priority is also worth stealing for any skill you write.

**Link:** [Skills Changelog: /handoff, /prototype, /review and /writing](https://www.aihero.dev/skills/skills-changelog-handoff-prototype-review-and-writing)
