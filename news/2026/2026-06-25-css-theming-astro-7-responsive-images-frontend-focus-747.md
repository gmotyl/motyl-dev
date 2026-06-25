---
title: "CSS theming bez JavaScript, Astro 7.0 z Rustem i koniec klasycznych obrazków responsywnych"
excerpt: "Frontend Focus #747 przynosi zestaw artykułów o nowoczesnym CSS, potężnym Astro 7.0 z kompilatorem w Ruście oraz o tym, że kryteria WCAG można łamać nieświadomie przy pomocy zwykłego layoutu."
publishedAt: "2026-06-24"
slug: "css-theming-astro-7-responsive-images-frontend-focus-747"
hashtags: "#frontendfocus #css #html #astro #accessibility #viewtransitions #anchorpositioning #responsiveimages #generated #pl"
source_pattern: "Frontend Focus"
---

## Nowoczesny CSS theming: light-dark(), contrast-color() i style queries w jednym systemie

**TLDR:** Una Kravets pokazuje jak zbudować kompletny system tematowania komponentów używając wyłącznie CSS, bez jednej linii JavaScript. Trzy nowe funkcje dostępne w przeglądarkach od maja 2026 tworzą razem elegancki mechanizm obsługujący zarówno tryb jasny i ciemny, jak i kontrast tekstu do tła.

Przez lata theming oznaczał albo przepisywanie wartości w media queries, albo JavaScript zmieniający klasy na `body`. Artykuł Uny Kravets pokazuje, że w 2026 roku CSS sam potrafi zrobić to lepiej. Podstawą systemu jest `light-dark()` - funkcja, która zwraca różne wartości koloru w zależności od obliczonego `color-scheme` elementu. To ważne: reaguje na `color-scheme` ustawione jawnie w CSS, nie tylko na preferencje systemowe. Oznacza to, że możemy wymusić ciemny motyw dla konkretnej sekcji strony, ustawiając `color-scheme: dark` na rodzicu, a wszystkie wywołania `light-dark()` wewnątrz automatycznie się dostosują.

Drugi element to `contrast-color()` - funkcja, która dla dowolnego koloru tła zwraca albo czarny, albo biały kolor tekstu, gwarantując kontrast zgodny z algorytmem WCAG. To jedno wywołanie zastępuje całą logikę ręcznego dobierania kolorów. Sama w sobie jest jednak trochę brutalna - czysta biel lub czysta czerń to często nie to, czego chcemy wizualnie.

Tu wkraczają container style queries. Rejestrując `--contrast-color` jako `@property` i ustawiając go na wynik `contrast-color()`, możemy następnie rozgałęziać się w `@container style()` - jeśli kontrast to biały, znaczy, że tło jest ciemne, więc używamy ciepłych jasnych odcieni; jeśli czarny, to tło jasne i sięgamy po głębsze tony. Relative color syntax (`oklch(from var(--bg) 0.9 0.1 h)`) wyciąga odcień z koloru bazowego, więc tekst na fioletowej karcie będzie fioletowy, nie szary. Cały system działa z jedną zmienną `--brand-color` per komponent - reszta jest deterministyczna i automatyczna.

**Key takeaways:**
- `light-dark()` reaguje na `color-scheme` dziedziczone z rodzica, co umożliwia tematowanie fragmentów strony niezależnie od preferencji systemowych
- `contrast-color()` jest dostępne w przeglądarkach od maja 2026 i automatycznie wybiera kolor tekstu o wystarczającym kontraście
- Container style queries pozwalają używać wyniku `contrast-color()` jako warunku rozgałęzienia, co umożliwia budowanie bogatszych palet kolorów niż biel/czerń
- Cały system (shadows w light, neon glow w dark, czytelny tekst) działa z jedną zmienną CSS per komponent

**Why do I care:** To jeden z tych momentów, gdy CSS zaskakuje mnie pozytywnie. Przez lata utrzymywałem systemy tematowania w JavaScript, przekazywałem tokeny przez Context w React, synchronizowałem stan z localStorage. Teraz okazuje się, że przeglądarka samodzielnie ogarnie kontrast tekstu, odpowiedni mechanizm uniesienia dla trybu ciemnego i dostosowanie palety barw do koloru marki. Jedyne co muszę dostarczyć to jeden kolor. Chętnie zobaczę jak to działa na dużych design systemach z dziesiątkami komponentów.

**Link:** [Modern CSS theming with light-dark(), contrast-color(), and style queries](https://una.im/modern-css-theming/)

---

## Astro 7.0: kompilator w Ruście, Vite 8 z Rolldown i Advanced Routing

**TLDR:** Astro 7.0 to jedna z większych wersji tej platformy - kompilator `.astro` przepisany w Ruście, nowy Rust-owy pipeline dla Markdowna, stabilny queued rendering oraz nowe API dla kontroli pipeline'u requestów. Buildy są 15-61% szybsze w benchmarkach, a największe projekty budują się ponad dwa razy szybciej.

Najważniejszą zmianą jest przejście na Rust w miejscach, które dominowały czas builda. Kompilator `.astro` zastąpił poprzedni napisany w Go. Zmiany nie są w pełni kompatybilne wstecz - nowy kompilator nie koryguje już HTML po cichu, a tagi niezamknięte zwracają błędy zamiast być naprawiane magicznie. To dobra decyzja: takie "pomocne" zachowanie generowało trudne do debugowania problemy. Markdown przeszedł na Sätteri - nowy procesor w Ruście oparty na `pulldown-cmark`, który ma wbudowane GFM, inteligentne cudzysłowy, heading IDs i dyrektywy kontenerowe, bez potrzeby instalowania dziesiątek pluginów remark.

Vite 8 z Rolldown robi wrażenie. Rolldown to bundler w Ruście zastępujący jednocześnie esbuild i Rollup. W benchmarkach jest 10-30 razy szybszy od Rollupa. Dla użytkowników Astro oznacza to szybsze buildy bez żadnych zmian konfiguracji - Vite 8 automatycznie konwertuje istniejące opcje esbuild i rollupOptions. Queued rendering, który był eksperymentalny w Astro 6, stał się teraz domyślnym silnikiem renderowania. Zamiana rekursji na pętlę z kolejką nie tylko przyspieszyła renderowanie, ale też zmniejszyła zużycie pamięci.

Szczególnie interesuje mnie Advanced Routing. Astro dostaje teraz plik `src/fetch.ts` z pełną kontrolą nad pipeline'em requestów, korzystającym z Web Fetch API. Można go zintegrować z Hono jako middleware, co pozwala na np. uruchomienie autoryzacji przed Actions, albo przekierowanie konkretnych ścieżek do zewnętrznego API. Route Caching, eksperymentalne w Astro 6, też staje się stabilne - z dostawcami CDN dla Netlify, Vercel i Cloudflare, które tłumaczą dyrektywy cache'owania na natywne mechanizmy platformy.

**Key takeaways:**
- Nowy kompilator Rust usuwa ciche korekty HTML z poprzedniej wersji Go - niezamknięte tagi teraz powodują błędy
- Sätteri zastępuje pipeline oparty na unified/remark, skracając build projektów intensywnie korzystających z Markdowna o ponad minutę
- Advanced Routing przez `src/fetch.ts` daje pełną kontrolę nad pipeline'em requestów, z integracją Hono
- Rolldown w Vite 8 jest 10-30x szybszy od Rollupa w benchmarkach, bez konieczności zmiany konfiguracji

**Why do I care:** Astro staje się poważnym graczem nie tylko dla stron statycznych. Route Caching z dostawcami CDN, Advanced Routing z Hono middleware i stabilne queued rendering to cechy, których oczekuję od dojrzałego frameworka. Rust w pipeline'ie to wyraźny kierunek całej branży toolingowej - widzimy to w Biome, OXC, Rolldown i teraz w Astro. Dla projektów z tysiącami stron różnica 40-60% w czasie builda to realna oszczędność w CI.

**Link:** [Astro 7.0](https://astro.build/blog/astro-7/)

---

## Grid Lanes i dostępność: nowy layout, stary problem z kolejnością focusu

**TLDR:** Manuel Matuzovic analizuje Grid Lanes (nowa technika layoutu CSS, zwana też Masonry) pod kątem dostępności i dochodzi do niepokojącego wniosku: domyślna kolejność focusu niemal zawsze rozmija się z wizualną kolejnością elementów, co narusza WCAG 2.4.3. Właściwość `flow-tolerance` pomaga, ale nie jest panaceum.

Grid Lanes to nowy tryb wyświetlania CSS (`display: grid-lanes`) pozwalający tworzyć kolumny lub wiersze automatycznie zapełniane elementami o różnych rozmiarach. Przeglądarka sama decyduje, do której kolumny trafi każdy element - wybiera tę, która jest aktualnie najkrótsza. To sprawia, że layout wygląda estetycznie i wyważenie, ale wizualna kolejność elementów przestaje odpowiadać kolejności w DOM. Dla użytkowników klawiatury oznacza to, że Tab prowadzi przez elementy w zupełnie innej kolejności niż wskazuje wzrok.

Artykuł zawiera konkretny przykład z demonstracji WebKit. Przy galerii obrazków o różnych wysokościach, zwiększanie `flow-tolerance` do 10rem poprawia sytuację tylko trochę. Żeby całkowicie usunąć rozbieżność, potrzeba `flow-tolerance: 40rem` - ale to skutkuje nierównymi kolumnami, a focus i tak skacze wertykalnie między elementami w nieintuicyjny sposób.

Istnieje właściwość `reading-flow`, która mogłaby rozwiązać ten problem, wyrównując kolejność focusu do kolejności wizualnej. Problem w tym, że w Chromium implementacja `reading-flow` dla Grid Lanes jeszcze nie istnieje, Safari obsługuje Grid Lanes, ale nie `reading-flow`, a Firefox nie opublikował jeszcze swojego stanowiska. Ciekawy hack pokazany w artykule: `.grid-lanes:has(:focus-visible) { display: grid; }` - gdy użytkownik klawiaturowy przychodzi do kontenera, layout przełącza się na zwykły grid. Nie jest to rozwiązanie dla screen readerów używających kursora wirtualnego, ale samo w sobie jest imponujące jako proof of concept.

**Key takeaways:**
- Grid Lanes domyślnie łamie kolejność focusu - algorytm rozmieszczania elementów działa przeciwko dostępności klawiatury
- `flow-tolerance` zmniejsza rozbieżności, ale przy dużych różnicach wysokości elementów nie eliminuje ich całkowicie
- `reading-flow` jest jedynym docelowym rozwiązaniem, ale brak implementacji w Safari i Firefox dla Grid Lanes pozostaje blokerem
- Safari wypuściło Grid Lanes bez obsługi `reading-flow`, co jest złą kolejnością

**Why do I care:** To uczciwe ostrzeżenie dla wszystkich, którzy planują używać Grid Lanes produkcyjnie. Nowy layout jest kuszący - nareszcie Pinterest-style bez JavaScript - ale koszt dostępności jest wysoki jeśli wewnątrz są jakiekolwiek interaktywne elementy. Nie spieszę się z wdrożeniem Grid Lanes w projektach, gdzie dostępność klawiaturowa ma znaczenie.

**Link:** [Your Grid Lanes will likely fail WCAG 2.4.3](https://matuzo.at/blog/2026/grid-lanes-accessibility)

---

## Animowanie elementu dialog przez View Transitions API

**TLDR:** Artykuł pokazuje jak za pomocą View Transitions API stworzyć efekt, w którym dialog "wyłania się" z przycisku, który go otworzył. Całość bazuje na Invoker Commands API i kilku liniach JavaScript, z pełnym respektowaniem `prefers-reduced-motion`.

Podstawowy setup nie wymaga JavaScript - element `dialog` można kontrolować przez Invoker Commands API: atrybut `command="show-modal"` na przycisku i `commandfor` wskazujący na `id` dialogu. Ale animacja łącząca przycisk z dialogem to już zadanie dla View Transitions.

Mechanizm polega na przenoszeniu `view-transition-name` między elementami. Na początku przycisk i jego etykieta mają ustawione nazwy tranzycji. Przy otwieraniu dialogu - po przechwyceniu zdarzenia `command` i anulowaniu domyślnej akcji - `startViewTransition()` przenosi te nazwy na dialog i jego tytuł, a następnie wywołuje `dialog.showModal()`. Przeglądarka widzi dwa elementy z tymi samymi nazwami tranzycji i animuje przejście między ich rozmiarami i pozycjami. Zamknięcie działa analogicznie, tylko w drugą stronę - przechwycone jest zdarzenie `cancel`, nazwy wracają na przycisk, a dialog się zamyka.

Jeden niuans wart odnotowania: artykuł używa `command="request-close"` zamiast `command="close"`, ponieważ tylko `request-close` wywołuje zdarzenie `cancel`, które można przechwycić. Przycisk i jego etykieta są też animowane osobno - gdyby cały przycisk był jedną tranzycją, tekst skalowałby się razem z kontenerem, co wygląda kiepsko.

**Key takeaways:**
- Invoker Commands API pozwala kontrolować dialog bez JavaScript - to dobry punkt startowy
- View Transitions wymaga minimalnego JavaScript do animacji przejścia, ale kod jest czytelny i nie ma skutków ubocznych
- `view-transition-name` musi być przeniesione na element docelowy przed wywołaniem `showModal()` lub `close()` wewnątrz `startViewTransition()`
- Kod powinien sprawdzać `prefers-reduced-motion` i obsługę `startViewTransition` przed uruchomieniem - artykuł to robi

**Why do I care:** View Transitions stają się standardowym narzędziem do budowania płynnych interfejsów bez nadmiarowych zależności. Ten konkretny wzorzec - dialog wyłaniający się z przycisku - to coś, co wcześniej wymagało skomplikowanych bibliotek animacji. Teraz to kilkadziesiąt linii kodu i efekt jest naprawdę przekonujący wizualnie.

**Link:** [Animating The Dialog Element Using View Transitions](https://pqina.nl/blog/animating-the-dialog-element-using-view-transitions/)

---

## Anchor Positioning do obsługi wzorców kart z wieloma akcjami

**TLDR:** Emil Björklund pokazuje jak CSS Anchor Positioning rozwiązuje problem "klikalnej karty" z akcjami drugorzędnymi. Zamiast magicznych wartości w calc() i pozycjonowania względem przodka, dostajemy deklaratywne tethering do wielu kotwic jednocześnie.

Problem z klikalnymi kartami jest stary i dobrze znany. Owinięcie całej karty w `<a>` to błąd dostępności - screen reader będzie czytał każdy element wewnątrz jako część tekstu linku. Standardowym rozwiązaniem jest pseudo-element z `position: absolute` rozciągnięty na całą kartę, zasilający główny link. Problem pojawia się, gdy karta ma przycisk drugorzędny ("Dodaj do ulubionych") - pseudo-element musi się kończyć tam gdzie zaczyna się przycisk, a nie znać tej pozycji z góry.

Anchor Positioning rozwiązuje to elegancko. Karta otrzymuje `anchor-name: --card` i `anchor-scope: --card` (scope sprawia, że każda karta ma własny, lokalny namespace). Pseudo-element linku używa `position: fixed` z `position-anchor: --card` i `position-area: center` z `place-self: stretch` - co rozciąga go dokładnie na rozmiar karty. Gdy pojawia się sekcja z akcją drugorzędną, dostaje `anchor-name: --card-actions`, a dolny inset pseudo-elementu zmienia się na `bottom: anchor(--card-actions top, 0)` - co oznacza "zatrzymaj się tam gdzie zaczyna się sekcja akcji, z fallbackiem 0 gdy jej nie ma".

Użycie `position: fixed` zamiast `position: absolute` jest tu celowe - uniezależnia pozycjonowanie od tego, czy jakiś przodek linku ma `position: relative`. To z kolei ma własne pułapki: `transform` lub `contain` na przodku zepsuje `position: fixed`. Autor uczciwie to zaznacza. Wzorzec można też zastosować do wierszy tabel z przyciskami akcji.

**Key takeaways:**
- `anchor-scope` jest niezbędne przy powtarzalnych komponentach - bez niego ostatnia karta na stronie "wygrywa" i wszystkie pseudo-elementy kotwiczyłyby do niej
- `position: fixed` z `position-anchor` uniezależnia pozycjonowanie od ancestry DOM, ale jest wrażliwe na `transform`/`contain` na przodkach
- Wielokrotne kotwice w jednej regule (`bottom: anchor(--card-actions top, 0)`) to jedna z najsilniejszych cech nowego API
- Anchor Positioning jest Baseline Newly Available od kilku miesięcy - dobry moment na eksperymenty

**Why do I care:** Klikalne karty to jeden z tych wzorców, które każdy implementuje inaczej i żadne rozwiązanie nie jest w pełni satysfakcjonujące. Anchor Positioning daje pierwszą metodę, która jest jednocześnie deklaratywna, odporna na zmiany struktury DOM i nie wymaga JavaScript. Wdrożę to w najbliższym projekcie z dużą ilością kart.

**Link:** [Improving card patterns with anchor positioning](https://thatemil.com/blog/clickable-surface-expansion-using-anchor-position/)

---

## Czy strony muszą działać tak samo na każdej platformie?

**TLDR:** Bram Van Damme argumentuje, że obsesja na punkcie jednolitego działania na wszystkich platformach hamuje rozwój web platformy. Tak jak niegdyś musieliśmy odejść od pixel-perfect wyglądu, teraz musimy zaakceptować, że funkcje specyficzne dla platformy są dobre.

Artykuł zaczyna się od przypomnienia ery Internet Explorera i kultu "pixel perfection" - który w końcu padł pod naporem Progressive Enhancement. Autor stawia tezę, że jesteśmy teraz w analogicznej sytuacji, tylko o krok wyżej: obsesja, że strony muszą działać identycznie na dotykowym telefonie, desktopie z klawiaturą, tablecie ze stylusem i spatial computing Apple Vision Pro, blokuje postęp.

Praktyczne przykłady są konkretne. Interest Invokers - od 1,5 roku toczy się dyskusja jak obsługiwać "zainteresowanie" elementem na urządzeniach dotykowych, bo long-press jest tam zarezerwowany przez system. Overscroll Actions mają problem z "discoverability" na desktopie - niektórzy chcą widocznego przycisku dla każdej akcji overscroll. Document Picture-in-Picture zostało odrzucone przez WebKit, bo nie pasuje do systemu PiP na iOS. Autor ma rację, że każde z tych blokad wynika z założenia, że funkcja musi być dostępna wszędzie albo nie może istnieć w ogóle.

Kontraprzykład z skrótami klawiaturowymi jest celny: nikt nie wymaga, żeby YouTube miał przycisk w UI dla każdego skrótu klawiszowego. Skróty istnieją dla użytkowników klawiatury, gesty swipe dla użytkowników dotykowych, a kliknięcie ikony dla wszystkich innych. Każda platforma dostaje swój mechanizm, bez fragmentacji doświadczenia.

**Key takeaways:**
- Progressive Enhancement w warstwach interakcji - nie tylko wyglądu - to właściwy kierunek dla web platformy
- Interest Invokers, Overscroll Actions i Document Picture-in-Picture to przykłady, gdzie brak akceptacji różnic platformowych blokuje postęp
- Funkcje specyficzne dla klawiatury, dotyku czy gestów nie muszą być dostępne na wszystkich platformach, żeby być wartościowe
- Dyskusje w CSSWG i Open UI byłyby szybsze, gdyby ta zasada była szerzej zaakceptowana

**Why do I care:** To artykuł filozoficzny, ale ma realne konsekwencje. Tracę czas na dyskusje, w których ktoś odrzuca propozale API bo "to nie działa na iOS". Argument Brama jest prosty i przekonujący: keyboard shortcuts na YouTube nie działają bez klawiatury i nikt z tego powodu nie usuwa tej funkcji. Ta sama logika powinna dotyczyć platform webowych.

**Link:** [Do Websites Need to Function Exactly the Same on Every Platform?](https://www.bram.us/2026/06/21/do-websites-need-to-function-exactly-the-same-on-every-platform/)

---

## Koniec klasycznych obrazków responsywnych - sizes="auto" i Client Hints

**TLDR:** Jason Grigsby z Cloud Four wskazuje, że powszechne lazy-loading obrazków usuwa ograniczenie techniczne, które przez lata zmuszało nas do pisania skomplikowanych atrybutów `srcset` i `sizes`. Połączenie `sizes="auto"`, Responsive Image Client Hints i serwisu do resizowania obrazków może uprościć markup do minimum.

Cały problem z `srcset` i `sizes` wynikał z jednego: przeglądarka pobiera obrazki zanim policzy layout strony, więc nie wie ile miejsca zajmie dany obrazek. `sizes` był sposobem na przekazanie tej informacji z wyprzedzeniem - ręcznie, w markupie HTML. To jest nieintuicyjne i trudne w utrzymaniu. Ale `loading="lazy"` zmienia równanie: lazy-loaded obrazki pobierane są dopiero gdy są blisko viewportu, więc przeglądarka już zna ich rozmiar.

W rezultacie `sizes="auto"` (teraz stabilne we wszystkich nowoczesnych przeglądarkach) pozwala przeglądarce samodzielnie obliczyć odpowiedni rozmiar, pod warunkiem że obrazek ma `loading="lazy"`. To usuwa potrzebę ręcznego pisania `sizes`. Kolejny krok to Responsive Image Client Hints: przeglądarka wysyła w nagłówku HTTP faktyczny rozmiar obrazka w pikselach (pomnożony przez density), a serwer zwraca odpowiednią wersję. Eliminuje to potrzebę `srcset` - serwer wie co zwrócić.

Dla obrazków powyżej foldu nic się nie zmienia: muszą być pobrane jak najszybciej, nie mogą być lazy-loaded, więc potrzebują tradycyjnego `srcset` i `sizes`. Client Hints nie są jeszcze obsługiwane przez Firefox i Safari (kwestie prywatności), ale Eric Portis stworzył skrypt dla Cloudinary, który symuluje ich działanie w przeglądarkach bez wsparcia.

**Key takeaways:**
- `sizes="auto"` działa tylko gdy obrazek ma `loading="lazy"` - to celowe ograniczenie, nie bug
- Obrazki powyżej foldu (LCP) nadal wymagają tradycyjnego `srcset` i `sizes` - nie lazy-ładujmy hero images
- Responsive Image Client Hints przez nagłówek `Sec-CH-Width` eliminuje potrzebę `srcset`, ale Firefox i Safari tego nie implementują
- Eric Portis stworzył JavaScript shim dla Cloudinary działający w przeglądarkach bez Client Hints

**Why do I care:** Pisanie `sizes` zawsze sprawiało mi ból. To prezentacyjna informacja o layoutcie ukryta w atrybucie HTML, która desynchronizuje się ze zmianami w CSS. `sizes="auto"` i Client Hints w końcu przenoszą tę odpowiedzialność tam gdzie powinna być - do przeglądarki i serwera. Wdrożę `sizes="auto"` na każdym nowym projekcie już dziś.

**Link:** [Ending Responsive Images](https://cloudfour.com/thinks/ending-responsive-images/)

---

## billboard.js 4.0: tryb canvas i 94% szybszy rendering dużych danych

**TLDR:** billboard.js 4.0 wprowadza opt-in renderowanie przez Canvas zamiast SVG, co w benchmarkach daje 94,3% poprawy szybkości dla wykresów z dużą ilością danych. SVG pozostaje domyślny. Wersja 4.0 poprawia też tree-shaking w ESM o około 19 KB.

SVG jest doskonałym formatem dla wykresów - każdy punkt, belka czy linia to oddzielny element DOM, który można stylować przez CSS, animować i obsługiwać zdarzeniami. Problem zaczyna się przy dziesiątkach tysięcy punktów danych. Każdy z nich to węzeł DOM, a przeglądarka musi zarządzać całym drzewem. Canvas renderuje wszystkie prymitywy do jednego elementu bitmapowego - bez DOM nodes dla poszczególnych punktów. Dla dużych zbiorów danych różnica jest dramatyczna.

Billboard.js 4.0 implementuje Canvas jako oddzielny entry point (`billboard.js/canvas`), co pozwala tree-shakingowi wykluczyć SVG renderery gdy Canvas mode jest aktywny. Konfiguracja `render: { mode: canvas() }` przełącza renderer. Canvas obsługuje większość typów wykresów: linie, bary, scatter, bubble, candlestick, treemap. Wykresy arc (pie, donut, gauge) pozostają SVG - zwykle mają mały DOM i nie zyskałyby na Canvas. Interakcje (tooltips, zoom, selekcja, subchart) działają w obu trybach.

Stylowanie to nowe wyzwanie. W SVG można używać selektorów CSS jak `.bb-bar-0`. W Canvas te elementy DOM nie istnieją. Nowe `canvas.theme.selectors` mapuje znane selektory SVG na instrukcje rysowania Canvas - przeglądarka "próbuje" wartości ze specjalnych SVG probe elements i używa ich do rysowania. To sprytne rozwiązanie migracji, choć nie jest pełnym silnikiem CSS selektorów.

**Key takeaways:**
- Canvas mode jest opt-in i wymaga importu z `billboard.js/canvas` entry point - istniejące projekty nie zmieniają zachowania
- SVG jest nadal domyślny i lepszy dla wykresów z małą ilością danych lub gdy potrzebne jest bogate stylowanie CSS
- `canvas.theme.selectors` mapuje znane CSS selektory na canvas drawing styles - ułatwia migrację z SVG
- ESM bundle może być do 19 KB (minified) lub 6,3 KB (gzipped) mniejszy dzięki lepszemu tree-shakingowi

**Why do I care:** 94% to liczba, którą trudno zignorować. Przy wizualizacjach danych finansowych czy monitoringu z dużą ilością punktów, SVG po prostu nie daje rady. Dobrze, że billboard.js idzie tą drogą zamiast próbować optymalizować DOM - to właściwa decyzja architektoniczna. Opt-in nature Canvas mode to też dobry kompromis - nie zmuszasz wszystkich do migracji.

**Link:** [billboard.js 4.0 release: Canvas rendering mode, 94.3% faster overall in benchmark!](https://netil.medium.com/billboard-js-4-0-release-canvas-rendering-mode-94-3-faster-overall-in-benchmark-894b18798ffe)

---

## Zbędne słowo "navigation" w etykietach nawigacji

**TLDR:** Krótki artykuł o jednym konkretnym błędzie dostępności: umieszczaniu słowa "nawigacja" w `aria-label` elementów `<nav>`. Screen reader i tak ogłosi rolę elementu, więc etykieta "Primary navigation" skutkuje komunikatem "Navigation, Primary navigation".

Element `<nav>` ma implicit role="navigation". Screen reader ogłasza trzy rzeczy: rolę, nazwę i stan. Rola pochodzi automatycznie z `<nav>`. Nazwa pochodzi z `aria-label`. Jeśli ustawimy `aria-label="Primary navigation"`, użytkownik usłyszy coś w stylu "Navigation, Primary navigation landmark" - niepotrzebna redundancja.

Poprawna etykieta to po prostu `aria-label="Primary"` lub `aria-label="Main"` czy `aria-label="Footer"`. To wystarczy. Screen reader sam doda słowo "navigation" z roli elementu. Ta sama zasada dotyczy innych elementów z implicit ARIA roles - nie wpisujemy "button" w `aria-label` przycisku.

**Key takeaways:**
- `<nav aria-label="Main navigation">` jest redundantne - screen reader powie "navigation, main navigation"
- `<nav aria-label="Main">` jest poprawne - screen reader powie "main navigation"
- Ta zasada dotyczy wszystkich elementów HTML z implicit ARIA roles - nie powtarzaj roli w nazwie

**Why do I care:** To pozornie mały błąd, ale gęste, redundantne ogłoszenia screen readera spowalniają przeglądanie strony dla osób na niego zdanych. Warto dodać to do code review checklists.

**Link:** [There's no need to include 'navigation' in your navigation labels](https://www.tempertemper.net/blog/theres-no-need-to-include-navigation-in-your-navigation-labels)
