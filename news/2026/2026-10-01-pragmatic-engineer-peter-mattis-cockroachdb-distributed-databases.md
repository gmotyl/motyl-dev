---
title: "Peter Mattis: od GIMP-a przez Gmaila po CockroachDB, i dlaczego przestaniemy czytać kod"
excerpt: "Twórca GIMP-a i współzałożyciel Cockroach Labs opowiada, jak B-drzewa łączą Gmaila, Go i bazy rozproszone, oraz dlaczego spodziewa się, że niedługo przestaniemy patrzeć na kod tak, jak dziś patrzymy na assembler."
publishedAt: "2026-09-30"
slug: "pragmatic-engineer-peter-mattis-cockroachdb-distributed-databases"
hashtags: "#pragmaticengineer #architecture #database #ai #engineering #generated #pl"
source_pattern: "Pragmatic engineer"
---

## Dystrybuowane bazy danych z Peterem Mattisem

**TLDR:** Peter Mattis, współzałożyciel i CTO Cockroach Labs oraz jeden z twórców GIMP-a, opowiada o drodze od wczesnego open source'u przez Gmaila i infrastrukturę Google po budowę CockroachDB, oraz o tym, jak AI wróciło go do pisania kodu po latach w roli menedżerskiej.

**Streszczenie:** Historia zaczyna się ciekawie: Mattis odrzucił pierwszą ofertę pracy od Sergeya Brina, bo nie chciało mu się dojeżdżać do Mountain View. Kilka lat wcześniej, razem z kolegą z pokoju w akademiku, stworzył GIMP-a, darmowy edytor grafiki rastrowej, z którego powstała pierwsza wersja logo Google. Tuż przed premierą dowiedzieli się o konkurencyjnym, bardziej ambitnym projekcie edytora graficznego i przez chwilę rozważali rezygnację z publikacji. Wydali GIMP-a mimo to, a o tamtym konkurencyjnym projekcie nikt już nigdy nie usłyszał. Wniosek Mattisa: zawsze ktoś inny ma ten sam pomysł, ale większość z tych osób nigdy go nie wypuści.

W Google Mattis pracował nad wczesnym Gmailem (B-drzewa trzymały wątki wiadomości i liczniki nieprzeczytanych), a potem nad Colossusem, następcą Google File System, gdzie wraz z zespołem wdrożył kodowanie Reed-Solomon w rozproszonym systemie plików, redukując narzut przechowywania danych o jedną trzecią przy jednoczesnym zwiększeniu redundancji. Przy okazji dwukrotnie pobił wydajnościowo standardowe struktury danych: zbudował B-drzewo szybsze i mniejsze niż `std::map` (który w Google używał red-black tree z dwoma wskaźnikami na węzeł), a potem Swiss Table dla mapy w Go, która finalnie trafiła do biblioteki standardowej języka.

Najciekawszy wątek dotyczy przyszłości code review. Mattis, przez lata recenzent czytelności kodu C++ w Google, uważa, że przestaniemy patrzeć na kod w ten sam sposób, w jaki już dziś nie patrzymy na assembler: „Widzę, że agenty stają się coraz lepsze, więc potrzeba coraz mniej kontroli. Nie wiem, czy to będzie w tym roku, czy w przyszłym, ale materialnie przestaniemy patrzeć na kod tak, jak kiedyś.” W tym samym duchu opowiada o wewnętrznej platformie no-code w Cockroach Labs, na której nietechniczni pracownicy, od HR po CFO, zbudowali w ciągu paru miesięcy około tysiąca wewnętrznych aplikacji.

Na pytanie, czy przy pracy z AI wciąż istnieje stan „flow”, odpowiada, że tak, ale inny: mniej intensywny, za to trzeba zarządzać większą liczbą rzeczy naraz, jakby było się profesorem z całym zespołem asystentów badawczych pracujących równolegle i wracających z wynikami w zawrotnym tempie.

**Kluczowe wnioski:**
- B-drzewa łączą historię Gmaila, `std::map` w Google, Go i CockroachDB, co sugeruje, że to naprawdę uniwersalna struktura danych w systemach rozproszonych.
- CockroachDB wymaga minimum trzech replik do działania konsensusu, bo przy dwóch żadna nie wie, czy druga odebrała ostatni zapis po awarii.
- Mattis przewiduje koniec code review linijka po linijce w obecnej formie, podobnie jak zniknęło ręczne czytanie assemblera.
- Nietechniczni pracownicy w Cockroach Labs zbudowali około tysiąca wewnętrznych aplikacji na platformie no-code w ciągu paru miesięcy.

**Dlaczego mi na tym zależy:** Perspektywa kogoś, kto budował infrastrukturę Google przed erą AI i dziś czuje się produktywniejszy niż kiedykolwiek, jest mocniejszym argumentem niż kolejny marketingowy claim. Jeśli ktoś, kto pisał kod bazodanowy na produkcję przez dekady, mówi wprost, że przestaje patrzeć na diff tak jak kiedyś, to pytanie o przyszłość code review przestaje być teoretyczne i staje się pytaniem o to, jak za rok lub dwa będzie wyglądał proces akceptacji zmian w twoim zespole.

**Link:** [Distributed databases with Peter Mattis](https://newsletter.pragmaticengineer.com/p/distributed-databases-with-peter)
