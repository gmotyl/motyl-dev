---
title: "ReactBench, Inkling, Postgres w Rust i zmęczony człowiek w pętli AI"
excerpt: "Przegląd najważniejszych tematów tygodnia: nowy benchmark dla React, otwarty model Inkling, Postgres pisany w Rust, narzędzia dla agentów i szczera rozmowa o wypaleniu programistycznym."
publishedAt: "2026-07-17"
slug: "reactbench-inkling-postgres-rust-human-in-the-loop"
hashtags: "#uidev #react #typescript #ai #architecture #pl"
source_pattern: "ui.dev"
---

## ReactBench: czy modele naprawdę potrafią pisać React?

**TLDR:** ReactBench to nowy benchmark oceniający agentów kodujących na realistycznych zadaniach React. Wyniki pokazują, że nawet najlepsze modele rozwiązują mniej niż połowę zadań, a kod często przechodzi testy behawioralne, ale nie spełnia standardów jakości React.

**Summary:**

Zespół stojący za React Doctor, React Scan i Million.js opublikował ReactBench, benchmark oceniający agentów AI na prawdziwych zadaniach z istniejących repozytoriów open-source. To nie są syntetyczne zagadki, ale realne zmiany wyciągnięte ze scalonych pull requestów. Każde zadanie musi przejść nie tylko testy behawioralne, ale też statyczną analizę React Doctor z ponad 400 regułami wykrywającymi błędy, problemy z efektami ubocznymi, renderowaniem i dostępnością.

Wyniki są pouczające. GPT-5.6 Sol uzyskał najwyższy wynik na poziomie 43,1%, Claude Fable 5 osiągnął 41,2%, ale kosztuje prawie 6 razy więcej za każdy przebieg. Żaden model nie rozwiązuje więcej niż połowy zadań. Co więcej, zadania "Write React" i "Fix React" kończą się niepowodzeniem z różnych powodów: pierwsze głównie przez błędy behawioralne, drugie przez niespełnienie wymagań React Doctor przy zachowanym działaniu aplikacji.

Spośród ponad 4400 prób Write React, modele łącznie wprowadziły 1194 graded issues. Bugs stanowiły 77,5% z nich. Najczęstsze problemy to renderowanie list i poprawność hooków. To nie są błahe wpadki. Cloudflare udowodniło we wrześniu 2025, że jeden błędny useEffect może zrujnować produkcję.

Ważna obserwacja metodologiczna: ReactBench ocenia agentów, a nie modele w izolacji. Różnice między Codex CLI, Claude Code, Cursor i innymi harnesses mają realny wpływ na wyniki. To uczciwe przyznanie, że benchmark mierzy system, nie tylko model.

**Key takeaways:**
- Żaden model nie przekroczył 44% na ReactBench, co pokazuje ogromną przestrzeń do poprawy w pisaniu produkcyjnego React
- GPT-5.6 Terra w konfiguracji Medium oferuje najlepszy stosunek ceny do jakości: 38% przy jednej trzeciej kosztów Sol XHigh
- Testy behawioralne i weryfikacja React Doctor mierzą różne aspekty jakości kodu i oba są potrzebne

**Why do I care:** Jako ktoś, kto spędził dużo czasu na code review React, ReactBench trafia w sedno. Większość benchmarków kodujących ignoruje specyficzne dla frameworka antywzorce. Fakt, że modele regularnie wprowadzają błędy w hookach i renderowaniu list, nawet przy przechodzeniu testów, to dokładnie ten rodzaj ukrytego długu technicznego, który zjada produkcyjne systemy. Różnica między wynikami Write i Fix jest szczególnie interesująca: modele lepiej implementują nowe rzeczy niż naprawiają istniejące problemy. To ma sens, bo refaktoryzacja wymaga głębszego rozumienia intencji kodu.

**Link:** [Introducing ReactBench](https://www.reactbench.com/blog)

---

## Inkling: otwarty model wagowy od Thinking Machines

**TLDR:** Thinking Machines opublikowało Inkling, otwarty model Mixture-of-Experts z 975B parametrami (41B aktywnych), obsługujący tekst, obraz i audio. Model jest dostępny do fine-tuningu na platformie Tinker.

**Summary:**

Thinking Machines wydało Inkling, swój pierwszy model z otwartymi wagami. To architektura Mixture-of-Experts ze 256 ekspertami per warstwa, z czego 6 aktywnych na token. Model przeszedł pretraining na 45 bilionach tokenów obejmujących tekst, obrazy, audio i wideo. Obsługuje okno kontekstu do 1M tokenów i oferuje regulowane myślenie, czyli możliwość kontrolowania ile tokenów model poświęca na reasoning, co bezpośrednio przekłada się na koszty wnioskowania.

Na Design Arena's Agentic Web Dev Leaderboard Inkling zajął 7. miejsce z wynikiem 1257 punktów Elo, tuż za GPT 5.6 Sol (1260) i Grok 4.5 (1271). To przyzwoity wynik, ale nie rewelacja. Mocniejsze są wyniki w instruction following (IFBench 79,8%), gdzie bije część modeli zamkniętych, oraz w audio (VoiceBench 91,4%).

Co wyróżnia Inkling na tle innych otwartych modeli? Po pierwsze kontrolowane myślenie, gdzie model może operować na ułamku tokenów przy zachowaniu porównywalnej wydajności. Na Terminal Bench 2.1 osiąga wyniki Nemotron 3 Ultra przy jednej trzeciej tokenów. Po drugie, model był trenowany z myślą o kalibrowaniu pewności siebie, czyli poprawnym wyrażaniu wątpliwości zamiast konfabulowania. Na ForecastBench osiąga Brier Index 61,1, porównywalny z Gemini 3.1 Pro.

Warto zauważyć co Thinking Machines przemilcza. Benchmarki self-reported to zawsze ryzykowny grunt. Wyniki na SWEBench Verified (77,6%) używają "bash-only harness", co jest inną konfiguracją niż używana dla konkurencyjnych modeli. Terminal Bench 2.1 wyklucza zanieczyszczone rozwiązania z wyszukiwania webowego. Małymi gwiazdkami jest gęsto.

**Key takeaways:**
- Inkling osiąga efektywność tokenową znacznie lepszą niż porównywalne modele open-weights dzięki regulowanemu myśleniu
- Model jest dostępny na Hugging Face jako pełne wagi i checkpoint NVFP4 zoptymalizowany pod Blackwell
- Fine-tuning na platformie Tinker jest możliwy już teraz z 50% zniżką przez ograniczony czas

**Why do I care:** Dobry otwarty model multimodalny z regulowanym myśleniem to duży krok. Inkling nie jest numerem jeden w żadnej kategorii, ale łączy audio, wizję i tekst w jednym modelu z otwartymi wagami i możliwością fine-tuningu. To właśnie ta kombinacja ma wartość: możesz dostosować model do domeny, kontrolować koszty inference i nie zależeć od żadnego providera. Sprawdzam, czy Thinking Machines ma środowisko testowe, bo benchmark charts to nie to samo co zachowanie przy prawdziwym użytkowaniu.

**Link:** [Inkling: Our open-weights model](https://thinkingmachines.ai/news/introducing-inkling/)

---

## Turso: Postgres pisany w Rust, na rdzeniu SQLite

**TLDR:** Turso ogłosił, że zbuduje implementację Postgres na bazie swojego silnika SQLite napisanego w Rust. Celem jest stworzenie "LLVM baz danych", czyli jednego rdzenia obsługującego wiele frontendów SQL.

**Summary:**

Turso zaczęło jako pełny przepis SQLite w Rust z nowoczesnymi możliwościami: MVCC, bogatym systemem typów i automatycznie aktualizującymi się widokami zmaterializowanymi. Teraz ogłaszają kolejny krok: implementację frontendu Postgres na tym samym rdzeniu. Koncepcja jest elegancka, SQLite wewnętrznie kompiluje SQL do bytecodu VDBE. Turso to rozszerzyło i sparametryzowało. Zamiast tłumaczyć zapytania Postgres na SQLite, parsują SQL Postgres do wspólnego AST i kompilują do bytecodu Turso.

Czy to działa? Tak, w ograniczonym zakresie. Projekt pgmicro istnieje już jako eksperyment scalony z głównym drzewem. Można go zbudować i uruchomić ze źródeł. Pełna kompatybilność z Postgres to jednak zupełnie inna rozmowa. Heap files, tuple versioning, VACUUM, pełna obsługa PL/pgSQL to złożone problemy, których nie rozwiązuje się w kilka miesięcy.

Ale nie to jest tu najważniejsze. Naprawdę interesujące jest to, co materialized views ujawniają o architekturze. Turso ma live views które aktualizują się automatycznie, bo ich silnik jest zaprojektowany pod tym kątem od podstaw. Postgres od lat ma z tym problem. Jeśli architektura jest lepsza, zgodność w 100% może być mniej ważna niż pragmatyczna kompatybilność z głównymi przypadkami użycia.

Turso obiecuje: embedded Postgres w przeglądarce, Postgres jako plik, tysiące izolowanych instancji per użytkownik. To nie jest marketingowy slogan. Mają demo Doom uruchamiające się jako bytekod VDBE w przeglądarce. Silnik faktycznie działa na WASM.

**Key takeaways:**
- Turso przyjmuje model LLVM, jeden sprawdzony rdzeń, wiele frontendów SQL, zaczynając od SQLite i Postgres
- Live materialized views to potencjalnie największa różnica architektoniczna wobec tradycyjnego Postgres
- Kompatybilność z protokołem wire Postgres jest planowana, więc ORMy i psql powinny działać

**Why do I care:** Embedded bazy danych zawsze mnie fascynowały. SQLite to jeden z najbardziej niezawodnych kawałków oprogramowania w historii, a Turso buduje na tej solidności. Jestem sceptyczny wobec harmonogramów, pełne wsparcie dla złożonych funkcji Postgres zajmuje lata, ale architektura ma sens. Local-first aplikacje potrzebują dobrego SQL, który działa w przeglądarce i offline. Jeśli Turso dostarczy 80% Postgres w środowiskach gdzie wcześniej musiałeś używać SQLite lub IndexedDB, to jest realny postęp.

**Link:** [We're building Postgres in Rust. Using the LLVM of databases](https://turso.tech/blog/a-new-modern-version-of-postgres-in-rust)

---

## Zmęczony człowiek w pętli: szczera rozmowa o programowaniu z AI

**TLDR:** Artykuł z Pydantic opisuje uczciwie, jak programowanie z LLM wygląda od środka: jest bardziej produktywne, ale też bardziej wyczerpujące, bardziej izolujące i mniej satysfakcjonujące niż tradycyjne pisanie kodu.

**Summary:**

Ten artykuł jest rzadkim przypadkiem szczerego opisania rzeczywistości zamiast techno-entuzjazmu lub nihilizmu. Autor, pracujący w Pydantic nad narzędziami dla agentów AI, opisuje konkretne doświadczenia: kolega budzący się rano przy 30 nowych PR-ach wygenerowanych przez AI i konieczność podejmowania błyskawicznych decyzji o każdym z nich. Dwie pełne dnia spędzone na pisaniu planów dla LLM tylko po to, żeby model nadal robił nieoczekiwane rzeczy, jak przeniesienie hooka React do pliku Storybook.

Kluczowa obserwacja dotyczy "problemu funkcji nagrody". Ręczne pisanie kodu generowało małe, regularne nagrody: zrozumienie problemu, rozwiązanie zagwozdki, działający kompilator. AI-assisted programming zautomatyzowało dużą część tej pracy, zastępując ją kognitywnym ciężarem nadzoru i przeglądu. Satysfakcjonująca część skurczyła się. Wyczerpująca część urosła. Nowych nagród nie przybyło.

Autor używa analogii do responsive design, zmiany paradygmatu która ok. 2009 roku wywróciła do góry nogami pracę designerów webowych. Ci, którzy przeżyli przejście, przeprojektowali swoje umiejętności: oko na proporcje nadal liczyło się, obsesja na pixel-perfect layout przestała. Podobny proces wydaje się zachodzić teraz. Umiejętności się przesuwają: ważniejsze staje się architektoniczne myślenie, taste, zdolność oceny co jest dobre, bo generujesz o wiele więcej kodu do oceny.

Co konkretnie pomaga? Pre-mortems na złożonych planach: pytanie nowej sesji LLM "zakładając że ten plan całkowicie się posypał, dlaczego?". Jeden z inżynierów zbudował narzędzie wydobywające reguły z tysięcy jego własnych komentarzy do code review, żeby zasypać nimi AGENTS.md. To nie jest śmierć ekspertyzy, to jej destylacja.

**Key takeaways:**
- Nadzorowanie LLM to nowy, rzeczywisty rodzaj zmęczenia poznawczego, który warto nazywać wprost, a nie traktować jako osobistą słabość
- Liczba rzeczy, które można zacząć, dramatycznie wzrosła; liczba rzeczy, które można przemyśleć do końca, nie zmieniła się
- Architektoniczne opinie i umiejętność oceny jakości stają się ważniejsze niż kiedykolwiek, bo jesteś bramką jakości dla znacznie większego wolumenu kodu

**Why do I care:** Rzadko widzę tak uczciwy opis z wnętrza zespołu budującego narzędzia AI. Autor nie sprzedaje marzenia ani nie straszy, tylko opisuje co faktycznie się dzieje. "The number of things you can start has dramatically increased. The number of things you can thoughtfully finish hasn't changed at all" to zdanie, które zapamiętam na długo. Zgadzam się z diagnozą: bottleneck nigdy nie był w pisaniu kodu, tylko w myśleniu. AI to ujawniło. Czy to dobra czy zła wiadomość, zależy od tego, jak dobrze umiesz myśleć.

**Link:** [The Human-in-the-Loop is Tired](https://pydantic.dev/articles/the-human-in-the-loop-is-tired)

---

## Burrow: cała maszyna deweloperska w zakładce przeglądarki

**TLDR:** Burrow to open-source projekt uruchamiający Bun, git, shell i lokalnego agenta AI całkowicie w przeglądarce, bez żadnego backendu. Transpiler Bun skompilowany do WASM, wirtualny system plików i model AI na WebGPU działają w jednej zakładce.

**Summary:**

Burrow rozwiązuje fascynujący problem inżynierski: jak uruchomić Bun w przeglądarce, skoro Bun jest napisany w Zig na JavaScriptCore, a JSC-in-WASM nie jest praktyczne? Odpowiedź jest prosta: zamiast emulować cały runtime, bierzesz rzeczywisty transpiler Bun (skompilowany do WASM przez niestandardowy WASI shim) i uruchamiasz JavaScript na natywnym silniku przeglądarki. Wirtualizujesz tylko otoczenie, system plików, procesy i sieć.

Architektura jest przemyślana. Wspólny wirtualny system plików oparty na InMemoryFs obsługuje edytor, shell, git i runtime równocześnie, zapisując snapshoty do IndexedDB. Web Workers działają jak procesy: każde bun run tworzy dedykowany worker. Service worker przechwytuje requesty HTTP do previewu i przekierowuje je do właściwego handlera w danej sesji. Graceful hot reload zastępuje running worker nowym dopiero gdy nowy potwierdzi że nasłuchuje, więc błąd w edytorze nie dropuje działającego serwera.

Agent AI to Qwen3-0.6B lub Gemma uruchomiony na WebGPU przez transformers.js. Wagi pobierane są raz, inference działa na GPU użytkownika. Agent działa w pętli tool-use: czyta pliki, edytuje, uruchamia komendy shell, widzi wyniki. Wszystko in-browser, nothing leaves the tab.

Warto być szczerym wobec ograniczeń. Burrow to wczesny projekt. Brak surowego TCP wyklucza native clients Postgres i Redis. Brak lifecycle scripts dla npm. Brak git push/pull. WebContainers ma lata pracy w budowaniu prawdziwej emulacji Node.js i jest nieporównywalnie bardziej kompletny. Ale Burrow jest MIT, open-source i ma lokalnego agenta AI w standardzie, czego WebContainers nie ma.

**Key takeaways:**
- Burrow używa prawdziwego transpilera Bun (WASM) zamiast reimplementacji, co gwarantuje zachowanie Bun semantics
- Architektura modułowa z service locator registry (src/contract) zamiast bezpośrednich importów między modułami to godny wzorzec dla podobnych projektów
- Agent AI działa całkowicie lokalnie na WebGPU, zero cloud calls podczas inference

**Why do I care:** Lokalne środowisko deweloperskie w przeglądarce to nie jest tylko techniczna ciekawostka. W erze gdzie coraz więcej pracy odbywa się na urządzeniach gdzie nie możesz instalować nativnych narzędzi, lub gdzie chcesz zapewnić izolację per użytkownik bez spinowania serwerów, Burrow pokazuje realne podejście. Architektura z shared VFS i modułową separacją przez service locator jest lepsza niż mogłoby się wydawać w early-stage projekcie. Największy znak zapytania to wydajność pod obciążeniem i prawdziwa kompatybilność npm.

**Link:** [GitHub - Dhravya/burrow](https://github.com/Dhravya/burrow)

---

## Praktyczny przewodnik po redukcji kosztów tokenów w agentach AI

**TLDR:** Adam Jacob pokazuje jak zastąpienie koordynującego agenta deterministycznym workflow zredukowało zużycie tokenów 8 razy i czas wykonania 2 razy, przy zachowaniu identycznej funkcjonalności.

**Summary:**

Punkt wyjścia to case study: David Cramer z Sentry wydał ponad 10 000 dolarów na tokeny w ciągu tygodnia. Znaczna część to skill "Garfield", adaptacyjny system code review działający przez koordynującego agenta wysyłającego serię sub-agentów do oceny kodu. Jeden przebieg Garfield zużywał 4,5 miliona tokenów, trwał 12 minut i angażował 23 sub-agentów.

Adam Jacob przepisał Garfield jako "swamp extension", gdzie koordynator przestaje być LLM i staje się deterministycznym kodem. Sub-agenty są woływane tylko tam gdzie potrzebują prawdziwej inteligencji do oceny. Wynik: 500 tysięcy tokenów, 6,5 minuty, 3 agenci. Osiem razy taniej, dwa razy szybciej.

Kluczowa idea jest prosta do opisania, trudna do konsekwentnego stosowania: używaj LLM tam gdzie potrzebujesz niedeterministycznej oceny, używaj deterministycznego kodu wszędzie indziej. Koordynujący agent który tylko przekazuje zadania i zbiera wyniki to najdroższy możliwy wzorzec, bo płacisz za intelligence w miejscu gdzie komputer bez żadnej intelligence od dziesięcioleci radzi sobie lepiej.

Interesujące jest też odkrycie przy testach czarnej skrzynki: Garfield jako skill "failed open" przy trudnych przypadkach, ogłaszał sukces mimo pozostałych defektów. Swamp workflow "failed closed", raportując że znaleziska pozostają. To nie tylko efektywność, to lepsza semantyka błędu. Z perspektywy systemów produkcyjnych, lepsze zachowanie przy edge cases jest często ważniejsze niż wydajność przy happy path.

Metodologia testowania jest warta odnotowania: osobna sesja agenta do pisania test suite, żeby agent nie mógł modyfikować własnych UAT. Black box testing jako pierwszoklasowy artefakt. To jest dojrzałe myślenie o AI systemach, które rzadko widać w tutorial-style postach.

**Key takeaways:**
- Koordynujący agent LLM to najdroższy możliwy wzorzec dla pracy, którą deterministyczny kod wykonuje lepiej
- Typed, versioned data między agentami eliminuje kosztowne cykle ponownego przetwarzania przez sub-agenty
- Black box UAT testing agentów w oddzielnym kontekście to praktyczny sposób na zapobieganie regresjom

**Why do I care:** Ten artykuł jest antidotum na "agenty wszystko" myślenie. Obserwuję jak zespoły projektują systemy gdzie LLM koordynuje inne LLM koordynujące inne LLM, a każde z nich jest niepotrzebnie drogi dla swojego zadania. Oddzielenie "gdzie potrzebujemy intelligence" od "gdzie potrzebujemy determinizmu" to fundamentalna umiejętność projektowania AI systemów. Fakt że można to zrobić bez utraty funkcjonalności i z lepszym zachowaniem przy błędach to mocny argument za deterministycznym podejściem tam gdzie to możliwe.

**Link:** [A Practical Guide to Reducing Token Spend](https://www.adamhjk.com/blog/a-practical-guide-to-reducing-token-spend/)

---

## Grok Build: terminalowy agent kodujący od SpaceXAI

**TLDR:** SpaceXAI opublikowało kod źródłowy swojego agenta kodującego Grok Build jako open-source w Rust. Jest to pełnoekranowy TUI obsługujący edycję plików, komendy shell, wyszukiwanie i integrację z MCP.

**Summary:**

Grok Build to terminalowy interfejs użytkownika napisany w Rust, działający jako agent kodujący. Rozumie kod, edytuje pliki, wykonuje komendy shell, przeszukuje web i zarządza długotrwałymi zadaniami. Obsługuje tryb interaktywny, headless dla skryptów i CI, oraz integrację z edytorami przez Agent Client Protocol.

Repozytorium zawiera kompletny kod źródłowy paczek: TUI (scrollback, prompt, modals, rendering), runtime agenta, implementacje narzędzi (terminal, edycja plików, wyszukiwanie) i workspace (filesystem hosta, VCS, wykonywanie, checkpointy). Kod jest dostępny pod licencją Apache 2.0 i jest synchronizowany okresowo z wewnętrznym monorepo SpaceXAI.

Ograniczenie warte odnotowania: root Cargo.toml jest generowany i traktowany jako read-only. Ktoś kto chce zrozumieć architekturę dependency powinien patrzeć na per-crate Cargo.toml. To niestandardowe dla Rust projektów, gdzie workspace Cargo.toml zwykle jest ręcznie zarządzany.

Samo istnienie tego repo jest ciekawe z perspektywy rynku. OpenAI ma Codex CLI w TypeScript, Anthropic Claude Code, teraz SpaceXAI publikuje swój agent w Rust. Każdy major AI provider buduje własny terminal agent i upublicznia kod. To dobry moment żeby porównać architekturalne podejścia.

**Key takeaways:**
- Grok Build napisany w Rust oferuje natywne binaria dla macOS, Linux i Windows
- Agent Client Protocol (ACP) umożliwia integrację z zewnętrznymi edytorami jako embedded agent
- Headless mode pozwala na użycie Grok Build w skryptach i CI bez interakcji użytkownika

**Why do I care:** Interesuje mnie głównie architektura, nie konkretny produkt. Rust jako wybór dla terminal agenta ma sens: zero-cost abstractions, memory safety bez GC, szybki cold start. Porównanie z jak OpenAI podeszło do Codex CLI w TypeScript, a Anthropic do Claude Code jest wartościowym ćwiczeniem architektonicznym. Sama publikacja kodu to również sygnał, że SpaceXAI chce przyciągnąć zewnętrznych kontrybutorów i budować ekosystem wokół Grok.

**Link:** [GitHub - xai-org/grok-build](https://github.com/xai-org/grok-build)
