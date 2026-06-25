---
title: "Kilo Auto Efficient: automatyczny routing modeli AI dopasowany do zadania"
excerpt: "Kilo wprowadza Auto Efficient - mechanizm dynamicznego wyboru modelu AI w czasie rzeczywistym, który dobiera najtańszy model zdolny do wykonania konkretnego zadania."
publishedAt: "2026-06-23"
slug: "kilo-auto-efficient-automatyczny-routing-modeli-ai"
hashtags: "#kilo #ai #llm #developer-tools #cost-optimization #generated #pl"
source_pattern: "Kilo"
---

## Auto Efficient: Kilo automatycznie dobiera model AI do każdego zapytania

**TLDR:** Kilo uruchomiło nowy poziom w swojej ofercie Auto Model o nazwie Auto Efficient. Zamiast zmuszać programistę do ręcznego przełączania modeli lub blokować go w jednym wyborze, mechanizm klasyfikuje każde zapytanie w czasie rzeczywistym i kieruje je do najtańszego modelu, który potrafi je obsłużyć. Prosta zmiana nazwy zmiennej trafia do lekkiego modelu, planowanie złożonej migracji bazy danych - do mocniejszego.

Idea jest stara jak sam cloud computing: płać za to, czego faktycznie używasz, nie za rezerwację stałej mocy na wypadek szczytowego obciążenia. W świecie modeli językowych to jednak nadal rzadkość. Większość narzędzi do kodowania albo wysyła każde zapytanie do tego samego modelu (zwykle najdroższego w ofercie), albo przenosi na użytkownika odpowiedzialność za ręczne przełączanie. Kilo postanowiło to zmienić i szczerze mówiąc - kierunek jest sensowny.

Auto Efficient działa na zasadzie krótkiej pętli decyzyjnej. Lekki klasyfikator analizuje kontekst sesji, ocenia rodzaj i stopień trudności zadania, a następnie dopasowuje je do najtańszego modelu z puli, który zaliczył odpowiednią klasę zadań na benchmarkach. Cały ten proces zachodzi między naciśnięciami klawiszy - bez żadnego widocznego opóźnienia ani konieczności działania ze strony programisty. Jeśli proszę o szybką refaktoryzację jednej funkcji, dostaje coś szybkiego i taniego. Kiedy zaczynam planować przebudowę architektury, router sięga po mocniejszy model.

Co mnie tutaj interesuje to to, że routing nie opiera się na marketingowych opisach modeli ani na ich popularności, lecz na KiloBench - własnym benchmarku Kilo budowanym z rzeczywistych zadań programistycznych. Wyniki są publiczne w formie Kilo Leaderboard, co oznacza, że mogę sam sprawdzić, któremu modelowi powierzyć dany typ pracy. Auto Efficient w zasadzie robi ten research za mnie przy każdym zapytaniu. To uczciwe podejście: jeśli mi nie ufasz routerowi, masz dane, żeby samemu podjąć decyzję.

Rozsądnie rozwiązano też problem, który intuicyjnie przychodzi do głowy przy takim systemie: co jeśli router przeskakuje między modelami w środku rozmowy i gubi wątek? Auto Efficient jest świadome sesji - gdy już osadzi się na modelu pasującym do aktualnego kontekstu, pozostaje przy nim przez powiązane tury i zmienia się tylko wtedy, gdy tańsza opcja wyraźnie wychodzi na to samo. Do tego, gdy klasyfikator nie potrafi pewnie zakwalifikować zapytania, system cofa się do poziomu Balanced, czyli sprawdzonego płatnego modelu. Oznacza to konkretny dolny próg jakości: Auto Efficient nie będzie gorsze od Balanced bez względu na to, co zobaczy klasyfikator.

Nowy poziom uzupełnia istniejącą ofertę: Frontier dla maksymalnej mocy, Balanced dla sprawdzonego routingu bez cen frontierowych, Free dla modeli bezpłatnych. Każdy z nich można w każdej chwili zmienić lub zupełnie wyłączyć routing i wskazać konkretny model, własnego providera albo lokalny model przez Ollama lub LM Studio. Żeby skorzystać z pełnego automatycznego routingu opartego na trybie pracy, trzeba mieć rozszerzenie VS Code lub JetBrains w wersji 5.2.3 lub nowszej albo CLI w wersji 1.0.15 lub nowszej. Na starszych wersjach poziom spada do jednego modelu dla każdego zapytania.

**Key takeaways:**
- Auto Efficient klasyfikuje każde zapytanie w czasie rzeczywistym i kieruje je do najtańszego modelu zdolnego do jego obsługi, bez ręcznego przełączania
- Routing opiera się na KiloBench - publicznym benchmarku Kilo zbudowanym z rzeczywistych zadań programistycznych, nie na marketingowych opisach modeli
- System jest świadomy sesji: nie przeskakuje między modelami chaotycznie, lecz zmienia model tylko wtedy, gdy tańsza opcja wyraźnie nadaje się do pracy
- Gdy klasyfikator nie potrafi pewnie ocenić zapytania, system cofa się do poziomu Balanced jako dolnego progu jakości
- Wymagane wersje: rozszerzenie VS Code/JetBrains 5.2.3+ lub CLI 1.0.15+; starsze wersje działają, ale bez dynamicznego routingu

**Why do I care:** W praktyce największy koszt narzędzi AI dla programistów to nie to, że płacisz za moc, której nie potrzebujesz przy najtrudniejszych zadaniach - to że płacisz za nią przy trywialnych. Auto Efficient adresuje dokładnie ten problem. Nie jestem entuzjastą marketingowej otoczki ("automatycznie", "inteligentnie"), ale idea powiązania routingu z publicznym benchmarkiem zamiast z wewnętrznymi heurystykami to krok w dobrą stronę. Mam dane, mogę to zweryfikować, mogę sam zdecydować inaczej. Tyle wystarczy, żeby traktować to poważnie.

**Link:** [Auto Efficient: The Right Model for Every Request, Automatically](https://blog.kilo.ai/p/auto-efficient?publication_id=4363009&post_id=203267921&isFreemail=true&triedRedirect=true)
