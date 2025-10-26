---
title: 'Firefox W Kocu Dodaje Wsparcie Dla Progressive Web Apps React 191 Wprowadza Owner Stack Babylonjs 80 Z Ibl Shadows I Area Lights'
excerpt: 'Przegląd 4 artykułów z ui.dev'
publishedAt: '2025-03-31'
slug: 'firefox-w-kocu-dodaje-wsparcie-dla-progressive-web-apps-react-191-wprowadza-owner-stack-babylonjs-80-z-ibl-shadows-i-area-lights'
hashtags: '#generated #pl #react #nodejs #css'
---

## Firefox w końcu dodaje wsparcie dla Progressive Web Apps

Po latach ignorowania próśb swoich użytkowników, Firefox w końcu wprowadza wsparcie dla Progressive Web Apps. Można już włączyć eksperymentalną flagę w najnowszych buildach Nightly, choć funkcjonalność jeszcze nie działa.

Mozilla nazywa to "Taskbar Tabs" i ma to być inne podejście niż w innych przeglądarkach. David Rubino z zespołu produktowego mówi, że celem jest oferowanie bardziej aplikacyjnego doświadczenia dla dowolnej strony, ale bez poczucia, że nie używasz Firefoksa. To oznacza, że web apki będą nadal pokazywać główny pasek narzędzi z paskiem adresu i rozszerzeniami.

Web apki w Firefoksie będą mogły pokazywać własne ikony w menu aplikacji i taskbarze, pozostaną otwarte do momentu zamknięcia, a także będą mogły obsługiwać linki do swoich stron. Interesującą funkcją ma być możliwość przejścia dowolnej karty w tryb web apki, nawet tymczasowo, bez potrzeby ponownego logowania.

**Key takeaways:**
- Firefox wprowadza wsparcie PWA jako "Taskbar Tabs"
- Inne podejście niż konkurencja - zachowanie paska narzędzi
- Możliwość tymczasowego przejścia karty w tryb web apki
- Funkcja dostępna w Firefox Nightly z flagą browser.taskbarTabs.enabled

**Link:** [link](https://www.omgubuntu.co.uk/2025/03/firefox-nightly-supports-web-apps-taskbar-tabs)

## React 19.1 wprowadza Owner Stack

Facebook wypuścił React 19.1 z kilkoma ciekawymi nowościami. Największą z nich jest Owner Stack - nowy sposób debugowania, który pokazuje które komponenty są bezpośrednio odpowiedzialne za renderowanie konkretnego komponentu.

Owner Stack to string reprezentujący komponenty odpowiedzialne za renderowanie, dostępny tylko w trybie deweloperskim. To różni się od Component Stack, który pokazuje hierarchię komponentów prowadzącą do błędu. Nowe API captureOwnerStack może być używane do ulepszania error overlay lub logowania relacji komponentów podczas debugowania.

React 19.1 wprowadza też ulepszone wsparcie dla Suspense boundaries, które mogą być używane wszędzie - na kliencie, serwerze i podczas hydratacji. Poprawiono też scheduling hydratacji, co redukuje niepotrzebne renderowanie po stronie klienta.

Ciekawą zmianą jest też format useId - zamiast dwukropków używa teraz znaków guillemet, więc zamiast ":r123:" mamy "«r123»", co tworzy poprawne selektory CSS.

**Key takeaways:**
- Owner Stack dla lepszego debugowania komponentów
- Ulepszone wsparcie dla Suspense boundaries
- Nowy format useId z poprawnymi selektorami CSS
- React.act nie jest już dostępne w production builds

**Link:** [link](https://github.com/facebook/react/releases/tag/v19.1.0)

## Babylon.js 8.0 z IBL Shadows i Area Lights

Microsoft wypuścił Babylon.js 8.0 z kilkoma przełomowymi funkcjami dla grafiki webowej. Największą nowością są IBL Shadows - cienie oparte na Image-Based Lighting, które zostały opracowane we współpracy z Adobe.

Image-Based Lighting to technika oświetlenia, która aproximuje światło środowiskowe na podstawie obrazu źródłowego. Babylon.js wspierał IBL od ponad 8 lat, ale teraz można też generować cienie z tego samego obrazu. To ogromny krok naprzód w realizm renderowania.

Drugą wielką nowością są Area Lights - często żądana funkcja, która pozwala określić dwuwymiarowy kształt emitujący światło. To jak duże rozproszone światło z planu filmowego, które dodaje nowy wymiar do scen.

Największą zmianą jest jednak Node Render Graph - system, który daje pełną kontrolę nad pipeline'em renderowania. Do tej pory renderowanie w Babylon było czarną skrzynką, ale teraz można customizować każdą część procesu renderowania na GPU. Jest nawet wizualny edytor do tworzenia własnych pipeline'ów renderowania.

**Key takeaways:**
- IBL Shadows - cienie oparte na Image-Based Lighting
- Area Lights dla bardziej realistycznego oświetlenia
- Node Render Graph dla pełnej kontroli nad renderowaniem
- Nowy lightweight viewer dla lepszej wydajności

**Link:** [link](https://blogs.windows.com/windowsdeveloper/2025/03/27/announcing-babylon-js-8-0/)

## Problemy z deploymentem Next.js na różnych platformach

Netlify opublikowało szczegółowy artykuł o wyzwaniach związanych z utrzymaniem wsparcia dla Next.js na platformach innych niż Vercel. Problem polega na tym, że Next.js nie używa systemu adapterów, który jest standardem w innych frameworkach.

Większość nowoczesnych frameworków webowych używa koncepcji adapterów, pluginów lub presetów do dostosowania outputu do konkretnego środowiska deploymentu. Przykłady to Remix, Astro, SvelteKit, Gatsby i Qwik. Next.js tego nie robi, co zmusza platformy jak Netlify, Cloudflare, AWS Amplify czy Azure do tworzenia własnych rozwiązań.

Netlify musi utrzymywać własny runtime adapter dla Next.js, który ma ponad 15 tysięcy linii kodu i wymaga ciągłego utrzymania. Każda nowa wersja Next.js może wprowadzić breaking changes, które wymagają aktualizacji adaptera.

Problem pogłębia fakt, że wiele funkcji Next.js jest dokumentowanych tylko wewnętrznie w Vercel, a publiczna dokumentacja często nie opisuje wszystkich detali implementacyjnych. To sprawia, że inne platformy muszą reverse-engineerować funkcjonalność na podstawie kodu źródłowego.

**Key takeaways:**
- Next.js nie wspiera systemu adapterów jak inne frameworki
- Platformy muszą utrzymywać własne, skomplikowane adaptery
- Brak przejrzystości w dokumentacji funkcji Next.js
- Potrzeba lepszej współpracy open source w ekosystemie Next.js

**Link:** [link](https://www.netlify.com/blog/how-we-run-nextjs/)