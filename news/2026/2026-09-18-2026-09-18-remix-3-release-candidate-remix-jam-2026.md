---
title: "Remix 3 wchodzi w fazę Release Candidate przed premierą na Remix Jam 2026"
excerpt: "Remix opublikował release candidate wersji 3 pełnostackowego frameworka i zapowiedział oficjalną premierę na konferencji Remix Jam w Toronto."
publishedAt: "2026-09-18"
slug: "2026-09-18-remix-3-release-candidate-remix-jam-2026"
hashtags: "#remixrun #react #webdev #remix3 #reactrouter #shopify #generated #pl"
source_pattern: "Remix newsletter"
---

## Remix 3 Release Candidate: koniec dodawania funkcji, początek dopinania szczegółów

**TLDR:** Remix opublikował pierwszy release candidate wersji 3, jeden pakiet łączący bazę danych, walidację schematów, router i nowy runtime UI, z premierą zaplanowaną na 2 października podczas Remix Jam.

**Summary:** Od ostatniej aktualizacji, czyli beta preview sprzed czterech miesięcy, zespół Remix nie próżnował. Release candidate zamyka etap dodawania nowych funkcji: od teraz priorytetem są poprawki błędów, audyty bezpieczeństwa, dokumentacja i zbieranie opinii od wczesnych użytkowników, a wszystko to przed formalnym związaniem się z SemVer. Od bety w projekcie przybyło ponad 350 commitów, a lista zmian robi wrażenie: pełny workflow bazy danych wbudowany w CLI (migracje, seeding, sprawdzanie statusu, resety, rollbacki), full-stack HMR przeładowujący moduły serwerowe i aktualizujący komponenty UI w miejscu, oraz ulepszony, unbundled serwer assetów dla JavaScriptu, CSS-a, obrazów, fontów i pakietów npm z wbudowanym preloadingiem.

Router również przeszedł solidną przebudowę: bezpieczniejsze i szybsze dopasowywanie tras, generowanie URL-i, kompozycyjne routowanie przez `router.mount()` oraz lepsza inferencja TypeScript. Silnik odpowiedzialny za to dopasowywanie żyje jako osobny pakiet `route-pattern` w repozytorium remix-run/remix, a ten sam mechanizm przebija się już do React Routera pod flagą `future.unstable_routePatternMatching`, opisaną na stronie „Future Changes” i odnotowaną w changelogu React Routera przy wpisie dla v8.4.0. To dobry sygnał, że rozwiązania testowane w Remix 3 trafiają z powrotem do ekosystemu, z którego Remix się wywodzi.

Zespół otwarcie przyznaje, że dotąd brakowało im prostego sposobu na opowiedzenie, dlaczego Remix 3 jest ekscytujący, częściowo dlatego, że AI i programowanie agentowe utrudniają rozmowę o technologii przez pryzmat samego kodu, a częściowo dlatego, że Remix 3 to coś więcej niż zamiennik Reacta czy metaframeworka. To pełnoprawny framework full-stack, budowany zgodnie z zasadą „Model-First Development”. Ma być czytelny nie tylko dla ludzi, ale i dla agentów, które go generują, nawigują i modyfikują. Zespół twierdzi wprost, że sam intensywnie używa agentów przy budowie Remixa i produktów na nim opartych, w tym migracji własnej strony remix.run i sklepu Remix Store.

Praktyczna konsekwencja tej filozofii to jeden pakiet zależności zamiast rozproszonego stosu bibliotek. Domyślny szablon ma w `package.json` tylko wpis `remix`, co zmniejsza powierzchnię podatną na ataki supply-chain i ogranicza churn wynikający ze składania frameworka z osobnych klocków. Poszczególne elementy pozostają jednak wymienne: można podmienić `@remix-run/data-schema` na Zod albo `@remix-run/data-table` na Drizzle, a nawet zastąpić middleware renderujący własnym, opartym na Reactcie. Chętni do testów mogą uruchomić `npx remix@next new my-remix-app` już teraz.

**Key takeaways:**
- Release candidate kończy etap dodawania funkcji: teraz liczą się poprawki, audyty bezpieczeństwa i dokumentacja przed wiązaniem się z SemVer.
- Od bety doszedł pełny workflow bazy danych w CLI, full-stack HMR oraz unbundled serwer assetów z preloadingiem.
- Router korzysta z nowego pakietu `route-pattern`, oferuje `router.mount()` i ten sam mechanizm dopasowywania tras trafia do React Routera pod flagą eksperymentalną.
- Cały framework mieści się w jednym pakiecie `remix`, przy zachowaniu możliwości podmiany poszczególnych elementów (np. Zod, Drizzle).
- Oficjalne wydanie stabilne zaplanowano na 2 października podczas Remix Jam.

**Why do I care:** Konsolidacja bazy danych, routera, walidacji i UI w jednym pakiecie to odważny zakład. Mniejsza powierzchnia dla ataków supply-chain brzmi kusząco, ale oznacza też mocniejsze uzależnienie od decyzji jednego zespołu, nawet jeśli poszczególne elementy da się podmieniać. Narracja „budujemy dla agentów” jest dziś wszechobecna i sama w sobie niewiele mówi, ale argument, że kod czytelny dla agenta bywa też czytelniejszy dla człowieka, ma sens i warto go zweryfikować na własnym projekcie, zanim uwierzy się na słowo. Ja poczekałbym z migracją produkcyjnych aplikacji do stabilnego wydania. RC to dobry moment na eksperymenty poboczne, nie na przepisywanie czegokolwiek, co już zarabia pieniądze.

**Link:** [Remix 3 Release Candidate](https://remix.run/blog/remix-3-release-candidate)

## Remix Jam 2026: premiera Remix 3 na żywo w Toronto

**TLDR:** 2 października w Toronto odbędzie się doroczna konferencja Remix Jam, podczas której zespół oficjalnie wypuści Remix 3 i przedstawi pełny dzień prelekcji o architekturze frameworka.

**Summary:** Remix Jam wraca do Toronto z jasnym celem: pokazać Remix 3 w akcji i formalnie go wydać. Dzień zaczyna się od rejestracji i śniadania o 8:30, a kończy after-party o 17:00, z sześcioma prelekcjami rozłożonymi pomiędzy przerwami na lunch i przekąski. Otwiera je Michael Jackson, współtwórca Remixa i React Routera, opowieścią o tym, dlaczego framework budowany w świecie, w którym większość kodu piszą agenty, musi wymagać od siebie znacznie więcej: ma być szybszy, mniejszy i prostszy w użyciu, od serwera po przeglądarkę. Po jego wystąpieniu następuje sesja pytań i odpowiedzi wspólnie z Brooksem Lybrandem, liderem developer relations dla Remixa w Shopify.

Kolejne prelekcje schodzą głębiej w konkretne obszary frameworka. Mark Dalgleish, współtwórca CSS Modules i Vanilla Extract, opowie o „Remix Unbundled”: serwerze assetów, który kompiluje TypeScript, JSX, CSS i pliki statyczne na żądanie, bez kroku bundlowania przed startem produkcji. Brooks Lybrand wróci na scenę z tematem „How Do Agents Experience Remix?”, rozwijając zasadę Model-First Development i dzieląc się wnioskami z ponad roku pracy z agentami kodującymi przy budowie Remix Store, migracji remix.run i innych projektów. Matt Brophy, pracujący na styku routingu i architektury frameworków, opowie w „Beyond the Server” o frames, wsparciu dla SPA i narzędziach testowych, które rozciągają spójny, webowy model programowania z serwera aż do przeglądarki i test runnera.

Popołudnie zamykają dwie prelekcje spoza rdzenia zespołu Remixa. Sergio Xalambrí, developer z ponad dekadą doświadczenia i utrzymujący biblioteki wokół React Routera, opowie w „The Remix Way”, jak zbudował wokół Remixa cały stos obejmujący i18n, background jobby, e-mail, MCP i komponenty UI. Josh Sanger z zespołu Shopify Editions zamknie dzień pytaniem „What Should the Browser Actually Own?”, opartym na doświadczeniach z projektów, w których przeglądarka miała robić coraz mniej, a nie coraz więcej. Dla osób, które nie dotrą do Toronto, wydarzenie będzie transmitowane na żywo na kanale YouTube Remixa. Bilety na miejscu wciąż są dostępne, są przenoszalne, choć bezzwrotne.

**Key takeaways:**
- Premiera Remix 3 nastąpi na żywo 2 października podczas Remix Jam w Toronto.
- Program obejmuje sześć prelekcji, między innymi o wizji frameworka, unbundled asset server i doświadczeniach agentów kodujących z Remixem.
- Prelegenci spoza zespołu rdzenia (Sergio Xalambrí, Josh Sanger) pokazują zastosowania Remixa poza samym frameworkiem.
- Wydarzenie będzie transmitowane na żywo na YouTube dla osób niebędących na miejscu.

**Why do I care:** Wiązanie premiery stabilnej wersji z konkretną datą konferencji to zdrowy sygnał dyscypliny release'owej, rzadszy niż powinien być w projektach open source. Najciekawsza z zapowiedzianych prelekcji to dla mnie „How Do Agents Experience Remix?”, jedna z niewielu okazji, by usłyszeć konkretne, praktyczne wnioski z pracy z agentami kodującymi, zamiast kolejnej ogólnikowej deklaracji „budujemy dla AI”. Transmisja na YouTube sprawia, że nie trzeba lecieć do Toronto, by ocenić, czy architektoniczne uzasadnienia stojące za Remix 3 faktycznie się bronią.

**Link:** [Remix Jam 2026](https://remix.run/jam/2026)
