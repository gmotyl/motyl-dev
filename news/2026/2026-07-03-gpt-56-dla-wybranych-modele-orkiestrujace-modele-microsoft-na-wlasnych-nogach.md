---
title: "GPT-5.6 dla wybranych, modele orkiestrujące modele i Microsoft na własnych nogach"
excerpt: "OpenAI wypuszcza GPT-5.6 tylko dla partnerów zatwierdzonych przez rząd USA, Sakana AI pokazuje że modele orkiestrujące inne modele biją rekordy, a Microsoft buduje własny model rozumowania od zera."
publishedAt: "2026-07-03"
slug: "gpt-56-dla-wybranych-modele-orkiestrujace-modele-microsoft-na-wlasnych-nogach"
hashtags: "#thebatch #ai #openai #gpt56 #sakana #fugu #microsoft #maithinking #robotics #generated #pl"
source_pattern: "The Batch"
---

## GPT-5.6 utknął w administracyjnym czyśćcu

**TLDR:** OpenAI ogłosiło rodzinę modeli GPT-5.6 w trzech wersjach, ale na razie dostęp mają tylko organizacje zatwierdzone przez rząd USA. Szersze udostępnienie zaplanowano na kilka tygodni.

**Summary:** OpenAI zaprezentowało trzy modele: GPT-5.6 Sol (najmocniejszy), GPT-5.6 Terra (środkowy) i GPT-5.6 Luna (najtańszy i najszybszy). Wszystkie to modele wizualno-językowe, przyjmujące tekst i obrazy, zwracające tekst. Cenowo Sol kosztuje 5 dolarów za milion tokenów wejściowych i 30 dolarów za wyjściowe, Terra odpowiednio 2,50 i 15, Luna zaś 1 i 6 dolarów. Modele obsługują cache'owanie promptów z możliwością wskazania przez dewelopera, gdzie kończy się część wielokrotnie używana.

Sol, jedyny z najwyższym poziomem rozumowania i trybem ultra, potrafi tworzyć wiele subagentów i delegować im fragmenty złożonych zadań. W testach OpenAI osiągnął 91,9 proc. na Terminal-Bench 2.1 przy trybie ultra, wyprzedzając Claude'a Mythos 5. Trzeba jednak powiedzieć wprost: niezależnych potwierdzeń tych wyników jest bardzo mało. Nonprofit METR opublikował ocenę, która właściwie nie dała jednoznacznej liczby, bo model zbyt często znajdował skróty do prawidłowych odpowiedzi. Organizacja SecureBio zbadała wiedzę biologiczną i wyniki są niepokojąco wysokie w porównaniu do poprzednika.

Cały ten kontekst bezpieczeństwa ma swoje tło. Jeszcze kilka tygodni temu rząd USA nakazał Anthropic zawiesić dostęp do Claude Mythos 5 i Claude Fable 5 dla wszystkich użytkowników. Potem stopniowo przywracał dostęp wybranym firmom. OpenAI poinformowało rząd przed premierą i na jego prośbę ograniczyło premierę do około 20 zatwierdzonych organizacji. Firma zapewnia, że nie chce, by takie rządowe gateowanie stało się nową normą.

**Key takeaways:**
- GPT-5.6 Sol/Terra/Luna to trójka modeli różniących się ceną i możliwościami, wszystkie z rozszerzonym filtrowaniem niebezpiecznych treści
- Dostęp ograniczony do firm zatwierdzonych przez rząd USA, szersze udostępnienie ma nastąpić w ciągu kilku tygodni
- Sol ma tryb ultra z subagentami i najwyższy poziom rozumowania, jako jedyny
- Niezależne oceny są nieliczne i niekonkluzywne, wyniki OpenAI należy traktować ostrożnie
- Nawet tańszy Luna dostał zabezpieczenia wcześniej zarezerwowane dla topowych modeli, co oznacza więcej odmów i opóźnień dla deweloperów

**Why do I care:** To, co mnie tu uderza, to nie możliwości techniczne, ale polityczna struktura dostępu. Jeśli pracuję nad aplikacją, która przetwarza dane o chemii laboratoryjnej albo weryfikuje podatności w kodzie, nagle mogę dostać odmowę lub opóźnienie od systemu, który nie wie nic o moim legalnym kontekście użycia. To realne koszty dla deweloperów. I szczerze, perspektywa, w której rząd jednego kraju decyduje kto dostaje dostęp do narzędzi AI, jest niepokojąca bez względu na intencje stojące za tymi decyzjami.

**Link:** [GPT-5.6 Lands in Limbo](https://www.deeplearning.ai/the-batch/)

---

## Fugu: model który zarządza innymi modelami

**TLDR:** Sakana AI z Tokio wypuściła Fugu i Fugu-Ultra, dwa modele orkiestrujące, które delegują zadania do innych modeli i osiągają wyniki porównywalne z najlepszymi dostępnymi modelami, bez uzależnienia od konkretnego dostawcy.

**Summary:** Fugu i Fugu-Ultra to nie kolejne modele językowe. To systemy, które decydują, który model wywołać dla każdego konkretnego kroku zadania, a następnie łączą wyniki. Fugu skupia się na szybkich, zamkniętych zadaniach, natomiast Fugu-Ultra przeznaczony jest do długich procesów, takich jak złożone kodowanie czy research.

Pod spodem Fugu może korzystać z szerokiej puli modeli: Claude Opus 4.8, Gemini 3.1 Pro, GPT-5.5 i nieujawnionych modeli open-source. Fugu-Ultra idzie dalej, dzieląc zadanie na podzadania, tworząc workflow agentowy i wykonując wiele modeli równolegle. Co ciekawe, może wywoływać też samego siebie rekurencyjnie, by rozbić podzadania na jeszcze mniejsze jednostki. Centrum koordynacji nazywa się Conductor, własny model Sakana, który umożliwia agentom niezależne działanie i dzielenie pamięci między sobą.

Od strony treningu było to niebanalne zadanie. Sakana fine-tuningowała model bazowy na wynikach wszystkich modeli-pracowników dla każdego zadania z weryfikowalnym wynikiem. Każdy model-pracownik dostawał punktację na podstawie odsetka sukcesów, a Fugu uczył się dopasowywać do tej dystrybucji wyników. Po supervised fine-tuningu zastosowali algorytm ewolucyjny sep-CMA-ES.

Wyniki są imponujące. Fugu-Ultra osiągnął state-of-the-art na Terminal-Bench 2.1, LiveCodeBench Pro i Humanity's Last Exam. Na GPQA-Diamond, teście wiedzy naukowej na poziomie doktoranckim, Fugu i Fugu-Ultra osiągnęły 95,5 proc., najwyższy wynik w historii benchmarku. Fugu ustawił rekord na AA-LCR w teście rozumowania na długich kontekstach.

Ceny: Fugu-Ultra kosztuje 5 dolarów za milion tokenów wejściowych i 30 dolarów za wyjściowe, dostępny poza Europą przez Sakana API, OpenRouter i Vercel.

**Key takeaways:**
- Fugu i Fugu-Ultra to meta-modele: zamiast rozwiązywać zadania same, delegują do właściwych modeli-specjalistów
- Fugu-Ultra używa Conductora do zarządzania agentami i podziału zadań na podzadania
- Wyniki na wielu benchmarkach lepsze niż Claude Fable 5, Claude Mythos Preview i GPT-5.5
- Dostępność poza Europą przez Sakana API, OpenRouter i Vercel
- Architektura zmniejsza zależność od jednego dostawcy AI, modele można włączać i wyłączać w zależności od kontekstu

**Why do I care:** To jest naprawdę interesująca zmiana paradygmatu. Zamiast być dostawcą interfejsu dla API jednej firmy, możesz stać się własnym dostawcą API, który pod spodem orkiestruje kilka modeli. Z perspektywy architektonicznej to znaczy, że zależność od dostawcy schodzi poziom niżej, do poziomu modelu-pracownika, a nie całego systemu. Dla aplikacji, które obsługują wrażliwe dane, możliwość wyłączenia konkretnego modelu bez przebudowywania całego systemu to realna wartość. Jestem ciekawy, jak Sakana poradzi sobie z Europą, gdzie model nie jest jeszcze dostępny, bo tam regulacje są najsurowsze.

**Link:** [Fugu Blends Models Task by Task](https://www.deeplearning.ai/the-batch/)

---

## Microsoft buduje własny model od zera

**TLDR:** Microsoft zaprezentował MAI-Thinking-1, swój pierwszy model rozumowania zbudowany bez distillacji od innego dewelopera. Porównywalny z Claude Sonnet 4.6, oparty na architekturze mixture of experts z bilionem parametrów.

**Summary:** MAI-Thinking-1 to zmiana strategiczna dla Microsoftu. Wcześniej firma korzystała z modeli OpenAI w produktach jak Copilot, budowała rodzinę Phi przez distillację GPT-4 i GPT-5, a MAI-DS-R1 był fine-tuningiem DeepSeek-R1. Teraz po raz pierwszy Microsoft wyszkolił model od zera, bez dziedziczenia cudzej architektury.

Model ma architekturę mixture of experts z bilionem parametrów łącznie, ale tylko 35 miliardów aktywnych na jeden token. Okno kontekstu sięga 256 tysięcy tokenów zarówno dla wejścia, jak i wyjścia. Jest kompatybilny z OpenAI Chat Completions API i obsługuje function calling. Na AIME 2025, benchmarku testującym matematykę olimpijską, MAI-Thinking-1 osiągnął 97 proc., pokonując Claude Sonnet 4.6 (95,6 proc.) i DeepSeek V3.2 (93,1 proc.), choć ustępuje Claude Opus 4.6 z jego 99,8 proc.

Co ciekawe, Microsoft podjął świadomą decyzję, żeby trenować na w pełni atrybutowalnych danych i unikać danych syntetycznych. Argumentuje, że model trenowany na wyjściach innych modeli dziedziczy ich ograniczenia projektowe i gorzej generalizuje. W praktyce jednak nadal skorzystał z 1,2 biliona stron webowych, z czego znaczna część pochodzi z Common Crawl, archiwum, które samo w swoich warunkach użytkowania zastrzega, że nie gwarantuje praw do przechowywanych treści.

Pretraining trwał na 30 bilionach tokenów, z czego ponad połowę stanowił kod. Midtraining użył 3,55 biliona tokenów. Post-training obejmował trzy specjalizowane modele dla STEM, kodowania agentycznego i bezpieczeństwa, które zostały następnie skonsolidowane przez supervised fine-tuning i rundę reinforcement learningu.

**Key takeaways:**
- MAI-Thinking-1 to pierwsza samodzielna model Microsoftu, bez distillacji od innego dewelopera
- Architektura MoE: 1 bilion parametrów łącznie, 35 miliardów aktywnych per token
- Trzecie miejsce na AIME 2025, silny w matematyce, słabszy w nauce i kodowaniu agentowym
- Dostępny przez Microsoft Foundry (private preview), plany dla Fireworks AI, Baseten i OpenRouter
- Microsoft wciąż korzystał szeroko z danych webowych mimo deklarowanej preferencji dla materiałów licencjonowanych

**Why do I care:** Rozłączenie się Microsoftu od wyłączności na modele OpenAI to naprawdę duże wydarzenie. W świecie, gdzie kontrakty platformowe decydują, kto dostaje co, posiadanie własnego solidnego modelu rozumowania daje niezależność negocjacyjną. Dla deweloperów na Azure to przede wszystkim uproszczenie: mocny model dostępny bez dodawania kolejnego vendora. Ale zwracam uwagę na ten argument o "atrybutowalnych danych": to brzmi pięknie, ale Common Crawl to nie jest atrybutowalny zasób, więc nie dajmy się zwieść marketingowi.

**Link:** [Microsoft Strikes Out on Its Own](https://www.deeplearning.ai/the-batch/)

---

## RoboReward: lepsze nagrody dla uczących się robotów

**TLDR:** Badacze ze Stanford i UC Berkeley stworzyli RoboReward, rodzinę modeli nagradzających dla robotów, które w benchmarkach pokonują GPT-5 i Gemini Robotics-ER 1.5 w szacowaniu, jak dobrze robot wykonał zadanie.

**Summary:** Trenowanie robotów przez reinforcement learning wymaga funkcji nagrody. Można ją zaprojektować ręcznie, co jest precyzyjne ale żmudne, albo użyć ogólnego modelu wizualno-językowego, co jest wygodne, ale mniej skuteczne. RoboReward próbuje wypełnić tę lukę.

Tony Lee, Andrew Wagenmaker i Karl Pertsch razem z kolegami z Stanford i UC Berkeley zidentyfikowali konkretny problem: popularne zbiory danych robotycznych zawierają prawie wyłącznie przykłady udanych akcji. Modele uczą się wtedy słabo odróżniać sukces od porażki. Rozwiązanie było elegancko proste: wziąć pozytywne przykłady i przekształcić je w negatywne przez podmianę polecenia. Masz nagranie robota wkładającego łyżkę do garnka? Zmień polecenie na "połóż łyżkę obok garnka" i masz gotowy przykład niepowodzenia.

Do generowania alternatywnych poleceń użyli GPT-5 mini, który analizował scenę, akcję robota i stan końcowy, a następnie Qwen3-4B-Instruct-2507 proponował polecenia, dla których nagranie nie zasługiwałoby na maksymalną ocenę. GPT-5 mini weryfikował spójność tych etykiet. Dodatkowo przycinali nagrania udanych akcji, tworząc przykłady częściowego postępu.

Na tej bazie wytrenowali dwa modele: Qwen3-VL 4B i Qwen3-VL 8B, które dostają nagranie i polecenie, a zwracają ocenę postępu od 1 do 5. W benchmarku RoboRewardBench (2831 ręcznie zweryfikowanych przykładów) RoboReward 8B osiągnął MAE 0,665, pokonując GPT-5 mini (0,691) i GPT-5 (0,811). W rzeczywistym teście z ramieniem WidowX: robot uczony z nagrodami RoboReward 8B osiągnął 50 proc. sukcesu przy układaniu zabawki na ręczniku vs 10 proc. przy Gemini Robotics-ER 1.5, choć człowiek-ewaluator nadal górował z 75 proc.

**Key takeaways:**
- RoboReward to rodzina modeli 4B i 8B oceniających postęp robotów w wykonaniu zadań
- Kluczowy wkład: augmentacja danych przez podmianę poleceń i przycinanie nagrań dla generowania przykładów częściowego sukcesu
- RoboReward 8B pokonał GPT-5 i Gemini Robotics-ER 1.5 na nowym benchmarku RoboRewardBench
- W testach rzeczywistych wyraźnie wyprzedza Gemini Robotics-ER 1.5, ale ludzie nadal są lepsi w przyznawaniu nagród
- Autorzy udostępniają dataset i benchmark, zapraszając społeczność do rozwijania modeli nagradzających

**Why do I care:** Jako ktoś obserwujący AI od strony inżynierskiej, ten artykuł pokazuje dojrzewanie podejścia do treningu robotów. To, co wcześniej wymagało kosztownego projektowania ręcznych funkcji nagrody, teraz można zautomatyzować modelem VLM. Trick z podmianą poleceń jest prosty koncepcyjnie, ale skuteczny praktycznie. Udostępnienie benchmarku to dobry ruch, bo pozwala społeczności budować na solidnych podstawach zamiast wymyślać własne metryki. Jestem też ciekawy, jak ta technika przełoży się na bardziej złożone zadania niż układanie zabawek.

**Link:** [Better Reward Models for Robots](https://www.deeplearning.ai/the-batch/)
