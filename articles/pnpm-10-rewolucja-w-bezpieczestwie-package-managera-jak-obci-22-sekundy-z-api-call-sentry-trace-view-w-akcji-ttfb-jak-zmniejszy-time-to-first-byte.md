---
title: 'Pnpm 10 Rewolucja W Bezpieczestwie Package Managera Jak Obci 22 Sekundy Z Api Call Sentry Trace View W Akcji Ttfb Jak Zmniejszy Time To First Byte'
excerpt: 'Przegląd 5 artykułów z ui.dev'
publishedAt: '2025-01-13'
slug: 'pnpm-10-rewolucja-w-bezpieczestwie-package-managera-jak-obci-22-sekundy-z-api-call-sentry-trace-view-w-akcji-ttfb-jak-zmniejszy-time-to-first-byte'
hashtags: '#generated #pl #react #javascript #nodejs #pnpm #performance'
---

## PNPM 10 - Rewolucja w Bezpieczeństwie Package Managera

No i mamy to! PNPM 10 właśnie wylądowało i chłopaki nie żartowali - to jest breaking change, który może sprawić, że wasz build się wysypie szybciej niż JavaScript framework w 2024. Najważniejsza zmiana? Skrypty lifecycle dependencji są teraz domyślnie WYŁĄCZONE! To znaczy, że te wszystkie postinstall skrypty, które mogły robić różne brzydkie rzeczy w waszym node_modules, teraz siedzą cicho.

Żeby je włączyć, musicie explicite dodać je do pola onlyBuiltDependencies w package.json. To jest jak whitelist - tylko te paczki, które naprawdę potrzebują uruchomić swoje skrypty, będą mogły to zrobić. Jeśli chcecie stary sposób działania, musicie ustawić neverBuiltDependencies na pustą tablicę.

Kolejna duża zmiana - pnpm link teraz dodaje overrides do root package.json. SHA256 zastąpił MD5 wszędzie gdzie się dało - długie ścieżki, peer dependency hashe, checksums. Wszystko dla bezpieczeństwa.

**Kluczowe punkty:**

- Skrypty lifecycle dependencji wyłączone domyślnie
- SHA256 zastępuje starsze algorytmy hashowania
- Nowe zachowanie pnpm link z overrides
- Store version został podniesiony do v10

**Link:** [link](https://github.com/pnpm/pnpm/releases/tag/v10.0.0)

## Jak Obciąć 22 Sekundy z API Call - Sentry Trace View w Akcji

Dan Mindru miał endpoint, który trwał 44 sekundy. CZTERDZIEŚCI CZTERY SEKUNDY! To jest więcej niż czas potrzebny na zaparowanie kawy. Ale dzięki Sentry Trace View udało mu się zoptymalizować to do 22 sekund mniej.

Trace View to narzędzie, które pokazuje waterfall visualization transakcji i spanów. Zamiast patrzeć na Chrome DevTools i widzieć tylko "serwer odpowiadał 2 sekundy", możecie zobaczyć dokładnie co się działo na serwerze - które HTTP calle, file I/O, third-party calls czy DB queries zajmowały najwięcej czasu.

W przypadku Dana problem był z endpointem, który generował cały codebase, repo, content i deployował na Vercel. Nie jest to zwykły CRUD endpoint. Dzięki distributed tracing mógł śledzić request od klienta przez serwer i zidentyfikować bottlenecki.

**Kluczowe punkty:**

- Trace View pokazuje dokładnie co dzieje się na serwerze
- Distributed tracing łączy client i server w jednej timeline
- Flame Graph visualization ułatwia identyfikację problemów
- Sentry integruje się bezpośrednio z Next.js

**Link:** [link](https://blog.sentry.io/how-i-cut-22-3-seconds-off-an-api-call-using-trace-view/)

## TTFB - Jak Zmniejszyć Time to First Byte

Time to First Byte to metryka, która mierzy czas między HTTP requestem klienta a otrzymaniem pierwszego bajtu odpowiedzi serwera. W erze server-side renderingu TTFB stał się większym problemem, bo zamiast pre-renderowanych statycznych stron, serwer musi renderować na żądanie.

Chrome DevTools pokaże wam tylko, że browser czekał 2 sekundy na serwer, ale nie powie dlaczego. WebPageTest też nie da wam odpowiedzi. Potrzebujecie tracingu, żeby zobaczyć co się dzieje na serwerze.

Sentry tworzy automatycznie spany dla Next.js aplikacji, które pozwalają zidentyfikować co spowalnia wasz TTFB. Możecie zobaczyć które database queries, API calle czy inne operacje zajmują najwięcej czasu i je zoptymalizować.

**Kluczowe punkty:**

- TTFB wpływa na wszystkie inne web vitals
- Browser tools nie pokazują co dzieje się na serwerze
- Tracing jest kluczowy do debugowania TTFB
- Sentry automatycznie tworzy spany dla Next.js

**Link:** [link](https://blog.sentry.io/how-to-reduce-ttfb/)

## React Dostaje Pierwsze API do Animacji - ViewTransition

Po 12 latach React w końcu dostaje swoje pierwsze animations API! ViewTransition component bazuje na browser's View Transition API i jest już dostępny w pre-release channels.

View Transition API pozwala animować między dowolnymi dwoma viewami - możecie animować justify-content z flex-start na flex-end, albo animować między dwoma całkowicie różnymi elementami jakby były jednym.

Problem z integracją view transitions z Reactem to asynchroniczność - musicie startować view transition przed ustawieniem state i wrapować state update w flushSync. To jest performance killer.

React team rozwiązał te problemy w swoim ViewTransition komponencie. Możecie teraz robić płynne animacje między różnymi stanami aplikacji bez third-party bibliotek jak Motion czy inne.

**Kluczowe punkty:**

- Pierwszy oficjalny animations API w Reakcie
- Bazuje na browser's View Transition API
- Rozwiązuje problemy z asynchronicznością i performance
- Dostępny w pre-release channels

**Link:** [link](https://motion.dev/blog/reacts-experimental-view-transition-api)

## Flexoki - Inky Color Scheme dla Kodu i Tekstu

Flexoki to color scheme inspirowany analogowymi tuszami drukarskimi i ciepłymi odcieniami papieru. Został zaprojektowany specjalnie do czytania i pisania na ekranach cyfrowych.

Dostępny jest dla praktycznie wszystkiego - od VS Code, przez Neovim, Sublime Text, po tmux, Kitty terminal czy nawet Discord. Są porty dla wszystkich popularnych edytorów i terminali.

Paleta kolorów jest bardzo przemyślana - od paper (#FFFCF0) przez różne odcienie base (50-950) po accent colors jak red, orange, yellow, green, cyan, blue, purple i magenta. Każdy kolor ma swoje light i dark wersje.

**Kluczowe punkty:**

- Inspirowany analogowymi tuszami drukarskimi
- Dostępny dla wszystkich popularnych edytorów i terminali
- Przemyślana paleta kolorów z full range 50-950
- MIT licensed z możliwością portowania

**Link:** [link](https://github.com/kepano/flexoki)
