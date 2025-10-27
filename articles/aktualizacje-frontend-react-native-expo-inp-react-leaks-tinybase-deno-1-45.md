---
title: "Aktualizacje frontendowe: React Native wspiera Expo, React rekomenduje frameworki, INP, wycieki pamięci w React, TinyBase i Deno 1.45"
excerpt: "Przegląd ważnych tematów dla frontendowców: oficjalne rekomendacje frameworków dla React i React Native, optymalizacja INP, szczeliny pamięci związane z closures w React, oraz aktualizacje TinyBase i Deno."
publishedAt: "2025-10-27"
slug: "aktualizacje-frontend-react-native-expo-inp-react-leaks-tinybase-deno-1-45"
hashtags: "#generated #pl #frontend #react #react-native #expo #typescript #deno #tinybase #inp #performance #architecture #react-compiler #memory-leaks #nextjs #react-router #tanstack-start #redwoodjs"
---

## Bytes #306 — React Native makes it official
**TLDR:** Zespół React Native oficjalnie rekomenduje użycie frameworków — z Expo jako domyślnym wyborem — tłumacząc to tym, że bez frameworka budujesz własny framework. Dla większości projektów Expo upraszcza dostęp do natywnych API, routing i zarządzanie kodem natywnym, choć duże organizacje nadal mogą potrzebować własnych, głębiej zintegrowanych rozwiązań.

**Summary:**  
W najnowszym wydaniu Bytes autor omawia komunikat React Native: używaj frameworku do nowych projektów RN, a w praktyce oznacza to Expo jako rekomendowaną ścieżkę. Powód jest prosty i architektoniczny — budowanie apki natywnej pociąga za sobą powtarzalne problemy (dostęp do natywnych możliwości, routing, kompatybilność zależności, buildy natywne), które framework robi raz i dobrze. To przesuwa ciężar rozwiązywania tych problemów z zespołów aplikacyjnych na społeczność i narzędzia.

Expo pełni rolę "poszerzonej biblioteki standardowej" dla RN: oferuje gotowe moduły natywne, ułatwienia przy tworzeniu własnych modułów, router plikowy dla wieloplatformowego routingu i mechanizmy ułatwiające utrzymanie kodu natywnego (Continuous Native Generation). Dla większości zespołów oznacza to szybszy start, mniej gotcha przy aktualizacjach i lepsze tempo dostarczania.

To nie jest jednak argument absolutny. Duże firmy z istniejącą infrastrukturą lub szczególnymi wymaganiami będą nadal budować własne warstwy — czasem z konieczności, czasem z powodów integracyjnych. Warto postawić pytanie architektoniczne: czy twoja domena ma wystarczające, długoterminowe potrzeby, by utrzymywać własny "framework", czy lepiej korzystać z istniejącego, dobrze rozwiniętego ekosystemu.

**Key takeaways:**
- Expo stało się de facto rekomendacją dla większości nowych aplikacji React Native.
- Frameworki eliminują dużo pracy powtarzalnej: natywne API, routing i upgrade'y.
- Własne frameworki wciąż mają sens przy silnych wymaganiach enterprise lub deep integration.

**Link:** [Bytes #306 — React Native makes it official](https://bytes.dev/archives/306)

---

## Use a framework to build React Native apps · React Native
**TLDR:** Oficjalny blog React Native formalizuje rekomendację: najlepszy sposób na budowę nowych aplikacji RN to framework (np. Expo). Framework dostarcza "toolbox" rozwiązań produkcyjnych i pozwala zespołom skupić się na funkcjach, a nie na infrastrukturze.

**Summary:**  
Post z oficjalnego bloga klarownie rozbija, czym jest framework dla React Native: to nie tylko biblioteka, to zestaw narzędzi rozwiązujących powtarzalne, niskopoziomowe problemy — od routingu, przez dostęp do natywnych API, po narzędzia do upgrade'ów i kompatybilności zależności. Autorzy argumentują, że programiści albo korzystają z takiego frameworka, albo nieświadomie budują własny.

Expo jest wskazywane jako jedyny rekomendowany społecznościowy framework. Ekosystem Expo dostarcza SDK z wieloma gotowymi bibliotekami, Expo Router dla plikowego routingu wieloplatformowego oraz narzędzia do zarządzania kodem natywnym i ciągłymi buildami. Expo pozostaje open-source; usługi chmurowe (EAS) są opcjonalne i płatne.

Dla zespołów, które mają już istniejący, złożony, natywny stack lub wymagają niestandardowej integracji, budowa własnego frameworka nadal ma sens. Blog podaje też praktyczne ścieżki: jeśli zaczynasz, wybierz framework; jeśli masz historię i specyficzne potrzeby, rozważ migrację z rozwagą.

**Key takeaways:**
- Frameworki oferują gotowe rozwiązania dla typowych problemów RN i przyspieszają dostarczanie.
- Expo jest obecnie rekomendowanym wyborem społecznościowym.
- Migracja z "czystego" RN do frameworka jest możliwa, ale wymaga oceny kosztów integracji.

**Link:** [Use a framework to build React Native apps · React Native](https://reactnative.dev/blog/2024/06/25/use-a-framework-to-build-react-native-apps)

---

## Creating a React App — React
**TLDR:** Dokumentacja React zachęca do rozpoczynania nowych projektów od frameworku — to przyspiesza pracę i daje gotowe modele wdrożenia — ale nadal pozostawia możliwość stworzenia aplikacji "od zera" dla specyficznych potrzeb lub nauki. W praktyce wybór frameworku wpływa na sposób renderowania, deployment i skalowanie.

**Summary:**  
Strona "Creating a React App" rozróżnia dwie drogi: skorzystać z frameworka produkcyjnego lub zbudować aplikację od podstaw. Współczesne frameworki (Next.js, React Router w konfiguracji frameworkowej, Expo) wspierają model full-stack bez konieczności posiadania serwera, oferując CSR, SSG i możliwość opt-in dla SSR na poziomie pojedynczych tras. To daje dużą elastyczność: zaczynasz od prostego klienta, a w miarę potrzeb możesz dodać funkcje serwerowe.

Next.js (App Router) jest przykładem frameworka pełnego stosu, zoptymalizowanego pod React. React Router v7 pokazuje, że nawet biblioteka routingu może być częścią szerszego frameworka, jeśli zintegrujesz ją z narzędziami do bundlingu i serwowania. Expo jest wymienione jako rekomendacja dla aplikacji natywnych, a nowe projekty takie jak TanStack Start czy RedwoodJS pokazują kierunek: więcej narzędzi integrujących routing, SSR i funkcje serwerowe.

Decyzja projektowa powinna uwzględniać: potrzeby renderowania, wymagania SEO, model deploymentu, oraz koszty utrzymania. Frameworki ułatwiają te decyzje, ale czasem ograniczają elastyczność — warto rozważyć kompromisy zanim podejmiesz decyzję.

**Key takeaways:**
- Frameworki upraszczają wdrożenie i skalowanie aplikacji React, oferując gotowe strategie renderowania.
- Możesz zacząć bez frameworka, ale wiąże się to z koniecznością zaimplementowania wielu elementów infrastruktury.
- Wybór frameworka powinien odpowiadać potrzebom w zakresie SSR/CSR/SSG, SEO i operacji.

**Link:** [Creating a React App — React](https://react.dev/learn/start-a-new-react-project)

---

## Sneaky React Memory Leaks: How the React compiler won't save you
**TLDR:** Kompilator React będzie cache'ował wartości niezależne od zewnętrznych zmiennych, co eliminuje pewien rodzaj wycieków spowodowanych zamknięciami. Nie rozwiązuje jednak problemów, gdy closures zależą od zmiennych z zewnątrz — nadal trzeba projektować kod tak, by nie utrzymywać niepotrzebnie dużych obiektów w zasięgu zamknięć.

**Summary:**  
Autor przypomina podstawowy mechanizm prowadzący do "wycieków pamięci" w kodzie funkcyjnym: zamknięcia (closures) uchwytują kontekst komponentu, a memoizowane funkcje mogą utrzymywać odniesienia do całego obiektu kontekstowego, nawet jeśli tylko część z niego jest używana. To staje się realnym problemem, jeśli część kontekstu zawiera duże struktury danych.

Reakcja zespołu React była taka, że kompilator może cache'ować wartości nie zależne od zewnętrznych danych, co zapobiega ich niekończącym się realokacjom. Jednak kompilator nie jest lekarstwem na przypadki, gdzie zamknięcia wiążą się z mutowalnymi lub zmiennymi danymi — te przypadki dalej będą utrzymywać odniesienia i zwiększać zużycie pamięci.

Praktyczne implikacje: projektując komponenty, trzeba rozważać gdzie trzymane są duże dane i jakie funkcje je referują. Przeniesienie ciężkich struktur poza zakres funkcji komponentu, użycie refów, lub rozbicie logiki na mniejsze jednostki może zminimalizować ryzyko. Autor także wskazuje na złożenia łańcuchów memoizacji (useCallback/useMemo) i jak ich nieostrożne użycie może tworzyć długie drzewa zależności utrzymujących niepotrzebne odniesienia.

Ostateczny wniosek jest pragmatyczny: narzędzia (kompilator) pomagają, ale nie zastępują projektowania pamięciooszczędnego. Trzeba profilować aplikacje, szukać gorących miejsc i ograniczać zakres zamknięć.

**Key takeaways:**
- React compiler cache'uje absolutnie stałe wartości, ale nie rozwiązuje wszystkich problemów z closures.
- Duże obiekty trzymane w kontekście komponentu mogą być nieświadomie utrzymywane przez memoizowane funkcje.
- Projektuj komponenty tak, by minimalizować zakres zamknięć i profiluj pamięć w newralgicznych miejscach.

**Link:** [Sneaky React Memory Leaks: How the React compiler won't save you](https://schiener.io/2024-07-07/react-closures-compiler)

---

## How To Improve INP: Yield Patterns
**TLDR:** Artykuł opisuje wzorce "yieldowania" (ustępowania) głównego wątku, które poprawiają Interaction-to-Next-Paint — kluczowy element UX i Core Web Vitals. Skupia się na praktycznych strategiach, kiedy i jak przepuścić przetwarzanie, by pierwsze obrazy i reakcje były szybciej malowane.

**Summary:**  
INP mierzy doświadczenie użytkownika związane z interakcjami — kluczowe są trzy fazy: input delay, processing time i presentation delay. Autor skupia się głównie na skróceniu czasu przetwarzania, dając przeglądarce szansę na malowanie najszybciej jak to możliwe. Ogólna zasada: priorytetyzuj pracę, która wpływa na widoczną część UI i odsuwaj prace poboczne, takie jak analityka.

W praktyce opisane są wzorce i API: await-interaction-response, yieldToMain i yieldUnlessUrgent — różne podejścia do ustępowania. Artykuł omawia także konkretne przypadki użycia: gdy odroczyć history.pushState, kiedy opóźnić duże zmiany DOM, jak traktować aktualizacje CSS variables, i jakie podejście stosować przy dynamicznych importach modułów. Praktyczne wskazówki pomagają zdecydować, kiedy warto wstrzymać się przed długimi zadaniami, a kiedy je pociąć.

Mierzenie problemów polega na RUM i narzędziach devtools; tylko obserwacja realnego ruchu pozwala znaleźć, gdzie INP cierpi. Część druga serii koncentruje się na reakcji React 18 i jej wpływie na INP — warto czytać oba materiały razem, bo React ma swoje własne mechanizmy współbieżności, które trzeba rozumieć względem wzorców yieldowania.

**Key takeaways:**
- INP wymaga umożliwienia przeglądarce szybkiego malowania; "ustąpienie" głównego wątku jest kluczowe.
- Deferuj zadania niewidoczne (analityka) i przerywaj długie taski tam, gdzie to możliwe.
- Profiluj rzeczywiste interakcje za pomocą RUM/DevTools i stosuj wzorce yieldowania adekwatne do przypadku.

**Link:** [How To Improve INP: Yield Patterns](https://kurtextrem.de/posts/improve-inp)

---

## Deno 1.45: Workspace and Monorepo Support
**TLDR:** Deno 1.45 wprowadza workspaces, co znacznie ułatwia pracę z monorepo — konfiguracje można dzielić, a jednocześnie mieszać projekty npm i Deno. Dodatkowo pojawiły się ulepszenia kompatybilności z Node.js i inne usprawnienia rozwojowe.

**Summary:**  
Ta wersja Deno to krok w kierunku lepszej obsługi dużych codebase'ów: workspaces definiowane w deno.json pozwalają na centralne ustawienia, które stosują się do członków workspace'u, z możliwością lokalnego nadpisania. Co ważne, Deno umożliwia też współistnienie npm workspaces i Deno workspaces, pomagając w migracjach i hybrydowych repozytoriach.

Poprawiono kompatybilność z Node.js — w tym Node-API — co rozwiązuje wiele problemów z bibliotekami takimi jak prisma czy sqlite3. Deno dodał też wygodniejsze komendy i flagi: deno init --lib ułatwia tworzenie bibliotek, pojawił się frozen lockfile, a deno compile zyskał flagę --env. De‑rekomendowane zostało deno vendor.

Dla architektów i zespołów oznacza to, że Deno jest coraz bardziej praktyczny w kontekście monorepo i wielotimetowych projektów: łatwiejsze zarządzanie konfiguracją, lepsze wsparcie dla istniejących paczek Node oraz narzędzia pomagające tworzyć biblioteki i CI. Istotne też są aktualizacje silnika V8 i TypeScript, co wpływa na wydajność i zgodność języka.

**Key takeaways:**
- Workspaces w Deno ułatwiają zarządzanie monorepo i współdzielenie konfiguracji.
- Ulepszona kompatybilność z Node.js czyni Deno bardziej praktycznym wyborem hybrydowym.
- Nowe narzędzia (deno init --lib, frozen lockfile) wspierają rozwój bibliotek i stabilność buildów.

**Link:** [Deno 1.45: Workspace and Monorepo Support | Deno](https://deno.com/blog/v1.45)

---

## Releases | TinyBase
**TLDR:** TinyBase kontynuuje rozwój z kilkoma istotnymi wydaniami: najnowsze v6.7 wprowadza wsparcie dla OPFS w przeglądarkach, a wcześniejsze aktualizacje dodały lepszy Inspector oraz persistery dla React Native (MMKV i SQLite), co rozszerza zastosowania TinyBase na urządzenia mobilne i offline.

**Summary:**  
TinyBase rozwija się przede wszystkim jako lekki, obserwowalny lokalny store. W v6.7 pojawiło się wsparcie dla Origin Private File System (OPFS), co pozwala zapisywać stan store'u bezpośrednio w sandboxowanym systemie plików przeglądarki. Autorzy zaznaczają jednak, że obserwowalność OPFS nie jest jeszcze w pełni ustandaryzowana, więc automatyczne ładowanie może działać z ograniczeniami.

Wcześniejsze wydania skupiły się na doświadczeniu dewelopera — Inspector zyskuje możliwość edycji tabel, wierszy i wartości w czasie rzeczywistym oraz nowoczesny UI ułatwiający debugowanie. Dodatkowo dodano persistery dla React Native: integrację z MMKV oraz SQLite, co czyni TinyBase atrakcyjnym wyborem dla aplikacji mobilnych, które potrzebują szybkiego, trwałego i łatwego w użyciu lokalnego stanu.

To ma praktyczne znaczenie: jeśli budujesz aplikację z offline-first, potrzebujesz przetrwałego, obserwowalnego store'u, a TinyBase teraz oferuje opcje zapisu odpowiednie dla przeglądarek i natywnych platform. Deweloperzy zyskują też lepsze narzędzia do inspekcji i manipulacji danymi podczas developmentu.

**Key takeaways:**
- OPFS w v6.7 umożliwia trwały zapis store'u w przeglądarce, ale ma ograniczenia obserwowalności.
- Persistery dla React Native (MMKV, SQLite) rozszerzają zastosowania TinyBase na mobile i offline.
- Ulepszony Inspector poprawia DX, ułatwiając debugowanie i ręczne modyfikacje store'u w czasie developmentu.

**Link:** [Releases | TinyBase](https://tinybase.org/guides/releases/)