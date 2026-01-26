---
title: "Use Your ChatGPT Subscription Inside Kilo Code"
excerpt: "Flat-rate access to OpenAI's coding models in VS Code and JetBrains without pay-as-you-go API costs"
publishedAt: "2026-01-26"
slug: "chatgpt-subscription-kilo-code"
hashtags: "#substack #kilo #openai #chatgpt #vscode #jetbrains #ai #coding #agents #generated #en"
---

## ChatGPT Subscriptions Now Work in Kilo IDE Extensions

**TLDR:** Kilo Code now supports OAuth login with your ChatGPT subscription, giving you flat-rate access to OpenAI's coding models (GPT-5.2-Codex, o3, o4-mini) inside VS Code and JetBrains without additional pay-as-you-go API costs.

If you're already paying for ChatGPT Plus or Pro, you've been leaving value on the table. Those subscription tiers include access to OpenAI's Codex catalog - powerful models optimized for coding - but until now, using them in your IDE required separate API billing.

Kilo Code's new integration changes this equation. OAuth authentication lets you sign in with your existing ChatGPT subscription and use included models without pay-as-you-go charges. Your subscription limits apply, but within those limits, it's effectively flat-rate IDE coding assistance.

The model selection depends on your subscription tier but includes compelling options. GPT-5.2-Codex is tuned specifically for agentic workflows and multi-file refactors. Standard GPT-5.2 provides strong general-purpose reasoning for daily coding tasks. GPT-5-Mini offers fast iterations when you're optimizing for speed. The o3 model handles deep reasoning for complex planning and debugging, while o4-mini provides efficient everyday reasoning.

The setup is straightforward: open Kilo Code settings, select "OpenAI – ChatGPT Plus/Pro" as your API provider, authenticate via OAuth in your browser, and select a model. Secure OAuth tokens are stored in VS Code's secret storage.

The vendor-neutral approach is worth noting. You're not locked in - you can switch between OpenAI, Claude, Gemini, or local models at any time. This lets you use your ChatGPT subscription where it makes sense while maintaining flexibility.

Limitations exist: you only get access to Codex catalog models (not every OpenAI API model), OAuth tokens can't be exported with settings, and you need an active ChatGPT Plus or Pro subscription.

For teams already invested in ChatGPT subscriptions, this integration extracts more value from existing spend. The ability to use subscription-included models for IDE workflows eliminates the awkward split between chat-based assistance and coding tools.

**Key takeaways:**
- ChatGPT Plus/Pro subscriptions include Codex models usable in Kilo without extra API costs
- OAuth login - no API keys needed, authenticate via browser
- Models include GPT-5.2-Codex, GPT-5.2, GPT-5-Mini, o3, o4-mini
- Vendor-neutral - switch between providers freely
- Full agentic workflows: generate, refactor, debug, edit files, run terminal commands

**Link:** [Use your ChatGPT subscription inside Kilo](https://blog.kilo.ai/p/use-chatgpt-subscription-inside-kilo)

---

*This summary was generated based on newsletter content. Always verify technical details against official documentation before implementation.*