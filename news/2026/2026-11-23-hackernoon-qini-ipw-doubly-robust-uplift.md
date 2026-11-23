---
title: "HackerNoon: dlaczego metryka Qini potrafi wskazać zły model uplift, a IPW i doubly robust nie"
excerpt: "Symulacja na milionie klientów pokazuje, że Qini przy nielosowym przydziale akcji faworyzuje gorszy ranking, a oceny IPW i doubly robust zachowują poprawną kolejność."
publishedAt: "2026-11-22"
slug: "hackernoon-qini-ipw-doubly-robust-uplift"
hashtags: "#hackernoon #ml #python #testing #generated #pl"
source_pattern: "HackerNoon"
---

## Qini, IPW i doubly robust w ocenie modeli uplift

**TLDR:** Metryka Qini, popularna w ocenie modeli uplift, w symulacji uznała niedoskonały ranking za lepszy od prawdziwego rankingu efektu przyczynowego. Ocena IPW i doubly robust daje wyniki zgodne ze znanym zyskiem przyczynowym.

Autor zaczyna od klasycznego problemu marketingowego: komu wysłać wiadomość, żeby największy był przyrost zakupów, a nie sam poziom zakupów. Mówi o tym warunkowy średni efekt leczenia, czyli o ile wzrasta szansa zakupu, jeśli klient dostanie wiadomość. W prawdziwych danych tego efektu nie znamy, więc modele trzeba oceniać pośrednio.

Symulacja obejmuje milion syntetycznych klientów, z których siedemset tysięcy służy do uczenia, a trzysta tysięcy do oceny. Wiadomości trafiały do klientów nielosowo, zależnie od wieku i czasu od ostatniego kontaktu, choć grupy miały podobną wielkość. Sześć uczniów z biblioteki EconML dostało ocenę trzema miarami. Wynik zaskakuje: po kalibracji Qini przypisuje wyższy wynik liniowemu modelowi DR niż rankingowi opartemu na prawdziwym efekcie. Powód jest taki, że Qini nadal używa obserwowanych przydziałów i wyników, więc dziedziczy błąd selekcji, nawet gdy sam model jest poprawnie skorygowany.

IPW waży każdy wynik odwrotnością prawdopodobieństwa przydziału, a doubly robust dodatkowo korzysta z modeli wyniku i reszt. Oba podejścia dały wyniki bliskie znanemu zyskowi przyczynowemu i wskazały prawdziwy ranking. Test z tysiącem prób bootstrapowych potwierdził odwrócenie w Qini. Zmiana polityki przydziału pokazała, że DR i IPW są stabilne, a Qini mocno się waha. Strojenie hiperparametrów nie zmieniło wniosków. Dla tego przykładu autor wybiera prostego S-learnera, bo przewaga DML jest pomijalna.

Czego brakuje? Całość opiera się na danych syntetycznych, w których znamy prawdę, a wyniki były kalibrowane do jednego punktu odniesienia przy użyciu prawdy. IPW wymaga dobrego modelu skłonności, DR dobrego modelu skłonności albo obu modeli wyniku, a oba zakładają brak nieobserwowanych czynników zakłócających. Autor sam to zaznacza. Trzy ziarna losowości to też niewiele.

**Key takeaways:**
- Przy nielosowym przydziale Qini zawiera błąd selekcji i może wybrać zły model.
- IPW i doubly robust były bliskie znanemu zyskowi przyczynowemu.
- Przy zmianie polityki przydziału DR i IPW pozostały stabilne, Qini nie.
- Wybór oceny ma wpływ nawet na wynik strojenia hiperparametrów.

**Why do I care:** To nie jest temat frontendowy, ale każdy, kto buduje testy A/B, personalizację albo systemy rekomendacji, trafia na ten sam problem: ocena modelu na danych obserwacyjnych bywa myląca. Jeśli możesz, losuj przydział. Jeśli nie możesz, użyj oceny doubly robust i traktuj jedną liczbę jako wskazówkę, a nie wyrok. Ostatecznie liczy się budżet i przyrost wartości, nie pole pod krzywą.

**Link:** [Comparing Qini, IPW, and Doubly Robust Metrics for Uplift Modeling](https://hackernoon.com/comparing-qini-ipw-and-doubly-robust-metrics-for-uplift-modeling)
