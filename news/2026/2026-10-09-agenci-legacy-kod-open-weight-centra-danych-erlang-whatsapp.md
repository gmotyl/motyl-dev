---
title: "Agenci w legacy kodzie, modele otwarte kontra zamknięte, centra danych i Erlang w WhatsAppie"
excerpt: "Czy agent AI zrozumie historię starego systemu, kiedy wybrać model open-weight, jak egzekwować warunki dla centrów danych i jak Erlang obsłużył miliardy wiadomości."
publishedAt: "2026-10-09"
slug: "agenci-legacy-kod-open-weight-centra-danych-erlang-whatsapp"
hashtags: "#hackernoon #ai #agents #llm #architecture #open-source #refactoring #generated #pl"
source_pattern: "HackerNoon"
---

## Co się stanie, gdy agenci zaczną utrzymywać legacy kod

**TLDR:** Agent AI potrafi czytać stary kod, ale nie zna powodów, dla których ktoś go tak napisał. Bezpieczne wykorzystanie zaczyna się od archeologii, nie od refaktoryzacji.

**Summary:** Autor wychodzi od obserwacji, że systemy legacy są trudne nie dlatego, że są stare, tylko dlatego, że duża część wiedzy leży poza repozytorium. Brzydki warunek może kodować kontrakt sprzed ośmiu lat, kolumna, której nikt nie używa, może zasilać kwartalny eksport finansowy, a dziwne opóźnienie ponowień może pamiętać incydent produkcyjny. Agent, który czyta kod, rozumie, co system robi. Nie rozumie, dlaczego biznes tego wymaga.

Stąd konkretne rady. Testy generowane z istniejącego kodu utrwalają obecne zachowanie, ale nie mówią, czy jest zamierzone, więc pracę z agentem najlepiej zacząć od charakteryzacji, czyli mapy wywołań, tabel, flag i testów, bez zmian w kodzie produkcyjnym. Historia Gita i pull requesty stają się częścią kontekstu, więc komunikat commita "fix stuff" kosztuje więcej niż kiedyś. Dokumentacja powinna tłumaczyć decyzje, nie składnię. Autonomię trzeba skalować do ryzyka, od dokumentacji i generowania testów, przez izolowane poprawki, aż po schematy bazy, autoryzację i rozliczenia, gdzie decyduje człowiek.

Podoba mi się zalecenie o małych diffach. Siedem linii zamiast przebudowy klasy z dziewięciuset to nie lenistwo, tylko ograniczanie niewiadomych. Jedyne, czego mi brakuje, to liczb. Ile pracy faktycznie oszczędza etap archeologii i skąd wiadomo, że agent nie przeoczył gałęzi, która kodowała kontrakt? Tekst jest rozsądny, ale to zbiór dobrych praktyk, bez pomiarów.

**Key takeaways:**
- Repozytorium to nie system. Brakuje kontraktów, zgłoszeń, regulacji i wiedzy ludzi.
- Zaczynaj od mapowania i charakteryzacji, nie od zmian w kodzie.
- Zmiany agenta powinny być małe, a poziom autonomii zależeć od ryzyka.
- Po wdrożeniu patrz na metryki biznesowe, nie tylko na testy.

**Why do I care:** W konsultingu widzę dokładnie ten scenariusz. Zespół chce, by agent "unowocześnił moduł", a nikt nie wie, dlaczego ten moduł ma trzy wyjątki dla klientów. Zanim dasz agentowi dostęp do zapisu, daj mu zadanie wypisania wszystkich gałęzi, które wyglądają na biznesowe, i sprawdź to z kimś, kto pamięta historię.

**Link:** [What Happens When AI Agents Start Maintaining Legacy Code?](https://hackernoon.com/what-happens-when-ai-agents-start-maintaining-legacy-code)

## Open-source czy closed-source LLM: co faktycznie wybrać

**TLDR:** Dla większości twórców agentów odpowiedź brzmi "oba". Zamknięty model frontier do trudnego rozumowania, a własny hosting modeli open-weight do zadań masowych i powtarzalnych.

**Summary:** Autor zaczyna od rozróżnienia, które zwykle się gubi. Prawie wszystko, co nazywa się open-source, jest w rzeczywistości open-weight, czyli ma pobieralne wagi i licencję, ale nie ma danych treningowych ani pełnej receptury. Definicja Open Source Initiative z października 2024 wymaga wag, kodu treningowego i informacji o danych. Modele takie jak OLMo spełniają ją, a Llama nie, bo jej licencja ma dodatkowe warunki. Przed rankingami benchmarków warto przeczytać licencję, bo model, którego nie możesz legalnie wdrożyć, nie jest kandydatem.

Dalej jest rachunek. API bilansuje się za token, własny GPU za godzinę, bez względu na to, czy jest zajęty. Przy małym i nierównym ruchu wygrywa API, przy dużym i stałym własny sprzęt. Dane, które nie mogą opuścić sieci, jak finanse, zdrowie czy administracja, przemawiają za open-weight. Z drugiej strony najsilniejsze modele otwarte, na przykład MoE z 1,6 biliona parametrów, wymagają klastra, a na jednym GPU zmieści się tylko mniejsze, jak gpt-oss-20b w około 16 gigabajtach.

Zastrzeżenie. Tekst kończy się reklamą narzędzia Superlinked, które autor poleca do uruchamiania takich modeli. To nie unieważnia rad, ale warto pamiętać, kto je opłaca. Brakuje też progu, od którego własny GPU faktycznie się opłaca. Autor mówi "wysoki i stały wolumen", a nie podaje liczby.

**Key takeaways:**
- Open-weight to nie open-source. Sprawdź licencję przed benchmarkiem.
- Frontier do trudnego rozumowania, open-weight do embeddingów, rerankingu, ekstrakcji i klasyfikacji.
- Własny GPU opłaca się przy stałym obciążeniu, API przy nierównym.

**Why do I care:** Warstwa routingu modeli to dziś decyzja architektoniczna. Zamiast jednego dostawcy zrób interfejs, za którym możesz podmienić model, bo ceny i licencje zmieniają się częściej niż twój kod.

**Link:** [Open-Source vs Closed-Source LLMs. What should you actually use?](https://hackernoon.com/open-source-vs-closed-source-llms-what-should-you-actually-use)

## Przestań obwiniać AI, zacznij rozliczać operatorów centrów danych

**TLDR:** Autor przekonuje, że sprzeciw wobec centrów danych powinien kierować się na konkretne decyzje planistyczne i warunki zezwoleń, nie na samą technologię.

**Summary:** Argument jest taki, że kiedy ludzie narzekają na AI, mają na myśli lokalne rzeczy. Wielką halę kilka pól dalej, wodę pobieraną w suchym lecie, szum w nocy, ciężarówki na drodze budowanej dla traktorów i rachunek za prąd, który rośnie, gdy sąsiedni budynek dostaje ulgę podatkową. To są decyzje podejmowane przez radnych i regulatorów, a więc ludzi, na których można głosować.

Większość tekstu to lista warunków, które autor chce widzieć w zezwoleniach. Neutralność emisyjna per lokalizacja, a nie uśredniana między obiektami. Szczegółowa deklaracja zużycia wody przed zgodą. Zakaz klauzul poufności przy wyborze lokalizacji. Regulator finansowany z opłaty ustalonej w ustawie, ale bez wpływu operatora na decyzje. Wysokie kary, publikowane raporty z kontroli, przegląd zezwoleń co około pięć lat, osobna taryfa na prąd, żeby koszt stacji nie spadał na rachunki mieszkańców, fundusz społeczny i kaucja na rozbiórkę po zakończeniu pracy obiektu.

To jest tekst polityczny i tak go trzeba czytać. Nie ma tu analizy, czy wszystkie te warunki są wykonalne razem, ani ile kosztowałyby operatora, a autor zbywa argument o odpływie inwestorów jednym zdaniem. Lista jest jednak konkretna i to jej największa zaleta, bo pozwala zadać radnemu jedno pytanie, na przykład o wodę, i sprawdzić odpowiedź.

**Key takeaways:**
- Decyzje o centrach danych zapadają w lokalnych radach i urzędach, nie w laboratoriach AI.
- Najważniejsze warunki to woda, taryfa na prąd, jawność, niezależny regulator i kaucja na rozbiórkę.
- Pojedyncze pytanie zadane publicznie kandydatowi działa lepiej niż ogólna złość.

**Why do I care:** To przede wszystkim temat biznesowy i obywatelski, ale deweloper powinien go znać, bo ograniczenia energii i wody zaczną wpływać na ceny i dostępność obliczeń. Koszt tokena nie spada w próżni. Warto to wiedzieć, planując budżet na AI.

**Link:** [Stop Blaming AI. Start Holding Data Center Operators Accountable](https://hackernoon.com/stop-blaming-ai-start-holding-data-center-operators-accountable)

## Dziwny język, który pomógł zbudować WhatsApp

**TLDR:** Opowieść o Erlangu napisana w wyobrażonym pierwszoosobowym głosie Joego Armstronga. Zasada "niech się wywali" i izolowane procesy pozwoliły kilkudziesięciu inżynierom obsłużyć setki milionów ludzi.

**Summary:** Autor zaznacza na wstępie, że to narracyjna rekonstrukcja, oparta na artykułach, wykładach i wywiadach Armstronga, który zmarł w 2019 roku. Erlang powstał w latach osiemdziesiątych w Ericssonie, żeby centrale telefoniczne nie przerywały rozmów. Jego rdzeniem są tysiące odizolowanych procesów, które komunikują się tylko wiadomościami, nadzorcy restartujący procesy po awarii i ładowanie nowego kodu bez zatrzymywania działającego systemu.

Liczby są efektowne. W 2014 roku, gdy Facebook kupował WhatsApp za 19 miliardów dolarów, firma miała około 450 milionów użytkowników miesięcznie i około pięćdziesięciu inżynierów. Pojedynczy serwer obsługiwał do 2,8 miliona jednoczesnych połączeń, a w sylwestra 2012 przeszło 18 miliardów wiadomości dziennie. Z kolei Facebook w 2008 zbudował własny czat na Erlangu, a potem przepisał go na C++, bo za mało osób znało język. Jest też uczciwa wzmianka o Ericssonie, który w 1998 zakazał Erlanga w nowych produktach, i o tym, że słynne dziewięć dziewiątek dostępności dotyczy konkretnej sieci w konkretnym okresie.

Zwracam uwagę na to, co autor pomija. Opowiadanie historii z perspektywy zwycięzcy ułatwia przekonanie, że ta filozofia jest uniwersalna. Nie każdy system toleruje restart procesu bez straty stanu, a postawa "niech się wywali" wymaga, by ktoś zaprojektował drzewo nadzorców. Ale sedno przetrwało w praktyce. Dziś Meta trzyma Erlanga jako orkiestratora, a ryzykowne parsowanie plików oddaje Rustowi.

**Key takeaways:**
- Izolacja procesów i nadzorcy zamiast obronnego kodowania na każdy błąd.
- Hot code loading pozwala wymienić kod bez przerywania połączeń.
- Dziś wzorzec to Erlang lub Elixir do orkiestracji i Rust do ciężkiej i ryzykownej pracy.

**Why do I care:** Frontend też ma swoje wersje tej idei, czyli error boundaries i izolowane widgety. Zamiast łapać każdy błąd w każdym komponencie, ustaw granice, w których awaria pozostaje lokalna, i pozwól reszcie strony żyć. To lepsza strategia niż dziesięć try-catchy w jednym renderze.

**Link:** [The Strange Programming Language That Helped Build WhatsApp](https://hackernoon.com/the-strange-programming-language-that-helped-build-whatsapp)
