---
title: "Od uzależnienia od harnessu do przenośnej warstwy kontekstu"
excerpt: "Modele AI się komodytyzują, ale prawdziwa wartość leży w Twoim kontekście — notatkach, preferencjach i domenowej wiedzy — które można przenosić między harnesami bez utraty historii."
publishedAt: "2026-06-30"
slug: "od-uzaleznienia-od-harnessu-do-przenos-nej-warstwy-kontekstu"
hashtags: "#ai #llm #ml #agents #knowledgegraph #mcp #rag #memory #generated #pl"
source_pattern: "Decoding AI"
---

## Od uzależnienia od harnessu do przenośnej warstwy kontekstu

**TLDR:** Modele AI i harnessy komodytyzują się szybko, ale Twój kontekst — notatki, preferencje, historia rozmów — jest tym, co naprawdę warto chronić. Rozwiązaniem jest oddzielenie warstwy kontekstu od harnessu, tak żeby można ją było podpiąć pod dowolny model lub narzędzie w ciągu kilku minut.

**Summary:**

Paul Iusztin zaczyna od obserwacji, która mnie uderzyła bo sam na to wpadłem: im głębiej budujesz się w jeden harness, tym bardziej boli myśl o wyjściu. Uzależnienie przybiera trzy konkretne formy. Pierwsza to reset do zera — sześć miesięcy pracy z Claude Code i nagle przechodzisz na inny model, tracąc całą historię rozmów i wszystko, czego agent się o Tobie nauczył. Druga forma to uwięzione umiejętności biznesowe — jeśli Twoje workflows i logika są powiązane ze specyficznymi funkcjami jednego harnessu, zmiana narzędzia nie tylko usuwa historię czatu, ale po cichu psuje lub degraduje Twoją niestandardową logikę. Trzecia to biling na cudzych warunkach — plan, od którego zależysz, może zostać zmieniony cenowo, ograniczony do starszych modeli, albo po prostu wycofany.

Odpowiedzią na ten problem jest architektura warstwy kontekstu złożona z trzech komponentów. Pierwszym jest zunifikowana pamięć łącząca system plików, wyszukiwanie słów kluczowych metodą BM25, semantyczne wyszukiwanie wektorowe oraz graf wiedzy oparty na ontologii POLE+O — czyli węzłach reprezentujących osoby, organizacje, lokalizacje, zdarzenia i obiekty. Drugi komponent to warstwa serwująca, realizowana albo jako serwer MCP eksponujący narzędzia, zasoby i umiejętności, albo jako zestaw plików skills bezpośrednio na systemie plików. Trzeci element to harness, który Paul świadomie traktuje jako wymienialny.

Praktyczna realizacja tej architektury polega na tym, że agent wchodzi w interakcję przez wywołania narzędzi MCP, które trafiają do zunifikowanej pamięci i wracają do kontekstu agenta. Interesująca część dzieje się przy zapisie — to jest moment ciągłego uczenia się. Paul opisuje sześć narzędzi MCP w swoim projekcie Tree: trzy do wyszukiwania i trzy do zapisu. Wyszukiwanie NL mapuje naturalne pytanie na hybrydowe zapytanie MongoDB łączące wektorowe i grafowe przeszukiwanie, deterministyczny fallback obsługuje strukturalne filtry gdy NL zawodzi, a deep search radzi sobie z dużymi zbiorami wyników przez progresywne ujawnianie — tworząc na bieżąco zlokalizowane wiki w formacie YAML zamiast ładować wszystko do okna kontekstu.

Kwestia bazy danych jest tu konkretna i nieromantyczna. Paul przekonuje, że jedna baza danych obsługująca tekst, wektory i grafy — jak MongoDB — bije architekturę trzech osobnych systemów. Korzyść jest prosta: mniej operacyjnego narzutu, jedno środowisko produkcyjne, i co najważniejsze możliwość łączenia dokumentów, wektorów i grafu w jednym zapytaniu. To przekłada się na szybkość i niższe koszty. Specjalizowany graf jak Neo4j ma sens gdy potrzebujesz przejść trzy lub więcej hopów w grafie, albo gdy cała logika biznesowa obraca się wokół grafów — wtedy możesz zsynchronizować MongoDB produkcji do Neo4j jako narzędzie do eksploracji. Dla większości przypadków osobistych asystentów operujących na tysiącach dokumentów MongoDB spokojnie wystarcza.

**Key takeaways:**
- Warstwa kontekstu powinna być niezależna od harnessu — zaprojektuj ją tak, żeby zmiana narzędzia była zmianą jednej linii konfiguracji, nie migracją
- Zunifikowana pamięć oparta na ontologii POLE+O i jednej bazie danych łączącej tekst, wektory i graf eliminuje problemy z synchronizacją między systemami i daje lineage za darmo
- Ciągłe uczenie się (continual learning) realizuje się przez hook automatycznie ingestionujący treść rozmowy co kilkanaście tur — bez konieczności ręcznego zapisywania wiedzy

**Why do I care:** Z perspektywy architekta frontendowego to jest dokładnie problem vendor lock-in, który znamy od lat w kontekście frameworków i bibliotek. Idea, żeby logika biznesowa i kontekst domenowy były w warstwie przenośnej, a harness był wymienialny jak runtime — to brzmi znajomo i sensownie. Praktyczne znaczenie tego dla mnie jest takie: jeśli dziś budujesz jakiekolwiek poważne narzędzie AI dla siebie lub firmy, warto już teraz zdecydować gdzie trzymasz "mózg" systemu i upewnić się, że nie jest on ukryty w formatach specyficznych dla jednego providera. MCP jako warstwa integracyjna wygląda na realny standard w tym obszarze.

**Link:** [From Harness Lock-In to Portable Context Layer](https://www.decodingai.com/p/the-context-layer)
