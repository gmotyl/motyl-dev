---
title: "TypeScript 7.0, shadcn z Base UI, WebSocket w Next.js i inne nowości tygodnia"
excerpt: "TypeScript 7.0 napisany w Go przyspiesza kompilację 10x, shadcn zmienia domyślną bibliotekę komponentów na Base UI, Next.js planuje natywne WebSocket w Route Handlers, a ECMAScript 2026 oficjalnie zatwierdzony. Plus benchmarki React Native vs KMP i inżynierska architektura ChatGPT."
publishedAt: "2026-07-09"
slug: "this-week-in-react-289-typescript-7-shadcn-base-ui-websocket-nextjs"
hashtags: "#react #frontend #javascript #typescript #nextjs #reactnative #ecmascript #css #vite #thisweekinreact #pl"
source_pattern: "This Week In React"
---

## TypeScript 7.0: natywny port w Go, 10x szybszy kompilator

**TLDR:** Microsoft ogłosił TypeScript 7.0, przepisany całkowicie w Go. Kompilacja dużych projektów jest 8-12x szybsza, a środowisko edytora przestaje kulać przy wielkich codebases.

**Summary:** To nie jest kolejna drobna wersja TypeScriptu z kilkoma nowymi flag. TypeScript 7.0 to przepisanie całego kompilatora w Go, z wielowątkowością, lepszym zarządzaniem pamięcią i nową implementacją trybu watch. Liczby mówią same za siebie: build codebase'u VS Code spadł ze 125 sekund do 10, Sentry z 139 do 15, a Bluesky z 24 do 2,8 sekundy. Slack poinformował, że czas typecheckingu w CI skrócił się z 7,5 minut do 1,25 minuty. Inżynierowie z PowerBI opisali poprzedni serwer językowy jako "prawie nieużywalny" przy ich skali.

Architektura wielowątkowa działa przez podział pracy na niezależne "checker workers". Domyślnie TypeScript 7 tworzy 4 workery, ale można to skonfigurować flagą --checkers. Przy --checkers 8 VS Code kompiluje się w 7,5 sekundy zamiast 125. Nowy tryb watch oparty na parcelowym file watcherze (@parcel/watcher przepisanym do Go) jest znacznie stabilniejszy na wszystkich platformach.

Jest jedna istotna rzecz do odnotowania: TypeScript 7.0 nie ma API programistycznego. To oznacza, że narzędzia takie jak Volar (obsługa Vue, Svelte, Astro) nie mogą z niego korzystać. Typescript-eslint też wymaga specjalnego obejścia przez pakiet @typescript/typescript6. Projekty Vue, MDX i Astro muszą tymczasowo zostać na TypeScript 6.0 dla edytora. To bolesne ograniczenie, choć obiecuje się naprawę w 7.1.

Domyślnie strict jest teraz true, module to esnext, i zniknęło wsparcie dla moduleResolution: node, target: es5, baseUrl i innych archaicznych opcji. To breaking change, ale w praktyce każdy projekt, który trzymał te ustawienia w 2026, miał dług techniczny.

**Key takeaways:**
- Kompilacja 8-12x szybsza na dużych projektach
- Wielowątkowe type-checkery, konfigurowalne przez --checkers
- Nowy tryb watch oparty na @parcel/watcher przepisanym w Go
- Brak programistycznego API w 7.0, planowane na 7.1
- Vue/Svelte/Astro/Angular muszą zostać na TS 6.0 na razie
- strict: true, module: esnext i noUncheckedSideEffectImports jako nowe domyślne

**Why do I care:** Po roku słyszenia "TypeScript jest zbyt wolny do użycia z AI agentami" (bo każdy commit triggerował minuty CI) mamy rozwiązanie. To zmienia produktywność na poziomie organizacji. Każdy projekt powyżej 100k linii TypeScriptu odczuje różnicę natychmiast. Jedynym realnym problemem jest brak API, ale to tymczasowe.

**Link:** [Announcing TypeScript 7.0](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/)

---

## shadcn zmienia domyślną bibliotekę na Base UI

**TLDR:** shadcn/ui ogłosił, że Base UI staje się domyślną biblioteką komponentów przy inicjalizacji nowych projektów, zastępując Radix. Radix nie jest deprecjonowany, ale nowe projekty teraz domyślnie dostają Base UI.

**Summary:** Historia jest prosta: Base UI to nowa biblioteka od tych samych ludzi, którzy zbudowali Radix. Dostali drugi strzał, wiedząc wszystko co wiedzą teraz. Osiągnęła 1.6.0 i 6 milionów cotygodniowych pobrań. shadcn obserwował co robią użytkownicy i okazało się, że projekty tworzone przez shadcn/create wybierały Base UI nad Radix w stosunku 2:1. Ta decyzja już dawno podjęta przez społeczność.

Zmiana jest prosta: npx shadcn init domyślnie wybiera Base UI. Jeśli chcesz Radix, dodajesz flagę -b radix. Dokumentacja domyślnie pokazuje zakładkę Base UI. Istniejące projekty nie muszą niczego migrować. Radix nadal dostaje aktualizacje.

Interesujące jest to, jak shadcn podszedł do migracji. Zamiast zwykłego codemoda, stworzyli "skill" dla agentów kodowych. Migruje jeden komponent na raz, każdy commit, każdy komponent zostawia raport w .migration/. Mechaniczne zmiany (asChild zamienione na render) dzieje się automatycznie, zmiany zachowania są flagowane do ręcznej weryfikacji. Pełna migracja projektu 60+ komponentów zajęła 25 minut i ~10k tokenów na komponent.

Warto pamiętać, że "nie musisz migrować" to nie jest PR-owa gadka. shadcn nadal sam uruchamia Radix w produkcji i nie planuje migracji. To jest naprawdę decyzja "zacznij nowy projekt na Base UI".

**Key takeaways:**
- Base UI jest teraz domyślne przy npx shadcn init
- Radix nadal w pełni wspierany, zero deprecation
- Migracja dostępna przez skill dla agentów (Claude Code, Cursor)
- Migracja progresywna: jeden komponent na raz, z raportem
- Nowe projekty na shadcn/create wybierały Base UI 2:1

**Why do I care:** Jako architekt, cieszę się że shadcn formalizuje to co społeczność już zdecydowała. Base UI ma lepszą ergonomię API i jest aktywnie rozwijane. Migracja przez agenta kodowego to sensowne podejście do zmiany biblioteki komponentów, która z natury wymaga wiedzy o tym, co zmieniłeś w każdym komponencie.

**Link:** [July 2026 - Base UI as the Default](https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default)

---

## RFC: WebSocket w Next.js Route Handlers przez NextResponse.upgrade()

**TLDR:** Next.js ma RFC na pierwszorzędne wsparcie WebSocket w App Router Route Handlers. Propozycja opiera się na CrossWS i daje znajome API z obsługą cookies, nagłówków i uwierzytelniania przed akceptacją połączenia.

**Summary:** Przez lata WebSocket w Next.js wymagał pisania custom Node.js servera i rejestrowania własnych handlerów upgrade poza systemem routingu. To był hack. RFC proponuje NextResponse.upgrade() wewnątrz zwykłego route.ts, z callbackami open/message/close/error. Ważna właściwość: handler wykonuje się raz na handshake, uwierzytelnienie dzieje się przed akceptacją, cookies i nagłówki można ustawić w odpowiedzi na 101.

Biblioteka CrossWS jest bundlowana wewnątrz Next.js, więc nie trzeba jej instalować. Daje peer API z metodami send(), subscribe(), publish() co pozwala na pub/sub w obrębie jednego route. Domyślna izolacja jest po pathname, więc /chat/room1 i /chat/room2 mają osobne przestrzenie.

Są świadome ograniczenia: Edge runtime nie jest wspierany, brak kompresji per-message w pierwszej wersji, brak wyboru subprotokołu. Ważniejsze: połączenia nie przeżywają redeploymentów ani nie są zsynchronizowane między instancjami. Do cross-instance pub/sub trzeba zewnętrznego rozwiązania jak Redis. To jest oczekiwane przy stateless Node.js serverze.

Vercel WebSocket jest już w Public Beta. RFC definiuje jak adaptery mają to integrować. Adaptery, które nie mogą obsłużyć raw Node.js upgrade, mogą wyłączyć feature przez modifyConfig.

**Key takeaways:**
- NextResponse.upgrade() jako nowe API dla WebSocket w Route Handlers
- Handler wykonuje się raz na handshake, uwierzytelnienie przed akceptacją
- CrossWS bundlowany z Next.js, peer.subscribe()/publish() dla pub/sub
- Działa na next dev, next start, standalone, custom server
- Brak wsparcia Edge runtime, brak cross-instance synchronizacji

**Why do I care:** To rozwiązuje realny problem. Pisanie custom servera tylko dla WebSocket to dług architektoniczny, który odciąga od logiki aplikacji. API jest dobrze przemyślane, szczególnie że uwierzytelnienie dzieje się przed akceptacją połączenia. Pub/sub w ramach jednego route to dobry punkt startowy dla większości przypadków.

**Link:** [RFC: WebSocket Upgrades in Route Handlers · vercel/next.js · Discussion #95514](https://github.com/vercel/next.js/discussions/95514)

---

## Jak OpenAI zbudowało ChatGPT dla miliarda użytkowników

**TLDR:** Szczegółowa analiza techniczna architektury chatgpt.com: migracja z Next.js Pages Router przez Remix do React Router 7, streaming SSR, Tailwind, Radix, TanStack Query i 556 feature flagów inlinowanych w każdym dokumencie.

**Summary:** Artykuł Dennisa Brotzky'ego to rzadkie deep dive w architekturę aplikacji, które faktycznie skalują. ChatGPT zaczął jako prosta aplikacja Next.js 12 Pages Router w grudniu 2022. Przez 21 miesięcy nigdy nie przeszedł na App Router, co samo w sobie jest interesującym statement o dojrzałości App Routera w tamtym czasie. W sierpniu 2024 pojawiły się pierwsze eksperymenty z Remix, który finalnie stał się React Router 7 w framework mode z pełnym SSR.

Stack jest celowo nudny: React 19, React Router 7, TypeScript, TanStack Query, Tailwind CSS v4, Radix UI. Żadnych własnych frameworków, żadnych ekspermentów. Dokument ładowany bez konta ma 84 KB skompresowane i TTFB 50-65ms dzięki Cloudflare. Jedna z pierwszych rzeczy w head to skrypt theme selection z localStorage, identyczny pattern jak w innych analizowanych przez Brotzky'ego aplikacjach. Performance mierzony jest od pierwszego bajtu, z własnym systemem metryk.

Interesujące są feature flagi: 556 bramek ewaluowanych po stronie serwera i inlinowanych jako 377 KB JSON w każdym dokumencie. Nazwy flag są zahashowane żeby nie wyciekać roadmapy. Wśród flag są takie jak deferStartupImportsUntilComposerTTFI i promoteCss, które kontrolują samą strategię ładowania. To jest feature flagging na poziomie, który rzadko się widzi.

Kontrast z Claudem jest trafny: claude.ai to CSR SPA serwowane z CDN, bez serwera. Każdy użytkownik musi być zalogowany. OpenAI wybrało trudniejszą drogę, żeby usunąć każdą barierę przed pierwszym promptem.

**Key takeaways:**
- React Router 7 (framework mode, SSR) po migracji z Next.js przez Remix
- Tailwind CSS v4 z tokenami jako CSS variables dla motywów
- TanStack Query do zarządzania stanem po stronie klienta, seedowany przez serwer
- 556 feature flag ewaluowanych server-side, inlinowanych w HTML
- ProseMirror jako edytor, CodeMirror w blokach kodu w odpowiedziach
- Brak service workera, brak wirtualizacji listy wiadomości

**Why do I care:** Architektura ChatGPT jest dowodem, że "nudny stack" nie znaczy "słaby stack". Każda decyzja wynika z jednego ograniczenia: anonimowy użytkownik na nieznanym urządzeniu musi móc pisać w kilka sekund. Gdy masz tak jasno zdefiniowany cel, każda decyzja architektoniczna staje się oczywista.

**Link:** [Reverse Engineering ChatGPT Web: How OpenAI Built for a Billion Users](https://performance.dev/chatgpt)

---

## React Compiler w produkcji: co się zepsuło

**TLDR:** Szczegółowy raport z włączenia React Compiler 1.0 w istniejącym projekcie Next.js. Większość działa, ale biblioteki z "interior mutability" jak React Hook Form wymagają opt-out przez "use no memo".

**Summary:** Artykuł odpowiada na pytanie, które miała "ta druga połowa" społeczności Reacta, czyli ta która mówiła "poczekam, aż ktoś inny to sprawdzi". Ogólny wynik jest pozytywny, ale diabeł tkwi w szczegółach.

Najpoważniejszy problem to React Hook Form. Funkcja watch() zwraca wartości przez interior mutability, co jest sprzeczne z założeniami kompilatora o czystości. Efekt: live preview formy zamrozył się po włączeniu kompilatora. Formularz się submitował, walidacja działała, ale watchowane wartości przestały triggerować re-rendery. Workaround to wrapper hook z dyrektywą "use no memo".

Drugi problem to handler kliknięcia w bibliotece Chart.js, który musiał pozostać w useCallback. Kompilator sam z siebie nie jest tu winny, po prostu ujawnił timing issue który useCallback ukrywał przez stabilizację tożsamości funkcji. Chart.js rejestruje callbacki po referencji, nie przez React.

Odznaka "Memo ✨" w DevTools nie jest tym, czym się wydaje. Znaczy "kompilator ten komponent przetworzył", nie "optymalizacja się udała". Komponent który łamał regułę mutacji propa nadal miał odznakę. Tylko "use no memo" ją usuwa.

Zalecenie autora: tak, usuń useMemo i useCallback, ale stopniowo, z testami E2E, po audycie bibliotek trzecich stron z interior mutability. Zachowaj hooki gdy biblioteka zewnętrzna zależy na tożsamości funkcji lub gdy masz udowodniony performance hotspot z profilerów.

**Key takeaways:**
- React Hook Form (watch()) wymaga "use no memo" lub wrapper hooka
- Biblioteki Chart.js, canvas i inne rejestrujące callbacki po referencji: zachowaj useCallback
- Odznaka Memo w DevTools znaczy "przetworzony", nie "zoptymalizowany"
- Włącz najpierw reguły ESLint (eslint-plugin-react-hooks v7+), potem kompilator
- Sprawdź E2E testy, nie tylko unit testy

**Why do I care:** To jest uczciwy raport bez marketingowego lukru. Kompilator jest dobry, ale "Automatyczna memoizacja" to uproszczenie. Nadal musisz rozumieć granice między Reactem a bibliotekami imperatywnymi. Migracja produkcyjna wymaga świadomości ekosystemu.

**Link:** [I let React Compiler handle memoization: Here's what actually broke](https://blog.logrocket.com/react-compiler-memoization-what-actually-broke/)

---

## Ukryty koszt hydration mismatches i LCP

**TLDR:** Pojedynczy hydration mismatch na stronie może zniszczyć Largest Contentful Paint z zielonego na czerwony. Mechanizm jest nieoczywisty i wymaga zrozumienia trzech niezależnych faktów.

**Summary:** Ivan Akulov z 3perf.com opisuje problem, który widzi regularnie w produkcyjnych aplikacjach React. Hydration mismatch nie jest tylko komunikatem w konsoli, to potencjalnie katastrofa Core Web Vitals. Mechanizm łączy trzy rzeczy: remount DOM przy mismatch, zmianę rozmiaru tekstu przy załadowaniu web fontów, i sposób w jaki przeglądarka mierzy LCP tylko dla nowych węzłów DOM.

Gdy React napotka mismatch, remountuje całe drzewo od najbliższego Suspense boundary w górę. Jeśli nie ma Suspense, remountuje całą stronę. Gdy font się ładuje, tekst zmienia rozmiar. Przeglądarka ignoruje powiększenie istniejącego elementu w kontekście LCP, ale rejestruje nowy element od remountu. Jeśli remount następuje po załadowaniu fonta, LCP jest rejestrowane dopiero wtedy, często 5+ sekund po pierwszym renderze.

Rozwiązanie jest proste: napraw hydration mismatches. Jeśli nie możesz tego zrobić od razu, owiń element powodujący mismatch w Suspense. Wtedy tylko to drzewo będzie remountowane, nie cała strona.

**Key takeaways:**
- Hydration mismatch remountuje DOM od najbliższego Suspense boundary
- LCP mierzy tylko nowe węzły DOM, nie powiększenie istniejących
- Kombinacja: remount + zmiana rozmiaru fonta = LCP rejestrowane 5s+ po pierwszym renderze
- Rozwiązanie: napraw mismatche lub owijaj elementy w Suspense

**Why do I care:** To jest przykład problemu, który jest niewidoczny dopóki nie spojrzysz na Chrome trace na odpowiednim poziomie szczegółowości. Każdy kto robi SSR z web fontami powinien to przeczytać i sprawdzić swoje aplikacje w Lighthouse.

**Link:** [Hidden Cost of Hydration Mismatches](https://3perf.com/blog/hydration-mismatch/)

---

## ECMAScript 2026 zatwierdzony przez Ecma International

**TLDR:** 30 czerwca 2026 zatwierdzono ECMAScript 2026. Nowości: Array.fromAsync, Error.isError, Math.sumPrecise, Uint8Array do/z Base64, Iterator Sequencing, JSON.parse z dostępem do oryginalnego źródła, i Map.prototype.getOrInsert.

**Summary:** Corocznie Ecma zatwierdza nową wersję specyfikacji JavaScript i corocznie Paweł Grzybek pisze o tym najlepiej. Edycja 2026 jest bogatsza niż ostatnie lata.

Array.fromAsync to długo oczekiwane uzupełnienie dla asynchronicznych iteratorów. Przez lata jedyną opcją był for await...of pętla, bez statycznej metody pomocniczej. Error.isError jest bezpieczniejszą alternatywą dla instanceof Error, który może dawać fałszywe wyniki przy cross-realm obiektach. Math.sumPrecise eliminuje klasyczny problem z dokładnością zmiennoprzecinkową przy sumowaniu tablicy liczb: suma [1e20, 0.1, -1e20] przez reduce daje 0, przez Math.sumPrecise daje prawidłowe 0.1.

Natywna konwersja Uint8Array do Base64 i hex usuwa potrzebę bibliotek jak buffer czy base64-js w wielu projektach. Iterator.concat() zastępuje ręczne generatory do łączenia iteratorów. JSON.parse z dostępem do source text rozwiązuje problem BigInt w JSON. Map.getOrInsert to cukier składniowy, który eliminuje wzorzec if (!map.has(key)) { map.set(key, value) }.

**Key takeaways:**
- Array.fromAsync dla asynchronicznych iteratorów
- Error.isError jako bezpieczna alternatywa dla instanceof
- Math.sumPrecise poprawia precyzję zmiennoprzecinkową przy sumowaniu
- Uint8Array.toBase64() / fromBase64() nativnie
- Iterator.concat() do łączenia iteratorów
- Map.getOrInsert() eliminuje boilerplate

**Why do I care:** Math.sumPrecise i Error.isError to te dodatki, które usuwają realny boilerplate i edge-case'y z produkcyjnego kodu. Array.fromAsync jest spóźniony o kilka lat, ale lepiej późno niż wcale. Każdy z tych featurów zastępuje jeden zewnętrzny helper lub niebezpieczny pattern.

**Link:** [What's new in ECMAScript 2026](https://pawelgrzybek.com/whats-new-in-ecmascript-2026/)

---

## HTTP QUERY: nowa metoda HTTP zatwierdzana jako RFC

**TLDR:** RFC 10008 definiuje metodę HTTP QUERY, która łączy zalety GET (bezpieczna, idempotentna, keszowalna) z POST (przyjmuje body). To rozwiązanie dla złożonych zapytań, które nie mieszczą się w URL.

**Summary:** Problem z GET jest znany: URL ma ograniczoną długość, a niektóre zapytania są zbyt złożone żeby je zakodować w query string. Problem z POST w roli zapytań jest też znany: serwery i cachingi nie wiedzą, że POST jest bezpieczny i idempotentny. GraphQL od lat używa POST bo nie ma lepszej opcji.

QUERY rozwiązuje to strukturalnie. Metoda jest oznaczona jako safe (nie modyfikuje zasobów) i idempotent (można powtórzyć bez obaw). Może mieć body z zapytaniem. Odpowiedź jest keszowalna, klucz cache'a musi uwzględniać treść body. Serwer może opcjonalnie zwrócić Location z URI do "equivalent resource", co pozwala na późniejsze GET bez powtarzania body.

W praktyce: przeglądarka może automatycznie powtórzyć QUERY po przerwaniu połączenia (tak jak GET), cache może odpowiadać na kolejne identyczne QUERY bez odpytywania serwera, a narzędzia wiedzą że ta metoda jest bezpieczna. CORS wymaga preflight dla QUERY (podobnie jak dla metod nie-safelist), co trzeba wziąć pod uwagę.

**Key takeaways:**
- QUERY jest safe i idempotent, w odróżnieniu od POST
- Odpowiedź keszowalna, klucz cache uwzględnia body
- Opcjonalny Location header dla "equivalent resource" dostępnego przez GET
- Wymaga CORS preflight
- Dobre dla GraphQL, kompleksowych wyszukiwań, filtrowania

**Why do I care:** To jest formalizacja czegoś co społeczność robiła przez hackery z POST od dekady. GraphQL przełączy się na QUERY kiedy wsparcie przeglądarek dojrzeje. Dla API z kompleksowym filtrowaniem lub wyszukiwaniem to koniec dylematu "GET z body czy POST udający bezpieczną operację".

**Link:** [RFC 10008: The HTTP QUERY Method](https://www.rfc-editor.org/info/rfc10008)

---

## Vite+ beta: zunifikowany toolchain dla web

**TLDR:** VoidZero ogłosiło betę Vite+, jednego narzędzia łączącego Vite, Vitest, Rolldown, tsdown, Oxlint i Oxfmt. Instalacja przez vp create lub vp migrate dla istniejących projektów.

**Summary:** Vite+ to próba rozwiązania problemu, który każdy zna: konfiguracja toolchaina JavaScript to projekt sam w sobie. ESLint, Prettier, Vitest, Vite, tsc, każde z własną konfiguracją, każde z własną wersją, każde z potencjalnie niekompatybilnymi wersjami między sobą. VoidZero (firma za Vite i Evan You) postanowiło zebrać to razem.

Komendy są proste: vp dev, vp test, vp build, vp check (format + lint + typecheck), vp pack (bundlowanie bibliotek), vp run (task runner z cache'owaniem). Caching w vp run jest inteligentny: automatycznie śledzi dane wejściowe bez ręcznego listowania. To jest bezpośrednia odpowiedź na bolączki turbo i nx.

Już 1300+ publicznych repozytoriów używa vite-plus. Wśród nich vinext (Next.js-compatible framework na Vite), który też pojawia się w tym numerze newslettera. Projekt jest framework-agnostic, działa z React, Vue, Svelte, Angular.

Beta oznacza "stabilna ale nie kompletna". Brakuje Remote Caching dla vp run (planowane), wsparcia GitLab CI/CD, i część frameworków Vite jeszcze nie jest w pełni kompatybilna. Przed użyciem w produkcji warto przeczytać migration guide.

**Key takeaways:**
- Unified toolchain: Vite 8, Vitest, Rolldown, tsdown, Oxlint, Oxfmt
- vp create/migrate dla nowych i istniejących projektów
- Inteligentne cachowanie bez ręcznej konfiguracji
- Framework-agnostic, 1300+ repozytoriów w produkcji
- Remote Caching i GitLab CI/CD planowane przed 1.0

**Why do I care:** Toolchain sprawia ból każdemu, kto zakłada nowy projekt lub onboarduje nowego dewelopera. Jeśli Vite+ faktycznie działa tak jak obiecuje, to jest ogromne odciążenie dla małych i średnich zespołów. Opcja "assembly by hand" zawsze będzie dostępna, ale sensowne defaults mają wartość.

**Link:** [Announcing Vite+ Beta](https://voidzero.dev/posts/announcing-vite-plus-beta)

---

## Bezpieczeństwo łańcucha dostaw: staged publishing w nuqs

**TLDR:** Autor nuqs (100M pobrań all-time) opisuje jak zbudował 3-fazowy, 2FA-bramkowany proces publikacji do npm po ataku na pakiety TanStack w maju 2026.

**Summary:** 2026 to rok ataków na łańcuchy dostaw npm. Autor nuqs nie czekał aż coś mu się przytrafi. Po ataku na TanStack, gdzie napastnicy zatruili GitHub Actions cache, autor zatrzymał przyjmowanie zewnętrznych PR-ów i przeprowadził audyt bezpieczeństwa własnych workflows. Wynik był czysty, ale postanowił pójść dalej.

Model zagrożeń: co jeśli sam GitHub zostałby skompromitowany? Odpowiedź: staged publishing na npm. Zamiast bezpośredniego publikowania, paczka ląduje w "staging area" i czeka na 2FA-zatwierdzoną akcję od maintainera. Atak zostałby zatrzymany na tym etapie z notyfikacją e-mail.

Trzy fazy nowego procesu: (1) draft triggered ręcznie przez workflow_dispatch, który oblicza wersję, staguje na npm z provenance OIDC, tworzy draft GitHub release; (2) ręczna weryfikacja maintainera z reprodukowanym buildem lokalnie i 2FA approval; (3) finalizacja przez opublikowanie draft release, co triggeruje komentowanie issues i PR-ów.

Weryfikacja jest szczególnie elegancka: projekt ma reproducible builds, więc można lokalnie odtworzyć tarball przez Docker i porównać SHA-512 integrity hash z tym co jest na npm staging. Jeśli hash się zgadza, kod nie był modyfikowany przez GitHub Actions.

**Key takeaways:**
- npm staged publishing zatrzymuje ataki przed dotarciem do registry
- 2FA wymagana do approve i reject staged package
- Reproducible builds + integrity hash verification przed approval
- SHA-1 pinning dla wszystkich action dependencies (pinact)
- permissions scoping per-job, nie globalnie w workflow
- minimumReleaseAge w pnpm 11 daje czas registry scannerom

**Why do I care:** Jeśli publiujesz pakiety npm, ten artykuł to obowiązkowa lektura. Attack surface na npm jest ogromny i rośnie. Staged publishing z 2FA to minimalne zabezpieczenie które każdy maintainer popularnego pakietu powinien wdrożyć.

**Link:** [Staged publishing for supply-chain security | nuqs](https://nuqs.dev/blog/staged-publishing-for-supply-chain-security)

---

## CSS Anchor Positioning: tooltips i dropdowny bez JavaScript

**TLDR:** Josh Comeau opisuje CSS Anchor Positioning API, które pozwala przykleić element do innego bez JavaScript. Obsługuje automatyczne przepozycjonowanie przy overflow, już w Interop 2026.

**Summary:** Każdy kto implementował tooltip lub dropdown menu wie, że JavaScript do pozycjonowania to koszmar. Czy jest wystarczająco miejsca nad przyciskiem? Czy tooltip nie wychodzi poza viewport? Czy po przesunięciu strony dynamicznie zmienić stronę wyświetlania? Dotychczas to było kilkadziesiąt linii JavaScript i często biblioteka zewnętrzna.

CSS Anchor Positioning rozwiązuje to natywnie. Anchor element dostaje anchor-name (CSS dashed-ident, np. --my-button). Target element deklaruje position-anchor: --my-button i position-area: top. Przeglądarka automatycznie pozycjonuje target nad anchor. Przy overflow przeglądarka testuje fallbacks z position-try-fallbacks: bottom.

Poziom 2 API (Chromium, ale w Interop 2026) dodaje "anchored container queries", czyli możliwość zmiany stylów w zależności od tego, czy fallback jest aktywny. To rozwiązuje problem "caret tooltipa wskazuje zawsze w dół nawet gdy tooltip jest pod przyciskiem".

Kompatybilność jest dobra dla podstawowych przypadków (flip-block jest w każdej przeglądarce), gorsza dla zaawansowanej wersji z container queries (tylko Chromium póki co). Oddbird ma polyfill, ale z ograniczeniami.

**Key takeaways:**
- anchor-name na anchor elemencie, position-anchor + position-area na target
- position-try-fallbacks dla automatycznego flip przy overflow
- flip-block keyword jako skrót dla obrócenia w bloku
- Anchored container queries (Chromium) do zmiany stylów przy fallback
- Polyfill dostępny od Oddbird, bez wsparcia level 2

**Why do I care:** To jest jeden z tych featurów CSS który sprawi, że za rok spojrzę na stary kod tooltipów i powiem "po co to było tak skomplikowane". Przy Interop 2026 kompatybilność międzyprzeglądarkowa nadejdzie. Warto zrozumieć API już teraz.

**Link:** [Getting Started with Anchor Positioning](https://www.joshwcomeau.com/css/anchor-positioning/)

---

## Kotlin Multiplatform vs React Native: benchmark 2026

**TLDR:** Software Mansion zbudowała tę samą aplikację w KMP i React Native i zmierzyła rozmiar, czas startu, RAM i CPU. KMP wygrywa na Androidzie, React Native na iOS dla RAM. CPU w zasadzie remis.

**Summary:** To jest benchmark zrobiony porządnie: ta sama aplikacja, te same urządzenia, te same scenariusze, release builds. Wyniki są zniuansowane i przeciwne do prostych "X jest lepszy" narracji.

Na Androidzie KMP dominuje prawie w każdej kategorii. Rozmiar paczki: 2 MB vs 15,8 MB. Czas do pierwszej klatki: 2-4x szybszy. RAM: ~120 MB PSS vs ~220 MB. Wspólny mianownik: brak JavaScript runtime. Hermes, bundle JS, JSI bridge muszą się załadować przed pierwszą klatką i siedzą w pamięci przez cały czas życia aplikacji.

Na iOS obraz się odwraca dla RAM. React Native używa 44-131 MB, KMP 157-251 MB. Powód: React Native na iOS używa natywnego UIKit do renderowania, co oznacza zero overhead renderera. KMP natomiast używa Skiia renderer, który ma swoje bufory graficzne utrzymywane przez cały czas.

Na iOS czas startu jest prawie identyczny na nowoczesnym sprzęcie (iPhone 16, 17). Różnice są w granicach szumu pomiarowego. CPU jest niejasny: zbyt wrażliwy na szczegóły egzekucji testu żeby wyciągać wnioski.

Autorzy uczciwie zaznaczają, że to są baseline implementacje bez tuningowania pod produkcję, na celowo prostej aplikacji.

**Key takeaways:**
- Android: KMP wygrywa w rozmiarze, starcie i RAM dzięki brakowi JS runtime
- iOS RAM: React Native używa 3-4x mniej pamięci (UIKit vs Skia renderer)
- iOS czas startu: praktyczny remis na nowoczesnym sprzęcie
- CPU: niekonkluzywny, zbyt wrażliwy na warunki testu
- Wybór frameworka to też kwestia DX, ekosystemu i znajomości zespołu

**Why do I care:** Mam nadzieję, że ten benchmark zakończy część dyskusji "ale czy React Native jest wolny". Na iOS React Native jest często lżejszy pamięciowo niż alternatywa. Na Androidzie ma narzut JS runtime, który jest realny, ale zarządzalny. Żaden framework nie dominuje we wszystkim.

**Link:** [Kotlin Multiplatform vs React Native (2026 Benchmark)](https://swmansion.com/blog/we-built-the-same-app-in-kmp-and-react-native-here-s-what-we-found/)

---

## Sniffler: uruchamiaj tylko E2E testy dotknięte zmianą

**TLDR:** Callstack opublikował Sniffler, narzędzie analizujące graf zależności modułów i wybierające tylko te E2E testy, które mogą być dotknięte przez zmiany w kodzie.

**Summary:** Problem jest znajomy każdemu z dużą suitą E2E: każdy PR odpalał pełne testy, nawet jeśli zmieniłeś jeden plik CSS. Sniffler buduje graf importów/eksportów i śledzi jakie E2E testy zależą od zmienionych modułów.

Sprytność jest w obsłudze barrel files. Zamiast traktować każdego importera barrel file jako dotkniętego zmianą, Sniffler śledzi które eksporty są faktycznie używane. Zmiana jednego eksportu nie dotyka konsumentów innych eksportów z tego samego barrel.

Jest jeden element wymagający ręcznej pracy: test map. E2E testy nie importują modułów aplikacji bezpośrednio, interagują z uruchomioną aplikacją. Dlatego trzeba zdefiniować w konfiguracji które pliki są używane przez który test. To jest tradeoff: manualna praca kontra precyzja selekcji.

Sniffler działa z dowolnym test runnerm i dowolnym narzędziem przyjmującym listę plików. Ograniczenie: analizuje tylko JavaScript/TypeScript, nie kod natywny (Swift, Kotlin).

**Key takeaways:**
- Analiza grafu importów/eksportów zamiast prostego file-to-file matching
- Precyzja przez śledzenie eksportowanych encji przez barrel files
- Wymaga ręcznego test map (E2E testy nie importują modułów bezpośrednio)
- Działa z dowolnym narzędziem przyjmującym listę plików
- Tylko JavaScript/TypeScript, bez natywnego kodu

**Why do I care:** W świecie AI-assisted development gdzie PRy lądują wielokrotnie szybciej niż dotychczas, czas CI staje się kryterium produktywności. Sniffler rozwiązuje realny problem. Utrzymanie test map jest kosztem, ale dla dużych suit E2E to kosz wart poniesienia.

**Link:** [Introducing Sniffler: Run only the E2E tests your changes can affect](https://www.callstack.com/blog/introducing-sniffler-run-only-the-e2e-tests-your-changes-can-affect)

---

## Cloudflare Workers i Hyperdrive z TanStack Start

**TLDR:** Praktyczny tutorial łączenia TanStack Start z bazą danych przez Cloudflare Hyperdrive, który rozwiązuje problem zarówno wydajności połączeń jak i Cloudflare Workers execution model.

**Summary:** Cloudflare Workers mają specyficzny model wykonania: stateless, bez długotrwałych połączeń między requestami. Standardowy pattern tworzenia pool połączeń do bazy danych na poziomie modułu nie działa, bo Workers błędnie długo żyjące zasoby I/O.

Hyperdrive to rozwiązanie Cloudflare: connection pooler jako usługa, który zarządza połączeniami TCP i prezentuje aplikacji prosty connection string. Dzięki temu każde Worker "otwiera" połączenie przez Hyperdrive (szybkie), a Hyperdrive reużywa faktyczne połączenia TCP do bazy.

Drugi problem: jak tworzyć db per-request zamiast per-module. TanStack Start ma global request middleware, które pozwala stworzyć db object raz na request i przekazać przez context. Drizzle ORM z getDb(pool) pattern elegancko rozwiązuje wzajemne zależności.

Bonus z artykułu: ważność pinowania regionu. Zapytanie do bazy w us-east-1 z Workerem w us-west miało latency 80ms, z Workerem w tym samym regionie: 7ms. Cloudflare umożliwia to przez placement: { region: "aws:us-east-1" } w Wrangler.

**Key takeaways:**
- Cloudflare Workers nie mogą mieć długotrwałych zasobów I/O między requestami
- Hyperdrive to connection pooler jako usługa, eliminuje cold-start TCP overhead
- Pattern: db object tworzony per-request w middleware, przekazywany przez context
- Pinowanie regionu do tego samego co baza danych eliminuje cross-region latency
- env.HYPERDRIVE.connectionString dla połączenia do Hyperdrive

**Why do I care:** Cloudflare Workers to świetna platforma dla edge deploymentu, ale wymaga innego myślenia o połączeniach do bazy. Ten artykuł to dokładnie ta dokumentacja której brakuje w oficjalnych materiałach. Latency w tym samym regionie vs cross-region to 10x różnica, której nie można zignorować.

**Link:** [Cloudflare Workers and Hyperdrive with TanStack Start](https://master.dev/blog/cloudflare-workers-and-hyperdrive-with-tanstack-start/)
