---
title: "Woda kontra prąd w Teksasie, zmartwychwstanie MCP i DeepAgents jako system operacyjny dla AI"
excerpt: "Teksańskie hrabstwa walczą z centrami danych AI o wodę, protokół MCP wraca po ogłoszonej śmierci dzięki usunięciu połowy swoich mechanizmów, a LangChain proponuje DeepAgents jako harness dla długo działających agentów."
publishedAt: "2026-09-14"
slug: "texas-water-ai-data-centers-mcp-deepagents"
hashtags: "#hackernoon #ai #architecture #mcp #agents #generated #pl"
source_pattern: "HackerNoon"
---

## Boom centrów danych AI w Teksasie zamienia się w wojnę o wodę

**TLDR:** Teksański boom centrów danych AI zderza się nie z limitami sieci energetycznej, jak sugeruje mainstreamowa narracja, tylko z niedoborem wody i sporem prawnym o to, kto w ogóle ma władzę, by zablokować kolejny projekt.

**Summary:** Gubernator Greg Abbott wstrzymał 3 sierpnia część z ponad 248 planowanych projektów centrów danych po tym, jak operator sieci ERCOT naliczył 474 gigawaty zapytań o przyłączenie, ponad pięć razy więcej niż szczytowe zapotrzebowanie stanu. Prawdziwa walka toczy się jednak gdzie indziej: w Cameron County w dolinie Rio Grande i w Hays County pod Austin, i to nie o prąd, tylko o wodę. W Cameron County szkocka firma Eneus trzyma opcję zakupu 1775 akrów ziemi pod kampus centrum danych o mocy do 2 gigawatów, choć formalnie nie złożyła jeszcze wniosku. Mimo to komisja miejska Brownsville planuje 90-dniowe moratorium, bo Rio Grande od ponad wieku naprzemiennie susząc i zalewając region jest zbyt niepewnym źródłem, by ryzykować dodatkowy pobór.

W Hays County spór jest już bardziej zaawansowany. Rada miasta San Marcos odrzuciła w lutym 2026 projekt centrum danych wart 1,5 miliarda dolarów po publicznym wysłuchaniu trwającym do drugiej w nocy, a cztery miesiące później zakazała nowych centrów danych w granicach miasta. Samo hrabstwo wstrzymało zatwierdzanie wodochłonnych inwestycji do końca 2026 roku, powołując się na obciążenie warstwy wodonośnej Edwards podczas aktywnej suszy. Problem w tym, że stanowy senator ostrzegł już prokuratora generalnego Teksasu, że hrabstwa formalnie nie mają uprawnień do nakładania takich moratoriów, a jedno z hrabstw zostało już pozwane na ponad 100 milionów dolarów za podobny ruch. Dlatego Hays County wstrzymuje się z uczynieniem swojego zakazu trwałym.

**Key takeaways:**
- Realnym wąskim gardłem dla centrów danych AI w Teksasie okazuje się woda, nie moc sieci energetycznej, wbrew dominującej narracji medialnej.
- Lokalne samorządy nakładają moratoria, choć prawnie niejasne jest, czy w ogóle mają do tego uprawnienia. Jedno hrabstwo już zostało pozwane na ponad 100 milionów dolarów.
- San Marcos jako pierwsze miasto w regionie doprowadziło spór do konkretnego rozstrzygnięcia: odrzucenia projektu i trwałego zakazu na poziomie miasta.

**Why do I care:** To temat bardziej dla działów compliance i infrastruktury niż dla frontendu, ale warto go śledzić, jeśli twoja firma planuje skalować obciążenia AI przez chmurę. Dostępność i cena mocy obliczeniowej w regionach takich jak Teksas mogą się nagle zmienić pod wpływem sporów lokalnych, nie tylko globalnej podaży GPU. Kwestia, kto ma prawo powiedzieć nie infrastrukturze AI, będzie się powtarzać w kolejnych stanach i krajach, więc to dobry wskaźnik ryzyka regulacyjnego przy długoterminowym planowaniu kosztów chmury.

**Link:** [Texas' AI Data Center Boom Is Becoming a Fight Over Water](https://hackernoon.com/texas-ai-data-center-boom-is-becoming-a-fight-over-water)

## MCP ogłoszono martwym, a potem usunięto połowę protokołu i wróciło silniejsze

**TLDR:** W marcu 2026 roku "MCP is dead" było uzasadnioną opinią: schematy narzędzi zżerały kontekst, model bezpieczeństwa przeciekał, a cały protokół dało się zastąpić skryptem powłoki. Wydanie z 28 lipca usunęło handshake, warstwę sesji i trzy oryginalne prymitywy, a sześć tygodni później krytycy wycofywali swoje nekrologi.

**Summary:** Przed MCP połączenie N klientów AI z M narzędziami oznaczało N×M osobnych integracji. Protokół zredukował to do N+M, na wzór Language Server Protocol, który wygrał nie dlatego, że był elegancki, tylko dlatego, że każdy go zaimplementował, aż koszt braku wsparcia przewyższył koszt jego dodania. Adopcja poszła szybko: SDK w TypeScript trafiło na npm dwa tygodnie przed publicznym ogłoszeniem przez Anthropic w listopadzie 2024, OpenAI dodało MCP do ChatGPT cztery miesiące później, a do grudnia 2025 protokół miał 97 milionów miesięcznych pobrań SDK i ponad 10 tysięcy aktywnych publicznych serwerów.

Krytyka też była konkretna i policzalna. GitHub zmierzył, że samo skonsolidowanie jednego toolsetu w ich serwerze MCP zaoszczędziło około 23 tysięcy tokenów, a ładowanie 3 do 10 wybranych narzędzi zamiast całych domyślnych zestawów redukuje zużycie kontekstu o 60 do 90 procent. Strona bezpieczeństwa wyglądała jeszcze gorzej. Audyt Astrix Research na ponad 5200 publicznych serwerach MCP pokazał, że 88 procent wymaga poświadczeń, 53 procent polega na długożyjących statycznych sekretach, a tylko 8,5 procent używa OAuth. GitGuardian znalazł 24 008 unikalnych sekretów w publicznych konfiguracjach MCP na GitHubie, z czego 2117 wciąż ważnych w momencie skanu. W kwietniu 2026 badacze z Johns Hopkins przejęli Claude Code, Gemini CLI i GitHub Copilot, wstrzykując instrukcje w tytuły pull requestów i wykradając sekrety CI.

Wydanie z 28 lipca 2026 usunęło `initialize` i nagłówek sesji, więc każde żądanie niesie własną wersję protokołu i możliwości, co pozwala trafiać na dowolną instancję za zwykłym round-robin load balancerem. Routing po nazwach metod i narzędzi przeniósł się do nagłówków HTTP, żeby bramki i WAF-y mogły routować bez parsowania JSON-a, a serwer-initiated elicitation zastąpiono modelem żądanie/odpowiedź bez trzymania otwartego strumienia. Dowodów, że to zadziałało, dostarczyły cztery niezależne sygnały. Cloudflare wycofał własny prymityw `McpAgent`, bo nowa specyfikacja uczyniła go zbędnym. Współzałożyciel Sentry, wcześniej ostry krytyk MCP, wdrożył nową specyfikację na produkcję jeszcze przed jej finalizacją bez przestojów. Simon Willison, autor definiującej krytyki prompt injection z kwietnia 2025, zmienił zdanie w lipcu, argumentując, że powłoka z dostępem do internetu jest trudniejsza do zabezpieczenia niż zdefiniowany zestaw narzędzi MCP.

**Key takeaways:**
- Redukcja z N×M integracji do N+M to ta sama logika, która wcześniej dała wygraną Language Server Protocol: wygrywa nie elegancja, tylko powszechna implementacja.
- Skanowanie tysięcy publicznych serwerów MCP pokazało systemowe problemy bezpieczeństwa: statyczne sekrety, brak OAuth, path traversal w operacjach na plikach.
- Wydanie z 28 lipca 2026 usunęło handshake i sesje, przechodząc na bezstanowe żądania HTTP. To właśnie ta redukcja funkcji, nie ich dodanie, przekonała krytyków.
- Problem wstrzykiwania treści przez opisy i wyniki narzędzi pozostaje nierozwiązany. Nowa specyfikacja utwardziła transport, ale nie dotknęła tego, że odpowiedzi narzędzi trafiają do kontekstu modelu bez żadnej weryfikacji.

**Why do I care:** Jeśli budujesz integracje agentowe, ten tekst to konkretny argument przeciwko traktowaniu MCP jako martwego trendu. Bezstanowy model HTTP oznacza, że możesz w końcu użyć swojego istniejącego stosu do zabezpieczania, obserwowalności i load balancingu HTTP zamiast wynajdywać to na nowo dla każdej sesji MCP. Nie daj się jednak zwieść liczbie pobrań SDK. Opisy narzędzi i ich wyniki wciąż wchodzą do kontekstu modelu jako zaufana treść, więc jeśli podłączasz zewnętrzne serwery MCP do swoich agentów, warto traktować każdy z nich jak potencjalny wektor ataku, a nie jak zaufaną bibliotekę.

**Link:** [MCP Was Declared Dead](https://hackernoon.com/mcp-was-declared-dead)

## DeepAgents od LangChain jako system operacyjny dla długo działających agentów

**TLDR:** LangChain DeepAgents proponuje ustandaryzowaną strukturę wokół LLM-a: planowanie, wirtualny system plików, pamięć krótko- i długoterminową, delegowanie do subagentów oraz punkty kontrolne z udziałem człowieka. Odpowiada na to, że sam model językowy nie wystarcza do prowadzenia wieloetapowych, długo trwających zadań biznesowych.

**Summary:** Teza artykułu jest prosta. LLM świetnie rozumuje na podstawie tego, co dostanie w promptcie, ale nie pamięta wcześniejszych sesji, nie zarządza plikami, nie uruchamia kodu i nie wie, kiedy zapytać człowieka o zgodę. Przy zadaniu w stylu "zbadaj dzisiejsze alerty produkcyjne, porównaj z wcześniejszymi incydentami, uruchom diagnostykę, napisz raport i poproś o zgodę na naprawę" zwykły model gubi kontekst, powtarza kroki i nie ma gdzie trzymać plików pośrednich. DeepAgents, zbudowany na LangGraph, dostarcza gotową infrastrukturę: wirtualny system plików do przechowywania notatek i raportów zamiast trzymania wszystkiego w promptcie, planowanie rozbijające duże zadanie na kroki, pamięć krótkoterminową dla bieżącego zadania i długoterminową dla trwałej wiedzy organizacyjnej, oraz skille jako modularne pakiety wiedzy ładowane dopiero wtedy, gdy są potrzebne, co ogranicza rozmiar promptu zamiast pakować do niego całą dokumentację naraz.

Kluczowy wzorzec to subagenci. Zamiast jednego agenta próbującego ogarnąć wszystko, główny agent deleguje wyspecjalizowane części zadania, badanie, bazę danych, bezpieczeństwo, dokumentację, do mniejszych agentów z izolowanym kontekstem, co pozwala uruchamiać niezależne części równolegle i dobierać tańszy model do prostszych podzadań. Middleware w tle zajmuje się streszczaniem starszej konwersacji, przenoszeniem dużych plików poza kontekst i cache'owaniem promptów, a human-in-the-loop pozwala agentowi zatrzymać się i poczekać na decyzję człowieka przed krytycznym krokiem, z regułami timeoutu na wypadek stref czasowych i nieobecności recenzenta. Przykładowy notebook Alert Triage pokazuje to wszystko w akcji. Agent bada alerty bezpieczeństwa, planuje kroki, deleguje do subagentów, zapisuje ustalenia na wirtualnym dysku i zatrzymuje się przed krytyczną akcją, czekając na zatwierdzenie człowieka.

**Key takeaways:**
- Sam model językowy nie wystarcza do zadań wieloetapowych: brakuje mu pamięci między sesjami, systemu plików i mechanizmu proszenia o zgodę człowieka.
- Subagenci z izolowanym kontekstem pozwalają uruchamiać niezależne części zadania równolegle i dobierać tańszy model do prostszych podzadań, zamiast trzymać wszystko w jednym rozdętym prompcie.
- Skille jako modularne, ładowane na żądanie pakiety wiedzy trzymają prompt krótszym niż upychanie całej dokumentacji na stałe do systemowego promptu.
- Human-in-the-loop z regułami timeoutu to nie dodatek, tylko wymagany element governance dla agentów działających w firmie.

**Why do I care:** To kolejny głos w chórze "agent framework wymaga własnej infrastruktury", ale akurat LangChain ma tu wiarygodność, bo problem zarządzania kontekstem i delegowania zadań rozwiązuje realnie, a nie tylko marketingowo. Dla architekta frontendowego budującego cokolwiek agentowego najważniejszy wniosek jest praktyczny. Jeśli projektujesz system z długo działającymi agentami, granica między "co robi jeden duży model" a "co robi zestaw wyspecjalizowanych subagentów z jasno określonym zakresem" to decyzja architektoniczna analogiczna do podziału monolitu na mikroserwisy, i tak samo łatwo ją przesadzić w obie strony.

**Link:** [Beyond LLMs: Creating Real-World AI Agents with Lang Chain Deep Agents](https://hackernoon.com/beyond-llms-creating-real-world-ai-agents-with-lang-chain-deep-agents)
