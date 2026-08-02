---
title: "Klocki Lego i sztuka kasowania własnego kodu"
excerpt: "Historia o budowaniu, rozbieraniu i o tym, dlaczego skasowanie własnego projektu bywa ważniejszą decyzją niż jego napisanie."
publishedAt: 2026-07-31
slug: klocki-lego-sztuka-kasowania-kodu
hashtags: "#pawel-jozefiak #ai #ai-agents #refaktoryzacja #architektura #produktywnosc #generated #pl"
source_pattern: "PawelJozefiak"
---

## Klocki Lego i sztuka kasowania własnego kodu

**TLDR:** Autor opisuje jak dziecięce budowanie i rozbieranie zestawów Lego stało się wzorcem jego podejścia do kodu. Woli budować własne narzędzia od zera, uczyć się na błędach po drodze, a potem bez żalu je kasować, gdy przestają być potrzebne. Przez dwa miesiące pisał własny system kanban dla swojego agenta AI, żeby chwilę później zastąpić go gotową aplikacją i shimem liczącym 94 linijki.

**Summary:** Jako dziecko autor zawsze kończył zestaw Lego zgodnie z instrukcją, a potem w ciągu dnia go rozbierał. Nie chodziło o zamek czy statek kosmiczny z pudełka, tylko o klocki, które w nim zostawały. Budowanie według instrukcji było tylko sposobem na poznanie, które elementy pasują do siebie, gdzie są zawiasy i co się złamie pod obciążeniem. Sam gotowy model przestawał być ciekawy w momencie ukończenia. Ten sam mechanizm przeniósł się później na kod i projekty poboczne, tylko że przez wiele lat działał w drugą stronę, bo autor przez długi czas trzymał się zasady, że budowanie jest dobre, a niszczenie złe. W praktyce oznaczało to gromadzenie skończonych, nieużywanych rzeczy, którym żal było wyłączyć wtyczkę, bo przecież włożono w nie godziny pracy.

W pewnym momencie ta zasada się odwróciła. Niszczenie okazało się drugą połową procesu twórczego, nie jego zaprzeczeniem. Czasem coś, co się zbudowało, jest po prostu złe i trzeba to wyrzucić. Czasem jest zupełnie w porządku, a mimo to trzeba je usunąć, bo miejsce, które zajmuje, jest warte więcej niż ono samo. Ten sam mechanizm autor zastosował do własnych plików instrukcji dla agenta AI. Kiedy usiadł i przeczytał je linijka po linijce, znalazł 85 rzeczy do wywalenia, mimo że prawie nic w systemie nie było zepsute. System po prostu działał lepiej z mniejszą ilością balastu.

Przykłady z życia są konkretne. W grudniu 2024 powstała publiczna aplikacja czatowa na Rails 8 z WebSocketami, bez logowania i kont, celowo nawiązująca do pokojów czatowych z lat dziewięćdziesiątych. Mimo pomocy AI trzeba było naprawdę zrozumieć sesje, kanały, broadcasting i to, co oznacza czas rzeczywisty, gdy dwie przeglądarki nie zgadzają się co do stanu świata. Aplikacja działała publicznie kilka miesięcy, a potem została wyłączona, nie dlatego, że coś się zepsuło, tylko dlatego, że nauka, po którą autor sięgnął, już się dokonała. Drugi przykład jest bardziej bolesny. Na przełomie stycznia i lutego 2026 powstał własny system kanban dla agenta: backend na FastAPI, SQLite, aplikacja webowa, natywna aplikacja macOS z ikoną w pasku menu, natywna aplikacja iOS z widżetami i powiadomieniami push, plus klient w Pythonie liczący 3700 linii spinający to wszystko razem. Pięćdziesiąt cztery commity, dwa miesiące wieczorów pracy. W kwietniu cały ten stos zastąpiono gotową tablicą i shimem na 94 linijki. W maju zastąpiono zamiennik. W lipcu zastąpiono kolejny. Dziś ta sama funkcja działa na TicTicu, aplikacji, której autor nie napisał, plus mały lokalny plik rejestru.

Niewygodna wersja tej historii brzmi tak, że dwa miesiące życia poszły na napisanie listy zadań. Użyteczna wersja jest taka, że dzięki temu autor wie dokładnie, czego oczekuje od takiego narzędzia, i właśnie dlatego 94 linijki wystarczają, a to, jaka tablica siedzi pod spodem, przestało go obchodzić. Ta sama logika tłumaczy, dlaczego autor nie buduje w oderwaniu od świata. Czyta, jak działają gotowe frameworki agentowe typu OpenClaw czy Hermes od Nous Research, sprawdza, jak radzą sobie z pamięcią, harmonogramowaniem, dostępem do narzędzi. Nie kopiuje jednak ich architektury, tylko traktuje ją jak instrukcję z pudełka Lego: ogląda, jak ktoś inny rozwiązał problem, a potem odkłada instrukcję i buduje własną wersję z luźnych klocków. Wolniej, mniej efektywnie w danym miesiącu, ale za to z pełnym zrozumieniem własnego systemu, co pozwala go debugować o drugiej w nocy, bo każdą złą decyzję podjął w nim osobiście.

**Key takeaways:**
- Budowanie po raz pierwszy uczy najwięcej, bo zmusza do zmierzenia się z przypadkami brzegowymi, których nie da się poznać z dokumentacji.
- Kasowanie skończonego projektu nie oznacza porażki, tylko sygnał, że wiedza już przeszła z repozytorium do głowy autora.
- Regularny przegląd plików konfiguracyjnych agenta (system prompt, instrukcje, reguły) potrafi ujawnić dziesiątki zbędnych zapisów, które nic nie psują, ale zaśmiecają system.
- Zamiana własnego, rozbudowanego narzędzia na gotowe rozwiązanie plus cienki shim bywa lepszą decyzją architektoniczną niż utrzymywanie własnego stosu.
- Studiowanie cudzych architektur (np. frameworków agentowych) ma sens jako źródło inspiracji, niekoniecznie jako gotowy szablon do skopiowania.

**Why do I care:** Ten tekst trafia w coś, co u wielu zespołów frontendowych i architektonicznych widzę regularnie: strach przed skasowaniem czegokolwiek, co „już działa”, nawet jeśli od miesięcy nikt tego nie używa. Mam podobne doświadczenie z własnymi narzędziami wewnętrznymi i z plikami instrukcji dla agentów AI, które puchną w nieskończoność, bo łatwiej dopisać kolejną regułę niż usunąć starą. Wartościowa jest tu perspektywa, że nauka z pierwszego podejścia do problemu zostaje w głowie, a kod na dysku to tylko paragon, więc trzymanie się go z sentymentu nie ma sensu technicznego, tylko emocjonalny. Jednocześnie zgadzam się z tym, że warto czytać architektury gotowych frameworków (agentowych czy jakichkolwiek innych) zamiast ich ślepo importować, bo to właśnie ten proces rozbierania cudzego rozwiązania na czynniki pierwsze uczy projektować lepiej własne systemy, a nie tylko składać klocki z cudzej instrukcji.

**Link:** [I Destroy Almost Everything I Build. Lego Taught Me How.](https://thoughts.jock.pl/p/building-and-destroying-lego-lesson-2026?publication_id=1540552&post_id=208592495&isFreemail=true&triedRedirect=true)
