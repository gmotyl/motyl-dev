---
title: "HTML Renaissance i Narzędzia Performance - State of HTML 2023 i React Query"
excerpt: "Przegląd najnowszych trendów w HTML, problemów z Web Components, wyzwań dostępności oraz narzędzi do monitorowania wydajności"
publishedAt: "2024-12-19"
slug: "html-renaissance-performance-tools-state-of-html-2023"
hashtags: "#generated #pl #html #react #typescript #frontend #react-query #svg #web-components #accessibility #performance #speedcurve #css #container-queries #popover-api"
---

## State of HTML 2023 - Główne Wnioski

**TLDR:** Pierwsza edycja State of HTML Survey ujawnia, że mimo rozwoju JavaScript i CSS, HTML przechodzi własną rewolucję z nowymi API, ale deweloperzy wciąż borykają się z problemami SVG, Web Components i dostępności.

Fascynujące jest to, jak bardzo niedoceniliśmy HTML przez ostatnie lata. Podczas gdy wszyscy skupialiśmy się na najnowszych frameworkach JavaScript i nowych supermocach CSS, HTML cicho rozwijał swoje możliwości. Ta ankieta, przygotowana przez Lea Verou, pokazuje prawdziwy obraz ekosystemu HTML w 2023 roku.

Najbardziej zaskakującym wnioskiem dla mnie jest poziom entuzjazmu wokół Popover API. To ma sens - ile razy implementowaliśmy własne rozwiązania dla tooltipów, dropdownów czy modalów? Tysiące linii kodu, zarządzanie focusem, pozycjonowanie, obsługa klawiatury... A teraz mamy natywne API, które rozwiązuje większość tych problemów. To przypomina mi czasy, gdy border-radius zastąpił skomplikowane hacki z obrazkami.

Ciekawe jest też to, że SVG wciąż sprawia problemy. 96% respondentów używa elementu svg, ale to najczęściej wymieniana bolączka. To pokazuje lukę między popularnością technologii a jej dojrzałością w implementacjach przeglądarek. SVG ma ogromny potencjał, ale narzędzia i wsparcie przeglądarek wciąż nie nadążają za potrzebami deweloperów.

Wyniki dotyczące Web Components są szczególnie interesujące z perspektywy architektury aplikacji. Widzimy, że pomimo lat rozwoju, Web Components wciąż nie spełniają oczekiwań deweloperów, szczególnie w kwestii stylowania i Shadow DOM. To może wyjaśniać, dlaczego frameworki jak React czy Vue wciąż dominują - oferują lepsze developer experience dla komponentowej architektury.

**Key takeaways:**

- Popover API cieszy się ogromną popularnością wśród deweloperów
- SVG pozostaje problematyczne mimo powszechnego użycia
- Web Components wciąż mają drogę do przejścia przed mainstream adoption

**Link:** [State of HTML 2023](https://2023.stateofhtml.com/en-US/)

## Problemy z Web Components - Shadow DOM i Stylowanie

**TLDR:** Web Components wciąż nie spełniają obietnic natywnej alternatywy dla frameworkowych komponentów, głównie przez problemy ze stylowaniem, Shadow DOM i kompatybilnością z React.

To jest dla mnie szczególnie bolesny temat, bo pamiętam czasy, gdy Web Components miały być odpowiedzią na wszystkie problemy z komponentami. Miały dać nam natywną platformę, która zastąpi frameworki. Rzeczywistość okazała się znacznie bardziej skomplikowana.

Największym problemem jest Shadow DOM - technologia, która miała być rozwiązaniem, stała się główną przeszkodą. Izolacja stylów brzmi świetnie w teorii, ale w praktyce oznacza walkę z narzędziami CSS, które nie zostały zaprojektowane z myślą o tej izolacji. CSS-in-JS, utility frameworks jak Tailwind, a nawet podstawowe globalne style - wszystko to wymaga specjalnego podejścia w kontekście Shadow DOM.

Kompatybilność z React to kolejny duży problem. React ma swój własny system eventów (SyntheticEvents) i sposób zarządzania DOM, który nie zawsze dobrze współpracuje z Web Components. To prowadzi do sytuacji, gdzie musimy pisać dodatkowe warstwy abstrakcji, co przeczy całej idei prostoty Web Components.

Szczególnie frustrujące jest to, że podstawowe rzeczy jak przekazywanie danych do komponentów czy obsługa eventów wymagają znacznie więcej boilerplate'u niż w frameworkach. Tam gdzie w React napisałbym jedną linię JSX, w Web Components potrzebuję kilku linii JavaScript do rejestracji komponentu, obsługi atrybutów i lifecycle methods.

Server-Side Rendering to kolejna bolączka. Podczas gdy frameworki jak Next.js czy Remix oferują zaawansowane możliwości SSR, Web Components wciąż borykają się z podstawowymi problemami renderowania po stronie serwera.

**Key takeaways:**

- Shadow DOM utrudnia stylowanie i integrację z narzędziami CSS
- Kompatybilność z React pozostaje problematyczna
- SSR dla Web Components wciąż nie jest rozwiązane na poziomie frameworków

**Link:** [State of HTML 2023: Web Components](https://2023.stateofhtml.com/en-US/features/web_components/)

## Wyzwania Dostępności w Web Development

**TLDR:** Deweloperzy dbają o dostępność, ale brakuje im technicznego, edukacyjnego i organizacyjnego wsparcia - szczególnie w obszarach nawigacji klawiaturowej, zarządzania focusem i testowania dostępności.

Dostępność to temat, który mnie osobiście bardzo porusza, bo widzę ogromną lukę między intencjami a rzeczywistością. Wyniki pokazują, że deweloperzy naprawdę chcą tworzyć dostępne aplikacje, ale system ich zawodzi na wielu poziomach.

Najbardziej optymistyczne jest to, że podstawy są znane i stosowane. Semantyczny HTML, opisowe alt teksty, odpowiedni kontrast - te rzeczy stały się standardem. To pokazuje, że edukacja podstawowa działa. Problem zaczyna się, gdy przechodzimy do bardziej zaawansowanych aspektów dostępności.

Nawigacja klawiaturowa i zarządzanie focusem to obszary, gdzie widzę największe problemy w codziennej pracy. To nie jest tylko kwestia dodania tabindex - to wymaga przemyślenia całej architektury interakcji w aplikacji. Kiedy mamy single-page application z dynamicznym contentem, routing po stronie klienta i skomplikowane komponenty, zarządzanie focusem staje się naprawdę złożone.

Testowanie dostępności to kolejny duży problem. Automated testing może wychwycić podstawowe błędy, ale nie zastąpi testów z prawdziwymi użytkownikami screen readerów. A ile z nas faktycznie testuje swoje aplikacje z NVDA czy JAWS? Wyniki pokazują, że Chrome DevTools to najpopularniejsze narzędzie, ale to tylko pierwszy krok.

Organizacyjne wyzwania są równie ważne. Dostępność musi być wbudowana w proces od początku, nie może być afterthoughtem. To wymaga zmiany kultury w zespołach, budżetów na proper testing i edukacji wszystkich stakeholderów, nie tylko deweloperów.

**Key takeaways:**

- Podstawy dostępności są znane, problemy zaczynają się przy zaawansowanych funkcjach
- Testowanie z prawdziwymi screen readerami wciąż jest rzadkie
- Potrzeba systemowych zmian w organizacjach, nie tylko technicznych

**Link:** [State of HTML 2023: Accessibility](https://2023.stateofhtml.com/en-US/features/accessibility/)

## Czego Brakuje w HTML - Wishlist Deweloperów

**TLDR:** Deweloperzy najbardziej potrzebują natywnych elementów dla data tables, tabs, toggle switches i loading placeholders - komponenty, które obecnie wymagają znacznej ilości custom JavaScript.

To jest prawdopodobnie najciekawsza część całej ankiety, bo pokazuje prawdziwe pain points w codziennej pracy. Lista brakujących elementów to praktycznie katalog komponentów, które implementujemy w każdym większym projekcie.

Data tables na pierwszym miejscu to żadna niespodzianka. HTML table jest okropnie ograniczony - brak sortowania, filtrowania, paginacji czy resizable columns. Każdy, kto próbował stworzyć porządny data grid wie, ile to pracy. Biblioteki jak AG Grid czy TanStack Table są popularne właśnie dlatego, że rozwiązują problemy, które powinny być rozwiązane na poziomie platformy.

Tabs to kolejny klasyk. Ile razy implementowaliśmy tab navigation z aria-selected, role="tabpanel", keyboard navigation i wszystkimi accessibility requirements? A potem jeszcze responsive behavior, lazy loading content, nested tabs... To powinno być tak proste jak napisanie tab element.

Toggle switches pokazują problem z form controls w HTML. Mamy checkbox, ale nie mamy semantic toggle. Radio buttons, ale nie mamy button groups. File input, ale nie mamy drag-and-drop area. HTML forms zatrzymały się w rozwoju gdzieś w latach 90.

Loading placeholders to ciekawy punkt, bo pokazuje jak bardzo zmienił się web. Kiedyś strony ładowały się całościowo, teraz mamy streaming, progressive loading, skeleton screens. HTML nie nadąża za tymi wzorcami UX.

Fascynujące jest też to, jak te potrzeby odzwierciedlają ewolucję web developmentu. Nie potrzebujemy już marquee czy blink, ale potrzebujemy carousel, infinite scroll, context menus. To pokazuje, jak bardzo zmienił się sposób interakcji z webem.

**Key takeaways:**

- Największe braki to komponenty wymagające złożonej logiki (tables, tabs, toggles)
- HTML forms desperacko potrzebują modernizacji
- Nowe potrzeby odzwierciedlają ewolucję UX patterns w modern web apps

**Link:** [State of HTML 2023: Usage](https://2023.stateofhtml.com/en-US/usage/)

## SpeedCurve - Performance Budgets i Monitoring Regresji

**TLDR:** SpeedCurve oferuje comprehensive rozwiązanie do monitorowania wydajności z performance budgets, CI/CD integration i alertami, które pomagają zapobiegać regresji wydajności zamiast tylko je wykrywać po fakcie.

Performance budgets to jeden z tych konceptów, które brzmią oczywiste, ale w praktyce są rzadko implementowane properly. SpeedCurve podchodzi do tego problemu bardzo pragmatycznie - zamiast skupiać się tylko na monitoringu, dają narzędzia do prevention.

Największą wartością jest integration z CI/CD pipeline. To zmienia całą dynamikę pracy z performance. Zamiast cyklicznego "optymalizujemy, potem degraduje, znowu optymalizujemy", mamy continuous monitoring, które blokuje deploye przekraczające budżety. To jest game changer, bo performance staje się częścią definition of done, nie afterthoughtem.

Szczególnie interesująca jest funkcjonalność rate-of-change budgets. To nie tylko absolute thresholds, ale tracking volatility metrics. Czasami nagły spike w Core Web Vitals może być bardziej problematyczny niż stale podwyższone wartości, bo wskazuje na instabilność systemu.

Real User Monitoring z attribution dla Interaction to Next Paint to kolejny mocny punkt. INP to stosunkowo nowa metryka w Core Web Vitals, ale bardzo ważna dla user experience. Możliwość zobaczenia, które konkretnie elementy powodują problemy z responsiveness, to ogromna pomoc w debugowaniu.

Integration z narzędziami jak Jenkins, Travis czy CircleCI pokazuje, że SpeedCurve rozumie realia modern development workflows. Performance testing nie może być oddzielnym procesem - musi być wbudowane w sposób, w jaki już pracujemy.

**Key takeaways:**

- Performance budgets w CI/CD pipeline zapobiegają regresji zamiast tylko je wykrywać
- Rate-of-change monitoring pomaga identyfikować niestabilność wydajności
- RUM attribution dla INP ułatwia debugging problemów z responsiveness

**Link:** [SpeedCurve Performance Budgets](https://www.speedcurve.com/features/performance-budgets/)

## Old Dogs, New CSS Tricks - Bariery w Adopcji Nowych Funkcji

**TLDR:** Pomimo dostępności potężnych nowych funkcji CSS jak Container Queries czy CSS Layers, rzeczywiste użycie pozostaje niskie głównie przez "feature fatigue", wymówki o browser support i niewidoczne korzyści dla użytkowników końcowych.

Ten artykuł trafia w sedno problemu, z którym boryka się cała nasza branża. Mamy więcej nowych funkcji CSS niż kiedykolwiek wcześniej, ale adoption rate jest zaskakująco niski. Autor szczerze przyznaje, że z całej listy nowoczesnych funkcji używał tylko jednej w produkcji. To brzmi znajomo?

Problem z browser support jako wymówką jest szczególnie trafny. Często to nie jest rzeczywiste ograniczenie, ale convenient excuse żeby nie musieć uczyć się nowych rzeczy. Progressive enhancement jest możliwe dla większości nowych funkcji, ale wymaga więcej myślenia i planowania niż po prostu używanie starych, sprawdzonych metod.

Niewidoczne ulepszenia to kluczowy punkt. Border-radius był łatwy do zaadoptowania, bo natychmiast widać było różnicę - zamiast hacków z obrazkami mieliśmy jedną linię CSS. Container Queries czy CSS Layers to architectural improvements - korzyści są realne, ale nie tak oczywiste wizualnie.

Feature fatigue to realne zjawisko. Gdy co miesiąc pojawiają się nowe funkcje, trudno nadążyć, a jeszcze trudniej znaleźć czas na proper learning i experimentowanie. Łatwiej zostać przy tym, co znamy i działa.

Myślę, że kluczem jest stopniowe wprowadzanie nowych funkcji w miejscach, gdzie przynoszą największą wartość. Container Queries w design systems, CSS Layers dla better organization, :has() dla specific use cases. Nie trzeba przepisywać całego codebase - można zacząć od small wins.

**Key takeaways:**

- Browser support często to wymówka, nie rzeczywiste ograniczenie
- Architectural improvements są trudniejsze do zaadoptowania niż visual changes
- Feature fatigue utrudnia nadążanie za tempem rozwoju CSS

**Link:** [Old Dogs, new CSS Tricks](https://mxb.dev/blog/old-dogs-new-css-tricks/)
