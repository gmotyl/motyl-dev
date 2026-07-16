---
title: "Codex bije rekordy: 7 milionów użytkowników w 6 miesięcy, a narzędzia agentowe zmieniają reguły gry"
excerpt: "OpenAI Codex osiągnął 7 milionów aktywnych użytkowników w zaledwie pół roku, podczas gdy rynek agentów AI przeżywa głębokie zmiany w architekturze, benchmarkach i kwestiach bezpieczeństwa."
publishedAt: "2026-07-14"
slug: "codex-7m-uzytkownikow-agenty-ai-zmiany"
hashtags: "#AINews #OpenAI #Codex #AgentAI #LLM #generated #pl"
source_pattern: "AINews"
---

## Codex osiąga 7 milionów użytkowników, czyli co się stało z GPT-5.6 Sol przez ostatnie 48 godzin

**TLDR:** OpenAI Codex w ciągu zaledwie sześciu miesięcy urósł z około 550-700 tysięcy użytkowników do 7 milionów, co oznacza ponad dziesięciokrotny wzrost. W tym samym czasie pojawiły się poważne problemy z użytkowaniem GPT-5.6 Sol, które firma naprawiała na bieżąco z nieoczekiwaną transparentnością.

Ostatni tydzień w świecie narzędzi do kodowania z AI był bardzo intensywny. Na początku GPT-5.6 Sol trafił do użytkowników 9 lipca, a już 12 lipca serwis zgłaszał 6 milionów aktywnych użytkowników Codex i ChatGPT Work. Niecałą dobę później liczba ta wzrosła do 7 milionów, co skłoniło OpenAI do usunięcia limitu 5 godzin użytkowania dla planów Plus, Business i Pro oraz do dodania specjalnego "bank reset" z okazji osiągnięcia tego kamienia milowego.

Dla porównania, Fidji ujawnił w marcu 2026, że Codex miał wtedy 2 miliony użytkowników, a na początku roku startował z poziomu 550-700 tysięcy. To pokazuje skalę przyspieszenia. Claude Code, według ostatnich danych z lutego, miał około 2 milionów użytkowników tygodniowo i generował 2,5 miliarda dolarów ARR. Anthropic milczy od tamtego czasu na temat liczb, co być może tłumaczy się przeniesieniem ruchu do Claude Tag, czyli osobnej platformy o innym modelu dostępu.

Nie wszystko jednak szło gładko po stronie OpenAI. GPT-5.6 Sol palił przez użytkowników limity w alarmującym tempie. Ograniczono kontekst z 372 tysięcy do 272 tysięcy tokenów po tym, jak wykryto efekty uboczne po stronie rozliczeń, wycofano część eksperymentalnych ustawień "juice" związanych ze stratą na rozumowanie, naprawiono nadaktywne zachowanie agentów wielookiennych przy wysokich ustawieniach. Społeczność chwaliła OpenAI za rzadką w tej branży przejrzystość, choć niektórzy odbierali to jako "nerf" modelu.

Praktyczne możliwości wciąż robią wrażenie. Użytkownicy relacjonowali np. zbudowanie silnika gry typu Doom w SQL, albo konfigurację Blender MCP bez żadnego wcześniejszego doświadczenia z tym narzędziem.

**Key takeaways:**
- Codex wzrósł ponad 10x w ciągu 6 miesięcy, osiągając 7 milionów aktywnych użytkowników
- GPT-5.6 Sol wymagał kilku szybkich poprawek po premierze, OpenAI komunikował je transparentnie
- Claude Code prawdopodobnie przenosi ruch na Claude Tag, co utrudnia bezpośrednie porównania
- Benchmarki przechodzą z ceny za token na koszt wykonania zadania, co zmienia obraz modeli

**Why do I care:** Jako senior developer śledzący narzędzia do kodowania, to co widzę to pełzającą dominację agentów w codziennej pracy. Liczba 7 milionów użytkowników to nie abstrakcja, to oznacza, że znaczna część deweloperów aktywnie polega na Codex przy prawdziwych projektach. Własna obserwacja: kiedy narzędzie traci limit 5 godzin dziennie "z okazji osiągnięcia milestonu", to tak naprawdę przyznaje, że limit był przeszkodą, a nie ochroną. Pytanie nie brzmi już "czy używać AI do kodowania", tylko "jakiej architektury agenta używać w konkretnym projekcie".

**Link:** [[AINews] Codex usage up >10x in 6 months to 7M users](https://www.latent.space/p/ainews-codex-usage-up-10x-in-6-months?publication_id=1084089&post_id=206943176&isFreemail=true&triedRedirect=true)

---

## Harness jest produktem: jak architektura agentów zmienia rynek narzędzi

**TLDR:** Konferencje i posty z ostatnich dni zbiegają się w jednym punkcie: to nie model, lecz harness, czyli warstwa orkiestracji, decyduje o końcowym wyniku. Firmy budujące specjalizowane harnesses dla konkretnych zadań mają przewagę nad tymi, które oferują ogólne wrappery.

Pojawia się coraz więcej głosów, że modele AI są na tyle wyrównane, że różnica w jakości wynika głównie z tego, co je otacza. LangChain argumentuje, że zwycięskie produkty agentowe powstaną z harnesses dostosowanych do konkretnych zadań. Factory pokazało "design mode", gdzie użytkownik wskazuje na elementy interfejsu zamiast słownie opisywać, co chce zmienić. Jeden praktyk opisał, jak w 81% uruchomień agenta z Fable jako modelem głównym, ten model nie pisze ani jednej linii kodu, lecz deleguje pracę, co paradoksalnie czyni go tańszym niż modele słabsze przy tej samej pracy.

Benchmarki ewoluują w tym samym kierunku. Artificul Analysis zaczął mierzyć koszt na zadanie zamiast kosztu na token, bo przy długich agentowych sesjach liczba tur, gadatliwość modelu i trafienie w cache mają większe znaczenie niż cena tokena. Cognition poinformowało, że Devin Fusion, oparty teraz na Fable 5, może być tańszy per zadanie niż Opus 4.8, bo silniejszy model rzadziej robi zbędną pracę.

Prime Intellect wypuściło verifiers v1, przebudowane środowisko do trenowania agentów z RL. Jeden z najciekawszych detalii technicznych: trajektorie rollout są teraz przechowywane jako DAG-i wiadomości, co zmienia złożoność przechowywania historii z O(n²) na O(n) w liczbie tur. W praktyce 100-miliardowy model reasoningowy, 40 tur zadań SWE, 1000 kroków RL na 6 węzłach H200, poniżej 2 dni.

**Key takeaways:**
- Harness/orchestrator staje się głównym czynnikiem różnicującym produkty agentowe
- Koszt per zadanie zastępuje koszt per token jako miara porównawcza modeli
- Silniejsze modele bywają tańsze, bo unikają zbędnych akcji
- Prime Intellect verifiers v1 wprowadza DAG-i dla efektywnych długich rolloutów

**Why do I care:** Z perspektywy architekta frontendowego to sygnał, że integrując AI do produktu, projekt harness/orkiestracji to poważna decyzja architektoniczna. Nie można wziąć gotowego SDK i oczekiwać, że samo zadziała na poziomie produktowym. To samo co kiedyś dotyczyło wyboru frameworka, teraz dotyczy wyboru strategii agenta i sposobu jego pilotowania przez zadanie.

**Link:** [[AINews] Codex usage up >10x in 6 months to 7M users](https://www.latent.space/p/ainews-codex-usage-up-10x-in-6-months?publication_id=1084089&post_id=206943176&isFreemail=true&triedRedirect=true)

---

## Grok Build i wgrywanie całych repozytoriów: gdzie kończy się zadanie, a zaczyna zbieranie danych

**TLDR:** Ujawniono, że CLI Grok Build od xAI wgrywał całe repozytoria wraz z sekretami na serwery Google Cloud, znacznie szerzej niż wymagało tego kodowanie. xAI odpowiedziało informacją o zero data retention, ale społeczność nie do końca uspokoiły te wyjaśnienia.

To była najpoważniejsza historia bezpieczeństwa tygodnia. Grok Build CLI, narzędzie xAI do pisania kodu z AI, przesyłał pełne repozytoria na zewnętrzny bucket Google Cloud. Badacze zwrócili uwagę na zakres: nie tylko pliki źródłowe, ale też sekrety, klucze API i wszystko, co trafia do repozytorium. Nie było to udokumentowane, a mitygacja nastąpiła po stronie serwera, nie przez aktualizację klienta.

xAI odpowiedziało: przy zero data retention (ZDR) dane nie są przechowywane, komenda /privacy wyłącza retencję i usuwa wcześniej wgrane dane. Odpowiedź nie przekonała wszystkich, bo pytanie nie dotyczyło tylko retencji, lecz samego faktu transmisji i domyślnego zachowania narzędzia.

Incydent otworzył szerszą dyskusję o tym, czemu otwarte modele zyskują przewagę nie tylko cenową, ale przede wszystkim związaną z kontrolą. Gdy model jest lokalny lub dobrze izolowany, organizacja ma pewność, że jej kod nie opuszcza infrastruktury. Perplexity jako jedno z uzasadnień szybkiej integracji Grok 4.5 podało właśnie dostępność ZDR.

**Key takeaways:**
- Grok Build CLI wgrywał całe repozytoria, w tym sekrety, bez wyraźnej dokumentacji
- xAI twierdzi, że ZDR zapewnia ochronę, ale domyślne zachowanie wzbudziło obawy
- Otwarte lub lokalnie uruchamiane modele zyskują na wartości jako argument za kontrolą nad danymi
- Każde narzędzie agentowe wymaga weryfikacji, co faktycznie przesyła przez sieć

**Why do I care:** Jako deweloper pracujący przy produktach komercyjnych, widzę to jako przypomnienie, że zanim wpiszemy narzędzie do onboardingu, trzeba przejrzeć jego zachowanie sieciowe. Nikt nie musi mieć złych intencji, żeby narzędzie miało zły design pod kątem prywatności. Audit sieciowy CLI agentowego to dziś obowiązek, nie paranoja.

**Link:** [[AINews] Codex usage up >10x in 6 months to 7M users](https://www.latent.space/p/ainews-codex-usage-up-10x-in-6-months?publication_id=1084089&post_id=206943176&isFreemail=true&triedRedirect=true)

---

## Otwarte modele na wzrost: GLM-5.2, kwantyzacja i integracja Transformers z vLLM

**TLDR:** Transformers od Hugging Face można teraz uruchamiać w vLLM z natywną prędkością, co eliminuje konieczność podwójnej implementacji architektur. Jednocześnie rośnie zainteresowanie GLM-5.2 i narzędziami kwantyzacji jako alternatywą dla drogich modeli zamkniętych.

Clement Delangue ogłosił integrację, która eliminuje jeden z długotrwałych problemów: modele zaimplementowane w Transformers można teraz uruchamiać w vLLM bez osobnej, ręcznej implementacji. Jeśli to się sprawdzi w praktyce, nowe architektury będą mogły przechodzić od badań do efektywnego serwowania znacznie szybciej.

Równolegle GLM-5.2 zyskuje traction jako praktyczna alternatywa. Jeden z praktykantów opisał migrację prawdziwego pipeline'u roboczego z Claude na stack złożony z GLM 5.2 NVFP4 i Kimi K2.7 Code NVFP4 na węźle 8xB200. Efekt: gęstsze raporty za ułamek ceny, choć z wyższym opóźnieniem. LlamaCoder v4 przebudowany na GLM 5.2 to kolejny sygnał, że model zyskuje zaufanie w szerszej społeczności.

W temacie kwantyzacji pokazano nową metodę, która ma bić NVIDIA ModelOpt w szybkości znajdowania optymalnych precyzji per warstwa, z bardziej agresywną kwantyzacją i wyższymi wynikami benchmarków. Unsloth opublikował poradnik wdrożenia na AWS obejmujący GGUF, NVFP4 i FP8.

**Key takeaways:**
- Transformers + vLLM: jeden model działa w obu kontekstach bez podwójnej implementacji
- GLM-5.2 używany w prawdziwych pipeline'ach produkcyjnych jako alternatywa dla modeli zamkniętych
- Nowe metody kwantyzacji mogą obniżyć koszt serwowania bez dużych strat jakości
- Otwarte modele to nie tylko cena, ale kontrola nad danymi i pętlą uczenia

**Why do I care:** Dla mnie to sygnał, że "otwarta" alternatywa przestaje być kompromisem na jakości, a staje się realną opcją projektową. Kiedy możesz uruchomić lokalnie model, który jest w 90% tak dobry jak zamknięty, a masz pełną kontrolę nad danymi, kalkul ekonomiczny i bezpieczeństwo zaczyna wyraźnie wskazywać na open source. To przestaje być hobby a zaczyna być strategia.

**Link:** [[AINews] Codex usage up >10x in 6 months to 7M users](https://www.latent.space/p/ainews-codex-usage-up-10x-in-6-months?publication_id=1084089&post_id=206943176&isFreemail=true&triedRedirect=true)
