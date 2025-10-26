---
title: 'Incremental Path To React 19 React Conf Follow Up Restyle Zero Config Css For React The Ultimate Caching Definition Invalidation Optimization And Layers'
excerpt: 'Przegląd 5 artykułów z ui.dev'
publishedAt: '2024-05-27'
slug: 'incremental-path-to-react-19-react-conf-follow-up-restyle-zero-config-css-for-react-the-ultimate-caching-definition-invalidation-optimization-and-layers'
hashtags: '#generated #pl #react #performance #css'
---

## Incremental Path to React 19: React Conf Follow-Up

No, nie uwierzysz co się stało. React Router i Remix postanowiły się połączyć jak jakaś tech soap opera! Więc słuchaj - React Router v7 to właściwie to co miało być Remix v3. Brzmi jak chaos, ale ma to sens.

Przez ostatni rok Remix stał się praktycznie wrapperem na React Router. Wszystkie nowe feature'y zaczynają w React Router, a Remix je tylko re-exportuje. To jak mieć dwa repozytoria na tę samą rzecz - kompletnie bez sensu.

Najważniejsze zmiany: React Router v7 będzie non-breaking upgrade z v6, dostanie Vite plugin z Remix'a, będzie wspierać React 18 i 19, plus nowe rzeczy jak RSC, server actions i static pre-rendering. Remix wraca w przyszłości z nowym API zwanym "Reverb" - podobno jest piękny, ale bardzo różny od obecnego Remix'a.

**Key takeaways:**
- React Router v7 = Remix v3 z non-breaking upgrade
- Vite plugin z Remix przechodzi do React Router
- Nowy Remix "Reverb" będzie można uruchomić równolegle
- RSC zmienia wszystko - routing, bundling, data loading

**Link:** [link](https://remix.run/blog/incremental-path-to-react-19)

## Restyle - Zero Config CSS for React

Kolejny CSS-in-JS framework, bo przecież nie mamy ich wystarczająco dużo! Restyle próbuje być "zero config" rozwiązaniem dla React'a. Mają styled function, style props, css function i css prop - standardowy zestaw narzędzi.

Ciekawa rzecz to ich proxy system do oddzielania style props od zwykłych props. Styled function przyjmuje HTML tag lub komponent i zwraca styled komponent. Mogę użyć style props do dynamicznych stylów bazowanych na props.

Mają też pragma dla css prop - musisz ustawić jsxImportSource na "restyle" w tsconfig. Wspierają media queries, keyframes, global styles, theming, variants i pseudo selectors. Brzmi jak kolejny Emotion czy styled-components, ale może ma jakieś unique selling point.

**Key takeaways:**
- Zero config CSS-in-JS dla React
- Proxy system do separacji style props
- Pragma support dla css prop
- Pełny zestaw features: theming, variants, media queries

**Link:** [link](https://reactstyle.vercel.app/)

## The Ultimate Caching Definition: Invalidation, Optimization, and Layers

Wreszcie ktoś próbuje wyjaśnić caching w sposób, który ma sens! Definicja brzmi: "Cache to nieautorytatywna reprezentacja danych utrzymywana dla performance". Brzmi skomplikowanie, ale to naprawdę eleganckie ujęcie.

Kluczowe słowo to "nieautorytatywna" - cache nie jest źródłem prawdy. Jeśli masz username w Postgres, to Postgres jest autorytetem. Redis z kopią tego username to cache - szybszy dostęp, ale nie źródło prawdy.

Performance może pochodzić z różnych źródeł: szybszy hardware (RAM vs disk), bliższa lokalizacja (browser cache), mniejsza latencja. Browser cache może być na dysku, ale nadal szybszy niż serwer przez brak network round-trip.

"Reprezentacja" oznacza, że cache może być w innym formacie niż oryginał - skompresowany, pre-computed, transformed. To daje flexibility w optymalizacji.

**Key takeaways:**
- Cache = nieautorytatywna reprezentacja dla performance
- Różne źródła performance: hardware, lokalizacja, format
- Zawsze istnieje single source of truth
- Cache może być w innym formacie niż oryginał

**Link:** [link](https://stack.convex.dev/caching-in)

## Open sourcing graphql-query: 8.7x faster GraphQL query parser written in Rust

Stellate właśnie open-source'ował swój GraphQL parser napisany w Rust, który jest 8.7x szybszy! To nie jest kolejny "rewrite it in Rust" meme - oni mieli konkretne powody.

Stellate potrzebował manipulować GraphQL documents w locie - dodawać __typename fields, robić partial query caching. Istniejące Rust crate'y nie miały primitives do modyfikacji executable documents. Plus potrzebowali konwertować GraphQL introspection do client_schema.

Użyli Logos do lexingu - "Create ridiculously fast Lexers" i rzeczywiście jest ridiculously fast. Design goals były jasne: performance, elegant DX, document manipulation, scope tylko do GraphQL execution language.

Nie chcieli walczyć z lifetimes w Rust - chcieli elegant API. Po dwóch latach w production, obsługując miliardy requestów miesięcznie, postanowili to open-source'ować.

**Key takeaways:**
- 8.7x szybszy niż konkurencja dzięki Rust + Logos
- Umożliwia manipulację GraphQL documents w runtime
- Dwa lata w production u Stellate
- Focus na GraphQL execution language, nie schema

**Link:** [link](https://stellate.co/blog/graphql-query-parsing-8x-faster-with-rust)

## Introducing the Fabric UX System

Microsoft wypuścił Fabric UX System - ich design system dla Microsoft Fabric. To collection design guidance, patterns i reusable components. Bazuje na Fluent 2 Design System, więc jest spójny z resztą Microsoft ecosystem.

Mają framework-agnostic components używające Web Components - możesz używać z React, Angular, czy czymkolwiek innym. To smart approach, bo nie lock'ujesz się do jednego framework'a.

System zawiera design tokens, color palette, typography, spacing, layout principles, iconography i illustrations. Wszystko po to, żeby non-native Fabric extensions wyglądały spójnie z resztą produktu.

Web Components to dobry wybór dla design systems - single source of truth, works everywhere. Microsoft robi to dobrze, dając flexibility developers przy zachowaniu consistency.

**Key takeaways:**
- Design system bazowany na Fluent 2
- Web Components dla framework agnostic approach
- Pełny zestaw design tokens i guidelines
- Focus na consistency w Fabric extensions

**Link:** [link](https://blog.fabric.microsoft.com/en-us/blog/introducing-the-fabric-ux-system-our-primary-resource-for-extending-fabric-experiences)