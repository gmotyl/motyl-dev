---
title: "PostgreSQL 19 z obsługą grafów, TypeScript parser w WASM i composables w Vue"
excerpt: "Przegląd najciekawszych artykułów z daily.dev: PostgreSQL 19 wprowadza natywne zapytania grafowe, Encore kompiluje swój parser TypeScript do WASM, Symfony UX 3.0 stawia na komponenty, a Vue composables dostają solidne omówienie dobrych praktyk."
publishedAt: "2026-07-16"
slug: "postgresql-19-grafy-typescript-wasm-vue-composables"
hashtags: "#dailydev #postgresql #typescript #wasm #vue #nuxt #symfony #php #webdev #backend #generated #pl"
source_pattern: "daily.dev"
---

## PostgreSQL 19 wprowadza natywne zapytania grafowe

**TLDR:** PostgreSQL 19 Beta 1 jest już dostępna i wprowadza SQL/PGQ, czyli natywną obsługę zapytań grafowych opartą na standardzie SQL:2023. To jedna z najbardziej przełomowych zmian w historii projektu, bo odpada potrzeba sięgania po osobną bazę grafową.

**Summary:** PostgreSQL od lat jest bazą danych, która spokojnie zjada wszystko, co inne silniki traktują jako swój główny argument sprzedażowy. Pełnotekstowe wyszukiwanie, JSON, time-series z rozszerzeniami, teraz grafy. SQL/PGQ pozwala zdefiniować grafy nad istniejącymi tabelami relacyjnymi za pomocą `CREATE PROPERTY GRAPH`, a następnie odpytywać je składnią pattern matching przez `GRAPH_TABLE`. Nie ma nowego silnika przechowywania danych, nie ma migracji, nie ma rozszerzeń do doinstalowania. Zapytania grafowe są przepisywane do standardowych operacji relacyjnych i korzystają z istniejących indeksów.

Obok SQL/PGQ w PostgreSQL 19 pojawia się też kilka innych zmian, które od dawna były na liście życzeń developerów. `INSERT ... ON CONFLICT DO SELECT` to atomowy get-or-create, który rozwiązuje problem istniejący od wersji 9.5. Dotychczasowy workaround z `DO UPDATE SET col = EXCLUDED.col` generował dead tuples przy każdym konflikcie. Nowa składnia jest podobno cztery razy szybsza od starego podejścia. To jedna z tych zmian, gdzie pierwsza myśl jest "dlaczego tego nie było od zawsze".

PostgreSQL 19 wprowadza też wsparcie dla `UPDATE ... FOR PORTION OF` i `DELETE ... FOR PORTION OF`, co domyka implementację SQL:2011 temporal data. Gdy modyfikujesz wiersz dla określonego zakresu dat, baza automatycznie dzieli go tak, żeby zachować niezmienione okresy. Dla systemów rezerwacji, rejestrów pracowniczych czy tabel z historią cen to zmiana, która eliminuje całe kategorie ręcznego kodu. Do tego pojawia się `pg_plan_advice`, czyli pierwszy oficjalny mechanizm hints dla planera zapytań w samym projekcie PostgreSQL. REPACK CONCURRENTLY zastępuje VACUUM FULL i CLUSTER, trzymając tabelę dostępną przez większość operacji. A równoległa autovakuumacja obsługuje wiele indeksów jednocześnie, co przy dużych tabelach potrafi skrócić czas vakuumowania dramatycznie.

**Key takeaways:**
- SQL/PGQ pozwala tworzyć grafy nad istniejącymi tabelami relacyjnymi bez nowych silników ani rozszerzeń
- `ON CONFLICT DO SELECT` daje atomowy get-or-create, czterokrotnie szybszy od dotychczasowego workaroundu
- `FOR PORTION OF` domyka temporal data z SQL:2011, przydatne przy systemach z historią danych
- `pg_plan_advice` to pierwszy oficjalny mechanizm hints dla planera w PostgreSQL
- REPACK CONCURRENTLY wykonuje reorganizację tabeli online, bez długich blokad ACCESS EXCLUSIVE

**Why do I care:** SQL/PGQ to coś, co będzie miało realne znaczenie dla projektów, gdzie dotychczas rozważałem Neo4j albo Amazon Neptune dla relacji społecznościowych, zależności pakietów czy hierarchii organizacyjnych. Fakt, że to działa nad istniejącymi tabelami bez migracji danych, zmienia kalkulację "czy budować osobny serwis grafowy" z "prawdopodobnie tak" na "zdecydowanie nie, przynajmniej na początku". `ON CONFLICT DO SELECT` z kolei to ta zmiana, po której poprawiam kilka serwisów produkcyjnych następnego dnia po upgradzie.

**Link:** [Postgres is dropping a crazy new feature](https://www.youtube.com/watch?v=zPsr0n9DQ7o)

---

## Encore kompiluje swój parser TypeScript do WASM

**TLDR:** Encore przeniósł swój parser TypeScript napisany w Rust do WASM, żeby mógł działać w przeglądarce. Dzięki temu powstał playground `tsparser.encore.dev`, gdzie można odtworzyć błąd parsowania z dowolnego snippetu kodu i udostępnić link.

**Summary:** Encore to framework backendowy dla TypeScript z własnym parserem infrastruktury, który czyta kod TypeScript i na jego podstawie generuje konfigurację. Parser jest napisany w Rust, działa lokalnie na maszynie dewelopera i w CI. Problem pojawia się wtedy, gdy użytkownik trafia na błąd parsowania i chce go zgłosić. Odtworzenie błędu wymagało dostępu do lokalnego środowiska, co nie sprzyja szybkiemu diagnozowaniu.

Rozwiązanie jest eleganckie. Rust kompiluje się do WASM, więc zamiast pisać drugi parser w JavaScript na potrzeby przeglądarki, Encore po prostu skompilował istniejący crate do innego targetu. Dzięki temu playground uruchamia dokładnie ten sam build, który działa w CLI i w CI. Wklejasz TypeScript, dodajesz pliki jeśli potrzebujesz, uruchamiasz parser i widzisz to samo, co zobaczyłbyś u siebie na maszynie.

Sam parser, `tsparser`, buduje się na bazie SWC dla parsowania AST TypeScript, ale dodaje własne przejścia analizujące deklaracje frameworka Encore. Musi rozwiązywać importy, śledzić re-eksporty i rozumieć system typów TypeScript w stopniu pozwalającym wyciągać kształty typów request i response, w tym generyki, unie i mapped types. To nietrywialny kawałek kodu, a fakt, że jedna implementacja działa zarówno w CLI jak i w przeglądarce, eliminuje całą klasę rozbieżności między środowiskami.

**Key takeaways:**
- Jeden parser Rust działający zarówno w CLI jak i w przeglądarce przez WASM, bez drugiej implementacji
- Playground dostępny pod `tsparser.encore.dev` pozwala odtworzyć błąd parsowania z linku
- Podejście "kompiluj Rust do WASM zamiast pisać drugi raz w JS" jest wzorcem wartym zapamiętania

**Why do I care:** To dobry przykład tego, że WASM w środowisku produkcyjnym ma sens nie tylko dla obliczeń intensywnych CPU. Tutaj główna korzyść to paritet: przeglądarka i CLI uruchamiają identyczny kod. Dla każdego kto utrzymuje narzędzie z parserem albo walidatorem po stronie serwera i chce zapewnić użytkownikom interaktywny debugging w przeglądarce, ten case study warto przeczytać w całości.

**Link:** [We compiled our TypeScript parser to WASM](https://encore.dev/blog/typescript-parser-wasm)

---

## Symfony UX 3.0: komponentowy frontend dla PHP developerów

**TLDR:** Symfony UX 3.0 to nowa wersja major, która podnosi wymagania do PHP 8.4 i Symfony 7.4, usuwa cztery paczki będące cienkimi wrapperami na biblioteki JavaScript i stawia na komponenty Twig jako główny model budowania UI.

**Summary:** Symfony UX od jakiegoś czasu próbuje przekonać PHP developerów, że nie muszą pisać dużo JavaScript, żeby budować reaktywne interfejsy. Live Components to mechanizm, który pozwala zrobić z komponentu Twig element z własnym stanem, aktualizujący się przez serwer na każdą interakcję użytkownika, bez linijki JS po stronie dewelopera. Wersja 3.0 to przede wszystkim porządkowanie.

Usunięto cztery paczki: Swup, LazyImage, Typed i TogglePassword. Każda z nich była cienkim wrapperem na bibliotekę JavaScript z minimalną integracją PHP. Jak tłumaczą maintainerzy, funkcjonalność tych paczek można odtworzyć kilkoma linijkami kodu aplikacyjnego. Swup idzie przez npm lub importmap, LazyImage zastępuje natywny `loading="lazy"` dostępny we wszystkich współczesnych przeglądarkach. To zdrowe, bo projekt przestaje odpowiadać za utrzymanie wrapperów, które nie wnoszą realnej wartości PHP-owej.

Zmiany deprecation removal są solidne. W LiveComponent usunięto `csrf` argument na `#[AsLiveComponent]`, bo same-origin i CORS protection to teraz domyślne zachowanie. W TwigComponent funkcja `cva` została zastąpiona przez `html_cva` z `twig/html-extra`. Google Maps Bridge przeszedł na `@googlemaps/js-api-loader` w wersji 2.0. Testy przeniosły się z Symfony PHPUnit Bridge na PHPUnit 11 bezpośrednio. Wersja 3.0 podnosi też poprzeczkę do PHP 8.4, co jest logiczne, bo named arguments i readonly properties zmieniają ergonomię pisania komponentów.

**Key takeaways:**
- Usunięte paczki (Swup, LazyImage, Typed, TogglePassword) można zastąpić kilkoma linijkami bez straty funkcjonalności
- LiveComponent daje reaktywne UI bez JS po stronie dewelopera, z pełnym stanem zarządzanym przez PHP i Twig
- PHP 8.4 i Symfony 7.4 jako nowe minimum to krok w stronę nowocześniejszego API komponentów

**Why do I care:** Symfony UX 3.0 to interesujący kontrast z kierunkiem, który obrało wiele zespołów frontendowych. Zamiast RSC, Server Actions i hydracji po stronie React, tutaj mamy Twig z natywnym live-reload przez serwer. Dla projektów, gdzie PHP jest bazą i nie chcemy przepisywać frontendu na TypeScript, to realny kierunek. Osobiście patrzę na to jako analogię do Hotwire w Rails czy LiveView w Elixirze, i uważam, że te podejścia mają swoją niszę, szczególnie w team-ach z mocnym backendowym zapleczem.

**Link:** [Symfony UX 3.0: A Component-First Frontend for PHP Developers](https://symfony.com/blog/symfony-ux-3-0-0-released)

---

## Kiedy logika należy do composable w Vue i Nuxt

**TLDR:** Artykuł z certificates.dev pokazuje konkretne wzorce dla composables w Nuxt z uwzględnieniem SSR, wyjaśnia kiedy używać `useState` zamiast `ref` i jak unikać duplikowania stanu między serwerem a klientem.

**Summary:** Composables w Vue to temat, który z pozoru wydaje się prosty, ale im głębiej wchodzisz w SSR i Nuxt, tym więcej pułapek się pojawia. Artykuł zaczyna od typowego problemu: masz dwa komponenty, które potrzebują tej samej logiki. Wyciągasz ją do composable, działa, ale każdy komponent dostaje własną kopię stanu.

Kluczowe rozróżnienie, które pomaga w praktyce: `ref()` tworzy nową reaktywną referencję przy każdym wywołaniu composable. Na serwerze stan z `ref()` nie jest serializowany do page payload. Klient startuje z pustym stanem i refetchuje. `useState()` z Nuxt przyjmuje unikalny klucz, serializuje stan podczas SSR i prawidłowo hydratuje po stronie klienta. Każdy komponent wywołujący ten sam composable dzieli tę samą instancję stanu.

Podobna zasada dotyczy fetchowania danych. `useAsyncData()` pobiera dane na serwerze, serializuje wynik do page payload i hydratuje po stronie klienta bez ponownego fetcha. Rezygnacja z `useAsyncData` na rzecz manualnego `fetch()` w composable oznacza podwójny request, bo każde wywołanie poza serwerem odpala własnego fetcha. Do tego artykuł omawia przyjmowanie parametrów przez `MaybeRef` z `toValue`, czyli composables, które działają zarówno ze statycznymi wartościami jak i reaktywnymi refs.

Jeden wzorzec wart osobnego podkreślenia: unikanie side-effectów na poziomie top-level composable. Każdy `fetch()` wywołany bezpośrednio w ciele funkcji composable odpali się przy każdej inicjalizacji, również podczas SSR. Odpowiedź na to jest `useAsyncData` albo opakowanie efektów w jawne funkcje.

**Key takeaways:**
- `useState()` zamiast `ref()` gdy stan ma przeżyć hydration SSR albo być współdzielony między komponentami
- `useAsyncData()` dla async data fetching zapobiega double-fetchowi między serwerem a klientem
- Composables mogą wywoływać inne composables, przez co buduje się warstwową logikę bez wiedzy komponentu

**Why do I care:** To solidny, praktyczny artykuł, który wypełnia lukę między "composables są fajne" a "composables zachowują się inaczej w Nuxt SSR niż w SPA". Widziałem wiele projektów Nuxt z hydration mismatch wynikającym dokładnie z opisanego tu `ref()` vs `useState()`. Jeśli zaczynasz projekt Nuxt albo masz bug z deserializacją stanu między serwerem a klientem, ten artykuł jest dobrym punktem wyjścia.

**Link:** [When Logic Belongs in a Composable](https://certificates.dev/blog/composable-best-practices-in-nuxt)
