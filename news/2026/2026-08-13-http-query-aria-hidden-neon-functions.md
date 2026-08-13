---
title: "HTTP QUERY, ukryty focus w modalach i funkcje tuż przy bazie danych"
excerpt: "Nowa metoda HTTP QUERY zmienia podejście do cache'owania zapytań, Chrome w końcu egzekwuje poprawną kolejność zamykania modali, a Neon uruchamia backendowe funkcje bezpośrednio przy bazie Postgres."
publishedAt: "2026-08-13"
slug: "http-query-aria-hidden-neon-functions"
hashtags: "#dailydev #http #accessibility #postgresql #serverless #generated #pl"
source_pattern: "daily.dev"
---

## HTTP QUERY wystartowało, a cache o tym nie wie

**TLDR:** RFC 10008 wprowadza metodę HTTP QUERY, pierwszą nową metodę HTTP od czasu PATCH w 2010 roku. Łączy bezpieczeństwo i cache'owalność GET z możliwością przesyłania ciała żądania jak w POST, ale infrastruktura cache'ująca (przeglądarki, CDN-y) jeszcze tego nie ogarnia.

**Summary:** Problem, który QUERY rozwiązuje, jest znany każdemu, kto kiedykolwiek próbował przekazać złożony filtr wyszukiwania w parametrach URL. GET jest bezpieczny i cache'owalny, ale ogranicza nas do długości query stringa. POST przyjmie dowolnie duże ciało żądania, ale z definicji nie jest ani bezpieczny, ani cache'owalny, więc każde takie zapytanie uderza prosto w backend. RFC 10008 zamyka tę lukę, definiując metodę, która zachowuje się jak GET pod względem semantyki (bezpieczna, idempotentna, cache'owalna), ale niesie ze sobą pełnoprawne ciało żądania jak POST.

Diabeł tkwi w szczegółach implementacyjnych, a te akurat są dość brutalne. Żeby cache'ować odpowiedź na QUERY, trzeba kluczować cache nie tylko po URL, ale też po treści ciała żądania i powiązanych metadanych. To wymaga zmian w logice, którą większość CDN-ów miała utrwaloną od lat. Artykuł wprost wskazuje CloudFront jako przykład usługi, która domyślnie dopuszcza tylko siedem stałych metod HTTP, więc QUERY po prostu przez nią nie przejdzie bez dodatkowej konfiguracji. Podobnie przeglądarki, fetch normalizuje wielkość liter tylko dla sześciu znanych metod, więc QUERY zapisane małymi literami może zostać potraktowane inaczej niż oczekujemy.

RFC przewidziało jednak sensowną furtkę na czas przejściowy. Serwer może odpowiedzieć na QUERY nagłówkiem Content-Location wskazującym na odpowiadający, cache'owalny URL typu GET. Dzięki temu istniejąca infrastruktura cache'ująca może obsłużyć taką odpowiedź tak, jakby była zwykłym GET-em, bez żadnych zmian po stronie CDN-a czy przeglądarki. To pragmatyczne rozwiązanie na czas, zanim ekosystem dogoni specyfikację.

Co do kosztów praktycznych, CORS preflight dla QUERY zazwyczaj nie jest droższy niż ten, który i tak już płacimy przy POST z JSON-em, więc to nie jest argument przeciwko migracji. Prawdziwym zagrożeniem są niewidoczne allowlisty na brzegu sieci, które po cichu odrzucają nieznane metody, zamiast zwrócić czytelny błąd. Rekomendacja z artykułu jest rozsądna i stopniowa, używać QUERY już teraz w komunikacji serwer-serwer, gdzie kontrolujemy obie strony, dodawać ją obok POST w publicznych API jako opcję, a dla endpointów wystawionych bezpośrednio na przeglądarkę polegać na mechanizmie Content-Location, dopóki wsparcie natywne nie dojrzeje.

**Key takeaways:**
- RFC 10008 wprowadza HTTP QUERY, pierwszą nową metodę HTTP od PATCH w 2010 roku.
- QUERY jest bezpieczne i cache'owalne jak GET, ale przenosi ciało żądania jak POST.
- Cache musi kluczować odpowiedzi po ciele żądania i metadanych, czego większość CDN-ów jeszcze nie robi domyślnie.
- Mechanizm Content-Location pozwala przekierować cache'owanie na klasyczny GET jako rozwiązanie przejściowe.
- Bezpieczna droga wdrożenia to najpierw ruch serwer-serwer, potem publiczne API obok POST, na końcu endpointy przeglądarkowe.

**Why do I care:** Nowe metody HTTP pojawiają się raz na dekadę, więc warto się tym w ogóle przejąć, ale ja podchodzę do tego z chłodną głową. Mam za sobą zbyt wiele wdrożeń, w których teoretycznie eleganckie rozwiązanie z RFC rozbijało się o rzeczywistość jakiegoś starego load balancera albo firmowego proxy, które nie zna nic poza GET, POST i może jeszcze PUT. Zanim ktokolwiek zacznie masowo przepisywać endpointy wyszukiwania na QUERY, sprawdziłbym dokładnie całą ścieżkę sieciową, od przeglądarki, przez WAF, po CDN i load balancer, bo w tym łańcuchu wystarczy jedno ogniwo ignorujące nieznaną metodę, żeby całość ucichła bez żadnego błędu. Na razie widzę to jako ciekawe narzędzie do wewnętrznej komunikacji między usługami, a nie coś, co wrzucę do publicznego API w tym roku.

**Link:** [HTTP QUERY Shipped. Your Cache Did Not Get the Memo](https://daily.dev/posts/wdoFGRSq3)

## Zablokowany aria-hidden: ostrzeżenie ma rację, a każda znaleziona przez ciebie poprawka jest błędna

**TLDR:** Ostrzeżenie Chrome o zablokowanym aria-hidden na elemencie, którego potomek zachował fokus, nie jest fałszywym alarmem, tylko sygnałem realnego błędu w kolejności operacji podczas zamykania modali. Popularne obejścia, blur() bez dalszych kroków, setTimeout, usunięcie aria-hidden czy modal={false}, nie naprawiają problemu, tylko go maskują kosztem użytkowników czytników ekranu.

**Summary:** Sedno sprawy jest zaskakująco proste, choć konsekwencje bywają dotkliwe. Kod aplikacji ukrywa region strony za pomocą aria-hidden w momencie, gdy fokus wciąż znajduje się wewnątrz tego regionu. Powstaje wtedy coś, co autor nazywa duchowym fokusem, element techniczne jest wciąż fokusowalny, ale niewidzialny dla technologii wspomagających. Przeglądarka Chrome po cichu naprawiła obsługę tego przypadku już około 2020 roku, ale dopiero od wersji 127 zaczęła głośno o tym ostrzegać przy otwieraniu, a od wersji 131 także przy zamykaniu modali. To nie jest nowy bug w Chrome, to ujawnienie starego długu technicznego, który leżał ukryty w niezliczonych implementacjach modali.

Najbardziej frustrujący fragment artykułu dotyczy tego, co programiści robią, gdy zobaczą to ostrzeżenie w konsoli. Wywołanie blur() na aktywnym elemencie bez przekazania fokusu gdziekolwiek dalej owszem, czyści ostrzeżenie, ale fokus ląduje na elemencie body. Użytkownik czytnika ekranu słyszy wtedy ciszę albo tytuł strony i musi ręcznie tabulować od samego początku dokumentu, żeby wrócić tam, gdzie był. To bezpośrednie naruszenie WCAG 2.4.3 dotyczącego kolejności fokusu, czyli dokładnie odwrotność tego, co miało być naprawione. Podobnie działa dodanie sztucznego opóźnienia przez setTimeout, ono nie usuwa błędu kolejności, tylko przesuwa go w czasie na tyle, że konsola przestaje narzekać.

Poprawne rozwiązanie, opisane jako czterokrokowy kontrakt teardown, wygląda inaczej niż większość znalezionych w internecie łatek. Najpierw trzeba usunąć atrybut inert z tła strony, potem synchronicznie przywrócić fokus na element, który otworzył modal, następnie nałożyć inert, a nie aria-hidden, na zamykającą się nakładkę, żeby mogła się bezpiecznie animować bez ryzyka przechwycenia fokusu, a na końcu odmontować ją dopiero po zdarzeniu transitionend. Artykuł zawiera zarówno implementację w czystym JavaScript, jak i w React, a do tego tabelę porównującą natywny element dialog, React Aria, Radix, Bootstrap i Floating UI pod kątem tego, jak dobrze radzą sobie z tym konkretnym scenariuszem.

Nie brakuje też przypadków brzegowych, które w praktyce potrafią zepsuć nawet poprawną implementację, usunięty w międzyczasie element wyzwalający modal, modale ułożone jeden na drugim, przejście użytkownika do innej karty w trakcie animacji zamykania czy zerowy czas trwania przejścia CSS. Autor dołączył działające demo z czterema wariantami implementacji, co jest szczególnie przydatne, bo teoria kolejności operacji na fokusie brzmi prosto, dopóki nie zderzy się z asynchronicznością animacji i zdarzeń DOM.

**Key takeaways:**
- Ostrzeżenie Chrome o zablokowanym aria-hidden wskazuje realny błąd kolejności operacji, a nie fałszywy alarm.
- Popularne obejścia (blur, setTimeout, usunięcie aria-hidden, modal={false}) łamią dostępność zamiast ją naprawiać.
- Poprawna sekwencja to usunięcie inert z tła, synchroniczny powrót fokusu, nałożenie inert na zamykaną nakładkę, dopiero potem odmontowanie po transitionend.
- Chrome 127 ostrzega przy otwieraniu modali, Chrome 131 przy ich zamykaniu.
- Biblioteki takie jak React Aria, Radix czy natywny dialog różnią się skutecznością w obsłudze tego scenariusza.

**Why do I care:** Ten artykuł trafia w coś, co widzę regularnie podczas przeglądu kodu, deweloperzy traktują ostrzeżenia konsoli jako przeszkodę do wyciszenia, a nie jako informację o realnym problemie. Kuszące jest wklejenie pierwszego rozwiązania ze Stack Overflow, które usuwa czerwony tekst z konsoli, ale w przypadku dostępności taka droga na skróty oznacza realnie zepsute doświadczenie dla kogoś, kto korzysta z czytnika ekranu, czyli dla użytkownika, którego nikt w zespole nie zobaczy podczas testów manualnych. To dobry przykład na to, dlaczego traktowanie ostrzeżeń przeglądarki jako źródła prawdy, a nie przeszkody, oszczędza później znacznie więcej czasu niż maskowanie objawu. Warto też zapamiętać rozróżnienie między inert a aria-hidden, bo w praktyce widziałem je używane zamiennie, a różnica ma bezpośrednie znaczenie dla tego, czy element pozostaje przypadkowo fokusowalny.

**Link:** [Blocked aria-hidden: The Warning is Right, and Every Fix You've Found is Wrong](https://daily.dev/posts/doyZWkaIS)

## Neon Functions: logika backendowa tuż przy danych

**TLDR:** Neon uruchomił Functions, warstwę obliczeniową opartą na Node.js 24, która działa bezpośrednio na branchu Postgresa w tym samym regionie co baza danych, z automatycznie wstrzykiwanymi poświadczeniami. W przeciwieństwie do typowych funkcji Lambda są długożyjące, więc obsługują pętle narzędziowe agentów, WebSockety i SSE, i tak jak reszta stosu Neon, dziedziczą mechanizm branchowania.

**Summary:** Pomysł stojący za Neon Functions jest prosty do opisania, choć jego konsekwencje są dość istotne dla architektury backendu. Zamiast wystawiać funkcję gdzieś w chmurze, która łączy się z bazą danych przez publiczny internet, Neon pozwala uruchomić kod obliczeniowy dosłownie obok bazy, w tym samym regionie, na tym samym branchu Postgresa. DATABASE_URL i inne poświadczenia backendowe, dostęp do Object Storage, AI Gateway, Auth, są wstrzykiwane automatycznie, więc znika cała klasa problemów związanych z zarządzaniem sekretami i opóźnieniami sieciowymi między funkcją a bazą.

Największa różnica względem klasycznego modelu serverless typu Lambda dotyczy czasu życia funkcji. Neon Functions nie są krótkotrwałymi handlerami wywoływanymi na pojedyncze żądanie i zabijanymi zaraz potem, tylko procesami długożyjącymi, które mogą utrzymywać połączenia WebSocket, strumieniować odpowiedzi SSE przez wiele minut albo obsługiwać pętle narzędziowe agentów AI, które z natury nie mieszczą się w limitach czasowych typowych funkcji edge. To jest bezpośrednia odpowiedź na to, jak wygląda dzisiejsze obciążenie backendów budowanych wokół agentów LLM, gdzie pojedyncza interakcja może trwać znacznie dłużej niż klasyczne żądanie REST.

Mechanizm branchowania, który jest sercem Neona jako produktu, obejmuje teraz również funkcje. Tworzenie brancha bazy danych automatycznie tworzy izolowaną kopię funkcji działającej na tym branchu, co w praktyce oznacza pełne środowisko testowe czy deweloperskie gotowe do użycia jednym poleceniem, razem z kodem i danymi w spójnym stanie. Funkcje deklaruje się w pliku neon.ts, będącym częścią podejścia backend-as-code promowanego przez Neon, a każdy moduł eksportujący handler fetch(request) jest gotowy do wdrożenia. Zespół Neon rekomenduje Hono jako framework do budowania takich handlerów oraz przestrzega przed użyciem edge'owego sterownika @neondatabase/serverless wewnątrz funkcji, zamiast tego sugerując zwykły pg Pool utworzony raz na poziomie modułu i wielokrotnie wykorzystywany, co ma sens, skoro funkcja i tak żyje długo.

Warto jasno powiedzieć, do czego Neon Functions nie są przeznaczone. To nie jest miejsce na hostowanie całych frontendów ani na zadania w tle, każda funkcja musi zwrócić odpowiedź webową w postaci JSON-a, strumienia, SSE albo upgrade'u do WebSocketu. Dla pracy kolejkowej autorzy sugerują sparowanie z narzędziem takim jak Inngest. Wsparcie dla harmonogramów czasowych i wyzwalaczy zdarzeniowych, cron, zdarzenia storage, zdarzenia auth czy bazy danych, jest zapowiedziane, ale jeszcze niedostępne. Na razie funkcje są darmowe w ramach bety, co jest dobrym momentem, żeby je wypróbować bez presji kosztowej.

**Key takeaways:**
- Neon Functions to Node.js 24 uruchamiany bezpośrednio na branchu Postgresa, w tym samym regionie co baza.
- Poświadczenia (DATABASE_URL, Object Storage, AI Gateway, Auth) są wstrzykiwane automatycznie.
- Funkcje są długożyjące, obsługują WebSockety, SSE i wielominutowe pętle agentów AI, w odróżnieniu od krótkotrwałych handlerów Lambda.
- Branchowanie bazy danych automatycznie tworzy izolowaną kopię powiązanej funkcji.
- Rekomendowany jest pg Pool zamiast sterownika edge'owego, a zadania w tle i harmonogramy trzeba na razie realizować przez zewnętrzne narzędzia typu Inngest.

**Why do I care:** Ten kierunek wydaje mi się bardziej interesujący niż kolejna platforma serverless, bo atakuje realny problem architektoniczny, czyli opóźnienie i złożoność operacyjną wynikające z rozdzielenia warstwy obliczeniowej od danych. Przez lata budowaliśmy systemy, w których funkcja edge w jednym regionie łączy się z bazą danych w zupełnie innym, płacąc za to każdym pojedynczym zapytaniem, a Neon proponuje po prostu przesunięcie obliczeń tam, gdzie dane już są. Szczególnie doceniam szczerość w komunikacji, jasne postawienie granicy, że to nie jest narzędzie do zadań w tle ani do hostowania frontendu, zamiast prób sprzedania jednego produktu jako rozwiązania na wszystko. Model długożyjących funkcji dobrze pasuje do świata agentów AI, gdzie sesja z modelem może trwać dłużej niż jakikolwiek rozsądny limit czasowy klasycznej funkcji Lambda, więc jeśli budujecie coś w tym kierunku, warto to śledzić, mimo że beta zawsze niesie ze sobą ryzyko zmian API.

**Link:** [Neon Functions: backend logic next to your data](https://daily.dev/posts/zSp0CcEJK)
