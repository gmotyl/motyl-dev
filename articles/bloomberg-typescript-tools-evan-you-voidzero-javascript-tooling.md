---
title: "Bloomberg's TypeScript Tools, Evan You's VoidZero, and the Evolution of JavaScript Tooling"
excerpt: "Przegląd najnowszych narzędzi TypeScript od Bloomberg, ogłoszenie VoidZero przez Evana You oraz aktualizacje w ekosystemie JavaScript"
publishedAt: "2024-10-03"
slug: "bloomberg-typescript-tools-evan-you-voidzero-javascript-tooling"
hashtags: "#generated #pl #typescript #javascript #cli #vite #nodejs #deno #bun #eleventy #esm #tooling #bloomberg #voidzero #performance"
---

## Bloomberg's new TypeScript framework - Stricli

**TLDR:** Bloomberg wypuścił Stricli, nowy framework do budowania złożonych CLI w TypeScript z pełnym bezpieczeństwem typów i zerową liczbą zależności. To kolejne narzędzie w serii TypeScript-owych projektów od Bloomberg, po ts-blank-space.

**Summary:**

Bloomberg kontynuuje swoją serię imponujących projektów TypeScript z wprowadzeniem Stricli - frameworka do tworzenia złożonych interfejsów linii poleceń. Ten projekt jest szczególnie interesujący z perspektywy architektury, ponieważ Bloomberg świadomie zdecydował się na ograniczenie zakresu funkcjonalności w zamian za eliminację zewnętrznych zależności.

Kluczową motywacją dla powstania Stricli była frustracja z istniejących rozwiązań jak oclif czy clipanion, które choć oferują bezpieczeństwo typów, wprowadzają dodatkową złożoność i zależności często niepotrzebne w wielu przypadkach użycia. Stricli oferuje pełne wsparcie TypeScript z typami dla nazwanych flag i argumentów pozycyjnych, które definiuje się raz i przepływają przez całą aplikację.

Framework został zaprojektowany z podwójnym wsparciem dla ESM i CommonJS, co jest kluczowe w dzisiejszym fragmented ekosystemie JavaScript. Dodatkowo oferuje łatwe dzielenie kodu z narzędziami budującymi ESM oraz dynamiczne autouzupełnianie. Wszystkie dostępy systemowe są enkapsulowane w pojedynczym obiekcie kontekstu, co umożliwia opcjonalne wstrzykiwanie zależności.

Dla architektów i zespołów programistycznych, Stricli reprezentuje interesujące podejście do projektowania narzędzi - świadome ograniczenie zakresu w celu uzyskania prostoty i wydajności. To podejście może być szczególnie wartościowe w środowiskach korporacyjnych, gdzie kontrola nad zależnościami i przewidywalność są kluczowe. Zespoły mogą używać Stricli jako solidnej podstawy i dodawać tylko te funkcjonalności, których rzeczywiście potrzebują.

**Key takeaways:**
- Stricli eliminuje zewnętrzne zależności w zamian za ograniczony zakres funkcjonalności
- Oferuje pełne bezpieczeństwo typów TypeScript z typami przepływającymi przez całą aplikację  
- Wspiera zarówno ESM jak i CommonJS z możliwością dzielenia kodu i dynamicznego autouzupełniania

**Tradeoffs:**
- Gain zero dependencies and full type safety but sacrifice built-in features like interactive prompts and terminal styling
- Achieve better performance and control but require manual addition of commonly needed CLI features

**Link:** [Stricli on GitHub](https://github.com/bloomberg/stricli/)

## ts-blank-space - Fast Type-Stripping Compiler

**TLDR:** Bloomberg's ts-blank-space to szybki kompilator usuwający typy, który konwertuje TypeScript do JavaScript zastępując typy białymi znakami. Zachowuje oryginalne pozycje kodu, eliminując potrzebę sourcemap.

**Summary:**

ts-blank-space reprezentuje fascynujące podejście do problemu kompilacji TypeScript, które może fundamentalnie zmienić sposób, w jaki myślimy o procesie budowania aplikacji. Zamiast tradycyjnego podejścia TypeScript kompilatora, który transformuje kod i przesuwa elementy, ts-blank-space po prostu zastępuje adnotacje typów białymi znakami.

Ta technika rozwiązuje kluczowy problem w developer experience - niedokładność stack trace'ów i punktów breakpoint. Gdy tradycyjny kompilator TypeScript transformuje kod, zmienia strukturę i pozycje linii, co wymaga generowania sourcemap do mapowania błędów z powrotem do oryginalnego kodu. ts-blank-space zachowuje oryginalne koordynaty kodu, eliminując całkowicie potrzebę sourcemap.

Implementacja jest niezwykle elegancka - tylko 700 linii kodu napisanych w czystym TypeScript, wykorzystujących oryginalny parser TypeScript. To czyni ją łatwą do zrozumienia i modyfikacji, co jest kluczowe dla zespołów, które chcą dostosować proces budowania do swoich potrzeb.

Dla architektów, ts-blank-space oferuje możliwość znacznego uproszczenia pipeline'u budowania. Eliminacja sourcemap oznacza szybsze buildy, mniejsze artefakty i prostsze debugowanie. Może to być szczególnie wartościowe w środowiskach z dużymi bazami kodu, gdzie czas budowania i złożoność toolchain są krytyczne. Zespoły mogą rozważyć adopcję tej techniki jako alternatywy dla tradycyjnej kompilacji, szczególnie w projektach gdzie szybkość developmentu i prostość są priorytetem.

**Key takeaways:**
- Zastępuje typy TypeScript białymi znakami zamiast transformacji kodu
- Eliminuje potrzebę sourcemap zachowując oryginalne pozycje w kodzie
- Implementacja w 700 liniach kodu czyni ją łatwą do zrozumienia i modyfikacji

**Link:** [ts-blank-space](https://bloomberg.github.io/ts-blank-space)

## Evan You Announces VoidZero - Next Generation JavaScript Toolchain

**TLDR:** Evan You, twórca Vue i Vite, założył VoidZero Inc. z 4.6 miliona dolarów finansowania seed, aby zbudować zunifikowany, wysokowydajny toolchain open-source dla ekosystemu JavaScript.

**Summary:**

Ogłoszenie VoidZero przez Evana You to prawdopodobnie jedna z najważniejszych wiadomości dla przyszłości ekosystemu JavaScript w tym roku. Po czterech latach sukcesu Vite, które osiągnęło ponad 15 milionów pobrań tygodniowo i stało się fundamentem dla meta-frameworków jak Remix, Nuxt, Astro czy SvelteKit, You zdecydował się na jeszcze bardziej ambitny projekt.

Problem, który VoidZero ma rozwiązać, jest fundamentalny dla całego ekosystemu JavaScript - fragmentacja i nieefektywność wynikająca z konieczności łączenia setek różnych narzędzi. Każda aplikacja JavaScript polega na mnogości zewnętrznych zależności, a konfiguracja ich współpracy pozostaje jednym z najbardziej zniechęcających zadań w cyklu rozwoju.

Wizja zunifikowanego toolchain oznacza użycie tego samego AST, resolvera i module interop dla wszystkich zadań - parsowania, transformacji, lintingu, formatowania, bundlingu, minifikacji i testowania. To może wyeliminować niespójności i zredukować koszty redundantnego parsowania, które obecnie obciążają każdy projekt JavaScript.

Kluczowym elementem strategii jest napisanie toolchain w języku kompilowanym do kodu natywnego, zaprojektowanym od podstaw dla maksymalnej wydajności z pełną paralelizacją i niskonakładowym wsparciem dla pluginów JavaScript. To podejście może przynieść dramatyczne usprawnienia wydajności, które są szczególnie potrzebne w dużych projektach korporacyjnych.

Dla architektów i liderów technicznych, VoidZero reprezentuje potencjalnie przełomową zmianę w sposobie budowania aplikacji JavaScript. Zunifikowany toolchain może znacznie uprościć konfigurację projektów, zredukować liczbę zależności i poprawić wydajność. Zespoły powinny śledzić rozwój tego projektu, ponieważ może on fundamentalnie zmienić landscape narzędzi JavaScript w nadchodzących latach.

**Key takeaways:**
- VoidZero ma zunifikować cały JavaScript toolchain używając wspólnego AST i resolvera
- Projekt otrzymał 4.6 miliona dolarów finansowania seed od Accel
- Będzie napisany w języku kompilowanym natywnie dla maksymalnej wydajności

**Link:** [Announcing VoidZero](https://voidzero.dev/posts/announcing-voidzero-inc)

## JavaScript Runtimes and Package Management in 2024

**TLDR:** Przegląd aktualnego stanu runtime'ów JavaScript pokazuje kontynuowany wzrost Node.js, znaczący rozwój Deno i dynamiczny wzrost Bun po wydaniu wersji 1.0 we wrześniu 2023.

**Summary:**

Krajobraz runtime'ów JavaScript przechodzi przez fascynujący okres transformacji, gdzie długoletnia dominacja Node.js napotyka na poważną konkurencję ze strony nowszych rozwiązań. Node.js, mimo że wciąż utrzymuje pozycję lidera w systemach produkcyjnych, odnotowuje lekkie spowolnienie tempa wzrostu, co prawdopodobnie wynika z rosnącego udziału alternatywnych rozwiązań.

Deno, będące dziełem Ryana Dahla - oryginalnego twórcy Node.js, reprezentuje znaczący krok naprzód w technologii runtime'ów. Jego nacisk na bezpieczeństwo poprzez szczegółowe kontrole dostępu i natywne wsparcie dla TypeScript czyni go atrakcyjną opcją dla zespołów priorytetowo traktujących bezpieczeństwo. Jeśli obecny trend wzrostu się utrzyma, Deno może przewyższyć Node.js pod względem popularności w 2024 roku, choć to nie przełoży się bezpośrednio na użycie produkcyjne.

Bun wyróżnia się jako najbardziej dynamicznie rozwijający się gracz w tej kategorii. Po wydaniu wersji 1.0 we wrześniu 2023, jego wyjątkowa szybkość wykonania dzięki just-in-time compilation ustanawia nowe standardy wydajności. Porównując wczesny wzrost Bun z innymi narzędziami w kategorii, kształtuje się on na wysokowydajnego gracza.

Dla architektów i zespołów, wybór runtime'a staje się coraz bardziej strategiczną decyzją. Node.js pozostaje bezpiecznym wyborem dla systemów produkcyjnych ze względu na dojrzałość ekosystemu i szerokie wsparcie społeczności. Deno może być interesującą opcją dla nowych projektów gdzie bezpieczeństwo i nowoczesność są kluczowe. Bun, mimo swojej młodości, może być rozważany w projektach gdzie wydajność wykonania jest krytyczna, ale zespoły muszą być przygotowane na potencjalne problemy związane z dojrzałością ekosystemu.

**Key takeaways:**
- Node.js utrzymuje dominację w produkcji mimo spowolnienia wzrostu popularności
- Deno pokazuje znaczący wzrost z naciskiem na bezpieczeństwo i natywne wsparcie TypeScript
- Bun wykazuje najszybszy wzrost po wydaniu wersji 1.0, oferując wyjątkową wydajność

**Link:** [JS Toolbox 2024: Runtime environments](https://raygun.com/blog/js-toolbox-part-1/)

## Eleventy 3.0.0 - Major ESM Update

**TLDR:** Eleventy 3.0.0 wprowadza pełne wsparcie ESM, jest o 20% mniejszy, ma 11% mniej zależności i oferuje 9% szybszą instalację npm. Zachowuje wsparcie dla CommonJS.

**Summary:**

Wydanie Eleventy 3.0.0 po 22 pre-release'ach i ponad roku pracy reprezentuje znaczącą ewolucję jednego z najciekawszych generatorów stron statycznych. Przejście na ESM przy jednoczesnym zachowaniu wsparcia dla CommonJS pokazuje dojrzałe podejście do migracji w ekosystemie JavaScript, gdzie nie wszystkie projekty są gotowe na pełne przejście na moduły ES.

Kluczową zaletą tej wersji jest nie tylko modernizacja, ale także optymalizacja - redukcja rozmiaru o 20%, zmniejszenie liczby zależności o 11% i przyspieszenie instalacji npm o 9%. Te usprawnienia są szczególnie wartościowe w środowiskach CI/CD, gdzie czas budowania bezpośrednio wpływa na produktywność zespołów.

Wprowadzenie asynchronicznej konfiguracji otwiera nowe możliwości dla złożonych setup'ów, gdzie konfiguracja może wymagać operacji I/O, takich jak ładowanie danych z zewnętrznych API czy systemu plików. Virtual Templates API to szczególnie interesująca funkcjonalność dla twórców pluginów, umożliwiająca programowe dodawanie treści bez fizycznych plików.

Nowy IdAttribute plugin automatycznie dodaje atrybuty id do nagłówków, co jest kluczowe dla dostępności i SEO. Plain-text Bundler pozwala na tworzenie per-page bundli CSS, co może znacznie poprawić wydajność ładowania stron poprzez eliminację nieużywanego CSS.

Dla zespołów rozważających Eleventy, wersja 3.0 oferuje znacznie lepszą wydajność i nowoczesną architekturę przy zachowaniu prostoty, która zawsze była mocną stroną tego narzędzia. Wsparcie dla różnych package managerów (pnpm, yarn) i runtime'ów (Deno) czyni go bardziej uniwersalnym wyborem w różnorodnych środowiskach technologicznych.

**Key takeaways:**
- Pełne wsparcie ESM z zachowaniem kompatybilności z CommonJS
- Znaczące usprawnienia wydajności: 20% mniejszy, 11% mniej zależności, 9% szybsza instalacja
- Nowe funkcjonalności jak Virtual Templates, IdAttribute plugin i Plain-text Bundler

**Link:** [Eleventy v3.0.0 Release](https://github.com/11ty/eleventy/releases/tag/v3.0.0)

---

**Disclaimer:** This article was generated using [newsletter-ai](https://github.com/gmotyl/newsletter-ai) powered by claude-sonnet-4-20250514 LLM. While we strive for accuracy, please verify critical information independently.
