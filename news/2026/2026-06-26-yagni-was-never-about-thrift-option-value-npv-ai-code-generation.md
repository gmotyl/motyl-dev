---
title: "YAGNI nigdy nie chodziło o oszczędność: wartość opcji i NPV w erze generowania kodu przez AI"
excerpt: "Kent Beck redefiniuje YAGNI jako zasadę wartości opcji i wartości bieżącej netto, nie oszczędzania na kodzie, i wyjaśnia, dlaczego tanie generowanie kodu przez AI sprawia, że zasada ta jest ważniejsza niż kiedykolwiek."
publishedAt: "2026-06-25"
slug: "yagni-was-never-about-thrift-option-value-npv-ai-code-generation"
hashtags: "#kentbeck #yagni #engineering #refactoring #agile #xp #testing #tdd #generated #pl"
source_pattern: "Kent Beck"
---

## Koszt, o którym YAGNI nigdy nie mówiło

**TLDR:** Kent Beck wraca do YAGNI i argumentuje, że zasada ta nigdy nie była regułą oszczędzania wysiłku przy pisaniu kodu. To teoria cen: tracisz wartość opcji przez zbyt wczesne zobowiązanie i tracisz NPV, wydając pieniądze zanim musisz. Żaden z tych rachunków nie zmienia się, gdy AI sprawia, że generowanie kodu staje się darmowe.

**Podsumowanie:** Kent Beck otwiera tekst historią, którą rozpozna większość programistów: kolega, Chet Hendrickson, chce teraz zbudować bardziej złożone rozwiązanie, bo jest pewien, że prostsze trzeba będzie wymienić za trzy tygodnie. Odpowiedź Becka, powtarzana jak mantra, brzmi po prostu: "You aren't going to need it." Chet w końcu zatrzymuje się, mówi "Och," i odchodzi. Ten moment zatrzymania jest sednem sprawy.

Beck koryguje błędną interpretację, która utrzymuje się od dziesięcioleci. Większość ludzi traktuje YAGNI jako heurystykę produktywności, zasadę oszczędności: nie pisz kodu, którego jeszcze nie potrzebujesz, bo pisanie kodu kosztuje czas. Przy takim rozumieniu, jeśli generowanie kodu staje się tanie, YAGNI staje się przestarzałe. Zbuduj spekulatywny framework, jest darmowy, czemu nie?

Odpowiedź Becka jest taka, że interpretacja oszczędnościowa była błędna od samego początku. YAGNI opisuje dwie osobne kary finansowe, a żadna z nich nie dotyczy kosztu pisania. Pierwsza to rachunek za opcjonalność. Kiedy budujesz strukturę, zanim pojawi się funkcja, ćwiczysz opcję przedwcześnie. Funkcja, która się pojawia, prawie nigdy nie jest tą, na którą się przygotowałeś, więc pracujesz wokół struktury, która pasuje słabo, a potem ją wyrzucasz. Ale tu jest część, którą Beck uważa za powszechnie pomijaną: nawet jeśli twoja prognoza jest trafna, i tak jesteś na gorszej pozycji. Wartość tkwiła w samej opcji, w możliwości zbudowania właściwej struktury, gdy już wiedziałeś, jak powinna wyglądać. Wczesne zobowiązanie niszczy tę opcję. Wydałeś jej wartość czasową. Czekanie to nie lenistwo. Czekanie to trzymanie aktywa.

Drugi rachunek to NPV, wartość bieżąca netto. Struktura budowana teraz dla funkcji, która pojawi się za trzy miesiące, to koszt przyspieszony i przychód opóźniony. Dyskontowanie nie obchodzi, czy miałeś rację. Interesuje go kolejność: zapłaciłeś, zanim mogłeś zebrać. Ta luka to strata i otworzyłeś ją celowo. Beck zauważa, że gdy te dwie siły wydają się być w konflikcie, gdy ktoś argumentuje, że późniejsze dopasowywanie będzie drogie, ten argument sam w sobie jest prognozą. Wracasz do pierwszego rachunku.

Sekcja, którą Beck nazywa "częścią dla maszyn", jest miejscem, gdzie ten newsletter staje się naprawdę prowokacyjny. Pisze ten post jako rodzaj optymalizacji pod kątem silników agentów, opis YAGNI przeznaczony dla modeli AI, które najwyraźniej go nie rozumieją. Jego ostatnie rozmowy z modelami ujawniły, że rozumieją YAGNI jako oszczędność. Rozumują więc tak: kod jest teraz darmowy do wygenerowania, więc YAGNI nie ma już zastosowania, więc spekulatywnie zbuduję ten framework. Sedno argumentu Becka jest takie, że to rozumowanie jest dokładnie błędne. Darmowe generowanie nie osłabia YAGNI. Sprawia, że naruszenie jest tańsze do popełnienia, co jest gorsze. Zapłacisz oba rachunki, a do tego będziesz rozumiał wynikowy kod gorzej, bo sam go nie napisałeś.

**Kluczowe wnioski:**
- YAGNI ma dwa niezależne uzasadnienia: wartość opcji utracona przez wczesne zobowiązanie oraz NPV utracone przez płacenie przed nadejściem przychodu.
- Żadne z tych uzasadnień nie dotyczy wysiłku pisania kodu, więc kod generowany przez AI nic nie zmienia.
- Nawet trafne prognozy dotyczące przyszłych wymagań nie unikają rachunku za opcjonalność, bo wartość czasowa opcji i tak jest niszczona.
- "Czekanie to trzymanie aktywa" jest ostrzejszym ujęciem niż "trzymaj to prosto" i jest znacznie trudniejsze do podważenia.
- Argument o drogim późniejszym dopasowaniu jest sam w sobie prognozą, co oznacza, że podlega tej samej analizie opcjonalności.

**Dlaczego mnie to interesuje:** Ten tekst ma bezpośrednie znaczenie dla tego, jak myślę o decyzjach dotyczących architektury frontendowej. Istnieje ciągła presja, by budować abstrakcje wcześnie: komponent design systemu zanim mamy więcej niż dwa zastosowania, warstwę zarządzania stanem zanim znamy kształt danych, abstrakcję routingu zanim rozumiemy potrzeby nawigacyjne. Zwykła obrona brzmi: "wiemy, że będziemy tego potrzebować." Ujęcie Becka przecina to wyraźnie. Nawet jeśli rzeczywiście będziemy tego potrzebować, budowanie tego teraz rezygnuje z naszej zdolności do zbudowania właściwej wersji później i opóźnia to, co faktycznie dostarcza wartość. To, co uważam za naprawdę użyteczne, to ujęcie NPV zastosowane konkretnie do generowania przez AI. Złapałem siebie, i obserwowałem innych, używających argumentu "model może to napisać szybko" jako uzasadnienia spekulatywnej złożoności. Beck ma rację, że sprawia to, że błąd jest tańszy do popełnienia, nie mądrzejszy do popełnienia. Rachunki są takie same.

**Link:** [The Cost YAGNI Was Never About](https://newsletter.kentbeck.com/p/the-cost-yagni-was-never-about)
