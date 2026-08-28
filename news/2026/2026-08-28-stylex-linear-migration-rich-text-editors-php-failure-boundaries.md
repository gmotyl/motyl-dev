---
title: "StyleX kontra styled-components, edytory tekstu w React i granice błędów w PHP"
excerpt: "Jak Linear zmigrowało tysiąc PR-ów ze styled-components na StyleX, gotowe komponenty edytora rich text na Tiptap i shadcn/ui, oraz projektowanie granic błędów w płatnościach PHP."
publishedAt: "2026-08-28"
slug: "stylex-linear-migration-rich-text-editors-php-failure-boundaries"
hashtags: "#dailydev #frontend #react #css-in-js #stylex #performance #php #architecture #testing #generated #pl"
source_pattern: "daily.dev"
---

## Jak Linear zmigrowało React ze styled-components na StyleX

**TLDR:** Zespół Linear przeszedł przez ponad tysiąc pull requestów, zamieniając styled-components na StyleX, głównie z powodu narzutu wydajnościowego CSS-in-JS na runtime i utrzymaniowego statusu styled-components. Efekt to spadek pracy głównego wątku o 20-35% na widokach z dużą liczbą elementów.

**Summary:** Styled-components generuje i wstrzykuje CSS w trakcie renderowania, co samo w sobie było kosztem do przełknięcia, dopóki React 18 nie wprowadził renderowania współbieżnego. Wtedy ten koszt zaczął się kumulować w sposób, który był już widoczny na wolniejszych maszynach. Do tego doszedł fakt, że styled-components trafiło w tryb utrzymaniowy, a Linear chciało mieć jaśniejsze kontrakty stylowania w czasach, gdy coraz więcej kodu piszą agenty.

Zamiast oddać całą migrację modelom językowym, zespół połączył deterministyczny codemod z wąsko przypisanymi agentami AI i przeglądem ludzkim. Codemod, który udostępnili jako open source pod nazwą styled-components-to-stylex-codemod, radzi sobie z rozwiązywaniem selektorów między plikami i ma pokrycie testami regresyjnymi. Kolejność miała znaczenie: najpierw komponenty liściowe, które nie owijają innych styled components, potem stopniowo współdzielone prymitywy, w miarę jak rosła dojrzałość narzędzi i możliwości agentów.

Tam gdzie problem był bardziej "CSS-owy" niż stylowy, zostawili CSS Modules jako fallback, zamiast na siłę przepychać wszystko przez StyleX. Rozszerzyli też mechanizm theme'owania StyleX, żeby obsłużyć dynamicznie generowane motywy kolorystyczne Linear, co nie jest domyślnym scenariuszem tej biblioteki.

Liczby mówią same za siebie: praca CPU głównego wątku podczas renderowania spadła o 20 do 35% na widokach z dużą liczbą elementów, co przełożyło się na około 30% szybsze działanie na średniej klasy maszynie. Wstrzykiwanie reguł CSS podczas nawigacji spadło z setek do zera, bo StyleX rozwiązuje style w czasie builda, a nie w trakcie renderowania.

**Key takeaways:**
- Styled-components dokłada koszt na main threadzie przy każdym renderze, StyleX przenosi tę pracę do czasu builda
- Duże migracje stylowania warto robić kombinacją deterministycznego codemoda i wąsko przypisanych agentów, nie masowym "przepisz wszystko" promptem
- CSS Modules jako fallback dla przypadków, które nie pasują dobrze do modelu StyleX, to pragmatyczne, nie wstydliwe rozwiązanie

**Why do I care:** Migracja na tę skalę to dokładnie ten typ decyzji, którą architekt frontendowy musi umieć uzasadnić liczbami, a nie modą. Ciekawe jest to, że StyleX wygrało nie dlatego, że jest nowsze, tylko dlatego, że jego model wykonania (build-time) pasuje lepiej do świata renderowania współbieżnego. Jeśli macie duży kodebase na styled-components i zbliża się refresh Reacta, to case Linear jest konkretnym punktem odniesienia, ile pracy i jakiego typu narzędzi potrzeba, żeby to przejść bez katastrofy.

**Link:** [Styling Linear for the future with StyleX](https://daily.dev/posts/9EMPZ51m7)

## Gotowe komponenty edytora rich text na Tiptap i shadcn/ui

**TLDR:** Zestaw gotowych do użycia komponentów edytora tekstu dla React, zbudowany na Tiptap i dystrybuowany przez shadcn/ui. Zawiera klasyczny toolbar z ponad dwudziestoma kontrolkami oraz block editor w stylu Notion ze slash commands.

**Summary:** Projekt oferuje dwa warianty edytora. Pierwszy to tradycyjny Rich Text Editor z toolbarem mającym ponad dwadzieścia kontrolek: formatowanie tekstu, nagłówki od H1 do H6, listy, wyrównanie, osadzanie mediów. Drugi to Block Editor w stylu Notion, ze slash commands, uchwytami do przeciągania bloków, bubble menu pojawiającym się po zaznaczeniu tekstu, tabelami i listami zadań.

Każda kontrolka toolbara jest samodzielnym komponentem, co oznacza, że można wziąć tylko to, czego się potrzebuje, zamiast importować cały monolit. Ikony i stylowanie da się dostosować przez propsy i zmienne CSS, a instalacja odbywa się przez pojedynczą komendę shadcn CLI, dokładnie tak jak przy innych komponentach z tego ekosystemu.

Całość jest napisana w TypeScript i wydana na licencji MIT, co czyni ją realną opcją zarówno dla projektów komercyjnych, jak i hobbystycznych.

**Key takeaways:**
- Dwa gotowe warianty edytora: klasyczny toolbar i block editor w stylu Notion
- Komponenty modularne, instalowane przez shadcn CLI, więc łatwo wziąć tylko potrzebny fragment
- TypeScript i licencja MIT

**Why do I care:** Rich text editor to jedna z tych rzeczy, które zespoły wolą kupić niż zbudować, bo diabeł tkwi w szczegółach: obsłudze wklejania, historii undo, dostępności. Fakt, że to jest zbudowane na Tiptap, który sam w sobie jest solidnym fundamentem opartym o ProseMirror, a dystrybuowane przez shadcn, czyli kopiuj-wklej zamiast zależności w node_modules, to kombinacja, która pasuje do tego, jak dziś wygląda dobry frontendowy stack. Warto mieć to w zanadrzu, zanim ktoś znowu zaproponuje pisanie własnego edytora od zera.

**Link:** [Beautiful rich text editors, made simple](https://daily.dev/posts/cvXnsever)

## Granice błędów w PHP na przykładzie płatności

**TLDR:** Dogłębna analiza projektowania granic błędów w PHP na przykładzie workflow płatności partnerskich, z rozróżnieniem błędnych danych wejściowych, odmów biznesowych, przejściowych awarii dostawcy i defektów programistycznych.

**Summary:** Punktem wyjścia jest obserwacja, że "jedna płatność" może zakończyć się na cztery różne sposoby, i każdy z nich wymaga innego traktowania. Artykuł proponuje typy wynikowe, jak PaymentOutcome, dla normalnych alternatyw biznesowych, zamiast używać wyjątków tam, gdzie odmowa karty jest oczekiwanym, a nie wyjątkowym zdarzeniem.

Kluczowa zasada to tłumaczenie wyjątków dostawcy na granicy adaptera, przy jednoczesnym zachowaniu oryginalnego throwable, żeby nie stracić informacji diagnostycznej po drodze. Osobny rozdział poświęcony jest retry'om bezpiecznym pod względem idempotencji, bo timeout nie oznacza automatycznie, że płatność się nie powiodła. Dostawca mógł ją już zarejestrować, więc trzeba sprawdzić przez endpoint uzgadniający, zanim spróbuje się ponownie.

Artykuł rozróżnia też łapanie Exception od łapania Throwable. To pierwsze obejmuje Exception i jego podklasy, ale nie Error. To drugie obejmuje oba, w tym TypeError i inne defekty na poziomie silnika. Łapanie Throwable szeroko w kodzie aplikacji jest odradzane, bo maskuje błędy programistyczne jako zwykłe niepowodzenia biznesowe, i powinno być zarezerwowane dla prawdziwej granicy procesu albo set_exception_handler().

Całość zamyka praktyczna checklista operacyjna do bezpiecznego wdrażania integracji płatniczych, obejmująca testowanie kontraktu błędów przez Pest i logowanie danych obserwowalności bez wycieku sekretów.

**Key takeaways:**
- Typy wynikowe dla oczekiwanych alternatyw biznesowych, wyjątki dla rzeczywistych awarii
- Tłumacz wyjątki dostawcy na granicy adaptera, zachowując oryginalny throwable
- Retry tylko z trwałym kluczem idempotencji, timeout nie znaczy porażki

**Why do I care:** To jest artykuł, który mógłby powstać w dowolnym języku, nie tylko PHP, bo problem jest uniwersalny: mieszanie błędów oczekiwanych z błędami programistycznymi to jeden z najczęstszych grzechów w kodzie płatniczym, jaki widziałem. Rozróżnienie Exception od Throwable i pilnowanie, żeby nie łapać wszystkiego jednym blokiem catch, to szczegół, który wygląda na drobiazg, dopóki nie zacznie maskować prawdziwych bugów w produkcji. Dla frontendowca to też przypomnienie, że po drugiej stronie API te same reguły powinny obowiązywać, nawet jeśli akurat nie piszemy backendu.

**Link:** [PHP Errors, Exceptions, and Result Types: Designing Failure Boundaries](https://daily.dev/posts/VVlgsngnx)
