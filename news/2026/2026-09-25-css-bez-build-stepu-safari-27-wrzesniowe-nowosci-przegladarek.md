---
title: "CSS bez build stepu, Safari 27 i wrześniowe nowości w przeglądarkach"
excerpt: "Przegląd wydania Frontend Focus poświęconego natywnym funkcjom CSS, aktualizacji Safari 27 z 83 nowymi funkcjami oraz wrześniowym zmianom w Chrome i Edge."
publishedAt: "2026-09-23"
slug: "css-bez-build-stepu-safari-27-wrzesniowe-nowosci-przegladarek"
hashtags: "#frontendfocus #css #html #safari #webkit #chrome #edge #devtools #accessibility #performance #javascript #generated #pl"
source_pattern: "Frontend Focus"
---

## 12 funkcji CSS, które pozwolą pożegnać zależności

**TLDR:** Przeglądarki dogoniły część możliwości, dla których zespoły do dziś trzymają w projekcie Sass albo dodatkowe biblioteki. Redakcja Frontend Focus zestawiła funkcje CSS dostępne bez żadnego kroku budowania, wskazując między innymi natywne zagnieżdżanie selektorów i :has().

**Summary:** Przez lata Sass był w zasadzie obowiązkowym elementem stosu, choćby tylko po to, żeby zagnieżdżać selektory i unikać powtarzania tych samych prefiksów w arkuszu stylów. Natywne zagnieżdżanie w CSS zdejmuje ten jeden konkretny powód z listy uzasadnień dla preprocesora. Podobnie jest z selektorem :has(), który wreszcie pozwala stylować element rodzica na podstawie tego, co się w nim znajduje, bez sięgania po dodatkową klasę na wrapperze i bez JavaScriptu podpinającego się pod zdarzenia. To dwa przykłady, które pojawiają się w zajawce tego wydania, a sam tytuł artykułu sugeruje, że lista jest dłuższa i obejmuje więcej takich zamienników.

Pełna treść oryginalnego artykułu Flavio Copesa nie była dostępna w podglądzie, więc nie da się tu uczciwie streścić wszystkich dwunastu pozycji. Sam kierunek jest jednak czytelny i widać go też w innych materiałach z tego wydania: przeglądarki krok po kroku przejmują zadania, które wcześniej wymagały narzędzi budowania, transpilerów albo dodatkowych bibliotek w bundlu.

**Key takeaways:**
- Natywne zagnieżdżanie selektorów w CSS eliminuje jeden z głównych powodów trzymania Sass w projekcie.
- Selektor :has() zastępuje sztuczki z dodatkową klasą na elemencie nadrzędnym przy warunkowym stylowaniu.
- Zajawka nie ujawnia pełnej listy dwunastu funkcji, więc przed usunięciem zależności sprawdź oryginalny artykuł i tabele wsparcia przeglądarek.

**Why do I care:** Z perspektywy architektury frontendu każda zależność, którą można wyciąć z build stepu, to mniej rzeczy do aktualizowania i mniej potencjalnych konfliktów wersji w przyszłości. Zanim jednak ktoś usunie Sass z istniejącego projektu, sensowniej jest sprawdzić, ile z jego funkcji faktycznie jest używanych poza samym zagnieżdżaniem, bo mapy źródłowe i inne narzędzia deweloperskie bywają trudniejsze do odtworzenia natywnie niż sama składnia.

**Link:** [12 CSS features that can retire your dependencies](https://frontendfoc.us/issues/759)

## WebKit dla Safari 27.0: rekordowa lista funkcji i 844 poprawki jakości

**TLDR:** Safari 27.0 wprowadza 83 nowe funkcje, od w pełni stylowalnego elementu select po kotwiczenie przewijania i przepisany od zera loader modułów ES, a zespół WebKit podkreśla, że tym razem najważniejsza jest jakość, nie liczba nowości.

**Summary:** Zespół WebKit sam przyznaje, że lista wydania nigdy nie była tak długa, bo liczba funkcji wzrosła z 58 do 83 od pierwszej wersji beta. Mimo to największą "funkcją" tego wydania nie jest żadna pojedyncza rzecz, tylko 844 poprawki jakości istniejących mechanizmów: od poprawnego renderowania tekstu w Pahawh Hmong po systematyczny przegląd tabel HTML i animacji SMIL w SVG.

Wśród nowości najwięcej uwagi przyciąga Customizable Select, czyli w pełni stylowalny element select z nowymi domyślnymi stylami warstwy UA i pseudoelementami takimi jak ::picker-icon czy ::checkmark. Do tego dochodzi kotwiczenie przewijania włączone domyślnie, element model dostępny teraz też na iOS, iPadOS i macOS, oraz obsługa atrybutu sizes="auto" przy leniwie ładowanych obrazach responsywnych.

W samym CSS pojawia się słowo kluczowe stretch jako zamiennik dla -webkit-fill-available, trzy poprawki do pozycjonowania kotwiczonego (w tym uwzględnianie transformacji CSS anchora), nowa funkcja koloru alpha() do zmiany tylko przezroczystości, color-mix() przyjmujący więcej niż dwa kolory naraz, pseudoklasa :heading dla wszystkich nagłówków oraz słowo kluczowe revert-rule dla precyzyjniejszego cofania kaskady. Pod maską zaszła też duża zmiana: loader modułów ES został przepisany od zera w C++ zgodnie ze specyfikacją ECMAScript, co naprawia znany od dawna problem z top-level await, przez lata odpowiedzialny za konkretne błędy międzyprzeglądarkowe.

**Key takeaways:**
- Customizable Select (appearance: base-select) daje w pełni stylowalny natywny dropdown z automatyczną dostępnością i obsługą klawiatury.
- Kotwiczenie przewijania jest teraz włączone domyślnie, więc strony z dynamicznie doładowywaną treścią przestają "skakać" bez dodatkowego kodu.
- Przepisany loader modułów ES naprawia długoletnie błędy z top-level await, na które zespoły pisały obejścia.
- CSS zyskuje stretch, ulepszone anchor positioning, nowe funkcje kolorów oraz pseudoklasę :heading.
- 844 poprawki jakości to więcej niż suma nowych funkcji, co pokazuje, gdzie faktycznie poszedł wysiłek zespołu.

**Why do I care:** Dla architektów i zespołów utrzymujących komponenty formularzy Customizable Select to sygnał, żeby zacząć planować wygaszenie własnych, ręcznie budowanych selectów, choć lepiej poczekać na spójną implementację w innych silnikach, o czym sam zespół WebKit pisze wprost. Naprawa loadera modułów ES jest cichsza, ale prawdopodobnie ważniejsza w praktyce, bo usuwa klasę błędów, które zespoły dotąd maskowały specyficznymi dla Safari obejściami w kodzie produkcyjnym.

**Link:** [WebKit Features for Safari 27.0](https://webkit.org/blog/18325/webkit-features-for-safari-27-0/)

## Safari MCP server: agent, który sam sprawdza, jak działa strona w przeglądarce

**TLDR:** Safari 27 wprowadza własny serwer MCP, przez który agent kodujący może otworzyć prawdziwe okno Safari, przeczytać DOM, zrzuty ekranu, logi konsoli i żądania sieciowe, zamiast opierać się wyłącznie na opisach słownych od dewelopera.

**Summary:** Codzienny rytuał debugowania w przeglądarce wygląda zwykle tak samo: coś jest zepsute, otwierasz konsolę, przechodzisz do zakładki stylów, robisz zrzut ekranu, opisujesz problem agentowi i czekasz na poprawkę, a jeśli nie zadziała, powtarzasz cały cykl od nowa. Safari MCP server ma skrócić tę pętlę, dając agentowi bezpośredni dostęp do tego, co faktycznie dzieje się w przeglądarce, zamiast zmuszać dewelopera do tłumaczenia tego na słowa.

Serwer udostępnia zestaw narzędzi do nawigacji po zakładkach, wykonywania JavaScriptu na stronie, odczytu żądań sieciowych ze szczegółami nagłówków i czasów, robienia zrzutów ekranu, ustawiania rozmiaru viewportu czy emulowania typu mediów. Dzięki temu agent może samodzielnie porównać wygląd strony między przeglądarkami, sprawdzić dostępność (brakujące etykiety, złe atrybuty ARIA, słaby kontrast) albo zmierzyć czas ładowania i renderowania bez dodatkowych wskazówek od człowieka.

Konfiguracja sprowadza się do włączenia zdalnej automatyzacji w ustawieniach deweloperskich Safari i dodania jednej komendy do konfiguracji swojego agenta (Claude Code, Codex albo dowolnego klienta MCP). Autorzy podkreślają, że serwer działa wyłącznie lokalnie, nie wykonuje żadnych własnych połączeń sieciowych i nie ma dostępu do danych osobistych w Safari, takich jak autouzupełnianie czy historia przeglądania spoza bieżącej sesji.

**Key takeaways:**
- Agent łączy się z faktycznym oknem Safari i widzi DOM, sieć, konsolę i zrzuty ekranu zamiast polegać na opisach dewelopera.
- Zestaw narzędzi obejmuje m.in. evaluate_javascript, list_network_requests, screenshot oraz page_interactions do sekwencji kliknięć i wpisywania tekstu.
- Konfiguracja to jedna komenda w mcp.json lub jedna linia dla Claude Code i Codexa, po włączeniu zdalnej automatyzacji w Safari.
- Dane przechwycone przez serwer trafiają bezpośrednio do używanego agenta, nie do Apple, a sam serwer nie łączy się z siecią.

**Why do I care:** To konkretny krok w stronę agentów, które faktycznie widzą to, co widzi użytkownik, a nie tylko to, co deweloper zdążył opisać w promptcie. Warto go wypróbować w codziennym debugowaniu. Jednocześnie dawanie agentowi kontroli nad przeglądarką w środowisku współdzielonym albo na maszynie CI to inna kategoria ryzyka niż lokalna praca na własnym laptopie, a artykuł w ogóle tego wątku nie porusza.

**Link:** [Introducing the Safari MCP server for web developers](https://webkit.org/blog/18136/introducing-the-safari-mcp-server-for-web-developers/)

## Kotwiczenie przewijania: dlaczego strona przestaje "skakać" sama z siebie

**TLDR:** Scroll anchoring to mechanizm, który koryguje pozycję przewijania, gdy zawartość powyżej widocznego obszaru się zmienia, dzięki czemu użytkownik nie traci miejsca, w którym czytał, kiedy nad nim doładuje się obrazek czy reklama.

**Summary:** Mechanizm działa domyślnie i włączony jest przez właściwość overflow-anchor, ustawioną fabrycznie na auto. Przeglądarka wybiera węzeł "kotwicę" blisko widocznego obszaru i pilnuje, żeby jego pozycja względem viewportu się nie zmieniła, nawet jeśli oznacza to, że użytkownik technicznie przesunął się dalej w dokumencie. W praktyce oznacza to koniec sytuacji, w której czytasz artykuł, a nagle strona podskakuje, bo załadował się komentarz albo baner powyżej.

Jeśli coś nie działa zgodnie z oczekiwaniami, dokumentacja MDN pokazuje, jak to zdiagnozować we Firefoksie: flaga layout.css.scroll-anchoring.enabled pozwala wyłączyć mechanizm na próbę, a layout.css.scroll-anchoring.highlight podświetla fioletowym nakładem, który węzeł przeglądarka aktualnie traktuje jako kotwicę. Do wyłączania na stałe służy właściwość overflow-anchor: none, którą można ustawić globalnie na elemencie body albo lokalnie na kontenerze konkretnej sekcji.

Kotwiczenie ma też swoje wyzwalacze wyłączające: zmiany top/left/right/bottom, marginesów, wymiarów czy transformacji na kotwicy lub jej przodku same w sobie wystarczą, żeby przeglądarka uznała, że nie da się bezpiecznie utrzymać pozycji.

**Key takeaways:**
- Mechanizm jest włączony domyślnie i w większości przypadków nie wymaga żadnej dodatkowej pracy po stronie dewelopera.
- overflow-anchor: none pozwala świadomie wyłączyć kotwiczenie na całym dokumencie albo tylko w wybranej sekcji.
- Zmiany pozycji, marginesów, wymiarów albo transformacji na kotwicy same wyłączają mechanizm dla tego węzła.
- Flagi Firefoksa layout.css.scroll-anchoring.enabled i .highlight ułatwiają debugowanie problemów z przewijaniem.

**Why do I care:** Ten mechanizm rozwiązuje problem, który architekci frontendu znają z list produktowych, kanałów komentarzy czy dowolnego UI z leniwym doładowywaniem treści powyżej bieżącego widoku, więc jego szersze wsparcie oznacza mniej ręcznie pisanego kodu do zapamiętywania i przywracania pozycji scrolla. Warto tylko pamiętać, że własne rozwiązania tego problemu wdrożone wcześniej mogą teraz wchodzić w konflikt z natywnym mechanizmem, więc lepiej je zrewidować, zamiast zakładać, że współistnieją bezproblemowo.

**Link:** [Overview of scroll anchoring - CSS | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll_anchoring/Overview)

## Rozmyte podglądy obrazów jako natywna funkcja przeglądarki

**TLDR:** Patrick Brosset proponuje nowy atrybut previewsrc dla elementu img, który pozwoliłby przeglądarce samodzielnie obsłużyć znany wzorzec "najpierw rozmyty podgląd, potem ostry obraz", bez pisania własnego kodu do tego celu.

**Summary:** Wzorzec rozmytego podglądu jest dziś tak popularny, że wspierają go już frameworki i CDN-y obrazów, ale każda implementacja i tak musi ręcznie pobrać dwa obrazy, pokazać podgląd, podmienić go na finalną wersję i posprzątać po całej operacji. Next.js robi to przez właściwość placeholder="blur" przy imporcie obrazu, biblioteki w rodzaju blurhash kodują miniaturowy podgląd jako krótki string do zdekodowania w czasie działania aplikacji, a część zespołów po prostu ręcznie generuje podglądy w czasie builda i wrzuca je jako data URL w tło CSS.

Propozycja previewsrc miałaby zdjąć tę odpowiedzialność z kodu aplikacji: przeglądarka ładowałaby jednocześnie obraz podglądowy i docelowy, zawsze dając priorytet temu drugiemu, pokazywałaby podgląd, a po gotowości pełnego obrazu podmieniałaby go automatycznie. Autor zaznacza od razu, że to nie jest funkcja wydajnościowa ani zamiennik prawdziwej optymalizacji obrazów, tylko standaryzacja istniejącego wzorca UX.

W obecnym kształcie propozycja nie obejmuje customowego przejścia między podglądem a finałem ani natywnego wsparcia dla skompresowanych formatów w rodzaju blurhash, choć autor zbiera opinie właśnie o to, czy te dwie rzeczy są konieczne, żeby ktoś w ogóle zaczął używać previewsrc. Odpowiada też na pytania o nadużycia (nie ma twardego mechanizmu wymuszającego odpowiedzialne użycie) i o alternatywę w postaci progresywnego JPEG-a, którą uznaje za rozwiązanie do innego przypadku użycia, bliższego stopniowej poprawie jakości niż efektowi rozmycia.

**Key takeaways:**
- previewsrc pozwoliłby ustawić na img zarówno obraz podglądowy, jak i docelowy, z automatyczną podmianą przez przeglądarkę.
- Przeglądarka zawsze priorytetyzuje ładowanie obrazu docelowego, a podgląd traktuje jako "best effort" i może go całkiem pominąć przy ograniczonych zasobach.
- Propozycja świadomie nie obejmuje customowych przejść ani natywnej obsługi formatów typu blurhash na razie.
- Rozwiązanie działa też wewnątrz elementu picture, bez zmiany istniejących algorytmów srcset i sizes.

**Why do I care:** Jeśli ta propozycja wejdzie do standardu, część zespołów będzie mogła wyrzucić własny kod do obsługi podglądów obrazów razem z całą logiką stanu ładowania i czyszczenia, co zmniejsza liczbę komponentów obrazowych do utrzymania w design systemie. To wciąż wczesny etap zbierania opinii, więc lepiej zgłosić własny przypadek użycia teraz, zanim kształt API zostanie zamrożony w wersji, która nie pasuje do potrzeb własnego produktu.

**Link:** [Blurry before beautiful: image previews for the web](https://patrickbrosset.com/articles/2026-09-22-blurry-before-beautiful-image-previews-for-the-web/)

## Nowości w DevTools: kontrola nad agentami i pełne wsparcie soft nawigacji

**TLDR:** Aktualizacja DevTools z Chrome 153 i 154 rozszerza możliwości agentów kodujących w panelu MCP, dodaje osobną zakładkę do śledzenia kosztu reklam w panelu Application oraz kończy wdrażanie pomiaru soft nawigacji w panelu Performance.

**Summary:** Największa zmiana dotyczy serwera Chrome DevTools MCP, czyli warstwy, przez którą agenty kodujące sterują przeglądarką. Nowe wersje dodają pakiet Agent Plugins 1.0, opcję wyłączenia wykonywania JavaScriptu podczas inspekcji strony, leniwe ładowanie map źródłowych, konfigurowalne ścieżki systemu plików oraz narzędzie do odpytywania zrzutów sterty po rozmiarze retencji albo nazwie właściwości, co ułatwia namierzanie wycieków pamięci bezpośrednio przez agenta.

Panel Application zyskał osobną sekcję Ads, zbierającą w jednym miejscu metryki gęstości reklam w widocznym obszarze, zużycia CPU i sieci generowanego przez skrypty reklamowe oraz tabelę wszystkich skryptów reklamowych na stronie głównej ramki, razem z przełącznikiem podświetlającym reklamy bezpośrednio na stronie. Panel Performance kończy natomiast pełne wsparcie dla soft nawigacji, tym razem także w zakładce Insights, a do tego dochodzi możliwość nadpisania poziomu wydajności CPU przez Chrome DevTools Protocol, co pozwala odtwarzać wyniki testów na różnych klasach sprzętu w sposób powtarzalny.

Panel Elements dostał wsparcie dla "nieaktywnych" reguł stylów, czyli takich, które kiedyś pasowały do elementu, ale już nie pasują, wciąż widocznych, ale wyraźnie oznaczonych, a interaktywne adornery w drzewie DOM (View Source, Starting Style, Scroll Snap, Reveal) są teraz w pełni obsługiwane z klawiatury. Tryb urządzenia porządkuje z kolei listę emulowanych telefonów, tabletów i składanych ekranów w czytelne grupy według typu formatu, dorzucając nowsze modele w miejsce przestarzałych.

**Key takeaways:**
- Chrome DevTools MCP dostaje kontrolę nad wykonywaniem JavaScriptu, mapami źródłowymi i zapytania po zrzutach sterty do analizy pamięci.
- Nowa zakładka Ads w panelu Application pokazuje konkretny koszt CPU i sieci generowany przez skrypty reklamowe na stronie.
- Panel Performance ma teraz pełne wsparcie soft nawigacji w Insights oraz nadpisywanie poziomu wydajności CPU przez CDP.
- Panel Elements pokazuje nieaktywne reguły stylów i udostępnia w pełni klawiaturowe adornery w drzewie DOM.

**Why do I care:** Zakładka Ads w panelu Application to konkretny sygnał, że koszt reklam w witrynie przestaje być czarną skrzynką, więc zespoły monetyzujące ruch reklamami powinny zacząć traktować ten koszt jako część budżetu wydajnościowego, a nie osobny temat "działu reklamowego". Rozwój narzędzi MCP dla agentów pokazuje z kolei, że debugowanie wspomagane agentem przestaje być ciekawostką i zaczyna wymagać takiej samej dyscypliny konfiguracyjnej jak każde inne narzędzie deweloperskie w zespole.

**Link:** [New in DevTools - October 2026](https://developer.chrome.com/blog/new-in-devtools-october-2026)

## Nowości w Edge: dostępne komponenty i strony gotowe na agentów

**TLDR:** Zespół Edge podsumowuje ostatnie dodatki do platformy webowej: OpaqueRange do pracy z zakresami tekstu w polach formularzy, referenceTarget rozwiązujący problem dostępności komponentów z Shadow DOM oraz wczesne wsparcie dla WebMCP, czyli API mającego przygotować strony na obsługę przez agentów przeglądających.

**Summary:** OpaqueRange rozwiązuje konkretny, dobrze znany problem: do tej pory, żeby pozycjonować podpowiedź autouzupełniania albo podświetlić fragment tekstu w textarea czy input, trzeba było klonować kontrolkę do ukrytego diva, kopiować jej style i liczyć współrzędne ręcznie, co zawodziło przy przewijaniu albo zmianach layoutu. OpaqueRange daje bezpośredni dostęp do zakresu wartości pola przez metodę createValueRange(), bez ujawniania wewnętrznej struktury DOM kontrolki, i pozostaje "żywy", czyli automatycznie aktualizuje swoje przesunięcia w miarę edycji tekstu, więc podświetlenie przypięte do konkretnego słowa podąża za nim nawet po wpisaniu tekstu przed nim.

Drugi problem, cross-root ARIA, dotyczy komponentów budowanych z Shadow DOM, gdzie atrybuty w rodzaju aria-labelledby albo zwykły label for nie mogły dotąd wskazywać na element ukryty wewnątrz cienia komponentu. Właściwość referenceTarget na ShadowRoot, ustawiana też deklaratywnie przez atrybut shadowrootreferencetarget, pozwala przekazać takie odwołanie do właściwego elementu wewnątrz. Do tego dochodzi nowy atrybut aria-actions, który pozwala ujawnić czytnikom ekranu dodatkowe, drugorzędne akcje złożonych widżetów, na przykład przycisk zamykania zakładki wewnątrz samej zakładki.

Reszta zestawienia to zbiór mniejszych, ale praktycznych dodatków: pseudoklasy stanu odtwarzania mediów (:playing, :paused, :buffering, :muted, :stalled), nowe metody iteratorów Iterator.join(), Iterator.zip() i Iterator.zipKeyed(), funkcja koloru alpha() oraz textStream() ułatwiający strumieniowe przetwarzanie tekstu bez ręcznego dekodowania fragmentów bajtów. W sekcji funkcji gotowych do testów zespół Edge opisuje też WebMCP, czyli sposób na wystawienie istniejącego frontendu jako zestawu ustrukturyzowanych narzędzi, z których może skorzystać agent przeglądający w imieniu użytkownika.

**Key takeaways:**
- OpaqueRange daje żywy dostęp do zakresów tekstu w textarea i input bez klonowania kontrolek do ukrytych divów.
- referenceTarget na ShadowRoot rozwiązuje długoletni problem cross-root ARIA w komponentach z Shadow DOM.
- aria-actions ujawnia czytnikom ekranu drugorzędne akcje złożonych widżetów, jak przycisk zamykania zakładki.
- WebMCP jest jeszcze na wczesnym etapie testów, ale celuje wprost w scenariusze, w których agent działa na stronie zamiast użytkownika.

**Why do I care:** referenceTarget to jedna z tych zmian, które warto od razu sprawdzić w istniejącym systemie komponentów, bo cross-root ARIA jest jednym z najczęstszych powodów, dla których zespoły w ogóle rezygnują z użycia Shadow DOM w komponentach formularzy. WebMCP wygląda na coś, co za rok albo dwa stanie się osobnym punktem w checklistach architektonicznych, obok dostępności i SEO, a to dobry moment, żeby zacząć ten temat obserwować, zanim stanie się pilny.

**Link:** [New in Edge for developers – Create better components and make your site agent-ready](https://blogs.windows.com/msedgedev/2026/09/21/new-in-edge-for-developers-create-better-components-and-make-your-site-agent-ready/)

## Chrome 155 Beta: symbols(), post-kwantowa kryptografia i JPEG XL

**TLDR:** Chrome 155 w wersji beta dorzuca funkcję CSS symbols() do definiowania styli liczników bez osobnej reguły @counter-style, skróty narożników łączące border-radius z corner-shape, a poza CSS-em post-kwantowe algorytmy w Web Cryptography API oraz dekodowanie obrazów JPEG XL w Blinku.

**Summary:** W warstwie CSS symbols() pozwala zdefiniować styl licznika bezpośrednio w miejscu użycia, z listy symboli tekstowych i opcjonalnego systemu zliczania (cykliczny, numeryczny, alfabetyczny, symboliczny albo stały), zamiast deklarować osobną nazwaną regułę @counter-style. Skróty narożników wprowadzają jedną deklarację corner (oraz warianty dla pojedynczych rogów, fizycznych i logicznych krawędzi) do ustawienia jednocześnie border-radius i corner-shape, z corners zachowanym jako alias kompatybilności wstecznej. Do tego dochodzi text-decoration-skip-spaces, pozwalający pomijać spacje przy rysowaniu podkreśleń i przekreśleń, oraz margin-trim rozszerzony o obsługę zwykłych kontenerów blokowych i wielokolumnowych.

W JavaScripcie nieudane ładowanie modułu przestaje być zapisywane w cache jako trwały błąd, więc ponowne wywołanie import() może faktycznie spróbować jeszcze raz, co ma znaczenie przy niestabilnych sieciach. Osobna propozycja TC39 dodaje import ... with { type: "text" }, ładujący dane tekstowe jako zwykły string. W warstwie Web API najbardziej znacząca jest aktualizacja Web Cryptography API o algorytmy post-kwantowe standaryzowane przez NIST, w tym ML-KEM i ML-DSA w kilku wariantach, ChaCha20-Poly1305 oraz X-Wing, a także wczesne wsparcie dla wystawiania poświadczeń cyfrowych bezpośrednio do aplikacji portfela mobilnego przez Digital Credentials API.

Reszta zestawienia obejmuje dekodowanie obrazów JPEG XL przez bezpieczny pamięciowo dekoder w Ruście, nową politykę uprawnień pozwalającą wstrzymywać odtwarzanie mediów w niewidocznych ramkach iframe, dodatkowe przestrzenie kolorów dla Canvas oraz odświeżone metody wstawiania i strumieniowania HTML (streamAppendHTML() i pokrewne), które mają docelowo zastąpić insertAdjacentHTML().

**Key takeaways:**
- symbols() i skróty narożników (corner) zmniejszają ilość boilerplate'u potrzebnego dziś do prostych efektów stylistycznych.
- Nieudane ładowanie modułu ES można teraz ponowić zamiast trwale trafiać do cache błędów.
- Web Cryptography API zyskuje algorytmy post-kwantowe standaryzowane przez NIST, w tym ML-KEM i ML-DSA.
- JPEG XL doczekało się dekodowania w Blinku, ale wsparcie w innych silnikach wciąż jest nierówne.

**Why do I care:** To, że post-kwantowa kryptografia trafia do przeglądarkowego Web Crypto API, jest sygnałem wieloletniej zmiany, na którą zespoły odpowiedzialne za zgodność i bezpieczeństwo powinny zacząć się przygotowywać już teraz, zamiast czekać, aż stanie się wymogiem regulacyjnym z krótkim terminem wdrożenia. JPEG XL i tak zostanie na razie ciekawostką w praktyce, dopóki Safari i Firefox nie zrównają się z Chrome, więc traktowanie go jako format produkcyjny dziś byłoby przedwczesne.

**Link:** [Chrome 155 Beta](https://developer.chrome.com/blog/chrome-155-beta)

## Root scroller, czyli jak przypadkiem zepsuć przewijanie całej strony

**TLDR:** Root scroller to główny kontener przewijania strony, powiązany z funkcjami takimi jak przywracanie pozycji scrolla, chowanie paska adresu na telefonie czy pull-to-refresh, a popularne wzorce CSS potrafią go po cichu zastąpić zagnieżdżonym kontenerem, psując te funkcje bez żadnego błędu w konsoli.

**Summary:** Element staje się kontenerem przewijania, gdy ma overflow ustawione na auto, scroll albo hidden razem z ograniczoną wysokością lub szerokością. Kiedy cała treść dokumentu jest wyższa niż viewport, to sam viewport staje się takim kontenerem, nazywanym root scrollerem, a document.scrollingElement zawsze zwraca element, który go reprezentuje. Przeglądarka daje temu konkretnemu kontenerowi zestaw specjalnych zachowań: przywraca jego pozycję przewijania po powrocie z historii, obsługuje przewijanie klawiaturą bez konieczności najpierw kliknięcia w niego, raportuje pozycję przez window.scrollY i window.scrollTo(), a na urządzeniach mobilnych odpowiada za chowanie paska adresu, przewijanie do góry po dotknięciu paska statusu oraz gest pull-to-refresh.

Najczęstszy sposób na przypadkową utratę root scrollera to popularny wzorzec app shella: html i body dostają height: 100% razem z overflow: hidden, a osobny wrapper strony dostaje height: 100vh i overflow: auto, żeby zrobić sticky header i przewijaną kolumnę treści. Wygląda to tak samo wizualnie, ale to wrapper przewija stronę, nie viewport, więc telefon przestaje chować pasek adresu, a powrót z historii nie przywraca pozycji przewijania. Drugi, mniej oczywisty wariant to połączenie overflow-x: hidden na html i body z height: 100%, gdzie propagacja overflow z html na viewport w połączeniu z regułą "jedna oś hidden, druga automatycznie auto" cicho zamienia body w kontener przewijania.

Naprawa w większości przypadków nie wymaga rezygnacji z efektu wizualnego, tylko zamiany podejścia: min-height: 100svh zamiast sztywnej wysokości pozwala stronie rosnąć razem z treścią, position: sticky na nagłówku i sidebarze w layoucie grid daje efekt "przyklejonego" interfejsu bez zamykania przewijania w środkowej kolumnie, a przy problemie z poziomym paskiem przewijania lepiej użyć overflow-x: clip zamiast hidden, bo clip nie tworzy nowego kontenera przewijania. Do blokowania scrolla strony pod otwartym modalem wystarczy z kolei reguła CSS oparta na :has(dialog[open]), zamiast trzymania strony w osobnym, zawsze aktywnym kontenerze przewijania.

**Key takeaways:**
- Root scroller odpowiada za przywracanie pozycji przewijania, przewijanie klawiaturą, poprawny odczyt window.scrollY oraz zachowania specyficzne dla telefonów, jak chowanie paska adresu i pull-to-refresh.
- Kombinacja height: 100% i overflow: hidden na html/body razem z osobnym przewijanym wrapperem to najczęstszy sposób na przypadkową utratę root scrollera.
- document.addEventListener('scroll', callback, { capture: true }) w konsoli pokazuje, który element faktycznie przewija stronę.
- min-height zamiast height, position: sticky zamiast osobnego kontenera oraz overflow-x: clip zamiast hidden pozwalają zachować te same layouty bez tracenia root scrollera.

**Why do I care:** To dokładnie ten typ błędu, który przechodzi code review bez zająknięcia, bo wizualnie wszystko wygląda tak samo, a wykrywa się go dopiero na produkcji, kiedy ktoś zgłasza, że aplikacja "dziwnie się zachowuje" na telefonie. Dopisz do checklisty PR-ów dla dowolnego layoutu typu app shell prosty test: sprawdź w konsoli telefonu, czy scrollują document i window, a nie wewnętrzny div, zanim funkcja w ogóle trafi do produkcji.

**Link:** [The root scroller and how not to lose it](https://polypane.app/blog/the-root-scroller-and-how-not-to-lose-it/)

## "AI, spraw żeby strona była dobra": rzemiosło ważniejsze niż narzędzie

**TLDR:** Zach Leatherman kwestionuje założenie, że łatwiejsze tworzenie oprogramowania automatycznie przekłada się na lepsze doświadczenie użytkownika, wskazując na kategorię "AI" w rankingu Speedlify, gdzie prawie wszystkie strony oblewają testy Core Web Vitals i dostępności.

**Summary:** Autor zauważa, że branża frontendowa przechodziła już podobny cykl obietnic kilka razy, przez lata renderowania po stronie klienta i całą erę aplikacji jednostronicowych, za każdym razem sprzedawanych jako coś, co poprawi doświadczenie użytkownika przez poprawę doświadczenia dewelopera. Pytanie, które zadaje bez owijania w bawełnę, brzmi: czy te usprawnienia w praktyce kiedykolwiek przekładały się na lepsze strony dla ludzi, którzy z nich korzystają, czy tylko na więcej oprogramowania.

Obecny cykl z agentami piszącymi, przeglądającymi i orkiestrującymi inny kod ma według autora identyczną strukturę, tylko w dużo szybszym tempie, a dowody na to, że coś idzie nie tak, już się pojawiają, także w głośnych publicznych incydentach z niezawodnością oprogramowania. Konkretnym punktem odniesienia jest kategoria "AI" w Speedlify, prowadzonym przez autora rankingu wydajności stron, gdzie mediana wyników Core Web Vitals jest oblewająca, a 12 z 13 stron nie przechodzi testów wydajności Lighthouse ani kontroli dostępności Axe.

Wniosek autora nie jest odrzuceniem narzędzi jako takich, tylko przypomnieniem, że dbałość o jakość finalnego produktu jest niezależna od tego, jakim narzędziem ten produkt powstał, i że ta dbałość ma dziś większe znaczenie niż kiedykolwiek, właśnie dlatego, że łatwość tworzenia software'u przestała być czynnikiem ograniczającym.

**Key takeaways:**
- Historia frontendu zna już kilka cykli obietnic "łatwiejsze tworzenie oprogramowania równa się lepsze UX", które nie zawsze się sprawdzały.
- Kategoria "AI" w rankingu Speedlify pokazuje medianę oblewającą testy Core Web Vitals, z 12 z 13 stron nieprzechodzącymi Lighthouse i Axe.
- Autor nie neguje przydatności narzędzi AI, tylko oddziela jakość narzędzia od jakości tego, co ono faktycznie produkuje.

**Why do I care:** Ten tekst przyda się na spotkanie, na którym ktoś z zarządu proponuje mierzyć wydajność zespołu wyłącznie liczbą zmergowanych PR-ów wygenerowanych przez agenta, bo dane z Speedlify pokazują twardo, co się dzieje, kiedy tempo dostarczania rośnie bez odpowiadającej mu kontroli jakości. Dla architekta to argument za tym, żeby bramki jakości (performance budget, testy dostępności) traktować jako część procesu niezależną od tego, kto albo co pisze kod, a nie jako coś, co można poluzować, bo "agent i tak napisze to szybciej".

**Link:** ["AI, make the website good"—zachleat.com](https://www.zachleat.com/web/ai-websites/)
