---
title: "Jak wybrać model LLM do kodowania z AI? Przewodnik po dokładności, szybkości i kosztach"
excerpt: "Luca Rossi z newslettera Refactoring tłumaczy, jak myśleć o wyborze modelu językowego do programowania, dlaczego publiczne benchmarki nie wystarczą i kiedy warto stosować model routing."
publishedAt: "2026-07-15"
slug: "jak-wybrac-model-llm-do-kodowania-z-ai"
hashtags: "#refactoring #ai #llm #agents #engineering #architecture #generated #pl"
source_pattern: "🌀 Refactoring"
---

## Jak wybrać model LLM do kodowania z AI?

**TLDR:** Wybór modelu AI do programowania to nie tylko kwestia "który jest najlepszy". Luca Rossi z Refactoring rozkłada ten problem na czynniki pierwsze: dokładność kontra szybkość kontra koszt, dlaczego publiczne rankingi kłamią, i jak w praktyce podejść do ewaluacji modeli we własnym zespole.

**Summary:**

Pytanie "jakiego modelu AI używasz do kodowania?" jest proste. Pytanie "dlaczego akurat tego?" jest o wiele bardziej złożone i właśnie temu poświęcony jest ten odcinek Refactoring. Luca Rossi zaczyna od taksonomii dostępnych opcji: najlepsze modele frontier (Fable 5, GPT 5.6), duże modele open-weights hostowane w chmurze (GLM 5.2 na OpenRouter) oraz mniejsze modele self-hosted. Każda z tych kategorii ma inne profile kosztów, szybkości i dokładności.

Trzy wymiary oceny modeli to dokładność, szybkość i koszt. Brzmi prosto, ale wszystkie trzy są ze sobą splecione w nieoczywisty sposób. Wyższy model dokładności może oznaczać mniej iteracji, a więc mniej tokenów i niższy koszt całkowity. Możliwość ograniczenia reasoning'u przyspiesza model, ale obniża dokładność. Rossi przywołuje obserwację Jamie Turnera z Convex: lepiej dostać 80% poprawnego kodu w 2 sekundy niż 95% poprawnego kodu w 2 minuty. To argument za szybką pętlą zwrotną, nawet kosztem kilku dodatkowych błędów. Szybszy model, który wymaga dwóch iteracji, może być tańszy i szybszy od wolniejszego, który trafia za pierwszym razem.

Kluczowa obserwacja dotyczy krzywej cena-jakość: model z dokładnością 80% w stosunku do najlepszego frontier może kosztować 10 razy mniej. GLM 5.2 i Grok 4.5 to konkretne przykłady modeli, które zbliżają się do wyników OpenAI i Anthropic przy ułamku ceny. To zmienia kalkulację dla wielu zadań.

Publiczne benchmarki są zdaniem autora niewystarczające jako podstawa decyzji. Rossi wyrósł ze sceptycyzmu wobec leaderboardów z dwóch powodów, których rozwinięcie jest niestety za paywallem. Dostępna część artykułu zapowiada też sekcje o własnych ewaluacjach (od "po prostu nie rób" do budowania własnego eval), o model routingu (nie wszystkie zadania są równie trudne, więc nie płać frontier prices za wszystko) oraz o self-hostingu (prawie nigdy nie ma sensu, tanie modele w chmurze biją własny hardware).

Całość artykułu jest za paywallem subskrypcji Refactoring, ale sama bezpłatna część dostarcza już solidnych ram do myślenia o problemie.

**Key takeaways:**

- Dokładność, szybkość i koszt to trzy wymiary oceny modeli, ale nie są ortogonalne - wpływają na siebie nawzajem
- Model 80% tak dobry jak frontier, ale 10x tańszy, może być lepszym wyborem dla większości zadań
- Szybka pętla zwrotna (feedback loop) bywa ważniejsza od maksymalnej dokładności - to argument za tańszymi, szybszymi modelami
- Publiczne benchmarki nie oddają realiów konkretnego codebases - każdy zespół powinien budować własne metryki
- Model routing (używanie różnych modeli do różnych zadań) to naturalna ewolucja dojrzałych zespołów korzystających z AI
- Self-hosting prawie nigdy się nie opłaca w porównaniu z tanimi modelami w chmurze

**Why do I care:** To jest temat, który dotyczy każdego, kto integruje AI w swoim workflow. Widzę, że większość zespołów albo używa jednego modelu do wszystkiego (bo tak jest prosto), albo za bardzo ufa publicznym rankingom. Artykuł Rossi'ego proponuje ramę myślową, która jest trwalsza niż "który model jest teraz najmodniejszy" - i to jest wartościowe. Sama myśl o model routingu, gdzie płacisz frontier prices tylko za naprawdę trudne zadania, a tańsze modele obsługują resztę, jest oczywista w teorii, ale rzadko wdrażana w praktyce. Szkoda, że kluczowa część z ewaluacją i routingiem jest za paywallem.

**Link:** [What LLM should you use for AI coding?](https://refactoring.fm/p/what-llm-should-you-use-for-ai-coding)
