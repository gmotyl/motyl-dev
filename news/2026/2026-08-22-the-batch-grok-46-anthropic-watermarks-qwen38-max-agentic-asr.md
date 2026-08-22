---
title: "Grok 4.6 depcze po piętach liderom, Anthropic znakuje tekst wodnymi znakami, a Qwen wypuszcza otwarte wagi giganta"
excerpt: "SpaceXAI wypuszcza Grok 4.6 wytrenowany z danymi Cursora, Anthropic wprowadza niewidzialne wodne znaki w tekście Claude'a na całym świecie, Alibaba udostępnia wagi Qwen3.8-Max, a badacze uczą LLM-y poprawiać transkrypcję mowy w locie."
publishedAt: "2026-08-22"
slug: "the-batch-grok-46-anthropic-watermarks-qwen38-max-agentic-asr"
hashtags: "#thebatch #ai #llm #grok #anthropic #watermarking #qwen #openweights #speechrecognition #generated #pl"
source_pattern: "The Batch"
---

## Grok 4.6: sojusz z Cursorem zaczyna się zwracać

**TLDR:** SpaceXAI wypuściło Grok 4.6, model wizyjno-językowy trenowany razem z Cursorem i nastawiony na długie zadania agentyczne. Dogania czołówkę w benchmarkach przy niższym koszcie za token i kończy zadania w mniejszej liczbie kroków niż konkurencja.

**Summary:** Trzy dni po tym, jak Grok 4.6 trafił do deweloperów przez API, Grok Build i Cursora, SpaceX sfinalizował przejęcie SpaceXAI za około 60 miliardów dolarów w akcjach. To drugi model wyszły z partnerstwa, w którym Cursor zgodził się trenować swoje modele na superkomputerze Colossus, a w zamian SpaceX dostał opcję wykupienia firmy. Ta opcja została zrealizowana w czerwcu, a Grok 4.5, wspólnie trenowany z Cursorem, podniósł wynik Groka z 38 do 56 punktów w Artificial Analysis Intelligence Index już w lipcu.

Grok 4.6 idzie o krok dalej. W tym samym benchmarku, przy wysokim poziomie rozumowania, osiąga 61 punktów za 0,84 dolara za zadanie, remisując z GPT-5.6 Sol przy maksymalnym rozumowaniu, które kosztuje 1,23 dolara za zadanie. Na GPQA Diamond, teście pytań z biologii, fizyki i chemii na poziomie doktoranckim, Grok 4.6 osiągnął 94,9 procent, najlepszy wynik spośród modeli testowanych przez Artificial Analysis. Ciekawszy jest jednak wynik na AA-Briefcase, prywatnym benchmarku wielotygodniowych projektów wymagających pracy na tysiącach plików: Grok 4.6 osiągnął tam swój wynik w około połowie liczby tur i jednej czwartej tokenów wejściowych, których potrzebował Claude Opus 5. Model korzystał z anonimizowanych danych z agentów kodujących Cursora, w tym z użycia modeli innych niż Grok, co pokazuje, jak bardzo dane z realnej pracy deweloperów zaczynają ważyć więcej niż surowa skala parametrów.

Trzy dni po premierze Grok 4.6 Cursor ogłosił Origin, usługę hostowania kodu porównywalną z GitHubem, zaprojektowaną pod większy wolumen kodu generowanego przez agenty.

**Key takeaways:**
- Grok 4.6 wiąże się z GPT-5.6 Sol na Artificial Analysis Intelligence Index (61 punktów) przy niższym koszcie za zadanie.
- Model kończy wielotygodniowe zadania w AA-Briefcase w połowie liczby tur i jednej czwartej tokenów wejściowych względem Claude Opus 5.
- SpaceX sfinalizował przejęcie SpaceXAI za około 60 miliardów dolarów w akcjach trzy dni po premierze modelu.
- Trening wykorzystał anonimizowane dane z agentów kodujących Cursora, w tym transkrypcje pracy modeli innych niż Grok.

**Why do I care:** Dla kogoś, kto buduje długo działające agenty, liczba tur i zużycie tokenów są ważniejsze niż gołe miejsce w rankingu. Model, który kończy tę samą pracę w połowie tur, kosztuje w praktyce o połowę mniej, nawet jeśli cena za token jest identyczna. To zmienia kalkulację przy wyborze modelu do produkcyjnych workflow agentycznych, gdzie liczy się całkowity koszt zadania, nie tylko benchmarkowy wynik. Warto też obserwować, co partnerstwo Cursor-SpaceX zrobi z dostępnością danych treningowych z realnych sesji kodowania, bo to jest przewaga, której inne laby nie mają tak łatwo dostępnej.

**Link:** [SpaceXAI Releases Grok 4.6](https://www.marktechpost.com/2026/08/12/spacexai-releases-grok-4-6/)

---

## Jak działają wodne znaki Claude'a

**TLDR:** Anthropic wprowadza niewidzialne, maszynowo czytelne sygnały potwierdzające, że tekst i obrazy zostały wygenerowane przez Claude'a, we wszystkich modelach wydanych po 2 sierpnia 2026 roku, na całym świecie, nie tylko w Unii Europejskiej.

**Summary:** Technika Anthropic opiera się na SynthID-Text, metodzie opublikowanej przez badaczy Google w 2024 roku. Model językowy podczas generowania tekstu podejmuje mnóstwo niskiej stawki decyzji między alternatywnymi słowami, a sekretny, losowy proces subtelnie skłania model ku określonym wyborom, tworząc wzorzec, który później można wykryć funkcją oceniającą. Anthropic udostępni API zwracające prawdopodobieństwo, że dany tekst pochodzi od Claude'a, ale to zawsze jest score statystyczny, nie dowód rozstrzygający. Fałszywe negatywy są możliwe zarówno w wodnych znakach, jak i w C2PA, standardzie używanym do podpisywania metadanych obrazów generowanych lub edytowanych przez Claude'a.

Anthropic zapewnia, że znakowanie nie obniża jakości wyjścia, nie jest widoczne dla czytelnika, nie wymaga dodatkowych tokenów i nie zawiera informacji pozwalających namierzyć konkretnego użytkownika. Znaki przetrwają kopiowanie i część edycji, ale mocno przerobiony lub sparafrazowany tekst, oraz obrazy pozbawione metadanych przez konwersję formatu, mogą znak stracić. Kod i inny tekst deterministyczny będzie miał mniej wodnych znaków, bo często istnieje jeden poprawny wybór (dwa plus dwa musi dać cztery), za to komentarze w kodzie już będą znakowane, co w praktyce czyni kod generowany przez AI wykrywalnym.

Reakcja na to ogłoszenie była gwałtowna. Dziesiątki użytkowników Claude'a deklarowały na X anulowanie subskrypcji, choć Anthropic twierdzi, że nie zaobserwował mierzalnego wzrostu rezygnacji. Krytycy, w tym były dyrektor Microsoftu Steven Sinofsky, mówią o prawie do prywatnych myśli wolnych od cyfrowego śladu. Zwolennicy, w tym Scott Aaronson, którego praca stała u podstaw SynthID-Text, argumentują, że nawet niedoskonała detekcja odstrasza od plagiatów akademickich i pomaga uniknąć trenowania nowych modeli na niewykrytej syntetycznej treści.

**Key takeaways:**
- Wodne znaki obejmują wszystkie modele Claude wydane po 2 sierpnia 2026 roku, globalnie, nie tylko w UE.
- Technika bazuje na SynthID-Text (tekst) i C2PA (obrazy), obie dają sygnał prawdopodobieństwa, nie dowód rozstrzygający.
- Kod i inny tekst deterministyczny będzie miał mniej znaków niż proza, ale komentarze w kodzie pozostają znakowane.
- Krytycy mówią o prywatności i ryzyku fałszywych oskarżeń, zwolennicy o ograniczeniu plagiatów i model collapse.

**Why do I care:** Jeśli commitujesz kod wygenerowany przez Claude'a albo publikujesz teksty częściowo pisane z jego pomocą, warto wiedzieć, że komentarze w kodzie będą wykrywalne, nawet jeśli sama logika kodu nie zawsze będzie niosła znak. To ma znaczenie w kontekstach, gdzie ujawnienie użycia AI ma konsekwencje prawne czy zawodowe, na przykład w dokumentach prawniczych czy publikacjach naukowych. Dla zespołów budujących na Claude API to też sygnał, że polityka dostawcy modelu może się zmienić z dnia na dzień z powodów regulacyjnych, a te zmiany dotkną też produkcyjny kod, nie tylko treści marketingowe.

**Link:** [How Claude's text watermarking works](https://www.anthropic.com/news/claude-text-watermark)

---

## Qwen3.8-Max: otwarte wagi giganta, ale nie całego

**TLDR:** Alibaba udostępniło wagi Qwen3.8-Max, modelu mixture-of-experts z 2,4 biliona parametrów, tydzień po debiucie w API. Wersja z otwartymi wagami jest jednak ograniczona do tekstu i nie ma pełnego okna kontekstu na milion tokenów dostępnego w API.

**Summary:** To pierwszy model z serii Max, dla którego Alibaba udostępniła wagi do pobrania, po tym jak wcześniej trzymała najsilniejsze modele wyłącznie za API i w aplikacji Qwen Chat, oferując otwarte wagi tylko dla mniejszych modeli. Zmiana przyszła tuż po tym, jak Moonshot AI i Z.ai przez ostatnie tygodnie wymieniały się prowadzeniem w rankingu otwartych wag, a Alibaba zaprezentowała Qwen3.8-Max na World AI Conference w Szanghaju, dni po debiucie Kimi K3.

Model aktywuje około 4 procent swoich parametrów na token i przetwarza tekst i obrazy razem od początku pretreningu, zamiast doklejać enkoder wizji do gotowego modelu językowego. Alibaba twierdzi, że to pozwala modelowi wizualnie weryfikować własne wyjście podczas planowania i wykonywania zadań. W Artificial Analysis Intelligence Index Qwen3.8-Max ze rozumowaniem osiąga 58 punktów, piąte miejsce ogólnie i drugie wśród modeli z otwartymi wagami, tuż za Kimi K3 (60 punktów) i przed Claude Opus 4.8 (57 punktów). Na 𝜏³-Bench Banking, teście obsługi klienta bankowego, wynik 51,3 procent to najlepszy rezultat spośród przetestowanych modeli.

Haczyk jest w licencji i w tym, co faktycznie trafiło do pobrania. Wersja tekstowa nie zawiera wizji ani pełnego miliona tokenów kontekstu z API. Licencja, zbliżona do MIT, wymaga atrybucji przy ponad 100 milionach aktywnych użytkowników miesięcznie lub 20 milionach dolarów przychodu miesięcznie, a asystenci kodujący budowani na modelu z przychodem powyżej 50 milionów dolarów rocznie muszą wykupić osobną licencję. Mniejszy Qwen3.8-27B trafił na Hugging Face na standardowej licencji Apache 2.0 z pełnymi możliwościami modelu.

**Key takeaways:**
- Qwen3.8-Max to 2,4-bilionowy model MoE aktywujący około 95 miliardów parametrów na token, piąty ogólnie w Artificial Analysis Intelligence Index.
- Otwarta wersja jest tekstowa, bez wizji i bez pełnego okna kontekstu na milion tokenów dostępnego w API.
- Licencja wymaga atrybucji lub osobnej umowy przy dużej skali komercyjnej, w odróżnieniu od w pełni otwartego Qwen3.8-27B na Apache 2.0.
- Model osiągnął najlepszy wynik spośród testowanych modeli na 𝜏³-Bench Banking (51,3 procent).

**Why do I care:** Dostępność wag daje deweloperom realny wybór: samodzielny hosting, dostawcy trzecich stron oferujący lepsze warunki prywatności, albo po prostu tańszy dostęp niż przez oficjalne API. Mało kto sam wystawi model z 2,4 biliona parametrów, więc realna korzyść przyjdzie z konkurencji między hostingami i z modeli destylowanych typu Qwen3.8-27B. Dla projektów wrażliwych na zgodność z regulacjami, gdzie dane nie mogą trafiać do zewnętrznego API, sama dostępność wag, nawet z ograniczoną licencją, jest bardziej wartościowa niż punkt więcej w benchmarku.

**Link:** [Qwen3.8-2.4T-A95B on Hugging Face](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B)

---

## Agenty poprawiają transkrypcję mowy w locie

**TLDR:** Badacze z Shanghai Jiao Tong University, Zhejiang University, Fudan University i Xiaoice zbudowali Agentic ASR, system łączący silnik rozpoznawania mowy z LLM-em, który wykrywa i poprawia błędy transkrypcji na bieżąco, zamiast przepisywać całość od nowa.

**Summary:** Standardowe systemy korekcji transkrypcji po prostu doklejają prośbę użytkownika o poprawkę do istniejącego tekstu i proszą LLM o przepisanie całości, co przy nietypowych nazwach (na przykład Megan zamiast Morgan) często wprowadza nowe błędy. Agentic ASR dzieli korekcję na trzy kroki: znalezienie błędu, zrozumienie, co użytkownik faktycznie powiedział, i zastosowanie poprawki, dzięki czemu LLM działa bardziej jak redaktor niż jak osoba przepisująca tekst od zera.

System łączy silnik mowy-na-tekst Qwen3-ASR-1.7B z LLM-em Qwen3-32B, który klasyfikuje każdą wypowiedź użytkownika jako potwierdzenie, nowy fragment do dodania albo korektę. Tylko korekta zmienia wcześniejszą transkrypcję: LLM identyfikuje fragment do edycji, ustala, co użytkownik chciał zmienić, i wprowadza poprawkę. Autorzy zaproponowali metrykę S²ER, mierzącą odsetek prób transkrypcji, które nie zachowują zamierzonego sensu wypowiedzi, i porównali ją po zerowej i po dziesiątej turze symulowanej korekty. Na GigaSpeech S²ER spadł z 21,5 do 3,5 procent po dziesięciu turach. Na AISHELL-NER, benchmarku pełnym imion i dat, spadek był jeszcze bardziej dramatyczny: z 19,9 do 2,0 procent, przy jednoczesnym spadku błędu nazw własnych z 2,4 do 1,2 procent.

**Key takeaways:**
- Agentic ASR dzieli korekcję transkrypcji na trzy kroki: znalezienie błędu, zrozumienie intencji, zastosowanie poprawki.
- System łączy Qwen3-ASR-1.7B (mowa na tekst) z Qwen3-32B (klasyfikacja intencji i edycja).
- Na GigaSpeech S²ER spadł z 21,5 do 3,5 procent po dziesięciu turach interakcji, na AISHELL-NER z 19,9 do 2,0 procent.
- Większość poprawy pojawia się już w pierwszych kilku turach korekty.

**Why do I care:** Każdy system przyjmujący wejście głosowe musi rozumieć intencję użytkownika, nie każde pojedyncze słowo, i to podejście robi to konkretnie i mierzalnie lepiej. W miarę jak interfejsy głosowe stają się częstsze w aplikacjach produkcyjnych, dekompozycja korekty na znalezienie błędu, zrozumienie zmiany i zastosowanie poprawki wygląda jak wzorzec możliwy do przeniesienia gdzie indziej, na przykład do edycji dokumentów czy iterowania nad kodem w agentach programistycznych, gdzie też chcemy poprawiać konkretny fragment, nie przepisywać wszystkiego od zera.

**Link:** [Towards Human-Like Interactive Speech Recognition with Agentic Correction and Semantic Evaluation](https://arxiv.org/abs/2605.29430)
