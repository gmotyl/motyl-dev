---
title: "Cloud Agents w Kilo zyskują spersonalizowane tożsamości, inteligentniejsze profile i sesje niezależne od urządzenia"
excerpt: "Aktualizacja Cloud Agents w Kilo wprowadza przypisywanie autorstwa commitów do konta GitHub, profile środowisk per repozytorium, status PR w linii i synchronizację sesji zdalnych, dzięki czemu kodowanie z agentami przypomina bardziej współpracę niż automatyzację."
publishedAt: "2026-06-25"
slug: "kilo-cloud-agents-upgrade-github-authorship-profiles-remote-sessions"
hashtags: "#kilo #agents #devtools #github #developer-experience #ci-cd #remote-development #generated #pl"
source_pattern: "Kilo"
---

## Cloud Agents doczekały się poważnej aktualizacji

**TLDR:** Cloud Agents w Kilo teraz tworzą commity pod Twoją tożsamością GitHub, obsługują profile środowisk per repozytorium z własnymi serwerami MCP i umiejętnościami, a także synchronizują aktywne sesje między lokalną maszyną a dashboardem webowym. Te zmiany zacierają granicę między "botem działającym w Twoim imieniu" a "współpracownikiem, który bierze na siebie ciężką robotę."

**Podsumowanie:**

Jeśli kiedykolwiek spojrzałeś na PR i zobaczyłeś generyczny komunikat bota tam, gdzie powinno być Twoje imię, wiesz, jak to dezorientuje. Najnowsza aktualizacja Cloud Agents w Kilo rozwiązuje dokładnie ten problem. Gdy podłączysz swoje osobiste konto GitHub przez własną integrację, każdy commit i PR tworzony przez agenta pojawi się jako autorstwa Twojego, z Kilo wymienionym jako współautor. Twój graf aktywności uzupełnia się, właściciele kodu otrzymują prawidłowe powiadomienia, a recenzenci mogą prześledzić zmianę do osoby, która ją zleciła, bez żmudnego przekopywania się przez historię git. To niewielka zmiana o dużym znaczeniu społecznym, bo code review to ludzki proces, w którym tożsamość ma znaczenie.

Ulepszenia profili środowisk są naprawdę interesujące dla każdego, kto pracuje ze złożonymi konfiguracjami. Przed tą aktualizacją profile były globalnymi zbiorami zmiennych środowiskowych i sekretów. Teraz można w nich umieszczać niestandardowych agentów, umiejętności, serwery MCP i polecenia slash, a każdemu repozytorium można przypisać domyślny profil. Gdy sesja uruchamia się dla konkretnego repo, automatycznie ładuje odpowiednie narzędzia dla tego projektu. Bez ręcznego wybierania, bez debugowania "dlaczego ten serwer MCP jest niedostępny" na początku sesji. Agent już wie, jak ta konkretna baza kodu lubi pracować. To właśnie taki poziom szczegółów konfiguracyjnych odróżnia narzędzie, z którego korzystasz od czasu do czasu, od takiego, któremu ufasz przy poważnych zadaniach.

Widoczność statusu PR to poprawa jakości życia, która ma większe znaczenie, niż się wydaje. Wcześniej uruchamiałeś Cloud Agent, otwierał PR, a potem musiałeś przeskakiwać do GitHub, żeby sprawdzić, czy CI przeszło lub czy gałąź jest gotowa do scalenia. Teraz ten status jest widoczny bezpośrednio w dashboardzie Kilo, obok sesji, która stworzyła PR. Na pierwszy rzut oka wiesz, czy coś wymaga Twojej uwagi, czy agent już doprowadził sprawę do końca. To o jeden przełącznik kontekstu mniej na każde uruchomienie agenta, a przełączniki kontekstu sumują się.

Funkcja sesji zdalnych jest prawdopodobnie najbardziej ambitną częścią tej wersji. Włącz tryb zdalny w Kilo CLI, a Twoje aktywne lokalne sesje pojawią się w dashboardzie webowym tuż obok sesji chmurowych. Wiadomości i odpowiedzi synchronizują się w czasie rzeczywistym. Jeśli agent zadaje pytanie doprecyzowujące, trafi ono na jakiekolwiek urządzenie, z którego aktualnie korzystasz. Możesz zacząć coś na laptopie, zajrzeć ze smartfona, zamknąć laptopa i kontynuować tę samą sesję w środowisku chmurowym bez utraty stanu czy zaczynania od nowa. Obliczenia nadal odbywają się na Twojej maszynie, ale sesja jest naprawdę niezależna od urządzenia. Spędziłem sporo czasu zastanawiając się, co "agentowe" naprawdę oznacza w praktyce, i to jest konkretna odpowiedź: praca agenta persystuje ponad Twoim fizycznym kontekstem, nie tylko logicznym kontekstem zadania.

Zakwestionowałbym jednak narrację, że Cloud Agents są teraz "w pełni wyposażone i spersonalizowane od samego początku." System profili jest wyraźnie lepszy niż wcześniej, ale ciekawy tryb awarii to nadal ten, w którym agent pewnie robi złą rzecz z załadowanymi właściwymi narzędziami. Przypisywanie autorstwa jest znaczące, ale rodzi subtelne pytanie o odpowiedzialność: jeśli commit jest pod Twoim nazwiskiem, a agent napisał zły kod, sygnał w logu git jest teraz mylący. To kompromis wart trzeźwej oceny. Kilo rozwiązuje tarcia w przepływie pracy, które są realne, ale problem oceny wciąż należy do Ciebie.

**Kluczowe wnioski:**
- Commity Cloud Agent teraz noszą Twoją tożsamość GitHub zamiast generycznego przypisania bota, co ma znaczenie dla code review, grafów aktywności i sygnałów własności kodu.
- Profile środowisk obsługują teraz serwery MCP, niestandardowych agentów i polecenia slash, i mogą być przypisane per repozytorium, dzięki czemu każda sesja projektu startuje z odpowiednimi narzędziami już załadowanymi.
- Sesje zdalne łączą lokalne i chmurowe: zacznij sesję lokalnie, uzyskaj do niej dostęp z dowolnego miejsca przez dashboard webowy z synchronizacją wiadomości w czasie rzeczywistym, bez konieczności restartu.

**Dlaczego mnie to dotyczy:** Jako osoba pracująca na wielu maszynach i traktująca narzędzia agentowe jako pełnoprawnych współpracowników, synchronizacja sesji zdalnych to funkcja, z której faktycznie korzystałbym codziennie. Obsługa profili per repozytorium z serwerami MCP jest naprawdę przydatna dla projektów z określonymi wymaganiami dotyczącymi narzędzi. Kwestia autorstwa GitHub jest mieczem obosiecznym: zmniejsza tarcia w przepływach pracy zespołu, ale oznacza też, że jesteś teraz wskazanym autorem wszystkiego, co produkuje agent, co jest powodem do utrzymania rygorystycznego procesu review, a nie do rezygnacji z recenzowania. Każde narzędzie, które ułatwia szybsze dostarczanie kodu, ułatwia też szybsze dostarczanie problemów.

**Link:** [Cloud Agents Just Got a Major Upgrade](https://blog.kilo.ai/p/cloud-agents-upgrade)
