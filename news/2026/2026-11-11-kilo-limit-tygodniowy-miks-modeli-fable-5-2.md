---
title: "Kilo: tygodniowy limit nie jest problemem, problemem jest miks modeli"
excerpt: "Dlaczego po premierze Fable 5.2 limity w Claude Code topnieją i jak podział planowania, implementacji i czytania między modele obniża rachunek."
publishedAt: "2026-11-10"
slug: "kilo-limit-tygodniowy-miks-modeli-fable-5-2"
hashtags: "#kilo #ai #llm #agents #productivity #devtools #generated #pl"
source_pattern: "Kilo"
---

## Limit tygodniowy to budżet, a nie licznik

**TLDR:** Po premierze Fable 5.2 użytkownicy Claude Code skarżą się na szybkie wyczerpywanie limitów. Autorzy z Kilo twierdzą, że głównym powodem jest uruchamianie najdroższego modelu w każdej turze, a rozwiązaniem podział pracy między modele.

**Summary:** Punkt wyjścia to dwa wpisy deweloperów: jeden doszedł do 65 procent limitu w dwa dni po resecie, drugi po dniu na Opusie 5.5 i dniu mieszanym spadł do 37 procent. Fable 5.2 kosztuje osiem dolarów za milion tokenów wejściowych i czterdzieści za wyjściowe, po obniżce o dwadzieścia procent względem wersji 5.1. To nadal dwa razy więcej niż Opus 5.5 i cztery razy więcej niż Sonnet 5.5. Co ważniejsze, na planach Max Fable liczy się do zwykłego limitu tygodniowego, ale z sufitem pięćdziesięciu procent, więc pracując wyłącznie na nim, tracisz połowę planu.

Autorzy liczą przykład: sesja czytająca milion tokenów i piszącą sto tysięcy kosztuje na Fable dwanaście dolarów, na Opusie sześć, na Sonnecie trzy. Jeśli planowanie to dwadzieścia procent pracy, to plan na Fable i implementacja na Opusie dają 7,20 dolara, czyli około czterdzieści procent mniej, a z Sonnetem 4,80. Zastrzegają, że tańszy model, który potrzebuje trzech podejść, tak naprawdę nie jest tańszy, więc liczy się koszt udanego zadania. Proponują podział: Fable do planów, architektury i ryzykownych przeglądów, Opus do implementacji z pisemnego planu, Sonnet do eksploracji i testów, a małe modele do drobnych zadań.

Trzeba pamiętać, że to wpis blogowy firmy sprzedającej narzędzie do routingu modeli, które rozwiązuje opisany problem. Liczby liczone są na cenniku API, bo plany subskrypcyjne nie ujawniają liczby tokenów. Argument jest rozsądny, ale nie wyklucza błędów po stronie dostawcy, o których wpis wspomina tylko mimochodem.

**Key takeaways:**
- Model z sufitem na limit sprawia, że miks modeli decyduje, ile planu faktycznie wykorzystasz.
- Plan wygenerowany przez drogi model i wykonany przez tańszy obniża koszt o 40 do 60 procent według rachunku autorów.
- Liczy się koszt udanego zadania, a nie pojedynczej tury.

**Why do I care:** Zapisany plan jako plik przekazywany do świeżej sesji to wzorzec, który warto stosować niezależnie od narzędzia. Ustaw domyślny model per agent i nie zostawiaj najdroższego na czytanie logów, bo tam idzie większość tokenów.

**Link:** [Your Weekly Limit Isn't the Problem, Your Model Mix Is](https://blog.kilo.ai/p/your-weekly-limit-isnt-the-problem)
