---
title: "Bun 1.4 kasuje zależności, TypeScript wygrywa z JavaScriptem, React DataGrid pod obciążeniem i chaos testing w mirrord"
excerpt: "Cztery tematy z daily.dev: Bun 1.4 zastępuje kilkanaście popularnych paczek npm wbudowanym API, dyskusja o tym czy ktokolwiek jeszcze pisze czysty JavaScript, stres-test React DataGrid na stutysięcznym zbiorze danych oraz nowa funkcja chaos testingu w mirrord."
publishedAt: "2026-08-25"
slug: "daily-dev-bun-14-typescript-react-datagrid-mirrord-chaos"
hashtags: "#dailydev #bun #typescript #javascript #react #testing #kubernetes #generated #pl"
source_pattern: "daily.dev"
---

## Bun 1.4 usuwa 15 zależności z twojego package.json

**TLDR:** Bun 1.4 rozszerza standardową bibliotekę o przepisane w Rust API, które zastępują około piętnastu popularnych paczek npm, od Playwrighta po node-cron, przy okazji skracając czas startu i zmniejszając binarkę o 17 procent.

**Summary:** Lista zastąpień jest naprawdę spora. `bun web view` bierze na warsztat Playwrighta i Puppeteera, `bun image` wchodzi w miejsce Sharp, `bun.markdown` zastępuje marked, `bun terminal` robi to, co node-pty, a `bun.cron` przejmuje rolę node-cron. Do tego dochodzi natywny runner skryptów równoległych i sekwencyjnych zamiast concurrently, wbudowana obsługa archiwów tar i gzip, serwowanie plików statycznych oraz parsowanie JSON5 i XML. To nie jest kosmetyczna zmiana w stylu "dodaliśmy jeszcze jedną funkcję pomocniczą", tylko systematyczne wycinanie całych kategorii zależności, które przez lata były domyślnym wyborem w każdym nowym projekcie Node.

Ciekawszy od samej listy jest kierunek, w którym to idzie. Każda z tych bibliotek miała swój własny cykl wydawniczy, swoje CVE, swoje breaking changes przy aktualizacji majorów. Jeśli Bun bierze odpowiedzialność za image processing czy harmonogramowanie zadań, to accepting the update oznacza jedną aktualizację runtime'u zamiast pięciu niezależnych paczek z różnymi utrzymującymi. Dorzucony globalny virtual store dla `bun install` przez izolowany linker to kolejny mały, ale wymierny zysk: mniej duplikacji na dysku przy wielu projektach korzystających z tych samych zależności.

**Key takeaways:**
- Bun 1.4 zastępuje około 15 popularnych paczek npm (Playwright, Sharp, marked, node-pty, node-cron, concurrently i inne) wbudowanymi, przepisanymi w Rust API.
- Runtime zyskuje też natywną obsługę archiwów tar/gzip, serwowanie plików statycznych oraz parsowanie JSON5 i XML.
- Globalny virtual store dla `bun install` przez izolowany linker ogranicza duplikację zależności na dysku między projektami.
- Release poprawia zużycie CPU i czas startu, a binarka jest mniejsza o 17 procent.

**Why do I care:** Konsolidacja zależności w runtime to coś, co bezpośrednio zmniejsza powierzchnię ataku i koszt utrzymania projektu, bo mniej paczek oznacza mniej `npm audit` do ignorowania i mniej breaking changes do śledzenia. Jednocześnie widzę w tym pewne ryzyko lock-inu: im więcej robisz przez API specyficzne dla Buna, tym trudniej migrować z powrotem na Node, gdyby zaszła taka potrzeba w konkretnym projekcie korporacyjnym. Dla nowych, zielonych projektów to i tak dobry kompromis, ale przy istniejącym kodzie bym się nie spieszył z przepisywaniem działających integracji tylko dlatego, że jest teraz jedna funkcja zamiast pięciu paczek.

**Link:** [Bun 1.4 Just Deleted 15 of Your Dependencies](https://daily.dev/posts/R6a1AGjVc)

---

## Czy ktokolwiek jeszcze pisze czysty JavaScript?

**TLDR:** Materiał wideo argumentuje, powołując się na GitHub Octoverse 2025 i State of JS 2025, że TypeScript stał się domyślnym wyborem w praktycznie każdej warstwie stacku frontendowego i backendowego, a JavaScript pozostaje głównie jako cel kompilacji.

**Summary:** Liczby przywołane w materiale są dość jednoznaczne: TypeScript wyprzedził Pythona i JavaScript w liczbie miesięcznych kontrybutorów według Octoverse 2025, a State of JS 2025 pokazuje, że 77 procent czasu spędzanego na pisaniu kodu JS/TS to w praktyce pisanie TypeScriptu. Autor przechodzi po kolejnych niszach, w których TS stał się standardem: React, Vue i Angular po stronie frontendu, Node.js uruchamiający TS bezpośrednio bez transpilacji jako osobnego kroku, monorepo, React Native na mobile, Electron na desktopie, a nawet warstwa aplikacji AI przez Vercel AI SDK.

Wniosek jest umiarkowany, nie triumfalistyczny: JavaScript nie umarł, bo TypeScript i tak kompiluje się do niego, ale rekomendacja dla początkujących to nadal najpierw fundamenty JS, a dopiero potem TypeScript, przy czym czyste JS wciąż ma sens do małych skryptów i nauki podstaw. Warto dodać kontekst, którego materiał nie ukrywa: wideo jest sponsorowane przez CodeRabbit i promuje własny kurs TypeScript autora ze start.dev, więc to nie jest neutralne badanie rynku, tylko treść z jasnym interesem w tym, żeby TypeScript wypadł jak najlepiej.

**Key takeaways:**
- GitHub Octoverse 2025: TypeScript wyprzedził Pythona i JavaScript w liczbie miesięcznych kontrybutorów.
- State of JS 2025: 77 procent czasu pisania kodu JS/TS to pisanie w TypeScripcie.
- TS jest już standardem w React, Vue, Angular, Node.js, React Native, Electron i warstwie AI (Vercel AI SDK).
- Rekomendacja dla początkujących: najpierw fundamenty JavaScriptu, potem TypeScript; czyste JS zostaje dla małych skryptów i nauki.

**Why do I care:** Te liczby nie są dla mnie zaskoczeniem, bo w praktyce od dawna trudno znaleźć nowy projekt frontendowy w zespole, który świadomie rezygnuje z typów. Ciekawszy jest fakt, że TypeScript wygrał nie dlatego, że jest "ładniejszy", tylko dlatego, że koszt jego wdrożenia spadł niemal do zera: narzędzia, frameworki i LLM-y asystujące w pisaniu kodu domyślnie generują kod typowany. To ma bezpośrednie przełożenie na rekrutację i onboarding, bo pytanie "czy znasz TypeScript" praktycznie przestało być pytaniem opcjonalnym, a stało się częścią definicji "znam JavaScript" na poziomie zawodowym.

**Link:** [Does Anyone Use JavaScript Anymore?](https://daily.dev/posts/DZdt7NAaw)

---

## React DataGrid pod obciążeniem: eksplorator misji kosmicznych na 100 tysiącach wierszy

**TLDR:** Deweloper zbudował fikcyjną aplikację do eksploracji misji i satelitów kosmicznych, żeby przetestować React DataGrid na zbiorze 1200 wierszy po stronie klienta i stutysięcznym archiwum ładowanym przez nieskończone przewijanie po stronie serwera.

**Summary:** Projekt testowy jest zaprojektowany tak, żeby uderzyć w konkretne funkcje: sortowanie wielokolumnowe, filtrowanie fasetowe, grupowanie i przypinanie wierszy, budowniczy tabel przestawnych, niestandardowe renderery komórek, eksport do CSV i Excela oraz Tree Data do hierarchicznych osi czasu misji. Obok samego grida są jeszcze strona analityczna oparta na wykresach i strona ze szczegółami misji, więc to nie jest test w próżni, tylko coś zbliżonego do realnego dashboardu analitycznego, jaki mógłby powstać w firmie z branży kosmicznej czy logistycznej.

Wniosek autora jest praktyczny i bez zbędnego entuzjazmu: React DataGrid sprawdza się w dashboardach intensywnie operujących na danych, narzędziach analitycznych i aplikacjach z dużymi lub hierarchicznymi zbiorami, ale konfiguracja Pivot Table i Tree Data zajęła zauważalnie więcej czasu niż podstawowe sortowanie i filtrowanie. To dość typowy wzorzec dla bibliotek gridowych w stylu AG Grid: podstawy działają od razu, a zaawansowane funkcje wymagają przeczytania dokumentacji ze zrozumieniem, zanim zaczną działać tak, jak się tego oczekuje.

**Key takeaways:**
- Test obejmował 1200 wierszy po stronie klienta oraz 100 000 wierszy w trybie server-side infinite scrolling.
- Sprawdzone funkcje: sortowanie wielokolumnowe, filtrowanie fasetowe, grupowanie i przypinanie wierszy, pivot table, niestandardowe renderery, eksport CSV/Excel, Tree Data.
- React DataGrid poleca się do dashboardów analitycznych i aplikacji z dużymi lub hierarchicznymi zbiorami danych.
- Konfiguracja Pivot Table i Tree Data wymaga więcej czasu nauki niż podstawowe sortowanie i filtrowanie.

**Why do I care:** Zanim wybierzemy grid dla nowego dashboardu, warto mieć realny punkt odniesienia dla wydajności przy stu tysiącach wierszy, bo to jest skala, na której wiele bibliotek zaczyna się sypać przy nieostrożnej implementacji wirtualizacji. Fakt, że autor uczciwie przyznaje, że Pivot Table i Tree Data były trudniejsze do skonfigurowania, jest dla mnie bardziej wartościowy niż entuzjastyczna recenzja bez żadnych zastrzeżeń, bo to właśnie te dwie funkcje najczęściej decydują, czy grid faktycznie pasuje do konkretnego przypadku użycia w projekcie, czy trzeba będzie dopisywać własne obejścia.

**Link:** [I Used React DataGrid to Build a Real Space Mission Explorer](https://daily.dev/posts/xnkrgQEp5)

---

## mirrord wprowadza chaos testing bez ruszania współdzielonego środowiska

**TLDR:** MetalBear dodał do mirrord funkcję Chaos Testing, która pozwala celowo wstrzykiwać opóźnienia i błędy połączeń do wychodzącego ruchu własnej usługi podczas lokalnej sesji, bez wpływu na współdzielone środowisko czy innych użytkowników.

**Summary:** Mechanizm opiera się na regułach łączących selektor (cel połączenia i procent ruchu) z efektem: albo opóźnieniem z opcjonalnym jitterem, albo błędem połączenia w wariantach reset, timed_out lub refused. Dzięki temu można na przykład symulować wolny cache Redis albo padającą bazę danych i sprawdzić, czy logika retry i fallback w usłudze faktycznie działa, zamiast dowiadywać się tego dopiero na produkcji. Funkcja wymaga mirrord CLI w wersji 3.241.0 lub nowszej, działa na wersji open source bez licencji Teams czy operatora, a zarządzać nią można przez CLI, lokalny UI, endpointy REST albo wtyczkę agenta kodującego AI.

Kluczowa różnica względem Chaos Mesh czy LitmusChaos to zasięg: te narzędzia wstrzykują awarie do współdzielonego środowiska, wpływając na wszystkich, którzy z niego korzystają, co wymaga koordynacji przed uruchomieniem i pasuje raczej do testowania finalnego builda przed release'em. Chaos rules w mirrord działają w obrębie sesji jednego developera, więc opóźnienie czy błąd dotyczy tylko jego własnego ruchu względem realnych zależności, co czyni to narzędzie odpowiednim do szybkiego sprawdzenia przed otwarciem pull requesta, a nie tylko przed dużym wdrożeniem.

**Key takeaways:**
- Reguła chaosu łączy selektor (host lub host:port plus procent ruchu) z efektem: latency z jitterem albo connection_error (reset, timed_out, refused).
- Wymagany mirrord CLI 3.241.0 lub nowszy, bez potrzeby licencji Teams ani operatora.
- W przeciwieństwie do Chaos Mesh czy LitmusChaos, chaos rules działają w obrębie sesji jednego developera, nie współdzielonego środowiska.
- Zarządzanie dostępne przez CLI, lokalny UI, endpointy REST oraz wtyczkę agenta kodującego AI.

**Why do I care:** To jest dokładnie ten rodzaj narzędzia, który obniża próg wejścia do chaos engineeringu na tyle, że pojedynczy developer może go użyć przed pull requestem, a nie tylko zespół platformowy przed wielkim releasem. W architekturach mikrousługowych retry i fallback logika bardzo często istnieje tylko w teorii, bo nikt nigdy nie sprawdził jej w praktyce przy realnym, częściowym uszkodzeniu zależności. Możliwość sterowania tym z poziomu agenta kodującego AI sugeruje też, że MetalBear liczy na to, że takie testy będą częścią zautomatyzowanego workflow code review, a nie ręczną czynnością, o której zawsze zapominamy w napiętym sprincie.

**Link:** [Introducing mirrord Chaos Testing](https://daily.dev/posts/emVOlloZ5)
