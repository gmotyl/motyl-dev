---
title: "HackerNoon: MCP odchudza się do bezstanowego HTTP, Claude Code dostaje przewodnik po całym workflow, a agenty AI walczą o pamięć"
excerpt: "MCP usuwa uścisk dłoni i sesje na rzecz jawnych uchwytów stanu, dziewiąty artykuł serii o Claude Code składa wszystkie warstwy w jeden workflow, a czteroczęściowa seria o pamięci agentów zaczyna od przeglądu trzydziestu narzędzi."
publishedAt: "2026-08-31"
slug: "hackernoon-stateless-mcp-claude-code-workflow-agent-memory-prompt-tip"
hashtags: "#hackernoon #ai #agents #mcp #claude #architecture #prompt-engineering #generated #pl"
source_pattern: "HackerNoon"
---

## MCP odchudza się do bezstanowego HTTP, żeby przetrwać wielogodzinne agenty

**TLDR:** Dwie propozycje SEP usuwają z MCP uścisk dłoni inicjalizacyjny i nagłówek sesji na rzecz jawnych uchwytów stanu przekazywanych przez klienta, co rozwiązuje problem agentów działających godzinami, gdy serwer, z którym rozmawiają, w międzyczasie się restartuje.

**Summary:** Ten artykuł dobrze tłumaczy, dlaczego słowo "sesja" w MCP było od początku przeciążone. Obecna specyfikacja zaczyna każdą interakcję klient-serwer od uścisku dłoni inicjalizacyjnego, serwer wydaje `MCP-Session-Id`, a klient ma dołączać go do każdego kolejnego żądania. Problem w tym, że "sesja" oznacza jednocześnie sesję transportową związaną z połączeniem, sesję negocjacyjną wersji protokołu, sesję aplikacyjną trzymającą kontekst przeglądarki czy połączenie z bazą, oraz sesję agenta obejmującą całe zadanie. Te cztery rzeczy mają zupełnie inne cykle życia, a MCP każe im dzielić jeden mechanizm.

Dla agentów działających długo to nie jest teoretyczny problem. Awaria jednej repliki serwera, która trzymała stan sesji w pamięci, oznacza rozłączenie agenta i konieczność renegocjacji od zera. Skalowanie poziome wymaga sesji lepkich albo rozproszonego magazynu stanu, bo klient jest przypięty do jednej konkretnej repliki. Do tego stan agenta i stan protokołu zaczynają żyć w dwóch osobnych systemach odzyskiwania, co jest źródłem błędów samo w sobie.

Dwie propozycje SEP adresują to wprost: SEP-2575 usuwa uścisk dłoni inicjalizacyjny, przenosząc dane negocjacyjne do każdego żądania z osobna, a SEP-2567 usuwa nagłówek `MCP-Session-Id` całkowicie. W ich miejsce pojawia się jawny uchwyt stanu, który klient przekazuje sam, zamiast polegać na niewidzialnej sesji w tle: `connect_database()` zwraca `connection_id`, który potem trafia do kolejnych wywołań `query()` czy `close_database()`. Taki uchwyt może przetrwać restart klienta, może być świadomie przekazany innemu agentowi, i może być obsłużony przez dowolną replikę serwera, o ile uchwyty są rozwiązywane przez współdzielony magazyn.

Jest jednak haczyk, o którym artykuł uczciwie wspomina: platformy agentowe muszą pilnować, żeby żywe uchwyty przetrwały kompaktowanie kontekstu, bo inaczej stan po stronie serwera, na który wskazują, staje się osierocony. Bezpieczeństwo uchwytów też wymaga uwagi, bo bez uwierzytelnienia uchwyt to w praktyce token bearer, który potrzebuje odpowiedniej losowości, TTL-a i sprzątania.

**Key takeaways:**
- SEP-2575 usuwa uścisk dłoni inicjalizacyjny MCP, SEP-2567 usuwa nagłówek `MCP-Session-Id`
- Jawne uchwyty stanu (np. `connection_id`) zastępują niewidzialną sesję i mogą przetrwać restart klienta
- Bezstanowe żądania mogą trafić do dowolnej repliki serwera, co upraszcza skalowanie poziome i przyspiesza odzyskiwanie po awarii

**Why do I care:** Jeśli budujecie własne serwery MCP albo integrujecie agenty działające dłużej niż pojedyncze zapytanie, ten kierunek zmian bezpośrednio wpłynie na to, jak projektujecie warstwę stanu w waszej infrastrukturze. Warto śledzić te SEP-y teraz, zanim staną się częścią żywej specyfikacji, bo migracja z modelu sesyjnego na uchwyty stanu to nie jest zmiana, którą robi się w jeden wieczór tuż przed deadline'em.

**Link:** [Stateless MCP and the End of Custom Session Workarounds for Long-Running Agents](https://hackernoon.com/stateless-mcp-and-the-end-of-custom-session-workarounds-for-long-running-agents)

## Claude Code jako warstwowy system, nie zestaw niezależnych funkcji

**TLDR:** Dziewiąty artykuł serii o Claude Code składa wszystkie omówione wcześniej warstwy, od CLAUDE.md przez hooki po zespoły agentów, w jeden spójny workflow i pokazuje, gdzie te warstwy wchodzą sobie w drogę w realnych sesjach.

**Summary:** Ten tekst jest wart przeczytania właśnie dlatego, że nie wprowadza niczego nowego, tylko pokazuje interakcje między rzeczami, które osobno wydają się oczywiste. CLAUDE.md trzyma trwały kontekst, model i poziom wysiłku ustawiają kompromis jakość-koszt, hooki wymuszają deterministyczne działania, serwery MCP dają dostęp do zewnętrznych narzędzi, skille ładują wiedzę domenową, subagenty izolują pracę od głównego kontekstu, a zespoły agentów koordynują pracę współdzieloną. Każda warstwa wpływa na pozostałe: przeładowany CLAUDE.md grzebie ważne reguły pod szumem, serwer MCP z pięćdziesięcioma narzędziami napompowuje budżet tokenów na każdym wywołaniu, a subagent zwracający zbyt gadatliwy raport i tak ląduje ze swoim kosztem z powrotem w głównej sesji.

Najbardziej praktyczna część to lista sygnałów, że sesja zaczyna się degradować: Claude zaczyna zastrzegać niepewność przy szczegółach, które wcześniej obsługiwał pewnie, odwołuje się do wcześniejszych decyzji niespójnie, albo wskaźniki zużycia tokenów zbliżają się do terytorium kompaktowania. Kolejność interwencji według kosztu jest konkretna: `/clear` między niepowiązanymi zadaniami, `--continue` zamiast startu od zera, ręczny prompt kompaktujący, a na końcu restart sesji z ciasną specyfikacją, bo pięćsetstokenowa specyfikacja jest bardziej użyteczna niż pięćdziesięciotysięczny zdegradowany kontekst.

Autor wymienia też powtarzalne wzorce awarii: przeładowany CLAUDE.md, w którym ważne reguły toną w szumie, nieoskopowana eksploracja, która powinna trafić do subagenta, gadatliwy output subagenta negujący sens izolacji, oraz luka między zaufaniem a weryfikacją, gdzie wygenerowany kod wygląda dobrze, ale nikt nie sprawdził przypadków brzegowych. Każdy z tych wzorców ma konkretną poprawkę, nie tylko diagnozę.

**Key takeaways:**
- CLAUDE.md powinien zawierać rzeczy, których Claude nie potrafi wywnioskować z kodu, nie ogólne dobre praktyki
- Sygnały degradacji sesji (niepewność, niespójne odwołania, rosnące zużycie tokenów) wymagają interwencji w konkretnej kolejności kosztowej
- Serwery MCP i subagenty trzeba oskopować per projekt i pilnować formatu ich outputu, inaczej negują sens izolacji kontekstu

**Why do I care:** Cała ta seria jest dobrym materiałem referencyjnym dla zespołów, które dopiero układają swój setup Claude Code, ale ten konkretny artykuł jest przydatny nawet dla kogoś, kto już z tym pracuje na co dzień, bo lista wzorców awarii czyta się jak lista własnych błędów sprzed kilku tygodni. Diagnostyka "jeśli poprawiałeś to samo więcej niż dwa razy, to powinno trafić do CLAUDE.md" to konkretna, łatwa do zastosowania reguła.

**Link:** [Navigating Claude Code: The Full Workflow](https://hackernoon.com/navigating-claude-code-the-full-workflow)

## Czyja to pamięć? Przegląd trzydziestu narzędzi do pamięci agentów AI

**TLDR:** Pierwsza część czteroczęściowej serii o budowie wielopoziomowej pamięci dla agentów w Kubernetesie zaczyna od taksonomii typów pamięci i przeglądu około trzydziestu narzędzi, od Mem0 przez Zep/Graphiti po natywną pamięć Claude'a i OpenAI.

**Summary:** Autor rozszerzał Kubernetes Agent Orchestration System o wielopoziomową pamięć (krótko-, średnio- i długoterminową) i po drodze trafił na te same problemy, które napotka każdy budujący coś podobnego, więc spisał wnioski w czterech częściach. Ta pierwsza część oddziela pamięć od pojęć, z którymi jest często mylona: okno kontekstu trzyma stan roboczy jednego wywołania modelu, historia sesji trzyma transkrypcję, a telemetria promptów trzyma konkretne wywołania. Prawdziwa "pamięć" to komponent trzymający informacje krótko-, średnio- i długoterminowe, które agent niesie między turami i sesjami.

Ciekawa jest tabela pokazująca, jak mało frameworków realnie implementuje wszystkie typy pamięci z literatury (epizodyczną, semantyczną, proceduralną, czasową). W praktyce epizodyczna i semantyczna zlewają się w jedno, proceduralna pojawia się głównie w agentach kodujących, a czasowa bywa zastępowana zwykłym "zapominaniem". Autor pokazuje też, dlaczego najprostsze podejścia zawodzą: trzymanie ostatnich N wiadomości rośnie bez ograniczeń, a "po prostu embedduj wszystko" to lepsza wyszukiwarka po historii, nie pamięć w sensie, o którym mowa w artykule. Nawet powtarzanie całej historii w oknie kontekstu przy dłuższych interakcjach obniża trafność modelu o 30-60% względem tego samego modelu z wyrocznią do wyszukiwania, według benchmarku UCLA.

Przegląd trzydziestu narzędzi w trzech warstwach (dedykowane frameworki pamięci, frameworki agentowe z natywną pamięcią, usługi komercyjne) prowadzi do konkluzji, że Mem0 wygrywa przy najniższym tarciu integracyjnym, ale żadne narzędzie nie jest idealne: rozwiązania grafowe jak Graphiti czy Cognee mają najbogatszy model pamięci, ale najwyższy koszt operacyjny, a zbudowanie tego samodzielnie na surowej bazie wektorowej daje pełną kontrolę kosztem odtwarzania dojrzałej ekstrakcji i wyszukiwania, które już istnieje w licencjach permisywnych. Nawet dane samego Mem0 pokazują, że pamięć poprawia latencję i koszt (91% mniej czasu p95, ponad 90% mniej tokenów), ale nie surową dokładność, która w ich własnej ewaluacji jest niższa niż w pełnym kontekście bez pamięci.

**Key takeaways:**
- Pamięć agenta to osobny komponent od okna kontekstu, historii sesji i telemetrii promptów, mimo że łatwo je pomylić
- Powtarzanie całej historii w kontekście zamiast selektywnego wyszukiwania obniża trafność modelu o 30-60% przy dłuższych interakcjach
- Mem0 wygrywa integracyjnie, ale poprawia latencję i koszt kosztem surowej dokładności względem pełnego kontekstu

**Why do I care:** Jeśli wasz zespół dopiero zaczyna dodawać pamięć długoterminową do własnego agenta, ten artykuł oszczędzi wam tygodnie błądzenia między "po prostu trzymaj ostatnie N wiadomości" a "embeduj wszystko", bo obie te drogi autor już przeszedł i pokazuje, gdzie kończą się ślepym zaułkiem. Tabela z trzydziestoma narzędziami to konkretny punkt startowy do własnej ewaluacji, zamiast wybierania pierwszego narzędzia z listy popularności na GitHubie.

**Link:** [Whose Memory Is It? Building Multi-Tenant, Multi-Tier Memory for AI Agents (Part 1)](https://hackernoon.com/whose-memory-is-it-building-multi-tenant-multi-tier-memory-for-ai-agents-part-1)

## Nie pisz promptów dla modelu, który już dawno ewoluował

**TLDR:** Współczesne modele rozumujące same weryfikują swoje kroki i same dobierają głębokość myślenia, więc instrukcje w stylu "sprawdź dwa razy" czy "myśl głęboko" nie dodają bezpieczeństwa, tylko zjadają tokeny i tarcie, a warto zamiast tego ustawić realny poziom wysiłku, zakres, długość i autonomię.

**Summary:** To jeden z tych tekstów, które zmuszają do przejrzenia własnych szablonów promptów zamiast czytania ich jako ciekawostki. Autor punktuje konkretne wzorce: wymuszona weryfikacja każe modelowi rozumującemu weryfikować rzeczy, które i tak by zweryfikował, "myśl głęboko" jako uniwersalny prefiks nie mapuje się dziś na nic, bo API mają jawny parametr poziomu wysiłku, a bezwzględne ZAWSZE/NIGDY napisane dla decyzji wymagających osądu zamienia niuansową decyzję w regułę wykonywaną dosłownie, nawet gdy dosłowne odczytanie jest błędne.

Konkretna rekomendacja to przepisanie promptu według szablonu z 2026 roku: rola, cel, kryteria sukcesu, ograniczenia, format wyjścia, reguły zatrzymania. Zamiast instrukcji krok po kroku warto opisać oczekiwany rezultat. OpenAI podaje, że przycięcie ich wewnętrznych promptów agentowych, usunięcie powtórzonych instrukcji i zbędnych przykładów podniosło wyniki ewaluacji o 10-15%, a zużycie tokenów spadło o 41-66%.

Artykuł zawiera też gotowy meta-prompt do automatycznego przycinania starych promptów według tych samych reguł, co jest praktycznym skrótem, jeśli macie dziesiątki starych promptów w produkcji i nie chce się wam przepisywać każdego ręcznie. Autor zastrzega uczciwie, że to podejście działa dla modeli rozumujących z jawnym parametrem wysiłku, a mniejsze czy starsze modele bez tych domyślnych zachowań dalej mogą potrzebować pełnego rusztowania instrukcji.

**Key takeaways:**
- Wymuszona weryfikacja i "myśl głęboko" duplikują to, co model rozumujący już robi domyślnie, więc tylko zjadają tokeny
- Szablon promptu z 2026 roku (rola, cel, kryteria sukcesu, ograniczenia, format, reguły zatrzymania) zastępuje opis kroków opisem rezultatu
- Przycięcie promptów agentowych podniosło u OpenAI wyniki ewaluacji o 10-15% przy spadku tokenów o 41-66%

**Why do I care:** Jeśli utrzymujecie własne prompty systemowe dla agentów w produkcji, to konkretna, wykonalna checklista do przeglądu przed kolejnym wydaniem, nie tylko teoria. Autonomia jako osobny, jawnie ustawiony parametr to fragment, który najczęściej pomijamy, a który realnie decyduje, czy agent pyta o zgodę przy trywialnych zmianach, czy pędzi dalej przy czymś, co powinno wymagać potwierdzenia.

**Link:** [AI Coding Tip 031 - Don't Write Prompts for a Model That Evolved](https://hackernoon.com/ai-coding-tip-031-dont-write-prompts-for-a-model-that-evolved)
