---
title: "Pi 1.0 i Pi Durable trafiają na pierwszą stronę HN, a tydzień w AI przynosi Gemini 4 Argon i FLUX 3"
excerpt: "Pi dostaje natywny Codemode i wersję w TypeScript odporną na awarie, a przegląd tygodnia obejmuje sporną walidację Gemini 4 Argon, bardzo tanie GPT-6.1 Sol i wideoagenta Tavus, który w połowie testów mylony jest z człowiekiem."
publishedAt: "2026-10-02"
slug: "ainews-pi-durable-gemini-4-argon-gpt-6-1-sol-flux-3"
hashtags: "#ai #llm #agents #gemini #generated #pl"
source_pattern: "AINews"
---

## Pi 1.0 i Pi Durable trafiają na pierwszą stronę HN

**TLDR:** Pi, harness coraz częściej wspominany jednym tchem z OpenClaw, doczekał się dwóch jednoczesnych wydań: Pi 1.0 z natywnym wsparciem dla MCP i modeli obrazu, oraz Pi Durable, port na TypeScript, który odporny jest na awarie dzięki checkpointowaniu każdego kroku.

**Streszczenie:** Pi 1.0 dokłada Codemode z natywnym wsparciem MCP, wsparcie dla rozszerzeń przy modelach wirtualnych, leniwe ładowanie narzędzi, cache warming dla modeli Anthropic i możliwość wstrzykiwania wiadomości systemowych w środku rozmowy, czyli zmian promptu i narzędzi świadomych całego transkryptu, nie tylko bieżącego polecenia. Pi Durable idzie dalej architektonicznie: zewnętrznia wszystkie stanowe komponenty harnessu, każdy krok jest zapisywany jako zadanie z checkpointem, więc po awarii czy restarcie agenty i subagenty wznawiają dokładnie od ostatniego potwierdzonego stanu.

Pi Durable działa wszędzie, gdzie jest runtime JavaScriptu, Node, Bun czy Cloudflare, z wymiennymi backendami przechowywania, pamięcią, SQLite albo plikami JSONL. Jeden harness może prowadzić wiele równoległych, rozgałęzionych rozmów naraz, na przykład główny kanał i osobne wątki, bez blokowania się nawzajem, a stan aplikacji, jak lista zadań, żyje w dokumentach obok transkryptów rozmów, więc wielu użytkowników czy interfejsów może podłączyć się i obserwować tego samego agenta jednocześnie. Kod narzędzi i rozszerzeń można podmieniać na gorąco, w trakcie działania agenta, a kolejne wywołanie narzędzia automatycznie korzysta z nowej wersji.

**Kluczowe wnioski:**
- Pi 1.0 dodaje natywny Codemode z obsługą MCP, cache warming dla modeli Anthropic i wstrzykiwanie wiadomości systemowych w trakcie rozmowy.
- Pi Durable zapisuje każdy krok jako checkpointowane zadanie, więc agent wznawia dokładnie od ostatniego potwierdzonego stanu po awarii.
- Jeden harness Pi Durable prowadzi wiele równoległych, rozgałęzionych rozmów bez wzajemnego blokowania.
- Kod narzędzi i rozszerzeń podmienia się na gorąco, bez przerywania działania agenta.

**Dlaczego mi na tym zależy:** Checkpointowanie każdego kroku i odporność na awarie to dokładnie to, czego brakuje większości harnessów agentowych budowanych naprędce na własny użytek, a przenoszenie stanu aplikacji do dokumentów obok transkryptu to wzorzec wart skopiowania, jeśli budujesz cokolwiek, gdzie kilka osób ma współdzielić jednego agenta w czasie rzeczywistym.

**Link:** [AINews: Pi 1.0, Pi Durable, and AIE NYC](https://www.latent.space/p/ainews-pi-10-pi-durable-and-aie-nyc)

## Gemini 4 Argon, GPT-6.1 Sol i FLUX 3, przegląd tygodnia

**TLDR:** Google ogłosiło Gemini 4 Argon z tygodniami wewnętrznych testów przed premierą, choć sporny raport Bloomberga i równie sporne dementi z DeepMind pozostawiają pytanie o jakość kodowania otwarte, OpenAI wypuściło znacznie tańsze GPT-6.1 Sol, a Black Forest Labs zaprezentowało FLUX 3 z generowaniem obrazów do 4K.

**Streszczenie:** Google twierdzi, że nowe wersje Gemini przechodzą teraz tygodnie testów przez tysiące wewnętrznych inżynierów przed premierą, ale krążący raport Bloomberga przypisujący modelowi słabości w kodowaniu, oparty na anonimowych źródłach wewnętrznych, został następnie zakwestionowany przez starszego inżyniera DeepMind. Żadna ze stron nie rozstrzyga sporu ostatecznie, więc realną jakość kodowania Gemini 4 Argon trzeba będzie zweryfikować samemu, nie na podstawie żadnej z tych dwóch narracji. GPT-6.1 Sol to przede wszystkim historia o efektywności: Sam Altman nazwał go najszybciej rosnącym modelem firmy, a Artificial Analysis podaje 0,72 dolara za zadanie w Intelligence Index przy maksymalnym reasoningu, wobec 1,04 dolara dla GPT-6 Sol i 3,26 dolara dla Astry, przy czym poprawę napędzają mniej tury rozmowy i tańsze odczyty z cache, nie tylko krótsze odpowiedzi.

FLUX 3 od Black Forest Labs generuje obrazy do 4K z do dziesięciu obrazami referencyjnymi i kontrolą układu przez bounding boxy, z tymczasową zniżką 50 procent na API do 8 października. W segmencie wideoagentów Tavus zaprezentował Griffina, model wideo-do-wideo, twierdząc, że 48 procent uczestników na żywo pomyliło go z człowiekiem, wobec poniżej 3 procent dla wcześniejszych systemów, choć bez znajomości dokładnego protokołu testu trudno generalizować ten wynik do stwierdzenia, że to przejście testu Turinga. Solar Mini 4 od Upstage'a, model wyłącznie tekstowy z 35 miliardami parametrów całkowitych i 3 miliardami aktywnymi, pokazuje z kolei odwrotną stronę efektywności: 83 procent na long-context reasoning przy zaledwie 1 procencie na Terminal-Bench 4.0, z kosztem zadania pięciokrotnie wyższym niż u konkurencyjnej Luny mimo mniejszego rozmiaru.

**Kluczowe wnioski:**
- Spór o jakość kodowania Gemini 4 Argon między raportem Bloomberga a dementi inżyniera DeepMind pozostaje nierozstrzygnięty.
- GPT-6.1 Sol kosztuje 0,72 dolara za zadanie w Intelligence Index, wobec 3,26 dolara dla GPT-6 Astra, głównie dzięki mniejszej liczbie tur i tańszemu cache.
- FLUX 3 generuje obrazy do 4K z do dziesięciu obrazami referencyjnymi, z tymczasową zniżką 50 procent na API do 8 października.
- Tavus twierdzi, że 48 procent uczestników testu na żywo pomyliło wideoagenta Griffin z człowiekiem, bez ujawnienia pełnego protokołu testu.

**Dlaczego mi na tym zależy:** Spadek ceny GPT-6.1 Sol przy porównywalnej jakości w kodowaniu to konkretny sygnał, żeby przy każdym nowym wydaniu sprawdzić kalkulator kosztów, zanim automatycznie zostaniesz przy droższym modelu z przyzwyczajenia. Nierozstrzygnięty spór o Gemini 4 Argon to z kolei przypomnienie, żeby nie ufać ani raportom opartym na anonimowych źródłach, ani równie anonimowym dementi, tylko zweryfikować model na własnych zadaniach.

**Link:** [AINews: Pi 1.0, Pi Durable, and AIE NYC](https://www.latent.space/p/ainews-pi-10-pi-durable-and-aie-nyc)
