---
title: "Lightning bez zaufania, Rovo z dziurą i Kubernetes, który się mści: przegląd HackerNoon z 10 sierpnia 2026"
excerpt: "HTLC w Lightning Network, prompt injection w Atlassian Rovo, testowanie agentów głosowych, siedem incydentów na Kubernetesie, PubDown do pisania książek jak kodu, homelabowy KVM bez V i M, oraz to, jak nie robić PR-u przy starcie produktu Web3."
publishedAt: 2026-08-11
slug: "hackernoon-2026-08-10-htlc-rovo-kubernetes-pubdown-picotty"
hashtags:
  - "#hackernoon"
  - "#tech"
  - "#kubernetes"
  - "#cybersecurity"
  - "#bitcoin"
  - "#promptengineering"
  - "#devtools"
  - "#generated"
  - "#pl"
source_pattern: "HackerNoon"
---

## HTLC: jak Lightning Network przesyła pieniądze między nieznajomymi

**TLDR:** Artykuł wyjaśnia, jak Hashed Timelock Contracts pozwalają węzłom Lightning Network przekazywać płatności przez łańcuch zupełnie obcych sobie osób, bez konieczności ufania żadnej z nich. Sekret znany tylko odbiorcy, jego hash rozsyłany w fakturze i kaskada terminów ważności sprawiają, że nikt po drodze nie może ani ukraść pieniędzy, ani zablokować ich na zawsze.

**Summary:** Autor zaczyna od scenariusza znanego z Nigerii: sieci padają, banki nie działają, a jedynym sposobem przesłania pieniędzy jest wręczenie gotówki komuś jadącemu w tę samą stronę i licznie na to, że dowiezie ją do celu. Ten obrazek staje się punktem wyjścia do wyjaśnienia, dlaczego routing płatności w Lightning Network jest dokładnie tym samym problemem, tylko rozciągniętym na miliony nieznających się ludzi. Rozwiązaniem jest Hashed Timelock Contract, czyli HTLC, które łączy dwa mechanizmy: hashlock i timelock.

Odbiorca płatności generuje losowy sekret, oblicza jego hash i wysyła nadawcy tylko ten hash w fakturze. Płatność wędrująca przez sieć nie mówi już "zapłać Karolowi", mówi "zapłać temu, kto pokaże wartość, która hashuje się do tej liczby". Węzeł pośredniczący może przenosić taką płatność dalej, ale nie może jej przejąć, bo nie zna sekretu. Timelock dodaje drugi element układanki: jeśli sekret nie zostanie ujawniony w określonym czasie, środki wracają do nadawcy. Bez tego mechanizmu zablokowana płatność mogłaby wisieć w nieskończoność.

Najciekawszy fragment tekstu dotyczy tego, jak te dwa mechanizmy współpracują w łańcuchu wielu węzłów. Każdy hop dostaje własny HTLC z tym samym hashem, ale z coraz dłuższym terminem ważności w stronę nadawcy. Gdy odbiorca ujawnia sekret na końcu łańcucha, informacja płynie do tyłu, węzeł po węźle, aż dotrze do nadawcy. Różnica w terminach ważności między kolejnymi hopami jest tym, co gwarantuje, że węzeł pośredniczący zawsze ma czas na odebranie zwrotu, zanim jego własne zobowiązanie wygaśnie. Autor tłumaczy to razem ze skryptami Bitcoin Script, mechanizmem rewokacji przy nieuczciwym broadcastowaniu starej transakcji commitmentu i onion routingiem, który chowa trasę płatności przed każdym pośredniczącym węzłem.

Cały artykuł jest właściwie długim wywodem na temat tego, że zaufanie można zastąpić konstrukcją, która usuwa okazję do oszustwa, zamiast liczyć na uczciwość uczestników. To jest dokładnie odwrotne podejście do tego, jak działają tradycyjne systemy płatności, gdzie ktoś musi zaręczyć za wszystkich.

**Key takeaways:**
- HTLC łączy hashlock (kto może odebrać płatność) i timelock (ile czasu na to ma), więc żadny z tych mechanizmów samodzielnie nie wystarcza.
- Każdy hop na trasie płatności dostaje własny HTLC z tym samym hashem, ale z krótszym terminem ważności niż poprzedni hop w stronę nadawcy, co daje węzłom pośredniczącym bezpieczny margines czasowy.
- Bezpieczeństwo nie opiera się na obietnicy między nadawcą a pośrednikiem, tylko na tym, że warunki HTLC są zapisane w commitment transaction i wykonywane przez sam Bitcoin.
- Onion routing chowa trasę płatności, więc żaden węzeł pośredniczący nie wie, kto jest nadawcą, odbiorcą, ani ile jeszcze hopów zostało do celu.
- Mechanizm rewokacji karze węzeł, który próbuje oszukać, publikując starą wersję transakcji commitmentu, dając drugiej stronie prawo do zabrania całości środków.

**Why do I care:** Ten artykuł podoba mi się z jednego konkretnego powodu, jest to rzadki przykład tekstu technicznego, który tłumaczy protokół przez to, jaki problem zaufania rozwiązuje, a nie przez listę funkcji kryptograficznych do wyklepania. W codziennej pracy frontendowej rzadko dotykamy Script czy commitment transactions, ale wzorzec "usuń okazję do oszustwa, zamiast liczyć na uczciwość" powtarza się wszędzie, gdzie projektujemy systemy rozproszone albo integracje między firmami, które sobie nie ufają. Kiedy następny raz ktoś zaproponuje rozwiązanie oparte na "zaufaniu do partnera API", warto zapytać, czy nie da się tego zaufania po prostu zaprojektować na wylot, tak jak robi to Lightning.

**Link:** [HTLCs: How Lightning Moves Money Through Strangers](https://hackernoon.com/htlcs-how-lightning-moves-money-through-strangers)

## RovoBlast: jak jedno kliknięcie zmusiło asystenta AI Atlassiana do wycieku danych

**TLDR:** Varonis Threat Labs znalazł w Atlassian Rovo dziurę o nazwie RovoBlast, w której jeden link z odpowiednim parametrem wstrzykuje instrukcje prosto do sesji czatu użytkownika, bez żadnego jailbreaku i bez ostrzeżenia. W połączeniu z wbudowanym agentem do research'u internetowego dawało to gotowy kanał eksfiltracji danych z Jiry, Confluence, Slacka, Google Workspace i innych podłączonych systemów.

**Summary:** Rovo to "AI teammate" Atlassiana, który spina wyszukiwanie, czat i agentowe akcje w Jirze, Confluence i połączonych aplikacjach SaaS przez tak zwany Teamwork Graph. Badacze odkryli, że parametr rovoChatPrompt w linku do czatu Rovo trafia bezpośrednio do treści rozmowy, więc samo kliknięcie linku wstrzykuje atakującemu przygotowaną instrukcję do zaufanej sesji użytkownika. To wariant znanego już problemu Parameter to Prompt, wcześniej znalezionego przez tę samą grupę w Copilocie pod nazwą Reprompt.

Po uzyskaniu kontroli nad sesją badacze po prostu zapytali Rovo, do jakich źródeł danych ma dostęp, i dostali szczerą, wyczerpującą listę: Jira, Confluence, Bitbucket, Slack, Microsoft 365, Google Workspace, bazy relacyjne, wgrane pliki, strony internetowe i archiwa, a dzięki konektorom Rovo lista rozszerza się na ponad pięćdziesiąt platform. Żadnego jailbreaku, żadnego obejścia filtra, po prostu odpowiedź na uprzejme pytanie.

Kluczowym elementem układanki był agent ResearchAgent, opisany jako narzędzie do "głębokiego wieloźródłowego researchu w internecie" z możliwością wieloetapowego przechodzenia po dowolnych stronach. W praktyce oznaczało to, że wstrzyknięta instrukcja mogła kazać Rovo wyciągnąć dane z wewnętrznych systemów i opublikować je jako część "researchu" na zewnętrznej stronie, wszystko bez dodatkowej interakcji użytkownika poza pierwszym kliknięciem. Autorzy nazywają ten wzorzec Enter, Evade, Escape: dane wchodzą jako treść, która później jest interpretowana jako komenda, kontrole bezpieczeństwa są omijane albo po prostu ich nie ma, a na końcu dane wychodzą przez jakiś zaufany kanał, niekoniecznie przez bezpośredni dostęp do internetu.

Atlassian naprawił problem po odpowiedzialnym zgłoszeniu, ale artykuł kończy się mocną konkluzją: Rovo nie da się w pełni odinstalować z organizacji, więc powierzchnia ataku pozostaje, nawet jeśli konkretna dziura zostanie zaklejona. Rekomendacje są dość przyziemne, ograniczyć zasięg asystenta, wyłączyć niepotrzebne konektory i agenty przeglądające internet, monitorować logi.

**Key takeaways:**
- Parametr rovoChatPrompt w linku wstrzykiwał treść bezpośrednio do sesji czatu Rovo bez żadnego ostrzeżenia czy potwierdzenia.
- Rovo bez oporu wylistowało wszystkie podłączone źródła danych na proste pytanie, bez potrzeby jailbreaku.
- ResearchAgent, wbudowany agent do przeglądania internetu, zamieniał wstrzykniętą instrukcję w gotowy kanał eksfiltracji danych na zewnątrz.
- Model Enter, Evade, Escape opisuje ten sam wzorzec ataku niezależnie od konkretnej platformy AI, nie zawsze wymaga bezpośredniego dostępu do internetu.
- Rovo nie można w pełni usunąć z organizacji, więc realną obroną jest ograniczenie zakresu dostępu i wyłączenie zbędnych automatyzacji, a nie liczenie na to, że dziura się nie powtórzy.

**Why do I care:** To jest dokładnie ten typ ryzyka, o którym większość zespołów produktowych nie myśli, dopóki nie przeczyta takiego raportu. Podłączenie asystenta AI do Jiry, Confluence i Slacka wygląda na oczywisty krok w stronę produktywności, ale każdy taki konektor to nowa granica zaufania, którą ktoś musi zaprojektować, a nie tylko włączyć jednym kliknięciem w panelu administracyjnym. Jeśli w twojej firmie ktoś rozważa włączenie podobnego asystenta z dostępem do wewnętrznych systemów, zanim ktoś zapyta "czy to bezpieczne", ktoś inny powinien już mieć odpowiedź na pytanie "co konkretnie ten agent może przeczytać, dokąd może to wysłać, i kto to monitoruje".

**Link:** [RovoBlast: How One Click Triggered Atlassian's AI Assistant to Leak Data](https://hackernoon.com/rovoblast-how-one-click-triggered-atlassians-ai-assistant-to-leak-data)

## Books as Code: pisanie i wydawanie książek przez Markdown i Git

**TLDR:** Autor, po wydaniu swojej pierwszej książki przez Amazon KDP, zbudował PubDown, prosty zestaw skryptów, który zamienia projekt złożony z plików Markdown i YAML w gotowe do wydania PDF-y i EPUB-y. Cała idea polega na tym, żeby traktować książkę jak repozytorium kodu, z pełną historią w Git, branchami i pull requestami przy współpracy z redaktorami.

**Summary:** Punktem wyjścia był całkiem konkretny problem: autor chciał przetłumaczyć swoją książkę na niemiecki, ale narzędzie, którego użył do angielskiej wersji, Reedsy Book Editor, nie było wygodne do tego konkretnego zadania. Wcześniej zbudował już SceneDown, narzędzie do generowania wideo z plików Markdown, i zauważył, że podejście "projekt jako zwykłe pliki tekstowe pod kontrolą wersji" działa świetnie dla treści, które normalnie kojarzą się z narzędziami zamkniętymi i binarnymi. Naturalnym pytaniem było, czy to samo da się zrobić dla książek.

Struktura projektu w PubDown jest uparcie prosta. Rozdziały to zwykłe pliki Markdown, plik book.yaml opisuje, jak te rozdziały składają się w części i sekcje frontmatter oraz backmatter, a meta.yaml trzyma metadane wydawnicze, tytuł, autora, język, informacje o prawach autorskich, a nawet osobne dedykacje dla wersji papierowej i elektronicznej. Każdy rozdział musi zaczynać się nagłówkiem najwyższego poziomu, bo to on staje się tytułem w spisie treści, a obrazki wstawia się zwyczajnym markdownowym składnią z plikami w katalogu assets.

Budowanie książki sprowadza się do jednej komendy skryptu powłoki, która generuje PDF i EPUB w katalogu dist, gotowe do wgrania na Amazon KDP, Lulu, Google Play Books czy Apple Books. Dla osób, które wolą pisać w Wordzie, dołączony jest importer DOCX, wykorzystujący hierarchię nagłówków dokumentu do automatycznego podziału na części i rozdziały, wraz ze specjalnymi sekcjami na frontmatter i backmatter.

Cały pomysł stoi na tym, że skoro treść jest czystym tekstem bez żadnego zamkniętego formatu binarnego, cały projekt można commitować, różnicować, rozgałęziać i scalać tak samo jak kod. Wielu autorów mogłoby pracować na różnych rozdziałach równolegle, redaktorzy recenzować zmiany przez pull requesty, a eksperymentalne przepisania żyć bezpiecznie na osobnych branchach do czasu, aż będą gotowe do scalenia. Narzędzie jest open source na licencji MIT.

**Key takeaways:**
- PubDown traktuje książkę jako katalog plików Markdown i YAML, więc cały projekt można trzymać w Git z pełną historią zmian.
- book.yaml opisuje strukturę książki (frontmatter, części, backmatter), a meta.yaml trzyma metadane wydawnicze, w tym osobne dedykacje dla wersji papierowej i elektronicznej.
- Importer DOCX pozwala zacząć od gotowego manuskryptu w Wordzie i automatycznie zbudować z niego projekt Markdown na podstawie hierarchii nagłówków.
- Jedna komenda skryptu buduje jednocześnie PDF i EPUB gotowe do wgrania na platformy wydawnicze.
- Podejście otwiera drogę do współpracy przez branch i pull request, podobnej do tej znanej z pracy nad kodem, dla wielu autorów i redaktorów jednocześnie.

**Why do I care:** To jest ten typ narzędzia, który przypomina, że "treat X as code" jest wzorcem uniwersalnym, nie ograniczonym do infrastruktury czy konfiguracji. Skoro traktujemy infrastrukturę jako kod i dokumentację jako kod, nie ma żadnego dobrego powodu, żeby książka musiała żyć w zamkniętym formacie edytora, którego historia zmian kończy się na "cofnij". Jedyne ryzyko, jakie widzę, to że narzędzia budowane pod jeden konkretny projekt autora czasem zostają na tym etapie, bez API stabilnego na tyle, żeby ktoś inny mógł je bezpiecznie rozbudować, ale sam fakt, że ktoś to spróbował i podzielił się kodem na MIT, jest wystarczającym powodem, żeby to sprawdzić, zanim ktokolwiek płaci za kolejne zamknięte narzędzie do składu książek.

**Link:** [Books as Code: Writing and Publishing Books with Markdown and Git](https://hackernoon.com/books-as-code-writing-and-publishing-books-with-markdown-and-git)

## Najlepsze narzędzia do ewaluacji i testowania agentów głosowych w 2026

**TLDR:** Artykuł porządkuje rynek narzędzi do testowania agentów głosowych na trzy poziomy: komercyjne platformy budowane specjalnie pod voice (Coval, Hamming AI, Cekura, Maxim AI, Roark), ogólne narzędzia do ewaluacji LLM rozciągające się na voice (Braintrust, Confident AI, Langfuse, Arize Phoenix) i darmowe otwarte benchmarki (Pipecat od Daily, benchmark Covala, Hugging Face Open ASR). Główna teza jest prosta: zanim wybierzesz narzędzie, wybierz metryki, i zacznij od sprawdzenia warstwy speech-to-text, bo to jedyna warstwa, której błędy są niewidoczne w samym tekście transkrypcji.

**Summary:** Autor zaczyna od bolesnej prawdy branżowej: demo agenta głosowego zawsze działa, bo demo dzieje się w cichym pokoju z jasną wymową. Prawdziwy telefon, z hałasem tła, akcentem i kodem konta wyklikanym w pośpiechu, to inna historia, a różnica między "działa w demo" a "działa na czterotysięcznym telefonie" jest właśnie tym, co ewaluacja agentów głosowych ma za zadanie zamknąć. Problem jest o tyle trudniejszy niż przy agentach tekstowych, że voice to cały pipeline, speech-to-text słyszy rozmówcę, LLM decyduje co robić, text-to-speech odpowiada, a detekcja końca wypowiedzi decyduje, kiedy przestać słuchać, i błąd w każdym z tych ogniw kumuluje się w sposób, którego jedna liczba dokładności nigdy nie pokaże.

Najważniejszy fragment tekstu to rekomendacja dwóch metryk zamiast klasycznego word error rate. Semantic WER liczy tylko te błędy transkrypcji, które realnie zmieniają rozumienie tekstu przez model, a nie każdą pomyłkę w przecinku czy formie "gonna" kontra "going to". Time to final segment, a zwłaszcza jego percentyl 95, mierzy jak długo po tym, jak rozmówca skończy mówić, agent czeka na finalny tekst, bo to właśnie ogon rozkładu, nie mediana, rozwala poczucie naturalności rozmowy. Do tego dochodzą sukces wywołań narzędzi, ukończenie zadania jako ostateczna metryka wynikowa, i jakość wykrywania końca tury rozmowy.

Trzy poziomy narzędzi odpowiadają na różne pytania. Platformy komercyjne jak Coval czy Hamming symulują tysiące scenariuszy rozmów i testują agenta pod kątem regresji zanim zrobi to prawdziwy klient, Cekura i Roark idą od strony realnego ruchu produkcyjnego, łapiąc przypadki, których nikt by nie wymyślił w symulacji. Ogólne narzędzia do ewaluacji LLM dają śledzenie i regresję dla całego agenta, ale metryki specyficzne dla voice, jak detekcja tury rozmowy czy dokładność ważona po entity, trzeba do nich dobudować samemu.

Najbardziej konkretna liczba w całym artykule dotyczy dokładności na tokenach niosących znaczenie, imionach, numerach telefonów, kodach konta. Ogólny WER chowa te błędy wśród łatwych słów, a rozstrzał jest ogromny, od około 15% błędu entity u liderów rankingu do ponad 50% u niektórych powszechnie używanych modeli. To jest różnica między agentem, który zapisze poprawny numer rezerwacji, a takim, który zapisze coś, co brzmi podobnie.

**Key takeaways:**
- Voice agent trzeba ewaluować jako cały pipeline (STT, LLM, TTS, detekcja tury), nie jako pojedynczy model z jedną metryką dokładności.
- Semantic WER liczy tylko błędy zmieniające zrozumienie tekstu przez LLM, w przeciwieństwie do klasycznego WER, który karze też nieistotne różnice.
- Time to final segment z uwzględnieniem percentyla 95 mówi więcej o odczuwanej responsywności rozmowy niż mediana czasu odpowiedzi.
- Otwarte benchmarki (Pipecat od Daily, benchmark Covala, Hugging Face Open ASR) są darmowym pierwszym krokiem, żeby sprawdzić jakość warstwy STT przed inwestycją w płatną platformę.
- Dokładność na tokenach entity (imiona, numery, kody) jest lepszym sygnałem jakości niż ogólny word error rate, bo to właśnie te tokeny psują wykonanie zadania.

**Why do I care:** To jest jeden z niewielu tekstów sponsorowanych, który mimo oczywistego celu promocyjnego zostawia po sobie konkretną checklistę, a nie ogólniki. Perspektywa "pipeline zamiast modelu" jest tym, czego brakuje wielu zespołom budującym cokolwiek wokół LLM, nie tylko voice, bo łatwo przetestować pojedynczy komponent w izolacji i ogłosić sukces, a potem zderzyć się z rzeczywistością, w której błędy z różnych warstw się kumulują w sposób, którego żaden dashboard z jedną metryką nie pokaże. Jeśli budujesz coś na styku mowy i LLM, ten artykuł jest lepszym punktem startowym niż strona sprzedażowa jakiejkolwiek z wymienionych platform.

**Link:** [Best Voice Agent Evaluation and Testing Tools in 2026](https://hackernoon.com/best-voice-agent-evaluation-and-testing-tools-in-2026)

## Ukryte złe praktyki Kubernetesa, których nauczono się podczas incydentów

**TLDR:** Inżynier SRE spisał siedem incydentów produkcyjnych na Kubernetesie, od nierównego rozkładu ruchu HTTP/2 przez kube-proxy, przez konflikt własności pola replicas między ArgoCD i HPA, po throttling CPU przy ustawionych limitach, brakujący PriorityClass, wyczerpanie adresów IP przez zawieszone pody w stanie Terminating, presję dysku od lokalnych logów, i brak ConfigMap reloadera. Wspólny wniosek jest jeden: większość tych incydentów to nie błędy w Kubernetesie, tylko domyślne zachowania i założenia, które łamią się dopiero pod realnym obciążeniem.

**Summary:** Pierwszy incydent dotyczy wprowadzenia ruchu HTTP/2 do klastra i odkrycia, że kube-proxy domyślnie robi load balancing na poziomie połączenia TCP, nie pojedynczego żądania. Dla klientów HTTP/1.x to nie problem, bo połączenia są krótkotrwałe i rozkładają się równomiernie, ale HTTP/2 multipleksuje wiele żądań na jednym połączeniu, więc wszystkie trafiają do jednego poda, a resztki serwisu stoją bezczynnie. Tymczasową poprawą było dostrojenie ustawień keep-alive na poziomie aplikacji, docelowym rozwiązaniem wprowadzenie load balancingu warstwy siódmej przez service mesh świadomy HTTP/2.

Drugi incydent jest z gatunku "nic nie eksplodowało, ale ktoś zwariował próbując zrozumieć dlaczego". Pody skalowały się w dół na kilka sekund i wracały do właściwej liczby przy każdej synchronizacji ArgoCD. Winowajcą było ręczne kubectl edit, które dopisało pole replicas do adnotacji last-applied-configuration, a ArgoCD korzystając z client-side apply nieustannie nadpisywało liczbę replik zarządzaną przez HPA. Server-side apply zgłosiłoby konflikt własności pola explicite, client-side po cichu go ignorowało. Trzeci incydent to throttling CPU mimo widocznej wolnej mocy na węzłach, bo limity CPU są cykliczne i kompresowalne, nie kumulują się jak pamięć, więc pod może być duszony mimo bezczynnych zasobów gdzie indziej na tym samym węźle.

Czwarty incydent dotyczy braku PriorityClass na krytycznych obciążeniach, co prowadziło do losowej ewikcji pod presją zasobów i sytuacji, w której preemption nie miała żadnych "ofiar" do wyrzucenia, bo wszystkie pody miały tę samą klasę QoS. Piąty to wyczerpanie adresów IP na EKS przez pody zablokowane w stanie Terminating przez finalizery, po usunięciu operatora, który powinien je najpierw wysprzątać. Szósty to presja dysku od jednego poda generującego nienormalną ilość logów lokalnie, a siódmy to brakujący ConfigMap reloader, przez co zmiana w konfiguracji bazy danych po prostu nie docierała do działających podów bez ręcznego restartu.

Autor konsekwentnie kończy każdy incydent krótką sekcją "key learnings", co czyni ten tekst czymś w rodzaju checklisty ratunkowej dla każdego, kto administruje Kubernetesem na produkcji, a nie tylko go używa.

**Key takeaways:**
- Domyślny load balancing kube-proxy działa na poziomie połączenia TCP, więc ruch HTTP/2 z multipleksowaniem może skoncentrować się na jednym podzie bez load balancingu warstwy siódmej.
- Client-side apply w ArgoCD może wpisać pole replicas do last-applied-configuration i nieustannie nadpisywać liczbę replik zarządzaną przez HPA, server-side apply zgłasza ten konflikt jawnie.
- Limity CPU mogą dusić pod mimo dostępnej wolnej mocy na węźle, bo CPU jest zasobem kompresowalnym rozliczanym cyklicznie, samo ustawienie requests bez limitów bywa wystarczające.
- Brak PriorityClass na krytycznych workloadach oznacza losową ewikcję pod presją zasobów i możliwy brak "ofiar" do preemption, gdy wszystkie pody mają tę samą klasę QoS.
- Finalizery, którym nikt nie pozwala się dokończyć po usunięciu operatora, mogą wyczerpać pool adresów IP w EKS przez pody zawieszone w stanie Terminating.

**Why do I care:** Ten tekst jest wart więcej niż większość dokumentacji Kubernetesa, bo dokumentacja opisuje jak coś działa w teorii, a ten artykuł opisuje jak to samo zachowanie wygląda o trzeciej w nocy, kiedy trzeba znaleźć przyczynę zanim klient zadzwoni drugi raz. Powtarzający się motyw, że to nie są bugi tylko domyślne ustawienia, które nikt nie zweryfikował pod realnym obciążeniem, jest dokładnie tym, czego nie widać na etapie code review czy demo na staging. Jeśli twój zespół zarządza Kubernetesem i nie ma spisanych własnych postmortemów w podobnym formacie, ten artykuł jest dobrym argumentem, żeby zacząć to robić, zanim ktoś odkryje to samo na waszym klastrze produkcyjnym po raz pierwszy.

**Link:** [Hidden Kubernetes Bad Practices Learned the Hard Way During Incidents](https://hackernoon.com/hidden-kubernetes-bad-practices-learned-the-hard-way-during-incidents)

## AI Coding Tip 031: nie pisz promptów dla modelu, który już ewoluował

**TLDR:** Autor argumentuje, że modele rozumujące z 2026 roku same weryfikują swoje kroki i dostosowują głębokość myślenia, więc instrukcje typu "sprawdź dwa razy" czy "myśl krok po kroku" tylko zabierają tokeny i dodają szum. Zamiast tego proponuje ustawiać realny poziom effort, jasny zakres zadania, długość odpowiedzi i politykę autonomii, oraz przepisuje przykładowy prompt według szablonu Role, Objective, Success criteria, Constraints, Output format, Stopping rules.

**Summary:** Teza wyjściowa jest prosta: starsze prompty pełne wielkich liter, "ALWAYS", "NEVER" i wymuszonej weryfikacji były potrzebne, kiedy modele bez tego pominięcia realnie pomijały kroki. Reasoning modele, jak GPT-5.6, Opus 5 czy Kimi-3, mają wewnętrzny przebieg weryfikacji wbudowany domyślnie, więc te same instrukcje nie dodają bezpieczeństwa, tylko sprawiają, że model powtarza pracę, którą i tak by wykonał, oraz zmusza go do zmagania się z twoimi instrukcjami zamiast z samym zadaniem.

Autor cytuje konkretne liczby z wytycznych OpenAI, przycięcie wewnętrznych promptów agentowych, usunięcie powtórzonych instrukcji, zbędnych przykładów i nieistotnych opisów narzędzi, podniosło wyniki ewaluacji o 10 do 15 procent i zmniejszyło zużycie tokenów o 41 do 66 procent, a koszt nawet o 67 procent. To nie jest argument estetyczny o krótszych promptach, to konkretny argument kosztowy i jakościowy.

Rekomendowany proces zamiany starego promptu na nowy sprowadza się do kilku kroków: usuń wymuszoną weryfikację, zamień "myśl głęboko" na jawny parametr effort (low/medium/high/max), przerób absolutne ALWAYS/NEVER na kryteria decyzyjne zamiast sztywnych reguł, zamień gołe "be concise" na konkretną listę tego co ma zostać i co ma zniknąć, usuń zduplikowane reguły odziedziczone po starszych wersjach promptu, i dodaj jawną politykę autonomii, czy model działa bez pytania, czy musi potwierdzić przed czymś nieodwracalnym, czy tylko analizuje i raportuje.

Najciekawszy niuans dotyczy tego, że przycinanie promptu nie oznacza wycinania realnych ograniczeń. Reguły biznesowe, limity bezpieczeństwa i granice danych zostają w prompcie niezależnie od tego, jak krótki jest reszta tekstu, bo to nie jest scaffolding zastępowany domyślnym zachowaniem modelu, to są realne niezmienniki. Autor kończy przykładowym meta-promptem, który sam stosuje te reguły na starym prompcie i oddaje przyciętą wersję, co jest zgrabnym domknięciem tematu.

**Key takeaways:**
- Reasoning modele weryfikują się i pacują głębokość myślenia domyślnie, więc instrukcje "double-check" i "think step by step" dodają szum, nie bezpieczeństwo.
- Przycinanie wewnętrznych promptów agentowych podniosło wyniki ewaluacji OpenAI o 10 do 15%, jednocześnie zmniejszając zużycie tokenów o 41 do 66% i koszt o 67%.
- ALWAYS/NEVER napisane dla sytuacji wymagających oceny sytuacyjnej trzeba zamienić na kryteria decyzyjne, zostawiając absoluty tylko dla naprawdę niezmiennych reguł.
- Jawna polityka autonomii (działaj bez pytania na krokach odwracalnych, potwierdzaj przed nieodwracalnymi, tylko analizuj przy planowaniu) jest częścią promptu, którą większość ludzi wciąż pomija.
- Reguły biznesowe, limity bezpieczeństwa i granice danych nie są scaffoldingiem do wycięcia, zostają w prompcie niezależnie od tego, jak bardzo się go przycina.

**Why do I care:** Piszę prompty codziennie i ten tekst opisuje dokładnie ten moment, w którym łapię się na kopiowaniu tych samych "sprawdź dwa razy, bądź precyzyjny, nie zgaduj" do każdego nowego zadania, mimo że model już od dawna to robi bez pytania. Największa wartość tego artykułu nie jest w samej rekomendacji, ale w przypomnieniu, że prompty pisane rok temu dla innego modelu to dokładnie taki sam dług techniczny jak kod pisany dla frameworku, który od tamtej pory trzy razy zmienił swoje domyślne zachowanie. Szablon z jawną polityką autonomii jest jedyną częścią, którą naprawdę warto zapamiętać, bo to jedyny element, którego model nie wymyśli sam za ciebie.

**Link:** [AI Coding Tip 031 - Don't Write Prompts for a Model That Evolved](https://hackernoon.com/ai-coding-tip-031-dont-write-prompts-for-a-model-that-evolved)

## PicoTTY: KVM bez V (i bez M) do domowego racka

**TLDR:** Autor zbudował własny "KVM bez wideo i bez myszy" z Raspberry Pi Pico i chipów Ethernet W5100S, po tym jak Intel AMT wpędził mu maszynę w boot loop, AMD DASH nie zadziałał, a Pi-KVM padał przez niestabilny pipeline wideo na Pi Zero 2 W. Rozwiązanie kosztowało go około dziesięć razy mniej niż komercyjne IP-KVM-y dla czterech maszyn, a każda kolejna maszyna to już tylko dodatkowy węzeł za ułamek ceny.

**Summary:** Historia zaczyna się od bardzo konkretnej potrzeby: cztery mini PC z Proxmoxem bez fizycznego portu serial, i chęci grzebania w konsoli, kiedy maszyna wisi, a autor nie jest fizycznie w pobliżu racka. Standardowe rozwiązania out-of-band zawiodły po kolei, Intel AMT crashował maszynę w boot loop, AMD DASH nie działał, a Pi-KVM na Pi Zero 2 W padał, bo najbardziej wymagającą i kruchą częścią całego setupu był akurat strumień wideo, ta sama część, za którą płacił się największą złożoność. Wniosek był prosty: skoro wideo jest tym, co się wywraca, i tak naprawdę nigdy go nie potrzebował, wystarczy terminal i sposób wysłania kombinacji klawiszy, kiedy maszyna jest zbyt martwa, żeby dać jakikolwiek terminal.

Każdy węzeł PicoTTY to Raspberry Pi Pico z modułem Ethernet W5100S, podłączony przez USB do celu jako złożone urządzenie, jednocześnie port serial CDC i klawiatura HID. Kluczowy trik sprzętowy jest bardzo prosty: chip Ethernet rozmawia z Pico przez SPI, nie przez USB, więc jedyny port USB Pico może w całości udawać klawiaturę i port serial dla maszyny docelowej, podczas gdy sieć idzie zupełnie inną szyną. Hub, czyli Raspberry Pi Zero 2 W, zbiera połączenia od wszystkich węzłów i wystawia dashboard w przeglądarce, przy czym to węzeł łączy się do huba, nie odwrotnie, dzięki czemu węzły mogą swobodnie zostać na DHCP, a hub potrzebuje tylko jednego stałego adresu.

Ciekawy jest wybór między CircuitPython i MicroPython. CircuitPython obsługuje złożone urządzenie USB (klawiatura plus dwa niezależne kanały serial) bez konieczności przebudowy firmware, podczas gdy MicroPython ma wygodniejszą warstwę sieciową, ale jego wbudowany port serial to od razu Python REPL, co oznaczałoby oddanie atakującemu (albo po prostu użytkownikowi) prompta Pythona samego węzła. Autor wybrał to pierwsze, mimo że CircuitPython był dla niego czymś nowym.

Najbardziej pouczający fragment dotyczy tego, dlaczego węzeł ma jednocześnie klawiaturę i port serial, nie tylko jeden z nich. Port serial (CDC) działa tylko wtedy, gdy system operacyjny go wyenumerował i coś obsługuje konsolę, czyli jest bezużyteczny właśnie wtedy, gdy maszyna wisi przed startem systemu, w BIOS-ie albo w bootloaderze. Klawiatura HID działa na poziomie, na którym BIOS i bootloadery mówią natywnie od momentu włączenia zasilania, więc Ctrl-Alt-Del czy wejście do menu boot są możliwe nawet wtedy, gdy port serial jest kompletnie martwy. Autor kończy szczerym podsumowaniem ograniczeń, port serial może odczytać tylko to, co system faktycznie wypisuje na tę konkretną linię, co wymaga skonfigurowania konsoli po stronie systemu docelowego, i to jest ograniczenie sprzętowe, nie błąd projektu.

**Key takeaways:**
- Chip Ethernet komunikuje się z Raspberry Pi Pico przez SPI, nie przez USB, więc jeden port USB może w całości udawać klawiaturę i port serial dla maszyny docelowej.
- Węzeł łączy się do huba, nie odwrotnie, co pozwala węzłom zostać na DHCP i eliminuje potrzebę pollingu adresów IP przez hub.
- Klawiatura HID działa na poziomie BIOS-u i bootloadera od momentu włączenia zasilania, podczas gdy port serial (USB CDC) jest bezużyteczny, dopóki system operacyjny go nie wyenumeruje.
- Cały setup dla czterech maszyn wyszedł około dziesięć razy taniej niż cztery komercyjne IP-KVM-y, a marginalny koszt kolejnej maszyny to jedynie koszt jednego węzła.
- Sieć całego swarmu jest odizolowana na osobnym VLAN-ie i dostępna tylko przez tunel, a nie szyfrowany protokół między hubem i węzłami jest świadomym wyborem, bo terminacja TLS na mikrokontrolerze nie miała sensu przy takiej izolacji sieciowej.

**Why do I care:** Uwielbiam takie teksty, bo to jest inżynieria pozbawiona ambicji budowania produktu, tylko rozwiązanie konkretnego problemu za rozsądną cenę, z jasną świadomością własnych ograniczeń. Decyzja "usuń wideo, bo wideo jest tym co się wywraca, i nigdy go nie potrzebowałem" jest dokładnie tym rodzajem redukcji zakresu, którą powinniśmy stosować częściej w projektach software'owych, kiedy dodajemy funkcję, bo "przecież mogłaby się przydać", a nie bo faktycznie rozwiązuje nasz problem. Ten sam instynkt, żeby wyciąć najkruchszą i najkosztowniejszą część systemu, zamiast próbować ją ustabilizować, przenosi się jeden do jednego na decyzje architektoniczne w zwykłych aplikacjach webowych.

**Link:** [PicoTTY: A KVM Without the V (or the M) for My Homelab](https://hackernoon.com/picotty-a-kvm-without-the-v-or-the-m-for-my-homelab)

## Podręcznikowy przykład katastrofy PR przy starcie produktu Web3: Ledger Recover, 2023

**TLDR:** Tekst rozbiera na czynniki pierwsze, jak Ledger zepsuł wprowadzenie usługi Recover, umożliwiającej odzyskanie seed phrase przez trzy zewnętrzne firmy, przez brak strategii komunikacji, konfrontacyjną postawę CEO wobec społeczności i powtórzenie tego samego błędu przy drugiej próbie startu pół roku później. Skutkiem był spadek udziału Ledgera w rynku z 70-80% do 60%, podczas gdy sprzedaż konkurenta Trezor wzrosła o 900% w pierwszym tygodniu po ogłoszeniu.

**Summary:** Kontekst techniczny jest krótki: Ledger Recover dzieli seed phrase na trzy części przechowywane w chmurze przez trzy różne firmy, żeby umożliwić odzyskanie hasła w razie jego utraty. Problem w tym, że w kulturze kryptowalut obowiązuje zasada "not your keys, not your coins", więc sama możliwość techniczna, że trzy firmy razem mogłyby uzyskać dostęp do klucza bez wiedzy i zgody użytkownika, wystarczyła do wywołania fali krytyki.

Reakcja Ledgera na tę krytykę jest właściwym tematem artykułu, nie sama technologia. CEO Pascal Gauthier na Twitter Space zamiast wyjaśnić wątpliwości, w zasadzie obwinił społeczność o niezrozumienie technologii, co pogłębiło kryzys, a jego cytat "You're saying this is not what customers want. Actually, this is what future customers want" stał się symbolem całej sprawy. Były CEO i współzałożyciel próbował gasić pożar postem na Reddicie, ale nawet ten post miał złą kolejność, najpierw emocje i obwinianie krytyków o podburzanie nienawiści, dopiero potem przeprosiny i wyjaśnienie techniczne, odwrotnie niż powinno być.

Najbardziej pouczający fragment to lista tego, co firma zrobiła źle: brak strategii komunikacji z mediami, ignorowanie dziennikarzy przy poleganiu wyłącznie na własnych kanałach social media, otwarta konfrontacja rzecznika ze społecznością, i drugi rzecznik, który też nie potrafił poprowadzić przekazu. Po krytyce w maju firma odłożyła start na pół roku, ale nie zmieniła strategii komunikacyjnej, więc w październiku powtórzyła ten sam błąd i dostała jeszcze silniejszą negatywną reakcję. Kryzys ucichł tylko wtedy, gdy firma opublikowała szczegółową dokumentację techniczną usługi.

Skutki biznesowe są konkretne i policzalne: Ledger miał w 2023 roku 70-80% udziału w rynku cold walletów wobec 10% Trezora, a po ogłoszeniu Recover sprzedaż Trezora wzrosła o 900% w pierwszym tygodniu i potrojła się do końca roku, podnosząc jego udział do 30% przy spadku Ledgera do 60%. Trezor zagrał tę sytuację odwrotnie, publicznie deklarując, że pełna kontrola musi zostać przy użytkowniku i że taka usługa nigdy nie trafi do ich urządzeń. Autor kończy mocną tezą profesjonalną: to nie była "katastrofa PR", bo w całej tej historii nie było żadnego PR, ktoś po prostu podjął decyzję samodzielnie, ignorując praktyki komunikacji kryzysowej, i skutkiem były realne straty finansowe.

**Key takeaways:**
- Sama technologia Ledger Recover (podział seed phrase na trzy części u trzech firm) nie była głównym problemem, problemem był brak strategii komunikacji przy jej wprowadzaniu.
- CEO wchodzący w otwartą konfrontację ze społecznością na Twitter Space pogłębił kryzys bardziej niż sama krytyka pierwotnego ogłoszenia.
- Firma odłożyła start na pół roku po pierwszej krytyce, ale nie zmieniła strategii komunikacji, więc druga próba w październiku powtórzyła ten sam błąd.
- Konkurent Trezor zwiększył sprzedaż o 900% w pierwszym tygodniu po ogłoszeniu Recover i podniósł swój udział w rynku z 10% do 30% do końca roku.
- Kryzys ucichł dopiero po opublikowaniu szczegółowej dokumentacji technicznej, coś, co można było zrobić od razu przy pierwszym ogłoszeniu.

**Why do I care:** Ten artykuł jest przypomnieniem, że najlepiej zaprojektowana funkcja niczego nie broni, jeśli komunikacja o niej jest zaprojektowana jeszcze gorzej niż sam produkt. Jako ktoś, kto ogłasza zmiany w architekturze albo API zespołowi na co dzień, znam ten moment, w którym łatwiej jest odpowiedzieć na krytykę defensywnie niż usiąść i wyjaśnić rzeczowo, dlaczego decyzja została podjęta, i historia Ledgera jest podręcznikowym przykładem tego, do czego prowadzi ta pierwsza droga w większej skali. Druga próba startu bez zmiany podejścia jest tym, co boli najbardziej, bo to jest dokładnie ten moment, w którym każdy techniczny zespół powinien zapytać "czy rozwiązaliśmy realny problem, czy tylko poczekaliśmy, aż ludzie się uspokoją".

**Link:** [A Perfect Example of a Web3 Product Launch PR&Comms Disaster: Ledger Recover, 2023](https://hackernoon.com/a-perfect-example-of-a-web3-product-launch-prandcomms-disaster-ledger-recover-2023)
