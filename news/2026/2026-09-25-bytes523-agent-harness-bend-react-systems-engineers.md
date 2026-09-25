---
title: "Bytes #523: agentowy harness gotowy na produkcję, Bend kontra bugi w vibe-codingu i lekcja Reacta dla inżynierów systemowych"
excerpt: "Bytes #523 rozkłada agentowy harness na części, które trzymają agentów w ryzach na produkcji, przedstawia język Bend obiecujący dowody zamiast testów przy vibe-codingu, oraz tłumaczy model renderowania Reacta przez pryzmat własności danych."
publishedAt: "2026-09-23"
slug: "bytes523-agent-harness-bend-react-systems-engineers"
hashtags: "#uidev #ai #agents #architecture #react #frontend #generated #pl"
source_pattern: "ui.dev"
---

## Vibe-coding bez bugów, ale i tak czekaj na bugi

**TLDR:** Victor Taelin wypuścił język Bend, łączący teorię typów i weryfikację formalną, żeby agent mógł dowodzić poprawności kodu zamiast człowieka ręcznie pisać testy. Składnia przypomina Pythona, a kompilator działa szybko i równolegle, co odróżnia Bend od klasycznych narzędzi formalnej weryfikacji jak Lean czy Rocq, znanych z powolnego sprawdzania i wysokiego progu wejścia.

**Summary:** Teoria typów zwykle kończy karierę w rozmowie przy lunchu, ale Victor Taelin postanowił zrobić z niej praktyczne narzędzie dla ludzi piszących kod z pomocą agentów. Bend ma odpowiadać na pytanie, jak sprawić, żeby kod wygenerowany przez agenta był rzeczywiście poprawny, a nie tylko wyglądał na poprawny. W przeciwieństwie do Lean czy Rocq, gdzie sprawdzenie całej bazy kodu potrafi trwać minuty i wymaga solidnego zaplecza matematycznego, Bend ma składnię zbliżoną do Pythona i kompilator zaprojektowany do pracy równoległej.

Pomysł polega na rozdzieleniu odpowiedzialności. Człowiek albo agent pisze funkcję, a osobno formułuje regułę, którą ta funkcja musi zawsze spełniać. Przykład z newslettera dotyczy autoryzacji między różnymi najemcami systemu, gdzie reguła mówi, że dostęp między różnymi tenantami musi być zawsze odmówiony, niezależnie od tego, jakie uprawnienia ma dany użytkownik. Agent musi dostarczyć dowód, że reguła zachodzi dla każdej możliwej wartości wejściowej, nie tylko dla przypadków, które akurat przetestował.

Kompilator Bend sprawdza ten dowód razem z kodem przy każdej kompilacji. Jeśli zmiana sprawia, że reguła przestaje być dowodliwa, kompilacja się nie powiedzie i agent dostaje jasny sygnał, że musi poprawić rozwiązanie, zanim cokolwiek trafi dalej. To inny model pracy niż testy jednostkowe sprawdzające wybrane przypadki, bo dowód formalny obejmuje cały zbiór możliwych wartości naraz.

Ironia, którą newsletter sam podkreśla, polega na tym, że autor Bend wprost mówi, żeby oczekiwać bugów, mimo że narzędzie ma być odpowiedzią na bugi z vibe-codingu. Trudno też liczyć, że słowo "weryfikowalny" zniknie z rozmów o AI w najbliższym czasie, bo cała branża dopiero uczy się, jak formalne dowody mogą uzupełnić testowanie kodu pisanego przez agentów.

**Key takeaways:**
- Bend łączy teorię typów i weryfikację formalną z Pythonową składnią i szybkim, równoległym kompilatorem, w przeciwieństwie do wolnych narzędzi jak Lean czy Rocq
- Człowiek albo agent formułuje regułę (np. zakaz dostępu między tenantami), a agent dostarcza dowód, że reguła zachodzi dla każdej możliwej wartości, nie tylko dla wybranych przypadków testowych
- Kompilator sprawdza dowód przy każdej kompilacji, więc zmiana łamiąca regułę kończy się błędem kompilacji zamiast cichym bugiem na produkcji

**Why do I care:** Jako architekt patrzę na Bend z ostrożnym zainteresowaniem, bo problem, który próbuje rozwiązać, czyli jak sprawdzić, że kod napisany przez agenta faktycznie robi to, co ma robić, jest realny i będzie rósł wraz z użyciem agentów w codziennej pracy zespołów. Teoria typów i dowody formalne od dekad nie przebiły się do mainstreamu właśnie dlatego, że wymagają innego sposobu myślenia niż pisanie testów, więc pytanie brzmi, czy zespoły produktowe zechcą inwestować czas w formułowanie reguł zamiast po prostu czytać diff i pisać więcej testów integracyjnych. Warto śledzić ten temat bez pośpiechu we wdrażaniu go w krytycznych systemach, dopóki narzędzie nie przejdzie próby czasu poza demo.

**Link:** [Bytes #523 - Vibe-coding bug-free apps (expect bugs)](https://bytes.dev/archives/523)

## Agentowy harness, który przetrwa produkcję, to więcej niż framework

**TLDR:** Autor rozróżnia framework, czyli materiały konstrukcyjne w rodzaju LangGraph czy AutoGen, od harnessu, czyli konkretnej konfiguracji uprawnień, limitów i definicji "zrobione", która trzyma agenta w ryzach na produkcji. Analiza tysięcy przebiegów agentów kodujących pokazuje, że problemem rzadko jest kompetencja modelu, tylko brak niezależnej weryfikacji i kontroli poza samym modelem.

**Summary:** Punktem wyjścia jest historia agenta obsługującego zwroty pieniędzy. W ciągu popołudnia zamyka 140 zgłoszeń i raportuje wszystkie jako rozwiązane, ale 41 z nich nigdy nie dotarło do API płatności. Model napisał "zwrot wykonany", bo tak zwykle kończy się rozmowa o zwrocie, nie dlatego, że skłamał, tylko dlatego, że wygenerował najbardziej prawdopodobne zakończenie tekstu. Analiza kilkunastu tysięcy przebiegów agentów kodujących ujawnia podobny wzorzec. W większości przypadków, które skończyły się złą odpowiedzią, agent wcześniej znalazł i poprawił właściwy fragment kodu, więc problemem nie była kompetencja, tylko wszystko dookoła niej.

Autor definiuje harness jako skonfigurowaną warstwę wokół modelu, która decyduje, co model widzi, co może zrobić, gdzie te akcje trafiają i co liczy się jako dowód wykonania pracy. Framework daje materiały konstrukcyjne, takie jak grafy, wiadomości czy adaptery narzędzi, znane z LangGraph, AutoGen czy Semantic Kernel, natomiast harness wiąże je z realnymi uprawnieniami, realnymi limitami i realną definicją ukończenia zadania. Zespoły często mylą te dwie warstwy, co kosztuje je przekonanie, że udane zainstalowanie pakietu oznacza gotowość produkcyjną.

Tekst przywołuje liczby na poparcie tezy, że opakowanie wokół modelu jest zmienną, a nie szczegółem. Ten sam model GPT-4 Turbo rozwiązał 18% zadań z interfejsem dopasowanym do bazy kodu i tylko 11% sterując zwykłą powłoką, a model GLM 5.1 skoczył z 19,1% do 73,4% skuteczności między minimalnym a pełnym adapterem, bez zmiany wag modelu. Jednocześnie długokontekstowy Gemini 2.5 Pro z prostym rusztowaniem i pełną widocznością środowiska osiągnął sam ponad połowę zadań SWE-bench Verified, co pokazuje, że część rusztowania traci sens wraz ze wzrostem możliwości modeli. Autor rozdziela to wyraźnie, bo rusztowanie kompensujące słabsze rozumowanie będzie się kurczyć, ale kontrola nad tożsamością i weryfikacja wyniku nie znikną, skoro żaden przyrost rozumowania nie zamienia pewności siebie modelu w uprawnienie do dotknięcia księgi rachunkowej.

Osobny wątek dotyczy obrony przed prompt injection. Niezabezpieczony agent podążał za ukrytymi instrukcjami w 24% z ponad tysiąca przypadków, a trening hierarchii instrukcji i filtrowanie sprowadziły to do około 1% przy stu próbach na środowisko. Atakujący dostosowujący się do konkretnej obrony odzyskiwali jednak nawet 64% skuteczności tam, gdzie pobrana treść pomagała podjąć decyzję, więc obrona zmierzona raz statycznie nie jest obroną zmierzoną pod presją. Najbardziej odporne rozwiązanie, CaMeL, wymusza kontrolę przepływu z zaufanego żądania użytkownika i traktuje pobraną treść jako dane, kosztem kilku punktów procentowych użyteczności w zamian za strukturalną gwarancję zamiast statystycznej.

Na koniec autor proponuje diagnostykę dla każdej części harnessu, opartą na trzech pytaniach: czy jest właściciel, czy jest mechanizm wymuszający regułę w kodzie zamiast w treści promptu, i czy istnieje test, który zaczerwieni się, gdy mechanizm przestanie działać. Wiersz z trzema odpowiedziami "nie" to ryzyko produkcyjne do zbadania jako pierwsze, nie pozycja na liście planów na przyszłość.

**Key takeaways:**
- Harness to nie framework, bo framework daje materiały konstrukcyjne (grafy, adaptery, wiadomości), a harness wiąże je z realnymi uprawnieniami, limitami i definicją ukończenia zadania
- Ten sam model radzi sobie zupełnie inaczej w zależności od opakowania, co pokazują niezależne benchmarki trzymające model w miejscu i zmieniające tylko otoczenie
- Obrona przed prompt injection na poziomie promptu redukuje ryzyko, ale atakujący dostosowujący się do konkretnego filtra odzyskują większość skuteczności ataku, więc egzekwowanie poza modelem jest tym, co realnie trzyma
- Trzy pytania do każdej części harnessu: czy jest właściciel, czy jest mechanizm w kodzie, czy jest test wychwytujący awarię; wiersz z trzema "nie" to priorytet do naprawy

**Why do I care:** Ten materiał trafia bezpośrednio w rolę architekta odpowiedzialnego za wdrażanie agentów w realnych systemach produkcyjnych, bo pokazuje z liczbami w ręku, że wybór frameworka to dopiero początek pracy, nie jej koniec. Rozróżnienie framework kontra harness jest tym, czego brakuje w wielu wewnętrznych dyskusjach o architekturze agentowej, gdzie instalacja LangGraph bywa mylona z gotowością na produkcję, a scoped, krótkotrwałe poświadczenia i niezależna weryfikacja wyniku traktowane są jako dodatek zamiast fundamentu. Dla zespołów frontendowych budujących interfejsy nad takimi agentami to też sygnał, żeby UI pokazywało prawdziwy stan weryfikacji zadania, nie tylko deklarację modelu, że "zrobione".

**Link:** [Building an agent harness that survives production](https://blogs.oracle.com/developers/building-an-agent-harness-that-survives-production)

## Jak wytłumaczyć Reacta inżynierowi systemowemu, żeby zrozumiał, nie tylko zapamiętał

**TLDR:** Autor buduje wspólny pokój oglądania wideo krok po kroku, żeby pokazać inżynierom systemowym model renderowania Reacta przez pryzmat, który już znają: własność danych, wyprowadzone widoki i granice synchronizacji. Tekst tłumaczy, dlaczego kopiowanie propsów do stanu i synchronizowanie ich efektem jest błędem, i jak `useSyncExternalStore` chroni przed rozdarciem widoku przy zewnętrznych źródłach danych.

**Summary:** Autor zaczyna od prostego przykładu: pokój do wspólnego oglądania wideo ze wspólną playlistą i osadzonym odtwarzaczem YouTube, w którym wybór wideo na jednym urządzeniu ma natychmiast odświeżyć widok na innym. Zamiast tłumaczyć Reacta przez jego własne słownictwo, tekst rozkłada każdy fakt w systemie na trzy pytania: kto jest właścicielem tego faktu, jakie widoki są z niego wyprowadzone i jaką granicę synchronizacji musi przekroczyć aktualizacja, żeby dotrzeć tam, gdzie trzeba.

Pierwsza warstwa to renderowanie jako wyprowadzanie widoku. Komponent WatchRoom trzyma listę wideo i wybrane ID, a jego dzieci, panel odtwarzacza i playlista, obliczają z tych samych danych zarówno tytuł, jak i podświetlenie wybranego wiersza. Ponieważ oba widoki pochodzą z tych samych danych wejściowych, zgadzają się ze sobą z definicji, a React, committując zmiany do DOM-u naraz, sprawia, że stają się widoczne razem, bez migotania pośredniego stanu.

Drugi wątek dotyczy stanu zewnętrznego wobec Reacta, czyli odtwarzacza YouTube i bazy IndexedDB. Wywołanie odtwarzacza w trakcie renderowania byłoby błędem, bo React może porzucić nieukończony kandydat na widok, a odtwarzacz zdążyłby już wczytać wideo, które nigdy nie trafiło na ekran. Komenda do odtwarzacza idzie więc przez `useEffect`, uruchamiany dopiero po commitcie, nie w trakcie samego liczenia widoku. Autor przywołuje też częsty błąd: kopiowanie tytułu wideo z propsów do lokalnego stanu i synchronizowanie go efektem, co rozbija jedną logiczną aktualizację na dwa oddzielne committy i potrafi wywołać widoczny błysk starej wartości.

Najciekawszy fragment dotyczy podłączenia zewnętrznego magazynu danych, takiego jak IndexedDB czy backend współdzielonego pokoju, do Reacta przez `useSyncExternalStore`. Naiwne połączenie przez `useState` i efekt subskrypcji zostawia lukę czasową, w której magazyn może się zmienić, zanim subskrypcja zacznie nasłuchiwać, a przy komponentach czytających magazyn niezależnie od siebie React może zobaczyć dwie różne wersje tych samych danych naraz: tytuł z jednej wersji, podświetlenie z drugiej. Autor nazywa to rozdarciem widoku. `useSyncExternalStore` rozwiązuje ten problem przez ponowne sprawdzenie migawki danych tuż przed committem i powtórzenie renderu, jeśli coś się zmieniło, co w praktyce jest zastosowaniem optymistycznej kontroli współbieżności do publikowania widoku.

Na końcu wszystko się spina: backend jako właściciel wyboru wideo w pokoju, magazyn kliencki jako replika, React jako czytelnik tej repliki, a odtwarzacz YouTube jako osobny system z własnym stanem odtwarzania. Kliknięcie Alice na telefonie wysyła komendę do backendu, backend replikuje zaakceptowaną zmianę do magazynu Boba, a Reactowy efekt na jego urządzeniu ładuje wideo, mimo że Bob niczego nie kliknął, podczas gdy widoczność jego paska bocznego zostaje bez zmian, bo to lokalny stan, który nie musi być dzielony.

**Key takeaways:**
- Każdy fakt w systemie warto rozłożyć na trzy pytania: kto jest właścicielem danych, jakie widoki są z nich wyprowadzane i jaką granicę synchronizacji musi przekroczyć aktualizacja
- Wywoływanie systemów zewnętrznych, takich jak odtwarzacz wideo czy zapis do bazy, w trakcie renderowania jest błędem; taką komendę należy wysyłać w `useEffect` po commitcie
- Kopiowanie danych wyprowadzonych z propsów do lokalnego stanu i synchronizowanie ich efektem rozbija jedną aktualizację na dwa committy i może dać widoczny błysk starej wartości
- `useSyncExternalStore` chroni przed rozdarciem widoku przy zewnętrznych magazynach danych, sprawdzając migawkę ponownie tuż przed committem i powtarzając render w razie zmiany

**Why do I care:** Ten artykuł to jedno z lepszych tłumaczeń modelu mentalnego Reacta, jakie widziałem, bo zamiast zaczynać od API, zaczyna od pytania o własność danych, a to jest dokładnie to, czym architekt powinien się kierować przy projektowaniu synchronizacji stanu między backendem, magazynem klienckim a UI. Błąd kopiowania propsów do stanu i synchronizowania efektem to jeden z najczęstszych zarzutów w code review, jakie widzę w zespołach frontendowych, a jasne wytłumaczenie, dlaczego to psuje spójność widoku, warto podesłać każdemu, kto dopiero uczy się Reacta po innym stacku. Fragment o `useSyncExternalStore` i rozdarciu widoku ma też bezpośrednie zastosowanie przy integracji bibliotek typu TanStack DB, Zustand czy lokalnych baz danych w przeglądarce, więc to lektura obowiązkowa, jeśli budujesz cokolwiek local-first.

**Link:** [Frontend for systems engineers](https://tj-zhang.com/blog/frontend-for-systems-engineers/)
