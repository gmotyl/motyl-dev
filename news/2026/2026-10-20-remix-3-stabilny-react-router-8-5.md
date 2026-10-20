---
title: "Remix 3 jest stabilny, a React Router 8.5.0 porzuca własne view transitions"
excerpt: "Remix 3 trafia do wersji stabilnej, sklep Remix schudł o połowę JavaScriptu, a React Router 8.5.0 dostaje nowe niestabilne API."
publishedAt: "2026-10-20"
slug: "remix-3-stabilny-react-router-8-5"
hashtags: "#remixrun #react #webdev #remix #react-router #ssr #performance #server-components #generated #pl"
source_pattern: "Remix newsletter"
---

## Remix 3 jest stabilny

**TLDR:** Wyszedł remix w wersji 3.0.0, po ponad 2600 commitach, 21 prereleasach i 53 kontrybutorach. To pełny framework zbudowany na Web API i dostarczany jako jeden pakiet.

**Summary:** Pierwszy commit pojawił się w lipcu 2024. Teraz zespół uznaje Remix 3 za gotowy do produkcji. Framework składa się z serwera z typowanymi trasami, middleware i kontrolerami, warstwy danych dla SQLite, PostgreSQL i MySQL, uwierzytelniania z OAuth i sesjami po stronie serwera oraz systemu zasobów, który kompiluje TypeScript, JSX i CSS na żądanie, bez osobnego kroku budowania. Komponenty renderują się na serwerze, a w przeglądarce hydratuje się tylko to, co sam wybierzesz. Do tego dochodzą bezgłowe, dostępne komponenty interfejsu oraz testy serwera, przeglądarki i end-to-end z jednego polecenia. Pakiet interfejsu trzeba na razie instalować osobno, bo zespół dopieszcza jeszcze kilka API.

Zespół przeniósł z React Router 7 na Remix 3 sklep Remix Store, korzystając z nowego zestawu Hydrogen od Shopify. Hydratują się tylko 13 komponentów w całym serwisie, na przykład koszyk i przycisk dodawania do koszyka. Przy emulowanym telefonie ze średniej półki, wolnym 4G i spowolnionym procesorze JavaScript sklepu spadł z około 500 do 210 KB, czas wykonywania skryptów skrócił się o 50 do 60 procent, a strona produktu schudła z 839 do 497 KB. Strona główna maluje się w 1,2 sekundy zamiast 4,4. Zależności uruchomieniowe spadły z 17 do 4, wypadły React, Radix, Tailwind, Zod i biblioteka karuzeli.

To liczby z jednego sklepu, mierzone przez autorów frameworka, więc traktuję je jak dobry znak, a nie jak dowód. Warto jednak zauważyć, że sporą część zysku daje po prostu mniej hydratacji, a to samo da się uzyskać w innych narzędziach.

**Key takeaways:**
- Remix 3 to jeden pakiet na Web API, z serwerem, danymi, uwierzytelnianiem i testami.
- W sklepie Remix hydratuje się 13 komponentów, a JS spadł o ponad połowę.
- Pakiet interfejsu jest jeszcze osobny.

**Why do I care:** Jeśli utrzymujesz aplikację na React Router, to jest ciekawa opcja, ale nie powód do paniki. Zespół sam mówi, że agenci piszą dziś większość kodu, a framework ma być dla nich czytelny. Zobaczymy, czy to przetrwa kontakt z zespołem po trzech latach utrzymania.

**Link:** [Remix Newsletter #47, Remix 3 is Stable](https://remix.run/blog)

## Remix Jam 2026, sześć wystąpień

**TLDR:** Z konferencji w Toronto powstało sześć nagrań. Najciekawsze są pomysły na bundler zastąpiony serwerem zasobów oraz porównanie, jak agenci radzą sobie z Remixem.

**Summary:** Pierwsze wystąpienie pokazuje, jak parser plików zbudowany na prymitywach webowych urósł do całego frameworka. Drugie, o Remix Unbundled, pokazuje serwer zasobów, który robi pracę bundlera plik po pliku, na żądanie. Po zmianie jednego pliku w zainstalowanym pakiecie przeglądarka pobrała tylko ten jeden plik, 2,2 KB, a reszta została w cache.

Trzecie wystąpienie buduje tę samą aplikację na trzy sposoby, z granularnymi ramkami, z całym dokumentem jako jedną ramką i jako SPA z routerem w przeglądarce. Kontrolery w dwóch ostatnich wariantach są identyczne co do znaku. Czwarte porównuje agentów piszących Snake w Next.js, React Router i Remix. Pierwsze dwa skończyły szybciej, ale Remix przyniósł prawdziwą bazę z migracjami, solidne uwierzytelnianie i logikę gry w zwykłym JavaScripcie. Autor mówi też, że agent uwierzytelnia lepiej na gotowym frameworku niż od zera, i to jest akurat trafne.

Piąte wystąpienie opisuje stos z 88 pakietami po przeniesieniu siedmiu aplikacji, a szóste dotyczy przebudowy stron Shopify Editions na Remix 3 bez Reacta. Jedno zdanie z tego ostatniego warto zapamiętać. Celem nie jest zero JavaScriptu, tylko większa świadomość, gdzie on mieszka.

**Key takeaways:**
- Serwer zasobów kompiluje pliki na żądanie i wspiera drobny cache.
- Porównanie agentów zależy od wyboru zadania, nie jest ostatecznym testem.
- Shopify Editions przechodzi na Remix 3 bez Reacta.

**Why do I care:** Ruch od bundlera do serwera zasobów jest dla mnie najciekawszym wątkiem. Jeśli to się sprawdzi na dużej aplikacji, połowa naszych dyskusji o konfiguracji Vite przestanie mieć sens. Jeśli nie, zostanie ładna demonstracja na scenie.

**Link:** [Remix Jam 2026 playlist](https://www.youtube.com/playlist?list=PLQI4E3S93pCE)

## React Router 8.5.0

**TLDR:** Wersja 8.5.0 dodaje kilka niestabilnych API, naprawia 11 błędów i oznacza własne API view transitions jako przestarzałe na rzecz komponentu z Reacta 19.3.

**Summary:** Deprecjacji podlegają prop viewTransition, hook useViewTransitionState, a także render prop isTransitioning i klasa transitioning w NavLink. Wszystko nadal działa w wersji 8 i zniknie w wersji 9, szacowanej na połowę 2027. Aby przejść, trzeba opakować aplikację komponentem z Reacta w stałym layoucie i upewnić się, że nie wyłączono useTransitions w routerze.

Z niestabilnych funkcji najważniejszy jest tryb framework tylko dla API. Ustawienie ssr na unstable_api-only pozwala serwować statyczny HTML, na przykład z CDN, a jednocześnie zostawić działający serwer dla loaderów, akcji, rewalidacji i odkrywania tras. Prerenderowane strony hydratują się z danych z czasu budowania, a resztę łapie SPA jako fallback. Druga nowość to własne odkrywanie tras, z flagą i hookiem, które dają aplikacji kontrolę nad leniwym ładowaniem tras. Do tego dochodzi własny fetch dla routera w przeglądarce. Wszystko to oznaczone jako niestabilne, z prośbą o opinie w RFC.

**Key takeaways:**
- Własne API view transitions jest przestarzałe, usunięcie w wersji 9.
- Tryb api-only łączy statyczny HTML z działającym serwerem danych.
- Nowe API są niestabilne, nie wdrażaj ich w produkcji bez powodu.

**Why do I care:** Deprecjacja jest najłatwiejsza do przeoczenia, a skończy się ostrzeżeniami w konsoli za rok. Zaplanuj ją w następnym sprincie porządkowym. Tryb api-only to z kolei odpowiedź na pytanie, które zadawał prawie każdy klient z CDN, więc obserwowałbym RFC.

**Link:** [React Router changelog v8.5.0](https://reactrouter.com/changelog#v850)
