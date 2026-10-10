---
title: "Deno dołącza do Cloudflare, Codemode w Pi i Next.js 16.4"
excerpt: "Bytes #528: Cloudflare przejmuje wysiłek self-hostingu workerd razem z zespołem Deno, Armin Ronacher tłumaczy Codemode, a Next.js dostaje wersję 16.4."
publishedAt: "2026-10-10"
slug: "deno-cloudflare-codemode-pi-nextjs-16-4-bytes-528"
hashtags: "#uidev #javascript #cloudflare #deno #agents #nextjs #npm #generated #pl"
source_pattern: "ui.dev"
---

## Deno dołącza do Cloudflare

**TLDR:** Zespół Deno, z Ryanem Dahlem i Bertem Belderem, będzie rozwijał self-hosting runtime'u workerd, czyli open-source'owej wersji Cloudflare Workers. Cloudflare przekonuje, że zarzut o vendor lock-in nie trzyma się kupy.

**Summary:** Wpis na blogu Cloudflare zaczyna się od ciekawego zwrotu. Ludzie w sieci powtarzają, że Workers celowo działają inaczej niż reszta chmur, żeby zamknąć klientów w pułapce, a zwłaszcza aplikacje oparte na Durable Objects. Według tej teorii celld, otwartoźródłowa implementacja Workers i Durable Objects wydana przez Deno w sierpniu, powinna być dla Cloudflare zagrożeniem. Autor wpisu twierdzi, że jest odwrotnie, i że Workers są inne po prostu dlatego, że projekt jest lepszy: tanie zarządzanie aplikacją działającą w setkach lokalizacji, bezpieczniejsza konfiguracja dostępu przez bindings i Durable Objects dla systemów czasu rzeczywistego.

Potem pojawia się część, która interesuje mnie bardziej. Cloudflare przyznaje, że workerd jest open source od lat i jest dokładnie tym kodem, który chodzi na produkcji, ale prawie nikt nie używa go do self-hostingu. Powód jest szczery: firma nie zbudowała ekosystemu narzędzi wokół runtime'u, a Durable Objects w workerd działają tylko w trybie pojedynczej instancji, wystarczającym do testów lokalnych, ale niemożliwym do skalowania. Produkcyjny routing Durable Objects to według autora bestia zależna od zespołu SRE i zewnętrznych usług, której nikt rozsądny nie chciałby hostować u siebie. Próba napisania wersji dla self-hosterów zakończyła się, jak sam pisze, wstydliwą porażką.

Plan jest taki, że Ryan i Bert poprowadzą nowy wysiłek, żeby self-hosting workerd stał się pełnoprawnym, wspieranym sposobem uruchamiania aplikacji w modelu Workers. Kod i pomysły z celld wrócą do workerd. Szczegóły mają przyjść w ciągu kilku miesięcy.

**Key takeaways:**
- Cloudflare oficjalnie traktuje self-hosting workerd jako kierunek, a nie ciekawostkę.
- Największą luką jest skalowalna wersja Durable Objects dla self-hosterów.
- Zespół Deno przechodzi do pracy nad cudzym runtime'em, więc przyszłość samego Deno zasługuje na uważne obserwowanie.

**Why do I care:** Argument o "ucieczce" z platformy jest sensowny tylko wtedy, gdy ucieczka naprawdę działa, a dziś w przypadku Durable Objects nie działa. Dopóki nie zobaczę skalowalnego self-hostingu, traktuję tę deklarację jako obietnicę, nie fakt. Warto też zauważyć, czego wpis nie mówi: co z użytkownikami Deno Deploy i jak wygląda roadmapa samego Deno po tej zmianie. Dla architekta to sygnał, że przy projektowaniu na Workers wolno już liczyć na realny plan wyjścia, ale jeszcze nie na gotowy.

**Link:** [Deno is joining Cloudflare](https://blog.cloudflare.com/deno-joins-cloudflare/)

## Czym jest Codemode

**TLDR:** Armin Ronacher opisuje, jak Pi 1.0 obsługuje MCP przez Codemode: agent pisze skrypty JavaScript, które orkiestrują wywołania narzędzi po stronie harnessa, w osobnym sandboxie. Zmniejsza to zużycie kontekstu i otwiera dostęp do rzeczy, których zwykłe narzędzia nie obsłużą.

**Summary:** Autor wychodzi od rozróżnienia, które według mnie jest najlepszą częścią tekstu. W typowym agencie są dwa systemy: mózg, czyli harness, który jest zaufany, oraz ręce, czyli środowisko wykonawcze, gdzie biegną bash i narzędzia. Mają różne systemy plików i różny poziom zaufania. Sandbox typu Gondolin chroni ręce, ale nie mózg. Codemode działa po stronie mózgu, w osobnym sandboxie opartym na QuickJS w WASM, bez sieci, bez systemu plików i bez timerów. Jedyne, co może robić, to wywoływać kolejne narzędzia.

Praktyczna korzyść jest dwojaka. Po pierwsze, duże wyniki nie muszą przechodzić przez kontekst modelu. Agent najpierw sprawdza kilka elementów odpowiedzi, a potem pisze skrypt, który przetwarza resztę, z równoległością i stanem zapisywanym do transkryptu. Po drugie, w Codemode można wystawić rzeczy, które nie pasują do klasycznych narzędzi, na przykład generowanie obrazów albo klasyfikację tekstu modelem typu Jev. Ronacher pokazuje prawdziwe sesje: masową analizę nastroju zgłoszeń na GitHubie, pętlę sterującą grą czołgową, w której klasyfikator wybiera kolejną akcję, oraz odkrywanie narzędzi MCP serwera Sentry.

Najciekawszy jest fragment o tym, że MCP w praktyce jest dziś kłopotliwe. Serwery nie zwracają ustrukturyzowanej treści, bywają niespójne, bo optymalizują tokeny zależnie od liczby wyników, nie obsługują dużych danych binarnych i nie mają dobrego mechanizmu wyszukiwania narzędzi na wielu serwerach naraz. Cloudflare robi Codemode wewnątrz serwera MCP, więc agent pisze JavaScript, który przechodzi przez kolejny JavaScript, z podwójnym escapowaniem. Autor sam nazywa to kiepskim rozwiązaniem. Przyznaje też, że trwałość wykonania jest nierozwiązana i że wzorzec słabo działa z małymi modelami.

**Key takeaways:**
- Codemode wykonuje się po stronie harnessa, nie w środowisku docelowym.
- Duże wyniki i stan omijają kontekst modelu.
- MCP wymaga ustrukturyzowanych, spójnych odpowiedzi, żeby dobrze współpracować z Codemode.

**Why do I care:** Jeśli budujesz własny serwer MCP, ten tekst jest checklistą. Zwracaj outputSchema, nie zmieniaj formatu zależnie od rozmiaru wyniku i nie wstawiaj Codemode do środka serwera. Autor ma też słabość, którą pomija: wszystko opiera się na tym, że model dobrze pisze JavaScript, a to zakłada duże modele i zaufanie do kodu, którego nikt nie czytał. Dla zespołów frontendowych to też podpowiedź, że narzędzia agentów zaczynają wyglądać jak zwykłe API, które trzeba projektować z równą starannością.

**Link:** [What is Codemode](https://lucumr.pocoo.org/2026/10/6/codemode/)

## Krótko: Next.js 16.4, vlt, Personal Agent Protocol

**TLDR:** Newsletter wymienia jeszcze kilka linków, których treści nie pobrałem, więc opieram się wyłącznie na tytułach.

**Summary:** Bytes #528 odsyła do ogłoszenia Next.js 16.4, do wpisu vlt o tym, jak metadane rejestru npm udało się zmniejszyć o 70 procent, oraz do zapowiedzi Personal Agent Protocol od Sierra. Pojawia się też biblioteka solid-yield dla SolidJS. Nie czytałem tych materiałów, więc nie oceniam ich zawartości. Warto je sprawdzić samodzielnie, szczególnie metadane rejestru, bo rozmiar odpowiedzi rejestru bezpośrednio wpływa na czas instalacji w CI.

**Key takeaways:**
- Next.js ma nową wersję 16.4.
- vlt deklaruje 70 procent mniejsze metadane rejestru.
- Sierra zapowiada Personal Agent Protocol.

**Why do I care:** Aktualizacje Next.js zawsze warto przejrzeć pod kątem zmian w cache'owaniu, bo to tam najczęściej boli. Resztę traktuję jako listę do późniejszego przeczytania.

**Link:** [Next.js 16.4](https://nextjs.org/blog/next-16-4)
