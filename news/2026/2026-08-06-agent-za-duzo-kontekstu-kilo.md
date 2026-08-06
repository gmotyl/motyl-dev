---
title: "Twój agent ma za dużo kontekstu"
excerpt: "Kilo Code opisuje paradoks, który każdy zespół używający agentów koduje wcześniej czy później: dokładanie kolejnych specyfikacji i reguł nie poprawia jakości pracy agenta, tylko go gubi."
publishedAt: "2026-08-06"
slug: "agent-za-duzo-kontekstu-kilo"
hashtags: "#kilo #agentyai #promptengineering #specyfikacje #architektura #generated #pl"
source_pattern: "Kilo"
---

## Twój agent ma za dużo kontekstu

**TLDR:** Zespół Kilo Code zauważył, że wpychanie do agenta kolejnych specyfikacji, reguł i dokumentów nie zwiększa jakości jego pracy, a po przekroczeniu pewnego progu zaczyna ją pogarszać. Agent miesza fakty z różnych dokumentów, nadinterpretuje szczegóły, których nie doczytał, i broni błędnych wniosków z pewnością godną seniora. Rozwiązaniem nie jest więcej instrukcji, tylko jasne rozdzielenie tego, co jest prawdą weryfikowalną w kodzie, od tego, co jest celem wyznaczonym przez człowieka.

**Summary:** Odruch, który opisuje Kilo, znam z własnego zespołu i pewnie każdy, kto wdrażał agenty do codziennej pracy, też go rozpoznaje. Agent czegoś nie zrozumiał albo zrobił źle, więc naturalną reakcją jest dopisanie kolejnej reguły do pliku z instrukcjami, dorzucenie specyfikacji, kazanie mu czytać dokumentację przed startem. Intuicja mówi, że więcej kontekstu to lepszy wynik. W praktyce, po przekroczeniu pewnego progu, dzieje się coś odwrotnego. Kiedy agent wciąga naraz trzy czy cztery dokumenty specyfikujące różne systemy, zaczyna traktować szczegół z jednego jako fakt o drugim. Half-read fragment staje się dla niego pewnikiem, a kiedy dopytasz, skąd ta pewność, okazuje się, że po prostu pomieszał dwa źródła.

Ciekawy jest opisany mechanizm degeneracji specyfikacji. Miały opisywać zachowanie i oczekiwany efekt, a z czasem obrosły w szczegóły implementacyjne, aż jedna z nich urosła do ponad stu punktów napisanych językiem przypominającym umowę prawną, z peryfrazami typu "upstream payment provider" zamiast prostego nazwania rzeczy po imieniu. Człowiek takiego dokumentu ledwo ogarnia wzrokiem i czyta go selektywnie. Agent nie ma tego filtra, traktuje każdą klauzulę jako obowiązującą, włącznie z tymi, które są już nieaktualne. To jest różnica, którą łatwo przegapić: dokument pisany dla człowieka i dokument pisany dla agenta to w praktyce dwa różne artefakty, a próba robienia jednego dla obu odbiorców kończy się tym, że nie służy dobrze żadnemu.

Najciekawszy fragment tekstu to pytanie o źródło prawdy. Autorzy przechodzą po kolei: testy nie są wiarygodne, bo agent sam je pisze i jest bardzo zmotywowany, żeby przechodziły. Kod nie jest wiarygodny, bo pokazuje jak coś działa teraz, łącznie z błędami, a nie jak powinno działać. Specyfikacja jest wiarygodna tylko wtedy, gdy ktoś faktycznie ją aktualizuje, co w praktyce rzadko się dzieje. Wiedza w głowie jednej osoby wyparowuje, gdy ta osoba idzie na urlop albo po prostu mija kilka tygodni. Rozwiązaniem, na które wpadł zespół Kilo, jest rozdzielenie dwóch zupełnie różnych pytań: jak oprogramowanie działa teraz, co jest weryfikowalne przez kod i testy, oraz jak ma działać w przyszłości, co jest decyzją człowieka i nie da się tego wywnioskować z istniejącego kodu, bo cały sens zmiany często polega na tym, że nowy stan ma nie przypominać starego.

Zwracam uwagę na obserwację o trendzie w system promptach wiodących modeli, bo to potwierdza coś, co sam podejrzewałem od dłuższego czasu. Kolejne generacje harnessów mają coraz mniej sztywno zakodowanych instrukcji, a coraz więcej mechanizmów do dynamicznego dociągania kontekstu w postaci skilli, dokładnie w momencie, gdy jest potrzebny. To jest odwrotność tego, co robi większość zespołów, które próbują "naprawić" agenta doklejając mu kolejny akapit do pliku z regułami projektu.

**Key takeaways:**
- Więcej kontekstu podanego naraz nie oznacza lepszego wyniku, agent po przekroczeniu pewnego progu zaczyna mieszać fakty z różnych dokumentów i broni tej mieszanki z niezasłużoną pewnością.
- Specyfikacje mają tendencję do dryfowania od opisu zachowania w kierunku szczegółów implementacyjnych, co czyni je jednocześnie nieczytelnymi dla ludzi i zbyt dosłownie traktowanymi przez agenty.
- Trzeba rozdzielić dwa rodzaje prawdy: to, jak system działa teraz, weryfikowane przez kod i testy, oraz to, jak ma działać w przyszłości, co jest decyzją człowieka i nie wynika z obecnego kodu.
- Dokument pisany dla agenta i dokument pisany dla człowieka to różne artefakty, warto z góry zdecydować, dla kogo dana specyfikacja jest i kto ma ją realnie utrzymywać.
- Kierunek architektoniczny lepiej wymuszać strukturą, na przykład nowym folderem czy modułem oznaczającym aktualny wzorzec, niż rozbudowaną prozą w plikach instrukcji.

**Why do I care:** Piszę reguły dla agentów w kilku projektach i rozpoznaję ten wzorzec, doklejanie kolejnej sekcji do pliku instrukcji jest najłatwiejszą reakcją na błąd agenta, bo nie wymaga myślenia, tylko odruchu. Ten tekst jest dobrym argumentem, żeby przed dodaniem kolejnej reguły zadać sobie pytanie, czy to jest fakt o kodzie, który powinien wynikać z testów, czy decyzja architektoniczna, którą trzeba świadomie wyrazić. W praktyce najlepiej działa mi trzymanie specyfikacji tylko dla naprawdę skomplikowanych obszarów, jak integracje płatnicze albo warstwy z dużą liczbą zależności, a resztę zostawianie kodowi i testom jako źródłu prawdy. Zespoły, które próbują opisać każdy komponent osobną specyfikacją "dla bezpieczeństwa", produkują dokładnie ten chaos, o którym pisze Kilo, tylko rozłożony na więcej plików.

**Link:** [Your Agent Has Too Much Context](https://blog.kilo.ai/p/your-agent-has-too-much-context?publication_id=4363009&post_id=209958015&isFreemail=true&triedRedirect=true)
