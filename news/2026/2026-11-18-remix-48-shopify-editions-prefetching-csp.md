---
title: "Remix Newsletter #48: Shopify Editions na Remix 3, prefetching i Content Security Policy"
excerpt: "Shopify zbudowało Editions Fall '26 na Remix 3 zamiast Reacta, a wersje 3.1 i 3.2 dodają prefetching linków oraz middleware CSP."
publishedAt: "2026-11-17"
slug: "remix-48-shopify-editions-prefetching-csp"
hashtags: "#remix #react-router #shopify #frontend #security #performance #ssr #generated #pl"
source_pattern: "Remix newsletter"
---

## Shopify Editions Fall '26 zbudowane na Remix 3

**TLDR:** Pierwsza strona Shopify Editions zbudowana na Remix 3 zamiast na Reakcie pokazuje, jak wygląda podejście bliższe przeglądarce. Zespół chciał mniej re-renderów, mniej hydratacji i mniej JavaScriptu.

**Summary:** Strona Editions to interaktywne historie, animacje i 3D, które muszą działać płynnie na każdym urządzeniu. Zespół użył wysp, więc strona renderuje się jako HTML, a tylko interaktywne fragmenty dostają własny kod i tylko potrzebne dane. Małe "mikrohistorie" ładują się osobno przez ramki, a te poniżej widoku dopiero przy przewijaniu. Animacje powstają w Figmie, a własna wtyczka kompiluje sceny do HTML i keyframe'ów CSS. W porównaniu z tą samą historią w Rive była gotowa o 38 procent szybciej i pobierała o 33 procent mniej danych.

Wersja 3.1 dodaje prefetching linków. Wystarczy oznaczyć link atrybutem, a Remix wczytuje stronę w tle. Tryb intent robi to po stu milisekundach najechania lub fokusu, a tryb viewport, gdy link pojawi się na ekranie. Remix czyta stronę bez jej wykonywania i pobiera też skrypty, style, obrazy i fonty. Nie dodaje własnego cache'u, więc nagłówki Cache-Control nadal decydują. Prefetching pomija użytkowników z włączonym Save-Data i połączeniami 2G.

Wersja 3.2 wprowadza middleware dla Content Security Policy. Trudna część nonce'ów, czyli dodanie ich do import map, preloadów, stylów inline i nawigacji po stronie klienta, jest obsłużona. Działa też HMR bez unsafe-eval i stopniowe wdrażanie przez tryb tylko raportujący. Poza tym renderowanie serwerowe jest około dwa razy szybsze, a strumieniowe uploady oszczędzają pamięć: sto megabajtów dodaje 29 MiB szczytu zamiast 396. Wyszło też React Router 8.5.1.

**Key takeaways:**
- Wyspy i ramki pozwalają ładować tylko to, co interaktywne.
- Prefetching jest opt-in i szanuje Save-Data.
- Middleware CSP zdejmuje z ręki najbardziej bolesną część ścisłych polityk.
- Strumieniowe uploady mocno zmniejszają zużycie pamięci, ale to jeszcze API unstable.

**Why do I care:** Za dużo tu marketingu własnego produktu, bo porównania z Rive czy Reactem pochodzą od samych autorów. Mimo to CSP z nonce'ami i prefetching oparty na intencji to rzeczy, które każdy zespół frontendowy chciałby mieć gotowe. Warto przeczytać opis implementacji, nawet jeśli nie planujecie migracji z Reacta.

**Link:** [Remix Newsletter #48](https://remix.run)
