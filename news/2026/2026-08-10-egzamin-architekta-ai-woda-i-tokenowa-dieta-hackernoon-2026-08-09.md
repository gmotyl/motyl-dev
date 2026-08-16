---
title: "Egzamin architekta AI, woda dla centrów danych i tokenowa dieta od Netflixa"
excerpt: "Przegląd najciekawszych tekstów z HackerNoon z 9 sierpnia 2026: certyfikacja architektów AI, prawdziwy koszt wody i energii dla AI oraz stare i nowe wzorce architektury systemów."
publishedAt: "2026-08-09"
slug: "egzamin-architekta-ai-woda-i-tokenowa-dieta-hackernoon-2026-08-09"
hashtags: "#hackernoon #tech #programming #ai #architektura #inzynieria #generated #pl"
source_pattern: "HackerNoon"
---

## Jak zdobyć 996 punktów na egzaminie architekta Claude i czego to naprawdę uczy

**TLDR:** Autor tekstu zdał egzamin Claude Certified Architect Professional od Anthropic na 996 punktów, czyli sto procent we wszystkich siedmiu domenach. Opisuje, że test nie sprawdza pamięciowej wiedzy o promptach, a sposobu myślenia o systemach produkcyjnych opartych na AI.

**Summary:** Egzamin trwa sto dwadzieścia minut i składa się z sześćdziesięciu trzech pytań, więc na każde wypada mniej więcej dwie minuty, a podejście kosztuje sto siedemdziesiąt pięć dolarów przez Partner Academy Anthropica. To już samo w sobie mówi, jaką rolę Anthropic chce przypisać tej certyfikacji. Nie jest to quiz z dokumentacji, jest to próba wymuszenia konkretnego nawyku myślowego u ludzi, którzy mają projektować systemy oparte na dużych modelach językowych w środowisku produkcyjnym.

Najciężejszą domeną jest integracja, i to nie jest przypadek, bo to właśnie na styku systemów produkcyjne wdrożenia AI najczęściej się psują. Egzamin bada, czy kandydat umie rozpoznać granicę zaufania między modelem a resztą infrastruktury, czy wie kiedy sięgnąć po Skill, kiedy po serwer MCP, a kiedy po zwykłe bezpośrednie wywołanie API, oraz czy rozumie, że każda treść pochodząca z retrievalu powinna być traktowana jako dane niezaufane, dopóki nie zostanie zweryfikowana. To bardzo konkretna, inżynierska lekcja, a nie filozofia promptowania.

Zasada, którą autor wyciąga z całego doświadczenia, brzmi: naprawiaj przyczynę, nie objaw, i nigdy nie usuwaj ludzkiego osądu z miejsc, w których jest on niezbędny. To zdanie jest zaskakująco trzeźwe na tle całej fali marketingu "autonomicznych agentów", bo przypomina, że architekt systemu AI wciąż odpowiada za to, gdzie kończy się automatyzacja i zaczyna nadzór człowieka.

Osobiście mam mieszane uczucia co do certyfikacji od producenta modelu. Anthropic ma oczywisty interes w tym, żeby architekci myśleli w kategoriach, które premiują ich produkty, więc traktowałbym taki certyfikat jako dobry poligon do przemyślenia sobie granic systemu, a nie jako dowód kompetencji uniwersalnych. Sam fakt, że egzamin każe rozróżniać Skill od MCP od bezpośredniego API, to w praktyce uczenie się słownika jednego dostawcy, nie architektury w ogóle.

**Key takeaways:**
- Egzamin sprawdza myślenie architektoniczne, nie znajomość promptów, i kładzie największy nacisk na integrację systemów
- Zasada "naprawiaj przyczynę, nie objaw" i utrzymywanie ludzkiego nadzoru w krytycznych miejscach to sedno filozofii testu
- Certyfikacja jest silnie związana ze słownikiem i produktami jednego dostawcy, co warto mieć na uwadze przy jej wycenie na rynku pracy

**Why do I care:** Jako ktoś, kto projektuje systemy produkcyjne od lat, patrzę na takie certyfikaty z dużą dozą podejrzliwości, ale doceniam, że ten konkretny egzamin każe kandydatowi myśleć o granicach zaufania i o tym, gdzie musi zostać człowiek z realną decyzją. To jest różnica między architektem a osobą, która potrafi tylko poskładać demo z gotowych klocków, i szkoda, że rynek wciąż tego nie odróżnia.

**Link:** [I Scored a Perfect 996 on Anthropic's Claude Certified Architect Professional Exam](https://hackernoon.com/i-scored-a-perfect-996-on-anthropics-claude-certified-architect-professional-exam)

## Problem wody dla AI jest mniejszy niż myślisz, ale problem samej wody jest dużo większy

**TLDR:** Popularne szacunki zużycia wody przez AI były przesadzone, bo nowszy sprzęt i lepiej zmierzone instalacje pokazują zużycie na poziomie kilku, nie kilkuset mililitrów na jedno zapytanie. Realny problem nie leży w globalnych liczbach, a w tym, że jedno centrum danych potrafi wyssać zasoby lokalnego zbiornika wody dużo szybciej niż całe otaczające je miasto.

**Summary:** Wczesne modelowanie zakładało, że sto słów odpowiedzi AI kosztuje pięćset dziewiętnaście mililitrów wody, co brzmiało dramatycznie i dobrze się klikało w nagłówkach. Nowsze pomiary z lepiej zinstrumentowanych obiektów i na nowszym sprzęcie pokazują liczby bliższe pięciu do piętnastu mililitrów na jedno zapytanie, a prognozy na 2030 rok mówią, że centra danych w Stanach Zjednoczonych odpowiadałyby za zaledwie 0,6 do 1,1 procent publicznego poboru wody. To zupełnie inny obrazek niż ten, który krążył w mediach społecznościowych przez ostatnie dwa lata.

Prawdziwy problem, jak przekonuje autor, jest bardziej lokalny i bardziej dotyczy infrastruktury wodnej niż samego AI. Centrum danych nie jest po prostu dużym klientem wodociągów, bo w przeliczeniu na dostarczony galon wody wyciąga ją z lokalnego zlewiska około sześć razy szybciej niż otaczające je miasto. Niektóre planowane obiekty deklarowały szczytowe zapotrzebowanie na poziomie ośmiu milionów galonów dziennie, skoncentrowane na jednym konkretnym wodonośnym poziomie, w jednej konkretnej gminie, a koszt budowy kolejnego zbiornika retencyjnego rozkłada się na wszystkich płacących za wodę w okolicy, niezależnie od tego, czy korzystają z AI, czy nie.

Autor proponuje rozwiązania, które brzmią sensownie na papierze: skoro duża część obciążeń AI jest odporna na opóźnienia, harmonogramy zadań mogłyby traktować stres wodny zlewiska jako pełnoprawną zmienną i przesuwać najbardziej "spragnione" zadania w miejsca i godziny, gdzie wody jest więcej albo jest chłodniej. Wspomina też technologie odzysku wody z powietrza testowane na pustyni Death Valley, które w połączeniu z panelem słonecznym dają ponad pięć litrów wody dziennie. To ciekawe, ale trzeba pamiętać, że są to technologie niszowe, a nie coś, co dziś skaluje się na poziomie hiperskalerów.

Trochę mnie bawi, że ten tekst w praktyce mówi: paniczne nagłówki o AI wysuszającym planetę były złym uproszczeniem, ale prawdziwy problem, czyli lokalna presja na zasoby wodne, jest równie realny, tylko mniej fotogeniczny. To jest dokładnie ten typ historii, gdzie trzeba zignorować nagłówek i przeczytać liczby, zanim wyrobi się sobie opinię.

**Key takeaways:**
- Nowsze pomiary zużycia wody przez AI są dziesiątki razy niższe niż wczesne, medialne szacunki
- Prawdziwy problem to koncentracja poboru wody w jednym miejscu, nie globalna suma zużycia
- Harmonogramowanie obciążeń AI względem stresu wodnego zlewiska to rozwiązanie inżynieryjne, które można wdrożyć już teraz

**Why do I care:** Jako inżynier lubię, gdy ktoś bierze popularny alarmistyczny nagłówek i sprawdza go liczbami, bo w branży AI mamy epidemię twierdzeń bez źródeł w obu kierunkach, tak samo od entuzjastów jak od krytyków. Ten tekst nie zwalnia AI z odpowiedzialności za zużycie zasobów, tylko przenosi dyskusję z abstrakcyjnych bilansów globalnych na konkretne decyzje lokalizacyjne, i to jest dokładnie poziom, na którym powinni myśleć ludzie odpowiedzialni za infrastrukturę.

**Link:** [AI's Water Problem Is Smaller Than You Think](https://hackernoon.com/ais-water-problem-is-smaller-than-you-think)

## Inżynier z Netflixa zbudował darmowe narzędzie, które obcina rachunek za tokeny AI o 88 procent

**TLDR:** Tejas Chopra, starszy inżynier Netflixa, opublikował Headroom, otwartoźródłową warstwę kompresji kontekstu, która potrafi zmniejszyć liczbę tokenów wysyłanych do modelu o 60 do 95 procent bez utraty dokładności. Narzędzie od stycznia 2026 zebrało już trzydzieści dziewięć tysięcy gwiazdek na GitHubie w ciągu pięciu miesięcy.

**Summary:** Idea Headroom jest prosta i dlatego skuteczna: zanim jakikolwiek tekst trafi do modelu, warstwa kompresji wycina z niego szum, czyli powtarzalne fragmenty, nieistotne dla zapytania dane i strukturę, która nie niesie informacji potrzebnej modelowi. Zamiast liczyć na to, że model sam zignoruje zbędne tokeny, Headroom robi to wcześniej, więc oszczędność jest realna i mierzalna w rachunku za API, nie tylko w teorii.

Narzędzie korzysta z sześciu różnych silników kompresji naraz, w tym redukcji kodu opartej na drzewie składniowym AST, optymalizacji struktur JSON oraz modelu opartego na HuggingFace do "ściskania" zwykłego tekstu prozy. To połączenie różnych technik dla różnych typów danych ma sens, bo log serwera, plik JSON i akapit dokumentacji mają zupełnie inną strukturę redundancji, i jeden uniwersalny kompresor nigdy nie poradziłby sobie z każdym z nich równie dobrze. Przykład podany w materiałach to plik logów liczący dziesięć tysięcy linii, który po kompresji chudnie o osiemdziesiąt osiem procent, i to najlepiej pokazuje, gdzie Headroom sprawdza się najbardziej, czyli na treściach nietekstowych i wysoce ustrukturyzowanych.

Chopra wydał projekt na licencji Apache 2.0, co jest ważne, bo oznacza brak barier prawnych do wdrożenia w komercyjnym kodzie, w tym w narzędziach wewnętrznych firm, które i tak płacą grube pieniądze za tokeny w swoich agentach kodujących. Sukces w postaci trzydziestu dziewięciu tysięcy gwiazdek w pięć miesięcy to sygnał, że problem kosztu kontekstu jest dziś bardziej palący dla zespołów niż problem samej jakości modelu.

To jest dokładnie ten typ narzędzia, którego branża potrzebowała, zamiast kolejnego wrappera na API modelu. Kompresja kontekstu to niewdzięczna, "brudna" robota inżynierska, a nie efektowna demo na konferencji, i to prawdopodobnie tłumaczy, czemu dopiero teraz, po dwóch latach szału na duże modele, ktoś usiadł i policzył, ile tokenów faktycznie idzie na czysty szum.

**Key takeaways:**
- Headroom kompresuje kontekst przed wysłaniem do modelu i redukuje liczbę tokenów o 60 do 95 procent
- Sześć silników kompresji, w tym AST dla kodu i model HuggingFace dla prozy, adresuje różne typy danych osobno
- Licencja Apache 2.0 i szybki wzrost popularności na GitHubie wskazują na realny, nie tylko demonstracyjny, problem kosztu tokenów

**Why do I care:** Każdy, kto płacił rachunek za API modelu językowego dla realnego produktu, wie, że koszt kontekstu, a nie koszt samej generacji, jest tym, co najbardziej rośnie w miarę skalowania. Narzędzia jak Headroom są dla mnie ciekawsze niż kolejny framework agentowy, bo atakują problem, który boli już dziś, na produkcji, a nie problem, który być może będzie bolał, gdy w końcu zbudujemy w pełni autonomicznego agenta.

**Link:** [A Netflix Engineer Built a Free Tool That Cuts Your AI Token Bill by 88%](https://hackernoon.com/a-netflix-engineer-built-a-free-tool-that-cuts-your-ai-token-bill-by-88percent)

## Najprostsza droga do wdrożenia otwartych modeli na produkcję w 2026 roku

**TLDR:** Artykuł porównuje trzy ścieżki uruchamiania otwartych modeli językowych na produkcji: samodzielne stawianie infrastruktury na vLLM czy SGLang, korzystanie z płatnych API zarządzanych przez zewnętrznego dostawcę oraz samodzielnie hostowany, wielomodelowy serwer inferencji typu SIE. Autor stawia realistyczne liczby po stronie kosztów, które szybko wyprowadzają z równania marketingowe hasło "otwarte modele są darmowe".

**Summary:** Pierwsza ścieżka, klasyczne DIY, to postawienie surowego vLLM, TEI albo SGLang i samodzielne okablowanie wszystkiego, od routingu zapytań po monitoring i autoskalowanie. To droga dla zespołów, które mają czas i ludzi, żeby traktować serwowanie modeli jako osobny produkt wewnętrzny, a nie jak konfigurację jednej biblioteki. Druga ścieżka to zarządzane API, gdzie ktoś inny hostuje model, a płaci się za zużyte tokeny, co eliminuje pracę operacyjną, ale w zamian oddaje kontrolę nad kosztem jednostkowym i czasem także nad danymi.

Trzecia droga, którą autor uznaje za najbardziej opłacalną dla flot mniejszych modeli wspierających agenta, to samodzielnie hostowany serwer wielomodelowy typu SIE, czyli Superlinked Inference Engine, który od razu przychodzi z gotowym stosem produkcyjnym: routingiem, autoskalowaniem, monitoringiem i wsparciem dla wdrożenia w chmurze. Zamiast składać wszystko z osobnych klocków, dostaje się jeden komponent, który już wie, jak obsłużyć wiele modeli naraz i jak reagować na obciążenie.

Liczby przywołane w tekście są chyba najbardziej wartościowym elementem całego materiału. Otwarte modele są zwykle tańsze w większej skali, z szacunkami oszczędności na poziomie pięćdziesięciu do siedemdziesięciu pięciu procent w 2026 roku, ale realistyczny, minimalny samodzielnie hostowany wdrożenie generatywne kosztuje od stu dwudziestu pięciu do stu dziewięćdziesięciu tysięcy dolarów rocznie, gdy wliczy się personel infrastrukturalny i inżynierię utrzymania dostępności. To jest dokładnie ten rodzaj liczby, który powinien trafiać do każdego zarządu rozważającego "przejście na open source, bo to tańsze".

Podejrzewam, że wiele zespołów wybiera zarządzane API właśnie dlatego, że nikt im nie powiedział wcześniej o tej drugiej liczbie, stu dwudziestu pięciu tysiącach dolarów rocznie jako progu wejścia. Otwarte modele nie są darmowe, są tylko przesunięciem kosztu z linii "opłaty za token" na linię "pensje inżynierów platformowych", i dopiero przy odpowiedniej skali to przesunięcie zaczyna się opłacać.

**Key takeaways:**
- Trzy ścieżki wdrożenia otwartych modeli to DIY na vLLM lub SGLang, zarządzane API oraz samodzielnie hostowany serwer wielomodelowy typu SIE
- Realistyczny koszt minimalnego samodzielnie hostowanego wdrożenia sięga stu dwudziestu pięciu do stu dziewięćdziesięciu tysięcy dolarów rocznie
- Otwarte modele stają się tańsze głównie przy większej skali, nie od pierwszego dnia wdrożenia

**Why do I care:** Widziałem już kilka projektów, które rzuciły się na "darmowe" otwarte modele, żeby po kwartale odkryć, że koszt utrzymania własnej infrastruktury inferencji przewyższył to, co płaciliby za API OpenAI czy Anthropica. Ten artykuł jest dobrym antidotum na takie decyzje podejmowane bez policzenia total cost of ownership, i każdy architekt, który dostaje zadanie "przenieśmy się na open source", powinien najpierw przeczytać akapit o stu dwudziestu pięciu tysiącach dolarów rocznie.

**Link:** [Easiest Way to Deploy Open-Source Models to Production in 2026](https://hackernoon.com/easiest-way-to-deploy-open-source-models-to-production-in-2026)

## Rewolucja w chłodzeniu, która może uratować ocieplający się świat

**TLDR:** Globalna moc chłodnicza ma wzrosnąć ponad trzykrotnie, z dwudziestu dwóch terawatów w 2022 roku do nawet pięćdziesięciu ośmiu terawatów w 2050, a bez zmian emisje z samego chłodzenia mogłyby przekroczyć siedem miliardów ton CO2 rocznie. Autor przedstawia trójwarstwową strategię, chłodzenie pasywne, niskoenergetyczne wspomaganie i sprzęt o wyższej efektywności, jako realną drogę do uniknięcia tego scenariusza.

**Summary:** Punktem wyjścia jest liczba, która powinna niepokoić każdego, kto myśli o klimacie w horyzoncie dłuższym niż kwartał: globalna moc chłodnicza rośnie z dwudziestu dwóch do potencjalnie pięćdziesięciu ośmiu terawatów do 2050 roku, a towarzyszące jej emisje mogłyby wzrosnąć z 4,1 do ponad siedmiu miliardów ton ekwiwalentu CO2 rocznie. To samodzielnie wystarczyłoby, żeby zepsuć cele porozumienia paryskiego, niezależnie od postępów w innych sektorach.

Pierwsza warstwa proponowanej strategii to chłodzenie pasywne, czyli refleksyjne dachy, drzewa dające cień, miejskie parki i zbiorniki wodne, naturalna wentylacja i lepsze przeszklenia. Autor podaje, że te środki mogą obniżyć temperaturę wewnątrz budynków o sześć do dziewięciu stopni Celsjusza, co w klimacie umiarkowanym i tropikalnym często całkowicie eliminuje potrzebę klimatyzacji mechanicznej, a tam gdzie klimatyzacja wciąż jest potrzebna, obcina zużycie energii o piętnaście do pięćdziesięciu pięciu procent.

Druga warstwa to niskoenergetyczne wspomaganie, na przykład inteligentny wentylator sufitowy działający razem z klimatyzacją, co pozwala ustawić termostat wyżej, bo ruch powietrza sprawia, że ciepłe pomieszczenie odczuwane jest jako chłodniejsze na skórze, obcinając zużycie energii klimatyzacji o trzydzieści procent lub więcej. Trzecia warstwa to sprzęt o wyższej efektywności, gdzie same zmiany czynnika chłodniczego mogłyby zdjąć do 0,4 stopnia Celsjusza z globalnego ocieplenia w tym stuleciu, co brzmi jak mało, ale w skali globalnego budżetu węglowego jest bardzo dużo.

Strona finansowa też jest przekonująca: UNEP szacuje, że zrównoważona ścieżka dostarczyłaby siedemnaście bilionów dolarów skumulowanych oszczędności energetycznych i pozwoliłaby uniknąć do dwudziestu sześciu bilionów dolarów kosztów budowy nowej infrastruktury sieciowej do 2050 roku. Zestawione z wcześniejszym artykułem o wodzie dla centrów danych, ten tekst dobrze pokazuje wzorzec: infrastruktura fizyczna pod cyfrową gospodarkę, czy to serwery, czy klimatyzacja, jest dziś twardym ograniczeniem, o którym branża IT wygodnie zapomina, dopóki nie musi płacić rachunku.

**Key takeaways:**
- Globalna moc chłodnicza może wzrosnąć ponad trzykrotnie do 2050 roku, z odpowiadającym wzrostem emisji
- Chłodzenie pasywne, wspomaganie niskoenergetyczne i efektywniejszy sprzęt razem mogą znacząco ograniczyć zapotrzebowanie na energię
- Oszczędności finansowe ze zrównoważonej ścieżki liczone są w bilionach dolarów do 2050 roku

**Why do I care:** Ten tekst nie jest o kodzie, ale powinien interesować każdego, kto projektuje infrastrukturę dla systemów AI, bo chłodzenie centrów danych i chłodzenie budynków to dwie strony tej samej monety energetycznej, którą płaci cała branża technologiczna. Traktowanie tych kosztów jako "problem kogoś innego" jest wygodne tylko do momentu, aż trafi do rachunku za energię w kolejnym kontrakcie na kolokację.

**Link:** [The Cooling Revolution That Could Save a Warming World](https://hackernoon.com/the-cooling-revolution-that-could-save-a-warming-world)

## Co się dzieje z twoją platformą inżynierską, gdy AI podnosi poprzeczkę

**TLDR:** Tekst inDrive argumentuje, że gdy AI zmienia to, co pojedynczy inżynier jest w stanie zrobić, cała organizacja musi przeprojektować otoczenie wokół jego pracy, od rekrutacji przez szkolenia po uprawnienia i mechanizmy kontrolne. Skuteczne korzystanie z modelu językowego staje się częścią bazowych kompetencji inżynierskich, nie dodatkiem.

**Summary:** Główna teza jest prosta, ale ma daleko idące konsekwencje: jeśli model ogólnego przeznaczenia może odtworzyć to, co proces rekrutacyjny traktował jako sygnał seniorskiej kompetencji, na przykład szybkie napisanie poprawnego kodu w znanym wzorcu, to ten sygnał przestaje być wystarczający do oceny kandydata. Autor przekonuje, że firmy muszą przeprojektować całą platformę inżynierską, czyli rozmowy kwalifikacyjne, onboarding, procesy pracy, dostęp do narzędzi, kontekst dostarczany zespołom, sposób ewaluacji wyników i mechanizmy zabezpieczające, zamiast udawać, że stara definicja "dobrego inżyniera" wciąż działa.

Umiejętność efektywnego korzystania z modelu językowego opisana jest jako część bazowej kompetencji inżynierskiej, obejmująca dobre zdefiniowanie problemu, rozpoznanie, kiedy odpowiedź modelu jest słaba, i pozostanie odpowiedzialnym za to, co się dzieje, gdy wynik trafia na produkcję. To ostatnie jest chyba najważniejszym fragmentem całego tekstu, bo znowu wraca temat odpowiedzialności człowieka, tak samo jak w artykule o egzaminie architekta Claude.

Rola platformy inżynierskiej, według autora, nie polega na tym, żeby pomagać zespołom nadgonić po przesunięciu poprzeczki, ale na tym, żeby nową poprzeczkę uczynić bezpieczną, użyteczną i powtarzalną. To rozróżnienie jest subtelne, ale ważne: reaktywne łatanie procesów po fakcie różni się od zaprojektowania systemu, który z góry zakłada, że baseline będzie się przesuwał dalej, i regularnie.

Autor kończy przypomnieniem, że transformacja AI w organizacji inżynierskiej jest procesem ciągłym, nie jednorazowym projektem z datą zakończenia, i że organizacje muszą utrzymać odpowiedzialność oraz osąd ludzki przy integrowaniu AI w codzienną pracę. Zgadzam się z tym kierunkiem myślenia, choć chciałbym zobaczyć w tekście więcej konkretów, bo "przeprojektuj platformę" jest łatwe do powiedzenia i bardzo trudne do wykonania bez rozbicia na konkretne decyzje o narzędziach i uprawnieniach.

**Key takeaways:**
- Umiejętność efektywnej pracy z modelem językowym staje się częścią bazowej kompetencji inżynierskiej, nie dodatkową umiejętnością
- Cała platforma inżynierska, od rekrutacji do uprawnień, musi być przeprojektowana, gdy stare sygnały kompetencji przestają działać
- Transformacja AI w organizacji jest procesem ciągłym, a nie jednorazowym projektem z datą końcową

**Why do I care:** Rozmowy kwalifikacyjne, które wciąż sprawdzają umiejętność odwrócenia listy bez podglądania dokumentacji, są dziś groteskowe, bo model językowy robi to lepiej i szybciej niż większość kandydatów. Zgadzam się, że trzeba przeprojektować sygnały kompetencji, ale ostrzegałbym przed pułapką odwrotną, czyli oceną kandydata wyłącznie na podstawie tego, jak dobrze prowadzi model za rączkę, bo to też jest umiejętność, która się zdewaluuje, gdy modele staną się jeszcze lepsze w rozumieniu intencji.

**Link:** [What Happens to Your Engineering Platform When AI Raises the Baseline](https://hackernoon.com/what-happens-to-your-engineering-platform-when-ai-raises-the-baseline)

## Architektura AMPED, trwały wzorzec efektywnych serwerów WWW z 1999 roku

**TLDR:** Artykuł przypomina pracę naukową "Flash: An Efficient and Portable Web Server" z 1999 roku, która wprowadziła architekturę AMPED, czyli asymetryczny model wieloprocesowo-zdarzeniowy. Autor pokazuje, że lekcja z tej pracy, oddzielenie głównej pętli obsługi zapytań od wolnych operacji dyskowych, wciąż leży u podstaw nowoczesnych runtime'ów.

**Summary:** AMPED trzyma jedną główną pętlę odpowiedzialną za routing zapytań i parsowanie protokołu, ale wszystkie wolne operacje, jak odczyt z dysku czy renderowanie szablonów, wysyła do lekkich procesów działających w tle. Sama idea jest zaskakująco prosta: główny przepływ nigdy nie powinien czekać na wolną pracę, i to jest fundament, który przetrwał ćwierć wieku zmian w sprzęcie i systemach operacyjnych.

Dzieląc odpowiedzialności w ten sposób, Flash unikał zwolnień typowych dla serwerów z jedną pętlą zdarzeń, a jednocześnie omijał problemy z pamięcią i stabilnością, które są typowe dla architektur wieloprocesowych czy wielowątkowych bez tego rozdzielenia. Autor podaje, że takie podejście dawało do pięćdziesięciu procent większą przepustowość w kluczowych scenariuszach, co w 1999 roku, przy sprzęcie o rząd wielkości słabszym niż dziś, było różnicą decydującą o tym, czy serwer przetrwa nawał ruchu, czy nie.

Głębsza lekcja z tego tekstu dotyczy przenośności architektonicznej. AMPED korzystał wyłącznie ze standardowych narzędzi systemu operacyjnego, więc nie był związany z jednym konkretnym kernelem czy platformą, a ta filozofia pojawia się dziś w nowoczesnych runtime'ach, które chcą działać konsekwentnie na różnych platformach bez poświęcania wydajności. To bardzo aktualna uwaga w czasach, gdy każdy nowy runtime obiecuje, że "działa wszędzie", ale w praktyce zakłada bardzo konkretne API systemowe.

Lubię takie teksty, bo przypominają, że wielkie odkrycia w inżynierii systemów zdarzają się rzadziej, niż sugerują nagłówki, a większość dzisiejszych "nowości" jest ponownym odkryciem tego, co ktoś opisał w papierze naukowym dwadzieścia pięć lat temu, tylko z lepszym marketingiem i szybszym sprzętem. Warto raz na jakiś czas wrócić do źródeł, zamiast czytać wyłącznie streszczenia streszczeń.

**Key takeaways:**
- AMPED oddziela główną pętlę obsługi zapytań od wolnych operacji wykonywanych w lekkich procesach w tle
- Podejście to unika wad zarówno jednopętlowych, jak i wielowątkowych architektur serwerów
- Korzystanie wyłącznie ze standardowych mechanizmów systemu operacyjnego dało architekturze przenośność, która wciąż inspiruje nowoczesne runtime'y

**Why do I care:** Regularnie widzę zespoły, które wpadają w euforię na nowy framework serwerowy, nie wiedząc, że odtwarzają wzorzec opisany w publikacji naukowej z czasów, gdy jeszcze nie było smartfonów. Znajomość takich klasycznych architektur jak AMPED daje słownik do oceny nowych narzędzi bez owijania się w marketingowe sformułowania producenta, i to jest umiejętność, której brakuje wielu młodszym inżynierom skupionym wyłącznie na najnowszym frameworku.

**Link:** [The AMPED Architecture: An Enduring Blueprint for Efficient Web Servers from 1999](https://hackernoon.com/the-amped-architecture-an-enduring-blueprint-for-efficient-web-servers-from-1999)

## RAG, agenci AI i Agentic AI, większość programistów myli te trzy rzeczy

**TLDR:** Artykuł tłumaczy, że RAG, agenci AI i Agentic AI to nie konkurujące ze sobą podejścia, ale warstwy budowane jedna na drugiej, gdzie większość produkcyjnych systemów Agentic AI używa RAG wewnątrz poszczególnych agentów. Autor przekonuje, że wiele problemów, które zespoły próbują rozwiązać pełnym systemem wieloagentowym, dałoby się rozwiązać prościej i taniej dobrze zaprojektowanym pipeline'em RAG.

**Summary:** RAG, czyli retrieval-augmented generation, jest z natury pasywny: wyszukuje odpowiednią wiedzę i generuje odpowiedź, ale sam z siebie nie podejmuje żadnej akcji w świecie. Jego wartość leży w dostarczeniu modelowi właściwej wiedzy w właściwym momencie, przy czym wyszukiwanie odbywa się na podstawie znaczenia, nie dopasowania słów kluczowych, co odróżnia go od starszych systemów wyszukiwania pełnotekstowego.

Agent AI to coś innego: to model językowy, który potrafi wykonywać akcje w świecie, nie tylko generować tekst, i działa w pętli reasoning-akcja-obserwacja, a nie w jednym przebiegu jak RAG. Ta pętla, powtarzana iteracyjnie aż do osiągnięcia celu, jest fundamentalną różnicą między agentem a systemem RAG, który odpowiada raz i kończy zadanie. Autor pokazuje to rozróżnienie bardzo klarownie, unikając modnego mieszania terminów, które w wielu innych tekstach na ten temat jest normą.

Agentic AI z kolei to poziom wyżej: jeśli pojedynczy agent AI jest jedną autonomiczną pętlą, to Agentic AI jest systemem wielu agentów współpracujących ze sobą, żeby zrealizować złożone, wieloetapowe cele, których żaden pojedynczy agent nie mógłby wykonać samodzielnie. To jest architektura orkiestracji, nie architektura pojedynczego modelu, i wymaga zupełnie innego myślenia o koordynacji, błędach i kosztach niż pojedynczy agent czy pipeline RAG.

Najbardziej wartościowa część tekstu to przestroga na koniec: nie każdy problem wymaga Agentic AI, a wiele problemów, w które zespoły wpychają pełne systemy wieloagentowe, można rozwiązać bardziej wiarygodnie i taniej dobrze zaprojektowanym pipeline'em RAG. To jest dokładnie ta sama lekcja, którą powtarzam od dawna każdemu, kto przychodzi z pomysłem na "system agentowy" zamiast najpierw sprawdzić, czy problem da się rozwiązać prostszym narzędziem. Modny słownik nie usprawiedliwia niepotrzebnej złożoności architektonicznej, a rachunek za nietrafioną decyzję architektoniczną płaci się miesiącami później, w postaci kosztów utrzymania i debugowania.

**Key takeaways:**
- RAG jest pasywny, agent AI działa w iteracyjnej pętli reasoning-akcja-obserwacja, a Agentic AI koordynuje wiele agentów naraz
- Większość produkcyjnych systemów Agentic AI wykorzystuje RAG wewnątrz poszczególnych agentów jako warstwę dostępu do wiedzy
- Wiele problemów rozwiązuje się lepiej prostym pipeline'em RAG niż pełnym systemem wieloagentowym

**Why do I care:** To jest jeden z niewielu tekstów o AI, które faktycznie pomagają rozmawiać z klientem czy zarządem bez wprowadzania go w błąd modnym słownictwem. Kiedy ktoś przychodzi z żądaniem "zbudujmy agenta", pierwsze pytanie, jakie zadaję, to czy naprawdę potrzebujemy pętli decyzyjnej z akcjami w świecie, czy wystarczy dobrze zaprojektowany retrieval, i ten artykuł daje ładny, uporządkowany słownik do takiej rozmowy.

**Link:** [RAG, AI Agents, and Agentic AI: Most Developers Are Confusing All Three](https://hackernoon.com/rag-ai-agents-and-agentic-ai-most-developers-are-confusing-all-three)
