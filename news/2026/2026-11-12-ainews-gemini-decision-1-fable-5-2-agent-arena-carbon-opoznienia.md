---
title: "AINews: Gemini Decision 1, Fable 5.2 na szczycie Agent Arena i Carbon z problemem opóźnień"
excerpt: "Google wprowadza model decyzyjny za 0,10 dolara za milion tokenów, Fable 5.2 wygrywa ranking agentowy, a DeepMind dowodzi bezpieczeństwa libsignal."
publishedAt: "2026-11-12"
slug: "ainews-gemini-decision-1-fable-5-2-agent-arena-carbon-opoznienia"
hashtags: "#latent #ai #llm #agents #ml #security #generated #pl"
source_pattern: "Latent Space"
---

## Gemini Decision 1 i dzień modeli systemu pierwszego

**TLDR:** Google zaskoczył premierą modelu decyzyjnego Gemini Decision 1 z API, który ocenia wybory w jednym przejściu. Niezależne wyniki są mniej jednoznaczne niż porównania producenta.

**Summary:** Model obsługuje pytania tak lub nie, wielokrotny wybór i ocenę według rubryki. Przyjmuje tekst, obraz, audio, wideo i PDF, do 1000 pytań w żądaniu, ma kontekst 256 tysięcy tokenów, odpowiada w 150 do 250 ms i dołącza wynik pewności do każdej odpowiedzi. Cena to 0,10 dolara za milion tokenów wejściowych i zero za wyjście, około pięć razy taniej niż Flash-Lite. Projekt zaczął się jako prototyp w DeepMind, a mały zespół wypuścił model w około sześć tygodni.

Według testów Google model wygrywa z Jev 1.14 w pięciu z siedmiu wspólnych testów, na przykład 92,2 do 90,0 procent na JevBench. Artificial Analysis pokazuje obraz bardziej mieszany. Wynik 66 w Decision Index to remis z Jev 1.14 i siedem punktów za Drex Max v1.1. Koszt to 345 dolarów za milion zadań wobec 156 dla Jev i 103 dla Drex Max, a średni czas to 211 ms wobec 92 ms dla Jev. Cloudflare opisał hybrydową architekturę agenta. Szybkie modele wybierają narzędzia i wyciągają logi, a duży model robi tylko diagnozę, co w demo zmniejszyło sześć wywołań do jednego i około 40 tysięcy tokenów do 1,8 tysiąca.

**Key takeaways:**
- Cena 0,10 dolara za milion tokenów wejściowych, wyjście bezpłatne.
- Niezależne testy dają remis z Jev, a nie przewagę.
- Wzorzec hybrydowy, szybkie decyzje i duży model do diagnozy, obniża koszty.

**Why do I care:** Ciekawsze od premiery jest to, że kategoria powstaje na naszych oczach, a pierwsze porównania robią sami producenci. Zanim wybierzesz model decyzyjny do produkcji, sprawdź go na własnych danych, i patrz na opóźnienie, nie tylko na dokładność.

**Link:** [Gemini Decision 1](https://www.latent.space/)

## Wyniki modeli frontier i spór o opóźnienia Carbon

**TLDR:** Claude Fable 5.2 prowadzi w Agent Arena z wynikiem +30,4 procent, a Gemini 4 Carbon jest szybki i tani w rankingach, ale praktycy narzekają na opóźnienia.

**Summary:** W ponad 4,7 tysiąca realnych sesji agentowych Fable 5.2 na poziomie Max ma wynik około 1,6 razy wyższy niż Opus 5.5 (+19,5 procent) i jest pierwszy w kodzie, pracy i czacie. Ceny API spadły z 10 i 50 do 8 i 40 dolarów za milion tokenów, a mediana kosztu zadania wynosi 7,3 dolara wobec 5,5 dla Opus 5.5 i 1,5 dla Carbon w wersji High. Artificial Analysis zauważa, że w rodzinie Claude przejście na wyższy model opłaca się bardziej niż podnoszenie poziomu wysiłku. Vals twierdzi, że ustawienie high Fable bywa tańsze i lepsze niż xhigh czy max.

Theo zmierzył, że Carbon na niskim wysiłku potrzebował 22 minut 21 sekund, a Opus 5.5 na high 9 minut 33 sekund, z około 11 sekundami do pierwszego tokenu. Martin Casado chwali Carbon za kod, a Mikhail Parakhin uważa, że model bywa lepszy w matematyce, ale nie ufa mu w kodowaniu. Meta Muse Ember osiąga według Vals 85 procent wyników Fable 5.2 za 0,84 procent kosztu. Wynik trzeba czytać ostrożnie, bo to relacja z Twittera, a część liczb pochodzi z pojedynczych pomiarów.

**Key takeaways:**
- Fable 5.2 prowadzi w Agent Arena, a jego ceny API spadły.
- Zmiana modelu często daje więcej niż zwiększenie poziomu wysiłku.
- Carbon ma problem z opóźnieniem, choć rankingi go lubią.

**Why do I care:** Rankingi mierzą jakość, a zespoły płacą też czasem czekania. Przy pracy interaktywnej 22 minuty zabija wartość modelu, niezależnie od miejsca w tabeli. Wybierając model, zmierz własne zadania i opóźnienie do pierwszego tokenu.

**Link:** [Agent Arena: Fable 5.2](https://www.latent.space/)

## DeepMind dowodzi bezpieczeństwa libsignal

**TLDR:** Framework AlphaProof Code wygenerował dowody w Lean dla kluczowych własności bezpieczeństwa niezmienionej biblioteki libsignal, aż do skompilowanego kodu maszynowego.

**Summary:** Agenci Gemini napisali ponad 6 milionów linii dowodów, a ludzie przeglądali krytyczny jeden procent. Pięcioosobowy zespół skończył w cztery tygodnie, podczas gdy weryfikacja mikrojądra seL4 zajęła dwadzieścia osobolat. Gdy ponownie wprowadzono dwa stare błędy, system uznał wadliwe wersje za niebezpieczne. Obok tego DeepMind pokazał AlphaGenome 2, który identyfikuje 30 procent wariantów przyczynowych wobec 16 procent u poprzednika, oraz Gemini Robotics 2.5 z poprawą skuteczności o 30 do 100 procent. Streszczenie obejmuje tylko pierwszą część newslettera, bo resztę o bezpieczeństwie i robotyce odcięto przy czytaniu.

**Key takeaways:**
- Dowody w Lean dla niezmienionego kodu, w cztery tygodnie.
- Ludzie weryfikują tylko krytyczny fragment dowodów.
- AlphaGenome 2 poprawia identyfikację wariantów przyczynowych.

**Why do I care:** Formalna weryfikacja z agentami jest ciekawa dla każdego, kto trzyma kod krytyczny. Dla frontendu to odległe, ale kierunek jest wyraźny. Gdy kod pisze agent, weryfikacja ma większą wartość niż jego czytanie.

**Link:** [AlphaProof Code and libsignal](https://www.latent.space/)
