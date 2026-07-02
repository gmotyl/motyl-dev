---
title: "Storybook dla TanStack React, nowości w Svelte i Astro - daily.dev przegląd"
excerpt: "Dedykowany framework Storybook dla TanStack React, miesięczne podsumowanie zmian w Svelte i Astro oraz nowy Rust-owy kompilator w Astro 7."
publishedAt: "2026-07-01"
slug: "storybook-tanstack-react-svelte-astro-nowosci-lipiec-2026"
hashtags: "#dailydev #frontend #webdev #react #svelte #astro #storybook #tanstack #typescript #generated #pl"
source_pattern: "daily.dev"
---

## Storybook dla TanStack React

**TLDR:** Storybook wypuścił dedykowany framework `@storybook/tanstack-react`, który automatycznie obsługuje TanStack Router, Query i Start bez ręcznej konfiguracji. Każda historia jest automatycznie owijana w RouterProvider z historią in-memory, a server functions z TanStack Start są automatycznie mockowane.

**Summary:** TanStack stał się jednym z najpopularniejszych sposobów budowania aplikacji React. Router daje type-safe, plikowe routing z loaderami i zagnieżdżonymi layoutami. Query obsługuje stan serwera. Start łączy to wszystko z server functions, które wyglądają jak lokalne wywołania. Problem w tym, że Storybook do tej pory nie umiał tego sensownie obsłużyć - trzeba było ręcznie konfigurować providery, mockować router i walczyć z importami server-only.

Nowy `@storybook/tanstack-react` rozwiązuje to na kilku poziomach naraz. Po pierwsze, każda historia jest automatycznie opakowana w RouterProvider z pamięcią in-memory, więc nawigacja działa w podglądzie bez zmiany URL przeglądarki. Po drugie, parametry routera są typowane - jeśli przekażesz zły klucz w params, TypeScript złapie błąd w czasie kompilacji, nie w runtime. To szczególnie cenne przy refaktoryzacji - zmiana schematu routingu od razu pokazuje gdzie coś się posypało.

Automatyczne mockowanie server functions to dla mnie najbardziej wartościowa funkcja. TanStack Start pozwala wywoływać funkcje serwerowe jak lokalne, ale to oznacza, że w Storybooku historyjka może próbować trafić do bazy danych albo zewnętrznego serwisu. Teraz każda historia może zdefiniować swój własny response kształt - sukces, loading, empty state, błąd sieciowy - bez żadnej infrastruktury serwerowej. Każda historia jest właścicielem swojego kontraktu danych.

Framework działa też z TanStack Query - wystarczy skonfigurować wspólny QueryClient w preview.ts i seedować dane per historia w beforeEach. Połączenie mockowanych server functions z kontrolowanym QueryClient daje pełną kontrolę nad cyklem życia danych. Dla server-only dependencies, które mogłyby rozwalić przeglądarkowy podgląd, framework używa trzech warstw: wbudowane mocki dla TanStack Start internals, automatyczne stubowanie entry pointów oraz standardowe Storybook module mocking dla przypadków aplikacyjnych.

Instalacja jest prosta - nowe projekty wykryją TanStack przez CLI, istniejące projekty mogą zmigrować przez `npx storybook@latest automigrate`. Wymagania to React 18 lub nowszy i Vite 7.

**Key takeaways:**
- `@storybook/tanstack-react` automatycznie opakowuje każdą historię w RouterProvider z in-memory history, zero ręcznej konfiguracji
- Parametry routera są type-safe na poziomie TypeScript - błąd złego klucza w params wyłapywany w czasie kompilacji
- Server functions z TanStack Start są automatycznie mockowane, co pozwala testować precyzyjne stany komponentów bez infrastruktury serwerowej

**Why do I care:** To jest dokładnie ta integracja, której brakowało. TanStack Router i Query stały się de facto standardem dla nowych projektów React, ale testowanie komponentów w Storybooku wymagało sporo boilerplate'u. Automatyczne wrappery i type-safe parametry routera to duże ułatwienie - szczególnie w większych projektach gdzie każdy błędny refaktor routingu powinien być widoczny od razu. Warto też zauważyć, że Storybook współpracował bezpośrednio z core teamem TanStack przy tej implementacji, co daje nadzieję na długoterminowe wsparcie.

**Link:** [Storybook for TanStack React](https://storybook.js.org/blog/storybook-for-tanstack-react/)

---

## Nowości w Svelte: Lipiec 2026

**TLDR:** SvelteKit pozwala teraz definiować konfigurację bezpośrednio w vite.config.js, co oznacza koniec z oddzielnym plikiem svelte.config.js. Pojawiły się też eksperymentalne explicit environment variables jako preview sposobu, w jaki zmienne środowiskowe będą działać w SvelteKit 3.

**Summary:** Lipiec przynosi kilka zmian, które razem wzięte dają obraz kierunku, w którym zmierza SvelteKit 3. Najważniejsza to możliwość przekazania konfiguracji SvelteKit bezpośrednio do pluginu Vite, co eliminuje potrzebę osobnego pliku svelte.config.js. Na razie to preview, ale SvelteKit 3 ma wymagać, żeby konfiguracja żyła właśnie w vite.config.js. Konsolidacja konfiguracji w jednym miejscu to dobry kierunek - mniej plików, łatwiejszy onboarding nowych developerów.

Eksperymentalne explicit environment variables to kolejna zmiana szykująca grunt pod SvelteKit 3. Zamiast importować ze specjalnych modułów jak `$env/static/public`, będzie można deklarować i typować zmienne środowiskowe w jednym miejscu. Szczegóły implementacji są jeszcze eksperymentalne, ale kierunek jest wyraźny.

Na poziomie remote functions pojawiło się kilka praktycznych ulepszeń. Można teraz przesyłać pliki jako File objects bezpośrednio, bez ręcznego pakowania w FormData. Remote queries mogą odświeżać inne queries, co upraszcza invalidację powiązanych danych po mutacji. To małe rzeczy, ale takie, które w codziennej pracy robią różnicę.

Cały toolchain - language server, svelte-check i svelte2tsx - nadrobiły zaległości i teraz rozumieją nowe tagi deklaracyjne `{const ...}` z Svelte 5. Pojawia się też eksperymentalne wsparcie dla tsgo, czyli TypeScript napisanego w Go, w svelte-check. To może znacznie przyspieszyć sprawdzanie typów w dużych projektach. CSS completions działają teraz wewnątrz zagnieżdżonych tagów style, a svelte-check dostał opcję --config do wskazania niestandardowej lokalizacji pliku konfiguracyjnego.

**Key takeaways:**
- Konfiguracja SvelteKit może teraz żyć bezpośrednio w vite.config.js, eliminując potrzebę oddzielnego svelte.config.js - zapowiedź wymagania w SvelteKit 3
- Eksperymentalne explicit environment variables zastąpią moduły `$env/*` w SvelteKit 3
- Wsparcie dla tsgo w svelte-check może znacznie przyspieszyć type checking w dużych projektach Svelte

**Why do I care:** Svelte nie jest moim głównym frameworkiem, ale obserwuję jego ewolucję z zainteresowaniem. Konsolidacja konfiguracji w vite.config.js to decyzja, którą inne frameworki powinny naśladować. Im mniej plików konfiguracyjnych tym lepiej. Wsparcie tsgo też mnie ciekawi - jeśli sprawdzi się w Svelte, pewnie trafi do innych narzędzi w ekosystemie TypeScript, gdzie sprawdzanie typów w dużych monorepo potrafi być naprawdę wolne.

**Link:** [What's new in Svelte: July 2026](https://svelte.dev/blog/whats-new-in-svelte-july-2026)

---

## Nowości w Astro: Czerwiec 2026

**TLDR:** Astro 7 to duże wydanie z nowym kompilatorem napisanym w Rust, aktualizacją do Vite 8 i Advanced Routing. Ekosystem rośnie szybko - w czerwcu pojawiły się dziesiątki nowych themów, integracji i narzędzi, w tym kilka ciekawych dla developerów dbających o AI i SEO.

**Summary:** Astro 7 to bez wątpienia najważniejsze wydarzenie miesiąca. Nowy kompilator w Rust to obietnica znacznie szybszych buildów, Vite 8 wnosi swoje optymalizacje, a Advanced Routing otwiera nowe możliwości w zakresie struktury projektu. Starlight 0.41 wspiera Astro 7 i dodaje domyślne wsparcie dla Sätteri, ale uwaga - Astro 6 nie jest wspierane w tej wersji, więc migracja jest wymagana.

Wśród społeczności Astro widać wyraźny trend w kierunku AI i AEO, czyli Answer Engine Optimization. Pojawiły się integracje jak `@freshjuice/astro-webmcp`, która wystawia zawartość strony przez WebMCP dla agentów AI, oraz `@hevmind/ask` - wyszukiwarka w dokumentacji zorientowana na agenty. To ciekawy kierunek: zamiast budować strony tylko pod Google, coraz więcej narzędzi myśli o tym, jak AI będzie konsumować treści.

W kwestii narzędzi SEO i AEO pojawił się `astro-aeo-image`, który osadza tekst alt i dodatkowe metadane bezpośrednio w zoptymalizowanych plikach graficznych jako XMP, co ma pomóc Google Images i AI answer engines w lepszym rozumieniu contentu. To specyficzne podejście - zamiast polegać tylko na HTML, metadane żyją w samym pliku.

Jeśli chodzi o praktyczne tooling, warto zwrócić uwagę na `@tinloof/astro-prefetch`, który przynosi Next.js-style prefetching z predykcją bazującą na trajektorii kursora. Oraz na `sitedrift`, narzędzie do porównywania preview Astro z produkcją Cloudflare ze splitview i diffem. Liczba dostępnych themów i integracji jest w tym miesiącu imponująca - widać, że ekosystem rośnie w szybkim tempie.

**Key takeaways:**
- Astro 7 wprowadza nowy kompilator Rust, Vite 8 i Advanced Routing - migracja ze Starlight wymaga aktualizacji do tej wersji
- Rosnący trend integracji AI i AEO - narzędzia do wystawiania contentu dla agentów AI i optymalizacji pod AI answer engines
- Ekosystem themów i pluginów rośnie bardzo szybko, w czerwcu pojawiły się dziesiątki nowych narzędzi

**Why do I care:** Astro interesuje mnie przede wszystkim jako architektura "mniej JavaScript po stronie klienta". Nowy kompilator Rust to pragmatyczny krok - buildy w dużych projektach Astro potrafiły być powolne. Bardziej ciekawi mnie jednak AEO jako kierunek. Coraz więcej ruchu trafia nie z wyszukiwarki, ale z AI chatbotów, które cytują strony. Budowanie narzędzi ułatwiających AI rozumienie contentu to nie marketing, to rzeczywista zmiana w tym, jak użytkownicy trafiają na strony.

**Link:** [What's new in Astro - June 2026](https://astro.build/blog/whats-new-june-2026/)
