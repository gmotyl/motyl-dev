---
title: "AI scaffolding, codzienny feedback i tygodniowe lektury"
excerpt: "Jak zachować intencję produktową przy pracy z agentami AI, kiedy rezygnować z AI na rzecz deterministycznych narzędzi, oraz dlaczego feedback powinien być codziennym sygnałem, a nie wyjątkowym zdarzeniem."
publishedAt: "2026-07-20"
slug: "ai-scaffolding-codzienny-feedback-i-tygodniowe-lektury"
hashtags: "#refactoring #engineering #architecture #ai #agentai #feedback #management #generated #pl"
source_pattern: "🌀 Refactoring"
---

## Kiedy agent buduje nie to, co miałeś na myśli

**TLDR:** Oddajesz zadanie agentowi, kod działa, trafia na produkcję, ale to nie jest to, o co chodziło. Problem polega na tym, że przy agentach pracujących w dużej prędkości decyzje produktowe muszą podróżować razem z zadaniem. Atono opisuje, jak wiedza o produkcie staje się punktem dźwigni w agentic workflows.

**Summary:**

Jest coś charakterystycznego w błędzie, który coraz częściej pojawia się w zespołach pracujących z AI: agent dostarcza poprawną implementację złego wymagania. Kod przechodzi testy, deploy przebiega bez problemów, a i tak ktoś musi to przepisać, bo nie o to chodziło. To nie jest problem techniczny, to problem transferu intencji.

Atono opublikowało przewodnik "From Intent to Production at Agent Speed", który analizuje, dlaczego wiedza o produkcie jest właściwym miejscem do szukania rozwiązania tego problemu. Kiedy agent działa szybko, kontekst, który normalnie żyje w rozmowach, spotkaniach i głowach product managerów, musi zostać skodyfikowany i dostępny w momencie podejmowania decyzji przez agenta. Inaczej agent optymalizuje pod własne zrozumienie zadania, nie pod to, czego faktycznie potrzebuje biznes.

To zderzenie dwóch rzeczywistości: agenty przyspieszyły część wytwarzania oprogramowania, ale nie przyspieszyły zrozumienia produktu. I właśnie ta asymetria jest źródłem coraz częstszych problemów.

**Key takeaways:**
- Przy pracy z agentami AI intencja produktowa musi być skodyfikowana i dostępna w momencie wykonywania zadania, nie tylko w głowach ludzi
- Poprawna implementacja złego wymagania to jeden z najdroższych błędów, bo przechodzi przez wszystkie bramki jakości
- Wiedza o produkcie staje się infrastrukturą, nie tylko dokumentacją

**Why do I care:** Jako senior frontend developer widzę to w praktyce: agent potrafi zbudować komponent technicznie bezbłędny, ale niespójny z design systemem albo z oczekiwaniami UX, które były omawiane dwa sprinty temu. Im szybciej agent działa, tym szybciej te rozbieżności się akumulują. Potrzebujemy nowych nawyków wokół przekazywania kontekstu, nie tylko lepszych promptów.

**Link:** [AI scaffolding, daily feedback, and weekly readings!](https://refactoring.fm/p/ai-scaffolding-daily-feedback-and?publication_id=64099&post_id=207253073&isFreemail=true&triedRedirect=true)

---

## Gdzie AI ma sens, a gdzie lepiej użyć skryptu

**TLDR:** Luca opisuje błąd, w który sam wpada: używanie AI do wszystkiego, nawet tam, gdzie prosty skrypt byłby szybszy, tańszy i łatwiejszy do debugowania. Agent jest dobry na starcie, bo pomaga odkryć kształt zadania. Ale kiedy workflow się ustabilizuje, deterministyczne narzędzia wygrywają.

**Summary:**

Mam podobną obserwację ze swojej pracy i cieszę się, że ktoś to powiedział wprost: agent AI jest świetnym narzędziem do eksploracji, ale kiepskim do produkcji. Na początku automatyzacji nowego procesu nie wiemy, jak naprawdę wygląda to zadanie. Agent pozwala szybko przejść od celu w języku naturalnym do działającego procesu i przy okazji ujawnia rzeczy, których nie przewidzieliśmy: brakujące dane, miejsca wymagające zatwierdzenia, kroki, które się powtarzają.

Problem pojawia się, gdy zostajemy przy agencie po tej fazie odkrywania. Kiedy wiemy już, że krok A zawsze wymaga danych z kroku B, że format wejściowy jest przewidywalny, że nie ma tu żadnej niejednoznaczności, to dalsze używanie AI jest po prostu marnotrawstwem. Cron job, prosty skrypt, wywołanie API, to nie jest techniczny regres, to właściwy wybór narzędzia.

Luca proponuje konkretną progresję: zacznij od agenta, bo to najszybszy start. Obserwuj, gdzie zadanie się powtarza w ten sam sposób. Wyodrębnij stabilne kroki do czegoś deterministycznego. Zostaw AI tylko tam, gdzie naprawdę potrzebna jest ocena sytuacji albo obsługa niejednoznaczności. To podejście sprawia, że workflow jest jednocześnie szybszy, tańszy i łatwiejszy do obserwowania, kiedy coś pójdzie nie tak.

**Key takeaways:**
- Agent AI to dobre narzędzie do odkrywania kształtu nowego zadania, nie do jego długoterminowej obsługi
- Stabilne, przewidywalne kroki powinny trafiać do deterministycznych narzędzi: skryptów, cron jobów, definicji workflow
- AI warto zostawiać tam, gdzie elastyczność ma wartość, czyli przy ocenie sytuacji i obsłudze niejednoznaczności

**Why do I care:** To jedna z tych rad, które łatwo przeoczyć, bo "zostań przy agencie" jest zawsze wygodną opcją. Nie trzeba nic refaktorować, nie trzeba pisać skryptu. Ale z perspektywy senior developera: im więcej logiki przechodzi przez niezdeterminowane systemy, tym trudniej debugować błędy na produkcji. Deterministyczność to nie staromodność, to cecha projektu, którą cenię.

**Link:** [AI scaffolding, daily feedback, and weekly readings!](https://refactoring.fm/p/ai-scaffolding-daily-feedback-and?publication_id=64099&post_id=207253073&isFreemail=true&triedRedirect=true)

---

## Feedback jako codzienny sygnał, nie wyjątkowe zdarzenie

**TLDR:** Jean Hsu i Cate Huston w rozmowie z Lucą pokazują, dlaczego feedback stał się słowem kojarzonym z niebezpieczeństwem. Rozwiązanie jest proste: chwalić regularnie i konkretnie, żeby gdy nadejdzie trudna rozmowa, ludzie wiedzieli, że jest to normalny element systemu, a nie alarm.

**Summary:**

"Czy mogę dać ci feedback?" to zdanie, po którym większość ludzi instynktownie się spina. I to nie jest irracjonalna reakcja. Jeśli przez lata słyszysz ten zwrot tylko wtedy, gdy coś poszło źle, mózg po prostu uczy się skojarzeń. Feedback równa się zagrożenie.

Cate Huston podzieliła się nawykiem, który zmienia tę dynamikę: kiedy ktoś zrobi coś dobrze, powiedz mu o tym. Natychmiast, konkretnie, bez owijania w bawełnę. To nie jest tylko kwestia dobrego klimatu w zespole. Chodzi o budowanie relacji, w której druga osoba wie, że śledzisz jej pracę jako całość, nie tylko wypatrujesz błędów. Kiedy potem przychodzi chwila, gdy trzeba powiedzieć coś trudnego, to ląduje zupełnie inaczej.

Jest tu też praktyczny sposób na rozszerzenie tego efektu poza siebie: kiedy ktoś chwali kolegę w twojej obecności, zapytaj "a powiedziałeś mu o tym?". Przez takie małe interwencje feedback przestaje być kapitałem na specjalne okazje i staje się normalnym sygnałem w systemie komunikacji zespołu.

**Key takeaways:**
- Częsty, konkretny pozytywny feedback zmienia kontekst, w którym odbierane są trudne rozmowy
- Regularne pochwały budują zaufanie, że menedżer obserwuje pracę jako całość, nie tylko czeka na błędy
- Warto aktywnie pytać: "czy powiedziałeś mu o tym?", gdy słyszysz pochwałę skierowaną do kogoś trzeciego

**Why do I care:** W kontekście pracy z developerami widzę, jak bardzo feedback jest zaniedbywany w kierunku pozytywnym. Code review to miejsce, gdzie łatwo wskazywać problemy, trudniej zatrzymać się i napisać "to jest naprawdę eleganckie rozwiązanie". A jednak te momenty budują zespoły, w których ludzie chcą się rozwijać, bo wiedzą, że ktoś to zauważy.

**Link:** [AI scaffolding, daily feedback, and weekly readings!](https://refactoring.fm/p/ai-scaffolding-daily-feedback-and?publication_id=64099&post_id=207253073&isFreemail=true&triedRedirect=true)

---

## Trzy artykuły warte przeczytania

**TLDR:** Luca poleca w tym tygodniu trzy teksty: Armin Ronacher o tym, jak AI pozwala kontynuować budowanie systemów, których już nie rozumiemy; Will Larson o tym, dlaczego naprawa słabego zespołu bywa "nagrodzona" większą ilością pracy; oraz Antirez o tym, że recenzowanie każdej linii kodu w świecie AI to prawdopodobnie zły sposób na spędzanie czasu.

**Summary:**

Armin Ronacher nawiązuje do historii o wieży Babel i stosuje ją do oprogramowania. Przez pierwsze kilkadziesiąt lat informatyki istniał warunek konieczny: żeby rozwijać system, człowiek musiał go rozumieć. AI zmienia tę zależność. "Budowa" może trwać nawet wtedy, gdy ludzie stracili wspólny język potrzebny do rozumowania o systemie. To nie jest optymistyczna obserwacja, ale warto ją przemyśleć.

Will Larson opisuje paradoks poprawy: naprawiasz słaby zespół, a efektem jest więcej pracy, nie chwila oddechu. Dzieje się tak dlatego, że dobry zespół staje się widoczny i zaczyna przyciągać ukryty wcześniej popyt. To użyteczny model mentalny dla każdego, kto zarządza zespołem i zastanawia się, dlaczego poprawa nie przynosi ulgi.

Antirez, twórca Redisa, stawia tezę, którą wielu developerów wciąż odrzuca: jeśli AI pisze więcej kodu, recenzowanie każdej linii to prawdopodobnie zły sposób na wykorzystanie czasu. Więcej dźwigni daje skupienie się na pomysłach i architekturze. To nie jest wezwanie do rezygnacji z code review, ale do zmiany proporcji i poziomu abstrakcji, na którym pracujemy.

**Key takeaways:**
- AI pozwala kontynuować rozwój systemów, których ludzie nie rozumieją w całości, i to rodzi fundamentalne pytania o governance
- Poprawa zespołu bywa "karana" większą ilością pracy, bo ujawnia dotychczas ukryty popyt
- Przy większej ilości kodu generowanego przez AI czas developera warto przenosić na decyzje architektoniczne, nie na recenzowanie każdej linii

**Why do I care:** Wszystkie trzy obserwacje dotykają czegoś, z czym zmagam się na co dzień: jak zachować rozumienie systemu, gdy tempo wytwarzania rośnie szybciej niż zdolność do jego przeglądania. Nie mam gotowej odpowiedzi, ale to właściwe pytania.

**Link:** [AI scaffolding, daily feedback, and weekly readings!](https://refactoring.fm/p/ai-scaffolding-daily-feedback-and?publication_id=64099&post_id=207253073&isFreemail=true&triedRedirect=true)
