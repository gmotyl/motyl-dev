---
title: "Wskaźnik sukcesu, który kłamie, benchmarki RocksDB, które oszukały autora, i kradzież sesji Microsoft 365"
excerpt: "Trzy teksty o mierzeniu rzeczy, które naprawdę mają znaczenie: mianownik metryki produktowej, uczciwe benchmarki bazy danych i atak omijający dwuskładnikowe uwierzytelnianie."
publishedAt: "2026-08-25"
slug: "wskaznik-sukcesu-ktory-klamie-benchmarki-rocksdb-kradziez-sesji-m365"
hashtags: "#HackerNoon #performance #architecture #security #monitoring #javascript #database #generated #pl"
source_pattern: "HackerNoon"
---

## Twój wskaźnik skuteczności po stronie klienta prawdopodobnie cię okłamuje

**TLDR:** Aplikacja przetwarzająca wideo w przeglądarce raportowała dziewięćdziesiąt dwa procent udanych zadań. Liczba była poprawna i całkowicie myląca, bo mianownik zawierał tylko materiały, które w ogóle weszły do silnika. Zaostrzenie limitów podnosiło wskaźnik przy jednoczesnym pogorszeniu produktu.

**Summary:** To jest jeden z najlepszych tekstów o metrykach, jakie czytałem w tym roku, i jego wartość wykracza daleko poza przetwarzanie wideo. Autor buduje narzędzie działające w całości w przeglądarce, obsługujące dwieście siedemdziesiąt tysięcy użytkowników miesięcznie. Po serii optymalizacji silnika wskaźnik skuteczności wzrósł z sześćdziesięciu trzech do dziewięćdziesięciu dwóch procent. Sukces, tylko że ten wskaźnik liczył wyłącznie te filmy, które zostały wpuszczone do przetwarzania. Jeśli aplikacja odrzuciła materiał, bo przekraczał limit rozmiaru albo liczby klatek, użytkownik po prostu znikał z mianownika.

Konsekwencja tej definicji jest zabójcza. Zaostrzając zasady wpuszczania i przepuszczając tylko najłatwiejsze materiały, autor mógł podnieść wskaźnik do dziewięćdziesięciu ośmiu procent przy jednoczesnym spadku liczby ludzi, którzy dostali swój wynik. Metryka sukcesu wykluczająca odrzuconą pracę tworzy złą motywację. Rozwiązanie polegało na przesunięciu granicy pomiaru z momentu rozpoczęcia przetwarzania na moment wybrania poprawnego pliku, i rozbiciu wyniku na cztery kategorie: ukończono, zablokowano regułą, nie powiodło się w trakcie, porzucono. Suma tych czterech to jeden, a gwiazdą północną staje się odsetek ukończonych.

Z tego wynika bardzo elegancki test dla każdej zmiany pojemności: spadek odsetka zablokowanych musi być większy niż wzrost odsetka nieudanych. Jeśli blokady spadły o cztery punkty procentowe, a błędy przetwarzania wzrosły o siedem, produkt się nie poprawił. Po prostu przeniósł porażkę z momentu przed przetwarzaniem na moment po tym, jak użytkownik już się naczekał.

Techniczna część jest równie dobra. W aplikacji działającej po stronie klienta urządzenie użytkownika jest twoją infrastrukturą. Jego pamięć to twój limit pamięci, jego procesor to twoja moc obliczeniowa, jego przeglądarka decyduje o dostępnych kodekach, a jego stan termiczny potrafi zmienić wydajność w trakcie tego samego zadania. Autor zmierzył przepustowość dekodowania od około sześćdziesięciu klatek na sekundę na słabych urządzeniach do dziewięciuset sześćdziesięciu na mocnych. Jeden globalny limit klatek nie jest w tej sytuacji polityką bezpieczeństwa, tylko polityką najniższego wspólnego mianownika, która jednocześnie niedoszacowuje mocne urządzenia i przeszacowuje słabe.

Ocena możliwości urządzenia jest celowo prymitywna: pamięć, liczba rdzeni i dostępność natywnego dekodera, zważone i sprowadzone do trzech poziomów. Autor podkreśla, że to nie jest uczenie maszynowe i że nie należy udawać precyzji, bo wynik sześć osiem nie jest istotnie pewniejszy niż sześć siedem. Użyteczne jest kilka wytłumaczalnych poziomów, które da się testować niezależnie. Eksperyment podniósł limit klatek dla wąskiej grupy mocnych urządzeń stacjonarnych i przyniósł wzrost ukończeń o do sześciu punktów procentowych przy spadku odsetka blokad z dziesięciu do pięciu i trzech dziesiątych procenta, przy zachowanej niezawodności silnika na poziomie dziewięćdziesięciu sześciu procent.

Najbardziej wart zapamiętania jest jeden z pięciu wymienionych na końcu błędów: porównywanie niepodobnych populacji opóźnień. Grupa testowa wpuszcza zadania większe, więc jej surowy rozkład czasu trwania będzie inny, nawet jeśli kod nie zwolnił ani o milisekundę. Autor porównywał więc opóźnienia tylko we wspólnym zakresie rozmiarów, a nowo wpuszczony zakres oceniał osobno. To jest błąd, który widziałem w każdym zespole robiącym testy A/B i prawie nikt go nie łapie.

**Key takeaways:**
- Metryka silnika i metryka produktu mierzą różne systemy, a mylenie ich tworzy złą motywację
- Mianownik powinien zaczynać się przy najwcześniejszym sensownym wyrażeniu intencji użytkownika
- Odrzucone zadanie to nieudane zadanie użytkownika, nawet jeśli nie jest awarią silnika
- W aplikacji klienckiej urządzenie użytkownika jest twoją infrastrukturą, a jej możliwości różnią się szesnastokrotnie
- Kilka wytłumaczalnych poziomów urządzeń bije nieprzejrzysty model predykcyjny
- Porównuj opóźnienia tylko na wspólnym zakresie obciążeń, inaczej wykryjesz regresję, której nie ma

**Why do I care:** To jest tekst, który powinien przeczytać każdy, kto przenosi obliczenia do przeglądarki, a robimy to coraz częściej: przetwarzanie obrazów, rozpoznawanie mowy, rozpoznawanie tekstu, modele językowe działające lokalnie. Główna teza brzmi tak: przeniesienie obliczeń do przeglądarki nie usuwa zarządzania infrastrukturą, tylko przenosi je do logiki produktu. Nagle twoja aplikacja musi odpowiedzieć na pytania, które normalnie należą do systemu kolejkowania zadań. Ale nawet jeśli nie robisz niczego takiego, warto sprawdzić mianowniki własnych metryk, bo błąd z tego tekstu jest tak powszechny, że przestaliśmy go zauważać.

**Link:** [Your Client-Side Success Rate Is Probably Lying to You](https://hackernoon.com/your-client-side-success-rate-is-probably-lying-to-you)

## Benchmarki trzech współczynników wzmocnienia w RocksDB

**TLDR:** Autor postanowił faktycznie zmierzyć trzy współczynniki wzmocnienia w bazie opartej na strukturze scalającej zapisy, zamiast po raz kolejny je zdefiniować. Najciekawsze nie są wyniki, tylko trzy benchmarki, które go oszukały, produkując czyste i całkowicie bezsensowne liczby.

**Summary:** Trzy współczynniki wzmocnienia są zawsze przedstawiane tak samo: trzy schludne definicje, zdanie o tym, że strojenie to kompromis między nimi, i link do oficjalnego przewodnika. A ten przewodnik mówi rzecz zdumiewającą: sami twórcy nie rozumieją w pełni efektu każdej zmiany konfiguracji i zalecają eksperymenty oraz pomiary. Prawie nikt tego nie robi. Autor zrobił i to na zwykłym laptopie z kodem, który można uruchomić samemu.

Pierwszy wynik jest kontrintuicyjny: usunięcie połowy kluczy powiększyło bazę. W tej strukturze usunięcie nie jest usunięciem, tylko zapisem nagrobka oznaczającego klucz jako nieistniejący. Oryginalna wartość leży na dysku, dopóki kompakcja jej nie scali, a sam nagrobek zwykle można porzucić dopiero na najniższym poziomie, bo wcześniejsze porzucenie pozwoliłoby starszej wartości zmartwychwstać. W pomiarach żywe dane spadły ze stu siedmiu do pięćdziesięciu czterech megabajtów, a zajętość dysku wzrosła do stu dwudziestu siedmiu. Praktyczny wniosek: jeśli jesteś blisko progu zapełnienia dysku, masowe usuwanie jest ostatnią rzeczą, która cię uratuje w najbliższych pięciu minutach.

Drugi pomiar dotyczy poziomu zerowego, na którym pliki mają nakładające się zakresy kluczy, więc odczyt musi sprawdzić je wszystkie. Bez filtrów probabilistycznych opóźnienie rośnie liniowo z liczbą plików: od jednej i trzech dziesiątych mikrosekundy przy jednym pliku do dwudziestu trzech przy dwudziestu czterech, czyli osiemnastokrotne pogorszenie. Z filtrami ta sama praca to wzrost z jednej i czterech dziesiątych do dwóch i pół. Filtr pochłania praktycznie całą różnicę. Domyślny próg czterech plików nie jest arbitralny, tylko właśnie tym ograniczeniem.

Trzeci pomiar jest najbardziej pouczający dla wszystkich, którzy kiedykolwiek czytali cudzy benchmark. Te same dwa miliony zapisów kosztowało cztery i cztery dziesiąte raza więcej przy kluczach losowych niż przy rosnących. Przy losowych wzmocnienie zapisu wyniosło cztery i pół, przy rosnących jeden i trzy setne, bo kompakcja zapisała dokładnie zero bajtów. Klucze rosnące produkują pliki, których zakresy nie nakładają się na nic, więc trafiają od razu na głęboki poziom. To realna optymalizacja i jednocześnie pułapka, bo każdy benchmark wstawiający klucze po kolei raportuje wzmocnienie, którego żadne prawdziwe obciążenie nigdy nie zobaczy.

Ale najlepsza jest sekcja o trzech benchmarkach, które autora oszukały. W pierwszym każda generacja pisała rozłączny zakres kluczy, więc dwadzieścia trzy z dwudziestu czterech plików były wykluczane na podstawie samego zakresu i wykres wyszedł idealnie płaski. Autor przypadkiem zbudował najlepszy możliwy przypadek i go zmierzył. W drugim wstawiał klucze po kolei i o mało nie opublikował tezy, że wzmocnienie zapisu jest przesadzone. W trzecim czekał, aż kompakcja się uspokoi, zanim zaczął mierzyć, przez co wszystkie siedem konfiguracji dało identyczne wyniki, bo usunął jedyną różnicę między nimi. Wspólny mianownik jest taki: ta baza jest pełna optymalizacji, które sprawiają, że naiwne benchmarki wyglądają świetnie. Jeśli twój wynik jest podejrzanie czysty, prawdopodobnie zmierzyłeś ścieżkę szybką, a nie swoje obciążenie.

**Key takeaways:**
- Usunięcie danych zwiększa zajętość dysku, bo nagrobki są zapisami czekającymi na kompakcję
- Filtry probabilistyczne zamieniają osiemnastokrotne pogorszenie odczytu w niecałe dwukrotne
- Kolejność kluczy zmienia wzmocnienie zapisu ponad czterokrotnie, co unieważnia większość publikowanych benchmarków
- Przepustowość kompakcji dominuje nad progami kompakcji i to ją trzeba stroić najpierw
- Spadek wzmocnienia zapisu bywa złą wiadomością, bo oznacza pracę odłożoną, a nie zaoszczędzoną
- Mierzenie bazy w spoczynku mówi o kompaktorze, a nie o konfiguracji

**Why do I care:** Piszę głównie frontend, a i tak jest to jeden z najbardziej pouczających tekstów o metodologii pomiarów, jakie ostatnio widziałem. Każdy z trzech opisanych błędów ma swój dokładny odpowiednik u nas. Mierzenie renderowania na sztucznej liście dziesięciu elementów zamiast na produkcyjnych dwóch tysiącach to ten sam przypadek co rozłączne zakresy kluczy. Mierzenie po ustabilizowaniu się aplikacji zamiast pod obciążeniem to dokładnie ten sam błąd co czekanie na koniec kompakcji. A publikowanie wyniku, który wyszedł podejrzanie dobrze, bez zapytania dlaczego, to nasza branżowa specjalność. Uczciwość autora, który opisuje własne pomyłki, jest tu warta więcej niż wszystkie liczby razem wzięte.

**Link:** [Benchmarking RocksDB's Three Amplification Factors](https://hackernoon.com/benchmarking-rocksdbs-three-amplification-factors)

## Mirage2FA przejmuje sesje Microsoft 365 w tysiącach firm

**TLDR:** Zestaw narzędzi sprzedawany jako usługa phishingowa przechwytuje uwierzytelnianie do Microsoft 365 w czasie rzeczywistym, omijając zwykłe uwierzytelnianie dwuskładnikowe. Ofiarami padło ponad cztery tysiące adresów w trzech i pół tysiąca organizacji, z czego prawie dwie trzecie w Stanach Zjednoczonych. Kradzież ciasteczek sesyjnych jest najczęstszym rezultatem.

**Summary:** Mechanizm nosi nazwę przeciwnika w środku i działa boleśnie prosto. Ofiara dostaje załącznik, który wykonuje się w przeglądarce i pobiera właściwą logikę ze zdalnego serwera. Potem widzi fałszywą stronę logowania Microsoftu, wpisuje login, hasło i jednorazowy kod drugiego składnika, a serwer pośredniczący przekazuje te dane do prawdziwej usługi przez połączenie dwukierunkowe. Uwierzytelnienie się udaje, tylko że ważną sesję dostaje atakujący. Drugi składnik został wpisany poprawnie i nic nie dał, bo nie chronił sesji, tylko moment logowania.

Skala robi wrażenie i jednocześnie tłumaczy, dlaczego to działa. Z dziewięciu tysięcy czterystu atakowanych adresów prawdopodobnie skompromitowano cztery i pół tysiąca, czyli blisko połowę. Kradzież ciasteczka sesyjnego to ponad połowa wszystkich zdarzeń, przed przejęciem hasła i kodu oraz przed logowaniem przez pojedyncze logowanie. Jedna trzecia udanych logowań pochodziła z urządzeń mobilnych, gdzie fałszywą stronę trudniej rozpoznać, bo pasek adresu jest skrócony albo w ogóle niewidoczny.

Techniczna strona jest interesująca z perspektywy frontendowej, bo cały atak odbywa się w przeglądarce i nie ma w nim ani jednego pliku wykonywalnego. Załączniki to dokumenty HTML, XHTML i obrazy wektorowe, przy czym te ostatnie wykorzystują fakt, że samodzielny dokument wektorowy może zawierać skrypt. Otwarcie takiego obrazka przenosi przeglądarkę prosto na stronę phishingową. Zaciemnianie kodu przechodziło przez kolejne pokolenia: od zwykłego ładowacza, przez kodowanie i operację różnicy symetrycznej z jednobajtowym kluczem, po standardowe zaciemniacze z tablicami łańcuchów. Ponad dwie trzecie próbek HTML było zaciemnionych.

Zalecenia obronne są przewidywalne, ale jedno warto podkreślić mocniej niż zrobili to autorzy. Jeśli komuś ukradziono sesję, zresetowanie hasła nie pomoże. Trzeba unieważnić wszystkie aktywne sesje i tokeny, sprawdzić reguły przekazywania poczty i przejrzeć nadane uprawnienia aplikacjom. Atakujący nie potrzebuje już hasła, którego zmieniasz. Drugie zalecenie to przejście na uwierzytelnianie odporne na phishing, czyli klucze sprzętowe i klucze dostępu, których po prostu nie da się przekazać przez serwer pośredniczący, bo są związane z domeną.

**Key takeaways:**
- Uwierzytelnianie dwuskładnikowe oparte na kodach jednorazowych nie chroni przed przekazywaniem w czasie rzeczywistym
- Skradzione ciasteczko sesyjne jest groźniejsze niż hasło, bo omija cały proces logowania
- Cały atak odbywa się w przeglądarce, bez żadnego pliku wykonywalnego
- Obrazy wektorowe mogą zawierać skrypty i są używane jako ładowacze
- Po kradzieży sesji trzeba unieważnić tokeny, a nie tylko zmienić hasło
- Klucze dostępu i sprzętowe są odporne na ten atak, bo są związane z domeną

**Why do I care:** Dwie rzeczy z tego raportu dotyczą bezpośrednio ludzi budujących aplikacje webowe. Pierwsza to długość życia sesji i wiązanie tokenu, bo to jedyne mechanizmy, które skracają okno użyteczności skradzionej sesji. Jeśli twoja aplikacja wydaje token ważny trzydzieści dni bez żadnej weryfikacji kontekstu, właśnie sprzedałeś atakującemu miesiąc dostępu za jeden udany phishing. Druga to obsługa załączników i zawartości od użytkowników, bo obraz wektorowy ze skryptem to wektor ataku, o którym mało kto pamięta, wgrywając awatary. Wyświetlanie takiej treści przez znacznik obrazu jest bezpieczne, ale serwowanie jej jako osobnego dokumentu z tej samej domeny już nie.

**Link:** [Mirage2FA Hijacks Companies' Microsoft 365 Sessions](https://hackernoon.com/mirage2fa-hijacks-companies-microsoft-365-sessions-with-over-4k-victims-in-the-us)
