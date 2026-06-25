---
title: "Amazon MCP dla Fire TV, starter CLI agentów i JSON Schema z nakładkami — daily.dev 25.06.2026"
excerpt: "Przegląd pięciu artykułów z daily.dev: narzędzia AI dla programistów Amazon Devices, starter template do budowy CLI agentów oparty na Mozaik, JSON Schema z mechanizmem overlays, oraz refleksje na temat architektury agentów i budowy własnego narzędzia CVE."
publishedAt: "2026-06-25"
slug: "daily-dev-amazon-mcp-cli-agents-json-schema-overlays-2026-06-25"
hashtags: "#dailydev #typescript #ai #agents #jsonschema #openapi #mcp #cve #generated #pl"
source_pattern: "daily.dev"
---

## Amazon Devices Builder Tools: MCP Server dla deweloperów Fire TV

**TLDR:** Amazon udostępniło pakiet npm `@amazon-devices/amazon-devices-buildertools-mcp`, który instaluje serwer MCP wraz z zestawem Agent Skills dla asystentów AI takich jak Cursor, Kiro czy Claude Code. Narzędzie integruje się z Vega OS, czyli systemem operacyjnym napędzającym Fire TV, i dostarcza agentom kontekstu niezbędnego do pracy z SDK.

Idea jest prosta: zamiast karmić asystenta AI ogólnymi informacjami o React Native i liczyć, że sam domyśli się specyfiki Fire TV, instalujesz jeden pakiet i twój agent dostaje dedykowane narzędzia, dokumentację oraz gotowe przepływy pracy. Jedno polecenie `npx -y @amazon-devices/amazon-devices-buildertools-mcp@latest init-context` konfiguruje wszystko, wybierając agenta i ścieżki instalacji w trybie interaktywnym lub z flagami dla CI/CD.

Serwer MCP dostarcza narzędzia takie jak `analyze_perfetto_traces` do diagnostyki wydajności TTFF i TTFD, `symbolicate_acr` do analizy crashów, czy `search_documentation` wyszukujące po dokumentacji developer.amazon.com. Agent Skills to pliki SKILL.md opisujące konkretne przepływy: `amazon-devices-vega-focus-management` dla D-Pad, `amazon-devices-vega-media-player` dla playbacku audio/wideo, i kilka innych. Skills uruchamiają się automatycznie, gdy prompt użytkownika pasuje do metadanych danego skilla.

Warto odnotować podejście do prywatności: narzędzie działa lokalnie, nie wysyła kodu ani promptów do Amazon. Jedynym wyjątkiem są zapytania do wyszukiwarki dokumentacji, które trafiają na serwery Amazon. Telemetria jest anonimowa i można ją wyłączyć. To uczciwe podejście w porównaniu z wieloma komercyjnymi narzędziami, które zbierają wszystko bez pytania.

**Key takeaways:**
- Pakiet instaluje serwer MCP i Agent Skills jednym poleceniem, wspiera Cursor, Kiro, Claude Code, GitHub Copilot i inne.
- Dostarczone narzędzia MCP obejmują analizę śladów Perfetto, symbolikację crashów i przeszukiwanie dokumentacji.
- Narzędzie nie zbiera kodu źródłowego ani promptów, działa lokalnie na maszynie dewelopera.

**Why do I care:** Jeśli budujesz aplikacje na Fire TV, to jest to konkretny przykład, jak Amazon opakowuje swoją dokumentację i narzędzia diagnostyczne w format MCP. Patrząc na to z perspektywy architekta, to dobry wzorzec do naśladowania: zamiast pisać rozbudowane README, tworzysz skills i narzędzia, które agent może wywołać bezpośrednio. Mam nadzieję, że więcej platform pójdzie tą drogą, bo to znacznie lepsza ergonomia niż zmuszanie agenta do parsowania HTML dokumentacji.

**Link:** [Set Up Amazon Devices Builder Tools for AI-Powered Development](https://fandf.co/4eulAbg)

---

## jigjoy-ai/cli-agent-starter: Starter Template dla CLI Agentów z Mozaik

**TLDR:** Repozytorium `cli-agent-starter` to gotowy szablon do budowy terminalowych agentów AI opartych na frameworku Mozaik. Kombinuje Ink (biblioteka React do TUI) z `@mozaik-ai/core`, tworząc reaktywną architekturę zdarzeniową, w której ludzie, agenci i obserwatorzy współdzielą jedno środowisko.

Framework Mozaik opiera się na konceptach `AgenticEnvironment`, `BaseAgent`, `BaseObserver` i `BaseHuman`. Środowisko jest wspólnym bus-em zdarzeń, do którego dołączają uczestnicy. Eventy są rozgłaszane do subskrybentów bez centralnego schedulera, co pozwala na kompozycję reaktywnych zachowań. W praktyce: użytkownik pisze wiadomość, `BaseHuman` wysyła ją do środowiska, `TerminalAgent` odbiera, wywołuje OpenAI, ewentualnie uruchamia narzędzie, a `UIUpdater` jako obserwator aktualizuje UI w Ink.

Architektura celowo oddziela UI od wnioskowania modelu. `App.tsx` w Ink nie wywołuje OpenAI bezpośrednio, tylko `session.send(message)`, które trafia do agenta. Obserwator `UIUpdater` nasłuchuje na eventy asystenta i narzędzi w środowisku, potem przez callbacki aktualizuje stan Ink. To clean separation of concerns, który ułatwia testowanie i rozszerzanie. Chcesz dodać drugi agent? Dołączasz go do tego samego `AgenticEnvironment` i obserwujesz cross-agent traffic przez handlery `onExternal*`.

Starter wymaga Node.js 16+, klucza OpenAI i jest gotowy do uruchomienia po `npm install` i ustawieniu `.env`. Używa `Gpt54` z paczki `@mozaik-ai/core` i `OpenAIInferenceRunner`, co sugeruje, że framework ma własne abstrakcje nad modelami.

**Key takeaways:**
- Mozaik definiuje środowisko wieloagentowe bez centralnego schedulera, zdarzenia rozchodzą się do subskrybentów reaktywnie.
- UI w Ink jest oddzielone od logiki agenta przez `AgenticEnvironment`, co upraszcza testowanie i rozbudowę.
- Starter to punkt startowy, który można rozszerzyć o kolejnych agentów, narzędzia i obserwatorów dołączając ich do wspólnego środowiska.

**Why do I care:** Mozaik to framework, o którym wcześniej nie słyszałem, więc traktuję to jako sygnał, że przestrzeń narzędzi do budowy agentów nadal się fragmentaryzuje. Architektura środowiska zdarzeniowego bez centralnego schedulera jest interesująca, ale martwi mnie potencjalny overhead przy debugowaniu przepływów przez event bus zamiast jawnych wywołań. Dla małych agentów CLI to może być przerost formy nad treścią, ale przy wielu agentach i obserwatorach ta architektura ma sens.

**Link:** [GitHub - jigjoy-ai/cli-agent-starter](https://github.com/jigjoy-ai/cli-agent-starter)

---

## Standalone JSON Schemas z Mechanizmem Overlays

**TLDR:** Artykuł omawia koncepcję standaloneowych schematów JSON, które można nakładać na siebie za pomocą mechanizmu OpenAPI Overlays. Zamiast jednego monolitycznego schematu obsługującego wszystkie warianty API, masz bazowy schemat i zestaw nakładek dostosowujących go do konkretnych kontekstów.

Klasyczny problem z OpenAPI jest taki, że jeden produkt API często musi mówić różnymi językami: wewnętrzny SDK, publiczna dokumentacja, walidacja webhooków, generowanie klientów. Każdy z tych kontekstów wymaga nieco innego kształtu schematu. Do tej pory rozwiązania były nieeleganckie: kopiowanie pliku i ręczna synchronizacja, albo jeden schema z wieloma opcjonalnymi polami, które nic nie znaczą dla konkretnego konsumenta.

OpenAPI Overlays to mechanizm nakładania się na bazowy dokument OpenAPI przez JSONPath-based operacje dodawania, usuwania i zastępowania elementów. Idea z artykułu idzie krok dalej: sam schemat JSON jest standalone, a overlaye są przypisane do konkretnych przypadków użycia. Jeden produkt API może mieć cztery "języki" ekspresji przez cztery różne nakładki na ten sam bazowy JSON Schema.

To eleganckie rozwiązanie, choć wymaga dyscypliny zespołu: nakładki muszą być traktowane jako pierwszorzędne artefakty, nie jako afterthought do bazowego schematu. Jeśli bazowy schema się zmienia, trzeba sprawdzić czy nakładki nadal mają sens. Narzędziowanie wokół tego jest jeszcze młode, ale kierunek jest właściwy.

**Key takeaways:**
- JSON Schema może istnieć niezależnie od OpenAPI i być "nakładany" przez mechanizm Overlays dla różnych kontekstów.
- Jeden bazowy schema + wiele overlays zamiast kopiowania i ręcznej synchronizacji wielu plików.
- Overlays operują na dokumencie przez JSONPath, pozwalając dodawać, usuwać i zastępować dowolne elementy.

**Why do I care:** Pracuję z OpenAPI regularnie i problem wielu wariantów schematu jest realny. Overlays są wciąż niszowe, ale widzę potencjał zwłaszcza przy generowaniu SDK i dokumentacji z jednego źródła prawdy. Kluczowe pytanie to toolchain support: czy `redocly`, `swagger-codegen` czy `openapi-generator` obsługują overlays jako first-class input? Bez tego to teoria, nie praktyka.

**Link:** [Standalone JSON Schemas, Overlaid for Every Purpose](https://daily.dev/posts/bNhnSyrZz)

---

## Jak Domain-Driven Design Zmienił Moje Podejście do Architektury AI Agentów

**TLDR:** Miodrag Vilotijević opisuje, jak zastosowanie zasad Domain-Driven Design do projektowania agentów AI zmieniło jego podejście: zamiast budować agentów wokół możliwości modelu, zaczął projektować ich wokół ograniczonego kontekstu domeny biznesowej.

Klasyczna pułapka przy budowie agentów AI to projektowanie "od środka": masz model, dajesz mu narzędzia i czekasz co z tego wyjdzie. DDD proponuje odwrotny kierunek: zdefiniuj bounded context, ubiquitous language i agregaty, a dopiero potem zdecyduj, które z nich wymaga autonomicznego agenta, a które to zwykłe wywołanie serwisu.

Praktyczne konsekwencje są znaczące. Jeśli twój agent ma ubiquitous language swojej domeny w systemowym prompcie, rzadziej popełnia błędy semantyczne, bo model rozumie kontekst tak samo jak ekspert domenowy. Bounded context wyznacza też granice odpowiedzialności agenta, co przekłada się na prostsze testowanie: agent zamówień nie powinien wiedzieć nic o płatnościach, tak jak serwis zamówień w czystym DDD.

Autor przyznaje, że to wymaga więcej pracy upfront: musisz przeprowadzić event storming, zidentyfikować agregaty, zrozumieć domenę zanim zaczniesz kodować. Ale efekt jest wart wysiłku, szczególnie gdy system agentów rośnie i zaczyna mieć problemy z koordynacją i odpowiedzialnością.

**Key takeaways:**
- Projektowanie agentów wokół bounded context DDD redukuje błędy semantyczne i upraszcza podejście do testowania.
- Ubiquitous language w systemowym prompcie agenta sprawia, że model rozumie domenę tak samo jak ekspert.
- Granice odpowiedzialności z DDD naturalnie przekładają się na izolację agentów w systemie multi-agent.

**Why do I care:** To jest jeden z tych artykułów, gdzie ktoś bierze sprawdzony wzorzec z software engineeringu i stosuje go tam, gdzie nikt wcześniej nie pomyślał. Mam pewne doświadczenie z DDD i widzę, że ta analogia jest niemal perfekcyjna: agent z jasnym bounded context jest testowalny, przewidywalny i łatwiejszy do debugowania. Znacznie lepsza architektura niż jeden "super agent" z pięćdziesięcioma narzędziami.

**Link:** [How Domain-Driven Design Changed My Approach to AI Agent Architecture](https://daily.dev/posts/QMjav9UBA)

---

## Zbuduj Własne Narzędzie CVE: Mniej Wysiłku Niż Myślisz

**TLDR:** Autor z ITNEXT opisuje, jak zbudował własny harness do śledzenia CVE zamiast polegać na gotowych narzędziach. Okazuje się, że APIs takie jak NIST NVD czy OSV.dev są wystarczająco dobre, by w kilka godzin zbudować coś dopasowanego do własnych potrzeb.

Gotowe narzędzia do zarządzania podatnościami często mają jedną z dwóch wad: albo są darmowe ale generyczne i dają za dużo szumu, albo są enterprise i kosztują majątek za funkcje, których i tak nie używasz. Autor postanowił zbudować własny pipeline, który odpyta API NVD o CVE dla konkretnych pakietów z jego projektu, odfiltruje szum i wyśle mu raport w formacie, który ma sens dla jego workflow.

Kluczowe API to NIST NVD (National Vulnerability Database) i OSV.dev od Google. Oba mają bezpłatne dostępy, rozsądne rate limity i JSON-owe responses, które nie wymagają zbyt dużo parsowania. NVD daje szczegółowe dane o CVE z CVSS scores, OSV.dev jest lepszy dla open-source pakietów i obsługuje wiele ekosystemów.

Cała implementacja to kilkaset linii kodu. Autor przyznaje, że spędził więcej czasu na zrozumieniu struktury danych CVE niż na samym kodowaniu. Harness nie zastąpi pełnego SAST, ale dla small teams bez budżetu na Snyk czy Dependabot Enterprise to pragmatyczne rozwiązanie.

**Key takeaways:**
- NIST NVD i OSV.dev mają darmowe API z JSON responses, wystarczające do budowy własnego narzędzia CVE.
- Custom harness pozwala odfiltrować szum i dostosować format raportów do własnego workflow.
- Implementacja nie wymaga tygodni pracy, kilka godzin wystarczy na działający proof of concept.

**Why do I care:** Zgadzam się z główną tezą: nie wszystko musi być enterprise toolem. Jeśli twój projekt ma konkretne zależności i dobrze rozumiesz swój threat model, własny skrypt odpytujący NVD może być lepszy niż ogólne narzędzie dające ci setki alertów, które i tak ignorujesz. Na plus: nauka, jak działają CVE i CVSS to wiedza, która zwraca się wielokrotnie w codziennej pracy z bezpieczeństwem.

**Link:** [I need a CVE tool, it took me much less effort to build correctly](https://daily.dev/posts/QutS2dJQW)
