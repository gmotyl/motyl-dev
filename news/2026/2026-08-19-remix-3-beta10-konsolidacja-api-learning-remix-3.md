---
title: "Remix 3 beta.10 konsoliduje API, a społeczność uczy się nowego frameworka na żywym przykładzie"
excerpt: "Remix v3.0.0-beta.10 zbiera cztery poprzednie bety w jedno wydanie z kanonicznymi importami i pełnym HMR, a deweloper opisuje, jak przepisał demo znane z Solid 2.0 na nowy Remix, żeby zrozumieć jego wzorce nawigacji i mutacji."
publishedAt: "2026-08-19"
slug: "remix-3-beta10-konsolidacja-api-learning-remix-3"
hashtags: "#remixrun #react #webdev #generated #pl"
source_pattern: "Remix newsletter"
---

## Remix v3.0.0-beta.10 konsoliduje cztery bety w jedno wydanie

**TLDR:** Beta.10 zastępuje bety od .6 do .9 i wprowadza kanoniczne ścieżki importu zamiast rozproszonych aliasów pakietów, plus kompletny workflow bazy danych, w pełni zintegrowany hot module replacement i progresywne wzbogacanie nawigacji formularzy o zachowanie SPA.

**Summary:** Największa zmiana to porządkowanie importów. Zamiast osobnych pakietów jak `remix/auth-middleware` czy `remix/fetch-router`, wszystko grupuje się teraz pod wspólnymi ścieżkami: middleware pod `remix/middleware/*`, dialekty baz danych pod `remix/data-table/*`, adaptery storage pod `remix/file-storage/*` i `remix/session-storage/*`. To klasyczna migracja z płaskiej struktury pakietów do struktury hierarchicznej, którą wiele frameworków przechodzi po kilku betach, gdy okazuje się, że płaska lista nazw pakietów przestaje się skalować.

Obok reorganizacji importów pojawia się seria zmian łamiących kompatybilność, które same w sobie są dość drobne, ale razem pokazują, w którą stronę idzie projekt. `createAssetServer()` zamienia `allow`/`deny` na `allowFiles`/`denyFiles`, żeby zrobić miejsce na nowy `allowPackages`, który pozwala udostępnić cały pakiet i jego zależności bez wypisywania każdego pliku z osobna. Wzorce tras dostały jaśniejsze granice delimiterów, więc coś w rodzaju `/:year-:month` trzeba teraz zapisać jako jeden nierozdzielny parametr `/:date`, co eliminuje niejednoznaczne dopasowania i ogranicza ryzyko patologicznych wzorców tras.

Nowy `remix db` daje kompletny cykl życia lokalnej bazy danych, od `status` przez `migrate`, `seed` po `reset --force`, z konfiguracją w jednym pliku `remix.json`, wspólnym też dla `remix test` i `remix doctor`. Testy przechodzą z osobnego binarium `remix-test` na podkomendę `remix test`, z nowymi flagami `--only` i `--quiet`. Do tego dochodzi w pełni zintegrowany hot module replacement: `npm run hmr` w nowym projekcie przeładowuje moduły serwera i aktualizuje kompatybilne komponenty UI w miejscu, zachowując ich stan, przez standardowe `import.meta.hot`.

Ciekawy jest kierunek zmian w warstwie nawigacji UI. `run()` z `remix/ui` domyślnie fetchuje HTML ramki, więc aplikacje nie muszą już pisać własnego `resolveFrame`, żeby włączyć przeładowania ramek i nawigację po linkach oraz formularzach w obrębie tej samej domeny. Formularze progresywnie wzbogacają się w nawigacje ramkowe przez atrybuty `rmx-target`, `rmx-document` i `rmx-history`, a nowy `rmx-preserve-dom` chroni własne poddrzewa DOM, na przykład custom elements, przed przeładowaniem. To podejście, w którym HTML i atrybuty robią większość roboty, a JavaScript dogrywa tylko brakujące fragmenty, jest bardzo w duchu tego, co Remix reklamował od początku, tylko teraz doprowadzone do bardziej dojrzałej formy w wersji 3.

**Key takeaways:**
- Kanoniczne ścieżki importu (`remix/middleware/*`, `remix/data-table/*`) zastępują rozproszone aliasy pakietów z bet .6-.9
- Nowy `remix db` daje kompletny lifecycle lokalnej bazy: status, migrate, seed, reset, wspólnie konfigurowany w `remix.json`
- `remix test` zastępuje binarium `remix-test`, dochodzą flagi `--only` i `--quiet`
- Zintegrowany HMR (`npm run hmr`) przeładowuje serwer i komponenty UI w miejscu, zachowując stan
- `run()` z `remix/ui` domyślnie fetchuje HTML ramki, więc apki nie muszą pisać własnego `resolveFrame`

**Why do I care:** Reorganizacja importów w połowie serii bet to sygnał, że zespół Remiksa faktycznie zbiera feedback z wcześniejszych wersji zamiast trzymać się pierwotnego planu za wszelką cenę, co w praktyce oznacza więcej łamiących zmian teraz, ale prawdopodobnie stabilniejsze API na starcie 3.0. Dla kogoś, kto rozważa Remix 3 do nowego projektu, największym plusem jest tu `remix db` jako wbudowany workflow migracji, bo oszczędza wybór i konfigurację osobnego narzędzia jak Prisma Migrate czy Drizzle Kit na starcie projektu, choć oczywiście kosztem mniejszej elastyczności niż dedykowane ORM.

**Link:** [Release remix v3.0.0-beta.10](https://github.com/remix-run/remix/releases/tag/remix%403.0.0-beta.10)

## Ucząc się Remix 3 na żywym przykładzie z Solid 2.0

**TLDR:** Deweloper wziął demo aplikacji z popularnego posta o nowościach w Solid 2.0, przepisał je w Remix 3 i opisał, jak framework obsługuje setup projektu, ładowanie danych, nawigację, hydratację i mutacje optymistyczne w prostej przeglądarce zgłoszeń podobnej do Linear czy GitHub Projects.

**Summary:** Projekt jest budowany jako aplikacja "unbundled": zamiast Vite, Webpacka czy esbuilda, kod uruchamia się przez runtime'owy loader Node.js `remix/node-tsx`, który transpiluje TypeScript i TSX na żądanie, a zasoby przeglądarkowe serwuje `remix/assets` w momencie żądania. Remix wspiera też pracę z bundlerem, co bywa jedynym sposobem na wdrożenie na niektóre platformy jak Cloudflare, ale filozofia frameworka to bycie "religijnie runtime'owym", czyli niezależność od narzędzi budowania na każdym poziomie. Autor podkreśla, jak niewielki i prosty jest wynikowy `package.json`, co dla niego jest jednym z powodów, dla których lubi Remix jako framework z bateriami w zestawie.

Największą wartością tekstu jest to, że autor faktycznie zderza się z frameworkiem na żywym problemie, zamiast pisać kolejny tutorial "hello world". Struktura tekstu, od setupu projektu przez bazy danych i ładowanie danych, nawigację, hydratację, granice ładowania, mutacje, aż po optymistyczne liczniki i ogłaszanie widocznego zgłoszenia, pokazuje kompletną ścieżkę budowania realnej funkcji w Remix 3, nie tylko pojedynczy wzorzec wyrwany z kontekstu.

**Key takeaways:**
- Remix 3 wspiera architekturę "unbundled" z runtime'owym loaderem `remix/node-tsx` zamiast klasycznego bundlera
- `remix/assets` transpiluje i serwuje zasoby przeglądarkowe na żądanie, w czasie requestu
- Framework wspiera też pracę z bundlerem, wymaganą na platformach takich jak Cloudflare
- Tekst pokazuje kompletną ścieżkę: setup, dane, nawigacja, hydratacja, mutacje optymistyczne na jednym przykładzie

**Why do I care:** Uczenie się nowego frameworka przez przepisanie cudzego demo, zamiast przez dokumentację, to metoda, którą sam stosuję i polecam, bo zmusza do zmierzenia się z prawdziwymi decyzjami projektowymi, a nie tylko z hello worldem. Warto obserwować, jak eksperymentalne demo z ekosystemu Solid trafia jako punkt odniesienia do ekosystemu Remiksa, bo to dobry znak, że społeczności frameworków frontendowych w 2026 roku faktycznie się ze sobą komunikują, zamiast żyć w osobnych bańkach.

**Link:** [Learning Remix 3](https://malstrom.me/blog/learning-remix-3)
