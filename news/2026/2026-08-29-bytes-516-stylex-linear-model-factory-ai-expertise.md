---
title: "Bytes #516: StyleX wraca do gry, fabryka modeli Poolside i granice ekspertyzy w erze AI"
excerpt: "Linear migruje tysiąc plików ze styled-components na StyleX, Poolside pokazuje kuchnię trenowania modeli, a jeden z blogerów przekonuje, że AI coding zabija ekspertyzę zanim ta zdąży powstać."
publishedAt: "2026-08-29"
slug: "bytes-516-stylex-linear-model-factory-ai-expertise"
hashtags: "#uidev #frontend #css-in-js #stylex #react #ai #architecture #performance #pnpm #generated #pl"
source_pattern: "ui.dev"
---

## Jak Linear migrowało tysiąc plików ze styled-components na StyleX

**TLDR:** Linear opisało ponad rok migracji swojej aplikacji React ze styled-components na StyleX, motywowanej wydajnością i chęcią narzucenia twardych granic stylowania w kodzie coraz częściej pisanym przez agentów.

**Summary:** Ponad tysiąc pull requestów później Linear ma za sobą migrację, która zaczęła się od frustracji, a skończyła na płycie CSS-in-JS generowanej w buildzie zamiast w runtime. Styled-components służyło im dobrze przez lata, ale otwartość tego API zaczęła szkodzić w miarę wzrostu zespołu. Wzorce w stylu `styled(Button)` normalizowały nadpisywanie stylów komponentu z zewnątrz, co po redesignie Linear odbiło się długim ogonem regresji wizualnych. Drugim powodem była wydajność: generowanie i wstrzykiwanie CSS w renderze zaczęło boleć mocniej po przejściu na React 18 z concurrent renderingiem, a styled-components wtedy już wchodziło w tryb utrzymaniowy.

Wybrali StyleX od Meta, bo dawał deterministyczne łączenie stylów, typowane kontrakty stylowania i celowo utrudniał "stylowanie na odległość". Zamiast rzucić migrację w całości na agenty, zbudowali deterministyczny codemod jako fundament, a agentów używali z wąskim zakresem zadań i checklistami. Zaczynali od liści drzewa komponentów, żeby nie dotykać wspólnych prymitywów zbyt wcześnie. Do tego dodali licznik śledzący liczbę komponentów na styled-components w każdej sesji deweloperskiej, żeby postęp był widoczny gołym okiem, oraz bota oznaczającego nowe użycia starej biblioteki w PR-ach.

Wynik: mniej pracy głównego wątku o 20 do 35 procent na stronach mocno zależnych od widoków, około 30 procent szybciej na średniej klasy maszynie. Ale bardziej wartościowa zmiana jest strukturalna: komponenty mają teraz jawne kontrakty stylowania zamiast konwencji trzymanej na słowo.

**Key takeaways:**
- Deterministyczny codemod jako fundament migracji, agenty tylko w wąsko zdefiniowanym zakresie
- StyleX wygrał z vanilla-extract dzięki kolokacji stylów przy komponencie i mniejszemu rozdrobnieniu API
- Custom lintery (Oxlint) i type-aware checker pilnują, żeby stare wzorce nie wróciły
- Migracja od liści drzewa komponentów w górę zmniejszała ryzyko i uczyła na mniej krytycznych fragmentach

**Why do I care:** To jest dokładnie ten typ case study, który warto mieć w kieszeni na następne demo "przepiszmy nasz CSS-in-JS", bo pokazuje coś, co rzadko się mówi głośno: agenty nie skróciły tej migracji, tylko zmieniły jej ekonomię w połowie drogi. Zespoły, które planują podobny ruch, powinny wziąć z tego przede wszystkim pomysł na deterministyczny codemod jako bazę, a agentów traktować jako przyspieszenie na końcówce, nie jako główny silnik migracji od dnia zero.

**Link:** [Styling Linear for the future with StyleX](https://linear.app/now/styling-linear-for-the-future-stylex)

## Trwała pamięć i wyprowadzony kontekst: wzorzec dwuwarstwowy dla agentów

**TLDR:** Oracle opisuje wzorzec architektoniczny, w którym trwała pamięć agenta jest jedynym źródłem prawdy, a embeddingi, podsumowania i widoki zmaterializowane są jedynie jej pochodnymi, zawsze wskazującymi z powrotem na kanoniczny rekord.

**Summary:** Punktem wyjścia jest scenariusz, w którym agent cytuje nieaktualny wynik benchmarku, bo poprawiony fakt trafił do bazy, ale embedding wciąż wskazuje na starą wersję zdania. Autor nazywa to dryfem: cichym, pewnym siebie i praktycznie niewykrywalnym w testach, bo tam fakt i jego embedding się zgadzają. Rozjeżdżają się dopiero w produkcji, po korekcie, właśnie tam, gdzie nikt nie postawił asercji.

Rozwiązaniem jest jeden kierunek strzałki: kontekst wyprowadzony (embeddingi, podsumowania, pre-joinowane widoki) zawsze odwołuje się do wersji kanonicznego rekordu, nigdy odwrotnie. Kiedy rekord kanoniczny się zmienia, system decyduje per typ pamięci, czy pochodną odbudować, wygasić, czy oznaczyć jako zatrzymany snapshot. Ta ostatnia opcja jest ciekawa: podsumowanie decyzji podjętej na starych danych czasem powinno zostać niezmienione, bo miało odzwierciedlać to, co zespół wiedział w danym momencie, a nie aktualny stan wiedzy.

Artykuł kończy testem lakmusowym dla architektury: czy potrafisz usunąć całą warstwę pochodną i odbudować ją wyłącznie z warstwy kanonicznej? Jeśli nie, to nie masz systemu pamięci, tylko cache, którego nie potrafisz odtworzyć.

**Key takeaways:**
- Trzy strategie synchronizacji: leniwa przy odczycie, harmonogramowa (cron) i transakcyjna w tej samej transakcji co zapis kanoniczny
- Provenance (source_event_id, wersja) na każdym rekordzie pochodnym pozwala wykryć, co się zdezaktualizowało
- Nie każda nieaktualność to bug: przypięty do wersji snapshot bywa poprawnym zachowaniem
- Test rekonstrukcji: jeśli nie potrafisz odbudować warstwy pochodnej z kanonicznej, granica nie jest czysta

**Why do I care:** Jeśli budujecie cokolwiek z RAG-iem albo długoterminową pamięcią agenta, ten artykuł nazywa problem, który większość zespołów odkrywa dopiero na produkcji, czyli że wektor to przyspieszenie, a nie rekord. Dla architekta to konkretna checklista do code review pipeline'u agentowego: gdzie leży prawda, co ją wyprowadza i czy da się to odbudować od zera.

**Link:** [Persistent Memory and Derived Context: A Two-Layer Pattern for Agents](https://blogs.oracle.com/developers/persistent-memory-and-derived-context-a-two-layer-pattern-for-agents)

## Ukryty inżynieryjny fundament budowania modeli fundamentowych

**TLDR:** Poolside opisuje swój Model Factory, wewnętrzny framework do trenowania i eksperymentowania z modelami fundamentowymi, zbudowany, bo tempo rozwoju AI rośnie wykładniczo, a zespół inżynierski może rosnąć co najwyżej liniowo.

**Summary:** Historia zaczyna się od najprostszego możliwego pipeline'u: załaduj dane, policz forward pass, policz stratę, policz backward pass, powtórz. Brak w nim jednak sygnału ewaluacyjnego, więc kolejna iteracja dorzuca automatyczne ewaluacje uruchamiane w regularnych odstępach podczas pretreningu, co z kolei wymaga transferu wag między węzłami treningowymi a inferencyjnymi. Stąd już prosta droga do uczenia ze wzmocnieniem opartego na wykonywaniu kodu: Poolside zbudowało izolowane środowisko z milionem publicznych repozytoriów z uruchamialnymi testami, serwowane przez dedykowany task engine do milionów równoległych agentowych workflow.

Kolejne iteracje dokładają automatyczne ablacje architektury (zaplanowane przez orkiestrator Kubernetes obsługujący zależności między zadaniami), automatyczne odświeżanie danych i automatyczne mieszanie danych, ze streamingiem zamiast materializowania jednego gigantycznego datasetu. Całość spina Dagster jako "bijące serce" fabryki, metryki lecą do Neptune i Grafany, a wewnętrzne narzędzie Podium służy do ręcznego "vibe checkingu" modeli przez cały zespół, nie tylko inżynierów.

Najciekawszy fragment to filozofia: eksperymenty jako kod, nie jako ręczne kliknięcia. Sweep po batch size czy learning rate trwa teraz poniżej dziesięciu minut zamiast dni, bo cała konfiguracja jest wersjonowanym plikiem uruchamianym przez CI.

**Key takeaways:**
- Orkiestracja przez Kubernetes z obsługą zależności między zadaniami (ewaluacja czeka na checkpoint z treningu)
- Środowisko RL na kodzie: milion repozytoriów, testy jako sygnał nagrody, dedykowany task engine
- Eksperymenty jako wersjonowany kod (Spark frames dla danych, struktury Python dla architektury) uruchamiane przez CI
- Iceberg jako warstwa danych z pełnym lineage i wersjonowaniem datasetów

**Why do I care:** To rzadka okazja, żeby zobaczyć od środka, ile inżynierii systemowej stoi za czymś, co na zewnątrz wygląda jak "kolejny model językowy". Dla architektów spoza AI labów to dobry punkt odniesienia, jak skalować eksperymentowanie w ogóle, niekoniecznie tylko trening modeli: decouplowane podsystemy, konfiguracja jako kod i orkiestrator świadomy zależności to wzorce przenośne na dowolny data pipeline.

**Link:** [The hidden engineering behind foundation model building](https://poolside.ai/blog/introducing-the-model-factory)

## AI coding uniemożliwi budowanie ekspertyzy

**TLDR:** Lars Faye argumentuje, że narzędzia do kodowania z AI wymagają eksperckiej wiedzy, żeby dobrze z nich korzystać, ale jednocześnie eliminują tarcie, które tę wiedzę buduje, co stawia nowych programistów w pułapce bez wyjścia.

**Summary:** Punktem wyjścia jest paradoks "eksperckiego nowicjusza": mówi się jednocześnie, że kto nie używa AI, zostanie w tyle, i że żeby dobrze używać AI, trzeba stosować myślenie wyższego rzędu, pisać porządne specyfikacje i zawsze rozumieć to, co się przegląda. Tyle że umiejętność robienia tego dobrze to funkcja doświadczenia zdobytego przez tarcie, którego AI właśnie pozbawia nowicjuszy. Badanie cytowane przez JetBrains, "The Widening Gap", pokazało, że uczestnicy z ciężkim wspomaganiem AI pomijali kluczowe etapy planowania i kończyli z "iluzją kompetencji" zamiast prawdziwego zrozumienia, podczas gdy ci, którzy ograniczali AI, rozwijali "negatywną ekspertyzę": umiejętność ignorowania niepomocnych sugestii.

Autor nazywa to "odwróconym uczeniem się": student prowadzi mentora, mentor odpowiada, student znowu steruje. Problem w tym, że kiedy nie wiesz, czego nie wiesz, nie potrafisz zadać pytania, które naprowadziłoby model na dobrą odpowiedź. Badanie UPenn na tysiącu studentów matematyki pokazało, że ci korzystający z LLM jako generatora odpowiedzi radzili sobie o 17 procent gorzej niż grupa z samym podręcznikiem, ale wariant "Tutor", zmuszający do samodzielnego rozwiązania po uzyskaniu podpowiedzi, dał wynik o 127 procent lepszy w sesji ćwiczeniowej.

Cytat z Davida Cramera, współzałożyciela Sentry, dobrze podsumowuje ryzyko biznesowe: ktoś wierzy, że LLM w końcu wróci i posprząta cały bałagan nagenerowany po drodze, a to jest, jego zdaniem, eksperyment naukowy, nie strategia.

**Key takeaways:**
- "Cognitive debt" (oddanie osądu) różni się od "cognitive offloading" (delegowanie tego, co mechaniczne) i tylko to drugie jest zdrowe
- Tarcie i utknięcie na problemie buduje "developer intuition", czyli Fingerspitzengefühl
- Model tutorski (podpowiedź plus samodzielne dokończenie) daje lepsze efekty uczenia niż pełna generacja kodu
- Checklist autora: czy rozumiałbyś to zadanie bez AI, czy pogłębiasz zrozumienie, czy potrafiłbyś to wyjaśnić po audycie

**Why do I care:** Ten tekst trafia w coś, co czuję na własnym zespole: jest różnica między juniorem, który używa Copilota do przyspieszenia rzeczy, które już rozumie, a takim, który buduje na nim całą swoją wiedzę o systemie. Jako lead warto świadomie projektować onboarding tak, żeby młodsi ludzie najpierw utknęli na problemie, zanim sięgną po agenta, bo inaczej za dwa lata odziedziczycie kod, którego nikt w zespole nie rozumie na poziomie fundamentów.

**Link:** [AI Coding will Prevent Expertise](https://larsfaye.com/articles/ai-coding-will-prevent-expertise)

## Jak Sentry zbudowało zautomatyzowany workflow debugowania

**TLDR:** Sentry opisuje, jak spięło swojego agenta Seer z rutyną w Claude, żeby automatycznie diagnozować błędy, otwierać PR-y z poprawkami i przypisywać właściwego recenzenta, zamiast zatapiać zespół w ręcznej triage'y.

**Summary:** Seer, wewnętrzny agent debugujący Sentry, ma uprawnienia do znalezienia przyczyny błędu, napisania planu naprawy i otwarcia PR-a bez udziału człowieka na kilku projektach, w tym w core Sentry i dokumentacji. Problem pojawił się na kolejnym poziomie: kto ma przejrzeć te wszystkie PR-y i kiedy. Zamiast tworzyć nową rolę "Chief Delegation Officer", dołożyli kolejnego agenta: rutynę w Claude, uruchamianą co godzinę, która przegląda kanał Slacka z powiadomieniami o nowych PR-ach z ostatnich czterech godzin.

Rutyna najpierw pyta samego Seera, kto z historii commitów najlepiej zna dotknięty kod, potem sprawdza, czy PR wciąż jest otwarty, żeby nie oznaczać kogoś do czegoś już zamkniętego, a na końcu tagnie recenzenta z prośbą o scalenie lub zamknięcie, jedną linijką feedbacku i oceną, czy to był dobry use case dla Seera. Kluczowa uwaga: to nie był one-shot setup, tylko kilka tygodni iteracji, żeby na przykład nie pingować ludzi w weekend.

Wyniki po dwóch miesiącach: wzrost wskaźnika akcji na PR-ach o 21 procent, wzrost odpowiedzi w ciągu 48 godzin o 13 procent, i ciekawy wzrost liczby PR-ów zamykanych bez merge'a o 12,5 procent, który po bliższym sprawdzeniu okazał się dobrym sygnałem: duplikaty i przypadki, gdzie recenzent wybrał szerszą poprawkę, nie porzucone zgłoszenia.

**Key takeaways:**
- Automatyzacja to nie eliminacja ludzi z pętli, tylko eliminacja manualnej pracy triage'owej
- Seer sam wskazuje najlepszego recenzenta na bazie historii commitów w danym pliku
- Wzrost zamknięć bez merge'a nie musi znaczyć złych poprawek, warto to zweryfikować zanim się to uzna za regres
- Setup: Seer autofix plus rutyna w Claude lub automatyzacja w Cursorze plus GitHub CLI

**Why do I care:** To konkretny przepis na coś, co wiele zespołów próbuje poskładać intuicyjnie: agent generujący poprawki plus druga warstwa automatyzacji do zarządzania kolejką pracy ludzi. Warto ukraść im pomysł na metrykę "czy to był dobry use case dla agenta" wpisywaną przez recenzenta, bo to najtańszy sposób na budowanie danych treningowych o tym, gdzie autofix faktycznie się sprawdza.

**Link:** [How we built an automated debugging workflow at Sentry](https://blog.sentry.io/automated-debugging-workflow-sentry/)

## Poruszanie się po siatce i szanowanie granic

**TLDR:** Kirupa kontynuuje serię o strukturach danych i algorytmach, tym razem ucząc, jak poprawnie poruszać postacią po siatce 2D bez wychodzenia poza jej granice, wprowadzając wzorzec propose-validate-commit.

**Summary:** Bohaterem jest Zorb, kosmita eksplorujący siatkę 10 na 10, poruszający się o jedną komórkę w jednym z czterech kierunków. Każdy ruch to trzy kroki: zaproponuj kandydata (dodaj offset kierunku do bieżącej pozycji), zwaliduj go (sprawdź, czy mieści się w granicach 0 do liczby kolumn i 0 do liczby wierszy), i dopiero wtedy commituj, czyli faktycznie zaktualizuj pozycję. Jeśli walidacja się nie powiedzie, kandydat zostaje odrzucony, a stan gracza nigdy nie przechodzi przez nieprawidłową wartość, nawet na chwilę.

Artykuł krok po kroku prowadzi przez implementację w czystym JavaScripcie: strukturę DIRECTIONS mapującą kierunek na parę offsetów, funkcję inBounds sprawdzającą granice, i tryMove łączącą te dwa elementy z obsługą klawiatury, przycisków i swipe'ów na dotyku.

To materiał typowo edukacyjny, kolejny odcinek serii budującej intuicję wokół podstawowych struktur danych, ale wzorzec propose-validate-commit jest na tyle uniwersalny, że warto go rozpoznać poza kontekstem gierek: to dokładnie ten sam kształt co walidacja formularza przed zapisem stanu, albo optymistyczny update UI z rollbackiem.

**Key takeaways:**
- Wzorzec propose-validate-commit: policz kandydata, zwaliduj, commituj tylko po sukcesie
- Granica siatki to wciąż poprawne miejsce do stania, ale wyjście poza nią (indeks -1 albo równy rozmiarowi) już nie
- Ten sam kod obsługuje klawiaturę, kliknięcia i gesty dotykowe, bo wszystkie kończą się wywołaniem tej samej funkcji tryMove
- Seria jest dostępna też jako plain text, bo autor świadomie kieruje ją też do modeli czytających strony

**Why do I care:** To akurat dobry materiał do polecenia juniorom szukającym powtórki z fundamentów, zwłaszcza że sam wzorzec propose-validate-commit przewija się w architekturze frontendowej dużo częściej, niż się wydaje, od walidacji formularzy po transakcyjne aktualizacje stanu. Niewielka rzecz, ale warto mieć ją nazwaną, żeby móc się do niej odwołać w code review.

**Link:** [Moving Around a Grid and Respecting Boundaries](https://www.kirupa.com/data_structures_algorithms/moving_around_a_grid.htm)

## pnpm 12: identyfikacja repozytoriów git, deterministyczne lockfile'y i instalowanie innych menedżerów pakietów

**TLDR:** pnpm 12 traktuje zależności z GitHuba, GitLaba i Bitbucketa jako tożsamości zamiast wyborów transportu, robi cykle zależności peer w pełni deterministycznymi i potrafi teraz instalować oraz uruchamiać npm, Yarna czy Buna za ciebie.

**Summary:** Największa zmiana dotyczy zależności git na znanych hostach: każda reprezentacja tego samego repozytorium, czy to `owner/repo`, `git+https://` czy `git+ssh://`, rozwiązuje się teraz przez kanoniczny URL HTTPS hosta, a lockfile nigdy nie zapisuje URL-a SSH dla takich repozytoriów. To eliminuje sytuację, w której instalacja na jednej maszynie zapisywała transport działający tylko lokalnie, na przykład URL SSH, który psuł CI bez kluczy SSH.

Drugą dużą zmianą jest kanoniczne rozrywanie cykli zależności peer, porządkowane po identyfikatorze pakietu niezależnie od kolejności, w jakiej instalacja natrafia na cykl. Efekt: ten sam graf zależności zawsze daje bajtowo identyczny lockfile, a na dużych workspace'ach z wieloma cyklami rozwiązywanie peer dependencies jest od dwóch do trzech razy szybsze i zużywa około 25 procent mniej pamięci.

Trzecia rzecz to coś, co brzmi jak żart, ale jest bardzo praktyczne: pnpm teraz instaluje inne menedżery pakietów. Zależność git wymagająca konkretnej wersji Yarna dostaje dokładnie tę wersję Yarna, `pnpm dlx` potrafi uruchomić `pnx yarn@4 install` bez instalowania npm-owego pakietu o tej samej nazwie, a globalnie zainstalowany menedżer pakietów podąża teraz za pinem projektu, tak jak od dawna robił to Node.js przez `devEngines.runtime`.

**Key takeaways:**
- Zależności git na znanych hostach rozwiązują się przez kanoniczny HTTPS, SSH konfiguruje się na poziomie maszyny przez `git config --global url.insteadOf`
- Kanoniczne rozrywanie cykli peer dependencies daje deterministyczne, bajtowo identyczne lockfile'e
- `packageImportMethod: auto` próbuje teraz hardlinków przed klonowaniem na Linuksie, prawie dwa razy szybciej na btrfs
- Nieznane ustawienia w `pnpm-workspace.yaml` są teraz zgłaszane, a nie po cichu ignorowane

**Why do I care:** Detal o SSH-owych URL-ach zapisywanych w lockfile'u to jeden z tych bugów, na które trafia się raz na projekt, traci pół dnia na debugowanie CI, i zapomina, dopóki nie trafi się na niego znowu. Fajnie, że ktoś to w końcu naprawił strukturalnie, a nie łatką. Warto też zerknąć na `remoteSideEffectsCache`, bo współdzielenie zbudowanych artefaktów zależności między maszynami przez podpisane pakiety to dokładnie ten typ optymalizacji, który zaczyna się opłacać w większych monorepo.

**Link:** [Release pnpm 12](https://github.com/pnpm/pnpm/releases/tag/v12.0.0)

## Jak Cloudflare zaoszczędził 100 terabajtów pamięci optymalizując cache DNS 1.1.1.1

**TLDR:** Cloudflare opisuje pięć kolejnych zmian w strukturach pamięci swojego cache'u DNS, które zmniejszyły footprint na wpis o ponad połowę, uwalniając w sumie około 100 terabajtów pamięci na flocie i jednocześnie przyspieszając cache o kilkanaście do kilkudziesięciu procent.

**Summary:** Big Pineapple, platforma stojąca za 1.1.1.1, trzyma w danym momencie ponad 250 miliardów wpisów cache'u, więc marnowanie choćby jednego bajta na wpis kosztuje ponad 250 gigabajtów pamięci na całej flocie. Pierwsza optymalizacja to zamiana `Vec<T>` i `String` na `Box<[T]>` i `Box<str>` tam, gdzie dane po zapisaniu nigdy się nie zmieniają, bo `Vec` trzyma niepotrzebne pole capacity i rezerwuje miejsce na przyszły wzrost, którego nigdy nie będzie. To samo w sobie dało ponad 15 terabajtów oszczędności na całej flocie.

Kolejne kroki są bardziej finezyjne: zamiast trzymać sekcje odpowiedzi DNS jako osobne listy, Cloudflare trzyma jedną listę z dwubajtowymi offsetami do początku każdej sekcji zamiast ośmiobajtowych wskaźników i długości. Dla rekordów, których właściciel domeny jest identyczny z zapytaną domeną (większość przypadków), pole ownera jest całkowicie pomijane i odtwarzane przy odczycie z klucza cache'u. Najciekawszy fragment dotyczy enumów w Rust: enum reprezentujący typ rekordu DNS zajmuje tyle, ile jego największy wariant, a to był NAPTR przy 136 bajtach, więc każdy rekord A czy AAAA marnował ponad 120 bajtów paddingu. Boxing dużych wariantów pomógł, ale wprowadził koszt fragmentacji alokatora i gorszą lokalność pamięci w cache CPU.

Finałowe rozwiązanie poszło jeszcze dalej: zamiast trzymać sparsowane warianty enuma, Cloudflare przechowuje surowe bajty rekordu z prefiksem długości, kopiowane bezpośrednio do wychodzącej wiadomości dla większości typów rekordów, z parsowaniem zarezerwowanym tylko dla rekordów z nazwami domen wymagającymi kompresji. To dało dodatkowe 5 procent na latencji odczytu i 13 procent na przepustowości zapisu.

**Key takeaways:**
- Zamiana `Vec`/`String` na `Box<[T]>`/`Box<str>` eliminuje niepotrzebne pole capacity tam, gdzie dane są niemutowalne po zapisie
- Enum w Rust jest zawsze wielkości swojego największego wariantu, więc rzadkie duże warianty psują pamięć dla częstych małych
- Przechowywanie surowych bajtów zamiast sparsowanych struktur poprawia lokalność pamięci kosztem możliwości losowego dostępu do rekordów
- Wynik w produkcji: p99 pamięci spadło z 9,3 GB do 5,3 GB na instancję, 43 procent redukcji

**Why do I care:** Nawet jeśli nie piszecie Rusta ani cache'u DNS, ten artykuł jest świetną lekcją o tym, jak drobne decyzje o layoutcie danych w pamięci skalują się do absurdalnych liczb przy odpowiedniej wielkości floty. Warto zapamiętać zasadę ogólną: jeśli struktura danych jest niemutowalna po utworzeniu, nie płać za mutowalność, której nigdy nie użyjesz, to dotyczy też JS-owych tablic i obiektów w gorących ścieżkach, tylko konsekwencje są mniej spektakularne niż 100 terabajtów.

**Link:** [How we saved 100 terabytes of memory by optimizing 1.1.1.1's DNS cache](https://blog.cloudflare.com/dns-cache-memory-optimization-1111/)

## Małe modele właśnie nadeszły

**TLDR:** Autor opisuje, jak tanie i szybkie małe modele w rodzaju gpt-5.6-luna czy GLM 5.3 zmieniają ekonomię produktów konsumenckich opartych na AI, bo koszt tokena przestaje być barierą wejścia.

**Summary:** Punktem wyjścia jest osobiste doświadczenie z gpt-5.6-luna: model robi około 100 tokenów na sekundę, przeszukuje kodową bazę, maila i wiedzę, a nawet skomplikowane wątki badawcze kosztują w API dziesiątki centów. Autor kontrastuje to z modelami klasy Sonnet, gdzie wygenerowanie czegokolwiek sensownego kosztowało około dolara, co czyni model biznesowy konsumenckiej subskrypcji za 30 dolarów miesięcznie nieopłacalnym, chyba że dostarczasz wartość na poziomie Wall Street Journal.

Ciekawsza część dotyczy pracy biznesowej. Współzałożyciel Segmentu, prowadzący dziś kilka firm, dzieli pracę na dwa typy: "IQ 180", czyli przełomowe rozwiązania geniuszy, i "token spewer", czyli bycie ultra responsywnym i przepychanie spraw na dziesiątkach frontów naraz. Mimo że jego firmy nie istniałyby bez pierwszego typu pracy, około 95 procent czasu spędza w drugim koszyku: telefony, popychanie ludzi, drobna logistyka.

Autor przewiduje, że popyt na modele frontierowe będzie rósł w dziedzinach wymagających przełomów (inżynieria, nauka, trenowanie modeli), ale popyt na modele "szybkie, tanie, wystarczająco dobre" dopiero zaczyna przyspieszać, bo większość interakcji z ludźmi w firmach też jest tego drugiego typu.

**Key takeaways:**
- GLM 5.3 dołącza do frontu Pareto obok modeli typu luna jako opcja tania i wystarczająco dobra
- Ekonomia produktów konsumenckich z AI wymaga kosztu tokena rzędu centów, nie dolarów, żeby model subskrypcyjny się spinał
- Rozróżnienie "IQ 180" versus "token spewer" tłumaczy, dlaczego większość pracy w firmach (i większość pracy agentów) to nie przełomy, tylko responsywność na wielu frontach
- Brakujące elementy do zbudowania biznesu na małych modelach: nowe harnessy, bezpieczeństwo przed prompt injection, role i uprawnienia

**Why do I care:** To dobra rama do myślenia o tym, gdzie w waszym produkcie w ogóle warto sięgać po frontierowy model, a gdzie to przepłacanie za precyzję, której nikt nie potrzebuje. Większość funkcji AI w typowej aplikacji frontendowej, klasyfikacja, streszczenie, prosty routing, to czysty "token spewer" i najwyższy czas przestać płacić za nie stawkę modelu do rozwiązywania hipotez naukowych.

**Link:** [Small Models Have Arrived](https://calv.info/small-models-have-arrived)
