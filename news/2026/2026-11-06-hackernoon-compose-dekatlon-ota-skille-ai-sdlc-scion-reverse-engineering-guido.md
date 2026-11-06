---
title: "HackerNoon: Docker Compose pod produkcję, dekatlon modeli, OTA za 8 tysięcy dolarów, skille dla agentów, AI-SDLC, koniec klienta Gita i Guido van Rossum"
excerpt: "Utwardzanie stosu Compose, turniej pięciu modeli z opisanymi zastrzeżeniami, koszt własnych aktualizacji OTA dla 100 milionów użytkowników, kolekcja 49 skilli, pięć lekcji AI-SDLC, Scion i Origin oraz AI do inżynierii wstecznej."
publishedAt: "2026-11-06"
slug: "hackernoon-compose-dekatlon-ota-skille-ai-sdlc-scion-reverse-engineering-guido"
hashtags: "#hackernoon #docker #security #devops #ai #agents #git #architecture #python #generated #pl"
source_pattern: "HackerNoon"
---

## Docker Compose v2 pod produkcję

**TLDR:** Samo restart always nie jest strategią odporności. Artykuł bierze stos z Nginxem, FastAPI, PostgreSQL 16 i Redisem 7 i utwardza kolejno start, sieć, sekrety i limity zasobów.

**Summary:** Typowy plik Compose działa na laptopie i zawodzi na cztery przewidywalne sposoby. Krótka forma depends_on czeka tylko na start kontenera, więc API próbuje połączyć się z bazą w trakcie inicjalizacji. Migracje uruchamiane przy starcie ścigają się, gdy działają dwie repliki. Płaska sieć publikuje Redisa na wszystkich interfejsach hosta, a hasło leży jawnie w pliku i w wyniku docker inspect.

Poprawki są konkretne. Długa forma depends_on pozwala czekać na zdrowie zależności albo na pomyślne zakończenie jednorazowego zadania, więc migracja staje się osobną usługą, od której zależy aplikacja. Autor zwraca uwagę na drobiazg. Sonda zdrowia Postgresa musi iść po TCP na 127.0.0.1, bo podczas pierwszego startu serwer tymczasowy słucha tylko na gnieździe uniksowym i sonda przez gniazdo może zgłosić gotowość za wcześnie.

Sieć dzieli się na dwie. W strefie dmz jest tylko Nginx i aplikacja, a Postgres z Redisem leżą w sieci wewnętrznej bez trasy na zewnątrz. Hasła przenosi się do sekretów montowanych w katalogu run secrets. Jest też pułapka. Poza Swarmem sekrety z plików to zwykłe bind mounty i opcje uid, gid oraz mode są po cichu ignorowane, więc o dostępie decydują uprawnienia pliku na hoście.

Na końcu limity procesora, pamięci i liczby procesów, użytkownik bez uprawnień roota, system plików tylko do odczytu i zrzucenie wszystkich capabilities. Katalog danych Postgresa jako bind mount z właścicielem root zabije pierwszy start. Całość da się sprawdzić kilkoma poleceniami i autor radzi dodać trzy pierwsze do CI.

Czego brakuje? Nic o backupach, rotacji sekretów i monitoringu. To jest utwardzanie jednej maszyny, nie odpowiedź na pytanie o wysoką dostępność.

**Key takeaways:**
- Używaj warunków service healthy i service completed successfully zamiast samego startu.
- Dziel sieć na dmz i wewnętrzną, bez portów na hoście dla baz.
- Sekrety montuj jako pliki, ale pamiętaj o uprawnieniach z hosta.
- Ustaw limity zasobów i użytkownika bez uprawnień roota.

**Why do I care:** Każdy zespół frontendowy z własnym środowiskiem staging na Compose ma co najmniej trzy z tych czterech problemów. Zacznij od healthchecków i osobnej usługi migracji, bo to daje najwięcej za najmniej pracy.

**Link:** [Hardening Production Multi-Container Topologies with Docker Compose v2](https://hackernoon.com/hardening-production-multi-container-topologies-with-docker-compose-v2)

## Dekatlon pięciu modeli i zastrzeżenia, które są częścią wyniku

**TLDR:** Organizator platformy Bottle puścił pięciu uczestników przez dziesięć gier po pięć meczów. Wygrał Muse Control z 565 punktami, o 7,5 punktu przed dwoma remisującymi.

**Summary:** Gry obejmowały nawigację po trasach, aukcje, budowanie programów, negocjacje koalicji i sterowanie orbitą. Każdy uczestnik przeszedł przez każde miejsce przy stole. Chat GP-TKO i Gemini Twinfinite zajęli drugie miejsce z 557,5, Claude Nine miał 495, a Grok Solid 325.

Najciekawsza jest uczciwość opisu. Odnotowano 47 przegranych przez usterki w 250 występach, a nieudane wywołania dostawców nie były powtarzane. Wynik mierzy więc cały zestaw agent plus usługa, a nie czyste rozumowanie. W trakcie turnieju zmieniano warunki. Od szóstej gry zmniejszono rozumowanie Anthropic, od gry 21 wszyscy dostali średnie rozumowanie, a od 27 obowiązywał pięciominutowy limit wywołania. Znany koszt to około 304,78 dolara, ale 26 wywołań nie miało ceny, więc to nie jest pełna suma.

Autor sam pisze, że to turniej prowadzony przez operatora, a nie niezależne badanie. Dodałbym, że wygrana o 7,5 punktu przy tych zmianach warunków nie jest rankingiem modeli.

**Key takeaways:**
- Muse Control wygrał z 565 punktami, przewaga to 7,5.
- Przegrane przez usterki usług wpływają na wynik.
- Warunki zmieniano w trakcie turnieju.
- Znany koszt to około 304,78 dolara, ale niepełny.

**Why do I care:** Dobry wzorzec, jak opisywać benchmarki. Zanim zaufasz liście wyników, sprawdź, czy ktoś zapisał, co zmieniono w trakcie.

**Link:** [I Ran Five Frontier Models Through a 50-Match Decathlon](https://hackernoon.com/i-ran-five-frontier-models-through-a-50-match-decathlon-the-winner-wasnt-the-whole-story)

## Ile kosztuje własny serwer aktualizacji OTA dla 100 milionów użytkowników

**TLDR:** Hosting Codemagic Patch kosztuje 12 dolarów miesięcznie przy 10 tysiącach użytkowników, 63 przy milionie i około 8093 przy stu milionach, z czego 7250 to licencja.

**Summary:** Urządzenia nie uderzają w serwer po aktualizacje. Sprawdzenie to pliki meta i manifest leżące w magazynie obiektów za CDN, więc serwer przyjmuje tylko raporty metryk. Przy założeniu, że jedna czwarta użytkowników otwiera aplikację dziennie, daje to około 300 raportów na sekundę, a przy skupieniu w ośmiu godzinach około 1000.

Infrastruktura to dwie maszyny po 2 vCPU i 8 GiB, load balancer, zarządzany Postgres 800 GiB z kopią zapasową i węzeł rezerwowy. Razem 843 dolary. Transfer nic nie kosztuje, bo około petabajta miesięcznie idzie z Cloudflare i R2 z darmowym egressem. Autor wylicza też, czego nie trzeba, czyli kolejki, Redisa, Kubernetesa i autoskalowania. Test pokazał 750 zdarzeń na sekundę na podstawowym Postgresie i 4000 po zapisie wsadowym.

To tekst z pogranicza reklamy, bo pisze go producent narzędzia. Liczby są jednak konkretne i dają się sprawdzić na własnym przypadku.

**Key takeaways:**
- Urządzenia pobierają aktualizacje z CDN, nie z serwera.
- Około 843 dolary infrastruktury i 7250 licencji przy 100 milionach.
- Rolowanie 50 milionów wierszy trwa około 25 minut.

**Why do I care:** Jeśli płacisz za Expo Updates albo podobną usługę, masz teraz punkt odniesienia. Przy małej skali własny hosting nie ma sensu, ale przy milionie użytkowników 63 dolary wyglądają inaczej.

**Link:** [How Much Does it Cost to Self-Host OTA Updates for 100 Million Users?](https://hackernoon.com/how-much-does-it-cost-to-self-host-ota-updates-for-100-million-users)

## Awesome Agent Skills, 49 procedur dla agentów

**TLDR:** Kolekcja 49 skilli zamienia powtarzalne zadania inżynierskie, od review po audyt dokumentacji, w procedury z oczekiwanym wynikiem. Najlepiej pasuje do utrzymania istniejącego produktu.

**Summary:** Każdy skill to folder z plikiem SKILL.md i ewentualnymi materiałami, bez skryptów. Skille uzupełniają AGENTS.md i CLAUDE.md, które trzymają stałe reguły projektu, a skill daje metodę na konkretną robotę. Trzy założenia odróżniają kolekcję. Znaleziska muszą mieć dowód w kodzie lub poleceniu, badanie jest oddzielone od naprawy, a raport mówi, czego nie sprawdzono.

Autor porównuje kolekcję z Superpowers, ECC, zestawem Matta Pocock, Addy'ego Osmaniego i Trail of Bits. Uczciwie przyznaje, że nie ma wyników pokazujących, że ta kolekcja naprawia więcej błędów. Radzi sprawdzić ją na znajomym zadaniu i ocenić dowody, zbędne edycje i zużyty kontekst. Kolekcję napisał ten sam autor, który ją opisuje, więc to też trochę prezentacja własnego projektu.

**Key takeaways:**
- 49 skilli w formacie SKILL.md, bez skryptów.
- Raporty muszą mieć dowody i opisane ograniczenia.
- Brak wyników porównawczych z innymi zestawami.

**Why do I care:** Wybierz jedno powtarzalne zadanie, na przykład audyt README względem kodu, i uruchom odpowiedni skill na jednym repozytorium. Dopiero po tym warto instalować więcej.

**Link:** [Awesome Agent Skills: 49 Skills for Better AI-Assisted Coding](https://hackernoon.com/awesome-agent-skills-49-skills-for-better-ai-assisted-coding)

## Pięć lekcji AI-SDLC dla zespołów DevSecFinOps

**TLDR:** W korporacji problemem nie jest już szybkość pisania, tylko utrata kontekstu, rachunki za tokeny i niekontrolowani agenci.

**Summary:** Autor zaczyna od długu poznawczego. Agent wstawia setki linii, testy przechodzą, programista klika approve, bo śledzenie logiki męczy. W efekcie zespół składa się z kruchych ekspertów. Jego zespół zaczął wymagać ręcznego prześledzenia logiki AI, a PR bez opisu architektonicznego "dlaczego" nie jest scalany.

Druga lekcja to FinOps. Jedno złożone zadanie wieloagentowe potrafi zużyć tysiąc razy więcej tokenów niż zwykły prompt, więc zużycie tokenów jest metryką pierwszej kategorii, z budżetami i twardymi limitami. Trzecia dotyczy topologii agentów, gdzie autor stawia na drzewiastą, bo hub z jednym centrum się dławi, a peer-to-peer daje szum. Czwarta zastępuje bramki fazowe żywymi hakami na wejściu, wyjściu i przed wywołaniem narzędzia, z automatycznym SBOM w CI. Piąta mówi, że rygor przesuwa się wcześniej, a zespół ma zabroniony cognitive outsourcing, choć cognitive offloading jest dozwolone.

Autor opisuje to jako doświadczenie własnego zespołu, ale nie podaje żadnych liczb ani nazwy firmy. To raczej lista przekonań niż dowód. Hierarchia agentów jako najlepsza topologia to deklaracja bez porównania.

**Key takeaways:**
- Dług poznawczy zastępuje dług techniczny jako główne ryzyko.
- Zużycie tokenów trzeba mierzyć jak koszt infrastruktury.
- Żywe haki na wejściu, wyjściu i przed wywołaniem narzędzia zastępują bramki fazowe przed wydaniem.

**Why do I care:** Z tych pięciu najbardziej praktyczna jest zasada opisu "dlaczego" w PR. Jeśli autor PR nie potrafi wyjaśnić decyzji, review nie ma czego sprawdzać.

**Link:** [Architecting AI-SDLC: Five Lessons For DevSecFinOps Teams](https://hackernoon.com/architecting-ai-sdlc-five-lessons-for-devsecfinops-teams)

## Agenci zabijają klienta Gita, nie Gita

**TLDR:** Długi raport twierdzi, że Git zostanie jako protokół, ale model klienta traci centralną rolę, a wartość przechodzi na serwer. Dowodem są Scion od Anthropic i Origin od Cursora.

**Summary:** Anthropic opisał 13 października system Scion, który zastąpił Gita w całym monorepo. Dzienna liczba merge'y wzrosła z około 2500 w maju do ponad 30 tysięcy we wrześniu, a siedmiu inżynierów przeprowadziło migrację w pięć miesięcy. Zasady Sciona odwracają założenia Gita. Klienci są zawsze online, serwer liczy, a kopia robocza jest opcjonalna. Według raportu infrastruktura jest około 200 razy mniejsza, a checkouty w CI trwają sekundy zamiast minut.

Cursor Origin zachowuje Git jako protokół, ale atakuje GitHuba od strony agentów, bo edytor, agenci chmurowi, stacked PR i merge queue są w jednym miejscu. Wystartował 18 sierpnia, w dniu wielogodzinnej awarii GitHuba. Origin nie ma publicznych repozytoriów ani CI i jest związany z kontem Cursora.

Wnioski autora dzielą się na progi. Poniżej około 100 inżynierów Git na hostowanym forge zostaje bez zmian. Od 100 do 2000 Git zostaje, ale serwer za nim ma liczyć diff, blame i merge. Powyżej 2000 albo przy ponad 5000 merge'y dziennie własny system staje się racjonalny. Anthropic sam mówi, że Scion nie jest zamiennikiem Gita dla ogółu.

Warto zachować dystans. Raport jest długi i zawiera prognozy na trzy do pięciu lat podane pewnie, choć opiera się głównie na jednym przypadku z najbardziej agentowej firmy świata. Autor sam wymienia to jako ryzyko.

**Key takeaways:**
- Scion zastąpił Gita w monorepo Anthropic w pięć miesięcy siedmioma inżynierami.
- Origin to atak na GitHuba od strony agentów, a nie na protokół.
- Dla większości firm rozwiązaniem są API po stronie serwera za frontem Gita.
- Raport opiera się na jednym przypadku.

**Why do I care:** Dla zespołu poniżej setki osób nic się nie zmienia, poza tym, że forge dostanie funkcje dla agentów. Warto jednak liczyć, jaką część checkoutów w CI robią maszyny. Jeśli większość, pełny klon to zbędny koszt.

**Link:** [AI Agents Are Killing the Git Client, Not Git](https://hackernoon.com/ai-agents-are-killing-the-git-client-not-git-what-anthropics-scion-and-cursors-origin-show)

## Czy oprogramowanie umarło? AI i inżynieria wsteczna

**TLDR:** REA, serwer MCP łączący agentów z Ghidrą i IDA, dostał ponad 100 tysięcy gwiazdek w tydzień. Autor sprawdza, ile jest w tym prawdy.

**Summary:** REA nie jest nową technologią, tylko obniżeniem progu wejścia, bo projekty łączące AI z Ghidrą istniały od roku. Sam README mówi, że nie odtwarza kodu źródłowego ani nie klonuje aplikacji automatycznie. Najgłośniejszy przypadek to ArtCraft Brandona Thomasa, który ogłosił darmowe rebuildy aplikacji Adobe i pakietu biurowego w Rust. Użył zwykłego Claude Code, a repozytoria zabraniają AI czytać i kopiować kod oryginałów, więc to podejście typu clean room. Projekty są w wersji alfa, a w jednym teście tylko 5 z 30 filtrów dawało wynik zgodny z Photoshopem.

Plusy według autora to szybsza analiza malware, presja na ceny i kontrakty, ochrona zabytkowego oprogramowania i przesunięcie przewagi na dane, integracje i zaufanie. Minusy to piractwo i wezwania do usunięcia, mniej miejsc do ukrycia luk i niejasny status prawny, bo model trenowany na publicznym kodzie nie jest oczywiście czysty. Autor sprawdził też wątek regulacji i nie znalazł dowodu, że lobbing jest reakcją na REA. Rekordowe wydatki idą na kształt przepisów o centrach danych i testowaniu modeli.

Wniosek jest rozsądny. Nie umarło oprogramowanie, tylko pomysł, że zbudowane ekrany są fosą.

**Key takeaways:**
- REA obniża próg wejścia, ale nie wymyśla nowej techniki.
- ArtCraft to alfa i clean room z ograniczeniami dla agenta.
- Status prawny AI jako clean room jest nierozstrzygnięty.
- Przewaga przesuwa się na dane, integracje i zaufanie.

**Why do I care:** Zadaj sobie pytanie, czego konkurent z agentem nie odtworzy w trzy miesiące. Jeśli odpowiedź to "funkcje", czas na rozmowę o strategii. Warto też spisać, co wolno czytać twojemu agentowi, jak w ArtCraft.

**Link:** [Is Software Really Dead? The Rise of AI-Powered Reverse Engineering](https://hackernoon.com/is-software-really-dead-the-rise-of-ai-powered-reverse-engineering)

## Guido van Rossum i zmęczenie dyktatora

**TLDR:** Długi esej opowiada, jak spór o operator walrus, czyli PEP 572, w 2018 roku doprowadził Guido van Rossuma do rezygnacji z roli BDFL.

**Summary:** Python powstał podczas świąt w Amsterdamie w 1989 roku, z żalu po języku ABC. Zakład Guida był prosty, że kod czyta się częściej, niż pisze, więc wcięcia są częścią składni. Rola dyktatora rosła razem ze społecznością. Po przejściu na Pythona 3, które trwało dekadę, i po lawinie e-maili o operatorze przypisania w wyrażeniach zaakceptował PEP 572 jedenastego lipca 2018, a następnego ranka napisał, że jest zmęczony i potrzebuje bardzo długiej przerwy.

Najciekawsza część dotyczy tego, co po nim. Nie wyznaczył następcy, więc deweloperzy napisali siedem propozycji, a w grudniu 2018 wybrali PEP 13 z pięcioosobową Radą Sterującą. Żadna firma nie może mieć w niej więcej niż dwóch członków, a istnieje głosowanie wotum nieufności. Rada przeszła próbę przy dopasowywaniu wzorców, a potem przy opcjonalnym GIL w PEP 703. Esej kończy się wątkiem, że oprogramowanie nie ma układu nerwowego, a ludzie tak.

Autor zaznacza, że to narracyjna nonfikcja z wyobrażonymi scenami. Warto o tym pamiętać, bo opis stanu emocjonalnego jest interpretacją, a nie faktem z archiwum.

**Key takeaways:**
- Rezygnacja nastąpiła dzień po akceptacji PEP 572.
- PEP 13 stworzył pięcioosobową Radę Sterującą z limitem pracodawców.
- Rada przeprowadziła większe zmiany niż walrus, bez wypalenia jednej osoby.

**Why do I care:** To lekcja dla każdego maintainera i lidera zespołu. Jeśli wszystkie decyzje przechodzą przez jedną osobę, ta osoba jest pojedynczym punktem awarii, i warto spisać zasady podejmowania decyzji, zanim komuś zabraknie sił.

**Link:** [Guido van Rossum: The Rise and Fall of Python's Benevolent Dictator](https://hackernoon.com/guido-van-rossum-the-rise-and-fall-of-pythons-benevolent-dictator)
