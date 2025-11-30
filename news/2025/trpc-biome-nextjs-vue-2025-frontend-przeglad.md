---
title: "Przegląd technologii frontendowych: tRPC v11, Biome v2, luka w Next.js, Vue 2025 i praktyczne wzorce"
excerpt: "Tygodniowy przegląd: nowe wersje narzędzi (tRPC, Biome), postmortem Next.js, raport Vue 2025 oraz praktyczne eseje o undo stack, CSS mixins i rynku pracy frontendowego."
publishedAt: "2025-03-28"
slug: "trpc-biome-nextjs-vue-2025-frontend-przeglad"
hashtags: "#generated #pl #frontend #react #typescript #trpc #biome #nextjs #vue #css #sentry #architecture"
---

## Bytes #379 - tRPC rhymes with tipsy
**TLDR:** Krótki, energetyczny przegląd: tRPC rośnie i wypuszcza v11 z obsługą non‑JSON, integracją TanStack Query i streamingu, Biome v2 beta dodaje linter plugins i multi‑file analysis, a Next.js publikuje postmortem poważnej luki. Autor celebruje prostotę narzędzi, ale też robi show — warto rozróżnić hałas od realnych konsekwencji.

Summary:
Bytes #379 to typowy pulpit trendów — szybkie notatki o tym, co się dzieje: tRPC v11 jako symbol dojrzewania projektu, Biome v2 beta z pierwszymi pluginami lintującymi oraz postmortem Next.js opisujące incydent z middleware bypass. Ton jest lekki i sceptyczny zarazem: autor lubi grać na prowokacji, ale przekazuje użyteczne fakty i linki do źródeł.

W kontekście tRPC nacisk pada na prostotę i ergonomię: non‑JSON payloads (FormData, binaria), natywna integracja z TanStack Query i nowe linki umożliwiające streaming odpowiedzi. To realne ulepszenia dla aplikacji pełnych plików, dużych wyników i interakcji typu subscription bez WebSocketów. Biome z kolei przyspiesza drogę do bardziej zintegrowanego narzędzia lintującego: domeny reguł, multi‑file analysis i eksperymentalne reguły zależne od typów to cechy, które mogą powoli konkurować z ESLint + TypeScript‑ESLint.

Autor jednak pomija albo spłaszcza kilka ważnych zagadnień: nie ma głębszej dyskusji o tym, jak tRPC wpływa na kontrakty API i rozgraniczenie odpowiedzialności między frontendem a backendem; nie poruszono kosztów przetestowania i wersjonowania API opartego na typach wygenerowanych po obu stronach. W przypadku Biome brakuje porównania wydajnościowego z istniejącymi toolami lintingowymi i omówienia migracji dużych repozytoriów.

Dla architektów i zespołów: traktujcie tRPC jako ciekawy sposób na zwiększenie ergonomii developerów, ale nie zastępujcie procesu projektowania API. Biome może uprościć polityki lintowania i konsystencję kodu, ale wymaga planu migracji i obserwacji wpływu na CI. Postmortem Next.js to przypomnienie: model hostingu i sposób, w jaki routing jest rozdzielony, ma realny wpływ na to, czy luka staje się widoczna w produkcji.

Key takeaways:
- tRPC v11 to ewolucja ergonomii: obsługa non‑JSON, streaming i lepsza integracja z TanStack Query.
- Biome v2 beta kładzie fundamenty pod potężniejsze reguły lintujące i multi‑file analysis.
- Incydent z Next.js pokazuje, że sposób hostingu i architektura routera decydują o ekspozycji podatności.

Tradeoffs:
- "tRPC daje mniej boilerplate i typową ergonomię, ale kosztem silniejszego powiązania klient‑serwer i trudniejszego wersjonowania API."

Link: [Bytes #379 - tRPC rhymes with tipsy](https://bytes.dev/archives/379)

---

## Announcing tRPC v11 | tRPC
**TLDR:** tRPC v11 to głównie kompatybilne uaktualnienie: wsparcie TanStack Query v5, natywna integracja z TanStack React Query, obsługa FormData i binarnych treści oraz mechanizmy streamingu i SSE. To dalsze przesunięcie projektu od eksperymentu do produkcyjnego standardu dla TypeScript‑centric full‑stacków.

Summary:
Oficjalny wpis o tRPC v11 podkreśla metryki wzrostu społeczności i stabilność, a także kluczowe funkcje: wsparcie dla TanStack Query v5 (czyli sprawniejsza integracja z React Query/TanStack Query), non‑JSON payloads (FormData, Blob, Uint8Array), httpBatchStreamLink do streamingu oraz Server‑Sent Events dla subskrypcji. To zestaw, który otwiera tRPC na przypadki użycia wymagające przesyłania plików i pracy z dużymi wynikami bez konieczności rezygnacji z typów.

Autorzy stawiają na kompatybilność wsteczną i migrację stopniową, co jest istotne dla adopcji w dużych projektach. Jednocześnie warto zauważyć: w tekście jest mało o aspektach bezpieczeństwa, testowalności i rozproszeniu odpowiedzialności. Kiedy klient i serwer dzielą jeden typowy model, drift typów może być trudniejszy do wykrycia, a operacje typu streaming czy binaria wprowadzają nowe klasy błędów — od zarządzania pamięcią po backpressure.

W praktyce zespoły, które już korzystają z TypeScript i TanStack Query, mogą zyskać sporą ergonomię. Architekci powinni jednak wymusić jasne kontrakty, wersjonowanie endpointów i strategie testowania e2e, bo typy same w sobie nie zastąpią umowy interfejsu i rutyn ręcznego testowania scenariuszy edge‑case’ów.

Key takeaways:
- tRPC v11 ułatwia przesyłanie plików i binarnych danych oraz integruje się lepiej z TanStack Query.
- Streaming odpowiedzi i SSE poszerzają przypadki użycia bez konieczności WebSocketów.
- Migracja powinna być planowana: typy to ergonomia, nie zastępstwo dla formalnych kontraktów i testów.

Tradeoffs:
- "tRPC zwiększa produktywność dzięki silnym typom, ale kosztem większego sprzężenia klient‑serwer i wymogu staranniejszego zarządzania wersjami API."

Link: [Announcing tRPC v11](https://trpc.io/blog/announcing-trpc-v11)

---

## Biome v2.0 beta
**TLDR:** Biome 2.0 beta wprowadza linter plugins, multi‑file analysis, domeny reguł, eksperymentalne reguły zależne od typów i nowy formatter HTML — próba bycia jednym narzędziem do formatowania i lintowania z większą świadomością kontekstu projektu.

Summary:
Biome v2 stara się być czymś więcej niż kolejnym linterem: domeny pozwalają grupować reguły według technologii (React, Next.js, Solid, testy), multi‑file analysis pozwala regułom patrzeć poza pojedynczy plik, a linter plugins oferują pierwszy krok do definiowania własnych detekcji kodu. To kierunek, w którym chcemy, aby reguły były bardziej kontekstowe — np. włączać tylko reguły istotne dla Next.js, jeśli projekt go używa.

To jednocześnie pierwsza próba Biome wprowadzenia type‑aware reguł (noFloatingPromises jako proof‑of‑concept) oraz usprawnień w organizacji importów i suppressions. Dla autorów narzędzia to ambitne posunięcie — integracja typów i multi‑file analysis może znacznie poprawić jakość wykrywania antypatternów, ale podnosi także koszt obliczeniowy i złożoność implementacji.

Czego autor nie mówi wprost: jak Biome poradzi sobie w dużych monorepo, jak wygląda jego kompatybilność z istniejącymi akcjami CI i pluginami VS Code, oraz jakie są plany interoperacyjności z ESLint ekosystemem. To kluczowe dla przyjęcia przez zespoły, które już mają skomplikowane pipeline’y.

Dla architektów i zespołów: rozważcie Biome jako uzupełnienie lub następny krok do konsolidacji reguł lintowania i formatowania, ale przetestujcie wydajność i integracje w waszym CI. Domeny reguł mogą uprościć onboarding i zmniejszyć hałas w regułach, co jest realnym UX‑owym zyskiem.

Key takeaways:
- Biome 2.0 beta daje domeny reguł, multi‑file analysis i pierwsze type‑aware reguły.
- Linter plugins otwierają drzwi do własnych detekcji, ale są jeszcze ograniczone.
- Migracja wymaga testów wydajnościowych i sprawdzenia kompatybilności z istniejącym toolingiem.

Tradeoffs:
- "Konsolidacja lintowania w Biome daje spójność i nowe możliwości (type‑aware rules), ale kosztem wyzwań integracyjnych i potencjalnie większego obciążenia CI."

Link: [Biome v2.0 beta](https://biomejs.dev/blog/biome-v2-0-beta)

---

## Postmortem on Next.js Middleware bypass - Vercel
**TLDR:** Next.js opublikował postmortem krytycznej luki (CVE‑2025‑29927) — luka ujawniona stopniowo, naprawa polega na walidacji nagłówka x‑middleware‑subrequest i filtracji. Incydent ujawnia luki w procesie triage i skomplikowane zależności między środowiskami hostingu.

Summary:
Postmortem opisuje przebieg zgłoszeń od końca lutego do half‑resolution w połowie marca. Początkowe zgłoszenie wskazywało na starsze wersje, co obniżyło priorytet triage. Przy rozszerzeniu zakresu i potwierdzeniu wpływu na nowsze wersje zespół Next.js przygotował łaty, publikując poprawki dla wersji 14.x i 15.x oraz rekomendacje obejściowe (filtrowanie nagłówka przed serwerem Next.js).

To co warto wyciągnąć: architektura deploymentu decyduje o ekspozycji. Vercel, dzięki rozdzielonej globalnej warstwie routingu, nie został dotknięty — natomiast self‑hosted next start i output: 'standalone' były narażone. Równie istotne jest opóźnienie w triage wynikające z początkowego zasięgu zgłoszenia i braków w polityce LTS dla starszych wydań.

Autorzy dokumentują kroki naprawcze i sugerują mechanizmy ograniczające - walidacja nagłówków, filtry — ale nie rozwodzą się nad głębszymi przyczynami ludzkimi: dlaczego początkowe zgłoszenie zostało nisko priorytetyzowane, jakie są luki w procesie niejawnego zgłaszania podatności, i jak zapewnić szybszą eskalację w przyszłości.

Dla architektów: to przypomnienie, że model hostowania i infrastruktury zmienia profil ryzyka. Jeśli self‑hostujecie Next.js musicie uważać na dodatkowe warstwy sieciowe i szybko wdrażać filtry na krańcach (edge) lub przy proxy. Również polityka wsparcia LTS i jasne ścieżki patchowania powinny być częścią kontraktu operacyjnego.

Key takeaways:
- Luka występowała głównie w self‑hosted scenariuszach; Vercel był odporny dzięki oddzieleniu routingu.
- Naprawa polegała na walidacji i filtrowaniu nagłówka x‑middleware‑subrequest.
- Triage i LTS policy są krytyczne — opóźnienia w eskalacji zwiększają ryzyko.

Tradeoffs:
- "Walidacja nagłówków zamyka lukę, ale wymaga aktualizacji aplikacji i proxy; czyli bezpieczeństwo za kompatybilność i pracę operacyjną."

Link: [Postmortem on Next.js Middleware bypass](https://vercel.com/blog/postmortem-on-next-js-middleware-bypass)

---

## The State of Vue.js Report 2025 | Co-created with Vue & Nuxt Core Teams
**TLDR:** Obszerny raport o stanie Vue i Nuxt — plany na reactivity refactor w 3.6, Vapor Mode eksperymentalnie i nacisk na zgodność. Zawiera wyniki ankiety i case studies, ale Vapor Mode będzie trudnym elementem migracji.

Summary:
Raport pokazuje, że Vue przechodzi kolejną fazę dojrzewania: reactivity refactor (prace Johna Chua nad "alien signals") ma zostać przeniesiony do Vue 3.6, co może zmienić model wydajności i zachowania reaktywności. Vapor Mode, w skrócie, to próba wprowadzenia innego runtime’u z lepszą wydajnością — dostępnego eksperymentalnie na poziomie komponentu w 3.6. To duże zmiany, bo inny runtime oznacza wymaganie zachowania kompatybilności zachowań i API.

Raport zawiera też wyniki ankiety i 16 studiów przypadku od firm, które używają Vue i Nuxt. To cenne jako dowód dojrzałości ekosystemu i realnych zastosowań, ale jednocześnie trzeba pamiętać: case studies to najlepsze przypadki. Nie widzimy tu twardych benchmarków na różnych typach aplikacji ani planu migracji dla dużych systemów złożonych z wielu paczek.

Autorzy podkreślają, że kompatybilność jest priorytetem, ale unikają szczegółów technicznych: jak dokładnie będzie zachowywać się API w trybie Vapor, jakie są koszty debugowania hybrydowych aplikacji i jak narzędzia debugujące poradzą sobie z dwoma runtime’ami. To są właśnie pytania, które architekci powinni zadać zanim wprowadzą Vapor w produkcji.

Dla zespołów: obserwujcie rozwój 3.6, testujcie Vapor Mode na małych komponentach i planujcie strategię migracji. Jeżeli business wymaga przewidywalnych zachowań i niskiego kosztu utrzymania, wprowadzanie eksperymentalnego runtime’u bez jasnego planu obsługi regresji to ryzyko.

Key takeaways:
- Vue 3.6 wprowadza reactivity refactor i eksperymentalny Vapor Mode.
- Kompatybilność jest celem, ale migracja i debugowanie mogą być skomplikowane.
- Case studies potwierdzają dojrzałość ekosystemu, ale nie zastąpią testów wydajnościowych.

Tradeoffs:
- "Vapor Mode może poprawić wydajność (gain) ale utrudnić kompatybilność i debugowanie (sacrifice)."

Link: [State of Vue.js Report 2025](https://www.monterail.com/stateofvue)

---

## Instrument, monitor, fix: a hands-on debugging session (Sentry)
**TLDR:** Warsztat Sentry pokazuje end‑to‑end: konfiguracja Errors, Session Replay, Tracing, użycie Replays i Tracing do diagnozy oraz testy z Autofix i Sentry AI. Dobra demonstracja, ale wymaga krytycznego podejścia do prywatności i zaufania do automatycznych poprawek.

Summary:
Materiał jest praktycznym przewodnikiem: jak skonfigurować Sentry w aplikacji Next.js, jak używać Session Replay do zrozumienia UX i Tracing do odnalezienia źródła problemów. Co więcej, pokazuje integrację z Sentry AI i Autofix, które mogą automatycznie sugerować rozwiązań i nawet generować PR. To atrakcyjne, bo pozwala skrócić czas od błędu do naprawy.

Jest jednak kilka pominiętych tematów: narzędzia typu Session Replay nagrywają interakcje użytkownika — to rodzi pytania o prywatność i zgodność z politykami danych. Automatyczne naprawy sugerowane przez AI brzmią kusząco, ale powinny przechodzić przez code review — istnieje ryzyko wprowadzenia regresji lub naruszenia stylu architektonicznego przez "magiczne" poprawki.

Dla zespołów: Sentry jest potężnym narzędziem do skrócenia pętli feedbacku. Ustalcie polityki redagowania/anonimizacji replays, definiujcie progi zaufania dla Autofix i integrujcie sugestie AI tylko za aprobatą dewelopera. Mierzenie kosztu instrumentacji (overhead) powinno być częścią decyzji.

Key takeaways:
- Sentry daje pełne narzędzia do identyfikacji i naprawy błędów od replays po tracing.
- Autofix i Sentry AI przyspieszają workflow, ale wymagają kontroli jakości.
- Prywatność i koszt instrumentacji to istotne aspekty wdrożenia.

Tradeoffs:
- "Pełna instrumentacja poprawia widoczność (gain) ale zwiększa koszty zasobów i ryzyka prywatności (sacrifice)."

Link: [Instrument, monitor, fix: a hands-on debugging session](https://sentry.io/resources/instrument-monitor-fix-workshop)

---

## UI algorithms: a tiny undo stack
**TLDR:** Krótki, praktyczny esej o prostym undo stack bez wskaźników: autor pokazuje API i dlaczego unikanie pointerów/indeksów upraszcza implementację i redukuje błędy związane z mutacjami tablic.

Summary:
Artykuł omawia dwa podejścia do undo: pełna historia (version history) versus undo stack. Autor preferuje undo stack dla większości UI: operacja zapisuje akcję i jej przeciwakcję, undo ją odpala, redo przywraca, a wstawienie nowej akcji po undo usuwa możliwość redo. Zamiast wskaźników odnoszących się do indeksów w tablicy, proponuje prostszą strukturę, która unika błędów typu indexing into nonexistent or off‑by‑one.

Dyskusja jest praktyczna i przyjemnie konkretna: dla przypadków takich jak rysowanie czy operacje na listach, lightweight undo stack jest wystarczający. Autor zwraca uwagę na typowe pułapki JS i Ruby związane z różnicami w slice/splice, co jest przydatne przy cross‑language thinking.

Co nie zostało omówione w pełni: wpływ undo stack na pamięć i serializację stanu (np. synchronizacja z serwerem, undo w multi‑user), oraz integracja z immutable data structures lub CRDT, gdy potrzebujemy współdzielonego stanu między klientami. To ważne, gdy funkcja undo ma działać również w środowisku współpracy.

Dla zespołów: zastosuj prosty undo stack tam gdzie użytkownik działa lokalnie i operacje są odwracalne w krótkim zakresie. Dla współpracy w czasie rzeczywistym rozważ bardziej zaawansowane mechanizmy (CRDT lub operacyjny transform).

Key takeaways:
- Undo stack jest często wystarczający i prostszy niż pełna historia wersji.
- Unikanie pointerów/indeksów zmniejsza liczbę błędów implementacyjnych.
- Dla współdzielonego stanu potrzeba innych narzędzi niż lokalny undo stack.

Link: [UI algorithms: a tiny undo stack](https://blog.julik.nl/2025/03/a-tiny-undo-stack)

---

## Tim Severien — analiza rynku pracy frontendowego
**TLDR:** Autor przeszukał setki ofert, automatycznie ekstraktując technologie i widełki płacowe przez prosty text‑matching. Wynik: React dominuje, Tailwind w stylowaniu, ale metoda ma ograniczenia wynikające z fałszywych trafień i biasu źródeł.

Summary:
Tim zautomatyzował analizę 595 ofert, ekstraktując technologie i widełki płacowe. Jego podejście to prosty text‑matching, świadomie odrzucający LLM do ekstrakcji — co daje transparentność, ale też potencjalne false positives (np. słowa potoczne trafione jako nazwy technologii). Wyniki wskazują, że React jest dominującą technologią, Tailwind przoduje w wymienianych narzędziach stylowania, a wiele ofert wciąż nie precyzuje narzędzi stylowania.

Metodologia jest praktyczna i skalowalna, ale autor uczciwie wskazuje na ograniczenia: bias geograficzny (startup/scaleup z USA i Europy), skomplikowane formaty widełek płacowych i trudność w parsowaniu niestandardowych zapisów. Brakuje tu jednak głębszej analizy trendów czasowych, kontekstu typów zatrudnienia (FTE vs kontrakt) i różnic sektorowych.

Dla kandydatów i menedżerów: raport to przydatna heurystyka do zorientowania się, co jest „na rynku”, ale nie traktujcie go jako wyroczni. Jeśli rekrutujecie, bądźcie precyzyjni w opisie technologii i widełek — badanie pokazuje, że brak precyzji to strata dla obu stron.

Key takeaways:
- React i Tailwind są najczęściej wymieniane w analizowanych ofertach.
- Proste text‑matching jest skuteczne, ale generuje false positives i ma bias źródłowy.
- Precyzja w ofertach pracy (technologie, widełki) pomaga lepiej dopasować kandydatów.

Link: [The state of the frontend and fullstack job market (Tim Severien)](https://tsev.dev/posts/2025-03-26-the-state-of-the-frontend-and-fullstack-job-market)

---

## CSS Mixins are ready for experimentation!
**TLDR:** Przegląd eksperymentalnych CSS Mixins: @mixin pozwala aplikować fragment stylów jako blok — dostępne w Canary z flagą, ciekawa możliwości dla design systemów, ale jeszcze wiele pytań dotyczących scoping'u custom properties i prywatności zmiennych.

Summary:
Artykuł opisuje, że CSS Mixins oraz Functions są już dostępne do eksperymentów w Canary. Mixins mają służyć do grupowania kawałków stylów i ponownego wykorzystania ich jako bloki, z przykładową składnią @mixin oraz @apply. Dyskusja na kanałach pokazuje, że społeczność myśli też o mechanizmach prywatności zmiennych w mixinach (np. @result block), co byłoby dużym ułatwieniem dla projektów design systemowych.

To ważny krok: mixiny oferują bardziej deklaratywny sposób ponownego użycia stylów niż utility classes i mogą ułatwić utrzymanie DRY w systemach komponentów. Jednak obecny prototype nie zakresuje custom properties — wszystko jest wypuszczane w global scope mixinu, co może powodować kolizje i trudne do znalezienia błędy.

Dla zespołów UI/Design System: eksperymentujcie z mixins w prototypach, ale pilnujcie scoping’u zmiennych. Pomyślcie o narzędziach build‑time, które mogą transformować mixiny na bezpieczniejsze konstrukcje lub o konwencjach nazewnictwa prywatnych custom properties.

Key takeaways:
- CSS Mixins są gotowe do prototypowania w przeglądarkach Canary.
- Mixins ułatwiają reuse bloczków stylów, ale obecnie brak scoping’u custom properties.
- Społeczność rozważa mechanizmy typu @result dla zamknięcia prywatnych deklaracji.

Tradeoffs:
- "Mixins zwiększają DRY i czytelność stylów, ale bez scoping’u ryzykujesz globalne kolizje zmiennych."

Link: [CSS Mixins are ready for experimentation!](https://nordey.dev/css-mixins-ready-for-experimentation)

---

---

**Disclaimer:** This article was generated using [newsletter-ai](https://github.com/gmotyl/newsletter-ai) powered by gpt-5-mini LLM. While we strive for accuracy, please verify critical information independently.
