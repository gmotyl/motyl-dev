---
title: "HTTP QUERY, CSS writing-mode i Topcoat: co warto wiedzieć z daily.dev"
excerpt: "Przegląd najciekawszych artykułów z daily.dev: nowa metoda HTTP QUERY po dwudziestu latach, CSS writing-mode dla pionowych układów i Topcoat jako fullstackowy framework dla Rusta."
publishedAt: "2026-07-22"
slug: "http-query-css-writing-mode-topcoat-daily-dev"
hashtags: "#dailydev #frontend #webdev #http #css #rust #generated #pl"
source_pattern: "daily.dev"
---

## HTTP QUERY: Pierwsza nowa metoda HTTP od ponad dekady

**TLDR:** RFC 10008 z czerwca 2026 roku wprowadza metodę QUERY, pierwszą nową standardową metodę HTTP od czasu PATCH w 2010 roku. Rozwiązuje ona problem, który programiści obchodzili przez ponad 16 lat: jak wysyłać złożone, czysto odczytowywe zapytania z ciałem żądania, zachowując jednocześnie semantykę GET.

GET ma swoje ograniczenia od zawsze. Nie możesz wysłać ciała żądania, URL-e mają limity długości, a parametry zapytania trafiają do logów serwerów i pośredników. POST z kolei rozwiązuje problem pojemności, ale traci gwarancje bezpieczeństwa i idempotencji, przez co CDN-y i proxy nie mogą cache'ować odpowiedzi, a automatyczne mechanizmy retry działają ryzykownie.

QUERY bierze to, co najlepsze z obu światów. Przyjmuje ciało żądania, może zawierać filtry w formacie JSON, wyrażenia JSONPath albo nawet fragmenty SQL, ale pozostaje metodą bezpieczną i idempotentną. Jeden endpoint `QUERY /api/users` zastępuje dziesiątki specjalizowanych endpointów. Pośrednicy mogą cache'ować odpowiedzi dokładnie tak samo jak w przypadku GET. Serwer może odpowiedzieć wynikami bezpośrednio (HTTP 200), przekierować do zasobu z wynikami (HTTP 3xx) lub zwrócić brak treści (HTTP 204). Nowy nagłówek `Accept-Query` pozwala serwerom informować klientów, że metoda QUERY jest obsługiwana.

Gdzie jesteśmy z adopcją? W połowie 2026 roku: Node.js parsuje QUERY, OpenAPI 3.2 ma dokumentację, Spring czeka na merge PR. Przeglądarki nadal wymagają CORS preflight (metoda nie jest na liście bezpiecznych), a CDN-y jak Cloudflare i Akamai, mimo że były współautorami RFC, jeszcze nie wdrożyły pełnej obsługi. Realistyczne daty masowej adopcji to 2027-2028.

Traktuję to jako ważną standaryzację, a nie rewolucję. Przez lata robiłem `POST /search` i czułem się z tym nieswojo. Narzędzia do debugowania pokazywały te żądania jako "zapisy danych", pośrednicy blokowali automatyczny retry, a każdy junior developer pytał "dlaczego POST jeśli tylko czytamy?". QUERY daje nam semantycznie poprawne narzędzie. Pytanie czy ekosystem dojrzeje wystarczająco szybko, żeby faktycznie z tego korzystać.

**Key takeaways:**
- RFC 10008 standaryzuje QUERY jako metodę HTTP łączącą ciało żądania GET z bezpieczeństwem i idempotencją
- Pełna adopcja po stronie infrastruktury (CDN, proxy, przeglądarki) spodziewana w latach 2027-2028
- Nowy nagłówek `Accept-Query` pozwala serwerom ogłaszać wsparcie dla metody

**Why do I care:** Przez lata API design to był kompromis między semantyką a możliwościami. QUERY kończy tę wojnę dla endpointów czysto odczytowych. Z perspektywy architekta API, to otwiera możliwość projektowania zapytań analitycznych, filtrowania danych czy search w sposób, który wreszcie jest explicite i cacheowalny. Implementować za rok, kiedy biblioteki i CDN-y nadgonią.

**Link:** [HTTP Finally Gets the Method It Needed for Decades: Meet QUERY](https://medium.com/@pratikjadhav6632/http-finally-gets-the-method-it-needed-for-decades-meet-query-09ebb6173ba0)

---

## CSS writing-mode: pionowy tekst to nie tylko egzotyka

**TLDR:** Właściwość CSS `writing-mode` kontroluje orientację tekstu i kierunek, w którym układają się bloki. Jest szeroko obsługiwana we wszystkich nowoczesnych przeglądarkach i ma więcej zastosowań niż większość frontendowców myśli.

Większość z nas zna `writing-mode` jako "tę właściwość do japońskiego tekstu". I tak, pionowy tekst w językach CJK to główny use case w specyfikacji CSS Writing Modes Level 4. Ale to ograniczone podejście. Wartości takie jak `vertical-rl` i `vertical-lr` przydają się też przy bocznych etykietach w wykresach, pionowych nawigacjach w designie edytorskim, a `sideways-rl` i `sideways-lr` pozwalają obracać litery łacińskie bez utraty ich kształtu.

Co ważniejsze, `writing-mode` fundamentalnie zmienia to, jak CSS rozumie pojęcia "inline" i "block" w całym kontekście elementu. Flexbox, Grid, właściwości logiczne jak `margin-inline` czy `padding-block` wszystkie odnoszą się do osi zdefiniowanych przez `writing-mode`. Zmiana trybu pisania na pionowy sprawia, że "szerokość" staje się "wysokością" w sensie logicznym. To ważne przy tworzeniu komponentów reużywalnych, które mają działać w różnych kontekstach językowych.

CSS-Tricks przypomina w artykule o wartościach przestarzałych: `lr`, `rl`, `tb`, `lr-tb` i ich warianty były częścią starszej specyfikacji i nie powinny już być używane. Zamiast nich zawsze `horizontal-tb` lub `vertical-lr`. To ważne przy audycie starszych codebas, bo te wartości nadal działają w przeglądarkach, ale nie ma gwarancji co do ich przyszłości.

Osobną sprawą jest `text-orientation`, która działa razem z `writing-mode` i kontroluje jak indywidualne znaki są orientowane w pionie. Bez niej mieszane treści, na przykład liczby arabskie w pionowym japońskim tekście, wyglądają chaotycznie.

**Key takeaways:**
- `writing-mode` zmienia osie inline i block dla całego CSS layoutu, wpływa na Flexbox, Grid i właściwości logiczne
- Wartości `sideways-rl` i `sideways-lr` obracają litery łacińskie do pozycji pionowej zachowując ich kształt
- Stare wartości jak `lr`, `rl`, `tb` są deprecated i należy je zastąpić nowymi odpowiednikami

**Why do I care:** Tworzę komponenty od lat i rzadko sięgam po `writing-mode`, bo większość projektów jest monolingwalnych. Ale przy systemach design z ambicjami na globalizację, to właściwość, którą trzeba uwzględnić od razu w token systemie i komponentach bazowych. Naprawianie tego retroaktywnie w Flexbox layoutach to ból głowy. Dobry artykuł przypominający, że "logiczne właściwości CSS" mają sens tylko jeśli rozumiesz, skąd pochodzi ich logika.

**Link:** [writing-mode | CSS-Tricks](https://css-tricks.com/almanac/properties/w/writing-mode/)

---

## faster-qs: szybszy zamiennik biblioteki qs bez zmiany API

**TLDR:** Biblioteka `faster-qs` oferuje dramatycznie lepszą wydajność przy parsowaniu query stringów niż popularna biblioteka `qs`, zachowując przy tym kompatybilne API. Przy prostych zapytaniach jest ponad 17 razy szybsza.

Biblioteka `qs` jest wszędzie. Express, wiele frameworków webowych i mnóstwo kodu wewnętrznego używa jej do parsowania URL query stringów. Problem w tym, że `qs` nie był pisany z myślą o ekstremalnej wydajności. Był pisany z myślą o poprawności i pełnym wsparciu zagnieżdżonych struktur oraz tablic. To dobra biblioteka, ale na poziomie Node.js, gdzie każda milisekunda w obsłudze żądania ma znaczenie, może być wąskim gardłem.

`faster-qs` (różne od `qs-fast` z tytułu w daily.dev, ale podobne w założeniu) idzie w kierunku drop-in replacement. Benchmarki pokazują 17x szybsze parsowanie prostych zapytań i ponad 5x szybsze przy głęboko zagnieżdżonych obiektach. To nie są marginalne różnice. Na serwerze obsługującym tysiące żądań na sekundę, każde parsujące query string, te liczby przekładają się na realne oszczędności CPU i opóźnienia. Składnia jest identyczna, więc zamiana to kwestia zmiany jednego importu.

Warto jednak czytać "has most features" w opisie ostrożnie. "Większość funkcji" oznacza, że coś może nie działać. Zaawansowane opcje parsowania, niestandardowe dekodery, specyficzne zachowania przy edge cases mogą się różnić. Przed wdrożeniem na produkcję trzeba uruchomić własne testy z rzeczywistymi query stringami z systemu.

Cały ruch w kierunku szybszych zamienników popularnych bibliotek jest zdrowy. `fast-querystring`, `faster-qs`, `neoqs` to ekosystem odpowiedzi na fakt, że Node.js dojrzał i programiści zaczęli mierzyć gdzie faktycznie tracą czas. Zamiast przepisywać całą architekturę, można wymienić jeden moduł.

**Key takeaways:**
- `faster-qs` oferuje od 5x do 17x lepszą wydajność parsowania przy zachowaniu kompatybilnego API z biblioteką `qs`
- Drop-in replacement wymaga weryfikacji edge cases, bo nie wszystkie funkcje oryginalnego `qs` są obsługiwane
- Wymiana samego parsera query stringów może znacząco wpłynąć na throughput aplikacji Node.js

**Why do I care:** W aplikacjach z wysokim ruchem parsowanie query stringów to jeden z tych mikro-kosztów, które kumulują się. Nie piszę "wymień `qs` na `faster-qs` wszędzie natychmiast", ale jeśli profiling wskazuje że parsowanie URL jest problem, to jest gotowe rozwiązanie. Bardziej interesuje mnie pytanie: dlaczego `qs` jako standard nie ewoluuje w kierunku wydajności? Dobre pytanie do maintainerów.

**Link:** [GitHub - hans00/faster-qs](https://github.com/hans00/faster-qs)

---

## Wyścig benchmarków AI już się skończył. Wygrywa nudny model.

**TLDR:** Topowe benchmarki LLM są nasycone, a różnice między modelami na ich szczycie są statystycznie bez znaczenia. Prawdziwa walka przenosi się na specjalizację, koszt i dopasowanie do konkretnych zadań produkcyjnych.

MMLU i MMLU-Pro są nasycone powyżej 88% dla modeli frontier. GPT-5.2 i Claude Opus osiągają 100% na AIME 2025, bo test jest już za łatwy dla obecnych modeli. To oznacza, że headline benchmarks przestały pełnić swoją rolę. Mierzą tylko to, że model jest "wystarczająco dobry" w zadaniach ogólnych, a nie to, co jest istotne w produkcji.

Prawdziwy problem leży w przepaści między wynikami benchmarków a działaniem w środowisku produkcyjnym. Enterprise systemy agentyczne pokazują 37-procentową różnicę między wynikami laboratoryjnymi a rzeczywistą wydajnością wdrożeniową. Koszt jest kolejnym wymiarem, który benchmarki ignorują: zmienność kosztów rzędu 50x dla podobnej dokładności oznacza, że "najlepszy model" to zupełnie inne pojęcie w zależności od budżetu.

Wyścig benchmarków nie skończył się, bo AI się zatrzymało. Skończył się, bo benchmark jako instrument pomiarowy stał się zbyt słaby. Modele specjalizowane w konkretnych domenach, takich jak kodowanie, reasoning matematyczny czy ekstrakcja informacji, biorą poszczególne kategorie. Nie istnieje jeden model, który wygrywa wszystko. To wielodyscyplinarne zawody, nie jeden bieg.

Dla przeciętnego programisty pracującego z AI w projekcie, to dobra wiadomość. "Nudny model" który kosztuje mniej, odpowiada szybciej i działa przewidywalnie w wąskiej domenie, to lepszy wybór niż latest, greatest model który kosztuje fortunę i generuje imponujące odpowiedzi na pytania, które nigdy nie padną w produkcji. Dobór modelu powinien zaczynać się od wymagań, a nie od rankingów.

**Key takeaways:**
- Topowe benchmarki jak MMLU i AIME 2025 są nasycone, różnice między modelami frontier są statystycznie bez znaczenia
- Gap między wynikami benchmarków a produkcją sięga 37% w systemach agentycznych
- Wybór modelu powinien być oparty na konkretnym zadaniu, koszcie i przewidywalności, nie na ogólnych rankingach

**Why do I care:** Projekty, przy których pracuję, coraz częściej wybierają model nie na zasadzie "który jest najnowszy", ale "który daje najlepszy stosunek koszt/jakość dla tego konkretnego tasku". Wybieranie małego, taniego modelu do klasyfikacji i większego do generowania kodu to już standard w dojrzałych projektach. Benchmark race jest rozrywką dla dziennikarzy tech. Inżynierowie patrzą na tokeny na dolar i evals na własnych danych.

**Link:** [The AI benchmark race is already over. The boring model wins.](https://daily.dev/posts/fRpZ9nZ5F)

---

## Topcoat: fullstackowy framework dla Rusta od twórców Tokio

**TLDR:** Tokio-rs opublikowało Topcoat, eksperymentalny framework fullstack dla Rusta łączący server-side rendering, reaktywność po stronie klienta i wbudowany system komponentów. To wczesna odpowiedź Rusta na popularność frameworków jak Next.js.

Topcoat to projekt od ludzi stojących za Tokio, czyli de facto standardowym asynchronicznym runtime'em Rusta. To ważny sygnał. To nie jest kolejny eksperyment studenta, to próba zbudowania kompletnego frameworka webowego przez ekosystem, który poważnie traktuje Rust w aplikacjach webowych.

Framework działa na zasadzie server-first. Komponenty są async i mogą bezpośrednio odpytywać bazę danych bez oddzielnej warstwy API. To eliminuje całą kategorię boilerplate'u związanego z synchronizacją stanu klient-serwer. Reaktywność po stronie klienta jest realizowana przez `$(...)` wyrażenia kompilowane do JavaScript, bez WebAssembly i bez build steps. Routing jest wnioskowany ze struktury modułów. Wbudowane assets z content-hashed URLs, integracja Tailwind CSS bez Node.js, wsparcie htmx dla częściowych zamian HTML.

Nawiązania do shadcn/ui są celowe. Topcoat UI to biblioteka komponentów, które kopiuje się do projektu i modyfikuje. Nie ma blackbox dependencies. To filozofia "ty masz ten kod, nie my". Po kilku latach obserwowania jak shadcn zmienił podejście do komponentów w React, widzę, dlaczego ktoś chce to przenieść do Rusta.

Framework jest wczesny (2200 gwiazdek na GitHub, breaking changes spodziewane) i nie nadaje się do produkcji teraz. Ale kierunek jest interesujący: czy można zbudować fullstack framework dla Rusta, który jest produktywny jak Rails albo Laravel, a nie tylko techniczny dowód słuszności asynchronicznego I/O?

**Key takeaways:**
- Topcoat od twórców Tokio oferuje fullstack development w Rust bez oddzielnej warstwy API
- Reaktywność klienta przez wyrażenia kompilowane do JS, bez WebAssembly i bez build steps
- Framework jest wczesny i eksperymentalny, nienadający się do produkcji, ale ma obiecującą filozofię

**Why do I care:** Rust w web development to temat, który co kilka miesięcy wraca z nową propozycją. Większość jest albo zbyt niskopoziomowa (Axum, Actix), albo zbyt eksperymentalna. Topcoat trafia w lukę, bo próbuje być kompletnym frameworkiem fullstack, a nie tylko HTTP server. Nie przeprowadzam się do Rusta na frontend teraz, ale jeśli w ciągu roku Topcoat dojrzeje i pokaże real-world projekty, to rozmowa będzie ciekawsza. Obserwuję.

**Link:** [GitHub - tokio-rs/topcoat: A batteries-included framework for building web apps](https://github.com/tokio-rs/topcoat)
