---
title: "Teaching Your iPhone to Be Your Personal Expense Tracker"
excerpt: "How Apple Shortcuts, Apple Intelligence, and Numbers combine into a fully local, private expense tracking system on your iPhone."
publishedAt: "2026-02-12"
slug: "iphone-expense-tracker-apple-shortcuts-intelligence"
hashtags: "#apple #ios #shortcuts #appleintelligence #privacy #automation #fintech #productivity #generated #en"
---

## I Taught My iPhone to Track My Expenses

**TLDR:** A clever system using two Apple Shortcuts and a Numbers spreadsheet turns your iPhone into a fully automated expense tracker. One shortcut processes receipt photos, another hooks into Apple Wallet transactions, and Apple Intelligence categorizes everything -- all without your financial data ever leaving your device.

**Summary:**

Here is a fascinating little project that solves a problem we have all experienced: expense tracking falls apart because of friction. You spend money throughout the day, then you are expected to reconstruct it later in some app. The insight here is that your iPhone already has all the pieces to solve this -- Apple Wallet knows what you bought, the camera can read receipts, Apple Intelligence can analyze text on-device, and Numbers is a capable spreadsheet app. Nobody just bothered to connect them. Until now.

The system works with two inputs feeding one Numbers spreadsheet. The first input is a Shortcut that processes receipt photos. You snap a picture, run the shortcut, and Apple Intelligence extracts the merchant name, card info, amount, and category, then logs it into your spreadsheet. The second input is an automation tied to Apple Wallet. Every time you tap to pay, the automation fires, Apple Intelligence categorizes the transaction, and it lands in the same spreadsheet. You set it up once and forget about it. The Numbers template has three tabs: an Overview with charts and totals, an Expenses tab where every transaction is logged, and Monthly Summaries for spotting spending patterns over time.

Now let me push back on a few things the author does not address. First, this system depends entirely on Apple Intelligence categorization being accurate, and we all know AI categorization can be hilariously wrong. What happens when your grocery run at Target gets categorized as "Shopping" instead of "Groceries"? The author mentions keeping category lists consistent across shortcuts, but says nothing about what happens when the AI misclassifies things. Second, there is no mention of handling edge cases like refunds, split payments, or cash transactions. If you are serious about expense tracking, those gaps matter. Third, the comparison to third-party finance apps is a bit unfair -- apps like Mint or YNAB pull from all your accounts automatically, not just Apple Wallet taps. If you use multiple payment methods, you are still doing manual work here.

The privacy argument is genuinely compelling though. The author makes an excellent point that the real value of finance apps was never their budgeting logic but the visualization layer on top of your data. You handed over bank logins and transaction history just to see some charts. This system gives you those same charts through Numbers without a single byte of your financial data touching someone else's server. No account creation, no bank connections, no terms of service. That is a meaningful difference in a world where data breaches at fintech companies are becoming routine.

What the author is avoiding thinking about is the sustainability and maintainability of this approach. Shortcuts are notoriously fragile across iOS updates. Apple could change how Wallet automations work, how Apple Intelligence processes text, or how Numbers handles data input, and your whole system breaks. There is no versioning, no backup strategy discussed, and no fallback plan. The DIY approach is admirable but it comes with DIY maintenance costs that the article hand-waves away.

**Key takeaways:**
- Your iPhone already has all the components for automated expense tracking -- Shortcuts, Apple Intelligence, Apple Wallet, and Numbers -- they just need to be connected
- The system uses two inputs (receipt photos and Apple Wallet tap-to-pay) feeding into one Numbers spreadsheet
- All processing happens on-device using Apple Intelligence, so your financial data never leaves your phone
- Keeping category lists consistent across both shortcuts and the spreadsheet template is critical for clean data
- The privacy advantage over third-party finance apps is real and significant, but the system has gaps around edge cases and long-term maintainability

**Link:** [I Taught My iPhone to Track My Expenses](https://techtiff.substack.com/p/apple-wallet-expense-tracker-shortcuts)