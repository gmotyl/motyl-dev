---
title: "Forward Deployed Engineer: kto tu tak naprawdę pracuje"
excerpt: "Vinoo Ganesh z Keplera pokazuje, że rola FDE ma sens tylko wtedy, gdy wraca z terenu z materiałem na produkt, a nie tylko z zadowolonym klientem."
publishedAt: "2026-09-12"
slug: "forward-deployed-engineer-best-practices"
hashtags: "#latent #ai #llm #ml #architecture #engineering #product #generated #pl"
source_pattern: "Latent.Space"
---

## Forward Deployed Engineer: kto tu tak naprawdę pracuje

**TLDR:** Vinoo Ganesh, CEO Keplera, wraca do własnego doświadczenia z Palantira i Citadel, żeby odpowiedzieć na pytanie, czym właściwie jest forward deployed engineer. Jego odpowiedź jest prosta i niewygodna zarazem: FDE, który wraca z terenu bez niczego, co zasila platformę, jest konsultantem, tylko z ładniejszym tytułem na wizytówce.

**Summary:** W ostatnich miesiącach termin forward deployed engineer zrobił błyskawiczną karierę, ale rozjechał się znaczeniowo do tego stopnia, że na kolacji fellows programu a16z ludzie z Anthropic, Snowflake i garści startupów odkryli, że mówią o zupełnie różnych zawodach pod tą samą nazwą. Dla jednych to sprzedawca, który umie pisać w Pythonie, dla innych konsultant z umową o dzieło, który robi to, czego produkt nie potrafi. Ganesh, który budował tę funkcję trzykrotnie, w Palantirze, w Citadel i teraz w Kepler, uważa, że to zamieszanie nie jest przypadkowe, tylko wynika z tego, że firmy skopiowały nazwę stanowiska bez skopiowania modelu, który je uzasadnia.

Punktem wyjścia jest historia z 2013 roku, kiedy Ganesh pracował nad magazynem transakcji o nazwie Phoenix w Palantirze. System przeszedł wszystkie testy wewnętrzne, ale po wdrożeniu u klienta bankowego pusty znacznik czasu w prawdziwych danych trafił do epoki Unixa, co wygenerowało 2,3 miliona przedziałów retencji i zabiło serwer przez brak pamięci. Zespół znał specyfikację i rozumiał przypadek użycia, ale nikt nie stał w budynku klienta, kiedy system pracował na produkcyjnych danych. To on musiał lecieć naprawiać własny kod, co uczyniło z niego pierwszego FDE niejako wbrew jego woli.

Z tego doświadczenia Ganesh wyprowadza koncepcję rzeczowników i czasowników. Każda firma nazywa te same pojęcia inaczej, na przykład klient, kontrahent czy podmiot rozliczeniowy, i ma swoje niepisane procedury, które żyją w głowach garstki ludzi od lat. Zadaniem FDE nie jest zaspokojenie jednego klienta, tylko zrozumienie tego ukrytego modelu operacyjnego na tyle dobrze, żeby dało się go zaszyć w produkcie. Opisuje przy tym anegdotę o inżynierce od jakości danych, która blokowała migrację z CSV na Parquet z powodów, których nie potrafiła nazwać. Dopiero ktoś zauważył, że po prostu ręcznie przeglądała pliki w Excelu, a Parquet nie miał wtedy przeglądarki.

Kluczowe rozróżnienie, jakie stawia Ganesh, dotyczy tego, gdzie w organizacji siedzi funkcja FDE. Jeśli raportuje do sprzedaży, motywacją staje się zamknięcie kontraktu, co jest zupełnie sensownym zadaniem, tylko nie tym samym. Jeśli raportuje do produktu, każde wdrożenie ma obowiązek zostawić po sobie coś, co przyspiesza kolejne. W Kepler, który sprzedaje narzędzia funduszom hedgingowym i bankom, każda niezgodność między tym, co mówi schemat, a tym, co naprawdę oznacza dana wartość, ujawnia się jako błąd systemu, a nie jako wynik, który tylko wygląda wiarygodnie.

Ostatecznie fosą, jaką opisuje Ganesh, nie jest model, bo ten tanieje z miesiąca na miesiąc, ani nawet talent, o który licytują się wszystkie laby po tej samej stawce. Fosą jest zweryfikowane, aktualne rozumienie tego, jak faktycznie działają firmy w danej branży, zebrane w platformie, która potrafi to rozumienie na bieżąco poprawiać. Konkurent może skopiować interfejs i zatrudnić twoich inżynierów, ale nie może przeskoczyć sekwencji błędów, poprawek i wniosków, które doprowadziły do tego rozumienia.

**Key takeaways:**
- Termin forward deployed engineer opisuje dziś kilka różnych zawodów, sprzedawcę, konsultanta i inżyniera produktu, a to zamieszanie bierze się z kopiowania nazwy bez modelu.
- FDE, który rozwiązuje problem klienta i niczego z tego nie przenosi do platformy, jest konsultantem, nie inżynierem produktowym, niezależnie od tytułu na wizytówce.
- Prawdziwa wartość FDE leży w rozpoznaniu rzeczowników i czasowników firmy, czyli jej niepisanego słownika i procedur, a nie w samym dowiezieniu funkcjonalności.
- To, czy funkcja FDE raportuje do sprzedaży czy do produktu, determinuje, czy firma buduje aktywo, czy tylko sprzedaje godziny.
- W Kepler prowizoryczność ujawnia się jako błąd systemu, a nie jako wynik, który wygląda wiarygodnie, dzięki wymogowi pełnej identyfikowalności danych.

**Why do I care:** Z perspektywy architekta, który sam nieraz siedział w terenie u klienta, ten tekst trafia w sedno problemu, jaki widziałem w niejednym zespole platformowym: feedback z wdrożeń wraca do zespołu produktowego przez korytarzową rozmowę, a nie przez proces, więc ginie połowa sygnału. To nie jest wyłącznie temat dla AI-firm sprzedających do funduszy, ten sam mechanizm dotyczy każdego zespołu, który utrzymuje wspólną platformę dla wielu klientów wewnętrznych czy zewnętrznych, a decyzja o tym, czy inżynierowie wdrożeniowi raportują do produktu czy do sprzedaży, w praktyce przesądza, czy firma buduje coś, co się kumuluje, czy tylko odsprzedaje godziny pod inną nazwą.

**Link:** [The Rise of the Forward Deployed Engineer — and How To Do the Job Right](https://www.latent.space/p/forward-deployed-engineer-best-practices)
