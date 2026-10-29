---
title: "HTML-in-Canvas w Chrome 157, CSS-Tricks znów niezależne, budżety wydajności i drukowalne strony"
excerpt: "Frontend Focus #764: interaktywny DOM w canvasie, nowy właściciel CSS-Tricks, reprezentatywny najgorszy przypadek w budżetach wydajności i bezpieczny podgląd HTML od AI."
publishedAt: "2026-10-29"
slug: "frontend-focus-html-in-canvas-css-tricks-budzety-wydajnosci-druk"
hashtags: "#frontendfocus #css #html #frontend #performance #accessibility #security #ai #generated #pl"
source_pattern: "Frontend Focus"
---

## HTML-in-Canvas w Chrome 157

**TLDR:** Po udanym origin trialu Chrome 157 wydaje stabilne API, które pozwala rysować interaktywny, dostępny DOM wewnątrz canvasa 2D, WebGL i WebGPU.

**Summary:** Do tej pory ambitny interfejs oparty na canvasie zmuszał do wyboru. Można było rysować tekst jako piksele, co psuje dostępność, wyszukiwanie na stronie, kopiowanie, tłumaczenie i autouzupełnianie. Można też było kłaść elementy HTML na wierzch canvasa i ręcznie przeliczać ich pozycję w każdej klatce, co dawało drgania i obciążało główny wątek. Osadzenie HTML w scenie 3D, na przykład za szklanym obiektem, było praktycznie niemożliwe.

Nowe API zmienia to tak, że canvas dostaje atrybut oznaczający, że zawiera elementy do narysowania, a dzieci oznacza się jako rysowalne. W kontekście 2D wywołuje się funkcję rysującą obraz elementu, a przeglądarka sama dba o synchronizację pozycji. W WebGL i WebGPU trzeba przekazać macierz transformacji. Treść w canvasie zachowuje zaznaczanie tekstu, menu kontekstowe, drzewo dostępności, tłumaczenie, rozszerzenia przeglądarki i DevTools. Indeksować ją mogą też roboty i agenci AI.

Three.js ma eksperymentalną teksturę HTML, PlayCanvas, Babylon.js i PixiJS od wersji 8.19 mają własne wsparcie. Na starsze przeglądarki jest wykrywanie funkcji i zapasowe rozwiązania w rodzaju html2canvas.

**Key takeaways:**
- Stabilne API w Chrome 157, z obsługą 2D, WebGL i WebGPU.
- Dostępność, wyszukiwanie i tłumaczenie działają bez dodatkowej pracy.
- Potrzebne są wykrywanie funkcji i plan awaryjny dla innych przeglądarek.

**Why do I care:** To jedno z niewielu API, które naprawdę rozwiązuje problem dostępności w aplikacjach opartych na canvasie, w stylu edytorów graficznych. Artykuł Chrome naturalnie milczy o tym, kiedy Safari i Firefox to dostaną, a od tego zależy, czy zaryzykujesz to w produkcie, czy zostaniesz przy bibliotekach z kodem zapasowym.

**Link:** [HTML-in-Canvas in Chrome 157](https://developer.chrome.com/blog/html-in-canvas)

## CSS-Tricks znów jest niezależne

**TLDR:** Po czterech latach pod DigitalOcean serwis przejmuje redaktor Geoff Graham, który zapowiada kurs HTML i CSS dla początkujących, wracający newsletter i mniej artykułów.

**Summary:** DigitalOcean kupił CSS-Tricks od Chrisa Coyiera w 2022 roku. Teraz Geoff Graham, po dwunastu latach pracy przy tej stronie, przejmuje ją na własność i robi z tego swoją pełnoetatową pracę. Finansowanie ma pochodzić z reklam i sponsoringu, członkostwa z kanałem na Discordzie, sklepu i planowanego kursu.

Redakcja ma publikować jeden lub dwa teksty tygodniowo, a formularz dla gości wraca. Graham chce raczej dawać głos autorom niż pisać sam, i od razu zastrzega, że spamu generowanego przez AI nie przyjmie. Zapowiada też więcej wejść dla początkujących, bo uważa, że zbliża się luka w umiejętnościach, a kursy frontendowe tracą popularność.

**Key takeaways:**
- Serwis jest niezależny, a Graham zajmuje się nim pełnoetatowo.
- Wracają newsletter i formularz dla gości, a częstotliwość publikacji spada.
- Plan zakłada kurs dla początkujących i członkostwo.

**Why do I care:** Dla nas to przede wszystkim ciekawostka z rynku treści technicznych. Model finansowania z reklam i kursów w dobie odpowiedzi od AI jest ryzykowny i autor sam to przyznaje. Warto jednak wesprzeć jedno z niewielu miejsc, które wciąż uczy CSS na przykładach, a nie na streszczeniach.

**Link:** [CSS-Tricks has a new owner!](https://css-tricks.com/css-tricks-has-a-new-owner/)

## Budżety wydajności potrzebują reprezentatywnego najgorszego przypadku

**TLDR:** Harry Roberts poprawia własną dawną radę. Budżet ustawiony na podstawie jednego najgorszego wyniku pozwala pojedynczemu odstającemu pomiarowi ukryć prawdziwe regresje.

**Summary:** Zamiast brać absolutnie najgorszy wynik, Harry proponuje zacząć od percentyla 90 albo 95 z ostatnich danych. Wtedy budżet odzwierciedla to, co użytkownicy naprawdę dostają w gorszych dniach, a nie jednorazowy wyskok. Do wpisu dołączył szablon arkusza.

**Key takeaways:**
- Percentyl 90 lub 95 jest lepszym punktem startu niż jedno maksimum.
- Odstające pomiary maskują prawdziwe regresje.

**Why do I care:** Prosta zmiana, którą można wdrożyć w CI od ręki. Warto jednak pamiętać, że percentyle wymagają odpowiedniej liczby pomiarów, a na małym ruchu P95 potrafi być tak samo szumem.

**Link:** [Performance Budgets Need a Representative Worst](https://frontendfoc.us/issues/764)

## Bezpieczny podgląd HTML generowanego przez AI

**TLDR:** Keshav Malik buduje pięć demonstracji ataków na podgląd HTML zwróconego przez model, a potem utwardza go sandboxem iframe, CSP i sprawdzaniem postMessage.

**Summary:** Każda aplikacja, która pokazuje UI wygenerowane przez model, musi gdzieś to HTML wyrenderować. Autor pokazuje, jak taki podgląd można zaatakować, a następnie dodaje warstwy ochrony. Najważniejsze są piaskownica w iframe, polityka bezpieczeństwa treści i dokładnie sprawdzana obsługa komunikatów postMessage.

**Key takeaways:**
- Wyrenderowanie HTML z modelu to wektor ataku jak każdy inny.
- Sandbox, CSP i walidacja postMessage działają dopiero razem.

**Why do I care:** Jeśli twój produkt pokazuje cokolwiek, co napisał model, traktuj to jak niezaufane dane użytkownika. Wiele zespołów zatrzymuje się na iframe z sandboxem i uznaje temat za zamknięty.

**Link:** [Building an Isolated Preview for AI-Generated HTML](https://blog.master.dev/building-an-isolated-preview-for-ai-generated-html/)

## Strony powinny dać się wydrukować

**TLDR:** Autor wydrukował własną stronę, nie spodobał mu się wynik i poprawił arkusz stylów druku. Ukrył nagłówek, ustawił 12 punktów i czarne linki.

**Summary:** Tekst był za duży o dwa poziomy, nagłówek wyglądał źle, a niebieskie linki w skali szarości robiły się blade. Autor dodał klasy ukrywające i pokazujące elementy tylko w druku oraz stałe rozmiary w punktach. Przyznaje, że bloki kodu wciąż wyglądają najgorzej, bo nie chcą się łamać na granicy stron. Po opublikowaniu dostał uwagi z HN i Lobsters i uprościł arkusz.

**Key takeaways:**
- Rozmiary w punktach i czarne linki to minimum dla druku.
- Bloki kodu nadal sprawiają kłopot na granicy stron.

**Why do I care:** Nie zrobisz z tego strategii produktu, ale wydruk i zapis do PDF to realny przypadek w aplikacjach B2B, na przykład dla faktur i raportów. Pół godziny pracy nad stylami druku często wystarcza.

**Link:** [Websites Should Be Printable](https://brennenputh.me/blog/printable-websites/)

## Krótko z numeru

Firefox 159 włącza domyślnie animacje sterowane przewijaniem, więc działają już we wszystkich głównych silnikach, i dodaje zakresowe rejestry elementów niestandardowych. Od Chrome 155 działa API Digital Credentials do wystawiania poświadczeń do portfela w telefonie. W3C uruchomiło pilotaż polyfilla dla WebMCP, które udostępnia funkcje aplikacji jako narzędzia dla agentów. Przeglądarka Arc zostanie wygaszona w grudniu, a w jej miejsce proponuje się Dia lub Zen. Safari 27.2 dodało pseudoelement ::field-content do stylowania wyświetlanego tekstu w dostosowywalnym selekcie.
