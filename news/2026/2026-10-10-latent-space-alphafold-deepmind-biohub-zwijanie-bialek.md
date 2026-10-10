---
title: "Dlaczego AlphaFold nie rozwiązał zwijania białek: panel DeepMind i Biohub"
excerpt: "Pushmeet Kohli i Sal Candido o gorzkiej lekcji dla danych biologicznych, ograniczeniach AlphaFold i drodze do wirtualnej komórki."
publishedAt: "2026-10-10"
slug: "latent-space-alphafold-deepmind-biohub-zwijanie-bialek"
hashtags: "#latentspace #ai #ml #science #llm #generated #pl"
source_pattern: "Latent.Space"
---

## Dlaczego AlphaFold nie rozwiązał zwijania białek

**TLDR:** W panelu moderowanym przez Brandona Andersona Pushmeet Kohli z Google DeepMind i Sal Candido z Biohub dyskutują, czy skalowanie danych i mocy obliczeniowej wystarczy w biologii. Ich odpowiedź: najpierw trzeba znaleźć właściwe prawo skalowania i zacząć od problemu, nie od metody.

**Summary:** Rozmowa startuje od pytania, czy istnieje gorzka lekcja dla danych. Candido zwraca uwagę na powszechne nieporozumienie: prawa skalowania nie istnieją wszędzie. Dużą część pracy stanowi znalezienie sytuacji, w której więcej obliczeń i danych daje lepszy wynik, bo wtedy robi się z tego problem inżynierski. Podaje ciekawy przykład: model językowy białek trenowany na sekwencjach metagenomicznych, z których wiele nie jest nawet kompletnym białkiem, poprawia jakość projektowania prawdziwych białek. Ostrzega jednak przed pokusą skalowania tylko tego, co łatwo wygenerować.

Kohli rozumie gorzką lekcję szerzej niż "dane wygrywają". Według niego chodzi o to, żeby nie podchodzić do problemu religijnie, jako modelarz albo jako osoba od generowania danych. Problem jest na pierwszym miejscu, a rozwiązanie może wymagać modelowania, danych albo wiedzy dziedzinowej. Przy AlphaFold zespół nie miał zasobów, żeby o rząd wielkości powiększyć bazę PDB, więc inwestował w modelowanie. Przy genomice komórkowej doszedł do wniosku, że dane jeszcze nie pozwalają na ambicję wirtualnej komórki.

Pozostałe wątki obejmują to, że AlphaFold nie rozwiązał całego zwijania białek, bo statyczne struktury nie opisują dynamiki ani nieuporządkowanych regionów, możliwość wykorzystania mikrografów cryo-EM do bogatszych reprezentacji, przejście od pojedynczych białek do całych systemów biologicznych oraz zasadę Feynmana w nowej wersji: AI potrafi już tworzyć rzeczy, których nie rozumiemy. Candido sugeruje, że modele językowe białek mogą zawierać wiedzę naukową, której jeszcze nie odczytaliśmy. Ostatnia część dotyczy tego, że do zaufania ważniejsza jest kalibracja niepewności niż pełna interpretowalność, oraz tego, że Biohub, by "wyleczyć wszystkie choroby", musi myśleć o przełomach rzędu dziesięciokrotnego, nie o dziesięcioprocentowych poprawkach. Przeczytałem około połowę transkryptu, więc końcowe fragmenty znam tylko z opisu odcinka.

**Key takeaways:**
- Prawo skalowania trzeba najpierw znaleźć, nie zakładać.
- Problem ma pierwszeństwo przed wyborem metody.
- Zaufanie do modelu zależy od skalibrowanej niepewności bardziej niż od interpretowalności.

**Why do I care:** To tekst spoza frontendu, ale lekcja przenosi się wprost na projekty AI w firmach: zespoły często optymalizują pod dane, które mają, zamiast pod problem, który mają rozwiązać. Warto też zauważyć, że panel to rozmowa przedstawicieli dwóch instytucji, które mają interes w pozytywnym obrazie własnych programów, i nikt tu nie podważa deklaracji o 10-100 razy szybszym odkrywaniu leków. Traktuję to jako dobry wykład o myśleniu o danych, nie jako prognozę.

**Link:** [Why AlphaFold Didn't Solve Protein Folding, Pushmeet Kohli, Google DeepMind & Sal Candido, Biohub](https://www.latent.space/p/biohub-deepmind)
