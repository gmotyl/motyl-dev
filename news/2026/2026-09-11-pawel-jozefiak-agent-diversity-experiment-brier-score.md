---
title: "Pięć różnych agentów kontra pięć klonów: dwutygodniowy eksperyment, który obalił własną tezę autora"
excerpt: "Autor zbudował pre-rejestrowany eksperyment porównujący pięć agentów AI z różnymi kontekstami przeciwko pięciu identycznym klonom w prognozowaniu wiralowości postów, a wynik okazał się zupełnie inny niż cokolwiek zakładał na starcie."
publishedAt: "2026-09-11"
slug: "pawel-jozefiak-agent-diversity-experiment-brier-score"
hashtags: "#joozio #ai #agents #llm #generated #pl"
source_pattern: "PawelJozefiak"
---

## Pięć różnych agentów kontra pięć klonów: eksperyment, który obalił własną tezę autora

**TLDR:** Autor przez czternaście nocy testował tezę, że sieć agentów AI z różnymi „soczewkami” poznawczymi pokonuje tę samą liczbę klonów jednego modelu przy równym budżecie, bo dokłada kontekst, a nie tylko moc obliczeniową. Wstępne dane wyglądały na potwierdzenie tezy, ale głębsza analiza pokazała, że cały efekt był artefaktem błędu pomiarowego, a nie realną przewagą różnorodności.

**Summary:** Punktem wyjścia był krytyczny argument przeciwko modnemu dziś sprzedawaniu multi-agentowości jako paneli, rad czy rojów ekspertów: pod wieloma takimi produktami siedzi jeden model noszący kilka różnych system promptów, kosztujący kilka razy więcej niż pojedyncze zapytanie, bez żadnego dowodu, że rzeczywiście dokłada coś więcej niż compute. Autor postanowił to sprawdzić empirycznie zamiast się o to spierać: pięciu agentów z realnie różnymi kontekstami (specjalista od Hacker News, od Reddita, od X, historyk trendów i agent celowo pozbawiony wiedzy o czymkolwiek aktualnym) kontra pięć identycznych klonów tego samego modelu, ten sam budżet, to samo zadanie, prognozowanie, czy świeże posty z sieci społecznościowych przekroczą próg popularności w 48 godzin, oceniane w pełni deterministycznym skryptem, bez oceniania jednego modelu przez drugi.

Pierwsza noc niemal go oszukała. Uzasadnienia pisane przez agentów wyglądały świetnie i różniły się słownictwem, ale wszystkie pięć zapisało niemal identyczną liczbę: korelacja parami wewnątrz grupy klonów wyniosła 0,959, a wewnątrz grupy „zróżnicowanej” 0,909, praktycznie bez różnicy. Uratował go jeden zapisany wcześniej warunek kontrolny: korelacja między agentami musi być niższa w grupie zróżnicowanej niż w grupie klonów, inaczej cały eksperyment jest fikcją. Naprawa polegała na zmianie sposobu, w jaki agenty dochodziły do liczby: zamiast pisać osobowość i prosić o prawdopodobieństwo wprost, każdy agent najpierw wydawał werdykt we własnych kategoriach, a dopiero potem odczytywał liczbę z przedziału przypisanego temu werdyktowi. Po tej zmianie korelacja w grupie zróżnicowanej spadła do przedziału 0,53-0,75 i utrzymała się tak przez wszystkie czternaście nocy.

Tu jednak wchodzi drugi, znacznie poważniejszy błąd, który przez tydzień psuł cały pomiar. Autor ustawił bazowy wskaźnik trafień na 10-15%, uznając to za „uczciwą” liczbę. Realny wskaźnik po dwóch tygodniach wyniósł 0,72%, piętnaście razy mniej. Ponieważ metryka Briera (błąd kwadratowy prawdopodobieństwa) karze najmocniej za poziom odpowiedzi, a nie za trafność samego rankingu, ten jeden błędnie skalibrowany parametr odpowiadał w końcu za 74% wyniku klonów i 68% wyniku zróżnicowanych agentów. Po przeskalowaniu obu grup do rzeczywistego wskaźnika, przewaga zróżnicowanych agentów (0,0050 na korzyść tezy) zmieniła kierunek i skurczyła się o czynnik około 150, do 0,0000 na korzyść klonów. To, co wyglądało jak potwierdzenie tezy, było w całości efektem wspólnego dla obu grup błędu w założeniu, nie różnicą w jakości prognoz.

Autor policzył też, ile kosztowałby brak jakiejkolwiek analizy: stały punkt równy realnemu wskaźnikowi trafień, nazwany „krzesłem bazowym”, osiągnął wynik lepszy niż obie grupy agentów łącznie po korekcie. Innymi słowy, przez czternaście nocy, 4130 zsumowanych prognoz i dziesięciu agentów żadna z grup nie wykazała umiejętności przewidywania lepszej niż stały, niewymagający żadnego modelu punkt odniesienia. Jedyny wynik, który przetrwał całą korektę, to fakt, że uśrednienie pięciu zróżnicowanych agentów dało lepszy wynik niż ich najlepszy pojedynczy członek, podczas gdy uśrednienie pięciu klonów wypadło gorzej niż najlepszy klon z osobna, co jest dokładnie tym mechanizmem, dla którego w ogóle buduje się zespoły modeli.

**Key takeaways:**
- Sama różnorodność w prompcie (osobowość, kontekst) nie wystarcza, żeby odkorelować odpowiedzi modeli, potrzebna jest zmiana samej procedury wnioskowania.
- Jeden źle skalibrowany parametr wspólny dla obu grup porównawczych może całkowicie zdominować wynik eksperymentu i odwrócić jego kierunek po korekcie.
- Uśrednianie realnie zróżnicowanych agentów poprawia wynik względem najlepszego pojedynczego agenta, uśrednianie klonów go pogarsza.

**Why do I care:** Jeśli sprzedajesz albo kupujesz architekturę „panelu agentów” czy „roju ekspertów”, ten eksperyment to gotowa checklista pytań, które warto zadać dostawcy: jaki jest realny bazowy wskaźnik dla tego zadania, czy agenty są w ogóle mierzalnie odkorelowane, i czy ktokolwiek porównał to z pojedynczym modelem przy tym samym budżecie. Bez tej trójki dowodów „panel ekspertów AI” to broszura marketingowa, nie architektura, a autor pokazuje to na własnych, bolesnych liczbach, zamiast tylko o tym teoretyzować.

**Link:** [I Ran Five Diverse AI Agents Against Five Clones for 14 Nights. A Number I Made Up Decided the Result.](https://thoughts.jock.pl/p/five-lenses-one-brain-agent-diversity-experiment-2026)