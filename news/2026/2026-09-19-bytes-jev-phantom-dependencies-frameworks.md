---
title: "Bytes: model Jev, fantomowe zależności w npm i pytanie o sens frameworków"
excerpt: "Przegląd tygodnia z Bytes: nowa kategoria modeli AI od TypeSafe, wielka baza fantomowych zależności w npm, React Router 8.4, spór o przyszłość frameworków frontendowych, ściągawka projektowa i wtyczka Claude Code do AGENTS.md."
publishedAt: "2026-09-19"
slug: "bytes-jev-phantom-dependencies-frameworks"
hashtags: "#bytesdev #frontend #ai #react #npm #architecture #generated #pl"
source_pattern: "ui.dev"
---

## TypeSafe AI pokazuje Jev, model zoptymalizowany pod decyzje zamiast pod rozmowę

**TLDR:** TypeSafe AI ogłosiło nową kategorię modeli, System One Models, a pierwszym publicznym przedstawicielem jest Jev, model bez generowania tekstu, za to szybki i tani w podejmowaniu ustrukturyzowanych decyzji.

**Summary:** Diogo Almeida, założyciel TypeSafe i wcześniej badacz w OpenAI pracujący nad instruction tuning dla ChatGPT, zauważył, że modele czatowe od lat są nadludzko dobre w rozmowie, ale słabo nadają się do prostej automatyzacji wewnątrz oprogramowania. Jev odpowiada na ten problem inaczej niż typowe LLM-y: nie generuje ciągów tekstu token po tokenie, tylko w jednym przebiegu zwraca typowane, ustrukturyzowane wartości wraz ze skalibrowanym poziomem pewności. Trening odbywa się metodą, którą TypeSafe nazywa Reinforcement Learning for Calibrated Decisions, czyli optymalizacją pod trafność i uczciwe prawdopodobieństwo odpowiedzi, a nie pod preferencje ludzkich oceniających.

Różnica w liczbach robi wrażenie. Odpowiedź modeli czatowych trwa od kilku do kilkuset sekund, Jev odpowiada w 70-500 milisekund, przy koszcie tokenów wyjściowych bliskim zeru, bo są to wartości ze z góry zdefiniowanego zbioru, a nie wygenerowany tekst. TypeSafe twierdzi przy tym, że Jev z definicji nie popełnia błędów typów, bo dopasowanie do schematu jest gwarantowane matematycznie, a nie sprawdzane po fakcie. W testach na własnych ewaluacjach workflow firma raportuje przewagę rzędu 193-krotnie szybszy i ponad 400-krotnie tańszy wynik względem odniesienia zbudowanego z uśrednionych odpowiedzi najlepszych dostępnych LLM-ów.

TypeSafe samo dorzuca do tego sporo zastrzeżeń: testy prędkości liczono z laptopów na zachodnim wybrzeżu USA, referencyjne prawdopodobieństwa liczono jako średnią z GPT-6 Astra i Fable 5.1, co z definicji faworyzuje modele OpenAI i Anthropic, a próbki workflow przygotowywał zespół TypeSafe, więc trudno mówić o pełnej niezależności benchmarku. Mimo to sam pomysł na kategorię modeli, ma to być "wywołanie funkcji na sterydach", czyli wejście w postaci nieustrukturyzowanego stanu i wyjście w postaci typowanej decyzji z prawdopodobieństwem, jest ciekawą alternatywą dla podpinania pełnoprawnego LLM-a tam, gdzie tak naprawdę potrzeba tylko klasyfikacji, routingu albo oceny.

**Key takeaways:**
- Jev nie generuje tekstu, zwraca wyłącznie typowane, ustrukturyzowane wartości z prawdopodobieństwem.
- Czas odpowiedzi to 70-500 ms wobec kilku do kilkuset sekund dla typowych LLM-ów.
- Koszt tokenów wejściowych to 0,042 USD za milion, wyjście jest darmowe.
- Model z definicji nie popełnia błędów typów, bo wynik zawsze pasuje do zadanego schematu.
- Firma sama przyznaje, że benchmarki mają ograniczenia metodologiczne, referencja liczona jest z modeli OpenAI/Anthropic, a testy prędkości pochodzą z jednej lokalizacji.

**Why do I care:** Dla mnie to potwierdzenie czegoś, co czuć w projektach od dawna: wpychanie GPT-4 czy Claude tam, gdzie wystarczy klasyfikator albo prosty routing, jest marnotrawstwem i źródłem niepotrzebnej niedeterministyczności. Jeśli Jev faktycznie eliminuje błędy typów i skraca czas odpowiedzi z sekund do milisekund, to dla ścieżek w rodzaju "sklasyfikuj zgłoszenie", "oceń ryzyko transakcji" czy "wybierz kolejny krok w agencie" to dokładnie właściwy narzędziowy poziom, na razie ostrożnie, bo to early access jednego dostawcy bez niezależnej weryfikacji, ale kierunek "smart if-statement zamiast LLM-a" wygląda na coś, co za rok będzie standardem w architekturze systemów z AI.

**Link:** [Introducing System One Models & Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev)

## Nub publikuje bazę 791 pakietów npm z ukrytymi zależnościami

**TLDR:** Twórcy menedżera pakietów Nub przeskanowali 10 000 najpopularniejszych pakietów npm w poszukiwaniu niezadeklarowanych zależności i opublikowali wynik jako otwartą bibliotekę @nubjs/extensions, zgodną wstecznie z @yarnpkg/extensions.

**Summary:** Problem jest stary jak flat node_modules: wiele pakietów w rejestrze npm nie deklaruje w package.json wszystkich zależności, których faktycznie używa, zwłaszcza peer dependencies. Przy klasycznym, płaskim układzie katalogów błąd ten latami przechodził bez echa, bo brakujący pakiet i tak trafiał gdzieś wyżej w drzewie i Node go znajdował. Yarn zderzył się z tym przy Plug'n'Play i od lat ręcznie utrzymuje listę takich wyjątków w @yarnpkg/extensions, listę, na której dziś opiera się m.in. globalny magazyn wirtualny w pnpm v12.

Problem w tym, że lista Yarna od trzech lat prawie się nie rusza i pokrywa tylko 142 pakiety. Zespół Nub przeskanował 10 000 najczęściej pobieranych pakietów i znalazł 649 dodatkowych przypadków, co daje łącznie 791 pozycji w nowej bazie @nubjs/extensions. Nie każdy taki brak jest równie groźny: 341 przypadków dotyczy tylko plików deklaracji typów i psuje jedynie type-check, 114 jest bezpiecznie owinięte w try/catch, a 104 to realne, niezabezpieczone importy w głównej ścieżce kodu, z czego 25 udało się odtworzyć jako faktyczny błąd instalacji pod Yarn Plug'n'Play. Wśród pakietów dotkniętych problemem są ciężkie kalibry rynku: esbuild, @babel/parser, vite, next czy vitest.

Nowa paczka jest zaprojektowana jako podmianka jeden do jednego, zachowuje format eksportu packageExtensions, wspiera zarówno CommonJS jak i ESM, więc migracja z @yarnpkg/extensions sprowadza się do zmiany jednej linii importu. Baza aktualizuje się automatycznie, cykliczne odświeżanie rankingu pobrań łapie nowe i rosnące pakiety, a codzienne skany wykrywają zmiany w opublikowanych wersjach.

**Key takeaways:**
- @nubjs/extensions pokrywa 791 pakietów wobec 142 w @yarnpkg/extensions.
- Reguły są sklasyfikowane wg dotkliwości: błąd tylko w typach, bezpieczny fallback, brakujący peer, realny błąd runtime.
- Format eksportu jest identyczny jak w Yarnie, migracja to zmiana jednej linii importu.
- Baza jest utrzymywana automatycznie przez codzienne skany i cykliczne odświeżanie rankingu npm.

**Why do I care:** Każdy, kto migrował projekt z Yarn Classic albo npm na pnpm i trafił na tajemniczy ERR_MODULE_NOT_FOUND w pakiecie, którego nawet nie widać w swoim package.json, zna ten ból. To, że lista Yarna była praktycznie porzucona, a mimo to stała się cichym fundamentem izolowanych node_modules w kilku menedżerach pakietów, mówi dużo o tym, jak kruche bywają założenia, na których stoi cały ekosystem. @nubjs/extensions to nudna, ale realnie przydatna robota w tle, dokładnie taka, jaką lubię widzieć w infrastrukturze narzędziowej.

**Link:** [De-phantoming the npm ecosystem](https://nubjs.com/blog/phantom-dependencies-package-extensions)

## React Router 8.4 ogranicza zbędne rerendery i testuje nowy matcher tras

**TLDR:** React Router 8.4.0 dzieli wewnętrzny kontekst routera na cztery mniejsze konteksty, żeby ograniczyć rerendery, i wprowadza eksperymentalny, dużo szybszy mechanizm dopasowywania tras oparty na @remix-run/route-pattern.

**Summary:** Największa zmiana w tej wersji dotyczy tego, jak komponenty subskrybują stan routera. Dotąd zmiana dowolnego fragmentu stanu, na przykład przejście navigation.state w loading, mogła odświeżyć komponent korzystający wyłącznie z useLocation. Router dzieli teraz ten stan na cztery osobne konteksty: lokalizację (useLocation, useSearchParams, useMatches), stan trwającej nawigacji (useNavigation, useRevalidation), dane z loaderów i akcji (useLoaderData, useActionData) oraz stan fetcherów (useFetcher, useFetchers). Efekt to mniej niepotrzebnych rerenderów w dużych aplikacjach, choć zespół ostrzega, że zmiana narusza kilka niepublicznych eksportów UNSAFE_, więc kod, który się do nich odwoływał, wymaga przeglądu.

Drugą, eksperymentalną nowością jest nowy matcher tras dla Data Mode, oparty na pakiecie @remix-run/route-pattern. Wewnętrzne testy na Chromium pokazują skrócenie czasu nawigacji i zakończenia fetcherów o 19-38% przy 100 trasach i 71-88% przy 1000 trasach, bez uwzględniania sieci i renderowania Reacta. Włączenie flagi future.unstable_routePatternMatching wymaga wcześniejszego wywołania unstable_preloadRoutePattern(), tak aby aplikacje, które nie korzystają z nowego mechanizmu, nie pobierały go niepotrzebnie. Nowość przynosi też pole unstable_validateParams, pozwalające odrzucić dopasowanie trasy, gdy parametr nie przejdzie walidacji wyrażeniem regularnym, i przejść do kolejnej pasującej trasy zamiast zwracać błąd.

Reszta zmian to typowy porządek: poprawka wycieku pamięci w strumieniowaniu po stronie Node, lepsza walidacja adresów w nawigacjach po stronie klienta, naprawiony błąd z ponownym pobieraniem danych fetchera podczas leniwego odkrywania tras oraz doprecyzowanie, że RSC Server Functions trzeba traktować jako publiczny endpoint z własną kontrolą dostępu, a nie coś chronionego samym faktem bycia server function.

**Key takeaways:**
- Router dzieli stan na cztery osobne konteksty, co ma realnie ograniczyć rerendery komponentów.
- Zmiana psuje część niepublicznych eksportów UNSAFE_, warto sprawdzić, czy kod z nich korzysta.
- Nowy, wciąż eksperymentalny matcher tras przyspiesza nawigację nawet o ~80% przy dużej liczbie tras, kosztem dodatkowego pakietu do pobrania.
- unstable_validateParams pozwala walidować parametry trasy regexem i przechodzić do kolejnego dopasowania przy błędzie.

**Why do I care:** Podział kontekstu na cztery części to dokładnie ten typ zmiany, który nie trafia na pierwsze strony, a i tak realnie poprawia wydajność w dużych aplikacjach z rozbudowanym drzewem tras, bo mniej rerenderów oznacza mniej pracy dla Reacta bez zmiany ani jednej linijki kodu aplikacji. Nowy matcher tras jestem ciekaw bardziej z ostrożnością, bo to dodatkowa zależność i osobna ścieżka dopasowania obok istniejącej, ale przy setkach tras w większych projektach różnica 70-80% w czasie nawigacji to coś, co realnie widać w metrykach, nie tylko w benchmarkach na papierze.

**Link:** [React Router changelog v8.4.0](https://reactrouter.com/changelog#v840)

## Czy frameworki frontendowe mają jeszcze sens w erze agentów

**TLDR:** Brooks Lybrand, developer frameworków open source, wcześniej związany m.in. z Remix, zastanawia się, czy w epoce kodowania z asystentami AI frameworki w ogóle mają jeszcze znaczenie, i dochodzi do wniosku, że tak, bo agent, który nie dostanie gotowego frameworka, i tak zbuduje sobie własny, tylko gorzej udokumentowany.

**Summary:** Punktem wyjścia jest popularna dziś teza: skoro modele są już wystarczająco dobre w pisaniu frontendu, a kod frontendowy to głównie warstwa prezentacji, to nie ma sensu wybierać niczego innego niż React, bo modele są na nim najlepiej wytrenowane. Lybrand rozkłada ten argument na czynniki pierwsze i pyta prowokacyjnie: skoro nie liczy się już to, co jest pod maską, to dlaczego w ogóle React, a nie surowe Web Components albo jQuery, które przecież też są świetnie reprezentowane w danych treningowych? Jeśli argument o "modele znają React najlepiej" miałby być decydujący, to konsekwentnie prowadzi donikąd, bo tym samym tokiem rozumowania każda dobrze udokumentowana technologia byłaby równie uzasadniona.

Autor wraca do pytania, co w ogóle daje framework, i formułuje to prosto: framework to abstrakcje, struktura i ograniczenia, które porządkują budowanie strony. Przywołuje przy tym zdanie Ricky'ego Hanlona z zespołu Reacta, że każdy albo używa frameworka, albo buduje własny, a budowanie własnego jest trudne. Lybrand się z tym częściowo nie zgadza: zbudowanie solidnego, bezpiecznego frameworka klasy produkcyjnej faktycznie jest trudne, ale zbudowanie choćby przeciętnego nie jest trudne wcale, bo LLM zrobi to i tak, świadomie czy nie, w trakcie generowania kolejnych funkcji i modułów aplikacji, tylko że taki framework nie ma ani dokumentacji, ani community, ani przetestowanych zabezpieczeń.

Dalej autor przechodzi do konkretów: co z klasycznych narzędzi deweloperskich wciąż ma sens przy pracy z agentem. Hot Module Replacement wciąż pomaga przy dopracowywaniu interakcji UI. TypeScript przestał być głównie narzędziem nawigacji po API dla człowieka, ale jego ograniczenia typów nadal trzymają w ryzach zmiany wprowadzane przez agenta. useEffect, z którym autor czuł się swobodnie jako programista piszący ręcznie, w rękach agenta budzi w nim dużo mniejsze zaufanie. Konkluzja jest umiarkowanie optymistyczna: frameworki mają sens, bo dają agentowi tory, po których się porusza, ale to nie znaczy, że obecne rozwiązania są ostateczne, wciąż jest miejsce na nowe podejścia zbudowane specjalnie pod pracę z agentami.

**Key takeaways:**
- Argument "używajmy Reacta, bo modele go najlepiej znają" prowadzi do wniosku, że powinniśmy równie dobrze używać jQuery, co pokazuje słabość tego rozumowania.
- Framework to abstrakcje, struktura i ograniczenia, agent, który ich nie dostanie, i tak zbuduje sobie własne, tylko bez dokumentacji i testów bezpieczeństwa.
- HMR i typy w TypeScript wciąż mają praktyczną wartość przy pracy z agentem, mimo że motywacja się zmieniła.
- Autor deklaruje wprost nieufność do agentów piszących useEffect, mimo że sam czuł się z nim pewnie jako programista.

**Why do I care:** To jeden z niewielu tekstów o AI w kodowaniu, który nie kończy się ani panicznym "wszystko się zmieni", ani obronnym "nic się nie zmieni". Zgadzam się z główną tezą: jeśli nie dasz agentowi frameworka, on i tak go sobie wytworzy po drodze, tylko rozproszonego po całym repozytorium i bez żadnej dokumentacji, więc pytanie nigdy nie brzmiało "framework czy nie", tylko "czyj framework, mój przetestowany czy losowy wygenerowany przez model tej nocy". Warto to mieć w głowie przy każdej dyskusji w stylu "agent i tak to ogarnie, po co nam architektura".

**Link:** [Do Frameworks Matter Anymore?](https://brookslybrand.com/posts/do-frameworks-matter-anymore/)

## Interfaces publikuje interaktywną ściągawkę z dobrych praktyk UI

**TLDR:** Serwis Interfaces wypuścił darmową, interaktywną ściągawkę z zasad projektowania interfejsów, obejmującą animacje, typografię, dostępność i kolory, z żywymi przykładami "źle vs dobrze" przy każdej regule.

**Summary:** Ściągawka jest podzielona na kilka bloków tematycznych i zamiast opisywać zasady tekstem, pokazuje je na działających komponentach obok siebie w wersji błędnej i poprawnej. Sekcja o animacjach uczy m.in. ustawiania transform-origin zgodnie z miejscem kliknięcia zamiast animowania ze środka elementu, robienia wyjść animacji subtelniejszymi niż wejść, oraz jawnego wypisywania właściwości w transition zamiast używania transition: all, co realnie wpływa na wydajność renderowania.

Część o typografii i kolorze przypomina o rzeczach łatwych do pominięcia: font-variant-numeric: tabular-nums w licznikach i cenach, żeby cyfry nie przesuwały layoutu, text-wrap: balance w nagłówkach i text-wrap: pretty w opisach, czy nazywanie tokenów kolorów po ich przeznaczeniu (--color-accent-solid), a nie po wartości (--blue-500), bo nazwa oparta na wartości traci sens, gdy kolor się zmieni.

Największy blok dotyczy dostępności: prawidłowe etykiety aria-label dla przycisków tylko z ikoną, stylowanie :focus-visible zamiast usuwania obrysu fokusu bez zamiennika, testowanie kontrastu względem faktycznego tła elementu a nie tła całej strony, oraz reguła, żeby nigdy nie blokować wklejania w polach formularzy, bo ludzie wklejają tam hasła i jednorazowe kody. Całość czyta się bardziej jak zbiór wzorców do skopiowania niż teoretyczny wykład o design systemach.

**Key takeaways:**
- Każda zasada ma żywy przykład "źle vs dobrze", nie tylko opis.
- Animacje: transform-origin od miejsca triggera, subtelniejsze wyjścia niż wejścia, jawne właściwości w transition.
- Tokeny kolorów nazywamy po przeznaczeniu, nie po wartości.
- Duży nacisk na dostępność: focus-visible, aria-label na ikonach, kontrast liczony względem realnego tła, brak blokowania wklejania.

**Why do I care:** To dokładnie ten typ zasobu, który warto podpiąć pod pracę z agentem kodującym UI, bo zamiast tłumaczyć modelowi teorię, można wskazać konkretny wzorzec "recommended" i kazać go trzymać. Sam fakt, że trzeba osobno przypominać "nie blokuj wklejania hasła" czy "nie animuj wszystkiego od środka", pokazuje, jak wiele takich detali wciąż umyka nawet doświadczonym zespołom frontendowym, nie tylko modelom.

**Link:** [Interfaces Cheat Sheet](https://interfaces.dev/cheat-sheet)

## Claude Code dostaje wbudowaną wtyczkę do czytania AGENTS.md jak CLAUDE.md

**TLDR:** Anthropic dodał do Claude Code wbudowaną wtyczkę agents-md, która pozwala traktować pliki AGENTS.md tak samo jak CLAUDE.md, z czterema trybami konfiguracji kontrolującymi, które pliki instrukcji są ładowane.

**Summary:** Domyślny tryb, claude-md-or-agents-md, sprawia, że projekt bez własnego CLAUDE.md automatycznie korzysta z plików AGENTS.md, ładowanych dokładnie tam, gdzie trafiłby CLAUDE.md. Jeśli projekt ma choćby jeden CLAUDE.md w drzewie katalogów, wtyczka się wyłącza i nie robi nic, żeby uniknąć podwójnego ładowania instrukcji. Drugi tryb, claude-md-and-agents-md, ładuje oba typy plików jednocześnie, z zabezpieczeniem przed zdublowaniem treści już zaimportowanej przez CLAUDE.md przez @-import. Są też tryby claude-md, zachowujący dotychczasowe zachowanie, oraz managed-only, który odrzuca prywatne i projektowe pliki instrukcji, zostawiając tylko te narzucone centralnie przez organizację.

Mechanizm działa też przy odczycie pojedynczych plików, nie tylko przy starcie sesji: gdy Claude Code czyta plik w podkatalogu, wtyczka dołącza AGENTS.md z katalogów pomiędzy korzeniem projektu a odczytywanym plikiem, o ile nie zostały już wcześniej dołączone i nie są nadpisane lokalnym CLAUDE.md. Ustawienie zmienia się kluczem instructionFiles w konfiguracji pluginConfigs, dostępnym też jako pozycja "Project instructions" w /config, a stara nazwa klucza (projectInstructions) jest nadal honorowana wstecznie, z ostrzeżeniem w transkrypcie, żeby ją zaktualizować.

Dokumentacja wprost wymienia różnice względem natywnej obsługi CLAUDE.md: wtyczka nie reaguje na pliki dołączane przez wzmiankę @ w promptcie ani na pliki otwarte w IDE, nie rejestruje dołączonych plików w stanie sesji więc po kompakcji dociągnie je ponownie przy kolejnym odczycie, a katalogi dodane przez --add-dir nie dostają swoich AGENTS.md, mimo że dostałyby swój CLAUDE.md.

**Key takeaways:**
- Domyślny tryb ładuje AGENTS.md tylko wtedy, gdy projekt nie ma własnego CLAUDE.md gdziekolwiek w drzewie katalogów.
- Tryb claude-md-and-agents-md ładuje oba typy plików naraz, z ochroną przed duplikacją treści.
- Wtyczkę da się całkowicie wyłączyć przez /plugin, wtedy Claude Code wraca do czystej obsługi CLAUDE.md.
- Zachowanie różni się od natywnego CLAUDE.md w kilku miejscach, m.in. przy @-importach spoza katalogu roboczego i przy katalogach z --add-dir.

**Why do I care:** Skoro w tym samym repozytorium mam CLAUDE.md z regułami projektu i osobno konwencję AGENTS.md używaną przez inne narzędzia, ta wtyczka rozwiązuje realny problem utrzymywania dwóch równoległych plików z tymi samymi instrukcjami. Zaskakuje mnie, jak dużo detali trzeba było opisać, żeby zachowanie było przewidywalne, kolejność ładowania, dziedziczenie przy forkach agentów, obsługa kompakcji, co samo w sobie pokazuje, że "po prostu wczytaj dodatkowy plik z instrukcjami" wcale nie jest tak trywialne, jak brzmi.

**Link:** [claude-code/mods/agents-md](https://github.com/anthropics/claude-code/tree/main/mods/agents-md)
