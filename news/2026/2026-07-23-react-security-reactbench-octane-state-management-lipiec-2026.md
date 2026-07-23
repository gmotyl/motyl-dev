---
title: "Bezpieczeństwo Server Actions, benchmark dla agentów i śmierć bibliotek do zarządzania stanem"
excerpt: "Przegląd tygodnia w React: seria luk bezpieczeństwa w Next.js i React, nowy benchmark ReactBench dla agentów kodujących, kompilator Octane, reaktywność w TanStack Table V9 oraz spór o to, czy Zustand i Redux w ogóle są jeszcze potrzebne."
publishedAt: "2026-07-23"
slug: "react-security-reactbench-octane-state-management-lipiec-2026"
hashtags: "#thisweekinreact #react #reactnative #nextjs #typescript #performance #architecture #state-management #css-in-js #security #generated #pl"
source_pattern: "This Week In React"
---

## Denial of Service w Server Functions

**TLDR:** GitHub Security Advisory GHSA-wx67-qw84-cm4g opisuje lukę odmowy usługi w pakietach react-server-dom-parcel, react-server-dom-turbopack i react-server-dom-webpack. Dotyczy wszystkich wersji React 19 od 19.0.0 do 19.2.7, a łatka trafiła do 19.0.8, 19.1.9 i 19.2.8.

**Summary:** To jeden z tych advisory, które frustrują bardziej formą niż treścią. Sama strona GitHuba, do której odsyła newsletter, zawiera właściwie tylko tabelę wersji: co jest podatne, co jest załatane, i tyle. Żadnego opisu wektora ataku, żadnego CVE w widocznej treści, żadnej wzmianki o tym, czy exploit wymaga dostępu do konkretnego route'a, czy wystarczy standardowe wywołanie Server Function. To akurat typowe dla advisory dotyczących pakietów react-server-dom, bo szczegóły techniczne luk w RSC bywają celowo trzymane pod kluczem, żeby nie dawać gotowego przepisu na atak zanim większość instalacji się załata.

Warto jednak zwrócić uwagę na zakres. Trzy pakiety, które padły ofiarą, to nie przypadkowy dobór: react-server-dom-parcel, react-server-dom-turbopack i react-server-dom-webpack to warstwa serializacji odpowiedzialna za przesyłanie payloadu Server Components między serwerem a klientem, niezależnie od bundlera. Jeśli luka siedzi w tej warstwie wspólnej, dotyczy każdego frameworka opartego na React Server Components, nie tylko Next.js. To pokrywa się z tym, co Next.js opisał osobno w swoim lipcowym security release, gdzie jeden z punktów to właśnie ujawnienie identyfikatorów endpointów Server Function.

Dwadzieścia cztery wersje React na liście podatnych to dużo. Oznacza to, że luka istniała od premiery React 19 aż do teraz, czyli praktycznie przez cały cykl życia tej wersji majorowej. Jeśli ktoś traktował Server Actions jako w pełni dojrzałą, przetestowaną w boju funkcję od dnia zero, ten advisory jest małym otrzeźwieniem: fundamentalne mechanizmy RSC wciąż dostają łatki bezpieczeństwa klasy „High", a nie kosmetyczne poprawki.

**Key takeaways:**
- Luka DoS dotyczy react-server-dom-parcel, react-server-dom-turbopack i react-server-dom-webpack w React 19.0.0-19.2.7
- Załatane wersje to 19.0.8, 19.1.9 oraz 19.2.8
- Advisory nie zawiera opisu technicznego wektora ataku, tylko listę wersji
- Zakres (trzy różne bundlery) sugeruje, że problem tkwi we wspólnej warstwie serializacji RSC

**Why do I care:** Jeśli masz w produkcji cokolwiek z Server Actions, czyli praktycznie każdą aplikację na App Routerze w Next.js albo inny framework oparty na react-server-dom, to jest obowiązkowa aktualizacja, nie temat do przemyślenia na później. Sam fakt, że advisory nie tłumaczy mechanizmu ataku, nie zwalnia z aktualizacji, wręcz przeciwnie: brak szczegółów to często sygnał, że łatwo to odtworzyć.

**Link:** [Denial of Service in Server Functions](https://github.com/react/react/security/advisories/GHSA-wx67-qw84-cm4g)

## July 2026 Security Release (Next.js)

**TLDR:** Next.js załatał osiem luk bezpieczeństwa w jednym skoordynowanym wydaniu, w tym trzy o wysokiej wadze: DoS przez Server Actions w App Routerze, obejście middleware przy Turbopack z pojedynczą lokalizacją i SSRF w rewrites przez kontrolowany przez atakującego hostname. Łatki trafiły do v16.2.11 i v15.5.21.

**Summary:** Osiem CVE w jednym poście to dużo jak na jeden framework, ale forma tego wydania jest ciekawsza niż liczba. Next.js zapowiedział wcześniej przejście na model prezapowiadanych wydań bezpieczeństwa, czyli patche są planowane z wyprzedzeniem tak, żeby zespoły mogły się na nie przygotować zamiast gasić pożar w środku nocy. To dojrzałe podejście, które FAANG-owe zespoły security stosują od dawna, i dobrze, że framework z tak dużym zasięgiem wreszcie to robi formalnie, a nie ad hoc.

Z ośmiu luk trzy zasługują na szczególną uwagę. CVE-2026-64641 to DoS w Server Actions blokujący cały proces przez nadmierne zużycie CPU, co jest wariantem tego samego problemu co advisory z react-server-dom opisane wyżej, tylko na poziomie frameworka. CVE-2026-64642 jest bardziej niepokojące: middleware działający jako proxy bezpieczeństwa (autoryzacja, rate limiting) może zostać całkowicie obejściony w aplikacjach z Turbopackiem i jedną lokalizacją w konfiguracji i18n. To oznacza, że ktokolwiek polegał na middleware jako jedynej warstwie kontroli dostępu, mógł mieć fałszywe poczucie bezpieczeństwa przez jakiś czas. CVE-2026-64645 to klasyczny SSRF przez rewrites, gdzie hostname docelowy budowany jest z danych kontrolowanych przez żądanie, a mechanizm ten omija nawet ograniczenia sufiksu hosta zdefiniowane w regule.

Reszta listy to sprawy średniej wagi, ale nie mniej pouczające: cache confusion przy odpowiedziach z ciałem żądania (dwa osobne CVE za dwa różne warianty tego samego problemu), unbounded payload w Server Actions na Edge Runtime oraz ujawnienie wewnętrznych identyfikatorów Server Function. To ostatnie brzmi niegroźnie, dopóki nie pomyślisz, że ujawnione ID endpointów to gotowa mapa dla kogoś, kto planuje bardziej złożony atak łańcuchowy. Ten wpis czyta się trochę jak przypomnienie, że im więcej logiki przenosimy z klienta na serwer w imię DX, tym więcej klasycznych błędów server-side (SSRF, cache poisoning, DoS) wraca do gry, tylko w nowym opakowaniu.

**Key takeaways:**
- Osiem CVE załatanych jednocześnie w v16.2.11 (Active LTS) i v15.5.21 (Maintenance LTS)
- Middleware bypass przy Turbopack + pojedyncza lokalizacja i18n to najbardziej podstępna z luk (CVE-2026-64642)
- SSRF w rewrites (CVE-2026-64645) i w Server Actions na custom serverach (CVE-2026-64649) pokazują, że kontrola nad hostname docelowym wymaga jawnej walidacji
- Next.js formalnie przeszedł na model prezapowiadanych wydań bezpieczeństwa

**Why do I care:** To bezpośrednie zadanie na dziś rano dla każdego zespołu na App Routerze, zwłaszcza jeśli middleware pełni u was rolę bramki autoryzacyjnej albo macie rewrites budowane dynamicznie. Warto też przy okazji sprawdzić, czy wasze reguły rewrites/redirects w ogóle powinny akceptować dowolny input jako część hostname, bo to jest wzorzec, który wraca regularnie niezależnie od frameworka.

**Link:** [July 2026 Security Release](https://nextjs.org/blog/july-2026-security-release)

## Wprowadzenie ReactBench

**TLDR:** Zespół stojący za React Scan i React Doctor uruchomił ReactBench, benchmark oceniający agentów kodujących na realistycznych zadaniach z prawdziwych repozytoriów React, oceniany nie tylko przez testy behawioralne, ale też przez 400+ reguł statycznego skanera React Doctor. Najlepszy wynik to 53,3% dla GPT-5.6 Terra, a modele Anthropic (Fable 5, Sonnet 5, Opus 4.8) wypadają wyraźnie poniżej czołówki OpenAI w tym konkretnym benchmarku.

**Summary:** Pomysł jest prosty i dobrze trafiony: standardowe testy jednostkowe mówią, czy kod działa, ale nic nie mówią o tym, czy kod jest dobry. Model może wygenerować komponent, który przechodzi wszystkie asercje i jednocześnie ma niestabilne klucze list, efekt bez poprawnej tablicy zależności albo wyciek sekretu do bundla klienckiego. ReactBench łączy więc dwie warstwy oceny: testy behawioralne z ukrytego zestawu (Write React – nowa funkcjonalność, Fix React – refaktoryzacja istniejącego, wadliwego komponentu) oraz przebieg przez React Doctor, deterministyczny skaner z ponad 400 regułami pokrywającymi poprawność, stan i efekty, wydajność oraz dostępność i bezpieczeństwo.

Metodologia budowy zadań jest solidniejsza niż w wielu benchmarkach, które widziałem ostatnio. Z 23 087 kandydujących pull requestów po czterech etapach filtrowania (sygnał React, filtry zadania, przegląd ręczny, walidacja) zostało zaledwie 51 zadań. Każde zadanie musi mieć realny test behawioralny, ślepy commit bazowy dający wynik zerowy i rozwiązanie referencyjne dające wynik maksymalny, a do tego przeszło przez adwersarialnego agenta próbującego oszukać gradera bez realnego rozwiązania zadania. To jest dokładnie ten rodzaj rygoru, którego brakuje w wielu benchmarkach opartych wyłącznie na „przeszedł testy, więc jest dobry".

Same wyniki są ciekawsze niż zwykła tabela liderów. Żaden model nie przekracza 55%, co oznacza, że benchmark jest wciąż daleki od nasycenia, a agenci mylą się częściej niż połowę czasu na realnych zadaniach z prawdziwych repozytoriów. Bardziej niepokojące jest to, co dzieje się po stronie jakości: modele wprowadzają nowe błędy React Doctor w prawie jednej czwartej przypadków, a wśród nowo wprowadzonych problemów aż 77,5% to bugi, łącznie ze znaleziskami bezpieczeństwa. Ciekawy jest też podział niepowodzeń: zadania typu Write zawodzą głównie na niespełnionym zachowaniu (agent po prostu nie zaimplementował tego, o co proszono), a zadania typu Fix zawodzą głównie na nierozwiązanych problemach React Doctor, czyli model naprawia symptom, ale nie przyczynę. To zgadza się z intuicją każdego, kto przeglądał kod wygenerowany przez agenta: refaktoryzacja bywa powierzchowna, nawet gdy testy przechodzą.

Warto też zauważyć coś, co autorzy tylko mimochodem wspominają: benchmark ocenia agentów w konkretnych harnessach (Codex CLI, Claude Code, Cursor, Gemini CLI), a nie modele w izolacji. Różnice w harnessie mogą wpływać na wynik równie mocno co sam model bazowy, co czyni porównania między-modelowe trudniejszymi do interpretacji niż wygląda na pierwszy rzut oka. Autorzy też uczciwie przyznają, że benchmark pokrywa głównie open-source'owe projekty React, więc generalizacja na zamknięte, korporacyjne bazy kodu jest niepewna.

**Key takeaways:**
- ReactBench łączy testy behawioralne z pinowanym skanerem React Doctor (400+ reguł) jako drugą oś oceny
- Najlepszy wynik to 53,3% (GPT-5.6 Terra), żaden model nie przekracza 55%, benchmark jest daleki od nasycenia
- 77,5% nowo wprowadzonych problemów w kodzie generowanym przez agentów to bugi, w tym znaleziska bezpieczeństwa
- Zadania Write zawodzą na niespełnionym zachowaniu, zadania Fix zawodzą na nierozwiązanych problemach jakości kodu
- Benchmark ocenia całe harnessy agentowe, nie same modele w izolacji, co utrudnia czyste porównania

**Why do I care:** To praktyczne narzędzie do kalibrowania oczekiwań wobec agentów kodujących w realnych projektach React, nie tylko materiał do debaty akademickiej. Jeśli w zespole rozważacie, ile pracy przekazać agentowi bez przeglądu, ten benchmark daje konkretne liczby zamiast anegdot, i sugeruje, że automatyczny lint jakości kodu (a nie tylko testy) powinien być częścią waszego CI dla PR-ów generowanych przez AI.

**Link:** [Introducing ReactBench](https://www.reactbench.com/blog)

## TSRX w TanStack Start: co nam się podoba i trzy zgłoszone błędy

**TLDR:** Zespół JXD przetestował TSRX, następcę JSX kompilującego się do React z prawdziwą kontrolą przepływu (if, for, switch jako instrukcje) i lokalnymi stylami, wewnątrz TanStack Start. Po stronie klienta oceniają go jako wyraźny zysk, ale SSR ma realne szwy, dla których zgłosili trzy błędy w upstream.

**Summary:** TSRX rozwiązuje coś, co każdy, kto pisał nietrywialny komponent JSX, znał na pamięć: JSX to wyrażenie, nie instrukcja, więc każdy warunek kończy jako trójargumentowy operator, każda lista jako .map(), a stylowanie ląduje w osobnym pliku CSS Modules albo template stringu. TSRX znosi to ograniczenie: elementy JSX są instrukcjami, więc if, for, switch i try działają jak normalny kod, a blok <style> siedzi obok znaczników, które stylizuje. Przykład z listą użytkowników i statusami pokazany w artykule jest przekonujący: w czystym JSX potrzeba trzech artefaktów (komponent, tabela lookup, moduł CSS), w TSRX to jeden plik, jedna funkcja.

Co ciekawe, autorzy nie sprzedają tego wyłącznie jako wygody dla człowieka. Twierdzą, że współlokacja struktury, stylów i logiki ma znaczenie dla modeli generujących kod, bo informacja istotna dla zmiany siedzi blisko siebie, a nie rozproszona pomiędzy tabelą lookup, osobnym .map() i modułem CSS. Zauważyli mniej halucynowanego prop-drillingu przy generowaniu komponentów TSRX przez Claude Code. To akurat pasuje do ogólnego trendu, w którym narzędzia projektowane pod kątem czytelności dla ludzi zaczynają być projektowane też pod kątem czytelności dla agentów, i szczerze mówiąc, ciekawe będzie zobaczyć, czy to przełoży się na twarde liczby w czymś w rodzaju ReactBench opisanego wyżej.

Sekcja o błędach jest jednak najbardziej wartościowa, bo pokazuje typowy problem integracji nowego narzędzia z istniejącym ekosystemem: SSR CSS znika w trybie dev (blok <style> nie renderuje się w initial HTML podczas vite dev, tylko po hydratacji klienckiej, co daje flash niestylizowanej treści), pliki .tsrx nie mogą być plikami tras (file-walker TanStack Router rozpoznaje tylko ustalony zestaw rozszerzeń), a @try/@catch nie chroni renderowania po stronie serwera, bo error boundaries to mechanizm wyłącznie kliencki. To ostatnie jest szczególnie podchwytliwe: ktoś, kto założy, że @try/@catch działa jak siatka bezpieczeństwa podczas SSR, dostanie zawalenie całego dokumentu zamiast izolowanego fallbacku granicy błędu.

Doceniam, że autorzy potraktowali to jako materiał do zgłoszenia upstream zamiast cichego obejścia i przemilczenia problemu. To dokładnie ten rodzaj pracy, który sprawia, że kolejny zespół nie musi odkrywać tych samych trzech pułapek od zera. Jednocześnie warto zachować pewien dystans: to wciąż wczesny etap adopcji nowego formatu plików w produkcyjnym stacku, a fakt, że trzeba było zbudować całą aplikację testową „jedna trasa na jedną funkcję języka", żeby wyłapać te błędy, mówi coś o dojrzałości integracji.

**Key takeaways:**
- TSRX pozwala na if/for/switch/try jako prawdziwe instrukcje w JSX oraz lokalne bloki <style>, kompilując się do zwykłego React bez zmiany semantyki runtime
- Integracja z TanStack Start wymaga tylko wtyczki Vite, wtyczki TypeScript i rozszerzenia edytora, bez dodatkowej konfiguracji
- SSR CSS nie renderuje się w trybie dev (tylko w production build), .tsrx nie może być plikiem trasy, a @try/@catch nie chroni renderowania serwerowego
- Wszystkie trzy problemy zgłoszono jako jeden issue w TanStack Router

**Why do I care:** Jeśli eksperymentujecie z TSRX albo podobnymi następcami JSX w produkcyjnym stacku TanStack Start, ta lista trzech pułapek oszczędzi wam dokładnie tyle czasu, ile zajęło ich znalezienie autorom. Dla reszty zespołów to bardziej sygnał kierunku (narzędzia projektowane pod kątem agentowej czytelności kodu), niż coś do wdrożenia jutro w produkcji.

**Link:** [TSRX in TanStack Start: what we like, and three bugs we filed](https://www.jxd.dev/blog/tsrx-tanstack-start)

## Octane, czyli programowy model Reacta skompilowany na sztywno

**TLDR:** Octane to następca Inferno, oferujący hooki, Suspense i actions z Reacta, ale bez wirtualnego DOM, bez zasad hooków i bez ręcznie utrzymywanych tablic zależności, bo kompilator sam wnioskuje, co dany kod przechwytuje. Autorzy publikują benchmarki, w których Octane wypada szybciej niż React, Preact, Solid i Svelte w większości mierzonych scenariuszy.

**Summary:** Sam pomysł nie jest nowy: kompilowanie modelu programowania Reacta bez wirtualnego DOM to coś, co próbowały robić różne projekty od lat, a Octane jawnie deklaruje się jako spadkobierca Inferno. Nowością jest to, jak daleko posunęli zniesienie ograniczeń klasycznych hooków. Przykład z licznikiem w artykule pokazuje hook użyty warunkowo (useEffect wewnątrz if), co w standardowym Reakcie skutkowałoby naruszeniem zasad hooków i nieprzewidywalnym zachowaniem. W Octane sloty są przypisywane po miejscu wywołania, nie po kolejności wywołania, więc warunkowe hooki po prostu działają, a kompilator sam wywnioskuje tablicę zależności zamiast zmuszać programistę do jej ręcznego utrzymywania.

Warstwa renderowania też jest inna: szablony kompilują się do klonowanych węzłów i bezpośrednich zapisów do DOM, a klucze list w @for przesuwają możliwie najmniej węzłów. To brzmi jak typowa obietnica frameworków bez wirtualnego DOM (Svelte, Solid), ale Octane robi ciekawą rzecz w kwestii adopcji: zwykłe pliki .tsx wciąż działają, więc migracja komponent po komponencie jest realna, a nie teoretyczna. OctaneCompat pozwala wstawiać skompilowane wyspy Octane do istniejącej aplikacji React 19 jednym komponentem, z zachowaniem natywnych zdarzeń i realnego kontekstu Reacta przez use(). Jedyna rzecz, która się nie przenosi, to React Server Components, co jest uczciwym zastrzeżeniem, bo RSC to mechanizm głęboko zintegrowany z konkretnym silnikiem Reacta.

Ciekawa jest też odpowiedź na pytanie „dlaczego nie sygnały?". Autorzy argumentują, że framework zbudowany na sygnałach zmusza każdą aplikację do reprezentowania stanu w sposób sygnałowy, podczas gdy Octane trzyma komponenty jako zwykłe funkcje czytane od góry do dołu, a to kompilator wykonuje dodatkową pracę. To rozsądne stanowisko filozoficzne, ale tabela benchmarków pokazuje, że to jest właśnie kompromis: w scenariuszu signal-favoring Octane przegrywa z Solidem i Vue Vapor (0,76× i 0,40× względem Octane jako baseline, czyli te frameworki są szybsze), bo to dokładnie te obciążenia, dla których sygnały zostały zaprojektowane. Trade nadal się opłaca w większości innych scenariuszy, ale nie ma darmowego obiadu, i szkoda, że autorzy nie podkreślają tego mocniej zamiast pisać „trade holds up" ogólnikowo.

Benchmarki zresztą trzeba czytać z przymrużeniem oka niezależnie od tego, jak są prezentowane. To zawsze autor frameworka mierzy swój framework, wybiera zestaw testów i decyduje, co wchodzi do „geomean". Liczby takie jak 12× szybciej niż React w async-waterfall robią wrażenie, ale bez niezależnej replikacji trudno powiedzieć, ile z tego to realna przewaga architektoniczna, a ile dobór testów faworyzujących własne mocne strony.

**Key takeaways:**
- Octane kompiluje model programowania Reacta (hooki, Suspense, actions) bez wirtualnego DOM i bez zasad hooków
- Kompilator sam wnioskuje zależności efektów, memo i callbacków zamiast wymagać ręcznych tablic zależności
- OctaneCompat pozwala na stopniową migrację komponent po komponencie wewnątrz istniejącej aplikacji React 19, poza React Server Components
- Benchmarki własne autorów pokazują przewagę w większości scenariuszy, ale przegraną w obciążeniach zaprojektowanych pod sygnały (Solid, Vue Vapor)

**Why do I care:** To ciekawy sygnał kierunku (kompilator jako zamiennik dyscypliny programisty), ale na tym etapie to eksperyment, nie coś do wdrożenia w produkcji jutro. Warto obserwować, zwłaszcza ścieżkę OctaneCompat dla stopniowej migracji, ale samodzielna weryfikacja benchmarków przed jakąkolwiek decyzją architektoniczną jest obowiązkowa, bo to wciąż liczby publikowane przez twórców narzędzia.

**Link:** [Octane — React's programming model, compiled](https://octanejs.dev/)

## Reaktywność w TanStack Table V9 od środka

**TLDR:** Riccardo Perra opisuje, jak TanStack Table doszedł do architektury, w której reaktywność żyje pod API tabeli, a nie w adapterach na zewnątrz, dzięki wspólnemu kontraktowi Atom/ReadonlyAtom z @tanstack/store. Efekt: zaznaczenie wiersza aktualizuje tylko checkbox i licznik, bez przerenderowania edytorów, filtrów czy paginacji.

**Summary:** Problem opisany na wstępie jest znajomy każdemu, kto budował siatkę danych, która z prostej tabeli urosła do małej aplikacji: jedna kolumna renderuje widget zaznaczenia, inna inline edytor, pasek narzędzi pokazuje licznik zaznaczonych wierszy, a zmiana zaznaczenia jednego wiersza nie powinna przerenderowywać reszty. TanStack Table V8 rozwiązywał to przez stabilną instancję tabeli synchronizowaną z frameworkiem przez setOptions/setState, ale żaden framework nie widział, które konkretnie dane czytało wywołanie w rodzaju table.getRowModel(), nawet jeśli wewnętrzna memoizacja mogła ponownie użyć wyniku. Cały most między odczytem a cyklem renderowania musiał być budowany ręcznie przez adapter z zewnątrz.

Historia dojścia do V9 jest pouczająca sama w sobie, bo pokazuje ewolucję przez kolejne nieudane próby zamiast jednego olśnienia. Adapter Angulara z sygnałami próbował owinąć instancję tabeli w proxy, które leniwie tworzyło computed dla metod get*, ale zasięg reaktywności pozostawał szeroki, bo proxy pokrywało tylko metody osiągalne przez instancję tabeli, a flexRender musiał szeroko przesprawdzać renderowaną treść zamiast podążać tylko za stanem czytanym przez każdy komponent. React Compiler ujawnił dokładnie ten sam problem po swojej stronie: komponent komórki mógł otrzymać stabilną referencję wiersza, podczas gdy row.getIsSelected() zmieniało się pod spodem, a kompilator nie widział stanu ukrytego wewnątrz metody, więc ponownie używał zmemoizowanego JSX.

Rozwiązanie, do którego ostatecznie doszli, jest eleganckie: każdy wycinek stanu funkcji (paginacja, zaznaczenie wierszy, rozmiar kolumn, filtry) dostaje własny reaktywny atom, a table.store agreguje widok stanu dla kompatybilności wstecznej. Kluczowe jest to, że rdzeń zależy tylko od wspólnego kontraktu Atom i ReadonlyAtom, nie od konkretnej implementacji runtime. React implementuje te wywołania atomami z TanStack Store, Angular, Solid i Vue używają swoich natywnych prymitywów reaktywnych i importują wspólne interfejsy Store tylko jako typy, więc te importy znikają ze skompilowanego JavaScriptu. Dodany niedawno adapter dla Embera, korzystający z @tracked i @cached zamiast konwencjonalnego API sygnałów, jest dobrym dowodem na to, że kontrakt faktycznie jest niezależny od implementacji.

Najbardziej wartościowa część artykułu dla mnie to opis granularnego renderowania w Reakcie, który historycznie był najsłabszym ogniwem w tego typu bibliotekach. React nie zbiera odczytów sygnałów podczas renderowania, więc adapter buduje graf tabeli przez @tanstack/react-store, a useTable domyślnie subskrybuje wszystkie zarejestrowane wycinki stanu, co oznacza, że podstawowa tabela nie wymaga jawnego selektora, a React Compiler może obserwować zależność na tym poziomie. Granularne renderowanie jest opt-in przez drugi argument selektora do useTable albo komponent Subscribe, co jest rozsądnym kompromisem: prostota domyślna, precyzja na żądanie tam, gdzie faktycznie boli wydajność.

**Key takeaways:**
- TanStack Table V9 przenosi reaktywność pod API tabeli zamiast zostawiać ją adapterom na zewnątrz
- Każdy wycinek stanu (paginacja, zaznaczenie, rozmiar kolumn, filtry) ma własny reaktywny atom zamiast jednego zagregowanego snapshotu
- Wspólny kontrakt Atom/ReadonlyAtom z @tanstack/store pozwala każdemu adapterowi (Angular, Solid, Vue, Ember, React) dostarczyć własną implementację prymitywów
- Granularne renderowanie w React jest opt-in przez selektor w useTable albo komponent Subscribe

**Why do I care:** Jeśli budujecie lub utrzymujecie złożone siatki danych z wieloma interaktywnymi kolumnami, ten wzorzec (reaktywność pod API, nie w adapterze) to dobra lekcja architektoniczna niezależnie od tego, czy używacie TanStack Table. To też konkretny argument w dyskusji o tym, dlaczego React Compiler czasem nie widzi tego, co widzą frameworki sygnałowe: kompilator potrzebuje, żeby zależności były widoczne na poziomie odczytu, nie ukryte za metodą.

**Link:** [Inside TanStack Table V9 Reactivity](https://tanstack.com/blog/tanstack-table-v9-reactivity)

## Czy potrzebujemy jeszcze bibliotek do zarządzania stanem?

**TLDR:** Inspirowany rozmową z Danem Abramovem, autor rozbiera mechanizmy wewnętrzne Reduxa, Zustanda, Jotai, MobX i Valtio, pokazuje, że wszystkie (poza Jotai) w Reakcie i tak lądują na useSyncExternalStore, i buduje własną, pięćdziesięcioliniową wersję Zustanda od zera. Konkluzja: dla przeciętnej aplikacji server cache, stan URL, stan lokalny i garść kodu, który rozumiesz w całości, wystarczą.

**Summary:** To jeden z tych artykułów, które robią coś rzadkiego: zamiast porównywać biblioteki po API, pokazują ich rzeczywisty kod źródłowy, uproszczony, ale wierny. Redux to pub/sub ze zamkniętą regułą „stan zmienia się tylko przez reducer", co daje serializowalne akcje, a te z kolei dają time-travel debugging w DevTools. Zustand to ten sam mechanizm bez konwencji: dispatch zamienia się w setState, nie ma logu akcji, więc nie ma time-travel, ale cała biblioteka waży około kilobajta. Jotai odwraca kierunek: zamiast jednego store'a, z którego wybierasz wycinki, masz wiele małych atomów budujących graf od dołu, a Jotai śledzi zależności między nimi, uruchamiając twoją funkcję odczytu i obserwując, po co sięga, bez parsowania kodu i bez deklaracji zależności.

Sekcja o MobX i Valtio jest moim ulubionym fragmentem, bo pokazuje mechanizm proxy w akcji: dwadzieścia linii kodu z pułapkami get/set daje automatyczne śledzenie zależności na poziomie właściwości, bez selektorów i bez tablic zależności. System wie, czego używasz, bo obserwował, jak to czytasz. Ale to podejście ma swoje pułapki: destrukturyzacja poza śledzoną funkcją kopiuje zwykłą wartość, a nie referencję obserwowalną, więc komponent nigdy nie usłyszy o aktualizacji. To dokładnie ten rodzaj bugów, które są niewidoczne w code review, dopóki ktoś nie zna mechanizmu pod spodem.

Najciekawszy wniosek artykułu to sekcja „every road leads to useSyncExternalStore". Redux, Zustand, MobX i Valtio, mimo zupełnie różnej filozofii (pub/sub z selektorami kontra proxy z automatycznym śledzeniem), wszystkie ostatecznie dostarczają swoje powiadomienia do Reacta przez ten sam hook, wprowadzony w React 18 właśnie po to, żeby bezpiecznie synchronizować zewnętrzne źródła stanu z konkurencyjnym renderowaniem. Jotai jest tu wyjątkiem świadomym: subskrybuje przez useReducer zamiast przez useSyncExternalStore, żeby zachować time slicing i transitions kosztem tolerowania krótkotrwałej niespójności, przed którą ten hook ma chronić. To niuans, którego większość programistów nigdy nie zauważy, dopóki nie trafi na tearing w konkurencyjnym renderowaniu.

Budowa własnej wersji Zustanda krok po kroku, z każdym kolejnym bugiem (wyścig przy montowaniu, stary domknięty selektor, nieskończona pętla przez niestabilną referencję w snapshotcie), jest pedagogicznie świetna, bo pokazuje dokładnie, dlaczego useSyncExternalStore ma taki kontrakt, jaki ma, a nie inny. Ostateczny wniosek, że dla przeciętnej aplikacji wystarczy poprawnie rozdzielony stan UI (useState), stan serwera (TanStack Query), stan URL (Nuqs) i stan globalny (Context), jest trudny do obalenia, jeśli faktycznie trzymasz się tego podziału. Problem w tym, że w praktyce mało kto się go trzyma konsekwentnie, i to jest dokładnie ten punkt, którego autor nie rozwija: dyscyplina podziału stanu jest trudniejsza niż wybór biblioteki, a artykuł zakłada, że zespół już ją ma.

**Key takeaways:**
- Redux, Zustand, MobX i Valtio ostatecznie dostarczają powiadomienia do Reacta przez useSyncExternalStore, mimo różnych filozofii wewnętrznych
- Jotai świadomie unika tego hooka (subskrybuje przez useReducer), żeby zachować time slicing kosztem tolerowania krótkotrwałej niespójności
- Poprawny podział stanu (UI lokalny, server cache, URL, globalny kontekst) eliminuje potrzebę pełnoprawnej biblioteki do zarządzania stanem w większości aplikacji
- Złożony współdzielony stan kliencki (edytory kolaboracyjne, narzędzia projektowe) wciąż uzasadnia użycie dedykowanej biblioteki

**Why do I care:** To dobry test dla architektury waszej aplikacji: jeśli nie potraficie jasno powiedzieć, który typ stanu (UI, serwer, URL, globalny) obsługuje dany kawałek danych, to macie problem głębszy niż wybór biblioteki. Dla seniorów i architektów to konkretny argument do dyskusji z zespołem o tym, czy Redux albo Zustand w waszym projekcie faktycznie rozwiązują problem, czy tylko dają złudzenie porządku.

**Link:** [Do we need state management libraries anymore?](https://neciudan.dev/do-we-need-state-management-libraries)

## Props, Composers i Providers: wzorzec kompozycji, do którego dochodzimy

**TLDR:** Zespół frontendowy Orus opisuje czterostopniową drabinę kompozycji komponentów React: zwykłe props, komponenty złożone (compound components) ze slotami, Composer czytający kontrakt z zamiennych Providerów oraz podniesiony stan za kontraktem { state, actions }. Zasada jest prosta: zaczynasz na najtańszym szczeblu i wspinasz się tylko wtedy, gdy konkretny ból cię do tego zmusza.

**Summary:** To, co odróżnia ten artykuł od setek innych tekstów o wzorcach kompozycji, to konsekwentne nazewnictwo jako nośnik intencji. Composer i Provider to nie tylko techniczne role, to sygnał dla czytelnika kodu: kiedy widzisz komponent z sufiksem Composer, wiesz, że gdzieś istnieje Provider i że można dodać kolejny; kiedy widzisz zwykłą nazwę, wiesz, że nie ma ukrytego kontekstu do szukania. To drobna rzecz, ale w dużym zespole frontendowym różnica między czytelnym a nieczytelnym kodem często sprowadza się właśnie do takich konwencji.

Przykład z rzędem produktu na drugim szczeblu drabiny jest podręcznikowy: props leading, trailing, trailingSecondary, as, href rosną z każdym nowym ekranem, aż komponent staje się niemożliwy do ogarnięcia, a wciąż nie pozwala na układ, którego props nie przewidziały. Zamiana na sub-komponenty (Item.Root, Item.Media, Item.Content, Item.Actions) daje wywołującemu pełną kontrolę nad układem bez przewidywania każdej kombinacji z góry. To, co szczególnie doceniam, to rozróżnienie między kontekstem jako szczegółem implementacyjnym pojedynczego komponentu (ItemGroupContext, który nigdy nie opuszcza pliku) a kontekstem jako publicznym kontraktem na poziomie funkcji (rungi 3 i 4), mimo że mechanizm (React context) jest identyczny w obu przypadkach. Wielu programistów miesza te dwa poziomy i traktuje każdy Context jako globalny stan, co prowadzi do niepotrzebnej złożoności.

Trzeci szczebel, Composer plus Providery, rozwiązuje konkretny, częsty problem: ta sama prezentacja (lista ofert) musi renderować dane z różnych źródeł (aktywne oferty z jednego zapytania, archiwalne z innego, ładowane leniwie, oraz fixture bez sieci w testach). Zamiast przepychać wybór źródła w dół przez propsy, dzielą komponent wzdłuż kontraktu: Composer nie wie, skąd pochodzą dane, Provider wypełnia kontrakt. Najbardziej przekonujący fragment to test, który po prostu owija Composer w FixtureQuotesProvider bez żadnego mockowania sieci. To jest realny, praktyczny argument za tym wzorcem, nie tylko estetyczny: testowalność jako efekt uboczny dobrej architektury, a nie osobny wysiłek.

Czwarty szczebel, podniesiony stan za kontraktem { state, actions }, jest najbardziej kosztowny i autorzy uczciwie to przyznają: każdy rung jest odwracalny na papierze i uciążliwy do odwrócenia w praktyce, dlatego zaczynają nisko. Sekcja „kiedy nie wspinać się" jest równie wartościowa co reszta artykułu: jednolitość estetyczna to preferencja, nie ból, i kosztuje niepotrzebną indirection; pojedyncze źródło bez alternatywy w zasięgu wzroku to po prostu komponent props przebrany za coś bardziej skomplikowanego. To rzadkie w artykułach o wzorcach, żeby autor równie mocno argumentował, kiedy wzorca NIE stosować, i to jest największa wartość tego tekstu.

**Key takeaways:**
- Cztery szczeble: plain props, compound components ze slotami, Composer + Providers dla zamiennych źródeł danych, podniesiony stan za kontraktem { state, actions }
- Nazewnictwo (Composer, Provider) niesie intencję architektoniczną i ułatwia czytanie kodu bez zgadywania, gdzie jest ukryty kontekst
- Fixture Provider jako pełnoprawne źródło danych (nie tylko scaffolding testowy) daje testowalność bez mockowania sieci
- Autorzy jawnie ostrzegają przed wspinaniem się bez konkretnego, nazwanego bólu: jednolitość estetyczna to preferencja, nie wymaganie

**Why do I care:** To jeden z lepszych praktycznych przewodników po kompozycji, jaki widziałem od dawna, bo skupia się na kosztach każdego kroku, a nie tylko na korzyściach. Dla architektów frontendowych to gotowy język do rozmowy z zespołem o tym, kiedy dodać Context, a kiedy to przedwczesna abstrakcja, plus konkretny przykład na to, że testowalność i architektura komponentów to jedna rozmowa, nie dwie osobne.

**Link:** [Props, Composers, and Providers: the composition pattern we're converging on](https://backstage.orus.eu/react-composition-patterns-at-orus)

## Zaawansowane granice stanu w prawdziwej aplikacji Next.js

**TLDR:** Zbiór realnych przypadków, w których stan React, dane renderowane serwerowo, API przeglądarki, stan URL i cache klienta spotykają się w jednej aplikacji: zamykanie popovera po zmianie trasy, wykrywanie Web Share API przez useSyncExternalStore, wydobywanie reaktywnego stanu z nieskończonego zapytania oraz optymistyczne aktualizacje rozpięte między RSC a TanStack Query.

**Summary:** Autor od razu stawia sprawę jasno: te przykłady nie są zaawansowane, bo hooki są egzotyczne, tylko dlatego, że kilka systemów stanu spotyka się jednocześnie w jednym produkcie. Pierwszy przypadek, zamykanie popovera po zmianie ścieżki, jest pozornie trywialny, ale rozwiązanie jest pouczające: zamiast efektu, autor używa intencjonalnej aktualizacji stanu w fazie renderowania, porównując bieżącą i poprzednią wartość usePathname wewnątrz samego renderu, a nie w useEffect. To jest niuans, który wielu programistów przegapia: efekt zamknąłby popover już po zacommitowaniu renderu ze starą trasą, podczas gdy aktualizacja w fazie renderu jest częścią tego samego przebiegu, który zaobserwował nową ścieżkę.

Przypadek z useSyncExternalStore do wykrycia dostępności Web Share API jest może najbardziej elegancki w całym tekście, bo pokazuje najprostsze możliwe użycie tego hooka: subskrypcja jest no-opem, bo wsparcie przeglądarki jest stabilne po załadowaniu, snapshot serwera zwraca zawsze false. To jest dokładnie przypadek, dla którego ten hook został zaprojektowany: bezpieczna wartość na serwerze, dokładna wartość w przeglądarce. Trudniejszy przypadek to derywowanie „poprzedni/następny" element z nieskończonego zapytania TanStack Query, gdzie zwykły odczyt z queryClient przez getQueriesData jest odczytem, nie subskrypcją, więc gdy użytkownik przewinie listę i doładuje kolejną stronę, nic nie mówi Reactowi, żeby się przerenderował. Rozwiązanie przez InfiniteQueryObserver jako warstwę subskrypcji i useSyncExternalStore jako most do Reacta jest sprytne, ale autor sam przyznaje, że to nie jest wzorzec, po który sięga się od niechcenia.

Najbardziej kontrowersyjny fragment dla mnie to przekazywanie snapshotu RSC do klienckiego kontekstu, na przykładzie stanu autoryzacji WorkOS pobranego przez await withAuth() na serwerze i przekazanego do ClientAuthProvider. Autor sam zaznacza wyraźnie: to nie jest ogólna rekomendacja zarządzania stanem, to wzorzec kompatybilności dla przypadku, gdy źródło prawdy jest wyłącznie serwerowe, a ograniczone poddrzewo klienckie potrzebuje dostępu do odczytu. Ważne zastrzeżenie: ten kontekst nie jest żywym stanem autoryzacji, tylko wartością z momentu renderu serwerowego, więc jeśli użytkownik się wyloguje albo zmieni organizację, kontekst odświeży się dopiero po odświeżeniu albo rewalidacji trasy. To jest dokładnie ten rodzaj pułapki, w którą wpada zespół, który zbyt mocno postawił na to, że aplikacja zostanie statyczna, a potem wymagania się zmieniają.

Ostatni przypadek, optymistyczne „polubienia" rozpięte między RSC a TanStack Query, spina wszystko razem: RSC dostarcza wartość początkową, React przez useOptimistic daje natychmiastową informację zwrotną, TanStack Query zarządza cache klienckim, a serwer utrwala zmianę. Kod jest długi, ale logika jest czysta: aktualizacja optymistyczna, wywołanie serwerowe, potwierdzenie albo rollback, inwalidacja cache dla innych powierzchni klienckich. Główna teza artykułu, że najtrudniejsze błędy pojawiają się, gdy wartość ma dwa domy i żaden nie jest jednoznacznie odpowiedzialny za synchronizację z drugim, jest trafna i uniwersalna, wykraczająca daleko poza Next.js.

**Key takeaways:**
- Aktualizacja stanu w fazie renderu (nie w efekcie) jest właściwym narzędziem do resetowania stanu lokalnego po zmianie zewnętrznego, reaktywnego wejścia jak pathname
- useSyncExternalStore to dobry wybór dla stabilnych po załadowaniu wartości przeglądarki (subskrypcja no-op) i dla mostkowania odczytów cache TanStack Query do reaktywności Reacta
- Przekazywanie snapshotu RSC do klienckiego kontekstu to wzorzec kompatybilności, nie żywa synchronizacja stanu, i wymaga jawnego zaznaczenia tego ograniczenia
- Optymistyczne aktualizacje rozpięte między RSC a klienckim cache wymagają jasnego określenia, kto jest właścicielem wartości w każdym momencie

**Why do I care:** To dokładnie ten rodzaj artykułu, który warto mieć zakładkę w zespole pracującym z App Routerem i RSC na poważnie, bo każdy z tych czterech przypadków to realny problem, na który natraficie prędzej czy później, nie akademicka ciekawostka. Główna lekcja, żeby zawsze umieć wskazać, kto jest właścicielem wartości i kto ma zostać powiadomiony o jej zmianie, to test architektoniczny, który warto stosować przy każdym code review dotyczącym stanu.

**Link:** [Advanced React State Boundaries in a Real Next.js App](https://www.nirtamir.com/articles/advanced-react-questions)

## Sześć lat utrzymywania Linarii nauczyło mnie, dlaczego zbudowałem coś nowego

**TLDR:** Autor Linarii i wyw-in-js (silnika stojącego też za MUI Pigment CSS) opisuje dwa nierozwiązywalne w Linarii problemy: nieprzewidywalny koszt kompilacji styled(Component) i brak pierwszoklasowej kompozycji stylów, i przedstawia dx-styles jako nowy projekt zbudowany, żeby je rozwiązać, z tokenami, wariantami i recepturami jako obywatelami pierwszej kategorii.

**Summary:** To rzadki gatunek tekstu: post-mortem od kogoś, kto spędził sześć lat w okopach jednej biblioteki i decyduje się napisać coś nowego zamiast łatać stare. Runtime CSS-in-JS faktycznie się kończy, styled-components jest w trybie maintenance od 2025, Server Components zrobiły z modelu runtime strukturalny ślepy zaułek, a domyślną radą stało się „po prostu użyj Tailwinda". Autor uczciwie przyznaje, że ta rada jest słuszna dla wielu zespołów, ale nie dla tych, którzy chcą typowanych stylów, tokenów i wariantów żyjących obok komponentów, czyli gałęzi zero-runtime CSS-in-JS.

Dwa problemy, które opisuje jako niemożliwe do naprawienia bez złamania tego, czym Linaria jest, są konkretne i przekonujące. Pierwszy: styled(Component) wygląda jak darmowa kompozycja, ale w praktyce wciąga cały graf zależności owijanego komponentu, ikony, hooki, połowę utilsów, do ewaluacji w czasie budowania, i to jest najczęstszy powód, dla którego statyczna ewaluacja poddaje się i faktycznie uruchamia moduł. Każda łatka wysłana przez lata (jawne wskazówki HOC, dedykowane heurystyki) to plaster na wzorzec, który samo API zachęca do stosowania. Drugi: kompozycja stylów przez fragmenty była proszona przez społeczność od lat, a autor odrzucał to za każdym razem, twierdząc, że fragmenty dodałyby chaos bez adresowania rzeczywistej potrzeby, mimo że warianty, sloty i motywy to fundament, a nie zaawansowana sztuczka w prawdziwym systemie projektowym.

Doświadczenie z Pigment CSS w MUI dało mu naukę o prędkości budowania, która sama w sobie uzasadnia nowy projekt: na greenfieldowym projekcie czas budowania to nawyk formowany od początku, ale gdy migrujesz istniejącą bazę kodu i krok stylowania nagle kosztuje dziesięć razy więcej niż reszta builda, to jest dealbreaker, który autor widział na własne oczy, z buildami trwającymi dziesiątki minut i zużywającymi dziesiątki gigabajtów RAM. To pchnęło wyw-in-js w stronę statycznej ewaluacji: udowodnij, co da się udowodnić w czasie budowania, pomiń całą piaskownicę ewaluacji. Wyniki są, jego słowami, mieszane, ale bazy kodu ewaluowane w pełni statycznie budują się kilkukrotnie szybciej, a wzorzec, który najbardziej niszczy statyczną ewaluację, to dokładnie ten sam styled(Component) z problemu numer jeden.

Najbardziej odważne, i moim zdaniem ryzykowne, stwierdzenie w całym poście dotyczy utrzymania: tracker issues działa na zero otwartych zgłoszeń, bo od października agenci przejęli warstwę żmudnej triage, zamieniając raporty na reprodukcje i bisekcjonując regresje, podczas gdy czas maintainera idzie w faktyczny engineering. To brzmi dobrze w teorii, ale jest jednocześnie ciche przyznanie, że triage prowadzony przez agentów zastępuje pracę, którą kiedyś robił człowiek czytający każdy issue z uwagą, a to nie zawsze jest to samo co „więcej czasu na inżynierię". Ciekawe będzie zobaczyć za rok, czy zero otwartych zgłoszeń oznacza rzeczywiście lepszą jakość obsługi, czy tylko szybsze zamykanie bez pełnego zrozumienia kontekstu zgłaszającego.

**Key takeaways:**
- Dwa nierozwiązywalne w Linarii problemy: koszt kompilacji styled(Component) wciągający cały graf zależności oraz brak pierwszoklasowej kompozycji stylów (wariantów, slotów, tokenów)
- dx-styles kompiluje się do statycznego pliku CSS i zwykłych stringów klas, z recepturami, kontraktami tokenów i opt-in RTL w czasie kompilacji
- Przetestowana na Pigment CSS lekcja: statyczna ewaluacja jest kilkukrotnie szybsza niż fallback na uruchamianie modułu, a styled(Component) najbardziej ją niszczy
- Utrzymanie oparte na triage prowadzonym przez agentów AI to nowy, niesprawdzony jeszcze w dłuższej perspektywie model sustainability dla bibliotek open source

**Why do I care:** Jeśli budujecie system projektowy i wciąż jesteście w gałęzi zero-runtime CSS-in-JS zamiast Tailwinda, ten artykuł to konkretny przewodnik po tym, dlaczego styled(Component) jest architektonicznie problematyczny niezależnie od biblioteki, oraz sygnał, że warto śledzić dx-styles jako alternatywę dla Linarii i Pigment CSS. Dla reszty to ciekawa lektura o granicach utrzymania projektu open source przez jedną osobę, nawet z pomocą agentów.

**Link:** [I've maintained Linaria for six years. Here's why I built something new](https://dx-styles.dev/blog/why-dx-styles/)

## Ile kosztuje klient GraphQL / server-state per żądanie?

**TLDR:** Andrei Calazans zbudował jedną aplikację Expo/React Native sześć razy, z tym samym UI i kontraktem danych, różniącą się tylko warstwą stanu serwerowego (Relay, TanStack Query, RTK Query, Zustand, Jotai, vanilla), i zmierzył realny koszt CPU JS-thread na fizycznym, tanim telefonie z Androidem. Wynik: RTK Query kosztuje 3-4 razy więcej niż Relay czy TanStack Query, a barebone'owe podejścia (Zustand, Jotai) są praktycznie darmowe.

**Summary:** To jeden z tych rzadkich artykułów, gdzie metodologia jest równie ważna co wynik. Jedna aplikacja Expo renderująca ekran rynków w stylu Coinbase, sterowana przez sześć wariantów za jednym wspólnym kontraktem DataLayer, wybieranym przy zimnym starcie przez deep link, więc UI jest bajt w bajt identyczne między wariantami, a jedyna zmienna to maszyneria pod hookami. Pomiar na fizycznym Samsungu Galaxy A16, tanim telefonie z Androidem, zamiast na emulatorze albo flagowcu, to decyzja, która sama w sobie zasługuje na uznanie, bo różnice w koszcie CPU, które są niezauważalne na iPhone 15 Pro, mogą decydować o odczuwalnej responsywności na urządzeniu, które faktycznie kupuje większość użytkowników na rynkach wschodzących.

Autor złapał sam siebie na błędzie metodologicznym po drodze, i uczciwie to opisuje: profiler Hermesa domyślnie zatrzymywał się po 20 sekundach, co obcinało najdłuższy przepływ testowy (około 80 sekund z logowaniem i śledzeniem cen na żywo) i odrzucało większość próbek, dokładnie tych, w których żywe tickery cen trafiały do store'u. Po naprawieniu tego przez przycisk stop na ekranie, zmierzony koszt bibliotek z grubsza się podwoił. To jest dokładnie ten rodzaj szczegółu, który odróżnia rzetelny benchmark od marketingowej tabelki: mierz całe okno, albo w ogóle się nie zawracaj sobie głowy pomiarem.

Same liczby są uderzające. Zsumowany po wszystkich przepływach czas własny biblioteki (samo wykonywanie kodu wewnątrz node_modules danej biblioteki, bez oczekiwania na sieć) to 0ms dla vanilla, 122ms dla Jotai, 277ms dla Zustand, 804ms dla Relay, 904ms dla TanStack Query i 3218ms dla Redux Toolkit Query. Rozkład kosztu w czasie jest jeszcze bardziej wymowny: w najdłuższym przepływie z żywymi tickerami RTK skacze do 1934ms, bo każda aktualizacja ceny przechodzi przez pełny pipeline Reduxa z kopiowaniem przez Immer, podczas gdy Zustand w tym samym przepływie to zaledwie 169ms, bo pojedynczy tick to jedno cienkie setState. Flamegraf Hermesa pokazujący wieże wywołań dispatch → combineReducers → reducer → Immer produce, powtarzające się dla każdej aktualizacji ceny, obok tego samego przepływu w Zustandzie z jednym cienkim paskiem, to najbardziej przekonujący dowód wizualny w całym tekście.

Najważniejsza konkluzja praktyczna, moim zdaniem, to nie ranking bibliotek, tylko rada o trzymaniu danych o wysokiej częstotliwości poza ciężkim store'em: żywe ceny, pozycje kursora, offsety scrolla powinny iść przez minimalny kanał w stylu useSyncExternalStore, a nie przez Immer/reselect czy głębokie strukturalne porównywanie, i to jedna decyzja odpowiada za różnicę między 1934ms a około 40ms kosztu CPU w najcięższym przepływie. Autor też trafnie zauważa pułapkę FPS: wszystkie sześć wariantów utrzymuje 60 klatek na sekundę w tym konkretnym, celowo lekkim harnessie, bo wątek JS jest w większości bezczynny, czekając na sieć, ale w prawdziwej, zajętej aplikacji z wieloma ekranami, animacjami i dostawcami funkcji ten zapas znika, a dodatkowe CPU zjadane przez ciężki klient konkuruje bezpośrednio z renderowaniem i obsługą gestów. FPS wygląda płasko tylko dlatego, że nic innego nie walczy o wątek.

**Key takeaways:**
- Zmierzony na fizycznym, tanim Androidzie koszt CPU per request: Zustand/Jotai praktycznie darmowe, Relay i TanStack Query porównywalne (~0,8-0,9s), RTK Query 3-4 razy droższe (~3,2s)
- Koszt bibliotek server-state koncentruje się na zapisach: każda odpowiedź sieciowa, każdy tick live, każda optymistyczna aktualizacja to zapis do cache
- Dane o wysokiej częstotliwości (żywe ceny, scroll, kursor) powinny iść przez minimalny kanał typu useSyncExternalStore, niezależnie od tego, jakiego klienta używa reszta aplikacji
- 60 FPS w lekkim demie nie dowodzi, że warstwa danych jest darmowa, bo wątek JS ma zapas tylko wtedy, gdy nic innego o niego nie konkuruje

**Why do I care:** To jeden z niewielu benchmarków wydajnościowych, które faktycznie mierzą to, co obiecują mierzyć, z pełną metodologią i publicznym repozytorium do weryfikacji. Dla architektów React Native to konkretna, liczbowa podstawa do decyzji o warstwie danych, zamiast wybierania klienta GraphQL czy stanu po modzie, a rada o oddzielaniu danych o wysokiej częstotliwości od ciężkiego store'u dotyczy każdej aplikacji, nie tylko mobilnej.

**Link:** [What Does a GraphQL / Server-State Client Cost You Per Request?](https://andrei-calazans.com/posts/2026-07-18-cost-of-graphql-client-server-state/)

## Stabilne linting świadome typów w Oxlint

**TLDR:** Zespół Oxc wydał tsgolint v7, silnik lintowania świadomego typów stojący za Oxlint, pokrywający teraz 59 z 61 reguł type-aware z typescript-eslint i działający 12-18 razy szybciej niż ESLint z typescript-eslint na dużych bazach kodu jak VS Code czy TypeORM.

**Summary:** To wydanie jest ciekawe bardziej ze względu na to, jak dojrzała stała się inżynieria wokół tego problemu, niż sam fakt, że lintowanie świadome typów istnieje. tsgolint jest zbudowany bezpośrednio na TypeScript v7, więc jego kompatybilność jest przywiązana do konkretnego wydania TypeScriptu, co autorzy odzwierciedlają w nowym schemacie wersjonowania: v7.0.2000 oznacza patch zero tsgolint dla TypeScript v7.0.2, a każda aktualizacja TypeScriptu resetuje część patcha. To rozsądne rozwiązanie problemu, który dotyka każde narzędzie budowane na szczycie kompilatora: jasność co do tego, która kombinacja wersji faktycznie została przetestowana razem.

Szesnaście nowych reguł od wersji alfa (w tym prefer-nullish-coalescing, no-unnecessary-conditional, consistent-return) domyka lukę do 59 z 61 reguł type-aware z typescript-eslint, co oznacza, że dla zdecydowanej większości projektów migracja z klasycznego ESLint + typescript-eslint na Oxlint + tsgolint jest teraz realna bez utraty pokrycia regułami. Konfiguracja jako kod (typeAware: true, typeCheck: true w oxlint.config.ts) eliminuje potrzebę osobnego wpinania type-checkingu w każdy skrypt pakietu i komendę CI, a opcja --type-check dodatkowo raportuje błędy kompilatora TypeScript obok diagnostyk lintera, dzieląc ten sam program TypeScript zamiast duplikować analizę.

Najbardziej praktyczna nowość to raportowanie czasu per reguła (--debug timings), pokazujące dokładnie, które reguły zjadają najwięcej czasu (unbound-method na 46,5% czasu, no-floating-promises na 28,1% w przykładzie z artykułu). To narzędzie, którego brakowało w klasycznym ESLint od zawsze: bez niego optymalizacja konfiguracji lintera to zgadywanie, z nim to konkretna, mierzalna praca. Liczby przyspieszenia same w sobie robią wrażenie: no-unnecessary-qualifier jest 35 razy szybszy na VS Code dzięki pomijaniu rozwiązywania symboli poza namespace'ami, consistent-return jest 8,6 razy szybszy dzięki odłożeniu rozwiązywania typów do momentu, kiedy jest faktycznie potrzebne.

Tabela porównawcza (83,2s dla ESLint+typescript-eslint kontra 6,96s dla tsgolint na VS Code, czyli 12x; 13,2s kontra 0,75s na TypeORM, czyli 18x) jest przekonująca, ale warto pamiętać, że to porównanie mierzone przez twórców własnego narzędzia na sprzęcie, który sami wybrali (Apple M4 Pro). Nie neguje to realności przyspieszenia, bo architektura oparta na Rust i współdzielony program TypeScript daje fundamentalną przewagę nad architekturą Node.js uruchamiającą osobny proces dla każdej reguły, ale warto samodzielnie zmierzyć na własnej bazie kodu przed migracją całego CI.

**Key takeaways:**
- tsgolint v7 pokrywa 59 z 61 reguł type-aware z typescript-eslint, dodając 16 reguł od wersji alfa
- Nowy schemat wersjonowania (v7.0.2000) jawnie wiąże kompatybilność tsgolint z konkretnym wydaniem TypeScriptu
- Raportowanie czasu per reguła (--debug timings) pozwala mierzyć, a nie zgadywać, które reguły są kosztowne
- Zmierzone przez autorów przyspieszenie to 12-18x względem ESLint + typescript-eslint na dużych bazach kodu

**Why do I care:** Jeśli wasz CI spędza zauważalny czas na type-checkingu w ESLint, to jest konkretny kandydat do migracji z realnym potencjałem przyspieszenia, a nie tylko kolejne „szybsze niż X" bez pokrycia funkcjonalnego. Warto samodzielnie zmierzyć --debug timings przed i po, zamiast ufać wyłącznie liczbom z posta na blogu producenta.

**Link:** [Type-Aware Linting Stable](https://oxc.rs/blog/2026-07-22-type-aware-linting-stable)

## Fetch to za mało

**TLDR:** James Snell argumentuje, że Fetch API, mimo że stało się wspólnym słownictwem dla HTTP w różnych środowiskach uruchomieniowych (Node.js, Deno, Bun, Workers), zostało zaprojektowane dla prostych żądań przeglądarkowych i nie modeluje trailerów, odpowiedzi informacyjnych, pełnodupleksowego strumieniowania, typowanych resetów strumienia ani WebTransport. Proponuje szkic API rozszerzającego Request/Response o te możliwości zamiast zastępowania Fetch.

**Summary:** Ten tekst zasługuje na uwagę, bo dotyka problemu, który większość programistów frontendowych nigdy nie widzi, ale który dotyka każdego autora frameworka i każdej platformy edge. JavaScript przez lata nie miał wspólnego słownictwa dla HTTP: Node.js miał http.request() z callbackami, Deno i Bun powiedziały „użyjmy po prostu fetch()", Cloudflare Workers zrobiły to samo. Konwergencja jest realna, ale niedokładna: środowiska serwerowe przyjęły typy Request/Response/Headers, ale nie model bezpieczeństwa przeglądarki, więc te same typy zachowują się różnie w zależności od tego, gdzie działają, bo każde środowisko inaczej zdecydowało, które części specyfikacji przeglądarkowej zachować, a które odrzucić.

Opis czterech osobnych modułów HTTP w Node.js (node:http, node:https, node:http2, node:quic), z których każdy ma inny model programowania po stronie klienta i serwera, jest chyba najbardziej przekonującym argumentem w całym tekście za tym, że problem jest realny, a nie akademicki. Jeśli piszesz framework, który ma wspierać wszystkie trzy wersje protokołu, potrzebujesz osobnych adapterów dla trzech różnych modeli obiektowych, a kolejna wersja protokołu to czwarty adapter. Fakt, że Deno, Bun i Workers zainwestowały ciężko w kompatybilność z API Node.js zamiast wymyślać coś nowego, mówi wprost, czego programiści faktycznie chcą: przenośnego kodu, nie kolejnego unikalnego API na każdą platformę.

Lista brakujących możliwości (trailery, odpowiedzi informacyjne jak 103 Early Hints, pełnodupleksowe strumieniowanie, typowane resety strumienia, priorytet, rozszerzone CONNECT, niepewne datagramy, Structured Fields) jest techniczna, ale sekcja o WebTransport wybija się jako najbardziej konkretny przykład tego, dlaczego model żądanie/odpowiedź w ogóle przestał wystarczać. WebSocket daje pojedynczy, uporządkowany kanał wiadomości, co działa dla czatu, ale nie dla gry wieloosobowej czy strumieniowania mediów, gdzie duża wiadomość blokuje mniejsze za sobą, a zgubiony pakiet zatrzymuje cały strumień na czas retransmisji TCP. WebTransport daje wiele niezależnych strumieni i niepewne datagramy oparte na QUIC DATAGRAM frames, bez całej złożoności WebRTC (ICE, STUN/TURN, DTLS, SCTP). To jest dokładnie ten rodzaj argumentu, który przekonuje inżyniera, a nie tylko entuzjastę specyfikacji: konkretny przypadek użycia (aktualizacja pozycji gracza sprzed 200ms jest gorsza niż jej brak), nie abstrakcyjna kompletność protokołu.

Szkic API zaproponowany na końcu (dwa handlery, fetch dla żądanie/odpowiedź i connect dla wszystkich protokołów tunelowych, plus rozszerzenia na standardowych typach zamiast ich zastępowania) jest rozsądny właśnie dlatego, że autor jasno mówi, kto tego naprawdę potrzebuje: nie przeglądarki, nie proste API JSON, tylko środowiska serwerowe, brzegowe i proxy, które siedzą w środku protokołu i muszą obsłużyć wszystko naraz. Uczciwe zastrzeżenie na końcu, że większość aplikacji HTTP nigdy nie będzie potrzebować trailerów, kapsuł czy typowanych resetów, i że to jest w porządku, ratuje ten tekst przed typowym grzechem propozycji standardów: przekonaniem, że każdy powinien się przejmować twoim niszowym problemem. WinterTC zaczynało od zdefiniowania podzbioru API webowych dla środowisk nieprzeglądarkowych, ale autor słusznie zauważa, że podzbiór to za mało, skoro serwery potrzebują możliwości, których API przeglądarkowe nigdy nie miały modelować.

**Key takeaways:**
- Fetch API konwergowało jako wspólne słownictwo HTTP między runtime'ami, ale bez wspólnego modelu bezpieczeństwa ani pełnego pokrycia możliwości protokołu
- Cztery osobne moduły HTTP w Node.js (http, https, http2, quic) mają różne modele programowania po stronie klienta i serwera
- Brakujące możliwości to trailery, odpowiedzi informacyjne, pełnodupleksowe strumieniowanie, typowane resety strumienia, priorytet i rozszerzone CONNECT (WebSocket, WebTransport, MASQUE)
- Zaproponowany szkic API rozszerza Request/Response zamiast je zastępować, z osobnym handlerem connect() dla wszystkich protokołów tunelowych

**Why do I care:** Dla większości frontendowców to odległy problem infrastrukturalny, nie coś, co zmieni wasz poniedziałkowy sprint. Ale jeśli piszecie framework, middleware albo cokolwiek działającego na wielu runtime'ach jednocześnie (Node.js, Workers, Deno, Bun), to jest dokładnie ten rodzaj tekstu, który wyjaśnia, dlaczego wasze adaptery per-runtime są nieuniknione dzisiaj i co mogłoby je wyeliminować w przyszłości, jeśli propozycja tego typu faktycznie trafi do specyfikacji.

**Link:** [Fetch Is Not Enough](https://www.jasnell.me/posts/fetch-is-not-enough)
