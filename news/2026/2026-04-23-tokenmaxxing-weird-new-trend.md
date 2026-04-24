---
title: "Tokenmaxxing — Dziwny nowy trend w Big Tech"
excerpt: "Pracownicy Meta, Microsoft i Salesforce rywalizują na wewnętrznych leaderboardach zużycia tokenów. Praktyka zwana tokenmaxxing stała się nową formą widocznej konsumpcji w Silicon Valley."
publishedAt: "2026-04-23"
slug: "tokenmaxxing-weird-new-trend"
hashtags: "#ai #meta #microsoft #salesforce #productivity #corporate-culture #generated #pl"
source_pattern: "Substac"
---

## Tokenmaxxing — Dziwny nowy trend w Big Tech

**TLDR:** W Meta, Microsoft i Salesforce pracownicy rywalizują na wewnętrznych leaderboardach zużycia tokenów AI. Praktyka zwana "tokenmaxxing" zamieniła zużycie tokenów w miernik produktywności. Meta użyła 60.2 tryliona tokenów w 30 dni — koszt szacowany na $100M+. Po mediowym backlash Meta usunęła leaderboard.

**Summary:** Inside Meta, inżynier stworzył "token leaderboard" który rankuje pracowników po zużyciu tokenów. The Information doniósł że pracownicy Meta którzy chcą pokazać swoje AI superuser chops rywalizują o status "Session Immortal" lub jeszcze lepiej "Token Legend". Leaderboard agreguje AI usage z ponad 85,000 pracowników Meta, listując top 250 power users. Praktyka jest emblemą najnowszej formy conspicuous consumption w Silicon Valley, znanej jako "tokenmaxxing", która zamieniła zużycie tokenów w benchmark produktywności i konkurencyjną miarę tego, kto jest najbardziej AI-native. Rozmowa z inżynierami z Meta ujawniła: "Massive waste. Plenty of devs are running an OpenClaw-like internal agent that burns massive amounts of tokens for little to no outcome." "Outages caused by AI overuse. A dev mentioned that some SEVs were caused by what looked like careless AI code generation; almost like a dev behind the SEV was more concerned with churning out massive amounts of code with AI than with product quality." Zgodnie z The Information, pracownicy Meta użyli łącznie 60.2 tryliona AI tokenów w 30 dni. Gdyby obciążyć to cenami API Anthropic, kosztowałoby to $900M. Meta prawdopodobnie kupuje_tokens ze zniżką, ale i tak może to być $100M+, głównie z "senseless tokenmaxxing".

Po backlash na social media, Meta zniosła wewnętrzny leaderboard. Jeden inżynier z Meta podejrzewa że prawdziwym celem było generowanie real-world traces do trenowania next-generation coding model: "Putting a leaderboard in place was always going to incentivize much more AI usage. And more AI usage means producing a lot more real-world traces. These traces can then be used to train Meta's next-generation coding model better."

Microsoft ma podobny wewnętrzny token leaderboard od stycznia. Ciekawostka: very senior engineers — distinguished-level folks — są w top 5 w całej firmie, mimo że generalnie w przeszłości pisali mało kodu. VP-level folks są w top 10 i top 20, mimo że często są na meetings przez większość dnia i rzadko piszą kod.

Inżynier z Microsoft przyznaje że jest full-on tokenmaxxing — nie żeby być na leaderboard, ale dlatego że nie chce być postrzegany jako "używający za mało AI": "I am conscious of not wanting to be seen as 'uses too little AI,' and I'm not ashamed to say I need to do tokenmaxxing to do this." Rzeczy które robi żeby zawyżyć metryki: pyta AI o kod który jest już w dokumentacji (10x wolniej niż użycie readthedocs, ale spala masę tokenów), każe AI prototypować feature na który nie ma zamiaru pracować, zawsze używa agenta nawet gdy wie że mógłby zrobić to ręcznie szybciej.

Salesforce stworzył podobne zachęty: Mac widget pokazujący własny spend co 15 minut, display minimum expected spend ($100 na Claude Code, $70 na Cursor tydzień temu), webowy tool do sprawdzania spend każdego kolegi. Wiadomość jest jasna: "używaj minimum $170/miesiąc tokens albo zostaniesz oflagowany."

Shopify miał pierwszy token leaderboard w 2025 i działał dobrze — ale później rename'owali na "usage dashboard" z oczywistych powodów. Kluczowe: circuit breakers do łapania "runaway agents", sprawdzanie top-spending individuals przez Farhan Thawar, i skupienie na "whose tokens cost the most?" nie "who spent the most?"

**Key takeaways:**
- Meta: 60.2T tokens w 30 dni = ~$100M+ koszt
- Tokenmaxxing generuje waste, wolniejszą pracę i outages
- Inżynierowie "rozmyślnie nieefektywni" żeby unikać bycia oflagowanym jako "za mało AI-native"
- Lines-of-code metric wraca w nowej formie — tokens zamiast LOC
- Shopify jako model: usage dashboard z circuit breakers

**Why do I care:** To jest dosłownie kafkaeskie. Jako inżynier, widzę tu echo wszystkich złych praktyk z przeszłości: LOC metrics wracają jako token metrics. Tylko zamiast pisać boilerplate żeby zwiększyć LOC, ludzie zmuszają AI do generowania throwaway kodu żeby zwiększyć token usage. Absurd osiąga poziom że ludzie celowo robią rzeczy wolniej (używają AI do pytań na które mają dokumentację pod ręką) żeby wygenerować więcej tokenów. A najgorsze: firmy tworzą zachęty które generują real cost bez real value. Microsoft i Meta wiedzą że to wasteful i wciąż to robią. Może jedynym sensownym podejściem jest to co Shopify: circuit breakers, sprawdzanie jakości, nie ilości, i traktowanie top spenders jako interesting case studies, nie heroów leaderboarda.

**Link:** [The Pulse: 'Tokenmaxxing' as a weird new trend](https://newsletter.pragmaticengineer.com/p/the-pulse-tokenmaxxing-as-a-weird-6b2?publication_id=458709&post_id=195260081&isFreemail=true&triedRedirect=true)