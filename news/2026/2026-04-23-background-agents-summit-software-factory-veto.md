---
title: "Background Agents Summit, Software Factories i Veto — co się dzieje w świecie AI"
excerpt: "Przegląd najnowszych wiadomości: wirtualny summit o agentach w tle, tydzień budowania software factory od zera oraz nowe podejście do blokowania executables."
publishedAt: "2026-04-23"
slug: "background-agents-summit-software-factory-veto"
hashtags: "#ona #ai #agents #software-factory #aws #generated #pl"
source_pattern: "Ona newsletter"
---

## Background Agents Summit — Wirtualne Spotkanie o Infrastrukturze Agentów

**TLDR:** Stripe wysyła ponad 1000 PR-ów tygodniowo od agentów, Ramp przypisuje 30-50% wszystkich pull requestów agentom. Pierwszy wirtualny summit zgromadzi praktyków z Stripe, Harvey, Monzo, incident.io i innych firm, aby omówić architekturę, bezpieczeństwo i wzorce adopcji agentów w tle.

**Summary:** Społeczność inżynierów pracujących z agentami AI w tle zyskuje własne wydarzenie. Background Agents Virtual Summit, zaplanowany na 6 maja 2026 roku, to pierwsza tego rodzaju konferencja skupiająca praktyków z realnych wdrożeń. Stripe, znany ze swojej zaawansowanej infrastruktury developerskiej, będzie dzielić się doświadczeniami z budowania agentów operujących na 30-milionowej bazie kodu. Harvey przedstawi swoją platformę Spectre, która przenosi coding agents z indywidualnych laptopów do wspólnego cloud runtime z trwałymi uruchomieniami i piaskowym środowiskiem wykonawczym. Monzo opowie o swoich doświadczeniach, a incident.io zaprezentuje podejście do self-driving products. OpenAI spopularyzowało termin "harness engineering" - praca polegająca na kodowaniu najlepszych praktyk inżynierskich, aby agenci mogli autonomicznie prowadzić rozwój oprogramowania. StrongDM operacjonalizuje to w koncepcję "dark software factory", a Spotify wdrożyło floty agentów do koordynacji migracji legacy. Nowe podejścia do egzekwowania zasad na poziomie kernela również się pojawiają.

**Key takeaways:**
- Stripe generuje 1000+ PR-ów tygodniowo za pomocą agentów
- Pierwszy wirtualny summit skupia praktyków z Stripe, Harvey, Monzo i innych firm
- Termin "harness engineering" opisuje kodowanie najlepszych praktyk dla autonomicznych agentów
- Firmy budują własne "software factories" ale standaryzacja dopiero nadchodzi

**Why do I care:** Jako senior frontend developer i architekt, obserwuję jak granice między "copilotami" a "background agents" się zacierają. Moja firma również eksperymentuje z agentami, ale pytanie bezpieczeństwa i governance pozostaje otwarte. Jak zapewnić widoczność w wydatkach na tokeny? Jak rozwiązać problem autonomii agentów w świecie zbudowanym wokół tożsamości ludzkich? To pytania, na które każda organizacja odpowiada sama - i to jest problem. Potrzebujemy wspólnego playbooka, a ten summit może być pierwszym krokiem w tym kierunku.

**Link:** [Background Agents Summit](https://background-agents.com/summit)

## Call for Speakers — Zostań Prelegentem

**TLDR:** Background Agents Virtual Summit poszukuje prelegentów - praktyków z doświadczeniem w adopcji lub operowaniu agentami w tle wewnątrz organizacji. Nie przyjmowane są pitch'evendorów, a "failure stories" są równie mile widziane jak sukcesy.

**Summary:** Organizatorzy summitu jasno określili, czego szukają: praktyków końcowych, którzy mają doświadczenie z adopcją lub operowaniem background agents w swoich organizacjach. Pitch'e vendorów nie będą przyjmowane, co jest istotnym sygnałem - społeczność chce słyszeć o realnych doświadczeniach, nie marketingu narzędzi. Co ciekawe, organizatorzy zachęcają do dzielenia się historiami porażek, nie tylko sukcesami. To podejście "nie musisz mieć wszystkich odpowiedzi" może otworzyć scenę dla bardziej szczerych dyskusji o wyzwaniach. Deadline na zgłoszenia to 26 kwietnia 2026 roku, a sesje mogą być pre-recorded dla wygody prelegentów.

**Key takeaways:**
- Szukani są praktycy, nie vendorzy
- Historie porażek są mile widziane
- Deadline: 26 kwietnia 2026
- Sesje mogą być pre-recorded

**Why do I care:** branża potrzebuje więcej szczerości o tym, co nie działa. Konferencje pełne są success stories, ale prawdziwa wartość leży w omówieniu tego, co poszło nie tak. Jeśli pracujesz z agentami w tle i masz historię porażki do opowiedzenia - to jest moment, żeby się zgłosić. Społeczność zyska więcej na szczerej dysusji o wyzwaniach niż na kolejnym "how we scaled to 1000 PRs/day" talk.

**Link:** [Background Agents Virtual Summit: Call for Speakers](https://sessionize.com/background-agents-virtual-summit-2026)

## Software Factory — Tydzień 1, Od Zera do Produktu

**TLDR:** Ona dokumentuje publicznie budowanie software factory: puste repo do samodzielnie wysyłającego się produktu, codzienne livestreamy, zero ludzi piszących kod. Produkt to Memo, aplikacja do notatek w stylu Notion. W tydzień powstało 2577 uruchomień automatyzacji, 130+ PRów, 12202 linii kodu.

**Summary:** To fascynujący eksperyment, który warto obserwować. Ona, firma budująca platformę do autonomous software development, postanowiła pokazać proces budowania software factory w czasie rzeczywistym. Produkt Memo powstał bez ani jednej linii kodu napisanej przez człowieka. Automatyzacje przejęły cały SDLC: planowanie rozbija specyfikację na issue'y, build implementuje, review sprawdza każdy PR przed merge, verification testuje po deployment, operations monitoruje błędy w produkcji i wrzuca je z powrotem do build. Kluczowy insight z dnia trzeciego: "Think of agents like an afterburner you strap onto your organization. Either you withstand the acceleration or you come undone in midair." - mówi Christian Weichel, CTO Ona. Dzień piąty przyniósł ciekawą lekcję: COO firmy znalazł 12 bugów poprzez manualne testowanie, podczas gdy factory naprawiała zupełnie inne błędy przez Sentry. Factory widzi to, co crashuje. Nie widzi tego, co wygląda źle.

**Key takeaways:**
- 2577 automatyzacji wykonanych w 98.8% autonomicznie
- 130+ PRów zmergowanych, 12202 linii kodu
- 14 automatyzacji obsługuje cały SDLC
- Factory widzi crashuje, nie widzi UX problems

**Why do I care:** Jako architekt, widzę tu fundamentalne pytanie o przyszłość developmentu. Factory buduje szybciej niż możesz nią sterować - to dosłownie jeden z wniosków z dnia siódmego. Ale jakość ma sufit: automation sprawdza to, co może zmierzyć w kodzie, nie to, co widać używając produktu. To oznacza, że rola human shiftuje - nie znika. Dalej potrzebujemy ludzi do określania smaku, kierunku produktu i przeprojektowywania systemu gdy trafi na nową klasę błędów. Pytanie "co wybrać nie budować" staje się ważniejsze niż "co budować".

**Link:** [Software Factory](https://www.software-factory.dev/)

## Building a Software Factory: Week 1

**TLDR:** Szczegółowy raport z pierwszego tygodnia budowania software factory. Od pustego repo do działającego produktu z pełną automatyzacją SDLC. Kluczowe wnioski: prędkość nie jest bottleneckem, warstwa jakości czyni z agentów prawdziwą fabrykę, rola człowieka shiftuje ale nie kurczy się.

**Summary:** Raport podzielony jest na pięć dni, każdy z konkretnymi metrykami i wnioskami. Dzień pierwszy to definicja reguł: AGENTS.md jako plik mówiący każdemu agentowi jak się zachowywać, stack technologiczny (Next.js 16, Supabase, Sentry, Vercel), i zrozumienie że automation musi pokrywać każdy etap SDLC. Dzień drugi przyniósł pierwszy proof of concept: 17 PRów i 217 linii kodu w jeden dzień, plus pierwsza automatyzacja - PR Reviewer. Dzień trzeci to spektakularny wynik: 54 PRy i 7848 linii kodu, pełna aplikacja z auth, workspaces, editorem Lexical, wyszukiwaniem i importem/eksportem markdown. Dzień czwarty pokazał wnętrze: 14 automatyzacji w pięciu warstwach (Planning, Build, Quality, Verification, Operations), z realnym PR gdzie agenty same pisały, review'owały, rozwiązywały komentarze i mergowały. Dzień piąty przyniósł lekcję o quality: factory naprawia to co Sentry widzi (runtime errors), nie to co człowiek widzi (UX bugs).

**Key takeaways:**
- Specyfikacja określa jakość wyjściową - im precyzyjniejszy input, tym mniej ludzi musi łapać błędy na wyjściu
- Dwa loop automation: jeden tworzy pracę (planning, triage), drugi wykonuje (build, review, merge)
- Quality.md jako self-assessment file napędzający realne ulepszenia
- Human moving from writing code to designing the factory

**Why do I care:** To jest przyszłość, którą widzę w swojej organizacji. Ale widzę też pułapkę: "factory ships faster than you can steer it" to nie jest abstrakcja - to dosłownie problem, z którym mierzy się Ona. Jako architekt, muszę myśleć o feedback loops, quality gates, i smaku produktu w sposób, który nie wymaga manualnego code review. Ale też muszę zaakceptować, że nie wszystko da się zautomatyzować - szczególnie decyzje o tym, co NIE budować.

**Link:** [Building a software factory: Week 1](https://ona.com/stories/building-a-software-factory-week-1)

## Veto — Content-Addressable Enforcement

**TLDR:** Veto, system bezpieczeństwa od Ona, blokuje executables na podstawie ich zawartości (SHA-256 hash) na poziomie BPF LSM, przed execve. Nowość: bare names pozwalają wpisać tylko nazwę executable'a, a system sam znajduje wszystkie jego kopie w każdej warstwie (devcontainer, Docker-in-Docker).

**Summary:** W pierwszym poście Veto udowodnił model egzekwowania: content-addressable hashing na poziomie kernela, blokowanie execve zanim executable wystartuje, bez TOCTOU gap. Ale można zablokować tylko to, co się zahashowało. I tu pojawia się problem: agenci AI wprowadzają nowe executables, których deny list nigdy nie widziała. Blockujesz npx w /usr/local/bin/npx, ale w Docker-in-Docker ten sam npx żyje jako /usr/bin/npx. Różna ścieżka, różny build, różne bajty, różny hash. Veto nigdy go nie widziało, więc działa. Nowe rozwiązanie to "bare names" - wpisujesz tylko nazwę, np. "npx", bez ścieżki. BPF-based discovery agent skanuje devcontainer i każdy Docker-in-Docker container, znajduje każdy executable pasujący do tej nazwy, hashuje każdy i dodaje do enforcement map. Skan nie jest jednorazowy - agent obserwuje filesystem w real time. Instalujesz pakiet, tworzysz venv, ściągasz obraz - nowy npx pojawia się, jest hashowany, jest blokowany. Automatycznie.

**Key takeaways:**
- SHA-256 hash na poziomie BPF LSM blokuje przed execve
- Bare names = system sam znajduje wszystkie warianty executable'a
- Real-time filesystem watching
- Jeden wpis w deny list, pełne pokrycie wszystkich warstw

**Why do I care:** Security w świecie AI agents to obszar, który wymaga myślenia kilka kroków do przodu. Tradycyjne podejście "blokuj po ścieżce" nie działa, bo agent wprowadza dziesiątki nowych executables w różnych kontekstach. Veto pokazuje podejście, które myśli o tożsamości executable'a przez zawartość, nie lokalizację. Dla mojego teamu to inspiracja do przemyślenia naszego modelu security - nie "co uruchamiamy" ale "czym to jest", niezależnie gdzie się znajduje.

**Link:** [Veto finds the executables](https://ona.com/stories/veto-discovers-what-to-block)

## AWS Summit New York

**TLDR:** Bezpłatne jednodniowe wydarzenie AWS w Nowym Jorku, 17 czerwca 2026. Tematy: agentic AI, serverless computing, cloud migration, modernizacja infrastruktury. Keynote o 11:00-12:30, networking reception 17:00-18:00.

**Summary:** AWS Summit New York to coroczne wydarzenie skupiające społeczność cloud i AI. W tym roku główne tematy to agentic AI i serverless computing - nie zaskakuje to w kontekście trendów, które widzimy w całej branży. Agenda obejmuje keynota, sesje techniczne, interaktywne warsztaty i customer showcases. Event jest darmowy, co czyni go dostępnym dla szerokiego grona uczestników. Szczególnie interesujące mogą być sesje o modernizacji infrastruktury i optymalizacji AI przez infrastrukturę - tematy, które bezpośrednio dotykają wyzwań związanych z uruchamianiem agentów AI w produkcji. Networking reception daje okazję do wymiany doświadczeń z praktykami z różnych organizacji.

**Key takeaways:**
- 17 czerwca 2026, darmowy wstęp
- Tematy: agentic AI, serverless, cloud migration
- Keynote 11:00-12:30, networking 17:00-18:00
- Interaktywne warsztaty i customer showcases

**Why do I care:** Dla kogoś kto regularnie uczestniczy w takich wydarzeniach, AWS Summit New York może być wartościowy jako okazja do networkingu i poznania najnowszych podejść do AI w infrastrukturze. Ale szczerze? Po kilku latach uczestnictwa w tego typu eventach, większość informacji jest dostępna online. Kluczowe jest to, co dzieje się na sesjach o agentic AI - tam mogą pojawić się ciekawe case studies z realnych wdrożeń, które nie są jeszcze opublikowane w blog postach czy whitepaperach.

**Link:** [AWS Summit New York](https://aws.amazon.com/events/summits/new-york/)