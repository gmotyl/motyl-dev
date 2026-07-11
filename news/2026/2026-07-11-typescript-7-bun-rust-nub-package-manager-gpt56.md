---
title: "TypeScript 7 z Go, Bun przepisany w Rust i nowy menadżer pakietów — przegląd tygodnia"
excerpt: "Najważniejsze wydarzenia tygodnia: TypeScript 7 z natywnym kompilatorem w Go, Bun v1.4 przepisany w Rust przez jeden team w 11 dni, nowy menadżer pakietów Nub rozwiązujący problem phantom dependencies, GPT-5.6 od OpenAI oraz praktyczne zastosowania AI agentów."
publishedAt: "2026-07-11"
slug: "typescript-7-bun-rust-nub-package-manager-gpt56"
hashtags: "#uidev #javascript #frontend #webdev #generated #pl #typescript #react #nodejs #packagemanager"
source_pattern: "ui.dev"
---

## TypeScript 7.0 — natywny kompilator w Go i 10-krotny wzrost prędkości

**TLDR:** Microsoft ogłosił TypeScript 7, przepisany w Go, który oferuje od 8x do 12x szybsze buildy na prawdziwych projektach. To nie jest update z nowymi feature'ami — to zmiana fundamentów całego toolsetu.

**Summary:** Przez lata TypeScript był jednym z tych narzędzi, które działają, ale przy dużych codebase'ach zaczynają być problemem. Budowanie projektu podobnego do VS Code zajmowało ponad dwie minuty. Teraz zajmuje niecałe jedenaście sekund. To nie jest liniowa poprawa — to zmiana rzędu wielkości, i warto zastanowić się, co ona oznacza w praktyce.

Nowy kompilator powstał jako port istniejącej logiki TypeScripta do Go. Microsoft nie reinwentował architektury od zera, zachował strukturę i logikę oryginalnego kodu. Kluczowa różnica leży w tym, że Go pozwala na native code speed, wielowątkowe przetwarzanie i lepsze zarządzanie pamięcią. Efekt: buildy 8-12x szybsze, a zużycie pamięci niższe o około 15-25% na dużych projektach.

Liczby, które robi wrażenie: VS Code — 125 sekund na 10 sekund. Sentry — 139 sekund na 15 sekund. Bluesky — 24 sekundy na 2.8 sekundy. Ale nie chodzi tylko o build. Czas od otwarcia edytora do zobaczenia pierwszego błędu w VS Code spadł z 17.5 sekundy do 1.3 sekundy. To zmiana, którą odczuwa się na co dzień, nie tylko w CI.

TypeScript 7 wprowadza też configurowalne paralelizowanie. Domyślnie uruchamianych jest 4 type-checkerów, ale można to zmienić flagą `--checkers`. Na tym samym projekcie VS Code z 8 checkerami zamiast 4 dostajemy przyspieszenie z 11.9x do 16.7x. Nowy tryb `--watch` oparty o Parcel's watcher zastępuje stare, wadliwe rozwiązania cross-platformowe.

Ważna pułapka: TypeScript 7 na razie nie ma stable programmatic API. Oznacza to, że Vue, Svelte, Astro, MDX i Angular nie mogą jeszcze korzystać z nowego kompilatora w edytorach — one wymagają integracji poprzez Volar i podobne narzędzia, które polegają na starej API. Microsoft obiecuje rozwiązanie tego w TypeScript 7.1. Do tego czasu projekty oparte na tych frameworkach mogą używać TypeScript 7 do type-checkingu w CLI, ale muszą zostać przy TypeScript 6 dla edytorów.

Co mnie niepokoi w tym release? Deprecations, które stały się hard errors, mogą połamać wiele projektów. `target: es5` przestaje być wspierany. `baseUrl` jest deprecated na rzecz relatywnych ścieżek w `paths`. `moduleResolution: node` odchodzi do lamusa. To konieczne sprzątanie, ale wiele projektów produkcyjnych na tym utknęło — migracja wymaga uwagi, szczególnie w starszych monorepo.

**Key takeaways:**
- TypeScript 7 to port do Go, nie rewrite logiki — kompatybilność z 6.0 jest zachowana
- Speedupy 8-12x na buildach, 13x szybszy czas do pierwszego błędu w edytorze
- Brak stable API w 7.0 blokuje frameworki używające Volar (Vue, Svelte, Astro, MDX)
- Wiele dotychczasowych opcji (`es5`, `baseUrl`, `moduleResolution: node`) staje się błędami
- TypeScript 7.1 ma dostarczyć nowe API i zamknąć luki dla frameworków
- Instalacja jak zwykle: `npm install -D typescript`

**Why do I care:** Z perspektywy architekta frontend, TypeScript 7 to jeden z tych release'ów, które naprawdę zmienią codzienność pracy. Problemy z wydajnością language service'u w dużych monorepo były jednym z głównych powodów, dla których zespoły robiły różne obejścia — osobne tsconfigi, incremental builds, pomijanie type-checkingu lokalnie. Przy 10x speedupie wiele tych kompromisów staje się niepotrzebnych. Ważniejsze jednak jest to, co powiedzieli inżynierowie ze Slacka: TypeScript 7 sprawił, że lokalny type-checking stał się znów wykonalny. To nie jest tylko kwestia CI. To kwestia tego, czy type system jest partnerem w pracy, czy przeszkodą.

**Link:** [Announcing TypeScript 7.0](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/)

---

## Bun przepisany w Rust — 11 dni, 64 instancje Claude Code i milion linii kodu

**TLDR:** Jarred Sumner przepisał Bun z Zig do Rust w 11 dni używając Claude Code z dynamicznymi workflowami i 64 równoległymi instancjami. Wynik: Bun v1.4 jest szybszy, mniejszy i ma mniej bugów.

**Summary:** To jest historia, która wymaga chwili zatrzymania. Bun, runtime JavaScript z 22 milionami miesięcznych pobrań, przepisany w innym języku programowania przez jednego inżyniera w 11 dni. Przy pomocy AI, ale jednak. To brzmi jak marketing, ale liczby i commit historia mówią co innego.

Jarred Sumner przez lata borykał się ze specyficzną klasą bugów w Zig: use-after-free, double-free, memory leaki. Lista bugów z Bun v1.3.14 jest długa i nieprzyjemna — heap-use-after-free w node:zlib, race condition w MessageEvent, memory leak w crypto.scrypt. Problem polegał na tym, że Zig jak C nie zarządza pamięcią automatycznie. Bun miesza garbage-collected JavaScript values z manually-managed memory, co w Zig jest szczególnie trudne do opanowania.

Rust oferuje rozwiązanie przez swój borrow checker i Drop trait — kompilator gwarantuje safety zamiast polegać na code review i style guide. Decyzja o rewrite była kalkulacją: 3 inżynierów, rok pracy, freeze feature development — albo spróbować z AI. Padło na to drugie.

Mechanika była przemyślana. Sumner nie powiedział Claude'owi "przepisz Bun w Rust" i nie poszedł na urlop. Stworzył dynamiczne workflows — pętle, gdzie jeden Claude implementował, dwóch innych robiło adversarial review (szukając bugów bez dostępu do kontekstu implementatora), a czwarty aplikował poprawki. Zaczął od 3 plików próbnie, stworzył PORTING.md opisujący mapowanie wzorców Zig do Rust, LIFETIMES.tsv dokumentujący zarządzanie lifetime'ami dla każdego struct field.

Sam rewrite zajął 11 dni, 6502 commitów, szczyt: 695 commitów w jedną godzinę. Koszt API: około 165 tysięcy dolarów. Alternatywa? Według Sumnera: rok pracy dla 3 inżynierów z pełnym kontekstem kodu. Realistyczna alternatywa? Dalsze łatanie bugów ad hoc.

Wyniki są konkretne: Bun v1.4 naprawia 128 bugów z v1.3.14. Zużycie pamięci w `Bun.build()` wywołanym 2000 razy spada z 6.7 GB do 609 MB. Rozmiar binarki zmniejsza się o 20% na Linuksie. Prędkość HTTP wzrasta o 2-5%. Claude Code v2.1.181 już używa Rust portu Bun, a startup jest 10% szybszy na Linuksie.

Ale jest też czego szukać krytycznie. 19 znanych regresji po merge — wszystkie naprawione, ale były. Wynikały ze subtelnych różnic semantycznych między Zig a Rust, np. Rust's `debug_assert!` jest makrem elidowanym w release builds, podczas gdy Zig's `assert` jest funkcją uruchamianą zawsze. HMR w pewnych przypadkach przestało działać przez to właśnie. Około 4% kodu siedzi w `unsafe` blokach, co jest nieuniknione przy integracji z C++ bibliotekami jak JavaScriptCore.

**Key takeaways:**
- Rewrite z Zig do Rust zajął 11 dni, 6502 commitów, ~$165k w API costs
- Adversarial review pattern: implementer + 2 niezależni reviewerzy w osobnych kontekstach
- 128 bugów naprawionych, memory usage `Bun.build()` zmniejszone z ~6.7GB do ~0.6GB przy 2000 wywołaniach
- Rozmiar binarki zmniejszony o ~20%, HTTP throughput o 2-5% szybszy
- 19 regresji po merge, wszystkie naprawione — wynikały z semantycznych różnic Zig vs Rust
- Bun v1.4 dostępny w canary: `bun upgrade --canary`

**Why do I care:** To jest ważne nie dlatego, że Bun teraz używa Rust. Ważne jest to, co ta historia mówi o nowej rzeczywistości w inżynierii oprogramowania. Jeden inżynier z pełnym kontekstem kodu i AI jako narzędziem wykonał pracę, która normalnie wymagałaby kilkuosobowego teamu przez rok. Adversarial review pattern — gdzie Claude reviewuje kod napisany przez innego Claude w osobnym kontekście — to praktyczna technika, którą można stosować już dziś. Pytanie, które powinienem sobie postawić: które decyzje architektoniczne w moich projektach nie zostały podjęte nie dlatego, że były złe, ale dlatego, że koszt implementacji był zbyt wysoki?

**Link:** [Rewriting Bun in Rust](https://bun.com/blog/bun-in-rust)

---

## Nub — menadżer pakietów, który rozwiązuje problem phantom dependencies i jest 5x szybszy

**TLDR:** Nub to nowy JavaScript package manager, który implementuje machine-global virtual store przez symlinki, rozwiązując problem phantom dependencies poprzez statyczną analizę kodu z Oxc. Warm install jest 5x szybszy niż npm ci.

**Summary:** Problem z package managerami w JavaScript jest znany od lat, ale rzadko ktoś go jasno artykułuje. Nub to robi i zarazem proponuje konkretne rozwiązanie.

Wyobraź sobie, że masz projekt z 1168 zależnościami. npm kopiuje je wszystkie — każdy plik, każda wersja. pnpm jest sprytniejszy: używa hardlinków do global store, a w projekcie tworzy symlinki tylko do zadeklarowanych zależności. Ale i tak musi stworzyć strukturę plików per-projekt. Oczywistym krokiem byłoby: jeden symlink per pakiet, bezpośrednio do globalnego store. Bun próbował, pnpm też — i oba musiały to wycofać lub schować za flagą. Dlaczego?

Phantom dependencies. To pakiety, które ktoś importuje bez deklarowania ich w `package.json`. Brzmi jak nonsens, ale wiele popularnych bibliotek to robi: `react-i18next` importuje `babel-plugin-macros`, `@firebase/database` importuje `@firebase/app`. Kiedy Node.js rozwiązuje import z pliku w globalnym store, walker nie trafia do `node_modules` projektu — trafia w ślepy zaułek.

Nub rozwiązuje to przez statyczną analizę. Używa Oxc (JavaScript/TypeScript parser) do skanowania każdego pakietu przy instalacji. Identyfikuje "phantom imports" — niezadeklarowane ale używane zależności. Wynik trafia do małego sidecar file w globalnym store. Przy linkowaniu, pakiety z phantom imports są "ejectowane" — zamiast symlinka dostają hardlinki do projektu, tak jak robi to klasyczny pnpm. Wszystko inne dostaje symlink do globalnego store.

Efekt jest spektakularny w benchmarkach: warm install 1168 pakietów trwa 346ms w Nub, 1461ms w Nub z hoisted linker, 1896ms w Bun, 3453ms w pnpm i 12945ms w npm. To nie jest mała różnica. Większość frameworków działa już z globalnym store: Vite, Vue, Svelte, Solid, Preact, Astro, SvelteKit, Nuxt — wszystkie zielone. Next.js i React Native wymagają fallbacku do klasycznego hardlink approach, bo Turbopack i Metro mają twardy wymóg, że pliki muszą być fizycznie w projekcie.

Wart uwagi szczegół: Nub backportuje obsługę virtual store do starszych wersji Vite (aż do 5) przez patch-package. To pokazuje, jak przemyślane jest podejście — zamiast wymagać najnowszych wersji, aktywnie rozwiązuje kompatybilność.

Nie jestem w stanie ocenić stabilności Nub na produkcji bez dłuższego testowania. Narzędzie jest nowe, a testy dotyczyły głównie "happy path" frameworków. Jak zachowuje się przy bardziej egzotycznych konfiguracjach monorepo? Jak radzi sobie z workspace protocols? To pytania, które wymagają czasu, żeby odpowiedzieć.

**Key takeaways:**
- Nub implementuje machine-global virtual store przez symlinki — jedna kopia pliku per maszyna, nie per projekt
- Problem phantom dependencies rozwiązany przez statyczną analizę z Oxc — skanowanie przy pobraniu, nie przy każdej instalacji
- Warm install 5x szybszy niż npm ci, 3x szybszy niż Bun
- Większość frameworków działa z global store, Next.js i React Native mają fallback
- Vite 8.1+ ma natywne wsparcie; Nub backportuje obsługę do Vite 5
- Projekt jest nowy — warto monitorować stabilność przed adopcją produkcyjną

**Why do I care:** Phantom dependencies to jeden z tych problemów, które większość z nas po prostu zaakceptowała jako "tak po prostu jest". Nub pokazuje, że da się z tym walczyć przez analizę statyczną zamiast przez pozwalanie na nieporządek. To podejście jest ciekawe architektonicznie: inwestujesz czas przy instalacji (skanowanie kodu), żeby zaoszczędzić czas przy każdej kolejnej instalacji. Dla środowisk CI, gdzie warm installs są normą, 5x speedup to realna oszczędność. Nie polecałbym migrować na Nub jutro w projekcie produkcyjnym, ale warto mieć go na radarze.

**Link:** [Node's phantom dependency problem and the path to a 5x faster package manager](https://nubjs.com/blog/unblocking-the-global-virtual-store)

---

## GPT-5.6 — nowa rodzina modeli OpenAI z sol, terra i luna

**TLDR:** OpenAI wypuściło GPT-5.6 — rodzinę modeli składającą się z Sol (flagship), Terra (balanced) i Luna (cost-efficient). Sol claims state-of-the-art na wielu benchmarkach, szczególnie przy kodowaniu i zadaniach agentic.

**Summary:** OpenAI wchodzi w tryb regularnych aktualizacji modeli i trudno nie zauważyć, że strategia nazewnictwa zmienia się w coś bardziej trwałego. Sol, Terra i Luna to nie wersje — to capability tiers, które mają ewoluować na własnym tempie. To ciekawy sygnał o tym, jak OpenAI myśli o rynku: zamiast jeden model dla wszystkich, trzy profile cenowe z wyraźnie różnymi kompromisami.

Na papierze liczby robią wrażenie. Na Artificial Analysis Coding Agent Index GPT-5.6 Sol z max reasoning osiąga 80 punktów, wyżej niż Claude Fable 5 (77.2), używając przy tym mniej niż połowy output tokenów i kosztując jedną trzecią mniej. Na SWE-Bench Pro Sol osiąga 64.6%, co porównuje się z Claude Mythos 5 na 80.3% — więc nie jest to bezwzględne zwycięstwo wszędzie.

Nowe możliwości to przede wszystkim "ultra" mode — koordynacja czterech agentów równolegle w jednym requeście. OpenAI twierdzi, że to pozwala na szybsze i mocniejsze wyniki na trudnych zadaniach. W API dostępne jest też Programmatic Tool Calling — model może pisać i uruchamiać małe programy, które koordynują narzędzia i filtrują wyniki, zanim cokolwiek wróci do głównego modelu. To redukcja token usage dla tool-heavy workflows.

Cennik: Sol $5/$30 per milion tokenów (input/output), Terra $2.50/$15, Luna $1/$6. Dla porównania — to jest dużo taniej niż poprzednie modele tej klasy. Nowe też prompt caching: cache writes teraz kosztują 1.25x uncached rate, ale cache reads są nadal 90% taniej. Minimum cache life to 30 minut.

Co mnie niepokoi? Benchmark wars są coraz mniej informatywne. Każda firma dobiera benchmarki, na których wypada najlepiej, porównuje się z wybranymi konkurentami w wybranych konfiguracjach. GPT-5.6 Sol bije Claude Fable 5 na Agents' Last Exam o 13 punktów, ale Claude Mythos 5 bije GPT-5.6 Sol na SWE-Bench Pro o ponad 15 punktów. Która liczba jest "prawdziwa"? Zależy od tego, co robisz.

**Key takeaways:**
- GPT-5.6 to trzy modele: Sol (flagship), Terra (balanced), Luna (cost-efficient)
- Ultra mode: 4 równoległe agenty w jednym API call dla trudnych zadań
- Programmatic Tool Calling pozwala modelowi pisać in-memory programy do obsługi narzędzi
- Cennik: Sol $5/$30, Terra $2.50/$15, Luna $1/$6 per 1M tokenów
- Cache writes kosztują teraz 1.25x uncached rate, ale minimum cache life 30 minut
- Warto testować na własnych workloadach — benchmark numbers są kontekstowe

**Why do I care:** Dla mnie, jako kogoś pracującego z frontend architekturą, interesujące jest Programmatic Tool Calling i ultra mode. Jeśli budujemy systemy agentowe do code review, generowania dokumentacji czy automatyzacji testów, możliwość uruchamiania parallel subagentów w jednym API call to zmiana, która może upraszczać orchestrację. Nie trzeba już samemu zarządzać fan-out i fan-in. Warto przetestować na realnych workloadach zamiast polegać na benchmarkach OpenAI.

**Link:** [GPT-5.6: Frontier intelligence that scales with your ambition](https://openai.com/index/gpt-5-6/)

---

## Triggerowanie AI agenta przez email — AWS SES, Lambda i GitHub Actions

**TLDR:** David Wells opisuje pattern, gdzie wysłanie emaila wyzwala AI agenta, który tworzy GitHub issue i pull request. Pięć prostych komponentów, jeden elegancki interfejs.

**Summary:** Najtrudniejszy problem przy budowaniu automatyzacji to interfejs, przez który ją wyzwalamy. Dedykowane dashboardy wymagają otwarcia przeglądarki. CLI wymaga terminala. Slack wymaga znajomości slash commands. Email natomiast jest wszędzie — na telefonie, na tablecie, wbudowany w każdą aplikację przez share sheet.

David Wells zbudował system, który robi dokładnie to: email do `repo@twoja-domena.com` uruchamia AI agenta, który czyta temat i treść, identyfikuje repozytorium, tworzy GitHub issue i — jeśli task wymaga kodu — pull request. Flow jest prosty: SES odbiera mail, zapisuje surowy MIME do S3 i wywołuje Lambdę. Lambda weryfikuje nadawcę, parsuje email, triggeruje `repository_dispatch` w odpowiednim repo. GitHub Actions uruchamia Claude Code Action z treścią emaila jako promptem.

Kluczowy element, który Well podkreśla: weryfikacja nadawcy jest obowiązkowa. Email jest trywialnie spoofable. Bez sprawdzenia SPF, DKIM, DMARC i allowlisty, budujesz remote code execution vector z miłym interfejsem. SES na szczęście daje te verdicts gratis.

Interesujące jest też rozwiązanie problemu dopasowania repo z tematu emaila. Dyktowanie na telefonie zmienia "my-site" w "my site", "pdf-tools" w "PDF tools". Fuzzy matching z normalizacją myślników i case to właściwe rozwiązanie. Równie ważne: jeśli nie ma pewnego dopasowania, nic nie rób. Agent zgadujący repo jest gorszy niż brak agenta.

Co mnie tu niepokoi? Prompt jest treścią emaila — attacker-influenced text. Autor to przyznaje, ale rozwiązuje to przez allowlistę nadawców. To wystarczające tylko jeśli allowlista jest naprawdę restrykcyjna. GitHub Actions permissions są też istotne — `contents: write`, `pull-requests: write`, `issues: write` to minimum, ale nie ma tutaj auto-merge, co jest świadomą decyzją. Człowiek przegląda PR jak każdy inny contribution.

**Key takeaways:**
- Email jako interfejs do AI agenta: wysyłasz email, dostajesz GitHub issue i PR
- AWS SES jako inbound email receiver — mało znana funkcja SES
- Weryfikacja nadawcy (SPF, DKIM, DMARC + allowlista) jest obowiązkowa przed uruchomieniem agenta
- `repository_dispatch` pozwala zewnętrznemu systemowi triggerować GitHub Actions z arbitrary JSON payload
- Fuzzy matching nazw repo z tekstu emaila wymaga ostrożności przy niejednoznacznych dopasowaniach
- Pattern działa też dla: draftowania postów, triage bugów, summaryzacji wątków, badań

**Why do I care:** To jest praktyczna implementacja czegoś, o czym dużo się mówi abstrakcyjnie — "AI agenci w workflow developerskim". Tutaj jest konkretna architektura z konkretnymi narzędziami. Szczególnie doceniam podejście do security: nie zakłada, że treść emaila jest zaufana, wymaga weryfikacji przez kilka warstw. To jest wzorzec, który można stosować przy każdym zewnętrznym wejściu do systemu agentowego — nie tylko email.

**Link:** [Trigger an AI Agent by Sending an Email](https://davidwells.io/blog/trigger-an-ai-agent-with-an-email)

---

## React Suspense — kompletny przewodnik po granicach zawieszenia

**TLDR:** Oficjalna dokumentacja React Suspense pokrywa wszystkie przypadki użycia, od lazy loading przez streaming SSR po nowe eksperymentalne feature'y jak ViewTransition i defer prop. Warto przejrzeć nawet jeśli znasz Suspense od lat.

**Summary:** Suspense w React jest z nami od jakiegoś czasu, ale zakres tego co obsługuje regularnie zaskakuje — nawet doświadczonych developerów. Dokumentacja na react.dev to nie jest szybki tutorial, to kompletna specyfikacja i warto ją znać.

Podstawy są znane: `<Suspense fallback={<Loading />}>` otacza komponenty, które potrzebują danych, i pokazuje fallback dopóki dane nie są gotowe. Ale szczegóły są ważne. Suspense nie aktywuje się dla fetchowania wewnątrz Effect lub event handlera — tylko dla `lazy`, `use` z Promise, stylesheet z precedence, i streamowanego HTML. To jest częste nieporozumienie.

Bardziej zaawansowane scenariusze to koordynacja wielu komponentów — gdy wszystkie są pod jednym Suspense boundary, "pojawiają się" razem, a nie jeden po drugim. Zagnieżdżone boundaries pozwalają definiować sekwencję ładowania. Kombinacja `useDeferredValue` i Suspense pozwala pokazywać stale wyniki (przyciemnione) zamiast fallbacku podczas nowego fetcha. `startTransition` zapobiega ukrywaniu już wyświetlonej zawartości przy nawigacji.

Nowe, eksperymentalne feature'y to `defer` prop na Suspense boundary — React może pokazać fallback i renderować dzieci później nawet gdy nic nie suspenduje. To dla kosztownych renderów. `ViewTransition` integruje się z Suspense dla animacji podczas swapowania fallback/content, czekania na fonty i obrazy.

Dokumentacja zawiera też Streaming Server Rendering — Suspense jest podstawą mechanizmu, gdzie serwer wysyła HTML powłoki z fallbackami, a potem streamuje zawartość każdego boundary gdy jest gotowa.

Czego tu brakuje? Dokumentacja opisuje *co* i *jak*, ale mało *kiedy nie używać*. Nie każdy komponent potrzebuje Suspense boundary. Zbyt granularne boundaries prowadzą do skakania UI. Projektant powinien decydować gdzie są stany ładowania — to jest wskazówka z dokumentacji, którą naprawdę warto brać poważnie.

**Key takeaways:**
- Suspense nie aktywuje się dla fetcha w Effect/event handler — tylko dla `lazy`, `use(Promise)`, stylesheetów z precedence i streaming SSR
- Wszystkie komponenty pod jednym boundary "pojawiają się" razem — koordinacja intentionalna
- `useDeferredValue` + Suspense = stale wyniki podczas nowego fetcha zamiast skoku do fallbacku
- `startTransition` zapobiega ukrywaniu już widocznej zawartości przy nawigacji
- `key` prop na Suspense boundary resetuje ją przy nawigacji do innej strony
- `ViewTransition` (canary) animuje swap fallback/content i czeka na fonty i obrazy

**Why do I care:** Suspense to jeden z tych mechanizmów Reacta, który na pierwszy rzut oka jest prosty, ale ma dużo niuansów w praktyce. Wzorzec `useDeferredValue` + Suspense do pokazywania stale danych podczas nowego fetcha jest szczególnie użyteczny w aplikacjach z wyszukiwaniem — zamiast skakać do spinnera przy każdym keystroke, użytkownik widzi poprzednie wyniki lekko przyciemnione. To lepszy UX przy małym koszcie implementacji.

**Link:** [Suspense – React](https://react.dev/reference/react/Suspense)
