---
title: "Koszt testów z Claude i Playwright, Gemini Flash w produkcji, tożsamość agentów, Scion zamiast Gita i fałszywe narzędzia AI"
excerpt: "Szczegółowe liczby o tokenach w testach przeglądarkowych, benchmark modeli Gemini, broker tożsamości dla agentów, koniec klienta Git i dwie lekcje bezpieczeństwa."
publishedAt: "2026-10-22"
slug: "hackernoon-playwright-tokens-gemini-flash-agent-identity-scion"
hashtags: "#hackernoon #ai #agents #playwright #testing #git #security #postgresql #llm #generated #pl"
source_pattern: "HackerNoon"
---

## How Teams Burn Budgets Testing with Claude and Playwright Without a Harness

**TLDR:** Test przeglądarkowy prowadzony przez agenta zjada tokeny, bo każdy zrzut strony zostaje w rozmowie i jest czytany od nowa w każdym kroku. Autor przekonuje, że bez uprzęży wokół agenta rachunek rośnie szybciej, niż spadają ceny tokenów.

**Summary:** Punkt wyjścia to marcowe doniesienia o limitach w Claude Code. Jeden programista opisał pięciogodzinną sesję skróconą do dziewiętnastu minut, a w komentarzu na Hacker News padło zdanie o uruchomieniu stu dwóch agentów i spaleniu stu dwudziestu dolarów w sześć minut. Część tego skoku to był błąd cache'owania promptów. Autor mówi jednak, że sedno zostaje bez niego. Człowiek patrzy na swój limit. Zadanie w CI nikt nie pilnuje.

Mechanika jest prosta. Playwright MCP oddaje modelowi stronę jako drzewo dostępności, jeden zrzut na krok, a każdy zrzut zostaje w historii. W kroku dwunastym model czyta ponownie jedenaście poprzednich. W przytoczonym śladzie po sześciu z piętnastu testów zniknęło siedemdziesiąt pięć procent okna kontekstu liczącego dwieście tysięcy tokenów, a pojedyncze zrobienie zrzutu ekranu kosztowało 232 tysiące tokenów. Dane o stu tysiącach tokenów na test przy Playwright MCP, wobec około dwudziestu siedmiu tysięcy przy pętli z CLI, pochodzą z jednego autora i są anegdotyczne. Autor sam to zaznacza.

Dalej jest rachunek. Mały zestaw trzydziestu przepływów po sześć kroków przy ośmiu tysiącach tokenów na krok daje 1,44 miliona tokenów na przebieg, czyli około 4,30 dolara. Przy dwustu przebiegach dziennie to około 864 dolarów dziennie, i to bez zrzutów ekranu i ponowień. Proponowane lekarstwo to uprząż, która raz modeluje aplikację, ocenia ryzyko zmiany, ogranicza współbieżność i potwierdza wyniki deterministycznymi sprawdzianami. Największą dźwignią jest zakres, bo zmiana w dokumentacji nie powinna kosztować tyle, co zmiana w płatnościach.

Trzeba jednak powiedzieć głośno, że tekst jest reklamą platformy QA.tech, i to widać po tym, jak rozwiązanie pojawia się w końcówce. Przywołany benchmark uprzęży mierzy zresztą agentów kodujących, nie testy przeglądarkowe, co autor przyznaje dopiero w połowie akapitu. Brakuje porównania z najprostszym rozwiązaniem, czyli zwykłymi testami Playwright bez modelu, z modelem użytym tylko do naprawiania zepsutych selektorów.

**Key takeaways:**
- Zrzuty stron kumulują się w kontekście i są czytane przy każdym kolejnym kroku.
- Przy trzydziestu przepływach i dwustu przebiegach dziennie rachunek według autora to około 864 dolarów dziennie.
- Ocena ryzyka zmiany i ograniczenie zakresu uruchamianych testów obcina koszt najbardziej.
- Część tekstu to marketing konkretnej platformy.

**Why do I care:** Jeśli ktoś w zespole chce podpiąć agenta pod testy end-to-end w CI, ten rachunek warto wykonać przed rozmową o budżecie. Ja zacząłbym od klasycznych testów Playwright dla przepływów krytycznych i użył modelu tylko tam, gdzie testy się psują. To mniej efektowne, za to przewidywalne.

**Link:** [How Teams Burn Budgets Testing with Claude and Playwright Without a Harness](https://hackernoon.com/how-teams-burn-budgets-testing-with-claude-and-playwright-without-a-harness)

## Optimizing Gemini Flash Thinking Levels for Image Classification in Production

**TLDR:** Autor aplikacji do rozpoznawania ryb porównał modele Gemini Flash na tych samych zdjęciach. Najnowszy model dorównał droższemu poprzednikowi za jedną trzecią ceny.

**Summary:** Aplikacja World Fishing Map robi jedno, od czego zależy reszta. Użytkownik fotografuje złowioną rybę, model proponuje do trzech gatunków, a użytkownik potwierdza jeden. Jeśli pierwsza propozycja jest błędna, większość ludzi nie poprawia jej, tylko zamyka aplikację. Darmowy poziom działał na Gemini 2.5 Flash, płatne na 3.5 Flash, który był trzy do czterech razy droższy.

Do testu autor wziął dziewięćdziesiąt trzy zdjęcia czterdziestu ośmiu gatunków z iNaturalist, z Japonii, z licencjami pozwalającymi na użycie. Wybrał gatunki celowo podchwytliwe, pary łudząco podobnych ryb i gatunki jadowite. Na sześćdziesięciu pięciu zdjęciach w stylu połowu stary darmowy model trafiał w czterdzieści pięć procent, Gemini 3.5 Flash w około osiemdziesiąt jeden, a 3.8 Flash w osiemdziesiąt dwa przy koszcie 0,0051 dolara za rozpoznanie zamiast 0,0198. Wersja 3.8 z niskim poziomem myślenia dała 81,5 procenta za 0,0027 dolara. Modele Lite były szybkie i tanie, ale trafiały mniej więcej w połowę.

Dwie obserwacje są najcenniejsze. Stary model dawał trzydzieści sześć pewnych błędnych odpowiedzi na sześćdziesiąt pięć zdjęć, na przykład nazywał pewną siebie liczbą 0,95 rybę, którą widać z drugiego końca portu. Przy funkcji, która prosi użytkownika o potwierdzenie, nadmierna pewność jest gorsza niż pomyłka, bo uczy ludzi nie sprawdzać. Druga sprawa to tokeny myślenia, które stanowiły większość rachunku i których model kosztów autora nie uwzględniał. Przy 3.8 Flash z niskim poziomem myślenia zużycie spadło do około sześćdziesięciu tokenów.

Ciekawy jest też szczegół wdrożeniowy. Aplikacja zaczęła wysyłać tryb, premium lub standard, a serwer decyduje o modelu. Stare wersje aplikacji porównują nazwę modelu w odpowiedzi z wysłaną i pokazują ostrzeżenie o awaryjnym modelu, więc serwer odpowiada im starymi identyfikatorami. Próba jest mała, a zdjęcia z iNaturalist są lepsze od ciemnych zdjęć z pokładu łodzi. Autor to wprost przyznaje i czeka na prawdziwą metrykę, czyli jak często ludzie akceptują pierwszą propozycję.

**Key takeaways:**
- Gemini 3.8 Flash dorównał 3.5 Flash w dokładności za około jedną trzecią kosztu.
- Stary model dawał pewne błędne odpowiedzi w trzydziestu sześciu z sześćdziesięciu pięciu przypadków.
- Tokeny myślenia były największą częścią rachunku, a poziom low obniżył je do około sześćdziesięciu.
- Cena 3.8 Flash jest promocyjna do końca grudnia 2026 i potem mniej więcej się podwaja.

**Why do I care:** To dobry wzór, jak oceniać model w produkcie. Własny zestaw zdjęć, prompt wczytywany prosto z kodu produkcyjnego, liczenie pewnych błędów, a nie tylko trafień. Jako architekt wziąłbym też z tego pomysł ukrycia nazw modeli za trybem po stronie serwera, bo dzięki temu zmiana modelu nie wymaga wydania aplikacji.

**Link:** [Optimizing Gemini Flash Thinking Levels for Image Classification in Production](https://hackernoon.com/optimizing-gemini-flash-thinking-levels-for-image-classification-in-production)

## Agent Security & Identity (Part 1)

**TLDR:** Jak pozwolić agentowi działać w imieniu jednego użytkownika bez dawania mu poświadczeń należących do wszystkich? Autor opisuje standardy, broker tożsamości od Zalando i sześć decyzji architektonicznych.

**Summary:** Zaczyna się od historii, którą zna każdy, kto robił demo. Konto bota z tokenem w sekrecie Kubernetesa i wszystkie żądania użytkowników jadą na nim. GitHub widzi jedną tożsamość, nie da się odciąć jednej osoby bez rotacji tokenu, od którego zależą wszyscy, a token leży tam, gdzie agent może go odczytać, więc każdy, kto go przekona wstrzyknięciem promptu, też.

Autor porządkuje problem trzema pytaniami o każde żądanie. Kim jesteś, kim jest twój agent i co wolno wam obu. Rozróżnia podmiot, czyli człowieka, dla którego praca jest wykonywana, i aktora, czyli agenta. W łańcuchu agentów podmiot zostaje ten sam, a aktor zmienia się na każdym skoku. Potem przegląda stabilną bazę, czyli RFC o wymianie tokenów OAuth, tokeny związane z audytorium i SPIFFE, oraz niedojrzałą warstwę dla agentów, w której wersje robocze IETF jeszcze się zmieniają.

Środek tekstu to Agentic Identity Broker, który Zalando udostępniło na licencji MIT. Broker trzyma zaszyfrowane tokeny użytkownika u zewnętrznego dostawcy, agent nigdy ich nie dostaje, a bramka przy żądaniu wymienia token agenta na właściwy token użytkownika. Autor zastrzega uczciwie, że bramka nadal widzi token dostawcy, więc liczba komponentów dotykających poświadczeń spada, ale nie do zera. Sam wprowadził sześć decyzji, z których jedną odwrócił. Egzekwowanie decyzji o dostępie przeniósł z brokera do własnego punktu decyzyjnego opartego o Open Policy Agent, z zachowaniem zasady, że brak odpowiedzi znaczy odmowę.

Najważniejszy akapit dla mnie jest jeden. Poprawna autoryzacja nie mówi nic o tym, czy wynik narzędzia jest wiarygodny, a zatruta odpowiedź może namówić agenta na kolejny krok. Zespół, który właśnie skończył program tożsamości, najłatwiej uzna, że ten temat jest załatwiony. Autor zbyt krótko zajmuje się też agentami autonomicznymi bez człowieka w przeglądarce, którzy wprost wypadają z przepływów opartych na przekierowaniu.

**Key takeaways:**
- Współdzielony token bota psuje przypisanie działań, uprawnienia i możliwość odwołania dostępu.
- Podmiot i aktor muszą być oddzielne przez cały łańcuch wywołań.
- Broker przechowuje tokeny użytkowników, a agent nie ma żadnej ścieżki do poświadczeń.
- Autoryzacja nie chroni przed zatrutym wynikiem narzędzia.

**Why do I care:** Jeśli budujemy agenta, który ma działać w repozytoriach lub systemach klienta, zaczynamy dokładnie od tego pytania. Dla frontendowca to także sygnał, że interfejs zgód, w którym użytkownik widzi i cofa uprawnienia agentów, stanie się normalną częścią produktu. Warto o tym pomyśleć wcześniej, niż klient o to zapyta.

**Link:** [Agent Security & Identity (Part 1): Who Are You, Who's Your Agent, And What Should They Be Allowed?](https://hackernoon.com/agent-security-and-identity-part-1-who-are-you-whos-your-agent-and-what-should-they-be-allowed)

## AI Agents Are Killing the Git Client, Not Git

**TLDR:** Anthropic zastąpiło Gita własnym systemem Scion w całym monorepo, a Cursor buduje forge pod agentów. Autor twierdzi, że umiera klient Git, a protokół zostaje, i dopiero od około dwóch tysięcy inżynierów zmiana staje się opłacalna.

**Summary:** Punkt wyjścia to liczby z wpisu Anthropic z 13 października 2026. Dzienne scalenia wzrosły z około dwóch i pół tysiąca w maju do ponad trzydziestu tysięcy we wrześniu, a samo CI robiło około dwudziestu pięciu milionów checkoutów dziennie. Siedmiu inżynierów w pięć miesięcy zastąpiło Gita w całym monorepo, a Claude napisał większość implementacji. Scion opiera się na odwróceniu założeń Gita. Klient jest zawsze online, serwer liczy, a kopia robocza jest opcjonalna. Według Anthropic zużycie CPU i pamięci spadło około dwustukrotnie, a czas checkoutu w CI z minut do sekund.

Autor odróżnia protokół Git od klienta Git i od serwera Git. Jego teza jest taka, że agenci są klientami zawsze online, więc korzyści z pełnych klonów i pracy offline stają się czystym kosztem. Ludzie nadal czasem pracują w samolocie, więc najbardziej prawdopodobny jest układ hybrydowy. Ludzie mówią Gitem, agenci używają bogatszego API serwera, a wszystko ląduje w tej samej prawdzie po stronie serwera. Cursor Origin idzie inną drogą. Zachowuje Git na kablu, ale próbuje zdobyć rynek od strony agenta, z edytorem, agentami chmurowymi i kolejką scaleń odziedziczoną po Graphite.

Reszta to długa analiza rynku i rekomendacje dla GitHuba i GitLaba. Progi są sformułowane odważnie, na przykład poniżej stu inżynierów Git zostaje bez zmian, a powyżej dwóch tysięcy lub pięciu tysięcy scaleń dziennie opłaca się własny system. Tu jestem sceptyczny. Dane pochodzą w dużej mierze z jednego przypadku, firmy, która sama pisze większość kodu agentami. Sam autor w sekcji ryzyk zauważa, że wolumen kodu generowanego przez agentów może być po części artefaktem pomiaru. Brakuje mi też odpowiedzi na pytanie, kto weryfikuje te dziesiątki tysięcy scaleń, skoro Anthropic zrezygnowało z kolejki z globalną blokadą i dwoma zatwierdzeniami człowieka.

**Key takeaways:**
- Anthropic scala ponad trzydzieści tysięcy zmian dziennie i zastąpiło Gita systemem Scion w pięć miesięcy.
- Git przetrwa jako protokół, a serwery będą liczyć diff, blame i scalenia same.
- Cursor Origin zachowuje Git, ale łączy edytor, agentów i hosting w jednym miejscu.
- Teza o progu dwóch tysięcy inżynierów opiera się na jednym przypadku.

**Why do I care:** Dla mojej codzienności ważniejsze jest nie to, czy Git umrze, tylko że agenci w CI zaczną klonować repozytoria setki razy dziennie. Jeśli zespół ma duże monorepo, warto już teraz włączyć częściowe klony i sparse checkout i sprawdzić, ile checkoutów robią maszyny, a ile ludzie.

**Link:** [AI Agents Are Killing the Git Client, Not Git: What Anthropic's Scion and Cursor's Origin Show](https://hackernoon.com/ai-agents-are-killing-the-git-client-not-git-what-anthropics-scion-and-cursors-origin-show)

## Frozen Privilege: Remote Code Execution in Snowflake-Managed PostgreSQL

**TLDR:** Badacze z Varonis znaleźli łańcuch, który z roli bez uprawnień superużytkownika, ale z atrybutem CREATEROLE, daje wykonanie poleceń na serwerze zarządzanego Postgresa w Snowflake. Snowflake naprawiło to po swojej stronie.

**Summary:** Łańcuch ma pięć ogniw i każde jest udokumentowanym zachowaniem PostgreSQL. Rola z CREATEROLE przyznaje sobie predefiniowane role do czytania i zapisu wszystkich danych. Zapis do tabeli zadań rozszerzenia pg_cron pozwala podmienić użytkownika zadania na postgres i wykonać SQL jako superużytkownik. Snowflake blokowało po nazwie funkcje do pracy z plikami i programami, ale skompilowane symbole zostały w binarce, więc badacze utworzyli funkcje w języku internal, które wskazują na te same symbole. Potem zapisali plik konfiguracyjny przez interfejs dużych obiektów i wstrzyknęli polecenie do archive_command, które PostgreSQL uruchamia przez powłokę przy każdym archiwizowanym segmencie WAL.

Skutki, które opisują, są nieprzyjemne. Zmiana plików danych poza SQL omija ograniczenia, wyzwalacze i audyt w bazie. Można zepsuć odtwarzanie punktowe, zaszyfrować pliki albo wyczyścić lokalne logi. Funkcja z uprawnieniami superużytkownika zostaje w bazie jako tylne wejście, więc rotacja przeciekłego hasła niczego nie kończy. Zgłoszenie poszło 31 maja, potwierdzenie 9 czerwca, a poprawka została wdrożona po stronie serwera przed publikacją. Klienci nie muszą nic robić.

Najbardziej użyteczny wniosek dotyczy nas, nie Snowflake. Ukrycie nazwy funkcji to nie to samo, co usunięcie możliwości, a CREATEROLE należy traktować prawie jak superużytkownika. Autorzy są tu też trochę sprzedawcami, bo tekst jest promocją Varonis Threat Labs, ale techniczny opis jest konkretny i sprawdzalny.

**Key takeaways:**
- CREATEROLE pozwala samemu nadać sobie role do czytania i zapisu wszystkich danych.
- Blokada funkcji po nazwie nie działa, jeśli skompilowane symbole zostają w binarce.
- Funkcja z uprawnieniami superużytkownika przetrwa rotację hasła.
- Snowflake naprawiło problem po swojej stronie.

**Why do I care:** To historia przede wszystkim dla backendu i DevOps, ale rolę z CREATEROLE w aplikacji widziałem w wielu projektach, bo tak było najwygodniej. Prosta lista kontrolna na przegląd architektury. Żadnych ról aplikacyjnych z CREATEROLE, regularny przegląd zadań pg_cron i funkcji SECURITY DEFINER.

**Link:** [Frozen Privilege: Remote Code Execution in Snowflake-Managed PostgreSQL](https://hackernoon.com/frozen-privilege-remote-code-execution-in-snowflake-managed-postgresql)

## Fake AI Tools Put US Companies at Risk

**TLDR:** ANY.RUN opisuje fałszywe strony i instalatory Claude, ChatGPT, Copilota i innych, które instalują infostealery i kradną sesje. W każdym przypadku to pracownik wykonuje decydujący krok.

**Summary:** Badacze powiązali 1258 publicznych analiz w sandboksie z takimi kampaniami między 15 kwietnia a 5 października 2026. Claude odpowiada za 601 z nich, czyli 48 procent, a ChatGPT i Codex za 418. Co najmniej 45 procent analiz to kampanie, w których każą wkleić polecenie do okna Uruchom, PowerShella albo terminala. Największy wzorzec nazwano InstallFix. Strona kopiuje dokumentację instalacji narzędzi takich jak Claude Code, Copilot CLI, Codex czy Ollama i podmienia domenę w jednolinijkowcu na atakującą. Programista, który skopiuje polecenie, uruchamia cudzy skrypt ze swoimi uprawnieniami.

Są jeszcze kampanie z fałszywą stroną pobierania Claude, które używają ClickFix i narzędzi wbudowanych w Windows, oraz przynęty umieszczone wprost na claude.ai i chatgpt.com, jako opublikowany artefakt albo udostępniony czat. Jedna wersja instaluje prawdziwy instalator jako przykrywkę, a w tle uruchamia bezokienkową przeglądarkę, która wysyła ciasteczka sesji, więc napastnik wchodzi do poczty czy konsoli chmury bez hasła i bez MFA. Piąty wzorzec celuje w marketing, z fałszywymi zaproszeniami do reklam w Claude albo Gemini i oknem logowania Google narysowanym wewnątrz strony.

Wnioski dla organizacji są rozsądne, choć dość standardowe. Katalog zatwierdzonych narzędzi AI, własny właściciel i budżet, ograniczenie mshta i niepodpisanego PowerShella dla zwykłych użytkowników oraz polowanie na wzorce zachowania, a nie na domeny, bo domeny często się zmieniają. Pamiętajmy, że raport pochodzi od dostawcy sandboksa, a liczby opisują analizy przesłane do jego serwisu, nie liczbę ofiar. Autor sam to zaznacza w jednym zdaniu o przemysłach.

**Key takeaways:**
- Claude i ChatGPT to marki najczęściej podszywane, razem 81 procent analiz.
- Co najmniej 45 procent analiz dotyczy wklejania polecenia przez ofiarę.
- Przynęty leżą też na zaufanych platformach, w tym na claude.ai i chatgpt.com.
- Trwalsze od domen są ścieżki, polecenia i wzorce zachowania.

**Why do I care:** Dla programisty to najprostsza lekcja tego numeru. Polecenie instalacyjne kopiuj tylko ze strony dokumentacji, którą sam otworzyłeś z zakładki, nie z wyszukiwarki ani z reklamy. A jako ktoś, kto doradza zespołom, powiedziałbym, że lista oficjalnych źródeł narzędzi AI na wiki firmy zadziała lepiej niż kolejne szkolenie.

**Link:** [Fake AI Tools Put US Companies at Risk: Inside Counterfeit Claude, ChatGPT, and Copilot](https://hackernoon.com/fake-ai-tools-put-us-companies-at-risk-inside-counterfeit-claude-chatgpt-and-copilot)
