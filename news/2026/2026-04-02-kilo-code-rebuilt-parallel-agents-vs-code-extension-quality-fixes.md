---
title: "Kilo Code Rebuilt: Parallel Agents, VS Code Extension, and a Wave of Quality Fixes"
excerpt: "Kilo Code relaunches its VS Code extension on a portable core with parallel agent execution, model comparison, and cross-platform session continuity — plus a batch of community-driven bug fixes."
publishedAt: "2026-04-02"
slug: "kilo-code-rebuilt-parallel-agents-vs-code-extension-quality-fixes"
hashtags: "#kilo-code #ai #devtools #vscode #agents #openai #typescript #generated #en"
source_pattern: "Kilo Code"
---

## Kilo Code for VS Code — Rebuilt on the Portable Core

**TLDR:** Kilo Code has completely rebuilt its VS Code extension on the same portable core as the Kilo CLI, bringing parallel agent execution, worktree isolation, inline code review, and cross-platform session continuity to your editor. This is not an incremental update — it is a ground-up rearchitecture that changes what AI-assisted development actually feels like day to day.

**Summary:** The headline here is parallelism, and it runs deeper than a marketing talking point. The rebuilt extension supports parallel tool calls — file reads, searches, and terminal commands can all execute simultaneously — meaning the agent is no longer sitting idle waiting for one operation to finish before starting the next. On top of that, you can spin up parallel subagents, each with a specialist role: one handling implementation, another writing tests, a third generating documentation. They work concurrently and merge results back into a single coherent output.

The Agent Manager has been rebuilt on the same foundation as the CLI, which closes a long-standing gap where new platform capabilities would land in CLI months before they showed up in the editor. Session tabs now let you monitor multiple agents at once and switch between tasks without losing context. The practical implication is that you stop treating your AI assistant as a single-threaded process and start treating it as a team.

Inline code review deserves its own mention because the design is unusually thoughtful. Rather than a summary panel, you get a proper diff viewer — unified or split — where you can leave line-level comments exactly like reviewing a pull request. All comments are then sent back into the chat with file path, line number, and code snippet attached, so the agent's next response is grounded in the specific diff rather than a vague re-description of the conversation. This is the kind of structured feedback loop that turns AI-generated code from a suggestion into something you can actually ship.

Worktree support rounds out the major additions. Each agent can get its own git worktree, which means isolated execution without clobbering the main branch. You can merge results back via PR, direct commit, or cherry-pick depending on how formal the workflow needs to be. And if you want two agents sharing a worktree — one coding, one reviewing — that option is there too. Cross-platform session continuity means a task you started in the terminal over SSH can be picked up in VS Code later with the same context intact.

**Key takeaways:**
- Parallel tool calls and parallel subagents are now native to the VS Code extension
- Inline diff review with line-level comments feeds structured context back into agent chat
- Git worktree integration gives each agent isolated execution environments
- Session continuity is shared between CLI and VS Code, eliminating the context-switching penalty
- 500+ models supported with side-by-side comparison on the same prompt
- 2.2 million installs, free and open source

**Why do I care:** As a senior frontend developer, the thing that has always made AI coding tools frustrating is their single-threaded nature — you send a prompt, you wait, you review, you send another. The rebuilt Kilo Code extension directly attacks that bottleneck. The inline PR-style review workflow is particularly significant: it replaces the vague "looks wrong" feedback loop with the same structured diff review you would do on a teammate's code. That is a workflow change worth taking seriously.

**Link:** [Kilo Code for VS Code — Rebuilt on the Portable Core](https://kilo.ai/landing/vs-code)

---

## KiloClaw for Organizations — Enterprise Agent Infrastructure with Visibility and Control

**TLDR:** KiloClaw for Organizations is Kilo's answer to the "shadow AI" problem — developers are already running personal agents inside company infrastructure, and this product gives security teams audit logs, credential lifecycle management, and admin controls to make that usage governable rather than invisible.

**Summary:** The framing here is honest and worth acknowledging: Kilo is not pretending that organizations can prevent developers from using AI agents. The pitch is that the question is no longer whether agents are being used inside your org — it is whether you have any visibility into what they are doing. That is a realistic position, and the feature set follows from it logically. SSO and OIDC integration, SCIM provisioning for automated user lifecycle management, centralized billing with usage analytics, and admin controls over which of the 500-plus available models the team can access all address the specific gaps that security and compliance teams care about.

The credential story is the most technically important piece. Personal agents running on developer-managed infrastructure typically use personal API keys with no revocation lifecycle. KiloClaw for Organizations runs agents in managed environments with scoped credentials, which means when someone leaves the organization, their access actually disappears rather than lingering in a personal key that nobody revoked. The audit trail problem — no logs, no paper trail, no idea what data touched what API — is addressed through centralized session visibility and data residency guarantees documented in a security white paper.

Pricing follows a pay-for-what-you-use model. There is no per-seat tax for team members who are not actively running agents; you pay for compute and inference as consumed, either through bring-your-own-key or Kilo Gateway credits. For organizations already using Kilo Code for Enterprise, this extends the same account and billing relationship to agent infrastructure rather than requiring a separate procurement process.

Worth pushing back slightly: the security white paper is referenced but not linked directly in the marketing page, which makes it harder to evaluate the actual data residency and encryption architecture before committing. Organizations with serious compliance requirements should request that document explicitly before proceeding.

**Key takeaways:**
- Addresses the "shadow AI" problem with org-level visibility and controls rather than prohibition
- SSO/OIDC and SCIM provisioning handle identity and access lifecycle management
- Scoped credentials replace personal API keys, enabling proper revocation when employees leave
- Admin controls govern model access, permissions, and session duration org-wide
- Pay-per-use pricing with no forced per-seat minimums
- Integrates with existing Kilo Code for Enterprise accounts

**Why do I care:** Any team shipping production code is already dealing with this problem whether they acknowledge it or not. The choice is between ungoverned personal agent usage and a managed alternative that security can actually audit. The approach here — visibility and control rather than restriction — is the right one for engineering organizations that want to move fast without creating compliance landmines.

**Link:** [KiloClaw for Organizations](https://kilo.ai/kiloclaw/orgs)

---

## Deprecating the Orchestrator Agent with Visual Badges Across the UI

**TLDR:** Pull request 7888 marks the orchestrator agent as deprecated across the entire Kilo Code UI — mode switcher, agent settings, and TUI — using yellow warning badges and localized labels in 18 languages, while keeping the agent functional for users who have not yet migrated.

**Summary:** This PR is a textbook example of how to handle a deprecation gracefully in a tool that real developers rely on every day. The orchestrator agent is not being removed or disabled — it is being marked, so users see a clear signal that they should migrate to newer agent patterns without having their workflows broken mid-session. The implementation threads the deprecation signal through every layer of the stack: the Zod schema, the OpenAPI spec, the generated SDK types, the provider layer, the webview message types, and finally the three separate UI surfaces where agents are listed.

The visual treatment is deliberately differentiated from the existing badge vocabulary. Disabled agents get red error styling; deprecated agents get yellow warning styling. That distinction matters because the semantic difference between "this is broken" and "this will eventually go away" is meaningful to users making migration decisions. The TUI implementation handles the edge case elegantly — the description field now composes "deprecated" and "native" labels with a filter-and-join pattern that covers all four combinations without conditional spaghetti.

The i18n work is significant in scope: 18 locale files all received the new translation key, which suggests the Kilo Code project has a reasonably mature internationalization infrastructure that community contributors can extend without fighting the tooling.

**Key takeaways:**
- Deprecated flag propagates through schema, OpenAPI spec, SDK types, provider layer, and all UI surfaces
- Yellow warning badge differentiates deprecation from the red error badge used for disabled agents
- All 18 locale files updated with proper translations
- Deprecated agents remain visible and functional — not hidden, not broken
- TUI description composition handles all label combinations cleanly

**Why do I care:** Deprecation UX is one of those things that tool authors often get wrong by either silently removing features or flooding users with alerts that they learn to ignore. This implementation threads the needle correctly: visible, differentiated, non-breaking, and internationalized. It is a pattern worth copying in your own design systems when you need to retire a concept without stranding existing users.

**Link:** [PR #7888 — Deprecate orchestrator agent with visual badge](https://github.com/Kilo-Org/kilocode/pull/7888)

---

## Fixing IME Composition: Enter Key No Longer Sends Messages Mid-Typing in CJK Languages

**TLDR:** Pull request 7887 fixes a long-standing issue where pressing Enter to confirm a Chinese, Japanese, or Korean IME candidate word would accidentally send the chat message instead of completing the word selection.

**Summary:** This is a small fix with a large quality-of-life impact for a significant portion of Kilo Code's user base. Input Method Editors are the mechanism by which Chinese, Japanese, and Korean text is composed from phonetic keystrokes, and the Enter key is used both to confirm a candidate word during composition and to submit a form or message after composition is complete. Without checking the isComposing flag on keyboard events, the message input cannot distinguish between these two intents — and the result is messages being sent with half-composed, garbage text.

The fix is applied in three places: the main PromptInput keydown handler, and the two specialized handlers for slash commands and file mentions. All three now return early when the event's isComposing property is true. This is the correct and standards-compliant approach — the isComposing flag is part of the DOM KeyboardEvent specification and is reliably set by browser and VS Code webview runtimes during IME composition sequences. It is worth noting that this fix closes issue 7659, suggesting the bug had been reported and sitting open for some time before a community contributor addressed it.

**Key takeaways:**
- Checks isComposing on keydown events before processing Enter as a submit action
- Applied across PromptInput, useSlashCommand, and useFileMention handlers
- Follows the DOM KeyboardEvent specification standard
- Affects all CJK language users who rely on IME for text input

**Why do I care:** IME handling is one of those internationalization details that English-speaking developers consistently overlook because it is invisible in their daily workflow. The isComposing check is a one-liner that should be in every keyboard event handler that intercepts Enter in a text input. If your own projects have chat inputs, command palettes, or search boxes, audit them for this exact bug — it is extremely common.

**Link:** [PR #7887 — Prevent Enter from sending during IME composition](https://github.com/Kilo-Org/kilocode/pull/7887)

---

## Reset All Settings Now Actually Resets Everything

**TLDR:** Pull request 7735 fixes a bug where the "Reset All Settings" button left behind persistent globalState items — including variant selections, recently used models, and dismissed notification IDs — making it appear as though the reset had not fully worked.

**Summary:** This is the kind of bug that erodes user trust in a tool over time without ever being flashy enough to get prioritized. When a user clicks "Reset All Settings," the reasonable expectation is that the application returns to a clean state. The previous implementation only cleared VS Code configuration settings with the kilo-code.new prefix, which is the structured settings store. But Kilo Code also uses VS Code's globalState API — a separate persistence mechanism — to store variant selections, the list of recently used models, and the IDs of notifications the user has dismissed. None of those were touched by the reset function.

The fix extends the reset to explicitly clear all relevant globalState keys, then follows through on the downstream consequences: the updated state is sent to the webview, notifications are re-fetched so dismissed ones reappear, and a confirmation message is shown so the user knows the reset completed. The fix also closes issue 7727, where users were reporting that modes appeared unchanged after resetting settings — which makes sense now that the root cause is understood.

**Key takeaways:**
- Reset All Settings now clears globalState items in addition to VS Code config settings
- Affected items: variantSelections, recentModels, and dismissedNotificationIds
- Post-reset flow now sends updated state to webview and re-fetches notifications
- Closes a user-visible bug where modes appeared unchanged after reset

**Why do I care:** The gap between VS Code configuration settings and globalState is a subtle distinction that catches extension authors regularly. If you are building a VS Code extension and have a reset or factory-defaults feature, audit every persistence mechanism you use — workspace state, global state, secrets storage, and config — to make sure your reset actually covers all of them. Users will notice when it does not.

**Link:** [PR #7735 — Reset All Settings now clears globalState items](https://github.com/Kilo-Org/kilocode/pull/7735)

---

## Clarifying the Built-In Mode Banner to Stop Confusing Users About What Is Editable

**TLDR:** Pull request 7720 rewrites the banner text shown for built-in agent modes, replacing the misleading "read-only definition" label with a clearer explanation that the base definition is fixed but override fields like model, temperature, and prompt are intentionally editable.

**Summary:** This is a documentation and UX copy fix that addresses a real usability cliff. The banner previously read "Built-in mode (read-only definition)" — a technically accurate description of the base definition's immutability, but one that users interpreted as a warning that the entire settings panel was non-interactive. In practice, built-in modes expose several override fields that are intentionally editable: model selection, temperature, top_p, steps count, and system prompt. Users were avoiding these fields under the mistaken impression that editing anything would fail or be ignored.

The new banner text explicitly states that while the base definition cannot be changed, overrides can be configured below. That single clarification removes the ambiguity entirely. The fix was then propagated by an automated bot to all 15 other translation files, which is a good signal about the project's i18n pipeline — the infrastructure handles translation propagation programmatically rather than requiring a human to manually update every locale file for every copy change.

**Key takeaways:**
- Banner text rewritten to distinguish immutable base definition from editable override fields
- Override fields affected: model, temperature, top_p, steps, and system prompt
- Translation propagated automatically to 15 locale files via bot
- Closes issue 7672 where users were avoiding built-in mode configuration

**Why do I care:** UX copy is code. A single word like "read-only" in the wrong position creates a feature that users effectively cannot access, regardless of how well it is implemented. The lesson here applies broadly: when users report confusion about an interface, check the labels before assuming the interaction design needs to change.

**Link:** [PR #7720 — Clarify built-in mode banner to avoid read-only confusion](https://github.com/Kilo-Org/kilocode/pull/7720)

---

## Open Locally Action for Unassigned Sessions in Agent Manager

**TLDR:** Pull request 7627 adds an "Open Locally" action for sessions that are not assigned to a specific worktree, fixing a session management bug where clicking a recent session would destroy the loaded session on the next click.

**Summary:** This PR bundles a bug fix and a feature addition that are tightly coupled through the session management layer. The bug was subtle: clicking a recent session would activate it correctly, but leave the pending tab in an active state. When you clicked anything next, clearCurrentSession would fire and destroy the session you had just loaded. The fix properly replaces the pending tab, clears the activePendingId state, and switches to LOCAL context in a single coordinated state transition.

The feature addition — "Open Locally" — addresses the specific case of sessions that exist but are not assigned to any worktree directory. These show up in the Agent Manager as read-only, since there is no local workspace context to attach them to. The new action, exposed both as a context menu item and as a secondary button in the read-only banner, clears the session's worktree directory override and falls back to the workspace root. The implementation is careful to scope this action correctly: it only fires on explicit user intent, not on the general onSelectSession handler, which would incorrectly strip directory overrides from legitimate worktree sessions.

**Key takeaways:**
- Fixes session management bug where pending tab state caused loaded sessions to be destroyed
- Adds "Open Locally" context menu action and banner button for unassigned sessions
- Clears worktree directory override to fall back to workspace root
- Scoped to explicit user actions only — does not affect general session selection flow

**Why do I care:** State management in agent session systems is non-trivial, and this PR illustrates the kind of subtle bug that emerges when multiple state variables need to transition together atomically. The fix is a reminder that pending or draft UI states need explicit lifecycle management, not just initialization — and that adding new user-facing actions requires carefully auditing all the existing handlers that might inadvertently trigger the same underlying mutation.

**Link:** [PR #7627 — Open locally action for unassigned sessions](https://github.com/Kilo-Org/kilocode/pull/7627)

---

## Fixing Path Corruption on Windows During .kilocode to .kilo Migration

**TLDR:** Pull request 7562 fixes a Windows-specific bug where migrating stored paths from the old .kilocode directory to .kilo would corrupt paths by mixing Unix and Windows path separators.

**Summary:** Path handling on Windows is one of those perennial cross-platform bugs that surfaces whenever code makes assumptions about the OS separator. The previous migration logic forced paths to use the OS separator during the rename, which sounds reasonable until you realize that stored paths might have been written with Unix slashes by the code that originally saved them. The result was hybrid monstrosities where some segments used backslashes and others used forward slashes — paths that are technically invalid and will fail in unpredictable ways depending on which API you pass them to.

The fix is conceptually simple: instead of replacing the separator with whatever the current OS reports, preserve the separator style from the original stored path. If the stored path used Unix slashes, the migrated path uses Unix slashes. If it used backslashes, it keeps backslashes. This is a conservative approach that prioritizes consistency over normalization, and it is the right call during a migration operation where the goal is to move data without changing its semantics. The test update that accompanied the fix is also worth noting — the previous test used path.sep, which would pass on Windows but test the wrong behavior, a subtle test correctness issue that the PR author caught and fixed.

**Key takeaways:**
- Migration from .kilocode to .kilo paths now preserves the original separator style
- Prevents mixed-separator path corruption on Windows
- Test suite updated to validate the preservation behavior rather than OS-default separator behavior
- Conservative approach: moves data without normalizing separator style

**Why do I care:** Cross-platform path handling is boring until it is not. The lesson here is that migration code deserves extra scrutiny because it runs exactly once per user installation — there is no retry loop, no graceful degradation. And if your tests use path.sep to generate expected values, you are testing that your code matches the OS default, not that it actually does what it says. Separate those two concerns.

**Link:** [PR #7562 — Preserve separator style when migrating .kilocode to .kilo paths](https://github.com/Kilo-Org/kilocode/pull/7562)
