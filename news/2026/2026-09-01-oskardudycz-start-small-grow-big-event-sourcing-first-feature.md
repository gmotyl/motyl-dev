---
title: "Start Small, Grow Big: jak wybrać pierwszą funkcjonalność do Event Sourcingu"
excerpt: "Oskar Dudycz o tym, jak wybrać pierwszy pilotażowy przypadek użycia dla Event Sourcingu: dlaczego core domain jest najgorszym wyborem na start i jak rozpoznać funkcjonalność, która faktycznie czegoś nauczy zespół."
publishedAt: "2026-09-01"
slug: "oskardudycz-start-small-grow-big-event-sourcing-first-feature"
hashtags: "#OskarDudycz #architecture #event-sourcing #eventdriven #generated #pl"
source_pattern: "OskarDudycz"
---

## Start Small, Grow Big: jak wybrać pierwszą funkcjonalność dla Event Sourcingu

**TLDR:** Zespół, który zdecydował się wypróbować Event Sourcing, staje przed pytaniem, od czego zacząć. Oskar Dudycz wyjaśnia, czemu core domain jest najgorszym wyborem na pilotaż i podaje konkretną listę kryteriów, jak rozpoznać funkcjonalność, która jest jednocześnie realna i bezpieczna do popsucia.

**Summary:** Punkt wyjścia jest znany: zespół przerobił modelowanie, przeczytał materiały o Event Sourcingu, dostał zielone światło, i teraz pojawia się pytanie "OK, ale gdzie to wypróbować?". Intuicyjną odpowiedzią jest core domain, bo tam są decyzje biznesowe, tam Event Sourcing daje najwięcej wartości. Dudycz przekonuje, że to jest właśnie pułapka: zaczynanie nowego wzorca w core domain oznacza walkę z trzema problemami naraz, czyli złożonością domeny, którą jeszcze nie rozumiemy, uczeniem się samego wzorca i uczeniem się narzędzia, a kiedy coś się posypie, nie da się rozdzielić, który z tych trzech czynników zawinił. Wtedy pojawia się łatwe wytłumaczenie: "Event Sourcing nie zadziałał u nas" albo gorzej, "Event Sourcing jest zbyt trudny", a zespół traci wiarygodność na następną próbę.

Drugą pułapką jest wybór czegoś zupełnie nieistotnego biznesowo. Autor poprawia własną wcześniejszą radę "zacznij od nieważnej funkcjonalności" na bardziej precyzyjną: potrzebna jest funkcjonalność niskiego ryzyka, nie nieważna. Funkcjonalność bez żadnych decyzji biznesowych niczego nie uczy i prowadzi do zjawiska, które Dudycz nazywa State Obsession, czyli pisania zdarzeń typu SomethingCreated i SomethingUpdated, które są tylko boilerplate'em bez realnej wartości modelowania decyzji.

Kluczowe jest odróżnienie prawdziwego Event Sourcingu od zbierania zdarzeń z wielu źródeł do modelu odczytu, co jest po prostu integracją event-driven, nie Event Sourcingiem. Prawdziwy Event Sourcing polega na podejmowaniu decyzji: odczytujemy zdarzenia, budujemy z nich stan, i na tej podstawie decyzja produkuje nowe zdarzenie. Autor podaje checklistę pytań do zadania przy wyborze pilotażu: kto jest właścicielem cyklu życia procesu, czy produkujemy własne zdarzenia czy tylko konsumujemy cudze, czy komenda może zostać odrzucona z powodów biznesowych, czy decyzja jest regułą biznesową czy tylko polityką retry, czy da się to zamodelować w EventStormingu z osobą nietechniczną z biznesu, i czy stream ma naturalny koniec.

Trzy przykłady złych wyborów z artykułu to dispatch powiadomień mailowych (stan maszyny należy do dostawcy poczty, my tylko obserwujemy), przetwarzanie zadań wsadowych (retry i abort to polityka infrastruktury, nie decyzja biznesowa) oraz weryfikacja płatności (zbieramy wyniki z systemów fraud i limitów, ale nic sami nie decydujemy, dopóki nie zaczniemy orzekać na podstawie tych wyników). Dobrym przykładem jest z kolei proces zwrotu towaru: sklep decyduje, czy przyjąć zwrot w oknie czasowym, i decyduje po inspekcji, czy towar faktycznie jest w stanie opisanym przez klienta, a system czeka na kuriera i automatycznie odrzuca zwrot po trzydziestu dniach, jeśli paczka nie wróci.

Autor podaje też listę wymagań dla samego event store'u wybranego do pilotażu: zapis na końcu strumienia, odczyt wszystkich zdarzeń, gwarancja porządku w strumieniu, odczyt własnych zapisów, silna konsystencja z optymistyczną współbieżnością, a jako dodatkowe: subskrypcje push, globalny porządek, wbudowane projekcje i archiwizację strumieni. Ostrzega przed "vibe-coded" bibliotekami event store, które pomijają optymistyczną współbieżność, bo to najtrudniejszy element do zaimplementowania, a jego brak oznacza podatność na race conditions i utratę danych.

**Key takeaways:**
- Core domain jest najgorszym miejscem na pilotaż Event Sourcingu, bo miesza trzy niezależne problemy: złożoność domeny, wzorzec i tooling.
- Dobra pierwsza funkcjonalność jest niskiego ryzyka, nie nieważna: ma realnych właścicieli, decyzje biznesowe i konsekwencje, kiedy pójdzie źle.
- Zbieranie zdarzeń z wielu źródeł do modelu odczytu to integracja event-driven, nie Event Sourcing; kluczem jest podejmowanie decyzji na podstawie zdarzeń.
- Warto sprawdzić event store pod kątem optymistycznej współbieżności, bo jej brak w "vibe-coded" bibliotekach prowadzi do race conditions.

**Why do I care:** Jako architekt regularnie widzę zespoły, które chcą wprowadzić nowy wzorzec od razu w najważniejszym module, bo "tam jest wartość", i regularnie widzę, jak to się kończy defensywnym odwrotem po pierwszej porażce. Checklista Dudycza jest na tyle konkretna, że da się jej użyć na najbliższym warsztacie z zespołem zamiast dyskutować w oparciu o samo wyczucie, które funkcjonalności "wydają się" bezpieczne do pilotażu.

**Link:** [Start Small, Grow Big: how to pick the first feature for Event Sourcing](https://www.architecture-weekly.com/p/start-small-grow-big-how-to-pick)
