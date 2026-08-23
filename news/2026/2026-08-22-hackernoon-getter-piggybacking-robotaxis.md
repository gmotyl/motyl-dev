---
title: "Getter, który udaje coś więcej, i robotaksówki depczące po piętach londyńskim taksówkarzom"
excerpt: "Code smell o gettera reużywanego do cudzej logiki biznesowej oraz przegląd miast, gdzie autonomiczne taksówki już zabierają pracę kierowcom uważanym dotąd za nie do zastąpienia."
publishedAt: "2026-08-22"
slug: "hackernoon-getter-piggybacking-robotaxis"
hashtags: "#hackernoon #codesmell #encapsulation #cleancode #ai #automation #generated #pl"
source_pattern: "HackerNoon"
---

## Code Smell 321: getter na barana

**TLDR:** Getter dodany z jednego powodu, żeby coś wyświetlić, z czasem staje się wygodnym punktem wejścia dla zewnętrznej logiki biznesowej, którą powinna nosić sama klasa. Efekt: dwa albo trzy miejsca w kodzie decydują, co znaczy ta sama wartość, i żadne z nich nie jest obiektem, który tę wartość posiada.

**Summary:** Mechanizm smellu jest prosty i dlatego tak łatwo go przegapić. Klasa dostaje getter, bo coś gdzieś musi wyświetlić tę wartość, na przykład datę przydatności produktu na etykiecie. To samo w sobie jest już kompromisem, ale takim, który uchodzi na sucho, bo cel jest jasny i jeden. Problem zaczyna się, gdy druga funkcja potrzebuje tej samej wartości do czegoś innego, na przykład do odfiltrowania przeterminowanych produktów, i po prostu woła istniejący getter, a porównanie pisze sama, na zewnątrz klasy. Trzecia funkcja robi to samo, tylko z lekko inną wersją porównania, bo potrzebuje ostrzeżenia o bliskim upływie terminu. Teraz masz dwie definicje tego, co znaczy „przeterminowany”, i żadna z nich nie mieszka w klasie, która o produkcie wie najwięcej.

Autor nazywa to piggybackingiem, dosiadaniem się na cudzym getterze, bo nikt nie dodał drugiego gettera, tylko odruchowo poszedł po ten, który już istniał. Rozwiązanie jest równie proste jak diagnoza: klasa powinna odpowiadać na pytanie sama, metodą typu `isExpiredOn(today)` albo `daysUntilExpiryFrom(today)`, zamiast wydawać surową wartość każdemu, kto o nią poprosi. To klasyczne „tell, don't ask” w praktyce, nie w teorii z podręcznika. Ciekawy jest fragment o generatorach AI: dokładnie ten wzorzec powstaje, gdy prosisz asystenta o funkcję potrzebującą wartości, którą obiekt już eksponuje przez getter. Model napisze samodzielną funkcję wokół tego gettera, bo to najmniejszy diff spełniający prośbę, i nie doda metody do klasy, jeśli nie poprosisz o to wprost. Wykrywanie smellu jest więc manualne: szukaj gettera używanego w warunkach porównania albo filtrach w więcej niż jednym miejscu poza własną klasą.

Autor od razu odcina wymówkę z DTO: DTO nie jest kontrargumentem, tylko celowym złamaniem enkapsulacji z osobną nazwą, więc nie licz go jako uzasadnienie dla tego samego problemu w klasach domenowych.

**Key takeaways:**
- Getter dodany z jednego, jasnego powodu z czasem staje się wygodnym wejściem dla cudzej logiki biznesowej.
- Symptom do szukania: ten sam getter wołany w kilku miejscach, każde z własną, osobną wersją porównania czy warunku.
- Naprawa to metoda na obiekcie odpowiadająca na pytanie biznesowe, nie kolejny getter i nie funkcja zewnętrzna.
- Asystenci AI generują ten smell chętnie, bo dopisanie funkcji wokół istniejącego gettera to najmniejszy diff spełniający prośbę.

**Why do I care:** Ten smell jest wszędzie w kodzie, który przeszedł przez ręce kilku osób w ciągu roku, bo każda z nich dodawała swoją funkcję najkrótszą możliwą drogą. W code review łapię go regularnie właśnie po tym sygnale: getter, który nagle jest importowany w trzecim, czwartym module, każdy z inną wersją tego samego porównania w środku. Jeśli u ciebie w zespole korzysta się z asystentów kodujących na porządku dziennym, to warto dodać ten wzorzec do promptu review, dokładnie tak, jak autor sugeruje: „znajdź gettery wołane z więcej niż jednego miejsca, gdzie wołający sam robi porównanie albo regułę biznesową”, bo bez tej podpowiedzi żaden model nie złapie tego sam.

**Link:** [Code Smell 321 - Getter Piggybacking](https://hackernoon.com/code-smell-321-getter-piggybacking)

---

## Robotaksówki depczą po piętach najbardziej wykwalifikowanym kierowcom

**TLDR:** Waymo, po 16 miliardach dolarów inwestycji, celuje w ponad 20 nowych miast, w tym Londyn i Tokio, testując autonomiczne taksówki właśnie tam, gdzie ruch uliczny uważano dotąd za zbyt chaotyczny dla AI. Dane z Insurance Institute for Highway Safety pokazują 68 procent niższy wskaźnik wypadków na 50 milionach mil w porównaniu z kierowcami-ludźmi.

**Summary:** Artykuł buduje narrację wokół Londynu jako testu ostatecznego: jeśli AI poradzi sobie z ulicami uważanymi za jedne z najtrudniejszych w świecie, gdzie legendarny londyński taksówkarz musi zdać egzamin „The Knowledge” z pamięciowej znajomości miasta, to autonomiczne taksówki są gotowe wszędzie. Uber i Wayve przygotowują tam próby robotaksówek, a autor traktuje to jako moment przełomowy w opinii publicznej, nie tylko technologiczny. Obraz globalny jest bardziej zróżnicowany, niż sugeruje sam nagłówek. Wuhan w Chinach jest opisywane jako epicentrum komercyjnej gęstości robotaksówek, z Apollo Go od Baidu wypuszczającym tysiące w pełni bezkierowcowych pojazdów, tańszych o około 30 procent od usług z kierowcą. San Francisco i Phoenix przeszły od testów do skali pełnej użyteczności publicznej dzięki Waymo. Tokio integruje autonomicznych pilotów agresywnie, ale z innego powodu niż reszta: demograficzny niedobór kierowców jest tak poważny, że AI zastępuje tam siłę roboczą, która i tak by się nie odnowiła, więc opór pracowniczy jest dużo mniejszy niż w miastach zachodnich.

Nowe Delhi i Mumbaj są przywołane jako kontrapunkt: chaotyczny ruch, monsunowe zalania i nieustrukturyzowane drogi odsuwają tam pełną autonomię na później, a na razie AI wchodzi od góry, w zamknięte logistyki, stałe trasy firmowe i pasy transportu towarowego na autostradach. Ekonomiczna kalkulacja jest brutalna w liczbach: jedna operacyjna robotaksówka zastępuje czterech ludzkich kierowców, bo eliminuje limit dziesięciu do dwunastu godzin dziennie wynikający ze zmęczenia, nie wymaga pensji, ubezpieczenia i benefitów, a koszt operacyjny to głównie prąd i konserwacja sprzętu. Artykuł wspomina też, że kierowcy w rejonach mocno penetrowanych przez AI wydłużają zmiany, by konkurować, a liczba nowych aplikacji o licencję komercyjnego kierowcy spada, co jest chyba najbardziej ludzkim fragmentem całego tekstu.

**Key takeaways:**
- Waymo celuje w ponad 20 nowych miast po 16 miliardach dolarów inwestycji, testując Londyn i Tokio jako flagowe rynki.
- Dane IIHS pokazują 68 procent niższy wskaźnik wypadków robotaksówek na 50 milionach mil względem kierowców-ludzi.
- Jedna robotaksówka zastępuje ekonomicznie czterech ludzkich kierowców, głównie dzięki zniesieniu limitu godzin pracy wynikającego ze zmęczenia.
- W Delhi i Mumbaju chaotyczny ruch i monsuny odsuwają pełną autonomię, AI wchodzi tam najpierw w logistykę zamkniętą, nie w rideshare.

**Why do I care:** To przede wszystkim materiał branżowy i ekonomiczny, nie inżynierski, ale warto go czytać jako frontend developer czy architekt z jednego powodu: to jeden z najbardziej dojrzałych, mierzalnych wdrożeń AI w świecie fizycznym, z konkretnymi liczbami bezpieczeństwa i kosztu, nie tylko z demo na konferencji. Wzorzec, który tu widać, „AI wchodzi najpierw tam, gdzie środowisko jest ustrukturyzowane, potem rozszerza się na chaos”, przenosi się bezpośrednio na wdrażanie agentów kodujących w firmowych bazach kodu: najpierw proste, powtarzalne zadania w znanym środowisku, potem dopiero praca w bałaganie starszego kodu. Jeśli zarządzasz zespołem albo roadmapą produktu opartego na agentach, ten artykuł jest lepszym case study adopcji AI niż większość tekstów pisanych bezpośrednio o programowaniu.

**Link:** [Robotaxis Are Coming for the World's Most Skilled Drivers](https://hackernoon.com/robotaxis-are-coming-for-the-worlds-most-skilled-drivers)
