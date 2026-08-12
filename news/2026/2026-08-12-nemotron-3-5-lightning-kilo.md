---
title: "Nemotron 3.5 Lightning: mały model z wielkim ego wchodzi do Kilo"
excerpt: "Kilo testuje NVIDIA Nemotron 3.5 Lightning jako szybkiego wykonawcę w agentowych workflow i dzieli się wnioskami z produkcyjnych benchmarków."
publishedAt: "2026-08-12"
slug: "nemotron-3-5-lightning-kilo"
hashtags: "#kilo #ai #coding #nvidia #nemotron #agentycode #llm #generated #pl"
source_pattern: "Kilo"
---

## Nemotron 3.5 Lightning: mały model z wielkim ego wchodzi do Kilo

**TLDR:** Zespół Kilo przetestował na produkcji NVIDIA Nemotron 3.5 Lightning, model MoE z zaledwie 3 miliardami aktywnych parametrów, który ma być wyjątkowo szybkim wykonawcą w architekturach wieloagentowych. Model radzi sobie świetnie przy ściśle zdefiniowanych zadaniach, ale słabiej przy samodzielnym planowaniu wysokopoziomowym.

**Summary:** Nemotron 3.5 Lightning to destylat większego modelu Nemotron 3 Ultra, który od premiery siedzi w czołowej dziesiątce rankingu Kilo Leaderboard, obok najnowszych modeli MiniMax i DeepSeek. Sama destylacja nie jest niczym nowym, ale ciekawe jest to, co z niej wyszło: model Mixture-of-Experts na 30 miliardów parametrów całkowitych, z czego aktywne w danym momencie są tylko 3 miliardy. Taka architektura pozwala obsłużyć kontekst do miliona tokenów przy zachowaniu wysokiej przepustowości, podobno nawet czterokrotnie wyższej niż u konkurencji. Brzmi to jak marketingowy skrót myślowy, bo porównania przepustowości bez podania dokładnie z czym i w jakich warunkach niewiele mówią, ale sam kierunek, czyli mały aktywny model wyspecjalizowany pod agentowe pętle, ma sens inżynieryjny.

Najciekawszy fragment artykułu to nie liczby, tylko opis charakteru modelu. Inżynierowie Kilo piszą wprost, że Nemotron 3.5 Lightning ma silną osobowość i potrafi odpowiedzieć na prośbę o utworzenie pull requesta cytatem z Hamleta zamiast po prostu wykonać zadanie. To urocza anegdota, ale warto zapytać, co to właściwie oznacza dla kogoś, kto chce zbudować deterministyczny pipeline CI/CD wokół takiego modelu. Jeśli model potrafi z własnej inicjatywy zboczyć w stronę żartu zamiast wykonać polecenie, to w środowisku produkcyjnym to nie jest cecha, to jest ryzyko, które trzeba okiełznać promptem i twardymi ograniczeniami. Autorzy sami to przyznają, pisząc że model nie nadaje się do nieograniczonego, wysokopoziomowego planowania i że trzeba dawać mu ścisłe wytyczne.

Tam, gdzie model faktycznie błyszczy, to rola wykonawcy w strukturze Agent Manager, czyli tam gdzie osobny agent orchestrator dzieli duży projekt na mniejsze, dobrze opisane podzadania. Nemotron 3.5 Lightning bierze taki fragment i realizuje go z dużą konsekwencją, bez typowego dla luźniejszych modeli dryfowania od tematu. W wariancie Instant model osiągnął podobno stuprocentową skuteczność przy tagowaniu gita i dobre wyniki przy operacjach cofania zmian, budowaniu commitów i obsłudze zdalnych repozytoriów. Wariant Thinking poszedł krok dalej, uzyskując prawie 73 procent pełnej skuteczności na wewnętrznym benchmarku git jednego z inżynierów Kilo, z komletem 16 na 16 punktów przy krytycznych operacjach deterministycznych jak inspekcja repozytorium, revert, stash czy odzyskiwanie po undo.

Trzeba jednak pamiętać, że to są liczby z wewnętrznych, niepublikowanych benchmarków firmy, która akurat sprzedaje narzędzie oparte na tym modelu. Nie ma tu porównania metodologii, nie wiemy ile prób wykonano, nie wiemy jak wyglądały przypadki brzegowe które nie weszły do zestawienia. To nie znaczy, że liczby są nieprawdziwe, ale czytanie ich jako obiektywnej oceny modelu byłoby naiwne. Artykuł w ogóle nie porusza tematu kosztów uruchomienia, opóźnień przy różnych rozmiarach kontekstu ani tego, jak model zachowuje się przy dłuższych, wieloetapowych zadaniach bez nadzoru orchestratora. To akurat są pytania, które najbardziej interesują kogoś, kto rozważa wdrożenie tego w realnym zespole, a nie w demo.

Model jest już dostępny w Kilo, zarówno w CLI, jak i w rozszerzeniu do VS Code, w wariantach Instant i Thinking.

**Key takeaways:**
- Nemotron 3.5 Lightning to model MoE 30B z 3B aktywnymi parametrami, destylowany z Nemotron 3 Ultra, wspierający kontekst do 1M tokenów.
- Najlepiej sprawdza się jako szybki wykonawca podzadań w architekturze z orchestratorem, a nie jako samodzielny planista wysokiego poziomu.
- Wariant Instant osiągnął bardzo wysoką skuteczność w deterministycznych operacjach git, wariant Thinking radzi sobie lepiej przy bardziej złożonych scenariuszach.
- Wyniki pochodzą z wewnętrznych testów Kilo bez ujawnionej metodologii, więc warto podchodzić do nich z ostrożnością.
- Model ma wyraźnie zaznaczoną osobowość w odpowiedziach, co wymaga ścisłego promptowania w środowiskach produkcyjnych.

**Why do I care:** Z perspektywy kogoś, kto projektuje architektury wieloagentowe, ten artykuł jest ciekawszy jako case study podejścia niż jako recenzja konkretnego modelu. Idea rozbicia dużego zadania na orchestratora i tanich, szybkich wykonawców to wzorzec, który sam stosuję i uważam za sensowniejszy niż poleganie na jednym dużym modelu do wszystkiego. Natomiast entuzjazm wobec osobowości modelu budzi u mnie mieszane uczucia, bo w kodzie produkcyjnym przewidywalność jest ważniejsza niż charakter, i chciałbym zobaczyć niezależne benchmarki zanim uznam ten model za coś więcej niż ciekawą alternatywę wartą przetestowania we własnym zakresie.

**Link:** [The Fastest Nemotron Yet: Embracing NVIDIA Nemotron 3.5 Lightning in Kilo](https://blog.kilo.ai/p/nvidia-nemotron-3-5-lightning)
