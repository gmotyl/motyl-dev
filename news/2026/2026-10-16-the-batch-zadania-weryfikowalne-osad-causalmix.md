---
title: "The Batch: zadania weryfikowalne i zadania wymagające osądu oraz CausalMix"
excerpt: "Andrew Ng o przepaści między zadaniami z poprawną odpowiedzią a tymi, gdzie liczy się osąd, i metoda doboru mieszanki danych do fine-tuningu."
publishedAt: "2026-10-16"
slug: "the-batch-zadania-weryfikowalne-osad-causalmix"
hashtags: "#thebatch #ai #ml #llm #engineering #generated #pl"
source_pattern: "The Batch"
---

## Weryfikowalne kontra wymagające osądu

**TLDR:** Andrew Ng pisze, że różnica w wynikach LLM między zadaniami weryfikowalnymi a tymi wymagającymi osądu jest większa, niż większość ludzi sądzi. Postęp w kodowaniu i matematyce nie przenosi się automatycznie na decyzje biznesowe.

**Summary:** Zadania weryfikowalne, jak kod czy matematyka, mają poprawną odpowiedź, którą da się sprawdzić automatycznie. Zadania osądu, jak reakcja na skargę klienta, wybór funkcji produktu czy strategia biznesowa, nie mają jednoznacznej poprawnej odpowiedzi, ale mają lepsze i gorsze. Dla pierwszych istnieją dobre techniki treningu. Uczenie ze wzmocnieniem w symulowanych środowiskach pozwala modelowi ćwiczyć różne podejścia i automatycznie sprawdzać, które działają. W uczeniu nadzorowanym łatwiej też o jednoznaczne etykiety. Ng dodaje argument z teorii uczenia: algorytmy uczą się szybciej tam, gdzie można dojść do zerowego błędu, niż tam, gdzie błąd Bayesa jest dodatni.

Dopowiada, że nadzorowany fine-tuning pomaga także w zadaniach nieweryfikowalnych, ale zbieranie danych i drobne postępy są trudniejsze i wolniejsze. Przypomina Deep Blue, Watsona i AlphaGo, po których oczekiwano szybkiego przeniesienia sukcesu na inne dziedziny, co okazało się przesadzone. Do tego zadania weryfikowalne łatwiej oceniać, bo zbiory testowe łatwiej zbudować, więc wrażenie postępu bywa zawyżone. Ng pozostaje optymistą w dłuższej perspektywie, ale uważa, że hype wokół AGI i RSI prowadzi do nadmiernej generalizacji. Dla inżynierów AI wniosek jest taki, że ludzie zachowają przewagę kontekstu przez długi czas.

**Key takeaways:**
- Zadania weryfikowalne dają się trenować przez RL z automatycznym sprawdzaniem.
- Zadania osądu wymagają zbierania danych i ręcznego tworzenia funkcji nagrody.
- Wyniki w testach weryfikowalnych zawyżają ogólne wrażenie postępu.
- Przewaga kontekstu po stronie człowieka potrwa jeszcze długo.

**Why do I care:** Dla frontendowca to praktyczna wskazówka, gdzie agent zadziała: tam, gdzie jest test, lint albo kompilator. Przy decyzjach o UX czy architekturze nie ma kompilatora, więc ocena zostaje po stronie człowieka. Ng nie podaje danych na swoją tezę, to jego opinia poparta intuicją i teorią, i tak ją czytam.

**Link:** [The Batch, 16 października 2026](https://www.deeplearning.ai/the-batch/)

## CausalMix: dobór mieszanki danych bez zgadywania

**TLDR:** Badacze z Tsinghua, Ant Group i Renmin University stworzyli CausalMix, metodę wyboru udziału przykładów z różnych dziedzin w zbiorze do fine-tuningu, niezależnie od jakości przykładów.

**Summary:** Problem polega na tym, że przy budowie zbioru do fine-tuningu dobór proporcji dziedzin wymaga kosztownych prób, a wynik zależy też od jakości pojedynczych przykładów. Mieszanka i jakość są ze sobą skorelowane. Skoro można znaleźć tę korelację, da się oddzielić ich wpływ na wynik modelu. Najlepsza mieszanka to ta, która daje największy zysk krańcowy po odjęciu efektu jakości.

Autorzy przygotowali 512 podzbiorów po 100 tysięcy przykładów ze zbioru Tulu 3, z różnymi proporcjami instrukcji, kodu, matematyki, wiedzy i bezpieczeństwa. Jakość mierzyli trudnością, złożonością rozumowania i czytelnością zapisu, a następnie dostroili osobny model Qwen2.5-0.5B na każdym podzbiorze i zmierzyli wynik na 10 benchmarkach. Trzy modele oparte na drzewach, LightGBM i CausalForestDML, oddzielają wpływ jakości od wpływu mieszanki. Eksperyment na modelu 0,5B nie mówi jeszcze, czy wnioski utrzymają się dla większych modeli.

**Key takeaways:**
- Mieszanka dziedzin i jakość przykładów są skorelowane, więc trzeba je rozdzielić.
- Najlepsza mieszanka maksymalizuje zysk krańcowy po odjęciu jakości.
- Badanie oparto na 512 podzbiorach Tulu 3 i modelu 0,5B.
- Skalowalność do większych modeli nie została tu pokazana.

**Why do I care:** Jeśli robisz fine-tuning na własnych danych, na przykład dla asystenta w produkcie, to metoda tańsza niż ślepe próby. Przy małych zespołach to jednak temat bardziej akademicki niż praktyczny. Zanim ktokolwiek to wdroży, trzeba zobaczyć wyniki na modelach, których faktycznie użyjesz.

**Link:** [The Batch, 16 października 2026](https://www.deeplearning.ai/the-batch/)
