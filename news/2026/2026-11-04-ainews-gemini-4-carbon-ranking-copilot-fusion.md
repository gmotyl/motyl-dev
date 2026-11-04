---
title: "AINews: Gemini 4 Carbon na szczycie rankingów, Copilot Fusion i spory o benchmarki"
excerpt: "Carbon ma 59 w indeksie AA v5, ale w kodowaniu przegrywa z Opusem. GitHub Copilot Fusion miesza modele Anthropic i OpenAI w jednym agencie."
publishedAt: "2026-11-04"
slug: "ainews-gemini-4-carbon-ranking-copilot-fusion"
hashtags: "#latent #ainews #ai #llm #github-copilot #security #benchmarks #generated #pl"
source_pattern: "Latent Space"
---

## Gemini 4 Carbon i rankingi

**TLDR:** Google wypuścił Gemini 4 Carbon dwa tygodnie po Argonie, najpierw dla obrońców cyberbezpieczeństwa. W niezależnych rankingach jest pierwszy, ale w kodowaniu nadal przegrywa z Opusem 5.5.

**Summary:** Google podaje 88,2 procent w SEC-bench Pro, 54,8 w ExploitGym i 71,0 w CWE-bench. Dostęp dostają najpierw zaufani obrońcy w programie Fairwind. Artificial Analysis daje Carbonowi 59 w indeksie v5 i pierwsze miejsce, przy koszcie 7,76 dolara na zadanie wobec 10,04 dla Opusa 5.5. W agencie kodującym wynik to 59 wobec 62 Opusa w Claude Code, ale mierzono go w Antigravity CLI, więc inne harnessy nie są sprawdzone. Współczynnik halucynacji wzrósł z 4 do 11 procent, co nadal jest drugim wynikiem w stawce.

Poza tym w numerze pojawia się GitHub Copilot Fusion, który w czasie działania miesza modele Anthropic i OpenAI. Według AA kosztuje 5,59 dolara na zadanie wobec 11,42 dla Claude Code z Opusem i jest o 2 punkty gorszy. Prowadzi w Terminal-Bench 4.0 z wynikiem 71. GitHub deklaruje do 77 procent niższy koszt. Ciekawa jest też liczba, że domyślne prompty systemowe 30 otwartych harnessów mają od 235 tokenów w goose do 11 974 w Gemini CLI, zanim doliczy się narzędzia.

**Key takeaways:**
- Carbon prowadzi w indeksie v5 z wynikiem 59, ale w kodowaniu jest za Opusem.
- Copilot Fusion jest tańszy o połowę przy 2 punktach gorszego wyniku.
- Prompty systemowe harnessów różnią się o ponad 50 razy.

**Why do I care:** Dla nas użyteczna jest ostatnia liczba. Prompt systemowy ponad 11 tysięcy tokenów to koszt w każdym wywołaniu, o którym rzadko się mówi. Wyniki Carbona w kodzie są zmierzone w jednym harnessie, więc nie wyciągałbym wniosku o przesiadce.

**Link:** [Gemini 4 Carbon tops leaderboards, launches for cyber defenders](https://www.latent.space/)
