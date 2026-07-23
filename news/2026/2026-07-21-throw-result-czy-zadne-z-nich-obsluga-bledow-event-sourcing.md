---
title: "Throw, Result, czy żadne z nich? O obsłudze błędów w event sourcingu"
excerpt: "Oskar Dudycz wyjaśnia, dlaczego w kodzie event-sourcowanym nie zawsze warto używać Result type — i kiedy zwrócenie zdarzenia biznesowego jest lepszym wyborem niż rzucanie wyjątku."
publishedAt: "2026-07-21"
slug: "throw-result-czy-zadne-z-nich-obsluga-bledow-event-sourcing"
hashtags: "#oskardudycz #architecture #backend #event-sourcing #cqrs #domain-driven-design #error-handling #generated #pl"
source_pattern: "OskarDudycz"
---

## Throw, Result, czy żadne z nich? O obsłudze błędów w event sourcingu

**TLDR:** Oskar Dudycz tłumaczy, dlaczego w kodzie event-sourcowanym nie sięga automatycznie po Result type — zamiast tego zwraca zdarzenia biznesowe, które opisują rzeczywisty wynik operacji. Wybór mechanizmu obsługi błędu zależy od tego, co z tym błędem trzeba zrobić: czy zapisać do strumienia, czy pominąć, czy odrzucić całą operację.

**Summary:** Pytanie "dlaczego nie używasz Result?" Oskar słyszy regularnie — szczególnie gdy ktoś widzi, że jego decyzja biznesowa rzuca wyjątek zamiast zwracać wartość opakowaną w wariant błędu. To uczciwe pytanie, ale typ zwracany to tylko fragment odpowiedzi. W praktyce Oskar używa wyjątków do sytuacji, które naruszają reguły biznesowe lub są błędami operacyjnymi — na przykład próba dodania produktu do potwierdzonego koszyka albo niedostępność event store. To są rzeczy, które nie powinny wydarzyć się w poprawnym przepływie i należą do granicy błędów aplikacji.

Natomiast dla oczekiwanych wyników biznesowych — takich jak brak produktu na stanie, przekroczenie limitu produktów w koszyku — Oskar zwraca zdarzenia: ProductItemOutOfStock, ShoppingCartItemLimitReached. I tutaj robi się ciekawie, bo te zdarzenia nie muszą być automatycznie zapisywane do strumienia. Wytworzenie zdarzenia i jego utrwalenie to dwa osobne kroki. Decyzja, co zrobić z takim zdarzeniem, należy do aplikacji, nie do domeny.

Oskar pokazuje trzy konkretne scenariusze dla tego samego zdarzenia ProductItemOutOfStock. Podczas importu koszyka z zewnętrznego systemu sprzedaży — brak produktu na stanie oznacza odrzucenie całego rekordu, żadne zdarzenia z tej partii nie trafiają do strumienia. Podczas przywracania zapisanej listy zakupów — brak produktu jest pomijany, a wcześniej zaakceptowane produkty pozostają. Na endpointcie HTTP — brak produktu przekłada się na odpowiedź 409 Conflict z informacją o dostępnej ilości. Identyczne zdarzenie, trzy różne zachowania aplikacji.

Framework Emmett, który Oskar rozwija, oferuje konkretne prymitywy middleware dla tych scenariuszy: rejectOn odrzuca całą operację gdy zdarzenie pasuje do predykatu, skipOn pomija aktualne zdarzenie i kontynuuje przetwarzanie, stopOn zatrzymuje przetwarzanie ale zachowuje wcześniejsze zdarzenia, stopAfter zatrzymuje i dodatkowo zapisuje zdarzenie które spowodowało zatrzymanie, throwOn konwertuje zdarzenie na wyjątek dla aplikacji, które obsługują błędy przez exception middleware. Te cztery-pięć zachowań to realne różnice w semantyce przetwarzania wsadowego — nie akademickie rozróżnienia.

Argument przeciw Result jest tu konkretny i praktyczny. Result w TypeScript wymaga albo sprawdzania gałęzi na każdym poziomie wywołania, albo używania bibliotek z pipe, bind, flatMap. Żadna z tych opcji nie jest natywna dla języka. Co gorsza, w kodzie event-sourcowanym zdarzenia już tworzą discriminated union — dodanie Result wokół nich to kolejna warstwa bez usunięcia żadnej poprzedniej. Reguły persystencji, atomowości i obsługi wyjątków operacyjnych i tak muszą być gdzieś napisane. Result ich nie eliminuje, tylko przesuwa.

**Key takeaways:**
- Wytworzenie zdarzenia biznesowego i jego utrwalenie to dwa osobne kroki — decyzja domeny opisuje co się stało, aplikacja decyduje czy to zapisać.
- Result type w TypeScript dodaje warstwę bez eliminowania konieczności jawnego obsługi reguł persystencji, atomowości i wyjątków operacyjnych.
- Emmett oferuje middleware (rejectOn, skipOn, stopOn, stopAfter, throwOn) które enkapsulują różne strategie obsługi zdarzeń odrzucenia w przetwarzaniu wsadowym.
- Wyjątki zostają dla naruszeń reguł stanu i błędów operacyjnych — te nie są "oczekiwanymi" wynikami biznesowymi.
- Ten sam typ zdarzenia (ProductItemOutOfStock) może być odrzuceniem, pominięciem lub błędem w zależności od kontekstu użycia — to aplikacja, nie domena, decyduje.

**Why do I care:** To jest jeden z tych artykułów, gdzie zgadzam się z konkluzją, ale chcę powiedzieć głośno: dotarcie do tego wniosku kosztuje. Większość zespołów, które widzę, albo rzuca wyjątki wszędzie, albo wchodzi w Result i nie może z niego wyjść. Oskar pokazuje trzecią drogę — zdarzenia jako first-class citizens wyników biznesowych — ale ta droga wymaga dyscypliny architektonicznej i świadomości, że jeden typ zdarzenia może mieć całkowicie różną semantykę w zależności od kontekstu wywołania. Bez frameworka takiego jak Emmett, który to enkapsuluje, łatwo skończyć z rozsypanymi ifami w całej aplikacji. Dlatego dobre pytanie to nie "throw czy Result" — tylko "jaka jest semantyka tego wyniku w każdym możliwym kontekście wywołania?" I to jest trudniejsze pytanie, niż wygląda.

**Link:** [Throw, Result, or neither?](https://www.architecture-weekly.com/p/throw-result-or-neither)
