---
title: "Customizable select, usermedia element i kolory których ekran ci nie pokaże — Frontend Focus #748"
excerpt: "Przegląd najciekawszych artykułów z Frontend Focus: od CSS dla customizable select przez nowy element HTML usermedia, po filozofię dostępności w erze AI i kolory niewidoczne na ekranie."
publishedAt: "2026-07-02"
slug: "frontend-focus-748-customizable-select-usermedia-kolory-ekranu"
hashtags: "#frontend #css #html #javascript #webplatform #accessibility #webgl #scrollanimations #darkmode #generated #pl #frontendfocus"
source_pattern: "Frontend Focus"
---

## The Goldilocks Customizable Select Height

**TLDR:** Jake Archibald dokładnie analizuje problem odpowiedniej wysokości dropdownu w nowym customizable select. Potrzeba trzech różnych wartości CSS i kilku fallbacków, żeby zachowanie było poprawne we wszystkich przeglądarkach.

**Summary:** Customizable select to jeden z tych tematów, który na pierwszy rzut oka wydaje się prosty, a okazuje się prawdziwą pułapką. Archibald zbudował demka do swojego wystąpienia i natknął się na problem, który wielu z nas pominie: jak ustawić wysokość dropdownu tak, żeby nie była ani za mała, ani za duża, ani nie uderzała w krawędź viewportu. Problemu nie rozwiązał sam, musiał poprosić o pomoc Ian Kilpatricka, który wskazał mu `calc-size()`.

Podstawowy problem jest następujący: picker ma domyślnie `max-block-size: stretch`, czyli zajmuje tyle miejsca ile ma do dyspozycji między elementem select a krawędzią viewportu. To sensowne, ale po pierwsze picker może być zbyt niski gdy jest blisko krawędzi, a po drugie zbyt wysoki gdy opcji jest mało. Żeby picker nie dotykał krawędzi viewportu, trzeba dodać margines. Tylko że `margin` przy percentowych wysokościach działa inaczej niż przy `stretch`, więc trzeba osobno obsłużyć Firefox (który nie obsługuje `stretch`) i Chrome z Safari.

Kwestia minimalnej wysokości to kolejny problem. Ustawienie `min-block-size: 12em` powoduje, że gdy opcji jest mało, picker wygląda dziwnie i jest za duży. Ideałem byłoby `min(fit-content, 12em)`, ale `min()` nie przyjmuje intrinsic sizes. Tu wchodzi `calc-size()` — funkcja, która pozwala używać intrinsic sizes w obliczeniach. Podobnie z maksymalną wysokością — trzeba użyć `calc-size(stretch, min(size, 30em))`, żeby ograniczyć rozmiar pickera nie tracąc przy tym mechanizmu unikania viewportu. Firefox i Safari (poza Technology Preview) jeszcze nie obsługują `calc-size()`, więc finalny kod ma dwa zestawy reguł: jeden nowoczesny, jeden hackowy.

Całość jest świadectwem tego, gdzie jesteśmy z customizable select. Przeglądarka robi dużo za nas, ale detale wymagają sporej pracy i wiedzy o mechanizmach position anchor, position-try-fallbacks i intrinsic sizing.

**Key takeaways:**
- `calc-size()` to kluczowa funkcja dla pracy z intrinsic sizes w obliczeniach CSS, wciąż niespójna między przeglądarkami
- Picker z customizable select używa CSS anchor positioning pod spodem, co daje dużą elastyczność ale też wymaga zrozumienia tego modelu
- `flip-block` w `position-try-fallbacks` automatycznie odwraca marginesy gdy picker "przeskakuje" nad element, co jest przydatną własnością
- Safari Technology Preview już wspiera `calc-size()`, więc wsparcie jest kwestią czasu

**Why do I care:** Mam wrażenie, że artykuł Archivalda dobrze ilustruje pułapkę, w którą można wpaść: myślisz, że nowe API przeglądarek rozwiązuje problem, a okazuje się, że masz nowy zestaw problemów i musisz utrzymywać coraz bardziej skomplikowane fallbacki. To nie jest krytyka — tak po prostu wygląda web platform w fazie transition. Jako architekci musimy świadomie decydować kiedy adopcja nowych rzeczy jest warta ceny złożoności, a kiedy lepiej poczekać na dojrzałość.

**Link:** [The Goldilocks customizable select height](https://jakearchibald.com/2026/goldilocks-select-height/)

---

## Introducing the `<usermedia>` HTML Element

**TLDR:** Chrome 151 wprowadza nowy element HTML `<usermedia>` do obsługi kamery i mikrofonu. Zamiast skryptowego `getUserMedia()`, użytkownik klika element kontrolowany przez przeglądarkę, co radykalnie poprawia wskaźniki zgód.

**Summary:** Kapability Elements to seria nowych elementów HTML, które zastępują imperatywne skryptowe API do dostępu do zasobów sprzętowych. Po `<geolocation>` (Chrome 144) przyszedł czas na `<usermedia>`. Idea jest prosta: zamiast JavaScript wywołującego `getUserMedia()` w odpowiedzi na kliknięcie przycisku, mamy dedykowany element HTML, którego kliknięcie daje przeglądarce pewny sygnał intencji użytkownika.

Dlaczego to ma znaczenie? Cisco zmierzyło, że użytkownicy, którzy wcześniej odmówili dostępu do kamery i mikrofonu, tylko w 10% przypadków pomyślnie przyznawali dostęp ponownie przez stary mechanizm. Z `<usermedia>` ten wskaźnik wzrósł do 65%. Zoom odnotował 47% mniej błędów przechwytywania. Google Meet miał 17% mniej zgłoszeń "mikrofon nie działa". To są liczby, które robi wrażenie.

Element działa jako mediator danych: użytkownik klika, przeglądarka pokazuje prompt, a po akceptacji `stream` property na elemencie zawiera gotowy `MediaStream`. Nie trzeba obsługiwać callbacków ani stanów błędu przez rozbudowane bloki catch. Element eksposes eventy `stream`, `error` i `cancel`. Ograniczenia sprzętowe ustawia się przez `setConstraints()`. Stylizacja jest mocno ograniczona przez przeglądarkę: kontrast tekstu musi być co najmniej 3:1, nie można ustawiać opacity, są limity na transformacje. To celowe, żeby zapobiec click-jacking i deceptywnym wzorcom.

Progressive enhancement jest wbudowany: przeglądarki które nie znają `<usermedia>` renderują children, co pozwala umieścić fallback button wewnątrz elementu. Detekcja przez `'HTMLUserMediaElement' in window`. Planowane są też osobne `<camera>` i `<microphone>` dla scenariuszy tylko z wideo lub tylko z audio.

**Key takeaways:**
- `<usermedia>` wychodzi w Chrome 151 i dramatycznie poprawia wskaźniki odzyskiwania dostępu po odmowie
- Element jest data mediatorem — dostarcza MediaStream bezpośrednio, eliminuje boilerplate
- Ograniczenia stylizacji są celowe i egzekwowane przez przeglądarkę — to funkcja bezpieczeństwa, nie bug
- Fallback pattern jest prosty: umieść klasyczny button wewnątrz elementu
- Następne w kolejce: `<camera>` i `<microphone>` dla bardziej granularnych przypadków

**Why do I care:** To poważna zmiana w modelu permissionów na webie. Dotychczas wszystko opierało się na JavaScript API i trust tego że deweloper wywoła je we właściwym kontekście. Teraz przeglądarka przejmuje kontrolę nad ścieżką udzielenia dostępu. Z jednej strony to właściwa decyzja — dane pokazują że wyniki są dużo lepsze. Z drugiej, tracisz kontrolę nad UX. Dla aplikacji jak Zoom czy Google Meet to kompromis wart rozważenia bardzo dokładnie.

**Link:** [Introducing the `<usermedia>` HTML element](https://developer.chrome.com/blog/usermedia-html-element)

---

## Lighting Up a Wall with CDN Traffic

**TLDR:** Eduardo Boucas z Netlify zbudował fizyczną mapę świata z adresowalnymi LEDami, na której widać w czasie rzeczywistym ruch z Netlify CDN. Post opisuje projekt od pierwszego pomysłu przez elektronikę, kalibrację po format danych.

**Summary:** To jeden z tych projektów, które ciężko się czyta bez uśmiechu. Eduardo postanowił zbudować dwumetrową drewnianą mapę świata z 247 adresowalnymi LEDami WS2811, kontrolowanymi przez Raspberry Pi, i podpiętą pod live dane CDN Netlify. Projekt łączy kartografię, elektronikę, 3D printing i trochę szaleństwa.

Mapa jest z lasercuttowanego drewna, kupionego z gotowego sklepu — co było mądrą decyzją zamiast budowania od zera. Rozmieszczenie LEDów wymagało kompromisów: małe wyspy są za małe żeby je reprezentować, duże kraje jak USA czy Rosja potrzebują kilku punktów. Montaż wymagał wiercenia, a Florida się urwała podczas wiercenia. Naprawa wymagała terraformowania nowego półwyspu z resztek sklejki.

Elektronika jest elegancka: pięć klastrów LEDów z niezależnym zasilaniem, level shifter dla sygnału danych, Raspberry Pi jako mózg. Całość jest zamontowana na drukowanych w 3D uchwytach, które trzymają mapę kilka centymetrów od ściany dla okablowania. Kalibracja była kluczowym krokiem: LED strip zna tylko numery od 0 do 246, nie ma pojęcia o geografii. Eduardo napisał tool kalibracyjny, który zapalał jeden LED na raz, a on wpisywał nazwę miasta. To dało mapowanie numer LED na lokalizację.

Format danych jest szczególnie przemyślany: każde źródło danych emituje prosty JSON z tytułem i listą punktów, każdy z kodem ISO kraju, kolorem, jasnością i współczynnikiem migotania. Warstwa pośrednia przekłada to na konkretne LEDy. Dzięki temu dodanie nowego źródła danych nie wymaga wiedzy o sprzęcie. Pierwsze źródło to globalna temperatura — kolory od niebieskiego (zimno) do czerwonego (gorąco). Drugie, i właściwy cel projektu: ruch CDN Netlify, gdzie intensywność migotania odpowiada natężeniu ruchu.

**Key takeaways:**
- Separacja warstwy danych od sprzętu to klasyczna dobra decyzja architektoniczna, tu zastosowana fizycznie
- Format wire z ISO kodami krajów pozwala na prostą integrację różnych źródeł danych
- Raspberry Pi + WS2811 to sprawdzony i relatywnie prosty stack dla projektów LED
- Florida jest fragile — wiercić ostrożnie

**Why do I care:** Poza oczywistą "fajnością" projektu, mnie interesuje tu decyzja o separacji źródeł danych od renderowania. Eduardo mógł zrobić monolityczny system, ale wybrał format pośredni. Ta decyzja pozwoli mu łatwo dodawać nowe źródła — trzęsienia ziemi, wyniki sportowe, cokołwiek. To jest właśnie ten instynkt architektoniczny który przenosi się z kodu na fizyczny hardware.

**Link:** [Lighting up a wall with CDN traffic](https://eduardoboucas.com/posts/2026-06-29-wall-map/)

---

## Pointer Events Level 3 jest teraz rekomendacją W3C

**TLDR:** Pointer Events Level 3 osiągnął status W3C Recommendation. Specyfikacja rozszerza Level 2 o nowe funkcje: altitudeAngle, azimuthAngle, zdarzenie pointerrawupdate oraz coalesced i predicted events.

**Summary:** Pointer Events to specyfikacja opisująca zunifikowane API obsługi wskaźników — myszy, rysikiem, dotykiem — w sposób agnostyczny wobec konkretnego urządzenia. Level 3 to kolejna ewolucja, która dodaje nowe właściwości i zdarzenia szczególnie przydatne dla aplikacji rysowania i manipulacji precyzyjnej.

Nowe właściwości `altitudeAngle` i `azimuthAngle` są szczególnie ciekawe dla aplikacji z obsługą rysika: altitude to kąt między rysikiem a powierzchnią (0 = poziomo, pi/2 = prostopadle), azimuth to kąt obrotu rysika wokół osi pionowej. Aplikacje do rysowania mogą dzięki temu precyzyjnie reagować na przechylenie i obrót rysika, symulując efekty różnych rodzajów pędzli.

`pointerrawupdate` to nowe zdarzenie które odpala się szybciej niż `pointermove`, bez throttlingu. Dla aplikacji wymagających maksymalnej precyzji śledzenia (na przykład rysowanie) to ważna opcja — normalny `pointermove` jest throttlowany do częstotliwości animacji, co może powodować stratę punktów przy szybkim ruchu. Coalesced events pozwalają z kolei odzyskać "utracone" pośrednie pozycje które zostały zcoalesced w jedno zdarzenie `pointermove`. Predicted events idą o krok dalej: przeglądarka prognozuje przyszłe pozycje wskaźnika na podstawie aktualnej trajektorii, co pozwala renderować z wyprzedzeniem i zmniejszać widoczne opóźnienie.

Status Recommendation oznacza stabilizację specyfikacji — implementatorzy mogą polegać na tej wersji bez obawy o dalsze breaking changes.

**Key takeaways:**
- `altitudeAngle` i `azimuthAngle` to nowe właściwości dla precyzyjnej obsługi rysika
- `pointerrawupdate` zapewnia zdarzenia bez throttlingu dla aplikacji wymagających maksymalnej precyzji
- Coalesced i predicted events pomagają w zaawansowanych scenariuszach rysowania i przewidywania ruchu
- Pointer Events Level 2 jest teraz oznaczony jako W3C Superseded Recommendation

**Why do I care:** Jeśli budujesz coś z obsługą rysika lub zaawansowanymi gestami, Level 3 daje ci narzędzia które dotychczas wymagały hacków lub bibliotek. `pointerrawupdate` i predicted events to szczególnie interesujące rzeczy dla aplikacji canvas. Warto przejrzeć czy twój obecny kod obsługi wskaźników nie traci precyzji przez nieświadomy throttling.

**Link:** [Pointer Events Level 3 is now a W3C Recommendation](https://www.w3.org/news/2026/pointer-events-level-3-is-now-a-w3c-recommendation/)

---

## Animowany radial gradient mask nad tekstem w CSS

**TLDR:** Cassidy Williams replikuje efekt koncentrycznych pierścieni maskujących tekst używając CSS mask z repeating-radial-gradient i @property do animacji.

**Summary:** Post zaczyna się od repliki efektu z bloga Nikhila: nagłówek maskowany koncentrycznymi pierścieniami, przez które tekst jest widoczny tylko gdzie prześwituje między paskami. Efekt jest czysty i ciekawy, a opis procesu dochodzenia do niego jest uczciwy: Cassidy przyznaje że wybór fontu był niespodziewanie trudny, bo do efektu potrzebny jest font z idealnie okrągłą literą "o". Wybrała Fredoka.

Mechanizm to CSS mask z `repeating-radial-gradient`. Maska działa na zasadzie alpha masking: transparentne obszary ukrywają element, nieprzezroczyste pokazują. Gradient definiuje okrąg z centrum w konkretnych pikselach (ręcznie kalibrowanych) i naprzemiennymi paskami czarnymi i przezroczystymi. Szerokość pasków kontroluje zmienna `--stripes`. Zmiana jej wartości zmienia gęstość pierścieni.

Animacja to bardziej zaawansowana część. Normalnie nie można animować gradientów w CSS — przeglądarka traktuje gradient jako obraz, nie jako zestaw kolorów. Tu wchodzi `@property`: rejestrując `--stripes` jako animowalny typ, CSS Houdini pozwala przeglądarce interpolować wartości. Cassidy wprost przyznaje że Firefox i Safari sprawiały problemy — jednostki rem w gradiencie denerwowały Firefox, a animacja na Safari to był "actual miracle after messing with sizing and pixel pushing for far too long".

**Key takeaways:**
- `mask` z `repeating-radial-gradient` to skuteczny sposób na efekty "prześwitywania" dla tekstu
- `@property` (CSS Houdini) jest niezbędny do animowania custom properties używanych w gradientach
- Środek gradientu wymaga ręcznej kalibracji w pikselach — zmiana tekstu wymaga ponownego ustawienia
- Kompatybilność z Firefox i Safari wymaga cierpliwości i dostosowań

**Why do I care:** Ten post jest dobrym przypomnieniem że CSS efekty wizualne które wyglądają prosto w Chrome potrafią być frustrującymi do debugowania cross-browserowo. `@property` jest teraz szeroko dostępne (od 2024), ale szczegóły implementacji potrafią się różnić. Wartość tutaj to nie sam efekt, ale świadomość jak alpha masking i CSS Houdini ze sobą współpracują.

**Link:** [An animated radial gradient mask over text in CSS](https://cassidoo.co/post/radial-mask-text-css/)

---

## Dark Mode z Web Standards

**TLDR:** Ollie Williams dokładnie opisuje jak implementować dark mode używając meta tagu color-scheme i localStorage, bez klas na body. Wyjaśnia też ograniczenia tej metody i co prefers-color-scheme media query wie, a czego nie.

**Summary:** Artykuł zaczyna się od ważnego rozróżnienia: ustawienie color-scheme przez HTML meta tag lub CSS property wpływa na wygląd systemowych elementów (scrollbary, domyślne kolory przycisków, system colors jak Canvas i CanvasText), ale nie wpływa na wartość odczytywaną przez media query `prefers-color-scheme`. To jest fundamentalna nieciągłość którą wiele implementacji ignoruje.

Metoda: umieść `<meta name="color-scheme" content="light dark">` w head — to pozwala przeglądarce użyć ciemnego schematu zanim załaduje się CSS. Żeby obsłużyć toggle użytkownika, JavaScript zmienia atrybut `content` tego meta tagu i zapisuje wybór w localStorage. Trzy opcje: light, dark, light dark (powrót do ustawienia systemowego). Zaletą podejścia przez meta tag jest szybkość: działa zanim załaduje się stylesheet.

Co ważne, Williams opisuje też nowość w Chrome 150 i Firefox 150: funkcja `light-dark()` teraz działa nie tylko z kolorami, ale też z gradientami i obrazami. Możesz teraz pisać `background-image: light-dark(url(light.avif), url(dark.avif))` albo `light-dark(linear-gradient(...), linear-gradient(...))`. To eliminuje potrzebę duplikowania reguł dla różnych schematów kolorów.

Artykuł dotyka też tematu wykrywania aktualnego schematu kolorów w CSS, co jest osobnym problemem. Nie można zapytać "czy teraz jest dark mode" w CSS. Tricki z `@property` i `style queries` pozwalają to obejść, ale to hack. CSS Working Group planuje dodać obsługę przez `css if()` lub style queries, ale żadna przeglądarka tego jeszcze nie wdrożyła. Safari 27 ma kilka bugów związanych z iframes i SVG, które Williams dokumentuje.

**Key takeaways:**
- `prefers-color-scheme` media query odzwierciedla ustawienia OS, nie wartość `color-scheme` property — to fundamentalne ograniczenie
- Meta tag `color-scheme` jest szybszy niż CSS property, bo działa przed załadowaniem stylów
- `light-dark()` teraz obsługuje gradienty i obrazy (Chrome 150, Firefox 150, Safari TP)
- Nie można mieszać podejścia przez `data-mode` attribute z podejściem przez media query — trzeba wybrać jedno
- iframes i SVG to wyjątki gdzie `color-scheme` property wpływa na media query

**Why do I care:** Ten artykuł rozwiewa popularne błędne przekonanie że ustawienie `color-scheme: dark` sprawia że `prefers-color-scheme: dark` zwraca true. Nie sprawia. Ta nieciągłość jest źródłem wielu bugów w implementacjach dark mode z togglem. Jeśli twoja implementacja używa obu mechanizmów jednocześnie, masz pewnie subtelne problemy których nie zauważyłeś.

**Link:** [Dark mode with web standards](https://olliewilliams.xyz/blog/dark-mode/)

---

## WebGL bez GPU

**TLDR:** Microlink opisuje jak zoptymalizował renderowanie WebGL na serwerach bez GPU przez zmianę jednej flagi Chrome: ze SwiftShader na Mesa llvmpipe przez ANGLE, co dało 4-krotne przyśpieszenie z 24s do 6s.

**Summary:** Serwery screenshotujące strony to specyficzne środowisko: brak GPU, tanie commodity nodes, Linux. WebGL musi gdzieś się renderować, więc Chrome używa software renderera. Domyślnie jest nim SwiftShader, który jest konserwatywnym emulatorem działającym poprawnie wszędzie ale wolno. Alternatywą jest Mesa llvmpipe — OpenGL na CPU, ale z kluczowymi różnicami: JIT kompilacja shaderów do natywnego x86-64 przez LLVM, tiled multi-threaded rendering który realnie używa wszystkich rdzeni.

Zmiana jest jednolinijkowa: `--use-angle=gl` zamiast `--use-angle=swiftshader`. Efekt: 24 sekundy do 6 sekund na tym samym sprzęcie. Post zawiera szczegółowe przestrogi: flaga `--disable-gpu`, którą kopiuje się z każdego tutoriala o headless Chrome, cicho wymusza SwiftShader i niweluje całą optymalizację. `--in-process-gpu` zabija surface którego potrzebuje ANGLE.

Jest też catch: `--use-angle=gl` wymaga X display żeby zbindować GL surface. Na bezekranowych serwerach potrzebny jest Xvfb (virtual framebuffer). Bez niego WebGL "działa" — request zwraca 200, screenshot jest generowany, ale jest flat 2D fallback. Ten fallback jest niebezpieczny właśnie dlatego że jest cichy i wygląda jak sukces. Dlatego Microlink zbudował `browserless.report()` który pyta żywy kontekst GL o renderer, wymuszając asercję w CI że `gpu.type === 'software'` i `gpu.device === 'llvmpipe'`.

Mesa na Ubuntu jammy musiała być kompilowana ze źródeł bo systemowe pakiety są za stare. Multi-stage Dockerfile: kompilacja z LLVM (duże toolchain) i kopiowanie tylko artefaktów — 2.65GB zamiast 4.5GB.

**Key takeaways:**
- `--use-angle=gl` zamiast `--use-angle=swiftshader` to 4x szybszy WebGL bez GPU dzięki llvmpipe JIT i multi-threading
- `--disable-gpu` (kopiowane z tutoriali) cicho wymusza SwiftShader — unikaj tej flagi
- Xvfb (virtual display) jest wymagany — bez niego WebGL cicho degraduje do flat 2D
- CI powinno asertować na aktualnym rendererze przez introspection w przeglądarce, nie przez `dpkg`
- Pod obciążeniem realne przyśpieszenie to 2x, nie 4x — ale timeouty znikają

**Why do I care:** Ten post jest doskonałym przykładem "the diff is one line, proving it was right took weeks". Jako branża mamy tendencję do niedoceniania czasu spędzonego na benchmarkingu i weryfikacji. Microlink wyciągnął właściwe wnioski: deterministic benchmark w CI który asertuje na zachowaniu, nie na konfiguracji. Ten wzorzec jest przenośny na wiele innych scenariuszy headless automation.

**Link:** [WebGL without a GPU](https://microlink.io/blog/webgl-without-a-gpu)

---

## Persistent Tryby i Motywy — Budowanie Trwałego Togglea

**TLDR:** Stuart Robson opisuje trójwarstwowe podejście do persistent dark mode i theme togglea, rozdzielając tryb (light/dark) od motywu (kolor akcentu), z fokusem na progressive enhancement i brak flash przy ładowaniu.

**Summary:** Artykuł zaczyna od rozróżnienia które warto zapamiętać: tryb (light/dark) i motyw (kolor akcentu) to dwie różne rzeczy. Wiele implementacji miesza je w jednym atrybucie, co prowadzi do kombinatorycznej eksplozji klas. Separacja na `data-mode` i `data-theme` trzyma CSS czysty i logikę niezależną.

Implementacja jest trójwarstwowa i każda warstwa dodaje wartość samodzielnie. Warstwa pierwsza to HTML z `<input type="radio">` zamiast custom `<div>` elementów — natywna semantyka, nawigacja klawiaturą, mutual exclusivity za darmo. Warstwa druga to mały blokujący inline script w `<head>`, który czyta localStorage i ustawia atrybuty `data-mode` i `data-theme` na `<html>` przed pierwszym renderem. To eliminuje flash of wrong color. Warstwa trzecia to deferred JavaScript który wires up interaktywność.

Kluczowa obserwacja dotycząca "system" mode: nie zapisuj rozwiązanego stanu (light/dark), zapisuj intencję użytkownika ("system"). Jeśli zapiszesz dark gdy użytkownik wybrał "śledź system" a system był ciemny, to gdy użytkownik zmieni system na jasny — strona pozostanie ciemna wbrew jego intencji. Listener na `darkQuery.addEventListener('change')` re-aplikuje mode ale tylko gdy zapisana intencja to "system".

Ironia końcówki artykułu: autor ostatecznie usunął ten feature z własnej strony. Kod powstawał od 2022, a do launchu strony minęły lata. Nie miał dowodów że ktokolwiek tego używał. Lekcja: "just because you can persist preferences doesn't mean you should." Prostota respektowania tylko systemowego prefers-color-scheme może być lepszym kompromisem niż złożony system persist.

**Key takeaways:**
- Oddziel `data-mode` od `data-theme` — to dwie niezależne osie preferencji
- Blokujący inline script w head to jedyny sposób na uniknięcie flash bez server-side rendering
- Zapisuj intencję ("system"), nie wynik ("dark") — to pozwala reagować na zmiany systemu
- `localStorage` rzuca wyjątki w private mode — always wrap w try/catch
- Nie mieszaj `data-mode` CSS selectors z `prefers-color-scheme` media query — wybierz jedno podejście

**Why do I care:** Ten artykuł to rzadkość: szczera analiza kiedy feature nie był wart zachowania. Wiele z nas buduje rzeczy z inercji lub bo "tak się robi". Robson przyznaje że usunął elegancki, działający kod bo nie miał danych że kogoś interesuje. To jest właściwe myślenie product-aware development, nie tylko tech craftsmanship.

**Link:** [Modes and Themes That Stick - Building a Persistent Toggle Solution](https://www.alwaystwisted.com/articles/modes-and-themes-that-stick-building-a-persistent-toggle-solution)

---

## Streaming HTML

**TLDR:** Ollie Williams opisuje nowe API do streamowania HTML bezpośrednio do DOM, aktualnie dostępne w Chrome Canary. Obejmuje metody streamHTML, streamAppendHTML i pozostałe, plus deklaratywne częściowe aktualizacje z template elementami.

**Summary:** Przez lata jedynym sposobem na dynamiczne wstawianie HTML było `innerHTML` i jego warianty — niebezpieczne, bez sanityzacji, bez streamowania. Trwa teraz systematyczne zastępowanie tych mechanizmów nowymi API. Post Williamsa opisuje dwie powiązane funkcje które trafiły do Chrome Canary.

Pierwsza to `textStream()` na response objektach fetch. Zamiast `response.text()` które zwraca cały tekst na raz, lub `response.body` które jest streamem bajtów wymagającym ręcznego dekodowania, `textStream()` zwraca stream stringów UTF-8. Skraca standardowy pattern pipowania przez `TextDecoderStream` do jednej linii.

Druga to metody do streamowania HTML do DOM: `streamHTML`, `streamReplaceWithHTML`, `streamAppendHTML`, `streamPrependHTML`, `streamBeforeHTML`, `streamAfterHTML`. Każda ma wersję safe (z sanityzacją) i unsafe. To systematyczne uzupełnienie API DOM o brakujące streaming warianty. Tabela w artykule pokazuje jak nowe metody odpowiadają starym: `setHTMLUnsafe` to `innerHTML`, `replaceWithHTMLUnsafe` to `outerHTML`, `appendHTMLUnsafe` to `insertAdjacentHTML('beforeend')`.

Szczególnie interesujące jest declarative partial updates: mechanizm gdzie `<template for="name">` elementy streamowane do body trafiają automatycznie na miejsce `<?marker name="name">` processing instructions w dokumencie. To pozwala na server-driven partial page updates bez single-page app logiki po stronie klienta. Na razie tylko Chrome Canary, więc nie do produkcji, ale kierunek jest interesujący.

**Key takeaways:**
- `response.textStream()` zastępuje ręczne pipowanie przez `TextDecoderStream`
- Nowe DOM streaming metody: `streamHTML`, `streamAppendHTML` i 4 inne, każda w wersji safe i unsafe
- Unsafe metody obsługują declarative shadow DOM i opcję `runScripts`, czego stare metody nie mają
- Declarative partial updates z `<template for>` i `<?marker>` to potencjalnie game-changer dla SSR
- Na razie tylko Chrome Canary — nie production-ready

**Why do I care:** Mnie szczególnie interesuje declarative partial updates jako alternatywa dla client-side routing i hydration. Jeśli serwer może strumieniować HTML bezpośrednio na odpowiednie miejsca w dokumencie, to znaczna część złożoności frameworków SPA staje pod znakiem zapytania. Nie oczekuję rewolucji szybko, ale to jest interesujący kierunek dla web platform który warto śledzić.

**Link:** [Streaming HTML](https://olliewilliams.xyz/blog/streaming-html/)

---

## Scroll-Driven Animations dla Przeciwnych Kierunków Przewijania

**TLDR:** Artykuł na CSS-Tricks pokazuje jak zbudować efekt kolumn przesuwających się w przeciwnych kierunkach podczas scrollowania, korzystając wyłącznie z CSS scroll-driven animations i view() timeline.

**Summary:** Efekt jest prosty w opisie, nieoczywisty w implementacji: trzy kolumny kart, dwie skrajne przesuwają się w górę podczas scrollowania, środkowa w dół. Rezultat jest wizualnie atrakcyjny i teraz, w 2026, można go osiągnąć bez linii JavaScript.

Kluczem jest `animation-timeline: view()` na kolumnach. W odróżnieniu od `scroll()` które bazuje na pozycji scrollowania kontenera, `view()` śledzi postęp elementu przez scrollport. `animation-range: entry 0% cover 100%` definiuje że animacja startuje gdy element wchodzi do viewportu i kończy gdy jest nim pokryty. `animation-timing-function: linear` usuwa easing.

Trzy osobne `@keyframes` definiują ruch: dwie kolumny przesuwają się z dołu do góry, środkowa odwrotnie, trzecia z lekkim offsetem dla efektu staggerowania. `translateY` używa zmiennej `--opposing-mask` jako jednostki dla zachowania proporcji.

Efekt znikania przy krawędziach kontenera jest osiągnięty bez opacity — zamiast tego pseudo-elementy `:before` i `:after` mają gradienty od koloru tła do transparent, nakładając się na scrollujące kolumny. Karty "znikają" wchodząc pod gradient, co wygląda naturalnie. Reduced motion jest obsłużony przez `@media (prefers-reduced-motion: reduce)` które wyłącza animacje i pseudo-elementy. Firefox jeszcze nie wspierał scroll-driven animations w momencie pisania, więc `@supports (animation-timeline: view())` jest rekomendowanym wrappingiem.

**Key takeaways:**
- `view()` w `animation-timeline` śledzi postęp elementu przez scrollport, nie pozycję scrolla kontenera
- `animation-range: entry 0% cover 100%` to pełny zakres od wejścia do przykrycia elementu
- Efekt "fade" na krawędziach przez gradient na pseudo-elementach zamiast opacity — prostsze i wydajniejsze
- Trzy osobne `@keyframes` dla różnych kierunków ruchu dają elastyczność
- Zawsze obsłuż `prefers-reduced-motion` przy scroll-driven animations

**Why do I care:** Scroll-driven animations to jeden z tych features który drastycznie redukuje ilość JavaScript potrzebnego do efektów scroll-based. To co wcześniej wymagało IntersectionObserver, requestAnimationFrame i ręcznych obliczeń można teraz zdefiniować deklaratywnie w CSS. Wsparcie w Firefox to last remaining blocker dla szerszej adopcji, ale warto już teraz zainwestować w zrozumienie tych mechanizmów.

**Link:** [Using Scroll-Driven Animations for Opposing Scroll Directions](https://css-tricks.com/scroll-driven-animations-opposing-scroll-directions/)

---

## Sieć jest Udostępniana dla AI, Nie dla Ludzi

**TLDR:** Artykuł w Tech Policy Press analizuje rosnący trend "machine-readable web" i stawia pytanie: dlaczego deweloperzy chętnie robią dostępność dla AI, gdy przez dekady ignorowali dostępność dla niepełnosprawnych użytkowników?

**Summary:** Svelte dodało do swojej dokumentacji sekcję adresowaną do sztucznych inteligencji z zaproszeniem do pobrania docs w plaintext. To nie jest odosobniony przypadek — MCP servers, llms.txt, Vercel's LLM instructions w HTML — web jest przeprojektowywany dla nowego rodzaju użytkownika. Autorka artykułu, Kate Bredbenner, zadaje proste i trudne pytanie: to jest dokładnie to o co osoby niewidome prosiły przez dekady, dlaczego teraz jest to robione z uśmiechem dla AI?

Overlap między tym czego potrzebuje AI a czego potrzebuje użytkownik screen readera jest mniejszy niż wygląda. Screen reader user potrzebuje struktury: hierarchii nagłówków, landmark regions, opisowych linków, alt textów. Format llms.txt spłaszcza dokumentację do niezdyferencjowanego plaintext który LLM może przetrawić w całości, ale użytkownikowi screen readera nie daje nic do nawigowania. Gdy LLMs zyskują zdolność natywnego przetwarzania obrazów, strony optymalizowane dla AI mają coraz mniejszą motywację do dodawania alt textów.

Autorka odwołuje się do koncepcji "curb cut effect" — idei że ułatwienia dla niepełnosprawnych pomagają wszystkim. Ale tutaj jest odwrotnie: nie dostępność projektowana z myślą o niepełnosprawnych przypadkowo pomaga innym, ale dostępność projektowana dla AI kapitalistycznej firmy z boku adresuje potrzeby które niepełnosprawne osoby zgłaszały bezskutecznie latami. Autorka nazywa to "ramping automation effect": rampy walczone przez aktywistów w Berkeley w latach 70. są teraz zajmowane przez dostawcze roboty.

Nie ma tu złudzeń że alignment interesów AI i dostępności jest automatyczny — wymaga intencjonalnego projektowania i udziału ekspertów dostępności w decyzjach o machine-readability.

**Key takeaways:**
- "Machine-readable" to nie to samo co "accessible" — mylenie tych pojęć to accessibility washing
- llms.txt i podobne formaty nie pomagają użytkownikom screen readerów
- Polityczna wola do działania pojawiła się gdy tech industry potrzebuje tego samego, co osoby z niepełnosprawnościami prosiły od dekad — to nie jest dobra historia
- Eksperci dostępności powinni być aktywnie włączeni w decyzje o redesignie webu pod AI

**Why do I care:** To ważny artykuł poza bańką techniczną. Jako deweloperzy budujemy narzędzia które wpływają na dostępność dla realnych ludzi. Trend "rób dla AI bo venture capital potrzebuje" bez intencjonalnego uwzględnienia dostępności to droga do pogłębienia wykluczenia pod płaszczykiem inkluzywności. Warto sprawdzić czy w twoich projektach "machine-readable" jest robione z myślą o dostępności czy tylko o crawlerach.

**Link:** [The Web Is Being Made Accessible for AI, Not People](https://www.techpolicy.press/the-web-is-being-made-accessible-for-ai-not-people/)

---

## Niekompletna Lista Błędów w Projekcie CSS

**TLDR:** CSS Working Group Wiki prowadzi publiczną listę rzeczy w CSS które zostały zaprojektowane źle i gdyby można było cofnąć czas, byłyby inne. To fascynująca lektura o ewolucji standardów przez kompromisy i historyczne decyzje.

**Summary:** Ta lista istnieje od lat i jest regularnie rozszerzana. To rzadki przykład standardowego ciała które publicznie przyznaje do błędów zamiast bronić każdej decyzji. Kilka wpisów zasługuje na komentarz.

`box-sizing` domyślnie `content-box` zamiast `border-box` to klasyczny przykład. Praktycznie każdy projekt zaczyna od global `*, *::before, *::after { box-sizing: border-box }`. To jest de facto standard, ale default jest odwrotny ze względu na kompatybilność wsteczną.

`vertical-align: middle` — nazwa jest myląca bo "middle" tu znaczy wyrównanie do środka litery "x", nie do środka kontenera. Lista sugeruje `text-middle` lub `x-middle` jako lepsze nazwy.

Percentage heights obliczane względem `fill-available` zamiast być `undefined` w auto situations to problem który dotyka wielu deweloperów używających `height: 100%` na elemencie gdy rodzic nie ma zdefiniowanej wysokości.

`z-index` który "just works" na wszystkich elementach zamiast tylko na positioned elements — ile czasu wszyscy spędziliśmy debugując dlaczego `z-index` nie działa na elemencie który nie jest position relative/absolute/fixed?

`!important` który czytany przez inżyniera brzmi jak "not important" to mój ulubiony wpis. Wszystkie te historyczne decyzje tworzyły język który rozumie się przez lata praktyki, nie przez intuicję.

**Key takeaways:**
- CSS Working Group publicznie dokumentuje decyzje projektowe które uważają za błędy — to wartościowy materiał edukacyjny
- Wiele "dziwnych" zachowań CSS (box-sizing, vertical-align, percentage heights) ma tu wyjaśnienie kontekstowe
- Lista pokazuje jak legacy web compat zamraża błędy na dekady — nie możemy ich naprawić bo złamałoby to istniejące strony
- `z-index` powinien był nazywać się `z-order` lub `depth` i działać na wszystkich elementach

**Why do I care:** Czytanie tej listy to dobra szczepionka przeciwko cargo-cult CSS. Wiele rzeczy wygląda jak wygląda nie dlatego że ktoś tak mądrze zaprojektował, ale dlatego że decyzja z lat 90. jest zamrożona na wieczność przez web compat. Kiedy kolejny raz ktoś spyta "ale dlaczego CSS tak działa" — masz gotowy materiał do wyjaśnienia.

**Link:** [Incomplete List of Mistakes in the Design of CSS](https://wiki.csswg.org/ideas/mistakes/)

---

## Gdzie Znaleźć Kolory Których Twój Ekran Nie Może Ci Pokazać

**TLDR:** Głęboki esej o ograniczeniach gamutów kolorów ekranów i gdzie w rzeczywistości można zobaczyć kolory które ekran jest fizycznie niezdolny wyświetlić. Obejmuje fizykę kolorów, ptasie pióra, głębiny oceanów i... zielone światła na skrzyżowaniach.

**Summary:** Autor zaczyna od prowokacyjnego stwierdzenia: istnieją kolory których nie może ci pokazać, istnieją w realnym świecie, prawdopodobnie widziałeś je dziś, ale żaden ekran ich nie odda. Większość z nich to cyany.

Wyjaśnienie fizyczne jest klarowne: ludzie mają trzy rodzaje komórek stożkowych w oczach, każda reaguje inaczej na różne długości fal. Kolory na ekranie to manipulacja tymi trzema typami komórek. Problem polega na tym że trójkąt tworzony przez trzy kolory podstawowe ekranu (sRGB) nie obejmuje całego zakresu percepcji ludzkiej. Zwłaszcza obszar cyan-zielony jest mocno underrepresented. Jeszcze gorsze jest to że LED oświetlenie standardowe też słabo radzi sobie właśnie z cyanami.

Gdzie szukać tych kolorów? W liściach lasu przez które przebija słońce — wielokrotne przejście światła przez liście "oczyszcza" spektrum do wąskiego pasma zieleni bardziej nasyconej niż jakikolwiek ekran może oddać. Pod wodą, szczególnie głębiej — woda absorbuje czerwień i zieleń stopniowo, przepuszczając błękit, ale żywe organizmy fitoplankton tworzą kombinacje wykraczające poza sRGB. W ptasich piórach używających structural coloring — nanowarstwowej struktury melaniny która fizycznie filtruje fale światła, tworząc kolory implikujące negative values w sRGB.

Najłatwiej dostępny przykład: zielone światło na skrzyżowaniu. Nie jest zielone. Jest intensywnym turkusem poza gamut ekranu. Autor pisze że gdy to odkrył, jego powrót do domu był "transcendent". Specyfikacja NIST dla sygnałów drogowych ma malutki overlap z gamutami ekranów, ale nowoczesne diody LED w sygnałach emitują blisko spektralnego szczytu.

**Key takeaways:**
- sRGB obejmuje zaledwie część przestrzeni kolorów widocznych przez człowieka, szczególnie cyany są poza zasięgiem
- Display P3 (Apple, nowoczesne ekrany) jest trochę lepszy ale wciąż daleki od pełnej percepcji
- Structural coloring w ptasich piórach i motylach produkuje jedne z najbardziej nasyconych kolorów w naturze
- "Zielone" światło na skrzyżowaniu to intensywny turkus poza gamut — zauważ to dziś wracając do domu
- Lasery produkują najczystsze, najbardziej spektralne kolory możliwe

**Why do I care:** Z czysto frontendowej perspektywy: ten artykuł rzuca nowe światło (dosłownie) na dlaczego praca z wide color gamut i HDR displays jest tak trudna. Gdy tworzysz design system zakładając sRGB, ignorujesz rosnącą część urządzeń które mogą wyświetlić więcej. Wide gamut w CSS (oklch, display-p3) to temat który będzie ważniejszy w kolejnych latach, a ten esej daje fizykalne podstawy pod to rozumienie.

**Link:** [Where to Find the Colors Your Screen Can't Show You](https://moultano.wordpress.com/2026/06/19/where-to-find-the-colors-your-screen-cant-show-you/)

---

## Chrome 150 — Nowości

**TLDR:** Chrome 150 wprowadza trzy interesujące CSS funkcje: właściwość text-fit do automatycznego dopasowania rozmiaru fontu do kontenera, focusgroup dla deklaratywnej nawigacji strzałkami w komponentach oraz background-clip: border-area dla natywnych gradientowych obramowań.

**Summary:** CSS `text-fit` to odpowiedź na długoletni problem: jak sprawić żeby tekst automatycznie dopasowywał rozmiar fontu do szerokości kontenera. Wcześniej wymagało to JavaScript, bibliotek lub hacków z `font-size: calc(...)` i viewport units. `text-fit` sprawia że przeglądarka robi to natywnie. Szczególnie przydatne dla nagłówków responsywnych i dynamicznych etykiet.

`focusgroup` to deklaratywny atrybut HTML dla composited widgets: toolbary, listy, gridy. Zastępuje imperatywne skrypty "roving tabindex" które każdy piszył od nowa. Ustawiasz `focusgroup="toolbar wrap"` na kontenerze i przeglądarka automatycznie zapewnia nawigację strzałkami między dziećmi, gwarantowany tabstop i pamięć ostatnio sfocusowanego elementu. To eliminuje sporo accessibility boilerplate.

`background-clip: border-area` pozwala na natywne gradientowe obramowania bez `border-image`. Tło jest przycinane do obszaru obramowania z uwzględnieniem `border-width` i `border-style`, ignorując opacity `border-color`. Wcześniej gradient border wymagał pseudo-elementów, `border-image` z `border-image-slice` lub innych nieeleganckch obejść.

**Key takeaways:**
- `text-fit` CSS eliminuje potrzebę JavaScript do dopasowywania rozmiaru fontu do kontenera
- `focusgroup` HTML attribute zastępuje roving tabindex scripts dla composited widgets
- `background-clip: border-area` umożliwia gradient borders natywnie w CSS
- Wszystkie trzy feature są nowe w Chrome 150

**Why do I care:** `focusgroup` to ta funkcja o którą powinno się dbać jako o priorytet dla dostępności. Roving tabindex jest mechanizmem który każdy implementuje trochę inaczej i z różnymi bugami. Standardowy atrybut deklaratywny to mniej kodu, mniej bugów, lepsza spójność. Kiedy wsparcie będzie szerokie, warto audytować komponenty klawiszowe i migrować tam gdzie możliwe.

**Link:** [Chrome 150 — nowości](https://developer.chrome.com/blog/new-in-chrome-150)
