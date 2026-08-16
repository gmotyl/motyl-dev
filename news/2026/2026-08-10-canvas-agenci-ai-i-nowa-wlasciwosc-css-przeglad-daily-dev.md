---
title: "Canvas kontra HTML, agenci AI i nowa właściwość CSS: przegląd daily.dev"
excerpt: "Przegląd czterech tematów z daily.dev: kiedy Canvas bije HTML, co DHH mówi o pracy z agentami AI, dokąd zmierza szumna faza AI i jak CSS radzi sobie teraz z przewijaniem po skosie."
publishedAt: "2026-08-10"
slug: "canvas-agenci-ai-i-nowa-wlasciwosc-css-przeglad-daily-dev"
hashtags: "#dailydev #frontend #webdev #canvas #ai #css #architecture #generated #pl"
source_pattern: "daily.dev"
---

## Canvas kontra HTML: kiedy warto budować webaplikację na płótnie

**TLDR:** Google Docs, Excel Web, Miro i Canva nie renderują swojego interfejsu na DOM-ie, tylko na Canvasie, bo ich UI zachowuje się jak scena, a nie jak dokument. Artykuł tłumaczy, kiedy to podejście faktycznie ma sens i jak poradzić sobie z gęstością pikseli oraz harmonogramowaniem renderowania.

**Summary:** Od lat powtarza się ten sam mit, że Canvas to relikt z czasów gier w przeglądarce, a poważne aplikacje webowe powinny trzymać się DOM-u, bo tak każe dobra praktyka dostępności i semantyki. Ten artykuł słusznie podważa to założenie, pokazując, że narzędzia takie jak Google Docs, Google Sheets, Excel Web, Miro czy Canva świadomie wybrały Canvas, i to nie dla efektu, tylko z konkretnego powodu architektonicznego. Ich interfejs nie jest dokumentem z hierarchią elementów, tylko przestrzenną scianą, po której użytkownik przesuwa się, powiększa i manipuluje tysiącami obiektów naraz. DOM w takim scenariuszu zaczyna się dławić, bo przeglądarka musi utrzymywać drzewo elementów, style, warstwy kompozycji i reflow dla każdego z tych obiektów, nawet jeśli większość z nich w danym momencie jest poza widokiem.

Autor nie ucieka jednak w prostą tezę "Canvas jest lepszy", bo to byłaby nieuczciwa uproszczona narracja. Dla zwykłej aplikacji webowej DOM wciąż wygrywa, i to z dużym marginesem, bo dostajemy za darmo dostępność, zaznaczanie tekstu, obsługę klawiatury i natywne zarządzanie fokusem. Canvas kosztuje właśnie tam, gdzie DOM daje najwięcej korzyści bez wysiłku. Sytuacja się zmienia, gdy interfejs ma nieskończony obszar roboczy z przesuwaniem i skalowaniem, tysiące elementów rozmieszczonych absolutnie, złożone wymagania co do kolejności warstw albo potrzebę renderowania z różnym poziomem szczegółowości w zależności od przybliżenia. To są konkretne, mierzalne sygnały, a nie subiektywne wrażenie, że "DOM jest wolny".

Część techniczna artykułu jest praktyczna i konkretna, co rzadko się zdarza w tekstach o Canvasie. Autor pokazuje, jak obsłużyć gęstość pikseli, skalując wymiary elementu Canvas przez współczynnik devicePixelRatio, a potem od razu kompensując tę skalę wywołaniem funkcji skalującej kontekst, żeby współrzędne rysowania zostały bez zmian. Dodaje przy tym drobny, ale ważny detal, żeby zabezpieczyć się przed urządzeniami, które zgłaszają współczynnik niższy od jedności, bierąc maksimum z tej wartości i jedynki. To jest dokładnie ten rodzaj wiedzy, która nie trafia do dokumentacji, a psuje ostrość renderowania na realnych urządzeniach.

Drugim solidnym elementem jest architektura renderowania. Zamiast każdego komponentu samodzielnie wywołującego rysowanie, autor proponuje centralną klasę Renderera z metodą planującą odświeżenie, która ustawia flagę i woła harmonogram klatek animacji tylko raz na klatkę, niezależnie od tego, ile podrenderów zgłosiło zmianę stanu. Każda klatka czyści cały obszar rysowania i odtwarza wszystkie warstwy w ustalonej kolejności, co eliminuje redundantne przerysowania i czyni zachowanie przewidywalnym. Dla efektów interakcji, jak podświetlenie po najechaniu, proponuje dodatkową, lekką warstwę Canvas nałożoną na główną, odświeżaną niezależnie. To jest wzorzec, który każdy, kto próbował ręcznie zarządzać renderowaniem gry albo edytora graficznego w przeglądarce, w końcu wymyśla sam metodą prób i błędów, więc dobrze, że ktoś to nazwał i spisał.

**Key takeaways:**
- Canvas ma sens tam, gdzie interfejs jest przestrzenną sceną z tysiącami elementów, a nie dokumentem tekstowym
- Skalowanie przez devicePixelRatio i kompensacja przez skalowanie kontekstu to podstawa ostrego renderowania na ekranach retina
- Centralny Renderer z jednym wywołaniem harmonogramu klatek na cykl zapobiega redundantnym przerysowaniom

**Why do I care:** Jako architekt frontendu widzę w tym artykule dobre antidotum na dwie skrajności, jedną gdzie ludzie sięgają po Canvas do zwykłego formularza, bo "będzie szybciej", i drugą, gdzie ktoś próbuje zbudować nieskończoną tablicę na czystym DOM-ie i po miesiącu odkrywa, że przeglądarka nie nadąża z reflow przy tysiącu elementów. Decyzja Canvas kontra DOM nie jest wyborem estetycznym, to wybór modelu danych i sposobu, w jaki użytkownik wchodzi w interakcję z powierzchnią. Zanim ktoś w moim zespole zaproponuje Canvas, pytam wprost, czy dostępność i indeksowanie treści przez czytniki ekranu są w tym projekcie do negocjacji, bo w większości przypadków odpowiedź brzmi "nie", i to kończy dyskusję szybciej niż jakikolwiek benchmark wydajności.

**Link:** [Why you might want to build your WebApp in Canvas instead of HTML](https://daily.dev/posts/6yBIL35Ip)

## Nieskończone wykonanie: DHH o pracy z agentami AI

**TLDR:** David Heinemeier Hansson opisuje pracę z agentami AI jako najbardziej ekscytujące doświadczenie w swojej ponad czterdziestoletniej karierze z komputerami, nazywając to "nieskończonym wykonaniem", czyli możliwością natychmiastowego działania na każdą ideę. Wspomina o ryzykach, ale skupia się na zachwycie chwilą.

**Summary:** Wpis DHH jest krótki, ale gęsty od emocji, i trzeba go czytać właśnie jako wpis emocjonalny, a nie techniczną analizę. Teza brzmi tak, że agenci AI dają programiście zdolność natychmiastowego przejścia od pomysłu do działania, bez tarcia, które wcześniej wymuszało planowanie, pisanie, debugowanie i cierpliwość. DHH nazywa to "nieskończonym wykonaniem" i porównuje efekt bardziej do magii niż do technologii, co jest mocnym stwierdzeniem od kogoś, kto zbudował Ruby on Rails i spędził dekady patrząc, jak kolejne fale technologii obiecują rewolucję.

Problem z takim entuzjazmem jest prosty, mianowicie subiektywne wrażenie "to jest jak magia" mówi więcej o tym, jak dana osoba wcześniej pracowała, niż o obiektywnej jakości narzędzia. Ktoś, kto spędził czterdzieści lat pisząc kod linijka po linijce, oczywiście poczuje przełom, widząc, jak agent samodzielnie realizuje wieloetapowe zadanie. To nie znaczy, że wrażenie jest fałszywe, ale znaczy, że nie powinno się go traktować jako miarę uniwersalną, bo dla kogoś, kto od lat pracuje z generatorami kodu niskiego poziomu albo skryptami automatyzującymi, ten sam agent może być tylko kolejnym krokiem, a nie skokiem.

DHH sam wspomina o zagrożeniach, ale robi to jednym zdaniem, po czym wraca do zachwytu, i to jest moment, w którym warto zapytać, czy takie krótkie potraktowanie ryzyka jest uczciwe wobec czytelnika. Sugestia, że obecny stan agentów AI może już przypominać to, co ktokolwiek miał na myśli mówiąc AGI, jest efektowna retorycznie, ale rozmywa definicję do punktu, w którym każdy postęp można nazwać AGI, jeśli tylko czujemy się wystarczająco zaskoczeni. To jest klasyczny wzorzec w dyskusjach o sztucznej inteligencji, gdzie granica przesuwa się razem z entuzjazmem mówiącego, a nie z jakimkolwiek mierzalnym kryterium.

**Key takeaways:**
- "Nieskończone wykonanie" opisuje subiektywne wrażenie zniknięcia tarcia między pomysłem a działaniem, nie obiektywną metrykę
- Entuzjazm doświadczonego programisty wobec agentów mówi więcej o jego wcześniejszym warsztacie niż o samym narzędziu
- Nazywanie obecnych agentów "być może już AGI" rozmywa definicję bardziej niż ją precyzuje

**Why do I care:** Lubię czytać takie wpisy, bo pokazują szczery entuzjazm, ale jako ktoś, kto ocenia narzędzia dla zespołów, muszę oddzielić emocję od decyzji inżynierskiej. Fakt, że komuś z ogromnym doświadczeniem agent AI wydaje się magiczny, nie mówi mi nic o tym, jak ten agent zachowa się w moim repozytorium z legacy kodem, dziesięcioletnimi konwencjami i zespołem, który dopiero uczy się code review dla kodu wygenerowanego automatycznie. Zachwyt jest zaraźliwy i to jest właśnie ryzyko, bo łatwo przenieść entuzjazm z demo na produkcję bez sprawdzenia, czy "nieskończone wykonanie" nie oznacza w praktyce nieskończonego długu technicznego.

**Link:** [Endless execution](https://daily.dev/posts/algLPZ4g1)

## AI wchodzi w erę GeoCities: co powinien robić programista?

**TLDR:** Materiał porównuje obecną fazę AI do wczesnej ery GeoCities i bańki dot-com, pełnej startupów, wielkich obietnic i nieuniknionych upadków, po których ma nadejść bardziej dojrzała druga faza. Rada dla programistów brzmi, żeby trzymać się fundamentów, uczyć się pracy z wieloma modelami i budować realne projekty.

**Summary:** Analogia do GeoCities jest chwytliwa i w dużej części trafna, bo faktycznie obserwujemy powtórkę wzorca znanego z boomu internetowego, czyli falę kapitału inwestycyjnego, dziesiątki startupów obiecujących to samo w różnych wariantach i nieproporcjonalną ilość szumu medialnego względem realnej wartości dostarczanej dzisiaj. Autor twierdzi, że po tej chaotycznej pierwszej fazie przyjdzie druga, bardziej dojrzała, tak jak po pęknięciu bańki dot-com przetrwały i wyrosły firmy takie jak Amazon czy Google. To rozumowanie ma sens historyczny, ale trzeba pamiętać, że analogia nie jest dowodem, bo każda bańka ma swoją specyfikę, a AI różni się od stron internetowych z lat dziewięćdziesiątych chociażby tym, że wymaga nieporównywalnie większego kapitału infrastrukturalnego na start.

Rada dotycząca fundamentów, czyli HTML, CSS3, responsywny design, potem backend w JavaScript albo PHP i podstawy SQL, jest solidna i nietrudno się z nią zgodzić, bo te umiejętności nie tracą wartości niezależnie od tego, który model językowy akurat dominuje na rynku. Bardziej dyskusyjna jest sugestia, żeby uczyć się pracy z wieloma modelami naraz, GPT, Claude i Gemini, traktując je jak różne biblioteki z różnymi mocnymi stronami. To jest prawda na poziomie ogólnym, ale w praktyce większość zespołów nie ma luksusu przełączania się między trzema dostawcami w produkcyjnym kodzie, bo koszty integracji, różnice w API i konieczność testowania trzech ścieżek jednocześnie szybko przewyższają korzyści z wyboru "najlepszego modelu do zadania".

Najbardziej wątpliwym elementem jest konkretna liczba, około dwustu pięćdziesięciu godzin fundamentalnej pracy przed przejściem do projektów związanych z AI. Takie liczby brzmią naukowo, ale w rzeczywistości są arbitralne, bo tempo nauki zależy od tła osoby, wcześniejszego doświadczenia z programowaniem i tego, czy uczy się w pełnym wymiarze czy po godzinach. Podanie konkretnej liczby godzin daje czytelnikowi fałszywe poczucie precyzji tam, gdzie żadnej precyzji nie ma.

**Key takeaways:**
- Analogia do GeoCities trafnie opisuje nadmiar szumu względem realnej wartości, ale nie jest dowodem na to, co stanie się dalej
- Fundamenty webu i backendu wciąż się bronią niezależnie od tego, który model AI akurat wygrywa
- Konkretna liczba godzin nauki to fałszywa precyzja, bo tempo nauki jest w praktyce bardzo indywidualne

**Why do I care:** Zgadzam się z tą radą w warstwie ogólnej, bo faktycznie widzę w rekrutacji, że kandydaci, którzy potrafią jedynie prompt engineering bez zrozumienia, co dzieje się pod maską, szybko się gubią, kiedy trzeba debugować coś realnego. Jednocześnie ostrzegałbym przed czytaniem takich materiałów jako planu kariery, bo "jeździj na fali AI, ale nie przywiązuj się do żadnej technologii" to rada tak ogólna, że pasuje do każdej dekady w historii softwaru, od Javy przez frontendowe frameworki aż do dzisiejszych modeli językowych. Konkretny wybór, czego się uczyć w tym tygodniu, wciąż wymaga własnej oceny sytuacji, a nie ośmiominutowego filmu.

**Link:** [AI Is Entering Its GeoCities Era. What Should Developers Do?](https://daily.dev/posts/lq7CILNnw)

## Przełamanie blokady osi przewijania: nowa właściwość CSS scroll-axis-lock

**TLDR:** Nowa właściwość CSS scroll-axis-lock, część specyfikacji CSS Overflow 5, pozwala wyłączyć domyślne blokowanie przewijania do jednej osi, dzięki czemu użytkownik może przewijać dokładnie po skosie, tak jak prowadzi gestem. Na razie działa tylko w Chromium 153, ale degraduje się bezpiecznie, więc można ją stosować bez wykrywania funkcji.

**Summary:** Każdy, kto próbował przewijać stronę po przekątnej na trackpadzie albo telefonie, znał to uczucie frustracji, kiedy przeglądarka sama decyduje, że gest był "bardziej pionowy niż poziomy", i zatrzaskuje przewijanie do jednej osi, ignorując drugą składową ruchu. To zachowanie, nazywane railing, było dotąd niekonfigurowalne z poziomu CSS i programiści musieli obchodzić je ręcznie, przechwytując zdarzenia wheel i touch, co zawsze kończyło się niekonsekwentnym zachowaniem między przeglądarkami. Nowa właściwość scroll-axis-lock wreszcie daje deklaratywną kontrolę nad tym zachowaniem, ustawiając wartość none na kontenerze przewijania, żeby przeglądarka wiernie odwzorowywała ruch wskaźnika w obu osiach naraz, bez zaokrąglania do jednej z nich.

Wartość domyślna, auto, zachowuje istniejące zachowanie przeglądarek, co jest rozsądnym wyborem projektowym, bo nie zmienia niczego dla istniejących stron bez świadomej decyzji autora. Wsparcie jest na razie wąskie, Chromium od wersji 153 obsługuje właściwość, natomiast Firefox i Safari jeszcze nie, co w praktyce oznacza, że efekt będzie widoczny tylko dla części użytkowników. Autor artykułu podkreśla, że to nie jest problem, bo nieznana właściwość jest po prostu ignorowana przez przeglądarkę, więc można jej używać jako progresywnego wzbogacenia bez owijania w warunek sprawdzający wsparcie, choć taka kontrola przez zapytanie @supports jest dostępna, gdyby ktoś chciał inaczej traktować przeglądarki bez wsparcia.

Warto zapytać, dla jakich interfejsów ta właściwość faktycznie zmienia coś odczuwalnego. Dla zwykłej strony z artykułem różnica będzie niezauważalna, bo mało kto przewija tekst po przekątnej. Tam, gdzie to ma sens, to mapy, plansze do rysowania, nieskończone tablice albo gry przewijane w dwóch wymiarach, czyli w dużej mierze te same scenariusze, w których wcześniej opisany artykuł polecał Canvas zamiast DOM-u. To nie jest przypadek, bo obie te historie dotyczą tego samego problemu, czyli interfejsów przestrzennych, którym klasyczny model dokumentu HTML nie do końca odpowiada, i platforma webowa powoli dogania te potrzeby, właściwość po właściwości.

**Key takeaways:**
- scroll-axis-lock: none wyłącza domyślne zatrzaskiwanie gestu przewijania do jednej osi
- Wartość domyślna auto nic nie zmienia, więc wprowadzenie właściwości jest bezpieczne dla istniejących stron
- Na razie działa jedynie w Chromium 153, a Firefox i Safari nie obsługują jej wcale

**Why do I care:** To jest dokładnie ten typ właściwości CSS, który ląduje na mojej liście "przyjemne, ale nie planuję tego wdrażać w tym kwartale", bo wsparcie ograniczone do jednego silnika oznacza, że jakikolwiek produkt zależny od tego zachowania będzie działał inaczej dla różnych użytkowników, a to jest właśnie ten rodzaj niekonsekwencji, którego staram się unikać w interfejsach produkcyjnych. Progresywne wzbogacenie brzmi bezpiecznie w teorii, ale w praktyce oznacza, że część użytkowników dostanie gorsze doświadczenie bez żadnego komunikatu, że coś zostało wyłączone, więc warto to świadomie zaakceptować, a nie wdrażać bezmyślnie tylko dlatego, że można.

**Link:** [Unlock Immediate Diagonal Scrolling with CSS scroll-axis-lock: none](https://daily.dev/posts/yjtRmJ2RR)
