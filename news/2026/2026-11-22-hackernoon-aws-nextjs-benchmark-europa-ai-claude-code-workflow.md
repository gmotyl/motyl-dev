---
title: "HackerNoon: benchmark czterech runtime'ów AWS dla Next.js, europejska zależność od AI i rok z Claude Code"
excerpt: "Pomiary Amplify, Lambdy, Web Functions i ECS dla jednej aplikacji Next.js, tekst o tym, czy Europa kontroluje AI, od którego zależy, oraz trzy osobiste historie o automatyzacji, synchronizacji plików i pracy z agentem."
publishedAt: "2026-11-21"
slug: "hackernoon-aws-nextjs-benchmark-europa-ai-claude-code-workflow"
hashtags: "#hackernoon #aws #nextjs #architecture #performance #ai #security #claude-code #agents #devops #workflow #generated #pl"
source_pattern: "HackerNoon"
---

## Benchmark AWS Amplify, Lambdy, Web Functions i ECS dla Next.js

**TLDR:** Jedna aplikacja Next.js, cztery runtime'y AWS w tym samym regionie i konkretne liczby, zamiast list funkcji. Pojedynczy kontener ECS był najszybszy na lekkich żądaniach i jedyny, który się przewrócił pod obciążeniem.

**Summary:** Autor wziął jedną aplikację i wdrożył ją na Amplify Hosting, klasycznej Lambdzie z Function URL, nowych Lambda Web Functions i ECS Fargate. Lambda i ECS używają dokładnie tego samego obrazu kontenera, a Web Function te same pliki spakowane do zipa. Mierzył opóźnienia pod obciążeniem 10, 50 i 200 żądań na sekundę, zimne starty, szybkość CPU, realne limity oraz miesięczny rachunek przy czterech poziomach ruchu.

Wyniki są mniej oczywiste, niż sugerują opisy usług. Jeden task Fargate z pół vCPU był najszybszy na lekkich zapytaniach, bo między load balancerem a rozgrzanym procesem Node'a nic nie siedzi. Przy 200 żądaniach na sekundę 29 procent odpowiedzi to były błędy, a ECS dwa razy wymieniał przeciążony task. Lambda, Web Functions i Amplify trzymały praktycznie te same opóźnienia od 10 do 200 żądań na sekundę, bez błędów. Autor zwraca uwagę, że health check dzielący CPU z pracą, którą sprawdza, potrafi zamienić przeciążenie w restart.

Web Functions miały najszybsze CPU, bo każde środowisko to dwa vCPU, i nie mają limitu 6 megabajtów na odpowiedź. Za to w teście kosztowały około czterokrotnie więcej niż klasyczna Lambda, bo bezczynne środowiska są rozliczane za pamięć. Aż 71 procent rachunku to była pamięć. Środowiska żyły jeszcze około pięciu minut po zakończeniu testu. Zimny start Lambdy to około sekundy, Amplify około dwóch, a ECS nie ma zimnych startów, ale skalowanie nowego taska zajmuje kilkadziesiąt sekund.

Limity często ważą więcej niż latencja. Amplify ucina każde żądanie po około 28 sekundach i każdą odpowiedź powyżej 6 megabajtów, klasyczna Lambda za Function URL też staje na 6 megabajtach, a ECS bez problemu oddał 20. Są też drobne pułapki, które kosztują czas. Zmienne środowiskowe w Amplify nie trafiają do kodu serwerowego bez przepisania ich do pliku podczas builda, a nowe konto miało limit współbieżności Lambdy ustawiony na 10 zamiast 1000.

Po stronie kosztów ECS z load balancerem ma podłogę około 57 dolarów miesięcznie, zanim przyjdzie pierwsze żądanie. Web Functions mają miękką podłogę rzędu 24 dolarów, o ile ruch utrzymuje jedno środowisko przy życiu. Klasyczna Lambda jest najtańsza aż do okolic 100 milionów żądań miesięcznie dla lekkiej aplikacji.

**Key takeaways:**
- Pojedynczy task ECS to stała ilość CPU, więc potrzebujesz co najmniej dwóch i autoskalowania.
- Limity czasu i rozmiaru odpowiedzi różnią się o rząd wielkości i często decydują bardziej niż latencja.
- Web Functions są szybkie na CPU, ale rachunek za bezczynną pamięć w teście zjadł przewagę.

**Why do I care:** Dla architekta to jeden z rzadkich tekstów, który zamiast sloganów daje skrypty i liczby, które można powtórzyć na własnej aplikacji. Zastrzeżenie jest jedno i autor sam je robi. Klient testowy siedział w Londynie, a aplikacja jest prosta, więc przy twoim ruchu, twoich zależnościach i twoich limitach wyniki mogą wyglądać inaczej. Traktuję to jako gotowy szablon pomiaru, nie jako wyrok. Szczególnie przydatne dla zespołów, które wybierają hosting dla Next.js na podstawie tego, co przeczytały w dokumentacji.

**Link:** [Benchmarking AWS Amplify, Lambda, Web Functions, and ECS for Next.js](https://hackernoon.com/benchmarking-aws-amplify-lambda-web-functions-and-ecs-for-nextjs)

## Demokracja Europy zagrożona, jeśli nie kontroluje AI, od którego zależy

**TLDR:** Europa ułatwia używanie danych osobowych do trenowania AI, ale sama nie ma modeli ani infrastruktury na odpowiednim poziomie. Autor przechodzi przez awarie chmury, polityczne blokady dostępu, cyberbezpieczeństwo i perswazję chatbotów, a na końcu proponuje plan B oparty na testach ciągłości działania.

**Summary:** Punktem wyjścia jest Digital Omnibus, czyli pakiet, który ma uprościć europejskie przepisy cyfrowe, w tym RODO. Rada UE uzgodniła stanowisko, w którym uzasadniony interes może być podstawą przetwarzania danych osobowych do rozwoju i używania modeli AI, z prawem sprzeciwu opartym na artykule 21 RODO. Autor zauważa niewygodny szczegół. Dane osoby, która się sprzeciwi, można wyłączyć przed treningiem, ale usunięcie wpływu danych z już wytrenowanego dużego modelu w weryfikowalny sposób to wciąż otwarty problem badawczy.

Potem idzie o zależności. Według danych ze Stanford AI Index w 2025 roku na USA przypadało 50 znaczących modeli, na Chiny 30, a na Europę dwa. Luka między najlepszym modelem amerykańskim a chińskim w rankingu Arena wynosiła w marcu 2026 tylko 2,7 procent, więc nie jest to sytuacja przesądzona. Europa ma swoje działania, jak konsorcjum EUROPA prowadzone przez Domyn i konkurs na gigafabryki AI, ale według autora tempo wciąż zostaje w tyle za frontem.

Najmocniejsza część to konkretne incydenty. Awaria DNS-ów DynamoDB w regionie us-east-1 w październiku 2025 sparaliżowała aplikacje na całym świecie. W czerwcu 2026 amerykańska dyrektywa o kontroli eksportu zmusiła Anthropic do wyłączenia modeli Fable 5 i Mythos 5 dla wszystkich klientów, bo nie dało się w czasie rzeczywistym zweryfikować obywatelstwa. Ograniczenia zdjęto 30 czerwca. Do tego zeznanie przedstawiciela Microsoftu France przed francuskim Senatem, że nie może zagwarantować, iż dane obywateli nie trafią do władz USA bez zgody francuskich, co wynika z CLOUD Act. W Niemczech 76 procent firm używających AI polega na ChatGPT, a żadna z ankietowanych nie raportowała Mistrala.

W cyberbezpieczeństwie model działa po obu stronach. Chińska grupa użyła Claude Code jako półautonomicznego agenta do ataków na około trzydzieści organizacji, a Mozilla naprawiła 271 podatności w jednym wydaniu Firefoxa dzięki modelowi z programu Glasswing. Incydent PHP2Shell, w którym wyciek szczegółów dzień przed łatkami podniósł liczbę prób ataku z tysięcy do milionów, autor porównuje do Heartbleed i Log4Shell. Wniosek jest taki, że dostęp do narzędzi obronnych zależy od programów prowadzonych przez amerykańskie firmy.

Osobny wątek to perswazja. Badania opublikowane w Nature i Science pokazały, że rozmowy z chatbotami przesuwały preferencje wyborców o około 10 punktów w Kanadzie i Polsce, a to, co zwiększało przekonywalność, zwiększało też liczbę nieprawdziwych twierdzeń. Autor łączy to z serwilizmem modeli, czyli skłonnością do mówienia użytkownikowi tego, co chce usłyszeć. Plan B proponuje trzy. Testy ciągłości działania dla modeli w usługach kluczowych, wzorowane na artykule 28 DORA, wspólny europejski model obronny dla zespołów cyberbezpieczeństwa i regularne, publiczne, niezależne audyty chatbotów pod kątem trafności, serwilizmu i perswazji.

**Key takeaways:**
- Ułatwienie dostępu do danych bez budowy własnych możliwości pogłębia zależność, a nie ją zmniejsza.
- Awarie bywają techniczne i polityczne, a europejski klient nie ma kontroli nad żadną z nich.
- Realna propozycja to ćwiczenia z wyłączeniem modelu i niezależne audyty, nie wyścig o najlepszy model.

**Why do I care:** To tekst bardziej o polityce i regulacjach niż o kodzie, ale developerzy powinni go znać, bo to wprost wpływa na decyzje architektoniczne. Jeśli twój produkt ma jednego dostawcę modelu i żadnej ścieżki awaryjnej, to z perspektywy tego artykułu masz dokładnie ten problem, tylko w małej skali. Autor jest niezłym analitykiem, ale lubi mocne tezy. Część przykładów, jak badania perswazji, ma sam zastrzeżenia metodologiczne, o których autor wspomina, a potem prowadzi wniosek mocniej, niż dane pozwalają. Czego brakuje, to kosztu planu B. Utrzymywanie drugiego modelu i regularne ćwiczenia z jego wyłączeniem kosztują, a tekst prawie tego nie liczy.

**Link:** [Europe's Democracy Is at Risk If It Cannot Control the AI It Depends On](https://hackernoon.com/europes-democracy-is-at-risk-if-it-cannot-control-the-ai-it-depends-on)

## Asystent AI, który robi pracę 2,3 osoby

**TLDR:** Założyciel społeczności inżynierskiej opisuje swoje 123 zaplanowane automatyzacje za 464 euro miesięcznie, które według jego szacunków oszczędzają 361 godzin pracy. W tym dzień, w którym około 70 procent zadań zrobiło się czerwone, i człowiek-asystentka, której nie zwolnił.

**Summary:** Autor ma dwadzieścia lat doświadczenia i był wiceprezesem do spraw inżynierii w Mews, więc sam zbudował infrastrukturę. Całość to 123 automatyzacje, zestaw umiejętności AI i panel, który nazywa Control Room. Według jego rachunku oszczędza to 361 godzin miesięcznie, czyli około 173 tysięcy euro rocznie w kosztach pracy, przy rocznym koszcie 5,6 tysiąca. To są szacunki, tylko trzy zadania opierają się na zmierzonym wolumenie, a reszta na godzinach, które autor oszacował sam. Najbardziej konserwatywna wersja to 176 godzin pracy, którą musiałby zlecić SDR-owi albo wirtualnej asystentce.

Najciekawsza jest część o porażkach. Jedno zadanie raportowało sukces przez 48 dni, mimo że jego klucz dostępu był odrzucany. Inne wysyłało wiadomości na LinkedInie w niedzielę, bo harmonogram był przesunięty o dzień. W końcu w październiku większość zadań zrobiła się czerwona, bo działały z lokalnego komputera, który nie był podłączony do prądu. Dziś większość jest w chmurze, a hourly watchdog traktuje milczące zadanie jako nieudane. Zadania dzielą się na te, które AI naprawia samo, te, które naprawia po akceptacji, i te, które czekają na człowieka. Nadawców wiadomości i finansów AI nie może ruszać samo, bo zły fix trafiłby do prawdziwych ludzi.

Druga lekcja jest nietechniczna. Automatyzacje działały, zanim AI wiedziało, dla jakiego biznesu pracuje. Poprawiło to dopiero spisanie niszy, idealnego klienta i wskaźników z celami i źródłami. System odmawia publikacji strumienia biznesowego, któremu tego brakuje. To jest, jak pisze autor, część bez inżyniera, to po prostu pisanie.

Są też przykłady konkretów. AI przeczytało 248 pozycji z wyciągów bankowych w dwóch firmach, dopasowało 163, a w 79 brakowało dokumentu. Znalazło fakturę zapłaconą dwa razy przez dwie własne firmy autora. Autor zwolnił też grafika, bo zestaw umiejętności projektowych zastąpił go przy stawce 1000 koron za godzinę. Zaznacza jednak, że to jeden biznes i jedna rola. Asystentkę Lucie zostawił, bo ona znajduje dokumenty, których AI nie umie znaleźć, i pilnuje jego samego.

**Key takeaways:**
- Alert na ciszę jest ważniejszy niż alert na błąd, bo wyłączony komputer nic nie zgłosi.
- AI pracuje dobrze dopiero wtedy, gdy ma spisane nisze, klientów i wskaźniki z celami i źródłami.
- Wersja hybrydowa, czyli AI do pracy powtarzalnej i człowiek do decyzji na miejscu, jest realna, ale kosztuje.

**Why do I care:** Tekst ma dużo liczb i to jego siła, ale trzeba czytać je ostrożnie. Większość oszczędności to szacunki godzin, a do kosztu nie wlicza się czasu budowy, który autor ocenia na weekend plus trzy do czterech tygodni dopracowywania. Najbardziej wartościowa jest dla mnie dojrzałość operacyjna, czyli rejestr zadań, właściciel, alert na ciszę i reguła wycofania zadania bez efektu. Dokładnie tak powinien wyglądać każdy zespół, który wdraża agentów. A sam autor przyznaje, że jego własny system spełnia ten standard tylko w kilku zadaniach na sto pięćdziesiąt.

**Link:** [How I Built an AI Executive Assistant That Does the Work of 2.3 People](https://hackernoon.com/how-i-built-an-ai-executive-assistant-that-does-the-work-of-23-people)

## Dlaczego porzuciłem Google Drive dla Syncthing i Tailscale

**TLDR:** Autor przeniósł bazę haseł KeePass z Google Drive na Syncthing działający w sieci Tailscale. Powód to niedziałająca synchronizacja iPhone'a i chęć odejścia od amerykańskich gigantów, a reszta plików na razie zostaje na Dysku.

**Summary:** Plik .kdbx to jeden zaszyfrowany blob zapisywany w całości przy każdej zmianie, edytowany na kilku urządzeniach, czasem offline. To najgorszy przypadek dla każdego narzędzia synchronizacji. Na Google Drive kopia na iPhonie co jakiś czas przestawała nadążać za laptopem. Autor podejrzewa, że KeePassXC zapisuje plik przez tymczasową kopię, usunięcie oryginału i zmianę nazwy, a Drive śledzi pliki po identyfikatorze, nie po nazwie. KeePassium wskazywał więc na usunięty plik, a ponowne dodanie bazy oznaczało ponowne odblokowanie jej fizycznym kluczem bezpieczeństwa. Dopiero przy pisaniu tekstu autor dowiedział się, że w KeePassXC jest tryb bezpiecznego zapisu, który to naprawia.

Syncthing to synchronizacja peer-to-peer, każde urządzenie ma identyfikator i udostępnia wybrane foldery wybranym urządzeniom. Normalnie korzysta z serwerów odkrywania i przekaźników projektu, a to oznacza, że trzecia strona zna adresy urządzeń. Skoro autor ma już Tailscale z trwałymi nazwami urządzeń, wyłączył globalne odkrywanie, przekaźniki i przechodzenie przez NAT. Topologia to gwiazda z NAS-em Synology w środku, bo to jedyne urządzenie, które nigdy nie śpi. Na NAS-ie Tailscale działa w trybie userspace, więc NAS przyjmuje połączenia, ale nie nawiązuje własnych, i każde urządzenie zna adres NAS-a, nie odwrotnie.

Na macOS wystarczy Homebrew, tylko trzeba pamiętać, że folder synchronizowany nie może leżeć w Dokumentach, bo usługa w tle dostaje odmowę dostępu. Na iOS nie ma oficjalnego klienta, więc autor używa Sync Anything, którego darmowa wersja obsługuje jeden folder i jedno zdalne urządzenie. Synchronizacja dzieje się, gdy aplikacja jest otwarta, więc autor musi pamiętać o jej uruchomieniu przed KeePassium. To nawyk, nie rozwiązanie. Sam przyznaje, że telefon nadal ogłasza się serwerom odkrywania i to jest wyciek, którego nie umiał zamknąć.

Uczciwie opisane są kompromisy. Konflikty tworzą pliki z dopiskiem sync-conflict, a KeePassXC umie scalić dwie bazy. Gdy NAS nie działa, nic się nie synchronizuje. A cztery identyczne kopie to nie jest backup, bo usunięcie lub uszkodzony zapis rozchodzą się do wszystkich w kilka sekund. Wersjonowanie na NAS-ie częściowo to łata, ale sam NAS nie ma kopii.

**Key takeaways:**
- Dla pojedynczego zaszyfrowanego pliku synchronizacja po nazwie i ścieżce jest bezpieczniejsza niż po identyfikatorze w chmurze.
- Syncthing przez Tailscale nie potrzebuje serwerów odkrywania ani przekaźników.
- Cztery zsynchronizowane kopie nie są backupem.

**Why do I care:** To raczej poradnik dla domowego laboratorium niż coś z codziennej pracy frontendowca, ale logika jest uniwersalna. Za każdym razem, gdy mówisz o prywatności i niezależności, policz, od kogo faktycznie się odłączasz. Autor sam pisze, że Tailscale to też trzecia strona, a telefon wciąż gada z serwerami odkrywania. To uczciwa, nie ideologiczna wersja suwerenności. Zabrakło mi jednej rzeczy. Jak wygląda realne odtworzenie po awarii NAS-a, bo bez próby odtworzenia nie wiadomo, czy to działa.

**Link:** [Why I Ditched Google Drive for Syncthing and Tailscale](https://hackernoon.com/why-i-ditched-google-drive-for-syncthing-and-tailscale)

## Mój workflow z Claude Code, czyli przebudowa strony w dwa dni

**TLDR:** Autor w dwa dni przebudował swoją stronę na Next.js 16, przepisał 228 wpisów i dobił do 543 testów, bez żadnego zepsutego URL-a. Wniosek jest taki, że koszt pisania kodu spadł prawie do zera, a koszt decydowania, co powinno istnieć, nie.

**Summary:** Autor zaczyna od zastrzeżenia, że 32 784 linie kodu to najmniej użyteczny fakt o projekcie. Zakres był konkretny. Przebudowa z Astro na Next.js 16 z Cache Components, lekki redesign, 228 wpisów przepisanych na podstawie danych o słowach kluczowych, 543 testy i wymóg, żeby każdy zaindeksowany adres dalej zwracał 200. Około 100 commitów i 11 pull requestów w dwa dni.

Praktyczne zasady, które z tego wyciągnął, są sensowne. Ograniczenia spisać, zanim napiszesz pierwszy prompt, bo agent chętnie złamie wszystko, o czym nie wspomniałeś. Testy traktować jak kontrakt, a każdy złapany błąd zamieniać w test, który by go wyłapał. Mergować małymi kawałkami, które da się przejrzeć. Audity robić w pętli, ale decyzję, które ustalenia są prawdziwe, zostawiać sobie. Równolegle delegować tylko to, co dotyka różnych plików.

Najlepsza historia to usunięcie. Rano 23 października autor miał publiczne API JSON z wersjonowaniem, nagłówkami deprecacji i specyfikacją OpenAPI, i to wszystko usunął, bo strona jest portfolio, a API generowało około 500 dodatkowych stron statycznych bez wartości dla SEO. Liczba stron spadła z 1093 do 596. Agent zbudował to szybko i dobrze, ale nie miał jak powiedzieć, że to w ogóle nie powinno istnieć.

Były też wpadki. Agent przekierował paginację bloga i zamienił ukryte strony projektów w 404, bo z punktu widzenia designu to miało sens, a z punktu widzenia SEO było błędem. Autor to złapał i dodał stałą regułę, żeby każdy URL, który serwuje produkcja, zostawał. Dane o słowach kluczowych kosztowały 4,37 dolara za 313 wywołań API i pokazały, że wiele wpisów miało dobrą treść, ale zły tytuł. Jedną frazę z około 720 wyszukiwań miesięcznie autor świadomie pominął, bo mu nie pasowała.

**Key takeaways:**
- Spisane ograniczenia i testy jako kontrakt czynią błędy agenta tanimi.
- Najlepszą zmianą projektu było usunięcie funkcji, której nikt nie potrzebował.
- Gdy generowanie jest prawie darmowe, wąskim gardłem stają się osąd, gust i dystrybucja.

**Why do I care:** Zgadzam się z tezą, że wąskie gardło przesunęło się z pisania na decydowanie i review. To samo widzę w zespołach, które dostały agentów. Warto jednak zadać pytanie, którego autor nie zadaje. To projekt jednej osoby, we własnym portfolio, z kompletną wiedzą o tym, co jest zaindeksowane. W zespole, gdzie wiedza o ograniczeniach jest rozproszona, spisanie ich przed pierwszym promptem jest dużo trudniejsze niż tu. A liczby typu "dwa dni zamiast tygodni" łatwo przeceniać, jeśli nie liczy się czasu, który to usunięte API kosztowało wcześniej.

**Link:** [My Claude Code Workflow: Lessons From Rebuilding a Website in Two Days](https://hackernoon.com/my-claude-code-workflow-lessons-from-rebuilding-a-website-in-two-days)
