---
title: "Kilo: nikt nie powinien przewracać Twojego stosu, czyli wolność wyboru modeli przy rosnących kosztach tokenów"
excerpt: "Autor Kilo porównuje karty perforowane do tokenów i przekonuje, że przy zmiennych cennikach i kursach walut trzeba zachować możliwość zmiany modelu."
publishedAt: "2026-11-05"
slug: "kilo-nikt-nie-powinien-przewracac-twojego-stosu-wolnosc-modeli"
hashtags: "#kilo #ai #llm #agents #devtools #generated #pl"
source_pattern: "Kilo"
---

## Nobody Should Knock Your Stack Down

**TLDR:** Autor zaczyna od historii ojca i kart perforowanych, a kończy na tym, że zależność od jednego dostawcy modeli jest ryzykiem kosztowym. Kilo ma być sposobem na zachowanie wyboru.

**Summary:** Anegdota jest taka. Ojciec autora studiował w Bogocie w latach 70. i najgorszym żartem było zrzucenie komuś stosu kart z danymi, bo bez numeracji w kolumnach 73 do 80 nie dało się odtworzyć kolejności. Dziś odpowiednikiem kart są tokeny, a stosu nie przewraca psotnik, tylko cena i warunki usług dostawców.

Przykłady z rynku są konkretne. Plan Plus w Cursorze obejmuje tylko modele Grok, modele zewnętrzne na wyższych planach są rozliczane osobno, a OpenAI zaproponowało 12 listopada jako koniec umowy dostarczania modeli do Cursora. Do tego dochodzi kurs walut. Peso kolumbijskie ruszyło z 4478 za dolara w listopadzie 2024 do 3048 w sierpniu 2026, czyli 32% w niecałe dwa lata. Gartner spodziewa się, że koszty kodowania z AI przekroczą średnią pensję programisty do 2028 roku. W ankiecie Stack Overflow 2026 32,6% pytanych monitoruje zużycie, a 25,3% wybiera tańsze modele, choć autor zaznacza, że próba jest samowybrana i globalna. Według OpenRouter modele open-weight obsługują około 64% tokenów, ale tylko 28% wydatków.

Rozwiązaniem ma być Kilo Desktop od Anaconda, z ponad 500 modelami przez Kilo Gateway, własnymi kluczami lub modelami lokalnymi, oraz trybem Auto-Efficient kierującym zapytanie do najtańszego modelu zdolnego do zadania. Tekst jest więc w dużej mierze reklamą własnego produktu, z ofertą bezpłatnego Kilo Enterprise dla firm płacących Cursorowi, jeśli zgłoszą się do 30 listopada. Autor uczciwie przyznaje, że to nie usuwa ekonomii, tylko daje więcej sposobów zarządzania nią.

Czego brakuje? Jakości routingu. Auto-Efficient jest opisane jako wybór najtańszego "zdolnego" modelu, ale bez pokazania, jak to jest mierzone i jak często się myli.

**Key takeaways:**
- Dostępność i cena modeli zależą od cudzych umów.
- Rachunek w dolarach jest dla deweloperów spoza USA niestabilny przez kurs.
- Tańsze modele do prostych zadań, drogie do trudnych, to praktyka, którą już stosują zespoły.
- Test na dwóch modelach i jednym realnym zadaniu to dobry sposób na porównanie.

**Why do I care:** Jako architekt traktuję dostawcę modeli jak każdą inną zależność. Potrzebuję warstwy, która pozwala go wymienić w tydzień, a nie w kwartał. Niezależnie od tego, czy to będzie Kilo, czy własny gateway, warto mieć taką możliwość, zanim cennik się zmieni. Pamiętaj tylko, że to tekst sprzedażowy.

**Link:** [Nobody Should Knock Your Stack Down](https://blog.kilo.ai/p/nobody-should-knock-your-stack-down)
