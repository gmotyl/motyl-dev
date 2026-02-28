---
title: "Rapidus: Japan's Audacious Bet to Leapfrog 15 Years of Semiconductor History"
excerpt: "Japan's state-backed chip startup Rapidus is racing to build a 2nm foundry from scratch, but the gap between ambition and reality in semiconductor manufacturing is measured in decades, not dollars."
publishedAt: "2026-02-03"
slug: "rapidus-japan-2nm-chip-startup-semiconductor-race"
hashtags: "#ai-supremacy #semiconductors #japan #rapidus #ai #chipmaking #geopolitics #generated #en"
---

## Japan's National Chip Startup Races to 2nm Mass Production

**TLDR:** Japan's Rapidus, a government-backed semiconductor startup founded in 2022, is attempting to skip 15 years of chip node progression and jump straight to 2nm manufacturing by 2027. While the ambition is remarkable, the gap between lab-grade transistor demos and high-yield mass production remains enormous, and the company faces fundamental challenges in experience, customer demand, and economics.

**Summary:**

Let me tell you about one of the most fascinating and audacious bets happening in the semiconductor world right now. Rapidus Corporation, Japan's state-backed chip startup, is trying to do something that no company in the history of semiconductor manufacturing has ever done: leap from 40-nanometer capability, which is technology from 2008, straight to 2nm cutting-edge production. That is not a small gap. That is fifteen years of accumulated manufacturing knowledge they are trying to skip over.

The backstory matters here. In the 1980s, Japan absolutely dominated semiconductors. Names like NEC, Toshiba, and Hitachi controlled over fifty percent of the global market. And then they lost it. Today, Japan's most advanced domestic chipmaking sits at 40nm while TSMC, Samsung, and Intel are pushing to 2nm and beyond. Japan still dominates the ingredients: Tokyo Electron holds essentially all of the EUV coater and developer equipment market, Japanese firms produce seventy-five percent of high-end photoresist, and SUMCO and Shin-Etsu control sixty percent of silicon wafers. But as the article puts it bluntly, "dominating the ingredients is not the same as baking the cake."

The strategic calculus is straightforward and sobering. Taiwan, home to TSMC, produces over ninety percent of the world's most advanced logic chips, and it sits a hundred miles from mainland China under persistent geopolitical tension. Japan's military, its tech industry, and its economic future all depend on chips it cannot make domestically. This is not primarily a commercial venture. This is a sovereignty project.

Rapidus's core technical bet rests on a genuinely interesting argument from CEO Koike Atsuyoshi: the transition from FinFET to Gate-All-Around transistor architecture is so fundamentally different that everyone starts from zero. Since GAA wraps the gate around all four sides of stacked nanosheets rather than three sides of a fin, the manufacturing processes and physics are different enough that TSMC's decades of FinFET expertise provide limited advantages. Rapidus licensed IBM's GAA technology, trained over 150 engineers at IBM's Albany research facility, and by mid-2025 demonstrated working 2nm transistors in their Hokkaido fab. They have also introduced Raads, an AI-assisted design solution using large language models to help engineers design chips specifically for the 2nm process.

But here is what the article's author does not spend enough time on: IBM is a research organization, not a manufacturing organization. IBM sold its chip manufacturing to GlobalFoundries in 2014 and has not run high-volume production in over a decade. Making a working transistor in a research lab is fundamentally different from producing millions of them with consistent yields above seventy to eighty percent. The accumulated dark art of process control, defect management, and yield optimization that TSMC has refined over thirty years simply cannot be licensed. It has to be earned through production experience.

The demand side looks even more challenging. Rapidus has announced exactly one confirmed customer: Tenstorrent, a Canadian AI chip startup building RISC-V accelerators. Broadcom is reportedly "evaluating" samples. That is it. No Apple, no Nvidia, no AMD, no hyperscalers. The eight founding Japanese companies, including Toyota, Sony, and SoftBank, have collectively invested just fifty-one million dollars, which is less than the cost of a single EUV lithography machine. Compare that to the Japanese government's twelve billion plus. The commercial-to-public investment ratio of 236 to 1 tells you everything about where the real demand signal is.

And there is one more critical gap the article highlights that deserves attention: backside power delivery. By 2027, both Intel and TSMC will offer backside power delivery networks on their most advanced processes, which relocate power circuits to the back of the chip for better density and efficiency. Rapidus will not have this capability. So they are not actually catching up to 2027 TSMC. They are catching up to roughly 2024 TSMC, offering an inferior product at a higher price due to their inherently more expensive single-wafer processing approach.

What is missing from this analysis? The article does not seriously explore whether Rapidus might succeed as something other than a direct TSMC competitor. Could they carve out a defensible niche in rapid prototyping for government and defense applications where speed matters more than cost? Could the fifty-day cycle time versus TSMC's hundred-twenty days be genuinely transformative for certain AI chip startups iterating on novel architectures? The article frames it as binary success or failure, but the reality might be a modest, strategically valuable facility that never achieves TSMC-scale economics but still serves Japan's national security needs. That is not the moonshot narrative, but it might be the realistic outcome.

**Key takeaways:**
- Rapidus is attempting to skip 15 years of semiconductor node progression, going from 40nm to 2nm, something no company has ever done
- The company uses IBM's licensed GAA transistor technology, but IBM has not run high-volume manufacturing since 2014, so the gap between research and production remains enormous
- Rapidus's single-wafer processing targets 50-day cycle times versus TSMC's 120 days, but at higher cost and lower capacity of only 25,000 wafers per month
- Japan lacks the domestic fabless design ecosystem that gave TSMC its initial volume, and Rapidus has only one confirmed customer in Tenstorrent
- The absence of backside power delivery in Rapidus's roadmap means they will launch behind where TSMC and Intel will be in 2027
- The Japanese government has invested over 12 billion dollars, but the eight founding corporate backers have contributed only 51 million combined, signaling weak commercial conviction
- Rapidus introduced Raads, an AI-assisted chip design platform using LLMs, which could differentiate their offering for customers building on the 2nm process

**Tradeoffs:**
- **Speed vs. Cost**: Single-wafer processing enables faster iteration (50 vs. 120 days) but is inherently more expensive per wafer than batch processing
- **Node skipping vs. Accumulated learning**: Jumping to GAA avoids FinFET legacy debt but forfeits the process control knowledge gained at each intermediate node
- **National security vs. Commercial viability**: The 236:1 public-to-private investment ratio suggests this project's value may be primarily strategic rather than economic
- **Rapid prototyping niche vs. Volume production**: Targeting fast-iteration customers limits the addressable market and prevents the volume-driven yield improvements that make fabs economically sustainable

**Link:** [Japan's National Chip Startup Races to 2nm Mass Production](https://www.ai-supremacy.com/p/japans-national-chip-startup-races-2nm-rapidus)