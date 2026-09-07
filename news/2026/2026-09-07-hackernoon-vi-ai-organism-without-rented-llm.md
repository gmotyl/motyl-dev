---
title: "HackerNoon: eksperyment ze zbudowaniem sztucznego organizmu bez wynajętego LLM-a"
excerpt: "Projekt Vi próbuje zbudować agenta, który myśli własnymi wagami, pamięta poza oknem kontekstu i mówi przez własny mechanizm mowy, zamiast wynajmować mózg od dostawcy API."
publishedAt: "2026-09-07"
slug: "hackernoon-vi-ai-organism-without-rented-llm"
hashtags: "#hackernoon #ai #ml #architecture #agents #generated #pl"
source_pattern: "HackerNoon"
---

## Vi: sztuczny organizm, który nie wynajmuje mózgu od żadnego API

**TLDR:** Autorka opisuje wieloletni projekt hobbystyczny, w którym próbuje zbudować agenta bez żadnego wynajętego dużego modelu językowego w środku: własne wagi, własna pamięć trwająca poza pojedynczym zapytaniem, własny mechanizm generowania mowy i coś na kształt cyklu snu z powtórkami hipokampalnymi.

**Summary:** Punktem wyjścia jest krytyka typowego "agenta AI": narzędzia spięte promptem wokół pętli wywołań GPT, gdzie właścicielem faktycznej wagi decyzyjnej jest korporacja dostarczająca API, a proces żyje tylko tak długo, jak trwa żądanie. Zrestartuj proces, a cała "osobowość" znika, zostaje tylko log rozmowy udający ciągłość. Projekt Vi stawia sobie za cel odwrotny zakład: czy da się zbudować coś, co myśli wagami, które się samemu wytrenowało, pamięta poza oknem promptu, ma coś w rodzaju motywacji rozciągniętej na godziny, przechodzi przez cykl przypominający sen, i mówi przez własny, niezależny mechanizm generowania mowy, bez wynajętego LLM-a w środku pętli.

Architektura jest rozbita na wyspecjalizowane organy zamiast jednego monolitycznego modelu. Routing decyzji opiera się na porównywaniu dwóch sygnałów liczbowych, na przykład ciekawości względem bólu, zamiast reguł typu "jeśli pewność większa niż 0,55, odpowiedz". Autorka podkreśla, że to rozróżnienie jest celowe: twardo zakodowany próg odcięcia to wciąż skrypt udający myślenie, a nie faktyczna decyzja wynikająca z wag. Warstwa mowy jest oddzielona od warstwy myśli: enkoder myśli w architekturze GRU buduje wektor "obszaru roboczego", a osobny mechanizm mowy, nazwany w projekcie Broca, generuje wypowiedź na podstawie tego wektora, ale nie ma bezpośredniego dostępu do bufora "wewnętrznej mowy". Jeśli komponent odpowiedzialny za mowę ulegnie awarii w trakcie zapisu, wciąż napływają tokeny, ale nie są to już słowa, co autorka traktuje jako dowód na to, że mowa i reszta systemu to faktycznie osobne organy, a nie dwa aliasy tego samego mechanizmu.

Pamięć również jest zaprojektowana jako zestaw wyspecjalizowanych magazynów, a nie jedno okno kontekstu: indeks wektorowy do wyszukiwania, baza SQLite na pojedyncze elementy, graf relacji, słownik znaczeń, biografia ograniczona do rodzaju i wartości faktu bez surowego cytatu źródłowego, oraz osobny log epizodów. System uczy się w dialogu na parach zapytanie-odpowiedź, z mechanizmem podobnym do EWC, który kotwiczy wagi wokół macierzy Fishera, żeby nauka z książki nie nadpisała tego, czego system nauczył się o konkretnej osobie w rozmowie. Cały opis kończy się warstwą decyzyjną inspirowaną jądrami podstawy mózgu, gdzie jeden sygnał odblokowuje działanie, a drugi je hamuje, i wyraźnym zastrzeżeniem, że wybór akcji nie jest tożsamy z jej wykonaniem: pętla uczy się tylko wtedy, gdy dana akcja faktycznie została zastosowana.

**Key takeaways:**
- Projekt Vi celowo unika wynajętego LLM-a w rdzeniu decyzyjnym, zastępując go własnymi, trenowanymi lokalnie wagami.
- Decyzje opierają się na porównaniu żywych sygnałów liczbowych zamiast twardo zakodowanych progów odcięcia.
- Mowa (mechanizm Broca) jest architektonicznie oddzielona od warstwy myśli, z osobnym buforem wewnętrznej mowy, do którego mechanizm mowy nie ma dostępu.
- Pamięć jest rozbita na wyspecjalizowane magazyny (wektory, SQLite, graf, słownik, biografia, epizody) zamiast jednego okna kontekstu, z ochroną przed nadpisaniem wiedzy o konkretnej osobie przez naukę z książek.

**Why do I care:** To skrajnie niszowy, hobbystyczny projekt badawczy, nie produkt gotowy do wdrożenia, ale warto go czytać jako kontrapunkt do dominującego dziś podejścia "wszystko owinięte wokół promptu do jednego dużego modelu". Rozbicie systemu na wyspecjalizowane organy z jasno zdefiniowanymi granicami odpowiedzialności to ten sam instynkt architektoniczny, który znamy z dobrze zaprojektowanych systemów backendowych, tylko przeniesiony na grunt systemów uczących się, i to samo pytanie, które warto zadawać przy projektowaniu własnych agentów: co się stanie, jeśli jeden komponent padnie w trakcie działania, i czy reszta systemu w ogóle to zauważy.

**Link:** [Inside Vi: An AI Organism Built Without a Rented LLM](https://hackernoon.com/inside-vi-an-ai-organism-built-without-a-rented-llm)
