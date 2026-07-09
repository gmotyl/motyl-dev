---
title: "CSS dostaje supermocę: miksyny, border-shape, anchor positioning i wielki powrót HTML"
excerpt: "Frontend Focus #749 przynosi dawkę nowości z CSS, która zmienia zasady gry: natywne miksyny zbliżają się do przeglądarek, Josh Comeau tłumaczy anchor positioning od podstaw, a David Poblador opisuje dwie dekady frontendowego szaleństwa w jednym artykule. Do tego Safari MCP server, agentic readiness od Chrome i nowe narzędzia deweloperskie."
publishedAt: "2026-07-09"
slug: "frontend-focus-749-css-mixins-anchor-positioning-wielki-powrot-html"
hashtags: "#frontend #webdev #css #javascript #accessibility #webgpu #vscode #safari #mcp #pl"
source_pattern: "Frontend Focus"
---

## The Descent — What Happened to the Frontend While You Weren't Watching

**TLDR:** David Poblador napisał imponujący deep-dive, który w jednym artykule opowiada historię frontendowych narzędzi od 2006 roku do dziś. Osiem warstw, od jQuery przez React, webpack, Vite, meta-frameworki, aż do AI codegen. Konkluzja? Branża zatoczyła wielkie koło i wróciła mniej więcej tam, skąd startowała.

**Summary:** To jest artykuł, który warto mieć pod ręką kiedy ktoś pyta "ale po co ten cały build step". Poblador zaczyna od roku 2008, kiedy robiłeś stronę, wrzucałeś plik przez FTP i działało. Potem opisuje, jak każde narzędzie pojawiło się jako odpowiedź na konkretny ból. jQuery rozwiązał problem różnic między przeglądarkami i ułatwił manipulację DOMem. React i deklaratywne UI pojawiły się, bo ręczna synchronizacja stanu z widokiem to przepis na katastrofę w większych aplikacjach. Build step był nieunikniony, bo moduły JavaScript nie istniały przez większość historii języka, a JSX wymaga transpilacji. Narzędzia pokroju Vite powstały, bo webpack configs stały się ciemną sztuką przekazywaną między deweloperami jak przeklęte zwoje.

Bardzo podoba mi się ta metafora: "każde narzędzie to blizna nad prawdziwą raną". To jest uczciwe spojrzenie na historię. Nikt nie dodawał złożoności dla zabawy. Każda warstwa rozwiązywała realny problem. Problem w tym, że suma rozsądnych decyzji dała nam "wspaniałą, wyczerpującą katedrę szaleństwa", jak pisze Poblador.

Server-side rendering wrócił, bo SPA powodowało biały ekran przy ładowaniu i niewidoczność dla wyszukiwarek. Hydration to płacenie za posiłek dwa razy: raz żeby ugotować HTML na serwerze, drugi raz żeby uruchomić ten sam kod w przeglądarce i "ożywić" stronę. React Server Components to próba obejścia tego problemu, choć sama w sobie bywa trudna do zrozumienia.

Bedrock artykułu jest ironiczny: frontend 2026 roku najchętniej renderuje HTML na serwerze, wysyła jak najmniej JavaScriptu i korzysta z platformy zamiast walczyć z nią. Astro, islands, htmx, server components, to wszystko wskazuje w jednym kierunku: w stronę czegoś, co wygląda niemal jak ten plik przez FTP. Industria przebiegła ogromne koło i dotarła, lekko zdyszana, mniej więcej tam skąd startowała.

**Key takeaways:**
- Każde narzędzie frontendowe rozwiązywało realny problem swojej epoki, złożoność nie jest arbitralna
- Hydration to największy niezamierzony koszt SPA era, wszystkie nowoczesne podejścia próbują go minimalizować
- Trendy 2026 konwergują na: HTML-first, mniej JS w przeglądarce, server rendering
- AI codegen zakłada, że rozumiesz te osiem warstw, bo generowany kod z nich korzysta

**Why do I care:** Ten artykuł powinien być lekturą obowiązkową dla każdego, kto wyjaśnia nowicjuszom "dlaczego to takie skomplikowane". Sam używam tego argumentu od lat, ale Poblador zrobił to lepiej niż ja kiedykolwiek. Dobra narracja historyczna pomaga zrozumieć architekturalne decyzje w istniejących projektach i ocenić, czy dana złożoność jest jeszcze uzasadniona.

**Link:** [The Descent — What Happened to the Frontend While You Weren't Watching](https://davidpoblador.com/deep-dives/what-happened-to-the-frontend/)

---

## Getting Started with Anchor Positioning

**TLDR:** Josh W. Comeau napisał wprowadzenie do CSS Anchor Positioning API: jak przypiąć element do innego elementu, jak obsłużyć overflow z automatycznym flipowaniem, i jak użyć nowych "anchored container queries" z Level 2 specyfikacji. Bardzo przystępny tutorial z interaktywnymi playground'ami.

**Summary:** Anchor Positioning to jeden z tych API, które rozwiązują problem, nad którym wszyscy pracowali przez lata w JavaScript. Tooltip, który wypada poza viewport i trzeba pisać logikę z getBoundingClientRect, sprawdzać czy jest wystarczająco miejsca u góry czy u dołu, radzić sobie z resize i scroll. Teraz CSS robi to za nas.

Comeau tłumaczy dwie podstawowe rzeczy: jak nadać elementowi anchor-name i wskazać go przez position-anchor w elemencie docelowym, oraz jak position-area działa jak siatka 3x3 wokół anchora, gdzie możemy umieścić nasz element. To jest czytelna abstrakcja i naprawdę dobrze przemyślana.

Prawdziwa siła to position-try-fallbacks, który pozwala powiedzieć przeglądarce "jeśli element nie mieści się w aktualnej pozycji, spróbuj tej". Przeglądarka automatycznie sprawdza podczas scroll i resize. flip-block to specjalny keyword, który odwraca pozycję w osi blokowej, i co ważne działa we wszystkich major browserach.

Ale jest haczyk, na który trzeba zwrócić uwagę. Poziom 2 Anchor Positioning, czyli anchored container queries, które pozwalają zmieniać style w zależności od tego czy element jest na pozycji podstawowej czy fallback, to aktualnie tylko Chromium. Jeśli chcemy ładnie odwrócić strzałkę w tooltipie kiedy przeskakuje na drugą stronę, potrzebujemy tej funcjonalności. Interop 2026 ma to naprawić, ale do końca roku jeszcze kawałek drogi. Comeau uczciwie zaznacza, że w wielu przypadkach biblioteki JavaScript są na razie lepszym wyborem.

**Key takeaways:**
- anchor-name i position-anchor tworzą połączenie między elementami
- position-try-fallbacks automatycznie sprawdza alternatywne pozycje przy overflow
- flip-block działa cross-browser, anchored container queries na razie tylko Chromium
- Polyfill od Oddbird dostępny, ale nie wspiera Level 2 funkcji

**Why do I care:** Tooltip i dropdown positioning to rzeczy, które każdy projekt musi rozwiązać. Dziś płacimy Floating UI lub podobnym bibliotekom kilkanaście KB i złożoność konfiguracji. Anchor Positioning może to zastąpić natywnie. Nie jest jeszcze gotowe do pełnego wdrożenia wszędzie, ale za rok będzie. Warto znać API już teraz.

**Link:** [Getting Started with Anchor Positioning](https://www.joshwcomeau.com/css/anchor-positioning/)

---

## New to the web platform in June 2026

**TLDR:** Czerwiec przyniósł kilka ważnych nowości: field-sizing staje się Baseline, gap decorations lądują w Chrome, text-fit pozwala automatycznie skalować tekst do kontenera, a programmatic scroll methods zwracają teraz Promise. Sporo przydatnych rzeczy.

**Summary:** field-sizing: content to mała, ale bardzo praktyczna rzecz. Textarea lub input, który automatycznie rośnie razem z zawartością, bez JavaScript. Firefox 152 dodał wsparcie i teraz to Baseline Newly Available. Koniec z mierzeniem wysokości tekstu w JS i ręcznym ustawianiem height.

Gap decorations w Chrome 149 to coś, na co czekałem od dawna. Stylowanie odstępów między elementami grid lub flex bez border hacków i pseudo-elementów. column-rule i row-rule pozwalają dodać linie bezpośrednio do gap. Nareszcie.

text-fit w Chrome 150 to automatyczne skalowanie font-size żeby tekst zmieścił się w szerokości kontenera. Przydatne przy nagłówkach. focusgroup attribute to deklaratywna obsługa nawigacji strzałkami w composite UI controls, bez ręcznego pisania roving tabindex. Chrome 150. Scrollable scrollTo i scrollBy zwracają teraz Promise, który resolves po zakończeniu animacji scrollowania. Czekaliśmy na to od lat.

Warto też odnotować Safari 27 beta, gdzie pojawiło się transform-aware anchor positioning i pseudoklasa :heading, która matchuje wszystkie elementy nagłówkowe jednocześnie. Rzeczy dzieje się.

**Key takeaways:**
- field-sizing: content jest teraz Baseline i działa we wszystkich major browserach
- Gap decorations w Chrome 149 eliminują border hacki w grid/flex
- scrollTo() / scrollBy() zwracają Promise w Chrome 150
- focusgroup attribute upraszcza keyboard navigation w composite controls

**Why do I care:** Każda z tych rzeczy usuwa jeden konkretny JavaScript workaround. Gap decorations, field-sizing, scroll promises to są wzorce, które mam w każdym projekcie i które do tej pory wymagały kodu lub zewnętrznych bibliotek. Natywne rozwiązania CSS i HTML są zawsze preferowane.

**Link:** [New to the web platform in June 2026](https://web.dev/blog/web-platform-06-2026)

---

## Introducing the Safari MCP Server for Web Developers

**TLDR:** Apple wypuściło Safari MCP Server w Safari Technology Preview 247, który pozwala agentom AI połączyć się bezpośrednio z oknem Safari i debugować strony bez przeskakiwania między oknami. Agent może robić screenshoty, sprawdzać DOM, monitorować network requests i testować accessibility.

**Summary:** Idea jest prosta i dobra: skoro coraz więcej deweloperów używa agentów AI w pracy, to agent powinien móc zobaczyć co się dzieje w przeglądarce bez tego, że mu ręcznie kopiujesz błędy z konsoli lub opisujesz co widzisz na ekranie. Safari MCP Server daje agentowi dostęp do DOM, logów konsoli, screenshotów, network requestów i możliwości interakcji z elementami.

Narzędzia, które udostępnia server, są całkiem kompletne: nawigacja do URL, screenshot, evaluate JavaScript na stronie, lista network requestów z timingiem, interakcje z DOM, zarządzanie zakładkami, emulacja media queries, ustawianie viewport. To jest w zasadzie headless browser dla agenta, tyle że to jest prawdziwe Safari, więc testujesz w rzeczywistym silniku rendering.

Jeden z lepszych use case'ów: sprawdzanie kompatybilności z Safari. Testowanie tylko w jednej przeglądarce to przepis na bugsy dla użytkowników Safari. Agent może otworzyć stronę, sprawdzić computed styles, porównać layout z oczekiwanym. Bez przeskakiwania okien. To ma sens.

Warto jednak być świadomym ograniczeń. Safari MCP Server działa lokalnie i wymaga Safari Technology Preview, nie stabilnej wersji. Na razie to jest narzędzie dla early adopterów. Co ważne: dane z przechwytywania strony trafiają bezpośrednio do agenta, nie do Apple.

**Key takeaways:**
- Safari MCP Server łączy agenta AI bezpośrednio z okną Safari
- Dostępne narzędzia: DOM, screenshot, console logs, network requests, JavaScript evaluation
- Działa tylko z Safari Technology Preview na razie
- Dobre do debugowania problemów Safari-specific bez ręcznego opisywania stanu strony

**Why do I care:** Safari pozostaje problematyczną przeglądarką dla wielu rzeczy. Mając agenta, który może bezpośrednio sprawdzić jak coś wygląda w Safari i opisać problem bez mojego udziału, oszczędzam czas na najnudniejszym typie debugowania. Czekam na stabilną wersję.

**Link:** [Introducing the Safari MCP server for web developers](https://webkit.org/blog/18136/introducing-the-safari-mcp-server-for-web-developers/)

---

## Get Ready For the Powerful CSS border-shape Property!

**TLDR:** CSS border-shape to nadchodząca właściwość, która pozwala nadać elementowi dowolny kształt jednocześnie zachowując działanie border, box-shadow i outline, co jest niemożliwe przy clip-path. Na razie tylko Chrome, ale potencjał jest ogromny.

**Summary:** Przez lata tworzenie CSS shapes było uciążliwe z jednego głównego powodu: clip-path przycina cały element włącznie z dekoracjami. Chcesz dodać border do kształtu trójkąta? Nie ma mowy, clip-path po prostu tnie. Dotychczasowe rozwiązania to SVG, pseudo-elementy lub całkowita rezygnacja.

border-shape rozwiązuje to inaczej: zamiast przycinać element, "kształtuje" go, co oznacza, że border, box-shadow i outline podążają za tym kształtem. Składnia jest prawie identyczna jak clip-path, więc jeśli znasz jedno, znasz drugie.

Szczególnie ciekawy jest tryb dwóch kształtów, gdzie podajesz zewnętrzną i wewnętrzną granicę. border-shape: inset(0) circle() rysuje border w obszarze między prostokątem a kołem, dając efekt circular cutout. Kombinacje są właściwie nieograniczone.

Animacje border-shape też działają. Można animować border-width żeby zrobić reveal effect, lub animować same wartości kształtu. Do tego breakout decorations, gdzie tło elementu rozciąga się poza jego granice, bez hackowania z negative margins. Uczciwie: to jest dopiero Chrome, bez jasnej daty kiedy inne przeglądarki dołączą. Ale warto to znać, bo właściwość zapowiada się bardzo mocno.

**Key takeaways:**
- border-shape pozwala nakładać border, box-shadow, outline na dowolny kształt
- Tryb dwóch kształtów tworzy border między dwoma obszarami
- Animowalność otwiera nowe możliwości dla CSS animations
- Aktualnie tylko Chrome, brak daty cross-browser

**Why do I care:** Tworzenie CSS shapes z borderami to był od zawsze ból. Stale sięgam po SVG lub background gradient haki. border-shape może to zmienić fundamentalnie. Monitoruję kiedy trafi do Interop.

**Link:** [Get Ready For the Powerful CSS border-shape Property!](https://css-tricks.com/get-ready-for-the-powerful-css-border-shape-property/)

---

## New in Edge for Developers: Style Layout Gaps, Improve Keyboard Accessibility and Migrate Your PWA

**TLDR:** Microsoft Edge wprowadza kilka konkretnych ulepszeń dla deweloperów: CSS gap decorations do stylowania odstępów w layout, focusgroup attribute dla nawigacji klawiaturą, migrację PWA do nowego origin bez utraty instalacji użytkowników, i kilka innych przydatnych rzeczy.

**Summary:** Gap decorations już widzieliśmy w web.dev article, ale Edge blog daje więcej kontekstu implementacyjnego. row-rule i column-rule to nowe właściwości, które działają w flex, grid i multi-column. Jest też rule shorthand i obsługa repeat() syntax. Playground jest dostępny.

focusgroup attribute jest szczególnie warty uwagi z perspektywy accessibility. Composite widgets jak toolbary, tablisy, menu wymagają arrow key navigation. Dotychczas każdy implementował to ręcznie przez roving tabindex, event listeners i zarządzanie focus. focusgroup robi to deklaratywnie. Jeden atrybut na kontenerze i arrow keys działają. To jest prawdziwe uproszczenie dla deweloperów tworzących dostępne UI.

PWA origin migration to odpowiedź na realny problem. Jeśli przenosisz aplikację z example.com/app na app.example.com, użytkownicy tracili instalację PWA i musieli reinstalować. Teraz same-site migration jest bezbolesna dla użytkowników. Edge i Chrome już to wspierają.

Zapowiedź install element to ciekawy pomysł: natywny przycisk instalacji PWA bez JavaScript. Przeglądarka kontroluje label i wygląd. Nie jest jeszcze w stabilnym release, ale kierunek jest dobry.

**Key takeaways:**
- CSS gap decorations dostępne w Edge, eliminują border hacki w layoutach
- focusgroup attribute automatyzuje arrow key navigation bez JavaScript
- PWA origin migration działa teraz bezproblemowo w tej samej domenie
- Nowy install element HTML dla PWA w fazie testów

**Why do I care:** focusgroup to rzecz, którą chciałem mieć od lat. Ręczne implementacje roving tabindex to kod, który zawsze jest trochę inaczej zrobiony w każdym projekcie i zawsze ma jakiś edge case. Deklaratywne podejście to właściwy kierunek.

**Link:** [New in Edge for developers](https://blogs.windows.com/msedgedev/2026/07/07/new-in-edge-for-developers-style-layout-gaps-improve-keyboard-accessibility-and-migrate-your-pwa-to-a-new-origin/)

---

## Fixing Full-Bleed CSS

**TLDR:** David Bushell opisuje problem z klasycznym patternem "full-bleed" w CSS, gdzie elementy mają rozciągać się na pełną szerokość strony pomimo padding kontenera. Stara metoda z viewport units ma bug ze scrollbarem na Windows, nowe podejście z CSS containment i jednostkami kontenera rozwiązuje problem elegancko.

**Summary:** Full-bleed pattern pojawia się wszędzie: chcesz żeby obraz hero, albo kolorowy banner, rozciągał się na całą szerokość okna przeglądarki, ale reszta treści ma padding po bokach. Andy Bell ma popularny utility class, który używa 100vw i ujemnych marginesów. Problem: na Windows z widocznym scrollbarem 100vw jest szersze niż viewport o szerokość scrollbara. Efekt: kilka pikseli przycinania z każdej strony.

Stare obejście przez overflow-x: hidden na body ma swoje wady. Alternatywnie scrollbar-gutter: stable rezerwuje miejsce, ale wygląda dziwnie gdy scroll nie jest potrzebny.

Nowoczesne rozwiązanie to CSS containment. Robimy z body lub wybranego elementu container, zastępujemy 100vw jednostkami kontenera 100cqi. Teraz full-bleed element używa szerokości kontenera zamiast okna przeglądarki. Nie ma problemu ze scrollbarem.

Jest jednak subtelny problem z zagnieżdżonymi kontenerami. Jeśli .full-bleed jest wewnątrz innego kontenera, cqi odnosi się do tamtego kontenera a nie body. Bushell rozwiązuje to sprytnie przez @property z CSS custom property, które dziedziczy przeliczoną wartość. Trochę trudne do ogarnięcia na pierwszy rzut oka, ale działa. Na końcu artykułu postuluje lepsze rozwiązanie: jednostki kontenera z nazwą, 100cqi(body), które pozwoliłyby bezpośrednio odwołać się do konkretnego kontenera. Dobry pomysł, ale jeszcze nie w specyfikacji.

**Key takeaways:**
- 100vw ma bug ze scrollbarem na Windows, nie używać do full-bleed
- CSS containment z 100cqi to właściwe nowoczesne rozwiązanie
- @property z inherits: true pozwala przekazywać przeliczone wartości przez zagnieżdżone kontenery
- overflow-x: clip lepsze niż hidden w tym kontekście

**Why do I care:** Full-bleed pattern mam w każdym projekcie contentowym. Ten bug ze scrollbarem Windows to jeden z tych subtlenych problemów, które raportują użytkownicy a ty długo nie wiesz skąd się bierze. Nowoczesne rozwiązanie jest lepsze i warto je znać.

**Link:** [Fixing full-bleed CSS](https://dbushell.com/2026/07/03/fixing-full-bleed-css/)

---

## Building Persistent Page Transitions with WebGPU and Vanilla JavaScript

**TLDR:** Ben Paine z Codrops opisuje jak zbudować page transitions, gdzie obrazy "przelatują" między stronami jako płaszczyzny WebGPU, zamiast znikać i pojawiać się od nowa. Efekt jest płynny, bo scena WebGPU trwa przez cały czas nawet gdy DOM strony się zmienia.

**Summary:** To jest techniczny tutorial na wysokim poziomie, który prezentuje ciekawe podejście do animacji między stronami. Zamiast View Transitions API (który operuje na DOM snapshots), Paine używa jednej ciągłej sceny WebGPU, gdzie obrazy są płaszczyznami trwającymi przez cały czas życia aplikacji. DOM ma tylko puste "sloty", pojemniki, które rezerwują miejsce. Faktyczne obrazy to płaszczyzny WebGPU siedzące na warstwie canvas powyżej.

Kluczowy trick: płaszczyzny trackują pozycję DOM slotów przez getBoundingClientRect co frame. Przy przejściu między stronami trackowanie jest wyłączane, tweeny animują bounds i opacity, a potem trackowanie jest włączane na nowych slotach docelowej strony. Stara i nowa strona współistnieją chwilę w DOM podczas przejścia.

Trzy typy operacji na płaszczyznach: keep (morph bounds z jednej pozycji do drugiej), remove (fade opacity do 0), add (ustaw na docelowej pozycji, fade z 0 do 1). Całość zaimplementowana w vanilla JavaScript z GSAP do tweenów.

Doceniam, że Paine jest szczery co do złożoności: to nie jest coś, co wrzucasz do każdego projektu. WebGPU setup, custom router, zarządzanie planes to sporo kodu. Ale jako demonstracja możliwości platformy i jako inspiracja dla portfoli i kreatywnych stron jest bardzo dobra.

**Key takeaways:**
- WebGPU pozwala na "persistent" elementy między stronami SPA przez ciągłą scenę
- DOM sloty to tylko mierzalniki pozycji, nie trzymają faktycznych obrazów
- Trzy operacje: keep (morph), remove (fade out), add (fade in) budują każde przejście
- Wymaga sporo setupu, lepsze dla portfoli i kreatywnych projektów niż aplikacji

**Why do I care:** View Transitions API jest fajne, ale ma ograniczenia. Ten approach z WebGPU daje pełną kontrolę nad tym co się dzieje z elementami podczas przejścia. Nie użyję tego w każdym projekcie, ale wiedzieć jak to działa i kiedy ma sens to wartościowa wiedza.

**Link:** [Building Persistent Page Transitions with WebGPU and Vanilla JavaScript](https://tympanus.net/codrops/2026/06/30/building-persistent-page-transitions-with-webgpu-and-vanilla-javascript/)

---

## Designing for People with Reading Disabilities

**TLDR:** TetraLogical opisuje jak projektować treści cyfrowe z myślą o osobach z dysleksją, aleksją i innymi zaburzeniami czytania. Konkretne wskazówki dotyczące języka, formatowania, typografii i struktury. Dostępność w praktyce, nie teoria.

**Summary:** Artykuł Grace Snow od razu zaznacza ważną rzecz: czytanie to nie binarne "umiesz albo nie". To spektrum. Dla wielu osób dekodowanie tekstu wymaga dużego wysiłku poznawczego. Kiedy czytanie jest wyczerpujące, zostaje mniej energii na rozumienie i podejmowanie decyzji. To jest zmiana perspektywy, która ma realne konsekwencje projektowe.

Konkretne zalecenia: prosty język, krótkie zdania, aktywna forma zamiast biurokratycznej. "The implementation of the policy will commence" to "The policy starts". Wyrównanie tekstu do lewej zamiast justowania, które tworzy nierównomierne przerwy między słowami. Linie 70-80 znaków maksymalnie. Opisowe nagłówki, które pozwalają na orientację w strukturze strony.

Typografia ma znaczenie, ale badania wskazują, że cechy liter ważniejsze niż konkretny "dyslexia-friendly font". Distinctive shapes: litery 'l' i '1', 'O' i '0' powinny wyglądać inaczej. Wysokie x-height, otwarte formy liter. Unikać dużych bloków bold lub italic i tekstu pisanego wyłącznie wielkimi literami.

Dobrze napisana dostępność jest dostępnością dla wszystkich. Uproszczony język pomaga też osobom czytającym w drugim języku, osobom w pośpiechu, osobom o niskim poziomie cyfrowej biegłości. To nie jest zero-sum.

**Key takeaways:**
- Prosty język i krótkie zdania zmniejszają obciążenie kognitywne dla wszystkich
- Wyrównanie do lewej, nie justowanie, dla lepszej czytelności
- Cechy liter (distinctive shapes, x-height) ważniejsze niż "specjalny font"
- Opisowe linki zamiast "kliknij tutaj", ikony jako wizualne wskazówki

**Why do I care:** Accessibility często myślimy przez pryzmat screen readerów i kontrastu. Zaburzenia czytania to szeroka kategoria, która dotyczy dużej części populacji. Dobre praktyki typograficzne i content designu to też accessibility. Warto je znać i wdrażać.

**Link:** [Designing for people with reading disabilities](https://tetralogical.com/blog/2026/06/25/designing-for-reading-disabilities/)

---

## A Developer Toolkit to Make Your Website Agent-Ready

**TLDR:** Chrome i Google prezentują zestaw narzędzi do testowania i poprawiania "agentic readiness" stron: nowa kategoria Lighthouse dla agentic browsing, Chrome DevTools for Agents, i WebMCP standard. Jeśli chcesz żeby AI agenty mogły niezawodnie korzystać z Twojej strony, te narzędzia ci w tym pomogą.

**Summary:** To jest artykuł, który albo cię ekscytuje albo niepokoi, w zależności od tego jak patrzysz na trend agentic web. Idea jest prosta: AI agenty coraz częściej nie tylko generują tekst, ale przeglądają strony i wykonują zadania. Rezerwacje, zakupy, formularze. Deweloper powinien upewnić się, że strona działa niezawodnie dla nieludzkich użytkowników.

Nowa kategoria Lighthouse "Agentic browsing" sprawdza trzy rzeczy: accessibility (bo agent korzysta z accessibility tree jako primary data model), stability (CLS, bo agenty mogą kliknąć w zły element jeśli layout przeskakuje), i WebMCP integration. To jest ciekawe: dobre accessibility to nie tylko dla ludzi, ale i dla agentów. Dobry argument dla tych, którzy accessibility ignorują z powodów "biznesowych".

WebMCP to proponowany standard do exposowania strukturalnych narzędzi dla agentów na istniejących stronach. Idea bliska MCP (Model Context Protocol), ale dla web. Strona deklaruje jakie operacje agent może wykonać, zamiast agent próbuje to odkryć przez DOM.

Chrome DevTools for Agents daje możliwość symulowania jak agent widzi twoją stronę: accessibility tree, screenshotów, testowania flows. To jest sensowne narzędzie do debugowania.

Mam pewne zastrzeżenie: termin "agentic readiness" brzmi trochę jak marketing, i nie jestem pewien, że każdy serwis powinien optymalizować się pod kątem AI agentów w pierwszej kolejności. Ale narzędzia do auditu accessibility są zawsze dobre.

**Key takeaways:**
- Lighthouse dostaje nową kategorię "Agentic browsing" od Chrome 150
- Agenty korzystają z accessibility tree, dobra a11y pomaga też agentom
- WebMCP to proponowany standard do strukturalnej komunikacji z agentami
- CLS (layout stability) ważny dla agentów, które klikają w elementy

**Why do I care:** Narzędzie do automatycznego auditu accessibility w Lighthouse to coś konkretnego i przydatnego niezależnie od "agentic web" narracji. Reszta jest ciekawa obserwacyjnie, ale nie zmieniałbym priorytetów projektu tylko żeby agenty lepiej mogły klikać w moje formularze.

**Link:** [A developer toolkit to make your website agent-ready](https://developer.chrome.com/blog/agent-ready-toolkit)

---

## Visual Studio Code 1.127

**TLDR:** VS Code 1.127 dodaje browser tools dla agentów jako generally available, lepsze zarządzanie sesjami w oknie Agents, sandbox dla komend terminalowych na macOS i Linux, i per-site uprawnienia w wbudowanej przeglądarce. Sporo usprawnień dla deweloperów używających Copilot.

**Summary:** Największa zmiana dla osób używających VS Code z agentami: browser tools są teraz GA. Agent może otwierać strony w wbudowanej przeglądarce, czytać zawartość, robić screenshoty, klikać, pisać i sprawdzać błędy konsoli bez zewnętrznego MCP serwera. Coś, co wymagało konfiguracji, teraz działa out of the box. To zamyka pętlę build-test-fix dla aplikacji webowych.

Sandbox dla komend terminalowych to ważne bezpieczeństwo. Agenty generują dużo komend terminalowych. Do tej pory trzeba było akceptować każdą. Teraz komendy działają w sandbox z zablokowanym dostępem sieciowym i ograniczonym filesystem. Agent pyta o zgodę tylko kiedy potrzebuje wyjść poza sandbox. Mniej przerywania pracy.

Agents window dostaje grupy i drag-and-drop do organizowania sesji. Kiedy masz kilkanaście równoległych sesji agenta, to ma sens. Multi-chat sessions dostają lepsze zarządzanie: możesz zamknąć i przywrócić chaty, fork tworzy peer chat w tej samej sesji zamiast nowej sesji od zera.

CI failure banners bezpośrednio w chat input to drobna ale wygodna rzecz: nie trzeba przełączać się do PR żeby zobaczyć że testy padły. Agent może od razu podjąć akcję naprawczą.

Deprecacja wbudowanego Ollama providera jest sensowna: jest teraz oficjalny extension, który jest utrzymywany przez Ollama team.

**Key takeaways:**
- Browser tools dla agentów GA od 1.127, działa bez dodatkowej konfiguracji
- Terminal command sandboxing na macOS i Linux zmniejsza ilość prompt'ów
- Agents window: grupy sesji, drag-and-drop, CI failure banners
- Wbudowany Ollama provider deprecated, migracja na oficjalny extension

**Why do I care:** VS Code jest moim głównym edytorem. Browser tools GA to konkretna zmiana w workfłow, szczególnie przy debugowaniu CSS i layoutów. Nie muszę już opisywać agentowi co widzę w przeglądarce, on może to sprawdzić sam.

**Link:** [Visual Studio Code 1.127](https://code.visualstudio.com/updates/v1_127)

---

## µJS — Lightweight AJAX Navigation Library

**TLDR:** µJS to 5KB biblioteka w duchu htmx i Turbo, która przechwytuje kliknięcia w linki i przesyłanie formularzy, pobiera nową stronę przez AJAX i podmienia tylko zmienioną treść. Działa z dowolnym backendem, bez build step, z Vue Transitions i DOM morphing.

**Summary:** µJS wpisuje się w nurt "daj mi SPA-like navigation bez budowania SPA". To jest ta sama idea co Hotwire/Turbo od Rails albo htmx, tyle że zaprojektowana jako minimalna biblioteka drop-in do istniejących stron. Jeden script tag, jedno wywołanie init(), i wszystkie wewnętrzne linki stają się AJAX navigation.

Co wyróżnia µJS spośród alternatyw: obsługa AbortController, więc jeśli użytkownik klika szybko, poprzedni request jest anulowany zanim nowy się skończy. Patch mode, który pozwala zaktualizować kilka fragmentów strony jednym requestem. SSE wsparcie dla real-time updates. View Transitions API i DOM morphing.

Rozmiar 5KB jest uczciwy. Zero dependencies, zero build step. Dla projektu PHP, Pythona, Go, czy cokolwiek co serwuje HTML, to jest bardzo niski próg wejścia.

Warto jednak porównać z htmx przed wyborem. htmx jest bardziej dojrzałe, ma większą dokumentację i community. µJS jest nowszy i bardziej minimalistyczny. Dla prostych projektów i istniejących stron, które chcą trochę interaktywności bez full SPA, obie opcje są sensowne. Wybór zależy od tego, ile z tych funkcji potrzebujesz.

**Key takeaways:**
- 5KB, zero dependencies, zero build step, działa z dowolnym backendem
- AbortController anuluje in-flight requests przy szybkiej nawigacji
- Patch mode aktualizuje kilka fragmentów strony jednym requestem
- Alternatywa dla htmx i Turbo, jeszcze niszowe ale dobrze zaprojektowane

**Why do I care:** Nie każdy projekt potrzebuje React. Dla stron contentowych, aplikacji z lekką interaktywnością lub projektów istniejących w technologiach backendowych, drop-in AJAX navigation jest często lepszym wyborem niż przepisanie na SPA. µJS jest na liście narzędzi do rozważenia.

**Link:** [µJS — Lightweight AJAX Navigation Library](https://mujs.org/)

---

## Introducing Baseline Alerts

**TLDR:** Web Platform Status dashboard (webstatus.dev) dodał system subskrypcji, który pozwala dostać powiadomienie mailowe lub RSS kiedy wybrane web features zmieniają swój Baseline status. Można subskrybować konkretne funkcje, grupy lub wyniki wyszukiwania.

**Summary:** Problem był prosty: żeby wiedzieć kiedy nowa funkcja CSS lub JavaScript jest bezpiecznie dostępna we wszystkich przeglądarkach (Baseline), musiałeś regularnie sprawdzać webstatus.dev albo natknąć się na informację przypadkiem. Baseline Alerts rozwiązuje to przez push notifications.

Możliwości są sensowne: subskrypcja do wszystkich features, do konkretnej funkcji (np. anchor positioning), lub do wyników wyszukiwania (np. wszystkich CSS features). Triggery do wyboru: widely available, newly available, nowa implementacja w przeglądarce, lub regresja. Częstotliwość: każda zmiana, tygodniowo lub miesięcznie.

Slack webhook support to dobry dodatek dla teamów, które chcą śledzić postęp web platform bez indywidualnych subskrypcji. Można targetować konkretny kanał.

To jest narzędzie, które rozwiązuje realny problem. Decyzja "czy mogę już użyć tej funkcji w produkcji" wymaga wiedzy o Baseline status. Teraz możesz być powiadamiany automatycznie zamiast sprawdzać ręcznie. Prosta wartość, dobrze zaimplementowana.

**Key takeaways:**
- Subskrypcje do konkretnych funkcji, grup lub wyników wyszukiwania na webstatus.dev
- Email lub RSS notifications kiedy feature zmienia Baseline status
- Slack webhook support dla teamów
- Brak konta wymagany do przeglądania, GitHub login do subskrypcji

**Why do I care:** Śledzę Baseline status regularnie zanim użyję nowych CSS features. Do tej pory robiłem to ręcznie. Baseline Alerts automatyzuje ten krok. Subskrypcja do "CSS custom functions and mixins" jest już na liście.

**Link:** [Introducing Baseline Alerts](https://web.dev/blog/baseline-alerts)
