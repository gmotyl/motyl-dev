---
title: "Kent Beck kształtuje branżę inżynierii oprogramowania — historia, TDD i era AI"
excerpt: "Rozmowa z Kent Beckiem o Extreme Programming, TDD, Agile, pracy w Apple i Facebooku oraz o tym, co naprawdę pozostanie ludzkie w erze AI."
publishedAt: "2026-07-02"
slug: "kent-beck-ksztaltuje-branze-inzynierii-oprogramowania"
hashtags: "#pragmatic-engineer #kent-beck #tdd #agile #extreme-programming #software-engineering #ai #generated #pl"
source_pattern: "Pragmatic engineer"
---

## Jak Kent Beck kształtuje branżę technologiczną

**TLDR:** Kent Beck — twórca Extreme Programming, TDD i współautor Agile Manifesto — opowiada w podcaście Pragmatic Engineer o swojej karierze, błędach, których nigdy wcześniej nie ujawniał, oraz o tym, dlaczego w erze AI zaufanie rośnie wolniej niż kod. To rzadka okazja, żeby zobaczyć branżę oczami człowieka, który ją współtworzył.

**Summary:**

Gergely Orosz przeprowadził długą rozmowę z Kent Beckiem, jednym z tych ludzi, których wkład w inżynierię oprogramowania jest na tyle głęboki, że większość programistów codziennie korzysta z jego idei, często nawet o tym nie wiedząc. Beck stworzył Extreme Programming, zredagował JUnit, spopularyzował TDD i dołożył słowo "daily" do Agile Manifesto. Brzmi jak suchy biogram — ale to, co opowiedział w tym odcinku, jest znacznie ciekawsze niż katalog osiągnięć.

Zacznijmy od Apple. Beck trafił tam w 1987 roku, przyciągnięty Smalltalkiem, który w tamtym momencie zdawał się przyszłością programowania. Apple dostało licencję od Xerox PARC i mogło rozwinąć język, ale klienci chcieli kompilatorów C i Pascala, więc projekt poszedł w odstawkę. Beck dołączył do zespołu budującego język programowania dla dzieci — i po pewnym czasie został zwolniony, bo, jak sam mówi, był w "punk mode" i wolał robić rzeczy po swojemu zamiast grać w drużynę. To jeden z tych momentów w karierze, który większość ludzi ukrywa, a on opowiedział go spokojnie, bez tłumaczenia się.

TDD nie zostało "wynalezione" — zostało przypomniane. Beck jako dziecko czytał ojcowski podręcznik programowania z ery taśm magnetycznych. Była tam rada: zanim napiszesz program, ręcznie wpisz oczekiwane wyjście. Zapomniał o tym na lata. Kiedy budował SUnit, przypomniał sobie ten pomysł i próbnie zastosował go do testów — napisał test przed kodem. Sam mówi, że zaśmiał się głośno, bo pomysł wydawał mu się absurdalny. Test na pewno się nie przejdzie, bo klasy jeszcze nie istnieją. Ale kiedy to zrobił, poczuł coś nieoczekiwanego: jego programistyczny lęk zniknął. Tak narodził się TDD convert.

Facebook był dla Becka intelektualnym resetem. Trafił tam w okolicach pięćdziesiątki i zastał firmę, która prawie w ogóle nie pisała testów jednostkowych, a mimo to prowadziła masowy, stabilny i szybko rosnący serwis. Próbował zorganizować warsztaty z TDD na hackathonie — klasy przed i po jego były pełne, jego nie zapisał się nikt. Zero uczestników. Na to Beck podjął decyzję: wyrzucam wszystko, co wiem, i uczę się inżynierii od nowa. Zostało mu to siedem lat. To jest ciekawy przykład intelektualnej uczciwości — gotowość do zakwestionowania własnego dorobku w obliczu sprzecznych dowodów.

3X — explore, expand, extract — to framework Becka do myślenia o fazach produktu i tym, jak różnią się wymagania dla kodu, zatrudniania i organizacji. W fazie eksploracji robisz wiele tanich, nieskorelowanych eksperymentów. W fazie ekspansji koncentrujesz się na jednej rzeczy, która działa, i przebijasz kolejne bariery. W fazie ekstrakcji tworzysz powtarzalny playbook i czerpiesz z ekonomii skali. Jak sam przyznaje, sposób kodowania, rekrutowania i organizowania się powinien być fundamentalnie różny zależnie od tego, w której fazie jesteś. Większość firm tego nie rozumie i stosuje te same procesy niezależnie od kontekstu.

**Key takeaways:**
- Kodowanie to mała część inżynierii oprogramowania — reszta, czyli budowanie zaufania, rozumienie domeny i komunikacja z ludźmi, pozostanie ludzka nawet w erze AI
- TDD narodziło się z osobistego lęku Becka przed złożonością kodu, nie z dogmatu
- Facebook bez TDD był stabilny i szybko rósł — to trudny fakt, który trzeba wziąć pod uwagę zamiast go ignorować
- Agile Manifesto powstało chaotycznie, a słowo "agile" Beck uważa za błąd — każdy mówi, że jest agile, więc termin stracił znaczenie
- Framework 3X (explore/expand/extract) wymaga różnych praktyk inżynierskich w każdej fazie
- Beck widzi siebie jako "tree shaker, not a jelly maker" — zaczyna rzeczy, doprowadza je do startu, potem idzie dalej

**Why do I care:** Z perspektywy architekta frontendowego najbardziej uderza mnie historia z Facebookiem. Beck, który napisał książkę o TDD, poszedł tam i zobaczył, że firma bez testów jednostkowych działa świetnie. Zamiast bronić swojego dorobku, powiedział: uczę się od nowa. To jest rzadka postawa — i myślę, że większość z nas, którzy pracują z React i TypeScript, powinna to wziąć do serca. Mamy tendencję do obrony swoich praktyk bardziej niż do weryfikacji ich wartości. Warto też zwrócić uwagę na to, czego Beck nie mówi wprost: jego "explore, expand, extract" to w zasadzie argument przeciwko uniformizacji procesu — a to coś, co większość dużych organizacji robi domyślnie, narzucając te same standardy na projekty w zupełnie różnych fazach. Jeśli pracujesz w produkcie, który jest wciąż w fazie eksploracji, a twoja firma stosuje procesy z fazy ekstrakcji, masz problem strukturalny, nie procesowy.

Jedna rzecz, którą Beck omija: co z testowaniem w projektach AI-assisted? Mówi, że zaufanie rośnie wolniej niż kod w erze AI, ale nie proponuje konkretnych mechanizmów. To luka, którą słyszę w wielu rozmowach — i nikt na razie nie ma dobrej odpowiedzi.

**Link:** [How Kent Beck shapes the tech industry](https://newsletter.pragmaticengineer.com/p/how-kent-beck-shapes-the-software)
