---
title: "Claude Haiku 5.5: tani model celuje w GPT-6 Luna, ale rachunek za tokeny komplikuje porównanie cen"
excerpt: "Anthropic wypuścił pierwszą aktualizację Haiku od roku, dopasowując cennik do GPT-6 Luna i dodając efforty oraz milion tokenów kontekstu, ale zużywa przy tym nawet trzy razy więcej tokenów na zadanie."
publishedAt: "2026-10-08"
slug: "claude-haiku-5-5-gpt-6-luna-porownanie"
hashtags: "#ai #llm #generated #pl"
source_pattern: "AINews"
---

## Claude Haiku 5.5: tani model celuje w GPT-6 Luna

**TLDR:** Anthropic wypuścił Claude Haiku 5.5, pierwszą aktualizację najmniejszego modelu od około roku, z ceną dopasowaną do GPT-6 Luna i jednoczesną obniżką cen Sonnet 5.5. Niezależne benchmarki pokazują realną poprawę względem Haiku 4.5, ale też nowy haczyk: model przy maksymalnym wysiłku zużywa około trzy razy więcej tokenów wyjściowych niż konkurencja, co podważa proste porównania cenowe.

**Summary:** Haiku 4.5 ukazał się w październiku 2025 i przez rok był trochę zapomnianym bratem rodziny Claude, skoro w międzyczasie zadebiutowały kolejne wersje Sonnet, Opus i Fable aż do 5.5. Haiku 5.5 wreszcie nadrabia zaległości i od razu dostaje efforty oraz adaptacyjne myślenie, funkcje wcześniej zarezerwowane dla większych modeli. Anthropic reklamuje go jako "najtańszy, najszybszy i najbardziej zdolny mały model", kosztujący średnio o 75 procent mniej niż Haiku 4.5. Cennik jest warstwowy: poniżej 100 tysięcy tokenów promptu płacisz 0,10 dolara za milion tokenów wejściowych i 0,50 dolara za wyjściowe, powyżej tego progu stawki rosną pięciokrotnie. Tego samego dnia Anthropic obciął też cenę odczytów z cache dla Sonnet 5.5 z 0,20 do 0,10 dolara za milion tokenów, co ma uczynić go tańszym o około 20 procent w długich zadaniach agentowych.

Niezależny benchmark Artificial Analysis daje modelowi 43 punkty w Intelligence Index przy maksymalnym wysiłku, czyli o 26 punktów więcej niż poprzedni Haiku, i stawia go nieznacznie przed GLM-5.3 Flash, Gemini 3.8 Flash oraz GPT-6 Luna. Model wciąż zostaje w tyle za Sonnet 5.5 o 13 punktów. Problem w tym, że przy maksymalnym wysiłku Haiku 5.5 zużywa około 162 tysiące tokenów wyjściowych na zadanie testowe, czyli mniej więcej trzy razy więcej niż GPT-6 Luna przy swoim maksymalnym ustawieniu, które zużywa około 50 tysięcy. Przy równym wyniku Haiku 5.5 na wysokim wysiłku osiąga 38 punktów zużywając 55 tysięcy tokenów, podczas gdy Luna przy maksimum osiąga ten sam wynik zużywając 50 tysięcy, a różnica rośnie jeszcze bardziej przy niższych ustawieniach wysiłku. To właśnie tłumaczy, dlaczego Cursor chwali się dziesięciokrotną oszczędnością na krótkich zapytaniach, a Anthropic mówi o 75 procentach średnio, bo obie liczby są prawdziwe dla różnych scenariuszy użycia.

Specyfikacja obejmuje milion tokenów kontekstu, co jest skokiem z 200 tysięcy w Haiku 4.5, oraz wejście tekstowe i obrazkowe przy wyjściu wyłącznie tekstowym. Na Terminal-Bench 4.0 model skoczył z zera procent dla poprzedniej wersji do 33 procent, zrównując się z GLM-5.3 Flash i wyprzedzając Gemini 3.8 Flash oraz GPT-6 Luna. Słabszym punktem jest dokładność faktograficzna: w teście AA-Omniscience Haiku 5.5 osiąga 36 procent trafności przy 40 procentach halucynacji, podczas gdy Gemini 3.8 Flash ma 55 procent trafności przy równie wysokim odsetku halucynacji, a GPT-6 Luna 44 procent trafności przy aż 77 procentach halucynacji. Częściowo tłumaczy to fakt, że Haiku chętniej przyznaje, że czegoś nie wie, zamiast zgadywać. Na AutomationBench model wypadł słabo, 35 procent wobec 53 do 60 procent u konkurencji, ale Anthropic przyznaje, że przedpremierowy błąd bezpieczeństwa powodował nadmierne odmowy wykonania zadań i pracuje nad poprawką.

W praktyce model jest pozycjonowany jako tani subagent działający pod nadzorem Opus 5.5 lub Sonnet 5.5, do zadań takich jak podsumowania, kompresja kontekstu czy zapytania do bazy danych. Cursor, GitHub Copilot w VS Code i Devin od Cognition wdrożyły go tego samego dnia, a Devin raportuje 58,4 procent na FrontierCode 1.1 przy mniej więcej ósmej części kosztu Sonnet 5. Jednocześnie Claude Platform wprowadził miesięczne kredyty API dla subskrybentów Max i Team, działające z dowolnym modelem, w tym w zewnętrznych narzędziach.

**Key takeaways:**
- Haiku 5.5 dorównuje cenowo GPT-6 Luna, ale zużywa przy maksymalnym wysiłku około trzy razy więcej tokenów wyjściowych na to samo zadanie.
- Realna oszczędność zależy od długości promptu: poniżej 100 tysięcy tokenów stawki są pięciokrotnie niższe niż powyżej tego progu.
- Model zyskał milion tokenów kontekstu i ustawienia wysiłku, ale pozostaje w tyle za konkurencją pod względem dokładności faktograficznej.
- Pozycjonowanie jako tani subagent pod Opus lub Sonnet pasuje do wzorca używanego już przez Cursor, Copilot i Devin.
- Obniżka cen odczytów z cache dla Sonnet 5.5 to osobny, ale skoordynowany ruch w tej samej premierze.

**Why do I care:** Jeśli budujesz agentowe workflow z wieloma modelami, ten release to konkretna wskazówka architektoniczna: tani model jako subagent do podsumowań i pracy wysokoobjętościowej, drogi model jako lider do trudnych decyzji. Zanim jednak zmigrujesz pipeline na Haiku 5.5 licząc na oszczędności z nagłówka, policz realne zużycie tokenów na swoim typie zadań, bo przy długich promptach agentowych pięciokrotny próg cenowy i wyższe zużycie przy maksymalnym wysiłku mogą zjeść całą obiecaną oszczędność.

**Link:** [[AINews] Claude Haiku 5.5 — better than GPT-6 Luna at the same pricing](https://www.latent.space/p/ainews-claude-haiku-55-better-than)
