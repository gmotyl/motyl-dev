# Claude Code Instructions

Refer to [AGENTS.md](AGENTS.md) for project architecture, patterns, and guidelines.

## Quick Reference

- **Package Manager**: pnpm (not npm/yarn)
- **Commits**: Conventional format (`feat:`, `fix:`, `chore:`)
- **After changes**: Run `pnpm test --run` and `pnpm build`

## Claude-Specific Notes

- Use the Read tool before editing files
- Follow patterns documented in AGENTS.md
- When discovering corrections or new patterns, suggest updating AGENTS.md
- Keep changes minimal and focused on the task

<!-- gitnexus:start -->
# GitNexus MCP

This project is indexed by GitNexus as **motyl-dev** (1607 symbols, 2472 relationships, 50 execution flows).

## Always Start Here

1. **Read `gitnexus://repo/{name}/context`** — codebase overview + check index freshness
2. **Match your task to a skill below** and **read that skill file**
3. **Follow the skill's workflow and checklist**

> If step 1 warns the index is stale, run `npx gitnexus analyze` in the terminal first.

## Skills

| Task | Read this skill file |
|------|---------------------|
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->
