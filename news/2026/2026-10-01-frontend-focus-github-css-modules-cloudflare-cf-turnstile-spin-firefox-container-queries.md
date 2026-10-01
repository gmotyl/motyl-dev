---
title: "GitHub rzuca CSS-in-JS dla CSS Modules, Cloudflare uzbraja agenty w cf i Turnstile Spin, a Firefox i Smashing Magazine przemyślają swoje fundamenty"
excerpt: "GitHub skończył trzyletnią migrację z CSS-in-JS na CSS Modules, Cloudflare daje agentom własne CLI do całego API, Firefox dostaje nowy wygląd, a Container Queries wciąż są używane źle."
publishedAt: "2026-09-30"
slug: "frontend-focus-github-css-modules-cloudflare-cf-turnstile-spin-firefox-container-queries"
hashtags: "#frontendfocus #css #html #performance #architecture #cloudflare #frontend #generated #pl"
source_pattern: "Frontend Focus"
---

## Jak GitHub przez trzy lata wychodził z CSS-in-JS

**TLDR:** Primer Design System GitHuba w pełni przeniósł się z CSS-in-JS na CSS Modules, zyskując do 55% szybszy server-side rendering, a cała migracja, od pierwszego komponentu po usunięcie `styled-components` z `dotcom`, zajęła od 2023 do czerwca 2026 roku.

**Streszczenie:** Problem zaczął się w 2023 roku, gdy liczba komponentów na niektórych stronach GitHuba zaczęła rosnąć tak szybko, że CSS-in-JS zaczęło kosztować realny czas: dłuższe pierwsze ładowanie, bo style inicjalizowały się po stronie klienta, i coraz gorszy server-side rendering w miarę zbierania stylów po stronie serwera. Zespół Primer wybrał CSS Modules, bo dawały pisanie natywnego CSS przy zachowaniu kolokacji komponentu ze stylami, bez żadnego runtime'u po stronie klienta czy serwera. Migrację rozbili na etapy per komponent: nowy plik ze stylami, feature flag przełączający między starym a nowym podejściem, porównanie zrzutów z testów regresji wizualnej, i stopniowy rollout od zespołu przez pracowników GitHuba po wszystkich użytkowników.

Najtrudniejszym elementem był prop `sx`, pozwalający na inline'owe nadpisywanie stylów komponentu, czyli dokładnie to, co w CSS-in-JS jest jednocześnie najwygodniejsze i najdroższe w runtime. W szczytowym momencie do migracji czekało około 7760 wystąpień `sx` w kodzie GitHuba. Rotacja ośmiu inżynierów przez pół roku zmigrowała 6419 z nich ręcznie wspomaganym codemodem, a resztę, od 895 do zera, dokończył zespół dwóch inżynierów w trzy tygodnie przy pomocy agentów Copilota. Po drodze trzeba było jeszcze rozplątać siedem motywów kolorystycznych GitHuba, w tym warianty wysokiego kontrastu, bo te też były spięte przez `styled-components`.

Ciekawostka: w trakcie migracji ogłoszono, że `styled-components` wchodzi w tryb podtrzymania (maintenance mode), co zespół Primer odebrał jako potwierdzenie, że kierunek był słuszny.

**Kluczowe wnioski:**
- Migracja z CSS-in-JS na CSS Modules dała do 55% szybszy server-side rendering i 25% szybszą inicjalizację komponentów na stronie.
- Prop `sx` z ok. 7760 wystąpień był najtrudniejszym elementem migracji, bo łączył wygodę inline nadpisań z kosztem runtime.
- Cała migracja, od pierwszego komponentu Primer po usunięcie `styled-components` z `dotcom`, zajęła od 2023 do czerwca 2026.
- Feature flagi i testy regresji wizualnej pozwoliły migrować bezpiecznie, bez przerw w działaniu produktu.

**Dlaczego mi na tym zależy:** To case study z realnymi liczbami o tym, ile kosztuje CSS-in-JS na dużą skalę, i jak rozłożyć trzyletnią migrację architektoniczną na kawałki, które da się bezpiecznie wdrażać bez zamrażania feature'ów. Jeśli twój zespół wciąż debatuje nad `styled-components` kontra CSS Modules kontra Tailwind, to konkretny przykład tego, jak bardzo decyzja stylingowa potrafi się przełożyć na wydajność renderowania przy odpowiedniej skali.

**Link:** [Improving site performance by shipping more CSS](https://github.blog/engineering/architecture-optimization/improving-site-performance-by-shipping-more-css/)

## Cloudflare daje agentom własne CLI do całego swojego API

**TLDR:** Cloudflare wypuszcza `cf`, nowe CLI generowane wprost ze schematów OpenAPI, które pokrywa ponad 3000 operacji z całego API Cloudflare, w kontrze do Wranglera, który po latach ręcznej rozbudowy obsługiwał tylko około 280.

**Streszczenie:** Punktem wyjścia jest twardy fakt z telemetrii: w marcu 2026 agenty odpowiadały za jedną czwartą użycia Wranglera, a w zeszłym tygodniu już za 48%, przy czym agenty używają prawie dwukrotnie więcej odrębnych komend dziennie niż ludzie. Problem w tym, że Wrangler był budowany ręcznie przez poszczególne zespoły produktowe, każdy po swojemu, więc terminologia była niespójna (`d1 info`, `hyperdrive get`, `workflows describe`), a całość pokrywała ułamek tego, co oferuje Cloudflare. `cf` powstało z wewnętrznego pipeline'u Forge, który generuje komendy CLI wprost ze schematów OpenAPI napędzających dokumentację i SDK, co od razu dało skok z ~280 do ponad 3000 operacji.

Projekt jest zaprojektowany pod agentów, nie pod ludzi czytających output w terminalu: JSON jest domyślnym formatem (ludzko czytelny po sformatowaniu, skondensowany dla agentów), a `cf cli search` pozwala agentowi zapytać po ludzku, czego potrzebuje, zamiast przedzierać się przez setki ścieżek komend. Konfiguracja przechodzi na `cloudflare.config.ts`, czyli typowany TypeScript zamiast TOML bez schematu, co w praktyce oznacza, że agent korzystający z LSP (jak Claude Code czy Codex) trafniej podpowiada zmiany. Jedna z wewnętrznych konfiguracji Cloudflare skurczyła się z ponad 5000 linii do dużo krótszych plików fabrycznych, bo środowiska przestały być kopiowane ręcznie blok po bloku.

Pod spodem `cf` domyślnie korzysta z Vite zamiast esbuild używanego przez Wranglera, co daje HMR i dostęp do całego ekosystemu pluginów Vite. Migracja istniejącego Workera to jedna komenda: `cf migrate`. Wrangler nie znika z dnia na dzień, Cloudflare obiecuje wsparcie przez 18 miesięcy po zakończeniu bety.

**Kluczowe wnioski:**
- Udział agentów w użyciu Wranglera skoczył z pojedynczych procent do 48% w niecały rok.
- `cf` pokrywa ponad 3000 operacji API Cloudflare, generowanych automatycznie ze schematów OpenAPI, w miejsce ~280 ręcznie budowanych komend Wranglera.
- Domyślnym formatem wyjścia jest JSON, a `cf cli search` pozwala agentowi znaleźć właściwą komendę językiem naturalnym.
- Konfiguracja przechodzi na typowany `cloudflare.config.ts`, co poprawia podpowiedzi w edytorach i dla agentów korzystających z LSP.

**Dlaczego mi na tym zależy:** To sygnał, że duzi dostawcy chmurowi zaczynają projektować narzędzia developerskie z agentem jako głównym użytkownikiem, a człowiekiem jako kimś "o jeden krok dalej". Jeśli twój zespół buduje własne CLI do wewnętrznych systemów, konsekwentny JSON-first output i search po naturalnym języku to konkretny wzorzec do podkradnięcia, niezależnie od tego, czy używasz Cloudflare.

**Link:** [Introducing cf: the agentic CLI for the entire Cloudflare API](https://blog.cloudflare.com/cloudflare-cf-cli-launch/)

## Agenci mogą teraz sami stawiać zabezpieczenie Turnstile

**TLDR:** Turnstile Spin to nowa, zagentowana wersja konfiguracji Turnstile (anty-botowej alternatywy dla CAPTCHA od Cloudflare), która automatycznie wpina widget po stronie frontendu i walidację Siteverify po stronie backendu, naprawia źle skonfigurowane wdrożenia i migruje z innych dostawców CAPTCHA.

**Streszczenie:** Turnstile od 2023 roku obiecuje ochronę przed botami bez proszenia użytkownika o rozwiązywanie zagadek, ale wymagało dwuetapowej konfiguracji: osadzenia widgetu na froncie i wywołania Siteverify na backendzie. To proste dla kogoś, kto zna oba końce stacku, ale coraz więcej osób buduje aplikacje głównie promptami, bez doświadczenia backendowego, i to one zostawiały widgety bez walidacji po drugiej stronie. Turnstile przetwarza dziś około trzech miliardów weryfikacji w typowy dzień roboczy, a w jednym tygodniu ponad 23 tysiące kont założyło nowy widget, więc skala błędnych konfiguracji też rosła proporcjonalnie.

Spin obsługuje trzy scenariusze: świeżą instalację (agent sam znajduje odpowiedni kod frontendowy i backendowy i proponuje plan zmian), naprawę istniejącego widgetu bez walidacji (dashboard Cloudflare pokazuje wtedy baner "Fix with Spin"), oraz migrację z innego dostawcy CAPTCHA. Co istotne, Spin nie wysyła kodu aplikacji do Cloudflare ani nie modyfikuje go zdalnie, wszystkie zmiany robi lokalnie ten sam agent, którego już używasz (Claude Code, Cursor, Codex). Od lipca zanotowano ponad 65 000 udanych utworzeń widgetów przez Spin i ponad 30 000 skopiowań wygenerowanego promptu.

**Kluczowe wnioski:**
- Turnstile Spin automatyzuje oba kroki konfiguracji: widget na froncie i walidację Siteverify na backendzie.
- Obsługuje trzy scenariusze: świeżą instalację, naprawę źle skonfigurowanego widgetu, migrację z innego CAPTCHA.
- Działa lokalnie przez twojego agenta (Claude Code, Cursor, Codex), kod aplikacji nie trafia do Cloudflare.
- Od lipca odnotowano ponad 65 000 udanych konfiguracji widgetów.

**Dlaczego mi na tym zależy:** To dobry przykład tego, jak duzi dostawcy infrastruktury reagują na rosnącą liczbę osób budujących produkcyjne aplikacje bez pełnej wiedzy o backendzie: zamiast upraszczać dokumentację, dają agentowi gotowy playbook do wykonania całej konfiguracji za użytkownika. Dla zespołów z doświadczeniem backendowym to też po prostu oszczędność czasu przy powtarzalnej, nudnej robocie.

**Link:** [Agents can now set up your website's security with Turnstile Spin](https://blog.cloudflare.com/turnstile-spin/)

## Firefox ma nowy wygląd po raz pierwszy od dawna

**TLDR:** Mozilla wdraża nowy design Firefoksa do wszystkich użytkowników na desktopie i mobile wraz z FX 157, po miesiącach testów w Nightly, przywracając przy okazji Compact Mode i dodając nowy wybór motywów oraz personalizację strony nowej karty.

**Streszczenie:** Odświeżenie obejmuje kolory, ikony i motywy w całej przeglądarce, od zakładek po Private Browsing, przy zachowaniu tego samego budżetu wydajnościowego co wcześniej. Mozilla opisuje zamysł jako "aktualny, ale nie generyczny, ciepły, ale wciąż precyzyjny", co w praktyce oznacza wspólny język wizualny dla desktopu i mobile zamiast osobnych estetyk. Największym powrotem jest Compact Mode, o który użytkownicy prosili od dawna: zmniejsza zakładki i paski narzędzi, żeby zmieścić więcej treści, z automatycznym trybem compact dla mniejszych ekranów. Dochodzi do tego nowy selektor motywów z dodatkowymi tapetami oraz możliwość decydowania, co dokładnie ląduje na stronie nowej karty, łącznie z przypinaniem skrótów do stale używanych stron.

Mozilla podkreśla, że to, co sprawiło, że ludzie wybierali Firefoksa, zostaje bez zmian: niezależność, otwarty kod źródłowy, kontrola nad tym, które funkcje AI się pojawiają, którego modelu się używa i jaki kontekst dostaje.

**Kluczowe wnioski:**
- FX 157 wprowadza nowy design jednocześnie na desktopie i mobile, bez wpływu na wydajność.
- Compact Mode wraca, z automatycznym trybem dla mniejszych ekranów.
- Nowy selektor motywów i pełna personalizacja strony nowej karty.
- Funkcje AI w przeglądarce pozostają opcjonalne i konfigurowalne.

**Dlaczego mi na tym zależy:** Dla kogoś budującego produkty webowe to głównie przypomnienie, że UI przeglądarki wciąż się zmienia, więc warto testować swoją aplikację na świeżych wersjach, zanim użytkownicy zaczną zgłaszać różnice w renderowaniu pasków czy motywów systemowych.

**Link:** [The new Firefox design: More modern, more flexible, still Firefox](https://blog.mozilla.org/en/firefox/new-firefox-design-is-here/)

## Wykrywanie nachodzenia elementów w czystym CSS

**TLDR:** Łącząc CSS anchor positioning ze scroll-driven animations i `timeline-scope`, da się wykryć, kiedy dwa elementy się stykają lub nachodzą na siebie, i zareagować na to zmianą stylu, bez ani jednej linijki JavaScriptu.

**Streszczenie:** Punktem wyjścia jest typowy problem z dekoracyjnym elementem na stronie portfolio: jak ukryć go dokładnie w momencie, gdy zaczyna nachodzić na sekcję obok, przy czym pozycja i rozmiar obu elementów są płynne i zależą od viewportu. Autor najpierw buduje "element pomiarowy" przez anchor positioning, którego krawędzie są przypięte do prawej krawędzi dekoracji i lewej krawędzi sekcji, więc jego szerokość odzwierciedla dokładnie ilość wolnej przestrzeni między nimi. Potem dokłada pseudo-element o stałej szerokości 20px wewnątrz tego elementu pomiarowego z `overflow-x: auto`. Gdy wolna przestrzeń spada poniżej 20px, element pomiarowy zaczyna się przewijać, czyli fizycznie overflow'uje, co samo w sobie jest sygnałem "dotyku".

Najsprytniejszy element to wykorzystanie `timeline-scope` i scroll-driven animations nie do animowania czegokolwiek, tylko do przełączenia zmiennej CSS w momencie, gdy element pomiarowy zaczyna overflow'ować. Animacja ma tę samą wartość "from" i "to", więc nie chodzi o progres, tylko o jednorazowe przerzucenie flagi w momencie przewinięcia. Finalnie container style query (`@container style(--touching: 1)`) reaguje na tę zmienną i ukrywa dekorację, kiedy przestrzeń się kończy. Całość działa tylko w przeglądarkach wspierających jednocześnie scroll-driven animations i anchor positioning, ale autor traktuje to jako progressive enhancement, nie wymóg.

**Kluczowe wnioski:**
- CSS anchor positioning pozwala zmierzyć odległość między dwoma elementami bez JavaScriptu.
- Pseudo-element o stałej szerokości plus `overflow-x: auto` zamienia tę odległość w sygnał binarny "dotyka / nie dotyka".
- `timeline-scope` ze scroll-driven animations pozwala przerzucić zmienną CSS w momencie overflow, bez animowania czegokolwiek realnie.
- Container style queries reagują na tę zmienną i stylują inny element na podstawie stanu sąsiada.

**Dlaczego mi na tym zależy:** To dobry przykład na to, jak bardzo rozszerzył się zestaw narzędzi czysto CSS-owych w ostatnich dwóch latach. Jeszcze niedawno taki problem automatycznie kończył się w JavaScripcie z ResizeObserverem, a dziś da się go rozwiązać deklaratywnie, co oznacza mniej kodu do utrzymania i jeden mechanizm przeglądarki zamiast własnej logiki.

**Link:** [Detect when elements overlap with CSS](https://ishadeed.com/article/css-detect-overlap/)

## Przestańcie traktować container queries jak media queries

**TLDR:** Mimo 94% wsparcia w przeglądarkach i 86% świadomości wśród developerów, tylko 41% faktycznie używa container queries, a sporo z tych, którzy ich używają, robi to tak, jakby to były media queries z inną składnią.

**Streszczenie:** Kluczowe rozróżnienie jest proste, ale łatwo je przeoczyć: media queries pytają o szerokość viewportu, container queries pytają o ilość miejsca dostępnego w konkretnym kontenerze. Karta w siatce zajmującej 300px na ekranie 1920px nadal dostaje style zaprojektowane dla szerokiego ekranu, bo media query nie wie nic o tym, ile faktycznie miejsca ma komponent. Autor proponuje myśleć o media queries jako o layoucie "makro" (nagłówki, stopki, główna siatka strony), a o container queries jako o layoucie "mikro" (karty, widgety, formularze, nawigacja), czyli o wszystkim, co powinno dopasować się do przydzielonej przestrzeni niezależnie od tego, czy trafia na telefon, czy do sidebaru na desktopie.

Tekst pokazuje też techniczne pułapki: kontener nie może odpytywać samego siebie (potrzebny jest dodatkowy wrapper), `container-type: size` bez jawnej wysokości kolapsuje do zera, bo przeglądarka liczy wymiary kontenera bez patrzenia na jego dzieci, a custom properties nie działają jako wartości w warunkach container query, bo mogłyby teoretycznie zmieniać same siebie w nieskończonej pętli. Jest też trik na wykrywanie zawijania flexboxa: rejestrując element flex jako kontener z `flex: 1 1 390px`, można wykryć moment, w którym element się rozciąga po zawinięciu, bez JavaScriptu i ResizeObservera.

**Kluczowe wnioski:**
- Media queries patrzą na viewport, container queries na realnie dostępną przestrzeń komponentu, i to nie to samo pytanie.
- Container nie może odpytywać samego siebie, potrzebny jest dodatkowy element-wrapper.
- `container-type: size` bez jawnej wysokości kolapsuje do zera, lepiej używać `inline-size`.
- Custom properties nie działają jako wartości w warunkach container query.

**Dlaczego mi na tym zależy:** Jeśli twój zespół ma 41% adopcji container queries jak reszta branży, to prawdopodobnie część z tych wdrożeń powiela błędy opisane w artykule. Warto przejrzeć istniejące `@container` w kodzie pod kątem tego, czy faktycznie reagują na kontekst komponentu, czy tylko udają media query z inną nazwą.

**Link:** [Stop Treating CSS Container Queries Like Traditional Media Queries](https://www.smashingmagazine.com/2026/09/stop-treating-css-container-queries-traditional-media-queries/)

## Transitions.dev ocenia i naprawia animacje w twoim kodzie

**TLDR:** Transitions.dev to biblioteka ponad 43 gotowych przejść UI plus narzędzie, które skanuje kodbazę, ocenia jakość animacji w skali 0-100 i otwiera pull requesty z poprawkami, działające lokalnie i deterministycznie, bez AI i bez konta.

**Streszczenie:** Pomysł jest prosty: zamiast ręcznie przeglądać każdy komponent pod kątem animacji, jedna komenda daje punktację całej kodbazy, a każde znalezisko jest zmapowane na konkretny gotowy przepis naprawczy. Drobne poprawki ("Polish") trzymają diff mały, większe przebudowy animacji ("Revamp") faktycznie przepisują ruch na właściwy wzorzec, ale nic nie ląduje bez twojej zgody. Dodatkowo GitHub Action może blokować merge, jeśli jakość animacji w danym PR-cie spada, czyli działa jak bramka jakości analogiczna do testów czy lintera, tylko dla ruchu w interfejsie.

**Kluczowe wnioski:**
- Narzędzie ocenia jakość animacji w kodbazie w skali 0-100, lokalnie i deterministycznie, bez wysyłania danych do AI.
- Każde znalezisko jest zmapowane na konkretny przepis naprawczy, nie tylko ogólny komunikat "popraw animację".
- Drobne poprawki trafiają jako małe diffy, większe przebudowy jako osobne, większe pull requesty.
- Opcjonalna bramka w CI blokuje merge przy spadku jakości animacji w PR-cie.

**Dlaczego mi na tym zależy:** Animacje w interfejsie są zwykle pierwszą ofiarą presji czasowej, bo nikt nie pisze testów na "czy to ładnie się porusza". Zautomatyzowana punktacja plus bramka w CI to sposób, żeby jakość ruchu przestała być czysto subiektywną oceną code reviewera i stała się mierzalnym atrybutem kodu, tak jak pokrycie testami czy wynik lintera.

**Link:** [Transitions.dev: UI transitions for AI agents](https://transitions.dev/)
