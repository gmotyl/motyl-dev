---
title: 'Nextjs 155 Goes Back To School Scoped Releases New Version Pack And Publish Commands Svedit A Tiny Library For Building Editable Websites In Svelte'
excerpt: 'Przegląd 3 artykułów z ui.dev'
publishedAt: '2025-08-22'
slug: 'nextjs-155-goes-back-to-school-scoped-releases-new-version-pack-and-publish-commands-svedit-a-tiny-library-for-building-editable-websites-in-svelte'
hashtags: '#generated #pl #nodejs'
---

## Next.js 15.5 goes back to school

Guillermo i ekipa z Vercel wypuścili Next.js 15.5, i nie, to nie jest kolejna rewolucja, ale przygotowanie do tego co nadchodzi. To jest taki moment jak powrót do szkoły - niektórzy starzy znajomi muszą odejść, ale pojawiają się nowe, fajniejsze opcje.

Po pierwsze, Turbopack w końcu wchodzi w fazę beta. Vercel używa go już na wszystkich swoich stronach i obiecują od dwóch do pięciu razy szybsze buildy produkcyjne niż Webpack. Jak to robią? Rozpraszają pracę na wszystkie rdzenie CPU przez wszystkie fazy builda. To brzmi jak marzenie każdego developera, który siedział i czekał na webpack-a przez pół godziny.

Druga rzecz to stabilne Node.js middleware. W końcu nie jesteś ograniczony do Edge Runtime. Możesz używać dowolnych pakietów npm i Node API bez żadnych hacków. To oznacza, że middleware może obsługiwać bardziej złożone przypadki użycia bez komplikowania developer experience.

Trzecia nowość to w pełni typowane routy. Nieprawidłowe Link komponenty będą się łamać na etapie kompilacji, nie w produkcji. Eksporty routów i propsy dostają automatyczne typowanie, a nowa komenda `next typegen` pozwala wpiąć type safety w CI.

Oczywiście, jak to bywa z przejściowymi wersjami, coś musi odejść. Deprecjonują `next lint`, wsparcie dla AMP i `legacyBehavior` dla `next/link`.

**Key takeaways:**
- Turbopack w beta - 2-5x szybsze buildy niż Webpack
- Middleware może używać Node.js API bez ograniczeń Edge Runtime
- Typowane routy łapią błędy na etapie kompilacji
- Przygotowanie do Next.js 16

**Link:** [link](https://bytes.dev/archives/418)

## Scoped Releases: New version, pack, and publish commands

VLT wprowadza coś, czego brakowało w ekosystemie - porządne zarządzanie release'ami w monorepo bez pisania custom skryptów. Dodali trzy nowe komendy: `version`, `pack` i `publish`, wszystkie z pełnym wsparciem dla Dependency Selector Syntax przez flagę `--scope`.

To jest właśnie to, czego potrzebowaliśmy. Możesz teraz bumpować wersje, tworzyć tarballe i publikować tylko te workspace'y, które faktycznie chcesz. Dodali też `--publish-directory`, więc możesz bundlować do katalogu typu `dist/` przed pakowaniem lub publikowaniem.

Najfajniejsze jest to, że VLT ewaluuje selektor względem grafu zależności twojego projektu. Możesz na przykład zrobić `vlt version patch --scope="#package-a, #package-a :workspace"` i automatycznie zaktualizuje package-a i wszystkie workspace'y, które od niego zależą.

Albo możesz wydać prerelease tylko dla aplikacji: `vlt version prerelease --scope=':path("apps/*")'`. To jest graph-aware, więc nie musisz się martwić o kolejność czy zależności.

**Key takeaways:**
- Graph-aware release operations bez custom skryptów
- Pełne wsparcie dla Dependency Selector Syntax
- Możliwość targetowania konkretnych workspace'ów
- Bezpieczniejszy flow: version → pack → publish

**Link:** [link](https://blog.vlt.sh/blog/pack-publish-version)

## Svedit - A tiny library for building editable websites in Svelte

To jest ciekawe podejście do problemu rich text editorów. Svedit nie jest ograniczony do liniowego, character-based modelu jak większość editorów. Zamiast tego możesz kombinować text-ish content jak paragrafy czy headingi ze strukturalnym, form-like contentem.

Najfajniejsze w tym podejściu jest to, że modelujesz content w JSON-ie, renderujesz go Svelte componentami i edytujesz content bezpośrednio w layoucie. To jest visual in-place editing, ale bez mieszania się z third-party rendering API.

Referencyjną implementację zrobili w około dwóch tysiącach linii kodu. To oznacza, że możesz serwować editable web pages bez potrzeby oddzielnego Content Management Systemu.

Architekturalnie to jest bardzo smart - annotations są nodami, nie marks. To znaczy, że są addressable po ścieżce, schema-defined i copy-paste-safe. To jest graph-first content model z nested nodami, od prostych paragrafów do kompleksowych nodów z nested arrays i wieloma properties.

Najważniejsze: DOM i model selections się matchują. To eliminuje te flaky mapping layers, które znajdziesz w innych editorach i które są źródłem niekończących się bugów.

**Key takeaways:**
- Graph-first content model zamiast linear character-based
- Visual in-place editing bez third-party API
- Tylko 2000 linii kodu w referencyjnej implementacji
- Annotations jako nodes, nie marks
- DOM-model selection synchronization

**Link:** [link](https://svedit.vercel.app/)