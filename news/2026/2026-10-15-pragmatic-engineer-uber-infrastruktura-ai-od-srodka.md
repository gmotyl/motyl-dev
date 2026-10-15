---
title: "Pragmatic Engineer: infrastruktura AI w Uberze od środka"
excerpt: "Uday Kiran Medisetty opowiada, jak dekada narzędzi deweloperskich przygotowała Ubera na agentów: Model Gateway, AIFX, koszty tokenów i zmiana code review."
publishedAt: "2026-10-15"
slug: "pragmatic-engineer-uber-infrastruktura-ai-od-srodka"
hashtags: "#pragmaticengineer #ai #agents #architecture #devtools #engineering #generated #pl"
source_pattern: "Pragmatic engineer"
---

## Uber i jego narzędzia dla agentów AI

**TLDR:** Rozmowa z jednym z najdłużej pracujących inżynierów Ubera pokazuje, że narzędzia AI powstały szybko dzięki dekadzie wcześniejszych inwestycji w narzędzia deweloperskie. Kluczowe są bramka modeli, kontrola kosztów i nowe podejście do code review.

**Summary:** Uday Kiran Medisetty, Distinguished Engineer w Uberze, opisuje jedenaście obserwacji. Liczba serwisów skoczyła z dwóch w 2015 do tysięcy w 2019 i w 2026 jest podobna, mimo dziesięciokrotnie większego biznesu. Uber budował wiele rzeczy sam, bo nic gotowego nie wytrzymywało skali: uOwn, M3DB (pół miliarda metryk na sekundę, na jego bazie powstał Chronosphere), Cadence (na nim oparto Temporal) i Morpheus do flag i eksperymentów.

Od 2023 wszystko oparto na Model Gateway, niezależnej od modelu i harnessu. Dodano AI Guard działający jako middleware bezpieczeństwa, śledzenie wydatków per użytkownik i logi audytowe. AIFX to nakładka nad Claude Code, Codex i OpenCode, dzięki której ustawienia, skille i wtyczki przechodzą razem z inżynierem przy zmianie narzędzia. Wydatki działają w modelu poziomów z akceptacją menedżera po przekroczeniu limitu, a wtyczka CostCheck podpowiada, jak obniżyć koszty. Uber zmniejszył koszty tokenów o około połowę w kilka miesięcy.

Każdy PR nadal przegląda człowiek, ale przed nim działa AI code review, dołączane są zrzuty i wideo oraz ocena ryzyka. Liczba zadań CI w rok ponad się podwoiła, co wywołało wewnętrzny "code red", więc proste kontrole przeniesiono do pętli wewnętrznej, uruchamianej przez agenta przed otwarciem PR. Zamiast czasu dojścia PR na produkcję Uber taguje PR-y rodzajem pracy: feature, bugfix, maintenance, testy, dokumentacja. Udział feature'ów rośnie, a maintenance maleje.

Według Udaya praca inżyniera polega teraz na budowaniu kontekstu dla agentów, multitaskingu i weryfikacji wyników.

**Key takeaways:**
- Bramka modeli neutralna wobec dostawców ułatwiła dokładanie zabezpieczeń i kontroli kosztów.
- Wewnętrzne środowiska jak DevPods z 2017 napędzają dzisiejszych agentów.
- Metryka "prędkość PR" traci sens, gdy agent tworzy setki PR-ów.

**Why do I care:** To dobra odpowiedź na pytanie, od czego zacząć: od uporządkowanych rejestrów API, tracingu i środowisk, nie od wyboru modelu. Rozmowa jest jednak opowieścią firmy z gigantycznym budżetem, więc małe zespoły powinny wybrać z niej pojedyncze elementy, jak tagowanie PR-ów i kontrolę kosztów.

**Link:** [Uber's AI infra, from the inside](https://newsletter.pragmaticengineer.com/p/ubers-ai-infra-from-the-inside)
