---
title: "Decoding AI: Context Inspector, czyli ocena jakości kontekstu RAG przed wywołaniem LLM"
excerpt: "Inżynierowie American Express opisują prototyp, który mierzy pokrycie, świeżość, sprzeczności i dopuszczalność kontekstu zanim trafi on do modelu."
publishedAt: "2026-10-18"
slug: "decoding-ai-context-inspector-jakosc-kontekstu-rag"
hashtags: "#decodingai #ai #llm #architecture #testing #generated #pl"
source_pattern: "Decoding AI"
---

## Context Inspector: pomiar jakości kontekstu przed wywołaniem LLM

**TLDR:** Thangavel Subramaniam i Saurabh Gupta z American Express opisują prototyp, który ocenia kontekst RAG zaraz po jego złożeniu, a przed wysłaniem do modelu. Zamiast jednej oceny dostajesz wektor metryk, który tłumaczy, dlaczego kontekst jest ryzykowny.

**Summary:** Punkt wyjścia jest prosty. Większość ewaluacji GenAI patrzy na odpowiedź, czyli czy jest trafna, ugruntowana i bezpieczna. Autorzy zauważają, że wiele porażek RAG nie bierze się z modelu, tylko ze złożenia kontekstu. Dane mogą być nieaktualne, jednostronne, pozbawione wymaganego źródła albo po cichu sprzeczne, a model i tak odpowie płynnie i pewnie. Gdy oceniasz taką odpowiedź, debugujesz złą warstwę.

Context Inspector działa na warstwie RAG, w jednym przykładzie około 18 tysięcy tokenów z okna 128 tysięcy. Okno kontekstu składa się z promptu systemowego, definicji narzędzi, wiedzy z retrievala, historii rozmowy, pamięci, notatek agenta i bieżącego pytania. Większe okno nie daje lepszej odpowiedzi, jeśli evidence jest słabe. Z perspektywy prywatności narzędzie ma działać na zatwierdzonych metadanych, takich jak źródło, wersja, znacznik czasu, liczba tokenów i etykiety polityk, a nie na szerszym dostępie do danych.

Jakość kontekstu opisuje wektor z sześcioma wymiarami. Pokrycie mówi, ile wymaganych aspektów odpowiedzi zawiera kontekst, także w wersji ważonej. Wykorzystanie tokenów sprawdza, czy mieścisz się w zdrowym zakresie, na przykład od 10 do 90 procent budżetu, bo 97 procent oznacza ryzyko wypchnięcia ważnych dowodów. Głód źródeł liczy, ile wymaganych źródeł nie dostarczyło minimalnej liczby fragmentów. W przykładzie z trzema źródłami brak statusu systemu daje wynik 0,33.

Świeżość liczona jest wykładniczym zanikiem wieku fragmentu, z osobnym ryzykiem dla treści z oknem ważności. Gęstość sprzeczności to stosunek par konfliktujących do wszystkich par, w przykładzie cztery fragmenty dają sześć par i jedną sprzeczną, czyli 17 procent. Dopuszczalność polityczna sprawdza, czy każdy fragment wolno użyć dla danego zapytania i roli. W trybie ścisłym cztery dozwolone z pięciu fragmentów to porażka.

Z tych sygnałów składa się bramkę przed inferencją z progami. Dwa kandydackie konteksty mogą też dostać wspólny wynik ważony, i autorzy pokazują, że kontekst z niższym pokryciem może wygrać dzięki lepszemu wykorzystaniu i braku głodu źródeł. Całość można uruchamiać w CI przy zmianie retrievala, chunkowania albo rankingu, na zestawie reprezentatywnych zapytań.

**Key takeaways:**
- Ewaluacja po inferencji nie powie, czy winny jest model, retriever czy nieaktualny dokument.
- Wektor metryk, czyli pokrycie, tokeny, głód źródeł, sprzeczności, świeżość i polityka, tłumaczy ryzyko lepiej niż jeden wynik.
- Sprawdzenie można uruchamiać w CI przy zmianach w retrievalu i chunkowaniu.
- Autorzy nie dowodzą optymalności wyboru kontekstu, tylko dają interpretowalne sygnały.

**Why do I care:** To jedyny tekst z tej dostawy, który mogę wprost przełożyć na pracę zespołu. Bramka przed wywołaniem LLM jest tańsza niż drugi przebieg modelu jako sędziego i łatwiej ją debugować. Autorzy sami nazywają to prototypem badawczym, bez wyników na prawdziwym ruchu i bez liczb o tym, ile błędów łapie. Wszystkie przykłady są syntetyczne. Pominęli też najtrudniejszą część, czyli skąd bierze się automatyczne wykrywanie sprzeczności między fragmentami, bo flagę x_ij ktoś musi policzyć. Bez tego metryka sprzeczności to teoria.

**Link:** [Context Inspector: Measuring Context Quality Before the LLM Call](https://www.decodingai.com/p/pre-inference-rag-evaluation-metrics)
