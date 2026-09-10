---
title: "Frontend Focus: nowości w HTML na 2026, koniec sporu o dark mode toggle, Chrome co dwa tygodnie i 20 lat jQuery"
excerpt: "Przegląd nowych elementów i atrybutów HTML z 2026 roku, finał wielkiego sporu o dark mode toggle, przejście Chrome na dwutygodniowy cykl wydań w erze AI, dwudziesta rocznica jQuery, ekonomia głównego wątku przeglądarki i animowanie CSS Grid dzięki Anchor Positioning."
publishedAt: "2026-09-10"
slug: "frontend-focus-html-2026-dark-mode-debate-chrome-jquery-20"
hashtags: "#frontendfocus #html #css #chrome #jquery #performance #generated #pl"
source_pattern: "Frontend Focus"
---

## Co nowego w HTML w połowie 2026 roku

**TLDR:** Przegląd elementów i atrybutów HTML, które pojawiły się w ostatnich latach, a łatwo mogły umknąć: elementy permisji jak `<geolocation>` i `<usermedia>`, stylowalny `<select>`, scoped element registries w Web Components, `<model>` do 3D bez JavaScriptu, atrybut `focusgroup` i `hidden="until-found"`.

**Summary:** Najciekawszy wątek dotyczy elementów permisji, które rozwiązują realny problem UX: gdy użytkownik raz odmówi dostępu do geolokalizacji czy kamery, cofnięcie tej decyzji wymaga grzebania w ustawieniach przeglądarki, których większość ludzi nie potrafi znaleźć. Nowe elementy jak `<geolocation>` i `<usermedia>` opakowują cały ten przepływ w widoczny, klikalny przycisk, który za każdym razem pyta o zgodę na nowo, a dane od Cisco cytowane w artykule pokazują, że skuteczność odzyskania zgody po wcześniejszej odmowie skoczyła z około 10% przy starych promptach do ponad 65% z nowym elementem. To progresywne wzmocnienie w najczystszej postaci: przeglądarki bez wsparcia po prostu widzą przycisk wewnątrz i działają jak dotychczas.

Drugi ciekawy blok to zmiany w Web Components: scoped element registries pozwalają mieć różne wersje tego samego nazwanego elementu w różnych częściach strony, co jest niszowe, ale rozwiązuje realny problem dużych design systemów z wieloma równolegle żyjącymi wersjami komponentów. Do tego dochodzi `focusgroup`, który zamienia ręcznie implementowany "roving tabindex" w deklaratywny atrybut, `hidden="until-found"` do ukrywania treści, która ma zostać znaleziona przez wyszukiwanie na stronie, oraz `sizes="auto"` przy `srcset`, który w końcu automatyzuje jeden z bardziej irytujących atrybutów w responsywnych obrazkach. Artykuł wspomina też o eksperymentalnym HTML-in-Canvas i persistent widgets, czyli iframe'ach przetrwających nawigację w obrębie tego samego originu, jako sygnałach, że HTML wciąż dostaje nowe możliwości, mimo że rozwija się wolniej niż CSS czy JavaScript.

**Key takeaways:**
- Elementy permisji (`<geolocation>`, `<usermedia>`) radykalnie poprawiają wskaźnik odzyskania zgody po wcześniejszej odmowie, dzięki widocznemu przyciskowi zamiast ukrytych ustawień przeglądarki.
- `focusgroup` zastępuje ręcznie implementowany roving tabindex jednym deklaratywnym atrybutem.
- `sizes="auto"` przy `srcset` automatyzuje dobór rozmiaru obrazka, o ile obrazek nie jest lazy-loaded w pierwszym viewport.

**Why do I care:** Elementy permisji są wprost odpowiedzią na klasyczny problem UX, z którym każdy frontendowiec się kiedyś zmagał, budując własny przycisk "włącz ponownie dostęp do kamery" na tonach JavaScriptu. Warto już teraz eksperymentować z nimi w projektach na Chrome, traktując je jako progresywne wzmocnienie, bo koszt wdrożenia jest niski, a zysk w retencji zgody użytkownika, jeśli dane od Cisco się potwierdzą szerzej, wydaje się realny.

**Link:** [New Things You Should Know About HTML Here in Mid 2026](https://blog.master.dev/new-things-you-should-know-about-html-here-in-mid-2026/)

## Finał sporu o dark mode toggle: może najlepszy jest żaden

**TLDR:** Lea Verou wraca do tematu przełączników trybu ciemnego po miesiącach dyskusji, jaka wywiązała się wokół jej wcześniejszego artykułu o dwustanowym przełączniku. Po publicznej polemice z Bramusem i rozmowie z kolegą po fachu, który nigdy nie widział takiego przełącznika, dochodzi do wniosku, że większość stron w ogóle nie powinna go mieć na stałe widocznym miejscu.

**Summary:** Punktem wyjścia był wcześniejszy artykuł Verou rekomendujący dwustanowy przełącznik (system kontra przeciwieństwo systemu) zamiast trójstanowego (system, jasny, ciemny), na który Bramus odpowiedział osobnym wpisem broniącym trójstanowego podejścia jako bardziej przejrzystego. Verou systematycznie rozkłada tę polemikę na czynniki pierwsze: scenariusz, w którym dwustanowy przełącznik rzekomo się psuje przy automatycznym przełączaniu systemu w zależności od pory dnia, w rzeczywistości działa poprawnie, bo jedno kliknięcie ustawia intencję raz, a nie za każdą sesję. Argument Bramusa, że deweloperzy częściej budują trójstanowe przełączniki, myli też preferencję dewelopera z użytecznością dla użytkownika, bo to, co łatwiej zaimplementować, rzadko pokrywa się z tym, co najlepiej odwzorowuje mentalny model użytkownika.

Prawdziwy zwrot w rozumowaniu Verou nastąpił, gdy wysłała artykuł koledze z tłem w HCI, który nigdy nie zetknął się z trwałym przełącznikiem trybu ciemnego, bo wszystkie takie przełączniki, jakie kiedykolwiek widziała, były na stronach skierowanych do deweloperów. Żadna popularna aplikacja konsumencka, Gmail, Facebook, Bluesky, nie umieszcza takiego przełącznika w stałym miejscu nagłówka, tylko chowa go w panelu ustawień. To skłania ją do wniosku, że cały spór o liczbę stanów przełącznika dotyczy w gruncie rzeczy problemu, który większość użytkowników w ogóle nie odczuwa jako problem, a społeczność deweloperska poświęciła mu nieproporcjonalnie dużo energii kreatywnej właśnie dlatego, że sama go odczuwa na co dzień.

**Key takeaways:**
- Dwustanowy przełącznik faktycznie obsługuje wszystkie trzy intencje użytkownika jednym kliknięciem, wbrew zarzutom, że psuje się przy automatycznym przełączaniu systemowym.
- Żadna popularna aplikacja konsumencka nie trzyma trwałego przełącznika trybu ciemnego w widocznym miejscu, tylko chowa go w ustawieniach.
- Rzadkie, tanie w naprawie przypadki brzegowe (jak reset preferencji po przełączeniu systemu) nie uzasadniają obciążania każdej interakcji dodatkowym stanem.

**Why do I care:** Zanim ktoś w zespole poświęci kolejny sprint na dopracowanie idealnego przełącznika trybu ciemnego, warto zadać sobie pytanie, które stawia Verou: czy w ogóle potrzebujecie trwałego przełącznika w nagłówku, czy wystarczy podążanie za ustawieniem systemowym i osobny panel ustawień dla rzadkiej mniejszości, która chce coś nadpisać na stałe. To dobry przykład na to, że czasem najlepszym rozwiązaniem UX jest w ogóle nie budować kontrolki, o której debata toczy się głównie między deweloperami.

**Link:** [The best dark mode toggle is probably none](https://lea.verou.me/blog/2026/dark-mode-toggles-2/)

## Chrome przechodzi na wydania co dwa tygodnie z powodu AI

**TLDR:** Chrome oficjalnie skrócił cykl wydawniczy z czterech do dwóch tygodni, zaczynając od Chrome 153 na desktopie, iOS i Androidzie. Google tłumaczy zmianę rosnącą liczbą łatek generowanych przez narzędzia AI oraz potrzebą szybszego domykania okna między znalezieniem podatności a jej załataniem u użytkowników.

**Summary:** Krótszy cykl wydawniczy ma dwa uzasadnienia bezpieczeństwa: po pierwsze, automatyczne narzędzia AI i zgłoszenia społeczności zwiększyły wolumen łatek do przetworzenia, więc krótszy cykl ułatwia zarządzanie tym strumieniem. Po drugie, szybciej poruszające się zagrożenia, częściowo też napędzane przez AI, wymagają skrócenia tak zwanego N-day patch gap, czyli okna między publicznym ujawnieniem podatności a dotarciem łatki do końcowego użytkownika. To bezpośrednia odpowiedź na sytuację, w której obie strony, atakujący i obrońcy, coraz częściej korzystają z tych samych narzędzi automatyzujących pracę.

Szybszy cykl wydań ma też drugi cel: pozwala Chrome szybciej wypuszczać nowe funkcje, co ma znaczenie w kontekście rosnącej konkurencji przeglądarek napędzanej przez rozwój wspomagany AI. Choć ChatGPT Atlas od OpenAI został zamknięty, na rynku wciąż przybywa alternatyw, Brave, Dia, Opera Neon, Comet od Perplexity czy przeglądarka DuckDuckGo, a Google eksperymentuje z coraz szybszym dodawaniem funkcji AI do samego Chrome. Mozilla, Microsoft i Brave już zaczęły przechodzić na podobny dwutygodniowy rytm, co pokazuje, że pozycja Chrome jako najpopularniejszej przeglądarki wciąż wyznacza standard dla całej branży.

**Key takeaways:**
- Chrome 153 to pierwsze wydanie w nowym, dwutygodniowym cyklu na desktopie, iOS i Androidzie.
- Krótszy cykl ma skrócić N-day patch gap, czyli okno między ujawnieniem podatności a dotarciem łatki do użytkowników.
- Mozilla, Microsoft i Brave już zaczynają przechodzić na podobny dwutygodniowy rytm wydań.

**Why do I care:** Dla większości zespołów frontendowych ta zmiana oznacza częstsze, ale mniejsze skoki wersji Chrome do testowania w macierzy kompatybilności, co w praktyce jest łatwiejsze do ogarnięcia niż rzadkie, duże skoki. Warto też pamiętać, że jeśli Mozilla, Microsoft i Brave podążą tym samym tropem, wasze pipeline'y do testów cross-browser powinny zacząć zakładać częstsze wydania jako nową normę, nie wyjątek.

**Link:** [Chrome is now shipping updates every 2 weeks as AI changes the security landscape](https://techcrunch.com/2026/09/08/chrome-is-now-shipping-updates-every-2-weeks-as-ai-changes-the-security-landscape/)

## Dwadzieścia lat jQuery: jak mała biblioteka przeprogramowała web development

**TLDR:** jQuery 1.0 wyszło dokładnie dwadzieścia lat temu, 26 sierpnia 2006 roku. Retrospektywa przypomina, jak `$()` zredukowało cały bałagan z `document.getElementById` i niekompatybilnością przeglądarek do kilku linijek działających wszędzie tak samo, i dlaczego biblioteka wciąż siedzi na około 66% wszystkich stron internetowych mimo dominacji frameworków deklaratywnych.

**Summary:** John Resig pokazał jQuery po raz pierwszy na BarCampNYC w styczniu 2006 roku z hasłem, które dziś brzmi jak manifest pokolenia: pisanie JavaScriptu powinno być przyjemne. Biblioteka zdemokratyzowała frontend, robiąc JavaScript przystępnym dla projektantów i programistów backendu, dla których surowy język był zniechęcający, a jak ujął to jeden z retrospektywnych tekstów, idea "pisz mniej, rób więcej" wpłynęła na każdy framework, który powstał później. Społeczność, jaka wyrosła wokół jQuery i jego ekosystemu wtyczek, stworzyła jedną wspólną przestrzeń dla programistów JS na długo przed tym, zanim standaryzacja przeglądarek i frameworki w ogóle stały się realną alternatywą.

Z czasem jQuery stało się synonimem stylu kodu, od którego branża chciała odejść, bo jego podejście, znajdź element, zmień klasę, znajdź kolejny element, jest z natury proceduralne, podczas gdy React czy Angular są deklaratywne: mówisz, do jakich danych należy dana część UI i jak ma wyglądać, a framework sam decyduje, kiedy to zaktualizować. Natywne API przeglądarek, `querySelectorAll`, `fetch`, `classList`, dziś pokrywają większość tego, po co kiedyś sięgano do jQuery, stąd strony w rodzaju "You Might Not Need jQuery". Mimo to W3Techs wciąż liczy bibliotekę na blisko 66% wszystkich stron, w dużej mierze dzięki WordPressowi, Drupalowi, Bootstrapowi i Cypressowi, a strumień tekstów w stylu "dlaczego wciąż jej używam" pokazuje, że część tej obecności bierze się ze świadomego wyboru do konkretnych zastosowań, nie tylko z długu technicznego.

**Key takeaways:**
- jQuery 1.0 wyszło 26 sierpnia 2006 roku, a jego motto "pisanie JavaScriptu powinno być przyjemne" ukształtowało całe pokolenie deweloperów.
- Mimo dominacji frameworków deklaratywnych, jQuery wciąż jest obecne na około 66% wszystkich stron internetowych, głównie przez WordPress, Drupal, Bootstrap i Cypress.
- Stare podatności w jQuery wciąż dominują w realnych bazach kodu właśnie dlatego, że biblioteka jest tak głęboko i cicho osadzona w wielu systemach.

**Why do I care:** Jeśli utrzymujecie starszy system oparty na jQuery, ten tekst to dobry przypomnienie, żeby sprawdzić, czy wasza wersja nie ciągnie za sobą znanych podatności, o których wspomina HeroDevs, zamiast zakładać, że "to tylko stara, stabilna biblioteka". Dla nowszych projektów wnioski są odwrotne: jeśli sięgacie po jQuery tylko po `querySelectorAll` i `fetch`, dziś macie te funkcje natywnie i prawdopodobnie nie potrzebujecie już zależności, po którą kiedyś trzeba było sięgnąć z konieczności.

**Link:** [Twenty Years of jQuery: How a Little Library Rewired Web Development](https://www.infoq.com/news/2026/09/jquery-20-years/)

## Główny wątek przeglądarki jest drogi, i co z tym zrobić

**TLDR:** Obszerny przewodnik po tym, dlaczego blokowanie głównego wątku przeglądarki jest realnym problemem wydajności, i jak radzić sobie z nim na dwa sposoby: mądrze dzielić czas głównego wątku (splitting, batching, prioritizing, deferring) albo w ogóle przenosić pracę poza niego (compositor thread, web workery).

**Summary:** Artykuł zaczyna od prostego rozróżnienia: główny wątek robi dwie rzeczy, wykonuje JavaScript i rysuje ekran, a obie stoją w jednej kolejce na tym samym wątku. Jeśli funkcja JavaScript blokuje wątek przez 200 milisekund, przez ten czas przeglądarka nie może przemalować ekranu ani odebrać kliknięcia, co przy budżecie klatki wynoszącym około 10 milisekund na 60Hz jest katastrofalnie długie. Autor rozkłada techniki radzenia sobie z tym na cztery ruchy działające w obrębie głównego wątku: dzielenie zbyt długich zadań na mniejsze kawałki z oddawaniem kontroli między nimi, grupowanie zdarzeń występujących zbyt często (debounce, throttle), ustalanie priorytetów, żeby pilna reakcja na kliknięcie użytkownika wyprzedzała pracę w tle, oraz odkładanie pracy, która nie musi wykonać się teraz, na przykład renderowanie postów spoza widocznego obszaru dzięki `IntersectionObserver`.

Druga część tekstu pokazuje, jak w ogóle nie używać głównego wątku: animacje oparte na `transform` i `opacity` trafiają bezpośrednio na wątek kompozytora, więc pozostają płynne nawet gdy główny wątek jest zablokowany, co tłumaczy, dlaczego animacje CSS potrafią działać płynnie, podczas gdy JavaScript zamraża interfejs. Technika FLIP (First, Last, Invert, Play) pozwala animować zmiany layoutu, jak przesuwanie się elementów listy po usunięciu jednego z nich, wykonując dokładnie jedno przeliczenie layoutu, a całą resztę ruchu oddając kompozytorowi przez `transform`. Dla naprawdę ciężkich obliczeń, jak parsowanie dużego payloadu czy przetwarzanie obrazów, rozwiązaniem są web workery, które działają na zupełnie osobnym wątku i komunikują się z głównym wątkiem tylko przez `postMessage`, najlepiej z transferem własności bufora zamiast kopiowania danych.

**Key takeaways:**
- Animacje oparte na `transform` i `opacity` trafiają na wątek kompozytora i pozostają płynne, nawet gdy główny wątek jest zablokowany.
- Technika FLIP pozwala animować zmiany layoutu jednym przeliczeniem, oddając resztę ruchu kompozytorowi.
- Web workery są opłacalne tylko wtedy, gdy koszt obliczeń przewyższa koszt komunikacji przez `postMessage`; dla lekkich zadań komunikacja bywa droższa niż samo obliczenie.

**Why do I care:** To solidne kompendium dla każdego, kto buduje interfejsy z dużym ruchem danych w czasie rzeczywistym, czat na żywo, dashboardy giełdowe, edytory obrazów, i regularnie trafia na tajemnicze zacinanie się interfejsu mimo "szybkiego" kodu. Warto zapamiętać zwłaszcza radę o preferowaniu `transform` nad `top`/`left` przy animacjach, bo to jedna z tych zmian, które kosztują minutę refaktoryzacji, a potrafią usunąć realny jank bez żadnej innej optymalizacji.

**Link:** [The Browser's Main Thread Is Expensive](https://kciter.so/posts/the-expensive-main-thread/en/)

## Animowanie siatki CSS Grid dzięki Anchor Positioning

**TLDR:** Bramus pokazuje, jak odtworzyć efekt animowanej, reorganizującej się siatki (podobnej do New Tab Page przeglądarki Brave) za pomocą CSS Anchor Positioning i zwykłych przejść CSS, bez View Transitions i bez ani jednej linijki JavaScriptu.

**Summary:** Sztuczka polega na tym, żeby zakotwiczyć zawartość komórki siatki do samej komórki, choć komórki gridowe są konceptem wirtualnym i nie da się zakotwiczyć do nich bezpośrednio, więc trzeba dołożyć dodatkowy wewnętrzny div pełniący rolę kotwicy, zajmujący dostępną przestrzeń komórki. `anchor-scope` ogranicza nazwę kotwicy do poddrzewa konkretnej komórki, dzięki czemu każda komórka może bezpiecznie używać tego samego identyfikatora bez kolizji z innymi. Zwykła własność `transition` na `inset` odpowiada za płynne przejście wartości, a jawnie zadana szerokość i wysokość elementu z zawartością zapobiega jego rozciąganiu się w trakcie interpolacji.

Największą przewagą tego podejścia nad View Transitions jest to, że animacje są w pełni przerywalne: jeśli szybko zmienisz rozmiar okna kilka razy z rzędu, kafelki nie czekają w kolejce na dokończenie poprzedniej animacji, tylko natychmiast przekierowują się w locie w stronę nowo obliczonej pozycji. Jest jedno istotne ograniczenie: technika nie działa jeszcze w Firefoksie, bo przeglądarka ta nie wykonuje przeplotu obliczania stylu i layoutu dla Anchor Positioning w sposób pozwalający na interpolowanie wartości pikselowych.

**Key takeaways:**
- Technika wymaga dodatkowego diva jako kotwicy wewnątrz każdej komórki gridu, bo same komórki gridowe są konceptem wirtualnym.
- `anchor-scope` pozwala każdej komórce bezpiecznie reużywać tej samej nazwy kotwicy bez kolizji.
- Animacje oparte na Anchor Positioning są w pełni przerywalne, w przeciwieństwie do View Transitions, ale na razie nie działają w Firefoksie.

**Why do I care:** To konkretna, gotowa do skopiowania technika dla każdego, kto próbował animować reorganizujący się grid bez JavaScriptu i trafiał na ścianę, bo komórki gridowe nie są elementami, do których da się cokolwiek podpiąć bezpośrednio. Warto potraktować ją jako kolejny dowód na to, że Anchor Positioning wykracza daleko poza pierwotny przypadek użycia z tooltipami i dropdownami, o czym warto pamiętać przy najbliższym projekcie z dynamicznym layoutem.

**Link:** [Animating CSS Grid Layouts with CSS Anchor Positioning](https://www.bram.us/2026/09/07/animating-css-grid-layouts-with-css-anchor-positioning/)
