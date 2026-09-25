---
title: "This Week In React #298: koniec bridge'a Rust-Kotlin, Shopify wraca do natywu i krytyczna łatka w Next.js"
excerpt: "React dostaje oficjalne API do preloadu obrazków i eksperymentalne referencje do obiektów we Flight, Next.js łata krytyczną lukę RCE, Shopify migruje swoją flagową aplikację z React Native do natywu za pomocą narzędzia opartego o LLM-y, a dwa teksty o Rust + UniFFI pokazują, ile kosztuje most między Kotlinem a Swiftem."
publishedAt: "2026-09-25"
slug: "this-week-in-react-298-rust-uniffi-shopify-helix-nextjs-security"
hashtags: "#thisweekinreact #react #reactnative #nextjs #react-native #architecture #security #performance #ai #agents #eslint #generated #pl"
source_pattern: "This Week In React"
---

## React doprecyzowuje, jak zachowuje się zwykły `<img>`

**TLDR:** Dokumentacja `react.dev` opisuje teraz dokładnie, kiedy React sam generuje podpowiedź preload dla obrazków podczas renderowania na serwerze i jak `<img>` zachowuje się w trakcie View Transition. To nie jest nowa funkcja, tylko uporządkowanie zachowania, które wcześniej trzeba było wyczytać z kodu źródłowego.

**Summary:** Chodzi o zwykły, wbudowany element `<img>`, ale React od jakiegoś czasu dokłada do niego własną logikę. Podczas renderowania na serwerze React automatycznie generuje podpowiedź preload dla obrazka, jeśli nie ma powodu tego nie robić. Dodanie `loading="lazy"` albo `fetchPriority="low"` wyłącza tę automatyczną podpowiedź, bo oba atrybuty oznaczają, że obrazek nie jest krytyczny dla pierwszego widoku. React w zależności od frameworka albo wygeneruje tag `<link rel="preload">`, albo doda odpowiedni nagłówek `Link` do odpowiedzi.

Druga część dokumentacji dotyczy `<ViewTransition>`. Podczas aktualizacji renderowanej po stronie klienta React może poczekać, aż nowy obrazek się załaduje i zdekoduje, zanim uruchomi animację przejścia. Dotyczy to sytuacji, gdy nowy `<img>` z niepustym `src` pojawia się w drzewie albo gdy zmienia się `src` lub `srcSet` istniejącego obrazka. Warunek jest taki, że obrazek musi siedzieć wewnątrz poddrzewa `<ViewTransition>` i nie może mieć `loading="lazy"` ani własnego handlera `onLoad`. Ten drugi przypadek sam w sobie wyłącza czekanie, bo React zakłada, że skoro obsługujesz `onLoad` ręcznie, to sam decydujesz, kiedy obrazek jest gotowy. Jest też limit czasowy, więc wolno ładujący się obrazek nie zablokuje animacji w nieskończoność.

To samo dotyczy obrazków odsłanianych przez granicę Suspense wewnątrz `<ViewTransition>`. React może poczekać na widoczne obrazki bez `loading="lazy"`, zanim pokaże strumieniowaną treść. W praktyce oznacza to, że jeśli komponent z obrazkiem galerii pojawia się po stronie klienta, a Ty chcesz, żeby animacja przejścia zaczekała na jego załadowanie, nie musisz nic robić, bo to domyślne zachowanie. Jeśli chcesz, żeby animacja ruszyła natychmiast niezależnie od stanu obrazka, wystarczy dodać `onLoad` albo `loading="lazy"`.

Warto też zapamiętać jedną pułapkę z sekcji caveats. Pusty string w `src` potrafi sprawić, że przeglądarka ponownie zażąda bieżącej strony. React ostrzega o tym w trybie deweloperskim i pomija atrybut, ale samodzielne sprawdzanie tego przypadku w starszym kodzie wciąż ma sens, bo produkcyjny build tego ostrzeżenia nie pokaże.

**Key takeaways:**
- `loading="lazy"` i `fetchPriority="low"` wyłączają automatyczny preload obrazka generowany przez React podczas SSR
- `<ViewTransition>` może czekać na załadowanie i zdekodowanie obrazka, o ile nie ma on `loading="lazy"` ani `onLoad`
- Ten sam mechanizm czekania działa też dla obrazków odsłanianych przez Suspense wewnątrz `<ViewTransition>`
- React nie generuje preloadu dla obrazków wewnątrz `<picture>`, `<noscript>` ani dla `src` będącego data URL
- Pusty string w `src` może wywołać ponowne żądanie bieżącej strony, a React ostrzega o tym tylko w dev

**Why do I care:** To jest dokładnie ten typ dokumentacji, którą czyta się dopiero wtedy, gdy coś nie działa tak, jak się spodziewałeś, a potem żałuje się, że nie przeczytało się jej wcześniej. Kombinacja SSR preload i View Transition ma realny wpływ na to, czy animacje przejść wyglądają płynnie czy migają niedoładowanymi obrazkami, a to akurat rzadko trafia do code review, bo wygląda na szczegół implementacyjny. Jeśli używasz `<ViewTransition>` do czegokolwiek poważniejszego niż demo, warto świadomie zdecydować, które obrazki mają blokować animację, a które nie, zamiast polegać na domyślnym zgadywaniu.

**Link:** [img – React](https://react.dev/reference/react-dom/components/img)

---

## Flight dostaje eksperymentalne referencje do dowolnych obiektów, nie tylko funkcji

**TLDR:** Nowy PR w React dodaje flagę eksperymentalną `enableFlightObjectReferences`, która rozszerza Server References tak, żeby mogły wskazywać nie tylko na funkcje, ale też na obiekty. Na razie działa wyłącznie w bindingach Turbopack.

**Summary:** Server References w React Server Components do tej pory pozwalały przekazać z serwera na klienta odwołanie do funkcji. Klient dostaje nieprzezroczysty uchwyt, którego jedyne zastosowanie to wywołanie z powrotem na serwerze. Ten PR rozszerza ten mechanizm o nową funkcję `registerServerObjectReference`, która taguje dowolny obiekt identyfikatorem modułu dokładnie tak, jak `registerServerReference` taguje funkcję serwerową. Efekt jest podobny do Temporary References znanych z Server Functions: klient dostaje uchwyt, na którym odczyt właściwości albo wywołanie rzuca błąd, a jedyne, co można z nim zrobić, to przekazać go z powrotem do serwera, gdzie zostanie rozwiązany przez manifest.

Motywacja jest konkretna. Frameworki chcą móc modelować wartości zależne od danego żądania, na przykład `searchParams`, jako eksport modułu, którego wartość rozwiązuje się z bieżącego requestu. Dzięki temu framework nie musi kodować tych danych w treści odpowiedzi po raz drugi, skoro i tak już są w URL-u. To ma dodatkowy efekt uboczny: jeśli parametry wyszukiwania nie pojawiają się nigdzie indziej w treści, cache odpowiedzi może je pominąć w kluczu cache, co czyni odpowiedzi bardziej cache'owalne.

Od strony implementacyjnej PR wyciąga maszynerię obsługi stanu chunków z `loadServerReference` do dwóch pomocniczych funkcji. Jedna rozwiązuje zablokowany chunk do jego wartości i budzi nasłuchujących, druga odczytuje wartość już rozwiązanego chunka albo czeka na wciąż zablokowany. Ścieżka referencji do funkcji zachowuje się identycznie jak wcześniej, zmienia się tylko sposób routowania błędów przy jej rozwiązywaniu.

To wciąż eksperyment za flagą, ograniczony do jednego bundlera, więc nie jest to coś, co można dziś włączyć w produkcyjnym projekcie. Kierunek jest za to czytelny. React coraz odważniej traktuje granicę serwer-klient jako miejsce, przez które mogą przepływać nie tylko dane i funkcje, ale też uchwyty do dowolnych obiektów zdefiniowanych przez framework.

**Key takeaways:**
- Nowa flaga `enableFlightObjectReferences` rozszerza Server References o referencje do obiektów, nie tylko funkcji
- `registerServerObjectReference` taguje obiekt identyfikatorem modułu podobnie jak przy funkcjach serwerowych
- Klient dostaje nieprzezroczysty uchwyt, gdzie odczyt czy wywołanie rzuca błąd, a jedyne zastosowanie to przekazanie z powrotem do serwera
- Motywacja to modelowanie `searchParams` jako eksportu modułu, co pozwala pominąć je w kluczu cache odpowiedzi
- Na razie dostępne tylko w bindingach Turbopack, port na inne bundlery zależy od dalszego rozwoju eksperymentu

**Why do I care:** Jeśli budujesz własny framework na RSC albo śledzisz, dokąd zmierza ta architektura, to jest sygnał wart zapamiętania. Granica serwer-klient przestaje być wyłącznie kanałem transportu danych i funkcji, a staje się miejscem, gdzie framework może przemycać kontekst żądania bez podwójnego kodowania go w payloadzie. Dla zwykłego zespołu produktowego to na razie czysta ciekawostka za flagą eksperymentalną, ale warto obserwować, czy trafi to kiedyś do Next.jsa jako sposób na tańsze i bardziej cache'owalne odpowiedzi RSC.

**Link:** [[Flight] Server References for arbitrary object types by acdlite](https://github.com/react/react/pull/37636)

---

## Next.js łata krytyczną lukę RCE w `ImageResponse`

**TLDR:** Next.js wydał poza harmonogramem wersje 16.3.6 i 15.5.26, które łatają krytyczną lukę zdalnego wykonania kodu w node'owej implementacji `ImageResponse` z `next/og`. Podatność wynika z niepoprawnego escapowania w bibliotece Satori. Aktualizacja jest obowiązkowa dla wersji od 16.2.0 do poniżej 16.3.6.

**Summary:** To jeden z tych komunikatów, które trzeba przeczytać do końca, zanim się zignoruje jako kolejny drobny patch. Problem dotyczy generowania obrazów przez `next/og` w środowisku Node.js. Niepoprawne escapowanie w SVG-owym wyjściu generowanym przez Satori, upstreamową bibliotekę Next.jsa, mogło w określonych warunkach prowadzić do zdalnego wykonania kodu za sprawą podatności w kolejnych zależnościach tej biblioteki. Poprawka polega na podniesieniu tych zależności, nie na przepisaniu logiki Next.jsa.

Tu ważne jest jedno rozróżnienie. Dotyczy to wyłącznie implementacji node'owej, a aplikacje korzystające z edge'owej implementacji `ImageResponse` nie są zagrożone. Next.js 15.x nie jest podatny na samą lukę RCE, ale wersja 15.5.26 zawiera powiązane wzmocnienia zabezpieczeń, więc warto ją zainstalować mimo to, jeśli trzymasz się gałęzi maintenance LTS.

Vercel przypomina przy okazji o swoim programie Open Source Bug Bounty, w ramach którego badacze bezpieczeństwa mogą zgłaszać podatności we frameworkach open source. To akurat rutynowa nota, ale warto ją zauważyć, bo pokazuje, skąd biorą się takie łatki. Nie z wewnętrznych audytów, tylko z zewnętrznych badaczy, którzy dostają za to wynagrodzenie.

Skala tej podatności, krytyczna i z możliwością zdalnego wykonania kodu, stawia ją w innej lidze niż typowe poprawki wydajnościowe czy DX-owe, które zwykle dominują w changelogach Next.jsa. Jeśli generujesz obrazy dynamicznie po stronie serwera, na przykład karty Open Graph albo miniaturki, to dokładnie ta ścieżka kodu jest tu w grze.

**Key takeaways:**
- Zaktualizuj do Next.js 16.3.6 (Active LTS) lub 15.5.26 (Maintenance LTS) najszybciej jak się da
- Luka dotyczy node'owej implementacji `ImageResponse` w `next/og`, wersje od 16.2.0 do poniżej 16.3.6
- Edge'owa implementacja `ImageResponse` nie jest zagrożona
- Next.js 15.x nie ma luki RCE, ale 15.5.26 zawiera powiązane wzmocnienia bezpieczeństwa
- Przyczyną jest niepoprawne escapowanie SVG w bibliotece Satori i jej zależnościach

**Why do I care:** Krytyczna luka RCE to nie jest coś, co można odłożyć na sprint planning za dwa tygodnie. Jeśli w projekcie generujesz obrazy dynamicznie po stronie serwera, a to dziś standard przy kartach OG do social media, sprawdź wersję Next.jsa i zaktualizuj, zanim zajmiesz się czymkolwiek innym. To akurat rzadki przypadek, gdzie priorytet jest oczywisty i nie ma miejsca na dyskusję architektoniczną.

**Link:** [Next.js Security Update for a Critical Upstream Issue](https://nextjs.org/blog/nextjs-security-update-september-22-2026)

---

## Czy frameworki jeszcze mają znaczenie w erze agentów?

**TLDR:** Brooks Lybrand, developer frameworków z trzyletnim stażem, mierzy się z modnym argumentem, że skoro modele radzą sobie z frontendem, to wybór frameworka przestał mieć znaczenie. Jego odpowiedź: jeśli nie używasz frameworka, agent i tak go dla Ciebie zbuduje, tylko po cichu, bez dokumentacji i bez testów.

**Summary:** Punktem wyjścia jest obserwacja, którą autor słyszy coraz częściej. Skoro modele stały się dobre w agentycznym programowaniu, kod frontendowy przestaje mieć znaczenie, bo jest w większości prezentacyjny, a skoro wygląda dobrze, to jest dobry. React wygrał, ma największy ekosystem i najwięcej danych treningowych, więc próbowanie czegokolwiek innego rzekomo nie ma sensu. Autor rozkłada ten argument na czynniki pierwsze i pyta wprost, dlaczego akurat React, a nie żadna abstrakcja w ogóle. Jeśli modele są aż tak dobre w czystym HTML-u, JavaScripcie i CSS-ie, to czemu w ogóle stawiać warstwę pośrednią między agentem a stroną?

Odpowiedź, do której dochodzi, opiera się na prostej definicji. Framework dostarcza abstrakcje, strukturę i ograniczenia do budowania strony. To nie jest coś unikalnego dla frameworków, dotyczy każdej biblioteki, modułu, klasy czy funkcji. Zmienia się tylko to, kto właściwie te abstrakcje czyta. Kiedyś liczyło się to, żeby człowiek rozumiał kod. Dziś model też musi go rozumieć, i to on częściej sięga po dokumentację w `node_modules`, żeby nie zgadywać na podstawie przypadkowych wyników wyszukiwania.

Najciekawszy fragment tekstu to seria osobistych przykładów, jak zmieniła się wartość poszczególnych narzędzi deweloperskich w pracy z agentem. Hot Module Replacement wciąż pomaga przy dopracowywaniu interakcji użytkownika, nawet pracując z agentem. TypeScript przestał być cenny jako pomoc w odkrywaniu API przez najeżdżanie kursorem, ale ograniczenia typów wciąż trzymają agenta w ryzach przy iteracyjnych zmianach w złożonych aplikacjach. `useEffect`, funkcja, którą autor kiedyś czuł się pewnie prowadzić ręcznie, w rękach modeli budzi w nim więcej nieufności niż wcześniej, do tego stopnia, że niektóre zespoły agentowe wprost go zakazują.

Cytat z Ricky'ego Hanlona z zespołu React, że albo używasz frameworka, albo budujesz swój własny, a budowanie własnego jest naprawdę trudne, dostaje ciekawą poprawkę. Zbudowanie niedoskonałego frameworka faktycznie nie jest trudne, bo agent i tak go zbuduje, chcąc nie chcąc, przy każdej aplikacji bez frameworka. Różnica jest w tym, że ten framework będzie miał gorszą dokumentację, żadnego marketingu i tylko jednego świadomego jego istnienia użytkownika, model, który go napisał. Autor kończy pytaniem, czy nie chodzi bardziej o to, czy nowe frameworki mają jeszcze sens, niż o to, czy frameworki w ogóle mają sens, i deklaruje, że chce je dalej budować.

**Key takeaways:**
- Argument "modele są dobre w React, więc używaj tylko Reacta" nie tłumaczy, czemu w ogóle potrzebna jest jakakolwiek abstrakcja
- Framework to abstrakcje, struktura i ograniczenia, to samo, co dają biblioteki, klasy i funkcje
- Jeśli nie używasz frameworka, agent i tak zbuduje swój własny, tylko bez dokumentacji i testów
- HMR i typy TypeScriptu wciąż mają wartość w pracy z agentem, choć z innych powodów niż wcześniej
- `useEffect` budzi więcej nieufności w erze agentów niż wcześniej, część zespołów zakazuje go wprost

**Why do I care:** Ten tekst trafia w sedno dyskusji, którą warto prowadzić świadomie, zamiast powtarzać slogany usłyszane na konferencji. Jeśli ktoś w Twoim zespole argumentuje, że skoro agent pisze kod, to architektura przestaje mieć znaczenie, to jest gotowa odpowiedź: albo masz framework, albo agent go dla Ciebie wymyśli, tylko gorszy i bez dokumentacji. Dla architektów to też przypomnienie, żeby świadomie decydować, które ograniczenia i abstrakcje mają realną wartość dla agenta, a które są tylko przyzwyczajeniem sprzed ery agentycznego programowania.

**Link:** [Do Frameworks Matter Anymore?](https://brookslybrand.com/posts/do-frameworks-matter-anymore/)

---

## `Activity` pokazuje, że render już nie gwarantuje uruchomienia Effectu

**TLDR:** React 19.2 wprowadził `<Activity>` do chowania UI z zachowaniem stanu i DOM-u, ale ukrywa w sobie istotną zmianę cyklu życia: komponent może się wyrenderować bez uruchomienia swoich Effectów. Autor pokazuje realny błąd produkcyjny, który to ujawnił, i wyprowadza z niego listę pytań, jakie warto sobie zadać przed użyciem `Activity`.

**Summary:** Historia zaczyna się od typowego zamiennika. Warunkowy render zastąpiono przez `<Activity mode={isActive ? 'visible' : 'hidden'}>`, żeby zachować stan drugiej zakładki zamiast ją odmontowywać. Krótko potem zaczęło coś przeciekać. Winowajcą okazał się nie sam `Activity`, tylko stary hook, który subskrybował się do zewnętrznego store'a bezpośrednio podczas renderowania, zakładając od lat, że skoro komponent się renderuje, to w końcu uruchomi się Effect, który posprząta subskrypcję. `Activity` po prostu jako pierwsze złamało to założenie w produkcji.

Mentalny model, który autor wypracował, jest prosty. Widoczna `Activity` zachowuje stan, DOM jest widoczny, komponent renderuje się normalnie i Effecty są zamontowane. Ukryta `Activity` też zachowuje stan i DOM, komponent wciąż może się renderować przy zmianie propsów, ale Effecty nie są montowane. Kiedy `Activity` przechodzi z widocznej do ukrytej, React chowa jej zawartość przez `display: none`, sprząta Effecty, ale zachowuje stan i DOM. Problem w tym, że jeśli `Activity` startuje jako ukryta, jej Effecty po prostu nigdy się nie montują, a stary hook zdążył już utworzyć subskrypcję podczas renderu, zanim ktokolwiek zobaczył zakładkę.

Naprawa jest prosta, gdy już się ją zobaczy. Subskrypcja i jej sprzątanie muszą należeć do tego samego Effectu, najlepiej przez `useSyncExternalStore` zamiast ręcznego `useEffect` z subskrypcją tworzoną poza nim. Autor pokazuje też, że StrictMode od dawna próbował zasygnalizować ten problem. Dodatkowy przebieg renderowania i dodatkowy cykl setup-cleanup-setup dla Effectów w trybie deweloperskim ujawniają dokładnie tę asymetrię, tylko development-only, więc łatwo ją zignorować, dopóki `Activity` nie przeniesie jej do produkcji.

Reszta tekstu to seria praktycznych pułapek. Effect przywiązany do widoczności komponentu może rozłączyć WebSocket, którego cykl życia powinien żyć wyżej, w Providerze. DOM po ukryciu `Activity` wciąż istnieje, więc `<video>` będzie dalej grać, jeśli nie podepniesz sprzątania jawnie przez `useLayoutEffect`. Zachowanie stanu bywa pożądane dla zakładek, ale bywa niepożądane dla formularzy, gdzie czasem trzeba świadomie zmienić `key`, żeby wymusić świeży stan. A w testach end-to-end ukryte węzły DOM wciąż istnieją w drzewie, więc lokatory Playwrighta dopasowujące się po etykiecie mogą złapać więcej niż jeden element i trzeba filtrować po widoczności albo po aktywnym kontenerze.

**Key takeaways:**
- `Activity` może wyrenderować komponent bez uruchomienia jego Effectów, jeśli startuje jako ukryta
- Subskrypcje tworzone bezpośrednio podczas renderu to źródło cichych wycieków, które `Activity` ujawnia w produkcji
- `useSyncExternalStore` usuwa problem u źródła zamiast łatać go ręcznym Effectem
- StrictMode od dawna sygnalizuje tę klasę błędów przez dodatkowy cykl setup-cleanup-setup
- Ukryty `Activity` nie usuwa węzłów DOM z drzewa, co potrafi zaskoczyć testy Playwrighta oparte na etykietach

**Why do I care:** To dokładnie ten typ artykułu, który warto przeczytać, zanim ktoś w Twoim zespole entuzjastycznie zamieni wszystkie warunkowe rendery na `Activity`, bo "zachowuje stan za darmo". Nic nie jest za darmo. `Activity` przenosi na Ciebie odpowiedzialność za świadome zdecydowanie, co powinno przeżyć ukrycie UI, a co powinno zostać posprzątane. Jeśli w projekcie są stare hooki z subskrypcjami pisanymi bez `useSyncExternalStore`, to jest dobry moment, żeby je znaleźć, zanim znajdzie je produkcja.

**Link:** [React Activity: When A Render No Longer Guarantees an Effect](https://hackernoon.com/react-activity-when-a-render-no-longer-guarantees-an-effect)

---

## Kto jest właścicielem danych: mentalny model Reacta dla systemowców

**TLDR:** Tekst buduje mentalny model Reacta od zera, na przykładzie pokoju do wspólnego oglądania wideo, wprowadzając trzy pojęcia: właściciela danych, widoki wyprowadzone z tych danych i granicę synchronizacji, którą musi przekroczyć aktualizacja. To rzadki przypadek, gdzie ktoś tłumaczy Reacta komuś, kto myśli w kategoriach systemów rozproszonych, a nie hooków.

**Summary:** Punktem wyjścia jest pokój ze wspólną playlistą i osadzonym odtwarzaczem YouTube. Kiedy Alicja wybiera wideo na telefonie, laptop drugiej osoby powinien podświetlić właściwy wiersz, pokazać tytuł i załadować wideo. Autor buduje ten scenariusz krok po kroku, zaczynając od tego, że renderowanie to po prostu wyprowadzanie widoku z danych wejściowych. Komponent to czysta funkcja, DOM to zmaterializowany widok tych danych, a React dba o to, żeby ten widok był aktualny. Kiedy stan lokalny, na przykład wybrane wideo, zmienia się przez `useState`, React ponownie wylicza tytuł i podświetlenie z tych samych danych wejściowych, więc oba pozostają spójne z konstrukcji, nie przez przypadek.

Kluczowy moment przychodzi, gdy trzeba zsynchronizować się z czymś na zewnątrz Reacta, czyli z odtwarzaczem YouTube. Zmiana podświetlonego wiersza nie każe odtwarzaczowi załadować wideo samoczynnie, bo `selectedId` wyraża tylko pożądany stan, a to odtwarzacz jest właścicielem tego, co faktycznie jest załadowane. Wywołanie odtwarzacza bezpośrednio podczas renderowania pozwoliłoby niedokończonemu kandydatowi na commit wpłynąć na zewnętrzny stan, więc Effect rejestruje kod, który uruchamia się dopiero po commicie. Autor od razu pokazuje częsty błąd, czyli kopiowanie wartości wyprowadzonej z propsów do osobnego stanu i synchronizowanie jej Effectem, na przykładzie tytułu wideo, który przez chwilę pokazuje stary tytuł obok już podświetlonego nowego wiersza, bo dwa commity rozjeżdżają jedną logiczną aktualizację.

Dalej historia przechodzi do trwałości między przeładowaniami. Selekcja przenosi się do IndexedDB, a React staje się tylko czytelnikiem zewnętrznie posiadanego stanu przez `useSyncExternalStore`. Autor tłumaczy, dlaczego kombinacja `useState` plus subskrypcja w Effekcie nie wystarcza. Między odczytem a zarejestrowaniem subskrypcji jest okno czasowe, w którym store może się zmienić bez nikogo nasłuchującego, a jeśli różne komponenty czytają ten sam store niezależnie, React może przerwać renderowanie między nimi i skończyć z niespójnym widokiem, gdzie jeden fragment UI pokazuje starą wersję, a drugi nową. To zjawisko nazywa się tearing, a `useSyncExternalStore` broni się przed nim, sprawdzając migawki przed commitem i powtarzając próbę, jeśli coś się zmieniło.

Ostatni krok przenosi ten sam wzorzec do współdzielenia między urządzeniami. Backend staje się właścicielem stanu pokoju, każdy klient trzyma replikę, a kliknięcie w playliście wysyła komendę do backendu zamiast bezpośrednio zmieniać lokalny stan. Widoczność panelu bocznego zostaje lokalna, bo nie ma powodu, żeby otwarcie panelu u Alicji otwierało go też u Boba. Autor kończy przeglądem, gdzie w ekosystemie mieszczą się biblioteki takie jak Electric, Convex, LiveStore czy TanStack DB. Każda obsługuje inny fragment tej samej trójki: własność, wyprowadzanie widoku i granica synchronizacji.

**Key takeaways:**
- Renderowanie to wyprowadzanie widoku z danych wejściowych; komponenty jako czyste funkcje gwarantują spójność pochodnych wartości
- Synchronizacja z systemami zewnętrznymi (odtwarzacz, WebSocket, IndexedDB) należy do Effectów, nie do renderu
- Kopiowanie wartości pochodnej do osobnego stanu i synchronizowanie jej Effektem rozbija jedną logiczną aktualizację na dwa commity
- `useSyncExternalStore` chroni przed tearing, czyli sytuacją, w której różne komponenty czytają różne wersje tego samego źródła
- Ten sam wzorzec własność-wyprowadzenie-synchronizacja skaluje się od stanu lokalnego po replikowany stan między urządzeniami

**Why do I care:** Jeśli kiedykolwiek tłumaczyłeś komuś z backendu albo z innego stacku, dlaczego React robi rzeczy tak, a nie inaczej, to ten artykuł jest lepszym materiałem wyjściowym niż większość oficjalnej dokumentacji, bo nie zakłada, że czytelnik już myśli w kategoriach hooków. Dla architektów to też przypomnienie, żeby przy każdej integracji z zewnętrznym źródłem prawdy, czy to ze store'em, socketem czy bazą lokalną, świadomie odpowiedzieć na pytanie, kto jest właścicielem danych, zamiast zgadywać i łatać tearing dopiero wtedy, gdy ktoś go zauważy na produkcji.

**Link:** [Frontend for systems engineers](https://tj-zhang.com/blog/frontend-for-systems-engineers/)

---

## Jak zespół zmniejszył paczki OTA w React Native z 18 MB do kilkuset KB

**TLDR:** Zespół korzystający z Revopush Diff Updates przeszedł z pełnych paczek OTA na binarne diffy i zredukował rozmiar typowej aktualizacji z 18,7 MiB do zakresu 117–611 KiB. Revopush 2.0 rozwiązuje przy okazji problem baseline, pozwalając, żeby pierwsza aktualizacja OTA po natywnym wydaniu była od razu diffem.

**Summary:** Punktem wyjścia jest prosta obserwacja. OTA miały przyspieszać wydania w React Native, ale jeśli każda aktualizacja i tak wysyła pełny bundel JavaScript, to drobna poprawka staje się dużym pobraniem na telefonie. Jeden z klientów Revopush po migracji na Diff Updates 7 czerwca zaczął wysyłać aktualizacje częściej, przy jednoczesnym spadku transferu danych i wzroście liczby ukończonych pobrań. Konkretne liczby z jednego wydania mówią same za siebie. Pełna paczka OTA ważyła 18,7 MiB, a wygenerowane diffy JavaScript miały 117, 587 i 611 kilobajtów, czyli od 31 do ponad 160 razy mniej niż pełny pakiet.

Duże paczki OTA zawodzą dokładnie tam, gdzie boli najbardziej. Na słabych sieciach, kiedy użytkownik zamyka aplikację w trakcie pobierania, albo kiedy pobieranie w tle przegrywa z limitem transferu danych. Kiedy diff mierzy się w setkach kilobajtów zamiast dziesiątkach megabajtów, drobna poprawka przestaje być wydarzeniem transferowym, na które trzeba czekać z wysyłką.

Częstym ograniczeniem systemów opartych o diffy jest problem baseline: trzeba najpierw wysłać pełną aktualizację OTA jako punkt odniesienia, zanim kolejne wydania mogą być mniejszymi diffami. Revopush 2.0 omija ten krok dla obsługiwanych wydań, traktując natywny plik binarny (IPA, APK albo AAB) jako bazowe wydanie, względem którego generowane są kolejne diffy. W praktyce oznacza to, że pierwsza aktualizacja OTA po wydaniu natywnym może być diffem od razu, bez konieczności wysyłania pełnego bundla jako punktu startowego, co ułatwia migrację z rozwiązań w stylu CodePush.

Sam przepływ pracy sprowadza się do utworzenia wydania bazowego z natywnego binarium, a potem publikowania regularnych aktualizacji JavaScriptu i zasobów przez CLI Revopush: `release-react` dla zwykłego React Native, `release-expo` dla projektów Expo. Wsparcie obejmuje React Native 0.83+ oraz Expo SDK 55, choć w tym drugim przypadku integracja wciąż wymaga natywnej konfiguracji i nie działa w Expo Go. Trzeba budować natywnie przez prebuild, EAS Build albo własny pipeline.

**Key takeaways:**
- Diffy binarne zredukowały rozmiar aktualizacji OTA z 18,7 MiB do zakresu 117–611 KiB w opisanym przypadku
- Mniejsze paczki oznaczały mniejszy transfer danych i więcej ukończonych pobrań na słabych sieciach
- Revopush 2.0 używa natywnego binarium jako baseline, więc pierwsza OTA po wydaniu natywnym może być od razu diffem
- Wsparcie dla React Native 0.83+ i Expo SDK 55, ale projekty Expo wciąż wymagają natywnego builda poza Expo Go
- Rozmiar diffa zależy od zakresu zmian w wydaniu, więc redukcja nie jest stała dla każdego release'u

**Why do I care:** Jeśli zarządzasz aplikacją React Native z realnym ruchem OTA, koszt transferu i porzucone pobrania na słabych sieciach to nie jest teoria, tylko realny koszt infrastruktury i realna utrata użytkowników w trakcie krytycznej poprawki. Warto sprawdzić, czy Twój obecny dostawca OTA w ogóle robi diffy binarne, zanim zaakceptujesz to, że każda poprawka kosztuje tyle samo transferu co pełne wydanie.

**Link:** [React Native OTA payloads: from 18 MB to 100-600 KB with binary diffs](https://revopush.org/react-native-ota-payloads-binary-diffs?utm_source=this_week_in_react)

---

## Helix: jak Shopify uczy LLM-y migrować 300-ekranową aplikację z React Native do natywu

**TLDR:** Shopify przenosi swoje aplikacje z React Native z powrotem do natywnego Swifta i Kotlina, i zbudowało do tego narzędzie Helix, czyli pętlę, w której LLM buduje migrację małymi, sprawdzalnymi krokami, a nie jednym wielkim, niepewnym diffem. Każdy checkpoint musi przejść cztery bramki, zanim agent przejdzie dalej.

**Summary:** Shopify już przeniosło aplikację Shop na natywny stos w 12 tygodni i teraz stosuje te same wnioski do Shopify App, swojej największej aplikacji, licząc ponad 300 ekranów. LLM-y są wystarczająco zdolne, żeby to zrobić, ale samodzielnie nie dają konsekwentnie wysokiej jakości i utrzymywalnych wyników bez odpowiedniego oprzyrządowania i barier ochronnych. Większość narzędzi do migracji zbiera jak najwięcej kontekstu, zamienia go w specyfikacje, implementuje całość naraz i liczy, że pierwszy wynik będzie dobry, a inżynier dostaje jeden ogromny, niepewny diff do przetestowania. Helix odwraca to podejście. Nie zakłada, że pierwsza próba będzie poprawna, tylko rozbija pracę na małe kroki i automatyzuje coraz więcej z każdym kolejnym udanym krokiem.

Migracja zaczyna się od tego, że inżynier wskazuje Helixowi ekran, a narzędzie czyta kod React Native i proponuje sekwencję checkpointów, czyli małych, uporządkowanych fragmentów pracy, które inżynier może zaakceptować w kilka minut. Pierwszy checkpoint to zwykle szkielet ekranu, drugi to celowo mała sekcja, a kolejne rosną dopiero, gdy wcześniejsze decyzje przeszły przegląd. Każdy checkpoint musi udowodnić swoje zachowanie testami, dopasować się wizualnie do aplikacji referencyjnej, przejść dwa niezależne, wrogie przeglądy kodu i uzyskać akceptację inżyniera, zanim zostanie zacommitowany i zacznie się kolejny.

Najciekawszą częścią jest bramka przeglądu UI. Równość wizualna jest niemal niemożliwa do opisania w prompcie. Człowiek od razu widzi, że tytuł jest za mały albo ikona lekko przesunięta, ale te szczegóły rzadko trafiają do specyfikacji, a porównywanie pikseli nie działa, bo dwa różne frameworki UI nigdy nie wyprodukują identycznego bajt w bajt wyjścia. Shopify zauważyło, że modele Gemini mają bardzo dobrą świadomość przestrzenną właśnie w tym problemie, więc zbudowało wokół tego bramkę. Orchestrator w postaci GPT robi zrzuty ekranu implementacji i referencji w pasujących stanach, a Gemini ocenia je jak perfekcjonistyczny recenzent designu, wypisując każdą różnicę z poziomem istotności i lokalizacją na ekranie.

Trzecia bramka to niezależne, wrogie przeglądy kodu na podstawie dokładnie udokumentowanej architektury, a czwarta to inżynier, który zamyka pętlę, decydując, czy wynik spełnia oczekiwania. Jego uwagi trafiają jednocześnie do naprawy bieżącego checkpointu i do pamięci Helixa, która poprawia każdy kolejny krok. Dzięki tej pamięci autonomia rośnie wraz z migracją. Wczesne checkpointy dostają więcej uwagi inżyniera, bo niepewność jest wysoka, a późniejsze mogą działać z mniejszym nadzorem albo nawet pominąć akceptację całkowicie, jeśli inżynier włączy tryb autonomiczny. Helix może wtedy pracować godzinami albo całą noc, a bramki nie stają się przy tym łagodniejsze tylko dlatego, że nikt nie patrzy.

**Key takeaways:**
- Helix rozbija migrację na małe checkpointy zamiast generować jeden duży, niepewny diff do przeglądu
- Każdy checkpoint przechodzi cztery bramki: testy zachowania, przegląd UI, dwa wrogie przeglądy kodu, akceptację inżyniera
- Przegląd UI wykorzystuje spatial awareness modeli Gemini do oceny pikselowej zgodności zamiast diffowania obrazów
- Pamięć z uwag inżyniera pozwala autonomii rosnąć z każdym kolejnym checkpointem
- Migracje mogą działać równolegle na wielu ekranach naraz, każda zbiegając niezależnie przez własne bramki

**Why do I care:** To jest konkretna, praktyczna odpowiedź na pytanie, które zadaje sobie każdy zespół rozważający dużą migrację wspomaganą przez AI: jak nie utonąć w jednym gigantycznym, niesprawdzalnym diffie. Wzorzec małych checkpointów z twardymi bramkami jest przenośny na dowolną migrację architektoniczną, nie tylko React Native na natyw, i warto go rozważyć, zanim ktoś w zespole zaproponuje, żeby agent po prostu przepisał cały moduł na raz.

**Link:** [Helix: The internal tool powering our Shopify app's native migration (2026)](https://shopify.engineering/helix)

---

## Jak ReactLynx renderuje pierwszą klatkę natychmiast, mimo dwóch wątków

**TLDR:** ReactLynx dzieli renderowanie na wątek główny i wątek w tle, więc pierwsza klatka musi czekać na inicjalizację JavaScriptu w tle, chyba że użyjesz Instant First-Frame Rendering, który pozwala wątkowi głównemu narysować pierwszą klatkę od razu, a potem przejąć wyniki z wątku w tle bez przebudowy widoków.

**Summary:** W Reakcie na webie render i commit dzieją się na tym samym wątku. Po zakończeniu renderowania React od razu aktualizuje DOM przez referencje do elementów. W ReactLynx wątek główny ma skupić się wyłącznie na rysowaniu natywnych widoków bez blokowania przez logikę biznesową JavaScriptu, więc React działa na osobnym wątku w tle, który nie ma dostępu do referencji elementów na wątku głównym i nie może commitować bezpośrednio. Stąd potrzeba osobnego potoku commitów, który mostkuje wątek w tle z wątkiem głównym.

Mechanizm nazywa się background-driven rendering. Silnik działa na bazie Preacta, ale ReactLynx przechwytuje jego operacje na hoście (tworzenie elementów, zmiany atrybutów, aktualizacje struktury) i zamiast dotykać widoków bezpośrednio, zapisuje je jako Patch, płaski strumień opkodów wysyłany do wątku głównego przy commicie. Patch jest zaprojektowany pod transfer międzywątkowy. Zamiast wysyłać cały opis węzła przy każdej zmianie, kompilator przypisuje indeksy slotów w czasie kompilacji, więc aktualizacja stanu potrafi się zmieścić w kilku liczbach mówiących, że nowa wartość w tym slocie to tyle. Wątek główny odczytuje ten strumień kursorem, dekoduje opkody i tłumaczy je na wywołania niskopoziomowego Element PAPI, które faktycznie tworzą, wstawiają czy usuwają elementy natywne.

Ten mechanizm dobrze radzi sobie ze stanem ustabilizowanym, ale pierwsza klatka to inny problem. Wątek główny nie ma jeszcze żadnej struktury do narysowania, dopóki wątek w tle się nie zainicjalizuje, nie wykona kodu aplikacji i nie odeśle pierwszej partii Patchy, co osłabia korzyść z dwuwątkowej architektury właśnie w najbardziej widocznym momencie, czyli starcie aplikacji. Instant First-Frame Rendering wydziela szybką ścieżkę specjalnie na tę okazję. Wątek główny od razu wykonuje okrojony artefakt main-thread, żeby stworzyć początkowe natywne widoki, podczas gdy wątek w tle równolegle uruchamia pełny runtime Reacta i obsługuje kolejną logikę biznesową.

Kiedy wątek w tle skończy swój pierwszy render, następuje handover, dokładnie ten sam problem, który web rozwiązał przy hydratacji SSR, gdzie serwerowo wyrenderowany HTML tworzy drzewo hostów z wyprzedzeniem, a klient adoptuje istniejące węzły DOM przy budowaniu pierwszego drzewa VNode. ReactLynx dopasowuje rekurencyjnie drzewo z wątku głównego, które ma ujemne identyfikatory, do drzewa z pierwszego renderu w tle, które ma tymczasowe dodatnie identyfikatory, korzystając z pozycji slotów ustalonych w czasie kompilacji. Dopasowane węzły przejmują identyfikatory z wątku głównego, a różnice, na przykład gałąź, która różni się między dwoma wątkami, trafiają do jednego korygującego Patcha zamiast wymagać przebudowy od zera.

**Key takeaways:**
- ReactLynx renderuje na dwóch wątkach, więc potrzebuje osobnego potoku commitów opartego o Patch zamiast bezpośredniego dostępu do DOM
- Patch to płaski strumień opkodów tłumaczony na wywołania Element PAPI dzięki indeksom slotów ustalonym w czasie kompilacji
- Instant First-Frame Rendering pozwala wątkowi głównemu narysować pierwszą klatkę bez czekania na inicjalizację wątku w tle
- Handover dopasowuje drzewo z pierwszej klatki wątku głównego z pierwszym renderem wątku w tle, podobnie jak hydratacja SSR na webie
- Build toolchain Rspeedy generuje osobne artefakty na wątek główny i wątek w tle z tego samego kodu React

**Why do I care:** Dla zespołów pracujących z Lynx albo rozważających cross-platformowe frameworki oparte o wielowątkowe renderowanie to konkretny przykład, jak trudny problem szybkiego startu przy zachowaniu odseparowania logiki od renderowania rozwiązuje się przez pożyczenie sprawdzonego wzorca z web hydration, a nie wymyślanie czegoś od zera. Jeśli oceniasz Lynx jako alternatywę dla React Native, ten artykuł pokazuje poziom inżynieryjnej dojrzałości stojący za obietnicą "instant first frame", a nie tylko marketingowe hasło.

**Link:** [Deep Dive into ReactLynx: From Background Rendering to Instant First-Frame Rendering](https://lynxjs.org/next/blog/reactlynx-instant-first-frame-rendering)

---

## Dlaczego Rust z UniFFI usuwa most, którego KMP na iOS nie da się uniknąć

**TLDR:** Autor rozkłada na czynniki pierwsze warstwę mostkującą, którą Kotlin Multiplatform wymusza na iOS: jeden plik na domenę, cztery zadania do wykonania w każdym. Pokazuje, że Rust z UniFFI usuwa większość tej pracy, bo eksport przez ABI C nigdy nie gubi tego, co trzeba potem odzyskiwać.

**Summary:** Na iOS KMP eksportuje współdzieloną warstwę jako jeden zlinkowany framework, do którego Swift może się odwoływać, ale w praktyce żadna produkcyjna baza kodu nie pozwala funkcjom SwiftUI wołać typów Kotlina bezpośrednio. Między wyeksportowanym Kotlinem a kodem funkcji stoi warstwa mostkująca, jeden plik na każdą domenę. Autor naliczył ich około trzydziestu w zmierzonej bazie kodu, a jedynym zadaniem tej warstwy jest nie wpuścić obcego systemu typów do własnego. To nie jest wygodny wrapper, tylko anti-corruption layer w klasycznym sensie tego terminu.

Autor rozbija pracę tego mostu na cztery konkretne zadania, powtarzane w każdym pliku domenowym. Pierwsze to opakowanie obiektu Kotlina zaimportowanego przez Objective-C w strukturę oznaczoną `@unchecked Sendable`, bo Swift 6 w trybie strict concurrency odmawia skompilowania kodu przekazującego niesendowalną wartość do Taska, a to `@unchecked` trzeba okupić pisemnym uzasadnieniem bezpieczeństwa. Drugie to zamiana Kotlinowego Flow na Swiftowy AsyncStream, bo narzędzie Swift-export potrafi mostkować sam typ Flow, ale nie potrafi zmostkować interfejsu, którego składową jest Flow, więc trzeba to ręcznie odsłonić przez dodatkową funkcję najwyższego poziomu. Trzecie, i najbardziej pracochłonne, to przemapowanie każdego typu Kotlina na natywny typ Swifta pole po polu. Pieniądze i dziesiętne wartości gubione przez erasure trzeba odtworzyć ręcznym parsowaniem, adresy URL wymagają ponownej walidacji schematu, a enumy z wyczerpującym switchem bez gałęzi domyślnej sprawiają, że nowy przypadek w Kotlinie staje się błędem kompilacji zamiast cicho zgubionej gałęzi. Czwarte to zbudowanie natywnej struktury Swifta ze złożonych domknięć, którą dopiero wstrzykuje kod funkcji.

Android nie płaci żadnego z tych podatków, bo to Kotlin od góry do dołu. ViewModel po prostu trzyma repozytorium Kotlina i woła jego metody bezpośrednio, bez opakowania, adaptera strumienia, mapowania typów czy przebudowanej struktury. Ta asymetria jest kluczem do całego argumentu. Most jest podatkiem wyłącznie iOSowym, bo dwa runtime'y o różnych systemach typów i różnych modelach pamięci muszą się spotkać, a to Swift jest stroną, która musi wyjść na to spotkanie.

Rust z UniFFI zmienia grunt pod tym argumentem, bo w ogóle nie przechodzi przez Objective-C. Kod Rusta kompiluje się do natywnej biblioteki statycznej albo dzielonej, a UniFFI generuje na jej podstawie cienki natywny wrapper w Swifcie i Kotlinie, który po prostu marshaluje argumenty przez ABI C. Wygenerowane typy to prawdziwe struktury i enumy Swifta, prawdziwe data class i sealed class Kotlina, nie obcy typ, który trzeba potem przekształcić. Skoro wartość nigdy nie ulega erasure, zadanie trzecie po prostu znika, bo nie ma drugiego typu, w który trzeba by mapować. Zadanie pierwsze znika, bo wygenerowane typy są oznaczane jako Sendable tam, gdzie Rust to potwierdza. Zadanie drugie znika dla wywołań request-response, ale zostaje zredukowana wersja dla strumieni. UniFFI nie ma natywnego typu Flow, więc trzeba raz na kształt strumienia, a nie raz na domenę, opakować callback w AsyncStream po stronie Swifta i w callbackFlow po stronie Kotlina. W zamian pojawia się nowy, wąski podatek tylko na Kotlinie: obiekt Rusta trzeba jawnie zamknąć przez `.close()`, bo Kotlinowy garbage collector zwalnia tylko wrapper, a nie pamięć po stronie Rusta, a wbudowany Cleaner jako zabezpieczenie jest ślepy na presję pamięci Rusta i nieprzewidywalny w czasie.

**Key takeaways:**
- Bridge na iOS w KMP wykonuje cztery powtarzalne zadania na każdą domenę: opakowanie Sendable, adaptację Flow, mapowanie typów i budowę natywnej struktury
- Android nie płaci tego podatku wcale, bo cały stos jest Kotlinem bez granicy ObjC
- UniFFI generuje natywne typy Swifta i Kotlina bezpośrednio z Rusta, więc mapowanie typów (zadanie trzecie) w ogóle nie występuje
- Adaptacja strumieni zostaje, ale przenosi się z "raz na domenę" na "raz na kształt strumienia", bo UniFFI nie ma natywnego typu Flow
- Nowy podatek jest wąski i tylko na Kotlinie: obiekty Rusta trzeba jawnie zamykać, bo GC JVM nie widzi pamięci po stronie Rusta

**Why do I care:** Jeśli Twój zespół rozważa KMP dla współdzielonej logiki biznesowej na iOS i Android, ten artykuł to konkretna checklista kosztów, których marketing KMP zwykle nie pokazuje. Trzydzieści plików mostkujących to nie jest szczegół, to stały koszt utrzymania rosnący z każdą kolejną domeną. Rust z UniFFI nie jest rozwiązaniem uniwersalnym, ale jeśli architektura pozwala na wyższą granicę natywna-współdzielona niż tylko logikę domenową, warto policzyć, ile linii kodu bridge'a faktycznie znika, zanim zdecydujesz się na KMP tylko dlatego, że to przecież Kotlin wszędzie.

**Link:** [The KMP-on-iOS Scaling Problem That Rust UniFFI Fixes](https://andrei-calazans.com/posts/2026-09-19-the-kmp-ios-scaling-problem-rust-uniffi-fixes/)

---

## Jak wygląda w praktyce współdzielona logika biznesowa napisana w Rust

**TLDR:** Ten sam autor buduje działający proof of concept: sesję, repozytorium użytkownika, wywołanie REST i GraphQL, wszystko w Rust, mostkowane przez UniFFI do iOS i Androida. Pokazuje realne koszty tego podejścia, czyli brak metod na danych, brak darmowej serializacji i ręczne zamykanie obiektów po stronie Kotlina.

**Summary:** Cel jest prosty do sformułowania. Poprowadzić granicę natywna-współdzielona jak najwyżej i wszystko poniżej niej trzymać w Rust. View i ViewModel zostają natywne po obu platformach, renderują stan i wysyłają intencje, ale use case'y, repozytoria, źródła danych, sieć, storage i modele siedzą w Rust jako jeden obiekt `AppCore`, który iOS i Android po prostu trzymają i wywołują. W proof of concept sieć to `reqwest` na `tokio`, a cała logika sesji, repozytorium i mapowania REST oraz GraphQL jest po stronie Rusta.

Wybór narzędzia do generowania mostu nie jest przypadkowy. Autor rozważa trzy opcje. `cbindgen` generuje tylko nagłówki C i zostawia całą resztę JNI oraz Swifta do ręcznego napisania bez modelu async. `Diplomat` generuje Kotlina i Swifta, ale nie ma natywnego mostu async i ma ograniczony podzbiór typów. UniFFI od Mozilli, zbudowane pierwotnie do współdzielenia rdzenia Rusta między iOS-ową i Androidową wersją Firefoksa, generuje obie strony bindingów, mapuje `async fn` na `suspend` w Kotlinie i `async` w Swifcie, i działa z `tokio` oraz `reqwest`. To ono wygrywa. Idealny warunek brzegowy to trzymanie wygenerowanych bindingów poza kontrolą wersji, bo są czystą funkcją API Rusta, więc regenerowanie ich przy każdym buildzie eliminuje ryzyko rozjazdu.

Miejsce wywołania wygląda zaskakująco zwyczajnie po obu stronach. `async fn` w Rust staje się `async throws` w Swifcie i `suspend fun` w Kotlinie, bez żadnego ręcznie pisanego wrappera. To nie jest teoria, tylko działający ekran w demie: fałszywe logowanie, żywa cena bitcoina przez GraphQL, żywe definicje słów przez REST, wszystko przez jeden obiekt Rusta. Autor jest jednak szczery co do tego, co się traci przy okazji. Wygenerowana struktura to tylko pola, bez metod ani właściwości obliczanych. Logikę trzeba albo trzymać w Rust jako osobną funkcję, albo dopisać natywne rozszerzenie na wygenerowanym typie. Nie ma też darmowej serializacji. Wygenerowana struktura nie jest `Codable` ani `Parcelable`, więc jeśli ekran chce włożyć model do `Bundle` albo zakodować go do JSON-a po stronie natywnej, trzeba to opakować samodzielnie, choć w praktyce trzymanie trwałości w Rust czyni to pytanie w większości przypadków nieistotnym.

Ostatnia część dotyczy skalowania powyżej pojedynczego demo, czyli tego, czy ten wzorzec trzyma się przy setkach modułów. Odpowiedź jest analogiczna do problemu KMP. iOS linkuje jedną statyczną bibliotekę, Android ładuje jedno `.so`, niezależnie od tego, jak podzielisz workspace Rusta na crate'y. Ratunkiem jest cache'owanie na poziomie crate'a: jeden współdzielony katalog `target/`, podział domeny na crate'y według częstotliwości zmian, cienki crate `ffi` reeksportujący funkcje z poszczególnych features, i świadome trzymanie się reguły, że crate'y to granice kompilacji, a moduły to tylko organizacja kodu wewnątrz nich. Krok linkowania pozostaje stałym kosztem na build, rosnącym wraz z całą współdzieloną warstwą, dokładnie tak samo jak przy framework-parasolu w KMP, ale sam czas kompilacji przy zmianie jednego pliku zostaje szybki, bo Cargo przelicza tylko dotknięty crate.

**Key takeaways:**
- UniFFI wygrywa z `cbindgen` i `Diplomat`, bo generuje obie strony bindingów i natywnie mapuje `async fn` na `suspend`/`async throws`
- Wygenerowane bindingi warto gitignorować, bo są czystą funkcją API Rusta i regenerują się przy każdym buildzie
- Koszt realny: brak metod na wygenerowanych typach, brak darmowej serializacji, ręczne `.close()` obiektów Rusta na Kotlinie
- Skalowanie do setek modułów wymaga podziału workspace'u na crate'y według częstotliwości zmian i cienkiego crate'a `ffi`
- Krok linkowania jednej biblioteki natywnej jest stałym kosztem rosnącym z rozmiarem współdzielonej warstwy, tak jak framework-parasol w KMP

**Why do I care:** Ten artykuł razem z poprzednim tekstem tego samego autora daje kompletny obraz alternatywy dla KMP, którą warto znać, zanim zespół wybierze domyślne rozwiązanie tylko dlatego, że wszyscy używają Kotlin Multiplatform. Rust z UniFFI nie jest za darmo. Płacisz utratą wygodnych metod na modelach i ręcznym zarządzaniem cyklem życia obiektów na Kotlinie, ale jeśli granica natywna-współdzielona w Twojej architekturze sięga głębiej niż tylko domenę biznesową, warto policzyć, czy te koszty są mniejsze niż trzydzieści plików mostkujących z poprzedniego artykułu.

**Link:** [What Does Shared Business Logic in Rust Look Like on iOS & Android?](https://andrei-calazans.com/posts/2026-09-18-shared-business-logic-in-rust/)

---

## Callstack testuje model Jev do podejmowania decyzji w testach QA

**TLDR:** Callstack połączył model Jev od TypeSafe z własnym narzędziem agent-device, żeby sprawdzić, czy szybki, wyspecjalizowany model decyzyjny może zastąpić LLM-a w testach QA opartych o drzewo dostępności aplikacji. Cały przebieg testu trwał 14 sekund i kosztował 0,0023 dolara w inferencji modelu.

**Summary:** Jev to pierwszy model kategorii "System One" od TypeSafe, zaprojektowany do szybkich, ustrukturyzowanych decyzji, a nie do generowania tekstu. Zamiast prosić model o napisanie wyjaśnienia albo sekwencji wywołań narzędzi, aplikacja zadaje pytanie z zdefiniowanym zestawem możliwych odpowiedzi, na przykład "co powinno się stać dalej" z opcjami takimi jak dodanie produktu do koszyka, otwarcie koszyka albo zakończenie przebiegu. Model wybiera jedną z nich i zwraca też prawdopodobieństwa dla pozostałych opcji, żeby aplikacja mogła uwzględnić niepewność. Cała logika decyzji o tym, co zrobić z odpowiedzią, zostaje po stronie kodu wywołującego, nie modelu.

Właśnie stąd bierze się szybkość. TypeSafe ewaluuje pytania równolegle i zwraca wartości ustrukturyzowane bezpośrednio, bez generowania tekstu ani łańcucha wywołań narzędzi. Firma raportuje czasy odpowiedzi rzędu 70 do 500 milisekund oraz nawet 193,6 razy szybsze wykonanie i 444,6 razy niższy koszt w porównaniu do testowanych konfiguracji LLM. Dla agenta QA podejmującego dziesiątki decyzji w trakcie jednego przebiegu testu to bezpośrednio przekłada się na to, ile testów zmieści się w tym samym budżecie i jak szybko dostajesz wynik.

Rolą agent-device jest dostarczenie stanu aplikacji w formie, którą Jev potrafi przeczytać. Narzędzie odczytuje informacje z API dostępności, takie jak etykiety przycisków, teksty czy wartości pól formularzy, i prezentuje je jako migawkę z referencjami do poszczególnych kontrolek. Jev dostaje tylko tekst i dane ustrukturyzowane, nie zrzuty ekranu ani wideo, co akurat pasuje idealnie do tego, że agent-device i tak operuje na drzewie dostępności, a nie na pikselach.

Każdy element ekranu zamienia się w dostępną akcję z opisem dla modelu i szczegółami wykonania dla runnera. Przycisk staje się akcją naciśnięcia, edytowalne pole staje się akcją wypełnienia z już gotowym tekstem do wpisania, bo Jev nie generuje stringów, tylko wybiera akcję, w której tekst jest już przygotowany. Runner wysyła aktualną migawkę, zadanie oraz poprzedni ekran i poprzednią akcję, żeby model widział, co się zmieniło, a Jev poza wyborem akcji może też zdecydować, że test zakończył się sukcesem, porażką albo jest niekompletny, na podstawie tego, co zadanie każe zweryfikować.

**Key takeaways:**
- Jev to model "System One" zwracający ustrukturyzowane wybory zamiast tekstu czy łańcucha wywołań narzędzi
- Raportowane przyspieszenie sięga 193,6x, a redukcja kosztu 444,6x względem testowanych konfiguracji LLM
- agent-device dostarcza stan aplikacji jako migawkę z drzewa dostępności, nie jako zrzut ekranu
- Każda kontrolka na ekranie zamienia się w akcję z gotowym opisem i, jeśli trzeba, gotowym tekstem do wpisania
- Jev poza wyborem akcji decyduje też o zakończeniu testu jako sukces, porażka albo niekompletny wynik

**Why do I care:** Koszt i czas testów QA opartych o LLM-y to często ukryty hamulec w automatyzacji mobilnej. Jeśli pojedynczy przebieg testu kosztuje więcej niż kilka centów i trwa dłużej niż kilkanaście sekund, trudno uruchamiać go przy każdym PR-ze. Wyspecjalizowany model decyzyjny zamiast ogólnego LLM-a to ciekawy kierunek dla każdego zespołu budującego własną automatyzację QA opartą o agentów, szczególnie jeśli budżet na inferencję jest realnym ograniczeniem, a nie tylko linią w arkuszu kalkulacyjnym.

**Link:** [Exploring Jev for AI-Driven QA with agent-device](https://www.callstack.com/blog/exploring-jev-for-mobile-qa-with-agent-device)

---

## Chrome 154 pozwala iframe'om samodzielnie dopasować wysokość do treści

**TLDR:** Chrome 154 wprowadza właściwość CSS `frame-sizing`, która pozwala `<iframe>` automatycznie dopasować swój rozmiar do rzeczywistej wielkości osadzonego dokumentu, eliminując klasyczny problem osadzonych widgetów komentarzy czy formularzy ze zmienną wysokością.

**Summary:** Mechanizm wymaga zgody z dwóch stron. Strona osadzająca ustawia na elemencie `<iframe>` właściwość `frame-sizing` z wartością `auto`, `content-height` albo `content-width` (albo ich logicznymi wariantami), a dokument załadowany wewnątrz ramki musi dodać znacznik meta informujący, że zgadza się komunikować swój rozmiar rodzicowi. Po załadowaniu strony rozmiar treści jest komunikowany automatycznie, a jeśli dokument w ramce zmienia rozmiar później, wywołuje `window.requestResize()`, żeby zaktualizować rodzica. Atrybut `allow-origins` w znaczniku meta pozwala ograniczyć, którym originom dokument w ogóle udostępnia informację o swoim rozmiarze.

Typowy przypadek użycia to formularze albo widgety komentarzy osadzane przez iframe, które do tej pory wymagały albo sztywnej wysokości z paskiem przewijania w środku, albo ręcznego mostkowania rozmiaru przez `postMessage`. Demo pokazane w artykule to formularz wieloetapowy w iframe, który przy każdym kolejnym kroku dopasowuje swoją wysokość bez pojawienia się paska przewijania, dopóki przeglądarka wspiera `frame-sizing`.

Wsparcie na razie jest wyłącznie w Chromium. Chrome 154 obsługuje tę funkcję, a Firefox i Safari na razie nie mają jej wcale zaimplementowanej, więc w praktyce to funkcja do stosowania z progresywnym uszczelnieniem, a nie coś, na czym można polegać jako jedynym mechanizmie w produkcji, dopóki reszta przeglądarek nie dogoni.

Autor, inżynier Chrome Developer Relations w Google i współautor oryginalnego artykułu na developer.chrome.com, traktuje to jako rozwiązanie długo istniejącego problemu integracji zewnętrznych widgetów, które wcześniej wymagały niestandardowych rozwiązań `postMessage` po obu stronach granicy iframe, żeby osiągnąć podobny efekt.

**Key takeaways:**
- Nowa właściwość CSS `frame-sizing` z wartościami `auto`, `content-height`, `content-width` sterowana po stronie osadzającej
- Dokument w iframe musi dodać meta tag `responsive-embedded-sizing`, żeby zgodzić się na komunikowanie rozmiaru
- `window.requestResize()` pozwala dokumentowi w ramce zaktualizować rozmiar po zmianie treści
- `allow-origins` w meta tagu ogranicza, którym originom dokument udostępnia informację o rozmiarze
- Na razie wspierane wyłącznie w Chrome/Chromium, brak wsparcia w Firefoksie i Safari

**Why do I care:** Jeśli kiedykolwiek osadzałeś formularz albo widget trzeciej strony w iframe i musiałeś ręcznie mostkować rozmiar przez `postMessage`, ta funkcja usuwa realny, powtarzalny kawałek boilerplate'u. Brak wsparcia w Firefoksie i Safari oznacza, że na razie to funkcja do stosowania jako progresywne wzmocnienie, a nie jedyny mechanizm, ale warto ją mieć na radarze, jeśli budujesz widgety do osadzania na cudzych stronach.

**Link:** [New in Chrome 154: iframes that automatically resize themselves to their content](https://www.bram.us/2026/09/23/responsive-iframes/)

---

## Edge dorzuca API do dostępności shadow DOM-u i przygotowuje przeglądarkę pod agentów

**TLDR:** Najnowszy przegląd nowości w Microsoft Edge obejmuje OpaqueRange API do interakcji z zakresami tekstu w polach formularzy, `referenceTarget` rozwiązujący problem cross-root ARIA w web components, oraz atrybut `aria-actions` do ujawniania drugorzędnych akcji widgetów czytnikom ekranu. Do tego dochodzi wczesna implementacja WebMCP gotowa do testów.

**Summary:** OpaqueRange API daje żywy dostęp do zakresów tekstu wewnątrz `<textarea>` i `<input>`, co pozwala na przykład pozycjonować własny interfejs w konkretnych miejscach wewnątrz pola tekstowego przez `getBoundingClientRect()` i `getClientRects()`. Współpracuje też z CSS Custom Highlight API, co otwiera drogę do własnych podświetleń wewnątrz edytowalnych regionów tekstu.

Drugi feature rozwiązuje odwieczny problem web components, czyli cross-root ARIA. Nowa właściwość `referenceTarget` na `ShadowRoot`, ustawiana też przez atrybut HTML `shadowrootreferencetarget`, pozwala przekierować atrybuty odwołań identyfikatorowych, takie jak `for` czy `aria-labelledby`, do elementów wewnątrz shadow DOM komponentu. W praktyce zwykły `<label for="custom-checkbox">` może wreszcie poprawnie połączyć się z faktycznym `<input>` ukrytym wewnątrz komponentu, bez własnoręcznego przekazywania ARIA przez propsy czy sloty.

Trzeci feature, atrybut `aria-actions`, adresuje złożone widgety z wieloma akcjonowalnymi częściami, na przykład zakładkę z osobnym przyciskiem zamykania. Dotąd takie kompozytowe widgety były trudne do udostępnienia technologiom asystującym, a `aria-actions` pozwala jawnie wypisać drugorzędne akcje widgetu tak, żeby czytnik ekranu mógł je zaprezentować.

Reszta artykułu to szybki przegląd mniejszych, ale praktycznych dodatków: pseudoklasy stanu mediów (`:playing`, `:paused`, `:buffering`, `:muted`, `:stalled`) do stylowania odtwarzaczy audio i wideo, nowa właściwość CSS `window-drag` do przeciągania okien PWA, metody iteratora `Iterator.join()`, `Iterator.zip()` i `Iterator.zipKeyed()`, wpisy wydajnościowe do mierzenia miękkich nawigacji w aplikacjach jednostronicowych, funkcja `alpha()` do modyfikowania przezroczystości kolorów, oraz `textStream()` na obiektach `Response`, `Request` i `Body` do wygodnego przetwarzania tekstu strumieniowo. Najciekawszą pozycją gotową do testów jest WebMCP, specyfikacja tworzona wspólnie z Web Machine Learning Community Group, która pozwala ujawnić istniejący frontendowy kod jako ustrukturyzowane narzędzia, z których może korzystać agent przeglądający stronę w imieniu użytkownika.

**Key takeaways:**
- OpaqueRange API daje żywy dostęp do zakresów tekstu w polach formularzy, współpracując z CSS Custom Highlight API
- `referenceTarget` na `ShadowRoot` rozwiązuje cross-root ARIA, przekierowując atrybuty odwołań do wnętrza shadow DOM
- `aria-actions` ujawnia drugorzędne akcje złożonych widgetów technologiom asystującym
- Nowe metody iteratora `join()`, `zip()` i `zipKeyed()` upraszczają pracę z wieloma iterowalnymi obiektami naraz
- WebMCP jest gotowe do wczesnych testów i pozwala wystawić istniejący frontend jako narzędzia dla agentów przeglądających stronę

**Why do I care:** `referenceTarget` to jedna z tych funkcji, które cicho usuwają realny, wieloletni ból przy budowaniu dostępnych web components. Jeśli kiedykolwiek próbowałeś ręcznie przekazywać ARIA przez propsy tylko po to, żeby label działał z polem w shadow DOM, wiesz, o co chodzi. WebMCP z kolei to sygnał, że warto zacząć myśleć o swoim frontendzie nie tylko jako o interfejsie dla ludzi, ale też jako o powierzchni, którą kiedyś będzie obsługiwał agent przeglądający stronę w Twoim imieniu. To jest zmiana architektoniczna, na którą warto się przygotować wcześniej niż później.

**Link:** [New in Edge for developers – Create better components and make your site agent-ready](https://blogs.windows.com/msedgedev/2026/09/21/new-in-edge-for-developers-create-better-components-and-make-your-site-agent-ready/)

---

## ESLint 10.11 skupia się wyłącznie na wydajności

**TLDR:** ESLint v10.11.0 nie wprowadza żadnych zmian w wynikach lintowania ani w publicznym API. Te same pliki dają te same komunikaty co wcześniej, tylko szybciej. Zespół raportuje 20–25% szybsze ładowanie pakietu i zauważalne przyspieszenie samego procesu lintowania w projektach korzystających z wielu reguł core.

**Summary:** Największa zmiana dotyczy startu. Wcześniej samo załadowanie pakietu `eslint` inicjalizowało walidator schematów JSON używany do opcji reguł, nawet jeśli akurat żadna reguła go nie potrzebowała. Teraz walidator powstaje dopiero przy pierwszej faktycznej potrzebie sprawdzenia opcji reguły, co usuwa około 45 modułów z początkowego grafu zależności i skraca czas ładowania pakietu o 20 do 25 procent.

Druga zmiana dotyczy najbardziej gorącej ścieżki w całym procesie: decydowania, które reguły interesują się danym fragmentem kodu podczas przechodzenia przez strukturę pliku, i wywoływania ich. Najczęstsze typy selektorów węzłów mają teraz szybszą ścieżkę, a wizytatorzy reguł są wywoływani bezpośrednio zamiast przez wrapper na każdym węźle, kiedy tylko jest to możliwe.

Trzecia zmiana dotyczy narzutu przypadającego na każdy zgłoszony problem. Wcześniej ESLint wykonywał kilka kroków przetwarzania przed wyświetleniem komunikatu przy każdym zgłoszeniu. Teraz placeholdery w szablonach komunikatów wypełniają się tylko wtedy, gdy faktycznie trzeba, poprawki automatyczne są sprawdzane pod kątem poprawności bez serializowania każdej do JSON-a, a jeden obiekt fixera jest współdzielony przez wszystkie problemy zgłoszone w pliku zamiast tworzenia nowego na każdy fix. Pliki bez żadnych komentarzy `eslint-enable` czy `eslint-disable` pomijają teraz cały krok przetwarzania dyrektyw.

Domyślny formatter stylish też dostał poprawkę. Nie usuwa już znaków kontrolnych terminala ze stringów, które ich nie zawierają, i nie uruchamia wyrażenia regularnego na każdym komunikacie, co przyspiesza wypisywanie dużej liczby problemów naraz. Zespół zastrzega, że rzeczywiste rezultaty zależą od konfiguracji i sprzętu, ale projekty korzystające z wielu reguł core powinny odczuć zauważalną poprawę zarówno w czasie startu, jak i w całkowitym czasie lintowania.

**Key takeaways:**
- Leniwa inicjalizacja walidatora schematów JSON skraca czas ładowania pakietu o 20–25%
- Szybkie ścieżki dla najczęstszych selektorów węzłów przyspieszają samo przechodzenie po strukturze pliku
- Mniejszy narzut na zgłoszony problem: współdzielony fixer, opóźnione wypełnianie placeholderów, bez zbędnej serializacji do JSON-a
- Pliki bez dyrektyw `eslint-enable`/`eslint-disable` pomijają cały krok ich przetwarzania
- Wyniki lintowania i publiczne API pozostają bez zmian, to wyłącznie optymalizacja wydajności

**Why do I care:** Wydajność lintera rzadko trafia na listę priorytetów zespołu, dopóki CI nie zacznie zauważalnie zwalniać przy dużym monorepo. Ta konkretna aktualizacja jest bezpieczna do wdrożenia niemal od razu, bo nie zmienia zachowania, tylko przyspiesza je. Nie ma więc żadnego realnego powodu, żeby zwlekać z podbiciem wersji, jeśli lintowanie w Twoim CI trwa dłużej, niż byś chciał.

**Link:** [ESLint v10.11.0 released](https://eslint.org/blog/2026/09/eslint-v10.11.0-released/)
