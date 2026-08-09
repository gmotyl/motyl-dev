---
description: Step-by-step wizard to generate, review, and publish a weekly newsletter issue end-to-end
allowed-tools: ["Bash", "Read", "Edit", "Write", "Glob", "TaskCreate", "TaskUpdate", "AskUserQuestion", "Skill"]
---

Run the full weekly newsletter publishing flow as a guided wizard. Each step requires explicit user confirmation before moving on. Only navigate backward when the user explicitly asks ("go back to step N", "redo image", etc.) — otherwise always move forward.

## How the wizard works

1. **Create a TodoList with all 9 steps up front** using TaskCreate. Mark exactly one step `in_progress` at a time. Mark steps `completed` only after the user confirms that step is done.
2. **Stop after every step** and ask the user via AskUserQuestion whether to proceed, retry the current step, or stop the wizard. Never silently chain into the next step.
3. **Back-navigation is opt-in.** If the user says "go back to step 3" or "I want to redo the image", mark steps from that point onward as `pending` and resume from there. Do NOT offer back-navigation in your default confirmation prompt — only honor it when the user asks explicitly.
4. **Stash key values across steps**: `issueNumber`, `issueFile` (e.g. `content/trends/motyl-dev-11.md`), `imageTopic` (optional), `imagePath` (after publish). Repeat these in your status messages so the user sees the wizard's working state.

## The 9 steps

### Step 1 — Generate newsletter issue

Invoke the `generate-trends` skill:
```
Skill: generate-trends
```

When it completes, capture the resulting `issueNumber` and `issueFile` path from the generated markdown file. Report both to the user.

**Confirm:** "Issue #N generated at `<path>`. Move to step 2 (manual review)?"

### Step 2 — User reviews and edits manually

Tell the user: "Open `<issueFile>` and edit freely — fix prose, reorder items, drop articles. Tell me 'done' when you're ready to move on, or 'go back to step 1' to regenerate."

Wait for the user. Do not edit the file yourself unless they ask. When they say done, confirm and move on.

### Step 3 — Generate hero image prompt

First ask: "Any specific topic or angle the image should focus on? (Leave blank to use the whole issue as context.)"

Then invoke the `image-prompt` skill with the issue number and the optional topic hint:
```
Skill: image-prompt
args: <issueNumber> [+ topic note in the prompt body if provided]
```

Show the user the resulting NanoBanana prompt.

**Confirm:** "Prompt generated. Copy it into NanoBanana and download the image. Tell me 'image downloaded' when ready, or 'regenerate prompt' to try again."

### Step 4 — Publish the image

When the user confirms the image is downloaded, invoke the `publish-image` skill with no path argument so it auto-picks the newest Downloads image, and pass the issue file as the target:
```
Skill: publish-image
args: <issueFile-slug>   # e.g. motyl-dev-11 — or just let it autodetect
```

The skill will ask the user to confirm the newest Downloads file, optimize it, upload to R2, and write the `image:` frontmatter field. Capture the final CDN URL.

**Confirm:** "Image published: `<CDN URL>`. Move to step 5 (commit & push)?"

### Step 5 — Commit and push

Run:
```bash
git add <issueFile> && \
  git commit -m "feat(trends): publish issue #<N>" && \
  git push
```

Use the existing project commit conventions (see CLAUDE.md / AGENTS.md). Stage **only** the issue file unless the user explicitly asks to include more. Do NOT use `git add .` or `git add -A`.

**Confirm:** "Pushed to remote. Move to step 6 (send preview)?"

### Step 6 — Send newsletter preview

Run:
```bash
pnpm newsletter:preview <issueNumber>
```

Report stdout summary (recipient, subject line, anything the script prints).

**Confirm:** "Preview sent. Check your inbox. Move to step 7 (review preview) when ready."

### Step 7 — User confirms preview is OK

Wait for the user to check the preview email. Ask: "Preview looks good? Options: proceed to broadcast, redo from step 2 (edits), redo from step 4 (image), or stop here."

Only proceed to step 8 on an explicit "yes / send / proceed". If the user says anything that hints at edits needed, treat it as a back-navigation request and confirm which step to return to.

### Step 8 — Broadcast newsletter

This is the irreversible step. Before running, confirm explicitly: "About to send newsletter #<N> to the full audience. Type 'send' to proceed."

Only on explicit `send` (not `y`, not `ok`, not `proceed` from a previous turn — fresh confirmation here), run:
```bash
pnpm tsx scripts/send-newsletter.ts <issueNumber> --send
```

(Do NOT use the `pnpm newsletter:send` alias — it omits the issue number and fails with a usage error.)

Report the output. If the script fails or asks for confirmation, surface that to the user and do not retry without explicit instruction.

**Confirm:** "Broadcast complete. Move to step 9 (social repurpose)?"

### Step 9 — Repurpose to social

Invoke the `repurpose` skill:
```
Skill: repurpose
```

The skill will draft LinkedIn / Bluesky / Twitter posts. Remember: Twitter/X is manual-publish only — give the user a short draft and never auto-publish to Twitter.

Mark the wizard complete and print a final summary:
- Issue #N file path
- CDN image URL
- Push commit SHA
- Preview & broadcast timestamps
- Social posts that were published vs. left as drafts

## Safety rules

- **Never skip a confirmation.** Even if the user said "do everything" up front, gate each step.
- **Never run `pnpm newsletter:send` without a fresh, explicit `send` confirmation in step 8.** Earlier "yes" answers do not authorize this.
- **Never force-push, amend, or rewrite history.** Only forward commits on the current branch.
- **Honor explicit back-navigation only.** "go back to step N", "redo image", "I want to change the prompt" — these are valid triggers. A vague "hmm" is not.
- **Keep the TodoList in sync.** Every step transition updates exactly one task. If the user navigates back, reset all tasks from that step forward to `pending`.

## On errors

If any embedded skill or shell command fails, stop the wizard at that step, surface the error to the user, and ask whether to retry, skip, or abort. Do not auto-retry.
