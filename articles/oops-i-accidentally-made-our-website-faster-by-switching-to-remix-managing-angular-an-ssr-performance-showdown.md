---
title: 'Oops I Accidentally Made Our Website Faster By Switching To Remix Managing Angular An Ssr Performance Showdown'
excerpt: 'Przegląd 3 artykułów z ui.dev'
publishedAt: '2025-10-26'
slug: 'oops-i-accidentally-made-our-website-faster-by-switching-to-remix-managing-angular-an-ssr-performance-showdown'
hashtags: '#generated #pl #react #nodejs #ai #performance #frontend'
---

## Oops, I accidentally made our website faster by switching to Remix

No to mamy tutaj klasyczną sytuację - ktoś chciał zaoszczędzić parę dolców na hostingu i przypadkiem zrobił stronę szybszą. Echobind postanowił przenieść się z Vercela na Railway, żeby mieć bardziej przewidywalne koszty, ale Next.js nie współgra tak dobrze z self-hostingiem jak z Vercelem.

Migracja z Next.js na Remix okazała się zaskakująco prosta. Większość stron używała App Routera i React Server Components, ale bez głębokiego zagnieżdżenia. W praktyce wystarczyło skopiować kod strony, zamienić linki na wersję Remixową i przenieść pobieranie danych do funkcji loader. Jedyne co wymagało więcej pracy to przekierowania - musieli stworzyć funkcję, która przetwarza redirecty dla każdego requesta.

Kolejnym wyzwaniem był komponent Image z Next.js, ale tutaj CMS z wbudowanym resizingiem obrazów uratował sytuację. Po prostu użyli zwykłych tagów img z określonymi wymiarami.

**Key takeaways:**
- Migracja z Next.js na Remix może być prostsza niż się wydaje
- Self-hosting Next.js wymaga więcej konfiguracji niż Vercel
- Czasem zmiana frameworka może przypadkowo poprawić performance
- CMS z resizingiem obrazów może zastąpić optymalizacje Next.js Image

**Link:** [link](https://echobind.com/post/oops-i-accidentally-made-our-website-faster-by-switching-to-remix)

## Managing Angular

Minko Gechev dzieli się swoimi doświadczeniami jako product lead Angulara. To naprawdę ciekawy wgląd w to, jak zarządza się jednym z największych frameworków webowych.

Ich podejście opiera się na North Star - chcą umożliwić developerom budowanie aplikacji webowych z pewnością siebie. Brzmi abstrakcyjnie, ale ma sens. Zamiast próbować stworzyć idealny produkt jednym strzałem, używają podejścia iteracyjnego.

Mają trzy poziomy planowania: dokumenty długoterminowe na 3-5 lat jako North Star, roczną strategię dla pracy strategicznej i kwartalne cele, gdzie co trzy miesiące reewaluują nad czym pracują. To jest właśnie ta feedback loop z developerami, autorami innych frameworków i zespołami produktowymi.

Ciekawe jest to, że traktują długoterminową wizję jako abstrakcyjną reprezentację idealnego frameworka - coś jak formy Platona. Wiedzą, że nigdy nie osiągną perfekcji, ale to daje im kierunek.

**Key takeaways:**
- Podejście iteracyjne przeważa nad próbą stworzenia idealnego produktu za jednym razem
- Trzy poziomy planowania: długoterminowy, roczny, kwartalny
- Stała feedback loop z community jest kluczowa
- North Star jako abstrakcyjna reprezentacja idealnego frameworka

**Link:** [link](https://blog.mgechev.com/2024/08/25/managing-angular/)

## An SSR Performance Showdown

Platformatic postanowił sprawdzić, jak różne biblioteki radzą sobie z Server-Side Renderingiem. SSR to często przeoczony aspekt wydajności, a może być główną przyczyną blokowania event loopa Node.js.

Stworzyli test z 2398 elementami div tworzącymi spiralę, żeby mieć naprawdę ciężki dokument do renderowania. Porównali React, Vue, Solid, Svelte, Preact, a także prostsze alternatywy jak fastify-html i ejs.

Użyli Fastify z integracją Vite jako testbed. Co ciekawe, celowo pominęli Next.js, Astro czy Qwik, bo nie oferują izolowanych metod renderowania - chcieli testować czyste biblioteki, nie całe frameworki.

Wszystkie testy były uruchamiane na production buildach po vite build. To pokazuje, jak ważne jest testowanie SSR performance przy wyborze frontend stacka, bo to może być wąskie gardło całej aplikacji.

**Key takeaways:**
- SSR może być główną przyczyną problemów z wydajnością Node.js
- Testowanie na ciężkich dokumentach pokazuje prawdziwe różnice
- Production buildy są kluczowe dla wiarygodnych testów
- Izolowane metody renderowania dają lepszy obraz wydajności bibliotek

**Link:** [link](https://blog.platformatic.dev/ssr-performance-showdown)