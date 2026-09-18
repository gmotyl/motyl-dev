---
title: "React Compiler w Rust, Go z HTMX zamiast frameworków i nowy TanStack Charts"
excerpt: "Przegląd testuje realne przyspieszenie kompilatora Rust dla React, prostszy stos Go plus HTMX oraz nowy, niezależny od frameworka silnik wykresów TanStack Charts."
publishedAt: "2026-09-18"
slug: "2026-09-18-react-compiler-rust-htmx-tanstack-charts"
hashtags: "#dailydev #react #golang #testing #dataviz #performance #generated #pl"
---

## Rust React Compiler vs Babel: czy przyspieszenie 10x jest prawdziwe

**TLDR:** Ktoś w końcu sprawdził na realnej, 178-komponentowej aplikacji, czy Rust-owy React Compiler faktycznie jest 10 razy szybszy od wersji opartej na Babelu. Sam etap transformacji kodu jest szybszy niemal 19-krotnie, ale na cały czas builda wpływa to zaskakująco mało, bo kompilacja to i tak ułamek całego procesu.

**Summary:** Punktem wyjścia testu było pytanie, czy głośno powtarzane hasło o dziesięciokrotnym przyspieszeniu React Compiler po przepisaniu na Rust ma pokrycie w realnym projekcie, a nie tylko w mikrobenchmarku na jednym pliku. Autor porównał wtyczkę Babel React Compiler z nowym kompilatorem Oxc napisanym w Rust, dostępnym przez plugin-react 6.1 dla Vite, a także z wbudowanym kompilatorem w Bunie 1.4. Wyniki samego etapu transformacji kodu okazały się jeszcze lepsze niż zapowiadano: Oxc przetwarzał pojedyncze pliki około 19 razy szybciej niż wtyczka Babela, schodząc z kilku milisekund do ułamków milisekundy na plik. Problem w tym, że sama transformacja odpowiada za około jeden procent całego czasu budowania aplikacji, a resztę pochłania bundlowanie, więc pełny cold build z Oxc wypadał praktycznie tak samo jak z Babelem, a czasem nawet odrobinę wolniej. Zupełnie inaczej wygląda to w przypadku Buna, którego natywny łańcuch narzędzi budował projekt niemal dziewięć razy szybciej, ale to zasługa całego toolchaina, a nie samego kompilatora React. Autor sprawdził też jakość wygenerowanego kodu i map źródłowych, porównując liczbę slotów pamięci podręcznej memoizacji między Babelem a Oxc. Wyniki były identyczne, co oznacza brak regresji w zachowaniu komponentów, choć bundle z Buna wypadł około 43 procent większy, Bun domyślnie nie generuje tam map źródłowych, brakuje też typów TypeScript dla opcji reactCompiler.

**Key takeaways:**
- Sam etap transformacji kodu w Oxc jest około 19 razy szybszy niż w Babelu, więc obiegowe hasło "10x" jest zaniżone, a nie zawyżone.
- Na pełny czas builda wpływ tej zmiany jest znikomy, bo kompilacja stanowi tylko około 1 procent całego procesu, resztę zajmuje bundlowanie.
- Wynik kompilacji, w tym liczba slotów memoizacji, jest identyczny jak w Babelu, więc migracja nie zmienia zachowania komponentów w runtime.
- Bun buduje projekt niemal 9 razy szybciej niż Vite z Babelem, ale to efekt całego natywnego toolchaina, nie samego kompilatora.
- Build w Bunie jest o 43 procent większy, nie generuje domyślnie map źródłowych i brakuje mu typów TypeScript dla opcji kompilatora.

**Why do I care:** Dla mnie to potwierdzenie czegoś, co powtarzam zespołom od dawna. Liczby z mikrobenchmarków rzadko przekładają się wprost na odczuwalną poprawę w codziennej pracy, bo bundler i tak zjada większość czasu builda. Mimo to przełączenie na Oxc w Vite to zmiana jednej linijki konfiguracji bez ryzyka regresji, więc nie widzę powodu, żeby tego nie zrobić, zwłaszcza w projektach zbliżających się do tysiąca komponentów. Migracja na sam Bun tylko dla tego jednego usprawnienia byłaby jednak przedwczesna, dopóki brakuje tam map źródłowych i porządnych typów.

**Link:** [Rust React Compiler vs Babel: Is 10x speed real?](https://daily.dev/posts/aqHTUQ4n0)

## Aplikacja webowa w Go i HTMX zamiast Reacta czy Svelte

**TLDR:** Inżynier backendowy opisuje swój stos do budowania aplikacji webowych bez ciężkiego frameworka frontendowego: Go i HTMX do renderowania po stronie serwera, Templ do w pełni typowanych szablonów HTML oraz SQLC do bezpiecznych zapytań SQL pisanych ręcznie. Argumentuje, że taki zestaw jest prostszy w utrzymaniu i łatwiejszy do generowania oraz recenzowania przez modele językowe niż typowy stos React czy Svelte.

**Summary:** Artykuł opisuje warsztat backendowca, który zamiast osobnej aplikacji frontendowej stawia na renderowanie widoków po stronie serwera w Go, a interaktywność dokleja przez HTMX. Omawia atrybuty takie jak hx-post, hx-target czy hx-trigger, które pozwalają wysyłać żądania i podmieniać fragmenty strony bez pisania własnego kodu JavaScript, a także mechanizm out-of-band swap, dzięki któremu jedna odpowiedź serwera potrafi zaktualizować kilka niepowiązanych elementów strony naraz, na przykład formularz i powiadomienie typu toast jednocześnie. Do generowania znaczników HTML używa Templ, czyli silnika szablonów z pełnym wsparciem typów i integracją z LSP, dzięki czemu edytor podpowiada błędy w szablonach tak samo jak w zwykłym kodzie Go. Warstwę bazy danych obsługuje SQLC, które z ręcznie napisanych zapytań SQL i schematu migracji generuje w pełni typowane struktury i funkcje w Go, co pozwala deweloperowi widzieć dokładnie, jakie zapytanie trafi do bazy, zamiast zgadywać, co wygeneruje warstwa ORM. Osobny wątek dotyczy typowej pułapki. Standardowe przekierowanie HTTP nie działa poprawnie, gdy żądanie pochodzi z atrybutu HTMX, bo biblioteka spodziewa się fragmentu HTML do podmiany, a nie przeskoku całej strony, co objawia się wyrenderowaniem strony logowania wewnątrz małego formularza. Rozwiązaniem jest sprawdzenie nagłówka HX-Request po stronie serwera i odesłanie w takiej sytuacji nagłówka HX-Redirect zamiast zwykłego przekierowania. Autor uzupełnia stos o Air do automatycznego przeładowywania podczas developmentu, Task do uruchamiania poleceń, Nix do powtarzalnych środowisk deweloperskich oraz bindingi Go dla Playwrighta do testów end-to-end, zaznaczając przy tym, że HTMX nie sprawdzi się dobrze tam, gdzie potrzeba dużo interaktywności po stronie klienta albo gdzie frontend i backend rozwijają osobne zespoły.

**Key takeaways:**
- HTMX pozwala aktualizować wiele fragmentów strony jedną odpowiedzią serwera dzięki mechanizmowi out-of-band swap.
- Templ daje w pełni typowane szablony HTML z podpowiedziami LSP, więc błędy w widokach wychwytuje edytor, a nie dopiero przeglądarka.
- SQLC generuje typowany kod Go z ręcznie pisanych zapytań SQL, zachowując pełną kontrolę nad tym, co faktycznie wykonuje się na bazie.
- Zwykłe przekierowanie HTTP nie działa z żądaniami HTMX, trzeba obsłużyć nagłówek HX-Request i odpowiedzieć nagłówkiem HX-Redirect.
- Autor uważa, że taki stos jest łatwiejszy do wygenerowania i zrecenzowania przez modele językowe niż typowa aplikacja w React czy Svelte.

**Why do I care:** Jako ktoś, kto na co dzień żyje w ekosystemie React, patrzę na taki stos z mieszanymi uczuciami. Dla prostych paneli administracyjnych albo wewnętrznych narzędzi renderowanie po stronie serwera plus HTMX potrafi być szybsze do wdrożenia i tańsze w utrzymaniu niż osobna aplikacja SPA z całą maszynerią stanu. Ale ograniczenia, o których sam autor wspomina, czyli brak dobrej obsługi bogatej interaktywności i podział na osobne zespoły frontend-backend, to dokładnie te sytuacje, w których większość moich projektów żyje na co dzień, więc traktuję to bardziej jako inspirację do prostszych rozwiązań w bocznych projektach niż realną alternatywę dla głównego stosu.

**Link:** [Building a Web App with Go and HTMX – Haseeb Majid](https://daily.dev/posts/6lokG7TRN)

## Galeria gotowych, interaktywnych bloków UI

**TLDR:** Serwis bencho.dev udostępnia zestaw gotowych, interaktywnych bloków interfejsu, takich jak suwaki, przełączniki, menu czy karuzele, które można od razu przetestować na żywo, a nie tylko oglądać jako statyczne zrzuty ekranu.

**Summary:** Ten wpis jest krótszy niż pozostałe, bo sam w sobie jest raczej linkiem do narzędzia niż rozbudowanym artykułem technicznym. Chodzi o kolekcję komponentów interfejsu, w której każdy element, od suwaka po karuzelę, można od razu przeklikać w przeglądarce, zanim zdecyduje się go wykorzystać w projekcie. Taka forma prezentacji ma sens, bo statyczny zrzut ekranu niewiele mówi o tym, jak komponent zachowuje się przy interakcji, animacji czy zmianie stanu, a to właśnie te detale decydują, czy dany wzorzec pasuje do konkretnego interfejsu. Dla zespołów budujących systemy projektowe albo szukających inspiracji do konkretnego widoku, taka galeria skraca drogę do wyniku. Zamiast implementować kilka wariantów od zera i porównywać je między sobą, można od razu ocenić gotowe rozwiązanie w działaniu.

**Key takeaways:**
- Zbiór obejmuje typowe, powtarzalne elementy interfejsu: suwaki, przełączniki, menu i karuzele.
- Każdy blok można przetestować na żywo w przeglądarce, a nie tylko obejrzeć jako obrazek.
- Materiał ma charakter praktycznego katalogu inspiracji, a nie pogłębionego artykułu technicznego.

**Why do I care:** Tego typu galerie traktuję jako narzędzie do szybkiego prototypowania, a nie gotowe rozwiązanie do wklejenia w produkcyjny kod bez zastanowienia, bo dostępność, responsywność i spójność z resztą systemu projektowego trzeba i tak zweryfikować osobno. Mimo to warto mieć taki zasób pod ręką, kiedy trzeba szybko pokazać klientowi kilka wariantów interakcji zamiast tłumaczyć je słowami na spotkaniu.

**Link:** [UI interactive blocks](https://daily.dev/posts/MZbJJ0R78)

## Lepsza alternatywa dla slog.DiscardHandler w testach Go

**TLDR:** Metoda testing.T.Output(), wprowadzona w Go 1.25, daje lepszy sposób na wyciszanie logów w testach niż slog.DiscardHandler. Zamiast bezpowrotnie odrzucać logi, kieruje je do strumienia wyjściowego testu, więc nic się nie wyświetla przy przechodzącym teście, ale logi pojawiają się automatycznie, gdy test zawiedzie.

**Summary:** Problem, który rozwiązuje ta technika, jest znany każdemu, kto pisał testy dla kodu logującego przez slog. Albo logi zaśmiecają wyjście testów, albo trzeba je całkowicie wyciszyć i stracić przy okazji informacje przydatne przy diagnozowaniu awarii. Przed wprowadzeniem slog.DiscardHandler w Go 1.24 programiści ręcznie tworzyli handler zapisujący do io.Discard, co działało, ale bezpowrotnie usuwało dane, które mogłyby się przydać, gdyby test akurat nie przeszedł. Nowa metoda testing.T.Output(), dostępna też na testing.B i testing.F, zwraca io.Writer powiązany bezpośrednio ze strumieniem wyjściowym danego testu. Kiedy test przechodzi, nic nie trafia na ekran. Kiedy test zawodzi, zapisane logi pojawiają się automatycznie w raporcie błędu, bez dodatkowej konfiguracji. Ta metoda nie jest ograniczona do slog, bo jako zwykły io.Writer działa równie dobrze ze standardowym pakietem log, dowolną biblioteką logującą firm trzecich albo jakimkolwiek innym miejscem zapisu diagnostycznego niezwiązanym z logowaniem.

**Key takeaways:**
- testing.T.Output() z Go 1.25 kieruje logi do strumienia testu, pokazując je tylko wtedy, gdy test zawiedzie.
- Rozwiązanie jest dostępne również na testing.B i testing.F, nie tylko na testing.T.
- Przed Go 1.24 wyciszanie slog wymagało ręcznego tworzenia handlera zapisującego do io.Discard.
- Mechanizm działa z dowolnym io.Writer, więc obsługuje standardowy log, biblioteki firm trzecich i inne cele zapisu.

**Why do I care:** To akurat rzadki przykład drobnej zmiany w standardowej bibliotece, która realnie skraca czas debugowania, bo nie trzeba już wybierać między czystym wyjściem testów a utratą kontekstu przy awarii. W projektach frontendowych korzystających z Go po stronie backendu albo w narzędziach CLI pisanych w tym języku wdrożyłbym to praktycznie od razu, bo koszt zmiany jest zerowy, a zysk pojawia się dokładnie w momencie, gdy jest najbardziej potrzebny, czyli przy czerwonym teście na CI.

**Link:** [The better test alternative to slog.DiscardHandler](https://daily.dev/posts/n8XgWlUNi)

## TanStack Charts: gramatyka wykresów niezależna od frameworka

**TLDR:** Zespół TanStack pod wodzą Tannera Linsleya wypuścił w wersji Alpha nową bibliotekę do wykresów, opartą nie na gotowych typach wykresów, lecz na podejściu grammar of graphics, w którym deweloper sam składa znaczniki, skale, kanały i warstwy. Biblioteka ma adaptery dla większości popularnych frameworków i według autora niemal cały jej kod powstał pod nadzorem agentów AI.

**Summary:** TanStack Charts wyróżnia się na tle typowych bibliotek wykresów tym, że zamiast wybierać z listy gotowych typów wykresów, programista komponuje wizualizację z niższopoziomowych elementów: znaczników reprezentujących dane, skal mapujących wartości na przestrzeń wizualną, kanałów łączących dane z właściwościami wizualnymi oraz transformacji i warstw pozwalających łączyć różne widoki w jednym wykresie. TypeScript wnioskuje typy bezpośrednio z kształtu danych źródłowych, więc zmiana struktury danych od razu odbija się na podpowiedziach w edytorze, zamiast ujawniać się dopiero w runtime. Biblioteka oferuje adaptery dla React, Preact, Vue, Solid, Svelte, Angular, Lit oraz czystego DOM, a do tego eksperymentalny adapter dla React Native, co czyni ją jedną z niewielu bibliotek wykresów naprawdę niezależnych od frameworka. Linsley wprost przyznaje, że niemal cała implementacja powstała za pomocą agentów kodujących AI działających pod jego nadzorem. Pod względem rozmiaru paczki TanStack Charts wypada korzystnie na tle konkurencji: podstawowy wykres liniowy w React waży około 29 KB po zminifikowaniu i skompresowaniu gzipem, a pełny zestaw kontrolowanych komponentów mieści się w przedziale 38 do 45 KiB, podczas gdy Chart.js zajmuje od 45 do 58 KiB, Observable Plot od 83 do 92 KiB, a Apache ECharts nawet 153 do 173 KiB. Projekt jest jednak nadal w fazie Alpha, dokumentacja wprost odradza traktowanie obecnego API jako stabilnej obietnicy, a autorzy sugerują przypinanie dokładnej wersji, ponieważ interfejs może się jeszcze zmieniać między kolejnymi wydaniami.

**Key takeaways:**
- Podejście grammar of graphics pozwala budować wykresy ze znaczników, skal, kanałów, transformacji i warstw zamiast wybierać gotowy typ wykresu.
- TypeScript wnioskuje typy bezpośrednio z danych źródłowych, więc zmiana struktury danych ujawnia się od razu w edytorze.
- Adaptery obejmują React, Preact, Vue, Solid, Svelte, Angular, Lit, czysty DOM oraz eksperymentalnie React Native.
- Według twórcy niemal cała implementacja powstała pod nadzorem agentów kodujących AI.
- Rozmiar paczki jest mniejszy niż w Chart.js, Observable Plot czy Apache ECharts, ale biblioteka nie nadaje się jeszcze do bardzo dużych zbiorów danych w czasie rzeczywistym i pozostaje w fazie Alpha.

**Why do I care:** Grammar of graphics w świecie TypeScript to coś, na co czekałem dłużej niż chciałbym przyznać, bo dotychczasowe biblioteki wykresów zwykle zmuszają do wyboru między prostotą gotowych typów a elastycznością niskopoziomowych narzędzi jak D3. Jeśli TanStack Charts dowiezie stabilność API na poziomie reszty ekosystemu TanStack, może stać się domyślnym wyborem dla zespołów pracujących w wielu frameworkach naraz, ale na razie, w fazie Alpha i bez gwarancji API, nie wprowadzałbym tego do żadnego kodu produkcyjnego poza eksperymentami wewnętrznymi.

**Link:** [TanStack Charts Introduced with a Framework Agnostic Grammar of Graphics for TypeScript](https://daily.dev/posts/kw79tA3sr)
