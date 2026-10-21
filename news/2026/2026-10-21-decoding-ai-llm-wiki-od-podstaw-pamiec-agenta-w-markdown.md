---
title: "Decoding AI: wiki dla LLM zbudowane od podstaw jako pamięć agenta w plikach Markdown"
excerpt: "Jak z surowych notatek i źródeł zrobić graf wiedzy w Markdown, który agent przeszukuje przez indeksy zamiast czytać cały korpus."
publishedAt: "2026-10-21"
slug: "decoding-ai-llm-wiki-od-podstaw-pamiec-agenta-w-markdown"
hashtags: "#decodingai #ai #agents #llm #rag #knowledge-graph #generated #pl"
source_pattern: "Decoding AI"
---

## LLM wiki od podstaw

**TLDR:** LLM wiki to katalog plików Markdown, które pisze model, a czyta agent. Powstaje z tego graf wiedzy bez bazy danych, odpytywany przez indeksy w trzech krokach.

**Summary:** Autor wyszedł od problemu: porównanie siedmiu dużych repozytoriów przez wskazanie ich agentowi dawało powierzchowne odpowiedzi. Zwykłe obejście, czyli notatki dla każdego repo, jest uciążliwe, a LLM wiki łączy badania, dokumenty firmowe, artykuły i filmy w jedną warstwę pamięci. Metodę spopularyzował Andrej Karpathy, ale autor stosuje ją odwrotnie: jedno wiki na projekt, usuwane po jego końcu.

Architektura ma cztery kroki. Źródła trafiają do katalogu raw, który jest niezmienny. Model tworzy z nich stronę źródłową i wyciąga byty, czyli narzędzia i frameworki, oraz pojęcia. Osobna strona powstaje tylko wtedy, gdy co najmniej dwa różne źródła wymieniają dany byt lub pojęcie. To próg, który odsiewa szum: jedna wzmianka to fakt o notatce, dwie to fakt o twojej wiedzy. Indeksy tworzy skrypt w Pythonie, nie model, bo liczenie i deterministyczne przekształcenia nie powinny zużywać tokenów. Aktualizacja przelicza tylko strony powiązane ze zmienionym źródłem.

Zapytanie to drabina: indeks główny, jeden lub dwa podindeksy, potem jedna do trzech stron, a dopiero na końcu źródła i surowe pliki. To RAG zbudowany z plików. Koszt to opóźnienie i skalowanie, które autor uznaje za problematyczne powyżej tysiąca źródeł. Jakość sprawdza na razie "na wyczucie": precyzja wygląda dobrze na znanych tematach, a recall nie jest zmierzony. Ingestię robił modelem Sonnet 5.5, a zapytania Opus 5.5. Newsletter zawiera też sponsorowaną wstawkę, którą pominąłem.

**Key takeaways:**
- Strona bytu powstaje dopiero przy dwóch niezależnych źródłach.
- Indeksy i liczenie robi skrypt, nie model.
- Brak ewaluacji recallu jest największą luką.

**Why do I care:** To praktyczny wzorzec na pamięć projektu bez infrastruktury, który zadziała w każdym repozytorium. Autor nie mierzy jakości, więc zanim oprzesz na tym decyzje, zrób własny mały test pytań ze znanymi odpowiedziami.

**Link:** [How to build an LLM wiki from first principles](https://www.decodingai.com/p/build-llm-wiki-first-principles)
