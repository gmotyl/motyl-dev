---
title: "htmx 4.0, dark mode bez trzeciego stanu i dlaczego szybsze wydania przeglądarek psują twoje dane RUM"
excerpt: "Frontend Focus #756: htmx 4.0 przechodzi na fetch() i jawne dziedziczenie atrybutów, Google usuwa uBlock Origin z Chrome Web Store, a Lea Verou, Jake Archibald i Harry Roberts pokazują, jak niepozorne detale CSS i cyklu wydań przeglądarek potrafią zaskoczyć."
publishedAt: "2026-09-02"
slug: "frontend-focus-756-htmx-4-dark-mode-toggles-css-custom-properties-rum"
hashtags: "#frontendfocus #css #html #generated #pl"
source_pattern: "Frontend Focus"
---

## htmx 4.0.0 zmienia domyślne dziedziczenie atrybutów

**TLDR:** Po ośmiu miesiącach pracy zespół htmx wypuścił wersję 4.0, która wewnętrznie przechodzi z XMLHttpRequest na fetch(), porządkuje nazewnictwo eventów i, co najważniejsze dla migrujących, wyłącza domyślne dziedziczenie atrybutów na rzecz jawnego sufiksu `:inherited`.

**Summary:** Największą zmianą w htmx 4 jest odwrócenie domyślnego zachowania dziedziczenia atrybutów. W htmx 2 atrybut na rodzicu, jak `hx-confirm`, automatycznie działał na dzieciach, co było wygodne, ale trudne do prześledzenia w większych szablonach, dokładnie tak jak kaskada w CSS. W wersji 4 trzeba to zadeklarować jawnie przez `hx-confirm:inherited`, a zespół dostarcza narzędzie CLI, które skanuje istniejące szablony i wypisuje dokładnie, które atrybuty wymagają dopisania sufiksu. Druga duża zmiana porządkuje nazewnictwo eventów według wzorca `htmx:faza:akcja`, więc `htmx:beforeRequest` staje się `htmx:before:request`, a stare eventy `htmx:xhr:*` znikają całkowicie, bo biblioteka nie używa już XMLHttpRequest.

Historia mechanizmu obsługi historii przeglądarki też się zmienia: zamiast cache'ować strony w localStorage, co powodowało błędy przy mutacjach DOM przez zewnętrzne skrypty, htmx 4 po prostu ponownie pobiera stronę przy nawigacji wstecz. Kto potrzebuje lokalnego cache'owania, dostaje osobne rozszerzenie oparte na sessionStorage. Nowością są też morphing swaps wbudowane prosto do biblioteki (rozwinięcie wcześniejszego projektu idiomorph autora) oraz tag `<hx-partial>`, wygodniejszy sposób na aktualizacje poza głównym targetem niż klasyczne out-of-band swaps.

Wersja 4.0 nie zastępuje od razu wersji 2.x w npm jako `latest`, żeby nie wymuszać aktualizacji na projektach korzystających z niewersjonowanych URL-i CDN, więc obie linie będą utrzymywane równolegle przynajmniej do wczesnego 2027 roku.

**Key takeaways:**
- Największa zmiana migracyjna: atrybuty przestają dziedziczyć się domyślnie, trzeba dopisać sufiks `:inherited`, a narzędzie CLI wskazuje dokładnie gdzie.
- Nazewnictwo eventów zostało ujednolicone do wzorca `htmx:faza:akcja`, a stare eventy `htmx:xhr:*` i `htmx:validation:*` zniknęły.
- Historia przeglądarki nie cache'uje już stron w localStorage, tylko pobiera je ponownie przy nawigacji wstecz, co eliminuje częstą klasę błędów z mutacjami DOM.

**Why do I care:** Dla zespołów, które postawiły na htmx zamiast SPA, to solidna, przemyślana aktualizacja, a nie przepisanie od zera, ale warto zaplanować migrację z wyprzedzeniem właśnie przez zmianę dziedziczenia atrybutów, bo to jest dokładnie ten rodzaj cichej zmiany zachowania, która nie rzuci błędem kompilacji, tylko po prostu przestanie działać w produkcji.

**Link:** [htmx 4.0.0 has been released!](https://four.htmx.org/announcements/2026-08-28-htmx-4.0.0-is-released)

## Feature detecting niewykrywalnych funkcji CSS przez @supports named-feature()

**TLDR:** Bramus opisuje nową funkcję `named-feature()` w `@supports`, która pozwala wykrywać zmiany zachowania istniejących właściwości CSS, na przykład to, czy dwie działające już osobno właściwości zaczęły współpracować, czego klasyczne `@supports` nigdy nie potrafiło sprawdzić.

**Summary:** Problem, który rozwiązuje `named-feature()`, jest stary jak sama właściwość `gap`. Gdy Chromium w 2020 roku zaczęło wspierać "Flexbox gap", nie było żadnego sposobu, żeby to wykryć, bo `@supports (gap: 1em)` zwracało prawdę już wcześniej dla Grid, a połączenie `@supports (display: flex) and (gap: 1em)` sprawdza tylko, czy przeglądarka potrafi sparsować obie deklaracje osobno, a nie czy działają razem. Bramus zgłosił ten problem w CSS Working Group jeszcze w 2020 roku, ale dopiero propozycja Davida Barona pod koniec 2023 roku, przy okazji podobnego problemu z `align-content` działającym na `display: block`, doprowadziła do konkretnego rozwiązania.

`named-feature()` przyjmuje z góry zdefiniowane słowo kluczowe jako argument i jest dodawana tylko dla naprawdę trudnych przypadków, na tyle istotnych, że Working Group jest gotowa dodać dla nich osobne słowo kluczowe do specyfikacji CSS. Obecnie zdefiniowane są dwa takie słowa: `anchor-position-follows-transforms`, pozwalające sprawdzić, czy CSS Anchor Positioning respektuje transformacje na elemencie zakotwiczonym (wsparcie w Chrome 150, nadchodzącym Safari 27 i prototypowane w Firefoksie), oraz `single-axis-scroll-container`, rozwiązujące długoletni problem z `position: sticky` uwięzionym w niepowiązanym scrollerze na drugiej osi.

Bramus zaznacza też, czego `named-feature()` nie rozwiązuje, między innymi feature detection dla Style Queries, gdzie zbyt dużo czasu minęło od pierwszego wdrożenia, żeby dodanie takiego sprawdzenia teraz nie generowało fałszywych negatywów.

**Key takeaways:**
- `@supports named-feature(keyword)` pozwala wykrywać zmiany zachowania i interakcje między właściwościami CSS, czego klasyczne `@supports` nigdy nie potrafiło.
- Obecnie zdefiniowane słowa kluczowe to `anchor-position-follows-transforms` i `single-axis-scroll-container`, oba zaproponowane przez autora artykułu.
- Wsparcie jest już w Chrome 150 i przygotowywane w Firefoksie 156 oraz Safari Technology Preview.

**Why do I care:** To bardzo niszowa, ale realna luka w narzędziach do feature detection, z którą część z nas już się zetknęła, próbując bezpiecznie wdrożyć funkcję CSS, która "częściowo już działa". Jeśli budujesz bibliotekę komponentów wspierającą starsze przeglądarki, warto wiedzieć, że taki mechanizm istnieje, zamiast polegać na testach JavaScriptowych albo zgadywaniu po numerze wersji przeglądarki.

**Link:** [Feature Detecting "Undetectable" CSS Features with @supports named-feature()](https://www.bram.us/2026/08/27/feature-detecting-undetectable-css-features-with-supports-named-feature/)

## Google usuwa z Chrome Web Store wszystkie rozszerzenia Manifest V2, w tym uBlock Origin

**TLDR:** Google zakończył wieloletnie przejście na Manifest V3, usuwając z Chrome Web Store wszystkie pozostałe rozszerzenia Manifest V2, w tym jednego z najskuteczniejszych blokerów treści, uBlock Origin. Brave zdecydował się hostować cztery popularne rozszerzenia MV2 na własnym backendzie.

**Summary:** Rozszerzenia zainstalowane na Chrome 138 lub wcześniejszym pozostaną zainstalowane, ale nie będą już otrzymywać aktualizacji ani dać się ponownie zainstalować po usunięciu. Ponieważ Chrome Web Store jest dominującym marketplace'em dla przeglądarek opartych na Chromium, konsekwencje wykraczają poza samego Chrome'a: użytkownicy przeglądarek takich jak Brave też tracą możliwość znalezienia i zainstalowania tych rozszerzeń przez sklep, nawet jeśli ich przeglądarka technicznie nadal wspiera Manifest V2. Brave odpowiedział, hostując cztery popularne rozszerzenia MV2, AdGuard, uBlock Origin, uMatrix i NoScript, na własnym backendzie, dając użytkownikom łatwy sposób na ich włączenie.

Argumentacja Google za Manifest V3 opiera się na silniejszym bezpieczeństwie, prywatności, wydajności i ściślejszej kontroli nad tym, co rozszerzenia mogą robić, co samo w sobie są uzasadnionymi problemami do rozwiązania, biorąc pod uwagę, jak duży dostęp do aktywności przeglądania mogą mieć rozszerzenia przeglądarkowe.

**Key takeaways:**
- Wszystkie rozszerzenia Manifest V2 zniknęły z Chrome Web Store, włącznie z uBlock Origin, bez możliwości ponownej instalacji po usunięciu z przeglądarki.
- Konsekwencje sięgają poza Chrome'a, bo inne przeglądarki oparte na Chromium też polegają na Chrome Web Store jako głównym źródle rozszerzeń.
- Brave hostuje cztery popularne rozszerzenia MV2 na własnym backendzie jako obejście.

**Why do I care:** Dla zespołów budujących rozszerzenia przeglądarkowe to ostateczne potwierdzenie, że Manifest V2 jest martwy, nie tylko teoretycznie, ale operacyjnie, więc każdy projekt, który jeszcze na nim siedzi, powinien mieć plan migracji gotowy, zanim klienci zaczną pytać, dlaczego rozszerzenie zniknęło ze sklepu.

**Link:** [Google Has Removed Manifest V2 Extensions From the Chrome Web Store, Including uBlock Origin](https://webiterate.dev/google-removed-extensions-ublock-origin-108/)

## Budowanie własnego edytora tekstu: canvas, contenteditable czy textarea

**TLDR:** dbushell dokumentuje serię eksperymentów z budową prostego edytora tekstu w przeglądarce, przechodząc od renderowania na `<canvas>`, przez `contenteditable="plaintext-only"`, aż po zwykły `<textarea>` z podświetlaniem składni, i pokazuje, dlaczego ta ostatnia opcja okazała się najbardziej wydajna dla dłuższych tekstów.

**Summary:** Pierwsze podejście, renderowanie tekstu na `<canvas>`, dawało pełną kontrolę nad rysowaniem, ale za darmo nie dawało nic: brak zaznaczania tekstu, historii cofania, wklejania wieloliniowego i, co gorsza, całkowity brak dostępności, bo canvas jest z natury nieczytelny dla technologii asystujących. Autor obszedł problem przewijania, używając natywnego overflow na ukrytym elemencie div, którego rozmiar odpowiada tekstowi na canvasie, ale fundamentalny problem dostępności pozostał nierozwiązany.

Drugie podejście, `contenteditable="plaintext-only"` na elemencie z wyłączonym spellcheck (którego wyłączenie, jak przyznaje autor, zajęło mu dni, żeby wykryć jako źródło skoków opóźnienia wpisywania), dało za darmo natywne zaznaczanie tekstu i historię cofania, korzystając z Selection API do renderowania własnego kursora tekstowego. Problem w tym, że przy większej liczbie znaków pojawiały się nieprzewidywalne problemy z wydajnością, gorsze w przeglądarkach opartych na Chromium niż w WebKit czy Firefoksie.

Ostatecznie zwykły `<textarea>` okazał się zaskakująco bardziej wydajny dla dłuższych tekstów niż contenteditable. Ponieważ textarea nie wspiera CSS Custom Highlights, autor dodał osobną warstwę div do podświetlania widocznych linii przy pomocy biblioteki MicroLighter, choć zauważa na marginesie, że nowe API OpaqueRange odblokowuje własne highlighty bezpośrednio na textarea, a EditContext API poprawia obsługę wejścia na canvasie, co sugeruje, że oba wcześniejsze podejścia mogą stać się bardziej realne w przyszłości.

**Key takeaways:**
- Canvas daje pełną kontrolę nad renderowaniem, ale kosztem całkowitego braku dostępności i konieczności ręcznej implementacji zaznaczania, historii i przewijania.
- `contenteditable="plaintext-only"` z wyłączonym spellcheck daje natywną dostępność i historię cofania za darmo, ale ma nieprzewidywalne problemy wydajnościowe przy większej ilości tekstu.
- Zwykły `<textarea>` okazał się najbardziej wydajny dla długich tekstów, mimo że wymaga osobnej warstwy do podświetlania składni.

**Why do I care:** To dobre przypomnienie, że "oczywisty" wybór technologii dla danego problemu UI wcale nie musi być najlepszy pod względem wydajności, a jedyny sposób, żeby się przekonać, to zbudować prototyp i zmierzyć. Jeśli kiedykolwiek rozważałeś canvas do czegoś, co wygląda jak zadanie dla contenteditable, ten wpis jest dobrym ostrzeżeniem przed kosztami dostępności, które łatwo przeoczyć na wczesnym etapie.

**Link:** [Fine, I'll build my own text editor!](https://dbushell.com/2026/09/01/text-editor/)

## Dark mode toggle: dlaczego dwa stany wystarczą

**TLDR:** Lea Verou argumentuje, że mimo iż model danych przełącznika motywu musi mieć trzy stany (jasny, ciemny, systemowy), interfejs powinien pokazywać tylko dwa na raz, bo użytkownicy nie szukają rozwiązań na problemy, których aktualnie nie mają.

**Summary:** Punktem wyjścia jest obserwacja, że dobrze zaprojektowany dwustanowy przełącznik potrafi wyrazić wszystkie trzy stany modelu danych, mimo że w danej chwili pokazuje tylko jeden z dwóch. Argument za trzema widocznymi opcjami brzmi przekonująco: "systemowy" to inna intencja niż "jasny" czy "ciemny", jedno to polityka, drugie to wartość, więc użytkownik powinien móc wyrazić tę różnicę. Verou kontruje to, wskazując, że rzeczywisty cel użytkownika odwiedzającego stronę nigdy nie polega na dostrajaniu motywu, tylko na czytaniu dokumentacji, ocenie produktu czy rysowaniu w aplikacji graficznej. Trzeci stan rozwiązuje wyimaginowany problem: użytkownik szukający przełącznika motywu na stronie, która wygląda już dobrze, żeby zapewnić, że będzie dobrze wyglądać w przyszłości, to zachowanie, które sama autorka określa jako ekstremalnie rzadkie.

Kluczowe rozróżnienie dotyczy tego, że dobry dwustanowy przełącznik pokazuje bieżącą rozwiązaną wartość jako stan systemowy (na przykład ikona słońca czy księżyca odpowiadająca aktualnemu wyglądowi), a po pierwszym kliknięciu przełącza na przeciwieństwo i dopiero wtedy zapisuje jawną wartość override. Drugie kliknięcie wraca do stanu systemowego i usuwa zapisaną wartość. Najczęstszy błąd implementacyjny polega na tym, że zapisana wartość, która akurat zbiega się z preferencją systemową, po cichu zamienia tymczasową regulację w trwałe przypięcie bez wyjścia, co narusza zasadę kontroli użytkownika.

Verou przyznaje dwa uzasadnione przypadki dla trójstanowych kontrolek: panel ustawień, gdzie użytkownik już jest w trybie podejmowania decyzji na przyszłość i ma więcej przestrzeni ekranowej, oraz sytuację, gdy jasny motyw wygląda inaczej w zależności od ustawienia systemowego, co obecne CSS (`light-dark()`) słabo wspiera.

**Key takeaways:**
- Model danych motywu ma trzy stany, ale interfejs dla stałego przełącznika w nagłówku powinien pokazywać tylko dwa na raz.
- Najczęstszy błąd to zapisywanie wartości, która przypadkowo zbiega się z preferencją systemową, co uniemożliwia późniejsze cofnięcie do stanu systemowego.
- Trójstanowe kontrolki mają sens w panelach ustawień, gdzie jest więcej przestrzeni i inny kontekst decyzyjny użytkownika.

**Why do I care:** Ten artykuł to dobry przykład na to, jak łatwo pomylić model danych z modelem interfejsu, a to jeden z najczęstszych błędów projektowych, jakie widuję w code review komponentów ustawień. Jeśli twój zespół akurat projektuje przełącznik motywu, ten tekst daje konkretną, przetestowaną logikę stanu, którą można wdrożyć od razu, zamiast wymyślać ją od nowa.

**Link:** [Dark mode toggles: two states are enough](https://lea.verou.me/blog/2026/dark-mode-toggles/)

## Kiedy dokładnie liczą się wartości custom properties w CSS

**TLDR:** Jake Archibald tłumaczy, że moment obliczenia wartości custom property w CSS zależy od tego, czy właściwość została zarejestrowana przez `@property`, co ma bezpośredni wpływ na funkcje takie jak `sibling-index()`, jednostki względne czy rozwiązywanie adresów URL.

**Summary:** Punktem wyjścia jest pozornie proste pytanie: jeśli custom property zdefiniowana na elemencie nadrzędnym używa `sibling-index()`, a potem jest odczytywana przez `var()` na elemencie potomnym, względem którego elementu zostanie obliczony indeks? Odpowiedź brzmi "to zależy", bo niezarejestrowana custom property zachowuje się jak strumień tokenów, więc `var()` jest podstawiany dosłownie w miejscu użycia i dopiero tam obliczany, co w praktyce daje inny wynik niż intuicja mogłaby podpowiadać.

Sytuacja zmienia się całkowicie po zarejestrowaniu właściwości przez `@property` z konkretną składnią, na przykład `<number>`. Wtedy pełna wartość jest obliczana wcześniej, w kontekście elementu, na którym property zostało zdefiniowane, a nie tam, gdzie jest używana przez `var()`. Ten sam mechanizm dotyczy jednostek względnych czcionki (em, ex, ch, lh), jednostek zapytań kontenerowych oraz rozwiązywania adresów URL, gdzie `@property` z odpowiednią składnią przypina URL do arkusza stylów, w którym został zadeklarowany, zamiast do arkusza, który go konsumuje.

Bardziej subtelny przypadek dotyczy samego `var()`, który jest funkcją "dowolnego podstawienia" razem z `if()`, `attr()` i `ident()`, więc jest podstawiany niezależnie od zadeklarowanej składni właściwości. W przykładzie z mnożnikiem zagnieżdżonym w `calc(sibling-index() * var(--multiplier))`, wartość `--multiplier` zdefiniowana na elemencie potomnym jest całkowicie ignorowana, bo cały wyrażenie jest obliczane w kontekście, w którym zdefiniowano `--index`, a nie tam, gdzie zdefiniowano `--multiplier`.

**Key takeaways:**
- `@property` z konkretną składnią zmienia moment i kontekst obliczenia wartości custom property, z miejsca użycia na miejsce deklaracji.
- Ten sam mechanizm wpływa na jednostki relatywne czcionki, jednostki zapytań kontenerowych i rozwiązywanie URL-i w CSS.
- `var()` jest funkcją "dowolnego podstawienia" i działa niezależnie od zarejestrowanej składni, co może prowadzić do zaskakującego ignorowania wartości zdefiniowanych bliżej miejsca użycia.

**Why do I care:** To dokładnie ten rodzaj wiedzy o CSS, który przez lata działa "jakoś tam", dopóki ktoś nie zarejestruje custom property przez `@property` i nagle cały layout się rozjeżdża bez żadnej zmiany w widocznym kodzie. Warto przeczytać ten artykuł raz, zanim zaczniesz na poważnie korzystać z `sibling-index()` czy innych nowych funkcji CSS, które współpracują z rejestrowanymi właściwościami.

**Link:** [Controlling when CSS custom property values are computed](https://jakearchibald.com/2026/css-custom-property-compute-time/)

## Natywny HTML i CSS zastąpiły spory kawałek JavaScriptu

**TLDR:** Ronalds Vilciņš przechodzi przez listę interakcji, które kiedyś wymagały JavaScriptu, od akordeonów po walidację formularzy, i pokazuje, że w 2026 roku większość z nich da się zrobić samym HTML-em i CSS-em, z `<details>`, `<dialog>`, Popover API, `:has()` i container queries na czele.

**Summary:** Autor systematycznie przechodzi przez klasyczne komponenty UI. Akordeony, kiedyś wymagające nasłuchiwania kliknięć i przełączania klas, dziś to po prostu `<details>` i `<summary>`, z przeglądarką obsługującą stan, klawiaturę i animację za darmo. Modale, kiedyś skomplikowana układanka z overlayem, blokowaniem focusu i obsługą Escape, dziś to natywny `<dialog>` z metodą `showModal()` i pseudo-elementem `::backdrop`. Popovery idą jeszcze dalej: atrybut `popovertarget` łączący przycisk z elementem oznaczonym jako `popover` nie wymaga żadnego JavaScriptu, a Popover API jest już oznaczone jako Baseline 2025.

Selektor `:has()` rozwiązuje problem, który wcześniej wymagał JavaScriptu niemal zawsze: stylowanie rodzica na podstawie tego, co zawiera, na przykład podświetlenie pola formularza, gdy input wewnątrz jest nieprawidłowy, przez `.field:has(input:invalid)`. Container queries z kolei uwalniają komponenty od zależności od szerokości okna przeglądarki, pozwalając kartom czy innym reużywalnym elementom reagować na szerokość własnego kontenera, niezależnie od tego, czy trafiają do sidebaru, modala czy pełnej szerokości treści.

Reszta artykułu przechodzi przez mniejsze, ale równie praktyczne przykłady: `field-sizing: content` zamiast ręcznego mierzenia `scrollHeight` dla automatycznie rosnących textarea, `light-dark()` do przełączania motywów bez JavaScriptu wykrywającego preferencje systemowe, scroll-driven animations do pasków postępu bez nasłuchiwania eventu scroll, oraz natywna walidacja formularzy przez atrybuty takie jak `pattern`, `minlength` czy `type="email"` w połączeniu z pseudo-klasami `:user-invalid` i `:user-valid`. Autor zamyka artykuł jasnym zastrzeżeniem: to nie jest argument przeciwko JavaScriptowi, tylko przeciwko sięganiu po niego jako pierwszemu narzędziu, zanim sprawdzi się, czy HTML albo CSS już nie rozwiązały danego problemu.

**Key takeaways:**
- `<details>`, `<dialog>` i Popover API pokrywają większość klasycznych wzorców UI (akordeony, modale, menu) bez ani jednej linii JavaScriptu.
- `:has()` i container queries usuwają całą klasę wcześniejszych zastosowań ResizeObserver i ręcznego zarządzania klasami na podstawie zawartości.
- `field-sizing`, `light-dark()` i scroll-driven animations zastępują typowe drobne skrypty do rosnących pól, motywów i pasków postępu.

**Why do I care:** Ta lista to dobry checklist do przejrzenia przed każdym nowym komponentem: zanim otworzysz plik `.tsx` z kolejnym custom hookiem, warto sprawdzić, czy platforma już nie rozwiązała tego problemu. W praktyce oznacza to mniej zależności do aktualizowania, mniej edge case'ów do ręcznego ogarnięcia i więcej zachowania oddanego przeglądarce, co przy odrobinie dyscypliny realnie zmniejsza rozmiar bundla i powierzchnię błędów w produkcyjnym kodzie.

**Link:** [Native HTML and CSS Features That Replaced JavaScript](https://ronaldsvilcins.com/2026/08/30/native-html-and-css-features-that-replaced-javascript/)

## Szybszy cykl wydań Chrome i Firefoksa miesza twoje dane RUM

**TLDR:** Harry Roberts z CSS Wizardry ostrzega, że przejście Chrome'a i Firefoksa na wydania co dwa tygodnie, zamiast co cztery, zmieni skład próbki w danych RUM na tyle, że regresja w wykresach może być artefaktem segmentacji, a nie realnym pogorszeniem produktu.

**Summary:** Chrome przechodzi na dwutygodniowy cykl wydań od wersji 153, której stabilna wersja jest zaplanowana na 8 września, z nową wersją Beta i Stable co dwa tygodnie na desktopie, Androidzie i iOS, podczas gdy Extended Stable zachowuje dotychczasowy ośmiotygodniowy cykl. Firefox idzie tą samą drogą, z wersją 155 zaplanowaną na 1 września, dwa tygodnie wcześniej niż pierwotnie planowano. Roberts podkreśla, że sam harmonogram jest decyzją przeglądarek, ale konsekwencje dla danych RUM są jego własną obserwacją, którą zespoły powinny same przetestować.

Praktyczny problem polega na tym, że segmentacja po dokładnej głównej wersji Chrome'a będzie teraz produkować mniejsze, krócej żyjące kohorty, szczególnie na trasach o mniejszym ruchu albo gdy łączy się wymiary przeglądarki, urządzenia, kraju i eksperymentu. Wykres 28-dniowy będzie zawierał więcej granic wydań, a ruch widoczny między dwiema datami może odzwierciedlać po prostu inną mieszankę wersji Chrome'a, a nie realną zmianę produktową. Roberts zaleca ustawienie progów minimalnej próbki przed segmentacją po dokładnej wersji i spadanie do szerszej kohorty, gdy widok konkretnej wersji jest zbyt cienki, żeby uniknąć sytuacji, w której segmentacja mająca wyjaśnić jedną anomalię generuje drugą, głośniejszą.

Roberts łączy to z dwoma innymi zmianami z tego samego tygodnia: DevTools w Chrome 152 pokazuje teraz Core Web Vitals dla miękkich nawigacji SPA bezpośrednio w Live Metrics, a jego własny artykuł o "Unattributed Navigation Overhead" pokazuje, jak dużo czasu w TTFB pozostaje niewyjaśnione po odjęciu przekierowań, DNS, połączenia i fazy request-to-response, znajdując w jednym zbiorze danych klienta ponad 7 milionów obserwacji UNO przy zaledwie 166 widocznych przekierowaniach.

**Key takeaways:**
- Chrome przechodzi na dwutygodniowy cykl wydań od wersji 153 (8 września), Firefox od wersji 155 (1 września), co oznacza więcej granic wersji w każdym oknie raportowania RUM.
- Segmentacja po dokładnej wersji przeglądarki wymaga progów minimalnej próbki, inaczej ruch może być mylony z regresją produktu.
- "Unattributed Navigation Overhead" to nazwany fragment TTFB, który pozostaje niewyjaśniony po odjęciu znanych faz nawigacji, warto go dodać do RUM jako osobną metrykę.

**Why do I care:** Jeśli twój zespół monitoruje Core Web Vitals i segmentuje je po wersji przeglądarki, ten artykuł jest praktycznym ostrzeżeniem przed fałszywymi alarmami w najbliższych tygodniach: szybszy cykl wydań oznacza, że trzeba będzie częściej aktualizować kalendarz adnotacji wydań przeglądarek obok własnych wdrożeń, żeby móc odróżnić realną regresję od zwykłej zmiany populacji użytkowników.

**Link:** [Web-Perf Wednesday 006 – Faster Browser Releases Change Your RUM Population](https://csswizardry.com/2026/08/web-perf-wednesday-006-faster-browser-releases-change-your-rum-population/)
