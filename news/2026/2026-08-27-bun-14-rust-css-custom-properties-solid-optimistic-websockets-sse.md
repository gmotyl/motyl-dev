---
title: "Bun 1.4 przepisany na Rust, kiedy CSS liczy zmienne, optymistyczne zapisy w Solid i spór WebSockets kontra SSE"
excerpt: "Bun wchłania piętnaście zależności i zmienia język implementacji, Jake Archibald tłumaczy moment obliczania zmiennych CSS, a José Valim pokazuje, że spór o transport dotyczy tak naprawdę kolejności zdarzeń."
publishedAt: "2026-08-26"
slug: "bun-14-rust-css-custom-properties-solid-optimistic-websockets-sse"
hashtags: "#uidev #bun #rust #css #solidjs #websockets #performance #architecture #javascript #generated #pl"
source_pattern: "ui.dev"
---

## Bun 1.4: przepisany na Rust, piętnaście zależności mniej i drastycznie niższe zużycie pamięci

**TLDR:** Bun 1.4 przechodzi z Ziga na Rusta, dokłada ponad tysiąc pięćset testów z zestawu Node.js, zmniejsza zużycie pamięci nawet o trzydzieści pięć procent i pięciokrotnie obniża obciążenie procesora na biegu jałowym. Do tego wchłania funkcje piętnastu popularnych pakietów npm prosto do binarki.

**Summary:** Zacznijmy od tego, co najbardziej rzuca się w oczy, czyli od zmiany języka. Bun był pisany w Zigu i to była część jego tożsamości, a teraz jest w Ruście. Zespół pisze, że Claude Code działa na tym porcie od miesięcy, a Prisma wypuściła na nim swój produkt. To nie jest decyzja podjęta pochopnie, ale i tak warto ją odnotować jako rzadki przypadek, w którym duży projekt przyznaje, że zmienia fundament. Dla użytkownika teoretycznie nic się nie zmienia, praktycznie zmienia się wszystko, bo to zupełnie inna baza kodu z innym profilem błędów.

Liczby wydajnościowe są mocne i, co ważne, konkretne. Dla Claude Code, czyli dużej i długo działającej aplikacji, zużycie procesora spadło dwukrotnie: percentyl dziewięćdziesiąt dziewięć z dwudziestu czterech do dziesięciu procent. Serwery HTTP zużywają od trzynastu do czterdziestu ośmiu procent mniej pamięci, a przy Fastify to spadek ze dwustu trzydziestu trzech do stu dwudziestu megabajtów, czyli poniżej Node'a. Start na Linuksie jest dwa razy szybszy, na Windowsie dwa i pół raza. Za tym stoi porzucenie dwóch alokatorów pamięci na rzecz jednego, rozszerzonego o czyszczenie stron i wątek zwalniający pamięć, gdy JavaScript stoi bezczynnie.

Najciekawsza strategicznie jest lista tego, co Bun wchłonął do standardowej biblioteki. Bun.Image zastępuje sharp i jest o trzydzieści osiem procent szybszy przy zmianie rozmiaru obrazu PNG do JPEG. Bun.WebView to sterowanie przeglądarką bez Puppeteera i Playwrighta, na macOS przez systemowy WebKit, a wszędzie przez zainstalowanego Chrome'a. Bun.markdown parsuje Markdown i potrafi zwrócić elementy Reacta. Bun.cron rejestruje zadanie w systemowym harmonogramie, czyli w crontabie, launchd albo Task Schedulerze, z interfejsem takim samym jak wyzwalacze czasowe w Cloudflare Workers. Bun.Terminal to pseudoterminal bez node-pty. A polecenie uruchamiające skrypty równolegle zastępuje npm-run-all i concurrently.

Sekcja obserwowalności zawiera coś, czego nie widziałem wcześniej nigdzie indziej. Bun potrafi zapisać profil procesora i profil sterty jako Markdown, a nie jako plik binarny do wczytania w DevToolsach. Efekt to plik, który przeczytasz przez SSH, przeszukasz grepem, wkleisz do zgłoszenia błędu albo podasz modelowi językowemu. To jest projektowanie narzędzi z myślą o tym, że częścią zespołu jest teraz agent, i uważam to za jeden z pierwszych naprawdę przemyślanych przykładów takiego myślenia. Podobnie działa analiza bundla zapisywana jako Markdown z pełnym grafem modułów i łańcuchami zależności.

Jest jedna rzecz, o której warto pamiętać przy wchłanianiu bibliotek. Wyjście z Bun.markdown nie jest sanityzowane, więc surowy HTML, atrybuty z obsługą zdarzeń i adresy javascript przechodzą przez parser bez zmian. Jeśli renderujesz Markdown od użytkowników, sanityzacja jest nadal twoim zadaniem. To dokładnie ten rodzaj szczegółu, który ginie w euforii nad zerową liczbą zależności i wraca po pół roku jako zgłoszenie o cross-site scripting.

**Key takeaways:**
- Bun jest teraz napisany w Ruście zamiast w Zigu, po miesiącach działania portu w produkcji
- Zużycie pamięci serwerów HTTP spada o trzynaście do czterdziestu ośmiu procent, a procesora na biegu jałowym pięciokrotnie
- Piętnaście popularnych pakietów npm zostało zastąpionych funkcjami wbudowanymi w binarkę
- Profile procesora, sterty i bundla można zapisać jako Markdown do czytania w terminalu albo podania modelowi
- Wbudowany parser Markdown nie sanityzuje wyjścia, więc treść od użytkowników nadal trzeba czyścić samemu

**Why do I care:** Strategia wchłaniania zależności jest dla mnie najważniejszą częścią tego wydania i mam wobec niej mieszane uczucia. Z jednej strony każdy usunięty pakiet to mniejsze ryzyko w łańcuchu dostaw i jedna rzecz mniej do aktualizowania. Z drugiej wiąże cię z konkretnym runtime'em w sposób, z którego trudno wyjść, bo kod używający Bun.Image nie uruchomi się nigdzie indziej. To klasyczny kompromis między wygodą a przenośnością, tylko tym razem opakowany w argument o bezpieczeństwie. Profile w Markdownie natomiast biorę bez zastanowienia, bo to realne ułatwienie w codziennej diagnostyce.

**Link:** [Bun 1.4](https://bun.com/blog/bun-v1.4)

## Kontrolowanie momentu, w którym CSS oblicza wartości zmiennych

**TLDR:** Jake Archibald tłumaczy, że niezarejestrowane zmienne CSS są przechowywane jako strumień tokenów i obliczane dopiero w miejscu użycia, a rejestracja przez regułę property zmienia moment obliczenia na miejsce deklaracji. Różnica potrafi dać zupełnie inne wyniki dla tej samej reguły.

**Summary:** Przykład jest genialnie dobrany. Mamy element, w którym deklarujemy zmienną z wartością zwracającą indeks elementu wśród rodzeństwa, a potem używamy tej zmiennej w regule dla pierwszego dziecka. Pytanie brzmi: czy dostaniemy indeks elementu, w którym zmienna została zdefiniowana, czy indeks dziecka, w którym została użyta? Odpowiedź brzmi: to zależy, i właśnie ta zależność jest tematem tekstu.

Domyślnie zmienna, której nie zarejestrowałeś, zachowuje się tak, jakby miała składnię akceptującą wszystko. To znaczy, że jej wartość jest przechowywana jako surowy strumień tokenów i nic się nie oblicza w momencie deklaracji. Dopiero gdy sięgniesz po nią przez funkcję var, tokeny są podstawiane w miejsce użycia i obliczane w tamtym kontekście. W efekcie funkcja licząca indeks rodzeństwa wykonuje się na dziecku, a nie na rodzicu, i wynik to jeden. Można to zobaczyć bezpośrednio, bo odczyt wyliczonego stylu zwraca dosłownie tekst wywołania funkcji, a nie liczbę.

Zarejestrowanie zmiennej z określoną składnią zmienia wszystko. Kiedy powiesz, że zmienna jest liczbą, wartość zostaje policzona w momencie deklaracji, w kontekście elementu, który ją deklaruje. Teraz odczyt wyliczonego stylu zwraca liczbę, a nie tekst, a indeks rodzeństwa to dwa, bo policzył się na rodzicu. Ta sama reguła CSS, dwa różne wyniki, a jedyną różnicą jest istnienie deklaracji rejestrującej gdzieś indziej w arkuszu.

To dotyczy znacznie więcej niż funkcji indeksującej rodzeństwo. Wszystkie jednostki względne, czyli em, ex, ch, cap i lh, oraz jednostki zapytań o kontener zachowują się tak samo. Rejestracja decyduje, wobec którego elementu te jednostki są liczone. Osobny przypadek to adresy URL, bo te rozwiązują się względem arkusza w momencie obliczania wartości. Zmienna jako strumień tokenów zdefiniowana w jednym arkuszu, a użyta w drugim, rozwiąże adres względem tego drugiego. Rejestracja ze składnią adresu przypina go do arkusza, który go zadeklarował. To jest realna pułapka przy bibliotekach komponentów rozprowadzanych jako osobne pliki CSS.

Ostatni fragment dotyczy zagnieżdżonych wywołań var i jest najbardziej podchwytliwy. Funkcja var należy do rodziny funkcji dowolnego podstawienia, razem z if, attr i ident, i te podstawiają się niezależnie od zadeklarowanej składni zmiennej. Więc jeśli zmienna zewnętrzna zawiera odwołanie do innej zmiennej, to odwołanie zostaje rozwinięte w miejscu deklaracji, a nadpisanie tej wewnętrznej zmiennej na dziecku jest ignorowane. Autor przyznaje szczerze, że sam znał ten mechanizm tylko połowicznie, dopóki nie usiadł i nie sprawdził. To uczciwe i uspokajające, bo jeśli on tego nie wiedział, to ty też nie musiałeś.

**Key takeaways:**
- Niezarejestrowana zmienna CSS to strumień tokenów obliczany dopiero w miejscu użycia
- Rejestracja zmiennej ze składnią przenosi moment obliczenia do miejsca deklaracji
- Dotyczy to jednostek względnych, jednostek zapytań o kontener i rozwiązywania adresów URL
- Funkcja var podstawia się zawsze, niezależnie od składni, więc nadpisania na dziecku bywają ignorowane
- Odczyt wyliczonego stylu pokazuje różnicę: tekst wywołania kontra policzona liczba

**Why do I care:** To jest wiedza, która oszczędzi ci godziny debugowania systemu designu. Jeśli budujesz bibliotekę komponentów opartą na zmiennych CSS i nie rejestrujesz ich, dostajesz zachowanie zależne od miejsca użycia, którego nikt w zespole nie umie przewidzieć. Rejestracja daje przewidywalność, ale też sztywność, bo raz zadeklarowana składnia obowiązuje wszędzie. Osobno chciałbym podkreślić kwestię adresów URL rozwiązywanych względem arkusza konsumenta, bo to cichy zabójca bibliotek dystrybuowanych jako pakiety. Ktoś zaimportuje twój CSS z innego katalogu i wszystkie ikony znikną, a przyczyna nie będzie widoczna w żadnym narzędziu.

**Link:** [Controlling when CSS custom property values are computed](https://jakearchibald.com/2026/css-custom-property-compute-time/)

## Async Solid: pisz synchronicznie, wykonuj asynchronicznie

**TLDR:** Druga część serii o obsłudze asynchroniczności w Solid 2.0, tym razem o zapisach. Teza jest odważna: twoja aplikacja czysto kliencka od zawsze była optymistycznym interfejsem, tylko nie wiedziała jeszcze o istnieniu serwera. Dodanie prawdziwego backendu to jedna zmiana konstruktora magazynu i jeden wrapper na mutację.

**Summary:** Autor bierze najbardziej ograne demo we frontendzie, czyli listę zadań, i pokazuje na nim coś, czego zwykle nie widać. Zaczyna od wersji czysto klienckiej z magazynem opartym na mutacjach, gdzie zmiana pojedynczej właściwości przelicza tylko te fragmenty interfejsu, które jej słuchają. Nie listę, nie wiersz, tylko dokładnie ten jeden kawałek. Potem zadaje pytanie, które zna każdy zespół: co, jeśli te dane mają mieszkać w bazie?

Klasyczna odpowiedź jest bolesna i autor ją dokładnie wylicza. Robisz zdjęcie stanu cache'u, piszesz predykcję, wysyłasz mutację, przy błędzie przywracasz, przy sukcesie unieważniasz. Do tego dochodzą współbieżne żądania, wyścigi, stany ładowania i rozjeżdżanie się optymistycznych aktualizacji. Autor przypomina, że robił dokładnie to samo z klientami GraphQL lata temu. Prototyp działa, wszystkim się podoba, a potem trzeba go zrobić naprawdę i to jest przepisanie od zera.

Rozwiązanie w Solid 2.0 polega na tym, że wywołania zapisujące do magazynu nie zmieniają się w ogóle. Zmienia się konstruktor magazynu na wersję optymistyczną, przyjmującą źródło danych z serwera, i każda mutacja zostaje owinięta w akcję. Akcje są funkcjami generatorowymi, co autor uczciwie tłumaczy jako obejście ograniczenia JavaScriptu: nie da się zachować kontekstu po słowie kluczowym await, a propozycja kontekstu asynchronicznego może potrzebować lat, żeby trafić do przeglądarek. Generatory pozwalają oddawać obietnice na zewnątrz i mieć podobne doświadczenie, zachowując dostęp do kontekstu transakcji.

Najbardziej pomysłowy jest mechanizm braku wycofywania zmian. Optymistyczne zapisy nie są drugą kopią stanu, tylko warstwą nałożoną na wierzch. System reaktywny porzuca tę warstwę, gdy transakcja się kończy, niezależnie od tego, czy sukcesem, czy porażką. Jeśli wywołanie serwera rzuci wyjątkiem, nakładka znika i lista wraca do punktu wyjścia bez żadnej logiki cofania. A jeśli przewidywanie było zgodne z rzeczywistością, nie dzieje się nic: żaden komponent się nie przelicza, bo uzgadnianie z potwierdzoną prawdą nie wykrywa różnic.

Autor sam przyznaje, gdzie ten model jest za łatwy. Działa świetnie, gdy synchroniczne doświadczenie jest tym, czego chcemy, czyli w tablicach zadań i aplikacjach wieloosobowych. Ale jeśli pozwolisz użytkownikowi uciec za daleko do przodu i coś się nie uda, efekt będzie bardziej gwałtowny, bo człowiek zdążył uznać swoją pracę za wykonaną. Zbieranie nieudanych akcji i odtwarzanie ich jest możliwe, ale to decyzja projektowa, a nie automat. Mój ulubiony fragment to sugestia, żeby wskaźnik zapisywania wbudować wprost w schemat danych jako pole oczekujące, które znika samo, gdy wszystko się ustabilizuje.

**Key takeaways:**
- Wywołania zapisujące do magazynu nie zmieniają się przy przejściu z wersji klienckiej na serwerową
- Akcje jako generatory obchodzą brak kontekstu asynchronicznego w JavaScripcie
- Optymistyczny zapis to nakładka porzucana po transakcji, więc nie potrzeba logiki wycofywania
- Gdy przewidywanie zgadza się z rzeczywistością, żaden komponent się nie przelicza
- Prototyp staje się produkcją przez dodanie kodu, a nie przez przepisanie

**Why do I care:** Obietnica, że prototyp nie idzie do kosza, jest największą wartością tego podejścia i jednocześnie miejscem, gdzie byłbym najostrożniejszy. Widziałem zbyt wiele projektów, w których ta obietnica działała do momentu pojawienia się prawdziwych wymagań: uprawnień, walidacji po stronie serwera, konfliktów przy równoczesnej edycji. Ale kierunek jest właściwy i architektonicznie ciekawszy niż to, co dziś robimy z bibliotekami cache'ującymi w Reakcie. Warto śledzić, choćby po to, żeby mieć porównanie, gdy będziesz projektował własną warstwę optymistycznych aktualizacji.

**Link:** [Async Solid - Write Sync, Run Async](https://www.solidjs.com/blog/async-solid-write-sync-run-async)

## WebSockets kontra SSE to spór o kolejność i poprawność, a nie o transport

**TLDR:** José Valim odpowiada na popularną tezę z Hacker News, że dla większości aplikacji wystarczą zdarzenia serwera i zwykłe żądania HTTP. Jego argument jest inny niż zwykle: prawdziwym tematem nie jest opóźnienie ani rozmiar pakietów, tylko to, czy zdarzenia dotrą we właściwej kolejności.

**Summary:** Popularny komentarz brzmiał tak: użyj zdarzeń wysyłanych przez serwer plus wbudowanego mechanizmu żądań, opóźnienie będzie takie samo, bo przeglądarki i tak multipleksują żądania na jednym otwartym połączeniu. Valim najpierw rozprawia się z tym technicznie. Owszem, połączenie jest współdzielone, ale każde żądanie pozostaje bezstanowe, więc za każdym razem trzeba odszyfrować sesję i pobrać użytkownika z bazy albo cache'u. Przy połączeniu ciągłym uwierzytelnienie następuje raz, a dane użytkownika siedzą w pamięci.

Potem przechodzi do sedna, czyli do przykładu, który powinien trafić do każdego podręcznika. Artykuł ma trzy tagi. Ty dodajesz czwarty, a w tym samym momencie ktoś inny usuwa jeden z istniejących. Oczekiwany wynik jest oczywisty i baza faktycznie go osiąga. Ale przez sieć, odśmiecacz, serwery pośredniczące i zwykłe niedeterminizmy możliwa jest kolejność, w której operacja usunięcia wykonuje się pierwsza, a jej aktualizacja dociera później. Wtedy interfejs pokazuje przez chwilę poprawną listę, a ostatecznie ląduje w stanie, w którym twój dodany tag po prostu nie istnieje.

Tu pada zdanie, które najbardziej mi się spodobało. Ktoś powie, że to nic, bo system jest spójny ostatecznie. Valim odpowiada, że to nie jest znaczenie tego pojęcia. Spójność ostateczna gwarantuje, że przy braku nowych zmian wszystkie kopie danych zbiegną się do tej samej wartości. Tutaj to się nie stanie. Interfejs może zostać nieaktualny w nieskończoność, dopóki użytkownik nie odświeży strony albo nie nadejdzie kolejne zdarzenie. To nadużycie terminologii jest bardzo częste i dobrze, że ktoś je wreszcie nazwał.

Przyczyną nie jest technologia, tylko fakt, że dane płyną dwoma różnymi strumieniami. Ta sama choroba dotknie aplikację używającą połączenia dwukierunkowego do odczytu i zwykłych żądań do zapisu. Różnica polega na tym, że połączenie dwukierunkowe pozwala przeprowadzić jedno i drugie tym samym kanałem, więc kolejność przyczynowa zostaje zachowana za darmo. Alternatywy dla wariantu ze zdarzeniami serwera istnieją, ale każda coś kosztuje. Możesz sprawić, żeby tylko jeden strumień dostarczał aktualizacje, ale wtedy własne zmiany muszą przejść przez kolejkę i wracają z opóźnieniem. Możesz wysyłać przez zdarzenia tylko sygnał odśwież się, ale wtedy rośnie obciążenie serwera i musisz kolejkować żądania po stronie klienta. Możesz też porządkować zdarzenia u klienta, co brzmi prosto, a jest na tyle trudne, że powstały wokół tego całe platformy.

**Key takeaways:**
- Dwa strumienie danych aktualizujące ten sam fragment interfejsu zawsze mogą się ze sobą ścigać
- Interfejs, który zostaje nieaktualny do odświeżenia strony, nie jest spójny ostatecznie
- Połączenie dwukierunkowe zachowuje kolejność przyczynową między akcją a odpowiedzią za darmo
- Każde obejście dla wariantu jednokierunkowego kosztuje opóźnienie, obciążenie serwera albo złożoność klienta
- Uwierzytelnianie raz na połączenie oszczędza pracę powtarzaną przy każdym żądaniu

**Why do I care:** Pytanie kontrolne, które proponuje autor, wpisuję sobie do listy pytań na przegląd architektury: jak zagwarantujesz, że zdarzenia dotrą we właściwej kolejności? W typowej aplikacji reactowej z biblioteką cache'ującą i osobnym kanałem czasu rzeczywistego ten wyścig istnieje i nikt go nie testuje, bo lokalnie opóźnienie jest zerowe. Objawia się dopiero na produkcji, jako zgłoszenie, że użytkownikowi zniknęła zmiana, i nigdy nie da się go odtworzyć. Warto wiedzieć, że to nie duch w maszynie, tylko przewidywalna konsekwencja architektury z dwoma strumieniami.

**Link:** [WebSockets vs. SSE should be about ordering and correctness](https://dashbit.co/blog/websockets-vs-sse)

## Aplikacje w jednym pliku z Gleamem i Bunem

**TLDR:** Autor pokazuje, jak skompilować program napisany w Gleamie do JavaScriptu, a potem spakować go razem z runtime'em Buna w jeden samodzielny plik wykonywalny. Dwa polecenia i binarka działająca na maszynie bez Gleama, bez Buna i bez kodu źródłowego.

**Summary:** Punkt wyjścia to dwie niezależne rzeczy. Gleam to język z systemem typów w stylu Hindleya i Milnera, zwykle uruchamiany na maszynie wirtualnej znanej z Erlanga i Elixira, ale mający też backend generujący JavaScript. Bun z kolei potrafi spakować kod razem z własnym runtime'em w pojedynczą binarkę, którą da się kompilować skrośnie na Linuksa, macOS i Windows, w wariantach na glibc i musl.

Klejem między tymi światami są zewnętrzne deklaracje w Gleamie. Mówisz kompilatorowi, że funkcja o takiej nazwie będzie istnieć w czasie wykonania, przyjmie takie argumenty i zwróci taką wartość, a implementacja leży w osobnym pliku JavaScript obok. Typy w takiej deklaracji nie są sprawdzane, więc odpowiedzialność za ich poprawność spada na programistę. To ten sam kompromis, co w deklaracjach typów dla bibliotek w TypeScripcie: masz wygodę i typy w miejscu użycia, ale granica jest tak dobra, jak twoja uczciwość przy jej opisywaniu.

Sam przepływ pracy jest zaskakująco prosty. Budujesz projekt Gleamem z docelowym JavaScriptem, co generuje zwykłe moduły ECMAScript o zdumiewająco czytelnej postaci. Piszesz mały plik wejściowy, który importuje wygenerowaną funkcję główną i ją wywołuje. Potem podajesz ten plik bundlerowi Buna z flagą kompilacji i dostajesz samodzielną binarkę. Autor podkreśla rzecz, którą łatwo przeoczyć: Bun w ogóle nie wie, że w grę wchodził Gleam. Widzi zwykłe moduły z relatywnymi importami i pakuje je tak samo jak każdy inny projekt.

Kompilacja skrośna działa z tego samego polecenia z dodatkową flagą celu. Z Maca budujesz plik wykonywalny dla Linuksa i pierwsza taka kompilacja jest wolniejsza, bo Bun musi pobrać runtime dla wskazanej platformy. To dokładnie ten rodzaj dystrybucji, którego brakowało narzędziom pisanym w JavaScripcie od zawsze. Zamiast instrukcji zaczynającej się od zainstaluj Node'a dajesz człowiekowi jeden plik.

**Key takeaways:**
- Gleam ma backend generujący czytelny JavaScript w formacie modułów ECMAScript
- Zewnętrzne deklaracje pozwalają wołać API runtime'u, ale ich typy nie są weryfikowane
- Bundler Buna pakuje kod razem z runtime'em w jedną samodzielną binarkę
- Kompilacja skrośna obejmuje Linuksa, macOS i Windows na x64 oraz arm64
- Cały przepływ to dwa polecenia, bez żadnej wiedzy Buna o istnieniu Gleama

**Why do I care:** Dystrybucja narzędzi wiersza poleceń pisanych w JavaScripcie zawsze była upokarzająca w porównaniu z Go czy Rustem. Ten wzorzec to zamyka i nie musisz do niego używać Gleama, bo zadziała tak samo z TypeScriptem. Jeśli twój zespół utrzymuje wewnętrzne narzędzia i traci czas na tłumaczenie ludziom, jakiej wersji Node'a potrzebują, jedna binarka rozwiązuje ten problem raz na zawsze. Gleam jest tu ciekawostką i dowodem, że mechanizm jest naprawdę niezależny od języka źródłowego.

**Link:** [Single file apps with Gleam and Bun](https://alistair.sh/gleam-bun-apps)

## Eliminowanie rozgałęzień w pętlach C++

**TLDR:** Bardzo konkretny tekst o tym, jak przyspieszyć sprawdzanie klas znaków w parserach, przechodząc od pętli z wczesnym wyjściem przez akumulację bez rozgałęzień i sztuczkę z przepełnieniem, aż po przetwarzanie wielu bajtów naraz. Różnica między wersją naiwną a wektorową to szesnastokrotność.

**Summary:** Problem jest prosty do opisania: sprawdź, czy cały ciąg składa się wyłącznie z małych liter ASCII. Naiwna implementacja przechodzi znak po znaku i zwraca fałsz przy pierwszym złym bajcie. Autor zwraca uwagę na coś, co łatwo przeoczyć: jeśli spodziewamy się, że prawie każde wejście jest poprawne, to wczesne wyjście jest kosztowne. Procesor zgaduje, którą gałąź wykona, i za każde złe zgadnięcie płacisz opróżnieniem potoku. Operatory logiczne ze skróconym obliczaniem pogarszają sprawę, bo każdy z nich to kolejna gałąź.

Pierwsza poprawa polega na skanowaniu całego wejścia i akumulowaniu wyniku operacją bitową zamiast logiczną. Operacja bitowa zawsze oblicza obie strony, więc nie ma skróconego obliczania i nie ma gałęzi. To brzmi jak marnowanie pracy, a jest odwrotnie: pętla bez rozgałęzień daje kompilatorowi szansę na automatyczną wektoryzację. Druga poprawa jest elegancka: zamiast dwóch porównań odejmujesz od bajtu literę rozpoczynającą zakres i sprawdzasz, czy wynik mieści się w dwudziestu pięciu. Bajty poniżej zakresu przepełniają się w dół i lądują w górnym końcu zakresu bez znaku, gdzie oblewają ten sam test.

Dalej robi się ciekawiej i mniej oczywiście. Tablica dwustu pięćdziesięciu sześciu elementów wygląda na oczywistą optymalizację, a w pomiarach przegrywa z naiwną pętlą, bo ogranicza ją opóźnienie odczytu z pamięci. Autor jest tu uczciwy i pisze wprost, żeby nie używać tablicy dla pojedynczego przedziału. Tablica zaczyna wygrywać dopiero przy klasach będących sumą przedziałów i interpunkcji, jak cyfry szesnastkowe albo zabronione znaki w nazwie hosta. Wtedy alternatywą jest sześć porównań i drzewo skoków.

Technika SWAR, czyli przetwarzanie wielu bajtów w jednym rejestrze, i wersje z instrukcjami wektorowymi domykają temat. Pomiary z serwerowego procesora przy skanowaniu megabajta poprawnego wejścia mówią same za siebie: naiwna pętla cztery gigabajty na sekundę, tablica trzy jeden, wersja z przepełnieniem zwektoryzowana przez kompilator czternaście dwa, SWAR pięćdziesiąt trzy dwa, a wektory szerokie na trzydzieści dwa bajty prawie sześćdziesiąt cztery. Autor kończy zaleceniem, którego brakuje w większości tekstów o wydajności: napisz najpierw wersję skalarną bez rozgałęzień, bo kompilator prawdopodobnie sam ją zwektoryzuje, i jeśli po tym zniknęła z profilu, przestań.

**Key takeaways:**
- Wczesne wyjście z pętli opłaca się tylko wtedy, gdy błędne wejście jest częste i pojawia się blisko początku
- Operacja bitowa zamiast logicznej usuwa rozgałęzienia i otwiera drogę do automatycznej wektoryzacji
- Odejmowanie z przepełnieniem zamienia dwa porównania w jedno dla pojedynczego przedziału
- Tablica przeglądowa przegrywa dla prostego przedziału, wygrywa dla sumy przedziałów i interpunkcji
- Zawsze rzutuj bajt na typ bez znaku przed klasyfikacją, bo znakowy bajt powyżej stu dwudziestu siedmiu staje się ujemny

**Why do I care:** Kod jest w C++, ale problem jest nasz. Parsery adresów URL, walidatory i tokenizery siedzą w każdym narzędziu frontendowym i to właśnie te pętle pojawiają się w profilach bundlerów oraz lintery. Jeśli piszesz cokolwiek w Ruście albo Ziga do ekosystemu JavaScriptu, ten tekst jest praktyczną instrukcją. A jeśli nie, i tak warto go przeczytać dla jednego zdania: zmierz wersję, którą właśnie zamierzasz usunąć. Za dużo optymalizacji w naszej branży opiera się na intuicji, którą ten artykuł miażdży wynikiem tablicy przeglądowej.

**Link:** [Eliminating branches in C++ loops](https://www.yagiz.co/eliminating-branches-in-cpp-loops)
