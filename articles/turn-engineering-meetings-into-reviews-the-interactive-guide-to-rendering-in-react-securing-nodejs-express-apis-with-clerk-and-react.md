---
title: 'Turn Engineering Meetings Into Reviews The Interactive Guide To Rendering In React Securing Nodejs Express Apis With Clerk And React'
excerpt: 'Przegląd 5 artykułów z ui.dev'
publishedAt: '2024-10-11'
slug: 'turn-engineering-meetings-into-reviews-the-interactive-guide-to-rendering-in-react-securing-nodejs-express-apis-with-clerk-and-react'
hashtags: '#generated #pl #react #typescript #nodejs #ai'
---

## Turn Engineering Meetings into Reviews

Słuchajcie, to jest coś co każdy z nas zna. Siedzisz sobie, kodzisz w spokoju, a tu nagle pojawia się zaproszenie na kolejne spotkanie. I pierwsza reakcja to nie "o super!", tylko westchnienie. Ale problem nie leży w spotkaniach jako takich, tylko w tym jak je prowadzimy.

Większość spotkań to po prostu drogie aktualizacje statusu albo dyskusje, które mogłyby być mailem. Brakuje im jasnych celów, odpowiednich ludzi i danych potrzebnych do podejmowania sensownych decyzji. Zamiast rozwiązywać prawdziwe problemy, tańczymy wokół nich.

Ale jest nadzieja. Dobre spotkanie powinno angażować odpowiednich ludzi we właściwym czasie, mieć jasne cele, być oparte na danych i skupiać się na prawdziwych problemach, nie na statusie. Brzmi znajomo? To są dokładnie te same cechy co w dobrym code review.

Żeby przekształcić spotkania w efektywne reviews, musisz najpierw zidentyfikować jakie dane potrzebujesz. Jeśli robisz sprint review, potrzebujesz danych o pull requestach. Jeśli sprawdzasz cały engineering, interesują cię alokacje zasobów i alignment z celami biznesowymi. To są dwa różne zestawy danych.

**Kluczowe wnioski:**
- Spotkania powinny być data-driven, nie status updates
- Potrzebne są odpowiednie dane na odpowiednim poziomie
- Pre-work i interpretacja danych są kluczowe
- Struktura podobna do code review zwiększa efektywność

**Link:** https://www.sleuth.io/post/meetings-vs-reviews/

Kluczowe wnioski:
- - Spotkania powinny być data-driven, nie status updates
- Potrzebne są odpowiednie dane na odpowiednim poziomie
- Pre-work i interpretacja danych są kluczowe
- Struktura podobna do code review zwiększa efektywność
- https://www.sleuth.io/post/meetings-vs-reviews/

Link: ** https://www.sleuth.io/post/meetings-vs-reviews/

## The Interactive Guide to Rendering in React

React w swojej najczystszej formie to biblioteka do budowania interfejsów użytkownika. Cały mental model można przedstawić jako formułę: view equals function of state. Ale to co nadal myli ludzi, nawet doświadczonych React developerów, to kiedy dokładnie i jak ta funkcja jest wywoływana.

Rendering to po prostu fancy sposób na powiedzenie, że React wywołuje twój function component z zamiarem zaktualizowania widoku. Kiedy React renderuje komponent, dzieją się dwie rzeczy. Najpierw React tworzy snapshot twojego komponentu, który przechwytuje wszystko co React potrzebuje do aktualizacji widoku w tym konkretnym momencie - props, state, event handlers i opis UI. Potem React używa tego opisu do zaktualizowania widoku.

Żeby dostać początkowy UI dla aplikacji, React robi initial render, zaczynając od root aplikacji. Oczywiście ten initial render jest najmniej interesujący. Bez możliwości re-renderowania React byłby w większości bezużyteczny.

React re-renderuje komponent kiedy state się zmienia. To ma sens - nie chcielibyśmy przeliczać widoku jeśli state się nie zmienił. I to jest tak proste jak to brzmi.

**Kluczowe wnioski:**
- Rendering to wywołanie function component przez React
- React tworzy snapshot komponentu z props, state i opisem UI
- Re-render następuje gdy state się zmienia
- Initial render zaczyna się od root aplikacji

**Link:** https://ui.dev/why-react-renders

Kluczowe wnioski:
- - Rendering to wywołanie function component przez React
- React tworzy snapshot komponentu z props, state i opisem UI
- Re-render następuje gdy state się zmienia
- Initial render zaczyna się od root aplikacji
- https://ui.dev/why-react-renders

Link: ** https://ui.dev/why-react-renders

## Securing Node.js Express APIs with Clerk and React

Kiedy wywołujesz wiele zewnętrznych API z aplikacji używającej Clerk do autentykacji, musisz upewnić się, że każde API request jest właściwie uwierzytelnione i zabezpieczone. Implementacja autentykacji w Express czy Node.js jest kluczowa dla zapewnienia integralności, bezpieczeństwa i niezawodnej pracy twojego API.

Clerk oferuje dwa middleware dla aplikacji Express. ClerkExpressWithAuth dołącza sesję uwierzytelnionego użytkownika do request object, pozwalając na dostęp do informacji o użytkowniku w route handlers. ClerkExpressRequireAuth zapewnia, że tylko uwierzytelnione requesty mogą dostać się do chronionych routes i rzuci błąd jeśli request nie jest uwierzytelniony.

Tutorial pokazuje jak stworzyć API z Express, zainstalować potrzebne paczki jak express, cors, dotenv i Clerk SDK, oraz jak używać obu middleware na różnych routach żeby przetestować zachowanie każdego z nich.

**Kluczowe wnioski:**
- Clerk oferuje dwa middleware: WithAuth i RequireAuth
- WithAuth dołącza sesję do request, RequireAuth blokuje nieuwierzytelnionych
- Potrzebujesz CLERK_SECRET_KEY w zmiennych środowiskowych
- Różne middleware dla różnych poziomów zabezpieczeń

**Link:** https://go.clerk.com/9VDxMYe

Kluczowe wnioski:
- - Clerk oferuje dwa middleware: WithAuth i RequireAuth
- WithAuth dołącza sesję do request, RequireAuth blokuje nieuwierzytelnionych
- Potrzebujesz CLERK_SECRET_KEY w zmiennych środowiskowych
- Różne middleware dla różnych poziomów zabezpieczeń
- https://go.clerk.com/9VDxMYe

Link: ** https://go.clerk.com/9VDxMYe

## Introduction to Causal Logs

Ludzie używają aplikacji, aplikacje używają baz danych, a bazy danych używają logów. Logi są przydatne bo ułatwiają distributed replication i mogą być deterministycznie zredukowane, ale są inherentnie single-writer. Wszystkie appendy muszą przejść przez jeden punkt.

Log ma częściowo uporządkowanego kuzyna - causal log - który natywnie wspiera wielu concurrent writers. To umożliwia nową kategorię self-certifying aplikacji, które mogą być replikowane przez dowolną liczbę peers w otwartej sieci bez polegania na blockchainach, czekania na consensus czy nakładania transaction fees.

Tradycyjny log rozwiązuje dwa problemy - ordering changes i distributing data. W distributed data systems uzgodnienie kolejności dla updates to jeden z głównych problemów projektowych. Przechowywanie zmian w kanonicznej sekwencyjnej kolejności jest intrinsycznie przydatne - pozwala każdemu deterministycznie zredukować log i uzyskać dokładnie ten sam końcowy stan.

Zawsze był tylko jeden sposób na zrobienie tego - przepuszczenie wszystkiego przez jeden thread na jednym procesie na jednej maszynie. To prawda nawet w distributed databases z klastrami replik. Paxos, Raft itp. tylko koordynują żeby wybrać leadera odpowiedzialnego za przetwarzanie eventów.

**Kluczowe wnioski:**
- Causal logs wspierają wielu concurrent writers
- Umożliwiają self-certifying aplikacje bez blockchainów
- Tradycyjne logi wymagają single point dla ordering
- Causal logs to ewolucja od single-writer limitations

**Link:** https://joelgustafson.com/posts/2024-09-30/introduction-to-causal-logs

Kluczowe wnioski:
- - Causal logs wspierają wielu concurrent writers
- Umożliwiają self-certifying aplikacje bez blockchainów
- Tradycyjne logi wymagają single point dla ordering
- Causal logs to ewolucja od single-writer limitations
- https://joelgustafson.com/posts/2024-09-30/introduction-to-causal-logs

Link: ** https://joelgustafson.com/posts/2024-09-30/introduction-to-causal-logs

## GitHub - brisa-build/brisa: The Web Platform Framework

Brisa to eksperymentalny web framework inspirowany innymi, biorący to co najlepsze z każdego. Wersje zero-x są uważane za eksperymentalne, nie poleca się ich używania w produkcji do wersji jeden-x.

Framework oferuje wszystko czego potrzebujesz - JSX, TypeScript, server i web components, server actions, optimistic updates, SSR, streaming, suspense, signals, websockets, middleware, layouts. Jest zaprojektowany żeby być szybki w startowaniu, buildowaniu, testowaniu, deployowaniu i uruchamianiu.

Ma wbudowane wsparcie dla i18n z tłumaczeniem tekstów i routingiem, niosąc tylko te tłumaczenia których używasz. Jest mały - zero bajtów domyślnie, 2kB kiedy używasz server actions, i 3kB kiedy potrzebujesz web components.

Możesz zmienić output - przekształcić swoją webową aplikację z serwera na statyczną, na desktopową, androidową czy iOS aplikację jedną komendą konfiguracyjną.

**Kluczowe wnioski:**
- Eksperymentalny framework z najlepszymi features z innych
- Bardzo mały bundle size - od 0B do 3kB
- Pełne wsparcie dla modern web technologies
- Możliwość zmiany outputu na różne platformy

**Link:** https://github.com/brisa-build/brisa

Kluczowe wnioski:
- - Eksperymentalny framework z najlepszymi features z innych
- Bardzo mały bundle size - od 0B do 3kB
- Pełne wsparcie dla modern web technologies
- Możliwość zmiany outputu na różne platformy
- https://github.com/brisa-build/brisa

Link: ** https://github.com/brisa-build/brisa