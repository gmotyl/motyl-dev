---
title: "Syndrom Duke Nukem Forever, pułapki multi-tenancy i to, na czym naprawdę warto się skupić jako inżynier"
excerpt: "Dlaczego rozpychanie zakresu projektu zabija wydania, jak niewinne wzorce multi-tenant potrafią przenieść błąd z requestu do kolejki w tle, i co faktycznie zmienia się dziś w zawodzie programisty."
publishedAt: "2026-10-05"
slug: "dailydev-duke-nukem-forever-multi-tenancy-kariera-2026"
hashtags: "#dailydev #architecture #open-source #multi-tenancy #database #career #ai #engineering #generated #pl"
source_pattern: "daily.dev"
---

## Jak nie zamienić projektu w swojego Duke Nukem Forever

**TLDR:** Twórca bibliotek open-source Emmett i Pongo przyznaje się do klasycznego błędu: zamiast szybko wypuszczać kolejne wersje, przez półtora roku dokładał nowe funkcje (OpenTelemetry, obsługę SQLite i Cloudflare D1, własny connection pooling, workflow), odkładając stabilne wydanie w nieskończoność. Wnioski? Unikać "wielkich premier" i trzymać się ciasnej pętli zwrotnej.

**Summary:** Autor wprost porównuje swoją sytuację do historii Duke Nukem Forever, gry, która powstawała czternaście lat, bo zespół gonił za każdą nową modą technologiczną zamiast skończyć to, co już działało. On sam miał plan na stabilne wydanie, ale po drodze uznał, że warto dorzucić jeszcze observability, jeszcze jeden silnik bazodanowy, jeszcze własny pooling połączeń. Każda z tych rzeczy osobno wyglądała na rozsądny krok. Razem złożyły się na projekt, który nigdy nie czuł się gotowy, bo lista "jeszcze tylko to" nie miała końca.

Ciekawe jest to, że autor nie obwinia braku dyscypliny, tylko mechanizm psychologiczny: łatwiej dopisać kolejną funkcję niż przyznać, że bieżąca wersja już wystarczy. Beta za betą piętrzyły się, a użytkownicy czekali na coś, co teoretycznie było blisko ukończenia od półtora roku. Dochodzi do tego ostrzeżenie, które brzmi szczególnie trafnie w 2026 roku: narzędzia generatywne tylko ułatwiają wpadnięcie w tę pułapkę, bo dopisanie kolejnej funkcji kosztuje teraz jeszcze mniej wysiłku niż wcześniej, więc pokusa, by nigdy nie powiedzieć "koniec zakresu", rośnie.

Rozwiązaniem, które proponuje, jest powrót do małych, regularnych wydań alfa i beta zamiast czekania na mityczny "wielki bang". Zamiast planować całościową premierę, lepiej wypuszczać to, co działa, zbierać informację zwrotną i dopiero na jej podstawie decydować, co dorzucić. To nie jest odkrywcza rada, ale warto ją sobie przypominać akurat teraz, gdy AI sprawia, że dopisanie kolejnej warstwy abstrakcji jest kusząco tanie.

**Key takeaways:**
- Scope creep rzadko wygląda jak jedna zła decyzja, tylko jak seria pojedynczo uzasadnionych dopisków.
- Narzędzia AI obniżają koszt dodawania funkcji, więc zwiększają też ryzyko nieskończonego rozszerzania zakresu.
- Małe, częste wydania biją na głowę czekanie na "idealną" premierę.

**Why do I care:** Jako architekt widziałem tę pułapkę więcej razy w komercyjnych projektach niż w open source, bo presja "jeszcze jedna integracja przed startem" działa dokładnie tak samo na roadmapie produktu frontendowego. Różnica jest taka, że w pracy komercyjnej nikt nie czeka półtora roku, tylko po prostu ucina projekt w połowie, zostawiając dług technologiczny. Jeśli zespół łapie się na ciągłym przesuwaniu daty "bo dorzucamy jeszcze jedną rzecz", to jest dokładnie ten sygnał, żeby zamrozić zakres i wypuścić to, co jest.

**Link:** [Avoid Duke Nukem Forever Mode](https://daily.dev/posts/xhYVbXjmt)

## Dobre praktyki multi-tenant też mają swoją cenę

**TLDR:** Tenant context, globalne filtry zapytań, baza na dzielone zasoby per klient, feature flagi, żadne z tych rozwiązań nie usuwa złożoności wielodostępności, tylko ją przenosi gdzie indziej. Artykuł pokazuje realny bug, w którym niejawny kontekst tenanta zbudowany dla requestów HTTP zupełnie się rozjechał w procesie przetwarzającym wiadomości w tle.

**Summary:** Punktem wyjścia jest konkretny incydent: request tenanta A w jakiś sposób wykonał się w kontekście tenanta B. Winny okazał się niejawny tenant context, czyli mechanizm, który w warstwie HTTP działał bez zarzutu, ale przy przeniesieniu do asynchronicznego przetwarzania wiadomości z kolejki przestał być rekonstruowany poprawnie. Nic nie rzucało wyjątkiem, nic nie logowało błędu, dane po prostu trafiły nie tam, gdzie powinny, bo tożsamość tenanta była ukryta zamiast jawnie przekazywana.

Autor rozkłada to na czynniki pierwsze i pokazuje, że każdy popularny wzorzec multi-tenant ma swoją cenę. Jawna tożsamość tenanta jest bezpieczniejsza, ale wymaga przekazywania jej przez każdą warstwę systemu, co bywa upierdliwe. Wspólna baza danych z globalnymi filtrami zapytań daje wygodną izolację, ale każda operacja międzytenantowa, na przykład raportowanie, wymaga świadomego obejścia tego filtra, co samo w sobie jest ryzykownym wyjątkiem w regule. Baza per tenant eliminuje ryzyko przecieku danych, ale zamienia proste zapytanie agregujące w osobny problem inżynierski dla każdego klienta z osobna.

Najciekawszy wniosek jest taki, że nie ma jednego poprawnego wzorca multi-tenancy, jest tylko pytanie, jaką konkretnie złożoność jesteś gotów kupić. Zespoły, które traktują wybrany wzorzec jako rozwiązany problem, zamiast jako świadomy kompromis, prędzej czy później trafiają na własną wersję tego buga z requestem, który wykonał się dla cudzego klienta.

**Key takeaways:**
- Niejawny kontekst tenanta zbudowany pod HTTP nie przenosi się automatycznie do przetwarzania w tle.
- Globalne filtry zapytań wymagają świadomych wyjątków dla operacji międzytenantowych, co jest ryzykowne samo w sobie.
- Baza per tenant usuwa ryzyko przecieku, ale kosztuje w postaci osobnej agregacji dla każdego klienta.

**Why do I care:** To jest dokładnie ten rodzaj błędu, który wychodzi na jaw dopiero przy code review albo, gorzej, na produkcji po kilku miesiącach działania systemu. Przy projektowaniu architektury B2B SaaS warto od razu zadać pytanie "co się stanie, kiedy ten kontekst tenanta opuści warstwę HTTP", bo w praktyce prędzej czy później pojawi się kolejka, worker albo cron, który złamie niejawne założenia zrobione na starcie projektu.

**Link:** [Multi-Tenant Best Practices Can Backfire](https://daily.dev/posts/fjWaU1JBA)

## Inżynieria oprogramowania się zmienia, więc na czym się skupić

**TLDR:** Krótki materiał wideo twierdzi, że projektowanie systemów, oczekiwania dotyczące ownershipu, adopcja narzędzi AI i budowanie widocznego dorobku zawodowego to cztery siły, które realnie przebudowują zawód programisty. Inżynierowie, którzy już się do nich dostosowali, mieli zyskać lepsze stanowiska i wyższe wynagrodzenia.

**Summary:** Teza jest prosta: to nie jest kolejny cykl hype'u, tylko trwała zmiana tego, co pracodawcy cenią u programisty. Umiejętność projektowania systemów przestaje być domeną wyłącznie seniorów i architektów, bo coraz więcej codziennej pracy polega na decyzjach architektonicznych, a nie tylko implementacji gotowego ticketu. Oczekiwania dotyczące ownershipu rosną razem z tym, jak bardzo narzędzia AI przyspieszają samo pisanie kodu, więc wartość zaczyna się przesuwać w stronę osób, które biorą odpowiedzialność za cały cykl życia funkcji, a nie tylko za commit.

Adopcja narzędzi AI jest tu potraktowana nie jako opcja, tylko jako coś, czego brak zaczyna być widoczny w rozmowach rekrutacyjnych i w codziennej produktywności zespołu. Ostatni punkt, budowanie dowodu kompetencji, czyli widocznego portfolio pracy, kontrybucji albo projektów pobocznych, ma znaczenie właśnie dlatego, że rynek pracy robi się bardziej konkurencyjny i samo CV przestaje wystarczać.

**Key takeaways:**
- System design przestaje być kompetencją zarezerwowaną dla seniorów.
- Ownership całego cyklu życia funkcji zyskuje na wartości szybciej niż samo tempo pisania kodu.
- Widoczny dorobek zawodowy, poza etatem, staje się realnym wyróżnikiem na rynku pracy.

**Why do I care:** Z perspektywy kogoś, kto ocenia kandydatów i planuje ścieżki rozwoju w zespole, zgadzam się z tym kierunkiem bardziej niż z większością podobnych tez z LinkedIna, bo faktycznie widzę, że granica między "programistą" a "osobą odpowiedzialną za architekturę" się zaciera szybciej niż jeszcze dwa lata temu. To sygnał dla juniorów i mid-level, żeby inwestować czas nie tylko w kolejny framework, ale w rozumienie, dlaczego system jest zbudowany tak, a nie inaczej.

**Link:** [Software Engineering Is Changing Here's What to Focus On](https://daily.dev/posts/LRAsrZJeR)
