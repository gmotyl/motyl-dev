---
title: "Next.js 16.3, generative UI i porządki w łańcuchu dostaw: przegląd This Week In React #293"
excerpt: "Next.js 16.3 z Instant Navigations, nowe API browser() w React, useOptimistic bez tajemnic, TanStack Table V9, MobX 7 po generalnym remoncie i pełny rozbiór pipeline'u rozpoznawania twarzy w React Native."
publishedAt: "2026-08-06"
slug: "this-week-in-react-293-nextjs-16-3-generative-ui-supply-chain"
hashtags: "#thisweekinreact #react #reactnative #nextjs #generativeui #mobx #security #generated #pl"
source_pattern: "This Week In React"
---

## Next.js 16.3 i droga do Instant Navigations
**TLDR:** Next.js 16.3 to jedna z tych aktualizacji, które warto zrobić bez zastanowienia, bo obniża zużycie pamięci w dev serwerze nawet o 90%, przyspiesza buildy i SSR, a przy tym otwiera drzwi do Instant Navigations, czyli zestawu funkcji mających w końcu rozwiązać problem wolnych nawigacji w App Routerze.

**Summary:** Zacznę od tego, co dostaje każdy, kto po prostu zbije `next` do nowej wersji, bez zmiany linii kodu. Turbopack w dev mode zjada teraz dużo mniej RAM-u dzięki cache'owaniu na dysku i mechanizmowi memory eviction, a na przykładach z Vercela spadek pamięci sięga nawet 90%. Do tego dochodzi cache buildów na dysku, obsługa TypeScript 7 do type checkingu, oraz przejście z web streams na natywne strumienie Node.js w renderowaniu App Routera, co w testach daje do 22% więcej obsłużonych żądań pod obciążeniem. To są konkretne, mierzalne liczby, nie marketingowe hasła, i akurat to lubię w release notach frameworków.

Druga część ogłoszenia jest bardziej ambitna. Next.js od dłuższego czasu boryka się z tym, że Server Components dają lepszy transfer danych, ale nawigacja między stronami czuje się gorzej niż w klasycznym SPA. Instant Navigations, oparte na dyrektywie `use cache` wprowadzonej wcześniej, mają to naprawić poprzez automatyczne wyciąganie i prerenderowanie loading shell'i, zamiast wymuszać na deweloperach ręczne pisanie plików `loading.tsx` dla każdej trasy. Nowy devtool Instant Insights wychwytuje nawigacje, które nie są instant, i podaje gotowy prompt dla agenta AI, jak to naprawić, co jest sympatycznym przyznaniem się, że dokumentacja teraz częściej trafia do modeli niż do ludzi.

Partial Prefetching daje kontrolę nad tym, ile treści prefetchować per link, Navigation Inspector pozwala zamrożyć nawigację w trakcie i zobaczyć, co faktycznie widzi użytkownik, a nowy helper `instant()` do Playwrighta pisze testy regresyjne pilnujące, żeby refaktoryzacja nie zepsuła czegoś, co wcześniej było natychmiastowe. Osobiście najbardziej podoba mi się rozwiązanie na ISR: strony niewygenerowane w build time mogą teraz od razu pokazać loading shell pierwszemu odwiedzającemu, a potem w tle dogenerować się do pełnej wersji statycznej. To eliminuje odwieczny wybór między blokowaniem pierwszego użytkownika albo brakiem prerenderu w ogóle.

Na dokładkę mamy eksperymentalny, napisany w Rust React Compiler działający wewnątrz Turbopacka bez Babel-a, oraz `useOffline` do obsługi zerwanego połączenia w trakcie mutacji. To już druga duża odsłona od czasu Next.js 16.0, i widać, że zespół traktuje to jako fundament pod przyszłą wersję major, w której te zachowania staną się domyślne.

**Key takeaways:**
- Aktualizacja do 16.3 nie wymaga zmian w kodzie i daje realny zysk w pamięci, czasie buildu i throughput SSR.
- `catchError` daje w końcu error boundary, które nie koliduje z `notFound`/`redirect` i umożliwia retry Server Components.
- Root params likwidują prop-drillowanie parametrów globalnych typu język w i18n.
- Instant Navigations to opt-in dziś, ale docelowo domyślne zachowanie w kolejnej wersji major.

**Why do I care:** Jako architekt frontendu doceniam to, że Vercel nie sprzedaje tego jako rewolucji, tylko jako serię konkretnych, zmierzonych usprawnień, z których część działa bez żadnej ingerencji w kod. Ale prawdziwa wartość jest w tym, że Instant Navigations to w praktyce przyznanie się do błędu z wcześniejszym modelem cachowania, który był zbyt niejawny. Jeżeli planujecie duży projekt na Next.js, warto już teraz rozważyć migrację do Cache Components, bo za rok to będzie punkt wyjścia, nie eksperyment.

**Link:** [Next.js 16.3](https://nextjs.org/blog/next-16-3)

## ReactDOM dostaje `browser()` — formalny sposób na odkładanie kodu tylko-dla-przeglądarki
**TLDR:** Zespół React pracuje nad `browser()`, API które pozwala oznaczyć wartość jako dostępną wyłącznie w przeglądarce i sprawić, że użycie jej wewnątrz `use()` zostanie automatycznie i po cichu odłożone do renderowania klienckiego, zamiast wywalić się błędem na serwerze.

**Summary:** Mechanizm jest sprytniejszy niż wygląda na pierwszy rzut oka. `browser()` jest eksportowany tylko z wejść react-dom dostępnych po stronie klienta i celowo wycięty z warunku react-server, więc próba zaimportowania go w Server Component jest błędem już na etapie kompilacji, nie w runtime. Wewnętrznie zwracana wartość to specjalnie oznaczony, odzyskiwalny błąd React, a to, co się z nim dzieje, zależy od renderera: Fiber po prostu kontynuuje bez wartości, a Fizz odkłada rozstrzygnięcie do renderera, który przyjmie sprawę dalej, czyli w praktyce do klienta.

Ciekawszy jest przypadek, gdy `use(browser())` trafi w renderer strumieniujący HTML na serwerze. Fizz w takim momencie łapie błąd bezpośrednio w miejscu wywołania `use()`, chowa go, i przerywa renderowanie za pomocą prywatnego sygnału. Granica Suspense konsumuje ten sygnał po cichu, a jeśli sygnał dotrze aż do korzenia drzewa, React podstawia zachowany błąd tak, żeby stos wskazywał właśnie na `use()`, a przyczyna błędu na `browser()`. To jest dość elegancki sposób na to, żeby developer widział sensowny stack trace, a nie wewnętrzny szum silnika.

Warto zwrócić uwagę, że to wciąż pull request, nie scalona funkcjonalność, ale kierunek jest jasny: React chce mieć wbudowany, oficjalny sposób mówienia "ten kawałek kodu wymaga przeglądarki, więc po prostu poczekaj z nim do klienta", bez pisania własnych hacków na bazie throw promise czy warunków typeof window. Pokrycie testami w PR-ze obejmuje Fiber, Fizz, hydration, błąd na korzeniu, bezpośrednie wyrzucenie wartości i tryb produkcyjny, co sugeruje, że autorzy traktują to serio jako część rdzenia, nie eksperyment na boku.

**Key takeaways:**
- `browser()` jest niedostępny w kondycji react-server, więc pomyłkowy import w Server Component wywala się w compile time.
- Fizz łapie użycie `use(browser())` i odkłada je do klienta w sposób niewidoczny dla użytkownika końcowego.
- Bezpośrednie wyrzucenie wartości `browser()` bez `use()` wciąż zachowuje się jak normalny, zgłaszany błąd.
- To jeszcze PR, nie stabilna funkcja, ale kierunek dla izomorficznego kodu w React jest wyraźny.

**Why do I care:** Każdy, kto pisał kod korzystający z API tylko-dla-przeglądarki w komponentach renderowanych też na serwerze, znał ten rytuał: sprawdzanie `typeof window`, własne granice Suspense, czasem hacki z rzucaniem obietnicy. Jeśli `browser()` wejdzie do stabilnego React, to zdejmuje z nas konieczność wymyślania tego samego koła na nowo w każdym projekcie, i robi to w sposób, który dobrze współpracuje z istniejącym modelem błędów i Suspense, a nie obok niego.

**Link:** [Add ReactDOM browser() API — PR #37143](https://github.com/react/react/pull/37143)

## useActionState bez mitów: jak faktycznie działa kolejkowanie i gdzie ludzie się mylą
**TLDR:** Solidny, praktyczny przewodnik po `useActionState`, który skupia się nie na samej składni, a na tym, co się psuje w produkcji: kolejkowanie akcji, stare zamknięcia, brak wbudowanego resetu i sytuacje, w których ten hook w ogóle nie powinien być użyty.

**Summary:** Punkt wyjścia jest prosty: każdy formularz przed React 19 wymagał tego samego zestawu trzech kawałków stanu, wyniku, flagi ładowania i błędu, i każdy z nas pisał to ręcznie, zapominając czasem o `finally`. `useActionState` zbiera to w jeden hook powiązany z atrybutem `action` formularza, i co ważne, działa też bez żadnego frameworka, nie tylko z Server Actions w Next.js.

Najciekawszy fragment artykułu dotyczy tego, jak React radzi sobie z wielokrotnym, szybkim klikaniem. Wywołania funkcji dispatch nie są równoległe, są kolejkowane sekwencyjnie, każde czeka na rozstrzygnięcie poprzedniego. To oznacza, że pięciokrotne kliknięcie "dodaj do koszyka" nie jest race condition w bazie danych, tylko pięcioma osobno przetworzonymi akcjami w kolejności, w jakiej przyszły. Problem nie jest więc techniczny, tylko produktowy: użytkownik dostaje pięć dodanych produktów, mimo że chciał dodać jeden. Dlatego blokowanie kontrolki na czas `isPending` nie jest zabezpieczeniem przed race condition, a zabezpieczeniem przed przypadkowym zakolejkowaniem akcji, których użytkownik nie chciał wywołać.

Druga rzecz, którą wielu programistów przegapia, to brak wbudowanego mechanizmu resetu stanu. Jeśli chcesz wyczyścić błąd walidacji po tym, jak użytkownik poprawił pole, ale jeszcze nie wysłał formularza ponownie, `useActionState` tego za ciebie nie zrobi, bo stan aktualizuje się tylko przy kolejnym wywołaniu akcji. Dostępne są dwa rozsądne wyjścia: zaprojektować funkcję akcji tak, żeby obsługiwała sygnał resetu jako jeden z możliwych argumentów, albo wymusić remount komponentu przez zmianę propa `key`. Artykuł też jasno rozgranicza, kiedy ten hook po prostu nie jest właściwym narzędziem, na przykład przy w pełni kontrolowanych formularzach wieloetapowych albo tam, gdzie interfejs musi zmienić się zanim serwer odpowie, bo do tego służy `useOptimistic`.

**Key takeaways:**
- Wywołania dispatch w `useActionState` są kolejkowane, nie równoległe; błąd w jednej akcji odrzuca wszystkie kolejne w kolejce.
- Sygnatura funkcji akcji to zawsze `(previousState, formData)`, nie zdarzenie submitu, co jest częstym błędem przy migracji ze starego `onSubmit`.
- Hook nie ma wbudowanego resetu stanu; trzeba obsłużyć to sygnałem w akcji albo zmianą klucza komponentu.
- Nie nadaje się do fetchowania danych przy montowaniu, pollingu, wieloetapowych wizardów ani sytuacji wymagających natychmiastowej reakcji UI.

**Why do I care:** Ten artykuł jest dobrym przypomnieniem, że hook, który wygląda jak prosty skrót, ma swoją własną semantykę kolejkowania, którą trzeba zrozumieć, a nie tylko skopiować z dokumentacji. Najbardziej przydatna jest tabela porównawcza z `useOptimistic`, bo w praktyce to jest pytanie, które słyszę najczęściej od zespołów przechodzących na React 19: czy mój formularz ma czekać na serwer, czy ma reagować od razu.

**Link:** [React 19 useActionState Explained](https://shubhra.dev/tutorials/react-19-useactionstate)

## Optymistyczne UI w Next.js 16: wszystkie błędy rollbacku, które faktycznie się zdarzają
**TLDR:** Bardzo konkretny rozbiór `useOptimistic` w Next.js 16, gdzie autor pokazuje, że najpopularniejszy w internecie wzorzec ręcznego "odkręcania" stanu po błędzie jest w większości przypadków niepotrzebny, bo React już to robi za nas.

**Summary:** Historia zaczyna się od realnego, dobrze znanego objawu: checkbox na wolnym połączeniu, który nie reaguje na kliknięcie, więc użytkownik klika drugi raz, i oba kliknięcia w końcu lądują razem, migając włącz-wyłącz-włącz. To nie jest bug w kodzie, tylko efekt tego, że zapis do bazy trwa, a interfejs nie mówi użytkownikowi, że coś się dzieje. Pierwsza, oczywista poprawka w postaci spinnera jest szczera, ale wciąż czuje się wolno, bo po prostu jest wolno.

Autor przechodzi przez wdrażanie `useOptimistic` krok po kroku, zaczynając od ostrzeżenia w konsoli, gdy wywołasz funkcję ustawiającą stan optymistyczny poza transition, a kończąc na tym, co ja uważam za najważniejszą część artykułu: mit ręcznego rollbacku. Prawie każdy tutorial w internecie łapie błąd i "odkręca" stan optymistyczny drugim wywołaniem tej samej funkcji. To działa, ale rozwiązuje problem, który React już rozwiązał, bo stan optymistyczny jest tylko tymczasową nakładką na prawdziwy stan przekazany jako props, aktywną wyłącznie na czas trwania transition. Gdy transition się zakończy, niezależnie od sukcesu czy porażki, React zdejmuje tę nakładkę i renderuje na nowo z prawdziwych danych. Jeśli te dane się nie zmieniły, bo akcja serwera zawiodła, checkbox po prostu sam wraca do poprzedniego stanu.

Wyjątkiem, gdzie ręczna interwencja jest naprawdę potrzebna, jest sytuacja, w której reducer optymistyczny zależy od czegoś, czego bazowy stan w ogóle nie miał, na przykład optymistyczne wstawienie nowego komentarza z tymczasowym identyfikatorem klienckim przed przypisaniem prawdziwego ID przez serwer. Tam trzeba trzymać tymczasowy element w lokalnym stanie i jawnie go usunąć w bloku catch. Druga część artykułu to bardzo przydatna tabela wyboru między `revalidatePath`, `revalidateTag` i `updateTag`, w zależności od tego, kto ma zobaczyć zmianę i jak szybko, oraz omówienie, dlaczego od Next.js 16.2 warto sięgać po `unstable_retry` w error boundary zamiast starego `reset`, bo tylko `unstable_retry` faktycznie odświeża dane, a nie tylko czyści stan błędu.

**Key takeaways:**
- Automatyczny rollback `useOptimistic` działa sam, jeśli bazowy stan nie zmienił się po nieudanej akcji; ręczne odkręcanie jest zwykle zbędne.
- Blokuj kontrolkę per element, nie globalnie, żeby uniknąć nakładających się requestów przy szybkim klikaniu.
- `updateTag` daje natychmiastowe read-your-own-writes dla strony, na której użytkownik właśnie jest, `revalidateTag` odświeża wszystkie pozostałe miejsca w tle.
- `unstable_retry` w error boundary re-fetchuje dane, `reset` tylko czyści stan błędu bez nowego zapytania.

**Why do I care:** To jest jeden z tych artykułów, które oszczędzą komuś tygodnia debugowania. Ręczny rollback wygląda na "bezpieczniejszy" kod, ale w praktyce potrafi walczyć z mechanizmem, który React już zaimplementował, i wprowadzać subtelne błędy tam, gdzie ich wcześniej nie było. Tabela `revalidatePath` vs `revalidateTag` vs `updateTag` to coś, co warto po prostu wydrukować i przykleić nad biurkiem każdego, kto pisze Server Actions.

**Link:** [I Added Optimistic Updates to a Next.js 16 App](https://shubhra.dev/tutorials/nextjs-16-useoptimistic-rollback-pattern)

## TanStack Table V9: cztery lata pracy, dziesięć adapterów frameworków
**TLDR:** Po ponad dwóch latach prac TanStack Table V9 jest stabilne, z nową architekturą oparta na TanStack Store, drastycznym spadkiem zużycia pamięci na dużych zbiorach danych i systemem pluginów, który da się realnie tree-shakować.

**Summary:** To nie jest kosmetyczny bump wersji. Cały wewnętrzny model reaktywności został przebudowany tak, żeby każdy adapter frameworka mógł podłączyć się bezpośrednio do swojego natywnego systemu reaktywnego, zamiast obchodzić założenia odziedziczone po Reakcie. Efekt to dziesięć dedykowanych adapterów, od React i Vue po Svelte, Angular, Lit i nawet Ember, każdy z fine-grained subskrypcją przez atomy i selektory.

Liczby na wydajność są konkretne i, co ważne, pokazane z metodologią, nie tylko jako marketingowy slogan. Dzięki wspólnym prototypom metod dla wierszy, kolumn i komórek, zamiast tworzenia ich na nowo dla każdej instancji, retained heap w scenariuszu miliona wierszy i ośmiu kolumn spadł z około 2,71 GB do 380 MB, czyli o 86%. Do tego dochodzi przetworzenie na nowo całego pipeline'u operacji po stronie klienta: sortowanie, filtrowanie, grupowanie, agregacja, wszystko przyspieszyło, z modelem wierszy szybszym średnio o 79%.

Architektura oparta o tzw. tableFeatures() sprawia, że tabela rejestrująca tylko sortowanie nie musi ciągnąć ze sobą kodu filtrowania, paginacji czy grupowania. To odwraca zwykły trend, w którym nowa duża wersja biblioteki jest cięższa niż poprzednia, przy czym całkowity rozmiar pakietu wzrósł, ale to, co realnie ląduje w bundlu aplikacji, powinno być mniejsze. Autorzy nie kryją też, że to release fundamentalny bardziej niż featureowy, otwierający drogę do rzeczy typu pełny pivoting czy zaawansowane wyrażenia filtrów w przyszłych wersjach.

**Key takeaways:**
- Nowy model stanu oparty na TanStack Store i architekturze alien-signals daje fine-grained reaktywność bliższą prawdziwym signalom niż wcześniej.
- Retained heap na milionie wierszy spadł o 86% względem Table V8.
- Tree-shakable feature system oznacza, że aplikacja płaci tylko za funkcje tabeli, których faktycznie używa.
- Dostępne są dedykowane przewodniki migracji dla większości adapterów, w tym React, Vue, Solid, Svelte i Angular.

**Why do I care:** Jeśli macie w produkcie duże tabele z tysiącami wierszy renderowane po stronie klienta, ta aktualizacja jest realnie warta uwagi, nie tylko z ciekawości. Spadek zużycia pamięci o kilkadziesiąt procent to różnica między aplikacją, która się dławi na starszym laptopie, a taką, która po prostu działa. Migracja nie jest darmowa, bo architektura się zmieniła, ale przewodniki wyglądają na solidnie przygotowane.

**Link:** [Announcing TanStack Table V9](https://tanstack.com/blog/announcing-tanstack-table-v9)

## „React nie potrzebuje state managera”, powiedział, a potem zbudował jeden
**TLDR:** Autor, który wcześniej twierdził, że React nie potrzebuje kolejnego narzędzia do zarządzania stanem, opublikował react-arven, małą bibliotekę łączącą Context API z selektorami, żeby dostać wydajność Reduxa bez rezygnowania z jednego, wspólnego miejsca dla połączonego stanu.

**Summary:** Punkt wyjścia jest szczery i przyznaje się do sprzeczności od pierwszej linijki. Dla 80% przypadków lokalny stan plus wyspecjalizowane narzędzia, react-query do fetchowania, formik czy react-hook-form do formularzy, działają świetnie. Problem zaczyna się w tych pozostałych 20%, gdzie masz skomplikowany edytor albo formularz, w którym wszystko jest połączone ze wszystkim, i potrzebujesz jednego miejsca kontroli. Zamiast kolejnego źródła stanu w stylu zustand, autor chciał sposobu na połączenie źródeł, które już ma, dane z fetcha, stan z formika, własny lokalny stan, bez kopiowania wszystkiego do jednego magazynu i utraty jednego źródła prawdy.

Context API jest konceptualnie właściwym rozwiązaniem tego problemu, bo daje jedno miejsce na wspólny stan, ale ma jedną fundamentalną wadę: każda zmiana w kontekście przerenderowuje wszystkich subskrybentów, więc jedno naciśnięcie klawisza może przerenderować pół aplikacji. React-arven atakuje to trzema mechanizmami naraz. Pierwszy to selektory zbudowane na `useSyncExternalStore`, dzięki którym komponent czyta tylko wybrany fragment stanu i renderuje się tylko wtedy, gdy ten fragment się zmieni. Drugi to trik z przekazywaniem `children` jako propa, przez który provider stanu przestaje być rodzicem drzewa komponentów w sensie renderowania, więc jego własna aktualizacja nie ciągnie za sobą całego poddrzewa. Trzeci to stabilizacja akcji przez wewnętrzny mechanizm referencji, koncepcyjnie bliski propozycji `useEffectEvent`, dzięki czemu funkcje mutujące stan mają stałą identyczność mimo że czytają aktualne dane.

Najciekawszy dla mnie detal to decyzja o nazywaniu funkcji przekazywanej do `createProvider` jako prawdziwego hooka, zaczynającego się od `use`, a nie anonimowej funkcji strzałkowej. React Compiler rozpoznaje jednostki do optymalizacji po nazwie zaczynającej się od `use`, więc pisząc to jako `useFormStore`, cała logika w środku zostaje zmemoizowana automatycznie, bez ręcznego `useMemo`. To samo dotyczy `eslint-plugin-react-hooks`, który zacznie sprawdzać regułę hooków w tym kodzie tylko, jeśli wygląda jak hook z nazwy. Biblioteka waży 1,4 kB po minifikacji i gzipie, nie ma zależności, i wymaga React 18 lub nowszego z racji na `useSyncExternalStore`.

**Key takeaways:**
- React-arven łączy istniejące źródła stanu w jedno miejsce zamiast dodawać kolejny magazyn stanu do aplikacji.
- Selektory na bazie `useSyncExternalStore` rozwiązują problem re-renderowania wszystkich subskrybentów kontekstu.
- Wzorzec `children` jako props zapobiega przerenderowaniu całego poddrzewa przy zmianie stanu w providerze.
- Nazwanie funkcji store'a jako prawdziwego hooka (`use...`) odblokowuje automatyczną memoizację przez React Compiler.

**Why do I care:** Podchodzę do kolejnych bibliotek zarządzania stanem ze sporym dystansem, bo faktycznie mamy ich już za dużo, ale ten artykuł jest wyjątkowo transparentny co do tego, jaki konkretny problem rozwiązuje i jakich problemów nie rozwiązuje. Trik z nazywaniem funkcji jako hooka po to, by React Compiler ją zoptymalizował, to dobry przykład na to, że reguły kompilatora zaczynają wpływać na to, jak piszemy kod bibliotek, nie tylko komponentów.

**Link:** [React doesn't need a state management tool, I said. Then I built one.](https://granat.blog/posts/2026-07-24-react-arven/)

## Generative UI: trzy drogi, żadna nie jest domyślna
**TLDR:** Przegląd trzech podejść do generowania interfejsu przez AI, statycznego opartego o wynik narzędzia mapowany na istniejące komponenty, deklaratywnego opartego o specyfikacje typu A2UI i AG-UI, oraz open-ended opartego o surowy kod HTML/CSS/JS w sandboxowanym iframe, wraz z pokazaniem, jak te podejścia można ze sobą mieszać.

**Summary:** Prelegent zaczyna od czegoś, co brzmi banalnie, ale rzadko jest dobrze przemyślane: „interfejs generowany przez AI” może oznaczać zupełnie różne rzeczy, od projektowania w Figmie wspomaganego AI, przez wygenerowanie kodu HTML przez czat i hostowanie go, aż po dynamiczne UI serwowane w czasie rzeczywistym na podstawie intencji użytkownika. W tym artykule chodzi wyłącznie o tę ostatnią kategorię, gdzie backend agentowy komunikuje się z klientem i decyduje, jaki fragment interfejsu pokazać.

Podejście statyczne jest najłatwiejsze do przyjęcia dla istniejącego produktu. W demie z listingiem miejsc, model dostaje jedno narzędzie do wywołania, które filtruje i rankuje wyniki po stronie aplikacji, nie modelu, a frontend wybiera gotowy, wcześniej zaprojektowany komponent na podstawie liczby dopasowań. Kod UI nigdy nie jest generowany, model tylko wybiera argumenty wyszukiwania, co daje przewidywalność i bezpieczeństwo kosztem elastyczności. Podejście deklaratywne idzie dalej: w demie planera podróży model faktycznie komponuje cały layout, wybierając z zamkniętego katalogu komponentów zdefiniowanego schematami Zod, a komunikacja między agentem i klientem odbywa się przez dwie odrębne specyfikacje, jedną opisującą samo UI (A2UI), drugą przesyłanie zdarzeń między backendem agentowym i klientem (AG-UI). To jest różnica kluczowa dla zrozumienia całego tematu: warstwa transportu zdarzeń i warstwa opisu interfejsu to dwie różne sprawy, i można je łączyć niezależnie.

Trzecie podejście, open-ended, czyli model generujący surowy kod wykonywany w przeglądarce, jest z natury najbardziej ryzykowne, bo arbitralny HTML/CSS/JS wykonywany w kliencie to poważne ryzyko bezpieczeństwa, dlatego jedyną sensowną implementacją produkcyjną jest dziś sandboxowany iframe w standardzie MCP Apps. Ciekawa jest ostatnia część, gdzie autor pokazuje, że te trzy podejścia nie są rozłączne. Serwer MCP może zwrócić payload A2UI zamiast tekstu, host może opakować MCP App jako jeden komponent wewnątrz deklaratywnej powierzchni A2UI, a MCP App może z kolei renderować A2UI wewnątrz własnego iframe'a. W praktyce większość produkcyjnych aplikacji GenUI będzie miksować wszystkie trzy podejścia naraz, w zależności od tego, który fragment interfejsu akurat renderują.

**Key takeaways:**
- Statyczne/kontrolowane GenUI mapuje wynik narzędzia na istniejące, wcześniej zaprojektowane komponenty; model wybiera tylko argumenty.
- Deklaratywne GenUI (A2UI + AG-UI) pozwala modelowi komponować cały layout z zamkniętego katalogu komponentów opisanego schematami.
- Open-ended GenUI, czyli surowy kod wykonywany w przeglądarce, wymaga sandboxowanego iframe (MCP Apps) z powodu ryzyka bezpieczeństwa.
- Te trzy podejścia da się mieszać w jednej aplikacji, np. MCP App renderujący A2UI wewnątrz własnego iframe'a.

**Why do I care:** To jest jeden z bardziej konkretnych tekstów o generative UI, jakie widziałem, bo nie sprzedaje jednego rozwiązania, tylko rozkłada temat na dwie osie, transport i stopień swobody modelu, i pokazuje realny kod dla każdej kategorii. Jako architekt najbardziej cenię rozdzielenie A2UI od AG-UI, bo to jest dokładnie ten rodzaj separacji warstw, która pozwala wymieniać jedną specyfikację bez przepisywania drugiej, gdy ekosystem będzie dalej dojrzewał.

**Link:** [Generative UI](https://boda.sh/blog/generative-ui/)

## Visual regression testing: test, który wychwytuje to, czego nie widzą inne testy
**TLDR:** Przystępny wstęp do wizualnych testów regresyjnych, wyjaśniający, dlaczego 100% pokrycia testami funkcjonalnymi nic nie mówi o tym, jak aplikacja faktycznie wygląda, oraz porównanie Percy, Chromatic i wbudowanych screenshotów w Vitest Browser Mode.

**Summary:** Teza artykułu jest prosta, ale rzadko wypowiadana wprost: testy jednostkowe, integracyjne i e2e sprawdzają zachowanie, argumenty, zwracane wartości, efekty uboczne, ale żaden z nich nie sprawdza tego, co użytkownik faktycznie widzi na ekranie. Testowanie klas CSS jest technicznie możliwe, ale to testowanie szczegółów implementacji, i nawet gdy klasy są poprawne, wygląd może być zepsuty przez konflikt specyficzności, niezaładowany arkusz stylów albo zewnętrzny CSS. Wizualne testy regresyjne rozwiązują to, robiąc zrzut ekranu strony lub komponentu w headless przeglądarce i porównując go z zapisaną wcześniej wersją bazową.

Autor przytacza konkretny przypadek z własnej praktyki, zmianę jednej ikony SVG, która wydawała się bezpieczna, a wizualny test regresyjny wykrył, że ikona renderowała się poprawnie w jednym miejscu, a w dwudziestu innych miała nagle złudny kolor. To jest dokładnie ten typ błędu, którego żaden test funkcjonalny nie złapie, i który przy ręcznym testowaniu wymagałby pamiętania o każdym miejscu użycia komponentu. Trzy główne narzędzia w tym obszarze mają różne mocne strony: Percy jest najbardziej rozpowszechniony w większych firmach i dobrze integruje się z Playwrightem czy Cypressem, Chromatic robi to samo dla komponentów ze Storybooka, a Vitest Browser Mode ma wbudowane porównywanie zrzutów ekranu, choć bez interfejsu do wygodnej ręcznej akceptacji zmian.

Druga część tekstu to lista realnych problemów, które sprawiają, że te testy stają się niestabilne: animacje, których fazę trudno przewidzieć przy każdym zrzucie, oraz dynamiczne dane typu "opublikowano 5 dni temu", które zmieniają się między uruchomieniami. Rozwiązanie w obu przypadkach jest podobne, maskowanie tych fragmentów przed narzędziem robiącym zrzut, co większość bibliotek wspiera natywnie.

**Key takeaways:**
- Wizualne testy regresyjne sprawdzają wygląd, nie zachowanie; są uzupełnieniem, nie zamiennikiem testów jednostkowych i e2e.
- Testowanie klas CSS jako proxy dla wyglądu jest niewiarygodne, bo nie wykrywa problemów ze specyficznością czy ładowaniem stylów.
- Percy dobrze integruje się z e2e (Playwright, Cypress), Chromatic z Storybookiem, Vitest Browser Mode działa najlepiej dla pojedynczych komponentów.
- Animacje i dynamiczne dane trzeba maskować przed zrzutem, inaczej testy stają się flaky i tracą sens.

**Why do I care:** Prawie każdy projekt z UI, na którym pracowałem, po pewnym czasie łapie regresję wizualną, którą nikt nie zauważa aż do zgłoszenia od klienta. Wartość tego artykułu jest w tym, że jasno pokazuje, gdzie to się w praktyce sprawdza, przy refaktoryzacji komponentów współdzielonych i przy dużych zmianach CSS, a gdzie generuje więcej szumu niż korzyści, przy stronach z dużą dynamiczną zawartością bez odpowiedniego maskowania.

**Link:** [Visual Regression Testing: The Most Important Test You're Not Running](https://howtotestfrontend.com/resources/visual-regression-testing-introduction-guide)

## CSS chce nauczyć się rozumieć, dokąd nawigujesz
**TLDR:** Inżynierowie Chrome proponują nowy standard CSS do deklaratywnego stylowania przejść między stronami na podstawie trasy początkowej i docelowej, bez pisania JavaScriptu do przechwytywania nawigacji.

**Summary:** Problem, od którego zaczyna się ten wpis, jest znany każdemu, kto próbował zrobić coś ambitniejszego z View Transitions w multi-page apps. Chcesz, żeby strona zjeżdżała w lewo przy przejściu z indexu na "o nas", w prawo przy powrocie, a przy kliknięciu miniatury na liście, żeby konkretny obrazek płynnie zamienił się w hero image na stronie szczegółów. Dzisiaj to wymaga JavaScriptu przechwytującego nawigację, odczytywania `NavigateEvent.sourceElement` i ręcznego ustawiania typów View Transition na podstawie tego, skąd i dokąd użytkownik idzie. Skrypt do zrobienia tego dobrze rośnie z czasem i szybko robi się nieprzyjemny w utrzymaniu.

Propozycja, nad którą pracują wspólnie autorzy z Chrome, wprowadza kilka nowych elementów CSS. `@route` pozwala nazwać trasy przy użyciu składni znanej z path-to-regexp, tej samej, na której oparte jest JavaScriptowe `URLPattern`. `@navigation` to reguła pozwalająca zapytać o stan aktualnej nawigacji, sprawdzając punkt startowy i docelowy względem nazwanych trasy, i to właśnie tutaj można zadeklarować różne typy przejścia w zależności od kierunku, w jednym miejscu, bez żadnego skryptu. Selektor `:nav-source` pozwala wybrać konkretny element, który zainicjował nawigację wychodzącą, modelowany na `NavigateEvent.sourceElement`, co rozwiązuje dokładnie ten przypadek z miniaturą przechodzącą w hero image.

Do tego dochodzi `:link-to()`, selektor stylujący linki na podstawie tego, dokąd prowadzą, przydatny do orkiestracji złożonych przejść UI między trasami. Autorzy sami przyznają, że parametryzowane dopasowanie w `:link-to()`, na przykład wybranie linku prowadzącego konkretnie do trasy szczegółów z określonym ID, nie jest jeszcze objęte specyfikacją, bo wciąż pracują nad tym, żeby składnia była wygodna. Cała propozycja jest prezentowana na spotkaniu CSS Working Group w Berlinie, a wcześniejsza prezentacja na CSS Day dała zespołowi sygnał, że warto to dalej rozwijać. Da się to już przetestować w Chrome Canary za flagą eksperymentalną.

**Key takeaways:**
- `@route` definiuje nazwane trasy przy użyciu składni znanej z URLPattern i path-to-regexp.
- `@navigation (from: ...) and (to: ...)` pozwala warunkowo stylować przejście na podstawie kierunku nawigacji, bez JavaScriptu.
- `:nav-source` wybiera element, który zainicjował nawigację, przydatny do animacji typu miniatura-w-hero-image.
- `:link-to()` stylizuje linki na podstawie docelowej trasy, choć parametryzowane dopasowanie nie jest jeszcze gotowe.

**Why do I care:** View Transitions bez tej propozycji zawsze wymagały JavaScriptu jako kleju między nawigacją i stylami, co jest trochę sprzeczne z ideą deklaratywnego CSS. Jeśli ta specyfikacja przejdzie przez CSS Working Group w obecnej formie, to naprawdę uprości animowane przejścia w multi-page apps, które teraz są domeną frameworków SPA głównie dlatego, że tam łatwiej kontrolować logikę przejść w JavaScripcie.

**Link:** [Styling the Navigation: Declarative Route and Navigation Matching in CSS](https://www.bram.us/2026/07/30/styling-the-navigation-declarative-route-and-navigation-matching-in-css/)

## Jak GitHub i npm rozbijają łańcuch ataków supply chain, krok po kroku
**TLDR:** GitHub podsumowuje kilka miesięcy zmian w npm i GitHub Actions, które celują w konkretne, powtarzalne techniki ataków supply chain: od kompromitacji konta maintainera, przez wyciek credentiali w CI, aż po błyskawiczne rozprzestrzenianie się złośliwego pakietu.

**Summary:** Ciekawe w tym artykule jest to, że nie próbuje przedstawić jednego magicznego rozwiązania, tylko rozkłada atak na etapy i pokazuje, co konkretnie zostało zablokowane na każdym z nich. Na etapie początkowej kompromitacji, konta npm o dużym wpływie trafiają teraz na 72 godziny w trybie tylko-do-odczytu po zmianie emaila albo użyciu kodu odzyskiwania 2FA, co daje maintainerowi czas na reakcję, zanim ktoś zdąży wykorzystać przejęte konto. Domyślne zachowanie `actions/checkout` zostało zmienione tak, by nie ściągać nieznanego kodu z forków w typowo podatnych triggerach, co wycina jeden z najczęstszych wzorców prowadzących do wykonania kodu w CI/CD przez tak zwane "pwn requests".

Na etapie eksfiltracji credentiali kluczowa zmiana to rozszerzenie trusted publishing na CircleCI, bo usunięcie długożyjących credentiali z pipeline'u CI/CD jest jedną rzeczą, która realnie przerywa ten łańcuch, niezależnie od tego, co jeszcze zawiedzie. Do tego dochodzi ograniczenie zapisu do cache Actions dla mniej zaufanych triggerów, żeby atakujący nie mógł zatruć cache współdzielonego z bardziej uprzywilejowanymi workflowami wydania. Najbardziej odczuwalna dla większości zespołów będzie prawdopodobnie zmiana w npm v12, gdzie skrypty instalacyjne pakietów są domyślnie wyłączone, bo to właśnie one były najczęstszym wektorem szybkiej eksfiltracji danych, zanim jakikolwiek kod pakietu miał szansę się wykonać w runtime.

Ostatni etap, propagacja ataku, jest atakowany przez staged publishing, gdzie samo posiadanie credentiali nie wystarcza do opublikowania nowej wersji pakietu bez dodatkowej autoryzacji 2FA, oraz przez domyślne trzydniowe okno karencji w Dependabot version updates, dające czas na wykrycie złośliwego release'u zanim trafi do zależności downstream. Poprawki bezpieczeństwa wciąż otwierają się natychmiast, żeby to opóźnienie nie kolidowało z prawdziwie krytycznymi łatkami.

**Key takeaways:**
- Konta npm o wysokim wpływie przechodzą na 72h w tryb read-only po zmianie emaila lub użyciu kodu odzyskiwania 2FA.
- `actions/checkout` domyślnie nie ściąga już nieznanego kodu z forków w typowo podatnych triggerach ("pwn requests").
- npm v12 wyłącza domyślnie skrypty instalacyjne pakietów; trzeba je jawnie zatwierdzić.
- Dependabot version updates ma domyślne trzydniowe okno karencji przed otwarciem PR, poprawki bezpieczeństwa nadal są natychmiastowe.

**Why do I care:** To jest dobry przykład tego, jak wygląda dojrzałe podejście do bezpieczeństwa łańcucha dostaw, nie jedna wielka zmiana, ale seria małych, ukierunkowanych blokad w miejscach, gdzie realne ataki się powtarzają. Wyłączenie skryptów instalacyjnych domyślnie w npm v12 zdenerwuje część zespołów zależnych od legalnych przypadków użycia, ale patrząc na skalę ataków opartych właśnie na tym wektorze w ostatnim roku, to była kwestia czasu.

**Link:** [Disrupting supply chain attacks on npm and GitHub Actions](https://github.blog/security/supply-chain-security/disrupting-supply-chain-attacks-on-npm-and-github-actions/)

## Stacked pull requests trafiają do publicznego preview na GitHubie
**TLDR:** GitHub udostępnia natywne wsparcie dla stacked pull requestów, czyli uporządkowanej serii mniejszych PR-ów budujących na sobie, z recenzją każdej warstwy niezależnie i scaleniem wszystkiego jednym kliknięciem.

**Summary:** Idea stacked PR-ów nie jest nowa, zespoły od dawna dzieliły duże zmiany na łańcuch gałęzi, żeby uniknąć jednego, gigantycznego pull requesta, którego nikt nie chce recenzować. Problem był w tym, że robienie tego ręcznie oznaczało ciągłe rebazowanie kolejnych gałęzi po każdej zmianie w warstwie poniżej, co szybko stawało się bardziej pracochłonne niż sam kod. GitHub teraz wbudowuje to jako natywną funkcję, z rozszerzeniem CLI `gh-stack`, które pozwala stworzyć cały stos z terminala w mniej niż minutę, oraz z integracją w interfejsie webowym, aplikacji mobilnej i skillem dla agentów typu Copilot.

Największa różnica względem robienia tego ręcznie jest w recenzji i scalaniu. Każdy pull request w stosie pokazuje diff tylko dla swojej warstwy, z mapą stosu na górze widoku, więc różni recenzenci mogą przeglądać różne warstwy równolegle, bez blokowania się wzajemnie. Scalanie najnowszego gotowego PR-a w stosie automatycznie scala też wszystkie niescalone warstwy poniżej niego w jednej operacji, a warstwy powyżej, które zostały otwarte, automatycznie rebazują się i przestawiają target na nową bazę. Wszystkie istniejące branch protections i wymagane checki wciąż obowiązują, więc to nie jest sposób na obejście reguł ochrony gałęzi głównej, tylko wygodniejszy sposób ich respektowania przy dużych zmianach.

Funkcja jest w publicznym preview i trafia do wszystkich repozytoriów w najbliższych dniach, a wsparcie dla merge queue dochodzi progresywnie w kolejnych tygodniach.

**Key takeaways:**
- Stacked pull requests to natywna funkcja GitHub, nie zewnętrzne narzędzie, więc działa z istniejącymi checkami i branch protections od razu.
- Rozszerzenie CLI `gh-stack` pozwala tworzyć i zarządzać stosem z terminala.
- Scalanie najnowszej warstwy w stosie automatycznie scala wszystkie warstwy poniżej w jednej operacji.
- Warstwy powyżej scalonej automatycznie rebazują się i przestawiają target na nową bazę.

**Why do I care:** Ręczne stackowanie gałęzi jest jedną z tych praktyk, które teoretycznie każdy zna, a w praktyce prawie nikt regularnie nie stosuje, bo koszt utrzymania łańcucha rebazów przewyższa korzyść z mniejszych recenzji. Jeśli GitHub faktycznie zdejmuje ten koszt, to może to być pierwszy moment, w którym stacked PR-y staną się domyślnym sposobem pracy zamiast ciekawostki dla zespołów z dedykowanym tooling engineerem.

**Link:** [Stacked pull requests are now in public preview](https://github.blog/changelog/2026-07-30-stacked-pull-requests-are-now-in-public-preview/)

## React Aria v1.20.0: PreviewTrigger, alpha TokenField i menu kontekstowe
**TLDR:** Nowy release React Aria dodaje PreviewTrigger do dostępnych podglądów na hover, alfa wersję TokenField do budowania pól z tokenami typu prompt AI czy tagi, natywne menu kontekstowe i całkowicie przepisaną dokumentację hooków.

**Summary:** PreviewTrigger wypełnia niszę pomiędzy tooltipem i pełnym popoverem, pokazując popover na hover, focus albo long press, ale w przeciwieństwie do Tooltip może zawierać interaktywną treść, co przydaje się do podglądów linków, gdzie chcesz, żeby użytkownik mógł kliknąć coś w podglądzie, nie tylko przeczytać tekst. Obsługuje tabowanie klawiaturą wewnątrz i na zewnątrz popovera, opóźnienie otwarcia i uwzględnianie bezpiecznego obszaru ekranu, więc działa poprawnie też na urządzeniach dotykowych.

TokenField, wciąż w alfie, to komponent do wpisywania tekstu z osadzonymi tokenami, z obsługą autouzupełniania i automatycznej tokenizacji. Wymienione zastosowania, pola promptów AI, pola tagów, ustrukturyzowane pola wyszukiwania, pola z mentionami, to dobry sygnał, że zespół React Aria projektuje komponenty pod kątem interfejsów, które faktycznie budujemy teraz, nie tylko klasycznych formularzy. Do tego MenuTrigger dostał wsparcie dla `trigger="contextMenu"`, czyli dostępne menu kontekstowe działające przez mysz, klawiaturę i dotyk jednocześnie, bez pisania własnej logiki od zera.

Mniejsze, ale praktyczne zmiany obejmują prostsze API do skrótów klawiaturowych w `useKeyboard`, wsparcie dla interaktywnych komponentów, jak pola tekstowe, wewnątrz wierszy Table przy użyciu `keyboardNavigationBehavior="tab"`, oraz kompletnie przepisaną dokumentację hooków w tym samym stylu, co dokumentacja komponentów, pokazującą jak używać obu warstw razem.

**Key takeaways:**
- PreviewTrigger daje interaktywny podgląd na hover/focus/long-press, w odróżnieniu od statycznego Tooltip.
- TokenField (alpha) obsługuje pola z tokenami, przydatne do promptów AI, tagów i pól z mentionami.
- MenuTrigger wspiera teraz `trigger="contextMenu"` dla dostępnych menu kontekstowych.
- Table wspiera interaktywne komponenty wewnątrz wierszy przy nawigacji klawiaturowej typu tab.

**Why do I care:** React Aria od lat jest moim domyślnym wyborem, kiedy trzeba zbudować dostępny komponent bez rezygnowania z pełnej kontroli nad stylami. TokenField w alfie jest szczególnie na czasie, bo pola z tokenami dla promptów AI i tagów są dziś budowane ręcznie w większości aplikacji, często z gorszą dostępnością niż to, co zespół Adobe dostarcza od razu.

**Link:** [React Aria v1.20.0](https://react-aria.adobe.com/releases/v1-20-0)

## MobX 7.0.0: wielkie porządki, mniejszy bundle, żadnych nowych funkcji
**TLDR:** MobX 7 to release typowo sprzątający, usuwa stare tryby zgodności, wymusza Proxy jako jedyny mechanizm obserwowalności i zmniejsza rozmiar paczki, kosztem usunięcia wielu API, na których część projektów wciąż siedzi.

**Summary:** Najbardziej fundamentalna zmiana jest krótka, ale ma szerokie konsekwencje: MobX zawsze używa teraz obiektów i tablic obserwowalnych opartych na Proxy, a stary fallback bez Proxy, opcja `configure({ useProxies: ... })` i flaga `{ proxy: false }` w `observable` po prostu nie istnieją. Usunięto też wsparcie dla starych, legacy dekoratorów, co oznacza, że projekty siedzące na starszym stylu dekoratorów muszą przepisać się na nowoczesny model przed aktualizacją. Do tego przestrzenie nazw takie jak `observable.ref` czy `action.bound` zamieniono na płaskie, nazwane eksporty typu `observableRef` czy `actionBound`, głównie po to, żeby bundlery mogły lepiej tree-shakować to, czego nie używasz.

Publiczne API `trace`, wraz z całym wspierającym je runtime, zostało całkowicie usunięte, z rekomendacją przejścia na `toJS`, `getDependencyTree`, `getObserverTree`, `spy` albo dedykowany pakiet mobx-log do debugowania. Warto podkreślić, że to nie jest deprecacja z ostrzeżeniem, to usunięcie, więc kod korzystający z `trace` po prostu przestanie działać po aktualizacji.

Bindingi do Reacta, mobx-react-lite 5 i mobx-react 10, wymagają teraz MobX 7 i Reacta 18 lub nowszego. Lista usuniętych API z tych pakietów jest długa: `Provider`, `inject` i `MobXProviderContext` (zamiennik to zwykły `React.createContext`), `disposeOnUnmount`, `PropTypes`, `useObserver`, `useLocalStore` i cała rodzina importów związanych z batchowaniem, w tym stary import batchowania dla React Native, bo React 18+ obsługuje batching natywnie w swoich rendererach. Rekomendowana powierzchnia publiczna zwęża się do `observer`, `Observer`, `useLocalObservable`, `enableStaticRendering` i `isUsingStaticRendering`. Efekt tych porządków jest wymierny: paczka ESM produkcyjna spadła z 17,02 KiB do 13,96 KiB po gzipie, a minimalny, przyciśnięty tree-shakingiem przykład waży teraz 10,32 KiB.

**Key takeaways:**
- MobX 7 zawsze używa Proxy; nie ma już fallbacku ES5 ani opcji `useProxies`/`proxy: false`.
- Legacy dekoratory nie są już wspierane; trzeba przejść na nowoczesny model dekoratorów przed aktualizacją.
- Publiczne API `trace` zostało całkowicie usunięte, nie tylko zdeprecjonowane.
- mobx-react-lite 5 i mobx-react 10 wymagają MobX 7 i Reacta 18+; usunięto `Provider`, `inject`, `useObserver` i całą rodzinę importów batchowania.

**Why do I care:** To jest release, przy którym warto najpierw przeczytać changelog od początku do końca, zanim zaktualizujecie zależności w piątek po południu. Jeśli wasz projekt siedzi na starych dekoratorach albo korzysta z `Provider`/`inject`, ta aktualizacja to nie jest bump patcha, to migracja z realną pracą do zrobienia, mimo że numer wersji sugeruje coś prostszego niż to, co faktycznie trzeba zmienić w kodzie.

**Link:** [Release mobx@7.0.0](https://github.com/mobxjs/mobx/releases/tag/mobx%407.0.0)

## Migracja do React Native w erze AI: brownfield czy greenfield
**TLDR:** Callstack rozkłada odwieczny dylemat migracji do React Native na trzy realne scenariusze, zachowanie istniejącej aplikacji natywnej i migrację ekran po ekranie, budowę zupełnie nowej aplikacji od zera, oraz podejście hybrydowe z punktem kontrolnym, przy czym agenci kodujący AI zmieniają kalkulację, ale nie eliminują potrzeby zarządzania procesem.

**Summary:** Punkt wyjścia artykułu jest bardzo konkretny biznesowo: rozdzielona dostawa na iOS i Android zaczyna kosztować drogo dużo wcześniej, niż zespoły decydują się na migrację, bo każda funkcja przechodzi przez dwie ścieżki implementacji, dwie recenzje kodu, dwa cykle QA i dwa harmonogramy wydań. Presja rośnie szybciej, gdy produkt się rozwija, a zespół nie, i to właśnie ta presja, nie moda na React Native, jest zwykle realnym wyzwalaczem decyzji o migracji.

Brownfield zachowuje aplikacje natywne jako produkcyjnego hosta i wprowadza React Native ekran po ekranie, co dobrze się sprawdza tam, gdzie ciągłość jest kosztowna do odtworzenia, sesja użytkownika, bezpieczne przechowywanie danych, tożsamość push, subskrypcje, rozszerzenia aplikacji. Koszt tego podejścia to dodatkowa granica architektoniczna, którą ktoś musi utrzymywać, pakowanie, integracja z hostem, nawigacja między światem natywnym i React Native, współdzielony stan. Greenfield idzie w drugą stronę, budując nową aplikację, zwykle na standardowym fundamencie jak Expo, i wysyłając ją pod istniejącym bundle ID jako aktualizację. To redukuje tarcie architektoniczne w implementacji i lepiej współpracuje z agentami AI, bo wzorce w nowym kodzie są bardziej przewidywalne, ale przenosi ryzyko na ciągłość i parytet funkcjonalny, bo produkty rzadko zawodzą, dlatego że ekran nie da się odbudować, zawodzą, gdy przebudowana aplikacja gubi nagromadzone przez lata zachowanie, na które użytkownicy się przyzwyczaili.

Trzecia opcja, hybryda z punktem kontrolnym, zaczyna od greenfield, ustala konkretny checkpoint do sprawdzenia, i trzyma brownfield jako przetestowaną ścieżkę zapasową. Checkpoint musi testować ciągłość produktu na reprezentatywnych przepływach, uwierzytelnianie, analitykę, dostępność, wydajność, przynajmniej jedną istotną granicę natywną, nie tylko szybkość samej implementacji. Autorzy jasno zaznaczają, że agenci kodujący zmieniają grę, bo mogą analizować istniejącą implementację natywną i odtwarzać zagubioną w kodzie logikę biznesową na skalę, która wcześniej była niepraktyczna, ale to nie robi migracji samosterującą. Wciąż potrzeba jasnych reguł mapowania, kontraktów zadań, sprawdzania parytetu na poziomie urządzenia i nazwanych właścicieli po stronie ludzkiej, bo zespoły, które przeskakują drugi etap, uidiomatyzowanie kodu po pierwszej wiernej migracji, kończą z React Native, który wciąż niesie strukturę i założenia starej architektury natywnej.

**Key takeaways:**
- Brownfield minimalizuje ryzyko ciągłości, ale dodaje trwałą granicę architektoniczną między światem natywnym i React Native.
- Greenfield daje czystszy fundament i lepsze warunki dla agentów AI, ale przenosi ryzyko na odtworzenie parytetu funkcjonalnego przed cutoverem.
- Hybryda z punktem kontrolnym testuje greenfield na reprezentatywnych przepływach przed pełnym zaangażowaniem, trzymając brownfield jako sprawdzoną ścieżkę zapasową.
- Agenci AI redukują koszt odtwarzania logiki biznesowej z istniejącego kodu, ale nie zastępują reguł mapowania, kontraktów zadań i ludzkiego nadzoru nad parytetem.

**Why do I care:** Ten artykuł trafia w coś, co widziałem wielokrotnie: zespoły traktują wybór ścieżki migracji jako pytanie techniczne, podczas gdy to jest pytanie o to, gdzie organizacja jest gotowa ponieść ryzyko. Ramowanie decyzji przez pięć zmiennych, ciągłość zainstalowanej bazy użytkowników, głębokość zależności natywnych, presję roadmapy, ekspozycję na weryfikację i wydania, oraz własność architektury, jest dużo użyteczniejsze niż typowe "to zależy od projektu", bo daje konkretną listę pytań do zadania przed podjęciem decyzji, nie po niej.

**Link:** [AI-Assisted React Native Migration: Brownfield vs. Greenfield](https://www.callstack.com/blog/migration-to-react-native-in-2026-starts-with-a-delivery-question)

## Rozpoznawanie twarzy na urządzeniu w React Native: cały pipeline, krok po kroku
**TLDR:** Bardzo szczegółowy, inżynierski rozbiór budowy działającego w czasie rzeczywistym pipeline'u rozpoznawania twarzy w React Native z użyciem VisionCamera, od detekcji przez wyrównanie i liveness aż po embeddingi i dopasowywanie, całość działająca lokalnie na telefonie.

**Summary:** Artykuł zaczyna od uczciwego postawienia sprawy: prośba typu "chcemy, żeby stanowisko rozpoznawało uczestników po twarzy" brzmi jak jedno wywołanie modelu, a w rzeczywistości kryje pipeline złożony z wielu wyspecjalizowanych etapów, detekcji, śledzenia, wyrównania, embeddingu, dopasowania i anti-spoofingu, z których każdy musi zdążyć w kilkadziesiąt milisekund na sprzęcie, którego nie kontrolujesz. Wszystko działa na urządzeniu, nie w chmurze, bo dane biometryczne są wyjątkowo wrażliwe, a prywatność wygrywa na każdej osi, która się liczy w produktach do check-inu, kontroli dostępu czy KYC.

VisionCamera dostarcza surowe klatki kamery bezpośrednio do worketu na dedykowanym natywnym wątku, bez serializacji przez bridge i bez kopiowania pikseli do JavaScriptu, co jest fundamentem tego, że cokolwiek z tego działa w czasie rzeczywistym. Trzy decyzje niosą większość budżetu wydajności: żądanie niskiej rozdzielczości od kamery, praca na natywnym formacie YUV zamiast wymuszania konwersji na RGB co ramkę, i backpressure typu "trzymaj najnowszą klatkę, odrzuć resztę", bo bez tego kolejka rośnie w nieskończoność, a podgląd zaczyna wlekitanie za rzeczywistością o kilka sekund. Do wyboru modelu detekcji autorzy wybrali YuNet, głównie za licencję przyjazną komercyjnie, mały rozmiar i landmarki mapujące się prosto na szablon wyrównania ArcFace, w kontraście do modeli InsightFace, których wagi są tylko do użytku badawczego, co jest pułapką, w którą wpada wiele zespołów odkrywających to dopiero przy przeglądzie prawnym przed wydaniem.

Najciekawszy techniczny fragment dotyczy wyrównania twarzy i błędu, który jest opisany z dużą szczerością: bufory z kamery przedniej mogą przychodzić odbite w zwierciadle, i wyrównanie odbitej twarzy do nieodbitego szablonu wciąż daje wizualnie sensowny wynik, ale systematycznie zniekształca przestrzeń embeddingów tak, że różni ludzie zaczynają się do siebie dopasowywać. To są false accepts, najgorszy możliwy tryb błędu dla kontroli dostępu, powstający trzy etapy wcześniej niż tam, gdzie objaw się pojawia. Autorzy pokazują też, dlaczego liveness pasywny, mały klasyfikator wykrywający tekstury typowe dla ataków prezentacyjnych, jak moiré ekranu czy poblask papieru, jest lepszym wyborem dla scenariusza ciągłego check-inu niż liveness aktywny wymagający mrugnięcia czy odwrócenia głowy, i uruchamiają go tylko wtedy, gdy dopasowanie już wskazało konkretną tożsamość, bo twarz, która nikomu nie odpowiada, i tak niczego nie odblokowuje.

Najbardziej praktyczna część to sekcja o śledzeniu, gdzie autorzy opisują, jak odkryli, że uruchamianie detekcji na każdej klatce jest zbyt drogie, żeby utrzymać 30 klatek na sekundę. Detektor działa co dziesiątą klatkę, a pomiędzy tym prosty tracker oparty na intersection-over-union podąża za już znalezioną twarzą, co daje stabilną tożsamość śledzenia między klatkami i pozwala harmonogramować drogie rozpoznawanie znacznie rzadziej niż detekcję, bez zauważalnej różnicy dla użytkownika. Cały opisany przypadek testowy, uczestnik podchodzący do stanowiska w galerii 140 zarejestrowanych osób, kończy się na łącznym koszcie około 39 milisekund na klatkę rozpoznającą, z dziewięcioma kolejnymi klatkami kosztującymi ułamek milisekundy każda, bo detekcja i rozpoznawanie w nich po prostu nie działają.

**Key takeaways:**
- VisionCamera v5 daje dostęp do klatek kamery w workletach na natywnym wątku, bez bridge'a i kopiowania pikseli, co jest warunkiem koniecznym rozpoznawania w czasie rzeczywistym.
- Wagi modeli InsightFace (ArcFace, RetinaFace) są tylko do użytku badawczego; YuNet i SFace mają licencje Apache-2.0/MIT przyjazne komercyjnie.
- Odbite bufory z kamery przedniej wyrównane do nieodbitego szablonu powodują systematyczne false accepts, błąd trudny do wykrycia bez wiedzy, czego szukać.
- Śledzenie oparte na IoU pozwala uruchamiać drogą detekcję i rozpoznawanie znacznie rzadziej niż co klatkę, bez odczuwalnej różnicy dla użytkownika.

**Why do I care:** To jest jeden z tych artykułów, które warto zapisać na później, nawet jeśli nie budujecie akurat rozpoznawania twarzy, bo wzorce opisane tutaj, budżetowanie klatek, backpressure, śledzenie zamiast ponownej detekcji, harmonogramowanie drogich operacji na podstawie stanu, przenoszą się na każdy pipeline computer vision w czasie rzeczywistym na mobile. Szczerość co do pułapek, licencje badawcze udające darmowe, mirror bug wykrywalny tylko trzy etapy dalej, jank który wyglądał na problem CPU a był problemem odświeżania ekranu, jest rzadsza niż powinna być w tego typu materiałach technicznych.

**Link:** [Building a Real-Time Face Recognition App in React Native with VisionCamera](https://blog.margelo.com/on-device-face-recognition-react-native)
