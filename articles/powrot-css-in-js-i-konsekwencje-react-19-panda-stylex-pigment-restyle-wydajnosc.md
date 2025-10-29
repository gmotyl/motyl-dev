---
title: "Powrót CSS‑in‑JS i konsekwencje React 19: Panda, StyleX, Pigment, Restyle oraz wydajność"
excerpt: "Przegląd najnowszych ruchów w świecie stylowania Reacta, konsekwencji React 19 dla Suspense oraz praktycznych porad dotyczących budowania wydajnych aplikacji."
publishedAt: "2025-10-27"
slug: "powrot-css-in-js-i-konsekwencje-react-19-panda-stylex-pigment-restyle-wydajnosc"
hashtags: "#generated #pl #frontend #react #typescript #css-in-js #panda-css #stylex #pigment-css #restyle #react-19 #suspense #react-server-components #rsc #performance #web-performance #speedcurve #tanstack-query #architecture #ai"
---

## Bytes #298 — CSS‑in‑JS is so back
**TLDR:** Coraz więcej nowych bibliotek stylowania dla Reacta powraca do podejścia CSS‑in‑JS, napędzane przez zmiany w React (np. RSC i nowe możliwości hoistowania styli) oraz chęć połączenia ergonomii z wydajnością. To mniej nostalgiczny, a bardziej ewolucyjny powrót: nowe implementacje unikają dawnych kompromisów serwer‑klient.

**Summary:**
Ostatnie miesiące pokazują, że moda na CSS‑in‑JS wraca nie dlatego, że zapomnieliśmy starych problemów, lecz dlatego, że React sam się zmienił. Kiedyś biblioteki typu styled‑components rozwiązywały kapsułkowanie styli i wygodę autora, lecz męczyły się przy renderowaniu po stronie serwera. Teraz React wprowadza mechanizmy jak hoistowanie <style> i lepsze wsparcie dla współbieżnego oraz strumieniowego renderowania po stronie serwera — to daje nowej generacji bibliotek prawdziwą szansę.

Autor zauważa także czynnik cykliczności: pomysły, które kiedyś działały, wracają w nowej formie, bo ekosystem i wymagania się zmieniły. Różnica między dawnymi i nowymi rozwiązaniami to głównie przesunięcie ciężaru: zamiast manipulacji DOMem w czasie wykonywania, współczesne podejścia generują CSS już podczas buildu, albo kombinują deterministyczne klasy atomiczne, co upraszcza serwerowe scenariusze i minimalizuje runtime.

Praktycznie oznacza to, że narzędzia wybieramy teraz nie tylko pod kątem DX, ale też zgodności z architekturą aplikacji: czy używamy React Server Components, czy potrzebujemy ściśle deterministycznych klas dla dużych bibliotek komponentów, czy zależy nam na typowaniu w TypeScript. Jeśli planujesz migrację do RSC lub App Routera w Next.js, warto przejrzeć te nowe biblioteki z punktu widzenia integracji z serwerem i rozmiaru bundle'u.

**Key takeaways:**
- React 19 i RSC zmieniają reguły gry dla strategii stylowania; stare kompromisy już nie muszą obowiązywać.
- Nowe biblioteki skupiają się na build‑time, deterministyczności i minimalnym runtime.
- Wybór rozwiązania stylowania powinien zależeć od architektury aplikacji (RSC vs. CSR) i potrzeb w zakresie typowania i skalowalności.

**Link:** [Bytes #298 — CSS‑in‑JS is so back](https://bytes.dev/archives/298)

---

## Panda CSS — Build modern websites using build time and type-safe CSS‑in‑JS
**TLDR:** Panda CSS to biblioteka generująca CSS w czasie buildu, z naciskiem na typowanie TypeScript, wzorce (recipes) i kompatybilność z RSC — obietnica: zero runtime przy dobrym DX. To przykład podejścia „CSS‑in‑JS, ale bez kosztu runtime”.

**Summary:**
Panda CSS pokazuje jak można zachować ergonomię pisania styli w JS/TS, jednocześnie wypluwając statyczne pliki CSS podczas budowania aplikacji. To ważne, bo wiele problemów klasycznych CSS‑in‑JS wynikało z konieczności wstrzykiwania stylów w runtime — co kolidowało z SSR i rozmiarem JS. Panda stawia na nowoczesne techniki CSS: cascade layers, zmienne, selectory :where i podejście tokenów zgodne z propozycjami W3C.

Dodatkowym elementem jest typowanie: integracja z TypeScript pozwala na bezbłędne API podczas tworzenia wzorców (recipes) i wariantów, co w praktyce oznacza mniejsze błędy projektowe i bardziej przewidywalne systemy designu. Panda oferuje też funkcje podobne do CVA czy Stitches — czyli komponowalne, wielowariantowe receptury styli, które można bezpiecznie użyć w dużych kodowych bazach.

Z architektonicznego punktu widzenia Panda jest naturalnym wyborem tam, gdzie chcemy zachować lokalne, komponowalne API, ale nie chcemy kosztów runtime ani komplikacji przy serwerowym renderowaniu. To sprawia, że biblioteka jest szczególnie atrakcyjna dla zespołów budujących bibliotekę komponentów lub produkty, które muszą skalować wielkość CSS.

**Key takeaways:**
- Panda generuje CSS podczas buildu: brak runtime kosztów i lepsza kompatybilność z SSR/RSC.
- Mocne wsparcie TypeScript poprawia bezpieczeństwo API i DX dla zespołów.
- Dobre wyjście dla design systems i dużych aplikacji, które potrzebują deterministycznych klas.

**Link:** [Panda CSS](https://panda-css.com/)

---

## Introducing StyleX
**TLDR:** StyleX od Meta to system stylowania oparty na compile‑time transformacjach, dający atomowe klasy, przewidywalność specyficzności i wsparcie typów — optymalizowany pod ogromne codebase’y i wydajność przeglądarek.

**Summary:**
StyleX to odpowiedź na potrzeby dużych, wielomodułowych aplikacji: deterministyczne generowanie atomowych klas CSS na etapie kompilacji. Meta kładzie nacisk na skalowalność — ich babel plugin ma sobie radzić z tysiącami komponentów i plików, z cache’owaniem na poziomie plików. Kluczowe cechy to brak konfliktów specyficzności, możliwość łączenia styli przez plikowe granice i minimalny runtime (praktycznie jedynie łączenie nazw klas).

To podejście rozwiązuje dwa powtarzające się problemy: nieprzewidywalność cascade/specyficzności w dużych zespołach oraz koszty performansu związane z wstrzykiwaniem styli w runtime. StyleX daje też typowe narzędzia do ograniczania, które właściwości komponent może przyjmować — przydatne w silnie typowanych bibliotekach komponentów.

Dla architektów systemów UI StyleX jest interesujący, bo obiecuje, że wraz z rosnącą liczbą komponentów rozmiar CSS będzie się plateau‑ować dzięki atomizacji. W praktyce oznacza to mniej pracy przy optymalizacji pedału CSS i przewidywalne wyniki renderowania nawet przy dużym wzroście aplikacji.

**Key takeaways:**
- StyleX generuje atomowe klasy na etapie kompilacji, co zmniejsza rozmiar i problemy ze specyficznością.
- Projektowany pod bardzo duże codebase’y i biblioteki komponentów z naciskiem na wydajność.
- Typy i możliwości kompozycji sprawiają, że nadaje się do silnie typowanych, rozszerzalnych systemów UI.

**Link:** [Introducing StyleX](https://stylexjs.com/blog/introducing-stylex)

---

## A preview of Pigment CSS — the next generation of CSS‑in‑JS (MUI)
**TLDR:** Pigment CSS to zero‑runtime CSS‑in‑JS stworzony przez MUI, zaprojektowany z myślą o kompatybilności z React Server Components i migracji użytkowników MUI z Emotion bez konieczności dużych zmian w API.

**Summary:**
Material UI potrzebowało ścieżki do migracji w erze RSC: wiele istniejących bibliotek stylowania opiera się na React context i runtime‑owym wstrzykiwaniu styli — to koliduje z podejściem server‑first. Pigment to odpowiedź MUI: generuje skompilowane, colocated pliki CSS w czasie buildu, minimalizując runtime i zachowując znane wzorce API, by ułatwić migrację z Emotion czy styled‑components.

Produktowo Pigment stara się zredukować bóle migracji, zachować developer experience i jednocześnie umożliwić bibliotekom takim jak MUI pracę w środowisku App Router / RSC — tam, gdzie kontekst Reacta na kliencie nie zawsze działa. To pokazuje szerszy trend: wielkie biblioteki UI muszą zapewnić ścieżki migracji, bo ich użytkownicy oczekują stabilności i minimalnych zmian.

Dla zespołów frontendowych to sygnał, że „zero runtime” i zgodność z RSC stają się standardem projektowym, a biblioteki, które tego nie zapewnią, będą miały trudniejsze zadanie przekonania użytkowników do migracji.

**Key takeaways:**
- Pigment to zero‑runtime, build‑time generacja CSS, zaprojektowana z myślą o RSC.
- MUI stawia na minimalne łamanie API, ułatwiając migrację z Emotion.
- Trend: biblioteki komponentów muszą dostosować się do server‑first paradoksu React.

**Link:** [A preview of Pigment CSS — MUI](https://mui.com/blog/introducing-pigment-css/)

---

## Restyle — Zero Config CSS for React
**TLDR:** Restyle to biblioteka oferująca „zero config” stylowanie: styled components, style props, css function i css prop, ze wsparciem dla wariantów, pseudo‑selektorów i themingu — skupiona na prostocie użycia i elastyczności.

**Summary:**
Restyle stawia na prostotę: oferuje API styled, style props, css prop i narzędzia do komponowania stylów, media queries, keyframes i theming bez rozbudowanej konfiguracji. Model jest pragmatyczny: autorzy chcą dać prosty, przewidywalny sposób tworzenia komponentów stylowych, który łatwo przyjąć w istniejącym projekcie.

W praktyce Restyle wprowadza mechanizm separacji style props od zwykłych propsów i używa pragmy dla css prop, co jest wygodne w TypeScript. Dla inżynierów oznacza to mniejsze tarcie przy budowie komponentów, a jednocześnie dostęp do ważnych funkcji: wariantów, pseudoselektorów i responsywności.

Z architektonicznego punktu widzenia Restyle będzie atrakcyjny tam, gdzie zespół chce szybko zbudować spójny UI bez wdrażania ciężkich narzędzi kompilacyjnych. Jednak jeśli celem jest absolutnie minimalny runtime lub ściśle zdefiniowane, atomiczne klasy, to podejścia build‑time (jak Panda czy Pigment) mogą lepiej pasować.

**Key takeaways:**
- Restyle upraszcza tworzenie komponentów stylowych bez skomplikowanej konfiguracji.
- Dobre dla szybkiego prototypowania i zespołów ceniących prosty DX.
- Warto rozważyć kompromis między wygodą a strategiami minimalizującymi runtime CSS.

**Link:** [Restyle — Zero Config CSS for React](https://www.restyle.dev/)

---

## React 19 and Suspense — A Drama in 3 Acts (TkDodo)
**TLDR:** React 19 wprowadził zmianę w zachowaniu Suspense: rodzeństwo w tym samym boundary przestało domyślnie ładować równolegle, co dla wielu bibliotek takich jak react‑query wygenerowało nieoczekiwane „waterfall” podczas fetchowania danych. To uderza w optymalizacje i wymaga przemyślenia wzorców użycia Suspense.

**Summary:**
Dominik rozbiera sytuację na czynniki pierwsze: React 19 przyniósł świetne nowości, ale także subtelną zmianę w modelu Suspense, która sprawiła, że komponenty‑rodzeństwo w jednym Suspense boundary przestały inicjować fetchy równolegle. Skutek praktyczny to często wolniejsze ładowanie, bo zamiast jednego równoległego zestawu żądań mamy sekwencyjne kroki.

Autor przedstawia proces odkrycia problemu i jak wpłynął on na przykładki edukacyjne i realne biblioteki. Omawia kiedy to zachowanie jest istotne: tam, gdzie wiele równoległych zapytań było planowane jako niezależne, a oczekiwanie miało występować tylko na poziomie prezentacji. Zmiana zatem wymaga od architektów i autorów bibliotek ponownego przemyślenia jak organizować boundaries i kiedy wręcz trzeba wymusić równoległość.

Praktyczne implikacje to: przegląd istniejących Suspense boundaries, testy integracyjne obciążeniowe dla scenariuszy fetchowania równoległego i być może rekompozycja komponentów tak, by fetchy były inicjowane poza jednym wspólnym boundary, bądź zastosowanie explicitnych mechanizmów uruchamiania zapytań równolegle. Autor konsekwentnie radzi, by nie panikować, ale systematycznie testować i przemyśleć wzorce projektu.

**Key takeaways:**
- React 19 zmienił domyślne zachowanie Suspense dla rodzeństwa, prowadząc do możliwych waterfalli.
- Przejrzyj Suspense boundaries i tam, gdzie zależy ci na równoległości, inicjuj fetchy poza wspólną granicą.
- Testy i benchmarki scenariuszy renderowania są teraz ważniejsze niż kiedykolwiek.

**Link:** [React 19 and Suspense — A Drama in 3 Acts](https://tkdodo.eu/blog/react-19-and-suspense-a-drama-in-3-acts)

---

## How React 19 (Almost) Made the Internet Slower — The Miners
**TLDR:** Analiza pokazuje, że zmiana w React 19 związana z Suspense może znacząco pogorszyć wydajność wielu aplikacji poprzez wprowadzenie sekwencyjnego ładowania danych zamiast równoległego; tuż obok technicznych wyjaśnień znajdziemy rekomendacje jak temu zapobiec.

**Summary:**
Artykuł wyjaśnia mechanikę Suspense i dlaczego zmiana w React 19 jest nie tylko drobnym tweakem, ale realnym zagrożeniem dla wydajności aplikacji, które wcześniej polegały na równoległym fetchowaniu w rodzeństwie komponentów. Autor zarysowuje przykłady i porównuje zachowania przed i po, pokazując jak subtelna zmiana w schedulerze renderowania wpływa na widoczne czasy ładowania.

Dla osób odpowiedzialnych za architekturę frontendu to ostrzeżenie: nawet optymalny wzorzec użycia Suspense wymaga teraz rewizji. Proponowane konkretne strategie to rozbijanie boundaries, inicjowanie zapytań wyżej w drzewie, używanie zapleczowych koordynatorów fetchów lub wykorzystanie bibliotek które jawnie zarządzają równoległością niezależnie od modelu Suspense.

Analiza kończy się refleksją: ekosystem szybko się zmienia, a biblioteki i aplikacje muszą utrzymywać testy wydajności jako stały element CI. W praktyce, autor namawia do proaktywnej diagnostyki i adaptacji istniejących wzorców architektonicznych zamiast oczekiwać, że frameworki będą zawsze zachowywać się „po staremu”.

**Key takeaways:**
- Zmiana w Suspense może wprowadzić sekwencyjne ładowanie zamiast równoległego, pogarszając wydajność.
- Rozbijanie Suspense boundaries i wcześniejsze inicjowanie fetchów to proste sposoby ograniczające regresję.
- Wydajność musi być częścią testów CI, a architektura powinna uwzględniać oczekiwane zachowania renderera.

**Link:** [How React 19 (Almost) Made the Internet Slower](https://blog.codeminer42.com/how-react-19-almost-made-the-internet-slower/)

---

## Performance testing in CI: Let's break the build! (SpeedCurve)
**TLDR:** Włączenie testów wydajności do pipeline’u CI i „łamanie buildu” przy przekroczeniu budgetów to skuteczny sposób, by zapobiegać regresjom wydajności w dłuższej perspektywie. To nie tylko techniczny krok, ale zmiana procesu.

**Summary:**
SpeedCurve prezentuje praktyczne podejście: traktuj wydajność jako kryterium akceptacji zmian kodu. Integracja testów wydajności w CI pozwala na wczesne wykrycie regresji i zapobiegać „powolnemu psuciu się” aplikacji, które następuje, gdy kolejne funkcje i skrypty są doklejane do projektu bez kontroli.

Autor opisuje jak ustawić performance budgets, jakie środowiska testowe są potrzebne (cache warmup, zbliżone do produkcji warunki, izolowane testy), oraz kiedy testy uruchamiać w pipeline’ie. Kluczowe jest dobre zaplanowanie: testy wydajnościowe muszą być deterministyczne i umieszczone w miejscu pipeline’u gdzie ich wynik ma sens (np. po deployu do środowiska integracyjnego).

Procesowo to wymaga ustalenia polityk: co jeśli build się złamie, kto podejmuje decyzję o zatwierdzeniu odstępstw, i jak śledzić fluktuacje (rate‑of‑change budgets). To zmiana kulturowa—wymaga wsparcia product ownerów, bo „break the build” dla wydajności oznacza blokowanie wdrożeń z powodów niefunkcjonalnych.

**Key takeaways:**
- Dodaj testy wydajności do CI i wykorzystaj performance budgets, by zapobiegać regresjom.
- Środowisko testowe musi naśladować production (cache, zasoby) dla wiarygodnych wyników.
- Wprowadzenie takiego procesu to zmiana organizacyjna — potrzeba polityk i właścicieli decyzji.

**Link:** [Performance testing in CI: Let's break the build!](https://www.speedcurve.com/blog/performance-testing-in-ci-lets-break-the-build/)

---

## NEW: RUM attribution and subparts for Interaction to Next Paint (SpeedCurve)
**TLDR:** SpeedCurve rozszerza diagnostykę RUM dla Interaction to Next Paint (INP) o atrybucję elementu i „subparts” (input delay, processing, presentation), co znacznie ułatwia lokalizowanie źródeł opóźnień w responsywności.

**Summary:**
INP jest metryką kluczową dla odbioru interaktywności — mierzy, jak szybko strona reaguje na rzeczywiste wejścia użytkownika. SpeedCurve dodaje szczegółową atrybucję: które elementy powodują złe INP, a także rozbicie na subparts, co pozwala odróżnić: opóźnienie wejścia, czas przetwarzania w callbacku oraz opóźnienie prezentacji (frame). To ogromna poprawa w praktycznej diagnostyce, bo surowa wartość INP niewiele mówi o przyczynie.

Dla zespołów frontendowych oznacza to szybsze zamknięcie pętli: zamiast zgadywać, czy winny jest event handler czy rendering, widzimy konkretne proporcje. To ułatwia priorytetyzację optymalizacji: czy trzeba zoptymalizować skrypt, rozbić długie zadania, czy poprawić rendering i rysowanie.

Z perspektywy architektury RUM i observability to krok w stronę bardziej działających metryk: lepsza atrybucja pozwala łączyć dane RUM z trace’ami lub profilami, co z kolei przyspiesza naprawę problemów wpływających na zaangażowanie użytkownika.

**Key takeaways:**
- INP rozbite na subparts pozwala precyzyjnie zlokalizować źródło opóźnień interakcji.
- Atrybucja elementów ułatwia powiązanie problemów z konkretnymi komponentami UI.
- Takie diagnostyki warto zintegrować z monitoringiem i procesem naprawczym w zespole.

**Link:** [RUM attribution and subparts for Interaction to Next Paint](https://www.speedcurve.com/blog/rum-attribution-subparts-interaction-to-next-paint/)

---
---

**Disclaimer:** This article was generated using [newsletter-ai](https://github.com/gmotyl/newsletter-ai) powered by claude-sonnet-4-20250514 LLM. While we strive for accuracy, please verify critical information independently.
