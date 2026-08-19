---
title: "Przewodnik po eksporcie danych z Kilo, czyli jak samodzielnie zaudytować, co zostawiłeś w promptach"
excerpt: "Kilo pokazuje krok po kroku, jak rozpakować i przeszukać własny eksport danych JSONL, jak uruchomić na nim skanery sekretów typu Gitleaks czy Trufflehog, i jak zlecić tę robotę subagentowi zamiast wpychać cały plik w kontekst."
publishedAt: "2026-08-19"
slug: "przewodnik-po-eksporcie-danych-kilo-audyt-promptow"
hashtags: "#kilo #security #ai #agents #generated #pl"
source_pattern: "Kilo"
---

## Przewodnik po eksporcie danych z Kilo, czyli jak samodzielnie zaudytować, co zostawiłeś w promptach

**TLDR:** Kilo udostępnia narzędzie do pobrania podzbioru danych konta jako jeden skompresowany plik JSONL. Przewodnik pokazuje, jak go rozpakować, jak zrozumieć jego strukturę i jak przeskanować go pod kątem przypadkowo wklejonych sekretów, kluczy API czy danych osobowych za pomocą kilku open source'owych narzędzi.

**Summary:** Eksport żąda się z dashboardu Kilo, w menu ustawień konta, opcją "Request data exports". Po kilku minutach przychodzi mail z linkiem do pliku `kilo-data-export.jsonl.gz`. Format JSON Lines oznacza, że każda linia to osobny, kompletny obiekt JSON, co pozwala przetwarzać plik linia po linii zwykłymi narzędziami uniksowymi zamiast ładować całość do pamięci naraz. Pierwsza linia to nagłówek z listą źródeł danych i znacznikiem czasu, dla którego eksport został wygenerowany, każda kolejna linia niesie pole `source`, `field` i `value`, czasem `id` grupujący kilka par pole-wartość w jeden rekord, na przykład tytuł sesji CLI razem z jej identyfikatorem i gałęzią gita.

Trzy główne źródła danych w eksporcie to `kilocode_users`, czyli konto: data rejestracji, domyślny model, sumy kredytów, ale też e-mail Google, powiązane konta GitHub czy LinkedIn i adres IP rejestracji; `microdollar_usage_metadata`, jedna linia na rozliczone żądanie, budowana wprost z tekstu promptów, więc obejmuje też zadania zaplanowane i zautomatyzowane, nie tylko to, co wpisałeś ręcznie w sesji; oraz `system_prompt_prefix`, prefiksy promptów systemowych, mniejsze i głównie przydatne do potwierdzenia, do czego dokładnie było instruowane konkretne wywołanie modelu.

Najciekawsza część przewodnika dotyczy tego, dlaczego warto to w ogóle skanować. `microdollar_usage_metadata` jest zbudowane wprost z tekstu promptów, a że jest go najwięcej, to najbardziej prawdopodobne miejsce, gdzie mógł się przypadkiem znaleźć klucz API wklejony do debugowania, string połączenia z bazą danych, albo adres e-mail osadzony w jakimś kontekście automatyzacji. To nie jest oznaka, że coś poszło źle, po prostu naturalny efekt tego, że stuznakowe okno w treść promptów jest zapisywane tysiące razy. Przewodnik poleca cztery narzędzia open source do takiego skanu: Gitleaks jako najszybszy do uruchomienia, Trufflehog, który dodatkowo próbuje zweryfikować, czy znaleziony klucz jest wciąż aktywny przez żywe zapytanie do usługi, CredSweeper z Samsunga, który dokłada model ML nad regexami, żeby ograniczyć fałszywe alarmy przy powtarzalnych fragmentach promptów, i Presidio z Microsoftu, skupiony na danych osobowych zamiast na kluczach.

Najbardziej praktyczna rada dotyczy tego, jak w ogóle podejść do analizy dużego eksportu agentem AI. Kazanie agentowi wczytać cały plik wprost w kontekst przy eksporcie sensownej wielkości wysadzi zarówno okno kontekstu, jak i niemały budżet kredytów. Lepsze podejście to własny skill, który dzieli plik na kawałki po tysiąc linii, oddaje każdy kawałek osobnemu subagentowi, a ten zwraca tylko krótkie podsumowanie, nigdy surową treść fragmentu, więc sesja nadrzędna agreguje wyniki bez wczytywania oryginalnych danych.

**Key takeaways:**
- Eksport to jeden skompresowany plik JSONL, rozpakowywalny przez `gunzip` albo strumieniowany bezpośrednio przez `zcat`
- `microdollar_usage_metadata` powstaje wprost z tekstu promptów i jest najbardziej prawdopodobnym miejscem wycieku sekretów
- Gitleaks, Trufflehog, CredSweeper i Presidio pokrywają różne kąty skanowania: klucze, ich weryfikację, redukcję false positives i dane osobowe
- Analiza dużego eksportu agentem wymaga dzielenia na kawałki i subagentów, inaczej wysadza kontekst i budżet

**Why do I care:** Ten przewodnik jest dobrym przypomnieniem, że logi rozmów z agentem kodującym to w praktyce log bezpieczeństwa, nie tylko historia sesji, i warto go traktować z taką samą powagą jak logi produkcyjne. Wzorzec "podziel na kawałki, oddaj subagentom, agreguj tylko podsumowania" jest zresztą uniwersalny, nie tylko do audytu eksportu Kilo, tylko do każdej sytuacji, gdzie agent miałby przetwarzać dane większe niż rozsądne okno kontekstu. Jeśli odpowiadasz za wprowadzenie narzędzi AI do zespołu, uruchomienie takiego skanu zanim ktokolwiek o to zapyta jest znacznie lepszą pozycją niż zbieranie dowodów po fakcie, gdy padnie pytanie od działu bezpieczeństwa.

**Link:** [A Field Guide to Understanding Your Kilo Data Export](https://blog.kilo.ai/p/data-export)
