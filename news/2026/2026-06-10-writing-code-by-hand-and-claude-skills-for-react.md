---
title: "Writing Code by Hand and Encoding Team Knowledge in Claude Skills"
excerpt: "A developer rediscovers the value of hand-written code, and a practical guide to making Claude Code actually useful for React teams."
publishedAt: "2026-06-10"
slug: "writing-code-by-hand-and-claude-skills-for-react"
hashtags: "#dailydev #ai #react #claudecode #craftsmanship #generated #en"
source_pattern: "daily.dev"
---

## I'm Going Back to Writing Code by Hand

**TLDR:** A developer reflects on how heavy reliance on AI coding tools gradually eroded their debugging instincts and problem-solving ability. They're not swearing off AI, but drawing a clearer line between using it for boilerplate versus using it to do the actual thinking.

There's a moment in this article that will hit close to home for a lot of developers: the author realized they couldn't debug effectively anymore without AI assistance. Not "couldn't do it as fast," but genuinely struggled to reason through the problem. That's a different kind of uncomfortable. It means the skill atrophied, not just the habit.

I've thought about this a lot. When you lean on a spell-checker long enough, your spelling gets worse. When you use a calculator for everything, mental arithmetic fades. The brain optimizes away what it doesn't practice. AI coding tools are not immune to this dynamic, and the author lived it over several months of heavy use.

What's worth sitting with here is the distinction between AI as a power tool versus AI as a substitute for thinking. Using AI to generate a file upload handler or scaffold a test suite structure, that's a power tool. You know exactly what you want, you're just skipping the tedious typing. But using AI to reason through why your component is re-rendering three times, or why your async code has a subtle race condition, that's outsourcing the actual craft. The author argues, convincingly, that outsourcing that thinking stops you from getting better.

Writing code by hand forces you to slow down. You have to hold the logic in your head, trace through the implications, make architecture decisions consciously rather than accepting whatever the model suggests. The mistakes you make are yours, and so is the learning that comes from them. The author isn't calling for a return to notepad.exe, but for intentionality: pick up the AI tool when it helps you move faster, put it down when it's just thinking for you.

**Key takeaways:**
- Overreliance on AI tools can quietly degrade your debugging and problem-solving instincts without you noticing until it matters
- AI is more valuable as a power tool for known, repetitive tasks than as a replacement for architectural thinking
- Writing code manually forces you to engage with logic and design in ways that build lasting skill

**Why do I care:** As someone who reviews code and thinks about how teams build things, I care about this because the risk isn't just individual skill decay, it's team-wide. If everyone on a team is outsourcing the hard thinking to AI, nobody is building the intuition to catch the problems AI introduces. That creates a fragile codebase maintained by people who've never had to reason through its trickiest parts without help. Hand-writing code, even occasionally, is how you stay sharp enough to know when the AI got it wrong.

**Link:** [I'm Going Back to Writing Code by Hand](https://blog.k10s.dev/im-going-back-to-writing-code-by-hand)

---

## The 5 Claude Skills for React I Can't Live Without

**TLDR:** Claude skills are reusable instruction sets that load automatically when Claude Code detects a matching task. This article walks through five React-specific skills that replace the endless copy-paste of context into every new session, and explains why encoding team knowledge in skills beats relying on individual developer prompts.

If you've used Claude Code for more than a week, you've probably noticed yourself typing the same setup context over and over. "We use Tailwind, not CSS modules. Commit messages follow conventional commits. Components use function declarations, not arrow functions." Every new session, same preamble. Skills solve this by letting you write that context once and have it load automatically when the task matches.

The five skills covered here are specific and practical: how to scaffold new React components, how to run PR reviews against your team's actual criteria, which CSS approach to use and how, what the testing philosophy is, and how to format commit messages. Each one targets a place where inconsistency between developers, or between developers and AI assistance, causes friction. The PR review skill is the one I find most interesting because it encodes the judgment calls that usually live only in senior developers' heads. What counts as a blocking issue? What accessibility requirements are non-negotiable? That knowledge tends to transfer badly across a team, and a skill is a reasonable place to capture it.

The article makes a point that I think is the real value here: new team members get consistent AI assistance from day one. The knowledge is in the repository, not in whoever has been on the team longest. That's a genuinely different model for how team knowledge gets preserved and transmitted, and it has nothing to do with AI being magic. It's just documentation that happens to be machine-readable.

Skills live in the `.claude/skills/` directory and are loaded via metadata that tells Claude Code when they apply. The format is straightforward enough that writing one isn't a project, it's an afternoon. And unlike a wiki page or an onboarding doc that nobody reads after the first month, skills get used every time Claude Code helps someone on the task they describe.

**Key takeaways:**
- Claude skills encode team conventions once so they don't have to be re-explained every session
- The PR review skill is particularly worth building because it captures judgment that usually lives only with senior developers
- Skills make AI assistance consistent for new team members from their first day, without anyone having to remember to share context

**Why do I care:** Consistency across a team's AI-assisted work is becoming as important as consistency in code style or commit format. If everyone is prompting Claude differently, you get different results, and nobody can predict or rely on what a colleague's AI-generated code will look like. Skills are a way to bring that under control without heavy process overhead. For a frontend architect, that's the difference between AI tooling that helps the whole team and AI tooling that just helps whoever is most aggressive about prompting it well.

**Link:** [The 5 Claude Skills for React I Can't Live Without](https://blog.logrocket.com/top-five-claude-skills-for-react)
