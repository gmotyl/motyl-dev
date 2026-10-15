---
title: "Frontend Focus: ikony w CSS, iPhone Duo, WebP, scroll-triggered animations i Bootstrap 6 Alpha"
excerpt: "Lea Verou przenosi ikony do CSS, Video.js testuje API składanych ekranów, a Bootstrap 6 zrywa ze starymi przeglądarkami."
publishedAt: "2026-10-15"
slug: "frontend-focus-ikony-css-iphone-duo-webp-scroll-triggered-bootstrap-6"
hashtags: "#frontendfocus #css #html #frontend #animation #performance #generated #pl"
source_pattern: "Frontend Focus"
---

## Najlepszy sposób na ikony w interfejsach webowych

**TLDR:** Lea Verou proponuje trzymać ikony jako zmienne CSS (design tokeny) i wstawiać je przez pseudoelementy z maską, bez ani jednego znacznika SVG w HTML.

**Summary:** Autorka krytykuje dominujące podejście, czyli inline SVG, bo wymusza dużo boilerplate'u i prowadzi do komponentów-opakowań. Fonty ikon miały zalety CSS-a, ale wady: rozmiar, glify zastępcze, odczyt kodów przez czytniki ekranu i nadpisywanie fontów przez użytkownika.

Jej system opiera się na zmiennych typu --icon-trash trzymających obrazy w :root. Konkretna ikona jest wybierana właściwością --icon, --icon-start lub --icon-end, a pseudoelement maluje kwadrat 1em z kolorem currentColor, przycięty maską. Dzięki temu ikonę można zmieniać selektorem, stanem hover, media query, trybem ciemnym, drukiem czy container query, a także ustawiać na ::marker. Style query ogranicza wstawianie do elementów, które faktycznie mają ustawioną właściwość, a rejestracja przez @property jako niedziedziczona zapobiega ikonom na każdym potomku. Style query są dziś obsługiwane przez około 93 procent przeglądarek, a Firefox dołączył w maju 2026.

Największy ból to błędy WebKit: ikony nie pojawiały się w Safari do pierwszej interakcji, a niedziedziczone właściwości z inherit zachowywały się niepewnie. Autorka zgłosiła trzy raporty i podaje obejścia: zerowej długości animację na pseudoelementach oraz rejestrację jako dziedziczonej z resetem w style query, ładowane tylko dla WebKit. System działa tylko dla ikon jednokolorowych. Na przyszłość czekają CSS Linked Parameters, ident(), rozszerzone attr() i @mixin. Pakiet @nudeui/icons zawiera ten system bez samych ikon.

**Key takeaways:**
- Ikony jako design tokeny dają spójność i kontrolę z poziomu CSS.
- Safari wymaga obejść dla trzech błędów WebKit.
- Wielokolorowe ikony i animacje nadal wymagają inline SVG.

**Why do I care:** Dla design systemów to ciekawa alternatywa dla komponentów typu TrashIcon, z mniejszym DOM-em. Cena to zależność od świeżych funkcji CSS i sniffingu WebKit, więc zespół musi zdecydować, ile progresywnego ulepszania zaakceptuje.

**Link:** [The best way to use icons in Web UIs](https://lea.verou.me/blog/2026/icons/)

## Co iPhone Duo oznacza dla web developmentu

**TLDR:** Zespół Video.js sprawdził w symulatorze, jakie API dostaną strony na składanym iPhone Duo: Device Posture i Viewport Segments. Efekt przypominający odtwarzacz Netflixa wymaga włączenia flagi Fullscreen API.

**Summary:** Device Posture API informuje, czy ekran jest ciągły, czy złożony, przez navigator.devicePosture albo media query device-posture. Viewport Segments API zwraca w JavaScripcie tablicę prostokątów segmentów, a w CSS dostępne są media query dla liczby segmentów i zmienne env z położeniem i wymiarami.

Autor odtworzył układ z wideo w górnej połowie i kontrolkami w dolnej oraz efekt odbicia obrazu, kopiując klatki na mały canvas, odwracając, rozmywając i wygaszając. Wymagało to jednak włączenia flagi Fullscreen API, której Apple prawdopodobnie nie włączy domyślnie. Na emulatorze Pixela Fold z Chromium 157 treść pełnoekranowa jest celowo przycinana do górnej połowy. Autor zauważa też, że część reguł z env() zachowywała się niezgodnie z oczekiwaniami.

**Key takeaways:**
- Posture i Viewport Segments to rzeczywiste narzędzia dla składanych urządzeń.
- Bez pełnego ekranu własne kontrolki wideo nie zadziałają na iOS.
- Chromium przycina pełny ekran do górnego segmentu.

**Why do I care:** Dopóki platformy nie ujednolicą pełnego ekranu, układy "dwupanelowe" warto robić tylko dla treści, nie dla odtwarzaczy. To na razie ciekawostka, ale dobrze znać nazwy API, zanim klient zapyta o składane telefony.

**Link:** [What the iPhone Duo means for web development (and Video.js)](https://videojs.org/blog/iphone-duo-web-development)

## Jednak używam WebP

**TLDR:** Autor po latach używania JPEG i PNG przechodzi na WebP, bo nowe narzędzia ułatwiają format, a pliki wychodzą mniejsze.

**Summary:** WebP zadebiutował w 2010, a pełne wsparcie przeglądarek rozłożyło się na lata, od Chrome w 2011 do Safari w 2020. Narzędzia były słabe, a Lighthouse nachalnie podpowiadał konwersję. Po przesiadce z Photoshopa na Pixelmator Pro autor stwierdził, że WebP wychodzi mniejszy przy tej samej jakości i jeszcze nie trafił na przypadek odwrotny. Interesują go AVIF i JPEG XL, a Google ogłosiło ostatnio wsparcie dla JPEG XL, po tym jak wcześniej je porzucił.

**Key takeaways:**
- WebP jest dziś bezpiecznym wyborem pod względem wsparcia.
- AVIF ma wsparcie w przeglądarkach, a JPEG XL może dołączyć.
- Problemem były narzędzia, nie format.

**Why do I care:** Wniosek jest prosty, ale tekst opiera się na anegdocie jednego autora. Zanim przestawisz pipeline, zmierz na własnych zdjęciach, bo przy małych ikonach i grafikach wektorowych SVG nadal wygrywa.

**Link:** [I guess I'm using WebP now?](https://anderegg.ca/2026/10/08/i-guess-im-using-webp-now)

## Scroll-triggered animations dla scrollytellingu

**TLDR:** CSS Animation Triggers pozwalają, by pozycja przewijania tylko uruchamiała zwykłą animację czasową, zamiast ją "scrubować". Działa w Chromium od wersji 146 i jest kandydatem do Interop 2027.

**Summary:** Autor rozróżnia scroll-driven, gdzie postęp animacji zależy od przewinięcia, od scroll-triggered, gdzie przewinięcie jedynie startuje animację o własnym czasie i krzywej. Do tego służą właściwości timeline-trigger i animation-trigger. Pierwsza definiuje nazwany wyzwalacz z zakresem aktywacji, druga mówi animowanemu elementowi, jaką akcję wykonać po wejściu i wyjściu: play-forwards, play-backwards, play-once, pause, reset lub none. Spec planuje zmianę nazw na activation i deactivation, bo wyzwalacze będą też obsługiwać zdarzenia wskaźnika.

Pięć demo obejmuje odsłanianie nagłówka, karty z kaskadą opóźnień liczonych przez sibling-index(), animację fontu zmiennego z play-once, cytat łączący oba typy animacji oraz poziomy karuzelowy pokaz rysowania SVG. Autor podkreśla dostępność: aria-label na nagłówku, aria-hidden na pociętych spanach i wyłączanie animacji przy prefers-reduced-motion. Radzi też owijać animacje w @supports, żeby treść była widoczna w przeglądarkach bez wsparcia.

**Key takeaways:**
- Trigger startuje animację, driven ją steruje.
- sibling-index() i typowane attr() skracają boilerplate.
- Domyślnie treść musi być widoczna bez wsparcia.

**Why do I care:** To realna alternatywa dla IntersectionObserver i klasy is-visible, więc warto ją mieć w głowie przy kolejnym landingu. Wsparcie jest na razie tylko w Chromium, więc produkcyjnie tylko z @supports.

**Link:** [Scroll-triggered animation as the missing piece for scrollytelling on the web](https://utilitybend.com/blog/scroll-triggered-animation-as-the-missing-piece-for-scrollytelling-on-the-web)

## Odciski palców to nowe ciasteczka

**TLDR:** Esej tłumaczy, jak działa fingerprinting przeglądarki i dlaczego rozszerzenia prywatności mogą paradoksalnie czynić Cię bardziej unikalnym.

**Summary:** Autor opisuje historię prób wycofania ciasteczek zewnętrznych przez Google i konkluduje, że ostatecznie reklamodawcy dostali fingerprinting. Odcisk składa się z danych sieciowych, kruchych lub generycznych, oraz stabilnych pomiarów sprzętu i oprogramowania: GPU, procesor, pamięć, ekran, przetwarzanie dźwięku, fonty. Nie musi być globalnie unikalny, wystarczy, że wyróżnia w próbie.

Strona pokazuje działający przykład z OfflineAudioContext, WebGL, canvasem, Intl, navigator i skrótem SHA-256, z którego powstaje pseudonim. Wyjaśnienie entropii informacyjnej na przykładzie Akinatora tłumaczy, dlaczego kilka niezależnych cech szybko zawęża pulę. Obrona: Brave dodaje szum, a Tor i Mullvad ujednolicają wygląd wszystkich użytkowników. Test można zrobić na coveryourtracks.eff.org.

**Key takeaways:**
- Pomiary sprzętu działają bez żadnych pytań o zgodę.
- Rozszerzenia mogą zwiększać unikalność.
- Skuteczna ochrona musi być w silniku przeglądarki.

**Why do I care:** Dla frontendowca to argument, żeby nie dodawać skryptów, które kolekcjonują sygnały bez potrzeby. Retoryka eseju jest silnie nacechowana, a część twierdzeń o Chrome jest uproszczona, więc nie traktuj jej jak audytu.

**Link:** [Fingerprints are the new cookies](https://royfish.dev/fingerprints-are-the-new-cookies)

## Bootstrap 6 Alpha

**TLDR:** Pierwsza alfa Bootstrapa 6 wymaga Chrome 130, Firefoksa 132 i Safari 18, przechodzi na moduły Sass i tokeny CSS oraz zmienia infiksy na prefiksy.

**Summary:** Wersja 6 wykorzystuje @use i @forward, a niemal wszystkie dawne zmienne Sass są teraz zmiennymi CSS w mapach tokenów, więc można je zmieniać w runtime. Prefiks pojawia się dopiero w PostCSS. Klasy responsywne zmieniają kolejność, np. .d-md-none to teraz .md:d-none, co przypomina Tailwind. JavaScript jest wyłącznie ESM i w TypeScripcie, bez bundla UMD i globalnego window.bootstrap. Z funkcji CSS używane są warstwy, oklch, color-mix, light-dark, zapytania kontenerowe i natywne dialog oraz details. Narzędzia zmieniono na Rolldown, a testy na Vitest w prawdziwym Chromium. Dokumentacja ma llms.txt i pliki skills dla agentów. Bootstrap 5 pozostaje wspierany.

**Key takeaways:**
- Wyższy próg przeglądarek oznacza brak polyfilli.
- Migracja wymaga zmiany nazw klas i przejścia na ESM.
- Dodano dokumentację i skille dla agentów.

**Why do I care:** Dla projektów utrzymujących Bootstrap 5 to sygnał, że migracja będzie dużą, mechaniczną zmianą klas. Alfa nie nadaje się jeszcze na produkcję, ale prefiksy i tokeny już teraz pokazują, że różnica względem Tailwinda się zmniejsza.

**Link:** [Bootstrap 6 Alpha](https://blog.getbootstrap.com/2026/10/08/bootstrap-6-alpha/)
