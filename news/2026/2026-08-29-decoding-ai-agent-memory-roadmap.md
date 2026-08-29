---
title: "Mapa drogowa pamięci agentów: od czterech warstw po czyszczenie grafu wiedzy"
excerpt: "Pięcioczęściowa mapa drogowa Decoding AI prowadzi przez architekturę pamięci agentów, od warstw pamięci, przez działający system na jednej bazie, po utrzymanie grafu wiedzy w czystości."
publishedAt: "2026-08-29"
slug: "decoding-ai-agent-memory-roadmap"
hashtags: "#decodingai #ai #agents #knowledge-graph #architecture #generated #pl"
source_pattern: "Decoding AI"
---

## Jak działa pamięć agentów AI: cztery warstwy

**TLDR:** Roadmap zaczyna od podziału pamięci agenta na cztery warstwy: wiedzę wewnętrzną modelu, okno kontekstu, pamięć krótkoterminową i pamięć długoterminową, przy czym ta ostatnia dzieli się dalej na semantyczną, epizodyczną i proceduralną.

**Summary:** Sama idea nie jest nowa, ale uporządkowanie jej w cztery warstwy z jasnym podziałem długoterminowej pamięci na trzy podtypy daje słownik, którego brakuje większości zespołów budujących agentów. Każda z tych form może żyć jako surowy string, encja albo węzeł w grafie, i cały sens tej struktury sprowadza się do jednego: pozwolić agentowi uczyć się bez retrenowania modelu bazowego.

**Key takeaways:**
- Cztery warstwy: wiedza wewnętrzna, okno kontekstu, pamięć krótkoterminowa, pamięć długoterminowa
- Pamięć długoterminowa dzieli się na semantyczną, epizodyczną i proceduralną
- Reprezentacja danych (string, encja, graf) to decyzja niezależna od warstwy

**Why do I care:** To dobry punkt startowy do rozmowy z zespołem, zanim ktoś zacznie wrzucać wszystko do jednej bazy wektorowej i nazywać to "pamięcią agenta". Rozdzielenie warstw z góry ułatwia potem decyzję, gdzie faktycznie potrzebujecie grafu, a gdzie wystarczy zwykły klucz-wartość.

**Link:** [How Does Memory for AI Agents Work?](https://substack.com/redirect/13dd215a-d1b5-4dd9-8832-c51f4766a257?j=eyJ1IjoidGIyeHgifQ.cAeV0Wf58qGhizTnFG9XUT1f_ZzTflR8ugMcaWDmXpc)

## Pamięć agenta od zera na jednej bazie danych

**TLDR:** Druga część pokazuje kompletny system pamięci działający na jednej bazie: ścieżka zapisu to chunk, ekstrakcja, walidacja, rozwiązywanie referencji, embedding, deduplikacja i upsert, z ontologią wymuszaną jako kontrakt Pydantic.

**Summary:** Na tej ścieżce zapisu osadzone są trzy metody wyszukiwania, serwowane agentowi przez serwer FastMCP. Ciekawy jest wybór, żeby ontologię (czyli schemat tego, co w ogóle wolno zapisać jako fakt) egzekwować jako kontrakt typu Pydantic, a nie jako luźną konwencję nazewniczą, co wymusza spójność danych zanim jeszcze trafią do grafu.

**Key takeaways:**
- Ścieżka zapisu: chunk, extract, validate, resolve, embed, deduplicate, upsert
- Ontologia egzekwowana jako kontrakt Pydantic, nie luźna konwencja
- Trzy metody retrieval serwowane przez FastMCP jako interfejs dla agenta

**Why do I care:** Kontrakt typowany na wejściu do pamięci to dokładnie to, czego brakuje w większości szybko sklejonych systemów RAG, gdzie każdy kolejny typ dokumentu dokłada swoje pole do schematu bez żadnej walidacji. Warto ukraść ten pomysł, zanim wasz graf wiedzy zamieni się w śmietnik połowicznie ustrukturyzowanych rekordów.

**Link:** [Agent Memory From Scratch](https://substack.com/redirect/0085b357-22f1-4066-a066-426f6e5d772c?j=eyJ1IjoidGIyeHgifQ.cAeV0Wf58qGhizTnFG9XUT1f_ZzTflR8ugMcaWDmXpc)

## Wnętrze agent-memory od Neo4j Labs

**TLDR:** neo4j-labs/agent-memory to graf wiedzy zbudowany jako działający system z trzema warstwami: rozmowami, encjami i śladami rozumowania, gdzie krawędź SAME_AS oznacza podejrzane duplikaty zamiast po cichu je scalać.

**Summary:** Najbardziej nietypowa część tego projektu to trzecia warstwa: ślady rozumowania, czyli zapisane i ponownie wykorzystywane wcześniejsze myślenie agenta, a nie tylko fakty czy rozmowy. Ontologia POLE+O typuje wszystko, co wchodzi do grafu, a decyzja, żeby krawędź SAME_AS tylko oznaczała podejrzenie duplikatu zamiast automatycznie scalać węzły, zostawia ostateczną decyzję o tożsamości gdzieś dalej w procesie, zamiast ryzykować ciche błędy scalania.

**Key takeaways:**
- Trzy tiery: rozmowy, encje, ślady rozumowania (reasoning traces)
- Ontologia POLE+O typuje wszystko, co wchodzi do grafu
- Krawędź SAME_AS oznacza podejrzenie duplikatu, nie automatyczne scalenie

**Why do I care:** Przechowywanie śladów rozumowania jako osobnej, przeszukiwalnej warstwy to coś, czego prawie nikt jeszcze nie robi w produkcyjnych agentach, a intuicyjnie wydaje się to jedną z tańszych dźwigni na poprawę spójności odpowiedzi w dłuższych sesjach. Warto to mieć na radarze przy projektowaniu własnego systemu pamięci.

**Link:** [Inside Neo4j's Agent Memory](https://substack.com/redirect/2ee88512-6c11-4f1d-ace7-e6617a395636?j=eyJ1IjoidGIyeHgifQ.cAeV0Wf58qGhizTnFG9XUT1f_ZzTflR8ugMcaWDmXpc)

## Przestańcie gonić za idealną ontologią

**TLDR:** Autor przekonuje, że większość projektów grafów wiedzy umiera na etapie modelowania domeny z góry, i proponuje zamiast tego wziąć POLE+O jako stałą bazę, dodać ogólne kategorie Preferences i Facts na wszystko, co nie pasuje, i dorzucać nowe podtypy dopiero gdy wymusi to realne dane.

**Summary:** To najbardziej praktyczna rada z całej mapy drogowej: zamiast spędzać tygodnie na projektowaniu idealnego schematu ontologii przed napisaniem pierwszej linijki kodu, zacznij od czegoś wystarczająco ogólnego, żeby cokolwiek dało się zapisać, i pozwól strukturze ewoluować pod presją faktycznych danych, a nie wyobrażeń o tym, jak dane będą wyglądać.

**Key takeaways:**
- Weź POLE+O jako fundament zamiast projektować ontologię od zera
- Kategorie catch-all (Preferences, Facts) na wszystko, co nie pasuje do reszty schematu
- Nowe podtypy dodawaj dopiero, gdy realne dane tego zażądają, nie z góry

**Why do I care:** To bezpośrednia odpowiedź na najczęstszy powód, dla którego projekty grafów wiedzy nigdy nie wychodzą poza fazę proof of concept: perfekcjonizm modelowania domeny zamiast iteracji na realnych danych. Zasada "dodawaj podtypy, gdy dane tego zażądają" przenosi się zresztą jeden do jednego na projektowanie dowolnego schematu bazy danych, nie tylko grafu.

**Link:** [Stop Chasing the Perfect Ontology](https://substack.com/redirect/583ee2b6-ef11-4484-a9e0-02e09a1271cd?j=eyJ1IjoidGIyeHgifQ.cAeV0Wf58qGhizTnFG9XUT1f_ZzTflR8ugMcaWDmXpc)

## Jak utrzymać graf wiedzy agenta w czystości

**TLDR:** Grafy gniją, gdy nazewnictwo i tożsamość są traktowane jako jedna kontrola. Trzeba je rozdzielić: rozwiązywanie nazw (resolution) przez dopasowanie dokładne, rozmyte i semantyczne, a deduplikację tożsamości przez próg podobieństwa.

**Summary:** Konkretna reguła progowa jest tu najciekawsza: powyżej 0,95 podobieństwa węzły się scalają automatycznie, poniżej 0,85 tworzy się nowy węzeł, a wszystko pomiędzy trafia do człowieka do ręcznej decyzji. To pragmatyczne rozwiązanie problemu, który w czystej teorii wygląda na binarny (ten sam byt albo nie), a w praktyce ma szeroką strefę niepewności, gdzie automatyczna decyzja w dowolną stronę byłaby ryzykowna.

**Key takeaways:**
- Resolution (nazewnictwo) i deduplication (tożsamość) to dwie osobne kontrole, nie jedna
- Resolution: dopasowanie dokładne, rozmyte (fuzzy) i semantyczne
- Progi deduplikacji: powyżej 0,95 automatyczne scalenie, poniżej 0,85 nowy węzeł, reszta do człowieka

**Why do I care:** Strefa niepewności obsługiwana przez człowieka zamiast automatyczną regułę binarną to wzorzec, który warto stosować szerzej niż tylko w grafach wiedzy, wszędzie tam, gdzie system musi decydować "czy to ten sam byt", od deduplikacji rekordów klientów po scalanie kont użytkowników.

**Link:** [How to Keep Your AI Agent's Knowledge Graph Clean](https://substack.com/redirect/00339b99-69c9-4ae3-9b39-6016d6efe3c1?j=eyJ1IjoidGIyeHgifQ.cAeV0Wf58qGhizTnFG9XUT1f_ZzTflR8ugMcaWDmXpc)
