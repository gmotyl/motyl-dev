---
title: "Wyścig modeli AI, NestJS 12, polyfille i przyszłość programowania"
excerpt: "Przegląd tygodnia: OpenAI odpala GPT-5.6, Google otwiera Interactions API dla wszystkich, NestJS 12 stawia na ESM i Vitest, a Lea Verou broni polyfilli przed krytykami ze świata standardów."
publishedAt: "2026-07-16"
slug: "model-roundup-nestjs-12-polyfills-future-of-coding"
hashtags: "#javascript #typescript #frontend #nodejs #ai #llm #nestjs #webstandards #uidev #generated #pl"
source_pattern: "ui.dev"
---

## GPT-5.6: OpenAI odpowiada na Claude Fable 5

**TLDR:** OpenAI wypuściło rodzinę modeli GPT-5.6 w trzech wariantach — Sol, Terra i Luna — stawiając głównie na wydajność kosztową i agentowe przepływy pracy. Nowy flagowiec bije Fable 5 w kilku kluczowych benchmarkach, robiąc to taniej i szybciej.

**Summary:** GPT-5.6 to odpowiedź OpenAI na rosnącą konkurencję ze strony Anthropic i Google. Rodzina składa się z trzech modeli: Sol (flagship), Terra (balans między jakością a ceną) i Luna (najtańszy, najszybszy). OpenAI chwali się, że Sol osiąga wyniki zbliżone do Fable 5 przy połowie czasu odpowiedzi i mniej więcej połowie ceny — co w praktyce oznacza znaczną zmianę w rachunku opłacalności dla firm budujących agentowe systemy.

Jedną z ciekawszych nowości jest tryb "ultra", który uruchamia czterech agentów równolegle i zbiera ich wyniki. OpenAI twierdzi, że na benchmarkach takich jak BrowseComp i Terminal-Bench taka konfiguracja przesuwa krzywą wyniki/latencja wyraźnie w górę. Do tego dochodzi Programmatic Tool Calling w Responses API — model może pisać i uruchamiać lekkie programy koordynujące narzędzia bez konieczności przepuszczania każdego kroku przez duży model.

W kwestii bezpieczeństwa OpenAI wdraża warstwowy system zabezpieczeń oparty na reasoning monitorze, który analizuje kontekst rozmowy i decyduje o blokowaniu treści. Firma przyznaje, że nowe safeguardy są bardziej restrykcyjne niż poprzednie — około dziesięć razy częściej blokują podejrzaną aktywność, ale kosztem większego tarcia dla niewinnych zapytań.

Cennik: Sol kosztuje 5 dol. za milion tokenów wejściowych i 30 dol. za wyjściowe. Terra to 2,50 i 15 dol., Luna 1 i 6 dol. Warto odnotować, że OpenAI zmienia też model cachowania — cache write są teraz płatne (1,25x stawki bazowej), ale gwarantowany czas życia cache wynosi co najmniej 30 minut.

**Key takeaways:**
- Sol konkuruje z Fable 5 przy znacznie niższym koszcie i krótszym czasie odpowiedzi na większości benchmarkach
- Tryb "ultra" zrównoleglania agentów dostępny przez API jako multi-agent beta w Responses API
- Programmatic Tool Calling pozwala modelowi pisać programy in-memory koordynujące narzędzia bez round-tripów

**Why do I care:** Różnica kosztów między modelami frontierowymi zaczyna mieć realny wpływ na decyzje architektoniczne. Kiedy Sol robi porównywalną robotę do Fable 5 za połowę ceny, zespoły muszą na nowo liczyć, który model warto używać w pętli agentowej, a który jako "thinking model" do trudniejszych zadań. Ceny cache write to mały sygnał, że OpenAI powoli optymalizuje pod kątem zysku na intensywnych workloadach — warto mieć to na radarze przy projektowaniu systemów z dużym promptem systemowym.

**Link:** [GPT-5.6: Frontier intelligence that scales with your ambition](https://openai.com/index/gpt-5-6/)

---

## NestJS 12: ESM, Vitest i Standard Schema

**TLDR:** NestJS 12 jest w fazie prerelease i przynosi migrację do ESM, nowe domyślne narzędzia (Vitest, oxlint, Rspack) oraz wsparcie dla Standard Schema w dekoratorach routingu. Cel to wczesny Q3 2026.

**Summary:** NestJS 12 to pierwsza naprawdę gruntowna modernizacja platformy od lat. Najważniejszą zmianą jest przejście corowych pakietów na ESM — ale twórcy zaznaczają, że dzięki wsparciu `require(esm)` w Node.js migracja powinna być mniej bolesna niż jeszcze kilka lat temu. CLI będzie pytać o wybór między CJS a ESM przy tworzeniu nowego projektu, co daje zespołom spokojny czas na decyzję.

Nowe projekty ESM dostaną Vitest i oxlint jako domyślne narzędzia zamiast Jest i ESLint. Webpack jest zastępowany przez Rspack w warstwie CLI. To spójne z ogólnym trendem w ekosystemie — narzędzia oparte na Rust i Go stopniowo przejmują role, które przez lata pełnił JavaScript/Node.

Najciekawsza nowość na poziomie frameworka to wsparcie dla Standard Schema w dekoratorach routingu. Zamiast polegać wyłącznie na class-validator, można teraz przekazać obiekt Zod, Valibot albo ArkType bezpośrednio do `@Body()`, `@Query()` czy podobnych dekoratorów. To zmienia ergonomię walidacji w Nest z "musisz znać class-validator" na "użyj swojej ulubionej biblioteki schematu". Co ważne — class-validator nie jest usuwany, pozostaje domyślną opcją w dokumentacji.

Do tego dochodzi długa lista pomniejszych zmian: obsługa NATS v3, pre-request hooki dla mikroserwisów, wzorce regexp dla Kafki, filtry wyjątków dla gRPC, GraphiQL jako domyślny playground dla GraphQL, i ulepszenia w routerze rdzenia. Strona frameworka przechodzi też pierwszy poważny redesign od dziewięciu lat.

**Key takeaways:**
- Migracja do ESM jest możliwa stopniowo — CLI pozwala wybrać CJS lub ESM per projekt
- Standard Schema w dekoratorach to natywne wsparcie dla Zod, Valibot, ArkType bez klas
- Rspack zastępuje webpack, oxlint zastępuje ESLint w nowych projektach ESM

**Why do I care:** Nest to framework backendowy, ale decyzje podjęte tutaj mają wpływ na cały stack TypeScript. Standard Schema to inicjatywa, która próbuje zunifikować ekosystem bibliotek walidujących — jeśli Nest adoptuje to jako pierwszorzędny feature, inne frameworki pewnie pójdą w ślady. Jeśli utrzymujesz duże aplikacje Nest, warto teraz zainstalować pakiety z tagu `next` i sprawdzić, gdzie są tarcia zanim release trafi na `latest`.

**Link:** [NestJS v12 is Coming: What's New - Trilon Consulting](https://trilon.io/blog/nestjs-12-is-coming)

---

## Wysoko wydajne parsery z Data-Oriented Design

**TLDR:** Arshad Meer opisuje szczegółowo jak zbudował parser JavaScript/TypeScript w Zig, który jest 3-10x szybszy od alternatyw na npm — kluczem są płaskie tablice, indeksy zamiast wskaźników i unikanie alokacji na gorącej ścieżce.

**Summary:** Yuku to parser napisany w Zig, który może zarówno tworzyć AST kompatybilne z ESTree jak i eksportować je do JavaScript jako `ArrayBuffer` bez kosztownej serializacji. Artykuł jest jednym z lepszych technicznych opisów Data-Oriented Design, jakie ostatnio czytałem.

Główna idea: parser textbookowy tworzy węzeł AST jako oddzielną alokację na stercie. Dla pliku 100 KB to ~50 000 węzłów, 50 000 alokacji i 50 000 zwolnień pamięci. Każde przejście po drzewie to seria losowych dostępów do pamięci — cache miss za cache miss. Yuku zamienia wskaźniki na indeksy do jednej płaskiej tablicy. Indeks zajmuje 4 bajty zamiast 8, jest niezależny od adresu, a całe drzewo można zwolnić jednym wywołaniem alokator areny.

Zamiast kopiować nazwy identyfikatorów, Yuku przechowuje zakresy bajtów do oryginalnego źródła. Większość plików to czysty ASCII więc tablica Unicode ID_Start/Continue nigdy nie jest konsultowana. Tokeny kodują swój priorytet i typ binarnie w wartości enuma — żadnych tabel, żadnych gałęzi. Serializacja do JavaScript to po prostu `memcpy` — bo płaskie tablice indeksów są już przenośnymi bajtami.

Artykuł pokazuje że szybkość parsera to nie kwestia sprytnego algorytmu, lecz właściwej reprezentacji danych. Recursive descent jest trywialny. Decyzja o tym jak węzeł wygląda w pamięci — to jest różnica między narzędziem klasy naukowej a narzędziem klasy produkcyjnej.

**Key takeaways:**
- Indeksy zamiast wskaźników: mniejsze, przenośne, freeable jedną operacją
- `std.MultiArrayList` w Zig rozdziela dane na kolumny — przejście po typach węzłów nie ciągnie spanów do cache
- Płaska reprezentacja = serializacja gratis, wystarczy `memcpy`

**Why do I care:** Piszesz narzędzia developerskie, lintery, bundlery albo po prostu dużo przetwarza się struktury danych? Wzorce opisane tutaj działają w każdym języku. W TypeScript/JavaScript mamy `TypedArray` i `ArrayBuffer` jako odpowiednik płaskich tablic — i choć nie mamy Zig-owego `MultiArrayList`, idea struct-of-arrays vs array-of-structs przekłada się bezpośrednio. To jeden z tych artykułów, który zmienia sposób myślenia o pamięci.

**Link:** [Engineering High-Performance Parsers with Data-Oriented Design](https://www.arshad.fyi/writings/engineering-high-performance-parsers)

---

## W obronie polyfilli

**TLDR:** Lea Verou odpowiada na opinię wpływowego edytora specyfikacji, że polyfillowanie jest szkodliwe — i przekonująco pokazuje, że eliminacja polyfilli nie eliminuje potrzeby, którą zaspokajają, tylko zmusza developerów do gorszych obejść.

**Summary:** Dyskusja zaczęła się na spotkaniu WHATWG, gdzie Anne van Kesteren (główny aktywny edytor większości specyfikacji WHATWG) wyraził pogląd, że polyfillowanie jest szkodliwe. Verou sprawdziła, czy to szerszy konsensus grupy — okazało się, że nie, ale opinie były bardziej ambiwalentne niż oczekiwała.

Centralny argument Verou jest elegancki: autorzy webowi chcą używać natywnych zachowań gdy istnieją, bez awarii gdy nie istnieją. Właśnie to jest tym, co ogranicza swobodę projektowania API — nie polyfille jako takie, ale fakt że kod produkcyjny zakłada konkretny kształt API zanim stało się ono ostateczne. To samo ryzyko tworzą CSS fallbacki, conditional imports, web componenty jako fallback dla nativnych elementów. Elimminowanie polyfilli nie eliminuje potrzeby.

Verou pokazuje też, że polyfille pełnią ważną funkcję systemową: bez możliwości warunkowego użycia nowej funkcji, przeglądarki mają mniejszą motywację do bycia pierwsze w implementacji. Kto pierwszy, ten na tarczy — bo pozostałe przeglądarki mogą po prostu nic nie robić i czekać, aż deweloperzy będą zmuszeni targetować wszystkich. Szybkość pierwszej implementacji jest kluczowa dla ewolucji platformy.

Omówione są też alternatywy: osobne przestrzenie nazw (patrz: vendor prefixes — sprawdzone w praktyce, nie działało), ponyfille (biblioteki bez modyfikacji globali), polyfille bez feature detection. Verou odrzuca każde z rozwiązań jako gorsze od dobrze napisanego polyfilla.

Prawdziwy problem: kiedy polyfill staje się zbyt popularny, to sygnał że pilna potrzeba deweloperska zbyt długo czekała na odpowiedź. Wina leży po stronie procesu standaryzacji, nie po stronie polyfilla.

**Key takeaways:**
- Potrzeba używania nowych API warunkowo istnieje niezależnie od polyfilli — usunięcie polyfilli nie usuwa potrzeby
- Popularne polyfille demonstrują popyt na feature przed implementacją — to właśnie pcha przeglądarki do implementacji
- Każda historyczna katastrofa z polyfillami sprowadza się do tego, że potrzeba deweloperska zbyt długo czekała na natywną odpowiedź

**Why do I care:** Ten artykuł przydaje się kiedy trzeba argumentować w kodereview albo na arch meetingu, dlaczego używamy danego polyfilla zamiast czekać na pełne wsparcie. Verou daje precyzyjną terminologię i historyczne precedensy. Szczególnie wartościowe jest rozróżnienie między prawdziwymi polyfillami a "prollyfillami" — spekulatywnym zajmowaniem przestrzeni nazw dla niestandardowego API. Takie niuanse często giną w skrótowych dyskusjach.

**Link:** [In defense of polyfills • Lea Verou](https://lea.verou.me/blog/2026/polyfills/)

---

## kassette: trwałe przepływy agentowe w TypeScript

**TLDR:** kassette to mała biblioteka TypeScript zero-dependency, która pozwala tworzyć trwałe przepływy agentowe — wykonane kroki są zapisywane w dzienniku JSONL, a po awarii replay odtwarza je bez ponownego wywoływania modelu czy narzędzi.

**Summary:** Problem kassette rozwiązuje jest realny: agentowe przepływy pracy są drogie, długie i podatne na awarie. Kiedy coś się wysypie w połowie wieloetapowego zadania — LLM przetwarza ticket, czeka na ludzką akceptację, wykonuje narzędzie — chcesz wznowić od miejsca awarii, nie od początku.

kassette rejestruje każdy ukończony krok w pliku JSONL na dysku lub w object storage. Przy retry wrapper sprawdza dziennik i zwraca zapisane wyniki zamiast ponownie wywoływać model. Zawieszenie (`ctx.suspend()`) powoduje wyjście procesu — wznowienie następuje przez zewnętrzny event (webhook, kolejka, CI job). Sama biblioteka jest tylko biblioteką, nie runtime'em — twój istniejący system kolejek jest tym, co re-invokuje ten sam `runId`.

API jest proste: `kassette()` przyjmuje async funkcję z kontekstem, `ctx.step()` opakowuje drogi krok, `ctx.suspend()` zawiesza przepływ. Każde wywołanie `ctx.step()` z tym samym ID na replay zwraca zapamiętany wynik bez wywoływania callbacku. Fork i branching pozwalają na spekulatywne gałęzie — możesz nagrać plan i próbować wielu implementacji bez powtarzania planowania.

Biblioteka działa zarówno lokalnie (filesystem) jak i na Cloudflare (R2 + Queue), a przykłady pokazują integrację z Vercel AI SDK.

**Key takeaways:**
- Replay z dziennika JSONL eliminuje ponowne wywołania LLM i narzędzi po awarii
- `ctx.suspend()` pozwala procesowi zakończyć się i wznowić z zewnętrznego eventu
- Brak własnego runtiku — integracja z twoim systemem kolejek przez wspólny `runId`

**Why do I care:** Każdy kto budował wieloetapowe agentic workflows wie jak irytujące jest debugowanie od nowa po timeout albo przejściowym błędzie API. kassette rozwiązuje dokładnie ten problem w sposób, który nie wymaga zmiany całej architektury. JSONL jako audit trail to bonus — masz czytelny zapis co się działo w przepływie bez żadnej dodatkowej infrastruktury.

**Link:** [kassette - durable agentic workflows](https://lostinpatterns.github.io/kassette/)

---

## Kod był naszym medium myślenia

**TLDR:** Amelia Wattenberger argumentuje, że pisanie kodu ręcznie nie było tylko "produkcją" — był to proces myślenia, i jeśli przekazujemy go agentom bez zmian, tracimy coś istotnego w rozumieniu systemu i współpracy zespołu.

**Summary:** Artykuł zaczyna się od obserwacji, którą wielu z nas odczuwa ale rzadko artykułuje: mamy 50 otwartych PR-ów wygenerowanych przez agenty i stoimy przed wyborem między byciem wąskim gardłem a bezmyślnym akceptowaniem kodu, którego nie rozumiemy.

Wattenberger opisuje stary przepływ pracy jako ciasną pętlę między pisaniem, obserwacją, rozumowaniem i tweakowaniem — gdzie kod był medium do eksploracji problemu, a nie tylko jego wynikiem. Stub komponentu React, sprawdzenie w przeglądarce, rozmowa z kolegą o tym czy animacja powinna iść w inną stronę — to wszystko było myśleniem w kodzie. Agentowe przepływy pracy eliminują tę pętlę.

Artykuł osadza to w szerszej historii abstrakcji programowania: od kart perforowanych przez asembler, kompilatory, języki skryptowe, frameworki — każdy krok przekazywał więcej "jak" translatorowi i zostawiał nam więcej "co". Wattenberger twierdzi, że jesteśmy w połowie kolejnego kroku i robimy go źle, bo nadal reviewujemy surowy kod zamiast pracować w medium, które nam odpowiada.

Proponowane wyjście: narzędzia, które tworzą niestandardowe środowisko eksploracji per task — playground, whiteboard, panel z facetami produktu, które chcemy dopracować. Dema w artykule pokazują edytor wizualny do konfiguracji beeswarm chart, gdzie parametry fizyki i animacji są bezpośrednio editowalne bez dotykania kodu.

**Key takeaways:**
- Samo pisanie kodu było procesem myślenia, nie tylko jego wynikiem
- Używanie AI wyłącznie jako szybszego edytora kodu pogłębia utratę intuicji produktowej i mapy mentalnej codebase'u
- Następnym krokiem może być praca w medium dopasowanym do zadania, nie w surowym kodzie

**Why do I care:** Jako architekt często muszę utrzymywać mentalną mapę codebase'u — i obserwuję jak team traci ją szybciej gdy intensywnie używa agentów. Artykuł nie demonizuje AI, jest dość precyzyjny w diagnozie: problem nie w tym że używamy agentów, ale że nie zmieniliśmy jeszcze workflow i narzędzi żeby odzyskać feedback loop. Interesująca perspektywa na to, co ma się zmienić w IDEach i narzędziach w ciągu najbliższych kilku lat.

**Link:** [Code was our medium for thought](https://wattenberger.com/thoughts/code-is-a-medium-for-thought/)

---

## Google Interactions API osiąga ogólną dostępność

**TLDR:** Google ogłosiło ogólną dostępność Interactions API jako głównego interfejsu dla modeli Gemini i agentów — unifikując wywołania modeli, agentów i długotrwałych zadań w jednym endpoincie ze stanem po stronie serwera.

**Summary:** Interactions API, którego publiczna beta pojawiła się w grudniu 2025, jest teraz domyślnym interfejsem dla wszystkich nowych projektów Google AI. Główne różnice w stosunku do legacy `generateContent` API: server-side state, natywna obsługa agentów przez ID, background execution i ujednolicony schemat "steps" zamiast ról.

Nowe możliwości w GA obejmują Managed Agents — jedno wywołanie API tworzy zdalny sandbox Linux, gdzie agent może rozumować, wykonywać kod, przeglądać web i zarządzać plikami. Domyślny agent to Antigravity, ale możesz definiować własne z instrukcjami, skillami i źródłami danych. Background execution działa przez ustawienie `background=True` — serwer przetwarza asynchronicznie.

Schemat zmienił się z role-based na step-based: każda akcja (user_input, thought, function_call, model_output) jest osobnym typowanym stepem. Deep Research dostał dwa nowe warianty (szybkość vs głębokość), nativne wykresy i multimodalne grounding. Dodano też generowanie mediów: obrazy (Nano Banana 2), muzykę (Lyria 3) i ekspresywną syntezę mowy z wieloma głośnikami.

Dla optymalizacji kosztów dostępne są dwa tiery: Flex (50% redukcja kosztów) i Priority. Legacy `generateContent` pozostaje wspierane, ale Google sygnalizuje, że frontier capabilities dla długotrwałych modeli i agentów będą coraz częściej dostępne wyłącznie przez Interactions API.

**Key takeaways:**
- Jeden endpoint dla modeli i agentów — ten sam kod wywołuje model przez ID modelu albo autonomicznego agenta przez ID agenta
- Step-based schema zastępuje role-based, background execution natywnie wspierane
- Flex tier oferuje 50% redukcję kosztów względem Priority

**Why do I care:** Google robi coś, co OpenAI i Anthropic robią osobno: unifikują model inference i agent orchestration w jednym API. Jeśli budujesz systemy multi-provider, warto śledzić jak ten schemat ewoluuje — może to zmierzać do jakiegoś wspólnego standardu podobnego do OpenAI-compatible API, które stało się de facto lingua franca. Na razie to raczej sygnał do obserwowania niż do natychmiastowej migracji.

**Link:** [Interactions API: our primary interface for Gemini models and agents](https://blog.google/innovation-and-ai/technology/developers-tools/interactions-api-general-availability/)
