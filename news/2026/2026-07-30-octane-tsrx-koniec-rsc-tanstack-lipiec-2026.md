---
title: "Octane, TSRX i koniec RSC na TanStack.com: co naprawdę zmienia się w React w lipcu 2026"
excerpt: "Przegląd najważniejszych tekstów tygodnia o React i React Native: od kompilowanego Octane, przez odwrót TanStack od RSC, po realne wątki w react-native-workers."
publishedAt: "2026-07-30"
slug: "octane-tsrx-koniec-rsc-tanstack-lipiec-2026"
hashtags: "#thisweekinreact #react #reactnative #react-compiler #server-components #nextjs #css-in-js #performance #state-management #react-native-workers #generated #pl"
source_pattern: "This Week In React"
---

## Octane, czyli React bez reguł hooków

**TLDR:** Octane to następca projektu Inferno, framework kompilowany zamiast interpretowany w czasie działania, bez wirtualnego DOM i bez reguł hooków. Kod wygląda jak React, ale kompilator sam wylicza zależności i pozwala wywoływać hooki warunkowo.

**Summary:** Octane próbuje rozwiązać problem, który każdy z nas zna z autopsji: exhaustive-deps, tablice zależności, które trzeba pilnować ręcznie, i regułę hooków, która nie pozwala postawić useEffect za warunkiem. W Octane pisze się komponenty tsrx, gdzie hook może stać za ifem, bo sloty stanu są przypisywane po miejscu wywołania, a nie po kolejności wywołań. Kompilator śledzi, czego faktycznie używa dany efekt, memo czy callback, więc tablica zależności znika jako coś, co trzeba pisać ręcznie. Brzmi znajomo, bo to właśnie obiecywał React Compiler, tylko że tu dochodzi do tego zupełnie inny model wykonania, bez wirtualnego DOM, z szablonami kompilowanymi do klonowanych węzłów i bezpośrednich zapisów w DOM.

Twórcy Octane nie chowają się za marketingiem, publikują 15 zestawów benchmarków porównujących z React 19, Preact, Solid, Svelte, Vue Vapor i Ripple, gdzie każda komórka to średnia geometryczna względem Octane jako punktu odniesienia. React wypada od 1,1 do ponad 12 razy wolniej w zależności od scenariusza, co akurat nikogo nie powinno dziwić, bo porównywanie frameworka kompilowanego z frameworkiem opartym na wirtualnym DOM to trochę jak porównywanie kompilatora C z interpreterem Pythona. Ciekawszy jest argument przeciwko sygnałom: autorzy świadomie nie budowali Octane na sygnałach, bo to zmusza każdy komponent do myślenia w kategoriach sygnałów, a oni chcą zostawić programisty przy zwykłych funkcjach czytanych od góry do dołu, przerzucając dodatkową pracę na kompilator.

Najciekawszy fragment całej strony to nie benchmarki, tylko sekcja o migracji. OctaneCompat pozwala wstawiać skompilowane wyspy Octane do istniejącej aplikacji React 19, z prawdziwym kontekstem Reacta czytanym przez use(), z natywnymi zdarzeniami i z SSR plus hydracją działającą tak jak w Reactcie. Jedyna rzecz, która nie przechodzi przez tę granicę, to Server Components, co jest szczere i warto to docenić, bo wiele takich projektów udaje, że migracja jest bezbolesna, a tu ktoś od razu mówi, gdzie jest ściana.

Jest tu też narzędzie octane doctor, które wyłapuje typowe błędy konfiguracji, na przykład dwie kopie runtime w jednym drzewie, co po cichu psuje stan hooków, bo jest on kluczowany per instancja runtime. To akurat mnie przekonuje bardziej niż same liczby wydajnościowe, bo pokazuje, że ktoś pomyślał o tym, co się dzieje, gdy coś pójdzie nie tak, a nie tylko o tym, jak wygląda demo na scenie.

**Key takeaways:**
- Octane kompiluje kod ahead-of-time, eliminując wirtualny DOM i ręczne tablice zależności
- Hooki mogą stać za warunkami, bo sloty stanu są przypisywane po miejscu w kodzie, nie po kolejności wywołań
- OctaneCompat pozwala migrować pojedyncze komponenty do istniejącej aplikacji React 19 bez przepisywania całości, poza Server Components
- Benchmarki pokazują przewagę nad React, Preact i pozostałymi frameworkami kompilowanymi, choć to porównanie z natury faworyzuje architekturę kompilowaną

**Why do I care:** Traktowałbym to jako sygnał kierunku, w którym zmierza cały ekosystem, a nie jako coś, co wdrożę w produkcyjnym projekcie w tym roku. Octane pokazuje, że granica między frameworkiem a kompilatorem się zaciera, i że firmy zaczynają traktować migrację jako proces stopniowy, wyspa po wyspie, zamiast wielkiego przepisania. To dobra lekcja architektoniczna nawet jeśli nigdy nie dotkniesz tsrx.

**Link:** [Octane — React's programming model, compiled](https://octanejs.dev/)

## TSRX, czyli JSX przemyślany pod kątem agentów AI

**TLDR:** TSRX to rozszerzenie składni TypeScript do budowy interfejsów, spadkobierca JSX, który kompiluje się dziś do Octane, React, Preact, Ripple, Solid i Vue. Kluczowa zmiana to statement container, blok łączący logikę setupu z jednym węzłem wyjściowym.

**Summary:** TSRX rozwiązuje problem, który każdy zna z dużych komponentów React: zmienne pomocnicze siedzą na górze pliku, a JSX korzystające z nich jest kawałek dalej, więc czytelnik musi cały czas skakać oczami między dwoma miejscami. W TSRX lokalne zmienne mogą stać tuż przy znaczniku, który z nich korzysta, bo blok zaczyna się od zwykłego TypeScriptu i kończy jednym węzłem wyjściowym. Struktura wymusza w ten sposób coś, co dotąd było kwestią dyscypliny programisty, czyli trzymanie powiązanej logiki blisko siebie.

To, co wyróżnia ten projekt na tle zwykłych transpilerów składni, to wprost przyznany argument, że język projektowany jest pod kątem modeli językowych, nie tylko ludzi. Autorzy powołują się na pracę Lost in the Middle, pokazującą że modele gorzej radzą sobie z informacją rozproszoną po długim kontekście. Skoro coraz więcej kodu piszą i przeglądają narzędzia AI, to jawna struktura komponentu ułatwia im pracę bez zmiany semantyki frameworka pod spodem. Trudno się z tym nie zgodzić, choć warto pamiętać, że to samo uzasadnienie można przykleić do dowolnej decyzji projektowej, więc sam argument nie czyni rozwiązania automatycznie dobrym.

Ciekawym detalem technicznym jest składnia destrukturyzacji propsów w wariancie dla Solid, gdzie wzorzec z ampersandem kompiluje się do leniwych getterów, więc czytanie propsa zachowuje reaktywność bez konieczności pisania props.cokolwiek wszędzie. To pokazuje, że TSRX nie jest jednym uniwersalnym JSX-em na sterydach, tylko warstwą, która potrafi dopasować się do specyfiki każdego backendu kompilacji, zachowując przy tym te same intencje składniowe.

Cały projekt ma już serwer języka, wtyczki do Prettiera i ESLinta oraz wsparcie w popularnych edytorach, co sugeruje, że to coś więcej niż eksperyment jednego weekendu. Pozostaje pytanie, czy ekosystem faktycznie zechce utrzymywać kolejną warstwę kompilacji ponad JSX, skoro sam React Compiler już próbuje rozwiązać część tych samych problemów bez zmiany składni.

**Key takeaways:**
- TSRX to nadzbiór TypeScriptu kompilowany do wielu frameworkowych backendów, w tym Octane, React i Solid
- Statement container łączy logikę setupu i JSX w jednym bloku, eliminując rozjazd między górą pliku a znacznikiem
- Projekt wprost projektuje składnię pod kątem czytelności dla modeli językowych, powołując się na badania nad ograniczeniami kontekstu LLM
- Ma już serwer języka i wtyczki do popularnych narzędzi, więc to coś więcej niż jednorazowy eksperyment

**Why do I care:** To jeden z tych projektów, które warto obserwować z dystansu, ale nie wdrażać pochopnie. Argument o czytelności dla agentów AI jest realny i będzie się pojawiał coraz częściej w uzasadnieniach nowych narzędzi, ale zanim zamienię JSX na coś nowego, chcę zobaczyć, jak to wygląda w większym, żywym repozytorium, a nie tylko w przykładach na stronie startowej.

**Link:** [TSRX | TypeScript Language Extension for Declarative UI](https://tsrx.dev/)

## Dlaczego TanStack.com zrezygnował z RSC

**TLDR:** Tanner Linsley opisuje, jak TanStack.com najpierw zyskał na przejściu na React Server Components, a potem, po zmniejszeniu biblioteki do renderowania markdownu i podświetlania kodu, odkrył że cała architektura RSC przestała się opłacać. Wrócili do zwykłego SSR i strona jest szybsza.

**Summary:** Historia zaczyna się od sukcesu. Strona dokumentacji ważyła 1,1 MiB skryptu na jednej stronie, z czego 358 KiB to sam Shiki do podświetlania składni. RSC pozwoliło przenieść renderowanie markdownu i highlightowanie kodu na serwer, więc do przeglądarki trafiał już gotowy wynik jako dane Flight, a nie cały silnik renderujący. Strony blogowe schudły o 153 KB gzip, Total Blocking Time spadł z 1200 ms do 260 ms. To były realne, zmierzone liczby, nie marketingowe obietnice.

Problem pojawił się później, gdy autor zaczął zadawać sobie pytanie, dlaczego renderowanie markdownu w ogóle musiało kosztować 358 KiB. Zamiast zaakceptować to jako stały koszt, zespół zbudował dwie małe biblioteki, TanStack Markdown i TanStack Highlight, zaprojektowane dokładnie pod kontrakt, jakiego potrzebowała ta jedna strona. Wynik, po skompresowaniu, waży około 27 KiB, czyli osiemnaście do dziewiętnastu kilobajtów więcej niż wersja RSC. I to jest moment, w którym cała decyzja się odwraca: RSC rozwiązywało problem zbyt dużej zależności, zamieniając go w decyzję architektoniczną, a gdy zależność przestała być duża, cała ta architektura nadal czekała na zapłatę.

To, co podoba mi się najbardziej w tym tekście, to szczerość w liczeniu kosztów, których nikt zwykle nie liczy. Autor pokazuje, że przy sześciu odwiedzonych stronach na sesję to zwykłe SSR wygrywa jeszcze bardziej, bo RSC przy każdej nawigacji wysyłało cały zserializowany payload Flight tej samej wcześniej wyrenderowanej treści, podczas gdy zwykłe funkcje serwerowe wysyłają tylko dane, które się zmieniły. Do tego dochodzi opis, jak wyglądała ścieżka danych w wersji RSC, markdown zamieniany na JSX w plikach tylko serwerowych, potem na payload Flight, potem docierający do trasy jako contentRsc typu React.ReactNode, gdzie żaden człowiek ani agent kodujący nie widział z miejsca, jak markdown w ogóle stał się znacznikiem.

Najbardziej wartościowy jest wniosek końcowy: autor nie twierdzi, że RSC jest złe, tylko że stało się domyślnym punktem odniesienia w ekosystemie zanim ludzie w ogóle nazwali problem, który mają rozwiązać. To trafna diagnoza mody technologicznej, w której pytanie brzmi "czy wspierasz RSC", zamiast "czy potrzebujesz RSC". TanStack Start dalej wspiera Server Components jako opcjonalną możliwość, po prostu tanstack.com przestał z niej korzystać, i te dwie decyzje nie muszą się wykluczać.

**Key takeaways:**
- RSC dało realny zysk wydajnościowy dopóki dependency, którą chowało przed klientem, była duża
- Po zmniejszeniu biblioteki renderującej markdown do 27 KiB różnica na korzyść RSC praktycznie zniknęła
- Przy wielu odwiedzonych stronach zwykłe SSR z funkcjami serwerowymi wygrywa, bo nie wysyła powtórnie całego drzewa komponentów
- RSC jako opcjonalna możliwość frameworka, a nie jako domyślna architektura każdej aplikacji, to zdrowszy model myślenia

**Why do I care:** To jeden z ważniejszych tekstów tego tygodnia dla każdego, kto projektuje architekturę frontendu, bo pokazuje mechanizm, w jaki technologia bywa przyjmowana z powodów, które później znikają, a decyzja architektoniczna zostaje. Zanim sięgniesz po RSC w nowym projekcie, warto zapytać wprost, jaką konkretną, dużą zależność chowasz przed klientem, bo jeśli nie potrafisz odpowiedzieć, to może wystarczy zwykłe SSR.

**Link:** [We Stopped Using RSC on TanStack.com](https://tanstack.com/blog/we-stopped-using-rsc-on-tanstack-com)

## Stabilność referencyjna jako typ

**TLDR:** Eksperymentalna biblioteka stableref wprowadza typ Stable&lt;T&gt; z fantomową marką opartą o unique symbol, dzięki czemu prop może zadeklarować w typie, że jest referencyjnie stabilny, a nie tylko że ma odpowiedni kształt danych.

**Summary:** Autor opisuje sytuację znaną każdemu, kto pracował dłużej przy React albo Preact: useMemo tu, useCallback tam, wyciszony warning exhaustive-deps, i nadzieja, że prop przekazany do zmemoizowanego dziecka faktycznie jest stabilny. Typ Item[] mówi wszystko o kształcie danych i nic o tym, czy dostaniesz tę samą referencję przy kolejnym renderze. Pomysł jest prosty: opakować typ w Stable&lt;T&gt;, gdzie marka opiera się na unique symbolu, którego nie da się sfałszować przez przypadkowe dopasowanie strukturalne, bo taki symbol nigdy nie opuszcza pakietu.

Pierwsze podejście przez augmentację modułów Reacta okazało się połowicznym sukcesem, i to jest część, którą warto dokładnie zrozumieć. Augmentacja modułów pozwala dodawać przeciążenia typów, ale nigdy nie usuwa tych, które już są w @types/react. W efekcie useMemo miał dwa przeciążenia obok siebie, ścisłe i oryginalne permisywne, a TypeScript próbował najpierw ścisłego, i gdy któraś zależność nie miała dowodu stabilności, cicho spadał do wersji oryginalnej, która akceptuje wszystko. Żadnego błędu, żadnego ostrzeżenia, po prostu brak dowodu. Autor rozwiązał to inaczej, eksportując osobne, ścisłe wersje hooków spod ścieżki stableref/react, gdzie nie ma do czego spaść, więc surowa referencja faktycznie generuje błąd typu dokładnie w miejscu, gdzie została napisana.

Ciekawy jest też pomysł na kontekst: createStableContext przenosi wymaganie stabilności na dostawcę wartości, więc komponent gdzieś głęboko w drzewie nigdy nie musi wiedzieć, jak ta wartość powstała, po prostu dostaje kontrakt. To dokładnie ta granica odpowiedzialności, której chcemy od systemu typów, wiedza zostaje tam, gdzie jest odpowiedzialność, a nie rozjeżdża się po całym drzewie komponentów.

Autor sam przyznaje, że rzutowanie as Stable&lt;typeof value&gt; złamie każdą taką gwarancję, więc to nie jest twierdzenie matematyczne, tylko konwencja wspierana przez kompilator. Najbardziej przekonujący fragment dotyczy jednak agentów kodujących: podawanie inline'owej tablicy do zmemoizowanego dziecka to dokładnie ten typ błędu, który agent popełnia cały czas, bo działa i wygląda dobrze, tylko po cichu robi więcej pracy niż powinien. Komunikat błędu w stableref opisuje wprost, jak naprawić zależność, zamiast zostawiać kogoś przed napisem "not assignable to never", co jest małym, ale realnym usprawnieniem pętli zwrotnej dla kogokolwiek generuje kod maszynowo.

**Key takeaways:**
- Stable&lt;T&gt; koduje intencję referencyjnej stabilności bezpośrednio w typie, opartą o unique symbol niemożliwy do podrobienia strukturalnie
- Augmentacja typów Reacta zawodzi po cichu, bo TypeScript spada do oryginalnego, permisywnego przeciążenia useMemo
- Osobny import z stableref/react eliminuje to ryzyko, bo nie ma tam do czego spaść
- createStableContext przenosi obowiązek memoizacji na dostawcę wartości, a nie na każdego konsumenta w drzewie

**Why do I care:** To dokładnie ten rodzaj małego, dobrze przemyślanego eksperymentu z typami, który rzadko trafia do mainstreamu, ale wart jest śledzenia, zwłaszcza w kontekście kodu generowanego maszynowo. React Compiler rozwiąże część tych problemów automatycznie, ale automatyczne rozwiązanie i kontrakt widoczny w typie odpowiadają na różne pytania, i w dużych zespołach z code review to właśnie widoczność w typie bywa cenniejsza niż magia kompilatora.

**Link:** [Making Referential Stability a Type](https://www.jovidecroock.com/blog/referential-stability-types/)

## Eksperymenty z RSC w Next.js: paginacja, wyszukiwarka i podgląd na żywo

**TLDR:** Aurora Scharff pokazuje trzy wzorce budowane w aplikacji Drop na Next.js 16.3: przycisk "load more" sterowany przez URL bez własnego pobierania danych, pole wyszukiwania renderowane natychmiast jako część statycznej powłoki, oraz podgląd wiadomości renderowany na żądanie przez Server Function zwracającą JSX.

**Summary:** Punktem wyjścia jest pytanie, ile pracy da się zostawić na serwerze, zanim faktycznie trzeba coś przenieść na klienta. Klasyczny wzorzec "load more" trzyma strony w stanie klienckim i dogaduje się z osobnym endpointem API, co ma realne wady: kanał nie przeżywa odświeżenia, link nie wskazuje konkretnej strony, a załadowane posty nie są objęte cache'owaniem Next.js. Autorka zamiast tego robi z przycisku cienki komponent kliencki, który tylko wrzuca numer strony do URL-a, a serwerowy komponent Feed czyta ten parametr i renderuje strony od jednego do N, każdą we własnej granicy Suspense, dzięki czemu nowa strona strumieniuje się pod szkieletem, a wcześniejsze zostają dokładnie tam, gdzie były.

Wyszukiwarka jest trudniejszym przypadkiem, bo pole tekstowe chce być częścią natychmiastowej, statycznej powłoki strony, ale jednocześnie musi znać zapytanie z URL-a, żeby przetrwać odświeżenie. Rozwiązaniem jest rozdzielenie: input nigdy nie czyta zapytania, tylko zapisuje je do URL-a przy zmianie, więc może renderować się statycznie, a osobny mały inline'owy skrypt, uruchamiany w trakcie parsowania HTML jeszcze przed pierwszym malowaniem, ustawia wartość inputa z parametrów URL. To dokładnie ten rodzaj sztuczki z pogranicza hydratacji, którą Next.js sam rekomenduje przeciw miganiu treści, i widać tu, jak wiele niuansów wymaga utrzymanie jednocześnie statycznej powłoki i dynamicznej zawartości pod spodem.

Najciekawszy jest trzeci wzorzec, podgląd wiadomości na żywo. Ciało posta w kanale renderuje serwerowy komponent DropBody, korzystający z asynchronicznego CodeBlock podświetlanego przez Shiki po stronie serwera. Port na klienta wydawałoby się prostszym rozwiązaniem, tylko że wtedy albo trzeba wysłać cały highlighter do przeglądarki, albo podgląd zacznie się różnić od realnego posta. Rozwiązaniem jest Server Function zwracająca JSX na żądanie, renderDropPreview, którą komponent kliencki wywołuje i której wynik czyta przez use(), zawieszając się aż serwer odeśle gotowy węzeł. To pokazuje, że Server Functions zwracające JSX to coś więcej niż ciekawostka API, to realny sposób na uniknięcie dryfu między dwiema ścieżkami renderowania tej samej treści.

Autorka jest przy tym uczciwa co do kosztów: przycisk load more sterowany URL-em przy każdym kliknięciu ponownie renderuje wszystkie wcześniejsze strony, nie tylko nową, więc cache przez 'use cache' i cacheTag staje się koniecznością, a nie luksusem. Zestawia to na końcu z alternatywnym Paginatorem trzymającym strony jako renderowane węzły w stanie klienckim, przyznając wprost, że traci się wtedy adres URL do udostępnienia. Żaden z tych wzorców nie jest przedstawiony jako jedynie słuszny, co samo w sobie jest rzadkością w tekstach o architekturze frontendu.

**Key takeaways:**
- Stan typu numer strony czy zapytanie wyszukiwania warto trzymać w URL-u, bo przetrwa odświeżenie i jest czytelny po stronie serwera
- Rozdzielenie inputa od dynamicznej treści pod spodem pozwala utrzymać statyczną, natychmiastową powłokę strony
- Server Function zwracająca JSX eliminuje dryf między renderowaniem produkcyjnym a podglądem tej samej treści
- Każdy z tych wzorców ma realny koszt, taki jak ponowne renderowanie wcześniejszych stron przy paginacji sterowanej URL-em

**Why do I care:** To rzadki przykład tekstu, który nie sprzedaje jednej recepty, tylko pokazuje kompromisy między kilkoma podejściami do tego samego problemu. Warto go czytać jako katalog wzorców do wyciągnięcia pojedynczo, a nie jako całościową architekturę do skopiowania, bo niektóre z tych sztuczek, jak inline'owy skrypt seedujący input, są eleganckie tylko dopóki nie musisz ich utrzymywać w większym zespole.

**Link:** [Experimenting with RSCs for Performance and UX in Next.js](https://aurorascharff.no/posts/experimenting-with-rsc-for-performance-and-ux-in-nextjs/)

## Jak znaleźć wyciek pamięci w Next.js na produkcji

**TLDR:** Xabier Lameiro dokumentuje trzy otwarte wycieki pamięci w samym Next.js, od 15.5 do 16.3, i pokazuje jak po kształcie krzywej zużycia pamięci rozpoznać, który z nich masz. Jego własny przypadek na Vercel nie był wyciekiem, tylko algorytmiczną marnotrawą kończącą się timeoutem 504.

**Summary:** Rada na wejście jest bezpośrednia: jeśli twój samodzielnie hostowany serwer Next.js rośnie aż umiera z komunikatem o przekroczonym limicie sterty, nie zaczynaj od audytu własnego kodu. Autor opisuje trzy udokumentowane wycieki w samym frameworku. Pierwszy to LRU cache routera, który liczy rozmiar wpisów bez uwzględnienia klucza, czyli samego URL-a, przez co cache uważa się za mały, trzymając w pamięci nawet milion pełnych ścieżek. Drugi to drzewo RSC zatrzymywane w pamięci, gdy klient przerywa połączenie w trakcie strumieniowania, znacznie silniejszy na Node 22 i 24 niż na Node 20. Trzeci to identyfikatory setTimeout w piaskownicy middleware, które nigdy nie są zwalniane, jeśli nie wywołasz clearTimeout ręcznie nawet po naturalnym zakończeniu timeoutu.

To, co czyni ten tekst wartym uwagi, to metoda, nie tylko diagnoza. Autor pokazuje, jak kształt krzywej wzrostu pamięci wskazuje na konkretnego winowajcę: powolny, monotoniczny dryf korelujący z liczbą unikalnych URL-i to LRU cache routera, wzrost proporcjonalny do ruchu i przerywanych połączeń to drzewo RSC, skokowy wzrost powiązany z ruchem przez middleware to piaskownica timeoutów. Zamiast zgadywać, bierze się dwa zrzuty sterty oddzielone okresem obciążenia i porównuje w Chrome DevTools, szukając konkretnych retainerów, LRUNode, reactServerStream albo TimeoutsManager.

Najbardziej pouczający jest jednak fragment o własnym przypadku autora, bo to nie był wyciek tylko zwykłe marnotrawstwo obliczeniowe. Jego loader postów parsował cały korpus MDX, żeby rozwiązać jeden slug, funkcja getAllPosts robiła to raz na slug co dawało złożoność kwadratową, a getAllCategories powtarzało to dla każdej kategorii i tagu, co dawało w sumie osiemnaście tysięcy odczytów dysku na stronę. Na Vercel, gdzie instancja i tak się recykluje zanim dojdzie do OOM, ten sam problem objawia się jako 504 zamiast crasha. Naprawą było zbudowanie modułowego cache'a parsującego korpus raz na instancję, co skróciło czas builda z siedemnastu i pół minuty do trzydziestu czterech sekund, a render pojedynczego tagu z trzydziestu dwóch sekund do stu trzydziestu czterech milisekund.

Wniosek, który autor formułuje wprost, jest ważniejszy niż same trzy bugi: serverless nie uwalnia cię od problemów z pamięcią, tylko zamienia je w coś innego. Recykling instancji chowa kumulującą się retencję, ale marnotrawstwo per-request wraca jako opóźnienie, koszt i timeouty. I moduł-level cache, który sam zbudował jako lekarstwo, jest tak naprawdę wyciekiem numer cztery, gdyby nie był ograniczony i statyczny per deploy tylko rósł wraz z ruchem.

**Key takeaways:**
- Trzy udokumentowane wycieki pamięci w Next.js od wersji 15.5 do 16.3, każdy z innym, rozpoznawalnym kształtem krzywej wzrostu
- Kształt wzrostu pamięci względem unikalnych URL-i, ruchu czy middleware wskazuje, który z trzech to twój przypadek
- Na serverless ten sam problem klasy pamięciowej często objawia się jako timeout 504, nie jako OOM
- Cache modułowy bywa lekarstwem albo czwartym wyciekiem, w zależności od tego, czy jest ograniczony i statyczny

**Why do I care:** Ten tekst powinien trafić do zakładek każdego, kto samodzielnie hostuje Next.js dłużej niż kilka godzin życia procesu. Traktowanie --max-old-space-size jako rozwiązania to złudzenie, o którym autor słusznie pisze wprost, bo monotoniczny wzrost prędzej czy później uderzy w dowolny limit. Warto też zapamiętać jego radę o profilowaniu czasu zamiast pamięci na serverless, bo to zupełnie inny tryb debugowania niż ten, którego uczy nas klasyczny long-running serwer.

**Link:** [How to find a Next.js memory leak in production](https://xabierlameiro.com/blog/nextjs/nextjs-memory-leak-in-production)

## Stan zero-runtime CSS-in-JS w połowie 2026

**TLDR:** Anton Evzhakov, maintainer Linarii i autor dx-styles, kreśli mapę żyjącej części CSS-in-JS po tym, jak styled-components trafiło w tryb utrzymaniowy, a React Server Components uczyniły wstrzykiwanie stylów w czasie renderowania architektonicznie niewygodnym.

**Summary:** Punkt wyjścia jest brutalnie szczery: przez większość dekady CSS-in-JS oznaczało runtime, styled-components i Emotion liczyły style podczas renderu i wstrzykiwały je do dokumentu, co działało dopóki React renderował synchronicznie tylko po stronie klienta. Renderowanie współbieżne zamieniło wstrzykiwanie stylów w czasie renderu w problem wydajnościowy, a Server Components w ogóle nie dają dobrego miejsca, żeby wstrzyknąć cokolwiek z komponentu, który nigdy nie trafia do przeglądarki. To, co przetrwało, to gałąź, która nigdy nie potrzebowała runtime'u, kompilacja w czasie builda, gdzie deklaracje stylów są danymi ewaluowanymi statycznie, a w kodzie JavaScript zostają tylko nazwy klas.

Autor przechodzi przez mapę żyjących bibliotek bez owijania w bawełnę. vanilla-extract to typowany odpowiednik CSS Modules, dojrzały i przewidywalny, kosztem rozdziału plików stylów od komponentu. Panda CSS jest config-first i atomowy, z bogatym ekosystemem, ale z artefaktem codegenu w repozytorium i klasową zupą w DevTools jako ceną za deduplikację na skalę aplikacji. StyleX Mety rozwiązuje bardzo konkretny problem setek zespołów nadpisujących sobie nawzajem style, a jeśli twój problem jest mniejszy, te same ograniczenia stają się tylko tarciem. next-yak kompiluje składnię styled-components przez kompilator w Rust, a Linaria, biblioteka samego autora, pozostaje weteranem typu drop-in, dzielącym silnik wyw-in-js z jego własnym, nowszym dx-styles.

Uczciwość tego tekstu polega na jawnym ujawnieniu konfliktu interesu na samym wstępie i trzymaniu się tego przez cały artykuł, łącznie z przyznaniem, że dla zupełnie nowych projektów design-systemowych sam poleciłby nowszą generację niż jego własna, starsza Linaria. To rzadkie w branży, gdzie autorzy bibliotek zwykle piszą teksty porównawcze, w których ich narzędzie wychodzi bezapelacyjnie na pierwszym miejscu.

Najciekawsza jest końcowa diagnoza kierunku rozwoju całej kategorii: konwergencja z każdej strony naraz, gdzie nawet model autorski styled folduje się w czas builda zamiast wykonywać się w runtime. Różnice, które zostają, są węższe niż kiedyś, atomowy kontra semantyczny output, config-first kontra code-first, i ile z warstwy design-systemowej jest pierwszoklasowym API a ile twoją własną konwencją. Koszt builda staje się nowym polem bitwy teraz, gdy koszt runtime jest w dużej mierze rozwiązany, co jest trafną obserwacją, bo dotąd mało kto o tym mówił głośno.

**Key takeaways:**
- styled-components w trybie utrzymaniowym i Pigment CSS zamrożone w alfa to sygnał, że runtime CSS-in-JS przegrał z Server Components
- Kompilowane rozwiązania jak vanilla-extract, Panda CSS, StyleX i next-yak różnią się głównie tym, ile warstwy design-systemowej dają jako gotowe API
- Linaria i next-yak to dwie bezpośrednie ścieżki migracji z dużego kodu opartego o styled-components
- Koszt czasu builda staje się kolejnym polem porównań teraz, gdy koszt runtime przestał być problemem

**Why do I care:** To najbardziej praktyczna mapa tej kategorii, jaką czytałem od dawna, właśnie dlatego że autor przyznaje się do konfliktu interesu zamiast go ukrywać. Jeśli stoisz przed wyborem CSS-in-JS w nowym projekcie pod RSC, ten tekst da ci od razu właściwe pytania do zadania, zamiast kolejnej listy funkcji bez kontekstu, kiedy dana funkcja w ogóle ma znaczenie.

**Link:** [The state of zero-runtime CSS-in-JS, mid-2026](https://dx-styles.dev/blog/state-of-zero-runtime-css-in-js/)

## Myślenie w Remix UI zamiast w React

**TLDR:** Tutorial pokazuje, jak w remix/ui komponent nie jest funkcją uruchamianą ponownie przy każdej zmianie stanu, tylko funkcją wykonywaną raz, która zwraca domknięcie renderujące, wywoływane ręcznie przez handle.update().

**Summary:** Pierwsza rzecz, którą trzeba oduczyć się z Reacta, to nawyk myślenia w kategoriach hooków i ponownego wykonania całej funkcji komponentu przy każdej zmianie. W Remix UI zmienne lokalne żyją w zasięgu ustawień komponentu, czytane są raz, a stan trzyma się w zwykłych zmiennych, nie w useState. Propsy czyta się z handle.props, a UI aktualizuje się dopiero, gdy explicite wywołasz handle.update(), co odwraca cały model mentalny: zamiast reagować automatycznie na zmianę stanu, sam decydujesz, kiedy poprosić o ponowne wyrenderowanie.

Przykład z galerią zdjęć pokazuje to najlepiej. Kliknięcie przycisku przełączającego widok siatka-lista mutuje zwykłą zmienną view, a potem woła handle.update(), żeby domknięcie renderujące przeczytało nową wartość. To brzmi jak krok wstecz do czasów przed hookami, i w pewnym sensie jest, tylko że tutaj brak automatyzmu jest świadomą decyzją projektową, nie przypadkiem historycznym. Współdzielenie stanu między komponentami odbywa się przez handle.context, kluczowany po tożsamości komponentu, a nie po dowolnym stringu, więc dziecko wywołuje handle.context.get(GalleryDemo) zamiast get("gallery"), co eliminuje całą klasę kolizji nazw kontekstów, które w React bywają źródłem subtelnych bugów.

Warto zwrócić uwagę na jeden szczegół, który tutorial podkreśla wprost: handle.context.set() tylko zapisuje wartość, nie renderuje niczego samoczynnie, więc każda funkcja zmieniająca stan współdzielony musi pamiętać, żeby na końcu wywołać handle.update(). To jest dokładnie ten rodzaj bojlerplate'u, który React ukrywał przed nami przez lata, i pytanie, czy odzyskana kontrola jest tego warta, zależy wyłącznie od tego, jak bardzo cenisz jawność ponad wygodę.

Autor kończy stwierdzeniem, że ten model daje więcej kontroli niż hooki Reacta, ale też wymaga więcej ręcznej pracy, i że ten kompromis zwykle opłaca się wtedy, gdy chcesz renderowania serwerowego jako punktu wyjścia i hydratujesz tylko te fragmenty, które faktycznie potrzebują interaktywności. To uczciwe podsumowanie, bo nie sprzedaje Remix UI jako uniwersalnego następcy Reacta, tylko jako narzędzie do konkretnej klasy problemów, głównie wysp interaktywności osadzonych w treści renderowanej po stronie serwera.

**Key takeaways:**
- Komponent w Remix UI wykonuje się raz i zwraca domknięcie renderujące wywoływane ręcznie przez handle.update()
- Stan lokalny żyje w zwykłych zmiennych zasięgu ustawień, nie w hookach jak useState
- Kontekst jest kluczowany po tożsamości komponentu przez handle.context.get(Component), co eliminuje kolizje nazw
- Model daje więcej kontroli kosztem większej ilości ręcznej pracy, sensowny głównie dla wysp interaktywności

**Why do I care:** Widzę w tym przede wszystkim dobry materiał edukacyjny pokazujący, ile automatyzmu React tak naprawdę nam odbiera w zamian za wygodę, nawet jeśli sam Remix UI nie zdobędzie masowej adopcji. Warto przeczytać to jako ćwiczenie myślowe, zanim ślepo zaakceptujesz kolejny model reaktywności jako oczywisty.

**Link:** [Think in Remix UI Instead of React](https://sergiodxa.com/tutorials/think-in-remix-ui-instead-of-react)

## Absolutny stan "zarządzania stanem"

**TLDR:** Autor Infrequently Noted rozprawia się z terminem "state management", dowodząc że biblioteki jak MobX, Redux, Jotai czy Zustand tylko propagują powiadomienia o zmianach stanu, ale nie zarządzają nim, bo prawdziwe zarządzanie stanem wymaga koncepcji czasu i porządku, czego żadna z nich nie ma wbudowanego.

**Summary:** Tekst zaczyna się od sokratejskiego dialogu, w którym ktoś pyta, jak zrobić "zarządzanie stanem" bez Reacta, skoro to właśnie React ponoć zarządza stanem w aplikacji, a chwilę później okazuje się, że jest jeszcze osobna biblioteka do "zarządzania stanem" obok Reacta. Autor wylicza całą litanię bibliotek obiecujących zarządzanie stanem, od MobX przez Recoil, Jotai, XState, Apollo, Redux, TanStack Store aż po Zustand, i zauważa, że skoro cały ten ekosystem nie potrafi zgodzić się na jedno rozwiązanie, to być może żadne z nich nie robi tego, co deklaruje w opisie.

Kluczowe rozróżnienie, jakie wprowadza, dotyczy wymiaru czasu. Systemy propagujące stan, czyli w praktyce odmiany event busa i pub/sub, mogą filtrować i przetwarzać aktualizacje, ale nie mają wbudowanego pojęcia kolejności ani czasu, więc nie potrafią w sposób uporządkowany rozstrzygać konfliktów między aktualizacjami z różnych źródeł. Prawdziwe zarządzanie stanem, jego zdaniem, to dokładnie ten sam problem co zarządzanie danymi między wieloma maszynami w sieci, bo zarządzanie danymi w czasie zawsze oznacza radzenie sobie z przeszłością, teraźniejszością i przyszłością tego samego stanu, niezależnie czy chodzi o odtworzenie aplikacji na innym komputerze, czy o tę samą aplikację uruchomioną ponownie później na tym samym urządzeniu.

Po tym rozróżnieniu autor przechodzi do konkretów: systemy, które faktycznie zarządzają stanem, mają wewnętrzne mechanizmy w rodzaju wektorów zegarów, pozwalające na globalne porządkowanie mutacji. Wymienia Y.js jako CRDT-y stosowane do edycji tekstu, Zero jako następcę Replicache celujący w żywą kolaborację i synchronizację danych, oraz Fluid od Microsoftu, wywodzący się z tradycji Operational Transform. To są narzędzia, o których większość frontendowych zespołów nawet nie słyszała, mimo że rozwiązują dokładnie ten problem, który Redux i jego rodzina próbują łatać prowizorką od lat.

Warto docenić przypisy, w których autor przyznaje, że dla wielu małych komponentów UI ten cały aparat pojęciowy jest zbędny, bo lokalny stan bez potrzeby śledzenia mutacji w czasie jest zupełnie w porządku jako maszyna stanów bez historii. Problem zaczyna się, gdy ta sama, uproszczona logika próbuje objąć konflikty na poziomie całej aplikacji, których czasowa pustka po prostu nie da się rozstrzygnąć bez porządkowania. To rozróżnienie ratuje tekst przed czystym nihilizmem wobec całej kategorii narzędzi i czyni go użytecznym przewodnikiem, kiedy sięgnąć po co.

**Key takeaways:**
- Biblioteki jak Redux, Zustand czy Jotai propagują i filtrują powiadomienia o zmianach, ale nie mają wbudowanego pojęcia czasu ani kolejności
- Prawdziwe zarządzanie stanem wymaga mechanizmu porządkowania mutacji w czasie, jak wektory zegarów w CRDT-ach
- Y.js, Zero i Fluid to praktyczne implementacje systemów, które faktycznie zarządzają stanem w czasie
- Dla prostego stanu lokalnego bez potrzeby śledzenia historii event bus w stylu Reduxa bywa zupełnie wystarczający

**Why do I care:** To jeden z tych tekstów, które warto przeczytać właśnie dla irytacji, jaką wywołują, bo zmuszają do przemyślenia słownictwa, którego używamy bezrefleksyjnie od lat. Nie zgadzam się z każdym zdaniem tego eseju, ton bywa złośliwy ponad potrzebę, ale rozróżnienie między propagacją a zarządzaniem stanem jest realne i warto je mieć w głowie następnym razem, gdy ktoś zaproponuje kolejną bibliotekę stanu jako rozwiązanie problemu synchronizacji offline.

**Link:** [The Absolute State of Management - Infrequently Noted](https://infrequently.org/2026/07/state-management/)

## Dlaczego nie przenieśliśmy zapisów MMKV do workletu

**TLDR:** Zespół próbował przenieść synchroniczny zapis MMKV blokujący wątek JS do workletu Reanimated, żeby odciążyć główny wątek. Koszt serializacji danych do workletu okazał się równy albo wyższy niż koszt samego zapisu, więc wrócili do rozwiązania na wątku JS.

**Summary:** Problem wyjściowy jest prosty do zrozumienia: aplikacja zapisuje store GraphQL na dysk przez MMKV, żeby móc wystartować z danymi, a ten zapis to toJSON plus JSON.stringify plus sam zapis do MMKV, wszystko synchronicznie na wątku JS, co kosztuje około 29,56 milisekundy i blokuje responsywność interfejsu w tym czasie. Naturalnym pomysłem, rekomendowanym zresztą przez autora MMKV, było przeniesienie zapisu do workletu działającego na osobnym wątku z własnym runtime.

Trzy eksperymenty pokazują, dlaczego intuicja tutaj zawodzi. W pierwszym przenieśli tylko sam zapis do MMKV, zostawiając serializację na wątku JS i wysyłając już gotowy string do workletu. Wynik był równie wolny jak oryginał, bo koszt skopiowania stringa do runtime workletu, czyli createSerializableString, kosztował dokładnie tyle samo co cały pierwotny zapis. Zamiast oszczędzić czas, po prostu przenieśli koszt w inne miejsce. W drugim eksperymencie spróbowali odwrotnie, wysyłając cały surowy obiekt store do workletu i robiąc tam wszystko od toJSON po zapis do MMKV, licząc że sam koszt wysłania obiektu będzie mały. Było gorzej: kopiowanie dużego obiektu właściwość po właściwości, widoczne w śladzie jako cloneMap i clonePlainJSObject, kosztowało około 132 milisekundy na wątku JS, więcej niż cały problem, który próbowali rozwiązać.

Trzeci eksperyment sprawdzał, czy włączenie Bundle Mode dla workletów cokolwiek zmienia w koszcie serializacji, bo to zupełnie inna warstwa, dotycząca sposobu budowania kodu workletu, nie sposobu kopiowania danych. Wynik był identyczny, koszt kopiowania pozostał na poziomie około 136 milisekund, co ma sens, bo koszt pochodzi z rozmiaru danych, nie ze sposobu spakowania kodu.

Wniosek jest krótki i wart zapamiętania: worklet nie jest darmowym sposobem na przeniesienie pracy poza wątek JS, bo wysłanie danych do workletu zawsze kosztuje kopię danych do innego runtime, a ten koszt rośnie z rozmiarem danych szybciej, niż większość programistów się spodziewa. Dla stringa koszt kopii jest z grubsza równy kosztowi zapisu, więc nic nie zyskujesz, a dla dużego obiektu koszt kopii bywa wyższy niż praca, którą próbujesz odciążyć.

**Key takeaways:**
- Przeniesienie zapisu MMKV do workletu wymaga skopiowania danych do osobnego runtime, co samo w sobie kosztuje
- Dla dużych stringów koszt tej kopii jest w praktyce równy kosztowi samego zapisu, więc zysku nie ma
- Dla dużych obiektów koszt kopiowania właściwość po właściwości bywa wielokrotnie wyższy niż koszt pracy, którą chciano odciążyć
- Bundle Mode workletów zmienia sposób budowania kodu, nie sposób kopiowania danych, więc nie wpływa na ten koszt

**Why do I care:** To rzadki i cenny przykład zespołu, który publikuje nieudany eksperyment zamiast tylko sukcesów, i właśnie dlatego jest bardziej wartościowy niż większość case studies. Zanim sięgniesz po worklet jako uniwersalne remedium na wolny wątek JS w React Native, zmierz koszt serializacji danych, które faktycznie musisz tam wysłać, bo dla dużych struktur ten koszt potrafi zjeść cały zysk.

**Link:** [Why We Did Not Move MMKV Writes to a Worklet: The Serialization Cost](https://andrei-calazans.com/posts/2026-07-28-mmkv-writes-worklet-serialization-cost/)

## npm skanuje paczki przy publikacji

**TLDR:** GitHub wprowadza automatyczne skanowanie paczek npm pod kątem złośliwego kodu w momencie publikacji, z opóźnieniem dostępności rzędu pięciu do piętnastu minut. Paczki o podwójnym zastosowaniu, przypominające malware ale mające legalny cel bezpieczeństwa, wymagają teraz osobnej deklaracji contentPolicy i pliku DISCLOSURE.

**Summary:** Nowo publikowane paczki będą teraz automatycznie skanowane, zanim staną się dostępne do instalacji, z trzema możliwymi wynikami: publikacja jak zwykle, wstrzymanie do ręcznej weryfikacji, albo zablokowanie. Typowe opóźnienie to około pięciu minut, choć przy dużych paczkach albo w godzinach szczytu może sięgnąć piętnastu minut lub więcej, i to są liczby opisujące obecne typowe zachowanie, nie gwarancja usługi na przyszłość. Dla większości publikujących zmienia się niewiele poza koniecznością tolerowania krótkiego opóźnienia, ale każda automatyzacja zakładająca natychmiastową dostępność paczki po publikacji będzie musiała zostać dostosowana.

Ciekawszy jest fragment o paczkach podwójnego zastosowania. Niektóre legalne narzędzia bezpieczeństwa mają funkcje, które automatyczny skaner łatwo pomyli ze złośliwym kodem, na przykład narzędzia do testów penetracyjnych czy analizy podatności. Nowe pole contentPolicy w package.json pozwala zadeklarować taką zawartość wprost, ale wymaga dołączenia pliku DISCLOSURE opisującego funkcję i jej legalne zastosowanie, którym posługuje się zespół zaufania i bezpieczeństwa przy ręcznej weryfikacji. Deklaracja ta nie gwarantuje automatycznej publikacji, tylko uruchamia dodatkowe, dopasowane skanowanie.

Wymagania publikacji dla takich paczek są dość rygorystyczne: publikacja musi wymuszać uwierzytelnianie dwuskładnikowe, czy to przez trusted publishing OIDC, sesję interaktywną z 2FA, czy publikację etapową, a raz zadeklarowana metadana musi pozostać na stałe, kolejne wersje nie mogą jej usunąć bez odrzucenia publikacji. To ma sens jako mechanizm zapobiegający sytuacji, w której ktoś deklaruje dual-use raz, żeby przejść weryfikację, a potem po cichu wycofuje deklarację w kolejnej wersji.

To dobra, choć spóźniona odpowiedź na falę ataków supply chain, które w ostatnich latach regularnie trafiały w popularne paczki npm. Jedyny minus to opóźnienie dostępności, które dla zespołów z automatyzacją CI opartą na natychmiastowej publikacji będzie wymagało realnej zmiany w pipeline'ach.

**Key takeaways:**
- Nowo publikowane paczki npm są teraz automatycznie skanowane przed udostępnieniem, z typowym opóźnieniem pięciu do piętnastu minut
- Paczki mogą zostać opublikowane normalnie, wstrzymane do ręcznej weryfikacji, albo zablokowane w zależności od wyniku skanu
- Paczki podwójnego zastosowania wymagają pola contentPolicy i pliku DISCLOSURE opisującego legalne zastosowanie
- Publikacja paczek dual-use musi wymuszać uwierzytelnianie dwuskładnikowe, a deklaracja metadanych musi pozostać w kolejnych wersjach

**Why do I care:** Jeśli utrzymujesz automatyzację CI publikującą paczki, sprawdź już teraz, czy zakłada natychmiastową dostępność po npm publish, bo to konkretna rzecz, która może cicho przestać działać. Poza tym to krok we właściwym kierunku po serii głośnych ataków na łańcuch dostaw w ekosystemie JavaScript, choć realną skuteczność detekcji poznamy dopiero po pierwszych próbach jej obejścia.

**Link:** [npm publish-time malware scanning and dual-use metadata](https://github.blog/changelog/2026-07-28-npm-publish-time-malware-scanning-and-dual-use-metadata/)

## State of CSS 2026: rok Anchor Positioning

**TLDR:** Wyniki dorocznej ankiety State of CSS pokazują, że Anchor Positioning jest jednocześnie ulubioną nową funkcją CSS i funkcją najbardziej ograniczoną przez brak wsparcia przeglądarek. AI wciąż generuje mniejszość kodu CSS w porównaniu do innych warstw stosu frontendowego.

**Summary:** Ankieta zebrała blisko pięć tysięcy odpowiedzi między połową maja a końcem czerwca 2026, i jej najciekawszym wynikiem jest paradoks Anchor Positioning: funkcja ta zajęła pierwsze miejsce zarówno jako ulubiona nowa funkcja CSS ostatniego roku, jak i jako funkcja, której respondenci chcieliby używać, ale unikają jej z powodu problemów ze wsparciem przeglądarek. To dobrze pokazuje strukturalny problem całego ekosystemu CSS: entuzjazm dla nowo ogłoszonej funkcji regularnie zderza się z niemożnością użycia jej w prawdziwej produkcji, dopóki wsparcie nie dogoni specyfikacji.

Obok Anchor Positioning w tej samej kategorii "chcę, ale nie mogę" znalazły się View Transitions oraz funkcja if(), co sugeruje, że problem nie jest jednorazowy, tylko systemowy. Autorka artykułu wspomina inicjatywę Interop jako coś, co w tej edycji ma pomóc poprawić spójność wsparcia dla właśnie tych, najbardziej pożądanych funkcji, co jest jednym z niewielu konkretnych powodów do optymizmu w tym akapicie.

Drugi ciekawy wątek dotyczy AI: podczas gdy reszta świata web developmentu oddaje coraz więcej kodu modelom, CSS pozostaje twierdzą pisaną ręcznie, przynajmniej na razie. Rozkład odpowiedzi na pytanie o procent kodu CSS generowanego przez AI jest wyraźnie przesunięty w stronę niskich wartości, a komentarze respondentów wprost mówią, że modele po prostu nie radzą sobie jeszcze dobrze z generowaniem dobrego CSS. To ciekawy kontrapunkt do narracji, że AI już wszędzie przejęło pisanie kodu frontendowego.

Sama ankieta jest tylko małym wycinkiem zebranych danych, więc trudno na jej podstawie budować dalekosiężne wnioski, ale te dwa sygnały, frustracja z tempa wsparcia przeglądarek dla najbardziej wyczekiwanych funkcji oraz opór CSS wobec automatyzacji przez AI, są na tyle spójne z tym, co widać w codziennej pracy, że warto je zapamiętać jako punkt odniesienia na kolejny rok.

**Key takeaways:**
- Anchor Positioning to jednocześnie najbardziej pożądana i najbardziej ograniczona przez wsparcie przeglądarek funkcja CSS tego roku
- View Transitions i funkcja if() trafiają do tej samej kategorii frustracji związanej z tempem wsparcia przeglądarek
- CSS pozostaje obszarem pisanym w większości ręcznie, z niskim udziałem kodu generowanego przez AI według respondentów
- Inicjatywa Interop ma poprawić spójność wsparcia dla najbardziej wyczekiwanych funkcji w tej edycji

**Why do I care:** Te dane potwierdzają coś, co czuć w codziennej pracy z CSS od dłuższego czasu: entuzjazm ogłoszeń specyfikacji wyprzedza realną możliwość użycia ich w produkcji o dobrych kilka lat, i to jest prawdopodobnie największy hamulec innowacji w tej warstwie stosu, większy niż jakikolwiek problem samego języka.

**Link:** [State of CSS 2026](https://2026.stateofcss.com/en-US)

## import defer: leniwe wykonanie modułów w ECMAScript

**TLDR:** Propozycja import defer, obecnie na etapie 3 w TC39, pozwala pobrać i połączyć moduł od razu, ale odroczyć wykonanie jego kodu najwyższego poziomu aż do pierwszego odczytu właściwości z przestrzeni nazw, zachowując przy tym w pełni synchroniczne API.

**Summary:** Duża część odczuwalnej powolności aplikacji JavaScript nie bierze się z pobierania kodu, tylko z jego wykonywania. Gdy paczka jest już pobrana, silnik musi przejść przez najwyższy poziom każdego modułu i wykonać kod, który tam jest, co potrafi zjeść sporo milisekund zanim cokolwiek się wyrenderuje, zwłaszcza w dużych aplikacjach. Dynamic import rozwiązuje problem pobierania na żądanie, ale nie dotyka kosztu wykonania, bo jeśli moduł ma drogi kod inicjalizujący, ten kod i tak wykona się w momencie załadowania, niezależnie jak sprytnie go pobrałeś.

Node w świecie CommonJS ma na to prostą sztuczkę, przenosząc require() z góry pliku do wnętrza konkretnej funkcji, bez zmiany sygnatury API tej funkcji, dzięki czemu moduł inicjalizuje się dopiero, gdy funkcja faktycznie zostanie wywołana. ES moduły nie miały dotąd dobrego odpowiednika tej sztuczki bez płacenia ceny: dynamic import zmusza do przepisania kodu na łańcuch obietnic i zamienia dotąd synchroniczną funkcję w asynchroniczną, co jest zmianą API rozchodzącą się przez cały łańcuch wywołań, nie drobnym refaktorem.

Import defer zamyka dokładnie tę lukę. Składnia import defer * as ns z "jakiegoś-modułu" pobiera i podłącza wszystkie zależności od razu, więc błąd sieciowy czy składniowy wychodzi na jaw natychmiast, tak jak przy zwykłym imporcie, ale kod najwyższego poziomu modułu nie uruchamia się, dopóki nie odczytasz czegokolwiek z ns. Ten pierwszy odczyt wykonuje cały moduł synchronicznie, a potem ns zachowuje się jak zwykła przestrzeń nazw. Jest też wersja dynamiczna, import.defer("moduł"), analogiczna do zwykłego import(), przydatna gdy nazwa modułu jest znana dopiero w czasie działania.

Najciekawszy techniczny detal dotyczy top-level await: odczyt właściwości z odroczonej przestrzeni nazw musi pozostać synchroniczny, więc moduł nie może mieć odroczonej ewaluacji, jeśli on sam albo cokolwiek w jego grafie zależności używa top-level await. Silnik eagerly wykonuje tę asynchroniczną część grafu z góry, a odroczeniu podlega tylko czysto synchroniczna reszta. Zmienia się też sposób obsługi błędów: zwykła przestrzeń nazw nie rzuca ponownie błędu ewaluacji przy kolejnym odczycie, ale odroczona przestrzeń nazw rzuca go za każdym razem, co ma sens, bo bez tego zachowanie zależałoby od tego, kto pierwszy dotknął modułu przez zwykły import.

**Key takeaways:**
- import defer pobiera i łączy moduł od razu, ale odracza wykonanie jego kodu do pierwszego odczytu właściwości
- W przeciwieństwie do dynamic import, zachowuje w pełni synchroniczne API, nie wymusza przepisania funkcji na asynchroniczną
- Moduły korzystające z top-level await, oraz ich zależności, są zawsze wykonywane eagerly, nie mogą być odroczone
- Odroczona przestrzeń nazw rzuca błąd ewaluacji przy każdym odczycie, inaczej niż zwykła przestrzeń nazw

**Why do I care:** To jedna z tych propozycji TC39, które nie robią hałasu w mediach społecznościowych, ale realnie rozwiążą konkretny, powtarzalny problem w dużych aplikacjach, gdzie dziś jedyną opcją jest zaakceptowanie kosztu inicjalizacji albo brzydkie przepisanie API na asynchroniczne. Warto już teraz sprawdzić, czy bundler i silnik, na których się opierasz, mają to za flagą, bo Deno i Bun już to domyślnie obsługują.

**Link:** [Introducing Deferred Module Evaluation with import defer](https://nitayneeman.com/blog/introducing-import-defer-in-ecmascript/)

## Twój SPA wycieka pamięć. Zrób soak test

**TLDR:** Backendowe zespoły od lat robią soak testy serwerów, wysyłając ruch przez wiele godzin i porównując zużycie pamięci na końcu z punktem startowym. Autor pokazuje, jak zrobić to samo dla aplikacji jednostronicowych przy pomocy Playwrighta, licznika węzłów DOM i nasłuchiwaczy zdarzeń.

**Summary:** Frontend nigdy nie miał tego problemu, bo kliknięcie linku do nowej strony niszczyło pamięć starej strony, więc nawet gdyby gdzieś siedział wyciek, strona żyła zbyt krótko, żeby urósł do rozmiaru problemu. SPA zmieniły tę zasadę: strona nigdy się nie przeładowuje, więc żaden wyciek nie ma naturalnego resetu, i po wystarczająco długim czasie karta przeglądarki skończy się crashem albo przeładowaniem. Autor przywołuje statyczną analizę pięciuset popularnych repozytoriów React, Vue i Angular z początku 2026 roku, która znalazła, że osiemdziesiąt sześć procent z nich ustawia gdzieś nasłuchiwacz, timer albo subskrypcję i nigdy jej nie usuwa.

Rozwiązaniem jest przeniesienie idei soak testu z backendu na frontend: konstruujesz przepływ użytkownika, który zaczyna się i kończy na tym samym ekranie, i puszczasz go w pętli setki razy w jednej sesji przeglądarki przez Playwrighta. Kilkaset przebiegów zajmuje minuty, nie godziny, bo Playwright klika tak szybko, jak aplikacja nadąża. Chrome DevTools Protocol daje dostęp do liczby węzłów DOM i liczby nasłuchiwaczy zdarzeń, a to właśnie te dwie liczby, nie rozmiar sterty, są tym, co warto asercjonować, bo sterta naturalnie faluje między przebiegami niezależnie od tego, czy coś wycieka.

Diabeł tkwi w szczegółach implementacyjnych, które autor opisuje z detalami wartymi zapamiętania: dwukrotne wywołanie garbage collectora przed odczytem metryk, pięć przebiegów rozgrzewających przed wzięciem baseline'u, żeby jednorazowy koszt pobrania kodu i danych przy pierwszym otwarciu szuflady nie zaburzył porównania. Osobny, większy problem to timery: prawie czterdzieści cztery procent wykrytych w tamtej analizie wycieków to niesprzątnięte setTimeout, a przy pętli testowej trwającej dwie minuty timer ustawiony na trzydzieści sekund odpali się cztery razy zamiast stu dwudziestu razy, jakie zobaczyłby prawdziwy użytkownik przez godzinę. Rozwiązaniem jest podrobienie zegara przeglądarki przez page.clock Playwrighta i symulowanie odpowiedzi sieciowych, żeby skompresować godzinę realnego użycia w kilka minut testu.

Najważniejsza myśl na koniec dotyczy tego, kiedy w ogóle stosować taki test: nie każdy przepływ powinien wracać do tego samego zużycia pamięci, bo scrollowanie kanału, który doładowuje kolejne elementy, z natury ma kończyć się cięższym stanem niż zaczynał. Soak test ma sens tam, gdzie przepływ jest podróżą w obie strony, jak otwarcie i zamknięcie szuflady, albo filtrowanie tabeli i wyczyszczenie filtra. To rozróżnienie ratuje ten pomysł przed staniem się kolejnym bezmyślnie kopiowanym wzorcem testowym.

**Key takeaways:**
- SPA nie mają naturalnego resetu pamięci jak strony przeładowywane, więc małe wycieki kumulują się w czasie życia karty
- Soak test frontendowy powtarza jeden przepływ użytkownika w pętli w Playwright, mierząc liczbę węzłów DOM i nasłuchiwaczy przed i po
- Podrobienie zegara i sieci pozwala skompresować godziny realnego użycia w kilka minut testu, zwłaszcza dla wycieków związanych z timerami
- Test ma sens tylko dla przepływów będących podróżą w obie strony, nie dla scenariuszy z natury akumulujących stan, jak nieskończone scrollowanie

**Why do I care:** To jeden z tych tekstów, który przekłada się na konkretną checklistę do wdrożenia w nocnym pipeline CI już w tym tygodniu, bez potrzeby czekania na nowe narzędzie czy bibliotekę. Skoro Playwright i tak jest w większości projektów, koszt wdrożenia pierwszego soak testu jest naprawdę niski w porównaniu do kosztu klienta zgłaszającego, że aplikacja zwalnia po kilku godzinach otwartej karty.

**Link:** [Your SPA Is Leaking Memory. Soak Test It](https://denodell.com/blog/your-spa-is-leaking-memory-soak-test-it)

## react-native-workers 1.0.0-alpha: prawdziwa wielowątkowość w React Native

**TLDR:** react-native-workers wchodzi w publiczną alfę, przynosząc do React Native model Web Workerów: osobne runtime'y Hermes na własnych wątkach systemowych, komunikujące się przez wiadomości, ze wsparciem dla natywnych modułów, w tym modułów Expo, wewnątrz workera.

**Summary:** React Native od zawsze był jednowątkowy tam, gdzie najbardziej boli: cały JavaScript działa na jednym wątku, więc parsowanie dużego payloadu, hashowanie, kompresja czy zwyczajnie zajęty reducer konkurują o ten sam runtime co interfejs użytkownika. Standardową radą było napisanie natywnego modułu dla każdej ciężkiej operacji, co jest realnym kosztem dla zespołów, które wolałyby po prostu napisać to w JavaScripcie. react-native-workers przynosi dokładnie API Workera znane z przeglądarki, new Worker z pliku albo z inline'owego źródła, z postMessage i onmessage działającymi tak, jak się tego spodziewasz.

Kluczowa różnica względem Reanimated Worklets, o którą pytają wszyscy na starcie, jest fundamentalna: to nie jest zserializowane domknięcie działające na współdzielonym runtime, jak w workletach, tylko osobny, pełny runtime Hermes na dedykowanym wątku systemowym, z własnym event loopem, własnym rejestrem modułów i własnym garbage collectorem ograniczonym domyślnym limitem sterty Hermes na poziomie 256 MB. To dwa różne narzędzia do różnych zadań: worklety świetnie sterują animacjami przez współdzielone wartości, a react-native-workers jest dla sytuacji, w których masz realną pracę do wykonania poza głównym wątkiem, czyli cały graf modułów, nie pojedyncze domknięcie.

Najbardziej ambitna część to dostęp do warstwy natywnej z wnętrza workera. C++ i moduły JSI są dostępne od razu w każdym workerze, natomiast natywne moduły platformy, Javy, Objective-C i TurboModules, są opcjonalne przez flagę nativeModules, bo nie wszystkie z nich są bezpieczne poza głównym wątkiem, i te niebezpieczne są świadomie umieszczone na liście zabronionych. Najciekawszym osiągnięciem jest jednak wsparcie dla modułów Expo wewnątrz workera na obu platformach, gdzie na iOS biblioteka instaluje własny most przekazujący wywołania przez publiczne API AppContext Expo, a na Androidzie buduje prawdziwy, per-workerowy AppContext dzięki temu, że instalacja JNI Expo akceptuje surowy wskaźnik do runtime.

Do tego dochodzą prymitywy do współdzielenia stanu bez kopiowania wszystkiego przy każdej wiadomości: SharedStore jako obserwowalny magazyn klucz-wartość widoczny z każdego runtime, SharedValue dla pojedynczej, obserwowalnej wartości jak procent postępu, oraz SharedBuffer jako surowa współdzielona pamięć z blokadą chroniącą przed rozdarciem danych przy jednoczesnym zapisie i odczycie. Najbardziej eksperymentalna część, Thread API, pozwala tej samej instancji runtime tymczasowo wykonać się na innym wątku, w tym na wątku głównym, bez tworzenia drugiego runtime i bez serializacji, bo domknięcie zachowuje dokładnie te same referencje co przed przeniesieniem, co jest technicznie imponujące, ale świadomie ukryte za osobną flagą właśnie dlatego, że tak łatwo się tym zranić.

**Key takeaways:**
- Każdy worker to osobny, pełny runtime Hermes na dedykowanym wątku, nie zserializowane domknięcie jak w Reanimated Worklets
- Dostęp do natywnych TurboModules i modułów Expo wewnątrz workera jest opcjonalny i wymaga świadomej flagi nativeModules
- SharedStore, SharedValue i SharedBuffer pozwalają współdzielić stan między runtime'ami bez kosztownego kopiowania przy każdej wiadomości
- Eksperymentalne Thread API przenosi wykonanie tego samego runtime między wątkami bez serializacji, kosztem realnego ryzyka błędnego użycia

**Why do I care:** To najpoważniejsza próba realnej wielowątkowości w React Native, jaką widziałem od dawna, i w przeciwieństwie do wielu podobnych projektów ma już macierz kompatybilności testowaną na wielu wersjach React Native i Expo, a nie tylko demo na jednym urządzeniu. Warto śledzić tę bibliotekę, jeśli budujesz coś z realnie ciężką pracą po stronie JS, importer danych, pipeline na urządzeniu, edytor, który nie może się zacinać, ale na etapie alfa trzymałbym to z dala od krytycznej ścieżki produkcji.

**Link:** [react-native-workers 1.0.0-alpha: real multithreading for React Native](https://ammarahm-ed.github.io/react-native-workers/blog/introducing-react-native-workers/)
