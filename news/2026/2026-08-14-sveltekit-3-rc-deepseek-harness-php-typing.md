---
title: "SvelteKit 3 RC, agent DeepSeeka i powrót typów w PHP"
excerpt: "Przegląd tygodnia z daily.dev: SvelteKit 3 wchodzi w fazę RC z migracją na Vite 8, DeepSeek wypuszcza własny agent harness, a ekosystem Vite/Oxlint przyspiesza kosztem Rollupa i ESLinta."
publishedAt: "2026-08-14"
slug: "sveltekit-3-rc-deepseek-harness-php-typing"
hashtags: "#dailydev #typescript #vite #ai #frontend #generated #pl"
---

## SvelteKit 3 wchodzi w fazę Release Candidate

**TLDR:** SvelteKit 3 doczekał się RC z całą listą breaking changes względem SvelteKita 2, ale zespół dorzucił narzędzie `sv migrate`, które odwala większość roboty za nas. Konfiguracja przenosi się do `vite.config.ts`, `$lib` znika na rzecz natywnych subpath imports, a shallow routing przechodzi pod `goto`.

Zmian jest sporo i część z nich wygląda na porządki, które od dawna wisiały w powietrzu. Konfigurację trzeba teraz trzymać w `vite.config.ts` zamiast w osobnym pliku Svelte'a, co ma sens, skoro i tak większość projektów żyje w Vite. Ciekawszy jest ruch z aliasem `$lib`: zamiast własnego mechanizmu, SvelteKit korzysta teraz z natywnych subpath imports z Node.js, obsługiwanych już przez Vite i TypeScript. Efekt uboczny jest taki, że importy muszą być jednoznaczne, więc zamiast `#lib/foo` trzeba pisać `#lib/foo.ts` albo `#lib/foo/index.ts`. Trochę więcej pisania, ale mniej magii pod spodem, a to zwykle wygrywa w dłuższej perspektywie. Do tego dochodzi wymóg Vite 8 z Rolldown pod maską, co ma przyspieszyć budowanie, choć FetchableDevEnvironment z nowego Vite Environment API nie jest jeszcze wspierane. Remote functions, testowane od roku, wciąż mają status eksperymentalny, ale zespół otwarcie mówi, że to przyszłość komunikacji klient-serwer w Svelte.

**Key takeaways:**
- Migrację odpalasz komendą `npx sv@next migrate sveltekit-3 --tasks all --confirm`, a to, czego narzędzie nie ogarnie, ląduje na liście TODO.
- `$lib` znika na rzecz subpath imports z jednoznacznymi rozszerzeniami plików.
- Wymagany jest Vite 8 i Svelte 5, więc to nie jest aktualizacja na jedno popołudnie w starszych projektach.

**Why do I care:** Jako ktoś, kto regularnie ogląda migracje frameworków od środka, cenię sobie to, że SvelteKit od razu daje narzędzie migracyjne zamiast rzucać listą breaking changes i życzeniem powodzenia. To pokazuje dojrzałość projektu. Z drugiej strony wymuszenie Vite 8 i Svelte 5 sprawia, że firmy z zamrożonymi zależnościami odczują ten skok mocniej niż standardowy minor. Jeśli macie w planach większy refactor frontendu, to dobry moment, żeby przy okazji przesiąść się na SvelteKit 3, zamiast robić to później pod presją.

**Link:** [The SvelteKit 3 Release Candidate is here](https://daily.dev/posts/LooTBlLps)

## DeepSeek wypuszcza własny agent harness

**TLDR:** DeepSeek AI opublikował dsh (DeepSeek Harness), open-source'owy agent harness w wersji v0.1 developer preview, zbudowany na frameworku Cordis z paradygmatem "spatiotemporal composability". Da się go odpalić przez `npx` albo zbudować lokalnie z Node.js i pnpm, a całość ma lokalny Web UI.

Nazwa "spatiotemporal composability" brzmi jak coś wyjęte z pracy naukowej, ale w praktyce chodzi o to, że pluginy można podmieniać zarówno strukturalnie, jak i w czasie działania systemu. To ciekawy kierunek, bo większość agent harnessów, które widziałem, traktuje pluginy jako coś statycznego, ustalanego raz na starcie procesu. Tutaj DeepSeek stawia na elastyczność, co w teorii ułatwia eksperymentowanie z różnymi konfiguracjami agenta bez restartów. Sam fakt, że firma znana głównie z modeli językowych wchodzi też w warstwę narzędziową wokół agentów, wpisuje się w trend, gdzie każdy większy gracz AI chce mieć własny stack od modelu po runtime.

**Key takeaways:**
- dsh to open-source, oparty na frameworku Cordis, z pluginami wymiennymi w locie.
- Instalacja i test to jedna komenda `npx`, pełny build wymaga Node.js i pnpm.
- To dopiero v0.1 developer preview, więc breaking changes są pewne.

**Why do I care:** Nie polecałbym nikomu budowania czegokolwiek produkcyjnego na v0.1 developer preview, i sam DeepSeek zresztą to podkreśla. Ale jako architekt lubię mieć oko na tego typu narzędzia wcześnie, zanim staną się mainstreamem, bo pozwala to ocenić, w którą stronę idzie ekosystem agentów zanim trzeba będzie podejmować decyzje na produkcji. Cordis i jego podejście do kompozycji pluginów warto zapamiętać, nawet jeśli sam dsh nie przetrwa w obecnej formie.

**Link:** [DeepSeek Releases an Open-Source Agent Harness Called DeepSeek Harness](https://daily.dev/posts/bxy7kZB0w)

## Oxlint, Vite 8 i Rolldown przyspieszają cały ekosystem

**TLDR:** Miesięczny przegląd społeczności JS/TS pokazuje, że type-aware linting w Oxlincie (tsgolint) osiągnął stabilność i jest nawet 18 razy szybszy niż ESLint z typescript-eslint, pokrywając 59 z 61 reguł. Vite 8 ma już więcej pobrań niż Vite 6 i 7 razem wzięte, a Angular CLI przeszedł z Rollupa na Rolldown jako domyślny optymalizator chunków.

To jeden z tych update'ów, gdzie każda pojedyncza informacja wygląda na drobiazg, ale razem układają się w wyraźny obraz: cały toolchain wokół Vite, Oxc i Rolldown dojrzewa w zawrotnym tempie. tsgolint, silnik type-aware lintingu w Oxlincie, wersjonuje się razem z TypeScript 7, więc numer w stylu v7.0.2000 mówi wprost, pod którą wersję TS-a jest budowany i który to patch. 18-krotne przyspieszenie względem ESLinta z typescript-eslint bierze się z cache'owanych odczytów z dysku, batchowania diagnostyki semantycznej i szybkich ścieżek dla typowych przypadków. To spory argument, żeby przestać traktować type-aware linting jako "za wolny do codziennego użytku", bo właśnie ten kompromis znika. Do tego Angular skonsolidował swoje zaawansowane pluginy Babel w jeden ujednolicony przebieg oxc-transform oparty na oxc-parser i magic-string, co zmniejsza zużycie pamięci przy dużych builds. W tle są jeszcze mniejsze newsy: Evan You i CTO Cloudflare rozmawiają o przejęciu VoidZero, Solid szykuje się do rewrite'u 2.0 w Ruście, a ktoś w weekend odtworzył Next.js Pages Router na Vite pod nazwą Nextane.

**Key takeaways:**
- tsgolint jest stabilny, 18x szybszy od ESLint+typescript-eslint i pokrywa niemal komplet reguł.
- Vite 8 wyprzedził łączne pobrania Vite 6 i 7, co pokazuje tempo adopcji.
- Angular CLI zamienił Rollup na Rolldown i ujednolicił optymalizacje Babel w jeden przebieg oxc-transform.

**Why do I care:** Type-aware linting był od lat tym miejscem, gdzie płaciło się realną cenę w czasie builda za lepsze reguły, więc 18-krotne przyspieszenie to nie jest kosmetyka, to zmiana, która realnie wpływa na to, czy zespół w ogóle włączy te reguły w CI. Do tego widać wyraźnie, że cały ekosystem Vite konsoliduje się wokół Rolldown i Oxc, więc jeśli planujecie długoterminową strategię build toolingu, warto już teraz zakładać, że Rollup będzie z czasem opcją legacy, a nie domyślną.

**Link:** [Tales from the Void: July 2026 Recap](https://daily.dev/posts/tryxUc4Bn)

## PHP i jego droga od chaosu typów do gradual typing

**TLDR:** Artykuł opisuje ponad 15-letnią ewolucję systemu typów w PHP, od luźnego type juggling w PHP 5 po gradual typing w PHP 8 z `declare(strict_types=1)`, union types, klasami `readonly` i property promotion. Autor argumentuje, że model opcjonalnego, egzekwowanego w runtime typowania per-plik działa lepiej niż podejście all-or-nothing.

To dobre podsumowanie tego, dlaczego PHP nie mogło po prostu wprowadzić twardego typowania z dnia na dzień. Wsteczna kompatybilność w ekosystemie, który napędza połowę internetu, wymusiła podejście stopniowe, per-plik, gdzie `strict_types=1` włącza się świadomie tam, gdzie chcemy. Artykuł zestawia to z Pythonem, gdzie type hints z PEP 484 są czysto deklaratywne i nieegzekwowane w runtime, oraz z TypeScriptem, który poszedł w stronę osobnego języka nakładanego na JavaScript. PHP wybrał trzecią drogę: typy są prawdziwe w runtime, ale opcjonalne i włączane per-plik, co autor uznaje za pragmatyczny kompromis, biorąc pod uwagę adopcję strict typing w Laravel i Symfony. Nie brakuje jednak kosztów: fragmentacja ekosystemu między kodem starym i nowym, dodatkowe obciążenie poznawcze przy czytaniu mieszanej bazy kodu, i pozostałości coercive mode, które nie chcą zniknąć.

**Key takeaways:**
- PHP 8 oferuje union types, `readonly` classes i property promotion jako część gradual typing.
- Model jest opcjonalny i per-plik, w przeciwieństwie do all-or-nothing podejścia innych języków.
- Laravel i Symfony aktywnie promują strict typing, ale legacy kod w coercive mode wciąż istnieje.

**Why do I care:** Pracując z zespołami, które utrzymują starsze aplikacje PHP obok nowego kodu TypeScript, widzę na co dzień ten sam problem: mieszanie strict i coercive mode w jednej bazie kodu kosztuje więcej niż się wydaje na pierwszy rzut oka, bo każdy code review wymaga sprawdzenia, w którym trybie żyje dany plik. Doceniam, że PHP nie próbował na siłę zerwać z przeszłością jak zrobiły to niektóre języki, ale to pragmatyczne podejście ma swoją cenę w postaci fragmentacji, którą będziemy spłacać jeszcze długo.

**Link:** [PHP's Gradual Typing Journey: From Wild West to Almost Respectable](https://daily.dev/posts/xjmL1GfFs)