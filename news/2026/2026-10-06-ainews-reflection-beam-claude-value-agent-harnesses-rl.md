---
title: "Reflection wypuszcza Beam, Claude okazuje się 5 razy bardziej opłacalny niż ChatGPT, a agentowe harnessy stają się środowiskami RL"
excerpt: "Cotygodniowy przegląd AI News: premiera otwartego modelu Beam od Reflection, analiza SemiAnalysis pokazująca przewagę subskrypcji Claude nad OpenAI, oraz badania zamieniające istniejące narzędzia agentowe w środowiska treningowe."
publishedAt: "2026-10-06"
slug: "ainews-reflection-beam-claude-value-agent-harnesses-rl"
hashtags: "#AINews #ai #llm #agents #anthropic #openai #generated #pl"
source_pattern: "AINews"
---

## Reflection w końcu wychodzi z ukrycia i pokazuje Beam

**TLDR:** Po ponad roku w trybie "stealth" Reflection wypuściło Beam, model MoE o 501 miliardach parametrów (23 miliardy aktywnych) trenowany od zera pod kątem kodowania, zadań agentowych i nauki, z pełnymi wagami na licencji Apache 2.0 zapowiedzianymi na ten miesiąc.

**Summary:** Zespół deklaruje trening na 23,8 biliona tokenów, częściowo z pipeline'u OCR przepuszczającego setki milionów plików PDF, oraz stabilny przebieg RL na 10 tysiącach układów GB300 z ponad 100 milionami rolloutów na około milionie zadań. Zgłaszany wynik 80,9 na SWE-bench Verified plasuje Beam w okolicach GLM-5.2, czyli poniżej aktualnej czołówki (GLM 5.3, Kimi K3, Qwen 3.8 Max, DeepSeek V4.1 Flash), ale niezależni obserwatorzy, w tym Artificial Analysis, już sygnalizują, że może to być jeden z najbardziej efektywnych tokenowo otwartych modeli na rynku. Elie Bakouch szacuje wykorzystanie mocy obliczeniowej w treningu na zaledwie około 12% BF16 MFU i czyta architekturę jako przeplot uwagi globalnej i przesuwnego okna w proporcji 3 do 1.

Kontekst finansowy jest tu równie ważny co sam model: według Axios Reflection płaci 150 milionów dolarów miesięcznie za compute Colossus plus ma umowę z Nebiusem wartą miliard dolarów, a inni, na razie nienazwani amerykańscy gracze, mają w tym miesiącu wypuścić własne otwarte modele. Nathan Lambert grupuje Beam razem z wydaniami Nvidii i Thinking Machines jako mocne, ale wciąż ustępujące chińskim odpowiednikom próby odpowiedzi USA na otwarty ekosystem modeli.

**Key takeaways:**
- Beam to 501B/23B MoE z pełnymi wagami na Apache 2.0, trenowany na 23,8 biliona tokenów częściowo z OCR-owanych PDF-ów.
- Wynik 80,9 na SWE-bench Verified plasuje model w okolicach GLM-5.2, poniżej aktualnej czołówki otwartych modeli.
- Reflection płaci 150 milionów dolarów miesięcznie za compute, co pokazuje skalę kosztów stojących za "stealthowym" rozwojem modelu przez ponad rok.

**Why do I care:** Z punktu widzenia architektury wybór modelu to coraz częściej nie pytanie "który jest najlepszy w benchmarkach", tylko "który najlepiej równoważy koszt tokenów z realną jakością na moim konkretnym zadaniu", a seria niezależnych ocen efektywności tokenowej Beam (Artificial Analysis) będzie tu bardziej miarodajna niż oficjalne liczby producenta.

**Link:** [AI News for 10/03/2026-10/5/2026: Reflection Beam](https://www.latent.space/p/ainews-reflection-beam-501b-a23b)

## SemiAnalysis: subskrypcja Claude daje 5 razy więcej wartości niż plany OpenAI

**TLDR:** Test limitów użycia przeprowadzony przez SemiAnalysis na planach Anthropic, OpenAI, Mety, SpaceXAI, MiniMax, Moonshot, Cursora i Cognition pokazał, że subskrypcje Claude dostarczają ponad pięciokrotnie więcej wartości liczonej w ekwiwalencie cen API niż porównywalne plany OpenAI, choć po skorygowaniu o rzeczywisty koszt realizacji zadania przewaga spada do 1,3 do 2,9 razy.

**Summary:** Metodologia liczy wartość na podstawie kosztu kredytów za model i typ tokenu, nie na podstawie cennikowych cen API, co samo w sobie jest ważnym zastrzeżeniem przy czytaniu takich porównań. Jeden z analityków, bez pełnego potwierdzenia, szacuje, że Anthropic przeznacza 42% mocy obliczeniowej inferencji na subskrypcje generujące zaledwie około 10% przychodu, co, jeśli prawdziwe, tłumaczyłoby presję na OpenAI, by odpowiedzieć czymś konkretnym.

OpenAI odpowiedziało dwutorowo: z jednej strony nowi użytkownicy planu za 200 dolarów mieli przez jakiś czas zablokowaną rejestrację, a limity użycia zostały efektywnie przepołowione na wszystkich planach, z drugiej strony szef Codexa, Tibo, obiecał publicznie wymierną poprawę albo pełny reset co 28 dni, a domyślna prędkość GPT-6 Astra i GPT-6.1 Sol wzrosła o około 50%, z 30 do 50 tokenów na sekundę, obejmując wszystkie powierzchnie subskrypcyjne i partnerów logujących się przez ChatGPT, takich jak OpenCode, Pi, Amp czy Devin. Raportowany przez The Information spadek użycia Claude Code w Mecie z 60 do 30 tysięcy użytkowników, tłumaczony przepychaniem własnych narzędzi, pokazuje, że nawet przewaga w testach wartości nie gwarantuje utrzymania enterprise'owych klientów.

**Key takeaways:**
- Surowa przewaga wartości subskrypcji Claude nad OpenAI (5x+) kurczy się do 1,3-2,9x po skorygowaniu o koszt realizacji konkretnego zadania.
- OpenAI odpowiedziało przepołowieniem limitów na część planów przy jednoczesnym przyspieszeniu domyślnej prędkości modeli o około 50%.
- Microsoft miał ciąć planowane wewnętrzne wydatki na Anthropic o ponad jedną trzecią, a Meta ograniczyła liczbę użytkowników Claude Code o połowę, przesuwając ich na własne narzędzia.

**Why do I care:** Te liczby są dobrym przypomnieniem, żeby nie porównywać subskrypcji AI po cenie nominalnej, tylko po realnym koszcie wykonania konkretnego zadania, bo różnica między "5x taniej" a "1,3x taniej" to dokładnie różnica między łatwą decyzją zakupową a decyzją wymagającą własnego benchmarku na firmowych zadaniach.

**Link:** [AI News for 10/03/2026-10/5/2026: SemiAnalysis subscription value](https://www.latent.space/p/ainews-reflection-beam-501b-a23b)

## Istniejące narzędzia agentowe zamieniają się w środowiska treningowe RL

**TLDR:** Hugging Face pokazał proxy, które przechwytuje wywołania w formatach OpenAI Chat, OpenAI Responses, Anthropic i Gemini, przekazuje je do vLLM i zapisuje dokładne identyfikatory tokenów oraz logprawdopodobieństwa, zamieniając 10 niezmodyfikowanych harnessów agentowych w gotowe środowiska do treningu RL.

**Summary:** Efekt tego podejścia jest konkretny i mierzalny: te same wagi modelu scorują 62% pod Mini-SWE-Agent, ale tylko 33% pod Claude Code, co samo w sobie pokazuje, jak mocno sam harness, a nie tylko model, wpływa na wynik zadania. Trening LFM2.5-2.6B jednocześnie w czterech różnych harnessach podniósł odsetek rozwiązań za pierwszym podejściem z 42% do 54%, a dodatkowy bonus za wywołania narzędzi obniżył ich liczbę o 31%. Dla porównania, zwykłe uczenie nadzorowane (SFT) na prawie 3,2 tysiącach rolloutów płaskowało się na poziomie 47,5%, czyli wyraźnie poniżej wyniku treningu wielo-harnessowego.

Obok tego osobny projekt, Pi Durable od Earendila, buduje harness na małym, opartym o workflow silniku zadaniowym, pozwalającym długo działającym, wieloosobowym agentom zawieszać się i wznawiać w dowolnym miejscu. Rdzeń to około 15 tysięcy linii TypeScriptu z magazynem SQLite i JSONL, działający na Bun albo Cloudflare Durable Objects, z wyraźnym oddzieleniem warstwy sterowania od środowisk wykonania. Autorzy wprost tłumaczą, dlaczego pominęli Effect: biblioteka nie zapewnia trwałości stanu, a to był dla nich wymóg nienegocjowalny.

**Key takeaways:**
- Te same wagi modelu dają 62% w jednym harnessie agentowym i 33% w innym, co pokazuje, że sam harness jest zmienną porównywalną wagą do samego modelu.
- Trening w czterech harnessach jednocześnie podniósł odsetek rozwiązań za pierwszym podejściem z 42% do 54%, wyraźnie przebijając zwykłe SFT.
- Pi Durable oddziela warstwę sterowania agentem od środowisk wykonania, co pozwala zawieszać i wznawiać długo działające, wieloosobowe sesje agentowe.

**Why do I care:** To ważny sygnał dla każdego, kto porównuje agenty kodujące wyłącznie po modelu bazowym: skoro ten sam model potrafi dać dwukrotnie różny wynik w zależności od harnessu, to ocena "Claude Code kontra Codex kontra Cursor" bez uwzględnienia różnic w samym środowisku wykonania jest metodologicznie dziurawa.

**Link:** [AI News for 10/03/2026-10/5/2026: agent harnesses as RL environments](https://www.latent.space/p/ainews-reflection-beam-501b-a23b)

## Bezpieczeństwo i polityka: watermarking jako etykieta dla crawlerów, nie dla ludzi

**TLDR:** OpenAI zapowiedziało niewidoczne znaki wodne w tekście z ChatGPT i Codex w Unii Europejskiej zgodnie z AI Act, z opcjonalnym przełącznikiem API dostępnym globalnie, mimo że jeden z cytowanych testów pokazuje spadek skuteczności wykrywania z 92% do 17% po zaledwie 25% podmian synonimów.

**Summary:** Ograniczenia są tu równie ważne jak sama funkcja: przepisanie albo przetłumaczenie tekstu usuwa znak wodny, a dostęp do detektora mają wyłącznie zatwierdzeni badacze, nie opinia publiczna ani nawet platformy publikujące treści. To wzmacnia wcześniejszą obserwację z tego numeru, że watermarking ma chronić głównie własne crawlery labów przed zbieraniem zanieczyszczonych danych treningowych, nie powstrzymać pojedynczego ucznia przed oszukaniem nauczyciela.

Równolegle Yoshua Bengio napisał w Financial Times, że niedawne włamania agentowe (Hugging Face) nie są wyłącznie problemem słabego sandboxa, tylko sygnałem systemowym, a sondaż Quinnipiac pokazał 86% poparcia dla niezależnych standardów bezpieczeństwa AI. Z drugiej strony Sam Altman powiedział Politico wprost, że "świat powinien zaakceptować, że będą się działy złe rzeczy" w zamian za korzyści z technologii, co jest jednym z bardziej otwartych publicznych stwierdzeń tego typu ze strony szefa dużego laba.

**Key takeaways:**
- Znak wodny OpenAI w UE jest łatwy do usunięcia przez parafrazę, a test pokazuje spadek skuteczności wykrywania z 92% do 17% przy 25% podmian synonimów.
- Dostęp do detektora znaków wodnych mają tylko zatwierdzeni badacze, nie szeroka publiczność ani platformy publikujące treści.
- Sam Altman publicznie zaakceptował, że rozwój AI będzie generował "złe rzeczy" jako cenę za korzyści technologii.

**Why do I care:** Dla zespołów budujących systemy wykrywające treści generowane przez AI (np. w moderacji czy ocenie jakości kontrybucji) to jasny sygnał, że poleganie na watermarkingu jako jedynej linii obrony jest błędem projektowym, bo mechanizm nigdy nie był projektowany z myślą o odporności na prostą parafrazę.

**Link:** [AI News for 10/03/2026-10/5/2026: safety, policy and watermarking](https://www.latent.space/p/ainews-reflection-beam-501b-a23b)
