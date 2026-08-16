---
title: "Canon 3X: dlaczego Twój produkt umiera, gdy stosujesz złą strategię do złej fazy"
excerpt: "Kent Beck opisuje trzy fazy wzrostu każdego pomysłu - Explore, Expand, Extract - i tłumaczy, dlaczego mieszanie podejść między nimi zabija projekty szybciej niż zła architektura."
publishedAt: 2026-07-31
slug: "canon-3x-explore-expand-extract"
hashtags: ["#kentbeck", "#testing", "#software-engineering", "#strategy", "#productmanagement", "#startup", "#scaling", "#generated", "#pl"]
source_pattern: "Kent Beck"
---

## Canon 3X: Explore, Expand, Extract

**TLDR:** Każdy produkt, firma czy pomysł rośnie po krzywej logistycznej (esowatej), ale ta gładka linia ukrywa trzy zupełnie różne fazy życia, z których każda wymaga innego podejścia do zespołu, finansów i technologii. Stosowanie strategii z jednej fazy w innej zabija projekty, nawet jeśli na pierwszy rzut oka wyglądają podobnie.

**Summary:** Kent Beck kontynuuje swoją serię "Canon", w której stara się tłumaczyć swoje idee bez metafor i bez przekonywania, po prostu suchymi faktami. Po Canon TDD przyszła kolej na model wzrostu, który nazywa 3X: Explore, Expand, Extract. Punktem wyjścia jest obserwacja, że wzrost każdego produktu, firmy czy ruchu społecznego da się opisać krzywą logistyczną, czyli tym charakterystycznym kształtem litery S. Problem w tym, że ta gładkość jest złudzeniem. Początek, środek i koniec krzywej wyglądają jakby były tą samą historią, a w rzeczywistości to trzy różne gry o różnych zasadach.

Beck rozkłada krzywą S na dwie sprzężenia zwrotne, które toczą ze sobą przeciągane liny. Pierwsza pętla jest wzmacniająca. im więcej masz produktu, klientów czy rozpoznawalności, tym łatwiej zdobyć jeszcze więcej. Druga pętla jest hamująca i wcześniej czy później przejmuje kontrolę, spowalniając wzrost aż do jego naturalnego sufitu. Faza Explore polega na znalezieniu tej pierwszej pętli, czegoś nowego, bo gdyby ktoś już to robił, nie byłoby w tym nic do odkrycia. Faza Expand to utrzymanie tej pętli w ruchu na tyle długo, żeby pomysł zdążył się przeskalować, mijając po drodze wszystkie potencjalnie śmiertelne pętle hamujące. Faza Extract to moment, w którym wzrost się kończy, bo dogania go ostateczna pętla hamująca, a zadaniem staje się wyciśnięcie z tego, co zostało zbudowane, maksymalnej wartości.

Najciekawszy fragment tekstu to zestawienie, jak bardzo różnią się od siebie te trzy fazy w praktyce. W Explore ryzykiem jest to, że nikomu nie zależy i pomysł umiera z braku paliwa, więc strategią są szybkie eksperymenty, maksymalna kreatywność i małe zespoły bez zależności, które szybko odrzucają porażki. W Expand ryzyko polega na tym, że coś się nie skaluje, więc cała uwaga skupia się na kolejnym wąskim gardle, dławi się wzrost tam, gdzie trzeba, i odrzuca funkcje, które nie są niezbędne. W Extract chodzi już o wzrost połączony z zyskiem, więc strategią są bezpieczne, małe eksperymenty optymalizacyjne i wdrażanie tylko tego, co się sprawdziło. Beck podkreśla, że te fazy różnią się finansowaniem, wielkością zespołu, zarządzaniem projektem, dobieraniem ludzi, podejściem do technologii, zarządzaniem ryzykiem, wdrażaniem, marketingiem i sprzedażą. Innymi słowy, prawie wszystkim.

Sztuczka polega na tym, żeby w organizacji równolegle prowadzić projekty w różnych fazach, ale każdy traktować zgodnie z jego własną logiką. Produkty w fazie Extract płacą rachunki i finansują portfel projektów w fazie Explore. Kiedy jakiś projekt wchodzi w Expand, trzeba go traktować priorytetowo, nawet kosztem dochodowych produktów w Extract, co jak sam przyznaje, łatwo powiedzieć, a prawie niemożliwe wykonać. Ostatnia myśl Becka brzmi jak motto na drzwiach niejednej firmy: większość zespołów nie ma problemu ze strategią, ma problem z adaptacją. Plan i tak nie przetrwa zderzenia z rzeczywistością, pytanie tylko, czy organizacja się wtedy ugnie, czy pęknie.

**Key takeaways:**
- Wzrost produktu czy firmy da się opisać krzywą logistyczną, ale gładkość tej krzywej maskuje trzy jakościowo różne fazy.
- Explore polega na znalezieniu nowej pętli wzrostu metodą szybkich, tanich eksperymentów prowadzonych w małych, niezależnych zespołach.
- Expand to walka o utrzymanie wzrostu przy jednoczesnym omijaniu kolejnych wąskich gardeł, często kosztem funkcji, które nie są niezbędne.
- Extract to faza optymalizacji zysku przy niewielkim, bezpiecznym eksperymentowaniu, gdy dalszy agresywny wzrost przestaje się opłacać.
- Stosowanie podejścia właściwego jednej fazie do projektu będącego w innej fazie jest jedną z głównych przyczyn, dla których dobre pomysły umierają.
- Prawdziwym problemem organizacji rzadko jest brak strategii, częściej brak zdolności do adaptacji, gdy rzeczywistość zweryfikuje plan.

**Why do I care:** Czytając to, od razu widzę w głowie mapę projektów, przez które przechodziłem jako architekt frontendu. Zespół, który dostał zielone światło na eksperymentalny widget, a potem ktoś z góry oczekiwał od niego tego samego procesu code review, tych samych SLA i tej samej dokumentacji co od głównej aplikacji płacącej rachunki. To jest dokładnie mieszanie faz, o którym pisze Beck, tylko nikt tego tak nie nazywał. W praktyce najbardziej boli to w warstwie technicznej, bo zespół w fazie Explore powinien mieć prawo pisać brzydki, jednorazowy kod i wyrzucać go bez sentymentu, a zespół utrzymujący produkt w fazie Extract powinien inwestować w testy, refaktoryzację i stabilność, bo tam liczy się przewidywalność, nie prędkość. Kiedy menedżerowie każą jednym zespołom działać jak drugim, dostajemy albo sparaliżowane analizą eksperymenty, albo rozjeżdżający się w szwach produkt produkcyjny. Ten model daje mi słownik, żeby w następnej rozmowie o priorytetach powiedzieć wprost, w jakiej fazie jesteśmy i czego ta faza od nas wymaga, zamiast kłócić się o to, czy pisać testy, czy nie.

**Link:** [Canon 3X: Explore/Expand/Extract](https://newsletter.kentbeck.com/p/canon-3x-exploreexpandextract?publication_id=256838&post_id=207795963&isFreemail=true&triedRedirect=true)
