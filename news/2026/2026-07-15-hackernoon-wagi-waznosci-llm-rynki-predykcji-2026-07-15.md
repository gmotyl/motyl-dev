---
title: "Twoje wagi ważności są wymyślone, a rynki predykcji atakują korporacje"
excerpt: "HackerNoon o tym, dlaczego arbitralne wagi w ewaluacji LLM są poważnym problemem oraz o pierwszych kroków instytucjonalnych rynków predykcji w stronę korporacyjnego zabezpieczania ryzyka."
publishedAt: "2026-07-15"
slug: "hackernoon-wagi-waznosci-llm-rynki-predykcji-2026-07-15"
hashtags: "#HackerNoon #ml #llm #ai #architecture #engineering #performance #generated #pl"
source_pattern: "HackerNoon"
---

## Your Severity Weights Are Made Up (And That's the Problem)

**TLDR:** Większość zespołów pracujących z LLM albo traktuje wszystkie typy halucynacji równo, albo ustala ich wagi intuicyjnie na Slacku i nigdy więcej do tego nie wraca. Autor stawia pytanie, które ominął poprzednio: jak właściwie wyznaczać te wagi, żeby miały sens?

**Summary:** Artykuł wychodzi od obserwacji, którą autor poczynił w poprzednich tekstach prawie mimochodem: porównywanie różnych typów halucynacji wymaga ich ważenia według ważności. Zanegowanie frazy w dokumencie medycznym to nie to samo co pomylenie roku o jeden. Teraz jednak autor wraca do tego punktu i pyta wprost: ważyć według czego, dokładnie?

Zaczyna od demontażu dwóch dominujących podejść. Pierwsze: traktowanie wszystkich typów błędów równo. Efekt jest taki, że metryka halucynacji po cichu kłamie. Możesz ogłosić, że wskaźnik halucynacji spadł z 14% do 10%, nie zauważając, że całe te cztery punkty procentowe to zmniejszenie "temporal confusion", a confident fabrication stoi w miejscu. Drugie podejście: intuicyjne ustalanie wag na Slacku. Ktoś pisze "fabrication jest gorsza niż błąd daty, prawda?" i to ląduje w arkuszu kalkulacyjnym, który nikt już nie zmienia. Żadne z tych podejść nie jest z gruntu złe jako punkt startowy. Problem pojawia się wtedy, gdy uznajemy to za rozwiązanie docelowe.

Autor wskazuje cztery konkretne czynniki, które powinny kształtować wagi: koszt downstream (co się dzieje, jeśli użytkownik działa na złej informacji bez jej weryfikacji), odwracalność (czy błąd można wychwycić zanim wyrządzi szkodę), wykrywalność (jak łatwo człowiek bez narzędzi zauważy ten błąd) oraz częstotliwość pod obciążeniem (czy dany typ błędu pojawia się rzadko w zbiorze ewaluacyjnym, ale spike'uje przy specyficznych warunkach wejściowych). To nie są nowe koncepcje. To te same osie, których każdy zespół używa nieformalnie przy triagowaniu incydentów produkcyjnych. Chodzi o świadome zastosowanie ich do konkretnych typów halucynacji zamiast zlecania tej pracy nikomu.

Jako przykład roboczy autor bierze pipeline RAG odpowiadający na pytania o wewnętrzne dokumenty HR. Numerical distortion przy danych o urlopach i wynagrodzeniach: wysoki koszt downstream, niska wykrywalność, bo liczba czyta się naturalnie. Wysoka waga. Confident fabrication wymyślająca politykę, która nie istnieje: wysoki koszt downstream i niska odwracalność, bo pracownik może podjąć działania zanim ktokolwiek to sprawdzi. Wysoka waga. I kluczowe: wagi specyficzne dla tej domeny całkowicie różnią się od wag dla systemu medycznego czy chatbota obsługi klienta. To jest właśnie sedno.

Praktyczny plan zamknął się w trzech krokach. Po pierwsze: dla każdego typu błędu napisz jedno zdanie opisujące najgorszy realistyczny skutek downstream w twoim konkretnym produkcie. Nie teoretyczny, realistyczny. Po drugie: posortuj typy według tego zdania, nie według tego, jak straszno brzmi błąd w abstrakcji. "Fabrication" brzmi groźniej niż "temporal confusion" w ogólności, ale jeśli twój produkt to bot do historycznych trivia, błędna data może mieć znaczenie krytyczne. Po trzecie: wróć do rankingu za każdym razem, gdy zmienia się powierzchnia produktu. Nowa funkcja, nowy segment użytkowników, nowy poziom autonomii systemu to trigger do przeglądu, nie footnote do następnego quarterly review.

**Key takeaways:**
- Równe ważenie typów halucynacji to ukryte założenie, które podważa znaczenie całej metryki
- Intuicyjne wagi ustalane ad hoc na Slacku są lepsze niż nic, ale nie nadają się jako rozwiązanie permanentne
- Cztery czynniki: koszt downstream, odwracalność, wykrywalność i częstotliwość pod obciążeniem wyznaczają ramy dla sensownych wag
- Wagi są zawsze domenowo specyficzne; gotowe tabele z innych kontekstów nie zadziałają
- Zmiana autonomii systemu (z "sugeruje odpowiedź do przeglądu przez człowieka" na "działa bezpośrednio na odpowiedzi") wymaga ponownego wyznaczenia wag

**Why do I care:** To jest jeden z tych artykułów, które rozwiązują problem, który mało kto publicznie artykułuje, ale który staje się realny w momencie, gdy wychodzisz poza prototyp. Pracując z RAG i LLM w projektach produkcyjnych, regularnie widzę dashboardy, gdzie liczba halucynacji jest prezentowana jak jeden agregat. Autor daje konkretny, powtarzalny framework i co ważne, nie zakłada, że masz dostęp do formalnych systemów scoringowych. Trzy kroki opisane na końcu można wdrożyć przy najbliższej retrospektywie ewaluacji. Szczególnie cenne jest zwrócenie uwagi na moment zmiany autonomii systemu jako trigger do przeglądu wag, bo to coś, co w praktyce często umyka.

**Link:** [Your Severity Weights Are Made Up (And That's the Problem)](https://hackernoon.com/your-severity-weights-are-made-up-and-thats-the-problem)

---

## Prediction Markets Take Their Biggest Step Yet Toward Corporate Risk Hedging

**TLDR:** Susquehanna International Group zmobilizowała 500 milionów dolarów, żeby pomóc firmom hedgować finansową ekspozycję powiązaną z Mundialem przez rynki predykcji. To jeden z największych jak dotąd instytucjonalnych commitmentów wobec pomysłu, że kontrakty na zdarzenia mogłyby działać jako narzędzie zarządzania ryzykiem korporacyjnym.

**Summary:** Artykuł analizuje tydzień, który może okazać się przełomowym dla rynków predykcji, o ile obecne testy zakończą się sukcesem. Susquehanna International Group, jeden z większych market makerów, ogłosiła 500 milionów dolarów dostępnych dla firm chcących hedgować finansową ekspozycję wynikającą z wyników Mundialu. Adresaci to przede wszystkim sponsorzy, nadawcy, firmy z branży hospitality i marki konsumenckie, których przychody lub zobowiązania zmieniają się zależnie od wyników turniejowych.

Konkretna mechanika hedgingu jest dosyć jasna. Wyobraź sobie markę konsumencką, która obiecała 100 milionów dolarów rabatów jeśli Francja wygra Mundial. Ta promocja tworzy warunkowe zobowiązanie: jeśli Francja przegra, koszt wynosi zero; jeśli wygra, firma płaci 100 milionów. Rozwiązanie: zakup kontraktów "Francja: tak" na rynku predykcji. Wypłata z kontraktów pokryje część rachunku za rabaty. Logika jest ta sama co przy klasycznym hedgingu walutowym: zamieniasz niepewny i potencjalnie duży wydatek na mniejszy, bardziej przewidywalny koszt hedgowania. Autor wskazuje jednak na kilka nietrywialnych ograniczeń. Hedge może być tak skuteczny, jak kontrakt pasuje do konkretnej ekspozycji. Nadawca, którego przychody rosną runda po rundzie, może potrzebować kilku kontraktów pokrywających kwalifikacje, awans i finał, co tworzy basis risk, jeśli wypłata rynkowa i faktyczna strata komercyjna nie poruszają się synchronicznie.

Płynność to osobna historia. Analiza Polymarket przytoczona w artykule pokazuje, że około 70% zamkniętych rynków zanotowało mniej niż 10 tysięcy dolarów łącznego wolumenu handlu, a ponad 45 tysięcy rynków zamknęło się bez jednej transakcji. Mniej niż jeden na dziesięć przekroczył 100 tysięcy dolarów. Korporacyjny hedging koncentruje się więc w bardzo wąskiej grupie kontraktów, przede wszystkim w głównych rynkach sportowych, gdzie arkusze zleceń są faktycznie głębsze. Mundialowy przykład z Francją jest tu wyjątkiem, bo rynek na zwycięzcę Mundialu wygenerował łączny wolumen rzędu 4 miliardów dolarów.

Artykuł dotyka też dwóch problemów, które każde skalowanie rynków predykcji będzie musiało rozwiązać. Po pierwsze manipulacja rynkiem: Spotify musiało zażądać od Kalshi i Polymarket usunięcia swoich logo po tym, jak odkryło, że na rynku dotyczącym najbardziej odtwarzanej piosenki w USA doszło do wygenerowania ponad 500 tysięcy sztucznych odtworzeń. To pokazuje, że gdy stawki rosną, pojawiają się gracze chcący manipulować samymi zdarzeniami, nie tylko cenami. Po drugie regulacje: ESMA wydała oświadczenie, że niektóre kontrakty na zdarzenia mogą kwalifikować się jako instrumenty finansowe pod MiFID II. Korea Południowa rozważa ograniczenia wynikające z prawa hazardowego. Ten sam kontrakt może być traktowany jako instrument pochodny, opcja binarna, produkt hazardowy lub aktywo kryptowalutowe, zależnie od jurysdykcji.

**Key takeaways:**
- Susquehanna zmobilizowała 500 milionów dolarów na hedging korporacyjny przez rynki predykcji, co jest jednym z największych instytucjonalnych zaangażowań w tę kategorię
- Mechanika hedgingu jest logicznie spójna, ale wymaga dopasowania kontraktów do konkretnej ekspozycji i kreuje basis risk przy złożonych scenariuszach
- Płynność rynku pozostaje ograniczona: 70% zamkniętych rynków Polymarket nie przekroczyło 10 tysięcy dolarów obrotu
- Manipulacja rynkiem przez wpływanie na same zdarzenia (sztuczne odtworzenia Spotify) to nowy wektor ryzyka
- Regulacje w różnych jurysdykcjach traktują te same kontrakty różnie, co fragmentuje rynek globalny

**Why do I care:** Jako deweloper i architekt patrzę na to z konkretnego kąta: rynki predykcji to w dużej mierze problem technologiczny. Skalowanie płynności, settlement oparty na wiarygodnych danych, zarządzanie IP i prawami do danych, ochrona przed manipulacją na poziomie źródłowych zdarzeń, frameworki integracyjne dla firm hedgujących. Przypadek Spotify jest szczególnie interesujący, bo pokazuje, że atakowaną warstwą nie jest sam rynek, ale dane wejściowe do niego. To jest wyzwanie, z którym branża się dopiero zderza. Dla firm budujących produkty oparte na LLM analogia jest czytelna: twój eval jest tak dobry jak twoje dane produkcyjne, a jeśli ktoś może manipulować tymi danymi, manipuluje też twoim modelem.

**Link:** [Prediction Markets Take Their Biggest Step Yet Toward Corporate Risk Hedging](https://hackernoon.com/prediction-markets-take-their-biggest-step-yet-toward-corporate-risk-hedging)
