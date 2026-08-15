---
title: "HackerNoon: Jeff Dean odchodzi z Google, bańka CapEx na AI oraz walka o szybkie i bezpieczne wideo"
excerpt: "HackerNoon o odejściu Jeffa Deana z Google po 27 latach, o pękającym finansowaniu inwestycji w AI, o tym dlaczego AI nie powinno recenzować kodu napisanego przez AI, oraz jak Kinescope przesyła szyfrowane wideo z prędkością ponad 70 Gbps na serwer."
publishedAt: "2026-08-15"
slug: "hackernoon-jeff-dean-ai-capex-ktls-code-review"
hashtags: "#HackerNoon #AI #GoLang #Infrastruktura #Ekonomia #CodeReview #generated #pl"
---

## Kanon Jeffa Deana: 27 lat inżynierii w jednym czytniku

**TLDR:** Jeff Dean odchodzi z Google po 27 latach, żeby razem z Sanjayem Ghemawatem, Oriolem Vinyalsem i Quokiem Le założyć nową firmę, Discovery Loop. Zamiast laurki autor artykułu zebrał listę źródeł pierwotnych, papierów, wykładów i wywiadów, które pokazują, jak jedna osoba wpłynęła na architekturę współczesnych systemów rozproszonych i uczenia maszynowego.

**Podsumowanie:** Odejście Deana ogłoszono 5 sierpnia, a Sundar Pichai skomentował to krótko: po niesamowitych 27 latach Dean chce spróbować czegoś nowego. Artykuł zamiast peanów proponuje coś bardziej użytecznego, chronologiczny przegląd tekstów, które faktycznie warto przeczytać, każdy ze zweryfikowanym linkiem. Zaczyna się w 2003 roku od sześciostronicowego opisu architektury klastrów Google, czyli w praktyce definicji warehouse-scale computing, zanim ktokolwiek ukuł ten termin. Stamtąd prosta droga prowadzi do MapReduce z 2004 roku, tekstu, który w kilku stronach uruchomił całą falę Hadoopa i wszystkiego, co po nim przyszło.

Dalej robi się ciekawiej, bo autor pokazuje wyraźny zwrot w karierze Deana około 2012 roku, od systemów rozproszonych do uczenia maszynowego. DistBelief pozwolił trenować sieci z miliardem parametrów na tysiącach maszyn, co w praktyce narodziło Google Brain. Potem przychodzi word2vec, potem destylacja wiedzy w sieciach neuronowych z Geoffreyem Hintonem, osiem stron, które dziś stoją za każdym szybkim modelem produkcyjnym na świecie. Ten wątek zamyka się w erze frontier scale, czyli Pathways jako fundament pod trening modeli klasy PaLM i Gemini, oraz udział Deana jako lidera technicznego przy samym Gemini.

Najciekawszy dla mnie fragment to nie lista osiągnięć, tylko obserwacja autora o wzorcu myślenia Deana. W każdej erze znajdował konkretne miejsce, w którym warstwa systemowa stała się ograniczeniem dla postępu, i to miejsce usuwał: przetwarzanie wsadowe, magazyn danych, globalna spójność, ogonowe opóźnienia, trening rozproszony, obliczenia rzadkie, współprojektowanie akceleratorów. Zawsze ten sam ruch. Znaleźć, gdzie infrastruktura ogranicza ambicję, i tę granicę usunąć. To sprawia, że Discovery Loop, firma mająca zautomatyzować pełną pętlę eksperymentalną w nauce, przestaje wyglądać jak przypadkowy pomysł na emeryturę, a zaczyna wyglądać jak naturalna kontynuacja tego samego wzorca, tylko zastosowanego do samego procesu odkrywania naukowego.

Osobny akapit artykułu poświęcony jest anegdocie o "Jeff Dean Facts", żartobliwej stronie w stylu Chucka Norrisa, którą w 2008 roku zbudował Kenton Varda na prima aprilis. Dean namierzył autora w ciągu godziny czy dwóch, przeszukując wewnętrzne logi Borga. To drobny szczegół, ale dobrze pokazuje, że legenda i rzeczywistość akurat w tym przypadku się pokrywają.

**Kluczowe wnioski:**
- Dean odchodzi z Google po 27 latach, żeby współtworzyć Discovery Loop razem z Ghemawatem, Vinyalsem i Le.
- MapReduce, Bigtable i Spanner z lat 2004 do 2012 zbudowały fundamenty pod całą dzisiejszą infrastrukturę rozproszoną.
- Zwrot w stronę AI zaczął się od DistBelief w 2012 roku i doprowadził przez destylację wiedzy oraz mixture-of-experts aż do Pathways i Gemini.
- Powtarzający się wzorzec w karierze Deana to identyfikacja miejsca, w którym infrastruktura ogranicza postęp, i systematyczne usuwanie tego ograniczenia.

**Dlaczego mnie to obchodzi:** Ja korzystałem z pochodnych pracy Deana codziennie przez większość kariery, nawet o tym nie myśląc, każdy framework do przetwarzania danych, każda baza kluczowo-wartościowa, każdy model embeddingów gdzieś tam ma ślad tych papierów. To co mnie urzeka w tym artykule to nie sama lista, tylko uczciwość w podejściu: zamiast opowiadać historię, autor daje źródła i pozwala czytelnikowi samemu ocenić wagę tej pracy. W czasach, gdy większość treści o odejściach dużych nazwisk z Big Techu to czysty PR, taki tekst wygląda niemal jak akt oporu.

**Link:** [The Jeff Dean Canon](https://hackernoon.com/the-jeff-dean-canon)

---

## Bańka na CapEx AI uderza w ścianę fizyki

**TLDR:** Autor argumentuje, że gigantyczne wydatki kapitałowe hiperskalerów na infrastrukturę AI zaczynają się rozjeżdżać z fizyczną i finansową rzeczywistością, od limitów sieci energetycznej po zapadające się finansowanie kołowe między Nvidią, Oracle'em i OpenAI. Wskazuje na spadek zainteresowania obligacjami hiperskalerów oraz rosnące ryzyko dla funduszy emerytalnych ulokowanych pasywnie w indeksach zdominowanych przez te same spółki.

**Podsumowanie:** Artykuł zaczyna od prostego, brutalnego stwierdzenia, że trenowanie dużego modelu językowego to nie jest problem matematyczny, tylko problem logistyki przemysłowej. Żeby przenieść dane między tysiącami GPU, potrzeba sieci szybszej niż cokolwiek, co znały tradycyjne architektury chmurowe, a to prowadzi wprost do gigawatowych centrów danych, które nie mieszczą się już w lokalnych sieciach energetycznych bez ryzyka przeciążenia całego regionu. Autor przywołuje Power Usage Effectiveness jako miarę tego, ile prądu pochłania samo chłodzenie, i pokazuje, że nawet przy dobrze zoptymalizowanym PUE skala zużycia wody i energii w tych obiektach jest absurdalna.

Drugi wątek dotyczy sieci InfiniBand, wskrzeszonego standardu z lat 90., który wraca jako konieczność, bo zwykły Ethernet gubi pakiety pod dużym obciążeniem, a jeden zgubiony pakiet potrafi zamrozić tysiące czekających GPU. To prowadzi do kosztownego wyścigu po transceivery 800-gigabitowe i kabel światłowodowy, którego całkowity koszt zaczyna konkurować z samym kosztem układów obliczeniowych.

Najbardziej zapada w pamięć część o finansowaniu kołowym. Hiperskaler inwestuje pół miliarda dolarów w startup AI pod warunkiem, że startup natychmiast odda te pieniądze za zakup mocy obliczeniowej od tego samego hiperskalera. Obie strony księgują wzrost przychodów, Nvidia księguje sprzedaż, a realna wartość nigdzie nie powstaje. Autor porównuje to wprost do wymiany przepustowości ciemnego światłowodu między Global Crossing a Enronem sprzed lat, co dla mnie było zaskakująco trafnym odniesieniem historycznym. Do tego dochodzi model shadow bankingu, w którym firmy jak CoreWeave zastawiają fizyczne układy H100 jako zabezpieczenie długu, mimo że te układy tracą wartość równie szybko jak kontenery żeglugowe w połowie lat 2000., gdy nadpodaż zdemolowała ich cenę odsprzedaży o 70 procent.

Na koniec pojawia się konkretna liczba, która daje temu tekstowi twardy grunt pod nogami: subskrypcja obligacji hiperskalerów spadła z pięciokrotnego przekrycia popytu w lutym 2026 do zaledwie 1,6-krotnego w lipcu tego samego roku. Autor cytuje też obniżkę ratingu Oracle do BBB-, przy czym OpenAI odpowiada za mniej więcej połowę zaległego backlogu tej firmy. To już nie jest spekulacja, to konkretny sygnał z rynku kredytowego.

**Kluczowe wnioski:**
- Fizyczne limity sieci energetycznej i chłodzenia zaczynają ograniczać tempo budowy centrów danych AI szybciej, niż zakładały prognozy inwestycyjne.
- Finansowanie kołowe między hiperskalerami, dostawcami chipów i startupami AI księguje wzrost przychodów bez realnej wartości ekonomicznej.
- Zastaw fizycznych GPU jako zabezpieczenie miliardowego długu (model CoreWeave) niesie ryzyko podobne do kryzysu kontenerowego z połowy lat 2000.
- Subskrypcja obligacji hiperskalerów spadła z 5x do 1,6x między lutym a lipcem 2026, co sygnalizuje zamykanie się okna finansowania.

**Dlaczego mnie to obchodzi:** Jako ktoś, kto na co dzień pracuje z narzędziami AI w codziennej pracy programistycznej, mam mieszane uczucia co do tego artykułu. Ton jest miejscami przesadzony, porównania są dobrane pod tezę, a autor wyraźnie ma już wyrobione zdanie zanim zaczął pisać. Ale liczby dotyczące subskrypcji obligacji i koncentracji ryzyka w portfelach emerytalnych są prawdziwe i warto je znać, niezależnie od tego, czy zgadzasz się z resztą narracji. Jeśli firmy zaczną anulować subskrypcje asystentów AI, bo nie widzą zwrotu z inwestycji, to będzie miało realny wpływ na to, jakie narzędzia będziemy mieć dostępne za dwa lata, i to akurat mnie interesuje bardziej niż los funduszy emerytalnych.

**Link:** [The AI CapEx Bubble Is Hitting a Physical Wall](https://hackernoon.com/the-ai-capex-bubble-is-hitting-a-physical-wall)

---

## Dlaczego AI nie powinno recenzować kodu napisanego przez AI

**TLDR:** Badania SonarSource z początku 2026 roku pokazują, że 96 procent programistów nie ufa w pełni poprawności kodu generowanego przez AI, a mimo to tylko 48 procent konsekwentnie go weryfikuje przed commitem. Artykuł nazywa tę różnicę luką weryfikacyjną i pokazuje, dlaczego automatyczne testy pisane przez ten sam model, który napisał kod, nie rozwiązują problemu.

**Podsumowanie:** Punktem wyjścia jest ankieta obejmująca ponad 1100 programistów: AI generuje już 42 procent commitowanego kodu, a prognoza na 2027 rok mówi o 65 procentach. Jednocześnie niemal wszyscy deklarują brak zaufania do tego kodu. Autor tłumaczy tę sprzeczność w sposób, który mnie przekonał: kod generowany przez duże modele językowe wygląda profesjonalnie, ma poprawne wcięcia, sensowne nazwy, docstringi na miejscu, więc przechodzi to, co artykuł nazywa testem na pierwszy rzut oka. Pod presją terminu programista po prostu klika commit, mimo że w głębi duszy nie ufa temu, co właśnie zatwierdził.

Ciekawsza część dotyczy tego, co autor nazywa długiem zrozumienia. Kiedy piszesz kod sam, zrozumienie powstaje razem z tworzeniem, budujesz w głowie mapę konsekwencji każdej decyzji. Kiedy kod pisze za ciebie agent, tę mapę musisz odtworzyć później, podczas review, i jeśli tego nie zrobisz, prowadzisz w praktyce codebase, którego nikt nie rozumie. Dane z raportu GitClear potwierdzają to z drugiej strony: duplikacja kodu rośnie nawet czterokrotnie, bo modele nie mają globalnej świadomości projektu i wolą napisać funkcję pomocniczą od nowa, niż znaleźć istniejącą.

Najbardziej wartościowy fragment dla mnie to opis pułapki tautologii przy automatycznym testowaniu. Jeśli ten sam model pisze implementację i testy do niej, to testy nie dowodzą, że kod działa, dowodzą tylko, że generator jest wewnętrznie spójny sam ze sobą. Model popełnia subtelny błąd logiczny, na przykład błąd o jeden w warunku brzegowym przy naliczaniu opłat, a potem pisze test, który ten sam błędny warunek po prostu potwierdza. Test przechodzi ze stuprocentowym pokryciem, a logika biznesowa jest złamana.

Rozwiązania, które proponuje artykuł, są konkretne i praktyczne, a nie tylko postulatywne: testowanie oparte na właściwościach zamiast sztywnych przypadków, mutation testing jako sposób sprawdzenia, czy testy w ogóle są w stanie wykryć błąd, oraz asymetryczna krytyka, czyli osobne modele wyspecjalizowane wyłącznie w wyszukiwaniu defektów, niezależne od modelu, który pisał kod. Meta robi to na dużą skalę przez system Automated Compliance Hardening, generując mutanty i sprawdzając, czy testy je wyłapują.

**Kluczowe wnioski:**
- 96 procent programistów nie ufa w pełni kodowi generowanemu przez AI, ale tylko 48 procent konsekwentnie go weryfikuje przed commitem.
- Testy pisane przez ten sam model, który wygenerował implementację, potwierdzają wewnętrzną spójność generatora, a nie poprawność logiki biznesowej.
- Duplikacja kodu w projektach z dużym udziałem AI rośnie nawet czterokrotnie, bo modele nie widzą całego kontekstu repozytorium.
- Skuteczne strategie to testowanie oparte na właściwościach, mutation testing oraz oddzielne modele krytyczne niezależne od modelu piszącego kod.

**Dlaczego mnie to obchodzi:** To jest dokładnie problem, z którym się teraz mierzę przy code review w moim zespole. Widziałem PR-y, które wyglądały nienagannie, przechodziły wszystkie testy, a mimo to zawierały logikę, która nie miała sensu biznesowego, bo test i implementacja pochodziły z tej samej sesji tego samego modelu. Argument o rozdzieleniu roli generatora i krytyka wydaje mi się jedynym rozsądnym kierunkiem, ESLint i TypeScript nie stały się gorsze tylko dlatego, że mamy teraz agentów, wręcz przeciwnie, deterministyczne bramki zyskują na znaczeniu, bo są jedynym punktem odniesienia, który nie halucynuje.

**Link:** [Engineering Teams Are Struggling to Verify AI-Generated Code at Scale](https://hackernoon.com/engineering-teams-are-struggling-to-verify-ai-generated-code-at-scale)

---

## Jak serwować szyfrowane wideo z prędkością 70+ Gbps na jednym serwerze

**TLDR:** Zespół Kinescope, platformy do przechowywania i dostarczania wideo, opisuje, jak przenieśli szyfrowanie TLS z przestrzeni użytkownika do jądra Linuksa (kTLS) i połączyli to z zero-copy w Go, żeby osiągnąć ponad 70 Gbps ruchu wideo na jednym serwerze 1U. Po drodze znaleźli też, że domyślne certyfikaty RSA od Let's Encrypt kosztowały ich sekundy na każdym handshake'u.

**Podsumowanie:** Kinescope prowadzi własny CDN napisany w Go i szybko zderzył się z brutalną prawdą, że HTTPS nie jest darmowy, zwłaszcza przy setkach tysięcy żądań na sekundę. Autor od razu punktuje popularne szacunki, że szyfrowanie kosztuje jeden do dwóch procent CPU, jako bezużyteczne, bo mierzone na cudzym obciążeniu i cudzym sprzęcie. Ich własny pomiar wyszedł zupełnie inaczej. Zresztą pokazuje to też opisany incydent: dodanie obsługi ChaCha20 zepsuło wykrywanie sprzętowego wsparcia dla AES, więc serwery zaczęły szyfrować ChaCha20 nawet tam, gdzie AES było dostępne za darmo sprzętowo, CPU poszybowało w górę, a szafy w serwerowni zbliżyły się do limitu poboru mocy.

Rdzeniem tekstu jest jednak techniczne wyjaśnienie kTLS, czyli przeniesienia szyfrowania TLS z przestrzeni użytkownika do jądra systemu. Normalnie dane muszą przekroczyć granicę między jądrem a przestrzenią użytkownika, żeby zostać zaszyfrowane, co jest kosztowne. Zero-copy w Go, przez interfejs ReadFrom i wywołania systemowe splice oraz sendfile, pozwala ominąć tę granicę dla zwykłych danych, ale TLS to psuje, bo payload musi zostać zaszyfrowany właśnie w przestrzeni użytkownika. Rozwiązaniem jest przekazanie kluczy szyfrujących bezpośrednio do jądra przez setsockopt, po czym socket zachowuje się jak zwykły, a write, sendfile i splice znów działają transparentnie. Autor pokazuje nawet fragmenty kodu patcha do standardowej biblioteki Go, co dla mnie jako czytelnika było najbardziej przekonującym dowodem, że to nie jest teoretyczna dywagacja, tylko coś faktycznie wdrożonego na produkcji.

Zaskakująco duża część oszczędności wcale nie wzięła się z kTLS, tylko z drobnego niedopatrzenia przy certyfikatach. Let's Encrypt domyślnie wydaje certyfikaty RSA, a RSA jest po prostu wolniejsze od ECDSA przy podpisywaniu, w Go różnica jest szczególnie duża. Zamiana jednego typu certyfikatu na drugi skróciła czas podpisu z 1,6 sekundy do 40 milisekund, a cały handshake przyspieszył około czterokrotnie. To jest ten rodzaj drobnej zmiany, która nie wymaga żadnej nowej architektury, tylko uważności.

Ostatni ciekawy wątek dotyczy odnawiania sesji TLS w środowisku z wieloma serwerami za tym samym adresem anycast. Każdy serwer ma swój własny kontekst sesji, więc żądania trafiające na różne maszyny łamią mechanizm wznawiania sesji, co przy dużych wydarzeniach na żywo ze 100 do 150 tysiącami widzów zaczyna być widoczne w metrykach. Rozwiązaniem jest synchronizacja jednego wspólnego klucza sesji między wszystkimi serwerami, co brzmi banalnie, ale wymagało zrozumienia całego łańcucha przyczynowego, żeby w ogóle zauważyć problem.

**Kluczowe wnioski:**
- kTLS przenosi szyfrowanie TLS z przestrzeni użytkownika do jądra Linuksa, co pozwala połączyć je z zero-copy i ominąć kosztowne kopiowanie danych między przestrzeniami.
- Zamiana domyślnych certyfikatów RSA od Let's Encrypt na ECDSA skróciła czas podpisu z 1,6 sekundy do 40 milisekund i przyspieszyła handshake około czterokrotnie.
- Synchronizacja wspólnego klucza sesji między wieloma serwerami za tym samym adresem anycast jest konieczna, żeby wznawianie sesji TLS w ogóle działało przy dużym ruchu.
- Efekt końcowy to ponad 70 Gbps szyfrowanego wideo na jednym serwerze 1U, na sprzęcie znacznie tańszym niż konkurencyjne konfiguracje oparte na AMD EPYC.

**Dlaczego mnie to obchodzi:** To jest dokładnie ten rodzaj artykułu, który lubię najbardziej, konkretne liczby, fragmenty kodu, opis błędów po drodze zamiast wyłącznie sukcesu. Rzadko na co dzień schodzę tak nisko w stos sieciowy jako deweloper frontendu, ale rozumienie, że HTTPS ma realny koszt CPU, a nie jest magicznym przełącznikiem w konfiguracji, zmienia sposób, w jaki myślę o architekturze systemów, z którymi pracuję. Szczególnie podoba mi się historia z certyfikatem RSA, bo pokazuje coś, co widuję regularnie: najdroższe problemy wydajnościowe często nie są w skomplikowanej logice, tylko w domyślnych ustawieniach, których nikt nie zakwestionował.

**Link:** [How we Serve Encrypted Video at 70+ Gbps Per Server With go and kTLS](https://hackernoon.com/how-we-serve-encrypted-video-at-70-gbps-per-server-with-go-and-ktls)
