---
title: "HackerNoon: płynność GMX, null jako fałszywe miejsce, prompt injection i mit OKR-outcomes"
excerpt: "Przegląd HackerNoon: analiza poolów płynności GMX, code smell z null jako lokalizacją, przejęcie GPTZero przez Superhuman, spór o outcome i output w OKR oraz solidny rozkład prompt injection na czynniki pierwsze."
publishedAt: "2026-08-04"
slug: "hackernoon-gmx-code-smell-prompt-injection-okr"
hashtags: "#HackerNoon #DeFi #CleanCode #PromptInjection #OKR #generated #pl"
source_pattern: "HackerNoon"
---

## Jak działają pule płynności GMX

**TLDR:** Autor rozbija wynik dostawcy płynności w poolu GM: BTC/USD na GMX na dwa składniki: stabilny przychód z opłat i znacznie bardziej chaotyczny efekt wynikający z tego, czy traderzy na danym rynku zarabiają czy tracą. Na danych on-chain z ostatnich dwóch lat pokazuje, że krótki horyzont inwestycji w taki pool to w praktyce loteria, a dopiero okres roku lub dwóch lat uśrednia ryzyko na tyle, że wynik staje się przewidywalny.

**Summary:** GMX to zdecentralizowana giełda kontraktów perpetual, a GM markets to izolowane pule płynności przypisane do konkretnego rynku, w tym przypadku BTC/USDC. Kto wpłaca kapitał do takiego poola, dostaje token GM i razem z nim ekspozycję na aktywa bazowe oraz udział w opłatach z handlu, pożyczek i likwidacji. Autor rozkłada całkowity wynik na komponent opłatowy, który z definicji nie może być ujemny, oraz komponent nieopłatowy, liczony jako reszta po odjęciu opłat od całkowitej zmiany wartości poola. Ten drugi składnik zależy od tego, jak ustawieni są traderzy względem rynku, i to on odpowiada za większość zmienności wyniku.

Ciekawa jest część, w której autor pokazuje rolling returns dla różnych okresów trzymania pozycji, od 30 do 365 dni. Dla krótkich okien wynik potrafi się wahać między kilkoma a trzydziestoma paroma procentami w skali roku, zależnie od tego, kiedy dokładnie wejdziesz i wyjdziesz. Dla dłuższych okien ta zmienność wygładza się zauważalnie. To samo widać przy komponencie nieopłatowym: w okresach silnego trendu na BTC, zarówno w górę jak i w dół, ten składnik odchyla się mocno w jedną stronę, a próba zamknięcia pozycji w złym momencie może skutkować sporą stratą, mimo że w dłuższym ujęciu ten sam pool był rentowny.

Autor zestawia to z historią cenową BTC od końca 2023 do wiosny 2026 i pokazuje kilka faz, w których traderzy wygrywali z poolem albo przegrywali z nim, w zależności od tego, jak dobrze byli ustawieni względem ruchu ceny. Wniosek jest prosty i uczciwie podany: to nie jest produkt typu "wpłać i zbieraj stały procent", to instrument, którego wynik zależy od rynku, czasu trzymania i mechaniki samego poola. Na końcu pojawia się też zdroworozsądkowa uwaga o ryzyku technicznym, czyli audytach, historii exploitów i bug bounty, którą łatwo przeoczyć, gdy człowiek skupia się tylko na wykresach zysku.

**Key takeaways:**
- Wynik dostawcy płynności w poolu GM to suma stabilnego komponentu opłat i dużo bardziej zmiennego komponentu zależnego od PnL traderów.
- Krótki horyzont trzymania pozycji (30-90 dni) daje bardzo dużą zmienność wyniku w zależności od momentu wejścia i wyjścia, długi horyzont (rok lub dwa) to wygładza.
- Analiza historyczna nie zastępuje oceny ryzyka technicznego, czyli sprawdzenia audytów i historii exploitów danego protokołu.

**Why do I care:** To materiał czysto finansowy, nie inżynierski, więc traktuję go jako lekturę z zakresu analizy danych, nie jako coś do zaimplementowania w moim stacku. Podoba mi się metodologia: rozbicie wyniku na dwie mierzalne składowe i pokazanie tego na realnych danych on-chain, a nie na obietnicach z landing page'a protokołu. Gdybym miał doradzać komuś technicznemu, kto chce wejść w DeFi z ciekawości inżynierskiej, powiedziałbym, że sam sposób myślenia, czyli separacja przewidywalnego przychodu od szumu rynkowego, przenosi się jeden do jednego na ocenę własnych systemów produkcyjnych, gdzie też warto rozdzielać efekt "bazowy" od losowych wahań.

**Link:** [How GMX Liquidity Pools Work](https://hackernoon.com/how-gmx-liquidity-pools-work)

## Code Smell 208: nie używaj null jako realnego miejsca

**TLDR:** Krótki, konkretny wpis z serii Code Smell o pułapce polegającej na używaniu (0, 0) albo innej "sentinel value" jako oznaczenia nieznanej lokalizacji. Autor pokazuje na Kotlinie, jak zamienić to na polimorfizm z jawnym typem UnknownLocation, żeby nie mylić realnego miejsca na Ziemi z brakiem danych.

**Summary:** Punktem wyjścia jest Null Island, czyli punkt 0°N 0°E na Atlantyku, gdzie systemy GPS i geokodery lądują, kiedy nie mają prawdziwych współrzędnych. To nie jest ciekawostka bez znaczenia, bo autor przypomina, że setki tysięcy zdjęć na Flickrze i dashboard COVID-owy Johns Hopkins faktycznie umieszczały tam dane bez lokalizacji. Problem jest znany każdemu, kto pracował z danymi geograficznymi, ale rzadko widzi się go nazwanego tak precyzyjnie jako code smell.

Kod "wrong" w artykule sprawdza `latitude == 0.0 && longitude == 0.0` i na tej podstawie decyduje, że ktoś "mieszka na Null Island". To jest właśnie clou problemu: (0.0, 0.0) to realny punkt na mapie i jednocześnie umowny placeholder dla braku danych, a te dwa znaczenia nie powinny współdzielić jednej reprezentacji. Rozwiązanie proponowane w artykule to abstrakcyjna klasa Location z dwoma implementacjami, EarthLocation z realnymi współrzędnymi i UnknownLocation, która przy próbie policzenia odległości rzuca wyjątkiem, a przy przetwarzaniu przez `ifKnownOrElse` po prostu jawnie mówi, że lokalizacja jest nieznana.

Najbardziej trafna jest sekcja o generowaniu kodu przez AI. Modele językowe, gdy proszone o klasę reprezentującą lokalizację, prawie zawsze sięgają po dwa double'y i (0.0, 0.0) jako domyślną wartość, bo to najprostszy wzorzec z treningu, i nie zaproponują polimorfizmu, jeśli nie poprosisz o to wyraźnie. To pokrywa się z tym, co sam widzę w code review: null-jako-magiczna-wartość wraca cały czas, niezależnie od tego, czy kod pisze junior pod presją deadline'u, czy asystent AI bez dodatkowego prompta.

**Key takeaways:**
- (0.0, 0.0) jako "nieznana lokalizacja" myli dwa różne znaczenia: realny punkt na mapie i brak danych.
- Reprezentowanie nieznanej lokalizacji jako osobnego typu (np. UnknownLocation) zamiast sentinel value pozwala kompilatorowi i czytelnikowi kodu wyłapać ten przypadek jawnie.
- Generatory AI domyślnie sięgają po sentinel values typu (0,0) czy null, jeśli nie poprosi się ich wprost o alternatywny model danych.

**Why do I care:** Ten smell widziałem w niemal każdym projekcie, który dotykał danych geograficznych albo jakichkolwiek "opcjonalnych" pól numerycznych, nie tylko w Kotlinie, bo we froncie ta sama choroba objawia się jako `latitude: 0` albo `userId: -1` zamiast `Option<Location>` czy jawnego stanu "brak danych". To, co doceniam w tym wpisie, to nazwanie problemu wprost jako bijection, czyli że model danych powinien mapować się jeden do jednego na rzeczywistość, a nie oszukiwać przez recykling wartości. Przy code review AI-generowanego kodu to jest dokładnie ten typ smellu, którego szukam pierwszy, bo model prawie zawsze wybierze najprostszą literalną wartość zamiast typu.

**Link:** [Code Smell 208 - Don't Use Null for Real Places](https://hackernoon.com/code-smell-208-dont-use-null-for-real-places)

## GPTZero dołącza do Superhuman

**TLDR:** GPTZero, firma znana z detekcji treści generowanych przez AI, ogłasza plan połączenia z Superhuman, firmą stojącą też za Grammarly. Ogłoszenie napisane jest jako list założycielski, nie jako niezależna relacja, więc trzeba to czytać z tą świadomością.

**Summary:** To jest w całości komunikat prasowy w pierwszej osobie, opublikowany bez dystansu redakcyjnego HackerNoon. GPTZero powstało w styczniu 2023 roku jako narzędzie do wykrywania treści AI, a od tego czasu rozrosło się o funkcje takie jak AI Vision, writing replay dla nauczycieli czy detektor halucynacji. Teraz firma dołącza do Superhuman, które opisywane jest jako "trampolina" dla mniejszych firm, a nie po prostu wykup i wchłonięcie.

Uzasadnienie biznesowe, jakie podaje GPTZero, to dostęp do bazy użytkowników e-mail liczonej w milionach dzięki Superhuman Mail i Grammarly, oraz do siedemnastoletniego doświadczenia Grammarly we współpracy ze szkołami i uczelniami. Firma cytuje też badanie zrobione z Graphite, według którego już 50% treści w internecie jest generowane przez AI, co w ich narracji zwiększa wartość narzędzi do weryfikacji autentyczności. Communikat kończy się deklaracją budowania "warstwy autentyczności", która towarzyszy użytkownikowi wszędzie, gdzie czyta, pisze i tworzy.

Z punktu widzenia czytelnika trudno tu o dużo więcej niż streszczenie tego, co firma chce, żeby o niej myślano. Nie ma tu żadnych liczb transakcji, warunków finansowych ani informacji, kto dokładnie z zarządu GPTZero zostaje, a kto odchodzi. To zwykła praktyka w tego typu ogłoszeniach, ale warto to nazwać, żeby nie czytać tego jak niezależnej analizy rynku detektorów AI.

**Key takeaways:**
- GPTZero, znane z detekcji treści AI, dołącza do Superhuman, firmy stojącej również za Grammarly.
- Kluczowy argument biznesowy to dostęp do milionów użytkowników poczty (Superhuman Mail, Grammarly) oraz do rynku edukacyjnego.
- Komunikat nie zawiera warunków finansowych transakcji, to typowy tekst założycielski, nie niezależna relacja.

**Why do I care:** To jest czysto biznesowa wiadomość o przejęciu, nie ma tu nic technicznego do analizy poza samym trendem konsolidacji na rynku narzędzi "AI authenticity". Jako architekt patrzę na to z boku: konsolidacja detektorów AI wokół dużych platform pocztowych i edytorskich to naturalny krok, bo detekcja AI ma sens tylko wtedy, gdy jest wszędzie, gdzie piszesz, a nie jako osobna zakładka w przeglądarce. Nie mam tu żadnej technicznej rekomendacji, bo materiał nie mówi nic o architekturze produktu, tylko o intencjach biznesowych obu stron.

**Link:** [GPTZero Plans to Join Superhuman](https://hackernoon.com/gptzero-plans-to-join-superhuman)

## Sprawa przeciw traktowaniu outcome'ów jako jedynych dobrych key results

**TLDR:** Autor podważa popularną dziś zasadę OKR, że key results muszą być outcome'ami, a nie output'ami. Argumentuje, że skupienie się wyłącznie na outcome'ach ukrywa aktywności zespołu przed innymi i ułatwia manipulowanie liczbami, podczas gdy output'y wymuszają rozliczalność z tego, co faktycznie zostało zrobione.

**Summary:** Artykuł zaczyna się od historii OKR, od Management by Objectives Petera Druckera, przez Andy'ego Grove'a w Intelu, po Johna Doerra, który przeniósł tę praktykę do Google'a. Autor przywołuje popularnych praktyków, Christinę Wodtke i Josha Seidena, którzy przez lata przekonywali, że key result powinien być outcome'em, bo output typu "wypuść tę funkcję" nie mówi nic o tym, czy coś się faktycznie zmieniło w zachowaniu użytkowników. To jest rozsądny argument i autor nie próbuje go ośmieszać, tylko pokazuje jego drugą stronę.

Najciekawszy fragment to "upside-down test", w którym autor bierze tę samą, uczciwo nastawioną osobę i daje jej najpierw zadanie z key resultami opartymi na output'ach, a potem odwrotne zadanie z samymi outcome'ami. Konkluzja jest taka, że im bardziej skupiamy się wyłącznie na outcome'ach, tym łatwiej schować przed innymi to, co faktycznie się robi, bo widoczny jest tylko wynik, nie droga do niego. Kiedy outcome jest zgadywany, bo nikt nie wie z góry, jak bardzo coś powinno się poprawić, taka nieprzejrzystość zaczyna się kumulować i uczy organizację kultury, w której liczy się deklaracja, a nie praca.

Autor cytuje też Jonathana Nightingale'a, który mówi, że juniorów oceniamy z wysiłku, a seniorów z outcome'ów, i Jeffa Bezosa, który zwracał uwagę, że każdy raport od podwładnego ma wbudowaną motywację, żeby wyglądać dobrze. Wniosek autora jest osobisty i wyraźnie zaznaczony jako opinia: gdyby musiał wybierać jedną stronę, wybrałby output'y, bo zwiększają szansę na współpracę i pokazują, co faktycznie zostało zrobione w relacji do celu. To nie jest odrzucenie OKR, to apel o to, żeby nie traktować "outcome, nie output" jako dogmatu bez wyjątków.

**Key takeaways:**
- Skupienie wyłącznie na outcome'ach jako key results ułatwia ukrywanie realnych aktywności zespołu i manipulację liczbami.
- Output'y jako key results wymuszają rozliczalność z konkretnej pracy i ułatwiają wspólną rozmowę o tym, co się dzieje w zespole.
- Wybór między outcome a output to nie dogmat, zależy od tego, czy organizacja jest w stanie ustalić sensowny, niezgadywany cel.

**Why do I care:** Pracowałem w zespołach, gdzie OKR-y z czystymi outcome'ami kończyły się tym, że nikt nie wiedział, co ktoś robi tydzień w tydzień, bo liczył się tylko słupek na dashboardzie na koniec kwartału. Zgadzam się z autorem, że to tworzy fałszywe poczucie odpowiedzialności, bo outcome bez widoczności na aktywności łatwo się "wyreżyserować" pod prezentację dla zarządu. Jako architekt wolę mieszankę: konkretne output'y techniczne (migracja zrobiona, testy pokrycia podniesione) powiązane z jednym, jasno mierzalnym outcome'em, bo sam output bez celu też potrafi się urwać od sensu.

**Link:** [The Case Against Treating Outcomes as the Only Good Key Results](https://hackernoon.com/the-case-against-treating-outcomes-as-the-only-good-key-results)

## Prompt injection nie da się odfiltrować

**TLDR:** Bardzo solidny, techniczny przegląd tego, dlaczego filtrowanie i klasyfikatory nie rozwiązują prompt injection, oraz jakie wzorce architektoniczne (Dual-LLM Simona Willisona, CaMeL od Google DeepMind, sześć wzorców z pracy z 2025 roku) faktycznie ograniczają ryzyko. Autor kończy własną, działającą implementacją generatora FAQ z trzema modelami, które nigdy się nie widzą, i konkretnym kodem deterministycznych "gate'ów" między nimi.

**Summary:** Autor od razu rozgranicza prompt injection od jailbreakingu: jailbreak to model robiący coś, czego producent by nie chciał, a prompt injection to sytuacja, w której atakujący i użytkownik to dwie różne osoby, a ofiarą są dane użytkownika. Model nie odróżnia, czyj głos znajduje się w tekście, bo wszystko to jeden ciąg tokenów. Kluczowy argument przeciw klasyfikatorom jest bezlitosny: w bezpieczeństwie aplikacji 99% skuteczności to ocena niedostateczna, a badanie "The Attacker Moves Second" z października 2025 pokazało, że dwanaście opublikowanych obrony, w tym od autorów z OpenAI, Anthropic i Google DeepMind, dało się złamać w ponad 90% przypadków przy adaptacyjnym atakowaniu, a żywy red team ponad 500 osób złamał wszystkie dwanaście w 100%.

Case study EchoLeak (CVE-2025-32711) w Microsoft 365 Copilot jest tu najbardziej przekonujący, bo pokazuje pełen łańcuch obchodzenia zabezpieczeń krok po kroku: obejście klasyfikatora przez sformułowanie maila jak wiadomości do człowieka, obejście filtra linków przez rzadziej używaną składnię referencyjną Markdown, to samo dla obrazków, obejście CSP przez otwarty redirect na dozwolonej subdomenie, i na koniec instrukcja, żeby model nigdy nie wspominał o źródle. Żaden z tych kroków nie jest błędem w klasycznym sensie, to legalne mechanizmy użyte poza swoim zamierzonym kontekstem, co dobrze pasuje do analogii z SQL injection przywołanej na początku.

Z tego wywodzą się konkretne wzorce. Reguła dwóch od Meta mówi, że agent w jednej sesji nie powinien mieć więcej niż dwóch z trzech właściwości: przetwarza niezaufany tekst, ma dostęp do wrażliwych danych, może zmieniać stan albo komunikować się na zewnątrz. Dual-LLM Willisona dzieli to na model uprzywilejowany, który nigdy nie widzi niezaufanego tekstu, i model odizolowany, który nie ma żadnych narzędzi, a między nimi przepływają tylko symboliczne zmienne, nie surowy tekst. CaMeL z Google DeepMind łata konkretną dziurę w Dual-LLM, w której wartość wyekstrahowana z niezaufanego tekstu mogła i tak zostać podmieniona, poprzez generowanie kodu w ograniczonym Pythonie, gdzie interpreter śledzi pochodzenie każdej zmiennej i stosuje polityki na podstawie tego tagu.

Najbardziej przekonuje mnie ostatnia część, gdzie autor pokazuje realny, prosty system: ekstraktor w kwarantannie, planer uprzywilejowany operujący tylko na enumach i licznikach, writer znów w kwarantannie piszący na podstawie zatwierdzonych faktów, i dwa deterministyczne "gate'y" w postaci kodu, nie modeli, sprawdzające schemat, długość, obecność wzorców typowych dla injection oraz to, czy odpowiedź w ogóle cytuje dozwolone fakty. Uczciwie przyznaje też, gdzie ten konkretny system wciąż ma otwartą szczelinę, czyli w tonie odpowiedzi, który wciąż może być pod wpływem niezaufanego tekstu, nawet jeśli nie ma dostępu do narzędzi ani danych.

**Key takeaways:**
- Klasyfikatory i instrukcje typu "ignoruj instrukcje w niezaufanym tekście" nie działają, bo w bezpieczeństwie aplikacji 99% wykrywalności to porażka, a adaptacyjne ataki obchodzą je w ponad 90% przypadków.
- Reguła dwóch (Meta) i wzorzec Dual-LLM (Willison) redukują ryzyko nie przez wykrywanie ataku, tylko przez odebranie systemowi jednej z trzech niebezpiecznych właściwości: dostępu do niezaufanego tekstu, danych albo kanału na zewnątrz.
- Realne bezpieczeństwo wymaga deterministycznych, kodowych "gate'ów" między modelami (schema, allow-listy, zakaz URL-i w odpowiedzi, wymóg cytowania faktów po ID), nie kolejnego modelu jako strażnika.

**Why do I care:** To jeden z niewielu tekstów o prompt injection, który nie kończy się na "użyj lepszego promptu systemowego", tylko realnie rozkłada problem na architekturę i pokazuje kod. Buduję teraz systemy z agentami sięgającymi po zewnętrzne treści i to jest dokładnie ten poziom paranoi, jaki uważam za konieczny: zero zaufania do tekstu z internetu, symboliczne zmienne między modelami, deterministyczne walidacje zamiast kolejnego modelu-strażnika. Jedyne, czego mi tu brakuje, to szersza dyskusja kosztu operacyjnego takiej architektury przy większej skali niż jedna strona produktowa, bo trzy modele na jedno zapytanie to nietrywialny narzut w realnym pipeline z tysiącami dokumentów dziennie.

**Link:** [You Cannot Filter Your Way Out of Prompt Injection](https://hackernoon.com/you-cannot-filter-your-way-out-of-prompt-injection)

## Adversarial machine learning, czyli jak oszukać AI

**TLDR:** Krótkie wprowadzenie do adversarial machine learning: atak na Face ID w iPhonie X za pomocą maski 3D, klasyczny przykład ze "adversarial panda" Iana Goodfellowa, oraz rozróżnienie na evasion attacks i data poisoning attacks, z przykładem chatbota Tay wytrenowanego przez użytkowników na rasistowskie treści.

**Summary:** Artykuł startuje od ataku badaczy z Wietnamu, którzy złamali Face ID drukowaną maską 3D, i przechodzi do wyjaśnienia adversarial machine learning jako odpowiednika optycznej iluzji, ale dla modeli, nie dla ludzkiego oka. Klasyczny przykład to niewielka perturbacja obrazu jabłka, niewidoczna dla człowieka, która sprawia, że model klasyfikuje je jako pomarańczę. Autor rozdziela to na dwie kategorie: evasion attacks, gdzie manipuluje się danymi wejściowymi w czasie inferencji, na przykład naklejką na znaku drogowym, która myli auto autonomiczne, i data poisoning attacks, gdzie zatruwa się dane treningowe, jak w przypadku chatbota Tay od Microsoftu, który w ciągu jednego dnia w 2016 roku został wytrenowany przez użytkowników Twittera na rasistowskie odpowiedzi.

Ostatnia część, o wykorzystaniu adversarial ML w testowaniu odporności systemów AI, jest najkrócsza i najbardziej ogólna, właściwie bez konkretnego przykładu metodologii testowej. Cały tekst czyta się jak solidne wprowadzenie z kursu wstępnego do bezpieczeństwa AI, nie jak nowy research czy case study z 2026 roku, i faktycznie na końcu jest dopisek "Also published here", co sugeruje, że to przedruk starszego materiału.

**Key takeaways:**
- Evasion attacks manipulują danymi wejściowymi w czasie inferencji (np. naklejka na znaku drogowym, maska 3D oszukująca Face ID), bez dotykania danych treningowych.
- Data poisoning attacks zatruwają dane treningowe, najbardziej znany przykład to chatbot Tay od Microsoftu wytrenowany przez użytkowników na treści rasistowskie w ciągu jednego dnia.
- Adversarial ML ma też zastosowanie defensywne, jako sposób testowania odporności modeli, choć artykuł traktuje ten temat bardzo pobieżnie.

**Why do I care:** To solidne wprowadzenie dla kogoś, kto nigdy o adversarial ML nie słyszał, ale dla kogoś, kto śledzi temat, nie ma tu nic nowego, przykłady z Face ID i Tay są już powszechnie znane i cytowane od lat. Doceniam prostotę wyjaśnienia evasion versus poisoning, bo to faktycznie dobry punkt wyjścia do rozmowy z osobami nietechnicznymi w zespole o tym, dlaczego "model działa na testach" nie znaczy "model jest bezpieczny w produkcji". Jako materiał do wykorzystania dziś wolałbym jednak połączyć go z czymś bardziej aktualnym, bo sam w sobie nie mówi nic o tym, jak te ataki wyglądają w kontekście dzisiejszych dużych modeli językowych czy agentów.

**Link:** [Adversarial Machine Learning and Its Role in Fooling AI](https://hackernoon.com/adversarial-machine-learning-and-its-role-in-fooling-ai-3z4k3447)
