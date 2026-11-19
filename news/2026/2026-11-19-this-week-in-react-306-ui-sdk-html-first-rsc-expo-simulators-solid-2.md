---
title: "This Week In React #306: Vercel UI SDK, HTML-first RSC, Expo Simulators, Solid 2.0 i webpack z natywnym CSS"
excerpt: "Vercel wypuścił beta UI SDK z zachowaniami dla agentów, powstał eksperyment bez podwójnego wysyłania treści RSC, Expo dało agentom chmurowe symulatory, a Solid 2.0 jest gotowy."
publishedAt: "2026-11-18"
slug: "this-week-in-react-306-ui-sdk-html-first-rsc-expo-simulators-solid-2"
hashtags: "#thisweekinreact #react #server-components #nextjs #react-native #expo #solidjs #webpack #agents #generated #pl"
source_pattern: "This Week In React"
---

## Vercel UI SDK: bezgłowe zachowania dla agentów

**TLDR:** Beta nowego SDK od Vercela daje ponad pięćdziesiąt dostępnych zachowań interfejsu, z których agent składa własne komponenty. Do tego ponad pięćdziesiąt komponentów bez stylów dla React, Vue, Svelte, Solid i Web Components.

**Summary:** Zachowania takie jak popup, typeahead czy roving focus są wydzielone z gotowych komponentów, a agent je łączy. Agenci mogą też używać samego interfejsu przez createAgent lub WebMCP, czytając stronę i klikając bez zrzutów ekranu. Autorzy newslettera przypominają, że podobny pomysł mają React Aria z bezgłowymi hookami i Chakra UI z maszynami stanów Zag, ale ta wersja wygląda obiecująco w erze agentów.

W tym samym numerze jest eksperyment HTML-first React, nieoficjalny fork, który usuwa statyczną treść komponentów serwerowych z payloadu Flight. Przy pierwszym ładowaniu strona RSC wysyła tę samą zawartość dwa razy: jako HTML i w payloadzie. Fork z flagą to eliminuje i na dużej stronie z tabelą obsługuje około trzy razy więcej żądań na sekundę, przetestowany z poprawionymi wersjami Next.js i Waku. Zespół Next.js opisuje też, że po fali 51 advisories w tym roku każdy PR przechodzi przegląd adversarialnego agenta bezpieczeństwa. Porównanie Remix v3 z TanStack Start na tej samej aplikacji wypada podobnie wydajnościowo, ale autorzy wciąż polecają TanStack Start, bo w Remixie brakuje integracji z wtyczkami Vite i Vitest.

Z bibliotek: Fate 2.0 od Christopha Nakazawy zarządza teraz stanem klienta i współpracuje z GraphQL, React Virtualized 10 to przepisanie na TypeScript z hookami, React Flow 13 ma podzielone stany i hooki useNode oraz useEdge, a React Helmet Async 3.1 znów deduplikuje tytuły na React 19. Dragology proponuje deklaratywny drag and drop, a React Anatomy to panel DevTools pokazujący komponenty jako warstwy 3D.

**Key takeaways:**
- Bezgłowe zachowania zamiast gotowych komponentów to kierunek pod agentów.
- Podwójne wysyłanie treści w RSC to znany koszt, a eksperyment pokazuje około 3x większą przepustowość.
- Remix 3 wypada podobnie wydajnościowo do TanStack Start, ale ma cieńszy ekosystem.

**Why do I care:** Jeśli utrzymujesz design system, warto przyjrzeć się podziałowi na zachowania i warstwę wizualną, bo to ułatwia pracę agentom i człowiekowi. Fork HTML-first to na razie eksperyment, nie coś do produkcji, ale pokazuje, gdzie RSC kosztuje najwięcej.

**Link:** [This Week In React #306](https://thisweekinreact.com)

## Expo Simulators i Exact: mobile przebudowywane pod agentów

**TLDR:** Expo uruchomiło chmurowe symulatory iOS i Androida, którymi steruje agent, a Exact dostał alfa usługi do budowania i instalowania aplikacji iOS.

**Summary:** Każda sesja Expo Simulators działa na osobnej maszynie wirtualnej, więc równoległe agenty nie kolidują. Obraz jest streamowany do przeglądarki, gdzie człowiek może przejąć sterowanie. Sesja kończy się nagraniem, zrzutami i logami, które agent dołącza do PR-a, więc recenzent widzi działającą zmianę zamiast samego diffa. Działa to z dowolną aplikacją budowaną na symulator: Expo, SwiftUI, Flutter czy Unity. Exact, nowy framework w Rust od Expo, wprowadza Exact Build, czyli szybką usługę budowania iOS na Linuksie, oraz AppDrop do podpisywania i instalowania aplikacji. Razem zamykają pętlę od zgłoszenia do telefonu.

W świecie mobile pojawiły się też Bottom Sheet 1.0, Nitro SQLite 10.4 ze sterownikiem Drizzle, RFC o addonach Node-API w React Native oraz Graphite z jednym wspólnym urządzeniem Dawn dla Skia, Three.js i ML.

**Key takeaways:**
- Dowód w postaci nagrania w PR-ze zastępuje zaufanie do samego diffa.
- Budowanie iOS bez Maca staje się możliwe dla agentów na Linuksie i Windows.
- Wiele wydań bibliotek mobilnych wskazuje na dojrzewanie ekosystemu.

**Why do I care:** Dla zespołu mobilnego to ciekawy sposób na weryfikację zmian bez ręcznego klikania, ale zależność od chmurowej usługi i alfa Exact kazałyby mi zacząć od małego eksperymentu.

**Link:** [Expo Simulators](https://thisweekinreact.com)

## Solid 2.0, webpack z natywnym CSS i zielone wątki w Node.js

**TLDR:** Solid 2.0 w końcu wyszedł, webpack obsługuje CSS i HTML natywnie, a Node.js eksperymentuje z zielonymi wątkami.

**Summary:** Solid 2.0 ma asynchroniczny graf reaktywny, w którym obliczenia mogą zwracać obietnice albo iteratory asynchroniczne, a framework sam zajmuje się stanami ładowania, wyścigami i optymistycznym cofaniem zmian. Funkcje serwerowe trafiły do rdzenia, a SolidStart został wycofany. Webpack 5.109 odblokował natywne CSS, moduły CSS i wejścia HTML, więc część loaderów i pluginów jest przestarzała. Oxlint 1.92 oferuje opcjonalny backend tsrs, który przyspiesza linting z typami nawet siedmiokrotnie i zużywa do 75% mniej pamięci. Node.js ma eksperymentalny PR z node:green_threads, tańszymi niż workery, a npm RFC proponuje pole variants, żeby wybierać gotowe binaria bez skryptów instalacji.

**Key takeaways:**
- Solid 2.0 wbudowuje obsługę asynchroniczności w graf reaktywny.
- Webpack przestaje wymagać zestawu loaderów dla CSS i HTML.
- Oxlint z tsrs obiecuje wielokrotnie szybszy linting z typami.

**Why do I care:** Jeśli masz stary projekt na webpacku, natywny CSS usuwa kilka zależności. Wynik Oxlinta sprawdziłbym na własnym repo, bo deklarowane 7x zależy od projektu.

**Link:** [Solid 2.0 i webpack w This Week In React #306](https://thisweekinreact.com)
