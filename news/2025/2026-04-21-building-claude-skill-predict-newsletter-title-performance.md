---
title: "Building a Claude Skill for Predicting Newsletter Title Performance"
excerpt: "A data-driven approach to title optimization using personal analytics, with detailed setup and workflow examples."
publishedAt: "2026-04-21"
slug: "building-claude-skill-predict-newsletter-title-performance"
hashtags: "#substack #ai #newsletter #analytics #claude #generated #en"
---

## I Built a Claude Skill That Predicts Whether My Titles Will Convert Before I Hit Publish

**TLDR:** The author built a Claude skill called MoneyTalks that predicts newsletter title performance using their 277 articles as training data, scoring new titles against historical winners and losers to optimize before publishing.

**Summary:** Every publishing decision hinges on title choice, but instinct alone isn't enough. The author realized their newsletter titles had inconsistent patterns - some posts with great likes failed to convert subscribers, while others with modest engagement brought in paid readers. They needed data beyond gut feel.

They created MoneyTalks, a Claude skill that analyzes new titles against their archive. It flags structural issues, compares to similar past posts, predicts performance ranges, and suggests rewrites. The skill requires exporting Substack stats and setting up patterns from top and bottom performers.

Setup involves installing the skill in Claude Code or Claude Cowork, exporting CSV stats, and running an initial setup that derives patterns from 20% best and worst performing posts. The methodology splits framework from personal data, making it adaptable.

Testing showed useful predictions, though conservative. It identifies comparable past posts and their actual results rather than vague advice. The author plans to refine with cross-encoders and better reranking.

This approach transforms title selection from guesswork to data-driven optimization, with the added benefit of platform-agnostic design supporting Substack, Beehiiv, and others.

**Key takeaways:**
- Personal analytics outperform generic title advice
- Claude skills enable custom AI workflows with individual data
- Title optimization becomes systematic with historical pattern analysis
- Setup requires stats export and pattern derivation
- Platform-agnostic design supports multiple newsletter services

**Why do I care:** As someone creating content regularly, I struggle with title choices that seem right but underperform. Having a data-driven tool that learns from my own history would eliminate much of the uncertainty and improve conversion rates. The technical implementation shows how AI can be personalized for specific creative workflows.

**Link:** [I Built a Claude Skill That Predicts Whether My Titles Will Convert Before I Hit Publish](https://aimaker.substack.com/p/claude-skill-predict-newsletter-title-performance?publication_id=4443372&post_id=194768294&isFreemail=true&triedRedirect=true)