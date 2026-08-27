---
title: "Asteroida nad frontendem, wyważanie flexboxa, akordeony do przeszukania i selektor prefiksu klas"
excerpt: "Nolan Lawson opisuje kryzys edukacji frontendowej, CSS dostaje wyważone zawijanie i selektor prefiksu klas, a AliExpress zostaje przyłapany na dźwiękowym odciskaniu palców."
publishedAt: "2026-08-26"
slug: "asteroida-nad-frontendem-flex-wrap-balance-akordeony-selektor-prefiksu"
hashtags: "#frontendfocus #css #html #accessibility #ai #agents #performance #security #generated #pl"
source_pattern: "Frontend Focus"
---

## Asteroida, która właśnie uderza w rozwój frontendu

**TLDR:** Nolan Lawson opisuje, jak czołowi edukatorzy frontendowi wycofują się z tematu albo przechodzą do mówienia o sztucznej inteligencji. Sprawdza swoją najbardziej niszową wiedzę o wydajności CSS na modelu językowym, dostaje świetną odpowiedź i wyciąga z tego bardzo niewygodne wnioski.

**Summary:** Tekst zaczyna się od listy nazwisk, które każdy w tej branży zna, i od obserwacji, że jedni się wycofują, a drudzy przestawili się na inny temat. Potem autor robi coś odważnego: bierze swoją ulubioną łamigłówkę, czyli pytanie o ślad wydajnościowy z wysokim kosztem przeliczania stylów przy niskim koszcie układu, i zadaje je modelowi. To jest pytanie, na którym, jak sam pisze, wykładali się nawet doświadczeni deweloperzy. Odpowiedź jest wzorcowa: zakres unieważniania, przełączanie klasy wysoko w drzewie, zmiana właściwości dziedziczonej na wspólnym przodku, zmiana zmiennej CSS na korzeniu dokumentu, statystyki selektorów w narzędziach deweloperskich jako następny pomiar. Wszystko, co sam by powiedział.

Z tego wynikają trzy argumenty za tym, że inwestowanie w wiedzę frontendową traci na znaczeniu, i każdy z nich boli. Pierwszy: frontend jest mniej ryzykowny do oddania agentowi. Migrację bazy danych przepuścisz przez kilka rund przeglądu i uruchomisz najpierw na środowisku testowym. Komponent reactowy wielu ludzi po prostu wypchnie na produkcję. Autor uczciwie zaznacza, że ryzyko nie jest zerowe, bo agent potrafi zepsuć dostępność albo wprowadzić pętlę blokującą przeglądarkę, ale kod frontendowy jest bardziej ulotny i wymienialny.

Drugi argument jest najciekawszy. Doświadczenie deweloperskie traci na znaczeniu wobec doświadczenia agenta. Cursor i Viget przeniosły swoje bazy kodu z Solida i Lita do Reacta. Skoro przepisywanie kodu potaniało dzięki agentom, można by oczekiwać ruchu w stronę frameworków wydajniejszych i mniej gadatliwych. Stało się odwrotnie, a powód jest podany wprost: agenty znają Reacta. React jest nadreprezentowany w wagach modeli i to zaczyna decydować o wyborze technologii. Nie podoba mi się ten świat, ale nie mogę powiedzieć, że argument jest błędny.

Trzeci dotyczy standardów. Autor spekuluje, że wysiłki poprawiające ergonomię pisania stron, czyli krótsze skróty w CSS i zwięźlejsza składnia, stracą na wadze wobec rzeczy, które realnie zmieniają możliwości przeglądarki. Agentowi jest w zasadzie obojętne, czy napisze trzy linijki, czy jedną, a nowsza składnia może być nawet trudniejsza, bo trzeba modelowi tłumaczyć rzeczy nieobecne w danych treningowych. Przypomina rozmowę sprzed lat z kimś z zespołu Chrome, kto nie interesował się standardami komponentów webowych, bo te zmieniają tylko sposób pisania kodu, a nie dają przeglądarce nowych możliwości.

Propozycje na przyszłość są trzy i autor sam ocenia je jako coraz mniej pewne. Agenty nadal trzeba edukować w kwestii szerokiego obrazu, bo uwielbiają pisać aplikacje jednostronicowe, a te nie są odpowiedzią na wszystko. Robienie stron dobrze działających dla agentów wraca do fundamentów, o które i tak powinniśmy dbać: renderowanie po stronie serwera, porządna dostępność, szybkość ładowania. I wreszcie doradztwo dla wygenerowanych potworków, bo mnóstwo takiego kodu stanie się kodem nośnym, a wtedy proszenie agenta o naprawę może nie wystarczyć. Autor sam przyznaje, że ten ostatni punkt jest najbardziej chwiejny.

**Key takeaways:**
- Model językowy dał wzorcową odpowiedź na jedno z najtrudniejszych pytań o wydajność CSS
- Kod frontendowy jest oddawany agentom bez nadzoru, bo jest postrzegany jako tani do wymiany
- Doświadczenie agenta zaczyna wygrywać z doświadczeniem dewelopera przy wyborze technologii
- Standardy poprawiające ergonomię tracą na znaczeniu wobec standardów dających nowe możliwości
- Strony dobre dla agentów to po prostu strony z porządnymi fundamentami

**Why do I care:** Nie zgadzam się z całą diagnozą, ale to najbardziej uczciwy tekst o tej sytuacji, jaki czytałem, i przede wszystkim nie udaje, że wie, co będzie dalej. Argument o przechodzeniu na Reacta, bo agenty go znają, wart jest osobnej rozmowy w każdym zespole, bo to nowe kryterium wyboru technologii, którego rok temu nie było w żadnej macierzy decyzyjnej. Osobiście uważam, że autor nie docenia jednej rzeczy: kod frontendowy jest ulotny do momentu, w którym przestaje być, a wtedy koszt braku wiedzy jest liczony w miesiącach. Ale to jest teza, którą trzeba udowodnić, a nie założyć.

**Link:** [The asteroid currently hitting frontend web development](https://nolanlawson.com/2026/08/23/the-asteroid-currently-hitting-frontend-web-development/)

## Wyważanie elementów flexboxa dzięki wartości balance

**TLDR:** Ahmad Shadeed pokazuje pięć sposobów na pozbycie się osamotnionego elementu zawijającego się do nowej linii, po czym demonstruje, że nowa wartość zawijania w flexboksie załatwia to jedną linijką. Przy okazji odkrywa właściwość pozwalającą wymusić minimalną liczbę linii.

**Summary:** Problem zna każdy. Masz kontener z zawijaniem, elementy układają się w linie i nagle ostatni ląduje samotnie w nowym wierszu. Wygląda źle i typowa reakcja to zapytanie o szerokość ekranu, co jest kruchym rozwiązaniem, bo przestaje działać przy pierwszej zmianie treści. Autor pokazuje realny przykład z sekcją zawierającą tytuł i listę ikon serwisów społecznościowych, gdzie użyte rozłożenie przestrzeni między elementami powoduje, że po zawinięciu dwie ikony stoją bardzo daleko od siebie. Nikt tego nie zaprojektował, tak po prostu wyszło.

Potem następuje przegląd obejść i to jest najbardziej wartościowa część tekstu, nawet jeśli za chwilę okaże się niepotrzebna. Pierwsze rozwiązanie używa zapytań o kontener: definiujesz kontener, wyliczasz sumaryczną szerokość elementów wraz z odstępami i przy mniejszych rozmiarach narzucasz maksymalną szerokość, która wymusza ustaloną liczbę elementów w rzędzie. Drugie robi to samo, ale przez funkcję ograniczającą wartość z warunkiem, gdzie mnożenie różnicy przez wielką liczbę działa jak przełącznik. Trzecie dzieli elementy na dwie grupy i przy małych rozmiarach spłaszcza je wartością sprawiającą, że kontener grupy znika z układu. Czwartego autor sam nie poleca, bo opiera się na pseudoelemencie zajmującym całą szerokość i ręcznym ustawianiu kolejności każdego elementu.

Piąte rozwiązanie to jedna linijka: wartość wyważająca zamiast zwykłego zawijania. Wysłana w Chrome sto pięćdziesiątym, więc na razie tylko tam. Kontrast między czterema stronami obejść a jedną deklaracją jest najlepszym argumentem za tym, żeby czasem po prostu poczekać na standard.

Prawdziwe odkrycie przychodzi na końcu. Przy okazji badania wyważonego zawijania autor natknął się na właściwość pozwalającą ustawić minimalną liczbę linii. Możesz wymusić, żeby nawigacja zawsze łamała się na dwa wiersze, nawet jeśli miejsca jest aż nadto. Wcześniej robiło się to przez maksymalną szerokość, ale wtedy traciłeś możliwość ostylowania kontenera, bo tło też się kurczyło. Autor idzie dalej i buduje na tym układ kaskadowy w stylu murowanej ściany, licząc liczbę kolumn z podzielenia szerokości kontenera przez szerokość karty i zaokrąglenia w dół. Uczciwie przy tym zaznacza, że kolejność czytania nie odpowiada kolejności wizualnej, co jest problemem dostępności i dyskwalifikuje ten trik w produkcji.

**Key takeaways:**
- Osamotniony element po zawinięciu to problem, który dotąd wymagał kruchych obejść
- Zapytania o kontener i warunkowe ograniczanie wartości działają wszędzie, ale wymagają znajomości wymiarów z góry
- Wyważone zawijanie załatwia to jedną deklaracją, na razie tylko w Chrome
- Właściwość minimalnej liczby linii pozwala wymusić łamanie bez ograniczania szerokości kontenera
- Układ kaskadowy zbudowany na tej właściwości rozjeżdża kolejność czytania z kolejnością wizualną

**Why do I care:** Wyważone zawijanie to jedna z tych funkcji, które usuwają całą kategorię obejść z systemu designu. Ale najbardziej interesuje mnie właściwość minimalnej liczby linii, bo rozwiązuje problem, którego dotąd nie dało się rozwiązać czysto: nawigacja łamiąca się na dwa wiersze z zachowaniem pełnej szerokości kontenera pod tło. Wcześniej trzeba było dokładać opakowanie i tłumaczyć wszystkim, po co ono jest. Ostrzeżenie autora o kolejności czytania traktuję poważnie i sugeruję ten sam poziom ostrożności: układ kaskadowy zbudowany na kierunku kolumnowym jest ładny w demie i problematyczny dla czytnika ekranu.

**Link:** [Balancing flex items with flex-wrap: balance](https://ishadeed.com/article/flex-wrap-balance/)

## Budowanie akordeonu, który przeglądarka potrafi przeszukać

**TLDR:** Sekcja z pytaniami i odpowiedziami zwija każdą odpowiedź właściwością usuwającą ją z układu. Wszystkie testy przechodzą, obsługa klawiatury działa, a użytkownik naciska skrót wyszukiwania na stronie i nie znajduje niczego. Autor rozkłada na czynniki pierwsze, ile różnych rzeczy znaczy słowo ukryty.

**Summary:** Punkt wyjścia jest bolesny w swojej zwyczajności. Komponent działa, przechodzi każdy test, jaki ktoś napisał, i zawodzi w najbardziej podstawowym scenariuszu: człowiek wie, że fraza jest gdzieś na stronie, wciska skrót wyszukiwania i przeglądarka nie znajduje nic. Fraza siedzi w zwiniętej odpowiedzi usuniętej z układu, a dla wyszukiwarki wbudowanej w przeglądarkę ten tekst po prostu nie istnieje. Test komponentu przechodzi, test przeglądarki oblewa, w tym samym widżecie i na tych samych słowach.

Sedno tekstu to teza, że ukryty nie jest przełącznikiem z dwoma stanami. Element może być ukryty przed układem, przed wzrokiem, przed drzewem dostępności, przed wyszukiwaniem w przeglądarce albo tylko do momentu, aż ktoś zacznie szukać. To są różne kontrakty z różnymi konsekwencjami. Autor buduje z tego tabelę, w której dla każdej techniki sprawdza sześć rzeczy: czy element jest renderowany, czy generuje pudełko, czy da się go znaleźć wyszukiwaniem, czy odsłania się przy przejściu na fragment adresu, czy działa przewijanie do tekstu i czy jest w drzewie dostępności.

Wnioski z tej tabeli są bezlitosne. Usunięcie z układu i logiczny atrybut ukrycia blokują wszystko. Wartość ukrywająca zawartość generuje pudełko, ale poza tym blokuje tyle samo. Dopiero wariant automatyczny i atrybut ukrycia w trybie do znalezienia zachowują wyszukiwanie, odsłanianie i przewijanie do tekstu. Ukrycie wizualne przez przycięcie zostawia element w drzewie dostępności, ale zachowanie wyszukiwania zależy od przeglądarki. Autor dorzuca dwa szczegóły, które gryzą: logiczny atrybut ukrycia równa się usunięciu z układu tylko dlatego, że tak mówi domyślny arkusz przeglądarki, więc własna reguła autora potrafi go anulować. A odwołanie do identyfikatora wskazującego na treść usuniętą z układu nadal ten element wybiera i pseudoklasa celu nadal pasuje, więc precyzyjne zdanie brzmi: nie ma wizualnego odsłonięcia, a nie: fragment nie może go wskazać.

Rozwiązanie natywne opiera się na elemencie rozwijanym z atrybutem nazwy, który daje grupowanie i pojedynczy otwarty element bez ani jednej linii JavaScriptu. Ale autor jest tu uczciwy do bólu i podaje daty: Chrome otwiera zwinięty element przy wyszukiwaniu od wersji dziewięćdziesiątej siódmej, Firefox dopiero od sto trzydziestej dziewiątej, a Safari od dwadzieścia sześć dwa. Na czymkolwiek starszym natywny wariant zachowuje semantykę i grupowanie, ale zwinięta odpowiedź pozostaje nie do znalezienia, czyli dokładnie ta awaria, od której zaczął. Podejście natywne kupuje ci lepsze zachowanie domyślne, nie wehikuł czasu.

Najlepszy fragment dotyczy jednak pracy z agentami. Autor pisze, że model optymalizuje pod widoczne zachowanie i wysyła wersję, która wygląda na skończoną, bo tylko takie kryterium dostał. Ale nazwij kontrakt wprost, poproś o akordeon możliwy do przeszukania, który używa natywnego elementu rozwijanego tam, gdzie pasuje, i odsłania zwiniętą treść wyszukiwarce tam, gdzie nie pasuje, a dostaniesz dokładnie to. Twoja przewaga polega na wiedzy, które kontrakty nazwać i jak przetestować wynik, a ta przewaga rośnie, im lepsze stają się modele.

**Key takeaways:**
- Ukryty to nie jeden przełącznik, tylko sześć różnych kontraktów o różnych konsekwencjach
- Usunięcie z układu wycina treść z wyszukiwania w przeglądarce i z przewijania do tekstu
- Atrybut ukrycia w trybie do znalezienia zachowuje wyszukiwanie i odsłania treść automatycznie
- Logiczny atrybut ukrycia można przypadkiem anulować własną regułą, bo działa przez arkusz przeglądarki
- Natywny element rozwijany otwiera się przy wyszukiwaniu, ale w Firefoksie i Safari dopiero od niedawna
- Przewagą przy pracy z agentem jest wiedza, które kontrakty nazwać w poleceniu

**Why do I care:** To jest dokładnie ten rodzaj wiedzy, o którym pisał Nolan Lawson w tekście wyżej, tylko z przeciwnej strony. Model chętnie napisze ci akordeon i będzie on działał, dopóki nie zapytasz o rzeczy, o które nikt nie pyta. Tabela kontraktów ukrywania to materiał, który powinien wisieć w każdym repozytorium systemu designu, bo wybór między usunięciem z układu a trybem do znalezienia to trzydzieści sekund pracy i różnica w tym, czy twoja sekcja z pytaniami jest w ogóle użyteczna. Zwróć też uwagę na sam pomysł testowania: pytanie brzmi nie czy komponent działa, tylko kto jeszcze powinien dosięgnąć tej treści.

**Link:** [Building an Accordion the Browser Can Search](https://agustinbarrientos.com/writing/senior-eye/searchable-accordions/)

## Proces migracji z Sassa do natywnego CSS

**TLDR:** Krótki, praktyczny przewodnik po wyrzuceniu preprocesora z projektu, z listą jedenastu kroków i wskazaniem pułapek. Główna teza: natywny CSS dogonił Sassa i o ile nie robisz czegoś bardzo specyficznego, preprocesor już nie jest potrzebny.

**Summary:** Autor zaczyna od uczciwego przyznania, że Sass w istniejącym projekcie nie robi żadnej krzywdy. Kompiluje się na etapie budowania, więc nigdy nie zbliża się do przeglądarki i nie ma tu ryzyka bezpieczeństwa, jakie bywa przy innych starzejących się technologiach. Powody wyrzucenia są więc bardziej higieniczne niż palące: mieszanka zmiennych CSS i zmiennych Sassa jest myląca i prowadzi do duplikacji, każdy plik źródłowy generuje kolejny plik wynikowy do utrzymania i kopiowania przy wdrożeniu, budowanie jest odrobinę szybsze, znika zależność od kompilatora, a nowi ludzie mają o jedną rzecz mniej do nauczenia.

Sama lista kroków jest solidnym materiałem operacyjnym. Znajdź wszystkie pliki źródłowe. Znajdź faktycznie sassowe konstrukcje, czyli miksiny i nazwane funkcje jak rozjaśnianie koloru, i zastąp je funkcjami CSS albo po prostu skompilowanymi wartościami skopiowanymi z wygenerowanych plików. Znajdź komentarze w składni dwóch ukośników, bo natywny CSS ich nie zna, a przeoczony taki komentarz sprawi, że reguły po nim przestaną być parsowane. To jest właśnie ta pułapka, która kosztuje najwięcej czasu, bo nic nie krzyczy, po prostu część stylów przestaje działać.

Dalej idzie usuwanie wygenerowanych plików, przy czym autor ostrzega, żeby nie skasować przy okazji plików pisanych ręcznie, jeśli technologie były mieszane. Potem zmiana rozszerzeń, aktualizacja odwołań w znacznikach i konfiguracji komponentów, sprawdzenie plików projektu przy platformach, które kontrolują kopiowanie zasobów przy wdrożeniu, przebudowanie i testowanie. Przy testowaniu pada zdanie, które warto podkreślić: jedna brakująca reguła potrafi zawieść po cichu i być bardzo subtelna do wychwycenia, więc zaplanuj czas i zaangażuj jak najwięcej par oczu.

Najciekawszy technicznie jest fragment o importach. Sass pozwalał trzymać style w wielu małych plikach cząstkowych, które kompilowały się do jednego dużego, więc przeglądarka pobierała jeden plik jednym żądaniem. W natywnym CSS import działa w czasie wykonania i wywołuje kolejne żądanie, a te muszą iść po kolei. Autor proponuje zamiast tego po prostu wiele małych plików podpiętych osobno, argumentując, że od protokołu HTTP w wersji drugiej liczba żądań nie jest ograniczeniem, a wiele małych równoległych pobrań jest szybsze niż jedno długie. Zgadzam się z kierunkiem, ale zaznaczyłbym, że to zależy od tego, ile tych plików i jak duże, bo każde żądanie ma swój narzut, a odblokowanie renderowania wymaga pobrania wszystkich.

**Key takeaways:**
- Natywny CSS ma dziś zmienne, zagnieżdżanie i funkcje, więc preprocesor przestał być konieczny
- Komentarze w składni dwóch ukośników to najgroźniejsza pułapka, bo psują parsowanie po cichu
- Miksiny i nazwane funkcje kolorów trzeba zastąpić ręcznie albo wkleić skompilowane wartości
- Import w natywnym CSS działa w czasie wykonania i wywołuje sekwencyjne żądania
- Wiele małych plików podpiętych równolegle bywa szybsze niż jeden duży, ale warto to zmierzyć

**Why do I care:** Migracja z preprocesora to jedno z tych zadań, które łatwo oddać agentowi i łatwo przy tym stracić styl, którego nikt nie zauważy przez pół roku. Lista kroków z tego tekstu jest dobrym materiałem na polecenie dla modelu i jednocześnie na listę kontrolną do przeglądu wyniku. Osobiście najbardziej cenię argument o mieszance dwóch systemów zmiennych, bo to realny koszt poznawczy w każdym projekcie, który przez to przechodził. Zmienne Sassa znikają w czasie budowania, zmienne CSS żyją w przeglądarce i można je zmieniać dynamicznie, a trzymanie obu obok siebie prowadzi do pytania, którego użyć, na które nikt nie ma dobrej odpowiedzi.

**Link:** [The process of migrating from Sass to native CSS](https://chrissmith.xyz/blog/2026/the-process-of-migrating-from-sass-to-native-css/)

## Przyszłość CSS: selektor prefiksu klas

**TLDR:** Grupa robocza CSS uzgodniła nowy selektor pozwalający trafić we wszystkie klasy zaczynające się od danego prefiksu oddzielonego myślnikiem. Zastąpi to zarówno dokładanie klasy bazowej do znaczników, jak i wolne selektory atrybutów. Na razie istnieje wyłącznie w tekście specyfikacji.

**Summary:** Problem jest codzienny. Masz klasy przycisków z prefiksem i chcesz nadać im wszystkim wspólny styl. Dziś masz dwa wyjścia i oba są kiepskie. Albo wypisujesz je wszystkie w selektorze, albo dodajesz osobną klasę bazową do każdego elementu w znacznikach, czyli powiększasz przesyłany dokument. Trzecia droga, czyli selektor atrybutu dopasowujący podciąg, działa, ale jest wolna, i tekst podaje na to liczby: zwykły selektor klasy przekracza sześć tysięcy dopasowań na sekundę, a wariant z podciągiem spada do trzystu dwudziestu ośmiu. To dwadzieścia razy wolniej i trzy milisekundy z budżetu klatki tylko na dopasowanie.

Nowa składnia to prefiks zakończony myślnikiem i gwiazdką. Tyle. Autor podkreśla, że to duża wygrana dla klas narzędziowych i systemów designu, bo pozwala trafiać w grupy powiązanych elementów bez rozdymania dokumentu ani pisania kruchych selektorów atrybutów.

Kilka detali projektowych warto znać, bo pokazują, jak myśli grupa robocza. Selektor nie dopasuje samego prefiksu z myślnikiem na końcu i niczym po nim, ani prefiksu z podwójnym myślnikiem. Dopasowanie ograniczono do prefiksów oddzielonych myślnikiem, przynajmniej na początek, a inne separatory mogą dojść później na życzenie autorów. Dowolne prefiksy bez separatora zostały odrzucone z dwóch powodów. Po pierwsze łatwo o przypadkowe nadmierne dopasowanie, bo prefiks bez separatora trafiłby też w słowa go zawierające. Po drugie wydajność: przeglądarki tworzą kubełki dla selektorów klas, żeby szybko dopasowywać, a dowolne symbole wieloznaczne całkowicie niszczą tę optymalizację. Przy myślniku jako separatorze przeglądarka może przygotować dodatkowe kubełki już przy parsowaniu dokumentu, na długo zanim w ogóle zacznie parsować CSS.

Osobna sekcja odpowiada na pytanie, dlaczego nie użyć istniejącego operatora dopasowania z myślnikiem w selektorach atrybutów. Powody są trzy i wszystkie dobre. Ten operator powstał dla atrybutów językowych i z założenia dopasowuje też samą wartość bez myślnika, co przy klasach narzędziowych jest pułapką, bo styl grupy przeciekłby na samodzielną klasę bazową. Operator sprawdza wartość tylko od początku łańcucha atrybutu, więc element z wieloma klasami, gdzie ta interesująca nie jest pierwsza, w ogóle by nie pasował. No i znowu wydajność. Najważniejszy argument jest jednak strategiczny: trwa większy wysiłek standaryzacji symboli wieloznacznych w całym CSS, a wybrana składnia da się później rozszerzyć na nazwy atrybutów i nazwy elementów niestandardowych, czego operator działający tylko na wartościach atrybutów nigdy nie umożliwi.

**Key takeaways:**
- Nowy selektor trafia we wszystkie klasy o wspólnym prefiksie oddzielonym myślnikiem
- Selektor atrybutu dopasowujący podciąg jest około dwudziestu razy wolniejszy od zwykłego selektora klasy
- Myślnik jako obowiązkowy separator pozwala przeglądarce kubełkować klasy przy parsowaniu dokumentu
- Wybrana składnia jest częścią większego planu symboli wieloznacznych w całym CSS
- Wsparcie w przeglądarkach jest zerowe i może minąć kilka lat, ale wykrywanie funkcji już działa

**Why do I care:** Liczby o wydajności selektorów atrybutów to najcenniejsza część tego tekstu i są użyteczne od dziś, niezależnie od losów nowej składni. Jeśli masz w systemie designu selektory dopasowujące podciąg klasy, właśnie dostałeś argument, żeby je usunąć, poparty pomiarem. Sam selektor prefiksu jest miły, ale realnie zobaczymy go w produkcji za lata, więc traktuję to jako sygnał kierunku, a nie plan na najbliższy kwartał. Ciekawszy jest szerszy wątek symboli wieloznacznych obejmujących także nazwy elementów niestandardowych, bo to by realnie ułatwiło stylowanie bibliotek komponentów.

**Link:** [The Future of CSS: Target Multiple Classes with the Class Prefix Selector](https://www.bram.us/2026/08/20/the-future-of-css-target-multiple-classes-with-the-class-prefix-selector/)

## Niesłyszalne dźwięki do odciskania palców przeglądarek

**TLDR:** Badacz przyłapał dużą platformę zakupową na używaniu techniki identyfikowania przeglądarek przez różnice w generowaniu dźwięku. Technika jest przestarzała i już nie działa w głównych przeglądarkach, ale przy okazji wyszło na jaw kilkanaście innych metod śledzenia stosowanych równolegle.

**Summary:** Mechanizm był kiedyś sprytny. Biblioteki matematyczne używane przy generowaniu dźwięku w przeglądarce różniły się na tyle między systemami, że w połączeniu z modelem procesora i innymi różnicami dawały ogromną liczbę unikalnych sygnatur. Kiedy technika stała się powszechnie znana, Firefox wprowadził poprawkę w wersji sto osiemnastej z dwa tysiące dwudziestego trzeciego roku: przeglądarka zaczęła używać własnych bibliotek matematycznych zamiast tych z systemu operacyjnego. Deweloper Firefoksa cytowany w tekście mówi wprost, że przejście na stałe biblioteki obniżyło entropię na tyle, że technika przestała działać. Chrome jest odporny z tego samego powodu, a Safari prawdopodobnie też.

Ciekawsze jest pytanie, po co ktoś nadal używa przestarzałej metody. Odpowiedź prawdopodobnie brzmi: bo to tylko jedna z kilkunastu, a nikt nie zauważył, że przestała działać. Lista pozostałych jest długa i uczciwie przypomina, jak dużo powierzchni oddaje przeglądarka. Renderowanie na płótnie i zamiana go na dane, informacje o sterowniku grafiki wraz z rozszerzeniami i precyzją obliczeń w cieniowaniu, wyjście oscylatora i analizatora dźwięku, wymiary ekranu i okna, stosunek pikseli urządzenia, liczba rdzeni i ilość pamięci, zainstalowane wtyczki, obsługiwane formaty dźwięku i wideo, zachowanie połączeń bezpośrednich, pomiary czasu wykonania, zdarzenia myszy, dotyku, skupienia i przewijania, ruch i orientacja urządzenia, a na koniec właściwości typowo kojarzone z automatyzacją przeglądarki.

Tekst kończy się trzeźwo. Twórcy przeglądarek podjęli kroki, ale nie wiadomo, jak skuteczne są pozostałe metody, i jest niemal pewne, że tysiące stron stosuje podobne zestawy. To wyścig, w którym twórcy przeglądarek i wydawcy stron nieustannie się gonią.

**Key takeaways:**
- Odciskanie palców przez generowanie dźwięku przestało działać, gdy przeglądarki zaczęły używać własnych bibliotek matematycznych
- Duża platforma zakupowa stosowała tę technikę wraz z kilkunastoma innymi metodami jednocześnie
- Lista metod obejmuje płótno, sterownik grafiki, dźwięk, czujniki ruchu i pomiary czasu wykonania
- Wykrywanie właściwości kojarzonych z automatyzacją przeglądarki jest częścią tego samego zestawu
- Obniżanie entropii przez ujednolicanie zachowań to jedyna skuteczna obrona po stronie przeglądarki

**Why do I care:** Dwie rzeczy zapisuję z tego tekstu do własnej praktyki. Pierwsza: jeśli twoja aplikacja pobiera bibliotekę analityczną od zewnętrznego dostawcy, prawdopodobnie robisz część z tych rzeczy i nie wiesz o tym, a odpowiedzialność prawna za zgodę użytkownika spada na ciebie. Warto raz na jakiś czas obejrzeć, co ten skrypt naprawdę robi. Druga: wykrywanie właściwości kojarzonych z automatyzacją jest na tej liście, co znaczy, że te same mechanizmy będą używane przeciwko agentom przeglądarkowym z pierwszego tekstu w tym wydaniu. Wyścig zbrojeń wokół botów i śledzenia to od dziś ten sam wyścig.

**Link:** [Inaudible sounds used to fingerprint browsers catch AliExpress red-handed](https://arstechnica.com/security/2026/08/aliexpress-caught-fingerprinting-visitors-after-sending-inaudible-sounds-to-browsers/)
