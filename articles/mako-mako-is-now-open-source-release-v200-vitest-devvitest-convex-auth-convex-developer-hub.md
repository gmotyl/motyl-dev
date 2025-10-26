---
title: 'Mako Mako Is Now Open Source Release V200 Vitest Devvitest Convex Auth Convex Developer Hub'
excerpt: 'Przegląd 5 artykułów z ui.dev'
publishedAt: '2024-07-11'
slug: 'mako-mako-is-now-open-source-release-v200-vitest-devvitest-convex-auth-convex-developer-hub'
hashtags: '#generated #pl #react #javascript #ai #frontend #backend'
---

## Mako - Mako is Now Open Source

Słuchajcie, ludzie z Ant Group właśnie wypuścili na świat coś, co może zmienić sposób, w jaki budujemy aplikacje frontendowe. Mako to nowe narzędzie do buildowania napisane w Ruście, które obiecuje być "ekstremalnie szybkie" i "production-grade". Nie jest to kolejny eksperyment - od listopada 2023 roku używają go w tysiącach projektów wewnętrznie w Ant Group.

Co sprawia, że Mako jest wyjątkowe? Po pierwsze, zespół nie próbował tylko zoptymalizować Webpack - stworzyli coś całkowicie nowego od podstaw. Rozpoczęli projekt w marcu 2023 z trzema developerami, którzy nie mieli wcześniej doświadczenia z Rustem. Do lipca mieli pierwszą działającą wersję, a do listopada była już używana produkcyjnie.

Dlaczego nie użyli istniejących rozwiązań jak Vite czy Turbopack? Powody są złożone - potrzebowali pełnej kontroli nad narzędziem, kompatybilności z wewnętrznymi potrzebami Ant Group, oraz wsparcia dla nowoczesnych meta-frameworków, szczególnie w scenariuszach SSR i RSC, gdzie potrzebne są nawet cztery różne buildy.

**Key takeaways:**
- Napisane w Ruście dla maksymalnej wydajności
- Przetestowane w produkcji na tysiącach projektów
- Wsparcie dla React, React Native, mini-programów
- Pełna kontrola nad procesem buildowania

**Link:** [link](https://makojs.dev/blog/mako-open-sourced)

## Release v2.0.0 · vitest-dev/vitest

Vitest 2.0 właśnie wylądował i to nie jest zwykła aktualizacja - to rewolucja w testowaniu JavaScript. Największą zmianą jest przejście z domyślnego pool'u "threads" na "forks" dla lepszej kompatybilności. Może to oznaczać, że testy będą nieco wolniejsze, ale znacznie bardziej stabilne.

Kolejna duża zmiana to aktualizacja Chai do wersji 5, co może wpłynąć na istniejące testy. Vitest przestał też automatycznie rozwijać Promise'y w spy.mock.returns - jeśli funkcja jest async lub zwraca Promise, zawsze będziesz mieć Promise w wynikach. Wprowadzili spy.mock.settledResults i matcher expect().toHaveResolved() żeby ułatwić migrację.

Coverage reporting został znacznie poprawiony - domyślnie włączyli coverage.ignoreEmptyLines, co może spowodować znaczące różnice w raportach coverage w porównaniu do v1, ale będą one bardziej dokładne.

Dodali też nowy API "vitest list" do wypisywania zebranych testów bez ich uruchamiania, oraz wsparcie dla concurrent suites, co może znacznie przyspieszyć wykonywanie testów.

**Key takeaways:**
- Domyślny pool zmieniony na 'forks' dla lepszej stabilności
- Aktualizacja Chai do v5 może wymagać zmian w testach
- Lepsze raportowanie coverage
- Nowe API do listowania testów
- Wsparcie dla concurrent suites

**Link:** [link](https://github.com/vitest-dev/vitest/releases/tag/v2.0.0)

## Convex Auth | Convex Developer Hub

Convex wypuścił nową bibliotekę do autentykacji, która pozwala implementować auth bezpośrednio w backendzie Convex. To oznacza, że nie potrzebujesz zewnętrznego serwisu autentykacji ani nawet serwera hostingowego. Twoja aplikacja może być React web app serwowana z CDN lub React Native mobile app.

Convex Auth wspiera Magic Links i OTP przez email, OAuth z GitHub, Google, Apple i innymi, oraz tradycyjne hasła z flow resetowania i opcjonalną weryfikacją email. Biblioteka nie zawiera gotowych komponentów UI, ale możesz skopiować kod z dokumentacji i przykładów.

Wsparcie dla Next.js server components, API routes, middleware i SSR jest w aktywnym developmencie. Jeśli chcesz pomóc testować eksperymentalne wsparcie, zespół Convex chce usłyszeć feedback na Discordzie.

Żeby zacząć nowy projekt, wystarczy uruchomić "npm create convex@latest" i wybrać React z Vite i Convex Auth. Dla istniejących projektów jest pełny setup guide.

**Key takeaways:**
- Autentykacja bezpośrednio w backendzie Convex
- Nie potrzeba zewnętrznych serwisów ani serwerów
- Wsparcie dla Magic Links, OAuth, haseł
- Eksperymentalne wsparcie dla Next.js w developmencie

**Link:** [link](https://docs.convex.dev/auth/convex-auth)

## Reverse Engineering TicketMaster's Rotating Barcodes (SafeTix)

To jest absolutnie fascynująca historia o tym, jak ktoś postanowił zbadać rotating barcodes TicketMaster'a zwane SafeTix. Autor kupił bilety na koncert i zamiast normalnych, drukowalnych PDF-ów dostał "Mobile Entry" - system z rotating barcode'ami w web appie lub mobilnej aplikacji.

Problem z tymi rotating barcode'ami stał się jasny, gdy autor poszedł na poprzedni koncert. Venue było tak zatłoczone, że cell towers i WiFi były przeciążone. Ludzie nie mogli załadować swoich QR kodów, bo nie mieli internetu. Za trzysta dolarów dostali high-tech experience polegający na machaniu telefonami w powietrzu, żeby złapać zasięg.

TicketMaster marketuje SafeTix jako rozwiązanie na scammerów i scalperów, twierdząc, że barcode odświeża się co kilka sekund i nie może być skradziony ani skopiowany. Ale autor postanowił to sprawdzić używając Chrome DevTools.

Artykuł szczegółowo opisuje proces reverse engineeringu - jak działają te rotating barcodes, jak są generowane, i czy rzeczywiście są tak bezpieczne, jak twierdzi TicketMaster. To świetny przykład tego, jak technologia, która ma rozwiązać jeden problem, tworzy całą masę nowych problemów dla użytkowników końcowych.

**Key takeaways:**
- SafeTix wymaga stałego połączenia internetowego
- System może zawieść w zatłoczonych miejscach
- Reverse engineering pokazuje rzeczywiste mechanizmy bezpieczeństwa
- Tradycyjne PDF bilety były często bardziej niezawodne

**Link:** [link](https://conduition.io/coding/ticketmaster/)

## Fog of War

Remix wprowadza nową funkcję o nazwie "Fog of War" (znana też jako "Lazy Route Discovery"), która ma pomóc aplikacjom pozostać wydajnymi bez względu na to, jak bardzo urosną. To kolejny krok w eliminowaniu network waterfalls, które są głównym wrogiem wydajności w aplikacjach webowych.

Remix od zawsze był zaprojektowany tak, żeby unikać "render then fetch" waterfalls, oddzielając rendering od fetchowania danych. Żeby to działało, Remix musi znać drzewo route'ów z góry, co pozwala mu rozpocząć pobieranie danych i ładowanie modułów route'ów równolegle, gdy klikniesz link.

Tradycyjnie Remix wysyłał Route Manifest do klienta zawierający wszystkie definicje route'ów plus metadane. To pozwalało Remixowi zbudować client-side route tree bez dołączania implementacji route'ów. Te implementacje były ładowane przez route.lazy gdy użytkownik nawigował do route'a.

Fog of War to następny poziom - zamiast wysyłać cały manifest, Remix może teraz dynamicznie odkrywać route'y w miarę potrzeb. To oznacza, że nawet ogromne aplikacje z setkami route'ów mogą mieć szybki initial load, bo klient nie musi znać wszystkich możliwych ścieżek od razu.

**Key takeaways:**
- Eliminuje potrzebę wysyłania pełnego route manifestu
- Pozwala aplikacjom skalować się bez wpływu na initial load
- Dynamiczne odkrywanie route'ów w miarę potrzeb
- Kolejny krok w eliminowaniu network waterfalls

**Link:** [link](https://remix.run/blog/fog-of-war)