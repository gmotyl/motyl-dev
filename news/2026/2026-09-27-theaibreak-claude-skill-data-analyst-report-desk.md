---
title: "Trzy Skille Claude'a, które zastępują analityka danych za 3000 dolarów miesięcznie"
excerpt: "The AI Break pokazuje krok po kroku, jak zbudować zestaw Skilli Claude'a, które zamieniają dowolny eksport ze spreadsheetu w gotowy, policzalny raport."
publishedAt: "2026-09-25"
slug: "theaibreak-claude-skill-data-analyst-report-desk"
hashtags: "#theaibreak #ai #claude #agents #productivity #generated #pl"
source_pattern: "The AI Break"
---

## Trzy Skille Claude'a, które zastępują analityka danych za 3000 dolarów miesięcznie

**TLDR:** Tutorial pokazuje, jak zbudować "biurko liczb": trzy Skille Claude'a, z których jeden ustala pięć naprawdę ważnych metryk biznesu, drugi mapuje każdy eksport danych na te metryki, a trzeci generuje gotowy raport, pokazuje co się zmieniło od ostatniego okresu i odpowiada na pytania z wyliczeniami widocznymi w tle.

**Summary:** Autorka zaczyna od obserwacji, że dobry analityk robi trzy rzeczy, zanim w ogóle spojrzy na wykres: uczy się, co firma mierzy, uczy się, jak wyglądają jej pliki, i sprawdza plik, zanim zaufa liczbom. Cały tutorial odtwarza tę kolejność w postaci dwóch promptów przygotowawczych i trzech gotowych Skilli.

Pierwszy prompt prowadzi wywiad złożony z ośmiu pytań, zadawanych jedno po drugim: co firma sprzedaje, jakie pięć liczb rzeczywiście napędza decyzje, czy wzrost każdej z nich jest dobry czy zły, jak często i przez kogo są przeglądane, jakie pliki faktycznie się pobiera, jakie pułapki siedzą w danych, jak refundy, testowe zamówienia czy różne strefy czasowe, kto czyta raport i ile ma na niego czasu, oraz jaką jedną decyzję podejmuje się co miesiąc na podstawie tych liczb. Wynik trafia do bloku nazwanego METRICS CORE, ograniczonego do 350 słów, tak żeby ktoś, kto nigdy nie widział tej firmy, mógł policzyć jej metryki bez dopytywania.

Drugi prompt bierze ten blok razem z nagłówkiem i pięcioma przykładowymi wierszami z konkretnego eksportu, na przykład z płatności Stripe czy zamówień Shopify, i produkuje EXPORT MAP: co reprezentuje jeden wiersz, która kolumna jest datą i w jakiej strefie czasowej, która kolumna jest pieniędzmi i jaka jest konwencja znaku dla refundów, jakie wiersze trzeba odrzucić przed liczeniem, i dokładny wzór na każdą z pięciu metryk z tego konkretnego pliku, albo szczera adnotacja "nie ma tego w tym pliku". Ten krok powtarza się raz na każdy typ eksportu.

Dopiero z tych dwóch bloków powstają właściwe Skille, zapisane jako pliki SKILL.md w folderach: Report Desk sprawdza plik i pisze jednostronicowy raport, Delta Watch tłumaczy, co się zmieniło względem poprzedniego okresu, odróżniając realną zmianę od zwykłego przesunięcia w czasie, a Ask the File odpowiada na dowolne pytanie z pokazanym obliczeniem zamiast samej liczby. To pole `description` w nagłówku SKILL.md decyduje, kiedy Claude w ogóle włącza dany Skill, bez pytania użytkownika.

**Key takeaways:**
- METRICS CORE to wywiad o pięciu liczbach, które faktycznie napędzają biznes, razem z kierunkiem "dobry albo zły" i progiem uznawanym za normę.
- EXPORT MAP przypisuje dokładny wzór każdej metryki do konkretnego pliku, łącznie z wyjątkami typu zwroty, konta testowe czy różne strefy czasowe.
- Report Desk, Delta Watch i Ask the File to trzy osobne pliki SKILL.md, a pole `description` w ich nagłówku decyduje, kiedy Claude sam je włącza.
- Przed wklejeniem przykładowych wierszy danych do promptu trzeba podmienić nazwiska i maile na placeholdery, bo mapa potrzebuje tylko kształtu kolumn, nie tożsamości.

**Why do I care:** To dobry przykład na to, że "Skill" w Claude to w praktyce skodyfikowana wiedza domenowa, nie tylko skrót do częstego promptu. Wzorzec z tego tutoriala, najpierw spisz reguły biznesowe razem z ich wyjątkami, potem zamień je na plik, który agent ładuje automatycznie, przenosi się bez trudu poza analitykę danych, na przykład na code review pod kątem konwencji konkretnego zespołu. Jedno zastrzeżenie: taki desk jest tak dobry, jak odpowiedzi z pierwszego wywiadu, więc pierwszy wygenerowany raport wciąż warto przejrzeć ręcznie, zanim ktoś zacznie mu ufać bez sprawdzania.

**Link:** [Tutorial: Replace Your $3K/month Data Analyst With a Claude Skill](https://theaibreak.substack.com/p/tutorial-replace-your-3kmonth-data)
