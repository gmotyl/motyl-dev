---
title: "Co się dzieje z pomysłem po „nie w tym wydaniu”"
excerpt: "Numer Unicorn Club o tym, co robić z prośbą o funkcję, którą właśnie odłożyliście na później, żeby nie wracać do niej za trzy miesiące bez pojęcia dlaczego."
publishedAt: "2026-09-23"
slug: "co-sie-dzieje-z-pomyslem-po-nie-w-tym-wydaniu"
hashtags: "#unicornclub #product #ux #management #teams #generated #pl"
source_pattern: "Unicorn Club"
---

## Co się dzieje z pomysłem po „nie w tym wydaniu”

**TLDR:** Adam Marsden odnosi się do pomysłu Johna Cutlera: zamiast od razu zamykać temat słowami „nie w tym wydaniu”, warto rozdzielić samo zauważenie problemu od decyzji, co z nim zrobić, i zapisać, kto ma to sprawdzić oraz kiedy wróci z odpowiedzią. Pokazuje to na przykładzie klienta, którego dział finansów potrzebuje prywatnych projektów w narzędziu do zarządzania pracą zespołu.

**Summary:** Każdy, kto prowadził planowanie wydania, zna to zdanie: „nie zrobimy tego w tym wydaniu”. To rozsądna odpowiedź na prośbę o funkcję, ale nic nie mówi o problemie, który stał za tą prośbą. Ktoś zgłosił coś, bo się czymś martwił, a samo wykreślenie funkcji z listy nie sprawia, że ten problem znika. Czy naprawdę może poczekać? Czy po prostu przestaliśmy o nim rozmawiać?

Autor odwołuje się do pomysłu Johna Cutlera, żeby rozdzielić dwie różne rzeczy: zauważenie możliwego problemu i żądanie, żeby ktoś działał już teraz. Zamiast wymuszać decyzję na miejscu, obserwację można zapisać w miejscu, do którego wszyscy mają dostęp, i wracać do niej, gdy pojawią się nowe dowody. Czasem po kilku tygodniach okazuje się, że naprawa w ogóle nie jest potrzebna. Brakuje jednak jednego elementu: kto ma sprawić, że to pytanie w ogóle wróci przed czyjeś oczy. Samo zapisanie obserwacji w backlogu to dopiero początek.

Dalej w tekście pojawia się konkretny przykład z narzędzia do zarządzania projektami. Klient używa go z małym zespołem, gdzie każdy widzi każdy projekt, a teraz chce dołączyć swój dział finansów. Klient mówi wprost, że część pracy finansów nie może być widoczna dla reszty firmy. Ktoś na przeglądzie designu zgłasza, że trzeba zbudować prywatne projekty. Zespół akurat zaplanował kolejne wydanie wokół czegoś innego, więc prywatne projekty trafiają do backlogu, tego samego, który autor nazywa żartobliwie „logiem rzeczy, do których już nigdy nie wrócimy”. Dział finansów klienta wciąż nie może korzystać z narzędzia do swojej pracy, a temat po prostu tam leży.

Zamiast od razu projektować rozwiązanie, autor proponuje najpierw ustalić, co konkretnie dział finansów musi trzymać w tajemnicy i kto poza nim potrzebuje dostępu do tej pracy. Odpowiedzi trzeba szukać u samych ludzi z działu finansów, a nie zgadywać za nich. Dopiero rozmowa z nimi pokazuje, że proszą o coś innego niż to, co ktoś zapisał na przeglądzie designu. Może wcale nie potrzebują osobnych prywatnych projektów, tylko możliwości pracy z kilkoma innymi zespołami przy zachowaniu poufności części zadań. Może wystarczy im własny workspace, jeśli narzędzie już to oferuje, i wcale nie trzeba budować nowej funkcji od zera.

Powrót do tematu nie oznacza jednak automatycznej zgody na budowanie czegokolwiek. Zespół może dalej stwierdzić, że nie robi prywatnych projektów, tylko teraz robi to świadomie, po sprawdzeniu faktów, a nie z powodu braku czasu na rozmowę. Jeśli finanse odpowiedzą, że nie pracują z nikim innym w firmie, a narzędzie już ma osobne workspace'y, temat może się zamknąć bez pisania jednej linijki kodu. Jeśli odpowiedzą, że jednak współpracują z innymi zespołami, to wiadomo już, dlaczego osobny workspace by nie zadziałał, i do kolejnego planowania trafia konkretna potrzeba, a nie ogólne „przydałyby się prywatne projekty”.

Ostatnia część tekstu dotyczy tego, co zrobić z decyzją, gdy już zapadnie. Nawet jeśli funkcja zostaje poza planem na dłużej, bo firma świadomie skupia się teraz na małych zespołach, warto zapisać powód razem z żądaniem. Wtedy, gdy temat wróci przy okazji rozmów o obsłudze większych klientów, zespół wie, dlaczego wcześniej powiedział „nie”, zamiast siedzieć na kolejnym spotkaniu i zgadywać, czy zabrakło miejsca w wydaniu, czy był jakiś inny powód.

**Key takeaways:**
- „Nie w tym wydaniu” zamyka temat na liście prac, ale nie rozwiązuje problemu, który skłonił kogoś do zgłoszenia prośby
- Warto oddzielić samo zauważenie problemu od decyzji, żeby ktoś działał od razu, i zapisać obserwację w miejscu dostępnym dla zespołu
- Do backlogowego zgłoszenia trzeba dopisać, kto sprawdzi sprawę u właściwych osób i kiedy wróci z odpowiedzią
- Rozmowa z osobami, które zgłosiły potrzebę, często pokazuje, że potrzebują czegoś innego niż to, co zapisano na przeglądzie
- Powrót do tematu nie oznacza zgody na budowanie funkcji, tylko sprawdzenie faktów przed kolejną decyzją
- Powód odrzucenia warto zapisać razem z żądaniem, żeby nie tłumaczyć się z tej samej decyzji za kilka miesięcy

**Why do I care:** To głównie temat produktowy, ale każdy frontendowiec i architekt zna ten sam backlog, w którym leżą dziesiątki zgłoszeń bez kontekstu, bo ktoś kiedyś zapisał samą nazwę funkcji i datę, a powód zniknął razem z notatkami ze spotkania. Kiedy wracamy do takiego tematu po kwartale, cała rozmowa zaczyna się od zera, łącznie z ustalaniem, czy w ogóle chodziło o to samo. Dopisanie do zgłoszenia, kto ma sprawdzić sprawę i jaki był powód decyzji, to tani nawyk, który oszczędza godziny spotkań, a przy okazji chroni przed budowaniem funkcji, których nikt już nie potrzebuje, bo problem sam się rozwiązał gdzie indziej.

**Link:** [What happens after "not in this release"?](https://unicornclub.dev/issues/2026-09-23-what-happens-after-not-in-this-release/)
