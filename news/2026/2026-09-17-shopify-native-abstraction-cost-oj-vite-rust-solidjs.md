---
title: "Shopify wraca do natywnych aplikacji, koszt nadmiernej abstrakcji dla agentów i Rust zamiast Vite"
excerpt: "This Week In React: Shopify porzuca React Native dzięki agentom kodującym, zmierzony koszt nadmiernej abstrakcji w rachunku za AI, oraz oj jako natywny w Ruście zamiennik Vite."
publishedAt: "2026-09-17"
slug: "shopify-native-abstraction-cost-oj-vite-rust-solidjs"
hashtags: "#thisweekinreact #react #reactnative #ai #agents #performance #generated #pl"
source_pattern: "This Week In React"
---

## Shopify wraca z React Native do natywnych aplikacji, bo agenty zmieniły rachunek kosztów

**TLDR:** Shopify, jeden z najbardziej rozpoznawalnych zwolenników React Native od 2020 roku, przechodzi z powrotem na Swift i Kotlin. Powód nie jest techniczny, tylko ekonomiczny: agenty kodujące na tyle potaniły budowanie tej samej funkcji dwa razy, że dawna przewaga współdzielonego kodu przestała się opłacać.

**Summary:** W 2020 roku Shopify wybrał React Native z trzech powodów: żeby nie budować tych samych funkcji dwa razy, pozwolić programistom pracować w całym stosie i mniej czasu spędzać na gonieniu parytetu funkcji między platformami. Te korzyści się materializowały przez lata, ale zmieniła się jedna z założeń: budowanie tej samej funkcji osobno w Swift i Kotlinie przestało być drogie, odkąd agenty potrafią wziąć istniejącą implementację na jednej platformie jako referencję i odtworzyć ją na drugiej. Zespół przetestował to, przepisując część aplikacji Shop w Swift i Kotlinie przy pomocy agentów i był zaskoczony, jak dobrze to zadziałało: agenty pomagały programistom bez doświadczenia w danym stosie wejść w kod, a koszt utrzymania parytetu między platformami spadł drastycznie dzięki współdzielonym specyfikacjom, testom i checkpointom przeglądu.

Wybrali podejście greenfield zamiast stopniowej migracji, bo agenty dobrze radzą sobie z budowaniem funkcji w Swift i Kotlinie na podstawie wersji React Native jako punktu odniesienia, co dało czystą kartkę bez starych ograniczeń. Aplikacja Shop, jedna z najczęściej pobieranych aplikacji zakupowych, przeszła od prototypu do w pełni przepisanej natywnej aplikacji w sklepach w 12 tygodni. Wyniki są konkretne: start na Androidzie skrócił się o 50 procent (z 4433 ms do 2233 ms), stabilność sesji wzrosła z 99,5 do 99,95 procent, a rozmiar aplikacji na Androidzie spadł o 109 MB. Do zbudowania tego bez zalewu nieutrzymywalnego kodu Shopify stworzył system Helix, który dzieli migrację na małe, uporządkowane kroki, z których każdy musi przejść testy, przegląd wizualny, dwóch przeciwstawnych recenzentów kodu i akceptację człowieka, zanim ruszy kolejny krok.

Osobny, praktyczny problem dotyczył szybkości pętli zwrotnej: agenty potrafiły zmieniać kod w sekundy, ale testowanie wyniku na symulatorze zajmowało minuty, bo opierało się na drzewie dostępności i zrzutach ekranu. Shopify rozwiązał to, oddzielając logikę biznesową od UI tak, żeby działała bezgłowo na desktopie i była dostępna dla agentów przez CLI, co pozwoliło iterować w milisekundach zamiast minut bez dotykania symulatora w ogóle.

**Key takeaways:**
- Powodem powrotu do natywnych aplikacji jest zmiana kosztu budowania tej samej funkcji dwa razy dzięki agentom, nie problemy z wydajnością React Native
- Migracja aplikacji Shop zajęła 12 tygodni i dała 50% szybszy start na Androidzie oraz 10-krotną redukcję sesji, które się crashują
- System Helix wymusza małe, weryfikowalne kroki migracji (testy, przegląd wizualny, dwóch recenzentów AI, akceptacja człowieka), żeby uniknąć zalewu niemożliwego do utrzymania kodu wygenerowanego przez agenta

**Why do I care:** To najbardziej konkretny dotąd dowód na to, że agenty realnie zmieniają kalkulację "build once, run everywhere" na rzecz specjalizacji platformowej, a nie tylko przyspieszają pisanie kodu w tym samym stosie. Zanim ktoś potraktuje to jako sygnał końca React Native, warto pamiętać, że to decyzja firmy z setkami inżynierów i własnym systemem typu Helix do pilnowania jakości migracji, więc mały zespół bez takiej infrastruktury prawdopodobnie zapłaci inną cenę za tę samą decyzję.

**Link:** [Native is now the future of mobile at Shopify (2026)](https://shopify.engineering/back-to-native)

## Koszt nadmiernej abstrakcji: zmierzone 30% więcej na rachunku za agenta AI

**TLDR:** Autor zmierzył, ile nadmiarowa abstrakcja w kodzie frontendowym kosztuje w rachunku za agenta AI, budując cztery warianty tej samej aplikacji kalkulatora i uruchamiając na nich 394 przebiegi agenta. Wynik: średnio około 30% więcej, a w najgorszym przypadku aż 5 razy więcej.

**Summary:** Punkt wyjścia to obserwacja, że modele językowe uczyły się kodować na kodzie ludzi, więc odziedziczyły też ludzką skłonność do nadmiernej abstrakcji, przeciwko której już dawno pisali Dan Abramov w "The WET Codebase" i Sandi Metz w "The Wrong Abstraction". Autor zbudował dwie funkcjonalnie identyczne aplikacje kalkulatora w Vite, React i Tailwindzie: jedną z kodem skupionym w jednym miejscu, drugą z 12 dodatkowymi warstwami abstrakcji. Zlecił obu ten sam prosty task, zmianę koloru przycisku "=", i przy tym samym rozmiarze kodu zmierzył 3-krotny wzrost kosztu dla wersji nadmiernie zabstrahowanej, z 2,2-krotnym wzrostem liczby rund odpytywania modelu.

Najciekawszy wynik dotyczy tego, że koszt mocno zależy od zadania. Przy zmianie jednej wartości na liściu drzewa abstrakcji koszt rósł aż 5-krotnie, bo agent musiał przejść przez wszystkie sześć warstw, żeby dotrzeć do sedna. Przy zadaniach przekraczających granice plików kod wolniejszy do przeszukania, przy zadaniach zamkniętych w jednym pliku różnica praktycznie znikała, bo cache kontekstu robił swoje. Autor rozłożył to na 394 przebiegi na czterech wariantach kodu i poprosił model o ekstrapolację na typowy średniej wielkości projekt produkcyjny, uzyskując 40%, co zaokrąglił w dół do konserwatywnych 30%.

Konkretne przykłady tego, czego unikać, obejmują stałą używaną tylko dwa razy zamiast wpisanej wprost wartości, mapowanie tablicy JSX zamiast wypisania elementów wprost gdy lista jest statyczna, fabrykę tworzącą obiekt zamiast bezpośredniego literału obiektowego chronionego przez TypeScript, klasę CSS niedodającą nic ponad to, co komponent już nazywa, hookowanie się w kontekst Reacta z rodzica zamiast z dziecka (co daje jednocześnie kontekst i prop drilling), oraz warstwy tłumaczeniowe zmieniające tylko nazwy bez żadnej logiki.

**Key takeaways:**
- Nadmierna abstrakcja kosztuje średnio 30% więcej w rachunku za agenta AI, a w skrajnym przypadku 5 razy więcej
- Abstrakcje pozostające w jednym pliku są niemal darmowe dla agenta, te przekraczające granice plików są najdroższe
- Autor opublikował własny zestaw reguł no-over-abstraction.md do stosowania w code review i instrukcjach dla agentów

**Why do I care:** To pierwszy tekst, jaki widziałem, który przekłada odwieczny spór "duplikacja czy abstrakcja" na twardą liczbę w walucie, którą każdy dziś rozumie: rachunek za API modelu. Dla architekta to konkretny argument do code review, żeby kwestionować każdą nową warstwę pytaniem "czy to naprawdę trzeba nazwać i ponownie użyć", zamiast domyślnie nagradzać każdą redukcję duplikacji jako dobrą praktykę.

**Link:** [The Cost of Abstraction for Humans and AI Agents](https://ondrejvelisek.github.io/the-cost-of-abstraction-for-humans-and-ai-agents/)

## SolidJS 2.0: sześć małych rzeczy, które razem robią dużą różnicę

**TLDR:** Autor przechodzi przez sześć drobnych usprawnień w Solid 2.0, każde zestawione z odpowiednikiem w React, pokazującym, ile więcej kodu trzeba napisać, żeby osiągnąć to samo.

**Summary:** Najbardziej wymowny przykład dotyczy odpytywania danych o status ładowania: w Solid wystarczy `isPending(user)`, żeby zapytać dowolne reaktywne wyrażenie, czy zależy od trwającej zmiany, podczas gdy w React trzeba osobno śledzić `isPending` z `useTransition` i nie da się w prosty sposób zapytać, czy konkretny stan jest w trakcie aktualizacji. Podobnie optymistyczne aktualizacje w Solid wyprowadzają się bezpośrednio z wywołania API przez `createOptimisticStore`, z mutacjami w stylu `m.push(message)` zamiast tworzenia nowych tablic, a `useOptimistic` w React nie zarządza samym wywołaniem API, więc trzeba ręcznie spinać pobieranie i odświeżanie.

Reszta przykładów dotyczy podobnych drobiazgów: `createSignal(() => props.name)` daje lokalnie nadpisywalny stan pochodny, który resetuje się przy zmianie propsa, bez ręcznego śledzenia poprzedniej wartości jak w Reakcie; opcja `ssrSource: "client"` pozwala przypiąć decyzję "to liczy się tylko w przeglądarce" bezpośrednio do źródła danych zamiast owijać osobny komponent w Suspense; a funkcje serwerowe przez `GET` dają te same ergonomiczne wywołania funkcji dla odczytów, co dla mutacji, podczas gdy React Server Functions są projektowane głównie pod mutacje. Solid 2 dorzuca też ostrzeżenie `STRICT_READ_UNTRACKED` w trybie deweloperskim, gdy ktoś czyta wartość reaktywną poza zakresem śledzenia, więc typowy błąd początkującego zostaje złapany od razu z wyjaśnieniem, a nie ciche niedziałanie aktualizacji.

**Key takeaways:**
- `isPending()` w Solid pozwala zapytać dowolne reaktywne wyrażenie o status ładowania bez osobnego `useTransition`
- `createOptimisticStore` wyprowadza stan optymistyczny bezpośrednio z wywołania API, z mutacjami zamiast kopiowania tablic
- Solid 2 ostrzega w trybie deweloperskim (`STRICT_READ_UNTRACKED`), gdy odczyt reaktywnej wartości nie zostanie zaktualizowany, z konkretną podpowiedzią naprawy

**Why do I care:** To dobry materiał do pokazania zespołowi przyzwyczajonemu wyłącznie do Reacta, że pewne wzorce, które wydają się "po prostu takie są", to w rzeczywistości koszt konkretnego modelu reaktywności, a nie prawo natury. Nie musi to prowadzić do migracji na Solid, ale warto znać te różnice, zanim ktoś zacznie bronić przydługiego boilerplate'u Reacta jako czegoś nieuniknionego.

**Link:** [SolidJS, It's the Little Things](https://www.brenelz.com/posts/solidjs-its-the-little-things/)

## Z 1256 ms do 96 ms: jak wirtualizacja naprawiła INP w liście 1175 marek

**TLDR:** Zespół Subito miał dropdown z listą 1175 marek, który na telefonie z ograniczonym CPU otwierał się ponad sekundę, dając INP na poziomie 1256 ms. Napisali własny hook wirtualizujący listę w 90 liniach kodu i zeszli do 96 ms.

**Summary:** Filtr marki w kategorii butów renderował od razu wszystkie 1175 opcji jako osobne komponenty React z checkboxami, mimo że w danym momencie widać było najwyżej sześć wierszy. Cały ten montaż działał w jednym synchronicznym commicie, blokując przeglądarkę przed przemalowaniem menu i dając wynik w dolnych 6 procentach realnych pomiarów INP u użytkowników. Zamiast sięgać po ciężką bibliotekę wirtualizacji, zespół napisał własny hook mierzący wysokość jednego wiersza po zamontowaniu menu, a potem czystą arytmetykę na tej jednej liczbie, żeby wyliczyć, które indeksy trzeba wyrenderować, z buforem pięciu elementów na wypadek szybkiego przewijania.

Kluczowe zastrzeżenie: technika działa tylko wtedy, gdy wszystkie wiersze mają identyczną wysokość, bo hook mierzy jeden wiersz i zakłada, że pozostałe 1174 są takie same. Zespół mógł sobie na to pozwolić, bo świadomie zaprojektował listę tak, żeby długie nazwy marek obcinały się wielokropkiem zamiast zawijać, a nagłówki grup są zwykłymi wierszami z wcięciem zamiast osobnym stylem wysokości. Autor daje konkretny test do sprawdzenia we własnym projekcie: zebranie zbioru wysokości wszystkich opcji przez `getBoundingClientRect()`, i jeśli wynik to jeden rozmiar, technika się nadaje, a jeśli trzy różne rozmiary, trzeba albo ujednolicić wiersze, albo sięgnąć po TanStack Virtual czy react-virtuoso, które mierzą każdy wiersz z osobna.

**Key takeaways:**
- Montowanie 1175 komponentów naraz w jednym synchronicznym commicie dawało INP na poziomie 1256 ms, sklasyfikowane jako "poor" w dolnych 6% pomiarów
- Wirtualizacja z założeniem jednej wysokości wiersza zmniejszyła liczbę zamontowanych węzłów DOM z ~1175 do 13, a INP spadł do 96 ms
- Technika działa tylko przy jednolitej wysokości wierszy, co wymaga świadomej decyzji projektowej (obcinanie tekstu zamiast zawijania), a nie tylko kodu

**Why do I care:** To konkretna checklist do zastosowania na każdym dropdownie czy liście z ponad setką elementów: sprawdź, co się montuje, sprawdź, czy wiersze mają jedną wysokość, renderuj tylko widoczne elementy. Warto też zapamiętać kompromis: wirtualizacja usuwa elementy poza ekranem z DOM, więc natywne wyszukiwanie przeglądarką (Ctrl+F) ich nie znajdzie, co trzeba świadomie zaakceptować albo zrekompensować własną wyszukiwarką.

**Link:** [From 1,256ms to 96ms: Fixing INP in a Massive React Dropdown](https://dev.to/subito/from-1256ms-to-96ms-fixing-inp-in-a-massive-react-dropdown-16l7)

## Fantomowe zależności w npm: baza 791 pakietów, które kłamią o tym, czego potrzebują

**TLDR:** Menadżer pakietów Nub przeskanował 10 000 najpopularniejszych pakietów npm w poszukiwaniu niezadeklarowanych zależności i znalazł 791 z nich, znacznie więcej niż 142 pokryte przez wieloletnią, słabo utrzymywaną bazę Yarna. Wynik opublikowano jako otwarty pakiet `@nubjs/extensions`.

**Summary:** Problem fantomowych zależności powstaje, gdy pakiet używa czegoś, czego nie deklaruje wprost w `package.json`, co przez lata uchodziło na sucho przy płaskim układzie `node_modules` npm i Yarna, ale zaczyna wybuchać błędem `ERR_MODULE_NOT_FOUND` w miarę jak pnpm i inne menadżery przechodzą na izolowane, bardziej oszczędne układy katalogów. Yarn radził sobie z tym ręcznie utrzymywaną listą `@yarnpkg/extensions`, na której dziś opierają się globalne magazyny wirtualne pnpm v12 i Aube, ale lista dostała zaledwie kilka aktualizacji w ciągu ostatnich trzech lat.

Skan Nuba sklasyfikował każdy znaleziony problem według realnego ryzyka: 341 pakietów ma problem tylko na poziomie plików deklaracji TypeScript (błąd przy sprawdzaniu typów, cichy `any` przy `skipLibCheck`), 114 ma niezadeklarowany import chroniony przez `try/catch`, więc nic się nie psuje, 101 ma niezadeklarowaną zależność frameworkową typu peer, którą trzeba zadeklarować, żeby ścisły linker w ogóle je połączył, a 104 ma prawdziwie zapomnianą zależność, która się wysypie, gdy dana ścieżka kodu faktycznie zostanie wykonana, z 25 przypadkami odtworzonymi realnie pod Yarn Plug'n'Play. Wśród pakietów dotkniętych problemem są esbuild z 204 milionami pobrań tygodniowo, `@babel/parser` ze 173 milionami i Vite ze 132 milionami, więc to nie margines ekosystemu, tylko jego rdzeń.

**Key takeaways:**
- `@nubjs/extensions` pokrywa 791 pakietów z niezadeklarowanymi zależnościami, wobec 142 w wieloletniej bazie `@yarnpkg/extensions`
- Format jest 100% kompatybilny wstecz z `@yarnpkg/extensions`, więc inne narzędzia mogą przełączyć się jedną linijką importu
- Wśród dotkniętych pakietów są esbuild, `@babel/parser` i Vite, czyli fundamenty codziennego tooling'u frontendowego

**Why do I care:** Jeśli zespół rozważa przejście na izolowany układ `node_modules` (pnpm strict, czy podobne), warto sprawdzić tę bazę przed migracją, zamiast odkrywać `ERR_MODULE_NOT_FOUND` na produkcji tydzień po zmianie menadżera pakietów. To też dobry przykład na to, że drobna, nudna infrastruktura (lista fantomowych zależności) potrafi blokować całą klasę migracji, dopóki ktoś nie zainwestuje czasu w jej odświeżenie.

**Link:** [De-phantoming the npm ecosystem](https://nubjs.com/blog/phantom-dependencies-package-extensions)

## Lynx 4.0: agenty generujące UI w czasie rzeczywistym i wsparcie dla składanych telefonów

**TLDR:** Lynx, framework renderujący natywne UI z kodu podobnego do Reacta, wydał wersję 4.0 z możliwością generowania interfejsów bezpośrednio z rozmowy z modelem językowym, dynamicznym tworzeniem elementów w ReactLynx oraz wsparciem dla składanych urządzeń, w tym nowego iPhone'a Duo.

**Summary:** Najciekawszy element to A2UI: agent generuje ustrukturyzowane komunikaty protokołu na podstawie katalogu dostępnych komponentów, a Lynx renderuje je jako natywny interfejs w miarę napływania kolejnych wiadomości, więc UI aktualizuje się progresywnie zamiast czekać na całą odpowiedź modelu. Osobna ścieżka, OpenUI, pozwala opisać interfejs w naturalnym języku i wygenerować deklaratywny program w OpenUI Lang, z reaktywnym stanem przez `$state`, odczytem danych hosta przez `Query()` i akcjami użytkownika przez `Action()`, przy czym każda mutacja musi być wywołana wprost przez akcję użytkownika, nie samą generację. Do tego dochodzi skill `lynx-api-docs`, dający agentom lokalne odniesienie do właściwości i ograniczeń layoutu Lynxa, żeby nie podsuwały konwencji z Weba, których Lynx nie obsługuje.

Poza wątkiem AI, ReactLynx dostaje `createElement` i `cloneElement` znane z Reacta do dynamicznego tworzenia elementów, gdy typ jest znany dopiero w czasie działania, a zunifikowane metadane debugowania (`debug-metadata.json`) łączą mapy źródeł JS i CSS z informacjami debugowania bytecode'u głównego wątku, żeby dało się odtworzyć oryginalny plik źródłowy z produkcyjnego stack trace'u. Wsparcie dla składanych urządzeń, używane już produkcyjnie w TikToku, opiera się na przekazywaniu zmian rozmiaru do Lynxa, który dalej korzysta ze znajomego layoutu Flex i jednostek względnych, więc strona sama dostosowuje się do rozłożenia i złożenia ekranu.

**Key takeaways:**
- A2UI pozwala agentowi generować i progresywnie aktualizować natywny interfejs Lynx wprost z komunikatów protokołu, bez pisania kodu UI
- Skill `lynx-api-docs` daje agentom lokalne odniesienie do API Lynxa, żeby unikać podsuwania konwencji webowych, których framework nie wspiera
- Wsparcie dla składanych urządzeń (już produkcyjne w TikToku) opiera się na przekazywaniu zmian rozmiaru do istniejącego layoutu Flex, bez osobnego API

**Why do I care:** Warto śledzić Lynx jako poligon doświadczalny dla generatywnego UI w praktyce produkcyjnej (TikTok), bo pokazuje inne podejście niż zwykłe "agent pisze JSX": tutaj model generuje ustrukturyzowany protokół, a framework decyduje, jak go wyrenderować bezpiecznie z ograniczonego katalogu komponentów. To bezpieczniejszy wzorzec niż pozwalanie agentowi na dowolny kod wykonywalny po stronie klienta, wart rozważenia wszędzie tam, gdzie UI ma powstawać w czasie rzeczywistym z rozmowy z modelem.

**Link:** [Lynx 4.0: AI-Generated UI, ReactLynx Dynamic Elements, Foldable Device Support, and More Open-Source Elements](https://lynxjs.org/blog/lynx-4-0)

## @shadcn/lint: linter, który tłumaczy agentowi, jak naprawić błąd, a nie tylko że go popełnił

**TLDR:** Zespół shadcn/ui wypuścił linter dla systemów projektowych opartych na Tailwindzie, projektowany pod kątem agentów kodujących. Zamiast standardowego błędu TypeScript mówiącego tylko "ta właściwość nie istnieje", zwraca komunikat tłumaczący, czego użyć zamiast tego, na podstawie konkretnych komponentów, wariantów i motywu danego projektu.

**Summary:** Punktem wyjścia jest porównanie z ograniczaniem propsów przez typy TypeScript: da się ograniczyć `style` na komponencie `Button` do samego marginesu i szerokości, ale błąd kompilatora powie tylko, że `padding` nie istnieje w typie, nie podpowie, jak w ogóle wyśrodkować przycisk. `@shadcn/lint` pozwala zamiast tego zdefiniować kontrakt reguł per komponent, na przykład że `Button` zarządza własnym paddingiem, ale przyjmuje klasy layoutu jak `w-full` czy `mt-*`, z komunikatem błędu podpowiadającym konkretny prop `size` albo margines na rodzicu. Reguły można różnicować per część komponentu, na przykład pozwolić `CardTitle` zmieniać rozmiar tekstu, ale zablokować zmianę wagi czcionki, żeby zachować spójność typograficzną.

Zespół przetestował reguły na ponad 150 przebiegach zadań z różnymi modelami (Sonnet 5, Haiku 4.5, Opus 5, GPT 5.6 Terra i Sol) i niemal każde zadanie osiągnęło zero naruszeń już po jednej rundzie poprawek na podstawie komunikatu lintera. W kontrolowanych przebiegach z Claude naprawianie naruszeń z podpowiedzią lintera kosztowało od 10 do 48 procent mniej niż samo poleganie na regułach opisanych w promptcie czy AGENTS.md, co czyni to bezpośrednim odpowiednikiem tematu kosztu abstrakcji z tego samego numeru newslettera: mniej rund odpytywania modelu oznacza niższy rachunek.

**Key takeaways:**
- `@shadcn/lint` daje komunikaty błędów z konkretną podpowiedzią naprawy opartą na komponentach, wariantach i motywie projektu, nie tylko informację, co jest zabronione
- Reguły (kontrakty) można różnicować per komponent i per jego część, np. pozwolić na zmianę typografii tytułu karty, ale zablokować wagę czcionki
- W testach na ponad 150 zadaniach z pięcioma modelami naprawa z podpowiedzią lintera kosztowała 10-48% mniej niż poleganie tylko na regułach w promptcie

**Why do I care:** To konkretny, mierzalny argument za tym, żeby traktować linter jako część infrastruktury agentowej, nie tylko narzędzie do code review dla ludzi, bo dobrze sformułowany komunikat błędu bezpośrednio obniża liczbę rund i koszt naprawy. Dla zespołów budujących własny system projektowy z dużym udziałem agentów w pisaniu UI to gotowy wzorzec: reguła plus komunikat z konkretną alternatywą, zamiast liczenia na to, że model sam zgadnie zamiar z samego typu.

**Link:** [shadcn-ui/lint: An agent-first linter for Tailwind design systems](https://github.com/shadcn-ui/lint)

## oj: natywny w Ruście zamiennik Vite, już zasilający miliony podglądów w Lovable

**TLDR:** Inżynier Lovable zbudował oj, dev server i bundler napisany w Ruście, który czyta istniejący `vite.config.ts` i uruchamia prawdziwe wtyczki Vite bez przepisywania projektu. Na testowej aplikacji z 10 000 komponentów daje 4-krotnie szybszy start na ułamku pamięci, a Lovable wdraża go stopniowo do obsługi około miliona sandboxów dziennie.

**Summary:** Autor zaczął od frustracji: agenty wielokrotnie uruchamiające `vite build` w różnych worktree'ach potrafiły zapychać maszynę pamięcią i swapem. oj to pojedynczy binarny plik w Ruście, zbudowany na rolldown i oxc, czyli tych samych fundamentach, w stronę których zmierza sam zespół Vite, bez potrzeby instalowania Node.js czy toolchaina do projektu. Na syntetycznej aplikacji z 10 000 komponentów oj startuje na zimno w 1211 ms wobec 4917 ms dla Vite, a zużycie pamięci utrzymuje się na poziomie 115 MB wobec ponad 1,5 GB, przy czym ta różnica pamięciowa rośnie wraz z wielkością aplikacji, a nie maleje.

Prawdziwym testem było uruchomienie realnych, popularnych open source'owych aplikacji bez zmiany konfiguracji: Excalidraw wystartował w mniej niż sekundę na 288 MB pamięci wobec 2,4 GB dla Vite, a znacznie większy Twenty (CRM z około 15 000 modułów, zero-runtime CSS-in-JS przez wyw-in-js, mieszanka CommonJS i UMD) wciąż wygrywał czasowo, mimo że serwował moduły pojedynczo zamiast w paczkach zbiorczych jak Vite. Autor jest szczery co do ograniczeń: oj nie hostuje `vite-plugin-checker` (nakładka typów w przeglądarce przez `tsc` w tle), a eksperymentalny cache trwały między restartami wymaga specjalnej obsługi wtyczek trzymających stan w pamięci, jak silnik CSS-in-JS Linarii, bo inaczej zserializowany kod importowałby arkusz stylów, którego wtyczka nigdy nie odtworzyła.

Lovable, gdzie autor pracuje na co dzień, zaczęło wdrażać oj do obsługi podglądów na żywo, bo przy około milionie uruchamianych dziennie piaskownic liczy się każdy megabajt i każda sekunda startu. W kontrolowanym eksperymencie produkcyjnym całkowity czas ładowania podglądu spadł z 17,4 do 8,0 sekundy w medianie, a przygotowanie samej piaskownicy przyspieszyło niemal 5-krotnie, z 14,5 do 3,0 sekundy. Projekt jest teraz open source pod organizacją Lovable na GitHubie, z jawnym zastrzeżeniem, że to wciąż eksperymentalne narzędzie badawcze.

**Key takeaways:**
- oj czyta istniejący `vite.config.ts` i uruchamia realne wtyczki Vite bez przepisywania projektu, dając 4-krotnie szybszy cold start na syntetycznym benchmarku
- Zużycie pamięci to trzecia do ósmej część tego, co zużywa Vite na tych samych aplikacjach (Excalidraw, Twenty), a różnica rośnie wraz ze skalą aplikacji
- W produkcji Lovable czas ładowania podglądu spadł z 17,4 do 8,0 sekundy w medianie po stopniowym wdrożeniu oj do obsługi około miliona sandboxów dziennie

**Why do I care:** To konkretny przykład na to, że koszt narzędzi deweloperskich przestaje być tylko kwestią wygody jednego programisty na jednym laptopie, kiedy skalę zaczynają dyktować tysiące agentów uruchamiających build równolegle w osobnych worktree'ach. Warto śledzić ten projekt, nawet bez migracji, bo pokazuje kierunek, w którym prawdopodobnie pójdzie cały ekosystem Vite (Rolldown, Oxc), a nie tylko izolowaną alternatywę.

**Link:** [Introducing oj: your Rust native replacement for Vite](https://rapha.land/introducing-oj/)
