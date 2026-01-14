---
title: "Rundka: Bare runtime, React dla dwóch komputerów, Waku API routes, luka w React Routerze i Safari 18.4"
excerpt: "Podsumowanie technicznych nowości: lekki runtime Bare, refleksje o React Server Components, API routes w Waku, krytyczna luka w React Router + Remix oraz przegląd nowości WebKit/Safari 18.4."
publishedAt: "2025-04-11"
slug: "bare-react-two-computers-waku-react-router-safari-18-4"
hashtags: "#generated #pl #react #typescript #frontend #ai #architecture #nodejs #deno #react-router #remix #security #webdev #performance"
---

## Bytes #383 - Barenaked Runtimes
**TLDR:** Krótka, błyskotliwa notka o Bare — minimalistycznym runtime JS — oraz kilka linków i obserwacji z ekosystemu (w tym wzmianki o React i Waku). Autor celebruje prostotę Bare, ale ton tekstu bywa lekko ironiczny i nie analizuje głębiej konsekwencji adopcji takiego podejścia.

**Summary:**
Redakcyjny kawałek w formie newslettera przypomina, że nowe runtime'y nie zawsze konkurują funkcjonalnością — czasem oferują inną filozofię: minimalizm i kompozycję. Bytes wyróżnia Bare jako „IKEA runtime”, czyli prosty zestaw narzędzi, z którego składa się środowisko według potrzeb. W skrócie: Bare dąży do małej powierzchni standardu i promuje modułową kompozycję bibliotek zamiast ogromnego standard library.

Artykuł serwuje też szybkie notki o innych rzeczach w ekosystemie — wzmianka o tekście o React for Two Computers, o dużej aktualizacji Waku oraz o narzędziach AI dla deweloperów. Ton jest lekko sarkastyczny i lizboński — fajne do czytania, ale nie zastępuje głębszej analizy.

Co autor pomija: rzadko poruszony jest aspekt bezpieczeństwa i kompatybilności takiego minimalistycznego podejścia w dłuższej skali. „Dajemy Ci tylko część rzeczy” brzmi świetnie, dopóki nie trzeba utrzymywać setek drobnych modułów z niejednolitymi API w produkcji.

Dla architektów/zespołów: spojrzenie warto traktować jako sygnał — rozważenie Bare ma sens, jeśli naprawdę potrzebujesz tight embedding (np. mobile, IoT, P2P). Jeśli budujesz klasyczną aplikację serwerową lub ekosystem korporacyjny, koszty integracji i utrzymania mogą przeważyć korzyści.

**Key takeaways:**
- Bare promuje minimalistyczny, modularny model runtime, z małą warstwą standardową.
- To dobre podejście dla embeddingu na urządzeniach mobilnych i scenariuszy peer-to-peer.
- Brak standardowej biblioteki wymaga silnej dyscypliny w doborze i utrzymaniu modułów.

**Tradeoffs:**
- Gain: większa kontrola i lżejszy footprint. But sacrifice: wyższe koszty integracji i utrzymania zależności niż z monolitycznym runtime.
- Decision to keep stdlib tiny means freedom to compose but at the cost of fragmentation and potential compatibility headaches.

**Link:** [Bytes #383 - Barenaked Runtimes](https://bytes.dev/archives/383)

---

## Bare | Fast, Lightweight Runtime for Modular JavaScript Apps
**TLDR:** Bare to lekki, modularny runtime JavaScript zaprojektowany pod embedding i cross-device execution — stawia na minimalny core i moduły dostarczane oddzielnie, z obsługą wielu silników JS i interoperacyjnością CJS/ESM.

**Summary:**
Projekt Bare proponuje alternatywę wobec Node.js/Deno/Bun: zamiast jednego dużego środowiska otrzymujesz minimalny rdzeń i zestaw małych, specjalizowanych modułów (np. bare-fs, bare-http1). To podejście ma sens tam, gdzie wymagane jest uruchamianie tego samego kodu na telefonie, desktopie i wbudowanych systemach — czyli scenariusze „write once, run anywhere” w praktycznym znaczeniu. Bare abstraktuje silnik JS (V8, JSC, QuickJS) poprzez warstwę I/O (libuv, libjs), co daje przenośność.

Autorzy mocno podkreślają ESM & CommonJS interop, oddzielenie biblioteki standardowej od runtime oraz modułowy sposób aktualizacji. To eliminuje typowe „upgrade anxiety”: możesz aktualizować tylko te moduły, których API używasz, zamiast migrować cały stack. Dla niektórych zespołów to firewall chroniący przed masową refaktoryzacją przy aktualizacjach runtime.

Co jednak pozostaje w tle i co warto kwestionować: autorska wizja modułowości przesuwa odpowiedzialność na zespół. Kto decyduje o kompatybilności między wieloma małymi modułami? Jak wygląda polityka bezpieczeństwa i cyklu życia tych modułów? Dokumentacja i ergonomia instalacji mają tu kluczowe znaczenie — minimalistyczność ładnie wygląda w demo, gorzej gdy trzeba zbudować produkcyjny system z trzema różnymi implementacjami fs i kilkoma wersjami TLS.

Dla architektów/zespołów: Bare może być świetny tam, gdzie zależy wam na oszczędności zasobów, przenośności i deterministycznym czasie działania (np. aplikacje P2P, CLI z mobilnym embeddingiem). W projektach enterprise rozważcie upfront politykę zarządzania modułami, security review i strategię aktualizacji — bo koszt operacyjny spada tylko jeśli macie procesy, które go kontrolują.

**Key takeaways:**
- Bare oferuje minimalny runtime + modularne, opcjonalne „builtin” moduły.
- Obsługa wielu silników JS i ESM/CJS interop ułatwia portowanie i migracje.
- Minimalizm zmienia koszty — mniej „framework bloat”, więcej odpowiedzialności za składniki.

**Tradeoffs:**
- Gain: niska waga i łatwość embedowania na wielu platformach, ale sacrifice: konieczność większej discipline w zarządzaniu modułami i politykach bezpieczeństwa.
- Decision to separate stdlib means easier upgrades for parts, at the cost of ecosystem fragmentation and potential version skew.

**Link:** [Bare — Fast, Lightweight Runtime](https://bare.pears.com)

---

## React for Two Computers — overreacted
**TLDR:** Tekst to uzupełnienie wystąpienia o React Server Components — rozważa różnice między tagami a wywołaniami funkcji i stawia pytania o intuicje, modele mentalne i granice języków deklaratywnych vs. imperatywnych.

**Summary:**
Autor opisuje własny proces twórczy i jak postawa „zapisania myśli” przerodziła się w wykład, a dopiero potem w notatki. Główna myśl kręci się wokół fundamentów: czym jest tag (np. HTML) vs. czym jest wywołanie funkcji — i jakie intuicje te formy niosą. To przydatne rozważanie, bo React stale balansuje między deklaratywnością a imperative limbs (np. hooks i efekty), a Server Components jeszcze przesuwają granice tego, co dzieje się po stronie serwera.

Autor rozkłada na części pojęcia takie jak „recipes” i „blueprints” — czyli jak myślimy o komponentach i o tym, co wpisać w markup vs. co obliczyć. To nie jest krótka instrukcja, to raczej filozoficzna mapa pojęć, która pomaga zrozumieć, dlaczego pewne API Reacta zachęcają do innego stylu projektowania.

Co brakuje w tekście: praktyczne przewodniki migracji i realne przypadki, w których Server Components oszczędzają albo komplikują architekturę. Autor częściej eksploruje intuicje niż twarde kompromisy — a zespołom produkcyjnym potrzebne są także reguły decyzyjne i anti-patterny. Nie usłyszysz tu checklisty „kiedy użyć Server Components”, tylko głębsze pytania o projektowanie.

Dla architektów/zespołów: warto zyskać tę mentalną mapę — zespół lepiej zaprojektuje granice między UI po stronie klienta a logiką serwera, unikając niepotrzebnego przesyłania stanu. Ustalcie konwencje: które komponenty są „blueprints” (statyczne, markup) a które „recipes” (operacje, efekty), i komunikujcie je w code review, by zachować spójność.

**Key takeaways:**
- Rozróżnienie tag vs. function pomaga uświadomić projektowe konsekwencje użycia Server Components.
- Tekst to więcej metafizyki niż gotowych recept — cenna perspektywa, ale brakuje praktycznych reguł.
- Dla zespołu: ustalanie konwencji i granic komponentów jest krytyczne przy adopcji Server Components.

**Tradeoffs:**
- Using Server Components can reduce client bundle size but sacrifices some client-side interactivity flexibility unless carefully designed.

**Link:** [React for Two Computers — overreacted](https://overreacted.io/react-for-two-computers/)

---

## Announcing API routes — Waku
**TLDR:** Waku v0.22 dodaje obsługę API routes, czyli prosty sposób tworzenia publicznych endpointów w projektach Waku — cel: ułatwić formularze, webhooki, integracje z LLM i standardowe REST/GraphQL use cases w kontekście frameworka skoncentrowanego na Server Components.

**Summary:**
Waku, minimalny framework Reactowy przystosowany do świata Server Components, wprowadza API routes jako odpowiedź na potrzebę publicznych endpointów. Różnica między server actions (dawne wewnętrzne operacje) a API routes jest jasna: server actions służą do komunikacji wewnątrz aplikacji, a API routes są dostępne z zewnątrz — do formularzy, webhooków, integracji z zewnętrznymi systemami i LLM.

Model plikowy jest prosty i znajomy: pliki w ./src/pages/api mapują się na ścieżki /api/*, a funkcje eksportowane według nazw metod HTTP obsługują żądania. To ergonomiczne i zgodne z modelem przyjętym w innych meta-frameworkach, co zmniejsza koszty poznawcze dla deweloperów.

W artykule pokazano też przykład wywołania z komponentu klienta przy użyciu fetch — typowy scenariusz. Autorzy kładą nacisk na praktyczność: API routes ułatwią implementację common backend tasks bez potrzeby oddzielnego serwisu.

Co nie zostało wystarczająco omówione: routowanie autoryzacji i ochrona endpointów przed nadużyciami (rate limiting, validation), warstwy observability i testy integracyjne. W świecie publicznych endpointów to nie są drobne rzeczy — to rdzeń operacyjny. Dokumentacja powinna dostarczyć wzorce zabezpieczeń i integracji z mechanizmami monitoringu.

Dla architektów/zespołów: API routes w Waku mogą skrócić czas dostarczenia prostych backendowych funkcji i zmniejszyć liczbę repozytoriów. Jednak w większych organizacjach warto od razu zdefiniować polityki bezpieczeństwa, testowania i deploymentu tych endpointów — zwłaszcza gdy będą wykorzystywane przez LLM lub przyjmować webhooks od zewnętrznych systemów.

**Key takeaways:**
- Waku v0.22 wprowadza API routes dla publicznych endpointów, ułatwiając integracje i formularze.
- Plikowy model routingu jest prosty i zgodny z innymi meta-frameworkami.
- Należy od razu zaplanować zabezpieczenia, walidację i monitoring tych endpointów.

**Tradeoffs:**
- Gain: szybkie wdrożenie endpointów w tym samym projekcie frontendowym, but sacrifice: potencjalne zatarcie granic odpowiedzialności i skalowalności w większych organizacjach (monolityczny wzrost).

**Link:** [Announcing API routes — Waku](https://waku.gg/blog/api-routes)

---

## React Router and the Remix’ed path
**TLDR:** Badanie ujawnia poważną lukę (CVE-2025-31137) w integracji React Router z Express adapterem używanym przez Remix, pozwalającą na manipulację URL przez nagłówki Host/X-Forwarded-Host i narażającą na ataki typu cache poisoning i eskalacje.

**Summary:**
Autorzy przeprowadzili dogłębną analizę Remix i w trakcie natrafili na problem nie w Remix per se, lecz w React Router 7 używanym z Express adapterem. Istotnym odkryciem jest wpływ parametru _data w URL, który może zmienić sposób traktowania żądania jako zapytania o dane i zwracać różne odpowiedzi JSON zależne od wartości tego parametru. Ta zmienność bez odpowiedniego cache-control umożliwia atak typu CPDoS (cache poisoning Denial of Service) poprzez manipulację cache'ami i CDN-ami.

Raport pokazuje kilka wektorów ataku: od nasycenia cache nieprawidłowymi odpowiedziami przez manipulację parametrem _data, po wykorzystanie nieprawidłowego parsowania nagłówków Host/X-Forwarded-Host w Express adapterze React Router, co może prowadzić do eskalacji i obejścia reguł WAF. To konkretna, dobrze udokumentowana klasa błędów, która ma realne skutki w produkcji.

Co w ocenie badających mogło być lepiej: autorzy skupili się na exploitach i ścieżkach ataku, lecz warto też przedstawić praktyczne, natychmiastowe remedia dla zespołów — checklistę ustawień serwera, reguł nagłówków, polityk cache i rekomendowane wersje bibliotek. W tekście są dowody i ścieżki, ale operacyjne wytyczne mogłyby być bardziej rozbudowane.

Dla architektów/zespołów: priorytet to sprawdzić stos react-router/remix/express w swoich aplikacjach, zweryfikować polityki cache/CDN i ograniczyć możliwość manipulacji headerami (normalize/validate Host i X-Forwarded-*), dodać testy bezpieczeństwa pod kątem nieoczekiwanych wartości _data oraz szybko zaktualizować biblioteki zgodnie z advisory.

**Key takeaways:**
- Odkryto krytyczny problem, umożliwiający manipulację URL i cache poisoning w pewnych konfiguracjach React Router + Express.
- Parametr _data pozwala na wymuszanie różnych zachowań serwera, co przy odpowiedniej konfiguracji cache może prowadzić do CPDoS.
- Zespoły powinny przejrzeć polityki nagłówków, cache/CDN i natychmiast zastosować dostępne poprawki.

**Tradeoffs:**
- Gain: użycie adapterów i elastycznych routingów ułatwia development, but sacrifice: zwiększa powierzchnię ataku jeśli adaptery nie walidują nagłówków i parametrów.

**Link:** [React Router and the Remix’ed path](https://zhero-web-sec.github.io/research-and-things/react-router-and-the-remixed-path)

---

## WebKit Features in Safari 18.4
**TLDR:** Safari 18.4 przynosi 84 nowych funkcji i 184 naprawione błędy; kluczowe dodatki obejmują Declarative Web Push, nowe CSS (shape()), ulepszenia HTML color picker, nowe Web APIs i liczne poprawki wydajności oraz kompatybilności.

**Summary:**
WebKit w wersji odpowiadającej Safari 18.4 skupia się na dopieszczaniu istniejących funkcji i poprawianiu kompatybilności. Najistotniejsze zmiany to wprowadzenie Declarative Web Push — nowego mechanizmu do wysyłania powiadomień Web Push w sposób bardziej deklaratywny, co jest odpowiedzią na historyczne wyzwania dotyczące prywatności i zużycia energii. Dodatkowo pojawiają się nowe możliwości CSS (m.in. shape()), rozszerzenia w HTML color picker oraz ulepszenia w media APIs, Web Inspectorze i Web Extensions.

W praktyce oznacza to, że pewne dotychczasowe workarounds przestaną być potrzebne, a deweloperzy frontendowi powinni ponownie przetestować swoje aplikacje. Apple podkreśla, że wiele pracy poszło w poprawę jakości i zgodności z większą liczbą przypadków brzegowych — co jest dobre dla stabilności ekosystemu, ale może też zmieniać priorytety implementacji cross-browser.

Co autor pominął: wpływ tych zmian na strategię progressive enhancement i fallbacky w starszych przeglądarkach — chociaż WebKit zachęca do testowania, to deweloperzy korporacyjni potrzebują granularnych matryc, kiedy można bezpiecznie porzucić polyfille. Również warto dodać konkretne porównania z innymi przeglądarkami w zakresie nowości (czy to jest unikalne, czy zbliżone do możliwości w Chrome/Firefox).

Dla architektów/zespołów: zaplanujcie testy regresyjne na Safari 18.4, szczególnie jeśli korzystacie z Web Push, złożonych CSS shapes, mediów i Web Extensions. Upewnijcie się, że wasze polyfille i fallbacks nadal działają i że korzystacie z możliwości deklaratywnych tam, gdzie redukuje to koszt po stronie serwera lub klienta.

**Key takeaways:**
- Safari 18.4 to duża paczka poprawek i kilku istotnych nowych API (m.in. Declarative Web Push).
- Poprawiona jakość i kompatybilność może zmniejszyć potrzebę niektórych workaroundów.
- Konieczne są testy regresyjne i przegląd fallbacków dla starszych przeglądarek.

**Tradeoffs:**
- Gain: lepsze, bardziej deklaratywne API i większa kompatybilność. But sacrifice: potrzebne zasoby na ponowne testy i aktualizacje aplikacji, by wykorzystać nowe możliwości.

**Link:** [WebKit Features in Safari 18.4](https://webkit.org/blog/16574/webkit-features-in-safari-18-4/)

---

**Disclaimer:** This article was generated using [newsletter-ai](https://github.com/gmotyl/newsletter-ai) powered by gpt-5-mini LLM. While we strive for accuracy, please verify critical information independently.
