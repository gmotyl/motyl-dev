---
title: "Jev, Jevons i model AI, który odpowiada tylko tak albo nie"
excerpt: "Nowy model Jev od TypeSafe odpowiada wyłącznie tak lub nie na wąskie pytania biznesowe, a Kilo stosuje podobną logikę routingu modeli do codziennych zadań programistycznych."
publishedAt: "2026-09-24"
slug: "jev-jevons-model-ai-tak-nie-routing"
hashtags: "#kilo #ai #llm #architecture #agents #generated #pl"
source_pattern: "Kilo"
---

## Jev, Jevons i model AI, który odpowiada tylko tak albo nie

**TLDR:** 15 września nowe laboratorium TypeSafe wypuściło Jev, model, który nie prowadzi rozmowy, tylko odpowiada tak lub nie na wąskie pytania w rodzaju "czy ta osoba prosi o zwrot pieniędzy", w mniej niż sekundę i z podaną pewnością odpowiedzi. Twórca modelu, wcześniej związany z badaniami nad ChatGPT, stawia tezę zaczerpniętą od dziewiętnastowiecznego ekonomisty Jevonsa: tańsze odpowiedzi AI nie zmniejszą liczby pytań zadawanych modelom, tylko ją zwiększą.

**Summary:** Firmy od dawna oddają duże modele językowe do zadań, które w istocie sprowadzają się do drobnych rozstrzygnięć: sortowania zgłoszeń do supportu, oznaczania ryzykownych akcji, przydzielania obsługi klienta do właściwej osoby. LangChain we własnym wpisie o Jev porównał to do zatrudniania powieściopisarza do sortowania poczty. Powieściopisarz sobie poradzi, ale zadanie zajmie mu więcej czasu i będzie kosztować więcej, niż powinno. Jev, model TypeSafe, celuje właśnie w tę lukę: nie pisze e-maili ani nie tłumaczy pojęć, tylko przyjmuje od oprogramowania firmy fragment informacji, na przykład wiadomość klienta razem z historią zamówień, i zwraca wąską odpowiedź tak lub nie wraz z poziomem pewności.

Diogo Almeida, założyciel TypeSafe, pracował wcześniej przy badaniach stojących za ChatGPT w OpenAI. Jego motywacją, według opisu, było poczucie, że modele czatowe stały się bardzo dobre w prowadzeniu rozmowy, nie generując przy tym proporcjonalnie dużo realnej automatyzacji. Jev to zakład, że drobne decyzje w oprogramowaniu potrzebują osobnej kategorii modelu, a nie kolejnej iteracji dużego modelu ogólnego przeznaczenia. Produkt jest wciąż w fazie wczesnego dostępu, więc na razie nikt spoza TypeSafe nie miał okazji sprawdzić, jak dobrze te deklaracje trzymają się w praktyce poza kontrolowanymi warunkami.

Nazwa modelu odsyła do Williama Stanleya Jevonsa, dziewiętnastowiecznego ekonomisty, który zauważył, że wydajniejsze silniki parowe nie zmniejszyły zużycia węgla w Brytanii, tylko je zwiększyły, bo tańsza moc otworzyła nowe zastosowania, które wcześniej się nie opłacały. TypeSafe zakłada ten sam wzorzec dla AI: im tańsza staje się pojedyncza odpowiedź, tym więcej pytań firmy uznają za warte zadania. Konsekwencja tej tezy jest nieprzyjemna dla firm, które kierują każde pytanie do swojego największego i najdroższego modelu: przepłacają na prostych przypadkach, a jednocześnie tych przypadków będzie z czasem znacznie więcej.

Programiści korzystający z narzędzi kodujących na AI znają wersję tego samego problemu z własnego podwórka. Część próśb jest trudna, jak namierzenie błędu rozsianego po kilku plikach albo dopasowanie nowej funkcji do istniejącego systemu. Inne są rutynowe, jak zmiana nazwy zmiennej, napisanie szybkiego testu czy wyjaśnienie działania funkcji. Najmocniejsze modele radzą sobie z obiema kategoriami, ale za rutynową pracę też liczą stawki premium. Kilo stosuje do tego problemu własną wersję logiki Jev poprzez router Auto Efficient, który sprawdza każde żądanie względem wewnętrznego benchmarku Kilo Bench, żeby znaleźć najtańszy model, który udowodnił, że potrafi obsłużyć dany rodzaj pracy. Deweloper proszący o szybką zmianę nazwy dostaje tani model, a ten mierzący się z trudnym błędem dostaje mocniejszy, bez konieczności ręcznego wyboru z menu.

Routing ma sens tylko wtedy, gdy oszczędność faktycznie trafia na rachunek dewelopera, więc Kilo rozlicza się dokładnie według stawek dostawców modeli, bez marży, co oznacza, że tańszy model realnie oznacza niższy rachunek. Osoby, które wolą wybierać model samodzielnie, mają do dyspozycji ponad 500 opcji i mogą się między nimi przełączać w dowolnym momencie. TypeSafe i Kilo idą do tego samego problemu z dwóch stron: TypeSafe buduje nowy rodzaj modelu wyspecjalizowanego pod tanie, drobne decyzje, Kilo bierze istniejące modele i kieruje każde zadanie do tego, który wykona je najtaniej. Obie firmy wychodzą z tej samej obserwacji, że spora część pracy AI wcale nie wymaga największego dostępnego modelu, a płacenie za niego mimo to zwyczajnie się sumuje.

**Key takeaways:**
- Jev od TypeSafe to model odpowiadający wyłącznie tak lub nie na wąskie pytania biznesowe, wraz z poziomem pewności, w czasie poniżej sekundy.
- Teza modelu opiera się na paradoksie Jevonsa: tańsze odpowiedzi AI zwiększają liczbę zadawanych pytań, zamiast zmniejszać całkowity koszt.
- Router Auto Efficient w Kilo stosuje analogiczną logikę do zadań programistycznych, kierując proste prośby do tańszych modeli na podstawie wyników w Kilo Bench.
- Kilo rozlicza użytkowników według cen dostawców bez marży, więc oszczędność z routingu trafia bezpośrednio na rachunek dewelopera.
- Jev jest we wczesnym dostępie, więc jego rzeczywista skuteczność poza materiałami TypeSafe nie została jeszcze niezależnie zweryfikowana.

**Why do I care:** Jako architekt patrzę na to przede wszystkim jako na argument za tym, żeby przestać traktować wybór modelu jako decyzję jednorazową na poziomie całego systemu. Routing zadań do najtańszego modelu, który akurat sobie z nimi radzi, to wzorzec, który warto wdrażać we własnych pipeline'ach agentowych, nie tylko kupować gotowy od dostawcy, bo koszt zapytań do dużych modeli przy zadaniach masowych i powtarzalnych, jak klasyfikacja czy walidacja, potrafi się szybko uzbierać w realny wydatek na infrastrukturę. Sam Jev jest bardziej ciekawostką rynkową niż czymś do wdrożenia jutro, bo brakuje niezależnych benchmarków, a teza o paradoksie Jevonsa, choć intelektualnie atrakcyjna, nie jest jeszcze poparta danymi z realnych wdrożeń poza materiałami samego TypeSafe. Warto natomiast zapamiętać sam wzorzec: rozdzielenie modelu do rozmowy od modelu do decyzji to podział, który prędzej czy później pojawi się też w architekturze frontendowych systemów wspieranych przez AI.

**Link:** [Jev, Jevons, and the AI model that only answers yes or no](https://blog.kilo.ai/p/jev-jevons-and-the-ai-model-that?publication_id=4363009&post_id=217309711&isFreemail=true&triedRedirect=true)
