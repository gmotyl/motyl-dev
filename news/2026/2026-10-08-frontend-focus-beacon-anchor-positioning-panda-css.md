---
title: "Frontend Focus: BEACON od Cloudflare, anchor positioning kasuje JS do tooltipów, i dlaczego warto się nauczyć CSS zamiast React"
excerpt: "Czternaście tematów z Frontend Focus: publiczny zbiór danych o wydajności całego webu, nowy mechanizm CSS do pozycjonowania tooltipów bez JavaScriptu, Panda CSS 2.0 przepisane w Rust, i prowokacyjny manifest o tym, czego uczyć się na przyszłość."
publishedAt: "2026-10-08"
slug: "frontend-focus-beacon-anchor-positioning-panda-css"
hashtags: "#frontendfocus #css #performance #accessibility #webdev #generated #pl"
source_pattern: "Frontend Focus"
---

## BEACON: Cloudflare publikuje miliardy pomiarów wydajności realnych użytkowników

**TLDR:** Cloudflare otworzył BEACON, anonimizowany zbiór danych z miliardów pomiarów Core Web Vitals z 10 tysięcy największych stron w sieci, aktualizowany codziennie w BigQuery, pokazujący między innymi że soft navigations w SPA renderują się dwa do trzech razy szybciej niż twarde przejścia, ale nie eliminują kosztu ciężkiej strony lądowania.

**Summary:** Zespół Cloudflare argumentuje, że większość ludzi budujących oprogramowanie testuje je na mocnym laptopie i szybkim Wi-Fi, co jest dalekie od realiów użytkowników na czteroletnim budżetowym telefonie, z planem danych dławionym po 2 GB, albo w tym kącie siłowni, gdzie Wi-Fi nigdy nie działa. BEACON ma zamknąć tę lukę percepcji, udostępniając pełne histogramy LCP, CLS i INP zamiast pojedynczej wartości P75, co pozwala zbadać długi ogon rozkładu i zobaczyć, gdzie branża wciąż nie dowozi szybkich doświadczeń wszystkim.

Dane pokazują zaskakujące różnice regionalne: w 46 krajach, gdzie WebKit stanowi ponad 10 procent ruchu, jego LCP lub INP są co najmniej 10 procent gorsze niż w przeglądarkach opartych na Blink, a w Kambodży, gdzie WebKit odpowiada za 17,5 procent odsłon, jego LCP jest o 50 procent gorsze niż Blinka. Branżowo najlepiej wypadają strony rządowe, zdrowotne i oznaczone jako bezpieczne dla dzieci, najgorzej reklamy, religia i pogoda. Rozbicie LCP na podetapy pokazuje coś przeciwintuicyjnego: dla większości stron przekraczających próg "dobry" największym kosztem nie jest pobranie samego zasobu, tylko opóźnienie w wykryciu kandydata LCP i odblokowanie jego renderowania, a nie przepustowość sieci.

Najciekawszy dla architektów frontendowych jest fragment o soft navigations, czyli przejściach po stronie klienta typowych dla SPA zbudowanych w React, Vue, Angular czy Svelte. Dzięki nowemu wsparciu dla Chrome Soft Navigations API dane pokazują, że soft navigations renderują się dwa do trzech razy szybciej niż twarde przejścia na każdym percentylu, ale nie znoszą kosztu pierwszej, cięższej strony lądowania. Dla zespołów wybierających architekturę SPA oznacza to konkretny kompromis do rozważenia: szybsze kolejne nawigacje muszą zrekompensować wolniejsze pierwsze doświadczenie, a jeśli użytkownicy rzadko wychodzą poza stronę lądowania, cięższy pierwszy load może się nigdy nie zwrócić.

**Key takeaways:**
- BEACON udostępnia pełne histogramy Core Web Vitals z 10 tysięcy największych stron, aktualizowane codziennie w Google BigQuery, zamiast pojedynczej wartości P75.
- Dla większości stron przekraczających próg "dobry" LCP głównym kosztem jest opóźnienie wykrycia kandydata LCP i zablokowane renderowanie, nie przepustowość sieci do pobrania zasobu.
- Soft navigations w SPA renderują się dwa do trzech razy szybciej niż twarde przejścia na każdym percentylu, ale nie eliminują kosztu cięższej strony lądowania.
- WebKit wypada gorzej niż przeglądarki oparte na Blink w 46 krajach, z różnicą LCP sięgającą 50 procent w Kambodży.

**Why do I care:** Jeśli projektujesz architekturę SPA i zakładasz, że szybsze kolejne nawigacje automatycznie usprawiedliwiają cięższy pierwszy load, dane z BEACON dają konkretne liczby do podparcia albo obalenia tego założenia dla Twojego profilu użytkowników. To też pierwszy publicznie dostępny zbiór danych tej skali, więc warto go trzymać pod ręką przy następnej dyskusji o tym, czy inwestować w optymalizację LCP czy INP, zamiast opierać decyzję na intuicji.

**Link:** [How fast is the web? Explore billions of real-user measurements with BEACON](https://blog.cloudflare.com/how-fast-is-the-web/)

## Chrome 155: post-kwantowa kryptografia w WebCrypto i CSS symbols()

**TLDR:** Chrome 155 dodaje algorytmy post-kwantowe do Web Cryptography API, funkcję CSS symbols() do definiowania stylów liczników inline, oraz właściwość margin-trim pozwalającą pomijać marginesy na brzegach kontenera bez hacków CSS.

**Summary:** Najważniejsza zmiana bezpieczeństwa to dodanie algorytmów odpornych na komputery kwantowe do WebCrypto: ML-KEM w wariantach 768 i 1024, ML-DSA w wariantach 44, 65 i 87, ChaCha20-Poly1305 oraz X-Wing, wszystkie standaryzowane przez NIST, co daje deweloperom dostęp do implementacji dostarczanych bezpośrednio przez przeglądarkę. Dla CSS funkcja symbols() pozwala zdefiniować anonimowy styl licznika inline, bez deklarowania nazwanej reguły @counter-style, przyjmując listę symboli tekstowych i opcjonalny system liczenia. Nowa właściwość margin-trim pozwala pomijać marginesy przed lub po pierwszym i ostatnim dziecku kontenera, działając na zwykłych kontenerach blokowych i multicol, co jest potężniejszą i bardziej uniwersalną wersją dotychczasowego hacka z marginesami w trybie quirks.

Z innych zmian warto odnotować nowe uprawnienia okienkowania: aplikacje webowe z uprawnieniem window-management mogą teraz maksymalizować, minimalizować i przywracać swoje okna oraz blokować zmianę rozmiaru, a nowe media features display-state i resizable pozwalają skryptom i stylom reagować na stan okna, co ma poprawić użyteczność okien VDI w klientach webowych. Pojawia się też wsparcie dla wydawania poświadczeń cyfrowych bezpośrednio do portfela mobilnego użytkownika, co ma znaczenie dla instytucji takich jak uczelnie, urzędy czy banki chcące bezpiecznie dostarczać dokumenty cyfrowe.

**Key takeaways:**
- WebCrypto dostaje natywne implementacje algorytmów post-kwantowych ML-KEM i ML-DSA standaryzowanych przez NIST, bez potrzeby polyfillowania ich w JavaScript.
- CSS symbols() pozwala zdefiniować styl licznika inline bez osobnej reguły @counter-style, przydatne dla jednorazowych, niestandardowych liczników.
- margin-trim usuwa marginesy na brzegach kontenera deklaratywnie, zastępując hacki w stylu "usuń margin-top u pierwszego dziecka".
- Nowe uprawnienia okienkowania i media features display-state oraz resizable mają poprawić użyteczność aplikacji webowych działających jako klienty VDI.

**Why do I care:** Post-kwantowa kryptografia w przeglądarce brzmi na razie egzotycznie, ale jeśli pracujesz nad czymkolwiek wymagającym długoterminowego bezpieczeństwa danych, warto wiedzieć, że te algorytmy są już dostępne natywnie, zamiast czekać na polyfill czy bibliotekę trzecią. margin-trim to z kolei małe, ale realne usprawnienie, które pozwoli Ci wywalić kilka linijek CSS-owego boilerplate'u z każdego komponentu listy czy karty.

**Link:** [Chrome 155 Release Notes](https://chromestatus.com/release-notes/155)

## Example.com dostało największy redesign od dekad, i IANA tłumaczy dlaczego

**TLDR:** Zarezerwowana domena example.com, używana od niemal 30 lat jako placeholder w dokumentacji, zyskała 28 września 2026 roku wielojęzyczną treść zmieniającą się co 5 sekund z animacją opacity, a VP IANA osobiście wytłumaczył autorowi jednego z artykułów, że zmiana ma zmniejszyć zużycie przepustowości, bo większość ruchu na stronę jest zautomatyzowana i nie pobiera dodatkowego pliku JavaScript z pełną treścią.

**Summary:** Example.com to domena zarezerwowana przez IANA do celów dokumentacyjnych od 1999 roku, i aż do 28 września 2026 roku była statyczną, anglojęzyczną stroną. Redesign wprowadził wielojęzyczne wyjaśnienie celu domeny po angielsku, arabsku, chińsku, francusku, rosyjsku i hiszpańsku, zmieniające się co 5 sekund, z efektem przejścia, w którym każdy znak jest owinięty w osobny element span z nieznacznie większym opóźnieniem transition niż poprzedni, co daje efekt animacji znak po znaku bez żadnej biblioteki JavaScript, tylko czystym CSS transition: opacity .4s. 3 października 2026 roku animację usunięto, pokazując wszystkie języki od razu.

Kim Davies, VP IANA, odpowiedział osobiście na pytanie autora jednego z artykułów i wyjaśnił logikę zmiany: strona dzieli teraz treść na podstawową wersję HTML i osobny plik JavaScript z dodatkową zawartością, a ponieważ większość ruchu na stronę jest zautomatyzowana, ten ruch zwykle nie pobiera pliku JavaScript, co zmniejsza ogólne zapotrzebowanie na dane. Davies podkreślił też, że domena nie jest przeznaczona do testowania dostępności czy monitoringu, mimo że deweloperzy chętnie jej do tego używają, bo łatwo wkleić przykładową konfigurację z example.com i zapomnieć ją podmienić na docelowy adres.

Historia domeny, udokumentowana przez DebugBear na podstawie Wayback Machine, pokazuje, że zmiany happens sporadycznie: od tabelkowego układu z 2002 roku, przez migrację na CDN EdgeCast w 2013 roku razem z pierwszym poważnym redesignem karty, aż po migrację na Cloudflare w grudniu 2025 roku. 9 czerwca 2026 roku dodano pusty favicon przez data URI, żeby uniknąć zbędnych requestów o /favicon.ico, co samo w sobie jest ciekawym mikrooptymalizacyjnym trikiem, jeśli Twoja strona generuje realny ruch zautomatyzowany.

**Key takeaways:**
- Przyczyną redesignu example.com była chęć zmniejszenia zużycia przepustowości, bo zautomatyzowany ruch, który dominuje na tej stronie, zwykle nie pobiera dodatkowego pliku JavaScript.
- Animacja znak po znaku na example.com jest zrobiona czystym CSS przez owinięcie każdego znaku w span z narastającym opóźnieniem transition, bez żadnej biblioteki.
- IANA wprost odradza używanie example.com do testów dostępności czy monitoringu, mimo że deweloperzy regularnie zostawiają ją w zapomnianych konfiguracjach testowych.
- Pusty favicon przez data URI href="data:," to prosty trik eliminujący zbędne requesty o /favicon.ico dla stron bez własnej ikony.

**Why do I care:** Ciekawostka o example.com jest zabawna, ale praktyczna lekcja jest poważna: jeśli Twoja organizacja zostawia przykładowe adresy w konfiguracjach produkcyjnych, to właśnie ten rodzaj niezamierzonego ruchu generuje realne koszty dla operatorów domen takich jak example.com. Sam trik z pustym faviconem przez data URI warto ukraść do własnych projektów, jeśli nie masz własnej ikony i chcesz uniknąć zbędnych 404 w logach.

**Link:** [Example.com Just Launched The Biggest Redesign In Decades](https://www.debugbear.com/blog/example-dot-com-redesign-history)

## WebAIM: JAWS wraca do łask, a AI staje się codziennym narzędziem dostępności

**TLDR:** Jedenasta edycja ankiety WebAIM wśród 1780 użytkowników czytników ekranu pokazuje nieoczekiwany powrót popularności JAWS kosztem NVDA i VoiceOver, spadek postrzeganego postępu w dostępności webu, oraz powszechne już użycie AI do generowania opisów obrazów i podsumowań stron.

**Summary:** JAWS wrócił jako podstawowy czytnik ekranu dla 55 procent respondentów, rosnąc kosztem NVDA (32,9 procent) i VoiceOver (6,5 procent), co odwraca trend spadkowy JAWS widoczny w poprzednich edycjach ankiety. Różnice regionalne są drastyczne: JAWS dominuje w Ameryce Północnej (72,5 procent wobec 15,6 procent dla NVDA) i Australii, podczas gdy NVDA zdecydowanie wygrywa w Afryce, na Bliskim Wschodzie i w Azji, gdzie sięga 77 do 83 procent. Postrzeganie darmowych czytników ekranu jako realnej alternatywy dla komercyjnych lekko spadło, z 78,1 procent w 2024 roku do 74,6 procent w 2026 roku, przy czym tylko 61,9 procent użytkowników JAWS się z tym zgadza, wobec ponad 90 procent użytkowników NVDA i VoiceOver.

Niepokojący jest spadek postrzeganego postępu dostępności webu: tylko 32,2 procent respondentów uważa, że treść webowa stała się bardziej dostępna w ostatnim roku, co kontynuuje spadkowy trend z 2021 i 2024 roku, a osoby bez niepełnosprawności są wyraźnie bardziej optymistyczne (41 procent) niż osoby z niepełnosprawnościami (31,8 procent). Pierwszy raz w historii ankiety odsetek odpowiedzi "lepsze strony mają większy wpływ niż lepsza technologia pomocnicza" lekko się cofnął, z 85,9 procent w 2024 do 83,9 procent w 2026 roku, co może sygnalizować rosnące obawy o same czytniki ekranu, nie tylko o jakość stron.

Sekcja o AI pokazuje, jak szybko to narzędzie weszło do codziennego użytku osób niewidomych i słabowidzących: 60,1 procent respondentów używa AI do generowania opisów obrazów i tekstu alternatywnego, 49,7 procent do pogłębionej analizy złożonych obrazów, a 37,1 procent do podsumowań stron i dokumentów. Tylko 8,2 procent respondentów nie korzysta z AI w żaden z wymienionych sposobów, co pokazuje, że dla tej społeczności AI stało się praktycznym narzędziem kompensującym luki w dostępności, które deweloperzy zostawili niewypełnione.

**Key takeaways:**
- JAWS wrócił jako dominujący podstawowy czytnik ekranu z 55 procentami udziału, odwracając wcześniejszy trend wzrostu NVDA i VoiceOver.
- Postrzegany postęp dostępności webu spada trzeci raport z rzędu, z tylko 32,2 procent respondentów uważających, że treść webowa poprawiła się w ostatnim roku.
- 85,6 procent respondentów wciąż uznaje dokumenty PDF za prawdopodobne źródło problemów z dostępnością, wobec tylko 31,1 procent dla dokumentów Word.
- Niemal 92 procent respondentów używa AI do co najmniej jednej funkcji wspierającej dostępność, najczęściej do generowania opisów obrazów.

**Why do I care:** Jeśli Twój zespół wciąż polega głównie na automatycznych skanerach dostępności, ta ankieta pokazuje, że realni użytkownicy czytników ekranu coraz częściej sami sięgają po AI, żeby załatać luki, które Twoja strona powinna była wypełnić od razu. Warto też zanotować, że 67,8 procent użytkowników wciąż nawiguje przez nagłówki, więc poprawna hierarchia h1 do h6 pozostaje jednym z najtańszych i najbardziej wartościowych usprawnień dostępności, jakie możesz wprowadzić w najbliższym sprincie.

**Link:** [WebAIM: Screen Reader User Survey #11 Results](https://webaim.org/projects/screenreadersurvey11/)

## SVG 2 dostaje odświeżoną Candidate Recommendation

**TLDR:** W3C opublikował zaktualizowaną wersję Candidate Recommendation Snapshot dla SVG 2 z poprawkami i doprecyzowaniami mającymi zwiększyć interoperacyjność między przeglądarkami, zapraszając do zgłaszania uwag przez GitHub Issues do 1 grudnia 2026 roku.

**Summary:** SVG Working Group zaprasza do implementacji odświeżonej wersji specyfikacji SVG 2, opisującej funkcje i składnię dla dwuwymiarowej grafiki wektorowej opartej na XML, stylowalnej, skalowalnej do różnych rozdzielczości ekranu, osadzalnej w HTML lub innych językach XML przez przestrzenie nazw, i wspierającej zmiany dynamiczne przez skrypty oraz animacje deklaratywne. Ta konkretna aktualizacja skupia się na korektach i doprecyzowaniach zwiększających interoperacyjność, szczególnie w implementacjach przeglądarkowych, zamiast dodawać nowe funkcje.

**Key takeaways:**
- Aktualizacja SVG 2 koncentruje się na poprawkach interoperacyjności między przeglądarkami, nie na nowych funkcjach.
- Zgłoszenia uwag przez GitHub Issues są otwarte do 1 grudnia 2026 roku.

**Why do I care:** Dla zespołów utrzymujących biblioteki wizualizacji danych czy edytory graficzne oparte na SVG to sygnał, żeby sprawdzić changelog specyfikacji pod kątem drobnych niespójności między przeglądarkami, które mogły wcześniej wymagać obejść w kodzie, a teraz mogą zostać rozwiązane na poziomie samej specyfikacji.

**Link:** [Updated Candidate Recommendation: Scalable Vector Graphics (SVG) 2](https://www.w3.org/news/2026/updated-candidate-recommendation-scalable-vector-graphics-svg-2/)

## 95 procent stron linii lotniczych oblewa Core Web Vitals, a Ryanair jest szybszy niż Qatar Airways

**TLDR:** Analiza 111 największych linii lotniczych pokazuje, że tylko 5 stron przechodzi Core Web Vitals na mobile, a wysoka ocena serwisu w rankingu Skytrax w ogóle nie koreluje z szybkością strony: Cathay Pacific, pięciogwiazdkowy przewoźnik, ma najwolniejszą stronę w badaniu z LCP na poziomie 10,6 sekundy.

**Summary:** Autor zbadał 111 linii lotniczych, łącząc realne dane Core Web Vitals z Chrome UX Report z ocenami Skytrax i stosem technologicznym stojącym za każdą stroną, skupiając się na bezpośrednich adresach silnika rezerwacji zamiast ogólnych stron marketingowych. Wynik jest brutalny: tylko 5 stron przechodzi wszystkie trzy metryki na mobile, wśród nich Frontier i Ryanair, które renderują się szybko i reagują na interakcje w 175 milisekund lub mniej. Wszystkie dziesięć najwyżej ocenianych linii lotniczych według Skytrax 2025 oblewa Core Web Vitals, a korelacja między oceną serwisu a szybkością strony jest praktycznie odwrotna: Qatar Airways, wybrana najlepszą linią świata na 2025 rok, zajmuje 79. miejsce w benchmarku szybkości, a Cathay Pacific, pięciogwiazdkowy przewoźnik, jest ostatnia, na miejscu 109, z LCP na poziomie 10,6 sekundy i INP 1,4 sekundy na mobile.

Autor identyfikuje cztery przyczyny tego stanu rzeczy. Pierwsza to źle zaimplementowany interfejs: niestandardowe komponenty formularzy, animacje JavaScript z poprzedniej epoki zamiast natywnych elementów takich jak details, dialog czy popover, oraz skeleton loadery, które same w sobie powodują layout shift zamiast go zapobiegać. Druga to interakcje blokowane przez zapytania do serwera, bo każdy wybór daty czy miejsca wymaga round-tripu sprawdzającego dostępność i cenę w czasie rzeczywistym, co dla pickera dat może oznaczać kilka sekund odczuwalnego zawieszenia strony. Trzecia to słabo zoptymalizowane silniki rezerwacji: dwie trzecie badanych stron korzysta z produktów Amadeus, ale rozrzut wydajności wewnątrz tego samego dostawcy jest większy niż różnica między dostawcami, czego dowodzą Ryanair (szybki, na Amadeus Navitaire) i Cathay Pacific (wolny, też na produkcie Amadeus). Czwarta to zbyt mało cache'owania: HTML powinien być albo w pełni cache'owany, albo dostarczany w mniej niż pół sekundy, a zapytania do silnika rezerwacji powinny być asynchroniczne i zawierać wyłącznie dane potrzebne do konkretnej interakcji.

Stawka finansowa jest konkretna: badanie Shopify cytowane w artykule pokazuje, że sklepy z LCP na poziomie 2,5 sekundy konwertują około 30 procent gorzej niż te z LCP na poziomie 1,5 sekundy, a każde 32 milisekundy INP jest warte kolejnego 1,5 procent konwersji. Cathay Pacific zarobił w zeszłym roku 72,5 miliarda dolarów hongkońskich z przychodów pasażerskich, więc skrócenie LCP z 10,2 do 3 sekund mogłoby realnie poprawić zarówno wynik finansowy, jak i satysfakcję klientów.

**Key takeaways:**
- Tylko 5 ze 111 zbadanych stron linii lotniczych przechodzi Core Web Vitals na mobile, a ocena serwisu w rankingu Skytrax w ogóle nie koreluje z szybkością strony.
- Rozrzut wydajności wewnątrz tego samego dostawcy silnika rezerwacji, na przykład Amadeus, jest większy niż różnica między konkurencyjnymi dostawcami.
- Każde 32 milisekundy poprawy INP jest warte około 1,5 procent dodatkowej konwersji według cytowanych danych branżowych.
- Problem nie leży w samym silniku rezerwacji, tylko w tym, jak zespoły frontendowe implementują interfejs wokół niego: blokujące zapytania, brak cache'owania i niestandardowe komponenty zamiast natywnych elementów HTML.

**Why do I care:** To twardy dowód na to, że wybór dostawcy backendu, czyli silnika rezerwacji w tym przypadku, nie determinuje wydajności strony, tylko implementacja frontendu wokół niego. Jeśli kiedykolwiek usłyszysz argument "nasz system jest wolny, bo korzystamy z legacy API dostawcy X", ten artykuł daje konkretny kontrprzykład: dwie firmy na tym samym produkcie Amadeus osiągają skrajnie różne wyniki, co oznacza, że odpowiedzialność leży po stronie zespołu frontendowego, nie po stronie dostawcy backendu.

**Link:** [It's official: Airline websites are slow, but they don't have to be](https://calibreapp.com/blog/airline-websites-are-slow)

## CSS anchor positioning kasuje JavaScript potrzebny do pozycjonowania tooltipów

**TLDR:** Nowe właściwości CSS anchor-name, position-anchor i position-try-fallbacks pozwalają zbudować w pełni responsywne tooltipy i dropdowny bez listenerów na resize czy scroll, a Edge Web Platform Team proponuje osobno natywny, stylowalny tooltip oparty na tych samych mechanizmach, który rozwiązałby dekady problemów z atrybutem title.

**Summary:** Klasyczny sposób pozycjonowania tooltipa przez getBoundingClientRect i ręczne ustawianie top i left wymaga listenerów na resize i scroll, oraz ręcznej matematyki do wykrywania przepełnienia viewportu i odwracania pozycji. CSS anchor positioning robi to wszystko deklaratywnie: element otrzymuje anchor-name, a element, który ma się do niego pozycjonować, używa position-anchor i position-area zamiast ręcznie liczonych wartości top i calc(). Najważniejszą funkcją jest position-try-fallbacks: jeśli tooltip blisko dołu strony przepełniłby viewport, przeglądarka sama próbuje odwrócić go na drugą stronę, z detekcją przepełnienia i repozycjonowaniem dziejącym się automatycznie przy scrollu czy zmianie rozmiaru okna. W połączeniu z natywnym atrybutem popover, dającym renderowanie w top layer bez walki z z-index oraz zamykanie przez kliknięcie na zewnątrz za darmo, powstaje działający dropdown bez ani jednej linijki JavaScriptu, a anchor-size() pozwala dopasować szerokość dropdownu dokładnie do przycisku, który go otworzył, bez mierzenia go w JavaScript.

Równolegle Patrick Brosset z zespołu Edge Web Platform opisuje, dlaczego natywny atrybut title jest tak rzadko używany mimo swojej prostoty: występuje tylko na 2 procentach stron według Web Almanac 2024, a analiza top 5000 domen z Tranco pokazuje, że 70 procent użyć na elementach a i 76 procent na img nie niesie żadnej nowej informacji ponad to, co jest już dostępne przez tekst linku czy atrybut alt. Problem jest głębszy niż sama rzadkość użycia: tooltipy oparte na title nie są dostępne dla użytkowników klawiatury poza Microsoft Edge, nie zamykają się klawiszem Escape, i nie są spójnie odczytywane przez czytniki ekranu. Mimo to zapotrzebowanie na tooltipy jest realne, czego dowodzi 57 milionów pobrań tygodniowo komponentu tooltip z Radix UI.

Propozycja Edge Web Platform Team to nowy pseudoelement ::tooltip, stylowalny przez CSS podobnie jak customizowalny select, oraz alternatywny atrybut tooltip, który miałby pierwszeństwo nad title, gdy oba są obecne na tym samym elemencie. Kluczowy insight tej propozycji to reużycie istniejących mechanizmów platformy zamiast wymyślania nowych: tooltip stałby się jednocześnie popoverem i interest invoker targetem swojego elementu hosta, co dałoby dostępność klawiaturową za darmo, pozycjonowanie przez anchor positioning, i kontrolę opóźnienia przez właściwość interest-delay. Propozycja ogranicza dostępność nowego tooltipa do elementów faktycznie fokusowalnych, button, a, input, textarea i select, świadomie wykluczając obrazy, dla których lepszym rozwiązaniem pozostaje atrybut alt.

**Key takeaways:**
- anchor-name i position-anchor pozwalają związać pozycję elementu z innym elementem deklaratywnie w CSS, bez listenerów na resize czy scroll.
- position-try-fallbacks automatycznie odwraca pozycję tooltipa, gdy przepełniłby viewport, eliminując ręczną matematykę wykrywania przepełnienia.
- Atrybut title jest obecny tylko na 2 procentach stron webu, a tam gdzie występuje, 70 do 76 procent przypadków nie niesie żadnej informacji ponad istniejący tekst linku czy alt.
- Proponowany pseudoelement ::tooltip łączyłby popover, anchor positioning i interest invokers, dając dostępność klawiaturową za darmo, ograniczony do faktycznie fokusowalnych elementów jak button, a, input, textarea i select.

**Why do I care:** Jeśli masz w kodzie customowy tooltip oparty na JavaScriptowych listenerach na resize i scroll, to dokładnie ten kod możesz dziś zastąpić kilkoma liniami CSS z anchor positioning, wspieranymi już we wszystkich aktualnych przeglądarkach. Warto też śledzić propozycję ::tooltip, bo jeśli wejdzie do specyfikacji, może w końcu rozwiązać problem, z którym każdy frontendowiec się mierzył: potrzebę prostego, dostępnego tooltipa bez dociągania całej biblioteki jak Radix UI tylko po to.

**Link:** [CSS does your tooltip positioning now - Matt Smith](https://allthingssmitty.com/2026/10/05/css-does-your-tooltip-positioning-now/)

## Dart Sass 2 nadchodzi w grudniu: slash przestaje być operatorem dzielenia

**TLDR:** Dart Sass 2, planowany na grudzień 2026 roku, zamieni większość ostrzeżeń deprecjacji w błędy i wprowadzi jedną dużą zmianę łamiącą kompatybilność: ukośnik / stanie się separatorem zgodnym z CSS zamiast operatorem dzielenia, więc do dzielenia trzeba będzie użyć math.div() albo calc().

**Summary:** Zespół Sass przypomina, że od wydania Dart Sass 1.0.0 w marcu 2018 roku priorytetem było szybkie naprawianie błędów i nadążanie za ewoluującą specyfikacją CSS, co doprowadziło do przegonienia LibSass pod względem pobrań w 2021 roku i ostatecznego zakończenia życia node-sass opartego na LibSass rok temu. Zespół bardzo niechętnie wprowadza zmiany łamiące kompatybilność, trzymając je do kolejnej wersji major, jednocześnie starając się wydawać nowe funkcje tak szybko, jak tylko zostaną zaimplementowane, co prowadzi do zabawnego efektu: wersje z najbardziej ekscytująco wyglądającym numerem to zwykle sama lista zmian łamiących, bez żadnych nowych zabawek.

Główna różnica między ostatnim wydaniem z gałęzi 1.x.x a Dart Sass 2.0.0 polega na tym, że większość rzeczy generujących dziś ostrzeżenie deprecjacji stanie się błędem. Są jednak wyjątki: deprecjacje związane z @import, w tym import, global-builtin i color-module-compat, pozostaną ostrzeżeniami aż do Dart Sass 3, podobnie jak legacy funkcja if(), bo nowa składnia istnieje od niecałego roku, a stara jest używana w arkuszach stylów od wielu lat. Żadna nowa deprecjacja wprowadzona po publikacji tego wpisu na blogu nie stanie się błędem w Dart Sass 2, konkretnie żadna deprecjacja wprowadzona po Dart Sass 1.105.0.

Jedyna nowa funkcja w Dart Sass 2 jest zarazem największą zmianą łamiącą: ukośnik / zacznie działać jak w CSS, czyli jako separator, tworząc listę rozdzielaną ukośnikiem, tę samą, którą dziś tworzy funkcja list.slash(). Do dzielenia trzeba będzie użyć math.div() albo kontynuować używanie / wewnątrz wyrażenia calc(). Żeby przygotować się na migrację, zespół rekomenduje włączenie flagi --fatal-deprecations z konkretną listą deprecjacji obejmujących wersję 1.79.0, compile-string-relative-url, misplaced-rest, with-private, function-name i adjacent-compounds, co pozwala sprawdzić, czy arkusze stylów kompilują się czysto na aktualnej wersji Sass z tymi ostrzeżeniami traktowanymi jako błędy, zanim Dart Sass 2 wejdzie do życia na stałe.

**Key takeaways:**
- Dart Sass 2, planowany na grudzień 2026 roku, zamienia większość ostrzeżeń deprecjacji w błędy, ale @import i legacy funkcja if() pozostają ostrzeżeniami do Dart Sass 3.
- Jedyna nowa funkcja to jednocześnie największa zmiana łamiąca: / stanie się separatorem zgodnym z CSS zamiast operatorem dzielenia, więc trzeba przejść na math.div() albo calc().
- Flaga --fatal-deprecations z konkretną listą reguł pozwala już dziś sprawdzić, czy Twój projekt przejdzie migrację na Dart Sass 2 bez niespodzianek.
- Żadna deprecjacja wprowadzona po wersji 1.105.0 nie stanie się błędem w wersji 2.0, co daje ekosystemowi więcej czasu na adaptację do przyszłych zmian.

**Why do I care:** Jeśli Twój projekt wciąż używa Sass i polega na ukośniku do dzielenia wartości, na przykład przy liczeniu proporcji w mixinach, to konkretna, odtwarzalna checklista do sprawdzenia przed grudniem 2026 roku. Uruchom --fatal-deprecations z podaną listą reguł już teraz w CI, zamiast czekać na wydanie Dart Sass 2 i odkrywać złamane buildy produkcyjnie.

**Link:** [Sass: The Road to Dart Sass 2](https://sass-lang.com/blog/the-road-to-dart-sass-2/)

## Zrównoważona kariera webowa: czego się uczyć, gdy branża przechodzi kryzys

**TLDR:** Autor, krytyczny wobec obecnego stanu branży webowej, radzi skupić się na dostępności, głębokim rozumieniu CSS i komunikacji jako umiejętnościach w niedoborze, a odradza inwestowanie czasu w React, twierdząc że framework stał się językiem generowanego kodu, a nie wyborem architektonicznym wartym nauki.

**Summary:** Punktem wyjścia jest obserwacja, że finanse branży webowej przechodzą trudny okres, a perspektywy długoterminowej kariery wyglądają niepewnie, choć zdaniem autora powody tego stanu są w dużej mierze irracjonalne, bo zapotrzebowanie na web jako taki nigdzie nie zniknęło. Rada, jaką autor daje znajomym pytającym go prywatnie o to, co robić, jest prosta: nie rzucaj płatnej pracy bez planu B i poczekaj, aż sytuacja się unormuje, bo jest przekonany, że to nastąpi.

W kwestii tego, czego się uczyć, autor wskazuje dostępność jako fundament, który nigdy nie był ważniejszy, i ostrzega przed traktowaniem jej jako feature'a doklejanego na końcu projektu albo automatyzowanego skanerem, zamiast respektowania jej w każdej decyzji od pierwszego dnia. CSS jako język stylów, zdaniem autora, jest najbardziej żywym i ewoluującym standardem frontendowym, a nowsze funkcje jak cascade layers czy selektory redukujące specyficzność ułatwiają architekturę stylów na tyle, że uciekanie w uproszczone abstrakcje typu CSS-in-JS przestaje mieć sens, bo te rozwiązania są z natury ograniczające i nie rozwiązują problemów, które deklarują rozwiązywać. Trzecią umiejętnością są kompetencje komunikacyjne, opisane jako rzadkie z oczywistych powodów, czyli zwięzłość, zadawanie pytań i adresowanie obaw wcześnie i taktownie, zanim eskalują.

Najbardziej kontrowersyjną częścią tekstu jest sekcja o odrzucaniu faszyzmu, w której autor twierdzi, że branża technologiczna nie może już sobie pozwolić na luksus "niewchodzenia w politykę", wskazując konkretne osoby i firmy jako przykłady rosnącej skrajnie prawicowej retoryki w tech. Co do React, autor jest równie bezpośredni: nazywa go "eksperymentem Facebooka, który zmienił się w kult cargo", twierdzi że kod React jest dziś generowany szybciej niż jakikolwiek człowiek mógłby go przeczytać, i radzi nie inwestować w niego czasu mimo wciąż widocznych ogłoszeń o pracę wymagających tego doświadczenia. Podobnie odradza poleganie na GitHubie jako na "liability", sugerując self-hostowane forge'y Gita takie jak Forgejo dla prywatnych repozytoriów, oraz traktuje influencerów deweloperskich jako grupę, której uwaga przestała mieć znaczenie dla zwykłych ludzi korzystających z webu.

**Key takeaways:**
- Autor rekomenduje dostępność, głębokie rozumienie CSS i komunikację jako trzy umiejętności w niedoborze, warte inwestycji czasu w obecnym kryzysie branży.
- Argument przeciwko React opiera się na twierdzeniu, że framework stał się głównie językiem generowanego kodu, a nie świadomym wyborem architektonicznym.
- Tekst zawiera wyraźnie polityczne stanowisko dotyczące rosnącej skrajnie prawicowej retoryki w technologii, które warto traktować jako osobistą opinię autora, a nie konsensus branżowy.
- Rekomendacja self-hostowanych forge'y Gita jak Forgejo wynika z traktowania GitHuba jako zależności od dużej firmy technologicznej, a nie z konkretnego incydentu bezpieczeństwa.

**Why do I care:** Niezależnie od tego, czy zgadzasz się z tezą o Reactcie, warto zauważyć, że argument o CSS-in-JS jako ograniczającej abstrakcji wraca regularnie w dyskusjach frontendowych, a nowsze funkcje CSS jak cascade layers rzeczywiście zmniejszają presję na uciekanie od natywnego CSS. Polityczne fragmenty tekstu to wyraźnie osobiste stanowisko autora, nie neutralna analiza rynku, więc warto czytać tę radę zawodową z tą świadomością w tle, zamiast traktować całość jako obiektywną prognozę kariery.

**Link:** [A sustainable web career, for when all this blows over](https://dbushell.com/2026/10/07/sustainable-web-career/)

## Nawet ChatGPT nie radzi sobie z tekstem dwukierunkowym

**TLDR:** Artykuł pokazuje, że mieszanie tekstu angielskiego z arabskim czy perskim regularnie psuje się nawet w narzędziach takich jak ChatGPT, bo znaki neutralne jak wykrzyknik czy przecinek dziedziczą kierunek z sąsiadów, a naprawienie tego wymaga jawnego ustawienia kierunku bazowego przez atrybut dir albo element bdi.

**Summary:** Punktem wyjścia jest prosty eksperyment: zdanie mieszające angielski z perskim renderuje się poprawnie, dopóki nie dodamy wykrzyknika na końcu perskiej frazy, bo przeglądarka umieszcza go po niewłaściwej stronie względem intencji autora. Przyczyną jest Unicode Bidirectional Algorithm: silne znaki, takie jak litery łacińskie czy arabskie, mają wbudowany kierunek, ale znaki neutralne jak spacje, przecinki czy wykrzykniki nie mają żadnego, więc przeglądarka patrzy na sąsiadów po obu stronach i stosuje "regułę kanapki". Gdy oba sąsiedzi są zgodni kierunkowo, neutralny znak przyjmuje ich kierunek, ale gdy nie są zgodni, algorytm potrzebuje dodatkowego kontekstu, czyli kierunku bazowego dokumentu albo konkretnego fragmentu tekstu.

Autor testuje ChatGPT, prosząc go o wypisanie liczb od jednego do sześciu z trzema i czterema po arabsku, a potem odwrotnie, z większością liczb po arabsku poza trzema i czterema po angielsku. W obu przypadkach model rozumie zadanie poprawnie, ale renderowanie psuje kolejność liczb i strzałek, bo sam model nie kontroluje warstwy wyświetlania, tylko generuje tekst, który przeglądarka renderuje według własnych reguł kierunkowości. To rozróżnienie jest kluczowe: problem nie leży w rozumieniu tekstu przez model, tylko w tym, że nikt nie przekazuje rendererowi informacji o zamierzonym kierunku poszczególnych fragmentów.

Rozwiązania obejmują atrybut dir ustawiony możliwie blisko fragmentu wymagającego innego kierunku niż reszta dokumentu, wartość dir="auto" dla treści wstawianej dynamicznie w czasie działania aplikacji, jak w dymkach czatu WhatsApp, oraz element bdi, który izoluje tekst i automatycznie ustawia kierunek na auto bez jawnego pisania tego atrybutu. Dla przypadków bez żadnego opakowującego elementu niewidoczne znaki Unicode LRM (U+200E) i RLM (U+200F) działają jako silny sygnał kierunkowy wstawiony między innymi znakami. Autor wyraźnie odradza używanie właściwości CSS unicode-bidi do kontrolowania renderowania tekstu dwukierunkowego, argumentując że to problem na poziomie treści, nie stylu, bo narzędzie czy scraper AI korzystające z treści bez uwzględnienia stylów skończy z pomieszaną informacją.

Najciekawszy jest przypadek bez dobrego rozwiązania markupowego: wyszukiwarka książek z tytułem zaczynającym się od angielskiego słowa, ale w rzeczywistości napisanym w urdu, oszuka algorytm wykrywania kierunku, bo pierwszy silny znak jest angielski, mimo że kontekst całości jest RTL. Jedynym rozwiązaniem jest wtedy skrypt licząc słowa RTL i LTR w stringu i wybierający dominujący kierunek, jak robi to funkcja estimateDirection w Google Closure Library, albo, co autor sugeruje jako nowość, przekazanie tej decyzji samemu LLM-owi, który rozumie znaczenie tekstu i może wyrazić swoją decyzję przez te same narzędzia platformy, czyli dir, bdi czy znaki LRM i RLM.

**Key takeaways:**
- Znaki neutralne, takie jak wykrzykniki czy przecinki, dziedziczą kierunek od sąsiadujących silnych znaków, co psuje renderowanie przy mieszaniu języków LTR i RTL bez jawnego ustawienia kierunku.
- Element bdi izoluje fragment tekstu i automatycznie ustawia kierunek na auto, co jest wygodniejsze niż ręczne pisanie dir="auto" na każdym dynamicznie wstawianym fragmencie.
- Problem bidi nie wynika z tego, że model AI nie rozumie tekstu, tylko z tego, że renderer nie dostaje informacji o zamierzonym kierunku poszczególnych fragmentów.
- Właściwości CSS unicode-bidi nigdy nie należy używać do kontrolowania kierunku tekstu, bo to problem na poziomie treści, nie stylu, i psuje się przy każdym narzędziu czytającym samą treść bez stylów.

**Why do I care:** Jeśli Twoja aplikacja kiedykolwiek obsłuży użytkowników piszących po arabsku, hebrajsku czy persku, czyli realnie każda aplikacja z treścią generowaną przez użytkowników, ten artykuł to gotowa checklista problemów, które wypłyną prędzej czy później: dymki czatu, powiadomienia mieszające języki, wyszukiwarki z wielojęzycznymi wynikami. Warto zapamiętać jedną praktyczną regułę: ustawiaj dir możliwie blisko fragmentu, który tego potrzebuje, zamiast zmieniać kierunek całego większego bloku dokumentu.

**Link:** [You Don't Know Bidi (And Neither Does ChatGPT)](https://blog.master.dev/you-dont-know-bidi-and-neither-does-chatgpt/)

## Hack na children-count() przez Scroll-Driven Animations, do użycia ostrożnie

**TLDR:** Zanim oficjalna funkcja CSS children-count() stanie się rzeczywistością, da się ją zasymulować przez sibling-count() w połączeniu ze Scroll-Driven Animations i dodatkowym elementem wewnątrz kontenera, choć autor sam ostrzega, że to bardzo hacky metoda do stosowania z rozwagą.

**Summary:** CSS ma już sibling-count() do liczenia rodzeństwa, ale nie ma jeszcze oficjalnej funkcji do liczenia dzieci kontenera, mimo że taka propozycja istnieje. Obejście polega na dodaniu dodatkowego elementu wewnątrz kontenera, ustawieniu jego szerokości na liczbę rodzeństwa pomnożoną przez 1 piksel, a następnie wykorzystaniu triku z poprzedniego wpisu autora do odczytania szerokości tego elementu i przeniesienia jej na element rodzica przez Scroll-Driven Animations i właściwość @property. Rezultatem jest zmienna --n odzwierciedlająca liczbę dzieci, użyteczna do wyświetlania licznika ukrytej zawartości albo do budowania dynamicznych układów siatki inspirowanych kafelkowaniem.

**Key takeaways:**
- Trik wymaga dodania dodatkowego elementu wewnątrz kontenera, co autor sam wskazuje jako wadę tej metody.
- Technika opiera się na Scroll-Driven Animations i właściwości @property do przeniesienia zmierzonej wartości szerokości na zmienną CSS.
- Autor wprost ostrzega, że to bardzo hacky metoda do stosowania z rozwagą, nie gotowe rozwiązanie produkcyjne.

**Why do I care:** Ten trik jest ciekawostką pokazującą, jak daleko da się dziś posunąć czyste CSS bez JavaScriptu, ale dodatkowy element w markupie i ogólna krucha natura rozwiązania sprawiają, że warto go trzymać w kieszeni na wypadek bardzo specyficznego przypadku, a nie wdrażać masowo, dopóki oficjalna funkcja children-count() nie wyląduje w przeglądarkach.

**Link:** [Implementing children-count() using Modern CSS](https://css-tip.com/children-count/)

## Jak naprawdę działają passkeys: klucz publiczny, wyzwanie i nic do zapamiętania

**TLDR:** Interaktywny przewodnik tłumaczy krok po kroku, że passkey nie wysyła do strony żadnego sekretu, tylko podpis kryptograficzny potwierdzający posiadanie klucza prywatnego, co eliminuje phishing na poziomie protokołu, bo przeglądarka wiąże żądanie z konkretną domeną, niezależnie od tego, jak przekonująco wygląda fałszywa strona.

**Summary:** Kluczowa różnica między hasłem a passkey jest koncepcyjna: hasło wysyła sekret do strony, podczas gdy passkey wysyła dowód, który strona weryfikuje kluczem publicznym zapisanym podczas rejestracji. Proces rejestracji wygląda tak: serwer przygotowuje losowe, nieprzewidywalne wyzwanie związane z konkretną próbą rejestracji, przeglądarka wywołuje navigator.credentials.create(), a autentykator, czyli menedżer haseł, samo urządzenie albo fizyczny klucz bezpieczeństwa, tworzy parę kluczy po lokalnym potwierdzeniu twarzą, odciskiem palca albo PIN-em urządzenia. Klucz prywatny nigdy nie opuszcza autentykatora, do serwera trafia tylko klucz publiczny zapisany w obiekcie atestacji.

Przy logowaniu serwer generuje świeże wyzwanie dla każdej próby, co uniemożliwia odtworzenie wcześniej przechwyconej odpowiedzi. Autentykator podpisuje dane uwierzytelniające razem z hashem danych klienta, zawierającym wyzwanie i pochodzenie strony, co wiąże podpis konkretnie z tym żądaniem i tym kontekstem strony. Serwer następnie sprawdza zapisany klucz publiczny razem z oczekiwanym wyzwaniem, pochodzeniem, identyfikatorem relying party i wymaganymi flagami, i dopiero po pomyślnej weryfikacji tworzy normalną sesję zalogowania.

Mechanizm obrony przed phishingiem jest wbudowany w sam protokół, nie w czujność użytkownika: fałszywa strona o podobnej nazwie, na przykład mysticcoders-login.example zamiast mysticcoders.com, nie może po prostu zażądać poświadczenia dla prawdziwej domeny, bo przeglądarka waliduje żądanie względem rzeczywistego pochodzenia strony, niezależnie od logo czy treści wyświetlanej na ekranie. Jeśli fałszywa strona zażąda własnego klucza dla swojej domeny, nie dostanie dostępu do konta powiązanego z prawdziwym serwisem, a skopiowana odpowiedź jest też związana z oryginalnym wyzwaniem i kontekstem, więc nie da się jej powtórnie użyć gdzie indziej. Passkeys nie chronią jednak przed wszystkim: nie naprawiają skompromitowanego urządzenia, skradzionej już zalogowanej sesji ani słabego procesu odzyskiwania konta, więc pozostają ważnym, ale nie jedynym elementem bezpieczeństwa logowania.

**Key takeaways:**
- Passkey wysyła do strony podpis kryptograficzny potwierdzający posiadanie klucza prywatnego, nigdy sam sekret, w przeciwieństwie do hasła.
- Klucz prywatny nigdy nie opuszcza autentykatora, nawet w momencie rejestracji, do serwera trafia wyłącznie klucz publiczny.
- Przeglądarka wiąże żądanie z rzeczywistym pochodzeniem strony na poziomie protokołu WebAuthn, co eliminuje klasyczny phishing przez podobnie wyglądającą domenę.
- Passkeys nie chronią przed skompromitowanym urządzeniem, skradzioną sesją czy słabym procesem odzyskiwania konta, więc pozostają jednym elementem bezpieczeństwa, nie całym rozwiązaniem.

**Why do I care:** Jeśli planujesz wdrożyć passkeys w swojej aplikacji, ten przewodnik daje konkretny, techniczny model mentalny dla zespołu, wykraczający poza marketingowe hasło "login bez hasła". Szczególnie przydatny jest fragment o tym, dlaczego fałszywa domena nie może przechwycić passkeys: to argument, którego możesz użyć w rozmowie z zespołem bezpieczeństwa albo produktowym, żeby wytłumaczyć, dlaczego passkeys to realna poprawa względem haseł, a nie tylko wygodniejszy UX.

**Link:** [How do passkeys work — Mystic Coders](https://howdopasskeyswork.com/)

## Panda CSS 2.0 przepisane w Rust: ekstrakcja stylów nawet 37 razy szybsza

**TLDR:** Panda CSS 2.0 wymienia silnik napisany w TypeScript na nowy, oparty na Rust i toolchainie Oxc, co daje od 15 do 37 razy szybszą ekstrakcję stylów, około 360 razy szybsze ponowne parsowanie w trybie watch, i nową możliwość publikowania całych systemów projektowych jako paczek npm.

**Summary:** Twórcy Panda podkreślają, że sam sposób pisania stylów się nie zmienił, ten sam css(), te same recepty i wzorce, te same tokeny i warunki. Zmienił się silnik pod spodem: zamiast ts-morph opakowującego pełny kompilator TypeScript i interpretera JavaScript do ewaluacji stałych wartości, Panda 2.0 używa własnego silnika napisanego w Rust na bazie Oxc, szybkiego toolchaina JavaScript. Nowy silnik idzie jednokierunkowym potokiem extract → encode → emit, gdzie Oxc parsuje każdy plik raz, a ten sam parse jest współdzielony między analizą importów, wywołaniami css(), JSX-em i rozwiązywaniem identyfikatorów, zamiast wielokrotnego parsowania tych samych plików przez różne narzędzia jak w wersji 1.

Liczby robią wrażenie: ekstrakcja jest od 15 do 37 razy szybsza na projektach od kilku plików do tysiąca, tryb watch przyspiesza około 360 razy, z 650 mikrosekund na plik do poniżej 2 mikrosekund, co w projekcie Next.js oznacza spadek kroku parsowania z 762 do 31 milisekund po zapisaniu pliku. Funkcja staticCss, jedna z droższych operacji w wersji 1, przyspiesza około 85 razy, z 25,7 sekundy do 0,3 sekundy na konfiguracji generującej 29 tysięcy reguł. Wygenerowane typy TypeScript są o 99 procent lżejsze pod względem instancjacji typów, co przekłada się na 40 do 60 procent krótszy czas sprawdzania typów i mniejsze zużycie pamięci przez tsc, czyli realnie szybszy edytor i CI.

Nowa funkcja publikowalnych systemów projektowych pozwala zbudować bibliotekę komponentów Panda, opublikować ją jako paczkę npm przez komendę panda lib, i używać jej w innym projekcie Panda przez ustawienie pola designSystem w konfiguracji, bez ponownej ekstrakcji wszystkich stylów biblioteki w aplikacji konsumującej, co wcześniej wymagało konfigurowania presetów, importMap i include, oraz skanowania źródeł biblioteki podczas własnego builda. Inne nowości to funkcja viewTransition() do pracy z View Transitions API, firstThatWorks() do deklarowania nowoczesnej wartości CSS z fallbackiem w tej samej kolejności, w jakiej robi to StyleX, oraz zmiana z uniwersalnego resetu 34 zmiennych CSS na każdym elemencie do rejestracji przez @property, generowanej tylko wtedy, gdy zmienna jest faktycznie używana. Migracja wymaga Node 22 i projektu w pełni ESM, a kilka opcji konfiguracyjnych, w tym studio, eject i lightningcss, zostało całkowicie usuniętych.

**Key takeaways:**
- Nowy silnik Panda 2.0 oparty na Rust i Oxc daje od 15 do 37 razy szybszą ekstrakcję stylów i około 360 razy szybsze ponowne parsowanie w trybie watch.
- Wygenerowane typy TypeScript mają około 99 procent mniej instancjacji, co skraca czas sprawdzania typów o 40 do 60 procent.
- Nowa komenda panda lib pozwala publikować systemy projektowe jako paczki npm, bez ponownej ekstrakcji stylów biblioteki w aplikacji konsumującej.
- Migracja na wersję 2 wymaga Node 22, projektu w pełni ESM, i rezygnacji z kilku usuniętych opcji konfiguracyjnych, w tym studio i lightningcss.

**Why do I care:** Jeśli Twój zespół buduje system projektowy współdzielony między wieloma aplikacjami, workflow panda lib plus designSystem rozwiązuje realny ból głowy związany z ponowną ekstrakcją stylów biblioteki w każdej konsumującej aplikacji. Nawet jeśli nie używasz Panda, ten case study pokazuje konkretny wzorzec migracji z TypeScriptowego kompilatora na Rust plus Oxc, wart rozważenia dla każdego narzędzia budującego, które dziś opiera się na ts-morph i zmaga się z czasem ekstrakcji na dużych kodbazach.

**Link:** [Panda CSS 2.0 | Panda CSS Blog](https://panda-css.com/blog/panda-css-v2)

## Shaders otwiera swój silnik renderujący WebGPU na licencji MIT

**TLDR:** Shaders, platforma do tworzenia efektów shaderowych bez pisania surowego kodu grafiki, udostępnia silnik renderujący, komponenty i bindingi frameworkowe na licencji MIT, zachowując płatny Pro z ponad 1000 gotowych presetów i eksportem wideo bez znaku wodnego.

**Summary:** Pierwotną wizją Shaders było udostępnienie kreatywnych efektów shaderowych design engineerom bez wymagania od nich zostania programistami grafiki. Założyciel tłumaczy, że skoro AI ułatwia tworzenie shaderów niż kiedykolwiek, otwarta podstawa staje się bardziej wartościowa, nie mniej, bo zamiast zaczynać od surowego kodu shaderów, deweloperzy i ich agenty mogą budować na przetestowanych w produkcji komponentach i zoptymalizowanym runtime WebGPU. Otwarty kod obejmuje komponenty, prymitywy i sam silnik renderujący, do użytku zarówno osobistego, jak i komercyjnego, bez potrzeby licencji, a eksport kodu z edytora designu jest teraz darmowy i bez limitów. Własny język defineShader, używany wewnętrznie do budowy każdego komponentu w bibliotece, jest teraz publiczny i udokumentowany, co pozwala napisać własny komponent i zgłosić go z powrotem jako PR.

Pro pozostaje najszybszą drogą do wysyłki gotowych efektów WebGPU, z ponad 1000 kuratorowanych presetów, ponad 55 gotowymi sekcjami instalowanymi jednym promptem, eksportem wideo i obrazów w wysokiej jakości bez znaku wodnego, ekskluzywną rolą na Discordzie i priorytetowym wsparciem. Cennik pozostaje niezmieniony, a osoby, które kupiły subskrypcję Pro w ciągu ostatnich 30 dni wyłącznie dla użytku komercyjnego albo eksportu kodu, mogą skontaktować się z firmą w sprawie rekompensaty, skoro te funkcje są teraz darmowe dla wszystkich.

**Key takeaways:**
- Silnik renderujący, komponenty i prymitywy Shaders są teraz open source na licencji MIT, do użytku osobistego i komercyjnego bez licencji.
- Eksport kodu z edytora designu jest teraz darmowy i bez limitów, wcześniej zastrzeżony dla subskrybentów Pro.
- Język defineShader, używany do budowy komponentów biblioteki, jest teraz publiczny i udokumentowany, co pozwala pisać własne komponenty i zgłaszać je jako PR.
- Pro pozostaje płatną warstwą z ponad 1000 presetami, eksportem wideo bez znaku wodnego i priorytetowym wsparciem, przy niezmienionym cenniku.

**Why do I care:** Jeśli chcesz dodać efekty WebGPU do projektu bez pisania surowego kodu shaderów od zera, to teraz masz darmową, produkcyjnie przetestowaną podstawę do budowy, zamiast zaczynać od zera albo płacić za Pro tylko po to, żeby wyeksportować kod. Otwarcie defineShader jest szczególnie ciekawe dla zespołów z własnymi, specyficznymi wymaganiami wizualnymi, bo pozwala rozszerzyć bibliotekę o własne komponenty zamiast czekać, aż ktoś inny je zbuduje.

**Link:** [Shaders is now open source — Shaders](https://shaders.com/updates/shaders-is-open-source)
