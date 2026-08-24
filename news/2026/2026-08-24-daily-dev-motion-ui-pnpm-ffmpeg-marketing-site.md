---
title: "Motion UI dla shadcn, marketingowa strona bez nowoczesnego stacku, pnpm bez pełnej reresolucji i FFmpeg 9 dla Fluttera"
excerpt: "Cztery tematy z daily.dev: biblioteka animacji Motion UI oparta na shadcn, Laravel jako fundament szybkiej strony marketingowej, przyspieszone instalacje w pnpm 11.21-11.22 oraz FFmpeg-Kit-Extended zaktualizowany do FFmpeg 9.0.1."
publishedAt: "2026-08-24"
slug: "daily-dev-motion-ui-pnpm-ffmpeg-marketing-site"
hashtags: "#dailydev #react #shadcn #performance #laravel #pnpm #nodejs #cicd #flutter #react-native #generated #pl"
source_pattern: "daily.dev"
---

## Motion UI: animacje dla shadcn z oceną wpływu na wydajność

**TLDR:** Motion UI to nowa biblioteka gotowych, animowanych komponentów React wydana w ramach Motion+, zbudowana na tokenach designu shadcn i oceniana skalą MotionScore od S do F pod kątem wpływu na potok renderowania przeglądarki.

**Summary:** Pomysł jest prosty: zamiast kolejnej biblioteki animacji obok twojego design systemu, Motion UI wchodzi w istniejący system przez tokeny shadcn, więc dziedziczy kolory, promienie zaokrągleń i fonty projektu automatycznie. Instalacja odbywa się przez CLI shadcn (`npx shadcn@latest add @motion/hero-parallax-layers`), przez wbudowany prompt AI o nazwie Adapt with AI, albo przez Motion AI Kit MCP, co sugeruje, że autorzy od razu projektowali to pod agentowe workflow, nie tylko pod ręczne kopiowanie komponentów. Ciekawszy jest mechanizm MotionScore: każdy komponent dostaje ocenę od S do F w zależności od tego, czy animacja korzysta wyłącznie z kompozytora (S) czy wymusza ponowne malowanie (C), a Motion UI deklaruje, że nigdy nie wysyła komponentów ocenionych na D albo F. To pierwszy raz, kiedy widzę bibliotekę animacji, która sama się ocenia pod kątem kosztu wydajnościowego zamiast zostawiać to deweloperowi do zmierzenia post factum.

Cała konfiguracja globalnego stylu animacji siedzi w jednym pliku `motion.theme.ts` z pięcioma nazwanymi przejściami: snap dla natychmiastowej reakcji, ui dla menu i odsłon, gentle dla dużych powierzchni, lively dla momentów celebracyjnych i ambient dla ciągłego ruchu w tle. Każde domyślnie opiera się na sprężynie fizycznej, ale można je podmienić na własne sprężyny albo klasyczne easing oparte na czasie, a edycja jednego pliku retunuje od razu wszystkie zainstalowane sekcje na stronie. Wsparcie dla reduced motion jest wbudowane: ustawienie `reducedMotion` na `calm` usuwa transformacje, zachowując tylko przenikanie opacity.

**Key takeaways:**
- Motion UI dziedziczy tokeny designu z shadcn, więc komponenty automatycznie pasują do istniejącego motywu strony.
- MotionScore ocenia każdy komponent w skali S-F na podstawie wpływu na potok renderowania; biblioteka nie wysyła komponentów ocenionych D lub F.
- Jeden plik `motion.theme.ts` z pięcioma nazwanymi przejściami pozwala retunować animacje całej strony naraz.
- Instalacja wspiera trzy ścieżki: CLI shadcn, prompt AI (Adapt with AI) oraz Motion AI Kit MCP dla instalacji sterowanej agentem.

**Why do I care:** Jako architekt frontendu najbardziej podoba mi się właśnie MotionScore, bo to pierwszy przypadek, kiedy widzę wbudowany, mierzalny budżet wydajnościowy dla animacji zamiast gołosłownej obietnicy „to jest płynne”. Jeśli faktycznie żadna komponenta nie schodzi poniżej C, to jest to argument, którego mogę użyć w code review zamiast subiektywnej oceny „wygląda dobrze na moim laptopie”. Integracja z MCP to sygnał, że producenci bibliotek UI już zakładają, że część adopcji będzie szła przez agentów kodujących, a nie przez człowieka czytającego dokumentację, co warto mieć na radarze przy wyborze narzędzi dla zespołu.

**Link:** [Introducing Motion UI](https://daily.dev/posts/AzsyaVrza)

---

## Nowoczesna strona marketingowa bez nowoczesnego stacku frontendowego

**TLDR:** Zespół zbudował publiczną stronę marketingową Laravela w tej samej aplikacji co produkt, bez CDN, bez domeny na assety, bez SPA i bez CMS, uzyskując payload strony publicznej na poziomie 17,4KB po kompresji.

**Summary:** Sztuczka polega na dwóch osobnych wejściach budowania Vite, które gwarantują, że strona marketingowa nigdy nie wysyła buildu React produktu do przeglądarki odwiedzającego. Widoki publiczne to zwykłe Blade w tej samej aplikacji Laravela co panel produktu, a treść żyje w Postgresie przez Eloquent i Filament zamiast w Markdown albo headless CMS. Ponieważ strona marketingowa dzieli sesję z produktem, teoretycznie można by personalizować treść po stronie serwera bez dodawania żadnej nowej infrastruktury, co jest ciekawym efektem ubocznym trzymania obu rzeczy razem zamiast rozdzielania ich na osobne repozytoria i osobne deploye.

Najciekawszy fragment dla mnie to historia o wyniku 100 w Lighthouse dla dostępności, który okazał się fałszywy: współdzielony token koloru miał kontrast 4,47:1, tuż poniżej progu WCAG AA wynoszącego 4,5, a wykrył to dopiero test odczytujący wysłany CSS i faktycznie kompozytujący przezroczyste kolory przed pomiarem kontrastu, nie sam Lighthouse. To dobra ilustracja tego, jak automatyczne narzędzia audytowe potrafią dać fałszywe poczucie bezpieczeństwa, jeśli nie sprawdzają realnie wyrenderowanych wartości. Ślad wydajności przy ograniczonym CPU pokazał też coś śmiesznego i prawdziwego zarazem: rozszerzenia przeglądarki jak Wappalyzer czy AdBlock zużywają więcej czasu głównego wątku niż cała reszta strony razem wzięta.

**Key takeaways:**
- Dwa osobne wejścia budowania Vite oddzielają bundle marketingowy od buildu React produktu, mimo wspólnego repozytorium i wspólnej sesji.
- Payload strony publicznej wynosi 17,4KB po kompresji, bez CDN, CMS ani SPA.
- Wynik 100 w Lighthouse dla dostępności był błędny; realny test złapał kontrast 4,47:1 poniżej progu WCAG AA 4,5.
- Rozszerzenia przeglądarki (Wappalyzer, AdBlock) zużywały w profilowaniu więcej czasu głównego wątku niż cała strona.

**Why do I care:** To dobre przypomnienie, że „nowoczesny stack” i „szybka strona” to nie synonimy, a czasem są ze sobą w konflikcie. Trzymanie strony marketingowej w tej samej aplikacji co produkt bywa krytykowane jako sprzeczne z separacją odpowiedzialności, ale tutaj daje realną korzyść: wspólną sesję za darmo i mniejszy payload, bo nie trzeba ładować frameworka SPA tam, gdzie wystarczy statyczny HTML z odrobiną Blade. Historia z fałszywym wynikiem Lighthouse to konkretny argument, żeby nie traktować automatycznych audytów jako ostatecznego dowodu zgodności z WCAG, tylko jako pierwsze przybliżenie, które trzeba zweryfikować testem czytającym realnie wysłane style.

**Link:** [A modern marketing site without a modern front-end stack](https://daily.dev/posts/ckC8LRK9s)

---

## pnpm 11.21 i 11.22: mniej pełnych reresolucji i bezpieczniejsze zależności Git

**TLDR:** Nowe wersje pnpm aktualizują lockfile w miejscu przy rutynowych zmianach zależności zamiast reresolvować cały graf, naprawiają rozwiązywanie zależności Git tak, by nie zapisywały URL-i SSH bez wyraźnej prośby, i blokują projektom zmienianie ścieżek stanu pnpm na poziomie maszyny przez `pnpm-workspace.yaml`.

**Summary:** Pierwsza zmiana dotyczy codziennej pracy: usunięcie zależności, dodanie wersji już obecnej w lockfile, przeniesienie zależności między `dependencies` i `devDependencies`, rozszerzenie spełnionego zakresu wersji czy edycja `patchedDependencies` teraz aktualizują lockfile lokalnie, bez pełnej reresolucji i bez rundy do rejestru. Zmiany, które faktycznie mogłyby wpłynąć na wynik rozwiązywania zależności, jak edycja peer dependency albo zmiana dist tagu, nadal wywołują pełną reresolucję, więc to nie jest cięcie bezpieczeństwa, tylko rozpoznanie, które operacje są z natury bezpieczne do zrobienia lokalnie.

Druga zmiana naprawia realny, denerwujący problem z CI: starsze wersje pnpm zapisywały URL-e zależności Git jako SSH w lockfile, kiedy tylko specyfikator mógł się tak rozwiązać, co psuło instalacje na runnerach bez kluczy SSH z błędem `Permission denied (publickey)`. Od pnpm 11.21 resolver Git zapisuje SSH tylko wtedy, gdy specyfikator wprost o to prosi, a skrócone zapisy jak `github:owner/repo` rozwiązują się i zapisują przez HTTPS. Lockfile napisany przed 11.21 naprawia się przez `pnpm update <package>`. Trzecia zmiana to bezpieczeństwo w drugą stronę: ustawienia jak `bin`, `configDir`, `stateDir` czy `pnpmHomeDir` są teraz ignorowane, jeśli ktoś ustawi je w `pnpm-workspace.yaml` sklonowanego repozytorium, z ostrzeżeniem w konsoli, co ma sens jako obrona przed nieufnymi repo próbującymi przekierować globalny stan pnpm gdzie indziej na twojej maszynie.

**Key takeaways:**
- Rutynowe zmiany zależności (usunięcie, przeniesienie między sekcjami, edycja patcha) aktualizują lockfile lokalnie bez pełnej reresolucji.
- Resolver Git zapisuje URL SSH tylko na wyraźne żądanie specyfikatora, co naprawia awarie CI na runnerach bez kluczy SSH.
- Stare lockfile z problemem SSH naprawia komenda `pnpm update <package>`.
- Ustawienia stanu globalnego pnpm (`bin`, `configDir`, `stateDir` itd.) w `pnpm-workspace.yaml` sklonowanego repo są od teraz ignorowane z ostrzeżeniem, jako ochrona przed nieufnymi repozytoriami.

**Why do I care:** Zmiana dotycząca lockfile w miejscu to konkretne, mierzalne przyspieszenie CI dla zespołów robiących dużo drobnych zmian zależności dziennie, bez żadnej zmiany w workflow z naszej strony. Naprawa rozwiązywania Git jest tym rodzajem buga, który potrafi zżerać godziny debugowania na „ale u mnie działa”, więc dobrze, że ktoś w końcu przyjrzał się temu, kiedy dokładnie SSH jest faktycznie potrzebny. Blokada nadpisywania stanu globalnego przez `pnpm-workspace.yaml` to mały, ale konkretny krok w stronę traktowania klonowanego repozytorium jako potencjalnie nieufnego wejścia, co powinno być domyślnym założeniem przy pracy z kodem open source albo kodem od kontrahentów.

**Link:** [pnpm 11.21-11.22](https://daily.dev/posts/SAmUtLmgG)

---

## FFmpeg-Kit-Extended na FFmpeg 9.0.1: nowe dekodery i akceleracja GPU dla Fluttera i React Native

**TLDR:** FFmpegKit Extended, wrapper udostępniający FFmpeg, FFprobe i FFplay aplikacjom Flutter i React Native, przeszedł z FFmpeg 8.1.2 na FFmpeg 9.0.1 „Lei”, dodając między innymi dekoder animowanego WebP, rotację na CUDA, akcelerację Vulkan dla wideo 360 stopni i domyślną weryfikację certyfikatów TLS.

**Summary:** Aktualizacja podnosi wersje ABI głównych bibliotek (libavcodec 63, libavformat 63 i tak dalej) i odblokowuje nowe możliwości FFmpeg 9 przez istniejącą składnię poleceń, bez potrzeby uczenia się nowego API. Na liście nowości jest dekoder i demuxer animowanego WebP, `transpose_cuda` do rotacji wideo na GPU przez CUDA, `v360_vulkan` do akcelerowanej Vulkanem obróbki wideo 360 stopni, konwersja klatek AMD AMF, backend DNN oparty na ONNX Runtime do przetwarzania wspomaganego AI, splitter Dolby Vision Profile 7, dekodowanie HE-AAC 960 i DAB+, akceleracja ProRes RAW przez VideoToolbox, akceleracja APV przez Vulkan oraz obsługa metadanych HDR SMPTE ST 2094-50. Do tego dochodzi enkoder i muxer wideo dla Playdate, co jest miłym, niszowym dodatkiem dla kogoś budującego coś na tę konkretną konsolkę.

FFmpeg 9.0.1 wnosi też sporo poprawek stabilności, bezpieczeństwa i poprawności w WebP, MPEG-TS, MOV, DASH, HLS, RTSP oraz dekoderach sprzętowych i obsłudze TLS/OpenSSL. Jedna zmiana zachowania zasługuje na osobną uwagę: FFmpeg 9 domyślnie włącza weryfikację certyfikatów peer TLS, więc aplikacje korzystające z HTTPS, HLS czy zdalnych URL-i mediów powinny przetestować obsługę certyfikatów podczas migracji, bo coś, co wcześniej cicho przechodziło z niepoprawnym certyfikatem, teraz może zacząć zwracać błąd. Dostępność konkretnych funkcji zależy od wybranej konfiguracji builda: Base, Audio, Video, Video+Hardware albo Full.

**Key takeaways:**
- FFmpegKit Extended przeszedł z FFmpeg 8.1.2 na 9.0.1, podnosząc główne wersje ABI bibliotek jak libavcodec i libavformat.
- Nowości obejmują dekoder animowanego WebP, akcelerację GPU przez CUDA i Vulkan, backend DNN na ONNX Runtime oraz wsparcie Dolby Vision Profile 7.
- FFmpeg 9 domyślnie włącza weryfikację certyfikatów TLS, co może zmienić zachowanie aplikacji korzystających z HTTPS/HLS przy migracji.
- Dostępność funkcji zależy od wybranej konfiguracji builda (Base, Audio, Video, Video+Hardware, Full).

**Why do I care:** Dla zespołów robiących przetwarzanie wideo w Flutterze czy React Native to solidna aktualizacja, ale ta jedna zmiana z domyślną weryfikacją certyfikatów TLS jest właśnie tym typem detalu, który potrafi wysadzić produkcję po cichej aktualizacji zależności, jeśli ktoś testował tylko szczęśliwą ścieżkę. Zanim zaktualizujesz tę bibliotekę w projekcie z realnym ruchem HLS czy streamingiem z zewnętrznych URL-i, warto celowo przetestować scenariusz z niepoprawnym albo samopodpisanym certyfikatem, bo dokładnie tam ta zmiana się ujawni, a nie w standardowym demo na dobrze skonfigurowanym CDN.

**Link:** [FFmpeg-Kit-Extended Upgraded to FFmpeg 9.0.1](https://daily.dev/posts/A0jqGORFN)
