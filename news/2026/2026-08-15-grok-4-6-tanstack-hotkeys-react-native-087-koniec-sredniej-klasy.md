---
title: "Grok 4.6, porządek w skrótach klawiszowych i zanikająca klasa średnia w programowaniu"
excerpt: "Ten numer ui.dev łączy premierę Grok 4.6, nowy pakiet TanStack Hotkeys, React Native 0.87 oraz dwa teksty o tym, jak agenci AI zmieniają pracę inżyniera i sposób pisania o kodzie."
publishedAt: "2026-08-15"
slug: "grok-4-6-tanstack-hotkeys-react-native-087-koniec-sredniej-klasy"
hashtags: "#uidev #ai #react-native #css #ux #engineering #generated #pl"
---

## Grok 4.6 i wyścig o "wystarczająco mądry, ale tani"

**TLDR:** xAI wypuściło Grok 4.6, model mocno ukierunkowany na długo trwające zadania agentowe i budowanie całych aplikacji od pomysłu do działającego prototypu. Według opublikowanych benchmarków model dogania GPT-5.6 Sol, jest wyraźnie tańszy i szybszy, choć te liczby pochodzą głównie od samego producenta.

**Podsumowanie:** xAI opisuje Grok 4.6 jako model, który lepiej niż poprzednik radzi sobie z utrzymaniem kontekstu przez wiele kroków, czy to przy przeszukiwaniu nieznanej domeny, analizie danych, pracy na całym repozytorium, czy przy zamianie pomysłu na produktu w konkretny, działający artefakt. Trening obejmował dłuższy etap wstępny z wyselekcjonowanymi danymi syntetycznymi, dane inżynieryjne wysokiej jakości oraz poprawiony optymalizator, a później regenerację trajektorii SFT przy użyciu Grok 4.5 z odfiltrowaniem błędnych śladów. Model trenowano też na szerokim zestawie zadań agentowego uczenia ze wzmocnieniem, od ogólnego programowania po optymalizację jąder systemowych i projektowanie wspomagane komputerowo.

Na wykresach porównawczych Grok 4.6 osiąga wynik 61 punktów w AA Intelligence Index, co stawia go blisko GPT-5.6 Sol Max (61) i przed Grok 4.5 High (56), przy czym najwyższy wynik w tym zestawieniu ma model o nazwie Fable 5 Max (62). W poszczególnych benchmarkach, takich jak CursorBench, DeepSWE czy Terminal-Bench, wyniki są bardziej zróżnicowane, a różnice między modelami sięgają czasem kilkunastu punktów procentowych w obie strony. Model jest dostępny od razu w Cursorze i w Grok Build, a cena zaczyna się od 2 dolarów za milion tokenów wejściowych i 6 dolarów za milion wyjściowych, z opcją szybszego wariantu za podwójną stawkę.

Ciekawsze od samych liczb są obserwacje praktyków. Eric Zakariasson z zespołu Cursora zauważył, że długie, rozwlekłe polecenia w stylu "postaraj się bardziej" nie działają na tym modelu tak dobrze jak krótkie prompty z jasno określonymi preferencjami. Skuteczniejsze okazało się też formułowanie zadania jako pętli weryfikacji, czyli polecenie w stylu "iteruj i sprawdzaj, aż będzie gotowe do produkcji", zamiast otwartego zadania bez kryteriów końca. Dzięki szybkości i jakości odpowiedzi dało się też pracować bardziej synchronicznie, bez typowego schematu "dodaj kontekst i czekaj", który towarzyszy większości sesji z agentami.

Bytes komentuje to zwięźle: to nie jest model, który przesuwa granicę możliwości najdalej, ale kombinacja szybkości, ceny i wystarczającej inteligencji może w praktyce liczyć się bardziej niż kolejny rekord na papierze.

**Kluczowe wnioski:**
- Grok 4.6 celuje w długie zadania agentowe i budowanie aplikacji od zera, nie w rekordowe wyniki pojedynczych benchmarków
- Krótkie prompty z jasnymi preferencjami i formuła "iteruj i weryfikuj, aż będzie gotowe" dają lepsze rezultaty niż otwarte polecenia
- Cena zaczyna się od 2 dolarów za milion tokenów wejściowych, czyli wyraźnie poniżej stawek modeli z górnej półki
- Benchmarki producentów warto czytać z dystansem, bo konkurencyjne wyniki są dobierane i prezentowane wybiórczo

**Dlaczego mnie to obchodzi:** Cena i szybkość to dla mnie ważniejsze zmienne niż kolejny punkt w Intelligence Index, bo w codziennej pracy z agentem liczy się to, ile iteracji mogę odpalić w ciągu godziny, a nie czy model wygrywa o dwa punkty w jednym teście. Obserwacja o krótkich promptach z jasnymi preferencjami pokrywa się z tym, co sam widzę: im bardziej precyzyjnie opiszę ograniczenia, tym mniej czasu tracę na poprawianie wyniku. Formuła "iteruj i weryfikuj" zamiast otwartego zadania to zresztą dobra rada niezależnie od modelu, bo wymusza na agencie sprawdzanie własnej pracy zamiast ślepego brnięcia dalej.

**Link:** [Introducing Grok 4.6](https://x.ai/news/grok-4-6)

## TanStack Hotkeys, czyli skróty klawiszowe wreszcie jako dane, a nie zbiór ifów

**TLDR:** Rodzina TanStack urosła o Hotkeys, framework-agnostyczną bibliotekę do obsługi skrótów klawiszowych z wbudowanym pojęciem zakresu, gramatyki gestów i bindingów jako danych użytkownika, a nie sztywno wpisanych w kod kombinacji klawiszy.

**Podsumowanie:** Punktem wyjścia biblioteki jest obserwacja, że ten sam klawisz potrzebuje adresu, bo skrót może znaczyć jedno globalnie, coś innego wewnątrz edytora i nic, gdy użytkownik po prostu wpisuje tekst. Zamiast globalnego nasłuchu na zdarzenia klawiatury, Hotkeys wprowadza jawne zakresy, dzięki czemu kontekst, w jakim skrót ma zadziałać, staje się częścią jego definicji, a nie czymś, co trzeba ręcznie sprawdzać w handlerze.

Drugim filarem jest to, co dokumentacja nazywa gramatyką gestów. Akord w stylu Mod+Shift+P to tylko jeden typ interakcji, obok niego biblioteka obsługuje sekwencje klawiszy przypominające składnię Vima, gdzie kolejność naciśnięć tworzy małą komendę, oraz przytrzymania klawisza z określonym czasem, gdzie samo trzymanie spacji przez 400 milisekund może być osobnym gestem. To rozróżnienie ma sens, bo w praktyce różne narzędzia developerskie faktycznie mieszają te trzy style i większość bibliotek do skrótów obsługuje dobrze tylko jeden z nich.

Najciekawszy fragment dotyczy custom bindingów. Zamiast trzymać przypisania klawiszy jako stałą w kodzie, Hotkeys traktuje je jako dane użytkownika: da się nagrać gest, znormalizować go do przenośnej definicji, sformatować pod bieżącą platformę i użyć wszędzie tam, gdzie dana komenda się pojawia. To podejście automatycznie rozwiązuje problem różnic między systemami, gdzie Cmd na macOS odpowiada Ctrl na Windows, bez ręcznego mapowania w każdym miejscu aplikacji.

Wreszcie biblioteka stawia na widoczność problemów zamiast cichego ich ukrywania. Konflikty między skrótami, zarezerwowane kombinacje przeglądarki i filtrowanie wejścia podczas pisania w polu tekstowym są jawnie sygnalizowane, więc programista widzi je od razu zamiast odkrywać w zgłoszeniu od użytkownika, że jego skrót nagle przestał działać w Chrome.

**Kluczowe wnioski:**
- Zakresy (scopes) pozwalają temu samemu skrótowi znaczyć coś innego globalnie, w edytorze i podczas wpisywania tekstu
- Biblioteka obsługuje akordy, sekwencje w stylu Vima oraz przytrzymania klawisza z określonym czasem jako osobne typy gestów
- Bindingi są traktowane jak dane użytkownika, więc da się je nagrywać, normalizować i formatować pod platformę
- Konflikty i zarezerwowane klawisze przeglądarki są widoczne w kodzie zamiast objawiać się dopiero w zgłoszeniach od userów

**Dlaczego mnie to obchodzi:** Skróty klawiszowe to jeden z tych obszarów, które w większości aplikacji robi się na kolanie, bo "to tylko kilka event listenerów", a potem po roku okazuje się, że nikt nie pamięta, dlaczego Escape czasem zamyka modal, a czasem nie. Pomysł, żeby traktować bindingi jako dane, które można nagrać i przenieść między platformami, pasuje do tego, jak w ogóle powinniśmy myśleć o konfigurowalności UI, czyli jako o stanie, a nie o twardo wpisanej logice. Jeśli budujesz coś na wzór edytora albo narzędzia developerskiego, ten pakiet oszczędzi ci osobnej, słabo przetestowanej warstwy do obsługi klawiatury, którą i tak prędzej czy później musiałbyś napisać sam.

**Link:** [TanStack Hotkeys](https://tanstack.com/hotkeys/latest)

## React Native 0.87: surowsze typy, szybszy Metro i życie bez CocoaPods

**TLDR:** React Native 0.87 czyni Strict TypeScript API domyślnym, aktualizuje Metro do wersji 0.87 z szybszymi source mapami i mniejszym zużyciem pamięci, a do tego dodaje eksperymentalne wsparcie Swift Package Managera na iOS i obsługę Android Gradle Plugin 9.

**Podsumowanie:** Największa zmiana dotyczy publicznego API JavaScriptu. Strict TypeScript API, dostępne wcześniej jako opt-in od wersji 0.80, staje się teraz domyślne dla wszystkich projektów. Typy są generowane bezpośrednio z kodu źródłowego React Native zamiast z ręcznie utrzymywanych definicji, co eliminuje rozjazd między dokumentacją typów a rzeczywistym zachowaniem biblioteki. Głębokie importy do wewnętrznych ścieżek w stylu react-native/Libraries stają się teraz błędem typów, co jest zmianą łamiącą kompatybilność w skali całego ekosystemu, choć zespół zostawia tymczasową furtkę: dodanie flagi react-native-legacy-deep-imports w tsconfig.json pozwala wrócić do starych typów aż do wersji 0.88.

Metro, czyli bundler React Native, dostał aktualizację z 0.84 do 0.87, która przynosi generowanie source mapów dwa razy szybsze niż wcześniej, co realnie skraca czas ładowania React Native DevTools, oraz zużycie pamięci mniejsze o połowę dzięki bardziej efektywnemu przechowywaniu map źródeł. Doszła też stabilna obsługa plików konfiguracyjnych w TypeScript i ESM, w tym metro.config.mts, kosztem porzucenia starych formatów .es6 i YAML.

Eksperymentalne wsparcie Swift Package Managera to alternatywa dla CocoaPods na iOS, która korzysta z tych samych prekompilowanych XCFrameworks, jakie React Native już publikuje. Nowa konfiguracja wymaga tylko Xcode, bez Ruby, Bundlera i CocoaPods, a polecenie npx react-native spm --deintegrate wstrzykuje referencje pakietów Swift bezpośrednio do istniejącego projektu Xcode, zamiast go zastępować, więc podpisywanie i uprawnienia zostają nietknięte. CocoaPods pozostaje jednak domyślną i wspieraną ścieżką, a nowy mechanizm trzeba świadomie włączyć.

Do tego dochodzi pierwsza wersja React Native z obsługą Android Gradle Plugin 9, co podnosi minimalne wymagania toolchainu do Node.js 22, Kotlin 2.0 i compileSdk 34. Zespół zaleca na razie wyłączenie wbudowanego Kotlina i nowego DSL API z AGP 9 przez flagi w gradle.properties, dopóki ekosystem w pełni się nie dostosuje.

**Kluczowe wnioski:**
- Strict TypeScript API staje się domyślne, a głębokie importy do Libraries/ są teraz błędem typów, z furtką opt-out do wersji 0.88
- Metro 0.87 generuje source mapy dwa razy szybciej i zużywa o połowę mniej pamięci niż poprzednia wersja
- Swift Package Manager to eksperymentalna alternatywa dla CocoaPods, wciąż opt-in, wymagająca tylko Xcode
- Minimalne wymagania rosną do Node.js 22, Kotlin 2.0 i AGP 9, więc starsze projekty czekają realne prace migracyjne

**Dlaczego mnie to obchodzi:** Zmiana w kierunku typów generowanych z kodu źródłowego to dokładnie to, czego React Native brakowało od lat, bo ręcznie utrzymywane definicje zawsze prędzej czy później rozjeżdżały się z rzeczywistością i psuły zaufanie do podpowiedzi w edytorze. Przejście na Strict API oznacza jednak realną robotę migracyjną dla starszych projektów z głębokimi importami, więc warto zaplanować to jako osobny etap, a nie coś, co zrobi się przy okazji zwykłego bumpa wersji. Eksperymentalne wsparcie SwiftPM traktuję na razie jako ciekawostkę do obserwowania, a nie coś do wdrożenia w produkcyjnym projekcie, bo dopóki CocoaPods jest domyślną ścieżką, ryzyko przy przejściu wcześniej niż reszta zespołu jest po prostu zbyt wysokie.

**Link:** [React Native 0.87 - Strict TypeScript API, Metro Update, Swift Package Manager, AGP 9 Support](https://reactnative.dev/blog/2026/08/11/react-native-0.87)

## Dwa stany w przełączniku trybu ciemnego wystarczą

**TLDR:** Lea Verou przekonuje, że przełącznik motywu w nagłówku strony powinien mieć dwa widoczne stany, a nie trzy, bo użytkownik w danym momencie interesuje się albo dopasowaniem do systemu, albo wymuszeniem przeciwnego motywu, nigdy obiema rzeczami naraz.

**Podsumowanie:** Argument zaczyna się od rozróżnienia między modelem danych a celem użytkownika. Model spokojnie może mieć trzy stany: jasny, ciemny i systemowy, ale to nie znaczy, że interfejs musi je wszystkie pokazywać naraz. Użytkownik nie szuka przełącznika motywu, żeby wyrazić intencję "chcę, żeby zostało tak jak jest", szuka go wtedy, gdy coś przestaje mu pasować, bo strona świeci za mocno w łóżku albo ciemny motyw jest nieczytelny na słońcu. W tym momencie ma dokładnie jeden cel: zmienić to, co teraz widzi, a nie zarządzać ustawieniami na przyszłość.

Z tego wynika konkretna rekomendacja implementacyjna. Dobry dwustanowy przełącznik pokazuje aktualnie rozwiązaną wartość systemową jako swój stan domyślny, ikonę słońca albo księżyca bez zapisanej wartości w localStorage. Dopiero pierwsze kliknięcie zapisuje jawny override na przeciwny motyw, a drugie kliknięcie usuwa ten zapis i wraca do podążania za systemem. Autorka podkreśla jeden szczegół, który większość implementacji psuje: jeśli zapisany override przypadkiem zacznie pokrywać się z ustawieniem systemowym, bo użytkownik zmienił coś w systemie, a nie w witrynie, trzeba tę wartość zostawić w spokoju. Ciche czyszczenie "bo teraz i tak jest to samo" po cichu zamienia świadomy wybór użytkownika w domyślne zachowanie, którego on wcale nie wybrał.

Trójstanowe przełączniki, które pokazują trzy ikony obok siebie albo chowają wybór w rozwijanej liście, mają swój koszt interakcyjny: rozwijana lista zamienia jedno kliknięcie w proces dwuetapowy, a trzy ikony zajmują trzykrotnie więcej miejsca na ekranie bez realnej korzyści dla większości odwiedzających. Jedyne dwa uzasadnione miejsca na trzeci stan to osobny panel ustawień, gdzie użytkownik i tak świadomie podejmuje decyzje na przyszłość, oraz sytuacja, w której jasny motyw wygląda inaczej w zależności od tego, czy system jest w trybie jasnym czy ciemnym, co dziś prawie nikt nie implementuje.

Całość spina zasada, która wykracza poza sam dark mode: nie zalewaj użytkownika opcjami dotyczącymi problemów, których akurat nie ma. Opcja, która może się przydać w przyszłości, powinna pojawić się w tej przyszłości, a nie z góry, na wszelki wypadek.

**Kluczowe wnioski:**
- Model danych może mieć trzy stany, ale interfejs w danym momencie potrzebuje pokazać tylko jeden z dwóch realnych celów użytkownika
- Dobry dwustanowy przełącznik pokazuje aktualnie rozwiązaną wartość systemową, a jawny override zapisuje dopiero po kliknięciu
- Zapisanego override nie wolno kasować tylko dlatego, że przypadkiem zaczął pokrywać się z ustawieniem systemowym
- Trzeci stan ma sens w osobnym panelu ustawień albo gdy jasny i ciemny motyw faktycznie różnią się w zależności od trybu systemu

**Dlaczego mnie to obchodzi:** Ten tekst to dobry przykład na to, że część dyskusji o dostępności opcji w UI toczy się wokół modelu danych, a nie realnego zachowania ludzi, i sam łapałem się na budowaniu przełączników trzystanowych "dla porządku", zamiast zapytać, co użytkownik faktycznie chce w danym momencie osiągnąć. Szczegół o niekasowaniu override'a, gdy przypadkiem zrówna się z systemem, wygląda na drobiazg, ale to dokładnie ten rodzaj detalu, który odróżnia dopracowany komponent od czegoś, co działa tylko w happy path pokazanym na demo. Jeśli budujesz teraz przełącznik motywu od zera, ten artykuł potraktowałbym jako gotową specyfikację, nie jako inspirację do przemyślenia.

**Link:** [Dark mode toggles: two states are enough](https://lea.verou.me/blog/2026/dark-mode-toggles/)

## Pisz dla ludzi, nie dla modelu, który to wygenerował

**TLDR:** Vicki Boykis pisze, że coraz trudniej czytać opisy PR-ów, commity i dokumentację w internecie, bo są generowane przez AI w stylu, który brzmi poprawnie gramatycznie, ale nie niesie żadnej konkretnej treści, i apeluje, żeby wracać do prostszego, bardziej ludzkiego pisania.

**Podsumowanie:** Punktem wyjścia jest osobista obserwacja autorki: nie straciła umiejętności czytania ani rozumienia kodu, ale nawigowanie po repozytoriach jako człowiek staje się coraz trudniejsze, odkąd coraz więcej opisowych artefaktów jest generowanych automatycznie zamiast pisanych ręcznie. Problem nie leży w samym żargonie technicznym, bo żargon między ludźmi na podobnym poziomie wiedzy bywa użytecznym skrótem. "Bumped dependencies" jako opis commita jest w porządku, bo każdy w zespole rozumie, o co chodzi. Problem zaczyna się, gdy ten sam commit zamienia się w rozwlekłe zdanie o "przeprowadzeniu zaplanowanego odświeżenia zależności w ramach bieżących praktyk utrzymaniowych", które teoretycznie mówi to samo, ale wymaga więcej wysiłku, żeby to rozszyfrować, niż zaoszczędziło jego napisanie.

Boykis pokazuje to na przykładzie kilku pojęć z żargonu AI: tokeny to po prostu grupy znaków składające się na słowa, w pełni agentowy workflow to model działający w pętli z wywołaniami narzędzi zewnętrznych, narzędzie to program, który model potrafi wywołać, sandbox to środowisko obliczeniowe z izolacją na poziomie systemu operacyjnego. Post-training to kontynuacja treningu modelu w stronę konkretnego celu, a uczenie ze wzmocnieniem na podstawie ludzkiej informacji zwrotnej to trenowanie modelu przez ludzi rankingujących jego odpowiedzi. Każde z tych pojęć da się wyjaśnić jednym prostym zdaniem, a mimo to teksty generowane przez modele regularnie mnożą przymiotniki i przysłówki zamiast trzymać się tej prostoty.

Najbardziej celny fragment dotyczy motywacji autora takiego tekstu. Model, który wygenerował opis, był trenowany na ukończeniu zdania, a nie na tym, żeby drugi człowiek rzeczywiście to zrozumiał. Jeśli sam autor commita nie przeczytał wygenerowanego opisu przed wysłaniem, trudno oczekiwać, że ktokolwiek inny przeczyta go później, kiedy będzie szukał przyczyny buga sprzed pół roku.

Konkluzja Boykis jest prosta i dość surowa: powinniśmy dążyć do prostoty, a jeśli nam się nie udaje, to możliwe, że sami jeszcze nie rozumiemy problemu na tyle, żeby go skompresować do jednego zdania. Nazywanie rzeczy jest trudne z tego samego powodu, ale to powinno kosztować nas trochę więcej wysiłku niż modelowi, a nie mniej.

**Kluczowe wnioski:**
- Coraz więcej opisów PR-ów, commitów i dokumentacji jest generowanych przez AI i brzmi poprawnie, ale niesie mało konkretnej treści
- Żargon sam w sobie nie jest problemem, jeśli skraca komunikację między ludźmi na podobnym poziomie wiedzy
- Jeśli nie potrafisz streścić czegoś prosto, to sygnał, że sam problem jeszcze nie jest w pełni zrozumiany
- Prosty test przed wysłaniem: czy ty sam przeczytałbyś to, co właśnie automatycznie wygenerowałeś

**Dlaczego mnie to obchodzi:** Sam regularnie łapię się na tym, że skanuję opis PR-a wygenerowany przez agenta i nic mi z niego nie zostaje w głowie, mimo że formalnie jest poprawny i kompletny. To realny koszt, który rzadko ktokolwiek liczy: czas review nie spada wraz z automatyzacją pisania opisów, bo czytający i tak musi sam sobie odtworzyć, co naprawdę się zmieniło. W praktyce zacząłem traktować krótki, ręcznie napisany opis "co i dlaczego" jako część definicji ukończenia zadania, niezależnie od tego, ile kodu napisał za mnie model, bo to jedyny sposób, żeby ktoś inny za pół roku w ogóle chciał to przeczytać.

**Link:** [Write for people](https://vickiboykis.com/2026/08/12/write-for-people/)

## AI usunęło ograniczenie prędkości dla złych decyzji inżynierskich

**TLDR:** Florian Herrengt argumentuje, że agenci AI nie sprawiają, że słabi inżynierowie znikają, tylko pozwalają im generować dużo więcej kodu w krótszym czasie, przez co złe decyzje architektoniczne kumulują się szybciej, niż ktokolwiek jest w stanie je wyłapać i naprawić.

**Podsumowanie:** Tekst zaczyna się od kontrastu między 2020 a 2026 rokiem. Wcześniej senior wracający z urlopu zastawał bałagan w kodzie, ale dało się go ogarnąć, bo tempo, w jakim ludzie mogli wprowadzać zmiany, było ograniczone szybkością pisania. W wersji z 2026 roku ten sam senior w zwykły poniedziałek rano ma siedem PR-ów do review, a jeden z nich zawiera ponad dwadzieścia tysięcy dodanych linii z automatycznie wygenerowanym opisem tego, co rzekomo robi. Zespół wygenerował w ciągu jednego weekendu więcej zmian niż wcześniej podczas kilku tygodni nieobecności jednej osoby.

Autor nazywa to usunięciem ogranicznika prędkości, a nie usunięciem złych decyzji jako takich. Problem w tym, że kod wygenerowany w ten sposób dla niewprawnego oka po prostu działa, więc zespół idzie dalej, dopóki ktoś nie napotka trudnego do odtworzenia buga, a osoba odpowiedzialna za funkcję nie potrafi wyjaśnić, skąd biorą się dane, bo sama najpierw musi zapytać model. Herrengt porównuje to do kupna drogiego samochodu na kredyt: dług jest niewidoczny, widać tylko efektowny produkt końcowy. Odwrócenie takiej decyzji, na przykład dodanych bez potrzeby tabel w bazie danych, jest znacznie trudniejsze niż jej podjęcie, bo wymaga planu migracji i ostrożności, a nie tylko kolejnego prompta.

W dalszej części autor odpowiada na najczęstsze zarzuty, jakie usłyszał po opublikowaniu tego tekstu wcześniej. Na argument "źli inżynierowie zawsze istnieli" odpowiada, że różnicę robi skala szkody możliwej do wyrządzenia w jednym popołudniu, porównywalna do różnicy między kolizją przy 30 a przy 200 kilometrach na godzinę. Na argument "po prostu popraw proces" odpowiada, że code review i testy były projektowane dla świata, w którym wyprodukowanie dużej zmiany było samo w sobie trudne, więc te mechanizmy nie są dostosowane do dziesięciu PR-ów dziennie od jednej osoby. Odpiera też tezę, że więcej wygenerowanego kodu równa się większa produktywność, bo jeśli ktoś generuje dziesięć PR-ów, a trzy inne osoby muszą potem spędzić dwa dni na ich zrozumieniu i poprawianiu, praca została tylko przesunięta na innych, a nie faktycznie przyspieszona.

Konkluzja autora jest dość ostra: rynek będzie płacił coraz więcej dobrym inżynierom, bo AI czyni ich znacznie bardziej produktywnymi, a jednocześnie zatrudnianie słabych inżynierów stanie się droższe, bo szkody, jakie mogą wyrządzić w tym samym czasie, wzrosły nieproporcjonalnie do stawki, jaką się im płaci. Herrengt zaznacza przy tym wyraźnie, że sam korzysta z AI codziennie i nie ma zamiaru wracać do pisania wszystkiego ręcznie, problem widzi w traktowaniu wygenerowanego kodu jako substytutu zrozumienia, a nie narzędzia do jego budowania.

**Kluczowe wnioski:**
- Zły inżynier był kiedyś ograniczony szybkością pisania kodu, dziś jednym promptem wygeneruje dziesiątki tysięcy linii w popołudnie
- Code review i testy powstały dla świata, w którym duże zmiany były drogie w produkcji, więc dziś nie nadążają za skalą zmian
- Liczba PR-ów i linii kodu to słaba miara produktywności, bo koszt zrozumienia zmiany często przenosi się na innych
- Autor spodziewa się rosnącego rozjazdu pensji: dobrzy inżynierowie drożeją, a słabi stają się kosztowni w utrzymaniu mimo niższej stawki

**Dlaczego mnie to obchodzi:** To jeden z tych tekstów, w których każdy fragment dialogu brzmi znajomo, bo sam siedziałem po obu stronach takiej rozmowy, zarówno jako osoba tłumacząca decyzję z konwersacji z modelem, jak i jako osoba próbująca tę decyzję zrozumieć z drugiej strony. Zgadzam się z główną tezą, że problemem nie jest samo AI, tylko traktowanie jego wyjścia jako gotowej decyzji zamiast punktu wyjścia do dyskusji, i że code review zaprojektowane pod świat wolniejszego pisania kodu po prostu nie skaluje się do dziesięciu PR-ów dziennie od jednej osoby. Jeśli jesteś liderem technicznym albo architektem, warto już teraz ustalić w zespole twardą granicę rozmiaru PR-a i wymóg krótkiego, ludzkiego uzasadnienia decyzji architektonicznej, zanim to zrobi za was pierwsza duża awaria produkcyjna.

**Link:** [AI is removing the middle class of software engineering](https://blog.florianherrengt.com/ai-removing-middle-class-software-engineering.html)
