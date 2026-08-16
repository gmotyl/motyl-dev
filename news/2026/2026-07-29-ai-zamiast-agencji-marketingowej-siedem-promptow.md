---
title: "AI zamiast agencji marketingowej: jeden tutorial, siedem promptów i cała strategia wzrostu"
excerpt: "The AI Break pokazuje, jak zbudować własnego 'AI Channel Scout' zamiast płacić 3 tysiące dolarów miesięcznie growth marketerowi. Ciekawsze od samego pomysłu jest to, jak poskładany jest łańcuch promptów."
publishedAt: "2026-07-29"
slug: "ai-zamiast-agencji-marketingowej-siedem-promptow"
hashtags: "#theaibreak #ai #promptengineering #marketing #growth #productivity #llm #biznes #generated #pl"
---

## AI jako growth marketer: siedem promptów zamiast agencji za 3000 dolarów miesięcznie

**TLDR:** Newsletter opisuje sekwencję siedmiu promptów, która ma zastąpić pracę growth marketera przy szukaniu nowego kanału pozyskiwania klientów. Zamiast sześciotygodniowego procesu z agencją, autor proponuje godzinę na decyzję i trzydzieści dni na odpowiedź, opartą na jednym powtarzalnym bloku danych o firmie wklejanym do każdego kolejnego promptu.

**Summary:** Punktem wyjścia jest obserwacja, że większość firm ma jeden kanał, z którego pochodzi niemal cała sprzedaż, co autor nazywa wprost pojedynczym punktem awarii, a nie strategią wzrostu. Cała reszta artykułu to próba zrobienia porządku wokół tej diagnozy za pomocą siedmiu kolejnych promptów, z których każdy produkuje twardy wynik przekazywany dalej. Pierwszy prompt każe modelowi wcielić się w bezwzględnego stratega, który przesłuchuje użytkownika, zanim cokolwiek policzy, i wypluwa gotowy "Growth Profile", czyli gęsty opis firmy poniżej 250 słów, wklejany później sześć razy z rzędu. Drugi każe grać rolę alergicznego na próżne metryki CFO, który liczy realny pułap CAC na podstawie marży, a nie przychodu, i to w trzech wariantach: agresywnym, rozsądnym i konserwatywnym, z jasnym zdaniem typu "kanał działa, jeśli daje klienta poniżej X dolarów w Y miesięcy". Dalej mamy szukanie miejsc, gdzie realnie siedzą kupujący, punktowanie dwunastu kanałów i zawężenie do trzech, projektowanie najtańszego testu z kryteriami zabicia lub skalowania ustalonymi z góry, harmonogram na trzydzieści dni i wreszcie cotygodniowy, piętnastominutowy rytuał oceny bez okłamywania samego siebie.

Sam pomysł biznesowy nie jest specjalnie odkrywczy, agencje marketingowe od dekad robią dokładnie to samo, tylko wolniej i drożej. To, co faktycznie warte jest uwagi, to konstrukcja promptów jako łańcucha z pamięcią współdzieloną przez jeden blok danych. Zamiast pytać model za każdym razem od nowa "jaki kanał wybrać", autor wymusza najpierw stworzenie gęstego, zwalidowanego opisu sytuacji, a potem przepuszcza go przez kolejne role: stratega, CFO, analityka rynku, sędziego wyników. To jest właśnie ten wzorzec, który w pracy z modelami językowymi działa najlepiej i najrzadziej jest stosowany przez ludzi piszących pojedyncze, oderwane od siebie zapytania.

Autor unika jednak paru niewygodnych pytań. Nigdzie nie ma mowy o tym, że model językowy nie ma dostępu do rzeczywistych danych analitycznych firmy, więc cała "brutalna szczerość" w pierwszym prompcie jest tak dobra, jak szczerość użytkownika wypełniającego formularz, a ludzie notorycznie kłamią sami sobie w kwestii tego, skąd biorą się ich klienci. Drugi problem to fakt, że punktowanie dwunastu kanałów i wybór trzech finalistów w praktyce sprowadza się do tego, że model reprodukuje ogólną wiedzę o tym, jakie kanały zwykle działają dla danego typu biznesu, a nie odkrywa czegoś, czego doświadczony marketer by nie wiedział. Wartość leży więc nie w wiedzy, tylko w tempie i w wymuszonej dyscyplinie liczenia, zanim się zacznie wydawać pieniądze.

**Key takeaways:**
- Jeden, gęsty blok kontekstu (tu: Growth Profile) wklejany do każdego kolejnego promptu daje spójność, jakiej nie ma seria niezależnych zapytań
- Nadanie modelowi konkretnej, "alergicznej na coś" roli (bezwzględny strateg, CFO nielubiący próżnych metryk) wymusza twardsze i mniej potakujące odpowiedzi
- Kryteria sukcesu i porażki (kill/scale) trzeba ustalić przed testem, nie po nim, inaczej każdy wynik da się później uzasadnić
- Cała metoda jest tak dobra, jak dane wejściowe, model nie zweryfikuje, czy twoje przekonania o źródłach klientów są prawdziwe

**Why do I care:** To głównie historia biznesowa, nie inżynierska, ale wzorzec łańcucha promptów z jednym współdzielonym blokiem kontekstu i zmieniającymi się rolami przekłada się wprost na pracę z asystentami kodu. Ten sam mechanizm, czyli gęsty, wersjonowany opis projektu wklejany do kolejnych sesji zamiast tłumaczenia kontekstu od nowa, to dokładnie to, co robimy w plikach typu CLAUDE.md albo AGENTS.md, a wymuszanie konkretnej, sceptycznej persony w prompcie bywa lepszym antidotum na nadmierną zgodność modelu niż proszenie go wprost o krytykę.

**Link:** [Tutorial: Replace Your $3K/month Growth Marketer With AI](https://theaibreak.substack.com/p/tutorial-replace-your-3kmonth-growth?publication_id=1842292&post_id=208810212&isFreemail=true&triedRedirect=true)
