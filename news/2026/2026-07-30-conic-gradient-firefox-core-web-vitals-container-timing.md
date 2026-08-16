---
title: "Trójkąty z conic-gradientu, nowy Firefox i badania, które podważają Core Web Vitals"
excerpt: "Przegląd frontendowych nowości: od piętnastu lat WOFF-a, przez redesign Firefoksa i CodePen 2.0, po Container Timing API i badanie obalające mit progu 2.5 sekundy dla LCP."
publishedAt: "2026-07-30"
slug: "conic-gradient-firefox-core-web-vitals-container-timing"
hashtags: "#frontendfocus #css #html #performance #browsers #privacy #fonts #animation #svg #generated #pl"
source_pattern: "Frontend Focus"
---

## WOFF ma piętnaście lat, a browser wars o fonty nauczyły nas czegoś ważnego

**TLDR:** W3C wspomina piętnastolecie WOFF, czyli formatu, który w końcu pozwolił używać własnych fontów na stronach bez ryzyka prawnego. Historia pokazuje, jak spór o DRM omal nie zabił webfontów, zanim ktokolwiek zdążył ich użyć.

**Summary:** Zanim WOFF powstał, temat fontów na webie stał w miejscu przez ponad dekadę, mimo że specyfikacja @font-face istniała już w CSS2 od 1998 roku. Powodem nie była technologia, tylko strach. Producenci fontów bali się piractwa, przeglądarki bały się odpowiedzialności prawnej za renderowanie cudzych fontów, a dyskusje kręciły się wokół szyfrowania, przypisywania fontu do konkretnej domeny i pełnoprawnego DRM. W 2009 roku pojawiły się dwie konkurencyjne propozycje: ZOT od inżyniera Mozilli, prosty format oparty na kompresji Zlib bez żadnego zabezpieczenia, oraz .webfont od typografów, który zamiast szyfrować dane, po prostu linkował do licencji i informacji o twórcy fontu. Miesiąc później autorzy obu formatów połączyli siły i tak powstał WOFF.

Warto zapamiętać, że sukces WOFF-a wziął się z rezygnacji z ochrony, a nie z jej wzmocnienia. Cała branża czekała na rozwiązanie DRM, a wygrał format, który świadomie z DRM zrezygnował i postawił na to, że deweloperzy i tak mogą podejrzeć źródło strony. To jest dokładnie ten moment, w którym pragmatyzm pokonał paranoję prawną, i chyba warto go pamiętać za każdym razem, gdy ktoś proponuje kolejne zabezpieczenie „na wszelki wypadek”, które w praktyce tylko spowalnia adopcję.

Dalszy ciąg tej historii to WOFF2 z lepszą kompresją dzięki Brotli, dziś odpowiadający za około 65 procent żądań o fonty, oraz webfonty obecne już na 88 procent stron internetowych. Artykuł kończy się zapowiedzią Incremental Font Transfer, czyli technologii pozwalającej pobierać fonty częściami, bez ściągania całego pliku, co ma znaczenie zwłaszcza dla języków z tysiącami znaków, jak chiński czy japoński. To, w przeciwieństwie do wielu web-standardowych obietnic, faktycznie ma szansę zmienić coś realnie odczuwalnego na słabszych łączach.

Ciekawe jest też to, czego artykuł nie mówi wprost: że ta cała epopeja trwała piętnaście lat, zanim doszliśmy do miejsca, w którym fonty webowe są oczywistością. W branży, która lubi mówić o „szybkim tempie zmian”, taki case study jest dobrym przypomnieniem, że fundamentalne standardy webowe rodzą się powoli i przez konflikt interesów, nie przez czyjąś wizję genialnego API.

**Key takeaways:**
- WOFF wygrał, bo zrezygnował z DRM, podczas gdy konkurencyjne pomysły z szyfrowaniem utknęły w dyskusjach prawnych na lata.
- WOFF2 z kompresją Brotli obniżył rozmiar plików o do 40 procent względem WOFF 1.0 i dziś dominuje w ruchu webowym.
- Incremental Font Transfer to następny krok: częściowe pobieranie fontów bez utraty kerningu i ligatur, kluczowe dla języków azjatyckich.

**Why do I care:** Jako ktoś, kto od lat patrzy na standaryzację webu, lubię ten przykład, bo pokazuje mechanizm, który powtarza się w branży bez końca: strach przed nadużyciem prowadzi do przekombinowanych rozwiązań, a wygrywa zwykle to najprostsze, które ktoś w końcu odważy się zaproponować bez zabezpieczeń. Warto o tym pamiętać, projektując dziś jakiekolwiek API wewnętrzne w firmie.

**Link:** [WOFF 1.0: a milestone on W3C's journey of fonts on the web](https://www.w3.org/blog/2026/woff-1-0-a-milestone-on-w3cs-journey-of-fonts-on-the-web/)

## CodePen 2.0 w końcu wystartował, po latach cichej przebudowy

**TLDR:** CodePen ogłosił swój nowy edytor, który łączy klasyczny Pen, Projects i edytor Vue w jedno narzędzie z własnym systemem plików, wersjonowaniem i wdrażaniem na subdomenę jednym kliknięciem.

**Summary:** Zespół CodePen pracował nad tym od lat, na tyle długo, że w pewnym momencie zawiesili nawet swój podcast, żeby nie zdradzać zbyt wiele przed premierą. Nowy edytor daje każdemu Penowi prawdziwy system plików, historię wersji z możliwością cofania się, oraz współpracę w czasie rzeczywistym z zapraszaniem innych użytkowników jako edytorów lub widzów. Jedną z ciekawszych funkcji jest natychmiastowy deployment: jednym kliknięciem Pen dostaje własną domenę w formacie codepen.app, którą można podpiąć pod własny DNS, co w praktyce zamienia CodePen w prostego hostingu.

Ciekawym elementem są też tak zwane Blocks, czyli możliwość łączenia różnych technologii w jednym Penie bez ręcznego spinania konfiguracji, bo kompilator CodePenu ma się tym zająć sam. To spory skok w stosunku do klasycznego trybu HTML/CSS/JS z prostym podglądem na żywo, choć trzeba przyznać, że sam koncept nie jest wcale nowy, tylko dojrzalszy w wykonaniu.

O sztucznej inteligencji autor pisze zaskakująco szczerze: nie ma jej w edytorze, mimo że mnóstwo kodu wklejanego na CodePenie już dziś pochodzi z generatorów AI. Zespół deklaruje eksperymenty, ale bez konkretów i dat, co w 2026 roku, gdy każde narzędzie deweloperskie chwali się integracją z jakimś modelem, jest wręcz rzadkością i chyba uczciwym podejściem.

Klasyczny edytor zostaje dostępny bez zmian, więc nikt nie traci możliwości pracy tak jak wcześniej, a osoby przywiązane do starego interfejsu mogą uruchomić tryb minimalny, który chowa cały nowy panel boczny.

**Key takeaways:**
- Nowy edytor CodePen 2.0 łączy funkcje Classic Pen, Projects i edytora Vue w jedno środowisko z prawdziwym systemem plików.
- Każdy Pen można wdrożyć jednym kliknięciem na własną subdomenę i podpiąć pod niestandardowy DNS.
- AI świadomie nie zostało jeszcze wbudowane w edytor, mimo że duża część wklejanego kodu już dziś powstaje z pomocą modeli.

**Why do I care:** CodePen od lat konkuruje z CodeSandbox i StackBlitz o miejsce w warsztacie frontendowca, i szczerze mówiąc, dla poważnych projektów rzadko sięgam po żadne z nich. Ale jako narzędzie do szybkiego prototypu, demo na rozmowę rekrutacyjną czy odtworzenia buga na StackOverflow, taki skok jakościowy się przyda, zwłaszcza że wersjonowanie i współpraca w czasie rzeczywistym to funkcje, których naprawdę brakowało.

**Link:** [The Launch of CodePen 2.0](https://blog.codepen.io/2026/07/23/two-point-oh/)

## Kill the Cookie Banner: walka o to, żeby przeglądarka po prostu powiedziała, czego chcesz

**TLDR:** Organizacja NOYB prowadzi kampanię za automatycznymi sygnałami prywatności w przeglądarce, które miałyby zastąpić bannery cookie. Propozycja Komisji Europejskiej utknęła, bo branża trackingowa lobbuje przeciwko niej.

**Summary:** Punkt wyjścia jest prosty i trudno się z nim nie zgodzić: unijne prawo już dziś zabrania śledzenia użytkowników bez zgody, więc bannery cookie nigdy nie były prawnym wymogiem, tylko sposobem branży trackingowej na wymuszenie tej zgody. Strona przywołuje dane, według których nawet 90 procent ludzi klika „zgadzam się”, mimo że tylko około 3 procent faktycznie chce być śledzonych, co samo w sobie jest dobrym dowodem na to, jak zaprojektowany jest ten system.

Rozwiązanie proponowane jesienią 2025 przez Komisję Europejską jako część reformy Digital Omnibus polega na automatycznym przekazywaniu preferencji prywatności między przeglądarką a stroną, analogicznie do tego, jak przeglądarka już dziś zgłasza preferowany język. Coś podobnego działa już legalnie w kilku stanach USA. Problem w tym, że kilka państw członkowskich blokuje tę propozycję pod naciskiem Google i branży trackingowej, a lobbing sięga też Parlamentu Europejskiego.

Strona sama uczciwie zastrzega, że reszta reformy Digital Omnibus budzi ich wątpliwości i osłabia inne prawa użytkowników, więc to nie jest bezkrytyczne poparcie dla całego pakietu, tylko konkretna, wąska prośba o jeden mechanizm.

**Key takeaways:**
- Cookie bannery nigdy nie były prawnym wymogiem, tylko mechanizmem wymuszania zgody na śledzenie.
- Komisja Europejska zaproponowała automatyczne sygnały prywatności analogiczne do preferencji językowych przeglądarki.
- Propozycja utknęła w Radzie UE i Parlamencie Europejskim pod presją lobby reklamowego.

**Why do I care:** Jako frontendowiec, który wdrażał niejeden banner cookie na życzenie działu prawnego, mam do tego tematu osobisty żal. Implementacja takich bannerów to zwykle tydzień pracy zmarnowany na UX, który i tak nikogo nie informuje uczciwie, tylko manipuluje kolorem przycisku. Automatyczny sygnał na poziomie przeglądarki byłby dla nas, deweloperów, czystą oszczędnością czasu, więc trzymam kciuki, choć wiem, że pieniądze reklamowe rzadko przegrywają z prostymi rozwiązaniami.

**Link:** [Kill the Cookie Banner!](https://killthecookiebanner.eu/)

## Firefox szykuje nowy wygląd, nazwany wewnętrznie Project Nova

**TLDR:** Mozilla zapowiada odświeżenie designu Firefoksa: cieplejsze kolory, bardziej zaokrąglone komponenty, powrót trybu kompaktowego oraz mocniejsze wyeksponowanie funkcji prywatności jak wbudowane VPN.

**Summary:** Nazwa Project Nova ma tłumaczyć intencję: nova to nie nowa gwiazda powstająca znikąd, tylko istniejąca materia świecąca na nowo, czyli odświeżenie, nie rewolucja. W praktyce oznacza to nowy design system z ujednoliconymi tokenami, komponentami i wzorcami, tak żeby panele, menu i ustawienia wyglądały spójnie, zamiast sprawiać wrażenie sklejonych z różnych epok przeglądarki.

Prywatność ma być bardziej widoczna, nie bardziej ukryta w ustawieniach, więc VPN i tryb prywatny mają być łatwiej dostępne z głównego interfejsu, a panel ustawień ma tłumaczyć decyzje o danych prostszym językiem, łącznie z możliwością całkowitego wyłączenia funkcji AI. Mozilla deklaruje też, że blokowanie trackerów samo w sobie przyspiesza ładowanie stron, i podaje konkretną liczbę: 9 procent poprawy czasu ładowania kluczowej zawartości strony w ciągu ostatniego roku.

Interesujący jest powrót trybu kompaktowego, wycofanego wcześniej, a przywróconego po prostu dlatego, że użytkownicy się o niego dopominali. To rzadki przykład, gdy producent przeglądarki przyznaje wprost, że jakaś decyzja UX była błędem i cofa się z niej bez owijania w bawełnę.

Całość ma zostać wdrożona jeszcze w tym roku, a artykuł kończy się typowym dla Mozilli apelem o feedback od społeczności, co akurat pasuje do ich modelu rozwoju w otwartości, w odróżnieniu od reszty rynku przeglądarek.

**Key takeaways:**
- Redesign obejmuje nowy design system: zaokrąglone komponenty, cieplejszą paletę kolorów i spójniejsze ikony w trybie jasnym i ciemnym.
- Prywatność, w tym VPN i kontrola nad funkcjami AI, ma być bardziej widoczna w interfejsie, a nie schowana w ustawieniach.
- Tryb kompaktowy wraca po tym, jak użytkownicy zgłaszali, że im go brakuje.

**Why do I care:** Redesigny przeglądarek zwykle budzą we mnie ostrożność, bo często oznaczają więcej animacji i mniej gęstości informacji na ekranie, czyli coś przyjemnego dla marketingu, a niekoniecznie dla codziennej pracy. Ale fakt, że Mozilla stawia prywatność i szybkość, a nie tylko estetykę, na pierwszym miejscu w komunikacji, jest wart odnotowania, zwłaszcza w kontraście do reszty rynku, gdzie przeglądarka to coraz częściej po prostu opakowanie na konto reklamowe.

**Link:** [Designing Firefox for the future](https://blog.mozilla.org/en/firefox/new-firefox-design/)

## Safari 26.6: mało hałasu, osiem konkretnych poprawek

**TLDR:** WebKit opisuje zawartość Safari 26.6: nowy parametr compileOptions dla strumieniowej kompilacji WebAssembly oraz osiem poprawek błędów w CSS, service workerach, sieci, rozszerzeniach i WebRTC.

**Summary:** Główna nowość techniczna to dodanie parametru compileOptions do WebAssembly.compileStreaming() i WebAssembly.instantiateStreaming(), dzięki czemu moduły korzystające z Wasm JS String Builtins, wprowadzonych wcześniej w Safari 26.2, nie muszą już rezygnować ze strumieniowej kompilacji, żeby z nich skorzystać. To drobna, ale konkretna poprawka dla zespołów budujących coś na WebAssembly, gdzie do tej pory trzeba było wybierać między wydajnością kompilacji a nowszym API.

Poprawki błędów są równie przyziemne, ale znaczące dla konkretnych przypadków: jednostka ic w CSS przestała się poprawnie skalować z zoomem strony, co łamało jej definicję jako równą 1em, elementy z position: fixed i position-area nie działały poprawnie, gdy body było przewijalne, a CSS zoom w połączeniu z font-size i font-weight psuł się na iPadzie w trybie strony desktopowej. Do tego dochodzą poprawki dotyczące partycjonowanych ciasteczek, rejestracji service workerów z brakującymi skryptami oraz akumulujących się plików bazy danych rozszerzeń, co z czasem powodowało spadek wydajności Safari.

Artykuł jest bardzo rzeczowy, bez marketingowego sosu, co w sumie pasuje do charakteru tego wydania: to nie jest release, który zmienia coś fundamentalnie, tylko sprzątanie po wcześniejszych funkcjach.

**Key takeaways:**
- WebAssembly.compileStreaming() i instantiateStreaming() obsługują teraz Wasm JS String Builtins bez rezygnacji ze strumieniowej kompilacji.
- Jednostka CSS ic była błędnie skalowana z zoomem strony, co łamało jej zgodność ze specyfikacją.
- Osiem poprawek dotyczy też service workerów, partycjonowanych ciasteczek i rejestracji rozszerzeń.

**Why do I care:** Takie wydania rzadko trafiają na pierwsze strony newsletterów, ale to właśnie one decydują, czy produkcyjny kod, który polega na drobnych detalach specyfikacji, w ogóle działa poprawnie. Jeśli ktoś u siebie w projekcie używa jednostki ic albo position-area, warto sprawdzić, czy stara wersja Safari nie maskowała u niego innego buga.

**Link:** [WebKit Features for Safari 26.6](https://webkit.org/blog/18178/webkit-features-for-safari-26-6/)

## Chrome oficjalnie ląduje na Arm64 Linux, z Widevine w zestawie

**TLDR:** Google Chrome doczekał się natywnej wersji na architekturę Arm64 Linux, dostępnej między innymi dla Raspberry Pi, Snapdragon laptopów i innych urządzeń Arm. W pakiecie jest też natywne DRM Widevine, czego wcześniej brakowało bez obejściowych hacków.

**Summary:** Google zapowiadał to na drugi kwartał 2026 roku i w końcu paczki Arm64 pojawiły się w oficjalnych repozytoriach Google dla Debiana i dystrybucji opartych na RPM, choć bez żadnej głośnej zapowiedzi. Autor testował instalację na Raspberry Pi 5 z Ubuntu 26.04, gdzie oficjalna strona pobierania wciąż serwowała paczkę AMD64, więc trzeba było ręcznie podmienić w adresie URL amd64 na arm64, żeby dostać właściwy plik.

Największą wartością nad zwykłym Chromium jest synchronizacja konta Google, czyli zakładki, hasła, rozszerzenia i ustawienia przenoszone między urządzeniami, czego open-source’owe Chromium po prostu nie oferuje. Do tego dochodzi Widevine, tym razem jako natywny moduł aarch64 wbudowany w paczkę, a nie wyciągnięty ręcznie z ChromeOS, jak to bywało wcześniej. Ograniczeniem pozostaje tak zwane Software Secure DRM, które ogranicza jakość strumieniowania z Netflixa i podobnych serwisów do 720p lub 1080p z braku sprzętowego łańcucha zaufania, ale to samo dotyczy też architektury x86 na Linuksie, więc nie jest to specyficzne dla Arm.

W testach autora YouTube w 1080p i 2K działał płynnie, a BBC iPlayer w najwyższych ustawieniach radził sobie znacznie lepiej niż w Firefoksie Snap na tej samej platformie. Warto dodać, że w chwili pisania artykułu Google nie opublikował żadnej oficjalnej informacji, że wsparcie dla Arm64 Linux jest gotowe produkcyjnie, więc to wciąż coś w rodzaju cichej bety.

**Key takeaways:**
- Chrome na Arm64 Linux instaluje się z oficjalnych repozytoriów Google i działa na Raspberry Pi 5 oraz laptopach ze Snapdragonem.
- Synchronizacja konta Google i natywny moduł Widevine to główne przewagi nad zwykłym Chromium.
- Jakość DRM na Linuksie nadal ogranicza streaming do 1080p niezależnie od architektury procesora.

**Why do I care:** Rosnąca flota urządzeń z Arm, od Raspberry Pi po laptopy ze Snapdragonem, to coś, co warto mieć na radarze przy testowaniu wydajności aplikacji webowych na słabszym lub energooszczędnym sprzęcie. Fakt, że pełny Chrome trafia tam bez hacków, ułatwia realistyczne testy zamiast polegania wyłącznie na Chromium czy przeglądarkach opartych na silniku Blink bez pełnego zestawu funkcji.

**Link:** [Google Chrome lands on Arm64 Linux (with Widevine DRM)](https://www.omgubuntu.co.uk/2026/07/chrome-arm64-linux-available)

## Strona internetowa jako baza wypadowa dla ludzi i agentów AI

**TLDR:** Esej twierdzi, że strony internetowe nie znikają, tylko zmieniają rolę: stają się źródłem prawdy, które muszą czytać zarówno ludzie, jak i agenci AI, a konwersja coraz częściej dzieje się poza samą stroną.

**Summary:** Główna teza jest taka, że strony od zawsze były budowane dla ludzi i botów naraz, tylko przez dwadzieścia lat wystarczyło budować dla ludzi, bo Google miał czas i pieniądze, żeby nauczyć się czytać takie strony. Nowa fala agentów AI nie ma za sobą dwóch dekad dopracowywania, więc strony muszą dziś mieć powierzchnie łatwe do sparsowania maszynowo. Autor łączy to z przemianowaniem SEO na GEO i AEO, twierdząc, że to głównie kosmetyka nazewnicza, bo praca była zawsze taka sama, tylko Google przestał być jedyną powierzchnią wartą optymalizacji.

Ciekawy jest przykład z ChatGPT Search, które najpierw opierało się na indeksie Binga, potem po cichu ściągało wyniki z Google, a kilka tygodni później znów zaczęło korzystać z Binga, wszystko bez żadnej oficjalnej zapowiedzi. Autor wyciąga z tego wniosek, że wybór „ważnej” powierzchni przestał być czymkolwiek, na co mamy wpływ, i może się zmienić z dnia na dzień. Przestrzega też przed budowaniem osobnej strony dla agentów, przywołując m-dot sites i AMP jako przykłady równoległych wersji, które zawsze rozjeżdżają się z oryginałem i w końcu umierają.

Najbardziej kontrowersyjna część to twierdzenie, że techniczna poprawność strony przestaje być rzadką umiejętnością, a staje się wyborem, bo agent AI może dziś zaimplementować zgodność ze specyfikacją równie dobrze jak dawniej tylko najlepsi specjaliści SEO. Autor idzie dalej i twierdzi, że jedyną trwałą przewagą zostaje autentyczność, czyli coś, czego nie da się wygenerować, bo agent zakupowy może to zweryfikować krzyżowo w wielu źródłach.

Problem w tym, że cały esej opiera się na przewidywaniach i analogiach, a nie na twardych danych. Nie ma tu żadnego pomiaru, ile ruchu faktycznie już dziś przechodzi przez agentów, ani konkretnego dowodu, że MCP server na stronie firmowej cokolwiek zmienia w praktyce sprzedażowej. To dobry tekst do myślenia, ale czytelnik powinien traktować go jako hipotezę, nie jako fakt.

**Key takeaways:**
- Strony mają stawać się „bundle interfejsów”: jeden dla ludzi, kilka dla maszyn, w tym coraz częściej MCP server zamiast zwykłego API.
- Wybór, która powierzchnia wyszukiwania czy AI ma znaczenie, zmienia się bez zapowiedzi, jak pokazuje przykład Binga i ChatGPT Search.
- Autentyczność ma stać się jedyną trwałą przewagą, bo agenci mogą krzyżowo weryfikować treści szybciej niż ludzie.

**Why do I care:** Ten tekst trafia w coś realnego, mianowicie że warto mieć ustandaryzowaną, dobrze oznaczoną treść zamiast kolejnej podstrony pisanej pod ludzkie oko wyłącznie. Ale ostrzegam przed kupowaniem tego jako gotowej strategii biznesowej, bo autor sam przyznaje, że buduje narzędzie w tym obszarze, więc ma interes w tym, żeby ta wizja brzmiała pilnie i nieuchronnie. Zanim ktoś zamówi u zespołu implementację MCP servera dla firmowej strony, dobrze byłoby zapytać, ilu realnych klientów w ogóle korzysta dziś z takich agentów zakupowych.

**Link:** [The future of the website](https://joost.blog/future-of-the-website/)

## Conic-gradient jako sekretna broń do rysowania trójkątów

**TLDR:** Autor pokazuje, jak używać conic-gradient() z twardymi przystankami kolorów do rysowania trójkątów i dekoracyjnych kątów, inspirowany zrzutem ekranu ze strony Studio Heyday.

**Summary:** Punkt wyjścia jest szczery: autor przyznaje, że przez długi czas nie widział sensu w conic-gradient(), bo kojarzył mu się głównie z estetyką koła wyboru kolorów. Zmiana nastąpiła, gdy zaczął przesuwać punkt startowy gradientu poza środek elementu i ustawiać twarde przystanki kolorów zamiast płynnych przejść, co w praktyce daje ostre klinowe kształty zamiast tęczy.

Sztuczka polega na ustawieniu punktu startowego gradientu w rogu elementu i wskazaniu kąta startowego w stopniach lub jednostce turn, a potem zdefiniowaniu koloru na wąskim zakresie kątowym, na przykład od 0 do 45 stopni. Ponieważ operujemy w stopniach, a nie w procentach czy pikselach, myślenie o trójkątnych kształtach staje się naturalne, zwłaszcza gdy kąt koloru jest mniejszy niż 45 stopni w kwadratowym pudełku.

Autor sam zresztą przyznaje, że w wielu przypadkach zwykły, przekrzywiony linear-gradient() dałby ten sam efekt, więc to nie jest jedyna ani nawet najprostsza droga do trójkąta. Wymienia też klasyczną technikę z border na elemencie o zerowych wymiarach, clip-path z polygon(), nowy border-shape, SVG z polygon czy rysowanie na canvasie. Przewaga conic-gradientu pojawia się dopiero, gdy chcemy animować kąt na hover, bo wtedy operowanie na stopniach z łatwym easingiem daje przyjemny, lekko drgający efekt.

**Key takeaways:**
- Twarde przystanki kolorów w conic-gradient() pozwalają rysować trójkąty i klinowe kształty zamiast typowych kolorowych kół.
- Punkt startowy gradientu można przesunąć poza środek elementu, co daje kontrolę nad kątem i pozycją trójkąta.
- To nie jedyna metoda rysowania trójkątów w CSS, ale jedna z niewielu, którą łatwo animować przez zmianę kąta na hover.

**Why do I care:** Ta technika jest fajna, ale traktowałbym ją jako ciekawostkę do konkretnego przypadku animacji kąta, a nie domyślne narzędzie do trójkątów. Jeśli trójkąt ma być statyczny i dostępny, clip-path albo zwykły SVG nadal wygrywają czytelnością kodu, a tło CSS jak sam autor przyznaje, jest z natury dekoracją, nie elementem interaktywnym.

**Link:** [When You Need To Make a Triangle, Think Conic Gradients](https://master.dev/blog/when-you-need-to-make-a-triangle-think-conic-gradients/)

## Container Timing API: wreszcie mierzymy komponenty, nie tylko całą stronę

**TLDR:** Harry Roberts opisuje eksperymentalne Container Timing API, które pozwala mierzyć, kiedy cały fragment interfejsu, na przykład karta produktu, faktycznie się wyrenderował, zamiast polegać na LCP czy pojedynczych elementach Element Timing.

**Summary:** Punktem wyjścia jest problem, który każdy, kto kiedykolwiek próbował zmierzyć wydajność konkretnego komponentu, zna z autopsji: LCP mówi, kiedy pojawił się największy element na stronie, ale sklep internetowy chce wiedzieć, kiedy cała karta produktu, ze zdjęciem, ceną, dostępnością i przyciskiem kup, złożyła się w całość. Element Timing radzi sobie z pojedynczym obrazem czy tekstem, ale nie potrafi opisać całego regionu złożonego z wielu elementów.

Container Timing rozwiązuje to, pozwalając oznaczyć dowolny fragment DOM atrybutem containertiming, po czym przeglądarka emituje kolejne wpisy w miarę jak nowe, treściwe fragmenty tego regionu się malują. Każdy wpis niesie czas pierwszego renderu, czas najnowszego malowania, skumulowaną powierzchnię pomalowanego obszaru oraz element, który dołożył najwięcej powierzchni w danej klatce. Kluczowa jest tu decyzja projektowa: API nigdy nie mówi, że komponent jest „gotowy”, bo przeglądarka nie ma jak wiedzieć, czy sekcja z rekomendacjami za chwilę nie doda kolejnego elementu.

Autor bardzo mocno podkreśla różnicę filozoficzną między Element Timing a Container Timing: to pierwsze pyta, kiedy wyrenderował się rozpoznawalny dla przeglądarki artefakt, jak obrazek, a to drugie pozwala deweloperowi samemu zdefiniować granicę tego, co jest dla niego znaczące, na przykład cały panel wyszukiwania czy sekcja z ceną. To przesuwa odpowiedzialność z przeglądarki na zespół produktowy, co jest bardziej pracochłonne, ale też dużo bardziej uczciwe.

Tekst zawiera też twarde ostrzeżenie, które łatwo przeoczyć w entuzjazmie nad nowym API: rozmiar pomalowanej powierzchni nie jest procentem ukończenia, a samo pomalowanie treści nie oznacza, że komponent jest interaktywny czy że dane w nim są aktualne. Formularz może się wyrenderować, zanim jego walidacja się załaduje, i wtedy nazwanie metryki „gotowy” byłoby zwyczajnie kłamstwem.

Na koniec autor radzi, żeby nie wymyślać od razu jednej uniwersalnej metryki firmowej, tylko wybrać jeden ważny komponent na dużym ruchu, zebrać dane z próbki sesji chromowych i dopiero na podstawie realnych danych zdecydować, który punkt w sekwencji ma sens biznesowy. To bardzo w duchu inżynierskim podejście: najpierw dowody, potem nazwa metryki.

**Key takeaways:**
- Container Timing API mierzy, jak cały oznaczony fragment DOM renderuje się w czasie, zamiast pojedynczego elementu jak w Element Timing.
- API nigdy nie zwraca momentu „ukończenia” komponentu, bo przeglądarka nie może wiedzieć, czy region jeszcze się zmieni.
- Obecnie dostępne jako origin trial w Chrome od wersji 148 do 153, bez wsparcia w Safari i z otwartym statusem w Firefoksie.

**Why do I care:** To jest dokładnie ten typ API, na który czekałem, bo pozwala w końcu mówić o wydajności w języku produktu, a nie w języku przeglądarki. Ale zgadzam się z ostrzeżeniem autora: pokusa, żeby od razu nazwać pierwszy zebrany wpis „Component Ready” i wrzucić go do dashboardu dla zarządu, jest ogromna, a to prosta droga do metryki, która wygląda ładnie, ale niczego nie mówi o realnym doświadczeniu użytkownika.

**Link:** [Measuring Component Performance with the Container Timing API](https://csswizardry.com/2026/07/meaasuring-component-performance-with-the-container-timing-api/)

## Kiedy i co właściwie logować, według Sentry

**TLDR:** Artykuł Sentry zbiera praktyczne zasady logowania: co warto rejestrować, jak strukturyzować wpisy i czego nigdy nie wrzucać do logów, łącznie z danymi osobowymi i sekretami.

**Summary:** Główna rada brzmi banalnie, ale rzadko jest przestrzegana: kiedy nie wiesz, czy sięgnąć po trace, profil, metrykę czy log, zacznij od kilku celowanych linii logu, bo to najszybszy sposób na zebranie realnej informacji o działaniu aplikacji w produkcji. Autor otwarcie mówi, że logi mogą być tymczasową instrumentacją, dodawaną na czas debugowania i usuwaną, gdy przestają być potrzebne, co jest zdrowym podejściem w kontraście do praktyki zostawiania logów na zawsze „na wszelki wypadek”.

Konkretne kategorie, które warto logować, to decyzje runtime’owe, na przykład które flagi funkcji są włączone dla danego użytkownika, wyniki poszczególnych etapów algorytmu, żeby wiedzieć, gdzie coś się psuje w wieloetapowym procesie, oraz zdarzenia audytowe typu kto co zmienił i kiedy. Przykład z importem danych z zewnętrznego serwisu, gdzie autor loguje liczbę otrzymanych rekordów i szczegółowy rozkład powodów pominięcia rekordów jako osobne, skalarne pola, jest szczególnie konkretny i łatwy do przeniesienia na własny projekt.

Część o tym, jak pisać same wiadomości logów, kładzie nacisk na strukturę zamiast tekstu w stylu „DID I GET HERE”, oraz na dodawanie kontekstu w miarę jak żądanie przechodzi przez system, w tym identyfikatora trace’a łączącego log z rozproszonym śladem. Poziomy logów mają jasne przeznaczenie: debug do tymczasowej diagnostyki, info do normalnych zdarzeń aplikacji, warn do odzyskiwalnych sytuacji wymagających uwagi, i error tylko wtedy, gdy nie skorzystaliśmy już z dedykowanego mechanizmu przechwytywania wyjątków.

Najbardziej praktyczna część to lista rzeczy, których nie warto logować: każdego wywołania funkcji, bo od tego jest profilowanie i tracing, danych osobowych i sekretów, oraz dużych, niesformatowanych blobów danych bez konkretnego celu, jak pełne odpowiedzi HTTP czy prompty do LLM, które mogą zawierać wrażliwe informacje użytkownika.

**Key takeaways:**
- Logi mogą być tymczasową instrumentacją: dodaj je na czas debugowania konkretnego problemu i usuń, gdy przestaną być potrzebne.
- Strukturyzowane logi z konsekwentnymi polami klucz-wartość są łatwiejsze do przeszukiwania i wizualizacji niż wiadomości tekstowe.
- Nigdy nie loguj haseł, tokenów dostępu ani innych danych regulowanych przez RODO czy podobne standardy.

**Why do I care:** To jest tekst pisany przez firmę sprzedającą narzędzie do logowania, więc trzeba czytać go z odrobiną dystansu do promocyjnych fragmentów, ale rady same w sobie są solidne i pokrywają się z tym, co widuję w zespołach dojrzałych inżyniersko. Największa wartość to przypomnienie, że logi mają być tymczasowe i celowe, a nie domyślnym stanem każdej funkcji, bo to właśnie prowadzi do rachunków za observability, których nikt potem nie chce przeglądać.

**Link:** [When and what should I be logging?](https://blog.sentry.io/logging-best-practices/)

## Badanie: próg 2,5 sekundy dla LCP może być kompletnie nietrafiony dla twojej strony

**TLDR:** Analiza danych z dziesięciu dużych sklepów internetowych pokazuje, że optymalny czas LCP względem współczynnika odrzuceń mieści się między 100 milisekundami a 1 sekundą, czyli dużo poniżej progu 2,5 sekundy uznawanego przez Google za „dobry”.

**Summary:** Autorka, badaczka UX z wieloletnim doświadczeniem w performance, wychodzi od prostego pytania: skoro próg 2,5 sekundy dla Largest Contentful Paint jest liczony na podstawie zagregowanych danych z milionów stron, to czy w ogóle ma sens jako cel dla konkretnej firmy. Metoda polega na budowaniu wykresów korelacji, gdzie sesje użytkowników grupowane są w koszyki według czasu LCP, a nałożona linia pokazuje, jak w każdym koszyku zmienia się współczynnik odrzuceń.

Wyniki są zaskakująco spójne: we wszystkich dziesięciu sklepach optymalny LCP, czyli ten powiązany z najniższym współczynnikiem odrzuceń, mieścił się między 100 milisekundami a 1 sekundą, a nie w okolicach 2,5 sekundy. Dla czterech z dziesięciu sklepów tak zwane plateau wydajności, czyli punkt, po którym dalsze przyspieszanie przestaje cokolwiek zmieniać w zachowaniu użytkowników, zaczynało się jeszcze przed progiem Google. Innymi słowy, te strony formalnie spełniały wymogi „dobrego” LCP, jednocześnie będąc już dawno za punktem, w którym szybkość miała jakikolwiek wpływ na odrzucenia.

Autorka bardzo wyraźnie zastrzega, żeby nie traktować przedziału 100 milisekund do 1 sekundy jako nowego uniwersalnego celu, bo to dokładnie ta sama pułapka, przed którą przestrzega względem progu 2,5 sekundy. Rekomendowana metoda to zbudowanie własnego wykresu korelacji na podstawie danych z realnego ruchu i ustawienie celu tam, gdzie faktycznie znajduje się optimum dla danej strony.

Trzeba jednak przyznać, że metodologia ma swoje ograniczenia, których artykuł nie eksponuje: próbka to tylko dziesięć sklepów z jednej branży, a proxy w postaci współczynnika odrzuceń, wybrane głównie dlatego, że nie wymaga dodatkowej instrumentacji, nie jest tym samym co konwersja czy przychód. Korelacja między szybkością a odrzuceniami nie musi też oznaczać przyczynowości w każdym przypadku, choć autorka sama to pośrednio przyznaje, mówiąc o latach budowania takich wykresów.

**Key takeaways:**
- Optymalny LCP w badanych sklepach mieścił się między 100 milisekundami a 1 sekundą, znacznie poniżej progu 2,5 sekundy Google.
- Dla 4 z 10 sklepów plateau wydajności zaczynało się przed progiem „dobrego” LCP, czyli formalne spełnienie wymogu nie dawało już żadnej korzyści.
- Rekomendowana metoda to budowa własnego wykresu korelacji LCP i współczynnika odrzuceń zamiast ślepego podążania za progami branżowymi.

**Why do I care:** To dokładnie ten rodzaj badania, który powinien wisieć na ścianie każdego zespołu, który raportuje wyłącznie zielone checkmarki z Core Web Vitals do zarządu. Google’owe progi są punktem odniesienia dla rankingu wyszukiwarki, nie dla twojego biznesu, a różnica między tymi dwoma celami bywa ogromna, co ta dziesiątka sklepów pokazuje aż nadto wyraźnie. Jedyne czego mi brakuje w tym tekście, to przyznanie wprost, że próbka dziesięciu sklepów z jednej branży to za mało, żeby traktować ten zakres jako coś więcej niż mocną wskazówkę.

**Link:** [New research: The Core Web Vitals thresholds you trust might be wrong for your site](https://embrace.io/blog/research-core-web-vitals/)

## sibling-index(): mała funkcja CSS, która robi ładne animacje wejścia i wyjścia elementów

**TLDR:** Nowa funkcja CSS sibling-index() zwraca pozycję elementu wśród rodzeństwa i automatycznie aktualizuje się po dodaniu lub usunięciu elementów, co pozwala uzyskać płynne animacje list bez ani jednej linii JavaScriptu odpowiedzialnej za animację.

**Summary:** Pomysł opiera się na prostym spostrzeżeniu: indeks elementu wśród rodzeństwa zwykle traktujemy jako coś stałego, ale w rzeczywistości zmienia się dynamicznie, gdy dodajemy albo usuwamy elementy z listy. Jeśli ten indeks podepniemy pod właściwość CSS objętą transition, na przykład translate, to każda zmiana struktury DOM automatycznie wywoła animację przesunięcia pozostałych elementów, bez pisania żadnej logiki animacyjnej w JavaScripcie.

Implementacja opiera się na ułożeniu wszystkich elementów w tej samej komórce siatki przez grid-area: 1/1, a następnie przesunięciu każdego z nich o wielokrotność jego indeksu pomnożonego przez wysokość elementu plus odstęp. Dodanie deklaracji @starting-style pozwala jeszcze zdefiniować, jak nowy element ma wyglądać w momencie pojawienia się, na przykład zaczynając od przezroczystości zero i lekkiego przesunięcia w bok.

Autor uczciwie wylicza ograniczenia tej techniki: elementy muszą mieć tę samą wysokość, bo cała siatka dopasowuje się do najwyższego elementu, animowane elementy stają się „poza przepływem” przez translate, co może powodować nachodzenie na kontener, a co najważniejsze, nie ma żadnej naturalnej animacji wyjścia, bo usunięty element po prostu znika bez śladu, w przeciwieństwie do view transitions, które taką animację potrafią zaoferować kosztem odrobiny JavaScriptu.

Na koniec pojawia się garść bardziej rozbudowanych przykładów: lista awatarów z responsywnym nakładaniem się na siebie liczonym względem szerokości kontenera, okrągły układ awatarów wykorzystujący offset i circle(), oraz siatka elementów z wyliczaniem współrzędnych wiersza i kolumny na podstawie sibling-index() i sibling-count(). To już wymaga sporo matematyki w CSS, ale cały czas bez JavaScriptu odpowiedzialnego za samą animację.

**Key takeaways:**
- sibling-index() zwraca aktualny indeks elementu wśród rodzeństwa i aktualizuje się automatycznie po zmianach w DOM, co w połączeniu z transition daje darmową animację.
- Technika wymaga jednakowej wysokości elementów i akceptacji, że animowane elementy działają poza normalnym przepływem dokumentu.
- W chwili publikacji funkcję w pełni obsługują tylko Chrome i Edge, więc produkcyjne użycie wymaga rozważenia degradacji dla innych przeglądarek.

**Why do I care:** To ładny przykład tego, jak CSS krok po kroku przejmuje rzeczy, które kiedyś wymagały biblioteki JavaScript, ale ograniczone wsparcie przeglądarek i brak natywnej animacji wyjścia sprawiają, że na razie traktowałbym to jako fajny trik do demo, nie jako gotowe rozwiązanie do produkcyjnej listy z dużym ruchem, gdzie i tak trzeba by obsłużyć fallback.

**Link:** [In-N-Out Animation using sibling-index()](https://master.dev/blog/in-n-out-animation-using-sibling-index/)

## SVG filtry na tekście: jak drukarze sprzed wieku uczą nas dzisiejszego CSS

**TLDR:** Artykuł łączy historię druku typograficznego z technikami SVG, pokazując jak feMorphology, feOffset, feSpecularLighting i feTurbulence pozwalają odtworzyć na żywym tekście efekty takie jak rozlanie farby, cień drewnianej czcionki czy błysk metalowego druku.

**Summary:** Punktem wyjścia jest obserwacja z rzemiosła drukarskiego: kiedy metalowy lub drewniany blok był wciskany w papier, tusz rozlewał się poza kontur litery, a zecerzy kompensowali to, wycinając czcionkę nieco lżejszą niż docelowa. Autorka pokazuje, że CSS stroke-width nie potrafi odtworzyć tego efektu, bo dzieli obrys równo między wnętrze i zewnętrze litery, i nie da się tego przesunąć wyłącznie na zewnątrz. Do prawdziwego zewnętrznego obrysu potrzeba feMorphology z operatorem dilate, co jest jednym z tych momentów, gdzie zrozumienie jednej różnicy zmienia całe postrzeganie możliwości filtrów SVG na tekście.

Tekst szczegółowo pokazuje kilka technik: dilate do zewnętrznego obrysu, erode do ścieniania liter bez zmiany fontu, sztaplowane feOffset do uzyskania efektu wytłoczonego cienia w stylu dziewiętnastowiecznej drewnianej czcionki, oraz feSpecularLighting, które wykorzystuje rozmyty kanał alpha jako mapę wysokości do symulowania trójwymiarowego, metalicznego połysku śledzącego pozycję kursora. Osobny fragment poświęcony jest feTurbulence w połączeniu z feDisplacementMap, dającym efekt zużytego, spękanego druku bez trwałego niszczenia oryginalnego tekstu, bo cały efekt żyje w warstwie filtra.

Bardzo praktyczna jest część o integracji z HTML i CSS, bo filtr SVG to jeden obiekt, którego można użyć zarówno wewnątrz SVG, jak i na dowolnym elemencie HTML przez filter: url(#id). Autorka ostrzega, żeby nie chować definicji filtrów w SVG ustawionym na display: none, bo Chromium wtedy po prostu je odrzuca, i poleca zamiast tego ukrycie ich przez position: absolute i zerowe wymiary, żeby zostały w drzewie renderowania.

Najbardziej dojrzałym elementem artykułu są uwagi o wydajności i dostępności: filtry takie jak feTurbulence czy feDisplacementMap są kosztowne obliczeniowo i potrafią mocno obciążyć laptopa przy kilku animowanych naraz, więc autorka zaleca sterowanie animacją przez requestAnimationFrame, uruchamianie jej tylko w obrębie widoku przez IntersectionObserver, oraz respektowanie prefers-reduced-motion przez zatrzymanie na reprezentatywnej klatce zamiast pełnego wyłączenia efektu.

**Key takeaways:**
- feMorphology z operatorem dilate daje prawdziwy zewnętrzny obrys tekstu, czego CSS stroke-width nie potrafi zrobić.
- Sztaplowane feOffset i feSpecularLighting pozwalają odtworzyć efekty drukarskie jak cień wytłoczony czy metaliczny połysk reagujący na pozycję kursora.
- Kosztowne filtry jak feTurbulence wymagają IntersectionObserver do wyłączania animacji poza widokiem oraz obsługi prefers-reduced-motion.

**Why do I care:** To jeden z tych rzadkich tekstów, gdzie rzemiosło i inżynieria spotykają się bez kompromisów: efekty są naprawdę ładne, ale autorka od razu dorzuca ostrzeżenia o wydajności i dostępności, zamiast zostawiać to jako problem czytelnika do odkrycia dopiero w produkcji. Jeśli ktoś planuje użyć tych technik na nagłówku strony głównej, koniecznie niech przeczyta sekcję o kosztach obliczeniowych, zanim wrzuci trzy animowane filtry na jedną stronę.

**Link:** [SVG Filters on Type](https://www.carmenansio.com/articles/svg-filters-on-type/)

## MapLibre GL JS v6: duży skok wersji, jeszcze większa lista breaking changes

**TLDR:** MapLibre GL JS wydał wersję 6.0.0 z przejściem na dystrybucję wyłącznie ESM, wymaganiem WebGL2 zamiast WebGL1 oraz długą listą zmian łamiących kompatybilność wsteczną w API eventów, kamery i stylów.

**Summary:** Najbardziej dotkliwa zmiana dla istniejących projektów to porzucenie bundli UMD na rzecz dystrybucji wyłącznie w formacie ESM, co oznacza, że tagi script z atrybutem src trzeba zamienić na type="module", a import maplibregl from 'maplibre-gl' zamienić na import z gwiazdką albo importy nazwane. Dodatkowo zniknął specjalny bundle CSP, bo build ESM ładuje swojego workera jako prawdziwy URL, więc worker-src blob: przestaje być potrzebne w polityce bezpieczeństwa treści.

Równie poważna jest rezygnacja z WebGL1 na rzecz wymaganego WebGL2, co zespół tłumaczy tym, że wsparcie dla WebGL2 jest powszechne od lat, a utrzymywanie starszej ścieżki tylko komplikowało kod bez realnej korzyści. W praktyce ma to nie zmieniać sposobu interakcji z mapą, ale otwiera drogę do usprawnień wydajności, jak lepsze traktowanie przezroczystości linii czy usprawnienia w Terrain3D. Zespół dorzucił też refaktoryzację, w której Map przestaje dziedziczyć po Camera, a zamiast tego komponuje ją wewnętrznie, co jest bardziej kosmetyczną zmianą architektoniczną, ale wpływa na to, jakie wewnętrzne API są jeszcze dostępne.

Cała reszta changeloga to seria mniejszych, ale licznych złamań kompatybilności: eventy są teraz prawdziwymi klasami instancjonowanymi przy emisji, zamiast prostych obiektów, sygnatura styleimagemissing zmieniła się z callbacku rozwiązującego obraz na zwykłe zdarzenie powiadamiające, a target TypeScript podniesiono do ES2022, co dla starszych zestawów narzędzi może oznaczać konieczność transpilacji. Do tego dochodzą liczne poprawki wydajności, jak debounce broadcastu setImages do raz na klatkę animacji czy przyspieszenie generowania plików .d.ts o rząd wielkości dzięki zmianie narzędzia budującego.

Warto zauważyć, że projekt jest bardzo transparentny co do skali zmian, każda pozycja oznaczona jako łamiąca kompatybilność ma swój osobny opis i numer pull requesta, co ułatwia migrację, ale nie zmienia faktu, że to jest jeden z tych release’ów, które wymagają realnego budżetu czasowego na aktualizację, a nie prostego bump wersji w package.json.

**Key takeaways:**
- Dystrybucja ESM-only zastępuje bundle UMD, wymuszając zmianę sposobu importowania biblioteki w skryptach i bundlerach.
- WebGL2 jest teraz wymagany, WebGL1 zostało całkowicie usunięte z biblioteki.
- Eventy mapy stały się prawdziwymi klasami z lepszym typowaniem, ale to zmienia sygnatury wielu handlerów.

**Why do I care:** Migracje takie jak ta są dobrym przypomnieniem, że nawet dojrzałe biblioteki open-source’owe od czasu do czasu robią duże, bolesne cięcia, żeby pozbyć się długu technicznego, i że warto budżetować na to realny czas zespołu, a nie traktować bump majora jako rutynową aktualizację w CI. Jeśli twój produkt renderuje mapy i wciąż celuje w WebGL1 albo ładuje bibliotekę przez zwykły tag script, ta migracja nie jest opcjonalna, tylko wymuszona.

**Link:** [Release v6.0.0 · maplibre/maplibre-gl-js](https://github.com/maplibre/maplibre-gl-js/releases/tag/v6.0.0)
