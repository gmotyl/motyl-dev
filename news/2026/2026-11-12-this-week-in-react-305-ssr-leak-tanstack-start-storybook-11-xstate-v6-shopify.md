---
title: "This Week In React #305: wyciek pamięci w SSR, ucieczka z Next.js, Storybook 11, XState v6 i natywny Shopify"
excerpt: "Timer react-query trzymał każde żądanie SSR w pamięci, ktoś migruje z Next.js na TanStack Start, a Shopify przepisuje aplikację z React Native na Swift i Kotlin."
publishedAt: "2026-11-11"
slug: "this-week-in-react-305-ssr-leak-tanstack-start-storybook-11-xstate-v6-shopify"
hashtags: "#thisweekinreact #react #nextjs #tanstack-start #storybook #xstate #react-native #generated #pl"
source_pattern: "This Week In React"
---

## Jak react-query trzymał w pamięci każde żądanie SSR

**TLDR:** W react-query v3 każde zapytanie wyrenderowane na serwerze startuje timer na 2 do 5 minut, a Node przypina do niego kontekst żądania. Ustawienie cacheTime na Infinity po stronie serwera zmniejszyło pamięć podów z około 4,8 do 1,2 GiB.

**Summary:** Autor pracujący w Zepto zauważył, że serwery Next.js siedzą na około 5 GB na pod i garbage collector niewiele zwalnia. Profilowanie na produkcyjnym buildzie pokazało około 1 MB zatrzymanego na żądanie, a w snapshotach 336 obiektów ServerResponse dla 336 żądań. Drzewo dominatorów nic nie pokazało, bo żaden obiekt nie był duży. Pomogło dopiero przeszukiwanie wszerz od korzeni GC, które wskazało listę timerów Node jako trzymającą wszystko przy życiu.

Mechanizm składa się z trzech elementów. Query w v3 startuje timer wygaszania od razu w konstruktorze, a subskrypcja, która by go anulowała, odbywa się w useEffect, który nie działa przy SSR. Node dołącza do każdego timera aktualny kontekst AsyncLocalStorage, a Next.js trzyma w nim żądanie i odpowiedź. A oczekujące timery są korzeniami GC. Poprawka to klasa ServerQueryCache, która buduje każde zapytanie z cacheTime Infinity, tylko na serwerze.

Ciekawy jest efekt uboczny. Pody autoskalowały się według pamięci, więc po naprawie flota się skurczyła i opóźnienia wzrosły. Zespół przeszedł na skalowanie według CPU. Autor zauważa też, że v4 i v5 mają domyślnie nieskończony czas tylko dla domyślnej wartości, więc hooki z własnym skończonym gcTime nadal tworzą timer.

**Key takeaways:**
- Każdy setTimeout utworzony w żądaniu trzyma to żądanie przy życiu do wywołania.
- Przy tysiącach małych wycieków dominatory nie pomagają, a ścieżki od korzeni tak.
- Po naprawie pamięci sprawdź konfigurację autoskalowania.

**Why do I care:** Tekst jest wzorcowy. Mierzenie po wymuszonym GC i szukanie ścieżek retainerów to metoda, którą warto mieć w zanadrzu. Zastanawia mnie tylko, że ten błąd siedział tak długo w bibliotece, której używa pół ekosystemu. Jeśli masz v3 lub v5 z własnym gcTime w SSR, sprawdź to u siebie.

**Link:** [How we cut Next.js memory from ~5GB to ~1GB: the react-query timer holding every SSR request](https://rohitpotato.xyz/thoughts/ssr-requests-still-alive)

## Dlaczego w końcu opuszczono Next.js dla TanStack Start

**TLDR:** Harrison Milbradt przeniósł dużą aplikację z Next.js 16 na TanStack Start na Cloudflare Workers, sam, z agentami, po serii wycieków pamięci i błędów buildu.

**Summary:** Powody to wyciek w 16.3.0, inny wyciek w 16.3.4 związany z dzieleniem strumienia w use cache, oraz błąd Turbopacka w 16.2.0 dodający dwie kropki w nazwach plików, który firewall Cloudflare brał za path traversal. OpenNext nie działał przy tej skali.

Migracja polegała na warstwie szwów. Każdy import z next/* przechodzi przez własne moduły, a alias czasu budowania wskazuje wersję Next lub TanStack. Reguła lintera zakazuje next/* poza tą warstwą. Przed testowaniem TanStack autor napisał skrypty, które sprawdzają, czy drzewo tras pokrywa wszystkie około dwustu stron, i porównują setki adresów między produkcją a kandydatem. Przełączenie nastąpiło 1 października, a koszt spadł z 500 do 1000 dolarów miesięcznie. Liczba commitów tygodniowo wzrosła z około 40 do 210, ale autor sam zastrzega, że to nie jest porównanie Next z TanStack, tylko efekt czystek i agentów.

**Key takeaways:**
- Warstwa abstrakcji nad importami frameworka umożliwiła pracę na dwóch frameworkach naraz.
- Skrypty porównujące produkcję z kandydatem trzeba najpierw uruchomić produkcja kontra produkcja, żeby poznać szum.
- Ekosystem jest młodszy i widać to po poradach bezpieczeństwa i testach.

**Why do I care:** To przypadek jednej osoby z jednym dużym projektem i bardzo konkretnymi problemami, więc nie wyciągałbym z tego uniwersalnego wniosku o Next. Wartościowa jest sama metodyka migracji. Granice frameworka czyste od początku to coś, co każdy zespół mógłby zrobić dziś, nie planując żadnej migracji.

**Link:** [Why we finally left NextJS for TanStack Start](https://harrisonmilbradt.com/writing/nextjs-to-tanstack-start)

## Storybook 11 beta dla agentów

**TLDR:** Storybook 11 dostarcza oficjalne skille, narzędzia CLI i wtyczki do Claude i Codex, jest o 25 procent mniejszy i do 10 razy szybciej dostarcza kontekst niż v10.

**Summary:** Skill ui-workflow prowadzi agenta przez budowę UI na istniejących komponentach, pisanie stories, testy i przekazanie do przeglądu. Skill component-docs pomaga znaleźć komponenty i ich API w oszczędnym formacie. Komenda storybook tools test run uruchamia testy funkcjonalne i dostępności na Vitest, a storybook tools review create przygotowuje przegląd w przeglądarce z grupami stories dla zmienionych komponentów.

Format CSF 4 daje w pełni typowane stories z API fabryk. React używa react-component-meta, Vue vue-component-meta, a dla Angulara powstał @storybook/angular-vite. Svelte awansował do frameworków podstawowych. Wydanie stabilne zapowiedziano na grudzień.

**Key takeaways:**
- Skille wolno uruchamiać bez działającego Storybooka.
- CSF 4 daje typowane stories z codemodami migracji.
- Stabilna wersja planowana na grudzień.

**Why do I care:** Storybook pozycjonuje się jako źródło kontekstu dla agentów, i to ma sens, bo komponenty z opisanymi stanami to najlepsze, co możesz agentowi dać. Wskaźnik 10 razy szybciej pochodzi z zespołu Chromatic na dużym projekcie, więc u siebie może wyjść inaczej.

**Link:** [Storybook 11 beta](https://storybook.js.org/blog/storybook-11-beta/)

## XState v6 beta

**TLDR:** Nowa wersja główna upraszcza API. Przejścia są zwykłymi funkcjami, typy pochodzą ze schematów, a do pakietu dołączono dokumentację i CLI dla agentów.

**Summary:** Autorzy przyznają, że projektowali v6 pod to, jak kod jest dziś pisany. Modele znają koncepty maszyn stanów, ale piszą starą składnię, na przykład cond zamiast guard. Dlatego usunięto kreatory akcji i higher-order guards, a przejście zwraca stan i kontekst, a efekty zapisuje przez enq. Schematy w Zod lub innej bibliotece Standard Schema zastępują zapis typów, a błędy typów wskazują dokładnie, co jest nie tak.

Nowością jest xstate/fsm, około pół kilobajta po kompresji, polecenia CLI (inspect, validate, simulate, test, replay, diff) działające na JSON bez uruchamiania kodu, i moduł durable, który pozwala oddać pętlę wykonania hostowi takiemu jak Temporal czy Restate. Do migracji jest codemod. XState v5 pozostaje wspierany.

**Key takeaways:**
- Przejścia jako czyste funkcje ułatwiają trwałe wykonanie.
- Dokumentacja w node_modules/xstate/docs z przewodnikiem dla agentów.
- Wersja beta, część API jak durable jest eksperymentalna.

**Why do I care:** Pomysł, żeby maszyna stanów była modelem, który człowiek może przejrzeć, gdy agent wygenerował tysiąc linii, jest dla mnie najlepszym argumentem tego wydania. Jednocześnie usunięcie połowy API oznacza dużą migrację w istniejących projektach, więc zacznij od codemoda na jednej maszynie.

**Link:** [Announcing XState v6 beta](https://stately.ai/blog/2026-11-05-xstate-v6-beta)

## Shopify przepisuje aplikację z React Native na Swift i Kotlin w 12 tygodni

**TLDR:** Trzydziestu inżynierów w parach i agenci przepisali aplikację z ponad 300 ekranami. Większość wysiłku poszła w architekturę i pętlę zwrotną, nie w kod.

**Summary:** Kluczem jest architektura Reflex. Logika działa bez UI w module, który da się zbudować na macOS lub JVM. Każdy ViewModel ma ten sam kształt, akcje wchodzą, stan wychodzi, a jeden kontrakt JSON opisuje nazwę, stan i akcje. CLI steruje aplikacją przez ten kontrakt bez symulatora. Jeden plik testowy działa na iOS i Androidzie, a ponad 1700 testów behawioralnych kończy się w około cztery minuty na CI. Kod jest pisany dwa razy, test raz.

W organizacji pracy ciekawe są wnioski. Specyfikacje spisane z góry szybko się starzały, więc za specyfikację posłużyła istniejąca aplikacja. Agent robi pierwszy przegląd PR-a, a człowiek ocenia intencję. Wąskie gardła przesunęły się na laptopy, przegląd, kolejkę scalania i koordynację. Wyniki to start szybszy o 50 procent na Androidzie (z 1,71 do 0,87 s), plik mniejszy o 40 procent i pamięć na iOS niższa o ponad 70 procent. Stabilność sesji na Androidzie poszła z 99,66 do 99,98 procent.

**Key takeaways:**
- Architektura jest widoczna dla agenta w plikach, lintach i testach CI.
- Wspólna architektura na obu platformach, nawet kosztem idiomatyczności, umożliwia jeden PR dla obu.
- Wąskie gardło po przyspieszeniu kodu to przegląd, scalanie i koordynacja.

**Why do I care:** To najciekawszy opis pracy z agentami na dużą skalę, jaki widziałem. Zastrzeżenia mam dwa. Liczby wydajności porównują aplikację React Native z architekturą, którą Shopify sam wcześniej zbudował, więc nie jest to werdykt o samym React Native. Po drugie, nie każdy ma 30 inżynierów i dojrzałą aplikację jako specyfikację. Zasada "uczyń architekturę wykonywalną" działa jednak w każdej skali.

**Link:** [How we rebuilt the Shopify app in 12 weeks](https://shopify.engineering/shopify-app-rebuild)

**Link:** [Reflex: an architecture for building mobile apps with agents](https://shopify.engineering/reflex)
