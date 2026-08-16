---
title: "CSS dla oka, boty na serwerze i granice architektury real-time: przegląd Frontend Focus #754"
excerpt: "Przegląd jedenastu artykułów z Frontend Focus #754, od typografii CSS i dark mode UX po architekturę HTML-over-WebSockets i testy wycieku pamięci w SPA."
publishedAt: "2026-08-13"
slug: "css-typography-tricks-bots-websockets-frontend-focus-754"
hashtags: "#frontendfocus #css #html #accessibility #performance #websockets #ai #generated #pl"
source_pattern: "Frontend Focus"
---

## Pięć właściwości CSS, które warto znać przy projektowaniu tekstu

**TLDR:** Autor zebrał pięć mniej oczywistych właściwości CSS, background-clip, vertical-align razem z align-content, box-decoration-break, letter-spacing i text-combine-upright, które pozwalają nadać tekstowi charakter bez sięgania po obrazki czy JavaScript. Każda z nich rozwiązuje inny, konkretny problem typograficzny.

**Summary:** Tekst zaczyna się od najbardziej efektownej sztuczki, czyli background-clip: text, znanej już od dawna, ale wciąż niedocenianej. Wystarczy ustawić kolor tekstu na transparentny i podpiąć obraz lub gradient jako tło, a litery stają się oknem na ten obraz. To rozwiązanie czysto deklaratywne, bez canvasa i bez SVG, i działa świetnie w nagłówkach czy logotypach. Ciekawszy jest jednak rozdział o align-content kontra vertical-align. Przez lata programiści mylili te dwie właściwości, bo nazwa vertical-align sugeruje wyrównanie tekstu w pionie, a w rzeczywistości dotyczy ona wyrównania elementów inline względem linii tekstu, czyli dziedzictwa po tabelach HTML. Prawdziwe pionowe centrowanie treści w bloku od niedawna daje align-content, które działa nawet bez flexboksa i grida. To jedna z tych rzeczy, które warto raz zapamiętać, bo oszczędza mnóstwo czasu spędzonego na szukaniu w Stack Overflow.

Kolejna właściwość, box-decoration-break, rozwiązuje problem, który większość z nas ignorowała latami, czyli brzydkie, niespójne krawędzie tekstu łamanego w wielu liniach, gdy stosujemy obramowania czy cienie. Ustawienie clone sprawia, że każdy fragment linii dostaje pełny zestaw dekoracji, jakby był osobnym, zamkniętym elementem. To detal, ale w projektach z podkreśleniami w stylu markera czy tłem przypominającym zakreślacz robi ogromną różnicę wizualną. Autor pokazuje też letter-spacing w kontekście animacji, nie tylko jako statyczny odstęp między znakami. Animowanie tej właściwości od wartości ujemnej do zera, w połączeniu z przezroczystym kolorem tekstu i first-letter, daje efekt stopniowego odsłaniania napisu, co bywa używane w intrach czy sekcjach hero.

Ostatnia pozycja, text-combine-upright, jest niszowa dla większości zachodnich projektów, bo dotyczy typografii pionowej używanej we wschodnioazjatyckich językach. Ale nawet jeśli nie robimy stron w trybie writing-mode: vertical-lr, warto wiedzieć, że to narzędzie istnieje, bo prędzej czy później trafi się projekt z wymaganiami lokalizacyjnymi, gdzie się przyda.

**Key takeaways:**
- background-clip: text pozwala wypełnić litery obrazem lub gradientem bez JavaScriptu i canvasa.
- align-content zastępuje flexboksa i grida przy prostym pionowym centrowaniu tekstu w bloku.
- box-decoration-break: clone naprawia niespójne krawędzie dekoracji na złamanych liniach tekstu.
- letter-spacing w animacji daje efekt odsłaniania tekstu, nie tylko statyczny odstęp.
- text-combine-upright jest niezbędne przy typografii pionowej w projektach z językami wschodnioazjatyckimi.

**Why do I care:** Lubię takie zestawienia, bo pokazują, że CSS wciąż ma zakamarki, które omijamy z przyzwyczajenia, mimo że rozwiązują realne problemy prościej niż nasze własne obejścia z dodatkowymi divami i JavaScriptem. Szczególnie rozróżnienie vertical-align i align-content powinno wejść do każdego onboardingu juniorów, bo widziałem dziesiątki godzin stracone na próbach wycentrowania tekstu w pionie starymi metodami. To nie jest rewolucyjna wiedza, ale dokładnie taka, która odróżnia płynne kodowanie w CSS od ciągłego kopiowania fragmentów z internetu.

**Link:** [5 CSS Properties You Should Know for Better Text Designs](https://master.dev/blog/typographic-css-tricks/)

## 99 procent ruchu na mojej stronie to boty

**TLDR:** Właściciel bazy danych filantropów PatronView opisuje rok walki z botami, od chińskich sieci proxy przez crawler Amazona czytający 117 tysięcy stron dziennie po odkrycie, że własny skrypt CAPTCHA kosztował więcej wydajności niż cała reszta strony. Kończy zestawem reguł Cloudflare, które każdy może skopiować.

**Summary:** Liczby w tym tekście robią wrażenie same w sobie. Na 1,28 miliona pełnych stron wygenerowanych w tydzień, analityka oparta na JavaScript zarejestrowała niecałe 6 tysięcy realnych odsłon. Innymi słowy, jeśli patrzysz wyłącznie na Plausible, Fathom czy Google Analytics, nie widzisz w ogóle tego, co faktycznie obciąża twój serwer, bo boty prawie nigdy nie wykonują JavaScriptu. Autor pokazuje to na konkretnym przykładzie z 22 kwietnia, kiedy jego strona przyjęła 3,6 miliona zapytań z 361 tysięcy unikalnych adresów IP, głównie z Chin, co skończyło się zablokowaniem całego kraju na poziomie Cloudflare.

Najciekawszy fragment dotyczy stosunku liczby zeskrobanych stron do liczby przekierowanych użytkowników. Dla Googlebota to 46 do 1, dla Binga 406 do 1, ale dla crawlera wyszukiwania Anthropica autor zmierzył 35 tysięcy do 1, czyli crawler przeczytał 420 tysięcy stron w tygodniu, w którym przekierował na stronę 12 realnych osób. Amazon wypadł jeszcze gorzej, bo jego bot w ogóle nie przekierowuje ruchu, więc stosunek wychodzi nieskończony. Autor nie jest przy tym hipokrytą, bo sam otwarcie pisze, że jego serwis też zbiera dane przez scraping publicznych dokumentów podatkowych, tylko robi to kilka razy w roku, a nie tysiące razy dziennie.

Osobny wątek dotyczy błędu, który wielu z nas popełnia bez świadomości, czyli traktowania własnego skryptu antybotowego jako oczywistego kosztu. Skrypt Cloudflare JavaScript Detections kosztował 2875 milisekund na średniej klasy telefonie, podczas gdy cały JavaScript strony wykonywał się w 278 milisekund. Po wyłączeniu tej funkcji wynik Lighthouse skoczył z 58 do 99 w ciągu godziny. To otrzeźwiające przypomnienie, że zabezpieczenia też trzeba mierzyć, a nie tylko włączać i zapominać.

Reszta tekstu to praktyczny przepis na reguły firewalla, blokowanie krajów, blokowanie konkretnych crawlerów po nazwie, wyzwania dla starych wersji przeglądarek zamrożonych w czasie przez boty korzystające z przestarzałych toolkitów, oraz limitowanie liczby żądań na adres IP. Autor uczciwie przyznaje, że rezydencjalne botnety, czyli ruch przepuszczany przez prawdziwe domowe łącza internetowe wynajmowane od firm proxy, praktycznie nie dają się zablokować na poziomie sieci, bo wyglądają identycznie jak prawdziwi użytkownicy.

**Key takeaways:**
- Statystyki oparte na JavaScript, takie jak Google Analytics czy Plausible, mogą pokazywać mniej niż jeden procent realnego ruchu na serwer.
- Stosunek liczby zeskrobanych stron do liczby przekierowanych użytkowników to praktyczna metryka do oceny, czy dany crawler w ogóle się opłaca.
- Blokowanie po ASN i zakresie sieci działa lepiej niż blokowanie po pojedynczym adresie IP, bo adresy się rotują.
- Wyzwanie zamiast twardej blokady pozwala mierzyć skuteczność reguły przez współczynnik rozwiązanych CAPTCHA.
- Rezydencjalne botnety, korzystające z wynajętych domowych łączy, są praktycznie nie do odróżnienia od prawdziwych użytkowników na poziomie sieci.

**Why do I care:** Ten artykuł powinien być obowiązkową lekturą dla każdego, kto uważa, że jego mała strona nie jest celem dla botów. Sam wielokrotnie widziałem klientów zaskoczonych rachunkiem za hosting po tym, jak jakiś crawler AI zaczął odpytywać każdy endpoint po kolei. Podoba mi się też uczciwość autora, który nie demonizuje wszystkich botów, tylko rozdziela te przynoszące realną wartość od tych, które tylko zabierają zasoby. To pragmatyczne podejście, jakiego brakuje w wielu dyskusjach o AI i internecie, gdzie łatwiej o skrajne opinie niż o policzenie realnego kosztu.

**Link:** [99% of My Website Traffic Is Bots](https://patronview.com/news/99-percent-of-my-website-traffic-is-bots/)

## Baseline Alerts: powiadomienia o dojrzewaniu funkcji webowych

**TLDR:** Google dodał do panelu Web Platform Status funkcję subskrypcji, dzięki której dostajesz mailem albo przez webhook Slacka informację, kiedy dana funkcja przeglądarki osiąga status Baseline. Można subskrybować pojedynczą funkcję, całą grupę technologii albo zapisane wyszukiwanie.

**Summary:** Do tej pory śledzenie tego, kiedy funkcja CSS czy API przeglądarki stała się wystarczająco wspierana, żeby bezpiecznie jej używać, wymagało ręcznego zaglądania na stronę webstatus.dev co jakiś czas albo liczenia na to, że ktoś napisze o tym w mediach społecznościowych. Baseline Alerts zmienia to w model push zamiast pull. Po zalogowaniu przez GitHub można subskrybować konkretną funkcję, na przykład JPEG XL, całą kategorię jak wszystkie funkcje CSS, albo dowolne zapisane zapytanie zbudowane w składni tego narzędzia. Powiadomienia można ustawić na cztery typy zdarzeń, wejście w stan szeroko dostępny, wejście w stan nowo dostępny, nową implementację w kolejnej przeglądarce albo regresję do ograniczonej dostępności, i wybrać częstotliwość, od razu, co tydzień albo co miesiąc.

Ciekawym pomysłem opisanym w artykule jest wykorzystanie zapisanych wyszukiwań do budowania czegoś w rodzaju osobistego newslettera technicznego, gdzie zamiast czekać na cudzy przegląd nowości, sam definiujesz zakres tematów, które cię interesują, i dostajesz maila tylko wtedy, gdy coś realnie się zmienia. Zapisane wyszukiwania da się też udostępniać przez link albo kod QR, co czyni je wygodnym narzędziem dla twórców treści technicznych, którzy chcą pokazać widowni konkretny zestaw funkcji bez tłumaczenia całej terminologii Baseline od zera.

Integracja z webhookami Slacka to dodatek, który zamienia to narzędzie z osobistej ciekawostki w coś przydatnego dla całego zespołu frontendowego. Wystarczy dodać URL webhooka w sekcji kanałów powiadomień i podpiąć go pod subskrypcję, żeby zespół dostawał aktualizacje bezpośrednio na kanał, na którym omawia się decyzje technologiczne.

**Key takeaways:**
- Subskrypcje można ustawiać na poziomie pojedynczej funkcji, grupy technologii albo dowolnego zapisanego zapytania.
- Powiadomienia obejmują cztery typy zdarzeń, w tym regresję funkcji do ograniczonej dostępności.
- Częstotliwość powiadomień da się dopasować, od razu, co tydzień albo co miesiąc.
- Zapisane wyszukiwania można udostępniać przez link lub kod QR, co ułatwia dzielenie się listą funkcji z zespołem lub widownią.
- Webhooki Slacka pozwalają wpiąć powiadomienia bezpośrednio w kanał zespołowy.

**Why do I care:** To jedna z tych drobnych, ale realnie użytecznych funkcji, które ułatwiają życie bez rewolucji. Sam regularnie zapominałem sprawdzać status jakiejś funkcji CSS, którą planowaliśmy wdrożyć, dopóki ktoś w zespole nie natknął się na nią przypadkiem miesiąc później. Automatyczne powiadomienia zamiast ręcznego sprawdzania to dokładnie ten rodzaj automatyzacji, który oszczędza czas bez dodawania kolejnego narzędzia do monitorowania. Chciałbym tylko, żeby więcej zespołów faktycznie z tego korzystało, bo sama dostępność takiej funkcji nie gwarantuje, że ktokolwiek ją włączy.

**Link:** [Introducing Baseline Alerts](https://web.dev/blog/baseline-alerts)

## Przełamywanie blokady osi przewijania dzięki scroll-axis-lock: none

**TLDR:** Nowa właściwość CSS scroll-axis-lock pozwala wyłączyć domyślne blokowanie przewijania do jednej osi, znane jako railing, dzięki czemu użytkownik może od razu przewijać po przekątnej. Jest już wspierana w Chromium 153, ale nie w Firefoksie ani Safari.

**Summary:** Większość przeglądarek od lat stosuje mechanizm, który wykrywa, że gest użytkownika jest w praktyce jednoosiowy, na przykład przewijanie prawie wyłącznie w pionie z niewielkim odchyleniem w poziomie, i na tej podstawie ignoruje te drobne odchylenia, blokując przewijanie do jednej osi. W większości przypadków to dobre rozwiązanie, bo zapobiega przypadkowemu przewinięciu w bok podczas czytania długiego artykułu. Problem pojawia się w interfejsach typu mapa albo powiększanie obrazu, gdzie użytkownik naprawdę chce przewijać po przekątnej od pierwszego ruchu, a blokada osi zmusza go do rozpoczynania gestu pod specyficznym kątem, żeby jej uniknąć.

Autor pokazuje różnice między przeglądarkami bardzo konkretnie, Safari i Firefox na macOS blokują oś bardzo rygorystycznie, dając efekt przypominający rysowanie na Etch A Sketch, podczas gdy Chrome stara się wierniej odzwierciedlać intencję użytkownika, choć wciąż stosuje pewną blokadę. Na urządzeniach dotykowych sytuacja jest odwrócona, bo Safari na iOS w ogóle nie blokuje osi, a Chrome na Androidzie owszem. Nowa właściwość scroll-axis-lock przyjmuje dwie wartości, auto jako domyślne zachowanie zależne od przeglądarki, oraz none, które całkowicie wyłącza blokadę i sprawia, że kontener przewijania wiernie podąża za dokładnym wejściem użytkownika.

To rozwiązanie klasy progresywnego ulepszenia, bo deklaracja scroll-axis-lock: none nic nie psuje w przeglądarkach, które jej nie obsługują, więc można ją stosować już dziś bez dodatkowego wykrywania funkcji. Jeśli jednak potrzebujesz warunkowo ładować alternatywny kod, dostępne jest zarówno @supports w CSS, jak i CSS.supports() w JavaScript.

**Key takeaways:**
- scroll-axis-lock: none wyłącza domyślne blokowanie przewijania do jednej osi, przydatne w interfejsach map i powiększania obrazów.
- Zachowanie domyślne (auto) różni się znacząco między przeglądarkami, Safari i Firefox na macOS blokują oś bardziej rygorystycznie niż Chrome.
- Wsparcie na razie ograniczone jest do Chromium 153, bez wsparcia w Firefoksie i Safari.
- Właściwość można stosować już dziś jako progresywne ulepszenie, bez ryzyka złamania działania w innych przeglądarkach.
- Feature detection jest możliwe przez @supports w CSS albo CSS.supports() w JavaScript, jeśli potrzebna jest alternatywna ścieżka kodu.

**Why do I care:** To dokładnie ten typ funkcji CSS, o który nikt głośno nie prosił, ale która natychmiast rozwiąże frustrację, jeśli kiedykolwiek próbowałeś zbudować własny komponent mapy albo galerii ze swobodnym panoramowaniem. Wcześniej jedynym rozwiązaniem było przechwytywanie zdarzeń wskaźnika i ręczne liczenie deltas, co zawsze kończyło się niespójnością między urządzeniami. Szkoda tylko, że jak zwykle to Chromium idzie pierwsze, a reszta dogania w swoim tempie, więc realne zastosowanie produkcyjne poczeka jeszcze jakiś czas.

**Link:** [Unlock Immediate Diagonal Scrolling with CSS scroll-axis-lock: none](https://www.bram.us/2026/08/09/unlock-diagonal-scrolling-with-css-scroll-axis-lock-none/)

## Przełączniki trybu ciemnego: dwa stany w zupełności wystarczą

**TLDR:** Autorka argumentuje, że mimo iż logika trybu jasny/ciemny/systemowy wymaga trzech stanów wewnętrznie, w interfejsie użytkownika wystarczy pokazać dwa, bo użytkownicy nie szukają przełącznika po to, żeby zadeklarować intencję na przyszłość, tylko żeby naprawić dyskomfort tu i teraz. Dobrze zaprojektowany dwustanowy przełącznik potrafi wciąż odzwierciedlać wszystkie trzy stany danych pod spodem.

**Summary:** Argument zaczyna się od rozróżnienia między modelem danych a modelem interfejsu. To, że pod spodem trzeba przechowywać trzy wartości, jasny, ciemny i systemowy, nie oznacza, że użytkownik musi widzieć wszystkie trzy naraz. Autorka porównuje to do kranu z osobnymi pokrętłami na wodę zimną i ciepłą kontra kranu z jedną dźwignią regulującą przepływ i temperaturę jednocześnie, gdzie ten drugi jest łatwiejszy w użyciu mimo tego samego modelu fizycznego pod spodem. Kluczowa obserwacja jest taka, że użytkownik odwiedzający stronę nie przychodzi po to, żeby przetestować motyw, tylko żeby coś przeczytać, obejrzeć albo kupić, a przełącznik motywu włącza się dopiero wtedy, gdy coś w wyglądzie strony przeszkadza mu w tym celu.

Najbardziej praktyczna część tekstu opisuje, jak zbudować dwustanowy przełącznik, który mimo prostoty wciąż poprawnie obsługuje stan systemowy. Zasada jest taka: gdy strona podąża za preferencją systemową i nic nie jest zapisane w local storage, przełącznik pokazuje aktualnie rozwiązaną wartość, a po kliknięciu zapisuje jawny override na przeciwną wartość. Kolejne kliknięcie, jeśli ten override akurat pokrywa się z aktualną preferencją systemową, usuwa zapisaną wartość i wraca do trybu systemowego. Autorka podkreśla jeden subtelny, ale ważny błąd implementacyjny, mianowicie że nie wolno automatycznie czyścić zapisanego override'u tylko dlatego, że akurat zaczął się pokrywać z ustawieniem systemowym, bo część użytkowników ma system skonfigurowany na automatyczne przełączanie w zależności od pory dnia, i przedwczesne czyszczenie zamieniłoby ich świadomy wybór w coś, co znika bez ostrzeżenia.

Tekst rozprawia się też z typowym argumentem obrończym za trzema stanami, czyli że użytkownik mógłby się pogubić, gdy jego wybór przestanie się zgadzać z systemem po jego zmianie. Autorka pokazuje na konkretnym scenariuszu, że taka sytuacja naprawia się jednym kliknięciem i zdarza się co najwyżej raz, więc nie usprawiedliwia trwałego skomplikowania interfejsu. Na końcu wskazuje dwa uzasadnione przypadki dla trójstanowego przełącznika, panel ustawień odseparowany od głównego interfejsu, gdzie użytkownik już jest w trybie podejmowania decyzji na przyszłość, oraz sytuację, w której sam wygląd trybu jasnego czy ciemnego różni się w zależności od ustawienia systemowego, co dziś prawie nikt nie implementuje.

**Key takeaways:**
- Model danych z trzema stanami nie wymaga interfejsu z trzema widocznymi opcjami, dobry dwustanowy przełącznik potrafi odzwierciedlić wszystkie trzy.
- Zapisany override nie powinien być automatycznie kasowany, gdy zacznie się pokrywać z preferencją systemową, ocena powinna następować tylko przy interakcji użytkownika.
- Rozwiązania trójstanowe wyświetlane jako trzy ikony obok siebie albo jako rozwijana lista zwiększają obciążenie poznawcze i zajmują więcej miejsca na ekranie.
- Panel ustawień odseparowany od głównego interfejsu to jeden z niewielu uzasadnionych przypadków dla widocznego trójstanowego przełącznika.
- Zła implementacja dwustanowego przełącznika, która trwale gubi stan systemowy, jest gorsza niż dobrze zrobiony trójstanowy, więc jakość wykonania ma większe znaczenie niż liczba stanów.

**Why do I care:** Ten tekst trafia w sedno problemu, który widuję regularnie w code review, czyli projektowanie interfejsu wprost na podstawie struktury danych zamiast na podstawie tego, po co użytkownik faktycznie tam przyszedł. Sam wielokrotnie broniłem trójstanowego przełącznika argumentem, że przecież daje pełną kontrolę, a po przeczytaniu tego artykułu zauważam, że to była obrona rozwiązania łatwiejszego do zaimplementowania, nie łatwiejszego do użycia. Cenię też, że autorka nie twierdzi, że przełącznik motywu w ogóle jest potrzebny, tylko opisuje, jak zrobić dobrze coś, co i tak zdecydowałeś się zbudować, co jest rzadkim przykładem pokory w tekstach o UX.

**Link:** [Dark mode toggles: two states are enough](https://lea.verou.me/blog/2026/dark-mode-toggles/)

## HTML przez WebSockets: aplikacje real-time niemal bez JavaScriptu

**TLDR:** Artykuł opisuje wzorzec HTML over WebSockets, znany też jako hypermedia, w którym serwer wysyła gotowy HTML zamiast JSON przez stały, dwukierunkowy kanał, a klient tylko wstawia go we właściwe miejsce. Autor porównuje ten model z odmianami opartymi na HTTP (htmx) i SSE (Datastar), oraz przechodzi przez zalety i wady podejścia w stylu Phoenix LiveView.

**Summary:** Punktem wyjścia jest krytyka standardowego modelu SPA, w którym front-end i back-end to dwa niezależne kodowe światy połączone kontraktem API, zwykle w postaci JSON-a. Autor pokazuje, że to nie jedyny sposób budowania aplikacji, i przywołuje prezentację Chrisa McCorda z ElixirConf 2019, gdzie w 15 minut zbudował klon Twittera działający w czasie rzeczywistym bez żadnego frameworka renderującego po stronie klienta. W modelu HTML over WebSockets JavaScript na kliencie nie renderuje niczego, tylko utrzymuje kanał komunikacji i wstawia otrzymany HTML we wskazane miejsce w drzewie DOM, plus obsługuje drobne rzeczy jak animacje. Cały ciężar logiki renderowania i stanu aplikacji zostaje po stronie serwera.

Lista zalet jest długa i konkretna. Jeden silnik renderujący zamiast dwóch, brak potrzeby budowania i utrzymywania API, stan aplikacji trzymany po stronie serwera zamiast rozproszony między requestami, oraz możliwość broadcastu, czyli wypchnięcia zmiany do wszystkich podłączonych klientów naraz, co czyni czat, dashboard czy grę wieloosobową praktycznie darmowym dodatkiem architektonicznym. Autor zwraca też uwagę na bezpieczeństwo, bo skoro serwer renderuje i escapuje HTML przed wysłaniem, próba wstrzyknięcia znacznika script trafia na ekran sąsiada jako zwykły, nieszkodliwy tekst, a nie wykonywalny kod. To ta sama architektura, która czyni czat trywialnym w implementacji, czyni go też odpornym na XSS niemal przy okazji.

Wady są jednak realne i autor ich nie ukrywa. Utrzymanie otwartego WebSocketu na klienta oznacza większe zużycie zasobów serwera, a skalowanie poziome wymaga dzielenia stanu między instancjami, na przykład przez Redis jako warstwę kanałów w przypadku Django Channels. Brak działania offline to kolejne ograniczenie, bo zerwanie połączenia zatrzymuje działanie strony, więc trzeba świadomie projektować doświadczenie ponownego łączenia. Krzywa uczenia się jest też stromsza niż wrzucenie jednego tagu script, bo uruchomienie serwera WebSocket i nauka wzorca LiveView to inny poziom trudności niż podpięcie htmx do istniejącej strony.

Tabela frameworków w artykule jest przydatnym punktem odniesienia, od dojrzałego Phoenix LiveView w Elixirze, przez Hotwire w Rubym, po Blazor Interactive Server w .NET oparty o SignalR i Livewire 3 z Reverb w Laravelu. Autor kończy praktyczną regułą wyboru transportu, WebSocket dla komunikacji dwukierunkowej o niskim opóźnieniu jak czat czy współpraca w czasie rzeczywistym, SSE gdy tylko serwer wypycha dane, a zwykłe żądanie-odpowiedź przez htmx, gdy to wystarcza.

**Key takeaways:**
- W modelu HTML over WebSockets serwer wysyła gotowy HTML zamiast JSON, a JavaScript na kliencie tylko utrzymuje kanał i wstawia treść.
- Broadcast do wszystkich podłączonych klientów naraz sprawia, że czat, dashboard czy gra wieloosobowa stają się prostsze architektonicznie niż w klasycznym modelu request-response.
- Escapowanie HTML po stronie serwera przed wysłaniem daje odporność na XSS praktycznie przy okazji.
- Skalowanie poziome wymaga dzielenia stanu klienta między instancjami serwera, co dodaje złożoności infrastrukturalnej.
- Wybór transportu (WebSocket, SSE czy zwykłe HTTP) powinien wynikać z kierunku i częstotliwości komunikacji, a nie z mody na dany framework.

**Why do I care:** Doceniam, że autor nie sprzedaje tego jako uniwersalnego zamiennika dla SPA opartych na Reakcie czy Vue, tylko jako realną alternatywę architektoniczną z konkretnymi kompromisami. Sam widziałem projekty, gdzie prosty panel administracyjny dostał pełny stack SPA z osobnym API tylko dlatego, że to był domyślny wybór zespołu, a wzorzec w stylu LiveView rozwiązałby to prościej i taniej w utrzymaniu. Z drugiej strony ostrzegałbym przed traktowaniem tego jako złotego środka bez namysłu nad kosztem stanu po stronie serwera, bo to jest dokładnie ten rodzaj decyzji architektonicznej, którą trudno cofnąć, gdy aplikacja urośnie.

**Link:** [HTML over WebSockets: real-time SPAs with barely any JavaScript](https://en.andros.dev/blog/ef4968f5/html-over-websockets-real-time-spas-with-barely-any-javascript/)

## Twój SPA wycieka pamięć, przetestuj go testem wytrzymałościowym

**TLDR:** Autor przenosi praktykę soak testów, znaną z backendu, do front-endu i pokazuje, jak zbudować test w Playwright, który powtarza jeden przepływ użytkownika kilkaset razy w pojedynczym kontekście przeglądarki, mierząc liczbę węzłów DOM i nasłuchiwaczy zdarzeń przed i po. Analiza pokazana w tekście wskazuje, że 86 procent zbadanych repozytoriów React, Vue i Angular ma gdzieś niesprzątnięty listener, timer albo subskrypcję.

**Summary:** Punkt wyjścia jest prosty, przeglądanie strony przez kliknięcie linku kiedyś resetowało całą pamięć, bo przeglądarka niszczyła stary dokument. W erze SPA i aplikacji Electron ta naturalna bariera zniknęła, więc drobny wyciek pamięci, który wcześniej nie zdążył urosnąć w ciągu kilku minut życia strony, teraz ma godziny na akumulację w otwartej karcie. Autor przywołuje przykład Gmaila, który testy wytrzymałościowe frontendu prowadził już ponad dekadę temu, po tym jak wycieki doprowadziły procesy przeglądarki do zużycia ponad 10 GB pamięci u niektórych użytkowników.

Najbardziej wartościowa część tekstu to konkretna implementacja. Test buduje się wokół funkcji soak, która uruchamia zadany przepływ, na przykład otwarcie i zamknięcie panelu bocznego, dwieście razy w jednym kontekście przeglądarki, z pięcioma powtórzeniami rozgrzewającymi przed pomiarem bazowym. Powód rozgrzewki jest przyziemny, pierwsze uruchomienie pobiera kod i dane, które zostają w pamięci na stałe, więc pomiar wykonany przed rozgrzewką fałszywie pokazałby wzrost pamięci tam, gdzie urosły tylko dane potrzebne raz. Metryki pobierane są przez Chrome DevTools Protocol, a liczba węzłów DOM i nasłuchiwaczy zdarzeń okazuje się bardziej wiarygodna niż sam rozmiar sterty, bo ten ostatni naturalnie skacze między uruchomieniami niezależnie od wycieków.

Osobny, bardzo praktyczny wątek dotyczy tego, że sam licznik czasu w Playwright trzeba oszukać, żeby test w kilka minut symulował godzinę realnego użytkowania. page.clock.install() pozwala zamrozić zegar i przesuwać go sztucznie o określone interwały, ale autor pokazuje pułapkę, w którą sam wpadł, bo fałszywy zegar przesuwa tylko timery, a nie prawdziwe zapytania sieciowe, więc odpowiedzi z serwera i tak lądują w realnym czasie, psując tempo odpytywania. Rozwiązaniem jest zamockowanie sieci przez page.route(), tak żeby każda odpowiedź lądowała natychmiast po przesunięciu zegara, a nie po realnym czasie oczekiwania na serwer.

Autor kończy odniesieniem do swojej książki o wydajności, gdzie ten test jest tylko jednym z przykładów szerszego podejścia polegającego na wyłapywaniu problemów wydajnościowych zanim trafią na produkcję, zamiast gaszenia pożarów po skardze klienta.

**Key takeaways:**
- Soak test powtarza jeden przepływ użytkownika kilkaset razy w pojedynczym kontekście przeglądarki i porównuje metryki przed i po.
- Liczba węzłów DOM i nasłuchiwaczy zdarzeń jest bardziej wiarygodnym wskaźnikiem wycieku niż sam rozmiar sterty JavaScript.
- Rozgrzewka przed pomiarem bazowym eliminuje fałszywe alarmy wynikające z jednorazowego pobrania kodu i danych.
- Zamrożenie zegara w Playwright kompresuje godziny realnego działania timerów w minuty testu, ale wymaga też zamockowania sieci, inaczej tempo odpytywania rozjeżdża się z założeniami testu.
- Prawie 44 procent wykrytych wycieków w analizowanych repozytoriach pochodziło z niesprzątniętych wywołań setTimeout.

**Why do I care:** To jeden z tych tekstów, po których od razu chcę dodać coś podobnego do naszego pipeline'u CI, bo wiem, ile razy wyciek pamięci ujawniał się dopiero po tym, jak klient poskarżył się, że aplikacja zwalnia po kilku godzinach pracy. Mechanizm soak testu jest na tyle prosty, że brak wymówki, żeby go nie mieć, przynajmniej dla kluczowych przepływów aplikacji, które użytkownicy trzymają otwarte cały dzień. Podoba mi się też, że autor nie sprzedaje tego jako magicznego rozwiązania, tylko pokazuje realne pułapki, jak fałszywy zegar rozjeżdżający się z sieciowym, na które sam natrafił.

**Link:** [Your SPA Is Leaking Memory. Soak Test It](https://denodell.com/blog/your-spa-is-leaking-memory-soak-test-it)

## Ulepszony obrys tekstu w CSS dzięki paint-order

**TLDR:** Właściwość -webkit-text-stroke od lat centrowała obrys na literach, przez co grubsze obrysy zasłaniały kształt liter. Właściwość paint-order, obsługiwana teraz też w Chromium, pozwala umieścić obrys pod wypełnieniem tekstu, dzięki czemu litery pozostają czytelne.

**Summary:** Problem był dobrze znany osobom projektującym typografię na wolnej stopie, obrys tekstu w CSS zawsze centrował się na krawędzi liter, więc przy grubszym obrysie i ciężkim kroju pisma litery robiły się nieczytelne, bo obrys nachodził na środek kształtu. Przez lata społeczność wypracowała obejścia, cienie tekstowe ustawione we wszystkich kierunkach, duplikowanie tekstu z obrysem na warstwie spodniej, albo filtry SVG, ale każde z nich miało swoje ograniczenia i dodatkowy narzut. Autor przyznaje, że najczęściej po prostu unikał tego efektu, chyba że był kluczowym elementem projektu.

Rozwiązaniem okazała się właściwość paint-order, dostępna od dłuższego czasu w WebKicie i Gecko, która niedawno, w 2024 roku, doczekała się wsparcia w Chromium. Ustawienie paint-order: stroke fill mówi przeglądarce, żeby najpierw narysowała obrys, a dopiero na wierzchu wypełnienie liter, co w praktyce oznacza, że obrys chowa się pod tekstem zamiast go przesłaniać. Efekt jest natychmiastowy i widoczny nawet przy dość grubych obrysach, bez żadnych dodatkowych elementów w znacznikach.

Autor uczciwie wylicza, co jeszcze nie działa idealnie, obrysy potrafią robić się zbyt spiczaste, bo brakuje wsparcia dla stroke-linejoin i stroke-miterlimit, kształt obrysu różni się subtelnie między Firefoksem a innymi przeglądarkami, a cień tekstowy nadal rysuje się nad obrysem, więc w demach użył zamiast tego filtra drop-shadow. Mimo tych niedociągnięć to spory krok naprzód względem sytuacji sprzed kilku lat.

**Key takeaways:**
- paint-order: stroke fill umieszcza obrys tekstu pod jego wypełnieniem, rozwiązując problem zasłaniania liter przy grubszych obrysach.
- Wsparcie w Chromium pojawiło się dopiero w 2024 roku, mimo że WebKit i Gecko obsługiwały to znacznie wcześniej.
- Brak wsparcia dla stroke-linejoin i stroke-miterlimit sprawia, że narożniki obrysu bywają zbyt ostre.
- Cień tekstowy nadal rysuje się nad obrysem, więc w praktyce lepiej sprawdza się filtr drop-shadow.
- Prefiks -webkit- w nazwie właściwości pozostaje mimo prawie dwudziestu lat od jej wprowadzenia, co samo w sobie jest ciekawą ciekawostką historyczną.

**Why do I care:** To krótki, konkretny wpis dokładnie takiego typu, jaki lubię, bez zbędnego owijania w bawełnę, tylko problem, przyczyna i rozwiązanie w kilku akapitach. Sam nieraz unikałem grubszych obrysów tekstu z tego właśnie powodu i dobrze wiedzieć, że nie trzeba już sięgać po duplikowanie elementów czy filtry SVG. To też dobry przykład na to, że warto co jakiś czas wracać do starych, pozornie zamkniętych tematów w CSS, bo specyfikacje i implementacje przeglądarek cichcem idą do przodu.

**Link:** [Improved CSS Text-Stroke](https://tylersticka.com/journal/improved-css-text-stroke/)

## Czy domyślny Tailwind rzeczywiście jest wyborem dostępnym

**TLDR:** Domyślne breakpointy Tailwinda są zapisane w rem, nie w pikselach, co sprawia, że reagują na ustawienie domyślnego rozmiaru czcionki w przeglądarce, ale nie na font-size ustawiony we własnym CSS strony. Autor pokazuje, że to realna zaleta dostępności, ale też źródło trudnych do odtworzenia błędów w layoucie.

**Summary:** Historia zaczyna się od typowego koszmaru każdego frontend developera, layout łamie się u konkretnego użytkownika w sposób, którego nie da się odtworzyć na własnym komputerze. Winowajcą okazało się zwiększenie domyślnego rozmiaru czcionki w przeglądarce zgłaszającego, co przesunęło breakpointy Tailwinda, mimo że root font-size w CSS był bez zmian ustawiony na 16 pikseli. Autor tłumaczy to zjawisko krok po kroku, breakpointy Tailwinda od wersji 3.2 są zapisane w rem, na przykład md to 48rem, czyli 768 pikseli przy domyślnym rozmiarze czcionki. Zgodnie ze specyfikacją Media Queries Level 4, jednostki względne w zapytaniach medialnych liczą się od wartości początkowej ustawionej przez przeglądarkę, a nie od deklaracji CSS na stronie, więc html { font-size: 10px } w ogóle nie rusza breakpointów. To część, którą większość wpisów na ten temat zatrzymuje się, ale autor idzie dalej.

Druga, mniej znana połowa historii jest taka, że mimo iż CSS autora nie rusza tej wartości początkowej, użytkownik jak najbardziej może, przez ustawienie domyślnego rozmiaru czcionki w przeglądarce, w przeciwieństwie do powiększenia strony (zoom), które skaluje wszystko łącznie z breakpointami w pikselach. Autor buduje z tego przejrzystą tabelę trzech gestów, ustawienie domyślnego rozmiaru czcionki przez przeglądarkę, powiększenie strony i własny font-size na elemencie html, pokazując, że tylko pierwszy z nich przesuwa breakpointy w rem, a nie w px, podczas gdy zoom przesuwa oba typy jednakowo.

Sedno debaty, jak podkreśla autor, nie jest w tym, który wybór jest poprawny, tylko czy dany zespół świadomie zdecydował się na dany kompromis, czy po prostu odziedziczył domyślne ustawienie bez zastanowienia. Breakpointy w pikselach dają przewidywalność, dokładnie taki layout, jaki zaprojektowano, niezależnie od ustawień użytkownika, opierając się na tym, że zoom i tak skaluje wszystko razem. Breakpointy w rem dodatkowo honorują tę mniejszą, ale realną grupę użytkowników, którzy zamiast zoomować, zwiększają bazowy rozmiar czcionki w ustawieniach systemowych czy przeglądarki. Autor przypomina też, że WCAG 1.4.4 wymaga jedynie możliwości powiększenia tekstu do 200 procent którymkolwiek mechanizmem, a zoom to w pełni wystarczający sposób spełnienia tego wymogu, więc breakpointy w pikselach nie łamią żadnego standardu, tylko nie idą ponad jego minimum.

Na koniec autor pokazuje, jak zmienić breakpointy na piksele przez nadpisanie zmiennych w bloku @theme w Tailwind v4 albo w tailwind.config.js w wersji trzeciej, zostawiając czytelnikowi decyzję, ale z pełną świadomością konsekwencji każdego wyboru.

**Key takeaways:**
- Breakpointy Tailwinda w rem reagują na domyślny rozmiar czcionki ustawiony w przeglądarce, ale nie na font-size zdefiniowany we własnym CSS strony.
- Zoom strony skaluje zarówno breakpointy w rem, jak i w pikselach, więc dla użytkowników korzystających z zoomu wybór jednostki nie ma znaczenia.
- WCAG 1.4.4 uznaje zoom za wystarczający mechanizm powiększania tekstu, więc breakpointy w pikselach spełniają standard, mimo że nie reagują na ustawienie domyślnego rozmiaru czcionki.
- Wybór między rem a px dla breakpointów powinien być świadomą decyzją dotyczącą tego, których użytkowników się optymalizuje, a nie automatycznym dziedziczeniem domyślnej wartości.
- Zmiana breakpointów na piksele w Tailwind v4 wymaga tylko nadpisania zmiennych w bloku @theme.

**Why do I care:** To dokładnie ten rodzaj artykułu, który zmusza mnie do zrewidowania czegoś, co uznawałem za oczywiste i nigdy szczegółowo nie sprawdzałem. Przez lata zakładałem, że skoro Tailwind wybrał rem jako domyślną jednostkę, to jest to po prostu bezpieczny, przemyślany wybór, i nigdy nie zastanawiałem się, jakich dokładnie użytkowników to rozwiązanie faktycznie chroni. Doceniam, że autor nie próbuje narzucić jednej odpowiedzi, tylko rozkłada problem na czynniki pierwsze i zostawia decyzję zespołom, bo to jest uczciwe podejście do tematów, w których naprawdę nie ma jednego słusznego rozwiązania.

**Link:** [Can we make default tailwind a more accessible choice?](https://spatie.be/blog/can-we-make-default-tailwind-a-more-accessible-choice)

## Dlaczego małe ikony JPEG wyglądają inaczej w Chrome

**TLDR:** Autor zauważył, że ta sama grafika JPEG renderowana w małym rozmiarze wygląda grubiej w Chrome niż w Firefoksie, a przyczyną okazała się optymalizacja dekodowania o nazwie częściowe skalowanie IDCT, stosowana przez bibliotekę libjpeg-turbo w Skia. Chrome nie zawsze dekoduje cały obraz przed jego pomniejszeniem, tylko pomija dane wysokoczęstotliwościowe, gdy docelowy rozmiar jest wystarczająco mały.

**Summary:** Historia zaczyna się od pozornie drobnej obserwacji na cudzym komputerze, ikona wyglądała cieńsza i bliższa oryginałowi u kolegi niż u autora, mimo że to była dokładnie ta sama grafika. Podmiana na SVG rozwiązała problem od razu, ale autor postanowił dociec, co się właściwie działo, i trafił na ciekawą optymalizację po stronie Chrome. Wyjaśnienie zaczyna się od podstawowej obserwacji o kompresji stratnej, pełne zdekodowanie obrazu 2000 na 2000 pikseli zajmuje w pamięci około 12 megabajtów, podczas gdy finalna wersja w rozmiarze 20 na 20 pikseli potrzebuje ułamka kilobajta, więc większość informacji z dużej wersji i tak ginie przy pomniejszaniu.

Kluczowe dla zrozumienia całości jest to, że informacja tracona przy pomniejszaniu nie jest losowa, tylko dotyczy głównie szczegółów wysokoczęstotliwościowych, czyli tych, które zmieniają się gwałtownie z piksela na piksel, jak faktura liści na drzewie czy szorstka kora. Autor tłumaczy w przystępny sposób, jak działa transformacja DCT stosowana w kompresji JPEG, dzieląc obraz na bloki 8 na 8 pikseli i przedstawiając je jako sumę wzorców częstotliwości, od jednolitego koloru w jednym rogu po układ szachownicy w drugim. Przy silnym pomniejszaniu, na przykład o czynnik osiem, wystarczy zachować tylko niskoczęstotliwościowe współczynniki tego bloku, żeby otrzymać sensowny wynik, bez konieczności dekodowania całej reszty danych.

Chrome, a dokładniej silnik Skia i biblioteka libjpeg-turbo, którą on wykorzystuje, korzysta z tej techniki, zwanej częściowym skalowaniem IDCT, licząc najbliższy ułamek o mianowniku osiem pasujący do docelowego rozmiaru i dekodując obraz od razu w tej skali, a dopiero potem dosuwając wynik do dokładnego rozmiaru zwykłym algorytmem próbkowania. To wyjaśnia, dlaczego mała ikona wyglądała grubiej, została zdekodowana w skali jednej ósmej, więc jedyną zachowaną informacją była stała składowa koloru, bez subtelnego wygładzania krawędzi i gradientów, które normalnie by tam były. Autor dodał później korektę po dyskusji na Hacker News, przyznając, że sam algorytm skalowania też ma wpływ na wynik, więc obserwowana degradacja to mieszanka obu czynników.

Wniosek, choć oczywisty po fakcie, wart jest powtórzenia, format JPEG i jego optymalizacje są projektowane pod kątem percepcji zdjęć, nie ikon czy prostej grafiki, więc dla logotypów i ikon SVG albo PNG pozostają bezpieczniejszym wyborem.

**Key takeaways:**
- Chrome przez Skia i libjpeg-turbo potrafi dekodować JPEG bezpośrednio w mniejszej skali, pomijając dane wysokoczęstotliwościowe, zamiast dekodować cały obraz i dopiero go pomniejszać.
- Ta optymalizacja, zwana częściowym skalowaniem IDCT, działa dla ułamków skali z mianownikiem osiem.
- Efektem ubocznym może być zauważalna różnica wizualna między przeglądarkami przy bardzo małych rozmiarach obrazu.
- Utracona przy pomniejszaniu informacja dotyczy głównie szczegółów wysokoczęstotliwościowych, nie jest losowa.
- JPEG nie jest dobrym formatem dla małych ikon i logotypów, SVG albo PNG lepiej zachowują ich kształt w każdej skali.

**Why do I care:** Uwielbiam takie teksty, bo pokazują, że pod pozornie prostym renderowaniem obrazka kryje się warstwa inżynierii, o której większość z nas nigdy nie musi myśleć, dopóki coś nie zacznie wyglądać nie tak. To dobra lekcja pokory dla każdego, kto zakłada, że skoro dwa piksele mają ten sam kod źródłowy, to muszą wyglądać identycznie w każdej przeglądarce. Praktyczny wniosek jest banalny, ale wart zapamiętania, ikony i logotypy trzymajmy w SVG, a JPEG zostawmy zdjęciom, dla których został zaprojektowany.

**Link:** [Guillaume Técher: JPG scaling in Chrome](https://guillaumetech.github.io/posts/jpg-scaling-chrome/)

## WebMCP: strony internetowe jako narzędzia dla agentów AI

**TLDR:** WebMCP to proponowany standard webowy pozwalający stronom deklarować ustrukturyzowane narzędzia dla agentów AI, zamiast zmuszać je do zgadywania przeznaczenia przycisków i pól formularza na podstawie samego DOM-u. Chrome udostępnia go jako origin trial od wersji 149 oraz jako flagę do lokalnego developmentu.

**Summary:** Dotychczasowe podejście agentów AI do interakcji ze stronami internetowymi polega na analizowaniu struktury DOM i zgadywaniu, co robi dany przycisk czy pole formularza, co jest z natury zawodne, zwłaszcza przy złożonych, wieloetapowych zadaniach jak rezerwacja podróży wieloosobowej i wielomiastowej. WebMCP odwraca ten model, strona sama deklaruje narzędzia wraz z ich przeznaczeniem, schematem wejścia w formacie JSON Schema i aktualnym stanem kontekstu, a agent wywołuje je jak funkcje zamiast klikać po elementach interfejsu próbując odgadnąć ich znaczenie. Narzędzia wykonują się widocznie na stronie, więc użytkownik zachowuje wgląd w to, że zadanie faktycznie zostało wykonane zgodnie z oczekiwaniami, a projekt marki i interfejsu strony pozostaje nienaruszony.

Dokumentacja Chrome pokazuje konkretne zastosowania, od formularzy zgłoszeniowych, gdzie narzędzie w rodzaju submit_application mapuje dane zebrane w rozmowie z użytkownikiem na odpowiednie pola formularza rozróżniając na przykład pełne imię i nazwisko od osobnych pól imienia i nazwiska, przez wsparcie interakcji w interfejsach zaprojektowanych dla ludzi, jak wybór złożonej daty i godziny w rezerwacji, po szybsze debugowanie aplikacji przez narzędzia diagnostyczne ukryte za zagnieżdżonymi menu. Dla akcji wrażliwych, jak dokonanie zakupu, dostępny jest mechanizm żądania potwierdzenia od użytkownika przez dialog, co jest ważnym elementem bezpieczeństwa tego modelu.

Warstwa bezpieczeństwa opiera się na dwóch mechanizmach, izolacji originów, wymagającej stabilnego pochodzenia dokumentu przez cały czas życia narzędzia, co automatycznie wyłącza WebMCP przy włączonym document.domain, oraz polityce uprawnień Permissions Policy, domyślnie ograniczającej rejestrację narzędzi do kontekstu tego samego originu, z możliwością jawnego dopuszczenia iframe'ów przez atrybut allow="tools". Dostępne są dwa API, imperatywne oparte o zwykły JavaScript oraz deklaratywne przez adnotacje na standardowych formularzach HTML, co daje elastyczność w zależności od tego, czy strona jest już mocno zdynamizowana, czy raczej prostym formularzem.

Autorzy dokumentacji uczciwie wymieniają ograniczenia, standard jest zaprojektowany głównie z myślą o lokalnych przepływach z człowiekiem w pętli, a nie o środowiskach headless, złożone interfejsy mogą wymagać sporego refaktoru, żeby w ogóle dało się je opisać w ten sposób, a odkrywalność narzędzi zależy od tego, czy klient odwiedzi daną stronę bezpośrednio, więc to nie jest rozwiązanie działające z automatu w skali całego internetu.

**Key takeaways:**
- WebMCP pozwala stronie deklarować narzędzia z jawnym przeznaczeniem, schematem wejścia w JSON Schema i aktualnym stanem kontekstu, zamiast zostawiać agentowi zgadywanie na podstawie DOM-u.
- Narzędzia wykonują się widocznie na stronie, co pozwala użytkownikowi zachować wgląd w działania agenta i chroni spójność interfejsu marki.
- Bezpieczeństwo opiera się na izolacji originów i Permissions Policy, domyślnie ograniczającej rejestrację narzędzi do tego samego originu.
- Dostępne są dwa modele implementacji, imperatywne API w JavaScript oraz deklaratywne adnotacje na standardowych formularzach HTML.
- Standard jest projektowany głównie pod lokalne przepływy z człowiekiem w pętli, nie pod automatyzację headless na masową skalę.

**Why do I care:** Patrzę na WebMCP z mieszanymi uczuciami, bo z jednej strony to sensowniejsze podejście niż zmuszanie modeli do parsowania chaotycznego DOM-u i zgadywania intencji, a z drugiej oznacza kolejną warstwę, którą zespoły frontendowe będą musiały utrzymywać obok samego interfejsu użytkownika. Jeśli ten standard się przyjmie, deklarowanie narzędzi dla agentów stanie się częścią normalnej pracy przy budowaniu formularzy, podobnie jak dziś dbamy o atrybuty ARIA dla czytników ekranu. Pytanie, które mnie nurtuje, to czy realnie zadba o to wystarczająca liczba stron, żeby agenci mogli polegać na tym mechanizmie zamiast na scrapowaniu, bo standard bez powszechnej adopcji zostaje ciekawostką w dokumentacji Chrome.

**Link:** [WebMCP | AI on Chrome | Chrome for Developers](https://developer.chrome.com/docs/ai/webmcp)
